"""Component slicer for ChatGPT sheets that carry a title banner and row-label badges (Colten, Nov 28): the banner and the
badges are dropped; rows = badge centres; each big blob goes to the nearest row centre and to one of nc even columns,
small blobs (sparkles, shoes) join the nearest big blob. cslice(path, nr, nc) -> rows of crops"""
import numpy as np
from PIL import Image
from scipy import ndimage as nd
def cslice(path, nr, nc, thr=24, rowc=None):
    A = np.array(Image.open(path).convert('RGBA')); H, W = A.shape[:2]
    al = A[..., 3] > thr
    r_, g_, b_ = [A[..., i].astype(int) for i in range(3)]
    yrow = al.sum(1); top = []; started = False
    for y in range(int(0.12 * H)):
        if yrow[y] > 0.33 * W: top.append(y); started = True
        elif started: break
    if top: al[:max(top) + 3] = False
    lab, n = nd.label(nd.binary_dilation(al, iterations=2))
    r, g, b = [A[..., i].astype(int) for i in range(3)]
    yel = (r > 200) & (g > 160) & (b < 90) & al
    objs = nd.find_objects(lab); badges = []; blobs = []
    for j, sl in enumerate(objs, 1):
        m = (lab[sl] == j) & al[sl]; tot = m.sum()
        if not tot: continue
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        fy = (yel[sl] & m).sum() / tot
        if y0 < 0.03 * H and (x1 - x0) > 0.3 * W: continue
        if x1 < 0.17 * W and fy > 0.12: badges.append((y0 + y1) / 2); continue
        ys, xs = np.nonzero(m); blobs.append((j, sl, tot, ys.mean() + y0, xs.mean() + x0))
    rc = sorted(rowc or badges)
    if len(rc) != nr:  # no badges: rows by weighted y quantiles of big blobs
        big = [bl for bl in blobs if bl[2] > 0.002 * al.sum()]
        ys = np.array(sorted(bl[3] for bl in big)); rc = list(np.quantile(ys, [(i + .5) / nr for i in range(nr)]))
    assert len(rc) == nr, (path, rc)
    big = [bl for bl in blobs if bl[2] > 0.004 * al.sum()]
    x0s = min(bl[1][1].start for bl in big); x1s = max(bl[1][1].stop for bl in big); pw = (x1s - x0s) / nc
    cc = np.array([x0s + pw * (k + .5) for k in range(nc)])
    # split blobs taller than a row pitch at the row boundaries
    pitch = (rc[-1] - rc[0]) / max(1, nr - 1) if nr > 1 else H; bnd = [(rc[i] + rc[i + 1]) / 2 for i in range(nr - 1)]
    nb = []; nl = n
    for bl in blobs:
        j, sl, tot, cy, cx = bl
        if sl[0].stop - sl[0].start > 1.15 * pitch:
            for lo, hi in zip([0] + bnd, bnd + [H]):
                lo, hi = int(max(lo, sl[0].start)), int(min(hi, sl[0].stop))
                if hi <= lo: continue
                m = np.zeros_like(lab, bool); m[lo:hi, sl[1]] = (lab[lo:hi, sl[1]] == j) & al[lo:hi, sl[1]]
                if not m.any(): continue
                nl += 1; lab[m] = nl; ys, xs = np.nonzero(m); s2 = (slice(ys.min(), ys.max() + 1), slice(xs.min(), xs.max() + 1))
                nb.append((nl, s2, m.sum(), ys.mean(), xs.mean()))
        else: nb.append(bl)
    blobs = nb
    out = [[np.zeros((H, W), bool) for _ in range(nc)] for _ in range(nr)]
    # big blobs to their cell; small blobs to the cell of the nearest big blob
    BIG = 0.02 * al.sum(); bigc = []
    for j, sl, tot, cy, cx in blobs:
        if tot > BIG:
            ri = int(np.argmin([abs(cy - v) for v in rc])); ci = int(np.argmin(abs(cc - cx)))
            bigc.append((sl, ri, ci)); out[ri][ci][sl] |= (lab[sl] == j)
    for j, sl, tot, cy, cx in blobs:
        if tot > BIG or tot < 0.00005 * al.sum(): continue
        def dist(b):
            s2 = b[0]; dy = max(s2[0].start - cy, 0, cy - s2[0].stop); dx = max(s2[1].start - cx, 0, cx - s2[1].stop); return dy * dy + dx * dx
        b = min(bigc, key=dist)
        if dist(b) < 45 ** 2: out[b[1]][b[2]][sl] |= (lab[sl] == j)
        else: out[int(np.argmin([abs(cy - v) for v in rc]))][int(np.argmin(abs(cc - cx)))][sl] |= (lab[sl] == j)  # e.g. a burst of loose sprinkles
    res = []
    S = A.copy()
    for ri in range(nr):
        row = []
        for ci in range(nc):
            m = out[ri][ci] & al
            if not m.any(): row.append(None); continue
            ys, xs2 = np.nonzero(m); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs2.min(), xs2.max() + 1
            C = S[y0:y1, x0:x1].copy(); C[..., 3][~out[ri][ci][y0:y1, x0:x1]] = 0
            row.append(Image.fromarray(C))
        res.append(row)
    return res
if __name__ == '__main__':
    import sys
    p, nr, nc = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    R = cslice(p, nr, nc)
    print(p.split('/')[-1], [[(c.width, c.height) if c else None for c in r] for r in R])
    if len(sys.argv) > 4:  # contact sheet
        cw = max(c.width for r in R for c in r if c); ch = max(c.height for r in R for c in r if c)
        T = Image.new('RGBA', (cw * nc, ch * nr), (255, 0, 255, 255))
        for i, r in enumerate(R):
            for k, c in enumerate(r):
                if c: T.alpha_composite(c, (k * cw, i * ch + ch - c.height))
        T.convert('RGB').resize((T.width * 700 // T.width, T.height * 700 // T.width)).save(sys.argv[4])
