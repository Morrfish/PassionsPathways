// Sewing patterns: turns the 3D garment into flat pattern pieces, works out how much fabric
// to buy, what supplies are needed and the order to sew it in.
// All pattern measurements are in centimeters; y runs down the page.
import { ellipsePerimeter, measurementsFor, SIZE_CHARTS } from './body.js';
import { FABRIC_BY_ID } from './fabrics.js';

export const SEAM = 1.5, HEM = 3; // seam and hem allowance (cm)

// ---------- small geometry helpers ----------
const bez = (p0, p1, p2, p3, n = 14) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]; });
const quad = (p0, c, p1, n = 12) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]]; });
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Builds a closed outline out of runs of points, remembering what kind each edge is:
// 'seam' (sewn to another piece), 'hem', or 'fold' (placed on the fold of the fabric, no allowance).
class Outline {
  constructor() { this.pts = []; this.edges = []; }
  add(points, type) {
    for (const p of points) {
      const last = this.pts[this.pts.length - 1];
      if (last && Math.hypot(last[0] - p[0], last[1] - p[1]) < 1e-6) continue;
      if (this.pts.length) this.edges.push(type);
      this.pts.push([p[0], p[1]]);
    }
    return this;
  }
  close(type) { this.edges.push(type); return { pts: this.pts, edges: this.edges }; }
}

function area(pts) { let s = 0; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; }

// Outline grown outward by each edge's allowance (the cutting line).
export function addAllowance({ pts, edges }, seam = SEAM, hem = HEM) {
  const n = pts.length, sign = area(pts) > 0 ? 1 : -1, amt = (t) => t === 'fold' ? 0 : t === 'hem' ? hem : seam;
  const lines = pts.map((p, i) => {
    const q = pts[(i + 1) % n], dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1;
    const nx = sign * dy / L, ny = -sign * dx / L, d = amt(edges[i]);
    return { p: [p[0] + nx * d, p[1] + ny * d], q: [q[0] + nx * d, q[1] + ny * d], n: [nx, ny], d };
  });
  const out = [];
  for (let i = 0; i < n; i++) {
    const A = lines[(i - 1 + n) % n], B = lines[i], p = pts[i];
    const r = [A.q[0] - A.p[0], A.q[1] - A.p[1]], s = [B.q[0] - B.p[0], B.q[1] - B.p[1]], den = r[0] * s[1] - r[1] * s[0];
    let v;
    if (Math.abs(den) < 1e-9) v = B.p;
    else { const t = ((B.p[0] - A.p[0]) * s[1] - (B.p[1] - A.p[1]) * s[0]) / den; v = [A.p[0] + r[0] * t, A.p[1] + r[1] * t]; }
    const lim = 3 * Math.max(A.d, B.d, 0.01);
    if (Math.hypot(v[0] - p[0], v[1] - p[1]) > lim) { const k = lim / Math.hypot(v[0] - p[0], v[1] - p[1]); v = [p[0] + (v[0] - p[0]) * k, p[1] + (v[1] - p[1]) * k]; }
    out.push(v);
  }
  return out;
}
export function bbox(pts) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of pts) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}

