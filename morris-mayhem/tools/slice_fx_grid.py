"""Cut grid FX sheets (transparent PNGs) into one atlas with centre anchors.
usage: slice_fx_grid.py <rawdir> <outdir> <id>"""
import sys, json
from PIL import Image
import numpy as np
from scipy import ndimage
raw, out, sid = sys.argv[1:4]
SHEETS = {  # file: (rows, cols, names row by row, scale)
    'kevin-football-fx-v1.png': (4, 4, [['ball0', 'ball1', 'ball2', 'ball3'], ['towel0', 'towel1', 'towel2', 'towel3'],
                                        ['curtain0', 'curtain1', 'curtain2', 'curtain3'], ['stampede0', 'stampede1', 'stampede2', 'stampede3']], 0.5),
    'cloe-paint-fx-v1.png': (4, 6, [['apple', 'orange', 'sun', 'vine', 'bubble', 'grapes'], [f'block{i}' for i in range(6)],
                                    ['puddle-red', 'puddle-orange', 'puddle-yellow', 'puddle-green', 'puddle-blue', 'puddle-purple'], [f'burst{i}' for i in range(6)]], 0.5),
    'janelle-subject-fx-v1.png': (3, 5, [['eng', 'read', 'math', 'soc', 'sci'], ['sheng', 'shread', 'shmath', 'shsoc', 'shsci'], [f'star{i}' for i in range(5)]], 0.5),
    'cloe-color-wheel-v1.png': (1, 1, [['cloewheel']], 0.4),
    'janelle-subject-wheel-v1.png': (1, 1, [['janwheel']], 0.4),
}
cuts = []
for fn, (R, C, names, sc) in SHEETS.items():
    im = Image.open(f'{raw}/{fn}').convert('RGBA'); W, H = im.size
    for r in range(R):
        for c in range(C):
            cell = im.crop((c * W // C, r * H // R, (c + 1) * W // C, (r + 1) * H // R))
            al = np.array(cell)[..., 3] > 24
            lab, n = ndimage.label(al)
            if n > 1:  # drop slivers of the next row/column: small bits touching the cell edge
                sz = ndimage.sum(al, lab, range(1, n + 1)); big = sz.max()
                for i, sl in enumerate(ndimage.find_objects(lab)):
                    edge = sl[0].start == 0 or sl[1].start == 0 or sl[0].stop == al.shape[0] or sl[1].stop == al.shape[1]
                    if edge and sz[i] < 0.15 * big:
                        arr = np.array(cell); arr[..., 3][lab == i + 1] = 0; cell = Image.fromarray(arr); al[lab == i + 1] = False
            a = Image.fromarray((al * 255).astype(np.uint8))
            bb = a.getbbox()
            if not bb: continue
            cell = cell.crop(bb)
            cell = cell.resize((max(1, round(cell.width * sc)), max(1, round(cell.height * sc))), Image.LANCZOS)
            cuts.append((names[r][c], cell))
# shelf pack, 2048 wide
x = y = rowh = 0; pos = {}
for n, c in cuts:
    if x + c.width > 2048: x, y, rowh = 0, y + rowh + 2, 0
    pos[n] = (x, y); x += c.width + 2; rowh = max(rowh, c.height)
A = Image.new('RGBA', (2048, y + rowh)); fr = {}
for n, c in cuts:
    px, py = pos[n]; A.paste(c, (px, py)); fr[n] = [px, py, c.width, c.height, round(c.width / 2, 1), round(c.height / 2, 1)]
A.save(f'{out}/{sid}-atlas.webp', 'WEBP', quality=88, method=6)
json.dump(fr, open(f'{out}/{sid}-frames.json', 'w'))
print(sid, A.size, len(fr), {k: v[2:4] for k, v in fr.items() if k in ('ball0', 'apple', 'eng', 'cloewheel', 'puddle-red')})
