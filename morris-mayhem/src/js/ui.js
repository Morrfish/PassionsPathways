// Menus, character select and the main loop.
window.MM = window.MM || {};
(function () {
  const $ = (s) => document.querySelector(s);
  const canvas = $('#game'), g = canvas.getContext('2d');
  let W = 0, H = 0;
  function resize() {
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = canvas.width = Math.round(innerWidth * dpr); H = canvas.height = Math.round(innerHeight * dpr);
  }
  addEventListener('resize', resize); resize();
  MM.loadPhotos();
  MM.setupTouch($('#touch'));

  // ---------- saved settings ----------
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem('mm_' + k)) ?? d; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem('mm_' + k, JSON.stringify(v)); } catch (e) {} };
  const ids = MM.FIGHTERS.map((f) => f.id);
  let slots = load('slots', null);
  if (!slots || slots.length !== 4) slots = [
    { type: 'human', dev: MM.isTouch ? 'touch' : 'k1', fighter: ids[0], level: 2 },
    { type: 'cpu', dev: 'k2', fighter: ids[1 % ids.length], level: 2 },
    { type: 'off', dev: 'p0', fighter: ids[2 % ids.length], level: 2 },
    { type: 'off', dev: 'p1', fighter: ids[3 % ids.length], level: 2 },
  ];
  slots.forEach((s) => { if (!ids.includes(s.fighter)) s.fighter = ids[0]; });
  let activeSlot = 0;

  // ---------- screens ----------
  let screen = 'title', G = null, demo = null, paused = false, lastSetup = null;
  function show(id) {
    screen = id;
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('show', s.id === id));
    $('#touch').classList.toggle('show', id === 'match' && !!G && G.fighters.some((f) => f.dev === 'touch' && !f.cpu));
    if (id === 'select') drawSelect();
    if (id === 'family') drawFamily();
    if (id === 'title' || id === 'select' || id === 'howto' || id === 'family') { G = null; startDemo(); }
  }
  document.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) { MM.sfx('select'); show(go.dataset.go === 'roster' ? 'family' : go.dataset.go); }
  });

  // ---------- character select ----------
  const portraits = {};
  const portrait = (id) => portraits[id] || (portraits[id] = MM.portrait(MM.FIGHTERS.find((f) => f.id === id)));
  const fighterById = (id) => MM.FIGHTERS.find((f) => f.id === id);
  function devOptions(sel) {
    return Object.entries(MM.DEVICE_NAMES).map(([k, v]) => `<option value="${k}" ${k === sel ? 'selected' : ''}>${v}</option>`).join('');
  }
  function drawSelect() {
    const box = $('#slots');
    box.innerHTML = slots.map((s, i) => {
      const f = fighterById(s.fighter);
      return `<div class="slot ${s.type === 'off' ? 'off' : ''} ${i === activeSlot ? 'active' : ''}" data-slot="${i}" style="border-color:${MM.PLAYER_COLORS[i]}">
        <div class="pn" style="color:${MM.PLAYER_COLORS[i]}">P${i + 1}</div>
        <select data-k="type"><option value="human" ${s.type === 'human' ? 'selected' : ''}>Player</option><option value="cpu" ${s.type === 'cpu' ? 'selected' : ''}>Computer</option><option value="off" ${s.type === 'off' ? 'selected' : ''}>Empty</option></select>
        ${s.type === 'off' ? '<div class="ttl">Press Attack on a free controller to join</div>' : `
        <div class="pick"><button data-k="prev">◀</button><img src="${portrait(s.fighter)}" alt=""><button data-k="next">▶</button></div>
        <div class="nm">${f.name}</div><div class="ttl">${f.title || ''}</div>
        ${s.type === 'human' ? `<select data-k="dev">${devOptions(s.dev)}</select>` : `<select data-k="level"><option value="1" ${s.level == 1 ? 'selected' : ''}>Easy</option><option value="2" ${s.level == 2 ? 'selected' : ''}>Normal</option><option value="3" ${s.level == 3 ? 'selected' : ''}>Hard</option></select>`}`}
      </div>`;
    }).join('');
    $('#roster').innerHTML = MM.FIGHTERS.map((f) => `<button data-f="${f.id}"><img src="${portrait(f.id)}" alt="">${f.name}</button>`).join('');
    $('#stage').innerHTML = MM.STAGES.map((s) => `<option value="${s.id}">${s.name}</option>`).join('');
    $('#stage').value = load('stage', MM.STAGES[0].id); $('#stocks').value = load('stocks', 3);
  }
  $('#slots').addEventListener('click', (e) => {
    const el = e.target.closest('.slot'); if (!el) return;
    const i = +el.dataset.slot, k = e.target.dataset.k;
    activeSlot = i;
    if (k === 'prev' || k === 'next') cycle(i, k === 'next' ? 1 : -1);
    else if (!k) drawSelect();
    else if (e.target.tagName !== 'SELECT') drawSelect();
  });
  $('#slots').addEventListener('change', (e) => {
    const el = e.target.closest('.slot'), i = +el.dataset.slot, k = e.target.dataset.k;
    slots[i][k] = k === 'level' ? +e.target.value : e.target.value;
    if (k === 'dev') slots.forEach((s, j) => { if (j !== i && s.type === 'human' && s.dev === e.target.value) s.type = 'off'; });
    save('slots', slots); drawSelect();
  });
  $('#roster').addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    if (slots[activeSlot].type === 'off') slots[activeSlot].type = 'human';
    slots[activeSlot].fighter = b.dataset.f; MM.sfx('select');
    activeSlot = (activeSlot + 1) % 4; if (slots[activeSlot].type === 'off') activeSlot = slots.findIndex((s) => s.type !== 'off');
    save('slots', slots); drawSelect();
  });
  function cycle(i, d) { const n = ids.indexOf(slots[i].fighter); slots[i].fighter = ids[(n + d + ids.length) % ids.length]; MM.sfx('select'); save('slots', slots); drawSelect(); }

  // controllers and keyboards can join and pick on the select screen
  const menuPrev = {};
  function pollMenuInput() {
    const devs = ['k1', 'k2', 'p0', 'p1', 'p2', 'p3'];
    for (const dv of devs) {
      const inp = MM.readDevice(dv), pr = menuPrev[dv] || {};
      menuPrev[dv] = inp;
      const press = (k) => inp[k] && !pr[k];
      const xPress = inp.x !== 0 && inp.x !== pr.x;
      if (screen === 'select') {
        const i = slots.findIndex((s) => s.type === 'human' && s.dev === dv);
        if (i >= 0) {
          if (xPress) cycle(i, inp.x);
          if (press('pause')) $('#fight').click();
          if (press('special')) { slots[i].type = 'off'; save('slots', slots); drawSelect(); }
        } else if (press('attack') && dv[0] === 'p') {
          const free = slots.findIndex((s) => s.type === 'off') >= 0 ? slots.findIndex((s) => s.type === 'off') : slots.findIndex((s) => s.type === 'cpu');
          if (free >= 0) { slots[free].type = 'human'; slots[free].dev = dv; MM.sfx('select'); save('slots', slots); drawSelect(); }
        }
      } else if (screen === 'title' && (press('attack') || press('pause')) && dv[0] === 'p') show('select');
      else if (screen === 'match' && G && press('pause') && G.fighters.some((f) => f.dev === dv && !f.cpu)) togglePause();
      else if (screen === 'pause' && press('pause')) togglePause();
      else if (screen === 'results' && press('pause')) $('#rematch').click();
    }
    if (screen === 'match' && G && MM.touch.pause) { MM.touch.pause = false; togglePause(); }
    const pc = MM.connectedPads().length; $('#padcount').textContent = pc ? `${pc} controller${pc > 1 ? 's' : ''} connected` : 'no controllers yet';
  }

  // ---------- matches ----------
  $('#fight').addEventListener('click', () => {
    const players = slots.map((s, i) => ({ ...s, slot: i })).filter((s) => s.type !== 'off').map((s) => ({ slot: s.slot, fighter: s.fighter, dev: s.dev, cpu: s.type === 'cpu', level: s.level }));
    if (players.length < 2) { alert('You need at least 2 fighters. Set another slot to Player or Computer.'); return; }
    save('stage', $('#stage').value); save('stocks', +$('#stocks').value);
    lastSetup = { players, stage: $('#stage').value, stocks: +$('#stocks').value };
    startMatch();
  });
  function startMatch() {
    demo = null; MM.muted = false; MM.resetCamera();
    G = MM.newGame(lastSetup.players, lastSetup.stage, lastSetup.stocks);
    paused = false; show('match');
  }
  function togglePause() {
    if (!G || G.over) return;
    paused = !paused; show(paused ? 'pause' : 'match'); screen = paused ? 'pause' : 'match';
  }
  $('#resume').addEventListener('click', togglePause);
  $('#quit').addEventListener('click', () => { paused = false; show('select'); });
  $('#rematch').addEventListener('click', () => lastSetup && startMatch());
  addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && screen === 'pause') togglePause();
    else if (e.code === 'Escape' && (screen === 'select' || screen === 'howto' || screen === 'family')) show('title');
    else if (e.code === 'Enter' && screen === 'select' && !e.repeat) $('#fight').click();
  });

  function showResults() {
    const fs = [...G.fighters].sort((a, b) => (b === G.winner) - (a === G.winner) || b.stocks - a.stocks || b.kos - a.kos);
    $('#winner').textContent = G.winner ? `${G.winner.def.name} wins!` : 'Draw!';
    $('#stats').innerHTML = fs.map((f) => `<div class="stat ${f === G.winner ? 'win' : ''}" style="border-color:${MM.PLAYER_COLORS[f.slot]}">
      <img src="${portrait(f.def.id)}" alt=""><div><b>${f.cpu ? 'CPU' : 'P' + (f.slot + 1)} · ${f.def.name}</b></div>
      <div>KOs: ${f.kos} · Falls: ${f.falls}</div><div>Damage dealt: ${Math.round(f.dealt)}%</div></div>`).join('');
    show('results');
  }

  // ---------- title-screen demo (4 computers fighting in the background) ----------
  function startDemo() {
    if (demo) return;
    const pick = [...ids].sort(() => Math.random() - 0.5);
    demo = MM.newGame([0, 1, 2, 3].map((i) => ({ slot: i, fighter: pick[i % pick.length], cpu: true, level: 2 })), MM.STAGES[Math.floor(Math.random() * MM.STAGES.length)].id, 3);
    demo.countdown = 0; demo.isDemo = true;
  }

  // ---------- family cards ----------
  const KIND_TEXT = {
    projectile: (s) => `throws ${s.emoji || 'an energy ball'}${s.count > 1 ? ` ×${s.count}` : ''}${s.boomerang ? ' that comes back' : ''}`,
    shockwave: () => 'sends shockwaves along the ground both ways', dash: (s) => `charges forward${s.armor ? " and can't be stopped by small hits" : ''}`,
    rise: () => 'launches up (gets back to the stage)', teleport: () => 'vanishes and reappears (aim it)', slam: () => 'dives down and crashes',
    spin: () => 'spins and hits again and again', counter: () => 'blocks a hit and strikes back (bounces things back too)',
    heal: (s) => `heals ${s.amount}% damage`, trap: (s) => `leaves a ${s.emoji || 'trap'} on the ground`, buff: () => 'powers up: faster and stronger for a while',
  };
  function drawFamily() {
    const bar = (label, v, max) => `<div>${label}<i><b style="width:${Math.min(100, (v / max) * 100)}%"></b></i></div>`;
    $('#cards').innerHTML = MM.FIGHTERS.map((f) => `<div class="card" style="border-color:${f.color}">
      <img src="${portrait(f.id)}" alt=""><h3>${f.name}</h3><small>${f.title || ''}</small>
      <div class="bars">${bar('Speed', f.stats.speed, 9)}${bar('Power', f.stats.power, 1.4)}${bar('Weight', f.stats.weight, 1.4)}</div>
      <ul>${['neutral', 'side', 'up', 'down'].map((k) => { const s = f.specials[k]; return s ? `<li><b>${{ neutral: 'Special', side: '→ Special', up: '↑ Special', down: '↓ Special' }[k]}: ${s.name}</b>: ${(KIND_TEXT[s.kind] || (() => ''))(s)}</li>` : ''; }).join('')}</ul></div>`).join('');
  }

  // ---------- main loop ----------
  let last = performance.now(), acc = 0;
  const STEP = 1000 / 60;
  function frame(now) {
    acc += Math.min(100, now - last); last = now;
    pollMenuInput();
    const world = G || demo;
    if (world) {
      const slow = world.slowmo > 0 ? 3 : 1;
      while (acc >= STEP * slow) {
        acc -= STEP * slow;
        if (world === G && paused) continue;
        MM.muted = world === demo;
        if (world.slowmo > 0) world.slowmo--;
        MM.step(world);
        if (world === demo && demo.over) { demo = null; startDemo(); break; }
      }
      if (world === G && G.over && G.endT <= 0 && screen === 'match') showResults();
      MM.render(g, world, W, H);
      if (world === demo) { g.fillStyle = 'rgba(10,8,25,.55)'; g.fillRect(0, 0, W, H); }
    }
    requestAnimationFrame(frame);
  }
  const origSfx = MM.sfx; MM.sfx = (...a) => { if (!MM.muted) origSfx(...a); };
  startDemo();
  requestAnimationFrame(frame);
  MM.debug = { get G() { return G; }, slots, startMatch: (setup) => { lastSetup = setup; startMatch(); } };
})();