// ---------- what the garment is and its measurements ----------
// pd: viewer.patternData, measure: viewer.measure (cm), opaque(x, y): drawing coverage (meters).
export function garmentFacts(pd, measure, body, opaque) {
  const spec = pd.spec, m = measurementsFor(body), cm = 100;
  const rows = pd.center.filter(pd.covered);
  const circ = (r) => ellipsePerimeter(r.a, r.b) * cm;
  const near = (y) => rows.reduce((b, r) => (!b || Math.abs(r.y - y) < Math.abs(b.y - y) ? r : b), null);
  const circAt = (y, fallback) => { const r = near(y); return r && Math.abs(r.y - y) < spec.H * 0.04 ? circ(r) : fallback; };
  const top = pd.top, bottom = pd.bottom;
  const hasBodice = !!top && top.y > spec.y.waist + 0.02;
  const kind = pd.trousers ? (hasBodice ? 'jumpsuit' : 'trousers')
    : pd.hemY !== null ? (hasBodice ? 'dress' : 'skirt')
      : hasBodice ? 'top' : 'skirt';
  // Shoulder straps: inner and outer edge of the drawing just below the shoulder line.
  let neckHalf = spec.half.neck * 1.9, shoulderHalf = spec.half.shoulder * 0.8;
  if (pd.shoulderCovered && opaque) {
    const y = spec.y.shoulder - 0.012; let inner = null, outer = null;
    for (let x = 0; x < spec.half.shoulder * 1.3; x += 0.003) { const o = opaque(x, y) || opaque(-x, y); if (o && inner === null) inner = x; if (o) outer = x; else if (inner !== null && x - outer > 0.01) break; }
    if (inner !== null) { neckHalf = Math.max(spec.half.neck * 1.05, inner); shoulderHalf = clamp(outer, neckHalf + 0.025, spec.half.shoulder * 1.05); }
  }
  // Top edge of a strapless bodice at the side.
  let sideTopY = spec.y.armpit - 0.02;
  if (!pd.shoulderCovered && opaque) for (let y = spec.y.armpit + 0.04; y > spec.y.waist; y -= 0.004) if (opaque(spec.half.bust * 0.9, y) || opaque(-spec.half.bust * 0.9, y)) { sideTopY = y; break; }
  const lower = rows.filter((r) => r.y <= spec.y.waist + 0.002);
  const F = {
    kind, size: body, body: m, hasBodice,
    shoulders: !!pd.shoulderCovered,
    bust: circAt(spec.y.bust, m.bust + 6), waist: circAt(spec.y.waist, m.waist + 3), hip: circAt(spec.y.hip, m.hip + 4),
    hem: bottom ? circ(bottom) : m.hip + 6,
    // Depths below the shoulder line (cm)
    neckDrop: (spec.y.neckBase - spec.y.shoulder) * cm,
    neckDepth: top ? Math.max((spec.y.neckBase - spec.y.shoulder) * cm * -1 + 1.5, (spec.y.shoulder - top.y) * cm) : 8,
    sideTop: (spec.y.shoulder - sideTopY) * cm,
    armhole: (spec.y.shoulder - spec.y.armpit) * cm + 2.5,
    bustDepth: (spec.y.shoulder - spec.y.bust) * cm,
    waistDepth: (spec.y.shoulder - spec.y.waist) * cm,
    hipDepth: (spec.y.shoulder - spec.y.hip) * cm,
    bottomDepth: bottom ? (spec.y.shoulder - bottom.y) * cm : (spec.y.shoulder - spec.y.hip) * cm,
    neckHalf: neckHalf * cm, shoulderHalf: shoulderHalf * cm,
    // Skirt: circumference down the length (from the waist) for gores.
    skirt: lower.map((r) => ({ y: (spec.y.waist - r.y) * cm, c: circ(r) })),
    crotchDepth: (spec.y.waist - spec.y.crotch) * cm + 2,
    inseam: measure?.inseam || null,
  };
  if (pd.sleeve) {
    const sr = pd.sleeve.rows.slice(0, pd.sleeve.last + 1);
    F.sleeve = { len: sr[sr.length - 1].d * cm, rows: sr.map((r) => ({ y: r.d * cm, c: ellipsePerimeter(r.a, r.b) * cm })) };
    F.bicep = Math.max(...F.sleeve.rows.filter((r) => r.y < 14).map((r) => r.c), m.bust * 0.3 + 4);
  }
  if (pd.leg) {
    const lr = pd.leg.rows.slice(0, pd.leg.last + 1).filter((r) => r.y < spec.y.crotch);
    const at = (y) => lr.reduce((b, r) => (!b || Math.abs(r.y - y) < Math.abs(b.y - y) ? r : b), null);
    const k = at(spec.y.knee), h = lr[lr.length - 1];
    F.knee = k ? ellipsePerimeter(k.a, k.b) * cm : m.hip * 0.42;
    F.legHem = h ? ellipsePerimeter(h.a, h.b) * cm : F.knee * 0.9;
    F.inseam = F.inseam || (h ? (spec.y.crotch - h.y) * cm : m.inseam);
  }
  F.fabrics = { ...pd.fabrics };
  return F;
}

