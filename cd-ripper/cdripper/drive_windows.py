"""Reading audio straight off a CD drive using Windows' own CD-ROM driver.

No extra programs are needed: Windows lets a program ask the drive for the
disc's table of contents (IOCTL_CDROM_READ_TOC) and for raw audio sectors
(IOCTL_CDROM_RAW_READ).
"""

from __future__ import annotations

import ctypes
import string
import sys
import time

from .disc import SECTOR_BYTES, Toc, Track

IOCTL_CDROM_READ_TOC = 0x00024000
IOCTL_CDROM_RAW_READ = 0x0002403E
IOCTL_STORAGE_EJECT_MEDIA = 0x002D4808
IOCTL_STORAGE_CHECK_VERIFY = 0x002D4800
CDDA = 2
DRIVE_CDROM = 5
GENERIC_READ = 0x80000000
FILE_SHARE_READ = 0x1
FILE_SHARE_WRITE = 0x2
OPEN_EXISTING = 3
INVALID_HANDLE = ctypes.c_void_p(-1).value

# Many drives refuse reads larger than 64 KB, so read 26 sectors at a time.
CHUNK_SECTORS = 26


class DriveError(Exception):
    pass


class _TrackData(ctypes.Structure):
    _fields_ = [("Reserved", ctypes.c_ubyte),
                ("ControlAdr", ctypes.c_ubyte),
                ("TrackNumber", ctypes.c_ubyte),
                ("Reserved1", ctypes.c_ubyte),
                ("Address", ctypes.c_ubyte * 4)]


class _CdromToc(ctypes.Structure):
    _fields_ = [("Length", ctypes.c_ubyte * 2),
                ("FirstTrack", ctypes.c_ubyte),
                ("LastTrack", ctypes.c_ubyte),
                ("TrackData", _TrackData * 100)]


class _RawReadInfo(ctypes.Structure):
    _fields_ = [("DiskOffset", ctypes.c_longlong),
                ("SectorCount", ctypes.c_ulong),
                ("TrackMode", ctypes.c_int)]


def _k32():
    from ctypes import wintypes
    k = ctypes.WinDLL("kernel32", use_last_error=True)
    k.CreateFileW.restype = wintypes.HANDLE
    k.CreateFileW.argtypes = [wintypes.LPCWSTR, wintypes.DWORD, wintypes.DWORD,
                              wintypes.LPVOID, wintypes.DWORD, wintypes.DWORD,
                              wintypes.HANDLE]
    k.DeviceIoControl.restype = wintypes.BOOL
    k.DeviceIoControl.argtypes = [wintypes.HANDLE, wintypes.DWORD, wintypes.LPVOID,
                                  wintypes.DWORD, wintypes.LPVOID, wintypes.DWORD,
                                  ctypes.POINTER(wintypes.DWORD), wintypes.LPVOID]
    k.CloseHandle.argtypes = [wintypes.HANDLE]
    k.GetDriveTypeW.argtypes = [wintypes.LPCWSTR]
    return k


def list_drives() -> list[str]:
    """Drive letters of the computer's CD/DVD drives, like ["D:"]."""
    if sys.platform != "win32":
        return []
    k = _k32()
    mask = k.GetLogicalDrives()
    found = []
    for i, letter in enumerate(string.ascii_uppercase):
        if mask & (1 << i) and k.GetDriveTypeW(f"{letter}:\\") == DRIVE_CDROM:
            found.append(f"{letter}:")
    return found


class WindowsDrive:
    def __init__(self, letter: str):
        self.letter = letter.rstrip("\\").rstrip(":") + ":"
        self._k = _k32()
        self._h = None

    def __enter__(self):
        self.open()
        return self

    def __exit__(self, *exc):
        self.close()

    def open(self) -> None:
        if self._h is not None:
            return
        h = self._k.CreateFileW(f"\\\\.\\{self.letter}", GENERIC_READ,
                                FILE_SHARE_READ | FILE_SHARE_WRITE, None,
                                OPEN_EXISTING, 0, None)
        if h is None or h == INVALID_HANDLE:
            raise DriveError(f"Could not open drive {self.letter} "
                             f"(Windows error {ctypes.get_last_error()}).")
        self._h = h

    def close(self) -> None:
        if self._h is not None:
            self._k.CloseHandle(self._h)
            self._h = None

    def _ioctl(self, code, inbuf=None, insize=0, outbuf=None, outsize=0) -> int:
        from ctypes import wintypes
        self.open()
        returned = wintypes.DWORD(0)
        ok = self._k.DeviceIoControl(self._h, code,
                                     ctypes.byref(inbuf) if inbuf is not None else None,
                                     insize,
                                     ctypes.byref(outbuf) if outbuf is not None else None,
                                     outsize, ctypes.byref(returned), None)
        if not ok:
            raise DriveError(f"Windows error {ctypes.get_last_error()}")
        return returned.value

    def read_toc(self) -> Toc:
        toc = _CdromToc()
        try:
            self._ioctl(IOCTL_CDROM_READ_TOC, outbuf=toc, outsize=ctypes.sizeof(toc))
        except DriveError:
            raise DriveError(f"There is no audio CD in drive {self.letter} "
                             "(or the drive isn't ready yet).") from None
        count = toc.LastTrack - toc.FirstTrack + 1
        tracks, leadout = [], None
        for i in range(count + 1):          # the extra entry is the lead-out
            td = toc.TrackData[i]
            m, s, f = td.Address[1], td.Address[2], td.Address[3]
            lba = (m * 60 + s) * 75 + f - 150
            if td.TrackNumber == 0xAA or i == count:
                leadout = lba
                break
            tracks.append(Track(td.TrackNumber, lba, is_data=bool(td.ControlAdr & 0x04)))
        return Toc(tracks, leadout)

    def read_sectors(self, lba: int, count: int, retries: int = 8) -> tuple[bytes, bool]:
        """Read `count` sectors. Returns (audio, ok); unreadable sectors become silence."""
        info = _RawReadInfo(lba * 2048, count, CDDA)
        buf = (ctypes.c_ubyte * (count * SECTOR_BYTES))()
        for attempt in range(retries):
            try:
                self._ioctl(IOCTL_CDROM_RAW_READ, info, ctypes.sizeof(info), buf, len(buf))
                return bytes(buf), True
            except DriveError:
                time.sleep(0.05 * (attempt + 1))
        if count > 1:   # read one sector at a time so only the scratched bit is lost
            parts, all_ok = [], True
            for i in range(count):
                data, ok = self.read_sectors(lba + i, 1, retries=4)
                parts.append(data)
                all_ok &= ok
            return b"".join(parts), all_ok
        return bytes(SECTOR_BYTES), False

    def eject(self) -> None:
        try:
            self._ioctl(IOCTL_STORAGE_EJECT_MEDIA)
        except DriveError:
            pass
