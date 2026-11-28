#!/usr/bin/env python3
"""Turn ChatGPT sprite sheets into game-ready Taleborn sprites.

Usage:
  python3 -I taleborn/tools/process_sprites.py LINE_ID SRC_DIR OUT_DIR [--battle 64] [--icon 32]

SRC_DIR must contain LINE_ID-F.png, LINE_ID-B.png and LINE_ID-I.png (or LINE_ID-I-v2.png, preferred).
Dex numbers and names come from taleborn/creatures.csv.

What it does:
  1. Removes the white background by flood-filling from the edges, so white INSIDE the outline
     (hair, wraps, highlights) is kept.
  2. Splits each sheet into creatures (battle sheets: left to right; icon sheet: rows, 2 frames per row).
  3. Scales FRONT and BACK of the same creature by the SAME factor, so they match in size.
     Stage 1 fills 62% of the canvas, rising to 100% at stage 5, so evolutions visibly grow.
  4. Downscales with an area average, then snaps front+back (or both icon frames) to ONE shared
     31-color palette + transparency (MAXCOVERAGE keeps small accent colors like gold trim) and hard 1-bit transparency. No blurry edges.
  5. Places every sprite bottom-center on a fixed square canvas (feet on the same baseline = steady pivot).
  6. Icons: both frames get the same scale and are aligned on the feet and the body center, so the only
     motion left is the bounce that was drawn. It also writes an auto-bounce version
     (frame 1 + frame 1 moved down 1 px) that can never jitter.
"""
import argparse
import csv
import json
import os

import numpy as np
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
CSV = os.path.join(os.path.dirname(HERE), "creatures.csv")


# ---------- background removal ----------
def remove_background(img, light=228, chroma=22):
    rgb = np.asarray(img.convert("RGB")).astype(np.int16)
    cand = (rgb.min(2) >= light) & ((rgb.max(2) - rgb.min(2)) <= chroma)
    h, w = cand.shape
    # flood fill from a 1px padded border over "near white" pixels
    pad = np.zeros((h + 2, w + 2), np.uint8)
    pad[1:-1, 1:-1] = np.where(cand, 255, 0)
    pad[0, :] = pad[-1, :] = 255
    pad[:, 0] = pad[:, -1] = 255
    m = Image.fromarray(pad).copy()  # copy: array-backed images ignore floodfill
    ImageDraw.floodfill(m, (0, 0), 128)
    bg = (np.asarray(m) == 128)[1:-1, 1:-1]
    # eat the light anti-aliased halo that touches the background (2 passes)
    for _ in range(2):
        nb = np.zeros_like(bg)
        nb[1:, :] |= bg[:-1, :]; nb[:-1, :] |= bg[1:, :]
        nb[:, 1:] |= bg[:, :-1]; nb[:, :-1] |= bg[:, 1:]
        halo = nb & ~bg & (rgb.min(2) >= 200) & ((rgb.max(2) - rgb.min(2)) <= 30)
        bg |= halo
    rgba = np.dstack([rgb.astype(np.uint8), np.where(bg, 0, 255).astype(np.uint8)])
    return rgba


def runs(occ, min_gap, min_len):
    """Split a 1D occupancy array into runs separated by >= min_gap empty cells."""
    idx = np.where(occ)[0]
    if len(idx) == 0:
        return []
    out, start, prev = [], idx[0], idx[0]
    for i in idx[1:]:
        if i - prev > min_gap:
            out.append((start, prev + 1)); start = i
        prev = i
    out.append((start, prev + 1))
    return [r for r in out if r[1] - r[0] >= min_len]