// The same garment made for another size: keep the ease, change the body.
export function gradeFacts(F, toBody) {
  const a = F.body, b = measurementsFor(toBody), h = b.height / a.height;
  const G = structuredClone({ ...F, fabrics: null }); G.fabrics = F.fabrics; G.size = toBody; G.body = b;
  const dB = b.bust - a.bust, dW = b.waist - a.waist, dH = b.hip - a.hip;
  G.bust += dB; G.waist += dW; G.hip += dH; G.hem += dH;
  for (const k of ['neckDepth', 'sideTop', 'armhole', 'bustDepth', 'waistDepth', 'hipDepth', 'bottomDepth', 'crotchDepth', 'inseam', 'neckDrop']) if (G[k] != null) G[k] *= h;
  G.neckHalf *= 1 + (b.bust - a.bust) / a.bust * 0.5; G.shoulderHalf += (b.shoulder - a.shoulder) / 2;
  const hipAt = (F.hipDepth - F.waistDepth);
  G.skirt = F.skirt.map((r) => ({ y: r.y * h, c: r.c + (r.y < hipAt ? dW + (dH - dW) * (r.y / Math.max(1, hipAt)) : dH) }));
  if (F.sleeve) { G.sleeve.len *= h; G.sleeve.rows = F.sleeve.rows.map((r) => ({ y: r.y * h, c: r.c + dB * 0.25 })); G.bicep += dB * 0.25; }
  if (F.knee) { G.knee += dH * 0.35; G.legHem += dH * 0.25; }
  return G;
}

// ---------- drafting ----------
function bodicePiece(F, back) {
  const halfB = F.bust / 4 + (back ? 0.4 : -0.4), halfW = F.waist / 4 + (back ? 0.4 : -0.4);
  const intake = clamp(halfB - halfW - 1.5, 0, back ? 2.5 : 4);
  const extends_ = F.kind === 'top' && F.bottomDepth > F.waistDepth + 3;
  const Yw = F.waistDepth, Ya = Math.max(F.armhole, F.bustDepth - 4);
  const o = new Outline(), inner = [], notches = [];
  const nd = back ? Math.min(F.neckDepth, 2.5) : F.neckDepth;
  let topCF;
  if (F.shoulders) {
    const nx = F.neckHalf, sx = Math.max(F.shoulderHalf, nx + 2.5), drop = -F.neckDrop;
    topCF = [0, Math.max(nd, -drop + 1)];
    o.add(bez(topCF, [nx * 0.55, topCF[1]], [nx, (topCF[1] + -drop) * 0.45], [nx, -drop]), 'seam');
    o.add([[sx, 0]], 'seam');
    o.add(bez([sx, 0], [sx - 0.8, Ya * 0.5], [sx - 1.2 + (halfB - sx) * 0.15, Ya], [halfB, Ya]), 'seam');
    notches.push(bez([sx, 0], [sx - 0.8, Ya * 0.5], [sx - 1.2 + (halfB - sx) * 0.15, Ya], [halfB, Ya])[9]);
  } else {
    // Strapless: the top edge runs from the center front to the side.
    topCF = [0, Math.max(0, F.neckDepth)];
    const sideTop = Math.min(F.sideTop, Ya);
    o.add(quad(topCF, [halfB * 0.6, back ? sideTop : topCF[1] - 2], [halfB, sideTop]), 'seam');
  }
  const sideW = halfW + intake;
  if (extends_) {
    const halfHip = Math.max(F.hip / 4, sideW), halfHem = Math.max(F.hem / 4, halfW);
    o.add(quad([halfB, Ya], [halfB, (Ya + Yw) / 2], [sideW, Yw]), 'seam');
    o.add(quad([sideW, Yw], [halfHip, Yw + (F.hipDepth - Yw) * 0.4], [halfHip, F.hipDepth]), 'seam');
    o.add([[halfHem, F.bottomDepth]], 'seam');
    o.add([[0, F.bottomDepth]], 'hem');
    notches.push([sideW, Yw]);
  } else {
    o.add(quad([halfB, Ya], [halfB, (Ya + Yw) / 2], [sideW, Yw]), 'seam');
    o.add([[0, Yw + (back ? 0 : 1)]], 'seam');
  }
  const outline = o.add([topCF], back && F.kind !== 'top' ? 'seam' : 'fold').close(back && F.kind !== 'top' ? 'seam' : 'fold');
  if (intake > 0.4) {
    const x = halfB * (back ? 0.48 : 0.45), apex = F.bustDepth + (back ? -5 : 2);
    inner.push({ pts: [[x - intake / 2, Yw], [x, apex], [x + intake / 2, Yw]], kind: 'dart' });
    if (extends_) inner.push({ pts: [[x - intake / 2, Yw], [x, Yw + 12], [x + intake / 2, Yw]], kind: 'dart' });
  }
  notches.push([halfB, (Ya + Yw) / 2]);
  const onFold = !(back && F.kind !== 'top');
  return {
    id: back ? 'bodiceBack' : 'bodiceFront', name: (extends_ ? (back ? 'Back' : 'Front') : (back ? 'Bodice back' : 'Bodice front')),
    role: 'bodice', cut: onFold ? { count: 1, fold: true } : { count: 2, fold: false }, outline, inner, notches,
    grain: [[halfB * 0.55, Ya + 3], [halfB * 0.55, (extends_ ? F.bottomDepth : Yw) - 4]],
    note: back && !onFold ? 'Center back seam (zipper)' : '',
  };
}

