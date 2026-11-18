import opencascade from 'replicad-opencascadejs';
import * as r from 'replicad';
import { createModel } from './model.js';

let model = null;
async function init() {
  const oc = await opencascade({ locateFile: () => new URL('replicad_single.wasm', self.location.href).href });
  r.setOC(oc);
  model = createModel(r);
}
const ready = init().then(() => postMessage({ type: 'ready' }), (e) => postMessage({ type: 'fatal', msg: String((e && e.message) || e) }));

// Solids of assembly parts, kept while their recipe is unchanged.
const bodyCache = new Map();
function partBody(doc) {
  const key = JSON.stringify(doc.features) + JSON.stringify(doc.params) + (doc.rollback ?? '') + (doc.units || '');
  const hit = bodyCache.get(key);
  if (hit) return hit;
  const res = model.rebuild(doc, { stopAt: doc.rollback ?? doc.features.length });
  const out = { body: res.body, errors: res.errors };
  bodyCache.set(key, out);
  if (bodyCache.size > 40) bodyCache.delete(bodyCache.keys().next().value);
  return out;
}
function unitScale(doc) { return doc.units === 'in' ? 25.4 : 1; }
function placedBodies(m) {
  const out = [];
  for (const c of m.comps) {
    const doc = m.parts[c.part];
    if (!doc) continue;
    const { body } = partBody(doc);
    if (!body) continue;
    let b = body;
    const k = unitScale(doc) / (m.scale || 1);
    if (k !== 1) b = b.clone().scale(k, [0, 0, 0]);
    out.push({ id: c.id, body: model.placed(b, c.pos, c.quat) });
  }
  return out;
}

self.onmessage = async (ev) => {
  const m = ev.data;
  await ready;
  if (!model) return;
  const t0 = performance.now();
  try {
    if (m.type === 'rebuild') {
      const res = model.rebuild(m.doc, { stopAt: m.stopAt });
      const desc = model.describe(res.body, m.doc.units);
      const transfer = desc ? [desc.vertices.buffer, desc.normals.buffer, desc.triangles.buffer, desc.lines.buffer] : [];
      postMessage({ type: 'rebuilt', id: m.id, desc, errors: res.errors, warnings: res.warnings, planes: res.planes, ms: performance.now() - t0 }, transfer);
    } else if (m.type === 'parts') {
      // Describe several parts for an assembly.
      const descs = {}, errors = {}, transfer = [];
      for (const [pid, doc] of Object.entries(m.parts)) {
        const { body, errors: e } = partBody(doc);
        const d = model.describe(body, doc.units);
        descs[pid] = d;
        if (Object.keys(e).length) errors[pid] = e;
        if (d) transfer.push(d.vertices.buffer, d.normals.buffer, d.triangles.buffer, d.lines.buffer);
      }
      postMessage({ type: 'parts', id: m.id, descs, errors, ms: performance.now() - t0 }, transfer);
    } else if (m.type === 'interference') {
      const items = placedBodies(m);
      const found = [];
      for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
        const A = items[i], B = items[j];
        const a = A.body.boundingBox.bounds, b = B.body.boundingBox.bounds;
        if (a[1][0] < b[0][0] || b[1][0] < a[0][0] || a[1][1] < b[0][1] || b[1][1] < a[0][1] || a[1][2] < b[0][2] || b[1][2] < a[0][2]) continue;
        let common;
        try { common = A.body.intersect(B.body); } catch { continue; }
        let vol = 0;
        try { vol = r.measureVolume(common); } catch { vol = 0; }
        if (vol > 1e-3) {
          const mesh = common.mesh({ tolerance: 0.1, angularTolerance: 15 });
          found.push({ a: A.id, b: B.id, volume: vol, vertices: Float32Array.from(mesh.vertices), triangles: Uint32Array.from(mesh.triangles) });
        }
      }
      postMessage({ type: 'interference', id: m.id, found, ms: performance.now() - t0 });
    } else if (m.type === 'export') {
      const res = model.rebuild(m.doc, { stopAt: m.stopAt });
      if (!res.body) throw new Error('There is no part to export yet');
      let body = res.body;
      if (unitScale(m.doc) !== 1) body = body.clone().scale(unitScale(m.doc), [0, 0, 0]);
      const blob = m.format === 'stl' ? body.blobSTL({ tolerance: 0.02, angularTolerance: 5, binary: true }) : body.blobSTEP();
      const buf = await blob.arrayBuffer();
      postMessage({ type: 'exported', id: m.id, buf, format: m.format }, [buf]);
    } else if (m.type === 'exportAsm') {
      const items = placedBodies({ ...m, scale: 1 });
      if (!items.length) throw new Error('There are no parts to export yet');
      const all = r.makeCompound(items.map((x) => x.body));
      const blob = m.format === 'stl' ? all.blobSTL({ tolerance: 0.02, angularTolerance: 5, binary: true }) : all.blobSTEP();
      const buf = await blob.arrayBuffer();
      postMessage({ type: 'exported', id: m.id, buf, format: m.format }, [buf]);
    } else if (m.type === 'drawing') {
      postMessage({ type: 'drawing', id: m.id, ...model.drawingViews(m) });
    }
  } catch (e) {
    postMessage({ type: 'error', id: m.id, msg: String((e && e.message) || e) });
  }
};
