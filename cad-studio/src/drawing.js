// 2D drawing sheets: orthographic views with hidden lines, sizes, notes and a
// title block, made from the open part or assembly. Print to PDF or save SVG.
import { fmt } from './expr.js';
import { icon } from './icons.js';
import { UNIT_MM } from './units.js';

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const SVGNS = 'http://www.w3.org/2000/svg';

export const SHEETS = {
  A4: { name: 'A4 (297 × 210 mm)', w: 297, h: 210 },
  A3: { name: 'A3 (420 × 297 mm)', w: 420, h: 297 },
  Letter: { name: 'Letter (11 × 8.5 in)', w: 279.4, h: 215.9 },
  Tabloid: { name: 'Tabloid (17 × 11 in)', w: 431.8, h: 279.4 },
};
const SCALES = [10, 5, 4, 2, 1, 1 / 2, 1 / 2.5, 1 / 4, 1 / 5, 1 / 10, 1 / 20, 1 / 50, 1 / 100];
const scaleText = (s) => (s >= 1 ? `${fmt(s)}:1` : `1:${fmt(1 / s)}`);
const VIEW_NAMES = { front: 'FRONT', top: 'TOP', right: 'RIGHT', iso: 'ISOMETRIC' };

export function defaultDrawing() {
  return {
    sheet: 'Letter', projection: 'third', scale: 'auto', views: { front: true, top: true, right: true, iso: true },
    hidden: true, autoDims: true, holeNotes: true, decimals: 2,
    title: { drawnBy: '', school: '', course: '', date: new Date().toISOString().slice(0, 10), partNo: '', notes: '' },
    dims: [], notes: [],
  };
}

export class Drafter {
  constructor(app) {
    this.app = app;
    this.el = $('#drawWrap');
    this.tool = 'select';
    this.sel = null;
    this.zoom = 1;
    this.cache = null;
    this.picks = [];
  }
  get root() { return this.app.drawTarget(); }
  get d() { const r = this.root; if (!r.drawing) r.drawing = defaultDrawing(); return r.drawing; }
  units() { return this.root.units || 'mm'; }

  open() {
    this.el.hidden = false;
    this.tool = 'select';
    this.sel = null;
    this.fitZoom = true;
    this.update();
  }
  close() { this.el.hidden = true; this.el.innerHTML = ''; }

  geomKey() {
    const r = this.root;
    if (r.kind === 'assembly') return JSON.stringify([r.parts, r.components.filter((c) => !c.hidden).map((c) => [c.part, c.pos, c.quat]), r.units]);
    return JSON.stringify([r.features, r.params, r.rollback ?? null, r.units]);
  }
  wantedViews() { return Object.keys(VIEW_NAMES).filter((v) => this.d.views[v]); }

  async update() {
    const key = this.geomKey() + this.wantedViews().join();
    if (!this.cache || this.cache.key !== key) {
      this.app.ui.busy(true);
      const r = this.root;
      const msg = r.kind === 'assembly'
        ? { type: 'drawing', parts: r.parts, comps: r.components.filter((c) => !c.hidden).map((c) => ({ id: c.id, part: c.part, pos: c.pos, quat: c.quat })), scale: UNIT_MM[r.units || 'mm'], views: this.wantedViews() }
        : { type: 'drawing', doc: r, views: this.wantedViews() };
      const m = await this.app.send(msg);
      this.app.ui.busy(false);
      if (m.type === 'error') { this.el.innerHTML = `<div class="drawempty">${icon('drawing', 40)}<p>${esc(m.msg)}</p></div>`; this.app.ui.renderDrawPanel(); return; }
      this.cache = { key, views: m.views };
    }
    this.render();
    this.app.ui.renderDrawPanel();
  }

