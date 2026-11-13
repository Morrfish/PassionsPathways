/* Bot Assembly Shop — physics world, bot, simulation step, drawing */
'use strict';
const DT = 1 / 60, HOOK_RANGE = 10, RESET_PENALTY = 3;
const normAng = a => { a = (a + Math.PI) % (2 * Math.PI); if (a < 0) a += 2 * Math.PI; return a - Math.PI; };

/* ---------------- World ---------------- */
function makeGame(course, cfg) {
  const world = new pl.World({ gravity: V(0, -10) });
  const G = {
    course, cfg, world, ents: [], t: 0, clock: 0, started: false, done: null, penalties: 0, resets: 0, parts: [],
    balls: [], convs: [], dmgOn: Store.get('set', {}).damage !== false,
    stats: { stall: 0, slip: 0, flips: 0, fell: 0, sank: 0, burned: 0, smashed: 0, dead: false, maxSpeed: 0 }, flash: null, live: {},
    start: { x: 4, y: 12 }, finish: null, cps: [],
  };
  G.loops = buildOutline(course);
  G.ground = world.createBody();
  G.tops = [];
  for (const lp of G.loops) {
    G.ground.createFixture(pl.Chain(lp.map(p => V(p[0], p[1])), true), { friction: 0.8, filterCategoryBits: 2, userData: { terrain: 1 } });
    for (let i = 0; i < lp.length; i++) {
      const a = lp[i], b = lp[(i + 1) % lp.length], dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy), nx = dy / len, ny = -dx / len;
      if (ny > 0.3) G.tops.push({ a, b, mat: matAt(course, (a[0] + b[0]) / 2 - nx * 0.1, (a[1] + b[1]) / 2 - ny * 0.1) });
    }
  }
  for (const o of course.objs) spawnObj(G, o);
  G.respawn = { x: G.start.x, y: G.start.y };
  world.on('pre-solve', c => preSolve(G, c));
  if (cfg) { G.spec = botSpec(cfg); buildBot(G, G.start.x, G.start.y); G.respawn.energy = G.bot.energy; }
  return G;
}
function matAt(course, x, y) { const t = tget(course, Math.floor(x), Math.floor(y)); return tShape(t) ? tMat(t) : -1; }

function preSolve(G, c) {
  const fa = c.getFixtureA(), fb = c.getFixtureB(), ua = fa.getUserData(), ub = fb.getUserData();
  const wheel = ua && ua.wheel ? ua : ub && ub.wheel ? ub : null;
  const terrA = ua && ua.terrain, terrB = ub && ub.terrain;
  let mat = -1;
  if (terrA || terrB) {
    const wm = c.getWorldManifold(null);
    if (wm && wm.pointCount > 0) {
      const p = wm.points[0], n = wm.normal, s = terrA ? -1 : 1;
      mat = matAt(G.course, p.x + n.x * s * 0.06, p.y + n.y * s * 0.06);
      if (mat < 0) mat = matAt(G.course, p.x + n.x * s * 0.3, p.y + n.y * s * 0.3);
      if (mat < 0) mat = DIRT;
      if (wheel) c.setFriction(mat === ICE ? G.spec.ti.ice : G.spec.mu * (mat === MUD ? 0.7 : mat === SAND ? 0.8 : 1));
      else c.setFriction(mat === ICE ? 0.08 : 0.4);
      c.setRestitution(mat === RUBBER ? 0.82 : 0.05);
      let belt = 0; for (const cv of G.convs) if (p.x > cv.x0 && p.x < cv.x1 && Math.abs(p.y - cv.y) < 0.6) belt = cv.v;
      c.setTangentSpeed((terrA ? 1 : -1) * belt);   // contacts outlive the belt, so always set it
    }
  }
  if (wheel) { wheel.ground = true; if (mat >= 0) wheel.mat = mat; if (terrA || terrB) { const wm2 = c.getWorldManifold(null); if (wm2) { const sg = terrA ? 1 : -1; const ny = wm2.normal.y * sg; if (!wheel.has || ny < wheel.ny) { wheel.has = true; wheel.nx = wm2.normal.x * sg; wheel.ny = ny; } } } }
  if ((ua && ua.chassis) || (ub && ub.chassis)) G.bot.touch = true;
}

function dynBody(G, x, y, shape, mass, area, fr, extra) {
  const b = G.world.createBody(Object.assign({ type: 'dynamic', position: V(x, y) }, extra));
  b.createFixture(shape, { density: mass / area, friction: fr, restitution: 0.05 });
  return b;
}
function spawnObj(G, o) {
  const w = G.world, e = { t: o.t, o };
  switch (o.t) {
    case 'start': G.start = { x: o.x, y: o.y }; break;
    case 'finish': G.finish = { x: o.x, y: o.y }; break;
    case 'checkpoint': G.cps.push({ x: o.x, y: o.y, hit: false }); return;
    case 'crate': e.body = dynBody(G, o.x, o.y + 0.5, pl.Box(0.5, 0.5), 14, 1, 0.45); e.s = 0.5; e.hp = 0.25; break;
    case 'woodwall': case 'iceblock': case 'stone': {
      e.hw = o.t === 'stone' ? 1 : o.t === 'iceblock' ? 0.5 : 0.3; e.hh = o.t === 'stone' ? 1 : 1.5; e.hp = e.max = o.t === 'stone' ? 2 : 1.1; e.cx = o.x; e.cy = o.y + e.hh;
      e.body = w.createBody({ position: V(e.cx, e.cy) }); e.body.createFixture(pl.Box(e.hw, e.hh), { friction: o.t === 'iceblock' ? 0.1 : 0.6 }); break;
    }
    case 'gate': e.base = V(o.x, o.y + 2); e.open = 0; e.body = w.createBody({ type: 'kinematic', position: e.base.clone() }); e.body.createFixture(pl.Box(0.3, 2), { friction: 0.4 }); break;
    case 'switch': e.on = false; break;
    case 'steel': e.body = dynBody(G, o.x, o.y + 0.75, pl.Box(0.75, 0.75), 160, 2.25, 0.4); e.s = 0.75; break;
    case 'boulder': e.body = dynBody(G, o.x, o.y + 0.8, pl.Circle(0.8), 110, 2, 0.8, { angularDamping: 0.3 }); e.s = 0.8; e.hp = 1.3; break;
    case 'seesaw': {
      e.body = dynBody(G, o.x, o.y + 1.0, pl.Box(3.5, 0.13), 45, 7 * 0.26, 0.9);
      w.createJoint(pl.RevoluteJoint({ enableLimit: true, lowerAngle: -0.5, upperAngle: 0.5 }, G.ground, e.body, V(o.x, o.y + 1.0)));
      e.body.setAngle(0.28); break;
    }
    case 'bridge': {
      const dx = o.x2 - o.x, dy = o.y2 - o.y, d = Math.hypot(dx, dy) || 1, n = Math.max(2, Math.round(d / 1.0)), seg = d / n, a = Math.atan2(dy, dx);
      e.planks = []; e.seg = seg; let prev = G.ground;
      for (let i = 0; i < n; i++) {
        const cx = o.x + dx * (i + 0.5) / n, cy = o.y + dy * (i + 0.5) / n - 0.1;
        const b = w.createBody({ type: 'dynamic', position: V(cx, cy), angle: a, linearDamping: 0.3, angularDamping: 1 });
        b.createFixture(pl.Box(seg / 2, 0.1), { density: 28 / (seg * 0.2), friction: 0.9 });
        w.createJoint(pl.RevoluteJoint({}, prev, b, V(o.x + dx * i / n, o.y + dy * i / n - 0.1)));
        e.planks.push(b); prev = b;
      }
      w.createJoint(pl.RevoluteJoint({}, prev, G.ground, V(o.x2, o.y2 - 0.1)));
      break;
    }
    case 'zip': {
      const a = V(o.x, o.y), b = V(o.x2, o.y2), d = V.sub(b, a); e.len = d.length() || 1; e.dir = V(d.x / e.len, d.y / e.len); e.a = a; e.b = b;
      e.trolley = w.createBody({ type: 'static', position: a.clone() });
      e.trolley.createFixture(pl.Circle(0.15), { density: 40, isSensor: true });
      break;
    }
    case 'anchor': break;
    case 'hammer': {
      e.len = 4.4; e.body = w.createBody({ type: 'kinematic', position: V(o.x, o.y) });
      e.body.createFixture(pl.Box(0.09, e.len / 2, V(0, -e.len / 2)), { friction: 0.3 });
      e.body.createFixture(pl.Circle(V(0, -e.len), 0.75), { friction: 0.3 });
      e.ph = o.x * 0.37; break;
    }
    case 'spinner': {
      e.body = w.createBody({ type: 'kinematic', position: V(o.x, o.y + 3.4) });
      e.body.createFixture(pl.Box(3.1, 0.16), { friction: 0.3 }); e.body.setAngle(o.x * 0.5); break;
    }
    case 'lift': case 'ferry': {
      e.base = V(o.x, o.y - 0.2); e.axis = o.t === 'lift' ? V(0, 1) : V(1, 0); e.d = o.t === 'lift' ? 5 : 6;
      e.body = w.createBody({ type: 'kinematic', position: e.base.clone() });
      e.body.createFixture(pl.Box(1.95, 0.2), { friction: 1.2 }); break;
    }
    case 'boost': case 'spring': case 'fan': case 'springboard': case 'launcher': case 'tele': case 'blower': case 'moon': case 'laser': case 'repair': case 'charger': case 'sign': break;
    case 'plate': e.on = false; break;
    case 'convL': case 'convR': G.convs.push({ x0: o.x - 3, x1: o.x + 3, y: o.y, v: o.t === 'convL' ? -4.5 : 4.5 }); break;
    case 'dropper': e.next = 1.5; break;
    case 'ballpit': for (let i = 0; i < 14; i++) { const b = dynBody(G, o.x - 1.6 + (i % 5) * 0.8, o.y + 0.4 + ((i / 5) | 0) * 0.75, pl.Circle(0.36), 1.5, 0.4, 0.3); b.getFixtureList().setRestitution(0.5); G.ents.push({ t: 'ball', o, body: b, hue: (i * 47) % 360 }); } return;
    case 'tnt': e.body = dynBody(G, o.x, o.y + 0.55, pl.Box(0.4, 0.55), 30, 0.88, 0.5); e.s = 0.55; e.hp = 0.05; break;
    case 'glass': e.hw = 0.12; e.hh = 1.5; e.hp = e.max = 0.3; e.cx = o.x; e.cy = o.y + 1.5; e.body = w.createBody({ position: V(e.cx, e.cy) }); e.body.createFixture(pl.Box(e.hw, e.hh), { friction: 0.2 }); break;
    default: return;
  }
  G.ents.push(e);
}
const PLAT_T = 10;
const platU = (t, x) => { const p = ((t + x * 0.13) % PLAT_T) / PLAT_T; let u = p < 0.25 ? p / 0.25 : p < 0.5 ? 1 : p < 0.75 ? 1 - (p - 0.5) / 0.25 : 0; return u * u * (3 - 2 * u); };
function openGate(G, e) {
  e.on = true; let best = null, bd = 1e9;
  for (const g of G.ents) if (g.t === 'gate' && !g.opening) { const d = Math.hypot(g.o.x - e.o.x, g.o.y - e.o.y); if (d < bd) { bd = d; best = g; } }
  if (best) best.opening = true; G.flash = { text: best ? 'Gate open!' : 'Click!', t: 1.2, good: true }; sfx('cp');
}
function updateEnts(G) {
  for (const e of G.ents.slice()) {
    if (e.life != null && ((e.life -= DT) <= 0 || e.body.getPosition().y < -3)) { if (G.bot && G.bot.grab && G.bot.grab.ent === e) G.bot.grab = null; G.world.destroyBody(e.body); G.ents.splice(G.ents.indexOf(e), 1); continue; }
    if (e.t === 'dropper') {
      if ((e.next -= DT) <= 0) { e.next = 4.5; if (G.ents.filter(k => k.life != null).length < 3) G.ents.push({ t: 'boulder', o: { x: e.o.x, y: e.o.y }, s: 0.8, hp: 1.3, life: 14, body: dynBody(G, e.o.x, e.o.y, pl.Circle(0.8), 110, 2, 0.8, { angularDamping: 0.3 }) }); }
    } else if (e.t === 'plate' && !e.on && G.bot) {
      const q = G.bot.chassis.getPosition();
      let on = Math.abs(q.x - e.o.x) < 1.4 && q.y > e.o.y && q.y < e.o.y + 2.6 && G.spec.mass >= 120;
      if (!on) for (const c of G.ents) if (c.t === 'steel' && Math.abs(c.body.getPosition().x - e.o.x) < 1.3 && Math.abs(c.body.getPosition().y - e.o.y) < 1.6) on = true;
      if (on) openGate(G, e);
    }
    if (e.t === 'hammer') { const target = 1.15 * Math.sin(1.7 * G.t + e.ph); e.body.setAngularVelocity((target - e.body.getAngle()) / DT); }
    else if (e.t === 'spinner') e.body.setAngularVelocity(1.3);
    else if (e.t === 'lift' || e.t === 'ferry') {
      const u = platU(G.t, e.o.x) * e.d, p = e.body.getPosition();
      e.body.setLinearVelocity(V((e.base.x + e.axis.x * u - p.x) / DT, (e.base.y + e.axis.y * u - p.y) / DT));
    } else if (e.t === 'gate') {
      if (e.opening && e.open < 1) e.open = Math.min(1, e.open + DT / 0.8);
      const p = e.body.getPosition(); e.body.setLinearVelocity(V(0, (e.base.y + e.open * 4.3 - p.y) / DT));
    } else if (e.t === 'switch' && !e.on && G.bot) {
      const hit = q => Math.hypot(q.x - e.o.x, q.y - e.o.y) < 0.8, b = G.bot, s = G.spec;
      let on = hit(b.chassis.getPosition()) || b.wheels.some(w => Math.hypot(w.getPosition().x - e.o.x, w.getPosition().y - e.o.y) < s.r + 0.5) || G.balls.some(k => hit(k.body.getPosition()));
      if (!on) for (const lx of [-s.ch.len / 2, s.ch.len / 2, s.has.lance ? s.front + 2.1 : 0, s.has.lance ? s.front + 1.2 : 0]) if (hit(b.chassis.getWorldPoint(V(lx, 0.1)))) on = true;
      if (!on) for (const c of G.ents) if (c.s && hit(c.body.getPosition())) on = true;
      if (on) openGate(G, e);
    } else if (e.t === 'zip' && e.returnT > 0) {
      e.returnT -= DT;
      if (e.returnT <= 0 && !(G.bot && G.bot.rope && G.bot.rope.ent === e)) {
        if (e.joint) { G.world.destroyJoint(e.joint); e.joint = null; }
        e.trolley.setType('static'); e.trolley.setTransform(e.a, 0);
      }
    }
  }
}

