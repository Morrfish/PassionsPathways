// Wild Tag: title screen, shop pages, HUD.
'use strict';

const $ = (id) => document.getElementById(id);
const GEM = '<img src="ui/icon-gems.png" alt="gems">';
const MODE_IMG = { infection: 'ui/mode-infection.png', classic: 'ui/mode-classic.png', freeze: 'ui/mode-freeze.png' };
const PAGES = {
  solo: { title: 'Play Solo', fn: 'paneSolo', preview: false },
  host: { title: 'Host a Game', fn: 'paneHost', preview: false },
  join: { title: 'Join a Game', fn: 'paneJoin', preview: false },
  animals: { title: 'Animals', fn: 'paneAnimals', preview: true },
  wardrobe: { title: 'Patterns & Colors', fn: 'panePatterns', preview: true },
  wear: { title: 'Wearables', fn: 'paneWear', preview: true },
  perks: { title: 'Bonus Abilities', fn: 'panePerks', preview: true },
  how: { title: 'How to Play', fn: 'paneHow', preview: false },
  settings: { title: 'Settings', fn: 'paneSettings', preview: false },
};

const UI = {
  page: null, viewAnimal: null, flashT: 0, netStatus: '', netErr: false,

  init() {
    if (isTouch()) document.body.classList.add('touch');
    $('nameIn').value = Save.name;
    $('nameIn').addEventListener('change', () => { Save.name = ($('nameIn').value.trim() || 'Player').slice(0, 16); persist(); const c = local(); if (c) { c.name = Save.name; c.setAnimal(c.animal, c.look); } refreshLocalLook(); });
    document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => UI.go(b.dataset.go)));
    $('sheetClose').onclick = () => UI.go(null);
    $('resumeBtn').onclick = () => UI.closeMenu();
    $('menuBtn').addEventListener('click', () => UI.openMenu());
    $('hostStart').addEventListener('click', () => { if (Net.isHost && G.phase === 'lobby') startRound(); });
    addEventListener('keydown', e => {
      if (e.code !== 'Escape' || $('menu').classList.contains('hide')) return;
      if (UI.page) UI.go(null); else if (G.started) UI.closeMenu();
    });
    Net.onStatus = (s, err) => { UI.netStatus = err || { connecting: 'Connecting…', hosting: 'Room is open!', joined: 'Joined the room!', offline: '' }[s] || ''; UI.netErr = s === 'error'; if (UI.page === 'host' || UI.page === 'join') UI.render(); };
    const today = new Date().toISOString().slice(0, 10);
    if (Save.lastDaily !== today) { Save.lastDaily = today; Save.gems += REWARDS.daily; persist(); setTimeout(() => toast(`🎁 Daily bonus: +${REWARDS.daily} gems!`), 900); }
    Preview.init();
    if (TEST_MODE) setTimeout(() => toast('🧪 Test mode: everything unlocked, nothing is saved'), 1500);
    // title screen: a few animals roam around while you pick
    if (!Net.online) { clearBots(); addBots(6); G.demo = true; titleSpot(); }
    $('loading').classList.add('hide');
    UI.openMenu();
  },

  go(page) { UI.page = page; UI.viewAnimal = null; UI.render(); },

  openMenu() {
    G.paused = true; $('menu').classList.remove('hide'); $('hud').classList.add('hide'); document.body.classList.remove('playing');
    if (document.pointerLockElement) document.exitPointerLock();
    UI.render();
  },
  closeMenu() {
    G.paused = false; G.started = true; G.demo = false; UI.page = null;
    $('menu').classList.add('hide'); $('hud').classList.remove('hide'); document.body.classList.add('playing');
    const cv = renderer.domElement; if (!isTouch() && cv.requestPointerLock) { try { cv.requestPointerLock(); } catch (e) { } }
    refreshLocalLook();
  },
  menuOpen() { return !$('menu').classList.contains('hide'); },

  render() {
    document.querySelectorAll('.tile').forEach(b => b.classList.toggle('on', b.dataset.go === UI.page));
    $('mGems').querySelector('span').textContent = Save.gems;
    const inGame = G.started && (Net.online || G.phase !== 'lobby');
    $('resumeBtn').classList.toggle('hide', !inGame);
    const sheet = $('sheet');
    if (!UI.page) { sheet.classList.add('hide'); return; }
    const pg = PAGES[UI.page];
    sheet.classList.remove('hide');
    $('sheetTitle').textContent = pg.title;
    $('pside').classList.toggle('hide', !pg.preview);
    const p = $('pane'); p.innerHTML = ''; UI[pg.fn](p);
    if (pg.preview) { UI.sideInfo(); Preview.show(UI.viewAnimal || Save.sel.animal); }
  },

  sideInfo() {
    const a = CREATURE[UI.viewAnimal || Save.sel.animal];
    const bar = (label, v, max) => `<div class="stat"><span style="width:50px">${label}</span><div class="b"><i style="width:${Math.min(100, v / max * 100)}%"></i></div></div>`;
    const perks = Save.sel.perks.map(id => PERK[id].emoji + ' ' + PERK[id].name).join(', ') || 'none';
    $('selinfo').innerHTML = `<h3>${a.emoji} ${a.name}${a.mythic ? ' <span style="color:#a03a6a;font-size:13px">MYTHICAL</span>' : ''}</h3>
      <div style="font-weight:700;color:#b5651d">✨ ${a.ab.name}</div><div style="font-size:13px;margin-bottom:6px">${a.ab.desc} <i>(${a.ab.cd}s)</i></div>
      ${bar('Speed', a.spd - 6, 5.5)}${bar('Jump', a.jmp - 7, 6.5)}${bar('Climb', a.climb, 2.2)}${bar('Size', a.size, 1.4)}
      <div style="font-size:12px;margin-top:6px">Bonus abilities: ${perks}</div>
      <div style="font-size:12px">🏆 ${Save.stats.wins} wins · 👉 ${Save.stats.tags} tags · 🎮 ${Save.stats.rounds} rounds</div>`;
  },

  modePicker() {
    return `<div class="modes">${Object.entries(MODES).map(([id, m]) => `<button class="mode ${Save.settings.mode === id ? 'sel' : ''}" data-mode="${id}"><img src="${MODE_IMG[id]}" alt="${m.name}"><p>${m.desc}</p></button>`).join('')}</div>`;
  },
  hookModes(p) { p.querySelectorAll('.mode').forEach(el => el.onclick = () => { Save.settings.mode = el.dataset.mode; persist(); UI.render(); }); },

  // ---------- PLAY ----------
  paneSolo(p) {
    const s = Save.settings;
    p.innerHTML = `<h2 class="sec">Pick a mode</h2>${UI.modePicker()}
      <h2 class="sec">Bots</h2>
      <div class="row"><label>How many <select id="botsSel">${[3, 5, 7, 9, 11, 15].map(n => `<option ${n === s.bots ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label>Skill <select id="diffSel">${['easy', 'normal', 'hard'].map(n => `<option ${n === s.diff ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div>
      <div class="row" style="margin-top:16px"><button class="btn green big" id="startSolo">▶ START</button>
      ${Net.online ? '<span class="status">This leaves your online room.</span>' : ''}</div>`;
    UI.hookModes(p);
    $('botsSel').onchange = e => { s.bots = +e.target.value; persist(); };
    $('diffSel').onchange = e => { s.diff = e.target.value; persist(); };
    $('startSolo').onclick = () => { startSolo(); UI.closeMenu(); };
  },
  paneHost(p) {
    const s = Save.settings;
    if (Net.online && Net.isHost) {
      p.innerHTML = `<div class="box" style="text-align:center"><div style="font-weight:600">Your room code</div><div class="code">${Net.code}</div>
        <div class="status">Friends open Wild Tag, press <b>Join Game</b> and type this code. ${Net.count()} friend(s) connected.</div></div>
        <h2 class="sec">Mode</h2>${UI.modePicker()}
        <div class="row"><label>Bots in the room <select id="rbots">${[0, 2, 4, 6, 8].map(n => `<option ${n === s.roomBots ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div>
        <div class="row"><button class="btn green big" id="goRoom">▶ GO TO ROOM</button><button class="btn alt" id="leave">Close room</button></div>
        <div class="status">In the room, press <b>Start Round</b> when everyone is in.</div>`;
      UI.hookModes(p);
      $('rbots').onchange = e => { s.roomBots = +e.target.value; persist(); clearBots(); addBots(s.roomBots); broadcastRoster(); };
      $('goRoom').onclick = () => UI.closeMenu();
      $('leave').onclick = () => { leaveRoom(); UI.render(); };
      return;
    }
    p.innerHTML = `<h2 class="sec">Pick a mode</h2>${UI.modePicker()}
      <div class="row" style="margin-top:14px"><button class="btn big" id="host">🏠 OPEN A ROOM</button></div>
      <div class="status ${UI.netErr ? 'err' : ''}">${UI.netStatus || 'You get a code to share. Friends on other computers join with it. Needs internet.'}</div>`;
    UI.hookModes(p);
    $('host').onclick = () => { UI.netStatus = 'Connecting…'; UI.netErr = false; UI.render(); G.demo = false; hostRoom(() => { UI.netStatus = ''; UI.render(); }); };
  },
  paneJoin(p) {
    if (Net.online && !Net.isHost) {
      p.innerHTML = `<div class="box" style="text-align:center">In room <div class="code">${Net.code}</div><div class="status">The host starts each round.</div></div>
        <div class="row"><button class="btn green big" id="goRoom">▶ GO TO ROOM</button><button class="btn alt" id="leave">Leave room</button></div>`;
      $('goRoom').onclick = () => UI.closeMenu();
      $('leave').onclick = () => { leaveRoom(); UI.render(); };
      return;
    }
    p.innerHTML = `<h2 class="sec">Type the room code</h2>
      <div class="row"><input type="text" id="code" placeholder="CODE" maxlength="5" style="width:200px;font-size:30px;text-transform:uppercase;letter-spacing:6px;text-align:center">
      <button class="btn green big" id="join">JOIN</button></div>
      <div class="status ${UI.netErr ? 'err' : ''}">${UI.netStatus || 'Ask the host for their 5-letter code.'}</div>`;
    $('code').focus();
    const go = () => { const c = $('code').value.trim(); if (c.length < 5) { UI.netStatus = 'Type all 5 letters of the code.'; UI.netErr = true; UI.render(); return; } UI.netStatus = 'Connecting…'; UI.netErr = false; G.demo = false; joinRoom(c, () => UI.closeMenu()); };
    $('join').onclick = go; $('code').onkeydown = e => { if (e.key === 'Enter') go(); };
  },
  paneSettings(p) {
    const s = Save.settings;
    p.innerHTML = `<div class="row"><label>Look speed (mouse / touch) <input type="range" id="sens" min="0.3" max="2.5" step="0.1" value="${s.sens}"></label></div>
      <div class="row"><label><input type="checkbox" id="snd" ${s.sound ? 'checked' : ''}> Sound</label></div>
      <div class="status">Your gems and unlocks are saved in this browser.</div>`;
    $('sens').oninput = e => { s.sens = +e.target.value; persist(); };
    $('snd').onchange = e => { s.sound = e.target.checked; persist(); };
  },

  // ---------- ANIMALS ----------
  paneAnimals(p) {
    const card = (a) => {
      const owned = Save.owned.animals.includes(a.id), sel = Save.sel.animal === a.id, view = UI.viewAnimal === a.id;
      const reqOk = UI.reqMet(a);
      return `<div class="card ${sel || view ? 'sel' : ''} ${owned ? '' : 'locked'} ${a.mythic ? 'mythic' : ''}" data-a="${a.id}">
        ${hasModel(a.id) ? '<span class="b3d">3D</span>' : ''}<div class="em">${owned || !a.mythic || reqOk ? a.emoji : '🔒'}</div><div class="nm">${a.name}</div>
        <div class="ab">✨ ${a.ab.name}</div>
        ${owned ? `<div class="own">${sel ? '✔ PLAYING' : 'OWNED'}</div>` : `<div class="pr">${GEM}${a.price}</div>${a.mythic ? `<div class="req">${UI.reqText(a)}</div>` : ''}`}
      </div>`;
    };
    p.innerHTML = `<h2 class="sec">Animals <small>(${ANIMALS.length}) tap to look, tap again to play or unlock</small></h2>
      <div class="grid">${ANIMALS.map(card).join('')}</div>
      <h2 class="sec">✨ Mythical Creatures <small>(${MYTHICS.length}) reach the goal, then unlock with gems</small></h2>
      <div class="grid">${MYTHICS.map(card).join('')}</div>`;
    p.querySelectorAll('.card').forEach(el => el.onclick = () => {
      const a = CREATURE[el.dataset.a];
      if (UI.viewAnimal !== a.id && Save.sel.animal !== a.id) { UI.viewAnimal = a.id; UI.render(); return; }
      UI.choose(a);
    });
    if (UI.viewAnimal) UI.showBuyBar(CREATURE[UI.viewAnimal]);
  },
  showBuyBar(a) {
    const owned = Save.owned.animals.includes(a.id);
    const box = document.createElement('div'); box.className = 'box';
    box.style.cssText = 'position:sticky;bottom:0;display:flex;gap:12px;align-items:center;flex-wrap:wrap';
    const can = Save.gems >= a.price && UI.reqMet(a);
    box.innerHTML = owned ? `<b style="font-size:20px">${a.emoji} ${a.name}</b><button class="btn green" id="pick">Play as ${a.name}</button>`
      : `<b style="font-size:20px">${a.emoji} ${a.name}</b> <span class="card" style="padding:2px 10px;cursor:default"><span class="pr">${GEM}${a.price}</span></span> ${a.mythic ? `<span class="req" style="color:#a03a6a;font-weight:600">${UI.reqText(a)}</span>` : ''}
         <button class="btn" id="pick" ${can ? '' : 'disabled'}>${can ? 'Unlock' : !UI.reqMet(a) ? 'Goal not reached' : 'Not enough gems'}</button>`;
    $('pane').appendChild(box);
    $('pick').onclick = () => UI.choose(a);
  },
  choose(a) {
    if (!Save.owned.animals.includes(a.id)) {
      if (Save.gems < a.price || !UI.reqMet(a)) return;
      Save.gems -= a.price; Save.owned.animals.push(a.id); beep('buy'); toast(`Unlocked ${a.emoji} ${a.name}!`);
    }
    Save.sel.animal = a.id; UI.viewAnimal = null; persist(); refreshLocalLook(); UI.render();
  },
  reqMet(a) { if (!a.need) return true; return Object.entries(a.need).every(([k, v]) => (Save.stats[k] || 0) >= v); },
  reqText(a) {
    if (!a.need) return '';
    const [k, v] = Object.entries(a.need)[0], have = Math.min(v, Save.stats[k] || 0);
    return `${UI.reqMet(a) ? '✔' : '🎯'} ${{ wins: 'Win', tags: 'Tag', rounds: 'Play' }[k]} ${v} ${k === 'rounds' ? 'rounds' : k} (${have}/${v})`;
  },
  buy(item, list) {
    if (Save.gems < item.price) { toast('Not enough gems. Win some rounds!'); return false; }
    Save.gems -= item.price; list.push(item.id); beep('buy'); toast('Bought ' + item.name + '!'); return true;
  },

  // ---------- PATTERNS & COLORS ----------
  panePatterns(p) {
    const aid = Save.sel.animal, a = CREATURE[aid], look = myLook(aid);
    p.innerHTML = `<h2 class="sec">Colors for your ${a.name}</h2>
      <div class="row"><b style="width:80px">Main</b><div class="colors" id="c1"></div></div>
      <div class="row"><b style="width:80px">Accent</b><div class="colors" id="c2"></div></div>
      <div class="row"><button class="btn alt" id="resetC">Back to ${a.name} colors</button></div>
      <h2 class="sec">Patterns</h2><div class="grid" id="pats"></div>`;
    const sw = (el, key) => { el.innerHTML = COLORS.map(c => `<button style="background:${c}" class="${look[key] === c ? 'on' : ''}" data-c="${c}"></button>`).join(''); el.onclick = e => { const c = e.target.dataset.c; if (!c) return; Save.sel.looks[aid] = Object.assign({}, Save.sel.looks[aid], { [key]: c }); persist(); refreshLocalLook(); UI.render(); }; };
    sw($('c1'), 'c1'); sw($('c2'), 'c2');
    $('resetC').onclick = () => { const l = Save.sel.looks[aid] || {}; delete l.c1; delete l.c2; Save.sel.looks[aid] = l; persist(); refreshLocalLook(); UI.render(); };
    const g = $('pats');
    PATTERNS.forEach(pt => {
      const owned = Save.owned.patterns.includes(pt.id), on = look.pattern === pt.id;
      const d = document.createElement('div'); d.className = 'card' + (on ? ' sel' : '') + (owned ? '' : ' locked');
      d.innerHTML = `<div class="swatch" style="background-image:url(${patternTexture(pt.id, look.c1, look.c2).image.toDataURL()})"></div><div class="nm">${pt.name}</div>${owned ? `<div class="own">${on ? '✔ WEARING' : 'OWNED'}</div>` : `<div class="pr">${GEM}${pt.price}</div>`}`;
      d.onclick = () => {
        if (!owned && !UI.buy(pt, Save.owned.patterns)) return;
        Save.sel.looks[aid] = Object.assign({}, Save.sel.looks[aid], { pattern: pt.id }); persist(); refreshLocalLook(); UI.render();
      };
      g.appendChild(d);
    });
  },

  // ---------- WEARABLES ----------
  paneWear(p) {
    p.innerHTML = WEAR_SLOTS.map(([slot, label]) => `<h2 class="sec">${label}</h2><div class="grid" data-slot="${slot}"></div>`).join('');
    WEAR_SLOTS.forEach(([slot]) => {
      const g = p.querySelector(`[data-slot=${slot}]`);
      const none = document.createElement('div'); none.className = 'card' + (!Save.sel.wear[slot] ? ' sel' : '');
      none.innerHTML = `<div class="em">🚫</div><div class="nm">Nothing</div>`; none.onclick = () => { delete Save.sel.wear[slot]; persist(); refreshLocalLook(); UI.render(); };
      g.appendChild(none);
      WEARABLES.filter(w => w.slot === slot).forEach(w => {
        const owned = Save.owned.wear.includes(w.id), on = Save.sel.wear[slot] === w.id;
        const d = document.createElement('div'); d.className = 'card' + (on ? ' sel' : '') + (owned ? '' : ' locked');
        d.innerHTML = `<div class="em">${w.emoji}</div><div class="nm">${w.name}</div>${owned ? `<div class="own">${on ? '✔ WEARING' : 'OWNED'}</div>` : `<div class="pr">${GEM}${w.price}</div>`}`;
        d.onclick = () => {
          if (!owned && !UI.buy(w, Save.owned.wear)) return;
          Save.sel.wear[slot] = w.id; persist(); refreshLocalLook(); UI.render();
        };
        g.appendChild(d);
      });
    });
  },

  // ---------- PERKS ----------
  panePerks(p) {
    p.innerHTML = `<h2 class="sec">Bonus abilities <small>work with any animal, equip up to 2</small></h2><div class="grid" id="perkg"></div>`;
    const g = $('perkg');
    PERKS.forEach(k => {
      const owned = Save.owned.perks.includes(k.id), on = Save.sel.perks.includes(k.id);
      const d = document.createElement('div'); d.className = 'card' + (on ? ' sel' : '') + (owned ? '' : ' locked');
      d.innerHTML = `<div class="em">${k.emoji}</div><div class="nm">${k.name}</div><div class="ab">${k.desc}</div>${owned ? `<div class="own">${on ? '✔ EQUIPPED' : 'OWNED (tap to equip)'}</div>` : `<div class="pr">${GEM}${k.price}</div>`}`;
      d.onclick = () => {
        if (!owned && !UI.buy(k, Save.owned.perks)) return;
        if (Save.sel.perks.includes(k.id)) Save.sel.perks = Save.sel.perks.filter(x => x !== k.id);
        else { Save.sel.perks.push(k.id); if (Save.sel.perks.length > 2) Save.sel.perks.shift(); }
        persist(); refreshLocalLook(); UI.render();
      };
      g.appendChild(d);
    });
  },

  paneHow(p) {
    p.innerHTML = `<h2 class="sec">Controls</h2><ul class="how">
      <li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> run · move the <b>mouse</b> to look (click the game first) · scroll to zoom</li>
      <li><kbd>Space</kbd> jump. <b>Jump while touching a wall or tree to push off it</b>, and chain wall jumps to climb!</li>
      <li><kbd>E</kbd> or right-click: your animal's ability. <kbd>C</kbd> fly down. <kbd>Tab</kbd> full scoreboard. <kbd>Esc</kbd> menu.</li>
      <li>On a tablet: drag the left side to move, drag the right side to look, and use the JUMP and ABILITY buttons.</li>
      <li>Red mushrooms are bounce pads. Climb the Great Tree, the treehouses and the cliff to get away.</li>
      <li>Animals that are <b style="color:#c0402a">IT glow red</b> with a ring over their head. The map (top right) shows them as red dots.</li></ul>
      <h2 class="sec">Modes</h2>${UI.modePicker().replace(/<button class="mode[^"]*"/g, '<div class="mode"').replace(/<\/button>/g, '</div>')}
      <h2 class="sec">Gems</h2><ul class="how">
      <li>Every round: +${REWARDS.play}. Winning side: +${REWARDS.win}. Each tag: +${REWARDS.tag}. Survive to the end: +${REWARDS.surviveBonus}. Daily bonus: +${REWARDS.daily}.</li>
      <li>Spend gems on animals, patterns, wearables and bonus abilities. Mythical creatures also need a goal first.</li></ul>`;
  },

  // ---------- HUD ----------
  hud(dt) {
    if ($('hud').classList.contains('hide')) return;
    const me = local(); if (!me) return;
    const t = Math.max(0, Math.ceil(G.timer));
    $('time').textContent = G.phase === 'play' ? `${String(t / 60 | 0).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}` : G.phase === 'countdown' ? 'READY' : G.phase === 'end' ? 'DONE' : 'LOBBY';
    const mb = $('modeBadge'); if (mb.dataset.m !== G.mode) { mb.dataset.m = G.mode; mb.src = MODE_IMG[G.mode]; }
    const role = $('role');
    if (G.phase !== 'play') { role.className = 'lobby'; role.textContent = G.phase === 'lobby' ? (Net.online ? (Net.isHost ? '🌐 Room ' + Net.code + ': press Start when everyone is in' : '🌐 Room ' + Net.code + ': waiting for the host') : 'Free roam') : G.phase === 'countdown' ? 'Scatter!' : 'Round over'; }
    else if (me.frozen) { role.className = 'frozen'; role.textContent = '❄️ FROZEN! Wait for a friend'; }
    else if (me.it) { role.className = 'it'; role.textContent = G.mode === 'freeze' ? '🐾 TAGGER: FREEZE THEM!' : '🐾 YOU ARE IT'; }
    else { role.className = 'run'; role.textContent = G.mode === 'freeze' ? '🏃 RUN! Unfreeze friends' : '🏃 RUN!'; }
    $('hostStart').classList.toggle('hide', !(Net.online && Net.isHost && G.phase === 'lobby'));
    $('gems').querySelector('span').textContent = Save.gems;
    $('big').textContent = G.phase === 'countdown' ? Math.ceil(G.timer) : '';
    if (G.phase === 'countdown' && Math.ceil(G.timer) !== UI._lastCount) { UI._lastCount = Math.ceil(G.timer); beep('tick'); }
    $('feed').innerHTML = G.feed.map(f => `<div style="opacity:${Math.min(1, f.t)}">${escapeHtml(f.text)}</div>`).join('');
    // ability panel
    const ab = me.def.ab, maxCd = ab.cd * (me.has('quickcharge') ? 0.7 : 1);
    if (UI._abFor !== me.animal + me.perks.join()) {
      UI._abFor = me.animal + me.perks.join();
      $('abEm').textContent = me.def.emoji; $('abTag').textContent = me.def.name.toUpperCase() + ' ABILITY'; $('abName').textContent = ab.name;
      $('abKey').textContent = isTouch() ? 'Tap ABILITY' : 'Press E';
      $('perks').innerHTML = me.perks.map(id => `<div title="${PERK[id].name}">${PERK[id].emoji}</div>`).join('');
    }
    const cd = $('abCd'); cd.style.setProperty('--p', (me.cd / maxCd * 100).toFixed(1)); cd.querySelector('span').textContent = me.cd > 0 ? Math.ceil(me.cd) + 's' : 'GO';
    cd.classList.toggle('ready', me.cd <= 0);
    if (UI.flashT > 0) { UI.flashT -= dt; if (UI.flashT <= 0) $('flash').style.opacity = 0; }
    $('blind').style.opacity = me.fx.blind > 0 ? 1 : 0;
    UI.board(me);
    UI.radar(me);
    if (!$('score').classList.contains('hide')) UI.score(true);
  },
  board(me) {
    if (G.t - (UI._bt || -9) < 0.3) return; UI._bt = G.t;   // refresh a few times a second
    const list = [...G.critters.values()].sort((a, b) => b.tags - a.tags || (a.it - b.it));
    let top = list.slice(0, 5); if (!top.includes(me)) top = top.slice(0, 4).concat(me);
    $('board').innerHTML = `<div class="head">🌿 WILD TAG</div>` + top.map(c => `<div class="row ${c === me ? 'me' : ''} ${c.it ? 'it' : ''}"><span class="n">${list.indexOf(c) === 0 && c.tags > 0 ? '👑' : list.indexOf(c) + 1}</span><span class="nm">${escapeHtml(c.name)}${c === me ? ' (You)' : ''}</span><span class="t">${c.tags} tag${c.tags === 1 ? '' : 's'}</span></div>`).join('');
  },
  radar(me) {
    const cv = $('radar'), g = cv.getContext('2d'), W = cv.width, R = W / 2, range = 45;
    g.clearRect(0, 0, W, W);
    g.strokeStyle = 'rgba(255,244,220,.25)'; g.lineWidth = 2; g.beginPath(); g.arc(R, R, R * 0.5, 0, 7); g.stroke();
    const yaw = G.camYaw, fx = Math.sin(yaw), fz = Math.cos(yaw), rx = -Math.cos(yaw), rz = Math.sin(yaw);
    for (const c of G.critters.values()) {
      if (c === me || (c.vf && (c.vf.invis || c.vf.burrow))) continue;
      const dx = c.pos.x - me.pos.x, dz = c.pos.z - me.pos.z;
      let px = (dx * rx + dz * rz) / range * R, py = -(dx * fx + dz * fz) / range * R;
      const l = Math.hypot(px, py); if (l > R - 8) { px *= (R - 8) / l; py *= (R - 8) / l; }
      g.fillStyle = c.it ? '#e8452f' : c.frozen ? '#9fe3ff' : '#fff4dc'; g.strokeStyle = '#173d24'; g.lineWidth = 2;
      g.beginPath(); g.arc(R + px, R + py, c.it ? 7 : 4.5, 0, 7); g.fill(); g.stroke();
    }
    g.fillStyle = '#ffc531'; g.strokeStyle = '#173d24'; g.beginPath(); g.moveTo(R, R - 10); g.lineTo(R - 7, R + 7); g.lineTo(R + 7, R + 7); g.closePath(); g.fill(); g.stroke();
  },
  flash(text) { $('flash').textContent = text; $('flash').style.opacity = 1; UI.flashT = 2.2; },
  score(show) {
    const el = $('score'); el.classList.toggle('hide', !show); if (!show) return;
    const list = [...G.critters.values()].sort((a, b) => b.tags - a.tags);
    el.innerHTML = `<b style="font-size:22px">${MODES[G.mode].name}</b><table>${list.map(c => `<tr class="${c.it ? 'it' : ''} ${c.kind === 'local' ? 'me' : ''}"><td>${c.def.emoji}</td><td>${escapeHtml(c.name)}${c.kind === 'bot' ? ' <small style="opacity:.7">bot</small>' : ''}</td><td>${c.it ? '🔥 IT' : c.frozen ? '❄️' : '🏃'}</td><td>👉 ${c.tags}</td></tr>`).join('')}</table>`;
  },
  results(res, myId, won, gems, tags) {
    const el = $('results'); el.classList.remove('hide');
    const mvp = res.mvp && res.names[res.mvp];
    el.innerHTML = `<img src="ui/medal.png" alt=""><h2>${won ? 'You win!' : 'Not this time!'}</h2><div class="status" style="font-size:17px">${escapeHtml(res.title)}</div>
      <div class="gain">+${gems} ${GEM}</div><div class="status">You tagged ${tags}${mvp ? ' · Top tagger: ' + escapeHtml(mvp) + ' (' + res.tags[res.mvp] + ')' : ''}</div>
      <div class="status" style="margin-top:8px">Next round starts soon…</div>`;
  },
  hideResults() { $('results').classList.add('hide'); },
};
function escapeHtml(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function toast(text) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = text; document.body.appendChild(t); setTimeout(() => t.style.opacity = 0, 1800); setTimeout(() => t.remove(), 2300); }

// ---------- 3D preview in the shop ----------
const Preview = {
  init() {
    const cv = $('preview');
    this.r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    this.r.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.s = new THREE.Scene();
    this.s.add(new THREE.HemisphereLight('#ffffff', '#445', 0.9));
    const d = new THREE.DirectionalLight('#fff', 0.9); d.position.set(3, 5, 4); this.s.add(d);
    this.cam = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.2, 32), new THREE.MeshStandardMaterial({ color: '#7a4a25' })); base.position.y = -0.1; this.s.add(base);
    this.key = ''; this.t = 0;
    const tick = () => {
      requestAnimationFrame(tick);
      if (!UI.menuOpen() || $('sheet').classList.contains('hide') || $('pside').classList.contains('hide')) return;
      const w = cv.clientWidth, h = cv.clientHeight; if (cv.width !== Math.round(w * this.r.getPixelRatio()) || cv.height !== Math.round(h * this.r.getPixelRatio())) { this.r.setSize(w, h, false); this.cam.aspect = w / h; this.cam.updateProjectionMatrix(); }
      this.t += 0.016;
      if (this.m) { this.m.rotation.y = this.t * 0.8; animateCreature(this.m.children[0], this.t, 0.3, false, false, this.def); }
      this.r.render(this.s, this.cam);
    };
    tick();
  },
  show(id) {
    const def = CREATURE[id], look = myLook(id);
    const key = id + JSON.stringify(look); if (key === this.key) return; this.key = key;
    if (this.m) this.s.remove(this.m);
    this.def = def; this.m = new THREE.Group(); const c = buildCreature(def, look); this.m.add(c); this.s.add(this.m);
    const box = new THREE.Box3().setFromObject(c), h = box.max.y, len = Math.max(box.max.x - box.min.x, box.max.z - box.min.z);
    const dist = Math.max(h * 2.1, len * 1.5) + 1;
    this.cam.position.set(0, h * 0.75, dist); this.cam.lookAt(0, h * 0.45, 0);
  },
};

// loading bar while the 3D models download, then start
(function boot() {
  let p = 10; const bar = $('loadBar'); const tick = setInterval(() => { p = Math.min(90, p + 7); bar.style.width = p + '%'; }, 120);
  loadModels(() => { clearInterval(tick); bar.style.width = '100%'; initGame(); UI.init(); });
})();

// a clear spot for the title screen: the animal faces outward, the camera looks back at it and the Great Tree
function titleSpot() {
  const me = local(); if (!me) return;
  let best = null, bestD = -1;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 24) for (const r of [17, 20, 23]) {
    const x = Math.sin(a) * r, z = Math.cos(a) * r; let d = 99;
    for (const b of World.boxes) { if (b.max.x - b.min.x > 50) continue; const dx = Math.max(b.min.x - x, 0, x - b.max.x), dz = Math.max(b.min.z - z, 0, z - b.max.z); d = Math.min(d, Math.hypot(dx, dz)); }
    for (const c of World.cyls) if (Math.hypot(c.x, c.z) > 4) d = Math.min(d, Math.hypot(c.x - x, c.z - z) - c.r);
    if (d > bestD) { bestD = d; best = { x, z, a }; }
  }
  me.pos.set(best.x, 0, best.z); me.vel.set(0, 0, 0); me.ry = best.a;
  G.titleYaw = best.a + Math.PI;
}