  // ----- layout -----
  layout() {
    const d = this.d, sheet = SHEETS[d.sheet] || SHEETS.Letter;
    const V = this.cache.views;
    const toMm = UNIT_MM[this.units()];
    const size = (n) => { const v = V[n]; if (!v || v.error) return [0, 0]; const b = v.bounds; return [(b[1][0] - b[0][0]) * toMm, (b[1][1] - b[0][1]) * toMm]; };
    const [fw, fh] = size('front'), [tw, th] = size('top'), [rw, rh] = size('right'), [iw, ih] = size('iso');
    const margin = 10, tbH = 32;
    const areaW = sheet.w - 2 * margin, areaH = sheet.h - 2 * margin - tbH;
    const gap = 22; // room for dimensions between views (sheet mm)
    let scale = d.scale;
    if (scale === 'auto') {
      scale = SCALES[SCALES.length - 1];
      for (const s of SCALES) {
        const needW = (fw + (d.views.right ? rw : 0)) * s + gap * 3 + (d.views.iso ? Math.max(iw * s * 0.8, 0) : 0);
        const needH = (fh + (d.views.top ? th : 0)) * s + gap * 3;
        if (needW <= areaW && needH <= areaH) { scale = s; break; }
      }
    }
    const pos = {};
    const x0 = margin + gap, yBottom = sheet.h - margin - tbH - gap;
    const first = d.projection === 'first';
    // Front view is the anchor; top above it (third angle) or below (first angle).
    const frontX = first && d.views.right ? x0 + rw * scale + gap : x0;
    const frontY = first ? margin + gap + fh * scale : (d.views.top ? margin + gap + th * scale + gap + fh * scale : yBottom);
    const fy = Math.min(frontY, yBottom - (first && d.views.top ? th * scale + gap : 0));
    pos.front = { x: frontX, yb: fy };
    if (d.views.top) pos.top = { x: frontX, yb: first ? fy + gap + th * scale : fy - fh * scale - gap };
    if (d.views.right) pos.right = { x: first ? x0 : frontX + fw * scale + gap, yb: fy };
    if (d.views.iso) {
      const isoS = scale * 0.8;
      const rightEdge = sheet.w - margin - gap;
      pos.iso = { x: rightEdge - iw * isoS, yb: margin + gap + ih * isoS, s: isoS };
    }
    return { sheet, scale, pos, toMm, margin, tbH };
  }

  // Model point (u,v) in a view -> sheet mm.
  mapper(L, name) {
    const v = this.cache.views[name], p = L.pos[name];
    if (!v || !p || v.error) return null;
    const s = (p.s || L.scale) * L.toMm;
    const b = v.bounds;
    // View coordinates have y pointing down, like the sheet.
    return { s, x: (u) => p.x + (u - b[0][0]) * s, y: (w) => p.yb - (b[1][1] - w) * s };
  }