function skirtGores(F) {
  const rows = F.skirt.filter((r) => r.y >= -0.5);
  if (rows.length < 2) return null;
  const maxC = Math.max(...rows.map((r) => r.c));
  let N = Math.max(4, Math.ceil(maxC / 34)); if (N % 2) N++; N = Math.min(N, 24);
  // Walk down the skirt: each side seam is as long as the skirt is down its middle.
  let s = 0, side = 0, prev = rows[0];
  const L = [{ x: prev.c / (2 * N), y: 0, s: 0 }];
  for (const r of rows.slice(1)) {
    const dy = r.y - prev.y, dr = (r.c - prev.c) / (2 * Math.PI), ds = Math.hypot(dy, dr); if (ds < 0.3) continue;
    s += ds; const w = r.c / (2 * N), dw = w - L[L.length - 1].x;
    side += Math.sqrt(Math.max(0, ds * ds - dw * dw));
    L.push({ x: w, y: side, s }); prev = r;
  }
  const len = s, hemSide = L[L.length - 1].y;
  const o = new Outline();
  o.add([[-L[0].x, 0], [L[0].x, 0]], 'seam');
  o.add(L.slice(1).map((p) => [p.x, p.y]), 'seam');
  o.add(quad([L[L.length - 1].x, hemSide], [0, len + (len - hemSide)], [-L[L.length - 1].x, hemSide]), 'hem');
  o.add(L.slice(1).reverse().map((p) => [-p.x, p.y]), 'seam');
  const outline = o.close('seam');
  const hipY = F.hipDepth - F.waistDepth;
  const hp = L.reduce((b, p) => (Math.abs(p.s - hipY) < Math.abs(b.s - hipY) ? p : b), L[0]);
  return {
    id: 'skirt', name: `Skirt panel (${N}-panel skirt)`, role: 'lower', cut: { count: N, fold: false }, outline, inner: [],
    notches: [[hp.x, hp.y], [-hp.x, hp.y]], grain: [[0, 4], [0, Math.max(8, len - 6)]], panels: N,
    note: 'Leave one seam open at the top for the zipper',
  };
}

