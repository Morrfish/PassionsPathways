// Pathway CAD - main application: document, history, commands and screens.
import { Viewport, COLORS } from './viewport.js';
import { Sketcher } from './sketcher.js';
import { evaluate, paramMap, tryEval, fmt } from './expr.js';
import { evalSketch, buildLoops } from './sketch.js';
import { CONS_INFO } from './constraints.js';
import { Drafter, SHEETS, defaultDrawing } from './drawing.js';
import { icon } from './icons.js';
import { EXAMPLES, ASM_EXAMPLES } from './examples.js';
import { Assembler, ASM_COMMANDS, newAssembly } from './assembly.js';
import { UNIT_MM, UNIT_NAMES, nice, lengthParams, convertPart, convertAssembly } from './units.js';

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clone = (o) => JSON.parse(JSON.stringify(o));
const r3 = (n) => Math.round(n * 1000) / 1000;
const STORE_KEY = 'pathwaycad.autosave.v1';

export const MATERIALS = {
  pla: { name: 'PLA plastic (3D print)', density: 1.24 },
  petg: { name: 'PETG plastic (3D print)', density: 1.27 },
  abs: { name: 'ABS plastic', density: 1.04 },
  acrylic: { name: 'Acrylic', density: 1.18 },
  oak: { name: 'Oak wood', density: 0.75 },
  pine: { name: 'Pine wood', density: 0.5 },
  aluminum: { name: 'Aluminum 6061', density: 2.7 },
  steel: { name: 'Mild steel', density: 7.85 },
  stainless: { name: 'Stainless steel', density: 8.0 },
  brass: { name: 'Brass', density: 8.5 },
  copper: { name: 'Copper', density: 8.96 },
};

const FEATURE_INFO = {
  sketch: { icon: 'sketch', label: 'Sketch' },
  extrude: { icon: 'extrude', label: 'Extrusion' },
  revolve: { icon: 'revolve', label: 'Revolution' },
  hole: { icon: 'hole', label: 'Hole' },
  primitive: { icon: 'primitive', label: 'Shape' },
  fillet: { icon: 'fillet', label: 'Fillet' },
  chamfer: { icon: 'chamfer', label: 'Chamfer' },
  shell: { icon: 'shell', label: 'Shell' },
  pattern: { icon: 'pattern', label: 'Pattern' },
  mirrorBody: { icon: 'mirrorBody', label: 'Mirror Part' },
};
const OPS = [['join', 'Add material (join)'], ['cut', 'Remove material (cut)'], ['intersect', 'Keep only the overlap']];
const AXIS_OPTS = [['X', 'X axis (red)'], ['Y', 'Y axis (green)'], ['Z', 'Z axis (blue)']];
const PLANE_OPTS = [['YZ', 'YZ plane (flip left/right)'], ['XZ', 'XZ plane (flip front/back)'], ['XY', 'XY plane (flip up/down)']];

export function newDoc() {
  return { app: 'Pathway CAD', version: 1, name: 'Part1', units: 'mm', material: 'pla', color: '#8fb3c9', params: [], features: [], rollback: null, nextId: 1 };
}

class App {
  constructor() {
    this.doc = newDoc();
    this.undoStack = [];
    this.redoStack = [];
    this.mode = 'model';
    this.cmd = null;
    this.result = { errors: {}, warnings: {} };
    this.buildId = 0;
    this.pending = new Map();
    this.ui = new UI(this);
    this.vp = new Viewport($('#view3d'));
    this.sk = new Sketcher(this);
    this.asm = null;
    this.editPid = null;
    this.materials = MATERIALS;
    this.asmr = new Assembler(this);
    this.drw = new Drafter(this);
    this.vp.onStyle = () => this.mode === 'assembly' && this.asmr.render();
    this.startKernel();
    this.bindViewportPicking();
    this.ui.renderRibbon();
    this.restore();
    this.vp.setView('home');
    window.addEventListener('keydown', (e) => this.onKey(e));
    window.addEventListener('beforeunload', () => this.autosave());
  }

  // ---------- kernel ----------
  startKernel() {
    this.ready = false;
    this.worker = new Worker('worker.js', { type: 'module' });
    this.worker.onmessage = (ev) => this.onKernel(ev.data);
    this.worker.onerror = (e) => { this.ui.loading(`The modeling engine failed to start: ${e.message || 'unknown error'}`, true); };
  }
  onKernel(m) {
    if (m.type === 'ready') { this.ready = true; this.ui.loading(null); this.status('Ready. Pick a tool from the ribbon, or right-drag to turn the view.'); this.rebuild(); return; }
    if (m.type === 'fatal') { this.ui.loading('The modeling engine failed to start: ' + m.msg, true); return; }
    const cb = this.pending.get(m.id);
    if (cb) { this.pending.delete(m.id); cb(m); }
  }
  send(msg) {
    return new Promise((resolve) => {
      const id = ++this.buildId;
      this.pending.set(id, resolve);
      this.worker.postMessage({ ...msg, id });
    });
  }

  // What to build right now, depending on the mode and any open command.
  buildPlan() {
    const doc = this.doc;
    const end = doc.rollback ?? doc.features.length;
    if (this.mode === 'sketch') {
      const i = doc.features.findIndex((f) => f.id === this.sketchId);
      return { doc, stopAt: i + 1 };
    }
    if (this.cmd && this.cmd.feature) {
      const c = this.cmd;
      const d = { ...doc, features: [...doc.features] };
      let idx;
      if (c.editIndex != null) { idx = c.editIndex; d.features[idx] = c.feature; }
      else { idx = end; d.features.splice(idx, 0, c.feature); }
      const showBase = c.picksOnBase && !c.preview;
      return { doc: d, stopAt: showBase ? idx : idx + 1, previewId: c.feature.id };
    }
    return { doc, stopAt: end };
  }

  rebuild() {
    if (!this.ready) return;
    if (this.mode === 'assembly') { this.asmr.rebuild(); return; }
    if (this.mode === 'drawing') { this.drw.update(); this.ui.renderTree(); return; }
    clearTimeout(this._rb);
    this._rb = setTimeout(async () => {
      const plan = this.buildPlan();
      const ticket = ++this._ticket || (this._ticket = 1);
      this.ui.busy(true);
      const m = await this.send({ type: 'rebuild', doc: plan.doc, stopAt: plan.stopAt });
      if (ticket !== this._ticket) return;
      this.ui.busy(false);
      if (m.type === 'error') { this.toast('Rebuild failed: ' + m.msg, 'error'); return; }
      this.planes = { ...(this.planes || {}), ...(m.planes || {}) };
      this.result = { errors: m.errors, warnings: m.warnings, desc: m.desc, ms: m.ms, previewId: plan.previewId };
      const first = !this.vp.desc && m.desc;
      this.vp.setPart(m.desc);
      if (first && this.mode !== 'sketch' && !this._fittedOnce) { this._fittedOnce = true; this.vp.fit(); }
      this.refreshHighlights();
      this.ui.renderTree();
      this.ui.renderStatusInfo();
      if (this.cmd && this.cmd.onRebuilt) this.cmd.onRebuilt();
      if (plan.previewId && m.errors[plan.previewId]) this.ui.cmdError(m.errors[plan.previewId]);
      else if (this.cmd) this.ui.cmdError(null);
      if (this.ui.infoOpen) this.ui.renderInfo();
    }, 40);
  }

  // ---------- document & history ----------
  params() { return paramMap(this.doc); }
  newId(prefix = 'f') { const id = prefix + this.doc.nextId; this.doc.nextId++; return id; }
  get root() { return this.asm || this.doc; }
  snapshot() { return JSON.stringify(this.root); }
  change(fn) {
    const before = this.snapshot();
    fn();
    if (this.snapshot() !== before) { this.undoStack.push(before); if (this.undoStack.length > 200) this.undoStack.shift(); this.redoStack = []; }
    this.changed();
  }
  beginChange() { this._began = this.snapshot(); }
  endChange() {
    if (this._began && this._began !== this.snapshot()) { this.undoStack.push(this._began); this.redoStack = []; }
    this._began = null;
    this.changed();
  }
  abortChange() { this._began = null; }
  changed() {
    this.dirty = true;
    clearTimeout(this._as);
    this._as = setTimeout(() => this.autosave(), 800);
    if (this.mode === 'sketch') this.sk.recompute();
    this.rebuild();
    this.ui.renderTree();
    this.ui.renderTitle();
  }
  undo() {
    if (this.cmd) { this.cancelCmd(); return; }
    if (!this.undoStack.length) return this.toast('Nothing to undo');
    this.redoStack.push(this.snapshot());
    this.loadState(this.undoStack.pop());
  }
  redo() {
    if (!this.redoStack.length) return this.toast('Nothing to redo');
    this.undoStack.push(this.snapshot());
    this.loadState(this.redoStack.pop());
  }
  loadState(json) {
    const d = JSON.parse(json);
    if (d.kind === 'assembly') {
      this.asm = d;
      if (this.editPid && !d.parts[this.editPid]) this.returnToAssembly();
      if (this.editPid) this.doc = d.parts[this.editPid];
      if (this.mode === 'assembly') { this.changed(); return; }
    } else this.doc = d;
    if (this.mode === 'sketch' && !this.sketchFeature()) this.exitSketch(true);
    if (this.mode === 'sketch') { this.sk.sel = new Set([...this.sk.sel].filter((id) => this.sketchFeature().entities.some((e) => e.id === id))); this.sk.recompute(); this.sk.redraw(); this.ui.sketchSelection(); }
    this.vp.setColor(this.doc.color);
    this.changed();
  }
  autosave() {
    try { localStorage.setItem(STORE_KEY, this.snapshot()); } catch { /* storage may be blocked */ }
  }
  restore() {
    let saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch { /* ignore */ }
    if (saved) {
      try {
        const d = JSON.parse(saved);
        if (d && d.kind === 'assembly') { this.openAssembly(d); this.toast('Opened your last assembly. Use File > New for a fresh one.'); return; }
        if (d && d.features && d.features.length) { this.setDoc(d, true); this.toast('Opened your last part. Use File > New for a fresh one.'); return; }
      } catch { /* ignore */ }
    }
    this.setDoc(newDoc(), true);
    this.ui.showWelcome();
  }
  setDoc(d, keepView) {
    if (this.mode === 'sketch') this.exitSketch(true);
    if (this.cmd) this.cancelCmd();
    this.leaveAssembly();
    const base = newDoc();
    this.doc = { ...base, ...d };
    if (!this.doc.nextId || this.doc.nextId < 2) this.doc.nextId = 1000;
    this.undoStack = [];
    this.redoStack = [];
    this.vp.setColor(this.doc.color);
    this._fittedOnce = false;
    this.vp.desc = null;
    this.ui.renderTitle();
    this.ui.renderTree();
    this.rebuild();
    if (!keepView) this.vp.setView('home');
  }
  // ---------- drawings ----------
  drawTarget() { return this.drawPrev === 'assembly' ? this.asm : this.doc; }
  openDrawing() {
    if (this.mode === 'sketch') this.exitSketch(true);
    if (this.cmd) this.cancelCmd();
    const t = this.mode === 'assembly' ? this.asm : this.doc;
    if (t.kind === 'assembly' ? !t.components.length : !this.result.desc) return this.toast('Make a solid (or place parts) first, then make its drawing.', 'error');
    this.drawPrev = this.mode;
    this.mode = 'drawing';
    if (!t.drawing) { t.drawing = defaultDrawing(); if ((t.units || 'mm') === 'mm') t.drawing.sheet = 'A4'; if (t.kind === 'assembly') t.drawing.holeNotes = false; }
    this.ui.tab = 'drawing';
    this.ui.renderRibbon();
    this.ui.renderTree();
    this.drw.open();
    this.drw.setTool('select');
  }
  closeDrawing() {
    if (this.mode !== 'drawing') return;
    this.drw.close();
    this.mode = this.drawPrev || 'model';
    this.drawPrev = null;
    this.ui.closeCmd();
    this.ui.tab = this.mode === 'assembly' ? 'assemble' : 'model';
    this.ui.renderRibbon();
    this.ui.renderTree();
    this.rebuild();
  }
  units() { return (this.mode === 'assembly' ? this.asm.units : this.doc.units) || 'mm'; }

  // ---------- assemblies ----------
  blankPart() { return newDoc(); }
  leaveAssembly() {
    this.asm = null;
    this.editPid = null;
    if (this.mode === 'assembly') this.mode = 'model';
    this.asmr.show(false);
    this.asmr.clashes = [];
    this.vp.fitOverride = null;
    this.ui.renderRibbon();
  }
  openAssembly(d) {
    if (this.mode === 'sketch') this.exitSketch(true);
    if (this.cmd) this.cancelCmd();
    this.asm = { ...newAssembly(), ...d };
    this.editPid = null;
    this.doc = newDoc();
    this.mode = 'assembly';
    this.undoStack = [];
    this.redoStack = [];
    this.asmr.sel = null;
    this.asmr.clashes = [];
    this.asmr._fitted = false;
    this.asmr.show(true);
    this.vp.fitOverride = () => this.asmr.fit();
    this.ui.tab = 'assemble';
    this.ui.renderRibbon();
    this.ui.renderTitle();
    this.ui.renderTree();
    this.rebuild();
    this.vp.setView('home');
  }
  newAssemblyFile() {
    if (this.root && ((this.root.features && this.root.features.length) || (this.root.components && this.root.components.length)) && !confirm('Start a new assembly? Save first if you want to keep what is open (File > Save).')) return;
    this.openAssembly(newAssembly());
    this.asmr.placeDialog();
  }
  editPart(pid) {
    if (!this.asm || !this.asm.parts[pid]) return;
    if (this.cmd) this.cancelCmd();
    this.editPid = pid;
    this.mode = 'model';
    this.doc = this.asm.parts[pid];
    this.asmr.show(false);
    this.vp.fitOverride = null;
    this.vp.setColor(this.doc.color);
    this.vp.desc = null;
    this._fittedOnce = false;
    this.ui.tab = 'model';
    this.ui.renderRibbon();
    this.ui.renderTitle();
    this.ui.renderTree();
    this.rebuild();
    this.vp.setView('home');
    this.toast(`Editing ${this.doc.name}. Press "Back to assembly" when done.`);
  }
  returnToAssembly() {
    if (!this.asm) return;
    if (this.mode === 'sketch') this.exitSketch(true);
    if (this.cmd) this.cancelCmd();
    this.editPid = null;
    this.mode = 'assembly';
    this.doc = newDoc();
    this.vp.setPart(null);
    this.asmr.show(true);
    this.vp.fitOverride = () => this.asmr.fit();
    this.ui.tab = 'assemble';
    this.ui.renderRibbon();
    this.ui.renderTitle();
    this.ui.renderTree();
    this.rebuild();
  }

