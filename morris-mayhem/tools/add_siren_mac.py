# Adds Siren's new Mac Attack throw poses and noodle effects to her existing atlas (her original sheets
# aren't in this session): every old frame is cut back out of the atlas, the new ones added, all repacked.
import sys, json, numpy as np
from PIL import Image
from scipy import ndimage as nd
sys.path.insert(0, sys.argv[1]); import slice_sprites as ss
SCALE = ss.CHARACTERS['siren']['scale']  # same scale as the rest of her atlas
SP, out = sys.argv[2], sys.argv[3]
L = json.load(open(f'{out}/siren-frames.json')); at = Image.open(f'{out}/siren-atlas-preview.png').convert('RGBA')
frames = {k: (at.crop((x, y, x + w, y + h)), ax, ay) for k, (x, y, w, h, ax, ay) in L.items()}
def clean(a):  # drop the red fringe ChatGPT's export left around everything
    a = a.copy(); r, g, b, al = (a[..., i].astype(int) for i in range(4))
    a[..., 3][((r > 150) & (g < 110) & (b < 110)) | (al < 64)] = 0
    return a
a = clean(np.array(Image.open(f'{SP}/raw/siren-mac/throw.png').convert('RGBA')))
band = a[90:505].copy()
lab, n = nd.label(band[..., 3] >= 128); objs = nd.find_objects(lab); sizes = nd.sum(band[..., 3] >= 128, lab, range(1, n + 1))
cols = [(230, 540), (560, 900), (900, 1400), (1400, 1774)]
for c, (x0c, x1c) in enumerate(cols):
    ids = [i + 1 for i, (o, s) in enumerate(zip(objs, sizes)) if s > 30 and o[1].stop - o[1].start < 480 and x0c <= (o[1].start + o[1].stop) / 2 < x1c]
    main = max(ids, key=lambda i: sizes[i - 1]); keep = np.isin(lab, ids)
    ys, xs = np.nonzero(keep); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    img = band[y0:y1, x0:x1].copy(); img[..., 3] = np.where(keep[y0:y1, x0:x1], img[..., 3], 0)
    mo = objs[main - 1]; mm = lab[mo] == main
    tx = np.nonzero(mm[: max(1, int(mm.shape[0] * 0.22))])[1]
    ax = mo[1].start + (tx.mean() if len(tx) else mm.shape[1] / 2) - x0; ay = mo[0].stop - y0
    ss.add(frames, f'mac{c}', img, ax, ay, SCALE)
for name, fn in [('fxnoodles', 'fx-noodles'), ('fximpact', 'fx-impact'), ('fxpuddle', 'fx-puddle'), ('fxnoodle', 'fx-noodle')]:
    e = clean(np.array(Image.open(f'{SP}/raw/siren-mac/{fn}.png').convert('RGBA')))
    ys, xs = np.nonzero(e[..., 3]); e = e[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    ss.add(frames, name, e, e.shape[1] / 2, e.shape[0] / 2, SCALE)
# frames cut back out of the atlas are already at game scale: add() would shrink them again
for k, v in list(frames.items()):
    if k in L: im, ax, ay = v; frames[k] = (im, ax, ay)
ss.pack(frames, out, 'siren')
