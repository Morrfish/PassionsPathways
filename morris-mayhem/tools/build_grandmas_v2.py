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
STAND = {'jaicelynn': 290, 'harley': 280, 'haislie': 300, 'august': 290}.get(sid, 300)  # her specials sheet is drawn small, so 290 keeps every sheet at or below its own size; standing (idle0) height in the atlas, like the other full-size fighters (she's drawn smaller, so it stays sharp)
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
    'harley': {'harley-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
               'harley-ground-4x4-v2.png': (1.03, ['palm', 'kick', 'upper', 'stomp']),
               'harley-aerials-4x4-v2.png': (1.11, ['anair', 'afair', 'auair', 'adair']),
               'harley-specials-4x4-v2.png': (1.07, ['hand', 'temper', 'rocket', 'guard']),  # Talk to the Hand, Tiny Temper, Stomp Rocket, Nope Guard
               'harley-personality-4x4-v2.png': (1.13, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'haislie': {'haislie-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
                'haislie-ground-4x4-v2.png': (0.97, ['spark', 'palm', 'tele', 'sweep']),
                'haislie-aerials-4x4-v2.png': (0.96, ['anair', 'afair', 'auair', 'adair']),
                'haislie-specials-4x4-v2.png': (1.0, ['rush', 'hammer', 'sky', 'flame']),
                'haislie-personality-4x4-v2.png': (0.98, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'august': {'august-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
               'august-ground-4x4-v2.png': (1.0, ['zap', 'vine', 'flame', 'splash']),
               'august-aerials-4x4-v2.png': (0.99, ['anair', 'afair', 'auair', 'adair']),
               'august-specials-4x4-v2.png': (1.01, ['ball', 'catch', 'lift', 'charm']),
               'august-personality-4x4-v2.png': (1.05, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'harper': {'harper-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
               'harper-ground-4x4-v2.png': (1.22, ['palm', 'kick', 'upper', 'sweep']),
               'harper-aerials-4x4-v2.png': (1.0, ['anair', 'afair', 'auair', 'adair']),
               'harper-specials-4x4-v2.png': (1.27, ['slime', 'cushion', 'pop', 'spray']),
               'harper-personality-4x4-v2.png': (0.94, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'sophia': {'sophia-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
               'sophia-ground-4x4-v2.png': (1.0, ['tap', 'kick', 'upper', 'bow']),
               'sophia-aerials-4x4-v2.png': (1.0, ['anair', 'afair', 'auair', 'adair']),
               'sophia-specials-4x4-v2.png': (0.97, ['charlie', 'dorothy', 'alice', 'robin']),  # one row per role power
               'sophia-personality-4x4-v2.png': (1.0, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'sophia-charlie': {'sophia-charlie-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
                    'sophia-charlie-ground-4x4-v3.png': (0.97, ['tap', 'kick', 'upper', 'bow']),
                    'sophia-charlie-aerials-4x4-v3.png': (1.0, ['anair', 'afair', 'auair', 'adair']),
                    'sophia-charlie-personality-4x4-v3.png': (0.93, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'sophia-dorothy': {'sophia-dorothy-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
                    'sophia-dorothy-ground-4x4-v3.png': (0.97, ['tap', 'kick', 'upper', 'bow']),
                    'sophia-dorothy-aerials-4x4-v3.png': (1.0, ['anair', 'afair', 'auair', 'adair']),
                    'sophia-dorothy-personality-4x4-v3.png': (0.94, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'sophia-alice': {'sophia-alice-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
                    'sophia-alice-ground-4x4-v3.png': (0.97, ['tap', 'kick', 'upper', 'bow']),
                    'sophia-alice-aerials-4x4-v3.png': (1.0, ['anair', 'afair', 'auair', 'adair']),
                    'sophia-alice-personality-4x4-v3.png': (1.0, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'sophia-robin': {'sophia-robin-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
                    'sophia-robin-ground-4x4-v3.png': (0.95, ['tap', 'kick', 'upper', 'bow']),
                    'sophia-robin-aerials-4x4-v3.png': (1.0, ['anair', 'afair', 'auair', 'adair']),
                    'sophia-robin-personality-4x4-v3.png': (1.02, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'haislie-surge': {'haislie-chaos-movement-4x4-v3.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
                      'haislie-chaos-ground-4x4-v3.png': (0.92, ['spark', 'palm', 'tele', 'sweep']),
                      'haislie-chaos-aerials-4x4-v3.png': (0.92, ['anair', 'afair', 'auair', 'adair']),
                      'haislie-chaos-specials-4x4-v3.png': (0.95, ['rush', 'hammer', 'sky', 'flame']),
                      'haislie-chaos-personality-4x4-v3.png': (0.94, ['pent', 'ptaunt', 'pwin', 'plose'])},
    'danielle': {'danielle-movement-4x4-v2.png': (1.0, ['idle', 'run', 'jump', 'hurt']),
                 'danielle-ground-4x4-v2.png': (1.23, ['ink', 'liner', 'rose', 'shader']),  # Ink Flick, Liner Lash, Rose Rise, Shader Sweep
                 'danielle-aerials-4x4-v2.png': (1.0, ['anair', 'afair', 'auair', 'adair']),
                 'danielle-specials-4x4-v2.png': (1.02, ['inkshot', 'tiger', 'swallow', 'stencil']),
                 'danielle-personality-4x4-v2.png': (1.32, ['pent', 'ptaunt', 'pwin', 'plose'])},
}[sid]
# a brand-new fighter (no old atlas to keep from): ultimate 2x2 (face size vs movement) and an effects 4x4 (rows of 4 phases)
# fx: (sheet, frame names per row (None = skip that row), rows, cols); 'cup': a 2x2 of power-up poses -> cup0..3
NEW = {'harley': {'ult': ('harley-ultimate-2x2-v2.png', 2.27), 'fx': [('harley-sass-effects-4x4-v2.png', ['fxpalm', 'fxstomp', 'fxguard', 'fxtantrum'], 4, 4)]},
       'haislie': {'ult': ('haislie-ultimate-2x2-v2.png', 1.92), 'cup': ('haislie-chaos-control-2x2-v2.png', 1.87),
                   'fx': [('haislie-chaos-emeralds-effects-v2.png', [['fxgem0', 'fxgem1', 'fxgem2', 'fxgem3'], ['fxgem4', 'fxgem5', 'fxgem6', 'fxgemring']], 2, 4)]},
       'harper': {'ult': ('harper-ultimate-2x2-v2.png', 1.81), 'fx': [('harper-effects-4x4-v2.png', ['fxslime', 'fxcushion', 'fxcloud', 'fxboom'], 4, 4)]},
       'sophia': {'ult': ('sophia-ultimate-2x2-v2.png', 1.71), 'fx': [('sophia-effects-4x4-v2.png', ['fxchoc', 'fxwind', 'fxcard', 'fxarrow'], 4, 4)]},
       'haislie-surge': {'ult': ('haislie-chaos-ultimate-2x2-v3.png', 1.86), 'fx': []},
       'danielle': {'ult': ('danielle-ultimate-2x2-v2.png', 1.53),
                    'fx': [('danielle-basics-effects-4x4-v2.png', ['fxslash', 'fxrose', 'fxanchor', 'fxwhip'], 4, 4),
                           ('danielle-specials-effects-4x4-v2.png', ['fxinkshot', 'fxtiger', 'fxswallow', 'fxshield'], 4, 4),
                           ('danielle-living-canvas-effects-2x2-v2.png', [['fxdragon0', 'fxdragon1'], ['fxdragon2', 'fxdragon3']], 2, 2, 560)]},
       'august': {'ult': ('august-ultimate-2x2-v2.png', 2.0), 'cup': ('august-evolve-2x2-v2.png', 1.87),
                  'fx': [('august-partner-element-effects-4x4-v2.png', ['fxzap', 'fxvine', 'fxfire', 'fxwater'], 4, 4),
                         ('august-ball-capture-effects-4x4-v2.png', [None, None, 'fxbubble', 'fxsparkle'], 4, 4)]}}.get(sid)
KEEP = ('ultA', 'ultB', 'ultC', 'cheer', 'fx')
import os
HAVE_OLD = not NEW and os.path.exists(f'{out}/{sid}-frames.json') and not sid.startswith('sophia-')  # Sophia's role atlases are brand new too
oldF = json.load(open(f'{out}/{sid}-frames.json')) if HAVE_OLD else {}; oldA = Image.open(f'{out}/{sid}-atlas.webp').convert('RGBA') if HAVE_OLD else None
grid = {fn: cells(f'{raw}/{fn}') for fn in CFG}
first = next(iter(CFG)); base = STAND / grid[first][0][0].height
cuts = []
def unball(c):  # clear the red-and-white ball (and its button) sitting on the bubble's rim
    a = np.array(c); r, g, b, al = [a[..., i].astype(int) for i in range(4)]
    red = (r > 150) & (g < 90) & (b < 90) & (al > 100); ys, xs = np.where(red)
    if not len(xs): return c
    cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2; rad = max(xs.max() - xs.min(), ys.max() - ys.min()) * 0.85 + 6
    yy, xx = np.mgrid[:a.shape[0], :a.shape[1]]; hole = (xx - cx) ** 2 + (yy - cy) ** 2 < rad ** 2; a[..., 3][hole] = 0
    # fill the bite with the bubble's own bottom edge, mirrored (bubbles are round)
    al2 = a[..., 3] > 24; ys2 = np.where(al2.any(1))[0]; xs2 = np.where(al2.any(0))[0]
    if len(ys2) and len(xs2):
        ccx, R = (xs2.min() + xs2.max()) / 2, (xs2.max() - xs2.min()) / 2; ccy = ys2.max() - R  # the bubble's circle, from its width and bottom
        src_y = np.clip((2 * ccy - yy).astype(int), 0, a.shape[0] - 1)
        fill = hole & ((xx - ccx) ** 2 + (yy - ccy) ** 2 <= R * R) & (src_y > ccy)
        if a[..., 3][int(ccy), int(ccx)] > 100: a[fill] = a[src_y[fill], xx[fill]]  # only solid bubbles (not the open rings)
    out = Image.fromarray(a); bb = out.split()[3].point(lambda v: 255 if v > 24 else 0).getbbox(); return out.crop(bb) if bb else out
def anchor(c):
    a = np.array(c)[..., 3] > 100; rows = np.where(a.any(1))[0]; foot = a[rows[-1] - min(8, len(rows) - 1):rows[-1] + 1].any(0); xs = np.where(foot)[0]
    return (xs.min() + xs.max()) / 2 if len(xs) else c.width / 2
for fn, (face, names) in CFG.items():
    s = base / face; assert s <= 1.0, (fn, s)  # never enlarge ChatGPT's art
    for name, row in zip(names, grid[fn]):
        for i, c in enumerate(row):
            c = c.resize((max(1, round(c.width * s)), max(1, round(c.height * s))), Image.LANCZOS)
            cuts.append((f'{name}{i}', c, anchor(c), c.height))
if NEW:
    for key, pre in (('ult', 'ult'), ('cup', 'cup')):  # (NEW is a dict here)
        if key not in NEW: continue
        fn, face = NEW[key]; U = Image.open(f'{raw}/{fn}').convert('RGBA'); W, H = U.size
        for i in range(4):
            c = U.crop(((i % 2) * W // 2, (i // 2) * H // 2, (i % 2 + 1) * W // 2, (i // 2 + 1) * H // 2)); c = c.crop(c.split()[3].point(lambda v: 255 if v > 24 else 0).getbbox())
            sc = base / face; assert sc <= 1; c = c.resize((round(c.width * sc), round(c.height * sc)), Image.LANCZOS); cuts.append((f'{pre}{i}', c, anchor(c), c.height))
    for fx in NEW['fx']:
        fn, names, nr, nc = fx[:4]; fmax = fx[4] if len(fx) > 4 else 200  # e.g. Dani's ink dragon is big
        for name, row in zip(names, cells(f'{raw}/{fn}', nr=nr, nc=nc)):
            if name is None: continue
            for i, c in enumerate(row):
                nm = name[i] if isinstance(name, list) else f'{name}{i}'
                if nm.startswith('fxbubble'): c = unball(c)  # a plain bubble: take the capture ball off the top
                sc = min(1, fmax / max(c.size)); c = c.resize((max(1, round(c.width * sc)), max(1, round(c.height * sc))), Image.LANCZOS); cuts.append((nm, c, c.width / 2, c.height / 2))
k_old = STAND / oldF['idle0'][3] if oldF else 1  # the kept v1 frames were cut with idle0 = this tall
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
if HAVE_OLD: F['ult0'], F['ult1'], F['ult2'], F['ult3'] = F['ultA0'], F['ultB0'], F['ultC0'], F['ultC0']
assert A.height <= 4096, A.size
A.save(f'{out}/{sid}-atlas.webp', 'WEBP', quality=88, method=6); json.dump(F, open(f'{out}/{sid}-frames.json', 'w'))
print(sid, A.size, len(F), 'idle', F['idle0'][2:4])
