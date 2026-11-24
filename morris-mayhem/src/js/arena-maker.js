// Arena Maker: build your own arena from the props of the five illustrated arenas, save it and play it.
//
// Saved arenas live in localStorage under `mm_arena_<id>` as plain JSON:
//   { v: 1, id: 'custom-...', name, bg: 'dunkirk' | 'hardin' | ... | 'sky', water: y or null,
//     pieces: [{ atlas, pic, role, x, y, w, tiles?, anim? }] }
//   atlas + pic   which prop (an arena key in MM.STAGE_PICS and a name from its `pics` or `frames`;
//                 atlas 'basic', pic 'block' is the plain floor block), so saves survive art rebuilds
//   role          'main' (the one solid floor), 'plat' (jump-through), 'bob' (jump-through, floats and
//                 bobs, carries riders), 'decor' (just a picture)
//   x, y, w       the walkable top line (x .. x + w at height y); for decor, the picture's top edge
//   tiles         lay n copies side by side (long floors)
// Each saved arena is added to MM.STAGES (custom: true) when the page loads, so it shows up wherever
// stages are listed and plays like any other stage (render.js draws stage.art).
window.MM = window.MM || {};
(function () {
  const PREFIX = 'mm_arena_';
  const ROLES = ['main', 'plat', 'bob', 'decor'];
  const ROLE_NAMES = { main: 'Floor (solid)', plat: 'Platform', bob: 'Bobbing', decor: 'Decoration' };
  const BOB = { ax: 20, ay: 5, period: 300 };
  const DECOR_NAMES = { crossing: 'RR crossing', lamp: 'Street lamp', storefront: 'Shop', gatearm: 'Crossing gate', ballrack: 'Ball rack', musicstand: 'Music stand', banquet: 'Potluck table', shortdock: 'Short dock', lifering: 'Life ring', tackle: 'Tackle box', balustrade: 'Terrace', riser: 'Gold stage', piano: 'Piano keys', stage: 'Wood stage', picnic: 'Picnic table', court: 'Gym floor', sidewalk: 'Sidewalk' };
  const WATER_COLOR = 'rgba(28,110,140,.55)';
  const BGS = ['sky', 'dunkirk', 'hardin', 'williamstown', 'graceland', 'agnew'];
  const BG_NAMES = { sky: 'Plain sky', dunkirk: 'Dunkirk street', hardin: 'Hardin gym', williamstown: 'Williamstown church', graceland: 'Graceland', agnew: 'Agnew Lake' };
  let VIEW = { x: -1150, y: -760, w: 2300, h: 1200 }; // the part of the world the editor shows (grows to show the KO lines)
  const LIMIT = { x: -2300, y: -1500, w: 4600, h: 2500 }; // pieces stay inside this

  // ---------- pieces ----------
  const BASIC = { basic: true, sx0: 0, sx1: 400, sy: 0, fw: 400, fh: 100 };
  function specOf(pc) {
    if (pc.atlas === 'basic') return BASIC;
    const sp = MM.pieceSpec(pc.atlas, pc.pic, pc.role);
    if (sp && pc.tiles > 1) sp.grid = [pc.tiles, 1];
    return sp;
  }
  function frameSize(pc, sp) {
    if (sp.basic) return [400, 100];
    const f = MM.STAGE_PICS[pc.atlas].frames[sp.pic];
    return sp.sub ? [sp.sub[2], sp.sub[3]] : [f[2], f[3]];
  }
  // the whole drawn picture of a piece: { left, top, width, height, bottom, k }
  function boxOf(pc) {
    const sp = specOf(pc);
    if (!sp) return { left: pc.x, top: pc.y, width: pc.w, height: 20, bottom: pc.y + 20, k: 1 };
    if (sp.basic) return { left: pc.x, top: pc.y, width: pc.w, height: pc.w / 4, bottom: pc.y + pc.w / 4, k: pc.w / 400 };
    return MM.propBox(MM.STAGE_PICS[pc.atlas], sp, pc.x, pc.y, pc.w);
  }
  // place a piece so its picture covers left/top with the given width (keeps its shape)
  function setBox(pc, left, top, width) {
    const sp = specOf(pc);
    if (!sp) return;
    if (sp.basic) { pc.x = left; pc.y = top; pc.w = width; return; }
    const [fw] = frameSize(pc, sp), n = sp.grid ? sp.grid[0] : 1, span = sp.sx1 - sp.sx0;
    const k = width / (span * (n - 1) + fw);
    pc.w = span * k * n; pc.x = left + sp.sx0 * k; pc.y = top + sp.sy * k;
  }
  const round = (o) => { o.x = Math.round(o.x); o.y = Math.round(o.y); o.w = Math.round(o.w); return o; };
  const collides = (pc) => pc.role !== 'decor';

  // ---------- arena data -> stage ----------
  function mainOf(a) { return a.pieces.find((p) => p.role === 'main'); }
  function spawnInfo(a) {
    const m = mainOf(a);
    if (!m) return null;
    const cx = m.x + m.w / 2, span = Math.min(m.w - 200, 780);
    return { cx, y: m.y, starts: [0, 1, 2, 3].map((i) => cx - span / 2 + (span * i) / 3), comeback: [-180, 180, -60, 60].map((d) => cx + d) };
  }
  function blastOf(a) { // in the arena's own coordinates
    const m = mainOf(a), solid = a.pieces.filter(collides);
    let l = Infinity, r = -Infinity, t = Infinity;
    for (const p of solid) { const bob = p.role === 'bob' ? BOB.ax : 0; l = Math.min(l, p.x - bob); r = Math.max(r, p.x + p.w + bob); t = Math.min(t, p.y); }
    return { left: Math.round(l - 650), right: Math.round(r + 650), top: Math.round(Math.min(m.y - 1050, t - 650)), bottom: Math.round(m.y + 800) };
  }
  function toStage(a) {
    const m = mainOf(a);
    if (!m || !a.pieces.every(specOf)) return null;
    const oy = -m.y, plats = [], pieces = [];
    for (const pc of a.pieces) {
      const q = Object.assign({}, pc, { y: pc.y + oy });
      if (pc.role === 'plat' || pc.role === 'bob') {
        q.plat = plats.length;
        const pl = { x: q.x, y: q.y, w: q.w, pic: pc.pic };
        if (pc.role === 'bob') pl.move = Object.assign({}, BOB);
        plats.push(pl);
      }
      pieces.push(q);
    }
    const b = blastOf(a), mb = boxOf(m);
    return {
      id: a.id, name: a.name, custom: true, theme: 'custom',
      main: { left: m.x, right: m.x + m.w, depth: Math.max(40, Math.round(mb.bottom - m.y)) },
      plats, spawnX: Math.round(m.x + m.w / 2),
      blast: { left: b.left, right: b.right, top: b.top + oy, bottom: b.bottom + oy },
      art: { bg: a.bg, water: a.water === null || a.water === undefined ? null : { y: a.water + oy, color: WATER_COLOR }, pieces },
    };
  }
  function problems(a) {
    const out = [], m = mainOf(a);
    if (!a.name || !a.name.trim()) out.push('Give your arena a name.');
    if (!m) out.push('Pick one piece to be the solid floor (select it, then press "Floor (solid)").');
    else if (m.w < 420) out.push('Make the solid floor wider (fighters need room to start on it).');
    if (a.pieces.length > 80) out.push('Too many pieces (80 at most).');
    return out;
  }

  // ---------- saving ----------
  const read = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  function list() {
    const out = [];
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(PREFIX)) { const a = read(k); if (a && a.pieces) out.push(a); } } } catch (e) {}
    return out.sort((x, y) => (x.name || '').localeCompare(y.name || ''));
  }
  function register() { // put every saved arena into MM.STAGES (after the built-in ones)
    for (let i = MM.STAGES.length - 1; i >= 0; i--) if (MM.STAGES[i].custom) MM.STAGES.splice(i, 1);
    for (const a of list()) { const s = toStage(a); if (s) MM.STAGES.push(s); }
  }
  function slug(name) { return (name || 'arena').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || 'arena'; }
  function save(a) {
    if (!a.id) { let id = 'custom-' + slug(a.name), n = 2; while (read(PREFIX + id)) id = 'custom-' + slug(a.name) + '-' + n++; a.id = id; }
    const data = { v: 1, id: a.id, name: a.name.trim().slice(0, 28), bg: a.bg, water: a.water, pieces: a.pieces.map((p) => { const q = round({ atlas: p.atlas, pic: p.pic, role: p.role, x: p.x, y: p.y, w: p.w }); if (p.tiles > 1) q.tiles = p.tiles; if (p.anim) q.anim = p.anim; return q; }) };
    localStorage.setItem(PREFIX + a.id, JSON.stringify(data));
    try { localStorage.setItem('mm_stage', JSON.stringify(a.id)); } catch (e) {}
    register();
    return data;
  }
  function remove(id) {
    try { localStorage.removeItem(PREFIX + id); if (read('mm_stage') === id) localStorage.setItem('mm_stage', JSON.stringify(MM.STAGES[0].id)); } catch (e) {}
    register();
  }
  register();

  // ---------- starting points ----------
  function fromBuiltIn(stageId) { // a copy of one of the illustrated arenas
    const s = MM.STAGES.find((x) => x.id === stageId), P = MM.STAGE_PICS[s.theme];
    const pieces = [];
    const decor = (layer) => { for (const d of P.decor || []) if ((d.layer || 'mid') === layer) { const f = P.frames[d.pic], k = d.h / f[3]; pieces.push(round({ atlas: s.theme, pic: d.pic, role: 'decor', x: d.x - (f[2] * k) / 2, y: d.y - d.h, w: f[2] * k, anim: d.anim })); } };
    decor('back');
    const mainPic = Object.keys(P.pics).find((k) => (P.pics[k].pic || k) === P.main.pic && !P.pics[k].sub);
    const behind = s.plats.filter((p) => (P.pics[p.pic] || {}).behind), rest = s.plats.filter((p) => !(P.pics[p.pic] || {}).behind);
    const plat = (p) => round({ atlas: s.theme, pic: p.pic, role: p.move ? 'bob' : 'plat', x: p.x, y: p.y, w: p.w });
    for (const p of behind) pieces.push(plat(p));
    pieces.push(round({ atlas: s.theme, pic: mainPic, role: 'main', x: s.main.left, y: 0, w: s.main.right - s.main.left, tiles: P.main.grid ? P.main.grid[0] : undefined }));
    for (const p of rest) pieces.push(plat(p));
    decor('mid'); decor('front');
    for (const p of pieces) if (!p.anim) delete p.anim;
    return { id: null, name: s.name.replace(/\s*\(.*\)/, '') + ' (my copy)', bg: s.theme, water: P.water ? P.water.y : null, pieces };
  }
  function blank() { return { id: null, name: 'My Arena', bg: 'sky', water: null, pieces: [{ atlas: 'basic', pic: 'block', role: 'main', x: -500, y: 0, w: 1000 }] }; }

  // ---------- the editor ----------
  const $ = (s) => document.querySelector(s);
  let prevMain = null;
  let A = null, sel = -1, snap = true, msgT = 0, open = false, cv, g, view = { s: 1, ox: 0, oy: 0 }, drag = null, dirty = false;
  const toWorld = (px, py) => ({ x: (px - view.ox) / view.s, y: (py - view.oy) / view.s });
  const S = (v) => (snap ? Math.round(v / 10) * 10 : v);

  function msg(t, bad) { const m = $('#amMsg'); m.textContent = t; m.classList.toggle('bad', !!bad); clearTimeout(msgT); msgT = setTimeout(() => (m.textContent = ''), 4000); }
  function pieceName(pc) {
    if (pc.atlas === 'basic') return 'Floor block';
    const P = MM.STAGE_PICS[pc.atlas], sp = P && P.pics[pc.pic];
    return (sp && sp.label) || pc.pic;
  }

  function fit() {
    const box = cv.parentElement.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = Math.max(200, Math.round(box.width * dpr)); cv.height = Math.max(120, Math.round(box.height * dpr));
    cv.style.width = box.width + 'px'; cv.style.height = box.height + 'px';
    updateView();
  }
  function updateView() { // fit the arena and its KO lines on screen (not while dragging, so nothing jumps)
    if (drag) return;
    const m = mainOf(A);
    let v = { x: -1150, y: -760, w: 2300, h: 1200 };
    if (m) { const b = blastOf(A); v = { x: b.left - 40, y: b.top - 40, w: b.right - b.left + 80, h: b.bottom - b.top + 80 }; v.h = Math.min(v.h, 1500); v.y = Math.max(v.y, m.y - 1150); }
    VIEW = v;
    view.s = Math.min(cv.width / VIEW.w, cv.height / VIEW.h);
    view.ox = cv.width / 2 - (VIEW.x + VIEW.w / 2) * view.s; view.oy = cv.height / 2 - (VIEW.y + VIEW.h / 2) * view.s;
  }

  function draw() {
    if (!open) return;
    const W = cv.width, H = cv.height, dpr = W / Math.max(1, cv.getBoundingClientRect().width);
    updateView();
    g.setTransform(1, 0, 0, 1, 0, 0);
    MM.drawSky(g, W, H, A.bg, 0, null);
    g.setTransform(view.s, 0, 0, view.s, view.ox, view.oy);
    const m = mainOf(A);
    if (m && A.bg !== 'sky' && A.water === null) { // darken the painted ground below the floor (as in a match)
      const gr = g.createLinearGradient(0, m.y - 30, 0, m.y + 400); gr.addColorStop(0, 'rgba(15,8,30,0)'); gr.addColorStop(0.25, 'rgba(15,8,30,.45)'); gr.addColorStop(1, 'rgba(15,8,30,.76)');
      g.fillStyle = gr; g.fillRect(VIEW.x - 400, m.y - 30, VIEW.w + 800, 3000);
    }
    if (snap) { // grid
      g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 1 / view.s;
      for (let x = Math.ceil(VIEW.x / 100) * 100; x < VIEW.x + VIEW.w; x += 100) { g.beginPath(); g.moveTo(x, VIEW.y); g.lineTo(x, VIEW.y + VIEW.h); g.stroke(); }
      for (let y = Math.ceil(VIEW.y / 100) * 100; y < VIEW.y + VIEW.h; y += 100) { g.beginPath(); g.moveTo(VIEW.x, y); g.lineTo(VIEW.x + VIEW.w, y); g.stroke(); }
    }
    A.pieces.forEach((pc) => MM.drawPiece(g, pc, pc.x, pc.y, pc.w, null));
    if (A.water !== null) { // the lake surface
      g.fillStyle = WATER_COLOR; g.fillRect(VIEW.x - 400, A.water, VIEW.w + 800, 3000);
      g.strokeStyle = 'rgba(220,250,255,.7)'; g.lineWidth = 3; g.beginPath(); g.moveTo(VIEW.x - 400, A.water); g.lineTo(VIEW.x + VIEW.w + 400, A.water); g.stroke();
    }
    // walkable tops: gold = solid floor, white = jump-through, cyan = bobbing
    g.lineWidth = 5 / view.s * 1.2; g.setLineDash([]);
    for (const pc of A.pieces) {
      if (!collides(pc)) continue;
      g.strokeStyle = pc.role === 'main' ? '#ffc21a' : pc.role === 'bob' ? '#1fd1ef' : 'rgba(255,255,255,.9)';
      g.beginPath(); g.moveTo(pc.x, pc.y); g.lineTo(pc.x + pc.w, pc.y); g.stroke();
    }
    // spawn points and blast zone
    if (m) {
      const sp = spawnInfo(A), b = blastOf(A);
      sp.starts.forEach((x, i) => {
        g.fillStyle = MM.PLAYER_COLORS[i] + 'aa'; g.strokeStyle = '#1a0b2e'; g.lineWidth = 3;
        g.beginPath(); g.ellipse(x, sp.y - 56, 24, 56, 0, 0, Math.PI * 2); g.fill(); g.stroke();
        g.fillStyle = '#fff'; g.font = '900 30px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('P' + (i + 1), x, sp.y - 56);
      });
      g.strokeStyle = 'rgba(255,255,255,.55)'; g.setLineDash([10, 10]); g.lineWidth = 3;
      for (const x of sp.comeback) { g.beginPath(); g.arc(x, sp.y - 430, 22, 0, Math.PI * 2); g.stroke(); }
      g.strokeStyle = '#ff4b4b'; g.lineWidth = 6; g.setLineDash([28, 18]);
      g.strokeRect(b.left, b.top, b.right - b.left, b.bottom - b.top);
      g.setLineDash([]);
      g.fillStyle = '#ff4b4b'; g.font = '800 34px system-ui'; g.textAlign = 'left'; g.textBaseline = 'top';
      const lx = Math.max(VIEW.x + 20, b.left + 14);
      g.fillText('KO line', lx, Math.max(VIEW.y + 20, b.top + 12));
    }
    // the selected piece
    const pc = A.pieces[sel];
    if (pc) {
      const b = boxOf(pc), hs = Math.min((9 * dpr) / view.s, Math.min(b.width, b.height) * 0.12);
      g.strokeStyle = '#ffc21a'; g.lineWidth = 4 / view.s * 1.4; g.setLineDash([16, 10]);
      g.strokeRect(b.left, b.top, b.width, b.height); g.setLineDash([]);
      g.fillStyle = '#ffc21a'; g.strokeStyle = '#1a0b2e'; g.lineWidth = 3;
      for (const [hx, hy] of corners(b)) { g.fillRect(hx - hs, hy - hs, hs * 2, hs * 2); g.strokeRect(hx - hs, hy - hs, hs * 2, hs * 2); }
    }
  }
  const corners = (b) => [[b.left, b.top], [b.left + b.width, b.top], [b.left, b.bottom], [b.left + b.width, b.bottom]];

  function selectPiece(i) { sel = i; refreshTools(); }
  function refreshTools() {
    const pc = A.pieces[sel], tools = $('#amTools');
    tools.classList.toggle('off', !pc);
    $('#amSelName').textContent = pc ? pieceName(pc) : 'Tap a piece to change it';
    tools.querySelectorAll('[data-role]').forEach((b) => {
      b.setAttribute('aria-pressed', pc && pc.role === b.dataset.role ? 'true' : 'false');
      b.disabled = !pc || (b.dataset.role !== 'decor' && !canCollide(pc)) || (b.dataset.role === 'bob' && pc.atlas === 'basic');
    });
    tools.querySelectorAll('button:not([data-role])').forEach((b) => { b.disabled = !pc; });
    $('#amTiles').textContent = 'Copies: ' + ((pc && pc.tiles) || 1);
    $('#amWater').textContent = 'Water: ' + (A.water === null ? 'off' : 'on');
    $('#amWater').setAttribute('aria-pressed', A.water === null ? 'false' : 'true');
    $('#amGrid').textContent = 'Snap: ' + (snap ? 'on' : 'off');
    $('#amGrid').setAttribute('aria-pressed', snap ? 'true' : 'false');
    document.querySelectorAll('#amBgs [data-bg]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.bg === A.bg ? 'true' : 'false'));
    $('#amName').value = A.name;
  }
  function canCollide(pc) { return pc.atlas === 'basic' || !!(MM.STAGE_PICS[pc.atlas] && MM.STAGE_PICS[pc.atlas].pics[pc.pic]); }
  function changed() { dirty = true; refreshTools(); }

  // ---------- piece actions (shared by mouse, touch, keyboard and controller) ----------
  function addPiece(atlas, pic, role) {
    const pc = { atlas, pic, role };
    const sp = atlas === 'basic' ? null : MM.STAGE_PICS[atlas].pics[pic];
    pc.w = atlas === 'basic' ? 600 : (sp && sp.w) || 200;
    if (role === 'decor') { const f = MM.STAGE_PICS[atlas].frames[pic]; pc.w = Math.round(f[2] * (110 / f[3])); }
    if (!mainOf(A) && role !== 'decor') pc.role = 'main';
    else if (role !== 'decor' && sp && sp.float) pc.role = 'bob';
    pc.x = 0; pc.y = 0;
    // drop it in the middle, standing on whatever is below
    const b = boxOf(pc); setBox(pc, -b.width / 2, -400, b.width);
    if (pc.role === 'main') pc.y = 0; else dropDown(pc); // a new floor goes where the old one was (top at 0)
    round(pc);
    A.pieces.push(pc); selectPiece(A.pieces.length - 1); changed();
    msg(`Added ${pieceName(pc)}. Drag it, or use the arrow keys / stick.`);
  }
  function moveSel(dx, dy) {
    const pc = A.pieces[sel]; if (!pc) return;
    const b = boxOf(pc);
    setBox(pc, clampX(b.left + dx, b.width), clampY(b.top + dy, b.height), b.width); round(pc); dirty = true;
  }
  const clampX = (x, w) => Math.max(LIMIT.x - w / 2, Math.min(LIMIT.x + LIMIT.w - w / 2, x));
  const clampY = (y, h) => Math.max(LIMIT.y - h / 2, Math.min(LIMIT.y + LIMIT.h - h / 2, y));
  function resizeSel(f) { // bigger / smaller around the bottom middle (it keeps standing where it stood)
    const pc = A.pieces[sel]; if (!pc) return;
    const b = boxOf(pc), nw = Math.max(40, Math.min(2400, b.width * f)), nh = b.height * (nw / b.width);
    setBox(pc, b.left + b.width / 2 - nw / 2, b.bottom - nh, nw); round(pc); changed();
  }
  function setRole(role) {
    const pc = A.pieces[sel]; if (!pc) return;
    if (role !== 'decor' && !canCollide(pc)) return msg('That picture can only be a decoration.', true);
    const b = boxOf(pc), swap = (o, r) => { const ob = boxOf(o); o.role = r; setBox(o, ob.left, ob.top, ob.width); round(o); };
    if (role === 'main') for (const o of A.pieces) if (o !== pc && o.role === 'main') { swap(o, 'plat'); prevMain = o; }
    const wasMain = pc.role === 'main';
    pc.role = role; setBox(pc, b.left, b.top, b.width); round(pc);
    // the floor moved on: give it back to the piece that was the floor before (if it's still there)
    if (wasMain && role !== 'main' && prevMain && prevMain !== pc && A.pieces.includes(prevMain) && canCollide(prevMain)) swap(prevMain, 'main');
    changed();
  }
  function cycleRole() {
    const pc = A.pieces[sel]; if (!pc) return;
    const ok = ROLES.filter((r) => r === 'decor' || (canCollide(pc) && !(r === 'bob' && pc.atlas === 'basic')));
    setRole(ok[(ok.indexOf(pc.role) + 1) % ok.length]);
    msg(pieceName(pc) + ': ' + ROLE_NAMES[pc.role]);
  }
  function deleteSel() {
    const pc = A.pieces[sel]; if (!pc) return;
    A.pieces.splice(sel, 1); selectPiece(Math.min(sel, A.pieces.length - 1)); changed();
    msg(`Removed ${pieceName(pc)}.`);
  }
  function surfaceTopBelow(pc, b) { // highest walkable top under the piece's feet (or the water)
    let best = null;
    for (const o of A.pieces) {
      if (o === pc || !collides(o)) continue;
      if (o.x + o.w < b.left + b.width * 0.2 || o.x > b.left + b.width * 0.8) continue;
      if (o.y >= b.bottom - 2 && (best === null || o.y < best)) best = o.y;
    }
    return best;
  }
  function dropDown(pc) {
    pc = pc || A.pieces[sel]; if (!pc) return;
    const b = boxOf(pc), sp = specOf(pc);
    // boats and rafts sit in the water up to their waterline
    if (A.water !== null && sp && sp.float && pc.role !== 'decor') { setBox(pc, b.left, b.top + (A.water - (pc.y + (sp.float - sp.sy) * b.k)), b.width); round(pc); return; }
    const top = surfaceTopBelow(pc, b);
    const ground = top !== null ? top : mainOf(A) && mainOf(A) !== pc ? null : 0;
    if (ground === null) return;
    setBox(pc, b.left, b.top + (ground - b.bottom) + (sp && !sp.basic ? 2 : 0), b.width); round(pc);
  }
  function layer(d) {
    const pc = A.pieces[sel]; if (!pc) return;
    const j = d > 0 ? A.pieces.length - 1 : 0;
    A.pieces.splice(sel, 1); A.pieces.splice(j, 0, pc); selectPiece(j); changed();
  }
  function tiles() {
    const pc = A.pieces[sel]; if (!pc || pc.atlas === 'basic') return;
    const b = boxOf(pc); pc.tiles = ((pc.tiles || 1) % 4) + 1; if (pc.tiles === 1) delete pc.tiles;
    const nb = boxOf(pc); setBox(pc, b.left, b.bottom - nb.height * (b.width / nb.width) * (nb.width / b.width), nb.width); round(pc); changed();
  }
  function nextPiece(d = 1) { if (!A.pieces.length) return; selectPiece(((sel < 0 ? -1 : sel) + d + A.pieces.length) % A.pieces.length); msg('Selected: ' + pieceName(A.pieces[sel])); }

  // ---------- open / save ----------
  function load(a) { prevMain = null; A = JSON.parse(JSON.stringify(a)); if (A.water === undefined) A.water = null; sel = -1; dirty = false; refreshTools(); drawList(); }
  function doSave() {
    A.name = $('#amName').value.trim() || A.name;
    const bad = problems(A);
    if (bad.length) { msg(bad[0], true); return false; }
    try { const d = save(A); A.id = d.id; } catch (e) { msg('Could not save (storage is full or blocked).', true); return false; }
    dirty = false; drawList(); msg(`Saved "${A.name}". It's in the arena list now.`);
    return true;
  }
  function drawList() {
    const arenas = list();
    $('#amList').innerHTML = arenas.length ? arenas.map((a) => `<div class="am-saved"><button data-edit="${a.id}">✎ ${esc(a.name)}</button><button class="am-del" data-del="${a.id}" title="Delete ${esc(a.name)}">✕</button></div>`).join('') : '<p class="am-help">Nothing saved yet.</p>';
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- building the panel ----------
  const atlasImgs = {};
  function atlasImg(atlas, cb) {
    const src = MM.STAGE_PICS[atlas].props;
    if (!atlasImgs[src]) { atlasImgs[src] = new Image(); atlasImgs[src].src = src; }
    const im = atlasImgs[src];
    if (im.complete && im.naturalWidth) cb(im); else im.addEventListener('load', () => cb(im), { once: true });
  }
  function thumb(atlas, frame, sub) {
    const c = document.createElement('canvas'); c.width = 96; c.height = 56;
    if (atlas === 'basic') { const t = c.getContext('2d'); t.translate(8, 18); t.scale(80 / 400, 80 / 400); MM.drawPiece(t, { atlas: 'basic', pic: 'block', role: 'main' }, 0, 0, 400, null); return c; }
    atlasImg(atlas, (im) => {
      const f = MM.STAGE_PICS[atlas].frames[frame], r = sub ? [f[0] + sub[0], f[1] + sub[1], sub[2], sub[3]] : f;
      const k = Math.min(88 / r[2], 50 / r[3]), w = r[2] * k, h = r[3] * k;
      c.getContext('2d').drawImage(im, r[0], r[1], r[2], r[3], (96 - w) / 2, (56 - h) / 2, w, h);
    });
    return c;
  }
  function pieceButton(atlas, pic, label, role, frame, sub) {
    const b = document.createElement('button');
    b.className = 'am-piece'; b.dataset.atlas = atlas; b.dataset.pic = pic; b.dataset.role = role;
    b.title = label; b.appendChild(thumb(atlas, frame, sub));
    const s = document.createElement('span'); s.textContent = label; b.appendChild(s);
    return b;
  }
  function buildPanel() {
    const pal = $('#amPalette'), dec = $('#amDecor');
    pal.innerHTML = ''; dec.innerHTML = '';
    pal.appendChild(pieceButton('basic', 'block', 'Floor block', 'plat'));
    for (const atlas of BGS.slice(1)) {
      const P = MM.STAGE_PICS[atlas];
      for (const k in P.pics) { const sp = P.pics[k]; pal.appendChild(pieceButton(atlas, k, sp.label || k, 'plat', sp.pic || k, sp.sub)); }
      for (const fr in P.frames) dec.appendChild(pieceButton(atlas, fr, DECOR_NAMES[fr] || fr[0].toUpperCase() + fr.slice(1), 'decor', fr));
    }
    $('#amBgs').innerHTML = BGS.map((k) => `<button data-bg="${k}">${BG_NAMES[k]}</button>`).join('');
    $('#amTemplates').innerHTML = '<button data-tpl="">Empty</button>' + MM.STAGES.filter((s) => !s.custom && MM.STAGE_PICS[s.theme]).map((s) => `<button data-tpl="${s.id}">${esc(BG_NAMES[s.theme] || s.name)}</button>`).join('');
  }

  // ---------- mouse and touch ----------
  function pointerPos(e) { const r = cv.getBoundingClientRect(); return toWorld((e.clientX - r.left) * (cv.width / r.width), (e.clientY - r.top) * (cv.height / r.height)); }
  function hit(p) {
    const pc = A.pieces[sel];
    if (pc) { const b = boxOf(pc), hs = (22 * (cv.width / Math.max(1, cv.getBoundingClientRect().width))) / view.s; const c = corners(b).findIndex(([x, y]) => Math.abs(p.x - x) < hs && Math.abs(p.y - y) < hs); if (c >= 0) return { handle: c }; }
    for (let i = A.pieces.length - 1; i >= 0; i--) { const b = boxOf(A.pieces[i]); if (p.x >= b.left && p.x <= b.left + b.width && p.y >= b.top && p.y <= b.bottom) return { piece: i }; }
    return {};
  }
  function onDown(e) {
    if (!A) return;
    cv.focus(); cv.setPointerCapture(e.pointerId);
    const p = pointerPos(e), h = hit(p);
    if (h.handle !== undefined) { const b = boxOf(A.pieces[sel]); const c = corners(b); drag = { type: 'size', anchor: c[3 - h.handle], ratio: b.height / b.width }; }
    else if (h.piece !== undefined) { selectPiece(h.piece); const b = boxOf(A.pieces[sel]); drag = { type: 'move', dx: p.x - b.left, dy: p.y - b.top }; }
    else { selectPiece(-1); drag = null; }
    e.preventDefault();
  }
  function onMove(e) {
    if (!drag || !A.pieces[sel]) return;
    const p = pointerPos(e), pc = A.pieces[sel], b = boxOf(pc);
    if (drag.type === 'move') setBox(pc, clampX(S(p.x - drag.dx), b.width), clampY(S(p.y - drag.dy), b.height), b.width);
    else {
      const [ax, ay] = drag.anchor, w = Math.max(40, Math.min(2400, Math.max(Math.abs(p.x - ax), Math.abs(p.y - ay) / drag.ratio))), h = w * drag.ratio;
      setBox(pc, p.x < ax ? ax - w : ax, p.y < ay ? ay - h : ay, w);
    }
    round(pc); dirty = true;
  }
  function onUp() { if (drag) { drag = null; refreshTools(); } }

  // ---------- keyboard ----------
  function onKey(e) {
    if (!open || e.target === $('#amName')) return;
    const k = e.key, big = e.shiftKey ? 50 : 10;
    const onCanvas = document.activeElement === cv || sel >= 0;
    if (k === 'Escape') { if (sel >= 0) selectPiece(-1); else $('#amBack').click(); e.preventDefault(); return; }
    if (!onCanvas) return;
    const acts = {
      ArrowLeft: () => moveSel(-big, 0), ArrowRight: () => moveSel(big, 0), ArrowUp: () => moveSel(0, -big), ArrowDown: () => moveSel(0, big),
      '+': () => resizeSel(1.1), '=': () => resizeSel(1.1), '-': () => resizeSel(1 / 1.1), _: () => resizeSel(1 / 1.1),
      Delete: deleteSel, Backspace: deleteSel, t: cycleRole, T: cycleRole, y: cycleRole, n: () => nextPiece(1), N: () => nextPiece(-1),
      Tab: () => nextPiece(e.shiftKey ? -1 : 1), d: () => { dropDown(); changed(); }, Enter: () => (sel < 0 ? nextPiece(1) : null),
    };
    if (k === 'Tab' && document.activeElement !== cv) return; // normal Tab moves between buttons
    if (acts[k]) { acts[k](); e.preventDefault(); }
  }

  // ---------- game controller ----------
  // Stick / D-pad move the selected piece, LB/LT smaller, RB/RT bigger, A select next piece,
  // B let go of the piece (again: back to the title), X delete, Y change type, Start save.
  // With no piece selected, the D-pad / stick moves between the buttons and A presses one.
  const padPrev = {};
  let padRepeat = 0;
  function pollPads() {
    const pads = (navigator.getGamepads && navigator.getGamepads()) || [];
    for (const p of pads) {
      if (!p) continue;
      const prev = padPrev[p.index] || [], btn = (i) => !!(p.buttons[i] && p.buttons[i].pressed), was = (i) => !!prev[i], tap = (i) => btn(i) && !was(i);
      let sx = Math.abs(p.axes[0]) > 0.3 ? p.axes[0] : 0, sy = Math.abs(p.axes[1]) > 0.3 ? p.axes[1] : 0;
      if (btn(14)) sx = -1; if (btn(15)) sx = 1; if (btn(12)) sy = -1; if (btn(13)) sy = 1;
      if (sel >= 0 && A.pieces[sel]) {
        if (sx || sy) moveSel(sx * 9, sy * 9);
        const grow = btn(5) || btn(7), shrink = btn(4) || btn(6);
        if ((grow || shrink) && padRepeat-- <= 0) { resizeSel(grow ? 1.06 : 1 / 1.06); padRepeat = 6; }
        if (!grow && !shrink) padRepeat = 0;
        if (tap(0)) nextPiece(1);
        if (tap(1)) { selectPiece(-1); focusFirst(); }
        if (tap(2)) deleteSel();
        if (tap(3)) cycleRole();
      } else {
        const dir = sx || sy ? [Math.sign(sx), Math.sign(sy)] : null, key = dir ? dir.join() : '';
        if (dir && (key !== padPrev['d' + p.index] || padRepeat-- <= 0)) { moveFocus(dir[0], dir[1]); padRepeat = key !== padPrev['d' + p.index] ? 18 : 7; }
        padPrev['d' + p.index] = key;
        if (tap(0)) { const el = document.activeElement; if (el === cv) nextPiece(1); else if (el && $('#maker').contains(el)) el.click(); }
        if (tap(1)) $('#amBack').click();
        if (tap(3) && A.pieces.length) nextPiece(1);
      }
      if (tap(9)) doSave();
      padPrev[p.index] = p.buttons.map((b) => b.pressed);
    }
  }
  function focusables() { return [...$('#maker').querySelectorAll('button:not([disabled]), input, canvas')].filter((el) => el.offsetParent !== null); }
  function focusFirst() { const f = focusables(); const b = f.find((el) => el.classList.contains('am-piece')) || f[0]; if (b) b.focus(); }
  function moveFocus(dx, dy) { // spatial: the nearest button in that direction
    const els = focusables(), cur = document.activeElement;
    if (!cur || !els.includes(cur)) return focusFirst();
    const r = cur.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    let best = null, bd = Infinity;
    for (const el of els) {
      if (el === cur) continue;
      const q = el.getBoundingClientRect(), x = q.left + q.width / 2, y = q.top + q.height / 2, ddx = x - cx, ddy = y - cy;
      if (dx && Math.sign(ddx) !== dx) continue; if (dy && Math.sign(ddy) !== dy) continue;
      if ((dx && Math.abs(ddx) < 4) || (dy && Math.abs(ddy) < 4)) continue;
      const d = dx ? Math.abs(ddx) + Math.abs(ddy) * 3 : Math.abs(ddy) + Math.abs(ddx) * 3;
      if (d < bd) { bd = d; best = el; }
    }
    if (best) { best.focus(); best.scrollIntoView({ block: 'nearest' }); }
  }

  function loop() {
    if (!open) return;
    if (!$('#maker').classList.contains('show')) { close(); return; }
    const bx = cv.parentElement.getBoundingClientRect(); if (Math.abs(bx.width - parseFloat(cv.style.width || 0)) > 1 || Math.abs(bx.height - parseFloat(cv.style.height || 0)) > 1) fit(); // the box changed size
    pollPads(); draw();
    requestAnimationFrame(loop);
  }
  function close() { open = false; MM.arenaMaker.active = false; }

  // ---------- wiring ----------
  let wired = false;
  function wire() {
    if (wired) return; wired = true;
    cv = $('#amCanvas'); g = cv.getContext('2d');
    buildPanel();
    cv.addEventListener('pointerdown', onDown); cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerup', onUp); cv.addEventListener('pointercancel', onUp);
    addEventListener('keydown', onKey);
    addEventListener('resize', () => open && fit());
    $('#maker').addEventListener('click', (e) => {
      const t = e.target.closest('button'); if (!t) return;
      if (t.classList.contains('am-piece')) return addPiece(t.dataset.atlas, t.dataset.pic, t.dataset.role);
      if (t.dataset.role && t.closest('#amTools')) return setRole(t.dataset.role);
      if (t.dataset.bg) { A.bg = t.dataset.bg; if (A.bg === 'agnew' && A.water === null && mainOf(A)) A.water = mainOf(A).y + 130; return changed(); }
      if (t.dataset.tpl !== undefined) { load(t.dataset.tpl ? fromBuiltIn(t.dataset.tpl) : blank()); return msg('Started a new arena. Save it when you like it.'); }
      if (t.dataset.edit) { const a = list().find((x) => x.id === t.dataset.edit); if (a) { load(a); msg(`Editing "${a.name}".`); } return; }
      if (t.dataset.del) {
        if (t.dataset.sure !== '1') { t.dataset.sure = '1'; t.textContent = 'Delete?'; setTimeout(() => { t.dataset.sure = ''; t.textContent = '✕'; }, 3000); return; }
        const a = list().find((x) => x.id === t.dataset.del); remove(t.dataset.del); if (A && A.id === t.dataset.del) A.id = null; drawList(); return msg(`Deleted "${a ? a.name : 'arena'}".`);
      }
      const acts = { amBigger: () => resizeSel(1.12), amSmaller: () => resizeSel(1 / 1.12), amDel: deleteSel, amDrop: () => { dropDown(); changed(); }, amToBack: () => layer(-1), amToFront: () => layer(1), amTiles: tiles, amNext: () => nextPiece(1),
        amWater: () => { A.water = A.water === null ? (mainOf(A) ? mainOf(A).y + 130 : 130) : null; changed(); }, amWaterUp: () => { if (A.water !== null) { A.water -= 10; changed(); } }, amWaterDown: () => { if (A.water !== null) { A.water += 10; changed(); } },
        amGrid: () => { snap = !snap; refreshTools(); }, amNew: () => { load(blank()); msg('New arena.'); }, amSave: doSave };
      if (acts[t.id]) acts[t.id]();
    });
    // Play: save first; if it can't be saved, stay here (stop the click before ui.js sees data-go)
    $('#amPlay').addEventListener('click', (e) => { if (!doSave()) { e.stopPropagation(); e.preventDefault(); } });
    $('#amName').addEventListener('input', () => { A.name = $('#amName').value; dirty = true; });
  }
  function openEditor(id) {
    wire();
    const a = id && list().find((x) => x.id === id);
    if (!A || id) load(a || blank()); else { refreshTools(); drawList(); }
    open = true; MM.arenaMaker.active = true;
    requestAnimationFrame(() => { fit(); loop(); });
  }

  MM.arenaMaker = {
    active: false,
    open: openEditor, list, save, remove, register, toStage, problems, fromBuiltIn, blank,
    get arena() { return A; }, get selected() { return sel; }, select: selectPiece,
    add: addPiece, move: moveSel, resize: resizeSel, setRole, delete: deleteSel, drop: dropDown,
    // where a world point is on the page (for tests and tutorials)
    toClient(x, y) { const r = cv.getBoundingClientRect(); return { x: r.left + (x * view.s + view.ox) * (r.width / cv.width), y: r.top + (y * view.s + view.oy) * (r.height / cv.height) }; },
  };
})();
