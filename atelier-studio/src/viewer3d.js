// 3D view: a mannequin built from body measurements, and the garment wrapped
// onto it from the front-view drawing on the sketch board.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { bodySpec, boardBox, ellipsePerimeter, ARM_ANGLE, SKIN_TONES } from './body.js';
import { Cloth } from './cloth.js';
import { drapeFor } from './fabrics.js';

const SEG = 64; // points around each ring

// Catmull-Rom through keyed rows, `sub` samples between each pair.
function densify(keys, fields, sub) {
  const out = [];
  for (let i = 0; i < keys.length - 1; i++) {
    const p0 = keys[Math.max(0, i - 1)], p1 = keys[i], p2 = keys[i + 1], p3 = keys[Math.min(keys.length - 1, i + 2)];
    for (let s = 0; s < sub; s++) {
      const t = s / sub, t2 = t * t, t3 = t2 * t, row = {};
      for (const f of fields) row[f] = 0.5 * ((2 * p1[f]) + (-p0[f] + p2[f]) * t + (2 * p0[f] - 5 * p1[f] + 4 * p2[f] - p3[f]) * t2 + (-p0[f] + 3 * p1[f] - 3 * p2[f] + p3[f]) * t3);
      out.push(row);
    }
  }
  out.push({ ...keys[keys.length - 1] });
  return out;
}

