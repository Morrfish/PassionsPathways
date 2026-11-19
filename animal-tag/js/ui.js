// Wild Tag: menus, shop, HUD.
'use strict';

const $ = (id) => document.getElementById(id);
const UI = {
  tab: 'play', viewAnimal: null, flashT: 0, netStatus: '', netErr: false,

  init() {
    if (isTouch()) document.body.classList.add('touch');
    $('nameIn').value = Save.name;
    $('nameIn').addEventListener('change', () => { Save.name = ($('nameIn').value.trim() || 'Player').slice(0, 16); persist(); refreshLocalLook(); const c = local(); if (c) { c.name = Save.name; c.setAnimal(c.animal, c.look); } });
    $('tabs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; UI.tab = b.dataset.t; UI.viewAnimal = null; UI.render(); });
    $('menuBtn').addEventListener('click', () => UI.openMenu());
    $('hostStart').addEventListener('click', () => { if (Net.isHost && (G.phase === 'lobby')) startRound(); });
    addEventListener('keydown', e => { if (e.code === 'Escape' && $('menu').classList.contains('hide') === false && G.started) UI.closeMenu(); });
    Net.onStatus = (s, err) => { UI.netStatus = err || { connecting: 'Connecting…', hosting: 'Room is open!', joined: 'Joined the room!', offline: '' }[s] || ''; UI.netErr = s === 'error'; if (UI.tab === 'play') UI.render(); };
    // daily gems
    const today = new Date().toISOString().slice(0, 10);
    if (Save.lastDaily !== today) { Save.lastDaily = today; Save.gems += REWARDS.daily; persist(); setTimeout(() => toast(`🎁 Daily bonus: +${REWARDS.daily} gems!`), 600); }
    Preview.init();
    UI.render();
  },

  openMenu() {
    G.paused = true; $('menu').classList.remove('hide'); $('hud').classList.add('hide');
    if (document.pointerLockElement) document.exitPointerLock();
    UI.render();
  },
  closeMenu() {
    G.paused = false; G.started = true; $('menu').classList.add('hide'); $('hud').classList.remove('hide');
    const cv = renderer.domElement; if (!isTouch() && cv.requestPointerLock) { try { cv.requestPointerLock(); } catch (e) { } }
    refreshLocalLook();
  },

  render() {
    document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.t === UI.tab));
    $('mGems').textContent = '💎 ' + Save.gems;
    const p = $('pane');
    const f = { play: UI.paneplay, animals: UI.paneAnimals, wardrobe: UI.panePatterns, wear: UI.paneWear, perks: UI.panePerks, how: UI.paneHow }[UI.tab];
    p.innerHTML = ''; f.call(UI, p);
    UI.sideInfo();
    Preview.show(UI.viewAnimal || Save.sel.animal);
  },

  sideInfo() {
    const a = CREATURE[UI.viewAnimal || Save.sel.animal];
    const bar = (label, v, max) => `<div class="stat"><span style="width:52px">${label}</span><div class="bar"><i style="width:${Math.min(100, v / max * 100)}%"></i></div></div>`;
    const perks = Save.sel.perks.map(id => PERK[id].emoji + ' ' + PERK[id].name).join(', ') || 'none';
    $('selinfo').innerHTML = `<h3>${a.emoji} ${a.name}${a.mythic ? ' <span style="color:#ff8ff0;font-size:13px">MYTHICAL</span>' : ''}</h3>
      <div style="font-weight:800;color:var(--y)">✨ ${a.ab.name}</div><div style="font-size:13px;color:var(--dim);margin-bottom:8px">${a.ab.desc} <i>(${a.ab.cd}s)</i></div>
      ${bar('Speed', a.spd - 6, 5.5)}${bar('Jump', a.jmp - 7, 6.5)}${bar('Climb', a.climb, 2.2)}${bar('Size', a.size, 1.4)}
      <div style="font-size:12px;color:var(--dim);margin-top:8px">Bonus abilities: ${perks}</div>
      <div style="font-size:12px;color:var(--dim)">🏆 ${Save.stats.wins} wins · 👉 ${Save.stats.tags} tags · 🎮 ${Save.stats.rounds} rounds</div>`;
  },

  // ---------- PLAY ----------
  paneplay(p) {
    const s = Save.settings;
    const inRound = G.started && (G.phase !== 'lobby' || Net.online);
    p.innerHTML = `
      <h2 class="sec">Game mode</h2>
      <div class="modes">${Object.entries(MODES).map(([id, m]) => `<div class="mode ${s.mode === id ? 'sel' : ''}" data-mode="${id}"><b>${{ infection: '🔥', classic: '👉', freeze: '❄️' }[id]} ${m.name}</b><p>${m.desc}</p></div>`).join('')}</div>
      <h2 class="sec">Solo (you vs. bots)</h2>
      <div class="row">
        <label>Bots <select id="botsSel">${[3, 5, 7, 9, 11, 15].map(n => `<option ${n === s.bots ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <label>Bot skill <select id="diffSel">${['easy', 'normal', 'hard'].map(n => `<option ${n === s.diff ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      </div>
      <div class="row">
        ${inRound ? '<button class="btn green" id="resume">▶ Resume</button>' : ''}
        <button class="btn ${inRound ? 'alt' : ''}" id="solo">${inRound && !Net.online ? '🔄 New Solo Game' : '▶ Play Solo'}</button>
      </div>
      <h2 class="sec">Online with friends</h2>
      <div class="box" id="netbox"></div>
      <h2 class="sec">Settings</h2>
      <div class="row">
        <label>Mouse/touch look speed <input type="range" id="sens" min="0.3" max="2.5" step="0.1" value="${s.sens}"></label>
        <label><input type="checkbox" id="snd" ${s.sound ? 'checked' : ''}> Sound</label>
      </div>`;
    p.querySelectorAll('.mode').forEach(el => el.onclick = () => { s.mode = el.dataset.mode; persist(); UI.render(); });
    $('botsSel').onchange = e => { s.bots = +e.target.value; persist(); };
    $('diffSel').onchange = e => { s.diff = e.target.value; persist(); };
    $('sens').oninput = e => { s.sens = +e.target.value; persist(); };
    $('snd').onchange = e => { s.sound = e.target.checked; persist(); };
    $('solo').onclick = () => { startSolo(); UI.closeMenu(); };
    if ($('resume')) $('resume').onclick = () => UI.closeMenu();

    const nb = $('netbox');
    if (Net.online && Net.isHost) {
      nb.innerHTML = `<div>Your room code:</div><div class="code">${Net.code}</div>
        <div class="status">Friends open Wild Tag, choose <b>Join</b> and type this code. ${Net.count()} friend(s) connected. The mode you pick above is used.</div>
        <div class="row"><label>Bots in room <select id="rbots">${[0, 2, 4, 6, 8].map(n => `<option ${n === s.roomBots ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <button class="btn green" id="goRoom">▶ Go to room</button><button class="btn alt" id="leave">Leave room</button></div>`;
      $('rbots').onchange = e => { s.roomBots = +e.target.value; persist(); clearBots(); addBots(s.roomBots); broadcastRoster(); };
      $('goRoom').onclick = () => UI.closeMenu();
      $('leave').onclick = () => { leaveRoom(); UI.render(); };
    } else if (Net.online) {
      nb.innerHTML = `<div>In room <span class="code" style="font-size:22px">${Net.code}</span></div><div class="status">The host starts each round.</div>
        <div class="row"><button class="btn green" id="goRoom">▶ Go to room</button><button class="btn alt" id="leave">Leave room</button></div>`;
      $('goRoom').onclick = () => UI.closeMenu();
      $('leave').onclick = () => { leaveRoom(); UI.render(); };
    } else {
      nb.innerHTML = `<div class="row"><button class="btn blue" id="host">🏠 Host a room</button>
        <span style="color:var(--dim)">or</span> <input type="text" id="code" placeholder="ROOM CODE" maxlength="5" style="width:140px;text-transform:uppercase;letter-spacing:3px"> <button class="btn alt" id="join">Join</button></div>
        <div class="status ${UI.netErr ? 'err' : ''}">${UI.netStatus || 'Play together on different computers. One person hosts, everyone else joins with the code. Needs internet.'}</div>`;
      $('host').onclick = () => hostRoom(() => { UI.netStatus = ''; UI.render(); });
      $('join').onclick = () => { const c = $('code').value.trim(); if (c.length < 5) { UI.netStatus = 'Type the 5-letter code.'; UI.netErr = true; UI.render(); return; } joinRoom(c, () => { UI.closeMenu(); }); };
    }
  },

  // ---------- ANIMALS ----------
  paneAnimals(p) {
    const card = (a) => {
      const owned = Save.owned.animals.includes(a.id), sel = Save.sel.animal === a.id;
      const reqOk = UI.reqMet(a);
      return `<div class="card ${sel ? 'sel' : ''} ${owned ? '' : 'locked'} ${a.mythic ? 'mythic' : ''}" data-a="${a.id}">
        <div class="em">${owned ? a.emoji : (a.mythic && !reqOk ? '🔒' : a.emoji)}</div><div class="nm">${a.name}</div>
        <div class="ab">✨ ${a.ab.name}</div>
        ${owned ? `<div class="own">${sel ? '✔ PLAYING' : 'OWNED'}</div>` : `<div class="pr">💎 ${a.price}</div>${a.mythic ? `<div class="req">${UI.reqText(a)}</div>` : ''}`}
      </div>`;
    };
    p.innerHTML = `<h2 class="sec">Animals <span style="font-size:14px;color:var(--dim)">(${ANIMALS.length}) — click to view, click again to play or buy</span></h2>
      <div class="grid">${ANIMALS.map(card).join('')}</div>
      <h2 class="sec">✨ Mythical Creatures <span style="font-size:14px;color:var(--dim)">(${MYTHICS.length}) — reach the goal, then buy with gems</span></h2>
      <div class="grid">${MYTHICS.map(card).join('')}</div>`;
    p.querySelectorAll('.card').forEach(el => el.onclick = () => {
      const a = CREATURE[el.dataset.a];
      if (UI.viewAnimal !== a.id && Save.sel.animal !== a.id) { UI.viewAnimal = a.id; UI.render(); UI.showBuyBar(a); return; }
      UI.choose(a);
    });
    if (UI.viewAnimal) UI.showBuyBar(CREATURE[UI.viewAnimal]);
  },
  showBuyBar(a) {
    const owned = Save.owned.animals.includes(a.id);
    const box = document.createElement('div'); box.className = 'box';
    box.style.cssText = 'position:sticky;bottom:0;display:flex;gap:12px;align-items:center;flex-wrap:wrap';
    const can = Save.gems >= a.price && UI.reqMet(a);
    box.innerHTML = owned ? `<b>${a.emoji} ${a.name}</b><button class="btn green" id="pick">Play as ${a.name}</button>`
      : `<b>${a.emoji} ${a.name}</b> <span class="pr" style="color:var(--y);font-weight:900">💎 ${a.price}</span> ${a.mythic ? `<span class="req" style="color:#ffb3d0">${UI.reqText(a)}</span>` : ''}
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

  // ---------- PATTERNS & COLORS ----------
  panePatterns(p) {
    const aid = Save.sel.animal, a = CREATURE[aid], look = myLook(aid);
    p.innerHTML = `<h2 class="sec">Colors for your ${a.name}</h2>
      <div class="row"><b style="width:90px">Main</b><div class="colors" id="c1"></div></div>
      <div class="row"><b style="width:90px">Pattern</b><div class="colors" id="c2"></div></div>
      <div class="row"><button class="btn alt" id="resetC">Reset to ${a.name} colors</button></div>
      <h2 class="sec">Patterns</h2><div class="grid" id="pats"></div>`;
    const sw = (el, key) => { el.innerHTML = COLORS.map(c => `<button style="background:${c}" class="${look[key] === c ? 'on' : ''}" data-c="${c}"></button>`).join(''); el.onclick = e => { const c = e.target.dataset.c; if (!c) return; Save.sel.looks[aid] = Object.assign({}, Save.sel.looks[aid], { [key]: c }); persist(); refreshLocalLook(); UI.render(); }; };
    sw($('c1'), 'c1'); sw($('c2'), 'c2');
    $('resetC').onclick = () => { const l = Save.sel.looks[aid] || {}; delete l.c1; delete l.c2; Save.sel.looks[aid] = l; persist(); refreshLocalLook(); UI.render(); };
    const g = $('pats');
    PATTERNS.forEach(pt => {
      const owned = Save.owned.patterns.includes(pt.id), on = look.pattern === pt.id;
      const d = document.createElement('div'); d.className = 'card' + (on ? ' sel' : '') + (owned ? '' : ' locked');
      const tex = patternTexture(pt.id, look.c1, look.c2);
      d.innerHTML = `<div class="swatch" style="background-image:url(${tex.image.toDataURL()})"></div><div class="nm">${pt.name}</div>${owned ? `<div class="own">${on ? '✔ WEARING' : 'OWNED'}</div>` : `<div class="pr">💎 ${pt.price}</div>`}`;
      d.onclick = () => {
        if (!owned) { if (Save.gems < pt.price) { toast('Not enough gems — win some rounds!'); return; } Save.gems -= pt.price; Save.owned.patterns.push(pt.id); beep('buy'); toast('Bought ' + pt.name + '!'); }
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
        d.innerHTML = `<div class="em">${w.emoji}</div><div class="nm">${w.name}</div>${owned ? `<div class="own">${on ? '✔ WEARING' : 'OWNED'}</div>` : `<div class="pr">💎 ${w.price}</div>`}`;
        d.onclick = () => {
          if (!owned) { if (Save.gems < w.price) { toast('Not enough gems — win some rounds!'); return; } Save.gems -= w.price; Save.owned.wear.push(w.id); beep('buy'); toast('Bought ' + w.name + '!'); }
          Save.sel.wear[slot] = w.id; persist(); refreshLocalLook(); UI.render();
        };
        g.appendChild(d);
      });
    });
  },

  // ---------- PERKS ----------
  panePerks(p) {
    p.innerHTML = `<h2 class="sec">Bonus abilities <span style="font-size:14px;color:var(--dim)">— work with any animal. Equip up to 2.</span></h2><div class="grid" id="perkg"></div>`;
    const g = $('perkg');
    PERKS.forEach(k => {
      const owned = Save.owned.perks.includes(k.id), on = Save.sel.perks.includes(k.id);
      const d = document.createElement('div'); d.className = 'card' + (on ? ' sel' : '') + (owned ? '' : ' locked');
      d.innerHTML = `<div class="em">${k.emoji}</div><div class="nm">${k.name}</div><div class="ab">${k.desc}</div>${owned ? `<div class="own">${on ? '✔ EQUIPPED' : 'OWNED — click to equip'}</div>` : `<div class="pr">💎 ${k.price}</div>`}`;
      d.onclick = () => {
        if (!owned) { if (Save.gems < k.price) { toast('Not enough gems — win some rounds!'); return; } Save.gems -= k.price; Save.owned.perks.push(k.id); beep('buy'); toast('Bought ' + k.name + '!'); }
        if (Save.sel.perks.includes(k.id)) Save.sel.perks = Save.sel.perks.filter(x => x !== k.id);
        else { Save.sel.perks.push(k.id); if (Save.sel.perks.length > 2) Save.sel.perks.shift(); }
        persist(); refreshLocalLook(); UI.render();
      };
      g.appendChild(d);
    });
  },

  paneHow(p) {
    p.innerHTML = `<h2 class="sec">How to play</h2><ul class="how">
      <li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> run · move the <b>mouse</b> to look around (click the game first) · scroll to zoom</li>
      <li><kbd>Space</kbd> jump. <b>Jump while touching a wall or tree to push off it</b> — chain wall jumps to climb!</li>
      <li><kbd>E</kbd> or right-click: use your animal's special ability. <kbd>C</kbd> fly down. <kbd>Tab</kbd> scoreboard. <kbd>Esc</kbd> menu.</li>
      <li>On a tablet: drag the left side to move, drag the right side to look, and use the JUMP and ✨ buttons.</li>
      <li>Red mushrooms are bounce pads. Climb the Great Tree, the treehouses and the cliff to get away.</li>
      <li>Animals that are <b style="color:#ff6a5a">IT glow red</b> with a ring over their head. The radar (bottom right) shows them as red dots.</li></ul>
      <h2 class="sec">Modes</h2><ul class="how">${Object.values(MODES).map(m => `<li><b>${m.name}:</b> ${m.desc}</li>`).join('')}</ul>
      <h2 class="sec">Gems 💎</h2><ul class="how">
      <li>Every round: +${REWARDS.play}. On the winning side: +${REWARDS.win}. Each tag: +${REWARDS.tag}. Survive to the end: +${REWARDS.surviveBonus}. Daily bonus: +${REWARDS.daily}.</li>
      <li>Spend gems on animals, patterns, wearables and bonus abilities. Mythical creatures also need a goal (wins, tags or rounds played).</li>
      <li>Your gems and unlocks are saved in this browser.</li></ul>`;
  },

  // ---------- HUD ----------
  hud(dt) {
    if ($('hud').classList.contains('hide')) return;
    const me = local(); if (!me) return;
    $('modeName').textContent = (Net.online ? '🌐 ' + Net.code + ' · ' : '') + MODES[G.mode].name;
    const t = Math.max(0, Math.ceil(G.timer));
    $('timer').textContent = G.phase === 'play' ? `${t / 60 | 0}:${String(t % 60).padStart(2, '0')}` : G.phase === 'countdown' ? 'Get ready' : G.phase === 'end' ? 'Round over' : 'Lobby';
    const all = [...G.critters.values()], runners = all.filter(c => !c.it && !c.frozen).length;
    $('alive').textContent = G.mode === 'classic' ? `👥 ${all.length}` : `🏃 ${runners} / ${all.length}`;
    const role = $('role');
    if (G.phase !== 'play') { role.className = 'lobby'; role.textContent = G.phase === 'lobby' ? (Net.online ? (Net.isHost ? 'Lobby — press Start when everyone is in' : 'Lobby — waiting for the host') : 'Free roam') : G.phase === 'countdown' ? 'Scatter!' : '—'; }
    else if (me.frozen) { role.className = 'frozen'; role.textContent = '❄️ FROZEN — wait for a friend'; }
    else if (me.it) { role.className = 'it'; role.textContent = G.mode === 'freeze' ? '❄️ TAGGER — freeze them!' : '🔥 YOU ARE IT — tag someone!'; }
    else { role.className = 'run'; role.textContent = G.mode === 'freeze' ? '🏃 RUN — unfreeze friends!' : '🏃 RUN!'; }
    $('hostStart').classList.toggle('hide', !(Net.online && Net.isHost && G.phase === 'lobby'));
    $('gems').textContent = '💎 ' + Save.gems;
    $('big').textContent = G.phase === 'countdown' ? Math.ceil(G.timer) : '';
    if (G.phase === 'countdown' && Math.ceil(G.timer) !== UI._lastCount) { UI._lastCount = Math.ceil(G.timer); beep('tick'); }
    $('feed').innerHTML = G.feed.map(f => `<div style="opacity:${Math.min(1, f.t)}">${escapeHtml(f.text)}</div>`).join('');
    const ab = me.def.ab, maxCd = ab.cd * (me.has('quickcharge') ? 0.7 : 1);
    $('abEm').textContent = me.def.emoji; $('abName').textContent = ab.name; $('abKey').textContent = isTouch() ? 'Tap ✨' : 'Press E';
    $('abFill').style.height = (me.cd / maxCd * 100) + '%'; $('abCd').textContent = me.cd > 0 ? Math.ceil(me.cd) : '';
    $('abIcon').classList.toggle('ready', me.cd <= 0);
    if (UI.flashT > 0) { UI.flashT -= dt; if (UI.flashT <= 0) $('flash').style.opacity = 0; }
    $('blind').style.opacity = me.fx.blind > 0 ? 1 : 0;
    UI.radar(me);
    if (!$('score').classList.contains('hide')) UI.score(true);
  },
  radar(me) {
    const cv = $('radar'), g = cv.getContext('2d'), W = cv.width, R = W / 2, range = 45;
    g.clearRect(0, 0, W, W);
    g.strokeStyle = 'rgba(255,255,255,.15)'; g.beginPath(); g.arc(R, R, R * 0.5, 0, 7); g.stroke();
    const yaw = G.camYaw;
    for (const c of G.critters.values()) {
      if (c === me) continue;
      if (c.fx.burrow > 0 || (c.vf && (c.vf.invis || c.vf.burrow))) continue;
      const dx = c.pos.x - me.pos.x, dz = c.pos.z - me.pos.z;
      // rotate so "forward" (camera direction) is up
      const fx = Math.sin(yaw), fz = Math.cos(yaw), rx = -Math.cos(yaw), rz = Math.sin(yaw);
      let px = (dx * rx + dz * rz) / range * R, py = -(dx * fx + dz * fz) / range * R;
      const l = Math.hypot(px, py); if (l > R - 5) { px *= (R - 5) / l; py *= (R - 5) / l; }
      g.fillStyle = c.it ? '#ff3b2f' : c.frozen ? '#7fd8ff' : '#ffffff';
      g.beginPath(); g.arc(R + px, R + py, c.it ? 5 : 3.5, 0, 7); g.fill();
    }
    g.fillStyle = me.it ? '#ff3b2f' : '#ffd23f'; g.beginPath(); g.moveTo(R, R - 7); g.lineTo(R - 5, R + 5); g.lineTo(R + 5, R + 5); g.fill();
  },
  flash(text) { $('flash').textContent = text; $('flash').style.opacity = 1; UI.flashT = 2.2; },
  score(show) {
    const el = $('score'); el.classList.toggle('hide', !show); if (!show) return;
    const list = [...G.critters.values()].sort((a, b) => b.tags - a.tags);
    el.innerHTML = `<b>${MODES[G.mode].name}</b><table>${list.map(c => `<tr class="${c.it ? 'it' : ''} ${c.kind === 'local' ? 'me' : ''}"><td>${c.def.emoji}</td><td>${escapeHtml(c.name)}${c.kind === 'bot' ? ' <small style="color:var(--dim)">bot</small>' : ''}</td><td>${c.it ? '🔥 IT' : c.frozen ? '❄️' : '🏃'}</td><td>👉 ${c.tags}</td></tr>`).join('')}</table>`;
  },
  results(res, myId, won, gems, tags) {
    const el = $('results'); el.classList.remove('hide');
    const mvp = res.mvp && res.names[res.mvp];
    el.innerHTML = `<h2>${won ? '🏆 You win!' : '😅 Not this time'}</h2><div class="sub">${escapeHtml(res.title)}</div>
      <div class="gain">+${gems} 💎</div><div class="sub">You tagged ${tags} · ${mvp ? 'Top tagger: ' + escapeHtml(mvp) + ' (' + res.tags[res.mvp] + ')' : ''}</div>
      <div class="sub" style="margin-top:10px">Next round starts soon…</div>`;
    if (document.pointerLockElement && false) document.exitPointerLock();
  },
  hideResults() { $('results').classList.add('hide'); },
};
function escapeHtml(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function toast(text) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = text; document.body.appendChild(t); setTimeout(() => t.style.opacity = 0, 1800); setTimeout(() => t.remove(), 2300); }

// ---------- 3D preview in the menu ----------
const Preview = {
  init() {
    const cv = $('preview');
    this.r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    this.r.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.s = new THREE.Scene();
    this.s.add(new THREE.HemisphereLight('#ffffff', '#445', 0.9));
    const d = new THREE.DirectionalLight('#fff', 0.9); d.position.set(3, 5, 4); this.s.add(d);
    this.cam = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.2, 32), new THREE.MeshStandardMaterial({ color: '#2e416e' })); base.position.y = -0.1; this.s.add(base);
    this.key = ''; this.t = 0;
    const tick = () => {
      requestAnimationFrame(tick);
      if ($('menu').classList.contains('hide')) return;
      const w = cv.clientWidth, h = cv.clientHeight; if (cv.width !== w * this.r.getPixelRatio() || cv.height !== h * this.r.getPixelRatio()) { this.r.setSize(w, h, false); this.cam.aspect = w / h; this.cam.updateProjectionMatrix(); }
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
    const h = 2.2 * def.size;
    this.cam.position.set(0, h * 0.75, h * 2.1 + 1.5); this.cam.lookAt(0, h * 0.45, 0);
  },
};

initGame();
UI.init();
