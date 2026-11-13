/* Bot Assembly Shop — screens: home, shop, run HUD, course editor */
'use strict';
const App = {
  mode: 'home', cfg: Object.assign({}, DEFAULT_BOT, Store.get('bot', {})), course: null, G: null, cam: { x: 0, y: 12, ppm: 40 },
  keys: {}, edge: {}, free: false, gtab: 'stats', from: 'home', paused: false, lastTips: null, shown: false, acc: 0,
};
const BUILTIN = builtinCourses();
const cv = $('#stage'), ctx = cv.getContext('2d');
let VW = 0, VH = 0, DPR = 1;
function resize() { DPR = Math.min(2, window.devicePixelRatio || 1); VW = innerWidth; VH = innerHeight; cv.width = VW * DPR; cv.height = VH * DPR; }
addEventListener('resize', resize); resize();
const isTouch = matchMedia('(pointer:coarse)').matches;

function setMode(m) {
  App.mode = m;
  $('#home').classList.toggle('on', m === 'home'); $('#garage').classList.toggle('on', m === 'garage');
  $('#hud').classList.toggle('on', m === 'run'); $('#edUI').classList.toggle('on', m === 'editor');
  $('#touch').classList.toggle('on', m === 'run' && isTouch);
}
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.style.display = 'block'; clearTimeout(toast.h); toast.h = setTimeout(() => t.style.display = 'none', 2200); }
function modal(html) { $('#modal .mbox').innerHTML = html; $('#modal').classList.add('on'); const f = $('#modal [data-focus]') || $('#modal button'); if (f) f.focus(); }
function closeModal() { $('#modal').classList.remove('on'); }
let modalDown = false;   // only a press that starts on the backdrop closes the box, so a drag that ends outside does not
$('#modal').addEventListener('pointerdown', e => { modalDown = e.target.id === 'modal'; });
$('#modal').addEventListener('click', e => {
  const a = e.target.closest('[data-m]'); if (e.target.id === 'modal') { if (modalDown && !(App.mode === 'run' && App.G && App.G.done)) { closeModal(); App.paused = false; } return; } if (!a) return;
  const act = a.dataset.m; closeModal();
  if (act === 'retry') startRun(); else if (act === 'shop') showGarage(App.course, App.from); else if (act === 'home') leaveRun();
  else if (act === 'print') { $('#modal').classList.add('on'); print(); }
});
const fmtT = t => t.toFixed(2);
const bestOf = id => Store.get('best', {})[id];

