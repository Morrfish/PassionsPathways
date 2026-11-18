// Sketch constraints: rules like "horizontal" or "tangent" and driving sizes
// ("this line is 40 long"). A small least-squares solver nudges the plain-number
// coordinates until every rule holds, moving things as little as possible.
import { evaluate } from './expr.js';
import { arcFrom3 } from './sketch.js';

export const CONS_INFO = {
  coincident: { label: 'Coincident', glyph: '●', need: 'points', help: 'Click two points to join them.' },
  horizontal: { label: 'Horizontal', glyph: 'H', need: 'line', help: 'Click a line to make it level (or two points to line them up side to side).' },
  vertical: { label: 'Vertical', glyph: 'V', need: 'line', help: 'Click a line to make it straight up and down (or two points to stack them).' },
  parallel: { label: 'Parallel', glyph: '∥', need: '2lines', help: 'Click two lines to make them point the same way.' },
  perpendicular: { label: 'Perpendicular', glyph: '⊥', need: '2lines', help: 'Click two lines to make them meet at 90°.' },
  equal: { label: 'Equal', glyph: '=', need: '2same', help: 'Click two lines (same length) or two circles/arcs (same size).' },
  tangent: { label: 'Tangent', glyph: 'T', need: 'tangent', help: 'Click a line and a circle/arc (or two circles/arcs) to make them touch smoothly.' },
  concentric: { label: 'Concentric', glyph: '◎', need: '2round', help: 'Click two circles/arcs to give them the same center.' },
  fix: { label: 'Fix', glyph: '🔒', need: 'point', help: 'Click a point to pin it where it is.' },
  midpoint: { label: 'Midpoint', glyph: '⋈', need: 'pointLine', help: 'Click a point, then a line: the point moves to the middle of the line.' },
  length: { label: 'Length', dim: true },
  radius: { label: 'Radius', dim: true },
  distance: { label: 'Distance', dim: true },
};

// Entity field names that hold coordinates (only plain numbers among these can move).
const FIELDS = {
  line: ['x1', 'y1', 'x2', 'y2'], arc: ['x1', 'y1', 'x2', 'y2', 'xm', 'ym'], circle: ['cx', 'cy', 'r'],
  polygon: ['cx', 'cy', 'r', 'rot'], slot: ['x1', 'y1', 'x2', 'y2', 'w'], point: ['x', 'y'],
};
export const isFreeNum = (v) => typeof v === 'number';

// Point of an entity from current numbers `g` (an object of evaluated fields).
export function pointOf(type, g, k) {
  if (k === 'p1') return [g.x1, g.y1];
  if (k === 'p2') return [g.x2, g.y2];
  if (k === 'pm') return [g.xm, g.ym];
  if (k === 'c') {
    if (type === 'arc') { const a = arcFrom3([g.x1, g.y1], [g.x2, g.y2], [g.xm, g.ym]); return a ? a.c : [g.xm, g.ym]; }
    if (type === 'slot') return [(g.x1 + g.x2) / 2, (g.y1 + g.y2) / 2];
    if (type === 'point') return [g.x, g.y];
    return [g.cx, g.cy];
  }
  return null;
}
export function radiusOf(type, g) {
  if (type === 'circle') return g.r;
  if (type === 'arc') { const a = arcFrom3([g.x1, g.y1], [g.x2, g.y2], [g.xm, g.ym]); return a ? a.r : 0; }
  return 0;
}
export function pointKeys(type) {
  return { line: ['p1', 'p2'], arc: ['p1', 'p2', 'c'], circle: ['c'], polygon: ['c'], slot: ['p1', 'p2'], point: ['c'] }[type] || [];
}
// Which fields a point is made of (for fixing / dragging).
export function pointFields(type, k) {
  if (k === 'p1') return ['x1', 'y1'];
  if (k === 'p2') return ['x2', 'y2'];
  if (k === 'pm') return ['xm', 'ym'];
  if (type === 'point') return ['x', 'y'];
  if (k === 'c' && (type === 'circle' || type === 'polygon')) return ['cx', 'cy'];
  return null;
}

