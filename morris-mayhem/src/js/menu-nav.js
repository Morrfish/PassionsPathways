// Controller (and arrow-key) navigation for every menu screen.
// Stick / D-pad: move the highlight to the nearest button, dropdown or checkbox in that direction.
// A: press it. On a dropdown, A starts changing it (stick picks the option, A or B finishes).
// B: back. Start: the screen's main action. Keyboard: arrows move, Enter presses, Escape goes back.
window.MM = window.MM || {};
(function () {
  const SEL = 'button:not([disabled]), select:not([disabled]), input[type=checkbox]:not([disabled])';
  let editing = null; // the dropdown being changed with the stick
  const prev = {}; const held = {};

  function screenEl() { return document.querySelector('.screen.show'); }
  function items() {
    const s = screenEl(); if (!s) return [];
    return [...s.querySelectorAll(SEL)].filter((el) => el.offsetParent !== null && el.getClientRects().length && !el.closest('[hidden]'));
  }
  function setFocus(el) {
    document.querySelectorAll('.padfocus').forEach((e) => e !== el && e.classList.remove('padfocus'));
    if (!el) return;
    el.classList.add('padfocus'); el.focus({ preventScroll: true });
    el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  function current() { const a = document.activeElement; return items().includes(a) ? a : null; }
  function first() { const list = items(); return list.find((e) => e.hasAttribute('data-autofocus')) || list.find((e) => e.classList.contains('big')) || list[0]; }

  function move(dx, dy) {
    if (editing) { stepSelect(editing, dx || dy); return; }
    const list = items(), cur = current();
    if (!cur) { setFocus(first()); return; }
    const r = cur.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    let best = null, bestScore = Infinity;
    for (const el of list) {
      if (el === cur) continue;
      const q = el.getBoundingClientRect(), x = q.left + q.width / 2, y = q.top + q.height / 2;
      const along = dx ? (x - cx) * dx : (y - cy) * dy;          // distance in the pressed direction
      if (along <= 4) continue;
      const across = dx ? Math.abs(y - cy) : Math.abs(x - cx);    // how far off the line it is
      const overlap = dx ? (q.top < r.bottom && q.bottom > r.top) : (q.left < r.right && q.right > r.left);
      const score = along + across * (overlap ? 0.5 : 2.5);
      if (score < bestScore) { bestScore = score; best = el; }
    }
    if (best) { setFocus(best); MM.sfx && MM.sfx('select'); }
  }
  function stepSelect(sel, d) {
    const n = sel.options.length; if (!n) return;
    sel.selectedIndex = (sel.selectedIndex + (d > 0 ? 1 : -1) + n) % n;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    MM.sfx && MM.sfx('select');
    // the screen may redraw right away (e.g. fighter select); keep editing the same dropdown
    if (!sel.isConnected) { editing = refind(sel); if (editing) { editing.classList.add('editing'); setFocus(editing); } }
  }
  function selectorFor(el) {
    if (el.id) return '#' + el.id;
    const slot = el.closest('[data-slot]');
    if (slot && el.dataset.k) return `[data-slot="${slot.dataset.slot}"] [data-k="${el.dataset.k}"]`;
    for (const a of ['f', 'mv', 'hero', 'go']) if (el.dataset[a]) return `.screen.show [data-${a}="${el.dataset[a]}"]`;
    return null;
  }
  function refind(el) {
    if (el.id) return document.getElementById(el.id);
    const slot = el.closest('[data-slot]'), k = el.dataset.k;
    return slot && k ? document.querySelector(`[data-slot="${slot.dataset.slot}"] [data-k="${k}"]`) : null;
  }
  function press() {
    const cur = current();
    if (!cur) { setFocus(first()); return; }
    if (cur.tagName === 'SELECT') { editing = editing ? null : cur; cur.classList.toggle('editing', !!editing); return; }
    const keep = selectorFor(cur), screenBefore = screenEl();
    cur.click();
    // screens that redraw their buttons: put the highlight back on the same control (or the first one on a new screen)
    requestAnimationFrame(() => {
      if (current()) return;
      const again = screenEl() === screenBefore && keep ? document.querySelector(keep) : null;
      setFocus(again && items().includes(again) ? again : first());
    });
  }
  function back() {
    if (editing) { editing.classList.remove('editing'); editing = null; return; }
    const s = screenEl(); if (!s) return;
    const b = s.querySelector('.back, #resume, #sceneSkip') || (s.id === 'results' ? s.querySelector('[data-go="title"]:not([hidden] *), #storyMap') : null);
    if (b && b.offsetParent !== null) b.click();
  }

  // called every frame from the main loop while a menu is showing
  MM.menuNavTick = function (inMatch) {
    if (inMatch || (MM.arenaMaker && MM.arenaMaker.active)) { editing = null; return; } // the Arena Maker reads the pad itself
    if (MM.capturingInput) { const pads = MM.pads(); for (let i = 0; i < 4; i++) { const p = pads[i]; if (p) prev[i] = { dir: 'held', a: true, b: true }; } return; } // Settings is waiting for a button press
    const pads = MM.pads();
    for (let i = 0; i < 4; i++) {
      const p = pads[i]; if (!p) continue;
      if (MM.cursorDevs && MM.cursorDevs.has('p' + i) && screenEl() && screenEl().id === 'select') continue; // this pad drives a pointer
      const b = (n) => !!(p.buttons[n] && p.buttons[n].pressed);
      const ax = p.axes[0] || 0, ay = p.axes[1] || 0;
      const dir = b(14) || ax < -0.5 ? 'L' : b(15) || ax > 0.5 ? 'R' : b(12) || ay < -0.5 ? 'U' : b(13) || ay > 0.5 ? 'D' : null;
      const now = performance.now(), pv = prev[i] || {};
      if (dir && (dir !== pv.dir || now > (held[i] || 0))) {
        held[i] = now + (dir !== pv.dir ? 380 : 120); // hold to repeat
        move(dir === 'L' ? -1 : dir === 'R' ? 1 : 0, dir === 'U' ? -1 : dir === 'D' ? 1 : 0);
      }
      if (b(0) && !pv.a) press();
      if (b(1) && !pv.b) back();
      prev[i] = { dir, a: b(0), b: b(1) };
    }
    if (editing && !editing.isConnected) { editing = refind(editing); if (editing) { editing.classList.add('editing'); setFocus(editing); } }
  };
  // keyboard arrows on menus (a focused dropdown keeps its own arrow behaviour unless you're editing it with a pad)
  addEventListener('keydown', (e) => {
    const s = screenEl(); if (!s || s.id === 'match' || MM.capturingInput) return;
    if (s.id === 'select' && MM.cursorDevs && MM.cursorDevs.has('k2')) return; // arrows drive player 2's pointer
    const a = document.activeElement;
    const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (arrows[e.key] && !(a && a.tagName === 'SELECT' && !editing) && !(a && a.tagName === 'INPUT' && a.type !== 'checkbox')) { e.preventDefault(); move(...arrows[e.key]); }
  });
  // a mouse/touch click clears the controller highlight so it doesn't linger
  addEventListener('pointerdown', () => { document.querySelectorAll('.padfocus').forEach((e) => e.classList.remove('padfocus')); if (editing) { editing.classList.remove('editing'); editing = null; } });
  MM.menuFocusFirst = () => requestAnimationFrame(() => { if (MM.pads().length) setFocus(first()); });
})();
