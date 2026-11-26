// Input: keyboard (2 players), gamepads (up to 4), touch buttons (phone/tablet).
// Every device gives the same shape: { x, y, jump, attack, special, dodge, pause }
// x/y are -1..1 (y = -1 means up). Buttons are true while held; the engine works out presses.
window.MM = window.MM || {};
(function () {
  const keys = new Set();
  addEventListener('keydown', (e) => {
    keys.add(e.code);
    if (/^(Arrow|Space)/.test(e.code)) e.preventDefault();
  });
  addEventListener('keyup', (e) => keys.delete(e.code));
  addEventListener('blur', () => keys.clear());

  const KEY_DEFAULTS = {
    k1: { left: ['KeyA'], right: ['KeyD'], up: ['KeyW'], down: ['KeyS'], jump: ['Space'], attack: ['KeyF'], special: ['KeyG'], dodge: ['KeyH', 'ShiftLeft'], swap: ['KeyR'], ult: ['KeyE'], taunt: ['KeyQ'], pause: ['Escape'] },
    k2: { left: ['ArrowLeft'], right: ['ArrowRight'], up: ['ArrowUp'], down: ['ArrowDown'], jump: ['Numpad0', 'Enter', 'NumpadEnter'], attack: ['Numpad1', 'Comma', 'KeyK'], special: ['Numpad2', 'Period', 'KeyL'], dodge: ['Numpad3', 'Slash', 'Semicolon', 'ShiftRight'], swap: ['Numpad4', 'KeyJ'], ult: ['Numpad5', 'KeyU'], taunt: ['Numpad6', 'KeyO'], pause: ['Backspace'] },
  };
  // Controller buttons (standard layout): 0 A, 1 B, 2 X, 3 Y, 4 LB, 5 RB, 6 LT, 7 RT, 8 Back, 9 Start, 10/11 stick clicks.
  // Y jumps too (for fighters with one form) and switches form for fighters with two.
  const PAD_DEFAULT = { jump: [0, 3], attack: [2], special: [1], dodge: [4, 5, 6, 7], swap: [3], ult: [10, 11], taunt: [8], pause: [9] };
  // Button mapping from Settings, saved in this browser: each controller (Controller 1-4) and each keyboard has its own
  const loadMap = (k, d) => { try { const v = JSON.parse(localStorage.getItem('mm_' + k)); return v && typeof v === 'object' ? Object.assign(JSON.parse(JSON.stringify(d)), v) : JSON.parse(JSON.stringify(d)); } catch (e) { return JSON.parse(JSON.stringify(d)); } };
  const saveMap = (k, v) => { try { localStorage.setItem('mm_' + k, JSON.stringify(v)); } catch (e) {} };
  const oldShared = loadMap('padmap', PAD_DEFAULT); // the earlier single mapping becomes every controller's starting point
  const padMaps = [0, 1, 2, 3].map((i) => loadMap('padmap' + i, oldShared));
  const KEYMAPS = { k1: loadMap('keymap_k1', KEY_DEFAULTS.k1), k2: loadMap('keymap_k2', KEY_DEFAULTS.k2) };
  MM.controls = {
    ACTIONS: ['jump', 'attack', 'special', 'dodge', 'swap', 'ult', 'taunt', 'pause'],
    KEY_MOVES: ['left', 'right', 'up', 'down'],
    isPad: (dev) => /^p\d$/.test(dev),
    get(dev) { return this.isPad(dev) ? padMaps[+dev[1]] : KEYMAPS[dev]; },
    storeKey(dev) { return this.isPad(dev) ? 'padmap' + dev[1] : 'keymap_' + dev; },
    // set one action to one button/key; it comes off any other action that had it
    set(dev, action, code) {
      const m = this.get(dev);
      for (const a in m) if (a !== action) m[a] = m[a].filter((c) => c !== code);
      m[action] = [code];
      saveMap(this.storeKey(dev), m);
    },
    reset(dev) {
      if (this.isPad(dev)) padMaps[+dev[1]] = JSON.parse(JSON.stringify(PAD_DEFAULT));
      else KEYMAPS[dev] = JSON.parse(JSON.stringify(KEY_DEFAULTS[dev]));
      saveMap(this.storeKey(dev), this.get(dev));
    },
    PAD_NAMES: ['A', 'B', 'X', 'Y', 'LB', 'RB', 'LT', 'RT', 'Back / Select', 'Start', 'Left stick click', 'Right stick click'],
    keyName(c) {
      const named = { Space: 'Space', Escape: 'Esc', Backspace: 'Backspace', Enter: 'Enter', NumpadEnter: 'Num Enter', ShiftLeft: 'Left Shift', ShiftRight: 'Right Shift', ControlLeft: 'Left Ctrl', ControlRight: 'Right Ctrl', AltLeft: 'Left Alt', AltRight: 'Right Alt', Tab: 'Tab',
        ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓', Comma: ',', Period: '.', Slash: '/', Semicolon: ';', Quote: "'", BracketLeft: '[', BracketRight: ']', Backslash: '\\', Minus: '-', Equal: '=', Backquote: '`' };
      if (named[c]) return named[c];
      if (/^Key[A-Z]$/.test(c)) return c.slice(3);
      if (/^Digit\d$/.test(c)) return c.slice(5);
      if (/^Numpad/.test(c)) return 'Num ' + c.slice(6);
      return c;
    },
    names(dev, action) {
      const list = this.get(dev)[action] || [];
      if (!list.length) return '(none)';
      return list.map((c) => (this.isPad(dev) ? this.PAD_NAMES[c] || 'Button ' + c : this.keyName(c))).join(' or ');
    },
  };
  const anyKey = (list) => list.some((c) => keys.has(c));

  // Touch: a left-side stick and four right-side buttons (only shown when a slot uses touch).
  const touch = { x: 0, y: 0, jump: false, attack: false, special: false, dodge: false, swap: false, ult: false, taunt: false, pause: false };
  MM.touch = touch;

  function readKeys(id) {
    const m = KEYMAPS[id];
    return {
      x: (anyKey(m.right) ? 1 : 0) - (anyKey(m.left) ? 1 : 0),
      y: (anyKey(m.down) ? 1 : 0) - (anyKey(m.up) ? 1 : 0),
      // Up also jumps (like Smash/Brawlhalla); the jump key works too.
      jump: anyKey(m.jump) || anyKey(m.up),
      attack: anyKey(m.attack), special: anyKey(m.special), dodge: anyKey(m.dodge), swap: anyKey(m.swap), ult: anyKey(m.ult), taunt: anyKey(m.taunt), pause: anyKey(m.pause),
    };
  }

  // Controller 1-4 = the 1st-4th controller actually plugged in, in order. Browsers can leave gaps in their own
  // numbering (after a reconnect, or mixing brands they may sit in slots 0, 3, 4, 5), so slots 0-3 can't be trusted.
  MM.pads = function () {
    const raw = navigator.getGamepads ? navigator.getGamepads() : [];
    const out = []; for (const p of raw) if (p && p.connected !== false) out.push(p);
    return out.slice(0, 4);
  };
  function readPad(i) {
    const pads = MM.pads();
    const p = pads && pads[i];
    const none = { x: 0, y: 0, jump: false, attack: false, special: false, dodge: false, pause: false };
    if (!p) return none;
    const b = (n) => !!(p.buttons[n] && p.buttons[n].pressed);
    const dz = (v) => (Math.abs(v) < 0.4 ? 0 : Math.sign(v));
    let x = dz(p.axes[0] || 0), y = dz(p.axes[1] || 0);
    if (b(14)) x = -1; if (b(15)) x = 1; if (b(12)) y = -1; if (b(13)) y = 1;
    // buttons from Settings (default: A jump, X attack, B special, Y switch form, bumpers/triggers dodge, Start pause)
    const m = padMaps[i] || PAD_DEFAULT, any = (a) => (m[a] || []).some(b);
    return { x, y, jump: any('jump'), attack: any('attack'), special: any('special'), dodge: any('dodge'), swap: any('swap'), ult: any('ult'), taunt: any('taunt'), pause: any('pause') };
  }

  MM.readDevice = function (dev) {
    if (dev === 'k1' || dev === 'k2') return readKeys(dev);
    if (dev === 'touch') return { ...touch, jump: touch.jump || touch.y < -0.6 };
    if (dev && dev[0] === 'p') return readPad(+dev.slice(1));
    return { x: 0, y: 0, jump: false, attack: false, special: false, dodge: false, pause: false };
  };

  MM.connectedPads = function () {
    const pads = MM.pads();
    const out = [];
    for (let i = 0; i < 4; i++) if (pads[i]) out.push(i);
    return out;
  };

  MM.DEVICE_NAMES = { k1: 'Keyboard 1 (WASD)', k2: 'Keyboard 2 (Arrows)', p0: 'Controller 1', p1: 'Controller 2', p2: 'Controller 3', p3: 'Controller 4', touch: 'Touch screen' };
  MM.isTouch = matchMedia('(pointer: coarse)').matches;

  // Build the on-screen touch controls once.
  MM.setupTouch = function (el) {
    // ChatGPT touch art (img/ui/touch-*.png); the labels stay for screen readers
    const b = (k, cls, label) => `<button class="${cls}" data-b="${k}" aria-label="${label}"><img src="img/ui/touch-${k === 'ult' ? 'ultimate' : k}.png" alt=""></button>`;
    el.innerHTML = '<div class="stick"><div class="knob"></div></div>' +
      `<div class="tbtns">${b('dodge', '', 'Dodge')}${b('special', '', 'Special')}${b('attack', '', 'Attack')}${b('jump', '', 'Jump')}</div>` +
      b('swap', 'tswap', 'Switch form') + b('ult', 'tult', 'Ultimate') + b('taunt', 'ttaunt', 'Taunt') + b('pause', 'tpause', 'Pause');
    const stick = el.querySelector('.stick'), knob = el.querySelector('.knob');
    let sid = null;
    const moveStick = (t) => {
      const r = stick.getBoundingClientRect();
      let dx = (t.clientX - (r.left + r.width / 2)) / (r.width / 2), dy = (t.clientY - (r.top + r.height / 2)) / (r.height / 2);
      const len = Math.hypot(dx, dy); if (len > 1) { dx /= len; dy /= len; }
      knob.style.transform = `translate(${dx * 42}px, ${dy * 42}px)`;
      touch.x = Math.abs(dx) > 0.35 ? Math.sign(dx) : 0;
      touch.y = Math.abs(dy) > 0.45 ? Math.sign(dy) : 0;
    };
    stick.addEventListener('touchstart', (e) => { sid = e.changedTouches[0].identifier; moveStick(e.changedTouches[0]); e.preventDefault(); }, { passive: false });
    stick.addEventListener('touchmove', (e) => { for (const t of e.changedTouches) if (t.identifier === sid) moveStick(t); e.preventDefault(); }, { passive: false });
    const endStick = (e) => { for (const t of e.changedTouches) if (t.identifier === sid) { sid = null; touch.x = touch.y = 0; knob.style.transform = ''; } };
    stick.addEventListener('touchend', endStick); stick.addEventListener('touchcancel', endStick);
    el.querySelectorAll('[data-b]').forEach((btn) => {
      const k = btn.dataset.b;
      btn.addEventListener('touchstart', (e) => { touch[k] = true; btn.classList.add('on'); e.preventDefault(); }, { passive: false });
      const up = () => { touch[k] = false; btn.classList.remove('on'); };
      btn.addEventListener('touchend', up); btn.addEventListener('touchcancel', up);
    });
  };
})();
