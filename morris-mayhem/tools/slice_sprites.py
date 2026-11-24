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
    # Mandi's two outfits are two atlases; each also takes its own rows of the shared ultimate sheet.
    'mandi-witch': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['brush', 'says', 'boot', 'rules'],
            'specials.png': ['trick', 'salon', 'broom', 'whirl'],
        },
        # thrown/placed things: name, sheet, a point inside the thing (sheet px); removed from the pose
        'props': [('pumpkin', 'specials.png', (990, 105)), ('dryer', 'specials.png', (1200, 540))],
    },
    'jadden': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['combo', 'header', 'sweep', 'volley'],
            'aerials.png': ['uair', 'stomp', 'round', 'back'],
            'specials.png': ['hail', 'drive', 'leap', 'ice'],
        },
        'props': [('football', 'specials.png', (990, 88))],
        'cutcols': {'aerials.png': [(695, 60, 400)]},  # up-air poses touch through their glow: x, y0, y1
    },
    'courtnee': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['click', 'upper', 'battery', 'reboot'],
            'aerials.png': ['acombo', 'upload', 'crash', 'round'],
            'specials.png': ['hameha', 'rush', 'takeoff', 'saiyan'],
            'defense.png': ['def', None, 'bair', None],
            'ultimate.png': ['asm', 'ult', 'ret', 'pers'],
            'effects.png': {'rows': ['fx', None, 'tech', 'aura'], 'cols': [0, 320, 630, 970, 9999]},
        },
        'props': [],
    },
    'courtnee-super': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'smove.png': ['idle', 'run', 'jump', 'hurt'],
            'sattacks.png': ['click', 'upper', 'battery', 'reboot'],
            'saerials.png': ['acombo', 'upload', 'crash', 'round'],
            'sspecials.png': ['hameha', 'rush', 'takeoff', 'down'],
            'defense.png': [None, 'def', None, 'bair'],
            'effects.png': {'rows': [None, 'fx', None, 'aura'], 'cols': [0, 320, 630, 970, 9999]},
        },
        'props': [],
    },
    'megan': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['hit', 'chapter', 'beat', 'ret'],
            'aerials.png': ['page', 'note', 'drop', 'fan'],
            'specials.png': ['twist', 'pounce', 'encore', 'nap'],
            'krillin.png': {'rows': ['krun', 'kpounce', 'kstate', 'prop'], 'cols': [165, 415, 695, 975, 9999]},
            'defense.png': {'rows': ['def', 'bair'], 'cols': [240, 600, 990, 1380, 9999]},
            'ultimate.png': {'rows': ['ult', 'pers'], 'cols': [200, 540, 880, 1390, 9999]},
        },
        'props': [],
        'cutcols': {'ultimate.png': [(870, 70, 420)]},
        'cutrows': {'ultimate.png': [72]},  # glows reach up into the title banner
        'mainonly': {'specials.png': ['pounce']},  # the baked cat is drawn separately as Krillin
    },
    'siren': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['pop', 'rain', 'sweep', 'toss'],
            'aerials.png': ['doodle', 'sky', 'boots', 'spin'],
            'specials.png': ['sketch', 'blitz', 'note', 'mac'],
            'props.png': {'rows': ['drag', 'bprop', 'aprop', 'mprop'], 'cols': [165, 420, 700, 1000, 9999]},
            'defense.png': {'rows': ['def', 'bair'], 'cols': [220, 520, 920, 1400, 9999]},
            'ultimate.png': {'rows': ['ult', 'pers'], 'cols': [200, 470, 860, 1395, 9999]},
        },
        'props': [],
        'cutcols': {'ultimate.png': [(1395, 70, 420), (860, 70, 420)], 'specials.png': [(415, 70, 330), (695, 70, 330), (975, 70, 330)]},
        'cutrows': {'ultimate.png': [72], 'specials.png': [68]},
        # these two sheets have no name tags under the poses: row bands (y0, y1) given by hand
        'rowbands': {'attacks.png': [(60, 325), (325, 600), (600, 872), (872, 1199)],
                     'aerials.png': [(60, 325), (325, 600), (600, 872), (872, 1199)]},
        'mainonly': {'specials.png': ['sketch']},  # the dragon is drawn separately when it springs out
    },
    'mandi-mermaid': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['shell', 'tide', 'fin', 'dive'],
            'specials.png': ['bubble', 'wave', 'surface', 'whirl'],
        },
        'props': [('bubbleball', 'specials.png', (968, 128))],
    },
    # Codee: no name tags under poses (labels on the left), so rows are given by hand. Shared sheets
    # (defense, transformation, ultimate) give each form its own rows.
    'codee': {
        'scale': 0.62, 'cols': [215, 470, 780, 1080, 9999],
        'sheets': {
            'codee-land-movement.png': ['idle', 'run', 'jump', 'hurt'],
            'codee-land-attacks.png': ['whack', 'rake', 'sod', 'yard'],
            'codee-land-aerials.png': ['hedge', 'branch', 'bootp', 'yspin'],
            'codee-land-specials.png': ['mulch', 'mow', 'leaf', 'mud'],
            'codee-defense.png': ['def', None, 'bair', None],
            'codee-transformation.png': ['mess', 'cup', None, 'ovl'],
            'codee-ultimate.png': ['ult', None, 'pers', None],
            'codee-props.png': {'rows': ['tool', 'ctool', 'fx', 'door'], 'cols': [20, 380, 730, 1080, 9999]},
        },
        'props': [],
        'cutrows': {'codee-land-specials.png': [846], 'codee-props.png': [1041]},  # leaf-blower boots touch the mud row; labels touch the door art
        'rowbands': {s: [(100, 362), (362, 610), (610, 846), (846, 1086)] for s in (
            'codee-land-movement.png', 'codee-land-attacks.png', 'codee-land-aerials.png', 'codee-land-specials.png',
            'codee-defense.png', 'codee-ultimate.png')} | {
            'codee-transformation.png': [(100, 395), (395, 649), (649, 919), (919, 1086)],
            'codee-props.png': [(95, 322), (363, 588), (628, 776), (818, 1043)]},
    },
    'codee-clean': {
        'scale': 0.62, 'cols': [215, 470, 780, 1080, 9999],
        'sheets': {
            'codee-clean-movement.png': ['idle', 'run', 'jump', 'hurt'],
            'codee-clean-attacks.png': ['sweep', 'duster', 'mop', 'trash'],
            'codee-clean-aerials.png': ['dbust', 'hdust', 'squeak', 'polish'],
            'codee-clean-specials.png': ['suds', 'patrol', 'vac', 'wet'],
            'codee-defense.png': [None, 'def', None, 'bair'],
            'codee-transformation.png': [None, None, 'back', None],
            'codee-ultimate.png': [None, 'ult', None, 'pers'],
            'codee-props.png': {'rows': ['tool', 'ctool', 'fx', 'door'], 'cols': [20, 380, 730, 1080, 9999]},  # foam/water patch live here too
        },
        'props': [],
        'cutrows': {'codee-props.png': [1041]},
        'rowbands': {s: [(100, 362), (362, 610), (610, 846), (846, 1086)] for s in (
            'codee-clean-movement.png', 'codee-clean-attacks.png', 'codee-clean-aerials.png', 'codee-clean-specials.png',
            'codee-defense.png', 'codee-ultimate.png')} | {
            'codee-transformation.png': [(100, 395), (395, 649), (649, 919), (919, 1086)],
            'codee-props.png': [(95, 322), (363, 588), (628, 776), (818, 1043)]},
    },
}

