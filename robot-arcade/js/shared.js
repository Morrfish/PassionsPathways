/* Robot Code Arcade - shared engine: code parser, runner, editor, 3D stage, camera views.
   Every game page loads three.min.js, then this file, then its own game file. */
(function () {
  'use strict';
  const RA = (window.RA = {});
  const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
  RA.V3 = V3;
  RA.speed = 1;

  /* ---------------- small helpers ---------------- */
  RA.$ = (sel, root) => (root || document).querySelector(sel);
  RA.el = function (tag, attrs, html) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    if (html != null) e.innerHTML = html;
    return e;
  };
  RA.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  RA.store = {
    get(k, d) { try { const v = localStorage.getItem('ra.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('ra.' + k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };
  RA.lerp = (a, b, t) => a + (b - a) * t;

  /* A crash/stop that ends the program with a friendly message. */
  class Crash extends Error { constructor(msg) { super(msg); this.crash = true; } }
  RA.Crash = Crash;
  RA.crash = msg => { throw new Crash(msg); };

  /* ---------------- tweens (all animation goes through here, so speed works) ---------------- */
  const tweens = [];
  RA.ease = {
    inOut: t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    linear: t => t,
    in: t => t * t,
    out: t => 1 - (1 - t) * (1 - t),
    back: t => { const c = 1.7; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
  };
  RA.tween = (ms, fn, ease) => new Promise(res => tweens.push({ t: 0, ms: Math.max(1, ms), fn, ease: ease || RA.ease.inOut, res }));
  RA.wait = ms => RA.tween(ms, () => { });
  function stepTweens(dt) {
    for (let i = tweens.length - 1; i >= 0; i--) {
      const tw = tweens[i];
      tw.t += dt * 1000 * RA.speed;
      const k = Math.min(1, tw.t / tw.ms);
      tw.fn(tw.ease(k), k);
      if (k >= 1) { tweens.splice(i, 1); tw.res(); }
    }
  }

  /* ---------------- sound (tiny synth, no files) ---------------- */
  let actx = null;
  RA.sound = RA.store.get('sound', true);
  RA.beep = function (freq, ms, type, vol, slide) {
    if (!RA.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
      o.type = type || 'square'; o.frequency.setValueAtTime(freq, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + ms / 1000);
      g.gain.setValueAtTime(vol || 0.06, t); g.gain.exponentialRampToValueAtTime(0.0001, t + ms / 1000);
      o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + ms / 1000 + .02);
    } catch (e) { /* no audio */ }
  };
  RA.sfx = {
    step: () => RA.beep(420, 60, 'square', .03),
    whirr: () => RA.beep(160, 260, 'sawtooth', .025, 120),
    grab: () => RA.beep(300, 120, 'square', .05, 600),
    bad: () => { RA.beep(220, 180, 'sawtooth', .06, 90); },
    win: () => { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => RA.beep(f, 160, 'square', .05), i * 110)); },
    big: () => { [392, 523, 659, 784, 988, 1175, 1568].forEach((f, i) => setTimeout(() => RA.beep(f, 150, 'triangle', .07), i * 90)); }
  };

  /* ---------------- parser ----------------
     defs: [{ name, words:['rotate','left'], aliases:[['turn','left']], arg:'number'|'none', min, max, help, example }]
     Supports:  # comments,  // comments,  repeat N ... end  (or  repeat N {  ...  } )                      */
  function lev(a, b) {
    const m = []; for (let i = 0; i <= a.length; i++) { m[i] = [i]; }
    for (let j = 1; j <= b.length; j++) m[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return m[a.length][b.length];
  }
  RA.parse = function (src, defs, opts) {
    opts = opts || {};
    const lines = src.replace(/\r/g, '').split('\n');
    const root = { body: [] }, stack = [root];
    const errors = [];
    let count = 0; // lines of real code (for "par" scoring)
    lines.forEach((raw, li) => {
      const line = li + 1;
      let s = raw.replace(/(#|\/\/).*$/, '').trim().toLowerCase();
      if (!s) return;
      s = s.replace(/[,;]+$/, '').replace(/[()]/g, ' ');
      let toks = s.split(/\s+/).filter(Boolean);
      // allow "right2" style typos -> "right 2"
      toks = toks.flatMap(t => { const m = t.match(/^([a-z]+)(-?\d*\.?\d+)$/); return m ? [m[1], m[2]] : [t]; });
      if (!toks.length) return;
      count++;
      const top = stack[stack.length - 1];
      if (toks[0] === 'end' || toks[0] === '}') {
        if (toks.length > 1) { errors.push({ line, msg: '"end" should be on its own line.' }); return; }
        if (stack.length === 1) { errors.push({ line, msg: 'This "end" has no "repeat" to close.' }); return; }
        stack.pop(); return;
      }
      if (toks[0] === 'repeat' || toks[0] === 'loop') {
        if (opts.noRepeat) { errors.push({ line, msg: 'This machine does not know "repeat". Write each step out.' }); return; }
        if (toks[toks.length - 1] === '{') toks.pop();
        if (toks[toks.length - 1] === 'times') toks.pop();
        const n = Number(toks[1]);
        if (toks.length !== 2 || !Number.isInteger(n)) { errors.push({ line, msg: 'Write repeat with a number, like:  repeat 4' }); return; }
        if (n < 1 || n > 50) { errors.push({ line, msg: 'repeat needs a number from 1 to 50.' }); return; }
        const blk = { type: 'repeat', n, line, body: [] };
        top.body.push(blk); stack.push(blk); return;
      }
      // find the command with the longest matching word list
      let best = null, bestLen = 0;
      defs.forEach(d => {
        [d.words].concat(d.aliases || []).forEach(w => {
          if (w.length > bestLen && w.every((x, i) => toks[i] === x)) { best = d; bestLen = w.length; }
        });
      });
      if (!best && opts.hints) {
        const hk = Object.keys(opts.hints).find(h => h === toks[0]) || Object.keys(opts.hints).find(h => h.length > 4 && lev(h, toks[0]) <= 2);
        if (hk) { errors.push({ line, msg: opts.hints[hk] }); return; }
      }
      if (!best) {
        const said = toks.slice(0, 2).join(' ');
        let sug = null, sd = 99;
        defs.forEach(d => {
          const w = d.words.join(' ');
          const dd = Math.min(lev(said, w), lev(toks[0], d.words[0]));
          if (dd < sd) { sd = dd; sug = d; }
        });
        errors.push({ line, msg: 'I don\'t know "' + raw.trim() + '".' + (sug && sd <= 3 ? ' Did you mean "' + sug.example + '"?' : ' Check the command list.') });
        return;
      }
      const rest = toks.slice(bestLen);
      const cmd = { type: 'cmd', name: best.name, line, def: best };
      if (best.arg === 'number') {
        if (!rest.length) {
          if (best.def != null) cmd.n = best.def;
          else { errors.push({ line, msg: '"' + best.words.join(' ') + '" needs a number, like:  ' + best.example }); return; }
        } else {
          const n = Number(rest[0]);
          if (best.decimals) {
            if (!/^\d*\.?\d+$/.test(rest[0]) || !isFinite(n)) { errors.push({ line, msg: '"' + rest[0] + '" is not a number. Try:  ' + best.example + '  or  ' + best.words.join(' ') + ' 1.5' }); return; }
            if ((rest[0].split('.')[1] || '').length > 2) { errors.push({ line, msg: 'Use at most 2 digits after the decimal point, like 1.25' }); return; }
          } else if (!Number.isInteger(n)) { errors.push({ line, msg: '"' + rest[0] + '" is not a whole number. Try:  ' + best.example }); return; }
          if (best.min != null && n < best.min || best.max != null && n > best.max) {
            errors.push({ line, msg: best.words.join(' ') + ' needs a number from ' + best.min + ' to ' + best.max + '.' }); return;
          }
          cmd.n = n;
          const extra = rest.slice(1).filter(t => !(best.unit && best.unit.includes(t)));
          if (extra.length) { errors.push({ line, msg: 'Extra words "' + extra.join(' ') + '". Try:  ' + best.example }); return; }
        }
      } else if (rest.length) {
        errors.push({ line, msg: '"' + best.words.join(' ') + '" does not take anything after it. Just write:  ' + best.example }); return;
      }
      top.body.push(cmd);
    });
    if (stack.length > 1) errors.push({ line: stack[stack.length - 1].line, msg: 'This "repeat" is missing its "end".' });
    // flatten into steps
    const steps = [];
    let tooMany = false;
    (function flat(body) {
      for (const b of body) {
        if (steps.length > 600) { tooMany = true; return; }
        if (b.type === 'repeat') for (let i = 0; i < b.n; i++) flat(b.body);
        else steps.push(b);
      }
    })(root.body);
    if (tooMany) errors.push({ line: 1, msg: 'That program makes more than 600 moves. Use smaller repeats.' });
    return { steps, errors, count };
  };

  /* ---------------- 3D stage with camera views ---------------- */
  RA.createStage = function (canvas, opts) {
    opts = opts || {};
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(opts.bg || 0x0b0d1a);
    const camera = new THREE.PerspectiveCamera(opts.fov || 45, 1, 0.1, 400);
    const st = {
      renderer, scene, camera, views: {}, mode: 'auto', autoName: 'front', zoom: 1,
      camPos: V3(0, 5, 10), camTarget: V3(0, 0, 0), frame: [], onMode: null, snap: true
    };
    st.setViews = function (v) { st.views = v; };
    st.viewName = () => st.mode === 'auto' ? st.autoName : st.mode;
    st.want = function (name) { st.autoName = name; };
    st.setMode = function (m) { st.mode = m; if (st.onMode) st.onMode(m); };
    function getView(name) {
      const v = st.views[name] || st.views.front;
      return typeof v === 'function' ? v() : v;
    }
    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(canvas);
    resize();
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      st.zoom = Math.max(0.5, Math.min(1.8, st.zoom * (e.deltaY > 0 ? 1.08 : 1 / 1.08)));
    }, { passive: false });
    let last = performance.now();
    function loop(now) {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      stepTweens(dt);
      st.frame.forEach(f => f(dt, now / 1000));
      const v = getView(st.viewName());
      const aspectBoost = camera.aspect < 1 ? 1 + (1 - camera.aspect) * 0.9 : 1; // phones in portrait: back up
      const want = v.target.clone().add(v.pos.clone().sub(v.target).multiplyScalar(st.zoom * aspectBoost));
      const k = st.snap ? 1 : 1 - Math.exp(-dt * 3.2);
      st.snap = false;
      st.camPos.lerp(want, k); st.camTarget.lerp(v.target, k);
      camera.position.copy(st.camPos); camera.lookAt(st.camTarget);
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // default lights
    const hemi = new THREE.HemisphereLight(0xdfe8ff, 0x30283a, 0.75);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 0.9);
    sun.position.set(opts.sunX || 6, opts.sunY || 14, opts.sunZ || 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = opts.shadowSize || 12;
    Object.assign(sun.shadow.camera, { left: -sc, right: sc, top: sc, bottom: -sc, near: 1, far: 60 });
    sun.shadow.bias = -0.0005;
    scene.add(sun);
    st.sun = sun; st.hemi = hemi;

    // picking
    st.pick = function (ev, objects) {
      const r = canvas.getBoundingClientRect();
      const m = new THREE.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      const ray = new THREE.Raycaster(); ray.setFromCamera(m, camera);
      const hit = ray.intersectObjects(objects, true)[0];
      return hit ? hit.object : null;
    };
    return st;
  };

  /* ---------------- materials / textures ---------------- */
  RA.mat = (color, o) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.6, metalness: 0.1 }, o || {}));
  RA.box = function (w, h, d, mat, cast) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.castShadow = cast !== false; m.receiveShadow = true; return m;
  };
  RA.cyl = function (rt, rb, h, mat, seg) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 20), mat);
    m.castShadow = true; m.receiveShadow = true; return m;
  };
  RA.textCanvas = function (text, o) {
    o = Object.assign({ w: 256, h: 256, font: 'bold 150px system-ui, sans-serif', color: '#fff', bg: null, stroke: null, radius: 30 }, o || {});
    const c = document.createElement('canvas'); c.width = o.w; c.height = o.h;
    const g = c.getContext('2d');
    if (o.bg) {
      g.fillStyle = o.bg; const r = o.radius;
      g.beginPath(); g.moveTo(r, 0); g.arcTo(o.w, 0, o.w, o.h, r); g.arcTo(o.w, o.h, 0, o.h, r); g.arcTo(0, o.h, 0, 0, r); g.arcTo(0, 0, o.w, 0, r); g.fill();
    }
    g.font = o.font; g.textAlign = 'center'; g.textBaseline = 'middle';
    if (o.stroke) { g.lineWidth = 10; g.strokeStyle = o.stroke; g.strokeText(text, o.w / 2, o.h / 2 + 6); }
    g.fillStyle = o.color; g.fillText(text, o.w / 2, o.h / 2 + 6);
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4;
    return t;
  };
  RA.emojiSprite = function (emoji, size) {
    const tex = RA.textCanvas(emoji, { font: '190px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif' });
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    s.scale.set(size, size, size);
    return s;
  };
  RA.labelSprite = function (text, size, o) {
    o = Object.assign({ w: 512, h: 128, font: 'bold 72px system-ui,sans-serif', color: '#fff', bg: 'rgba(10,12,30,.82)' }, o || {});
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: RA.textCanvas(text, o), transparent: true, depthWrite: false }));
    s.scale.set(size * o.w / o.h, size, 1);
    return s;
  };
  /* flat sign facing the front (+z) */
  RA.signPlane = function (text, size, o) {
    o = Object.assign({ w: 512, h: 128, font: 'bold 72px system-ui,sans-serif', color: '#fff', bg: null }, o || {});
    return new THREE.Mesh(new THREE.PlaneGeometry(size * o.w / o.h, size),
      new THREE.MeshBasicMaterial({ map: RA.textCanvas(text, o), transparent: true }));
  };
  /* flat text lying on the ground, readable from the top view */
  RA.groundLabel = function (text, size, o) {
    o = Object.assign({ w: 256, h: 128, font: 'bold 80px system-ui,sans-serif', color: '#fff', bg: null }, o || {});
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size * o.w / o.h, size),
      new THREE.MeshBasicMaterial({ map: RA.textCanvas(text, o), transparent: true, depthWrite: false }));
    m.rotation.x = -Math.PI / 2;
    return m;
  };

  /* ---------------- page shell: top bar, 3D view, side panel with editor ---------------- */
  RA.buildShell = function (cfg) {
    document.body.classList.add('game');
    if (cfg.accent) document.documentElement.style.setProperty('--accent', cfg.accent);
    const root = RA.el('div', { class: 'shell' });
    root.innerHTML = `
      <div class="topbar">
        <a class="back" href="./">&larr; Arcade</a>
        <h1><span class="ic">${cfg.icon}</span>${RA.esc(cfg.title)}</h1>
        <div class="sp"></div>
        <div class="seg" role="group" aria-label="Camera">
          <button data-v="auto" class="on" title="Front view while planning, top view while moving">Auto</button>
          <button data-v="front">Front</button>
          <button data-v="top">Top</button>
          ${cfg.extraView ? `<button data-v="${cfg.extraView[0]}">${cfg.extraView[1]}</button>` : ''}
        </div>
        ${cfg.topButtons || ''}
        <button class="snd" title="Sound on/off" aria-label="Sound">${RA.sound ? '🔊' : '🔇'}</button>
      </div>
      <div class="main">
        <div class="view"><canvas></canvas><div class="hud"></div><div class="viewnote">Scroll to zoom</div></div>
        <aside class="side">
          <section class="mission"></section>
          <section>
            <h2>Your program</h2>
            <div class="editor"><div class="gutter"></div><div class="codewrap"><div class="hl"></div><textarea spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Program code"></textarea></div></div>
            <div class="runrow">
              <button class="run">&#9654; Run</button>
              <button class="step" title="Run one line at a time">Step</button>
              <button class="stop" disabled>&#9632; Stop</button>
              <button class="reset" title="Put everything back">&#8634; Reset</button>
              <label class="speed">Speed <select><option value="0.5">Slow</option><option value="1" selected>Normal</option><option value="2">Fast</option><option value="4">Turbo</option></select></label>
            </div>
            <div class="log" aria-live="polite"></div>
          </section>
          <section>
            <h2>Commands <small style="text-transform:none;letter-spacing:0;font-weight:500">(tap to add)</small></h2>
            <div class="cmds"></div>
            <ul class="tips">${(cfg.tips || []).map(t => '<li>' + t + '</li>').join('')}</ul>
          </section>
        </aside>
      </div>
      <div class="modal"><div class="box"></div></div>
      <div class="toast"></div>`;
    document.body.appendChild(root);
    const q = s => root.querySelector(s);
    const ta = q('textarea'), gutter = q('.gutter'), hl = q('.hl'), log = q('.log');
    const sh = {
      root, canvas: q('canvas'), hud: q('.hud'), mission: q('.mission'), log, ta,
      btnRun: q('.run'), btnStep: q('.step'), btnStop: q('.stop'), btnReset: q('.reset'), cmdsBox: q('.cmds')
    };
    // ---- editor
    const key = 'code.' + cfg.id;
    ta.value = RA.store.get(key, cfg.starter || '');
    let marks = {}; // line -> 'cur' | 'err'
    function renderGutter() {
      const n = Math.max(ta.value.split('\n').length, 12);
      let h = '';
      for (let i = 1; i <= n; i++) h += `<div class="${marks[i] || ''}">${i}</div>`;
      gutter.innerHTML = h;
      gutter.scrollTop = ta.scrollTop;
      const ml = Object.keys(marks)[0];
      if (ml) { hl.className = 'hl ' + marks[ml]; hl.style.top = (8 + (ml - 1) * 22 - ta.scrollTop) + 'px'; }
      else hl.className = 'hl';
    }
    ta.addEventListener('input', () => { RA.store.set(key, ta.value); if (!sh.running) { marks = {}; } renderGutter(); });
    ta.addEventListener('scroll', renderGutter);
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') { e.preventDefault(); insertAtCursor('  ', false); }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); sh.btnRun.click(); }
    });
    function insertAtCursor(text, asLine) {
      const s = ta.selectionStart, v = ta.value;
      if (asLine) {
        // add as a new line after the line the cursor is on (or at the end)
        let at = v.indexOf('\n', s); if (at < 0) at = v.length;
        const lineStart = v.lastIndexOf('\n', s - 1) + 1;
        const curLine = v.slice(lineStart, at);
        const indent = (curLine.match(/^\s*/) || [''])[0] + (/^\s*repeat\b/i.test(curLine) ? '  ' : '');
        const pre = v.slice(0, at), post = v.slice(at);
        const blank = !curLine.trim();
        let nv, cur;
        if (blank) { nv = v.slice(0, lineStart) + indent + text + v.slice(at); cur = lineStart + indent.length + text.length; }
        else { nv = pre + '\n' + indent + text + post; cur = pre.length + 1 + indent.length + text.length; }
        ta.value = nv; ta.selectionStart = ta.selectionEnd = cur;
      } else {
        ta.value = v.slice(0, s) + text + v.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + text.length;
      }
      ta.focus(); RA.store.set(key, ta.value); renderGutter();
    }
    sh.insert = insertAtCursor;
    sh.getCode = () => ta.value;
    sh.setCode = v => { ta.value = v; RA.store.set(key, v); marks = {}; renderGutter(); };
    sh.mark = function (line, kind) {
      marks = {}; if (line) marks[line] = kind;
      if (line) { // keep the line visible
        const y = (line - 1) * 22;
        if (y < ta.scrollTop) ta.scrollTop = y;
        else if (y + 30 > ta.scrollTop + ta.clientHeight) ta.scrollTop = y + 30 - ta.clientHeight;
      }
      renderGutter();
    };
    renderGutter();
    // ---- log
    sh.log = function (msg, kind) {
      const d = RA.el('div', { class: kind || 'info' }); d.textContent = msg; log.appendChild(d);
      while (log.children.length > 60) log.removeChild(log.firstChild);
      log.scrollTop = log.scrollHeight;
    };
    sh.clearLog = () => { log.innerHTML = ''; };
    // ---- command chips
    (cfg.commands || []).concat(cfg.repeat ? [{ example: 'repeat 2', help: 'Repeat the lines below…', repeat: true }, { example: 'end', help: '…until here' }] : [])
      .forEach(d => {
        const b = RA.el('button', { class: 'cmd', type: 'button' }, RA.esc(d.example) + '<small>' + RA.esc(d.help) + '</small>');
        b.onclick = () => insertAtCursor(d.example, true);
        sh.cmdsBox.appendChild(b);
      });
    // ---- view buttons
    root.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
      root.querySelectorAll('.seg button').forEach(x => x.classList.toggle('on', x === b));
      sh.stage && sh.stage.setMode(b.dataset.v);
    });
    q('.speed select').onchange = e => { RA.speed = Number(e.target.value); };
    q('.snd').onclick = e => { RA.sound = !RA.sound; RA.store.set('sound', RA.sound); e.currentTarget.textContent = RA.sound ? '🔊' : '🔇'; };
    // ---- hud
    sh.setHud = function (items) {
      sh.hud.innerHTML = items.map(([k, v]) => `<span class="chip">${k} <b>${RA.esc(v)}</b></span>`).join('');
    };
    // ---- modal + toast
    const modal = q('.modal'), mbox = q('.modal .box');
    sh.modal = function (html, o) {
      o = o || {};
      mbox.className = 'box' + (o.wide ? ' wide' : '');
      mbox.innerHTML = html; modal.classList.add('on');
      mbox.querySelectorAll('[data-close]').forEach(b => b.onclick = () => sh.closeModal());
      const f = mbox.querySelector('button'); if (f) f.focus();
      return mbox;
    };
    sh.closeModal = () => modal.classList.remove('on');
    modal.addEventListener('click', e => { if (e.target === modal) sh.closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') sh.closeModal(); });
    let tt = 0; const toast = q('.toast');
    sh.toast = function (msg, ms) {
      toast.innerHTML = msg; toast.classList.add('on'); clearTimeout(tt);
      tt = setTimeout(() => toast.classList.remove('on'), ms || 2200);
    };
    return sh;
  };

  /* ---------------- runner: connects the editor to a game ----------------
     game = { commands, exec(step) -> Promise, beforeRun(), afterRun(result), reset(), canRun() }       */
  RA.attachRunner = function (sh, game, opts) {
    opts = opts || {};
    let stepMode = false, stepGate = null, stopFlag = false;
    sh.running = false;
    function setRunning(on) {
      sh.running = on;
      sh.btnRun.disabled = on && !stepMode;
      sh.btnStop.disabled = !on;
      sh.btnReset.disabled = on;
      sh.ta.readOnly = on;
    }
    async function run(stepping) {
      if (sh.running) { // already running: Run = continue, Step = next line
        stepMode = stepping;
        sh.btnRun.disabled = !stepMode;
        if (stepGate) { const g = stepGate; stepGate = null; g(); }
        return;
      }
      sh.closeModal();
      const p = RA.parse(sh.getCode(), game.commands, { noRepeat: opts.noRepeat, hints: game.hints });
      sh.clearLog();
      if (p.errors.length) {
        const e = p.errors[0];
        sh.mark(e.line, 'err');
        sh.log('Line ' + e.line + ': ' + e.msg, 'bad');
        if (p.errors.length > 1) sh.log('(' + (p.errors.length - 1) + ' more line' + (p.errors.length > 2 ? 's' : '') + ' with problems after this one)', 'info');
        RA.sfx.bad(); return;
      }
      if (!p.steps.length) { sh.log('Your program is empty. Tap a command below to add it.', 'warn'); return; }
      if (game.canRun && !game.canRun()) return;
      stepMode = stepping; stopFlag = false;
      setRunning(true);
      sh.log('▶ Running ' + p.steps.length + ' step' + (p.steps.length > 1 ? 's' : '') + '…', 'info');
      let result = { ok: true, lines: p.count, steps: p.steps.length }, curLine = 0;
      try {
        if (game.beforeRun) await game.beforeRun(p);
        for (let i = 0; i < p.steps.length; i++) {
          const st = p.steps[i];
          curLine = st.line;
          sh.mark(st.line, 'cur');
          if (stepMode && i > 0) await new Promise(r => { stepGate = r; });
          if (stopFlag) { result = { ok: false, stopped: true, lines: p.count }; sh.log('■ Stopped.', 'warn'); break; }
          await game.exec(st, i, p);
        }
      } catch (err) {
        if (err && err.crash) {
          result = { ok: false, crash: err.message, lines: p.count, line: curLine };
          sh.mark(result.line, 'err');
          sh.log('✖ ' + err.message, 'bad');
          RA.sfx.bad();
        } else { console.error(err); sh.log('Something went wrong: ' + err, 'bad'); result = { ok: false }; }
      }
      stepGate = null;
      if (result.ok) sh.mark(0);
      setRunning(false);
      if (game.afterRun) await game.afterRun(result, p);
    }
    sh.btnRun.onclick = () => run(false);
    sh.btnStep.onclick = () => run(true);
    sh.btnStop.onclick = () => { stopFlag = true; if (stepGate) { const g = stepGate; stepGate = null; g(); } };
    sh.btnReset.onclick = () => { sh.mark(0); sh.clearLog(); game.reset(); };
  };
})();
