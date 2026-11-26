"""Album details and cover art from MusicBrainz and the Cover Art Archive.

Both are free and need no account. MusicBrainz asks programs to identify
themselves and to make no more than one request per second.
"""

from __future__ import annotations

import json
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field

from .disc import Toc

USER_AGENT = "CDRipper/1.0 ( home CD ripping app )"
MB = "https://musicbrainz.org/ws/2"
CAA = "https://coverartarchive.org"
_last_call = 0.0


class LookupError_(Exception):
    pass


@dataclass
class TrackInfo:
    number: int
    title: str
    artist: str
    recording_id: str = ""


@dataclass
class Album:
    title: str = ""
    artist: str = ""
    year: str = ""
    genre: str = ""
    disc_number: int = 1
    disc_total: int = 1
    label: str = ""
    country: str = ""
    barcode: str = ""
    release_id: str = ""
    release_group_id: str = ""
    artist_id: str = ""
    tracks: list[TrackInfo] = field(default_factory=list)
    has_front_cover: bool = False

    def describe(self) -> str:
        bits = [self.year, self.country, self.label]
        extra = ", ".join(b for b in bits if b)
        disc = f" (disc {self.disc_number} of {self.disc_total})" if self.disc_total > 1 else ""
        return f"{self.artist} - {self.title}{disc}" + (f"  [{extra}]" if extra else "")


def _get(url: str, accept_json: bool = True, timeout: float = 20) -> bytes:
    global _last_call
    wait = 1.1 - (time.monotonic() - _last_call)
    if wait > 0 and "musicbrainz.org" in url:
        time.sleep(wait)
    req = urllib.request.Request(url, headers={
        "User-Agent": USER_AGENT,
        "Accept": "application/json" if accept_json else "*/*"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                _last_call = time.monotonic()
                return r.read()
        except urllib.error.HTTPError as e:
            _last_call = time.monotonic()
            if e.code == 404:
                raise
            if e.code in (429, 503) and attempt < 2:
                time.sleep(2 + attempt * 2)
                continue
            raise LookupError_(f"MusicBrainz answered with error {e.code}.") from e
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            if attempt < 2:
                time.sleep(1.5)
                continue
            raise LookupError_("Couldn't reach the internet to look up the album. "
                               "Check the connection, or type the details in yourself.") from e
    raise LookupError_("Lookup failed.")


def _credit(credits: list) -> str:
    return "".join(c.get("name", "") + c.get("joinphrase", "") for c in credits or [])


def _pick_medium(release: dict, toc: Toc, disc_id: str) -> dict | None:
    media = release.get("media", [])
    for m in media:
        if any(d.get("id") == disc_id for d in m.get("discs", [])):
            return m
    count = len(toc.audio_tracks)
    for m in media:
        if m.get("track-count") == count or len(m.get("tracks", [])) == count:
            return m
    return media[0] if media else None


def _album_from_release(release: dict, toc: Toc, disc_id: str) -> Album | None:
    medium = _pick_medium(release, toc, disc_id)
    if medium is None:
        return None
    rg = release.get("release-group", {})
    genres = sorted(rg.get("genres", []) + release.get("genres", []),
                    key=lambda g: -g.get("count", 0))
    labels = release.get("label-info", [])
    credits = release.get("artist-credit", [])
    album = Album(
        title=release.get("title", ""),
        artist=_credit(credits),
        year=(release.get("date") or rg.get("first-release-date") or "")[:4],
        genre=genres[0]["name"].title() if genres else "",
        disc_number=medium.get("position", 1),
        disc_total=max(1, len(release.get("media", []))),
        label=(labels[0].get("label") or {}).get("name", "") if labels else "",
        country=release.get("country", "") or "",
        barcode=release.get("barcode", "") or "",
        release_id=release.get("id", ""),
        release_group_id=rg.get("id", ""),
        artist_id=(credits[0].get("artist") or {}).get("id", "") if credits else "",
        has_front_cover=bool((release.get("cover-art-archive") or {}).get("front")),
    )
    mb_tracks = medium.get("tracks", [])
    for i, t in enumerate(toc.audio_tracks):
        mt = mb_tracks[i] if i < len(mb_tracks) else {}
        rec = mt.get("recording", {})
        album.tracks.append(TrackInfo(
            number=i + 1,
            title=mt.get("title") or rec.get("title") or f"Track {i + 1}",
            artist=_credit(mt.get("artist-credit") or rec.get("artist-credit")) or album.artist,
            recording_id=rec.get("id", "")))
    return album


INC = "recordings+artist-credits+release-groups+labels+genres+discids"   # for /release
DISC_INC = "recordings+artist-credits+release-groups+labels+genres"      # /discid already lists discs


def lookup_disc(toc: Toc) -> list[Album]:
    """All releases MusicBrainz knows that match this disc (best first)."""
    disc_id = toc.disc_id()
    try:
        data = json.loads(_get(
            f"{MB}/discid/{disc_id}?toc={toc.toc_string()}&inc={DISC_INC}&fmt=json"))
    except urllib.error.HTTPError:
        return []
    releases = data.get("releases", [])
    albums = [a for r in releases if (a := _album_from_release(r, toc, disc_id))]
    # CD releases from the disc's own pressing first.
    def score(a: Album, r: dict) -> tuple:
        exact = any(d.get("id") == disc_id for m in r.get("media", []) for d in m.get("discs", []))
        return (not exact, not a.has_front_cover, a.year or "9999")
    paired = sorted(zip(albums, releases), key=lambda p: score(*p))
    return [a for a, _ in paired]


def search(artist: str, title: str, toc: Toc) -> list[Album]:
    """Search by name, for discs MusicBrainz doesn't recognise by their ID."""
    terms = []
    if title:
        terms.append(f'release:"{title}"')
    if artist:
        terms.append(f'artist:"{artist}"')
    if not terms:
        return []
    terms.append(f"tracks:{len(toc.audio_tracks)}")
    q = urllib.parse.urlencode({"query": " AND ".join(terms), "limit": 10, "fmt": "json"})
    data = json.loads(_get(f"{MB}/release?{q}"))
    albums = []
    for hit in data.get("releases", [])[:6]:
        try:
            full = json.loads(_get(f"{MB}/release/{hit['id']}?inc={INC}&fmt=json"))
        except urllib.error.HTTPError:
            continue
        if a := _album_from_release(full, toc, ""):
            albums.append(a)
    return albums


def fetch_cover(album: Album, size: int = 1200) -> bytes | None:
    """The front cover as JPEG bytes, or None if there isn't one."""
    urls = []
    if album.release_id:
        urls.append(f"{CAA}/release/{album.release_id}/front-{size}")
        urls.append(f"{CAA}/release/{album.release_id}/front")
    if album.release_group_id:
        urls.append(f"{CAA}/release-group/{album.release_group_id}/front-{size}")
        urls.append(f"{CAA}/release-group/{album.release_group_id}/front")
    for url in urls:
        try:
            data = _get(url, accept_json=False, timeout=30)
            if data[:3] == b"\xff\xd8\xff" or data[:8] == b"\x89PNG\r\n\x1a\n":
                return data
        except (urllib.error.HTTPError, LookupError_):
            continue
    return None
