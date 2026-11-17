/* Teacher dashboard: load student files, auto-score, review written answers, export CSV. All local, nothing uploaded. */
(function () {
  const AI = (window.AI = window.AI || {});
  const h = AI.h, root = document.getElementById('app');
  const OVKEY = 'ailab_ch3_teacher_ov';
  let ov = {}; try { ov = JSON.parse(localStorage.getItem(OVKEY) || '{}'); } catch (e) { ov = {}; }
  const saveOv = () => { try { localStorage.setItem(OVKEY, JSON.stringify(ov)); } catch (e) { /* ignore */ } };
  let entries = {}, errors = [], countProv = true, period = 'all', query = '', sortKey = 'last', sortDir = 1, view = 'scores', modalKey = null;

  const keyOf = (s) => [s.student.last, s.student.first, s.student.period].map((x) => String(x || '').trim().toLowerCase()).join('|');
  function calc(e) {
    const r = AI.score(e.sub, ov[e.key] || {});
    r.sections.forEach((s) => { s.adj = s.items.reduce((a, i) => a + (!countProv && i.type === 'open' && i.status === 'provisional' ? 0 : i.earned), 0); });
    r.totalAdj = r.sections.reduce((a, s) => a + s.adj, 0); return r;
  }
  function score() { Object.values(entries).forEach((e) => (e.r = calc(e))); }

  async function addFiles(files) {
    for (const f of files) {
      try {
        const sub = AI.parseFile(await AI.readFile(f)); if (!sub.student || !sub.answers) throw new Error('Missing data');
        const key = keyOf(sub), ok = AI.verify(sub), prev = entries[key];
        const rank = (x) => (x.sub.kind === 'submission' ? 1e15 : 0) + (x.sub.exportedAt || 0);
        const e = { key, sub, ok, file: f.name }; if (!prev || rank(e) >= rank(prev)) entries[key] = e;
      } catch (err) { errors.push(f.name + ': ' + err.message); }
    }
    score(); render();
  }

  const pctOf = (e) => (e.r.max ? (countProv ? e.r.total : e.r.totalAdj) / e.r.max : 0);
  const fmt = (v) => (Math.round(v * 10) / 10).toString();
  const secScore = (e, id) => { const s = e.r.sections.find((x) => x.id === id); return countProv ? s.earned : s.adj; };

  function sorted() {
    let list = Object.values(entries);
    if (period !== 'all') list = list.filter((e) => String(e.sub.student.period) === period);
    if (query) list = list.filter((e) => (e.sub.student.first + ' ' + e.sub.student.last).toLowerCase().indexOf(query.toLowerCase()) >= 0);
    const val = { last: (e) => (e.sub.student.last + ' ' + e.sub.student.first).toLowerCase(), period: (e) => String(e.sub.student.period), total: (e) => pctOf(e), done: (e) => e.r.pctDone, review: (e) => e.r.reviewCount, min: (e) => e.r.minutes };
    ['a3', 'a4', 'a5', 'a6', 'a7', 'fin'].forEach((id) => (val[id] = (e) => secScore(e, id)));
    return list.sort((a, b) => { const x = val[sortKey](a), y = val[sortKey](b); return (x > y ? 1 : x < y ? -1 : 0) * sortDir; });
  }

  // ---------- CSV ----------
  const csv = (rows) => rows.map((r) => r.map((c) => '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"').join(',')).join('\r\n');
  function exportClass() {
    const rows = [['Last', 'First', 'Period', 'File type', 'Activity 3', 'Activity 4', 'Activity 5', 'Activity 6', 'Activity 7', 'Final', 'Total', 'Max', 'Percent', 'Written answers still provisional', 'Tasks completed %', 'Active minutes', 'Integrity', 'Flags']];
    const mx = {}; sorted().forEach((e) => e.r.sections.forEach((s) => (mx[s.id] = s.max)));
    rows.push(['MAX POINTS', '', '', '', mx.a3, mx.a4, mx.a5, mx.a6, mx.a7, mx.fin, Object.values(mx).reduce((a, b) => a + b, 0), '', '', '', '', '', '', '']);
    sorted().forEach((e) => { const s = e.sub.student; rows.push([s.last, s.first, s.period, e.sub.kind, fmt(secScore(e, 'a3')), fmt(secScore(e, 'a4')), fmt(secScore(e, 'a5')), fmt(secScore(e, 'a6')), fmt(secScore(e, 'a7')), fmt(secScore(e, 'fin')), fmt(countProv ? e.r.total : e.r.totalAdj), e.r.max, Math.round(pctOf(e) * 100) + '%', e.r.reviewCount, Math.round(e.r.pctDone * 100) + '%', e.r.minutes, e.ok ? 'Verified' : 'EDITED AFTER DOWNLOAD', e.r.flags.join('; ')]); });
    AI.download('Chapter3_AI_Lab_scores.csv', csv(rows), 'text/csv');
  }
  function exportItems() {
    const rows = [['Last', 'First', 'Period', 'Section', 'Item', 'Type', 'Task', 'Earned', 'Max', 'Status', 'Detail / student answer']];
    sorted().forEach((e) => e.r.sections.forEach((s) => s.items.forEach((i) => rows.push([e.sub.student.last, e.sub.student.first, e.sub.student.period, s.id, i.id, i.type, i.label, fmt(i.earned), i.max, i.status, i.detail]))));
    AI.download('Chapter3_AI_Lab_item_detail.csv', csv(rows), 'text/csv');
  }

  // ---------- views ----------
  function pixSmall(g) { const el = h('div', { style: { display: 'inline-grid', gridTemplateColumns: 'repeat(6,14px)', gap: '1px', background: '#8A93A6', padding: '1px', margin: '2px 8px 2px 0' } }); g.join('').split('').forEach((c) => el.appendChild(h('i', { style: { width: '14px', height: '14px', background: c === '1' ? '#111' : '#fff', display: 'block' } }))); return el; }

  function scoresView() {
    const list = sorted(), periods = Array.from(new Set(Object.values(entries).map((e) => String(e.sub.student.period)))).sort();
    const avg = list.length ? list.reduce((a, e) => a + pctOf(e), 0) / list.length : 0, rev = list.reduce((a, e) => a + e.r.reviewCount, 0);
    const th = (k, t) => h('th', { text: t + (sortKey === k ? (sortDir > 0 ? ' \u25B2' : ' \u25BC') : ''), onclick: () => { if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = k === 'last' || k === 'period' ? 1 : -1; } render(); } });
    const mx = {}; if (list[0]) list[0].r.sections.forEach((s) => (mx[s.id] = s.max));
    const sel = h('select', { class: 'inl', 'aria-label': 'Filter by period' }, h('option', { value: 'all', text: 'All periods' }), periods.map((p) => h('option', { value: p, text: 'Period ' + p })));
    sel.value = period; sel.addEventListener('change', () => { period = sel.value; render(); });
    const q = h('input', { type: 'text', placeholder: 'Search name', style: { width: '180px' }, value: query, 'aria-label': 'Search name' }); q.addEventListener('input', () => { query = q.value; const pos = q.selectionStart; renderTable(); });
    const cp = h('input', { type: 'checkbox', checked: countProv }); cp.addEventListener('change', () => { countProv = cp.checked; score(); render(); });
    const tableHost = h('div', { class: 'scroll', id: 'tablehost' });
    function renderTable() {
      const L = sorted(); tableHost.innerHTML = '';
      tableHost.appendChild(h('table', { class: 't sortable' }, h('tr', null, th('last', 'Student'), th('period', 'Per.'), th('a3', 'A3 /' + (mx.a3 || '')), th('a4', 'A4 /' + (mx.a4 || '')), th('a5', 'A5 /' + (mx.a5 || '')), th('a6', 'A6 /' + (mx.a6 || '')), th('a7', 'A7 /' + (mx.a7 || '')), th('fin', 'Final /' + (mx.fin || '')), th('total', 'Total'), th('done', 'Done'), th('review', 'To review'), th('min', 'Min.'), h('th', { text: 'File' }), h('th', { text: 'Flags' })),
        L.map((e) => h('tr', { style: { cursor: 'pointer' }, onclick: () => { modalKey = e.key; render(); } },
          h('td', { text: e.sub.student.last + ', ' + e.sub.student.first }), h('td', { class: 'num', text: e.sub.student.period }),
          ['a3', 'a4', 'a5', 'a6', 'a7', 'fin'].map((id) => h('td', { class: 'num', text: fmt(secScore(e, id)) })),
          h('td', { class: 'num' }, h('b', { text: fmt(countProv ? e.r.total : e.r.totalAdj) + ' (' + Math.round(pctOf(e) * 100) + '%)' })), h('td', { class: 'num', text: Math.round(e.r.pctDone * 100) + '%' }),
          h('td', { class: 'num', text: e.r.reviewCount ? e.r.reviewCount + ' open' : '\u2713' }), h('td', { class: 'num', text: e.r.minutes }),
          h('td', null, h('span', { class: 'pill ' + (e.ok ? 'ok' : 'bad'), text: e.ok ? 'Verified' : 'Edited' }), ' ', h('span', { class: 'pill ' + (e.sub.kind === 'submission' ? 'ok' : 'warn'), text: e.sub.kind === 'submission' ? 'Submitted' : 'Progress' })),
          h('td', { text: e.r.flags.join('; ') })))));
    }
    renderTable();
    return h('div', null,
      h('div', { class: 'meter' }, AI.meterBox('Students loaded', list.length), AI.meterBox('Class average', Math.round(avg * 100) + '%'), AI.meterBox('Written answers to review', rev, rev ? 'low' : 'good'), AI.meterBox('Files with problems', errors.length, errors.length ? 'low' : 'good')),
      errors.length ? h('div', { class: 'banner bad', html: '<b>Could not read:</b><br>' + errors.map((x) => x.replace(/</g, '&lt;')).join('<br>') }) : null,
      h('div', { class: 'toolbar' }, sel, q, h('label', null, cp, ' Count provisional written scores in totals'), h('button', { class: 'btn sm go', type: 'button', text: 'Export class scores (CSV)', onclick: exportClass }), h('button', { class: 'btn sm alt', type: 'button', text: 'Export item detail (CSV)', onclick: exportItems }), h('button', { class: 'btn sm alt', type: 'button', text: 'Clear loaded files', onclick: () => { if (confirm('Remove all loaded students from this page? (Your written-answer scores stay saved.)')) { entries = {}; errors = []; render(); } } })),
      list.length ? tableHost : h('p', { class: 'tag', text: 'No students loaded yet. Drop files above.' }),
      h('p', { class: 'tag', text: 'Click a student to see every answer and adjust written-answer scores. \u201CTo review\u201D counts written answers still using the automatic rubric.' }));
  }

  function insightsView() {
    const list = Object.values(entries); if (!list.length) return h('p', { class: 'tag', text: 'Load student files to see class insights.' });
    const out = h('div');
    // CFU table
    const rows = AI.CFU.map((q) => {
      let n = 0, first = 0, ever = 0; const wrong = {};
      list.forEach((e) => { const at = ((e.sub.cfu || {})[q.id] || {}).attempts || []; if (!at.length) return; n++; if (at[0] === q.a) first++; else wrong[at[0]] = (wrong[at[0]] || 0) + 1; if (at.indexOf(q.a) >= 0) ever++; });
      const topWrong = Object.keys(wrong).sort((a, b) => wrong[b] - wrong[a])[0];
      return { q, n, first: n ? first / n : null, ever: n ? ever / n : null, topWrong: topWrong != null ? { idx: +topWrong, n: wrong[topWrong] } : null };
    }).sort((a, b) => (a.first == null ? 2 : a.first) - (b.first == null ? 2 : b.first));
    out.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Check-for-understanding: what to reteach' }), h('p', { class: 'tag', text: 'Sorted from lowest first-try accuracy. Below 60% is highlighted.' }),
      h('div', { class: 'scroll' }, h('table', { class: 't' }, h('tr', null, ['Question', 'Activity', 'Answered', 'First try correct', 'Correct by 2nd try', 'Most common wrong first answer'].map((x) => h('th', { text: x }))),
        rows.map((r) => h('tr', { class: r.first != null && r.first < 0.6 ? 'hl' : '' }, h('td', { text: r.q.q }), h('td', { class: 'num', text: r.q.act }), h('td', { class: 'num', text: r.n }), h('td', { class: 'num', text: r.first == null ? '\u2014' : Math.round(r.first * 100) + '%' }), h('td', { class: 'num', text: r.ever == null ? '\u2014' : Math.round(r.ever * 100) + '%' }), h('td', { text: r.topWrong ? String.fromCharCode(65 + r.topWrong.idx) + '. ' + r.q.c[r.topWrong.idx] + ' (' + r.topWrong.n + ')' : '' })))))));
    // do tasks
    const doMap = {}; list.forEach((e) => e.r.sections.forEach((s) => s.items.filter((i) => i.type === 'do').forEach((i) => { const m = (doMap[i.id] = doMap[i.id] || { label: i.label, sec: s.id, max: i.max, sum: 0, n: 0 }); m.sum += i.earned; m.n++; })));
    out.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Hands-on tasks: average score' }), h('table', { class: 't' }, h('tr', null, ['Task', 'Section', 'Average', 'Out of'].map((x) => h('th', { text: x }))), Object.values(doMap).map((m) => h('tr', { class: m.sum / m.n / m.max < 0.6 ? 'hl' : '' }, h('td', { text: m.label }), h('td', { class: 'num', text: m.sec }), h('td', { class: 'num', text: (m.sum / m.n).toFixed(2) }), h('td', { class: 'num', text: m.max }))))));
    // metrics
    const avgOf = (k) => { const v = list.map((e) => e.r.metrics[k]).filter((x) => x != null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
    out.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Train the Machine: class averages' }), h('div', { class: 'meter' }, AI.meterBox('Mission 1 best first-try test accuracy', AI.pct(avgOf('m1best'))), AI.meterBox('Mission 3 best test accuracy', AI.pct(avgOf('m3best'))), AI.meterBox('Mission 6 gain on rare creatures', avgOf('m6gain') == null ? '\u2014' : '+' + Math.round(avgOf('m6gain') * 100) + ' pts')),
      h('p', { class: 'tag', text: 'A low Mission 1 average means many students trusted height. That is the lesson, so debrief it.' })));
    // histogram
    const bins = new Array(10).fill(0); list.forEach((e) => { bins[Math.min(9, Math.floor(pctOf(e) * 10))]++; });
    out.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Score distribution' }), bins.map((n, i) => h('div', { style: { display: 'flex', gap: '8px', alignItems: 'center', margin: '2px 0' } }, h('span', { style: { width: '70px' }, text: i * 10 + '\u2013' + (i * 10 + 9) + '%' }), h('div', { class: 'bar', style: { flex: '1' } }, h('i', { style: { width: (list.length ? n / list.length * 100 : 0) + '%' } })), h('b', { text: n })))));
    return out;
  }

  function helpView() {
    return h('div', { class: 'card' }, h('h3', { text: 'How scoring works' }),
      h('ul', null,
        h('li', { html: '<b>Hands-on tasks</b> are scored automatically by re-running the same code the students used. Test accuracies and settings are recomputed from their raw choices, never trusted from a stored score. For data missions, only the first test on each dataset counts.' }),
        h('li', { html: '<b>Check-for-understanding questions</b>: correct on try one = full point, try two = half a point.' }),
        h('li', { html: '<b>Written answers</b> get a <b>provisional</b> score from a transparent rubric (enough words and at least two key ideas = full credit; some effort = partial; blank or tiny = 0). Click a student to read each answer and override the score. Overrides are saved in this browser.' }),
        h('li', { html: '<b>Verified / Edited</b>: each file carries a fingerprint. If a student changes the file after downloading, it shows <b>Edited</b>. This deters casual tampering but is not bank-grade security: the answer key lives in the page code, so treat this as formative scoring.' }),
        h('li', { html: '<b>Flags</b> are hints, not verdicts: very short active time, duplicate written answers, or a missing name.' }),
        h('li', { html: 'Students who submit more than once: the newest <b>Submission</b> file for the same name and period wins.' })),
      h('p', { text: 'Nothing is uploaded anywhere. Everything on this page runs in your browser.' }));
  }

  function modal() {
    const e = entries[modalKey]; if (!e) return null; const r = e.r, s = e.sub.student;
    const close = () => { modalKey = null; render(); };
    const secs = r.sections.map((sec) => h('div', { class: 'card' }, h('h3', { text: sec.title + ' \u2014 ' + fmt(countProv ? sec.earned : sec.adj) + ' / ' + sec.max }),
      h('div', { class: 'scroll' }, h('table', { class: 't' }, h('tr', null, ['Task', 'Student work / detail', 'Score'].map((x) => h('th', { text: x }))),
        sec.items.map((i) => {
          let detail;
          if (i.type === 'open') detail = h('div', null, h('div', { style: { whiteSpace: 'pre-wrap' }, text: i.detail || '(blank)' }), h('div', { class: 'tag', text: i.words + ' words, ' + i.hits + ' key idea(s) found' }));
          else if (i.fools) detail = h('div', null, h('div', { text: i.detail }), i.fools.map((f) => h('span', null, pixSmall(f.grid), h('span', { class: 'tag', text: 'meant ' + f.intended + ' \u2192 net ' + AI.pixNet(f.grid).out + '  ' }))));
          else detail = h('div', { text: i.detail });
          let cell;
          if (i.type === 'open') {
            const inp = h('input', { type: 'number', min: 0, max: i.max, step: 0.5, value: i.status === 'reviewed' ? i.earned : '', placeholder: String(i.auto), style: { width: '70px' }, 'aria-label': 'Override score' });
            inp.addEventListener('change', () => { ov[e.key] = ov[e.key] || {}; if (inp.value === '') delete ov[e.key][i.id]; else ov[e.key][i.id] = Math.max(0, Math.min(i.max, Number(inp.value))); saveOv(); e.r = calc(e); render(); });
            cell = h('div', null, inp, ' / ' + i.max, h('div', { class: 'tag', text: i.status === 'reviewed' ? 'reviewed' : i.status === 'provisional' ? 'auto ' + i.auto : 'blank' }));
          } else cell = h('div', { class: 'num', text: fmt(i.earned) + ' / ' + i.max });
          return h('tr', null, h('td', { text: i.label }), h('td', null, detail), h('td', null, cell));
        })))));
    return h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', onclick: (ev) => { if (ev.target.classList.contains('modal')) close(); } }, h('div', null,
      h('div', { class: 'toolbar' }, h('h2', { style: { margin: 0 }, text: s.first + ' ' + s.last + ' \u2022 Period ' + s.period }), h('button', { class: 'btn sm', type: 'button', style: { marginLeft: 'auto' }, text: 'Close', onclick: close })),
      h('div', { class: 'meter' }, AI.meterBox('Total', fmt(countProv ? r.total : r.totalAdj) + ' / ' + r.max), AI.meterBox('Tasks completed', Math.round(r.pctDone * 100) + '%'), AI.meterBox('Active minutes', r.minutes), AI.meterBox('File', e.ok ? 'Verified' : 'Edited', e.ok ? 'good' : 'low')),
      r.flags.length ? h('div', { class: 'banner warn', text: 'Flags: ' + r.flags.join('; ') }) : null, secs));
  }

  function render() {
    const keepScroll = window.scrollY; root.innerHTML = '';
    const drop = h('div', { class: 'drop', tabindex: 0, role: 'button', 'aria-label': 'Choose student files' }, h('b', { text: 'Drop student .json files here' }), h('div', { class: 'tag', text: 'or click to choose files. You can select many at once.' }));
    const inp = h('input', { type: 'file', multiple: true, accept: '.json,application/json', class: 'sr', tabindex: '-1' }); inp.addEventListener('change', () => { addFiles(Array.from(inp.files)); inp.value = ''; });
    drop.addEventListener('click', () => inp.click()); drop.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') inp.click(); });
    drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('over'); }); drop.addEventListener('dragleave', () => drop.classList.remove('over'));
    drop.addEventListener('drop', (e) => { e.preventDefault(); drop.classList.remove('over'); addFiles(Array.from(e.dataTransfer.files)); });
    const tabs = h('div', { class: 'tabs' }, [['scores', 'Scores'], ['insights', 'Class insights'], ['help', 'How scoring works']].map((t) => h('button', { class: 'tab' + (view === t[0] ? ' on' : ''), type: 'button', text: t[1], onclick: () => { view = t[0]; render(); } })));
    root.appendChild(h('div', { class: 'hero' }, h('h1', { text: 'Teacher dashboard' }), h('p', { text: 'Chapter 3 AI Lab. Load the files students turned in on Google Classroom and every activity is scored for you.' })));
    root.appendChild(h('div', { class: 'card' }, drop, inp));
    root.appendChild(tabs); root.appendChild(view === 'scores' ? scoresView() : view === 'insights' ? insightsView() : helpView());
    root.appendChild(AI.TECH_FOOTER());
    const m = modal(); if (m) root.appendChild(m);
    window.scrollTo(0, keepScroll);
  }
  AI.teacherLoad = addFiles; // for testing
  render();
})();