  // ----- drawing the sheet -----
  render() {
    if (!this.cache) return;
    const d = this.d, L = this.layout(), { sheet } = L;
    this.L = L;
    const u = this.units();
    const dec = d.decimals ?? 2;
    const num = (v) => { const f = Math.pow(10, dec); return String(Math.round(v * f) / f); };
    let g = '';
    // Border and title block.
    g += `<rect x="${L.margin}" y="${L.margin}" width="${sheet.w - 2 * L.margin}" height="${sheet.h - 2 * L.margin}" class="frame"/>`;
    const tbW = Math.min(170, sheet.w - 2 * L.margin), tbX = sheet.w - L.margin - tbW, tbY = sheet.h - L.margin - L.tbH;
    const r = this.root, t = d.title;
    const mat = r.kind === 'assembly' ? 'See parts list' : ((this.app.materials[r.material] || {}).name || '');
    g += `<g class="tb"><rect x="${tbX}" y="${tbY}" width="${tbW}" height="${L.tbH}"/>`;
    const col = [tbX, tbX + tbW * 0.5, tbX + tbW * 0.75, tbX + tbW];
    const row = [tbY, tbY + 12, tbY + 22, tbY + L.tbH];
    g += `<line x1="${tbX}" y1="${row[1]}" x2="${tbX + tbW}" y2="${row[1]}"/><line x1="${tbX}" y1="${row[2]}" x2="${tbX + tbW}" y2="${row[2]}"/>`;
    g += `<line x1="${col[1]}" y1="${row[1]}" x2="${col[1]}" y2="${row[3]}"/><line x1="${col[2]}" y1="${row[1]}" x2="${col[2]}" y2="${row[3]}"/>`;
    const cell = (x, y, label, val, big) => `<text x="${x + 1.5}" y="${y + 3}" class="tbl">${esc(label)}</text><text x="${x + 1.5}" y="${y + (big ? 9.5 : 8.3)}" class="${big ? 'tbbig' : 'tbv'}">${esc(val)}</text>`;
    g += `<image href="assets/icon-256.png" x="${tbX + tbW - 11}" y="${tbY + 1}" width="10" height="10"/>`;
    g += cell(tbX, row[0], 'TITLE', r.name || '', true);
    g += `<text x="${tbX + tbW - 12.5}" y="${tbY + 8.5}" class="tbv" text-anchor="end">${esc(t.school || 'Pathway CAD')}</text>`;
    g += cell(col[0], row[1], 'DRAWN BY', t.drawnBy) + cell(col[1], row[1], 'DATE', t.date) + cell(col[2], row[1], 'SCALE', scaleText(L.scale));
    g += cell(col[0], row[2], 'MATERIAL', mat) + cell(col[1], row[2], 'UNITS', u === 'in' ? 'INCHES' : 'MILLIMETRES') + cell(col[2], row[2], 'PART / SHEET', (t.partNo || '—') + ' · ' + (d.sheet));
    if (t.course) g += `<text x="${tbX + 1.5}" y="${tbY - 2}" class="tbl">${esc(t.course)}</text>`;
    g += `</g>`;
    // Projection symbol.
    g += this.projSymbol(tbX - 22, tbY + 6, d.projection);
    // Views.
    for (const name of Object.keys(VIEW_NAMES)) {
      if (!d.views[name]) continue;
      const v = this.cache.views[name], m = this.mapper(L, name);
      if (!v || !m) continue;
      const b = v.bounds;
      const tr = `translate(${m.x(0)} ${m.y(0)}) scale(${m.s})`;
      g += `<g class="view" data-view="${name}">`;
      if (d.hidden && name !== 'iso') g += `<g transform="${tr}" class="hid" style="stroke-width:${0.25 / m.s};stroke-dasharray:${2 / m.s} ${1.2 / m.s}">${v.hidden.map((pth) => `<path d="${pth}"/>`).join('')}</g>`;
      g += `<g transform="${tr}" class="vis" style="stroke-width:${0.5 / m.s}">${v.visible.map((pth) => `<path d="${pth}"/>`).join('')}</g>`;
      g += `<text x="${m.x((b[0][0] + b[1][0]) / 2)}" y="${m.y(b[1][1]) + (name === 'iso' ? 6 : 15)}" class="vlabel">${VIEW_NAMES[name]}${name === 'iso' ? '' : ''}</text>`;
      if (name === 'front' || name === 'top' || name === 'right') {
        // Center marks on round holes seen face-on.
        for (const c of v.circles) {
          const cx = m.x(c.c[0]), cy = m.y(c.c[1]), rr = c.r * m.s + 1.2;
          g += `<path class="ctr" d="M${cx - rr} ${cy}H${cx + rr}M${cx} ${cy - rr}V${cy + rr}"/>`;
        }
      }
      g += `</g>`;
    }
    // Automatic sizes and hole notes.
    if (d.autoDims) g += this.autoDims(L, num, u);
    if (d.holeNotes) g += this.holeNotes(L, num);
    // User sizes and notes.
    for (const dm of d.dims) g += this.dimSvg(L, dm, num, this.sel === dm.id);
    for (const n of d.notes) g += `<text x="${n.x}" y="${n.y}" class="note${this.sel === n.id ? ' sel' : ''}" data-id="${n.id}">${n.text.split('\n').map((ln, i) => `<tspan x="${n.x}" dy="${i ? 4.2 : 0}">${esc(ln)}</tspan>`).join('')}</text>`;
    // Parts list for assemblies.
    if (r.kind === 'assembly') g += this.partsTable(L, tbX, tbY);
    // Picks in progress.
    for (const p of this.picks) if (p.sheet) g += `<circle cx="${p.sheet[0]}" cy="${p.sheet[1]}" r="1" class="pick"/>`;
    if (this.snapPt) g += `<circle cx="${this.snapPt[0]}" cy="${this.snapPt[1]}" r="1.3" class="snap"/>`;

    const svg = `<svg id="sheetSvg" xmlns="${SVGNS}" viewBox="0 0 ${sheet.w} ${sheet.h}" width="${sheet.w}mm" height="${sheet.h}mm"><defs><marker id="arr" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="3" markerHeight="3" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 1.5L10 5L0 8.5z" fill="#111"/></marker></defs><style>${SHEET_CSS}</style><rect width="100%" height="100%" fill="#fff"/>${g}</svg>`;
    const scroll = this.el.querySelector('.sheetScroll');
    const keep = scroll ? [scroll.scrollLeft, scroll.scrollTop] : null;
    this.el.innerHTML = `<div class="sheetScroll"><div class="sheetPad">${svg}</div></div><div class="drawZoom"><button data-z="-">−</button><span>${Math.round(this.zoom * 100)}%</span><button data-z="+">+</button><button data-z="fit">Fit</button></div>`;
    if (this.fitZoom) { this.fitZoom = false; this.fit(); } else this.applyZoom();
    const sc = this.el.querySelector('.sheetScroll');
    if (keep) { sc.scrollLeft = keep[0]; sc.scrollTop = keep[1]; }
    for (const b of this.el.querySelectorAll('[data-z]')) b.onclick = () => { const z = b.dataset.z; if (z === 'fit') this.fit(); else { this.zoom = Math.max(0.3, Math.min(6, this.zoom * (z === '+' ? 1.25 : 0.8))); this.applyZoom(); } };
    sc.onwheel = (e) => { if (!e.ctrlKey && !e.metaKey && !e.altKey) return; e.preventDefault(); this.zoom = Math.max(0.3, Math.min(6, this.zoom * (e.deltaY < 0 ? 1.1 : 0.9))); this.applyZoom(); };
    const svgEl = $('#sheetSvg');
    svgEl.addEventListener('pointermove', (e) => this.onMove(e));
    svgEl.addEventListener('click', (e) => this.onClick(e));
  }
  fit() {
    const sc = this.el.querySelector('.sheetScroll');
    if (!sc) return;
    const sheet = this.L.sheet;
    const pxPerMm = 96 / 25.4;
    this.zoom = Math.min((sc.clientWidth - 360) / (sheet.w * pxPerMm), (sc.clientHeight - 48) / (sheet.h * pxPerMm));
    this.applyZoom();
  }
  applyZoom() {
    const svg = $('#sheetSvg');
    if (!svg) return;
    const s = this.L.sheet, k = (96 / 25.4) * this.zoom;
    svg.style.width = s.w * k + 'px';
    svg.style.height = s.h * k + 'px';
    const lab = this.el.querySelector('.drawZoom span');
    if (lab) lab.textContent = Math.round(this.zoom * 100) + '%';
  }

