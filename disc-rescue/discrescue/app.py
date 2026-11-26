"""Disc Rescue: the window.

Put a CD in, it looks the album up (titles, artist, year, genre, cover art),
you check or fix anything you like, then press Rip.
"""

from __future__ import annotations

import io
import json
import os
import queue
import sys
import threading
import tkinter as tk
from tkinter import filedialog, messagebox, ttk

from PIL import Image, ImageTk

from . import lookup
from .disc import Toc
from .lookup import Album, TrackInfo
from .ripper import RipCancelled, Settings, rip_album

APP_NAME = "Disc Rescue"
BRAND_BG = "#011631"       # the logo's navy outline
BRAND_ACCENT = "#00f7fc"   # the logo's "RESCUE" cyan


def resource(name: str) -> str:
    """A file shipped with the app (inside the .exe, or next to this file)."""
    return os.path.join(getattr(sys, "_MEIPASS", os.path.dirname(__file__)), name)
BITRATES = {"Best (320 kbps)": 320, "Great (256 kbps)": 256,
            "Good (192 kbps)": 192, "Small files (128 kbps)": 128}


def settings_path() -> str:
    base = os.environ.get("APPDATA") or os.path.expanduser("~/.config")
    return os.path.join(base, "Disc Rescue", "settings.json")


def default_music_folder() -> str:
    return os.path.join(os.path.expanduser("~"), "Music")


def fmt_time(secs: float) -> str:
    secs = int(round(secs))
    return f"{secs // 60}:{secs % 60:02d}"


