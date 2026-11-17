/* Activity 3: Train the Machine. Six replayable missions. */
(function () {
  const AI = (window.AI = window.AI || {});
  AI.acts = AI.acts || {};
  const h = AI.h, G = () => AI.gen;

  function plotBox(aspect) {
    const canvas = h('canvas', { role: 'img', 'aria-label': 'Plot of creatures by height and number of spots' });
    return { canvas, wrap: h('div', { class: 'stage' }, canvas) };
  }
  function specimenCard() {
    const box = h('div', { class: 'specimen' }, h('div', { class: 'tag', text: 'Hover over or tap a creature to meet it.' }));
    box.show = (p, reveal) => {
      box.innerHTML = '';
      const info = h('div', null, h('b', { text: (reveal === false || p.cls == null ? 'Creature' : AI.CLS[p.cls].name) }), h('div', { text: 'Height ' + Math.round(p.x) + ' cm, ' + Math.round(p.y) + ' spots' }));
      box.appendChild(h('div', { html: AI.creatureSVG(p.cls == null ? 0 : p.cls, p.x, p.y, p.id + 3, 84) })); box.appendChild(info);
    };
    return box;
  }
  const acc = (pred, pts) => (pts.length ? pts.filter((p) => pred(p) === p.cls).length / pts.length : null);
  const meters = (items) => h('div', { class: 'meter' }, items.map((m) => AI.meterBox(m[0], m[1], m[2])));
  const label = (n) => 'abcdefghijklmnopqrstuvwxyz'[n];

  // ============================== MISSION 1 ==============================
  function mission1(body) {
    let seed = AI.getA('a3_seed1') || 101, d, flip, tested, hidden = false;
    const line = { a: { x: 26, y: 1 }, b: { x: 26, y: 9 } };
    const pb = plotBox(), spec = specimenCard(), readout = h('div'), results = h('div'), msg = h('div');
    const pred = (p) => { const s = AI.side(line, p); return (flip ? s === 0 : s === 1) ? 1 : 0; };
    const plot = new AI.Plot(pb.canvas, { onPick: (p) => spec.show(p), onDrag: () => update(), onDragEnd: () => update() });
    plot.handles = [line.a, line.b]; plot.line = line;
    function load() {
      d = G().m1(seed); flip = true; tested = false; hidden = false; msg.innerHTML = ''; results.innerHTML = '';
      line.a.x = 26; line.a.y = 1; line.b.x = 26; line.b.y = 9; plot.hlines = []; update();
    }
    function update() {
      const tr = d.train.map((p) => Object.assign({}, p, { wrongMark: pred(p) !== p.cls }));
      plot.pts = tr; plot.shade = (x, y) => pred({ x, y });
      if (tested) d.test.forEach((p) => plot.pts.push(Object.assign({}, p, { state: pred(p) === p.cls ? 'correct' : 'wrong' })));
      plot.render();
      const ta = acc(pred, d.train), te = tested ? acc(pred, d.test) : null;
      readout.innerHTML = ''; readout.appendChild(meters([['Training accuracy (live)', AI.pct(ta), ta === 1 ? 'good' : ''], ['Test accuracy', tested ? AI.pct(te) : '\u2014', tested ? (te >= .875 ? 'good' : te < .6 ? 'low' : '') : ''], ['Dataset', '#' + (seed - 100)]]));
    }
    function nudge(dy) { line.a.y = AI.clamp(line.a.y + dy, 0, 10.5); line.b.y = AI.clamp(line.b.y + dy, 0, 10.5); update(); }
    function rot(deg) {
      const cx = (plot.px(line.a.x) + plot.px(line.b.x)) / 2, cy = (plot.py(line.a.y) + plot.py(line.b.y)) / 2, t = deg * Math.PI / 180;
      [line.a, line.b].forEach((q) => { const x = plot.px(q.x) - cx, y = plot.py(q.y) - cy; q.x = AI.clamp(plot.ux(cx + x * Math.cos(t) - y * Math.sin(t)), 10, 44); q.y = AI.clamp(plot.uy(cy + x * Math.sin(t) + y * Math.cos(t)), 0, 10.5); }); update();
    }
    function runTest() {
      const first = !AI.logGet('m1').some((a) => a.seed === seed);
      tested = true; const te = acc(pred, d.test), ta = acc(pred, d.train);
      AI.logPush('m1', { seed, trainAcc: ta, testAcc: te, line: { a: { x: +line.a.x.toFixed(2), y: +line.a.y.toFixed(2) }, b: { x: +line.b.x.toFixed(2), y: +line.b.y.toFixed(2) } }, flip });
      update(); msg.innerHTML = '';
      msg.appendChild(first ? AI.mascot('<b>Test result: ' + AI.pct(te) + '.</b> This is your official score for dataset #' + (seed - 100) + '. Look at the starred creatures that fooled your line. Press <b>New dataset</b> to try again with what you learned.', te >= .875 ? 'think' : 'oops')
        : AI.mascot('You already tested this dataset, so the first test is the one that counts. Press <b>New dataset</b> to try again.', 'think'));
      const rows = d.test.map((p) => { const pr = pred(p); return h('tr', null, h('td', { text: p.label }), h('td', { class: 'num', text: Math.round(p.x) }), h('td', { class: 'num', text: p.y }), h('td', { text: AI.CLS[pr].name }), h('td', { text: AI.CLS[p.cls].name }), h('td', { class: 'num ' + (pr === p.cls ? 'ok' : 'no'), text: pr === p.cls ? '\u2713' : '\u2717' })); });
      results.innerHTML = ''; results.appendChild(h('table', { class: 't' }, h('tr', null, ['New', 'Height', 'Spots', 'My model says', 'Truth', ''].map((x) => h('th', { text: x }))), rows));
      results.appendChild(h('button', { class: 'btn sm alt', style: { marginTop: '8px' }, type: 'button', text: 'Show me the hidden rule', onclick: () => { plot.hlines = [{ y: d.t, label: 'The real rule: ' + d.rule }]; plot.render(); } }));
    }
    const tools = h('div', { class: 'toolbar' },
      h('button', { class: 'btn sm alt', type: 'button', text: 'Line up', onclick: () => nudge(0.4) }), h('button', { class: 'btn sm alt', type: 'button', text: 'Line down', onclick: () => nudge(-0.4) }),
      h('button', { class: 'btn sm alt', type: 'button', text: 'Rotate \u21BA', onclick: () => rot(-6) }), h('button', { class: 'btn sm alt', type: 'button', text: 'Rotate \u21BB', onclick: () => rot(6) }),
      h('button', { class: 'btn sm alt', type: 'button', text: 'Flip Quib side', onclick: () => { flip = !flip; update(); } }));
    const side = h('div', null,
      h('div', { class: 'card tint' }, h('h3', { text: 'Your job: build a model' }), h('p', { html: 'Scientists labeled these creatures by hand. Drag the two round handles to place <b>one straight line</b> that separates Zorbs from Quibs. The shaded side is what your model calls a <b>Quib</b> (use <i>Flip Quib side</i> if it is reversed). When you are happy, press <b>Test my line</b> to try it on 8 creatures it has never seen.' })),
      readout, h('div', { class: 'toolbar' }, h('button', { class: 'btn go', type: 'button', text: 'Test my line', onclick: runTest }), h('button', { class: 'btn warn', type: 'button', text: 'New dataset', onclick: () => { seed++; AI.setA('a3_seed1', seed); load(); } })),
      msg, spec, results);
    body.appendChild(h('div', { class: 'bench' }, h('div', null, pb.wrap, AI.legend([0, 1]), tools), side));
    body.appendChild(AI.cfuBlock(['a3q1', 'a3q2'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a3o1'));
    load();
  }

  // ============================== MISSION 2 ==============================
  function mission2(body) {
    const seed = AI.getA('a3_seed1') || 101, d = G().m1(seed), rg = AI.rng(seed + 7);
    const X = d.train.map((p) => [(p.x - 27) / 10, (p.y - 5) / 3]), Y = d.train.map((p) => p.cls);
    let m, steps, losses, tested = false, timer = null;
    const pb = plotBox(), spec = specimenCard(), readout = h('div'), dials = h('div'), msg = h('div'), chart = h('canvas', { width: 520, height: 140, style: { width: '100%' }, role: 'img', 'aria-label': 'Loss over training steps' });
    const plot = new AI.Plot(pb.canvas, { onPick: (p) => spec.show(p) });
    function reset() { m = { w: [rg.u(-.4, .4), rg.u(-.4, .4)], b: rg.u(-.3, .3) }; steps = 0; losses = []; tested = false; stop(); msg.innerHTML = ''; draw(); }
    function step(n) { for (let i = 0; i < n; i++) { losses.push(AI.ml.logisticStep(m, X, Y, 0.25, 0.005)); steps++; } draw(); }
    const predict = (p) => G().predict(m, p);
    function draw() {
      plot.pts = d.train.map((p) => Object.assign({}, p, { wrongMark: predict(p) !== p.cls }));
      if (tested) d.test.forEach((p) => plot.pts.push(Object.assign({}, p, { state: predict(p) === p.cls ? 'correct' : 'wrong' })));
      plot.line = G().lineOf(m); plot.shade = (x, y) => predict({ x, y }); plot.render();
      const ta = acc(predict, d.train), te = tested ? acc(predict, d.test) : null;
      readout.innerHTML = ''; readout.appendChild(meters([['Training steps', steps], ['Training accuracy', AI.pct(ta), ta === 1 ? 'good' : ''], ['Test accuracy', tested ? AI.pct(te) : '\u2014', tested ? (te >= .875 ? 'good' : te < .6 ? 'low' : '') : ''], ['Error (loss)', losses.length ? losses[losses.length - 1].toFixed(3) : '\u2014']]));
      dials.innerHTML = '';
      [['Height dial', m.w[0]], ['Spots dial', m.w[1]], ['Bias dial', m.b]].forEach((x) => {
        const v = AI.clamp(x[1], -4, 4), pct = (v + 4) / 8 * 100;
        dials.appendChild(h('div', { style: { margin: '6px 0' } }, h('div', { text: x[0] + ': ' + x[1].toFixed(2) }), h('div', { class: 'bar', style: { position: 'relative' } }, h('i', { style: { width: pct + '%', background: x[1] >= 0 ? '#00A9CF' : '#E89A12' } }))));
      });
      const c = chart.getContext('2d'); c.clearRect(0, 0, 520, 140); c.strokeStyle = '#D5DBEE'; c.strokeRect(30, 8, 480, 110); c.fillStyle = '#59627F'; c.font = '11px sans-serif'; c.fillText('error', 2, 14); c.fillText('steps \u2192', 460, 134);
      if (losses.length > 1) { const mx = Math.max(0.8, losses[0]); c.beginPath(); losses.forEach((l, i) => { const x = 30 + i / Math.max(60, losses.length - 1) * 480, y = 118 - Math.min(1, l / mx) * 106; i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.strokeStyle = '#00A9CF'; c.lineWidth = 3; c.stroke(); }
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } if (playBtn) playBtn.textContent = 'Play'; }
    const playBtn = h('button', { class: 'btn go', type: 'button', text: 'Play', onclick: () => { if (timer) { stop(); } else { playBtn.textContent = 'Pause'; timer = setInterval(() => { if (!document.body.contains(pb.canvas)) { stop(); return; } step(2); if (steps >= 400) stop(); }, 60); } } });
    function runTest() {
      stop(); tested = true; draw();
      const ta = acc(predict, d.train), te = acc(predict, d.test), mine = AI.logGet('m1').find((a) => a.seed === seed);
      AI.logPush('m2', { seed, steps, trainAcc: ta, testAcc: te, wHeight: +m.w[0].toFixed(3), wSpots: +m.w[1].toFixed(3) });
      msg.innerHTML = ''; msg.appendChild(AI.mascot('<b>The machine scored ' + AI.pct(te) + ' on new creatures</b>' + (mine ? ' (your line: ' + AI.pct(mine.testAcc) + ')' : '') + '. Compare the <b>height dial</b> (' + Math.abs(m.w[0]).toFixed(1) + ') with the <b>spots dial</b> (' + Math.abs(m.w[1]).toFixed(1) + '). The machine trusts whichever clue has the bigger dial. Was the training data fair about which clue matters?', te >= .875 ? 'think' : 'oops'));
    }
    const side = h('div', null,
      h('div', { class: 'card tint' }, h('h3', { text: 'Let the machine tune its dials' }), h('p', { html: 'A model has <b>parameters</b>, numbers it can adjust. The machine starts with random dials, checks its mistakes, and nudges every dial a tiny bit to shrink its <b>error</b>. Repeat. This is the same data as Mission 1 (dataset #' + (seed - 100) + '). Press <b>Play</b> and watch the line move and the error fall.' })),
      readout, h('div', { class: 'toolbar' }, playBtn, h('button', { class: 'btn alt', type: 'button', text: 'Step \u00D71', onclick: () => step(1) }), h('button', { class: 'btn alt', type: 'button', text: 'Step \u00D710', onclick: () => step(10) }), h('button', { class: 'btn alt', type: 'button', text: 'Restart with new random dials', onclick: reset })),
      h('div', { class: 'card' }, h('h3', { text: 'The dials' }), dials), h('div', { class: 'card' }, chart),
      h('button', { class: 'btn warn', type: 'button', text: 'Test the machine on new creatures', onclick: runTest }), msg, spec);
    body.appendChild(h('div', { class: 'bench' }, h('div', null, pb.wrap, AI.legend([0, 1])), side));
    body.appendChild(AI.cfuBlock(['a3q3', 'a3q5'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a3o2'));
    reset(); step(1);
    // clean up timer if navigating away
    const mo = new MutationObserver(() => { if (!document.body.contains(pb.canvas)) { stop(); mo.disconnect(); } }); mo.observe(document.body, { childList: true, subtree: true });
  }

  // ============================== MISSION 3 ==============================
  function mission3(body) {
    let seed = AI.getA('a3_seed3') || 1, d, tested;
    const pb = plotBox(), spec = specimenCard(), readout = h('div'), msg = h('div'), results = h('div');
    const plot = new AI.Plot(pb.canvas, { onPick: (p) => spec.show(p), onDrag: () => update(), onDragEnd: () => update() });
    const pred = (p) => plot.flags[AI.ml.nearest(plot.flags, p)].cls;
    function load() { d = G().m3(seed); tested = false; msg.innerHTML = ''; results.innerHTML = ''; plot.flags = [{ x: 22, y: 6, cls: 0 }, { x: 27, y: 4, cls: 1 }, { x: 18, y: 3, cls: 2 }]; update(); }
    function update() {
      plot.pts = d.train.map((p) => Object.assign({}, p, { wrongMark: pred(p) !== p.cls }));
      if (tested) d.test.forEach((p) => plot.pts.push(Object.assign({}, p, { state: pred(p) === p.cls ? 'correct' : 'wrong' })));
      plot.shade = (x, y) => pred({ x, y }); plot.render();
      const ta = acc(pred, d.train), te = tested ? acc(pred, d.test) : null;
      readout.innerHTML = ''; readout.appendChild(meters([['Training accuracy (live)', AI.pct(ta), ta >= .95 ? 'good' : ''], ['Test accuracy', tested ? AI.pct(te) : '\u2014', tested ? (te >= .8 ? 'good' : te < .6 ? 'low' : '') : ''], ['Dataset', '#' + seed]]));
    }
    function runTest() {
      const first = !AI.logGet('m3').some((a) => a.seed === seed); tested = true; update();
      const te = acc(pred, d.test), ta = acc(pred, d.train);
      AI.logPush('m3', { seed, trainAcc: ta, testAcc: te, flags: plot.flags.map((f) => ({ x: +f.x.toFixed(1), y: +f.y.toFixed(1) })) });
      msg.innerHTML = ''; msg.appendChild(AI.mascot(first ? '<b>Test accuracy: ' + AI.pct(te) + '.</b> Official score for dataset #' + seed + '. Try <b>Snap flags to the averages</b> to see a classic trick, then press <b>New dataset</b> to replay.' : 'Only the first test on a dataset counts. Press <b>New dataset</b> to try again.', te >= .8 ? 'think' : 'oops'));
    }
    const side = h('div', null,
      h('div', { class: 'card tint' }, h('h3', { text: 'Three species, two clues' }), h('p', { html: 'A new species appeared: <b>Flonks</b> (\u25A0). One line is not enough now. Instead, <b>plant three flags</b> by dragging them. The machine labels every creature with the species of its <b>closest flag</b>, and the colored regions show what it believes. Zorbs are short with few spots, Quibs are tall with many, and Flonks are tall with few. Where do the flags belong?' })),
      readout, h('div', { class: 'toolbar' }, h('button', { class: 'btn go', type: 'button', text: 'Test my flags', onclick: runTest }),
        h('button', { class: 'btn alt', type: 'button', text: 'Snap flags to the averages', onclick: () => { plot.flags = d.means.map((m) => ({ x: m.x, y: m.y, cls: m.cls })); update(); AI.toast('Each flag moved to the average of its training group.'); } }),
        h('button', { class: 'btn warn', type: 'button', text: 'New dataset', onclick: () => { seed++; AI.setA('a3_seed3', seed); load(); } })), msg, spec, results);
    body.appendChild(h('div', { class: 'bench' }, h('div', null, pb.wrap, AI.legend([0, 1, 2])), side));
    body.appendChild(h('div', { class: 'card amber' }, h('p', { html: '<b>Think about it:</b> what happens to a creature that sits halfway between two flags? What would make a creature hard to classify? (Write nothing here. Just discuss with a partner, then do the check below.)' })));
    load();
  }

  // ============================== MISSION 4 ==============================
  function mission4(body) {
    let seed = AI.getA('a3_seed4') || 2, d, k = 1, tried = {};
    const pb = plotBox(), spec = specimenCard(), readout = h('div'), tbl = h('div'), chart = h('canvas', { width: 520, height: 170, style: { width: '100%' }, role: 'img', 'aria-label': 'Accuracy for different k' });
    const plot = new AI.Plot(pb.canvas, { onPick: (p) => spec.show(p) });
    const slider = h('input', { type: 'range', min: 1, max: 21, step: 1, value: 1, 'aria-label': 'k, the number of neighbors' });
    const pred = (p) => AI.ml.knn(d.train, p, k);
    let reveal = false, showTest = false;
    function load() { d = G().m4(seed); tried = {}; AI.logGet('m4').filter((a) => a.seed === seed).forEach((a) => (tried[a.k] = a)); k = 1; slider.value = 1; update(); }
    function update() {
      plot.pts = d.train.map((p) => Object.assign({}, p, { wrongMark: pred(p) !== p.cls }));
      if (showTest) d.test.forEach((p) => plot.pts.push({ x: p.x, y: p.y, cls: p.cls, state: 'grey', shape: p.cls, color: AI.CLS[p.cls].color, id: p.id, hidden: false }));
      plot.shade = (x, y) => pred({ x, y }); plot.render();
      const ta = acc(pred, d.train), te = acc((p) => AI.ml.knn(d.train, p, k), d.test);
      readout.innerHTML = ''; readout.appendChild(meters([['k (neighbors that vote)', k], ['Training accuracy', AI.pct(ta), ''], ['Test accuracy', AI.pct(te), te >= .78 ? 'good' : te < .66 ? 'low' : '']]));
      draw();
    }
    function record() {
      if (tried[k]) return; const ta = acc(pred, d.train), te = acc(pred, d.test); tried[k] = { seed, k, trainAcc: ta, testAcc: te };
      AI.logPush('m4', { seed, k, trainAcc: ta, testAcc: te }); draw();
    }
    function draw() {
      const c = chart.getContext('2d'); c.clearRect(0, 0, 520, 170); c.strokeStyle = '#D5DBEE'; c.strokeRect(34, 8, 470, 130);
      c.fillStyle = '#59627F'; c.font = '11px sans-serif'; c.textAlign = 'center'; for (let i = 1; i <= 21; i += 4) c.fillText(i, 34 + (i - 1) / 20 * 470, 152); c.fillText('k (neighbors)', 270, 166); c.textAlign = 'right'; [0.5, 0.75, 1].forEach((v) => c.fillText(Math.round(v * 100) + '%', 30, 142 - (v - 0.4) / 0.6 * 130 + 3));
      const X = (kk) => 34 + (kk - 1) / 20 * 470, Y = (v) => 138 - (v - 0.4) / 0.6 * 130;
      const series = [['trainAcc', '#E89A12'], ['testAcc', '#00A9CF']];
      let full = null; if (reveal) { full = []; for (let kk = 1; kk <= 21; kk++) full.push({ k: kk, trainAcc: acc((p) => AI.ml.knn(d.train, p, kk), d.train), testAcc: acc((p) => AI.ml.knn(d.train, p, kk), d.test) }); }
      const arr = full || Object.values(tried).sort((a, b) => a.k - b.k);
      series.forEach((s) => { c.strokeStyle = s[1]; c.fillStyle = s[1]; c.lineWidth = 3; c.beginPath(); arr.forEach((a, i) => { const x = X(a.k), y = Y(a[s[0]]); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke(); arr.forEach((a) => { c.beginPath(); c.arc(X(a.k), Y(a[s[0]]), 4, 0, 7); c.fill(); }); });
      c.textAlign = 'left'; c.fillStyle = '#E89A12'; c.fillText('\u25CF training', 40, 22); c.fillStyle = '#00A9CF'; c.fillText('\u25CF test (new creatures)', 110, 22);
      tbl.innerHTML = ''; const rows = Object.values(tried).sort((a, b) => a.k - b.k);
      tbl.appendChild(h('table', { class: 't' }, h('tr', null, ['k tried', 'Training', 'Test'].map((x) => h('th', { text: x }))), rows.map((a) => h('tr', null, h('td', { text: a.k }), h('td', { class: 'num', text: AI.pct(a.trainAcc) }), h('td', { class: 'num', text: AI.pct(a.testAcc) })))));
    }
    slider.addEventListener('input', () => { k = +slider.value; update(); });
    slider.addEventListener('change', record);
    const side = h('div', null,
      h('div', { class: 'card tint' }, h('h3', { text: 'Memorize or generalize?' }), h('p', { html: 'Real data is messy: some creatures were mislabeled by tired scientists. A <b>k-nearest-neighbors</b> model labels a creature by taking a vote of the <b>k closest</b> training creatures. Slide <b>k</b> and watch the regions change. Circled creatures are ones the model gets wrong. Try at least four different values of k.' })),
      readout, h('label', { class: 'f', text: 'k = ' }), slider, h('div', { class: 'tag', text: 'k = 1 copies the single nearest creature. Large k averages over many.' }),
      h('div', { class: 'toolbar' }, h('button', { class: 'btn alt', type: 'button', text: 'Show/hide test creatures', onclick: () => { showTest = !showTest; update(); } }),
        h('button', { class: 'btn alt', type: 'button', text: 'Reveal the full curve', onclick: () => { if (Object.keys(tried).length < 3) { AI.toast('Try at least 3 values of k first.'); return; } reveal = true; draw(); } }),
        h('button', { class: 'btn warn', type: 'button', text: 'New messy dataset', onclick: () => { seed++; AI.setA('a3_seed4', seed); reveal = false; load(); } })),
      h('div', { class: 'card' }, chart), tbl, spec);
    body.appendChild(h('div', { class: 'bench' }, h('div', null, pb.wrap, AI.legend([0, 1])), side));
    body.appendChild(AI.cfuBlock(['a3q4'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a3o3'));
    load();
  }

  // ============================== MISSION 5 ==============================
  function mission5(body) {
    let seed = AI.getA('a3_seed5') || 1, d, k = 3, cent = null, asg = null, steps = 0, phase = 'assign', truthOn = false, rng;
    const COLORS = ['#0091B3', '#E89A12', '#B53390', '#16845A', '#6B4FD6'];
    const pb = plotBox(), spec = specimenCard(), readout = h('div'), tbl = h('div'), names = h('div');
    const plot = new AI.Plot(pb.canvas, { onPick: (p) => spec.show({ x: p.x, y: p.y, id: p.id, cls: truthOn ? p.truth : null }, truthOn) });
    const sel = h('select', { class: 'inl', 'aria-label': 'Number of groups k' }, [2, 3, 4, 5].map((n) => h('option', { value: n, text: n + ' groups' })));
    sel.value = 3; sel.addEventListener('change', () => { k = +sel.value; init(); });
    function init() { rng = AI.rng(seed * 100 + k); cent = AI.ml.kmInit(d.pts, k, rng); asg = null; steps = 0; phase = 'assign'; draw(); }
    function load() { d = G().m5(seed); init(); }
    function draw() {
      plot.pts = d.pts.map((p, i) => ({ x: p.x, y: p.y, id: p.id, state: 'grey', color: asg ? COLORS[asg[i]] : '#8A93B0', shape: asg ? asg[i] % 3 : 0, ring: truthOn ? COLORS[p.truth] : null, cls: null }));
      plot.centroids = cent; plot.shade = null; plot.render();
      const inertia = asg ? AI.ml.kmInertia(d.pts, asg, cent) : null;
      readout.innerHTML = ''; readout.appendChild(meters([['Groups (k)', k], ['Steps', steps], ['Spread inside groups (lower is tighter)', inertia == null ? '\u2014' : inertia.toFixed(0)]]));
      names.innerHTML = ''; for (let i = 0; i < k; i++) { const key = 'a3m5g' + k + '_' + i; const inp = h('input', { type: 'text', 'aria-label': 'Name for group G' + (i + 1), placeholder: 'Name for G' + (i + 1) + ' (what do its creatures have in common?)' }); inp.value = (AI.S.answers[key]) || ''; inp.addEventListener('input', () => { AI.setA(key, inp.value); collectNames(); }); names.appendChild(h('div', { style: { margin: '4px 0', display: 'flex', gap: '8px', alignItems: 'center' } }, h('b', { style: { color: COLORS[i], minWidth: '34px' }, text: 'G' + (i + 1) }), inp)); }
      tbl.innerHTML = ''; const runs = AI.logGet('m5').filter((a) => a.seed === seed); const best = {}; runs.forEach((a) => { if (best[a.k] == null || a.inertia < best[a.k].inertia) best[a.k] = a; });
      tbl.appendChild(h('table', { class: 't' }, h('tr', null, ['Groups (k)', 'Spread (lower = tighter)'].map((x) => h('th', { text: x }))), Object.values(best).sort((a, b) => a.k - b.k).map((a) => h('tr', null, h('td', { class: 'num', text: a.k }), h('td', { class: 'num', text: a.inertia.toFixed(0) })))));
    }
    function collectNames() { const parts = []; for (let i = 0; i < k; i++) { const v = AI.S.answers['a3m5g' + k + '_' + i]; if (v) parts.push('G' + (i + 1) + ': ' + v); } AI.setT('a3m5names', 'k=' + k + ' | ' + parts.join('; ')); }
    function stepOnce() {
      if (phase === 'assign') { asg = AI.ml.kmAssign(d.pts, cent); phase = 'update'; } else { cent = AI.ml.kmUpdate(d.pts, asg, cent); phase = 'assign'; steps++; } draw();
    }
    function runAll() {
      let prev = ''; for (let i = 0; i < 30; i++) { asg = AI.ml.kmAssign(d.pts, cent); const sig = asg.join(''); cent = AI.ml.kmUpdate(d.pts, asg, cent); steps++; if (sig === prev) break; prev = sig; }
      asg = AI.ml.kmAssign(d.pts, cent); phase = 'assign'; AI.logPush('m5', { seed, k, steps, inertia: AI.ml.kmInertia(d.pts, asg, cent) }); draw();
    }
    const side = h('div', null,
      h('div', { class: 'card tint' }, h('h3', { text: 'No labels at all' }), h('p', { html: 'Here are 36 new creatures with <b>no species labels</b>. K-means is an unsupervised method: it drops <b>k starting points</b> (the G circles), sends every creature to its closest one, moves each circle to the middle of its group, and repeats until nothing changes. <b>You choose k.</b> Try 2, 3, 4, and 5 and compare how tight the groups become.' })),
      h('div', { class: 'toolbar' }, h('label', { for: 'ksel', text: 'Number of groups:' }), sel), readout,
      h('div', { class: 'toolbar' }, h('button', { class: 'btn alt', type: 'button', text: 'Step (assign, then move)', onclick: stepOnce }), h('button', { class: 'btn go', type: 'button', text: 'Run to the end', onclick: runAll }), h('button', { class: 'btn alt', type: 'button', text: 'Restart this k', onclick: init }),
        h('button', { class: 'btn alt', type: 'button', text: 'Reveal hidden species (rings)', onclick: () => { truthOn = !truthOn; draw(); } }), h('button', { class: 'btn warn', type: 'button', text: 'New creatures', onclick: () => { seed++; AI.setA('a3_seed5', seed); load(); } })),
      h('div', { class: 'card' }, h('h3', { text: 'Name your groups' }), h('p', { class: 'tag', text: 'The machine found groups but cannot name them. That part is yours.' }), names), tbl, spec);
    body.appendChild(h('div', { class: 'bench' }, h('div', null, pb.wrap), side));
    body.appendChild(AI.cfuBlock(['a3q6'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a3o4'));
    load();
  }

  // ============================== MISSION 6 ==============================
  function mission6(body) {
    const D = G().m6(), counts = [10, 10, 0, 0], W = [0.45, 0.45, 0.05, 0.05];
    const saved = AI.getA('a3_m6counts'); if (saved) saved.forEach((v, i) => (counts[i] = v));
    const pb = plotBox(), spec = specimenCard(), readout = h('div'), bars = h('div'), msg = h('div'), ctr = h('div');
    const plot = new AI.Plot(pb.canvas, { onPick: (p) => spec.show(p) });
    let model = null, trained = false;
    function sample() { const a = []; counts.forEach((n, g) => a.push(...D.pool[g].slice(0, n))); return a; }
    function draw() {
      const tr = sample(); plot.pts = tr.map((p) => Object.assign({}, p));
      if (trained) { plot.line = G().lineOf(model); plot.shade = (x, y) => G().predict(model, { x, y }); D.test.forEach((t) => t.forEach((p) => plot.pts.push({ x: p.x, y: p.y, state: 'grey', color: AI.CLS[p.cls].color, shape: p.cls, id: p.id, cls: p.cls }))); } else { plot.line = null; plot.shade = null; }
      plot.render();
    }
    function train() {
      const tr = sample(); if (tr.length < 4 || new Set(tr.map((p) => p.cls)).size < 2) { AI.toast('Add creatures of both species first.'); return; }
      model = G().fitLine(tr); trained = true;
      const per = D.test.map((t) => acc((p) => G().predict(model, p), t)), overall = per.reduce((s, v, i) => s + v * W[i], 0), rare = (per[2] + per[3]) / 2, common = (per[0] + per[1]) / 2;
      AI.logPush('m6', { counts: counts.slice(), per, overall, rareAcc: rare, commonAcc: common });
      readout.innerHTML = ''; readout.appendChild(meters([['Overall accuracy (real-world mix)', AI.pct(overall), overall >= .9 ? 'good' : ''], ['Common creatures (A and B)', AI.pct(common), 'good'], ['Rare creatures (C and D)', AI.pct(rare), rare >= .9 ? 'good' : 'low']]));
      bars.innerHTML = ''; G().GROUPS.forEach((gp, i) => bars.appendChild(h('div', { style: { margin: '6px 0' } }, h('div', { text: gp.id + ': ' + gp.name + (gp.rare ? ' (rare in the wild)' : '') + ' \u2014 ' + AI.pct(per[i])}), h('div', { class: 'bar' }, h('i', { style: { width: per[i] * 100 + '%', background: per[i] >= .9 ? '#16845A' : '#C7344E' } })))));
      msg.innerHTML = ''; msg.appendChild(AI.mascot(rare < .6 ? '<b>' + AI.pct(overall) + ' overall looks great, but the rare creatures are at ' + AI.pct(rare) + '.</b> The sample had almost none of them, so the machine never learned that height is the wrong clue for them. Add some rare creatures and train again.' : rare >= .9 ? '<b>Fixed.</b> Rare creatures now score ' + AI.pct(rare) + '. Representative data fixed the problem; the model itself did not change.' : 'Getting better. Keep adding rare creatures.', rare >= .9 ? 'think' : 'oops'));
      draw();
    }
    function sliders() {
      ctr.innerHTML = '';
      G().GROUPS.forEach((gp, g) => { const out = h('b', { text: counts[g] }); const sl = h('input', { type: 'range', min: 0, max: 14, value: counts[g], 'aria-label': 'Number of group ' + gp.id + ' creatures in the training sample' }); sl.addEventListener('input', () => { counts[g] = +sl.value; out.textContent = counts[g]; AI.setA('a3_m6counts', counts.slice()); trained = false; draw(); }); ctr.appendChild(h('div', { style: { margin: '6px 0' } }, h('div', null, h('b', { style: { color: AI.CLS[gp.cls].color }, text: AI.CLS[gp.cls].sym + ' ' }), gp.id + ': ' + gp.name + ' \u2014 in sample: ', out), sl)); });
    }
    const side = h('div', null,
      h('div', { class: 'card tint' }, h('h3', { text: 'The sample was missing something' }), h('p', { html: 'Out in the wild there are four kinds of creatures. <b>Zorbs</b> can be short <i>or</i> tall (A and C), and <b>Quibs</b> can be tall <i>or</i> short (B and D). But the first expedition mostly found the common kinds, A and B. Press <b>Train</b> to see how the machine does on <b>every</b> kind, then use the sliders to change who is in the training sample. Goal: get the <b>rare</b> creatures to 90% or better.' })),
      ctr, h('div', { class: 'toolbar' }, h('button', { class: 'btn go', type: 'button', text: 'Train the machine on this sample', onclick: train })), readout, bars, msg, spec);
    body.appendChild(h('div', { class: 'bench' }, h('div', null, pb.wrap, AI.legend([0, 1])), side));
    body.appendChild(AI.cfuBlock(['a3q7', 'a3q8'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a3o5'));
    sliders(); draw();
  }

  // ============================== ACTIVITY SHELL ==============================
  AI.acts.a3 = function (root, startPart) {
    const log = (k) => AI.logGet(k).length > 0;
    const parts = [
      { id: 'm1', title: '1 \u00B7 Draw the line', render: mission1, done: () => log('m1') },
      { id: 'm2', title: '2 \u00B7 Tune the dials', render: mission2, done: () => log('m2') },
      { id: 'm3', title: '3 \u00B7 Three species', render: mission3, done: () => log('m3') },
      { id: 'm4', title: '4 \u00B7 Memorize or generalize', render: mission4, done: () => AI.logGet('m4').length >= 3 },
      { id: 'm5', title: '5 \u00B7 No labels', render: mission5, done: () => log('m5') },
      { id: 'm6', title: '6 \u00B7 Fix the sample', render: mission6, done: () => log('m6') },
    ];
    root.appendChild(AI.hero('Activity 3: Train the Machine', 'Teach a machine to sort imaginary creatures. Every mission can be replayed with a new dataset, so try, fail, and try again.'));
    root.appendChild(h('details', { class: 'intro' }, h('summary', { text: 'Meet Nibble and how scoring works' }), AI.mascot('Hi, I\'m <b>Nibble</b>, your lab assistant. In the paper version you drew one line on one graph. Here you can <b>replay as many times as you like</b>. Only your <b>first test on each dataset</b> counts for points, so use the practice time to learn, then test.')));
    const tv = AI.tabsView(parts, 'a3'); root.appendChild(tv.el);
    tv.show(startPart && parts.find((p) => p.id === startPart) ? startPart : 'm1'); tv.refresh();
  };
})();
