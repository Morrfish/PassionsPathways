// The sketch board: front and back drawing areas, each with three layers
//   color - fabric and color fills (what the garment looks like)
//   mat   - hidden layer telling 3D how shiny/metallic each spot is (G = roughness, B = metalness)
//   lines - the drawing's outlines, always on top
import { fabricTiles, tileCanvas, TILE } from './fabrics.js';
import { dilate } from './imageproc.js';

export const BW = 1024, BH = 1536;
const mk = (w = BW, h = BH) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };

export class Board {
  constructor(canvas) {
    this.el = canvas;
    this.ctx = canvas.getContext('2d');
    const sideLayers = () => { const L = { color: mk(), mat: mk(), lines: mk() }; L.cx = Object.fromEntries(['color', 'mat', 'lines'].map((n) => [n, L[n].getContext('2d', { willReadFrequently: true })])); return L; };
    // The back is drawn as seen from behind. Until it is edited it mirrors the front.
    this.sides = { front: sideLayers(), back: sideLayers() };
    this.backLinked = true;
    this.useSide('front');
    this.texF = mk(); this.texB = mk(); this.atlas = mk(BW * 2, BH); this.atlasMat = mk(BW * 2, BH);
    this.guides = { front: null, back: null }; this.guideOpacity = 0.55; this.showGuide = true;
    this.tool = 'fill';
    this.paint = { color: '#b07a74', fabric: 'satin', scale: 0.7 };
    this.brushSize = 14; this.gap = 2; this.eraseTarget = 'color';
    this.view = { s: 0.5, x: 0, y: 0 };
    this.undoStack = []; this.redoStack = [];
    this.fillFabric = {}; // fill id -> fabric id
    this.pointers = new Map();
    this.place = null;
    this.hover = null;
    this.onChange = () => {}; this.onPick = () => {}; this.onHistory = () => {}; this.onToast = () => {};
    this.dirty = true;
    this.bind();
    new ResizeObserver(() => { this.resize(); }).observe(canvas.parentElement);
    const loop = () => { requestAnimationFrame(loop); if (this.dirty && this.el.offsetParent) { this.dirty = false; this.render(); } };
    loop();
  }

  get guide() { return this.guides[this.side]; }
  useSide(name) { const L = this.sides[name]; this.side = name; this.color = L.color; this.mat = L.mat; this.lines = L.lines; this.cx = L.cx; this.dirty = true; }
  // Copy the front, mirrored, onto the back (what the back looks like while it matches the front).
  mirrorFrontToBack() {
    const F = this.sides.front, B = this.sides.back;
    for (const n of ['color', 'mat', 'lines']) { const c = B.cx[n]; c.save(); c.setTransform(-1, 0, 0, 1, BW, 0); c.globalCompositeOperation = 'copy'; c.drawImage(F[n], 0, 0); c.restore(); }
  }
  setSide(name) {
    if (name === this.side) return;
    if (this.place) this.cancelPlace();
    if (name === 'back' && this.backLinked) this.mirrorFrontToBack();
    this.useSide(name);
  }
  // Make the back match the front again.
  linkBack() { this.backLinked = true; this.mirrorFrontToBack(); this.undoStack = this.undoStack.filter((e) => e.side !== 'back'); this.redoStack = []; this.changed(); }
  resize() {
    const p = this.el.parentElement, dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = p.clientWidth, h = p.clientHeight; if (!w || !h) return;
    const first = !this.sized;
    this.el.width = Math.round(w * dpr); this.el.height = Math.round(h * dpr);
    this.el.style.width = w + 'px'; this.el.style.height = h + 'px';
    this.dpr = dpr; this.sized = true;
    if (first || !this.userView) this.fit();
    this.dirty = true;
  }
  fit() {
    const p = this.el.parentElement, w = p.clientWidth, h = p.clientHeight;
    const s = Math.min((w - 32) / BW, (h - 32) / BH);
    this.view = { s, x: (w - BW * s) / 2, y: (h - BH * s) / 2 }; this.userView = false;
    this.dirty = true;
  }
  zoomBy(f, cx, cy) {
    const v = this.view, p = this.el.parentElement;
    if (cx === undefined) { cx = p.clientWidth / 2; cy = p.clientHeight / 2; }
    this.userView = true;
    const ns = Math.max(0.1, Math.min(8, v.s * f)), k = ns / v.s;
    this.view = { s: ns, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k };
    this.dirty = true;
  }
  toBoard(clientX, clientY) {
    const r = this.el.getBoundingClientRect(), v = this.view;
    return [(clientX - r.left - v.x) / v.s, (clientY - r.top - v.y) / v.s];
  }

