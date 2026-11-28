"""Colten Crist / Crispy Crist (ChatGPT, Nov 28): labelled 4x4 / 4x2 sheets -> colten atlas.
Every sheet is drawn at its own zoom, so each is scaled by its face size relative to the movement sheet (measured by
template-matching the idle head) so his head is the same size in every move. Effects/props are kept at their own size
(sized in data.js). Size Hack (small/giant) is done by the engine scaling this same art.
usage: build_colten.py <rawdir> <outdir>"""
import sys, json
import numpy as np
from PIL import Image
from scipy import ndimage as nd
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from slice_labeled import cslice
raw, out = sys.argv[1:3]
STAND = 300
FIG = [('colten-crispy-movement-4x4-v1.png', 4, 1.0, ['idle', 'run', 'jump', 'hurt']),
       ('colten-crispy-ground-4x4-v1.png', 4, 1.24, ['jab', 'claw', 'john', 'crumb']),  # Glaze Jab, Bear Claw Swipe, Long John Poke, Crumb Sweep
       ('colten-crispy-aerials-4x4-v1.png', 4, 1.07, ['anair', 'afair', 'auair', 'adair']),  # Controller Combo, Keyboard Clack, Level Up, Rage Quit
       ('colten-crispy-specials-4x4-v1.png', 4, 1.24, ['glazed', 'lag', 'djump', 'clip']),  # Glazed Emote, Lag Spike, Double Jump, Clip That!
       ('colten-crispy-personality-4x4-v1.png', 4, 1.14, ['pent', 'ptaunt', 'pwin', 'plose']),
       ('colten-crispy-backair-defense-4x2-v1.png', 2, 1.52, ['abair', ['block0', 'dodge0', 'grab0', 'throw0']]),  # Backspace Boot; guard states
       ('colten-crispy-raid-caster-4x2-v3.png', 2, 1.63, ['ult', 'raid'])]  # Crispy Raid: startup / slam command-follow-recover-ready
FX = [('colten-effects-4x4-v1.png', 4, ['fxdonut', 'fxclaw', 'fxstick', 'fxsprinkle'], 200),
      ('colten-gamer-props-4x4-v1.png', 4, [['pcontroller', 'pkeyboard', 'pheadset', 'plogo'], ['plag', 'pholo', 'pframe', 'pstar'],
                                            ['pdonut', 'pchoc', 'pclaw', 'peclair'], ['pportal', 'pring', 'plight', 'pframe2']], 160)]
def solid(c):  # keep only blobs touching the figure (drops the thrown doughnut that flies off on its own)
    a = np.array(c)[..., 3] > 24; lab, n = nd.label(nd.binary_dilation(a, iterations=3))
    if n < 2: return c
    sz = nd.sum(a, lab, range(1, n + 1)); keep = lab == (np.argmax(sz) + 1)
    A = np.array(c); A[..., 3][~keep] = 0; C = Image.fromarray(A); return C.crop(C.split()[3].point(lambda v: 255 if v > 24 else 0).getbbox())
def anchor(c):
    a = np.array(c)[..., 3] > 100; rows = np.where(a.any(1))[0]; foot = a[rows[-1] - min(8, len(rows) - 1):rows[-1] + 1].any(0); xs = np.where(foot)[0]
    return (xs.min() + xs.max()) / 2 if len(xs) else c.width / 2
cuts = []; base = None
for fn, nr, face, names in FIG:
    R = cslice(f'{raw}/{fn}', nr, 4)
    if base is None: base = STAND / R[0][0].height
    s = base / face; assert s <= 1.0, (fn, s)  # never enlarge ChatGPT's art
    for name, row in zip(names, R):
        for i, c in enumerate(row):
            nm = name[i] if isinstance(name, list) else f'{name}{i}'
            if nm == 'glazed3': c = solid(c)
            c = c.resize((max(1, round(c.width * s)), max(1, round(c.height * s))), Image.LANCZOS)
            cuts.append((nm, c, anchor(c), c.height))
def fit(c, m): sc = min(1, m / max(c.size)); return c.resize((max(1, round(c.width * sc)), max(1, round(c.height * sc))), Image.LANCZOS)
for fn, nr, names, m in FX:
    for name, row in zip(names, cslice(f'{raw}/{fn}', nr, 4)):
        for i, c in enumerate(row):
            nm = name[i] if isinstance(name, list) else f'{name}{i}'; c = fit(c, m); cuts.append((nm, c, c.width / 2, c.height / 2))
# Crispy Raid effects (the 12-pastry layout block isn't used: the pastries are spawned one by one from the props)
RFX = [['holo0', 'holo1', 'holo2', 'holo3'], ['rportal', 'rbox', None, 'rclear'], ['rwave0', 'rwave1', 'rwave2', 'rwave3']]
for names, row in zip(RFX, cslice(f'{raw}/colten-crispy-raid-fx-4x3-v1.png', 3, 4)):
    for nm, c in zip(names, row):
        if not nm or c is None: continue
        if nm.startswith('holo'): c = fit(c, 520); cuts.append((nm, c, anchor(c), c.height))  # the hologram stands on the floor
        else: c = fit(c, 420); cuts.append((nm, c, c.width / 2, c.height / 2))
cuts.sort(key=lambda t: -t[1].height)
x = y = rowh = 0; pos = {}
for n, c, _, _ in cuts:
    if x + c.width > 2048: x, y, rowh = 0, y + rowh + 2, 0
    pos[n] = (x, y); x += c.width + 2; rowh = max(rowh, c.height)
At = Image.new('RGBA', (2048, y + rowh)); F = {}
for n, c, ax, ay in cuts:
    px, py = pos[n]; At.paste(c, (px, py)); F[n] = [px, py, c.width, c.height, round(float(ax), 1), round(float(ay), 1)]
assert At.height <= 4096, At.size
At.save(f'{out}/colten-atlas.webp', 'WEBP', quality=88, method=6); json.dump(F, open(f'{out}/colten-frames.json', 'w'))
print('colten', At.size, len(F), 'idle', F['idle0'][2:4])
