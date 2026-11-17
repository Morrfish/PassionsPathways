// 2D sketching on a plane inside the 3D view.
import * as THREE from 'three';
import { evalSketch, buildLoops, arcFrom3, arcPoint, arcSweep } from './sketch.js';
import { evaluate, fmt } from './expr.js';

const C = { line: 0x16457a, cons: 0xd9822b, sel: 0xe8590c, hover: 0x12a39a, err: 0xd62f2f, open: 0xd62f2f, pt: 0x16457a, fill: 0x2ec4b6, preview: 0x12a39a };
const r3 = (n) => Math.round(n * 1000) / 1000;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const isNum = (x) => typeof x === 'number' || (typeof x === 'string' && /^\s*-?\d*\.?\d+(e-?\d+)?\s*$/i.test(x));
const num = (x, P) => { try { return evaluate(x, P); } catch { return NaN; } };

export const TOOL_HINTS = {
  select: 'Click a shape to pick it. Drag a dot to move a point. Click a blue number to change it. Delete removes.',
  line: 'Click to start, keep clicking for more lines. Click the first point to close. Esc or right-click stops.',
  rect: 'Click one corner, then the opposite corner.',
  circle: 'Click the center, then click to set the size.',
  arc: 'Click the start, then the end, then a point the arc should pass through.',
  polygon: 'Click the center, then a corner.',
  slot: 'Click one end center, then the other end center, then set the width.',
};

export class Sketcher {
  constructor(app) {
    this.app = app;
    this.vp = app.vp;
    this.group = this.vp.sketchGroup;
    this.labelsEl = document.getElementById('dimLayer');
    this.active = false;
    this.tool = 'select';
    this.temp = [];
    this.sel = new Set();
    this.hover = null;
    this.cursor = null;
    this.polySides = 6;
    this.gridOn = true;
    this.labels = [];
    this.vp.onBeforeRender = () => this.active && this.placeLabels();
    const cv = this.vp.renderer.domElement;
    cv.addEventListener('pointermove', (e) => this.active && this.onMove(e));
    cv.addEventListener('pointerdown', (e) => this.active && this.onDown(e));
    cv.addEventListener('pointerup', (e) => this.active && this.onUp(e));
    cv.addEventListener('contextmenu', (e) => { if (this.active) { e.preventDefault(); } });
    this.vp.controls.addEventListener('change', () => this.active && this.drawGrid());
  }

  get feature() { return this.app.sketchFeature(); }
  get P() { return this.app.params(); }

  enter(plane) {
    this.active = true;
    this.plane = plane;
    const x = new THREE.Vector3(...plane.xDir), n = new THREE.Vector3(...plane.normal);
    const y = new THREE.Vector3().crossVectors(n, x);
    this.m = new THREE.Matrix4().makeBasis(x, y, n).setPosition(...plane.origin);
    this.mInv = this.m.clone().invert();
    this.group.matrixAutoUpdate = false;
    this.group.matrix.copy(this.m);
    this.group.matrixWorldNeedsUpdate = true;
    this.three = new THREE.Plane().setFromNormalAndCoplanarPoint(n, new THREE.Vector3(...plane.origin));
    this.vp.controls.enableRotate = false;
    this.vp.controls.mouseButtons = { LEFT: null, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.PAN };
    this.vp.grid.visible = false;
    this.lookAt();
    this.setTool('line');
    this.redraw();
  }

  lookAt() {
    const n = new THREE.Vector3(...this.plane.normal);
    const y = new THREE.Vector3().crossVectors(n, new THREE.Vector3(...this.plane.xDir));
    // Frame the sketch (or 100 mm around the origin).
    const pts = [];
    for (const it of this.evals || []) if (it.g) for (const s of it.g.segs) pts.push(s.a, s.b);
    let cx = 0, cy = 0, size = 100;
    if (pts.length) {
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      cx = (Math.min(...xs) + Math.max(...xs)) / 2; cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      size = Math.max(20, (Math.max(...xs) - Math.min(...xs)) * 1.4, (Math.max(...ys) - Math.min(...ys)) * 1.4);
    }
    const t = new THREE.Vector3(cx, cy, 0).applyMatrix4(this.m);
    this.vp.viewHeight = size;
    this.vp.camera.zoom = 1;
    this.vp.updateFrustum();
    this.vp.lookAlong(n, y, t);
  }

