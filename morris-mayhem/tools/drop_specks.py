"""Remove small loose bits (leftover label lines) from some frames of an atlas, in place.
usage: drop_specks.py <outdir> <id> <frame> [frame...]"""
import sys, json
import numpy as np
from PIL import Image
from scipy import ndimage as nd
out, sid, names = sys.argv[1], sys.argv[2], sys.argv[3:]
fr = json.load(open(f'{out}/{sid}-frames.json')); A = np.array(Image.open(f'{out}/{sid}-atlas.webp').convert('RGBA'))
for k in names:
    x, y, w, h = fr[k][:4]; c = A[y:y + h, x:x + w]; al = c[..., 3] > 30
    lab, n = nd.label(al, structure=np.ones((3, 3)));
    if n < 2: continue
    sz = nd.sum(al, lab, range(1, n + 1)); main = 1 + int(np.argmax(sz))
    for i, o in enumerate(nd.find_objects(lab)):
        hh, ww = o[0].stop - o[0].start, o[1].stop - o[1].start
        if i + 1 != main and sz[i] < 0.03 * sz.max() and (hh <= 6 or ww > 4 * hh):  # thin, flat leftovers only (not sparkles)
            c[..., 3][lab == i + 1] = 0
Image.fromarray(A).save(f'{out}/{sid}-atlas.webp', 'WEBP', quality=88, method=6)
print(sid, 'cleaned', names)