/* ================= Home ================= */
const SET = () => Object.assign({ damage: true, coach: true }, Store.get('set', {}));
function showHome() {
  setMode('home'); App.G = null;
  const mine = loadMyCourses();
  const card = (c, custom) => {
    const b = bestOf(c.id);
    return `<div class="card${c.boss ? ' boss' : ''}" data-id="${c.id}" tabindex="0" role="button" aria-label="Play ${esc(c.name)}">
      <canvas width="250" height="84"></canvas><div class="cb"><b>${esc(c.name)}${c.stars ? `<span class="stars" title="Difficulty ${c.stars} of 5">${'★'.repeat(c.stars)}<i>${'★'.repeat(5 - c.stars)}</i></span>` : ''}</b><p>${esc(c.desc || (custom ? 'A custom course.' : ''))}</p>
      <div class="meta"><span>💰 $${c.budget}</span><span>${b ? MEDAL_ICON[b.medal] + ' ' + fmtT(b.time) + 's' : custom && c.par ? 'Builder: ' + fmtT(c.par) + 's' : 'Not beaten yet'}</span></div>
      ${custom ? `<div class="row"><span class="tag ${c.kind}">${c.kind}</span><span style="flex:1"></span><button class="small" data-c="edit">✏️ Edit</button><button class="small" data-c="share">🔗 Share</button><button class="small danger" data-c="del" aria-label="Delete">🗑</button></div>` : ''}</div></div>`;
  };
  const beaten = BUILTIN.filter(c => bestOf(c.id)).length;
  const sect = (kind, title, sub) => { const list = BUILTIN.filter(c => c.kind === kind && !c.boss).sort((a, b) => (a.stars || 1) - (b.stars || 1)); return `<div class="sect"><h2><span class="tag ${kind}">${kind}</span>${title}<small>${sub} ${list.filter(c => bestOf(c.id)).length} of ${list.length} beaten.</small></h2><div class="cards">${list.map(c => card(c)).join('')}</div></div>`; };
  $('#home').innerHTML = `<div class="stripe"></div><div class="wrap">
    <div class="hero"><div><h1>Bot <span>Assembly</span> Shop</h1><p>Build a robot from parts. Then drive it through the course. If it gets stuck, go back to the shop and engineer a better one. <b>${beaten} of ${BUILTIN.length}</b> levels beaten.</p></div>
      <div class="acts"><button data-h="how">❓ How to play</button><button data-h="log">📓 Engineer's notebook</button><button data-h="paint">🎨 My bot</button><button data-h="set">⚙️ Settings</button></div></div>
    ${sect('speed', 'Speed courses', 'Fastest time wins.')}
    ${sect('strength', 'Strength courses', 'Climb, push and break through.')}
    ${sect('crazy', 'Crazy courses', 'Expect anything.')}
    <div class="sect"><h2><span class="tag boss">legendary</span>The final five<small>Long, mean, and short on checkpoints.</small></h2><div class="cards">${BUILTIN.filter(c => c.boss).map(c => card(c)).join('')}</div></div>
    <div class="sect"><h2>🛠️ My courses<small>Build your own and dare a friend to beat it.</small></h2><div class="cards">
      <div class="card new" data-h="new" tabindex="0" role="button"><div style="font-size:34px">＋</div>Build a course</div>
      <div class="card new" data-h="import" tabindex="0" role="button"><div style="font-size:34px">📥</div>Load a course code</div>
      ${mine.map(c => card(c, true)).join('')}</div></div></div>`;
  const all = BUILTIN.concat(mine);
  $$('#home .card[data-id]').forEach(el => drawMini($('canvas', el), all.find(c => c.id === el.dataset.id)));
}
function settings() {
  const st = SET();
  modal(`<h2>⚙️ Settings</h2>
    <label class="chk"><input type="checkbox" id="sSound" ${soundOn ? 'checked' : ''}> Sound effects</label>
    <label class="chk"><input type="checkbox" id="sDmg" ${st.damage ? 'checked' : ''}> Damage: hard landings and crashes hurt the bot</label>
    <label class="chk"><input type="checkbox" id="sCoach" ${st.coach ? 'checked' : ''}> Coach explains what went wrong after a run</label>
    <h3 style="margin-top:18px">🍎 For teachers</h3><p style="margin:4px 0 10px">Classroom ideas, how the physics works, and what gets saved.</p>
    <div class="acts" style="margin-top:0"><button id="sTeach">Open teacher notes</button><button id="sReset" class="danger">Reset all medals and best times</button></div>
    <div class="acts"><button class="primary" data-m="x" data-focus>Done</button></div>`);
  const save = () => { Store.set('set', { damage: $('#sDmg').checked, coach: $('#sCoach').checked }); soundOn = $('#sSound').checked; Store.set('sound', soundOn); };
  for (const id of ['sSound', 'sDmg', 'sCoach']) $('#' + id).onchange = save;
  $('#sTeach').onclick = teacherNotes;
  $('#sReset').onclick = () => { if (confirm('Erase every medal and best time on this device?')) { Store.set('best', {}); closeModal(); showHome(); } };
}
$('#home').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card')) { e.preventDefault(); e.target.click(); } });
$('#home').addEventListener('click', e => {
  const h = e.target.closest('[data-h]'), cardEl = e.target.closest('.card[data-id]'), cb = e.target.closest('[data-c]');
  if (h) {
    const a = h.dataset.h;
    if (a === 'new') openEditor(starterCourse());
    else if (a === 'import') importDialog();
    else if (a === 'how') howTo(); else if (a === 'log') notebook(); else if (a === 'set') settings(); else if (a === 'paint') paintDialog();
    return;
  }
  if (!cardEl) return;
  const id = cardEl.dataset.id, c = BUILTIN.find(c => c.id === id) || loadMyCourses().find(c => c.id === id); if (!c) return;
  if (cb) {
    if (cb.dataset.c === 'edit') openEditor(c);
    else if (cb.dataset.c === 'share') shareDialog(c);
    else if (cb.dataset.c === 'del') { if (confirm(`Delete "${c.name}"? This cannot be undone.`)) { deleteMyCourse(id); showHome(); } }
    return;
  }
  showGarage(c, 'home');
});
function howTo() {
  modal(`<h2>How to play</h2><p><b>1. Scout the course.</b> The shop shows what is ahead: hills, ice, gaps, crates.<br><b>2. Build your bot.</b> Pick a chassis, wheels, tires, motor, gearing, battery and gadgets. Stay inside the budget.<br><b>3. Send it.</b> Drive to the finish flag. Watch your health: long falls and hard crashes break the bot.<br><b>4. Improve.</b> Go back to the shop, change one thing, and try again.</p>
  <div class="keys"><kbd>→ / D</kbd><span>Drive forward</span><kbd>← / A</kbd><span>Reverse</span><kbd>E</kbd><span>Grapple Hook: grab or let go. Hold <b>↑</b> to reel in, <b>↓</b> to let rope out, <b>← →</b> to swing.</span>${PARTS.gadgets.filter(g => g.key && g.id !== 'hook').map(g => `<kbd>${g.key}</kbd><span>${g.name}: ${g.act.toLowerCase()}</span>`).join('')}<kbd>R</kbd><span>Back to the last checkpoint (+${RESET_PENALTY} seconds)</span><kbd>Backspace</kbd><span>Restart the course</span></div>
  <div class="acts"><button class="primary" data-m="x" data-focus>Got it</button></div>`);
}
function teacherNotes() {
  modal(`<h2>For teachers</h2><p>Every run is one turn of the engineering design loop: <b>ask</b> what the course demands, <b>plan</b> a build inside a budget, <b>test</b> it, read the evidence, and <b>improve</b>.</p>
  <p><b>The physics is real, not scripted.</b> Torque, gearing, wheel size, weight and friction are simulated, so the trade-offs students find are the true ones:</p>
  <ul style="color:var(--dim)"><li>Pushing force = torque ÷ wheel radius. Bigger wheels are faster but push less.</li><li>Gearing trades speed for torque. You never get both for free.</li><li>Traction = grip × weight on the driven wheels. Ballast and all-wheel drive help a strong motor actually use its strength.</li><li>Light bots jump higher and glide farther. Heavy bots push harder.</li></ul>
  <p><b>Ways to use it</b></p><ul style="color:var(--dim)"><li><b>One-variable tests.</b> Change only the gearbox, run Hill Climb three times, and graph time against gear.</li><li><b>Budget challenge.</b> Who can beat a course with the cheapest bot?</li><li><b>Course design.</b> Students build a course, prove it can be beaten, then trade share codes or links. A good course has more than one solution.</li><li><b>Notebook.</b> The Engineer's Notebook logs every attempt with the build and the coach's diagnosis. It prints.</li></ul>
  <p><b>Nothing is pre-picked.</b> Students start with an empty build bay, and the course info lists what is out there without saying what to buy. The coach (Settings) only explains a failure after it happens.</p><p>Everything saves in this browser only. No accounts, no data leaves the device.</p><div class="acts"><button class="primary" data-m="x" data-focus>Close</button></div>`);
}
function notebook() {
  const log = Store.get('log', []);
  modal(`<h2>📓 Engineer's notebook</h2><p>Your last ${log.length} test runs. Good engineers change one thing at a time and write down what happened.</p>
  ${log.length ? `<table><tr><th>Course</th><th>Build</th><th>Result</th><th>What we learned</th></tr>${log.slice().reverse().map(l => `<tr><td>${esc(l.course)}</td><td>${esc(l.build)}</td><td>${esc(l.result)}</td><td>${esc(l.notes)}</td></tr>`).join('')}</table>` : '<p>No runs yet. Go build something!</p>'}
  <div class="acts"><button class="primary" data-m="x" data-focus>Close</button><button data-m="print">🖨 Print</button><button id="clearLog" class="danger">Clear notebook</button></div>`);
  $('#clearLog').onclick = () => { if (confirm('Erase the whole notebook?')) { Store.set('log', []); closeModal(); } };
}
function shareDialog(c) {
  const code = courseToCode(c), link = location.href.split('#')[0] + '#c=' + code;
  modal(`<h2>Share “${esc(c.name)}”</h2><p>Send a friend this link, or have them paste the code into <b>Load a course code</b>.${c.par ? ` Your time to beat: <b>${fmtT(c.par)}s</b>.` : ' Tip: beat your own course first so friends have a time to chase.'}</p>
  <textarea readonly id="shareTxt" aria-label="Course code">${code}</textarea>
  <div class="acts"><button class="primary" id="cpLink" data-focus>Copy link</button><button id="cpCode">Copy code</button><button data-m="x">Close</button></div>`);
  const copy = (txt, what) => { (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(what + ' copied!'), () => { $('#shareTxt').value = txt; $('#shareTxt').select(); toast('Press Ctrl+C to copy'); }); };
  $('#cpLink').onclick = () => copy(link, 'Link'); $('#cpCode').onclick = () => copy(code, 'Code');
}
function importCourse(code) {
  const c = codeToCourse(code);
  if (loadMyCourses().some(m => m.id === c.id) || BUILTIN.some(b => b.id === c.id)) c.id = newCourse(1).id;
  saveMyCourse(c); return c;
}
function importDialog() {
  modal(`<h2>Load a course code</h2><p>Paste a code that starts with <b>BOT1.</b></p><textarea id="impTxt" data-focus aria-label="Paste course code"></textarea><div class="acts"><button class="primary" id="impGo">Load course</button><button data-m="x">Cancel</button></div>`);
  $('#impGo').onclick = () => { try { const c = importCourse($('#impTxt').value); closeModal(); showHome(); toast(`Loaded “${c.name}”`); } catch (e) { toast('That code did not work. Check you copied all of it.'); } };
}

