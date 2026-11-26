"""ChatGPT's 4x4 animation sheets (v2, Nov 26: the grandmas) -> cells. Each row is one move, four frames left to right.
Cells are found from empty gaps (rows first, then columns inside each row), so uneven sheet sizes are fine.
cells(path) -> list of 4 rows, each a list of 4 RGBA crops (trimmed to the figure)."""
import numpy as np
from PIL import Image
from scipy import ndimage as nd
def _bands(mask_1d, n, minsize):
    idx = np.where(mask_1d)[0]
    if not len(idx): return []
    runs = np.split(idx, np.where(np.diff(idx) > 1)[0] + 1)
    runs = [r for r in runs if len(r) >= minsize]
    while len(runs) > n:  # merge the pair separated by the smallest gap
        gaps = [runs[i + 1][0] - runs[i][-1] for i in range(len(runs) - 1)]; i = int(np.argmin(gaps))
        runs[i:i + 2] = [np.arange(runs[i][0], runs[i + 1][-1] + 1)]
    return [(r[0], r[-1] + 1) for r in runs]
def cells(path, thr=24):
    S = Image.open(path).convert('RGBA'); A = np.array(S); al = A[..., 3] > thr
    lab, n = nd.label(al); sz = nd.sum(al, lab, range(1, n + 1)); keep = np.isin(lab, [j + 1 for j in range(n) if sz[j] >= 0.0005 * al.sum()])
    A[..., 3][~keep] = 0; al = keep; S = Image.fromarray(A)
    rows = _bands(al.any(1), 4, 8); out = []
    assert len(rows) == 4, (path, rows)
    for y0, y1 in rows:
        cols = _bands(al[y0:y1].any(0), 4, 4); assert len(cols) == 4, (path, y0, cols)
        r = []
        for x0, x1 in cols:
            c = S.crop((x0, y0, x1, y1)); bb = c.split()[3].point(lambda v: 255 if v > thr else 0).getbbox(); r.append(c.crop(bb))
        out.append(r)
    return out
if __name__ == '__main__':
    import sys
    for p in sys.argv[1:]:
        print(p.split('/')[-1], [[c.height for c in r] for r in cells(p)])
