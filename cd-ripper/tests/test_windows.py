import ctypes
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


@unittest.skipUnless(sys.platform == "win32", "Windows only")
class WindowsDriveTest(unittest.TestCase):
    def test_structure_sizes_match_windows(self):
        from cdripper import drive_windows as dw
        self.assertEqual(ctypes.sizeof(dw._CdromToc), 804)      # sizeof(CDROM_TOC)
        self.assertEqual(ctypes.sizeof(dw._RawReadInfo), 16)    # sizeof(RAW_READ_INFO)

    def test_list_drives_runs(self):
        from cdripper.drive_windows import list_drives
        self.assertIsInstance(list_drives(), list)


if __name__ == "__main__":
    unittest.main()