function sleevePiece(F) {
  if (!F.sleeve || F.sleeve.len < 3) return null;
  const capH = clamp(F.armhole * 0.55, 7, 15), bw = Math.max(F.bicep, 20), L = Math.max(F.sleeve.len, capH + 2);
  const o = new Outline();
  const rows = F.sleeve.rows.filter((r) => r.y > capH + 0.5 && r.y <= L);
  o.add(bez([-bw / 2, capH], [-bw / 2 + bw * 0.18, capH * 0.55], [-bw * 0.2, 0], [0, 0]), 'seam');
  o.add(bez([0, 0], [bw * 0.2, 0], [bw / 2 - bw * 0.18, capH * 0.55], [bw / 2, capH]), 'seam');
  const side = rows.map((r) => [Math.max(r.c / 2, bw / 2 * 0.6), r.y]);
  if (!side.length || side[side.length - 1][1] < L - 0.5) side.push([Math.max((F.sleeve.rows[F.sleeve.rows.length - 1]?.c || bw) / 2, bw * 0.3), L]);
  o.add(side, 'seam');
  const end = side[side.length - 1];
  o.add([[-end[0], end[1]]], 'hem');
  o.add(side.slice(0, -1).reverse().map(([x, y]) => [-x, y]), 'seam');
  return { id: 'sleeve', name: 'Sleeve', role: 'sleeve', cut: { count: 2, fold: false }, outline: o.close('seam'), inner: [{ pts: [[-bw / 2, capH], [bw / 2, capH]], kind: 'guide' }], notches: [[0, 0]], grain: [[0, capH + 2], [0, L - 3]] };
}

function trouserPiece(F, back) {
  const W = F.waist, Hp = F.hip, CD = F.crotchDepth, I = F.inseam || 75, K = F.knee || Hp * 0.42, Hc = F.legHem || K * 0.9;
  const ext = back ? Hp / 8 : Hp / 16, hipY = CD * 0.62, width = Hp / 4 + (back ? 1 : -0.5);
  const c = (width - ext) / 2, kneeY = CD + I * 0.5 - 4, hemY = CD + I;
  const kh = K / 4 + (back ? 0.5 : -0.5), hh = Hc / 4 + (back ? 0.5 : -0.5);
  const waistW = W / 4 + (back ? 2.5 : -0.5);
  const top = back ? [2, -3] : [0.8, 0];
  const o = new Outline();
  o.add([top, [top[0] + waistW, back ? -1 : 0]], 'seam');
  o.add(quad([top[0] + waistW, back ? -1 : 0], [width, hipY * 0.35], [width, hipY]), 'seam');
  o.add(quad([width, hipY], [width, (hipY + kneeY) / 2], [c + kh, kneeY]), 'seam');
  o.add([[c + hh, hemY]], 'seam');
  o.add([[c - hh, hemY]], 'hem');
  o.add([[c - kh, kneeY]], 'seam');
  o.add(quad([c - kh, kneeY], [-ext * 0.6, CD + 8], [-ext, CD]), 'seam');
  o.add(quad([-ext, CD], [0, CD], [0, CD - ext * 1.3]), 'seam');
  o.add([top], 'seam');
  const inner = back ? [{ pts: [[top[0] + waistW * 0.5 - 1, -2], [top[0] + waistW * 0.5, 10], [top[0] + waistW * 0.5 + 1, -2]], kind: 'dart' }] : [];
  return { id: back ? 'trouserBack' : 'trouserFront', name: back ? 'Trouser back' : 'Trouser front', role: 'leg', cut: { count: 2, fold: false }, outline: o.close('seam'), inner, notches: [[width, hipY], [c + kh, kneeY], [c - kh, kneeY]], grain: [[c, hipY + 4], [c, hemY - 6]] };
}

function waistband(F) {
  const L = F.waist + 4, H = 8, o = new Outline();
  o.add([[0, 0], [L, 0], [L, H], [0, H]], 'seam');
  return { id: 'waistband', name: 'Waistband', role: 'band', cut: { count: 1, fold: false }, outline: o.close('seam'), inner: [{ pts: [[0, H / 2], [L, H / 2]], kind: 'fold' }], notches: [[2, 0], [L - 2, 0]], grain: [[L * 0.3, H / 2], [L * 0.7, H / 2]], horizontalGrain: true, note: 'Fuse interfacing; fold along the middle' };
}

