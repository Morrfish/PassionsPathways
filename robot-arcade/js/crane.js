/* CRANE CREW - program a tower crane: rotate the arm, move the trolley, lower/raise the hook, hook and unhook loads. */
(function () {
  'use strict';
  const { V3 } = RA;
  const U = 1.25;          // world size of 1 trolley step
  const MAXD = 7, MAXH = 10; // trolley 1..7, hook level 0..10
  const MY = 12;           // top of the tower (jib height)
  const rad = a => a * Math.PI / 180;
  const norm = a => ((Math.round(a) % 360) + 360) % 360;
  const posOf = (a, d) => ({ x: d * U * Math.cos(rad(a)), z: -d * U * Math.sin(rad(a)) });

  const commands = [
    { name: 'rotl', words: ['rotate', 'left'], aliases: [['turn', 'left'], ['spin', 'left'], ['swing', 'left']], arg: 'number', min: 1, max: 360, unit: ['degrees', 'degree', 'deg', '°'], example: 'rotate left 90', help: 'Swing the arm left (degrees)' },
    { name: 'rotr', words: ['rotate', 'right'], aliases: [['turn', 'right'], ['spin', 'right'], ['swing', 'right']], arg: 'number', min: 1, max: 360, unit: ['degrees', 'degree', 'deg', '°'], example: 'rotate right 90', help: 'Swing the arm right (degrees)' },
    { name: 'tout', words: ['trolley', 'out'], aliases: [['move', 'out']], arg: 'number', min: 1, max: 7, example: 'trolley out 2', help: 'Slide the hook away from the tower' },
    { name: 'tin', words: ['trolley', 'in'], aliases: [['move', 'in']], arg: 'number', min: 1, max: 7, example: 'trolley in 2', help: 'Slide the hook toward the tower' },
    { name: 'lower', words: ['lower'], aliases: [['down']], arg: 'number', min: 1, max: 10, unit: ['levels', 'level'], example: 'lower 3', help: 'Let the hook down (levels)' },
    { name: 'raise', words: ['raise'], aliases: [['up'], ['lift']], arg: 'number', min: 1, max: 10, unit: ['levels', 'level'], example: 'raise 3', help: 'Pull the hook up (levels)' },
    { name: 'hook', words: ['hook'], aliases: [['attach'], ['grab']], arg: 'none', example: 'hook', help: 'Hook the load under you' },
    { name: 'unhook', words: ['unhook'], aliases: [['release'], ['detach'], ['let', 'go'], ['drop']], arg: 'none', example: 'unhook', help: 'Let go of the load' }
  ];
  const hints = {
    rotate: 'Say which way and how far, like:  rotate left 90', turn: 'Say which way and how far, like:  rotate left 90',
    left: 'The crane turns with:  rotate left 90', right: 'The crane turns with:  rotate right 90',
    trolley: 'Say which way, like:  trolley out 2  or  trolley in 2', out: 'Try:  trolley out 2', in: 'Try:  trolley in 2'
  };

  /* ---------------- missions ----------------
     loads: [id, kind, angle, distance]   (listed bottom-first when stacked)
     goals: { load or kind+count, at:[angle, distance], level }
     structs: { type, at:[angle, distance], top }                                            */
  const MISSIONS = [
    {
      title: 'First Lift', par: 7,
      story: 'The steel beams just arrived. Lift the beam and set it down on the green pad.',
      tip: 'The beam is straight out from the crane. The pad is a quarter turn to the left (90°). The hook starts at level 10. The beam is 1 level tall, so the hook meets its top at level 1.',
      loads: [['beam', 'beam', 0, 4]],
      structs: [{ type: 'pad', at: [90, 4] }],
      goals: [{ load: 'beam', at: [90, 4], level: 0, text: 'Steel beam on the green pad' }],
      solution: 'trolley out 2\nlower 9\nhook\nraise 2\nrotate left 90\nlower 2\nunhook'
    },
    {
      title: 'Load the Truck', par: 9,
      story: 'Put the crate on the back of the truck. Watch out for the porta-potty! Nobody wants a crate through the roof of that.',
      tip: 'The crate is behind the crane (180°). The truck bed is 1 level high, so a crate sitting on it has its bottom at level 1. The porta-potty is 2 levels tall.',
      loads: [['crate', 'crate', 180, 3]],
      structs: [{ type: 'truck', at: [270, 5] }, { type: 'potty', at: [225, 3] }],
      goals: [{ load: 'crate', at: [270, 5], level: 1, text: 'Crate on the truck bed' }],
      solution: 'rotate left 180\ntrolley out 1\nlower 9\nhook\nraise 3\nrotate left 90\ntrolley out 2\nlower 2\nunhook'
    },
    {
      title: 'Rooftop Delivery', par: 9,
      story: 'The new building needs its air conditioner. Lift the AC unit up onto the roof.',
      tip: 'The building is 4 levels tall. To get over the edge, the bottom of the AC unit must be higher than 4. The tree is 3 levels tall.',
      loads: [['ac', 'ac', 315, 5]],
      structs: [{ type: 'building', at: [90, 3], top: 4 }, { type: 'tree', at: [0, 5] }],
      goals: [{ load: 'ac', at: [90, 3], level: 4, text: 'AC unit on the roof' }],
      solution: 'rotate right 45\ntrolley out 3\nlower 9\nhook\nraise 5\nrotate left 135\ntrolley in 2\nlower 1\nunhook'
    },
    {
      title: 'Stack Attack', par: 24,
      story: 'Build a tower! Stack all 3 concrete blocks on the green pad.',
      tip: 'Every block you stack makes the tower 1 level taller, so you lower the hook 1 less each time. The second block sits at level 1, the third at level 2.',
      loads: [['b1', 'block', 135, 4], ['b2', 'block', 180, 4], ['b3', 'block', 225, 4]],
      structs: [{ type: 'pad', at: [0, 4] }],
      goals: [{ kind: 'block', count: 3, at: [0, 4], text: '3 blocks stacked on the pad' }],
      solution: 'trolley out 2\nrotate left 135\nlower 9\nhook\nraise 2\nrotate right 135\nlower 2\nunhook\nraise 2\nrotate left 180\nlower 2\nhook\nraise 2\nrotate right 180\nlower 1\nunhook\nraise 2\nrotate right 135\nlower 3\nhook\nraise 3\nrotate left 135\nlower 1\nunhook'
    },
    {
      title: 'Busy Day', par: 27,
      story: 'Three jobs before lunch: pipes onto the scaffold, the toolbox onto the truck, and the bricks onto the roof.',
      tip: 'Scaffold: 2 levels. Truck bed: 1 level. Roof: 5 levels. Plan each trip: rotate, trolley, lower, hook, raise high enough, go, lower, unhook.',
      loads: [['pipes', 'pipes', 45, 6], ['toolbox', 'toolbox', 135, 2], ['bricks', 'bricks', 225, 6]],
      structs: [{ type: 'scaffold', at: [90, 5] }, { type: 'truck', at: [180, 4] }, { type: 'building', at: [315, 3], top: 5 }, { type: 'potty', at: [270, 6] }],
      goals: [
        { load: 'pipes', at: [90, 5], level: 2, text: 'Pipes on the scaffold' },
        { load: 'toolbox', at: [180, 4], level: 1, text: 'Toolbox on the truck' },
        { load: 'bricks', at: [315, 3], level: 5, text: 'Bricks on the roof' }
      ],
      solution: 'rotate left 45\ntrolley out 4\nlower 9\nhook\nraise 3\nrotate left 45\ntrolley in 1\nlower 1\nunhook\nrotate left 45\ntrolley in 3\nlower 2\nhook\nraise 2\nrotate left 45\ntrolley out 2\nlower 1\nunhook\nrotate left 45\ntrolley out 2\nlower 1\nhook\nraise 6\nrotate left 90\ntrolley in 3\nlower 1\nunhook'
    },
    {
      title: 'Free Build', par: 0, sandbox: true,
      story: 'No rules, no boss. Stack, sort and build whatever you want. Can you make a tower 5 tall?',
      tip: 'Every load is 1 level tall. Loads have to be set down gently: lower until the bottom touches, then unhook.',
      loads: [['c1', 'crate', 0, 3], ['c2', 'crate', 0, 3], ['b1', 'block', 45, 5], ['b2', 'block', 90, 3], ['b3', 'block', 135, 5], ['p1', 'pipes', 180, 4], ['t1', 'toolbox', 225, 3], ['br', 'bricks', 270, 5], ['be', 'beam', 315, 4], ['ac', 'ac', 315, 6]],
      structs: [{ type: 'pad', at: [90, 6] }, { type: 'pad', at: [180, 6] }, { type: 'building', at: [225, 6], top: 3 }],
      goals: []
    }
  ];

  const starter = `# Crane Crew
# Pick a mission, then program the crane!
trolley out 2
lower 9
hook
`;
  const sh = RA.buildShell({
    id: 'crane', title: 'Crane Crew', icon: '🏗️', accent: '#ffb000', commands, starter, extraView: ['cab', 'Cab'],
    tips: [
      '<code>rotate left</code> spins the arm counter-clockwise (look from the top view). Angles are written on the ground.',
      'Trolley steps are the white rings on the ground (1 to 7). Hook levels go from 0 (ground) to 10.',
      'Every load is <b>1 level</b> tall. To hook it, lower until the hook touches its top.',
      'Raise loads <b>above</b> anything in the way before you swing. No dragging!',
      'Lower until the load touches, <b>then</b> unhook, or it falls and breaks.'
    ]
  });

  /* ---------------- scene ---------------- */
  const stage = RA.createStage(sh.canvas, { bg: 0x9fd3ff, shadowSize: 14, sunX: 10, sunY: 24, sunZ: 12 });
  sh.stage = stage;
  const scene = stage.scene;
  scene.fog = new THREE.Fog(0x9fd3ff, 45, 90);
  stage.hemi.intensity = 0.95;
  const S = { a: 0, d: 2, h: 10 }; // crane state
  stage.setViews({
    front: { pos: V3(0, 12, 26), target: V3(0, 5, 0) },
    top: { pos: V3(0, 31, 1.2), target: V3(0, 0, 0) },
    cab: () => {
      // sit in the operator's cab window, look at the hook
      const c = Math.cos(rad(S.a)), sn = Math.sin(rad(S.a)), lx = 1.45, lz = 0.75;
      const hk = posOf(S.a, S.d);
      return { pos: V3(lx * c + lz * sn, MY + 0.35, -lx * sn + lz * c), target: V3(hk.x, Math.max(0, S.h - 2), hk.z) };
    }
  });
  const M = {
    dirt: RA.mat(0xb7905f, { roughness: 1 }), yellow: RA.mat(0xffc21a, { roughness: .45 }), dark: RA.mat(0x2a2d36),
    concrete: RA.mat(0x9a9a98, { roughness: .95 }), steel: RA.mat(0x8892a0, { metalness: .6, roughness: .35 }),
    rust: RA.mat(0xd2552b, { roughness: .6 }), wood: RA.mat(0xb07a3c, { roughness: .8 }), woodDark: RA.mat(0x7a4f22),
    white: RA.mat(0xf2f4f7), red: RA.mat(0xe0352b), blue: RA.mat(0x2f7de1, { metalness: .3 }), brick: RA.mat(0xb3452d),
    glass: RA.mat(0x8fd0ff, { metalness: .2, roughness: .1, emissive: 0x0c2a40 }), green: RA.mat(0x3fbf5a), cable: RA.mat(0x222222)
  };
  // ground
  const ground = new THREE.Mesh(new THREE.CircleGeometry(60, 64), M.dirt);
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  // polar grid: distance rings + angle lines + labels
  for (let d = 1; d <= MAXD; d++) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(d * U - 0.03, d * U + 0.03, 96), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: d % 2 ? 0.35 : 0.55 }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.01; scene.add(ring);
  }
  for (let a = 0; a < 360; a += 45) {
    const len = MAXD * U + 0.6;
    const line = new THREE.Mesh(new THREE.PlaneGeometry(len, 0.06), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .35 }));
    line.rotation.x = -Math.PI / 2; line.rotation.z = rad(a);
    const p = posOf(a, len / U / 2); line.position.set(p.x, 0.012, p.z); scene.add(line);
    const lp = posOf(a, MAXD + 1.05);
    const lbl = RA.groundLabel(a + '°', 1.0, { color: '#1b1b1b', bg: 'rgba(255,255,255,.85)', font: 'bold 78px system-ui', w: 256, h: 128 });
    lbl.position.set(lp.x, 0.03, lp.z); scene.add(lbl);
  }
  for (let d = 1; d <= MAXD; d++) { // distance numbers on the 0° line and 180° line
    [0, 180].forEach(a => {
      const p = posOf(a + 12 / d, d);
      const l = RA.groundLabel(String(d), 0.55, { color: '#fff', font: 'bold 96px system-ui', w: 128, h: 128 }); l.position.set(p.x, 0.03, p.z); scene.add(l);
    });
  }
  // tower crane
  const base = RA.box(2.4, 0.5, 2.4, M.concrete); base.position.y = 0.25; scene.add(base);
  const mast = new THREE.Group(); scene.add(mast);
  for (let i = 0; i < 4; i++) {
    const sx = i % 2 ? 1 : -1, sz = i < 2 ? 1 : -1;
    const leg = RA.box(0.12, MY, 0.12, M.yellow); leg.position.set(sx * 0.42, MY / 2 + 0.5, sz * 0.42); mast.add(leg);
  }
  for (let y = 1; y < MY; y += 1) {
    [[0, .42, .84, .06], [0, -.42, .84, .06], [.42, 0, .06, .84], [-.42, 0, .06, .84]].forEach(([x, z, w, d]) => {
      const r = RA.box(w, 0.07, d, M.yellow); r.position.set(x, y + 0.5, z); mast.add(r);
    });
    if (y <= MAXH) { const l = RA.labelSprite(String(y), 0.42, { w: 128, h: 128, font: 'bold 84px system-ui', bg: 'rgba(0,0,0,.6)', radius: 64 }); l.position.set(0.85, y, 0.6); mast.add(l); }
  }
  const slew = new THREE.Group(); slew.position.y = MY + 0.5; scene.add(slew);
  // the jib turns see-through in the top view so you can see what is under it
  M.jib = RA.mat(0xffc21a, { roughness: .45, transparent: true, opacity: 1 });
  stage.frame.push(dt => {
    const want = stage.viewName() === 'top' ? 0.35 : 1;
    M.jib.opacity += (want - M.jib.opacity) * Math.min(1, dt * 5);
    M.jib.depthWrite = M.jib.opacity > 0.95;
  });
  const turntable = RA.cyl(0.7, 0.7, 0.35, M.dark); slew.add(turntable);
  const jibLen = MAXD * U + 0.9;
  [[-.3, 0], [.3, 0]].forEach(([z]) => { const j = RA.box(jibLen, 0.12, 0.08, M.jib); j.position.set(jibLen / 2, 0.35, z); slew.add(j); });
  const jibTop = RA.box(jibLen, 0.1, 0.08, M.jib); jibTop.position.set(jibLen / 2, 0.95, 0); slew.add(jibTop);
  for (let x = 0.4; x < jibLen; x += 0.6) { const r = RA.box(0.05, 0.62, 0.62, M.jib); r.position.set(x, 0.65, 0); r.rotation.x = Math.PI / 4; r.scale.set(1, 0.95, 0.95); slew.add(r); }
  const cj = RA.box(4, 0.25, 0.7, M.jib); cj.position.set(-2.2, 0.35, 0); slew.add(cj);
  const cw = RA.box(1.1, 1.2, 0.9, M.concrete); cw.position.set(-3.6, -0.1, 0); slew.add(cw);
  const peak = RA.box(0.2, 2.6, 0.2, M.jib); peak.position.set(0, 1.6, 0); slew.add(peak);
  [[jibLen * 0.65, 0.4], [-3.6, 0.4]].forEach(([x, y]) => {
    const dx = x, dy = 2.9 - y, len = Math.hypot(dx, dy);
    const t = RA.cyl(0.025, 0.025, len, M.cable, 6); t.position.set(dx / 2, (2.9 + y) / 2, 0); t.rotation.z = -Math.atan2(dx, dy); slew.add(t);
  });
  const cab = RA.box(0.9, 0.8, 0.8, M.white); cab.position.set(0.5, -0.2, 0.75); slew.add(cab);
  const cabWin = RA.box(0.05, 0.45, 0.6, M.glass); cabWin.position.set(0.96, -0.12, 0.75); slew.add(cabWin);
  const sign = RA.signPlane('CRANE CREW', 0.55, { w: 640, h: 128, font: '900 92px system-ui', color: '#1b1b1b', bg: '#ffc21a', radius: 12 });
  sign.position.set(-2.2, 0.35, 0.37); slew.add(sign);
  const sign2 = sign.clone(); sign2.rotation.y = Math.PI; sign2.position.z = -0.37; slew.add(sign2);
  // trolley + cable + hook (world space, follow the jib)
  const trolley = RA.box(0.6, 0.3, 0.7, M.dark); scene.add(trolley);
  const cable = RA.cyl(0.03, 0.03, 1, M.cable, 6); scene.add(cable);
  const hookG = new THREE.Group(); scene.add(hookG);
  const block = RA.box(0.45, 0.4, 0.3, M.yellow); block.position.y = 0.42; hookG.add(block);
  const hk = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.04, 8, 16, Math.PI * 1.5), M.steel); hk.position.y = 0.12; hk.rotation.z = Math.PI * 0.75; hookG.add(hk);
  const hookLbl = RA.labelSprite('10', 0.5, { w: 192, h: 128, font: 'bold 80px system-ui', bg: 'rgba(0,0,0,.7)' });
  hookLbl.position.set(0.55, 0.45, 0); hookG.add(hookLbl);
  function setHookLabel() {
    hookLbl.material.map.dispose();
    hookLbl.material.map = RA.textCanvas('↕' + RA.fmtH(S.h), { w: 192, h: 128, font: 'bold 80px system-ui', bg: 'rgba(0,0,0,.7)' });
    hookLbl.material.needsUpdate = true;
  }
  RA.fmtH = h => String(Math.round(h));

  // site decoration outside the working area
  const deco = new THREE.Group(); scene.add(deco);
  for (let i = 0; i < 26; i++) {
    const a = i / 26 * Math.PI * 2, r = 13.2;
    const post = RA.box(0.08, 1.2, 0.08, M.steel); post.position.set(Math.cos(a) * r, 0.6, Math.sin(a) * r); deco.add(post);
    const a2 = (i + 1) / 26 * Math.PI * 2;
    const len = 2 * r * Math.sin(Math.PI / 26);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(len, 1), new THREE.MeshStandardMaterial({ color: 0xff7a1a, transparent: true, opacity: .55, side: THREE.DoubleSide }));
    mesh.position.set((Math.cos(a) + Math.cos(a2)) / 2 * r, 0.6, (Math.sin(a) + Math.sin(a2)) / 2 * r);
    mesh.rotation.y = -(a + a2) / 2 + Math.PI / 2; deco.add(mesh);
  }
  const office = RA.box(4, 2.4, 2, M.white); office.position.set(-11, 1.2, -14); deco.add(office);
  for (let i = 0; i < 6; i++) { const cone = RA.cyl(0.02, 0.22, 0.6, RA.mat(0xff6a00), 12); cone.position.set(10 + i * 0.8, 0.3, 12 - i * 0.4); deco.add(cone); }

  /* ---------------- structures + loads ---------------- */
  let structs = [], loads = [], goalMarks = [], carried = null, broken = false, mission = null, missionIdx = 0;
  const world = new THREE.Group(); scene.add(world);
  function boxStruct(name, a, dOff, w, depth, top, mesh) {
    // oriented box footprint: depth along the radial line, w across it
    const p = posOf(a, dOff);
    structs.push({ name, x: p.x, z: p.z, ang: rad(a), hw: w / 2, hd: depth / 2, top });
    if (mesh) { mesh.position.x = p.x; mesh.position.z = p.z; mesh.rotation.y = rad(a); world.add(mesh); }
  }
  function buildStruct(s) {
    const [a, d] = s.at;
    if (s.type === 'pad') {
      const g = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3), new THREE.MeshStandardMaterial({ color: 0x3fbf5a, transparent: true, opacity: .85 }));
      g.rotation.x = -Math.PI / 2; const p = posOf(a, d); g.position.set(p.x, 0.02, p.z); g.rotation.z = rad(a); g.receiveShadow = true; world.add(g);
      return;
    }
    if (s.type === 'truck') {
      const g = new THREE.Group();
      const bed = RA.box(1.25, 0.25, 1.4, M.steel); bed.position.y = 0.88; g.add(bed);
      const ch = RA.box(1.3, 0.35, 2.7, M.dark); ch.position.set(0.5, 0.55, 0); g.add(ch);
      const cabM = RA.box(0.95, 1.4, 1.4, M.red); cabM.position.set(1.15, 1.25, 0); g.add(cabM);
      const win = RA.box(0.05, 0.5, 1.1, M.glass); win.position.set(1.64, 1.6, 0); g.add(win);
      [-.45, 1.2].forEach(x => [-.7, .7].forEach(z => { const w = RA.cyl(.35, .35, .25, M.dark, 16); w.rotation.x = Math.PI / 2; w.position.set(x, .35, z); g.add(w); }));
      // the bed is at the slot; cab sticks out further from the crane
      const p = posOf(a, d); g.position.set(p.x, 0, p.z); g.rotation.y = rad(a); world.add(g);
      structs.push({ name: 'truck bed', x: p.x, z: p.z, ang: rad(a), hd: 0.62, hw: 0.7, top: 1 });
      const pc = posOf(a, d + 1.15 / U); structs.push({ name: 'truck cab', x: pc.x, z: pc.z, ang: rad(a), hd: 0.5, hw: 0.7, top: 2 });
      return;
    }
    if (s.type === 'building') {
      const top = s.top || 4, g = new THREE.Group();
      const b = RA.box(1.3, top, 1.3, M.concrete); b.position.y = top / 2; g.add(b);
      for (let y = 0; y < top; y++) [[0.66, 0], [-0.66, 0], [0, 0.66], [0, -0.66]].forEach(([x, z]) => {
        const w = RA.box(x ? 0.04 : 0.8, 0.45, x ? 0.8 : 0.04, M.glass, false); w.position.set(x, y + 0.55, z); g.add(w);
      });
      const roof = RA.box(1.36, 0.06, 1.36, RA.mat(0x5a5f66)); roof.position.y = top - 0.02; g.add(roof);
      boxStruct('building', a, d, 1.3, 1.3, top, g);
      const lbl = RA.labelSprite(top + ' levels', 0.4, { w: 384, h: 128, font: 'bold 70px system-ui' }); lbl.position.set(0, top + 0.9, 0); g.add(lbl);
      return;
    }
    if (s.type === 'scaffold') {
      const g = new THREE.Group();
      [[-.55, -.55], [.55, -.55], [-.55, .55], [.55, .55]].forEach(([x, z]) => { const p = RA.box(.07, 2, .07, M.steel); p.position.set(x, 1, z); g.add(p); });
      [1, 1.97].forEach(y => { const pl = RA.box(1.25, 0.06, 1.25, M.wood); pl.position.y = y; g.add(pl); });
      boxStruct('scaffold', a, d, 1.25, 1.25, 2, g);
      return;
    }
    if (s.type === 'potty') {
      const g = new THREE.Group();
      const b = RA.box(0.8, 1.85, 0.8, RA.mat(0x2e8bd6)); b.position.y = 0.93; g.add(b);
      const r = RA.box(0.9, 0.15, 0.9, M.white); r.position.y = 1.92; g.add(r);
      const l = RA.signPlane('🚽', 0.4, { w: 128, h: 128, font: '100px sans-serif' }); l.position.set(0.41, 1.3, 0); l.rotation.y = Math.PI / 2; g.add(l);
      boxStruct('porta-potty', a, d, 0.9, 0.9, 2, g);
      return;
    }
    if (s.type === 'tree') {
      const g = new THREE.Group();
      const tr = RA.cyl(.15, .2, 1.4, M.woodDark); tr.position.y = .7; g.add(tr);
      const lf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85, 0), RA.mat(0x2f9e4a, { flatShading: true })); lf.position.y = 2.15; lf.castShadow = true; g.add(lf);
      boxStruct('tree', a, d, 1.3, 1.3, 3, g);
    }
  }
  function loadMesh(kind) {
    const g = new THREE.Group();
    let em = '📦';
    if (kind === 'beam') { em = '🔩'; for (let i = 0; i < 3; i++) { const b = RA.box(0.35, 0.26, 1.15, M.rust); b.position.set(0, 0.15 + i * 0.29, 0); g.add(b); const f = RA.box(0.12, 0.26, 1.15, RA.mat(0xa63d1c)); f.position.set(0, 0.15 + i * 0.29, 0); g.add(f); } }
    if (kind === 'crate') { em = '📦'; const b = RA.box(0.9, 0.88, 0.9, M.wood); b.position.y = 0.44; g.add(b); [0.12, 0.76].forEach(y => { const s = RA.box(0.93, 0.1, 0.93, M.woodDark); s.position.y = y; g.add(s); }); }
    if (kind === 'block') { em = '🧱'; const b = RA.box(0.9, 0.88, 0.9, M.concrete); b.position.y = 0.44; g.add(b); }
    if (kind === 'ac') { em = '❄️'; const b = RA.box(0.95, 0.85, 0.85, M.white); b.position.y = 0.43; g.add(b); const f = RA.cyl(0.3, 0.3, 0.05, M.dark, 20); f.position.y = 0.88; g.add(f); }
    if (kind === 'pipes') { em = '🔧'; [[-.22, .22], [.22, .22], [0, .6]].forEach(([x, y]) => { const p = RA.cyl(.2, .2, 1.15, M.blue, 16); p.rotation.x = Math.PI / 2; p.position.set(x, y, 0); g.add(p); }); }
    if (kind === 'toolbox') { em = '🧰'; const b = RA.box(0.85, 0.6, 0.5, M.red); b.position.y = 0.3; g.add(b); const h = RA.box(0.5, 0.25, 0.08, M.dark); h.position.y = 0.72; g.add(h); }
    if (kind === 'bricks') { em = '🧱'; const p = RA.box(0.95, 0.15, 0.95, M.wood); p.position.y = 0.08; g.add(p); const b = RA.box(0.85, 0.7, 0.85, M.brick); b.position.y = 0.52; g.add(b); }
    // lifting ring on top
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.025, 6, 12), M.steel); ring.position.y = 0.95; g.add(ring);
    const tag = RA.groundLabel(em, 0.45, { w: 128, h: 128, font: '96px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif' });
    tag.position.y = 0.905; g.add(tag);
    g.userData.emoji = em;
    return g;
  }
  const NAMES = { beam: 'steel beam', crate: 'crate', block: 'concrete block', ac: 'AC unit', pipes: 'pipes', toolbox: 'toolbox', bricks: 'bricks' };

  // what is under a point? returns {top, name}
  function surfAt(x, z, ignore) {
    let best = { top: 0, name: 'ground' };
    for (const s of structs) {
      const dx = x - s.x, dz = z - s.z, c = Math.cos(s.ang), sn = Math.sin(s.ang);
      const lr = dx * c - dz * sn, la = dx * sn + dz * c; // radial, across
      if (Math.abs(lr) <= s.hd && Math.abs(la) <= s.hw && s.top > best.top) best = { top: s.top, name: s.name };
    }
    for (const L of loads) {
      if (L === ignore || L === carried) continue;
      if (Math.hypot(x - L.x, z - L.z) <= 0.5 && L.level + 1 > best.top) best = { top: L.level + 1, name: NAMES[L.kind] };
    }
    return best;
  }
  function surfUnderHook(x, z, withLoad) {
    // the hook alone is a point; a load has a footprint
    const pts = withLoad ? [[0, 0], [.38, 0], [-.38, 0], [0, .38], [0, -.38]] : [[0, 0]];
    let best = { top: -1, name: 'ground' };
    pts.forEach(([ox, oz]) => { const s = surfAt(x + ox, z + oz); if (s.top > best.top) best = s; });
    return best;
  }

  function loadMission(i) {
    missionIdx = i; mission = MISSIONS[i];
    RA.store.set('crane.mission', i);
    world.clear(); structs = []; loads = []; carried = null; broken = false;
    mission.structs.forEach(buildStruct);
    mission.loads.forEach(([id, kind, a, d]) => {
      const p = posOf(a, d);
      const L = { id, kind, a, d, x: p.x, z: p.z, level: 0, broken: false, mesh: loadMesh(kind) };
      L.level = surfAt(p.x, p.z).top;
      loads.push(L); world.add(L.mesh); placeLoad(L);
    });
    goalMarks = [];
    mission.goals.forEach(g => {
      const p = posOf(g.at[0], g.at[1]);
      const lvl = g.level != null ? g.level : surfAt(p.x, p.z).top;
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.62, 0.78, 4, 1), new THREE.MeshBasicMaterial({ color: 0x3dff7a, transparent: true, opacity: .9, side: THREE.DoubleSide, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2; ring.rotation.z = rad(g.at[0]) + Math.PI / 4; ring.position.set(p.x, lvl + 0.04, p.z); world.add(ring);
      const L = g.load ? loads.find(l => l.id === g.load) : loads.find(l => l.kind === g.kind);
      const lbl = RA.labelSprite((L ? L.mesh.userData.emoji : '🎯') + ' here', 0.42, { w: 320, h: 128, font: 'bold 70px system-ui', bg: 'rgba(20,120,50,.9)' });
      lbl.position.set(p.x, lvl + (g.count ? g.count + 0.6 : 1.6), p.z); world.add(lbl);
      goalMarks.push({ ring, lbl });
    });
    resetCrane();
    renderMission();
  }
  function placeLoad(L) {
    L.mesh.position.set(L.x, L.level, L.z);
    L.mesh.rotation.y = rad(L.a || 0);
  }
  function resetCrane() {
    Object.assign(S, { a: 0, d: 2, h: 10 }); carried = null;
    placeCrane(); hud(); stage.want('front');
  }
  function placeCrane() {
    slew.rotation.y = rad(S.a);
    const p = posOf(S.a, S.d);
    trolley.position.set(p.x, MY + 0.15, p.z); trolley.rotation.y = rad(S.a);
    const topY = MY, botY = S.h + 0.62;
    cable.scale.y = Math.max(0.01, topY - botY); cable.position.set(p.x, (topY + botY) / 2, p.z);
    hookG.position.set(p.x, S.h, p.z); hookG.rotation.y = rad(S.a);
    if (carried) { carried.x = p.x; carried.z = p.z; carried.a = S.a; carried.mesh.position.set(p.x, S.h - 1, p.z); carried.mesh.rotation.y = rad(S.a); }
  }
  let lastLbl = '';
  function hud() {
    sh.setHud([['Angle', norm(S.a) + '°'], ['Trolley', S.d], ['Hook level', Math.round(S.h)], ['Carrying', carried ? carried.mesh.userData.emoji + ' ' + NAMES[carried.kind] : 'nothing']]);
    const t = String(Math.round(S.h)); if (t !== lastLbl) { lastLbl = t; setHookLabel(); }
  }

  /* ---------------- goals ---------------- */
  function goalDone(g) {
    const p = posOf(g.at[0], g.at[1]);
    const near = L => L !== carried && !L.broken && Math.hypot(L.x - p.x, L.z - p.z) < 0.4;
    if (g.load) { const L = loads.find(l => l.id === g.load); return !!L && near(L) && L.level === g.level; }
    return loads.filter(L => L.kind === g.kind && near(L)).length >= g.count;
  }
  const progress = RA.store.get('crane.progress', {}); // title -> stars
  function renderMission() {
    const m = mission;
    const opts = MISSIONS.map((x, i) => `<option value="${i}" ${i === missionIdx ? 'selected' : ''}>${i + 1}. ${RA.esc(x.title)} ${progress[x.title] ? '⭐'.repeat(progress[x.title]) : ''}</option>`).join('');
    sh.mission.innerHTML = `
      <h2>Mission <select class="msel" style="margin-left:6px;background:#0a0c18;border:1px solid var(--line);border-radius:8px;padding:4px;text-transform:none;letter-spacing:0;color:var(--ink);font-size:14px">${opts}</select></h2>
      <h3>${RA.esc(m.title)}</h3>
      <p>${RA.esc(m.story)}</p>
      ${m.goals.length ? '<ul class="goals">' + m.goals.map(g => `<li class="${goalDone(g) ? 'done' : ''}"><span class="ck">${goalDone(g) ? '✅' : '⬜'}</span>${RA.esc(g.text)}</li>`).join('') + '</ul>' : ''}
      ${m.par ? `<p style="color:var(--dim);font-size:13px;margin-top:6px">⭐⭐⭐ if your program is ${m.par} lines or less.</p>` : ''}
      <div class="mrow"><button class="showhint">💡 Hint</button>${missionIdx < MISSIONS.length - 1 ? '<button class="nextm">Next mission &rarr;</button>' : ''}</div>
      <div class="hint">${RA.esc(m.tip)}</div>`;
    const q = s => sh.mission.querySelector(s);
    q('.msel').onchange = e => { if (sh.running) { e.target.value = missionIdx; return; } sh.clearLog(); sh.mark(0); loadMission(Number(e.target.value)); };
    q('.showhint').onclick = () => q('.hint').classList.toggle('on');
    if (q('.nextm')) q('.nextm').onclick = () => { if (!sh.running) { sh.clearLog(); loadMission(missionIdx + 1); } };
  }

  /* ---------------- commands ---------------- */
  function bottomNow() { return carried ? S.h - 1 : S.h; }
  function thing() { return carried ? 'The ' + NAMES[carried.kind] : 'The hook'; }
  async function sweep(fromTo, steps, apply, ms, what) {
    // move in small steps; stop and crash if we hit something
    for (let i = 1; i <= steps; i++) {
      const prev = fromTo(i - 1), next = fromTo(i);
      await RA.tween(ms / steps, k => { apply(prev + (next - prev) * k); placeCrane(); }, RA.ease.linear);
      apply(next); placeCrane();
      const p = posOf(S.a, S.d);
      const s = surfUnderHook(p.x, p.z, !!carried);
      // a carried load must be clear of things; the bare hook may just touch a top
      if (carried ? bottomNow() <= s.top : bottomNow() < s.top) {
        RA.crash((carried ? 'Scrape! ' : 'Clang! ') + thing() + ' hit the ' + s.name + ' while ' + what + '. ' +
          (s.name === 'ground' ? 'Raise it off the ground before you move.' : 'That spot is ' + s.top + ' level' + (s.top > 1 ? 's' : '') + ' high, so raise higher first.'));
      }
    }
  }
  async function rotate(dir, deg) {
    stage.want('top');
    RA.sfx.whirr();
    const a0 = S.a, sgn = dir === 'left' ? 1 : -1, n = Math.max(1, Math.ceil(deg / 3));
    await sweep(i => a0 + sgn * deg * (i / n), n, v => { S.a = v; }, Math.max(350, deg * 14), 'swinging');
    S.a = norm(a0 + sgn * deg); placeCrane(); hud();
  }
  async function trolleyMove(dir, n) {
    const d1 = S.d + (dir === 'out' ? n : -n);
    if (d1 > MAXD) RA.crash('The trolley can only go out to ' + MAXD + '. It is at ' + S.d + ', so it can go out ' + (MAXD - S.d) + ' more at most.');
    if (d1 < 1) RA.crash('The trolley cannot go into the tower! It is at ' + S.d + ', so it can come in ' + (S.d - 1) + ' at most.');
    stage.want('top');
    RA.sfx.whirr();
    const d0 = S.d, steps = n * 5;
    await sweep(i => d0 + (d1 - d0) * (i / steps), steps, v => { S.d = v; }, n * 420, 'moving the trolley');
    S.d = d1; placeCrane(); hud();
  }
  async function lower(n) {
    stage.want('front');
    const p = posOf(S.a, S.d);
    const s = surfUnderHook(p.x, p.z, !!carried);
    const room = bottomNow() - s.top; // how far it can go
    const h0 = S.h;
    RA.sfx.whirr();
    if (n > room) {
      await RA.tween(140 * Math.max(1, room), k => { S.h = h0 - room * k; placeCrane(); });
      S.h = h0 - room; placeCrane(); hud();
      RA.crash('Crunch! ' + thing() + ' hit the ' + s.name + ' after ' + room + ' level' + (room === 1 ? '' : 's') + '. You asked for ' + n + '. Try "lower ' + room + '".');
    }
    await RA.tween(140 * n + 150, k => { S.h = h0 - n * k; placeCrane(); });
    S.h = h0 - n; placeCrane(); hud();
  }
  async function raise(n) {
    stage.want('front');
    if (S.h + n > MAXH) RA.crash('The hook can only go up to level ' + MAXH + '. It is at ' + S.h + ', so you can raise ' + (MAXH - S.h) + ' at most.');
    const h0 = S.h; RA.sfx.whirr();
    await RA.tween(140 * n + 150, k => { S.h = h0 + n * k; placeCrane(); });
    S.h = h0 + n; placeCrane(); hud();
  }
  async function hook() {
    stage.want('front');
    if (carried) { sh.log('You are already carrying the ' + NAMES[carried.kind] + '.', 'warn'); return; }
    const p = posOf(S.a, S.d);
    const under = loads.filter(L => !L.broken && Math.hypot(L.x - p.x, L.z - p.z) < 0.45).sort((a, b) => b.level - a.level)[0];
    if (!under) RA.crash('There is nothing to hook here. Check the angle and trolley: the hook has to be right above a load.');
    const gap = S.h - (under.level + 1);
    if (gap > 0) RA.crash('The hook is ' + gap + ' level' + (gap > 1 ? 's' : '') + ' above the ' + NAMES[under.kind] + '. Lower ' + gap + ' more so it touches, then hook.');
    RA.sfx.grab();
    carried = under; placeCrane(); hud();
    sh.log('Hooked the ' + NAMES[under.kind] + '!', 'ok');
  }
  async function unhook() {
    stage.want('front');
    if (!carried) { sh.log('Nothing is on the hook.', 'warn'); return; }
    const L = carried;
    const s = surfUnderHook(L.x, L.z, true);
    carried = null;
    const drop = (S.h - 1) - s.top;
    L.level = s.top;
    // snap to the nearest spot on the grid if close
    const d = Math.round(S.d), a = Math.round(S.a / 45) * 45;
    const snap = posOf(a, d);
    if (Math.abs(S.d - d) < 0.01 && Math.abs(norm(S.a) - norm(a)) < 1) { L.x = snap.x; L.z = snap.z; }
    if (drop > 0) {
      const y0 = S.h - 1;
      await RA.tween(220 + drop * 90, k => { L.mesh.position.y = RA.lerp(y0, s.top, k); }, RA.ease.in);
      L.broken = true;
      L.mesh.rotation.z = 0.25; L.mesh.rotation.x = -0.15;
      L.mesh.traverse(o => { if (o.isMesh && o.material && o.material.color) { o.material = o.material.clone(); o.material.color.multiplyScalar(0.55); } });
      RA.crash('CRASH! You let go of the ' + NAMES[L.kind] + ' ' + drop + ' level' + (drop > 1 ? 's' : '') + ' in the air and it broke. Lower ' + drop + ' more before you unhook.');
    }
    placeLoad(L);
    RA.sfx.step();
    sh.log('Set the ' + NAMES[L.kind] + ' down on the ' + s.name + '.', 'ok');
    renderMission();
  }

  /* ---------------- wire up ---------------- */
  RA.attachRunner(sh, {
    commands, hints,
    beforeRun() {
      // every run starts from the mission's starting setup
      loadMission(missionIdx);
    },
    async exec(st) {
      switch (st.name) {
        case 'rotl': return rotate('left', st.n);
        case 'rotr': return rotate('right', st.n);
        case 'tout': return trolleyMove('out', st.n);
        case 'tin': return trolleyMove('in', st.n);
        case 'lower': return lower(st.n);
        case 'raise': return raise(st.n);
        case 'hook': return hook();
        case 'unhook': return unhook();
      }
    },
    async afterRun(res) {
      stage.want('front');
      renderMission();
      if (!res.ok || !mission.goals.length) { if (res.ok) sh.log('✔ Program finished.', 'info'); return; }
      const done = mission.goals.filter(goalDone).length;
      if (done < mission.goals.length) { sh.log('Program finished, but ' + (mission.goals.length - done) + ' job' + (mission.goals.length - done > 1 ? 's are' : ' is') + ' not done yet.', 'warn'); return; }
      const stars = res.lines <= mission.par ? 3 : res.lines <= mission.par + 4 ? 2 : 1;
      if (!progress[mission.title] || stars > progress[mission.title]) { progress[mission.title] = stars; RA.store.set('crane.progress', progress); }
      RA.sfx.win();
      sh.log('🎉 Mission complete in ' + res.lines + ' lines!', 'ok');
      const next = missionIdx < MISSIONS.length - 1;
      const box = sh.modal(`<div style="font-size:64px">🏗️</div><h2>Mission complete!</h2>
        <div style="font-size:38px;letter-spacing:4px">${'⭐'.repeat(stars)}<span style="opacity:.25">${'⭐'.repeat(3 - stars)}</span></div>
        <p>Your program used <b>${res.lines}</b> lines. ${stars < 3 ? 'Can you do it in <b>' + mission.par + '</b> or less?' : 'Expert crane operator!'}</p>
        <div class="acts"><button data-close>Stay here</button>${next ? '<button class="acc gonext">Next mission &rarr;</button>' : ''}</div>`);
      renderMission();
      if (next) box.querySelector('.gonext').onclick = () => { sh.closeModal(); sh.clearLog(); loadMission(missionIdx + 1); };
    },
    reset() { loadMission(missionIdx); }
  });

  loadMission(Math.min(MISSIONS.length - 1, RA.store.get('crane.mission', 0)));
  RA.debug = { MISSIONS, load: loadMission, state: () => ({ S, carried: carried && carried.id, loads: loads.map(l => ({ id: l.id, x: l.x, z: l.z, level: l.level, broken: l.broken })) }) };
})();