CUTROWS = {}
ROWBANDS = {}

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

def cut_tags(a, tags):
    # thin cuts just above and below each tag strip separate poses and effects that touch their tag
    for b in tags:
        a[b[0] - 7:b[0] - 4, :, 3] = 0
        a[b[1] + 12:b[1] + 15, :, 3] = 0

def slice_sheet(path, names, cols, frames, scale, excl=(), cutcols=False, mainonly=()):
    a = np.array(Image.open(path).convert('RGBA'))
    a[..., 3][a[..., 3] < 64] = 0
    bands = tag_bands(a)
    title_end = bands[0][1] + 8 if bands and bands[0][0] < 80 else 60
    tags = [b for b in bands if b[0] > 80]
    # rows of poses sit between the title and the first tag strip, then between tag strips
    rows, top = [], title_end
    rb = ROWBANDS.get(path.rsplit('/', 1)[-1])
    a[max(0, title_end - 3):title_end + 1, :, 3] = 0  # separate the title banner from poses that touch it
    for b in tags:
        rows.append((top, b[0] - 6)); top = b[1] + 20
    if rb: rows = list(rb)
    # a thin cut just above each tag strip separates poses that touch their tag
    cut_tags(a, tags)
    for (cx_, y0_, y1_) in (cutcols or {}).get(path.rsplit('/', 1)[-1], []): a[y0_:y1_, cx_ - 2:cx_ + 2, 3] = 0
    for ry in CUTROWS.get(path.rsplit('/', 1)[-1], []): a[ry - 2:ry + 2, :, 3] = 0
    m = a[..., 3] >= 128
    lab, n = nd.label(m)
    objs = nd.find_objects(lab)
    sizes = nd.sum(m, lab, range(1, n + 1))
    grid = {}
    for i, (o, s) in enumerate(zip(objs, sizes)):
        if s < 40: continue
        y, x = o
        cy, cx = (y.start + y.stop) / 2, (x.start + x.stop) / 2
        if cx < cols[0] or y.stop < title_end + 20: continue           # row labels, title banner
        if (y.stop - y.start) < 8 and (x.stop - x.start) > 150: continue  # layout rule lines
        px = a[y, x][lab[y, x] == i + 1]
        if ((px[:, 0] > 200) & (px[:, 1] > 150) & (px[:, 2] < 110)).mean() > 0.3 and (y.stop - y.start) < 80: continue  # name tag
        r = next((k for k, (y0, y1) in enumerate(rows) if y0 <= cy < y1), None)
        c = next((k for k in range(4) if cols[k] <= cx < cols[k + 1]), None)
        if r is None or c is None or r >= len(names) or names[r] is None: continue
        if any(x.start <= px_ <= x.stop and y.start <= py_ <= y.stop for (px_, py_) in excl): continue  # a prop, cut separately
        grid.setdefault((r, c), []).append((i + 1, o, s))
    # small pieces (sparks, motion lines) belong to the nearest body in the same row, not to whichever
    # column their middle happens to fall in
    bodies = [((r, c), k) for (r, c), comps in grid.items() for k in comps if k[2] >= 3000]
    for key in list(grid):
        for k in list(grid[key]):
            if k[2] >= 3000: continue
            y, x = k[1]
            def gap(b):
                by, bx = b[1][1]
                dx = max(bx.start - x.stop, x.start - bx.stop, 0); dy = max(by.start - y.stop, y.start - by.stop, 0)
                return (dx * dx + dy * dy) ** 0.5
            same_row = [b for b in bodies if b[0][0] == key[0]]
            if not same_row: continue
            best = min(same_row, key=gap)
            if best[0] != key: grid[key].remove(k); grid[best[0]].append(k)
    for (r, c), comps in grid.items():
        if not comps: continue
        if names[r] in mainonly: comps = [max(comps, key=lambda k: k[2])]
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
    props = cfg.get('props', [])
    CUTROWS.clear(); CUTROWS.update(cfg.get('cutrows', {})); ROWBANDS.clear(); ROWBANDS.update(cfg.get('rowbands', {}))
    for sheet, names in cfg['sheets'].items():
        excl = [pt for (_, sh, pt) in props if sh == sheet and pt]
        cols = cfg['cols']
        if isinstance(names, dict): cols = names['cols']; names = names['rows']
        slice_sheet(f'{art}/{sheet}', names, cols, frames, cfg['scale'], excl, cfg.get('cutcols'), cfg.get('mainonly', {}).get(sheet, ()))
    for name, sheet, pt in props:
        if not pt: continue
        a = np.array(Image.open(f'{art}/{sheet}').convert('RGBA')); a[..., 3][a[..., 3] < 64] = 0
        cut_tags(a, [b for b in tag_bands(a) if b[0] > 80])
        lab, n = nd.label(a[..., 3] >= 128)
        k = lab[pt[1], pt[0]]
        if not k:  # nearest blob to the point
            ys, xs = np.nonzero(lab); i = np.argmin((ys - pt[1]) ** 2 + (xs - pt[0]) ** 2); k = lab[ys[i], xs[i]]
        y, x = nd.find_objects(lab)[k - 1]
        img = a[y, x].copy(); img[..., 3] = np.where(lab[y, x] == k, img[..., 3], 0)
        add(frames, name, img, img.shape[1] / 2, img.shape[0] if name == 'dryer' else img.shape[0] / 2, cfg['scale'])
    if who != 'jeffery':
        pack(frames, out, who); sys.exit()
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