// Build a tube through rings. pointFn(ring, cos, sin) returns [x, y, z].
// With texFn (the drawing point each vertex came from) and uvMap(point, half), the front half
// (z >= 0) and back half get their own vertices so each can show its own drawing.
function loft(rings, pointFn, { capStart = false, capEnd = false, texFn = null, uvMap = null } = {}) {
  const pos = [], uv = [], idx = [];
  if (texFn) {
    const H = SEG / 2, cols = H + 1;
    for (const half of [0, 1]) {
      const base = pos.length / 3;
      rings.forEach((r) => {
        for (let j = 0; j <= H; j++) {
          const t = ((half * H + j) / SEG) * Math.PI * 2, c = Math.cos(t), s = Math.sin(t), p = pointFn(r, c, s);
          pos.push(p[0], p[1], p[2]);
          const q = uvMap(texFn(r, c, s), half); uv.push(q[0], q[1]);
        }
      });
      for (let i = 0; i < rings.length - 1; i++) for (let j = 0; j < H; j++) {
        const a = base + i * cols + j, b = a + 1, c = a + cols, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    }
  } else {
    rings.forEach((r) => {
      for (let j = 0; j < SEG; j++) { const t = (j / SEG) * Math.PI * 2, p = pointFn(r, Math.cos(t), Math.sin(t)); pos.push(p[0], p[1], p[2]); }
    });
    for (let i = 0; i < rings.length - 1; i++) for (let j = 0; j < SEG; j++) {
      const a = i * SEG + j, b = i * SEG + ((j + 1) % SEG), c = (i + 1) * SEG + j, d = (i + 1) * SEG + ((j + 1) % SEG);
      idx.push(a, c, b, b, c, d);
    }
    const addCap = (ri, flip) => {
      const base = ri * SEG; let cx = 0, cy = 0, cz = 0;
      for (let j = 0; j < SEG; j++) { cx += pos[(base + j) * 3]; cy += pos[(base + j) * 3 + 1]; cz += pos[(base + j) * 3 + 2]; }
      const ci = pos.length / 3; pos.push(cx / SEG, cy / SEG, cz / SEG);
      for (let j = 0; j < SEG; j++) { const a = base + j, b = base + ((j + 1) % SEG); if (flip) idx.push(ci, b, a); else idx.push(ci, a, b); }
    };
    if (capStart) addCap(0, false);
    if (capEnd) addCap(rings.length - 1, true);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  if (texFn) g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export class Viewer {
  constructor(host) {
    this.host = host;
    const r = this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true });
    r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
    r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(r.domElement);
    const scene = this.scene = new THREE.Scene();
    scene.background = new THREE.Color('#efe9e2');
    const pmrem = new THREE.PMREMGenerator(r);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.7;
    const key = this.key = new THREE.DirectionalLight('#fff6ec', 1.6);
    key.position.set(1.2, 3, 2.2); key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -1.2, right: 1.2, top: 2.4, bottom: -0.2, near: 0.5, far: 8 }); key.shadow.bias = -0.0005; key.shadow.normalBias = 0.02;
    scene.add(key);
    const rim = new THREE.DirectionalLight('#dfe8ff', 0.7); rim.position.set(-2, 2, -2.5); scene.add(rim);
    scene.add(new THREE.HemisphereLight('#ffffff', '#b8a99a', 0.35));
    // Platform the mannequin stands on.
    const stage = this.stage = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.58, 0.04, 96), new THREE.MeshStandardMaterial({ color: '#f7f3ee', roughness: 0.45 }));
    stage.position.y = -0.02; stage.receiveShadow = true; scene.add(stage);
    this.camera = new THREE.PerspectiveCamera(28, 1, 0.05, 50);
    this.controls = new OrbitControls(this.camera, r.domElement);
    Object.assign(this.controls, { enableDamping: true, dampingFactor: 0.08, minDistance: 0.6, maxDistance: 8, maxPolarAngle: Math.PI * 0.62, autoRotateSpeed: 1.6 });
    // The figure (mannequin + fitted parts) can turn and sway; cloth reacts to it.
    this.figure = new THREE.Group(); scene.add(this.figure);
    this.bodyGroup = new THREE.Group(); this.figure.add(this.bodyGroup);
    this.garmentGroup = new THREE.Group(); this.figure.add(this.garmentGroup);
    this.clothGroup = new THREE.Group(); scene.add(this.clothGroup);
    this.cloths = [];
    this.move = { angle: 0, x: 0, z: 0, spin: false, sway: false, breeze: false, twirl: null, home: null, t: 0 };
    this.driver = null; // optional function(dt, move) that moves the figure (the runway uses it)
    this.last = performance.now();
    this.skinMat = new THREE.MeshStandardMaterial({ color: '#efe8dc', roughness: 0.55 });
    this.colorTex = null; this.matTex = null;
    this.garmentMats = [];
    this.measure = null;
    this.visible = false;
    this.anim = null;
    new ResizeObserver(() => this.resize()).observe(host);
    const loop = () => { requestAnimationFrame(loop); if (!this.visible) return; this.tick(); };
    loop();
  }

  tick() {
    const now = performance.now(), dt = Math.min(0.05, (now - this.last) / 1000); this.last = now;
    this.updateMotion(dt);
    if (this.anim) {
      const a = this.anim, t = Math.min(1, (performance.now() - a.start) / 600), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      this.camera.position.lerpVectors(a.from, a.to, e);
      if (t >= 1) this.anim = null;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = w + 'px'; this.renderer.domElement.style.height = h + 'px';
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
  }

  setVisible(v) {
    this.visible = v;
    if (v) { this.resize(); this.last = performance.now(); }
    else if (this.move.twirl) { this.move.angle = this.move.twirl.from + Math.PI * 4; this.move.twirl = null; }
  }

  // ---------- mannequin ----------
  setBody(settings, BW, BH) {
    const spec = this.spec = bodySpec(settings);
    this.box = boardBox(spec, BW, BH);
    this.BW = BW; this.BH = BH;
    const skin = SKIN_TONES.find((s) => s.id === settings.skin) || SKIN_TONES[0];
    this.skinMat.color.set(skin.color);
    this.skinMat.roughness = skin.id === 'form' ? 0.7 : 0.5;
    this.bodyGroup.clear();
    const add = (g) => { const m = new THREE.Mesh(g, this.skinMat); m.castShadow = true; m.receiveShadow = true; this.bodyGroup.add(m); return m; };
    // Torso
    const tor = densify(spec.torso, ['y', 'a', 'b'], 6);
    this.denseTorso = tor;
    add(loft(tor, (r, c, s) => { const x = r.a * c; return [x, r.y, r.b * s + spec.bulge(r.y, x, r.a, s)]; }, { capStart: true }));
    // Legs
    const leg = densify(spec.leg, ['y', 'r', 'x'], 5);
    this.denseLeg = leg;
    for (const side of [-1, 1]) add(loft(leg, (r, c, s) => [side * r.x + r.r * c, r.y, r.r * 0.94 * s], { capEnd: true }));
    // Arms
    const arm = densify(spec.arm, ['d', 'r'], 5);
    this.denseArm = arm;
    for (const side of [-1, 1]) add(loft(arm, (r, c, s) => { const p = this.armPoint(side, r.d); const ux = Math.cos(ARM_ANGLE), uy = Math.sin(ARM_ANGLE) * side; return [p.x + r.r * c * ux * side, p.y + r.r * c * uy * side, r.r * 0.92 * s]; }, { capStart: true }));
    // Hands, feet, head
    for (const side of [-1, 1]) {
      const end = this.armPoint(side, spec.armLen + spec.H * 0.045);
      const hand = add(new THREE.SphereGeometry(1, 24, 16)); hand.scale.set(spec.H * 0.024, spec.H * 0.052, spec.H * 0.013); hand.position.set(end.x, end.y, 0.004); hand.rotation.z = side * ARM_ANGLE;
      const last = leg[leg.length - 1];
      const foot = add(new THREE.SphereGeometry(1, 24, 16)); foot.scale.set(last.r * 1.15, spec.H * 0.03, spec.footLen / 2); foot.position.set(side * last.x, spec.H * 0.022, spec.footLen * 0.28);
    }
    const head = add(new THREE.SphereGeometry(1, 40, 28)); head.scale.set(spec.head.r * 0.8, spec.head.r, spec.head.r * 0.9); head.position.set(0, spec.head.y, 0.004);
    // Fit the stage and camera to the figure.
    this.stage.scale.set(spec.H / 1.7, 1, spec.H / 1.7);
    const s = this.key.shadow.camera; s.top = spec.H * 1.3; s.left = -spec.H * 0.7; s.right = spec.H * 0.7; s.updateProjectionMatrix();
    this.controls.target.set(0, spec.H * 0.55, 0);
    if (!this.cameraSet) { this.camera.position.set(0, spec.H * 0.62, spec.H * 2.55); this.cameraSet = true; }
    this.controls.update();
    return spec;
  }

  armPoint(side, d) {
    const j = this.spec.shoulderJoint;
    return { x: side * (j.x + Math.sin(ARM_ANGLE) * d), y: j.y - Math.cos(ARM_ANGLE) * d };
  }

  // Board pixel <-> world helpers (front view, orthographic).
  toBoard(x, y) { const b = this.box; return [(x - b.x0) / b.w * this.BW, (1 - (y - b.y0) / b.h) * this.BH]; }
  toWorld(px, py) { const b = this.box; return [b.x0 + px / this.BW * b.w, b.y0 + (1 - py / this.BH) * b.h]; }
  uvOf(p) { const b = this.box; return [(p[0] - b.x0) / b.w, (p[1] - b.y0) / b.h]; }

  // Light gray view of the mannequin from the front or back, used as the drawing guide.
  renderGuide(w, h, side = 'front') {
    const b = this.box, cam = new THREE.OrthographicCamera(b.x0, b.x0 + b.w, b.y0 + b.h, b.y0, -10, 10);
    cam.position.set(0, 0, side === 'back' ? -5 : 5); cam.lookAt(0, 0, 0);
    const oldRot = this.figure.rotation.y, oldX = this.figure.position.x; this.figure.rotation.y = 0; this.figure.position.x = 0; this.clothGroup.visible = false;
    const rt = new THREE.WebGLRenderTarget(w, h, { samples: 4 });
    const oldBg = this.scene.background, oldEnv = this.scene.environment;
    this.scene.background = null; this.scene.environment = null;
    this.garmentGroup.visible = false; this.stage.visible = false;
    const head = new THREE.DirectionalLight('#ffffff', 2.2); head.position.set(0.3, 0.6, side === 'back' ? -3 : 3); this.scene.add(head);
    this.scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: '#c9c2bb' });
    const r = this.renderer, oldTone = r.toneMapping; r.toneMapping = THREE.NoToneMapping;
    r.setRenderTarget(rt); r.setClearColor(0x000000, 0); r.clear(); r.render(this.scene, cam); r.setRenderTarget(null);
    r.toneMapping = oldTone;
    this.scene.overrideMaterial = null; this.scene.remove(head);
    this.scene.background = oldBg; this.scene.environment = oldEnv; this.garmentGroup.visible = true; this.stage.visible = true; this.clothGroup.visible = true;
    this.figure.rotation.y = oldRot; this.figure.position.x = oldX;
    const px = new Uint8Array(w * h * 4); r.readRenderTargetPixels(rt, 0, 0, w, h, px); rt.dispose();
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const img = c.getContext('2d').createImageData(w, h);
    for (let y = 0; y < h; y++) img.data.set(px.subarray((h - 1 - y) * w * 4, (h - y) * w * 4), y * w * 4);
    c.getContext('2d').putImageData(img, 0, 0);
    return c;
  }

  // ---------- garment ----------
  // atlas: { color, mat } canvases twice the board width: the front drawing on the left half and
  // the back (as seen from behind) on the right half. grid: where the front drawing has fabric.
  setDesign(atlas, grid) {
    if (!this.colorTex || this.colorTex.image !== atlas.color) {
      this.colorTex?.dispose(); this.matTex?.dispose();
      this.colorTex = new THREE.CanvasTexture(atlas.color); this.colorTex.colorSpace = THREE.SRGBColorSpace;
      this.colorTex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      this.matTex = new THREE.CanvasTexture(atlas.mat);
      this.garmentMats.forEach((m) => m.dispose());
      const mk = (side) => new THREE.MeshPhysicalMaterial({ map: this.colorTex, roughnessMap: this.matTex, metalnessMap: this.matTex, roughness: 1, metalness: 1, transparent: true, alphaTest: 0.04, side });
      this.garmentMats = [mk(THREE.BackSide), mk(THREE.FrontSide)];
    }
    this.colorTex.needsUpdate = true; this.matTex.needsUpdate = true;
    this.grid = grid;
    this.buildGarment();
  }
  // Fit changes in cm: { bust, waist, hip, hem, length, sleeve, inseam }.
  setFit(fit) { this.fit = { ...(fit || {}) }; }

  opaque(x, y) {
    const g = this.grid; if (!g) return false;
    const [px, py] = this.toBoard(x, y), gx = Math.floor(px / g.step), gy = Math.floor(py / g.step);
    if (gx < 0 || gy < 0 || gx >= g.w || gy >= g.h) return false;
    return g.data[gy * g.w + gx] > 0;
  }
  // Opaque run on row y around x = cx, searching no farther than `reach` from cx.
  runAt(y, cx, reach) {
    const step = this.box.w / this.grid.w * 0.999;
    const walk = (x0, dir) => { let x = x0, miss = 0, last = x0; while (Math.abs(x - cx) < this.box.w / 2) { x += dir * step; if (this.opaque(x, y)) { last = x; miss = 0; } else if (++miss > 3) break; } return last; };
    if (this.opaque(cx, y)) return { l: walk(cx, -1), r: walk(cx, 1) };
    let l = null, r = null;
    for (let d = step; d < reach; d += step) { if (l === null && this.opaque(cx - d, y)) l = cx - d; if (r === null && this.opaque(cx + d, y)) r = cx + d; if (l !== null && r !== null) break; }
    if (l === null || r === null) return null;
    return { l: walk(l, -1), r: walk(r, 1) };
  }
  // Opaque run through (x, y) along direction (dx, dy): distances to each edge.
  runAlong(x, y, dx, dy, reach) {
    const step = this.box.w / this.grid.w * 0.999, at = (t) => this.opaque(x + dx * t, y + dy * t);
    if (!at(0)) return null;
    const walk = (dir) => { let t = 0, miss = 0, last = 0; while (Math.abs(t) < reach) { t += dir * step; if (at(t)) { last = t; miss = 0; } else if (++miss > 3) break; } return last; };
    return { l: walk(-1), r: walk(1) };
  }
  // A drawn line down the middle below the crotch means trousers (an inseam), not a skirt.
  splitAt(y) {
    const g = this.grid; if (!g.lines) return false;
    for (let x = -0.02; x <= 0.02; x += 0.004) { const [px, py] = this.toBoard(x, y), c = Math.floor(py / g.step) * g.w + Math.floor(px / g.step); if (g.lines[c]) return true; }
    return false;
  }
  // Texture coordinates for a drawing point, on the front or back half of the texture.
  texUV(p, half) { const [u, v] = this.uvOf(p); return half ? [0.5 + (1 - u) * 0.5, v] : [u * 0.5, v]; }

  buildGarment() {
    for (const m of this.garmentGroup.children) m.geometry.dispose();
    this.garmentGroup.clear();
    const oldCloths = this.cloths || [];
    this.cloths = [];
    const finish = () => {
      for (const c of oldCloths) if (!this.cloths.includes(c)) { c.meshes.forEach((m) => this.clothGroup.remove(m)); c.cloth.geometry.dispose(); }
      this.clothFabric = this.cloths[0]?.fabric || null;
    };
    if (!this.grid || !this.grid.any) { this.measure = null; finish(); return; }
    const spec = this.spec, eps = 0.007, fit = this.fit || {}, H = spec.H, cm = (v) => (+v || 0) / 100;
    const smooth = (arr, f) => arr.map((r, i) => { const a = arr[Math.max(0, i - 1)], c = arr[Math.min(arr.length - 1, i + 1)]; return { ...r, [f]: (a[f] + 2 * r[f] + c[f]) / 4 }; });
    const legAt = (y) => { const L = this.denseLeg; if (y > L[0].y) return null; for (let i = 0; i < L.length - 1; i++) if (y <= L[i].y && y >= L[i + 1].y) { const t = (L[i].y - y) / (L[i].y - L[i + 1].y); return { x: L[i].x + (L[i + 1].x - L[i].x) * t, r: L[i].r + (L[i + 1].r - L[i].r) * t }; } return L[L.length - 1]; };
    const torsoAt = (y) => { const T = this.denseTorso; for (let i = 0; i < T.length - 1; i++) if (y >= T[i].y && y <= T[i + 1].y) { const t = (y - T[i].y) / (T[i + 1].y - T[i].y); return { a: T[i].a + (T[i + 1].a - T[i].a) * t, b: T[i].b + (T[i + 1].b - T[i].b) * t }; } return null; };
    // The shape a skirt hangs from at height y: the torso, or both legs together, whichever is wider.
    const baseAt = (y, torso) => {
      const lg = legAt(y), la = lg ? lg.x + lg.r : 0, lb = lg ? lg.r * 1.15 : 0;
      return { a: Math.max(torso ? torso.a : 0, la) + eps, b: Math.max(torso ? torso.b : 0, lb) + eps };
    };
    const flare = (y, base, reach, bodyA) => {
      const run = this.runAt(y, 0, reach);
      let a = base.a, b = base.b, cx = 0;
      if (run) { const hw = (run.r - run.l) / 2; if (hw > a) { b += (hw - a) * 0.95; a = hw; cx = (run.l + run.r) / 2; } }
      return { y, a, b, cx, body: bodyA, base: base.a, hit: !!run };
    };
    // Interpolate between two rings (all their numbers, and the drawing ring they came from).
    const lerpRow = (A, B, t) => {
      const out = { hit: true };
      for (const k of Object.keys(A)) if (typeof A[k] === 'number') out[k] = A[k] + (B[k] - A[k]) * t;
      if (A.o) { out.o = {}; for (const k of Object.keys(A.o)) out.o[k] = A.o[k] + (B.o[k] - A.o[k]) * t; }
      return out;
    };
    // Even spacing of about 2 cm for cloth rows (fewer points, same shape).
    const resample = (part) => {
      const len = Math.hypot(part[0].y - part[part.length - 1].y, (part[0].d || 0) - (part[part.length - 1].d || 0) * 0);
      const n = Math.max(6, Math.min(48, Math.round(len / 0.022))), out = [{ ...part[0] }];
      for (let i = 1; i <= n; i++) {
        const f = (i / n) * (part.length - 1), j = Math.min(part.length - 2, Math.floor(f));
        out.push(lerpRow(part[j], part[j + 1], f - j));
      }
      return out;
    };
    const keep = (rows) => rows.forEach((r) => { r.o = {}; for (const k of Object.keys(r)) if (typeof r[k] === 'number') r.o[k] = r[k]; });

    // ---- center: bodice down to the hem ----
    const underbust = (spec.y.bust + spec.y.waist) / 2;
    const rows = [];
    for (const r of [...this.denseTorso].reverse()) {
      if (r.y > spec.y.neckTop) continue;
      if (r.y >= underbust) { rows.push({ y: r.y, a: r.a + eps, b: r.b + eps, cx: 0, body: r.a, base: r.a + eps, hit: this.opaque(0, r.y) }); continue; }
      rows.push(flare(r.y, baseAt(r.y, r), r.a * 1.1, r.a));
    }
    // Below the crotch: does a skirt keep going?
    const stepY = H * 0.008;
    let hemY = null, miss = 0;
    for (let y = rows[rows.length - 1].y - stepY; y > H * 0.005; y -= stepY) {
      const base = baseAt(y, null), row = flare(y, base, 0.035, base.a - eps); // must cover the middle (not just two trouser legs)
      if (!row.hit || this.splitAt(y)) { if (++miss > 2) break; continue; }
      miss = 0; rows.push(row); hemY = y;
    }
    // Fabric hangs down from the hips: below hip level a skirt never gets narrower.
    let maxA = 0, maxB = 0;
    if (hemY !== null) for (const r of rows) {
      if (r.y > spec.y.hip) continue;
      if (r.a < maxA) { r.cx = r.cx * (r.a / maxA); r.a = maxA; }
      if (r.b < maxB) r.b = maxB;
      maxA = r.a; maxB = r.b;
      if (r.y < spec.y.crotch && !r.hit) break;
    }
    let center = rows;
    for (let k = 0; k < 3; k++) center = smooth(smooth(center, 'a'), 'b');
    for (let k = 0; k < 6; k++) center = smooth(center, 'cx');
    keep(center);
    const covered = (r) => r.hit || this.opaque(0, r.o.y);
    let topIdx = center.findIndex(covered), botIdx = -1;
    for (let i = center.length - 1; i >= 0; i--) if (covered(center[i])) { botIdx = i; break; }

    // ---- fit changes (from edited measurements) ----
    const minA = (r) => Math.min(r.o.a, r.body + eps * 0.6);
    const ease = (h, d) => { if (!d) return; for (const r of center) { const w = Math.exp(-Math.pow((r.o.y - h) / (0.045 * H), 2)), da = d / (2 * Math.PI) * w; r.a = Math.max(minA(r), r.a + da); r.b = Math.max(r.o.b * 0.6, r.b + da); } };
    ease(spec.y.bust, cm(fit.bust)); ease(spec.y.waist, cm(fit.waist)); ease(spec.y.hip, cm(fit.hip));
    const bottomY = botIdx >= 0 ? center[botIdx].o.y : spec.y.waist;
    if (fit.hem && bottomY < spec.y.hip - 0.02) for (const r of center) {
      if (r.o.y > spec.y.hip) continue;
      const t = Math.min(1, (spec.y.hip - r.o.y) / (spec.y.hip - bottomY)), da = cm(fit.hem) / (2 * Math.PI) * t;
      r.a = Math.max(minA(r), r.a + da); r.b = Math.max(r.o.b * 0.6, r.b + da);
    }
    if (fit.length && botIdx > topIdx) {
      const anchor = bottomY < spec.y.waist - 0.05 * H ? spec.y.waist : underbust, L = anchor - bottomY;
      if (L > 0.02) {
        const k = Math.max(0.25, (L + cm(fit.length)) / L);
        for (const r of center) if (r.o.y < anchor) {
          r.y = Math.max(0.012, anchor - (anchor - r.o.y) * k);
          const base = baseAt(r.y, torsoAt(r.y)); if (r.a < base.a) r.a = base.a; if (r.b < base.b) r.b = base.b;
        }
      }
    }
    const ell = (r, c, s) => { const x = r.cx + r.a * c; const bz = r.a - eps > r.body * 1.2 ? 0 : spec.bulge(r.y, x - r.cx, r.body, s); return [x, r.y, r.b * s + bz]; };
    const ellTex = (r, c) => [r.o.cx + r.o.a * c * 0.975, r.o.y];
    const uvMap = (p, half) => this.texUV(p, half);

    // ---- cloth pieces ----
    const addCloth = (name, rings, opts) => {
      const fabric = this.dominantFabric(rings, opts.texFn), phys = { ...drapeFor(fabric), ...(opts.phys || {}) };
      const key = name + '|' + fabric + '|' + rings.map((r) => [r.y, r.a, r.b, r.cx || 0, r.d || 0, r.off || 0].map((v) => v.toFixed(3)).join(',')).join(';');
      const old = oldCloths.find((c) => c.key === key);
      if (old) { old.meshes.forEach((m, i) => { m.material = this.garmentMats[i]; }); this.cloths.push(old); return; }
      const cloth = new Cloth({ rings, uvMap, ...opts, phys });
      cloth.frame = { angle: this.move.angle, x: this.move.x, z: this.move.z };
      cloth.wind = this.move.breeze ? 2.2 : 0;
      cloth.settle(opts.settle || 90); cloth.sync();
      const meshes = this.garmentMats.map((mat, i) => { const m = new THREE.Mesh(cloth.geometry, mat); m.castShadow = i === 1; m.receiveShadow = true; m.renderOrder = 1 + i; m.userData.garment = true; m.frustumCulled = false; this.clothGroup.add(m); return m; });
      this.cloths.push({ key, cloth, meshes, fabric });
      this.wake();
    };
    // Skirts, dresses and loose tops: from where the fabric stands away from the body.
    const idxOf = (y) => { const i = center.findIndex((r) => r.o.y <= y); return i < 0 ? 0 : i; };
    const iBust = idxOf(spec.y.bust), iWaist = idxOf(spec.y.waist);
    const flareIdx = center.findIndex((r, i) => i >= iBust && r.hit && r.a - r.base > (hemY !== null ? 0.012 : 0.025));
    let cTop = -1;
    if (hemY !== null) cTop = flareIdx >= 0 ? Math.max(iBust, Math.min(flareIdx - 2, iWaist)) : iWaist;
    else if (flareIdx >= 0 && botIdx - flareIdx >= 3 && bottomY > spec.y.crotch + 0.02 * H) cTop = Math.max(iBust, flareIdx - 2);
    // Trousers: the hip section stops at the crotch; the legs take over below.
    const yc = spec.y.crotch - 0.05 * H, trousers = hemY === null && (this.splitAt(yc) || (!this.opaque(0, yc) && (this.opaque(-spec.legX, yc) || this.opaque(spec.legX, yc))));
    let rigid = trousers ? center.filter((r) => r.o.y >= spec.y.crotch + 0.012 * H) : center;
    if (cTop >= 0 && botIdx - cTop >= 3 && !trousers) {
      rigid = center.slice(0, cTop + 1);
      addCloth('center', resample(center.slice(cTop, botIdx + 1)), { pointFn: ell, texFn: ellTex, collide: this.makeCollider(true) });
    }
    const geos = [];
    let patLeg = null, patSleeve = null;
    if (rigid.length > 1) geos.push(loft(rigid, ell, { texFn: ellTex, uvMap }));
    const skirtAt = (y) => hemY !== null && y >= hemY - stepY;

    // ---- legs (trousers) ----
    const legPt = (r, c, s) => [r.cx + r.a * c, r.y, r.b * s];
    const legMeasure = [];
    for (const side of [-1, 1]) {
      let lrows = this.denseLeg.map((r) => {
        let rr = r.r + eps, x = side * r.x, hit = false;
        if (!skirtAt(r.y) && r.y < spec.y.crotch) { const run = this.runAt(r.y, x, r.r * 1.3); if (run && (!this.opaque(0, r.y) || this.splitAt(r.y))) { hit = true; if (side < 0) run.r = Math.min(run.r, -0.004); else run.l = Math.max(run.l, 0.004); const hw = (run.r - run.l) / 2; if (hw > rr) { rr = hw; x = (run.l + run.r) / 2; } } }
        return { y: r.y, a: rr, b: rr * 0.96, cx: x, body: r.r, base: r.r + eps, hit };
      });
      // Trouser legs start as wide as the trousers are at the crotch (no lip under the hips).
      const firstLeg = lrows.find((r) => r.hit);
      if (firstLeg && trousers) {
        const hipEnd = rigid[rigid.length - 1];
        for (const r of lrows) {
          if (r.y < spec.y.crotch - 0.03 * H) break;
          if (firstLeg.a > r.a) { r.a = firstLeg.a; r.b = firstLeg.b; r.cx = firstLeg.cx; }
          // Line the leg's outer edge and depth up with the bottom of the hip section.
          if (hipEnd) { r.a = Math.max(r.a, hipEnd.a / 2 + 0.012); r.cx = side * Math.max(Math.abs(r.cx), hipEnd.a + 0.002 - r.a); r.b = Math.max(r.b, hipEnd.b * 0.92); }
        }
      }
      lrows = smooth(smooth(lrows, 'a'), 'b'); lrows.forEach((r) => { r.b = Math.max(r.b, r.a * 0.9); });
      keep(lrows);
      let last = -1; lrows.forEach((r, i) => { if (r.hit) last = i; });
      if (last >= 0 && fit.inseam) {
        const cr = spec.y.crotch, L = cr - lrows[last].o.y, k = Math.max(0.2, (L + cm(fit.inseam)) / L);
        for (const r of lrows) if (r.o.y < cr) { r.y = Math.max(0.01, cr - (cr - r.o.y) * k); const lg = legAt(r.y); if (lg && r.a < lg.r + eps) { r.a = lg.r + eps; r.b = Math.max(r.b, r.a * 0.96); } }
      }
      if (last >= 0) legMeasure.push(lrows[last].y);
      if (side === 1) patLeg = { rows: lrows, last, texFn: (r, c) => legTex(r, c) };
      const legTex = (r, c) => [r.o.cx + r.o.a * c * 0.975, r.o.y];
      const flared = lrows.some((r) => r.hit && r.a - r.base > 0.015);
      if (flared && last >= 3) addCloth('leg' + side, resample(lrows.slice(0, last + 1)), { pointFn: legPt, texFn: legTex, centerFn: (r) => [r.cx, r.y, 0], collide: this.makeCollider(true), settle: 70, phys: { hang: 0.97 } });
      else geos.push(loft(lrows, legPt, { texFn: legTex, uvMap }));
    }

    // ---- sleeves ----
    let sleeveLen = null;
    for (const side of [-1, 1]) {
      const px = side * Math.cos(ARM_ANGLE), py = Math.sin(ARM_ANGLE);
      let arows = this.denseArm.map((r) => {
        const p = this.armPoint(side, r.d), bodyR = r.r + eps * 0.8 + Math.max(0, 1 - r.d / (H * 0.06)) * 0.012;
        let a = bodyR, off = 0, hit = this.opaque(p.x, p.y);
        if (r.d > H * 0.07) { const run = this.runAlong(p.x, p.y, px, py, 0.16); if (run) { const hw = (run.r - run.l) / 2; if (hw > a) { a = hw; off = (run.l + run.r) / 2; } } }
        return { d: r.d, y: p.y, a, b: bodyR * 0.94 + (a - bodyR), off, body: bodyR, base: bodyR, hit };
      });
      arows = smooth(smooth(smooth(arows, 'a'), 'b'), 'off');
      keep(arows);
      let last = -1; arows.forEach((r, i) => { if (r.hit) last = i; });
      if (last >= 0 && fit.sleeve) {
        const dEnd = Math.max(0.03, arows[last].o.d), k = Math.max(0.1, (dEnd + cm(fit.sleeve)) / dEnd);
        for (const r of arows) { r.d = r.o.d * k; r.y = this.armPoint(side, r.d).y; }
      }
      if (side === 1 && last >= 0 && arows[last].d > 0.03) sleeveLen = arows[last].d;
      if (side === 1) patSleeve = { rows: arows, last, texFn: (r, c) => armTex(r, c) };
      const armPt = (r, c, s) => { const p = this.armPoint(side, r.d), cx = p.x + px * r.off, cy = p.y + py * r.off; return [cx + px * r.a * c, cy + py * r.a * c, r.b * s]; };
      const armTex = (r, c) => { const o = r.o, p = this.armPoint(side, o.d), t = o.off + o.a * c * 0.975; return [p.x + px * t, p.y + py * t]; };
      // Only long, flared sleeves flow (bell and bishop sleeves); short sleeves stay fitted.
      const flared = arows.some((r) => r.hit && r.a - r.base > 0.022) && arows[last]?.o.d > H * 0.16;
      if (flared && last >= 4) addCloth('sleeve' + side, resample(arows.slice(0, last + 1)), { pointFn: armPt, texFn: armTex, centerFn: (r) => { const p = this.armPoint(side, r.d); return [p.x + px * r.off, p.y + py * r.off, 0]; }, collide: this.makeCollider(false), seg: 48, settle: 70 });
      else geos.push(loft(arows, armPt, { texFn: armTex, uvMap }));
    }

    for (const g of geos) for (const [i, mat] of this.garmentMats.entries()) {
      const m = new THREE.Mesh(g, mat); m.castShadow = i === 1; m.renderOrder = 1 + i; m.userData.garment = true; this.garmentGroup.add(m);
    }
    finish();
    this.lastRows = center;
    // Everything the sewing pattern needs to know about this garment.
    const fabricOver = (rows, texFn) => rows && rows.length ? this.dominantFabric(rows, texFn) : null;
    const coveredRows = center.filter(covered);
    const waistI = coveredRows.findIndex((r) => r.o.y <= spec.y.waist);
    this.patternData = {
      spec, center, covered, hemY, trousers,
      top: coveredRows[0] || null, bottom: coveredRows[coveredRows.length - 1] || null,
      sleeve: patSleeve && patSleeve.last >= 0 && patSleeve.rows[patSleeve.last].d > 0.03 ? patSleeve : null,
      leg: patLeg && patLeg.last >= 0 ? patLeg : null,
      fabrics: {
        bodice: fabricOver(coveredRows.filter((r) => r.o.y >= spec.y.waist), ellTex),
        lower: fabricOver(waistI >= 0 ? coveredRows.slice(waistI) : [], ellTex),
        sleeve: patSleeve ? fabricOver(patSleeve.rows.slice(0, patSleeve.last + 1), patSleeve.texFn) : null,
        leg: patLeg ? fabricOver(patLeg.rows.slice(0, patLeg.last + 1), patLeg.texFn) : null,
      },
      shoulderCovered: this.opaque(spec.half.shoulder * 0.75, spec.y.shoulder - 0.01) || this.opaque(-spec.half.shoulder * 0.75, spec.y.shoulder - 0.01),
    };
    this.measure = this.measureGarment(center, covered, legMeasure, sleeveLen);
  }

  // The fabric used most in a cloth piece, which decides how it drapes.
  dominantFabric(rings, texFn) {
    const g = this.grid, count = {};
    for (const r of rings) for (let k = -10; k <= 10; k++) {
      const [x, y] = texFn(r, k / 10.5, 0), [px, py] = this.toBoard(x, y), c = Math.floor(py / g.step) * g.w + Math.floor(px / g.step);
      if (c < 0 || c >= g.data.length || !g.data[c]) continue;
      const f = g.fabricOf ? g.fabricOf(g.ids[c]) : 'cotton'; count[f] = (count[f] || 0) + 1;
    }
    let best = 'cotton', n = 0; for (const [f, v] of Object.entries(count)) if (v > n) { n = v; best = f; }
    return best;
  }

  // Keeps cloth points outside the mannequin (hips, legs, arms), in the mannequin's own coordinates.
  makeCollider(withTorso) {
    const spec = this.spec, T = this.denseTorso, L = this.denseLeg, m = 0.009;
    const torsoAt = (y) => { for (let i = 0; i < T.length - 1; i++) if (y >= T[i].y && y <= T[i + 1].y) { const t = (y - T[i].y) / (T[i + 1].y - T[i].y); return { a: T[i].a + (T[i + 1].a - T[i].a) * t, b: T[i].b + (T[i + 1].b - T[i].b) * t }; } return null; };
    const legAt = (y) => { if (y > L[0].y) return null; for (let i = 0; i < L.length - 1; i++) if (y <= L[i].y && y >= L[i + 1].y) { const t = (L[i].y - y) / (L[i].y - L[i + 1].y); return { x: L[i].x + (L[i + 1].x - L[i].x) * t, r: L[i].r + (L[i + 1].r - L[i].r) * t }; } return { x: L[L.length - 1].x, r: L[L.length - 1].r }; };
    const arms = [-1, 1].map((side) => { const a = this.armPoint(side, 0.02), b = this.armPoint(side, spec.armLen + spec.H * 0.07); return { ax: a.x, ay: a.y, bx: b.x, by: b.y, r: spec.upperR * 0.9 + m }; });
    const yTop = withTorso ? spec.y.bust + 0.02 : spec.y.waist;
    return (P, o) => {
      let x = P[o], y = P[o + 1], z = P[o + 2];
      if (y < 0.004) { P[o + 1] = y = 0.004; }
      if (y <= yTop) {
        const r = withTorso ? torsoAt(y) : null;
        if (r) {
          const s = Math.max(-1, Math.min(1, z / r.b)), bz = spec.bulge(y, x, r.a, s), a = r.a + m, b = r.b + m, zz = z - bz;
          const d = (x / a) * (x / a) + (zz / b) * (zz / b);
          if (d < 1) { const k = 1 / Math.sqrt(Math.max(d, 1e-6)); x *= k; z = zz * k + bz; P[o] = x; P[o + 2] = z; }
        }
        const lg = legAt(y);
        if (lg) for (const side of [-1, 1]) {
          const cx = side * lg.x, dx = x - cx, rr = lg.r + m, d2 = dx * dx + z * z;
          if (d2 < rr * rr) { const d = Math.sqrt(d2) || 1e-6; x = cx + dx / d * rr; z = z / d * rr; P[o] = x; P[o + 2] = z; }
        }
      }
      for (const A of arms) {
        const vx = A.bx - A.ax, vy = A.by - A.ay, t = Math.max(0, Math.min(1, ((x - A.ax) * vx + (y - A.ay) * vy) / (vx * vx + vy * vy)));
        const qx = A.ax + vx * t, qy = A.ay + vy * t, dx = x - qx, dy = y - qy, d2 = dx * dx + dy * dy + z * z;
        if (d2 < A.r * A.r) { const d = Math.sqrt(d2) || 1e-6, k = A.r / d; P[o] = qx + dx * k; P[o + 1] = qy + dy * k; P[o + 2] = z * k; }
      }
    };
  }

  // Garment measurements in cm, from the garment as it is now (including fit changes).
  measureGarment(center, covered, legBottoms, sleeveLen) {
    const spec = this.spec, rows = center.filter(covered);
    if (!rows.length) return null;
    const near = (y) => { let best = null; for (const r of rows) if (!best || Math.abs(r.y - y) < Math.abs(best.y - y)) best = r; return best && Math.abs(best.y - y) < spec.H * 0.03 ? best : null; };
    const circ = (y) => { const r = near(y); return r ? ellipsePerimeter(r.a, r.b) * 100 : null; };
    const top = rows[0], bottom = rows[rows.length - 1];
    return {
      bust: circ(spec.y.bust), waist: circ(spec.y.waist), hip: circ(spec.y.hip),
      // Trousers: length runs from the waist to the bottom of the legs.
      length: (top.y - Math.min(bottom.y, ...(legBottoms.length ? legBottoms : [bottom.y]))) * 100,
      lengthIsLegs: legBottoms.length > 0 && Math.min(...legBottoms) < bottom.y - 0.02,
      hem: bottom.o.y < spec.y.waist ? ellipsePerimeter(bottom.a, bottom.b) * 100 : null,
      sleeve: sleeveLen !== null ? sleeveLen * 100 : null,
      inseam: legBottoms.length ? (spec.y.crotch - Math.min(...legBottoms)) * 100 : null,
    };
  }

  // What part of which drawing is under a screen point, if it lands on the garment.
  // Returns { side: 'front' | 'back', x, y } in board pixels (the back as drawn, seen from behind).
  pick(clientX, clientY) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, this.camera);
    const hits = ray.intersectObjects([...this.garmentGroup.children, ...this.clothGroup.children, ...this.bodyGroup.children], false);
    for (const h of hits) {
      if (!h.object.userData.garment) return null;
      if (!h.uv) continue;
      const back = h.uv.x >= 0.5, x = back ? (h.uv.x - 0.5) * 2 * this.BW : h.uv.x * 2 * this.BW, y = (1 - h.uv.y) * this.BH, g = this.grid;
      const fx = back ? this.BW - x : x, cell = g.data[Math.floor(y / g.step) * g.w + Math.floor(fx / g.step)];
      if (cell) return { side: back ? 'back' : 'front', x: Math.round(x), y: Math.round(y) };
    }
    return null;
  }

  view(which) {
    this.move.spin = false; this.move.home = Math.round(this.move.angle / (Math.PI * 2)) * Math.PI * 2; this.wake();
    const H = this.spec.H, d = H * 2.55, y = H * 0.62;
    const to = which === 'back' ? new THREE.Vector3(0, y, -d) : which === 'side' ? new THREE.Vector3(d, y, 0) : which === 'close' ? new THREE.Vector3(0, H * 0.7, H * 1.4) : new THREE.Vector3(0, y, d);
    this.anim = { from: this.camera.position.clone(), to, start: performance.now() };
  }
  // ---------- movement ----------
  setAutoRotate(on) { this.move.spin = on; if (on) this.move.home = null; this.wake(); }
  setSway(on) { this.move.sway = on; this.move.t = 0; this.wake(); }
  setBreeze(on) { this.move.breeze = on; for (const c of this.cloths) c.cloth.wind = on ? 2.2 : 0; this.wake(); }
  twirl() { this.move.twirl = { t: 0, from: this.move.angle }; this.move.spin = false; this.wake(); }
  wake() { this.clothAwake = 240; }
  updateMotion(dt) {
    const m = this.move;
    m.t += dt;
    let angle = m.angle, x = 0;
    if (this.driver) { this.driver(dt, m); angle = m.angle; x = m.x; }
    else if (m.twirl) {
      const T = 2.6, u = Math.min(1, (m.twirl.t += dt) / T), e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      angle = m.twirl.from + e * Math.PI * 4;
      if (u >= 1) m.twirl = null;
    } else if (m.spin) angle += dt * 0.7;
    else if (m.home !== null) { const d = m.home - angle; angle += d * Math.min(1, dt * 5); if (Math.abs(d) < 0.002) { angle = m.home; m.home = null; } }
    if (m.sway && !this.driver) {
      const w = Math.sin(m.t * Math.PI * 2 / 1.4);
      x = 0.035 * w; angle += 0.012 * Math.cos(m.t * Math.PI * 2 / 1.4);
    }
    m.angle = angle; m.x = x;
    this.figure.rotation.y = angle; this.figure.position.x = x; this.figure.position.z = m.z;
    if (this.aiModel) { this.aiModel.rotation.y = angle; }
    if (!this.cloths.length) return;
    const busy = m.spin || m.sway || m.breeze || m.twirl || m.home !== null || !!this.driver;
    if (busy) this.clothAwake = 240;
    if (this.clothAwake > 0) {
      let moved = 0;
      for (const { cloth: c } of this.cloths) {
        c.setFrame(angle, x, m.z);
        for (let k = 0; k < 2; k++) moved = Math.max(moved, c.step(Math.max(1 / 240, dt / 2)));
        c.sync();
      }
      if (!busy && moved < 2e-5) this.clothAwake--;
    }
  }
  setBackground(hex) { this.scene.background = new THREE.Color(hex); }

  // A finished picture of the look (front or back), for the portfolio and tech pack.
  // transparent: no background or platform.
  renderLook({ w = 600, h = 900, angle = 0, transparent = true, bg = '#f4eee7' } = {}) {
    const spec = this.spec, cam = new THREE.PerspectiveCamera(22, w / h, 0.05, 50), d = spec.H * 3.05;
    cam.position.set(Math.sin(angle) * d, spec.H * 0.56, Math.cos(angle) * d); cam.lookAt(0, spec.H * 0.5, 0);
    const r = this.renderer, oldBg = this.scene.background, size = r.getSize(new THREE.Vector2()), ratio = r.getPixelRatio();
    const fig = { rot: this.figure.rotation.y, x: this.figure.position.x, z: this.figure.position.z };
    // Pose the cloth facing forward for the picture.
    this.figure.rotation.y = 0; this.figure.position.set(0, 0, 0);
    const frames = this.cloths.map(({ cloth }) => { const f = cloth.frame; cloth.frame = { angle: 0, x: 0, z: 0 }; cloth.sync(); return f; });
    this.scene.background = transparent ? null : new THREE.Color(bg); this.stage.visible = !transparent;
    r.setPixelRatio(1); r.setSize(w, h, false); r.setClearColor(0x000000, 0); r.clear();
    r.render(this.scene, cam);
    const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(r.domElement, 0, 0, w, h);
    this.scene.background = oldBg; this.stage.visible = true;
    r.setPixelRatio(ratio); r.setSize(size.x, size.y, false);
    this.figure.rotation.y = fig.rot; this.figure.position.set(fig.x, 0, fig.z);
    this.cloths.forEach(({ cloth }, i) => { cloth.frame = frames[i]; cloth.sync(); });
    return c;
  }

  // A 3D model made by the online AI service, shown standing on the platform instead of the mannequin.
  async showAIModel(blob) {
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
    const gltf = await new GLTFLoader().parseAsync(await blob.arrayBuffer(), '');
    this.clearAIModel();
    const obj = gltf.scene, box = new THREE.Box3().setFromObject(obj), size = box.getSize(new THREE.Vector3());
    const k = (this.spec?.H || 1.7) * 0.92 / Math.max(size.y, 1e-6), center = box.getCenter(new THREE.Vector3());
    const holder = new THREE.Group(); obj.position.set(-center.x, -box.min.y, -center.z); holder.add(obj); holder.scale.setScalar(k);
    holder.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    this.aiModel = holder; this.scene.add(holder);
    this.figure.visible = false; this.clothGroup.visible = false;
  }
  clearAIModel() {
    if (this.aiModel) { this.scene.remove(this.aiModel); this.aiModel.traverse((o) => { o.geometry?.dispose?.(); }); this.aiModel = null; }
    this.figure.visible = true; this.clothGroup.visible = true;
  }

  screenshot() { this.tick(); return this.renderer.domElement.toDataURL('image/png'); }

  async exportGLB() {
    const group = new THREE.Group();
    this.bodyGroup.children.forEach((m) => group.add(new THREE.Mesh(m.geometry, m.material).copy(m, false)));
    const front = this.garmentGroup.children.filter((m) => m.material.side === THREE.FrontSide);
    const two = this.garmentMats[1]?.clone(); if (two) two.side = THREE.DoubleSide;
    front.forEach((m) => { const g = new THREE.Mesh(m.geometry, two); g.rotation.copy(this.figure.rotation); g.position.copy(this.figure.position); group.add(g); });
    this.clothGroup.children.filter((m) => m.material.side === THREE.FrontSide).forEach((m) => group.add(new THREE.Mesh(m.geometry.clone(), two)));
    const ex = new GLTFExporter();
    return new Promise((res, rej) => ex.parse(group, (buf) => res(new Blob([buf], { type: 'model/gltf-binary' })), rej, { binary: true }));
  }
}
