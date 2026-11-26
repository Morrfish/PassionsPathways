"""Table of contents of an audio CD, and its MusicBrainz disc ID.

A CD is addressed in sectors (1/75 of a second, 2352 bytes of audio each).
MusicBrainz identifies a disc by a hash of where each track starts, so the
same pressing of an album gets the same ID on every computer.
"""

from __future__ import annotations

import base64
import hashlib
from dataclasses import dataclass, field

SECTOR_BYTES = 2352          # one sector of CD audio: 588 stereo 16-bit samples
SECTORS_PER_SECOND = 75
PREGAP = 150                 # the 2-second lead-in before sector 0
DATA_TRACK_GAP = 11400       # gap between the last audio session and a data session


@dataclass
class Track:
    number: int
    start: int               # first sector (LBA, 0 = start of the disc)
    is_data: bool = False
    length: int = 0          # in sectors, filled in by Toc

    @property
    def seconds(self) -> float:
        return self.length / SECTORS_PER_SECOND


@dataclass
class Toc:
    tracks: list[Track]
    leadout: int             # LBA where the disc's last session ends
    audio_tracks: list[Track] = field(init=False)
    audio_leadout: int = field(init=False)

    def __post_init__(self) -> None:
        self.tracks.sort(key=lambda t: t.number)
        # Enhanced CDs (music + a computer data track at the end): the audio
        # part ends 11400 sectors before the data track begins.
        audio = [t for t in self.tracks if not t.is_data]
        if not audio:
            raise ValueError("This disc has no music tracks.")
        self.audio_tracks = audio
        last = audio[-1]
        after = [t for t in self.tracks if t.number > last.number]
        self.audio_leadout = after[0].start - DATA_TRACK_GAP if after else self.leadout
        ends = [t.start for t in audio[1:]] + [self.audio_leadout]
        for t, end in zip(audio, ends):
            t.length = end - t.start

    @property
    def first(self) -> int:
        return self.audio_tracks[0].number

    @property
    def last(self) -> int:
        return self.audio_tracks[-1].number

    @property
    def seconds(self) -> float:
        return (self.audio_leadout - self.audio_tracks[0].start) / SECTORS_PER_SECOND

    def offsets(self) -> list[int]:
        """Track start offsets the way MusicBrainz counts them (pregap included)."""
        return [t.start + PREGAP for t in self.audio_tracks]

    def disc_id(self) -> str:
        sha = hashlib.sha1()
        sha.update(b"%02X" % self.first)
        sha.update(b"%02X" % self.last)
        offsets = dict(zip((t.number for t in self.audio_tracks), self.offsets()))
        sha.update(b"%08X" % (self.audio_leadout + PREGAP))
        for n in range(1, 100):
            sha.update(b"%08X" % offsets.get(n, 0))
        return base64.b64encode(sha.digest()).decode().translate(
            str.maketrans("+/=", "._-"))

    def toc_string(self) -> str:
        """The "toc" parameter MusicBrainz uses for a fuzzy match."""
        parts = [self.first, self.last, self.audio_leadout + PREGAP, *self.offsets()]
        return "+".join(str(p) for p in parts)

    @classmethod
    def from_offsets(cls, first: int, leadout: int, offsets: list[int]) -> "Toc":
        """Build from MusicBrainz-style numbers (each already includes the pregap)."""
        tracks = [Track(first + i, off - PREGAP) for i, off in enumerate(offsets)]
        return cls(tracks, leadout - PREGAP)
