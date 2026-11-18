// Assemblies: several parts placed together and held in place by constraints.
import * as THREE from 'three';
import { icon } from './icons.js';
import { fmt, evaluate } from './expr.js';
import { EXAMPLES } from './examples.js';

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clone = (o) => JSON.parse(JSON.stringify(o));
const r4 = (n) => Math.round(n * 10000) / 10000;
const V = (a) => new THREE.Vector3(a[0], a[1], a[2]);
const num = (x) => { try { return evaluate(x, {}); } catch { return 0; } };
export const UNIT_MM = { mm: 1, in: 25.4 };

export const CONSTRAINT_INFO = {
  mate: { label: 'Mate', icon: 'mate', help: 'Puts two flat faces against each other, facing opposite ways (like a part sitting on a table).', want: 'plane' },
  flush: { label: 'Flush', icon: 'flush', help: 'Lines two flat faces up so they face the same way and are level with each other.', want: 'plane' },
  insert: { label: 'Insert', icon: 'insert', help: 'Puts a round edge into another round edge: same center line, and the two edge rims level. Use it for pins, bolts and shafts in holes.', want: 'circle' },
  axis: { label: 'Axis', icon: 'axisMate', help: 'Lines up two center lines (round edges or round faces). The parts can still slide and spin along it, like a wheel on an axle.', want: 'axis' },
  angle: { label: 'Angle', icon: 'angleMate', help: 'Sets the angle between two flat faces (0° = facing the same way), like a hinge opened to 90°.', want: 'plane' },
};

export function newAssembly() {
  return { app: 'Pathway CAD', kind: 'assembly', version: 1, name: 'Assembly1', units: 'mm', parts: {}, components: [], constraints: [], nextId: 1 };
}

export class Assembler {
  constructor(app) {
    this.app = app;
    this.vp = app.vp;
    this.group = new THREE.Group();
    this.group.visible = false;
    this.vp.scene.add(this.group);
    this.geo = new Map(); // part id -> {key, desc, geo, edgeGeo, errors}
    this.objs = new Map(); // component id -> {mesh, edges, mat}
    this.sel = null;
    this.hover = null;
    this.bad = {};
    this.clashes = [];
  }
  get asm() { return this.app.asm; }
  scaleOf(pid) { const p = this.asm.parts[pid]; return (UNIT_MM[(p && p.units) || 'mm'] || 1) / (UNIT_MM[this.asm.units || 'mm'] || 1); }
  comp(id) { return this.asm.components.find((c) => c.id === id); }
  partName(pid) { const p = this.asm.parts[pid]; return (p && p.name) || 'Part'; }

  // ----- enter / leave -----
  show(on) {
    this.group.visible = on;
    if (on) this.vp.setPart(null);
    this.vp.render();
  }

  // ----- geometry from the engine -----
  partKey(doc) { return JSON.stringify([doc.features, doc.params, doc.rollback ?? null, doc.units || 'mm']); }
  async rebuild() {
    if (!this.app.ready || !this.asm) return;
    const previewing = this.app.cmd && this.app.cmd.noPreviewBuild;
    const need = {};
    for (const [pid, doc] of Object.entries(this.asm.parts)) {
      const g = this.geo.get(pid);
      if (!g || g.key !== this.partKey(doc)) need[pid] = doc;
    }
    for (const pid of [...this.geo.keys()]) if (!this.asm.parts[pid]) this.disposeGeo(pid);
    if (Object.keys(need).length) {
      const ticket = (this._t = (this._t || 0) + 1);
      this.app.ui.busy(true);
      const m = await this.app.send({ type: 'parts', parts: need });
      if (ticket !== this._t) return;
      this.app.ui.busy(false);
      if (m.type === 'error') { this.app.toast('Could not build the parts: ' + m.msg, 'error'); return; }
      for (const [pid, desc] of Object.entries(m.descs)) {
        this.disposeGeo(pid);
        const g = { key: this.partKey(this.asm.parts[pid] || need[pid]), desc, errors: m.errors[pid] || {} };
        if (desc) {
          g.geo = new THREE.BufferGeometry();
          g.geo.setAttribute('position', new THREE.BufferAttribute(desc.vertices, 3));
          g.geo.setAttribute('normal', new THREE.BufferAttribute(desc.normals, 3));
          g.geo.setIndex(new THREE.BufferAttribute(desc.triangles, 1));
          g.geo.computeBoundingSphere();
          g.edgeGeo = new THREE.BufferGeometry();
          g.edgeGeo.setAttribute('position', new THREE.BufferAttribute(desc.lines, 3));
          const idx = [];
          for (const [start, count] of desc.edgeGroups) for (let k = start; k < start + count - 1; k++) idx.push(k, k + 1);
          g.edgeGeo.setIndex(idx);
          g.edgeGeo.computeBoundingSphere();
        }
        this.geo.set(pid, g);
        this.refreshRefs(pid);
      }
      for (const id of this.objs.keys()) this.dropObj(id);
    }
    if (!previewing) this.solve();
    this.render();
    this.app.ui.renderTree();
    this.app.ui.renderStatusInfo();
    if (!this._fitted && this.asm.components.length) { this._fitted = true; this.fit(); }
  }
  disposeGeo(pid) {
    const g = this.geo.get(pid);
    if (g) { g.geo && g.geo.dispose(); g.edgeGeo && g.edgeGeo.dispose(); this.geo.delete(pid); }
  }
  dropObj(id) {
    const o = this.objs.get(id);
    if (!o) return;
    this.group.remove(o.mesh); this.group.remove(o.edges);
    o.mat.dispose();
    this.objs.delete(id);
  }

  matrixOf(c) {
    const k = this.scaleOf(c.part);
    return new THREE.Matrix4().compose(V(c.pos), new THREE.Quaternion(...c.quat), new THREE.Vector3(k, k, k));
  }