/* ---------------- Bot ---------------- */
function buildBot(G, x, y) {
  const s = G.spec, c = s.ch, w = G.world, old = G.bot;
  const wy = -(c.ht / 2 - 0.1);                      // wheel axle height in chassis space
  const cy = y + s.r + 0.08 - wy;
  const chassis = w.createBody({ type: 'dynamic', position: V(x, cy), angularDamping: 0.4 });
  const fd = { density: 1, friction: 0.35, filterGroupIndex: -1, userData: { chassis: 1 } };
  chassis.createFixture(pl.Box(c.len / 2, c.ht / 2), fd);
  const bot = { chassis, wheels: [], joints: [], rope: null, fuel: 3, energy: old ? old.energy : s.energy, jumpCd: 0, rightCd: 0, springCd: 0, flipT: 0, wet: 0, deadT: 0, touch: false, wy, tq: [0, 0], righting: 0, ammo: 6, fireCd: 0, vaultCd: 0, vaultT: 0, grab: null, cut: null, hp: s.hp, safe: 1, airT: 0, vyH: [], landCd: 0, gas: 6, shields: 3, shieldT: 0, zapCd: 0, teleCd: 0, sledgeT: -1, hurtT: 0 };
  if (s.has.blade) {
    const bx = Math.max(c.len / 2, s.wheelDX + s.r) + 0.14, lo = wy - s.r + 0.16, hi = c.ht / 2 + 0.25;
    chassis.createFixture(pl.Box(0.1, (hi - lo) / 2, V(bx, (hi + lo) / 2)), Object.assign({}, fd, { friction: 0.15, filterMaskBits: 0xFFFD }));
    bot.blade = { x: bx, lo, hi };
  }
  if (s.has.lance) chassis.createFixture(pl.Box(1.1, 0.05, V(s.front + 1.0, 0.1)), Object.assign({}, fd, { friction: 0.2, filterMaskBits: 0xFFFD }));
  if (s.has.wbar) chassis.createFixture(pl.Circle(V(-(s.wheelDX + s.r + 0.45), wy - s.r + 0.3), 0.13), Object.assign({}, fd, { friction: 0.02 }));
  chassis.setMassData({ mass: s.bodyMass, center: V(0, s.comY), I: s.bodyMass * (c.len * c.len + c.ht * c.ht) / 12 * 1.3 });
  for (const sx of [-1, 1]) {
    const wb = w.createBody({ type: 'dynamic', position: V(x + sx * s.wheelDX, y + s.r + 0.08), angularDamping: 0.05 });
    const ud = { wheel: 1, ground: false, mat: 0, nx: 0, ny: 0 };
    wb.createFixture(pl.Circle(s.r), { density: s.wheelMass / (Math.PI * s.r * s.r), friction: s.mu, restitution: 0.05, filterGroupIndex: -1, userData: ud });
    wb.ud = ud;
    bot.joints.push(w.createJoint(pl.WheelJoint({ enableMotor: true, maxMotorTorque: 10, motorSpeed: 0, frequencyHz: 5.5, dampingRatio: 0.8 }, chassis, wb, wb.getPosition(), V(0, 1))));
    bot.wheels.push(wb);
  }
  G.bot = bot;
}
function destroyBot(G) {
  const b = G.bot; if (!b) return;
  releaseHook(G);
  G.world.destroyBody(b.chassis); b.wheels.forEach(w => G.world.destroyBody(w));
}
function respawnBot(G, why) {
  if (G.done) return;
  if (why) { G.stats[why] = (G.stats[why] || 0) + 1; }
  G.penalties += RESET_PENALTY; G.resets++;
  destroyBot(G);
  const e = G.respawn.energy;
  buildBot(G, G.respawn.x, G.respawn.y);
  if (e != null) G.bot.energy = e;
  G.live = {};
  G.flash = { text: ({ smashed: 'Smashed to bits!', fell: 'Fell off the course!', sank: 'Sank! No floats.', burned: 'Too hot! Melted in lava.', flip: 'Back on your wheels.' }[why] || 'Reset') + `  +${RESET_PENALTY}s`, t: 2.2 };
  sfx('bad');
}
const botBodies = b => [b.chassis, b.wheels[0], b.wheels[1]];
function setVel(bot, vx, vy) { bot.vyH.length = 0; for (const b of botBodies(bot)) b.setLinearVelocity(V(vx, vy)); bot.chassis.setAngularVelocity(0); }
function hurt(G, amt) {
  const b = G.bot, s = G.spec; if (!G.dmgOn || G.done || b.shieldT > 0 || b.safe > 0 || amt < 1) return;
  if (s.has.armor) amt *= 0.5;
  b.hp -= amt; b.hurtT = 0.35; G.flash = { text: `Ouch! −${Math.round(amt)} health`, t: 0.9 }; sfx('bad');
  const p = b.chassis.getPosition(); for (let i = 0; i < 8; i++) G.parts.push({ x: p.x, y: p.y, vx: (Math.random() - .5) * 7, vy: Math.random() * 6, life: 0.5, max: 0.5, c: i % 2 ? '#ffc21a' : '#8d99a8', r: 0.12 });
  if (b.hp <= 0) b.smashed = true;
}
function explode(G, q) {
  for (let i = 0; i < 34; i++) { const a = Math.random() * 6.283, sp = 3 + Math.random() * 9; G.parts.push({ x: q.x, y: q.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.7, max: 0.7, c: ['#ffb020', '#ff5a20', '#5b6470'][i % 3], r: 0.3 }); }
  G.flash = { text: 'BOOM!', t: 0.8 }; sfx('bad');
  for (const e of G.ents.slice()) {
    if (!e.body || G.ents.indexOf(e) < 0) continue;
    const c = e.hw ? V(e.cx, e.cy) : e.body.getPosition(), d = Math.max(0, V.distance(c, q) - (e.hw ? e.hh : 0));
    if (d < 3.6 && (e.hw || e.t === 'crate' || e.t === 'tnt' || e.t === 'boulder')) breakEnt(G, e);
    else if (d < 6 && e.body.isDynamic()) { const f = 900 * (1 - d / 6) / Math.max(d, 0.5); e.body.applyLinearImpulse(V((c.x - q.x) * f, (c.y - q.y) * f + 200), e.body.getWorldCenter(), true); }
  }
  const b = G.bot, p = b.chassis.getPosition(), d = V.distance(p, q);
  if (d < 5) { hurt(G, 12 + 40 * (1 - d / 5)); kick(b, (p.x - q.x) / Math.max(d, 0.5) * 6 * (1 - d / 5), 5 * (1 - d / 5)); }
}
function kick(bot, dvx, dvy) { bot.vyH.length = 0; for (const b of botBodies(bot)) { const v = b.getLinearVelocity(); b.setLinearVelocity(V(v.x + dvx, v.y + dvy)); } }
const hookMount = (G) => G.bot.chassis.getWorldPoint(V(0, G.spec.ch.ht / 2 + 0.3));

function findHookTarget(G) {
  const m = hookMount(G); let best = null, bd = HOOK_RANGE;
  for (const e of G.ents) {
    if (e.t !== 'anchor' && e.t !== 'zip') continue;
    const p = e.t === 'zip' ? e.trolley.getPosition() : V(e.o.x, e.o.y);
    if (e.t === 'zip' && e.returnT > 0) continue;
    const d = V.distance(m, p); if (d >= bd || d < 0.3) continue;
    let blocked = false;
    G.world.rayCast(m, p, (fx) => { const u = fx.getUserData(); if (u && u.terrain) { blocked = true; return 0; } return -1; });
    if (!blocked) { best = { e, p, d }; bd = d; }
  }
  return best;
}
function releaseHook(G) {
  const b = G.bot; if (!b || !b.rope) return;
  G.world.destroyJoint(b.rope.joint);
  if (b.rope.ent.t === 'zip') b.rope.ent.returnT = 1.4;
  b.rope = null;
}
function toggleHook(G) {
  const b = G.bot;
  if (b.rope) { releaseHook(G); sfx('click'); return; }
  const tg = findHookTarget(G); if (!tg) return;
  const e = tg.e, la = V(0, G.spec.ch.ht / 2 + 0.3);
  let other = G.ground, lb = tg.p.clone();
  if (e.t === 'zip') {
    e.trolley.setType('dynamic');
    e.joint = G.world.createJoint(pl.PrismaticJoint({ enableLimit: true, lowerTranslation: 0, upperTranslation: e.len }, G.ground, e.trolley, e.a, e.dir));
    other = e.trolley; lb = V(0, 0);
  }
  const joint = G.world.createJoint(pl.RopeJoint({ bodyA: b.chassis, bodyB: other, localAnchorA: la, localAnchorB: lb, maxLength: tg.d + 0.05, collideConnected: true }));
  b.rope = { joint, ent: e, len: tg.d + 0.05 }; sfx('hook');
}