def bbox(alpha):
    ys, xs = np.where(alpha > 0)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def split_row(rgba, expected, min_gap=6):
    a = rgba[..., 3] > 0
    occ = a.sum(0) > 0
    gap = min_gap
    parts = runs(occ, gap, 8)
    # widen the gap until we get the expected count (petals/aura bits can sit in gaps)
    while len(parts) > expected and gap < 200:
        gap += 4
        parts = runs(occ, gap, 8)
    if len(parts) != expected:
        raise SystemExit(f"expected {expected} sprites, found {len(parts)}")
    out = []
    for x0, x1 in parts:
        sub = rgba[:, x0:x1]
        bx0, by0, bx1, by1 = bbox(sub[..., 3])
        out.append(sub[by0:by1, bx0:bx1])
    return out


def split_grid(rgba, rows, cols):
    a = rgba[..., 3] > 0
    rparts = runs(a.sum(1) > 0, 6, 8)
    gap = 6
    while len(rparts) > rows and gap < 200:
        gap += 4
        rparts = runs(a.sum(1) > 0, gap, 8)
    if len(rparts) != rows:
        raise SystemExit(f"expected {rows} icon rows, found {len(rparts)}")
    grid = []
    for y0, y1 in rparts:
        grid.append(split_row(rgba[y0:y1], cols))
    return grid


# ---------- scaling and palette ----------
def area_downscale(rgba, scale):
    """Average colors of opaque pixels only; a pixel is opaque if >= 50% of its area was."""
    h, w = rgba.shape[:2]
    nh, nw = max(1, round(h / scale)), max(1, round(w / scale))
    im = Image.fromarray(rgba, "RGBA")
    a = np.asarray(im.split()[3].resize((nw, nh), Image.BOX)).astype(np.float32) / 255
    pre = rgba[..., :3].astype(np.float32) * (rgba[..., 3:4] / 255.0)
    pre_img = [Image.fromarray(pre[..., c].astype(np.float32), "F").resize((nw, nh), Image.BOX) for c in range(3)]
    col = np.dstack([np.asarray(p) for p in pre_img]) / np.maximum(a[..., None], 1e-6)
    out = np.zeros((nh, nw, 4), np.uint8)
    out[..., :3] = np.clip(col, 0, 255).astype(np.uint8)
    out[..., 3] = np.where(a >= 0.5, 255, 0)
    return out


def palettize(*sprites, colors=15):
    """Snap one or more sprites to ONE shared palette (so front and back use identical colors)."""
    allpix = np.concatenate([s[s[..., 3] > 0][:, :3] for s in sprites]).reshape(-1, 1, 3)
    pal = Image.fromarray(allpix, "RGB").quantize(colors=colors, method=Image.Quantize.MAXCOVERAGE,
                                                   dither=Image.Dither.NONE)
    outs = []
    for s in sprites:
        opaque = s[..., 3] > 0
        o = s.copy()
        if opaque.any():
            pix = Image.fromarray(s[opaque][:, :3].reshape(-1, 1, 3), "RGB")
            q = pix.quantize(palette=pal, dither=Image.Dither.NONE).convert("RGB")
            o[opaque, :3] = np.asarray(q).reshape(-1, 3)
        outs.append(o)
    return outs


STAGE_FILL = [0.62, 0.74, 0.86, 0.96, 1.0]


def place(sprite, size, baseline_pad=1, dx=0, dy=0):
    canvas = np.zeros((size, size, 4), np.uint8)
    h, w = sprite.shape[:2]
    x = (size - w) // 2 + dx
    y = size - baseline_pad - h + dy
    xs0, ys0 = max(0, -x), max(0, -y)
    xe, ye = min(w, size - x), min(h, size - y)
    canvas[y + ys0:y + ye, x + xs0:x + xe] = sprite[ys0:ye, xs0:xe]
    return canvas


def save(arr, path, scale=1):
    im = Image.fromarray(arr, "RGBA")
    if scale != 1:
        im = im.resize((im.width * scale, im.height * scale), Image.NEAREST)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path)


def slug(name):
    return "".join(c for c in name.lower() if c.isalnum())


