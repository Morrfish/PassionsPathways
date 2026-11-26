"""An effects-only atlas from ChatGPT's effect sheets (frames named <row name><phase>), e.g. August's ball / elements / sea dragon.
usage: build_fx_atlas.py <rawdir> <outdir> <id>"""
import sys, json
from PIL import Image
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from slice_grid44 import cells
raw, out, sid = sys.argv[1:4]
CFG = {
    'august-fx': [('august-ball-effects-4x4-v3.png', ['fxball', 'fxopen', 'fxcap', 'fxrel'], 4, 4, 200),   # August Ball: spin, open, capture, release
                  ('august-elements-primary-effects-4x4-v3.png', ['fxwater', 'fxspark', 'fxfire', 'fxleaf'], 4, 4, 220),
                  ('august-elements-secondary-effects-4x4-v3.png', ['fxwind', 'fxfrost', 'fxcombo', 'fxguard'], 4, 4, 220),
                  ('august-original-fish-dragon-ultimate-effects-2x2-v3.png', [['fxfish', 'fxevolve'], ['fxdragon', 'fxbeam']], 2, 2, 560)],
}[sid]
cuts = []
for fn, names, nr, nc, fmax in CFG:
    for name, row in zip(names, cells(f'{raw}/{fn}', nr=nr, nc=nc)):
        for i, c in enumerate(row):
            nm = name[i] if isinstance(name, list) else f'{name}{i}'
            s = min(1, fmax / max(c.size)); c = c.resize((max(1, round(c.width * s)), max(1, round(c.height * s))), Image.LANCZOS)
            cuts.append((nm, c))
cuts.sort(key=lambda t: -t[1].height)
x = y = rowh = 0; pos = {}
for n, c in cuts:
    if x + c.width > 2048: x, y, rowh = 0, y + rowh + 2, 0
    pos[n] = (x, y); x += c.width + 2; rowh = max(rowh, c.height)
A = Image.new('RGBA', (2048, y + rowh)); F = {}
for n, c in cuts:
    px, py = pos[n]; A.paste(c, (px, py)); F[n] = [px, py, c.width, c.height, round(c.width / 2, 1), round(c.height / 2, 1)]
A.save(f'{out}/{sid}-atlas.webp', 'WEBP', quality=88, method=6); json.dump(F, open(f'{out}/{sid}-frames.json', 'w'))
print(sid, A.size, len(F))
