# Cuts an arena prop sheet (ChatGPT art: 2 columns x 4 rows, spacing varies) into one packed WebP atlas.
# Finds each prop by connected components on the alpha channel (pixels with alpha < 64 are the
# near-invisible glow/fringe and are dropped), groups the pieces into the 2x4 grid, crops each prop
# tightly and packs them. Nearby disconnected bits of one prop (lights, ropes, a bell) stay together.
#
# usage: python3 -I tools/slice_stage_props.py <props.png> <stage id> <out dir> name1 name2 ... name8
#   names go row by row, left column first: r1c1 r1c2 r2c1 r2c2 ... ('-' skips a prop)
#   optional extra images: --extra <name>=<file.png>[@scale] (e.g. the Graceland van) are cropped and packed too.
# Output: <out>/<stage>-props.webp, <out>/<stage>-props.json ({name: [x, y, w, h]}) and
#         <out>/crops/<stage>-<name>.png for checking.
import sys, os, json, numpy as np
from PIL import Image
from scipy import ndimage as nd

ALPHA_MIN = 64

def clean(im):
    a = np.array(im.convert('RGBA'))
    a[a[..., 3] < ALPHA_MIN] = 0
    return a

def crop_alpha(a):
    ys, xs = np.where(a[..., 3] > 0)
    return a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]

def grid_props(a):
    """Return 8 crops (row by row, left column first)."""
    mask = a[..., 3] > 0
    # merge pieces that are 1-3 pixels apart (crossing lights, bell rope) but not separate props
    lab, n = nd.label(nd.binary_dilation(mask, iterations=3))
    objs = nd.find_objects(lab)
    sizes = nd.sum(mask, lab, range(1, n + 1))
    H, W = mask.shape
    comps = []
    for i, sl in enumerate(objs):
        if sizes[i] < 1500: continue  # specks
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        comps.append({'i': i + 1, 'box': [x0, y0, x1, y1], 'cx': (x0 + x1) / 2, 'cy': (y0 + y1) / 2})
    out = [None] * 8
    for col in (0, 1):
        cs = [c for c in comps if (c['cx'] < W / 2) == (col == 0)]
        cs.sort(key=lambda c: c['cy'])
        rows = []
        for c in cs:  # a piece whose vertical span overlaps the previous row joins it (tall props stay whole)
            if rows:
                r = rows[-1]
                ov = min(r['box'][3], c['box'][3]) - max(r['box'][1], c['box'][1])
                if ov > 0.4 * min(r['box'][3] - r['box'][1], c['box'][3] - c['box'][1]):
                    r['ids'].append(c['i']); b = r['box']
                    r['box'] = [min(b[0], c['box'][0]), min(b[1], c['box'][1]), max(b[2], c['box'][2]), max(b[3], c['box'][3])]
                    continue
            rows.append({'ids': [c['i']], 'box': list(c['box'])})
        if len(rows) != 4: raise SystemExit(f'column {col + 1}: found {len(rows)} rows, expected 4: {[r["box"] for r in rows]}')
        for ri, r in enumerate(rows):
            keep = np.isin(lab, r['ids']) & mask
            x0, y0, x1, y1 = r['box']
            piece = a.copy(); piece[~keep] = 0
            out[ri * 2 + col] = (crop_alpha(piece[y0:y1, x0:x1]), r['box'])
    return out

def pack(items, maxw=2048, pad=4):
    items = sorted(items, key=lambda kv: -kv[1].shape[0])
    x = y = rowh = 0; places = {}
    for name, img in items:
        h, w = img.shape[:2]
        if x + w > maxw: x = 0; y += rowh + pad; rowh = 0
        places[name] = (x, y, w, h); x += w + pad; rowh = max(rowh, h)
    W = max(p[0] + p[2] for p in places.values()); H = max(p[1] + p[3] for p in places.values())
    atlas = np.zeros((H, W, 4), np.uint8)
    for name, img in items:
        x, y, w, h = places[name]; atlas[y:y + h, x:x + w] = img
    return atlas, places

def main():
    args = sys.argv[1:]
    extras = []
    while '--extra' in args:
        i = args.index('--extra'); extras.append(args[i + 1].split('=', 1)); del args[i:i + 2]
    sheet, stage, outdir, names = args[0], args[1], args[2], args[3:]
    assert len(names) == 8, 'need 8 names'
    os.makedirs(os.path.join(outdir, 'crops'), exist_ok=True)
    a = clean(Image.open(sheet))
    items = []
    for name, (img, box) in zip(names, grid_props(a)):
        print(f'{name:12s} sheet box {box} -> {img.shape[1]}x{img.shape[0]}')
        if name != '-': items.append((name, img))
    for name, path in extras:
        path, _, sc = path.partition('@')
        im = Image.open(path)
        if sc: im = im.resize((round(im.width * float(sc)), round(im.height * float(sc))), Image.LANCZOS)
        img = crop_alpha(clean(im))
        print(f'{name:12s} extra {path} -> {img.shape[1]}x{img.shape[0]}'); items.append((name, img))
    for name, img in items: Image.fromarray(img).save(os.path.join(outdir, 'crops', f'{stage}-{name}.png'))
    atlas, places = pack(items)
    Image.fromarray(atlas).save(os.path.join(outdir, f'{stage}-props.webp'), quality=88, method=6)
    json.dump(places, open(os.path.join(outdir, f'{stage}-props.json'), 'w'))
    print('atlas', atlas.shape[1], 'x', atlas.shape[0])

if __name__ == '__main__':
    main()
