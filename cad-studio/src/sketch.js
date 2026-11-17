// Sketch entities -> evaluated 2D geometry -> closed loops (profiles).
import { evaluate } from './expr.js';

const TAU = Math.PI * 2;
const rad = (d) => (d * Math.PI) / 180;

export function arcPoint(c, r, aDeg) {
  return [c[0] + r * Math.cos(rad(aDeg)), c[1] + r * Math.sin(rad(aDeg))];
}

// Sweep (degrees, positive, CCW) from a1 to a2.
export function arcSweep(a1, a2) {
  let s = (a2 - a1) % 360;
  if (s <= 1e-9) s += 360;
  return s;
}

function lineSeg(a, b) { return { type: 'line', a, b }; }
function arcSeg(c, r, a1, a2) {
  const sw = arcSweep(a1, a2);
  return { type: 'arc', c, r, a1, a2, a: arcPoint(c, r, a1), b: arcPoint(c, r, a1 + sw), m: arcPoint(c, r, a1 + sw / 2) };
}

// Circle through three points: start p1, end p2, passing through pm.
export function arcFrom3(p1, p2, pm) {
  const [ax, ay] = p1, [bx, by] = pm, [cx, cy] = p2;
  const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
  if (Math.abs(d) < 1e-9) return null;
  const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
  const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
  const c = [ux, uy], r = Math.hypot(ax - ux, ay - uy);
  const ang = (p) => (Math.atan2(p[1] - uy, p[0] - ux) * 180) / Math.PI;
  const a1 = ang(p1), a2 = ang(p2), am = ang(pm);
  const ccw = arcSweep(a1, am) < arcSweep(a1, a2);
  let seg = ccw ? arcSeg(c, r, a1, a2) : arcSeg(c, r, a2, a1);
  // Keep the exact typed end points (avoid rounding gaps when chaining).
  if (ccw) seg = { ...seg, a: p1, b: p2 }; else seg = { ...seg, a: p2, b: p1 };
  return { c, r, seg, ccw };
}

// Turn one entity into numbers. Throws with a readable message on a bad value.
export function evalEntity(e, P) {
  const v = (x) => evaluate(x, P);
  switch (e.type) {
    case 'line': {
      const a = [v(e.x1), v(e.y1)], b = [v(e.x2), v(e.y2)];
      return { segs: [lineSeg(a, b)], closed: false };
    }
    case 'arc': {
      const p1 = [v(e.x1), v(e.y1)], p2 = [v(e.x2), v(e.y2)], pm = [v(e.xm), v(e.ym)];
      const a = arcFrom3(p1, p2, pm);
      if (!a) throw new Error('The three arc points are in a straight line');
      return { segs: [a.seg], closed: false, center: a.c, radius: a.r };
    }
    case 'rect': {
      let x = v(e.x), y = v(e.y), w = v(e.w), h = v(e.h);
      if (Math.abs(w) < 1e-9 || Math.abs(h) < 1e-9) throw new Error('Width and height must not be 0');
      if (w < 0) { x += w; w = -w; }
      if (h < 0) { y += h; h = -h; }
      const p = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
      return { segs: p.map((q, i) => lineSeg(q, p[(i + 1) % 4])), closed: true };
    }
    case 'circle': {
      const c = [v(e.cx), v(e.cy)], r = v(e.r);
      if (r <= 0) throw new Error('Radius must be more than 0');
      return { segs: [arcSeg(c, r, 0, 180), arcSeg(c, r, 180, 360)], closed: true, circle: { c, r } };
    }
    case 'polygon': {
      const c = [v(e.cx), v(e.cy)], r = v(e.r), n = Math.round(v(e.n)), rot = v(e.rot || 0);
      if (r <= 0) throw new Error('Size must be more than 0');
      if (n < 3 || n > 64) throw new Error('Sides must be 3 to 64');
      const p = [];
      for (let i = 0; i < n; i++) p.push(arcPoint(c, r, rot + (360 * i) / n));
      return { segs: p.map((q, i) => lineSeg(q, p[(i + 1) % n])), closed: true };
    }
    case 'slot': {
      const a = [v(e.x1), v(e.y1)], b = [v(e.x2), v(e.y2)], w = v(e.w);
      if (w <= 0) throw new Error('Width must be more than 0');
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (L < 1e-9) throw new Error('Slot ends must be apart');
      const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI, r = w / 2;
      const s1 = arcSeg(b, r, ang - 90, ang + 90), s2 = arcSeg(a, r, ang + 90, ang + 270);
      return { segs: [s1, lineSeg(s1.b, s2.a), s2, lineSeg(s2.b, s1.a)], closed: true };
    }
    case 'point': {
      return { segs: [], closed: false, point: [v(e.x), v(e.y)] };
    }
  }
  throw new Error('Unknown sketch item ' + e.type);
}

