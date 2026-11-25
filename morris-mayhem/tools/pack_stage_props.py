# Packs separate prop PNGs (ChatGPT's newer arena packs ship one prop per file) into one arena atlas, and
# measures each prop's walkable top (the first row that is mostly solid) for MM.STAGE_PICS.
#
# usage: python3 -I tools/pack_stage_props.py <stage id> <out dir> name=file.png [name=file.png ...]
# Output: <out>/<stage>-props.webp and prints frames {name: [x, y, w, h]} plus walk tops {name: [sx0, sx1, sy]}.
import sys, json, numpy as np
from PIL import Image

stage, out, items = sys.argv[1], sys.argv[2], [a.split('=', 1) for a in sys.argv[3:]]
crops = {}
for name, fn in items:
    a = np.array(Image.open(fn).convert('RGBA')); a[a[..., 3] < 64] = 0
    ys, xs = np.nonzero(a[..., 3]); a = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    if a.shape[1] > 900:  # keep the atlas small: floors at most 900 px wide
        k = 900 / a.shape[1]; a = np.array(Image.fromarray(a).resize((900, max(1, round(a.shape[0] * k))), Image.LANCZOS))
    crops[name] = a
W, PAD, x, y, rowh, frames = 2048, 4, 0, 0, 0, {}
for name, a in crops.items():
    h, w = a.shape[:2]
    if x + w > W: x, y, rowh = 0, y + rowh + PAD, 0
    frames[name] = [x, y, w, h]; x += w + PAD; rowh = max(rowh, h)
atlas = Image.new('RGBA', (W, y + rowh))
for name, a in crops.items(): atlas.paste(Image.fromarray(a), tuple(frames[name][:2]))
atlas.save(f'{out}/{stage}-props.webp', 'WEBP', quality=88, method=6)
tops = {}
for name, a in crops.items():
    solid = a[..., 3] > 128
    rows = solid.mean(1)
    sy = int(np.argmax(rows > 0.6 * rows.max()))  # first row that's mostly as wide as the prop
    cols = np.nonzero(solid[sy:sy + 6].any(0))[0]
    tops[name] = [int(cols.min()), int(cols.max()), sy]
print(json.dumps({'frames': frames, 'tops': tops}))
