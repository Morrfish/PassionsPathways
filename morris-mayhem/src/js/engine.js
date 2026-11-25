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
  MM.TEAM_COLORS = { A: '#ff5a5a', B: '#3c8dff' };
  MM.ENTRANCE = 54; // frames of entrance poses before "3"
  MM.TAUNT = 39;    // 0.65 s
  // opts: { teams: true for 2v2 (players carry team 'A'/'B'), ff: friendly fire, time: seconds (0 = no limit) }
  MM.newGame = function (players, stageId, stocks, opts = {}) {
    const def = MM.STAGES.find((s) => s.id === stageId) || MM.STAGES[0];
    // each match gets its own copy of the platforms (some of them move)
    const stage = Object.assign({}, def, { plats: def.plats.map((p) => Object.assign({}, p, { x0: p.x, y0: p.y, dx: 0, dy: 0 })) });
    const G = { practice: !!opts.practice, opts, stage, fighters: [], teams: !!opts.teams, ff: !!opts.ff, timeLeft: (opts.time || 0) * 60, projs: [], traps: [], parts: [], frame: 0, shake: 0, over: false, endT: 0, freeze: 0, countdown: 150 + MM.ENTRANCE, slowmo: 0 };
    const used = {};
    const n = players.length, span = Math.min(stage.main.right - stage.main.left - 200, 260 * (n - 1));
    players.forEach((p, i) => {
      const def = MM.FIGHTERS.find((d) => d.id === p.fighter) || MM.FIGHTERS[0];
      const alt = used[def.id] = (used[def.id] || 0) + 1;
      const x = MM.spawnX(stage) + (n === 1 ? 0 : -span / 2 + (span * i) / (n - 1));
      const f = makeFighter(p, def, x, alt > 1, p.stocks || stocks);
      f.boss = p.boss || null; f.stocks0 = f.stocks; f.dummy = !!p.dummy;
      f.team = G.teams ? p.team || (p.slot % 2 ? 'B' : 'A') : null;
      G.fighters.push(f);
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
  // Super Saiyan timer: runs during everything (even an ultimate); when it ends: power-down pose, then the
  // normal form and the cost (rising-damage game: + sp.cost %), once. A hit during the power-down finishes it.
  function superTick(G, f) {
    const s = f.super, a = f.act;
    if (s.ending) { if (!a || a.type !== 'powerdown') endSuper(G, f); return; }
    if (--s.t > 0 || (a && a.type === 'ult')) return;
    s.ending = true;
    if (!a || a.type !== 'ult') f.act = { type: 'powerdown', t: 0, dur: 40, pose: 'flex' };
  }
  function endSuper(G, f) {
    const sp = f.super.sp; f.super = null;
    applyForm(f, 0);
    f.damage = Math.min(999, f.damage + sp.cost); f.cd.down = sp.cooldown;
    popText(G, f.x, f.y - f.h - 24, `+${sp.cost}%`, '#ff7a7a');
    if (f.act && f.act.type === 'powerdown') f.act = null;
  }
  function startSwap(G, f) {
    f.act = { type: 'swap', t: 0, dur: 22, pose: 'flex', noGrav: !f.ground };
    f.vy = Math.min(f.vy, 0); f.swapCd = 75;
  }
  // Codee's Mess Meter (0-100, separate from the ultimate meter): landscaping moves add a little when they
  // come out and a bit more once if they land. Full = he can clean up into the Clean Freak.
  function addMess(G, f, n) {
    if (!f.def.mess || f.formIdx !== 0 || f.mess >= 100) return;
    f.mess = Math.min(100, (f.mess || 0) + n);
    if (f.mess >= 100) { popText(G, f.x, f.y - f.h - 24, f.def.mess.ready || 'CLEAN UP!', f.def.mess.color || '#bfe9ff'); MM.sfx('heal'); }
  }
  // Clean Freak timer: keeps running in an ultimate (that finishes in the form it started in); then back to work.
  function cleanTick(G, f) {
    if (f.clean > 0) { f.clean--; return; }
    const a = f.act;
    if (a && (a.type === 'ult' || a.type === 'backwork')) return;
    if (!a && !f.hitstun && !f.caught) f.act = { type: 'backwork', t: 0, dur: f.def.mess.backDur || 21, noGrav: !f.ground };
    else if (!a || a.type !== 'normal' && a.type !== 'special') backToWork(G, f); // got hit: change right away
  }
  function nextForm(G, f) { // Cole: Thor -> Cap -> Iron Man (never back to the plain tee); Cloe: all six colours
    const from = f.def.cycle === 'all' ? 0 : 1;
    applyForm(f, f.formIdx >= f.forms.length - 1 ? from : f.formIdx + 1); f.swapCd = 48;
    f.act = { type: 'shirt', t: 0, dur: f.def.cycle === 'all' ? 18 : 15, noGrav: !f.ground }; popText(G, f.x, f.y - f.h - 24, f.def.formName, f.accent); burst(G, f.x, f.y - f.h / 2, f.accent, 12, 5); MM.sfx('special');
  }
  // Sabir's costume pieces: a bit per piece; all of them starts the transformation right away
  function collectPiece(G, f, i) {
    const ms = f.def.mess; if (f.formIdx !== 0) return;
    f.pieces = (f.pieces || 0) | (1 << i);
    let n = 0; for (let k = 0; k < ms.pieces; k++) if ((f.pieces >> k) & 1) n++;
    f.mess = Math.round((n / ms.pieces) * 100);
    popText(G, f.x, f.y - f.h - 24, n + ' / ' + ms.pieces, ms.color || f.accent); MM.sfx('heal'); burst(G, f.x, f.y - f.h * 0.6, ms.color || f.accent, 10, 4);
    if (n >= ms.pieces && !f.dead && !(f.act && f.act.type === 'ult')) { f.act = { type: 'cleanup', t: 0, dur: ms.cupDur || 33, noGrav: !f.ground }; f.vy = Math.min(f.vy, 0); }
  }
  function sleepPulse(G, f) { // male opponents close by doze off for a moment (a hit wakes them)
    const sl = f.def.mess.sleep, r = sl.radius * f.h;
    for (const d of G.fighters) {
      if (d === f || d.dead || d.out || d.invuln > 0 || !d.def.male || MM.sameTeam(G, f, d) || (d.sleepCd || 0) > G.frame) continue;
      if (Math.hypot(d.x - f.x, (d.y - d.h / 2) - (f.y - f.h / 2)) > r) continue;
      d.act = null; d.hitstun = Math.max(d.hitstun, sl.t); d.vx = 0; d.sleepCd = G.frame + 300;
      popText(G, d.x, d.y - d.h - 20, 'Zzz...', '#c9b6ff');
    }
  }
  // ---------- Mayhem Stars (power-up pickups for Jeff and Patty) ----------
  function tickItems(G) {
    G.items = G.items || [];
    if (G.countdown > 0 || G.over) return;
    const want = G.fighters.some((f) => f.def.powerup && !f.out);
    G.itemT = (G.itemT == null ? (G.practice ? 180 : 600) : G.itemT) - 1;
    if (want && !G.items.length && G.itemT <= 0 && !G.fighters.some((f) => f.powerT > 0)) {
      const m = G.stage.main, x = m.left + 120 + Math.random() * (m.right - m.left - 240);
      G.items.push({ x, y: -500, vy: 0, life: 900 });
      G.itemT = G.practice ? 300 : 1200 + Math.floor(Math.random() * 600);
    }
    for (const it of G.items) {
      it.life--;
      const s = surfaceBelow(G, it.x, it.y);
      if (s === null || it.y < s) { it.vy = Math.min(it.vy + 0.35, 6); it.y += it.vy; if (s !== null && it.y >= s) { it.y = s; it.vy = 0; } }
      if (it.y > 1500) it.life = 0;
      const box = { x: it.x - 28, y: it.y - 56, w: 56, h: 56 };
      for (const f of G.fighters) {
        if (!f.def.powerup || f.dead || f.out || f.formIdx || f.powerT > 0 || !overlap(box, MM.hurtbox(f))) continue;
        it.life = 0; burst(G, it.x, it.y - 28, '#ffd34a', 16, 6);
        if (!f.act || f.act.type === 'normal') f.act = { type: 'powerup', t: 0, dur: 36, noGrav: !f.ground }; else { applyForm(f, 1); f.powerT = f.def.powerup.frames; }
        break;
      }
    }
    G.items = G.items.filter((it) => it.life > 0);
  }

  function backToWork(G, f) {
    const ex = f.def.mess.exhaust; // e.g. Siren: out of ideas, can't move or act for exactly 2 s (still gets hit and knocked around)
    applyForm(f, 0); f.clean = 0; f.mess = 0; f.pieces = 0;
    if (ex) f.exhaust = ex;
    const ta = f.def.mess.tiredAfter; // e.g. Kevin: worn out after the superfan form, slower for exactly 10 s (can still fight)
    if (ta) { f.tiredT = ta.t; f.tiredMul = ta.mul; }
    burst(G, f.x, f.y - f.h / 2, f.def.mess.color || '#bfe9ff', 16, 5); popText(G, f.x, f.y - f.h - 24, f.def.mess.back || 'BACK TO WORK!', f.accent);
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
      meter: 0, caught: null, kos: 0, falls: 0, dealt: 0, lastHit: -1, lastHitT: 0, anim: 0, bubble: null, ai: {},
    };
  }
  const blankInput = () => ({ x: 0, y: 0, jump: false, attack: false, special: false, dodge: false, swap: false, ult: false, taunt: false, pause: false });

  // ---------- helpers ----------
  const power = (f) => f.st.power * (f.buff ? f.buff.powerMul : 1);
  const speedMul = (f) => (f.buff ? f.buff.speedMul : 1) * (f.slow ? f.slow.mul : 1) * (f.tiredT > 0 ? f.tiredMul : 1);
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
  // stages that aren't centered (e.g. the Agnew dock) say where the middle of their floor is and
  // give left/right blast lines instead of one `side`
  MM.spawnX = (s) => (s.spawnX !== undefined ? s.spawnX : 0);
  MM.blastLeft = (b) => (b.left !== undefined ? b.left : -b.side);
  MM.blastRight = (b) => (b.right !== undefined ? b.right : b.side);
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
      f.inp = f.dummy ? blankInput() : f.cpu ? MM.aiThink(G, f) : MM.readDevice(f.dev); // practice dummy: stands still
      if (G.countdown > 0 || G.over || f.exhaust > 0) f.inp = blankInput(); // exhausted: no moving or acting
    }
    movePlatforms(G);
    tickItems(G);
    for (const f of G.fighters) updateFighter(G, f);
    if (G.practice) for (const f of G.fighters) if (!f.cpu && !(f.act && f.act.type === 'ult')) f.meter = 100; // practice: the Ultimate is always ready
    for (const f of G.fighters) checkHits(G, f);
    updateProjectiles(G);
    updateTraps(G);
    for (const f of G.fighters) checkBlast(G, f);
    for (const p of G.parts) { p.x += p.vx; p.y += p.vy; if (p.type === 'spark') { p.vx *= 0.92; p.vy = p.vy * 0.92 + 0.15; } p.life--; }
    G.parts = G.parts.filter((p) => p.life > 0);
    if (G.shake > 0) G.shake *= 0.85;
    if (G.ultBanner && --G.ultBanner.t <= 0) G.ultBanner = null;
    if (G.flash > 0) G.flash--;
    if (!G.over) {
      const left = G.fighters.filter((f) => !f.out);
      const end = (winner, team) => { G.over = true; G.endT = 150; G.winner = winner; G.winTeam = team; G.slowmo = 60; };
      if (G.opts.heroSlot != null && G.fighters.find((f) => f.slot === G.opts.heroSlot && f.out)) end(null, null); // story: the hero is out
      else if (G.teams) { // a team is out only when every member is out
        const teamsLeft = [...new Set(left.map((f) => f.team))];
        if (teamsLeft.length <= 1) end(null, teamsLeft[0] || null);
      } else if (left.length <= 1 && G.fighters.length > 1) end(left[0] || null, null);
      if (!G.over && G.timeLeft > 0 && G.countdown <= 0 && --G.timeLeft === 0) { // time up: most lives, then least damage
        const score = (fs) => [fs.reduce((n, f) => n + Math.max(0, f.stocks), 0), -fs.reduce((n, f) => n + (f.out ? 0 : f.damage), 0)];
        const groups = G.teams ? ['A', 'B'].map((t) => ({ t, s: score(G.fighters.filter((f) => f.team === t)) })) : G.fighters.map((f) => ({ f, s: score([f]) }));
        groups.sort((a, b) => b.s[0] - a.s[0] || b.s[1] - a.s[1]);
        const tie = groups.length > 1 && groups[0].s[0] === groups[1].s[0] && groups[0].s[1] === groups[1].s[1];
        end(tie ? null : groups[0].f || null, tie ? null : groups[0].t || null); G.timeUp = true;
      }
    } else if (G.endT > 0) G.endT--;
  };

  // Swaying platforms (the Agnew Lake boat). Anyone standing on one rides along.
  function movePlatforms(G) {
    for (const p of G.stage.plats) {
      if (!p.move) continue;
      const a = (G.frame / p.move.period) * Math.PI * 2;
      const nx = p.x0 + p.move.ax * Math.sin(a), ny = p.y0 + p.move.ay * Math.sin(a * 2);
      p.dx = nx - p.x; p.dy = ny - p.y; p.x = nx; p.y = ny;
      for (const f of G.fighters) if (f.ground === p && !f.dead && !f.out) { f.x += p.dx; f.y = p.y; }
      for (const t of G.traps) if (t.y === p.y - p.dy && t.x >= p.x - p.dx && t.x <= p.x - p.dx + p.w) { t.x += p.dx; t.y = p.y; }
    }
  }

  function updateFighter(G, f) {
    if (f.out) return;
    if (f.dead > 0) { if (--f.dead === 0) respawn(G, f); return; }
    if (f.lag > 0) { f.lag--; return; }
    if (f.caught) { // held by someone's ultimate until its finisher (or until it is cancelled)
      const o = f.caught;
      if (o.dead || o.out || !o.act || o.act.type !== 'ult') f.caught = null;
      else { f.vx = 0; f.vy = 0; f.anim++; f.x += (Math.random() - 0.5) * 2; return; }
    }
    f.anim++;
    if (f.exhaust > 0) f.exhaust--;
    if (f.phaseIn > 0) f.phaseIn--;
    if (f.tiredT > 0) f.tiredT--; // one fixed deadline: hits don't restart it
    if (f.invuln > 0) f.invuln--;
    if (f.dodgeCd > 0) f.dodgeCd--;
    if (f.dropT > 0) f.dropT--;
    for (const k in f.cd) if (f.cd[k] > 0) f.cd[k]--;
    if (f.swapCd > 0) f.swapCd--;
    if (f.buff && --f.buff.t <= 0) f.buff = null;
    if (f.slow && --f.slow.t <= 0) f.slow = null;
    if (f.super) superTick(G, f);
    if (f.def.mess && f.formIdx === 1) cleanTick(G, f);
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
      const ultNow = pressed('ult') || (inp.attack && inp.special && (pressed('attack') || pressed('special')));
      if (ultNow && f.meter >= 100 && f.def.ultimate) startUlt(G, f);
      else if (swapNow && f.def.cycle) { if (!(f.swapCd > 0)) nextForm(G, f); } // e.g. Cole's shirts, Cloe's colours
      else if (swapNow && f.def.mess) { if (f.mess >= 100 && f.formIdx === 0) f.act = { type: 'cleanup', t: 0, dur: f.def.mess.cupDur || 33, noGrav: !f.ground }; }
      else if (swapNow && !f.def.powerup) startSpecial(G, f, 'down');
      else if (pressed('taunt') && f.ground) { // taunt: ground only, a hit stops it, no protection
        if (G.practice && !f.cpu && f.def.mess && f.formIdx === 0) { // practice: Taunt fills the Switch meter (Sabir: all five pieces)
          if (f.def.mess.pieces) { for (let k = 0; k < f.def.mess.pieces; k++) if (!((f.pieces >> k) & 1)) { collectPiece(G, f, k); if (f.act) break; } }
          else { f.mess = 100; popText(G, f.x, f.y - f.h - 24, (f.def.mess.ready || 'READY!') + ' (Switch)', f.def.mess.color || f.accent); }
        }
        f.act = { type: 'taunt', t: 0, dur: MM.TAUNT, pose: 'flex' }; f.vx = 0;
        f.bubble = { text: f.def.taunt || 'Ha!', t: 70 };
      }
      else if (pressed('attack')) startNormal(G, f);
      else if (pressed('special')) startSpecial(G, f);
      else if (pressed('dodge')) startDodge(G, f);
      else if (pressed('jump')) {
        if (f.ground) f.jsq = 4;
        else if (f.jumps > 0) { f.jumps--; f.vy = -f.st.jump * 0.92; f.ff = false; MM.sfx('jump'); ring(G, f.x, f.y, f.accent); }
      }
      if (!f.act) move(f, inp);
      if (!f.ground && downPressed && f.vy > -4) f.ff = true;
      if (f.ground && f.ground !== 'main' && downPressed && !f.act) { f.ground = null; f.dropT = 14; f.y += 2; }
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
        if (py <= p.y - (p.dy || 0) + 0.5 && f.y >= p.y && f.x >= p.x && f.x <= p.x + p.w) { land(G, f, p.y, p); break; }
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
    if (f.def.normals && f.def.normals[name]) m = Object.assign({}, m, f.def.normals[name]);
    const ns = f.def.normalSpeed || 1;
    if (ns !== 1) m = Object.assign({}, m, { start: Math.round(m.start / ns), end: Math.round(m.end / ns) });
    f.act = { type: 'normal', name, m, t: 0, hit: new Set(), pose: m.pose, air: !onGround, dur: m.start + m.active + m.end };
    MM.sfx('swing');
  }

  function tickAction(G, f) {
    const a = f.act; a.t++;
    if (a.t === 6 && f.def.mess && f.def.mess.action && (a.type === 'normal' || a.type === 'special')) addMess(G, f, f.def.mess.action);
    if (a.type === 'normal') {
      const m = a.m;
      if (a.t === m.start && m.lunge && f.ground) f.vx += f.face * m.lunge;
      a.box = a.t >= m.start && a.t < m.start + m.active ? boxFor(f, m.box) : null;
      a.hitProps = { dmg: m.dmg, kb: m.kb, kbg: m.kbg, ang: m.ang };
      if (m.back) a.hitProps.face = -f.face; // thrown behind her
      if (a.air) move(f, f.inp);
      if (a.t >= a.dur) f.act = null;
    } else if (a.type === 'lag') {
      if (a.t >= a.dur) f.act = null;
    } else if (a.type === 'ult') {
      tickUlt(G, f, a);
    } else if (a.type === 'powerdown') {
      f.vx *= 0.7; if (a.t >= a.dur) { f.act = null; if (f.super) endSuper(G, f); }
    } else if (a.type === 'taunt') {
      f.vx *= 0.7; if (a.t >= a.dur || !f.ground) f.act = null;
    } else if (a.type === 'cleanup') { // 0.55 s; a hit stops it and he keeps his full meter
      f.vx *= 0.8;
      if (a.t % 6 === 0) part(G, { x: f.x + (Math.random() - 0.5) * f.w * 2, y: f.y - Math.random() * f.h, color: '#d9f3ff', size: 10, life: 20, max: 20, type: 'smoke' });
      if (a.t >= a.dur) {
        f.act = null; const ms = f.def.mess; f.mess = 0; applyForm(f, 1); f.clean = ms.cleanFrames;
        if (ms.sleep) sleepPulse(G, f);
        burst(G, f.x, f.y - f.h / 2, '#ffffff', 30, 8); ring(G, f.x, f.y - f.h / 2, f.def.mess.goColor || '#4aa8e8');
        popText(G, f.x, f.y - f.h - 24, ms.go || 'CLEAN FREAK!', ms.goColor || '#4aa8e8'); MM.sfx('heal');
      }
    } else if (a.type === 'powerup') { // Jeff / Patty: the Mayhem power-up switching on
      f.vx *= 0.8;
      if (a.t >= a.dur) { f.act = null; applyForm(f, 1); f.powerT = f.def.powerup ? f.def.powerup.frames : 720; burst(G, f.x, f.y - f.h / 2, '#ffd34a', 30, 8); ring(G, f.x, f.y - f.h / 2, '#ffd34a'); popText(G, f.x, f.y - f.h - 24, 'MAYHEM MODE!', '#ffd34a'); MM.sfx('heal'); }
    } else if (a.type === 'powerend') {
      f.vx *= 0.8; if (a.t >= a.dur) { f.act = null; applyForm(f, 0); popText(G, f.x, f.y - f.h - 24, 'MAYHEM OVER', '#ccc'); }
    } else if (a.type === 'shirt') { // Cole: a quarter second showing off the new shirt
      f.vx *= 0.8; if (a.t >= a.dur) f.act = null;
    } else if (a.type === 'backwork') { // 0.35 s back into the work clothes
      f.vx *= 0.8; if (a.t >= a.dur) { f.act = null; backToWork(G, f); }
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
    G.projs.push(Object.assign({ owner: f, cast: f.act, x: f.x + f.face * 34 * f.s, y: f.y - 70 * f.s, vx: f.face * 10, vy: 0, r: 14, dmg: 6, kb: 5, kbg: 0.05, ang: 30, life: 70, grav: 0, color: f.accent, hit: new Set(), t: 0 }, o));
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
            spawnProj(G, f, { vx: Math.cos(ang) * sp.speed * f.face, vy: (sp.vy || 0) + Math.sin(ang) * sp.speed, r: sp.r || 14, dmg: sp.dmg, kb: sp.kb, kbg: sp.kbg, ang: sp.ang || 35, life: sp.life || 70, grav: sp.grav || 0, emoji: sp.emoji, sprite: sp.sprites ? sp.sprites[i % sp.sprites.length] : sp.sprite, sheet: sp.sheet, anim: sp.anim, animOnce: sp.animOnce, px: sp.px, scale: sp.scale, spin: sp.spin, puddle: sp.puddle, slow: sp.slow, bounce: sp.bounce, boomer: sp.boomerang, pull: sp.pull, line: sp.line, dir: f.face });
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
            spawnProj(G, f, { x: f.x + f.face * (20 - i * 34), y: f.y - 18, vx: f.face * (sp.speed + i * 0.7), vy: 0, r: 20, dmg: sp.dmg, kb: sp.kb, kbg: sp.kbg, ang: 45, life: sp.life || 95, ground: true, fall: true, sprite: sp.sprites && sp.sprites[i], anim: sp.anim, scale: sp.scale, emoji: sp.emoji, sheet: sp.sheet, dir: f.face, runner: true });
          }
          if (sp.heal) { f.damage = Math.max(0, f.damage - sp.heal); popText(G, f.x, f.y - f.h - 20, '+' + sp.heal + ' REST', '#9ff0d0'); } // e.g. Giant Patty catches her breath while the dog charges
          MM.sfx('jump');
        }
      },
    },
    beam: { // e.g. Courtnee-Hameha: gather, charge while Special is held, then a straight energy beam
      start(G, f, sp, a) { a.charge = 0; a.charging = true; a.dur = sp.startup + sp.active + sp.recovery; a.pose = 'cast'; },
      tick(G, f, sp, a) {
        f.vx *= 0.8; if (!f.ground) { f.vy = Math.min(f.vy, 1); a.noGrav = a.t >= sp.startup; }
        if (a.charging && a.t >= 8) {
          if (f.inp.special && a.charge < sp.maxCharge) { a.charge++; a.t--; if (a.charge % 6 === 0) part(G, { x: f.x - f.face * 10, y: f.y - f.h * 0.45, color: '#7fe6ff', size: 6, life: 14, max: 14 }); }
          else a.charging = false;
        }
        const k = 1 + (a.charge / sp.maxCharge) * 0.8; // a full charge = 1.8x damage and a longer beam
        if (a.t >= sp.startup && a.t < sp.startup + sp.active) {
          const len = sp.len * (0.75 + 0.25 * k), y = f.y - f.h * 0.62;
          a.beam = { x: f.x + f.face * 45 * f.s, y, len, dir: f.face, th: 46 * f.s * (0.8 + 0.2 * k) };
          a.box = { x: f.face > 0 ? a.beam.x : a.beam.x - len, y: y - a.beam.th / 2, w: len, h: a.beam.th };
          a.hitProps = { dmg: sp.dmg * k, kb: sp.kb, kbg: sp.kbg * k, ang: 25 };
          if (a.t === sp.startup) { G.shake = Math.max(G.shake, 6 * k); MM.sfx('special'); }
        } else a.beam = null;
      },
    },
    supersaiyan: { // e.g. Super Saiyan Courtnee: power up into the golden form for a while; costs when it wears off
      start(G, f, sp, a) { if (f.super || !f.forms) { f.act = null; return; } a.dur = 42; a.pose = 'flex'; a.noGrav = !f.ground; },
      tick(G, f, sp, a) {
        f.vx *= 0.8; if (!f.ground) f.vy = Math.min(f.vy, 0.5);
        if (a.t % 4 === 0) burst(G, f.x, f.y - f.h / 2, '#ffd23f', 4, 5);
        if (a.t === 30) {
          applyForm(f, 1); f.super = { t: sp.dur, sp };
          G.shake = 10; G.flash = 4; popText(G, f.x, f.y - f.h - 24, 'SUPER SAIYAN!', '#ffd23f'); MM.sfx('go');
        }
      },
    },
    icewave: { // e.g. Jadden's Ice Ice Jadden: a dance, then one ice wave along the floor that slows whoever it hits
      start(G, f, sp, a) { a.dur = sp.startup + sp.recovery; a.pose = 'flex'; },
      tick(G, f, sp, a) {
        f.vx *= 0.8; if (!f.ground) f.vy = Math.min(f.vy, 3);
        if (a.t === sp.startup) {
          const s = surfaceBelow(G, f.x, f.y);
          if (s === null || s - f.y > f.h) return; // too high above the floor: the dance whiffs
          spawnProj(G, f, { x: f.x + f.face * 40, y: s - 18, vx: f.face * sp.speed, r: 22, dmg: sp.dmg, kb: sp.kb, kbg: sp.kbg, ang: 30, life: sp.life, ground: true, dir: f.face, color: '#9fe8ff', slow: { mul: sp.slowMul, t: sp.slowFrames }, icy: true });
          G.shake = Math.max(G.shake, 5); MM.sfx('special');
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
    heal: { // e.g. Megan's Power Nap: sit and nap (any hit wakes her up with no healing), heal once at the end
      start(G, f, sp, a) { if (sp.grounded && !f.ground) { f.act = null; f.cd.down = 0; return; } a.healAt = sp.channel || 40; a.dur = a.healAt + (sp.recovery || 10); a.pose = 'guard'; },
      tick(G, f, sp, a) {
        if (!f.ground) f.vy = Math.min(f.vy, 1);
        f.vx *= 0.7;
        if (a.t < a.healAt && a.t % 5 === 0) part(G, { type: 'text', text: '+', x: f.x + (Math.random() - 0.5) * 60, y: f.y - Math.random() * f.h, vy: -1.5, color: '#5dff8f', size: 22, life: 30, max: 30 });
        if (a.t === a.healAt) { const amt = Math.min(f.damage, sp.amount); f.damage -= amt; popText(G, f.x, f.y - f.h - 20, `-${Math.round(amt)}%`, '#5dff8f'); MM.sfx('heal'); }
      },
    },
    cosplay: { // e.g. Sabir's Cosplay Toss: throws the next costume piece he doesn't have yet (one of each in the world)
      start(G, f, sp, a) { a.dur = 24; a.pose = 'throw'; },
      tick(G, f, sp, a) {
        if (a.t !== 10) return;
        const n = f.def.mess.pieces, have = f.pieces || 0;
        const out = new Set(G.traps.filter((t) => t.owner === f && t.piece != null).map((t) => t.piece));
        let i = 0; while (i < n && ((have >> i) & 1 || out.has(i))) i++;
        if (i >= n) { popText(G, f.x, f.y - f.h - 20, 'ALL PIECES OUT!', f.accent); return; }
        G.traps.push({ owner: f, piece: i, x: f.x + f.face * 40, y: f.y - 70, vy: -6, vx: f.face * 6, sp: { sprite: 'fxcp' + i, scale: sp.scale, heal: 4 }, life: sp.life || 300, armed: 0, age: 0, dir: f.face });
      },
    },
    call: { // e.g. Sabir's Missing Piece Call: his pieces fly back to him
      start(G, f, sp, a) { a.dur = 26; a.pose = 'flex'; },
      tick(G, f, sp, a) {
        if (a.t !== 12) return;
        let n = 0;
        for (const t of G.traps) if (t.owner === f && t.piece != null) { burst(G, t.x, t.y - 20, f.accent, 8, 4); t.x = f.x; t.y = f.y - 2; t.vy = 0; t.vx = 0; t.age = 999; n++; }
        if (!n) popText(G, f.x, f.y - f.h - 20, 'NO PIECES OUT', '#ccc');
      },
    },
    shuffle: { // e.g. Cloe's Palette Shuffle: next outfit colour (same as Switch)
      start(G, f, sp, a) { a.dur = 20; a.pose = 'flex'; if (!(f.swapCd > 0)) nextForm(G, f); else { f.act = null; } },
      tick() {},
    },
    wheel: { // e.g. Janelle's Subject Select: hold Special, tap left/right to turn the wheel, let go to pick
      start(G, f, sp, a) { a.dur = 9999; a.pose = 'flex'; a.pick = f.formIdx; a.prevX = 0; },
      tick(G, f, sp, a) {
        f.vx *= 0.8; const n = f.forms.length;
        if (f.inp.x && f.inp.x !== a.prevX) { a.pick = (a.pick + f.inp.x + n) % n; MM.sfx('select'); }
        a.prevX = f.inp.x;
        if (!f.inp.special || a.t > 240) {
          if (a.pick !== f.formIdx) { applyForm(f, a.pick); popText(G, f.x, f.y - f.h - 24, f.def.formName, f.accent); burst(G, f.x, f.y - f.h / 2, f.accent, 12, 5); MM.sfx('special'); }
          f.act = null;
        }
      },
    },
    drink: {
      start(G, f, sp, a) { if (!f.ground || !f.def.mess || f.formIdx !== 0) { f.act = null; f.cd.neutral = 0; return; } a.dur = 9999; a.pose = 'flex'; },
      tick(G, f, sp, a) {
        f.vx *= 0.7;
        const hold = f.inp.special && f.ground && f.mess < 100 && a.t < (sp.max || 240);
        if (a.t > (sp.windup || 18) && a.t % 3 === 0 && hold) addMess(G, f, 1); // 20 a second
        if (!hold && a.t > (sp.windup || 18) && !a.ending) { a.ending = true; a.dur = a.t + 10; }
        if (a.t >= a.dur) f.act = null;
      },
    },
    trap: {
      start(G, f, sp, a) { a.dur = 22; a.pose = 'throw'; },
      tick(G, f, sp, a) {
        if (a.t === 10) {
          G.traps = G.traps.filter((t) => t.owner !== f);
          G.traps.push({ owner: f, x: f.x + f.face * 40, y: f.y - (sp.toss ? 60 : 2), vy: sp.toss ? -7 : 0, vx: sp.toss ? f.face * sp.toss : 0, sp, life: sp.life || 600, armed: sp.heal ? 0 : 20, age: 0, dir: f.face });
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

  // ---------- ultimates ----------
  // def.ultimate: { name, sprite (atlas with ult0..ult3), type: 'catch' | 'stampede', dur, poses: [[frame, pose]...],
  //   catch:  catchAt, finishAt, radius (fighter heights), dmg, kbMul
  //   stampede: spawnAt, sweepDur, dmg, kbMul, emoji }
  // Times are frames (60 a second). The owner is not invincible: a hit cancels it and lets everyone go.
  function startUlt(G, f) {
    const u = f.def.ultimate;
    f.meter = 0; f.ff = false; f.vx = 0;
    f.act = { type: 'ult', t: 0, u, dur: u.dur, caught: [], hit: new Set(), noGrav: true, pose: 'flex' };
    G.ultBanner = { text: u.name, color: f.accent, by: f, t: 100 }; G.flash = 8;
    MM.sfx('go'); MM.sfx('special');
  }
  function releaseUlt(a) { for (const d of a.caught) if (d.caught) d.caught = null; a.caught.length = 0; }
  function tickUlt(G, f, a) {
    const u = a.u; f.vx *= 0.8; if (!f.ground) f.vy = 0;
    if (u.rush && a.t >= u.rush[0] && a.t < u.rush[1]) { // e.g. Haylie charges in: stop on reaching someone so she doesn't run past
      const near = G.fighters.some((d) => d !== f && !d.dead && !d.out && !(MM.sameTeam(G, f, d) && !G.ff) && (d.x - f.x) * f.face > 0 && (d.x - f.x) * f.face < f.w + 30 && Math.abs(d.y - f.y) < f.h);
      if (near) a.rushDone = true;
      f.vx = a.rushDone ? 0 : f.face * u.rush[2];
    }
    if (u.say && a.t === u.say[0]) f.bubble = { text: u.say[1], t: 70 }; // e.g. "Excelsior!"
    if (u.type === 'catch') {
      if (a.t < u.catchAt && a.t % 6 === 0) ring(G, f.x, f.y - f.h / 2, f.accent); // telegraph: you can still get away
      if (a.t === u.catchAt) {
        const r = (u.radius || 2) * f.h;
        for (const d of G.fighters) {
          if (d === f || d.dead || d.out || d.invuln > 0 || d.caught || (MM.sameTeam(G, f, d) && !G.ff)) continue;
          const inReach = u.ahead ? (d.x - f.x) * f.face > -f.w && (d.x - f.x) * f.face < u.ahead * f.h && Math.abs((d.y - d.h / 2) - (f.y - f.h / 2)) < f.h * 1.2
            : Math.hypot(d.x - f.x, (d.y - d.h / 2) - (f.y - f.h / 2)) <= r;
          if (inReach) { d.caught = f; d.act = null; d.hitstun = 0; d.vx = d.vy = 0; a.caught.push(d); burst(G, d.x, d.y - d.h / 2, f.accent, 10, 4); part(G, { type: 'fx', img: 'catchring', x: d.x, y: d.y - d.h / 2, size: d.h * 1.6, grow: true, life: 30, max: 30 }); }
        }
        part(G, { type: 'ring', x: f.x, y: f.y - f.h / 2, color: f.accent, size: r * 0.6, life: 24, max: 24 });
      }
      if (a.t === u.finishAt) {
        G.shake = 24; G.flash = 6;
        for (const d of a.caught) {
          if (d.caught !== f || d.dead || d.out) continue;
          d.caught = null;
          applyHit(G, f, d, { dmg: u.dmg, kb: 9 * u.kbMul, kbg: 0.12 * u.kbMul, ang: 55, face: sgn(d.x - f.x) || f.face }, d.x, d.y - d.h / 2);
        }
        a.caught.length = 0;
        burst(G, f.x, f.y - f.h / 2, f.accent, 40, 12);
      }
    } else if (u.type === 'beam') { // e.g. Maximum Morris: a giant beam straight ahead, each opponent hit once
      if (a.t >= u.beamAt && a.t < u.beamEnd) {
        const y = f.y - f.h * (u.beamY || 0.75), th = (u.beamTh || 120) * f.s, x = f.x + f.face * (u.beamX || 175) * f.s;
        a.beam = { x, y, len: u.len, dir: f.face, th, big: true };
        a.box = { x: f.face > 0 ? x : x - u.len, y: y - th / 2, w: u.len, h: th };
        a.hitProps = { dmg: u.dmg, kb: 9 * u.kbMul, kbg: 0.12 * u.kbMul, ang: 30 };
        if (a.t === u.beamAt) { G.shake = 20; G.flash = 6; }
      } else { a.box = null; a.beam = null; }
    } else if (u.type === 'paint') { // e.g. Cloe's Color Wheel Carnival
      if (a.t === u.splashAt) {
        const m = G.stage.main, cast = new Set(), cols = ['#ff4b4b', '#ff9a1f', '#ffd93d', '#4bd16b', '#3fa7ff', '#a35cff'];
        G.traps = G.traps.filter((t) => !(t.owner === f && t.sp.root));
        for (let i = 0; i < 6; i++) {
          const x = m.left + 80 + ((m.right - m.left - 160) * (i + 0.5)) / 6 + (Math.random() - 0.5) * 60;
          G.traps.push({ owner: f, x, y: -400 - i * 30, vy: 0, sp: { slowOnly: true, root: true, slow: { mul: 0, t: u.root }, color: cols[i], puddle: u.fxSheet && 'puddle-' + ['red', 'orange', 'yellow', 'green', 'blue', 'purple'][i], life: u.life }, life: u.life, armed: 0, age: 0, dir: 1, cast });
        }
        G.shake = 10; burst(G, f.x, f.y - f.h, '#fff', 30, 9);
      }
    } else if (u.type === 'flyby') { // e.g. Sabir's Five-Star Flyby: five friends fly out from behind him and across the screen
      const i = (a.t - u.sendAt) / u.every;
      if (i >= 0 && i < u.girls && i === Math.floor(i)) {
        const S = MM.SPRITES[u.girlSheet], st = S && S.frames.idle0 && S.frames.girl00 ? (S.frames.idle0[3] / S.frames.girl00[3]) * 0.95 : 1;
        spawnProj(G, f, { x: f.x - f.face * 0.75 * f.w, y: f.y - f.h * (0.45 + 0.28 * ((i * 2) % 5) / 4), vx: f.face * u.speed, vy: 0, r: 44,
          dmg: u.dmg, kb: 5.5 * u.kbMul, kbg: 0.06 * u.kbMul, ang: 40, life: u.life, pierce: true, girl: i, sheet: u.girlSheet, scale: st, dir: f.face });
        part(G, { type: 'ring', x: f.x - f.face * 0.75 * f.w, y: f.y - f.h * 0.6, color: f.accent, size: 40, life: 16, max: 16 });
      }
    } else if (u.type === 'barrage') { // e.g. Jaxston's Pirate Fireball Frenzy: a string of flaming balls kicked straight ahead
      const t = a.t - u.fireAt;
      if (t >= 0 && t < u.count * u.every && t % u.every === 0) {
        const i = t / u.every, last = i === u.count - 1;
        spawnProj(G, f, { x: f.x + f.face * 60 * f.s, y: f.y - (40 + (i % 3) * 30) * f.s, vx: f.face * u.speed, vy: ((i % 3) - 1) * 0.6, r: 22,
          dmg: last ? u.dmg * 2 : u.dmg, kb: last ? 9 * u.kbMul : 3, kbg: last ? 0.12 * u.kbMul : 0.02, ang: last ? 40 : 15, life: 70,
          sprite: u.ball, anim: u.anim, scale: u.ballScale || 0.4, dir: f.face });
        G.shake = Math.max(G.shake, 4);
      }
    } else if (u.type === 'decoy') { // e.g. Jorie's Cardboard Checkout: set up a cutout, run off, and it bursts on whoever is near it
      if (a.t === u.placeAt) a.decoy = { x: f.x + f.face * (u.decoyX || 0) * f.s, y: f.y, face: f.face };
      if (a.decoy && a.t === u.burstAt) {
        const r = (u.radius || 2) * f.h;
        G.shake = 22; G.flash = 6; burst(G, a.decoy.x, a.decoy.y - f.h / 2, '#ffb02e', 40, 12);
        part(G, { type: 'ring', x: a.decoy.x, y: a.decoy.y - f.h / 2, color: '#ffb02e', size: r * 0.6, life: 24, max: 24 });
        for (const d of G.fighters) {
          if (d === f || d.dead || d.out || d.invuln > 0 || (MM.sameTeam(G, f, d) && !G.ff)) continue;
          if (Math.hypot(d.x - a.decoy.x, (d.y - d.h / 2) - (a.decoy.y - f.h / 2)) <= r)
            applyHit(G, f, d, { dmg: u.dmg, kb: 9 * u.kbMul, kbg: 0.12 * u.kbMul, ang: 55, face: sgn(d.x - a.decoy.x) || f.face }, d.x, d.y - d.h / 2);
        }
      }
    } else if (u.type === 'stampede') { // a herd runs across the stage; each opponent is hit once
      const t = a.t - u.spawnAt;
      if (t >= 0 && t < u.sweepDur) {
        a.sweepX = f.x + f.face * (60 + (t / u.sweepDur) * 1500);
        a.box = { x: a.sweepX - 90, y: f.y - 170, w: 180, h: 175 };
        a.hitProps = { dmg: u.dmg, kb: 9 * u.kbMul, kbg: 0.12 * u.kbMul, ang: 50 };
        if (t % 3 === 0) part(G, { x: a.sweepX - f.face * 60, y: f.y - 10, color: 'rgba(220,190,140,.8)', size: 16, life: 22, max: 22, type: 'smoke' });
        if (t === 0) G.shake = 12;
      } else { a.box = null; a.sweepX = null; }
    }
    if (a.t >= a.dur) { releaseUlt(a); f.act = null; }
  }
  MM.startUlt = startUlt;

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

  MM.sameTeam = (G, a, b) => G.teams && a && b && a !== b && a.team === b.team;
  function applyHit(G, att, def, h, hx, hy, proj) {
    if (def.invuln > 0 || def.dead || def.out) return false;
    if (MM.sameTeam(G, att, def) && !G.ff) return false; // no friendly fire
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
    // ultimate meter: 0.65 per damage dealt to an opponent, 0.35 per damage taken; nothing while in an ultimate
    if (att && att !== def && !MM.sameTeam(G, att, def) && !(att.act && att.act.type === 'ult')) att.meter = Math.min(100, att.meter + dmg * 0.65);
    if (!(da && da.type === 'ult')) def.meter = Math.min(100, def.meter + dmg * 0.35);
    if (da && da.type === 'ult') releaseUlt(da);
    if (att) { att.dealt += dmg; def.lastHit = att.slot; def.lastHitT = G.frame; }
    if (def.def.mess && def.def.mess.hurt && att && att !== def) addMess(G, def, def.def.mess.hurt);
    if (att && att.def.mess && !MM.sameTeam(G, att, def)) { const cast = proj ? proj.cast : att.act; if (cast && cast.type !== 'ult' && !cast.messHit) { cast.messHit = true; addMess(G, att, att.def.mess.hit); } }
    burst(G, hx, hy, '#fff', 4 + (dmg | 0), 4 + dmg * 0.3);
    const big = dmg >= 12 || (h.kb || 0) > 11; // ChatGPT's hit art: a small spark, or a big burst for heavy hits
    part(G, { type: 'fx', img: big ? 'hitbig' : 'hitsmall', x: hx, y: hy, size: big ? 150 : 70, grow: true, rot: Math.random() * 6.28, life: big ? 16 : 11, max: big ? 16 : 11 });
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
      if (p.boomer && !p.back && p.t > 20 && sgn(p.vx) !== p.dir) { p.back = true; p.hit = new Set(); } // one hit going out, one coming back
      if (p.boomer && p.t > 20) { const back = sgn(p.owner.x - p.x); p.vx += back * 0.55; p.vy += clamp((p.owner.y - 70 - p.y) * 0.01, -0.4, 0.4); if (p.t > 40 && Math.hypot(p.owner.x - p.x, p.owner.y - 70 - p.y) < 50) p.life = 0; }
      p.vy += p.grav;
      p.x += p.vx; p.y += p.vy;
      if (p.bounce != null && p.vy > 0) { // bounces off the floor a set number of times, then it's gone
        const s = surfaceBelow(G, p.x, p.y - p.vy - 2);
        if (s !== null && p.y + p.r * 0.5 >= s) { if (p.bounce-- > 0) { p.y = s - p.r * 0.5; p.vy = -p.vy * 0.55; p.vx *= 0.8; } else { p.life = 0; continue; } }
      }
      if (p.puddle && p.vy > 0) { // lands and leaves a puddle (e.g. Siren's mac and cheese)
        const s = surfaceBelow(G, p.x, p.y - p.vy - 2);
        if (s !== null && p.y + p.r * 0.5 >= s) {
          G.traps = G.traps.filter((t) => !(t.owner === p.owner && t.sp.slowOnly));
          G.traps.push({ owner: p.owner, x: p.x, y: s, vy: 0, sp: p.puddle, life: p.puddle.life, armed: 0, dir: p.dir });
          p.life = 0; continue;
        }
      }
      if (p.ground) {
        const s = surfaceBelow(G, p.x, p.y + 10);
        if (s !== null && s <= p.y + 22 + Math.max(0, p.vy)) { p.y = s - 18; p.vy = 0; }
        else if (p.fall) p.vy += 0.6;
        else p.life = 0;
      }
      if (!p.pierce && insideMain(G, p.x, p.y + p.r * 0.5)) { p.life = 0; burst(G, p.x, p.y, p.color, 6, 3); }
      const box = { x: p.x - p.r, y: p.y - p.r, w: p.r * 2, h: p.r * 2 };
      for (const d of G.fighters) {
        if (d === p.owner || d.dead || d.out || p.hit.has(d) || d.invuln > 0) continue;
        if (overlap(box, MM.hurtbox(d))) {
          p.hit.add(d);
          const ok = applyHit(G, p.owner, d, { dmg: p.dmg, kb: p.kb, kbg: p.kbg, ang: p.ang, face: p.pull ? sgn(p.owner.x - d.x) : sgn(p.vx || p.dir) }, p.x, p.y, p);
          if (ok && p.slow && (!d.slow || d.slow.mul >= p.slow.mul)) { d.slow = { mul: p.slow.mul, t: p.slow.t }; burst(G, d.x, d.y - d.h / 2, '#bff3ff', 12, 4); } // refresh, never stack
          if (ok && p.pierce) p.atkT = p.t; // flies on through (e.g. Sabir's flyby girls strike as they pass)
          else if (ok && !p.ground) p.life = 0;
        }
      }
      if (Math.abs(p.x) > 3000 || p.y > 1500) p.life = 0;
    }
    G.projs = G.projs.filter((p) => p.life > 0);
  }

  function updateTraps(G) {
    // the power-up timer (Jeff / Patty Mayhem mode): runs out, then a short change back
    for (const f of G.fighters) if (f.powerT > 0 && !f.dead && --f.powerT === 0) {
      if (!f.act && !f.hitstun) f.act = { type: 'powerend', t: 0, dur: 24 }; else { applyForm(f, 0); popText(G, f.x, f.y - f.h - 24, 'MAYHEM OVER', '#ccc'); }
    }
    for (const t of G.traps) {
      t.life--; t.age = (t.age || 0) + 1; if (t.armed > 0) t.armed--;
      const s = surfaceBelow(G, t.x, t.y);
      if (s === null || t.y < s) { t.vy += 0.6; t.y += t.vy; t.x += t.vx || 0; if (s !== null && t.y >= s) { t.y = s; t.vy = 0; t.vx = 0; } }
      if (t.y > 1500) t.life = 0;
      if (t.armed > 0) continue;
      if (t.sp.heal) { // a snack (e.g. Jacqi's orange slices): the first one to grab it heals; the thrower only after a second
        const pb = { x: t.x - 30, y: t.y - 40, w: 60, h: 44 };
        const d = G.fighters.find((o) => !o.dead && !o.out && (o !== t.owner || t.age > 60) && overlap(pb, MM.hurtbox(o)));
        if (d && t.piece != null && d === t.owner) { collectPiece(G, d, t.piece); t.life = 0; continue; }
        if (d && t.piece != null && d.healCd > G.frame) continue; // a piece heals the same player at most every 2 s
        if (d && t.piece != null) d.healCd = G.frame + 120;
        if (d) { d.damage = Math.max(0, d.damage - t.sp.heal); t.life = 0; popText(G, d.x, d.y - d.h - 20, '+' + t.sp.heal + ' SNACK!', '#ffa630'); MM.sfx('heal'); burst(G, t.x, t.y - 20, '#ffa630', 10, 4); }
        continue;
      }
      if (t.sp.slowOnly) { // a puddle: slows enemies standing in it (refreshes, never stacks), no damage
        const pb = { x: t.x - 60, y: t.y - 20, w: 120, h: 24 };
        for (const d of G.fighters) if (d !== t.owner && !d.dead && !d.out && !MM.sameTeam(G, t.owner, d) && overlap(pb, MM.hurtbox(d)) && (!d.slow || d.slow.mul >= t.sp.slow.mul)) {
          if (t.sp.root) { if (t.cast.has(d)) continue; t.cast.add(d); popText(G, d.x, d.y - d.h - 20, 'STUCK IN PAINT!', t.sp.color); } // once each per ultimate
          d.slow = { mul: t.sp.slow.mul, t: t.sp.slow.t };
        }
        continue;
      }
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
    const bl = MM.blastLeft(b), br = MM.blastRight(b);
    if (f.x < bl || f.x > br || f.y > b.bottom || (f.y < b.top && f.hitstun > 0)) {
      if (f.y < b.top) f.y = b.top; // stay inside for the effect
      if (!G.practice) f.stocks--; f.falls++; // practice: nobody runs out of lives
      // story bosses: the first time they're out, they turn giant instead (once)
      if (f.boss && f.stocks <= 0 && !f.phased && MM.BOSS_FORMS && MM.BOSS_FORMS[f.def.baseId || f.def.id]) {
        f.phased = true; f.stocks = 2; f.stocks0 = 2;
        G.bossPhase = { f, t: 0, from: f.def };
        const gd = MM.BOSS_FORMS[f.def.baseId || f.def.id]; f.def = gd; f.forms = null; f.formIdx = 0; f.st = gd.stats; f.s = gd.stats.size; f.w = W * f.s; f.h = H * f.s;
        f.color = gd.color; f.accent = gd.accent; f.powerT = 0;
        G.ultBanner = { text: gd.name.toUpperCase() + '!', color: gd.accent, by: f, t: 120 }; f.phaseIn = 150; // shows the transformation while coming back
      }
      const killer = G.fighters.find((o) => o.slot === f.lastHit && G.frame - f.lastHitT < 600 && o !== f);
      if (killer) { killer.kos++; killer.bubble = { text: killer.def.taunt || 'Yes!', t: 120 }; }
      const ex = clamp(f.x, bl, br), ey = clamp(f.y, b.top, b.bottom);
      G.kos = G.kos || []; G.kos.push({ x: ex, y: ey, color: MM.PLAYER_COLORS[f.slot], t: 50 });
      burst(G, ex, ey, MM.PLAYER_COLORS[f.slot], 40, 14);
      G.shake = 26; MM.sfx('ko');
      if (f.act && f.act.type === 'ult') releaseUlt(f.act);
      if (f.super) { f.super = null; applyForm(f, 0); }
      f.exhaust = 0; f.tiredT = 0;
      if (f.def.powerup && f.formIdx) { applyForm(f, 0); f.powerT = 0; }
      if (f.def.mess) { if (f.formIdx) applyForm(f, 0); f.mess = 0; f.clean = 0; f.pieces = 0; G.traps = G.traps.filter((t) => !(t.owner === f && t.piece != null)); }
      f.act = null; f.hitstun = 0; f.buff = null; f.slow = null; f.vx = f.vy = 0; f.caught = null; f.meter = 0;
      if (f.stocks <= 0) { f.out = true; f.x = 0; f.y = -3000; }
      else { f.dead = 80; f.y = -3000; }
    }
  }

  function respawn(G, f) {
    const xs = [-180, 180, -60, 60];
    f.x = MM.spawnX(G.stage) + xs[f.slot % 4]; f.y = -430; f.vx = f.vy = 0; f.damage = 0; f.ground = null;
    f.float = 150; f.invuln = 150; f.jumps = AIR_JUMPS; f.upUsed = false; f.sideUsed = false; f.airDodged = false;
    f.act = null; f.hitstun = 0; f.lastHit = -1;
  }
})();
