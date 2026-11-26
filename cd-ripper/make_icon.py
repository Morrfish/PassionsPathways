"""Draws the CD Ripper icon (icon.ico for the .exe, cdripper/icon.png for the window)."""
from PIL import Image, ImageDraw

S = 512
im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(im)
d.ellipse((16, 16, S - 16, S - 16), fill="#c9d3e6", outline="#56637d", width=10)
for r, col in [(200, "#e8ecf5"), (170, "#b9c6e2"), (140, "#d8c7ee"), (110, "#c6e3ee")]:
    d.ellipse((S/2 - r, S/2 - r, S/2 + r, S/2 + r), outline=col, width=14)
d.ellipse((S/2 - 70, S/2 - 70, S/2 + 70, S/2 + 70), fill="#56637d")
d.ellipse((S/2 - 26, S/2 - 26, S/2 + 26, S/2 + 26), fill=(0, 0, 0, 0))
# music note
d.ellipse((300, 330, 400, 410), fill="#e0475b")
d.rectangle((380, 150, 400, 372), fill="#e0475b")
d.polygon([(400, 150), (470, 190), (470, 230), (400, 195)], fill="#e0475b")
im.save("icon.ico", sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
im.resize((64, 64), Image.LANCZOS).save("cdripper/icon.png")