// All the pattern pieces for a garment.
export function draft(F) {
  const P = [];
  if (F.hasBodice || F.kind === 'top') { P.push(bodicePiece(F, false), bodicePiece(F, true)); }
  if (F.kind === 'dress' || F.kind === 'skirt') { const g = skirtGores(F); if (g) P.push(g); }
  if (F.kind === 'trousers' || F.kind === 'jumpsuit') P.push(trouserPiece(F, false), trouserPiece(F, true));
  if ((F.kind === 'skirt' || F.kind === 'trousers')) P.push(waistband(F));
  const sl = sleevePiece(F); if (sl) P.push(sl);
  for (const p of P) { p.cutLine = addAllowance(p.outline); p.box = bbox(p.cutLine); }
  return P;
}

// ---------- fabric, yardage and layout ----------
const SHEER = new Set(['chiffon', 'organza', 'tulle', 'mesh', 'tissue', 'laceFloral', 'laceChantilly']);
const NAP = new Set(['velvet', 'corduroy', 'fur', 'suede', 'sequin', 'satin']);
export const FABRIC_PRICE = { cotton: 8, satin: 10, silk: 28, chiffon: 10, organza: 12, tulle: 5, mesh: 7, taffeta: 14, velvet: 18, lame: 16, laceFloral: 20, laceChantilly: 24, laceEyelet: 14, sequin: 22, glitter: 14, corduroy: 13, linen: 15, denim: 12, leather: 45, vinyl: 14, brocade: 20, tweed: 24, knit: 10, fur: 30, suede: 35, stripes: 10, plaid: 12, polka: 10, floral: 11, leopard: 12, houndstooth: 14, tissue: 9 };
export const fabricName = (id) => FABRIC_BY_ID[id]?.name || 'Cotton';

// Lay pieces on fabric folded in half lengthwise (selvages together). Returns length and placements.
export function layoutOn(pieces, widthCm) {
  const usable = widthCm - 3, half = usable / 2, items = [];
  let open = false;
  for (const p of pieces) {
    const w = p.box.w, h = p.box.h;
    if (w > half + 0.01 && !(p.cut.fold && w <= half + 0.01)) open = true;
    const copies = p.cut.fold ? 1 : Math.ceil(p.cut.count / 2);
    for (let i = 0; i < copies; i++) items.push({ p, w, h, fold: p.cut.fold });
  }
  const W = open ? usable : half;
  if (open) { items.length = 0; for (const p of pieces) for (let i = 0; i < (p.cut.fold ? 1 : p.cut.count); i++) items.push({ p, w: p.box.w * (p.cut.fold ? 2 : 1), h: p.box.h, fold: false, mirrored: p.cut.fold }); }
  items.sort((a, b) => (b.fold - a.fold) || (b.h - a.h));
  const shelves = [], placed = [];
  let y = 0;
  for (const it of items) {
    if (it.w > W) { placed.push({ ...it, x: 0, y, over: true }); y += it.h + 1; continue; }
    let shelf = it.fold ? null : shelves.find((s) => s.x + it.w <= W && it.h <= s.h);
    if (!shelf) { shelf = { y, h: it.h, x: 0 }; shelves.push(shelf); y += it.h + 1; }
    placed.push({ ...it, x: shelf.x, y: shelf.y }); shelf.x += it.w + 1;
  }
  return { length: y, width: W, open, placed };
}
export function yardage(pieces, fabricId, widthCm) {
  const L = layoutOn(pieces, widthCm), nap = NAP.has(fabricId) ? 1.1 : 1;
  const cm = L.length * nap + 10;
  return { cm, yards: Math.ceil(cm / 91.44 * 8) / 8, meters: Math.ceil(cm / 10) / 10, layout: L };
}