  findFeature(id) { return this.doc.features.find((f) => f.id === id); }
  featureIndex(id) { return this.doc.features.findIndex((f) => f.id === id); }
  sketchFeature() { return this.findFeature(this.sketchId); }
  nextName(type) {
    const base = type === 'primitive' ? 'Shape' : FEATURE_INFO[type].label;
    let n = 1;
    while (this.doc.features.some((f) => f.name === base + n)) n++;
    return base + n;
  }
  insertFeature(f) {
    const end = this.doc.rollback ?? this.doc.features.length;
    this.doc.features.splice(end, 0, f);
    if (this.doc.rollback != null) this.doc.rollback++;
  }
  dependents(id) {
    const out = new Set([id]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const f of this.doc.features) {
        if (out.has(f.id)) continue;
        const uses = [f.sketch, ...(f.features || [])].some((x) => out.has(x));
        if (uses) { out.add(f.id); grew = true; }
      }
    }
    return out;
  }
  deleteFeature(id) {
    const deps = this.dependents(id);
    const f = this.findFeature(id);
    if (deps.size > 1) {
      const names = this.doc.features.filter((x) => deps.has(x.id) && x.id !== id).map((x) => x.name).join(', ');
      if (!confirm(`Deleting ${f.name} also deletes what uses it: ${names}. Go ahead?`)) return;
    }
    this.change(() => {
      const before = this.doc.features.length;
      const rb = this.doc.rollback;
      if (rb != null) {
        const removedBefore = this.doc.features.slice(0, rb).filter((x) => deps.has(x.id)).length;
        this.doc.rollback = rb - removedBefore;
      }
      this.doc.features = this.doc.features.filter((x) => !deps.has(x.id));
      if (this.doc.rollback != null && this.doc.rollback >= this.doc.features.length) this.doc.rollback = null;
      void before;
    });
  }

  // ---------- messages ----------
  status(msg) { this.ui.status(msg); }
  toast(msg, kind) { this.ui.toast(msg, kind); }

  // ---------- keyboard ----------
  onKey(e) {
    const tag = (e.target && e.target.tagName) || '';
    const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
    const k = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && k === 'z' && !typing) { e.preventDefault(); e.shiftKey ? this.redo() : this.undo(); return; }
    if ((e.ctrlKey || e.metaKey) && k === 'y' && !typing) { e.preventDefault(); this.redo(); return; }
    if ((e.ctrlKey || e.metaKey) && k === 's') { e.preventDefault(); this.saveFile(); return; }
    if ((e.ctrlKey || e.metaKey) && k === 'o') { e.preventDefault(); this.openFile(); return; }
    if (typing) { if (e.key === 'Enter' && this.cmd && tag !== 'TEXTAREA' && tag !== 'SELECT') { e.target.blur(); setTimeout(() => this.okCmd(), 60); } return; }
    if (this.ui.modalOpen()) { if (e.key === 'Escape') this.ui.closeModal(); return; }
    if (this.mode === 'drawing') {
      if (e.key === 'Escape') { if (this.drw.tool !== 'select' || this.drw.picks.length) this.drw.setTool('select'); else this.closeDrawing(); return; }
      if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); this.drw.deleteSel(); return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (k === 'd') this.drw.setTool('dim');
      if (k === 'n') this.drw.setTool('note');
      if (k === 's') this.drw.setTool('select');
      return;
    }
    if (this.mode === 'assembly') {
      if (e.key === 'Escape') { if (this.cmd) this.cancelCmd(); else { this.asmr.sel = null; this.asmr.render(); this.ui.renderTree(); } return; }
      if (e.key === 'Enter' && this.cmd) { this.okCmd(); return; }
      if ((e.key === 'Delete' || e.key === 'Backspace') && !this.cmd && this.asmr.sel) { e.preventDefault(); this.asmr.deleteComp(this.asmr.sel); return; }
      if (e.ctrlKey || e.metaKey || e.altKey || this.cmd) return;
      const ac = { p: 'place', c: 'constrain', m: 'measure', g: 'moveComp' };
      if (ac[k]) this.run(ac[k]);
      if (e.key === 'F6') this.vp.setView('home');
      return;
    }
    if (e.key === 'Escape') {
      if (this.mode === 'sketch') { if (this.sk.temp.length || this.sk.tool !== 'select') this.sk.cancelTemp(); else if (this.sk.sel.size) { this.sk.sel.clear(); this.sk.redraw(); this.ui.sketchSelection(); } }
      else if (this.cmd) this.cancelCmd();
      return;
    }
    if (e.key === 'Enter' && this.cmd) { this.okCmd(); return; }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (this.mode === 'sketch') { e.preventDefault(); this.sk.deleteSelected(); }
      else if (!this.cmd && this.ui.treeSel) { e.preventDefault(); this.deleteFeature(this.ui.treeSel); }
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (this.mode === 'sketch') {
      const map = { l: 'line', r: 'rect', c: 'circle', a: 'arc', p: 'polygon', o: 'slot', s: 'select' };
      if (map[k]) this.sk.setTool(map[k]);
      if (k === 'g') this.toggleGrid();
      if (k === 'x') this.sk.toggleConstruction();
      return;
    }
    if (this.cmd) return;
    const cmds = { s: 'sketch', e: 'extrude', r: 'revolve', h: 'hole', f: 'fillet', m: 'measure' };
    if (cmds[k]) this.run(cmds[k]);
    if (e.key === 'F6') this.vp.setView('home');
  }

  // ---------- viewport picking ----------
  bindViewportPicking() {
    const cv = this.vp.renderer.domElement;
    let downAt = null;
    cv.addEventListener('pointerdown', (e) => { if (this.mode === 'assembly') return this.asmr.onDown(e); if (e.button === 0) downAt = [e.clientX, e.clientY]; });
    cv.addEventListener('pointermove', (e) => {
      if (this.mode === 'assembly') return this.asmr.onMove(e);
      if (this.mode === 'sketch') return;
      const want = this.pickWant();
      if (!want) { if (this.hoverPick) { this.hoverPick = null; this.refreshHighlights(); } return; }
      const hit = this.vp.pick(e, want);
      const key = hit ? hit.kind + (hit.index ?? hit.name) : '';
      if (key !== (this.hoverPick ? this.hoverPick.key : '')) {
        this.hoverPick = hit ? { ...hit, key } : null;
        this.refreshHighlights();
        cv.style.cursor = hit ? 'pointer' : 'default';
      }
    });
    cv.addEventListener('pointerup', (e) => {
      if (this.mode === 'assembly') return this.asmr.onUp(e);
      if (e.button !== 0 || !downAt || this.mode === 'sketch') return;
      const moved = Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]);
      downAt = null;
      if (moved > 5) return;
      const want = this.pickWant();
      if (!want) return;
      const hit = this.vp.pick(e, want);
      if (this.cmd && this.cmd.onPick) this.cmd.onPick(hit, e);
    });
  }
  pickWant() {
    if (!this.cmd || !this.cmd.want) return null;
    if (this.cmd.picksOnBase && this.cmd.preview) return null;
    return this.cmd.want;
  }
  refreshHighlights() {
    if (this.mode === 'assembly') { this.asmr.refreshHighlights(); return; }
    const items = [];
    if (this.cmd && this.cmd.highlights) items.push(...this.cmd.highlights());
    if (this.hoverPick) {
      const h = this.hoverPick;
      if (h.kind === 'face') items.push({ kind: 'face', index: h.index, color: COLORS.hoverFace });
      else if (h.kind === 'edge') items.push({ kind: 'edge', index: h.index, color: COLORS.hoverEdge });
      else if (h.kind === 'plane') items.push({ kind: 'plane', name: h.name, color: COLORS.hoverFace });
    }
    this.vp.highlight(items);
  }

  // ---------- commands ----------
  run(name, arg) {
    if (!this.ready) return this.toast('The modeling engine is still loading…');
    if (this.mode === 'sketch' && !['params', 'info', 'measure'].includes(name)) { this.toast('Finish the sketch first (green check).'); return; }
    if (this.cmd) this.cancelCmd();
    const make = (this.mode === 'assembly' ? ASM_COMMANDS : COMMANDS)[name];
    if (!make) return;
    const cmd = make(this, arg);
    if (!cmd) return;
    this.cmd = cmd;
    this.ui.openCmd(cmd);
    if (cmd.start) cmd.start();
    this.refreshHighlights();
    this.rebuild();
  }
  cmdChanged() { if (this.cmd) { this.ui.refreshCmd(); this.refreshHighlights(); this.rebuild(); } }
  okCmd() {
    const c = this.cmd;
    if (!c) return;
    if (c.validate) { const msg = c.validate(); if (msg) { this.toast(msg, 'error'); return; } }
    if (c.feature) {
      const plan = this.buildPlan();
      void plan;
      this.change(() => {
        if (c.editIndex != null) this.doc.features[c.editIndex] = c.feature;
        else this.insertFeature(c.feature);
      });
    }
    if (c.ok) c.ok();
    this.closeCmd();
  }
  cancelCmd() { if (this.cmd && this.cmd.cancel) this.cmd.cancel(); this.closeCmd(); this.rebuild(); }
  closeCmd() {
    this.cmd = null;
    this.hoverPick = null;
    this.asmr.hover = null;
    if (this.mode === 'assembly') this.asmr.render();
    this.vp.showPlanes(false);
    this.ui.closeCmd();
    this.refreshHighlights();
    this.vp.renderer.domElement.style.cursor = 'default';
    this.status('Ready. Pick a tool from the ribbon, or right-drag to turn the part.');
    this.rebuild();
  }
  editFeature(id) {
    const f = this.findFeature(id);
    if (!f) return;
    if (f.type === 'sketch') return this.enterSketch(id);
    const map = { extrude: 'extrude', revolve: 'revolve', hole: 'hole', fillet: 'fillet', chamfer: 'chamfer', shell: 'shell', mirrorBody: 'mirrorBody', primitive: 'primitive', pattern: 'pattern' };
    this.run(map[f.type], { edit: id });
  }

  // ---------- sketch mode ----------
  enterSketch(id, isNew = false) {
    if (this.cmd) this.closeCmd();
    const f = this.findFeature(id);
    let plane;
    try {
      const P = this.params();
      const base = typeof f.plane === 'string' ? ORIGIN[f.plane] : { ...f.plane };
      // A sketch on a face follows that face (the engine reports where it is now).
      const known = f.faceRef && this.planes && this.planes[id];
      if (known && known.base) { base.origin = known.base; base.normal = known.normal; }
      const off = f.offset ? evaluate(f.offset, P) : 0;
      plane = { origin: base.origin.map((v, i) => v + base.normal[i] * off), xDir: base.xDir, normal: base.normal };
    } catch (e) { this.toast('Plane offset problem: ' + e.message, 'error'); return; }
    this.mode = 'sketch';
    this.sketchId = id;
    this.sketchIsNew = isNew;
    this.savedCam = { pos: this.vp.camera.position.clone(), up: this.vp.camera.up.clone(), target: this.vp.controls.target.clone(), zoom: this.vp.camera.zoom, h: this.vp.viewHeight };
    this.vp.setGhost(true);
    this.sk.evals = null;
    this.sk.recompute();
    this.sk.enter(plane);
    this.ui.enterSketch();
    this.rebuild();
  }
  exitSketch(silent) {
    if (this.mode !== 'sketch') return;
    const id = this.sketchId;
    this.sk.exit();
    this.mode = 'model';
    this.vp.setGhost(false);
    this.ui.exitSketch();
    if (this.savedCam) {
      const c = this.savedCam;
      this.vp.camera.position.copy(c.pos); this.vp.setUp(c.up); this.vp.controls.target.copy(c.target);
      this.vp.camera.zoom = c.zoom; this.vp.viewHeight = c.h; this.vp.updateFrustum(); this.vp.controls.update();
    }
    this.rebuild();
    if (silent) return;
    const f = this.findFeature(id);
    if (!f) return;
    const used = this.doc.features.some((x) => x.sketch === id);
    const { loops } = buildLoops(evalSketch(f.entities, this.params(), f.constraints));
    if (!used && loops.length) this.run('extrude', { sketch: id });
    else if (!used && f.entities.length) this.toast('No closed shape yet, so nothing to extrude. Red dots show line ends that do not meet.');
  }
  toggleGrid() {
    this.sk.gridOn = !this.sk.gridOn;
    this.sk.redraw();
    this.ui.sketchToolChanged(this.sk.tool);
  }

  // ---------- files ----------
  download(name, data, type) {
    const blob = data instanceof Blob ? data : new Blob([data], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  }
  safeName() { return (this.root.name || 'Part').replace(/[^\w\- ]+/g, '').trim() || 'Part'; }
  saveFile(partOnly) {
    if (this.mode === 'sketch') this.exitSketch(true);
    const d = partOnly ? this.doc : this.root;
    const ext = d.kind === 'assembly' ? '.pasm' : '.pcad';
    const name = ((d.name || 'Part').replace(/[^\w\- ]+/g, '').trim() || 'Part') + ext;
    this.download(name, JSON.stringify(d, null, 1), 'application/json');
    this.dirty = false;
    this.toast('Saved ' + name + ' to your downloads.');
  }
  openFile() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = '.pcad,.pasm,.json';
    inp.onchange = async () => {
      const file = inp.files[0];
      if (!file) return;
      try {
        const d = JSON.parse(await file.text());
        if (d && d.kind === 'assembly' && Array.isArray(d.components)) { this.openAssembly(d); this.toast('Opened ' + file.name); return; }
        if (!d || !Array.isArray(d.features)) throw new Error('This is not a Pathway CAD file');
        this.setDoc(d);
        this.toast('Opened ' + file.name);
      } catch (e) { this.toast('Could not open: ' + e.message, 'error'); }
    };
    inp.click();
  }
  newFile() {
    if (((this.root.features && this.root.features.length) || (this.root.components && this.root.components.length)) && !confirm('Start a new part? Save first if you want to keep this one (File > Save).')) return;
    this.setDoc(newDoc());
  }
  async exportFile(format) {
    if (this.mode === 'sketch') this.exitSketch(true);
    if (this.mode === 'assembly') {
      if (!this.asm.components.length) return this.toast('Place some parts first.', 'error');
      this.toast(`Making the ${format.toUpperCase()} file for the whole assembly…`);
      const k = UNIT_MM[this.asm.units || 'mm'];
      const comps = this.asm.components.filter((c) => !c.hidden).map((c) => ({ id: c.id, part: c.part, pos: c.pos.map((v) => v * k), quat: c.quat }));
      const m = await this.send({ type: 'exportAsm', format, parts: this.asm.parts, comps });
      if (m.type === 'error') return this.toast('Export failed: ' + m.msg, 'error');
      return this.download(`${this.safeName()}.${format === 'stl' ? 'stl' : 'step'}`, new Blob([m.buf]), 'application/octet-stream');
    }
    if (!this.vp.desc) return this.toast('There is no part to export yet.', 'error');
    this.toast(`Making the ${format.toUpperCase()} file…`);
    const m = await this.send({ type: 'export', format, doc: this.doc, stopAt: this.doc.rollback ?? this.doc.features.length });
    if (m.type === 'error') return this.toast('Export failed: ' + m.msg, 'error');
    this.download(`${this.safeName()}.${format === 'stl' ? 'stl' : 'step'}`, new Blob([m.buf]), 'application/octet-stream');
  }
  screenshot() {
    const url = this.vp.snapshot();
    const a = document.createElement('a');
    a.href = url;
    a.download = this.safeName() + '.png';
    a.click();
  }
}