/* ================= Shop (garage) ================= */
function showGarage(course, from) {
  App.course = course; App.from = from || App.from; setMode('garage'); App.G = null;
  const k = course.kind;
  $('#garage').innerHTML = `<div class="stripe"></div>
  <div class="gtop"><button data-g="back">← ${App.from === 'editor' ? 'Editor' : 'Courses'}</button><div><h2>Assembly Shop</h2><div style="font-size:13px;color:var(--dim)">Building for <b style="color:var(--ink)">${esc(course.name)}</b> <span class="tag ${course.boss ? 'boss' : k}">${course.boss ? 'legendary' : k}</span></div></div>
    <div class="sp"></div><div class="budget" id="gBudget"></div><button class="go" data-g="go" id="gGo">Send it ▶</button></div>
  <div class="gbody"><div class="gcol gleft"><canvas id="preview" width="660" height="420"></canvas>
      <div class="namerow"><input type="text" id="gName" maxlength="16" aria-label="Bot name" placeholder="Name your bot" value="${esc(App.cfg.name)}"><button class="small" data-g="strip" title="Take every part off and start again">🧹 Start over</button></div>
      <div class="tabs"><button data-tab="stats">📊 Stats</button><button data-tab="paint">🎨 Paint shop</button></div>
      <div id="gStats"></div><div id="gPaint" class="paint"></div></div>
    <div class="gcol" id="gParts"></div>
    <div class="gcol gright"><h3>What is out there</h3><canvas id="mini" width="560" height="140"></canvas><p style="font-size:13px;color:var(--dim);margin:8px 0 0">${esc(course.desc || '')}</p>
      <div class="chips">${analyzeCourse(course).map(i => `<span>${i[0]} ${i[1]}</span>`).join('')}</div><div id="gCoach"></div>
      <label class="chk"><input type="checkbox" id="gFree" ${App.free ? 'checked' : ''}> Free build (no budget, no medals)</label></div></div>`;
  drawMini($('#mini'), course);
  $('#gName').oninput = e => { App.cfg.name = e.target.value; saveCfg(); };
  $('#gFree').onchange = e => { App.free = e.target.checked; refreshGarage(); };
  if (SET().coach && App.lastTips && App.lastTips.id === course.id) $('#gCoach').innerHTML = `<div class="coach"><b>🧑‍🔧 Coach, after your last run:</b><ul>${App.lastTips.tips.map(t => `<li>${t}</li>`).join('')}</ul></div>`;
  bindPaint($('#gPaint'));
  refreshGarage();
}
const saveCfg = () => Store.set('bot', App.cfg);
function refreshGarage() {
  const cfg = App.cfg, s = botSpec(cfg), c = App.course;
  cfg.gadgets = s.gadgets.map(g => g.id);
  const sel = (key, p) => cfg[key] === p.id;
  const sec = (title, why, body) => `<div class="psec"><h3>${title}</h3><div class="why">${why}</div>${body}</div>`;
  const cards = (key, list, info) => `<div class="parts">${list.map(p => `<button class="part ${sel(key, p) ? 'on' : ''}" data-k="${key}" data-id="${p.id}" aria-pressed="${sel(key, p)}"><b><span>${p.icon ? p.icon + ' ' : ''}${p.name}</span><em>${p.cost ? '$' + p.cost : 'free'}</em></b><span>${p.desc}</span><i>${info(p)}</i></button>`).join('')}</div>`;
  const g = s.ge;
  const sc = $('#gParts'), keep = sc.scrollTop;
  sc.innerHTML =
    sec('1. Chassis', 'The frame everything bolts onto. Bigger frames carry more gadgets and take more hits, but weigh more.', cards('chassis', PARTS.chassis, p => `${p.mass} kg · ${p.slots} slots · ${p.hp} health`)) +
    sec('2. Wheels', 'Big wheels roll over obstacles and go faster. Small wheels turn the same motor into more push.', cards('wheels', PARTS.wheels, p => `${Math.round(p.r * 200)} cm across · ${p.mass} kg each`)) +
    sec('3. Tires', 'Grip is what turns motor power into motion. No grip, no go.', cards('tires', PARTS.tires, p => `Grip ${p.mu.toFixed(2)} · on ice ${p.ice.toFixed(2)}`)) +
    sec('4. Motor', 'Speed is how fast it spins. Torque is how hard it twists.', cards('motor', PARTS.motor, p => `Speed ${p.speed} · Torque ${p.torque} · ${p.mass} kg`)) +
    sec('5. Gearbox', 'Gears trade speed for torque. Slide toward Tractor to climb and push. Slide toward Overdrive to go fast.',
      `<div class="gearrow"><span>🐇 Speed</span><input type="range" min="0" max="${PARTS.gear.length - 1}" step="1" value="${cfg.gear}" id="gGear" aria-label="Gear ratio"><span>Torque 🐂</span></div>
       <div class="gearinfo"><b>${g.name}</b> gear: wheel speed ×${(1 / g.ratio).toFixed(2)}, torque ×${g.ratio.toFixed(2)}</div>`) +
    sec('6. Battery', 'Strong motors working hard drain it fast. A dead battery ends the run.', cards('battery', PARTS.battery, p => `${p.energy} kJ · ${p.mass} kg`)) +
    sec('7. Drive', 'Which wheels does the motor turn?', cards('drive', PARTS.drive, p => p.mass ? `+${p.mass} kg` : 'No extra weight')) +
    sec(`8. Gadgets <span style="color:var(--dim);font-weight:500;text-transform:none;letter-spacing:0">(${s.gadgets.length} of ${s.real.chassis ? s.ch.slots : 0} slots used)</span>`, 'Special tools for special problems. Your chassis decides how many you can carry.',
      ['Tools', 'Movement', 'Upgrades'].map(cat => `<div class="gcat">${cat}</div><div class="parts">${PARTS.gadgets.filter(p => p.cat === cat).map(p => `<button class="part ${s.has[p.id] ? 'on' : ''}" data-k="gadget" data-id="${p.id}" aria-pressed="${!!s.has[p.id]}"><b><span>${p.icon} ${p.name}</span><em>$${p.cost}</em></b><span>${p.desc}</span><i>${p.mass} kg${p.key ? ' · key: ' + p.key : ''}</i></button>`).join('')}</div>`).join(''));
  sc.scrollTop = keep;
  $('#gGear').oninput = e => { cfg.gear = +e.target.value; saveCfg(); refreshGarage(); $('#gGear').focus(); };
  const over = !App.free && s.cost > c.budget;
  $('#gBudget').className = 'budget' + (over ? ' over' : '');
  $('#gBudget').innerHTML = App.free ? `<div>Free build · cost <b>$${s.cost}</b></div>` : `<div>Budget: <b>$${s.cost}</b> of $${c.budget} ${over ? '— over budget!' : ''}</div><div class="bar"><i style="width:${clamp(s.cost / c.budget * 100, 0, 100)}%"></i></div>`;
  $('#gGo').disabled = over || !s.ready; $('#gGo').title = !s.ready ? 'Your bot still needs ' + s.missing.join(', ') + '.' : over ? 'Your bot costs more than the budget. Swap something for a cheaper part.' : '';
  $$('#garage .tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === App.gtab));
  $('#gStats').style.display = App.gtab === 'stats' ? '' : 'none'; $('#gPaint').style.display = App.gtab === 'paint' ? '' : 'none';
  const stat = (label, val, frac, note, tip) => `<div class="stat" title="${tip}"><div class="l"><span>${label}</span><b>${val}</b></div><div class="bar"><i style="width:${clamp(frac * 100, 2, 100)}%"></i></div>${note ? `<small>${note}</small>` : ''}</div>`;
  $('#gStats').innerHTML = !s.ready
    ? `<div class="coach"><b>Empty build bay.</b> Your bot still needs:<ul>${s.missing.map(m => `<li>${m}</li>`).join('')}</ul></div><p style="font-size:13px;color:var(--dim)">Parts so far: $${s.cost}. The numbers show up once it can drive.</p>`
    : stat('Weight', Math.round(s.mass) + ' kg', s.mass / 300, '', 'Heavy bots grip and push better but accelerate, climb and jump worse.') +
    stat('Top speed', Math.round(s.topSpeed * MPH) + ' mph', s.topSpeed / 30, '', 'Motor speed ÷ gear ratio × wheel size.') +
    stat('Pushing force', Math.round(s.push) + ' N', s.push / 2200, s.T / s.r > s.push + 1 ? 'Limited by grip. The motor is stronger than the tires can use.' : 'Limited by torque. The tires could handle more.', 'The smaller of: torque ÷ wheel radius, or grip × weight on the driven wheels.') +
    stat('Steepest hill', Math.round(s.climbDeg) + '°', s.climbDeg / 60, `Limited by ${s.limitedBy}.`, 'The steepest slope this bot can climb from a standstill. Steep ramps on the courses are 45°. Gentle ramps are about 27°.') +
    stat('Battery', s.energy + ' kJ', s.energy / 650, '', 'How much energy you carry.') +
    stat('Health', s.hp + (s.has.armor ? ' (armored)' : ''), s.hp / 220, '', 'How much damage the frame takes before it breaks.');
}
/* ---------- Paint shop: colours, patterns, faces, hats, words and pictures ---------- */
const Pad = { open: false, px: new Array(144).fill(''), col: '#ff5a36' };
const PAD_COLS = ['#ff5a36', '#ffc21a', '#7bd13b', '#2ad4c0', '#4d8dff', '#b46bff', '#ff6fb5', '#ffffff', '#20242b', '#8a5a2b'];
function paintHTML() {
  const c = App.cfg, sw = (key, cur) => `<div class="swatches">${BOT_COLORS.map(col => `<button style="background:${col}" class="${cur === col ? 'on' : ''}" data-p="${key}" data-v="${col}" aria-label="${key} ${col}"></button>`).join('')}<input type="color" data-pc="${key}" value="${/^#[0-9a-f]{6}$/i.test(cur || '') ? cur : '#ffc21a'}" aria-label="Pick any ${key} colour" title="Pick any colour"></div>`;
  const opts = (key, list) => `<div class="opts">${list.map(o => `<button class="${(c[key] || list[0][0]) === o[0] ? 'on' : ''}" data-p="${key}" data-v="${o[0]}">${o[1]}</button>`).join('')}</div>`;
  return `<h4>Body colour</h4>${sw('color', c.color)}<h4>Trim and pattern colour</h4>${sw('color2', c.color2)}<h4>Wheel colour</h4>${sw('hub', c.hub)}
    <h4>Pattern</h4>${opts('pattern', LOOKS.pattern)}<h4>Eyes</h4>${opts('eyes', LOOKS.eyes)}<h4>On top</h4>${opts('topper', LOOKS.topper)}
    <h4>Words on the flag</h4><input type="text" id="pWords" maxlength="14" placeholder="Type a slogan" value="${esc(c.words || '')}" aria-label="Words on your bot">
    <h4>Picture</h4><div class="stick">${LOOKS.stickers.map(e => `<button class="${c.pic === e ? 'on' : ''}" data-p="pic" data-v="${e}" aria-label="Sticker ${e}">${e}</button>`).join('')}</div>
    <div class="opts" style="margin-top:8px"><button data-pa="upload">📷 Use a photo</button><button data-pa="pad">${Pad.open ? 'Close drawing pad' : '✏️ Draw your own'}</button>${c.pic ? '<button data-pa="nopic">Remove picture</button>' : ''}</div>
    <input type="file" id="pFile" accept="image/*" hidden>
    ${Pad.open ? `<div class="pad"><canvas id="pPad" width="216" height="216" aria-label="Drawing pad"></canvas><div><div class="swatches">${PAD_COLS.map(col => `<button style="background:${col}" class="${Pad.col === col ? 'on' : ''}" data-pad="${col}" aria-label="Draw with ${col}"></button>`).join('')}<button class="${Pad.col === '' ? 'on' : ''}" data-pad="" style="background:#0e1217;font-size:11px" aria-label="Eraser">🧽</button></div><div class="opts" style="margin-top:8px"><button data-pa="usepad" class="primary">Put it on my bot</button><button data-pa="clearpad">Clear</button></div></div></div>` : ''}`;
}
function drawPad() {
  const pc = $('#pPad'); if (!pc) return; const g = pc.getContext('2d'); g.fillStyle = '#0e1217'; g.fillRect(0, 0, 216, 216);
  for (let i = 0; i < 144; i++) { g.fillStyle = Pad.px[i] || ((i + (i / 12 | 0)) % 2 ? '#1c232d' : '#252e3a'); g.fillRect((i % 12) * 18, (i / 12 | 0) * 18, 18, 18); }
}
function bindPaint(root) {
  const cfg = App.cfg, redraw = () => { root.innerHTML = paintHTML(); drawPad(); wire(); }, set = (k, v) => { cfg[k] = v; saveCfg(); redraw(); };
  const wire = () => {
    $('#pWords', root).oninput = e => { cfg.words = e.target.value; saveCfg(); };
    $$('[data-pc]', root).forEach(el => el.onchange = e => set(el.dataset.pc, e.target.value));
    $('#pFile', root).onchange = e => {
      const f = e.target.files[0]; if (!f) return; const rd = new FileReader();
      rd.onload = () => { const im = new Image(); im.onload = () => { const k = document.createElement('canvas'); k.width = k.height = 128; const g = k.getContext('2d'), m = Math.min(im.width, im.height); g.drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, 128, 128); set('pic', k.toDataURL('image/png')); }; im.src = rd.result; };
      rd.readAsDataURL(f);
    };
    const pc = $('#pPad', root); if (pc) {
      const dot = e => { const r = pc.getBoundingClientRect(), x = Math.floor((e.clientX - r.left) / r.width * 12), y = Math.floor((e.clientY - r.top) / r.height * 12); if (x >= 0 && x < 12 && y >= 0 && y < 12) { Pad.px[y * 12 + x] = Pad.col; drawPad(); } };
      pc.onpointerdown = e => { pc.setPointerCapture(e.pointerId); Pad.down = true; dot(e); }; pc.onpointermove = e => { if (Pad.down) dot(e); }; pc.onpointerup = pc.onpointercancel = () => { Pad.down = false; };
    }
  };
  root.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.p) return set(b.dataset.p, b.dataset.p === 'pic' && cfg.pic === b.dataset.v ? '' : b.dataset.v);
    if (b.dataset.pad != null) { Pad.col = b.dataset.pad; return redraw(); }
    const a = b.dataset.pa;
    if (a === 'upload') $('#pFile', root).click(); else if (a === 'nopic') set('pic', ''); else if (a === 'pad') { Pad.open = !Pad.open; redraw(); }
    else if (a === 'clearpad') { Pad.px.fill(''); drawPad(); }
    else if (a === 'usepad') { const k = document.createElement('canvas'); k.width = k.height = 96; const g = k.getContext('2d'); Pad.px.forEach((col, i) => { if (col) { g.fillStyle = col; g.fillRect((i % 12) * 8, (i / 12 | 0) * 8, 8, 8); } }); set('pic', k.toDataURL('image/png')); }
  };
  redraw();
}
function paintDialog() {
  modal(`<h2>🎨 My bot</h2><canvas id="preview2" width="660" height="420" style="width:100%;height:190px;border-radius:12px;background:linear-gradient(#2a3442,#161b22)"></canvas>
    <div class="namerow"><input type="text" id="pName" maxlength="16" placeholder="Name your bot" aria-label="Bot name" value="${esc(App.cfg.name)}"></div>
    <div id="pPaint" class="paint"></div><div class="acts"><button class="primary" data-m="x" data-focus>Done</button></div>`);
  $('#pName').oninput = e => { App.cfg.name = e.target.value; saveCfg(); };
  bindPaint($('#pPaint'));
}
$('#garage').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return; const cfg = App.cfg;
  if (b.dataset.g === 'back') return App.from === 'editor' ? openEditor(App.course) : showHome();
  if (b.dataset.g === 'go') return startRun();
  if (b.dataset.tab) { App.gtab = b.dataset.tab; return refreshGarage(); }
  if (b.dataset.g === 'strip') { if (confirm('Take every part off this bot? Your paint job stays.')) { Object.assign(cfg, { chassis: null, wheels: null, tires: null, motor: null, battery: null, drive: null, gear: 2, gadgets: [] }); saveCfg(); refreshGarage(); } return; }
  if (!b.dataset.k) return;
  const k = b.dataset.k, id = b.dataset.id;
  if (k === 'gadget') {
    const ch = PARTS.chassis.find(p => p.id === cfg.chassis), i = cfg.gadgets.indexOf(id); if (!ch) return toast('Pick a chassis first. Gadgets bolt onto it.'); const slots = ch.slots;
    if (i >= 0) cfg.gadgets.splice(i, 1);
    else if (cfg.gadgets.length >= slots) return toast(`No free slot. This chassis holds ${slots} gadget${slots > 1 ? 's' : ''}. Remove one first.`);
    else cfg.gadgets.push(id);
  } else {
    cfg[k] = id;
    if (k === 'chassis') { const sl = byId(PARTS.chassis, id).slots; if (cfg.gadgets.length > sl) { cfg.gadgets.length = sl; toast('Smaller chassis: some gadgets came off.'); } }
  }
  saveCfg(); refreshGarage();
  const again = $(`#gParts [data-k="${k}"][data-id="${id}"]`); if (again) again.focus({ preventScroll: true });
});
function renderPreview(ts, pc) {
  if (!pc) return; const c = pc.getContext('2d'), W = pc.width, H = pc.height, s = botSpec(App.cfg), has = k => !!s.real[k];
  c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, W, H);
  c.fillStyle = '#0e1217'; c.fillRect(0, H - 54, W, 54); c.fillStyle = '#ffc21a'; for (let x = -20; x < W; x += 56) { c.beginPath(); c.moveTo(x, H - 54); c.lineTo(x + 28, H - 54); c.lineTo(x + 14, H - 44); c.lineTo(x - 14, H - 44); c.fill(); }
  if (!has('chassis') && !has('wheels')) { c.fillStyle = '#5b6470'; c.font = '700 30px system-ui,sans-serif'; c.textAlign = 'center'; c.fillText('Empty build bay', W / 2, H / 2 - 30); c.font = '500 20px system-ui,sans-serif'; c.fillText('Pick a chassis to start building', W / 2, H / 2 + 6); return; }
  const tall = (App.cfg.words || App.cfg.pic) ? 2.6 : 1.6;
  const ppm = Math.min(150, W / (s.ch.len + s.r * 2 + (s.has.lance ? 5.4 : 3)), (H - 80) / (s.r * 2 + s.ch.ht + tall));
  c.setTransform(ppm, 0, 0, -ppm, W / 2, H - 54);
  const wy = -(s.ch.ht / 2 - 0.1), cy = s.r - wy + Math.sin(ts / 400) * 0.015, a = -ts / 900;
  if (!has('wheels')) { c.fillStyle = '#5b6470'; for (const sx of [-1, 1]) { c.beginPath(); c.moveTo(sx * s.wheelDX - 0.25, 0); c.lineTo(sx * s.wheelDX + 0.25, 0); c.lineTo(sx * s.wheelDX + 0.06, cy - s.ch.ht / 2); c.lineTo(sx * s.wheelDX - 0.06, cy - s.ch.ht / 2); c.fill(); } }
  drawBot(c, App.cfg, s, { x: 0, y: cy, a: 0, wheels: has('wheels') ? [{ x: -s.wheelDX, y: s.r, a }, { x: s.wheelDX, y: s.r, a }] : [] }, { look: Math.sin(ts / 1300), t: ts / 1000, noBody: !has('chassis'), noMotor: !has('motor'), noBatt: !has('battery') });
}

