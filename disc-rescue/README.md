# Disc Rescue

Turn your old music CDs into MP3s, with everything filled in automatically:

- song titles, artist, album, year, genre, track and disc numbers
- the album's front cover, saved inside every MP3 (so phones, Windows, iTunes,
  car stereos and Plex show it) and as `folder.jpg` in the album folder
- neat folders: `Music\Artist\Album (Year)\01 - Song.mp3`

Album details come from [MusicBrainz](https://musicbrainz.org). Covers come from the
[Cover Art Archive](https://coverartarchive.org), or from the iTunes and Deezer catalogs when
the Cover Art Archive doesn't have one. All of them are free, with no account needed.

## Getting the program

1. On GitHub, open **Actions**, then **Disc Rescue exe**, and open the newest run with a green check.
2. Under **Artifacts**, download **DiscRescue-Windows**, then unzip it.
3. Put `DiscRescue.exe` anywhere you like (your Desktop is fine) and double-click it.
   Nothing needs installing.

The first time, Windows may say *"Windows protected your PC"*, because the program
isn't from a big company. Click **More info**, then **Run anyway**.

## Ripping a CD

1. Put the CD in and press **Read CD**.
2. The album, songs and cover appear in a few seconds. If there are several
   versions of the album (for example, a UK and a US release), the best match is
   picked, and you can choose another in **Album version** at the top.
3. Change anything you like: double-click a song name to retype it, untick songs
   you don't want, or use **Use my own picture…** for the cover.
4. Press **Rip CD**. Each song shows its progress. When it's finished the CD
   pops out and **Open folder** shows your music.

**CD not recognised?** Type the artist and album name on the left and press
**Search…** at the top. If it still isn't found, type the
details in yourself and rip anyway.

**Scratched CD?** The program re-reads bad spots several times. If a bit still
can't be read, it carries on and tells you which song has a short silent gap.

**Quality:** *Best (320 kbps)* is the default and sounds the same as the CD to
almost everyone. A typical album takes about 100–150 MB.

Your choices (save folder, quality, eject) are remembered for next time.

## For developers

```
pip install -r requirements.txt
python DiscRescue.py                               # run it (Windows)
python -m unittest discover -s tests             # tests (any computer)
DISCRESCUE_ONLINE=1 python -m unittest discover -s tests   # also tests the real lookup
```

- `discrescue/drive_windows.py` reads the disc through Windows' own CD-ROM driver (no extra tools).
- `discrescue/disc.py` works out the MusicBrainz disc ID.
- `discrescue/lookup.py` looks up the album details and cover.
- `discrescue/ripper.py` encodes the MP3s (LAME) and writes the tags (ID3 v2.3).
- `discrescue/app.py` is the window.
- `discrescue/fake_drive.py` is a pretend drive for testing without a CD.
- `branding/` holds the original logo. `python make_icon.py` turns it into the icons and banner image.

The `.github/workflows/disc-rescue-exe.yml` workflow tests and builds `DiscRescue.exe` on Windows.
