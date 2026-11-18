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
    { name: 'left', words: ['left'], arg: 'number', min: 1, max: 9, def: null, example: 'left 1', help: 'Move left N spaces', unit: ['space', 'spaces'] },
    { name: 'right', words: ['right'], arg: 'number', min: 1, max: 9, example: 'right 1', help: 'Move right N spaces', unit: ['space', 'spaces'] },
    { name: 'back', words: ['back'], aliases: [['backward'], ['backwards']], arg: 'number', min: 1, max: 9, example: 'back 1', help: 'Move away from you', unit: ['space', 'spaces'] },
    { name: 'front', words: ['front'], aliases: [['toward'], ['towards']], arg: 'number', min: 1, max: 9, example: 'front 1', help: 'Move toward you', unit: ['space', 'spaces'] },
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
      'Tap a prize in the machine to see what it is.',
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

  /* ---------------- prizes ---------------- */
  const haloTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
    const gr = g.createRadialGradient(64, 64, 4, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c);
  })();
  function makeItem(p) {
    const g = new THREE.Group();
    const col = new THREE.Color(RI[p.rarity].color);
    const big = p.rarity === 'legendary' || p.rarity === 'epic';
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, color: col, transparent: true, opacity: big ? .95 : .55, depthWrite: false }));
    halo.scale.setScalar(big ? 1.35 : 1.0); g.add(halo);
    const em = RA.emojiSprite(p.emoji, 0.78); em.position.y = 0.02; g.add(em);
    const puck = RA.cyl(0.36, 0.38, 0.07, RA.mat(col, { emissive: col.clone().multiplyScalar(.25) }), 24); puck.position.y = -0.36; g.add(puck);
    g.userData = { prize: p, halo, em, spin: big };
    [halo, em, puck].forEach(o => o.userData.item = g);
    return g;
  }
  let items = []; // {g, prize, c, r}
  function weightedPick(exclude) {
    const pool = PRIZES.filter(p => !exclude.has(p.name));
    const list = pool.length ? pool : PRIZES;
    const tot = list.reduce((s, p) => s + (window.PRIZE_WEIGHTS[p.rarity] || 1), 0);
    let x = Math.random() * tot;
    for (const p of list) { x -= window.PRIZE_WEIGHTS[p.rarity] || 1; if (x <= 0) return p; }
    return list[0];
  }
  function fill() {
    items.forEach(it => scene.remove(it.g)); items = [];
    const cells = [];
    for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) if (!isChute(c, r)) cells.push({ c, r });
    cells.sort(() => Math.random() - 0.5);
    const used = new Set();
    const n = 17;
    const picks = [];
    for (let i = 0; i < n; i++) { const p = weightedPick(used); used.add(p.name); picks.push(p); }
    // rare stuff hides far from the chute
    const order = { legendary: 0, epic: 1, rare: 2, uncommon: 3, common: 4 };
    picks.sort((a, b) => order[a.rarity] - order[b.rarity]);
    const far = cells.slice().sort((a, b) => (b.c + b.r) - (a.c + a.r) + (Math.random() - .5) * 2.5);
    const taken = new Set();
    picks.forEach(p => {
      const src = order[p.rarity] <= 1 ? far : cells;
      const cell = src.find(k => !taken.has(k.c + ',' + k.r));
      taken.add(cell.c + ',' + cell.r);
      addItem(p, cell.c, cell.r);
    });
  }
  function addItem(p, c, r) {
    const g = makeItem(p); g.position.set(wx(c), 0.42, wz(r)); scene.add(g);
    const it = { g, prize: p, c, r }; items.push(it); return it;
  }
  const itemAt = (c, r) => items.find(it => it.c === c && it.r === r && it !== held);
  stage.frame.push((dt, t) => items.forEach((it, i) => {
    const u = it.g.userData;
    u.em.position.y = 0.02 + Math.sin(t * 2 + i) * 0.025;
    if (u.spin) u.halo.material.rotation = t * 0.8;
    if (u.spin) u.halo.scale.setScalar(1.25 + Math.sin(t * 3 + i) * 0.12);
  }));

  /* ---------------- claw state ---------------- */
  const S = { c: 0, r: 0, y: TOP_Y, open: 0, isDown: false, isOpen: false };
  let held = null;
  function place() {
    const x = wx(S.c), z = wz(S.r);
    claw.position.set(x, S.y - 0.0, z);
    bridge.position.x = x;
    carriage.position.set(x, H - 0.2, z);
    const topY = H - 0.3, botY = S.y + 0.82;
    cable.scale.y = Math.max(0.01, topY - botY); cable.position.set(x, (topY + botY) / 2, z);
    setOpen(S.open);
    if (held) held.g.position.set(x, S.y + 0.02, z);
  }
  function hud() {
    sh.setHud([
      ['Right', S.c], ['Back', S.r], ['Claw', S.isDown ? 'down' : 'up'], ['', S.isOpen ? 'open' : 'closed'],
      ['Holding', held ? held.prize.emoji + ' ' + held.prize.name : 'nothing']
    ]);
  }
  function resetClaw() {
    if (held) { const it = held; held = null; it.g.position.set(wx(it.c), 0.42, wz(it.r)); }
    Object.assign(S, { c: 0, r: 0, y: TOP_Y, open: 0, isDown: false, isOpen: false });
    place(); hud(); stage.want('front');
  }

  /* ---------------- commands ---------------- */
  const DIR = { left: [-1, 0], right: [1, 0], back: [0, 1], front: [0, -1] };
  const WALL = { left: 'left', right: 'right', back: 'back', front: 'front' };
  async function move(name, n) {
    if (S.isDown) RA.crash('The claw is still down! Use "up" before you move it ' + name + '.');
    stage.want('top');
    const [dc, dr] = DIR[name];
    for (let i = 0; i < n; i++) {
      const nc = S.c + dc, nr = S.r + dr;
      if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) {
        // bonk animation
        const c0 = S.c, r0 = S.r;
        await RA.tween(140, k => { S.c = c0 + dc * 0.18 * k; S.r = r0 + dr * 0.18 * k; place(); });
        await RA.tween(160, k => { S.c = c0 + dc * 0.18 * (1 - k); S.r = r0 + dr * 0.18 * (1 - k); place(); });
        S.c = c0; S.r = r0; place();
        RA.crash('Bonk! The claw hit the ' + WALL[name] + ' wall after ' + i + ' space' + (i === 1 ? '' : 's') + '. Try a smaller number.');
      }
      RA.sfx.step();
      const c0 = S.c, r0 = S.r;
      await RA.tween(330, k => { S.c = c0 + dc * k; S.r = r0 + dr * k; place(); });
      S.c = nc; S.r = nr; place(); hud();
    }
  }
  async function down() {
    if (S.isDown) { sh.log('The claw is already down.', 'warn'); return; }
    stage.want('front');
    RA.sfx.whirr();
    const it = itemAt(S.c, S.r);
    let bottom = DOWN_Y;
    if (isChute(S.c, S.r)) bottom = 0.75;
    else if (it && !S.isOpen) bottom = 0.95; // closed claw just bumps on top of the prize
    if (held) bottom = Math.max(bottom, it ? 1.25 : 0.95);
    const y0 = S.y;
    await RA.tween(900, k => { S.y = RA.lerp(y0, bottom, k); place(); });
    S.isDown = true; hud();
    if (it && !S.isOpen && !held) sh.log('Bump! The claw came down closed on top of the ' + it.prize.name + '. Open it first next time.', 'warn');
  }
  async function up() {
    if (!S.isDown) { sh.log('The claw is already up.', 'info'); return; }
    stage.want('front');
    RA.sfx.whirr();
    const y0 = S.y;
    await RA.tween(800, k => { S.y = RA.lerp(y0, TOP_Y, k); place(); });
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
    const it = S.isDown && S.isOpen && !held ? itemAt(S.c, S.r) : null;
    if (!S.isOpen) { sh.log('The claw is already closed.', 'info'); return; }
    RA.sfx.grab();
    await RA.tween(420, k => { S.open = 1 - k * (it ? 0.8 : 1); place(); });
    S.isOpen = false;
    if (it) {
      held = it; place();
      sh.log('Got it! Holding: ' + it.prize.emoji + ' ' + it.prize.name + '. Now bring it to the chute.', 'ok');
    } else if (S.isDown) {
      sh.log(isChute(S.c, S.r) ? 'Nothing to grab in the chute.' : 'The claw grabbed… air. No prize in this space.', 'warn');
    }
    hud();
  }
  async function dropHeld() {
    const it = held; held = null;
    const x = wx(S.c), z = wz(S.r), y0 = it.g.position.y;
    if (isChute(S.c, S.r)) {
      await RA.tween(650, k => { it.g.position.set(x, RA.lerp(y0, -1.9, k), z); }, RA.ease.in);
      items = items.filter(o => o !== it); scene.remove(it.g);
      await win(it.prize);
      return;
    }
    // falls back into the machine
    let spot = { c: S.c, r: S.r };
    if (itemAt(S.c, S.r)) {
      const near = [];
      for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) if (!isChute(c, r) && !itemAt(c, r)) near.push({ c, r, d: Math.abs(c - S.c) + Math.abs(r - S.r) });
      near.sort((a, b) => a.d - b.d); spot = near[0] || { c: it.c, r: it.r };
    }
    const tx = wx(spot.c), tz = wz(spot.r);
    await RA.tween(500, k => { it.g.position.set(RA.lerp(x, tx, k), RA.lerp(y0, 0.42, k), RA.lerp(z, tz, k)); }, RA.ease.in);
    RA.sfx.step();
    it.c = spot.c; it.r = spot.r;
    sh.log('Plop. The ' + it.prize.name + ' fell back into the machine. Open the claw over the chute to win it.', 'warn');
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
    sh.mission.querySelector('.refill').onclick = () => { if (sh.running) return; resetClaw(); fill(); sh.toast('The machine is full of new prizes!'); };
  }

  /* ---------------- tap a prize to peek ---------------- */
  sh.canvas.addEventListener('click', ev => {
    const hit = stage.pick(ev, items.map(i => i.g));
    if (!hit) return;
    const g = hit.userData.item; const p = g && g.userData.prize;
    if (!p) return;
    sh.toast(`${p.emoji} <b>${RA.esc(p.name)}</b> <span style="color:${RI[p.rarity].color}">&middot; ${RI[p.rarity].label}</span>`);
  });

  /* ---------------- wire up ---------------- */
  RA.attachRunner(sh, {
    commands, hints,
    beforeRun() { stage.want('front'); },
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
        if (held && !(S.c === 0 && S.r === 0)) sh.log('Program done. You are holding a prize but the claw is not over the chute yet. Keep going!', 'warn');
        else if (held) sh.log('You are over the chute holding a prize. Add "open" to drop it in!', 'warn');
        else sh.log('✔ Program finished.', 'info');
      }
    },
    reset() { resetClaw(); sh.log('The claw went back to the chute.', 'info'); }
  }, { noRepeat: false });

  fill(); resetClaw(); renderMission();
  RA.debug = { items: () => items.map(i => ({ name: i.prize.name, c: i.c, r: i.r })) };
})();