/* ---------------- Step ---------------- */
function stepGame(G, inp) {
  const bot = G.bot, s = G.spec, st = G.stats; let ch = bot.chassis;
  G.t += DT;
  if (!G.started && (inp.x || inp.jump || inp.boost || inp.hook)) G.started = true;
  if (G.started && !G.done) G.clock += DT;
  if (G.flash && (G.flash.t -= DT) <= 0) G.flash = null;
  updateEnts(G);
  if (inp.reset && !G.done) { respawnBot(G, 'manual'); return; }

  const alive = bot.energy > 0 && !G.done, thr = alive ? inp.x : 0;
  const p = ch.getPosition(), v = ch.getLinearVelocity(), ang = ch.getAngle(), sp = v.length();
  const fwd = V(Math.cos(ang), Math.sin(ang)), up = V(-fwd.y, fwd.x);
  const grounded = bot.wheels.some(w => w.ud.ground);
  const nd = s.awd ? 2 : 1;
  bot.joints.forEach((j, i) => {
    const driven = s.awd || i === 0;
    // all-wheel drive shares one motor: a wheel with no grip leaves its torque for the other
    if (thr && driven) { j.enableMotor(true); j.setMotorSpeed(-thr * s.w); const lim = s.awd ? Math.max(s.T / 2, s.T - bot.tq[1 - i]) : s.T, over = -bot.wheels[i].getAngularVelocity() * thr > s.w * 1.03; j.setMaxMotorTorque(over ? lim * 0.1 : lim); }   // coast when pushed past top speed
    else if (!thr) { j.enableMotor(true); j.setMotorSpeed(0); j.setMaxMotorTorque(alive || G.done ? s.T * 0.12 + 12 : 3); }
    else j.enableMotor(false);
  });
  // drag, mud
  ch.applyForceToCenter(V(-0.3 * sp * v.x, -0.3 * sp * v.y), true);
  let mud = 0, sand = 0; for (const w of bot.wheels) if (w.ud.ground) { if (w.ud.mat === MUD) mud++; else if (w.ud.mat === SAND) sand++; }
  if ((mud || sand) && sp > 0.02) { const F = (mud * 90 / s.r + sand * 1.7 * s.mass) * s.soft * clamp(sp / 0.5, 0, 1); ch.applyForceToCenter(V(-F * v.x / sp, -F * v.y / sp), true); if (Math.random() < 0.3 && sp > 1) puff(G, bot.wheels[0].getPosition(), '#3d2b1c', 1); }
  // gadgets
  bot.jumpCd -= DT; bot.rightCd -= DT; bot.springCd -= DT;
  if (alive && inp.boost && s.has.rocket && bot.fuel > 0) {
    bot.fuel -= DT; ch.applyForceToCenter(V(fwd.x * 1700, fwd.y * 1700), true);
    const back = ch.getWorldPoint(V(-s.ch.len / 2 - 0.3, 0.05)); G.parts.push({ x: back.x, y: back.y, vx: v.x - fwd.x * 6 + (Math.random() - .5) * 2, vy: v.y - fwd.y * 6 + (Math.random() - .5) * 2, life: 0.35, max: 0.35, c: Math.random() < 0.5 ? '#ffb020' : '#ff5a20', r: 0.22 });
    bot.boosting = true;
  } else bot.boosting = false;
  if (alive && inp.jump && s.has.jump && bot.jumpCd <= 0 && (grounded || bot.touch)) {
    const dv = Math.min(11, 620 / s.mass); kick(bot, up.x * dv, Math.max(up.y, 0.3) * dv); bot.jumpCd = 1.1; bot.energy -= 1; sfx('jump');
    for (let i = 0; i < 6; i++) puff(G, V(p.x + (Math.random() - .5) * 1.5, p.y - s.r - 0.2), '#d8d2c4', 2);
  }
  if (alive && inp.right && s.has.righter && bot.rightCd <= 0 && Math.abs(normAng(ang)) > 0.9) {
    kick(bot, 0, 6); bot.rightCd = 1.6; bot.righting = 1.1; sfx('jump');
  }
  if (bot.righting > 0) { bot.righting -= DT; const I = ch.getInertia() + s.wheelMass * 2 * s.wheelDX * s.wheelDX; ch.applyTorque(I * (-normAng(ang) * 34 - ch.getAngularVelocity() * 8), true); }
  if (s.has.wing && !grounded && !bot.rope) {
    ch.applyForceToCenter(V(0, Math.min(0.92 * s.mass * 10, 4.5 * v.x * v.x)), true);
    ch.applyTorque(-normAng(ang) * 400 - ch.getAngularVelocity() * 90, true);
  }
  if (s.has.hook) {
    if (inp.hook && !G.done) toggleHook(G);
    if (bot.rope) {
      const r = bot.rope; let L = r.len;
      if (r.ent.t === 'zip') L = Math.max(2.2, L - 5 * DT);
      else if (inp.up && alive) { L = Math.max(1.3, L - 2.8 * DT); bot.energy -= s.mass * 10 * 2.8 * DT / 1000; }
      else if (inp.down) L = Math.min(HOOK_RANGE + 2, L + 3.5 * DT);
      if (L !== r.len) { r.len = L; r.joint.setMaxLength(L); ch.setAwake(true); }
      if (thr && !grounded) ch.applyForceToCenter(V(thr * s.mass * 5, 0), true);   // pump the swing
    }
  }
  // zones
  for (const e of G.ents.slice()) {
    const o = e.o;
    if (e.t === 'boost') { if (Math.abs(p.x - o.x) < 1.6 && p.y > o.y - 0.5 && p.y < o.y + 2.5) { ch.applyForceToCenter(V(2800, 0), true); if (Math.random() < 0.4) puff(G, V(p.x - 1, p.y - 0.3), '#ffe36b', 1); } }
    else if (e.t === 'fan') { if (Math.abs(p.x - o.x) < 1.7 && p.y > o.y && p.y < o.y + 9) ch.applyForceToCenter(V(0, (s.has.wing ? 2200 : 1400) * (1 - (p.y - o.y) / 9 * 0.6)), true); }
    else if (e.t === 'spring' && bot.springCd <= 0) {
      for (const w of bot.wheels) { const q = w.getPosition(); if (Math.abs(q.x - o.x) < 1.0 && q.y - s.r < o.y + 0.4 && q.y - s.r > o.y - 0.6) { const vy = v.y; kick(bot, thr > 0 ? clamp(3 - v.x, 0, 3) : 0, Math.min(13, 1500 / s.mass) - Math.min(0, vy)); bot.springCd = 0.6; e.pop = 0.3; sfx('jump'); break; } }
    }
    else if (e.t === 'springboard' && bot.springCd <= 0) { if (Math.abs(p.x - o.x) < 1.3 && p.y > o.y - 0.5 && p.y < o.y + 2.6 && (grounded || bot.touch)) { setVel(bot, 7, 8.5); bot.springCd = 0.8; e.pop = 0.3; sfx('jump'); } }
    else if (e.t === 'launcher' && bot.springCd <= 0) { if (Math.abs(p.x - o.x) < 1.1 && p.y > o.y - 0.5 && p.y < o.y + 2.6) { setVel(bot, 10, 14); bot.springCd = 0.8; e.pop = 0.4; sfx('bad'); for (let i = 0; i < 10; i++) puff(G, V(o.x, o.y + 1), '#d8d2c4', 1); } }
    else if (e.t === 'tele' && bot.teleCd <= 0) {
      if (Math.hypot(p.x - o.x, p.y - o.y) < 1.4) {
        releaseHook(G); if (bot.grab) { G.world.destroyJoint(bot.grab.joint); bot.grab = null; }
        const dx = o.x2 - o.x, dy = o.y2 - o.y; for (const b of botBodies(bot)) { const q = b.getPosition(); b.setTransform(V(q.x + dx, q.y + dy), b.getAngle()); }
        bot.teleCd = 1.5; bot.airT = 0; sfx('cp'); for (let i = 0; i < 12; i++) puff(G, V(o.x2, o.y2), '#b46bff', 1);
      }
    }
    else if (e.t === 'blower') { if (p.x > o.x - 10.5 && p.x < o.x - 0.5 && p.y > o.y - 0.5 && p.y < o.y + 5) ch.applyForceToCenter(V(-650, 0), true); }
    else if (e.t === 'moon') { if (Math.abs(p.x - o.x) < 6 && p.y > o.y && p.y < o.y + 12) ch.applyForceToCenter(V(0, s.mass * 7), true); }
    else if (e.t === 'laser') { e.on = ((G.t + o.x * 0.37) % 3.4) < 1.4; if (e.on && bot.zapCd <= 0 && Math.abs(p.x - o.x) < s.ch.len / 2 + 0.1 && p.y > o.y - 0.3 && p.y < o.y + 5.5) { hurt(G, 35); kick(bot, -4, 0); bot.zapCd = 1; } }
    else if (e.t === 'repair') { if (Math.abs(p.x - o.x) < 1.5 && p.y > o.y - 0.5 && p.y < o.y + 2.5) bot.hp = Math.min(s.hp, bot.hp + 60 * DT); }
    else if (e.t === 'charger') { if (Math.abs(p.x - o.x) < 1.5 && p.y > o.y - 0.5 && p.y < o.y + 2.5 && bot.energy > 0) bot.energy = Math.min(s.energy, bot.energy + 50 * DT); }
    else if (e.t === 'glass') { if (Math.abs(v.x) >= 7 && Math.abs(e.cx - p.x) < s.front + 0.45 + Math.abs(v.x) * DT * 2 && Math.abs(p.y - e.cy) < 2.3) breakEnt(G, e); }
    else if (e.t === 'tnt') { if (sp > 9 && V.distance(e.body.getPosition(), p) < s.front + 0.9) breakEnt(G, e); }
    if (e.pop > 0) e.pop -= DT;
  }
  // water, lava, pit
  const tile = tget(G.course, Math.floor(p.x), Math.floor(p.y));
  if (tile === WATER) {
    if (s.has.floats) {
      let sy = Math.floor(p.y); while (tget(G.course, Math.floor(p.x), sy + 1) === WATER) sy++;
      const depth = sy + 1 - p.y;
      ch.applyForceToCenter(V(thr * 950 - v.x * s.mass * 0.9, s.mass * 10 * clamp(depth + 0.6, 0, 1.7) * 1.25 - v.y * s.mass * 3.5), true);
      ch.applyTorque(-normAng(ang) * 300 - ch.getAngularVelocity() * 80, true);
      if (thr && Math.random() < 0.4) puff(G, V(p.x - thr, sy + 1), '#cfeaff', 2);
    } else {
      ch.applyForceToCenter(V(-v.x * s.mass * (s.has.snorkel ? 1.2 : 4), -v.y * s.mass * (s.has.snorkel ? 0.5 : 2)), true);
      if (s.has.snorkel) { if (Math.random() < 0.15) G.parts.push({ x: p.x - 0.4, y: p.y + 0.9, vx: 0, vy: 1.5, life: 0.8, max: 0.8, c: '#e6f6ff', r: 0.08 }); }
      else if ((bot.wet += DT) > 0.8) { respawnBot(G, 'sank'); return; }
    }
  } else bot.wet = 0;
  for (const b of botBodies(bot)) { const q = b.getPosition(); if (tget(G.course, Math.floor(q.x), Math.floor(q.y - (b === ch ? 0 : s.r * 0.6))) === LAVA) { respawnBot(G, 'burned'); return; } }
  if (p.y < -3 || p.x < -5 || p.x > G.course.w + 5) { respawnBot(G, 'fell'); return; }

  useGadgets(G, inp, alive, thr, grounded, fwd, up, v);
  bot.chuteOn = s.has.chute && !grounded && !bot.rope && v.y < -6.5;
  if (bot.chuteOn) ch.applyForceToCenter(V(-v.x * s.mass * 0.3, s.mass * 10 + (-v.y - 6) * s.mass * 4), true);
  const v0 = ch.getLinearVelocity().clone();
  for (const w of bot.wheels) { w.ud.wasGround = w.ud.ground; w.ud.ground = false; w.ud.nx = w.ud.ny = 0; w.ud.has = false; }
  bot.touch = false;
  G.world.step(DT, 8, 4);
  // damage: hard landings and hard hits
  bot.safe -= DT; bot.landCd -= DT; bot.hurtT -= DT;
  { const v1 = ch.getLinearVelocity(), H = bot.vyH, lim = s.has.shocks ? 14 : 10;
    // a landing = most of the downward speed vanishing within 0.15 s
    H.push(v1.y); if (H.length > 9) H.shift();
    if (H[0] < -5 && v1.y > H[0] * 0.4) { if (H[0] < -lim && !bot.rope && tile !== WATER && !bot.wheels.some(w => w.ud.mat === RUBBER && w.ud.ground)) hurt(G, (-H[0] - lim) * 16 * (s.has.shocks ? 0.6 : 1)); H.length = 0; bot.landCd = 0.3; }
    const dv = Math.hypot(v1.x - v0.x, v1.y - v0.y); if (dv > 7.5 && bot.landCd <= 0 && !bot.rope) { hurt(G, (dv - 7.5) * 7); H.length = 0; }
    if (bot.smashed) { respawnBot(G, 'smashed'); return; } }

  // battery
  let P = 0; bot.joints.forEach((j, i) => { const tq = Math.abs(j.getMotorTorque(1 / DT)); bot.tq[i] = tq; P += tq * Math.abs(j.getJointSpeed()); });
  if (thr) bot.energy -= Math.max(P, 150) * s.eff * DT / 1000;
  if (s.has.solar && bot.energy > 0) bot.energy = Math.min(s.energy, bot.energy + 1.2 * DT);
  if (bot.energy <= 0 && !G.done) { bot.energy = 0; st.dead = true; if (sp < 0.4) bot.deadT += DT; else bot.deadT = 0; if (bot.deadT > 1.6) { G.done = { win: false, why: 'battery' }; } }
  // coaching signals
  const live = G.live = { stall: false, slip: false, flipped: false, speed: sp, load: 0 };
  if (thr) {
    const ws = -bot.wheels[0].getAngularVelocity() * s.r, vf = v.x * fwd.x + v.y * fwd.y;
    live.load = clamp((bot.tq[0] + (s.awd ? bot.tq[1] : 0)) / s.T, 0, 1);
    if (Math.abs(ws) < 0.7 && Math.abs(vf) < 0.4 && !bot.rope && !bot.cut) { live.stall = true; st.stall += DT; }
    else if (bot.wheels[0].ud.ground && Math.abs(ws - vf) > 3) { live.slip = true; st.slip += DT; if (Math.random() < 0.5) puff(G, V(bot.wheels[0].getPosition().x, bot.wheels[0].getPosition().y - s.r), '#c9b79c', 1); }
  }
  st.maxSpeed = Math.max(st.maxSpeed, sp);
  if (Math.abs(normAng(ang)) > 1.9 && sp < 1.5 && !bot.rope) { bot.flipT += DT; if (bot.flipT > 1) { live.flipped = true; if (!bot.flipCounted) { bot.flipCounted = true; st.flips++; } } }
  else { bot.flipT = 0; bot.flipCounted = false; }
  // checkpoints and finish
  for (const cp of G.cps) if (!cp.hit && Math.abs(p.x - cp.x) < 1.6 && p.y > cp.y - 1 && p.y < cp.y + 8) { cp.hit = true; G.respawn = { x: cp.x, y: cp.y, energy: bot.energy }; G.flash = { text: 'Checkpoint!', t: 1.2, good: true }; sfx('cp'); }
  if (G.finish && !G.done && Math.abs(p.x - G.finish.x) < 1.8 && p.y > G.finish.y - 1 && p.y < G.finish.y + 8) { G.done = { win: true, time: G.clock + G.penalties }; sfx('win'); }
  live.target = s.has.hook && !bot.rope ? findHookTarget(G) : null;
  // particles
  for (let i = G.parts.length - 1; i >= 0; i--) { const q = G.parts[i]; q.x += q.vx * DT; q.y += q.vy * DT; if ((q.life -= DT) <= 0) G.parts.splice(i, 1); }
}
/* Tools and extra gadgets */
const TOOLS = { saw: { y: 0, reach: 0.55, dmg: { woodwall: 1, crate: 1, tnt: 1 }, c: '#e9c58f' }, drill: { y: -0.12, reach: 0.6, dmg: { stone: 1, iceblock: 1.4, boulder: 1, woodwall: 0.3, glass: 1, tnt: 1 }, c: '#b9b2a8' }, torch: { y: 0.18, reach: 1.1, dmg: { iceblock: 1, woodwall: 0.45, crate: 0.5, tnt: 1 }, c: '#ffb020' } };
const SLEDGE = { crate: 1, glass: 1, tnt: 1, woodwall: 0.6, iceblock: 0.6, stone: 0.45, boulder: 0.7 };
const toolHit = (e, tip, reach) => { const q = e.body.getPosition(); return e.hw ? Math.abs(tip.x - e.cx) < e.hw + reach + 0.15 && Math.abs(tip.y - e.cy) < e.hh + 0.4 : Math.hypot(tip.x - q.x, tip.y - q.y) < e.s + reach + 0.25; };
function breakEnt(G, e) {
  const i = G.ents.indexOf(e); if (i < 0) return;
  const q = e.body.getPosition(), col = { woodwall: '#c8924f', crate: '#c8924f', iceblock: '#cfeeff', stone: '#8a857e', boulder: '#8a857e', glass: '#d9f3ff', tnt: '#d0342c' }[e.t];
  for (let k = 0; k < 16; k++) G.parts.push({ x: q.x + (Math.random() - .5) * (e.hw || 0.5) * 2, y: q.y + (Math.random() - .5) * (e.hh || 0.5) * 2, vx: (Math.random() - .3) * 6, vy: Math.random() * 6, life: 0.8, max: 0.8, c: col, r: 0.2 });
  if (G.bot.grab && G.bot.grab.ent === e) G.bot.grab = null;
  G.world.destroyBody(e.body); G.ents.splice(i, 1); sfx('bad');
  if (e.t === 'tnt') explode(G, q.clone());
}
function useGadgets(G, inp, alive, thr, grounded, fwd, up, v) {
  const bot = G.bot, s = G.spec, ch = bot.chassis, w = G.world;
  bot.fireCd -= DT; bot.vaultCd -= DT; bot.vaultT -= DT; bot.cut = null; bot.propOn = false; bot.magOn = false;
  // cutting tools work on contact
  for (const id in TOOLS) if (s.has[id] && alive) {
    const T = TOOLS[id], tip = ch.getWorldPoint(V(s.front + T.reach, T.y));
    for (const e of G.ents.slice()) {
      const rate = T.dmg[e.t]; if (!rate) continue;
      if (!toolHit(e, tip, T.reach)) continue;
      e.hp -= rate * DT; bot.energy -= 1.5 * DT; bot.cut = id;
      if (Math.random() < 0.6) G.parts.push({ x: tip.x, y: tip.y, vx: -fwd.x * 3 + (Math.random() - .5) * 5, vy: Math.random() * 5, life: 0.35, max: 0.35, c: T.c, r: 0.1 });
      if (e.hp <= 0) breakEnt(G, e);
    }
  }
  if (alive && inp.fire && s.has.cannon && bot.ammo > 0 && bot.fireCd <= 0) {
    const m = ch.getWorldPoint(V(s.front + 0.5, 0.28)), b = w.createBody({ type: 'dynamic', position: m, bullet: true });
    b.createFixture(pl.Circle(0.2), { density: 48, friction: 0.4, restitution: 0.3, filterGroupIndex: -1 });
    b.setLinearVelocity(V(v.x + fwd.x * 26, v.y + fwd.y * 26)); G.balls.push({ body: b, life: 5 });
    kick(bot, -fwd.x * 150 / s.mass, -fwd.y * 150 / s.mass); bot.ammo--; bot.fireCd = 0.45; sfx('bad'); puff(G, m, '#d8d2c4', 4);
  }
  for (let i = G.balls.length - 1; i >= 0; i--) {
    const k = G.balls[i], q = k.body.getPosition(), bv = k.body.getLinearVelocity();
    if (bv.length() > 5) for (const e of G.ents.slice()) if ((e.t === 'tnt' || e.t === 'glass') && toolHit(e, q, 0.1)) { breakEnt(G, e); break; }
    if (bv.length() > 7) for (const e of G.ents.slice()) if (e.t === 'woodwall' && Math.abs(q.x - e.cx) < e.hw + 0.3 && Math.abs(q.y - e.cy) < e.hh + 0.3) { e.hp -= 0.6; k.body.setLinearVelocity(V(bv.x * 0.2, bv.y * 0.2)); if (e.hp <= 0) breakEnt(G, e); break; }
    if ((k.life -= DT) <= 0 || q.y < -3) { w.destroyBody(k.body); G.balls.splice(i, 1); }
  }
  if (alive && inp.vault && s.has.vault && bot.vaultCd <= 0 && (grounded || bot.touch)) {
    const dv = Math.min(10.5, 760 / s.mass); kick(bot, dv * 0.72, dv * 0.78); bot.vaultCd = 1.4; bot.vaultT = 0.35; bot.energy -= 1; sfx('jump');
  }
  if (inp.grab && s.has.claw) {
    if (bot.grab) { w.destroyJoint(bot.grab.joint); bot.grab = null; sfx('click'); }
    else {
      const cp = ch.getWorldPoint(V(s.front + 0.45, 0)); let best = null, bd = 9;
      for (const e of G.ents) if (e.s) { const d = V.distance(e.body.getPosition(), cp) - e.s; if (d < 0.9 && d < bd) { bd = d; best = e; } }
      if (best) { const b = best.body, q = b.getPosition(); b.setTransform(V(q.x, q.y + 0.35), b.getAngle()); bot.grab = { ent: best, joint: w.createJoint(pl.WeldJoint({}, ch, b, cp)) }; sfx('hook'); }
    }
  }
  if (alive && inp.magnet && s.has.magnet) {
    bot.magOn = true; bot.energy -= 0.6 * DT; const m = ch.getWorldPoint(V(s.front, 0));
    for (const e of G.ents) if (e.t === 'steel') { const q = e.body.getPosition(), d = V.distance(q, m); if (d < 6.5 && d > 0.9) { const f = 1500 / d; e.body.applyForceToCenter(V((m.x - q.x) * f, (m.y - q.y) * f), true); ch.applyForceToCenter(V((q.x - m.x) * f * 0.5, (q.y - m.y) * f * 0.5), true); } }
  }
  if (alive && inp.prop && s.has.prop) {
    bot.propOn = true; bot.energy -= s.mass * 0.09 * DT; ch.applyForceToCenter(V(thr * 250, s.mass * 14 * clamp(1 - (v.y - 2.5) / 3, 0, 1)), true);
    ch.applyTorque(-normAng(ch.getAngle()) * 300 - ch.getAngularVelocity() * 80, true);
  }
  if (alive && inp.climb && s.has.suction) {
    bot.energy -= 0.8 * DT;
    for (const wb of bot.wheels) { const u = wb.ud, n = Math.hypot(u.nx, u.ny); if (n > 0.01) { const F = 1.3 * s.mass * 10; wb.applyForceToCenter(V(-u.nx / n * F, -u.ny / n * F), true); } }
    // cresting a ledge: one wheel still on the wall, the other already past the top
    const [r0, f0] = bot.wheels.map(wb => wb.ud), onWall = u => u.has && Math.abs(u.nx) > 0.5;
    if (onWall(r0) && !f0.has) { ch.applyTorque(-s.mass * 30, true); ch.applyForceToCenter(V(-r0.nx * s.mass * 5, s.mass * 3), true); }
  }
  bot.sledgeT -= DT; bot.shieldT -= DT; bot.zapCd -= DT; bot.teleCd -= DT; bot.balOn = false;
  const sp2 = v.length();
  if (s.has.gyro && !grounded && !bot.rope) ch.applyTorque(-normAng(ch.getAngle()) * 350 - ch.getAngularVelocity() * 90, true);
  if (s.has.spoiler && grounded) ch.applyForceToCenter(V(0, -Math.min(1.2 * s.mass * 10, 2.2 * sp2 * sp2)), true);
  if (alive && inp.sledge && s.has.sledge && bot.sledgeT <= -0.3) {
    bot.sledgeT = 0.25; sfx('click'); const tip = ch.getWorldPoint(V(s.front + 0.7, 0.1));
    for (const e of G.ents.slice()) { const d = SLEDGE[e.t]; if (!d || !toolHit(e, tip, 0.8)) continue; e.hp -= d; puff(G, tip, '#e8edf2', 4); if (e.hp <= 0) breakEnt(G, e); }
  }
  if (alive && inp.balloon && s.has.balloon && bot.gas > 0) {
    bot.gas -= DT; bot.balOn = true; ch.applyForceToCenter(V(thr * 120, Math.min(1000, s.mass * 11.5) * clamp(1 - (v.y - 1.5) / 2, 0, 1)), true);
    ch.applyTorque(-normAng(ch.getAngle()) * 300 - ch.getAngularVelocity() * 80, true);
  }
  if (inp.shield && s.has.shield && bot.shields > 0 && bot.shieldT <= 0) { bot.shields--; bot.shieldT = 2.5; sfx('cp'); }
  if (inp.horn && s.has.horn) { G.flash = { text: 'BEEP BEEP!', t: 0.7, good: true }; sfx('horn'); }
}
function puff(G, p, c, n) { for (let i = 0; i < n; i++) G.parts.push({ x: p.x, y: p.y, vx: (Math.random() - .5) * 2, vy: Math.random() * 1.5, life: 0.5, max: 0.5, c, r: 0.16 }); }

