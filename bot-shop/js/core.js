/* Bot Assembly Shop — core data: parts, bot math, tiles, courses, storage */
'use strict';
const pl = planck, V = pl.Vec2;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const MPH = 2.237;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------------- Parts catalog ---------------- */
const PARTS = {
  chassis: [
    { id: 'scout', name: 'Scout', icon: '🛹', desc: 'Light and quick. 1 gadget slot.', len: 1.8, ht: 0.45, mass: 28, slots: 1, cost: 100 },
    { id: 'rover', name: 'Rover', icon: '🚙', desc: 'Good at everything. 2 gadget slots.', len: 2.2, ht: 0.55, mass: 50, slots: 2, cost: 180 },
    { id: 'hauler', name: 'Hauler', icon: '🚛', desc: 'Big and heavy. 3 gadget slots.', len: 2.8, ht: 0.7, mass: 95, slots: 3, cost: 300 },
  ],
  wheels: [
    { id: 'mini', name: 'Mini', desc: 'Tiny. Lots of push, low top speed. Gets stuck on bumps.', r: 0.3, mass: 3, cost: 40 },
    { id: 'std', name: 'Standard', desc: 'A solid all-around wheel.', r: 0.45, mass: 6, cost: 80 },
    { id: 'big', name: 'Big', desc: 'Rolls over steps and mud. Faster, but less push.', r: 0.65, mass: 11, cost: 140 },
    { id: 'monster', name: 'Monster', desc: 'Crushes obstacles. Needs a strong motor to turn.', r: 0.9, mass: 20, cost: 220 },
  ],
  tires: [
    { id: 'slick', name: 'Slick', desc: 'Smooth and cheap. Slips on hills and ice.', mu: 0.55, ice: 0.06, mass: 0, cost: 0 },
    { id: 'allterrain', name: 'All-Terrain', desc: 'Knobby tread for good grip.', mu: 0.95, ice: 0.14, mass: 1, cost: 60 },
    { id: 'spiked', name: 'Spiked', desc: 'Maximum grip. Bites into ice.', mu: 1.5, ice: 0.75, mass: 2, cost: 130 },
  ],
  motor: [
    { id: 'zip', name: 'Zip Motor', desc: 'Spins very fast, but weak.', speed: 30, torque: 60, mass: 6, eff: 1, cost: 80 },
    { id: 'std', name: 'Workhorse', desc: 'Balanced speed and torque.', speed: 20, torque: 140, mass: 10, eff: 1, cost: 120 },
    { id: 'titan', name: 'Torque Titan', desc: 'Slow but very strong.', speed: 11, torque: 420, mass: 18, eff: 1, cost: 200 },
    { id: 'beast', name: 'The Beast', desc: 'Fast AND strong. Heavy, pricey, drains batteries.', speed: 26, torque: 500, mass: 30, eff: 1.4, cost: 380 },
  ],
  gear: [
    { ratio: 0.5, name: 'Overdrive' }, { ratio: 0.75, name: 'Fast' }, { ratio: 1, name: 'Even' },
    { ratio: 1.5, name: 'Strong' }, { ratio: 2, name: 'Crawler' }, { ratio: 3, name: 'Tractor' },
  ],
  battery: [
    { id: 'small', name: 'Small Cell', desc: 'Light, but runs out fast.', mass: 5, energy: 80, cost: 40 },
    { id: 'medium', name: 'Power Pack', desc: 'Enough for most courses.', mass: 11, energy: 200, cost: 90 },
    { id: 'large', name: 'Mega Cell', desc: 'Lasts a long time. Heavy.', mass: 22, energy: 500, cost: 160 },
  ],
  drive: [
    { id: 'rwd', name: 'Rear-Wheel Drive', desc: 'Only the back wheel pushes.', mass: 0, cost: 0 },
    { id: 'awd', name: 'All-Wheel Drive', desc: 'Both wheels push. Much better traction.', mass: 5, cost: 80 },
  ],
  gadgets: [
    { id: 'hook', name: 'Grapple Hook', icon: '🪝', key: 'E', desc: 'Grab zip lines and grapple points. Hold ↑ to reel in.', mass: 4, cost: 120 },
    { id: 'jump', name: 'Jump Jack', icon: '🦘', key: 'Space', desc: 'Spring into the air. Light bots jump higher.', mass: 5, cost: 100 },
    { id: 'blade', name: 'Dozer Blade', icon: '🚜', desc: 'Pushes crates without climbing on top of them.', mass: 8, cost: 70 },
    { id: 'rocket', name: 'Rocket Booster', icon: '🚀', key: 'Shift', desc: '3 seconds of serious thrust.', mass: 7, cost: 160 },
    { id: 'ballast', name: 'Ballast Weights', icon: '🧱', desc: 'Extra weight down low: more traction, harder to flip.', mass: 30, cost: 30 },
    { id: 'floats', name: 'Pontoon Floats', icon: '🛟', desc: 'Float and paddle across water.', mass: 6, cost: 90 },
    { id: 'righter', name: 'Roll Cage', icon: '🔄', key: 'F', desc: 'Flip yourself back over when you crash.', mass: 5, cost: 60 },
    { id: 'wing', name: 'Glider Wing', icon: '🪽', desc: 'Glide over long gaps. Only lifts light, fast bots.', mass: 3, cost: 110 },
  ],
};
const byId = (list, id) => list.find(p => p.id === id) || list[0];
const BOT_COLORS = ['#ffc21a', '#ff5a36', '#2ad4c0', '#4d8dff', '#b46bff', '#7bd13b', '#ff6fb5', '#e8edf2'];
const DEFAULT_BOT = { name: 'Sparky', color: '#ffc21a', chassis: 'rover', wheels: 'std', tires: 'slick', motor: 'std', gear: 2, battery: 'small', drive: 'rwd', gadgets: [] };

