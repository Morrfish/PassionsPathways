"""Add ChatGPT's six colour-swap key poses to Cloe's atlas as swapred .. swappurple.
Each source is 320x352 with the feet at (160, 330); sized so her standing height matches idle0.
usage: add_cloe_swaps.py <rawdir> <outdir>"""
import sys, os, json, shutil
from PIL import Image
raw, out = sys.argv[1:3]
base_a, base_f = f'{out}/cloe-base-atlas.webp', f'{out}/cloe-base-frames.json'
if not os.path.exists(base_f):  # the atlas before the swaps were added, kept so this can be re-run
    shutil.copy(f'{out}/cloe-atlas.webp', base_a); shutil.copy(f'{out}/cloe-frames.json', base_f)
fr = json.load(open(base_f)); A = Image.open(base_a).convert('RGBA')
cols = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
ref = Image.open(f'{raw}/cloe-swap-red-v2.png').convert('RGBA')
s = fr['idle0'][5] / (330 - ref.split()[3].getbbox()[1])  # feet-to-top of the red pose = idle's feet-to-top
cuts = []
for c in cols:
    im = Image.open(f'{raw}/cloe-swap-{c}-v2.png').convert('RGBA'); bb = im.split()[3].getbbox(); im = im.crop(bb)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    cuts.append((f'swap{c}', im, ((160 - bb[0]) * s, (330 - bb[1]) * s)))
y0 = A.height + 2; x = 0; H = max(c.height for _, c, _ in cuts)
N = Image.new('RGBA', (A.width, y0 + H)); N.paste(A, (0, 0))
for n, c, (ax, ay) in cuts:
    N.paste(c, (x, y0)); fr[n] = [x, y0, c.width, c.height, round(ax, 1), round(ay, 1)]; x += c.width + 2
N.save(f'{out}/cloe-atlas.webp', 'WEBP', quality=88, method=6); json.dump(fr, open(f'{out}/cloe-frames.json', 'w'))
print('cloe', N.size, len(fr), 'swap scale', round(s, 3), fr['swapred'])
