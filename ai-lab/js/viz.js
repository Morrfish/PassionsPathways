/* Plot canvas + tiny ML library (logistic regression, k-NN, k-means) + creature sprites */
(function () {
  const AI = (window.AI = window.AI || {});
  AI.CLS = [
    { id: 0, name: 'Zorb', color: '#0091B3', chip: 'z', shape: 'circle', sym: '\u25CF' },
    { id: 1, name: 'Quib', color: '#E89A12', chip: 'q', shape: 'triangle', sym: '\u25B2' },
    { id: 2, name: 'Flonk', color: '#B53390', chip: 'f', shape: 'square', sym: '\u25A0' },
  ];

  // ---------- ML ----------
  const ml = (AI.ml = {});
  ml.accuracy = (pred, truth) => { if (!truth.length) return null; let c = 0; for (let i = 0; i < truth.length; i++) if (pred[i] === truth[i]) c++; return c / truth.length; };
  ml.sigmoid = (z) => 1 / (1 + Math.exp(-AI.clamp(z, -30, 30)));
  ml.logisticInit = (d) => ({ w: new Array(d).fill(0), b: 0 });
  ml.logisticP = (m, x) => ml.sigmoid(m.w.reduce((s, wi, i) => s + wi * x[i], m.b));
  ml.logisticStep = function (m, X, y, lr, l2) {
    const n = X.length, gw = new Array(m.w.length).fill(0); let gb = 0, loss = 0;
    for (let i = 0; i < n; i++) {
      const p = ml.logisticP(m, X[i]), e = p - y[i];
      for (let j = 0; j < gw.length; j++) gw[j] += e * X[i][j];
      gb += e; loss += -(y[i] * Math.log(p + 1e-9) + (1 - y[i]) * Math.log(1 - p + 1e-9));
    }
    for (let j = 0; j < gw.length; j++) m.w[j] -= lr * (gw[j] / n + (l2 || 0) * m.w[j]);
    m.b -= lr * gb / n;
    return loss / n;
  };
  ml.logisticFit = function (X, y, o) {
    o = o || {}; const m = ml.logisticInit(X[0].length);
    for (let i = 0; i < (o.epochs || 600); i++) ml.logisticStep(m, X, y, o.lr || 0.5, o.l2 == null ? 0.02 : o.l2);
    return m;
  };
  ml.knn = function (train, p, k) {
    const d = train.map((t) => ({ d: Math.pow((t.x - p.x) / 34, 2) + Math.pow((t.y - p.y) / 10.5, 2), c: t.cls })).sort((a, b) => a.d - b.d);
    const votes = {}; for (let i = 0; i < Math.min(k, d.length); i++) votes[d[i].c] = (votes[d[i].c] || 0) + 1;
    let best = d[0].c, bv = -1; for (const c in votes) if (votes[c] > bv) { bv = votes[c]; best = +c; }
    return best;
  };
  ml.nearest = function (flags, p) {
    let best = 0, bd = 1e9;
    flags.forEach((f, i) => { const d = Math.pow((f.x - p.x) / 34, 2) + Math.pow((f.y - p.y) / 10.5, 2); if (d < bd) { bd = d; best = i; } });
    return best;
  };
  const nd = (a, b) => Math.pow((a.x - b.x) / 34, 2) + Math.pow((a.y - b.y) / 10.5, 2);
  ml.kmInit = function (pts, k, rng) {
    const c = [pts[Math.floor(rng.f() * pts.length)]];
    while (c.length < k) {
      const ds = pts.map((p) => Math.min.apply(null, c.map((q) => nd(p, q)))); const tot = ds.reduce((a, b) => a + b, 0);
      let r = rng.f() * tot, idx = 0; for (let i = 0; i < ds.length; i++) { r -= ds[i]; if (r <= 0) { idx = i; break; } }
      c.push(pts[idx]);
    }
    return c.map((p) => ({ x: p.x, y: p.y }));
  };
  ml.kmAssign = (pts, cent) => pts.map((p) => ml.nearest(cent, p));
  ml.kmUpdate = function (pts, asg, cent) {
    return cent.map((c, i) => { const m = pts.filter((_, j) => asg[j] === i); return m.length ? { x: m.reduce((s, p) => s + p.x, 0) / m.length, y: m.reduce((s, p) => s + p.y, 0) / m.length } : c; });
  };
  ml.kmInertia = (pts, asg, cent) => pts.reduce((s, p, j) => s + nd(p, cent[asg[j]]), 0) * 100;

  // ---------- optional art assets (drop PNGs into assets/ and they are used automatically) ----------
  AI.assets = { has: {} };
  AI.probeAssets = function (names) {
    names.forEach((n) => { const im = new Image(); im.onload = () => { AI.assets.has[n] = true; }; im.src = 'assets/' + n; });
  };

  if (typeof Image !== 'undefined') { AI.habitatImg = new Image(); AI.habitatImg.src = 'ui/habitat_meadow.png'; }

  // ---------- creature sprite (SVG) ----------
  AI.creatureSVG = function (cls, height, spots, seed, size) {
    size = size || 96;
    const c = AI.CLS[cls], r = AI.rng((seed || 1) * 7919 + cls * 13);
    const sc = AI.clamp(0.45 + (height - 10) / 34 * 0.55, 0.45, 1);
    const W = 100, H = 100, bw = 64, bh = 60 * sc + 8, cx = 50, by = 92 - bh;
    let body = '';
    const light = cls === 0 ? '#BFEAF4' : cls === 1 ? '#FBE3B0' : '#F0C4E3';
    const nm = ['zorb', 'quib', 'flonk'][cls], band = height < 20 ? 's' : height < 32 ? 'm' : 'l';
    const key = AI.assets.has['species/' + nm + '_body_' + band + '.png'] ? 'species/' + nm + '_body_' + band + '.png' : 'species/' + nm + '_body.png';
    if (AI.assets.has[key]) {
      body = '<image href="assets/' + key + '" x="' + (cx - bw / 2) + '" y="' + by + '" width="' + bw + '" height="' + bh + '" preserveAspectRatio="xMidYMid meet"/>';
    } else if (cls === 0) {
      body = '<line x1="38" y1="' + (by + 4) + '" x2="32" y2="' + (by - 8) + '" stroke="' + c.color + '" stroke-width="3"/><circle cx="32" cy="' + (by - 9) + '" r="3.5" fill="' + c.color + '"/>' +
        '<line x1="62" y1="' + (by + 4) + '" x2="68" y2="' + (by - 8) + '" stroke="' + c.color + '" stroke-width="3"/><circle cx="68" cy="' + (by - 9) + '" r="3.5" fill="' + c.color + '"/>' +
        '<ellipse cx="' + cx + '" cy="' + (by + bh / 2) + '" rx="' + bw / 2 + '" ry="' + bh / 2 + '" fill="' + light + '" stroke="' + c.color + '" stroke-width="3"/>';
    } else if (cls === 1) {
      body = '<polygon points="26,' + (by + 10) + ' 30,' + (by - 8) + ' 42,' + (by + 2) + '" fill="' + c.color + '"/><polygon points="74,' + (by + 10) + ' 70,' + (by - 8) + ' 58,' + (by + 2) + '" fill="' + c.color + '"/>' +
        '<rect x="' + (cx - bw / 2 + 6) + '" y="' + by + '" width="' + (bw - 12) + '" height="' + bh + '" rx="22" fill="' + light + '" stroke="' + c.color + '" stroke-width="3"/>';
    } else {
      body = '<polygon points="82,' + (by + bh - 16) + ' 98,' + (by + bh - 30) + ' 94,' + (by + bh - 4) + '" fill="' + c.color + '"/><polygon points="44,' + (by + 2) + ' 50,' + (by - 12) + ' 56,' + (by + 2) + '" fill="' + c.color + '"/>' +
        '<rect x="' + (cx - bw / 2) + '" y="' + by + '" width="' + bw + '" height="' + bh + '" rx="10" fill="' + light + '" stroke="' + c.color + '" stroke-width="3"/>';
    }
    let dots = ''; const n = Math.max(0, Math.min(10, Math.round(spots)));
    const placed = [];
    for (let i = 0; i < n; i++) {
      for (let t = 0; t < 40; t++) {
        const px = cx + (r.f() - 0.5) * (bw - 22), py = by + 16 + r.f() * Math.max(10, bh - 28);
        if (placed.every((q) => Math.hypot(q[0] - px, q[1] - py) > 8)) { placed.push([px, py]); dots += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="3.4" fill="' + c.color + '" opacity=".85"/>'; break; }
      }
    }
    const eyes = '<circle cx="42" cy="' + (by + 11) + '" r="3.6" fill="#141B3C"/><circle cx="58" cy="' + (by + 11) + '" r="3.6" fill="#141B3C"/><circle cx="43" cy="' + (by + 10) + '" r="1.1" fill="#fff"/><circle cx="59" cy="' + (by + 10) + '" r="1.1" fill="#fff"/>';
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + c.name + ' creature, ' + Math.round(height) + ' centimeters tall, ' + n + ' spots">' + body + dots + eyes + '</svg>';
  };

  // ---------- Plot ----------
  AI.Plot = function (canvas, o) {
    o = o || {};
    const P = this, ctx = canvas.getContext('2d');
    P.xr = o.xr || [10, 44]; P.yr = o.yr || [0, 10.5];
    P.xl = o.xlabel || 'Height (cm)'; P.yl = o.ylabel || 'Number of spots';
    P.pts = []; P.shade = null; P.line = null; P.handles = []; P.flags = []; P.aspect = o.aspect || 0.54;
    P.onPick = o.onPick; P.onDrag = o.onDrag; P.onDragEnd = o.onDragEnd; P.onClickAt = o.onClickAt; P.title = o.title;
    const M = { l: 46, r: 12, t: 12, b: 40 };
    let W = 600, H = 360, dpr = 1, drag = -1, pickedId = null;
    P.px = (x) => M.l + (x - P.xr[0]) / (P.xr[1] - P.xr[0]) * (W - M.l - M.r);
    P.py = (y) => H - M.b - (y - P.yr[0]) / (P.yr[1] - P.yr[0]) * (H - M.t - M.b);
    P.ux = (px) => P.xr[0] + (px - M.l) / (W - M.l - M.r) * (P.xr[1] - P.xr[0]);
    P.uy = (py) => P.yr[0] + (H - M.b - py) / (H - M.t - M.b) * (P.yr[1] - P.yr[0]);
    function size() {
      const w = canvas.parentElement.clientWidth - 20 || 600; dpr = window.devicePixelRatio || 1;
      W = Math.max(280, w); H = Math.round(W * P.aspect);
      canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.height = H + 'px'; P.render();
    }
    function marker(x, y, cls, r, fill, stroke, lw) {
      ctx.beginPath();
      if (cls === 1) { ctx.moveTo(x, y - r * 1.15); ctx.lineTo(x + r * 1.05, y + r * .8); ctx.lineTo(x - r * 1.05, y + r * .8); ctx.closePath(); }
      else if (cls === 2) ctx.rect(x - r * .9, y - r * .9, r * 1.8, r * 1.8);
      else ctx.arc(x, y, r, 0, 7);
      ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.lineWidth = lw || 2; ctx.strokeStyle = stroke; ctx.stroke(); }
    }
    P.render = function () {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      // optional pale meadow behind the data (Activity 3 plots)
      if (canvas.dataset.habitat && AI.habitatImg && !AI.habitatImg.complete) AI.habitatImg.addEventListener('load', () => P.render(), { once: true });
      if (canvas.dataset.habitat && AI.habitatImg && AI.habitatImg.complete && AI.habitatImg.naturalWidth) {
        const pw = W - M.l - M.r, ph = H - M.t - M.b, im = AI.habitatImg, sc = Math.max(pw / im.naturalWidth, ph / im.naturalHeight), sw = pw / sc, sh = ph / sc;
        ctx.save(); ctx.globalAlpha = .45; ctx.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) / 2, sw, sh, M.l, M.t, pw, ph); ctx.restore();
      }
      // shading
      if (P.shade) {
        const nx = 70, ny = 44, cw = (W - M.l - M.r) / nx, ch = (H - M.t - M.b) / ny;
        for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
          const x = P.ux(M.l + (i + .5) * cw), y = P.uy(M.t + (j + .5) * ch), c = P.shade(x, y);
          if (c == null) continue; ctx.globalAlpha = .13; ctx.fillStyle = AI.CLS[c].color; ctx.fillRect(M.l + i * cw, M.t + j * ch, cw + .6, ch + .6);
        }
        ctx.globalAlpha = 1;
      }
      // grid + axes
      ctx.strokeStyle = '#E3E8F5'; ctx.lineWidth = 1; ctx.fillStyle = '#59627F'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
      for (let x = Math.ceil(P.xr[0] / 2) * 2; x <= P.xr[1]; x += 2) { ctx.beginPath(); ctx.moveTo(P.px(x), M.t); ctx.lineTo(P.px(x), H - M.b); ctx.stroke(); if (x % 4 === 0 || W > 520) ctx.fillText(x, P.px(x), H - M.b + 16); }
      ctx.textAlign = 'right';
      for (let y = Math.ceil(P.yr[0]); y <= P.yr[1]; y++) { ctx.beginPath(); ctx.moveTo(M.l, P.py(y)); ctx.lineTo(W - M.r, P.py(y)); ctx.stroke(); ctx.fillText(y, M.l - 6, P.py(y) + 4); }
      ctx.strokeStyle = '#141B3C'; ctx.lineWidth = 1.5; ctx.strokeRect(M.l, M.t, W - M.l - M.r, H - M.t - M.b);
      ctx.fillStyle = '#141B3C'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(P.xl, M.l + (W - M.l - M.r) / 2, H - 6);
      ctx.save(); ctx.translate(13, M.t + (H - M.t - M.b) / 2); ctx.rotate(-Math.PI / 2); ctx.fillText(P.yl, 0, 0); ctx.restore();
      // line
      ctx.save(); ctx.beginPath(); ctx.rect(M.l, M.t, W - M.l - M.r, H - M.t - M.b); ctx.clip();
      if (P.line) {
        const a = P.line.a, b = P.line.b, dx = b.x - a.x, dy = b.y - a.y, L = 200;
        const x1 = P.px(a.x - dx * L), y1 = P.py(a.y - dy * L), x2 = P.px(a.x + dx * L), y2 = P.py(a.y + dy * L);
        ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(0,212,255,.28)'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        ctx.strokeStyle = '#00A9CF'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
      (P.hlines || []).forEach((l) => { ctx.setLineDash([7, 5]); ctx.strokeStyle = l.color || '#16845A'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(M.l, P.py(l.y)); ctx.lineTo(W - M.r, P.py(l.y)); ctx.stroke(); ctx.setLineDash([]); if (l.label) { ctx.fillStyle = l.color || '#16845A'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(l.label, M.l + 8, P.py(l.y) - 6); } });
      ctx.restore();
      // points
      P.pts.forEach((p) => {
        if (p.hidden) return;
        const x = P.px(p.x), y = P.py(p.y), col = p.color || (p.cls == null ? '#6B7390' : AI.CLS[p.cls].color);
        if (p.state === 'unknown') {
          ctx.beginPath(); ctx.moveTo(x, y - 9); ctx.lineTo(x + 9, y); ctx.lineTo(x, y + 9); ctx.lineTo(x - 9, y); ctx.closePath();
          ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = '#141B3C'; ctx.stroke();
          if (p.label) { ctx.fillStyle = '#141B3C'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(p.label, x, y + 4); }
        } else if (p.state === 'correct' || p.state === 'wrong') {
          marker(x, y, p.cls, 8, col, p.state === 'correct' ? '#16845A' : '#C7344E', 3.5);
          if (p.label) { ctx.fillStyle = '#141B3C'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(p.label + (p.state === 'wrong' ? ' \u2717' : ' \u2713'), x + 11, y - 9); }
        } else if (p.state === 'grey') {
          marker(x, y, p.shape == null ? 0 : p.shape, 6.5, p.color || '#8A93B0', p.ring || '#fff', p.ring ? 3 : 1.5);
        } else {
          marker(x, y, p.cls, p.id === pickedId ? 9 : 7, col, p.wrongMark ? '#C7344E' : '#fff', p.wrongMark ? 3 : 1.5);
        }
      });
      // flags (prototypes)
      P.flags.forEach((f, i) => { const x = P.px(f.x), y = P.py(f.y), c = AI.CLS[f.cls == null ? i : f.cls]; ctx.fillStyle = '#141B3C'; ctx.fillRect(x - 1.5, y - 30, 3, 30); marker(x + 9, y - 26, c.id, 9, c.color, '#141B3C', 2); ctx.fillStyle = '#141B3C'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(c.name, x + 20, y - 22); ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fillStyle = '#00D4FF'; ctx.fill(); ctx.strokeStyle = '#141B3C'; ctx.lineWidth = 2; ctx.stroke(); });
      // centroids
      (P.centroids || []).forEach((f, i) => { const x = P.px(f.x), y = P.py(f.y); ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = ['#0091B3', '#E89A12', '#B53390', '#16845A', '#6B4FD6'][i % 5]; ctx.stroke(); ctx.fillStyle = '#141B3C'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('G' + (i + 1), x, y + 4); });
      // handles
      P.handles.forEach((hd) => { const x = P.px(hd.x), y = P.py(hd.y); ctx.beginPath(); ctx.arc(x, y, 10, 0, 7); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#141B3C'; ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 7); ctx.fillStyle = '#00D4FF'; ctx.fill(); });
    };
    // interaction
    function pos(e) { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) }; }
    function draggables() { return P.handles.concat(P.flags.map((f, i) => Object.assign(f, { _flag: i }))); }
    canvas.addEventListener('pointerdown', (e) => {
      const q = pos(e), list = P.handles.map((h, i) => ({ h, i, k: 'h' })).concat(P.flags.map((h, i) => ({ h, i, k: 'f' })));
      let best = null, bd = 22; list.forEach((it) => { const d = Math.hypot(P.px(it.h.x) - q.x, P.py(it.h.y) - q.y); if (d < bd) { bd = d; best = it; } });
      if (best) { drag = best; canvas.setPointerCapture(e.pointerId); e.preventDefault(); }
      else if (P.onClickAt) P.onClickAt(P.ux(q.x), P.uy(q.y));
    });
    canvas.addEventListener('pointermove', (e) => {
      const q = pos(e);
      if (drag !== -1 && drag) {
        drag.h.x = AI.clamp(P.ux(q.x), P.xr[0], P.xr[1]); drag.h.y = AI.clamp(P.uy(q.y), P.yr[0], P.yr[1]);
        if (P.onDrag) P.onDrag(drag.k, drag.i, drag.h); P.render();
      } else if (P.onPick) {
        let best = null, bd = 16; P.pts.forEach((p) => { if (p.hidden) return; const d = Math.hypot(P.px(p.x) - q.x, P.py(p.y) - q.y); if (d < bd) { bd = d; best = p; } });
        if (best && best.id !== pickedId) { pickedId = best.id; P.onPick(best); P.render(); }
      }
    });
    const end = () => { if (drag && drag !== -1) { drag = -1; if (P.onDragEnd) P.onDragEnd(); } };
    canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
    if (window.ResizeObserver) new ResizeObserver(size).observe(canvas.parentElement); else window.addEventListener('resize', size);
    setTimeout(size, 0);
    P.resize = size;
  };

  // side of a line through a->b
  AI.side = (l, p) => ((l.b.x - l.a.x) * (p.y - l.a.y) - (l.b.y - l.a.y) * (p.x - l.a.x)) >= 0 ? 1 : 0;
})();
