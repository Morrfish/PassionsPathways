"""ChatGPT's missing-art pack (Nov 25): effects atlas 'fx10' with centre anchors.
usage: build_fx10.py <rawdir> <outdir>"""
import sys, json, glob, os
from PIL import Image
raw, out = sys.argv[1:3]
# published name, file, longest side in the atlas
ITEMS = [('web', 'cole-spider-snare-floor-web-v1.png', 300)]
ITEMS += [(f'lakemaw{i}', f'giant-jeff-lake-maw-0{i+1}-v1.png', 320) for i in range(4)]
ITEMS += [(f'parcel{i}', f'giant-patty-parcel-rain-0{i+1}-v1.png', 200) for i in range(3)]
ITEMS += [(f'yap{i}', f'triple-trouble-triple-yap-0{i+1}-v1.png', 260) for i in range(4)]
ITEMS += [(f'woodland{i}', f'giant-jeff-woodland-call-0{i+1}-v1.png', 320) for i in range(4)]
ITEMS += [(f'star{i}', f'mayhem-star-0{i+1}-v1.png', 200) for i in range(4)]
ITEMS += [('hitsmall', 'hit-small-spark-v1.png', 200), ('hitbig', 'hit-big-burst-v1.png', 320), ('catchring', 'ultimate-catch-ring-v1.png', 360)]
cuts = []
for name, fn, mx in ITEMS:
    im = Image.open(os.path.join(raw, fn)).convert('RGBA')
    bb = im.split()[3].point(lambda v: 255 if v > 8 else 0).getbbox(); im = im.crop(bb)
    s = min(1, mx / max(im.size)); im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
    cuts.append((name, im, (im.width / 2, im.height / 2)))
# the rainbow beam: no vertical trim, so start and middle keep the shared axis (y=512 on the source)
st = Image.open(os.path.join(raw, 'siren-dragon-rainbow-beam-start-v2.png')).convert('RGBA')
md = Image.open(os.path.join(raw, 'siren-dragon-rainbow-beam-middle-v2.png')).convert('RGBA')
bs = 256 / st.height
for name, im in (('beamstart', st), ('beammid', md)):
    im2 = im.resize((max(1, round(im.width * bs)), max(1, round(im.height * bs))), Image.LANCZOS)
    cuts.append((name, im2, (0, 512 * bs)))
x = y = rowh = 0; pos = {}
for n, c, _ in cuts:
    if x + c.width > 2048: x, y, rowh = 0, y + rowh + 2, 0
    pos[n] = (x, y); x += c.width + 2; rowh = max(rowh, c.height)
A = Image.new('RGBA', (2048, y + rowh)); fr = {}
for n, c, (ax, ay) in cuts:
    px, py = pos[n]; A.paste(c, (px, py)); fr[n] = [px, py, c.width, c.height, round(ax, 1), round(ay, 1)]
A.save(f'{out}/fx10-atlas.webp', 'WEBP', quality=88, method=6)
json.dump(fr, open(f'{out}/fx10-frames.json', 'w'))
print('fx10', A.size, len(fr), 'beam', fr['beamstart'][2:4], fr['beammid'][2:4], 'src', st.size, md.size)
