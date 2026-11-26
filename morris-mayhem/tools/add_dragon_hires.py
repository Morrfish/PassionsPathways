"""Swap Siren's dragon to ChatGPT's high-resolution poses (Nov 25 pack).
New rows: idle, run, jump, hurt, attack (-> atk), breath (-> prism), tired. Cells 1600x1152, feet pivot (800,1100).
Old poses with no new art (horn, soar, shield, back, barrage, fxcubes, tail, wing, stomp) are copied from the
low-res atlas unchanged; <out>/siren-dragon-fscale.json tells the sprite builder to draw them at the new size.
usage: add_dragon_hires.py <rawdir> <outdir> [scale]"""
import sys, os, json, shutil
from PIL import Image
import numpy as np
raw, out = sys.argv[1:3]; S = float(sys.argv[3]) if len(sys.argv) > 3 else 0.62
lo_a, lo_f = f'{out}/siren-dragon-lowres-atlas.webp', f'{out}/siren-dragon-lowres-frames.json'
if not os.path.exists(lo_f):  # keep the original cut once
    shutil.copy(f'{out}/siren-dragon-atlas.webp', lo_a); shutil.copy(f'{out}/siren-dragon-frames.json', lo_f)
old = json.load(open(lo_f)); OA = Image.open(lo_a).convert('RGBA')
ROWS = {'idle': 'idle', 'run': 'run', 'jump': 'jump', 'hurt': 'hurt', 'attack': 'atk', 'breath': 'prism', 'tired': 'tired',
        # second pack (Nov 26): the moves that were still the old small art
        'horn-lift': 'horn', 'block-stomp': 'stomp', 'soar': 'soar', 'shield': 'shield', 'barrage': 'barrage', 'change-back': 'back'}
LABEL_BELOW = {'back2', 'barrage0'}  # old poses with a caption plate drawn under them
cuts = []
for row, name in ROWS.items():
    for i in range(4):
        im = Image.open(f'{raw}/siren-dragon-{row}-0{i+1}-hires-v2.png').convert('RGBA')
        bb = im.split()[3].point(lambda v: 255 if v > 12 else 0).getbbox(); im = im.crop(bb)
        im = im.resize((round(im.width * S), round(im.height * S)), Image.LANCZOS)
        cuts.append((f'{name}{i}', im, ((800 - bb[0]) * S, (1100 - bb[1]) * S)))
new_names = {n for n, _, _ in cuts}
keep = [k for k in old if k not in new_names and not k.startswith(('tail', 'wing'))]  # old tail/wing swipes: unused, replaced by the hi-res attack row
for k in keep:
    x, y, w, h, ax, ay = old[k]
    c = OA.crop((x, y, x + w, y + h))
    if k in LABEL_BELOW:  # a caption plate under the feet: find its top (the wide rows at the bottom) and cut there
        a = np.array(c)[..., 3] > 40; cnt = a.sum(1); pw = cnt[-12:].max(); top = h - 1
        while top > 0 and cnt[top - 1] > 0.55 * pw: top -= 1
        c = c.crop((0, 0, w, top)); ay = top
    cuts.append((k, c, (ax, ay)))
cuts.sort(key=lambda c: -c[1].height)
x = y = rowh = 0; pos = {}
for n, c, _ in cuts:
    if x + c.width > 2048: x, y, rowh = 0, y + rowh + 2, 0
    pos[n] = (x, y); x += c.width + 2; rowh = max(rowh, c.height)
A = Image.new('RGBA', (2048, y + rowh)); fr = {}
for n, c, (ax, ay) in cuts:
    px, py = pos[n]; A.paste(c, (px, py)); fr[n] = [px, py, c.width, c.height, round(ax, 1), round(ay, 1)]
# feet-to-top height of the standing pose sets the size: old poses are drawn bigger by new/old idle height
k = round(fr['idle0'][5] / old['idle0'][5], 3)
json.dump({p: k for p in keep}, open(f'{out}/siren-dragon-fscale.json', 'w'))
A.save(f'{out}/siren-dragon-atlas.webp', 'WEBP', quality=88, method=6)
json.dump(fr, open(f'{out}/siren-dragon-frames.json', 'w'))
print('siren-dragon', A.size, len(fr), 'idle0', fr['idle0'], 'old poses x', k)
