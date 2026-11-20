// Turns a photo or scan of a drawing into clean layers:
//   lines - dark pencil/ink lines on a transparent background
//   color - the colored-in parts with the paper removed (only when the drawing is colored)

const MAX_DIM = 1400;

export async function fileToCanvas(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('That file is not a picture this device can open.')); i.src = url; });
    return imageToCanvas(img, img.naturalWidth, img.naturalHeight);
  } finally { URL.revokeObjectURL(url); }
}
export function imageToCanvas(src, w, h) {
  const k = Math.min(1, MAX_DIM / Math.max(w, h)), c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w * k)); c.height = Math.max(1, Math.round(h * k));
  const ctx = c.getContext('2d'); ctx.imageSmoothingQuality = 'high'; ctx.drawImage(src, 0, 0, c.width, c.height);
  return c;
}

function integral(W, H, valFn) {
  const I = new Float64Array((W + 1) * (H + 1));
  for (let y = 0; y < H; y++) { let row = 0; for (let x = 0; x < W; x++) { row += valFn(y * W + x); I[(y + 1) * (W + 1) + x + 1] = I[y * (W + 1) + x + 1] + row; } }
  return I;
}
function boxSum(I, W, H, x, y, r) {
  const x0 = Math.max(0, x - r), y0 = Math.max(0, y - r), x1 = Math.min(W, x + r + 1), y1 = Math.min(H, y + r + 1), S = W + 1;
  return { s: I[y1 * S + x1] - I[y0 * S + x1] - I[y1 * S + x0] + I[y0 * S + x0], n: (x1 - x0) * (y1 - y0) };
}
const sat = (r, g, b) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx === 0 ? 0 : (mx - mn) / mx; };

// Remove connected specks smaller than minArea (mask: Uint8Array 0/1). Returns the mask.
function removeSpecks(mask, W, H, minArea) {
  const seen = new Uint8Array(W * H), stack = new Int32Array(W * H), comp = [];
  for (let i = 0; i < W * H; i++) {
    if (!mask[i] || seen[i]) continue;
    let sp = 0; stack[sp++] = i; seen[i] = 1; comp.length = 0;
    while (sp) { const p = stack[--sp]; comp.push(p); const x = p % W, y = (p / W) | 0;
      if (x > 0 && mask[p - 1] && !seen[p - 1]) { seen[p - 1] = 1; stack[sp++] = p - 1; }
      if (x < W - 1 && mask[p + 1] && !seen[p + 1]) { seen[p + 1] = 1; stack[sp++] = p + 1; }
      if (y > 0 && mask[p - W] && !seen[p - W]) { seen[p - W] = 1; stack[sp++] = p - W; }
      if (y < H - 1 && mask[p + W] && !seen[p + W]) { seen[p + W] = 1; stack[sp++] = p + W; } }
    if (comp.length < minArea) for (const p of comp) mask[p] = 0;
  }
  return mask;
}

// How much of the drawing is colored in (0..1 of the non-paper area).
export function colorAmount(src) {
  const W = src.width, H = src.height, d = src.getContext('2d').getImageData(0, 0, W, H).data;
  let colored = 0, ink = 0;
  for (let i = 0; i < W * H; i += 3) { const r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2], s = sat(r, g, b), v = Math.max(r, g, b); if (v < 215 || s > 0.15) { ink++; if (s > 0.22 && v > 50) colored++; } }
  return ink ? colored / ink : 0;
}