export function evalSketch(entities, P) {
  return entities.map((e) => {
    try { return { e, g: evalEntity(e, P) }; } catch (err) { return { e, err: err.message }; }
  });
}

function sampleSeg(s, out) {
  if (s.type === 'line') { out.push(s.a); return; }
  const sw = arcSweep(s.a1, s.a2);
  const n = Math.max(4, Math.ceil(sw / 10));
  for (let i = 0; i < n; i++) out.push(arcPoint(s.c, s.r, s.a1 + (sw * i) / n));
}
function reverseSeg(s) {
  if (s.type === 'line') return lineSeg(s.b, s.a);
  return { ...s, a: s.b, b: s.a, reversed: !s.reversed };
}
function polyArea(p) {
  let a = 0;
  for (let i = 0; i < p.length; i++) { const q = p[i], w = p[(i + 1) % p.length]; a += q[0] * w[1] - w[0] * q[1]; }
  return a / 2;
}
export function pointInPoly(pt, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function distToPolyEdge(pt, poly) {
  let best = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((pt[0] - a[0]) * dx + (pt[1] - a[1]) * dy) / L));
    best = Math.min(best, Math.hypot(pt[0] - a[0] - t * dx, pt[1] - a[1] - t * dy));
  }
  return best;
}
function containsLoop(outer, inner) {
  let strictly = 0;
  for (const p of inner) {
    if (distToPolyEdge(p, outer) < 1e-3) continue;
    if (!pointInPoly(p, outer)) return false;
    strictly++;
  }
  return strictly > 0 || inner.length > 0;
}

const TOL = 1e-4;
const near = (p, q) => Math.abs(p[0] - q[0]) < TOL && Math.abs(p[1] - q[1]) < TOL;

// Gather closed loops. Closed shapes are loops by themselves; loose lines and
// arcs are chained end to end. Returns loops with a depth (0 = outside edge,
// 1 = hole, 2 = island in a hole...).
export function buildLoops(evals) {
  const loops = [];
  const loose = [];
  for (const it of evals) {
    if (!it.g || it.e.construction) continue;
    if (it.g.closed) loops.push({ segs: it.g.segs, circle: it.g.circle, ids: [it.e.id] });
    else for (const s of it.g.segs) loose.push({ s, id: it.e.id, used: false });
  }
  let openEnds = 0;
  for (const start of loose) {
    if (start.used) continue;
    start.used = true;
    const chain = [start.s];
    const ids = [start.id];
    let closed = false;
    for (let guard = 0; guard < 10000; guard++) {
      const end = chain[chain.length - 1].b;
      if (chain.length > 1 && near(end, chain[0].a)) { closed = true; break; }
      if (chain.length === 1 && chain[0].type === 'arc' && near(end, chain[0].a)) { closed = true; break; }
      let next = null;
      for (const c of loose) {
        if (c.used) continue;
        if (near(c.s.a, end)) { next = c.s; } else if (near(c.s.b, end)) { next = reverseSeg(c.s); }
        if (next) { c.used = true; ids.push(c.id); break; }
      }
      if (!next) break;
      chain.push(next);
    }
    if (closed) loops.push({ segs: chain, ids });
    else openEnds++;
  }
  for (const L of loops) {
    const poly = [];
    for (const s of L.segs) sampleSeg(s, poly);
    L.poly = poly;
    L.area = Math.abs(polyArea(poly));
  }
  // A loop is inside another when every point of it is inside (or on the edge of) the bigger one.
  for (const L of loops) {
    L.depth = loops.filter((o) => o !== L && o.area > L.area + 1e-9 && containsLoop(o.poly, L.poly)).length;
  }
  loops.sort((a, b) => a.depth - b.depth || b.area - a.area);
  return { loops, openEnds };
}

export { TAU };