  projSymbol(x, y, proj) {
    // Truncated cone symbol: third angle = cone on the left, circles on the right.
    const cone = (cx) => `<path d="M${cx - 5} ${y - 3}L${cx + 5} ${y - 5}V${y + 5}L${cx - 5} ${y + 3}Z" class="sym"/><path d="M${cx - 7} ${y}H${cx + 7}" class="ctr"/>`;
    const circ = (cx) => `<circle cx="${cx}" cy="${y}" r="5" class="sym"/><circle cx="${cx}" cy="${y}" r="3" class="sym"/><path d="M${cx - 7} ${y}H${cx + 7}M${cx} ${y - 7}V${y + 7}" class="ctr"/>`;
    return proj === 'first' ? circ(x - 8) + cone(x + 8) : cone(x - 8) + circ(x + 8);
  }

  // Overall sizes on the main views.
  autoDims(L, num, u) {
    let g = '';
    const V = this.cache.views, d = this.d;
    const dimOn = (name, kind) => {
      const v = V[name], m = this.mapper(L, name);
      if (!v || !m || !d.views[name]) return;
      const b = v.bounds;
      if (kind === 'w') g += this.dimSvg(L, { view: name, a: [b[0][0], b[1][1]], b: [b[1][0], b[1][1]], kind: 'h', off: 9 / m.s, auto: true }, num);
      if (kind === 'h') g += this.dimSvg(L, { view: name, a: [b[0][0], b[0][1]], b: [b[0][0], b[1][1]], kind: 'v', off: -9 / m.s, auto: true }, num);
    };
    dimOn('front', 'w'); dimOn('front', 'h');
    if (d.views.right) dimOn('right', 'w'); else if (d.views.top) dimOn('top', 'h');
    return g;
  }
  holeNotes(L, num) {
    let g = '';
    const V = this.cache.views;
    for (const name of ['front', 'top', 'right']) {
      const v = V[name], m = this.mapper(L, name);
      if (!v || !m || !this.d.views[name]) continue;
      // Rims with the same center are one hole (e.g. a counterbore); then group equal holes: "3× Ø6".
      const holes = [];
      for (const c of v.circles) {
        const h = holes.find((q) => Math.hypot(q.c[0] - c.c[0], q.c[1] - c.c[1]) < 1e-4);
        if (h) h.r.push(c.r); else holes.push({ c: c.c, r: [c.r] });
      }
      const groups = new Map();
      for (const h of holes) {
        // Smallest rim is the hole; a second rim up to twice as wide is a counterbore.
        const sizes = [...new Set(h.r.map((x) => +num(2 * x)))].sort((x, y) => x - y);
        const cb = sizes.find((x) => x > sizes[0] && x <= sizes[0] * 2);
        h.r = cb ? [sizes[0] / 2, cb / 2] : [sizes[0] / 2];
        const text = 'Ø' + sizes[0] + (cb ? ', CBORE Ø' + cb : '');
        if (!groups.has(text)) groups.set(text, []);
        groups.get(text).push(h);
      }
      for (const [text, list] of groups) {
        const h = list[0];
        const big = Math.max(...h.r);
        const cx = m.x(h.c[0]), cy = m.y(h.c[1]), rr = Math.min(...h.r) * m.s;
        const ex = cx + rr * 0.7071, ey = cy - rr * 0.7071, tx = cx + big * m.s * 0.7071 + 6, ty = cy - big * m.s * 0.7071 - 6;
        g += `<path class="dimln" d="M${tx + 2} ${ty}H${tx}L${ex} ${ey}" marker-end="url(#arr)"/><text x="${tx + 2.5}" y="${ty + 1.1}" class="dimtx" text-anchor="start">${list.length > 1 ? list.length + '× ' : ''}${text}</text>`;
      }
    }
    return g;
  }