def line_rows(line_id):
    """Look up the 5 creatures of a prompt ID like SAK-01 from the roster CSV order."""
    codes = {"SAK": "Sakuraden", "CAP": "Capeworth", "TOO": "Toonvale", "PAN": "Pantheos",
             "RES": "Respawn Reach", "HOL": "Hollowmere", "MAR": "The Midnight Marquee"}
    code, num = line_id.split("-")[:2]
    rows = [r for r in csv.DictReader(open(CSV)) if r["region"] == codes[code] and r["kind"] != "sovereign"]
    lines = []
    for r in rows:
        if r["line"] not in lines:
            lines.append(r["line"])
    target = lines[int(num) - 1]
    return [r for r in rows if r["line"] == target and "branch" not in r["stage"]][:5]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("line_id"); ap.add_argument("src"); ap.add_argument("out")
    ap.add_argument("--battle", type=int, nargs="+", default=[64])
    ap.add_argument("--icon", type=int, nargs="+", default=[32])
    ap.add_argument("--colors", type=int, default=31)
    args = ap.parse_args()

    creatures = line_rows(args.line_id)
    names = [f"{int(r['dex']):03d}_{slug(r['name'])}" for r in creatures]
    report = {"line": args.line_id, "creatures": names, "battle": {}, "icons": {}}

    F = split_row(remove_background(Image.open(os.path.join(args.src, f"{args.line_id}-F.png"))), 5)
    B = split_row(remove_background(Image.open(os.path.join(args.src, f"{args.line_id}-B.png"))), 5)
    for S in args.battle:
        inner = S - 4
        for i, n in enumerate(names):
            # earlier stages are drawn smaller so the line visibly grows (stage 1 = 62% of the canvas)
            inner_i = round(inner * STAGE_FILL[i])
            sc = max(max(F[i].shape[:2]), max(B[i].shape[:2])) / inner_i  # same factor for front and back
            fr, bk = palettize(area_downscale(F[i], sc), area_downscale(B[i], sc), colors=args.colors)
            for view, spr in (("front", fr), ("back", bk)):
                save(place(spr, S), os.path.join(args.out, f"battle{S}", view, f"{n}.png"))
            report["battle"].setdefault(S, []).append({"name": n, "front_px": list(F[i].shape[:2]),
                                                       "back_px": list(B[i].shape[:2]),
                                                       "height_ratio_back_vs_front": round(B[i].shape[0] / F[i].shape[0], 2)})

    icon_src = os.path.join(args.src, f"{args.line_id}-I-v2.png")
    if not os.path.exists(icon_src):
        icon_src = os.path.join(args.src, f"{args.line_id}-I.png")
    G = split_grid(remove_background(Image.open(icon_src)), 5, 2)
    for S in args.icon:
        for i, n in enumerate(names):
            f1, f2 = G[i]
            sc = max(max(f1.shape[:2]), max(f2.shape[:2])) / (S - 2)
            a, b = palettize(area_downscale(f1, sc), area_downscale(f2, sc), colors=args.colors)
            # drawn frames: align on feet (bottom) and horizontal body center
            c1 = place(a, S); c2 = place(b, S)
            diff = float(((c1[..., 3] > 0) != (c2[..., 3] > 0)).mean())
            sheet = np.concatenate([c1, c2], 1)
            save(sheet, os.path.join(args.out, f"icon{S}", "drawn", f"{n}.png"))
            # auto-bounce: frame 1, then frame 1 one pixel lower
            auto = np.concatenate([place(a, S, baseline_pad=2), place(a, S, baseline_pad=1)], 1)
            save(auto, os.path.join(args.out, f"icon{S}", "auto", f"{n}.png"))
            report["icons"].setdefault(S, []).append({"name": n, "frame_mismatch_pct": round(diff * 100, 1)})

    with open(os.path.join(args.out, "report.json"), "w") as fh:
        json.dump(report, fh, indent=1)
    print(json.dumps(report, indent=1))


if __name__ == "__main__":
    main()
