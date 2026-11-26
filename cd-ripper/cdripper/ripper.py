"""Turning CD audio into tagged MP3 files with the album art inside."""

from __future__ import annotations

import os
import re
import threading
from dataclasses import dataclass
from typing import Callable, Protocol

import lameenc
from mutagen.id3 import (APIC, ID3, TALB, TCON, TDRC, TIT2, TPE1, TPE2, TPOS,
                         TPUB, TRCK, TXXX, UFID, TSO2, TCMP)
from mutagen.mp3 import MP3

from .disc import SECTOR_BYTES, SECTORS_PER_SECOND, Toc
from .lookup import Album

CHUNK_SECTORS = 26


class Drive(Protocol):
    def read_sectors(self, lba: int, count: int) -> tuple[bytes, bool]: ...


@dataclass
class Settings:
    music_folder: str
    bitrate: int = 320                 # kbps
    save_folder_jpg: bool = True       # Windows Explorer shows folder.jpg as the album art
    eject_when_done: bool = True


_BAD = re.compile(r'[<>:"/\\|?*\x00-\x1f]')
_RESERVED = {"CON", "PRN", "AUX", "NUL", *(f"COM{i}" for i in range(1, 10)),
             *(f"LPT{i}" for i in range(1, 10))}


def safe_name(text: str, fallback: str = "Unknown") -> str:
    """Something Windows will accept as a file or folder name."""
    text = _BAD.sub("_", text or "").strip().rstrip(". ")
    text = re.sub(r"\s+", " ", text)[:120].rstrip(". ")
    if not text or text.upper() in _RESERVED:
        text = fallback if not text else f"_{text}"
    return text


def album_folder(settings: Settings, album: Album) -> str:
    various = album.artist.lower() in ("various artists", "various")
    artist = safe_name("Various Artists" if various else album.artist, "Unknown Artist")
    name = safe_name(album.title, "Unknown Album")
    if album.year:
        name = f"{name} ({album.year})"
    return os.path.join(settings.music_folder, artist, name)


def track_filename(album: Album, index: int) -> str:
    t = album.tracks[index]
    disc = f"{album.disc_number}-" if album.disc_total > 1 else ""
    various = album.artist.lower().startswith("various")
    title = f"{t.artist} - {t.title}" if various and t.artist else t.title
    return f"{disc}{t.number:02d} - {safe_name(title, f'Track {t.number}')}.mp3"


def write_tags(path: str, album: Album, index: int, cover: bytes | None) -> None:
    t = album.tracks[index]
    audio = MP3(path, ID3=ID3)
    if audio.tags is None:
        audio.add_tags()
    tags = audio.tags
    tags.add(TIT2(encoding=3, text=t.title))
    tags.add(TPE1(encoding=3, text=t.artist or album.artist))
    tags.add(TPE2(encoding=3, text=album.artist))
    tags.add(TALB(encoding=3, text=album.title))
    tags.add(TRCK(encoding=3, text=f"{t.number}/{len(album.tracks)}"))
    tags.add(TPOS(encoding=3, text=f"{album.disc_number}/{album.disc_total}"))
    if album.year:
        tags.add(TDRC(encoding=3, text=album.year))
    if album.genre:
        tags.add(TCON(encoding=3, text=album.genre))
    if album.label:
        tags.add(TPUB(encoding=3, text=album.label))
    if album.artist.lower().startswith("various"):
        tags.add(TCMP(encoding=3, text="1"))
        tags.add(TSO2(encoding=3, text="Various Artists"))
    if album.release_id:
        tags.add(TXXX(encoding=3, desc="MusicBrainz Album Id", text=album.release_id))
    if album.release_group_id:
        tags.add(TXXX(encoding=3, desc="MusicBrainz Release Group Id", text=album.release_group_id))
    if album.artist_id:
        tags.add(TXXX(encoding=3, desc="MusicBrainz Album Artist Id", text=album.artist_id))
    if album.barcode:
        tags.add(TXXX(encoding=3, desc="BARCODE", text=album.barcode))
    if t.recording_id:
        tags.add(UFID(owner="http://musicbrainz.org", data=t.recording_id.encode()))
    if cover:
        mime = "image/png" if cover[:4] == b"\x89PNG" else "image/jpeg"
        tags.add(APIC(encoding=3, mime=mime, type=3, desc="Cover", data=cover))
    audio.save(v2_version=3)    # ID3 v2.3: what Windows, iTunes and car stereos read best


class RipCancelled(Exception):
    pass


def rip_track(drive: Drive, toc: Toc, track_index: int, path: str, bitrate: int,
              progress: Callable[[float], None], cancel: threading.Event) -> int:
    """Rip one track to `path`. Returns how many sectors couldn't be read."""
    track = toc.audio_tracks[track_index]
    enc = lameenc.Encoder()
    enc.set_bit_rate(bitrate)
    enc.set_in_sample_rate(44100)
    enc.set_channels(2)
    enc.set_quality(2)          # 2 = high quality (slower, better sound)
    bad = 0
    tmp = path + ".part"
    try:
        with open(tmp, "wb") as out:
            done = 0
            while done < track.length:
                if cancel.is_set():
                    raise RipCancelled()
                n = min(CHUNK_SECTORS, track.length - done)
                pcm, ok = drive.read_sectors(track.start + done, n)
                if not ok:
                    bad += n
                out.write(enc.encode(pcm))
                done += n
                progress(done / track.length)
            out.write(enc.flush())
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)
    return bad


def rip_album(drive: Drive, toc: Toc, album: Album, cover: bytes | None,
              settings: Settings, selected: list[int],
              on_progress: Callable[[int, float, float], None],
              on_log: Callable[[str], None], cancel: threading.Event) -> str:
    """Rip the chosen tracks. on_progress(track_index, track_fraction, overall_fraction)."""
    folder = album_folder(settings, album)
    os.makedirs(folder, exist_ok=True)
    if cover and settings.save_folder_jpg:
        with open(os.path.join(folder, "folder.jpg"), "wb") as f:
            f.write(cover)
    total = sum(toc.audio_tracks[i].length for i in selected) or 1
    before = 0
    for i in selected:
        length = toc.audio_tracks[i].length
        path = os.path.join(folder, track_filename(album, i))
        name = album.tracks[i].title
        on_log(f"Ripping track {i + 1}: {name}")

        def prog(frac, i=i, before=before, length=length):
            on_progress(i, frac, (before + frac * length) / total)

        bad = rip_track(drive, toc, i, path, settings.bitrate, prog, cancel)
        write_tags(path, album, i, cover)
        secs = length / SECTORS_PER_SECOND
        if bad:
            on_log(f"   Done, but {bad / SECTORS_PER_SECOND:.1f}s of {secs:.0f}s couldn't be read "
                   "(probably a scratch) and will be silent.")
        else:
            on_log("   Done.")
        before += length
    return folder