  // A linear size: a, b are model points in a view; kind h (left-right), v (up-down) or a (aligned).
  dimSvg(L, dm, num, sel) {
    const m = this.mapper(L, dm.view);
    if (!m) return '';
    const A = [m.x(dm.a[0]), m.y(dm.a[1])], B = [m.x(dm.b[0]), m.y(dm.b[1])];
    let val, p1, p2, e1, e2;
    const off = dm.off * m.s;
    if (dm.kind === 'h') {
      val = Math.abs(dm.b[0] - dm.a[0]);
      const y = Math.max(A[1], B[1]) + off * (off >= 0 ? 1 : 1);
      const yy = dm.off >= 0 ? Math.max(A[1], B[1]) + off : Math.min(A[1], B[1]) + off;
      void y;
      p1 = [A[0], yy]; p2 = [B[0], yy]; e1 = A; e2 = B;
    } else if (dm.kind === 'v') {
      val = Math.abs(dm.b[1] - dm.a[1]);
      const xx = dm.off >= 0 ? Math.max(A[0], B[0]) + off : Math.min(A[0], B[0]) + off;
      p1 = [xx, A[1]]; p2 = [xx, B[1]]; e1 = A; e2 = B;
    } else {
      val = Math.hypot(dm.b[0] - dm.a[0], dm.b[1] - dm.a[1]);
      const dx = B[0] - A[0], dy = B[1] - A[1], l = Math.hypot(dx, dy) || 1;
      const nx = -dy / l, ny = dx / l;
      p1 = [A[0] + nx * off, A[1] + ny * off]; p2 = [B[0] + nx * off, B[1] + ny * off]; e1 = A; e2 = B;
    }
    if (val < 1e-9) return '';
    const ext = (e, p) => { const dx = p[0] - e[0], dy = p[1] - e[1], l = Math.hypot(dx, dy); if (l < 0.5) return ''; const k = (l + 1.5) / l, s0 = 1 / l; return `<path class="ext" d="M${e[0] + dx * s0} ${e[1] + dy * s0}L${e[0] + dx * k} ${e[1] + dy * k}"/>`; };
    const mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
    const ang = (Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180) / Math.PI;
    const rot = ang > 90 || ang < -90 ? ang + 180 : ang;
    const text = (dm.prefix || '') + num(val);
    const cls = 'sdim' + (sel ? ' sel' : '') + (dm.auto ? ' auto' : '');
    return `<g class="${cls}" ${dm.id ? `data-id="${dm.id}"` : ''}>${ext(e1, p1)}${ext(e2, p2)}<path class="dimln" d="M${p1[0]} ${p1[1]}L${p2[0]} ${p2[1]}" marker-start="url(#arr)" marker-end="url(#arr)"/><text class="dimtx" transform="translate(${mx} ${my}) rotate(${rot})" y="-1">${esc(text)}</text>${dm.id ? `<path class="hit" d="M${p1[0]} ${p1[1]}L${p2[0]} ${p2[1]}"/>` : ''}</g>`;
  }

