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

  const KEYMAPS = {
    k1: { left: ['KeyA'], right: ['KeyD'], up: ['KeyW'], down: ['KeyS'], jump: ['Space'], attack: ['KeyF'], special: ['KeyG'], dodge: ['KeyH', 'ShiftLeft'], swap: ['KeyR'], ult: ['KeyE'], taunt: ['KeyQ'], pause: ['Escape'] },
    k2: { left: ['ArrowLeft'], right: ['ArrowRight'], up: ['ArrowUp'], down: ['ArrowDown'], jump: ['Numpad0', 'Enter', 'NumpadEnter'], attack: ['Numpad1', 'Comma', 'KeyK'], special: ['Numpad2', 'Period', 'KeyL'], dodge: ['Numpad3', 'Slash', 'Semicolon', 'ShiftRight'], swap: ['Numpad4', 'KeyJ'], ult: ['Numpad5', 'KeyU'], taunt: ['Numpad6', 'KeyO'], pause: ['Backspace'] },
  };
  const anyKey = (list) => list.some((c) => keys.has(c));

  // Touch: a left-side stick and four right-side buttons (only shown when a slot uses touch).
  const touch = { x: 0, y: 0, jump: false, attack: false, special: false, dodge: false, swap: false, ult: false, pause: false };
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

  function readPad(i) {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const p = pads && pads[i];
    const none = { x: 0, y: 0, jump: false, attack: false, special: false, dodge: false, pause: false };
    if (!p) return none;
    const b = (n) => !!(p.buttons[n] && p.buttons[n].pressed);
    const dz = (v) => (Math.abs(v) < 0.4 ? 0 : Math.sign(v));
    let x = dz(p.axes[0] || 0), y = dz(p.axes[1] || 0);
    if (b(14)) x = -1; if (b(15)) x = 1; if (b(12)) y = -1; if (b(13)) y = 1;
    // A = jump, X = attack, B = special, Y = switch form (jump for one-form fighters), bumpers/triggers = dodge, Start = pause.
    return { x, y, jump: b(0) || b(3), attack: b(2), special: b(1), dodge: b(4) || b(5) || b(6) || b(7), swap: b(3), ult: b(10) || b(11), taunt: b(8), pause: b(9) };
  }

  MM.readDevice = function (dev) {
    if (dev === 'k1' || dev === 'k2') return readKeys(dev);
    if (dev === 'touch') return { ...touch, jump: touch.jump || touch.y < -0.6 };
    if (dev && dev[0] === 'p') return readPad(+dev.slice(1));
    return { x: 0, y: 0, jump: false, attack: false, special: false, dodge: false, pause: false };
  };

  MM.connectedPads = function () {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const out = [];
    for (let i = 0; i < 4; i++) if (pads[i]) out.push(i);
    return out;
  };

  MM.DEVICE_NAMES = { k1: 'Keyboard 1 (WASD)', k2: 'Keyboard 2 (Arrows)', p0: 'Controller 1', p1: 'Controller 2', p2: 'Controller 3', p3: 'Controller 4', touch: 'Touch screen' };
  MM.isTouch = matchMedia('(pointer: coarse)').matches;

  // Build the on-screen touch controls once.
  MM.setupTouch = function (el) {
    el.innerHTML = '<div class="stick"><div class="knob"></div></div>' +
      '<div class="tbtns"><button data-b="dodge">⛨</button><button data-b="special">★</button><button data-b="attack">✊</button><button data-b="jump">⤒</button></div>' +
      '<button class="tswap" data-b="swap">⇄</button><button class="tult" data-b="ult">ULT</button>' +
      '<button class="tpause" data-b="pause">❚❚</button>';
    const stick = el.querySelector('.stick'), knob = el.querySelector('.knob');
    let sid = null;
    const moveStick = (t) => {
      const r = stick.getBoundingClientRect();
      let dx = (t.clientX - (r.left + r.width / 2)) / (r.width / 2), dy = (t.clientY - (r.top + r.height / 2)) / (r.height / 2);
      const len = Math.hypot(dx, dy); if (len > 1) { dx /= len; dy /= len; }
      knob.style.transform = `translate(${dx * 40}px, ${dy * 40}px)`;
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
