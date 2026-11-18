// The 3D view: camera, lights, the part mesh, edges, origin planes and picking.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

THREE.Object3D.DEFAULT_UP.set(0, 0, 1);

export const COLORS = {
  edge: 0x1f2a33, hoverFace: 0x2ec4b6, hoverEdge: 0xff8c1a, selFace: 0x1b9aaa, selEdge: 0xe8590c,
  planeXY: 0x4c8bf5, planeXZ: 0x39b26b, planeYZ: 0xe5534b,
};

export class Viewport {
  constructor(container) {
    this.el = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    container.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100000, 100000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(200, -260, 180);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;
    this.controls.zoomToCursor = true;
    this.controls.mouseButtons = { LEFT: null, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
    this.controls.addEventListener('change', () => this.render());
    this.viewHeight = 200;

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8f99, 1.6));
    this.sun = new THREE.DirectionalLight(0xffffff, 1.6);
    this.camera.add(this.sun);
    this.sun.position.set(-1, 2, 3);
    this.scene.add(this.camera);

    this.partGroup = new THREE.Group();
    this.scene.add(this.partGroup);
    this.overlay = new THREE.Group(); // highlights
    this.scene.add(this.overlay);
    this.sketchGroup = new THREE.Group();
    this.scene.add(this.sketchGroup);