  render() {
    if (!this.asm) return;
    const ids = new Set(this.asm.components.map((c) => c.id));
    for (const id of [...this.objs.keys()]) if (!ids.has(id)) this.dropObj(id);
    for (const c of this.asm.components) {
      const g = this.geo.get(c.part);
      if (!g || !g.geo) { this.dropObj(c.id); continue; }
      let o = this.objs.get(c.id);
      if (!o) {
        const mat = new THREE.MeshStandardMaterial({ metalness: 0.15, roughness: 0.55, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(g.geo, mat);
        const edges = new THREE.LineSegments(g.edgeGeo, this.vp.edgeMat);
        mesh.matrixAutoUpdate = false; edges.matrixAutoUpdate = false;
        mesh.userData.comp = c.id; edges.userData.comp = c.id;
        this.group.add(mesh); this.group.add(edges);
        o = { mesh, edges, mat };
        this.objs.set(c.id, o);
      }
      const part = this.asm.parts[c.part];
      o.mat.color.set(c.color || (part && part.color) || '#8fb3c9');
      o.mat.emissive.set(this.sel === c.id ? 0x1b6f7a : this.hover && this.hover.comp === c.id && !this.app.cmd ? 0x0e3b43 : 0x000000);
      const ghost = this.app.cmd && this.app.cmd.ghostOthers && this.app.cmd.ghostOthers(c.id);
      o.mat.transparent = !!ghost; o.mat.opacity = ghost ? 0.3 : 1; o.mat.depthWrite = !ghost;
      const M = this.matrixOf(c);
      o.mesh.matrix.copy(M); o.edges.matrix.copy(M);
      o.mesh.matrixWorldNeedsUpdate = true; o.edges.matrixWorldNeedsUpdate = true;
      o.mesh.visible = !c.hidden; o.edges.visible = !c.hidden && this.vp.style !== 'shaded';
      if (this.vp.style === 'wire') o.mesh.visible = false;
    }
    this.drawClashes();
    this.vp.render();
  }

  fit() {
    const box = new THREE.Box3();
    for (const o of this.objs.values()) if (o.mesh.visible) box.expandByObject(o.mesh);
    if (box.isEmpty()) return this.vp.fit([[-50, -50, 0], [50, 50, 50]]);
    this.vp.fit([box.min.toArray(), box.max.toArray()]);
  }

  // ----- references (faces / round edges), stored in the part's own coordinates -----
  refFromHit(hit, want) {
    const g = this.geo.get(this.comp(hit.comp).part);
    if (!g || !g.desc) return null;
    if (hit.kind === 'face') {
      const f = g.desc.faces[hit.index];
      if (f.type === 'PLANE' && (want === 'plane' || want === 'any')) return { comp: hit.comp, kind: 'plane', p: f.center.map(r4), n: f.normal.map(r4), label: 'flat face' };
      if (f.axis && (want === 'axis' || want === 'any')) return { comp: hit.comp, kind: 'axis', p: f.axis.p.map(r4), n: f.axis.d.map(r4), r: r4(f.axis.r), label: `round face Ø${fmt(2 * f.axis.r)}` };
      return null;
    }
    if (hit.kind === 'edge') {
      const e = g.desc.edges[hit.index];
      if (e.circle && (want === 'circle' || want === 'axis' || want === 'any')) return { comp: hit.comp, kind: 'axis', p: e.circle.c.map(r4), n: e.circle.n.map(r4), r: r4(e.circle.r), rim: true, label: `round edge Ø${fmt(2 * e.circle.r)}` };
    }
    return null;
  }
  worldRef(ref) {
    const c = this.comp(ref.comp);
    const M = this.matrixOf(c);
    const q = new THREE.Quaternion(...c.quat);
    return { p: V(ref.p).applyMatrix4(M), n: V(ref.n).applyQuaternion(q).normalize() };
  }
  // After a part is edited, find the same face/edge again (it may have moved or resized).
  refreshRefs(pid) {
    const g = this.geo.get(pid);
    if (!g || !g.desc || !this.asm) return;
    for (const con of this.asm.constraints) for (const ref of [con.a, con.b]) {
      const c = this.comp(ref.comp);
      if (!c || c.part !== pid) continue;
      let best = null, bd = Infinity;
      const n = V(ref.n);
      if (ref.kind === 'plane') {
        for (const f of g.desc.faces) {
          if (f.type !== 'PLANE' || V(f.normal).dot(n) < 0.999) continue;
          const d = Math.abs(V(f.center).sub(V(ref.p)).dot(n)) * 4 + V(f.center).distanceTo(V(ref.p));
          if (d < bd) { bd = d; best = { p: f.center, n: f.normal }; }
        }
      } else {
        const cands = [];
        for (const e of g.desc.edges) if (e.circle && (ref.rim || true)) cands.push({ p: e.circle.c, n: e.circle.n, r: e.circle.r, rim: true });
        for (const f of g.desc.faces) if (f.axis && !ref.rim) cands.push({ p: f.axis.p, n: f.axis.d, r: f.axis.r });
        for (const k of cands) {
          if (Math.abs(V(k.n).dot(n)) < 0.999 || !!k.rim !== !!ref.rim) continue;
          const d = V(k.p).distanceTo(V(ref.p)) + Math.abs(k.r - (ref.r || k.r)) * 2;
          if (d < bd) { bd = d; best = k; }
        }
      }
      if (best) {
        ref.p = best.p.map(r4);
        if (ref.kind === 'plane' || V(best.n).dot(n) > 0) ref.n = best.n.map(r4); else ref.n = best.n.map((v) => r4(-v));
        if (best.r) ref.r = r4(best.r);
        ref.lost = false;
      } else ref.lost = true;
    }
  }

  // ----- the constraint solver -----
  // Moves free parts, one constraint at a time, until every constraint is met
  // (or it stops getting better). A part that is "grounded" never moves.
  solve(iterations = 80) {
    const A = this.asm;
    if (!A) return;
    const cons = A.constraints.filter((c) => !c.suppressed && this.comp(c.a.comp) && this.comp(c.b.comp));
    for (let it = 0; it < iterations; it++) {
      let moved = 0;
      for (const con of cons) moved += this.applyOne(con);
      if (moved < 1e-9) break;
    }
    this.bad = {};
    for (const con of cons) {
      const e = this.residual(con);
      if (e > 1e-3) this.bad[con.id] = e;
    }
    for (const c of A.components) { c.pos = c.pos.map(r4); const q = new THREE.Quaternion(...c.quat).normalize(); c.quat = [q.x, q.y, q.z, q.w].map((v) => Math.round(v * 1e8) / 1e8); }
  }
  pickMover(con) {
    const ca = this.comp(con.a.comp), cb = this.comp(con.b.comp);
    if (ca === cb) return null;
    const lockedA = ca.grounded || this._dragging === ca.id, lockedB = cb.grounded || this._dragging === cb.id;
    if (!lockedB) return { mover: cb, mref: con.b, fref: con.a, sideB: true };
    if (!lockedA) return { mover: ca, mref: con.a, fref: con.b, sideB: false };
    return null;
  }
  rotateAbout(c, q, pivot) {
    const pos = V(c.pos).sub(pivot).applyQuaternion(q).add(pivot);
    const nq = q.clone().multiply(new THREE.Quaternion(...c.quat)).normalize();
    c.pos = pos.toArray();
    c.quat = [nq.x, nq.y, nq.z, nq.w];
  }
  applyOne(con) {
    const pm = this.pickMover(con);
    if (!pm) return 0;
    const { mover, mref, fref } = pm;
    const F = this.worldRef(fref);
    let M = this.worldRef(mref);
    let moved = 0;
    const off = num(con.offset);
    if (con.type === 'mate' || con.type === 'flush') {
      const target = con.type === 'mate' ? F.n.clone().negate() : F.n.clone();
      const q = new THREE.Quaternion().setFromUnitVectors(M.n, target);
      const ang = 2 * Math.acos(Math.min(1, Math.abs(q.w)));
      if (ang > 1e-10) { this.rotateAbout(mover, q, M.p); moved += ang * 10; M = this.worldRef(mref); }
      const d = M.p.clone().sub(F.p).dot(F.n);
      const want = pm.sideB ? off : (con.type === 'mate' ? off : -off);
      const t = want - d;
      if (Math.abs(t) > 1e-10) { mover.pos = V(mover.pos).addScaledVector(F.n, t).toArray(); moved += Math.abs(t); }
    } else if (con.type === 'angle') {
      // Turn the moving part about a hinge line so the two faces are at the set angle.
      const a = (off * Math.PI) / 180;
      const fixed = this.comp(fref.comp), fq = new THREE.Quaternion(...fixed.quat);
      if (!con.hinge || con.hinge.comp !== fixed.id) {
        const ax = new THREE.Vector3().crossVectors(F.n, M.n);
        if (ax.lengthSq() < 1e-12) ax.copy(Math.abs(F.n.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0)).cross(F.n);
        ax.normalize().applyQuaternion(fq.clone().invert());
        con.hinge = { comp: fixed.id, d: ax.toArray().map(r4) };
      }
      let hinge = V(con.hinge.d).applyQuaternion(fq);
      hinge = hinge.sub(F.n.clone().multiplyScalar(hinge.dot(F.n))).normalize();
      const wantN = F.n.clone().applyAxisAngle(hinge, pm.sideB ? a : -a);
      const q = new THREE.Quaternion().setFromUnitVectors(M.n, wantN);
      const ang = 2 * Math.acos(Math.min(1, Math.abs(q.w)));
      if (ang > 1e-10) { this.rotateAbout(mover, q, M.p); moved += ang * 10; }
    } else {
      const sign = con.sign || 1;
      const target = F.n.clone().multiplyScalar(pm.sideB ? sign : sign);
      const q = new THREE.Quaternion().setFromUnitVectors(M.n, target);
      const ang = 2 * Math.acos(Math.min(1, Math.abs(q.w)));
      if (ang > 1e-10) { this.rotateAbout(mover, q, M.p); moved += ang * 10; M = this.worldRef(mref); }
      const v = M.p.clone().sub(F.p);
      const along = v.dot(F.n);
      const perp = v.clone().addScaledVector(F.n, -along);
      let t = perp.clone().negate();
      if (con.type === 'insert') {
        const want = pm.sideB ? off : -off;
        t.addScaledVector(F.n, want - along);
      }
      if (t.length() > 1e-10) { mover.pos = V(mover.pos).add(t).toArray(); moved += t.length(); }
    }
    return moved;
  }
  residual(con) {
    const F = this.worldRef(con.a), M = this.worldRef(con.b);
    const off = num(con.offset);
    if (con.type === 'mate' || con.type === 'flush') {
      const nErr = con.type === 'mate' ? M.n.clone().add(F.n).length() : M.n.clone().sub(F.n).length();
      return nErr + Math.abs(M.p.clone().sub(F.p).dot(F.n) - off);
    }
    if (con.type === 'angle') {
      const a = (off * Math.PI) / 180;
      return Math.abs(Math.acos(Math.max(-1, Math.min(1, F.n.dot(M.n)))) - a);
    }
    const nErr = M.n.clone().sub(F.n.clone().multiplyScalar(con.sign || 1)).length();
    const v = M.p.clone().sub(F.p);
    const along = v.dot(F.n);
    let e = nErr + v.clone().addScaledVector(F.n, -along).length();
    if (con.type === 'insert') e += Math.abs(along - off);
    return e;
  }

  // ----- picking -----
  ray(ev) { return this.vp.ray(ev); }
  pick(ev, want = { faces: true, edges: false }) {
    const rc = this.ray(ev);
    const meshes = [...this.objs.values()].filter((o) => o.mesh.visible).map((o) => o.mesh);
    const fh = rc.intersectObjects(meshes, false);
    const faceHit = fh[0];
    if (want.edges) {
      const lines = [...this.objs.values()].filter((o) => o.mesh.visible).map((o) => o.edges);
      const vis = lines.map((l) => l.visible);
      lines.forEach((l) => (l.visible = true));
      const eh = rc.intersectObjects(lines, false);
      lines.forEach((l, i) => (l.visible = vis[i]));
      const tol = this.vp.pixelSize() * 8;
      const h = eh.find((x) => !faceHit || x.distance <= faceHit.distance + tol);
      if (h) {
        const comp = h.object.userData.comp;
        const g = this.geo.get(this.comp(comp).part);
        const idx = edgeAt(g.desc, h.index);
        if (idx >= 0 && (!want.circleOnly || g.desc.edges[idx].circle)) return { kind: 'edge', comp, index: idx, point: h.point.toArray() };
      }
    }
    if (faceHit && want.faces) {
      const comp = faceHit.object.userData.comp;
      const g = this.geo.get(this.comp(comp).part);
      return { kind: 'face', comp, index: faceAt(g.desc, faceHit.faceIndex), point: faceHit.point.toArray() };
    }
    if (faceHit) return { kind: 'comp', comp: faceHit.object.userData.comp, point: faceHit.point.toArray() };
    return null;
  }

  // items: [{kind:'face'|'edge', comp, index, color} | {kind:'point', point, color} | {kind:'ref', ref, color}]
  highlight(items) {
    this.vp.clearHighlights();
    for (const it of items) {
      if (it.kind === 'point' || it.kind === 'segment') { this.vp.addHighlight(it); continue; }
      const c = this.comp(it.comp || (it.ref && it.ref.comp));
      if (!c) continue;
      const g = this.geo.get(c.part);
      if (!g || !g.desc) continue;
      const M = this.matrixOf(c);
      if (it.kind === 'face') {
        const [start, count] = g.desc.faceGroups[it.index] || [0, 0];
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', g.geo.getAttribute('position'));
        geo.setIndex(Array.from(g.desc.triangles.subarray(start, start + count)));
        const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: it.color, transparent: true, opacity: 0.6, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }));
        m.matrixAutoUpdate = false; m.matrix.copy(M);
        this.vp.overlay.add(m);
      } else if (it.kind === 'edge') {
        const [start, count] = g.desc.edgeGroups[it.index] || [0, 0];
        const pts = [];
        for (let k = start; k < start + count; k++) pts.push(new THREE.Vector3(g.desc.lines[k * 3], g.desc.lines[k * 3 + 1], g.desc.lines[k * 3 + 2]));
        const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: it.color, depthTest: false }));
        l.matrixAutoUpdate = false; l.matrix.copy(M); l.renderOrder = 10;
        this.vp.overlay.add(l);
      } else if (it.kind === 'ref') {
        const W = this.worldRef(it.ref);
        const size = Math.max(6, (it.ref.r || 0) * 2.4, this.vp.pixelSize() * 40);
        if (it.ref.kind === 'plane') {
          const geo = new THREE.PlaneGeometry(size, size);
          const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: it.color, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthTest: false }));
          m.position.copy(W.p);
          m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), W.n);
          m.renderOrder = 9;
          this.vp.overlay.add(m);
        }
        const len = size * 0.8;
        const a = W.p.clone().addScaledVector(W.n, it.ref.kind === 'axis' ? -len : 0), b = W.p.clone().addScaledVector(W.n, len);
        const arrow = new THREE.Line(new THREE.BufferGeometry().setFromPoints([a, b]), new THREE.LineBasicMaterial({ color: it.color, depthTest: false }));
        arrow.renderOrder = 10;
        this.vp.overlay.add(arrow);
        this.vp.addHighlight({ kind: 'point', point: W.p.toArray(), color: it.color });
      }
    }
    this.drawClashes();
    this.vp.render();
  }
  drawClashes() {
    if (this.clashObj) { this.vp.scene.remove(this.clashObj); this.clashObj.traverse((o) => o.geometry && o.geometry.dispose()); this.clashObj = null; }
    if (!this.clashes.length || !this.group.visible) return;
    const g = new THREE.Group();
    for (const c of this.clashes) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(c.vertices, 3));
      geo.setIndex(new THREE.BufferAttribute(c.triangles, 1));
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xe03131, transparent: true, opacity: 0.85, depthTest: false, side: THREE.DoubleSide }));
      m.renderOrder = 12;
      // Clash shapes come back in millimetres; show them in assembly units.
      const k = 1 / (UNIT_MM[this.asm.units || 'mm'] || 1);
      m.scale.setScalar(k);
      g.add(m);
    }
    this.clashObj = g;
    this.vp.scene.add(g);
  }

  // ----- mouse in assembly mode -----
  onDown(e) {
    if (e.button !== 0) return;
    this._down = { x: e.clientX, y: e.clientY };
    if (this.app.cmd) return;
    const hit = this.pick(e, { faces: true });
    if (hit) {
      const c = this.comp(hit.comp);
      if (!c.grounded) {
        // Drag in the screen plane through the clicked point.
        const n = new THREE.Vector3();
        this.vp.camera.getWorldDirection(n);
        this._drag = { id: c.id, plane: new THREE.Plane().setFromNormalAndCoplanarPoint(n, V(hit.point)), last: V(hit.point), moved: false };
        this.app.beginChange();
        this.vp.controls.enabled = false;
      }
    }
  }
  onMove(e) {
    if (this._drag) {
      const rc = this.ray(e);
      const p = new THREE.Vector3();
      if (!rc.ray.intersectPlane(this._drag.plane, p)) return;
      const d = p.clone().sub(this._drag.last);
      this._drag.last = p;
      const c = this.comp(this._drag.id);
      c.pos = V(c.pos).add(d).toArray();
      this._drag.moved = true;
      this._dragging = c.id;
      this.solve(40);
      this._dragging = null;
      this.solve(40);
      this.render();
      return;
    }
    const cmd = this.app.cmd;
    const want = cmd && cmd.want ? cmd.want : { faces: true };
    const hit = this.pick(e, want);
    const key = hit ? hit.comp + hit.kind + (hit.index ?? '') : '';
    if (key !== (this.hover ? this.hover.key : '')) {
      this.hover = hit ? { ...hit, key } : null;
      this.vp.renderer.domElement.style.cursor = hit ? (cmd ? 'pointer' : 'grab') : 'default';
      this.render();
      this.refreshHighlights();
    }
  }
  onUp(e) {
    if (e.button !== 0) return;
    const down = this._down;
    this._down = null;
    if (this._drag) {
      const moved = this._drag.moved;
      this._drag = null;
      this.vp.controls.enabled = true;
      if (moved) { this.app.endChange(); return; }
      this.app.abortChange();
    }
    if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 5) return;
    const cmd = this.app.cmd;
    if (cmd && cmd.onPick) { cmd.onPick(this.pick(e, cmd.want || { faces: true }), e); return; }
    const hit = this.pick(e, { faces: true });
    this.sel = hit ? hit.comp : null;
    this.render();
    this.app.ui.renderTree();
    if (hit) this.app.status(`${this.comp(hit.comp).name}: drag to move it, double-click it in the tree to edit the part. ${this.comp(hit.comp).grounded ? 'It is grounded (fixed in place).' : ''}`);
  }
  refreshHighlights() {
    const items = [];
    const cmd = this.app.cmd;
    if (cmd && cmd.highlights) items.push(...cmd.highlights());
    const h = this.hover;
    if (h && cmd && cmd.want) {
      if (h.kind === 'face') items.push({ kind: 'face', comp: h.comp, index: h.index, color: 0x2ec4b6 });
      else if (h.kind === 'edge') items.push({ kind: 'edge', comp: h.comp, index: h.index, color: 0xff8c1a });
    }
    this.highlight(items);
  }

  // ----- editing the assembly -----
  newId(prefix) { const id = prefix + this.asm.nextId; this.asm.nextId++; return id; }
  uniqueName(base) {
    let n = 1;
    const names = new Set([...this.asm.components.map((c) => c.name), ...this.asm.constraints.map((c) => c.name)]);
    while (names.has(`${base}:${n}`)) n++;
    return `${base}:${n}`;
  }
  // Where a new part goes: beside everything already placed.
  freeSpot() {
    const box = new THREE.Box3();
    for (const o of this.objs.values()) box.expandByObject(o.mesh);
    if (box.isEmpty()) return [0, 0, 0];
    return [r4(box.max.x + 20), r4((box.min.y + box.max.y) / 2), r4(box.min.z)];
  }
  addPart(partDoc, opts = {}) {
    const pid = opts.pid || this.newId('p');
    const doc = opts.pid ? this.asm.parts[pid] : clone(partDoc);
    if (!opts.pid) delete doc.kind;
    this.app.change(() => {
      if (!opts.pid) this.asm.parts[pid] = doc;
      const first = !this.asm.components.length;
      const c = { id: this.newId('c'), name: this.uniqueName(doc.name || 'Part'), part: pid, pos: first ? [0, 0, 0] : this.freeSpot(), quat: [0, 0, 0, 1], grounded: first, hidden: false };
      this.asm.components.push(c);
      this.sel = c.id;
    });
    return pid;
  }
  deleteComp(id) {
    const c = this.comp(id);
    const cons = this.asm.constraints.filter((x) => x.a.comp === id || x.b.comp === id);
    if (cons.length && !confirm(`Removing ${c.name} also removes ${cons.length} constraint(s) on it. Go ahead?`)) return;
    this.app.change(() => {
      this.asm.components = this.asm.components.filter((x) => x.id !== id);
      this.asm.constraints = this.asm.constraints.filter((x) => x.a.comp !== id && x.b.comp !== id);
      if (!this.asm.components.some((x) => x.part === c.part)) delete this.asm.parts[c.part];
    });
    if (this.sel === id) this.sel = null;
  }
  rotateComp(id, axis, deg) {
    const c = this.comp(id);
    if (!c) return;
    const o = this.objs.get(id);
    const box = new THREE.Box3().expandByObject(o.mesh);
    const center = box.getCenter(new THREE.Vector3());
    const q = new THREE.Quaternion().setFromAxisAngle(V(axis === 'X' ? [1, 0, 0] : axis === 'Y' ? [0, 1, 0] : [0, 0, 1]), (deg * Math.PI) / 180);
    this.app.change(() => { this.rotateAbout(c, q, center); });
  }

  // ----- tree -----
  renderTree(tree) {
    const A = this.asm;
    let html = `<div class="trow root">${icon('assembly', 16)}<b>${esc(A.name)}</b></div>`;
    html += `<div class="trow sub groupHead">${icon('part', 16)}<span>Parts placed (${A.components.length})</span></div>`;
    if (!A.components.length) html += `<div class="tempty">Use <b>Place</b> on the Assemble tab to bring in a part.</div>`;
    for (const c of A.components) {
      const g = this.geo.get(c.part);
      const err = g && Object.keys(g.errors || {}).length;
      const cls = ['trow', 'feat', 'comp', this.sel === c.id ? 'sel' : '', c.hidden ? 'supp' : '', err ? 'bad' : ''].join(' ');
      html += `<div class="${cls}" data-comp="${c.id}" title="Click to pick. Double-click to edit the part. Right-click for more.">${icon('part', 16)}<span class="tname">${esc(c.name)}</span>${c.grounded ? `<span class="tpin" title="Grounded: fixed in place">${icon('pin', 13)}</span>` : ''}${err ? `<span class="tbad">${icon('err', 14)}</span>` : ''}</div>`;
    }
    html += `<div class="trow sub groupHead">${icon('mate', 16)}<span>Constraints (${A.constraints.length})</span></div>`;
    for (const con of A.constraints) {
      const ca = this.comp(con.a.comp), cb = this.comp(con.b.comp);
      const bad = this.bad[con.id] != null || con.a.lost || con.b.lost;
      const cls = ['trow', 'feat', 'con', con.suppressed ? 'supp' : '', bad ? 'bad' : '', this.selCon === con.id ? 'sel' : ''].join(' ');
      const why = con.a.lost || con.b.lost ? 'A face or edge it used is gone after a part change. Delete it and add it again.' : bad ? 'This constraint cannot be met together with the others. Check the offsets, flip it, or remove one.' : 'Double-click to change. Right-click for more.';
      html += `<div class="${cls}" data-con="${con.id}" title="${esc(why)}">${icon(CONSTRAINT_INFO[con.type].icon, 16)}<span class="tname">${esc(con.name)}</span><span class="tmeta">${esc(ca ? ca.name : '?')} ↔ ${esc(cb ? cb.name : '?')}</span>${bad ? `<span class="tbad">${icon('err', 14)}</span>` : ''}</div>`;
    }
    tree.innerHTML = html;
    for (const row of tree.querySelectorAll('[data-comp]')) {
      const id = row.dataset.comp;
      row.onclick = (e) => { e.stopPropagation(); this.sel = id; this.selCon = null; this.render(); this.renderTree(tree); };
      row.ondblclick = (e) => { e.stopPropagation(); this.app.editPart(this.comp(id).part); };
      row.oncontextmenu = (e) => { e.preventDefault(); e.stopPropagation(); this.sel = id; this.render(); this.renderTree(tree); this.compMenu(id, e.clientX, e.clientY); };
    }
    for (const row of tree.querySelectorAll('[data-con]')) {
      const id = row.dataset.con;
      row.onclick = (e) => { e.stopPropagation(); this.selCon = id; this.renderTree(tree); const con = A.constraints.find((x) => x.id === id); this.highlight([{ kind: 'ref', ref: con.a, color: 0x1b9aaa }, { kind: 'ref', ref: con.b, color: 0xe8590c }]); };
      row.ondblclick = (e) => { e.stopPropagation(); this.app.run('constrain', { edit: id }); };
      row.oncontextmenu = (e) => { e.preventDefault(); e.stopPropagation(); this.conMenu(id, e.clientX, e.clientY); };
    }
  }
  compMenu(id, x, y) {
    const c = this.comp(id), ui = this.app.ui;
    ui.menu([
      ['Edit part', () => this.app.editPart(c.part)],
      ['Move / turn', () => this.app.run('moveComp', { id })],
      ['Rename', () => ui.askText('Rename', c.name, (n) => this.app.change(() => { this.comp(id).name = n; }))],
      [c.grounded ? 'Unground (let it move)' : 'Ground (fix in place)', () => this.app.change(() => { this.comp(id).grounded = !this.comp(id).grounded; })],
      [c.hidden ? 'Show' : 'Hide', () => this.app.change(() => { this.comp(id).hidden = !this.comp(id).hidden; })],
      ['Place another copy', () => { this.addPart(null, { pid: c.part }); }],
      ['Remove', () => this.deleteComp(id), 'danger'],
    ], x, y);
  }
  conMenu(id, x, y) {
    const con = this.asm.constraints.find((c) => c.id === id);
    this.app.ui.menu([
      ['Edit', () => this.app.run('constrain', { edit: id })],
      ['Flip', () => this.app.change(() => { const k = this.asm.constraints.find((c) => c.id === id); if (k.type === 'mate' || k.type === 'flush') k.type = k.type === 'mate' ? 'flush' : 'mate'; else k.sign = -(k.sign || 1); })],
      [con.suppressed ? 'Turn on' : 'Turn off (suppress)', () => this.app.change(() => { const k = this.asm.constraints.find((c) => c.id === id); k.suppressed = !k.suppressed; })],
      ['Delete', () => this.app.change(() => { this.asm.constraints = this.asm.constraints.filter((c) => c.id !== id); }), 'danger'],
    ], x, y);
  }

  // ----- parts list / info -----
  openPartsList() {
    const A = this.asm, MATERIALS = this.app.materials;
    const rows = new Map();
    for (const c of A.components) {
      const r = rows.get(c.part) || { pid: c.part, qty: 0 };
      r.qty++;
      rows.set(c.part, r);
    }
    let total = 0, n = 0;
    const body = [...rows.values()].map((r) => {
      n++;
      const doc = A.parts[r.pid], g = this.geo.get(r.pid), mat = MATERIALS[doc.material] || MATERIALS.pla;
      const k = UNIT_MM[doc.units || 'mm'];
      const mass = g && g.desc ? ((g.desc.volume * k * k * k) / 1000) * mat.density : 0;
      total += mass * r.qty;
      const size = g && g.desc ? g.desc.bb[1].map((v, i) => fmt(v - g.desc.bb[0][i])).join(' × ') + ' ' + (doc.units || 'mm') : '';
      return `<tr><td>${n}</td><td><b>${esc(doc.name)}</b></td><td>${r.qty}</td><td>${esc(mat.name)}</td><td>${esc(size)}</td><td>${fmtMass(mass)}</td><td>${fmtMass(mass * r.qty)}</td></tr>`;
    }).join('');
    this.app.ui.modal(`<h2>${icon('bom', 22)} Parts list: ${esc(A.name)}</h2>
      <table class="ptable bom"><thead><tr><th>#</th><th>Part</th><th>Qty</th><th>Material</th><th>Size</th><th>Mass each</th><th>Mass total</th></tr></thead><tbody>${body || '<tr><td colspan="7" class="muted">No parts yet.</td></tr>'}</tbody></table>
      <p><b>Total mass: ${fmtMass(total)}</b> · ${A.components.length} parts placed, ${rows.size} different</p>
      <p><button id="bomCsv">Download as a spreadsheet (.csv)</button></p>`, 'wide');
    $('#bomCsv').onclick = () => {
      const lines = [['Item', 'Part', 'Qty', 'Material', 'Mass each (g)']];
      let i = 0;
      for (const r of rows.values()) { i++; const doc = A.parts[r.pid], g = this.geo.get(r.pid), mat = MATERIALS[doc.material] || MATERIALS.pla; const k = UNIT_MM[doc.units || 'mm']; lines.push([i, doc.name, r.qty, mat.name, g && g.desc ? (((g.desc.volume * k * k * k) / 1000) * mat.density).toFixed(2) : '']); }
      this.app.download(this.app.safeName() + ' parts list.csv', lines.map((l) => l.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\r\n'), 'text/csv');
    };
  }

  async checkInterference() {
    const A = this.asm;
    if (A.components.length < 2) return this.app.toast('Place at least two parts first.');
    this.app.toast('Checking where parts overlap…');
    const comps = A.components.filter((c) => !c.hidden).map((c) => ({ id: c.id, part: c.part, pos: c.pos.map((v) => v * (UNIT_MM[A.units || 'mm'])), quat: c.quat }));
    const m = await this.app.send({ type: 'interference', parts: A.parts, comps, scale: 1 });
    if (m.type === 'error') return this.app.toast('Check failed: ' + m.msg, 'error');
    this.clashes = m.found;
    this.render();
    const u = A.units || 'mm', k = UNIT_MM[u];
    const list = m.found.map((f) => `<li><b>${esc(this.comp(f.a).name)}</b> and <b>${esc(this.comp(f.b).name)}</b> overlap by ${fmt(f.volume / (k * k * k))} ${u}³</li>`).join('');
    this.app.ui.modal(`<h2>${icon('clash', 22)} Interference check</h2>${m.found.length ? `<p>These parts run into each other. The overlap is shown in <b style="color:#e03131">red</b>. Real parts could not be put together like this.</p><ul>${list}</ul>` : '<p class="good"><b>✔ No parts overlap.</b> Everything fits.</p>'}<p class="muted">Touching faces (a mate with no gap) do not count as overlap.</p><div class="welcomebtns"><button id="clashClear">Clear the red marks</button></div>`, '', null);
    $('#clashClear').onclick = () => { this.clashes = []; this.render(); this.app.ui.closeModal(); };
  }
}

function fmtMass(g) { return g >= 1000 ? fmt(g / 1000) + ' kg' : fmt(g) + ' g'; }
function faceAt(desc, triIndex) {
  const pos = triIndex * 3;
  const fg = desc.faceGroups;
  for (let i = 0; i < fg.length; i++) if (pos >= fg[i][0] && pos < fg[i][0] + fg[i][1]) return i;
  return -1;
}
function edgeAt(desc, vertIndex) {
  const eg = desc.edgeGroups;
  for (let i = 0; i < eg.length; i++) if (vertIndex >= eg[i][0] && vertIndex < eg[i][0] + eg[i][1]) return i;
  return -1;
}

// ----- assembly commands (shown in the same side panel as part commands) -----
export const ASM_COMMANDS = {
  place(app) { app.asmr.placeDialog(); return null; },

  constrain(app, arg) {
    const asmr = app.asmr, A = app.asm;
    if (A.components.length < 2) { app.toast('Place at least two parts first.', 'error'); return null; }
    let con;
    let editIdx = null;
    if (arg && arg.edit) { editIdx = A.constraints.findIndex((c) => c.id === arg.edit); con = clone(A.constraints[editIdx]); }
    else con = { id: asmr.newId('k'), type: (arg && arg.type) || 'mate', name: '', a: null, b: null, offset: 0, sign: 1 };
    const before = JSON.stringify(A.components);
    const restore = () => { const saved = JSON.parse(before); for (const c of A.components) { const s = saved.find((x) => x.id === c.id); if (s) { c.pos = s.pos; c.quat = s.quat; } } };
    const wantOf = () => { const w = CONSTRAINT_INFO[con.type].want; return w === 'plane' ? { faces: true } : w === 'circle' ? { edges: true, circleOnly: true } : { faces: true, edges: true, circleOnly: true }; };
    const preview = () => {
      restore();
      if (con.a && con.b) {
        const orig = A.constraints;
        A.constraints = orig.filter((c) => c.id !== con.id).concat([con]);
        asmr.solve();
        A.constraints = orig;
      }
      asmr.render();
      app.refreshHighlights();
    };
    const cmd = {
      title: editIdx != null ? 'Edit ' + con.name : 'Constrain',
      get help() { return CONSTRAINT_INFO[con.type].help; },
      noPreviewBuild: true,
      get want() { return wantOf(); },
      fields: () => [
        { key: 'type', label: 'Type', type: 'select', options: Object.entries(CONSTRAINT_INFO).map(([k, v]) => [k, v.label]), onChange: () => { con.a = null; con.b = null; con.hinge = null; restore(); asmr.render(); } },
        { type: 'html', html: `<div class="picks"><div class="${con.a ? 'done' : 'now'}"><b>1</b> ${con.a ? esc(asmr.comp(con.a.comp).name + ': ' + con.a.label) : 'Click a ' + pickWord(con.type) + ' on the part that stays put'}</div><div class="${con.b ? 'done' : con.a ? 'now' : ''}"><b>2</b> ${con.b ? esc(asmr.comp(con.b.comp).name + ': ' + con.b.label) : 'Click a ' + pickWord(con.type) + ' on the part to move'}</div></div>` },
        { key: 'offset', label: con.type === 'angle' ? 'Angle (°)' : `Offset / gap (${A.units || 'mm'})`, type: 'expr' },
        con.type === 'insert' || con.type === 'axis' ? { type: 'buttons', items: [['Flip direction', () => { con.sign = -(con.sign || 1); preview(); app.ui.refreshCmd(); }]] } : con.type !== 'angle' ? { type: 'buttons', items: [[con.type === 'mate' ? 'Flip (make it Flush)' : 'Flip (make it Mate)', () => { con.type = con.type === 'mate' ? 'flush' : 'mate'; preview(); app.ui.refreshCmd(); }]] } : null,
        con.a || con.b ? { type: 'buttons', items: [['Pick again', () => { con.a = null; con.b = null; con.hinge = null; restore(); asmr.render(); app.ui.refreshCmd(); app.refreshHighlights(); }]] } : null,
      ].filter(Boolean),
      target: con,
      onField: () => preview(),
      onPick(hit) {
        if (!hit) return;
        const ref = asmr.refFromHit(hit, CONSTRAINT_INFO[con.type].want);
        if (!ref) { app.toast(`Pick a ${pickWord(con.type)}.`, 'error'); return; }
        if (!con.a) con.a = ref;
        else if (!con.b) {
          if (ref.comp === con.a.comp) { app.toast('Pick the second one on a different part.', 'error'); return; }
          con.b = ref;
          if (con.type === 'insert' || con.type === 'axis') {
            const Wa = asmr.worldRef(con.a), Wb = asmr.worldRef(con.b);
            con.sign = Wa.n.dot(Wb.n) >= 0 ? 1 : -1;
            // An insert usually goes in from opposite sides.
            if (con.type === 'insert') con.sign = -1;
          }
          if (con.type === 'angle' && !num(con.offset)) con.offset = 90;
        } else return;
        app.ui.refreshCmd();
        preview();
      },
      highlights: () => [con.a && { kind: 'ref', ref: con.a, color: 0x1b9aaa }, con.b && { kind: 'ref', ref: con.b, color: 0xe8590c }].filter(Boolean),
      validate: () => (!con.a || !con.b ? 'Pick both parts first.' : null),
      ok() {
        restore();
        if (!con.name) { let n = 1; while (A.constraints.some((c) => c.name === CONSTRAINT_INFO[con.type].label + n)) n++; con.name = CONSTRAINT_INFO[con.type].label + n; }
        app.change(() => {
          if (editIdx != null) A.constraints[editIdx] = con; else A.constraints.push(con);
          asmr.solve();
        });
        if (asmr.bad[con.id] != null) app.toast(`${con.name} cannot be met together with the other constraints. Try Flip, a different offset, or unground a part.`, 'error');
      },
      cancel() { restore(); asmr.render(); },
    };
    return cmd;
  },

  moveComp(app, arg) {
    const asmr = app.asmr;
    const id = (arg && arg.id) || asmr.sel;
    const c = id && asmr.comp(id);
    if (!c) { app.toast('Click a part first, then Move.', 'error'); return null; }
    const u = app.asm.units || 'mm';
    const t = { x: c.pos[0], y: c.pos[1], z: c.pos[2] };
    const rot = (axis, deg) => { asmr.rotateComp(c.id, axis, deg); Object.assign(t, { x: c.pos[0], y: c.pos[1], z: c.pos[2] }); app.ui.refreshCmd(); };
    return {
      title: 'Move ' + c.name,
      help: 'Turn the part in 90° steps or type where it goes. Constraints still apply, so a constrained part may snap back.',
      noOk: true, closeLabel: 'Done',
      target: t,
      fields: () => [
        { type: 'buttons', label: 'Turn 90° around', items: [['X', () => rot('X', 90)], ['Y', () => rot('Y', 90)], ['Z', () => rot('Z', 90)], ['−X', () => rot('X', -90)], ['−Y', () => rot('Y', -90)], ['−Z', () => rot('Z', -90)]] },
        { key: 'x', label: `Position X (${u})`, type: 'expr' },
        { key: 'y', label: `Position Y (${u})`, type: 'expr' },
        { key: 'z', label: `Position Z (${u})`, type: 'expr' },
        { type: 'note', text: c.grounded ? 'This part is grounded (fixed). Moving it moves everything constrained to it.' : 'Tip: you can also drag a part with the left mouse button.' },
      ],
      onField: () => {
        const v = [t.x, t.y, t.z].map(num);
        if (v.some((n) => !Number.isFinite(n))) return;
        app.change(() => { c.pos = v; asmr.solve(); });
      },
      highlights: () => [],
    };
  },

  measure(app) {
    const asmr = app.asmr;
    const pts = [];
    let info = 'Click a spot on a part, then a second spot. Click a round edge to see its diameter.';
    const u = app.asm.units || 'mm';
    return {
      title: 'Measure', help: 'Straight-line distance between two clicked points.',
      want: { faces: true, edges: true }, noOk: true, closeLabel: 'Done',
      fields: () => [{ type: 'html', html: info }],
      onPick(hit) {
        if (!hit) return;
        let extra = '';
        if (hit.kind === 'edge') {
          const ref = asmr.refFromHit(hit, 'circle');
          if (ref) extra = `Round edge: <b>Ø ${fmt(2 * ref.r * asmr.scaleOf(asmr.comp(hit.comp).part))} ${u}</b>`;
        }
        if (pts.length >= 2) pts.length = 0;
        pts.push(hit.point);
        const a = pts[0], b = pts[1];
        info = pts.length === 1 ? `First point picked.<br>${extra}<br>Now click a second point.` : `Distance: <b class="big">${fmt(Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]))} ${u}</b><br>X: ${fmt(Math.abs(b[0] - a[0]))} &nbsp; Y: ${fmt(Math.abs(b[1] - a[1]))} &nbsp; Z: ${fmt(Math.abs(b[2] - a[2]))}<br>${extra}`;
        app.ui.refreshCmd(); app.refreshHighlights();
      },
      highlights: () => [...pts.map((p) => ({ kind: 'point', point: p, color: 0xe8590c })), ...(pts.length === 2 ? [{ kind: 'segment', points: pts, color: 0xe8590c }] : [])],
    };
  },
};

function pickWord(type) {
  const w = CONSTRAINT_INFO[type].want;
  return w === 'plane' ? 'flat face' : w === 'circle' ? 'round edge' : 'round edge or round face';
}

// Place dialog: bring a part in from a file, an example, the current part, or a copy.
Assembler.prototype.placeDialog = function () {
  const app = this.app, A = this.asm;
  const used = [...new Set(A.components.map((c) => c.part))];
  app.ui.modal(`<h2>${icon('place', 22)} Place a part</h2>
    <div class="excards">
      <button class="excard" id="plFile"><b>From a part file…</b><span>Pick a .pcad file you saved.</span></button>
      <button class="excard" id="plNew"><b>New part</b><span>Start an empty part inside this assembly and design it here.</span></button>
      ${used.map((pid) => `<button class="excard" data-copy="${pid}"><b>Another ${esc(this.partName(pid))}</b><span>A copy of a part already here (both change together).</span></button>`).join('')}
      ${EXAMPLES.map((e, i) => `<button class="excard" data-ex="${i}"><b>Example: ${esc(e.title)}</b><span>${esc(e.about.split('.')[0])}.</span></button>`).join('')}
    </div>`, 'wide');
  $('#plFile').onclick = () => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.pcad,.json'; inp.multiple = true;
    inp.onchange = async () => {
      for (const file of inp.files) {
        try {
          const d = JSON.parse(await file.text());
          if (!d || !Array.isArray(d.features)) throw new Error(file.name + ' is not a Pathway CAD part file');
          this.addPart(d);
        } catch (e) { app.toast('Could not place: ' + e.message, 'error'); }
      }
      app.ui.closeModal();
    };
    inp.click();
  };
  $('#plNew').onclick = () => {
    app.ui.closeModal();
    const doc = app.blankPart();
    let n = 1; while (Object.values(A.parts).some((p) => p.name === 'Part' + n)) n++;
    doc.name = 'Part' + n;
    doc.units = A.units || 'mm';
    const pid = this.addPart(doc);
    app.editPart(pid);
  };
  for (const b of document.querySelectorAll('#modal [data-copy]')) b.onclick = () => { app.ui.closeModal(); this.addPart(null, { pid: b.dataset.copy }); };
  for (const b of document.querySelectorAll('#modal [data-ex]')) b.onclick = () => { app.ui.closeModal(); this.addPart(EXAMPLES[+b.dataset.ex].doc); };
};