  exit() {
    this.active = false;
    this.temp = [];
    this.sel.clear();
    for (const c of [...this.group.children]) { this.group.remove(c); c.geometry && c.geometry.dispose(); }
    this.labelsEl.innerHTML = '';
    this.labels = [];
    this.vp.controls.enableRotate = true;
    this.vp.controls.mouseButtons = { LEFT: null, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
    this.vp.grid.visible = true;
    this.vp.render();
  }

  setTool(t) {
    this.tool = t;
    this.temp = [];
    this.app.ui.sketchToolChanged(t);
    this.app.status(TOOL_HINTS[t] || '');
    this.redraw();
  }

  entities() { return this.feature.entities; }

  // ----- coordinates & snapping -----
  local(ev) {
    const rc = this.vp.ray(ev);
    const hit = new THREE.Vector3();
    if (!rc.ray.intersectPlane(this.three, hit)) return null;
    hit.applyMatrix4(this.mInv);
    return [hit.x, hit.y];
  }
  gridStep() {
    const px = this.vp.pixelSize();
    for (const s of [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500]) if (s / px >= 14) return s;
    return 1000;
  }
  snapPoints() {
    const out = [{ p: [0, 0], kind: 'origin' }];
    for (const it of this.evals || []) {
      if (!it.g) continue;
      const e = it.e;
      if (e.type === 'line') { const s = it.g.segs[0]; out.push({ p: s.a, kind: 'end' }, { p: s.b, kind: 'end' }, { p: [(s.a[0] + s.b[0]) / 2, (s.a[1] + s.b[1]) / 2], kind: 'mid' }); }
      else if (e.type === 'arc') { const s = it.g.segs[0]; out.push({ p: s.a, kind: 'end' }, { p: s.b, kind: 'end' }, { p: it.g.center, kind: 'center' }); }
      else if (e.type === 'circle') out.push({ p: it.g.circle.c, kind: 'center' });
      else if (e.type === 'rect' || e.type === 'polygon') { for (const s of it.g.segs) out.push({ p: s.a, kind: 'end' }, { p: [(s.a[0] + s.b[0]) / 2, (s.a[1] + s.b[1]) / 2], kind: 'mid' }); if (e.type === 'polygon') out.push({ p: [num(e.cx, this.P), num(e.cy, this.P)], kind: 'center' }); }
      else if (e.type === 'slot') out.push({ p: [num(e.x1, this.P), num(e.y1, this.P)], kind: 'center' }, { p: [num(e.x2, this.P), num(e.y2, this.P)], kind: 'center' });
    }
    return out;
  }
  snap(p, from, ev) {
    const px = this.vp.pixelSize();
    let best = null, bd = 10 * px;
    for (const s of this.snapPoints()) {
      const d = Math.hypot(s.p[0] - p[0], s.p[1] - p[1]);
      if (d < bd) { bd = d; best = s; }
    }
    if (best) return { p: [...best.p], kind: best.kind };
    let q = [...p];
    let kind = null;
    if (this.gridOn && !(ev && ev.altKey)) { const g = this.gridStep() / 2; q = [Math.round(q[0] / g) * g, Math.round(q[1] / g) * g]; }
    if (from) {
      const dx = q[0] - from[0], dy = q[1] - from[1];
      const ang = Math.abs((Math.atan2(dy, dx) * 180) / Math.PI);
      if (Math.abs(dy) < 1e-9 || ang < 4 || ang > 176) { q[1] = from[1]; kind = 'horizontal'; }
      else if (Math.abs(ang - 90) < 4) { q[0] = from[0]; kind = 'vertical'; }
    }
    return { p: [r3(q[0]), r3(q[1])], kind };
  }

  // ----- hit testing on entities -----
  distToSeg(p, s) {
    if (s.type === 'line') {
      const [ax, ay] = s.a, [bx, by] = s.b;
      const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy || 1;
      const t = Math.max(0, Math.min(1, ((p[0] - ax) * dx + (p[1] - ay) * dy) / L));
      return Math.hypot(p[0] - ax - t * dx, p[1] - ay - t * dy);
    }
    const d = Math.abs(Math.hypot(p[0] - s.c[0], p[1] - s.c[1]) - s.r);
    const a = (Math.atan2(p[1] - s.c[1], p[0] - s.c[0]) * 180) / Math.PI;
    if (arcSweep(s.a1, a) <= arcSweep(s.a1, s.a2) + 1e-6) return d;
    return Math.min(Math.hypot(p[0] - s.a[0], p[1] - s.a[1]), Math.hypot(p[0] - s.b[0], p[1] - s.b[1]));
  }
  entityAt(p) {
    const tol = 8 * this.vp.pixelSize();
    let best = null, bd = tol;
    for (const it of this.evals || []) {
      if (!it.g) continue;
      for (const s of it.g.segs) { const d = this.distToSeg(p, s); if (d < bd) { bd = d; best = it.e; } }
    }
    return best;
  }
  // Movable points of an entity: [{key, get(), set(x,y)}]
  handles(e) {
    const P = this.P;
    const pt = (kx, ky) => ({ e, kx, ky, p: [num(e[kx], P), num(e[ky], P)] });
    switch (e.type) {
      case 'line': return [pt('x1', 'y1'), pt('x2', 'y2')];
      case 'arc': return [pt('x1', 'y1'), pt('x2', 'y2'), pt('xm', 'ym')];
      case 'circle': case 'polygon': return [pt('cx', 'cy')];
      case 'slot': return [pt('x1', 'y1'), pt('x2', 'y2')];
      case 'rect': return [pt('x', 'y')];
    }
    return [];
  }
  handleAt(p) {
    const tol = 8 * this.vp.pixelSize();
    let best = null, bd = tol;
    for (const e of this.entities()) for (const h of this.handles(e)) {
      const d = Math.hypot(h.p[0] - p[0], h.p[1] - p[1]);
      if (d < bd) { bd = d; best = h; }
    }
    return best;
  }
  // All handles sitting on the same spot (so joined lines stay joined).
  coincident(p, except) {
    const out = [];
    for (const e of this.entities()) for (const h of this.handles(e)) {
      if (except && h.e === except.e && h.kx === except.kx) continue;
      if (e.type === 'circle' || e.type === 'polygon' || e.type === 'rect' || h.kx === 'xm') continue;
      if (Math.hypot(h.p[0] - p[0], h.p[1] - p[1]) < 1e-4) out.push(h);
    }
    return out;
  }

  // ----- events -----
  onMove(ev) {
    const raw = this.local(ev);
    if (!raw) return;
    if (this.drag) {
      const s = this.snap(raw, null, ev);
      const p = s.p;
      for (const h of this.drag.handles) { h.e[h.kx] = r3(p[0] + h.off[0]); h.e[h.ky] = r3(p[1] + h.off[1]); }
      this.drag.moved = true;
      this.recompute();
      this.redraw();
      return;
    }
    const from = this.temp.length ? this.temp[this.temp.length - 1] : null;
    const s = this.snap(raw, this.tool === 'line' || this.tool === 'slot' ? from : null, ev);
    this.cursor = s;
    if (this.tool === 'select') {
      const h = this.handleAt(raw);
      this.hover = h ? { handle: h } : null;
      const e = h ? null : this.entityAt(raw);
      if (e) this.hover = { entity: e };
      this.vp.renderer.domElement.style.cursor = h ? 'move' : e ? 'pointer' : 'default';
    } else this.vp.renderer.domElement.style.cursor = 'crosshair';
    this.redraw();
  }

  onDown(ev) {
    if (ev.button === 2) {
      this._rightDown = [ev.clientX, ev.clientY];
      return;
    }
    if (ev.button !== 0) return;
    const raw = this.local(ev);
    if (!raw) return;
    if (this.tool === 'select') {
      const h = this.handleAt(raw);
      if (h) {
        const group = [h, ...this.coincident(h.p, h)];
        if (h.e.type === 'rect' || h.e.type === 'circle' || h.e.type === 'polygon') group.length = 1;
        // Moving a whole circle/rect/polygon/slot: drag its main point.
        this.drag = { handles: group.map((g) => ({ ...g, off: [0, 0] })), moved: false };
        if (h.e.type === 'slot') {
          const other = this.handles(h.e).find((o) => o.kx !== h.kx);
          if (ev.shiftKey) this.drag.handles.push({ ...other, off: [other.p[0] - h.p[0], other.p[1] - h.p[1]] });
        }
        this.app.beginChange();
        return;
      }
      const e = this.entityAt(raw);
      if (!ev.shiftKey) this.sel.clear();
      if (e) { if (this.sel.has(e.id) && ev.shiftKey) this.sel.delete(e.id); else this.sel.add(e.id); }
      this.app.ui.sketchSelection();
      this.redraw();
      return;
    }
    const s = this.snap(raw, this.temp.length ? this.temp[this.temp.length - 1] : null, ev);
    this.click(s.p);
  }

  onUp(ev) {
    if (ev.button === 2 && this._rightDown) {
      const moved = Math.hypot(ev.clientX - this._rightDown[0], ev.clientY - this._rightDown[1]);
      this._rightDown = null;
      if (moved < 4) this.cancelTemp();
      return;
    }
    if (this.drag) {
      const moved = this.drag.moved;
      this.drag = null;
      if (moved) this.app.endChange(); else this.app.abortChange();
      this.redraw();
    }
  }

  cancelTemp() {
    if (this.temp.length) { this.temp = []; this.redraw(); }
    else if (this.tool !== 'select') this.setTool('select');
  }

  add(e) {
    e.id = this.app.newId('e');
    this.app.change(() => this.entities().push(e));
    this.recompute();
    return e;
  }

  click(p) {
    const t = this.temp;
    switch (this.tool) {
      case 'line':
        if (t.length && Math.hypot(p[0] - t[t.length - 1][0], p[1] - t[t.length - 1][1]) < 1e-6) return;
        t.push(p);
        if (t.length >= 2) {
          const a = t[t.length - 2];
          this.add({ type: 'line', x1: a[0], y1: a[1], x2: p[0], y2: p[1] });
          // Closing the chain on its first point ends it.
          if (t.length > 2 && Math.hypot(p[0] - t[0][0], p[1] - t[0][1]) < 1e-6) this.temp = [];
          else this.temp = [p];
          if (!this.temp.length) this.temp = [];
          this.chainStart = this.chainStart || t[0];
        }
        break;
      case 'rect':
        t.push(p);
        if (t.length === 2) {
          const [a, b] = t;
          if (Math.abs(a[0] - b[0]) > 1e-6 && Math.abs(a[1] - b[1]) > 1e-6)
            this.add({ type: 'rect', x: r3(Math.min(a[0], b[0])), y: r3(Math.min(a[1], b[1])), w: r3(Math.abs(b[0] - a[0])), h: r3(Math.abs(b[1] - a[1])) });
          this.temp = [];
        }
        break;
      case 'circle':
        t.push(p);
        if (t.length === 2) {
          const rr = r3(Math.hypot(t[1][0] - t[0][0], t[1][1] - t[0][1]));
          if (rr > 0) this.add({ type: 'circle', cx: t[0][0], cy: t[0][1], r: rr });
          this.temp = [];
        }
        break;
      case 'polygon':
        t.push(p);
        if (t.length === 2) {
          const rr = r3(Math.hypot(t[1][0] - t[0][0], t[1][1] - t[0][1]));
          const rot = r3((Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]) * 180) / Math.PI);
          if (rr > 0) this.add({ type: 'polygon', cx: t[0][0], cy: t[0][1], r: rr, n: this.polySides, rot });
          this.temp = [];
        }
        break;
      case 'arc':
        t.push(p);
        if (t.length === 3) {
          const [a, b, m] = t;
          if (arcFrom3(a, b, m)) this.add({ type: 'arc', x1: a[0], y1: a[1], x2: b[0], y2: b[1], xm: r3(m[0]), ym: r3(m[1]) });
          this.temp = [];
        }
        break;
      case 'slot':
        t.push(p);
        if (t.length === 3) {
          const [a, b, c] = t;
          const w = r3(2 * this.distToSeg(c, { type: 'line', a, b }));
          if (w > 0 && Math.hypot(b[0] - a[0], b[1] - a[1]) > 1e-6) this.add({ type: 'slot', x1: a[0], y1: a[1], x2: b[0], y2: b[1], w });
          this.temp = [];
        }
        break;
    }
    this.redraw();
  }

  deleteSelected() {
    if (!this.sel.size) return false;
    const ids = this.sel;
    this.app.change(() => { const f = this.feature; f.entities = f.entities.filter((e) => !ids.has(e.id)); });
    this.sel = new Set();
    this.recompute();
    this.app.ui.sketchSelection();
    this.redraw();
    return true;
  }

  toggleConstruction() {
    if (!this.sel.size) return;
    this.app.change(() => { for (const e of this.entities()) if (this.sel.has(e.id)) e.construction = !e.construction; });
    this.recompute();
    this.redraw();
  }

  // ----- evaluation & drawing -----
  recompute() {
    this.evals = evalSketch(this.entities(), this.P);
    const { loops, openEnds } = buildLoops(this.evals);
    this.loops = loops;
    this.openEnds = openEnds;
  }

  clearGroup() {
    for (const c of [...this.group.children]) { this.group.remove(c); c.geometry && c.geometry.dispose(); }
  }

  segPoints(s) {
    if (s.type === 'line') return [s.a, s.b];
    const sw = arcSweep(s.a1, s.a2), n = Math.max(8, Math.ceil(sw / 4)), pts = [];
    for (let i = 0; i <= n; i++) pts.push(arcPoint(s.c, s.r, s.a1 + (sw * i) / n));
    return pts;
  }

  line(pts, color, dashed, order = 3) {
    const geo = new THREE.BufferGeometry().setFromPoints(pts.map((p) => new THREE.Vector3(p[0], p[1], 0.02)));
    const px = this.vp.pixelSize();
    const mat = dashed ? new THREE.LineDashedMaterial({ color, dashSize: 6 * px, gapSize: 4 * px, depthTest: false, transparent: true }) : new THREE.LineBasicMaterial({ color, depthTest: false, transparent: true });
    const l = new THREE.Line(geo, mat);
    if (dashed) l.computeLineDistances();
    l.renderOrder = order;
    this.group.add(l);
    return l;
  }
  dots(pts, color, size = 7) {
    if (!pts.length) return;
    const geo = new THREE.BufferGeometry().setFromPoints(pts.map((p) => new THREE.Vector3(p[0], p[1], 0.03)));
    const m = new THREE.Points(geo, new THREE.PointsMaterial({ color, size, sizeAttenuation: false, depthTest: false, transparent: true }));
    m.renderOrder = 6;
    this.group.add(m);
  }

  drawGrid() {
    if (this.gridObj) { this.group.remove(this.gridObj); this.gridObj.geometry.dispose(); this.gridObj = null; }
    if (!this.gridOn) { this.vp.render(); return; }
    const step = this.gridStep();
    const cam = this.vp.camera;
    const t = this.vp.controls.target.clone().applyMatrix4(this.mInv);
    const hw = (cam.right - cam.left) / 2 / cam.zoom, hh = (cam.top - cam.bottom) / 2 / cam.zoom;
    const x0 = Math.floor((t.x - hw) / step) * step, x1 = Math.ceil((t.x + hw) / step) * step;
    const y0 = Math.floor((t.y - hh) / step) * step, y1 = Math.ceil((t.y + hh) / step) * step;
    const pos = [], col = [];
    const minor = new THREE.Color(0xe3e8ee), major = new THREE.Color(0xc5cfd9), axisX = new THREE.Color(0xe5534b), axisY = new THREE.Color(0x39b26b);
    const push = (a, b, c) => { pos.push(a[0], a[1], -0.01, b[0], b[1], -0.01); col.push(c.r, c.g, c.b, c.r, c.g, c.b); };
    let count = 0;
    for (let x = x0; x <= x1 && count < 600; x += step, count++) {
      const xr = Math.round(x / step);
      push([x, y0], [x, y1], Math.abs(x) < step / 2 ? axisY : xr % 5 === 0 ? major : minor);
    }
    for (let y = y0; y <= y1 && count < 1200; y += step, count++) {
      const yr = Math.round(y / step);
      push([x0, y], [x1, y], Math.abs(y) < step / 2 ? axisX : yr % 5 === 0 ? major : minor);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    this.gridObj = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false, transparent: true, opacity: 0.9 }));
    this.gridObj.renderOrder = 1;
    this.group.add(this.gridObj);
    this.app.ui.setGridStep(step);
    this.vp.render();
  }

  redraw() {
    if (!this.active) return;
    if (!this.evals) this.recompute();
    this.clearGroup();
    this.gridObj = null;
    this.drawGrid();
    // Filled closed regions.
    for (const L of this.loops || []) {
      if (L.depth % 2) continue;
      const shape = new THREE.Shape(L.poly.map((p) => new THREE.Vector2(p[0], p[1])));
      for (const H of this.loops) {
        if (H.depth !== L.depth + 1) continue;
        const s = H.segs[0];
        const m = s.type === 'line' ? [(s.a[0] + s.b[0]) / 2, (s.a[1] + s.b[1]) / 2] : s.m;
        if (insidePoly(m, L.poly)) shape.holes.push(new THREE.Path(H.poly.map((p) => new THREE.Vector2(p[0], p[1]))));
      }
      const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({ color: C.fill, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthTest: false, depthWrite: false }));
      mesh.renderOrder = 2;
      this.group.add(mesh);
    }
    // Entities.
    const ends = [];
    for (const it of this.evals) {
      if (!it.g) continue;
      const e = it.e;
      const hov = this.hover && (this.hover.entity === e || (this.hover.handle && this.hover.handle.e === e));
      const color = this.sel.has(e.id) ? C.sel : hov ? C.hover : e.construction ? C.cons : C.line;
      for (const s of it.g.segs) this.line(this.segPoints(s), color, !!e.construction);
      if ((e.type === 'line' || e.type === 'arc') && !e.construction) ends.push(it.g.segs[0].a, it.g.segs[0].b);
      if (e.type === 'circle' || e.type === 'arc') this.dots([it.g.center || it.g.circle.c], color, 5);
      if (e.type === 'polygon') this.dots([[num(e.cx, this.P), num(e.cy, this.P)]], color, 5);
    }
    // Loose ends that do not meet another line are shown in red.
    const open = [], joined = [];
    for (const p of ends) {
      const n = ends.filter((q) => Math.abs(q[0] - p[0]) < 1e-4 && Math.abs(q[1] - p[1]) < 1e-4).length;
      (n >= 2 ? joined : open).push(p);
    }
    this.dots(joined, C.pt, 6);
    this.dots(open, C.open, 9);
    // Preview of the shape being drawn.
    const cur = this.cursor && this.cursor.p;
    const t = this.temp;
    if (cur && t.length) {
      const a = t[0];
      switch (this.tool) {
        case 'line': this.line([t[t.length - 1], cur], C.preview, false, 4); break;
        case 'rect': this.line([a, [cur[0], a[1]], cur, [a[0], cur[1]], a], C.preview, false, 4); break;
        case 'circle': case 'polygon': {
          const rr = Math.hypot(cur[0] - a[0], cur[1] - a[1]);
          const n = this.tool === 'circle' ? 64 : this.polySides;
          const rot = Math.atan2(cur[1] - a[1], cur[0] - a[0]);
          const pts = [];
          for (let i = 0; i <= n; i++) pts.push([a[0] + rr * Math.cos(rot + (i * 2 * Math.PI) / n), a[1] + rr * Math.sin(rot + (i * 2 * Math.PI) / n)]);
          this.line(pts, C.preview, false, 4);
          break;
        }
        case 'arc':
          if (t.length === 1) this.line([a, cur], C.preview, true, 4);
          else { const A = arcFrom3(t[0], t[1], cur); if (A) this.line(this.segPoints(A.seg), C.preview, false, 4); }
          break;
        case 'slot':
          if (t.length === 1) this.line([a, cur], C.preview, true, 4);
          else {
            const w = 2 * this.distToSeg(cur, { type: 'line', a: t[0], b: t[1] });
            try {
              const ev = evalSketch([{ id: 'tmp', type: 'slot', x1: t[0][0], y1: t[0][1], x2: t[1][0], y2: t[1][1], w }], {})[0];
              if (ev.g) for (const s of ev.g.segs) this.line(this.segPoints(s), C.preview, false, 4);
            } catch { /* ignore */ }
          }
          break;
      }
    }
    if (cur && this.tool !== 'select') this.dots([cur], this.cursor.kind && this.cursor.kind !== 'horizontal' && this.cursor.kind !== 'vertical' ? 0xff8c1a : C.preview, this.cursor.kind ? 10 : 6);
    this.buildLabels();
    this.app.ui.sketchInfo(this);
    this.vp.render();
  }

  // ----- dimension labels -----
  buildLabels() {
    const P = this.P;
    const L = [];
    for (const it of this.evals) {
      if (!it.g) continue;
      const e = it.e;
      const add = (pos, text, edit, off = [0, 0]) => L.push({ pos, text, edit, e, off });
      switch (e.type) {
        case 'line': {
          const s = it.g.segs[0];
          const len = Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1]);
          const nx = -(s.b[1] - s.a[1]) / (len || 1), ny = (s.b[0] - s.a[0]) / (len || 1);
          add([(s.a[0] + s.b[0]) / 2, (s.a[1] + s.b[1]) / 2], fmt(len), 'length', [nx * 14, ny * 14]);
          break;
        }
        case 'rect': {
          const x = num(e.x, P), y = num(e.y, P), w = num(e.w, P), h = num(e.h, P);
          const x0 = Math.min(x, x + w), y0 = Math.min(y, y + h);
          add([x0 + Math.abs(w) / 2, y0], showExpr(e.w, w), 'w', [0, -14]);
          add([x0, y0 + Math.abs(h) / 2], showExpr(e.h, h), 'h', [-18, 0]);
          break;
        }
        case 'circle': {
          const { c, r } = it.g.circle;
          add([c[0] + r * 0.707, c[1] + r * 0.707], 'Ø' + fmt(2 * r), 'diameter', [12, 12]);
          break;
        }
        case 'arc': {
          const s = it.g.segs[0];
          add(s.m, 'R' + fmt(s.r), 'radius', [12, 10]);
          break;
        }
        case 'polygon': {
          add([num(e.cx, P), num(e.cy, P) - num(e.r, P)], 'R' + showExpr(e.r, num(e.r, P)), 'r', [0, -14]);
          break;
        }
        case 'slot': {
          const a = [num(e.x1, P), num(e.y1, P)], b = [num(e.x2, P), num(e.y2, P)];
          add([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], fmt(Math.hypot(b[0] - a[0], b[1] - a[1])), 'slotlen', [0, 12]);
          add(b, 'W' + showExpr(e.w, num(e.w, P)), 'w', [0, -16]);
          break;
        }
      }
    }
    this.labels = L;
    const el = this.labelsEl;
    el.innerHTML = '';
    for (const lab of L) {
      const d = document.createElement('button');
      d.className = 'dim' + (this.sel.has(lab.e.id) ? ' sel' : '') + (lab.e.construction ? ' cons' : '');
      d.textContent = lab.text;
      d.title = 'Click to type a new size';
      d.addEventListener('pointerdown', (ev) => ev.stopPropagation());
      d.addEventListener('click', (ev) => { ev.stopPropagation(); this.editLabel(lab, d); });
      lab.el = d;
      el.appendChild(d);
    }
    this.placeLabels();
  }
  placeLabels() {
    for (const lab of this.labels) {
      if (!lab.el) continue;
      const w = new THREE.Vector3(lab.pos[0], lab.pos[1], 0).applyMatrix4(this.m);
      const [sx, sy] = this.vp.screenOf(w.toArray());
      lab.el.style.left = sx + lab.off[0] + 'px';
      lab.el.style.top = sy - lab.off[1] + 'px';
    }
  }

  editLabel(lab, el) {
    const e = lab.e, P = this.P;
    let start = lab.text.replace(/^[ØRW]/, '');
    if (lab.edit === 'w' || lab.edit === 'h' || lab.edit === 'r') start = String(e[lab.edit]);
    if (lab.edit === 'diameter' && !isNum(e.r)) { const m = String(e.r).match(/^\((.*)\)\/2$/); if (m) start = m[1]; }
    const inp = document.createElement('input');
    inp.className = 'dim-input';
    inp.value = start;
    el.replaceWith(inp);
    inp.style.left = el.style.left; inp.style.top = el.style.top;
    inp.focus(); inp.select();
    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      const val = inp.value.trim();
      if (ok && val && val !== start) {
        let v;
        try { v = evaluate(val, P); } catch (err) { this.app.toast(err.message, 'error'); this.buildLabels(); return; }
        if (v <= 0) { this.app.toast('Size must be more than 0', 'error'); this.buildLabels(); return; }
        const expr = isNum(val) ? r3(v) : val;
        this.app.change(() => this.applyDim(e, lab.edit, expr, v));
        this.recompute();
      }
      this.redraw();
    };
    inp.addEventListener('keydown', (ev) => { ev.stopPropagation(); if (ev.key === 'Enter') finish(true); if (ev.key === 'Escape') finish(false); });
    inp.addEventListener('blur', () => finish(true));
  }

  applyDim(e, kind, expr, v) {
    const P = this.P;
    if (kind === 'w' || kind === 'h' || kind === 'r') { e[kind] = expr; return; }
    if (kind === 'diameter') { e.r = typeof expr === 'number' ? r3(expr / 2) : `(${expr})/2`; return; }
    if (kind === 'length') {
      const a = [num(e.x1, P), num(e.y1, P)], b = [num(e.x2, P), num(e.y2, P)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
      const nb = [r3(a[0] + ux * v), r3(a[1] + uy * v)];
      const others = this.coincident(b, { e, kx: 'x2' });
      if (typeof expr === 'string' && Math.abs(uy) < 1e-9) e.x2 = `${wrap(e.x1)} ${ux > 0 ? '+' : '-'} ${wrap(expr)}`;
      else if (typeof expr === 'string' && Math.abs(ux) < 1e-9) e.y2 = `${wrap(e.y1)} ${uy > 0 ? '+' : '-'} ${wrap(expr)}`;
      else { e.x2 = nb[0]; e.y2 = nb[1]; }
      if (typeof expr !== 'string' || (Math.abs(uy) >= 1e-9 && Math.abs(ux) >= 1e-9)) { e.x2 = nb[0]; e.y2 = nb[1]; }
      for (const h of others) { h.e[h.kx] = nb[0]; h.e[h.ky] = nb[1]; }
      return;
    }
    if (kind === 'radius') {
      const a = [num(e.x1, P), num(e.y1, P)], b = [num(e.x2, P), num(e.y2, P)], m = [num(e.xm, P), num(e.ym, P)];
      const half = Math.hypot(b[0] - a[0], b[1] - a[1]) / 2;
      if (v < half - 1e-9) { this.app.toast(`Radius must be at least ${fmt(half)} for these end points`, 'error'); return; }
      const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let nx = -(b[1] - a[1]) / (2 * half), ny = (b[0] - a[0]) / (2 * half);
      const side = (m[0] - mid[0]) * nx + (m[1] - mid[1]) * ny >= 0 ? 1 : -1;
      const old = arcFrom3(a, b, m);
      // Keep the arc's bulge on the same side; big or small arc as before.
      const big = old && old.r > 0 && Math.hypot(m[0] - mid[0], m[1] - mid[1]) > old.r;
      const sag = big ? v + Math.sqrt(Math.max(0, v * v - half * half)) : v - Math.sqrt(Math.max(0, v * v - half * half));
      e.xm = r3(mid[0] + side * nx * sag); e.ym = r3(mid[1] + side * ny * sag);
      return;
    }
    if (kind === 'slotlen') {
      const a = [num(e.x1, P), num(e.y1, P)], b = [num(e.x2, P), num(e.y2, P)];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      e.x2 = r3(a[0] + ((b[0] - a[0]) / L) * v); e.y2 = r3(a[1] + ((b[1] - a[1]) / L) * v);
    }
  }
}

function wrap(x) { return isNum(x) ? String(x) : `(${x})`; }
function showExpr(src, v) { return isNum(src) ? fmt(v) : `${src} = ${fmt(v)}`; }
function insidePoly(pt, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
export { cross };
