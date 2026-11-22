// Fabric library. Each fabric is a small seamless tile made of four channels:
//   lum   - how light or dark the chosen color is at each pixel (1 = the color, >1 toward white)
//   alpha - how see-through it is (lace, tulle, chiffon)
//   rough - how matte (1) or shiny (0) it is in 3D
//   metal - how metallic it is in 3D (lame, sequins, glitter)
// Tiles are colorized with the user's color and cached.

export const TILE = 128;

// Small seeded random generator so every tile looks the same each time.
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// Seamless value noise on a grid of `cells` cells.
function noiseField(cells, seed) {
  const r = rng(seed), g = new Float32Array(cells * cells);
  for (let i = 0; i < g.length; i++) g[i] = r();
  const out = new Float32Array(TILE * TILE), step = TILE / cells;
  const sm = (t) => t * t * (3 - 2 * t);
  for (let y = 0; y < TILE; y++) for (let x = 0; x < TILE; x++) {
    const gx = x / step, gy = y / step, x0 = Math.floor(gx), y0 = Math.floor(gy);
    const fx = sm(gx - x0), fy = sm(gy - y0), x1 = (x0 + 1) % cells, y1 = (y0 + 1) % cells;
    const a = g[y0 * cells + x0], b = g[y0 * cells + x1], c = g[y1 * cells + x0], d = g[y1 * cells + x1];
    out[y * TILE + x] = (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
  }
  return out;
}
function fbm(seed, octaves = [4, 8, 16, 32], weights = [0.5, 0.25, 0.15, 0.1]) {
  const out = new Float32Array(TILE * TILE);
  octaves.forEach((c, i) => { const n = noiseField(c, seed + i * 101); for (let k = 0; k < out.length; k++) out[k] += n[k] * weights[i]; });
  return out;
}
const TAU = Math.PI * 2;
// Wrapped distance inside the tile, for seamless spots and circles.
const wd = (a, b) => { const d = Math.abs(a - b) % TILE; return Math.min(d, TILE - d); };

function make(fn) {
  const lum = new Float32Array(TILE * TILE).fill(1), alpha = new Float32Array(TILE * TILE).fill(1);
  const rough = new Float32Array(TILE * TILE).fill(0.8), metal = new Float32Array(TILE * TILE).fill(0);
  fn({ lum, alpha, rough, metal });
  return { lum, alpha, rough, metal };
}
const each = (cb) => { for (let y = 0; y < TILE; y++) for (let x = 0; x < TILE; x++) cb(x, y, y * TILE + x); };

// Spots placed on a jittered grid (sequins, polka dots, leopard, lace flowers).
function spots(count, seed, jitter = 0.5, stagger = true) {
  const r = rng(seed), pts = [], step = TILE / count;
  for (let j = 0; j < count; j++) for (let i = 0; i < count; i++) {
    const off = stagger && j % 2 ? step / 2 : 0;
    pts.push({ x: (i * step + off + (r() - 0.5) * step * jitter + TILE) % TILE, y: (j * step + (r() - 0.5) * step * jitter + TILE) % TILE, r: r() });
  }
  return pts;
}
function nearest(pts, x, y) {
  let best = 1e9, second = 1e9, p = null;
  for (const q of pts) { const dx = wd(x, q.x), dy = wd(y, q.y), d = Math.sqrt(dx * dx + dy * dy); if (d < best) { second = best; best = d; p = q; } else if (d < second) second = d; }
  return { d: best, d2: second, p };
}

const GEN = {
  cotton: () => make(({ lum, rough }) => { const n = fbm(11); each((x, y, i) => { lum[i] = 0.94 + n[i] * 0.08; rough[i] = 0.9; }); }),
  satin: () => make(({ lum, rough }) => { const n = fbm(12, [2, 4], [0.7, 0.3]); each((x, y, i) => { const s = Math.sin(TAU * (x + y) / TILE + n[i] * 2.5); lum[i] = 0.985 + 0.012 * s * s; rough[i] = 0.36; }); }),
  silk: () => make(({ lum, rough }) => { const n = fbm(13, [2, 4, 8], [0.6, 0.3, 0.1]); each((x, y, i) => { lum[i] = 0.95 + 0.06 * Math.sin(TAU * (x / TILE + n[i] * 0.8)); rough[i] = 0.38; }); }),
  linen: () => make(({ lum, rough }) => { const n = fbm(14, [16, 32, 64], [0.5, 0.3, 0.2]), slub = noiseField(8, 5); each((x, y, i) => { const w = Math.sin(TAU * x * 24 / TILE) * 0.5 + Math.sin(TAU * y * 24 / TILE) * 0.5; lum[i] = 0.86 + 0.06 * w + 0.1 * n[i] - 0.05 * slub[i]; rough[i] = 0.95; }); }),
  denim: () => make(({ lum, rough }) => { const n = fbm(15, [16, 32, 64], [0.4, 0.3, 0.3]), r = rng(77); each((x, y, i) => { const tw = ((x + y) % 6) < 3 ? 1 : 0; lum[i] = 0.74 + 0.14 * tw + 0.12 * n[i] + (r() < 0.03 ? 0.18 : 0); rough[i] = 0.95; }); }),
  corduroy: () => make(({ lum, rough }) => { const n = fbm(16, [8, 16], [0.6, 0.4]); each((x, y, i) => { const rib = Math.pow(Math.abs(Math.sin(Math.PI * x * 10 / TILE)), 0.6); lum[i] = 0.55 + 0.45 * rib + 0.06 * n[i]; rough[i] = 0.85; }); }),
  velvet: () => make(({ lum, rough }) => { const n = fbm(17, [2, 4, 8], [0.5, 0.3, 0.2]), f = fbm(18, [32, 64], [0.5, 0.5]); each((x, y, i) => { lum[i] = 0.9 + 0.08 * n[i] + 0.04 * f[i]; rough[i] = 0.62; }); }),
  taffeta: () => make(({ lum, rough, metal }) => { const n = fbm(19, [2, 4], [0.6, 0.4]); each((x, y, i) => { const c = Math.sin(TAU * x * 32 / TILE) * Math.sin(TAU * y * 32 / TILE); lum[i] = 0.9 + 0.05 * c + 0.18 * (n[i] - 0.5); rough[i] = 0.35; metal[i] = 0.15; }); }),
  lame: () => make(({ lum, rough, metal }) => { const n = fbm(20, [4, 8, 16, 32], [0.3, 0.3, 0.25, 0.15]); each((x, y, i) => { const v = Math.abs(n[i] - 0.5) * 2; lum[i] = 0.75 + 0.55 * (1 - v); rough[i] = 0.25 + 0.2 * v; metal[i] = 0.9; }); }),
  leather: () => make(({ lum, rough }) => { const pts = spots(14, 21, 0.9, false), n = fbm(22, [8, 16], [0.6, 0.4]); each((x, y, i) => { const { d, d2 } = nearest(pts, x, y); const crease = Math.min(1, (d2 - d) / 2.5); lum[i] = 0.78 + 0.16 * crease + 0.08 * n[i]; rough[i] = 0.5 + 0.2 * (1 - crease); }); }),
  sequin: () => make(({ lum, rough, metal }) => { const pts = spots(10, 23, 0.05); each((x, y, i) => { const { d, p } = nearest(pts, x, y); const R = TILE / 10 * 0.55; if (d < R) { const t = d / R; lum[i] = 0.85 + 0.5 * p.r * (1 - t) - 0.15 * t * t; rough[i] = 0.08 + 0.15 * p.r; metal[i] = 0.85; } else { lum[i] = 0.55; rough[i] = 0.6; metal[i] = 0.3; } }); }),
  glitter: () => make(({ lum, rough, metal }) => { const r = rng(24), n = fbm(25, [16, 32], [0.5, 0.5]); each((x, y, i) => { const s = r(); lum[i] = s > 0.93 ? 1.45 : s > 0.8 ? 1.15 : 0.82 + 0.1 * n[i]; rough[i] = s > 0.8 ? 0.05 : 0.4; metal[i] = 0.8; }); }),
  tissue: () => make(({ lum, alpha, rough }) => { const n = fbm(26, [8, 16, 32], [0.4, 0.3, 0.3]); each((x, y, i) => { lum[i] = 1.02 + 0.06 * n[i]; alpha[i] = 0.5 + 0.1 * n[i]; rough[i] = 0.7; }); }),
  chiffon: () => make(({ lum, alpha, rough }) => { const n = fbm(27, [4, 8], [0.6, 0.4]); each((x, y, i) => { lum[i] = 1 + 0.06 * n[i]; alpha[i] = 0.42 + 0.12 * n[i]; rough[i] = 0.6; }); }),
  organza: () => make(({ lum, alpha, rough, metal }) => { const n = fbm(28, [2, 4, 8], [0.5, 0.3, 0.2]); each((x, y, i) => { const c = Math.sin(TAU * x * 40 / TILE) * Math.sin(TAU * y * 40 / TILE); lum[i] = 1.05 + 0.1 * n[i] + 0.03 * c; alpha[i] = 0.45 + 0.15 * n[i]; rough[i] = 0.3; metal[i] = 0.2; }); }),
  tulle: () => make(({ lum, alpha, rough }) => { each((x, y, i) => { const gx = (x % 8) - 4, gy = ((y + (Math.floor(x / 8) % 2) * 4) % 8) - 4; const hole = Math.sqrt(gx * gx + gy * gy) < 2.6; lum[i] = 1; alpha[i] = hole ? 0.12 : 0.85; rough[i] = 0.7; }); }),
  mesh: () => make(({ lum, alpha, rough }) => { each((x, y, i) => { const hole = (x % 10) > 2 && (y % 10) > 2; lum[i] = 0.95; alpha[i] = hole ? 0.08 : 1; rough[i] = 0.6; }); }),
  laceFloral: () => make(({ lum, alpha, rough }) => {
    const flowers = spots(3, 29, 0.3), r = rng(30);
    each((x, y, i) => {
      const gx = (x % 6) - 3, gy = ((y + (Math.floor(x / 6) % 2) * 3) % 6) - 3, net = Math.sqrt(gx * gx + gy * gy) < 1.9 ? 0.1 : 0.8;
      let a = net, l = 1;
      for (const f of flowers) { const dx = ((x - f.x + TILE * 1.5) % TILE) - TILE / 2, dy = ((y - f.y + TILE * 1.5) % TILE) - TILE / 2; const d = Math.sqrt(dx * dx + dy * dy), ang = Math.atan2(dy, dx); const petal = 12 + 6 * Math.cos(ang * 6 + f.r * 6); if (d < petal) { a = d < 4 ? 1 : (d > petal - 2 ? 1 : 0.92); l = d < 4 ? 0.85 : 1 - 0.1 * (d / petal); } }
      lum[i] = l + (r() - 0.5) * 0.04; alpha[i] = a; rough[i] = 0.75;
    });
  }),
  laceChantilly: () => make(({ lum, alpha, rough }) => {
    each((x, y, i) => {
      const gx = (x % 5) - 2.5, gy = (y % 5) - 2.5, net = Math.sqrt(gx * gx + gy * gy) < 1.6 ? 0.08 : 0.7;
      const cx = (x % 32) - 16, cy = (y % 32) - 16, d = Math.sqrt(cx * cx + cy * cy);
      const ring = Math.abs(d - 11) < 1.6 || Math.abs(d - 6) < 1.2, scroll = Math.abs(Math.sin((x + y) * TAU / 64) * 10 - ((x - y + TILE) % 32 - 16)) < 1.4;
      alpha[i] = ring || scroll ? 1 : net; lum[i] = ring ? 0.88 : 1; rough[i] = 0.75;
    });
  }),
  laceEyelet: () => make(({ lum, alpha, rough }) => {
    const holes = spots(6, 31, 0.0);
    each((x, y, i) => { const { d } = nearest(holes, x, y); const R = 5.5; alpha[i] = d < R ? 0.05 : 1; lum[i] = d < R + 2 && d >= R ? 0.85 : 0.98; rough[i] = 0.85; });
  }),
  tweed: () => make(({ lum, rough }) => { const r = rng(32), n = fbm(33, [16, 32, 64], [0.4, 0.3, 0.3]); each((x, y, i) => { const w = ((Math.floor(x / 3) + Math.floor(y / 3)) % 2) ? 0.08 : -0.08; const s = r(); lum[i] = 0.78 + w + 0.15 * n[i] + (s < 0.05 ? 0.5 : s > 0.96 ? -0.4 : 0); rough[i] = 1; }); }),
  knit: () => make(({ lum, rough }) => { each((x, y, i) => { const cx = x % 8, cy = y % 10; const v = Math.abs((cx < 4 ? cx : 7 - cx) - (cy * 0.4)) ; lum[i] = 0.7 + 0.3 * Math.max(0, 1 - v / 3) + (cx === 0 || cx === 7 ? -0.15 : 0); rough[i] = 0.95; }); }),
  fur: () => make(({ lum, rough }) => { const n = noiseField(32, 34), m = fbm(35, [4, 8], [0.6, 0.4]); each((x, y, i) => { const s = n[(y % TILE) * TILE + ((x + Math.floor(y / 4)) % TILE)]; lum[i] = 0.7 + 0.45 * s + 0.1 * m[i]; rough[i] = 1; }); }),
  suede: () => make(({ lum, rough }) => { const n = fbm(36, [16, 32, 64], [0.3, 0.3, 0.4]); each((x, y, i) => { lum[i] = 0.85 + 0.12 * n[i]; rough[i] = 1; }); }),
  vinyl: () => make(({ lum, rough, metal }) => { const n = fbm(37, [2, 4], [0.6, 0.4]); each((x, y, i) => { lum[i] = 0.95 + 0.15 * n[i]; rough[i] = 0.08; metal[i] = 0.1; }); }),
  brocade: () => make(({ lum, rough, metal }) => {
    each((x, y, i) => {
      const u = ((x % 64) - 32) / 32, v = ((y % 64) - 32) / 32, ax = Math.abs(u);
      const motif = Math.abs(Math.sin(ax * 5 + v * 3) * Math.cos(v * 4 - ax * 2)) > 0.55 && ax * ax + v * v < 0.9;
      lum[i] = motif ? 1.25 : 0.82; metal[i] = motif ? 0.7 : 0.1; rough[i] = motif ? 0.3 : 0.7;
    });
  }),
  stripes: () => make(({ lum, rough }) => { each((x, y, i) => { lum[i] = (x % 32) < 16 ? 1 : 1.5; rough[i] = 0.85; }); }),
  plaid: () => make(({ lum, rough }) => { each((x, y, i) => { const a = (x % 64) < 20 ? 0.6 : (x % 64) < 24 ? 1.5 : 1, b = (y % 64) < 20 ? 0.6 : (y % 64) < 24 ? 1.5 : 1; lum[i] = Math.min(1.5, (a + b) / 2 + (((x + y) % 4) < 2 ? 0.04 : -0.04)); rough[i] = 0.95; }); }),
  polka: () => make(({ lum, rough }) => { const pts = spots(4, 38, 0); each((x, y, i) => { lum[i] = nearest(pts, x, y).d < 7 ? 1.5 : 1; rough[i] = 0.85; }); }),
  floral: () => make(({ lum, rough }) => {
    const pts = spots(4, 39, 0.6);
    each((x, y, i) => { const { d, p } = nearest(pts, x, y); let l = 1; const q = pts.find((s) => s === p); const dx = ((x - q.x + TILE * 1.5) % TILE) - TILE / 2, dy = ((y - q.y + TILE * 1.5) % TILE) - TILE / 2; const ang = Math.atan2(dy, dx), pr = 9 + 4 * Math.cos(ang * 5 + p.r * 5); if (d < 3) l = 0.6; else if (d < pr) l = 1.45; else if (d < pr + 5 && Math.abs(Math.sin(ang * 2 + p.r * 9)) > 0.92) l = 0.75; lum[i] = l; rough[i] = 0.85; });
  }),
  leopard: () => make(({ lum, rough }) => { const pts = spots(6, 40, 0.8), n = fbm(41, [8, 16], [0.5, 0.5]); each((x, y, i) => { const { d, p } = nearest(pts, x, y); const R = 5 + 3 * p.r + 2 * n[i]; lum[i] = d < R * 0.6 ? 0.85 : d < R ? 0.25 : 1.15; rough[i] = 0.9; }); }),
  houndstooth: () => make(({ lum, rough }) => { each((x, y, i) => { const cx = x % 16, cy = y % 16; const a = (cx < 8) === (cy < 8); const tooth = (cx - cy + 16) % 16 < 4 && cx >= 8 && cy < 8; lum[i] = a || tooth ? 0.45 : 1.45; rough[i] = 0.95; }); }),
};

export const FABRICS = [
  // Her list
  { id: 'cotton', name: 'Cotton (solid)', group: 'Basics' },
  { id: 'satin', name: 'Satin', group: 'Her picks' },
  { id: 'laceFloral', name: 'Lace: floral', group: 'Her picks' },
  { id: 'laceChantilly', name: 'Lace: Chantilly', group: 'Her picks' },
  { id: 'laceEyelet', name: 'Lace: eyelet', group: 'Her picks' },
  { id: 'sequin', name: 'Sequin', group: 'Her picks' },
  { id: 'glitter', name: 'Glitter', group: 'Her picks' },
  { id: 'corduroy', name: 'Corduroy', group: 'Her picks' },
  { id: 'linen', name: 'Linen', group: 'Her picks' },
  { id: 'silk', name: 'Silk', group: 'Her picks' },
  { id: 'tissue', name: 'Tissue', group: 'Her picks' },
  { id: 'velvet', name: 'Velvet', group: 'Her picks' },
  { id: 'taffeta', name: 'Taffeta', group: 'Her picks' },
  { id: 'lame', name: 'Lamé', group: 'Her picks' },
  { id: 'leather', name: 'Leather', group: 'Her picks' },
  { id: 'denim', name: 'Denim', group: 'Her picks' },
  // More
  { id: 'chiffon', name: 'Chiffon', group: 'Sheer' },
  { id: 'organza', name: 'Organza', group: 'Sheer' },
  { id: 'tulle', name: 'Tulle', group: 'Sheer' },
  { id: 'mesh', name: 'Mesh', group: 'Sheer' },
  { id: 'knit', name: 'Knit', group: 'Textured' },
  { id: 'tweed', name: 'Tweed', group: 'Textured' },
  { id: 'brocade', name: 'Brocade', group: 'Textured' },
  { id: 'suede', name: 'Suede', group: 'Textured' },
  { id: 'fur', name: 'Faux fur', group: 'Textured' },
  { id: 'vinyl', name: 'Vinyl', group: 'Textured' },
  { id: 'stripes', name: 'Stripes', group: 'Prints' },
  { id: 'plaid', name: 'Plaid', group: 'Prints' },
  { id: 'polka', name: 'Polka dot', group: 'Prints' },
  { id: 'floral', name: 'Floral print', group: 'Prints' },
  { id: 'leopard', name: 'Leopard', group: 'Prints' },
  { id: 'houndstooth', name: 'Houndstooth', group: 'Prints' },
];
export const FABRIC_BY_ID = Object.fromEntries(FABRICS.map((f) => [f.id, f]));

const rawCache = new Map();
function raw(id) { if (!rawCache.has(id)) rawCache.set(id, (GEN[id] || GEN.cotton)()); return rawCache.get(id); }

export function hexToRgb(hex) {
  const h = hex.replace('#', ''); const v = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}
export function rgbToHex(r, g, b) { return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join(''); }

// Colored tile (RGBA) and material tile (G = roughness, B = metalness) for a fabric + color.
const tileCache = new Map();
export function fabricTiles(id, hex) {
  const key = id + hex;
  if (tileCache.has(key)) return tileCache.get(key);
  const t = raw(id), [r, g, b] = hexToRgb(hex);
  const color = new Uint8ClampedArray(TILE * TILE * 4), mat = new Uint8ClampedArray(TILE * TILE * 4);
  for (let i = 0; i < TILE * TILE; i++) {
    const l = t.lum[i], o = i * 4;
    if (l <= 1) { color[o] = r * l; color[o + 1] = g * l; color[o + 2] = b * l; }
    else { const k = Math.min(1, (l - 1) / 0.5); color[o] = r + (255 - r) * k; color[o + 1] = g + (255 - g) * k; color[o + 2] = b + (255 - b) * k; }
    color[o + 3] = t.alpha[i] * 255;
    mat[o] = 0; mat[o + 1] = t.rough[i] * 255; mat[o + 2] = t.metal[i] * 255; mat[o + 3] = 255;
  }
  const out = { color, mat };
  if (tileCache.size > 200) tileCache.clear();
  tileCache.set(key, out);
  return out;
}

// A canvas pattern (for brush strokes) and a swatch image (for the library grid).
export function tileCanvas(id, hex, which = 'color') {
  const c = document.createElement('canvas'); c.width = c.height = TILE;
  const t = fabricTiles(id, hex), img = new ImageData(new Uint8ClampedArray(which === 'color' ? t.color : t.mat), TILE, TILE);
  c.getContext('2d').putImageData(img, 0, 0);
  return c;
}
export function swatchURL(id, hex) {
  const c = document.createElement('canvas'); c.width = c.height = 64; const ctx = c.getContext('2d');
  // Checkerboard shows see-through fabrics.
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { ctx.fillStyle = (x + y) % 2 ? '#d9d4ce' : '#f4f1ed'; ctx.fillRect(x * 8, y * 8, 8, 8); }
  ctx.drawImage(tileCanvas(id, hex), 0, 0, TILE, TILE, 0, 0, 96, 96);
  return c.toDataURL();
}

export const PALETTES = [
  { name: 'Atelier (from the logo)', colors: ['#b07a74', '#9e6a64', '#8a5552', '#d8aaa4', '#efe6d8', '#bda274', '#e3cfa8', '#141015'] },
  { name: 'Pastels', colors: ['#f8c8d4', '#fbd9b5', '#fff1b0', '#c9ebc4', '#bfe0f2', '#d6c8f0', '#f3d1e8', '#e8e3d9'] },
  { name: 'Jewel tones', colors: ['#7a1236', '#0f5e4f', '#1d3a8a', '#5a1d7a', '#b8860b', '#a31621', '#0b6e99', '#2e1a47'] },
  { name: 'Brights', colors: ['#ff2e63', '#ff8a00', '#ffd400', '#2ecc71', '#00b4ff', '#7b2ff7', '#ff4fd8', '#00e0c6'] },
  { name: 'Neutrals', colors: ['#ffffff', '#f2ede4', '#d8cbb8', '#a89a87', '#6e6259', '#3b3533', '#1a1a1a', '#c0c0c0'] },
  { name: 'Earth', colors: ['#8a5a44', '#c47f4f', '#d9a86c', '#6b705c', '#a5a58d', '#b5838d', '#6d4c3d', '#3f4238'] },
  { name: 'Metallics', colors: ['#d4af37', '#c0c0c0', '#b87333', '#e5c1a8', '#8c8c8c', '#f1e5ac', '#aa7c39', '#2f2f35'] },
];

// How each fabric hangs and moves in 3D.
//   hang  - how far the hem falls in toward the body (1 = holds its shape, 0.7 = falls in a lot)
//   bend  - stiffness against folding (0 = liquid, 1 = stiff)
//   folds - how many folds form around a skirt
//   drag  - air resistance (light fabrics float and settle slowly)
//   weight- how strongly gravity pulls it
const D = (hang, bend, folds, drag, weight) => ({ hang, bend, folds, drag, weight });
export const DRAPE = {
  cotton: D(0.84, 0.3, 10, 0.03, 1), satin: D(0.78, 0.14, 12, 0.025, 1.05), silk: D(0.74, 0.07, 14, 0.035, 0.9),
  chiffon: D(0.7, 0.03, 16, 0.06, 0.7), tissue: D(0.72, 0.04, 16, 0.06, 0.7), organza: D(0.92, 0.5, 8, 0.05, 0.75),
  tulle: D(0.9, 0.42, 9, 0.06, 0.7), mesh: D(0.82, 0.2, 10, 0.04, 0.85), taffeta: D(0.92, 0.55, 8, 0.03, 0.95),
  velvet: D(0.77, 0.2, 10, 0.02, 1.25), lame: D(0.8, 0.25, 11, 0.025, 1.05), laceFloral: D(0.8, 0.2, 11, 0.04, 0.9),
  laceChantilly: D(0.79, 0.15, 12, 0.045, 0.85), laceEyelet: D(0.84, 0.32, 10, 0.03, 1), sequin: D(0.8, 0.28, 9, 0.02, 1.35),
  glitter: D(0.83, 0.3, 10, 0.025, 1.1), corduroy: D(0.86, 0.5, 7, 0.02, 1.2), linen: D(0.85, 0.36, 9, 0.03, 1),
  denim: D(0.9, 0.7, 6, 0.02, 1.3), leather: D(0.9, 0.8, 5, 0.02, 1.4), vinyl: D(0.9, 0.7, 6, 0.02, 1.3),
  brocade: D(0.9, 0.62, 7, 0.02, 1.2), tweed: D(0.88, 0.6, 7, 0.02, 1.25), knit: D(0.76, 0.14, 10, 0.025, 1.15),
  fur: D(0.92, 0.75, 6, 0.02, 1.3), suede: D(0.86, 0.5, 7, 0.02, 1.25),
};
export function drapeFor(id) { return DRAPE[id] || DRAPE.cotton; }
