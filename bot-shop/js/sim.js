/* Bot Assembly Shop — physics world, bot, simulation step, drawing */
'use strict';
const DT = 1 / 60, HOOK_RANGE = 10, RESET_PENALTY = 3;
const normAng = a => { a = (a + Math.PI) % (2 * Math.PI); if (a < 0) a += 2 * Math.PI; return a - Math.PI; };

/* ---------------- World ---------------- */
function makeGame(course, cfg) {
  const world = new pl.World({ gravity: V(0, -10) });
  const G = {
    course, cfg, world, ents: [], t: 0, clock: 0, started: false, done: null, penalties: 0, resets: 0, parts: [],
    balls: [],
    stats: { stall: 0, slip: 0, flips: 0, fell: 0, sank: 0, burned: 0, dead: false, maxSpeed: 0 }, flash: null, live: {},
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
      if (wheel) c.setFriction(mat === ICE ? G.spec.ti.ice : G.spec.mu * (mat === MUD ? 0.7 : 1));
      else c.setFriction(mat === ICE ? 0.08 : 0.4);
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
    case 'boost': case 'spring': case 'fan': break;
    default: return;
  }
  G.ents.push(e);
}
const PLAT_T = 10;
const platU = (t, x) => { const p = ((t + x * 0.13) % PLAT_T) / PLAT_T; let u = p < 0.25 ? p / 0.25 : p < 0.5 ? 1 : p < 0.75 ? 1 - (p - 0.5) / 0.25 : 0; return u * u * (3 - 2 * u); };
function updateEnts(G) {
  for (const e of G.ents) {
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
      if (on) {
        e.on = true; let best = null, bd = 1e9;
        for (const g of G.ents) if (g.t === 'gate' && !g.opening) { const d = Math.hypot(g.o.x - e.o.x, g.o.y - e.o.y); if (d < bd) { bd = d; best = g; } }
        if (best) best.opening = true; G.flash = { text: best ? 'Gate open!' : 'Click!', t: 1.2, good: true }; sfx('cp');
      }
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
  const bot = { chassis, wheels: [], joints: [], rope: null, fuel: 3, energy: old ? old.energy : s.energy, jumpCd: 0, rightCd: 0, springCd: 0, flipT: 0, wet: 0, deadT: 0, touch: false, wy, tq: [0, 0], righting: 0, ammo: 6, fireCd: 0, vaultCd: 0, vaultT: 0, grab: null, cut: null };
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
  G.flash = { text: ({ fell: 'Fell off the course!', sank: 'Sank! No floats.', burned: 'Too hot! Melted in lava.', flip: 'Back on your wheels.' }[why] || 'Reset') + `  +${RESET_PENALTY}s`, t: 2.2 };
  sfx('bad');
}
const botBodies = b => [b.chassis, b.wheels[0], b.wheels[1]];
function kick(bot, dvx, dvy) { for (const b of botBodies(bot)) { const v = b.getLinearVelocity(); b.setLinearVelocity(V(v.x + dvx, v.y + dvy)); } }
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
  let mud = 0; for (const w of bot.wheels) if (w.ud.ground && w.ud.mat === MUD) mud++;
  if (mud && sp > 0.02) { const F = mud * 90 / s.r * clamp(sp / 0.5, 0, 1); ch.applyForceToCenter(V(-F * v.x / sp, -F * v.y / sp), true); if (Math.random() < 0.3 && sp > 1) puff(G, bot.wheels[0].getPosition(), '#3d2b1c', 1); }
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
  for (const e of G.ents) {
    const o = e.o;
    if (e.t === 'boost') { if (Math.abs(p.x - o.x) < 1.6 && p.y > o.y - 0.5 && p.y < o.y + 2.5) { ch.applyForceToCenter(V(2800, 0), true); if (Math.random() < 0.4) puff(G, V(p.x - 1, p.y - 0.3), '#ffe36b', 1); } }
    else if (e.t === 'fan') { if (Math.abs(p.x - o.x) < 1.7 && p.y > o.y && p.y < o.y + 9) ch.applyForceToCenter(V(0, (s.has.wing ? 2200 : 1400) * (1 - (p.y - o.y) / 9 * 0.6)), true); }
    else if (e.t === 'spring' && bot.springCd <= 0) {
      for (const w of bot.wheels) { const q = w.getPosition(); if (Math.abs(q.x - o.x) < 1.0 && q.y - s.r < o.y + 0.4 && q.y - s.r > o.y - 0.6) { const vy = v.y; kick(bot, 0, Math.min(13, 1500 / s.mass) - Math.min(0, vy)); bot.springCd = 0.6; e.pop = 0.3; sfx('jump'); break; } }
    }
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
  for (const w of bot.wheels) { w.ud.wasGround = w.ud.ground; w.ud.ground = false; w.ud.nx = w.ud.ny = 0; w.ud.has = false; }
  bot.touch = false;
  G.world.step(DT, 8, 4);

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
const TOOLS = { saw: { y: 0, reach: 0.55, dmg: { woodwall: 1, crate: 1 }, c: '#e9c58f' }, drill: { y: -0.12, reach: 0.6, dmg: { stone: 1, iceblock: 1.4, boulder: 1, woodwall: 0.3 }, c: '#b9b2a8' }, torch: { y: 0.18, reach: 1.1, dmg: { iceblock: 1, woodwall: 0.45, crate: 0.5 }, c: '#ffb020' } };
function breakEnt(G, e) {
  const i = G.ents.indexOf(e); if (i < 0) return;
  const q = e.body.getPosition(), col = { woodwall: '#c8924f', crate: '#c8924f', iceblock: '#cfeeff', stone: '#8a857e', boulder: '#8a857e' }[e.t];
  for (let k = 0; k < 16; k++) G.parts.push({ x: q.x + (Math.random() - .5) * (e.hw || 0.5) * 2, y: q.y + (Math.random() - .5) * (e.hh || 0.5) * 2, vx: (Math.random() - .3) * 6, vy: Math.random() * 6, life: 0.8, max: 0.8, c: col, r: 0.2 });
  if (G.bot.grab && G.bot.grab.ent === e) G.bot.grab = null;
  G.world.destroyBody(e.body); G.ents.splice(i, 1); sfx('bad');
}
function useGadgets(G, inp, alive, thr, grounded, fwd, up, v) {
  const bot = G.bot, s = G.spec, ch = bot.chassis, w = G.world;
  bot.fireCd -= DT; bot.vaultCd -= DT; bot.vaultT -= DT; bot.cut = null; bot.propOn = false; bot.magOn = false;
  // cutting tools work on contact
  for (const id in TOOLS) if (s.has[id] && alive) {
    const T = TOOLS[id], tip = ch.getWorldPoint(V(s.front + T.reach, T.y));
    for (const e of G.ents.slice()) {
      const rate = T.dmg[e.t]; if (!rate) continue;
      const q = e.body.getPosition(), hit = e.hw ? Math.abs(tip.x - e.cx) < e.hw + T.reach + 0.15 && Math.abs(tip.y - e.cy) < e.hh + 0.4 : Math.hypot(tip.x - q.x, tip.y - q.y) < e.s + T.reach + 0.25;
      if (!hit) continue;
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
    bot.propOn = true; bot.energy -= 6 * DT; ch.applyForceToCenter(V(thr * 250, Math.min(1300, s.mass * 14) * clamp(1 - (v.y - 2.5) / 3, 0, 1)), true);
    ch.applyTorque(-normAng(ch.getAngle()) * 300 - ch.getAngularVelocity() * 80, true);
  }
  if (alive && inp.climb && s.has.suction) {
    bot.energy -= 0.8 * DT;
    for (const wb of bot.wheels) { const u = wb.ud, n = Math.hypot(u.nx, u.ny); if (n > 0.01) { const F = 1.3 * s.mass * 10; wb.applyForceToCenter(V(-u.nx / n * F, -u.ny / n * F), true); } }
    // cresting a ledge: one wheel still on the wall, the other already past the top
    const [r0, f0] = bot.wheels.map(wb => wb.ud), onWall = u => u.has && Math.abs(u.nx) > 0.5;
    if (onWall(r0) && !f0.has) { ch.applyTorque(-s.mass * 30, true); ch.applyForceToCenter(V(-r0.nx * s.mass * 5, s.mass * 3), true); }
  }
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

const SKY = { speed: ['#3aa0ff', '#bfe6ff', '#8fb6d9', '#6f9a6a'], strength: ['#e98a3c', '#ffe1a8', '#b9825a', '#8a6a48'], crazy: ['#3b2a78', '#f08fb0', '#6a4c9c', '#4a3a78'] };
function drawBackground(ctx, W, H, cam, kind) {
  const k = SKY[kind] || SKY.speed, g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, k[0]); g.addColorStop(1, k[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(W * 0.8, H * 0.2, Math.min(W, H) * 0.06, 0, 7); ctx.fill();
  for (let layer = 0; layer < 2; layer++) {
    const par = layer ? 0.25 : 0.1, base = H * (layer ? 0.72 : 0.6), amp = H * (layer ? 0.1 : 0.16), off = cam.x * cam.ppm * par * 0.3;
    ctx.fillStyle = k[2 + layer]; ctx.globalAlpha = layer ? 0.75 : 0.55; ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 24) { const u = (x + off) * (layer ? 0.004 : 0.0022); ctx.lineTo(x, base - amp * (Math.sin(u) * 0.6 + Math.sin(u * 2.3 + layer) * 0.3 + Math.sin(u * 5.1) * 0.1) + (cam.y - 12) * cam.ppm * par * 0.25); }
    ctx.lineTo(W, H); ctx.fill();
  }
  ctx.globalAlpha = 0.8; ctx.fillStyle = '#fff';
  for (let i = 0; i < 6; i++) { const x = ((i * 397 - cam.x * cam.ppm * 0.06) % (W + 300) + W + 300) % (W + 300) - 150, y = H * (0.1 + (i * 37 % 30) / 100); ctx.beginPath(); ctx.ellipse(x, y, 60, 16, 0, 0, 7); ctx.ellipse(x + 35, y - 10, 40, 16, 0, 0, 7); ctx.fill(); }
  ctx.globalAlpha = 1;
}

const TILE_COL = [['#8a6240', '#6d4b30'], ['#bfe6fb', '#93cdea'], ['#4a3423', '#3a281a']];
const TOP_COL = ['#58c043', '#f4fcff', '#261a10'];
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

/* The bot itself. pose = {x,y,a, wheels:[{x,y,a},{x,y,a}]} in world units, y up */
function drawBot(ctx, cfg, s, pose, fx) {
  fx = fx || {}; const c = s.ch, L = c.len, H = c.ht, col = cfg.color || '#ffc21a', dark = shade(col, -0.35), wy = -(H / 2 - 0.1);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
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
  ctx.fillStyle = col; ctx.strokeStyle = dark; ctx.lineWidth = 0.07;
  rrect(ctx, -L / 2, -H / 2, L, H, 0.14); ctx.fill(); ctx.stroke();
  ctx.fillStyle = dark; rrect(ctx, -L / 2 + 0.12, -H / 2 + 0.07, L * 0.3, H * 0.4, 0.05); ctx.fill();            // motor block
  const mh = clamp(s.mo.mass / 30, 0.25, 1); ctx.fillStyle = '#2b2f36'; rrect(ctx, -L / 2 + 0.16, -H / 2 + 0.1, L * 0.3 * mh, H * 0.28, 0.04); ctx.fill();
  // battery gauge
  const be = fx.energy == null ? 1 : fx.energy; ctx.fillStyle = '#12161c'; rrect(ctx, -0.1, -H * 0.2, L * 0.2, H * 0.36, 0.04); ctx.fill(); ctx.fillStyle = be > 0.3 ? '#35d07f' : '#ff5a36'; ctx.fillRect(-0.07, -H * 0.2 + 0.03, (L * 0.2 - 0.06) * be, H * 0.36 - 0.06);
  // face
  const ex = L / 2 - 0.3, er = Math.min(0.15, H * 0.3);
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex, 0.03, er, 0, 7); ctx.arc(ex - er * 2.3, 0.03, er, 0, 7); ctx.fill();
  ctx.fillStyle = '#12161c'; const lk = fx.look || 0.3; ctx.beginPath(); ctx.arc(ex + er * 0.4 * lk, 0.03, er * 0.5, 0, 7); ctx.arc(ex - er * 2.3 + er * 0.4 * lk, 0.03, er * 0.5, 0, 7); ctx.fill();
  ctx.strokeStyle = dark; ctx.lineWidth = 0.05; ctx.beginPath(); ctx.moveTo(-L * 0.15, H / 2); ctx.lineTo(-L * 0.22, H / 2 + 0.32); ctx.stroke(); ctx.fillStyle = '#ff5a36'; ctx.beginPath(); ctx.arc(-L * 0.22, H / 2 + 0.36, 0.07, 0, 7); ctx.fill();
  if (s.has.ballast) { ctx.fillStyle = '#3b4350'; for (let i = 0; i < 3; i++) ctx.fillRect(-0.45 + i * 0.32, -H / 2 - 0.16, 0.28, 0.18); }
  if (s.has.blade) { const bx = Math.max(L / 2, s.wheelDX + s.r) + 0.14, lo = wy - s.r + 0.16, hi = H / 2 + 0.25; ctx.strokeStyle = '#5b6470'; ctx.lineWidth = 0.09; ctx.beginPath(); ctx.moveTo(L / 2 - 0.1, 0); ctx.lineTo(bx, 0); ctx.stroke(); ctx.fillStyle = '#e0a020'; ctx.strokeStyle = '#8a6420'; ctx.lineWidth = 0.05; ctx.beginPath(); ctx.moveTo(bx - 0.1, lo); ctx.quadraticCurveTo(bx + 0.25, (lo + hi) / 2, bx - 0.1, hi); ctx.lineTo(bx + 0.1, hi); ctx.quadraticCurveTo(bx + 0.35, (lo + hi) / 2, bx + 0.1, lo); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.restore();
  // wheels
  for (const w of pose.wheels) {
    ctx.save(); ctx.translate(w.x, w.y); ctx.rotate(w.a); const r = s.r;
    ctx.fillStyle = '#20242b'; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
    const n = Math.round(r * 22);
    if (s.ti.id !== 'slick') { ctx.fillStyle = s.ti.id === 'spiked' ? '#c9d1db' : '#20242b'; for (let i = 0; i < n; i++) { const a = i / n * 6.283; ctx.save(); ctx.rotate(a); if (s.ti.id === 'spiked') { ctx.beginPath(); ctx.moveTo(r - 0.02, -0.04); ctx.lineTo(r + 0.09, 0); ctx.lineTo(r - 0.02, 0.04); ctx.fill(); } else ctx.fillRect(r - 0.03, -0.05, 0.08, 0.1); ctx.restore(); } }
    ctx.fillStyle = '#aab3bf'; ctx.beginPath(); ctx.arc(0, 0, r * 0.55, 0, 7); ctx.fill();
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
  drawBackground(ctx, W, H, cam, G.course.kind);
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
    drawBot(ctx, G.cfg, s, botPose(G), { boost: b.boosting, hooked: !!b.rope, energy: b.energy / s.energy, look: clamp(v.x / 6, -1, 1), t: G.t, cut: b.cut, prop: b.propOn, mag: b.magOn, grab: !!b.grab, vault: b.vaultT > 0 });
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
  const k = SKY[course.kind] || SKY.speed, g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, k[0]); g.addColorStop(1, k[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
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