  render() {
    const ctx = this.ctx, v = this.view, d = this.dpr || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.el.width, this.el.height);
    ctx.setTransform(d * v.s, 0, 0, d * v.s, d * v.x, d * v.y);
    ctx.shadowColor = 'rgba(60,40,30,0.18)'; ctx.shadowBlur = 24 / v.s * 0.5; ctx.shadowOffsetY = 4 / v.s;
    ctx.fillStyle = '#fffdfa'; ctx.fillRect(0, 0, BW, BH);
    ctx.shadowColor = 'transparent';
    ctx.imageSmoothingEnabled = v.s < 2;
    if (this.guide && this.showGuide) { ctx.globalAlpha = this.guideOpacity; ctx.drawImage(this.guide, 0, 0, BW, BH); ctx.globalAlpha = 1; }
    ctx.drawImage(this.color, 0, 0);
    ctx.drawImage(this.lines, 0, 0);
    if (this.place) {
      const p = this.place, w = p.w * p.s, h = p.h * p.s;
      ctx.globalAlpha = 0.9;
      if (p.color) ctx.drawImage(p.color, p.x, p.y, w, h);
      ctx.drawImage(p.lines, p.x, p.y, w, h);
      ctx.globalAlpha = 1;
      ctx.lineWidth = 2 / v.s; ctx.setLineDash([8 / v.s, 6 / v.s]); ctx.strokeStyle = '#b4466e'; ctx.strokeRect(p.x, p.y, w, h); ctx.setLineDash([]);
      const hs = 14 / v.s; ctx.fillStyle = '#b4466e';
      for (const [hx, hy] of [[p.x, p.y], [p.x + w, p.y], [p.x, p.y + h], [p.x + w, p.y + h]]) { ctx.beginPath(); ctx.arc(hx, hy, hs, 0, Math.PI * 2); ctx.fill(); }
    }
    if (this.hover && ['brush', 'pen', 'eraser'].includes(this.tool) && !this.place) {
      ctx.beginPath(); ctx.arc(this.hover[0], this.hover[1], this.toolWidth(0.6) / 2, 0, Math.PI * 2);
      ctx.lineWidth = 1.5 / v.s; ctx.strokeStyle = 'rgba(80,60,70,0.7)'; ctx.stroke();
    }
  }

  // ---------- input ----------
  bind() {
    const el = this.el;
    el.addEventListener('pointerdown', (e) => this.down(e));
    el.addEventListener('pointermove', (e) => this.move(e));
    el.addEventListener('pointerup', (e) => this.up(e));
    el.addEventListener('pointercancel', (e) => this.up(e, true));
    el.addEventListener('pointerleave', () => { this.hover = null; this.dirty = true; });
    el.addEventListener('wheel', (e) => {
      e.preventDefault(); const r = el.getBoundingClientRect();
      if (this.place && !e.ctrlKey) { this.scalePlace(Math.exp(-e.deltaY * 0.0015)); return; }
      if (e.shiftKey) { this.view.x -= e.deltaX || e.deltaY; this.view.y -= e.deltaX ? e.deltaY : 0; this.dirty = true; }
      else this.zoomBy(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015)), e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  down(e) {
    this.el.setPointerCapture(e.pointerId);
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 2) { this.cancelStroke(); this.gesture = this.gestureStart(); return; }
    if (this.pointers.size > 2) return;
    const [bx, by] = this.toBoard(e.clientX, e.clientY);
    if (e.button === 1 || e.button === 2 || this.tool === 'pan' || this.spaceDown) { this.panning = { x: e.clientX, y: e.clientY }; return; }
    if (this.place) { this.placeDown(bx, by); return; }
    if (this.tool === 'fill' || this.tool === 'clear') { this.pendingTap = { bx, by, x: e.clientX, y: e.clientY, t: performance.now() }; return; }
    if (this.tool === 'picker') { this.pickAt(bx, by); return; }
    this.startStroke(bx, by, e);
  }
  move(e) {
    const p = this.pointers.get(e.pointerId);
    const [bx, by] = this.toBoard(e.clientX, e.clientY);
    if (e.pointerType !== 'touch') { this.hover = [bx, by]; this.dirty = true; }
    if (!p) return;
    p.x = e.clientX; p.y = e.clientY;
    if (this.gesture) { this.gestureMove(); return; }
    if (this.panning) { this.view.x += e.clientX - this.panning.x; this.view.y += e.clientY - this.panning.y; this.panning = { x: e.clientX, y: e.clientY }; this.dirty = true; return; }
    if (this.placeDrag) { this.placeMove(bx, by); return; }
    if (this.pendingTap && Math.hypot(e.clientX - this.pendingTap.x, e.clientY - this.pendingTap.y) > 8) {
      // Dragging with the fill tool pans the board.
      this.panning = { x: e.clientX, y: e.clientY }; this.pendingTap = null; return;
    }
    if (this.stroke) {
      const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      for (const ce of evs) { const [x, y] = this.toBoard(ce.clientX, ce.clientY); this.strokeTo(x, y, ce.pressure); }
    }
  }
  up(e, cancelled) {
    this.pointers.delete(e.pointerId);
    if (this.gesture) { if (this.pointers.size < 2) this.gesture = null; return; }
    this.panning = null; this.placeDrag = null;
    if (this.pendingTap && !cancelled) { const t = this.pendingTap; this.pendingTap = null; if (this.tool === 'clear') this.fillAt(t.bx, t.by, { erase: true }); else this.fillAt(t.bx, t.by); }
    this.pendingTap = null;
    if (this.stroke) this.endStroke();
  }
  gestureStart() {
    const [a, b] = [...this.pointers.values()];
    return { d: Math.hypot(a.x - b.x, a.y - b.y), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2, view: { ...this.view }, place: this.place ? { ...this.place } : null };
  }
  gestureMove() {
    const g = this.gesture, [a, b] = [...this.pointers.values()], r = this.el.getBoundingClientRect();
    const d = Math.hypot(a.x - b.x, a.y - b.y), cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2, k = d / g.d;
    if (g.place && this.place) {
      const p = g.place, ccx = p.x + p.w * p.s / 2, ccy = p.y + p.h * p.s / 2, ns = p.s * k;
      this.place.s = ns; this.place.x = ccx - p.w * ns / 2 + (cx - g.cx) / this.view.s; this.place.y = ccy - p.h * ns / 2 + (cy - g.cy) / this.view.s;
    } else {
      const ns = Math.max(0.1, Math.min(8, g.view.s * k)), kk = ns / g.view.s;
      const ox = g.cx - r.left, oy = g.cy - r.top;
      this.view = { s: ns, x: ox - (ox - g.view.x) * kk + (cx - g.cx), y: oy - (oy - g.view.y) * kk + (cy - g.cy) };
      this.userView = true;
    }
    this.dirty = true;
  }

  // ---------- history ----------
  begin(names) {
    // The first change on the back makes it its own drawing.
    if (this.side === 'back' && this.backLinked) { this.mirrorFrontToBack(); this.backLinked = false; }
    this.snap = { names, data: Object.fromEntries(names.map((n) => [n, this.cx[n].getImageData(0, 0, BW, BH)])) }; }
  commit(rect) {
    const s = this.snap; this.snap = null; if (!s || !rect) return;
    const x = Math.max(0, Math.floor(rect.x0)), y = Math.max(0, Math.floor(rect.y0)), w = Math.min(BW, Math.ceil(rect.x1) + 1) - x, h = Math.min(BH, Math.ceil(rect.y1) + 1) - y;
    if (w <= 0 || h <= 0) return;
    const entry = { x, y, w, h, side: this.side, layers: {} };
    for (const n of s.names) {
      const before = new ImageData(w, h), src = s.data[n].data;
      for (let r = 0; r < h; r++) before.data.set(src.subarray(((y + r) * BW + x) * 4, ((y + r) * BW + x + w) * 4), r * w * 4);
      entry.layers[n] = { before, after: this.cx[n].getImageData(x, y, w, h) };
    }
    this.undoStack.push(entry); if (this.undoStack.length > 40) this.undoStack.shift();
    this.redoStack = [];
    this.changed();
  }
  undo() { const e = this.undoStack.pop(); if (!e) return; if (e.side !== this.side) this.setSide(e.side); for (const [n, l] of Object.entries(e.layers)) this.cx[n].putImageData(l.before, e.x, e.y); this.redoStack.push(e); this.changed(); }
  redo() { const e = this.redoStack.pop(); if (!e) return; if (e.side !== this.side) this.setSide(e.side); for (const [n, l] of Object.entries(e.layers)) this.cx[n].putImageData(l.after, e.x, e.y); this.undoStack.push(e); this.changed(); }
  changed() { this.dirty = true; this.onHistory(this.undoStack.length, this.redoStack.length); this.onChange(); }
  resetHistory() { this.undoStack = []; this.redoStack = []; this.onHistory(0, 0); }

  // ---------- brush / pen / eraser ----------
  toolWidth(pressure) {
    const base = this.tool === 'pen' ? Math.max(1.5, this.brushSize * 0.3) : this.brushSize;
    return base * (pressure > 0 && pressure !== 0.5 ? 0.3 + 0.9 * pressure : 1);
  }
  patternFor(which, id = 0) {
    const p = this.paint, tc = tileCanvas(p.fabric, p.color, which);
    if (which === 'mat' && id) { // stamp the fill id so 3D knows which fabric this is
      const x = tc.getContext('2d'), im = x.getImageData(0, 0, tc.width, tc.height);
      for (let i = 0; i < im.data.length; i += 4) im.data[i] = id;
      x.putImageData(im, 0, 0);
    }
    const pat = this.cx.color.createPattern(tc, 'repeat');
    pat.setTransform(new DOMMatrix([p.scale, 0, 0, p.scale, 0, 0]));
    return pat;
  }
  startStroke(x, y, e) {
    const names = this.tool === 'pen' ? ['lines'] : this.tool === 'eraser' ? (this.eraseTarget === 'lines' ? ['lines'] : this.eraseTarget === 'both' ? ['color', 'mat', 'lines'] : ['color', 'mat']) : ['color', 'mat'];
    this.begin(names);
    this.stroke = { names, last: [x, y], rect: { x0: x, y0: y, x1: x, y1: y }, pressure: e.pressure, pats: null };
    if (this.tool === 'brush') { const id = this.newFillId(); this.fillFabric[id] = this.paint.fabric; this.stroke.pats = { color: this.patternFor('color'), mat: this.patternFor('mat', id) }; }
    this.strokeTo(x, y, e.pressure, true);
  }
  strokeTo(x, y, pressure, first) {
    const s = this.stroke; if (!s) return;
    const w = this.toolWidth(pressure), [lx, ly] = s.last;
    for (const n of s.names) {
      const c = this.cx[n]; c.save(); c.lineCap = 'round'; c.lineJoin = 'round'; c.lineWidth = w;
      if (this.tool === 'eraser') c.globalCompositeOperation = 'destination-out', c.strokeStyle = '#000';
      else if (this.tool === 'pen') c.strokeStyle = '#1c181e';
      else c.strokeStyle = s.pats[n === 'mat' ? 'mat' : 'color'];
      c.beginPath(); c.moveTo(lx, ly); c.lineTo(first ? x + 0.01 : x, y); c.stroke(); c.restore();
    }
    s.last = [x, y];
    const r = s.rect, h = w / 2 + 2; r.x0 = Math.min(r.x0, x - h); r.y0 = Math.min(r.y0, y - h); r.x1 = Math.max(r.x1, x + h); r.y1 = Math.max(r.y1, y + h);
    this.dirty = true;
  }
  endStroke() { const s = this.stroke; this.stroke = null; if (s) this.commit(s.rect); }
  cancelStroke() {
    if (!this.stroke) return;
    const s = this.snap; this.stroke = null; this.snap = null;
    if (s) for (const n of s.names) this.cx[n].putImageData(s.data[n], 0, 0);
    this.dirty = true;
  }

  // ---------- fill ----------
  barrier(gap) {
    const d = this.cx.lines.getImageData(0, 0, BW, BH).data, b = new Uint8Array(BW * BH);
    for (let i = 0; i < BW * BH; i++) b[i] = d[i * 4 + 3] > 60 ? 1 : 0;
    return { raw: b, wall: gap > 0 ? dilate(b, BW, BH, gap) : b };
  }
  flood(wall, seeds) {
    const reg = new Uint8Array(BW * BH), stack = [];
    for (const s of seeds) if (!wall[s] && !reg[s]) { reg[s] = 1; stack.push(s); }
    while (stack.length) {
      const p = stack.pop(), y = (p / BW) | 0;
      let l = p; while (l % BW > 0 && !wall[l - 1] && !reg[l - 1]) { l--; reg[l] = 1; }
      let r = p; while (r % BW < BW - 1 && !wall[r + 1] && !reg[r + 1]) { r++; reg[r] = 1; }
      for (let q = l; q <= r; q++) {
        if (y > 0 && !wall[q - BW] && !reg[q - BW]) { reg[q - BW] = 1; stack.push(q - BW); }
        if (y < BH - 1 && !wall[q + BW] && !reg[q + BW]) { reg[q + BW] = 1; stack.push(q + BW); }
      }
    }
    return reg;
  }
  // Paint every pixel of `mask` with the current fabric (or clear it).
  newFillId() { this.fillId = (this.fillId || 0) % 254 + 1; return this.fillId; }
  paintMask(mask, erase) {
    const id = this.newFillId();
    if (!erase) this.fillFabric[id] = this.paint.fabric;
    const ci = this.cx.color.getImageData(0, 0, BW, BH), mi = this.cx.mat.getImageData(0, 0, BW, BH);
    const t = fabricTiles(this.paint.fabric, this.paint.color), k = 1 / this.paint.scale;
    let x0 = BW, y0 = BH, x1 = -1, y1 = -1;
    for (let y = 0; y < BH; y++) {
      const ty = (((y * k) | 0) % TILE) * TILE;
      for (let x = 0; x < BW; x++) {
        const i = y * BW + x; if (!mask[i]) continue;
        if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
        const o = i * 4;
        if (erase) { ci.data[o + 3] = 0; mi.data[o + 3] = 0; continue; }
        const s = (ty + (((x * k) | 0) % TILE)) * 4;
        ci.data[o] = t.color[s]; ci.data[o + 1] = t.color[s + 1]; ci.data[o + 2] = t.color[s + 2]; ci.data[o + 3] = t.color[s + 3];
        mi.data[o] = id; mi.data[o + 1] = t.mat[s + 1]; mi.data[o + 2] = t.mat[s + 2]; mi.data[o + 3] = 255;
      }
    }
    if (x1 < 0) return null;
    this.cx.color.putImageData(ci, 0, 0); this.cx.mat.putImageData(mi, 0, 0);
    return { x0, y0, x1, y1 };
  }
  fillAt(bx, by, { erase = false } = {}) {
    let x = Math.round(bx), y = Math.round(by);
    if (x < 0 || y < 0 || x >= BW || y >= BH) return false;
    const { raw, wall } = this.barrier(this.gap);
    // Tapped right on a line: look for the nearest open spot.
    if (wall[y * BW + x]) {
      let found = null;
      for (let r = 1; r < 14 && !found; r++) for (let dy = -r; dy <= r && !found; dy++) for (let dx = -r; dx <= r; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < BW && yy < BH && !wall[yy * BW + xx]) { found = [xx, yy]; break; } }
      if (!found) return false; [x, y] = found;
    }
    // Stay on the same side of the garment edge: tapping fabric only spreads through fabric,
    // tapping blank paper only through blank paper (stops leaks through gaps in a photo's outline).
    // On fabric, also stay inside the same fill (its id in the mat layer's red channel), or for
    // colors that came in with a photo, inside similar colors.
    const ca = this.cx.color.getImageData(0, 0, BW, BH).data, ma = this.cx.mat.getImageData(0, 0, BW, BH).data;
    const si = y * BW + x, seedOpaque = ca[si * 4 + 3] > 8, seedId = ma[si * 4];
    let sr = 0, sg = 0, sb = 0, sn = 0;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= BW || yy >= BH) continue; const o = (yy * BW + xx) * 4; if (ca[o + 3] > 8) { sr += ca[o]; sg += ca[o + 1]; sb += ca[o + 2]; sn++; } }
    if (sn) { sr /= sn; sg /= sn; sb /= sn; }
    const tol = 95 * 95;
    const fence = new Uint8Array(BW * BH);
    for (let i = 0; i < BW * BH; i++) {
      const o = i * 4, op = ca[o + 3] > 8;
      let block = wall[i] || op !== seedOpaque;
      if (!block && seedOpaque) {
        if (seedId) block = ma[o] !== seedId;
        else { const dr = ca[o] - sr, dg = ca[o + 1] - sg, db = ca[o + 2] - sb; block = ma[o] !== 0 || dr * dr + dg * dg + db * db > tol; }
      }
      fence[i] = block ? 1 : 0;
    }
    const reg = this.flood(fence, [y * BW + x]);
    // Let the color run under the outline so no white edge is left.
    const grow = dilate(reg, BW, BH, this.gap + 2);
    for (let i = 0; i < BW * BH; i++) if (grow[i] && !reg[i] && (wall[i] || raw[i])) reg[i] = 1;
    this.begin(['color', 'mat']);
    const rect = this.paintMask(reg, erase);
    this.commit(rect);
    return true;
  }
  // Fill everything inside the outlines (used for "straight to 3D" on an uncolored sketch).
  autoFillGarment(fabric = 'cotton', color = '#ffffff') {
    const { raw, wall } = this.barrier(3), seeds = [];
    for (let x = 0; x < BW; x++) seeds.push(x, (BH - 1) * BW + x);
    for (let y = 0; y < BH; y++) seeds.push(y * BW, y * BW + BW - 1);
    const outside = this.flood(wall, seeds), ca = this.cx.color.getImageData(0, 0, BW, BH).data;
    const inside = new Uint8Array(BW * BH);
    for (let i = 0; i < BW * BH; i++) if (!outside[i] && !wall[i]) inside[i] = 1;
    const grow = dilate(inside, BW, BH, 7);
    let n = 0;
    for (let i = 0; i < BW * BH; i++) { if (grow[i] && (wall[i] || raw[i]) && !outside[i]) inside[i] = 1; if (ca[i * 4 + 3] > 10) inside[i] = 0; if (inside[i]) n++; }
    if (n < 500) return false;
    const old = this.paint; this.paint = { color, fabric, scale: old.scale };
    this.begin(['color', 'mat']); this.commit(this.paintMask(inside, false));
    this.paint = old;
    return true;
  }

  pickAt(bx, by) {
    const x = Math.round(bx), y = Math.round(by); if (x < 0 || y < 0 || x >= BW || y >= BH) return;
    const c = this.cx.color.getImageData(x, y, 1, 1).data;
    if (c[3] > 10) this.onPick([c[0], c[1], c[2]]);
  }

  // ---------- import placement ----------
  startPlace(lines, color, fitBox) {
    const w = lines.width, h = lines.height, f = fitBox;
    const s = Math.min(f.w / w, f.h / h);
    this.place = { lines, color, w, h, s, x: f.x + (f.w - w * s) / 2, y: f.y };
    this.dirty = true;
  }
  placeDown(bx, by) {
    const p = this.place, w = p.w * p.s, h = p.h * p.s, hs = 22 / this.view.s;
    const corners = [[p.x, p.y, p.x + w, p.y + h], [p.x + w, p.y, p.x, p.y + h], [p.x, p.y + h, p.x + w, p.y], [p.x + w, p.y + h, p.x, p.y]];
    for (const [cx, cy, ax, ay] of corners) if (Math.hypot(bx - cx, by - cy) < hs) { this.placeDrag = { mode: 'scale', ax, ay, d0: Math.hypot(cx - ax, cy - ay), s0: p.s }; return; }
    this.placeDrag = { mode: 'move', dx: bx - p.x, dy: by - p.y };
  }
  placeMove(bx, by) {
    const p = this.place, d = this.placeDrag;
    if (d.mode === 'move') { p.x = bx - d.dx; p.y = by - d.dy; }
    else {
      const ns = Math.max(0.05, d.s0 * Math.hypot(bx - d.ax, by - d.ay) / d.d0), w = p.w * ns, h = p.h * ns;
      p.x = bx < d.ax ? d.ax - w : d.ax; p.y = by < d.ay ? d.ay - h : d.ay; p.s = ns;
    }
    this.dirty = true;
  }
  scalePlace(f) {
    const p = this.place; if (!p) return;
    const cx = p.x + p.w * p.s / 2, cy = p.y + p.h * p.s / 2; p.s *= f; p.x = cx - p.w * p.s / 2; p.y = cy - p.h * p.s / 2; this.dirty = true;
  }
  commitPlace() {
    const p = this.place; if (!p) return;
    this.place = null;
    const w = p.w * p.s, h = p.h * p.s;
    this.begin(['color', 'mat', 'lines']);
    this.cx.lines.drawImage(p.lines, p.x, p.y, w, h);
    if (p.color) {
      this.cx.color.drawImage(p.color, p.x, p.y, w, h);
      // Imported colors count as plain cotton in 3D.
      const t = mk(); const tc = t.getContext('2d');
      tc.drawImage(p.color, p.x, p.y, w, h); tc.globalCompositeOperation = 'source-in'; tc.fillStyle = 'rgb(0,230,0)'; tc.fillRect(0, 0, BW, BH);
      this.cx.mat.drawImage(t, 0, 0);
    }
    this.commit({ x0: p.x - 2, y0: p.y - 2, x1: p.x + w + 2, y1: p.y + h + 2 });
  }
  cancelPlace() { this.place = null; this.dirty = true; }

  // ---------- whole-board helpers ----------
  clearAll() {
    this.begin(['color', 'mat', 'lines']);
    for (const c of Object.values(this.cx)) c.clearRect(0, 0, BW, BH);
    this.commit({ x0: 0, y0: 0, x1: BW - 1, y1: BH - 1 });
  }
  drawLines(fn) {
    this.begin(['lines']);
    const c = this.cx.lines; c.save(); c.strokeStyle = '#1c181e'; c.lineWidth = 4; c.lineCap = 'round'; c.lineJoin = 'round'; fn(c); c.restore();
    this.commit({ x0: 0, y0: 0, x1: BW - 1, y1: BH - 1 });
  }
  hasColor(side = 'front') { const d = this.sides[side].cx.color.getImageData(0, 0, BW, BH).data; for (let i = 3; i < d.length; i += 64) if (d[i] > 10) return true; return false; }
  hasLines(side = 'front') { const d = this.sides[side].cx.lines.getImageData(0, 0, BW, BH).data; for (let i = 3; i < d.length; i += 32) if (d[i] > 90) return true; return false; }
  // Garment texture for 3D: color with the outlines drawn on top (only where there is fabric).
  // The outer outline is left off so it does not smear along the sides of the 3D garment.
  sideTexture(side) {
    const L = this.sides[side], out = side === 'front' ? this.texF : this.texB;
    const ci = L.cx.color.getImageData(0, 0, BW, BH), li = L.cx.lines.getImageData(0, 0, BW, BH), c = ci.data, l = li.data;
    // A drawn line between two colored areas (a seam) must not leave a see-through gap:
    // fill it from the colors on either side.
    for (let y = 1; y < BH - 1; y++) for (let x = 1; x < BW - 1; x++) {
      const i = y * BW + x, o = i * 4; if (c[o + 3] >= 20 || l[o + 3] < 40) continue;
      let best = null;
      for (const [dx, dy] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
        let a = null, b = null;
        for (let k = 1; k <= 9 && !a; k++) { const xx = x - dx * k, yy = y - dy * k; if (xx < 0 || yy < 0 || xx >= BW || yy >= BH) break; if (c[(yy * BW + xx) * 4 + 3] >= 20) a = (yy * BW + xx) * 4; }
        for (let k = 1; k <= 9 && !b; k++) { const xx = x + dx * k, yy = y + dy * k; if (xx < 0 || yy < 0 || xx >= BW || yy >= BH) break; if (c[(yy * BW + xx) * 4 + 3] >= 20) b = (yy * BW + xx) * 4; }
        if (a !== null && b !== null) { best = [a, b]; break; }
      }
      if (best) { const [a, b] = best; c[o] = (c[a] + c[b]) / 2; c[o + 1] = (c[a + 1] + c[b + 1]) / 2; c[o + 2] = (c[a + 2] + c[b + 2]) / 2; c[o + 3] = 255; }
    }
    const outside = new Uint8Array(BW * BH);
    for (let i = 0; i < BW * BH; i++) outside[i] = c[i * 4 + 3] < 20 ? 1 : 0;
    const edge = dilate(outside, BW, BH, 5);
    for (let i = 0; i < BW * BH; i++) {
      const o = i * 4, a = l[o + 3] / 255;
      if (!a || c[o + 3] < 20 || edge[i]) continue;
      const k = 1 - 0.42 * a; c[o] *= k; c[o + 1] *= k; c[o + 2] *= k;
    }
    out.getContext('2d').putImageData(ci, 0, 0);
    return out;
  }
  // 3D textures: front on the left half, back (as seen from behind) on the right half.
  textureAtlas() {
    const a = this.atlas.getContext('2d'), m = this.atlasMat.getContext('2d'), F = this.sides.front, B = this.sides.back;
    const front = this.sideTexture('front');
    a.clearRect(0, 0, BW * 2, BH); m.clearRect(0, 0, BW * 2, BH);
    a.drawImage(front, 0, 0); m.drawImage(F.mat, 0, 0);
    if (this.backLinked) {
      a.save(); a.setTransform(-1, 0, 0, 1, BW * 2, 0); a.drawImage(front, 0, 0); a.restore();
      m.save(); m.setTransform(-1, 0, 0, 1, BW * 2, 0); m.drawImage(F.mat, 0, 0); m.restore();
    } else { a.drawImage(this.sideTexture('back'), BW, 0); m.drawImage(B.mat, BW, 0); }
    return { color: this.atlas, mat: this.atlasMat };
  }
  // Coarse grid of where the garment is (used to shape the 3D garment).
  // ids: which fill each cell belongs to; fabricOf(id) names its fabric.
  alphaGrid(step = 4) {
    const F = this.sides.front.cx, d = F.color.getImageData(0, 0, BW, BH).data, m = F.mat.getImageData(0, 0, BW, BH).data, ld = F.lines.getImageData(0, 0, BW, BH).data;
    const w = BW / step, h = BH / step, g = new Uint8Array(w * h), ids = new Uint8Array(w * h), lines = new Uint8Array(w * h);
    for (let i = 3; i < ld.length; i += 4) if (ld[i] > 90) { const p = (i - 3) / 4, x = p % BW, y = (p / BW) | 0; lines[((y / step) | 0) * w + ((x / step) | 0)] = 1; }
    let any = false;
    for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) {
      const o = (y * BW + x) * 4; if (d[o + 3] <= 20) continue;
      const c = ((y / step) | 0) * w + ((x / step) | 0); g[c] = 1; any = true; if (m[o + 3] === 255) ids[c] = m[o];
    }
    const fills = this.fillFabric;
    return { data: g, ids, lines, w, h, step, any, fabricOf: (id) => fills[id] || 'cotton' };
  }
  composite(maxH = 600, background = '#fffdfa', side = 'front') {
    const k = maxH / BH, c = mk(Math.round(BW * k), maxH), x = c.getContext('2d');
    x.fillStyle = background; x.fillRect(0, 0, c.width, c.height);
    const L = this.sides[side];
    x.drawImage(L.color, 0, 0, c.width, c.height); x.drawImage(L.lines, 0, 0, c.width, c.height);
    return c;
  }
  // Copies of the layers taken right now, so a save is not mixed up by later changes.
  snapshotLayers() {
    const copy = (c) => { const o = mk(c.width, c.height); o.getContext('2d').drawImage(c, 0, 0); return o; };
    const F = this.sides.front, B = this.sides.back, out = { color: copy(F.color), mat: copy(F.mat), lines: copy(F.lines) };
    if (!this.backLinked) { out.bcolor = copy(B.color); out.bmat = copy(B.mat); out.blines = copy(B.lines); }
    return out;
  }
  async layerBlobs(snap = this.snapshotLayers()) {
    const b = (c) => new Promise((r) => c.toBlob(r, 'image/png')), out = {};
    for (const [k, c] of Object.entries(snap)) out[k] = await b(c);
    return out;
  }
  async loadLayers(src) {
    for (const [side, pre] of [['front', ''], ['back', 'b']]) for (const n of ['color', 'mat', 'lines']) {
      const c = this.sides[side].cx[n]; c.clearRect(0, 0, BW, BH);
      if (!src[pre + n]) continue;
      const bmp = await createImageBitmap(src[pre + n]);
      c.drawImage(bmp, 0, 0, BW, BH);
    }
    this.backLinked = !(src.bcolor || src.blines);
    this.useSide('front');
    let maxId = 0;
    for (const side of ['front', 'back']) { const md = this.sides[side].cx.mat.getImageData(0, 0, BW, BH).data; for (let i = 0; i < md.length; i += 4) if (md[i + 3] && md[i] > maxId) maxId = md[i]; }
    this.fillId = maxId;
    this.fillFabric = { ...(src.fills || {}) };
    this.resetHistory(); this.dirty = true;
  }
}
