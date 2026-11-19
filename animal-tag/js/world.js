// Wild Tag: the map (Wildwood Grove) and simple collision.
'use strict';

const World = {
  boxes: [],      // {min:{x,y,z}, max:{x,y,z}}
  cyls: [],       // {x,z,r,y0,y1}
  half: 62,       // play area half-size
  spawns: [],
  group: null,
};

function buildWorld(scene) {
  const W = World; W.boxes = []; W.cyls = []; W.spawns = [];
  const grp = new THREE.Group(); scene.add(grp); W.group = grp;
  let seed = 42; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  const M = (c, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.9 }, o));
  const wood = M('#8a5a2b'), darkWood = M('#5e3b1c'), leaf = M('#3f9b3a'), leaf2 = M('#2f7f35'), leaf3 = M('#6cbf3a'),
    rock = M('#8d9096'), rock2 = M('#a7a39a'), plank = M('#b07a48'), rope = M('#d8c08a'), moss = M('#5aa04a');

  // ground with a grass texture
  const cv = document.createElement('canvas'); cv.width = cv.height = 256; const g = cv.getContext('2d');
  g.fillStyle = '#5fae4a'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 3000; i++) { g.fillStyle = ['#56a043', '#6cbb52', '#4e9a3e', '#78c45a'][i % 4]; g.fillRect(rnd() * 256, rnd() * 256, 2, 3); }
  const gt = new THREE.CanvasTexture(cv); gt.wrapS = gt.wrapT = THREE.RepeatWrapping; gt.repeat.set(40, 40);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshStandardMaterial({ map: gt, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; grp.add(ground);

  const box = (x, y, z, sx, sy, sz, mat, solid = true, rotY = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    m.position.set(x, y + sy / 2, z); m.rotation.y = rotY; m.castShadow = m.receiveShadow = true; grp.add(m);
    if (solid) {
      // rotated boxes: use axis-aligned bounds of the rotated footprint (only 0/90 deg used for solids)
      const swap = Math.abs(Math.sin(rotY)) > 0.7;
      const hx = (swap ? sz : sx) / 2, hz = (swap ? sx : sz) / 2;
      W.boxes.push({ min: { x: x - hx, y, z: z - hz }, max: { x: x + hx, y: y + sy, z: z + hz } });
    }
    return m;
  };
  const cyl = (x, z, r, y0, h, mat, seg = 12) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.9, r, h, seg), mat);
    m.position.set(x, y0 + h / 2, z); m.castShadow = m.receiveShadow = true; grp.add(m);
    W.cyls.push({ x, z, r, y0, y1: y0 + h });
    return m;
  };
  const blob = (x, y, z, s, mat) => { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(s, 1), mat); m.position.set(x, y, z); m.castShadow = true; grp.add(m); return m; };

  // ---- fence around the edge ----
  const H = W.half;
  for (let i = -H; i < H; i += 4) {
    [[i + 2, -H - 0.5, 0], [i + 2, H + 0.5, 0], [-H - 0.5, i + 2, 1], [H + 0.5, i + 2, 1]].forEach(([x, z, r]) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(r ? 1 : 3.8, 3.5, r ? 3.8 : 1), plank); p.position.set(x, 1.75, z); p.castShadow = true; grp.add(p);
    });
  }
  W.boxes.push({ min: { x: -H - 30, y: -5, z: -H - 30 }, max: { x: H + 30, y: 60, z: -H } });
  W.boxes.push({ min: { x: -H - 30, y: -5, z: H }, max: { x: H + 30, y: 60, z: H + 30 } });
  W.boxes.push({ min: { x: -H - 30, y: -5, z: -H }, max: { x: -H, y: 60, z: H } });
  W.boxes.push({ min: { x: H, y: -5, z: -H }, max: { x: H + 30, y: 60, z: H } });

  // ---- the Great Tree in the middle ----
  cyl(0, 0, 3.2, 0, 26, darkWood, 16);
  const ring = (y, r, w) => { // square deck around the trunk made of 4 boxes
    box(0, y, r - w / 2 + 0.01, 2 * r, 0.5, w, plank); box(0, y, -r + w / 2 - 0.01, 2 * r, 0.5, w, plank);
    box(r - w / 2, y, 0, w, 0.5, 2 * r - 2 * w, plank); box(-r + w / 2, y, 0, w, 0.5, 2 * r - 2 * w, plank);
  };
  ring(4.5, 7.5, 4.2); ring(9.5, 6.5, 3.2); ring(14.5, 5.5, 2.3); ring(19.5, 4.6, 1.4);
  [[0, 22, 0, 9], [6, 25, 3, 6], [-6, 24, -2, 6], [2, 27, -5, 5], [-3, 28, 4, 5]].forEach(([x, y, z, s], i) => blob(x, y, z, s, [leaf, leaf2, leaf3][i % 3]));
  // steps up to the first deck
  [[9.5, 0, 0, 1.4], [11, 0, 3, 2.8], [-10, 0, -4, 2], [-11.5, 0, 0, 3.6], [3, 0, -10, 1.6], [0, 0, 11.5, 2.2]].forEach(([x, y, z, h]) => cyl(x, z, 1.2, 0, h, darkWood, 10));

  // ---- regular trees with leafy tops you can stand on ----
  const trees = [];
  for (let i = 0; i < 22; i++) {
    let x, z, ok;
    do { x = (rnd() * 2 - 1) * (H - 6); z = (rnd() * 2 - 1) * (H - 6); ok = Math.hypot(x, z) > 16 && trees.every(t => Math.hypot(t[0] - x, t[1] - z) > 9); } while (!ok);
    const h = 6 + rnd() * 6; trees.push([x, z, h]);
    cyl(x, z, 0.7, 0, h, darkWood, 8);
    const top = h + 0.3, s = 3 + rnd();
    box(x, h, z, s * 1.4, 0.6, s * 1.4, leaf2, true).visible = false;
    blob(x, top + 0.9, z, s, [leaf, leaf2, leaf3][i % 3]).scale.y = 0.65;
  }

  // ---- rocks ----
  for (let i = 0; i < 30; i++) {
    const x = (rnd() * 2 - 1) * (H - 4), z = (rnd() * 2 - 1) * (H - 4);
    if (Math.hypot(x, z) < 13 || trees.some(t => Math.hypot(t[0] - x, t[1] - z) < 4)) continue;
    const sx = 1.5 + rnd() * 3, sy = 0.6 + rnd() * 2.6, sz = 1.5 + rnd() * 3;
    box(x, 0, z, sx, sy, sz, i % 2 ? rock : rock2);
    if (rnd() < 0.4) box(x + (rnd() - .5) * sx, sy, z + (rnd() - .5) * sz, sx * 0.6, sy * 0.7 + 0.5, sz * 0.6, rock);
  }

  // ---- climbing cliff on the north side, with ledges ----
  box(0, 0, -H + 5, 40, 12, 8, rock);
  box(-12, 12, -H + 5, 12, 4, 8, rock2);
  for (let i = 0; i < 6; i++) box(-16 + i * 6.5, 2 + (i % 3) * 3, -H + 9.6, 3, 0.6, 1.4, moss);
  [[-24, 3], [-22, 6], [-26, 9]].forEach(([x, y]) => box(x, 0, -H + 6, 3.5, y, 3.5, rock2));

  // ---- treehouse village (east) with bridges ----
  const hut = (x, z, y) => {
    [[-2, -2], [2, -2], [-2, 2], [2, 2]].forEach(([dx, dz]) => cyl(x + dx, z + dz, 0.3, 0, y, darkWood, 6));
    box(x, y, z, 6, 0.5, 6, plank);
    box(x - 2.8, y + 0.5, z, 0.4, 2.5, 6, wood); box(x + 2.8, y + 0.5, z, 0.4, 2.5, 6, wood); box(x, y + 0.5, z - 2.8, 5.2, 2.5, 0.4, wood);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(5, 2.5, 4), M('#c0502a')); roof.position.set(x, y + 4.2, z); roof.rotation.y = Math.PI / 4; roof.castShadow = true; grp.add(roof);
    box(x, y + 2.9, z, 6, 0.3, 6, M('#c0502a'), true).visible = false;
    for (let k = 0; k < Math.floor(y / 0.9); k++) box(x + (k % 2 ? 0.6 : -0.6), k * 0.9, z + 3.6 + k * 0.0, 1.2, 0.25, 0.8, plank);
  };
  hut(38, 18, 5); hut(42, -10, 7); hut(28, -30, 6);
  box(40, 5.5, 4, 2, 0.3, 22, plank); box(35, 6.5, -20, 2, 0.3, 14, plank, true, 0.5);
  W.boxes.pop(); // slanted bridge: no collider, decoration only
  for (let i = 0; i < 9; i++) box(40, 0, -2 + i * 1.6, 0.15, 5.5, 0.15, rope, false);

  // ---- log jungle gym (west) ----
  for (let i = 0; i < 5; i++) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 12, 10), wood); l.rotation.z = Math.PI / 2; l.position.set(-36, 0.8 + i * 1.7, -12 + i * 6); l.rotation.y = i * 0.6; grp.add(l); l.castShadow = true; }
  [[-36, 0, -12], [-36, 1.7, -6], [-36, 3.4, 0], [-36, 5.1, 6], [-36, 6.8, 12]].forEach(([x, y, z]) => box(x, y, z, 6, 1.6, 2, wood, true).visible = false);
  box(-36, 8.2, 17, 7, 0.5, 6, plank);
  [[-33, 17], [-39, 17]].forEach(([x, z]) => cyl(x, z, 0.35, 0, 8.2, darkWood, 6));

  // ---- pond (just pretty) and bushes ----
  const pond = new THREE.Mesh(new THREE.CircleGeometry(9, 32), new THREE.MeshStandardMaterial({ color: '#3ab0ff', roughness: 0.15, metalness: 0.2, transparent: true, opacity: 0.85 }));
  pond.rotation.x = -Math.PI / 2; pond.position.set(-30, 0.03, 38); grp.add(pond);
  for (let i = 0; i < 40; i++) { const x = (rnd() * 2 - 1) * H, z = (rnd() * 2 - 1) * H; if (Math.hypot(x, z) < 12 || Math.hypot(x + 30, z - 38) < 10) continue; blob(x, 0.5, z, 0.8 + rnd() * 0.6, [leaf, leaf3][i % 2]).scale.y = 0.7; }
  // jump pads (mushrooms) — handled in game.js by their tag
  W.pads = [];
  [[-30, 25], [22, 40], [-50, -30], [50, 45], [14, -24]].forEach(([x, z]) => {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.8, 8), M('#f3ead8')); stem.position.set(x, 0.4, z); grp.add(stem);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(1.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), M('#e8423a')); cap.position.set(x, 0.75, z); cap.castShadow = true; grp.add(cap);
    for (let k = 0; k < 5; k++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), M('#ffffff')); d.position.set(x + Math.cos(k * 1.3) * 0.9, 1.6 - (k === 0 ? 0 : 0.35), z + Math.sin(k * 1.3) * 0.9); if (k === 0) d.position.set(x, 2.25, z); grp.add(d); }
    W.pads.push({ x, z, r: 1.6, y: 2.2 });
  });

  // spawn points in a big circle
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; W.spawns.push({ x: Math.cos(a) * 24, z: Math.sin(a) * 24 }); }

  // sky
  scene.background = new THREE.Color('#9fd8ff');
  scene.fog = new THREE.Fog('#bfe6ff', 70, 170);
  const sky = new THREE.Mesh(new THREE.SphereGeometry(250, 24, 12), new THREE.MeshBasicMaterial({ color: '#8fd0ff', side: THREE.BackSide, fog: false }));
  grp.add(sky);
  for (let i = 0; i < 14; i++) { const c = new THREE.Group(); for (let k = 0; k < 4; k++) { const p = new THREE.Mesh(new THREE.SphereGeometry(4 + rnd() * 3, 10, 8), new THREE.MeshBasicMaterial({ color: '#ffffff', fog: false })); p.position.set(k * 5, rnd() * 2, rnd() * 3); c.add(p); } const a = rnd() * 7; c.position.set(Math.cos(a) * 150, 50 + rnd() * 30, Math.sin(a) * 150); grp.add(c); }
}

