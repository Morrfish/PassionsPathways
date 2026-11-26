"""ChatGPT's 2x2 pose sheets (one key pose per move, Nov 26: the grandmas and Jaicelynn) -> one fighter atlas.
Each sheet is split into its four quarters (top-left, top-right, bottom-left, bottom-right); every pose is stored once
and named <move>0..3 (all the same picture), so the game's 4-frame moves just hold the key pose.
Props sheets (also 2x2) go in the same atlas as single frames (no number).
usage: slice_grid4.py <rawdir> <outdir> <id>"""
import sys, json
import numpy as np
from PIL import Image
from scipy import ndimage as nd
raw, out, sid = sys.argv[1:4]
CFG = {
    'grandma_morris': {'sheets': {'grandma-morris-movement-v1.png': ['idle', 'run', 'jump', 'hurt'],
                                  'grandma-morris-basics-v1.png': ['trowel', 'rake', 'beet', 'kick'],
                                  'grandma-morris-specials-v1.png': ['apple', 'basket', 'stalk', 'vines'],
                                  'grandma-morris-ultimate-v2.png': ['ultA', 'ultB', 'ultC', 'cheer']},
                       'props': {'grandma-morris-props-v1.png': ['fxapple', 'fxcarrot', 'fxtomato', 'fxvine']}},
    'grandma_worst': {'sheets': {'grandma-worst-movement-v1.png': ['idle', 'run', 'jump', 'hurt'],
                                 'grandma-worst-basics-v1.png': ['rose', 'spoon', 'soup', 'palm'],
                                 'grandma-worst-specials-v1.png': ['coffee', 'ladle', 'whirl', 'portal'],
                                 'grandma-worst-ultimate-v2.png': ['ultA', 'ultB', 'ultC', 'cheer']},
                      'props': {'grandma-worst-props-v2.png': ['fxtoastie', 'fxdumplings', 'fxrose', 'fxtoast']}},
    'jaicelynn': {'sheets': {'jaicelyn-movement-v1.png': ['idle', 'run', 'jump', 'hurt'],
                             'jaicelyn-basics-v1.png': ['phone', 'bars', 'wheel', 'kick'],
                             'jaicelyn-specials-v1.png': ['flash', 'atv', 'wheelie', 'taco'],
                             'jaicelyn-ultimate-v2.png': ['ultA', 'ultB', 'ultC', 'cheer']},
                  'props': {'jaicelyn-props-v1.png': ['fxring', 'fxtaco', 'fxphone', 'fxbell']}},
}[sid]
STAND = 300  # standing height in the atlas (px), like the other full-size fighters
def quarters(fn):
    S = Image.open(f'{raw}/{fn}').convert('RGBA'); W, H = S.size
    for cy in (0, 1):
        for cx in (0, 1):
            c = S.crop((cx * W // 2, cy * H // 2, (cx + 1) * W // 2, (cy + 1) * H // 2))
            al = np.array(c)[..., 3] > 24; lab, n = nd.label(al); sz = nd.sum(al, lab, range(1, n + 1))
            if n: arr = np.array(c); arr[..., 3][~np.isin(lab, [j + 1 for j in range(n) if sz[j] >= 0.004 * sz.max()])] = 0; c = Image.fromarray(arr)
            bb = c.split()[3].point(lambda v: 255 if v > 24 else 0).getbbox()
            yield c.crop(bb) if bb else c
first = next(iter(CFG['sheets']))
idle = next(quarters(first)); scale = STAND / idle.height
cuts = []
for fn, names in CFG['sheets'].items():
    for name, c in zip(names, quarters(fn)):
        c = c.resize((max(1, round(c.width * scale)), max(1, round(c.height * scale))), Image.LANCZOS)
        a = np.array(c)[..., 3] > 100; rows = np.where(a.any(1))[0]; foot = a[rows[-1] - min(8, len(rows) - 1):rows[-1] + 1].any(0); xs = np.where(foot)[0]
        ax = (xs.min() + xs.max()) / 2 if len(xs) else c.width / 2
        cuts.append((name, c, ax, c.height))
for fn, names in CFG['props'].items():
    for name, c in zip(names, quarters(fn)):
        s = min(1, 200 / max(c.size)); c = c.resize((max(1, round(c.width * s)), max(1, round(c.height * s))), Image.LANCZOS)
        cuts.append((name, c, c.width / 2, c.height / 2))
cuts.sort(key=lambda t: -t[1].height)
x = y = rowh = 0; pos = {}
for n, c, _, _ in cuts:
    if x + c.width > 2048: x, y, rowh = 0, y + rowh + 2, 0
    pos[n] = (x, y); x += c.width + 2; rowh = max(rowh, c.height)
A = Image.new('RGBA', (2048, y + rowh)); F = {}
for n, c, ax, ay in cuts:
    px, py = pos[n]; A.paste(c, (px, py)); f = [px, py, c.width, c.height, round(float(ax), 1), round(float(ay), 1)]
    if n.startswith('fx'): F[n] = f
    else:
        for i in range(4): F[f'{n}{i}'] = f
# the ultimate: three key poses then the last one held; personality poses from the same sheets
F['ult0'], F['ult1'], F['ult2'], F['ult3'] = F['ultA0'], F['ultB0'], F['ultC0'], F['ultC0']
A.save(f'{out}/{sid}-atlas.webp', 'WEBP', quality=88, method=6); json.dump(F, open(f'{out}/{sid}-frames.json', 'w'))
print(sid, A.size, len(F), 'scale', round(scale, 3), 'idle', F['idle0'][2:4])
