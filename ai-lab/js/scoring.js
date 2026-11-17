/* Scoring engine. Re-scores from RAW answers/logs only (never trusts any score stored in a file). */
(function () {
  const AI = (window.AI = window.AI || {});

  AI.wordCount = (t) => (String(t || '').trim().match(/\S+/g) || []).length;
  AI.openScore = function (item, text) {
    const words = AI.wordCount(text), low = String(text || '').toLowerCase();
    const hits = item.kw.filter((k) => low.indexOf(k) !== -1).length;
    if (words < 5) return { pts: 0, words, hits, status: 'missing' };
    let pts;
    if (item.pts === 1) pts = words >= item.min ? 1 : 0;
    else if (words >= item.min && hits >= 2) pts = item.pts;
    else if (words >= Math.ceil(item.min / 2)) pts = Math.max(1, Math.floor(item.pts / 2));
    else pts = 0;
    return { pts, words, hits, status: 'provisional' };
  };

  const num = (v) => (v === '' || v == null ? null : Number(v));
  const maxOf = (a, k) => a.reduce((m, x) => (x[k] != null && x[k] > m ? x[k] : m), -1);
  const distinct = (a, k) => new Set(a.map((x) => x[k])).size;

  AI.score = function (sub, ov) {
    ov = ov || {};
    const A = sub.answers || {}, T = sub.text || {}, L = sub.log || {}, C = sub.cfu || {};
    const log = (k) => L[k] || [];
    const sections = [], metrics = {};

    function section(id, title) { const s = { id, title, items: [] }; sections.push(s); return s; }
    function add(s, o) { o.max = o.max || 0; o.earned = Math.round(o.earned * 100) / 100; s.items.push(o); }
    function addCFU(s, actId) {
      AI.CFU.filter((q) => q.act === actId).forEach((q) => {
        const at = (C[q.id] && C[q.id].attempts) || [];
        let earned = 0; if (at[0] === q.a) earned = 1; else if (at[1] === q.a) earned = 0.5;
        add(s, { id: q.id, type: 'cfu', label: q.q, max: 1, earned, done: at.length > 0, status: at.length ? 'auto' : 'missing', detail: at.length ? 'Attempts: ' + at.map((i) => String.fromCharCode(65 + i)).join(', ') + ' (correct: ' + String.fromCharCode(65 + q.a) + ')' : 'Not answered', attempts: at.length, firstCorrect: at[0] === q.a, correctChoice: q.a });
      });
    }
    function addOpen(s, actId) {
      AI.OPEN.filter((o) => o.act === actId).forEach((o) => {
        const text = T[o.id] || '', r = AI.openScore(o, text);
        const has = ov[o.id] != null && ov[o.id] !== '';
        add(s, { id: o.id, type: 'open', label: o.prompt, max: o.pts, earned: has ? Math.min(o.pts, Math.max(0, Number(ov[o.id]))) : r.pts, done: r.status !== 'missing', status: has ? 'reviewed' : r.status, detail: text, words: r.words, hits: r.hits, auto: r.pts });
      });
    }

    // ---------------- Activity 3 ----------------
    let s = section('a3', 'Activity 3: Train the Machine');
    const firstBySeed = (a) => { const seen = {}; return a.filter((x) => { if (seen[x.seed]) return false; seen[x.seed] = 1; return true; }); };
    const m1 = firstBySeed(log('m1')), m2 = log('m2'), m3 = firstBySeed(log('m3')), m4 = log('m4'), m5 = log('m5'), m6 = log('m6');
    const b1 = maxOf(m1, 'testAcc'), b3 = maxOf(m3, 'testAcc');
    metrics.m1best = b1 < 0 ? null : b1; metrics.m3best = b3 < 0 ? null : b3;
    add(s, { id: 'd3m1', type: 'do', label: 'Mission 1: best test accuracy on new creatures', max: 3, earned: !m1.length ? 0 : b1 >= 0.875 ? 3 : b1 >= 0.75 ? 2 : b1 >= 0.5 ? 1 : 0, done: m1.length > 0, status: m1.length ? 'auto' : 'missing', detail: m1.length ? 'Best first-try ' + AI.pct(b1) + ' across ' + m1.length + ' dataset(s)' : 'No test run' });
    add(s, { id: 'd3m1r', type: 'do', label: 'Mission 1: replayed with a different dataset', max: 1, earned: distinct(m1, 'seed') >= 2 ? 1 : 0, done: m1.length > 0, status: m1.length ? 'auto' : 'missing', detail: distinct(m1, 'seed') + ' dataset(s) tested' });
    const auto = m2.filter((x) => x.steps > 0), maxSteps = auto.length ? maxOf(auto, 'steps') : 0;
    add(s, { id: 'd3m2', type: 'do', label: 'Mission 2: let the machine tune its dials', max: 2, earned: maxSteps >= 20 ? 2 : maxSteps > 0 ? 1 : 0, done: maxSteps > 0, status: maxSteps > 0 ? 'auto' : 'missing', detail: maxSteps + ' training steps (max)' });
    add(s, { id: 'd3m3', type: 'do', label: 'Mission 3: three-species test accuracy', max: 2, earned: !m3.length ? 0 : b3 >= 0.8 ? 2 : b3 >= 0.6 ? 1 : 0, done: m3.length > 0, status: m3.length ? 'auto' : 'missing', detail: m3.length ? 'Best ' + AI.pct(b3) : 'No test run' });
    const kd = distinct(m4, 'k');
    add(s, { id: 'd3m4', type: 'do', label: 'Mission 4: explored different values of k', max: 2, earned: kd >= 4 ? 2 : kd >= 2 ? 1 : 0, done: m4.length > 0, status: m4.length ? 'auto' : 'missing', detail: kd + ' different k value(s): ' + Array.from(new Set(m4.map((x) => x.k))).sort((a, b) => a - b).join(', ') });
    const kk = distinct(m5, 'k');
    add(s, { id: 'd3m5', type: 'do', label: 'Mission 5: ran k-means with different numbers of groups', max: 1, earned: kk >= 2 ? 1 : 0, done: m5.length > 0, status: m5.length ? 'auto' : 'missing', detail: kk + ' value(s) of k' });
    const names = String(T.a3m5names || '').trim();
    add(s, { id: 'd3m5n', type: 'do', label: 'Mission 5: named the groups', max: 1, earned: names.length >= 6 ? 1 : 0, done: names.length > 0, status: names ? 'auto' : 'missing', detail: names });
    let m6e = 0, m6d = 'No data';
    if (m6.length) { const first = m6[0].rareAcc, best = maxOf(m6, 'rareAcc'); m6e = best - first >= 0.15 ? 2 : 1; m6d = 'Rare-group accuracy ' + AI.pct(first) + ' to best ' + AI.pct(best); metrics.m6gain = best - first; }
    add(s, { id: 'd3m6', type: 'do', label: 'Mission 6: fixed the biased training set', max: 2, earned: m6e, done: m6.length > 0, status: m6.length ? 'auto' : 'missing', detail: m6d });
    addCFU(s, 'a3'); addOpen(s, 'a3');

    // ---------------- Activity 4 ----------------
    s = section('a4', 'Activity 4: Be the Neural Network');
    let c1 = 0, a1 = 0, c2 = 0, a2 = 0, c3 = 0, a3 = 0;
    [1, 2, 3].forEach((k) => {
      const n = AI.pixNet(AI.PIX[k]);
      n.q.forEach((v, i) => { const x = num(A['l1_' + k + '_' + i]); if (x != null) a1++; if (x === v) c1++; });
      [['eq', n.l2.equal], ['emp', n.l2.empty], ['top', n.l2.topDark]].forEach((p) => { const x = A['l2_' + k + '_' + p[0]]; if (x) a2++; if (x === (p[1] ? 'yes' : 'no')) c2++; });
      const x3 = A['l3_' + k]; if (x3) a3++; if (x3 === AI.PIX_TRUTH[k]) c3++;
    });
    add(s, { id: 'd4l1', type: 'do', label: 'Layer 1: corner counts (12 numbers)', max: 3, earned: 3 * c1 / 12, done: a1 > 0, status: a1 ? 'auto' : 'missing', detail: c1 + ' of 12 correct' });
    add(s, { id: 'd4l2', type: 'do', label: 'Layer 2: yes/no shape questions (9 answers)', max: 2, earned: 2 * c2 / 9, done: a2 > 0, status: a2 ? 'auto' : 'missing', detail: c2 + ' of 9 correct' });
    add(s, { id: 'd4l3', type: 'do', label: 'Layer 3: letters (3 answers)', max: 1, earned: c3 / 3, done: a3 > 0, status: a3 ? 'auto' : 'missing', detail: c3 + ' of 3 correct' });
    const fools = log('fool'); let foolOK = 0;
    fools.forEach((f) => { try { const on = f.grid.join('').split('').filter((c) => c === '1').length; const out = AI.pixNet(f.grid).out; if (on >= 5 && ((['H', 'L', 'T'].indexOf(f.intended) >= 0 && out !== f.intended) || (f.intended === 'other' && out !== '?'))) foolOK++; } catch (e) { /* bad log */ } });
    add(s, { id: 'd4f', type: 'do', label: 'Build and Break: fooled the network', max: 2, earned: foolOK ? 2 : fools.length ? 1 : 0, done: fools.length > 0, status: fools.length ? 'auto' : 'missing', detail: fools.length + ' saved image(s), ' + foolOK + ' fooled the network', fools });
    addCFU(s, 'a4'); addOpen(s, 'a4');

    // ---------------- Activity 5 ----------------
    s = section('a5', 'Activity 5: Fraud Detective');
    const lazy = num(A.f_lazyAcc);
    add(s, { id: 'd5a', type: 'do', label: 'Accuracy of the "never flag anything" model (%)', max: 1, earned: lazy != null && Math.abs(lazy - 95) <= 1 ? 1 : 0, done: lazy != null, status: lazy != null ? 'auto' : 'missing', detail: lazy != null ? 'Entered ' + lazy + '% (correct 95%)' : '' });
    const lc = num(A.f_lazyCaught);
    add(s, { id: 'd5b', type: 'do', label: 'Fraud caught by the "never flag" model', max: 1, earned: lc === 0 ? 1 : 0, done: lc != null, status: lc != null ? 'auto' : 'missing', detail: lc != null ? 'Entered ' + lc + ' (correct 0)' : '' });
    const tune = log('f_tune'); let gA = 0, gAp = 0, gB = 0, gBp = 0;
    tune.forEach((t) => { try { const e = AI.fraudEval(t.w, t.thr); if (e.recall >= 0.9 && e.fp <= 10) gA = 1; else if (e.recall >= 0.75) gAp = 1; if (e.recall >= 0.9 && e.travFA <= 0.05) gB = 1; else if (e.recall >= 0.8 && e.travFA <= 0.08) gBp = 1; } catch (e) { /* skip */ } });
    add(s, { id: 'd5c', type: 'do', label: 'Goal A: catch at least 18 of 20 frauds with 10 or fewer false alarms', max: 2, earned: gA ? 2 : gAp ? 1 : 0, done: tune.length > 0, status: tune.length ? 'auto' : 'missing', detail: tune.length + ' setting(s) tried' });
    add(s, { id: 'd5d', type: 'do', label: 'Goal B: catch 90%+ of fraud AND keep traveler false alarms at 5% or less', max: 2, earned: gB ? 2 : gBp ? 1 : 0, done: tune.length > 0, status: tune.length ? 'auto' : 'missing', detail: gB ? 'Goal met' : 'Goal not met' });
    const costs = log('f_cost'); let cOK = 0, cBest = null;
    costs.forEach((t) => { try { const e = AI.fraudEval(t.w, t.thr), opt = AI.fraudBestCost(t.w); if (cBest == null || e.cost < cBest) cBest = e.cost; if (e.cost <= opt * 1.15 + 1) cOK = 1; } catch (e) { /* skip */ } });
    add(s, { id: 'd5e', type: 'do', label: 'Cost challenge: found a threshold within 15% of the cheapest', max: 1, earned: cOK, done: costs.length > 0, status: costs.length ? 'auto' : 'missing', detail: cBest != null ? 'Lowest cost found $' + cBest : '' });
    add(s, { id: 'd5f', type: 'do', label: 'Which group had more false alarms at the default setting?', max: 1, earned: A.f_group === 'Travelers' ? 1 : 0, done: !!A.f_group, status: A.f_group ? 'auto' : 'missing', detail: A.f_group || '' });
    addCFU(s, 'a5'); addOpen(s, 'a5');

    // ---------------- Activity 6 ----------------
    s = section('a6', 'Activity 6: Bias Detective Lab');
    const G = AI.biasGroups(); let gc = 0, ga = 0;
    G.forEach((g, i) => { const n = num(A['b_g' + (i + 1) + '_n']), h = num(A['b_g' + (i + 1) + '_h']); if (n != null) ga++; if (h != null) ga++; if (n === g.n) gc++; if (h === g.h) gc++; });
    add(s, { id: 'd6a', type: 'do', label: 'Step 1: applicant and hire counts (8 numbers)', max: 4, earned: 4 * gc / 8, done: ga > 0, status: ga ? 'auto' : 'missing', detail: gc + ' of 8 correct' });
    const av = AI.biasAvgs(), aH = num(A.b_avgH), aN = num(A.b_avgN); let ac = 0;
    if (aH != null && Math.abs(aH - av.hired) <= 0.2) ac++; if (aN != null && Math.abs(aN - av.notHired) <= 0.2) ac++;
    add(s, { id: 'd6b', type: 'do', label: 'Step 2: average scores (hired 73.4, not hired 85.8)', max: 2, earned: ac, done: aH != null || aN != null, status: aH != null || aN != null ? 'auto' : 'missing', detail: 'Entered ' + (aH == null ? '\u2014' : aH) + ' and ' + (aN == null ? '\u2014' : aN) });
    const rk = { ins: num(A.b_rank_ins), gap: num(A.b_rank_gap), score: num(A.b_rank_score), id: num(A.b_rank_id) };
    const rkAns = Object.values(rk).every((v) => v != null);
    const rkOK = rkAns && [rk.ins, rk.gap].every((v) => v === 1 || v === 2) && rk.ins !== rk.gap && rk.score === 3 && rk.id === 4;
    add(s, { id: 'd6c', type: 'do', label: 'Step 3: ranked the features', max: 1, earned: rkOK ? 1 : 0, done: rkAns, status: rkAns ? 'auto' : 'missing', detail: 'Insider ' + rk.ins + ', gap ' + rk.gap + ', score ' + rk.score + ', ID ' + rk.id });
    const base = AI.biasTrain({}); let pc = 0, pa = 0;
    AI.BIAS.newApps.forEach((n) => { const x = A['b_pred_' + n.id]; if (x) pa++; if (x === (AI.biasPredict(base, n) >= 0.5 ? 'hire' : 'reject')) pc++; });
    add(s, { id: 'd6d', type: 'do', label: 'Step 4: predicted the AI\u2019s verdict for four new applicants', max: 2, earned: 2 * pc / 4, done: pa > 0, status: pa ? 'auto' : 'missing', detail: pc + ' of 4 match the trained AI' });
    const fixes = log('b_fix'), fd = new Set(fixes.filter((f) => f.fix !== 'base').map((f) => f.fix)).size;
    add(s, { id: 'd6e', type: 'do', label: 'Step 5: tested different fixes in the Fix Lab', max: 2, earned: fd >= 3 ? 2 : fd >= 1 ? 1 : 0, done: fixes.length > 0, status: fixes.length ? 'auto' : 'missing', detail: fd + ' different fix(es) tested' });
    add(s, { id: 'd6f', type: 'do', label: 'Which fix did the least to close the gap?', max: 1, earned: A.b_least === 'dropW' ? 1 : 0, done: !!A.b_least, status: A.b_least ? 'auto' : 'missing', detail: A.b_least || '' });
    addCFU(s, 'a6'); addOpen(s, 'a6');

    // ---------------- Activity 7 ----------------
    s = section('a7', 'Activity 7: Case File');
    let dc = 0, da = 0; AI.CASE.dps.forEach((d) => { const x = A['c_' + d.id]; if (x) da++; if (x === d.best) dc++; });
    add(s, { id: 'd7a', type: 'do', label: 'Chose the best safeguard for each of five decision points', max: 5, earned: dc, done: da > 0, status: da ? 'auto' : 'missing', detail: dc + ' of 5 correct' });
    let cc = 0, ca = 0; AI.CASE.cls.forEach((c) => { const x = A['c_' + c.id]; if (x) ca++; if (x === c.a) cc++; });
    add(s, { id: 'd7b', type: 'do', label: 'Sorted eight statements: technology, human decision, or system/policy', max: 3, earned: 3 * cc / 8, done: ca > 0, status: ca ? 'auto' : 'missing', detail: cc + ' of 8 correct' });
    addCFU(s, 'a7'); addOpen(s, 'a7');

    // ---------------- Final ----------------
    s = section('fin', 'Final Check and Exit Ticket');
    let cf = 0; for (let i = 0; i < 5; i++) if (num(A['conf_' + i + '_after']) != null) cf++;
    add(s, { id: 'dfc', type: 'do', label: 'Confidence Check: rated all five objectives after the chapter', max: 1, earned: cf === 5 ? 1 : 0, done: cf > 0, status: cf ? 'auto' : 'missing', detail: cf + ' of 5 rated' });
    addCFU(s, 'fin'); addOpen(s, 'fin');

    // ---------------- Totals and flags ----------------
    sections.forEach((sec) => {
      sec.max = sec.items.reduce((a, i) => a + i.max, 0); sec.earned = sec.items.reduce((a, i) => a + i.earned, 0);
      sec.done = sec.items.filter((i) => i.done).length; sec.count = sec.items.length;
      sec.provisional = sec.items.filter((i) => i.type === 'open' && i.status === 'provisional').reduce((a, i) => a + i.earned, 0);
      sec.needsReview = sec.items.filter((i) => i.type === 'open' && i.status === 'provisional').length;
    });
    const total = sections.reduce((a, x) => a + x.earned, 0), max = sections.reduce((a, x) => a + x.max, 0);
    const flags = [];
    const mins = Math.round((sub.activeSeconds || 0) / 60);
    if (mins < 20) flags.push('Short active time (' + mins + ' min)');
    const texts = AI.OPEN.map((o) => String(T[o.id] || '').trim().toLowerCase()).filter((t) => t.length > 20);
    if (new Set(texts).size < texts.length) flags.push('Duplicate written answers');
    if (!(sub.student && sub.student.first && sub.student.last)) flags.push('Missing name');
    const done = sections.reduce((a, x) => a + x.done, 0), count = sections.reduce((a, x) => a + x.count, 0);
    return { sections, total, max, pctDone: count ? done / count : 0, flags, minutes: mins, metrics, provisional: sections.reduce((a, x) => a + x.provisional, 0), reviewCount: sections.reduce((a, x) => a + x.needsReview, 0) };
  };
})();