/* Everything the physics and the stat panel need to know about a build */
function botSpec(cfg) {
  const ch = byId(PARTS.chassis, cfg.chassis), wh = byId(PARTS.wheels, cfg.wheels), ti = byId(PARTS.tires, cfg.tires);
  const mo = byId(PARTS.motor, cfg.motor), ge = PARTS.gear[clamp(cfg.gear | 0, 0, PARTS.gear.length - 1)];
  const ba = byId(PARTS.battery, cfg.battery), dr = byId(PARTS.drive, cfg.drive);
  const gadgets = (cfg.gadgets || []).map(id => PARTS.gadgets.find(g => g.id === id)).filter(Boolean).slice(0, ch.slots);
  const has = {}; gadgets.forEach(g => has[g.id] = true);
  const gMass = gadgets.reduce((s, g) => s + g.mass, 0), gCost = gadgets.reduce((s, g) => s + g.cost, 0);
  const wheelMass = wh.mass + ti.mass;
  const bodyMass = ch.mass + mo.mass + ba.mass + dr.mass + gMass;
  const mass = bodyMass + wheelMass * 2;
  const T = mo.torque * ge.ratio, w = mo.speed / ge.ratio;
  const awd = dr.id === 'awd', frac = awd ? 1 : 0.55;
  const weight = mass * 10;
  const push = Math.min(T / wh.r, ti.mu * weight * frac);
  const climbTorque = Math.asin(Math.min(1, (T / wh.r) / weight));
  const climbGrip = Math.atan(ti.mu * frac);
  const cost = ch.cost + wh.cost + ti.cost + mo.cost + ba.cost + dr.cost + gCost;
  return {
    ch, wh, ti, mo, ge, ba, dr, gadgets, has, awd, r: wh.r, mu: ti.mu, wheelMass, bodyMass, mass, T, w,
    topSpeed: w * wh.r, push, climbDeg: Math.min(climbTorque, climbGrip) * 180 / Math.PI,
    limitedBy: climbTorque < climbGrip ? 'torque' : 'grip', energy: ba.energy, cost,
    wheelDX: Math.max(ch.len * 0.36, wh.r + 0.04), comY: -0.08 - (has.ballast ? 0.2 : 0),
  };
}

/* ---------------- Tiles ---------------- */
const SHAPES = [null,
  [[0, 0], [1, 0], [1, 1], [0, 1]],       // 1 block
  [[0, 0], [1, 0], [1, 1]],               // 2 steep ramp up
  [[0, 0], [1, 0], [0, 1]],               // 3 steep ramp down
  [[0, 0], [1, 0], [1, .5]],              // 4 gentle up (low half)
  [[0, 0], [1, 0], [1, 1], [0, .5]],      // 5 gentle up (high half)
  [[0, 0], [1, 0], [1, .5], [0, 1]],      // 6 gentle down (high half)
  [[0, 0], [1, 0], [0, .5]],              // 7 gentle down (low half)
  [[0, 0], [1, 0], [1, .5], [0, .5]],     // 8 half slab
];
const WATER = 30, LAVA = 31, DIRT = 0, ICE = 1, MUD = 2;
const tShape = c => (c > 0 && c <= 24) ? ((c - 1) % 8) + 1 : 0;
const tMat = c => (c > 0 && c <= 24) ? ((c - 1) / 8 | 0) : 0;
const tcode = (shape, mat) => shape + mat * 8;
const COURSE_H = 40;

