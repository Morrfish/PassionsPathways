# Cuts the 4 ultimate key poses from each fighter's "ultimate & personality" sheet into a small atlas
# (<id>-ult-atlas.webp + <id>-ult-frames.json, frames ult0..ult3).
# usage: python3 -I tools/slice_ultimates.py <out dir> <id>=<sheet.png> ...
import sys, json, numpy as np
from PIL import Image
from scipy import ndimage as nd
# row band (y0, y1) that holds the ultimate row (labels/tags outside it), and column bounds (x of left edges)
CFG = {
    'patty-ult':         dict(band=(80, 492), cols=[200, 405, 870, 1260, 9999]),
    'jeffery-ult':       dict(band=(80, 412), cols=[215, 470, 790, 1340, 9999]),
    'mandi-witch-ult':   dict(band=(62, 298), cols=[165, 415, 695, 975, 9999]),
    'mandi-mermaid-ult': dict(band=(362, 588), cols=[165, 415, 695, 975, 9999]),
}
SCALE = 0.62
out = sys.argv[1]
for arg in sys.argv[2:]:
    who, path = arg.split('=')
    c = CFG[who]
    a = np.array(Image.open(path).convert('RGBA'))[c['band'][0]:c['band'][1]]
    a[..., 3][a[..., 3] < 64] = 0
    m = a[..., 3] >= 128
    lab, n = nd.label(m); objs = nd.find_objects(lab); sizes = nd.sum(m, lab, range(1, n + 1))
    cells = {}
    for i, (o, s) in enumerate(zip(objs, sizes)):
        if s < 40: continue
        y, x = o; cx = (x.start + x.stop) / 2
        if cx < c['cols'][0]: continue  # row label
        if (y.stop - y.start) < 6 and (x.stop - x.start) > 150: continue  # layout rule lines
        k = next(k for k in range(4) if c['cols'][k] <= cx < c['cols'][k + 1])
        cells.setdefault(k, []).append((i + 1, o, s))
    frames = {}
    for k, comps in sorted(cells.items()):
        keep = np.isin(lab, [q[0] for q in comps])
        y0 = min(q[1][0].start for q in comps); y1 = max(q[1][0].stop for q in comps)
        x0 = min(q[1][1].start for q in comps); x1 = max(q[1][1].stop for q in comps)
        img = a[y0:y1, x0:x1].copy(); img[..., 3] = np.where(keep[y0:y1, x0:x1], img[..., 3], 0)
        # anchor: the fighter's feet = lowest opaque row near the cell's middle third; x = middle of the opaque
        # pixels in the top quarter that belong to the biggest blob (the fighter's head)
        main = max(comps, key=lambda q: q[2]); my, mx = main[1]; mm = lab[my, mx] == main[0]
        xs = np.nonzero(mm[: max(1, int(mm.shape[0] * 0.25))])[1]
        ax = mx.start + (xs.mean() if len(xs) else mm.shape[1] / 2) - x0
        ay = my.stop - y0
        im = Image.fromarray(img); w, h = im.size
        frames[f'ult{k}'] = (im.resize((round(w * SCALE), round(h * SCALE)), Image.LANCZOS), ax * SCALE, ay * SCALE)
    W = sum(f[0].size[0] + 4 for f in frames.values()); H = max(f[0].size[1] for f in frames.values())
    atlas = Image.new('RGBA', (W, H)); x = 0; layout = {}
    for name, (im, ax, ay) in frames.items():
        atlas.paste(im, (x, 0)); layout[name] = (x, 0, im.size[0], im.size[1], round(ax, 1), round(ay, 1)); x += im.size[0] + 4
    atlas.save(f'{out}/{who}-atlas.webp', 'WEBP', quality=86, method=6); atlas.save(f'{out}/{who}-atlas-preview.png')
    json.dump(layout, open(f'{out}/{who}-frames.json', 'w'))
    print(who, len(frames), 'frames', atlas.size)
