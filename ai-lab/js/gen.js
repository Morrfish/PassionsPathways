/* Dataset generators for Activity 3 (Train the Machine). Deterministic by seed so replays are fresh but reproducible. */
(function () {
  const AI = (window.AI = window.AI || {});
  const G = (AI.gen = {});
  const LET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const cl = (v, a, b) => Math.max(a, Math.min(b, v));

  // Mission 1 + 2: two species. Training data has a misleading clue (height); the real rule is spots.
  G.m1 = function (seed) {
    const r = AI.rng(seed), t = [3.5, 4.5, 5.5][seed % 3], lo = Math.floor(t), hi = Math.ceil(t);
    const train = []; let id = 0;
    for (let i = 0; i < 7; i++) train.push({ id: id++, x: r.u(11, 24), y: r.i(0, lo), cls: 0 });
    for (let i = 0; i < 7; i++) train.push({ id: id++, x: r.u(27, 41), y: r.i(hi, 10), cls: 1 });
    train.push({ id: id++, x: r.u(19, 23), y: r.i(hi, 10), cls: 1 });
    const mk = (xa, xb, ya, yb, c) => ({ x: r.u(xa, xb), y: r.i(ya, yb), cls: c });
    let test = [mk(31, 41, 0, lo, 0), mk(31, 41, 0, lo, 0), mk(11, 19, hi, 10, 1), mk(11, 19, hi, 10, 1), mk(11, 22, 0, lo, 0), mk(11, 22, 0, lo, 0), mk(28, 41, hi, 10, 1), mk(28, 41, hi, 10, 1)];
    test = r.shuffle(test).map((p, i) => Object.assign(p, { id: 100 + i, label: LET[i] }));
    return { seed, t, rule: 'a creature with ' + hi + ' or more spots is a Quib', train, test };
  };

  // Mission 3: three species, two features needed.
  G.m3 = function (seed) {
    const r = AI.rng(seed * 31 + 5), C = [{ x: 16, y: 2, sx: 2.6, sy: .8 }, { x: 34, y: 8, sx: 2.8, sy: .9 }, { x: 36, y: 2, sx: 2.6, sy: .8 }];
    const mk = (c, i) => ({ x: cl(r.n(C[c].x, C[c].sx), 11, 43), y: cl(Math.round(r.n(C[c].y, C[c].sy)), 0, 10), cls: c });
    const train = [], test = []; let id = 0;
    for (let c = 0; c < 3; c++) for (let i = 0; i < 8; i++) train.push(Object.assign(mk(c), { id: id++ }));
    for (let c = 0; c < 3; c++) for (let i = 0; i < 4; i++) test.push(mk(c));
    const t2 = r.shuffle(test).map((p, i) => Object.assign(p, { id: 200 + i, label: LET[i] }));
    const means = [0, 1, 2].map((c) => { const m = train.filter((p) => p.cls === c); return { x: m.reduce((s, p) => s + p.x, 0) / m.length, y: m.reduce((s, p) => s + p.y, 0) / m.length, cls: c }; });
    return { seed, train, test: t2, means };
  };

  // Mission 4: messy data with label noise (memorize vs generalize).
  G.m4 = function (seed) {
    const r = AI.rng(seed * 17 + 3);
    const mk = (n, base) => { const a = []; for (let i = 0; i < n; i++) { const c = r.f() < .5 ? 0 : 1, m = c ? { x: 30, y: 6.5 } : { x: 20, y: 3.5 }; let cls = c; if (r.f() < 0.12) cls = 1 - c; a.push({ id: base + i, x: cl(r.n(m.x, 5.5), 10.5, 43.5), y: cl(r.n(m.y, 1.9), 0, 10), cls, truth: c }); } return a; };
    return { seed, train: mk(40, 0), test: mk(100, 1000) };
  };

  // Mission 5: unlabeled groups.
  G.m5 = function (seed) {
    const r = AI.rng(seed * 13 + 9), C = [{ x: 16, y: 2.2 }, { x: 33, y: 7.8 }, { x: 36, y: 2.2 }], pts = []; let id = 0;
    for (let c = 0; c < 3; c++) for (let i = 0; i < 12; i++) pts.push({ id: id++, x: cl(r.n(C[c].x, 3.2), 11, 43), y: cl(r.n(C[c].y, 1.0), 0, 10), truth: c });
    return { seed, pts: r.shuffle(pts).map((p, i) => Object.assign(p, { id: i })) };
  };

  // Mission 6: four kinds of creatures; two are rare in the "found so far" sample.
  G.GROUPS = [
    { id: 'A', name: 'Short, few spots', cls: 0, rare: false },
    { id: 'B', name: 'Tall, many spots', cls: 1, rare: false },
    { id: 'C', name: 'Tall, few spots', cls: 0, rare: true },
    { id: 'D', name: 'Short, many spots', cls: 1, rare: true },
  ];
  G.m6 = function () {
    const r = AI.rng(606), box = [[12, 21, 1, 3], [33, 41, 7, 9], [33, 41, 1, 3], [12, 21, 7, 9]];
    const pool = box.map((b, g) => Array.from({ length: 14 }, (_, i) => ({ x: r.u(b[0], b[1]), y: r.i(b[2], b[3]), cls: G.GROUPS[g].cls, g, id: g * 100 + i })));
    const test = box.map((b, g) => Array.from({ length: 15 }, (_, i) => ({ x: r.u(b[0], b[1]), y: r.i(b[2], b[3]), cls: G.GROUPS[g].cls, g, id: 900 + g * 100 + i })));
    return { pool, test };
  };
  G.fitLine = function (pts) { // logistic regression in normalized space -> model + decision function
    const X = pts.map((p) => [(p.x - 27) / 10, (p.y - 5) / 3]), y = pts.map((p) => p.cls);
    const m = AI.ml.logisticFit(X, y, { epochs: 700, lr: 0.8, l2: 0.01 });
    return m;
  };
  G.predict = (m, p) => (AI.ml.logisticP(m, [(p.x - 27) / 10, (p.y - 5) / 3]) >= 0.5 ? 1 : 0);
  // two points on the model's decision boundary (data coordinates) for drawing
  G.lineOf = function (m) {
    const w1 = m.w[0], w2 = m.w[1], b = m.b;
    if (Math.abs(w2) < 1e-4) { const x = 27 - 10 * b / (w1 || 1e-4); return { a: { x, y: 0 }, b: { x, y: 10 } }; }
    const f = (x) => 5 - 3 * (b + w1 * (x - 27) / 10) / w2;
    return { a: { x: 10, y: f(10) }, b: { x: 44, y: f(44) } };
  };
})();