/* ---------------- Sound (tiny synth, off by default) ---------------- */
let audioCtx = null, soundOn = false;
function sfx(kind) {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const seq = { jump: [[300, 0], [520, .07]], hook: [[700, 0], [900, .05]], click: [[500, 0]], cp: [[660, 0], [880, .1]], horn: [[392, 0], [392, .18]], win: [[523, 0], [659, .12], [784, .24], [1047, .36]], bad: [[220, 0], [150, .12]] }[kind] || [];
    for (const [f, at] of seq) { const o = audioCtx.createOscillator(), g = audioCtx.createGain(); o.type = 'square'; o.frequency.value = f; const t = audioCtx.currentTime + at; g.gain.setValueAtTime(0.06, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.15); o.connect(g).connect(audioCtx.destination); o.start(t); o.stop(t + 0.16); }
  } catch (e) { }
}

/* ---------------- Drawing ---------------- */
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const f = c => Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt);
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}
function rrect(ctx, x, y, w, h, r) { ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h); }
function wtext(ctx, str, x, y, size, color, align) { ctx.save(); ctx.translate(x, y); ctx.scale(1, -1); ctx.font = `700 ${size}px system-ui,sans-serif`; ctx.textAlign = align || 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = color || '#fff'; ctx.fillText(str, 0, 0); ctx.restore(); }

const SKY = { speed: ['#3aa0ff', '#bfe6ff', '#8fb6d9', '#6f9a6a'], strength: ['#e98a3c', '#ffe1a8', '#b9825a', '#8a6a48'], crazy: ['#3b2a78', '#f08fb0', '#6a4c9c', '#4a3a78'], night: ['#0b1030', '#2a3a78', '#1a2452', '#141c40'], space: ['#05030f', '#2a1048', '#1c0e38', '#120826'], snow: ['#9fc4e8', '#eef6ff', '#d3e3f3', '#b7cfe6'], candy: ['#ff9ed2', '#ffe9a8', '#c79bff', '#8fd8ff'], desert: ['#f0b860', '#ffe9c0', '#d99a50', '#b87838'] };
function drawBackground(ctx, W, H, cam, kind) {
  const k = SKY[kind] || SKY.speed, g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, k[0]); g.addColorStop(1, k[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (kind === 'night' || kind === 'space') { ctx.fillStyle = '#fff'; for (let i = 0; i < 70; i++) { const x = (i * 197.3 - cam.x * 2) % W, y = (i * 89.7) % (H * 0.7); ctx.globalAlpha = 0.3 + (i % 5) * 0.14; ctx.fillRect((x + W) % W, y, 2, 2); } ctx.globalAlpha = 1; }
  ctx.fillStyle = kind === 'space' ? '#c9b8ff' : 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(W * 0.8, H * 0.2, Math.min(W, H) * 0.06, 0, 7); ctx.fill();
  for (let layer = 0; layer < 2; layer++) {
    const par = layer ? 0.25 : 0.1, base = H * (layer ? 0.72 : 0.6), amp = H * (layer ? 0.1 : 0.16), off = cam.x * cam.ppm * par * 0.3;
    ctx.fillStyle = k[2 + layer]; ctx.globalAlpha = layer ? 0.75 : 0.55; ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 24) { const u = (x + off) * (layer ? 0.004 : 0.0022); ctx.lineTo(x, base - amp * (Math.sin(u) * 0.6 + Math.sin(u * 2.3 + layer) * 0.3 + Math.sin(u * 5.1) * 0.1) + (cam.y - 12) * cam.ppm * par * 0.25); }
    ctx.lineTo(W, H); ctx.fill();
  }
  ctx.globalAlpha = kind === 'space' ? 0 : kind === 'night' ? 0.25 : 0.8; ctx.fillStyle = '#fff';
  for (let i = 0; i < 6; i++) { const x = ((i * 397 - cam.x * cam.ppm * 0.06) % (W + 300) + W + 300) % (W + 300) - 150, y = H * (0.1 + (i * 37 % 30) / 100); ctx.beginPath(); ctx.ellipse(x, y, 60, 16, 0, 0, 7); ctx.ellipse(x + 35, y - 10, 40, 16, 0, 0, 7); ctx.fill(); }
  ctx.globalAlpha = 1;
}

