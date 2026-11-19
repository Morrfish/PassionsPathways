/* CODE CLAW - program the claw to grab a prize and bring it back to the chute. */
(function () {
  'use strict';
  const { V3 } = RA;
  const COLS = 6, ROWS = 5;          // grid of spaces inside the machine
  const TOP_Y = 3.75, DOWN_Y = 0.55;  // claw tip heights
  const CHUTE = { c: 0, r: 0 };       // front-left corner
  const RI = window.RARITY_INFO, PRIZES = window.PRIZES;
  const wx = c => (c - (COLS - 1) / 2);
  const wz = r => ((ROWS - 1) / 2 - r);
  const isChute = (c, r) => c === CHUTE.c && r === CHUTE.r;

  const commands = [
    { name: 'left', words: ['left'], arg: 'number', min: 0.1, decimals: true, max: 9, def: null, example: 'left 1', help: 'Move left N spaces', unit: ['space', 'spaces'] },
    { name: 'right', words: ['right'], arg: 'number', min: 0.1, decimals: true, max: 9, example: 'right 1', help: 'Move right N spaces', unit: ['space', 'spaces'] },
    { name: 'back', words: ['back'], aliases: [['backward'], ['backwards']], arg: 'number', min: 0.1, decimals: true, max: 9, example: 'back 1', help: 'Move away from you', unit: ['space', 'spaces'] },
    { name: 'front', words: ['front'], aliases: [['toward'], ['towards']], arg: 'number', min: 0.1, decimals: true, max: 9, example: 'front 1', help: 'Move toward you', unit: ['space', 'spaces'] },
    { name: 'down', words: ['down'], aliases: [['lower'], ['drop']], arg: 'none', example: 'down', help: 'Lower the claw' },
    { name: 'up', words: ['up'], aliases: [['raise'], ['lift']], arg: 'none', example: 'up', help: 'Raise the claw' },
    { name: 'open', words: ['open'], aliases: [['release']], arg: 'none', example: 'open', help: 'Open the claw' },
    { name: 'close', words: ['close'], aliases: [['grab'], ['grip']], arg: 'none', example: 'close', help: 'Close the claw' }
  ];
  const hints = {
    forward: 'Use "back 2" to move away from you, or "front 2" to move toward you.',
    forwards: 'Use "back 2" to move away from you, or "front 2" to move toward you.',
    go: 'Say which way: left, right, back or front, then a number. Like:  right 2',
    move: 'Say which way: left, right, back or front, then a number. Like:  right 2'
  };
  const starter = `# Grab a prize and bring it home!
# The claw starts over the chute (front-left corner).
right 2
back 1
open
down
close
up
# now take the same steps back...
`;

  const sh = RA.buildShell({
    id: 'claw', title: 'Code Claw', icon: '🕹️', accent: '#ff4fa3', commands, starter,
    topButtons: '<button class="acc shelfbtn">🏆 Prize Shelf</button>',
    tips: [
      'The claw starts over the <b>chute</b> (yellow square, front-left).',
      '<code>back</code> = away from you, <code>front</code> = toward you.',
      'Open the claw <b>before</b> it goes down, close it at the bottom.',
      'Come home with the <b>same steps, opposite way</b>, then <code>open</code>.',
      'Tap a prize to see what it is and <b>exactly where</b> it is (like right 2.3, back 1.8).',
      'The claw only holds a prize if it lands close to its middle. Aim with decimals!',
      'When a prize is pulled out, the pile shifts. Tap again before your next try.',
      'Decimals work too: <code>right 1.5</code> stops between two spaces, right over a prize lying there.',
      '<kbd>Ctrl</kbd>+<kbd>Enter</kbd> runs your program.'
    ]
  });

  /* ---------------- scene ---------------- */
  const stage = RA.createStage(sh.canvas, { bg: 0x140c24, shadowSize: 6, sunX: 3, sunY: 12, sunZ: 6 });
  sh.stage = stage;
  const scene = stage.scene;
  stage.setViews({
    front: { pos: V3(0, 3.4, 10.2), target: V3(0, 1.3, 0) },
    top: { pos: V3(0, 12.2, 1.0), target: V3(0, 0, 0.1) }
  });
  stage.snap = true;

  const M = {
    pink: RA.mat(0xff4fa3, { roughness: .45 }), purple: RA.mat(0x3a1c6e, { roughness: .5 }),
    dark: RA.mat(0x1a1230), chrome: RA.mat(0xd9dee8, { metalness: .85, roughness: .25 }),
    floorA: RA.mat(0x2c2260), floorB: RA.mat(0x342a72), yellow: RA.mat(0xffd23f, { emissive: 0x4a3800 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0xbfe6ff, transparent: true, opacity: .1, roughness: .05, metalness: 0, depthWrite: false, side: THREE.DoubleSide }),
    hole: RA.mat(0x050308)
  };
  const W = COLS, D = ROWS, H = 4.7;
  // pit floor tiles (checkerboard so spaces are easy to count)
  for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) {
    if (isChute(c, r)) continue;
    const t = RA.box(0.98, 0.1, 0.98, (c + r) % 2 ? M.floorA : M.floorB, false);
    t.position.set(wx(c), -0.05, wz(r)); scene.add(t);
  }
  // chute: dark hole with a yellow rim
  const hole = RA.box(0.98, 2.2, 0.98, M.hole, false); hole.position.set(wx(0), -1.2, wz(0)); scene.add(hole);
  [[0, .47, 1, .06], [0, -.47, 1, .06], [.47, 0, .06, 1], [-.47, 0, .06, 1]].forEach(([dx, dz, w, d]) => {
    const rim = RA.box(w, 0.35, d, M.yellow); rim.position.set(wx(0) + dx, 0.17, wz(0) + dz); scene.add(rim);
  });
  // clear walls on the pile side of the chute, so toys don't spill in by themselves
  [[0.49, 0, 0.04, 1.0], [0, -0.49, 1.0, 0.04]].forEach(([dx, dz, w, d]) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, 1.25, d), new THREE.MeshPhysicalMaterial({ color: 0xd6f1ff, transparent: true, opacity: .28, roughness: .05, depthWrite: false }));
    wall.position.set(wx(0) + dx, 0.62, wz(0) + dz); wall.renderOrder = 4; scene.add(wall);
    const lip = RA.box(w + 0.02, 0.06, d + 0.02, M.yellow); lip.position.set(wx(0) + dx, 1.25, wz(0) + dz); scene.add(lip);
  });
  const chuteLbl = RA.groundLabel('CHUTE', 0.32, { color: '#ffd23f', font: 'bold 70px system-ui' }); chuteLbl.position.set(wx(0), 0.36, wz(0) + 0.3); scene.add(chuteLbl);
  // cabinet base
  const base = RA.box(W + 0.6, 2.6, D + 0.6, M.pink); base.position.set(0, -1.4, 0); scene.add(base);
  const panel = RA.box(W + 0.2, 1.7, 0.05, M.purple); panel.position.set(0, -1.35, D / 2 + 0.33); scene.add(panel);
  const door = RA.box(1.1, 0.8, 0.06, M.hole); door.position.set(wx(0), -1.7, D / 2 + 0.36); scene.add(door);
  const doorLbl = RA.signPlane('PRIZE', 0.22, { bg: null, color: '#ffd23f' }); doorLbl.position.set(wx(0), -1.15, D / 2 + 0.4); scene.add(doorLbl);
  const logo = RA.signPlane('CODE CLAW', 0.5, { w: 768, h: 160, font: '900 110px system-ui', color: '#ffd23f', bg: null, stroke: '#3a1c6e' });
  logo.position.set(0.6, -1.25, D / 2 + 0.45); scene.add(logo);
  // ledge numbers outside the glass (count from the chute)
  for (let c = 0; c < COLS; c++) { const l = RA.groundLabel(String(c), 0.34, { color: '#ffe680' }); l.position.set(wx(c), 0.01, D / 2 + 0.2); scene.add(l); }
  for (let r = 0; r < ROWS; r++) { const l = RA.groundLabel(String(r), 0.34, { color: '#7ff5e6' }); l.position.set(-W / 2 - 0.2, 0.01, wz(r)); scene.add(l); }
  // glass walls + posts
  [[0, D / 2 + 0.02, W, 0.02], [0, -D / 2 - 0.02, W, 0.02], [W / 2 + .02, 0, 0.02, D], [-W / 2 - .02, 0, 0.02, D]].forEach(([x, z, w, d]) => {
    const g = new THREE.Mesh(new THREE.BoxGeometry(w, H, d), M.glass); g.position.set(x, H / 2, z); g.renderOrder = 5; scene.add(g);
  });
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
    const p = RA.box(0.16, H + 0.2, 0.16, M.pink); p.position.set(sx * (W / 2 + .05), H / 2, sz * (D / 2 + .05)); scene.add(p);
  });
  // roof + marquee
  // open roof frame (so the top view can see inside)
  [[0, D / 2 + 0.15, W + 0.6, 0.3], [0, -D / 2 - 0.15, W + 0.6, 0.3], [W / 2 + 0.15, 0, 0.3, D], [-W / 2 - 0.15, 0, 0.3, D]].forEach(([x, z, w, d]) => {
    const f = RA.box(w, 0.3, d, M.purple); f.position.set(x, H + 0.3, z); scene.add(f);
  });
  const marq = RA.box(W + 0.6, 1.0, 0.25, M.pink); marq.position.set(0, H + 1.0, D / 2 + 0.2); scene.add(marq);
  const marqText = RA.signPlane('🕹️ CODE CLAW 🕹️', 0.7, { w: 1024, h: 160, font: '900 112px system-ui', color: '#fff', bg: null, stroke: '#ff1f7a' });
  marqText.position.set(0, H + 1.0, D / 2 + 0.36); scene.add(marqText);
  const bulbs = [];
  for (let i = 0; i < 18; i++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), new THREE.MeshBasicMaterial({ color: 0xfff1a8 }));
    b.position.set(-W / 2 - 0.1 + i * (W + 0.2) / 17, H + 0.5, D / 2 + 0.34); scene.add(b); bulbs.push(b);
  }
  stage.frame.push((dt, t) => bulbs.forEach((b, i) => b.material.color.setHex((Math.floor(t * 4) + i) % 3 ? 0xfff1a8 : 0xff4fa3)));
  const glow = new THREE.PointLight(0xff6fd0, 0.6, 12); glow.position.set(0, H - 0.3, 0); scene.add(glow);
  // gantry rails
  [D / 2 - 0.05, -D / 2 + 0.05].forEach(z => { const r = RA.box(W, 0.1, 0.1, M.chrome); r.position.set(0, H - 0.05, z); scene.add(r); });
  const bridge = RA.box(0.14, 0.1, D, M.chrome); bridge.position.y = H - 0.12; scene.add(bridge);
  const carriage = RA.box(0.36, 0.2, 0.36, M.dark); carriage.position.y = H - 0.2; scene.add(carriage);
  const cable = RA.cyl(0.018, 0.018, 1, RA.mat(0x222222), 6); scene.add(cable);

  // the claw head
  const claw = new THREE.Group(); scene.add(claw);
  const hub = RA.cyl(0.2, 0.24, 0.3, M.chrome); hub.position.y = 0.55; claw.add(hub);
  const cap = RA.cyl(0.1, 0.2, 0.12, M.pink); cap.position.y = 0.76; claw.add(cap);
  const prongs = [];
  for (let i = 0; i < 3; i++) {
    const a = i * Math.PI * 2 / 3;
    const piv = new THREE.Group(); piv.position.set(Math.cos(a) * 0.16, 0.42, Math.sin(a) * 0.16); piv.rotation.y = -a;
    const upper = RA.box(0.05, 0.36, 0.07, M.chrome); upper.position.set(0.04, -0.17, 0); upper.rotation.z = 0.2; piv.add(upper);
    const lower = RA.box(0.05, 0.26, 0.07, M.chrome); lower.position.set(0.06, -0.44, 0); lower.rotation.z = -0.45; piv.add(lower);
    claw.add(piv); prongs.push(piv);
  }
  function setOpen(k) { prongs.forEach(p => { p.rotation.z = RA.lerp(-0.2, 0.75, k); }); }

  /* ---------------- prizes: 3D toys made from each emoji, piled up ---------------- */
  const PR = 0.34;          // how big a toy is when packing the pile
  const PILE_MAX = 1.85;    // the pile never gets taller than this
  const VG = 20, VS = 4;    // voxel grid size, canvas pixels per voxel
  const voxGeo = new THREE.BoxGeometry(1, 1, 1);
  const voxCache = {};
  function voxelData(emoji) {
    if (voxCache[emoji]) return voxCache[emoji];
    const n = VG * VS, c = document.createElement('canvas'); c.width = c.height = n;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.font = (n * 0.86) + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(emoji, n / 2, n / 2 + n * 0.06);
    const px = g.getImageData(0, 0, n, n).data;
    const cells = [];
    const solid = [];
    for (let y = 0; y < VG; y++) for (let x = 0; x < VG; x++) {
      let r = 0, gg = 0, b = 0, a = 0;
      for (let yy = 0; yy < VS; yy++) for (let xx = 0; xx < VS; xx++) {
        const k = ((y * VS + yy) * n + x * VS + xx) * 4, al = px[k + 3] / 255;
        r += px[k] * al; gg += px[k + 1] * al; b += px[k + 2] * al; a += al;
      }
      const on = a / (VS * VS) > 0.45;
      solid[y * VG + x] = on;
      if (on) cells.push({ x, y, col: new THREE.Color(r / a / 255, gg / a / 255, b / a / 255).convertSRGBToLinear() });
    }
    // distance to the edge makes the middle thicker, like a stuffed toy
    const dist = solid.map(v => v ? 99 : 0);
    for (let pass = 0; pass < 5; pass++) for (let y = 0; y < VG; y++) for (let x = 0; x < VG; x++) {
      const k = y * VG + x; if (!solid[k]) continue;
      const nb = (xx, yy) => (xx < 0 || yy < 0 || xx >= VG || yy >= VG) ? 0 : dist[yy * VG + xx];
      dist[k] = Math.min(dist[k], nb(x - 1, y) + 1, nb(x + 1, y) + 1, nb(x, y - 1) + 1, nb(x, y + 1) + 1);
    }
    cells.forEach(cl => { cl.d = Math.min(4, dist[cl.y * VG + cl.x]); });
    return (voxCache[emoji] = cells);
  }
  function makeToy(p) {
    const vox = 0.04, cells = voxelData(p.emoji);
    const big = p.rarity === 'legendary' || p.rarity === 'epic';
    const rc = new THREE.Color(RI[p.rarity].color);
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.75, metalness: big ? 0.25 : 0.05, emissive: big ? rc : 0x000000, emissiveIntensity: 0.15 });
    let mesh;
    if (cells.length < 25) { // no emoji font on this computer: make a plain plush ball
      mesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 18, 14), RA.mat(rc));
    } else {
      mesh = new THREE.InstancedMesh(voxGeo, mat, cells.length);
      const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), pos = new THREE.Vector3(), sc = new THREE.Vector3();
      cells.forEach((cl, i) => {
        const depth = vox * (1.6 + 1.5 * cl.d);
        pos.set((cl.x - VG / 2 + 0.5) * vox, (VG / 2 - cl.y - 0.5) * vox, 0);
        sc.set(vox * 1.02, vox * 1.02, depth);
        m4.compose(pos, q, sc); mesh.setMatrixAt(i, m4); mesh.setColorAt(i, cl.col);
      });
      mesh.instanceMatrix.needsUpdate = true; if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    mesh.castShadow = true; mesh.receiveShadow = true;
    const g = new THREE.Group(); g.add(mesh);
    // tumbled into the machine: some lie face up, some lean against their neighbors
    if (Math.random() < 0.55) mesh.rotation.set(-Math.PI / 2 + (Math.random() - .5) * 0.9, 0, (Math.random() - .5) * 0.9);
    else mesh.rotation.set((Math.random() - .5) * 0.8, (Math.random() - .5) * 1.4, (Math.random() - .5) * 0.9);
    mesh.rotation.y += Math.random() * Math.PI * 2 * (mesh.rotation.x < -1 ? 1 : 0);
    g.userData = { prize: p, mesh, mat, big, phase: Math.random() * 6 };
    mesh.userData.item = g;
    return g;
  }
  let items = []; // {g, prize, x, y, z}
  function restY(x, z, others) {
    let y = PR;
    for (const o of others) {
      const d = Math.hypot(o.x - x, o.z - z);
      if (d < 2 * PR) y = Math.max(y, o.y + Math.sqrt(4 * PR * PR - d * d) * 0.82);
    }
    return y;
  }
  const inChute = (x, z) => x < wx(0) + 0.5 + PR * 0.7 && z > wz(0) - 0.5 - PR * 0.7;
  const XMIN = -W / 2 + PR * 0.85, XMAX = W / 2 - PR * 0.85, ZMIN = -D / 2 + PR * 0.85, ZMAX = D / 2 - PR * 0.85;
  const clampX = x => Math.max(XMIN, Math.min(XMAX, x)), clampZ = z => Math.max(ZMIN, Math.min(ZMAX, z));
  // drop a toy at (x,z) and let it roll a little downhill, like it would in a real machine
  function settleSpot(x, z, others) {
    // never let a toy land in the chute (only a win goes in there)
    if (inChute(x, z)) { x = Math.max(x, wx(0) + 0.5 + PR * 0.75); z = Math.min(z, wz(0) - 0.5 - PR * 0.75); }
    let best = { x, z, y: restY(x, z, others) };
    for (let it = 0; it < 7; it++) {
      let moved = false;
      for (let k = 0; k < 8; k++) {
        const a = k / 8 * Math.PI * 2, nx = clampX(best.x + Math.cos(a) * 0.12), nz = clampZ(best.z + Math.sin(a) * 0.12);
        if (inChute(nx, nz)) continue;
        const ny = restY(nx, nz, others);
        if (ny < best.y - 0.01) { best = { x: nx, z: nz, y: ny }; moved = true; }
      }
      if (!moved) break;
    }
    return best;
  }
  function weightedPick(counts) {
    const cap = { legendary: 2, epic: 4 };
    const list = PRIZES.filter(p => !cap[p.rarity] || (counts[p.rarity] || 0) < cap[p.rarity]);
    const tot = list.reduce((s, p) => s + (window.PRIZE_WEIGHTS[p.rarity] || 1), 0);
    let x = Math.random() * tot;
    for (const p of list) { x -= window.PRIZE_WEIGHTS[p.rarity] || 1; if (x <= 0) return p; }
    return list[0];
  }
  function fill() {
    items.forEach(it => scene.remove(it.g)); items = [];
    const counts = {}, picks = [];
    for (let i = 0; i < 125; i++) { const p = weightedPick(counts); counts[p.rarity] = (counts[p.rarity] || 0) + 1; picks.push(p); }
    // ordinary stuff goes in first; the rare stuff lands on top, far from the chute
    const order = { legendary: 0, epic: 1, rare: 2, uncommon: 3, common: 4 };
    picks.sort((a, b) => order[b.rarity] - order[a.rarity] + (Math.random() - .5) * 1.5);
    let tries = 0;
    for (const p of picks) {
      for (let t = 0; t < 30; t++, tries++) {
        let x = XMIN + Math.random() * (XMAX - XMIN), z = ZMIN + Math.random() * (ZMAX - ZMIN);
        if (order[p.rarity] <= 1) { x = RA.lerp(0.2, XMAX, Math.random()); z = RA.lerp(ZMIN, 0.6, Math.random()); }
        if (inChute(x, z)) continue;
        const s = settleSpot(x, z, items);
        if (s.y > PILE_MAX) continue;
        addItem(p, s.x, s.y, s.z);
        break;
      }
    }
  }
  function addItem(p, x, y, z) {
    const g = makeToy(p); g.position.set(x, y, z); scene.add(g);
    const it = { g, prize: p, x, y, z }; items.push(it); return it;
  }
  // the top toy the claw can reach at its spot
  const GRAB_R = 0.45;  // the claw can reach toys this close to its middle...
  const GRIP_R = 0.25;  // ...but only holds on if it is this close to the toy's middle
  function topUnderClaw() {
    const x = wx(S.c), z = wz(S.r);
    let top = null;
    for (const it of items) {
      if (it === held) continue;
      if (Math.hypot(it.x - x, it.z - z) < GRAB_R && (!top || it.y > top.y)) top = it;
    }
    return top;
  }
  function pileTopAt(x, z) {
    let y = 0;
    for (const it of items) if (it !== held && Math.hypot(it.x - x, it.z - z) < 0.45) y = Math.max(y, it.y + PR * 0.8);
    return y;
  }
  // after a toy is taken out, everything that was leaning on it falls down
  // after a toy is yanked out, the pile reacts: nearby toys get jolted sideways,
  // then everything falls and rolls downhill into the gap (gravity)
  async function settlePile(hx, hz) {
    const rest = items.filter(i => i !== held);
    const start = new Map(rest.map(it => [it, { x: it.x, y: it.y, z: it.z }]));
    const JOLT = 1.2, ROLL = 1.9;
    rest.forEach(it => {
      const d = Math.hypot(it.x - hx, it.z - hz);
      if (d > JOLT) return;
      const a = Math.random() * Math.PI * 2, push = (JOLT - d) * 0.3 * (0.6 + Math.random() * 0.8);
      it.x = clampX(it.x + Math.cos(a) * push); it.z = clampZ(it.z + Math.sin(a) * push);
    });
    const sorted = rest.slice().sort((a, b) => a.y - b.y);
    const done = [];
    for (const it of sorted) {
      let p;
      if (Math.hypot(it.x - hx, it.z - hz) < ROLL) p = settleSpot(it.x, it.z, done);   // rolls downhill into the gap
      else p = { x: it.x, z: it.z, y: Math.min(it.y, restY(it.x, it.z, done)) };       // far away: only falls straight down
      if (inChute(p.x, p.z)) p = settleSpot(p.x, p.z, done);
      it.x = p.x; it.y = p.y; it.z = p.z;
      done.push(it);
    }
    const moves = [];
    rest.forEach(it => {
      const s0 = start.get(it);
      const dist = Math.hypot(it.x - s0.x, it.y - s0.y, it.z - s0.z);
      if (dist < 0.01) return;
      const spin = (Math.random() - .5) * dist * 2;
      const r0 = it.g.rotation.y;
      moves.push(RA.tween(280 + dist * 380, k => {
        it.g.position.set(RA.lerp(s0.x, it.x, k), RA.lerp(s0.y, it.y, k), RA.lerp(s0.z, it.z, k));
        it.g.rotation.y = r0 + spin * k;
      }, RA.ease.in));
    });
    if (moves.length) {
      RA.beep(140, 220, 'triangle', 0.05, 70);
      await Promise.all(moves);
      sh.log('The pile shifted! ' + moves.length + ' prize' + (moves.length === 1 ? '' : 's') + ' tumbled into new spots.', 'info');
    }
  }
  stage.frame.push((dt, t) => items.forEach(it => {
    const u = it.g.userData;
    if (u.big && u.mat) u.mat.emissiveIntensity = 0.15 + 0.2 * (0.5 + 0.5 * Math.sin(t * 3 + u.phase));
  }));

  /* ---------------- claw state ---------------- */
  const S = { c: 0, r: 0, y: TOP_Y, open: 0, isDown: false, isOpen: false };
  let held = null;
  // aiming laser: shows where the claw will land
  const laser = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 6), new THREE.MeshBasicMaterial({ color: 0xff2a5c, transparent: true, opacity: 0.75 }));
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.09, 16), new THREE.MeshBasicMaterial({ color: 0xff2a5c, transparent: true, opacity: 0.9, depthWrite: false }));
  dot.rotation.x = -Math.PI / 2; scene.add(laser); scene.add(dot);
  function place() {
    const x = wx(S.c), z = wz(S.r);
    claw.position.set(x, S.y, z);
    bridge.position.x = x;
    carriage.position.set(x, H - 0.2, z);
    const topY = H - 0.3, botY = S.y + 0.82;
    cable.scale.y = Math.max(0.01, topY - botY); cable.position.set(x, (topY + botY) / 2, z);
    setOpen(S.open);
    if (held) { held.x = x; held.z = z; held.y = S.y - 0.05; held.g.position.set(x, held.y, z); }
    const ground = overChute() ? -0.2 : pileTopAt(x, z) + 0.02;
    const from = S.y - (held ? 0.4 : 0.1);
    laser.visible = dot.visible = from - ground > 0.2;
    laser.scale.y = Math.max(0.01, from - ground); laser.position.set(x, (from + ground) / 2, z);
    dot.position.set(x, ground, z);
  }
  function hud() {
    sh.setHud([
      ['Right', S.c], ['Back', S.r], ['Claw', S.isDown ? 'down' : 'up'], ['', S.isOpen ? 'open' : 'closed'],
      ['Holding', held ? held.prize.emoji + ' ' + held.prize.name : 'nothing']
    ]);
  }
  // where every toy was when the last program started (Reset puts them back there)
  let snapshot = new Map();
  function takeSnapshot() {
    snapshot = new Map(items.map(it => [it, { x: it.x, y: it.y, z: it.z, rx: it.g.rotation.x, ry: it.g.rotation.y }]));
  }
  function resetClaw() {
    held = null;
    items.forEach(it => {
      const s = snapshot.get(it);
      if (s) { it.x = s.x; it.y = s.y; it.z = s.z; it.g.rotation.x = s.rx; it.g.rotation.y = s.ry; }
      else Object.assign(it, settleSpot(it.x, it.z, items.filter(o => o !== it)));
      it.g.position.set(it.x, it.y, it.z);
    });
    Object.assign(S, { c: 0, r: 0, y: TOP_Y, open: 0, isDown: false, isOpen: false });
    place(); hud(); stage.want('front');
  }

  /* ---------------- commands ---------------- */
  const DIR = { left: [-1, 0], right: [1, 0], back: [0, 1], front: [0, -1] };
  const WALL = { left: 'left', right: 'right', back: 'back', front: 'front' };
  const r2 = v => Math.round(v * 100) / 100;
  const overChute = () => Math.abs(S.c - CHUTE.c) < 0.3 && Math.abs(S.r - CHUTE.r) < 0.3;
  async function move(name, n) {
    if (S.isDown) RA.crash('The claw is still down! Use "up" before you move it ' + name + '.');
    stage.want('top');
    const [dc, dr] = DIR[name];
    let left = n, done = 0;
    while (left > 1e-6) {
      let step = Math.min(1, left);
      const room = r2(dc > 0 ? COLS - 1 - S.c : dc < 0 ? S.c : dr > 0 ? ROWS - 1 - S.r : S.r);
      const blocked = step > room + 1e-6;
      if (blocked) step = room;           // go as far as the wall allows, then bonk
      if (step > 1e-6) {
        RA.sfx.step();
        const c0 = S.c, r0 = S.r;
        await RA.tween(330 * Math.max(0.35, step), k => { S.c = c0 + dc * step * k; S.r = r0 + dr * step * k; place(); });
        S.c = r2(c0 + dc * step); S.r = r2(r0 + dr * step); left = r2(left - step); done = r2(done + step); place(); hud();
      }
      if (blocked) {
        // bonk animation
        const c0 = S.c, r0 = S.r;
        await RA.tween(140, k => { S.c = c0 + dc * 0.18 * k; S.r = r0 + dr * 0.18 * k; place(); });
        await RA.tween(160, k => { S.c = c0 + dc * 0.18 * (1 - k); S.r = r0 + dr * 0.18 * (1 - k); place(); });
        S.c = c0; S.r = r0; place();
        RA.crash(done ? 'Bonk! The claw hit the ' + WALL[name] + ' wall after ' + done + ' space' + (done === 1 ? '' : 's') + '. You asked for ' + n + '. Try "' + name + ' ' + done + '".'
          : 'Bonk! The claw is already against the ' + WALL[name] + ' wall. It cannot go ' + name + ' any more.');
      }
    }
  }
  async function down() {
    if (S.isDown) { sh.log('The claw is already down.', 'warn'); return; }
    stage.want('front');
    RA.sfx.whirr();
    const top = topUnderClaw();
    let bottom;
    if (overChute()) bottom = held ? 1.35 : 0.95;
    else if (held) bottom = Math.max(0.75, pileTopAt(wx(S.c), wz(S.r)) + 0.45);
    else if (!top) bottom = Math.max(DOWN_Y - 0.1, pileTopAt(wx(S.c), wz(S.r)) + 0.15); // lands on the pile, nothing to grab
    else if (S.isOpen) bottom = top.y + 0.08;          // open claw wraps around the top toy
    else bottom = top.y + PR + 0.3;                    // closed claw just bumps on top of it
    const y0 = S.y;
    await RA.tween(400 + (y0 - bottom) * 160, k => { S.y = RA.lerp(y0, bottom, k); place(); });
    S.isDown = true; hud();
    if (top && !S.isOpen && !held && !overChute()) sh.log('Bump! The claw came down closed on top of the ' + top.prize.name + '. Open it first next time.', 'warn');
  }
  async function up() {
    if (!S.isDown) { sh.log('The claw is already up.', 'info'); return; }
    stage.want('front');
    RA.sfx.whirr();
    const y0 = S.y;
    const grabbed = held;
    if (grabbed && grabbed.slip) {
      // a toy held by the edge slips out partway up and tumbles back onto the pile
      const mid = RA.lerp(y0, TOP_Y, 0.45);
      await RA.tween(250 + (mid - y0) * 140, k => { S.y = RA.lerp(y0, mid, k); place(); });
      held = null; grabbed.slip = false;
      const others = items.filter(o => o !== grabbed);
      const a = Math.random() * Math.PI * 2;
      const s = settleSpot(clampX(grabbed.x + Math.cos(a) * 0.5), clampZ(grabbed.z + Math.sin(a) * 0.5), others);
      const p0 = { x: grabbed.x, y: grabbed.y, z: grabbed.z };
      RA.sfx.bad();
      await RA.tween(300 + Math.max(0, p0.y - s.y) * 160, k => { grabbed.g.position.set(RA.lerp(p0.x, s.x, k), RA.lerp(p0.y, s.y, k), RA.lerp(p0.z, s.z, k)); }, RA.ease.in);
      Object.assign(grabbed, s);
      sh.log('It slipped! The claw was ' + grabbed.off + ' off the middle of the ' + grabbed.prize.name + '. Tap a prize to see exactly where it is.', 'warn');
      const y1 = S.y;
      await Promise.all([
        RA.tween(300 + (TOP_Y - y1) * 140, k => { S.y = RA.lerp(y1, TOP_Y, k); place(); }),
        settlePile(grabbed.fromX, grabbed.fromZ)
      ]);
    } else {
      await RA.tween(400 + (TOP_Y - y0) * 140, k => { S.y = RA.lerp(y0, TOP_Y, k); place(); });
      if (grabbed) await settlePile(grabbed.fromX, grabbed.fromZ);
    }
    S.isDown = false; hud();
  }
  async function openClaw() {
    stage.want('front');
    const was = S.isOpen;
    if (!was) { RA.sfx.step(); await RA.tween(380, k => { S.open = k; place(); }); }
    S.isOpen = true; S.open = 1; place();
    if (held) await dropHeld();
    else if (was) sh.log('The claw is already open.', 'info');
    hud();
  }
  async function closeClaw() {
    stage.want('front');
    if (!S.isOpen) { sh.log('The claw is already closed.', 'info'); return; }
    const top = S.isDown && !held && !overChute() ? topUnderClaw() : null;
    const it = top && S.y <= top.y + 0.2 ? top : null;
    RA.sfx.grab();
    await RA.tween(420, k => { S.open = 1 - k * (it ? 0.75 : 1); place(); });
    S.isOpen = false;
    if (it) {
      it.fromX = it.x; it.fromZ = it.z;
      it.off = r2(Math.hypot(it.x - wx(S.c), it.z - wz(S.r)));
      it.slip = it.off > GRIP_R;
      held = it; place();
      if (it.slip) sh.log('The claw caught the ' + it.prize.name + ' by the edge… hang on…', 'warn');
      else sh.log('Got it! Holding: ' + it.prize.emoji + ' ' + it.prize.name + '. Now bring it to the chute.', 'ok');
    } else if (S.isDown) {
      sh.log(overChute() ? 'Nothing to grab in the chute.' : 'The claw grabbed… air. Nothing here to grab.', 'warn');
    }
    hud();
  }
  async function dropHeld() {
    const it = held; held = null;
    const x = wx(S.c), z = wz(S.r), y0 = it.g.position.y;
    if (overChute()) {
      await RA.tween(650, k => { it.g.position.set(x, RA.lerp(y0, -1.9, k), z); it.g.rotation.x = k * 2; }, RA.ease.in);
      items = items.filter(o => o !== it); scene.remove(it.g);
      takeSnapshot(); // the shifted pile is the new normal, Reset will not undo it
      await win(it.prize);
      return;
    }
    // falls back onto the pile
    const s = settleSpot(clampX(x + (Math.random() - .5) * 0.2), clampZ(z + (Math.random() - .5) * 0.2), items.filter(o => o !== it));
    await RA.tween(300 + Math.max(0, y0 - s.y) * 150, k => { it.g.position.set(RA.lerp(x, s.x, k), RA.lerp(y0, s.y, k), RA.lerp(z, s.z, k)); }, RA.ease.in);
    Object.assign(it, s);
    RA.sfx.step();
    sh.log('Plop. The ' + it.prize.name + ' fell back onto the pile. Open the claw over the chute to win it.', 'warn');
  }

  /* ---------------- shelf (collection) ---------------- */
  const shelf = RA.store.get('claw.shelf', {}); // name -> count
  let wonThisRun = 0;
  function shelfCount() { return PRIZES.filter(p => shelf[p.name]).length; }
  async function win(p) {
    const isNew = !shelf[p.name];
    shelf[p.name] = (shelf[p.name] || 0) + 1; RA.store.set('claw.shelf', shelf);
    wonThisRun++;
    (p.rarity === 'legendary' || p.rarity === 'epic') ? RA.sfx.big() : RA.sfx.win();
    sh.log('🎉 You won ' + p.emoji + ' ' + p.name + ' (' + RI[p.rarity].label + ')!', 'ok');
    renderMission();
    const c = RI[p.rarity].color;
    sh.modal(`
      <div style="font-size:15px;font-weight:800;letter-spacing:2px;color:${c}">${RI[p.rarity].label.toUpperCase()}${isNew ? ' &middot; NEW!' : ''}</div>
      <div style="font-size:110px;line-height:1.1;margin:8px 0;filter:drop-shadow(0 0 22px ${c})">${p.emoji}</div>
      <h2>${RA.esc(p.name)}</h2>
      <p style="color:var(--dim);margin:0">${RA.esc(p.note || '')}</p>
      <p style="margin-top:10px">Your shelf: <b>${shelfCount()} / ${PRIZES.length}</b> prizes</p>
      <div class="acts"><button class="acc" data-close>Play again</button><button class="seeShelf">🏆 See my shelf</button></div>`)
      .querySelector('.seeShelf').onclick = showShelf;
  }
  function showShelf() {
    const order = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
    let html = `<h2>🏆 Prize Shelf <small style="font-size:16px;color:var(--dim)">${shelfCount()} / ${PRIZES.length} found</small></h2>`;
    order.forEach(r => {
      const list = PRIZES.filter(p => p.rarity === r);
      if (!list.length) return;
      html += `<h3 style="color:${RI[r].color};margin:14px 0 6px">${RI[r].label} <small style="color:var(--dim)">${list.filter(p => shelf[p.name]).length}/${list.length}</small></h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:8px">`;
      list.forEach(p => {
        const have = shelf[p.name];
        html += `<div style="background:#10132a;border:2px solid ${have ? RI[r].color : 'var(--line)'};border-radius:12px;padding:8px;text-align:center">
          <div style="font-size:38px;${have ? '' : 'filter:brightness(0) opacity(.35)'}">${p.emoji}</div>
          <div style="font-size:12px;font-weight:700">${have ? RA.esc(p.name) : '???'}</div>
          ${have > 1 ? `<div style="font-size:11px;color:var(--dim)">x${have}</div>` : ''}</div>`;
      });
      html += '</div>';
    });
    html += `<div class="acts"><button class="acc" data-close>Close</button><button class="wipe">Clear my shelf</button></div>`;
    sh.modal(html, { wide: true }).querySelector('.wipe').onclick = () => {
      if (!confirm('Clear every prize from your shelf on this computer?')) return;
      Object.keys(shelf).forEach(k => delete shelf[k]); RA.store.set('claw.shelf', shelf); showShelf(); renderMission();
    };
  }
  sh.root.querySelector('.shelfbtn').onclick = showShelf;

  /* ---------------- mission panel ---------------- */
  function renderMission() {
    sh.mission.innerHTML = `
      <h2>Mission</h2>
      <h3>Win a prize!</h3>
      <p>Write a program that moves the claw over a prize, grabs it, then brings it back to the <b style="color:var(--y)">chute</b> and opens.</p>
      <p style="color:var(--dim);font-size:14px">The numbers along the front and left edges count spaces away from the chute.</p>
      <div class="mrow">
        <span class="chip" style="background:#10132a;padding:6px 10px;border-radius:9px;font-weight:700">Won today: ${wonThisRun}</span>
        <span class="chip" style="background:#10132a;padding:6px 10px;border-radius:9px;font-weight:700">Shelf: ${shelfCount()}/${PRIZES.length}</span>
        <button class="refill">🎲 New prizes</button>
      </div>`;
    sh.mission.querySelector('.refill').onclick = () => { if (sh.running) return; held = null; fill(); takeSnapshot(); resetClaw(); sh.toast('The machine is full of new prizes!'); };
  }

  /* ---------------- tap a prize to peek ---------------- */
  sh.canvas.addEventListener('click', ev => {
    const hit = stage.pick(ev, items.map(i => i.g));
    if (!hit) return;
    const g = hit.userData.item; const p = g && g.userData.prize;
    if (!p) return;
    const it = items.find(i => i.g === g);
    const where = it ? `<br><span style="font-family:var(--mono);color:var(--y)">right ${(it.x - wx(0)).toFixed(1)}, back ${(wz(0) - it.z).toFixed(1)}</span>` : '';
    sh.toast(`${p.emoji} <b>${RA.esc(p.name)}</b> <span style="color:${RI[p.rarity].color}">&middot; ${RI[p.rarity].label}</span>${where}`, 3500);
  });

  /* ---------------- wire up ---------------- */
  RA.attachRunner(sh, {
    commands, hints,
    beforeRun() { stage.want('front'); if (!held) takeSnapshot(); },
    async exec(st) {
      switch (st.name) {
        case 'left': case 'right': case 'back': case 'front': return move(st.name, st.n);
        case 'down': return down();
        case 'up': return up();
        case 'open': return openClaw();
        case 'close': return closeClaw();
      }
    },
    async afterRun(res) {
      stage.want('front');
      if (res.ok) {
        if (held && !overChute()) sh.log('Program done. You are holding a prize but the claw is not over the chute yet. Keep going!', 'warn');
        else if (held) sh.log('You are over the chute holding a prize. Add "open" to drop it in!', 'warn');
        else sh.log('✔ Program finished.', 'info');
      }
    },
    reset() { resetClaw(); sh.log('The claw went back to the chute, and every prize went back to where it was.', 'info'); }
  }, { noRepeat: false });

  fill(); takeSnapshot(); resetClaw(); renderMission();
  RA.debug = { items: () => items.map(i => ({ name: i.prize.name, c: Math.round(i.x - wx(0)), r: Math.round(wz(0) - i.z), y: i.y, rx: i.x - wx(0), rz: wz(0) - i.z })) };
})();
