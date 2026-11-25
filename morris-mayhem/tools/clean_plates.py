"""Erase purple/gold caption plates stuck to the first pose of a row.
usage: clean_plates.py <outdir> <id> <frame> [frame...]
Edits <id>-atlas.webp in place (only inside the given frames)."""
import sys, json
import numpy as np
from PIL import Image
from scipy import ndimage

out, sid, names = sys.argv[1], sys.argv[2], sys.argv[3:]
fr = json.load(open(f'{out}/{sid}-frames.json'))
A = np.array(Image.open(f'{out}/{sid}-atlas.webp').convert('RGBA'))
for k in names:
    x, y, w, h = fr[k][:4]
    c = A[y:y+h, x:x+w].astype(int)
    r, g, b, a = c[..., 0], c[..., 1], c[..., 2], c[..., 3]
    purple = (a > 40) & (b > r - 10) & (b > g + 25) & (r < 130) & (g < 80)
    lab, n = ndimage.label(purple)
    if not n: continue
    sizes = ndimage.sum(purple, lab, range(1, n + 1))
    big = 1 + int(np.argmax(sizes))
    ys, xs = np.where(lab == big)
    y0, y1, x0, x1 = ys.min() - 9, ys.max() + 9, xs.min() - 12, xs.max() + 12
    y0, x0 = max(0, y0), max(0, x0)
    box = np.zeros(a.shape, bool); box[y0:y1+1, x0:x1+1] = True
    gold = (r > 170) & (g > 120) & (b < 110) & (r - b > 90)
    white = (r > 200) & (g > 200) & (b > 200)
    dark = (r < 70) & (g < 60) & (b < 80)
    kill = box & (a > 0) & (purple | gold | white | dark | (a < 200))
    c[..., 3][kill] = 0
    # drop leftover crumbs inside the box that aren't attached to the main body
    solid = c[..., 3] > 30
    lab2, n2 = ndimage.label(solid)
    if n2 > 1:
        s2 = ndimage.sum(solid, lab2, range(1, n2 + 1))
        keep = 1 + int(np.argmax(s2))
        for i in range(1, n2 + 1):
            if i != keep and s2[i-1] < 1500:
                m = lab2 == i
                if (m & box).sum() > 0.5 * m.sum():
                    c[..., 3][m] = 0
    A[y:y+h, x:x+w] = c.astype(np.uint8)
    print(k, 'plate', (x0, y0, x1, y1))
Image.fromarray(A).save(f'{out}/{sid}-atlas.webp', lossless=True)
