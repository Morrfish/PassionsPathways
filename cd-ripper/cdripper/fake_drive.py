"""A pretend CD drive, for testing the app on a computer without one."""

from __future__ import annotations

import math
import struct

from .disc import SECTOR_BYTES, Toc

# MusicBrainz's own example disc (6 tracks): disc ID 49HHV7Eb8UKF3aQiNmu1GR8vKTY-
EXAMPLE_TOC = (1, 95462, [150, 15363, 32314, 46592, 63414, 80489])


class FakeDrive:
    def __init__(self, letter: str = "Z:", toc: Toc | None = None, bad_sectors=()):
        self.letter = letter
        self.toc = toc or Toc.from_offsets(*EXAMPLE_TOC)
        self.bad = set(bad_sectors)
        self.ejected = False

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        pass

    def read_toc(self) -> Toc:
        return Toc.from_offsets(1, self.toc.audio_leadout + 150, self.toc.offsets())

    def read_sectors(self, lba: int, count: int) -> tuple[bytes, bool]:
        out, ok = bytearray(), True
        for s in range(lba, lba + count):
            if s in self.bad:
                out += bytes(SECTOR_BYTES)
                ok = False
                continue
            for n in range(588):   # a quiet 440 Hz tone
                v = int(3000 * math.sin(2 * math.pi * 440 * (s * 588 + n) / 44100))
                out += struct.pack("<hh", v, v)
        return bytes(out), ok

    def eject(self) -> None:
        self.ejected = True
