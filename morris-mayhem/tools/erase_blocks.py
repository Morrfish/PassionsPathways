"""Siren's dragon Block Barrage: the throw/follow-through poses have the blocks painted in, but the game
throws its own block projectile, so the painted ones are erased (only in front of her paw).
usage: erase_blocks.py <in.png> <out.png> [detached]  (detached: the blocks have already left her paw, only remove loose pieces)"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage as nd
im = np.array(Image.open(sys.argv[1]).convert('RGBA')).astype(int)
r, g, b, a = (im[..., k] for k in range(4))
op = a > 40; lab, n = nd.label(op); sz = nd.sum(op, lab, range(1, n + 1)); main = 1 + int(np.argmax(sz))
ys, xs = np.where(lab == main); x0, x1 = xs.min(), xs.max()
front = np.zeros_like(op); front[:, int(x0 + (x1 - x0) * 0.62):] = True
blk = (a > 40) & (((r > 170) & (g < 120) & (b < 120)) | ((r > 190) & (g > 140) & (b < 90)) | ((b > 150) & (r < 80) & (g < 105)))
body = (b > 170) & (g > 170) & (r < 170)
if len(sys.argv) < 4:
    kill = ((lab != main) & op & front) | (blk & front)
    kill = nd.binary_dilation(kill, iterations=4) & op & front & ~body
    im[..., 3][kill] = 0
for _ in range(2):  # whatever is left in front and no longer attached to her body (block tops, outlines)
    op = im[..., 3] > 40; lab, n = nd.label(op); sz = nd.sum(op, lab, range(1, n + 1)); main = 1 + int(np.argmax(sz))
    for i in range(1, n + 1):
        if i != main:
            m = lab == i
            if (m & front).sum() > 0.5 * m.sum(): im[..., 3][m] = 0
Image.fromarray(im.astype(np.uint8)).save(sys.argv[2])