  partsTable(L, tbX, tbY) {
    const A = this.root;
    const rows = new Map();
    for (const c of A.components) { const r0 = rows.get(c.part) || { pid: c.part, qty: 0 }; r0.qty++; rows.set(c.part, r0); }
    const list = [...rows.values()];
    const w = Math.min(120, L.sheet.w - 2 * L.margin), x = L.sheet.w - L.margin - w, rh = 5;
    const h = rh * (list.length + 1);
    const y = tbY - h - (this.d.title.course ? 5 : 1);
    let g = `<g class="tb"><rect x="${x}" y="${y}" width="${w}" height="${h}"/>`;
    g += `<text x="${x + 1.5}" y="${y + 3.6}" class="tbl">ITEM</text><text x="${x + 12}" y="${y + 3.6}" class="tbl">PART</text><text x="${x + w - 30}" y="${y + 3.6}" class="tbl">MATERIAL</text><text x="${x + w - 2}" y="${y + 3.6}" class="tbl" text-anchor="end">QTY</text>`;
    list.forEach((r0, i) => {
      const yy = y + rh * (i + 1);
      const p = A.parts[r0.pid];
      g += `<line x1="${x}" y1="${yy}" x2="${x + w}" y2="${yy}"/><text x="${x + 1.5}" y="${yy + 3.6}" class="tbv">${i + 1}</text><text x="${x + 12}" y="${yy + 3.6}" class="tbv">${esc(p.name)}</text><text x="${x + w - 30}" y="${yy + 3.6}" class="tbv">${esc(((this.app.materials[p.material] || {}).name || '').split(' (')[0])}</text><text x="${x + w - 2}" y="${yy + 3.6}" class="tbv" text-anchor="end">${r0.qty}</text>`;
    });
    return g + `<line x1="${x + 10}" y1="${y}" x2="${x + 10}" y2="${y + h}"/><line x1="${x + w - 31.5}" y1="${y}" x2="${x + w - 31.5}" y2="${y + h}"/><line x1="${x + w - 10}" y1="${y}" x2="${x + w - 10}" y2="${y + h}"/></g>`;
  }