const TILE_COL = [['#8a6240', '#6d4b30'], ['#bfe6fb', '#93cdea'], ['#4a3423', '#3a281a'], ['#f06aa6', '#c94886'], ['#ecd592', '#d2b872']];
const TOP_COL = ['#58c043', '#f4fcff', '#261a10', '#ffb3d6', '#f8ebbd'];
function drawTiles(ctx, course, x0, x1, y0, y1) {
  x0 = Math.max(0, Math.floor(x0)); x1 = Math.min(course.w - 1, Math.ceil(x1)); y0 = Math.max(0, Math.floor(y0)); y1 = Math.min(course.h - 1, Math.ceil(y1));
  const paths = {};
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const t = course.tiles[y * course.w + x], s = tShape(t); if (!s) continue;
    const deep = tShape(tget(course, x, y + 1)) === 1 ? 1 : 0, key = tMat(t) * 2 + deep, P = paths[key] || (paths[key] = new Path2D()), pts = SHAPES[s];
    P.moveTo(x + pts[0][0], y + pts[0][1]); for (let i = 1; i < pts.length; i++) P.lineTo(x + pts[i][0], y + pts[i][1]); P.closePath();
  }
  ctx.lineWidth = 0.04; ctx.lineJoin = 'round';
  for (const k in paths) { ctx.fillStyle = ctx.strokeStyle = TILE_COL[k >> 1][k & 1]; ctx.fill(paths[k]); ctx.stroke(paths[k]); }
}
function drawLiquid(ctx, course, x0, x1, y0, y1, t, which) {
  x0 = Math.max(0, Math.floor(x0)); x1 = Math.min(course.w - 1, Math.ceil(x1)); y0 = Math.max(0, Math.floor(y0)); y1 = Math.min(course.h - 1, Math.ceil(y1));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const c = course.tiles[y * course.w + x]; if (c !== which) continue;
    const surf = tget(course, x, y + 1) !== which;
    if (which === WATER) { ctx.fillStyle = 'rgba(40,130,240,.55)'; ctx.fillRect(x - 0.01, y - 0.01, 1.02, surf ? 0.88 : 1.02); if (surf) { ctx.fillStyle = 'rgba(210,240,255,.8)'; ctx.fillRect(x - 0.01, y + 0.82 + Math.sin(t * 2 + x) * 0.03, 1.02, 0.07); } }
    else { ctx.fillStyle = surf ? `hsl(${22 + Math.sin(t * 3 + x * 1.3) * 8},100%,${52 + Math.sin(t * 4 + x) * 6}%)` : '#c22a08'; ctx.fillRect(x - 0.01, y - 0.01, 1.02, surf ? 0.86 + Math.sin(t * 2.4 + x * 0.9) * 0.05 : 1.02); }
  }
}
function drawFlag(ctx, x, y, kind, on) {
  ctx.strokeStyle = '#e8edf2'; ctx.lineWidth = 0.12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 3.2); ctx.stroke();
  if (kind === 'finish') { for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { ctx.fillStyle = (i + j) % 2 ? '#111' : '#fff'; ctx.fillRect(x + i * 0.4, y + 2 + j * 0.4, 0.4, 0.4); } }
  else { ctx.fillStyle = kind === 'start' ? '#35d07f' : on ? '#35d07f' : '#ff5a36'; ctx.beginPath(); ctx.moveTo(x, y + 3.2); ctx.lineTo(x + 1.3, y + 2.75); ctx.lineTo(x, y + 2.3); ctx.fill(); }
}
function boxPath(ctx, b, hw, hh) { const p = b.getPosition(); ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(b.getAngle()); ctx.beginPath(); ctx.rect(-hw, -hh, hw * 2, hh * 2); }
function drawEnt(ctx, G, e) {
  const o = e.o, t = G.t;
  switch (e.t) {
    case 'start': drawFlag(ctx, o.x - 1.6, o.y, 'start'); break;
    case 'finish': drawFlag(ctx, o.x, o.y, 'finish'); break;
    case 'crate': boxPath(ctx, e.body, .5, .5); ctx.fillStyle = '#c8924f'; ctx.fill(); ctx.strokeStyle = '#7d5526'; ctx.lineWidth = 0.08; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-.5, -.5); ctx.lineTo(.5, .5); ctx.moveTo(-.5, .5); ctx.lineTo(.5, -.5); ctx.stroke(); ctx.restore(); break;
    case 'woodwall': case 'iceblock': case 'stone': {
      const k = e.hp / e.max; ctx.globalAlpha = 0.45 + 0.55 * Math.max(0, k);
      ctx.fillStyle = e.t === 'woodwall' ? '#b98850' : e.t === 'iceblock' ? '#bfe9ff' : '#8a857e'; ctx.strokeStyle = e.t === 'woodwall' ? '#6b4a24' : e.t === 'iceblock' ? '#7fc4e6' : '#55504b'; ctx.lineWidth = 0.07;
      rrect(ctx, e.cx - e.hw, e.cy - e.hh, e.hw * 2, e.hh * 2, e.t === 'stone' ? 0.35 : 0.06); ctx.fill(); ctx.stroke(); ctx.beginPath();
      if (e.t === 'woodwall') for (let y = -1; y <= 1; y++) { ctx.moveTo(e.cx - e.hw, e.cy + y * 0.75); ctx.lineTo(e.cx + e.hw, e.cy + y * 0.75); }
      else if (e.t === 'stone') { ctx.moveTo(e.cx - 0.6, e.cy + 0.5); ctx.lineTo(e.cx - 0.1, e.cy); ctx.lineTo(e.cx - 0.4, e.cy - 0.6); ctx.moveTo(e.cx - 0.1, e.cy); ctx.lineTo(e.cx + 0.6, e.cy + 0.2); }
      else { ctx.moveTo(e.cx - 0.25, e.cy + 1); ctx.lineTo(e.cx + 0.2, e.cy + 0.4); ctx.moveTo(e.cx - 0.2, e.cy - 0.3); ctx.lineTo(e.cx + 0.25, e.cy - 1); }
      ctx.stroke(); ctx.globalAlpha = 1; break;
    }
    case 'gate': { const p = e.body.getPosition(); ctx.fillStyle = '#3b4350'; ctx.fillRect(p.x - 0.3, p.y - 2, 0.6, 4); for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#111' : '#ffc21a'; ctx.fillRect(p.x - 0.3, p.y - 2 + i * 0.5, 0.6, 0.25); } ctx.fillStyle = '#5b6470'; ctx.fillRect(o.x - 0.5, o.y + 4, 1, 0.25); break; }
    case 'switch': ctx.fillStyle = '#3b4350'; ctx.beginPath(); ctx.arc(o.x, o.y, 0.5, 0, 7); ctx.fill(); ctx.fillStyle = e.on ? '#35d07f' : (Math.sin(t * 6) > 0 ? '#ff5a36' : '#c0392b'); ctx.beginPath(); ctx.arc(o.x, o.y, 0.34, 0, 7); ctx.fill(); break;
    case 'glass': ctx.fillStyle = 'rgba(190,235,255,.45)'; ctx.strokeStyle = '#e8f8ff'; ctx.lineWidth = 0.06; ctx.fillRect(e.cx - 0.12, e.cy - 1.5, 0.24, 3); ctx.strokeRect(e.cx - 0.12, e.cy - 1.5, 0.24, 3); ctx.beginPath(); ctx.moveTo(e.cx - 0.08, e.cy + 0.9); ctx.lineTo(e.cx + 0.08, e.cy + 0.3); ctx.stroke(); break;
    case 'tnt': boxPath(ctx, e.body, 0.4, 0.55); ctx.fillStyle = '#d0342c'; ctx.fill(); ctx.strokeStyle = '#7a1f15'; ctx.lineWidth = 0.07; ctx.stroke(); ctx.fillStyle = '#ffe36b'; ctx.fillRect(-0.4, -0.16, 0.8, 0.32); ctx.scale(1, -1); ctx.fillStyle = '#111'; ctx.font = '800 0.28px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('TNT', 0, 0.01); ctx.restore(); break;
    case 'ball': { const p = e.body.getPosition(); ctx.fillStyle = `hsl(${e.hue},85%,60%)`; ctx.beginPath(); ctx.arc(p.x, p.y, 0.36, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(p.x - 0.1, p.y + 0.12, 0.1, 0, 7); ctx.fill(); break; }
    case 'springboard': { const up = e.pop > 0 ? 0.5 : 0; ctx.fillStyle = '#5b6470'; ctx.fillRect(o.x - 1.2, o.y, 0.3, 0.35); ctx.strokeStyle = '#8d99a8'; ctx.lineWidth = 0.08; ctx.beginPath(); for (let i = 0; i <= 4; i++) ctx.lineTo(o.x + 0.7 + (i % 2 ? 0.2 : -0.2), o.y + (0.5 + up) * i / 4); ctx.stroke(); ctx.strokeStyle = '#2ad4c0'; ctx.lineWidth = 0.16; ctx.beginPath(); ctx.moveTo(o.x - 1.2, o.y + 0.35); ctx.lineTo(o.x + 1.2, o.y + 0.55 + up); ctx.stroke(); break; }
    case 'launcher': ctx.save(); ctx.translate(o.x, o.y + 0.7); ctx.fillStyle = '#3b4350'; ctx.beginPath(); ctx.arc(0, 0, 0.75, 0, 7); ctx.fill(); ctx.rotate(0.95); ctx.fillStyle = '#c0392b'; ctx.fillRect(-0.2, -0.75, 2.6 - (e.pop > 0 ? 0.4 : 0), 1.5); ctx.fillStyle = '#ffc21a'; ctx.fillRect(2.1 - (e.pop > 0 ? 0.4 : 0), -0.85, 0.35, 1.7); ctx.restore(); break;
    case 'tele': for (const [qx, qy, hue] of [[o.x, o.y, 275], [o.x2, o.y2, 30]]) { ctx.lineWidth = 0.1; for (let i = 0; i < 3; i++) { ctx.strokeStyle = `hsla(${hue},90%,${55 + i * 12}%,${0.9 - i * 0.25})`; ctx.beginPath(); ctx.ellipse(qx, qy, 0.5 + i * 0.28 + Math.sin(t * 4 + i) * 0.06, 0.9 + i * 0.3, 0, 0, 7); ctx.stroke(); } } break;
    case 'convL': case 'convR': { const dir = e.t === 'convL' ? -1 : 1; ctx.fillStyle = '#2b2f36'; ctx.fillRect(o.x - 3, o.y - 0.12, 6, 0.24); ctx.fillStyle = '#ffc21a'; for (let i = 0; i < 8; i++) { const x = o.x - 3 + ((i * 0.75 + dir * t * 2.2) % 6 + 6) % 6; ctx.beginPath(); ctx.moveTo(x - 0.12 * dir, o.y + 0.1); ctx.lineTo(x + 0.14 * dir, o.y); ctx.lineTo(x - 0.12 * dir, o.y - 0.1); ctx.fill(); } break; }
    case 'blower': { ctx.fillStyle = '#5b6470'; ctx.fillRect(o.x - 0.15, o.y, 0.3, 2.5); ctx.save(); ctx.translate(o.x, o.y + 2.5); ctx.rotate(t * 14); ctx.fillStyle = '#e8edf2'; for (let i = 0; i < 3; i++) { ctx.rotate(2.094); ctx.beginPath(); ctx.ellipse(0, 1.05, 0.28, 1.05, 0, 0, 7); ctx.fill(); } ctx.fillStyle = '#ff5a36'; ctx.beginPath(); ctx.arc(0, 0, 0.25, 0, 7); ctx.fill(); ctx.restore(); ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 0.06; for (let i = 0; i < 6; i++) { const x = o.x - 0.8 - ((t * 9 + i * 1.9) % 9.5), y = o.y + 0.5 + (i * 0.83) % 4.2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 1.1, y); ctx.stroke(); } break; }
    case 'moon': ctx.fillStyle = 'rgba(150,120,255,.14)'; ctx.fillRect(o.x - 6, o.y, 12, 12); ctx.fillStyle = 'rgba(255,255,255,.7)'; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(o.x - 5.5 + (i * 3.37) % 11, o.y + 0.5 + (i * 2.71 + t * 0.6) % 11, 0.06, 0, 7); ctx.fill(); } break;
    case 'laser': ctx.fillStyle = '#3b4350'; ctx.fillRect(o.x - 0.3, o.y, 0.6, 0.3); ctx.fillRect(o.x - 0.3, o.y + 5.2, 0.6, 0.3); if (e.on) { ctx.strokeStyle = 'rgba(255,60,60,.35)'; ctx.lineWidth = 0.4; ctx.beginPath(); ctx.moveTo(o.x, o.y + 0.3); ctx.lineTo(o.x, o.y + 5.2); ctx.stroke(); ctx.strokeStyle = '#ff5050'; ctx.lineWidth = 0.1; ctx.stroke(); } else { ctx.fillStyle = '#ff5050'; ctx.globalAlpha = 0.3 + 0.3 * Math.sin(t * 12); ctx.beginPath(); ctx.arc(o.x, o.y + 0.3, 0.12, 0, 7); ctx.fill(); ctx.globalAlpha = 1; } break;
    case 'dropper': ctx.fillStyle = '#3b4350'; ctx.fillRect(o.x - 1.1, o.y + 0.9, 2.2, 0.6); ctx.fillStyle = '#ffc21a'; for (let i = 0; i < 4; i++) ctx.fillRect(o.x - 1.1 + i * 0.6, o.y + 0.9, 0.3, 0.14); break;
    case 'plate': ctx.fillStyle = e.on ? '#35d07f' : '#ffc21a'; ctx.fillRect(o.x - 1.2, o.y - 0.02, 2.4, e.on ? 0.06 : 0.16); wtext(ctx, '120kg+', o.x, o.y + 0.6, 0.36, e.on ? '#35d07f' : '#ffc21a'); break;
    case 'repair': ctx.fillStyle = '#35d07f'; ctx.fillRect(o.x - 1.3, o.y, 2.6, 0.12); ctx.fillRect(o.x - 0.12, o.y + 1.6, 0.24, 0.8); ctx.fillRect(o.x - 0.4, o.y + 1.88, 0.8, 0.24); ctx.strokeStyle = '#35d07f'; ctx.lineWidth = 0.06; ctx.beginPath(); ctx.arc(o.x, o.y + 2, 0.6, 0, 7); ctx.stroke(); break;
    case 'charger': ctx.fillStyle = '#4d8dff'; ctx.fillRect(o.x - 1.3, o.y, 2.6, 0.12); ctx.fillStyle = '#ffe36b'; ctx.beginPath(); ctx.moveTo(o.x + 0.1, o.y + 2.6); ctx.lineTo(o.x - 0.3, o.y + 2); ctx.lineTo(o.x, o.y + 2); ctx.lineTo(o.x - 0.15, o.y + 1.5); ctx.lineTo(o.x + 0.3, o.y + 2.15); ctx.lineTo(o.x, o.y + 2.15); ctx.fill(); break;
    case 'sign': { const tx = o.txt || 'Hello!', wd = Math.max(1.6, tx.length * 0.26 + 0.5); ctx.fillStyle = '#6b4a24'; ctx.fillRect(o.x - 0.08, o.y, 0.16, 1.6); ctx.fillStyle = '#e9c58f'; ctx.strokeStyle = '#6b4a24'; ctx.lineWidth = 0.07; rrect(ctx, o.x - wd / 2, o.y + 1.4, wd, 0.9, 0.1); ctx.fill(); ctx.stroke(); wtext(ctx, tx, o.x, o.y + 1.85, 0.42, '#3a281a'); break; }
    case 'steel': boxPath(ctx, e.body, .75, .75); ctx.fillStyle = '#8d99a8'; ctx.fill(); ctx.strokeStyle = '#4c5663'; ctx.lineWidth = 0.1; ctx.stroke(); ctx.fillStyle = '#4c5663'; for (const [a, b] of [[-.55, -.55], [.55, -.55], [-.55, .55], [.55, .55]]) { ctx.beginPath(); ctx.arc(a, b, 0.07, 0, 7); ctx.fill(); } ctx.scale(1, -1); ctx.font = '700 0.45px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('160kg', 0, 0); ctx.restore(); break;
    case 'boulder': { const p = e.body.getPosition(); ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(e.body.getAngle()); ctx.fillStyle = '#7f7a74'; ctx.beginPath(); for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283, r = 0.8 * (0.9 + (i * 7 % 3) * 0.05); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#55504b'; ctx.lineWidth = 0.08; ctx.stroke(); ctx.beginPath(); ctx.moveTo(-.3, .2); ctx.lineTo(0, -.1); ctx.lineTo(.35, .1); ctx.stroke(); ctx.restore(); break; }
    case 'seesaw': ctx.fillStyle = '#5b6470'; ctx.beginPath(); ctx.moveTo(o.x - 0.7, o.y); ctx.lineTo(o.x + 0.7, o.y); ctx.lineTo(o.x, o.y + 1); ctx.fill(); boxPath(ctx, e.body, 3.5, .13); ctx.fillStyle = '#d9a441'; ctx.fill(); ctx.strokeStyle = '#8a6420'; ctx.lineWidth = 0.06; ctx.stroke(); ctx.restore(); break;
    case 'bridge': for (const b of e.planks) { boxPath(ctx, b, e.seg / 2 - 0.03, 0.1); ctx.fillStyle = '#b98850'; ctx.fill(); ctx.strokeStyle = '#6b4a24'; ctx.lineWidth = 0.05; ctx.stroke(); ctx.restore(); } break;
    case 'zip': {
      ctx.strokeStyle = '#2b2f36'; ctx.lineWidth = 0.09; ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y); ctx.lineTo(e.b.x, e.b.y); ctx.stroke();
      for (const q of [e.a, e.b]) { ctx.fillStyle = '#5b6470'; ctx.fillRect(q.x - 0.12, q.y - 0.5, 0.24, 0.9); ctx.fillStyle = '#ffc21a'; ctx.beginPath(); ctx.arc(q.x, q.y, 0.2, 0, 7); ctx.fill(); }
      const tp = e.trolley.getPosition(); ctx.fillStyle = '#ff5a36'; rrect(ctx, tp.x - 0.35, tp.y - 0.28, 0.7, 0.4, 0.1); ctx.fill(); ctx.strokeStyle = '#ff5a36'; ctx.lineWidth = 0.08; ctx.beginPath(); ctx.arc(tp.x, tp.y - 0.45, 0.2, 0, Math.PI, true); ctx.stroke(); break;
    }
    case 'anchor': ctx.fillStyle = '#2b2f36'; ctx.beginPath(); ctx.arc(o.x, o.y, 0.38, 0, 7); ctx.fill(); ctx.strokeStyle = '#ffc21a'; ctx.lineWidth = 0.12; ctx.beginPath(); ctx.arc(o.x, o.y, 0.28, 0, 7); ctx.stroke(); break;
    case 'hammer': { const p = e.body.getPosition(); ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(e.body.getAngle()); ctx.fillStyle = '#5b6470'; ctx.fillRect(-0.09, -e.len, 0.18, e.len); ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(0, -e.len, 0.75, 0, 7); ctx.fill(); ctx.strokeStyle = '#7a1f15'; ctx.lineWidth = 0.1; ctx.stroke(); ctx.fillStyle = '#2b2f36'; ctx.beginPath(); ctx.arc(0, 0, 0.25, 0, 7); ctx.fill(); ctx.restore(); break; }
    case 'spinner': { ctx.fillStyle = '#5b6470'; ctx.fillRect(o.x - 0.15, o.y, 0.3, 3.4); boxPath(ctx, e.body, 3.1, .16); ctx.fillStyle = '#ffc21a'; ctx.fill(); ctx.fillStyle = '#111'; for (let i = -3; i < 3; i += 1) ctx.fillRect(i + 0.1, -0.16, 0.45, 0.32); ctx.beginPath(); ctx.arc(0, 0, 0.3, 0, 7); ctx.fillStyle = '#2b2f36'; ctx.fill(); ctx.restore(); break; }
    case 'lift': case 'ferry': boxPath(ctx, e.body, 1.95, .2); ctx.fillStyle = '#4d8dff'; ctx.fill(); ctx.fillStyle = '#ffc21a'; ctx.fillRect(-1.95, 0.12, 3.9, 0.08); ctx.restore(); break;
    case 'boost': ctx.fillStyle = '#ffc21a'; for (let i = 0; i < 3; i++) { const x = o.x - 1.3 + i * 0.9 + ((t * 2) % 0.9) * 0.3; ctx.beginPath(); ctx.moveTo(x, o.y + 0.02); ctx.lineTo(x + 0.45, o.y + 0.02); ctx.lineTo(x + 0.8, o.y + 0.3); ctx.lineTo(x + 0.45, o.y + 0.58); ctx.lineTo(x, o.y + 0.58); ctx.lineTo(x + 0.35, o.y + 0.3); ctx.fill(); } break;
    case 'spring': { const h = 0.3 + (e.pop > 0 ? 0.5 : 0); ctx.strokeStyle = '#8d99a8'; ctx.lineWidth = 0.08; ctx.beginPath(); for (let i = 0; i <= 6; i++) ctx.lineTo(o.x + (i % 2 ? 0.5 : -0.5), o.y + h * i / 6); ctx.stroke(); ctx.fillStyle = '#ff5a36'; ctx.fillRect(o.x - 1, o.y + h, 2, 0.14); break; }
    case 'fan': { ctx.fillStyle = '#3b4350'; ctx.fillRect(o.x - 1.5, o.y, 3, 0.4); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 0.07; for (let i = 0; i < 5; i++) { const x = o.x - 1.2 + i * 0.6, yy = o.y + 0.6 + ((t * 5 + i * 1.7) % 8); ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x, yy + 0.9); ctx.stroke(); } break; }
  }
}

