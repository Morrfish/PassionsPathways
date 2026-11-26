"""Giant Jeff / Giant Patty v2: ChatGPT's native redraws (2x4 parts + change sheets, frames named in its ASSET_MANIFEST).
Every move keeps the in-game size it had in the old atlas (median over the move's frames, from the old sprites.js), and the
art is stored at about the size it's drawn on a big screen (idle ~STAND px), so it's sharp. Too much art for one 4096px
atlas, so it's split: <id>-atlas (first) and <id>-b-atlas (the rest); the first one's `base` points at the second.
usage: build_giants_v2.py <rawdir> <outdir> <old sprites.js> <id>"""
import sys, json, subprocess
import numpy as np
from PIL import Image
raw, out, oldjs, sid = sys.argv[1:5]
STAND = 430
M = [e for e in json.load(open(f'{raw}/mm-giants-native-v2-ASSET_MANIFEST.json')) if e['fighter'] == sid]
S = json.loads(subprocess.check_output(['node', '-e', "global.window=global;global.MM={};eval(require('fs').readFileSync(process.argv[1],'utf8'));console.log(JSON.stringify(MM.SPRITES[process.argv[2]]))", oldjs, sid]))
old = lambda k: S['frames'][k][3] * S['fscale'].get(k, 1) / S['standH'] if k in S['frames'] else None  # old drawn height / fighter art height
cells = {}
for e in M:
    im = Image.open(f"{raw}/{e['name']}").convert('RGBA')
    for f in e['frames']:
        k = f['key']
        if k in ('ent', 'taunt', 'win', 'lose'): continue  # these stay aliases of cup3/wild0/... (same key poses)
        x, y, w, h = f['rect']; c = im.crop((x, y, x + w, y + h))
        a = np.array(c); a[..., :3][a[..., 3] == 0] = 0; c = Image.fromarray(a)
        bb = c.split()[3].point(lambda v: 255 if v > 24 else 0).getbbox(); cells[k] = c.crop(bb)
import re
groups = {}
for k in cells: groups.setdefault(re.sub(r'\d$', '', k), []).append(k)
ratio = {g: float(np.median([old(k) / cells[k].height for k in ks if old(k)])) for g, ks in groups.items()}
T = STAND / (cells['idle0'].height * ratio['idle'])
PER_FRAME = ('cup', 'back')
cuts = []
for g, ks in groups.items():
    for k in ks:
        # the change rows mix human and giant poses drawn at different zooms, so those match frame by frame
        s = (old(k) / cells[k].height if g in PER_FRAME and old(k) else ratio[g]) * T; assert s <= 1.0, (k, s)  # never enlarge
        c = cells[k]; c = c.resize((max(1, round(c.width * s)), max(1, round(c.height * s))), Image.LANCZOS)
        a = np.array(c)[..., 3] > 100; rows = np.where(a.any(1))[0]; foot = a[rows[-1] - min(10, len(rows) - 1):rows[-1] + 1].any(0); xs = np.where(foot)[0]
        cuts.append((k, c, (xs.min() + xs.max()) / 2 if len(xs) else c.width / 2, c.height))
MAIN_FIRST = ('idle', 'run', 'jump', 'hurt', 'cup', 'back', 'wild', 'emg')  # the aliased poses (ent/taunt/win/lose) must be in the first atlas
cuts.sort(key=lambda t: (0 if t[0].rstrip('0123456789') in MAIN_FIRST else 1, -t[1].height))
def pack(items):
    x = y = rowh = 0; pos = {}; left = []
    for n, c, ax, ay in items:
        if x + c.width > 2048: x, y, rowh = 0, y + rowh + 2, 0
        if y + c.height > 4096: left.append((n, c, ax, ay)); continue
        pos[n] = (x, y); x += c.width + 2; rowh = max(rowh, c.height)
    H = max(pos[n][1] + c.height for n, c, _, _ in items if n in pos)
    A = Image.new('RGBA', (2048, H)); F = {}
    for n, c, ax, ay in items:
        if n in pos: px, py = pos[n]; A.paste(c, (px, py)); F[n] = [px, py, c.width, c.height, round(float(ax), 1), round(float(ay), 1)]
    return A, F, left
A, F, rest = pack(cuts)
idle0 = next(t for t in cuts if t[0] == 'idle0')
B, FB, rest2 = pack([idle0] + sorted(rest, key=lambda t: -t[1].height))  # idle0 again so both atlases share standH
assert not rest2, [t[0] for t in rest2]
for name, img, fr in ((sid, A, F), (sid + '-b', B, FB)):
    img.save(f'{out}/{name}-atlas.webp', 'WEBP', quality=88, method=6); json.dump(fr, open(f'{out}/{name}-frames.json', 'w'))
    print(name, img.size, len(fr))
print('scales', {g: round(ratio[g] * T, 3) for g in groups})