  // ----- mouse on the sheet -----
  sheetPoint(e) {
    const svg = $('#sheetSvg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return [p.x, p.y];
  }
  // Nearest corner / end / hole center in any view (sheet mm), within 3 mm.
  snapAt(P) {
    let best = null, bd = 3;
    for (const name of ['front', 'top', 'right']) {
      const v = this.cache.views[name], m = this.mapper(this.L, name);
      if (!v || !m || !this.d.views[name]) continue;
      const pts = [];
      for (const pth of v.visible.concat(this.d.hidden ? v.hidden : [])) {
        const nums = pth.match(/-?\d*\.?\d+(e-?\d+)?/gi);
        const cmds = pth.match(/[MLAZHVC]/gi) || [];
        // Pick the end point of each M/L/A command.
        let i = 0;
        for (const c of cmds) {
          const C = c.toUpperCase();
          if (C === 'M' || C === 'L') { pts.push([+nums[i], +nums[i + 1]]); i += 2; }
          else if (C === 'A') { pts.push([+nums[i + 5], +nums[i + 6]]); i += 7; }
          else if (C === 'C') { pts.push([+nums[i + 4], +nums[i + 5]]); i += 6; }
          else if (C === 'H' || C === 'V') i += 1;
        }
      }
      for (const c of v.circles) pts.push(c.c);
      for (const q of pts) {
        const X = m.x(q[0]), Y = m.y(q[1]);
        const dd = Math.hypot(X - P[0], Y - P[1]);
        if (dd < bd) { bd = dd; best = { view: name, model: q, sheet: [X, Y] }; }
      }
    }
    return best;
  }
  onMove(e) {
    if (this.tool !== 'dim') { if (this.snapPt) { this.snapPt = null; this.render(); } return; }
    const P = this.sheetPoint(e);
    const s = this.picks.length < 2 ? this.snapAt(P) : null;
    const key = s ? s.sheet.join() : '';
    if (key !== (this.snapPt ? this.snapPt.join() : '')) { this.snapPt = s ? s.sheet : null; this.render(); }
  }
  onClick(e) {
    const P = this.sheetPoint(e);
    if (this.tool === 'select') {
      const hit = e.target.closest('[data-id]');
      this.sel = hit ? hit.dataset.id : null;
      this.render();
      this.app.ui.renderDrawPanel();
      return;
    }
    if (this.tool === 'note') {
      this.app.ui.askText('Note text', '', (text) => {
        this.app.change(() => this.d.notes.push({ id: 'n' + Date.now(), x: Math.round(P[0] * 10) / 10, y: Math.round(P[1] * 10) / 10, text }));
      });
      this.setTool('select');
      return;
    }
    if (this.tool === 'dim') {
      if (this.picks.length < 2) {
        const s = this.snapAt(P);
        if (!s) return this.app.toast('Click on a corner, line end or hole center.', 'error');
        if (this.picks.length === 1 && s.view !== this.picks[0].view) return this.app.toast('Pick both points in the same view.', 'error');
        this.picks.push(s);
        this.render();
        this.app.ui.renderDrawPanel();
        return;
      }
      // Third click places the size: above/below = left-right size, beside = up-down size.
      const [a, b] = this.picks;
      const m = this.mapper(this.L, a.view);
      const midX = (a.sheet[0] + b.sheet[0]) / 2, midY = (a.sheet[1] + b.sheet[1]) / 2;
      const dx = P[0] - midX, dy = P[1] - midY;
      let kind = Math.abs(dy) >= Math.abs(dx) ? 'h' : 'v';
      if (e.shiftKey) kind = 'a';
      let off;
      if (kind === 'h') off = (P[1] - (dy >= 0 ? Math.max(a.sheet[1], b.sheet[1]) : Math.min(a.sheet[1], b.sheet[1]))) / m.s;
      else if (kind === 'v') off = (P[0] - (dx >= 0 ? Math.max(a.sheet[0], b.sheet[0]) : Math.min(a.sheet[0], b.sheet[0]))) / m.s;
      else {
        const ddx = b.sheet[0] - a.sheet[0], ddy = b.sheet[1] - a.sheet[1], l = Math.hypot(ddx, ddy) || 1;
        off = ((P[0] - a.sheet[0]) * (-ddy / l) + (P[1] - a.sheet[1]) * (ddx / l)) / m.s;
      }
      if (kind === 'h' && Math.abs(a.model[0] - b.model[0]) < 1e-9) kind = 'v';
      if (kind === 'v' && Math.abs(a.model[1] - b.model[1]) < 1e-9) kind = 'h';
      this.picks = [];
      this.app.change(() => this.d.dims.push({ id: 'd' + Date.now(), view: a.view, a: a.model, b: b.model, kind, off }));
      return;
    }
  }
  setTool(t) {
    this.tool = t;
    this.picks = [];
    this.snapPt = null;
    this.app.status({ select: 'Click a size or note to pick it. Delete removes it.', dim: 'Size: click two points in a view, then click where the size line goes (hold Shift for a slanted size).', note: 'Note: click where the text goes.' }[t]);
    this.app.ui.renderRibbon();
    this.render();
    this.app.ui.renderDrawPanel();
  }
  deleteSel() {
    if (!this.sel) return;
    const id = this.sel;
    this.app.change(() => { this.d.dims = this.d.dims.filter((x) => x.id !== id); this.d.notes = this.d.notes.filter((x) => x.id !== id); });
    this.sel = null;
  }

  // ----- output -----
  svgText() {
    const svg = $('#sheetSvg');
    if (!svg) return '';
    const c = svg.cloneNode(true);
    c.removeAttribute('style');
    // Inline the logo so the file stands alone.
    const img = c.querySelector('image');
    if (img && this._logoData) img.setAttribute('href', this._logoData);
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + c.outerHTML;
  }
  async loadLogo() {
    if (this._logoData) return;
    try {
      const b = await (await fetch('assets/icon-256.png')).blob();
      this._logoData = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); });
    } catch { /* leave the logo link */ }
  }
  async saveSvg() {
    await this.loadLogo();
    this.app.download(this.app.safeName() + ' drawing.svg', this.svgText(), 'image/svg+xml');
  }
  print() {
    const sheet = this.L.sheet;
    let st = $('#pageStyle');
    if (!st) { st = document.createElement('style'); st.id = 'pageStyle'; document.head.appendChild(st); }
    st.textContent = `@page { size: ${sheet.w}mm ${sheet.h}mm; margin: 0; }`;
    const holder = $('#printSheet');
    holder.innerHTML = $('#sheetSvg').outerHTML;
    const s = holder.querySelector('svg');
    s.removeAttribute('id');
    s.style.width = sheet.w + 'mm';
    s.style.height = sheet.h - 0.5 + 'mm';
    holder.style.width = sheet.w + 'mm';
    holder.style.height = sheet.h - 0.5 + 'mm';
    document.body.classList.add('printing');
    setTimeout(() => { window.print(); document.body.classList.remove('printing'); }, 50);
  }
}

