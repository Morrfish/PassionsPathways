// Rebuilds a part from its feature history using the replicad / OpenCascade kernel.
import { evaluate, paramMap } from './expr.js';
import { evalSketch, buildLoops } from './sketch.js';

export const ORIGIN_PLANES = {
  XY: { origin: [0, 0, 0], xDir: [1, 0, 0], normal: [0, 0, 1] },
  XZ: { origin: [0, 0, 0], xDir: [1, 0, 0], normal: [0, -1, 0] },
  YZ: { origin: [0, 0, 0], xDir: [0, 1, 0], normal: [1, 0, 0] },
};
const AXES = { X: [1, 0, 0], Y: [0, 1, 0], Z: [0, 0, 1] };
const BIG = 5000;

const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

export function sketchPlane(f, P) {
  const base = typeof f.plane === 'string' ? ORIGIN_PLANES[f.plane] : f.plane;
  const off = f.offset ? evaluate(f.offset, P) : 0;
  return { origin: add(base.origin, mul(base.normal, off)), xDir: base.xDir, normal: base.normal };
}
export function planeToWorld(pl, x, y) {
  const yDir = cross(pl.normal, pl.xDir);
  return add(pl.origin, add(mul(pl.xDir, x), mul(yDir, y)));
}

export function createModel(r) {
  // True when OpenCascade says the solid is well formed.
  function isValid(shape) {
    try {
      const oc = r.getOC();
      const a = new oc.BRepCheck_Analyzer(shape.wrapped, true, false);
      const ok = a.IsValid_2 ? a.IsValid_2() : a.IsValid_1 ? a.IsValid_1(shape.wrapped) : a.IsValid();
      a.delete();
      return ok;
    } catch { return true; }
  }
  const mkPlane = (pl) => new r.Plane(pl.origin, pl.xDir, pl.normal);

  function loopDrawing(L) {
    if (L.circle) return r.drawCircle(L.circle.r).translate(L.circle.c[0], L.circle.c[1]);
    let pen = r.draw(L.segs[0].a);
    for (const s of L.segs) pen = s.type === 'line' ? pen.lineTo(s.b) : pen.threePointsArcTo(s.b, s.m);
    return pen.close();
  }

  function sketchDrawing(sk) {
    const { loops, openEnds } = buildLoops(sk.evals);
    if (!loops.length) throw new Error(openEnds ? 'The sketch has no closed shape (some lines do not meet)' : 'The sketch has no closed shape');
    let d = null;
    for (const L of loops) {
      const ld = loopDrawing(L);
      if (L.depth % 2 === 0) d = d ? d.fuse(ld) : ld;
      else if (d) d = d.cut(ld);
    }
    return d;
  }

  function toSolid(drawing, plane) {
    return drawing.sketchOnPlane(mkPlane(plane));
  }

  function applyOp(body, tool, op) {
    if (!body || op === 'new') return body ? body.fuse(tool) : tool;
    if (op === 'join') return body.fuse(tool);
    if (op === 'cut') return body.cut(tool);
    if (op === 'intersect') return body.intersect(tool);
    throw new Error('Unknown operation ' + op);
  }

  function extrudeTool(sk, f, P) {
    const pl = sk.plane;
    const ext = f.extent || 'distance';
    let d = ext === 'through' ? BIG : evaluate(f.distance, P);
    if (d <= 0) throw new Error('Distance must be more than 0');
    const dir = f.direction || 'normal';
    let origin = pl.origin, n = pl.normal;
    if (dir === 'reverse') n = mul(n, -1);
    if (dir === 'both') { origin = add(origin, mul(n, -d / 2)); if (ext === 'through') origin = add(pl.origin, mul(n, -BIG)); d = ext === 'through' ? 2 * BIG : d; }
    const sketch = sketchDrawing(sk).sketchOnPlane(mkPlane({ origin, xDir: pl.xDir, normal: n }));
    const taper = f.taper ? evaluate(f.taper, P) : 0;
    if (taper) {
      // Taper by scaling the far end.
      const ins = Math.tan((taper * Math.PI) / 180) * d;
      const size = sk.size || 1;
      const k = Math.max(0.01, 1 - (2 * ins) / size);
      return sketch.extrude(d, { extrusionProfile: { profile: 'linear', endFactor: k } });
    }
    return sketch.extrude(d);
  }

  function revolveTool(sk, f, P) {
    const pl = sk.plane;
    let a, b;
    if (f.axis === 'X') { a = [0, 0]; b = [1, 0]; }
    else if (f.axis === 'Y') { a = [0, 0]; b = [0, 1]; }
    else {
      const it = sk.evals.find((x) => x.e.id === f.axis);
      if (!it || !it.g || !it.g.segs[0] || it.g.segs[0].type !== 'line') throw new Error('Pick a line in the sketch as the axis');
      a = it.g.segs[0].a; b = it.g.segs[0].b;
    }
    const wa = planeToWorld(pl, a[0], a[1]), wb = planeToWorld(pl, b[0], b[1]);
    const dir = [wb[0] - wa[0], wb[1] - wa[1], wb[2] - wa[2]];
    const ang = evaluate(f.angle ?? 360, P);
    if (ang <= 0 || ang > 360) throw new Error('Angle must be from 1 to 360');
    const draw = sketchDrawing(sk);
    const sketches = toSolid(draw, pl);
    return sketches.revolve(dir, { origin: wa, angle: ang });
  }

  function holeTool(f, P) {
    const n = f.normal, o = f.origin;
    const d = evaluate(f.diameter, P);
    if (d <= 0) throw new Error('Diameter must be more than 0');
    const depth = f.extent === 'through' ? BIG : evaluate(f.depth, P);
    if (depth <= 0) throw new Error('Depth must be more than 0');
    const into = mul(n, -1);
    const start = add(o, mul(n, 0.01));
    let tool = r.makeCylinder(d / 2, depth + 0.01, start, into);
    if (f.style === 'counterbore') {
      const cd = evaluate(f.cbDiameter, P), cdepth = evaluate(f.cbDepth, P);
      if (cd <= d) throw new Error('Counterbore must be wider than the hole');
      tool = tool.fuse(r.makeCylinder(cd / 2, cdepth + 0.01, start, into));
    } else if (f.style === 'countersink') {
      const cd = evaluate(f.cbDiameter, P);
      if (cd <= d) throw new Error('Countersink must be wider than the hole');
      const h = (cd - d) / 2; // 90 degree countersink
      const cone = r.makeCylinder(cd / 2, 0.01, start, into); // lip
      const sk = r.drawPolysides ? null : null; // keep linter quiet
      void sk;
      // Build a cone by revolving a triangle profile around the hole axis.
      const xd = Math.abs(n[2]) < 0.9 ? cross([0, 0, 1], n) : [1, 0, 0];
      const prof = r.draw([0, 0]).lineTo([cd / 2, 0]).lineTo([d / 2, -h]).lineTo([0, -h]).close();
      const plane = new r.Plane(o, xd, cross(n, xd));
      const coneSolid = prof.sketchOnPlane(plane).revolve(n, { origin: o });
      tool = tool.fuse(coneSolid).fuse(cone);
    }
    return tool;
  }

  function primitiveTool(f, P) {
    const v = (x) => evaluate(x, P);
    const at = [v(f.x ?? 0), v(f.y ?? 0), v(f.z ?? 0)];
    if (f.shape === 'box') {
      const w = v(f.w), d = v(f.d), h = v(f.h);
      if (w <= 0 || d <= 0 || h <= 0) throw new Error('Sizes must be more than 0');
      return r.makeBox([at[0] - w / 2, at[1] - d / 2, at[2]], [at[0] + w / 2, at[1] + d / 2, at[2] + h]);
    }
    if (f.shape === 'cylinder') {
      const rad = v(f.diameter) / 2, h = v(f.h);
      if (rad <= 0 || h <= 0) throw new Error('Sizes must be more than 0');
      return r.makeCylinder(rad, h, at, AXES[f.axis || 'Z']);
    }
    if (f.shape === 'sphere') {
      const rad = v(f.diameter) / 2;
      if (rad <= 0) throw new Error('Diameter must be more than 0');
      return r.makeSphere(rad).translate(at);
    }
    throw new Error('Unknown shape');
  }

  // Picked edges and faces are remembered by a point (plus a direction), so they
  // can be found again after earlier features change. If the exact spot is gone,
  // the closest edge/face that points the same way is used instead.
  function bboxDiag(body) {
    const b = body.boundingBox.bounds;
    return Math.hypot(b[1][0] - b[0][0], b[1][1] - b[0][1], b[1][2] - b[0][2]);
  }
  const parallel = (a, b) => a && b && Math.abs(a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) > 0.999;
  const same = (a, b) => a && b && a[0] * b[0] + a[1] * b[1] + a[2] * b[2] > 0.999;
  function edgeDir(e) {
    if (e.geomType !== 'LINE') return null;
    const a = e.startPoint.toTuple(), b = e.endPoint.toTuple();
    const L = dist(a, b) || 1;
    return [(b[0] - a[0]) / L, (b[1] - a[1]) / L, (b[2] - a[2]) / L];
  }
  function findEdges(body, pts) {
    const edges = body.edges.map((e) => ({ e, mid: e.pointAt(0.5).toTuple(), dir: edgeDir(e), type: e.geomType }));
    const far = bboxDiag(body) * 0.3;
    const picked = [];
    let missing = 0, moved = 0;
    for (const p of pts) {
      const want = p.length >= 6 ? p.slice(3, 6) : null;
      let best = null, bd = Infinity;
      for (const c of edges) { const d = dist(c.mid, p); if (d < bd) { bd = d; best = c; } }
      if (best && bd < 0.5) { picked.push(best.e); continue; }
      best = null; bd = far;
      for (const c of edges) {
        if (want ? !parallel(c.dir, want) : c.dir) continue;
        const d = dist(c.mid, p);
        if (d < bd) { bd = d; best = c; }
      }
      if (best) { picked.push(best.e); moved++; } else missing++;
    }
    return { picked, missing, moved };
  }
  function findFaces(body, pts) {
    const faces = body.faces.map((f) => ({ f, c: f.center.toTuple(), n: f.geomType === 'PLANE' ? f.normalAt(f.center).toTuple() : null }));
    const far = bboxDiag(body) * 0.5;
    const picked = [];
    let missing = 0, moved = 0;
    for (const p of pts) {
      const want = p.length >= 6 ? p.slice(3, 6) : null;
      let best = null, bd = Infinity;
      for (const c of faces) { const d = dist(c.c, p); if (d < bd) { bd = d; best = c; } }
      if (best && bd < 0.5) { picked.push(best.f); continue; }
      best = null; bd = far;
      if (want) for (const c of faces) {
        if (!same(c.n, want)) continue;
        const d = dist(c.c, p);
        if (d < bd) { bd = d; best = c; }
      }
      if (best) { picked.push(best.f); moved++; } else missing++;
    }
    return { picked, missing, moved };
  }

  // Returns {body, sketches, warnings: {featureId: msg}, errors: {featureId: msg}}
  function rebuild(doc, opts = {}) {
    const P = paramMap(doc);
    const sketches = {};
    const planes = {};
    const tools = {};
    const errors = {};
    const warnings = {};
    let body = null;
    const stopAt = opts.stopAt ?? doc.features.length;
    for (let i = 0; i < Math.min(stopAt, doc.features.length); i++) {
      const f = doc.features[i];
      if (f.suppressed) continue;
      try {
        switch (f.type) {
          case 'sketch': {
            let plane = sketchPlane(f, P);
            if (f.faceRef && body) {
              // Follow the face this sketch was drawn on if it moved.
              const { picked } = findFaces(body, [f.faceRef]);
              if (picked.length) {
                const n = f.faceRef.slice(3, 6), c = picked[0].center.toTuple();
                const d = n[0] * c[0] + n[1] * c[1] + n[2] * c[2];
                const off = f.offset ? evaluate(f.offset, P) : 0;
                plane = { origin: mul(n, d + off), xDir: plane.xDir, normal: n, base: mul(n, d) };
              } else warnings[f.id] = 'The face this sketch was drawn on is gone, so the sketch stays where it was.';
            }
            const evals = evalSketch(f.entities || [], P, f.constraints);
            const bad = evals.find((x) => x.err);
            if (bad) warnings[f.id] = bad.err;
            else if (evals.bad && evals.bad.length) warnings[f.id] = `${evals.bad.length} sketch rule(s) cannot all be met. Edit the sketch to fix them.`;
            let size = 0;
            for (const it of evals) if (it.g) for (const s of it.g.segs) size = Math.max(size, Math.abs(s.a[0]) + Math.abs(s.b[0]), Math.abs(s.a[1]) + Math.abs(s.b[1]));
            sketches[f.id] = { plane, evals, size };
            planes[f.id] = plane;
            break;
          }
          case 'extrude':
          case 'revolve': {
            const sk = sketches[f.sketch];
            if (!sk) throw new Error('Its sketch is missing or turned off');
            const tool = f.type === 'extrude' ? extrudeTool(sk, f, P) : revolveTool(sk, f, P);
            tools[f.id] = { tool, op: f.op };
            body = applyOp(body, tool, f.op);
            break;
          }
          case 'hole': {
            if (!body) throw new Error('A hole needs a part to go into');
            let hf = f;
            if (f.faceRef) {
              const { picked } = findFaces(body, [f.faceRef]);
              if (picked.length) {
                const n = f.normal, c = picked[0].center.toTuple();
                const k = n[0] * (c[0] - f.origin[0]) + n[1] * (c[1] - f.origin[1]) + n[2] * (c[2] - f.origin[2]);
                hf = { ...f, origin: add(f.origin, mul(n, k)) };
              } else warnings[f.id] = 'The face this hole started on is gone, so the hole stays where it was.';
            }
            const tool = holeTool(hf, P);
            tools[f.id] = { tool, op: 'cut' };
            body = body.cut(tool);
            break;
          }
          case 'primitive': {
            const tool = primitiveTool(f, P);
            tools[f.id] = { tool, op: f.op };
            body = applyOp(body, tool, f.op);
            break;
          }
          case 'fillet':
          case 'chamfer': {
            if (!body) throw new Error('Nothing to round yet');
            const size = evaluate(f.radius, P);
            if (size <= 0) throw new Error('Size must be more than 0');
            let res;
            if (f.allEdges) res = f.type === 'fillet' ? body.fillet(size) : body.chamfer(size);
            else {
              const { picked, missing, moved } = findEdges(body, f.edges || []);
              if (!picked.length) throw new Error('No edges picked (or the picked edges are gone after a change). Edit it and pick them again.');
              if (missing) warnings[f.id] = `${missing} picked edge(s) are gone after a change. Edit it to pick again.`;
              else if (moved) warnings[f.id] = `${moved} edge(s) moved after a change and were matched to the closest edge. Check it looks right.`;
              const fn = (e) => (picked.some((p) => p.isSame(e)) ? size : null);
              res = f.type === 'fillet' ? body.fillet(fn) : body.chamfer(fn);
            }
            if (!res || !res.faces || !res.faces.length || !isValid(res)) throw new Error(`Could not make this ${f.type}. Try a smaller size or fewer edges.`);
            body = res;
            break;
          }
          case 'shell': {
            if (!body) throw new Error('Nothing to hollow yet');
            const t = evaluate(f.thickness, P);
            if (t <= 0) throw new Error('Thickness must be more than 0');
            const { picked, missing, moved } = findFaces(body, f.faces || []);
            if (!picked.length) throw new Error(f.faces && f.faces.length ? 'The open face is gone after a change. Edit the shell and pick it again.' : 'Pick at least one face to leave open.');
            if (missing) warnings[f.id] = `${missing} picked face(s) are gone after a change.`;
            else if (moved) warnings[f.id] = `${moved} face(s) moved after a change and were matched to the closest face.`;
            const before = r.measureVolume(body);
            const res = body.shell(t, (ff) => ff.inList(picked));
            const after = res && res.faces && res.faces.length ? r.measureVolume(res) : 0;
            if (!(after > 0) || after > before * 0.995 || !isValid(res)) throw new Error('Could not hollow this part. Try a thinner wall, or shell before adding holes and fillets.');
            body = res;
            break;
          }
          case 'pattern': {
            if (!body) throw new Error('Nothing to copy yet');
            const src = (f.features || []).map((id) => ({ id, t: tools[id] })).filter((x) => x.t);
            if (!src.length) throw new Error('Pick a feature to copy (an extrude, revolve, hole or shape)');
            const copies = [];
            if (f.kind === 'rect') {
              const n1 = Math.round(evaluate(f.n1, P)), s1 = evaluate(f.s1, P);
              const n2 = Math.round(evaluate(f.n2 ?? 1, P)), s2 = evaluate(f.s2 ?? 0, P);
              if (n1 < 1 || n2 < 1 || n1 * n2 > 400) throw new Error('Counts must be 1 or more (and 400 total at most)');
              const d1 = AXES[f.d1 || 'X'], d2 = AXES[f.d2 || 'Y'];
              const k1 = f.flip1 ? -1 : 1, k2 = f.flip2 ? -1 : 1;
              for (let i = 0; i < n1; i++) for (let j = 0; j < n2; j++) {
                if (!i && !j) continue;
                copies.push((t) => t.clone().translate(add(mul(d1, i * s1 * k1), mul(d2, j * s2 * k2))));
              }
            } else if (f.kind === 'circ') {
              const n = Math.round(evaluate(f.n, P)), total = evaluate(f.angle ?? 360, P);
              if (n < 2 || n > 400) throw new Error('Count must be 2 to 400');
              const step = Math.abs(total - 360) < 1e-6 ? 360 / n : total / (n - 1);
              for (let i = 1; i < n; i++) copies.push((t) => t.clone().rotate(step * i, [0, 0, 0], AXES[f.axis || 'Z']));
            } else if (f.kind === 'mirror') {
              copies.push((t) => t.clone().mirror(f.plane || 'YZ', [0, 0, 0]));
            }
            for (const { t } of src) for (const mk of copies) body = applyOp(body, mk(t.tool), t.op === 'new' ? 'join' : t.op);
            break;
          }
          case 'mirrorBody': {
            if (!body) throw new Error('Nothing to mirror yet');
            body = body.fuse(body.clone().mirror(f.plane || 'YZ', [0, 0, 0]));
            break;
          }
          default:
            throw new Error('Unknown feature');
        }
      } catch (e) {
        const msg = e && typeof e.message === 'string' && e.message ? e.message : '';
        errors[f.id] = msg && !/WebAssembly|object/.test(msg) ? msg : `The modeling engine could not make this ${f.type}. Try smaller sizes, or check the sketch and picked edges.`;
      }
    }
    return { body, sketches, planes, errors, warnings };
  }

  function describe(body, units = 'mm') {
    if (!body) return null;
    const tol = units === 'in' ? 0.004 : 0.1;
    const mesh = body.mesh({ tolerance: tol, angularTolerance: 15 });
    const em = body.meshEdges({ tolerance: tol, angularTolerance: 15 });
    const faces = body.faces.map((f) => {
      const type = f.geomType;
      const center = f.center.toTuple();
      const info = { type, center };
      if (type === 'PLANE') {
        const n = f.normalAt(f.center).toTuple();
        info.normal = n;
      } else if (type === 'CYLINDRE') {
        try {
          const cy = f._geomAdaptor().Cylinder(), ax = cy.Axis(), l = ax.Location(), d = ax.Direction();
          info.axis = { p: [l.X(), l.Y(), l.Z()], d: [d.X(), d.Y(), d.Z()], r: cy.Radius() };
        } catch { /* ignore */ }
      }
      return info;
    });
    const edges = body.edges.map((e) => {
      const info = { mid: e.pointAt(0.5).toTuple(), type: e.geomType, dir: edgeDir(e) };
      if (info.type === 'CIRCLE') {
        try {
          const ci = e._geomAdaptor().Circle(), ax = ci.Axis(), l = ax.Location(), d = ax.Direction();
          info.circle = { c: [l.X(), l.Y(), l.Z()], n: [d.X(), d.Y(), d.Z()], r: ci.Radius() };
        } catch { /* ignore */ }
      }
      return info;
    });
    const bb = body.boundingBox.bounds;
    let volume = 0, area = 0;
    try { volume = r.measureVolume(body); area = r.measureArea(body); } catch { /* ignore */ }
    return {
      vertices: Float32Array.from(mesh.vertices),
      normals: Float32Array.from(mesh.normals),
      triangles: Uint32Array.from(mesh.triangles),
      faceGroups: mesh.faceGroups.map((g) => [g.start, g.count]),
      lines: Float32Array.from(em.lines),
      edgeGroups: em.edgeGroups.map((g) => [g.start, g.count]),
      faces, edges, bb, volume, area,
    };
  }

  // Turn a component's position + rotation (quaternion) into a moved copy.
  function placed(body, pos, quat) {
    let s = body.clone();
    const [x, y, z, w] = quat;
    const ang = 2 * Math.acos(Math.max(-1, Math.min(1, w)));
    const sn = Math.sqrt(Math.max(0, 1 - w * w));
    if (ang > 1e-9 && sn > 1e-9) s = s.rotate((ang * 180) / Math.PI, [0, 0, 0], [x / sn, y / sn, z / sn]);
    if (pos[0] || pos[1] || pos[2]) s = s.translate(pos);
    return s;
  }

  // 2D drawing views with hidden lines. Paths are SVG path strings in model units
  // (x to the right, y down the page). Also lists round edges seen face-on.
  const VIEW_DIRS = {
    // [direction toward the viewer, page right]
    front: [[0, -1, 0], [1, 0, 0]], top: [[0, 0, 1], [1, 0, 0]], right: [[1, 0, 0], [0, 1, 0]],
    left: [[-1, 0, 0], [0, -1, 0]], back: [[0, 1, 0], [-1, 0, 0]], bottom: [[0, 0, -1], [1, 0, 0]],
    iso: [[1, -1, 1], [1, 1, 0]],
  };
  const flat = (x) => (Array.isArray(x) ? x.flat(Infinity) : [x]).filter(Boolean);
  function drawingViews(body, names) {
    const out = {};
    const circles = [];
    for (const e of body.edges) {
      if (e.geomType !== 'CIRCLE') continue;
      try {
        const ci = e._geomAdaptor().Circle(), ax = ci.Axis(), l = ax.Location(), d = ax.Direction();
        circles.push({ c: [l.X(), l.Y(), l.Z()], n: [d.X(), d.Y(), d.Z()], r: ci.Radius(), full: dist(e.startPoint.toTuple(), e.endPoint.toTuple()) < 1e-6 });
      } catch { /* ignore */ }
    }
    for (const name of names) {
      const [d0, x0] = VIEW_DIRS[name];
      const dl = Math.hypot(...d0), xl = Math.hypot(...x0);
      const dir = d0.map((v) => v / dl), xa = x0.map((v) => v / xl);
      const cam = new r.ProjectionCamera(dir.map((v) => v * 10000), dir, xa);
      const ya = cam.yAxis.toTuple();
      let pr;
      try { pr = r.drawProjection(body, cam); } catch (e) { out[name] = { error: String(e && e.message || e) }; continue; }
      const toPaths = (dr) => { try { return flat(dr.toSVGPaths()); } catch { return []; } };
      const visible = toPaths(pr.visible), hidden = toPaths(pr.hidden);
      // Bounds in the same (SVG, y-down) coordinates as the paths.
      let bounds = [[0, 0], [0, 0]];
      try {
        const vb = String(pr.visible.toSVGViewBox(0)).trim().split(/[\s,]+/).map(Number);
        if (vb.length === 4 && vb.every(Number.isFinite)) bounds = [[vb[0], vb[1]], [vb[0] + vb[2], vb[1] + vb[3]]];
      } catch { /* keep zero bounds */ }
      const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      const seen = [];
      if (name !== 'iso') for (const c of circles) {
        if (Math.abs(dot(c.n, dir)) < 0.999) continue;
        if (!c.full) continue;
        const u = dot(c.c, xa), v = -dot(c.c, ya);
        if (seen.some((q) => Math.hypot(q.c[0] - u, q.c[1] - v) < 1e-4 && Math.abs(q.r - c.r) < 1e-4)) continue;
        seen.push({ c: [u, v], r: c.r, full: c.full });
      }
      out[name] = { visible, hidden, bounds, circles: seen };
    }
    return out;
  }

  return { rebuild, describe, placed, isValid, drawingViews };
}
