// Pattern files: a printable PDF (tech pack, fabric and supplies, cutting layout, sewing steps
// and the full-size pattern tiled onto pages), plus SVG and DXF for pattern software and cutters.
import { jsPDF } from 'jspdf';
import { SEAM, HEM, FABRIC_TIPS, FABRIC_PRICE, SUPPLY_PRICE, bbox } from './pattern.js';
import { swatchURL } from './fabrics.js';

// Inches with fractions, the way sewing patterns write them (5/8", 12 1/4").
export function inches(cm) {
  const e = Math.round(cm / 2.54 * 8), w = Math.floor(e / 8), f = e % 8;
  const frac = f ? ({ 1: '1/8', 2: '1/4', 3: '3/8', 4: '1/2', 5: '5/8', 6: '3/4', 7: '7/8' })[f] : '';
  return (w ? w + (frac ? ' ' : '') : '') + frac + '"' || '0"';
}
const PAPER = { letter: [215.9, 279.4], a4: [210, 297] };
const INK = [43, 34, 40], ACCENT = [180, 70, 110], GREY = [120, 110, 115], SIZE_COLORS = [[180, 70, 110], [30, 90, 170], [40, 140, 90], [200, 120, 20], [120, 60, 160]];

// Arrange pieces (all sizes nested on top of each other) in rows, in millimeters.
export function arrange(sets, maxW = 560) {
  const groups = sets[0].pieces.map((p, i) => {
    const all = sets.flatMap((s) => s.pieces[i] ? s.pieces[i].cutLine : []), b = bbox(all);
    return { i, b, w: b.w * 10 + 24, h: b.h * 10 + 24 };
  });
  const W = Math.max(maxW, ...groups.map((g) => g.w));
  let x = 0, y = 0, rowH = 0;
  for (const g of groups.slice().sort((a, b) => b.h - a.h)) {
    if (x + g.w > W) { x = 0; y += rowH; rowH = 0; }
    g.x = x; g.y = y; x += g.w; rowH = Math.max(rowH, g.h);
  }
  return { groups, W, H: y + rowH };
}

// Draw one piece (in mm) through a "pen" that knows how to draw lines and text.
function drawPiece(pen, piece, ox, oy, { color = INK, sewLine = true, labels = true, sizeLabel = '', fabric = '', design = '' } = {}) {
  const T = ([x, y]) => [ox + x * 10, oy + y * 10];
  pen.poly(piece.cutLine.map(T), { color, width: 0.45, closed: true });
  if (!sewLine) { if (sizeLabel) { const p = T(piece.cutLine[0]); pen.text(sizeLabel, p[0] + 1.5, p[1] - 1.5, { size: 7, color }); } return; }
  pen.poly(piece.outline.pts.map(T), { color: GREY, width: 0.2, dash: [2, 1.5], closed: true });
  for (const l of piece.inner || []) pen.poly(l.pts.map(T), { color: l.kind === 'dart' ? INK : GREY, width: 0.3, dash: l.kind === 'fold' ? [4, 2] : null });
  // Notches: short marks across the cutting line.
  for (const n of piece.notches || []) {
    let best = null, bd = Infinity;
    for (const c of piece.cutLine) { const d = Math.hypot(c[0] - n[0], c[1] - n[1]); if (d < bd) { bd = d; best = c; } }
    if (!best) continue;
    const dx = best[0] - n[0], dy = best[1] - n[1], L = Math.hypot(dx, dy) || 1, a = T(best), b = [a[0] - dx / L * 5, a[1] - dy / L * 5];
    pen.line(a, b, { color: INK, width: 0.5 });
  }
  // Grainline arrow
  const [g0, g1] = piece.grain.map(T);
  pen.line(g0, g1, { color: INK, width: 0.3 });
  const arrow = (p, dir) => { const ux = (g1[0] - g0[0]), uy = (g1[1] - g0[1]), L = Math.hypot(ux, uy) || 1, ax = ux / L * dir, ay = uy / L * dir; pen.line(p, [p[0] - ax * 4 - ay * 2, p[1] - ay * 4 + ax * 2], { color: INK, width: 0.3 }); pen.line(p, [p[0] - ax * 4 + ay * 2, p[1] - ay * 4 - ax * 2], { color: INK, width: 0.3 }); };
  arrow(g1, 1); arrow(g0, -1);
  // Fold edge
  if (piece.cut.fold) {
    const ys = piece.outline.pts.map((p) => p[1]), y0 = Math.min(...ys) + 3, y1 = Math.max(...ys) - 3, a = T([0, y0]), b = T([0, y1]);
    pen.line([a[0] + 6, a[1]], [b[0] + 6, b[1]], { color: ACCENT, width: 0.35 });
    pen.line([a[0], a[1]], [a[0] + 6, a[1]], { color: ACCENT, width: 0.35 }); pen.line([b[0], b[1]], [b[0] + 6, b[1]], { color: ACCENT, width: 0.35 });
    pen.text('PLACE ON FOLD', a[0] + 8, (a[1] + b[1]) / 2, { size: 8, color: ACCENT, angle: 90 });
  }
  if (labels) {
    const b = bbox(piece.outline.pts), c = T([(b.x0 + b.x1) / 2 + (piece.cut.fold ? b.w * 0.12 : 0), b.y0 + b.h * 0.38]);
    const cut = piece.cut.fold ? `Cut ${piece.cut.count} on fold` : `Cut ${piece.cut.count}`;
    pen.text(piece.name, c[0], c[1], { size: 11, bold: true, align: 'center' });
    pen.text(`${cut} · ${fabric}`, c[0], c[1] + 5, { size: 8, align: 'center' });
    if (sizeLabel) pen.text(`Size ${sizeLabel}`, c[0], c[1] + 9.5, { size: 8, align: 'center' });
    if (piece.note) pen.text(piece.note, c[0], c[1] + 14, { size: 7, align: 'center', color: GREY });
    if (design) pen.text(design, c[0], c[1] + 18.5, { size: 7, align: 'center', color: GREY });
  }
}

