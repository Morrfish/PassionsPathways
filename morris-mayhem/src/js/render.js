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
  MM.preloadSprites = () => { for (const d of MM.allDefs()) if (d.sprite) sheet(d.sprite); };

  // Pick the pose for what the fighter is doing right now.
  function pickFrame(f, S) {
    const a = f.act, M = S.moves;
    if (f.hitstun > 0) return f.ground ? 'hurt' + (f.hitstun > 6 ? 1 : 0) : 'hurt2';
    if (f.jsq > 0) return 'jump0';
    if (a) {
      if (a.type === 'lag') return a.countered && M.counterHit ? M.counterHit : 'jump0';
      if (a.type === 'dodge') return f.ground ? 'idle0' : 'jump2';
      if (a.type === 'normal') {
        const row = M[a.name], m = a.m, before = a.t < m.start, during = a.t < m.start + m.active;
        if (a.name === 'up' && M.upRow) return M.upRow + (before ? 0 : during ? (a.t < m.start + m.active / 2 ? 1 : 2) : 3);
        if (a.name === 'uair' && M.uairRow) return M.uairRow + (before ? 0 : during ? (a.t < m.start + m.active / 2 ? 1 : 2) : 3);
        if (a.name === 'up' || a.name === 'uair') return M.upPose;
        if (row === M.airRow) return row + (before ? 1 : during ? 2 : f.ground ? 3 : 1);
        if (row === 'drop') return 'drop' + (before ? 1 : during ? 2 : 3);
        return row + (before ? 0 : during ? (a.t < m.start + m.active / 2 ? 1 : 2) : 3);
      }
      if (a.type === 'special') {
        const row = M[{ neutral: 'neutral', side: 'sideSpecial', up: 'upSpecial', down: 'downSpecial' }[a.slot]];
        const kind = a.sp.kind;
        if (kind === 'dash') return row + (a.t < 6 ? 0 : a.box ? 1 + ((a.t >> 2) & 1) : 3);
        if (kind === 'rise') return a.chute ? row + 2 : a.t < 4 ? row + 0 : a.t < 12 ? row + 1 : M.riseLate;
        if (kind === 'projectile') return row + (a.t < 5 ? 0 : a.t < 9 ? 1 : a.t < 16 ? 2 : 3);
        if (kind === 'pack') return row + (a.t < 10 ? 0 : a.t < 20 ? 1 : a.t < 28 ? 2 : 3);
        if (kind === 'counter') return row + (a.t < 5 ? 0 : a.counter ? 1 : 3);
        if (kind === 'transform') return row + (a.t < 8 ? 0 : a.t < 20 ? 1 : a.t < 30 ? 2 : 3);
        if (kind === 'trap') return row + (a.t < 6 ? 0 : a.t < 12 ? 1 : a.t < 18 ? 2 : 3);
        if (row) return row + Math.min(3, Math.floor((a.t / a.dur) * 4));
      }
    }
    if (!f.ground) return f.vy < -4 ? 'jump1' : f.vy < 3 ? 'jump2' : 'jump3';
    if (Math.abs(f.vx) > 1) return 'run' + (Math.floor(f.anim / 6) % 4);
    return 'idle' + (Math.floor(f.anim / 16) % 4);
  }

  function drawSpriteFighter(g, f, G) {
    let sh = f.def.sprite && sheet(f.def.sprite);
    if (!sh) return false;
    let frameName = pickFrame(f, sh.S);
    const ua = f.act && f.act.type === 'ult' && f.act.u;
    if (ua && ua.sprite && sheet(ua.sprite) && ua.poses.length) { // ultimate key poses
      sh = sheet(ua.sprite); frameName = ua.poses[0][1];
      for (const [t, p] of ua.poses) if (f.act.t >= t) frameName = p;
    }
    const { S, im } = sh, fr = S.frames[frameName] || S.frames.idle0;
    const k = (f.h * 1.15) / S.standH;
    g.save();
    g.translate(f.x, f.y);
    if (f.invuln > 0 && Math.floor(G.frame / 4) % 2) g.globalAlpha = 0.5;
    if (f.act && f.act.type === 'dodge') g.globalAlpha *= 0.55;
    if (f.buff) { g.save(); g.fillStyle = f.buff.color; g.globalAlpha *= 0.3; g.beginPath(); g.ellipse(0, -f.h * 0.55, f.w * 1.4, f.h * 0.75, 0, 0, TAU); g.fill(); g.restore(); }
    // player-color ring at the feet (keeps two of the same fighter apart without recoloring the art)
    if (f.ground) { g.save(); g.strokeStyle = f.team ? MM.TEAM_COLORS[f.team] : MM.PLAYER_COLORS[f.slot]; g.lineWidth = 4; g.globalAlpha *= 0.85; g.beginPath(); g.ellipse(0, -2, f.w * 0.9, 8, 0, 0, TAU); g.stroke(); g.restore(); }
    g.scale(f.face * k, k);
    g.drawImage(im, fr[0], fr[1], fr[2], fr[3], -fr[4], -fr[5], fr[2], fr[3]);
    g.restore();
    const a = f.act;
    if (a && a.counter) { g.strokeStyle = 'rgba(255,255,140,.9)'; g.lineWidth = 4; g.beginPath(); g.arc(f.x, f.y - f.h / 2, 72 + Math.sin(G.frame) * 4, 0, TAU); g.stroke(); }
    return true;
  }

  function drawUltFx(g, f, G) {
    const a = f.act; if (!a || a.type !== 'ult') return;
    if (a.u.type === 'stampede' && a.sweepX != null) {
      g.save(); g.font = '72px serif'; g.textAlign = 'center'; g.textBaseline = 'bottom';
      const herd = a.u.emoji || ['🦌', '🐇', '🐿️', '🦌', '🐇'];
      herd.forEach((e, i) => {
        const x = a.sweepX - f.face * i * 70, y = f.y - Math.abs(Math.sin(G.frame * 0.4 + i)) * 26;
        g.save(); g.translate(x, y); g.scale(-f.face, 1); g.fillText(e, 0, 0); g.restore(); // emoji animals face left; flip to run forward
      });
      g.restore();
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
    const sh = p.sprite && p.owner.def.sprite && sheet(p.owner.def.sprite);
    if (!sh) return false;
    const fr = sh.S.frames[p.sprite]; if (!fr) return false;
    const k = (p.owner.h * 1.15) / sh.S.standH;
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
    let l = -500, r = 500, t = -400, b = 100;
    if (live.length) {
      l = Math.min(...live.map((f) => f.x)) - 260; r = Math.max(...live.map((f) => f.x)) + 260;
      t = Math.min(...live.map((f) => f.y - f.h)) - 200; b = Math.max(...live.map((f) => f.y)) + 160;
    }
    const bl = G.stage.blast;
    l = Math.max(l, -bl.side - 100); r = Math.min(r, bl.side + 100);
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
  function drawPlatPic(g, im, P, spec, x, y, w) {
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
        const im = stageImg(P.props);
        if (P.fade) { // darken the painted ground below the floor line
          const gr = g.createLinearGradient(0, -30, 0, 400); gr.addColorStop(0, 'rgba(15,8,30,0)'); gr.addColorStop(0.25, `rgba(15,8,30,${P.fade})`); gr.addColorStop(1, `rgba(15,8,30,${Math.min(0.85, P.fade * 1.7)})`);
          g.fillStyle = gr; g.fillRect(-4000, -30, 8000, 3030);
        }
        if (!im) { g.fillStyle = '#5b3a24'; g.fillRect(m.left, 0, m.right - m.left, m.depth); return; }
        decor(g, im, 'back', G);
        for (const p of s.plats) { const sp = P.pics[p.pic]; if (sp && sp.behind) drawPlatPic(g, im, P, Object.assign({ pic: p.pic }, sp), p.x, p.y, p.w); }
        drawPlatPic(g, im, P, P.main, m.left, 0, m.right - m.left);
        for (const p of s.plats) { const sp = P.pics[p.pic]; if (sp && !sp.behind && !sp.front) drawPlatPic(g, im, P, Object.assign({ pic: p.pic }, sp), p.x, p.y, p.w); }
        decor(g, im, 'mid', G);
      },
      plat(g, p) {
        const im = stageImg(P.props), sp = P.pics[p.pic];
        if (!im) { g.fillStyle = '#a5683a'; g.fillRect(p.x, p.y, p.w, 16); return; }
        if (sp && sp.front) drawPlatPic(g, im, P, Object.assign({ pic: p.pic }, sp), p.x, p.y, p.w);
      },
      front(g, G) {
        const im = stageImg(P.props);
        if (im) decor(g, im, 'front', G);
        if (P.water) { // see-through lake surface with a little ripple
          const y = P.water.y, t = G.frame * 0.04;
          g.fillStyle = P.water.color; g.beginPath(); g.moveTo(-4000, 3000);
          for (let x = -4000; x <= 4000; x += 80) g.lineTo(x, y + Math.sin(x * 0.02 + t) * 5);
          g.lineTo(4000, 3000); g.closePath(); g.fill();
          g.strokeStyle = 'rgba(220,250,255,.55)'; g.lineWidth = 3; g.beginPath();
          for (let x = -4000; x <= 4000; x += 80) g[x === -4000 ? 'moveTo' : 'lineTo'](x, y + Math.sin(x * 0.02 + t) * 5);
          g.stroke();
        }
      },
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
    const tagY = f.y - f.h - 34 * s;
    g.fillStyle = f.team ? MM.TEAM_COLORS[f.team] : MM.PLAYER_COLORS[f.slot];
    g.beginPath(); g.moveTo(f.x - 9, tagY); g.lineTo(f.x + 9, tagY); g.lineTo(f.x, tagY + 11); g.fill();
    g.font = 'bold 20px system-ui'; g.textAlign = 'center'; g.textBaseline = 'bottom';
    g.fillText((f.cpu ? 'CPU' : 'P' + (f.slot + 1)) + (f.team ? ' · ' + f.team : ''), f.x, tagY - 2);
    if (f.bubble) {
      g.font = 'bold 22px system-ui'; const tw = g.measureText(f.bubble.text).width + 24;
      g.fillStyle = '#fff'; rr(g, f.x - tw / 2, tagY - 70, tw, 38, 12); g.fill(); g.beginPath(); g.moveTo(f.x - 8, tagY - 33); g.lineTo(f.x, tagY - 22); g.lineTo(f.x + 8, tagY - 33); g.fill();
      g.fillStyle = '#1b1b2a'; g.textBaseline = 'middle'; g.fillText(f.bubble.text, f.x, tagY - 51);
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
    if (p.ground) {
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
      g.globalAlpha = 1; k.t--;
    }
    if (G.kos) G.kos = G.kos.filter((k) => k.t > 0);
  }

  // ---------- HUD ----------
  const portraitCache = {};
  function hud(g, G, W, H) {
    const n = G.fighters.length, cw = Math.min(260, W / n - 16), chh = Math.min(96, H * 0.14);
    const total = n * cw + (n - 1) * 14, x0 = (W - total) / 2, y0 = H - chh - 12;
    G.fighters.forEach((f, i) => {
      const x = x0 + i * (cw + 14);
      g.globalAlpha = f.out ? 0.45 : 1;
      g.fillStyle = 'rgba(26,11,46,.82)'; rr(g, x, y0, cw, chh, 14); g.fill();
      g.strokeStyle = f.team ? MM.TEAM_COLORS[f.team] : MM.PLAYER_COLORS[f.slot]; g.lineWidth = f.team ? 5 : 3; g.stroke();
      if (f.team) { g.fillStyle = MM.TEAM_COLORS[f.team]; rr(g, x + cw - 34, y0 + 6, 28, 24, 6); g.fill(); g.fillStyle = '#fff'; g.font = `900 ${Math.round(chh * 0.2)}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(f.team, x + cw - 20, y0 + 18); }
      const r = chh * 0.36;
      if (!f.def.photo) { g.fillStyle = f.color; g.beginPath(); g.arc(x + r + 10, y0 + chh / 2, r + 3, 0, TAU); g.fill(); }
      MM.drawHead(g, f.def, x + r + 10, y0 + chh / 2, r, { hurt: f.hitstun > 0 });
      const tx = x + r * 2 + 22;
      g.fillStyle = '#fff'; g.textAlign = 'left'; g.textBaseline = 'top';
      g.font = `bold ${Math.round(chh * 0.17)}px system-ui`; g.fillText(`${f.cpu ? 'CPU' : 'P' + (f.slot + 1)} · ${f.def.name}`, tx, y0 + 8, cw - (tx - x) - (f.team ? 40 : 6));
      const dmg = Math.round(f.damage), heat = Math.min(1, f.damage / 160);
      g.fillStyle = `rgb(255,${Math.round(255 - heat * 200)},${Math.round(255 - heat * 230)})`;
      g.font = `900 ${Math.round(chh * 0.42)}px system-ui`; g.lineWidth = 4; g.strokeStyle = '#000';
      const shake = f.hitstun > 0 ? (Math.random() - 0.5) * 6 : 0;
      g.strokeText(f.out ? 'OUT' : dmg + '%', tx + shake, y0 + chh * 0.3); g.fillText(f.out ? 'OUT' : dmg + '%', tx + shake, y0 + chh * 0.3);
      for (let k = 0; k < f.stocks; k++) { g.fillStyle = MM.PLAYER_COLORS[f.slot]; g.beginPath(); g.arc(tx + 8 + k * 18, y0 + chh - 12, 6, 0, TAU); g.fill(); }
      if (!f.out && f.def.ultimate) { // ultimate meter
        const mx = tx + Math.max(60, f.stocks * 18 + 10), mw = x + cw - 10 - mx, my = y0 + chh - 17, full = f.meter >= 100;
        g.fillStyle = '#0008'; rr(g, mx, my, mw, 10, 5); g.fill();
        g.fillStyle = full ? `hsl(${45 + 15 * Math.sin(G.frame * 0.3)},100%,${55 + 10 * Math.sin(G.frame * 0.3)}%)` : '#ffc21a';
        if (f.meter > 0) { rr(g, mx, my, Math.max(6, (mw * f.meter) / 100), 10, 5); g.fill(); }
        if (full) { g.font = `900 ${Math.round(chh * 0.15)}px system-ui`; g.textAlign = 'right'; g.textBaseline = 'bottom'; g.lineWidth = 3; g.strokeStyle = '#000'; g.strokeText('ULTIMATE!', x + cw - 10, my - 1); g.fillStyle = '#ffc21a'; g.fillText('ULTIMATE!', x + cw - 10, my - 1); }
      }
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

  // ---------- main draw ----------
  MM.render = function (g, G, W, H) {
    updateCamera(G, W, H);
    const art = STAGE_ART[G.stage.theme] || STAGE_ART.backyard;
    g.setTransform(1, 0, 0, 1, 0, 0);
    art.sky(g, W, H, cam.x, cam);
    const scale = W / cam.w;
    const sh = G.shake > 0.5 ? G.shake : 0;
    g.setTransform(scale, 0, 0, scale, W / 2 - cam.x * scale + (Math.random() - 0.5) * sh, H / 2 - cam.y * scale + (Math.random() - 0.5) * sh);
    art.floor(g, G.stage, G.stage.main, G);
    for (const p of G.stage.plats) art.plat(g, p);
    for (const t of G.traps) if (t.sp.sprite) drawSpriteProj(g, { sprite: t.sp.sprite, owner: t.owner, x: t.x, y: t.y - 18, runner: true, t: 0, dir: t.dir || 1 }, G);
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
      g.font = `900 ${Math.round(H * 0.05)}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'top'; g.lineWidth = 6; g.strokeStyle = '#1a0b2e';
      g.strokeText(txt, W / 2, H * 0.02); g.fillStyle = s <= 10 ? '#ff4b4b' : '#fff'; g.fillText(txt, W / 2, H * 0.02);
    }
    if (G.flash > 0) { g.fillStyle = `rgba(255,255,255,${G.flash / 14})`; g.fillRect(0, 0, W, H); }
    if (G.ultBanner) { // ultimate name sweeps across the screen
      const b = G.ultBanner, k = b.t / 100, slide = k > 0.85 ? (k - 0.85) / 0.15 : k < 0.15 ? -(0.15 - k) / 0.15 : 0;
      g.save(); g.globalAlpha = Math.min(1, k * 4);
      g.fillStyle = 'rgba(26,11,46,.82)'; g.fillRect(0, H * 0.16, W, H * 0.14);
      g.fillStyle = b.color; g.fillRect(0, H * 0.16, W, 6); g.fillRect(0, H * 0.30 - 6, W, 6);
      g.font = `italic 900 ${Math.round(H * 0.075)}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle';
      const tx2 = W / 2 + slide * W * 0.6;
      g.lineWidth = 10; g.strokeStyle = '#1a0b2e'; g.strokeText(b.text.toUpperCase() + '!', tx2, H * 0.23);
      g.fillStyle = '#ffc21a'; g.fillText(b.text.toUpperCase() + '!', tx2, H * 0.23);
      g.restore();
    }
    // big center text
    let big = null;
    if (G.countdown > 0) big = G.countdown > 120 ? '3' : G.countdown > 80 ? '2' : G.countdown > 40 ? '1' : 'GO!';
    else if (G.frame < 30 && !G.over) big = null;
    if (G.over) big = G.timeUp ? 'TIME!' : 'GAME!';
    if (big) {
      g.font = `italic 900 ${Math.round(H * 0.18)}px system-ui`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.lineWidth = 12; g.strokeStyle = '#1b1b2a'; g.strokeText(big, W / 2, H * 0.42);
      g.fillStyle = '#8f2bd6'; g.fillText(big, W / 2, H * 0.42 + H * 0.012); g.fillStyle = big === 'GO!' ? '#1fd1ef' : '#ffc21a'; g.fillText(big, W / 2, H * 0.42);
    }
  };
})();