const ORIGIN = {
  XY: { origin: [0, 0, 0], xDir: [1, 0, 0], normal: [0, 0, 1] },
  XZ: { origin: [0, 0, 0], xDir: [1, 0, 0], normal: [0, -1, 0] },
  YZ: { origin: [0, 0, 0], xDir: [0, 1, 0], normal: [1, 0, 0] },
};

// Plane for sketching on a flat face: origin is the world origin dropped onto the face.
function facePlane(info) {
  const n = info.normal;
  const d = n[0] * info.center[0] + n[1] * info.center[1] + n[2] * info.center[2];
  const origin = n.map((v) => r3(v * d));
  let x;
  if (Math.abs(n[2]) > 0.9) x = [1, 0, 0];
  else { x = [-n[1], n[0], 0]; const L = Math.hypot(x[0], x[1]); x = [x[0] / L, x[1] / L, 0]; }
  return { origin, xDir: x.map((v) => r3(v)), normal: n.map((v) => r3(v)), faceRef: [...info.center.map(r3), ...n.map(r3)] };
}

// ---------- command definitions ----------
// Each returns {title, help, fields(), feature?, want?, onPick?, highlights?, ...}
function editTarget(app, arg) {
  if (arg && arg.edit) {
    const idx = app.featureIndex(arg.edit);
    return { editIndex: idx, feature: clone(app.doc.features[idx]) };
  }
  return { editIndex: null, feature: null };
}
function sketchesBefore(app, editIndex) {
  const end = editIndex ?? app.doc.rollback ?? app.doc.features.length;
  return app.doc.features.slice(0, end).filter((f) => f.type === 'sketch');
}
function toolFeaturesBefore(app, editIndex) {
  const end = editIndex ?? app.doc.rollback ?? app.doc.features.length;
  return app.doc.features.slice(0, end).filter((f) => ['extrude', 'revolve', 'hole', 'primitive'].includes(f.type) && !f.suppressed);
}
function hasBodyBefore(app, editIndex) {
  const end = editIndex ?? app.doc.rollback ?? app.doc.features.length;
  return app.doc.features.slice(0, end).some((f) => ['extrude', 'revolve', 'primitive'].includes(f.type) && !f.suppressed);
}

const COMMANDS = {
  sketch(app) {
    app.vp.showPlanes(true);
    return {
      title: 'New Sketch',
      help: 'Click one of the colored origin planes, or a flat face of your part, to draw on it.',
      want: { faces: true, planes: true },
      fields: () => [{ type: 'note', text: 'Blue = XY (floor). Green = XZ (front). Red = YZ (side).' }],
      noOk: true,
      onPick(hit) {
        if (!hit) return;
        let plane;
        if (hit.kind === 'plane') plane = hit.name;
        else if (hit.kind === 'face') {
          if (hit.info.type !== 'PLANE') { app.toast('That face is curved. Pick a flat face or an origin plane.', 'error'); return; }
          plane = facePlane(hit.info);
        } else return;
        const faceRef = plane.faceRef;
        if (faceRef) delete plane.faceRef;
        const f = { id: app.newId(), type: 'sketch', name: app.nextName('sketch'), plane, faceRef, offset: 0, entities: [] };
        app.closeCmd();
        app.change(() => app.insertFeature(f));
        app.enterSketch(f.id, true);
      },
    };
  },

  extrude(app, arg) {
    const t = editTarget(app, arg);
    const sketches = sketchesBefore(app, t.editIndex);
    if (!sketches.length) { app.toast('Make a sketch first (Model > Sketch).', 'error'); return null; }
    const unused = sketches.filter((s) => !app.doc.features.some((f) => f.sketch === s.id));
    const hasBody = hasBodyBefore(app, t.editIndex);
    const f = t.feature || { id: app.newId(), type: 'extrude', name: app.nextName('extrude'), sketch: (arg && arg.sketch) || (unused[unused.length - 1] || sketches[sketches.length - 1]).id, distance: nice(10, app.units()), extent: 'distance', direction: 'normal', op: hasBody ? 'join' : 'new', taper: 0 };
    return {
      title: t.editIndex != null ? 'Edit ' + f.name : 'Extrude',
      help: 'Pushes a closed sketch shape out into a solid. Use "Remove material" to cut pockets and holes.',
      feature: f, editIndex: t.editIndex,
      fields: () => [
        { key: 'sketch', label: 'Sketch', type: 'select', options: sketches.map((s) => [s.id, s.name]) },
        { key: 'extent', label: 'How far', type: 'select', options: [['distance', 'A distance'], ['through', 'Through everything']] },
        f.extent !== 'through' && { key: 'distance', label: 'Distance (mm)', type: 'expr' },
        { key: 'direction', label: 'Direction', type: 'select', options: [['normal', 'One way'], ['reverse', 'Other way (flip)'], ['both', 'Both ways (centered)']] },
        hasBody ? { key: 'op', label: 'Operation', type: 'select', options: OPS } : { type: 'note', text: 'This is the first solid, so it adds material.' },
        { key: 'taper', label: 'Taper angle (°)', type: 'expr', hint: '0 = straight sides' },
      ].filter(Boolean),
    };
  },

  revolve(app, arg) {
    const t = editTarget(app, arg);
    const sketches = sketchesBefore(app, t.editIndex);
    if (!sketches.length) { app.toast('Make a sketch first (Model > Sketch).', 'error'); return null; }
    const unused = sketches.filter((s) => !app.doc.features.some((f) => f.sketch === s.id));
    const hasBody = hasBodyBefore(app, t.editIndex);
    const sk0 = (arg && arg.sketch) || (unused[unused.length - 1] || sketches[sketches.length - 1]).id;
    const firstLine = (sid) => { const s = app.findFeature(sid); const c = s && s.entities.find((e) => e.type === 'line' && e.construction); return c ? c.id : 'Y'; };
    const f = t.feature || { id: app.newId(), type: 'revolve', name: app.nextName('revolve'), sketch: sk0, axis: firstLine(sk0), angle: 360, op: hasBody ? 'join' : 'new' };
    return {
      title: t.editIndex != null ? 'Edit ' + f.name : 'Revolve',
      help: 'Spins a sketch shape around an axis, like a lathe. Draw a dashed construction line in the sketch to use as the axis.',
      feature: f, editIndex: t.editIndex,
      fields: () => {
        const s = app.findFeature(f.sketch);
        const lines = s ? s.entities.filter((e) => e.type === 'line') : [];
        return [
          { key: 'sketch', label: 'Sketch', type: 'select', options: sketches.map((x) => [x.id, x.name]), onChange: () => { f.axis = firstLine(f.sketch); } },
          { key: 'axis', label: 'Axis', type: 'select', options: [['X', "Sketch's horizontal axis"], ['Y', "Sketch's vertical axis"], ...lines.map((l, i) => [l.id, `${l.construction ? 'Construction line' : 'Line'} ${i + 1} (${fmt(+l.x1 || 0)},${fmt(+l.y1 || 0)} → ${fmt(+l.x2 || 0)},${fmt(+l.y2 || 0)})`])] },
          { key: 'angle', label: 'Angle (°)', type: 'expr' },
          hasBody ? { key: 'op', label: 'Operation', type: 'select', options: OPS } : { type: 'note', text: 'This is the first solid, so it adds material.' },
        ];
      },
    };
  },

  hole(app, arg) {
    const t = editTarget(app, arg);
    if (!hasBodyBefore(app, t.editIndex)) { app.toast('Make a solid first, then put holes in it.', 'error'); return null; }
    const f = t.feature || { id: app.newId(), type: 'hole', name: app.nextName('hole'), origin: null, normal: null, diameter: nice(5, app.units()), extent: 'through', depth: nice(10, app.units()), style: 'simple', cbDiameter: nice(9, app.units()), cbDepth: nice(3, app.units()) };
    const cmd = {
      title: t.editIndex != null ? 'Edit ' + f.name : 'Hole',
      help: 'Click a flat face where the hole should go. Then type exact X, Y, Z numbers if you need to.',
      feature: t.feature ? f : null, draft: f, editIndex: t.editIndex,
      want: { faces: true },
      fields: () => [
        f.origin ? { type: 'xyz', key: 'origin', label: 'Center (mm)' } : { type: 'note', text: '👉 Click a flat face to place the hole.' },
        { key: 'diameter', label: 'Diameter (mm)', type: 'expr' },
        { key: 'extent', label: 'Depth', type: 'select', options: [['through', 'All the way through'], ['depth', 'A set depth']] },
        f.extent === 'depth' && { key: 'depth', label: 'Depth (mm)', type: 'expr' },
        { key: 'style', label: 'Type', type: 'select', options: [['simple', 'Plain hole'], ['counterbore', 'Counterbore (for bolt heads)'], ['countersink', 'Countersink (for flat screws)']] },
        f.style !== 'simple' && { key: 'cbDiameter', label: f.style === 'counterbore' ? 'Counterbore diameter' : 'Countersink diameter', type: 'expr' },
        f.style === 'counterbore' && { key: 'cbDepth', label: 'Counterbore depth', type: 'expr' },
      ].filter(Boolean),
      onPick(hit) {
        if (!hit || hit.kind !== 'face') return;
        if (hit.info.type !== 'PLANE') { app.toast('Holes go on flat faces.', 'error'); return; }
        f.origin = hit.point.map(r3);
        f.normal = hit.info.normal.map(r3);
        f.faceRef = [...hit.info.center.map(r3), ...f.normal];
        cmd.feature = f;
        app.cmdChanged();
      },
      validate: () => (!f.origin ? 'Click a flat face to place the hole first.' : null),
      highlights: () => (f.origin ? [{ kind: 'point', point: f.origin, color: COLORS.selEdge }] : []),
    };
    return cmd;
  },

  primitive(app, arg) {
    const t = editTarget(app, arg);
    const shape = (arg && arg.shape) || (t.feature && t.feature.shape) || 'box';
    const hasBody = hasBodyBefore(app, t.editIndex);
    const U = app.units();
    const defaults = { box: { w: nice(40, U), d: nice(30, U), h: nice(20, U) }, cylinder: { diameter: nice(30, U), h: nice(40, U), axis: 'Z' }, sphere: { diameter: nice(40, U) } };
    const names = { box: 'Box', cylinder: 'Cylinder', sphere: 'Sphere' };
    const f = t.feature || { id: app.newId(), type: 'primitive', shape, name: names[shape] + (app.doc.features.filter((x) => x.shape === shape).length + 1), ...defaults[shape], x: 0, y: 0, z: 0, op: hasBody ? 'join' : 'new' };
    return {
      title: t.editIndex != null ? 'Edit ' + f.name : names[shape],
      help: shape === 'box' ? 'A box sitting on its position point (centered left/right and front/back).' : shape === 'cylinder' ? 'A cylinder starting at the position point, going along the axis.' : 'A ball centered on the position point.',
      feature: f, editIndex: t.editIndex,
      fields: () => [
        shape === 'box' && { key: 'w', label: 'Width X (mm)', type: 'expr' },
        shape === 'box' && { key: 'd', label: 'Depth Y (mm)', type: 'expr' },
        shape === 'box' && { key: 'h', label: 'Height Z (mm)', type: 'expr' },
        shape !== 'box' && { key: 'diameter', label: 'Diameter (mm)', type: 'expr' },
        shape === 'cylinder' && { key: 'h', label: 'Length (mm)', type: 'expr' },
        shape === 'cylinder' && { key: 'axis', label: 'Points along', type: 'select', options: AXIS_OPTS },
        { key: 'x', label: 'Position X', type: 'expr' },
        { key: 'y', label: 'Position Y', type: 'expr' },
        { key: 'z', label: 'Position Z', type: 'expr' },
        hasBody ? { key: 'op', label: 'Operation', type: 'select', options: OPS } : null,
      ].filter(Boolean),
    };
  },

  fillet(app, arg) { return edgeCmd(app, arg, 'fillet'); },
  chamfer(app, arg) { return edgeCmd(app, arg, 'chamfer'); },

  shell(app, arg) {
    const t = editTarget(app, arg);
    if (!hasBodyBefore(app, t.editIndex)) { app.toast('Make a solid first.', 'error'); return null; }
    const f = t.feature || { id: app.newId(), type: 'shell', name: app.nextName('shell'), thickness: nice(2, app.units()), faces: [] };
    const sel = () => matchIndices(app.vp.desc && app.vp.desc.faces, f.faces, 'center');
    return {
      title: t.editIndex != null ? 'Edit ' + f.name : 'Shell',
      help: 'Hollows out the part, leaving walls of the thickness you choose. Click faces to leave open (like the top of a cup).',
      feature: f, editIndex: t.editIndex, picksOnBase: true, preview: false,
      want: { faces: true },
      fields: () => [
        { key: 'thickness', label: 'Wall thickness (mm)', type: 'expr' },
        { type: 'note', text: f.faces.length ? `${f.faces.length} open face(s). Click a face again to close it.` : '👉 Click the flat face(s) to leave open, like the top of a box.' },
        { type: 'preview' },
      ],
      validate: () => (!f.faces.length ? 'Click at least one flat face to leave open.' : null),
      onPick(hit) {
        if (!hit || hit.kind !== 'face') return;
        const c = hit.info.center.map(r3);
        const i = f.faces.findIndex((p) => dist(p, c) < 0.5);
        if (i >= 0) f.faces.splice(i, 1);
        else if (hit.info.type !== 'PLANE') { app.toast('Pick a flat face to leave open.', 'error'); return; }
        else f.faces.push([...c, ...hit.info.normal.map(r3)]);
        app.cmdChanged();
      },
      highlights: () => sel().map((i) => ({ kind: 'face', index: i, color: COLORS.selFace })),
    };
  },

  pattern(app, arg) {
    const t = editTarget(app, arg);
    const kind = (arg && arg.kind) || (t.feature && t.feature.kind) || 'rect';
    const feats = toolFeaturesBefore(app, t.editIndex);
    if (!feats.length) { app.toast('Make a feature to copy first (an extrusion, revolution, hole or shape).', 'error'); return null; }
    const last = [feats[feats.length - 1].id];
    const names = { rect: 'Rectangular Pattern', circ: 'Circular Pattern', mirror: 'Mirror' };
    const base = { rect: { d1: 'X', n1: 3, s1: nice(20, app.units()), d2: 'Y', n2: 1, s2: nice(20, app.units()) }, circ: { axis: 'Z', n: 6, angle: 360 }, mirror: { plane: 'YZ' } };
    let nm = names[kind].replace(/ /g, '');
    let k = 1; while (app.doc.features.some((x) => x.name === nm + k)) k++;
    const f = t.feature || { id: app.newId(), type: 'pattern', kind, name: nm + k, features: last, ...base[kind] };
    const opts = feats.map((x) => [x.id, x.name]);
    return {
      title: t.editIndex != null ? 'Edit ' + f.name : names[kind],
      help: kind === 'rect' ? 'Copies features in rows and columns.' : kind === 'circ' ? 'Copies features around an axis, like bolt holes on a wheel.' : 'Makes a mirror copy of features on the other side of a plane.',
      feature: f, editIndex: t.editIndex,
      fields: () => [
        { key: 'features', label: 'Features to copy', type: 'multi', options: opts },
        ...(kind === 'rect' ? [
          { key: 'd1', label: 'Direction 1', type: 'select', options: AXIS_OPTS },
          { key: 'flip1', label: 'Flip direction 1', type: 'check' },
          { key: 'n1', label: 'Count', type: 'expr' },
          { key: 's1', label: 'Spacing (mm)', type: 'expr' },
          { key: 'd2', label: 'Direction 2', type: 'select', options: AXIS_OPTS },
          { key: 'flip2', label: 'Flip direction 2', type: 'check' },
          { key: 'n2', label: 'Count', type: 'expr' },
          { key: 's2', label: 'Spacing (mm)', type: 'expr' },
        ] : kind === 'circ' ? [
          { key: 'axis', label: 'Around', type: 'select', options: AXIS_OPTS },
          { key: 'n', label: 'Count (with the original)', type: 'expr' },
          { key: 'angle', label: 'Total angle (°)', type: 'expr', hint: '360 = all the way around' },
        ] : [
          { key: 'plane', label: 'Mirror across', type: 'select', options: PLANE_OPTS },
        ]),
      ],
      validate: () => (!f.features.length ? 'Pick at least one feature to copy.' : null),
    };
  },

  mirrorBody(app, arg) {
    const t = editTarget(app, arg);
    if (!hasBodyBefore(app, t.editIndex)) { app.toast('Make a solid first.', 'error'); return null; }
    const f = t.feature || { id: app.newId(), type: 'mirrorBody', name: app.nextName('mirrorBody'), plane: 'YZ' };
    return {
      title: t.editIndex != null ? 'Edit ' + f.name : 'Mirror Part',
      help: 'Copies the whole part to the other side of a plane and joins the two halves. Great for symmetric parts: model one half, then mirror.',
      feature: f, editIndex: t.editIndex,
      fields: () => [{ key: 'plane', label: 'Mirror across', type: 'select', options: PLANE_OPTS }],
    };
  },

  measure(app) {
    const pts = [];
    let info = 'Click a spot on the part, then a second spot. Click a round edge to see its diameter.';
    const cmd = {
      title: 'Measure',
      help: 'Measures straight-line distance between two clicked points. Clicks near a corner snap to it.',
      want: { faces: true, edges: true },
      noOk: true, closeLabel: 'Done',
      fields: () => [{ type: 'html', html: info }],
      onPick(hit) {
        if (!hit) return;
        const d = app.vp.desc;
        let p = hit.point;
        let extra = '';
        if (hit.kind === 'edge') {
          const pl = edgePolyline(d, hit.index);
          const ends = [pl[0], pl[pl.length - 1]];
          const px = app.vp.pixelSize() * 12;
          const e = ends.find((q) => dist(q, p) < px);
          if (e) p = e;
          const len = pl.reduce((s, q, i) => (i ? s + dist(q, pl[i - 1]) : 0), 0);
          extra = `Edge length: <b>${fmt(len)} ${app.units()}</b>`;
          if (d.edges[hit.index].type === 'CIRCLE' && pl.length > 3) {
            const c = circleFrom3(pl[0], pl[Math.floor(pl.length / 3)], pl[Math.floor((2 * pl.length) / 3)]);
            if (c) extra += `<br>Round edge: <b>Ø ${fmt(2 * c.r)} ${app.units()}</b> (radius ${fmt(c.r)})`;
          }
        }
        if (pts.length >= 2) pts.length = 0;
        pts.push(p.map(r3));
        if (pts.length === 1) info = `First point: (${pts[0].map(fmt).join(', ')})<br>${extra}<br>Now click a second point.`;
        else {
          const [a, b] = pts;
          info = `Distance: <b class="big">${fmt(dist(a, b))} ${app.units()}</b><br>X: ${fmt(Math.abs(b[0] - a[0]))} &nbsp; Y: ${fmt(Math.abs(b[1] - a[1]))} &nbsp; Z: ${fmt(Math.abs(b[2] - a[2]))}<br>${extra}<br><span class="muted">Click again to start a new measurement.</span>`;
        }
        app.ui.refreshCmd();
        app.refreshHighlights();
      },
      highlights: () => [...pts.map((p) => ({ kind: 'point', point: p, color: COLORS.selEdge })), ...(pts.length === 2 ? [{ kind: 'segment', points: pts, color: COLORS.selEdge }] : [])],
    };
    return cmd;
  },

  params(app) { app.ui.openParams(); return null; },
  info(app) { app.ui.openInfo(); return null; },
};