// Moves a body (feet position p, radius r, height h) and resolves collisions.
// Returns {ground:bool, groundY, wall:{x,z}|null, head:bool}
function collide(p, prev, r, h, vel, step) {
  const out = { ground: false, wall: null, head: false, groundY: 0 };
  if (p.y <= 0) { p.y = 0; out.ground = true; out.groundY = 0; }
  for (const b of World.boxes) {
    if (p.x + r <= b.min.x || p.x - r >= b.max.x || p.z + r <= b.min.z || p.z - r >= b.max.z) continue;
    if (p.y >= b.max.y || p.y + h <= b.min.y) continue;
    // landing on top?
    if (prev.y >= b.max.y - 0.05 && vel.y <= 0) { p.y = b.max.y; out.ground = true; out.groundY = b.max.y; continue; }
    // step up small ledges
    if (step && b.max.y - p.y <= 0.7 && prev.y >= b.max.y - 0.75) { p.y = b.max.y; out.ground = true; out.groundY = b.max.y; continue; }
    // bump head
    if (prev.y + h <= b.min.y + 0.05 && vel.y > 0) { p.y = b.min.y - h; out.head = true; continue; }
    // push out sideways (smallest overlap)
    const dx1 = b.max.x - (p.x - r), dx2 = (p.x + r) - b.min.x, dz1 = b.max.z - (p.z - r), dz2 = (p.z + r) - b.min.z;
    const m = Math.min(dx1, dx2, dz1, dz2);
    if (m === dx1) { p.x += dx1; out.wall = { x: 1, z: 0 }; }
    else if (m === dx2) { p.x -= dx2; out.wall = { x: -1, z: 0 }; }
    else if (m === dz1) { p.z += dz1; out.wall = { x: 0, z: 1 }; }
    else { p.z -= dz2; out.wall = { x: 0, z: -1 }; }
  }
  for (const c of World.cyls) {
    const dx = p.x - c.x, dz = p.z - c.z, d = Math.hypot(dx, dz), rr = r + c.r;
    if (d >= rr || p.y >= c.y1 || p.y + h <= c.y0) continue;
    if (prev.y >= c.y1 - 0.05 && vel.y <= 0) { p.y = c.y1; out.ground = true; out.groundY = c.y1; continue; }
    if (step && c.y1 - p.y <= 0.7 && prev.y >= c.y1 - 0.75) { p.y = c.y1; out.ground = true; out.groundY = c.y1; continue; }
    const nx = d > 0.001 ? dx / d : 1, nz = d > 0.001 ? dz / d : 0;
    p.x = c.x + nx * rr; p.z = c.z + nz * rr; out.wall = { x: nx, z: nz };
  }
  return out;
}

// Is there something solid between two points? (used for bot sight, coarse)
function blocked(a, b) {
  const steps = 8;
  for (let i = 1; i < steps; i++) {
    const t = i / steps, x = a.x + (b.x - a.x) * t, y = a.y + 1 + (b.y - a.y) * t, z = a.z + (b.z - a.z) * t;
    for (const c of World.cyls) if (c.r > 1.5 && Math.hypot(x - c.x, z - c.z) < c.r && y < c.y1) return true;
    for (const bx of World.boxes) if (x > bx.min.x && x < bx.max.x && z > bx.min.z && z < bx.max.z && y > bx.min.y && y < bx.max.y && bx.max.y - bx.min.y > 3) return true;
  }
  return false;
}