/* ================= Run ================= */
function startRun() {
  closeModal(); saveCfg(); if (!botSpec(App.cfg).ready) return toast('Finish building your bot first.');
  App.G = makeGame(App.course, JSON.parse(JSON.stringify(App.cfg)));
  if (!App.G.finish) { toast('This course has no finish flag yet.'); return openEditor(App.course); }
  setMode('run'); App.paused = false; App.shown = false; App.acc = 0; App.edge = {};
  const p = App.G.bot.chassis.getPosition(); App.cam = { x: p.x + 4, y: p.y + 2, ppm: VH / 20 };
  $('#hTL .nm').textContent = App.course.name;
  const s = App.G.spec, keys = [['→ ←', 'Drive / reverse']], tb = (code, label, aria) => `<button data-key="${code}" aria-label="${aria}">${label}</button>`;
  let tR = '';
  for (const g of s.gadgets) if (g.key) { keys.push([g.key, g.act]); tR += tb(g.code, g.icon, g.act); if (g.id === 'hook') { keys.push(['↑ ↓', 'Reel rope in / out'], ['→ ←', 'Swing while hanging']); tR += tb('ArrowUp', '⬆', 'Reel in'); } }
  keys.push(['R', `Checkpoint (+${RESET_PENALTY}s)`]);
  $('#hBR').innerHTML = keys.map(k => `<div><kbd>${k[0]}</kbd>${k[1]}</div>`).join('');
  $('#hFuelBox').style.display = s.has.rocket ? '' : 'none'; $('#hAmmoBox').style.display = s.has.cannon ? '' : 'none'; $('#hHpBox').style.display = App.G.dmgOn ? '' : 'none';
  $('#tL').innerHTML = tb('ArrowLeft', '◀', 'Reverse') + tb('ArrowRight', '▶', 'Drive');
  $('#tR').innerHTML = tR + tb('KeyR', '⟲', 'Checkpoint');
}
function leaveRun() { if (App.from === 'editor') openEditor(App.course); else showHome(); }
$('#hTR').addEventListener('click', e => { const a = e.target.closest('button')?.dataset.a; e.target.blur(); if (a === 'restart') startRun(); else if (a === 'shop') { logRun(false); showGarage(App.course, App.from); } else if (a === 'pause') togglePause(); });
function togglePause() { if (App.mode !== 'run' || App.G.done) return; App.paused = !App.paused; if (App.paused) modal(`<h2>Paused</h2><div class="acts"><button class="primary" id="unp" data-focus>Keep going</button><button data-m="retry">⟲ Restart</button><button data-m="shop">🔧 Back to the shop</button><button data-m="home">Quit</button></div>`), $('#unp').onclick = () => { closeModal(); App.paused = false; }; }
$('#touch').addEventListener('pointerdown', e => { const b = e.target.closest('button'); if (!b) return; e.preventDefault(); b.setPointerCapture(e.pointerId); App.keys[b.dataset.key] = true; App.edge[b.dataset.key] = true; });
for (const ev of ['pointerup', 'pointercancel']) $('#touch').addEventListener(ev, e => { const b = e.target.closest('button'); if (b) App.keys[b.dataset.key] = false; });
addEventListener('keydown', e => {
  if (e.target.matches('input,textarea,select')) return;
  if (App.mode === 'run') {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Backspace'].includes(e.code)) e.preventDefault();
    if ($('#modal').classList.contains('on')) { if (e.code === 'Escape' && App.paused) { closeModal(); App.paused = false; } return; }
    if (!e.repeat) App.edge[e.code] = true; App.keys[e.code] = true;
    if (e.code === 'Backspace') startRun(); if (e.code === 'KeyP' || e.code === 'Escape') togglePause();
  } else if (App.mode === 'editor') edKey(e);
  else if (e.code === 'Escape') closeModal();
});
addEventListener('keyup', e => { App.keys[e.code] = false; });
addEventListener('blur', () => { App.keys = {}; });
function readInput() {
  const k = App.keys, e = App.edge;
  return { x: ((k.ArrowRight || k.KeyD) ? 1 : 0) - ((k.ArrowLeft || k.KeyA) ? 1 : 0), up: !!(k.ArrowUp || k.KeyW), down: !!(k.ArrowDown || k.KeyS), boost: !!(k.ShiftLeft || k.ShiftRight), hook: !!e.KeyE, jump: !!e.Space, right: !!e.KeyF, reset: !!e.KeyR, fire: !!e.KeyC, vault: !!e.KeyV, sledge: !!e.KeyB, shield: !!e.KeyJ, balloon: !!k.KeyN, grab: !!e.KeyG, horn: !!e.KeyH, magnet: !!k.KeyM, prop: !!k.KeyX, climb: !!k.KeyZ };
}
function coachTips(G) {
  const st = G.stats, s = G.spec, t = [], n = (v, w) => `${v} time${v > 1 ? 's' : ''}`;
  if (st.dead) t.push('Your <b>battery ran out</b>. Fit a bigger battery, or build lighter so the motor does less work.');
  if (st.stall > 1.2) t.push(`Your motor <b>stalled</b> for ${st.stall.toFixed(1)}s: it could not turn the wheels. You need more torque. Slide the gearbox toward Tractor, fit a stronger motor, or try smaller wheels.`);
  if (st.slip > 2) t.push(`Your wheels <b>spun without gripping</b> for ${st.slip.toFixed(1)}s. Grippier tires, All-Wheel Drive or Ballast will put that power on the ground.`);
  if (st.flips) t.push(`You <b>flipped over</b> ${n(st.flips)}. A longer chassis, Ballast, or easing off the power keeps you upright. A Roll Cage lets you recover.`);
  if (st.fell) t.push(`You <b>fell off</b> ${n(st.fell)}. Hit gaps faster, or bring a Grapple Hook, Vault Pole, Propeller or Glider Wing.`);
  if (st.smashed) t.push(`Your bot was <b>smashed</b> ${n(st.smashed)}. Long falls and hard crashes do damage. Slow down, or think about what would soften the hit.`);
  if (st.sank) t.push(`You <b>sank</b> ${n(st.sank)}. Pontoon Floats cross water. So does going over it.`);
  if (st.burned) t.push(`You <b>hit lava</b> ${n(st.burned)}. Look for a zip line or grapple point above it.`);
  if (G.done && G.done.win && !t.length) t.push(st.maxSpeed > s.topSpeed * 0.92 ? 'Clean run, and you were at <b>top speed</b> much of the way. A faster gear or bigger wheels could cut your time.' : 'Clean run! Can you do it faster, or with a cheaper bot?');
  if (!t.length) t.push('Look at where the bot got stuck. What did that spot demand: speed, torque, grip, or a gadget?');
  return t;
}
function logRun(win) {
  const G = App.G; if (!G || !G.started || G.logged) return; G.logged = true;
  const s = G.spec, tips = coachTips(G), log = Store.get('log', []);
  App.lastTips = { id: App.course.id, tips };
  log.push({ course: App.course.name, build: `${App.cfg.name}: ${s.ch.name}, ${s.wh.name} ${s.ti.name} wheels, ${s.mo.name}, ${s.ge.name} gear, ${s.ba.name}, ${s.dr.id.toUpperCase()}${s.gadgets.length ? ', ' + s.gadgets.map(g => g.name).join(' + ') : ''} ($${s.cost}, ${Math.round(s.mass)} kg)`, result: win ? `Finished in ${fmtT(G.done.time)}s` + (G.resets ? ` (${G.resets} reset${G.resets > 1 ? 's' : ''})` : '') : 'Did not finish', notes: tips.join(' ').replace(/<[^>]+>/g, '') });
  Store.set('log', log.slice(-40));
}
function showResult() {
  const G = App.G, c = App.course, d = G.done; App.shown = true; logRun(d.win);
  const tips = SET().coach ? `<div class="coach"><b>🧑‍🔧 Coach says:</b><ul>${coachTips(G).map(t => `<li>${t}</li>`).join('')}</ul></div>` : '';
  const acts = `<div class="acts"><button class="primary" data-m="shop" data-focus>🔧 Back to the shop</button><button data-m="retry">⟲ Run it again</button><button data-m="home">${App.from === 'editor' ? 'Back to editor' : 'All courses'}</button></div>`;
  if (!d.win) return modal(`<h2>Out of power!</h2><p>${esc(App.cfg.name)} stopped before the finish.</p>${tips}${acts}`);
  let extra = '';
  if (App.free) extra = '<p>Free build run: no medal recorded.</p>';
  else {
    const medal = medalFor(c, d.time), best = Store.get('best', {}), old = best[c.id], rank = { gold: 3, silver: 2, bronze: 1, finish: 0 };
    if (!old || d.time < old.time) { best[c.id] = { time: d.time, medal: old && rank[old.medal] > rank[medal] ? old.medal : medal }; Store.set('best', best); extra = old ? `<p>New best! Your old time was ${fmtT(old.time)}s.</p>` : ''; }
    else extra = `<p>Your best is still ${fmtT(old.time)}s.</p>`;
    if (c.medals) extra += `<p>🥇 under ${c.medals[0]}s · 🥈 under ${c.medals[1]}s</p>`;
    if (!c.builtin) { const mine = loadMyCourses().find(m => m.id === c.id); if (mine && App.from === 'editor' && (!c.par || d.time < c.par)) { c.par = +d.time.toFixed(2); saveMyCourse(c); extra += '<p>✔ Course verified! Your time is now the time to beat.</p>'; } }
    extra = `<div class="res"><div class="big">${MEDAL_ICON[medal]}</div><div><div class="tm">${fmtT(d.time)}s</div>${G.penalties ? `<div style="color:var(--o);font-size:13px">includes +${G.penalties}s for ${G.resets} reset${G.resets > 1 ? 's' : ''}</div>` : ''}</div></div>` + extra;
  }
  modal(`<h2>Course complete!</h2>${App.free ? `<div class="res"><div class="tm">${fmtT(d.time)}s</div></div>` : ''}${extra}${tips}${acts}`);
}
function updateHUD() {
  const G = App.G, b = G.bot, s = G.spec, L = G.live;
  $('#hTL .tm').textContent = fmtT(G.clock + G.penalties);
  $('#hTL .pn').textContent = G.started ? (G.penalties ? `+${G.penalties}s penalties` : '') : 'Timer starts when you move';
  $('#hSpd').textContent = Math.round((L.speed || 0) * MPH);
  const e = b.energy / s.energy; $('#hBat').style.width = e * 100 + '%'; $('#hBat').style.background = e > 0.25 ? 'var(--g)' : 'var(--o)';
  $('#hLoad').style.width = (L.load || 0) * 100 + '%'; $('#hStall').classList.toggle('on', !!L.stall); $('#hSlip').classList.toggle('on', !!L.slip);
  if (s.has.rocket) $('#hFuel').style.width = clamp(b.fuel / 3, 0, 1) * 100 + '%';
  if (G.dmgOn) { const h = clamp(b.hp / s.hp, 0, 1); $('#hHp').style.width = h * 100 + '%'; $('#hHp').style.background = h > 0.35 ? 'var(--g)' : 'var(--o)'; }
  const ex = []; if (s.has.shield) ex.push('Shields ' + b.shields); if (s.has.balloon) ex.push('Helium ' + Math.max(0, b.gas).toFixed(1) + 's'); $('#hExtra').textContent = ex.join(' · ');
  if (s.has.cannon) $('#hAmmo').textContent = '● '.repeat(b.ammo) + '○ '.repeat(6 - b.ammo);
  const px = b.chassis.getPosition().x; $('#hProg i').style.width = clamp((px - G.start.x) / (G.finish.x - G.start.x), 0, 1) * 100 + '%';
  const m = $('#hMsg'); let txt = '', cls = '';
  if (G.flash) { txt = G.flash.text; cls = G.flash.good ? 'good' : 'bad'; }
  else if (L.flipped) { txt = s.has.righter ? 'Flipped! Press F to roll back over' : 'Flipped! Press R to go back to the checkpoint'; cls = 'bad'; }
  else if (b.energy <= 0) { txt = 'Battery dead!'; cls = 'bad'; }
  else if (b.rope) txt = b.rope.ent.t === 'zip' ? 'Press E to let go' : '← → swing · ↑ reel in · E let go';
  else if (!G.started) txt = 'Press → to go!';
  if (m.textContent !== txt) m.textContent = txt; m.className = cls;
}
function runFrame(dt) {
  const G = App.G;
  if (!App.paused) {
    App.acc += dt; let n = 0;
    while (App.acc >= DT && n < 4) { stepGame(G, readInput()); App.edge = {}; App.acc -= DT; n++; }
    if (n === 4) App.acc = 0;
    if (G.done) { G.doneT = (G.doneT || 0) + dt; if (!App.shown && G.doneT > (G.done.win ? 0.9 : 0.2)) showResult(); }
  }
  const p = G.bot.chassis.getPosition(), v = G.bot.chassis.getLinearVelocity(), sp = v.length(), cam = App.cam;
  const k = 1 - Math.pow(0.002, dt);
  cam.x = lerp(cam.x, p.x + clamp(v.x * 0.45, -7, 7) + 2 + (App.keys.KeyT && G.spec.has.scout ? 24 : 0), k); cam.y = lerp(cam.y, p.y + 2 + clamp(v.y * 0.12, -3, 3), k);
  cam.ppm = lerp(cam.ppm, Math.min(VH, VW * 0.7) / (17 + Math.min(sp, 30) * 0.4), k * 0.5);
  renderGame(ctx, G, cam, VW, VH, DPR);
  updateHUD();
}

