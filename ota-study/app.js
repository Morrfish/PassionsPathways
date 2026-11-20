/* OTA 1050 Study Hub — single-page app. Content lives in data.js (window.STUDY). */
(function () {
  'use strict';
  const S = window.STUDY || { units: [], exams: [] };
  const $ = (sel, el) => (el || document).querySelector(sel);
  const main = $('#main');

  /* ---------- data prep ---------- */
  const units = S.units;
  const unitById = {};
  const allQ = [];
  const allTerms = [];
  units.forEach((u, ui) => {
    unitById[u.id] = u;
    u.num = ui + 1;
    const secIds = new Set(u.sections.map(s => s.id));
    u.questions.forEach((q, i) => {
      q.id = q.id || `${u.id}-q${i + 1}`;
      q.unit = u.id;
      if (!secIds.has(q.section)) q.section = u.sections[0] && u.sections[0].id;
      allQ.push(q);
    });
    u.terms.forEach(t => { t.unit = u.id; allTerms.push(t); });
  });
  const qById = Object.fromEntries(allQ.map(q => [q.id, q]));
  const muscles = (S.muscles || []).slice().sort((a, b) => a.name.localeCompare(b.name));
  const singleQ = qs => qs.filter(q => qType(q) === 'single');
  const secById = {};
  units.forEach(u => u.sections.forEach(s => { secById[s.id] = { s, u }; }));

  /* ---------- storage (per-viewer progress; optional) ---------- */
  const KEY = 'ota1050-study-v1';
  let store = { done: {}, best: {}, missed: {}, history: [] };
  try { const raw = localStorage.getItem(KEY); if (raw) store = Object.assign(store, JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignore */ } }
  function recordAnswer(q, correct) {
    if (!q) return;
    if (correct) { if (store.missed[q.id]) { store.missed[q.id]--; if (store.missed[q.id] <= 0) delete store.missed[q.id]; } }
    else store.missed[q.id] = (store.missed[q.id] || 0) + 1;
  }
  function recordScore(key, label, pct) {
    store.best[key] = Math.max(store.best[key] || 0, pct);
    store.history.unshift({ key, label, pct, at: Date.now() });
    store.history = store.history.slice(0, 30);
    save();
  }

  /* ---------- helpers ---------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const strip = h => { const d = document.createElement('div'); d.innerHTML = h; return d.textContent || ''; };
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pct = (a, b) => b ? Math.round(100 * a / b) : 0;
  const letters = 'ABCDEFGH';
  const qType = q => q.type || 'single';
  const TYPE_LABEL = { single: 'Multiple choice', multi: 'Select all that apply', short: 'Short answer' };
  function shuffleChoices(q) {
    const t = qType(q);
    if (t === 'short') return { ...q };
    const order = shuffle(q.choices.map((_, i) => i));
    const out = { ...q, choices: order.map(i => q.choices[i]) };
    if (t === 'multi') out.answers = q.answers.map(a => order.indexOf(a)).sort((a, b) => a - b);
    else out.answer = order.indexOf(q.answer);
    return out;
  }
  function isRight(q, resp) {
    const t = qType(q);
    if (t === 'single') return resp === q.answer;
    if (t === 'multi') {
      if (!Array.isArray(resp) || resp.length !== q.answers.length) return false;
      const r = resp.slice().sort((a, b) => a - b);
      return r.every((v, i) => v === q.answers[i]);
    }
    return false;
  }
  function hasResponse(q, resp) {
    const t = qType(q);
    if (t === 'multi') return Array.isArray(resp) && resp.length > 0;
    if (t === 'short') return typeof resp === 'string' && resp.trim().length > 0;
    return resp != null;
  }
  function correctText(q) {
    const t = qType(q);
    if (t === 'multi') return q.answers.map(i => q.choices[i]).join('; ');
    if (t === 'short') return q.model;
    return q.choices[q.answer];
  }
  function responseText(q, resp) {
    if (!hasResponse(q, resp)) return null;
    const t = qType(q);
    if (t === 'multi') return resp.map(i => q.choices[i]).join('; ');
    if (t === 'short') return resp;
    return q.choices[resp];
  }
  /* Answer area for any question type. resp = current response. */
  function answerHTML(q, resp) {
    const t = qType(q);
    if (t === 'short') return `<textarea class="short-in" rows="6" placeholder="Type your answer here…" aria-label="Your answer">${esc(resp || '')}</textarea>`;
    const sel = k => (t === 'multi' ? (resp || []).includes(k) : resp === k);
    return `${t === 'multi' ? '<p class="hint">Select all that apply, then check your answer.</p>' : ''}
      <div class="choices">${q.choices.map((c, k) => `<button class="choice ${sel(k) ? 'picked' : ''}" data-k="${k}"${t === 'multi' ? ` aria-pressed="${sel(k)}"` : ''}>
        <span class="k">${t === 'multi' ? `<span class="box">${sel(k) ? '✓' : ''}</span>` : letters[k]}</span><span>${esc(c)}</span></button>`).join('')}</div>`;
  }
  function toggleMulti(btn, resp) {
    const k = +btn.dataset.k;
    const i = resp.indexOf(k);
    if (i >= 0) resp.splice(i, 1); else resp.push(k);
    const on = resp.includes(k);
    btn.classList.toggle('picked', on);
    btn.setAttribute('aria-pressed', String(on));
    btn.querySelector('.box').textContent = on ? '✓' : '';
  }
  /* After grading: color the choices. */
  function markChoices(root, q, resp) {
    const t = qType(q);
    root.querySelectorAll('.choice').forEach((b, j) => {
      b.disabled = true;
      const correct = t === 'multi' ? q.answers.includes(j) : j === q.answer;
      const picked = t === 'multi' ? (resp || []).includes(j) : resp === j;
      b.classList.remove('picked');
      if (correct && picked) b.classList.add('right');
      else if (correct) b.classList.add(t === 'multi' ? 'missed' : 'right');
      else if (picked) b.classList.add('wrong');
    });
  }
  /* Self-check list for short answers. */
  function pointsHTML(q, name) {
    return `<div class="model"><b>Model answer</b><p>${esc(q.model)}</p></div>
      <p class="hint" style="margin-top:12px">Tick each key point your answer included:</p>
      <div class="points">${q.points.map((p, k) => `<label><input type="checkbox" name="${name}" value="${k}"> ${esc(p)}</label>`).join('')}</div>`;
  }
  const shortPassed = (got, total) => total > 0 && got / total >= 0.7;
  function renderBody(lines) {
    return lines.map(l => {
      const t = l.trim();
      if (/^<(ul|ol|table|p|h3|div)/i.test(t)) return t.startsWith('<table') ? `<div class="table-wrap">${t}</div>` : t;
      return `<p>${t}</p>`;
    }).join('');
  }
  function unitProgress(u) {
    const done = u.sections.filter(s => store.done[s.id]).length;
    return { done, total: u.sections.length };
  }
  function setTitle(t) { document.title = t ? `${t} · OTA 1050 Study Hub` : 'OTA 1050 Study Hub'; }
  let cleanup = null;

  /* ---------- table of contents ---------- */
  function renderTOC() {
    const route = location.hash;
    let h = `<a href="#/" class="${route === '#/' || route === '' ? 'active' : ''}">Home</a>`;
    h += `<h2>Notes</h2>`;
    units.forEach(u => {
      const open = route.startsWith(`#/unit/${u.id}`);
      h += `<details ${open ? 'open' : ''}><summary>${u.num}. ${esc(u.title)}</summary><div class="sub">`;
      u.sections.forEach(s => {
        const act = route === `#/unit/${u.id}/${s.id}`;
        h += `<a href="#/unit/${u.id}/${s.id}" class="${store.done[s.id] ? 'done' : ''} ${act ? 'active' : ''}">${esc(s.heading)}</a>`;
      });
      h += `<a href="#/cards/${u.id}">Flashcards (${u.terms.length})</a></div></details>`;
    });
    h += `<h2>Practice</h2>
      <a href="#/quiz">Quiz builder</a>
      <a href="#/exams">Practice exams</a>
      <a href="#/muscles">Muscle Finder (${muscles.length})</a>
      <a href="#/review">Review my misses (${Object.keys(store.missed).filter(k => qById[k]).length})</a>
      <a href="#/cards/all">All flashcards</a>
      <h2>Games</h2>
      <a href="#/games/jeopardy">Kinesiology Jeopardy</a>
      <a href="#/games/match">Speed Match</a>
      <a href="#/games/blitz">Lightning Round</a>`;
    $('#toc').innerHTML = h;
    document.querySelectorAll('.topnav a').forEach(a => a.classList.toggle('active', route.startsWith(a.getAttribute('href'))));
  }
  function closeTOC() { $('#toc').classList.remove('open'); $('#scrim').hidden = true; $('#tocToggle').setAttribute('aria-expanded', 'false'); }
  $('#tocToggle').addEventListener('click', () => {
    const open = !$('#toc').classList.contains('open');
    $('#toc').classList.toggle('open', open); $('#scrim').hidden = !open; $('#tocToggle').setAttribute('aria-expanded', String(open));
  });
  $('#scrim').addEventListener('click', closeTOC);
  $('#toc').addEventListener('click', e => { if (e.target.tagName === 'A') closeTOC(); });

  /* ---------- theme ---------- */
  try { const t = localStorage.getItem(KEY + '-theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) { /* ignore */ }
  $('#themeToggle').addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(KEY + '-theme', next); } catch (e) { /* ignore */ }
  });

  /* ---------- home ---------- */
  function viewHome() {
    setTitle('');
    const doneSecs = Object.keys(store.done).filter(k => secById[k]).length;
    const totalSecs = units.reduce((n, u) => n + u.sections.length, 0);
    let h = `<h1>${esc(S.course || 'OTA 1050 Study Hub')}</h1>
      <p class="lede">${esc(S.tagline || '')}</p>
      <div class="stat-row">
        <div class="stat"><b>${units.length}</b><span>units</span></div>
        <div class="stat"><b>${allTerms.length}</b><span>key terms</span></div>
        <div class="stat"><b>${allQ.length}</b><span>practice questions</span></div>
        ${muscles.length ? `<div class="stat"><b>${muscles.length}</b><span>muscles in the Muscle Finder</span></div>` : ''}
        <div class="stat"><b>${pct(doneSecs, totalSecs)}%</b><span>notes marked read</span></div>
      </div>
      <h2>Table of contents</h2><div class="grid">`;
    units.forEach(u => {
      const p = unitProgress(u);
      h += `<a class="card" href="#/unit/${u.id}"><div class="num">Unit ${u.num}</div><h3>${esc(u.title)}</h3><p>${esc(u.summary)}</p>
        <div class="meter"><i style="width:${pct(p.done, p.total)}%"></i></div>
        <div class="meta">${p.done}/${p.total} sections read · ${u.terms.length} terms · ${u.questions.length} questions${store.best['unit-' + u.id] != null ? ` · best quiz ${store.best['unit-' + u.id]}%` : ''}</div></a>`;
    });
    h += `</div><h2>Practice</h2><div class="grid">
      <a class="card" href="#/quiz"><h3>Quiz builder</h3><p>Pick units and a length. Get feedback after every question.</p></a>
      <a class="card" href="#/exams"><h3>Practice exams</h3><p>Timed, scored at the end, with a breakdown by topic.</p></a>
      <a class="card" href="#/games"><h3>Games</h3><p>Jeopardy for teams, Speed Match and a 60-second Lightning Round.</p></a>
      <a class="card" href="#/muscles"><h3>Muscle Finder</h3><p>Look up any muscle's origin, insertion, action, nerve and stretch. Filter by nerve, joint or motion, then drill yourself.</p></a>
      <a class="card" href="#/review"><h3>Review my misses</h3><p>Questions you got wrong come back here until you get them right.</p></a>
    </div>`;
    if (store.history.length) {
      h += `<h2>Recent scores</h2><div class="card"><table><tr><th>Activity</th><th>Score</th><th>When</th></tr>${store.history.slice(0, 8).map(r =>
        `<tr><td>${esc(r.label)}</td><td>${r.pct}%</td><td>${new Date(r.at).toLocaleDateString()}</td></tr>`).join('')}</table></div>`;
    }
    h += `<p class="meta" style="margin-top:28px">Progress is saved in this browser only. Content summarized from OTA 1050 course materials for study use.</p>`;
    main.innerHTML = h;
  }

  /* ---------- unit notes ---------- */
  function viewUnit(id, secId) {
    const u = unitById[id];
    if (!u) return viewNotFound();
    setTitle(u.title);
    let h = `<div class="crumbs"><a href="#/">Home</a> › Unit ${u.num}</div>
      <h1>${esc(u.title)}</h1><p class="lede">${esc(u.summary)}</p>
      <div class="btn-row">
        <a class="btn primary" href="#/quiz/unit/${u.id}">Quiz this unit</a>
        <a class="btn" href="#/cards/${u.id}">Flashcards</a>
        <button class="btn" id="printBtn">Print notes</button>
      </div>
      <div class="card"><b>In this unit</b><ol style="margin:8px 0 0;padding-left:22px">${u.sections.map(s =>
        `<li><a href="#/unit/${u.id}/${s.id}">${esc(s.heading)}</a>${store.done[s.id] ? ' ✓' : ''}</li>`).join('')}</ol></div>`;
    u.sections.forEach(s => {
      const terms = u.terms.filter(t => t.section === s.id);
      const qs = u.questions.filter(q => q.section === s.id).length;
      h += `<section class="section" id="${s.id}"><h2><span>${esc(s.heading)}</span>
          <label class="done-toggle"><input type="checkbox" data-done="${s.id}" ${store.done[s.id] ? 'checked' : ''}> I've studied this</label></h2>
          ${renderBody(s.body)}
          ${terms.length ? `<h3>Key terms</h3><div class="terms">${terms.map(t => `<div class="term"><b>${esc(t.term)}</b>${esc(t.def)}</div>`).join('')}</div>` : ''}
          ${qs ? `<div class="btn-row"><a class="btn" href="#/quiz/section/${s.id}">Check yourself (${qs} questions)</a></div>` : ''}
        </section>`;
    });
    const loose = u.terms.filter(t => !u.sections.some(s => s.id === t.section));
    if (loose.length) h += `<section class="section"><h2>More key terms</h2><div class="terms">${loose.map(t => `<div class="term"><b>${esc(t.term)}</b>${esc(t.def)}</div>`).join('')}</div></section>`;
    if (u.sources && u.sources.length) h += `<p class="meta">Sources: ${u.sources.map(esc).join(' · ')}</p>`;
    const i = units.indexOf(u);
    h += `<div class="btn-row">${i > 0 ? `<a class="btn" href="#/unit/${units[i - 1].id}">‹ ${esc(units[i - 1].title)}</a>` : ''}
      ${i < units.length - 1 ? `<a class="btn" href="#/unit/${units[i + 1].id}">${esc(units[i + 1].title)} ›</a>` : ''}</div>`;
    main.innerHTML = h;
    main.querySelectorAll('[data-done]').forEach(cb => cb.addEventListener('change', () => {
      if (cb.checked) store.done[cb.dataset.done] = true; else delete store.done[cb.dataset.done];
      save(); renderTOC();
    }));
    $('#printBtn').addEventListener('click', () => window.print());
    if (secId) { const el = document.getElementById(secId); if (el) { el.scrollIntoView(); return true; } }
  }

  /* ---------- search ---------- */
  const index = [];
  units.forEach(u => {
    u.sections.forEach(s => index.push({ type: 'Notes', title: s.heading, text: strip(s.body.join(' ')), href: `#/unit/${u.id}/${s.id}`, where: `Unit ${u.num}: ${u.title}` }));
    u.terms.forEach(t => index.push({ type: 'Term', title: t.term, text: t.def, href: `#/unit/${u.id}/${t.section || ''}`, where: `Unit ${u.num}: ${u.title}` }));
    u.questions.forEach(q => index.push({ type: 'Question', title: q.q, text: correctText(q) + ' — ' + (q.explain || ''), href: `#/practice/${q.id}`, where: `Unit ${u.num}: ${u.title}` }));
  });
  muscles.forEach(m => index.push({ type: 'Muscle', title: m.name, text: `${m.actions.join(', ')}. Nerve: ${m.nerve} (${m.roots}). Origin: ${m.origin}. Insertion: ${m.insertion}.`, href: `#/muscles?m=${encodeURIComponent(m.name)}`, where: `Muscle Finder · ${m.region}` }));
  index.forEach(r => { r.lt = r.title.toLowerCase(); r.lx = r.text.toLowerCase(); });
  function hl(text, toks) {
    let out = esc(text);
    toks.forEach(t => { if (t.length > 1) out = out.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>'); });
    return out;
  }
  function snippet(text, toks) {
    const lx = text.toLowerCase();
    let at = -1;
    for (const t of toks) { at = lx.indexOf(t); if (at >= 0) break; }
    const start = Math.max(0, at - 70);
    return (start > 0 ? '…' : '') + text.slice(start, start + 220) + (text.length > start + 220 ? '…' : '');
  }
  let searchFilter = 'All';
  function viewSearch(q) {
    setTitle('Search');
    q = (q || '').trim();
    const box = $('#searchBox'); if (document.activeElement !== box) box.value = q;
    const toks = q.toLowerCase().split(/\s+/).filter(Boolean);
    let res = [];
    if (toks.length) {
      res = index.map(r => {
        let score = 0;
        for (const t of toks) {
          const inT = r.lt.includes(t), inX = r.lx.includes(t);
          if (!inT && !inX) return null;
          score += inT ? 3 : 1;
        }
        if (r.lt === q.toLowerCase()) score += 10;
        if (r.type === 'Term') score += 1;
        return { r, score };
      }).filter(Boolean).sort((a, b) => b.score - a.score).map(x => x.r);
    }
    const counts = { All: res.length, Notes: 0, Term: 0, Muscle: 0, Question: 0 };
    res.forEach(r => counts[r.type]++);
    const shown = searchFilter === 'All' ? res : res.filter(r => r.type === searchFilter);
    let h = `<h1>Search</h1>`;
    if (!toks.length) h += `<p class="lede">Type in the search bar above. Try "rotator cuff", "median nerve", "sagittal" or "ACL".</p>`;
    else {
      h += `<p class="lede">${res.length} result${res.length === 1 ? '' : 's'} for “${esc(q)}”</p>
        <div class="filters">${['All', 'Notes', 'Term', 'Muscle', 'Question'].filter(f => f === 'All' || counts[f]).map(f => `<button data-f="${f}" class="${f === searchFilter ? 'on' : ''}">${f === 'Notes' || f === 'All' ? f : f + 's'} (${counts[f]})</button>`).join('')}</div>`;
      h += shown.slice(0, 80).map(r => `<a class="result" href="${r.href}"><small>${r.type} · ${esc(r.where)}</small><b>${hl(r.title, toks)}</b><div>${hl(snippet(r.text, toks), toks)}</div></a>`).join('')
        || `<div class="empty">Nothing found. Try fewer or different words.</div>`;
    }
    main.innerHTML = h;
    main.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { searchFilter = b.dataset.f; viewSearch(q); }));
  }
  let st;
  $('#searchBox').addEventListener('input', e => {
    clearTimeout(st);
    st = setTimeout(() => {
      const v = e.target.value;
      const target = '#/search?q=' + encodeURIComponent(v);
      if (location.hash.startsWith('#/search')) { history.replaceState(null, '', target); viewSearch(v); } else location.hash = target;
    }, 180);
  });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); $('#searchBox').focus(); }
  });

  /* ---------- flashcards ---------- */
  function viewCards(id) {
    const pool = id === 'all' ? allTerms : (unitById[id] || {}).terms;
    if (!pool) return viewNotFound();
    const title = id === 'all' ? 'All flashcards' : `Flashcards: ${unitById[id].title}`;
    setTitle(title);
    let deck = pool.slice(), i = 0, reverse = false;
    const known = new Set();
    function draw() {
      if (!deck.length) {
        main.innerHTML = `<h1>${esc(title)}</h1><div class="card" style="text-align:center"><p class="score-big">🎉</p><p>You marked every card as known.</p>
          <div class="btn-row" style="justify-content:center"><button class="btn primary" id="again">Start over</button></div></div>`;
        $('#again').onclick = () => { deck = pool.slice(); known.clear(); i = 0; draw(); };
        return;
      }
      i = (i + deck.length) % deck.length;
      const t = deck[i];
      const front = reverse ? t.def : t.term, back = reverse ? t.term : t.def;
      main.innerHTML = `<div class="crumbs"><a href="#/">Home</a> › Flashcards</div><h1>${esc(title)}</h1>
        <p class="lede">Card ${i + 1} of ${deck.length} · ${known.size} known. Click the card or press Space to flip; ← → to move.</p>
        <div class="flash" id="flash"><div class="flash-inner"><div class="face front"><div class="${reverse ? '' : 'big'}">${esc(front)}</div></div>
        <div class="face back"><div class="${reverse ? 'big' : ''}">${esc(back)}</div></div></div></div>
        <div class="btn-row" style="justify-content:center">
          <button class="btn" id="prev">‹ Prev</button><button class="btn" id="flip">Flip</button>
          <button class="btn primary" id="know">I know it ✓</button><button class="btn" id="next">Next ›</button></div>
        <div class="btn-row" style="justify-content:center"><button class="btn" id="shuf">Shuffle</button>
          <button class="btn" id="rev">${reverse ? 'Show term first' : 'Show definition first'}</button>
          ${id !== 'all' ? `<a class="btn" href="#/unit/${id}">Back to notes</a>` : ''}</div>`;
      const flip = () => $('#flash').classList.toggle('flipped');
      $('#flash').onclick = flip; $('#flip').onclick = flip;
      $('#prev').onclick = () => { i--; draw(); };
      $('#next').onclick = () => { i++; draw(); };
      $('#know').onclick = () => { known.add(t); deck.splice(i, 1); draw(); };
      $('#shuf').onclick = () => { deck = shuffle(deck); i = 0; draw(); };
      $('#rev').onclick = () => { reverse = !reverse; draw(); };
    }
    const onKey = e => {
      if (/input|textarea|select/i.test(document.activeElement.tagName) || !$('#flash')) return;
      if (e.key === ' ') { e.preventDefault(); $('#flash').classList.toggle('flipped'); }
      if (e.key === 'ArrowRight') { i++; draw(); }
      if (e.key === 'ArrowLeft') { i--; draw(); }
    };
    document.addEventListener('keydown', onKey);
    cleanup = () => document.removeEventListener('keydown', onKey);
    draw();
  }

  /* ---------- quiz engine (instant feedback) ---------- */
  function runQuiz({ title, questions, key, back }) {
    setTitle(title);
    const qs = questions.map(shuffleChoices);
    let i = 0, right = 0, resp = null, graded = false;
    const log = [];
    function draw() {
      if (i >= qs.length) return finish();
      const q = qs[i], t = qType(q);
      const u = unitById[q.unit];
      resp = t === 'multi' ? [] : null; graded = false;
      main.innerHTML = `<div class="crumbs"><a href="#/">Home</a> › <a href="${back || '#/quiz'}">Quiz</a></div><h1>${esc(title)}</h1>
        <div class="progress"><i style="width:${pct(i, qs.length)}%"></i></div>
        <div class="qcard"><div class="qhead"><span>Question ${i + 1} of ${qs.length} · ${TYPE_LABEL[t]}</span><span>${u ? 'Unit ' + u.num + ' · ' : ''}${right} correct</span></div>
          <p class="qtext">${esc(q.q)}</p>${answerHTML(q, resp)}
          ${t !== 'single' ? `<div class="btn-row"><button class="btn primary" id="checkQ" ${t === 'multi' ? 'disabled' : ''}>Check my answer</button></div>` : ''}
          <div id="fb"></div></div>
        <p class="meta">${t === 'short' ? 'Write your answer, then compare it with the model answer.' : 'Tip: press 1–' + q.choices.length + ' to choose, Enter to check or go on.'}</p>`;
      main.querySelectorAll('.choice').forEach(b => b.addEventListener('click', () => {
        if (graded) return;
        if (t === 'single') grade(+b.dataset.k);
        else { toggleMulti(b, resp); $('#checkQ').disabled = !resp.length; }
      }));
      const chk = $('#checkQ');
      if (chk) chk.onclick = () => {
        if (t === 'multi') grade(resp);
        else if (t === 'short') showModel();
      };
      if (t === 'short') $('.short-in', main).focus();
    }
    function feedback(q, ok, extra) {
      const sec = secById[q.section];
      return `<div class="explain ${ok ? 'good' : 'bad'}">${extra}${q.explain ? ' ' + esc(q.explain) : ''}
        ${sec ? `<div class="meta">Review: <a href="#/unit/${sec.u.id}/${sec.s.id}" target="_blank">${esc(sec.s.heading)}</a></div>` : ''}</div>`;
    }
    function nextBtn() {
      const html = `<div class="btn-row"><button class="btn primary" id="nextQ">${i + 1 < qs.length ? 'Next question' : 'See results'}</button></div>`;
      return html;
    }
    function bindNext(onNext) {
      $('#nextQ').onclick = () => { if (onNext) onNext(); i++; draw(); };
      $('#nextQ').focus();
    }
    function grade(r) {
      const q = qs[i], t = qType(q);
      if (graded) return; graded = true;
      const ok = isRight(q, r);
      if (ok) right++;
      log.push({ q, k: t === 'multi' ? r.slice() : r, ok });
      recordAnswer(qById[q.id], ok); save();
      markChoices(main, q, r);
      const chk = $('#checkQ'); if (chk) chk.remove();
      const msg = ok ? '<b>Correct!</b>' : t === 'multi'
        ? `<b>Not quite.</b> The correct answers are: ${q.answers.map(a => esc(q.choices[a])).join('; ')}.`
        : `<b>Not quite. The answer is ${letters[q.answer]}.</b>`;
      $('#fb').innerHTML = feedback(q, ok, msg) + nextBtn();
      bindNext();
    }
    function showModel() {
      const q = qs[i];
      if (graded) return; graded = true;
      const ta = $('.short-in', main); resp = ta.value; ta.readOnly = true;
      $('#checkQ').remove();
      $('#fb').innerHTML = `<div class="explain">${pointsHTML(q, 'pt')}</div><p class="meta" id="ptScore"></p>` + nextBtn();
      const upd = () => { const n = main.querySelectorAll('[name=pt]:checked').length; $('#ptScore').textContent = `${n} of ${q.points.length} key points. ${shortPassed(n, q.points.length) ? 'That counts as correct.' : 'Cover at least 70% of the key points to count it correct.'}`; };
      main.querySelectorAll('[name=pt]').forEach(c => c.onchange = upd); upd();
      bindNext(() => {
        const n = main.querySelectorAll('[name=pt]:checked').length, ok = shortPassed(n, q.points.length);
        if (ok) right++;
        log.push({ q, k: resp, ok, got: n });
        recordAnswer(qById[q.id], ok); save();
      });
      $('.points input', main).focus();
    }
    function finish() {
      const p = pct(right, qs.length);
      if (key) recordScore(key, title, p);
      main.innerHTML = `<h1>${esc(title)}: results</h1>
        <div class="card" style="text-align:center"><div class="score-big">${p}%</div><p>${right} of ${qs.length} correct</p>
        <div class="btn-row" style="justify-content:center"><button class="btn primary" id="retry">Try a new set</button>
        ${log.some(l => !l.ok) ? `<button class="btn" id="retryMiss">Retry the ${log.filter(l => !l.ok).length} I missed</button>` : ''}
        <a class="btn" href="${back || '#/quiz'}">Back</a></div></div>
        ${reviewList(log)}`;
      $('#retry').onclick = () => route();
      const rm = $('#retryMiss');
      if (rm) rm.onclick = () => runQuiz({ title: title + ' (misses)', questions: log.filter(l => !l.ok).map(l => qById[l.q.id] || l.q), back });
    }
    const onKey = e => {
      if (/input|textarea|select/i.test(document.activeElement.tagName) && document.activeElement.type !== 'checkbox') return;
      const n = '123456'.indexOf(e.key);
      const btn = n >= 0 && main.querySelector(`.choice[data-k="${n}"]:not(:disabled)`);
      if (btn) btn.click();
      else if (e.key === 'Enter') {
        const nb = $('#nextQ'), cb = $('#checkQ');
        if (nb && document.activeElement !== nb) { e.preventDefault(); nb.click(); }
        else if (cb && !cb.disabled && document.activeElement !== cb) { e.preventDefault(); cb.click(); }
      }
    };
    document.addEventListener('keydown', onKey);
    cleanup = () => document.removeEventListener('keydown', onKey);
    draw();
  }
  function reviewList(log) {
    const miss = log.filter(l => !l.ok);
    if (!miss.length) return `<div class="card"><b>Perfect score. Nothing to review!</b></div>`;
    return `<h2>Review what you missed</h2>` + miss.map(l => {
      const sec = secById[l.q.section], t = qType(l.q);
      const mine = responseText(l.q, l.k);
      const yours = mine == null ? '<span class="chip">Not answered</span>'
        : t === 'short' ? `Your answer:<div class="model mine">${esc(mine)}</div>` : `Your answer: <b style="color:var(--bad)">${esc(mine)}</b>`;
      const corr = t === 'short' ? `<div class="model"><b>Model answer</b><p>${esc(l.q.model)}</p><b>Key points</b><ul>${l.q.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>`
        : `Correct answer${t === 'multi' ? 's' : ''}: <b style="color:var(--good)">${esc(correctText(l.q))}</b>`;
      return `<div class="qcard"><div class="qhead"><span>${TYPE_LABEL[t]}</span></div><p class="qtext">${esc(l.q.q)}</p>
        <div>${yours}</div><div style="margin-top:8px">${corr}</div>
        ${l.q.explain || sec ? `<div class="explain">${esc(l.q.explain || '')} ${sec ? `<a href="#/unit/${sec.u.id}/${sec.s.id}">Review notes ›</a>` : ''}</div>` : ''}</div>`;
    }).join('');
  }

  /* ---------- quiz builder ---------- */
  function viewQuizSetup() {
    setTitle('Quiz builder');
    let h = `<h1>Quiz builder</h1><p class="lede">Choose what to practice. Questions come in the same formats as the real exams: multiple choice, select all that apply, and short answer. You get feedback after each one.</p>
      <form class="setup" id="qform"><fieldset><legend>Units</legend>
      <label><input type="checkbox" id="allU" checked> <b>All units</b></label>
      ${units.map(u => `<label><input type="checkbox" name="u" value="${u.id}" checked> Unit ${u.num}: ${esc(u.title)} <span class="chip">${u.questions.length}</span></label>`).join('')}
      </fieldset><fieldset><legend>Options</legend>
      <label>Questions: <select name="n"><option>10</option><option selected>20</option><option>30</option><option value="999">All</option></select></label>
      <label>Question type: <select name="ty"><option value="">All types</option><option value="single">Multiple choice only</option><option value="multi">Select all that apply only</option><option value="short">Short answer only</option></select></label>
      <label>Difficulty: <select name="d"><option value="0">Mixed</option><option value="1">Easier (recall)</option><option value="2">Medium</option><option value="3">Harder (application)</option></select></label>
      <label><input type="checkbox" name="unseen"> Focus on questions I've missed before</label>
      </fieldset><button class="btn primary" type="submit">Start quiz</button></form>
      <h2>Quick quizzes</h2><div class="grid">${units.map(u => `<a class="card" href="#/quiz/unit/${u.id}"><div class="num">Unit ${u.num}</div><h3>${esc(u.title)}</h3>
        <p>10 random questions${store.best['unit-' + u.id] != null ? ` · best ${store.best['unit-' + u.id]}%` : ''}</p></a>`).join('')}</div>`;
    main.innerHTML = h;
    const f = $('#qform');
    $('#allU').onchange = e => f.querySelectorAll('[name=u]').forEach(c => { c.checked = e.target.checked; });
    f.onsubmit = e => {
      e.preventDefault();
      const us = [...f.querySelectorAll('[name=u]:checked')].map(c => c.value);
      if (!us.length) { alert('Pick at least one unit.'); return; }
      const n = +f.n.value, d = +f.d.value;
      let pool = allQ.filter(q => us.includes(q.unit));
      if (f.ty.value) { pool = pool.filter(q => qType(q) === f.ty.value); if (!pool.length) { alert('No questions of that type in those units.'); return; } }
      if (d) { const dp = pool.filter(q => (q.difficulty || 2) === d); if (dp.length >= 5) pool = dp; }
      if (f.unseen.checked) { const mp = pool.filter(q => store.missed[q.id]); if (mp.length) pool = mp; }
      runQuiz({ title: us.length === units.length ? 'Mixed quiz: all units' : `Quiz: ${us.map(id => 'Unit ' + unitById[id].num).join(', ')}`, questions: shuffle(pool).slice(0, n), key: 'custom' });
    };
  }

  /* ---------- practice exams (timed, graded at end) ---------- */
  function examPool(ex) {
    return allQ.filter(q => ex.units.includes(q.unit));
  }
  function viewExams() {
    setTitle('Practice exams');
    let h = `<h1>Practice exams</h1><p class="lede">Exams are timed and scored at the end, like the real thing. Each attempt draws a new set of questions.</p><div class="grid">`;
    S.exams.forEach(ex => {
      const n = Math.min(ex.count, examPool(ex).filter(q => qType(q) !== 'short').length);
      const ns = Math.min(ex.short || 0, examPool(ex).filter(q => qType(q) === 'short').length);
      h += `<div class="card"><h3>${esc(ex.title)}</h3><p>${esc(ex.description || '')}</p>
        <div class="meta">${n} questions${ns ? ` + ${ns} short answer` : ''} · ${ex.minutes} minutes · Units ${ex.units.map(id => unitById[id] ? unitById[id].num : '?').join(', ')}${store.best['exam-' + ex.id] != null ? ` · best ${store.best['exam-' + ex.id]}%` : ''}</div>
        ${ex.topics && ex.topics.length ? `<details style="margin-top:8px"><summary class="meta" style="cursor:pointer">What to know</summary><ul class="meta">${ex.topics.map(t => `<li>${esc(t)}</li>`).join('')}</ul></details>` : ''}
        <div class="btn-row"><a class="btn primary" href="#/exam/${ex.id}">Start exam</a></div></div>`;
    });
    main.innerHTML = h + '</div>';
  }
  function runExam(id) {
    const ex = S.exams.find(e => e.id === id);
    if (!ex) return viewNotFound();
    setTitle(ex.title);
    // auto-graded questions balanced across units, then short answers at the end
    const byU = ex.units.map(u => shuffle(allQ.filter(q => q.unit === u && qType(q) !== 'short')));
    const picked = [];
    while (picked.length < ex.count && byU.some(a => a.length)) byU.forEach(a => { if (a.length && picked.length < ex.count) picked.push(a.pop()); });
    const shorts = shuffle(allQ.filter(q => ex.units.includes(q.unit) && qType(q) === 'short')).slice(0, ex.short || 0);
    const qs = shuffle(picked).concat(shorts).map(shuffleChoices);
    const ans = qs.map(q => (qType(q) === 'multi' ? [] : null)), flags = new Set();
    let i = 0, left = ex.minutes * 60, done = false;
    main.innerHTML = `<div class="crumbs"><a href="#/exams">Practice exams</a></div><h1>${esc(ex.title)}</h1>
      <div class="qhead"><span id="answered"></span><span>Time left: <span class="timer" id="timer"></span></span></div>
      <div class="qnav" id="qnav"></div><div id="qbox"></div>
      <div class="btn-row"><button class="btn" id="prevE">‹ Prev</button><button class="btn" id="nextE">Next ›</button>
      <button class="btn" id="flagE">⚑ Flag</button><button class="btn primary" id="submitE">Submit exam</button></div>`;
    function tick() {
      const m = Math.floor(left / 60), s = left % 60;
      const el = $('#timer'); if (!el) return;
      el.textContent = `${m}:${String(s).padStart(2, '0')}`; el.classList.toggle('low', left < 120);
      if (left-- <= 0) submit(true);
    }
    const timer = setInterval(tick, 1000); tick();
    cleanup = () => clearInterval(timer);
    function nav() {
      $('#qnav').innerHTML = qs.map((q, j) => `<button data-j="${j}" class="${hasResponse(q, ans[j]) ? 'ans' : ''} ${j === i ? 'cur' : ''} ${flags.has(j) ? 'flag' : ''}" aria-label="Question ${j + 1}">${qType(q) === 'short' ? 'SA' : j + 1}</button>`).join('');
      $('#qnav').querySelectorAll('button').forEach(b => b.onclick = () => { i = +b.dataset.j; draw(); });
      $('#answered').textContent = `${qs.filter((q, j) => hasResponse(q, ans[j])).length} of ${qs.length} answered`;
    }
    function draw() {
      const q = qs[i], t = qType(q);
      $('#qbox').innerHTML = `<div class="qcard"><div class="qhead"><span>Question ${i + 1} of ${qs.length} · ${TYPE_LABEL[t]}</span>${flags.has(i) ? '<span class="chip">Flagged</span>' : ''}</div>
        <p class="qtext">${esc(q.q)}</p>${answerHTML(q, ans[i])}${t === 'short' ? '<p class="hint">You will compare this with a model answer after you submit.</p>' : ''}</div>`;
      $('#qbox').querySelectorAll('.choice').forEach(b => b.onclick = () => {
        if (t === 'multi') { toggleMulti(b, ans[i]); nav(); return; }
        ans[i] = +b.dataset.k; if (i < qs.length - 1) i++; draw();
      });
      const ta = $('.short-in', $('#qbox'));
      if (ta) ta.oninput = () => { ans[i] = ta.value; nav(); };
      $('#flagE').textContent = flags.has(i) ? '⚑ Unflag' : '⚑ Flag';
      nav();
    }
    $('#prevE').onclick = () => { if (i > 0) { i--; draw(); } };
    $('#nextE').onclick = () => { if (i < qs.length - 1) { i++; draw(); } };
    $('#flagE').onclick = () => { flags.has(i) ? flags.delete(i) : flags.add(i); draw(); };
    $('#submitE').onclick = () => {
      const blank = qs.filter((q, j) => !hasResponse(q, ans[j])).length;
      if (!blank || confirm(`You have ${blank} unanswered question${blank > 1 ? 's' : ''}. Submit anyway?`)) submit(false);
    };
    function submit(timeUp) {
      if (done) return; done = true; clearInterval(timer);
      const auto = [], sa = [];
      qs.forEach((q, j) => (qType(q) === 'short' ? sa : auto).push({ q, k: ans[j], ok: isRight(q, ans[j]) }));
      auto.forEach(l => recordAnswer(qById[l.q.id], l.ok));
      const right = auto.filter(l => l.ok).length, p = pct(right, auto.length);
      recordScore('exam-' + ex.id, ex.title, p);
      save();
      const bySec = {};
      auto.forEach(l => { const s = secById[l.q.section]; const k = s ? s.s.heading : 'Other'; bySec[k] = bySec[k] || { r: 0, n: 0, href: s ? `#/unit/${s.u.id}/${s.s.id}` : '#/' }; bySec[k].n++; if (l.ok) bySec[k].r++; });
      const rows = Object.entries(bySec).sort((a, b) => a[1].r / a[1].n - b[1].r / b[1].n);
      main.innerHTML = `<h1>${esc(ex.title)}: results</h1>${timeUp ? '<p class="chip">Time ran out. Your answers were submitted automatically.</p>' : ''}
        <div class="card" style="text-align:center;margin-top:12px"><div class="score-big">${p}%</div><p>${right} of ${auto.length} auto-graded questions correct · ${p >= 90 ? 'A' : p >= 80 ? 'B' : p >= 70 ? 'C' : p >= 60 ? 'D' : 'Keep studying'}</p>
        ${sa.length ? '<p class="meta">Short answers are not in this percentage. Check them yourself below.</p>' : ''}
        <div class="btn-row" style="justify-content:center"><a class="btn primary" href="#/exam/${ex.id}?r=${Date.now()}">Take a new version</a><a class="btn" href="#/exams">All exams</a></div></div>
        ${sa.length ? `<h2>Short answer self-check</h2>${sa.map((l, n) => `<div class="qcard"><p class="qtext">${esc(l.q.q)}</p>
          <div>Your answer:${hasResponse(l.q, l.k) ? `<div class="model mine">${esc(l.k)}</div>` : ' <span class="chip">Not answered</span>'}</div>
          <div class="explain" style="margin-top:10px">${pointsHTML(l.q, 'sa' + n)}</div><p class="meta" data-sa="${n}"></p></div>`).join('')}` : ''}
        <h2>Score by topic (weakest first)</h2><div class="card bars">${rows.map(([k, v]) => `<div class="bar"><a href="${v.href}">${esc(k)}</a>
          <div class="meter" style="margin:0"><i style="width:${pct(v.r, v.n)}%;background:${pct(v.r, v.n) >= 70 ? 'var(--good)' : 'var(--bad)'}"></i></div><span>${v.r}/${v.n}</span></div>`).join('')}</div>
        ${reviewList(auto)}`;
      sa.forEach((l, n) => {
        const upd = () => {
          const got = main.querySelectorAll(`[name=sa${n}]:checked`).length;
          main.querySelector(`[data-sa="${n}"]`).textContent = `${got} of ${l.q.points.length} key points`;
          const ok = shortPassed(got, l.q.points.length);
          if (ok !== l.ok) { l.ok = ok; recordAnswer(qById[l.q.id], ok); save(); }
        };
        l.ok = null;
        main.querySelectorAll(`[name=sa${n}]`).forEach(c => c.onchange = upd);
        main.querySelector(`[data-sa="${n}"]`).textContent = `0 of ${l.q.points.length} key points`;
      });
      window.scrollTo(0, 0);
    }
    draw();
  }

  /* ---------- review misses ---------- */
  function viewReview() {
    setTitle('Review my misses');
    const qs = Object.keys(store.missed).map(k => qById[k]).filter(Boolean);
    if (!qs.length) {
      main.innerHTML = `<h1>Review my misses</h1><div class="empty">No missed questions yet. Questions you answer wrong in quizzes, exams and games show up here until you answer them correctly.</div>
        <div class="btn-row"><a class="btn primary" href="#/quiz">Take a quiz</a></div>`;
      return;
    }
    main.innerHTML = `<h1>Review my misses</h1><p class="lede">You have ${qs.length} question${qs.length > 1 ? 's' : ''} to master. Answer one correctly to clear it.</p>
      <div class="btn-row"><button class="btn primary" id="go">Practice them now</button><button class="btn" id="clr">Clear list</button></div>
      ${units.map(u => { const n = qs.filter(q => q.unit === u.id).length; return n ? `<div class="result"><b>Unit ${u.num}: ${esc(u.title)}</b><small>${n} missed</small></div>` : ''; }).join('')}`;
    $('#go').onclick = () => runQuiz({ title: 'Review my misses', questions: shuffle(qs).slice(0, 25), back: '#/review' });
    $('#clr').onclick = () => { if (confirm('Clear your missed-question list?')) { store.missed = {}; save(); renderTOC(); viewReview(); } };
  }
  function viewPractice(id) {
    const q = qById[id];
    if (!q) return viewNotFound();
    runQuiz({ title: 'Practice question', questions: [q], back: `#/unit/${q.unit}` });
  }

  /* ---------- games ---------- */
  function viewGames() {
    setTitle('Games');
    main.innerHTML = `<h1>Games</h1><p class="lede">Review with a little competition. Play solo or project it for the class.</p><div class="grid">
      <a class="card" href="#/games/jeopardy"><h3>Kinesiology Jeopardy</h3><p>One category per unit, 100–500 points. Play solo or with up to 4 teams.</p></a>
      <a class="card" href="#/games/match"><h3>Speed Match</h3><p>Match each term to its definition as fast as you can. Wrong matches add time.</p></a>
      <a class="card" href="#/games/blitz"><h3>Lightning Round</h3><p>60 seconds. Answer as many as you can. Streaks earn bonus points.</p></a></div>`;
  }

  function viewJeopardy() {
    setTitle('Kinesiology Jeopardy');
    main.innerHTML = `<h1>Kinesiology Jeopardy</h1><form class="setup" id="jf"><fieldset><legend>Teams</legend>
      <label>Number of teams: <select name="t"><option value="1">Solo</option><option value="2" selected>2</option><option value="3">3</option><option value="4">4</option></select></label>
      </fieldset><button class="btn primary">Start game</button></form>`;
    $('#jf').onsubmit = e => {
      e.preventDefault();
      const nt = +e.target.t.value;
      const teams = Array.from({ length: nt }, (_, k) => ({ name: nt === 1 ? 'Score' : `Team ${k + 1}`, score: 0 }));
      let turn = 0;
      const vals = [100, 200, 300, 400, 500];
      const cats = units.map(u => {
        const byD = d => shuffle(singleQ(u.questions).filter(q => (q.difficulty || 2) === d));
        const e1 = byD(1), e2 = byD(2), e3 = byD(3), any = shuffle(singleQ(u.questions));
        const pickFrom = (...arrs) => { for (const a of arrs) while (a.length) { const q = a.pop(); if (!used.has(q.id)) { used.add(q.id); return q; } } return null; };
        const used = new Set();
        return { u, qs: [pickFrom(e1, e2, any), pickFrom(e1, e2, any), pickFrom(e2, e1, e3, any), pickFrom(e3, e2, any), pickFrom(e3, e2, any)] };
      });
      const gone = new Set();
      function board() {
        main.innerHTML = `<h1>Kinesiology Jeopardy</h1>
          <div class="teams">${teams.map((t, k) => `<div class="team ${k === turn && nt > 1 ? 'turn' : ''}"><b>${esc(t.name)}</b>: ${t.score}</div>`).join('')}</div>
          ${nt > 1 ? `<p class="meta">${esc(teams[turn].name)} picks.</p>` : ''}
          <div class="jboard" style="grid-template-columns:repeat(${cats.length}, minmax(110px,1fr))">
          ${cats.map(c => `<div class="jcat">${esc(c.u.title)}</div>`).join('')}
          ${vals.map((v, r) => cats.map((c, ci) => `<button class="jcell" data-c="${ci}" data-r="${r}" ${gone.has(ci + '-' + r) || !c.qs[r] ? 'disabled' : ''}>${v}</button>`).join('')).join('')}
          </div><div class="btn-row"><a class="btn" href="#/games">End game</a></div>`;
        main.querySelectorAll('.jcell:not(:disabled)').forEach(b => b.onclick = () => clue(+b.dataset.c, +b.dataset.r));
        if (gone.size >= cats.reduce((n, c) => n + c.qs.filter(Boolean).length, 0)) {
          const best = Math.max(...teams.map(t => t.score));
          main.insertAdjacentHTML('afterbegin', `<div class="card" style="text-align:center;margin-bottom:14px"><div class="score-big">🏆</div><p><b>${teams.filter(t => t.score === best).map(t => esc(t.name)).join(' & ')}</b> ${nt > 1 ? 'wins' : 'final score'} with ${best} points!</p></div>`);
        }
      }
      function clue(ci, r) {
        const q = shuffleChoices(cats[ci].qs[r]), v = vals[r];
        gone.add(ci + '-' + r);
        const m = document.createElement('div'); m.className = 'modal';
        m.innerHTML = `<div class="qcard" role="dialog" aria-modal="true"><div class="qhead"><span>${esc(cats[ci].u.title)}</span><span>${v} points${nt > 1 ? ' · ' + esc(teams[turn].name) : ''}</span></div>
          <p class="qtext">${esc(q.q)}</p><div class="choices">${q.choices.map((c, k) => `<button class="choice" data-k="${k}"><span class="k">${letters[k]}</span><span>${esc(c)}</span></button>`).join('')}</div><div id="jfb"></div></div>`;
        document.body.appendChild(m);
        m.querySelectorAll('.choice').forEach(b => b.onclick = () => {
          const k = +b.dataset.k, ok = k === q.answer;
          teams[turn].score += ok ? v : -v;
          recordAnswer(qById[q.id], ok); save();
          m.querySelectorAll('.choice').forEach((x, j) => { x.disabled = true; if (j === q.answer) x.classList.add('right'); else if (j === k) x.classList.add('wrong'); });
          m.querySelector('#jfb').innerHTML = `<div class="explain ${ok ? 'good' : 'bad'}"><b>${ok ? `+${v}!` : `−${v}.`}</b> ${esc(q.explain || '')}</div><div class="btn-row"><button class="btn primary" id="jback">Back to board</button></div>`;
          m.querySelector('#jback').onclick = () => { m.remove(); turn = (turn + 1) % nt; board(); };
          m.querySelector('#jback').focus();
        });
      }
      cleanup = () => document.querySelectorAll('.modal').forEach(m => m.remove());
      board();
    };
  }

  function viewMatch() {
    setTitle('Speed Match');
    main.innerHTML = `<h1>Speed Match</h1><p class="lede">Match 6 terms to their definitions. Each wrong match adds 5 seconds.</p>
      <form class="setup" id="mf"><fieldset><legend>Terms from</legend><label><select name="u"><option value="all">All units</option>
      ${units.map(u => `<option value="${u.id}">Unit ${u.num}: ${esc(u.title)}</option>`).join('')}</select></label>
      <label>Rounds: <select name="r"><option value="1">1 (6 terms)</option><option value="3" selected>3 (18 terms)</option><option value="5">5 (30 terms)</option></select></label></fieldset>
      <button class="btn primary">Start</button>${store.best.match != null ? ` <span class="meta">Best: ${store.best.match} pts</span>` : ''}</form>`;
    $('#mf').onsubmit = e => {
      e.preventDefault();
      const src = e.target.u.value === 'all' ? allTerms : unitById[e.target.u.value].terms;
      const rounds = +e.target.r.value;
      const pool = shuffle(src.filter(t => t.def.length < 220));
      let round = 0, penalty = 0, misses = 0;
      const start = Date.now();
      let timer;
      function play() {
        const set = pool.slice(round * 6, round * 6 + 6);
        if (!set.length || round >= rounds) return end();
        let sel = null, left = set.length;
        const defs = shuffle(set);
        main.innerHTML = `<h1>Speed Match</h1><div class="qhead"><span>Round ${round + 1} of ${rounds}</span><span>Time: <span class="timer" id="mt">0</span>s · Misses: <span id="mm">${misses}</span></span></div>
          <div class="match-grid"><div class="match-col">${set.map((t, k) => `<button class="tile" data-side="t" data-k="${pool.indexOf(t)}"><b>${esc(t.term)}</b></button>`).join('')}</div>
          <div class="match-col">${defs.map(t => `<button class="tile" data-side="d" data-k="${pool.indexOf(t)}">${esc(t.def)}</button>`).join('')}</div></div>`;
        main.querySelectorAll('.tile').forEach(b => b.onclick = () => {
          if (b.classList.contains('gone')) return;
          if (!sel || sel.dataset.side === b.dataset.side) { if (sel) sel.classList.remove('sel'); sel = b; b.classList.add('sel'); return; }
          if (sel.dataset.k === b.dataset.k) {
            sel.classList.add('gone'); b.classList.add('gone'); sel = null;
            if (--left === 0) { round++; setTimeout(play, 250); }
          } else {
            misses++; penalty += 5; $('#mm').textContent = misses;
            [sel, b].forEach(x => { x.classList.remove('miss'); void x.offsetWidth; x.classList.add('miss'); });
            sel.classList.remove('sel'); sel = null;
          }
        });
      }
      timer = setInterval(() => { const el = $('#mt'); if (el) el.textContent = Math.round((Date.now() - start) / 1000 + penalty); }, 250);
      cleanup = () => clearInterval(timer);
      function end() {
        clearInterval(timer);
        const secs = Math.round((Date.now() - start) / 1000 + penalty);
        const n = Math.min(rounds * 6, pool.length);
        const pts = Math.max(0, Math.round(n * 100 - secs * 10));
        store.best.match = Math.max(store.best.match || 0, pts); save();
        main.innerHTML = `<h1>Speed Match</h1><div class="card" style="text-align:center"><div class="score-big">${pts}</div><p>points · ${n} matches in ${secs}s (including ${penalty}s penalty)</p>
          <div class="btn-row" style="justify-content:center"><button class="btn primary" id="ag">Play again</button><a class="btn" href="#/games">All games</a></div></div>`;
        $('#ag').onclick = () => viewMatch();
      }
      play();
    };
  }

  function viewBlitz() {
    setTitle('Lightning Round');
    main.innerHTML = `<h1>Lightning Round</h1><p class="lede">60 seconds on the clock. +10 per correct answer, +5 bonus for each answer in a streak of 3 or more. Wrong answers cost 3 seconds.</p>
      <form class="setup" id="bf"><fieldset><legend>Questions from</legend><label><select name="u"><option value="all">All units</option>
      ${units.map(u => `<option value="${u.id}">Unit ${u.num}: ${esc(u.title)}</option>`).join('')}</select></label></fieldset>
      <button class="btn primary">Go!</button>${store.best.blitz != null ? ` <span class="meta">Best: ${store.best.blitz} pts</span>` : ''}</form>`;
    $('#bf').onsubmit = e => {
      e.preventDefault();
      const pool = shuffle(singleQ(e.target.u.value === 'all' ? allQ : unitById[e.target.u.value].questions));
      let i = 0, score = 0, streak = 0, left = 60, right = 0, lock = false;
      const log = [];
      function draw() {
        const q = shuffleChoices(pool[i % pool.length]);
        main.innerHTML = `<h1>Lightning Round</h1><div class="qhead"><span>Score: <b>${score}</b> · Streak: ${streak}${streak >= 3 ? ' 🔥' : ''}</span><span class="timer ${left <= 10 ? 'low' : ''}" id="bt">${left}s</span></div>
          <div class="progress"><i id="bp" style="width:${pct(left, 60)}%"></i></div>
          <div class="qcard"><p class="qtext">${esc(q.q)}</p><div class="choices">${q.choices.map((c, k) => `<button class="choice" data-k="${k}"><span class="k">${letters[k]}</span><span>${esc(c)}</span></button>`).join('')}</div></div>`;
        main.querySelectorAll('.choice').forEach(b => b.onclick = () => {
          if (lock) return; lock = true;
          const k = +b.dataset.k, ok = k === q.answer;
          log.push({ q, k, ok });
          recordAnswer(qById[q.id], ok);
          if (ok) { right++; streak++; score += 10 + (streak >= 3 ? 5 : 0); } else { streak = 0; left = Math.max(0, left - 3); }
          b.classList.add(ok ? 'right' : 'wrong');
          if (!ok) main.querySelector(`.choice[data-k="${q.answer}"]`).classList.add('right');
          setTimeout(() => { lock = false; i++; if (left > 0) draw(); }, ok ? 250 : 900);
        });
      }
      const timer = setInterval(() => {
        left--;
        const el = $('#bt'); if (el) { el.textContent = left + 's'; el.classList.toggle('low', left <= 10); }
        const bp = $('#bp'); if (bp) bp.style.width = pct(left, 60) + '%';
        if (left <= 0) end();
      }, 1000);
      cleanup = () => clearInterval(timer);
      function end() {
        clearInterval(timer); save();
        store.best.blitz = Math.max(store.best.blitz || 0, score); save();
        main.innerHTML = `<h1>Lightning Round</h1><div class="card" style="text-align:center"><div class="score-big">${score}</div><p>points · ${right} of ${log.length} correct</p>
          <div class="btn-row" style="justify-content:center"><button class="btn primary" id="ag">Play again</button><a class="btn" href="#/games">All games</a></div></div>${reviewList(log)}`;
        $('#ag').onclick = () => viewBlitz();
      }
      draw();
    };
  }

  /* ---------- Muscle Finder ---------- */
  const REGION_ORDER = ['Head & Neck', 'Trunk & Respiration', 'Shoulder Girdle', 'Shoulder', 'Elbow & Forearm', 'Wrist', 'Hand', 'Hip', 'Knee', 'Ankle & Foot'];
  const baseAction = a => a.replace(/\s*\(assist[^)]*\)\s*/i, '').trim();
  const isAssist = a => /\(assist/i.test(a);
  const mf = { text: '', region: '', nerve: '', joint: '', action: '', assists: true, two: false, sort: 'name' };
  function muscleMatches(m) {
    if (mf.region && m.region !== mf.region) return false;
    if (mf.nerve && m.nerve !== mf.nerve) return false;
    if (mf.joint && !(m.joints || []).includes(mf.joint)) return false;
    if (mf.two && !m.twoJoint) return false;
    if (mf.action && !m.actions.some(a => baseAction(a) === mf.action && (mf.assists || !isAssist(a)))) return false;
    if (mf.text) {
      const hay = [m.name, m.region, m.origin, m.insertion, m.nerve, m.roots, m.stretch, m.notes, ...m.actions].join(' ').toLowerCase();
      if (!mf.text.toLowerCase().split(/\s+/).filter(Boolean).every(t => hay.includes(t))) return false;
    }
    return true;
  }
  function muscleCard(m, open) {
    const sec = m.section && secById[m.section];
    const u = unitById[m.unit];
    return `<details class="mcard" ${open ? 'open' : ''} data-name="${esc(m.name)}"><summary><b>${esc(m.name)}</b><span class="chip">${esc(m.region)}</span><span class="mnerve">${esc(m.nerve)}${m.roots ? ` · ${esc(m.roots)}` : ''}</span></summary>
      <dl>
        <dt>Origin</dt><dd>${esc(m.origin)}</dd>
        <dt>Insertion</dt><dd>${esc(m.insertion)}</dd>
        <dt>Actions</dt><dd><ul>${m.actions.map(a => `<li>${esc(a)}</li>`).join('')}</ul></dd>
        <dt>Nerve</dt><dd>${esc(m.nerve)}${m.roots ? ` (${esc(m.roots)})` : ''}</dd>
        ${m.stretch ? `<dt>Stretch</dt><dd>${esc(m.stretch)}</dd>` : ''}
        <dt>Crosses</dt><dd>${esc((m.joints || []).join(', '))}${m.twoJoint ? ' <span class="chip">two-joint</span>' : ''}</dd>
        ${m.notes ? `<dt>Notes</dt><dd>${esc(m.notes)}</dd>` : ''}
      </dl>
      ${sec ? `<a href="#/unit/${sec.u.id}/${sec.s.id}">Read in notes: ${esc(sec.s.heading)} ›</a>` : u ? `<a href="#/unit/${u.id}">Read in notes: ${esc(u.title)} ›</a>` : ''}
    </details>`;
  }
  function viewMuscles(openName) {
    setTitle('Muscle Finder');
    if (!muscles.length) { main.innerHTML = '<h1>Muscle Finder</h1><div class="empty">No muscle data yet.</div>'; return; }
    const uniq = arr => [...new Set(arr)].filter(Boolean).sort((a, b) => a.localeCompare(b));
    const regions = REGION_ORDER.filter(r => muscles.some(m => m.region === r)).concat(uniq(muscles.map(m => m.region)).filter(r => !REGION_ORDER.includes(r)));
    const nerves = uniq(muscles.map(m => m.nerve));
    const joints = uniq(muscles.flatMap(m => m.joints || []));
    const actions = uniq(muscles.flatMap(m => m.actions.map(baseAction)));
    if (openName) { mf.text = ''; mf.region = ''; mf.nerve = ''; mf.joint = ''; mf.action = ''; mf.two = false; }
    const opt = (list, cur, all) => `<option value="">${all}</option>` + list.map(x => `<option ${x === cur ? 'selected' : ''}>${esc(x)}</option>`).join('');
    main.innerHTML = `<h1>Muscle Finder</h1>
      <p class="lede">Every muscle in the course with origin, insertion, actions, nerve and stretch. Filter by nerve, joint or motion, for example "everything the median nerve supplies" or "all hip flexors".</p>
      <div class="mfilters card">
        <input type="search" id="mText" placeholder="Search muscles, e.g. 'greater tubercle'" value="${esc(mf.text)}" aria-label="Search muscles">
        <div class="mselects">
          <label>Region<select id="mRegion">${opt(regions, mf.region, 'All regions')}</select></label>
          <label>Nerve<select id="mNerve">${opt(nerves, mf.nerve, 'All nerves')}</select></label>
          <label>Joint crossed<select id="mJoint">${opt(joints, mf.joint, 'Any joint')}</select></label>
          <label>Motion<select id="mAction">${opt(actions, mf.action, 'Any motion')}</select></label>
          <label>Sort by<select id="mSort"><option value="name">Name</option><option value="region" ${mf.sort === 'region' ? 'selected' : ''}>Region</option><option value="nerve" ${mf.sort === 'nerve' ? 'selected' : ''}>Nerve</option></select></label>
        </div>
        <div class="mchecks"><label><input type="checkbox" id="mTwo" ${mf.two ? 'checked' : ''}> Two-joint muscles only</label>
          <label><input type="checkbox" id="mAssist" ${mf.assists ? 'checked' : ''}> Include muscles that only assist the motion</label>
          <button class="btn" id="mReset" type="button">Clear filters</button></div>
      </div>
      <div class="btn-row" style="align-items:center"><b id="mCount"></b><button class="btn primary" id="mQuiz">Quiz me on these</button><button class="btn" id="mExpand">Expand all</button></div>
      <div id="mList"></div>`;
    let expanded = false;
    function list() {
      const shown = muscles.filter(muscleMatches);
      const key = { name: m => m.name, region: m => String(REGION_ORDER.indexOf(m.region)).padStart(2, '0') + m.name, nerve: m => m.nerve + m.name }[mf.sort];
      shown.sort((a, b) => key(a).localeCompare(key(b)));
      $('#mCount').textContent = `${shown.length} muscle${shown.length === 1 ? '' : 's'}`;
      $('#mQuiz').disabled = shown.length < 1;
      $('#mList').innerHTML = shown.map(m => muscleCard(m, expanded || m.name === openName)).join('') || '<div class="empty">No muscles match. Try clearing a filter.</div>';
      return shown;
    }
    const bind = (id, k, prop = 'value') => { $(id).addEventListener(prop === 'value' ? 'input' : 'change', e => { mf[k] = e.target[prop]; openName = null; list(); }); };
    bind('#mText', 'text'); bind('#mRegion', 'region'); bind('#mNerve', 'nerve'); bind('#mJoint', 'joint'); bind('#mAction', 'action'); bind('#mSort', 'sort');
    bind('#mTwo', 'two', 'checked'); bind('#mAssist', 'assists', 'checked');
    $('#mReset').onclick = () => { Object.assign(mf, { text: '', region: '', nerve: '', joint: '', action: '', assists: true, two: false }); viewMuscles(); };
    $('#mExpand').onclick = () => { expanded = !expanded; $('#mExpand').textContent = expanded ? 'Collapse all' : 'Expand all'; list(); };
    $('#mQuiz').onclick = () => {
      const shown = muscles.filter(muscleMatches);
      runQuiz({ title: 'Muscle drill', questions: muscleQuestions(shown, 15), key: 'muscles', back: '#/muscles' });
    };
    list();
    if (openName) { const el = main.querySelector(`.mcard[data-name="${CSS.escape(openName)}"]`); if (el) { el.scrollIntoView({ block: 'center' }); return true; } }
  }
  /* Build drill questions from muscle data. Distractors come from the whole list. */
  function muscleQuestions(set, n) {
    const out = [];
    const pickOthers = (correct, pool, k = 3) => shuffle([...new Set(pool.filter(x => x && x !== correct))]).slice(0, k);
    const sec = m => (m.section && secById[m.section] ? m.section : '');
    const makers = [
      m => { const o = pickOthers(m.nerve, muscles.map(x => x.nerve)); return o.length < 3 ? null : { q: `Which nerve innervates the ${m.name}?`, choices: [m.nerve, ...o], answer: 0, explain: `${m.name}: ${m.nerve}${m.roots ? ` (${m.roots})` : ''}.` }; },
      m => {
        const near = muscles.filter(x => x.region === m.region && x.name !== m.name).map(x => x.name);
        const o = pickOthers(m.name, near.length >= 3 ? near : muscles.map(x => x.name));
        return o.length < 3 ? null : { q: `Which muscle originates on ${m.origin.replace(/\.$/, '')} and inserts on ${m.insertion.replace(/\.$/, '')}?`, choices: [m.name, ...o], answer: 0, explain: `That is the ${m.name}.` };
      },
      m => {
        const mine = m.actions.filter(a => !isAssist(a)).map(baseAction);
        if (!mine.length) return null;
        const c = mine[Math.floor(Math.random() * mine.length)];
        const allMine = new Set(m.actions.map(baseAction));
        const o = pickOthers(c, muscles.filter(x => x.region === m.region || Math.random() < 0.2).flatMap(x => x.actions.map(baseAction)).filter(a => !allMine.has(a)));
        return o.length < 3 ? null : { q: `Which motion is a main action of the ${m.name}?`, choices: [c, ...o], answer: 0, explain: `${m.name} actions: ${m.actions.join('; ')}.` };
      },
      m => {
        if (!m.stretch) return null;
        const o = pickOthers(m.stretch, muscles.filter(x => x.region === m.region).map(x => x.stretch));
        return o.length < 3 ? null : { q: `Which position stretches the ${m.name}?`, choices: [m.stretch, ...o], answer: 0, explain: `Stretch the ${m.name} by putting it opposite its actions: ${m.stretch}.` };
      },
    ];
    let tries = 0;
    const seen = new Set();
    while (out.length < n && tries++ < n * 20 && set.length) {
      const m = set[Math.floor(Math.random() * set.length)], k = Math.floor(Math.random() * makers.length);
      if (seen.has(m.name + k)) continue;
      const q = makers[k](m);
      if (!q) continue;
      seen.add(m.name + k);
      out.push({ ...q, id: `m-${out.length}`, section: sec(m), unit: m.unit, difficulty: 2 });
    }
    return out;
  }

  function viewNotFound() { main.innerHTML = `<h1>Page not found</h1><p><a href="#/">Go home</a></p>`; }

  /* ---------- router ---------- */
  function route() {
    if (cleanup) { cleanup(); cleanup = null; }
    const hash = location.hash || '#/';
    const [path, qs] = hash.slice(1).split('?');
    const parts = path.split('/').filter(Boolean);
    renderTOC();
    let scrolled = false;
    switch (parts[0]) {
      case undefined: viewHome(); break;
      case 'unit': scrolled = viewUnit(parts[1], parts[2]); break;
      case 'search': viewSearch(new URLSearchParams(qs || '').get('q') || ''); break;
      case 'cards': viewCards(parts[1] || 'all'); break;
      case 'quiz':
        if (parts[1] === 'unit' && unitById[parts[2]]) runQuiz({ title: `Unit ${unitById[parts[2]].num} quiz: ${unitById[parts[2]].title}`, questions: shuffle(unitById[parts[2]].questions).slice(0, 10), key: 'unit-' + parts[2], back: `#/unit/${parts[2]}` });
        else if (parts[1] === 'section' && secById[parts[2]]) { const { s, u } = secById[parts[2]]; runQuiz({ title: `Check yourself: ${s.heading}`, questions: shuffle(u.questions.filter(q => q.section === s.id)).slice(0, 10), back: `#/unit/${u.id}/${s.id}` }); }
        else viewQuizSetup();
        break;
      case 'exams': viewExams(); break;
      case 'exam': runExam(parts[1]); break;
      case 'review': viewReview(); break;
      case 'muscles': scrolled = viewMuscles(new URLSearchParams(qs || '').get('m')); break;
      case 'practice': viewPractice(parts[1]); break;
      case 'games':
        if (parts[1] === 'jeopardy') viewJeopardy();
        else if (parts[1] === 'match') viewMatch();
        else if (parts[1] === 'blitz') viewBlitz();
        else viewGames();
        break;
      default: viewNotFound();
    }
    if (!scrolled) window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();
})();
