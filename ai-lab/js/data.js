/* Shared, deterministic datasets (student activities AND teacher scorer use the same code). */
(function () {
  const AI = (window.AI = window.AI || {});

  // ================= Activity 4: pixel letters =================
  AI.PIX = {
    1: ['110011', '110011', '111111', '111111', '110011', '110011'],
    2: ['110000', '110000', '110000', '110000', '110000', '111111'],
    3: ['111111', '001100', '001100', '001100', '001100', '001100'],
  };
  AI.PIX_TRUTH = { 1: 'H', 2: 'L', 3: 'T' };
  AI.pixQuad = function (g) { // g: array of 6 strings
    const q = (r0, c0) => { let n = 0; for (let r = r0; r < r0 + 3; r++) for (let c = c0; c < c0 + 3; c++) if (g[r][c] === '1') n++; return n; };
    return [q(0, 0), q(0, 3), q(3, 0), q(3, 3)];
  };
  AI.pixL2 = function (q) {
    return { equal: Math.max.apply(null, q) - Math.min.apply(null, q) <= 1, empty: Math.min.apply(null, q) <= 1, topDark: (q[0] + q[1]) - (q[2] + q[3]) >= 2 };
  };
  AI.pixL3 = function (l2) { return l2.equal ? 'H' : l2.empty ? 'L' : l2.topDark ? 'T' : '?'; };
  AI.pixNet = function (g) { const q = AI.pixQuad(g), l2 = AI.pixL2(q); return { q, l2, out: AI.pixL3(l2) }; };

  // ================= Activity 5: fraud detective =================
  AI.FRAUD_COST = { missed: 200, alarm: 5 };
  AI.fraudData = (function () {
    let cache = null;
    return function () {
      if (cache) return cache;
      const r = AI.rng(2026), rows = [];
      for (let i = 0; i < 400; i++) {
        const fraud = i < 20, trav = r.f() < 0.3;
        let amount, dist, hour, dev, merch;
        if (!fraud) {
          amount = Math.min(900, Math.exp(r.n(Math.log(48), 0.8)));
          dist = trav ? r.u(60, 220) : Math.min(120, -Math.log(1 - r.f()) * 9);
          hour = r.f() < 0.05 ? r.i(0, 5) : r.i(7, 23);
          dev = r.f() < 0.06 ? 1 : 0; merch = r.u(0, 0.6);
        } else {
          amount = Math.min(900, Math.exp(r.n(Math.log(210), 0.55)));
          dist = r.u(40, 250); hour = r.f() < 0.55 ? r.i(0, 5) : r.i(7, 23);
          dev = r.f() < 0.65 ? 1 : 0; merch = r.u(0.35, 1);
        }
        rows.push({ id: i + 1, fraud: fraud ? 1 : 0, trav: trav ? 1 : 0, amount: Math.round(amount * 100) / 100, dist: Math.round(dist), hour, dev, merch: Math.round(merch * 100) / 100 });
      }
      cache = r.shuffle(rows); return cache;
    };
  })();
  AI.fraudScore = (t, w) => {
    const f = [Math.min(t.amount / 400, 1), Math.min(t.dist / 200, 1), t.hour < 6 ? 1 : 0, t.dev, t.merch];
    const tot = w.reduce((a, b) => a + b, 0) || 1; return 100 * f.reduce((s, v, i) => s + v * w[i], 0) / tot;
  };
  AI.fraudEval = function (w, thr) {
    const d = AI.fraudData(); let tp = 0, fp = 0, fn = 0, tn = 0, tf = 0, tl = 0, lf = 0, ll = 0;
    d.forEach((t) => {
      const flag = AI.fraudScore(t, w) >= thr;
      if (t.fraud) { flag ? tp++ : fn++; } else { flag ? fp++ : tn++; }
      if (!t.fraud) { if (t.trav) { tl++; if (flag) tf++; } else { ll++; if (flag) lf++; } }
    });
    const n = d.length;
    return { tp, fp, fn, tn, acc: (tp + tn) / n, recall: tp / (tp + fn), precision: tp + fp ? tp / (tp + fp) : null, travFA: tl ? tf / tl : 0, locFA: ll ? lf / ll : 0, travN: tl, locN: ll,
      cost: fn * AI.FRAUD_COST.missed + fp * AI.FRAUD_COST.alarm };
  };
  AI.fraudBestCost = function (w) { let b = 1e12; for (let t = 0; t <= 100; t++) b = Math.min(b, AI.fraudEval(w, t).cost); return b; };

  // ================= Activity 6: bias lab =================
  AI.BIAS = {
    rows: [
      [1, 82, 1, 1, 0, 1], [2, 75, 1, 1, 0, 1], [3, 68, 1, 0, 0, 1], [4, 71, 0, 1, 0, 1], [5, 60, 1, 1, 0, 1],
      [6, 88, 1, 1, 1, 0], [7, 93, 0, 0, 0, 0], [8, 89, 0, 0, 0, 0], [9, 91, 0, 0, 1, 0], [10, 85, 0, 0, 0, 0],
      [11, 78, 0, 0, 0, 0], [12, 84, 0, 0, 1, 0], [13, 95, 0, 0, 0, 1], [14, 70, 1, 0, 0, 1], [15, 66, 0, 1, 0, 1],
      [16, 79, 0, 1, 1, 0], [17, 87, 0, 0, 0, 0], [18, 90, 0, 0, 0, 0], [19, 80, 0, 0, 1, 0], [20, 86, 0, 0, 1, 0],
    ].map((a) => ({ id: a[0], score: a[1], w: a[2], c: a[3], g: a[4], hired: a[5] })),
    newApps: [
      { id: 'N1', score: 96, w: 0, c: 0, g: 0, note: 'Top score, outsider, no gap' },
      { id: 'N2', score: 55, w: 1, c: 1, g: 0, note: 'Low score, Westbrook + club, no gap' },
      { id: 'N3', score: 90, w: 0, c: 0, g: 1, note: 'High score, outsider, one-year gap (caring for a parent)' },
      { id: 'N4', score: 72, w: 1, c: 0, g: 1, note: 'Average score, Westbrook, gap' },
    ],
    extra: [ // "add diverse examples of success"
      [101, 84, 0, 0, 0, 1], [102, 88, 0, 0, 0, 1], [103, 92, 0, 0, 0, 1], [104, 81, 0, 0, 0, 1], [105, 95, 0, 0, 0, 1], [106, 86, 0, 0, 0, 1],
      [107, 83, 0, 0, 1, 1], [108, 89, 0, 0, 1, 1], [109, 91, 0, 0, 1, 1], [110, 80, 0, 0, 1, 1],
    ].map((a) => ({ id: a[0], score: a[1], w: a[2], c: a[3], g: a[4], hired: a[5] })),
  };
  AI.biasGroups = function () {
    const R = AI.BIAS.rows, ins = (x) => x.w || x.c;
    const sets = [R, R.filter((x) => ins(x) && !x.g), R.filter((x) => !ins(x) && !x.g), R.filter((x) => x.g)];
    return sets.map((s) => ({ n: s.length, h: s.filter((x) => x.hired).length }));
  };
  AI.biasAvgs = function () {
    const R = AI.BIAS.rows, avg = (a) => a.reduce((s, x) => s + x.score, 0) / a.length;
    return { hired: avg(R.filter((x) => x.hired)), notHired: avg(R.filter((x) => !x.hired)) };
  };
  AI.biasPool = (function () {
    let c = null;
    return function () {
      if (c) return c; const r = AI.rng(77), a = [];
      for (let i = 0; i < 1000; i++) { const ins = r.f() < 0.3, w = ins ? (r.f() < 0.6 ? 1 : 0) : 0, cl = ins ? (w ? (r.f() < 0.5 ? 1 : 0) : 1) : 0; a.push({ id: i, score: Math.round(Math.max(40, Math.min(100, r.n(78, 10)))), w, c: cl, g: r.f() < 0.2 ? 1 : 0, ins: ins ? 1 : 0 }); }
      return (c = a);
    };
  })();
  // cfg: {dropW, dropC, dropG, dropScore, label:'hist'|'skill', augment}
  AI.biasFeat = (x, cfg) => [cfg.dropScore ? 0 : (x.score - 75) / 12, cfg.dropW ? 0 : x.w, cfg.dropC ? 0 : x.c, cfg.dropG ? 0 : x.g];
  AI.biasTrain = function (cfg) {
    cfg = cfg || {};
    let rows = AI.BIAS.rows.slice(); if (cfg.augment) rows = rows.concat(AI.BIAS.extra);
    const X = rows.map((x) => AI.biasFeat(x, cfg)), y = rows.map((x) => (cfg.label === 'skill' ? (x.score >= 75 ? 1 : 0) : x.hired));
    const m = AI.ml.logisticFit(X, y, { epochs: 900, lr: 0.6, l2: 0.03 });
    m.cfg = cfg; return m;
  };
  AI.biasPredict = (m, x) => AI.ml.logisticP(m, AI.biasFeat(x, m.cfg));
  AI.biasAudit = function (m) {
    const pool = AI.biasPool(); let ni = 0, si = 0, no = 0, so = 0;
    pool.forEach((x) => { const sel = AI.biasPredict(m, x) >= 0.5; if (x.ins) { ni++; if (sel) si++; } else { no++; if (sel) so++; } });
    const ri = si / ni, ro = so / no;
    return { inRate: ri, outRate: ro, ratio: ri > 0 ? ro / ri : null, ni, no };
  };
  AI.BIAS_FIXES = [
    { id: 'base', label: 'No fix (baseline)', cfg: {} },
    { id: 'dropW', label: 'Delete the Westbrook Prep column', cfg: { dropW: true } },
    { id: 'dropWC', label: 'Delete both Westbrook and club columns', cfg: { dropW: true, dropC: true } },
    { id: 'skill', label: 'Train on skills-test results instead of past decisions', cfg: { label: 'skill' } },
    { id: 'augment', label: 'Add 10 more examples of successful outsiders', cfg: { augment: true } },
    { id: 'skillNoGap', label: 'Skills-test target and ignore resume gaps', cfg: { label: 'skill', dropG: true } },
  ];

  // ================= Activity 7: case file =================
  AI.CASE = {
    dps: [
      { id: 'dp1', title: 'A blurry, low-quality image was used for the search', risk: 'Lower accuracy and more false matches', best: 'Set minimum image-quality standards and do not search unusable images', opts: ['Set minimum image-quality standards and do not search unusable images', 'Use a bigger computer', 'Ask the suspect to confirm the image', 'Delete the image afterward'] },
      { id: 'dp2', title: 'The system returned many possible matches, not one certain answer', risk: 'A candidate list is not identification', best: 'Treat results as leads only and require trained human review', opts: ['Pick the top match automatically', 'Treat results as leads only and require trained human review', 'Hide the other matches', 'Ignore the system completely'] },
      { id: 'dp3', title: 'Detectives focused on one match (an expired license photo)', risk: 'Confirmation bias: it looks like the culprit once you expect it', best: 'Require independent evidence before acting on a match', opts: ['Trust whichever photo looks most similar', 'Choose the oldest photo', 'Require independent evidence before acting on a match', 'Let the software choose'] },
      { id: 'dp4', title: 'A six-photo lineup was shown to a store employee who had not witnessed the theft in person', risk: 'A contaminated identification', best: 'Use protocol-based lineups with actual witnesses, never directly from a face-recognition lead alone', opts: ['Show the same photos again', 'Show only the match photo', 'Use protocol-based lineups with actual witnesses, never directly from a face-recognition lead alone', 'Skip the lineup and arrest'] },
      { id: 'dp5', title: 'An arrest was made with no other evidence', risk: 'Over-reliance on one tool', best: 'Bar arrests based solely on a facial recognition result', opts: ['Allow arrests when the match score is high', 'Arrest everyone on the list', 'Wait for a software update', 'Bar arrests based solely on a facial recognition result'] },
    ],
    cls: [
      { id: 'c1', text: 'The system is known to misidentify people of color at higher rates.', a: 'T' },
      { id: 'c2', text: 'Detectives treated a possible match as enough reason to act.', a: 'H' },
      { id: 'c3', text: 'The department adopted the tool without quality-control rules or training.', a: 'S' },
      { id: 'c4', text: 'Accuracy drops when the input photo is blurry or poorly lit.', a: 'T' },
      { id: 'c5', text: 'Detectives showed a lineup to someone who had not been at the theft.', a: 'H' },
      { id: 'c6', text: 'No rule required other evidence before an arrest.', a: 'S' },
      { id: 'c7', text: 'The search returned many possible matches instead of one certain answer.', a: 'T' },
      { id: 'c8', text: 'Officers were not trained on the technology\u2019s risks.', a: 'S' },
    ],
  };
})();
