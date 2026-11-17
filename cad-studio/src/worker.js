import opencascade from 'replicad-opencascadejs';
import * as r from 'replicad';
import { createModel } from './model.js';

let model = null;
let builds = 0;
async function init() {
  const oc = await opencascade({ locateFile: () => new URL('replicad_single.wasm', self.location.href).href });
  r.setOC(oc);
  model = createModel(r);
}
const ready = init().then(() => postMessage({ type: 'ready' }), (e) => postMessage({ type: 'fatal', msg: String(e && e.message || e) }));

self.onmessage = async (ev) => {
  const m = ev.data;
  await ready;
  if (!model) return;
  const t0 = performance.now();
  try {
    if (m.type === 'rebuild') {
      builds++;
      const res = model.rebuild(m.doc, { stopAt: m.stopAt });
      const desc = model.describe(res.body);
      const transfer = desc ? [desc.vertices.buffer, desc.normals.buffer, desc.triangles.buffer, desc.lines.buffer] : [];
      postMessage({ type: 'rebuilt', id: m.id, desc, errors: res.errors, warnings: res.warnings, planes: res.planes, ms: performance.now() - t0 }, transfer);
    } else if (m.type === 'export') {
      const res = model.rebuild(m.doc, { stopAt: m.stopAt });
      if (!res.body) throw new Error('There is no part to export yet');
      let blob;
      if (m.format === 'stl') blob = res.body.blobSTL({ tolerance: 0.02, angularTolerance: 5, binary: true });
      else blob = res.body.blobSTEP();
      const buf = await blob.arrayBuffer();
      postMessage({ type: 'exported', id: m.id, buf, format: m.format }, [buf]);
    }
  } catch (e) {
    postMessage({ type: 'error', id: m.id, msg: String((e && e.message) || e) });
  }
};
