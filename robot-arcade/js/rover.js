/* ROVER RUN - drive a Mars rover with forward / turn left / turn right / drill, and use repeat loops. */
(function () {
  'use strict';
  const { V3 } = RA;
  const N = 9, CELL = 1.2;
  const wx = c => (c - (N - 1) / 2) * CELL;
  const wz = r => ((N - 1) / 2 - r) * CELL;       // r grows toward the back (north)
  const HEAD = ['North', 'East', 'South', 'West'];
  const DC = [0, 1, 0, -1], DR = [1, 0, -1, 0];

  const commands = [
    { name: 'forward', words: ['forward'], aliases: [['forwards'], ['go'], ['drive'], ['move']], arg: 'number', min: 1, max: 9, unit: ['squares', 'square', 'spaces', 'space'], example: 'forward 1', help: 'Drive ahead N squares' },
    { name: 'backward', words: ['backward'], aliases: [['back'], ['backwards'], ['reverse']], arg: 'number', min: 1, max: 9, unit: ['squares', 'square', 'spaces', 'space'], example: 'backward 1', help: 'Back up N squares' },
    { name: 'left', words: ['turn', 'left'], aliases: [['left']], arg: 'none', example: 'turn left', help: 'Turn ¼ to the left' },
    { name: 'right', words: ['turn', 'right'], aliases: [['right']], arg: 'none', example: 'turn right', help: 'Turn ¼ to the right' },
    { name: 'drill', words: ['drill'], aliases: [['collect'], ['dig'], ['scoop']], arg: 'none', example: 'drill', help: 'Collect a sample here' }
  ];
  const hints = { turn: 'Say which way:  turn left  or  turn right', around: 'To turn around, turn left two times.' };

  /* maps: top line is the far (north) side. . ground  R rock  C crater  * sample  H home base */
  const MISSIONS = [
    {
      title: 'First Drive', par: 2, start: [4, 0, 0],
      story: 'Welcome to Mars! A shiny sample is straight ahead. Drive to it and drill.',
      tip: 'Count the squares from the rover to the sample. Then: forward that many, then drill.',
      map: ['.........', '.........', '.........', '.........', '....*....', '.........', '.........', '.........', '.........'],
      solution: 'forward 4\ndrill'
    },
    {
      title: 'Turn the Corner', par: 4, start: [1, 0, 0],
      story: 'This sample is up and over. You will need to turn.',
      tip: '"turn right" turns the rover where it is. It does not move it. After turning, "forward" goes the new way.',
      map: ['.........', '.........', '.......*.', '.........', '.........', '.........', '.........', '.........', '.........'],
      solution: 'forward 6\nturn right\nforward 6\ndrill'
    },
    {
      title: 'Reverse Gear', par: 4, start: [4, 4, 0],
      story: 'Samples in front AND behind you, in a narrow canyon. No room to turn the rover around, so back up!',
      tip: '\'backward 3\' drives the rover backwards without turning it. Count how far each sample is from the rover.',
      map: ['.........', '...R*R...', '...R.R...', '...R.R...', '.........', '...R.R...', '...R.R...', '...R*R...', '.........'],
      solution: "forward 3\ndrill\nbackward 6\ndrill"
    },
    {
      title: 'Rock Garden', par: 8, start: [1, 0, 0],
      story: 'Rocks everywhere! Find the gaps and reach the sample without a scratch.',
      tip: 'Go through the gap on the left, drive across, then up through the gap on the right.',
      map: ['.........', '.........', '.....*...', '.RRRRRR..', '.........', '.........', '..RRRRRRR', '.........', '.........'],
      solution: 'forward 3\nturn right\nforward 6\nturn left\nforward 3\nturn left\nforward 2\ndrill'
    },
    {
      title: 'Sample Row', par: 4, start: [0, 2, 1], loops: true,
      story: 'Four samples in a row, each 2 squares apart. Doing the same thing over and over? That is a job for a loop!',
      tip: 'Drive 2 and drill. That is one piece. Put it inside \'repeat 4\' and \'end\'.',
      map: ['.........', '.........', '.........', '.....R...', '..R......', '.........', '..*.*.*.*', '.......R.', '.........'],
      solution: "repeat 4\n  forward 2\n  drill\nend"
    },
    {
      title: 'Square Dance', par: 5, start: [2, 1, 0], loops: true,
      story: 'Four samples sit on the corners of a square. You are on the first one. Every side is the same, so use a repeat loop!',
      tip: 'One side of the square is: forward 4, drill, turn right. Put that inside "repeat 4" and "end".',
      map: ['.........', '.........', '.........', '..*...*..', '...R.R...', '....R....', '...R.R...', '..*...*..', '.........'],
      solution: 'repeat 4\n  forward 4\n  drill\n  turn right\nend'
    },
    {
      title: 'Staircase', par: 7, start: [0, 0, 0], loops: true,
      story: 'The samples climb like stairs. Each step is the same moves. Loop it!',
      tip: 'One stair: forward 1, turn right, forward 1, drill, turn left. How many stairs are there?',
      map: ['.........', '.........', '.........', '...R.*...', '..R.*R...', '.R.*R....', 'R.*R.....', '.*R......', '.R.......'],
      solution: 'repeat 5\n  forward 1\n  turn right\n  forward 1\n  drill\n  turn left\nend'
    },
    {
      title: 'Zig Zag', par: 7, start: [0, 0, 0], loops: true,
      story: 'The samples zig-zag up the hill between craters. Find the pattern and loop it.',
      tip: 'One zig-zag: forward 2, turn right, forward 2, turn left, drill. How many samples are there?',
      map: ['.........', '.....C...', '......*..', '...C.C.C.', '....*....', '.C.C.C...', '..*......', '.C.C.....', '.........'],
      solution: "repeat 3\n  forward 2\n  turn right\n  forward 2\n  turn left\n  drill\nend"
    },
    {
      title: 'Home Sweet Home', par: 7, start: [4, 0, 0], loops: true, home: true,
      story: 'Grab both samples and park back on your landing pad. Stay out of the craters!',
      tip: 'The trip has 2 halves that use the same moves: forward 6, drill, turn left, forward 3, turn left.',
      map: ['.........', '.........', '....*....', '.........', '..CC.....', '..C......', '.........', '.........', '.*..H....'],
      solution: 'repeat 2\n  forward 6\n  drill\n  turn left\n  forward 3\n  turn left\nend'
    },
    {
      title: 'Crater Canyon', par: 12, start: [0, 0, 1], loops: true,
      story: 'Zig-zag through the canyon and collect all 4 samples. This one is a real coder challenge!',
      tip: 'Drive a lane, drill, turn left, forward 2, turn left, drive the next lane, drill, turn right, forward 2, turn right. Then repeat!',
      map: ['.........', '.CCCCCCCC', '*........', 'CCCCCCCC.', '........*', '.CCCCCCCC', '*........', 'CCCCCCCC.', '........*'],
      solution: 'repeat 2\n  forward 8\n  drill\n  turn left\n  forward 2\n  turn left\n  forward 8\n  drill\n  turn right\n  forward 2\n  turn right\nend'
    },
    {
      title: 'Loop in a Loop', par: 9, start: [0, 1, 1], loops: true,
      story: 'Two rows of samples. Drill a row, swing around, drill the next row. A loop can go INSIDE another loop!',
      tip: 'Inside: repeat 3 (forward 2, drill). Outside, after that: turn left, forward 2, turn left. Repeat the whole thing 2 times.',
      map: ['.........', '.........', '.........', '.........', '.........', '*.*.*....', '.RRRRR...', '..*.*.*..', '.........'],
      solution: "repeat 2\n  repeat 3\n    forward 2\n    drill\n  end\n  turn left\n  forward 2\n  turn left\nend"
    },
    {
      title: 'The Long Way Home', par: 12, start: [0, 0, 0], home: true,
      story: 'The rarest crystal sits in the far corner. Weave through the rocks, drill it, and drive all the way back to your pad.',
      tip: 'Plan it on paper first! Up, right, up, right to reach the corner. Then the outside edge of the map is clear all the way home.',
      map: ['........*', '..R..R...', '...R.RRR.', '..C..RR..', '.........', '.R....C..', '.RRR...C.', '.RR...R..', 'H........'],
      solution: "forward 4\nturn right\nforward 4\nturn left\nforward 4\nturn right\nforward 4\ndrill\nturn right\nforward 8\nturn right\nforward 8"
    },
  ];
  /* note on map rows: the LAST string is the front row (r = 0). */

  const starter = `# Rover Run
# Drive to the sample, then drill!
forward 1
`;
  const sh = RA.buildShell({
    id: 'rover', title: 'Rover Run', icon: '🚀', accent: '#ff7a3d', commands, starter, repeat: true, extraView: ['chase', 'Chase'],
    tips: [
      '<b>Turns are from the rover\'s point of view.</b> If it faces you, its left is your right!',
      '<code>turn left</code> / <code>turn right</code> spin the rover in place, a quarter turn.',
      'Loops: lines between <code>repeat 3</code> and <code>end</code> run 3 times.',
      'Rocks and craters stop the rover. So does the edge of the map.',
      'Fewer lines = more stars. Loops are the secret!'
    ]
  });

  /* ---------------- scene ---------------- */
  const stage = RA.createStage(sh.canvas, { bg: 0xe2a37a, shadowSize: 9, sunX: -6, sunY: 14, sunZ: 6 });
  sh.stage = stage;
  const scene = stage.scene;
  scene.fog = new THREE.Fog(0xe2a37a, 22, 60);
  stage.hemi.color.setHex(0xffe1c8); stage.hemi.groundColor.setHex(0x6b2c14);
  const R = { c: 0, r: 0, h: 0, x: 0, z: 0, yaw: 0, tilt: 0, sink: 0 };
  stage.setViews({
    front: { pos: V3(0, 9.5, 13), target: V3(0, 0, -0.6) },
    top: { pos: V3(0, 16.5, 0.8), target: V3(0, 0, 0) },
    chase: () => {
      const fx = -Math.sin(R.yaw), fz = -Math.cos(R.yaw);
      return { pos: V3(R.x - fx * 3.4, 2.6, R.z - fz * 3.4), target: V3(R.x + fx * 2.5, 0.3, R.z + fz * 2.5) };
    }
  });
  const M = {
    sand: RA.mat(0xc1643a, { roughness: 1 }), sand2: RA.mat(0xb25a33, { roughness: 1 }), rock: RA.mat(0x7a3d26, { roughness: .9, flatShading: true }),
    white: RA.mat(0xeeeeee, { roughness: .4 }), dark: RA.mat(0x2a2a30), gold: RA.mat(0xd8a630, { metalness: .7, roughness: .3 }),
    panel: RA.mat(0x1d3d8f, { metalness: .4, roughness: .3, emissive: 0x050f30 }), crater: RA.mat(0x5e2614, { roughness: 1 }),
    crystal: RA.mat(0x5ff2ff, { emissive: 0x1aa6c4, roughness: .15, metalness: .1, flatShading: true }), pad: RA.mat(0x9aa0a8, { roughness: .6 })
  };
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), M.sand2);
  ground.rotation.x = -Math.PI / 2; ground.position.y = -0.02; ground.receiveShadow = true; scene.add(ground);
  for (let c = 0; c < N; c++) for (let r = 0; r < N; r++) {
    const t = new THREE.Mesh(new THREE.PlaneGeometry(CELL - 0.05, CELL - 0.05), (c + r) % 2 ? M.sand : RA.mat(0xc96d42, { roughness: 1 }));
    t.rotation.x = -Math.PI / 2; t.position.set(wx(c), 0, wz(r)); t.receiveShadow = true; scene.add(t);
  }
  const edge = (N * CELL) / 2 + 0.7;
  [['N', 0, -edge], ['S', 0, edge], ['E', edge, 0], ['W', -edge, 0]].forEach(([t, x, z]) => {
    const l = RA.groundLabel(t, 0.9, { w: 128, h: 128, font: '900 100px system-ui', color: '#fff3e0' }); l.position.set(x, 0.02, z); scene.add(l);
  });
  // far mountains + pebbles
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2 + 0.2, d = 26 + (i * 37 % 9);
    const m = new THREE.Mesh(new THREE.ConeGeometry(3 + (i * 13 % 5), 3 + (i * 7 % 6), 6), RA.mat(0x9c4a2a, { flatShading: true, roughness: 1 }));
    m.position.set(Math.cos(a) * d, 1, Math.sin(a) * d); scene.add(m);
  }
  for (let i = 0; i < 70; i++) {
    const a = Math.random() * Math.PI * 2, d = 7 + Math.random() * 14;
    const p = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08 + Math.random() * 0.2), M.rock);
    p.position.set(Math.cos(a) * d, 0.05, Math.sin(a) * d); scene.add(p);
  }

  // the rover
  const rover = new THREE.Group(); scene.add(rover);
  const body = RA.box(0.62, 0.22, 0.82, M.white); body.position.y = 0.42; rover.add(body);
  const deck = RA.box(0.66, 0.05, 0.86, M.gold); deck.position.y = 0.55; rover.add(deck);
  const panel = RA.box(0.9, 0.03, 0.55, M.panel); panel.position.set(0, 0.6, 0.2); rover.add(panel);
  const mastR = RA.cyl(0.03, 0.03, 0.45, M.white, 8); mastR.position.set(0.18, 0.8, -0.3); rover.add(mastR);
  const head = RA.box(0.22, 0.12, 0.14, M.white); head.position.set(0.18, 1.04, -0.3); rover.add(head);
  [-.05, .05].forEach(x => { const e = RA.cyl(0.03, 0.03, 0.04, M.dark, 10); e.rotation.x = Math.PI / 2; e.position.set(0.18 + x, 1.04, -0.38); rover.add(e); });
  const ant = RA.cyl(0.01, 0.01, 0.4, M.dark, 6); ant.position.set(-0.2, 0.8, 0.25); rover.add(ant);
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.white); dish.position.set(-0.2, 1.0, 0.25); dish.rotation.x = Math.PI; rover.add(dish);
  const wheels = [];
  [-.36, .36].forEach(x => [-.32, 0, .32].forEach(z => {
    const w = RA.cyl(0.13, 0.13, 0.1, M.dark, 14); w.rotation.z = Math.PI / 2; w.position.set(x, 0.14, z); rover.add(w); wheels.push(w);
  }));
  const drill = RA.cyl(0.03, 0.01, 0.35, M.gold, 8); drill.position.set(0, 0.3, -0.42); rover.add(drill);
  const flag = RA.signPlane('🚀', 0.25, { w: 128, h: 128, font: '100px sans-serif' }); flag.position.set(-0.2, 0.47, -0.42); flag.rotation.y = Math.PI; rover.add(flag);
  // facing arrow (helps with left/right)
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.34, 3), new THREE.MeshBasicMaterial({ color: 0xffe14d }));
  arrow.rotation.x = -Math.PI / 2; arrow.position.set(0, 0.05, -0.68); rover.add(arrow);

  function placeRover() {
    rover.position.set(R.x, -R.sink, R.z);
    rover.rotation.set(0, 0, 0);
    rover.rotateY(R.yaw);
    rover.rotateX(R.tilt);
  }

  /* ---------------- level ---------------- */
  let grid = [], samples = [], mission, missionIdx = 0, world = new THREE.Group(), homePad = null, collected = 0;
  scene.add(world);
  const cellAt = (c, r) => (c < 0 || r < 0 || c >= N || r >= N) ? 'edge' : grid[r][c];
  function loadMission(i) {
    missionIdx = i; mission = MISSIONS[i]; RA.store.set('rover.mission', i);
    world.clear(); samples = []; homePad = null; collected = 0;
    grid = [];
    for (let r = 0; r < N; r++) {
      grid[r] = [];
      const row = mission.map[N - 1 - r];
      for (let c = 0; c < N; c++) {
        const ch = row[c] || '.';
        grid[r][c] = ch === 'R' ? 'rock' : ch === 'C' ? 'crater' : '.';
        if (ch === 'R') {
          const m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.42, 0), M.rock);
          m.position.set(wx(c), 0.28, wz(r)); m.rotation.set(c * 1.3, r * 0.7, c + r); m.scale.set(1, 0.8, 1); m.castShadow = true; world.add(m);
        }
        if (ch === 'C') {
          const rim = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.1, 6, 18), RA.mat(0x9c4a2a, { roughness: 1 })); rim.rotation.x = Math.PI / 2; rim.position.set(wx(c), 0.03, wz(r)); world.add(rim);
          const hole = new THREE.Mesh(new THREE.CircleGeometry(0.46, 18), M.crater); hole.rotation.x = -Math.PI / 2; hole.position.set(wx(c), 0.012, wz(r)); world.add(hole);
        }
        if (ch === '*') addSample(c, r);
        if (ch === 'H') addHome(c, r);
      }
    }
    resetRover();
    renderMission();
  }
  function addSample(c, r) {
    const g = new THREE.Group();
    const cr = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), M.crystal); cr.scale.y = 1.6; cr.position.y = 0.42; cr.castShadow = true; g.add(cr);
    const cr2 = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), M.crystal); cr2.position.set(0.15, 0.2, 0.1); cr2.rotation.z = .5; g.add(cr2);
    const glow = new THREE.Mesh(new THREE.CircleGeometry(0.42, 20), new THREE.MeshBasicMaterial({ color: 0x5ff2ff, transparent: true, opacity: .35, depthWrite: false }));
    glow.rotation.x = -Math.PI / 2; glow.position.y = 0.015; g.add(glow);
    g.position.set(wx(c), 0, wz(r)); world.add(g);
    samples.push({ c, r, g, cr, got: false });
  }
  function addHome(c, r) {
    const pad = RA.cyl(0.55, 0.58, 0.05, M.pad, 24); pad.position.set(wx(c), 0.025, wz(r)); world.add(pad);
    const h = RA.groundLabel('H', 0.6, { w: 128, h: 128, font: '900 100px system-ui', color: '#ffe14d' }); h.position.set(wx(c), 0.06, wz(r)); world.add(h);
    homePad = { c, r };
  }
  stage.frame.push((dt, t) => samples.forEach((s, i) => { if (!s.got) { s.cr.rotation.y = t + i; s.cr.position.y = 0.42 + Math.sin(t * 2 + i) * 0.05; } }));
  function resetRover() {
    const [c, r, h] = mission.start;
    Object.assign(R, { c, r, h, x: wx(c), z: wz(r), yaw: -h * Math.PI / 2, tilt: 0, sink: 0 });
    samples.forEach(s => { s.got = false; s.g.visible = true; s.g.scale.setScalar(1); });
    collected = 0;
    placeRover(); hud(); stage.want('front');
  }
  function hud() {
    sh.setHud([['Facing', HEAD[R.h]], ['Samples', collected + ' / ' + samples.length]].concat(homePad ? [['Home', collected === samples.length && R.c === homePad.c && R.r === homePad.r ? 'parked ✔' : 'not yet']] : []));
  }

  /* ---------------- missions panel ---------------- */
  const progress = RA.store.get('rover.progress', {});
  function renderMission() {
    const m = mission;
    const opts = MISSIONS.map((x, i) => `<option value="${i}" ${i === missionIdx ? 'selected' : ''}>${i + 1}. ${RA.esc(x.title)} ${progress[x.title] ? '⭐'.repeat(progress[x.title]) : ''}</option>`).join('');
    sh.mission.innerHTML = `
      <h2>Mission <select class="msel" style="margin-left:6px;background:#0a0c18;border:1px solid var(--line);border-radius:8px;padding:4px;text-transform:none;letter-spacing:0;color:var(--ink);font-size:14px">${opts}</select></h2>
      <h3>${RA.esc(m.title)} ${m.loops ? '<span style="font-size:12px;background:#2a2550;color:var(--t);padding:2px 7px;border-radius:99px;vertical-align:middle">LOOP LEVEL</span>' : ''}</h3>
      <p>${RA.esc(m.story)}</p>
      <ul class="goals">
        <li class="${collected === samples.length ? 'done' : ''}"><span class="ck">${collected === samples.length ? '✅' : '💎'}</span>${samples.length > 1 ? 'Collect all ' + samples.length + ' samples' : 'Collect the sample'}</li>
        ${m.home ? `<li><span class="ck">🏠</span>Finish parked on the H pad</li>` : ''}
      </ul>
      <p style="color:var(--dim);font-size:13px;margin-top:6px">⭐⭐⭐ if your program is ${m.par} lines or less${m.loops ? ' (you will need a loop!)' : ''}.</p>
      <div class="mrow"><button class="showhint">💡 Hint</button>${missionIdx < MISSIONS.length - 1 ? '<button class="nextm">Next mission &rarr;</button>' : ''}</div>
      <div class="hint">${RA.esc(m.tip)}</div>`;
    const q = s => sh.mission.querySelector(s);
    q('.msel').onchange = e => { if (sh.running) { e.target.value = missionIdx; return; } sh.clearLog(); sh.mark(0); loadMission(Number(e.target.value)); };
    q('.showhint').onclick = () => q('.hint').classList.toggle('on');
    if (q('.nextm')) q('.nextm').onclick = () => { if (!sh.running) { sh.clearLog(); loadMission(missionIdx + 1); } };
  }

  /* ---------------- commands ---------------- */
  async function drive(n, dir) {
    stage.want('top');
    const h = dir > 0 ? R.h : (R.h + 2) % 4;
    for (let i = 0; i < n; i++) {
      const nc = R.c + DC[h], nr = R.r + DR[h];
      const what = cellAt(nc, nr);
      const x0 = R.x, z0 = R.z, x1 = wx(nc), z1 = wz(nr);
      if (what === 'rock' || what === 'edge') {
        await RA.tween(150, k => { R.x = RA.lerp(x0, x1, k * 0.3); R.z = RA.lerp(z0, z1, k * 0.3); placeRover(); });
        await RA.tween(180, k => { R.x = RA.lerp(x0, x1, (1 - k) * 0.3); R.z = RA.lerp(z0, z1, (1 - k) * 0.3); placeRover(); });
        R.x = x0; R.z = z0; placeRover();
        RA.crash(what === 'rock'
          ? 'Bonk! A rock is in the way after ' + i + ' square' + (i === 1 ? '' : 's') + '. Turn and go around it.'
          : 'Whoa! That is the edge of the map. The rover stopped after ' + i + ' square' + (i === 1 ? '' : 's') + '.');
      }
      RA.sfx.step();
      await RA.tween(380, k => { R.x = RA.lerp(x0, x1, k); R.z = RA.lerp(z0, z1, k); wheels.forEach(w => w.rotation.x += 0.2 * dir); placeRover(); }, RA.ease.linear);
      R.c = nc; R.r = nr; R.x = x1; R.z = z1; placeRover(); hud();
      if (what === 'crater') {
        await RA.tween(500, k => { R.sink = k * 0.45; R.tilt = k * 0.5 * dir; placeRover(); }, RA.ease.in);
        RA.crash('Oh no, the rover drove into a crater! Craters are the dark holes. Steer around them.');
      }
    }
  }
  async function turn(d) {
    stage.want('top');
    RA.sfx.whirr();
    const y0 = R.yaw;
    R.h = (R.h + (d > 0 ? 1 : 3)) % 4;
    await RA.tween(420, k => { R.yaw = y0 - d * k * Math.PI / 2; placeRover(); });
    R.yaw = -R.h * Math.PI / 2; placeRover(); hud();
  }
  async function drillHere() {
    stage.want('front');
    const s = samples.find(s => !s.got && s.c === R.c && s.r === R.r);
    RA.sfx.whirr();
    await RA.tween(300, k => { drill.position.y = 0.3 - k * 0.22; drill.rotation.y += 0.6; });
    if (!s) {
      await RA.tween(250, k => { drill.position.y = 0.08 + k * 0.22; });
      const got = samples.find(x => x.got && x.c === R.c && x.r === R.r);
      RA.crash(got ? 'You already drilled this sample! Move on to the next one.' : 'Nothing to drill here. There is no sample on this square.');
    }
    s.got = true; collected++;
    RA.sfx.grab();
    await RA.tween(380, k => { s.g.scale.setScalar(1 - k); s.g.position.y = k * 0.5; drill.position.y = 0.08 + k * 0.22; });
    s.g.visible = false;
    sh.log('💎 Sample ' + collected + ' of ' + samples.length + ' collected!', 'ok');
    hud(); renderMission();
  }

  /* ---------------- wire up ---------------- */
  RA.attachRunner(sh, {
    commands, hints,
    beforeRun() { loadMission(missionIdx); },
    async exec(st) {
      switch (st.name) {
        case 'forward': return drive(st.n, 1);
        case 'backward': return drive(st.n, -1);
        case 'left': return turn(-1);
        case 'right': return turn(1);
        case 'drill': return drillHere();
      }
    },
    async afterRun(res) {
      stage.want('front');
      if (!res.ok) return;
      const left = samples.length - collected;
      const homeOk = !homePad || (R.c === homePad.c && R.r === homePad.r);
      if (left) { sh.log('Program finished, but ' + left + ' sample' + (left > 1 ? 's are' : ' is') + ' still out there.', 'warn'); return; }
      if (!homeOk) { sh.log('All samples collected, but the rover must finish on the H pad.', 'warn'); return; }
      const stars = res.lines <= mission.par ? 3 : res.lines <= mission.par + 3 ? 2 : 1;
      if (!progress[mission.title] || stars > progress[mission.title]) { progress[mission.title] = stars; RA.store.set('rover.progress', progress); }
      RA.sfx.win();
      sh.log('🎉 Mission complete in ' + res.lines + ' lines!', 'ok');
      const next = missionIdx < MISSIONS.length - 1;
      const box = sh.modal(`<div style="font-size:64px">🚀</div><h2>Mission complete!</h2>
        <div style="font-size:38px;letter-spacing:4px">${'⭐'.repeat(stars)}<span style="opacity:.25">${'⭐'.repeat(3 - stars)}</span></div>
        <p>Your program used <b>${res.lines}</b> lines. ${stars < 3 ? 'Can you do it in <b>' + mission.par + '</b> or less?' + (mission.loops ? ' Try a <code>repeat</code> loop!' : '') : 'Mission control is proud of you!'}</p>
        <div class="acts"><button data-close>Stay here</button>${next ? '<button class="acc gonext">Next mission &rarr;</button>' : ''}</div>`);
      renderMission();
      if (next) box.querySelector('.gonext').onclick = () => { sh.closeModal(); sh.clearLog(); loadMission(missionIdx + 1); };
    },
    reset() { loadMission(missionIdx); }
  });

  loadMission(Math.min(MISSIONS.length - 1, RA.store.get('rover.mission', 0)));
  RA.debug = { MISSIONS, load: loadMission };
})();
