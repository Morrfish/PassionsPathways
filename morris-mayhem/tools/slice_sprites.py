# Cuts an artist's labeled pose sheets (4 poses per row) into one packed sprite atlas for Morris Mayhem.
# Works with ChatGPT's sheets: drops the title banner, row labels on the left, the yellow name tags
# under each pose, and the near-invisible colored fringe pixels.
#
# usage: python3 -I tools/slice_sprites.py <character> <art dir> <out dir>
# Output: <out>/<character>-atlas.webp and <out>/<character>-frames.json (paste into src/js/sprites.js).
import sys, json, numpy as np
from PIL import Image
from scipy import ndimage as nd

CHARACTERS = {
    'jeffery': {
        'scale': 0.62,
        'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['onetwo', 'catch', 'boot', 'reel'],
            'specials.png': ['fish', 'buck', 'stand', 'cover'],
        },
        # bits that become their own projectiles: name, sheet, crop box (x0, y0, x1, y1)
        'props': [('bobber', 'attacks.png', None)],
    },
}

def tag_bands(a):
    """Rows holding the yellow name tags (several separate yellow runs across the sheet)."""
    b = a[:, 165:]
    yel = (b[..., 0] > 215) & (b[..., 1] > 170) & (b[..., 2] < 90) & (b[..., 3] > 200)
    runs = (np.diff(yel.astype(int), axis=1) == 1).sum(1)
    hits = np.where((yel.sum(1) > 250) & (runs >= 4))[0]
    bands = []
    for r in hits:
        if bands and r - bands[-1][1] <= 3: bands[-1][1] = r
        else: bands.append([r, r])
    return [b for b in bands if b[1] - b[0] > 8]

def slice_sheet(path, names, cols, frames, scale):
    a = np.array(Image.open(path).convert('RGBA'))
    a[..., 3][a[..., 3] < 64] = 0
    bands = tag_bands(a)
    title_end = bands[0][1] + 8 if bands and bands[0][0] < 80 else 60
    tags = [b for b in bands if b[0] > 80]
    # rows of poses sit between the title and the first tag strip, then between tag strips
    rows, top = [], title_end
    for b in tags:
        rows.append((top, b[0] - 6)); top = b[1] + 20
    # a thin cut just above each tag strip separates poses that touch their tag
    for b in tags: a[b[0] - 7:b[0] - 4, :, 3] = 0
    m = a[..., 3] >= 128
    lab, n = nd.label(m)
    objs = nd.find_objects(lab)
    sizes = nd.sum(m, lab, range(1, n + 1))
    grid = {}
    for i, (o, s) in enumerate(zip(objs, sizes)):
        if s < 40: continue
        y, x = o
        cy, cx = (y.start + y.stop) / 2, (x.start + x.stop) / 2
        if cx < cols[0]: continue                                     # row labels
        px = a[y, x][lab[y, x] == i + 1]
        if ((px[:, 0] > 200) & (px[:, 1] > 150) & (px[:, 2] < 110)).mean() > 0.3 and (y.stop - y.start) < 80: continue  # name tag
        r = next((k for k, (y0, y1) in enumerate(rows) if y0 <= cy < y1), None)
        c = next((k for k in range(4) if cols[k] <= cx < cols[k + 1]), None)
        if r is None or c is None or r >= len(names): continue
        grid.setdefault((r, c), []).append((i + 1, o, s))
    for (r, c), comps in grid.items():
        keep = np.isin(lab, [k[0] for k in comps])
        y0 = min(k[1][0].start for k in comps); y1 = max(k[1][0].stop for k in comps)
        x0 = min(k[1][1].start for k in comps); x1 = max(k[1][1].stop for k in comps)
        img = a[y0:y1, x0:x1].copy()
        img[..., 3] = np.where(keep[y0:y1, x0:x1], img[..., 3], 0)
        main = max(comps, key=lambda k: k[2]); my, mx = main[1]
        mm = lab[my, mx] == main[0]
        xs = np.nonzero(mm[: max(1, int(mm.shape[0] * 0.22))])[1]
        ax = mx.start + (xs.mean() if len(xs) else mm.shape[1] / 2) - x0
        ay = my.stop - y0
        add(frames, f'{names[r]}{c}', img, ax, ay, scale)
    return a, lab

def add(frames, name, img, ax, ay, scale):
    im = Image.fromarray(img)
    w, h = im.size
    im = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
    frames[name] = (im, ax * scale, ay * scale)

def pack(frames, out, who):
    W, PAD = 2048, 4
    x = y = rowh = 0; layout = {}
    for k, (im, ax, ay) in frames.items():
        w, h = im.size
        if x + w + PAD > W: x = 0; y += rowh + PAD; rowh = 0
        layout[k] = (x, y, w, h, round(ax, 1), round(ay, 1)); x += w + PAD; rowh = max(rowh, h)
    atlas = Image.new('RGBA', (W, y + rowh))
    for k, (x, y, w, h, ax, ay) in layout.items(): atlas.paste(frames[k][0], (x, y))
    atlas.save(f'{out}/{who}-atlas.webp', 'WEBP', quality=88, method=6)
    atlas.save(f'{out}/{who}-atlas-preview.png')
    json.dump(layout, open(f'{out}/{who}-frames.json', 'w'))
    print(who, 'atlas', W, atlas.size[1], 'frames', len(layout))

if __name__ == '__main__':
    who, art, out = sys.argv[1:4]
    cfg = CHARACTERS[who]; frames = {}
    for sheet, names in cfg['sheets'].items():
        slice_sheet(f'{art}/{sheet}', names, cfg['cols'], frames, cfg['scale'])
    # the red bobber from the cast pose in the attacks sheet: largest red blob in that cell
    a = np.array(Image.open(f'{art}/attacks.png').convert('RGBA')); a[..., 3][a[..., 3] < 64] = 0
    red = (a[..., 0] > 180) & (a[..., 1] < 90) & (a[..., 2] < 90) & (a[..., 3] > 128)
    red[:880] = False
    lab, n = nd.label(nd.binary_dilation(red, iterations=3))
    sizes = nd.sum(red, lab, range(1, n + 1)); o = nd.find_objects(lab)[int(np.argmax(sizes))]
    y, x = o; pad = 4
    box = a[y.start - pad:y.stop + pad, x.start - pad:x.stop + pad]
    add(frames, 'bobber', box, box.shape[1] / 2, box.shape[0] / 2, cfg['scale'])
    pack(frames, out, who)
