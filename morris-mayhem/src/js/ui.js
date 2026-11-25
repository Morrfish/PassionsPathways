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
  MM.preloadSprites();
  MM.preloadStages();
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
  slots.forEach((s, i) => { if (!ids.includes(s.fighter)) s.fighter = ids[0]; if (!s.team) s.team = i % 2 ? 'B' : 'A'; });
  // match options (buttons you tap to change, no dropdowns)
  const opt = { mode: load('mode', 'ffa'), ff: !!load('ff', false), time: +load('time', 0), stocks: +load('stocks', 3) };
  const teamMode = () => opt.mode === 'teams';
  const TIMES = [0, 120, 180, 300], timeName = (t) => (t ? t / 60 + ' min' : 'No limit');
  function drawOptions() {
    $('#modeBtn').innerHTML = `Mode: <b>${teamMode() ? '2v2 Teams' : 'Free-for-all'}</b>`;
    $('#ffBtn').innerHTML = `Friendly fire: <b>${opt.ff ? 'On' : 'Off'}</b>`; $('#ffBtn').hidden = !teamMode();
    $('#timeBtn').innerHTML = `Time: <b>${timeName(opt.time)}</b>`;
    $('#livesBtn').innerHTML = `Lives: <b>${opt.stocks}</b>`;
    for (const k in opt) save(k, opt[k]);
  }
  const DEVS = Object.keys(MM.DEVICE_NAMES), LEVELS = { 1: 'Easy', 2: 'Normal', 3: 'Hard' }, TYPES = { human: 'Player', cpu: 'Computer', off: 'Empty' };
  let activeSlot = 0;

  // ---------- screens ----------
  let screen = 'title', G = null, demo = null, paused = false, lastSetup = null;
  function show(id) {
    screen = id;
    document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('show', s.id === id));
    $('#touch').classList.toggle('show', id === 'match' && !!G && G.fighters.some((f) => f.dev === 'touch' && !f.cpu));
    MM.menuFocusFirst && MM.menuFocusFirst();
    if (id === 'select') drawSelect();
    if (id === 'family') drawFamily();
    if (id === 'moves') drawMoves();
    if (id === 'story') drawStory();
    if (id === 'arena') drawArenas();
    if (id === 'maker' && MM.arenaMaker) MM.arenaMaker.open(); // Arena Maker (arena-maker.js)
    if ((id === 'title' || id === 'select' || id === 'arena' || id === 'howto' || id === 'family' || id === 'moves' || id === 'story') && !paused) { G = null; demo = null; } // menus have their own backgrounds now (no demo match behind)
  }
  document.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go]');
    if (go) { MM.sfx('select'); show(go.dataset.go === 'roster' ? 'family' : go.dataset.go); }
  });

  // ---------- character select ----------
  const portraits = {};
  const portrait = (id) => {
    if (portraits[id]) return portraits[id];
    const d = MM.FIGHTERS.find((f) => f.id === id), im = MM.photos[id], url = MM.portrait(d);
    if (!d.photo || (im && im.complete)) portraits[id] = url; // don't keep a cartoon stand-in while a photo is loading
    else if (im) im.addEventListener('load', () => { delete portraits[id]; if (screen === 'select') drawSelect(); else if (screen === 'family') drawFamily(); }, { once: true });
    return url;
  };
  const fighterById = (id) => MM.FIGHTERS.find((f) => f.id === id);
  function devOptions(sel) {
    return Object.entries(MM.DEVICE_NAMES).map(([k, v]) => `<option value="${k}" ${k === sel ? 'selected' : ''}>${v}</option>`).join('');
  }
  function drawSelect() {
    const box = $('#slots');
    const pcol = (i) => (teamMode() ? MM.TEAM_COLORS[slots[i].team] : MM.PLAYER_COLORS[i]);
    box.innerHTML = slots.map((s, i) => {
      const f = fighterById(s.fighter), off = s.type === 'off';
      const card = off ? 'player-card-empty' : ['player-card-p1-red', 'player-card-p2-blue', 'player-card-p3-green', 'player-card-p4-yellow'][i]; // ChatGPT cards
      return `<div class="slot ${off ? 'off' : ''} ${i === activeSlot ? 'active' : ''}" data-slot="${i}" style="--pc:${pcol(i)};--card:url(img/ui/${card}.webp)">
        ${off ? '' : `<img class="art" src="${portrait(s.fighter)}" alt="">
        <div class="pick"><button data-k="prev" aria-label="Previous fighter">◀</button><button data-k="next" aria-label="Next fighter">▶</button></div>`}
        <div class="pn">P${i + 1}</div>
        <div class="side">
          ${teamMode() && !off ? `<button class="team ${s.team}" data-k="team" title="Change team">Team ${s.team}</button>` : ''}
          ${off ? '<div class="join">Press X on a controller to join</div>' : `<div class="nm">${f.name}</div><div class="ttl">${f.title || ''}</div>`}
          <button class="cycle" data-k="type">${TYPES[s.type]}</button>
          ${off ? '' : s.type === 'human' ? `<button class="cycle" data-k="dev">🎮 ${MM.DEVICE_NAMES[s.dev]}</button>` : `<button class="cycle" data-k="level">CPU Lv: <b>${LEVELS[s.level] || 'Normal'}</b></button>`}
        </div>
      </div>`;
    }).join('');
    // ChatGPT tag tokens (P1-P4 in the player's color, gray CPU) with the label written on them
    const chips = (id) => slots.map((s, i) => (s.type !== 'off' && s.fighter === id ? `<i class="tag" style="background-image:url(img/ui/select-tag-${s.type === 'cpu' ? 'cpu' : 'p' + (i + 1)}.png)">${s.type === 'cpu' ? 'CPU' : 'P' + (i + 1)}</i>` : '')).join('');
    $('#roster').style.setProperty('--n', MM.FIGHTERS.length + 1); // every tile shares one row, as big as fits
    // grouped by family (MM.FAMILIES in data.js), oldest to youngest
    const tile = (f) => `<button data-f="${f.id}" class="${slots.some((s) => s.type !== 'off' && s.fighter === f.id) ? 'sel' : ''}"><img src="${portrait(f.id)}" alt=""><span class="chips">${chips(f.id)}</span><span class="nm">${f.name}</span></button>`;
    $('#roster').innerHTML = MM.familyGroups().map((g) => `<div class="fam" style="--k:${g.fighters.length}"><div class="famname">${g.name}</div><div class="famtiles">${g.fighters.map(tile).join('')}</div></div>`).join('')
      + `<div class="fam" style="--k:1"><div class="famname">&nbsp;</div><div class="famtiles"><button data-f="random" class="rand"><span class="nm">Random</span></button></div></div>`;
    drawOptions();
  }
  $('#slots').addEventListener('click', (e) => {
    const el = e.target.closest('.slot'); if (!el) return;
    const i = +el.dataset.slot, kEl = e.target.closest("[data-k]"), k = kEl && kEl.dataset.k;
    activeSlot = i;
    if (k === 'prev' || k === 'next') cycle(i, k === 'next' ? 1 : -1);
    else if (k === 'type') { const order = ['human', 'cpu', 'off']; slots[i].type = order[(order.indexOf(slots[i].type) + 1) % 3]; MM.sfx('select'); save('slots', slots); drawSelect(); }
    else if (k === 'dev') { // next control that no other player is using
      for (let n = 1; n <= DEVS.length; n++) { const d = DEVS[(DEVS.indexOf(slots[i].dev) + n) % DEVS.length]; if (!slots.some((s, j) => j !== i && s.type === 'human' && s.dev === d)) { slots[i].dev = d; break; } }
      MM.sfx('select'); save('slots', slots); drawSelect();
    }
    else if (k === 'level') { slots[i].level = (slots[i].level % 3) + 1; MM.sfx('select'); save('slots', slots); drawSelect(); }
    else if (k === 'team') { slots[i].team = slots[i].team === 'A' ? 'B' : 'A'; MM.sfx('select'); save('slots', slots); drawSelect(); }
    else if (!k) drawSelect();
    else if (e.target.tagName !== 'SELECT') drawSelect();
  });
  $('#slots').addEventListener('change', (e) => {
    const el = e.target.closest('.slot'), i = +el.dataset.slot, k = e.target.dataset.k;
    slots[i][k] = k === 'level' ? +e.target.value : e.target.value;
    if (k === 'dev') slots.forEach((s, j) => { if (j !== i && s.type === 'human' && s.dev === e.target.value) s.type = 'off'; });
    save('slots', slots); drawSelect();
  });
  $('#modeBtn').addEventListener('click', () => { opt.mode = teamMode() ? 'ffa' : 'teams'; if (teamMode() && !opt.time) opt.time = 180; MM.sfx('select'); drawSelect(); });
  $('#ffBtn').addEventListener('click', () => { opt.ff = !opt.ff; MM.sfx('select'); drawOptions(); });
  $('#timeBtn').addEventListener('click', () => { opt.time = TIMES[(TIMES.indexOf(opt.time) + 1) % TIMES.length]; MM.sfx('select'); drawOptions(); });
  $('#livesBtn').addEventListener('click', () => { opt.stocks = (opt.stocks % 5) + 1; MM.sfx('select'); drawOptions(); });
  $('#roster').addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    if (mouseOn && e.pointerType !== 'touch') { // the mouse is Player 1's pointer: it always picks for that player
      const i = mouseSlot(); if (slots[i].type === 'off') slots[i].type = 'human';
      slots[i].fighter = b.dataset.f === 'random' ? ids[Math.floor(Math.random() * ids.length)] : b.dataset.f; MM.sfx('select');
      const pc = document.querySelector(`[data-cur="${i}"]`); if (pc) { pc.classList.remove('pop'); void pc.offsetWidth; pc.classList.add('pop'); }
      save('slots', slots); drawSelect(); return;
    }
    if (slots[activeSlot].type === 'off') slots[activeSlot].type = 'human';
    slots[activeSlot].fighter = b.dataset.f === 'random' ? ids[Math.floor(Math.random() * ids.length)] : b.dataset.f; MM.sfx('select');
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
          moveCursor(i, dv, inp, press);
          if (dv[0] === 'p') { const pad = navigator.getGamepads()[+dv.slice(1)], bb = (n) => pad && pad.buttons[n] && pad.buttons[n].pressed;
            const lb = bb(4) || bb(6), rb = bb(5) || bb(7); if (lb && !menuPrev['lb' + dv]) cycle(i, -1); if (rb && !menuPrev['rb' + dv]) cycle(i, 1); menuPrev['lb' + dv] = lb; menuPrev['rb' + dv] = rb; }
          if (press('pause')) $('#fight').click();
        } else if (press('pause') && dv[0] === 'p') $('#fight').click(); // Start = FIGHT from any controller
        else if (press('attack') && dv[0] === 'p') {
          const free = slots.findIndex((s) => s.type === 'off') >= 0 ? slots.findIndex((s) => s.type === 'off') : slots.findIndex((s) => s.type === 'cpu');
          if (free >= 0) { slots[free].type = 'human'; slots[free].dev = dv; MM.sfx('select'); save('slots', slots); drawSelect(); }
        }
      } else if (screen === 'title' && press('pause') && dv[0] === 'p') show('select');
      else if (dv === 'k1') continue; // Escape is handled by the keydown listener below
      else if (screen === 'match' && G && press('pause') && (dv[0] === 'p' || G.fighters.some((f) => f.dev === dv && !f.cpu))) togglePause(); // any controller can pause
      else if (screen === 'pause' && press('pause')) togglePause();
      else if (screen === 'moves' && press('pause')) $('#movesBack').click();
      else if (screen === 'results' && press('pause')) $('#rematch').click();
    }
    if (screen === 'match' && G && MM.touch.pause) { MM.touch.pause = false; togglePause(); }
    const pc = MM.connectedPads().length; $('#padcount').textContent = pc ? `${pc} controller${pc > 1 ? 's' : ''} connected` : 'no controllers yet';
  }

  // ---------- Smash-style pointers on Choose Your Fighter ----------
  // Every human player using a controller or keyboard gets a pointer in their color. Stick / D-pad / WASD /
  // arrows move it; A (or Attack: F, Num 1, X) picks the fighter or presses the button under it. The mouse
  // keeps working as before. Drawn pointers until ChatGPT's art is in (CURSOR_ART).
  const curs = {};
  MM.cursorDevs = new Set(); MM.selectCursors = curs; // (for tests)
  const CURSOR_ART = true; // ChatGPT's object pointers: P1 Bible, P2 red Bronco, P3 Country Crock tub, P4 red cutoffs (img/ui/cursor-p1..p4.png)
  const CUR_SVG = (c) => `<svg viewBox="0 0 40 48" class="hand"><path d="M6 2 L6 38 L15 29 L22 45 L29 42 L22 26 L35 26 Z" fill="${c}" stroke="#1a0b2e" stroke-width="3.5" stroke-linejoin="round"/></svg>`;
  function syncCursors() {
    const layer = $('#cursors');
    MM.cursorDevs = new Set();
    slots.forEach((s, i) => {
      const on = screen === 'select' && ((s.type === 'human' && s.dev && s.dev !== 'touch') || (mouseOn && i === mouseSlot()));
      let el = layer.querySelector(`[data-cur="${i}"]`);
      if (!on) { if (el) el.remove(); delete curs[i]; return; }
      if (s.type === 'human') MM.cursorDevs.add(s.dev);
      if (!el) {
        el = document.createElement('div'); el.className = 'pcur'; el.dataset.cur = i;
        // the object picture (a glow in the player's color around it); if it can't load, a colored arrow instead
        const src = (MM.CURSOR_DATA && MM.CURSOR_DATA[i]) || `img/ui/cursor-p${i + 1}.png`;
        el.innerHTML = `<img class="obj" src="${src}" alt="" style="filter:drop-shadow(0 0 3px ${MM.PLAYER_COLORS[i]}) drop-shadow(0 0 2px ${MM.PLAYER_COLORS[i]}) drop-shadow(0 3px 2px #000a)">${CUR_SVG(MM.PLAYER_COLORS[i])}<b style="background:${MM.PLAYER_COLORS[i]}">P${i + 1}</b>`;
        el.classList.toggle('art', CURSOR_ART);
        const im = el.querySelector('.obj'); im.onerror = () => { el.classList.remove('art'); im.remove(); };
        layer.appendChild(el);
      }
      if (!curs[i]) { // start over this player's fighter
        const t = document.querySelector(`#roster [data-f="${s.fighter}"]`), r = t && t.getBoundingClientRect();
        curs[i] = r && r.width ? { x: r.left + r.width / 2 + (i % 2 ? 14 : -14), y: r.bottom + 46 + (i % 2) * 8 } : { x: innerWidth * (0.2 + i * 0.2), y: innerHeight * 0.3 };
      }
      el.style.transform = `translate(${curs[i].x}px, ${curs[i].y}px)`;
    });
  }
  // The mouse (or touchpad) moves Player 1's pointer (the first human player); the system arrow is hidden there.
  let mouseOn = false;
  const mouseSlot = () => { const h = slots.findIndex((s) => s.type === 'human'); return h >= 0 ? h : 0; };
  addEventListener('pointermove', (e) => {
    if (screen !== 'select' || e.pointerType === 'touch') return;
    mouseOn = true; $('#select').classList.add('mousecur');
    curs[mouseSlot()] = { x: e.clientX, y: e.clientY };
  });
  addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') { mouseOn = false; $('#select').classList.remove('mousecur'); } });
  function moveCursor(i, dv, inp, press) {
    const c = curs[i]; if (!c) return;
    let dx = inp.x, dy = inp.y;
    if (dv[0] === 'p') { const pad = navigator.getGamepads()[+dv.slice(1)]; if (pad) { const ax = pad.axes[0] || 0, ay = pad.axes[1] || 0; if (Math.hypot(ax, ay) > 0.2) { dx = ax; dy = ay; } } }
    const sp = Math.max(6, innerWidth / 110);
    c.x = Math.max(4, Math.min(innerWidth - 4, c.x + dx * sp)); c.y = Math.max(4, Math.min(innerHeight - 4, c.y + dy * sp));
    const pad = dv[0] === 'p' && navigator.getGamepads()[+dv.slice(1)], a = pad ? !!(pad.buttons[0] && pad.buttons[0].pressed) : false;
    const aPress = a && !menuPrev['a' + dv]; menuPrev['a' + dv] = a;
    if (aPress || press('attack')) pointAndPick(i, c);
  }
  function pointAndPick(i, c) {
    const layer = $('#cursors'); layer.style.display = 'none';
    const el = document.elementFromPoint(c.x, c.y); layer.style.display = '';
    const tile = el && el.closest('#roster [data-f]');
    if (tile) {
      slots[i].fighter = tile.dataset.f === 'random' ? ids[Math.floor(Math.random() * ids.length)] : tile.dataset.f;
      MM.sfx('select'); save('slots', slots); drawSelect();
      const pc = document.querySelector(`[data-cur="${i}"]`); if (pc) { pc.classList.remove('pop'); void pc.offsetWidth; pc.classList.add('pop'); }
      return;
    }
    const btn = el && el.closest('#select button'); if (btn) { activeSlot = i; btn.click(); }
  }

  // ---------- matches ----------
  $('#fight').addEventListener('click', () => {
    const players = slots.map((s, i) => ({ ...s, slot: i })).filter((s) => s.type !== 'off').map((s) => ({ slot: s.slot, fighter: s.fighter, dev: s.dev, cpu: s.type === 'cpu', level: s.level }));
    if (players.length < 2) { alert('You need at least 2 fighters. Set another slot to Player or Computer.'); return; }
    if (teamMode()) {
      players.forEach((p) => { p.team = slots[p.slot].team; });
      const teams = new Set(players.map((p) => p.team));
      if (teams.size < 2) { $('#fight').textContent = 'Put someone on each team'; setTimeout(() => ($('#fight').textContent = 'FIGHT!'), 1800); return; }
    }
    lastSetup = { players, stage: load('stage', MM.STAGES[0].id), stocks: opt.stocks, opts: { teams: teamMode(), ff: opt.ff, time: opt.time } };
    show('arena'); // pick the arena next
  });
  function startMatch() {
    demo = null; MM.muted = false; MM.resetCamera();
    G = MM.newGame(lastSetup.players, lastSetup.stage, lastSetup.stocks, lastSetup.opts || {});
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
    if (e.code === 'Escape' && (screen === 'pause' || (screen === 'match' && G && !G.over))) togglePause();
    else if (e.code === 'Escape' && screen === 'moves') $('#movesBack').click();
    else if (e.code === 'Escape' && screen === 'arena') show('select');
    else if (e.code === 'Escape' && (screen === 'select' || screen === 'howto' || screen === 'family')) show('title');
    else if (e.code === 'Enter' && screen === 'select' && !e.repeat) $('#fight').click();
  });

  function showResults() {
    const st = lastSetup && lastSetup.story;
    $('#vsButtons').hidden = !!st; $('#storyButtons').hidden = !st;
    if (st) return showStoryResult(st);
    const won = (f) => f === G.winner || (G.winTeam && f.team === G.winTeam);
    const fs = [...G.fighters].sort((a, b) => won(b) - won(a) || b.stocks - a.stocks || b.kos - a.kos);
    const wname = G.winTeam ? `Team ${G.winTeam}` : G.winner ? G.winner.def.name : null; // ChatGPT "wins!" word art after the runtime name
    $('#winner').innerHTML = wname ? `<span>${wname}</span> <img class="wins" src="img/ui/word-wins.webp" alt="wins!">` : 'Draw!';
    $('#stats').innerHTML = fs.map((f) => `<div class="stat ${won(f) ? 'win' : ''}" style="border-color:${f.team ? MM.TEAM_COLORS[f.team] : MM.PLAYER_COLORS[f.slot]}">${won(f) ? '<img class="trophy" src="img/ui/title-trophy.webp" alt="">' : ''}
      <img src="${MM.posePicture(f.def, won(f) ? 'win' : 'lose') || portrait(f.def.baseId || f.def.id)}" alt=""><div><b>${f.cpu ? 'CPU' : 'P' + (f.slot + 1)} · ${f.def.name}${f.team ? ' · Team ' + f.team : ''}</b></div>
      <div>KOs: ${f.kos} · Falls: ${f.falls}</div><div>Damage dealt: ${Math.round(f.dealt)}%</div></div>`).join('');
    show('results');
    // a victory/defeat pose whose picture was still loading: swap it in as soon as it arrives
    fs.forEach((f, k) => MM.whenPoseReady(f.def, () => { const img = document.querySelectorAll('#stats .stat > img:not(.trophy)')[k], pic = MM.posePicture(f.def, won(f) ? 'win' : 'lose'); if (img && pic) img.src = pic; }));
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
    projectile: (s) => `throws ${s.thing || s.emoji || 'an energy ball'}${s.count > 1 ? ` ×${s.count}` : ''}${s.boomerang ? ' that comes back' : ''}`,
    shockwave: () => 'sends shockwaves along the ground both ways', dash: (s) => `charges forward${s.armor ? " and can't be stopped by small hits" : ''}`,
    rise: (s) => `launches up${s.parachute ? ' and floats down on a parachute' : ''} (gets back to the stage)`, teleport: () => 'vanishes and reappears (aim it)', slam: () => 'dives down and crashes',
    spin: () => 'spins and hits again and again', counter: () => 'blocks a hit and strikes back (bounces things back too)',
    pack: (s) => s.names && s.names.length === 1 ? `sends ${s.names[0]} out to pounce` : `sends ${s.names ? s.names.join(', ').replace(/, ([^,]*)$/, ' and $1') : 'a pack'} running along the floor`,
    beam: (s) => `fires ${s.thing || 'an energy beam'}`,
    supersaiyan: (s) => `turns Super Saiyan for ${s.dur / 60} s: faster and ${'30'}% stronger. When it wears off he takes +${s.cost}% damage; ${s.cooldown / 60} s before he can do it again`,
    icewave: (s) => `does a retro dance, then sends ${s.thing} along the floor that slows people down`,
    transform: (s) => `spins into the ${s.into} outfit (0.65 s, you can be hit out of it; 2 s cooldown)`,
    heal: (s) => `heals ${s.amount}% damage`, trap: (s) => s.slowOnly ? `leaves ${s.thing}` : `leaves ${s.thing || 'a ' + (s.emoji || 'trap')} on the ground${s.gust ? ' that blasts people away' : ''}`, buff: () => 'powers up: faster and stronger for a while',
  };
  function drawFamily() {
    const bar = (label, v, max) => `<div>${label}<i><b style="width:${Math.min(100, (v / max) * 100)}%"></b></i></div>`;
    const card = (f) => `<div class="card" style="border-color:${f.color}">
      <img src="${portrait(f.id)}" alt=""><h3>${f.name}</h3><small>${f.title || ''}</small>
      <div class="bars">${bar('Speed', f.stats.speed, 9)}${bar('Power', f.stats.power, 1.4)}${bar('Weight', f.stats.weight, 1.4)}</div>
      <ul>${f.attackNames ? `<li><b>Attacks</b>: ${Object.values(f.attackNames).join(', ')}</li>` : ''}${['neutral', 'side', 'up', 'down'].map((k) => { const s = f.specials[k]; return s ? `<li><b>${{ neutral: 'Special', side: '→ Special', up: '↑ Special', down: '↓ Special' }[k]}: ${s.name}</b>: ${(KIND_TEXT[s.kind] || (() => ''))(s)}</li>` : ''; }).join('')}</ul></div>`;
    $('#cards').innerHTML = MM.familyGroups().map((g) => `<h3 class="famhead">${g.name}</h3>${g.fighters.map(card).join('')}`).join(''); // by family, oldest to youngest
  }

  // ---------- arena choice ----------
  function drawArenas() {
    const lastId = load('stage', MM.STAGES[0].id);
    $('#arenaGrid').innerHTML = MM.STAGES.map((s) => `<button data-arena="${s.id}" class="${s.id === lastId ? 'last' : ''}" ${s.id === lastId ? 'data-autofocus' : ''}><img src="${MM.stageThumb ? MM.stageThumb(s.id) : ''}" alt=""><span>${s.name}${s.custom ? '<small>Made in Arena Maker</small>' : ''}</span></button>`).join('')
      + `<button data-arena="random" class="own"><img src="img/ui/arena-random.webp" alt=""><span>Random arena</span></button>`
      + `<button data-go="maker" class="own"><img src="img/ui/arena-make.webp" alt=""><span>Make your own<small>Arena Maker</small></span></button>`;
  }
  $('#arenaGrid').addEventListener('click', (e) => {
    const b = e.target.closest('[data-arena]'); if (!b || !lastSetup) return;
    let id = b.dataset.arena;
    if (id === 'random') id = MM.STAGES[Math.floor(Math.random() * MM.STAGES.length)].id; else save('stage', id);
    lastSetup.stage = id; MM.sfx('go'); startMatch();
  });
  $('#arenaBack').addEventListener('click', () => show('select'));

  // ---------- story mode ----------
  let storyHero = null;
  const S = MM.story;
  const pic = (id) => (S.has(id) ? `<img src="${portrait(S.ID(id))}" alt="">` : `<div class="mini">?</div>`);
  function drawStory() {
    const body = $('#storyBody');
    if (!storyHero) {
      $('#storyTitle').textContent = 'Pick your hero';
      body.innerHTML = `<p class="seed">Fight your way through the whole family, beat <b>Jeff, The Boss</b>… and find out who's really in charge. More fights unlock as more family members are added to the game.</p>
        <div class="heroes">${S.HEROES.map((h) => {
          const ok = S.has(h), s = S.load(h);
          return `<button data-hero="${h}" class="${ok ? '' : 'locked'}" ${ok ? '' : 'disabled'}>${ok ? `<img src="${portrait(h)}" alt="">` : '<div class="sil">?</div>'}${S.NAMES[h]}<small>${ok ? (s.ended ? '★ Finished' : s.done.length ? `${s.done.length} wins` : 'Start') : 'Coming soon'}</small></button>`;
        }).join('')}</div>`;
      return;
    }
    const s = S.load(storyHero), r = S.route(storyHero), next = S.nextNode(storyHero);
    $('#storyTitle').textContent = `${S.NAMES[storyHero]}'s story`;
    const waiting = r.filter((n) => S.nodeState(n, s) === 'waiting').length;
    body.innerHTML = `<p class="seed">${S.SEEDS[storyHero]}</p>
      <div class="row options" style="justify-content:flex-start">
        <button class="big" id="storyGo" ${next ? '' : 'disabled'}>${next ? (s.done.length ? '▶ Next fight' : '▶ Start') : s.ended ? '★ Finished!' : 'More fights coming soon'}</button>
        <button class="cycle" id="storyLevel">Difficulty: <b>${{ 1: 'Easy', 2: 'Normal', 3: 'Hard' }[s.level]}</b></button>
        ${s.revealed ? '<button id="storyReveal">Replay the reveal</button>' : ''}
        ${s.ended ? '<button id="storyEnding">Family album</button>' : ''}
        <button id="storyReset">Start over</button>
      </div>
      ${storyMap(r, s, next)}
      ${waiting ? `<p class="keys">${waiting} fight${waiting > 1 ? 's are' : ' is'} waiting for family members who aren't in the game yet. For now they're skipped; they unlock by themselves when those fighters are added.</p>` : ''}
      <div class="routemap">${r.map((n, i) => {
        const state = S.nodeState(n, s), isNext = next && n.id === next.id;
        const label = n.boss === 'secret' ? (state === 'hidden' ? '???' : 'The REAL final boss') : n.boss ? 'The Boss' : n.opponents.length > 1 ? 'Free-for-all' : 'One on one';
        const who = state === 'hidden' ? '<div class="mini">?</div>' : n.opponents.map(pic).join('');
        const names = state === 'hidden' ? 'Someone is waiting…' : n.opponents.map((o) => S.NAMES[o] + (S.has(o) ? '' : ' (coming soon)')).join(', ');
        const tag = state === 'done' ? '✓ Won' : isNext ? 'Next' : state === 'waiting' ? 'Coming soon' : state === 'hidden' ? 'Locked' : '';
        return `<div class="node ${state} ${isNext ? 'next' : ''}"><div class="num">${n.boss ? '★' : i + 1}</div><div class="opp">${who}</div><div class="what"><b>${label}</b><span>${names}</span></div>${tag ? `<div class="tag">${tag}</div>` : ''}</div>`;
      }).join('')}</div>`;
    $('#storyLevel').onclick = () => { const s2 = S.load(storyHero); s2.level = (s2.level % 3) + 1; S.save(storyHero, s2); MM.sfx('select'); drawStory(); };
    $('#storyGo').onclick = () => next && startStoryFight(storyHero, next);
    $('#storyReset').onclick = () => { const s2 = S.load(storyHero); if ($('#storyReset').dataset.sure) { S.save(storyHero, { v: 1, done: [], jeff: false, revealed: false, ended: false, level: s2.level }); drawStory(); } else { $('#storyReset').dataset.sure = 1; $('#storyReset').textContent = 'Tap again to erase this hero\'s progress'; } };
    if ($('#storyReveal')) $('#storyReveal').onclick = () => playScene(revealScene(), () => show('story'));
    if ($('#storyEnding')) $('#storyEnding').onclick = () => playScene(endingScene(storyHero), () => show('story'));
  }
  $('#storyBody').addEventListener('click', (e) => { const b = e.target.closest('[data-hero]'); if (b && !b.disabled) { storyHero = b.dataset.hero; MM.sfx('select'); drawStory(); } });
  $('#storyBack').addEventListener('click', () => { if (storyHero) { storyHero = null; drawStory(); } else show('title'); });

  // ChatGPT's story map: 8 stops. The family fights are grouped into 6 chapters, then Jeff (stop 7) and the
  // secret Patty fight (stop 8, a lock until the reveal). The full fight list stays below the map.
  const MAP_STOPS = [[0.144, 0.91], [0.287, 0.801], [0.424, 0.706], [0.583, 0.622], [0.404, 0.51], [0.459, 0.335], [0.668, 0.263], [0.895, 0.225]];
  function storyMap(r, s, next) {
    const fights = r.filter((n) => !n.boss), chapters = [[], [], [], [], [], [], [], []];
    fights.forEach((n, i) => chapters[Math.min(5, Math.floor((i * 6) / Math.max(1, fights.length)))].push(n));
    for (const n of r) if (n.boss === 'apparent') chapters[6].push(n); else if (n.boss === 'secret') chapters[7].push(n);
    return `<div class="smap"><img src="img/ui/story-map.webp" alt="Story map">${chapters.map((ch, i) => {
      const states = ch.map((n) => S.nodeState(n, s)), hasNext = next && ch.some((n) => n.id === next.id);
      const allDone = ch.length && states.every((st) => st === 'done' || st === 'waiting') && states.includes('done');
      const st = i === 7 && !states.includes('done') && states.every((x) => x === 'hidden') ? 'locked' : allDone ? 'cleared' : hasNext ? 'open' : i === 7 ? 'boss-patty' : 'locked';
      const title = i === 7 ? (st === 'locked' ? '???' : 'The real final boss') : i === 6 ? 'The Boss' : `Chapter ${i + 1}`;
      return `<div class="stop ${st} ${hasNext ? 'next' : ''}" style="left:${MAP_STOPS[i][0] * 100}%;top:${MAP_STOPS[i][1] * 100}%" title="${title}"><img src="img/ui/map-stop-${st}.png" alt="${title}"><span>${i < 6 ? i + 1 : i === 6 ? 'Jeff' : st === 'locked' ? '?' : 'Mawmaw'}</span></div>`;
    }).join('')}</div>`;
  }
  function startStoryFight(hero, node) {
    const s = S.load(hero), p1 = slots[0];
    const dev = p1.type === 'human' ? p1.dev : MM.isTouch ? 'touch' : 'k1';
    const opp = node.opponents.map(S.ID);
    const players = [{ slot: 0, fighter: hero, dev, cpu: false, stocks: 3 }].concat(opp.map((id, i) => ({ slot: i + 1, fighter: id, cpu: true, level: node.boss ? Math.max(2, s.level + (node.boss === 'secret' ? 1 : 0)) : s.level, boss: node.boss || null, stocks: node.boss ? 3 : 2 })));
    lastSetup = { players, stage: S.stageFor(node.place, S.route(hero).findIndex((n) => n.id === node.id)), stocks: 2, opts: { heroSlot: 0 }, story: { hero, node: node.id } };
    startMatch();
  }
  function showStoryResult(st) {
    const won = G.winner && G.winner.slot === 0;
    const r = S.route(st.hero), node = r.find((n) => n.id === st.node);
    $('#winner').textContent = won ? (node.boss === 'secret' ? 'You beat Mawmaw!' : node.boss ? 'You beat The Boss!' : 'You won!') : 'Knocked out!';
    $('#stats').innerHTML = G.fighters.map((f) => `<div class="stat ${f.slot === 0 && won ? 'win' : ''}"><img src="${MM.posePicture(f.def, (f.slot === 0) === won ? 'win' : 'lose') || portrait(f.def.baseId || f.def.id)}" alt=""><div><b>${f.def.name}</b></div><div>KOs: ${f.kos} · Falls: ${f.falls}</div></div>`).join('');
    const s = S.load(st.hero);
    if (won && !s.done.includes(node.id)) { s.done.push(node.id); if (node.boss === 'apparent') s.jeff = true; if (node.boss === 'secret') s.ended = true; S.save(st.hero, s); }
    $('#storyContinue').hidden = !won; $('#storyRetry').hidden = won;
    $('#storyContinue').onclick = () => {
      if (node.boss === 'apparent') { const s2 = S.load(st.hero); s2.revealed = true; S.save(st.hero, s2); playScene(revealScene(), () => { storyHero = st.hero; show('story'); }); }
      else if (node.boss === 'secret') playScene(endingScene(st.hero), () => { storyHero = st.hero; show('story'); });
      else { const nx = S.nextNode(st.hero); if (nx) startStoryFight(st.hero, nx); else { storyHero = st.hero; show('story'); } }
    };
    $('#storyRetry').onclick = () => startMatch();
    $('#storyMap').onclick = () => { storyHero = st.hero; show('story'); };
    show('results');
  }
  // scenes: a list of pages; each page is HTML. Next goes forward, Skip ends.
  let scenePages = [], sceneDone = null, scenePage = 0;
  function playScene(pages, done) { scenePages = pages; sceneDone = done; scenePage = 0; drawScene(); show('scene'); }
  function drawScene() { $('#sceneBody').innerHTML = scenePages[scenePage]; $('#sceneNext').textContent = scenePage < scenePages.length - 1 ? 'Next' : 'Continue'; }
  $('#sceneNext').addEventListener('click', () => { MM.sfx('select'); if (++scenePage < scenePages.length) drawScene(); else sceneDone && sceneDone(); });
  $('#sceneSkip').addEventListener('click', () => sceneDone && sceneDone());
  const line = (id, who, text) => `<div class="line"><img src="${portrait(id)}" alt=""><div class="say"><b>${who}</b>${text}</div></div>`;
  function revealScene() { // fictional lines from ChatGPT's handoff, not real family quotes
    return [
      line('jeffery', 'Jeff', '"You think I\'m the boss? Go ask your mother."'),
      line('jeffery', 'Jeff', '"You think I\'m the boss? Go ask your mother."') + line('patty', 'Patty', '"Who do you think raised the boss?"'),
      `<h2 style="text-align:center;font-size:2.4em;color:#ffc21a">The REAL final boss:<br>Patty Morris!</h2>`,
    ];
  }
  function endingScene(hero) {
    const fam = MM.FIGHTERS.filter((d) => d.photo).map((d) => `<img src="${portrait(d.id)}" alt="">`).join('');
    return [
      line('patty', 'Patty', '"Alright, alright. Everybody get in here for a picture."'),
      `<div class="album"><h3>Family Album: ${S.NAMES[hero]}</h3><p>${S.SEEDS[hero]} After all that, the whole Morris family ended up in the same place: together.</p><div class="pics">${fam}</div><p><b>New title unlocked:</b> ${S.NAMES[hero].split(' ')[0]}, Keeper of the Family</p></div>`,
      `<h2 style="text-align:center">Thanks for playing Morris Mayhem!</h2><p style="text-align:center">Made for the Morris family. Try another hero's story, or play again on Hard.</p>`,
    ];
  }

  // ---------- move list ----------
  let moveId = null;
  const moveFighters = () => (paused && G ? [...new Map(G.fighters.map((f) => [f.def.baseId || f.def.id, MM.FIGHTERS.find((d) => d.id === (f.def.baseId || f.def.id))])).values()] : MM.FIGHTERS);
  const KEYS = '<b>Attack</b> F · Num 1 · X &nbsp; <b>Special</b> G · Num 2 · B &nbsp; <b>Jump</b> W/Space · ↑ · A &nbsp; <b>Dodge</b> H · Num 3 · bumpers &nbsp; <b>Switch form</b> R · Num 4 · Y &nbsp; <b>Ultimate</b> E · Num 5 · stick click &nbsp; <b>Taunt</b> Q · Num 6/O · Back/Select';
  // ChatGPT direction + move icons in the Move List, with the words kept beside them
  const icon = (f, alt) => `<img class="mvi" src="img/ui/${f}.png" alt="${alt}">`;
  function press(dir, act, words) {
    const d = dir === 'jump' ? icon('move-jump', 'in the air') : icon('direction-' + dir, dir === 'neutral' ? '' : dir);
    return `<span class="mvp">${d}<i>+</i>${icon('move-' + act, act)}</span><span class="mvw">${words}</span>`;
  }
  // controller buttons drawn from ChatGPT's blank caps with the letter on top
  const cap = (f, t) => `<span class="cap" style="background-image:url(img/ui/${f}.png)">${t}</span>`;
  const PADKEYS = `<div class="padkeys"><span>${icon('move-attack', '')}<b>Attack</b>${cap('input-face-x', 'X')}</span><span>${icon('move-special', '')}<b>Special</b>${cap('input-face-b', 'B')}</span>`
    + `<span>${icon('move-jump', '')}<b>Jump</b>${cap('input-face-a', 'A')}</span><span>${icon('move-dodge', '')}<b>Dodge</b>${cap('input-lb', 'LB')}${cap('input-rb', 'RB')}</span>`
    + `<span>${icon('move-swap', '')}<b>Switch form</b>${cap('input-face-y', 'Y')}</span><span>${icon('move-ultimate', '')}<b>Ultimate</b><img class="mvi" src="img/ui/input-stick-click.png" alt="stick click"></span>`
    + `<span>${icon('move-taunt', '')}<b>Taunt</b><img class="mvi" src="img/ui/input-back.png" alt="Back"></span><span><img class="mvi" src="img/ui/input-left-stick.png" alt=""><b>Move</b><img class="mvi" src="img/ui/dpad.png" alt="D-pad"></span></div>`;
  function moveRows(d) {
    const an = d.attackNames || {}, sp = d.specials || {};
    const desc = (s) => (s ? `<b>${s.name}</b>: ${(KIND_TEXT[s.kind] || (() => ''))(s)}` : '');
    const rows = [
      [press('neutral', 'attack', 'Attack'), an.jab || 'Quick hit', 'Fast hit up close'],
      [press('side', 'attack', 'Side Attack'), an.side || 'Side attack', 'Strong hit forward. Great for knocking people off'],
      [press('up', 'attack', 'Up Attack'), an.up || 'Up attack', 'Hits above you. Launches people up'],
      [press('down', 'attack', 'Down Attack'), an.down || 'Low attack', 'Low hit along the floor'],
      [press('jump', 'attack', 'In the air'), an.air || 'Air attacks', 'Hold a direction for forward, up and down (spike) versions'],
      [press('neutral', 'special', 'Special'), '', desc(sp.neutral)], [press('side', 'special', 'Side Special'), '', desc(sp.side)],
      [press('up', 'special', 'Up Special'), '', desc(sp.up) + ' <i>Use it to get back to the stage.</i>'], [press('down', 'special', 'Down Special'), '', desc(sp.down)],
    ];
    return `<table><tr><th>Press</th><th>Move</th><th>What it does</th></tr>${rows.map((r) => `<tr><td class="in">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table>`;
  }
  function drawMoves() {
    const list = moveFighters();
    if (!list.some((d) => d.id === moveId)) moveId = list[0].id;
    $('#movePicks').innerHTML = list.map((d) => `<button data-mv="${d.id}" class="${d.id === moveId ? 'on' : ''}"><img src="${portrait(d.id)}" alt="">${d.name}</button>`).join('');
    const d = list.find((x) => x.id === moveId);
    let html = `<div class="who"><img src="${portrait(d.id)}" alt=""><div><h3>${d.name}</h3><p>${d.title || ''}</p></div></div>`;
    if (d.forms && d.forms[0].specials.down.kind === 'supersaiyan') {
      html += `<div class="note"><b>Super Saiyan!</b> ↓ + Special powers him up for 8 seconds: golden hair, faster and stronger. When it wears off he's worn out and takes +25% damage, and he has to wait 15 seconds to do it again.</div>`;
      for (const fd of MM.formDefs(d)) html += `<h4>${fd.title}</h4>` + moveRows(fd);
    } else if (d.mess) {
      html += `<div class="note"><b>Mess Meter!</b> His landscaping moves cover him in grass and mud and fill the brown Mess Meter (+4 per move, +6 more when it lands). When it's full, press <b>Switch form</b> (R · Num 4 · controller Y · ⇄ on touch) to clean up into the <b>Clean Freak</b> for 12 seconds: cleaning tools, 10% more power and 8% more speed. A hit while he's cleaning up stops it, but he keeps the full meter. After 12 seconds he goes back to work with an empty meter.</div>`;
      for (const fd of MM.formDefs(d)) html += `<h4>${fd.title}</h4>` + moveRows(fd);
    } else if (d.forms) {
      html += `<div class="note"><b>Two forms!</b> Press <b>↓ + Special</b> or <b>Switch form</b> (R · Num 4 · controller Y · ⇄ on touch) for Wardrobe Whirl, which changes between ${MM.formDefs(d).map((f) => f.title.replace(' outfit', '')).join(' and ')} at any time. Each outfit has its own moves, speed and power. The spin takes a moment and a hit stops it, so pick your moment.</div>`;
      for (const fd of MM.formDefs(d)) html += `<h4>${fd.title}</h4>` + moveRows(fd);
    } else html += moveRows(d);
    const ults = d.forms ? MM.formDefs(d).map((fd) => fd.ultimate).filter(Boolean) : [d.ultimate].filter(Boolean);
    if (ults.length) html += `<h4>Ultimate</h4><table>${ults.map((u) => `<tr><td class="in">Meter full + E · Num 5/U · stick click · or Attack + Special together</td><td><b>${u.name}</b>: ${u.desc || ''}</td></tr>`).join('')}</table><p class="keys">The meter fills as you deal damage (and a little when you take it). A hit stops an ultimate, so pick your moment.</p>`;
    html += `<h4>Everyone</h4><table><tr><td class="in">Jump</td><td>Up to 3 jumps in a row</td></tr><tr><td class="in">Dodge</td><td>Untouchable for a moment. Hold a direction to roll or air-dodge.</td></tr><tr><td class="in">↓ in the air</td><td>Fall fast</td></tr><tr><td class="in">↓ on a platform</td><td>Drop through it</td></tr><tr><td class="in">Taunt (Q · Num 6/O · Back/Select)</td><td>Show off on the ground. Any hit stops it!${d.taunt ? ` <i>"${d.taunt}"</i>` : ''}</td></tr></table>`;
    html += `<h4>Controller</h4>${PADKEYS}<p class="keys">${KEYS}</p>`;
    $('#moveSheet').innerHTML = html;
  }
  $('#movePicks').addEventListener('click', (e) => { const b = e.target.closest('[data-mv]'); if (b) { moveId = b.dataset.mv; MM.sfx('select'); drawMoves(); } });
  $('#movesBack').addEventListener('click', () => { if (paused && G) { show('pause'); screen = 'pause'; } else show('title'); });
  $('#pauseMoves').addEventListener('click', () => { const me = G && G.fighters.find((f) => !f.cpu); moveId = me ? me.def.baseId || me.def.id : null; show('moves'); });

  // ---------- main loop ----------
  let last = performance.now(), acc = 0;
  const STEP = 1000 / 60;
  function frame(now) {
    acc += Math.min(100, now - last); last = now;
    pollMenuInput();
    if (screen === 'select' || $('#cursors').childElementCount) syncCursors();
    MM.menuNavTick(screen === 'match' && !!G && !paused);
    const world = G || demo;
    if (world) {
      const slow = world.slowmo > 0 ? 3 : 1;
      // a new match holds on its first frame until the match screen is up and its art has loaded (max 10 s),
      // so every game starts with the entrances and the 3-2-1
      if (world === G && G.frame === 0) {
        G.waitStart = G.waitStart || now;
        if (screen !== 'match' || (!MM.artReady(G) && now - G.waitStart < 10000)) acc = 0;
      }
      while (acc >= STEP * slow) {
        acc -= STEP * slow;
        if (world === G && paused) continue;
        MM.muted = world === demo;
        if (world.slowmo > 0) world.slowmo--;
        MM.step(world);
        if (world === demo && demo.over) { demo = null; startDemo(); break; }
      }
      if (world === G && G.over && G.endT <= 0 && screen === 'match') showResults();
      if (world === G && screen === 'match') { // touch: glowing Ultimate button when full; Switch only for fighters who can switch
        const tf = G.fighters.find((f) => f.dev === 'touch' && !f.cpu);
        if (tf) { $('#touch .tult').classList.toggle('ready', tf.meter >= 100); $('#touch .tswap').hidden = !(tf.forms || tf.def.mess); }
      }
      MM.render(g, world, W, H);
      if (world === G && G.frame === 0) { g.save(); g.fillStyle = 'rgba(10,8,25,.6)'; g.fillRect(0, 0, W, H); g.fillStyle = '#ffc21a'; g.font = '900 42px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('Loading…', W / 2, H / 2); g.restore(); }
      if (world === demo) { g.fillStyle = 'rgba(10,8,25,.55)'; g.fillRect(0, 0, W, H); }
    }
    requestAnimationFrame(frame);
  }
  const origSfx = MM.sfx; MM.sfx = (...a) => { if (!MM.muted) origSfx(...a); };
  requestAnimationFrame(frame);
  MM.debug = { get G() { return G; }, slots, startMatch: (setup) => { lastSetup = setup; startMatch(); } };
})();
