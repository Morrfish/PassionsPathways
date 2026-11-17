/* Activity 4 (Be the Neural Network) and Activity 5 (Fraud Detective). */
(function () {
  const AI = (window.AI = window.AI || {});
  AI.acts = AI.acts || {};
  const h = AI.h;
  const meters = (items) => h('div', { class: 'meter' }, items.map((m) => AI.meterBox(m[0], m[1], m[2])));

  // ---------- pixel grid renderer ----------
  function pixGrid(g, opts) {
    opts = opts || {};
    const el = h('div', { class: 'pix' + (opts.paint ? ' paint' : '') + (opts.small ? ' small' : ''), role: 'img', 'aria-label': opts.alt || 'Pixel image' });
    if (opts.small) el.style.gridTemplateColumns = 'repeat(6,16px)';
    for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) {
      const cell = h('i', { class: g[r][c] === '1' ? 'on' : '' });
      if (opts.small) { cell.style.width = '16px'; cell.style.height = '16px'; }
      if (c === 2) cell.style.marginRight = '4px'; if (r === 2) cell.style.marginBottom = '4px';
      el.appendChild(cell);
    }
    return el;
  }

  // ============================== ACTIVITY 4 ==============================
  function a4Run(body) {
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'You are three layers of a neural network' }),
      h('p', { html: 'Each mystery image is a letter drawn on a 6 \u00D7 6 grid. The grid is split into four 3 \u00D7 3 corners (the gaps show the splits). <b>Layer 1</b> only counts dark squares in each corner. <b>Layer 2</b> only sees Layer 1\u2019s numbers and answers three yes/no questions. <b>Layer 3</b> only sees Layer 2\u2019s answers and names the letter (<b>H, L, or T</b>). No layer may look at the whole picture.' })));
    const QN = ['Top-left', 'Top-right', 'Bottom-left', 'Bottom-right'];
    const Q2 = [['eq', 'Are all four corners about equally dark (counts within 1 of each other)?'], ['emp', 'Is any corner empty or nearly empty (0 or 1)?'], ['top', 'Is the top half darker than the bottom half (top two added minus bottom two added is 2 or more)?']];
    [1, 2, 3].forEach((k) => {
      const g = AI.PIX[k], net = AI.pixNet(g), l3 = h('div'), l2 = h('div'), card = h('div', { class: 'card' });
      const l1Inputs = QN.map((n, i) => ({ n, i, inp: AI.numField('l1_' + k + '_' + i, { step: 1, label: 'Image ' + k + ' ' + n + ' dark squares', check: (v) => v === net.q[i] }) }));
      const l1ok = () => net.q.every((v, i) => Number(AI.S.answers['l1_' + k + '_' + i]) === v && AI.S.answers['l1_' + k + '_' + i] != null);
      const l2done = () => Q2.every((q) => AI.S.answers['l2_' + k + '_' + q[0]]);
      let lastState = null;
      function paintLayers() {
        const st = (l1ok() ? 1 : 0) + '' + (l2done() ? 1 : 0); if (st === lastState) return; lastState = st;
        l2.innerHTML = '';
        if (!l1ok()) l2.appendChild(h('p', { class: 'tag', text: 'Layer 2 wakes up when all four Layer 1 counts are correct (green).' }));
        else Q2.forEach((q) => l2.appendChild(h('div', { style: { margin: '6px 0' } }, h('div', { text: q[1] }), AI.selField('l2_' + k + '_' + q[0], ['yes', 'no'], { inline: true, label: q[1], check: (v) => v === (net.l2[{ eq: 'equal', emp: 'empty', top: 'topDark' }[q[0]]] ? 'yes' : 'no') }))));
        l3.innerHTML = '';
        if (!l1ok() || !l2done()) l3.appendChild(h('p', { class: 'tag', text: 'Layer 3 wakes up when Layer 2 has answered all three questions.' }));
        else l3.appendChild(h('div', null, h('b', { text: 'Which letter is it? ' }), AI.selField('l3_' + k, ['H', 'L', 'T'], { inline: true, label: 'Letter for image ' + k, check: (v) => v === AI.PIX_TRUTH[k] })));
      }
      card.appendChild(h('div', { class: 'flex' }, h('div', null, h('b', { text: 'Mystery image ' + k }), h('div', null, pixGrid(g, { alt: 'Mystery image ' + k }))),
        h('div', { style: { flex: '1', minWidth: '260px' } }, h('h4', { text: 'Layer 1: count dark squares' }), h('div', { class: 'grid2' }, l1Inputs.map((x) => h('div', null, h('label', { class: 'f', text: x.n }), x.inp))), h('h4', { style: { marginTop: '12px' }, text: 'Layer 2: answer using only those numbers' }), l2, h('h4', { style: { marginTop: '12px' }, text: 'Layer 3: decide' }), l3)));
      body.appendChild(card);
      card.addEventListener('input', paintLayers); card.addEventListener('change', paintLayers); paintLayers();
    });
    body.appendChild(AI.cfuBlock(['a4q1'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a4o1'));
  }

  function a4Build(body) {
    let g = Array.from({ length: 6 }, () => '000000'.split('')), saved = AI.logGet('fool');
    const liveBox = h('div'), gallery = h('div'), msg = h('div'), gridHost = h('div');
    const strs = () => g.map((r) => r.join(''));
    let painting = false, paintVal = '1';
    function drawGrid() {
      gridHost.innerHTML = ''; const el = pixGrid(strs(), { paint: true, alt: 'Paintable 6 by 6 grid' });
      Array.from(el.children).forEach((cell, idx) => {
        const r = Math.floor(idx / 6), c = idx % 6;
        cell.addEventListener('pointerdown', (e) => { e.preventDefault(); painting = true; paintVal = g[r][c] === '1' ? '0' : '1'; g[r][c] = paintVal; cell.classList.toggle('on', paintVal === '1'); live(); });
        cell.addEventListener('pointerenter', () => { if (painting) { g[r][c] = paintVal; cell.classList.toggle('on', paintVal === '1'); live(); } });
      });
      gridHost.appendChild(el);
    }
    window.addEventListener('pointerup', () => (painting = false));
    function live() {
      const n = AI.pixNet(strs()), on = strs().join('').split('').filter((c) => c === '1').length;
      liveBox.innerHTML = '';
      liveBox.appendChild(h('div', { class: 'card' }, h('h4', { text: 'What the network computes' }),
        h('p', { html: '<b>Layer 1</b> corner counts (TL, TR, BL, BR): <b>' + n.q.join(' / ') + '</b>' }),
        h('p', { html: '<b>Layer 2</b> equal corners: <b>' + (n.l2.equal ? 'yes' : 'no') + '</b> \u2022 empty corner: <b>' + (n.l2.empty ? 'yes' : 'no') + '</b> \u2022 top darker: <b>' + (n.l2.topDark ? 'yes' : 'no') + '</b>' }),
        h('div', { class: 'big', text: on < 3 ? 'Draw something' : 'Network says: ' + (n.out === '?' ? 'not sure' : n.out) })));
    }
    function preset(k) { g = AI.PIX[k].map((r) => r.split('')); drawGrid(); live(); }
    function gallerize() {
      gallery.innerHTML = ''; saved = AI.logGet('fool');
      if (!saved.length) { gallery.appendChild(h('p', { class: 'tag', text: 'Saved images will appear here.' })); return; }
      saved.forEach((f, i) => { const n = AI.pixNet(f.grid); gallery.appendChild(h('div', { class: 'card', style: { display: 'flex', gap: '12px', alignItems: 'center' } }, pixGrid(f.grid, { small: true, alt: 'Saved image' }), h('div', { html: 'I meant: <b>' + (f.intended === 'other' ? 'not a letter' : f.intended) + '</b><br>Network said: <b>' + (n.out === '?' ? 'not sure' : n.out) + '</b> ' + (((['H', 'L', 'T'].indexOf(f.intended) >= 0 && n.out !== f.intended) || (f.intended === 'other' && n.out !== '?')) ? '<span class="ok">fooled \u2713</span>' : '<span class="no">not fooled</span>') }))); });
    }
    const sel = h('select', { class: 'inl', 'aria-label': 'What would a person read this as?' }, [['H', 'a letter H'], ['L', 'a letter L'], ['T', 'a letter T'], ['other', 'not a letter at all']].map((x) => h('option', { value: x[0], text: x[1] })));
    sel.value = 'T';
    function save() {
      const on = strs().join('').split('').filter((c) => c === '1').length; if (on < 5) { AI.toast('Draw at least 5 dark squares first.'); return; }
      AI.logPush('fool', { grid: strs(), intended: sel.value, out: AI.pixNet(strs()).out }); gallerize();
      const n = AI.pixNet(strs()); const fooled = (['H', 'L', 'T'].indexOf(sel.value) >= 0 && n.out !== sel.value) || (sel.value === 'other' && n.out !== '?');
      msg.innerHTML = ''; msg.appendChild(AI.mascot(fooled ? '<b>You fooled it.</b> A person sees ' + (sel.value === 'other' ? 'no letter' : 'a ' + sel.value) + ', but the network\u2019s corner counts say otherwise. What shortcut was it relying on?' : 'Saved. The network agreed with you this time. Try to find a drawing where it cannot.', fooled ? 'think' : 'oops'));
    }
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'Build and break the network' }), h('p', { html: 'This tiny network uses exactly the rules you just followed. <b>Paint squares</b> (click or drag) and watch each layer respond. Then try the challenge: <b>draw something a person would read one way that the network reads another way</b>, choose what a person would see, and save it. Save at least one image where you fool the network.' })));
    body.appendChild(h('div', { class: 'bench' }, h('div', null, h('div', { class: 'stage' }, gridHost), h('div', { class: 'toolbar' }, h('button', { class: 'btn alt sm', type: 'button', text: 'Clear', onclick: () => { g = Array.from({ length: 6 }, () => '000000'.split('')); drawGrid(); live(); } }), ['H', 'L', 'T'].map((L, i) => h('button', { class: 'btn alt sm', type: 'button', text: 'Start from ' + L, onclick: () => preset(i + 1) })))),
      h('div', null, liveBox, h('div', { class: 'toolbar' }, h('label', { for: 'x', text: 'A person would read this as:' }), sel, h('button', { class: 'btn go', type: 'button', text: 'Save this image', onclick: save })), msg, h('h4', { text: 'Your saved images' }), gallery)));
    body.appendChild(AI.cfuBlock(['a4q2', 'a4q3'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a4o2'));
    drawGrid(); live(); gallerize();
  }

  AI.acts.a4 = function (root, startPart) {
    const parts = [{ id: 'run', title: '1 \u00B7 Run the network', render: a4Run, done: () => AI.S.answers.l3_3 != null }, { id: 'build', title: '2 \u00B7 Build and break it', render: a4Build, done: () => AI.logGet('fool').length > 0 }];
    root.appendChild(AI.hero('Activity 4: Be the Neural Network', 'Early layers see edges and counts. Later layers combine them into shapes and objects. Then break it.'));
    const tv = AI.tabsView(parts, 'a4'); root.appendChild(tv.el); tv.show(startPart || 'run'); tv.refresh();
  };

  // ============================== ACTIVITY 5 ==============================
  const FEATS = ['Amount', 'Distance from home', 'Night-time (12\u20136 a.m.)', 'New device', 'Merchant risk'];
  function a5Lazy(body) {
    const d = AI.fraudData(); let shown = false; const out = h('div');
    function show() {
      shown = true; out.innerHTML = '';
      out.appendChild(h('table', { class: 't', style: { maxWidth: '420px' } }, h('tr', null, ['', 'Really fraud', 'Really fine'].map((x) => h('th', { text: x }))), h('tr', null, h('td', { text: 'Flagged' }), h('td', { class: 'num', text: '0' }), h('td', { class: 'num', text: '0' })), h('tr', null, h('td', { text: 'Not flagged' }), h('td', { class: 'num no', text: '20' }), h('td', { class: 'num', text: '380' }))));
      out.appendChild(AI.mascot('This model flagged <b>nothing</b>. It missed every one of the 20 frauds. Now calculate its accuracy: what percent of the 400 transactions did it get right?', 'oops'));
    }
    const sample = d.slice(0, 8);
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'The bank\u2019s data' }), h('p', { html: 'A bank has <b>400 transactions</b>. <b>20</b> are fraud and <b>380</b> are fine, a 5% fraud rate. Each has an amount, a distance from the cardholder\u2019s home, a time of day, whether the device was new, and a merchant risk rating. Here are 8 of them:' }),
      h('div', { class: 'scroll' }, h('table', { class: 't' }, h('tr', null, ['#', 'Amount', 'Distance (km)', 'Hour', 'New device?', 'Merchant risk', 'Fraud?'].map((x) => h('th', { text: x }))), sample.map((t) => h('tr', { class: t.fraud ? 'hl' : '' }, h('td', { text: t.id }), h('td', { class: 'num', text: '$' + t.amount.toFixed(2) }), h('td', { class: 'num', text: t.dist }), h('td', { class: 'num', text: t.hour }), h('td', { class: 'num', text: t.dev ? 'yes' : 'no' }), h('td', { class: 'num', text: t.merch }), h('td', { class: 'num', text: t.fraud ? 'FRAUD' : 'fine' })))))));
    body.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Meet the laziest fraud detector' }), h('p', { text: 'It never flags anything.' }), h('button', { class: 'btn go', type: 'button', text: 'Run the lazy model', onclick: show }), out,
      h('div', { class: 'grid2', style: { marginTop: '10px' } }, h('div', null, h('label', { class: 'f', text: 'Accuracy of the lazy model (percent correct):' }), AI.numField('f_lazyAcc', { label: 'Lazy model accuracy percent', check: (v) => Math.abs(v - 95) <= 1 })), h('div', null, h('label', { class: 'f', text: 'How many of the 20 frauds did it catch?' }), AI.numField('f_lazyCaught', { label: 'Frauds caught', check: (v) => v === 0 })))));
    body.appendChild(AI.cfuBlock(['a5q1'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a5o1'));
    if (AI.S.answers.f_lazyAcc != null) show();
  }

  function a5Tune(body) {
    const w = [1, 1, 1, 1, 1]; let thr = 40;
    const readout = h('div'), goals = h('div'), sliders = h('div'), hist = h('canvas', { width: 560, height: 190, style: { width: '100%' }, role: 'img', 'aria-label': 'Fraud scores for fraud and fine transactions with the threshold' }), saved = h('div');
    function draw() {
      const e = AI.fraudEval(w, thr);
      readout.innerHTML = ''; readout.appendChild(meters([['Frauds caught', e.tp + ' of 20', e.recall >= .9 ? 'good' : e.recall < .7 ? 'low' : ''], ['False alarms', e.fp + ' of 380', e.fp <= 10 ? 'good' : ''], ['Accuracy', AI.pct(e.acc, 1)], ['Traveler false alarms', AI.pct(e.travFA, 1) + ' (' + e.travN + ' travelers)', e.travFA <= .05 ? 'good' : 'low'], ['Local false alarms', AI.pct(e.locFA, 1) + ' (' + e.locN + ' locals)']]));
      const A = e.recall >= .9 && e.fp <= 10, B = e.recall >= .9 && e.travFA <= .05;
      goals.innerHTML = ''; goals.appendChild(h('div', { class: 'banner ' + (A ? 'ok' : 'warn'), text: (A ? '\u2713 ' : '\u25CB ') + 'Goal A: catch at least 18 of 20 frauds with 10 or fewer false alarms' })); goals.appendChild(h('div', { class: 'banner ' + (B ? 'ok' : 'warn'), text: (B ? '\u2713 ' : '\u25CB ') + 'Goal B: catch 90%+ of fraud AND keep traveler false alarms at 5% or less' }));
      // histogram
      const c = hist.getContext('2d'); c.clearRect(0, 0, 560, 190); const bins = 25, lg = new Array(bins).fill(0), fr = new Array(bins).fill(0);
      AI.fraudData().forEach((t) => { const b = Math.min(bins - 1, Math.floor(AI.fraudScore(t, w) / 100 * bins)); t.fraud ? fr[b]++ : lg[b]++; });
      const mx = Math.max.apply(null, lg.concat(fr)), bw = 500 / bins; c.strokeStyle = '#D5DBEE'; c.strokeRect(40, 8, 500, 140);
      for (let i = 0; i < bins; i++) { const hl = Math.sqrt(lg[i] / mx) * 138, hf = Math.sqrt(fr[i] / mx) * 138; c.fillStyle = '#9FD8E8'; c.fillRect(40 + i * bw + 1, 148 - hl, bw - 2, hl); c.fillStyle = '#E89A12'; c.fillRect(40 + i * bw + bw * 0.25, 148 - hf, bw * 0.5, hf); }
      c.fillStyle = '#59627F'; c.font = '11px sans-serif'; c.textAlign = 'center'; [0, 25, 50, 75, 100].forEach((v) => c.fillText(v, 40 + v / 100 * 500, 164)); c.fillText('risk score (0\u2013100)', 290, 182);
      c.strokeStyle = '#C7344E'; c.lineWidth = 3; c.beginPath(); c.moveTo(40 + thr / 100 * 500, 4); c.lineTo(40 + thr / 100 * 500, 148); c.stroke(); c.fillStyle = '#C7344E'; c.textAlign = 'left'; c.fillText('flag if score \u2265 ' + thr, 44 + thr / 100 * 500 > 440 ? 340 : 44 + thr / 100 * 500, 18);
      c.fillStyle = '#9FD8E8'; c.fillRect(46, 28, 10, 10); c.fillStyle = '#141B3C'; c.fillText('fine transactions', 60, 37); c.fillStyle = '#E89A12'; c.fillRect(46, 44, 10, 10); c.fillStyle = '#141B3C'; c.fillText('fraud', 60, 53);
    }
    function build() {
      sliders.innerHTML = '';
      FEATS.forEach((n, i) => { const out = h('b', { text: w[i].toFixed(1) }); const s = h('input', { type: 'range', min: 0, max: 3, step: 0.5, value: w[i], 'aria-label': 'Weight for ' + n }); s.addEventListener('input', () => { w[i] = +s.value; out.textContent = w[i].toFixed(1); draw(); }); sliders.appendChild(h('div', { style: { margin: '4px 0' } }, h('div', null, n + ' weight: ', out), s)); });
      const tOut = h('b', { text: thr }); const ts = h('input', { type: 'range', min: 0, max: 100, step: 1, value: thr, 'aria-label': 'Flag threshold' }); ts.addEventListener('input', () => { thr = +ts.value; tOut.textContent = thr; draw(); });
      sliders.appendChild(h('div', { style: { margin: '10px 0' } }, h('div', null, 'Flag threshold: ', tOut), ts));
    }
    function savedList() { saved.innerHTML = ''; const a = AI.logGet('f_tune'); saved.appendChild(h('p', { class: 'tag', text: a.length + ' setting(s) saved.' })); }
    function save() { AI.logPush('f_tune', { w: w.slice(), thr }); savedList(); AI.toast('Setting saved'); }
    function useDefault() { for (let i = 0; i < 5; i++) w[i] = 1; thr = 40; build(); draw(); }
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'Tune the fraud detector' }), h('p', { html: 'Each transaction gets a <b>risk score</b> from 0 to 100: a weighted blend of five clues. <b>You set the weights</b> (how much each clue matters) and the <b>threshold</b> (flag anything scoring at or above it). The histogram shows where fraud (amber) and fine transactions (blue) land. Try to meet <b>Goal A</b>, then <b>Goal B</b>, which asks the detector to stay fair to travelers. Press <b>Save this setting</b> whenever you find a good one.' })));
    body.appendChild(h('div', { class: 'bench' }, h('div', null, h('div', { class: 'stage' }, hist), goals, readout), h('div', null, h('div', { class: 'card' }, sliders, h('div', { class: 'toolbar' }, h('button', { class: 'btn go', type: 'button', text: 'Save this setting', onclick: save }), h('button', { class: 'btn alt', type: 'button', text: 'Back to default (all 1, threshold 40)', onclick: useDefault })), saved))));
    body.appendChild(h('div', { class: 'card' }, h('h3', { text: 'Who gets flagged?' }), h('p', { html: 'Press <b>Back to default</b> above and read the false-alarm rates for <b>travelers</b> (legitimate customers who often shop far from home) and <b>locals</b>. Which group is flagged more often?' }), AI.selField('f_group', ['Travelers', 'Locals', 'About the same'], { label: 'Which group had more false alarms?', check: (v) => v === 'Travelers' })));
    body.appendChild(AI.cfuBlock(['a5q2'], 'Check for understanding'));
    build(); draw(); savedList();
  }

  function a5Cost(body) {
    const w = [1, 1, 1, 1, 1]; let thr = 40; const readout = h('div'), msg = h('div');
    const cs = AI.FRAUD_COST;
    function draw() { const e = AI.fraudEval(w, thr); readout.innerHTML = ''; readout.appendChild(meters([['Missed frauds', e.fn + ' \u00D7 $' + cs.missed + ' = $' + e.fn * cs.missed], ['False alarms', e.fp + ' \u00D7 $' + cs.alarm + ' = $' + e.fp * cs.alarm], ['Total cost to the bank', '$' + e.cost, ''], ['Traveler false alarms', AI.pct(e.travFA, 1), e.travFA > .05 ? 'low' : 'good']])); }
    const tOut = h('b', { text: thr }), ts = h('input', { type: 'range', min: 0, max: 100, value: thr, 'aria-label': 'Flag threshold' });
    ts.addEventListener('input', () => { thr = +ts.value; tOut.textContent = thr; draw(); });
    function save() { AI.logPush('f_cost', { w: w.slice(), thr }); const e = AI.fraudEval(w, thr), best = AI.fraudBestCost(w); msg.innerHTML = ''; msg.appendChild(AI.mascot('You saved <b>$' + e.cost + '</b>. The cheapest possible for these weights is <b>$' + best + '</b>' + (e.cost <= best * 1.15 + 1 ? '. Nice, you are within 15%.' : '. Keep sliding to find a cheaper threshold.') + ' But cheapest is not the same as fair: check the traveler false-alarm rate.', e.cost <= best * 1.15 + 1 ? 'think' : 'oops')); }
    body.appendChild(h('div', { class: 'card tint' }, h('h3', { text: 'Count the cost' }), h('p', { html: 'Every mistake costs the bank money. A <b>missed fraud</b> costs <b>$' + cs.missed + '</b>. A <b>false alarm</b> (a frozen card and a support call) costs <b>$' + cs.alarm + '</b>. Slide the threshold to find the cheapest setting with the default weights, then press <b>Save my cheapest</b>.' })));
    body.appendChild(h('div', { class: 'bench' }, h('div', null, h('div', { class: 'card' }, h('div', null, 'Flag threshold: ', tOut), ts, h('div', { class: 'toolbar' }, h('button', { class: 'btn go', type: 'button', text: 'Save my cheapest', onclick: save }))), readout), msg));
    body.appendChild(AI.cfuBlock(['a5q3'], 'Check for understanding'));
    body.appendChild(AI.openBlock('a5o2'));
    draw();
  }

  AI.acts.a5 = function (root, startPart) {
    const parts = [{ id: 'lazy', title: '1 \u00B7 The lazy model', render: a5Lazy, done: () => AI.S.answers.f_lazyAcc != null }, { id: 'tune', title: '2 \u00B7 Tune the detector', render: a5Tune, done: () => AI.logGet('f_tune').length > 0 }, { id: 'cost', title: '3 \u00B7 Count the cost', render: a5Cost, done: () => AI.logGet('f_cost').length > 0 }];
    root.appendChild(AI.hero('Activity 5: Fraud Detective', 'Catch rare fraud, count the cost of every mistake, and check who gets flagged unfairly. This is the slide 20 and 28 fraud question, hands-on.'));
    const tv = AI.tabsView(parts, 'a5'); root.appendChild(tv.el); tv.show(startPart || 'lazy'); tv.refresh();
  };
})();