// Group the pieces by the fabric they are cut from.
export function fabricPlan(pieces, F) {
  const role = { bodice: F.fabrics.bodice, lower: F.fabrics.lower, sleeve: F.fabrics.sleeve || F.fabrics.bodice, leg: F.fabrics.leg || F.fabrics.lower, band: F.fabrics.lower || F.fabrics.leg };
  const groups = new Map();
  for (const p of pieces) {
    const f = role[p.role] || F.fabrics.bodice || F.fabrics.lower || 'cotton';
    if (!groups.has(f)) groups.set(f, []);
    groups.get(f).push(p);
  }
  return [...groups.entries()].map(([fabric, ps]) => ({
    fabric, name: fabricName(fabric), pieces: ps, sheer: SHEER.has(fabric), nap: NAP.has(fabric),
    w45: yardage(ps, fabric, 114.3), w60: yardage(ps, fabric, 152.4),
  }));
}

// ---------- supplies ----------
export const SUPPLY_PRICE = { zipper: 3, thread: 3, buttons: 0.75, interfacing: 4, boning: 1.5, lining: 8, hook: 1.5, bias: 3 };
export function supplies(F, plan, colors) {
  const out = [], inch = (c) => Math.round(c / 2.54);
  const zip = { dress: 56, jumpsuit: 56, skirt: 20, trousers: 18 }[F.kind];
  if (zip) out.push({ key: 'zipper', name: `Invisible zipper, ${zip} cm (${inch(zip)}")`, qty: 1 });
  if (F.kind === 'top' && F.sleeve && F.sleeve.len > 40 && F.bottomDepth > F.hipDepth - 2) out.push({ key: 'buttons', name: 'Buttons, 2 cm (3/4") for the front', qty: 5 });
  const spools = (colors.length || 1) * (F.hem > 220 ? 2 : 1);
  out.push({ key: 'thread', name: `All-purpose thread to match${colors.length ? ' (' + colors.join(', ') + ')' : ''}`, qty: spools });
  if (F.kind === 'skirt' || F.kind === 'trousers') out.push({ key: 'interfacing', name: 'Fusible interfacing for the waistband, 0.25 yd (25 cm)', qty: 0.25 });
  if (F.hasBodice && !F.shoulders) out.push({ key: 'boning', name: `Bodice boning, ${Math.round(F.waistDepth - F.sideTop + 2)} cm pieces`, qty: 8 });
  if (F.hasBodice && (F.kind === 'dress' || F.kind === 'jumpsuit')) out.push({ key: 'hook', name: 'Hook and eye (top of zipper)', qty: 1 });
  if (F.hasBodice && !F.sleeve && F.shoulders) out.push({ key: 'bias', name: 'Bias binding for neckline and armholes, 2.5 m', qty: 1 });
  for (const g of plan) if (g.sheer) out.push({ key: 'lining', name: `Lining under the ${g.name.toLowerCase()} (batiste or poly lining): ${g.w60.yards} yd`, qty: g.w60.yards });
  return out;
}

