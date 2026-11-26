# Slices ChatGPT's labeled Patty pose sheets into a packed sprite atlas for Morris Mayhem.
# usage: python3 -I slice_patty.py <art dir> <out dir>
import sys, json, numpy as np
from PIL import Image
from scipy import ndimage as nd
ART, OUT = sys.argv[1], sys.argv[2]
SCALE = 1.0  # full size (0.62 looked soft on big screens)           # atlas px per sheet px
PAD = 4

def load(name):
    a = np.array(Image.open(f'{ART}/{name}.png').convert('RGBA'))
    a[..., 3][a[..., 3] < 64] = 0           # drop the near-invisible fringe pixels
    return a

def cells(a, rows, cols):
    """Components grouped into a rows x cols grid by centroid; labels (left edge) and title (top) removed."""
    m = a[..., 3] >= 128
    lab, n = nd.label(m)
    objs = nd.find_objects(lab)
    sizes = nd.sum(m, lab, range(1, n + 1))
    grid = {}
    for i, (o, s) in enumerate(zip(objs, sizes)):
        if s < 40: continue
        y, x = o
        if x.start < 12 and x.stop < 190 and (y.stop - y.start) < 130: continue   # row label
        if y.start < 12: continue                                                    # title banner
        cy, cx = (y.start + y.stop) / 2, (x.start + x.stop) / 2
        r = next((k for k, (y0, y1) in enumerate(rows) if y0 <= cy < y1), None)
        c = next((k for k, (x0, x1) in enumerate(cols) if x0 <= cx < x1), None)
        if r is None or c is None: continue
        grid.setdefault((r, c), []).append((i + 1, o, s))
    return lab, grid

def crop(a, lab, comps, foot='main'):
    keep = np.isin(lab, [c[0] for c in comps])
    ys = [c[1][0] for c in comps]; xs = [c[1][1] for c in comps]
    y0, y1 = min(s.start for s in ys), max(s.stop for s in ys)
    x0, x1 = min(s.start for s in xs), max(s.stop for s in xs)
    img = a[y0:y1, x0:x1].copy()
    img[..., 3] = np.where(keep[y0:y1, x0:x1], img[..., 3], 0)
    main = max(comps, key=lambda c: c[2])
    my, mx = main[1]
    # anchor x: middle of the head (top 22% of the main shape); anchor y: bottom of the main shape
    mm = lab[my, mx] == main[0]
    top = mm[: max(1, int(mm.shape[0] * 0.22))]
    xs_ = np.nonzero(top)[1]
    ax = mx.start + (xs_.mean() if len(xs_) else mm.shape[1] / 2) - x0
    ay = my.stop - y0
    return img, ax, ay

frames = {}
def add(name, img, ax, ay):
    im = Image.fromarray(img)
    w, h = im.size
    im = im.resize((max(1, round(w * SCALE)), max(1, round(h * SCALE))), Image.LANCZOS)
    frames[name] = (im, ax * SCALE, ay * SCALE)

COLS = [(0, 345), (345, 640), (640, 940), (940, 2000)]
sheets = {
    'move':     ([(75, 392), (392, 690), (690, 985), (985, 1300)], ['idle', 'run', 'jump', 'hurt']),
    'attacks':  ([(80, 385), (385, 686), (686, 988), (988, 1300)], ['ring', 'drop', 'kick', 'shove']),
    'specials': ([(80, 390), (390, 688), (688, 988), (988, 1300)], ['toss', 'cart', 'deliver', 'pack']),
    # second batch: the attacks that were missing (no row captions on this sheet)
    'missing': ([(75, 445), (445, 735), (735, 1090)], ['raise', 'scoop', 'markdown'], [(0, 370), (370, 720), (720, 1080), (1080, 2000)]),
}
for sheet, (rows, names, *cols) in sheets.items():
    a = load(sheet)
    if sheet == 'ultimate':  # tags sit under each pose on this sheet: cut them off
        a[400:500, :, 3] = 0; a[800:, :, 3] = 0
    lab, grid = cells(a, rows, cols[0] if cols else COLS)
    for (r, c), comps in grid.items():
        if sheet == 'specials' and r == 0 and c == 2:           # leave the thrown parcel out of the pose
            comps = [k for k in comps if k[1][1].start < 890]
        if sheet == 'specials' and r == 3:                       # dogs are separate projectiles
            comps = [k for k in comps if k[2] > 15000] or comps
        img, ax, ay = crop(a, lab, comps)
        add(f'{names[r]}{c}', img, ax, ay)

# props: parcel and the three dogs
sp = load('specials')
add('parcel', sp[89:141, 898:961], 31, 26)
add('dog0', sp[1195:1281, 709:806], 48, 84)
pair = sp[1170:1273, 800:960]
colsum = (pair[..., 3] > 128).sum(0)
cut = 40 + int(np.argmin(colsum[40:120]))
add('dog1', pair[:, :cut], cut / 2, 101)
add('dog2', pair[:, cut:], (160 - cut) / 2, 101)

# pack into rows
order = list(frames)
W = 2048; x = y = rowh = 0; layout = {}
for k in order:
    im, ax, ay = frames[k]
    w, h = im.size
    if x + w + PAD > W: x = 0; y += rowh + PAD; rowh = 0
    layout[k] = (x, y, w, h, round(ax, 1), round(ay, 1)); x += w + PAD; rowh = max(rowh, h)
H = y + rowh
atlas = Image.new('RGBA', (W, H))
for k, (x, y, w, h, ax, ay) in layout.items(): atlas.paste(frames[k][0], (x, y))
atlas.save(f'{OUT}/patty-atlas.webp', 'WEBP', quality=88, method=6)
atlas.save(f'{OUT}/patty-atlas-preview.png')
json.dump(layout, open(f'{OUT}/patty-frames.json', 'w'))
print('atlas', W, H, 'frames', len(layout), 'standing height', layout['idle0'][3])
