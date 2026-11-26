import os
import sys
import tempfile
import threading
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from mutagen.id3 import ID3
from mutagen.mp3 import MP3

from discrescue.disc import Toc, Track
from discrescue.fake_drive import EXAMPLE_TOC, FakeDrive
from discrescue.lookup import Album, TrackInfo
from discrescue.ripper import Settings, rip_album, safe_name, track_filename

ONLINE = os.environ.get("DISCRESCUE_ONLINE") == "1"


class DiscIdTest(unittest.TestCase):
    def test_musicbrainz_example(self):
        toc = Toc.from_offsets(*EXAMPLE_TOC)
        self.assertEqual(toc.disc_id(), "49HHV7Eb8UKF3aQiNmu1GR8vKTY-")
        self.assertEqual(toc.toc_string(), "1+6+95462+150+15363+32314+46592+63414+80489")

    def test_enhanced_cd_ignores_data_track(self):
        # Same music, plus a data track 11400 sectors after the music ends.
        audio = Toc.from_offsets(*EXAMPLE_TOC)
        tracks = [Track(t.number, t.start) for t in audio.audio_tracks]
        tracks.append(Track(7, audio.audio_leadout + 11400, is_data=True))
        enhanced = Toc(tracks, audio.audio_leadout + 11400 + 30000)
        self.assertEqual(len(enhanced.audio_tracks), 6)
        self.assertEqual(enhanced.disc_id(), audio.disc_id())

    def test_track_lengths(self):
        toc = Toc.from_offsets(*EXAMPLE_TOC)
        self.assertEqual(toc.audio_tracks[0].length, 15363 - 150)
        self.assertEqual(toc.audio_tracks[-1].length, 95462 - 80489)


class NamesTest(unittest.TestCase):
    def test_safe_names(self):
        self.assertEqual(safe_name('AC/DC: "Live?"'), "AC_DC_ _Live__")
        self.assertEqual(safe_name("con"), "_con")
        self.assertEqual(safe_name("..."), "Unknown")
        self.assertEqual(safe_name("Mr. "), "Mr")

    def test_various_artists_file_names(self):
        a = Album(title="Hits", artist="Various Artists",
                  tracks=[TrackInfo(1, "Song", "Singer")])
        self.assertEqual(track_filename(a, 0), "01 - Singer - Song.mp3")


class RipTest(unittest.TestCase):
    def test_rip_and_tag(self):
        short = Toc.from_offsets(1, 150 + 75 * 6, [150, 150 + 75 * 3])  # two 3-second songs
        drive = FakeDrive(toc=short, bad_sectors={300})
        album = Album(title="Test Album", artist="Test Band", year="1999", genre="Rock",
                      release_id="rel-1", tracks=[TrackInfo(1, "First / Song", "Test Band", "rec-1"),
                                                  TrackInfo(2, "Second", "Test Band")])
        cover = open(os.path.join(os.path.dirname(__file__), "cover.jpg"), "rb").read()
        logs = []
        with tempfile.TemporaryDirectory() as tmp:
            folder = rip_album(drive, short, album, cover, Settings(tmp, bitrate=192), [0, 1],
                               lambda *a: None, logs.append, threading.Event())
            self.assertEqual(folder, os.path.join(tmp, "Test Band", "Test Album (1999)"))
            files = sorted(os.listdir(folder))
            self.assertEqual(files, ["01 - First _ Song.mp3", "02 - Second.mp3", "folder.jpg"])
            mp3 = MP3(os.path.join(folder, files[0]))
            self.assertAlmostEqual(mp3.info.length, 3.0, delta=0.1)
            self.assertEqual(mp3.info.bitrate, 192000)
            tags = ID3(os.path.join(folder, files[0]))
            self.assertEqual(tags.version[:2], (2, 3))
            self.assertEqual(str(tags["TIT2"]), "First / Song")
            self.assertEqual(str(tags["TPE1"]), "Test Band")
            self.assertEqual(str(tags["TALB"]), "Test Album")
            self.assertEqual(str(tags["TRCK"]), "1/2")
            self.assertEqual(str(tags["TCON"]), "Rock")
            self.assertEqual(str(tags["TDRC"]), "1999")
            self.assertEqual(tags.getall("APIC")[0].data, cover)
            self.assertTrue(any("couldn't be read" in l for l in logs))  # the bad sector


@unittest.skipUnless(ONLINE, "set DISCRESCUE_ONLINE=1 to test the real MusicBrainz lookup")
class OnlineTest(unittest.TestCase):
    def test_lookup_and_cover(self):
        from discrescue import lookup
        toc = Toc.from_offsets(*EXAMPLE_TOC)
        albums = lookup.lookup_disc(toc)
        self.assertTrue(albums)
        a = albums[0]
        self.assertEqual(len(a.tracks), 6)
        self.assertTrue(a.title and a.artist and a.tracks[0].title)
        cover = lookup.fetch_cover(a)
        self.assertTrue(cover and cover[:2] == b"\xff\xd8")


if __name__ == "__main__":
    unittest.main()
