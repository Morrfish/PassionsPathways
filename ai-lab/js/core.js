/* AI Lab core: state, autosave, download/upload, checksum, helpers. No server, no tracking. */
(function () {
  const AI = (window.AI = window.AI || {});
  AI.SCHEMA = 'ai-lab-ch3';
  AI.VERSION = 1;
  const KEY = 'ailab_ch3_v1';
  const SALT = 'tech-morris-ch3-v1';

  // ---------- tiny helpers ----------
  AI.h = function (tag, attrs) {
    const el = document.createElement(tag);
    attrs = attrs || {};
    for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (let i = 2; i < arguments.length; i++) AI._add(el, arguments[i]);
    return el;
  };
  AI._add = function (el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach((x) => AI._add(el, x));
    else el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  };
  AI.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  AI.pct = (v, d) => (v == null || isNaN(v) ? '\u2014' : (v * 100).toFixed(d == null ? 0 : d) + '%');
  AI.mulberry32 = function (a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  AI.rng = function (seed) {
    const r = AI.mulberry32(seed);
    return {
      f: r,
      u: (a, b) => a + (b - a) * r(),
      i: (a, b) => Math.floor(a + (b - a + 1) * r()),
      n: (m, s) => { let u = 0, v = 0; while (u === 0) u = r(); while (v === 0) v = r(); return m + s * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); },
      pick: (arr) => arr[Math.floor(r() * arr.length)],
      shuffle: (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    };
  };
  AI.toast = function (msg) {
    const t = AI.h('div', { class: 'toast', role: 'status', text: msg });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  };

  // ---------- stable stringify + checksum ----------
  function stable(v) {
    if (v === null || typeof v !== 'object') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(stable).join(',') + ']';
    return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + stable(v[k])).join(',') + '}';
  }
  AI.stable = stable;
  function cyrb53(str, seed) {
    let h1 = 0xdeadbeef ^ (seed || 0), h2 = 0x41c6ce57 ^ (seed || 0);
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  AI.checksum = (obj) => { const c = Object.assign({}, obj); delete c.checksum; delete c.reviewNote; return cyrb53(stable(c) + SALT); };

  // ---------- state ----------
  function blank() {
    return { schema: AI.SCHEMA, version: AI.VERSION, student: { first: '', last: '', period: '', email: '' },
      startedAt: Date.now(), updatedAt: Date.now(), activeSeconds: 0, answers: {}, text: {}, log: {}, cfu: {}, visited: {} };
  }
  function read() { try { const s = JSON.parse(localStorage.getItem(KEY)); return s && s.schema === AI.SCHEMA ? s : null; } catch (e) { return null; } }
  AI.S = read() || blank();
  let timer = null;
  AI.save = function () {
    AI.S.updatedAt = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(AI.S)); } catch (e) { /* storage full or blocked */ }
    AI._savedAt = Date.now();
    const el = document.querySelector('.save-state');
    if (el) { el.classList.remove('dirty'); el.lastChild.textContent = 'Saved on this computer'; }
  };
  AI.dirty = function () {
    const el = document.querySelector('.save-state');
    if (el) { el.classList.add('dirty'); el.lastChild.textContent = 'Saving\u2026'; }
    clearTimeout(timer); timer = setTimeout(AI.save, 350);
    if (AI.onChange) AI.onChange();
  };
  AI.setA = (k, v) => { AI.S.answers[k] = v; AI.dirty(); };
  AI.getA = (k) => AI.S.answers[k];
  AI.setT = (k, v) => { AI.S.text[k] = v; AI.dirty(); };
  AI.logPush = (k, o) => { (AI.S.log[k] = AI.S.log[k] || []).push(Object.assign({ ts: Date.now() }, o)); AI.dirty(); };
  AI.logGet = (k) => AI.S.log[k] || [];
  AI.visit = (k) => { if (!AI.S.visited[k]) { AI.S.visited[k] = Date.now(); AI.dirty(); } };
  AI.hasWork = () => Object.keys(AI.S.answers).length + Object.keys(AI.S.text).length + Object.keys(AI.S.log).length + Object.keys(AI.S.cfu).length > 0;
  AI.reset = function () { localStorage.removeItem(KEY); AI.S = blank(); };

  // ---------- active time ----------
  let lastAct = Date.now();
  ['pointerdown', 'keydown', 'pointermove', 'scroll'].forEach((e) => window.addEventListener(e, () => (lastAct = Date.now()), { passive: true }));
  setInterval(() => {
    if (document.hidden || Date.now() - lastAct > 60000 || !AI.S || !AI.S.student.first) return;
    AI.S.activeSeconds += 5;
    if (AI.S.activeSeconds % 30 === 0) AI.save();
  }, 5000);

  // ---------- files ----------
  AI.download = function (name, text, type) {
    const blob = new Blob([text], { type: type || 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
  AI.safeName = (s) => String(s || '').trim().replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'student';
  AI.fileBase = () => 'Chapter3_AI_Lab_' + AI.safeName(AI.S.student.last) + '_' + AI.safeName(AI.S.student.first) + (AI.S.student.period ? '_P' + AI.safeName(AI.S.student.period) : '');
  AI.pack = function (kind) {
    const o = JSON.parse(JSON.stringify(AI.S));
    o.kind = kind || 'progress';
    o.exportedAt = Date.now();
    if (kind === 'submission') o.submittedAt = Date.now();
    o.checksum = AI.checksum(o);
    return o;
  };
  AI.parseFile = function (text) {
    const o = JSON.parse(text);
    if (!o || o.schema !== AI.SCHEMA) throw new Error('This is not an AI Lab Chapter 3 file.');
    return o;
  };
  AI.verify = (o) => AI.checksum(o) === o.checksum;
  AI.readFile = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = rej; r.readAsText(file); });

  AI.TECH_FOOTER = function () {
    return AI.h('div', { class: 'foot' },
      AI.h('div', { html: '<b>TECH</b> \u2014 <b>T</b>ake Risks \u2022 <b>E</b>valuate Work \u2022 <b>C</b>reate \u2022 <b>H</b>ave Fun' }),
      AI.h('div', { text: 'Dr. Morris \u2022 morrisc@blufftonschools.org \u2022 Your work stays on your computer until you download it.' }));
  };
})();
