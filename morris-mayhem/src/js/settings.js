// Settings: button mapping for controllers and both keyboards.
// Pick a device, choose Change next to an action, then press the button (or key) you want for it.
// Menus always keep A = choose and B = back (and Enter / Escape on a keyboard), so nobody can get stuck.
window.MM = window.MM || {};
(function () {
  const $ = (q) => document.querySelector(q);
  const C = MM.controls;
  const LABELS = { jump: 'Jump', attack: 'Attack', special: 'Special', dodge: 'Dodge', swap: 'Switch form', ult: 'Ultimate', taunt: 'Taunt', pause: 'Pause',
    left: 'Move left', right: 'Move right', up: 'Up (also jumps)', down: 'Down' };
  const DEVS = ['pad', 'k1', 'k2'], DEV_NAMES = { pad: 'Controllers', k1: 'Keyboard 1', k2: 'Keyboard 2' };
  let dev = 'pad', wait = null; // wait = { action, until, padBefore }

  function rows() { return (dev === 'pad' ? [] : C.KEY_MOVES).concat(C.ACTIONS); }
  function draw() {
    $('#setDev').innerHTML = `Mapping: <b>${DEV_NAMES[dev]}</b>`;
    $('#setNote').textContent = dev === 'pad'
      ? 'One mapping for every controller. The stick and D-pad always move. Menus always use A to choose and B to go back.'
      : 'Choose Change, then press the key you want. Escape cancels.';
    $('#setRows').innerHTML = rows().map((a) => {
      const w = wait && wait.action === a;
      return `<div class="setrow${w ? ' waiting' : ''}"><span class="act">${LABELS[a]}</span><span class="cur">${w ? (dev === 'pad' ? 'Press a controller button…' : 'Press a key…') : C.names(dev, a)}</span>`
        + `<button data-set="${a}">${w ? 'Cancel' : 'Change'}</button></div>`;
    }).join('');
    drawHowto();
  }
  // How to play: the controls table always shows the current buttons
  function drawHowto() {
    const t = $('#howtoTable'); if (!t) return;
    const k = (d, list) => list.map((a) => C.names(d, a)).join(' / ');
    const row = (label, a) => `<tr><td>${label}</td><td>${C.names('k1', a)}</td><td>${C.names('k2', a)}</td><td>${C.names('pad', a)}</td></tr>`;
    t.innerHTML = '<tr><th></th><th>Keyboard 1</th><th>Keyboard 2</th><th>Controller</th></tr>'
      + `<tr><td>Move</td><td>${k('k1', ['left', 'right'])}</td><td>${k('k2', ['left', 'right'])}</td><td>Stick / D-pad</td></tr>`
      + `<tr><td>Jump (3 jumps)</td><td>${C.names('k1', 'up')} or ${C.names('k1', 'jump')}</td><td>${C.names('k2', 'up')} or ${C.names('k2', 'jump')}</td><td>${C.names('pad', 'jump')}</td></tr>`
      + row('Attack', 'attack') + row('Special', 'special') + row('Dodge', 'dodge') + row('Switch form', 'swap')
      + row('Ultimate (meter full)', 'ult') + row('Taunt', 'taunt') + row('Pause', 'pause')
      + '<tr><td colspan="4" class="hint">Change any of these in Settings.</td></tr>';
  }
  function padsDown() {
    const out = new Set(), pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (const p of pads) if (p) p.buttons.forEach((b, i) => { if (b.pressed) out.add(p.index + ':' + i); });
    return out;
  }
  function start(action) {
    wait = { action, until: performance.now() + 8000, padBefore: padsDown() };
    MM.capturingInput = true; draw(); tick();
  }
  function stop() { wait = null; MM.capturingInput = false; draw(); }
  function tick() { // watch the controllers for a new press while waiting
    if (!wait) return;
    if (performance.now() > wait.until) { stop(); return; }
    if (dev === 'pad') {
      const now = padsDown();
      for (const k of now) {
        const btn = +k.split(':')[1];
        if (wait.padBefore.has(k) || btn > 11) continue; // still held from choosing Change; D-pad/Home stay for moving
        const a = wait.action; C.set('pad', a, btn); MM.sfx && MM.sfx('select'); stop();
        // wait for that button to be let go before the menus read it again
        const hold = () => { if (padsDown().has(k)) { MM.capturingInput = true; requestAnimationFrame(hold); } else MM.capturingInput = false; };
        hold(); return;
      }
      for (const k of [...wait.padBefore]) if (!now.has(k)) wait.padBefore.delete(k);
    }
    requestAnimationFrame(tick);
  }
  addEventListener('keydown', (e) => {
    if (!wait || dev === 'pad') return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (e.code !== 'Escape') { C.set(dev, wait.action, e.code); MM.sfx && MM.sfx('select'); }
    stop();
  }, true);

  document.addEventListener('click', (e) => {
    const b = e.target.closest('#setRows [data-set]');
    if (b) { if (wait && wait.action === b.dataset.set) stop(); else start(b.dataset.set); return; }
    if (e.target.closest('#setDev')) { if (wait) stop(); dev = DEVS[(DEVS.indexOf(dev) + 1) % DEVS.length]; MM.sfx && MM.sfx('select'); draw(); return; }
    if (e.target.closest('#setReset')) { if (wait) stop(); C.reset(dev); MM.sfx && MM.sfx('select'); draw(); return; }
    if (e.target.closest('#settings .back')) { if (wait) stop(); }
  });
  MM.drawSettings = draw;
  addEventListener('load', drawHowto);
  drawHowto();
})();