// strength: 0..1 (how faint a line still counts). keepColor: also build the color layer.
export function processSketch(src, { strength = 0.5, keepColor = false } = {}) {
  const W = src.width, H = src.height, d = src.getContext('2d').getImageData(0, 0, W, H).data, N = W * H;
  const gray = new Float32Array(N), S = new Float32Array(N);
  for (let i = 0; i < N; i++) { const r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2]; gray[i] = 0.3 * r + 0.59 * g + 0.11 * b; S[i] = sat(r, g, b); }
  const R = Math.max(8, Math.round(Math.max(W, H) / 40));
  const Ig = integral(W, H, (i) => gray[i]);
  // ---- lines ----
  const t = 0.16 - strength * 0.12;
  const la = new Uint8ClampedArray(N), lm = new Uint8Array(N);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x, { s, n } = boxSum(Ig, W, H, x, y, R), m = s / n;
    const dk = (m - gray[i]) / Math.max(30, m);
    const isInk = keepColor ? (S[i] < 0.3 || gray[i] < 45) : true;
    if (dk > t && gray[i] < 225 && isInk) { const a = Math.min(1, (dk - t) / 0.14 + 0.25); la[i] = a * 255; lm[i] = 1; }
  }
  removeSpecks(lm, W, H, Math.max(6, Math.round(N / 60000)));
  const lines = document.createElement('canvas'); lines.width = W; lines.height = H;
  const li = lines.getContext('2d').createImageData(W, H);
  for (let i = 0; i < N; i++) if (lm[i]) { li.data[i * 4] = 28; li.data[i * 4 + 1] = 24; li.data[i * 4 + 2] = 30; li.data[i * 4 + 3] = la[i]; }
  lines.getContext('2d').putImageData(li, 0, 0);
  if (!keepColor) return { lines, color: null };

  // ---- color ----
  // Estimate the paper color around each pixel, then white-balance against it.
  const sorted = Array.from(gray.filter((_, i) => i % 7 === 0)).sort((a, b) => a - b), bright = sorted[Math.floor(sorted.length * 0.6)];
  const isPaper = (i) => S[i] < 0.12 && gray[i] >= bright - 8;
  const R2 = Math.max(16, Math.round(Math.max(W, H) / 10));
  const Ir = integral(W, H, (i) => isPaper(i) ? d[i * 4] : 0), Igg = integral(W, H, (i) => isPaper(i) ? d[i * 4 + 1] : 0), Ib = integral(W, H, (i) => isPaper(i) ? d[i * 4 + 2] : 0), Ic = integral(W, H, (i) => isPaper(i) ? 1 : 0);
  let pr = 0, pg = 0, pb = 0, pc = 0; for (let i = 0; i < N; i += 5) if (isPaper(i)) { pr += d[i * 4]; pg += d[i * 4 + 1]; pb += d[i * 4 + 2]; pc++; }
  const gp = pc ? [pr / pc, pg / pc, pb / pc] : [245, 245, 245];
  const col = new Uint8ClampedArray(N * 4), cm = new Uint8Array(N);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x, c = boxSum(Ic, W, H, x, y, R2).s;
    const bg = c > 20 ? [boxSum(Ir, W, H, x, y, R2).s / c, boxSum(Igg, W, H, x, y, R2).s / c, boxSum(Ib, W, H, x, y, R2).s / c] : gp;
    const r = Math.min(255, d[i * 4] / Math.max(60, bg[0]) * 248), g = Math.min(255, d[i * 4 + 1] / Math.max(60, bg[1]) * 248), b = Math.min(255, d[i * 4 + 2] / Math.max(60, bg[2]) * 248);
    const s = sat(r, g, b), v = Math.max(r, g, b);
    col[i * 4] = r; col[i * 4 + 1] = g; col[i * 4 + 2] = b;
    if (s > 0.1 || v < 200 || lm[i]) cm[i] = 1;
  }
  // Close small gaps in pencil shading, then fill them with nearby color.
  const closed = erode(dilate(cm, W, H, 2), W, H, 2);
  removeSpecks(closed, W, H, Math.max(30, Math.round(N / 8000)));
  const Iar = integral(W, H, (i) => cm[i] ? col[i * 4] : 0), Iag = integral(W, H, (i) => cm[i] ? col[i * 4 + 1] : 0), Iab = integral(W, H, (i) => cm[i] ? col[i * 4 + 2] : 0), Iac = integral(W, H, (i) => cm[i]);
  const out = document.createElement('canvas'); out.width = W; out.height = H;
  const oi = out.getContext('2d').createImageData(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (!closed[i]) continue;
    const n = boxSum(Iac, W, H, x, y, 3).s;
    if (n > 0) {
      // Soften pencil texture by blending with the local average color.
      const ar = boxSum(Iar, W, H, x, y, 3).s / n, ag = boxSum(Iag, W, H, x, y, 3).s / n, ab = boxSum(Iab, W, H, x, y, 3).s / n;
      const k = cm[i] ? 0.5 : 1;
      oi.data[i * 4] = col[i * 4] * (1 - k) + ar * k; oi.data[i * 4 + 1] = col[i * 4 + 1] * (1 - k) + ag * k; oi.data[i * 4 + 2] = col[i * 4 + 2] * (1 - k) + ab * k;
    } else { oi.data[i * 4] = col[i * 4]; oi.data[i * 4 + 1] = col[i * 4 + 1]; oi.data[i * 4 + 2] = col[i * 4 + 2]; }
    oi.data[i * 4 + 3] = 255;
  }
  out.getContext('2d').putImageData(oi, 0, 0);
  return { lines, color: out };
}

// Square dilation / erosion of a 0/1 mask (separable running max/min).
export function dilate(mask, W, H, r) {
  if (r <= 0) return mask.slice();
  const tmp = new Uint8Array(W * H), out = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) { let cnt = 0; const o = y * W;
    for (let x = 0; x < Math.min(r, W); x++) cnt += mask[o + x];
    for (let x = 0; x < W; x++) { if (x + r < W) cnt += mask[o + x + r]; if (x - r - 1 >= 0) cnt -= mask[o + x - r - 1]; tmp[o + x] = cnt > 0 ? 1 : 0; } }
  for (let x = 0; x < W; x++) { let cnt = 0;
    for (let y = 0; y < Math.min(r, H); y++) cnt += tmp[y * W + x];
    for (let y = 0; y < H; y++) { if (y + r < H) cnt += tmp[(y + r) * W + x]; if (y - r - 1 >= 0) cnt -= tmp[(y - r - 1) * W + x]; out[y * W + x] = cnt > 0 ? 1 : 0; } }
  return out;
}
export function erode(mask, W, H, r) {
  const inv = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) inv[i] = mask[i] ? 0 : 1;
  const d = dilate(inv, W, H, r); for (let i = 0; i < W * H; i++) d[i] = d[i] ? 0 : 1; return d;
}

// Bounding box of non-transparent pixels in one or more canvases of the same size.
export function contentBox(...canvases) {
  const c0 = canvases.find(Boolean), W = c0.width, H = c0.height;
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (const c of canvases) { if (!c) continue; const d = c.getContext('2d').getImageData(0, 0, W, H).data;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 20) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
  return x1 < 0 ? { x: 0, y: 0, w: W, h: H } : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
