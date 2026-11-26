"""Replace one move's four poses in a fighter atlas with ChatGPT's hi-res 2x2 sheet (top-left, top-right,
bottom-left, bottom-right = <prefix>0..3). Every other frame is cut back out of the atlas and repacked.
New poses are stored at up to <maxh> px tall (sharp); the sprite builder then sizes them to the old
in-game size via <id>-fscale.json (written by tools/match_sizes.py).
usage: add_hires_poses.py <outdir> <id> <sheet.png> <prefix> [maxh]"""
import sys, json
import numpy as np
from PIL import Image
from scipy import ndimage as nd
out, sid, sheet, pre = sys.argv[1:5]; maxh = int(sys.argv[5]) if len(sys.argv) > 5 else 520
fr = json.load(open(f'{out}/{sid}-frames.json')); A = Image.open(f'{out}/{sid}-atlas.webp').convert('RGBA')
frames = {k: (A.crop((x, y, x + w, y + h)), ax, ay) for k, (x, y, w, h, ax, ay) in fr.items() if not (k.startswith(pre) and k[len(pre):].isdigit())}
S = Image.open(sheet).convert('RGBA'); W, H = S.size
cells = [S.crop((cx * W // 2, cy * H // 2, (cx + 1) * W // 2, (cy + 1) * H // 2)) for cy in (0, 1) for cx in (0, 1)]
for i, c in enumerate(cells):
    al = np.array(c)[..., 3] > 24; lab, n = nd.label(al); sz = nd.sum(al, lab, range(1, n + 1))
    keep = np.isin(lab, [j + 1 for j in range(n) if sz[j] >= 0.002 * sz.max()])  # drop specks
    arr = np.array(c); arr[..., 3][~keep] = 0; c = Image.fromarray(arr)
    bb = c.split()[3].point(lambda v: 255 if v > 24 else 0).getbbox(); c = c.crop(bb)
    s = min(1, maxh / c.height); c = c.resize((max(1, round(c.width * s)), max(1, round(c.height * s))), Image.LANCZOS)
    a = np.array(c)[..., 3] > 100; rows = np.where(a.any(1))[0]; foot = a[rows[-1] - min(6, len(rows) - 1):rows[-1] + 1].any(0)
    xs = np.where(foot)[0]; ax = (xs.min() + xs.max()) / 2 if len(xs) else c.width / 2  # anchor: under the feet / wheels
    frames[f'{pre}{i}'] = (c, ax, c.height)
items = sorted(frames.items(), key=lambda kv: -kv[1][0].height)
x = y = rowh = 0; pos = {}
for k, (c, _, _) in items:
    if x + c.width > 2048: x, y, rowh = 0, y + rowh + 2, 0
    pos[k] = (x, y); x += c.width + 2; rowh = max(rowh, c.height)
N = Image.new('RGBA', (2048, y + rowh)); F = {}
for k, (c, ax, ay) in items:
    px, py = pos[k]; N.paste(c, (px, py)); F[k] = [px, py, c.width, c.height, round(float(ax), 1), round(float(ay), 1)]
N.save(f'{out}/{sid}-atlas.webp', 'WEBP', quality=88, method=6); json.dump(F, open(f'{out}/{sid}-frames.json', 'w'))
print(sid, N.size, len(F), {k: F[k][2:4] for k in F if k.startswith(pre) and k[len(pre):].isdigit()})