function edgeCmd(app, arg, type) {
  const t = editTarget(app, arg);
  if (!hasBodyBefore(app, t.editIndex)) { app.toast('Make a solid first.', 'error'); return null; }
  const f = t.feature || { id: app.newId(), type, name: app.nextName(type), radius: nice(type === 'fillet' ? 2 : 1, app.units()), allEdges: false, edges: [] };
  const sel = () => matchIndices(app.vp.desc && app.vp.desc.edges, f.edges, 'mid');
  const word = type === 'fillet' ? 'round' : 'bevel';
  return {
    title: t.editIndex != null ? 'Edit ' + f.name : type === 'fillet' ? 'Fillet' : 'Chamfer',
    help: `Click the edges to ${word}. Click an edge again to un-pick it. Tick "Preview" to see the result.`,
    feature: f, editIndex: t.editIndex, picksOnBase: true, preview: false,
    want: { edges: true },
    fields: () => [
      { key: 'radius', label: type === 'fillet' ? 'Radius (mm)' : 'Distance (mm)', type: 'expr' },
      { key: 'allEdges', label: 'Every edge of the part', type: 'check' },
      !f.allEdges && { type: 'note', text: f.edges.length ? `${f.edges.length} edge(s) picked.` : '👉 Click edges on the part.' },
      { type: 'preview' },
    ].filter(Boolean),
    onPick(hit) {
      if (!hit || hit.kind !== 'edge' || f.allEdges) return;
      const m = app.vp.desc.edges[hit.index].mid.map(r3);
      const i = f.edges.findIndex((p) => dist(p, m) < 0.5);
      if (i >= 0) f.edges.splice(i, 1); else f.edges.push(m);
      app.cmdChanged();
    },
    validate: () => (!f.allEdges && !f.edges.length ? 'Pick at least one edge (or tick "Every edge").' : null),
    highlights: () => (f.allEdges ? [] : sel().map((i) => ({ kind: 'edge', index: i, color: COLORS.selEdge }))),
  };
}

function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); }
function matchIndices(list, pts, key) {
  if (!list) return [];
  const out = [];
  for (const p of pts) {
    let best = -1, bd = 0.5;
    list.forEach((x, i) => { const d = dist(x[key], p); if (d < bd) { bd = d; best = i; } });
    if (best >= 0) out.push(best);
  }
  return out;
}
function edgePolyline(desc, i) {
  const [s, c] = desc.edgeGroups[i];
  const out = [];
  for (let k = s; k < s + c; k++) out.push([desc.lines[k * 3], desc.lines[k * 3 + 1], desc.lines[k * 3 + 2]]);
  return out;
}
function circleFrom3(a, b, c) {
  const ab = b.map((v, i) => v - a[i]), ac = c.map((v, i) => v - a[i]);
  const n = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]];
  const nn = n[0] ** 2 + n[1] ** 2 + n[2] ** 2;
  if (nn < 1e-12) return null;
  const abl = ab[0] ** 2 + ab[1] ** 2 + ab[2] ** 2, acl = ac[0] ** 2 + ac[1] ** 2 + ac[2] ** 2;
  const t1 = [n[1] * ab[2] - n[2] * ab[1], n[2] * ab[0] - n[0] * ab[2], n[0] * ab[1] - n[1] * ab[0]];
  const t2 = [ac[1] * n[2] - ac[2] * n[1], ac[2] * n[0] - ac[0] * n[2], ac[0] * n[1] - ac[1] * n[0]];
  const off = t2.map((v, i) => (v * abl + t1[i] * acl) / (2 * nn));
  return { r: Math.hypot(...off) };
}

// ---------- screens ----------
class UI {
  constructor(app) {
    this.app = app;
    this.treeSel = null;
    this.tab = 'model';
    this.infoOpen = false;
    $('#tree').addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('click', () => this.closeMenu());
    $('#docName').addEventListener('change', (e) => { const v = e.target.value.trim() || 'Part1'; app.change(() => { (app.mode === 'assembly' ? app.asm : app.doc).name = v; }); });
  }
  get vp() { return this.app.vp; }