function newCourse(w = 120) {
  return { v: 1, id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name: 'My Course', kind: 'crazy', budget: 1000, w, h: COURSE_H, tiles: new Uint8Array(w * COURSE_H), objs: [], par: null, desc: '' };
}
const tget = (c, x, y) => (x < 0 || y < 0 || x >= c.w || y >= c.h) ? 0 : c.tiles[y * c.w + x];
const tset = (c, x, y, v) => { if (x >= 0 && y >= 0 && x < c.w && y < c.h) c.tiles[y * c.w + x] = v; };
function resizeCourse(c, w) {
  const t = new Uint8Array(w * c.h);
  for (let y = 0; y < c.h; y++) for (let x = 0; x < Math.min(w, c.w); x++) t[y * w + x] = c.tiles[y * c.w + x];
  c.tiles = t; c.w = w;
}

/* Merge solid tiles into smooth outline loops (so wheels never snag on tile seams) */
function buildOutline(c) {
  const E = new Map();
  const add = (ax, ay, bx, by) => {
    const rk = bx + ',' + by + '>' + ax + ',' + ay;
    if (E.has(rk)) { E.delete(rk); return; }
    E.set(ax + ',' + ay + '>' + bx + ',' + by, [ax, ay, bx, by]);
  };
  for (let y = 0; y < c.h; y++) for (let x = 0; x < c.w; x++) {
    const s = tShape(c.tiles[y * c.w + x]); if (!s) continue;
    const p = SHAPES[s];
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = p[(i + 1) % p.length];
      const ax = (x + a[0]) * 2, ay = (y + a[1]) * 2, bx = (x + b[0]) * 2, by = (y + b[1]) * 2;
      if ((ax === bx || ay === by) && Math.abs(bx - ax) + Math.abs(by - ay) === 2) {
        const mx = (ax + bx) / 2, my = (ay + by) / 2; add(ax, ay, mx, my); add(mx, my, bx, by);
      } else add(ax, ay, bx, by);
    }
  }
  const from = new Map();
  for (const e of E.values()) { const k = e[0] + ',' + e[1]; (from.get(k) || from.set(k, []).get(k)).push(e); }
  const loops = [];
  for (const start of E.values()) {
    if (start.used) continue;
    const pts = []; let e = start;
    while (e && !e.used) {
      e.used = true; pts.push([e[0] / 2, e[1] / 2]);
      const outs = from.get(e[2] + ',' + e[3]) || [];
      // prefer the sharpest left turn so touching corners stay separate loops
      let best = null, bestA = -9; const dx = e[2] - e[0], dy = e[3] - e[1];
      for (const o of outs) { if (o.used) continue; const a = Math.atan2(dx * (o[3] - o[1]) - dy * (o[2] - o[0]), dx * (o[2] - o[0]) + dy * (o[3] - o[1])); if (a > bestA) { bestA = a; best = o; } }
      e = best;
    }
    // drop collinear points
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[(i + pts.length - 1) % pts.length], b = pts[i], d = pts[(i + 1) % pts.length];
      if (Math.abs((b[0] - a[0]) * (d[1] - b[1]) - (b[1] - a[1]) * (d[0] - b[0])) > 1e-9) out.push(b);
    }
    if (out.length >= 3) loops.push(out);
  }
  return loops;
}

