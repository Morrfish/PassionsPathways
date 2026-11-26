# Adds Siren's Creativity transformation poses (sketch -> dragon: cup0-3) and her exhaustion poses
# (tired0-3: tired, helpless, hurt, ready) to her existing atlas. Her original sheets aren't needed:
# every frame already in the atlas is cut back out of it and repacked with the new ones.
# usage: python3 -I tools/add_siren_dragon.py <folder with siren-creativity-transform-exhaustion-draft.png> <out folder>
import sys, json, os
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import slice_sprites as ss
SCALE = ss.CHARACTERS['siren']['scale']  # same scale as the rest of her atlas
art, out = sys.argv[1], sys.argv[2]
L = json.load(open(f'{out}/siren-frames.json')); at = Image.open(f'{out}/siren-atlas-preview.png').convert('RGBA')
frames = {k: (at.crop((x, y, x + w, y + h)), ax, ay) for k, (x, y, w, h, ax, ay) in L.items() if not k.startswith(('cup', 'tired'))}
ss.slice_bodies(f'{art}/siren-creativity-transform-exhaustion-draft.png', ['cup', None, 'tired'], frames, SCALE, wipeyellow=True)  # the yellow step captions under the poses
ss.pack(frames, out, 'siren')