// ---------- sewing ----------
export const FABRIC_TIPS = {
  satin: 'Microtex needle 70/10, stitch 2.0 mm. Pin only inside the seam allowance. French seams look best.',
  silk: 'Microtex needle 60/8, stitch 1.8 mm. Put tissue paper under the seam if it puckers. French seams.',
  chiffon: 'Microtex needle 60/8, stitch 1.8 mm. Cut between tissue paper. French seams and a rolled hem.',
  organza: 'Microtex needle 60/8. French seams. Press with a cool iron.',
  tissue: 'Microtex needle 60/8, short stitch. French seams.',
  tulle: 'Universal 70/10, stitch 2.5 mm. Tulle does not fray, so hems can be left raw.',
  mesh: 'Ballpoint 75/11, narrow zigzag. Does not fray.',
  taffeta: 'Microtex 70/10. Pins leave holes: pin in the seam allowance. Press on low heat.',
  velvet: 'Universal 80/12 with a walking foot. Cut all pieces the same direction (nap). Press face down on a towel.',
  lame: 'Metallic needle 80/12. Press on low heat with a pressing cloth.',
  laceFloral: 'Universal 70/10. Place motifs on purpose and use lapped seams around them; line the lace.',
  laceChantilly: 'Universal 70/10. Use the scalloped edge as the hem; line the lace.',
  laceEyelet: 'Universal 80/12. Line if you want it opaque.',
  sequin: 'Heavy-duty 80/12 and a zipper foot. Remove sequins from the seam allowances first; hand-tack loose ones after.',
  glitter: 'Universal 80/12. Press from the back with a cloth.',
  corduroy: 'Universal 80/12, walking foot. Cut all pieces the same direction (nap).',
  linen: 'Universal 80/12, stitch 2.5 mm. Finish seams (it frays). Press with steam.',
  cotton: 'Universal 80/12, stitch 2.5 mm.',
  denim: 'Jeans needle 90/14–100/16, stitch 3 mm, topstitch thread for details.',
  leather: 'Leather needle 90/14, Teflon foot, stitch 3.5 mm. Use clips, not pins. No backstitching: tie off threads.',
  vinyl: 'Leather needle 90/14, Teflon foot. Clips, not pins.',
  suede: 'Leather needle 90/14. Cut the same direction (nap).',
  brocade: 'Universal 80/12. Finish seams; it frays.',
  tweed: 'Universal 90/14. Finish seams; it frays.',
  knit: 'Stretch needle 75/11. Narrow zigzag or serger so the seams can stretch.',
  fur: 'Universal 90/14. Cut from the back with a blade, not scissors. Push the fur away from the seams.',
};
export function sewingSteps(F, plan) {
  const s = [], has = (id) => plan.some((g) => g.pieces.some((p) => p.id === id));
  s.push('Wash and dry the fabric the way you will wash the finished garment.');
  s.push('Print the pattern at 100% size and check the test square. Tape the pages together by the page labels, then cut out the pieces you need.');
  s.push('Fold the fabric in half lengthwise (selvages together). Pin pieces with the grainline arrows parallel to the selvage; put "place on fold" edges right on the fold. Cut, and mark darts and notches.');
  if (F.hasBodice || F.kind === 'top') {
    s.push('Sew the darts and press them toward the center (front) or toward the side (back).');
    if (F.shoulders) s.push('Sew the shoulder seams, right sides together.');
    if (!F.shoulders) s.push('Strapless bodice: sew the lining the same way, add boning to the lining seams, then sew lining and bodice together along the top edge, turn and press.');
    s.push('Sew the side seams of the bodice.');
    if (has('sleeve')) s.push('Sew each sleeve seam. Run two rows of long stitches around the sleeve cap, pull them to ease the cap, and pin the sleeve into the armhole matching the top notch to the shoulder seam. Sew.');
    else if (F.shoulders) s.push('Finish the neckline and armholes with bias binding.');
    if (F.shoulders && has('sleeve')) s.push('Finish the neckline with bias binding or a facing.');
  }
  if (has('skirt')) {
    s.push('Sew the skirt panels together along the long edges, leaving the top of one seam open for the zipper.');
    if (F.kind === 'dress') s.push('Sew the skirt to the bodice at the waist, matching side seams.');
  }
  if (has('trouserFront')) {
    s.push('Sew the back darts. Sew the side seams and the inside leg seams of each leg.');
    s.push('Turn one leg right side out and put it inside the other; sew the crotch seam in one go, leaving the top of the center back open for the zipper.');
    if (F.kind === 'jumpsuit') s.push('Sew the trousers to the bodice at the waist.');
  }
  if (F.kind === 'dress' || F.kind === 'jumpsuit') s.push('Put in the zipper along the center back, then sew a hook and eye at the top.');
  if (F.kind === 'skirt' || F.kind === 'trousers') { s.push('Put in the zipper.'); s.push('Fuse interfacing to the waistband, sew it to the waist, fold it to the inside and stitch it down.'); }
  s.push('Try it on. Press the hem allowance up and sew the hem (by hand for fine fabrics).');
  s.push('Give everything a final press.');
  return s;
}

// Other sizes to print with the pattern (nested).
export function nearbySizes(body, count = 2) {
  const chart = SIZE_CHARTS[body.type], keys = Object.keys(chart.sizes), i = keys.indexOf(body.size);
  const out = [];
  for (let d = 1; d <= count; d++) { if (i - d >= 0) out.unshift(keys[i - d]); if (i + d < keys.length) out.push(keys[i + d]); }
  return out.map((size) => ({ ...body, size, custom: null }));
}