/* ---------------- Sharing ---------------- */
function packCourse(c) {
  const t = c.tiles, out = [];
  for (let i = 0; i < t.length;) { let j = i; while (j < t.length && t[j] === t[i]) j++; out.push(t[i].toString(36) + (j - i > 1 ? '*' + (j - i).toString(36) : '')); i = j; }
  return { v: 1, id: c.id, name: c.name, kind: c.kind, budget: c.budget, w: c.w, h: c.h, par: c.par, desc: c.desc || '', author: c.author || '', objs: c.objs, t: out.join(',') };
}
function unpackCourse(o) {
  if (!o || !o.w || !o.h || o.w > 600 || o.h !== COURSE_H) throw new Error('bad course');
  const c = newCourse(o.w);
  Object.assign(c, { id: o.id || c.id, name: String(o.name || 'Course').slice(0, 40), kind: ['speed', 'strength', 'crazy'].includes(o.kind) ? o.kind : 'crazy', budget: clamp(+o.budget || 1000, 200, 9999), par: o.par || null, desc: String(o.desc || '').slice(0, 200), author: String(o.author || '').slice(0, 30) });
  let i = 0;
  for (const run of String(o.t || '').split(',')) { if (!run) continue; const [v, n] = run.split('*'); const val = parseInt(v, 36), cnt = n ? parseInt(n, 36) : 1; for (let k = 0; k < cnt && i < c.tiles.length; k++) c.tiles[i++] = val; }
  c.objs = (o.objs || []).filter(b => b && OBJ[b.t]).slice(0, 400).map(b => { const r = { t: b.t, x: +b.x || 0, y: +b.y || 0 }; if (OBJ[b.t].two) { r.x2 = +b.x2 || 0; r.y2 = +b.y2 || 0; } return r; });
  return c;
}
const courseToCode = c => 'BOT1.' + btoa(unescape(encodeURIComponent(JSON.stringify(packCourse(c))))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
function codeToCourse(code) {
  const m = String(code).trim().match(/BOT1\.([A-Za-z0-9_\-]+)/); if (!m) throw new Error('no code');
  return unpackCourse(JSON.parse(decodeURIComponent(escape(atob(m[1].replace(/-/g, '+').replace(/_/g, '/'))))));
}

/* ---------------- Course objects ---------------- */
const OBJ = {
  start: { name: 'Start', icon: '🟢', one: true, tip: 'Where the bot begins.' },
  finish: { name: 'Finish', icon: '🏁', one: true, tip: 'Reach this flag to win.' },
  checkpoint: { name: 'Checkpoint', icon: '🚩', tip: 'Bots respawn here after a crash.' },
  crate: { name: 'Wood Crate', icon: '📦', tip: 'Light. Easy to push or smash through.' },
  steel: { name: 'Steel Crate', icon: '🗄️', tip: 'Very heavy. Needs real pushing power.' },
  boulder: { name: 'Boulder', icon: '🪨', tip: 'Heavy and it rolls.' },
  seesaw: { name: 'Seesaw', icon: '⚖️', tip: 'Tips when you drive across it.' },
  bridge: { name: 'Rope Bridge', icon: '🌉', two: true, tip: 'Click one end, then the other. Sags under heavy bots.' },
  zip: { name: 'Zip Line', icon: '🚡', two: true, air: true, tip: 'Click the start (high end), then the end. Needs a Grapple Hook.' },
  anchor: { name: 'Grapple Point', icon: '📍', air: true, tip: 'Hook on and swing or winch up.' },
  hammer: { name: 'Swinging Hammer', icon: '🔨', air: true, tip: 'Place the pivot up high. Time your run!' },
  spinner: { name: 'Spinner', icon: '✳️', tip: 'A big turning bar.' },
  lift: { name: 'Elevator', icon: '🛗', tip: 'Platform that rises 5 m and comes back.' },
  ferry: { name: 'Moving Platform', icon: '↔️', tip: 'Platform that slides 6 m to the right and back.' },
  boost: { name: 'Boost Pad', icon: '⏩', tip: 'Shoves the bot forward.' },
  spring: { name: 'Spring Pad', icon: '🌀', tip: 'Launches the bot up. Light bots fly higher.' },
  fan: { name: 'Fan', icon: '💨', tip: 'Blows upward. Lifts light bots and gliders.' },
};

/* ---------------- Built-in courses ---------------- */
function CB(id, name, kind, budget, desc, medals) {
  const c = newCourse(420); Object.assign(c, { id, name, kind, budget, desc, medals, builtin: true });
  let x = 0, h = 10, mat = 0;
  const col = (top, cap) => { for (let y = 0; y < top; y++) tset(c, x, y, tcode(1, y >= top - 3 ? mat : 0)); if (cap) tset(c, x, top, tcode(cap, mat)); x++; };
  const rep = (n, f) => { for (let i = 0; i < n; i++) f(); return api; };
  const api = {
    mat(m) { mat = m; return api; },
    flat: (n = 1) => rep(n, () => col(h)),
    up: (n = 1) => rep(n, () => { col(h, 2); h++; }),
    down: (n = 1) => rep(n, () => { h--; col(h, 3); }),
    gup: (n = 1) => rep(n, () => { col(h, 4); col(h, 5); h++; }),
    gdown: (n = 1) => rep(n, () => { h--; col(h, 6); col(h, 7); }),
    bump: (n = 1) => rep(n, () => col(h, 8)),
    step(d) { h += d; return api; },
    // gap(n): bottomless. gap(n, LAVA, depth, level): pit `depth` deep with `level` tiles of liquid on its floor
    gap: (n, fill = 0, depth = 3, level = depth) => rep(n, () => { if (fill) { const fl = Math.max(1, h - depth); for (let y = 0; y < fl; y++) tset(c, x, y, tcode(1, 0)); for (let y = fl; y < fl + level; y++) tset(c, x, y, fill); } x++; }),
    // a pool you can drive into and out of: gentle ramps at both ends
    pool(n, depth) {
      const h0 = h, wet = () => { for (let y = h + 1; y < h0; y++) tset(c, x - 1, y, WATER); };
      for (let i = 0; i < depth; i++) { h--; col(h, 6); wet(); col(h, 7); wet(); }
      for (let i = 0; i < n; i++) { col(h); tset(c, x - 1, h, WATER); wet(); }
      for (let i = 0; i < depth; i++) { col(h, 4); wet(); col(h, 5); wet(); h++; }
      return api;
    },
    o(t, dx = 0, dy = 0, ex) { c.objs.push(Object.assign({ t, x: x + dx, y: h + dy }, ex && { x2: x + ex[0], y2: h + ex[1] })); return api; },
    done() { resizeCourse(c, x); return c; },
  };
  return api;
}

function builtinCourses() {
  const L = [];
  L.push(CB('b_test', 'Test Track', 'speed', 600, 'Your first drive. Learn the controls and see how your bot handles.', [8.5, 13])
    .flat(4).o('start').flat(14).gup(2).flat(6).gdown(2).flat(16).gup(1).flat(5).gdown(1).flat(10).o('finish').flat(6).done());

  L.push(CB('b_drag', 'Drag Strip', 'speed', 750, 'A long straight shot. Top speed wins, but you still have to get moving.', [11.5, 15])
    .flat(4).o('start').flat(30).o('boost').flat(40).gup(2).flat(4).gdown(2).flat(30).o('boost').flat(36).o('finish').flat(8).done());

  L.push(CB('b_thunder', 'Rolling Thunder', 'speed', 950, 'Hills and jumps. Too slow and you fall in the gaps. Too wild and you flip.', [18, 26])
    .flat(4).o('start').flat(16).gup(3).flat(3).gdown(3).flat(8).gup(2).gap(4).flat(10).o('checkpoint', -6).gdown(2).flat(10)
    .gup(3).flat(2).gdown(2).flat(6).gup(2).gap(4).flat(12).o('checkpoint', -8).flat(14).gdown(3).flat(14).gup(2).gap(4).flat(12).o('finish', -4).flat(6).done());

  L.push(CB('b_ice', 'Ice Sprint', 'speed', 1000, 'Frozen track. Slick tires just spin on icy hills.', [14, 22])
    .flat(4).o('start').flat(10).mat(ICE).flat(16).gup(2).flat(6).gdown(2).flat(10).mat(DIRT).flat(6).o('checkpoint', -3)
    .mat(ICE).gup(4).flat(6).gdown(1).flat(8).gup(2).flat(3).mat(DIRT).flat(5).o('checkpoint', -2).mat(ICE).gdown(5).flat(16).gup(3).mat(DIRT).flat(10).o('finish', -4).flat(6).done());

  L.push(CB('b_hill', 'Hill Climb', 'strength', 800, 'Each hill is steeper than the last. You need torque AND grip to reach the top.', [21, 32])
    .flat(4).o('start').flat(12).gup(4).flat(8).o('checkpoint', -4).up(3).flat(8).o('checkpoint', -4).gup(2).up(6).flat(8).o('checkpoint', -4).down(2).flat(6).up(9).flat(10).o('finish', -4).flat(6).done());

  L.push(CB('b_shove', 'Warehouse Shove', 'strength', 1100, 'Crates block the way. Shove them off the edge, then ride the platform across.', [38, 60])
    .flat(4).o('start').flat(12).o('crate', 0).o('crate', 0, 1).o('crate', 0, 2).o('crate', 1).o('crate', 1, 1).flat(14).o('checkpoint', -4)
    .o('steel', 2).flat(12).o('ferry', 2, 0).gap(10).flat(8).o('checkpoint', -6).mat(MUD).flat(14).mat(DIRT).flat(8).gdown(2).flat(6).up(4).flat(10).o('finish', -4).flat(6).done());

  L.push(CB('b_mud', 'Mud Mountain', 'strength', 1300, 'Deep mud, tall ledges and a long steep climb. Small wheels will bog down.', [18, 32])
    .flat(4).o('start').flat(8).mat(MUD).flat(12).gup(3).flat(6).mat(DIRT).flat(8).o('checkpoint', -5).bump(3).step(1).flat(8).bump(3).step(1).flat(6).o('checkpoint', -3).flat(8).gup(3).flat(4).gdown(1).mat(MUD).flat(10).gup(3).mat(DIRT).flat(3).up(5).flat(10).o('finish', -4).flat(6).done());

  L.push(CB('b_zip', 'Zip & Dip', 'crazy', 1000, 'A lava canyon with a zip line across it. No hook, no crossing.', [18, 28])
    .flat(4).o('start').flat(12).gup(3).flat(6).o('checkpoint', -3).o('zip', -1, 5.5, [21, 1.5]).gap(18, LAVA, 8, 2).step(-3).flat(12).o('checkpoint', -8)
    .gup(1).flat(4).o('anchor', 3.5, 7).gap(7, LAVA, 6, 2).flat(10).o('checkpoint', -7).o('spring', 3).flat(5).step(3).flat(8).o('checkpoint', -5)
    .o('zip', -2, 5, [18, -3]).gap(14).step(-6).flat(14).o('finish', -6).flat(6).done());

  L.push(CB('b_hammer', 'Hammer Time', 'crazy', 1200, 'Swinging hammers, a spinner, a seesaw, an elevator and a wobbly bridge.', [26, 42])
    .flat(4).o('start').flat(10).o('hammer', 4, 5.5).flat(12).o('hammer', 2, 5.5).flat(10).o('checkpoint', -3).o('seesaw', 5).flat(12).o('spinner', 4)
    .flat(10).o('checkpoint', -2).flat(4).o('lift', 2, 0).gap(4).step(5).flat(10).o('checkpoint', -8).o('bridge', 0, 0, [10, 0]).gap(10).flat(8)
    .o('hammer', 3, 5.5).flat(8).gdown(3).flat(10).o('boost', -1.5).gup(2).gap(5, LAVA, 5, 2).flat(12).o('finish', -6).flat(6).done());

  L.push(CB('b_gauntlet', 'The Gauntlet', 'crazy', 1600, 'A bit of everything, and more than one way through. Float it, zip it, or fly it.', [30, 50])
    .flat(4).o('start').flat(10).o('zip', -1, 6, [27, 2.5]).pool(12, 3).flat(8).o('checkpoint', -5).mat(ICE).gup(3).flat(4).mat(DIRT).flat(3)
    .o('checkpoint', -2).gup(2).o('fan', 3, -2).o('anchor', 3, 7.5).gap(6).flat(10).o('checkpoint', -6)
    .flat(10).o('spring', 3).flat(5).step(3).flat(6).o('hammer', 4, 5.5).flat(10).o('checkpoint', -2).mat(MUD).gdown(2).flat(6).mat(DIRT).up(3)
    .flat(4).o('bridge', 0, 0, [8, 0]).gap(8, WATER, 5, 2).flat(6).up(2).flat(5).o('crate', 0).o('crate', 0, 1).o('crate', 1).o('crate', 1, 1).o('crate', 0.5, 2).flat(8).o('finish', -3).flat(6).done());
  return L;
}

/* What a builder should know before they pick parts */
function analyzeCourse(c) {
  const f = {}, n = {};
  for (let i = 0; i < c.tiles.length; i++) {
    const t = c.tiles[i]; if (!t) continue;
    if (t === WATER) f.water = 1; else if (t === LAVA) f.lava = 1;
    else { const s = tShape(t), m = tMat(t); if (s === 2) f.steep = 1; if (s === 8) f.slab = 1; if (m === ICE) f.ice = 1; if (m === MUD) f.mud = 1; }
  }
  for (const o of c.objs) n[o.t] = (n[o.t] || 0) + 1;
  // surface profile → gaps and walls
  const top = []; for (let x = 0; x < c.w; x++) { let y = c.h - 1; while (y >= 0 && !tShape(tget(c, x, y))) y--; top.push(y + 1); }
  let gap = 0, run = 0, wall = 0, last = top[0] || 0;
  for (let x = 1; x < c.w; x++) {
    if (top[x] < last - 2) { run++; gap = Math.max(gap, run); }
    else { if (!run && top[x] > last && tShape(tget(c, x, top[x] - 1)) === 1 && tShape(tget(c, x, last)) === 1) wall = Math.max(wall, top[x] - last); run = 0; last = top[x]; }
  }
  const out = [];
  if (f.steep) out.push(['⛰️', 'Steep 45° climbs', 'You need torque and grip. Try a lower gear and better tires.']);
  if (wall) out.push(['🧗', `Walls up to ${wall} m`, 'Too tall to drive over. Jump, hook, or find a lift.']);
  if (f.slab) out.push(['🪜', 'Half-meter ledges', 'Bigger wheels roll over ledges that stop small ones.']);
  if (gap) out.push(['🕳️', `Gaps up to ${gap} m`, 'Go fast enough to jump, or bring a hook or wing.']);
  if (f.ice) out.push(['🧊', 'Ice', 'Slick tires spin on ice. Spiked tires bite.']);
  if (f.mud) out.push(['🟤', 'Mud', 'Mud drags hard on small wheels. Go big, and bring torque.']);
  if (f.water) out.push(['🌊', 'Water', 'Bots sink without Pontoon Floats. Or find a way over.']);
  if (f.lava) out.push(['🌋', 'Lava', 'Touch it and you are back at the checkpoint.']);
  if (n.zip) out.push(['🚡', 'Zip lines', 'You need the Grapple Hook to ride them.']);
  if (n.anchor) out.push(['📍', 'Grapple points', 'Hook on to swing across or winch up.']);
  if (n.steel || n.boulder) out.push(['🗄️', 'Heavy things to push', 'Pushing power = torque ÷ wheel size, but only if your tires grip.']);
  if (n.crate) out.push(['📦', 'Wood crates', 'Push through them or smash them at speed.']);
  if (n.hammer || n.spinner) out.push(['🔨', 'Moving hazards', 'Watch the timing before you go.']);
  if (n.bridge) out.push(['🌉', 'Rope bridge', 'Heavy bots make it sag.']);
  if (n.seesaw) out.push(['⚖️', 'Seesaw', 'It tips as your weight crosses the middle.']);
  if (n.lift || n.ferry) out.push(['🛗', 'Moving platforms', 'Wait for it, then drive on and stop.']);
  if (n.spring) out.push(['🌀', 'Spring pads', 'Light bots get launched higher.']);
  if (n.fan) out.push(['💨', 'Fans', 'Updrafts lift light bots. A wing helps a lot.']);
  if (n.boost) out.push(['⏩', 'Boost pads', 'Free speed.']);
  if (!out.length) out.push(['🛣️', 'Open road', 'Nothing tricky here. Build for speed.']);
  return out;
}

/* ---------------- Storage ---------------- */
const Store = {
  get(k, d) { try { const v = localStorage.getItem('botshop.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('botshop.' + k, JSON.stringify(v)); } catch (e) { } },
};
function loadMyCourses() { return Store.get('courses', []).map(o => { try { return unpackCourse(o); } catch (e) { return null; } }).filter(Boolean); }
function saveMyCourse(c) { const all = Store.get('courses', []); const i = all.findIndex(o => o.id === c.id); const p = packCourse(c); if (i >= 0) all[i] = p; else all.push(p); Store.set('courses', all); }
function deleteMyCourse(id) { Store.set('courses', Store.get('courses', []).filter(o => o.id !== id)); }
function medalFor(c, time) {
  let g, s;
  if (c.medals) [g, s] = c.medals; else if (c.par) { g = c.par * 1.1; s = c.par * 1.5; } else return 'finish';
  return time <= g ? 'gold' : time <= s ? 'silver' : 'bronze';
}
const MEDAL_ICON = { gold: '🥇', silver: '🥈', bronze: '🥉', finish: '✅' };