// A pen that draws into a jsPDF document.
function pdfPen(doc) {
  const set = (o) => { const c = o.color || INK; doc.setDrawColor(c[0], c[1], c[2]); doc.setLineWidth(o.width || 0.3); doc.setLineDashPattern(o.dash || [], 0); };
  return {
    line(a, b, o = {}) { set(o); doc.line(a[0], a[1], b[0], b[1]); },
    poly(pts, o = {}) { if (pts.length < 2) return; set(o); const segs = []; for (let i = 1; i < pts.length; i++) segs.push([pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]]); doc.lines(segs, pts[0][0], pts[0][1], [1, 1], 'S', !!o.closed); },
    text(s, x, y, o = {}) { const c = o.color || INK; doc.setTextColor(c[0], c[1], c[2]); doc.setFont('helvetica', o.bold ? 'bold' : 'normal'); doc.setFontSize(o.size || 9); doc.text(String(s), x, y, { align: o.align || 'left', angle: o.angle || 0 }); },
  };
}

export async function buildPDF(job) {
  const { paper = 'letter', units = 'in' } = job;
  const [PW, PH] = PAPER[paper] || PAPER.letter, M = 12;
  const doc = new jsPDF({ unit: 'mm', format: [PW, PH] });
  const pen = pdfPen(doc), F = job.F, len = (c) => units === 'in' ? inches(c) : `${Math.round(c * 10) / 10} cm`;
  const header = (title, sub) => {
    doc.setFillColor(43, 34, 40); doc.rect(0, 0, PW, 16, 'F');
    doc.setTextColor(248, 239, 230); doc.setFont('times', 'bold'); doc.setFontSize(15); doc.text('Atelier Studio', M, 10.5);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.text(`${title} · ${job.design.name}`, PW - M, 10.5, { align: 'right' });
    if (sub) { pen.text(sub, M, 24, { size: 9, color: GREY }); }
  };
  const table = (rows, x, y, widths, o = {}) => {
    for (const [i, r] of rows.entries()) {
      const bold = o.head && i === 0; let cx = x;
      r.forEach((cell, j) => { pen.text(cell, cx, y, { size: o.size || 9, bold, color: bold ? ACCENT : INK }); cx += widths[j]; });
      y += o.gap || 5.2;
      if (bold) { pen.line([x, y - 3.6], [x + widths.reduce((a, b) => a + b, 0), y - 3.6], { color: [220, 210, 200], width: 0.2 }); }
    }
    return y;
  };
  const wrap = (s, x, y, w, size = 9.5, gap = 4.6) => { doc.setFont('helvetica', 'normal'); doc.setFontSize(size); const lines = doc.splitTextToSize(s, w); for (const l of lines) { if (y > PH - M) { doc.addPage([PW, PH]); header('Sewing steps'); y = 26; } pen.text(l, x, y, { size }); y += gap; } return y; };

  // ---- 1. Tech pack ----
  header('Tech pack', `${F.kind[0].toUpperCase() + F.kind.slice(1)} · ${job.bodyLabel} · ${new Date().toLocaleDateString()}`);
  pen.text(job.design.name, M, 34, { size: 20, bold: true });
  const imgW = (PW - 2 * M - 8) / 3, imgH = imgW * 1.5;
  const imgs = [['Front', job.images.front], ['Back', job.images.back], ['3D', job.images.look]];
  imgs.forEach(([label, url], i) => {
    const x = M + i * (imgW + 4), y = 40;
    doc.setDrawColor(227, 217, 207); doc.setLineWidth(0.2); doc.setLineDashPattern([], 0); doc.rect(x, y, imgW, imgH);
    if (url) try { doc.addImage(url, 'JPEG', x + 1, y + 1, imgW - 2, imgH - 2); } catch { /* image missing */ }
    pen.text(label, x + imgW / 2, y + imgH + 5, { size: 8, align: 'center', color: GREY });
  });
  let y = 40 + imgH + 14;
  pen.text('Fabrics', M, y, { size: 12, bold: true }); y += 6;
  for (const g of job.plan) {
    try { doc.addImage(swatchURL(g.fabric, g.color || '#cccccc'), 'PNG', M, y - 4, 8, 8); } catch { /* ignore */ }
    pen.text(`${g.name}${g.color ? ' · ' + g.color.toUpperCase() : ''}: ${g.pieces.map((p) => p.name).join(', ')}`, M + 11, y + 1, { size: 9 });
    y += 10;
  }
  y += 2;
  pen.text('Measurements', M, y, { size: 12, bold: true }); y += 6;
  const mrow = (label, b, g) => [label, b == null ? '–' : len(b), g == null ? '–' : len(g)];
  y = table([['', 'Body', 'Garment'], mrow(F.body.bust ? 'Bust / chest' : 'Bust', F.body.bust, job.measure.bust), mrow('Waist', F.body.waist, job.measure.waist), mrow('Hip', F.body.hip, job.measure.hip), mrow('Length', null, job.measure.length), mrow('Hem around', null, job.measure.hem), mrow('Sleeve', null, job.measure.sleeve), mrow('Inseam', F.body.inseam, job.measure.inseam)], M, y, [40, 30, 30], { head: true });
  y += 3;
  pen.text('Construction', M, y, { size: 12, bold: true }); y += 6;
  y = wrap(`Seam allowance ${len(SEAM)} included on all seams, hem allowance ${len(HEM)}. Pieces marked "place on fold" have no allowance on the fold edge.`, M, y, PW - 2 * M);
  if (job.design.notes) { y += 2; pen.text('Notes', M, y, { size: 12, bold: true }); y += 6; wrap(job.design.notes, M, y, PW - 2 * M); }

  // ---- 2. Fabric, supplies, cost ----
  doc.addPage([PW, PH]); header('Fabric and supplies', 'How much to buy. Fabric is laid out folded in half lengthwise.');
  y = 34; pen.text('Fabric to buy', M, y, { size: 13, bold: true }); y += 7;
  const yd = (r) => `${r.yards} yd (${r.meters} m)`;
  y = table([['Fabric', '45" (114 cm) wide', '60" (152 cm) wide', 'Pieces'], ...job.plan.map((g) => [g.name, yd(g.w45), yd(g.w60), String(g.pieces.reduce((a, p) => a + p.cut.count, 0))])], M, y, [50, 45, 45, 20], { head: true });
  if (job.plan.some((g) => g.nap)) { y += 1; y = wrap('Includes 10% extra for fabrics with a nap or shine direction (all pieces must face the same way).', M, y, PW - 2 * M, 8.5); }
  y += 6; pen.text('Supplies', M, y, { size: 13, bold: true }); y += 7;
  for (const s of job.supplies) { pen.text('•', M, y); y = wrap(`${s.name}${s.qty > 1 && s.key !== 'lining' && s.key !== 'interfacing' ? ' × ' + s.qty : ''}`, M + 4, y, PW - 2 * M - 4); y += 0.6; }
  y += 6; pen.text('Cost estimate', M, y, { size: 13, bold: true }); y += 7;
  const P = job.prices || {}, money = (v) => `$${v.toFixed(2)}`;
  const costRows = [['Item', 'Amount', 'Price', 'Cost']];
  let total = 0;
  for (const g of job.plan) { const price = P[g.fabric] ?? FABRIC_PRICE[g.fabric] ?? 10, c = price * g.w60.yards; total += c; costRows.push([g.name + ' (60")', `${g.w60.yards} yd`, `${money(price)}/yd`, money(c)]); }
  for (const s of job.supplies) { const price = P['supply:' + s.key] ?? SUPPLY_PRICE[s.key] ?? 0, c = price * s.qty; total += c; costRows.push([s.name.split(',')[0].split('(')[0].slice(0, 34), String(s.qty), money(price), money(c)]); }
  costRows.push(['Total', '', '', money(total)]);
  table(costRows, M, y, [80, 30, 30, 30], { head: true });

  // ---- 3. Cutting layout ----
  doc.addPage([PW, PH]); header('Cutting layout', 'Lay the pieces like this on 60" fabric folded in half (fold on the left). Grain arrows run along the fold.');
  y = 30;
  const colW = (PW - 2 * M - 8) / Math.min(2, job.plan.length || 1);
  job.plan.forEach((g, gi) => {
    const L = g.w60.layout, maxH = PH - y - 20, s = Math.min((colW - 10) / (L.width * 10), maxH / (L.length * 10 || 1)) * 10, x0 = M + gi % 2 * (colW + 8) + 4, y0 = y + 8;
    pen.text(`${g.name}: ${g.w60.yards} yd of 60"`, x0, y, { size: 10, bold: true });
    doc.setFillColor(248, 243, 237); doc.rect(x0, y0, L.width * s, L.length * s, 'F');
    pen.line([x0, y0], [x0, y0 + L.length * s], { color: ACCENT, width: 0.5, dash: L.open ? [2, 2] : null });
    pen.text(L.open ? 'open, single layer' : 'FOLD', x0 - 1.5, y0 + 12, { size: 6, color: ACCENT, angle: 90 });
    for (const it of L.placed) {
      const b = it.p.box, ox = x0 + (it.x - b.x0) * s, oy = y0 + (it.y - b.y0) * s;
      pen.poly(it.p.cutLine.map(([px, py]) => [ox + px * s, oy + py * s]), { color: INK, width: 0.25, closed: true });
      pen.text(it.p.name.split(' (')[0], ox + (b.x0 + b.w / 2) * s, oy + (b.y0 + b.h / 2) * s, { size: 5.5, align: 'center' });
    }
    pen.text(`${Math.round(L.length)} cm`, x0 + L.width * s + 2, y0 + L.length * s, { size: 6, color: GREY });
  });

  // ---- 4. Sewing steps ----
  doc.addPage([PW, PH]); header('Sewing steps');
  y = 28;
  job.steps.forEach((st, i) => { pen.text(`${i + 1}.`, M, y, { size: 10, bold: true }); y = wrap(st, M + 7, y, PW - 2 * M - 7, 10, 4.8) + 1.5; });
  y += 4;
  const tips = [...new Set(job.plan.map((g) => g.fabric))].filter((f) => FABRIC_TIPS[f]);
  if (tips.length) { pen.text('Working with your fabrics', M, y, { size: 12, bold: true }); y += 6; for (const f of tips) { y = wrap(`${job.plan.find((g) => g.fabric === f).name}: ${FABRIC_TIPS[f]}`, M, y, PW - 2 * M) + 1.5; } }

  // ---- 5. Pattern pages ----
  const arr = arrange(job.sets);
  const fabricOf = (p) => job.plan.find((g) => g.pieces.includes(p))?.name || '';
  const drawAll = (penX, offX, offY) => {
    for (const g of arr.groups) {
      const ox = offX + g.x + 12 - g.b.x0 * 10, oy = offY + g.y + 12 - g.b.y0 * 10;
      job.sets.forEach((set, si) => { if (si > 0 && set.pieces[g.i]) drawPiece(penX, set.pieces[g.i], ox, oy, { color: SIZE_COLORS[si % SIZE_COLORS.length], sewLine: false, sizeLabel: set.label }); });
      const main = job.sets[0].pieces[g.i];
      drawPiece(penX, main, ox, oy, { sizeLabel: job.sets.length > 1 ? job.sets[0].label : '', fabric: fabricOf(main), design: job.design.name });
    }
  };
  const testSquare = (x, y0) => {
    pen.poly([[x, y0], [x + 50, y0], [x + 50, y0 + 50], [x, y0 + 50]], { width: 0.3, closed: true });
    pen.poly([[x + 54, y0], [x + 54 + 50.8, y0], [x + 54 + 50.8, y0 + 50.8], [x + 54, y0 + 50.8]], { width: 0.3, closed: true });
    pen.text('5 cm', x + 25, y0 + 27, { size: 9, align: 'center' }); pen.text('2 in', x + 54 + 25.4, y0 + 27, { size: 9, align: 'center' });
    pen.text('Print at 100% ("actual size"). Measure these squares before cutting.', x, y0 + 57, { size: 8, color: GREY });
  };
  if (paper === 'large') {
    const W = arr.W + 24, H = arr.H + 90;
    doc.addPage([W, H], W > H ? 'l' : 'p');
    pen.text(`${job.design.name} · full-size pattern · seam allowance ${len(SEAM)} included`, 12, 12, { size: 12, bold: true });
    testSquare(12, 18);
    drawAll(pen, 12, 84);
  } else {
    const tw = PW - 2 * M, th = PH - 2 * M - 8, cols = Math.max(1, Math.ceil(arr.W / tw)), rows = Math.max(1, Math.ceil((arr.H + 70) / th));
    // Page map
    doc.addPage([PW, PH]); header('Putting the pattern together', 'Print every page at 100%. Trim one edge of each page along the dashed line and tape pages together by their labels.');
    const sm = Math.min((PW - 2 * M) / (cols * tw), (PH - 60) / (rows * th)), mx = M, my = 34;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      pen.poly([[mx + c * tw * sm, my + r * th * sm], [mx + (c + 1) * tw * sm, my + r * th * sm], [mx + (c + 1) * tw * sm, my + (r + 1) * th * sm], [mx + c * tw * sm, my + (r + 1) * th * sm]], { color: [200, 190, 180], width: 0.2, closed: true });
      pen.text(`${String.fromCharCode(65 + r)}${c + 1}`, mx + (c + 0.5) * tw * sm, my + (r + 0.5) * th * sm, { size: 7, align: 'center', color: GREY });
    }
    const miniPen = { line: (a, b, o) => pen.line([mx + a[0] * sm, my + a[1] * sm], [mx + b[0] * sm, my + b[1] * sm], { ...o, width: 0.15 }), poly: (pts, o) => pen.poly(pts.map((p) => [mx + p[0] * sm, my + p[1] * sm]), { ...o, width: 0.15, dash: null }), text: () => {} };
    drawAll(miniPen, 0, 70);
    pen.text(`${rows * cols} pages: ${rows} rows (A–${String.fromCharCode(64 + rows)}) × ${cols} columns`, M, my + rows * th * sm + 8, { size: 9 });
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      doc.addPage([PW, PH]);
      const ox = M - c * tw, oy = M - r * th;
      doc.saveGraphicsState(); doc.rect(M, M, tw, th, null); doc.clip(); doc.discardPath();
      if (r === 0 && c === 0) testSquare(M + 6, M + 6);
      drawAll(pen, ox, oy + 70);
      doc.restoreGraphicsState();
      pen.poly([[M, M], [M + tw, M], [M + tw, M + th], [M, M + th]], { color: [170, 160, 160], width: 0.2, dash: [1.5, 1.5], closed: true });
      const label = `${String.fromCharCode(65 + r)}${c + 1}`;
      pen.text(label, PW - M, PH - M + 6, { size: 12, bold: true, align: 'right' });
      pen.text(`${job.design.name} · page ${label} of ${rows * cols}`, M, PH - M + 6, { size: 7, color: GREY });
      // Neighbour labels at the edges help line pages up.
      if (c + 1 < cols) pen.text(`next: ${String.fromCharCode(65 + r)}${c + 2}`, M + tw - 1, M + th / 2, { size: 7, color: GREY, align: 'right' });
      if (r + 1 < rows) pen.text(`below: ${String.fromCharCode(66 + r)}${c + 1}`, M + tw / 2, M + th - 1.5, { size: 7, color: GREY, align: 'center' });
      for (const [px, py] of [[M + tw / 2, M], [M + tw / 2, M + th], [M, M + th / 2], [M + tw, M + th / 2]]) pen.poly([[px - 2, py], [px, py - 2], [px + 2, py], [px, py + 2]], { width: 0.25, closed: true });
    }
  }
  return doc.output('blob');
}

