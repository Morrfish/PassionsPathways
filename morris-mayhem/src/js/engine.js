// Morris Mayhem engine: physics, attacks, knockback, abilities, KOs. Runs at a fixed 60 steps a second.
window.MM = window.MM || {};
(function () {
  const GRAV = 0.75, GRAV_LAUNCH = 0.42, MAXFALL = 13, FASTFALL = 20, AIR_JUMPS = 2;
  const LAUNCH_DECAY = 0.984;
  const W = 44, H = 112; // hurtbox for a size-1 fighter
  const PLAYER_COLORS = ['#ff4b4b', '#3c8dff', '#33d17a', '#ffc933'];
  MM.PLAYER_COLORS = PLAYER_COLORS;

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const sgn = (v) => (v < 0 ? -1 : 1);
  const overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

  // ---------- sound (made on the fly, no files) ----------
  let ac = null;
  MM.sfx = function (kind, power = 1) {
    try {
      if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === 'suspended') ac.resume();
      const t = ac.currentTime, g = ac.createGain();
      g.connect(ac.destination);
      const tone = (type, f1, f2, dur, vol) => {
        const o = ac.createOscillator(); o.type = type;
        o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), t + dur);
        const gg = ac.createGain(); gg.gain.setValueAtTime(vol * MM.volume, t); gg.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(gg); gg.connect(ac.destination); o.start(t); o.stop(t + dur);
      };
      const noise = (dur, vol, freq) => {
        const n = ac.sampleRate * dur, buf = ac.createBuffer(1, n, ac.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
        const s = ac.createBufferSource(); s.buffer = buf;
        const flt = ac.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = freq;
        const gg = ac.createGain(); gg.gain.value = vol * MM.volume;
        s.connect(flt); flt.connect(gg); gg.connect(ac.destination); s.start(t);
      };
      if (kind === 'hit') { noise(0.12 + power * 0.08, 0.5 + power * 0.3, 1800 + power * 1500); tone('square', 220 + power * 60, 60, 0.12, 0.15); }
      else if (kind === 'swing') noise(0.07, 0.12, 4000);
      else if (kind === 'jump') tone('sine', 300, 620, 0.12, 0.12);
      else if (kind === 'special') tone('sawtooth', 500, 180, 0.2, 0.1);
      else if (kind === 'ko') { noise(0.6, 0.9, 900); tone('sawtooth', 160, 40, 0.6, 0.3); }
      else if (kind === 'heal') { tone('sine', 520, 1040, 0.35, 0.15); }
      else if (kind === 'counter') { tone('square', 900, 1400, 0.15, 0.15); }
      else if (kind === 'dodge') tone('sine', 700, 350, 0.1, 0.07);
      else if (kind === 'select') tone('triangle', 660, 990, 0.08, 0.12);
      else if (kind === 'go') { tone('square', 440, 880, 0.35, 0.18); }
    } catch (e) { /* sound is optional */ }
  };
  MM.volume = 0.6;

  // ---------- match setup ----------
  MM.newGame = function (players, stageId, stocks) {
    const stage = MM.STAGES.find((s) => s.id === stageId) || MM.STAGES[0];
    const G = { stage, fighters: [], projs: [], traps: [], parts: [], frame: 0, shake: 0, over: false, endT: 0, freeze: 0, countdown: 150, slowmo: 0 };
    const used = {};
    const n = players.length, span = Math.min(stage.main.right - stage.main.left - 200, 260 * (n - 1));
    players.forEach((p, i) => {
      const def = MM.FIGHTERS.find((d) => d.id === p.fighter) || MM.FIGHTERS[0];
      const alt = used[def.id] = (used[def.id] || 0) + 1;
      const x = n === 1 ? 0 : -span / 2 + (span * i) / (n - 1);
      G.fighters.push(makeFighter(p, def, x, alt > 1, stocks));
    });
    G.fighters.forEach((f) => { f.face = f.x > 0 ? -1 : 1; });
    return G;
  };

  function makeFighter(p, def, x, alt, stocks) {
    const f = makeFighterBase(p, def, x, alt, stocks);
    if (def.forms) { f.forms = MM.formDefs(def); f.formIdx = 0; f.swapCd = 0; applyForm(f, 0); }
    return f;
  }
  // Switch a fighter with several forms (e.g. Mandi: Witch <-> Mermaid Fangirl) to form i.
  function applyForm(f, i) {
    const d = f.forms[i];
    f.formIdx = i; f.def = d; f.st = d.stats; f.s = d.stats.size || 1;
    f.w = W * f.s; f.h = H * f.s;
    f.color = f.alt ? d.accent : d.color; f.accent = f.alt ? d.color : d.accent;
  }
  function startSwap(G, f) {
    f.act = { type: 'swap', t: 0, dur: 22, pose: 'flex', noGrav: !f.ground };
    f.vy = Math.min(f.vy, 0); f.swapCd = 75;
  }
  function makeFighterBase(p, def, x, alt, stocks) {
    const s = def.stats.size || 1;
    return {
      slot: p.slot, dev: p.dev, cpu: p.cpu ? p.level || 2 : 0, def, st: def.stats, alt,
      color: alt ? def.accent : def.color, accent: alt ? def.color : def.accent,
      w: W * s, h: H * s, s,
      x, y: 0, vx: 0, vy: 0, face: 1, ground: null, jumps: AIR_JUMPS, upUsed: false, sideUsed: false, airDodged: false, ff: false,
      damage: 0, stocks, out: false, dead: 0, float: 0, act: null, hitstun: 0, lag: 0, invuln: 0, dodgeCd: 0, jsq: 0, dropT: 0,
      cd: { neutral: 0, side: 0, up: 0, down: 0 }, buff: null, inp: blankInput(), prev: blankInput(),
      kos: 0, falls: 0, dealt: 0, lastHit: -1, lastHitT: 0, anim: 0, bubble: null, ai: {},
    };
  }
  const blankInput = () => ({ x: 0, y: 0, jump: false, attack: false, special: false, dodge: false, swap: false, pause: false });

  // ---------- helpers ----------
  const power = (f) => f.st.power * (f.buff ? f.buff.powerMul : 1);
  const speedMul = (f) => (f.buff ? f.buff.speedMul : 1);
  MM.hurtbox = (f) => ({ x: f.x - f.w / 2, y: f.y - f.h, w: f.w, h: f.h });
  function boxFor(f, b) {
    const s = f.s;
    return { x: f.face > 0 ? f.x + b[0] * s : f.x - (b[0] + b[2]) * s, y: f.y + b[1] * s, w: b[2] * s, h: b[3] * s };
  }
  function surfaceBelow(G, x, y) { // top y of the nearest floor at or below y, or null
    const m = G.stage.main;
    let best = null;
    if (x >= m.left && x <= m.right && y <= 1) best = 0;
    for (const p of G.stage.plats) if (x >= p.x && x <= p.x + p.w && y <= p.y + 1 && (best === null || p.y > best)) best = p.y;
    return best;
  }
  MM.surfaceBelow = surfaceBelow;
  function insideMain(G, x, y) { const m = G.stage.main; return x > m.left && x < m.right && y > 2 && y < m.depth; }

  function part(G, o) { G.parts.push(Object.assign({ vx: 0, vy: 0, life: 30, max: 30, size: 6, color: '#fff', type: 'spark' }, o)); }
  function burst(G, x, y, color, n, spd) {
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = spd * (0.4 + Math.random()); part(G, { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, color, life: 20 + Math.random() * 15, max: 35, size: 3 + Math.random() * 5 }); }
  }
  function popText(G, x, y, text, color) { part(G, { type: 'text', x, y, vy: -1.4, text, color, life: 60, max: 60, size: 30 }); }
  MM.popText = popText;

  // ---------- per-frame update ----------
  MM.step = function (G) {
    G.frame++;
    if (G.countdown > 0) { G.countdown--; if (G.countdown === 0) MM.sfx('go'); }
    if (G.freeze > 0) { G.freeze--; return; }
    for (const f of G.fighters) {
      f.prev = f.inp;
      f.inp = f.cpu ? MM.aiThink(G, f) : MM.readDevice(f.dev);
      if (G.countdown > 0 || G.over) f.inp = blankInput();
    }
    for (const f of G.fighters) updateFighter(G, f);
    for (const f of G.fighters) checkHits(G, f);
    updateProjectiles(G);
    updateTraps(G);
    for (const f of G.fighters) checkBlast(G, f);
    for (const p of G.parts) { p.x += p.vx; p.y += p.vy; if (p.type === 'spark') { p.vx *= 0.92; p.vy = p.vy * 0.92 + 0.15; } p.life--; }
    G.parts = G.parts.filter((p) => p.life > 0);
    if (G.shake > 0) G.shake *= 0.85;
    if (!G.over) {
      const left = G.fighters.filter((f) => !f.out);
      if (left.length <= 1 && G.fighters.length > 1) { G.over = true; G.endT = 150; G.winner = left[0] || null; G.slowmo = 60; }
    } else if (G.endT > 0) G.endT--;
  };

  function updateFighter(G, f) {
    if (f.out) return;
    if (f.dead > 0) { if (--f.dead === 0) respawn(G, f); return; }
    if (f.lag > 0) { f.lag--; return; }
    f.anim++;
    if (f.invuln > 0) f.invuln--;
    if (f.dodgeCd > 0) f.dodgeCd--;
    if (f.dropT > 0) f.dropT--;
    for (const k in f.cd) if (f.cd[k] > 0) f.cd[k]--;
    if (f.swapCd > 0) f.swapCd--;
    if (f.buff && --f.buff.t <= 0) f.buff = null;
    if (f.bubble && --f.bubble.t <= 0) f.bubble = null;
    const inp = f.inp, prev = f.prev;
    const pressed = (k) => inp[k] && !prev[k];
    const downPressed = inp.y > 0 && prev.y <= 0;

    // Floating after respawn: stay put until you move or time runs out.
    if (f.float > 0) {
      f.float--; f.vx = 0; f.vy = 0;
      if (inp.x || inp.y > 0 || pressed('jump') || pressed('attack') || pressed('special') || pressed('dodge')) f.float = 0;
      else return;
    }

    if (f.hitstun > 0) {
      f.hitstun--;
      f.vx += inp.x * 0.12; // a little drift so you can survive
    } else if (f.jsq > 0) {
      // jump squat: a few frames before leaving the ground so up+attack still does a ground attack
      if (pressed('attack')) { f.jsq = 0; startNormal(G, f, true); }
      else if (pressed('special')) { f.jsq = 0; startSpecial(G, f); }
      else if (--f.jsq === 0) { f.vy = -f.st.jump * (inp.jump ? 1 : 0.72); f.ground = null; MM.sfx('jump'); dust(G, f); }
    } else if (f.act) {
      tickAction(G, f);
    } else {
      const swapNow = f.forms && pressed('swap');
      if (swapNow) startSpecial(G, f, 'down');
      else if (pressed('attack')) startNormal(G, f);
      else if (pressed('special')) startSpecial(G, f);
      else if (pressed('dodge')) startDodge(G, f);
      else if (pressed('jump')) {
        if (f.ground) f.jsq = 4;
        else if (f.jumps > 0) { f.jumps--; f.vy = -f.st.jump * 0.92; f.ff = false; MM.sfx('jump'); ring(G, f.x, f.y, f.accent); }
      }
      if (!f.act) move(f, inp);
      if (!f.ground && downPressed && f.vy > -4) f.ff = true;
      if (f.ground && f.ground !== 'main' && downPressed) { f.ground = null; f.dropT = 14; f.y += 2; }
    }
    physics(G, f);
  }

  function move(f, inp) {
    const dir = inp.x;
    if (f.ground) {
      const target = dir * f.st.speed * speedMul(f);
      f.vx += clamp(target - f.vx, -1.5, 1.5);
      if (!dir) f.vx *= 0.72;
      if (dir) f.face = dir;
    } else {
      const target = dir * f.st.air * speedMul(f);
      if (dir) f.vx += clamp(target - f.vx, -0.55, 0.55); else f.vx *= 0.985;
    }
  }

  function physics(G, f) {
    const a = f.act;
    const launched = f.hitstun > 0;
    if (!f.ground && !(a && a.noGrav)) {
      f.vy += launched ? (f.vy < 0 ? 0.3 : GRAV_LAUNCH) : GRAV;
      const cap = f.ff && !launched ? FASTFALL : (a && a.maxFall) || MAXFALL;
      if (f.vy > cap && !(a && a.plunge)) f.vy = cap;
    }
    if (launched) { f.vx *= LAUNCH_DECAY; if (f.hitstun % 3 === 0 && Math.hypot(f.vx, f.vy) > 12) part(G, { x: f.x, y: f.y - f.h / 2, color: f.accent, size: 9, life: 22, max: 22, type: 'smoke' }); }
    else if (f.ground && a) f.vx *= a.slide || 0.82;

    const px = f.x, py = f.y;
    f.x += f.vx; f.y += f.vy;
    const m = G.stage.main;
    // the solid main floor
    if (f.vy >= 0 && py <= 0.5 && f.y >= 0 && f.x >= m.left && f.x <= m.right) land(G, f, 0, 'main');
    else if (f.y > 0 && f.y - f.h < m.depth && f.x + f.w / 2 > m.left && f.x - f.w / 2 < m.right) {
      if (px + f.w / 2 <= m.left + 1) { f.x = m.left - f.w / 2; f.vx = launched ? -f.vx * 0.5 : 0; }
      else if (px - f.w / 2 >= m.right - 1) { f.x = m.right + f.w / 2; f.vx = launched ? -f.vx * 0.5 : 0; }
      else if (py - f.h >= m.depth - 1) { f.y = m.depth + f.h; f.vy = Math.abs(f.vy) * 0.3; }
      else if (py <= 0.5) land(G, f, 0, 'main');
    }
    // pass-through platforms
    if (!f.ground && f.vy >= 0 && f.dropT <= 0 && !(f.inp.y > 0 && f.hitstun <= 0 && !f.act)) {
      for (const p of G.stage.plats) {
        if (py <= p.y + 0.5 && f.y >= p.y && f.x >= p.x && f.x <= p.x + p.w) { land(G, f, p.y, p); break; }
      }
    }
    // walking off an edge
    if (f.ground) {
      const g = f.ground === 'main' ? { x: m.left, w: m.right - m.left } : f.ground;
      if (f.x < g.x || f.x > g.x + g.w) { f.ground = null; f.jsq = 0; }
      else { f.y = f.ground === 'main' ? 0 : f.ground.y; f.vy = 0; }
    }
  }

  function land(G, f, y, g) {
    if (f.hitstun > 0 && f.vy > 9) { // bounce off the floor
      f.y = y; f.vy = -f.vy * 0.45; f.hitstun = Math.max(6, f.hitstun - 10); burst(G, f.x, y, '#ddd', 6, 3); return;
    }
    const hard = f.vy > 8;
    f.y = y; f.vy = 0; f.ground = g; f.jumps = AIR_JUMPS; f.upUsed = false; f.sideUsed = false; f.airDodged = false; f.ff = false;
    if (f.hitstun > 0) f.hitstun = Math.min(f.hitstun, 8);
    if (hard) dust(G, f);
    const a = f.act;
    if (a && a.type === 'normal' && a.air) f.act = { type: 'lag', t: 0, dur: 7, pose: 'land' };
    else if (a && a.onLand) a.onLand(G, f, a);
    else if (a && a.type === 'dodge' && a.air) f.act = null;
  }

  function dust(G, f) { for (let i = 0; i < 6; i++) part(G, { x: f.x + (Math.random() - 0.5) * f.w, y: f.y - 4, vx: (Math.random() - 0.5) * 4, vy: -Math.random() * 2, color: 'rgba(230,230,230,.8)', size: 8, life: 20, max: 20, type: 'smoke' }); }
  function ring(G, x, y, color) { part(G, { type: 'ring', x, y, color, size: 10, life: 16, max: 16 }); }

  // ---------- normal attacks ----------
  function startNormal(G, f, forceGround) {
    const inp = f.inp, onGround = f.ground || forceGround;
    let name;
    if (onGround) name = inp.y < 0 ? 'up' : inp.y > 0 ? 'down' : inp.x ? 'side' : 'jab';
    else name = inp.y < 0 ? 'uair' : inp.y > 0 ? 'dair' : inp.x ? 'fair' : 'nair';
    if (inp.x && (name === 'side' || name === 'fair')) f.face = inp.x;
    let m = MM.NORMALS[name];
    const ns = f.def.normalSpeed || 1;
    if (ns !== 1) m = Object.assign({}, m, { start: Math.round(m.start / ns), end: Math.round(m.end / ns) });
    f.act = { type: 'normal', name, m, t: 0, hit: new Set(), pose: m.pose, air: !onGround, dur: m.start + m.active + m.end };
    MM.sfx('swing');
  }

  function tickAction(G, f) {
    const a = f.act; a.t++;
    if (a.type === 'normal') {
      const m = a.m;
      if (a.t === m.start && m.lunge && f.ground) f.vx += f.face * m.lunge;
      a.box = a.t >= m.start && a.t < m.start + m.active ? boxFor(f, m.box) : null;
      a.hitProps = { dmg: m.dmg, kb: m.kb, kbg: m.kbg, ang: m.ang };
      if (a.air) move(f, f.inp);
      if (a.t >= a.dur) f.act = null;
    } else if (a.type === 'lag') {
      if (a.t >= a.dur) f.act = null;
    } else if (a.type === 'swap') {
      f.vx *= 0.85;
      if (a.t === 10) {
        applyForm(f, (f.formIdx + 1) % f.forms.length);
        burst(G, f.x, f.y - f.h / 2, f.accent, 26, 7); ring(G, f.x, f.y - f.h / 2, f.color);
        popText(G, f.x, f.y - f.h - 24, f.def.formName || 'SWITCH!', f.accent); MM.sfx('heal');
      }
      if (a.t >= a.dur) { f.act = null; a.noGrav = false; }
    } else if (a.type === 'dodge') {
      f.invuln = a.t >= a.iv[0] && a.t <= a.iv[1] ? 2 : f.invuln;
      if (a.air) { if (a.t > 14) { a.noGrav = false; f.vx *= 0.9; } else { f.vx *= 0.93; f.vy *= 0.93; } }
      else if (a.roll) f.vx = a.roll * Math.max(0, 9 - a.t * 0.3);
      if (a.t >= a.dur) { f.act = null; f.dodgeCd = 30; }
    } else if (a.type === 'special') {
      a.box = null;
      const A = ABILITIES[a.sp.kind];
      A.tick(G, f, a.sp, a);
      if (f.act === a && a.t >= a.dur) f.act = null;
    }
  }

  // ---------- dodge ----------
  function startDodge(G, f) {
    if (f.dodgeCd > 0) return;
    const inp = f.inp;
    if (f.ground) {
      if (inp.x) f.act = { type: 'dodge', t: 0, dur: 24, iv: [3, 17], roll: inp.x, pose: 'roll', slide: 1 };
      else f.act = { type: 'dodge', t: 0, dur: 22, iv: [2, 16], pose: 'guard' };
    } else {
      if (f.airDodged) return;
      f.airDodged = true;
      const len = Math.hypot(inp.x, inp.y) || 1;
      f.vx = (inp.x / len) * 10; f.vy = (inp.y / len) * 10; f.ff = false;
      f.act = { type: 'dodge', t: 0, dur: 26, iv: [2, 16], air: true, noGrav: true, pose: 'guard' };
    }
    MM.sfx('dodge');
  }

  // ---------- specials ----------
  function startSpecial(G, f, forced) {
    const inp = f.inp;
    const slot = forced || (inp.y < 0 ? 'up' : inp.y > 0 ? 'down' : inp.x ? 'side' : 'neutral');
    if (forced && (!f.def.specials[slot] || f.def.specials[slot].kind !== 'transform')) return;
    const sp = f.def.specials[slot];
    if (!sp || f.cd[slot] > 0) return;
    if (slot === 'up' && f.upUsed) return;
    if (slot === 'side' && !f.ground && f.sideUsed) return;
    const A = ABILITIES[sp.kind];
    if (!A) return;
    if (inp.x) f.face = inp.x;
    if (slot === 'up') f.upUsed = true;
    if (slot === 'side' && !f.ground) f.sideUsed = true;
    if (sp.cd) f.cd[slot] = sp.cd;
    f.ff = false;
    const a = { type: 'special', slot, sp, t: 0, dur: 30, hit: new Set(), pose: 'cast' };
    f.act = a;
    A.start(G, f, sp, a);
    if (f.act === a && sp.name) { a.label = sp.name; }
    MM.sfx('special');
  }

  function spawnProj(G, f, o) {
    G.projs.push(Object.assign({ owner: f, x: f.x + f.face * 34 * f.s, y: f.y - 70 * f.s, vx: f.face * 10, vy: 0, r: 14, dmg: 6, kb: 5, kbg: 0.05, ang: 30, life: 70, grav: 0, color: f.accent, hit: new Set(), t: 0 }, o));
  }

  // Every ability kind. start() sets it up, tick() runs every frame.
  // a.box = a hitbox this frame (world rect), a.hitProps = what it does on hit.
  const ABILITIES = {
    projectile: {
      start(G, f, sp, a) { a.dur = 26; a.pose = 'throw'; },
      tick(G, f, sp, a) {
        if (!f.ground) { f.vy = Math.min(f.vy, 2); f.vx *= 0.95; }
        if (a.t === 9) {
          const n = sp.count || 1;
          for (let i = 0; i < n; i++) {
            const ang = n > 1 ? (i - (n - 1) / 2) * (sp.spread || 0.2) : 0;
            spawnProj(G, f, { vx: Math.cos(ang) * sp.speed * f.face, vy: (sp.vy || 0) + Math.sin(ang) * sp.speed, r: sp.r || 14, dmg: sp.dmg, kb: sp.kb, kbg: sp.kbg, ang: sp.ang || 35, life: sp.life || 70, grav: sp.grav || 0, emoji: sp.emoji, sprite: sp.sprite, boomer: sp.boomerang, pull: sp.pull, line: sp.line, dir: f.face });
          }
        }
      },
    },
    shockwave: {
      start(G, f, sp, a) {
        if (!f.ground) { f.act = null; ABILITIES.slam.start(G, f, sp, (f.act = a)); a.sp = Object.assign({}, sp, { kind: 'slam' }); return; }
        a.dur = 34; a.pose = 'slam';
      },
      tick(G, f, sp, a) {
        if (a.t === 12) {
          for (const d of [-1, 1]) spawnProj(G, f, { x: f.x + d * 30, y: f.y - 18, vx: d * sp.speed, r: 20, dmg: sp.dmg, kb: sp.kb, kbg: sp.kbg, ang: 60, life: 60, ground: true, dir: d });
          G.shake = Math.max(G.shake, 8); dust(G, f);
        }
      },
    },
    dash: {
      start(G, f, sp, a) { a.dur = 6 + sp.dur + 12; a.pose = 'dash'; },
      tick(G, f, sp, a) {
        const go = a.t >= 6 && a.t < 6 + sp.dur;
        a.noGrav = !f.ground && a.t < 6 + sp.dur;
        a.armor = sp.armor && go;
        if (a.t < 6) { f.vx *= 0.6; if (!f.ground) f.vy *= 0.5; }
        else if (go) {
          f.vx = f.face * sp.speed; if (!f.ground) f.vy = 0;
          a.box = boxFor(f, sp.box || [-10, -100, 70, 92]);
          a.hitProps = { dmg: sp.dmg, kb: sp.kb, kbg: sp.kbg, ang: sp.ang || 35 };
          if (a.t % 2 === 0) part(G, { x: f.x - f.face * 20, y: f.y - f.h * 0.5, color: f.color, size: 12, life: 14, max: 14, type: 'smoke' });
        } else { f.vx *= 0.85; a.pose = 'idle'; }
        a.slide = 1;
      },
    },
    rise: {
      start(G, f, sp, a) { a.dur = 34; a.pose = 'uppercut'; },
      tick(G, f, sp, a) {
        if (a.t < 4) { f.vx *= 0.5; f.vy = Math.min(f.vy, 0); }
        if (a.t === 4) { f.vy = -sp.power; f.ground = null; f.vx = f.face * (sp.forward || 2) + f.inp.x * 3; ring(G, f.x, f.y, f.accent); }
        if (a.t > 4) f.vx += clamp(f.inp.x * f.st.air - f.vx, -0.4, 0.4);
        if (a.t >= 4 && a.t < 20 && sp.dmg) {
          a.box = boxFor(f, [-34, -140, 90, 110]);
          a.hitProps = { dmg: sp.dmg, kb: sp.kb, kbg: sp.kbg, ang: 80 };
        }
        // parachute: float down slowly after the launch; attack, special or jump lets go
        if (sp.parachute && a.t > 16 && f.vy > 0 && !f.ground) {
          a.chute = true; a.maxFall = 2.4; a.dur = Math.max(a.dur, a.t + 2);
          if (a.t > 220 || (f.inp.attack && !f.prev.attack) || (f.inp.jump && !f.prev.jump) || (f.inp.special && !f.prev.special)) { a.chute = false; f.act = null; }
        }
        if (!a.onLand) a.onLand = (G, f, a) => { if (a.chute) f.act = null; };
      },
    },
    teleport: {
      start(G, f, sp, a) { a.dur = 26; a.pose = 'idle'; a.noGrav = true; burst(G, f.x, f.y - f.h / 2, f.accent, 14, 5); },
      tick(G, f, sp, a) {
        f.vx = 0; f.vy = 0;
        a.hidden = a.t < 10; if (a.hidden) f.invuln = Math.max(f.invuln, 2);
        if (a.t === 10) {
          let dx = f.inp.x, dy = f.inp.y;
          if (!dx && !dy) { if (sp.up) dy = -1; else dx = f.face; }
          if (sp.up && dy > 0) dy = -1;
          const len = Math.hypot(dx, dy); dx /= len; dy /= len;
          let nx = f.x + dx * sp.dist, ny = f.y + dy * sp.dist;
          if (insideMain(G, nx, ny)) ny = 0;
          f.x = nx; f.y = ny; f.ground = null;
          if (Math.abs(ny) < 1 && nx >= G.stage.main.left && nx <= G.stage.main.right) land(G, f, 0, 'main');
          burst(G, f.x, f.y - f.h / 2, f.accent, 14, 5);
        }
        if (a.t >= 10 && a.t < 16 && sp.dmg) { a.box = boxFor(f, [-60, -120, 120, 120]); a.hitProps = { dmg: sp.dmg, kb: sp.kb, kbg: sp.kbg, ang: 50 }; }
        if (a.t > 14) a.noGrav = false;
      },
    },
    slam: {
      start(G, f, sp, a) {
        a.dur = 120; a.pose = 'slam'; a.noGrav = true;
        if (f.ground) { f.ground = null; f.y -= 2; a.hop = true; }
        a.onLand = (G, f, a) => { if (a.plunge && !a.landed) { a.landed = a.t; a.plunge = false; a.hit.clear(); G.shake = Math.max(G.shake, 12); dust(G, f); burst(G, f.x, f.y, f.accent, 16, 7); } };
      },
      tick(G, f, sp, a) {
        if (a.landed) { // shockwave after landing
          if (a.t - a.landed < 10) { a.box = { x: f.x - 110 * f.s, y: f.y - 50, w: 220 * f.s, h: 50 }; a.hitProps = { dmg: sp.dmg * 0.7, kb: sp.kb, kbg: sp.kbg * 0.8, ang: 55 }; }
          if (a.t - a.landed > 22) f.act = null;
          return;
        }
        if (a.t < 10) { f.vx *= 0.8; f.vy = a.hop ? -8 + a.t : -1; }
        else { f.vy = 23; f.vx *= 0.9; a.plunge = true; a.box = boxFor(f, [-34, -60, 68, 70]); a.hitProps = { dmg: sp.dmg, kb: sp.kb, kbg: sp.kbg, ang: -70 }; }
        a.noGrav = a.t < 10;
      },
    },
    spin: {
      start(G, f, sp, a) { a.dur = sp.dur + 12; a.pose = 'spin'; },
      tick(G, f, sp, a) {
        if (!f.ground) f.vy = Math.min(f.vy, 1.5);
        f.vx += clamp(f.inp.x * f.st.air * 0.8 - f.vx, -0.5, 0.5);
        a.slide = 0.95;
        if (a.t < sp.dur) {
          const every = Math.max(3, Math.floor(sp.dur / sp.hits));
          if (a.t % every === 0) a.hit.clear();
          const last = a.t >= sp.dur - every;
          a.box = boxFor(f, [-70, -110, 140, 104]);
          a.hitProps = last ? { dmg: sp.dmg + 2, kb: sp.kb, kbg: sp.kbg, ang: 50 } : { dmg: sp.dmg, kb: 2.5, kbg: 0, ang: 80, light: true };
        } else a.pose = 'idle';
      },
    },
    pack: { // a pack of runners (e.g. dogs) that dash along the floor, each hitting once
      start(G, f, sp, a) { a.dur = 36; a.pose = 'cast'; },
      tick(G, f, sp, a) {
        if (!f.ground) f.vy = Math.min(f.vy, 2);
        if (a.t === 12) {
          const n = (sp.sprites || [null]).length;
          for (let i = 0; i < n; i++) {
            spawnProj(G, f, { x: f.x + f.face * (20 - i * 34), y: f.y - 18, vx: f.face * (sp.speed + i * 0.7), vy: 0, r: 20, dmg: sp.dmg, kb: sp.kb, kbg: sp.kbg, ang: 45, life: sp.life || 95, ground: true, fall: true, sprite: sp.sprites && sp.sprites[i], emoji: sp.emoji, dir: f.face, runner: true });
          }
          MM.sfx('jump');
        }
      },
    },
    transform: { // e.g. Mandi's Wardrobe Whirl: a vulnerable spin that ends in the other form
      start(G, f, sp, a) { a.dur = sp.dur || 39; a.pose = 'flex'; a.cdAfter = sp.cdAfter || 120; },
      tick(G, f, sp, a) {
        if (!f.ground) f.vy = Math.min(f.vy, 2.5);
        f.vx *= 0.85;
        if (a.t === 20) { burst(G, f.x, f.y - f.h / 2, f.accent, 18, 6); MM.sfx('heal'); }
        if (a.t === a.dur - 1 && f.forms) { // completed (a hit before now cancels it and keeps the old form)
          applyForm(f, (f.formIdx + 1) % f.forms.length);
          f.cd.down = a.cdAfter; ring(G, f.x, f.y - f.h / 2, f.color);
          popText(G, f.x, f.y - f.h - 24, f.def.formName || 'SWITCH!', f.accent);
        }
      },
    },
    counter: {
      start(G, f, sp, a) { a.dur = sp.window + 20; a.pose = 'guard'; a.counter = true; a.window = sp.window; },
      tick(G, f, sp, a) { if (!f.ground) f.vy = Math.min(f.vy, 2); if (a.t > a.window) a.counter = false; },
    },
    heal: {
      start(G, f, sp, a) { a.dur = 50; a.pose = 'guard'; },
      tick(G, f, sp, a) {
        if (!f.ground) f.vy = Math.min(f.vy, 1);
        if (a.t % 5 === 0) part(G, { type: 'text', text: '+', x: f.x + (Math.random() - 0.5) * 60, y: f.y - Math.random() * f.h, vy: -1.5, color: '#5dff8f', size: 22, life: 30, max: 30 });
        if (a.t === 40) { const amt = Math.min(f.damage, sp.amount); f.damage -= amt; popText(G, f.x, f.y - f.h - 20, `-${Math.round(amt)}%`, '#5dff8f'); MM.sfx('heal'); }
      },
    },
    trap: {
      start(G, f, sp, a) { a.dur = 22; a.pose = 'throw'; },
      tick(G, f, sp, a) {
        if (a.t === 10) {
          G.traps = G.traps.filter((t) => t.owner !== f);
          G.traps.push({ owner: f, x: f.x + f.face * 40, y: f.y - 2, vy: 0, sp, life: sp.life || 600, armed: 20, dir: f.face });
        }
      },
    },
    buff: {
      start(G, f, sp, a) { a.dur = 30; a.pose = 'flex'; },
      tick(G, f, sp, a) {
        if (a.t === 15) { f.buff = { t: sp.dur, speedMul: sp.speedMul || 1.3, powerMul: sp.powerMul || 1.2, color: f.accent }; popText(G, f.x, f.y - f.h - 20, sp.name || 'POWER UP!', f.accent); burst(G, f.x, f.y - f.h / 2, f.accent, 20, 6); }
      },
    },
  };
  MM.ABILITIES = ABILITIES;

  // ---------- hits ----------
  function checkHits(G, f) {
    const a = f.act;
    if (!a || !a.box || f.dead || f.out || f.lag) return;
    for (const d of G.fighters) {
      if (d === f || d.dead || d.out || a.hit.has(d) || d.invuln > 0) continue;
      if (overlap(a.box, MM.hurtbox(d))) {
        a.hit.add(d);
        applyHit(G, f, d, Object.assign({ face: f.face }, a.hitProps), a.box.x + a.box.w / 2, a.box.y + a.box.h / 2);
      }
    }
  }

  function applyHit(G, att, def, h, hx, hy, proj) {
    if (def.invuln > 0 || def.dead || def.out) return false;
    const da = def.act;
    if (da && da.counter) { // counter!
      if (proj) { proj.owner = def; proj.vx = -proj.vx * 1.2; proj.dir = -proj.dir; proj.hit = new Set(); proj.life = 90; }
      else if (att) {
        def.face = sgn(att.x - def.x);
        applyHit(G, def, att, { dmg: h.dmg * (da.sp.mult || 1.3) + 3, kb: 9, kbg: 0.13, ang: 40, face: def.face }, att.x, att.y - att.h / 2);
      }
      def.act = { type: 'lag', t: 0, dur: 14, pose: 'punch', countered: true }; def.invuln = 20;
      popText(G, def.x, def.y - def.h - 20, 'COUNTER!', '#fff36b'); MM.sfx('counter');
      return false;
    }
    const dmg = h.dmg * (att ? power(att) : 1);
    def.damage = Math.min(999, def.damage + dmg);
    if (att) { att.dealt += dmg; def.lastHit = att.slot; def.lastHitT = G.frame; }
    burst(G, hx, hy, '#fff', 4 + (dmg | 0), 4 + dmg * 0.3);
    if (da && da.armor && dmg < 15) { MM.sfx('hit', 0.3); def.lag = 3; return true; }
    let kb = (h.kb + h.kbg * def.damage * (0.6 + dmg / 25)) / def.st.weight;
    if (h.light) kb = h.kb;
    const dir = h.face != null ? h.face : sgn(def.x - hx);
    const r = (h.ang * Math.PI) / 180;
    def.vx = Math.cos(r) * kb * dir;
    def.vy = -Math.sin(r) * kb;
    if (def.ground && def.vy > 0) def.vy = -def.vy * 0.6;
    if (def.vy < 0) def.ground = null;
    def.hitstun = Math.min(90, Math.floor(kb * 2.4));
    def.act = null; def.jsq = 0; def.ff = false; def.upUsed = false; def.sideUsed = false; def.float = 0;
    const lag = Math.min(14, Math.floor(3 + dmg * 0.35));
    def.lag = lag; if (att && !proj) att.lag = lag;
    G.shake = Math.max(G.shake, Math.min(22, kb * 0.6));
    if (kb > 22) { G.freeze = 5; part(G, { type: 'ring', x: hx, y: hy, color: '#fff', size: 20, life: 18, max: 18 }); }
    MM.sfx('hit', Math.min(1.5, kb / 20));
    return true;
  }
  MM.applyHit = applyHit;

  function updateProjectiles(G) {
    for (const p of G.projs) {
      p.t++; p.life--;
      if (p.boomer && p.t > 20) { const back = sgn(p.owner.x - p.x); p.vx += back * 0.55; p.vy += clamp((p.owner.y - 70 - p.y) * 0.01, -0.4, 0.4); if (p.t > 40 && Math.hypot(p.owner.x - p.x, p.owner.y - 70 - p.y) < 50) p.life = 0; }
      p.vy += p.grav;
      p.x += p.vx; p.y += p.vy;
      if (p.ground) {
        const s = surfaceBelow(G, p.x, p.y + 10);
        if (s !== null && s <= p.y + 22 + Math.max(0, p.vy)) { p.y = s - 18; p.vy = 0; }
        else if (p.fall) p.vy += 0.6;
        else p.life = 0;
      }
      if (insideMain(G, p.x, p.y + p.r * 0.5)) { p.life = 0; burst(G, p.x, p.y, p.color, 6, 3); }
      const box = { x: p.x - p.r, y: p.y - p.r, w: p.r * 2, h: p.r * 2 };
      for (const d of G.fighters) {
        if (d === p.owner || d.dead || d.out || p.hit.has(d) || d.invuln > 0) continue;
        if (overlap(box, MM.hurtbox(d))) {
          p.hit.add(d);
          const ok = applyHit(G, p.owner, d, { dmg: p.dmg, kb: p.kb, kbg: p.kbg, ang: p.ang, face: p.pull ? sgn(p.owner.x - d.x) : sgn(p.vx || p.dir) }, p.x, p.y, p);
          if (ok && !p.ground) p.life = 0;
        }
      }
      if (Math.abs(p.x) > 3000 || p.y > 1500) p.life = 0;
    }
    G.projs = G.projs.filter((p) => p.life > 0);
  }

  function updateTraps(G) {
    for (const t of G.traps) {
      t.life--; if (t.armed > 0) t.armed--;
      const s = surfaceBelow(G, t.x, t.y);
      if (s === null || t.y < s) { t.vy += 0.6; t.y += t.vy; if (s !== null && t.y >= s) { t.y = s; t.vy = 0; } }
      if (t.y > 1500) t.life = 0;
      if (t.armed > 0) continue;
      const box = { x: t.x - 22, y: t.y - 30, w: 44, h: 30 };
      for (const d of G.fighters) {
        if (d === t.owner || d.dead || d.out || d.invuln > 0) continue;
        if (overlap(box, MM.hurtbox(d))) {
          applyHit(G, t.owner, d, { dmg: t.sp.dmg, kb: t.sp.kb, kbg: t.sp.kbg, ang: t.sp.ang || 70, face: t.sp.gust ? t.dir : sgn(d.vx || 1) }, t.x, t.y - 15, true);
          t.life = 0; break;
        }
      }
    }
    G.traps = G.traps.filter((t) => t.life > 0);
  }

  // ---------- KOs ----------
  function checkBlast(G, f) {
    if (f.dead || f.out) return;
    const b = G.stage.blast;
    if (Math.abs(f.x) > b.side || f.y > b.bottom || (f.y < b.top && f.hitstun > 0)) {
      if (f.y < b.top) f.y = b.top; // stay inside for the effect
      f.stocks--; f.falls++;
      const killer = G.fighters.find((o) => o.slot === f.lastHit && G.frame - f.lastHitT < 600 && o !== f);
      if (killer) { killer.kos++; killer.bubble = { text: killer.def.taunt || 'Yes!', t: 120 }; }
      const ex = clamp(f.x, -b.side, b.side), ey = clamp(f.y, b.top, b.bottom);
      G.kos = G.kos || []; G.kos.push({ x: ex, y: ey, color: MM.PLAYER_COLORS[f.slot], t: 50 });
      burst(G, ex, ey, MM.PLAYER_COLORS[f.slot], 40, 14);
      G.shake = 26; MM.sfx('ko');
      f.act = null; f.hitstun = 0; f.buff = null; f.vx = f.vy = 0;
      if (f.stocks <= 0) { f.out = true; f.x = 0; f.y = -3000; }
      else { f.dead = 80; f.y = -3000; }
    }
  }

  function respawn(G, f) {
    const xs = [-180, 180, -60, 60];
    f.x = xs[f.slot % 4]; f.y = -430; f.vx = f.vy = 0; f.damage = 0; f.ground = null;
    f.float = 150; f.invuln = 150; f.jumps = AIR_JUMPS; f.upUsed = false; f.sideUsed = false; f.airDodged = false;
    f.act = null; f.hitstun = 0; f.lastHit = -1;
  }
})();
