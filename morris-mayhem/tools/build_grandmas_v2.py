"""Grandma Morris / Grandma Worst v2: ChatGPT's 4x4 animation sheets (one move per row, 4 real frames) -> fighter atlas.
Each sheet is drawn at its own zoom, so every sheet is scaled by its measured face size (FACE below, from template-matching
the idle face; movement sheet = 1) so her head is the same size in every move. Ultimate, cheer and food props are kept
from the current atlas (made by slice_grid4.py from the v1 sheets) and resized to the new standing height.
usage: build_grandmas_v2.py <rawdir> <outdir> <id>"""
import sys, json
import numpy as np
from PIL import Image
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from slice_grid44 import cells
raw, out, sid = sys.argv[1:4]
STAND = {'jaicelynn': 290}.get(sid, 300)  # her specials sheet is drawn small, so 290 keeps every sheet at or below its own size; standing (idle0) height in the atlas, like the other full-size fighters (she's drawn smaller, so it stays sharp)
CFG = {
    'grandma_morris': {'grandma-morris-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
                       'grandma-morris-ground-4x4-v2.png': (1.04, ['trowel', 'rake', 'beet', 'kick']),
                       'grandma-morris-aerials-4x4-v2.png': (1.18, ['atrowel', 'arake', 'aup', 'adrop']),
                       'grandma-morris-specials-4x4-v2.png': (1.10, ['apple', 'basket', 'stalk', 'vines']),
                       'grandma-morris-personality-4x4-v2.png': (1.02, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'grandma_worst': {'grandma-worst-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
                      'grandma-worst-ground-4x4-v2.png': (0.91, ['rose', 'palm', 'spoon', 'soup']),
                      'grandma-worst-aerials-4x4-v2.png': (1.07, ['arose', 'aspoon', 'aup', 'asoup']),
                      'grandma-worst-specials-4x4-v2.png': (1.10, ['coffee', 'ladle', 'whirl', 'portal']),
                      'grandma-worst-personality-4x4-v2.png': (0.95, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'jaicelynn': {'jaicelyn-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
                  'jaicelyn-ground-4x4-v2.png': (1.04, ['phone', 'kick', 'wheel', 'sweep']),  # Phone Tap, Trail Kick, Wheel Lift, Low Sweep
                  'jaicelyn-aerials-4x4-v2.png': (1.15, ['anair', 'afair', 'auair', 'adair']),
                  'jaicelyn-specials-4x4-v2.png': (0.95, ['flash', 'atv', 'wheelie', 'taco']),
                  'jaicelyn-personality-4x4-v2.png': (0.94, ['pent', 'ptaunt', 'pwin', 'plose'])},
}[sid]
KEEP = ('ultA', 'ultB', 'ultC', 'cheer', 'fx')
oldF = json.load(open(f'{out}/{sid}-frames.json')); oldA = Image.open(f'{out}/{sid}-atlas.webp').convert('RGBA')
grid = {fn: cells(f'{raw}/{fn}') for fn in CFG}
first = next(iter(CFG)); base = STAND / grid[first][0][0].height
cuts = []
def anchor(c):
    a = np.array(c)[..., 3] > 100; rows = np.where(a.any(1))[0]; foot = a[rows[-1] - min(8, len(rows) - 1):rows[-1] + 1].any(0); xs = np.where(foot)[0]
    return (xs.min() + xs.max()) / 2 if len(xs) else c.width / 2
for fn, (face, names) in CFG.items():
    s = base / face; assert s <= 1.0, (fn, s)  # never enlarge ChatGPT's art
    for name, row in zip(names, grid[fn]):
        for i, c in enumerate(row):
            c = c.resize((max(1, round(c.width * s)), max(1, round(c.height * s))), Image.LANCZOS)
            cuts.append((f'{name}{i}', c, anchor(c), c.height))
k_old = STAND / oldF['idle0'][3]  # the kept v1 frames were cut with idle0 = this tall
seen = {}
for n, (x, y, w, h, ax, ay) in oldF.items():
    if not n.startswith(KEEP): continue
    key = (x, y, w, h)
    if key in seen: cuts.append((n, None, seen[key], None)); continue
    c = oldA.crop((x, y, x + w, y + h))
    if n.startswith('fx'): s = 1.0  # props are sized by their own px in data.js
    else: s = k_old
    c = c.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS)
    seen[key] = n; cuts.append((n, c, ax * c.width / w, ay * c.height / h))
real = [t for t in cuts if t[1] is not None]; real.sort(key=lambda t: -t[1].height)
x = y = rowh = 0; pos = {}
for n, c, _, _ in real:
    if x + c.width > 2048: x, y, rowh = 0, y + rowh + 2, 0
    pos[n] = (x, y); x += c.width + 2; rowh = max(rowh, c.height)
A = Image.new('RGBA', (2048, y + rowh)); F = {}
for n, c, ax, ay in real:
    px, py = pos[n]; A.paste(c, (px, py)); F[n] = [px, py, c.width, c.height, round(float(ax), 1), round(float(ay), 1)]
for n, c, src, _ in cuts:
    if c is None: F[n] = F[src]
F['ult0'], F['ult1'], F['ult2'], F['ult3'] = F['ultA0'], F['ultB0'], F['ultC0'], F['ultC0']
assert A.height <= 4096, A.size
A.save(f'{out}/{sid}-atlas.webp', 'WEBP', quality=88, method=6); json.dump(F, open(f'{out}/{sid}-frames.json', 'w'))
print(sid, A.size, len(F), 'idle', F['idle0'][2:4])