class App:
    def __init__(self, root: tk.Tk, drives=None, open_drive=None):
        """`drives` lists drive letters; `open_drive(letter)` returns a drive object.
        Both default to the real Windows drives; tests pass in a pretend drive."""
        if drives is None or open_drive is None:
            from .drive_windows import WindowsDrive, list_drives
            drives, open_drive = list_drives, WindowsDrive
        self.root = root
        self._list_drives = drives
        self._open_drive = open_drive
        self.events: queue.Queue = queue.Queue()
        self.toc: Toc | None = None
        self.albums: list[Album] = []
        self.cover: bytes | None = None
        self.cover_img = None
        self.busy = False
        self.cancel = threading.Event()
        self.saved = self._load_settings()

        root.title(APP_NAME)
        root.geometry("1000x760")
        root.minsize(840, 620)
        self._style()
        self._build()
        self.refresh_drives()
        root.after(100, self._pump)
        root.protocol("WM_DELETE_WINDOW", self.on_close)

    # ---------- settings ----------
    def _load_settings(self) -> dict:
        try:
            with open(settings_path(), encoding="utf-8") as f:
                return json.load(f)
        except (OSError, ValueError):
            return {}

    def _save_settings(self) -> None:
        data = {"music_folder": self.folder_var.get(), "quality": self.quality_var.get(),
                "eject": self.eject_var.get(), "folder_jpg": self.folderjpg_var.get()}
        try:
            os.makedirs(os.path.dirname(settings_path()), exist_ok=True)
            with open(settings_path(), "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
        except OSError:
            pass

    # ---------- layout ----------
    def _style(self) -> None:
        s = ttk.Style()
        if "vista" in s.theme_names():
            s.theme_use("vista")
        elif "clam" in s.theme_names():
            s.theme_use("clam")
        s.configure("Big.TButton", font=("Segoe UI", 11, "bold"), padding=(14, 6))
        s.configure("Head.TLabel", font=("Segoe UI", 15, "bold"))
        s.configure("Muted.TLabel", foreground="#555")
        s.configure("Treeview", rowheight=24)

    def _build(self) -> None:
        r = self.root
        pad = {"padx": 10, "pady": 6}

        banner = tk.Frame(r, bg=BRAND_BG)
        banner.pack(fill="x")
        self.logo_img = None
        try:   # the Disc Rescue logo (shield + name); falls back to plain text
            img = Image.open(resource("logo.png"))
            img.thumbnail((400, 70))
            self.logo_img = ImageTk.PhotoImage(img)
            tk.Label(banner, image=self.logo_img, bg=BRAND_BG).pack(side="left", padx=(14, 6), pady=8)
        except Exception:
            tk.Label(banner, text=APP_NAME, bg=BRAND_BG, fg="white",
                     font=("Segoe UI", 20, "bold")).pack(side="left", padx=14, pady=8)
        tk.Label(banner, text="Save your CDs, with every song name and cover",
                 bg=BRAND_BG, fg=BRAND_ACCENT, font=("Segoe UI", 12)).pack(side="left", padx=14)

        top = ttk.Frame(r)
        top.pack(fill="x", **pad)
        ttk.Label(top, text="CD drive:").pack(side="left")
        self.drive_var = tk.StringVar()
        self.drive_box = ttk.Combobox(top, textvariable=self.drive_var, width=8, state="readonly")
        self.drive_box.pack(side="left", padx=(6, 4))
        ttk.Button(top, text="↻", width=3, command=self.refresh_drives).pack(side="left")
        self.read_btn = ttk.Button(top, text="Read CD", style="Big.TButton", command=self.read_cd)
        self.read_btn.pack(side="left", padx=10)
        self.eject_btn = ttk.Button(top, text="Eject", command=self.eject)
        self.eject_btn.pack(side="left")
        ttk.Label(top, text="Album version:").pack(side="left", padx=(20, 4))
        self.release_var = tk.StringVar()
        self.release_box = ttk.Combobox(top, textvariable=self.release_var, state="readonly")
        self.release_box.pack(side="left", fill="x", expand=True)
        self.release_box.bind("<<ComboboxSelected>>", lambda e: self.choose_release())

        mid = ttk.Frame(r)
        mid.pack(fill="both", expand=True, **pad)

        left = ttk.Frame(mid)
        left.pack(side="left", fill="y")
        self.cover_lbl = tk.Label(left, width=220, height=220, bg="#e6e6e6", text="No cover art yet",
                                  fg="#777", relief="flat", compound="center")
        self.cover_lbl.pack()
        cbtns = ttk.Frame(left)
        cbtns.pack(fill="x", pady=4)
        ttk.Button(cbtns, text="Use my own picture…", command=self.pick_cover).pack(side="left")
        ttk.Button(cbtns, text="Remove", command=lambda: self.set_cover(None)).pack(side="right")

        form = ttk.Frame(left)
        form.pack(fill="x", pady=(10, 0))
        self.vars = {}
        for row, (key, label) in enumerate([("artist", "Artist"), ("title", "Album"),
                                            ("year", "Year"), ("genre", "Genre"),
                                            ("disc", "Disc")]):
            ttk.Label(form, text=label).grid(row=row, column=0, sticky="w", pady=2)
            v = tk.StringVar()
            ttk.Entry(form, textvariable=v, width=30).grid(row=row, column=1, sticky="ew", pady=2)
            self.vars[key] = v
        self.vars["disc"].set("1/1")
        form.columnconfigure(1, weight=1)
        sf = ttk.Frame(left)
        sf.pack(fill="x", pady=(8, 0))
        ttk.Label(sf, text="Not the right album?", style="Muted.TLabel").pack(anchor="w")
        ttk.Button(sf, text="Search by the artist and album above",
                   command=self.search).pack(fill="x", pady=2)

        right = ttk.Frame(mid)
        right.pack(side="left", fill="both", expand=True, padx=(12, 0))
        self.head_lbl = ttk.Label(right, text="Put a CD in and press Read CD", style="Head.TLabel")
        self.head_lbl.pack(anchor="w")
        ttk.Label(right, text="Double-click a song to change its name. Untick songs you don't want.",
                  style="Muted.TLabel").pack(anchor="w", pady=(0, 4))
        tf = ttk.Frame(right)
        tf.pack(fill="both", expand=True)
        cols = ("rip", "num", "title", "artist", "time", "status")
        self.tree = ttk.Treeview(tf, columns=cols, show="headings", selectmode="browse")
        for c, text, w, anchor in [("rip", "Rip", 40, "center"), ("num", "#", 36, "center"),
                                   ("title", "Song", 220, "w"), ("artist", "Artist", 140, "w"),
                                   ("time", "Time", 50, "e"), ("status", "Progress", 80, "w")]:
            self.tree.heading(c, text=text)
            self.tree.column(c, width=w, anchor=anchor, stretch=c in ("title", "artist"))
        sb = ttk.Scrollbar(tf, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=sb.set)
        self.tree.pack(side="left", fill="both", expand=True)
        sb.pack(side="right", fill="y")
        self.tree.bind("<Double-1>", self.edit_cell)
        self.tree.bind("<Button-1>", self.toggle_rip, add="+")
        self.tree.bind("<space>", lambda e: self.toggle_selected())

        opts = ttk.Frame(r)
        opts.pack(fill="x", **pad)
        ttk.Label(opts, text="Save to:").pack(side="left")
        self.folder_var = tk.StringVar(value=self.saved.get("music_folder", default_music_folder()))
        ttk.Entry(opts, textvariable=self.folder_var).pack(side="left", fill="x", expand=True, padx=6)
        ttk.Button(opts, text="Change…", command=self.pick_folder).pack(side="left")
        ttk.Label(opts, text="Quality:").pack(side="left", padx=(14, 4))
        self.quality_var = tk.StringVar(value=self.saved.get("quality", next(iter(BITRATES))))
        ttk.Combobox(opts, textvariable=self.quality_var, values=list(BITRATES),
                     state="readonly", width=20).pack(side="left")

        opts2 = ttk.Frame(r)
        opts2.pack(fill="x", padx=10)
        self.eject_var = tk.BooleanVar(value=self.saved.get("eject", True))
        self.folderjpg_var = tk.BooleanVar(value=self.saved.get("folder_jpg", True))
        ttk.Checkbutton(opts2, text="Eject the CD when finished",
                        variable=self.eject_var).pack(side="left")
        ttk.Checkbutton(opts2, text="Also save the cover as folder.jpg",
                        variable=self.folderjpg_var).pack(side="left", padx=14)

        bottom = ttk.Frame(r)
        bottom.pack(fill="x", **pad)
        self.rip_btn = ttk.Button(bottom, text="Rip CD", style="Big.TButton",
                                  command=self.rip, state="disabled")
        self.rip_btn.pack(side="right")
        self.open_btn = ttk.Button(bottom, text="Open folder", command=self.open_output,
                                   state="disabled")
        self.open_btn.pack(side="right", padx=6)
        self.progress = ttk.Progressbar(bottom, mode="determinate", maximum=1.0)
        self.progress.pack(side="left", fill="x", expand=True, padx=(0, 10))
        self.status_var = tk.StringVar(value="Ready.")
        ttk.Label(r, textvariable=self.status_var, style="Muted.TLabel").pack(
            anchor="w", padx=10, pady=(0, 8))
        self.last_folder = None

    # ---------- background work ----------
    def _run(self, fn, *args) -> None:
        def worker():
            try:
                fn(*args)
            except Exception as e:  # report anything unexpected in the window
                self.events.put(("error", str(e) or e.__class__.__name__))
            finally:
                self.events.put(("idle",))
        self.set_busy(True)
        threading.Thread(target=worker, daemon=True).start()

    def _pump(self) -> None:
        try:
            while True:
                ev = self.events.get_nowait()
                getattr(self, "_on_" + ev[0])(*ev[1:])
        except queue.Empty:
            pass
        self.root.after(80, self._pump)

    def _on_idle(self):
        self.set_busy(False)

    def _on_error(self, msg):
        self.status_var.set(msg)
        messagebox.showerror(APP_NAME, msg)

    def _on_status(self, msg):
        self.status_var.set(msg)

    def _on_toc(self, toc):
        self.toc = toc
        self.albums = []
        self.release_box["values"] = []
        self.release_var.set("")
        blank = Album(tracks=[TrackInfo(i + 1, f"Track {i + 1}", "")
                              for i in range(len(toc.audio_tracks))])
        self.show_album(blank)
        self.set_cover(None)

    def _on_albums(self, albums, note):
        self.albums = albums
        if albums:
            self.release_box["values"] = [a.describe() for a in albums]
            self.release_box.current(0)
            self.choose_release()
        self.status_var.set(note)

    def _on_cover(self, data, release_id):
        current = self.current_album()
        if current is None or current.release_id == release_id:
            self.set_cover(data)
            if not data:
                self.status_var.set("Album found, but it has no cover art online. "
                                    "You can add your own picture.")

    def _on_track(self, index, frac, overall, status):
        self.progress["value"] = overall
        iid = str(index)
        if self.tree.exists(iid):
            self.tree.set(iid, "status", status or f"{int(frac * 100)}%")

    def _on_done(self, folder, msg):
        self.last_folder = folder
        self.open_btn["state"] = "normal"
        self.status_var.set(msg)

    def set_busy(self, busy: bool) -> None:
        self.busy = busy
        state = "disabled" if busy else "normal"
        for b in (self.read_btn, self.eject_btn):
            b["state"] = state
        if busy:
            self.rip_btn.configure(text="Stop", command=self.stop,
                                   state="normal" if self._ripping else "disabled")
        else:
            self._ripping = False
            self.rip_btn.configure(text="Rip CD", command=self.rip,
                                   state="normal" if self.toc else "disabled")

    _ripping = False

    # ---------- actions ----------
    def refresh_drives(self) -> None:
        drives = self._list_drives()
        self.drive_box["values"] = drives
        if drives and self.drive_var.get() not in drives:
            self.drive_var.set(drives[0])
        if not drives:
            self.status_var.set("No CD drive found. Plug one in, then press ↻.")

    def read_cd(self) -> None:
        letter = self.drive_var.get()
        if not letter:
            messagebox.showinfo(APP_NAME, "No CD drive was found on this computer.")
            return
        self._run(self._read_cd_work, letter)

    def _read_cd_work(self, letter: str) -> None:
        self.events.put(("status", f"Reading the CD in {letter}…"))
        with self._open_drive(letter) as drive:
            toc = drive.read_toc()
        self.events.put(("toc", toc))
        self.events.put(("status", "Looking up the album online…"))
        try:
            albums = lookup.lookup_disc(toc)
        except lookup.LookupError_ as e:
            self.events.put(("albums", [], str(e)))
            return
        if not albums:
            self.events.put(("albums", [], "This CD isn't in the MusicBrainz database. Type the "
                             "artist and album on the left and press Search, or type the "
                             "song names in yourself."))
            return
        n = len(albums)
        note = "Found it!" if n == 1 else (f"Found {n} versions of this album. The best match "
                                           "is picked; you can choose another at the top.")
        self.events.put(("albums", albums, note))

    def search(self) -> None:
        if self.toc is None:
            messagebox.showinfo(APP_NAME, "Read the CD first.")
            return
        artist, title = self.vars["artist"].get().strip(), self.vars["title"].get().strip()
        if not (artist or title):
            messagebox.showinfo(APP_NAME, "Type the artist and/or album name first.")
            return
        self._run(self._search_work, artist, title)

    def _search_work(self, artist, title):
        self.events.put(("status", "Searching…"))
        albums = lookup.search(artist, title, self.toc)
        if albums:
            self.events.put(("albums", albums, f"Found {len(albums)} possible match(es) with "
                             f"{len(self.toc.audio_tracks)} songs. Pick one at the top."))
        else:
            self.events.put(("status", "Nothing matched. You can type the details in yourself."))

    def current_album(self) -> Album | None:
        i = self.release_box.current()
        return self.albums[i] if 0 <= i < len(self.albums) else None

    def choose_release(self) -> None:
        album = self.current_album()
        if album is None:
            return
        self.show_album(album)
        self.set_cover(None, loading=True)
        threading.Thread(target=lambda: self.events.put(
            ("cover", lookup.fetch_cover(album), album.release_id)), daemon=True).start()

    def show_album(self, album: Album) -> None:
        self.vars["artist"].set(album.artist)
        self.vars["title"].set(album.title)
        self.vars["year"].set(album.year)
        self.vars["genre"].set(album.genre)
        self.vars["disc"].set(f"{album.disc_number}/{album.disc_total}")
        self.tree.delete(*self.tree.get_children())
        for i, t in enumerate(album.tracks):
            secs = self.toc.audio_tracks[i].seconds if self.toc else 0
            self.tree.insert("", "end", iid=str(i),
                             values=("☑", t.number, t.title, t.artist, fmt_time(secs), ""))
        total = fmt_time(self.toc.seconds) if self.toc else ""
        self.head_lbl["text"] = f"{len(album.tracks)} songs, {total}"
        self.rip_btn["state"] = "normal" if self.toc and not self.busy else "disabled"

    def set_cover(self, data: bytes | None, loading: bool = False) -> None:
        self.cover = data
        if data:
            try:
                img = Image.open(io.BytesIO(data))
                img.thumbnail((220, 220))
                self.cover_img = ImageTk.PhotoImage(img)
                self.cover_lbl.configure(image=self.cover_img, text="", width=220, height=220)
                return
            except Exception:
                self.cover = None
        self.cover_img = None
        self.cover_lbl.configure(image="", text="Getting the cover…" if loading else "No cover art",
                                 width=220, height=220)

    def pick_cover(self) -> None:
        path = filedialog.askopenfilename(title="Choose the album cover",
                                          filetypes=[("Pictures", "*.jpg *.jpeg *.png *.webp *.bmp")])
        if not path:
            return
        try:
            img = Image.open(path).convert("RGB")
            img.thumbnail((1200, 1200))
            buf = io.BytesIO()
            img.save(buf, "JPEG", quality=92)
            self.set_cover(buf.getvalue())
        except Exception as e:
            messagebox.showerror(APP_NAME, f"Couldn't open that picture: {e}")

    def pick_folder(self) -> None:
        path = filedialog.askdirectory(initialdir=self.folder_var.get() or default_music_folder())
        if path:
            self.folder_var.set(os.path.normpath(path))
            self._save_settings()

    def toggle_rip(self, event) -> None:
        if self.tree.identify_column(event.x) == "#1" and self.tree.identify_region(event.x, event.y) == "cell":
            iid = self.tree.identify_row(event.y)
            if iid:
                self._toggle(iid)

    def toggle_selected(self) -> None:
        for iid in self.tree.selection():
            self._toggle(iid)

    def _toggle(self, iid: str) -> None:
        self.tree.set(iid, "rip", "☐" if self.tree.set(iid, "rip") == "☑" else "☑")

    def edit_cell(self, event) -> None:
        col = self.tree.identify_column(event.x)
        iid = self.tree.identify_row(event.y)
        if not iid or col not in ("#3", "#4") or self.busy:
            return
        key = "title" if col == "#3" else "artist"
        x, y, w, h = self.tree.bbox(iid, col)
        entry = ttk.Entry(self.tree)
        entry.insert(0, self.tree.set(iid, key))
        entry.select_range(0, "end")
        entry.place(x=x, y=y, width=w, height=h)
        entry.focus_set()

        def save(_=None):
            self.tree.set(iid, key, entry.get().strip())
            entry.destroy()
        entry.bind("<Return>", save)
        entry.bind("<FocusOut>", save)
        entry.bind("<Escape>", lambda e: entry.destroy())

    def album_from_form(self) -> Album:
        base = self.current_album() or Album()
        try:
            dn, dt = (int(x) for x in self.vars["disc"].get().split("/"))
        except ValueError:
            dn, dt = 1, 1
        album = Album(title=self.vars["title"].get().strip() or "Unknown Album",
                      artist=self.vars["artist"].get().strip() or "Unknown Artist",
                      year=self.vars["year"].get().strip(), genre=self.vars["genre"].get().strip(),
                      disc_number=dn, disc_total=max(dn, dt), label=base.label,
                      country=base.country, barcode=base.barcode, release_id=base.release_id,
                      release_group_id=base.release_group_id, artist_id=base.artist_id)
        for iid in self.tree.get_children():
            i = int(iid)
            rec = base.tracks[i].recording_id if i < len(base.tracks) else ""
            album.tracks.append(TrackInfo(i + 1, self.tree.set(iid, "title") or f"Track {i + 1}",
                                          self.tree.set(iid, "artist") or album.artist, rec))
        return album

    def rip(self) -> None:
        if self.toc is None:
            return
        selected = [int(i) for i in self.tree.get_children() if self.tree.set(i, "rip") == "☑"]
        if not selected:
            messagebox.showinfo(APP_NAME, "Tick at least one song to rip.")
            return
        folder = self.folder_var.get().strip()
        if not folder:
            messagebox.showinfo(APP_NAME, "Choose a folder to save the music in.")
            return
        self._save_settings()
        settings = Settings(music_folder=folder, bitrate=BITRATES.get(self.quality_var.get(), 320),
                            save_folder_jpg=self.folderjpg_var.get(),
                            eject_when_done=self.eject_var.get())
        for i in selected:
            self.tree.set(str(i), "status", "waiting")
        self.cancel.clear()
        self._ripping = True
        self.progress["value"] = 0
        self._run(self._rip_work, self.drive_var.get(), self.album_from_form(),
                  self.cover, settings, selected)

    def _rip_work(self, letter, album, cover, settings, selected):
        last = {"i": None}

        def on_progress(i, frac, overall):
            if last["i"] is not None and last["i"] != i:
                self.events.put(("track", last["i"], 1, overall, "✔ done"))
            last["i"] = i
            self.events.put(("track", i, frac, overall, None))

        def on_log(msg):
            self.events.put(("status", msg.strip()))

        try:
            with self._open_drive(letter) as drive:
                if drive.read_toc().disc_id() != self.toc.disc_id():
                    raise RuntimeError("A different CD is in the drive now. Press Read CD again.")
                folder = rip_album(drive, self.toc, album, cover, settings, selected,
                                   on_progress, on_log, self.cancel)
                if last["i"] is not None:
                    self.events.put(("track", last["i"], 1, 1.0, "✔ done"))
                if settings.eject_when_done:
                    drive.eject()
            self.events.put(("done", folder, f"All done! {len(selected)} songs saved to {folder}"))
        except RipCancelled:
            if last["i"] is not None:
                self.events.put(("track", last["i"], 0, 0, "stopped"))
            self.events.put(("status", "Stopped. Songs that finished were kept."))

    def stop(self) -> None:
        self.cancel.set()
        self.status_var.set("Stopping…")

    def eject(self) -> None:
        letter = self.drive_var.get()
        if letter:
            def work():
                with self._open_drive(letter) as d:
                    d.eject()
            self._run(work)

    def open_output(self) -> None:
        if self.last_folder and os.path.isdir(self.last_folder):
            if sys.platform == "win32":
                os.startfile(self.last_folder)

    def on_close(self) -> None:
        if self.busy and self._ripping:
            if not messagebox.askyesno(APP_NAME, "A CD is being ripped. Stop and quit?"):
                return
            self.cancel.set()
        self._save_settings()
        self.root.destroy()


def main() -> None:
    if sys.platform == "win32":
        try:  # crisp text on high-resolution screens
            import ctypes
            ctypes.windll.shcore.SetProcessDpiAwareness(1)
        except Exception:
            pass
    root = tk.Tk()
    icon = resource("icon.png")
    if os.path.exists(icon):
        try:
            root.iconphoto(True, tk.PhotoImage(file=icon))
        except tk.TclError:
            pass
    App(root)
    root.mainloop()


if __name__ == "__main__":
    main()