// ---------- SVG and DXF ----------
export function buildSVG(job) {
  const arr = arrange(job.sets), out = [];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rgb = (c) => `rgb(${c.join(',')})`;
  const pen = {
    line: (a, b, o = {}) => out.push(`<line x1="${a[0].toFixed(2)}" y1="${a[1].toFixed(2)}" x2="${b[0].toFixed(2)}" y2="${b[1].toFixed(2)}" stroke="${rgb(o.color || INK)}" stroke-width="${o.width || 0.3}"${o.dash ? ` stroke-dasharray="${o.dash.join(' ')}"` : ''}/>`),
    poly: (pts, o = {}) => out.push(`<${o.closed ? 'polygon' : 'polyline'} points="${pts.map((p) => p[0].toFixed(2) + ',' + p[1].toFixed(2)).join(' ')}" fill="none" stroke="${rgb(o.color || INK)}" stroke-width="${o.width || 0.3}"${o.dash ? ` stroke-dasharray="${o.dash.join(' ')}"` : ''}/>`),
    text: (s, x, y, o = {}) => out.push(`<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" font-family="Helvetica, Arial, sans-serif" font-size="${((o.size || 9) * 0.3528).toFixed(2)}" fill="${rgb(o.color || INK)}"${o.bold ? ' font-weight="bold"' : ''}${o.align === 'center' ? ' text-anchor="middle"' : o.align === 'right' ? ' text-anchor="end"' : ''}${o.angle ? ` transform="rotate(${-o.angle} ${x.toFixed(2)} ${y.toFixed(2)})"` : ''}>${esc(s)}</text>`),
  };
  for (const g of arr.groups) {
    const ox = g.x + 12 - g.b.x0 * 10, oy = g.y + 12 - g.b.y0 * 10;
    job.sets.forEach((set, si) => { if (si > 0) drawPiece(pen, set.pieces[g.i], ox, oy, { color: SIZE_COLORS[si % SIZE_COLORS.length], sewLine: false, sizeLabel: set.label }); });
    drawPiece(pen, job.sets[0].pieces[g.i], ox, oy, { sizeLabel: job.sets.length > 1 ? job.sets[0].label : '', design: job.design.name });
  }
  return new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${arr.W}mm" height="${arr.H}mm" viewBox="0 0 ${arr.W} ${arr.H}">\n${out.join('\n')}\n</svg>\n`], { type: 'image/svg+xml' });
}

