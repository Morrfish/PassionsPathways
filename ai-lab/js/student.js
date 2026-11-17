/* Student shell: routing, progress rail, start page, submit page. */
(function () {
  const AI = (window.AI = window.AI || {});
  const h = AI.h;
  const main = document.getElementById('main'), rail = document.getElementById('rail'), who = document.getElementById('who');
  AI.probeAssets(['species/zorb_body.png', 'species/quib_body.png', 'species/flonk_body.png'].concat(['zorb', 'quib', 'flonk'].reduce((a, n) => a.concat(['s', 'm', 'l'].map((b) => 'species/' + n + '_body_' + b + '.png')), []), ['mascot/nibble_think.png', 'mascot/nibble_oops.png']));

  const NAV = [['start', 'Start here'], ['a3', 'Activity 3: Train the Machine'], ['a4', 'Activity 4: Be the Neural Network'], ['a5', 'Activity 5: Fraud Detective'], ['a6', 'Activity 6: Bias Detective Lab'], ['a7', 'Activity 7: Case File'], ['fin', 'Final Check'], ['submit', 'Submit']];
  let railTimer = null;

  function sectionStats() {
    const r = AI.score(AI.pack('progress')), map = {}; r.sections.forEach((s) => (map[s.id] = s)); return map;
  }
  function renderRail(active) {
    const st = sectionStats(); rail.innerHTML = '';
    rail.appendChild(h('h4', { text: 'Mission map' }));
    NAV.forEach((n) => {
      const s = st[n[0]], p = s ? s.done / s.count : 0, cls = (active === n[0] ? 'on ' : '') + (p >= 0.999 ? 'done' : p > 0 ? 'part' : '');
      rail.appendChild(h('a', { href: '#' + n[0], class: cls.trim() }, h('span', { class: 'dot' }), h('span', { text: n[1] }), s ? h('span', { class: 'pc', text: Math.round(p * 100) + '%' }) : null));
    });
    rail.appendChild(h('div', { class: 'tools' },
      h('button', { class: 'btn go', type: 'button', text: 'Download my progress', onclick: downloadProgress }),
      h('button', { class: 'btn', type: 'button', text: 'Load a saved file', onclick: () => document.getElementById('loadfile').click() })));
    rail.appendChild(h('p', { class: 'tag', style: { color: '#9FB0E8', margin: '12px 6px' }, text: 'Your work saves automatically on this computer. Download a copy before you leave, especially on shared or guest Chromebooks.' }));
  }
  AI.railRefresh = function () { clearTimeout(railTimer); railTimer = setTimeout(() => { renderRail(current); if (AI.tabRefresh) AI.tabRefresh(); updateWho(); }, 300); };
  AI.onChange = AI.railRefresh;

  function updateWho() { const s = AI.S.student; who.textContent = s.first ? s.first + ' ' + s.last + (s.period ? ' \u2022 Period ' + s.period : '') : 'Not signed in'; }

  function downloadProgress() {
    if (!AI.S.student.first) { AI.toast('Enter your name on the Start page first.'); location.hash = '#start'; return; }
    AI.save(); AI.download(AI.fileBase() + '_PROGRESS.json', JSON.stringify(AI.pack('progress'), null, 1)); AI.toast('Progress downloaded. Keep this file safe.');
  }
  document.getElementById('loadfile').addEventListener('change', async (e) => {
    const f = e.target.files[0]; e.target.value = ''; if (!f) return;
    try {
      const o = AI.parseFile(await AI.readFile(f));
      if (AI.hasWork() && !confirm('Loading this file will replace the work currently on this computer. Continue?')) return;
      delete o.checksum; delete o.kind; delete o.exportedAt; AI.S = o; AI.save(); AI.toast('Loaded ' + (o.student.first || 'file')); route();
    } catch (err) { alert('That file could not be loaded. Make sure it is an AI Lab file you downloaded from this site.'); }
  });

  // ---------- Start page ----------
  function startPage() {
    const S = AI.S.student;
    const f = (k, label, type) => { const i = h('input', { type: type || 'text', id: 'in_' + k, value: S[k] || '', autocomplete: 'off' }); i.addEventListener('input', () => { S[k] = i.value.trim(); AI.dirty(); updateWho(); }); return h('div', null, h('label', { class: 'f', for: 'in_' + k, text: label }), i); };
    main.appendChild(h('div', { class: 'hero' }, h('h1', { text: 'Chapter 3 AI Lab' }), h('p', { text: 'Hands-on activities for Types of AI and How Machines Learn. Train a machine, break a network, catch fraud, and audit a hiring AI.' })));
    main.appendChild(AI.mascot('Hi, I\'m <b>Nibble</b>! Type your name below to get started. Your work stays on this computer.', 'wave'));
    main.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Who is working?' }), h('div', { class: 'grid2' }, f('first', 'First name'), f('last', 'Last name')), h('div', { class: 'grid2' }, f('period', 'Class period'), f('email', 'School email (optional)', 'email')),
      h('div', { class: 'toolbar' }, h('button', { class: 'btn go', type: 'button', text: 'Start Activity 3', onclick: () => { if (!AI.S.student.first || !AI.S.student.last) { AI.toast('Please enter your first and last name.'); return; } AI.save(); location.hash = '#a3'; } }))));
    main.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'How this works' }),
      h('ol', null, h('li', { html: '<b>Work saves automatically</b> in this browser on this computer. Nothing is sent anywhere.' }),
        h('li', { html: '<b>Download your progress</b> (left menu) before you close the tab or change computers. If you switch computers, use <b>Load a saved file</b>.' }),
        h('li', { html: 'Check-for-understanding questions give you <b>two tries</b>. A correct first try earns full credit and a correct second try earns half.' }),
        h('li', { html: 'In the data missions you can <b>replay as many times as you like</b>. Only the <b>first test on each dataset</b> counts for points, so practice first, then test.' }),
        h('li', { html: 'When you finish, open <b>Submit</b>, download your submission file, and <b>turn it in on Google Classroom</b>.' }))));
    main.appendChild(h('div', { class: 'card amber' }, h('p', { html: '<b>Using a shared or guest Chromebook?</b> The browser may erase your work when you sign out. Press <b>Download my progress</b> at the end of every class.' })));
  }

  // ---------- Submit page ----------
  function reportHTML(r) {
    const esc = (s) => String(s == null ? '' : s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    const S = AI.S.student; let out = '<!doctype html><meta charset="utf-8"><title>AI Lab Report</title><style>body{font:15px/1.5 system-ui,sans-serif;max-width:860px;margin:24px auto;padding:0 16px;color:#1B2140}h1{color:#141B3C}h2{border-bottom:3px solid #F5A623;padding-bottom:4px;color:#1E2761}table{border-collapse:collapse;width:100%}td,th{border:1px solid #D5DBEE;padding:5px 8px;text-align:left;vertical-align:top}th{background:#1E2761;color:#fff}.ok{color:#16845A}.no{color:#C7344E}.foot{margin-top:30px;border-top:3px solid #F5A623;padding-top:8px;color:#59627F;font-size:13px}</style>';
    out += '<h1>Chapter 3 AI Lab Report</h1><p><b>' + esc(S.first + ' ' + S.last) + '</b> \u2022 Period ' + esc(S.period) + ' \u2022 Active time about ' + r.minutes + ' min \u2022 ' + Math.round(r.pctDone * 100) + '% of tasks completed</p>';
    r.sections.forEach((s) => {
      out += '<h2>' + esc(s.title) + '</h2><table><tr><th>Task</th><th>Your work</th></tr>';
      s.items.forEach((i) => { out += '<tr><td>' + esc(i.label) + '</td><td>' + (i.type === 'open' ? esc(i.detail || '(blank)') : esc(i.detail) + (i.type === 'cfu' && i.done ? (i.earned > 0 ? ' <span class="ok">\u2713</span>' : ' <span class="no">\u2717</span>') : '')) + '</td></tr>'; });
      out += '</table>';
    });
    return out + '<div class="foot"><b>TECH</b> \u2014 Take Risks \u2022 Evaluate Work \u2022 Create \u2022 Have Fun<br>Dr. Morris \u2022 morrisc@blufftonschools.org</div>';
  }
  function submitPage() {
    const r = AI.score(AI.pack('progress')), S = AI.S.student;
    main.appendChild(AI.hero('Submit your work', 'Download your file, then turn it in on Google Classroom.'));
    const miss = [];
    r.sections.forEach((s) => { if (s.done < s.count) miss.push(s.title + ': ' + (s.count - s.done) + ' task(s) not started'); });
    main.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Checklist' }), h('table', { class: 't' }, h('tr', null, ['Section', 'Tasks completed'].map((x) => h('th', { text: x }))), r.sections.map((s) => h('tr', null, h('td', { text: s.title }), h('td', { class: 'num ' + (s.done === s.count ? 'ok' : ''), text: s.done + ' of ' + s.count })))),
      miss.length ? h('div', { class: 'banner warn', html: '<b>Some tasks are not finished.</b> You can still submit, but unfinished tasks earn no points. Use the left menu to go back.' }) : h('div', { class: 'banner ok', text: '\u2713 Everything has been started. Nice work.' })));
    main.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'Step 1: Download your submission' }), h('p', { html: 'Signed in as <b>' + (S.first ? S.first + ' ' + S.last + ', period ' + (S.period || '?') : 'no name yet (go to Start)') + '</b>. This creates a file called <code>' + (S.first ? AI.fileBase() + '_SUBMISSION.json' : 'Chapter3_AI_Lab_..._SUBMISSION.json') + '</code>.' }),
      h('div', { class: 'toolbar' },
        h('button', { class: 'btn go', type: 'button', text: 'Download my submission file', onclick: () => { if (!S.first || !S.last) { AI.toast('Enter your name on the Start page first.'); return; } AI.save(); AI.S.submittedAt = Date.now(); AI.save(); AI.download(AI.fileBase() + '_SUBMISSION.json', JSON.stringify(AI.pack('submission'), null, 1)); AI.toast('Submission downloaded. Now upload it to Google Classroom.'); } }),
        h('button', { class: 'btn alt', type: 'button', text: 'Download a readable report (optional)', onclick: () => AI.download(AI.fileBase() + '_REPORT.html', reportHTML(AI.score(AI.pack('progress'))), 'text/html') }),
        h('button', { class: 'btn alt', type: 'button', text: 'Download progress backup', onclick: downloadProgress }))));
    main.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Step 2: Turn it in on Google Classroom' }),
      h('ol', null, h('li', { text: 'Open the assignment in Google Classroom.' }), h('li', { html: 'Click <b>Add or create</b>, then <b>File</b>, and choose the <code>_SUBMISSION.json</code> file you just downloaded (check your Downloads folder).' }), h('li', { html: 'Click <b>Turn in</b>.' })),
      h('p', { class: 'tag', text: 'Do not rename or open-and-edit the file. Your teacher\u2019s scoring page checks that it has not been changed. If you keep working after submitting, download a new file and resubmit.' })));
  }

  // ---------- Router ----------
  let current = 'start';
  function route() {
    const hash = (location.hash || '').replace('#', ''), parts = hash.split('/'); let id = parts[0] || (AI.S.student.first ? 'a3' : 'start');
    if (!NAV.some((n) => n[0] === id)) id = 'start';
    if (id !== 'start' && id !== 'submit' && !AI.S.student.first) id = 'start';
    current = id; main.innerHTML = ''; AI.onChange = AI.railRefresh; AI.tabRefresh = null;
    if (id === 'start') startPage(); else if (id === 'submit') submitPage(); else { AI.visit(id); AI.acts[id](main, parts[1]); }
    main.appendChild(AI.TECH_FOOTER()); renderRail(id); updateWho(); window.scrollTo({ top: 0 });
  }
  window.addEventListener('hashchange', route);
  window.addEventListener('beforeunload', () => AI.save());
  route();
})();
