/* Activity 6 (Bias Detective Lab), Activity 7 (Case File), and the Final Check. */
(function () {
  const AI = (window.AI = window.AI || {});
  AI.acts = AI.acts || {};
  const h = AI.h;
  const meters = (items) => h('div', { class: 'meter' }, items.map((m) => AI.meterBox(m[0], m[1], m[2])));
  const yn = (v) => (v ? 'Y' : 'N');

  // ============================== ACTIVITY 6 ==============================
  function a6Data(body) {
    const R = AI.BIAS.rows; let filter = 'all';
    const tblHost = h('div', { class: 'scroll' });
    const isIn = (x) => x.w || x.c;
    const F = { all: () => true, ins: (x) => isIn(x) && !x.g, out: (x) => !isIn(x) && !x.g, gap: (x) => x.g };
    function draw() {
      tblHost.innerHTML = '';
      tblHost.appendChild(h('table', { class: 't' }, h('tr', null, ['ID', 'Skills score', 'Westbrook Prep?', 'Lacrosse / golf club?', 'Resume gap?', 'Past decision'].map((x) => h('th', { text: x }))),
        R.map((x) => h('tr', { class: F[filter](x) && filter !== 'all' ? 'hl' : '' }, h('td', { text: x.id }), h('td', { class: 'num', text: x.score }), h('td', { class: 'num', text: yn(x.w) }), h('td', { class: 'num', text: yn(x.c) }), h('td', { class: 'num', text: yn(x.g) }), h('td', { class: x.hired ? 'ok' : 'no', text: x.hired ? 'Hired' : 'Not hired' })))));
    }
    const chips = [['all', 'All 20'], ['ins', 'Insiders, no gap'], ['out', 'Outsiders, no gap'], ['gap', 'Any resume gap']].map((c) => h('button', { class: 'btn sm alt', type: 'button', text: 'Highlight: ' + c[1], onclick: () => { filter = c[0]; draw(); } }));
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'The case' }), h('p', { html: '<b>SkyBright Tech</b> wants an AI to screen applicants for a Junior Developer job. It will learn from the company\u2019s <b>past hiring decisions</b>. All applicants are fictional and took the same skills test (0\u2013100). <b>Westbrook Prep</b> is a private school; <b>club</b> means a lacrosse or golf club. Call an applicant an <b>insider</b> if they went to Westbrook <i>or</i> were in the club.' }), h('div', { class: 'toolbar' }, chips), tblHost));
    draw();
    // Step 1
    const groups = ['Everyone', 'Insiders (Westbrook or club), NO resume gap', 'Outsiders (neither), NO resume gap', 'Anyone with a resume gap'], G = AI.biasGroups();
    const rate = h('div');
    const rows = groups.map((g, i) => {
      const nIn = AI.numField('b_g' + (i + 1) + '_n', { step: 1, label: g + ' applicants', check: (v) => v === G[i].n }), hIn = AI.numField('b_g' + (i + 1) + '_h', { step: 1, label: g + ' hired', check: (v) => v === G[i].h });
      const r = h('td', { class: 'num' }); const upd = () => { const n = Number(AI.S.answers['b_g' + (i + 1) + '_n']), hh = Number(AI.S.answers['b_g' + (i + 1) + '_h']); r.textContent = n > 0 && AI.S.answers['b_g' + (i + 1) + '_h'] != null ? Math.round(hh / n * 100) + '%' : ''; };
      nIn.addEventListener('input', upd); hIn.addEventListener('input', upd); upd();
      return h('tr', null, h('td', { text: g }), h('td', null, nIn), h('td', null, hIn), r);
    });
    body.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Step 1: Count the hiring rates' }), h('p', { text: 'Use the highlight buttons above to help you count. Green means correct.' }), h('table', { class: 't' }, h('tr', null, ['Group', 'Applicants', 'Hired', 'Hire rate'].map((x) => h('th', { text: x }))), rows)));
    // Step 2
    const av = AI.biasAvgs();
    body.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Step 2: Compare skills scores' }), h('p', { text: 'Average skills score (to one decimal place):' }),
      h('div', { class: 'flex' }, h('div', null, h('label', { class: 'f', text: 'People who were hired' }), AI.numField('b_avgH', { step: 0.1, label: 'Average score hired', check: (v) => Math.abs(v - av.hired) <= 0.2 })), h('div', null, h('label', { class: 'f', text: 'People who were NOT hired' }), AI.numField('b_avgN', { step: 0.1, label: 'Average score not hired', check: (v) => Math.abs(v - av.notHired) <= 0.2 }))),
      AI.openBlock('a6o1')));
    // Step 3
    const RK = [['b_rank_ins', 'Westbrook Prep or club (insider)'], ['b_rank_gap', 'Resume gap'], ['b_rank_score', 'Skills score'], ['b_rank_id', 'Applicant ID number']];
    const rankMsg = h('div'); const rk = () => { const v = RK.map((r) => Number(AI.S.answers[r[0]])); const all = RK.every((r) => AI.S.answers[r[0]] != null); rankMsg.innerHTML = ''; if (all) { const ok = [v[0], v[1]].every((x) => x === 1 || x === 2) && v[0] !== v[1] && v[2] === 3 && v[3] === 4; rankMsg.appendChild(h('div', { class: 'banner ' + (ok ? 'ok' : 'warn'), text: ok ? '\u2713 That matches the pattern in the data.' : 'Look again: which feature best separates hired from not hired? Which has no pattern at all?' })); } };
    body.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Step 3: Which features would an AI rely on?' }), h('p', { text: 'Rank from 1 (strongest predictor of the past decisions) to 4 (weakest). Use each rank once.' }),
      h('table', { class: 't' }, RK.map((r) => h('tr', null, h('td', { text: r[1] }), h('td', null, AI.selField(r[0], ['1', '2', '3', '4'].map((n) => ({ v: n, t: n })), { inline: true, label: 'Rank for ' + r[1] }))))), rankMsg));
    body.addEventListener('change', rk); rk();
  }

  function a6Train(body) {
    const base = AI.biasTrain({}), W = ['Skills score', 'Westbrook Prep', 'Club', 'Resume gap'];
    const bars = h('div'), live = h('div'), cmp = h('div'); const cur = { score: 75, w: 0, c: 0, g: 0 };
    bars.appendChild(h('div', { class: 'tag', text: 'Train the AI to see what it learned.' }));
    function trainNow() {
      bars.innerHTML = ''; bars.appendChild(h('h4', { text: 'What the AI learned (positive = helps get hired)' }));
      base.w.forEach((wv, i) => { const v = AI.clamp(wv, -3, 3), left = v < 0; bars.appendChild(h('div', { style: { margin: '6px 0' } }, h('div', { text: W[i] + ': ' + wv.toFixed(2) }), h('div', { class: 'bar' }, h('i', { style: { width: Math.abs(v) / 3 * 100 + '%', background: left ? '#C7344E' : '#16845A' } }))));});
      bars.appendChild(h('p', { class: 'tag', text: 'Notice the weight on Skills score. What does a negative number mean here, and why did the data cause it?' }));
    }
    function whatIf() {
      const p = AI.biasPredict(base, cur);
      live.innerHTML = ''; live.appendChild(h('div', { class: 'meter' }, AI.meterBox('Chance the AI would hire', AI.pct(p), p >= .5 ? 'good' : 'low'), AI.meterBox('Verdict', p >= .5 ? 'Hire' : 'Reject', p >= .5 ? 'good' : 'low')));
    }
    function builder() {
      const sc = h('input', { type: 'range', min: 40, max: 100, value: cur.score, 'aria-label': 'Skills score' }), so = h('b', { text: cur.score }); sc.addEventListener('input', () => { cur.score = +sc.value; so.textContent = cur.score; whatIf(); });
      const tg = (k, t) => { const c = h('input', { type: 'checkbox', 'aria-label': t }); c.addEventListener('change', () => { cur[k] = c.checked ? 1 : 0; whatIf(); }); return h('label', { style: { marginRight: '14px' } }, c, ' ' + t); };
      return h('div', { class: 'card' }, h('h3', { text: 'What-if applicant' }), h('div', null, 'Skills score: ', so), sc, h('div', { style: { margin: '8px 0' } }, tg('w', 'Westbrook Prep'), tg('c', 'Lacrosse/golf club'), tg('g', 'Resume gap')), live);
    }
    const cards = AI.BIAS.newApps.map((n) => {
      const key = 'b_pred_' + n.id, out = h('div'); const pr = AI.biasPredict(base, n);
      function reveal() { out.innerHTML = ''; const mine = AI.S.answers[key]; if (!mine) { AI.toast('Make your prediction first.'); return; } const ai = pr >= .5 ? 'hire' : 'reject'; out.appendChild(h('div', { class: 'banner ' + (mine === ai ? 'ok' : 'warn'), html: 'The AI gives a <b>' + AI.pct(pr) + '</b> chance of hiring: verdict <b>' + ai + '</b>. ' + (mine === ai ? 'Your prediction matched.' : 'You predicted ' + mine + '.') + ' Was it fair?' })); }
      return h('div', { class: 'card' }, h('b', { text: n.id + ': ' }), h('span', { text: 'score ' + n.score + ', Westbrook ' + yn(n.w) + ', club ' + yn(n.c) + ', gap ' + yn(n.g) + ' (' + n.note + ')' }),
        h('div', { class: 'toolbar' }, 'My prediction: ', AI.selField(key, [{ v: 'hire', t: 'The AI will hire' }, { v: 'reject', t: 'The AI will reject' }], { inline: true, label: 'Prediction for ' + n.id }), h('button', { class: 'btn sm go', type: 'button', text: 'Reveal the AI\u2019s verdict', onclick: reveal }), out));
    });
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'Train the hiring AI' }), h('p', { html: 'The AI studies the 20 past decisions and learns how much each feature matters. Press <b>Train</b>, then <b>predict</b> what it will do with four new applicants <i>before</i> you reveal its verdict.' }), h('button', { class: 'btn go', type: 'button', text: 'Train the AI on the 20 decisions', onclick: trainNow })));
    body.appendChild(bars); body.appendChild(h('h3', { text: 'Step 4: Predict the AI\u2019s verdicts' })); cards.forEach((c) => body.appendChild(c)); body.appendChild(builder()); whatIf();
    if (AI.S.answers.b_pred_N1) trainNow();
  }

  function a6Fix(body) {
    const tbl = h('div'), out = h('div'); const tried = {};
    AI.logGet('b_fix').forEach((f) => (tried[f.fix] = f));
    function renderTable() {
      tbl.innerHTML = ''; const rows = AI.BIAS_FIXES.filter((f) => tried[f.id]);
      if (!rows.length) { tbl.appendChild(h('p', { class: 'tag', text: 'Results appear here as you try fixes.' })); return; }
      tbl.appendChild(h('table', { class: 't' }, h('tr', null, ['Fix', 'Insider hire rate', 'Outsider hire rate', 'Outsider \u00F7 insider', 'Four-fifths rule'].map((x) => h('th', { text: x }))), rows.map((f) => { const t = tried[f.id]; const pass = t.ratio >= 0.8 && t.ratio <= 1.25; return h('tr', null, h('td', { text: f.label }), h('td', { class: 'num', text: AI.pct(t.inRate) }), h('td', { class: 'num', text: AI.pct(t.outRate) }), h('td', { class: 'num', text: t.ratio.toFixed(2) }), h('td', { class: 'num ' + (pass ? 'ok' : 'no'), text: pass ? 'OK' : 'Warning' })); })));
    }
    function tryFix(f) {
      const m = AI.biasTrain(f.cfg), a = AI.biasAudit(m); tried[f.id] = { fix: f.id, inRate: a.inRate, outRate: a.outRate, ratio: a.ratio };
      AI.logPush('b_fix', { fix: f.id, inRate: a.inRate, outRate: a.outRate, ratio: a.ratio });
      out.innerHTML = ''; out.appendChild(h('div', { class: 'card' }, h('h4', { text: f.label }), meters([['Insiders selected', AI.pct(a.inRate)], ['Outsiders selected', AI.pct(a.outRate)], ['Outsider \u00F7 insider', a.ratio.toFixed(2), a.ratio >= .8 && a.ratio <= 1.25 ? 'good' : 'low']]),
        h('p', { class: 'tag', text: 'Tested on 1,000 new simulated applicants whose skills do not depend on school or clubs. A fair tool would select both groups at similar rates.' }),
        h('div', { class: 'flex' }, AI.BIAS.newApps.map((n) => h('div', { class: 'meter', style: { minWidth: '120px' } }, AI.meterBox(n.id + ' hire chance', AI.pct(AI.biasPredict(m, n))))))));
      renderTable();
    }
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'The Fix Lab' }), h('p', { html: 'Try each fix. The lab retrains the AI and tests it on <b>1,000 simulated applicants</b> whose skills do <b>not</b> depend on where they went to school. A fair tool should select insiders and outsiders at similar rates. The <b>four-fifths rule</b> is a common warning sign: if one group\u2019s selection rate is under 80% of another\u2019s, take a closer look. Try at least three fixes.' })));
    body.appendChild(h('div', { class: 'toolbar' }, AI.BIAS_FIXES.map((f) => h('button', { class: 'btn sm alt', type: 'button', text: f.label, onclick: () => tryFix(f) }))));
    body.appendChild(out); body.appendChild(h('h3', { text: 'Your results so far' })); body.appendChild(tbl);
    body.appendChild(h('div', { class: 'card' }, h('label', { class: 'f', text: 'Which fix did the LEAST to close the gap between insiders and outsiders?' }), AI.selField('b_least', AI.BIAS_FIXES.filter((f) => f.id !== 'base').map((f) => ({ v: f.id, t: f.label })), { label: 'Fix that did the least', ph: 'Choose after trying the fixes\u2026', check: (v) => v === 'dropW' })));
    body.appendChild(AI.cfuBlock(['a6q1', 'a6q2', 'a6q3', 'a6q4'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a6o2')); body.appendChild(AI.openBlock('a6o3'));
    renderTable();
  }

  AI.acts.a6 = function (root, startPart) {
    const A = AI.S.answers;
    const parts = [{ id: 'data', title: '1 \u00B7 Audit the data', render: a6Data, done: () => A.b_g1_n != null && A.b_avgH != null }, { id: 'train', title: '2 \u00B7 Train the AI', render: a6Train, done: () => !!A.b_pred_N4 }, { id: 'fix', title: '3 \u00B7 Fix Lab', render: a6Fix, done: () => AI.logGet('b_fix').length >= 3 }];
    root.appendChild(AI.hero('Activity 6: Bias Detective Lab', 'Audit the training data behind a hiring AI, train it, then try to fix it. Garbage in, garbage out.'));
    const tv = AI.tabsView(parts, 'a6'); root.appendChild(tv.el); tv.show(startPart || 'data'); tv.refresh();
  };

  // ============================== ACTIVITY 7 ==============================
  function a7Read(body) {
    const ev = [
      ['2018: The theft', 'A thief steals watches from a store in Detroit. Security video captures a <b>blurry, low-quality image</b>.'],
      ['The search', 'Police run the still image through a facial recognition system. It returns <b>many possible matches</b>, not one certain answer.'],
      ['Picking a match', 'Detectives focus on one: the <b>expired driver\u2019s license photo</b> of Robert Williams, a Black man living in a Detroit suburb.'],
      ['The lineup', 'His photo and five others are shown to a <b>store loss-prevention worker</b>, who picks him.'],
      ['January 2020: the arrest', 'Police arrest Mr. Williams outside his home in front of his wife and daughters. He is held about <b>30 hours</b>. He was innocent.'],
      ['June 28, 2024: the settlement', 'Detroit agrees to <b>stop arrests based only on facial recognition</b> or on photo lineups that directly follow a search, to <b>train officers</b> on the technology\u2019s risks (including higher misidentification of people of color), and to <b>audit</b> older cases. Detroit pays Mr. Williams $300,000. The court can enforce the agreement for four years.'],
    ];
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'Read the case file' }), h('p', { html: 'This is a <b>real case</b> about a real family. Read it carefully, then work through the decision points. Facts come from the ACLU, University of Michigan Law, the Associated Press, and CBS Detroit. Our job is to understand what went wrong so it does not happen to others.' })));
    ev.forEach((e) => body.appendChild(h('details', { class: 'card', open: e === ev[0] }, h('summary', { text: e[0] }), h('p', { html: e[1] }))));
    body.appendChild(h('div', { class: 'card amber' }, h('p', { html: '<b>Notice:</b> the slide says the error was \u201ctraced directly\u201d to biased training data. As you work, look for evidence about what else contributed.' })));
    body.appendChild(AI.cfuBlock(['a7q1'], 'Check for understanding'));
  }
  function a7Decide(body) {
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'Find the decision points and the safeguards' }), h('p', { text: 'For each point where something could have gone wrong, choose the safeguard that would best catch the error. Green means correct.' })));
    AI.CASE.dps.forEach((d, i) => {
      const opts = AI.rng(i + 40).shuffle(d.opts);
      body.appendChild(h('div', { class: 'card' }, h('h4', { text: 'Decision point ' + (i + 1) + ': ' + d.title }), h('p', { class: 'tag', text: 'Risk: ' + d.risk }), AI.selField('c_' + d.id, opts, { label: 'Best safeguard for decision point ' + (i + 1), ph: 'Choose the best safeguard\u2026', check: (v) => v === d.best })));
    });
    body.appendChild(AI.cfuBlock(['a7q2', 'a7q3'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a7o1'));
  }
  function a7Sort(body) {
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'Technology, people, or system?' }), h('p', { html: 'Sort each statement. <b>Technology</b> = a limit of the tool itself. <b>Human decision</b> = a choice a person made. <b>System / policy</b> = rules, training, or procedures an organization did or did not have.' })));
    AI.CASE.cls.forEach((c, i) => body.appendChild(h('div', { class: 'card' }, h('p', { text: (i + 1) + '. ' + c.text }), AI.selField('c_' + c.id, [{ v: 'T', t: 'Technology' }, { v: 'H', t: 'Human decision' }, { v: 'S', t: 'System / policy' }], { inline: true, label: 'Category for statement ' + (i + 1), check: (v) => v === c.a }))));
    body.appendChild(AI.openBlock('a7o2'));
  }
  AI.acts.a7 = function (root, startPart) {
    const A = AI.S.answers;
    const parts = [{ id: 'read', title: '1 \u00B7 Read the case', render: a7Read, done: () => !!(AI.S.cfu.a7q1 && AI.S.cfu.a7q1.attempts.length) }, { id: 'decide', title: '2 \u00B7 Decision points', render: a7Decide, done: () => !!A.c_dp5 }, { id: 'sort', title: '3 \u00B7 Sort the causes', render: a7Sort, done: () => !!A.c_c8 }];
    root.appendChild(AI.hero('Activity 7: Case File \u2014 Robert Williams', 'A real wrongful arrest. Where could a human check have stopped the error?'));
    const tv = AI.tabsView(parts, 'a7'); root.appendChild(tv.el); tv.show(startPart || 'read'); tv.refresh();
  };

  // ============================== FINAL CHECK ==============================
  AI.acts.fin = function (root) {
    root.appendChild(AI.hero('Final Check and Exit Ticket', 'Ten questions, your confidence ratings, and a short reflection. Then submit.'));
    const rows = AI.OBJECTIVES.map((o, i) => h('tr', null, h('td', { text: o }), h('td', null, AI.selField('conf_' + i + '_before', ['1', '2', '3', '4', '5'].map((n) => ({ v: n, t: n })), { inline: true, label: 'Before: ' + o, ph: '\u2014' })), h('td', null, AI.selField('conf_' + i + '_after', ['1', '2', '3', '4', '5'].map((n) => ({ v: n, t: n })), { inline: true, label: 'After: ' + o, ph: '\u2014' }))));
    root.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Confidence check' }), h('p', { text: 'Rate yourself from 1 (not yet) to 5 (I could teach this). Fill in the "After" column now. Fill in "Before" if you remember how you felt at the start.' }), h('table', { class: 't' }, h('tr', null, ['By the end of this chapter, I can\u2026', 'Before', 'After'].map((x) => h('th', { text: x }))), rows)));
    root.appendChild(AI.cfuBlock(['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10'], 'Final check for understanding'));
    root.appendChild(h('h3', { text: 'Exit ticket' })); root.appendChild(AI.openBlock('fo1')); root.appendChild(AI.openBlock('fo2'));
    root.appendChild(h('div', { class: 'toolbar' }, h('a', { class: 'btn go', href: '#submit', text: 'Go to Submit' })));
  };
})();
