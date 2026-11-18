// Millimetres or inches. Each part and assembly has its own units; the engine
// works in the document's units and files are exported in millimetres.
export const UNIT_MM = { mm: 1, in: 25.4 };
export const UNIT_NAMES = { mm: 'Millimetres (mm)', in: 'Inches (in)' };

// A friendly default size: millimetre value, or a round inch value.
export function nice(mm, units) {
  if (units !== 'in') return mm;
  const v = mm / 25.4;
  for (const s of [0.0625, 0.125, 0.25, 0.5, 1]) if (v <= s * 1.5) return s;
  return Math.round(v);
}

// Which fields of each feature are lengths (so they scale when units change).
const LEN = {
  sketch: ['offset'],
  extrude: ['distance'],
  hole: ['diameter', 'depth', 'cbDiameter', 'cbDepth'],
  primitive: ['w', 'd', 'h', 'diameter', 'x', 'y', 'z'],
  fillet: ['radius'], chamfer: ['radius'],
  shell: ['thickness'],
  pattern: ['s1', 's2'],
};
const ENT_LEN = { line: ['x1', 'y1', 'x2', 'y2'], arc: ['x1', 'y1', 'x2', 'y2', 'xm', 'ym'], rect: ['x', 'y', 'w', 'h'], circle: ['cx', 'cy', 'r'], polygon: ['cx', 'cy', 'r'], slot: ['x1', 'y1', 'x2', 'y2', 'w'], point: ['x', 'y'] };
const NAME = /[A-Za-z_][A-Za-z_0-9]*/g;

function lengthExprs(doc) {
  const out = [];
  for (const f of doc.features) {
    for (const k of LEN[f.type] || []) if (f[k] != null) out.push(f[k]);
    if (f.type === 'sketch') for (const e of f.entities || []) for (const k of ENT_LEN[e.type] || []) out.push(e[k]);
  }
  return out;
}
// Parameters that are used as lengths somewhere (directly or through another parameter).
export function lengthParams(doc) {
  const names = new Set(doc.params.map((p) => p.name));
  const used = new Set();
  const visit = (x) => { for (const m of String(x).match(NAME) || []) if (names.has(m) && !used.has(m)) { used.add(m); visit(doc.params.find((p) => p.name === m).expr); } };
  for (const x of lengthExprs(doc)) if (typeof x === 'string') visit(x);
  return used;
}

// Scale every plain-number length by k. Parameters in `convertParams` are scaled
// too (only if they are plain numbers). Returns how many formulas were left as they were.
export function convertPart(doc, k, convertParams) {
  const r = (v) => Math.round(v * k * 1e6) / 1e6;
  let skipped = 0;
  const sc = (o, key) => { if (typeof o[key] === 'number') o[key] = r(o[key]); else if (typeof o[key] === 'string' && /\d/.test(o[key]) && !/^[A-Za-z_][\w]*$/.test(o[key].trim())) skipped++; };
  const pt = (a) => a && a.forEach((v, i) => { if (i < 3) a[i] = r(v); });
  for (const f of doc.features) {
    for (const key of LEN[f.type] || []) if (f[key] != null) sc(f, key);
    if (f.type === 'sketch') {
      for (const e of f.entities || []) for (const key of ENT_LEN[e.type] || []) sc(e, key);
      if (f.plane && typeof f.plane === 'object') f.plane.origin = f.plane.origin.map(r);
      pt(f.faceRef);
    }
    if (f.type === 'hole') { f.origin = f.origin && f.origin.map(r); pt(f.faceRef); }
    if (f.edges) f.edges.forEach(pt);
    if (f.faces) f.faces.forEach(pt);
  }
  for (const p of doc.params) if (convertParams.has(p.name)) { if (typeof p.expr === 'number') p.expr = r(p.expr); else skipped++; }
  return skipped;
}

export function convertAssembly(asm, k) {
  const r = (v) => Math.round(v * k * 1e6) / 1e6;
  for (const c of asm.components) c.pos = c.pos.map(r);
  for (const c of asm.constraints) if (c.type !== 'angle' && typeof c.offset === 'number') c.offset = r(c.offset);
}