/* ================= Course editor ================= */
const Ed = { course: null, tool: { k: 'tile', shape: 1 }, mat: DIRT, cam: { x: 20, y: 13, ppm: 26 }, G: null, dirty: true, pend: null, undo: [], hover: null, ptr: null };
function starterCourse() {
  const c = newCourse(120); c.author = App.cfg.name;
  for (let x = 0; x < c.w; x++) for (let y = 0; y < 10; y++) tset(c, x, y, tcode(1, DIRT));
  c.objs.push({ t: 'start', x: 5.5, y: 10 }, { t: 'finish', x: c.w - 6.5, y: 10 });
  return c;
}
const shapeSvg = s => `<svg viewBox="-0.1 -0.1 1.2 1.2" aria-hidden="true"><polygon points="${SHAPES[s].map(p => p[0] + ',' + (1 - p[1])).join(' ')}" fill="#b98850" stroke="#fff" stroke-width=".06"/></svg>`;
const SHAPE_NAMES = [, 'Block', 'Steep ramp up', 'Steep ramp down', 'Gentle ramp up (low part)', 'Gentle ramp up (high part)', 'Gentle ramp down (high part)', 'Gentle ramp down (low part)', 'Half block (ledge)'];
function openEditor(course) {
  if (course.builtin) return;
  Ed.course = course; Ed.dirty = true; Ed.pend = null; Ed.undo = []; setMode('editor'); App.G = null; App.course = course;
  const st = course.objs.find(o => o.t === 'start'); Ed.cam.x = (st ? st.x : 6) + 12; Ed.cam.y = (st ? st.y : 10) + 4;
  $('#edTop').innerHTML = `<button data-e="exit">← Save & exit</button><input type="text" id="eName" maxlength="40" aria-label="Course name" value="${esc(course.name)}">
    <select id="eKind" aria-label="Course type">${['speed', 'strength', 'crazy'].map(k => `<option value="${k}" ${course.kind === k ? 'selected' : ''}>${k[0].toUpperCase() + k.slice(1)}</option>`).join('')}</select>
    <label style="font-size:13px;color:var(--dim)">Budget $ <input type="number" id="eBudget" min="200" max="9999" step="50" value="${course.budget}"></label>
    <span style="font-size:13px;color:var(--dim)">Length <button class="small" data-e="shorter" aria-label="Shorter course">−</button> <b id="eLen">${course.w}</b> m <button class="small" data-e="longer" aria-label="Longer course">＋</button></span>
    <select id="eSky" aria-label="Scenery"><option value="">Scenery: auto</option>${SKIES.map(k => `<option value="${k}" ${course.sky === k ? 'selected' : ''}>${SKY_NAMES[k]}</option>`).join('')}</select>
    <div class="sp"></div><button data-e="paint">🎨 My bot</button><button data-e="undo" title="Ctrl+Z">↶ Undo</button><button data-e="share">🔗 Share</button><button class="go" style="font-size:15px;padding:8px 16px" data-e="test">▶ Test it</button>`;
  $('#eName').oninput = e => { course.name = e.target.value || 'My Course'; };
  $('#eKind').onchange = e => { course.kind = e.target.value; Ed.dirty = true; };
  $('#eSky').onchange = e => { course.sky = e.target.value; Ed.dirty = true; };
  $('#eBudget').onchange = e => { course.budget = clamp(+e.target.value || 1000, 200, 9999); e.target.value = course.budget; };
  drawPalette();
}
function drawPalette() {
  const t = Ed.tool, on = c => c ? ' on' : '';
  $('#edPal').innerHTML = `<h4>Ground</h4><div class="tg">${[1, 2, 3, 8, 4, 5, 6, 7].map(s => `<button class="tool${on(t.k === 'tile' && t.shape === s)}" data-tool="tile" data-shape="${s}" title="${SHAPE_NAMES[s]}" aria-label="${SHAPE_NAMES[s]}">${shapeSvg(s)}</button>`).join('')}</div>
   <h4>Surface</h4><div class="tg">${[['Dirt', DIRT, '🟫'], ['Ice', ICE, '🧊'], ['Mud', MUD, '🟤'], ['Bouncy rubber', RUBBER, '🩷'], ['Soft sand', SAND, '🏖️']].map(m => `<button class="tool${on(Ed.mat === m[1])}" data-mat="${m[1]}" title="${m[0]}" aria-label="${m[0]} surface">${m[2]}</button>`).join('')}</div>
   <h4>Hazards & tools</h4><div class="tg"><button class="tool wide${on(t.k === 'water')}" data-tool="water">🌊 Water</button><button class="tool wide${on(t.k === 'lava')}" data-tool="lava">🌋 Lava</button>
     <button class="tool wide${on(t.k === 'erase')}" data-tool="erase">🧽 Erase</button><button class="tool wide${on(t.k === 'hand')}" data-tool="hand">✋ Move view</button></div>
   <h4>Things</h4><div class="ol">${Object.keys(OBJ).map(k => `<button class="tool${on(t.k === 'obj' && t.t === k)}" data-tool="obj" data-t="${k}" title="${OBJ[k].tip}">${OBJ[k].icon} ${OBJ[k].name}</button>`).join('')}</div>`;
  edTip();
}
function edTip() {
  const t = Ed.tool; let s = 'Click and drag to paint ground. Right-drag or use ✋ to move the view. Scroll to zoom.';
  if (t.k === 'obj') s = OBJ[t.t].icon + ' ' + OBJ[t.t].name + ': ' + (Ed.pend ? 'now click where it ends.' : OBJ[t.t].tip);
  else if (t.k === 'erase') s = 'Click a thing to remove it, or drag to erase ground.';
  else if (t.k === 'hand') s = 'Drag to move around. Scroll to zoom.';
  $('#edTip span').textContent = s;
}
$('#edPal').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.mat != null) { Ed.mat = +b.dataset.mat; if (Ed.tool.k !== 'tile') Ed.tool = { k: 'tile', shape: 1 }; }
  else if (b.dataset.tool === 'tile') Ed.tool = { k: 'tile', shape: +b.dataset.shape };
  else if (b.dataset.tool === 'obj') Ed.tool = { k: 'obj', t: b.dataset.t };
  else Ed.tool = { k: b.dataset.tool };
  Ed.pend = null; drawPalette();
});
$('#edTop').addEventListener('click', e => {
  const a = e.target.closest('button')?.dataset.e, c = Ed.course; if (!a) return;
  if (a === 'exit') { saveMyCourse(c); showHome(); }
  else if (a === 'undo') edUndo();
  else if (a === 'paint') paintDialog();
  else if (a === 'share') { saveMyCourse(c); shareDialog(c); }
  else if (a === 'longer' || a === 'shorter') {
    const w = clamp(c.w + (a === 'longer' ? 20 : -20), 40, 400); if (w === c.w) return; edSnap();
    const old = c.w; resizeCourse(c, w); if (w > old) for (let x = old; x < w; x++) for (let y = 0; y < c.h; y++) tset(c, x, y, tget(c, old - 1, y));
    c.objs = c.objs.filter(o => o.x < w && (o.x2 == null || o.x2 < w) || o.t === 'finish'); const f = c.objs.find(o => o.t === 'finish'); if (f && f.x >= w) f.x = w - 4.5;
    $('#eLen').textContent = w; Ed.dirty = true;
  } else if (a === 'test') {
    if (!c.objs.some(o => o.t === 'start') || !c.objs.some(o => o.t === 'finish')) return toast('Your course needs a Start and a Finish.');
    saveMyCourse(c); showGarage(c, 'editor');
  }
});
function edSnap() { Ed.undo.push(JSON.stringify(packCourse(Ed.course))); if (Ed.undo.length > 40) Ed.undo.shift(); }
function edUndo() { const s = Ed.undo.pop(); if (!s) return toast('Nothing to undo.'); const c = unpackCourse(JSON.parse(s)); Ed.course.tiles = c.tiles; Ed.course.w = c.w; Ed.course.objs = c.objs; $('#eLen').textContent = c.w; Ed.dirty = true; }
function edKey(e) {
  if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ') { e.preventDefault(); return edUndo(); }
  if (e.code === 'Escape') { Ed.pend = null; closeModal(); edTip(); }
  const d = 4; if (e.code === 'ArrowLeft' || e.code === 'KeyA') Ed.cam.x -= d; if (e.code === 'ArrowRight' || e.code === 'KeyD') Ed.cam.x += d; if (e.code === 'ArrowUp' || e.code === 'KeyW') Ed.cam.y += d; if (e.code === 'ArrowDown' || e.code === 'KeyS') Ed.cam.y -= d;
  edClampCam();
}
function edClampCam() { const c = Ed.course; Ed.cam.x = clamp(Ed.cam.x, 0, c.w); Ed.cam.y = clamp(Ed.cam.y, 0, c.h); Ed.cam.ppm = clamp(Ed.cam.ppm, 6, 70); }
const edWorld = e => ({ x: Ed.cam.x + (e.clientX - VW / 2) / Ed.cam.ppm, y: Ed.cam.y - (e.clientY - VH / 2) / Ed.cam.ppm });
function edSnapPos(t, w) {
  const d = OBJ[t]; if (t === 'bridge') return { x: Math.round(w.x), y: Math.round(w.y) };
  return d.air ? { x: Math.floor(w.x) + 0.5, y: Math.floor(w.y) + 0.5 } : { x: Math.floor(w.x) + 0.5, y: Math.floor(w.y) };
}
function edApply(w, first) {
  const c = Ed.course, t = Ed.tool, cx = Math.floor(w.x), cy = Math.floor(w.y);
  if (t.k === 'tile') tset(c, cx, cy, tcode(t.shape, Ed.mat));
  else if (t.k === 'water') tset(c, cx, cy, WATER);
  else if (t.k === 'lava') tset(c, cx, cy, LAVA);
  else if (t.k === 'erase') {
    if (first) { let bi = -1, bd = 1.1; c.objs.forEach((o, i) => { const d = Math.min(Math.hypot(o.x - w.x, o.y + (OBJ[o.t].air ? 0 : 0.6) - w.y), o.x2 != null ? Math.hypot(o.x2 - w.x, o.y2 - w.y) : 9); if (d < bd) { bd = d; bi = i; } }); if (bi >= 0) { c.objs.splice(bi, 1); Ed.erasedObj = true; Ed.dirty = true; return; } Ed.erasedObj = false; }
    if (!Ed.erasedObj) tset(c, cx, cy, 0);
  } else if (t.k === 'obj' && first) {
    const d = OBJ[t.t], p = edSnapPos(t.t, w);
    if (d.two) { if (!Ed.pend) { Ed.pend = p; edTip(); return; } if (Math.hypot(p.x - Ed.pend.x, p.y - Ed.pend.y) < 2) return toast('Make it longer.'); c.objs.push({ t: t.t, x: Ed.pend.x, y: Ed.pend.y, x2: p.x, y2: p.y }); Ed.pend = null; edTip(); }
    else { if (d.one) c.objs = c.objs.filter(o => o.t !== t.t); if (c.objs.length >= 400) return toast('That is a lot of things! Remove some first.'); const no = { t: t.t, x: p.x, y: p.y }; if (d.text) { const tx = prompt('What should the sign say?', 'Good luck!'); if (tx == null) return; no.txt = tx.slice(0, 30); Ed.ptr = null; } c.objs.push(no); }
  }
  Ed.dirty = true;
}
cv.addEventListener('contextmenu', e => e.preventDefault());
cv.addEventListener('pointerdown', e => {
  if (App.mode !== 'editor') return; cv.setPointerCapture(e.pointerId);
  const pan = e.button !== 0 || Ed.tool.k === 'hand';
  Ed.ptr = { pan, x: e.clientX, y: e.clientY };
  if (!pan) { if (!(Ed.tool.k === 'obj' && OBJ[Ed.tool.t].two && !Ed.pend)) edSnap(); edApply(edWorld(e), true); }
});
cv.addEventListener('pointermove', e => {
  if (App.mode !== 'editor') return; Ed.hover = edWorld(e); const p = Ed.ptr; if (!p) return;
  if (p.pan) { Ed.cam.x -= (e.clientX - p.x) / Ed.cam.ppm; Ed.cam.y += (e.clientY - p.y) / Ed.cam.ppm; p.x = e.clientX; p.y = e.clientY; edClampCam(); }
  else if (Ed.tool.k !== 'obj') {
    // paint every cell between the last point and this one
    const a = edWorld({ clientX: p.x, clientY: p.y }), b = Ed.hover, n = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) * 2) || 1;
    for (let i = 1; i <= n; i++) edApply({ x: lerp(a.x, b.x, i / n), y: lerp(a.y, b.y, i / n) }, false);
    p.x = e.clientX; p.y = e.clientY;
  }
});
for (const ev of ['pointerup', 'pointercancel']) cv.addEventListener(ev, () => { Ed.ptr = null; });
cv.addEventListener('wheel', e => { if (App.mode !== 'editor') return; e.preventDefault(); const before = edWorld(e); Ed.cam.ppm = clamp(Ed.cam.ppm * (e.deltaY < 0 ? 1.12 : 0.89), 6, 70); const after = edWorld(e); Ed.cam.x += before.x - after.x; Ed.cam.y += before.y - after.y; edClampCam(); }, { passive: false });
function editorFrame(ts) {
  const c = Ed.course;
  if (Ed.dirty || !Ed.G) { Ed.G = makeGame(c, null); Ed.dirty = false; }
  Ed.G.t = ts / 1000;
  const cam = Ed.cam;
  renderGame(ctx, Ed.G, cam, VW, VH, DPR, {
    after(g, x0, x1, y0, y1) {
      const lw = 1 / cam.ppm;
      if (cam.ppm > 13) { g.strokeStyle = 'rgba(255,255,255,.13)'; g.lineWidth = lw; g.beginPath(); for (let x = Math.max(0, Math.floor(x0)); x <= Math.min(c.w, x1); x++) { g.moveTo(x, Math.max(0, y0)); g.lineTo(x, Math.min(c.h, y1)); } for (let y = Math.max(0, Math.floor(y0)); y <= Math.min(c.h, y1); y++) { g.moveTo(Math.max(0, x0), y); g.lineTo(Math.min(c.w, x1), y); } g.stroke(); }
      g.strokeStyle = '#ffc21a'; g.lineWidth = lw * 3; g.strokeRect(0, 0, c.w, c.h);
      g.setLineDash([0.3, 0.3]); g.lineWidth = lw * 2; g.strokeStyle = 'rgba(255,255,255,.6)';
      for (const o of c.objs) {
        g.beginPath();
        if (o.t === 'lift') g.rect(o.x - 1.95, o.y - 0.4 + 5, 3.9, 0.4); else if (o.t === 'ferry') g.rect(o.x - 1.95 + 6, o.y - 0.4, 3.9, 0.4);
        else if (o.t === 'hammer') g.arc(o.x, o.y, 4.4, -Math.PI / 2 - 1.15, -Math.PI / 2 + 1.15); else if (o.t === 'fan') g.rect(o.x - 1.7, o.y, 3.4, 9);
        else if (o.t === 'spinner') g.arc(o.x, o.y + 3.4, 3.1, 0, 7); else if (o.t === 'anchor') g.arc(o.x, o.y, HOOK_RANGE, 0, 7);
        else if (o.t === 'blower') g.rect(o.x - 10.5, o.y, 10, 5); else if (o.t === 'springboard') { g.moveTo(o.x, o.y + 0.5); g.quadraticCurveTo(o.x + 6, o.y + 7, o.x + 12, o.y); } else if (o.t === 'launcher') { g.moveTo(o.x, o.y + 1); g.quadraticCurveTo(o.x + 14, o.y + 20, o.x + 28, o.y); }
        else if (o.t === 'plate' || o.t === 'switch') { let bg = null, bd = 1e9; for (const q of c.objs) if (q.t === 'gate') { const d = Math.hypot(q.x - o.x, q.y - o.y); if (d < bd) { bd = d; bg = q; } } if (bg) { g.moveTo(o.x, o.y); g.lineTo(bg.x, bg.y + 2); } }
        g.stroke();
      }
      g.setLineDash([]);
      const h = Ed.hover, t = Ed.tool; if (!h) return;
      if (t.k === 'obj') {
        const p = edSnapPos(t.t, h); g.fillStyle = 'rgba(53,208,127,.9)'; g.beginPath(); g.arc(p.x, p.y, 0.22, 0, 7); g.fill();
        if (Ed.pend) { g.strokeStyle = '#35d07f'; g.lineWidth = lw * 3; g.beginPath(); g.moveTo(Ed.pend.x, Ed.pend.y); g.lineTo(p.x, p.y); g.stroke(); }
        wtext(g, OBJ[t.t].icon, p.x, p.y + 1, 1.1);
      } else if (t.k !== 'hand') { g.strokeStyle = t.k === 'erase' ? '#ff5a36' : '#35d07f'; g.lineWidth = lw * 3; g.strokeRect(Math.floor(h.x), Math.floor(h.y), 1, 1); }
    },
  });
}

/* ================= Main loop ================= */
let lastTs = 0;
function frame(ts) {
  const dt = Math.min(0.05, (ts - lastTs) / 1000 || 0); lastTs = ts;
  try {
    if (App.mode === 'run' && App.G) runFrame(dt);
    else if (App.mode === 'editor') editorFrame(ts);
    else if (App.mode === 'garage') renderPreview(ts, $('#preview'));
    if ($('#modal').classList.contains('on')) renderPreview(ts, $('#preview2'));
  } catch (err) { console.error(err); }
  requestAnimationFrame(frame);
}
soundOn = Store.get('sound', false);
(function boot() {
  const m = location.hash.match(/#c=(BOT1\.[A-Za-z0-9_\-]+)/);
  if (m) { try { const c = importCourse(m[1]); history.replaceState(null, '', location.pathname + location.search); showGarage(c, 'home'); toast(`Loaded “${c.name}”`); } catch (e) { showHome(); toast('That course link did not work.'); } }
  else showHome();
  requestAnimationFrame(frame);
})();