  ribbonDefs() {
    const a = this.app;
    return {
      file: [
        ['File', [['new', 'New Part', () => a.newFile()], ['assembly', 'New Assembly', () => a.newAssemblyFile()], ['open', 'Open', () => a.openFile(), 'Ctrl+O'], ['save', 'Save', () => a.saveFile(), 'Ctrl+S'], ...(a.asm && a.editPid ? [['save', 'Save part only', () => a.saveFile(true)]] : [])]],
        ['Export', [['stl', 'STL (3D print)', () => a.exportFile('stl')], ['stl', 'STEP (other CAD)', () => a.exportFile('step')], ['camera', 'Picture', () => a.screenshot()]]],
        ['Setup', [['units', 'Units', () => this.openUnits()]]],
        ['Learn', [['examples', 'Examples', () => this.openExamples()], ['help', 'How to', () => this.openHelp()]]],
      ],
      model: [
        ...(a.asm && a.editPid ? [['Assembly', [['back', 'Back to assembly', () => a.returnToAssembly()]]]] : []),
        ['Sketch', [['sketch', 'Sketch', () => a.run('sketch'), 'S']]],
        ['Create', [['extrude', 'Extrude', () => a.run('extrude'), 'E'], ['revolve', 'Revolve', () => a.run('revolve'), 'R'], ['hole', 'Hole', () => a.run('hole'), 'H']]],
        ['Shapes', [['box', 'Box', () => a.run('primitive', { shape: 'box' })], ['cylinder', 'Cylinder', () => a.run('primitive', { shape: 'cylinder' })], ['sphere', 'Sphere', () => a.run('primitive', { shape: 'sphere' })]]],
        ['Modify', [['fillet', 'Fillet', () => a.run('fillet'), 'F'], ['chamfer', 'Chamfer', () => a.run('chamfer')], ['shell', 'Shell', () => a.run('shell')]]],
        ['Pattern', [['rectPattern', 'Rectangular', () => a.run('pattern', { kind: 'rect' })], ['circPattern', 'Circular', () => a.run('pattern', { kind: 'circ' })], ['mirror', 'Mirror', () => a.run('pattern', { kind: 'mirror' })], ['mirrorBody', 'Mirror Part', () => a.run('mirrorBody')]]],
        ['Setup', [['params', 'Parameters', () => this.openParams()]]],
        ['Document', [['drawing', 'Drawing', () => a.openDrawing()]]],
      ],
      drawing: [
        ['Annotate', [['select', 'Select', () => a.drw.setTool('select'), 'S'], ['g:↔', 'Size', () => a.drw.setTool('dim'), 'D'], ['g:A', 'Note', () => a.drw.setTool('note'), 'N'], ['trash', 'Delete', () => a.drw.deleteSel(), 'Del']]],
        ['Output', [['open', 'Print / PDF', () => a.drw.print()], ['stl', 'Save SVG', () => a.drw.saveSvg()]]],
        ['Exit', [['back', 'Close drawing', () => a.closeDrawing()]]],
      ],
      sketch: [
        ['Draw', [['line', 'Line', () => a.sk.setTool('line'), 'L'], ['rect', 'Rectangle', () => a.sk.setTool('rect'), 'R'], ['circle', 'Circle', () => a.sk.setTool('circle'), 'C'], ['arc', 'Arc', () => a.sk.setTool('arc'), 'A'], ['polygon', 'Polygon', () => a.sk.setTool('polygon'), 'P'], ['slot', 'Slot', () => a.sk.setTool('slot'), 'O']]],
        ['Edit', [['select', 'Select', () => a.sk.setTool('select'), 'S'], ['construction', 'Construction', () => a.sk.toggleConstruction(), 'X'], ['trash', 'Delete', () => a.sk.deleteSelected(), 'Del']]],
        ['Rules', [...['coincident', 'horizontal', 'vertical', 'parallel', 'perpendicular', 'equal', 'tangent', 'concentric', 'midpoint', 'fix'].map((k) => ['g:' + CONS_INFO[k].glyph, CONS_INFO[k].label, () => a.sk.setTool('c:' + k)]),
          ['g:A', 'Auto rules', () => { a.sk.autoCons = !a.sk.autoCons; this.renderRibbon(); a.toast(a.sk.autoCons ? 'Auto rules on: joined ends, level and upright lines get rules while you draw.' : 'Auto rules off.'); }],
          ['eye', 'Show rules', () => { a.sk.showCons = !a.sk.showCons; this.renderRibbon(); a.sk.redraw(); }]]],
        ['View', [['look', 'Look at', () => a.sk.lookAt()], ['grid', 'Snap to grid', () => a.toggleGrid(), 'G']]],
        ['Setup', [['params', 'Parameters', () => this.openParams()]]],
        ['Exit', [['finish', 'Finish Sketch', () => a.exitSketch()]]],
      ],
      inspect: a.mode === 'assembly' ? [
        ['Measure', [['measure', 'Measure', () => a.run('measure'), 'M']]],
        ['Check', [['clash', 'Interference', () => a.asmr.checkInterference()], ['bom', 'Parts list', () => a.asmr.openPartsList()]]],
      ] : [
        ['Measure', [['measure', 'Measure', () => a.run('measure'), 'M'], ['info', 'Part Info', () => this.openInfo()]]],
      ],
      assemble: [
        ['Parts', [['place', 'Place', () => a.run('place'), 'P'], ['move', 'Move / Turn', () => a.run('moveComp'), 'G']]],
        ['Constrain', [['mate', 'Mate', () => a.run('constrain', { type: 'mate' }), 'C'], ['flush', 'Flush', () => a.run('constrain', { type: 'flush' })], ['insert', 'Insert', () => a.run('constrain', { type: 'insert' })], ['axisMate', 'Axis', () => a.run('constrain', { type: 'axis' })], ['angleMate', 'Angle', () => a.run('constrain', { type: 'angle' })]]],
        ['Check', [['clash', 'Interference', () => a.asmr.checkInterference()], ['bom', 'Parts list', () => a.asmr.openPartsList()]]],
        ['Document', [['drawing', 'Drawing', () => a.openDrawing()]]],
      ],
      view: [
        ['Orientation', [['home', 'Home', () => this.vp.setView('home'), 'F6'], ['front', 'Front', () => this.vp.setView('front')], ['top', 'Top', () => this.vp.setView('top')], ['right', 'Right', () => this.vp.setView('right')], ['fit', 'Zoom all', () => this.vp.fit()]]],
        ['Style', [['shaded', 'Shaded', () => this.setStyle('shaded')], ['edges', 'With edges', () => this.setStyle('edges')], ['wire', 'Wireframe', () => this.setStyle('wire')]]],
        ['Show', [['planes', 'Origin planes', () => this.vp.showPlanes(!this.vp.planesVisible)]]],
        ['Picture', [['camera', 'Save picture', () => this.app.screenshot()]]],
      ],
    };
  }
  setStyle(s) { this.vp.applyStyle(s); this.renderRibbon(); }

  renderRibbon() {
    const mode = this.app.mode;
    const tabs = mode === 'drawing' ? [['drawing', 'Drawing']] : mode === 'sketch' ? [['sketch', 'Sketch'], ['inspect', 'Inspect'], ['view', 'View']] : mode === 'assembly' ? [['file', 'File'], ['assemble', 'Assemble'], ['inspect', 'Inspect'], ['view', 'View']] : [['file', 'File'], ['model', 'Model'], ['inspect', 'Inspect'], ['view', 'View']];
    if (!tabs.some((t) => t[0] === this.tab)) this.tab = tabs[0][0] === 'file' ? tabs[1][0] : tabs[0][0];
    $('#tabs').innerHTML = tabs.map(([k, l]) => `<button class="tab ${k === this.tab ? 'on' : ''} ${k === 'sketch' ? 'sketchtab' : ''}" data-tab="${k}">${l}</button>`).join('') +
      `<span class="spacer"></span><button class="tb-btn" id="undoBtn" title="Undo (Ctrl+Z)">${icon('undo', 18)}</button><button class="tb-btn" id="redoBtn" title="Redo (Ctrl+Y)">${icon('redo', 18)}</button><button class="tb-btn" id="helpBtn" title="How to use Pathway CAD">${icon('help', 18)}</button>`;
    for (const b of document.querySelectorAll('#tabs .tab')) b.onclick = () => { this.tab = b.dataset.tab; this.renderRibbon(); };
    $('#undoBtn').onclick = () => this.app.undo();
    $('#redoBtn').onclick = () => this.app.redo();
    $('#helpBtn').onclick = () => this.openHelp();
    const groups = this.ribbonDefs()[this.tab];
    const body = $('#ribbon');
    body.innerHTML = '';
    for (const [gname, btns] of groups) {
      const g = document.createElement('div');
      const compact = gname === 'Rules';
      g.className = 'rgroup' + (gname === 'Exit' ? ' exit' : '') + (gname === 'Assembly' ? ' back' : '') + (compact ? ' compact' : '');
      const row = document.createElement('div');
      row.className = 'rbtns';
      for (const [ic, label, fn, key] of btns) {
        const b = document.createElement('button');
        b.className = 'rbtn';
        b.dataset.ic = ic;
        b.innerHTML = icon(ic, compact ? 17 : 26) + `<span>${esc(label)}</span>`;
        b.title = label + (key ? ` (${key})` : '');
        b.onclick = (e) => { e.stopPropagation(); fn(); };
        if (this.tab === 'view' && ['shaded', 'edges', 'wire'].includes(ic) && this.vp && this.vp.style === ic) b.classList.add('on');
        row.appendChild(b);
      }
      g.appendChild(row);
      const cap = document.createElement('div');
      cap.className = 'rcap';
      cap.textContent = gname;
      g.appendChild(cap);
      body.appendChild(g);
    }
    if (this.app.mode === 'sketch') this.sketchToolChanged(this.app.sk.tool);
    if (this.app.mode === 'drawing') {
      const t = this.app.drw.tool;
      for (const b of document.querySelectorAll('#ribbon .rbtn')) b.classList.toggle('on', (t === 'select' && b.dataset.ic === 'select') || (t === 'dim' && b.dataset.ic === 'g:↔') || (t === 'note' && b.dataset.ic === 'g:A'));
    }
  }

  sketchToolChanged(tool) {
    for (const b of document.querySelectorAll('#ribbon .rbtn')) {
      const ic = b.dataset.ic;
      const sk = this.app.sk;
      const consOn = tool && tool.startsWith('c:') && ic === 'g:' + (CONS_INFO[tool.slice(2)] || {}).glyph;
      b.classList.toggle('on', ic === tool || consOn || (ic === 'grid' && sk && sk.gridOn) || (ic === 'g:A' && sk && sk.autoCons) || (ic === 'eye' && sk && sk.showCons));
    }
    if (this.app.mode === 'sketch') this.renderSketchPanel();
  }

  renderTitle() {
    const inp = $('#docName');
    const d = this.app.mode === 'assembly' ? this.app.asm : this.app.doc;
    if (document.activeElement !== inp) inp.value = d.name || 'Part1';
    document.title = `${d.name || 'Part'} - Pathway CAD`;
  }

  // ----- model browser -----
  renderTree() {
    const a = this.app, doc = a.doc;
    if (a.mode === 'assembly') { a.asmr.renderTree($('#tree')); return; }
    if (a.mode === 'drawing') {
      const t = a.drawTarget(), d = t.drawing || {};
      const views = Object.entries(d.views || {}).filter(([, on]) => on).map(([k]) => k);
      $('#tree').innerHTML = `<div class="trow backrow" data-act="closedraw">${icon('back', 16)}<span>Back to ${esc(t.name)}</span></div><div class="trow root">${icon('drawing', 16)}<b>${esc(t.name)} drawing</b></div>${views.map((v) => `<div class="trow sub">${icon('front', 16)}<span>${v[0].toUpperCase() + v.slice(1)} view</span></div>`).join('')}<div class="trow sub">${icon('g:↔', 16)}<span>${(d.dims || []).length} sizes you added</span></div><div class="trow sub">${icon('g:A', 16)}<span>${(d.notes || []).length} notes</span></div>`;
      $('#tree [data-act=closedraw]').onclick = () => a.closeDrawing();
      return;
    }
    const errs = a.result.errors || {}, warns = a.result.warnings || {};
    const end = doc.rollback ?? doc.features.length;
    let html = a.asm && a.editPid ? `<div class="trow backrow" data-act="back">${icon('back', 16)}<span>Back to ${esc(a.asm.name)}</span></div>` : '';
    html += `<div class="trow root">${icon('part', 16)}<b>${esc(doc.name || 'Part1')}</b></div>`;
    html += `<div class="trow sub" data-act="origin">${icon('origin', 16)}<span>Origin</span><span class="tmeta">${a.vp && a.vp.planesVisible ? 'shown' : ''}</span></div>`;
    const endRow = `<div class="trow endrow" data-act="end" title="Features below this line are switched off. Drag it with the menu on a feature: 'Roll back to here'.">${icon('end', 16)}<span>End of Part</span>${doc.rollback != null ? '<button class="mini" data-act="toend">move to end</button>' : ''}</div>`;
    doc.features.forEach((f, i) => {
      if (i === end) html += endRow;
      const fi = FEATURE_INFO[f.type] || FEATURE_INFO.primitive;
      const ic = f.type === 'primitive' ? (f.shape === 'sphere' ? 'sphere' : f.shape === 'cylinder' ? 'cylinder' : 'box') : f.type === 'pattern' ? (f.kind === 'circ' ? 'circPattern' : f.kind === 'mirror' ? 'mirror' : 'rectPattern') : fi.icon;
      const child = f.type === 'sketch' && doc.features.some((x) => x.sketch === f.id);
      const err = errs[f.id], warn = warns[f.id];
      const cls = ['trow', 'feat', i >= end ? 'after' : '', f.suppressed ? 'supp' : '', this.treeSel === f.id ? 'sel' : '', err ? 'bad' : '', a.mode === 'sketch' && a.sketchId === f.id ? 'editing' : '', child ? 'consumed' : ''].join(' ');
      html += `<div class="${cls}" data-id="${f.id}" title="${esc(err || warn || 'Double-click to edit. Right-click for more.')}">${icon(ic, 16)}<span class="tname">${esc(f.name)}</span>${err ? `<span class="tbad">${icon('err', 14)}</span>` : warn ? `<span class="twarn">${icon('warn', 14)}</span>` : ''}</div>`;
    });
    if (end >= doc.features.length) html += endRow;
    if (!doc.features.length) html += `<div class="tempty">Start with <b>Sketch</b> (or a Box) on the Model tab.</div>`;
    const tree = $('#tree');
    tree.innerHTML = html;
    for (const row of tree.querySelectorAll('.feat')) {
      const id = row.dataset.id;
      row.onclick = (e) => { e.stopPropagation(); this.treeSel = id; this.renderTree(); this.showFeatureError(id); };
      row.ondblclick = (e) => { e.stopPropagation(); if (a.mode === 'sketch') return; a.editFeature(id); };
      row.oncontextmenu = (e) => { e.preventDefault(); e.stopPropagation(); this.treeSel = id; this.renderTree(); this.featureMenu(id, e.clientX, e.clientY); };
    }
    const o = tree.querySelector('[data-act=origin]');
    if (o) o.onclick = () => { this.vp.showPlanes(!this.vp.planesVisible); this.renderTree(); };
    const bk = tree.querySelector('[data-act=back]');
    if (bk) bk.onclick = () => a.returnToAssembly();
    const te = tree.querySelector('[data-act=toend]');
    if (te) te.onclick = (e) => { e.stopPropagation(); a.change(() => { a.doc.rollback = null; }); };
  }
  showFeatureError(id) {
    const e = (this.app.result.errors || {})[id], w = (this.app.result.warnings || {})[id];
    if (e) this.toast(e, 'error'); else if (w) this.toast(w, 'warn');
  }
  featureMenu(id, x, y) {
    const a = this.app, f = a.findFeature(id), i = a.featureIndex(id);
    const items = [];
    if (a.mode !== 'sketch') {
      items.push([f.type === 'sketch' ? 'Edit sketch' : 'Edit', () => a.editFeature(id)]);
      if (f.sketch) items.push(['Edit its sketch', () => a.enterSketch(f.sketch)]);
    }
    items.push(['Rename', () => this.askText('Rename', f.name, (n) => a.change(() => { a.findFeature(id).name = n; }))]);
    if (a.mode !== 'sketch') {
      items.push([f.suppressed ? 'Turn on (unsuppress)' : 'Turn off (suppress)', () => a.change(() => { const g = a.findFeature(id); g.suppressed = !g.suppressed; })]);
      items.push(['Roll back to here', () => a.change(() => { a.doc.rollback = i; })]);
      if (i > 0) items.push(['Move up', () => a.change(() => { const F = a.doc.features; if (dependsOn(F[i], F[i - 1])) { a.toast(`${F[i].name} uses ${F[i - 1].name}, so it must stay below it.`, 'error'); return; } [F[i - 1], F[i]] = [F[i], F[i - 1]]; })]);
      if (i < a.doc.features.length - 1) items.push(['Move down', () => a.change(() => { const F = a.doc.features; if (dependsOn(F[i + 1], F[i])) { a.toast(`${F[i + 1].name} uses ${F[i].name}, so it must stay below it.`, 'error'); return; } [F[i + 1], F[i]] = [F[i], F[i + 1]]; })]);
      items.push(['Delete', () => a.deleteFeature(id), 'danger']);
    }
    this.menu(items, x, y);
  }
  menu(items, x, y) {
    this.closeMenu();
    const m = document.createElement('div');
    m.className = 'ctxmenu';
    for (const [label, fn, cls] of items) {
      const b = document.createElement('button');
      b.textContent = label;
      if (cls) b.className = cls;
      b.onclick = (e) => { e.stopPropagation(); this.closeMenu(); fn(); };
      m.appendChild(b);
    }
    document.body.appendChild(m);
    const r = m.getBoundingClientRect();
    m.style.left = Math.min(x, innerWidth - r.width - 8) + 'px';
    m.style.top = Math.min(y, innerHeight - r.height - 8) + 'px';
    this.menuEl = m;
  }
  closeMenu() { if (this.menuEl) { this.menuEl.remove(); this.menuEl = null; } }

