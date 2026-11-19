// Wild Tag: builds every animal out of simple 3D shapes, and paints patterns.
'use strict';

const _texCache = {};
function patternTexture(pid, c1, c2) {
  const key = pid + c1 + c2;
  if (_texCache[key]) return _texCache[key];
  const W = 256, H = 128, cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  const fill = (c) => { g.fillStyle = c; g.fillRect(0, 0, W, H); };
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  fill(c1);
  g.fillStyle = c2; g.strokeStyle = c2;
  switch (pid) {
    case 'stripe1': g.fillRect(0, H * 0.42, W, H * 0.16); break;
    case 'spots':
      for (let i = 0; i < 40; i++) { g.beginPath(); g.ellipse(rnd() * W, rnd() * H, 4 + rnd() * 6, 3 + rnd() * 5, rnd() * 3, 0, 7); g.fill(); }
      break;
    case 'stripes':
      g.lineWidth = 7;
      for (let x = 0; x < W; x += 22) { g.beginPath(); g.moveTo(x, 0); g.bezierCurveTo(x + 10, H * .3, x - 10, H * .6, x + 4, H); g.stroke(); }
      break;
    case 'polka':
      for (let y = 8; y < H; y += 24) for (let x = (y / 24 % 2) * 12 + 8; x < W; x += 24) { g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill(); }
      break;
    case 'checker':
      for (let y = 0; y < H; y += 16) for (let x = 0; x < W; x += 16) if (((x + y) / 16) % 2) g.fillRect(x, y, 16, 16);
      break;
    case 'zigzag':
      g.lineWidth = 6;
      for (let y = 10; y < H; y += 22) { g.beginPath(); for (let x = 0; x <= W; x += 16) g.lineTo(x, y + ((x / 16) % 2 ? 8 : -8)); g.stroke(); }
      break;
    case 'hearts': case 'stars':
      g.font = '20px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      for (let y = 12; y < H; y += 26) for (let x = (y / 26 % 2) * 16 + 12; x < W; x += 32) {
        if (pid === 'hearts') { g.beginPath(); g.moveTo(x, y + 7); g.bezierCurveTo(x - 14, y - 3, x - 5, y - 12, x, y - 4); g.bezierCurveTo(x + 5, y - 12, x + 14, y - 3, x, y + 7); g.fill(); }
        else { g.beginPath(); for (let k = 0; k < 10; k++) { const r = k % 2 ? 3.5 : 9, a = k * Math.PI / 5 - Math.PI / 2; g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.fill(); }
      }
      break;
    case 'camo': {
      const cols = [c2, shade(c1, -0.3), shade(c2, 0.3)];
      for (let i = 0; i < 70; i++) { g.fillStyle = cols[i % 3]; g.beginPath(); g.ellipse(rnd() * W, rnd() * H, 8 + rnd() * 16, 5 + rnd() * 10, rnd() * 3, 0, 7); g.fill(); }
      break;
    }
    case 'swirl':
      g.lineWidth = 5;
      for (let c = 0; c < 4; c++) { const cx = 32 + c * 64, cy = H / 2; g.beginPath(); for (let a = 0; a < 18; a += 0.2) g.lineTo(cx + Math.cos(a) * a * 1.7, cy + Math.sin(a) * a * 1.7); g.stroke(); }
      break;
    case 'lava': {
      fill('#2a0a04');
      g.lineWidth = 4;
      for (let i = 0; i < 26; i++) { g.strokeStyle = i % 2 ? '#ff5a1f' : '#ffb020'; g.beginPath(); let x = rnd() * W, y = rnd() * H; g.moveTo(x, y); for (let k = 0; k < 5; k++) { x += (rnd() - .5) * 50; y += (rnd() - .5) * 30; g.lineTo(x, y); } g.stroke(); }
      break;
    }
    case 'ice': {
      const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#e8fbff'); gr.addColorStop(1, '#7ac8ff'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      g.strokeStyle = '#ffffff'; g.lineWidth = 2;
      for (let i = 0; i < 18; i++) { const x = rnd() * W, y = rnd() * H; for (let k = 0; k < 3; k++) { const a = k * Math.PI / 3; g.beginPath(); g.moveTo(x - Math.cos(a) * 9, y - Math.sin(a) * 9); g.lineTo(x + Math.cos(a) * 9, y + Math.sin(a) * 9); g.stroke(); } }
      break;
    }
    case 'galaxy': {
      fill('#0b0624');
      for (let i = 0; i < 10; i++) { const x = rnd() * W, y = rnd() * H, r = 20 + rnd() * 30; const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, i % 2 ? 'rgba(154,107,255,.7)' : 'rgba(255,79,163,.6)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H); }
      g.fillStyle = '#fff'; for (let i = 0; i < 120; i++) g.fillRect(rnd() * W, rnd() * H, rnd() < .1 ? 2 : 1, rnd() < .1 ? 2 : 1);
      break;
    }
    case 'rainbow': {
      const cs = ['#ff4f6a', '#ff9a3c', '#ffd23f', '#5cd65c', '#3ab0ff', '#9a6bff'];
      cs.forEach((c, i) => { g.fillStyle = c; g.fillRect(0, i * H / 6, W, H / 6 + 1); });
      break;
    }
    case 'gold': {
      const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#fff2a8'); gr.addColorStop(.5, '#e0a820'); gr.addColorStop(1, '#fff0a0'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      break;
    }
    case 'neon':
      fill('#0a0a18'); g.strokeStyle = c2 === '#1d1d22' ? '#2ee6d0' : c2; g.lineWidth = 2;
      for (let x = 0; x <= W; x += 16) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      for (let y = 0; y <= H; y += 16) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      break;
    case 'diamond': {
      fill('#dff6ff');
      for (let y = 0; y < H; y += 16) for (let x = 0; x < W; x += 16) { g.fillStyle = ['#bfefff', '#ffffff', '#9ad8ff', '#e8f9ff'][(x * 7 + y * 3) / 16 % 4 | 0]; g.beginPath(); g.moveTo(x + 8, y); g.lineTo(x + 16, y + 8); g.lineTo(x + 8, y + 16); g.lineTo(x, y + 8); g.fill(); }
      break;
    }
  }
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  _texCache[key] = t;
  return t;
}

function shade(hex, amt) {
  const c = new THREE.Color(hex);
  if (amt < 0) c.multiplyScalar(1 + amt); else c.lerp(new THREE.Color('#ffffff'), amt);
  return '#' + c.getHexString();
}

// ---------- Meshy models (.glb + color mask in models/, made by blender/prepare_meshy.py) ----------
// Animals listed here use their model; the rest are built from shapes below.
const MODEL_IDS = ['gorilla', 'dragon'];
const MODELS = {};
function loadModels(done) {
  if (!window.GLTFLoader || !MODEL_IDS.length) return done();
  const loader = new GLTFLoader(), tl = new THREE.TextureLoader();
  let left = MODEL_IDS.length * 2;
  const fin = () => { if (--left === 0) done(); };
  MODEL_IDS.forEach(id => {
    MODELS[id] = {};
    loader.load('models/' + id + '.glb', g => { MODELS[id].scene = g.scene; fin(); }, undefined, e => { console.warn('Model ' + id + ' did not load, using the built-in shape version.', e); fin(); });
    tl.load('models/' + id + '_mask.png', t => { t.flipY = false; MODELS[id].mask = t; fin(); }, undefined, () => fin());
  });
}
function hasModel(id) { return !!(MODELS[id] && MODELS[id].scene); }

// copy of a model that has a skeleton (each copy needs its own bones)
function cloneSkinned(source) {
  const srcOf = new Map(), copyOf = new Map(), copy = source.clone();
  (function walk(a, b) { srcOf.set(b, a); copyOf.set(a, b); for (let i = 0; i < a.children.length; i++) walk(a.children[i], b.children[i]); })(source, copy);
  copy.traverse(n => {
    if (!n.isSkinnedMesh) return;
    const sm = srcOf.get(n);
    n.skeleton = sm.skeleton.clone(); n.bindMatrix.copy(sm.bindMatrix);
    n.skeleton.bones = sm.skeleton.bones.map(b => copyOf.get(b));
    n.bind(n.skeleton, n.bindMatrix);
  });
  return copy;
}

// The model keeps its painted look unless the player picked other colors or a pattern.
// Then the mask says where to repaint: red = main color/pattern, green = accent color.
// The painted light and dark shading is kept by scaling with the original brightness.
function modelMaterial(orig, src, info, look, def) {
  const m = orig.clone(); m.roughness = 0.85; m.metalness = 0;
  if (m.map) m.map.encoding = THREE.LinearEncoding;   // the game shows colors as-is (no color conversion)
  const pid = look.pattern || def.defPattern || 'solid', c1 = look.c1 || def.c1, c2 = look.c2 || def.c2;
  const changed = pid !== (def.defPattern || 'solid') || c1 !== def.c1 || c2 !== def.c2;
  if (!changed || !src.mask) return m;
  const u = { maskMap: { value: src.mask }, patMap: { value: patternTexture(pid, c1, c2) }, accCol: { value: new THREE.Color(c2) },
    bodyLum: { value: info.bodyLum || 0.4 }, accLum: { value: info.accLum || 0.7 } };
  m.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, u);
    sh.vertexShader = 'varying vec3 vObjPos;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvObjPos = position;');
    sh.fragmentShader = 'uniform sampler2D maskMap; uniform sampler2D patMap; uniform vec3 accCol; uniform float bodyLum; uniform float accLum; varying vec3 vObjPos;\n' +
      sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
      { vec4 mk = texture2D(maskMap, vUv); float l = dot(sampledDiffuseColor.rgb, vec3(0.299, 0.587, 0.114));
        vec2 pu = vec2((atan(vObjPos.x, vObjPos.z) / 6.2832 + 0.5) * 2.0, vObjPos.y * 0.9);
        vec3 pc = texture2D(patMap, pu).rgb;
        diffuseColor.rgb = mix(diffuseColor.rgb, pc * clamp(l / bodyLum, 0.35, 1.8), mk.r);
        diffuseColor.rgb = mix(diffuseColor.rgb, accCol * clamp(l / accLum, 0.35, 1.3), mk.g); }`);
  };
  m.customProgramCacheKey = () => 'wildtag-recolor';
  return m;
}

function buildFromModel(def, look) {
  const src = MODELS[def.id], body = cloneSkinned(src.scene);
  let info = {}; body.traverse(n => { if (n.userData && n.userData.headR) info = n.userData; });
  const mats = [];
  body.traverse(n => { if (n.isMesh) { n.castShadow = true; n.frustumCulled = false; n.material = modelMaterial(n.material, src, info, look, def); mats.push(n.material); } });
  body.updateMatrixWorld(true);
  const rig = { legs: [], arms: [], wings: [], tails: [], body, mats, bodyMat: mats[0], glb: true };
  const node = (n) => body.getObjectByName(n);
  // for each bone, remember its rest pose and the model's x/y/z axes as seen from the bone
  const prep = (n, list, extra) => {
    const b = node(n); if (!b) return null;
    const inv = b.getWorldQuaternion(new THREE.Quaternion()).invert();
    b.userData.rest = b.quaternion.clone();
    b.userData.ax = { x: new THREE.Vector3(1, 0, 0).applyQuaternion(inv), y: new THREE.Vector3(0, 1, 0).applyQuaternion(inv), z: new THREE.Vector3(0, 0, 1).applyQuaternion(inv) };
    Object.assign(b.userData, extra || {}); if (list) list.push(b); return b;
  };
  prep('LegL', rig.legs, { phase: 1 }); prep('LegR', rig.legs, { phase: -1 });
  prep('LegFL', rig.legs, { phase: 1 }); prep('LegFR', rig.legs, { phase: -1 }); prep('LegBL', rig.legs, { phase: -1 }); prep('LegBR', rig.legs, { phase: 1 });
  prep('ArmL', rig.arms, { phase: -1 }); prep('ArmR', rig.arms, { phase: 1 });
  prep('WingL', rig.wings, { side: 1 }); prep('WingR', rig.wings, { side: -1 });
  prep('Tail', rig.tails, { k: 1 }); prep('Tail2', rig.tails, { k: 1.6 });
  rig.head = prep('Head');
  rig.anchors = { hat: node('Hat'), face: node('Face'), neck: node('Neck'), back: node('Back') };
  // wearable points come out of Blender turned with their bone: line them up with the model again
  for (const k in rig.anchors) { const a = rig.anchors[k]; if (a) { a.quaternion.copy(a.parent.getWorldQuaternion(new THREE.Quaternion()).invert()); a.scale.setScalar(1); } }
  rig.headR = info.headR || 0.3; rig.eyeX = info.eyeX || 0.1;
  return rig;
}
const _bq = new THREE.Quaternion(), _bq2 = new THREE.Quaternion();
// turn a bone from its rest pose around the model's axis (x = nod/swing, y = turn, z = flap)
function boneRot(b, ax, a, ax2, a2) {
  b.quaternion.copy(b.userData.rest);
  if (a) b.quaternion.multiply(_bq.setFromAxisAngle(b.userData.ax[ax], a));
  if (a2) b.quaternion.multiply(_bq2.setFromAxisAngle(b.userData.ax[ax2], a2));
}

// Builds a creature mesh. Origin at the feet, facing +Z. Returns a Group with userData.rig for animation.
function buildCreature(def, look) {
  look = look || {};
  const c1 = look.c1 || def.c1, c2 = look.c2 || def.c2;
  const pid = look.pattern || def.defPattern || 'solid';
  const pat = PATTERN[pid] || PATTERN.solid;
  const tex = patternTexture(pid, c1, c2);
  const bodyMat = new THREE.MeshStandardMaterial({ map: tex, roughness: pat.metal ? 0.25 : 0.75, metalness: pat.metal ? 0.7 : 0.05,
    emissive: pat.glow ? new THREE.Color(0xffffff) : new THREE.Color(0), emissiveMap: pat.glow ? tex : null, emissiveIntensity: pat.glow ? 0.35 : 0 });
  const accMat = new THREE.MeshStandardMaterial({ color: c2, roughness: 0.7 });
  const darkMat = new THREE.MeshStandardMaterial({ color: shade(c1, -0.45), roughness: 0.8 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4 });
  const blackMat = new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.3 });
  const hornMat = new THREE.MeshStandardMaterial({ color: '#f5ead2', roughness: 0.5 });
  const mats = [bodyMat, accMat, darkMat];

  const root = new THREE.Group();
  if (hasModel(def.id)) {
    const rig = buildFromModel(def, look);
    root.add(rig.body);
    addWearables(rig, look.wear || {}, rig.head, rig.headR, def.shape, def, rig.anchors, rig.eyeX);
    if (def.glow) {
      const aura = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.95, 32), new THREE.MeshBasicMaterial({ color: def.glow, transparent: true, opacity: .55, side: THREE.DoubleSide }));
      aura.rotation.x = -Math.PI / 2; aura.position.y = 0.05; root.add(aura); rig.aura = aura;
      const pl = new THREE.PointLight(def.glow, 0.8, 5); pl.position.y = 1.2; root.add(pl);
    }
    root.scale.setScalar(def.size);
    root.userData.rig = rig;
    return root;
  }
  const body = new THREE.Group(); root.add(body);        // everything that tilts/bobs
  const rig = { legs: [], arms: [], wings: [], tails: [], body, mats, bodyMat };
  const S = (r, w = 14, h = 10) => new THREE.SphereGeometry(r, w, h);
  const mesh = (geo, mat, x = 0, y = 0, z = 0, parent = body) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; parent.add(m); return m; };
  const limb = (len, rad, mat, x, y, z, parent = body) => {
    const pivot = new THREE.Group(); pivot.position.set(x, y, z); parent.add(pivot);
    const m = mesh(new THREE.CylinderGeometry(rad, rad * 0.85, len, 8), mat, 0, -len / 2, 0, pivot);
    mesh(S(rad * 1.05, 8, 6), mat, 0, -len, 0, pivot);
    return pivot;
  };

  let head, headR = 0.36, hy, hz;
  const shape = def.shape;
  if (shape === 'quad') {
    mesh(S(1), bodyMat, 0, 0.75, 0).scale.set(0.5, 0.45, 0.8);
    hy = 1.15; hz = 0.75; head = mesh(S(headR), bodyMat, 0, hy, hz);
    [[-0.28, 0.5], [0.28, 0.5], [-0.28, -0.5], [0.28, -0.5]].forEach(([x, z]) => rig.legs.push(limb(0.5, 0.11, darkMat, x, 0.55, z)));
  } else if (shape === 'ape') {
    mesh(S(1), bodyMat, 0, 1.0, 0).scale.set(0.55, 0.6, 0.45);
    mesh(S(1), accMat, 0, 0.95, 0.22).scale.set(0.38, 0.42, 0.25);
    hy = 1.68; hz = 0.12; head = mesh(S(headR), bodyMat, 0, hy, hz);
    mesh(S(0.22), accMat, 0, 1.6, 0.36).scale.set(1.1, 0.75, 0.6);
    rig.arms.push(limb(1.0, 0.14, bodyMat, -0.58, 1.35, 0.05), limb(1.0, 0.14, bodyMat, 0.58, 1.35, 0.05));
    rig.legs.push(limb(0.45, 0.15, darkMat, -0.25, 0.48, 0), limb(0.45, 0.15, darkMat, 0.25, 0.48, 0));
  } else if (shape === 'biped') {
    const b = mesh(S(1), bodyMat, 0, 1.0, -0.1); b.scale.set(0.45, 0.6, 0.45); b.rotation.x = 0.35;
    mesh(S(1), accMat, 0, 0.95, 0.15).scale.set(0.32, 0.45, 0.25);
    hy = 1.65; hz = 0.25; head = mesh(S(0.3), bodyMat, 0, hy, hz); headR = 0.3;
    rig.arms.push(limb(0.4, 0.07, bodyMat, -0.3, 1.3, 0.25), limb(0.4, 0.07, bodyMat, 0.3, 1.3, 0.25));
    rig.legs.push(limb(0.6, 0.16, bodyMat, -0.28, 0.62, -0.1), limb(0.6, 0.16, bodyMat, 0.28, 0.62, -0.1));
  } else if (shape === 'bird') {
    mesh(S(1), bodyMat, 0, 0.8, 0).scale.set(0.45, 0.55, 0.5);
    mesh(S(1), accMat, 0, 0.75, 0.2).scale.set(0.34, 0.42, 0.34);
    hy = 1.38; hz = 0.12; headR = 0.3; head = mesh(S(headR), bodyMat, 0, hy, hz);
    rig.legs.push(limb(0.3, 0.05, hornMat, -0.18, 0.32, 0), limb(0.3, 0.05, hornMat, 0.18, 0.32, 0));
  } else if (shape === 'blob') {
    mesh(S(1), bodyMat, 0, 0.6, 0).scale.set(0.62, 0.55, 0.6);
    hy = 0.75; hz = 0.3; headR = 0.5; head = new THREE.Group(); head.position.set(0, hy, hz); body.add(head);
    if (!def.parts.includes('tentacles')) rig.legs.push(limb(0.3, 0.12, bodyMat, -0.35, 0.3, 0.2), limb(0.3, 0.12, bodyMat, 0.35, 0.3, 0.2), limb(0.3, 0.14, bodyMat, -0.35, 0.3, -0.25), limb(0.3, 0.14, bodyMat, 0.35, 0.3, -0.25));
  } else if (shape === 'spider') {
    mesh(S(1), bodyMat, 0, 0.75, -0.35).scale.set(0.5, 0.42, 0.55);
    hy = 0.7; hz = 0.3; headR = 0.3; head = mesh(S(headR), darkMat, 0, hy, hz);
  }

  // eyes
  const eyeY = shape === 'blob' ? 0.2 : 0.08, eyeZ = headR * 0.85, eyeX = headR * 0.42;
  if (!def.parts.includes('eyes_top')) {
    [-1, 1].forEach(s => { mesh(S(headR * 0.26, 10, 8), whiteMat, s * eyeX, eyeY, eyeZ, head); mesh(S(headR * 0.14, 8, 6), blackMat, s * eyeX, eyeY, eyeZ + headR * 0.17, head); });
  }

  const P = def.parts;
  const has = (p) => P.includes(p);
  if (has('eyes_top')) {
    [-1, 1].forEach(s => { mesh(S(0.16, 10, 8), bodyMat, s * 0.26, (shape === 'blob' ? 0.45 : 0.28), 0.05, head); mesh(S(0.12, 10, 8), whiteMat, s * 0.26, (shape === 'blob' ? 0.47 : 0.3), 0.13, head); mesh(S(0.06, 8, 6), blackMat, s * 0.26, (shape === 'blob' ? 0.47 : 0.3), 0.23, head); });
  }
  if (has('ears_round')) [-1, 1].forEach(s => mesh(S(headR * 0.32, 10, 8), darkMat, s * headR * 0.85, headR * 0.6, -0.02, head).scale.set(1, 1, 0.45));
  if (has('ears_big')) [-1, 1].forEach(s => mesh(S(headR * 0.55, 12, 8), accMat, s * headR * 0.9, headR * 0.75, -0.05, head).scale.set(1, 1, 0.25));
  if (has('ears_pointy')) [-1, 1].forEach(s => { const e = mesh(new THREE.ConeGeometry(headR * 0.3, headR * 0.8, 6), bodyMat, s * headR * 0.55, headR * 0.95, -0.02, head); e.rotation.z = -s * 0.25; });
  if (has('ears_long')) [-1, 1].forEach(s => { const e = mesh(new THREE.CapsuleGeometry(0.08, 0.5, 4, 8), bodyMat, s * 0.14, headR + 0.32, -0.05, head); e.rotation.z = -s * 0.15; e.scale.z = 0.5; mesh(new THREE.CapsuleGeometry(0.045, 0.4, 4, 8), accMat, 0, 0, 0.04, e); });
  if (has('ears_huge')) [-1, 1].forEach(s => { const e = mesh(S(headR * 0.85, 12, 8), bodyMat, s * headR * 1.05, 0.02, -0.08, head); e.scale.set(0.25, 1, 0.9); rig.ears = rig.ears || []; rig.ears.push(e); });
  if (has('snout_small')) mesh(S(headR * 0.4, 10, 8), accMat, 0, -headR * 0.25, headR * 0.85, head).scale.set(1.1, 0.8, 0.8);
  if (has('snout_long')) { mesh(S(headR * 0.45, 10, 8), bodyMat, 0, -headR * 0.2, headR * 0.95, head).scale.set(0.8, 0.7, 1.3); mesh(S(headR * 0.12, 8, 6), blackMat, 0, -headR * 0.1, headR * 1.5, head); }
  if (has('beak')) { const b = mesh(new THREE.ConeGeometry(headR * 0.3, headR * 0.9, 8), new THREE.MeshStandardMaterial({ color: '#f2a521' }), 0, -0.04, headR + 0.12, head); b.rotation.x = Math.PI / 2; }
  if (has('horn')) { const h = mesh(new THREE.ConeGeometry(0.1, 0.4, 8), hornMat, 0, 0.05, headR + 0.2, head); h.rotation.x = 1.1; }
  if (has('horn_spiral')) { const h = mesh(new THREE.ConeGeometry(0.07, 0.6, 12), new THREE.MeshStandardMaterial({ color: '#ffe48a', metalness: .6, roughness: .3, emissive: '#ffb020', emissiveIntensity: .3 }), 0, headR + 0.2, headR * 0.5, head); h.rotation.x = 0.5; }
  if (has('horns')) [-1, 1].forEach(s => { const h = mesh(new THREE.ConeGeometry(0.06, 0.38, 8), hornMat, s * headR * 0.55, headR * 0.9, -0.1, head); h.rotation.set(-0.5, 0, -s * 0.4); });
  if (has('trunk')) { const t = new THREE.Group(); t.position.set(0, -0.05, headR * 0.9); head.add(t); for (let i = 0; i < 5; i++) mesh(new THREE.CylinderGeometry(0.1 - i * 0.012, 0.1 - i * 0.012, 0.16, 8), bodyMat, 0, -i * 0.13, 0.05 + i * 0.03, t).rotation.x = 0.4; rig.trunk = t; }
  if (has('mane')) { for (let i = 0; i < 7; i++) mesh(S(0.14, 8, 6), accMat, 0, headR * 0.9 - i * 0.1, -headR * 0.5 - i * 0.07, head); }
  if (has('crest')) { for (let i = 0; i < 3; i++) { const f = mesh(new THREE.ConeGeometry(0.06, 0.35, 6), accMat, 0, headR + 0.12, -0.05 - i * 0.1, head); f.rotation.x = -0.4 - i * 0.25; } }

  // tails (attach at back of body)
  const backZ = shape === 'quad' ? -0.78 : shape === 'ape' ? -0.38 : shape === 'biped' ? -0.45 : -0.45;
  const backY = shape === 'quad' ? 0.85 : shape === 'ape' ? 0.7 : shape === 'biped' ? 0.65 : 0.7;
  const tailPivot = () => { const p = new THREE.Group(); p.position.set(0, backY, backZ); body.add(p); rig.tails.push(p); return p; };
  if (has('tail_long')) { const p = tailPivot(); const t = mesh(new THREE.CapsuleGeometry(0.06, 0.8, 4, 8), bodyMat, 0, 0.2, -0.35, p); t.rotation.x = -0.9; }
  if (has('tail_thick')) { const p = tailPivot(); const t = mesh(new THREE.ConeGeometry(0.18, 1.0, 8), bodyMat, 0, -0.25, -0.4, p); t.rotation.x = -2.0; }
  if (has('tail_short')) { const p = tailPivot(); mesh(new THREE.CapsuleGeometry(0.05, 0.2, 4, 8), darkMat, 0, -0.05, -0.12, p).rotation.x = -2.4; }
  if (has('tail_puff')) { const p = tailPivot(); mesh(S(0.15), accMat, 0, 0, -0.05, p); }
  if (has('tail_fluffy')) { const p = tailPivot(); const t = mesh(S(0.22, 12, 8), bodyMat, 0, 0.3, -0.25, p); t.scale.set(0.9, 2.0, 0.9); t.rotation.x = -0.6; mesh(S(0.15, 10, 8), accMat, 0, 0.55, -0.35, p); }
  if (has('tail_curly')) { const p = tailPivot(); const t = mesh(new THREE.TorusGeometry(0.18, 0.04, 6, 14, 5), bodyMat, 0, 0.18, -0.15, p); t.rotation.y = Math.PI / 2; }
  if (has('tails9')) { for (let i = 0; i < 9; i++) { const p = tailPivot(); p.rotation.y = (i - 4) * 0.22; const t = mesh(S(0.14, 10, 8), bodyMat, 0, 0.35, -0.35, p); t.scale.set(0.8, 2.6, 0.8); t.rotation.x = -0.7; mesh(S(0.1, 8, 6), accMat, 0, 0.7, -0.6, p); } }

  // wings
  const wingY = shape === 'quad' ? 1.0 : shape === 'ape' ? 1.25 : 0.95, wingZ = shape === 'quad' ? 0.15 : 0;
  const addWings = (mat, span, bat) => [-1, 1].forEach(s => {
    const p = new THREE.Group(); p.position.set(s * 0.35, wingY, wingZ); body.add(p);
    const w = mesh(new THREE.BoxGeometry(span, 0.04, bat ? 0.55 : 0.45), mat, s * span / 2, 0, 0, p);
    if (bat) for (let k = 0; k < 3; k++) mesh(new THREE.ConeGeometry(0.1, 0.25, 4), mat, s * (0.25 + k * span / 3.5), 0, -0.3, p).rotation.x = Math.PI / 2;
    p.userData.side = s; rig.wings.push(p);
  });
  if (has('wings_bird')) addWings(accMat, 1.0, false);
  if (has('wings_bat')) addWings(darkMat, 1.0, true);
  if (has('flippers')) addWings(bodyMat, 0.35, false);
  if (has('gliders')) [-1, 1].forEach(s => { const g = mesh(new THREE.BoxGeometry(0.35, 0.03, 0.9), accMat, s * 0.45, 0.72, 0); g.visible = false; rig.gliders = rig.gliders || []; rig.gliders.push(g); });

  if (has('arms_long') && shape !== 'ape') { /* handled by ape */ }
  if (has('shell')) { const sh = mesh(S(1, 14, 8, 0), new THREE.MeshStandardMaterial({ color: c2, roughness: .6 }), 0, 0.85, -0.05); sh.scale.set(0.62, 0.45, 0.85); for (let i = 0; i < 6; i++) mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 6), darkMat, Math.cos(i) * 0.25, 1.22, Math.sin(i) * 0.4).rotation.x = 0.1; rig.shell = sh; }
  if (has('spikes') || has('spikes_back')) {
    const n = has('spikes') ? 26 : 6;
    for (let i = 0; i < n; i++) {
      const a = has('spikes') ? i * 2.4 : 0, z = has('spikes') ? -0.6 + (i / n) * 1.0 : -0.4 + i * 0.16;
      const sp = mesh(new THREE.ConeGeometry(0.05, has('spikes') ? 0.3 : 0.22, 5), has('spikes') ? darkMat : accMat, has('spikes') ? Math.sin(a) * 0.35 : 0, (has('spikes') ? 0.95 + Math.cos(a) * 0.15 : 1.2), z);
      sp.rotation.set(-0.6, 0, has('spikes') ? -Math.sin(a) * 0.8 : 0);
    }
  }
  if (has('tentacles')) for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2, p = new THREE.Group(); p.position.set(Math.cos(a) * 0.35, 0.35, Math.sin(a) * 0.35); body.add(p);
    const t = mesh(new THREE.CapsuleGeometry(0.07, 0.35, 4, 6), bodyMat, Math.cos(a) * 0.12, -0.2, Math.sin(a) * 0.12, p); t.rotation.set(Math.sin(a) * 0.6, 0, -Math.cos(a) * 0.6);
    rig.legs.push(p);
  }
  if (has('legs8')) for (let i = 0; i < 8; i++) {
    const s = i < 4 ? -1 : 1, k = i % 4, p = new THREE.Group(); p.position.set(s * 0.25, 0.75, 0.25 - k * 0.22); body.add(p);
    const up = mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 5), darkMat, s * 0.25, 0.12, 0, p); up.rotation.z = s * 1.1;
    const dn = mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.75, 5), darkMat, s * 0.58, -0.3, 0, p); dn.rotation.z = -s * 0.35;
    rig.legs.push(p);
  }
  if (has('flames')) { const fm = new THREE.MeshBasicMaterial({ color: '#ffb020', transparent: true, opacity: .8 }); for (let i = 0; i < 5; i++) mesh(new THREE.ConeGeometry(0.08, 0.35, 6), fm, (i - 2) * 0.08, 1.75 - Math.abs(i - 2) * 0.05, 0.0); }

  // mythical aura
  if (def.glow) {
    const aura = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.95, 32), new THREE.MeshBasicMaterial({ color: def.glow, transparent: true, opacity: .55, side: THREE.DoubleSide }));
    aura.rotation.x = -Math.PI / 2; aura.position.y = 0.05; root.add(aura); rig.aura = aura;
    const pl = new THREE.PointLight(def.glow, 0.8, 5); pl.position.y = 1.2; root.add(pl);
  }

  // wearables (hats, glasses, neck, back)
  addWearables(rig, look.wear || {}, head, headR, shape, def);

  root.scale.setScalar(def.size);
  rig.head = head;
  root.userData.rig = rig;
  return root;
}

// Little animation each frame. move = 0..1 speed fraction, air = in the air, t = time.
function animateCreature(root, t, move, air, flying, def) {
  const rig = root.userData.rig; if (!rig) return;
  const sw = Math.sin(t * 12) * 0.9 * move;
  if (rig.glb) {
    rig.legs.forEach(l => boneRot(l, 'x', air ? -0.3 * l.userData.phase : sw * 0.55 * l.userData.phase));
    rig.arms.forEach(a => air ? boneRot(a, 'x', -0.35 + Math.sin(t * 10 + a.userData.phase) * 0.1) : boneRot(a, 'x', sw * 0.35 * a.userData.phase));
    const flap = flying ? Math.sin(t * 12) * 0.7 : air ? Math.sin(t * 8) * 0.4 : Math.sin(t * 2) * 0.05;
    rig.wings.forEach(w => boneRot(w, 'z', w.userData.side * flap));
    rig.tails.forEach(tl => boneRot(tl, 'y', Math.sin(t * 4 - tl.userData.k) * 0.25 * tl.userData.k));
    if (rig.head) boneRot(rig.head, 'x', Math.sin(t * 2.2) * 0.05);
    if (rig.aura) rig.aura.rotation.z = t;
    if (rig.spin) rig.spin.rotation.y = t * 12;
    if (rig.cape) rig.cape.rotation.x = 0.35 + move * 0.6 + Math.sin(t * 8) * 0.08;
    rig.body.position.y = move > 0.1 && !air ? Math.abs(Math.sin(t * 12)) * 0.05 : 0;
    return;
  }
  rig.legs.forEach((l, i) => { l.rotation.x = air ? (i % 2 ? 0.5 : -0.5) : (i % 2 ? sw : -sw) * (i >= 2 && def.shape === 'quad' ? -1 : 1); });
  if (def.shape === 'ape') rig.arms.forEach((a, i) => { a.rotation.x = air ? -2.4 + Math.sin(t * 10 + i) * 0.4 : -0.35 + (i ? -sw : sw) * 0.9; a.rotation.z = (i ? 1 : -1) * (air ? 0.6 : 0.15); });
  else rig.arms.forEach((a, i) => { a.rotation.x = -0.6 + (i ? sw : -sw) * 0.3; });
  const flap = flying ? Math.sin(t * 14) * 0.8 : air ? Math.sin(t * 9) * 0.5 : 0.15;
  rig.wings.forEach(w => { w.rotation.z = w.userData.side * (flap); });
  rig.tails.forEach((tl, i) => { tl.rotation.y = Math.sin(t * 6 + i) * 0.35; });
  if (rig.ears) rig.ears.forEach((e, i) => { e.rotation.y = Math.sin(t * 3) * 0.15 * (i ? 1 : -1); });
  if (rig.trunk) rig.trunk.rotation.x = Math.sin(t * 2.5) * 0.2;
  if (rig.aura) rig.aura.rotation.z = t;
  if (rig.spin) rig.spin.rotation.y = t * 12;
  if (rig.cape) rig.cape.rotation.x = 0.35 + move * 0.6 + Math.sin(t * 8) * 0.08;
  rig.body.position.y = move > 0.1 && !air ? Math.abs(Math.sin(t * 12)) * 0.06 : 0;
}

// Puts wearables on an animal. Hat/face go on the head; neck/back go on the body.
function addWearables(rig, wear, head, headR, shape, def, anchors, eyeXOverride) {
  const body = rig.body;
  const M = (c, o) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.6 }, o || {}));
  const add = (geo, mat, x, y, z, parent) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; parent.add(m); return m; };
  const R = headR;
  const topY = shape === 'blob' ? 0.55 : R * 0.82;          // top of head in head space
  const faceZ = shape === 'blob' ? 0.3 : R * 0.92, eyeY = shape === 'blob' ? 0.2 : 0.08;
  const hasTopEyes = def.parts.includes('eyes_top');
  // neck/back anchors in body space
  const neck = { quad: [0, 1.0, 0.55], ape: [0, 1.38, 0.12], biped: [0, 1.38, 0.15], bird: [0, 1.12, 0.1], blob: [0, 0.4, 0.4], spider: [0, 0.65, 0.15] }[shape];
  const back = { quad: [0, 1.15, -0.2], ape: [0, 1.15, -0.4], biped: [0, 1.15, -0.4], bird: [0, 0.95, -0.42], blob: [0, 0.9, -0.3], spider: [0, 1.0, -0.4] }[shape];

  anchors = anchors || {};
  const hat = new THREE.Group(); if (anchors.hat) anchors.hat.add(hat); else { hat.position.set(0, topY, 0); head.add(hat); }
  switch (wear.hat) {
    case 'cap': add(new THREE.SphereGeometry(R * 0.85, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M('#e8423a'), 0, -0.05, 0, hat); add(new THREE.BoxGeometry(R * 1.2, 0.03, R * 0.8), M('#e8423a'), 0, 0, R * 0.8, hat); break;
    case 'beanie': add(new THREE.SphereGeometry(R * 0.88, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M('#3a7bd5'), 0, -0.08, 0, hat); add(new THREE.TorusGeometry(R * 0.82, 0.06, 6, 20), M('#2a5ab0'), 0, -0.06, 0, hat).rotation.x = Math.PI / 2; add(new THREE.SphereGeometry(0.1, 8, 6), M('#fff'), 0, R * 0.85, 0, hat); break;
    case 'tophat': add(new THREE.CylinderGeometry(R * 0.95, R * 0.95, 0.04, 20), M('#111'), 0, 0, 0, hat); add(new THREE.CylinderGeometry(R * 0.6, R * 0.6, R * 1.2, 20), M('#111'), 0, R * 0.6, 0, hat); add(new THREE.CylinderGeometry(R * 0.62, R * 0.62, 0.08, 20), M('#c33a3a'), 0, 0.08, 0, hat); break;
    case 'cowboy': add(new THREE.CylinderGeometry(R * 1.4, R * 1.4, 0.04, 20), M('#8a5a2b'), 0, 0, 0, hat); add(new THREE.CylinderGeometry(R * 0.5, R * 0.65, R * 0.7, 16), M('#8a5a2b'), 0, R * 0.35, 0, hat); break;
    case 'party': { add(new THREE.ConeGeometry(R * 0.45, R * 1.4, 16), M('#ff4fa3'), 0, R * 0.7, 0, hat); add(new THREE.SphereGeometry(0.08, 8, 6), M('#ffd23f'), 0, R * 1.45, 0, hat); break; }
    case 'crown': { const gold = M('#ffd23f', { metalness: .8, roughness: .25, emissive: '#7a5a00', emissiveIntensity: .3 }); add(new THREE.CylinderGeometry(R * 0.6, R * 0.6, R * 0.3, 16, 1, true), gold, 0, R * 0.15, 0, hat); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; add(new THREE.ConeGeometry(0.06, R * 0.35, 4), gold, Math.cos(a) * R * 0.6, R * 0.45, Math.sin(a) * R * 0.6, hat); add(new THREE.SphereGeometry(0.035, 6, 4), M(['#e8423a', '#3ab0ff', '#3fae4a'][i % 3]), Math.cos(a) * R * 0.62, R * 0.15, Math.sin(a) * R * 0.62, hat); } break; }
    case 'wizard': { add(new THREE.CylinderGeometry(R * 1.1, R * 1.1, 0.04, 20), M('#3a2a8f'), 0, 0, 0, hat); const c = add(new THREE.ConeGeometry(R * 0.6, R * 1.8, 16), M('#3a2a8f'), 0, R * 0.9, -0.05, hat); c.rotation.x = -0.2; for (let i = 0; i < 4; i++) add(new THREE.SphereGeometry(0.035, 6, 4), M('#ffd23f', { emissive: '#ffd23f', emissiveIntensity: .8 }), Math.cos(i * 2) * R * 0.35, R * (0.3 + i * 0.3), Math.sin(i * 2) * R * 0.35, hat); break; }
    case 'pirate': { const h = add(new THREE.CylinderGeometry(R * 0.5, R * 0.8, R * 0.6, 3), M('#1d1d22'), 0, R * 0.25, 0, hat); h.rotation.y = Math.PI / 6; h.scale.z = 0.7; add(new THREE.SphereGeometry(0.07, 8, 6), M('#fff'), 0, R * 0.3, R * 0.4, hat); break; }
    case 'propeller': { add(new THREE.SphereGeometry(R * 0.85, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M('#ffd23f'), 0, -0.05, 0, hat); add(new THREE.CylinderGeometry(0.02, 0.02, 0.2, 6), M('#555'), 0, R * 0.9, 0, hat); const p = new THREE.Group(); p.position.set(0, R * 0.98, 0); hat.add(p); add(new THREE.BoxGeometry(R * 1.4, 0.02, 0.1), M('#e8423a'), 0, 0, 0, p); add(new THREE.BoxGeometry(0.1, 0.02, R * 1.4), M('#3ab0ff'), 0, 0, 0, p); rig.spin = p; break; }
    case 'chef': add(new THREE.CylinderGeometry(R * 0.6, R * 0.55, R * 0.7, 16), M('#fff'), 0, R * 0.35, 0, hat); add(new THREE.SphereGeometry(R * 0.7, 12, 8), M('#fff'), 0, R * 0.85, 0, hat).scale.y = 0.6; break;
    case 'halo': { const h = add(new THREE.TorusGeometry(R * 0.6, 0.04, 8, 24), M('#ffe48a', { emissive: '#ffd23f', emissiveIntensity: 1 }), 0, R * 0.7, 0, hat); h.rotation.x = Math.PI / 2; rig.halo = h; break; }
    case 'flower': for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; add(new THREE.SphereGeometry(0.09, 8, 6), M(['#ff8ff0', '#ffd23f', '#ffffff', '#ff4f6a'][i % 4]), Math.cos(a) * R * 0.7, 0, Math.sin(a) * R * 0.7, hat); } break;
    case 'viking': { add(new THREE.SphereGeometry(R * 0.88, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M('#9aa0a8', { metalness: .6, roughness: .35 }), 0, -0.08, 0, hat); [-1, 1].forEach(s => { const h = add(new THREE.ConeGeometry(0.07, R * 0.9, 8), M('#f5ead2'), s * R * 0.85, R * 0.3, 0, hat); h.rotation.z = -s * 0.7; }); break; }
    case 'headphones': { const band = add(new THREE.TorusGeometry(R * 0.95, 0.04, 6, 20, Math.PI), M('#222'), 0, -R * 0.3, 0, hat); band.rotation.y = Math.PI / 2; band.rotation.z = 0; [-1, 1].forEach(s => add(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 14), M('#ff4fa3'), s * R * 0.98, -R * 0.35, 0, hat).rotation.z = Math.PI / 2); break; }
  }

  const face = new THREE.Group();
  if (anchors.face) anchors.face.add(face); else { face.position.set(0, hasTopEyes ? (shape === 'blob' ? 0.47 : 0.3) : eyeY, hasTopEyes ? 0.25 : faceZ + 0.04); head.add(face); }
  const ex = eyeXOverride || (hasTopEyes ? 0.26 : R * 0.42);
  const lens = (mat, r) => [-1, 1].forEach(s => add(new THREE.CylinderGeometry(r, r, 0.03, 16), mat, s * ex, 0, 0.02, face).rotation.x = Math.PI / 2);
  const bridge = (mat) => add(new THREE.BoxGeometry(ex * 0.9, 0.025, 0.025), mat, 0, 0.02, 0.03, face);
  switch (wear.face) {
    case 'shades': lens(M('#111', { metalness: .5, roughness: .15 }), R * 0.24); bridge(M('#111')); break;
    case 'nerd': [-1, 1].forEach(s => add(new THREE.TorusGeometry(R * 0.22, 0.02, 6, 18), M('#5a3a22'), s * ex, 0, 0.03, face)); bridge(M('#5a3a22')); break;
    case 'heartglasses': [-1, 1].forEach(s => { const h = add(new THREE.BoxGeometry(R * 0.32, R * 0.32, 0.03), M('#ff4f6a', { transparent: true, opacity: .85 }), s * ex, 0, 0.03, face); h.rotation.z = Math.PI / 4; }); bridge(M('#ff4f6a')); break;
    case 'starglasses': [-1, 1].forEach(s => add(new THREE.CylinderGeometry(R * 0.28, R * 0.28, 0.03, 5), M('#ffd23f', { emissive: '#ffb020', emissiveIntensity: .3 }), s * ex, 0, 0.03, face).rotation.x = Math.PI / 2); bridge(M('#ffd23f')); break;
    case 'goggles': add(new THREE.BoxGeometry(ex * 2 + R * 0.5, R * 0.35, 0.06), M('#3ad6ff', { metalness: .4, roughness: .1, transparent: true, opacity: .8 }), 0, 0, 0.03, face); add(new THREE.TorusGeometry(R * 1.0, 0.03, 6, 24), M('#222'), 0, 0, -R * 0.9, face).rotation.y = Math.PI / 2; break;
    case 'monocle': add(new THREE.TorusGeometry(R * 0.22, 0.02, 6, 18), M('#ffd23f', { metalness: .8, roughness: .2 }), ex, 0, 0.03, face); add(new THREE.CylinderGeometry(0.008, 0.008, R * 0.8, 4), M('#ffd23f'), ex + R * 0.2, -R * 0.4, 0.02, face); break;
    case 'mask': add(new THREE.BoxGeometry(ex * 2 + R * 0.6, R * 0.32, 0.04), M('#1d1d22'), 0, 0, 0.0, face); break;
    case 'mustache': [-1, 1].forEach(s => { const m = add(new THREE.CapsuleGeometry(0.04, R * 0.35, 4, 6), M('#3a2410'), s * R * 0.2, -R * 0.42, 0.06 + R * 0.1, face); m.rotation.z = Math.PI / 2 + s * 0.3; }); break;
  }

  const nk = new THREE.Group(); if (anchors.neck) anchors.neck.add(nk); else { nk.position.set(neck[0], neck[1], neck[2]); body.add(nk); }
  switch (wear.neck) {
    case 'bowtie': [-1, 1].forEach(s => add(new THREE.ConeGeometry(0.1, 0.18, 4), M('#c33a3a'), s * 0.09, 0, 0.12, nk).rotation.z = s * Math.PI / 2); add(new THREE.SphereGeometry(0.05, 8, 6), M('#c33a3a'), 0, 0, 0.12, nk); break;
    case 'scarf': add(new THREE.TorusGeometry(0.3, 0.08, 8, 20), M('#e8423a'), 0, 0, 0, nk).rotation.x = Math.PI / 2; add(new THREE.BoxGeometry(0.14, 0.4, 0.06), M('#e8423a'), 0.12, -0.2, 0.28, nk); break;
    case 'chain': add(new THREE.TorusGeometry(0.3, 0.025, 6, 24), M('#ffd23f', { metalness: .9, roughness: .2 }), 0, -0.05, 0.02, nk).rotation.x = Math.PI / 2.4; add(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 12), M('#ffd23f', { metalness: .9, roughness: .2 }), 0, -0.18, 0.3, nk).rotation.x = Math.PI / 2; break;
    case 'bandana': { const b = add(new THREE.ConeGeometry(0.28, 0.35, 3), M('#3a7bd5'), 0, -0.1, 0.18, nk); b.rotation.x = Math.PI; b.scale.z = 0.4; break; }
    case 'medal': add(new THREE.TorusGeometry(0.28, 0.02, 6, 24), M('#3a7bd5'), 0, 0, 0.02, nk).rotation.x = Math.PI / 2.4; add(new THREE.CylinderGeometry(0.11, 0.11, 0.03, 16), M('#ffd23f', { metalness: .9, roughness: .2, emissive: '#7a5a00', emissiveIntensity: .4 }), 0, -0.2, 0.3, nk).rotation.x = Math.PI / 2; break;
  }

  const bk = new THREE.Group(); if (anchors.back) anchors.back.add(bk); else { bk.position.set(back[0], back[1], back[2]); body.add(bk); }
  switch (wear.back) {
    case 'cape': { const c = add(new THREE.BoxGeometry(0.7, 0.9, 0.03), M('#c33a3a', { side: THREE.DoubleSide }), 0, -0.3, -0.05, bk); c.rotation.x = 0.35; rig.cape = c; break; }
    case 'backpack': add(new THREE.BoxGeometry(0.45, 0.5, 0.25), M('#ff9a3c'), 0, 0, -0.08, bk); add(new THREE.BoxGeometry(0.35, 0.2, 0.08), M('#e07a20'), 0, -0.1, -0.24, bk); break;
    case 'jetpack': [-1, 1].forEach(s => { add(new THREE.CylinderGeometry(0.11, 0.11, 0.5, 12), M('#c4c7cc', { metalness: .7, roughness: .3 }), s * 0.13, 0, -0.1, bk); add(new THREE.ConeGeometry(0.09, 0.2, 10), M('#ffb020', { emissive: '#ff5a1f', emissiveIntensity: 1 }), s * 0.13, -0.35, -0.1, bk).rotation.x = Math.PI; }); break;
    case 'fairywings': [-1, 1].forEach(s => { const w = add(new THREE.SphereGeometry(0.35, 12, 8), M('#bfefff', { transparent: true, opacity: .55, emissive: '#9ad8ff', emissiveIntensity: .4 }), s * 0.3, 0.1, -0.05, bk); w.scale.set(1, 1.3, 0.08); w.rotation.z = s * 0.5; }); break;
    case 'balloon': add(new THREE.CylinderGeometry(0.005, 0.005, 1.2, 4), M('#eee'), 0, 0.6, -0.05, bk); add(new THREE.SphereGeometry(0.28, 14, 10), M('#ff4f6a', { roughness: .3 }), 0, 1.35, -0.05, bk).scale.y = 1.15; break;
  }
}
