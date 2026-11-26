"""Kevin's Terrible Towel, Towel Helicopter, Riding the Bus and Going Long art (ChatGPT, Nov 25).
Kevin's own poses go into his atlas (toss0-3, heli0-3, bus0-3); the towel, Terry Bradshaw, the target,
the footballs and the two titles go into a 'kevin-fx' atlas. Sources are 1024x1024 with the feet at y=960.
Sized by Kevin's head against his existing poses (the new art has a bigger head than body: between the two).
usage: add_kevin_moves.py <rawdir> <outdir>"""
import sys, os, json, shutil
from PIL import Image
raw, out = sys.argv[1:3]
S_KEVIN, S_BUS, S_TERRY = 0.30, 0.41, 0.32   # the Bus art draws Kevin smaller (head 100 px vs 137)
def load(n):
    im = Image.open(f'{raw}/{n}').convert('RGBA'); bb = im.split()[3].point(lambda v: 255 if v > 10 else 0).getbbox(); return im.crop(bb), bb
def feet(n, s):
    im, bb = load(n); im2 = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    return im2, ((512 - bb[0]) * s, (960 - bb[1]) * s)
def centre(n, px):
    im, bb = load(n); s = px / max(im.size); im2 = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    return im2, (im2.width / 2, im2.height / 2)
def pack(cuts, base=None):
    A = base[0] if base else Image.new('RGBA', (2048, 0)); fr = dict(base[1]) if base else {}
    y0 = A.height + 2 if base else 0; x = 0; rowh = 0; pos = {}
    for n, c, _ in cuts:
        if x + c.width > 2048: x, y0, rowh = 0, y0 + rowh + 2, 0
        pos[n] = (x, y0); x += c.width + 2; rowh = max(rowh, c.height)
    N = Image.new('RGBA', (2048, y0 + rowh)); N.paste(A, (0, 0))
    for n, c, (ax, ay) in cuts:
        px, py = pos[n]; N.paste(c, (px, py)); fr[n] = [px, py, c.width, c.height, round(ax, 1), round(ay, 1)]
    return N, fr
# Kevin's atlas: keep the original once so this can be re-run
ba, bf = f'{out}/kevin-base-atlas.webp', f'{out}/kevin-base-frames.json'
if not os.path.exists(bf): shutil.copy(f'{out}/kevin-atlas.webp', ba); shutil.copy(f'{out}/kevin-frames.json', bf)
cuts = []
for i in range(4):
    cuts.append((f'toss{i}', *feet(f'kevin-towel-boomerang-0{i+1}-v1.png', S_KEVIN)))
    cuts.append((f'heli{i}', *feet(f'kevin-towel-helicopter-0{i+1}-v1.png', S_KEVIN)))
    cuts.append((f'bus{i}', *feet(f'kevin-riding-the-bus-0{i+1}-v1.png', S_BUS)))
N, fr = pack(cuts, (Image.open(ba).convert('RGBA'), json.load(open(bf))))
N.save(f'{out}/kevin-atlas.webp', 'WEBP', quality=88, method=6); json.dump(fr, open(f'{out}/kevin-frames.json', 'w'))
print('kevin', N.size, len(fr), {k: fr[k][2:] for k in ('idle0', 'toss0', 'heli2', 'bus1')})
# effects atlas
cuts = [(f'towel{i}', *centre(f'terrible-towel-projectile-0{i+1}-v1.png', 160)) for i in range(4)]
cuts += [(f'terry{i}', *feet(f'terry-bradshaw-going-long-0{i+1}-v1.png', S_TERRY)) for i in range(4)]
cuts += [('target', *centre('going-long-homing-fx-01-v2.png', 200)), ('ball', *centre('going-long-homing-fx-03-v2.png', 180)),
         ('ballcurve', *centre('going-long-homing-fx-04-v2.png', 180)),
         ('titlebus', *centre('title-riding-the-bus-v1.png', 620)), ('titlelong', *centre('title-going-long-v1.png', 620))]
N, fr = pack(cuts)
N.save(f'{out}/kevin-fx-atlas.webp', 'WEBP', quality=88, method=6); json.dump(fr, open(f'{out}/kevin-fx-frames.json', 'w'))
print('kevin-fx', N.size, len(fr))