  // ----- command panel -----
  openCmd(cmd) {
    this.cmdEl = $('#cmdPanel');
    this.cmdEl.hidden = false;
    this.refreshCmd();
    this.status(cmd.help);
  }
  closeCmd() { const p = $('#cmdPanel'); p.hidden = true; p.innerHTML = ''; }
  cmdError(msg) {
    const el = $('#cmdPanel .cmderr');
    if (!el) return;
    el.hidden = !msg;
    el.textContent = msg ? '⚠ ' + msg : '';
  }
  refreshCmd() {
    const a = this.app, cmd = a.cmd;
    if (!cmd) return;
    const p = $('#cmdPanel');
    const target = cmd.target || cmd.feature || cmd.draft || {};
    const P = a.params();
    let html = `<div class="cmdhead"><span>${esc(cmd.title)}</span><button class="x" data-act="cancel" title="Cancel (Esc)">×</button></div><div class="cmdhelp">${esc(cmd.help)}</div><div class="cmdbody">`;
    const U = a.units();
    const fields = (cmd.fields ? cmd.fields() : []).map((fd) => (fd && fd.label && U !== 'mm' ? { ...fd, label: fd.label.replace('(mm)', `(${U})`) } : fd));
    fields.forEach((fd, i) => {
      if (fd.type === 'note') html += `<div class="note">${esc(fd.text)}</div>`;
      else if (fd.type === 'html') html += `<div class="note">${fd.html}</div>`;
      else if (fd.type === 'preview') html += `<label class="chk"><input type="checkbox" data-preview ${cmd.preview ? 'checked' : ''}> Preview the result</label>`;
      else if (fd.type === 'expr') {
        const r = tryEval(target[fd.key], P);
        const show = r.ok ? (String(target[fd.key]).trim() === fmt(r.v) ? '' : '= ' + fmt(r.v)) : r.err;
        html += `<label class="fld"><span>${esc(fd.label)}</span><input data-i="${i}" value="${esc(target[fd.key] ?? '')}" spellcheck="false" autocomplete="off"><em class="${r.ok ? '' : 'bad'}">${esc(show)}${fd.hint && r.ok ? `<i>${esc(fd.hint)}</i>` : ''}</em></label>`;
      } else if (fd.type === 'select') {
        html += `<label class="fld"><span>${esc(fd.label)}</span><select data-i="${i}">${fd.options.map(([v, l]) => `<option value="${esc(v)}" ${String(target[fd.key]) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></label>`;
      } else if (fd.type === 'check') {
        html += `<label class="chk"><input type="checkbox" data-i="${i}" ${target[fd.key] ? 'checked' : ''}> ${esc(fd.label)}</label>`;
      } else if (fd.type === 'multi') {
        const cur = new Set(target[fd.key] || []);
        html += `<div class="fld"><span>${esc(fd.label)}</span><div class="multi">${fd.options.map(([v, l]) => `<label class="chk"><input type="checkbox" data-i="${i}" data-v="${esc(v)}" ${cur.has(v) ? 'checked' : ''}> ${esc(l)}</label>`).join('')}</div></div>`;
      } else if (fd.type === 'buttons') {
        html += `<div class="fld">${fd.label ? `<span>${esc(fd.label)}</span>` : ''}<div class="btnrow">${fd.items.map(([l], k) => `<button data-b="${i}:${k}">${esc(l)}</button>`).join('')}</div></div>`;
      } else if (fd.type === 'xyz') {
        const v = target[fd.key] || [0, 0, 0];
        html += `<div class="fld"><span>${esc(fd.label)}</span><div class="xyz">${['X', 'Y', 'Z'].map((ax, k) => `<label>${ax}<input data-i="${i}" data-k="${k}" value="${fmt(v[k])}"></label>`).join('')}</div></div>`;
      }
    });
    html += `</div><div class="cmderr" hidden></div><div class="cmdfoot">${cmd.noOk ? '' : `<button class="ok" data-act="ok">OK</button>`}<button data-act="cancel">${esc(cmd.closeLabel || 'Cancel')}</button></div>`;
    const focusedIdx = document.activeElement && p.contains(document.activeElement) ? document.activeElement.dataset.i : null;
    p.innerHTML = html;
    p.querySelectorAll('[data-act=cancel]').forEach((b) => (b.onclick = () => a.cancelCmd()));
    const ok = p.querySelector('[data-act=ok]');
    if (ok) ok.onclick = () => a.okCmd();
    for (const b of p.querySelectorAll('[data-b]')) {
      const [fi, k] = b.dataset.b.split(':').map(Number);
      b.onclick = () => fields[fi].items[k][1]();
    }
    const pv = p.querySelector('[data-preview]');
    if (pv) pv.onchange = () => { cmd.preview = pv.checked; a.hoverPick = null; a.cmdChanged(); };
    for (const el of p.querySelectorAll('[data-i]')) {
      const fd = fields[+el.dataset.i];
      const apply = () => {
        if (fd.type === 'expr') target[fd.key] = numOrExpr(el.value);
        else if (fd.type === 'select') target[fd.key] = el.value;
        else if (fd.type === 'check') target[fd.key] = el.checked;
        else if (fd.type === 'multi') {
          const s = new Set(target[fd.key] || []);
          if (el.checked) s.add(el.dataset.v); else s.delete(el.dataset.v);
          target[fd.key] = fd.options.map((o) => o[0]).filter((v) => s.has(v));
        } else if (fd.type === 'xyz') {
          const r = tryEval(el.value, P);
          if (!r.ok) return;
          target[fd.key] = [...(target[fd.key] || [0, 0, 0])];
          target[fd.key][+el.dataset.k] = r3(r.v);
        }
        if (fd.onChange) fd.onChange();
        if (fd.type === 'expr') {
          const r = tryEval(target[fd.key], P);
          const em = el.nextElementSibling;
          em.className = r.ok ? '' : 'bad';
          em.textContent = r.ok ? (String(target[fd.key]).trim() === fmt(r.v) ? '' : '= ' + fmt(r.v)) : r.err;
          if (cmd.onField) { if (r.ok) cmd.onField(fd); return; }
          a.refreshHighlights();
          a.rebuild();
        } else { if (cmd.onField) cmd.onField(fd); a.cmdChanged(); }
      };
      el.addEventListener(fd.type === 'expr' ? 'input' : 'change', apply);
      if (fd.type === 'xyz') el.addEventListener('change', () => a.cmdChanged());
    }
    if (focusedIdx != null) { const el = p.querySelector(`[data-i="${focusedIdx}"]`); if (el) el.focus(); }
    else { const first = p.querySelector('input[data-i]:not([type=checkbox])'); if (first && !a.cmd.want) { first.focus(); first.select(); } }
  }

  // ----- sketch panel -----
  enterSketch() {
    this.tab = 'sketch';
    this.renderRibbon();
    document.body.classList.add('sketching');
    $('#sketchPanel').hidden = false;
    this.renderSketchPanel();
    this.renderTree();
  }
  exitSketch() {
    document.body.classList.remove('sketching');
    $('#sketchPanel').hidden = true;
    this.tab = 'model';
    this.renderRibbon();
    this.renderTree();
  }
  sketchSelection() { this.renderSketchPanel(); }
  sketchInfo(sk) {
    const el = $('#sketchStats');
    if (!el) return;
    const n = (sk.loops || []).filter((l) => l.depth % 2 === 0).length;
    const bad = (sk.evals || []).filter((x) => x.err);
    const sf = this.app.sketchFeature();
    const nRules = sf && sf.constraints ? sf.constraints.length : 0;
    const nBad = sk.badCons ? sk.badCons.size : 0;
    el.innerHTML = `${n ? `<span class="good">✔ ${n} closed shape${n > 1 ? 's' : ''}</span>` : '<span class="muted">No closed shape yet</span>'}${sk.openEnds ? ` · <span class="bad">${sk.openEnds} open chain${sk.openEnds > 1 ? 's' : ''} (red dots)</span>` : ''}${bad.length ? ` · <span class="bad">${esc(bad[0].err)}</span>` : ''}${nRules ? ` · ${nRules} rule${nRules > 1 ? 's' : ''}` : ''}${nBad ? ` · <span class="bad">${nBad} not met</span>` : ''}`;
  }
  setGridStep(s) { const el = $('#gridStep'); if (el) el.textContent = this.app.sk.gridOn ? `grid ${fmt(s)} ${this.app.units()}` : 'grid off'; }
  renderSketchPanel() {
    const a = this.app, sk = a.sk, f = a.sketchFeature();
    if (!f) return;
    const P = a.params();
    const sel = f.entities.filter((e) => sk.sel.has(e.id));
    let html = `<div class="cmdhead"><span>${esc(f.name)}</span></div>`;
    html += `<div class="note" id="sketchStats"></div>`;
    html += `<div class="cmdbody">`;
    if (sk.tool === 'polygon') html += `<label class="fld"><span>Polygon sides</span><input id="polySides" type="number" min="3" max="64" value="${sk.polySides}"></label>`;
    if (sel.length === 1) {
      const e = sel[0];
      const keys = { line: [['x1', 'Start X'], ['y1', 'Start Y'], ['x2', 'End X'], ['y2', 'End Y']], rect: [['x', 'Corner X'], ['y', 'Corner Y'], ['w', 'Width'], ['h', 'Height']], circle: [['cx', 'Center X'], ['cy', 'Center Y'], ['r', 'Radius']], arc: [['x1', 'Start X'], ['y1', 'Start Y'], ['x2', 'End X'], ['y2', 'End Y'], ['xm', 'Through X'], ['ym', 'Through Y']], polygon: [['cx', 'Center X'], ['cy', 'Center Y'], ['r', 'Corner radius'], ['n', 'Sides'], ['rot', 'Turn (°)']], slot: [['x1', 'End 1 X'], ['y1', 'End 1 Y'], ['x2', 'End 2 X'], ['y2', 'End 2 Y'], ['w', 'Width']] }[e.type] || [];
      const names = { line: 'Line', rect: 'Rectangle', circle: 'Circle', arc: 'Arc', polygon: 'Polygon', slot: 'Slot' };
      html += `<div class="subhead">${names[e.type]}${e.construction ? ' (construction)' : ''}</div>`;
      for (const [k, l] of keys) {
        const r = tryEval(e[k], P);
        html += `<label class="fld"><span>${l}</span><input data-k="${k}" value="${esc(e[k])}" spellcheck="false"><em class="${r.ok ? '' : 'bad'}">${r.ok ? (String(e[k]).trim() === fmt(r.v) ? '' : '= ' + fmt(r.v)) : esc(r.err)}</em></label>`;
      }
      html += `<label class="chk"><input type="checkbox" id="consChk" ${e.construction ? 'checked' : ''}> Construction (dashed helper line, not part of the shape)</label>`;
      const rules = sk.consFor(e.id);
      if (rules.length) html += `<div class="fld"><span>Rules on it</span><div class="rulelist">${rules.map((c) => `<span class="rule ${sk.badCons && sk.badCons.has(c.id) ? 'bad' : ''}">${esc(sk.consLabel(c))}<button data-delcons="${c.id}" title="Remove this rule">×</button></span>`).join('')}</div></div>`;
    } else if (sel.length > 1) html += `<div class="note">${sel.length} items picked. Press Delete to remove them, or X for construction.</div>`;
    else if (sk.selCons.size) html += `<div class="note">${[...sk.selCons].map((id) => { const c = (f.constraints || []).find((x) => x.id === id); return c ? esc(sk.consLabel(c)) : ''; }).join(', ')} rule picked. Press Delete to remove it.</div>`;
    else html += `<div class="note muted">${esc(TOOL_TIPS[sk.tool] || (sk.tool.startsWith('c:') ? CONS_INFO[sk.tool.slice(2)].label + ': ' + CONS_INFO[sk.tool.slice(2)].help + (sk.picks.length ? ' (1 picked)' : '') : ''))}</div>`;
    const off = f.offset ?? 0, ro = tryEval(off, P);
    html += `<details class="planeopts"><summary>Sketch plane</summary><label class="fld"><span>Offset from plane (${a.units()})</span><input id="planeOff" value="${esc(off)}"><em class="${ro.ok ? '' : 'bad'}">${ro.ok ? '' : esc(ro.err)}</em></label></details>`;
    html += `</div><div class="cmdfoot"><span id="gridStep" class="muted"></span><button class="ok" id="finishBtn">${icon('finish', 16)} Finish Sketch</button></div>`;
    const p = $('#sketchPanel');
    const focused = document.activeElement && p.contains(document.activeElement) ? document.activeElement.dataset.k : null;
    p.innerHTML = html;
    for (const b of p.querySelectorAll('[data-delcons]')) b.onclick = () => sk.deleteConstraints(new Set([b.dataset.delcons]));
    this.sketchInfo(sk);
    this.setGridStep(sk.gridStep());
    $('#finishBtn').onclick = () => a.exitSketch();
    const ps = $('#polySides');
    if (ps) ps.onchange = () => { sk.polySides = Math.max(3, Math.min(64, Math.round(+ps.value || 6))); };
    const cc = $('#consChk');
    if (cc) cc.onchange = () => sk.toggleConstruction();
    const po = $('#planeOff');
    po.onchange = () => {
      const r = tryEval(po.value, P);
      if (!r.ok) return this.toast(r.err, 'error');
      a.change(() => { a.sketchFeature().offset = numOrExpr(po.value); });
      // Re-enter so the drawing plane moves.
      const id = a.sketchId, isNew = a.sketchIsNew, cam = a.savedCam;
      a.exitSketch(true); a.enterSketch(id, isNew); a.savedCam = cam;
    };
    for (const inp of p.querySelectorAll('input[data-k]')) {
      inp.addEventListener('change', () => {
        const e = sel[0];
        const r = tryEval(inp.value, P);
        if (!r.ok) { this.toast(r.err, 'error'); return; }
        const k = inp.dataset.k;
        const old = [tryEval(e[k === 'y1' ? 'x1' : k === 'y2' ? 'x2' : k], P).v, tryEval(e[k === 'x1' ? 'y1' : k === 'x2' ? 'y2' : k], P).v];
        a.change(() => {
          const ent = a.sketchFeature().entities.find((x) => x.id === e.id);
          // Keep joined end points together.
          if (['x1', 'y1', 'x2', 'y2'].includes(k) && (e.type === 'line' || e.type === 'arc')) {
            const pk = k[1];
            const others = sk.coincident(old, { e: ent, kx: 'x' + pk });
            ent[k] = numOrExpr(inp.value);
            const nx = tryEval(ent['x' + pk], P).v, ny = tryEval(ent['y' + pk], P).v;
            for (const h of others) { h.e[h.kx] = r3(nx); h.e[h.ky] = r3(ny); }
          } else ent[k] = numOrExpr(inp.value);
        });
        sk.recompute(); sk.redraw();
        this.renderSketchPanel();
      });
    }
    if (focused) { const el = p.querySelector(`[data-k="${focused}"]`); if (el) el.focus(); }
  }

  // ----- parameters -----
  openParams() {
    const a = this.app;
    const draw = () => {
      const P = a.params();
      const rows = a.doc.params.map((p, i) => {
        const r = tryEval(p.expr, P);
        return `<tr><td><input data-i="${i}" data-f="name" value="${esc(p.name)}" spellcheck="false"></td><td><input data-i="${i}" data-f="expr" value="${esc(p.expr)}" spellcheck="false"></td><td class="${r.ok ? '' : 'bad'}">${r.ok ? fmt(r.v) : esc(r.err)}</td><td><input data-i="${i}" data-f="note" value="${esc(p.note || '')}" placeholder="what it is for"></td><td><button class="mini danger" data-del="${i}">✕</button></td></tr>`;
      }).join('');
      this.modal(`<h2>${icon('params', 22)} Parameters</h2>
        <p>Name a size once and use the name anywhere you type a number, like <code>width</code> or <code>width/2 + 3</code>. Change it here and the whole part updates.</p>
        <table class="ptable"><thead><tr><th>Name</th><th>Value or formula</th><th>=</th><th>Note</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="5" class="muted">No parameters yet.</td></tr>'}</tbody></table>
        <p><button id="addParam">+ Add parameter</button></p>
        <p class="muted">Formulas can use + − × ÷ (written * and /), ^ for powers, brackets, other parameter names, pi, sqrt(), sin(), cos(), tan() (in degrees), min(), max(), round().</p>`, 'wide');
      $('#addParam').onclick = () => {
        let n = 1; while (a.doc.params.some((p) => p.name === 'size' + n)) n++;
        a.change(() => a.doc.params.push({ name: 'size' + n, expr: '10', note: '' }));
        draw();
      };
      for (const b of document.querySelectorAll('#modal [data-del]')) b.onclick = () => {
        const p = a.doc.params[+b.dataset.del];
        if (JSON.stringify(a.doc.features).match(new RegExp(`\\b${p.name}\\b`)) && !confirm(`"${p.name}" is used in the part. Delete it anyway? (Those features will show an error.)`)) return;
        a.change(() => a.doc.params.splice(+b.dataset.del, 1)); draw();
      };
      for (const inp of document.querySelectorAll('#modal input[data-i]')) inp.onchange = () => {
        const i = +inp.dataset.i, fld = inp.dataset.f, v = inp.value.trim();
        if (fld === 'name') {
          if (!/^[A-Za-z_][A-Za-z_0-9]*$/.test(v)) { this.toast('Names use letters, numbers and _ and start with a letter.', 'error'); draw(); return; }
          if (['pi', 'PI', 'sin', 'cos', 'tan', 'sqrt', 'abs', 'min', 'max', 'round', 'floor', 'ceil'].includes(v)) { this.toast(`"${v}" is a built-in name. Pick another.`, 'error'); draw(); return; }
          if (a.doc.params.some((p, j) => j !== i && p.name === v)) { this.toast('That name is taken.', 'error'); draw(); return; }
          const old = a.doc.params[i].name;
          const rename = old && old !== v && confirm(`Also change "${old}" to "${v}" everywhere it is used?`);
          a.change(() => {
            a.doc.params[i].name = v;
            if (rename) {
              const re = new RegExp(`\\b${old}\\b`, 'g');
              const fix = (o) => { for (const k in o) { if (typeof o[k] === 'string' && k !== 'id' && k !== 'name' && k !== 'type') o[k] = o[k].replace(re, v); else if (o[k] && typeof o[k] === 'object') fix(o[k]); } };
              fix(a.doc.features);
              for (const p of a.doc.params) p.expr = String(p.expr).replace(re, v);
            }
          });
        } else a.change(() => { a.doc.params[i][fld] = fld === 'expr' ? numOrExpr(v) : v; });
        draw();
        if (a.mode === 'sketch') a.sk.redraw();
        if (a.cmd) this.refreshCmd();
      };
    };
    draw();
  }

  // ----- units -----
  openUnits() {
    const a = this.app, isAsm = a.mode === 'assembly';
    const d = isAsm ? a.asm : a.doc;
    const cur = d.units || 'mm';
    const lp = isAsm ? new Set() : lengthParams(d);
    const params = isAsm ? [] : d.params;
    this.modal(`<h2>${icon('units', 22)} Units for ${esc(d.name)}</h2>
      <p>${isAsm ? 'Positions and gaps in this assembly use these units. Each part keeps its own units and is sized correctly when placed.' : 'Every size you type in this part uses these units. Exported STL and STEP files are always in millimetres, which is what 3D printers and other CAD programs expect.'}</p>
      ${Object.entries(UNIT_NAMES).map(([k, n]) => `<label class="chk"><input type="radio" name="un" value="${k}" ${k === cur ? 'checked' : ''}> ${n}</label>`).join('')}
      <label class="chk"><input type="checkbox" id="unConv" checked> Convert the sizes so the ${isAsm ? 'assembly' : 'part'} stays the same real size</label>
      ${params.length ? `<div class="fld" id="unParams"><span>Parameters to convert (tick the ones that are lengths)</span><div class="multi">${params.map((p) => `<label class="chk"><input type="checkbox" data-p="${esc(p.name)}" ${lp.has(p.name) ? 'checked' : ''}> ${esc(p.name)} = ${esc(p.expr)}</label>`).join('')}</div></div>` : ''}
      <p class="muted">Untick "Convert" to keep the numbers as they are (a 10 mm block becomes a 10 in block).</p>
      <div class="welcomebtns"><button class="ok" id="unOk">Apply</button><button id="unNo">Cancel</button></div>`);
    $('#unNo').onclick = () => this.closeModal();
    $('#unOk').onclick = () => {
      const to = document.querySelector('#modal input[name=un]:checked').value;
      const conv = $('#unConv').checked;
      const pset = new Set([...document.querySelectorAll('#modal [data-p]')].filter((x) => x.checked).map((x) => x.dataset.p));
      this.closeModal();
      if (to === cur) return;
      let skipped = 0;
      a.change(() => {
        d.units = to;
        if (!conv) return;
        const k = UNIT_MM[cur] / UNIT_MM[to];
        if (isAsm) convertAssembly(d, k); else skipped = convertPart(d, k, pset);
      });
      if (a.mode === 'sketch') { a.sk.recompute(); a.sk.redraw(); }
      this.renderStatusInfo();
      this.toast(`Now using ${UNIT_NAMES[to]}.` + (skipped ? ` ${skipped} formula(s) with numbers in them were left as typed; check them.` : ''), skipped ? 'warn' : '');
    };
  }

  // ----- part info -----
  openInfo() { this.infoOpen = true; this.renderInfo(); }
  renderInfo() {
    const a = this.app, d = a.result.desc, doc = a.doc;
    const mat = MATERIALS[doc.material] || MATERIALS.pla;
    let body = '<p class="muted">There is no solid yet.</p>';
    if (d) {
      const size = d.bb[1].map((v, i) => v - d.bb[0][i]);
      const u = doc.units || 'mm', k = UNIT_MM[u];
      const volMm = d.volume * k * k * k, areaMm = d.area * k * k;
      const massG = (volMm / 1000) * mat.density;
      body = `<table class="info">
        <tr><th>Size (X × Y × Z)</th><td>${size.map(fmt).join(' × ')} ${u}</td></tr>
        <tr><th>Volume</th><td>${u === 'in' ? `${fmt(d.volume)} in³ <span class="muted">(${fmt(volMm / 1000)} cm³)</span>` : `${fmt(volMm / 1000)} cm³ <span class="muted">(${fmt(volMm)} mm³)</span>`}</td></tr>
        <tr><th>Surface area</th><td>${u === 'in' ? `${fmt(d.area)} in² <span class="muted">(${fmt(areaMm / 100)} cm²)</span>` : `${fmt(areaMm / 100)} cm² <span class="muted">(${fmt(areaMm)} mm²)</span>`}</td></tr>
        <tr><th>Mass in ${esc(mat.name)}</th><td><b>${massG >= 1000 ? fmt(massG / 1000) + ' kg' : fmt(massG) + ' g'}</b> <span class="muted">(${fmt(massG / 453.592)} lb · density ${mat.density} g/cm³)</span></td></tr>
        <tr><th>Faces / edges</th><td>${d.faces.length} / ${d.edges.length}</td></tr>
      </table>`;
    }
    this.modal(`<h2>${icon('info', 22)} Part Info: ${esc(doc.name)}</h2>${body}
      <label class="fld"><span>Material</span><select id="matSel">${Object.entries(MATERIALS).map(([k, m]) => `<option value="${k}" ${k === doc.material ? 'selected' : ''}>${esc(m.name)}</option>`).join('')}</select></label>
      <label class="fld"><span>Color on screen</span><input type="color" id="colorSel" value="${esc(doc.color)}"></label>`, '', () => { this.infoOpen = false; });
    $('#matSel').onchange = (e) => { a.change(() => { a.doc.material = e.target.value; }); this.renderInfo(); };
    $('#colorSel').oninput = (e) => { a.doc.color = e.target.value; this.vp.setColor(e.target.value); };
    $('#colorSel').onchange = (e) => a.change(() => { a.doc.color = e.target.value; });
  }
  // ----- drawing settings panel -----
  renderDrawPanel() {
    const a = this.app, drw = a.drw;
    if (a.mode !== 'drawing') return;
    const t = a.drawTarget(), d = t.drawing;
    const p = $('#cmdPanel');
    p.hidden = false;
    const sel = (key, opts, val) => `<select data-dk="${key}">${opts.map(([v, l]) => `<option value="${esc(v)}" ${String(val) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
    const scales = [['auto', 'Fit the sheet' + (drw.L ? ` (now ${drw.L.scale >= 1 ? fmt(drw.L.scale) + ':1' : '1:' + fmt(1 / drw.L.scale)})` : '')], ...[[5, '5:1'], [2, '2:1'], [1, '1:1'], [0.5, '1:2'], [0.25, '1:4'], [0.2, '1:5'], [0.1, '1:10'], [0.05, '1:20']]];
    const tf = (k, label) => `<label class="fld"><span>${label}</span><input data-tk="${k}" value="${esc(d.title[k] || '')}"></label>`;
    p.innerHTML = `<div class="cmdhead"><span>Drawing sheet</span><button class="x" data-act="closedraw" title="Close drawing (Esc)">×</button></div>
      <div class="cmdhelp">${esc(drw.tool === 'dim' ? (drw.picks.length ? `Point ${drw.picks.length} picked. ${drw.picks.length === 1 ? 'Click a second point in the same view.' : 'Click where the size line goes.'}` : 'Click two corners, line ends or hole centers in one view, then click where the size goes (Shift = slanted).') : drw.tool === 'note' ? 'Click on the sheet where the note goes.' : 'Views, sizes and the title block update when the part changes.')}</div>
      <div class="cmdbody">
      <label class="fld"><span>Paper</span>${sel('sheet', Object.entries(SHEETS).map(([k, v]) => [k, v.name]), d.sheet)}</label>
      <label class="fld"><span>Scale</span>${sel('scale', scales, d.scale)}</label>
      <label class="fld"><span>View layout</span>${sel('projection', [['third', 'Third angle (USA)'], ['first', 'First angle (Europe)']], d.projection)}</label>
      <div class="fld"><span>Views</span><div class="btnrow">${['front', 'top', 'right', 'iso'].map((v) => `<label class="chk"><input type="checkbox" data-vk="${v}" ${d.views[v] ? 'checked' : ''}> ${v === 'iso' ? 'Iso' : v[0].toUpperCase() + v.slice(1)}</label>`).join(' ')}</div></div>
      <label class="chk"><input type="checkbox" data-bk="hidden" ${d.hidden ? 'checked' : ''}> Hidden lines (dashed)</label>
      <label class="chk"><input type="checkbox" data-bk="autoDims" ${d.autoDims ? 'checked' : ''}> Overall sizes</label>
      <label class="chk"><input type="checkbox" data-bk="holeNotes" ${d.holeNotes ? 'checked' : ''}> Hole sizes (Ø)</label>
      <label class="fld"><span>Decimal places</span>${sel('decimals', [[0, '0'], [1, '1'], [2, '2'], [3, '3']], d.decimals)}</label>
      <details open class="planeopts"><summary>Title block</summary>
      ${tf('drawnBy', 'Drawn by')}${tf('school', 'School')}${tf('course', 'Class / period')}${tf('date', 'Date')}${tf('partNo', 'Part number')}
      </details>
      ${drw.sel ? `<div class="note">A ${drw.sel[0] === 'd' ? 'size' : 'note'} is picked. Press Delete to remove it.</div>` : ''}
      </div>
      <div class="cmdfoot"><button data-act="print">Print / PDF</button><button class="ok" data-act="closedraw2">Done</button></div>`;
    p.querySelectorAll('[data-act=closedraw],[data-act=closedraw2]').forEach((b) => (b.onclick = () => a.closeDrawing()));
    p.querySelector('[data-act=print]').onclick = () => drw.print();
    for (const el of p.querySelectorAll('[data-dk]')) el.onchange = () => { const k = el.dataset.dk; a.change(() => { d[k] = k === 'scale' ? (el.value === 'auto' ? 'auto' : +el.value) : k === 'decimals' ? +el.value : el.value; }); if (k === 'sheet' || k === 'scale') drw.fitZoom = true; };
    for (const el of p.querySelectorAll('[data-vk]')) el.onchange = () => a.change(() => { d.views[el.dataset.vk] = el.checked; });
    for (const el of p.querySelectorAll('[data-bk]')) el.onchange = () => a.change(() => { d[el.dataset.bk] = el.checked; });
    for (const el of p.querySelectorAll('[data-tk]')) el.onchange = () => a.change(() => { d.title[el.dataset.tk] = el.value; });
  }

  renderStatusInfo() {
    if (this.app.mode === 'drawing') return;
    if (this.app.mode === 'assembly') {
      const A = this.app.asm, bad = Object.keys(this.app.asmr.bad).length;
      $('#statusRight').innerHTML = `${bad ? `<span class="bad">${bad} constraint${bad > 1 ? 's' : ''} not met</span> · ` : ''}${A.components.length} parts · ${A.constraints.length} constraints · <button class="linkbtn" id="unitBtn" title="Change units">${esc(A.units || 'mm')}</button>`;
      $('#unitBtn').onclick = () => this.openUnits();
      return;
    }
    const d = this.app.result.desc;
    const nErr = Object.keys(this.app.result.errors || {}).length;
    $('#statusRight').innerHTML = `${nErr ? `<span class="bad">${nErr} feature${nErr > 1 ? 's' : ''} with problems</span> · ` : ''}${d ? (this.app.units() === 'in' ? `Volume ${fmt(d.volume)} in³ · ` : `Volume ${fmt(d.volume / 1000)} cm³ · `) : ''}<button class="linkbtn" id="unitBtn" title="Change units">${this.app.units()}</button> · ${this.app.result.ms ? Math.round(this.app.result.ms) + ' ms' : ''}`;
    $('#unitBtn').onclick = () => this.openUnits();
  }

  // ----- modals, help -----
  modal(html, cls = '', onClose) {
    const m = $('#modal');
    m.hidden = false;
    m.innerHTML = `<div class="mbox ${cls}"><button class="x mclose" title="Close">×</button>${html}</div>`;
    this._onClose = onClose;
    m.querySelector('.mclose').onclick = () => this.closeModal();
    m.onclick = (e) => { if (e.target === m) this.closeModal(); };
  }
  askText(title, value, done) {
    this.modal(`<h2>${esc(title)}</h2><label class="fld"><input id="askInp" value="${esc(value)}" spellcheck="false"></label><div class="welcomebtns"><button class="ok" id="askOk">OK</button><button id="askNo">Cancel</button></div>`);
    const inp = $('#askInp');
    inp.focus(); inp.select();
    const ok = () => { const v = inp.value.trim(); this.closeModal(); if (v && v !== value) done(v); };
    $('#askOk').onclick = ok;
    $('#askNo').onclick = () => this.closeModal();
    inp.onkeydown = (e) => { e.stopPropagation(); if (e.key === 'Enter') ok(); if (e.key === 'Escape') this.closeModal(); };
  }
  modalOpen() { return !$('#modal').hidden; }
  closeModal() { const m = $('#modal'); m.hidden = true; m.innerHTML = ''; if (this._onClose) { const f = this._onClose; this._onClose = null; f(); } }

  openExamples() {
    this.modal(`<h2>${icon('examples', 22)} Examples</h2><p>Open one to see how it was built. Double-click any step in the tree to change it.</p><h3>Parts</h3><div class="excards">${EXAMPLES.map((e, i) => `<button class="excard" data-i="${i}"><b>${esc(e.title)}</b><span>${esc(e.about)}</span></button>`).join('')}</div><h3>Assemblies</h3><div class="excards">${ASM_EXAMPLES.map((e, i) => `<button class="excard" data-a="${i}"><b>${esc(e.title)}</b><span>${esc(e.about)}</span></button>`).join('')}</div>`, 'wide');
    const busy = () => { const r = this.app.root; return (r.features && r.features.length) || (r.components && r.components.length); };
    for (const b of document.querySelectorAll('.excard[data-i]')) b.onclick = () => {
      if (busy() && !confirm('Open the example? What is open now is replaced (save it first if you want to keep it).')) return;
      this.closeModal();
      this.app.setDoc(clone(EXAMPLES[+b.dataset.i].doc));
    };
    for (const b of document.querySelectorAll('.excard[data-a]')) b.onclick = () => {
      if (busy() && !confirm('Open the example? What is open now is replaced (save it first if you want to keep it).')) return;
      this.closeModal();
      this.app.openAssembly(clone(ASM_EXAMPLES[+b.dataset.a].doc));
    };
  }
  showWelcome() {
    this.modal(`<img class="welcomelogo" src="assets/logo.png" alt="Pathway CAD">
      <p>Design real 3D parts, then export them for a 3D printer or another CAD program.</p>
      <ol class="steps"><li><b>Sketch</b> a flat shape on a plane.</li><li><b>Extrude</b> or <b>Revolve</b> it into a solid.</li><li>Add <b>holes, fillets and patterns</b>.</li><li><b>Export STL</b> to 3D print it.</li></ol>
      <p><b>Mouse:</b> right-drag turns the view, middle-drag (or Shift + right-drag) slides it, the wheel zooms.</p>
      <div class="welcomebtns"><button class="ok" id="wStart">Start a new part</button><button id="wAsm">New assembly</button><button id="wEx">Open an example</button><button id="wHelp">How to</button></div>`);
    $('#wAsm').onclick = () => { this.closeModal(); this.app.openAssembly(newAssembly()); this.app.asmr.placeDialog(); };
    $('#wStart').onclick = () => { this.closeModal(); this.app.run('sketch'); };
    $('#wEx').onclick = () => this.openExamples();
    $('#wHelp').onclick = () => this.openHelp();
  }
  openHelp() {
    this.modal(`<h2><img class="helplogo" src="assets/icon-256.png" alt="">How to use Pathway CAD</h2>
      <div class="help">
      <h3>Moving around</h3>
      <ul><li><b>Turn:</b> right mouse drag. <b>Slide:</b> middle mouse drag or Shift + right drag. <b>Zoom:</b> mouse wheel (zooms toward the pointer).</li>
      <li>View tab: Home, Front, Top, Right, Zoom all. F6 = Home.</li></ul>
      <h3>1. Sketch</h3>
      <ul><li>Model ▸ Sketch, then click a colored plane (blue = floor, green = front, red = side) or a flat face of your part.</li>
      <li>Draw with Line, Rectangle, Circle, Arc, Polygon and Slot. Clicks snap to the grid and to the ends and centers of other shapes (orange dot).</li>
      <li>Click a <span class="dimchip">blue number</span> to type an exact size. You can type a parameter name or a formula like <code>width/2</code>.</li>
      <li>A shape must be <b>closed</b> to become a solid. Closed areas are shaded. <b style="color:#d62f2f">Red dots</b> are line ends that do not meet anything.</li>
      <li>Select tool: click to pick, drag a dot to move it. Delete removes. <b>Construction</b> (X) turns a line into a dashed helper, e.g. a spin axis for Revolve.</li>
      <li><b>Rules</b> keep a sketch neat when sizes change: Coincident (join points), Horizontal, Vertical, Parallel, Perpendicular, Equal, Tangent, Concentric, Midpoint and Fix. Pick a rule, then click the shapes. With <b>Auto rules</b> on, joined ends and level/upright lines get rules as you draw. Badges show each rule; click one and press Delete to remove it.</li>
      <li>A size you type on a line or arc becomes a rule too, so it stays that size when you drag other points.</li>
      <li>Press <b>Finish Sketch</b>. A new closed sketch goes straight to Extrude.</li></ul>
      <h3>2. Make it solid</h3>
      <ul><li><b>Extrude</b> pushes the sketch out. Choose "Remove material" to cut a pocket, or "Through everything" for a cut-out.</li>
      <li><b>Revolve</b> spins a sketch around an axis (draw the profile on one side of a construction line).</li>
      <li><b>Box, Cylinder, Sphere</b> are quick starting shapes.</li></ul>
      <h3>3. Details</h3>
      <ul><li><b>Hole</b>: click a flat face, then set diameter, depth and type (counterbore for bolt heads, countersink for flat screws).</li>
      <li><b>Fillet</b> rounds edges, <b>Chamfer</b> bevels them: click edges, set the size.</li>
      <li><b>Shell</b> hollows the part. Click faces to leave open.</li>
      <li><b>Patterns</b> copy features in rows, in a circle, or mirrored. <b>Mirror Part</b> mirrors everything.</li></ul>
      <h3>Changing your mind</h3>
      <ul><li>The <b>model tree</b> on the left is your recipe. Double-click a step to change it; the part rebuilds.</li>
      <li>Right-click a step to rename, turn it off, roll back, move or delete it. A step with a ✕ has a problem: click it to read why.</li>
      <li><b>Parameters</b> are named sizes. Change one and every place it is used updates.</li>
      <li>Undo: Ctrl+Z. Redo: Ctrl+Y.</li></ul>
      <h3>Assemblies: putting parts together</h3>
      <ul><li>File ▸ <b>New Assembly</b>, then <b>Place</b> parts: from a saved .pcad file, an example, a copy of a part already there, or a brand-new part.</li>
      <li>The first part is <b>grounded</b> (fixed in place, pin icon). Other parts can be dragged with the left mouse button.</li>
      <li><b>Constraints</b> hold parts together. Click a face or edge on the part that stays put, then one on the part to move:
        <b>Mate</b> (faces touching), <b>Flush</b> (faces level), <b>Insert</b> (pin or bolt into a hole, using round edges), <b>Axis</b> (same center line, can still spin and slide), <b>Angle</b>.</li>
      <li>A constraint with a ✕ cannot be met with the others. Right-click it to flip it or turn it off.</li>
      <li>Drag a part to see how it can still move: a pin with only an Axis constraint slides and spins in its hole.</li>
      <li>Double-click a part in the tree to <b>edit it</b> right there; press <b>Back to assembly</b> when done. Every copy of that part changes.</li>
      <li>Inspect ▸ <b>Interference</b> finds parts that run into each other (shown in red). <b>Parts list</b> counts parts and adds up the mass.</li></ul>
      <h3>Drawings (2D plans)</h3>
      <ul><li>Press <b>Drawing</b> (Model or Assemble tab) to make a printable sheet with front, top, right and isometric views. Hidden edges are dashed.</li>
      <li>Overall sizes and hole sizes are added for you. <b>Size</b> (D): click two corners or hole centers in one view, then click where the size line goes. <b>Note</b> (N) adds text.</li>
      <li>Pick the paper, scale, view layout (USA third angle or European first angle) and fill in the title block on the left.</li>
      <li><b>Print / PDF</b> prints at real scale (choose "Save as PDF" as the printer to make a PDF). <b>Save SVG</b> saves a file for a laser cutter or Inkscape. Assembly drawings include a parts list.</li></ul>
      <h3>Units</h3>
      <ul><li>Click the unit at the bottom right (or File ▸ Units) to switch between millimetres and inches. You can convert the sizes so the part stays the same real size.</li></ul>
      <h3>Saving and sharing</h3>
      <ul><li>File ▸ Save downloads a <b>.pcad</b> part file or a <b>.pasm</b> assembly file (the assembly file holds its parts inside it). File ▸ Open loads it again. Your work is also kept on this computer automatically.</li>
      <li>Export <b>STL</b> for 3D printing (slicers like Cura or PrusaSlicer) and <b>STEP</b> for other CAD programs.</li>
      </ul>
      <h3>Keys</h3>
      <p class="muted">Pathway CAD uses the OpenCascade modeling engine (LGPL-2.1) through replicad (MIT), and three.js (MIT) for the 3D view.</p>
      <p class="keys">S sketch · E extrude · R revolve · H hole · F fillet · M measure · Esc cancel · Enter OK<br>In a sketch: L line · R rectangle · C circle · A arc · P polygon · O slot · S select · X construction · G grid</p>
      </div>`, 'wide');
  }

  // ----- status, toasts, loading -----
  status(msg) { $('#statusMsg').textContent = msg || ''; }
  toast(msg, kind = '') {
    const t = document.createElement('div');
    t.className = 'toast ' + kind;
    t.textContent = msg;
    $('#toasts').appendChild(t);
    setTimeout(() => t.classList.add('out'), kind === 'error' ? 5200 : 3400);
    setTimeout(() => t.remove(), kind === 'error' ? 5800 : 4000);
  }
  busy(on) { $('#busy').hidden = !on; }
  loading(msg, bad) {
    const el = $('#loading');
    if (!msg) { el.hidden = true; return; }
    el.hidden = false;
    el.querySelector('p').textContent = msg;
    el.classList.toggle('bad', !!bad);
  }
}

const TOOL_TIPS = {
  select: 'Pick a shape to see and edit its numbers.',
  line: 'Line: click, click, click… Click the first point again to close the shape.',
  rect: 'Rectangle: click two opposite corners.',
  circle: 'Circle: click the center, then the edge.',
  arc: 'Arc: start, end, then a point it passes through.',
  polygon: 'Polygon: click the center, then a corner.',
  slot: 'Slot: click both end centers, then the width.',
};

function numOrExpr(v) {
  const s = String(v).trim();
  return /^-?\d*\.?\d+(e-?\d+)?$/i.test(s) ? parseFloat(s) : s;
}
function dependsOn(a, b) { return a.sketch === b.id || (a.features || []).includes(b.id); }

window.addEventListener('DOMContentLoaded', () => {
  window.pathwayCad = new App();
});