    this.material = new THREE.MeshStandardMaterial({ color: 0x8fb3c9, metalness: 0.15, roughness: 0.55, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, side: THREE.DoubleSide });
    this.edgeMat = new THREE.LineBasicMaterial({ color: COLORS.edge });
    this.style = 'edges';
    this.desc = null;
    this.mesh = null;
    this.edgeLines = null;
    this.makeOrigin();
    this.makeGrid();

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);
    this.resize();
  }

  makeOrigin() {
    const g = new THREE.Group();
    const S = 40;
    const mk = (color, name, rot) => {
      const geo = new THREE.PlaneGeometry(S, S);
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false }));
      const border = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 }));
      m.add(border);
      m.userData.planeName = name;
      if (rot) rot(m);
      g.add(m);
      return m;
    };
    this.planes = {
      XY: mk(COLORS.planeXY, 'XY'),
      XZ: mk(COLORS.planeXZ, 'XZ', (m) => m.rotation.set(Math.PI / 2, 0, 0)),
      YZ: mk(COLORS.planeYZ, 'YZ', (m) => m.rotation.set(Math.PI / 2, Math.PI / 2, 0)),
    };
    const axis = (dir, color) => {
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(...dir).multiplyScalar(S * 0.75)]);
      g.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color })));
    };
    axis([1, 0, 0], 0xe5534b); axis([0, 1, 0], 0x39b26b); axis([0, 0, 1], 0x4c8bf5);
    this.originGroup = g;
    this.planesVisible = false;
    for (const p of Object.values(this.planes)) p.visible = false;
    this.scene.add(g);
  }

  showPlanes(on) {
    this.planesVisible = on;
    for (const p of Object.values(this.planes)) p.visible = on;
    this.render();
  }

  makeGrid() {
    const grid = new THREE.GridHelper(400, 40, 0xb9c2cc, 0xdde2e7);
    grid.rotation.x = Math.PI / 2;
    grid.material.transparent = true;
    grid.material.opacity = 0.55;
    grid.material.depthWrite = false;
    this.grid = grid;
    this.scene.add(grid);
  }

  setColor(hex) { this.material.color.set(hex); this.render(); }

  resize() {
    const w = this.el.clientWidth || 1, h = this.el.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = w + 'px';
    this.renderer.domElement.style.height = h + 'px';
    this.aspect = w / h;
    this.updateFrustum();
  }
  updateFrustum() {
    const h = this.viewHeight / 2, w = h * this.aspect;
    Object.assign(this.camera, { left: -w, right: w, top: h, bottom: -h });
    this.camera.updateProjectionMatrix();
    this.render();
  }
  // World units per screen pixel.
  pixelSize() { return this.viewHeight / this.camera.zoom / (this.el.clientHeight || 1); }

  render() {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = 0;
      if (this.onBeforeRender) this.onBeforeRender();
      this.renderer.render(this.scene, this.camera);
    });
  }

  setPart(desc) {
    this.desc = desc;
    if (this.mesh) { this.partGroup.remove(this.mesh); this.mesh.geometry.dispose(); this.mesh = null; }
    if (this.edgeLines) { this.partGroup.remove(this.edgeLines); this.edgeLines.geometry.dispose(); this.edgeLines = null; }
    this.clearHighlights();
    if (desc) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(desc.vertices, 3));
      geo.setAttribute('normal', new THREE.BufferAttribute(desc.normals, 3));
      geo.setIndex(new THREE.BufferAttribute(desc.triangles, 1));
      geo.computeBoundingSphere();
      this.mesh = new THREE.Mesh(geo, this.material);
      this.partGroup.add(this.mesh);
      const eg = new THREE.BufferGeometry();
      eg.setAttribute('position', new THREE.BufferAttribute(desc.lines, 3));
      // meshEdges lines are polylines per edge; convert to segments.
      const idx = [];
      for (const [start, count] of desc.edgeGroups) for (let k = start; k < start + count - 1; k++) idx.push(k, k + 1);
      eg.setIndex(idx);
      this.edgeLines = new THREE.LineSegments(eg, this.edgeMat);
      this.partGroup.add(this.edgeLines);
    }
    this.applyStyle();
  }

  applyStyle(style = this.style) {
    this.style = style;
    if (this.onStyle) this.onStyle();
    if (this.mesh) {
      this.mesh.visible = style !== 'wire';
    }
    if (this.edgeLines) this.edgeLines.visible = style !== 'shaded';
    this.render();
  }

  setGhost(on) {
    this.material.transparent = on;
    this.material.opacity = on ? 0.35 : 1;
    this.material.depthWrite = !on;
    this.material.needsUpdate = true;
    this.render();
  }

  // Frame a bounding box [[x,y,z],[x,y,z]].
  fit(bb) {
    if (!bb && this.fitOverride) return this.fitOverride();
    if (!bb) bb = this.desc ? this.desc.bb : [[-50, -50, 0], [50, 50, 50]];
    const c = new THREE.Vector3((bb[0][0] + bb[1][0]) / 2, (bb[0][1] + bb[1][1]) / 2, (bb[0][2] + bb[1][2]) / 2);
    const size = Math.max(10, Math.hypot(bb[1][0] - bb[0][0], bb[1][1] - bb[0][1], bb[1][2] - bb[0][2]));
    const dir = this.camera.position.clone().sub(this.controls.target).normalize();
    this.controls.target.copy(c);
    this.camera.position.copy(c).add(dir.multiplyScalar(size * 4));
    this.viewHeight = size * 1.3;
    this.camera.zoom = 1;
    this.updateFrustum();
    this.controls.update();
  }

  setView(name) {
    const dirs = {
      home: [1, -1.3, 0.9], front: [0, -1, 0], back: [0, 1, 0], top: [0, 0, 1], bottom: [0, 0, -1],
      right: [1, 0, 0], left: [-1, 0, 0],
    };
    const ups = { top: [0, 1, 0], bottom: [0, -1, 0] };
    const d = new THREE.Vector3(...dirs[name]).normalize();
    this.lookAlong(d, new THREE.Vector3(...(ups[name] || [0, 0, 1])));
    this.fit();
  }

  // OrbitControls remembers which way is up; keep it in step with the camera.
  setUp(up) {
    this.camera.up.copy(up);
    this.controls._quat.setFromUnitVectors(this.camera.up, new THREE.Vector3(0, 1, 0));
    this.controls._quatInverse.copy(this.controls._quat).invert();
  }

  lookAlong(dir, up, target) {
    const t = (target || this.controls.target).clone();
    const dist = Math.max(500, this.camera.position.distanceTo(this.controls.target));
    this.controls.target.copy(t);
    this.setUp(up);
    this.camera.position.copy(t).add(dir.clone().multiplyScalar(dist));
    this.camera.lookAt(t);
    this.controls.update();
    this.render();
  }

  // --- picking ---
  ray(ev) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((ev.clientX - rect.left) / rect.width) * 2 - 1, -((ev.clientY - rect.top) / rect.height) * 2 + 1);
    const rc = new THREE.Raycaster();
    rc.setFromCamera(ndc, this.camera);
    rc.params.Line.threshold = this.pixelSize() * 6;
    return rc;
  }

  faceAt(triIndex) {
    const pos = triIndex * 3;
    const fg = this.desc.faceGroups;
    for (let i = 0; i < fg.length; i++) if (pos >= fg[i][0] && pos < fg[i][0] + fg[i][1]) return i;
    return -1;
  }
  edgeAt(vertIndex) {
    const eg = this.desc.edgeGroups;
    for (let i = 0; i < eg.length; i++) if (vertIndex >= eg[i][0] && vertIndex < eg[i][0] + eg[i][1]) return i;
    return -1;
  }

  // want: {faces, edges, planes}
  pick(ev, want) {
    const rc = this.ray(ev);
    if (want.edges && this.edgeLines && this.desc) {
      const vis = this.edgeLines.visible;
      this.edgeLines.visible = true;
      const hits = rc.intersectObject(this.edgeLines);
      this.edgeLines.visible = vis;
      // Prefer edges in front of the part surface.
      let faceDist = Infinity;
      if (this.mesh) { const fh = rc.intersectObject(this.mesh); if (fh.length) faceDist = fh[0].distance; }
      const tol = this.pixelSize() * 8;
      const h = hits.find((x) => x.distance <= faceDist + tol);
      if (h) return { kind: 'edge', index: this.edgeAt(h.index), point: h.point.toArray() };
    }
    if (want.faces && this.mesh && this.desc) {
      const hits = rc.intersectObject(this.mesh);
      if (hits.length) {
        const fi = this.faceAt(hits[0].faceIndex);
        if (fi >= 0) return { kind: 'face', index: fi, point: hits[0].point.toArray(), info: this.desc.faces[fi] };
      }
    }
    if (want.planes) {
      const objs = Object.values(this.planes);
      const hits = rc.intersectObjects(objs, false);
      if (hits.length) return { kind: 'plane', name: hits[0].object.userData.planeName, point: hits[0].point.toArray() };
    }
    return null;
  }

  clearHighlights() {
    for (const c of [...this.overlay.children]) { this.overlay.remove(c); c.geometry && c.geometry.dispose(); }
    this.render();
  }

  faceGeometry(i) {
    const [start, count] = this.desc.faceGroups[i];
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', this.mesh.geometry.getAttribute('position'));
    geo.setIndex(Array.from(this.desc.triangles.subarray(start, start + count)));
    return geo;
  }
  edgeGeometry(i) {
    const [start, count] = this.desc.edgeGroups[i];
    const pts = [];
    for (let k = start; k < start + count; k++) pts.push(new THREE.Vector3(this.desc.lines[k * 3], this.desc.lines[k * 3 + 1], this.desc.lines[k * 3 + 2]));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }

  // items: [{kind:'face'|'edge'|'plane', index|name, color}]
  highlight(items) {
    this.clearHighlights();
    for (const it of items) this.addHighlight(it);
    this.render();
  }
  addHighlight(it) {
    {
      if (it.kind === 'face' && this.desc && it.index >= 0 && it.index < this.desc.faceGroups.length) {
        const m = new THREE.Mesh(this.faceGeometry(it.index), new THREE.MeshBasicMaterial({ color: it.color, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthTest: true, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }));
        this.overlay.add(m);
      } else if (it.kind === 'edge' && this.desc && it.index >= 0 && it.index < this.desc.edgeGroups.length) {
        const l = new THREE.Line(this.edgeGeometry(it.index), new THREE.LineBasicMaterial({ color: it.color, depthTest: false }));
        l.renderOrder = 10;
        this.overlay.add(l);
      } else if (it.kind === 'plane') {
        const p = this.planes[it.name];
        const m = new THREE.Mesh(p.geometry.clone(), new THREE.MeshBasicMaterial({ color: it.color, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }));
        m.quaternion.copy(p.quaternion);
        this.overlay.add(m);
      } else if (it.kind === 'point') {
        const s = this.pixelSize() * 5;
        const m = new THREE.Mesh(new THREE.SphereGeometry(s, 12, 8), new THREE.MeshBasicMaterial({ color: it.color, depthTest: false }));
        m.position.set(...it.point);
        m.renderOrder = 11;
        this.overlay.add(m);
      } else if (it.kind === 'segment') {
        const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(it.points.map((p) => new THREE.Vector3(...p))), new THREE.LineDashedMaterial({ color: it.color, depthTest: false, dashSize: this.pixelSize() * 6, gapSize: this.pixelSize() * 4 }));
        l.computeLineDistances();
        l.renderOrder = 10;
        this.overlay.add(l);
      }
    }
  }

  screenOf(v3) {
    const p = new THREE.Vector3(...v3).project(this.camera);
    return [((p.x + 1) / 2) * this.el.clientWidth, ((1 - p.y) / 2) * this.el.clientHeight];
  }

  snapshot() {
    this.renderer.render(this.scene, this.camera);
    return this.renderer.domElement.toDataURL('image/png');
  }
}