const SHEET_CSS = `
.frame{fill:none;stroke:#111;stroke-width:.6}
.tb rect,.tb line{fill:none;stroke:#111;stroke-width:.35}
.tbl{font:1.9px Arial,sans-serif;fill:#555}
.tbv{font:3.1px Arial,sans-serif;fill:#111}
.tbbig{font:bold 4.6px Arial,sans-serif;fill:#111}
.vis path{fill:none;stroke:#111;stroke-linecap:round;stroke-linejoin:round}
.hid path{fill:none;stroke:#666}
.ctr{fill:none;stroke:#888;stroke-width:.2;stroke-dasharray:3 .8 .6 .8}
.sym{fill:none;stroke:#111;stroke-width:.3}
.vlabel{font:bold 2.8px Arial,sans-serif;fill:#333;text-anchor:middle;letter-spacing:.3px}
.dimln{fill:none;stroke:#111;stroke-width:.22}
.ext{fill:none;stroke:#111;stroke-width:.18}
.dimtx{font:3px Arial,sans-serif;fill:#111;text-anchor:middle}
.sdim .hit{stroke:transparent;stroke-width:3;fill:none;cursor:pointer}
.sdim.sel .dimln,.sdim.sel .ext{stroke:#e86a00}
.sdim.sel .dimtx{fill:#e86a00}
.note{font:3.1px Arial,sans-serif;fill:#111;cursor:pointer}
.note.sel{fill:#e86a00}
.pick{fill:#e86a00}
.snap{fill:none;stroke:#0596bd;stroke-width:.5}
`;