/* ---- paint shop: patterns, eyes, hats, words and pictures ---- */
const PICS = {};
function drawPic(ctx, pic, x, y, size) {
  ctx.save(); ctx.translate(x, y); ctx.scale(1, -1);
  if (pic.startsWith('data:')) { let im = PICS[pic]; if (!im) { im = PICS[pic] = new Image(); im.src = pic; } if (im.complete && im.naturalWidth) ctx.drawImage(im, -size / 2, -size / 2, size, size); }
  else { ctx.font = `${size * 0.85}px system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff'; ctx.fillText(pic, 0, size * 0.06); }
  ctx.restore();
}
function drawBanner(ctx, cfg, L, H, tt) {
  const px = -L * 0.36, top = H / 2 + 1.45, w = 1.3, h = cfg.pic && cfg.words ? 0.95 : 0.72, wave = Math.sin(tt * 5) * 0.05;
  ctx.strokeStyle = '#c9d1db'; ctx.lineWidth = 0.06; ctx.beginPath(); ctx.moveTo(px, H / 2); ctx.lineTo(px, top); ctx.stroke();
  ctx.fillStyle = cfg.color2 || '#20242b'; ctx.strokeStyle = '#e8edf2'; ctx.lineWidth = 0.04;
  ctx.beginPath(); ctx.moveTo(px, top); ctx.lineTo(px - w, top + wave); ctx.lineTo(px - w, top - h + wave); ctx.lineTo(px, top - h); ctx.closePath(); ctx.fill(); ctx.stroke();
  if (cfg.pic) drawPic(ctx, cfg.pic, px - w / 2, top - (cfg.words ? 0.32 : h / 2), cfg.words ? 0.52 : 0.6);
  if (cfg.words) { const fs = Math.min(0.3, (w - 0.14) / (cfg.words.length * 0.56)); wtext(ctx, cfg.words, px - w / 2, top - h + (cfg.pic ? 0.17 : h / 2), fs, '#fff'); }
}
function drawPattern(ctx, cfg, L, H) {
  const p = cfg.pattern; if (!p || p === 'none') return;
  ctx.save(); rrect(ctx, -L / 2, -H / 2, L, H, 0.14); ctx.clip(); ctx.fillStyle = ctx.strokeStyle = cfg.color2 || '#20242b';
  if (p === 'stripes') for (let x = -L / 2 - H; x < L / 2; x += 0.36) { ctx.beginPath(); ctx.moveTo(x, -H / 2); ctx.lineTo(x + 0.16, -H / 2); ctx.lineTo(x + 0.16 + H, H / 2); ctx.lineTo(x + H, H / 2); ctx.fill(); }
  else if (p === 'racing') { ctx.fillRect(-L / 2, H * 0.14, L, H * 0.13); ctx.fillRect(-L / 2, H * 0.32, L, H * 0.06); }
  else if (p === 'flames') for (const [c, k] of [['#ff5a20', 1], ['#ffd23a', 0.6]]) { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-L / 2, -H / 2); for (let i = 0; i <= 6; i++) ctx.lineTo(-L / 2 + L * k * (i % 2 ? 0.6 : 0.22), -H / 2 + H * i / 6); ctx.lineTo(-L / 2, H / 2); ctx.fill(); }
  else if (p === 'dots') for (let x = -L / 2 + 0.15; x < L / 2; x += 0.3) for (let y = -H / 2 + 0.12; y < H / 2; y += 0.22) { ctx.beginPath(); ctx.arc(x + (Math.round(y * 10) % 2) * 0.12, y, 0.055, 0, 7); ctx.fill(); }
  else if (p === 'camo') { ctx.globalAlpha = 0.55; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(-L / 2 + ((i * 0.37) % 1) * L, -H / 2 + ((i * 0.61) % 1) * H, 0.2 + (i % 3) * 0.07, 0.1 + (i % 2) * 0.05, i, 0, 7); ctx.fill(); } }
  else if (p === 'checker') for (let i = 0; i < L / 0.13; i++) for (let j = 0; j < 2; j++) if ((i + j) % 2) ctx.fillRect(-L / 2 + i * 0.13, H / 2 - 0.13 * (j + 1), 0.13, 0.13);
  else if (p === 'zigzag') { ctx.lineWidth = 0.07; ctx.beginPath(); for (let i = 0; i <= L / 0.2; i++) ctx.lineTo(-L / 2 + i * 0.2, H * 0.18 + (i % 2 ? 0.1 : -0.02)); ctx.stroke(); }
  ctx.restore();
}
function drawEyes(ctx, kind, ex, er, lk, dark) {
  if (kind === 'none') return;
  const eyes = kind === 'cyclops' ? [[ex - er * 1.1, er * 1.35]] : [[ex, er], [ex - er * 2.3, er]], k = kind === 'wide' ? 1.25 : 1;
  for (const [x, r] of eyes) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, 0.03, r * k, 0, 7); ctx.fill(); ctx.fillStyle = '#12161c'; ctx.beginPath(); ctx.arc(x + r * 0.4 * lk, 0.03, r * (kind === 'wide' ? 0.3 : 0.5), 0, 7); ctx.fill(); }
  if (kind === 'angry') { ctx.strokeStyle = dark; ctx.lineWidth = er * 0.45; ctx.beginPath(); ctx.moveTo(ex + er, 0.03 + er * 0.7); ctx.lineTo(ex - er * 0.9, 0.03 + er * 1.3); ctx.moveTo(ex - er * 3.3, 0.03 + er * 1.3); ctx.lineTo(ex - er * 1.4, 0.03 + er * 0.7); ctx.stroke(); }
  else if (kind === 'sleepy') { ctx.fillStyle = dark; for (const [x, r] of eyes) { ctx.beginPath(); ctx.arc(x, 0.03, r * 1.02, 0, Math.PI); ctx.fill(); } }
  else if (kind === 'shades') { ctx.fillStyle = '#12161c'; rrect(ctx, ex - er * 3.5, 0.03 - er * 0.7, er * 4.7, er * 1.5, er * 0.4); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(ex - er * 3.1, 0.03 + er * 0.2, er * 1.3, er * 0.25); }
}
function drawTopper(ctx, kind, L, H, dark, c2) {
  const x = -L * 0.15, y = H / 2;
  if (kind === 'antenna') { ctx.strokeStyle = dark; ctx.lineWidth = 0.05; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - L * 0.07, y + 0.32); ctx.stroke(); ctx.fillStyle = '#ff5a36'; ctx.beginPath(); ctx.arc(x - L * 0.07, y + 0.36, 0.07, 0, 7); ctx.fill(); }
  else if (kind === 'crown') { ctx.fillStyle = '#ffc21a'; ctx.beginPath(); ctx.moveTo(x - 0.28, y); ctx.lineTo(x - 0.28, y + 0.3); ctx.lineTo(x - 0.14, y + 0.15); ctx.lineTo(x, y + 0.34); ctx.lineTo(x + 0.14, y + 0.15); ctx.lineTo(x + 0.28, y + 0.3); ctx.lineTo(x + 0.28, y); ctx.fill(); }
  else if (kind === 'horns') { ctx.fillStyle = '#e8edf2'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + sx * 0.12, y); ctx.quadraticCurveTo(x + sx * 0.42, y + 0.1, x + sx * 0.36, y + 0.4); ctx.quadraticCurveTo(x + sx * 0.26, y + 0.16, x + sx * 0.3 - sx * 0.3, y); ctx.fill(); } }
  else if (kind === 'party') { ctx.fillStyle = '#ff6fb5'; ctx.beginPath(); ctx.moveTo(x - 0.2, y); ctx.lineTo(x, y + 0.5); ctx.lineTo(x + 0.2, y); ctx.fill(); ctx.fillStyle = '#ffc21a'; ctx.beginPath(); ctx.arc(x, y + 0.52, 0.07, 0, 7); ctx.fill(); }
  else if (kind === 'mohawk') { ctx.fillStyle = c2; for (let i = 0; i < 6; i++) { const mx = x - 0.35 + i * 0.14; ctx.beginPath(); ctx.moveTo(mx, y); ctx.lineTo(mx + 0.07, y + 0.28 - Math.abs(i - 2.5) * 0.04); ctx.lineTo(mx + 0.14, y); ctx.fill(); } }
  else if (kind === 'tophat') { ctx.fillStyle = '#12161c'; ctx.fillRect(x - 0.3, y, 0.6, 0.06); ctx.fillRect(x - 0.19, y + 0.06, 0.38, 0.36); ctx.fillStyle = '#c0392b'; ctx.fillRect(x - 0.19, y + 0.08, 0.38, 0.07); }
  else if (kind === 'ears') { ctx.fillStyle = dark; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + sx * 0.08, y); ctx.lineTo(x + sx * 0.24, y + 0.28); ctx.lineTo(x + sx * 0.36, y); ctx.fill(); } }
}

/* The bot itself. pose = {x,y,a, wheels:[{x,y,a},{x,y,a}]} in world units, y up */
function drawBot(ctx, cfg, s, pose, fx) {
  fx = fx || {}; const c = s.ch, L = c.len, H = c.ht, col = cfg.color || '#ffc21a', dark = shade(col, -0.35), wy = -(H / 2 - 0.1);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  bodyPart: { if (fx.noBody) break bodyPart;
  ctx.save(); ctx.translate(pose.x, pose.y); ctx.rotate(pose.a);
  if (s.has.wing) { ctx.fillStyle = '#e8edf2'; ctx.strokeStyle = '#8d99a8'; ctx.lineWidth = 0.05; ctx.beginPath(); ctx.moveTo(-L * 0.55, H / 2 + 0.42); ctx.lineTo(L * 0.45, H / 2 + 0.5); ctx.lineTo(L * 0.6, H / 2 + 0.38); ctx.lineTo(-L * 0.5, H / 2 + 0.3); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillRect(-0.05, H / 2, 0.1, 0.36); }
  if (s.has.righter) { ctx.strokeStyle = '#8d99a8'; ctx.lineWidth = 0.1; ctx.beginPath(); ctx.ellipse(0, H / 2 - 0.02, L * 0.4, 0.5, 0, 0, Math.PI); ctx.stroke(); }
  if (s.has.rocket) { ctx.fillStyle = '#5b6470'; ctx.beginPath(); ctx.moveTo(-L / 2 + 0.1, 0.22); ctx.lineTo(-L / 2 - 0.3, 0.3); ctx.lineTo(-L / 2 - 0.3, -0.2); ctx.lineTo(-L / 2 + 0.1, -0.12); ctx.fill(); if (fx.boost) { ctx.fillStyle = '#ffb020'; ctx.beginPath(); ctx.moveTo(-L / 2 - 0.3, 0.25); ctx.lineTo(-L / 2 - 1.1 - Math.random() * 0.5, 0.05); ctx.lineTo(-L / 2 - 0.3, -0.15); ctx.fill(); } }
  if (s.has.jump) { ctx.strokeStyle = '#8d99a8'; ctx.lineWidth = 0.07; ctx.beginPath(); for (let i = 0; i <= 4; i++) ctx.lineTo(i % 2 ? 0.18 : -0.18, -H / 2 - i * 0.07); ctx.stroke(); }
  if (s.has.hook) { ctx.strokeStyle = '#5b6470'; ctx.lineWidth = 0.09; ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(0, H / 2 + 0.3); ctx.stroke(); if (!fx.hooked) { ctx.strokeStyle = '#c9d1db'; ctx.lineWidth = 0.07; ctx.beginPath(); ctx.arc(0.12, H / 2 + 0.36, 0.12, Math.PI, Math.PI * 2.4); ctx.stroke(); } }
  const F = s.front, tt = fx.t || 0;
  if (s.has.wbar) { const bx = -(s.wheelDX + s.r + 0.45), by = wy - s.r + 0.3; ctx.strokeStyle = '#8d99a8'; ctx.lineWidth = 0.08; ctx.beginPath(); ctx.moveTo(-L / 2 + 0.1, -0.05); ctx.lineTo(bx, by); ctx.stroke(); ctx.fillStyle = '#20242b'; ctx.beginPath(); ctx.arc(bx, by, 0.13, 0, 7); ctx.fill(); }
  if (s.has.vault) { ctx.strokeStyle = '#e8edf2'; ctx.lineWidth = 0.07; ctx.beginPath(); if (fx.vault) { ctx.moveTo(-L * 0.2, 0); ctx.lineTo(-L * 0.2 - 1.6, wy - s.r - 0.6); } else { ctx.moveTo(-L * 0.5, H / 2 + 0.1); ctx.lineTo(L * 0.4, H / 2 + 0.16); } ctx.stroke(); }
  if (s.has.snorkel) { ctx.strokeStyle = '#2ad4c0'; ctx.lineWidth = 0.09; ctx.beginPath(); ctx.moveTo(L * 0.2, H / 2); ctx.lineTo(L * 0.2, H / 2 + 0.7); ctx.lineTo(L * 0.2 + 0.18, H / 2 + 0.8); ctx.stroke(); }
  if (s.has.solar) { ctx.fillStyle = '#1f4fa8'; ctx.strokeStyle = '#9fc2ff'; ctx.lineWidth = 0.03; ctx.beginPath(); ctx.moveTo(-L * 0.4, H / 2 + 0.06); ctx.lineTo(L * 0.05, H / 2 + 0.06); ctx.lineTo(L * 0.1, H / 2 + 0.2); ctx.lineTo(-L * 0.35, H / 2 + 0.2); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  if (s.has.turbo) { ctx.strokeStyle = '#c9d1db'; ctx.lineWidth = 0.1; ctx.beginPath(); ctx.moveTo(-L / 2 + 0.25, H / 2); ctx.quadraticCurveTo(-L / 2 + 0.25, H / 2 + 0.3, -L / 2 - 0.05, H / 2 + 0.3); ctx.stroke(); }
  if (s.has.horn) { ctx.fillStyle = '#ffc21a'; ctx.beginPath(); ctx.moveTo(L / 2 - 0.5, H / 2); ctx.lineTo(L / 2 - 0.3, H / 2 + 0.22); ctx.lineTo(L / 2 - 0.3, H / 2 - 0.02); ctx.fill(); }
  if (s.has.prop) { ctx.strokeStyle = '#5b6470'; ctx.lineWidth = 0.09; ctx.beginPath(); ctx.moveTo(0.25, H / 2); ctx.lineTo(0.25, H / 2 + 0.75); ctx.stroke(); const sw = fx.prop ? Math.cos(tt * 40) : 1; ctx.strokeStyle = '#e8edf2'; ctx.lineWidth = 0.07; ctx.beginPath(); ctx.moveTo(0.25 - 1.1 * sw, H / 2 + 0.75); ctx.lineTo(0.25 + 1.1 * sw, H / 2 + 0.75); ctx.stroke(); }
  if (s.has.lance) { ctx.strokeStyle = '#d9a441'; ctx.lineWidth = 0.09; ctx.beginPath(); ctx.moveTo(L / 2 - 0.2, 0.1); ctx.lineTo(F + 2.1, 0.1); ctx.stroke(); ctx.fillStyle = '#ff5a36'; ctx.beginPath(); ctx.arc(F + 2.1, 0.1, 0.1, 0, 7); ctx.fill(); }
  if (s.has.cannon) { ctx.fillStyle = '#3b4350'; rrect(ctx, L / 2 - 0.45, 0.14, F - L / 2 + 0.95, 0.28, 0.06); ctx.fill(); ctx.fillStyle = '#20242b'; ctx.fillRect(F + 0.4, 0.1, 0.12, 0.36); }
  if (s.has.torch) { ctx.strokeStyle = '#5b6470'; ctx.lineWidth = 0.1; ctx.beginPath(); ctx.moveTo(L / 2 - 0.1, 0.18); ctx.lineTo(F + 0.25, 0.18); ctx.stroke(); ctx.fillStyle = fx.cut === 'torch' ? '#ffb020' : '#4d8dff'; ctx.beginPath(); ctx.moveTo(F + 0.25, 0.28); ctx.lineTo(F + (fx.cut === 'torch' ? 1.2 + Math.random() * 0.4 : 0.5), 0.18); ctx.lineTo(F + 0.25, 0.08); ctx.fill(); }
  if (s.has.drill) { ctx.strokeStyle = '#5b6470'; ctx.lineWidth = 0.12; ctx.beginPath(); ctx.moveTo(L / 2 - 0.1, -0.12); ctx.lineTo(F + 0.1, -0.12); ctx.stroke(); ctx.fillStyle = '#aab3bf'; ctx.beginPath(); ctx.moveTo(F + 0.1, 0.1); ctx.lineTo(F + 0.75, -0.12); ctx.lineTo(F + 0.1, -0.34); ctx.fill(); ctx.strokeStyle = '#5b6470'; ctx.lineWidth = 0.04; ctx.beginPath(); for (let i = 0; i < 3; i++) { const dx = F + 0.2 + ((i * 0.2 + tt * (fx.cut === 'drill' ? 2 : 0.3)) % 0.55); ctx.moveTo(dx, -0.12 + (0.75 - (dx - F)) * 0.32); ctx.lineTo(dx, -0.12 - (0.75 - (dx - F)) * 0.32); } ctx.stroke(); }
  if (s.has.saw) { ctx.strokeStyle = '#5b6470'; ctx.lineWidth = 0.1; ctx.beginPath(); ctx.moveTo(L / 2 - 0.1, 0); ctx.lineTo(F + 0.4, 0); ctx.stroke(); ctx.save(); ctx.translate(F + 0.4, 0); ctx.rotate(-tt * (fx.cut === 'saw' ? 30 : 6)); ctx.fillStyle = '#c9d1db'; ctx.beginPath(); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; ctx.lineTo(Math.cos(a) * 0.42, Math.sin(a) * 0.42); ctx.lineTo(Math.cos(a + 0.2) * 0.3, Math.sin(a + 0.2) * 0.3); } ctx.fill(); ctx.fillStyle = '#5b6470'; ctx.beginPath(); ctx.arc(0, 0, 0.09, 0, 7); ctx.fill(); ctx.restore(); }
  if (s.has.claw) { ctx.strokeStyle = '#ff8a2a'; ctx.lineWidth = 0.09; ctx.beginPath(); ctx.moveTo(L / 2 - 0.1, -0.05); ctx.lineTo(F + 0.1, -0.05); const g = fx.grab ? 0.12 : 0.3; ctx.moveTo(F + 0.1, -0.05); ctx.lineTo(F + 0.35, g); ctx.lineTo(F + 0.6, g * 0.6); ctx.moveTo(F + 0.1, -0.05); ctx.lineTo(F + 0.35, -g - 0.1); ctx.lineTo(F + 0.6, -g * 0.6 - 0.1); ctx.stroke(); }
  if (s.has.magnet) { ctx.strokeStyle = '#d0342c'; ctx.lineWidth = 0.13; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.arc(F - 0.05, H / 2 + 0.05, 0.2, Math.PI / 2, -Math.PI / 2); ctx.stroke(); ctx.strokeStyle = '#e8edf2'; ctx.beginPath(); ctx.moveTo(F - 0.05, H / 2 + 0.25); ctx.lineTo(F + 0.1, H / 2 + 0.25); ctx.moveTo(F - 0.05, H / 2 - 0.15); ctx.lineTo(F + 0.1, H / 2 - 0.15); ctx.stroke(); ctx.lineCap = 'round'; if (fx.mag) { ctx.strokeStyle = 'rgba(120,180,255,.7)'; ctx.lineWidth = 0.04; for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.arc(F + 0.1, H / 2 + 0.05, i * 0.35 + (tt * 2 % 0.35), -0.7, 0.7); ctx.stroke(); } } }
  // body
  if (cfg.words || cfg.pic) drawBanner(ctx, cfg, L, H, tt);
  ctx.fillStyle = fx.hurt ? '#fff' : col; ctx.strokeStyle = dark; ctx.lineWidth = 0.07;
  rrect(ctx, -L / 2, -H / 2, L, H, 0.14); ctx.fill();
  if (!fx.hurt) drawPattern(ctx, cfg, L, H);
  rrect(ctx, -L / 2, -H / 2, L, H, 0.14); ctx.strokeStyle = dark; ctx.lineWidth = 0.07; ctx.stroke();
  ctx.fillStyle = cfg.color2 || '#20242b'; ctx.fillRect(-L / 2 + 0.12, -H / 2 + 0.02, L - 0.24, 0.05);
  if (!fx.noMotor) { ctx.fillStyle = dark; rrect(ctx, -L / 2 + 0.12, -H / 2 + 0.07, L * 0.3, H * 0.4, 0.05); ctx.fill();            // motor block
    const mh = clamp(s.mo.mass / 30, 0.25, 1); ctx.fillStyle = '#2b2f36'; rrect(ctx, -L / 2 + 0.16, -H / 2 + 0.1, L * 0.3 * mh, H * 0.28, 0.04); ctx.fill(); }
  if (cfg.pic) drawPic(ctx, cfg.pic, -L / 2 + 0.12 + L * 0.15, -H / 2 + 0.07 + H * 0.22, H * 0.52);
  // battery gauge
  const be = fx.energy == null ? 1 : fx.energy; if (!fx.noBatt) { ctx.fillStyle = '#12161c'; rrect(ctx, -0.1, -H * 0.2, L * 0.2, H * 0.36, 0.04); ctx.fill(); ctx.fillStyle = be > 0.3 ? '#35d07f' : '#ff5a36'; ctx.fillRect(-0.07, -H * 0.2 + 0.03, (L * 0.2 - 0.06) * be, H * 0.36 - 0.06); }
  // face
  const ex = L / 2 - 0.3, er = Math.min(0.15, H * 0.3);
  drawEyes(ctx, cfg.eyes || 'normal', ex, er, fx.look || 0.3, dark);
  drawTopper(ctx, cfg.topper || 'antenna', L, H, dark, cfg.color2 || '#20242b');
  if (s.has.shocks) { ctx.strokeStyle = '#ffc21a'; ctx.lineWidth = 0.06; for (const sx of [-1, 1]) { ctx.beginPath(); for (let k = 0; k <= 4; k++) ctx.lineTo(sx * s.wheelDX + (k % 2 ? 0.08 : -0.08), wy + 0.05 + k * 0.07); ctx.stroke(); } }
  if (s.has.armor) { ctx.strokeStyle = '#8d99a8'; ctx.lineWidth = 0.1; rrect(ctx, -L / 2 - 0.05, -H / 2 - 0.05, L + 0.1, H + 0.1, 0.18); ctx.stroke(); ctx.fillStyle = '#8d99a8'; for (const bx of [-L * 0.4, 0, L * 0.4]) { ctx.beginPath(); ctx.arc(bx, H / 2 + 0.02, 0.05, 0, 7); ctx.fill(); } }
  if (s.has.spoiler) { ctx.strokeStyle = dark; ctx.lineWidth = 0.07; ctx.beginPath(); ctx.moveTo(-L / 2 + 0.15, H / 2); ctx.lineTo(-L / 2 + 0.05, H / 2 + 0.3); ctx.stroke(); ctx.fillStyle = cfg.color2 || '#20242b'; ctx.fillRect(-L / 2 - 0.25, H / 2 + 0.28, 0.6, 0.09); }
  if (s.has.xbatt) { ctx.fillStyle = '#12161c'; rrect(ctx, L * 0.08, H / 2, 0.42, 0.2, 0.04); ctx.fill(); ctx.fillStyle = '#35d07f'; ctx.fillRect(L * 0.08 + 0.05, H / 2 + 0.05, 0.3, 0.1); }
  if (s.has.scout) { ctx.fillStyle = '#20242b'; ctx.fillRect(L / 2 - 0.42, H / 2, 0.22, 0.16); ctx.fillStyle = '#4d8dff'; ctx.beginPath(); ctx.arc(L / 2 - 0.2, H / 2 + 0.08, 0.06, 0, 7); ctx.fill(); }
  if (s.has.gyro) { ctx.strokeStyle = '#2ad4c0'; ctx.lineWidth = 0.04; ctx.beginPath(); ctx.ellipse(-L * 0.05, H * 0.28, 0.16, 0.07, tt * 3, 0, 7); ctx.stroke(); }
  if (s.has.sledge) { const a = fx.sledge ? -1.2 : 0.9; ctx.save(); ctx.translate(L / 2 - 0.1, H / 2); ctx.rotate(a); ctx.strokeStyle = '#8a5a2b'; ctx.lineWidth = 0.09; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 1.2); ctx.stroke(); ctx.fillStyle = '#5b6470'; ctx.fillRect(-0.3, 1.1, 0.6, 0.34); ctx.restore(); }
  if (s.has.chute) { if (fx.chute) { ctx.fillStyle = '#ff5a36'; ctx.beginPath(); ctx.arc(0, H / 2 + 2.2, 1.5, 0, Math.PI); ctx.fill(); ctx.strokeStyle = '#e8edf2'; ctx.lineWidth = 0.03; ctx.beginPath(); for (const cx of [-1.5, -0.5, 0.5, 1.5]) { ctx.moveTo(cx, H / 2 + 2.2); ctx.lineTo(0, H / 2); } ctx.stroke(); } else { ctx.fillStyle = '#ff5a36'; rrect(ctx, -0.5, H / 2, 0.36, 0.16, 0.06); ctx.fill(); } }
  if (s.has.balloon) { const up = fx.bal ? 1.9 : 0.75, n = fx.bal ? 3 : 1; ctx.strokeStyle = '#e8edf2'; ctx.lineWidth = 0.03; for (let k = 0; k < n; k++) { const bx = -0.35 + (k - (n - 1) / 2) * 0.55, by = H / 2 + up + (k % 2) * 0.25; ctx.beginPath(); ctx.moveTo(-0.35, H / 2); ctx.lineTo(bx, by); ctx.stroke(); ctx.fillStyle = ['#ff5a36', '#ffc21a', '#4d8dff'][k]; ctx.beginPath(); ctx.ellipse(bx, by + (fx.bal ? 0.42 : 0.2), fx.bal ? 0.36 : 0.16, fx.bal ? 0.44 : 0.2, 0, 0, 7); ctx.fill(); } }
  if (fx.shield) { ctx.strokeStyle = 'rgba(120,220,255,.9)'; ctx.fillStyle = 'rgba(120,220,255,.18)'; ctx.lineWidth = 0.07; ctx.beginPath(); ctx.ellipse(0, 0, L * 0.75, H + s.r + 0.5, 0, 0, 7); ctx.fill(); ctx.stroke(); }
  if (s.has.ballast) { ctx.fillStyle = '#3b4350'; for (let i = 0; i < 3; i++) ctx.fillRect(-0.45 + i * 0.32, -H / 2 - 0.16, 0.28, 0.18); }
  if (s.has.blade) { const bx = Math.max(L / 2, s.wheelDX + s.r) + 0.14, lo = wy - s.r + 0.16, hi = H / 2 + 0.25; ctx.strokeStyle = '#5b6470'; ctx.lineWidth = 0.09; ctx.beginPath(); ctx.moveTo(L / 2 - 0.1, 0); ctx.lineTo(bx, 0); ctx.stroke(); ctx.fillStyle = '#e0a020'; ctx.strokeStyle = '#8a6420'; ctx.lineWidth = 0.05; ctx.beginPath(); ctx.moveTo(bx - 0.1, lo); ctx.quadraticCurveTo(bx + 0.25, (lo + hi) / 2, bx - 0.1, hi); ctx.lineTo(bx + 0.1, hi); ctx.quadraticCurveTo(bx + 0.35, (lo + hi) / 2, bx + 0.1, lo); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.restore(); }
  // wheels
  for (const w of pose.wheels) {
    ctx.save(); ctx.translate(w.x, w.y); ctx.rotate(w.a); const r = s.r;
    ctx.fillStyle = '#20242b'; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
    const n = Math.round(r * 22);
    if (s.ti.id !== 'slick') { ctx.fillStyle = s.ti.id === 'spiked' ? '#c9d1db' : '#20242b'; for (let i = 0; i < n; i++) { const a = i / n * 6.283; ctx.save(); ctx.rotate(a); if (s.ti.id === 'spiked') { ctx.beginPath(); ctx.moveTo(r - 0.02, -0.04); ctx.lineTo(r + 0.09, 0); ctx.lineTo(r - 0.02, 0.04); ctx.fill(); } else ctx.fillRect(r - 0.03, -0.05, 0.08, 0.1); ctx.restore(); } }
    ctx.fillStyle = cfg.hub || '#aab3bf'; ctx.beginPath(); ctx.arc(0, 0, r * 0.55, 0, 7); ctx.fill();
    if (s.ti.id === 'paddle') { ctx.fillStyle = '#3b4350'; for (let i = 0; i < 8; i++) { ctx.save(); ctx.rotate(i * 0.785); ctx.fillRect(r - 0.04, -0.03, 0.16, 0.06); ctx.restore(); } }
    ctx.strokeStyle = '#5b6470'; ctx.lineWidth = r * 0.14; ctx.beginPath(); for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3; ctx.moveTo(Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.5); ctx.lineTo(-Math.cos(a) * r * 0.5, -Math.sin(a) * r * 0.5); } ctx.stroke();
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, 0, r * 0.18, 0, 7); ctx.fill();
    if (s.has.suction) { ctx.strokeStyle = '#4d8dff'; ctx.lineWidth = 0.06; ctx.beginPath(); ctx.arc(0, 0, r * 0.8, 0, 7); ctx.stroke(); }
    ctx.restore();
  }
  if (s.has.floats) { ctx.save(); ctx.translate(pose.x, pose.y); ctx.rotate(pose.a); ctx.fillStyle = '#ff8a2a'; ctx.strokeStyle = '#b3540c'; ctx.lineWidth = 0.05; rrect(ctx, -L * 0.55, wy - 0.2, L * 1.1, 0.34, 0.17); ctx.fill(); ctx.stroke(); ctx.restore(); }
}
function botPose(G) {
  const b = G.bot, p = b.chassis.getPosition();
  return { x: p.x, y: p.y, a: b.chassis.getAngle(), wheels: b.wheels.map(w => ({ x: w.getPosition().x, y: w.getPosition().y, a: w.getAngle() })) };
}

/* Draw the whole scene. cam = {x,y,ppm} (centre, pixels per metre) */
function renderGame(ctx, G, cam, W, H, dpr, opt) {
  opt = opt || {};
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawBackground(ctx, W, H, cam, G.course.sky || G.course.kind);
  ctx.setTransform(cam.ppm * dpr, 0, 0, -cam.ppm * dpr, (W / 2 - cam.x * cam.ppm) * dpr, (H / 2 + cam.y * cam.ppm) * dpr);
  const x0 = cam.x - W / 2 / cam.ppm - 1, x1 = cam.x + W / 2 / cam.ppm + 1, y0 = cam.y - H / 2 / cam.ppm - 1, y1 = cam.y + H / 2 / cam.ppm + 1;
  ctx.lineCap = 'round';
  drawLiquid(ctx, G.course, x0, x1, y0, y1, G.t, LAVA);
  for (const e of G.ents) if (e.t === 'fan' || e.t === 'zip') drawEnt(ctx, G, e);
  drawTiles(ctx, G.course, x0, x1, y0, y1);
  ctx.lineWidth = 0.24;
  for (const tp of G.tops) { if (tp.b[0] > x1 + 2 && tp.a[0] > x1 + 2 || tp.a[0] < x0 - 2 && tp.b[0] < x0 - 2) continue; ctx.strokeStyle = TOP_COL[Math.max(0, tp.mat)]; ctx.beginPath(); ctx.moveTo(tp.a[0], tp.a[1] - 0.08); ctx.lineTo(tp.b[0], tp.b[1] - 0.08); ctx.stroke(); }
  for (const cp of G.cps) drawFlag(ctx, cp.x, cp.y, 'cp', cp.hit);
  for (const e of G.ents) if (e.t !== 'fan' && e.t !== 'zip') drawEnt(ctx, G, e);
  if (G.bot) {
    const b = G.bot, s = G.spec;
    if (b.rope) { const m = hookMount(G), e = b.rope.ent, q = e.t === 'zip' ? e.trolley.getPosition() : V(e.o.x, e.o.y); ctx.strokeStyle = '#e8edf2'; ctx.lineWidth = 0.07; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
    const v = b.chassis.getLinearVelocity();
    drawBot(ctx, G.cfg, s, botPose(G), { boost: b.boosting, hooked: !!b.rope, energy: b.energy / s.energy, look: clamp(v.x / 6, -1, 1), t: G.t, cut: b.cut, prop: b.propOn, mag: b.magOn, grab: !!b.grab, vault: b.vaultT > 0, hurt: b.hurtT > 0, sledge: b.sledgeT > 0, chute: b.chuteOn, bal: b.balOn, shield: b.shieldT > 0 });
    ctx.fillStyle = '#20242b'; for (const k of G.balls) { const q = k.body.getPosition(); ctx.beginPath(); ctx.arc(q.x, q.y, 0.2, 0, 7); ctx.fill(); }
    const tg = G.live.target;
    if (tg) { const pulse = 0.5 + Math.sin(G.t * 8) * 0.12; ctx.strokeStyle = '#35d07f'; ctx.lineWidth = 0.1; ctx.beginPath(); ctx.arc(tg.p.x, tg.p.y, pulse, 0, 7); ctx.stroke(); wtext(ctx, 'E', tg.p.x, tg.p.y + 1.1, 0.7, '#35d07f'); }
  }
  for (const q of G.parts) { ctx.globalAlpha = q.life / q.max; ctx.fillStyle = q.c; ctx.beginPath(); ctx.arc(q.x, q.y, q.r * (1.6 - q.life / q.max), 0, 7); ctx.fill(); }
  ctx.globalAlpha = 1;
  drawLiquid(ctx, G.course, x0, x1, y0, y1, G.t, WATER);
  if (opt.after) opt.after(ctx, x0, x1, y0, y1);
}

/* Tiny whole-course picture for cards and the shop */
function drawMini(cv, course, markX) {
  const top = []; let lo = course.h, hi = 0;
  for (let x = 0; x < course.w; x++) { let y = course.h - 1; while (y >= 0 && !tget(course, x, y)) y--; top.push(y); if (y >= 0) { hi = Math.max(hi, y); } }
  for (const o of course.objs) { hi = Math.max(hi, Math.ceil(o.y), Math.ceil(o.y2 || 0)); }
  lo = Math.max(0, Math.min(...top.filter(v => v >= 0), hi) - 6); hi = Math.min(course.h - 1, hi + 4);
  const W = cv.width, H = cv.height, sx = W / course.w, sy = H / (hi - lo + 1), ctx = cv.getContext('2d');
  const k = SKY[course.sky || course.kind] || SKY.speed, g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, k[0]); g.addColorStop(1, k[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let y = lo; y <= hi; y++) for (let x = 0; x < course.w; x++) {
    const t = tget(course, x, y); if (!t) continue;
    ctx.fillStyle = t === WATER ? '#2f8cf0' : t === LAVA ? '#ff6a1a' : TILE_COL[tMat(t)][tShape(tget(course, x, y + 1)) === 1 ? 1 : 0];
    const s = tShape(t), px = x * sx, py = H - (y - lo + 1) * sy;
    if (s > 1) { const pts = SHAPES[s]; ctx.beginPath(); pts.forEach((p, i) => ctx[i ? 'lineTo' : 'moveTo'](px + p[0] * sx, py + (1 - p[1]) * sy)); ctx.fill(); }
    else ctx.fillRect(px, py, sx + 0.6, sy + 0.6);
  }
  const Y = y => H - (y - lo) * sy;
  for (const o of course.objs) {
    if (o.t === 'zip' || o.t === 'bridge') { ctx.strokeStyle = o.t === 'zip' ? '#111' : '#b98850'; ctx.lineWidth = o.t === 'zip' ? 1.5 : 3; ctx.beginPath(); ctx.moveTo(o.x * sx, Y(o.y)); ctx.lineTo(o.x2 * sx, Y(o.y2)); ctx.stroke(); continue; }
    ctx.fillStyle = { start: '#35d07f', finish: '#fff', checkpoint: '#ff5a36', steel: '#8d99a8', crate: '#c8924f', boulder: '#7f7a74', hammer: '#c0392b', anchor: '#ffc21a', lift: '#4d8dff', ferry: '#4d8dff' }[o.t] || '#ffc21a';
    const r = o.t === 'start' || o.t === 'finish' ? 4 : 2.5; ctx.fillRect(o.x * sx - r / 2, Y(o.y) - r * 1.6, r, r * 1.6);
  }
  if (markX != null) { ctx.fillStyle = '#fff'; ctx.fillRect(markX * sx - 1, 0, 2, H); }
}
