// 3D view: a mannequin built from body measurements, and the garment wrapped
// onto it from the front-view drawing on the sketch board.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { bodySpec, boardBox, ellipsePerimeter, ARM_ANGLE, SKIN_TONES } from './body.js';

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
function loft(rings, pointFn, { capStart = false, capEnd = false, uvFn = null } = {}) {
  const pos = [], uv = [], idx = [];
  rings.forEach((r) => {
    for (let j = 0; j < SEG; j++) {
      const t = (j / SEG) * Math.PI * 2, p = pointFn(r, Math.cos(t), Math.sin(t));
      pos.push(p[0], p[1], p[2]);
      if (uvFn) { const q = uvFn(p); uv.push(q[0], q[1]); }
    }
  });
  for (let i = 0; i < rings.length - 1; i++) for (let j = 0; j < SEG; j++) {
    const a = i * SEG + j, b = i * SEG + ((j + 1) % SEG), c = (i + 1) * SEG + j, d = (i + 1) * SEG + ((j + 1) % SEG);
    idx.push(a, c, b, b, c, d);
  }
  const addCap = (ri, flip) => {
    const base = ri * SEG; let cx = 0, cy = 0, cz = 0;
    for (let j = 0; j < SEG; j++) { cx += pos[(base + j) * 3]; cy += pos[(base + j) * 3 + 1]; cz += pos[(base + j) * 3 + 2]; }
    const ci = pos.length / 3; pos.push(cx / SEG, cy / SEG, cz / SEG);
    if (uvFn) { const q = uvFn([cx / SEG, cy / SEG, cz / SEG]); uv.push(q[0], q[1]); }
    for (let j = 0; j < SEG; j++) { const a = base + j, b = base + ((j + 1) % SEG); if (flip) idx.push(ci, b, a); else idx.push(ci, a, b); }
  };
  if (capStart) addCap(0, false);
  if (capEnd) addCap(rings.length - 1, true);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  if (uvFn) g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export class Viewer {
  constructor(host) {
    this.host = host;
    const r = this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
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
    this.bodyGroup = new THREE.Group(); scene.add(this.bodyGroup);
    this.garmentGroup = new THREE.Group(); scene.add(this.garmentGroup);
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

  setVisible(v) { this.visible = v; if (v) this.resize(); }

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

  // Light gray front view of the mannequin, used as the drawing guide on the sketch board.
  renderGuide(w, h) {
    const b = this.box, cam = new THREE.OrthographicCamera(b.x0, b.x0 + b.w, b.y0 + b.h, b.y0, -10, 10);
    cam.position.set(0, 0, 5); cam.lookAt(0, 0, 0);
    const rt = new THREE.WebGLRenderTarget(w, h, { samples: 4 });
    const oldBg = this.scene.background, oldEnv = this.scene.environment;
    this.scene.background = null; this.scene.environment = null;
    this.garmentGroup.visible = false; this.stage.visible = false;
    const head = new THREE.DirectionalLight('#ffffff', 2.2); head.position.set(0.3, 0.6, 3); this.scene.add(head);
    this.scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: '#c9c2bb' });
    const r = this.renderer, oldTone = r.toneMapping; r.toneMapping = THREE.NoToneMapping;
    r.setRenderTarget(rt); r.setClearColor(0x000000, 0); r.clear(); r.render(this.scene, cam); r.setRenderTarget(null);
    r.toneMapping = oldTone;
    this.scene.overrideMaterial = null; this.scene.remove(head);
    this.scene.background = oldBg; this.scene.environment = oldEnv; this.garmentGroup.visible = true; this.stage.visible = true;
    const px = new Uint8Array(w * h * 4); r.readRenderTargetPixels(rt, 0, 0, w, h, px); rt.dispose();
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const img = c.getContext('2d').createImageData(w, h);
    for (let y = 0; y < h; y++) img.data.set(px.subarray((h - 1 - y) * w * 4, (h - y) * w * 4), y * w * 4);
    c.getContext('2d').putImageData(img, 0, 0);
    return c;
  }

  // ---------- garment ----------
  // colorCanvas: what the garment looks like (front view). matCanvas: G = roughness, B = metalness.
  setDesign(colorCanvas, matCanvas, alphaGrid) {
    if (!this.colorTex || this.colorTex.image !== colorCanvas) {
      this.colorTex?.dispose(); this.matTex?.dispose();
      this.colorTex = new THREE.CanvasTexture(colorCanvas); this.colorTex.colorSpace = THREE.SRGBColorSpace;
      this.colorTex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      this.matTex = new THREE.CanvasTexture(matCanvas);
      this.garmentMats.forEach((m) => m.dispose());
      const mk = (side) => new THREE.MeshPhysicalMaterial({ map: this.colorTex, roughnessMap: this.matTex, metalnessMap: this.matTex, roughness: 1, metalness: 1, transparent: true, alphaTest: 0.04, side });
      this.garmentMats = [mk(THREE.BackSide), mk(THREE.FrontSide)];
    }
    this.colorTex.needsUpdate = true; this.matTex.needsUpdate = true;
    this.grid = alphaGrid;
    this.buildGarment();
  }

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

  buildGarment() {
    for (const m of this.garmentGroup.children) m.geometry.dispose();
    this.garmentGroup.clear();
    if (!this.grid || !this.grid.any) { this.measure = null; return; }
    const spec = this.spec, eps = 0.007, uvFn = (p) => this.uvOf(p);
    const smooth = (arr, f) => arr.map((r, i) => { const a = arr[Math.max(0, i - 1)], c = arr[Math.min(arr.length - 1, i + 1)]; return { ...r, [f]: (a[f] + 2 * r[f] + c[f]) / 4 }; });
    // Center shell: torso rings top to bottom, then rings below the crotch while a skirt continues.
    const legAt = (y) => { const L = this.denseLeg; if (y > L[0].y) return null; for (let i = 0; i < L.length - 1; i++) if (y <= L[i].y && y >= L[i + 1].y) { const t = (L[i].y - y) / (L[i].y - L[i + 1].y); return { x: L[i].x + (L[i + 1].x - L[i].x) * t, r: L[i].r + (L[i + 1].r - L[i].r) * t }; } return L[L.length - 1]; };
    // The shape a skirt hangs from at height y: the torso, or both legs together, whichever is wider.
    const baseAt = (y, torso) => {
      const lg = legAt(y), la = lg ? lg.x + lg.r : 0, lb = lg ? lg.r * 1.15 : 0;
      return { a: Math.max(torso ? torso.a : 0, la) + eps, b: Math.max(torso ? torso.b : 0, lb) + eps };
    };
    const rows = [];
    const flare = (y, base, reach, bodyA) => {
      const run = this.runAt(y, 0, reach);
      let a = base.a, b = base.b, cx = 0;
      if (run) { const hw = (run.r - run.l) / 2; if (hw > a) { b += (hw - a) * 0.95; a = hw; cx = (run.l + run.r) / 2; } }
      return { y, a, b, cx, body: bodyA, hit: !!run };
    };
    for (const r of [...this.denseTorso].reverse()) {
      if (r.y > spec.y.neckTop) continue;
      if (r.y >= spec.y.waist) { rows.push({ y: r.y, a: r.a + eps, b: r.b + eps, cx: 0, body: r.a }); continue; }
      rows.push(flare(r.y, baseAt(r.y, r), r.a * 1.1, r.a));
    }
    // Below the crotch: does a skirt keep going?
    const stepY = spec.H * 0.008;
    let hemY = null, miss = 0;
    for (let y = rows[rows.length - 1].y - stepY; y > spec.H * 0.005; y -= stepY) {
      const base = baseAt(y, null), row = flare(y, base, base.a * 0.9, base.a - eps);
      if (!row.hit) { if (++miss > 2) break; continue; }
      miss = 0; rows.push(row); hemY = y;
    }
    // Fabric hangs down from the hips: below hip level the skirt never gets narrower.
    let maxA = 0, maxB = 0;
    for (const r of rows) {
      if (r.y > spec.y.hip) continue;
      if (r.a < maxA) { r.cx = r.cx * (r.a / maxA); r.a = maxA; }
      if (r.b < maxB) r.b = maxB;
      maxA = r.a; maxB = r.b;
      if (r.y < spec.y.crotch && !r.hit) break;
    }
    let center = rows;
    for (let k = 0; k < 3; k++) center = smooth(smooth(center, 'a'), 'b');
    for (let k = 0; k < 6; k++) center = smooth(center, 'cx');
    const centerGeo = loft(center, (r, c, s) => { const x = r.cx + r.a * c; const bz = r.a - eps > r.body * 1.2 ? 0 : spec.bulge(r.y, x - r.cx, r.body, s); return [x, r.y, r.b * s + bz]; }, { uvFn });
    const geos = [centerGeo];
    const skirtAt = (y) => hemY !== null && y >= hemY - stepY;
    // Legs (trousers): follow each leg, widen for flares where no skirt covers it.
    for (const side of [-1, 1]) {
      const lrows = this.denseLeg.map((r) => {
        let rr = r.r + eps, x = side * r.x;
        if (!skirtAt(r.y) && r.y < spec.y.crotch) { const run = this.runAt(r.y, x, r.r * 1.3); if (run && !this.opaque(0, r.y)) { const hw = (run.r - run.l) / 2; if (hw > rr) { rr = hw; x = (run.l + run.r) / 2; } } }
        return { y: r.y, r: rr, x };
      });
      geos.push(loft(smooth(lrows, 'r'), (r, c, s) => [r.x + r.r * c, r.y, r.r * 0.96 * s], { uvFn }));
    }
    // Sleeves follow the arms.
    for (const side of [-1, 1]) {
      geos.push(loft(this.denseArm, (r, c, s) => { const p = this.armPoint(side, r.d), rr = r.r + eps * 0.8 + Math.max(0, 1 - r.d / (spec.H * 0.06)) * 0.012; const ux = Math.cos(ARM_ANGLE), uy = Math.sin(ARM_ANGLE) * side; return [p.x + rr * c * ux * side, p.y + rr * c * uy * side, rr * 0.94 * s]; }, { uvFn }));
    }
    for (const g of geos) for (const [i, mat] of this.garmentMats.entries()) {
      const m = new THREE.Mesh(g, mat); m.castShadow = i === 1; m.renderOrder = 1 + i; m.userData.garment = true; this.garmentGroup.add(m);
    }
    this.measure = this.measureGarment(center, hemY);
  }

  // Garment measurements in cm, worked out from the shell.
  measureGarment(center, hemY) {
    const spec = this.spec, at = (y) => center.reduce((best, r) => Math.abs(r.y - y) < Math.abs(best.y - y) ? r : best, center[0]);
    const covered = (y) => this.opaque(0, y) || !!this.runAt(y, 0, spec.half.hip);
    const circ = (y) => { if (!covered(y)) return null; const r = at(y); return ellipsePerimeter(r.a, r.b) * 100; };
    // Top and bottom of the garment along the body's center line.
    let top = null, bottom = null;
    for (let y = spec.y.neckTop; y > 0; y -= spec.H * 0.004) { if (covered(y)) { if (top === null) top = y; bottom = y; } }
    let legBottom = null;
    for (let y = spec.y.crotch; y > 0; y -= spec.H * 0.004) { const x = this.denseLeg[0].x; if (this.runAt(y, x, 0.08) && !covered(y)) legBottom = y; }
    const out = {
      bust: circ(spec.y.bust), waist: circ(spec.y.waist), hip: circ(spec.y.hip),
      length: top !== null ? (top - bottom) * 100 : null,
      hem: hemY !== null ? circ(hemY) : (bottom !== null && bottom > spec.y.crotch ? circ(bottom) : null),
      inseam: legBottom !== null ? (spec.y.crotch - legBottom) * 100 : null,
    };
    // Sleeve length: how far along the arm the drawing reaches.
    let sleeve = null;
    for (let d = 0; d <= this.spec.armLen; d += 0.005) { const p = this.armPoint(1, d); if (this.opaque(p.x, p.y)) sleeve = d; else if (sleeve !== null && d - sleeve > 0.03) break; }
    out.sleeve = sleeve !== null ? sleeve * 100 : null;
    return out;
  }

  // Board pixel under a screen point, if it lands on the garment.
  pick(clientX, clientY) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, this.camera);
    const hits = ray.intersectObjects([...this.garmentGroup.children, ...this.bodyGroup.children], false);
    for (const h of hits) {
      if (!h.object.userData.garment) return null;
      const [px, py] = this.toBoard(h.point.x, h.point.y);
      if (this.opaque(h.point.x, h.point.y)) return [Math.round(px), Math.round(py)];
    }
    return null;
  }

  view(which) {
    const H = this.spec.H, d = H * 2.55, y = H * 0.62;
    const to = which === 'back' ? new THREE.Vector3(0, y, -d) : which === 'side' ? new THREE.Vector3(d, y, 0) : which === 'close' ? new THREE.Vector3(0, H * 0.7, H * 1.4) : new THREE.Vector3(0, y, d);
    this.anim = { from: this.camera.position.clone(), to, start: performance.now() };
  }
  setAutoRotate(on) { this.controls.autoRotate = on; }
  setBackground(hex) { this.scene.background = new THREE.Color(hex); }

  screenshot() { this.tick(); return this.renderer.domElement.toDataURL('image/png'); }

  async exportGLB() {
    const group = new THREE.Group();
    this.bodyGroup.children.forEach((m) => group.add(new THREE.Mesh(m.geometry, m.material).copy(m, false)));
    const front = this.garmentGroup.children.filter((m) => m.material.side === THREE.FrontSide);
    const two = this.garmentMats[1]?.clone(); if (two) two.side = THREE.DoubleSide;
    front.forEach((m) => group.add(new THREE.Mesh(m.geometry, two)));
    const ex = new GLTFExporter();
    return new Promise((res, rej) => ex.parse(group, (buf) => res(new Blob([buf], { type: 'model/gltf-binary' })), rej, { binary: true }));
  }
}
