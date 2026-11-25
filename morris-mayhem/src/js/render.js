// Drawing: camera, stage art, fighters, effects, HUD.
window.MM = window.MM || {};
(function () {
  const TAU = Math.PI * 2;
  MM.photos = {};
  MM.allDefs = () => MM.FIGHTERS.flatMap((d) => (d.forms ? [d, ...MM.formDefs(d)] : [d]));
  MM.loadPhotos = function () {
    for (const d of MM.allDefs()) if (d.photo && !MM.photos[d.id]) { const im = new Image(); im.src = d.photo; MM.photos[d.id] = im; }
  };
  // ---------- sprite (artwork) fighters ----------
  const spriteImgs = {};
  function sheet(id) {
    const S = MM.SPRITES && MM.SPRITES[id];
    if (!S) return null;
    if (!spriteImgs[id]) { const im = new Image(); im.src = S.src; spriteImgs[id] = im; }
    const im = spriteImgs[id];
    return im.complete && im.naturalWidth ? { S, im } : null;
  }
  // load every fighter's atlases up front, including the ultimate/victory sheets (otherwise a fighter who never
  // used their ultimate has no victory pose ready for the results screen)
  MM.preloadSprites = () => { for (const d of MM.allDefs()) for (const id of [d.sprite, d.ultimate && d.ultimate.sprite]) if (id) { sheet(id); const S = MM.SPRITES && MM.SPRITES[id]; if (S && S.left) sheet(S.left); if (S && S.base) sheet(S.base); } };
  MM.whenPoseReady = (def, cb) => { const u = def.ultimate, id = u && u.sprite; if (!id) return; sheet(id); const im = spriteImgs[id]; if (im && !(im.complete && im.naturalWidth)) im.addEventListener('load', cb, { once: true }); };

  // Pick the pose for what the fighter is doing right now.
  function pickFrame(f, S) {
    const a = f.act, M = S.moves;
    if (f.float > 0) return 'idle' + (Math.floor(f.anim / 16) % 4); // coming back after a KO: stand on the respawn spot
    if (f.hitstun > 0) return !f.ground ? 'hurt2' : f.hitstun > 5 ? 'hurt1' : f.hitstun > 2 ? 'hurt0' : S.frames.hurt3 ? 'hurt3' : 'hurt0'; // big hit, reel, then shake it off
    if (f.jsq > 0) return 'jump0';
    if (a) {
      if (a.type === 'powerdown') return 'down' + Math.min(3, Math.floor(a.t / 10));
      if (a.type === 'lag') return a.countered && M.counterHit ? M.counterHit : 'jump0';
      if (a.type === 'dodge') return M.defRow && f.ground ? M.defRow + (a.roll ? (a.t < 10 ? 2 : 3) : a.t < 8 ? 0 : 1) : f.ground ? 'idle0' : 'jump2';
      if (a.type === 'cleanup') return 'cup' + Math.min(3, Math.floor(a.t / 8.25)); // Codee: brush off the mess, into the lab coat
      if (a.type === 'backwork') return 'back' + Math.min(3, Math.floor(a.t / 5.25));
      if (a.type === 'shirt') return 'bump' + f.formIdx; // Cole shows off the new printed shirt
      if (a.type === 'normal') {
        const row = M[a.name], m = a.m, before = a.t < m.start, during = a.t < m.start + m.active;
        if (a.name === 'up' && M.upRow) return M.upRow + (a.t < Math.max(1, m.start * 0.5) ? 0 : before ? 1 : a.t < m.start + m.active + Math.max(4, Math.round(m.end * 0.4)) ? 2 : 3);
        if (a.name === 'uair' && M.uairRow) return M.uairRow + (a.t < Math.max(1, m.start * 0.5) ? 0 : before ? 1 : a.t < m.start + m.active + Math.max(4, Math.round(m.end * 0.4)) ? 2 : 3);
        if (a.name === 'up' || a.name === 'uair') return M.upPose;
        if (row === M.airRow) return row + (before ? 1 : during ? 2 : f.ground ? 3 : 1);
        if (row === 'drop') return 'drop' + (before ? 1 : a.t < m.start + m.active + 4 ? 2 : 3);
        const hold = m.start + m.active + Math.max(4, Math.round(m.end * 0.4)); // the strike pose stays up long enough to see
        return row + (a.t < Math.max(1, m.start * 0.5) ? 0 : before ? 1 : a.t < hold ? 2 : 3);
      }
      if (a.type === 'special') {
        const row = M[{ neutral: 'neutral', side: 'sideSpecial', up: 'upSpecial', down: 'downSpecial' }[a.slot]];
        const kind = a.sp.kind;
        if (kind === 'dash' && a.sp.ride) return row + (a.t < 3 ? 0 : a.t < 6 ? 1 : a.box ? 2 : 3); // build the cart, ride it, hop off
        if (kind === 'dash') return row + (a.t < 6 ? 0 : a.box ? 1 + ((a.t >> 2) & 1) : 3);
        if (kind === 'rise') return a.chute ? row + 2 : a.t < 4 ? row + 0 : a.t < (M.riseMid ? 9 : 12) ? row + 1 : M.riseMid && a.t < 30 ? M.riseMid : M.riseLate; // riseMid: e.g. Haylie's bear-aura leap
        if (kind === 'projectile') return row + (a.t < 5 ? 0 : a.t < 9 ? 1 : a.t < 16 ? 2 : 3);
        if (kind === 'pack') return row + (a.t < 10 ? 0 : a.t < 20 ? 1 : a.t < 28 ? 2 : 3);
        if (kind === 'counter') return row + (a.t < 5 ? 0 : a.counter ? 1 : 3);
        if (kind === 'beam') return row + (a.t < 8 ? 0 : a.beam ? 2 : a.t < a.sp.startup ? 1 : 3);
        if (kind === 'supersaiyan') return row + Math.min(3, Math.floor(a.t / 10));
        if (kind === 'icewave') return row + (a.t < 12 ? 0 : a.t < sp_startup(a) ? 1 : a.t < sp_startup(a) + 10 ? 2 : 3);
        if (kind === 'transform') return row + (a.t < 8 ? 0 : a.t < 20 ? 1 : a.t < 30 ? 2 : 3);
        if (kind === 'trap') return row + (a.t < 6 ? 0 : a.t < 12 ? 1 : a.t < 18 ? 2 : 3);
        if (kind === 'drink') return row + (a.ending ? 3 : a.t < 8 ? 0 : 1 + ((a.t >> 4) & 1)); // pick up the jug, chug, wipe the mouth
        if (row) return row + Math.min(3, Math.floor((a.t / a.dur) * 4));
      }
    }
    if (!f.ground) return f.vy < -4 ? 'jump1' : f.vy < 3 ? 'jump2' : 'jump3';
    if (Math.abs(f.vx) > 1) return 'run' + (Math.floor(f.anim / 6) % 4);
    return 'idle' + (Math.floor(f.anim / 16) % 4);
  }

  // entrance (before the countdown), taunt, victory: key poses from the fighter's personality sheet
  function presPose(f, G) {
    const u = f.def.ultimate, sh = u && u.sprite && sheet(u.sprite);
    if (!sh) return null;
    let frame = null;
    if (G.countdown > 150) frame = 'ent';
    else if (f.act && f.act.type === 'taunt') frame = 'taunt';
    else if (G.over && !f.out && (f === G.winner || (G.winTeam && f.team === G.winTeam))) frame = 'win';
    return frame && sh.S.frames[frame] ? { sh, frame } : null;
  }
  MM.posePicture = function (def, frame, size = 320) { // a still of one pose for menus (results screen)
    const u = def.ultimate, sh = u && u.sprite && sheet(u.sprite), fr = sh && sh.S.frames[frame];
    if (!fr) return null;
    const c = document.createElement('canvas'); c.width = c.height = size; const g = c.getContext('2d');
    // same scale as in a match: a standing fighter is ~70% of the card (Courtnee tallest), so sitting/lose poses stay small
    let k = ((size * 0.86) / 1.15) * ((def.stats && def.stats.size) || 1) / sh.S.standH * ((sh.S.fscale && sh.S.fscale[frame]) || 1);
    k = Math.min(k, (size * 0.98) / fr[2], (size * 0.98) / fr[3]);
    g.drawImage(sh.im, fr[0], fr[1], fr[2], fr[3], (size - fr[2] * k) / 2, size - fr[3] * k, fr[2] * k, fr[3] * k);
    return c.toDataURL();
  };

  const sp_startup = (a) => a.sp.startup || 24;
  // Codee's Mess Meter on his clothes: mud and grass painted only on his own pixels (so it moves with every
  // pose), from the boots up as the meter fills; the face stays clean. Cached per pose and level.
  const dirtCache = {};
  function dirtFor(sh, name, fr, lvl) {
    const key = sh.S.src + name + lvl;
    if (dirtCache[key]) return dirtCache[key];
    const c = document.createElement('canvas'); c.width = fr[2]; c.height = fr[3]; const d = c.getContext('2d');
    d.drawImage(sh.im, fr[0], fr[1], fr[2], fr[3], 0, 0, fr[2], fr[3]);
    d.globalCompositeOperation = 'source-atop';
    let seed = 0; for (const ch of name) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296);
    const w = fr[2], h = fr[3], top = h * [1, 0.72, 0.45, 0.24][lvl];
    d.fillStyle = 'rgba(70,44,20,.5)'; d.fillRect(0, h * 0.9, w, h * 0.1); // muddy boots
    for (let i = 0; i < 14 * lvl; i++) { // mud blotches
      const x = rnd() * w, y = top + rnd() * (h - top), r = (0.04 + rnd() * 0.07) * w;
      d.fillStyle = `rgba(${78 + rnd() * 30 | 0},${48 + rnd() * 20 | 0},22,${0.45 + rnd() * 0.3})`;
      d.beginPath(); d.ellipse(x, y, r, r * (0.6 + rnd() * 0.5), rnd() * 3, 0, Math.PI * 2); d.fill();
    }
    d.lineCap = 'round';
    for (let i = 0; i < 10 * lvl; i++) { // grass bits
      const x = rnd() * w, y = top + rnd() * (h - top), l = (0.05 + rnd() * 0.06) * h, an = -1.2 + rnd() * 2.4;
      d.strokeStyle = `rgba(${60 + rnd() * 40 | 0},${140 + rnd() * 50 | 0},40,.85)`; d.lineWidth = Math.max(1.5, w * 0.012);
      d.beginPath(); d.moveTo(x, y); d.quadraticCurveTo(x + l * 0.4, y - l * 0.5, x + Math.sin(an) * l, y - Math.cos(an) * l); d.stroke();
    }
    return (dirtCache[key] = c);
  }
  function drawSpriteFighter(g, f, G) {
    let sh = f.def.sprite && sheet(f.def.sprite);
    if (!sh) return false;
    let frameName = pickFrame(f, sh.S);
    const ua = f.act && f.act.type === 'ult' && f.act.u;
    const pres = presPose(f, G);
    if (pres) { sh = pres.sh; frameName = pres.frame; }
    if (ua && ua.sprite && sheet(ua.sprite) && ua.poses.length) { // ultimate key poses
      sh = sheet(ua.sprite); frameName = ua.poses[0][1];
      for (const [t, p] of ua.poses) if (f.act.t >= t) frameName = p;
    }
    if (!sh.S.frames[frameName] && sh.S.base) { const B = sheet(sh.S.base); if (B && B.S.frames[frameName]) sh = B; } // shared poses (Cole's shirts)
    let flip = f.face;
    if (f.face < 0 && sh.S.left) { const L = sheet(sh.S.left); if (L && L.S.frames[frameName]) { sh = L; flip = 1; } } // own left-facing art (Jaxston's left foot)
    const { S, im } = sh, fr = S.frames[frameName] || S.frames.idle0;
    const k = ((f.h * 1.15) / S.standH) * ((S.fscale && S.fscale[frameName]) || 1); // per-pose size fix (see build_sprites_js.py)
    const fsh = f.def.sprite && sheet(f.def.sprite);
    const id0 = fsh && fsh.S.frames.idle0; // how tall the standing art is (Evea's spirit form has Grandma floating over her)
    f.artH = id0 ? id0[3] * ((f.h * 1.15) / fsh.S.standH) * ((fsh.S.fscale && fsh.S.fscale.idle0) || 1) : 0;
    if (f.act && (f.act.type === 'cleanup' || f.act.type === 'backwork')) f.artH = Math.max(f.artH, fr[5] * k); // switching forms: Grandma appears / fades
    const da = f.act && f.act.type === 'special' && f.act.sp.trail && f.act.t >= 4 && f.act.t < 6 + f.act.sp.dur + 6 ? f.act : null;
    if (da && fsh && fsh.S.frames[da.sp.trail]) { // e.g. Pixel Rush: the pixel trail streams out behind him
      const tr = fsh.S.frames[da.sp.trail], th = f.h * 0.75, tw = (tr[2] / tr[3]) * th * 1.6, fade = Math.min(1, (6 + da.sp.dur + 6 - da.t) / 8);
      g.save(); g.globalAlpha = 0.9 * fade; g.translate(f.x - f.face * (tw * 0.45 + 10), f.y - f.h * 0.5); g.scale(f.face, 1);
      g.drawImage(fsh.im, tr[0], tr[1], tr[2], tr[3], -tw / 2, -th / 2, tw, th); g.restore();
    }
    if (f.super) { const au = fsh && fsh.S.frames.aura0; if (au) { g.save(); g.globalAlpha = 0.45 + 0.15 * Math.sin(G.frame * 0.4); const kk = (f.h * 1.5) / au[3]; g.drawImage(fsh.im, au[0], au[1], au[2], au[3], f.x - (au[2] * kk) / 2, f.y - au[3] * kk + 6, au[2] * kk, au[3] * kk); g.restore(); } } // golden aura behind him
    g.save();
    let slide = 0;
    if (G.countdown > 150) { const k = (G.countdown - 150) / MM.ENTRANCE; slide = -f.face * k * k * 260; g.globalAlpha = 1 - k * 0.6; }
    g.translate(f.x + slide, f.y);
    if (f.invuln > 0 && Math.floor(G.frame / 4) % 2) g.globalAlpha = 0.5;
    if (f.act && f.act.type === 'dodge') g.globalAlpha *= 0.55;
    if (f.buff) { g.save(); g.fillStyle = f.buff.color; g.globalAlpha *= 0.3; g.beginPath(); g.ellipse(0, -f.h * 0.55, f.w * 1.4, f.h * 0.75, 0, 0, TAU); g.fill(); g.restore(); }
    // player-color ring at the feet (keeps two of the same fighter apart without recoloring the art)
    if (f.ground) { g.save(); g.strokeStyle = f.team ? MM.TEAM_COLORS[f.team] : MM.PLAYER_COLORS[f.slot]; g.lineWidth = 4; g.globalAlpha *= 0.85; g.beginPath(); g.ellipse(0, -2, f.w * 0.9, 8, 0, 0, TAU); g.stroke(); g.restore(); }
    g.scale(flip * k, k);
    g.drawImage(im, fr[0], fr[1], fr[2], fr[3], -fr[4], -fr[5], fr[2], fr[3]);
    const lvl = f.def.mess && f.def.mess.dirt && f.formIdx === 0 && !(f.act && f.act.type === 'cleanup') ? (f.mess >= 100 ? 3 : f.mess >= 66 ? 2 : f.mess >= 33 ? 1 : 0) : 0;
    if (lvl) g.drawImage(dirtFor(sh, frameName, fr, lvl), -fr[4], -fr[5]);
    g.restore();
    if (f.def.fx && f.act && fsh) for (const e of f.def.fx) { // e.g. Sara's ink tattoo effects
      const a = f.act, on = e.act === a.type && (!e.name || e.name === a.name) && (!e.slot || e.slot === a.slot) && a.t >= e.t[0] && a.t < e.t[1];
      const ef = on && fsh.S.frames[e.pic]; if (!ef) continue;
      const h = e.h * f.s, w = (ef[2] / ef[3]) * h, life = (a.t - e.t[0]) / (e.t[1] - e.t[0]);
      g.save(); g.globalAlpha = Math.min(1, (1 - life) * 3) * (e.alpha || 1);
      g.translate(f.x + f.face * e.x * f.s, f.y + e.y * f.s); g.scale(f.face * (1 + (e.grow || 0) * life), 1 + (e.grow || 0) * life);
      g.drawImage(fsh.im, ef[0], ef[1], ef[2], ef[3], -w / 2, -h / 2, w, h); g.restore();
    }
    const a = f.act;
    if (f.slow) { g.save(); g.globalAlpha = 0.35; g.fillStyle = '#9fe8ff'; g.beginPath(); g.ellipse(f.x, f.y - f.h / 2, f.w * 0.9, f.h * 0.6, 0, 0, TAU); g.fill(); g.restore(); }
    if (a && a.counter) { g.strokeStyle = 'rgba(255,255,140,.9)'; g.lineWidth = 4; g.beginPath(); g.arc(f.x, f.y - f.h / 2, 72 + Math.sin(G.frame) * 4, 0, TAU); g.stroke(); }
    return true;
  }

  // one smooth energy beam (no tiles): soft outer glow, bright core, the art's beam tip at the end, an orb at the hands
  function drawBeam(g, f, G) {
    const b = f.act && f.act.beam; if (!b || (f.act.u && f.act.u.noBeamArt)) return; // some ultimates draw their wave in the pose art
    const sh = f.def.sprite && sheet(f.def.sprite), tip = sh && sh.S.frames.fx3, orb = sh && sh.S.frames.fx0;
    const gold = !!f.super, flick = 1 + 0.06 * Math.sin(G.frame * 1.7), th = b.th * flick;
    g.save(); g.translate(b.x, b.y); g.scale(b.dir, 1);
    const tipW = tip ? Math.min(b.len * 0.35, (tip[2] / tip[3]) * th * 1.5) : 0, bodyLen = b.len - tipW * 0.6;
    const layer = (h, color, alpha) => { g.globalAlpha = alpha; g.fillStyle = color; g.beginPath(); g.roundRect ? g.roundRect(0, -h / 2, bodyLen, h, h / 2) : g.rect(0, -h / 2, bodyLen, h); g.fill(); };
    g.globalCompositeOperation = 'lighter';
    layer(th * 1.6, gold ? '#ffb300' : '#1fa8ff', 0.25);
    layer(th * 1.05, gold ? '#ffd54a' : '#33c8ff', 0.55);
    const gr = g.createLinearGradient(0, -th / 2, 0, th / 2);
    gr.addColorStop(0, 'rgba(160,240,255,0)'); gr.addColorStop(0.35, '#bff6ff'); gr.addColorStop(0.5, '#ffffff'); gr.addColorStop(0.65, '#bff6ff'); gr.addColorStop(1, 'rgba(160,240,255,0)');
    g.globalAlpha = 0.95; g.fillStyle = gr; g.fillRect(0, -th * 0.42, bodyLen, th * 0.84);
    g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
    if (tip) { const h = th * 1.5, w = (tip[2] / tip[3]) * h; g.drawImage(sh.im, tip[0], tip[1], tip[2], tip[3], bodyLen - w * 0.4, -h / 2, w, h); }
    if (orb) { const r = th * 1.25; g.drawImage(sh.im, orb[0], orb[1], orb[2], orb[3], -r / 2, -r / 2, r, r); }
    g.restore();
  }
  function drawUltFx(g, f, G) {
    drawBeam(g, f, G);
    const a = f.act; if (!a || a.type !== 'ult') return;
    if (a.u.type === 'stampede' && a.sweepX != null) {
      g.save(); g.font = '72px serif'; g.textAlign = 'center'; g.textBaseline = 'bottom';
      const herd = a.u.herd ? [] : a.u.emoji || ['🦌', '🐇', '🐿️', '🦌', '🐇'];
      herd.forEach((e, i) => {
        const x = a.sweepX - f.face * i * 70, y = f.y - Math.abs(Math.sin(G.frame * 0.4 + i)) * 26;
        g.save(); g.translate(x, y); g.scale(-f.face, 1); g.fillText(e, 0, 0); g.restore(); // emoji animals face left; flip to run forward
      });
      g.restore();
    }
    if (a.u.herd && a.sweepX != null) { // e.g. Evea's spectral unicorns: pictures instead of emoji
      const sh = sheet(a.u.sprite || f.def.sprite), fr = sh && sh.S.frames[a.u.herd];
      if (fr) {
        const h = f.h * 1.35, w = (fr[2] / fr[3]) * h;
        for (let i = 0; i < 3; i++) {
          const x = a.sweepX - f.face * i * 120, y = f.y - Math.abs(Math.sin(G.frame * 0.35 + i)) * 22 - i * 30;
          g.save(); g.globalAlpha = 0.75; g.translate(x, y); g.scale(f.face, 1);
          g.drawImage(sh.im, fr[0], fr[1], fr[2], fr[3], -w / 2, -h, w, h); g.restore();
        }
      }
    }
    if (a.decoy) { // Jorie's Cardboard Checkout: the cutout stands there, then bursts
      const sh = sheet(f.def.ultimate.sprite || f.def.sprite), burst = a.t >= a.u.burstAt;
      const fr = sh && sh.S.frames[burst ? 'ult3' : (a.u.decoyPic || 'fxdecoy')];
      if (fr) {
        const k = burst ? 1 + Math.min(0.5, (a.t - a.u.burstAt) / 30) : 1, h = f.h * (burst ? 1.5 : 1.05) * k, w = (fr[2] / fr[3]) * h;
        g.save(); if (burst) g.globalAlpha = Math.max(0, 1 - (a.t - a.u.burstAt - 18) / 20);
        g.translate(a.decoy.x, a.decoy.y + (burst ? h * 0.15 : 0)); g.scale(a.decoy.face, 1); g.drawImage(sh.im, fr[0], fr[1], fr[2], fr[3], -w / 2, -h, w, h); g.restore();
      }
    }
    if (a.u.type === 'catch') {
      const k = Math.min(1, a.t / a.u.catchAt), r = a.u.radius * f.h * (a.t < a.u.catchAt ? k : 1);
      g.save(); g.globalAlpha = 0.25 + 0.15 * Math.sin(G.frame * 0.5); g.strokeStyle = f.accent; g.lineWidth = 8;
      g.beginPath(); g.arc(f.x, f.y - f.h / 2, r, 0, TAU); g.stroke();
      if (!a.u.sprite && a.t > a.u.catchAt) { g.globalAlpha = 0.9; g.font = '64px serif'; g.textAlign = 'center'; for (let i = 0; i < 6; i++) { const ang = G.frame * 0.12 + (i * TAU) / 6; g.fillText(a.u.emoji || '💥', f.x + Math.cos(ang) * r * 0.7, f.y - f.h / 2 + Math.sin(ang) * r * 0.5); } }
      g.restore();
    }
  }

  function drawSpriteProj(g, p) {
    let sh = p.sprite && p.owner.def.sprite && sheet(p.owner.def.sprite);
    if (sh && !sh.S.frames[p.anim ? p.anim[0] : p.sprite] && sh.S.base) sh = sheet(sh.S.base) || sh;
    if (!sh) return false;
    const fr = sh.S.frames[p.anim ? p.anim[Math.floor(p.t / 5) % p.anim.length] : p.sprite]; if (!fr) return false;
    const k = ((p.owner.h * 1.15) / sh.S.standH) * (p.scale || 1);
    if (p.line && !p.owner.dead && !p.owner.out) { // fishing line from the rod to the bobber
      const o = p.owner;
      g.save(); g.strokeStyle = 'rgba(30,30,30,.8)'; g.lineWidth = 2; g.beginPath();
      g.moveTo(o.x + o.face * 70 * o.s, o.y - 120 * o.s); g.quadraticCurveTo((o.x + p.x) / 2, Math.max(o.y - 120 * o.s, p.y) + 30, p.x, p.y); g.stroke(); g.restore();
    }
    g.save();
    if (p.runner) { g.translate(p.x, p.y + 18 - Math.abs(Math.sin(p.t * 0.5)) * 6); }
    else { g.translate(p.x, p.y); g.rotate(Math.sin(p.t * 0.25) * 0.4); }
    g.scale((p.dir || 1) * k, k);
    g.drawImage(sh.im, fr[0], fr[1], fr[2], fr[3], -fr[4], -fr[5], fr[2], fr[3]);
    g.restore();
    return true;
  }

  function seeded(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }

  // ---------- heads (also used for menu portraits) ----------
  MM.drawHead = function (ctx, def, x, y, r, opts = {}) {
    const im = MM.photos[def.id];
    ctx.save();
    if (im && im.complete && im.naturalWidth) {
      // full cutout portrait (head and shoulders), no circle
      const k = Math.min((r * 2.3) / im.naturalWidth, (r * 2.3) / im.naturalHeight);
      const w = im.naturalWidth * k, h = im.naturalHeight * k;
      if (opts.flip) { ctx.translate(x, 0); ctx.scale(-1, 1); ctx.translate(-x, 0); }
      ctx.drawImage(im, x - w / 2, y - h / 2, w, h);
    } else {
      // cartoon placeholder face
      ctx.fillStyle = def.skin || '#e8b48a';
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      ctx.lineWidth = Math.max(2, r * 0.1); ctx.strokeStyle = '#1b1b2a'; ctx.stroke();
      const fx = opts.flip ? -1 : 1;
      ctx.fillStyle = def.hair || '#333';
      ctx.beginPath(); ctx.arc(x, y - r * 0.12, r * 1.02, Math.PI * 1.05, Math.PI * 1.95); ctx.quadraticCurveTo(x, y - r * 0.45, x - r, y - r * 0.2); ctx.fill();
      ctx.fillStyle = '#1b1b2a';
      const ey = y + r * 0.02, ex = r * 0.32;
      const hurt = opts.hurt;
      if (hurt) { ctx.lineWidth = r * 0.09; for (const s of [-1, 1]) { const cx = x + s * ex + fx * r * 0.12; ctx.beginPath(); ctx.moveTo(cx - r * 0.1, ey - r * 0.1); ctx.lineTo(cx + r * 0.1, ey + r * 0.1); ctx.moveTo(cx + r * 0.1, ey - r * 0.1); ctx.lineTo(cx - r * 0.1, ey + r * 0.1); ctx.stroke(); } }
      else for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(x + s * ex + fx * r * 0.12, ey, r * 0.1, r * 0.15, 0, 0, TAU); ctx.fill(); }
      ctx.lineWidth = r * 0.08; ctx.beginPath();
      if (hurt) ctx.arc(x + fx * r * 0.12, y + r * 0.5, r * 0.18, Math.PI * 1.1, Math.PI * 1.9);
      else ctx.arc(x + fx * r * 0.12, y + r * 0.3, r * 0.25, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
      if (def.hat === 'witch') { // pointy witch hat
        ctx.fillStyle = '#1b1030'; ctx.strokeStyle = '#1b1b2a'; ctx.lineWidth = Math.max(2, r * 0.08);
        ctx.beginPath(); ctx.ellipse(x, y - r * 0.62, r * 1.35, r * 0.28, 0, 0, TAU); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - r * 0.75, y - r * 0.7); ctx.lineTo(x + fx * r * 0.55, y - r * 2.2); ctx.lineTo(x + r * 0.75, y - r * 0.7); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = def.accent || '#7CFC00'; ctx.fillRect(x - r * 0.72, y - r * 0.95, r * 1.44, r * 0.22);
      } else if (def.hat === 'mermaid') { // seashell tiara
        ctx.font = `${r * 0.8}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('🐚', x - r * 0.5, y - r * 0.85); ctx.fillText('⭐', x + r * 0.5, y - r * 0.85);
      }
    }
    ctx.restore();
  };

  MM.portrait = function (def, size = 160) {
    const c = document.createElement('canvas'); c.width = c.height = size;
    const g = c.getContext('2d');
    const im = MM.photos[def.id];
    if (im && im.complete && im.naturalWidth) { // artwork portraits: the full cutout, no circle
      g.drawImage(im, 0, 0, size, size);
      return c.toDataURL();
    }
    g.fillStyle = def.color; g.beginPath(); g.arc(size / 2, size * 1.05, size * 0.48, 0, TAU); g.fill();
    MM.drawHead(g, def, size / 2, size * 0.44, size * 0.33);
    return c.toDataURL();
  };

  // ---------- camera ----------
  const cam = { x: 0, y: -250, w: 1600 };
  MM.resetCamera = () => { cam.x = 0; cam.y = -250; cam.w = 1700; };
  function updateCamera(G, cw, ch) {
    const live = G.fighters.filter((f) => !f.out && !f.dead);
    const cx = MM.spawnX(G.stage);
    let l = cx - 500, r = cx + 500, t = -400, b = 100;
    if (live.length) {
      l = Math.min(...live.map((f) => f.x)) - 260; r = Math.max(...live.map((f) => f.x)) + 260;
      t = Math.min(...live.map((f) => f.y - f.h)) - 200; b = Math.max(...live.map((f) => f.y)) + 160;
    }
    for (const p of G.stage.plats) if (p.y > 0) b = Math.max(b, p.y + 230); // keep low boats above the HUD
    const bl = G.stage.blast;
    l = Math.max(l, MM.blastLeft(bl) - 100); r = Math.min(r, MM.blastRight(bl) + 100);
    t = Math.max(t, bl.top - 100); b = Math.min(Math.max(b, 160), bl.bottom + 100);
    const aspect = cw / ch;
    let w = Math.max(r - l, (b - t) * aspect, 1100);
    w = Math.min(w, 2800);
    const tx = (l + r) / 2, ty = (t + b) / 2;
    cam.x += (tx - cam.x) * 0.07; cam.y += (ty - cam.y) * 0.07; cam.w += (w - cam.w) * 0.05;
  }

  // ---------- stage art ----------
  const STAGE_ART = {
    backyard: {
      sky(g, W, H, px) {
        const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#3a2a6b'); gr.addColorStop(0.45, '#e2577c'); gr.addColorStop(0.8, '#ffb35c'); gr.addColorStop(1, '#ffd98a');
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        g.fillStyle = 'rgba(255,240,180,.9)'; g.beginPath(); g.arc(W * 0.72 - px * 0.02, H * 0.58, H * 0.1, 0, TAU); g.fill();
        hills(g, W, H, px * 0.06, H * 0.7, '#7a3d6b', 7); hills(g, W, H, px * 0.12, H * 0.78, '#4e2d55', 11);
      },
      floor(g, s, m) {
        g.fillStyle = '#5b3a24'; rr(g, m.left, 0, m.right - m.left, m.depth, 30); g.fill();
        g.fillStyle = '#4a2e1c'; for (let i = 0; i < 18; i++) { const x = m.left + 40 + ((i * 137) % (m.right - m.left - 80)); g.beginPath(); g.arc(x, 60 + ((i * 53) % (m.depth - 90)), 6 + (i % 3) * 3, 0, TAU); g.fill(); }
        g.fillStyle = '#4fbf46'; rr(g, m.left - 10, -6, m.right - m.left + 20, 34, 16); g.fill();
        g.fillStyle = '#3e9d38'; for (let x = m.left; x < m.right; x += 22) { g.beginPath(); g.moveTo(x, 26); g.lineTo(x + 11, 40); g.lineTo(x + 22, 26); g.fill(); }
        // fence + grill props
        g.fillStyle = '#e8d3b0'; for (let x = m.left + 30; x < m.left + 300; x += 34) { g.fillRect(x, -70, 22, 64); g.beginPath(); g.moveTo(x, -70); g.lineTo(x + 11, -84); g.lineTo(x + 22, -70); g.fill(); }
        g.fillRect(m.left + 30, -50, 270, 8);
        g.fillStyle = '#222'; g.beginPath(); g.ellipse(m.right - 130, -58, 44, 22, 0, 0, Math.PI); g.fill(); g.fillRect(m.right - 134, -40, 8, 34); g.fillRect(m.right - 160, -10, 60, 4);
        g.fillStyle = 'rgba(200,200,200,.35)'; for (let i = 0; i < 3; i++) { g.beginPath(); g.arc(m.right - 140 + i * 10, -90 - i * 22 - (Date.now() / 40) % 20, 10 + i * 3, 0, TAU); g.fill(); }
      },
      plat(g, p) { g.fillStyle = '#a5683a'; rr(g, p.x, p.y, p.w, 18, 6); g.fill(); g.fillStyle = '#7d4c28'; for (let x = p.x + 30; x < p.x + p.w; x += 60) g.fillRect(x, p.y + 2, 3, 14); g.fillStyle = '#6b4125'; g.fillRect(p.x + 20, p.y + 18, 10, 24); g.fillRect(p.x + p.w - 30, p.y + 18, 10, 24); },
    },
    rooftop: {
      sky(g, W, H, px) {
        const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#060a1f'); gr.addColorStop(1, '#23305e');
        g.fillStyle = gr; g.fillRect(0, 0, W, H);
        const R = seeded(7); g.fillStyle = '#fff';
        for (let i = 0; i < 120; i++) { g.globalAlpha = 0.3 + R() * 0.7; g.fillRect(((R() * W * 1.5 - px * 0.01) % W + W) % W, R() * H * 0.6, 2, 2); }
        g.globalAlpha = 1; g.fillStyle = '#f5f0d0'; g.beginPath(); g.arc(W * 0.2, H * 0.2, H * 0.07, 0, TAU); g.fill();
        city(g, W, H, px * 0.05, H * 0.55, '#141b3a', 3); city(g, W, H, px * 0.1, H * 0.68, '#0d1230', 5);
      },
      floor(g, s, m) {
        g.fillStyle = '#5c6274'; g.fillRect(m.left, 0, m.right - m.left, m.depth);
        g.fillStyle = '#4b5061'; for (let y = 30; y < m.depth; y += 40) for (let x = m.left + 30; x < m.right - 60; x += 110) g.fillRect(x, y, 70, 22);
        g.fillStyle = '#ffd86b'; for (let y = 34; y < m.depth; y += 40) for (let x = m.left + 34; x < m.right - 60; x += 220) g.fillRect(x, y, 62, 14);
        g.fillStyle = '#8a90a3'; g.fillRect(m.left - 8, -10, m.right - m.left + 16, 14);
        g.fillStyle = '#9aa0b2'; g.fillRect(m.left + 80, -60, 90, 50); g.fillStyle = '#6f7588'; g.beginPath(); g.arc(m.left + 125, -35, 18, 0, TAU); g.fill();
        g.fillStyle = '#c0392b'; g.fillRect(m.right - 120, -120, 8, 110); g.beginPath(); g.arc(m.right - 116, -124, 8, 0, TAU); g.fillStyle = Math.floor(Date.now() / 500) % 2 ? '#ff3b3b' : '#661010'; g.fill();
      },
      plat(g, p) { g.fillStyle = '#c0392b'; g.fillRect(p.x, p.y, p.w, 14); g.strokeStyle = '#7d2419'; g.lineWidth = 4; for (let x = p.x; x < p.x + p.w - 20; x += 28) { g.beginPath(); g.moveTo(x, p.y + 14); g.lineTo(x + 14, p.y + 40); g.lineTo(x + 28, p.y + 14); g.stroke(); } g.fillStyle = '#a93226'; g.fillRect(p.x, p.y + 38, p.w, 8); },
    },
    table: {
      sky(g, W, H, px) {
        g.fillStyle = '#f3e1c0'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#ead1a6'; for (let x = (-px * 0.05) % 80 - 80; x < W; x += 80) g.fillRect(x, 0, 36, H);
        g.fillStyle = '#9bd4ff'; const wx = W * 0.6 - px * 0.04; g.fillRect(wx, H * 0.12, W * 0.22, H * 0.34); g.strokeStyle = '#fff'; g.lineWidth = 10; g.strokeRect(wx, H * 0.12, W * 0.22, H * 0.34); g.beginPath(); g.moveTo(wx + W * 0.11, H * 0.12); g.lineTo(wx + W * 0.11, H * 0.46); g.stroke();
        g.fillStyle = '#8b5a2b'; g.fillRect(0, H * 0.86, W, H * 0.14);
        g.fillStyle = '#5a3a1e'; g.fillRect(W * 0.1 - px * 0.05, H * 0.22, W * 0.12, H * 0.16); g.fillStyle = '#fff'; g.font = `bold ${H * 0.035}px system-ui`; g.textAlign = 'center'; g.fillText('MORRIS', W * 0.16 - px * 0.05, H * 0.31); g.font = `${H * 0.022}px system-ui`; g.fillText('family', W * 0.16 - px * 0.05, H * 0.35);
      },
      floor(g, s, m) {
        g.fillStyle = '#6b4123'; g.fillRect(m.left + 60, 40, 50, m.depth + 400); g.fillRect(m.right - 110, 40, 50, m.depth + 400);
        const sq = 40; for (let x = m.left; x < m.right; x += sq) for (let y = 0; y < 50; y += sq / 2) { g.fillStyle = ((x - m.left) / sq + y / (sq / 2)) % 2 ? '#d93838' : '#fff'; g.fillRect(x, y, sq, sq / 2); }
        g.fillStyle = '#d93838'; g.beginPath(); for (let x = m.left; x <= m.right; x += 40) { g.moveTo(x, 50); g.lineTo(x + 20, 80); g.lineTo(x + 40, 50); } g.fill();
        g.fillStyle = '#fff'; g.beginPath(); g.ellipse(m.left + 260, -8, 90, 14, 0, 0, TAU); g.fill(); g.beginPath(); g.ellipse(m.right - 280, -8, 90, 14, 0, 0, TAU); g.fill();
        g.font = '70px serif'; g.textAlign = 'center'; g.fillText('🍗', m.left + 260, -12); g.fillText('🥧', m.right - 280, -12); g.fillText('🥛', 0, -14);
      },
      plat() {},
    },
  };
  // ---------- illustrated arenas (art in stage-art.js) ----------
  const stageImgs = {};
  function stageImg(src) {
    if (!stageImgs[src]) { const im = new Image(); im.src = src; stageImgs[src] = im; }
    const im = stageImgs[src];
    return im.complete && im.naturalWidth ? im : null;
  }
  MM.preloadStages = () => { for (const k in MM.STAGE_PICS || {}) { stageImg(MM.STAGE_PICS[k].bg); stageImg(MM.STAGE_PICS[k].props); } };
  // Draw a platform prop so its walkable top (sx0..sx1 at height sy) sits exactly on x..x+w at y.
  function drawPlatPic(g, im, P, spec, x, y, w, G) {
    if (spec.decorAnim) { // drawn like a decor picture (with its animation) at the same place
      const b = MM.propBox(P, spec, x, y, w);
      if (spec.hang) { // hung from the rafters on two chains
        g.strokeStyle = '#2a2a30'; g.lineWidth = 5; g.setLineDash([9, 5]);
        for (const hx of spec.hang) { g.beginPath(); g.moveTo(b.left + hx * b.k, b.top + 4); g.lineTo(b.left + hx * b.k, b.top - 2500); g.stroke(); }
        g.setLineDash([]);
      }
      return drawDecor(g, im, P, { pic: spec.pic, x: b.left + b.width / 2, y: b.bottom, h: b.height, anim: spec.decorAnim }, G);
    }
    const f = P.frames[spec.pic], r = spec.sub ? [f[0] + spec.sub[0], f[1] + spec.sub[1], spec.sub[2], spec.sub[3]] : f;
    const cols = spec.grid ? spec.grid[0] : 1, rows = spec.grid ? spec.grid[1] : 1;
    const k = w / cols / (spec.sx1 - spec.sx0), step = (r[3] - spec.sy * 2) * k;
    for (let row = rows - 1; row >= 0; row--) for (let c = 0; c < cols; c++) {
      g.drawImage(im, r[0], r[1], r[2], r[3], x + (c * w) / cols - spec.sx0 * k, y - spec.sy * k + row * step, r[2] * k, r[3] * k);
    }
  }
  function drawDecor(g, im, P, d, G) {
    const f = P.frames[d.pic], k = d.h / f[3], w = f[2] * k;
    let x = d.x, y = d.y, rot = 0;
    const T = G ? G.frame : 0;
    if (d.anim === 'train') { // a (harmless) train rolls past behind the street now and then
      const cyc = (T + 1200) % 2400; if (cyc > 600) return; // first pass about 20 seconds in
      x = -1500 + (cyc / 600) * 3000;
    }
    if (d.anim === 'bell') rot = Math.sin(T * 0.05) * 0.03;
    g.save(); g.translate(x, y - d.h / 2); if (rot) g.rotate(rot); if (d.flip) g.scale(-1, 1);
    g.drawImage(im, f[0], f[1], f[2], f[3], -w / 2, -d.h / 2, w, d.h);
    if (d.anim === 'crossing' && (T + 1240) % 2400 < 680 && Math.floor(T / 20) % 2 === 0) { // flash one light at a time
      const side = Math.floor(T / 20) % 4 === 0 ? 0 : 1, lx = [44, 165][side], ly = 184;
      g.fillStyle = 'rgba(255,60,40,.75)'; g.beginPath(); g.arc(-w / 2 + lx * k, -d.h / 2 + ly * k, 24 * k, 0, TAU); g.fill();
    }
    if (d.anim === 'scoreboard' && G) { // the blank scoreboard shows the match clock, KOs and who's left
      const sec = Math.max(0, Math.floor((G.frame - 150) / 60)), at = (px, py) => [-w / 2 + px * k, -d.h / 2 + py * k];
      g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#ffc21a';
      g.font = `900 ${Math.round(46 * k)}px system-ui`; g.fillText('POLAR BEARS', ...at(268, 85));
      g.fillStyle = '#ff6a2a'; g.font = `700 ${Math.round(56 * k)}px ui-monospace, monospace`; g.fillText(`${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`, ...at(268, 138));
      g.fillStyle = '#fff'; g.font = `800 ${Math.round(34 * k)}px system-ui`;
      g.fillText(`KO ${G.fighters.reduce((n, o) => n + o.falls, 0)}`, ...at(95, 211));
      g.fillText('MORRIS', ...at(268, 211));
      g.fillText(`IN ${G.fighters.filter((o) => !o.out).length}`, ...at(443, 211));
    }
    g.restore();
  }
  function illustrated(P) {
    const decor = (g, im, layer, G) => { for (const d of P.decor || []) if ((d.layer || 'mid') === layer) drawDecor(g, im, P, d, G); };
    return {
      sky(g, W, H, px, cam) {
        const im = stageImg(P.bg);
        if (!im) { g.fillStyle = '#1a0b2e'; g.fillRect(0, 0, W, H); return; }
        // cover the screen with a little room to slide (parallax) and a gentle zoom with the camera
        const cw = cam ? cam.w : 1700, cy = cam ? cam.y : -250;
        const zoom = 1.08 + 0.1 * Math.max(0, Math.min(1, (1700 - cw) / 600));
        const s = Math.max(W / im.naturalWidth, H / im.naturalHeight) * zoom, iw = im.naturalWidth * s, ih = im.naturalHeight * s;
        const ex = (iw - W) / 2, ey = (ih - H) / 2, u = W / 1700;
        const ox = Math.max(-ex, Math.min(ex, -px * 0.08 * u)), oy = Math.max(-ey, Math.min(ey, -(cy + 250) * 0.06 * u));
        g.drawImage(im, (W - iw) / 2 + ox, (H - ih) / 2 + oy, iw, ih);
      },
      floor(g, s, m, G) {
        const im = stageImg(P.props), pic = (p) => MM.platSpec(P, p.pic);
        if (P.fade) { // darken the painted ground below the floor line
          const gr = g.createLinearGradient(0, -30, 0, 400); gr.addColorStop(0, 'rgba(15,8,30,0)'); gr.addColorStop(0.25, `rgba(15,8,30,${P.fade})`); gr.addColorStop(1, `rgba(15,8,30,${Math.min(0.85, P.fade * 1.7)})`);
          g.fillStyle = gr; g.fillRect(-4000, -30, 8000, 3030);
        }
        if (!im) { g.fillStyle = '#5b3a24'; g.fillRect(m.left, 0, m.right - m.left, m.depth); return; }
        decor(g, im, 'back', G);
        for (const p of s.plats) { const sp = pic(p); if (sp && sp.behind) drawPlatPic(g, im, P, sp, p.x, p.y, p.w, G); }
        drawPlatPic(g, im, P, P.main, m.left, 0, m.right - m.left);
        for (const p of s.plats) { const sp = pic(p); if (sp && !sp.behind && !sp.front) drawPlatPic(g, im, P, sp, p.x, p.y, p.w, G); }
        decor(g, im, 'mid', G);
      },
      plat(g, p, G) {
        const im = stageImg(P.props), sp = MM.platSpec(P, p.pic);
        if (!im) { g.fillStyle = '#a5683a'; g.fillRect(p.x, p.y, p.w, 16); return; }
        if (sp && sp.front) drawPlatPic(g, im, P, sp, p.x, p.y, p.w, G);
      },
      front(g, G) {
        const im = stageImg(P.props);
        if (im) decor(g, im, 'front', G);
        drawWater(g, P.water, G);
      },
    };
  }
  function drawWater(g, water, G) {
    if (!water) return; // see-through lake surface with a little ripple
    const y = water.y, t = (G ? G.frame : 0) * 0.04;
    g.fillStyle = water.color; g.beginPath(); g.moveTo(-4000, 3000);
    for (let x = -4000; x <= 4000; x += 80) g.lineTo(x, y + Math.sin(x * 0.02 + t) * 5);
    g.lineTo(4000, 3000); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(220,250,255,.55)'; g.lineWidth = 3; g.beginPath();
    for (let x = -4000; x <= 4000; x += 80) g[x === -4000 ? 'moveTo' : 'lineTo'](x, y + Math.sin(x * 0.02 + t) * 5);
    g.stroke();
  }

  // ---------- custom arenas (made in the Arena Maker, arena-maker.js) ----------
  // stage.art = { bg: an arena key ('agnew', ...) or 'sky', water: { y, color } or null,
  //   pieces: [{ atlas, pic, role: 'main' | 'plat' | 'bob' | 'decor', x, y, w, plat }] } in drawing order.
  // Every piece is placed by its walkable top line (x..x+w at y); decor uses the whole picture's top edge.
  // Moving pieces (role 'bob') follow their platform (stage.plats[plat]).
  MM.pieceSpec = function (atlas, pic, role) {
    const P = MM.STAGE_PICS[atlas];
    if (!P) return null;
    const sp = role !== 'decor' && MM.platSpec(P, pic);
    if (sp) return sp;
    const frame = P.frames[pic] ? pic : P.pics[pic] && P.pics[pic].pic;
    if (!frame || !P.frames[frame]) return null;
    return { pic: frame, sx0: 0, sx1: P.frames[frame][2], sy: 0 };
  };
  MM.drawPiece = function (g, pc, x, y, w, G) {
    if (pc.atlas === 'basic') { // the plain floor block (no picture): grassy top on a stone block, 4 : 1
      const h = w / 4, r = Math.min(18, h * 0.2);
      g.fillStyle = '#6f6a73'; rr(g, x, y, w, h, r); g.fill();
      g.fillStyle = '#5c5762'; for (let i = 1; i < 4; i++) g.fillRect(x + (w * i) / 4 - 2, y + h * 0.3, 4, h * 0.62);
      g.fillStyle = '#58b947'; rr(g, x - 4, y - 4, w + 8, Math.max(12, h * 0.2), r); g.fill();
      g.strokeStyle = '#1a0b2e'; g.lineWidth = 4; rr(g, x, y, w, h, r); g.stroke();
      return;
    }
    const P = MM.STAGE_PICS[pc.atlas], sp = MM.pieceSpec(pc.atlas, pc.pic, pc.role), im = P && stageImg(P.props);
    if (!sp) return;
    if (!im) { g.fillStyle = '#a5683a'; g.fillRect(x, y, w, 16); return; }
    if (pc.tiles > 1) sp.grid = [pc.tiles, 1];
    if (pc.anim && G) { const b = MM.propBox(P, sp, x, y, w); return drawDecor(g, im, P, { pic: sp.pic, x: b.left + b.width / 2, y: b.bottom, h: b.height, anim: pc.anim }, G); }
    drawPlatPic(g, im, P, sp, x, y, w, G);
  };
  MM.stageImg = stageImg;
  // Is the art for this match on screen yet? (fighters' atlases and the arena). The countdown waits for it,
  // so a slow download never eats the 3-2-1.
  MM.artReady = (G) => {
    const ok = (im) => !im || im.complete; // loaded, or failed (a missing picture must not hold the match forever)
    for (const f of G.fighters) {
      const base = MM.FIGHTERS.find((d) => d.id === (f.def.baseId || f.def.id)) || f.def;
      const defs = base.forms ? MM.formDefs(base) : [f.def];
      for (const d of defs) for (const id0 of [d.sprite, d.ultimate && d.ultimate.sprite]) for (const id of [id0, id0 && MM.SPRITES && MM.SPRITES[id0] && MM.SPRITES[id0].left]) if (id && MM.SPRITES && MM.SPRITES[id]) { sheet(id); if (!ok(spriteImgs[id])) return false; }
    }
    const P = MM.STAGE_PICS && MM.STAGE_PICS[(G.stage.art && G.stage.art.bg) || G.stage.id];
    if (P) for (const src of [P.bg, P.props]) if (src) { stageImg(src); if (!ok(stageImgs[src])) return false; }
    return true;
  };
  function plainSky(g, W, H) {
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#2f7fd8'); gr.addColorStop(0.7, '#9fd4ff'); gr.addColorStop(1, '#d9f0ff');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = 'rgba(255,255,255,.85)';
    for (const [cx, cy, r] of [[0.15, 0.18, 0.05], [0.2, 0.17, 0.04], [0.62, 0.12, 0.045], [0.68, 0.13, 0.035], [0.85, 0.3, 0.04]]) { g.beginPath(); g.arc(W * cx, H * cy, H * r, 0, TAU); g.fill(); }
  }
  MM.drawSky = function (g, W, H, bg, px, cam) {
    const P = MM.STAGE_PICS[bg];
    if (P && STAGE_ART[bg]) STAGE_ART[bg].sky(g, W, H, px, cam); else plainSky(g, W, H);
  };
  function customArt(stage) {
    const A = stage.art;
    return {
      sky(g, W, H, px, cam) { MM.drawSky(g, W, H, A.bg, px, cam); },
      floor(g, s, m, G) {
        for (const pc of A.pieces) {
          const p = pc.plat !== undefined && s.plats[pc.plat];
          if (p) MM.drawPiece(g, pc, p.x, p.y, p.w, G); else MM.drawPiece(g, pc, pc.x, pc.y, pc.w, G);
        }
      },
      plat() {},
      front(g, G) { drawWater(g, A.water, G); },
    };
  }
  for (const k in MM.STAGE_PICS || {}) STAGE_ART[k] = illustrated(MM.STAGE_PICS[k]);

  function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
  function hills(g, W, H, off, base, color, n) { g.fillStyle = color; g.beginPath(); g.moveTo(0, H); for (let i = 0; i <= 40; i++) { const x = (i / 40) * W; g.lineTo(x, base - Math.sin(i / n * 3 + off * 0.01) * H * 0.05 - Math.sin(i * 0.7) * H * 0.02); } g.lineTo(W, H); g.fill(); }
  function city(g, W, H, off, base, color, seed) {
    const R = seeded(seed); g.fillStyle = color; let x = -((off % 200) + 200);
    while (x < W + 200) { const w = 60 + R() * 120, h = H * (0.08 + R() * 0.3); g.fillStyle = color; g.fillRect(x, base - h, w, H); g.fillStyle = 'rgba(255,214,110,.55)'; for (let wy = base - h + 12; wy < H; wy += 22) for (let wx = x + 8; wx < x + w - 10; wx += 18) if (R() < 0.35) g.fillRect(wx, wy, 8, 10); x += w + 6; }
  }

  // ---------- fighters ----------
  function drawFighter(g, f, G) {
    if (f.out || f.dead) return;
    const a = f.act;
    if (a && a.hidden) return;
    const s = f.s, d = f.def, face = f.face;
    if (!drawSpriteFighter(g, f, G)) {
    g.save();
    g.translate(f.x, f.y);
    if (f.invuln > 0 && Math.floor(G.frame / 4) % 2) g.globalAlpha = 0.5;
    // aura for buffs
    if (f.buff) { g.fillStyle = f.buff.color; g.globalAlpha *= 0.25 + 0.1 * Math.sin(G.frame * 0.3); g.beginPath(); g.ellipse(0, -60 * s, 60 * s, 80 * s, 0, 0, TAU); g.fill(); g.globalAlpha = f.invuln > 0 && Math.floor(G.frame / 4) % 2 ? 0.5 : 1; }
    // shadow on the floor below
    let pose = a ? a.pose : null;
    let prog = a ? Math.min(1, a.t / Math.max(1, a.m ? a.m.start + a.m.active : 12)) : 0;
    let rot = 0, crouch = 0;
    if (f.hitstun > 0 && !f.ground) { pose = 'tumble'; rot = (G.frame * 0.35 * face) % TAU; }
    else if (f.hitstun > 0) pose = 'hurt';
    if (f.jsq > 0 || pose === 'land') crouch = 8;
    if (pose === 'spin') rot = a.t * 0.55 * face;
    if (pose === 'roll') rot = (a.t / a.dur) * TAU * face;
    if (pose === 'dash' && a.t > 5) rot = 0.35 * face;
    if (pose === 'sweep') crouch = 14;
    g.translate(0, -50 * s); g.rotate(rot); g.translate(0, 50 * s);
    g.scale(face * s, s);
    // body anchor points (facing right)
    const hipY = -40 + crouch, neckY = -70 + crouch, headY = -94 + crouch;
    const speed = Math.abs(f.vx);
    const run = f.ground && !a && speed > 0.8 ? Math.sin(f.anim * 0.35) : 0;
    let legF = [14 * run + 4, 0], legB = [-14 * run - 2, 0];
    if (!f.ground && pose !== 'stomp') { legF = [12, -10]; legB = [-8, -4]; }
    let armF = [16 + run * -8, neckY + 30], armB = [-12 + run * 8, neckY + 28];
    if (!f.ground && !pose) { armF = [22, neckY - 4]; armB = [-20, neckY - 2]; }
    const ext = prog >= 1 || (a && a.box) ? 1 : prog;
    switch (pose) {
      case 'punch': armF = [18 + 34 * ext, neckY + 6]; armB = [-6, neckY + 22]; break;
      case 'kick': legF = [20 + 32 * ext, hipY - 10 * ext]; armF = [-4, neckY + 22]; break;
      case 'uppercut': armF = [8, neckY - 46 * ext]; armB = [-14, neckY + 20]; break;
      case 'sweep': legF = [26 + 34 * ext, -2]; legB = [-22, 0]; break;
      case 'stomp': legF = [6, 18 * ext]; legB = [-6, 18 * ext]; armF = [20, neckY - 12]; armB = [-20, neckY - 12]; break;
      case 'spin': armF = [36, neckY + 6]; armB = [-36, neckY + 6]; legF = [20, -4]; break;
      case 'throw': armF = [20 + 22 * ext, neckY - 18 + 22 * ext]; break;
      case 'cast': armF = [42, neckY + 6]; armB = [38, neckY + 10]; break;
      case 'dash': armF = [44, neckY + 2]; armB = [-24, neckY + 14]; legB = [-22, -6]; break;
      case 'slam': armF = [14, neckY - 36]; armB = [-10, neckY - 36]; break;
      case 'guard': armF = [22, neckY + 4]; armB = [18, neckY + 14]; break;
      case 'flex': armF = [30, neckY - 30]; armB = [-30, neckY - 30]; break;
      case 'tumble': case 'hurt': armF = [26, neckY - 20]; armB = [-24, neckY - 18]; legF = [16, -8]; legB = [-14, 0]; break;
    }
    const dark = shade(f.color, -0.25);
    const limb = (x1, y1, x2, y2, w, c) => { g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); };
    // back limbs
    limb(-6, hipY, legB[0], legB[1] - 2, 13, '#2c2c3e');
    limb(-8, neckY + 6, armB[0], armB[1], 10, dark);
    g.fillStyle = d.skin || '#e8b48a'; g.beginPath(); g.arc(armB[0], armB[1], 6, 0, TAU); g.fill();
    // torso
    g.fillStyle = f.color; rr(g, -17, neckY, 34, hipY - neckY + 6, 10); g.fill();
    g.strokeStyle = '#1b1b2a'; g.lineWidth = 2.5; g.stroke();
    g.fillStyle = f.accent; g.font = 'bold 16px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.save(); if (face < 0) { g.scale(-1, 1); } g.fillText('M', 0, (neckY + hipY) / 2 + 2); g.restore();
    // front limbs
    limb(6, hipY, legF[0], legF[1] - 2, 13, '#3a3a52');
    g.fillStyle = '#1b1b2a'; g.beginPath(); g.ellipse(legF[0] + 4, legF[1] - 3, 9, 5, 0, 0, TAU); g.fill(); g.beginPath(); g.ellipse(legB[0] + 4, legB[1] - 3, 9, 5, 0, 0, TAU); g.fill();
    limb(10, neckY + 6, armF[0], armF[1], 10, f.color);
    g.fillStyle = d.skin || '#e8b48a'; g.beginPath(); g.arc(armF[0], armF[1], 7, 0, TAU); g.fill();
    // head (drawn unflipped so photos never mirror)
    g.save(); g.scale(face, 1);
    MM.drawHead(g, d, 0, headY, 27, { flip: face < 0, hurt: f.hitstun > 0, color: f.color });
    g.restore();
    // counter shimmer
    if (a && a.counter) { g.strokeStyle = 'rgba(255,255,140,.9)'; g.lineWidth = 4; g.beginPath(); g.arc(0, -56, 70 + Math.sin(G.frame) * 4, 0, TAU); g.stroke(); }
    if (a && a.armor) { g.strokeStyle = 'rgba(255,140,60,.8)'; g.lineWidth = 5; g.beginPath(); g.arc(0, -56, 66, 0, TAU); g.stroke(); }
    g.restore();
    }
    // swoosh trail on active attacks (cartoon fighters only; artwork has its own effects)
    if (a && a.box && !d.sprite) {
      g.save(); g.globalAlpha = 0.35; g.fillStyle = '#fff';
      const b = a.box; g.beginPath(); g.ellipse(b.x + b.w / 2, b.y + b.h / 2, b.w / 2, b.h / 2, 0, 0, TAU); g.fill(); g.restore();
    }
    // player tag
    const tagY = f.y - Math.max(f.h, (f.artH || 0) * 0.9) - 44 * s; // above the head (and anything floating over it)
    const mk = ui(f.cpu ? 'hud-marker-cpu.png' : `hud-marker-p${f.slot % 4 + 1}.png`);
    if (mk) { // ChatGPT marker: colored arrow with the tag in its white shield
      const ms = 58; g.drawImage(mk, f.x - ms / 2, tagY + 12 - ms * (118 / 128), ms, ms);
      g.fillStyle = '#1a0b2e'; g.font = `900 ${f.cpu ? 12 : 15}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(f.cpu ? 'CPU' : 'P' + (f.slot + 1), f.x, tagY + 12 - ms * (118 / 128) + ms * (38 / 128));
      if (f.team) { g.fillStyle = MM.TEAM_COLORS[f.team]; g.font = '900 16px system-ui'; g.textAlign = 'left'; g.lineWidth = 4; g.strokeStyle = '#1a0b2e'; g.strokeText(f.team, f.x + ms * 0.42, tagY - 18); g.fillText(f.team, f.x + ms * 0.42, tagY - 18); }
    } else {
      g.fillStyle = f.team ? MM.TEAM_COLORS[f.team] : MM.PLAYER_COLORS[f.slot];
      g.beginPath(); g.moveTo(f.x - 9, tagY); g.lineTo(f.x + 9, tagY); g.lineTo(f.x, tagY + 11); g.fill();
      g.font = 'bold 20px system-ui'; g.textAlign = 'center'; g.textBaseline = 'bottom';
      g.fillText((f.cpu ? 'CPU' : 'P' + (f.slot + 1)) + (f.team ? ' · ' + f.team : ''), f.x, tagY - 2);
    }
    if (f.bubble) {
      g.font = 'bold 22px system-ui'; const tw = g.measureText(f.bubble.text).width + 40, bh = 50, by = tagY - 108;
      const bd = ui('hud-taunt-body.png'), tl = ui('hud-taunt-tail.png');
      if (bd) { // 3 slices so the round ends keep their shape however long the line is
        const cap = 70, ck = bh / 256, cw2 = cap * ck, bx = f.x - tw / 2;
        g.drawImage(bd, 0, 0, cap, 256, bx, by, cw2, bh); g.drawImage(bd, cap, 0, 512 - cap * 2, 256, bx + cw2, by, tw - cw2 * 2, bh); g.drawImage(bd, 512 - cap, 0, cap, 256, bx + tw - cw2, by, cw2, bh);
        if (tl) g.drawImage(tl, f.x - 6, by + bh - 9, 22, 22);
      } else { g.fillStyle = '#fff'; rr(g, f.x - tw / 2, by, tw, bh, 12); g.fill(); }
      g.fillStyle = '#1b1b2a'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(f.bubble.text, f.x, by + bh / 2);
    }
  }

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16); let r = n >> 16, gg = (n >> 8) & 255, b = n & 255;
    const f = (c) => Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)));
    return `rgb(${f(r)},${f(gg)},${f(b)})`;
  }
  MM.shade = shade;

  function drawProj(g, p, G) {
    if (drawSpriteProj(g, p)) return;
    g.save(); g.translate(p.x, p.y);
    if (p.ground && p.icy) {
      g.fillStyle = '#e8fbff'; g.strokeStyle = '#4cc9f0'; g.lineWidth = 3;
      for (let i = 0; i < 4; i++) { const h = 30 + 16 * Math.sin(p.t * 0.5 + i), x0 = -p.dir * (i * 14); g.beginPath(); g.moveTo(x0 - 10 * p.dir, 18); g.lineTo(x0 + 6 * p.dir, 18 - h); g.lineTo(x0 + 16 * p.dir, 18); g.closePath(); g.fill(); g.stroke(); }
    } else if (p.ground) {
      g.fillStyle = p.color; g.globalAlpha = 0.85;
      g.beginPath(); g.moveTo(-26 * p.dir, 18); g.quadraticCurveTo(0, -40 - Math.sin(p.t * 0.6) * 8, 26 * p.dir, 18); g.fill();
    } else if (p.emoji) {
      g.rotate(p.boomer ? p.t * 0.5 : Math.atan2(p.vy, p.vx) * 0.3);
      g.font = `${p.r * 2.2}px serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(p.emoji, 0, 2);
    } else {
      g.fillStyle = p.color; g.shadowColor = p.color; g.shadowBlur = 20; g.beginPath(); g.arc(0, 0, p.r, 0, TAU); g.fill();
    }
    g.restore();
  }

  function drawParts(g, G) {
    for (const p of G.parts) {
      const k = p.life / p.max;
      g.globalAlpha = Math.max(0, Math.min(1, k * 1.5));
      if (p.type === 'text') { g.fillStyle = p.color; g.font = `900 ${p.size}px system-ui`; g.textAlign = 'center'; g.lineWidth = 5; g.strokeStyle = '#1b1b2a'; g.strokeText(p.text, p.x, p.y); g.fillText(p.text, p.x, p.y); }
      else if (p.type === 'ring') { g.strokeStyle = p.color; g.lineWidth = 4 * k + 1; g.beginPath(); g.arc(p.x, p.y, p.size + (1 - k) * 60, 0, TAU); g.stroke(); }
      else if (p.type === 'smoke') { g.fillStyle = p.color; g.beginPath(); g.arc(p.x, p.y, p.size * (1.6 - k), 0, TAU); g.fill(); }
      else { g.fillStyle = p.color; g.beginPath(); g.arc(p.x, p.y, p.size * k, 0, TAU); g.fill(); }
    }
    g.globalAlpha = 1;
    if (G.kos) for (const k of G.kos) {
      const t = k.t / 50; g.globalAlpha = t; g.fillStyle = k.color;
      g.save(); g.translate(k.x, k.y); g.rotate(Math.atan2(-k.y + -200, -k.x));
      g.beginPath(); g.moveTo(0, -60 * t); g.lineTo(900, 0); g.lineTo(0, 60 * t); g.fill(); g.restore();
      const bim = ui(k.t > 40 ? 'hud-ko-flash.png' : k.t > 18 ? 'hud-ko-peak.webp' : 'hud-ko-fade.png');
      if (bim) {
        const vw = cam.w / 2, vh = cam.w * g.canvas.height / g.canvas.width / 2, m = 140;
        const bx = Math.max(cam.x - vw + m, Math.min(cam.x + vw - m, k.x)), byy = Math.max(cam.y - vh + m, Math.min(cam.y + vh - m * 1.6, k.y));
        const sz = (k.t > 40 ? 200 + (50 - k.t) * 14 : 340) * (bim.naturalWidth > 300 ? 1.5 : 1);
        g.globalAlpha = Math.min(1, t * 2.2);
        g.drawImage(bim, bx - sz / 2, byy - sz * bim.naturalHeight / bim.naturalWidth / 2, sz, sz * bim.naturalHeight / bim.naturalWidth);
      }
      g.globalAlpha = 1; k.t--;
    }
    if (G.kos) G.kos = G.kos.filter((k) => k.t > 0);
  }

  // ---------- HUD ----------
  // ChatGPT's HUD art (img/ui/, UI HUD + word art pack). ui(name) is null until loaded; then code falls back to shapes.
  const uiImgs = {};
  function ui(n) { let im = uiImgs[n]; if (!im) { im = uiImgs[n] = new Image(); im.src = 'img/ui/' + n; } return im.complete && im.naturalWidth ? im : null; }
  MM.uiImg = ui;
  const PANEL = ['hud-damage-p1-red.webp', 'hud-damage-p2-blue.webp', 'hud-damage-p3-green.webp', 'hud-damage-p4-yellow.webp'];
  const STOCK = { jeffery: 'jeff', mandi: 'mandi-witch', 'mandi-mermaid': 'mandi-mermaid', 'courtnee-super': 'courtnee', 'codee-clean': 'codee' };
  const stockImg = (d) => ui(`stock-${STOCK[d.id] || d.baseId && STOCK[d.baseId] || d.baseId || d.id}.png`);
  const portraitCache = {};
  // Ultimate meter: frame art with the cyan fill clipped to the meter inside it; gold glow + star when full.
  function ultMeter(g, G, cx, y, w, v) {
    const fr = ui('hud-ultimate-frame.png'), fill = ui('hud-ultimate-fill.png'), h = w * 192 / 512, x = cx - w / 2, k = w / 512, full = v >= 1;
    if (!fr || !fill) { g.fillStyle = '#0008'; rr(g, x + w * 0.2, y + h * 0.4, w * 0.6, h * 0.25, 5); g.fill(); g.fillStyle = '#ffc21a'; if (v > 0) { rr(g, x + w * 0.2, y + h * 0.4, w * 0.6 * v, h * 0.25, 5); g.fill(); } return; }
    if (full) { const rd = ui('hud-ultimate-ready.png'); if (rd) { g.save(); g.globalAlpha *= 0.6 + 0.4 * Math.sin(G.frame * 0.25); g.drawImage(rd, x, y, w, h); g.restore(); } }
    g.drawImage(fr, x, y, w, h);
    if (v > 0) { const ix = x + 120 * k, iy = y + 76 * k, iw = 268 * k, ih = 55 * k; g.save(); g.beginPath(); g.rect(ix, iy, iw * Math.min(1, v), ih); g.clip(); g.drawImage(fill, 4, 12, 376, 72, ix, iy, iw, ih); g.restore(); }
    if (full) { const st = ui('hud-ultimate-star.png'); if (st) { const ss = h * 0.62 * (1 + 0.08 * Math.sin(G.frame * 0.3)); g.drawImage(st, x + 400 * k - ss / 2, y + h * 0.52 - ss / 2, ss, ss); } }
  }
  function hud(g, G, W, H) {
    const n = G.fighters.length, gap = 12, cw = Math.min(236, (W - 24) / n - gap), ph = cw * 288 / 640, k = cw / 640;
    const mw = cw * 0.56, mh = mw * 192 / 512;
    const total = n * cw + (n - 1) * gap, x0 = (W - total) / 2, y0 = H - ph - mh * 0.62 - 6;
    G.fighters.forEach((f, i) => {
      const x = x0 + i * (cw + gap), panel = ui(PANEL[f.slot % 4]);
      g.globalAlpha = f.out ? 0.45 : 1;
      // portrait in the round socket (drawn first: the panel's rim sits on top)
      const sx = x + 150 * k, sy = y0 + 152 * k, sr = 98 * k;
      g.save(); g.beginPath(); g.arc(sx, sy, sr, 0, TAU); g.fillStyle = '#2b1150'; g.fill(); g.clip();
      MM.drawHead(g, f.def, sx, sy + sr * 0.12, sr * 0.95, { hurt: f.hitstun > 0 }); g.restore();
      if (panel) g.drawImage(panel, x, y0, cw, ph);
      else { g.strokeStyle = MM.PLAYER_COLORS[f.slot]; g.lineWidth = 3; g.fillStyle = 'rgba(26,11,46,.82)'; rr(g, x + 270 * k, y0 + 70 * k, 350 * k, 160 * k, 10); g.fill(); g.stroke(); }
      if (f.team) { g.fillStyle = MM.TEAM_COLORS[f.team]; rr(g, x + cw - 30 * k - 26, y0 + 2, 26, 22, 6); g.fill(); g.fillStyle = '#fff'; g.font = `900 15px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(f.team, x + cw - 30 * k - 13, y0 + 13); }
      // name, damage, lives in the dark field
      const tx = x + 292 * k, tw = 300 * k;
      g.fillStyle = '#fff'; g.textAlign = 'left'; g.textBaseline = 'top';
      g.font = `bold ${Math.max(10, Math.round(26 * k * 1.6) / 1.6)}px system-ui`; g.fillText(`${f.cpu ? 'CPU' : 'P' + (f.slot + 1)} · ${f.def.name}`, tx, y0 + 88 * k, tw);
      const dmg = Math.round(f.damage), heat = Math.min(1, f.damage / 160);
      g.fillStyle = `rgb(255,${Math.round(255 - heat * 200)},${Math.round(255 - heat * 230)})`;
      g.font = `900 ${Math.round(66 * k)}px system-ui`; g.lineWidth = 4; g.strokeStyle = '#000';
      const shake = f.hitstun > 0 ? (Math.random() - 0.5) * 6 : 0;
      g.strokeText(f.out ? 'OUT' : dmg + '%', tx + shake, y0 + 118 * k); g.fillText(f.out ? 'OUT' : dmg + '%', tx + shake, y0 + 118 * k);
      const si = stockImg(f.def), ss = 34 * k;
      for (let j = 0; j < f.stocks; j++) {
        const lx = x + 588 * k - ss - j * (ss + 3), ly = y0 + 182 * k;
        if (si) g.drawImage(si, lx, ly, ss, ss); else { g.fillStyle = MM.PLAYER_COLORS[f.slot]; g.beginPath(); g.arc(lx + ss / 2, ly + ss / 2, ss * 0.3, 0, TAU); g.fill(); }
      }
      if (!f.out && f.def.mess) { // Codee: Mess Meter (brown -> green), or the Clean Freak time left (blue)
        const mx = tx, mw2 = Math.max(20, x + 588 * k - f.stocks * (ss + 3) - 8 - mx), my = y0 + 194 * k;
        const clean = f.formIdx === 1, v = clean ? f.clean / f.def.mess.cleanFrames : (f.mess || 0) / 100, full = !clean && v >= 1;
        g.fillStyle = '#0008'; rr(g, mx, my, mw2, 7, 3); g.fill();
        const MC = f.def.mess; g.fillStyle = clean ? (MC.formBar || '#bfe9ff') : full ? `hsl(${(MC.hue ?? 100) + 20 * Math.sin(G.frame * 0.3)},70%,55%)` : (MC.bar || '#8a5a2a');
        if (v > 0) { rr(g, mx, my, Math.max(4, mw2 * Math.min(1, v)), 7, 3); g.fill(); }
        if (full) { g.font = `900 12px system-ui`; g.textAlign = 'left'; g.textBaseline = 'bottom'; g.lineWidth = 3; g.strokeStyle = '#000'; const rt = (MC.ready || 'CLEAN UP!') + ' (Switch)'; g.strokeText(rt, x + 270 * k, y0 + 4); g.fillStyle = MC.color || '#bfe9ff'; g.fillText(rt, x + 270 * k, y0 + 4); }
      }
      if (!f.out && f.def.ultimate) ultMeter(g, G, x + 440 * k, y0 + ph - mh * 0.38, mw, f.meter / 100); // ultimate meter under the field
      g.globalAlpha = 1;
    });
  }

  function offscreen(g, G, W, H, scale) {
    for (const f of G.fighters) {
      if (f.out || f.dead) continue;
      const sx = (f.x - cam.x) * scale + W / 2, sy = (f.y - f.h / 2 - cam.y) * scale + H / 2;
      if (sx > 0 && sx < W && sy > 0 && sy < H) continue;
      const cx = Math.max(50, Math.min(W - 50, sx)), cy = Math.max(50, Math.min(H - 50, sy));
      g.fillStyle = MM.PLAYER_COLORS[f.slot]; g.beginPath(); g.arc(cx, cy, 34, 0, TAU); g.fill();
      MM.drawHead(g, f.def, cx, cy, 26);
    }
  }

  // a small picture of a stage for the arena choice screen
  MM.stageThumb = function (id, w = 384, h = 216) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const saved = { x: cam.x, y: cam.y, w: cam.w };
    try { const G = MM.newGame([], id, 1); G.countdown = 0; cam.x = 0; cam.y = -230; cam.w = 1500; MM.render(c.getContext('2d'), G, w, h); }
    catch (e) { /* the arena may still be loading */ }
    cam.x = saved.x; cam.y = saved.y; cam.w = saved.w;
    return c.toDataURL('image/jpeg', 0.8);
  };

  // ---------- main draw ----------
  MM.render = function (g, G, W, H) {
    updateCamera(G, W, H);
    const art = G.stage.art ? (G.stage._art = G.stage._art || customArt(G.stage)) : STAGE_ART[G.stage.theme] || STAGE_ART.backyard;
    g.setTransform(1, 0, 0, 1, 0, 0);
    art.sky(g, W, H, cam.x, cam);
    const scale = W / cam.w;
    const sh = G.shake > 0.5 ? G.shake : 0;
    g.setTransform(scale, 0, 0, scale, W / 2 - cam.x * scale + (Math.random() - 0.5) * sh, H / 2 - cam.y * scale + (Math.random() - 0.5) * sh);
    art.floor(g, G.stage, G.stage.main, G);
    for (const p of G.stage.plats) art.plat(g, p, G);
    for (const t of G.traps) if (t.sp.sprite) drawSpriteProj(g, { sprite: t.sp.sprite, owner: t.owner, x: t.x, y: t.y - 18, runner: true, t: 0, dir: t.dir || 1, scale: t.sp.scale }, G);
    for (const t of G.traps) { if (t.sp.sprite) continue; g.globalAlpha = t.armed > 0 ? 0.5 : 1; g.font = '44px serif'; g.textAlign = 'center'; g.textBaseline = 'bottom'; g.fillText(t.sp.emoji || '⚠️', t.x, t.y + 4); g.globalAlpha = 1; }
    for (const f of G.fighters) drawFighter(g, f, G);
    for (const f of G.fighters) drawUltFx(g, f, G);
    for (const p of G.projs) drawProj(g, p, G);
    if (art.front) art.front(g, G);
    drawParts(g, G);
    g.setTransform(1, 0, 0, 1, 0, 0);
    offscreen(g, G, W, H, scale);
    hud(g, G, W, H);
    if (G.timeLeft > 0 || G.timeUp) { // match clock
      const s = Math.ceil(Math.max(0, G.timeLeft) / 60), txt = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
      const tf = ui('hud-timer-frame.png'), fh = Math.min(H * 0.13, 96), fw = fh * 2, fy = 6;
      if (tf) g.drawImage(tf, W / 2 - fw / 2, fy, fw, fh);
      g.font = `900 ${Math.round(fh * 0.36)}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 6; g.strokeStyle = '#1a0b2e';
      const ty = fy + fh * (52 / 128);
      g.strokeText(txt, W / 2, ty); g.fillStyle = s <= 10 ? '#ff4b4b' : '#fff'; g.fillText(txt, W / 2, ty);
    }
    if (G.flash > 0) { g.fillStyle = `rgba(255,255,255,${G.flash / 14})`; g.fillRect(0, 0, W, H); }
    if (G.ultBanner) { // ultimate name sweeps across the screen
      const b = G.ultBanner, k = b.t / 100, slide = k > 0.85 ? (k - 0.85) / 0.15 : k < 0.15 ? -(0.15 - k) / 0.15 : 0;
      g.save(); g.globalAlpha = Math.min(1, k * 4);
      const tx2 = W / 2 + slide * W * 0.6, bn = ui('hud-ultimate-banner.webp');
      const bw = Math.min(W * 0.92, H * 1.15), bh = bw / 4, by = H * 0.23 - bh * (129 / 256);
      if (bn) g.drawImage(bn, tx2 - bw / 2, by, bw, bh);
      else { g.fillStyle = 'rgba(26,11,46,.82)'; g.fillRect(0, H * 0.16, W, H * 0.14); g.fillStyle = b.color; g.fillRect(0, H * 0.16, W, 6); g.fillRect(0, H * 0.30 - 6, W, 6); }
      const label = b.text.toUpperCase() + (b.text.endsWith('!') ? '' : '!'), maxW = bw * (880 / 1024);
      let fs = Math.round(bh * 0.36); g.font = `italic 900 ${fs}px system-ui`;
      const mwid = g.measureText(label).width; if (mwid > maxW) { fs = Math.floor(fs * maxW / mwid); g.font = `italic 900 ${fs}px system-ui`; }
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.lineWidth = Math.max(4, fs * 0.16); g.strokeStyle = '#1a0b2e'; g.strokeText(label, tx2, H * 0.23);
      g.fillStyle = '#ffc21a'; g.fillText(label, tx2, H * 0.23);
      g.restore();
    }
    // big center text
    let big = null;
    if (G.countdown > 150) big = null;
    else if (G.countdown > 0) big = G.countdown > 120 ? '3' : G.countdown > 80 ? '2' : G.countdown > 40 ? '1' : 'GO!';
    else if (G.frame < 30 && !G.over) big = null;
    if (G.over) big = G.timeUp ? 'TIME!' : 'GAME!';
    const WORD = { '3': 'word-3.webp', '2': 'word-2.webp', '1': 'word-1.webp', 'GO!': 'word-go.webp', 'GAME!': 'word-game.webp', 'TIME!': 'word-time.webp' };
    const wim = big && ui(WORD[big]);
    if (wim) { // ChatGPT word art: each number pops in, then settles
      const ph2 = G.over ? Math.min(1, (150 - (G.endT ?? 150)) / 12) : G.countdown > 40 ? ((G.countdown - 1) % 40) / 40 : G.countdown / 40;
      const pop = G.over ? 1 + 0.3 * (1 - ph2) : 1 + 0.35 * Math.max(0, (ph2 - 0.75) / 0.25);
      const hh = H * (wim.naturalWidth > wim.naturalHeight ? 0.34 : 0.32) * pop, ww = hh * wim.naturalWidth / wim.naturalHeight;
      g.drawImage(wim, W / 2 - ww / 2, H * 0.42 - hh / 2, ww, hh);
    } else if (big) {
      g.font = `italic 900 ${Math.round(H * 0.18)}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.lineWidth = 12; g.strokeStyle = '#1b1b2a'; g.strokeText(big, W / 2, H * 0.42);
      g.fillStyle = '#8f2bd6'; g.fillText(big, W / 2, H * 0.42 + H * 0.012); g.fillStyle = big === 'GO!' ? '#1fd1ef' : '#ffc21a'; g.fillText(big, W / 2, H * 0.42);
    }
  };
})();