// Solve. Returns {entities (new objects, solved numbers), ok, bad: [constraint ids], moved}
// opts.pull: [{id, k, to:[x,y]}] gently drags a point toward a spot (for mouse dragging).
export function solveSketch(entities, constraints, P, opts = {}) {
  const cons = (constraints || []).filter((c) => !c.off);
  const pulls = opts.pull || [];
  if (!cons.length && !pulls.length) return { entities, ok: true, bad: [] };
  const byId = new Map(entities.map((e) => [e.id, e]));
  // Every numeric field of the entities involved is a variable; formulas stay fixed.
  const involved = new Set();
  for (const c of cons) for (const r of c.refs) involved.add(r.e);
  for (const p of pulls) involved.add(p.id);
  const vars = [];
  const base = new Map(); // id -> evaluated field values
  for (const e of entities) {
    const g = {};
    for (const k of FIELDS[e.type] || []) {
      try { g[k] = evaluate(e[k], P); } catch { g[k] = 0; }
      if (involved.has(e.id) && isFreeNum(e[k]) && !(e.type === 'polygon' && k === 'rot')) vars.push({ id: e.id, k });
    }
    base.set(e.id, g);
  }
  const x0 = vars.map((v) => base.get(v.id)[v.k]);
  const cur = (x) => {
    const m = new Map();
    for (const [id, g] of base) m.set(id, { ...g });
    vars.forEach((v, i) => { m.get(v.id)[v.k] = x[i]; });
    return m;
  };
  const resid = (x, onlyCons) => {
    const m = cur(x);
    const out = [];
    const tag = [];
    const pt = (r) => pointOf(byId.get(r.e).type, m.get(r.e), r.k);
    const dir = (id) => { const g = m.get(id); const dx = g.x2 - g.x1, dy = g.y2 - g.y1; const L = Math.hypot(dx, dy) || 1e-9; return [dx / L, dy / L, L]; };
    for (const c of cons) {
      const [a, b] = c.refs;
      const ea = byId.get(a.e), eb = b && byId.get(b.e);
      if (!ea || (b && !eb)) continue;
      const push = (v) => { out.push(v); tag.push(c.id); };
      let val = 0;
      try { if (c.value != null) val = evaluate(c.value, P); } catch { val = 0; }
      switch (c.type) {
        case 'coincident': { const p = pt(a), q = pt(b); push(p[0] - q[0]); push(p[1] - q[1]); break; }
        case 'horizontal':
          if (b) push(pt(a)[1] - pt(b)[1]); else { const g = m.get(a.e); push(g.y2 - g.y1); }
          break;
        case 'vertical':
          if (b) push(pt(a)[0] - pt(b)[0]); else { const g = m.get(a.e); push(g.x2 - g.x1); }
          break;
        case 'parallel': { const u = dir(a.e), v = dir(b.e); push((u[0] * v[1] - u[1] * v[0]) * 10); break; }
        case 'perpendicular': { const u = dir(a.e), v = dir(b.e); push((u[0] * v[0] + u[1] * v[1]) * 10); break; }
        case 'equal':
          if (ea.type === 'line') push(dir(a.e)[2] - dir(b.e)[2]);
          else push(radiusOf(ea.type, m.get(a.e)) - radiusOf(eb.type, m.get(b.e)));
          break;
        case 'concentric': { const p = pt({ e: a.e, k: 'c' }), q = pt({ e: b.e, k: 'c' }); push(p[0] - q[0]); push(p[1] - q[1]); break; }
        case 'tangent': {
          const lineRef = ea.type === 'line' ? a : eb.type === 'line' ? b : null;
          if (lineRef) {
            const round = lineRef === a ? b : a;
            const g = m.get(lineRef.e), c0 = pt({ e: round.e, k: 'c' }), r = radiusOf(byId.get(round.e).type, m.get(round.e));
            const dx = g.x2 - g.x1, dy = g.y2 - g.y1, L = Math.hypot(dx, dy) || 1e-9;
            push(Math.abs(((c0[0] - g.x1) * dy - (c0[1] - g.y1) * dx) / L) - r);
          } else {
            const p = pt({ e: a.e, k: 'c' }), q = pt({ e: b.e, k: 'c' });
            const ra = radiusOf(ea.type, m.get(a.e)), rb = radiusOf(eb.type, m.get(b.e));
            const d = Math.hypot(p[0] - q[0], p[1] - q[1]);
            push(c.inside ? d - Math.abs(ra - rb) : d - (ra + rb));
          }
          break;
        }
        case 'fix': { const p = pt(a); push((p[0] - c.at[0]) * 2); push((p[1] - c.at[1]) * 2); break; }
        case 'midpoint': {
          const p = pt(a), g = m.get(b.e);
          push(p[0] - (g.x1 + g.x2) / 2); push(p[1] - (g.y1 + g.y2) / 2);
          break;
        }
        case 'length': { push(dir(a.e)[2] - val); break; }
        case 'radius': { push(radiusOf(ea.type, m.get(a.e)) - val); break; }
        case 'distance': {
          const p = pt(a), q = pt(b);
          if (c.axis === 'x') push(Math.abs(p[0] - q[0]) - val);
          else if (c.axis === 'y') push(Math.abs(p[1] - q[1]) - val);
          else push(Math.hypot(p[0] - q[0], p[1] - q[1]) - val);
          break;
        }
      }
    }
    if (!onlyCons) for (const pl of pulls) {
      const p = pointOf(byId.get(pl.id).type, cur(x).get(pl.id), pl.k);
      out.push((p[0] - pl.to[0]) * 0.05, (p[1] - pl.to[1]) * 0.05);
      tag.push(null, null);
    }
    return { r: out, tag };
  };

  // Levenberg-Marquardt with a numeric Jacobian.
  let x = x0.slice();
  const n = x.length;
  let { r } = resid(x);
  let cost = r.reduce((s, v) => s + v * v, 0);
  let mu = 1e-3;
  for (let it = 0; it < 200 && cost > 1e-20 && n; it++) {
    const J = [];
    for (let j = 0; j < n; j++) {
      const h = 1e-6 * Math.max(1, Math.abs(x[j]));
      const xp = x.slice(); xp[j] += h;
      const rp = resid(xp).r;
      J.push(rp.map((v, i) => (v - r[i]) / h));
    }
    // (JᵀJ + μ·diag) δ = −Jᵀr
    const A = Array.from({ length: n }, () => new Float64Array(n));
    const g = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      for (let k = 0; k < r.length; k++) g[i] += J[i][k] * r[k];
      for (let j = i; j < n; j++) { let s = 0; for (let k = 0; k < r.length; k++) s += J[i][k] * J[j][k]; A[i][j] = A[j][i] = s; }
    }
    let improved = false;
    for (let tries = 0; tries < 12; tries++) {
      const M = A.map((row, i) => { const c = Float64Array.from(row); c[i] += mu * (row[i] + 1e-6); return c; });
      const d = gauss(M, Array.from(g, (v) => -v));
      if (!d) { mu *= 10; continue; }
      const xn = x.map((v, i) => v + d[i]);
      const rn = resid(xn).r;
      const cn = rn.reduce((s, v) => s + v * v, 0);
      if (cn < cost) { x = xn; r = rn; cost = cn; mu = Math.max(mu / 3, 1e-9); improved = true; break; }
      mu *= 8;
    }
    if (!improved) break;
  }
  // Check each rule on its own (ignoring the drag pull).
  const fin = resid(x, true);
  const bad = new Set();
  fin.r.forEach((v, i) => { if (Math.abs(v) > 1e-4 && fin.tag[i]) bad.add(fin.tag[i]); });
  const out = entities.map((e) => {
    if (!involved.has(e.id)) return e;
    const c = { ...e };
    vars.forEach((v, i) => { if (v.id === e.id) c[v.k] = Math.round(x[i] * 1e6) / 1e6; });
    return c;
  });
  return { entities: out, ok: bad.size === 0, bad: [...bad] };
}

function gauss(A, b) {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-14) return null;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = c + 1; r < n; r++) {
      const f = M[r][c] / M[c][c];
      if (!f) continue;
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = M[r][n];
    for (let k = r + 1; k < n; k++) s -= M[r][k] * x[k];
    x[r] = s / M[r][r];
  }
  return x;
}