// DXF (R12, millimeters): cutting lines on layer CUT, sewing lines on SEW, marks on MARKS.
export function buildDXF(job) {
  const arr = arrange(job.sets), e = [];
  const poly = (pts, layer, closed) => { e.push('0', 'POLYLINE', '8', layer, '66', '1', '70', closed ? '1' : '0'); for (const [x, y] of pts) e.push('0', 'VERTEX', '8', layer, '10', x.toFixed(3), '20', (-y).toFixed(3)); e.push('0', 'SEQEND', '8', layer); };
  const text = (s, x, y, h) => e.push('0', 'TEXT', '8', 'TEXT', '10', x.toFixed(3), '20', (-y).toFixed(3), '40', h.toFixed(2), '1', String(s).replace(/[^\x20-\x7e]/g, ''));
  for (const g of arr.groups) {
    const ox = g.x + 12 - g.b.x0 * 10, oy = g.y + 12 - g.b.y0 * 10, T = ([x, y]) => [ox + x * 10, oy + y * 10];
    job.sets.forEach((set, si) => {
      const p = set.pieces[g.i]; if (!p) return;
      poly(p.cutLine.map(T), si ? 'CUT_' + set.label : 'CUT', true);
      if (si) return;
      poly(p.outline.pts.map(T), 'SEW', true);
      for (const l of p.inner || []) poly(l.pts.map(T), 'MARKS', false);
      poly(p.grain.map(T), 'GRAIN', false);
      const b = bbox(p.outline.pts), c = T([(b.x0 + b.x1) / 2, b.y0 + b.h * 0.4]);
      text(`${p.name} - Cut ${p.cut.count}${p.cut.fold ? ' on fold' : ''}`, c[0] - 30, c[1], 5);
    });
  }
  const s = ['0', 'SECTION', '2', 'HEADER', '9', '$INSUNITS', '70', '4', '0', 'ENDSEC', '0', 'SECTION', '2', 'ENTITIES', ...e, '0', 'ENDSEC', '0', 'EOF'];
  return new Blob([s.join('\r\n') + '\r\n'], { type: 'application/dxf' });
}
