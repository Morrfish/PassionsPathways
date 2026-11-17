/* Shared student UI components: check-for-understanding, open response, inputs, mascot. */
(function () {
  const AI = (window.AI = window.AI || {});
  const h = AI.h;

  AI.mascot = function (msg, mood) {
    const face = '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="10" y="14" width="44" height="36" rx="10" fill="#1E2761"/><rect x="29" y="4" width="6" height="10" fill="#1E2761"/><circle cx="32" cy="5" r="4" fill="#00D4FF"/><circle cx="23" cy="30" r="6" fill="#00D4FF"/><circle cx="41" cy="30" r="6" fill="#00D4FF"/><circle cx="24" cy="30" r="2.4" fill="#0E1330"/><circle cx="42" cy="30" r="2.4" fill="#0E1330"/>' +
      (mood === 'oops' ? '<path d="M22 43 Q32 37 42 43" stroke="#F5A623" stroke-width="3" fill="none" stroke-linecap="round"/>' : '<path d="M22 41 Q32 49 42 41" stroke="#F5A623" stroke-width="3" fill="none" stroke-linecap="round"/>') + '</svg>';
    const d = h('div', { class: 'mascot' }, h('div', { html: face, style: { width: '54px', flex: 'none' } }), h('p', { html: msg }));
    const img = AI.assets.has['mascot/nibble_' + (mood || 'think') + '.png'];
    if (img) d.firstChild.innerHTML = '<img alt="" src="assets/mascot/nibble_' + (mood || 'think') + '.png" width="54" height="54">';
    return d;
  };

  AI.hero = (title, sub) => h('div', { class: 'hero' }, h('h1', { text: title }), h('p', { text: sub }));

  // ---------- Check for understanding ----------
  AI.cfuBlock = function (ids, heading) {
    const wrap = h('div', null, heading ? h('h3', { text: heading }) : null);
    ids.forEach((id) => {
      const q = AI.CFU.find((x) => x.id === id); if (!q) return;
      const rec = (AI.S.cfu[id] = AI.S.cfu[id] || { attempts: [] });
      const box = h('div', { class: 'cfu' }), fb = h('div', { 'aria-live': 'polite' });
      const name = 'q_' + id; let chosen = null;
      const inputs = q.c.map((c, i) => {
        const inp = h('input', { type: 'radio', name, value: i, onchange: () => (chosen = i) });
        return { inp, lab: h('label', null, inp, h('span', { text: c })) };
      });
      const btn = h('button', { class: 'btn sm go', type: 'button', text: 'Check answer' });
      function lock(correctShown) {
        inputs.forEach((o) => (o.inp.disabled = true)); btn.disabled = true; btn.style.display = 'none';
        if (correctShown) box.classList.add('solved');
      }
      function paint() {
        const at = rec.attempts, last = at[at.length - 1];
        fb.innerHTML = '';
        if (at.length && at[at.length - 1] === q.a) {
          fb.appendChild(h('div', { class: 'fb good', html: '<b>Correct.</b> ' + q.why + (at.length > 1 ? ' (second try: half credit)' : '') })); lock(true);
          inputs[q.a].inp.checked = true;
        } else if (at.length >= 2) {
          fb.appendChild(h('div', { class: 'fb bad', html: '<b>Not quite.</b> The best answer is <b>' + String.fromCharCode(65 + q.a) + '</b>. ' + q.why })); lock(false);
          inputs[last].inp.checked = true;
        } else if (at.length === 1) {
          fb.appendChild(h('div', { class: 'fb hint', html: '<b>Not yet.</b> Re-read the question and try once more.' }));
        }
      }
      btn.addEventListener('click', () => {
        if (chosen == null) { AI.toast('Pick an answer first'); return; }
        rec.attempts.push(chosen); chosen = null; inputs.forEach((o) => (o.inp.checked = false)); AI.dirty(); paint();
      });
      box.appendChild(h('h4', { text: q.q }));
      inputs.forEach((o, i) => box.appendChild(h('div', null, h('span', { class: 'sr', text: String.fromCharCode(65 + i) }), o.lab)));
      box.appendChild(h('div', { class: 'toolbar' }, btn)); box.appendChild(fb);
      paint(); wrap.appendChild(box);
    });
    return wrap;
  };

  // ---------- Open response ----------
  AI.openBlock = function (id) {
    const o = AI.OPEN.find((x) => x.id === id), ta = h('textarea', { id: 'ta_' + id, 'aria-label': o.prompt }), wc = h('div', { class: 'wc' });
    ta.value = AI.S.text[id] || '';
    const upd = () => { const n = AI.wordCount(ta.value); wc.textContent = n + ' word' + (n === 1 ? '' : 's') + (n < o.min ? ' (aim for at least ' + o.min + ')' : ' \u2713'); };
    ta.addEventListener('input', () => { AI.setT(id, ta.value); upd(); }); upd();
    return h('div', { class: 'card amber' }, h('label', { class: 'f', for: 'ta_' + id, text: o.prompt }), ta, wc);
  };

  // ---------- Inputs with optional instant feedback ----------
  // check(value) -> true / false / null (no feedback)
  AI.numField = function (key, o) {
    o = o || {}; const inp = h('input', { type: 'number', step: o.step || 'any', 'aria-label': o.label || key, placeholder: o.ph || '' });
    if (AI.S.answers[key] != null) inp.value = AI.S.answers[key];
    const paint = () => { inp.classList.remove('field-ok', 'field-no'); if (inp.value === '' || !o.check) return; const r = o.check(Number(inp.value)); if (r === true) inp.classList.add('field-ok'); else if (r === false) inp.classList.add('field-no'); };
    inp.addEventListener('input', () => { AI.setA(key, inp.value === '' ? null : Number(inp.value)); paint(); });
    paint(); return inp;
  };
  AI.selField = function (key, options, o) {
    o = o || {}; const sel = h('select', { class: o.inline ? 'inl' : '', 'aria-label': o.label || key }, h('option', { value: '', text: o.ph || 'Choose\u2026' }), options.map((x) => h('option', { value: x.v != null ? x.v : x, text: x.t != null ? x.t : x })));
    if (AI.S.answers[key]) sel.value = AI.S.answers[key];
    const paint = () => { sel.classList.remove('field-ok', 'field-no'); if (!sel.value || !o.check) return; const r = o.check(sel.value); if (r === true) sel.classList.add('field-ok'); else if (r === false) sel.classList.add('field-no'); };
    sel.addEventListener('change', () => { AI.setA(key, sel.value || null); paint(); }); paint(); return sel;
  };

  // ---------- tab system for multi-part activities ----------
  AI.tabsView = function (parts, startKey) {
    const bar = h('div', { class: 'tabs', role: 'tablist' }), body = h('div'); let cur = null;
    const btns = {};
    function show(k) {
      cur = k; Object.keys(btns).forEach((id) => { btns[id].classList.toggle('on', id === k); btns[id].setAttribute('aria-selected', id === k); });
      body.innerHTML = ''; const p = parts.find((x) => x.id === k); p.render(body); AI.visit('part_' + k); history.replaceState(null, '', '#' + startKey + '/' + k); window.scrollTo({ top: 0 });
    }
    parts.forEach((p) => { btns[p.id] = h('button', { class: 'tab', type: 'button', role: 'tab', text: p.title, onclick: () => { show(p.id); } }); bar.appendChild(btns[p.id]); });
    const refresh = () => parts.forEach((p) => btns[p.id].classList.toggle('done', !!(p.done && p.done())));
    AI.tabRefresh = refresh;
    return { el: h('div', null, bar, body), show, refresh };
  };

  AI.legend = function (names) {
    return h('div', { class: 'legend' }, (names || [0, 1]).map((i) => h('span', null, h('b', { style: { color: AI.CLS[i].color }, text: AI.CLS[i].sym }), AI.CLS[i].name)));
  };
  AI.meterBox = (label, val, cls) => h('div', { class: cls || '' }, h('b', { text: val }), h('small', { text: label }));
})();
