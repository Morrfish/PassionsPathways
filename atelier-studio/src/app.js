// Atelier Studio: wires the sketch board, the 3D view and the panels together.
import { Board, BW, BH } from './board.js';
import { Viewer } from './viewer3d.js';
import { ColorPicker } from './colorpicker.js';
import { FABRICS, FABRIC_BY_ID, PALETTES, swatchURL, hexToRgb, rgbToHex } from './fabrics.js';
import { SIZE_CHARTS, SKIN_TONES, defaultBodySettings, measurementsFor } from './body.js';
import { STARTERS, drawStarter } from './starters.js';
import { fileToCanvas, imageToCanvas, processSketch, colorAmount, contentBox } from './imageproc.js';
import * as store from './store.js';
import { icon, fillIcons } from './icons.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const LS = { get: (k, d) => { try { const v = localStorage.getItem('atelier.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } }, set: (k, v) => { try { localStorage.setItem('atelier.' + k, JSON.stringify(v)); } catch { /* private mode */ } } };

fillIcons();

// ---------- core objects ----------
const board = new Board($('#board'));
const viewer = new Viewer($('#view3d'));
let mode = 'sketch';
let design = null; // { id, name, created, updated, body, portfolio }
let body = defaultBodySettings();
let spec = null;
let units = LS.get('units', 'in');

function toast(msg, ms = 3200) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  $('#toasts').appendChild(t); setTimeout(() => t.remove(), ms);
}
board.onToast = toast;
async function busy(msg, fn) {
  const b = document.createElement('div'); b.className = 'busy'; b.textContent = msg; document.body.appendChild(b);
  await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 20)));
  try { return await fn(); } finally { b.remove(); }
}
function download(blob, name) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
const safeName = () => (design?.name || 'design').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-') || 'design';

// ---------- body / mannequin ----------
function applyBody(rebuildGarment = true) {
  spec = viewer.setBody(body, BW, BH);
  board.guide = viewer.renderGuide(BW / 2, BH / 2);
  board.dirty = true;
  if (rebuildGarment && mode === '3d') refresh3D();
  renderBodyUI(); renderMeasurements();
}
function renderBodyUI() {
  $$('#bodyType button').forEach((b) => b.classList.toggle('on', b.dataset.v === body.type));
  const sizes = Object.keys(SIZE_CHARTS[body.type].sizes);
  $('#bodySize').innerHTML = sizes.map((s) => `<button data-v="${s}" class="${s === body.size ? 'on' : ''}">${body.type === 'kids' ? s : s}</button>`).join('');
  $$('.height-row').forEach((el) => { el.hidden = body.type === 'kids'; });
  $$('#bodyHeight button').forEach((b) => b.classList.toggle('on', b.dataset.v === body.height));
  $('#skinTones').innerHTML = SKIN_TONES.map((s) => `<button class="chip ${s.id === body.skin ? 'on' : ''}" data-v="${s.id}" title="${s.name}" style="background:${s.color}"></button>`).join('');
  const m = measurementsFor(body), fields = [['height', 'Height'], ['bust', body.type === 'women' ? 'Bust' : 'Chest'], ['waist', 'Waist'], ['hip', 'Hip']];
  const host = $('#customBody');
  if (!host.contains(document.activeElement)) host.innerHTML = fields.map(([k, l]) => `<label>${l} (${units})<input type="number" step="0.5" data-k="${k}" value="${fmtNum(m[k])}"></label>`).join('');
}
$('#bodyType').addEventListener('click', (e) => { const v = e.target.closest('button')?.dataset.v; if (!v) return; body.type = v; body.size = Object.keys(SIZE_CHARTS[v].sizes)[2]; body.custom = null; bodyChanged(); });
$('#bodySize').addEventListener('click', (e) => { const v = e.target.closest('button')?.dataset.v; if (!v) return; body.size = v; body.custom = null; bodyChanged(); });
$('#bodyHeight').addEventListener('click', (e) => { const v = e.target.closest('button')?.dataset.v; if (!v) return; body.height = v; bodyChanged(); });
$('#skinTones').addEventListener('click', (e) => { const v = e.target.closest('button')?.dataset.v; if (!v) return; body.skin = v; bodyChanged(); });
$('#customBody').addEventListener('change', (e) => {
  const k = e.target.dataset.k; if (!k) return;
  const v = parseFloat(e.target.value); if (!(v > 0)) return;
  const cmv = units === 'in' ? v * 2.54 : v;
  const lim = { height: [80, 230], bust: [40, 180], waist: [35, 170], hip: [40, 180] }[k];
  body.custom = { ...(body.custom || {}), [k]: Math.min(lim[1], Math.max(lim[0], cmv)) };
  bodyChanged();
});
$('#customReset').addEventListener('click', () => { body.custom = null; $('#customBody').innerHTML = ''; bodyChanged(); });
function bodyChanged() { applyBody(true); scheduleSave(); }

// ---------- measurements ----------
function fmtNum(cm) { return units === 'in' ? (Math.round(cm / 2.54 * 4) / 4).toString() : (Math.round(cm * 2) / 2).toString(); }
const fmt = (cm) => cm == null ? null : `${fmtNum(cm)} ${units === 'in' ? 'in' : 'cm'}`;
function renderMeasurements() {
  const m = measurementsFor(body), g = viewer.measure || {};
  const row = (label, v) => `<tr><td>${label}</td><td class="${v == null ? 'na' : ''}">${v == null ? '–' : v}</td></tr>`;
  const bustL = body.type === 'women' ? 'Bust' : 'Chest';
  let html = `<tr><th colspan="2">Mannequin</th></tr>` + row('Height', fmt(m.height)) + row(bustL, fmt(m.bust)) + row('Waist', fmt(m.waist)) + row('Hip', fmt(m.hip)) + row('Shoulder width', fmt(m.shoulder)) + row('Inseam', fmt(m.inseam));
  html += `<tr><th colspan="2">Garment${mode === '3d' ? '' : ' (open 3D to measure)'}</th></tr>` + row(bustL, fmt(g.bust)) + row('Waist', fmt(g.waist)) + row('Hip', fmt(g.hip)) + row('Length', fmt(g.length)) + row('Hem around', fmt(g.hem)) + row('Sleeve', fmt(g.sleeve)) + row('Inseam', fmt(g.inseam));
  $('#measTable').innerHTML = html;
}
$('#units').addEventListener('click', (e) => { const v = e.target.closest('button')?.dataset.v; if (!v) return; units = v; LS.set('units', v); $$('#units button').forEach((b) => b.classList.toggle('on', b.dataset.v === v)); $('#customBody').innerHTML = ''; renderBodyUI(); renderMeasurements(); });
$$('#units button').forEach((b) => b.classList.toggle('on', b.dataset.v === units));

// ---------- paint: color + fabric ----------
let recent = LS.get('recent', ['#e85d8a', '#1d3a8a', '#ffffff', '#1a1a1a', '#d4af37']);
const picker = new ColorPicker($('#colorPicker'), (hex, final) => { setColor(hex, final, true); });
function setColor(hex, addRecent = true, fromPicker = false) {
  board.paint.color = hex;
  if (!fromPicker) picker.set(hex);
  if (addRecent) { recent = [hex, ...recent.filter((c) => c !== hex)].slice(0, 12); LS.set('recent', recent); renderRecent(); }
  renderPaintNow(); renderFabricGrid();
  LS.set('paint', board.paint);
}
function renderRecent() { $('#recent').innerHTML = recent.map((c) => `<button class="chip" data-c="${c}" style="background:${c}" title="${c}"></button>`).join(''); }
$('#recent').addEventListener('click', (e) => { const c = e.target.dataset.c; if (c) setColor(c); });
$('#palettes').innerHTML = PALETTES.map((p) => `<div class="palette"><div class="palette-name">${p.name}</div><div class="chips">${p.colors.map((c) => `<button class="chip" data-c="${c}" style="background:${c}" title="${c}"></button>`).join('')}</div></div>`).join('');
$('#palettes').addEventListener('click', (e) => { const c = e.target.dataset.c; if (c) setColor(c); });
board.onPick = ([r, g, b]) => { setColor(rgbToHex(r, g, b)); toast('Color picked'); };

let fabricGridKey = '';
function renderFabricGrid() {
  const key = board.paint.color + board.paint.fabric; if (key === fabricGridKey) return; fabricGridKey = key;
  const groups = [...new Set(FABRICS.map((f) => f.group))];
  $('#fabricGrid').innerHTML = groups.map((g) => `<div class="fab-group">${g}</div><div class="fab-grid">${FABRICS.filter((f) => f.group === g).map((f) => `<button class="fab ${f.id === board.paint.fabric ? 'on' : ''}" data-f="${f.id}" title="${f.name}"><img alt="" src="${swatchURL(f.id, board.paint.color)}">${f.name}</button>`).join('')}</div>`).join('');
}
$('#fabricGrid').addEventListener('click', (e) => { const f = e.target.closest('[data-f]')?.dataset.f; if (!f) return; board.paint.fabric = f; LS.set('paint', board.paint); renderFabricGrid(); renderPaintNow(); if (board.tool !== 'fill' && board.tool !== 'brush' && mode === 'sketch') setTool('fill'); });
$('#fabricScale').addEventListener('input', (e) => { board.paint.scale = +e.target.value; LS.set('paint', board.paint); });
function renderPaintNow() {
  $('#paintSwatch').style.backgroundImage = `url(${swatchURL(board.paint.fabric, board.paint.color)})`;
  $('#paintFabric').textContent = FABRIC_BY_ID[board.paint.fabric]?.name || 'Fabric';
  $('#paintHex').textContent = board.paint.color.toUpperCase();
}

// ---------- tools ----------
function setTool(t) {
  board.tool = t;
  $$('.tools [data-tool]').forEach((b) => b.classList.toggle('on', b.dataset.tool === t));
  $('#boardWrap').className = 'board-wrap tool-' + t;
}
$$('.tools [data-tool]').forEach((b) => b.addEventListener('click', () => setTool(b.dataset.tool)));
$('#btnUndo').addEventListener('click', () => { board.undo(); if (mode === '3d') refresh3D(); });
$('#btnRedo').addEventListener('click', () => { board.redo(); if (mode === '3d') refresh3D(); });
board.onHistory = (u, r) => { $('#btnUndo').disabled = !u; $('#btnRedo').disabled = !r; };
$('#btnZoomIn').addEventListener('click', () => board.zoomBy(1.25));
$('#btnZoomOut').addEventListener('click', () => board.zoomBy(0.8));
$('#btnFit').addEventListener('click', () => board.fit());
$('#btnGuide').addEventListener('click', (e) => { board.showGuide = !board.showGuide; e.currentTarget.classList.toggle('on', board.showGuide); board.dirty = true; });
$('#brushSize').addEventListener('input', (e) => { board.brushSize = +e.target.value; board.dirty = true; });
$('#gapClose').addEventListener('input', (e) => { board.gap = +e.target.value; });
$('#guideOpacity').addEventListener('input', (e) => { board.guideOpacity = +e.target.value; board.dirty = true; });
$('#eraseTarget').addEventListener('click', (e) => { const v = e.target.closest('button')?.dataset.v; if (!v) return; board.eraseTarget = v; $$('#eraseTarget button').forEach((b) => b.classList.toggle('on', b.dataset.v === v)); });

// Starter outlines
const starterHTML = STARTERS.map((s) => `<button class="starter" data-s="${s.id}"><span class="i">${icon(s.id === 'top' ? 'top' : s.id)}</span>${s.name}</button>`).join('');
$('#starters').innerHTML = starterHTML; $('#starters2').innerHTML = starterHTML;
function useStarter(id) {
  board.drawLines((ctx) => drawStarter(id, spec, viewer, ctx));
  closeModal('#starterModal'); updateWelcome(); setTool('fill');
  toast('Outline added. Tap inside it with Fill to color it.');
}
$('#starters').addEventListener('click', (e) => { const s = e.target.closest('[data-s]')?.dataset.s; if (s) useStarter(s); });
$('#starters2').addEventListener('click', (e) => { const s = e.target.closest('[data-s]')?.dataset.s; if (s) useStarter(s); });

// ---------- sketch <-> 3D ----------
function setMode(m) {
  if (m === mode) return;
  if (board.place) { toast('Place or cancel the drawing first.'); return; }
  mode = m;
  document.body.classList.toggle('mode3d', m === '3d'); document.body.classList.toggle('modesketch', m === 'sketch');
  $$('.mode button').forEach((b) => { b.classList.toggle('on', b.dataset.mode === m); b.setAttribute('aria-selected', b.dataset.mode === m); });
  $('#boardWrap').hidden = m === '3d';
  $('#view3d').hidden = m !== '3d';
  $('#viewBtns').hidden = m !== '3d'; $('#hint3d').hidden = m !== '3d';
  viewer.setVisible(m === '3d');
  if (m === '3d') {
    if (!board.hasColor() && board.hasLines()) { if (board.autoFillGarment()) toast('Your outline was filled in white so you can see it in 3D. Pick a fabric and tap the garment to change it.', 5000); }
    else if (!board.hasColor()) toast('Nothing to show yet. Color a design in Sketch first.', 4000);
    refresh3D();
  } else board.dirty = true;
  updateWelcome(); renderMeasurements();
  LS.set('mode', m);
}
$$('.mode button').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
function refresh3D() {
  viewer.setDesign(board.textureCanvas(), board.mat, board.alphaGrid());
  renderMeasurements();
}
$('#viewBtns').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.id === 'btnSpin') { const on = !b.classList.contains('on'); b.classList.toggle('on', on); viewer.setAutoRotate(on); return; }
  viewer.view(b.dataset.view);
});
// Tap the garment in 3D to apply the selected fabric/color to that part.
{
  const el = $('#view3d'); let down = null;
  el.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; });
  el.addEventListener('pointerup', (e) => {
    if (!down) return; const d = down; down = null;
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6 || performance.now() - d.t > 600) return;
    const px = viewer.pick(e.clientX, e.clientY); if (!px) return;
    if (board.fillAt(px[0], px[1])) { refresh3D(); }
  });
}
const BGS = ['#efe9e2', '#ffffff', '#e6eef5', '#f3e1e7', '#2b2228', '#111114'];
$('#bgChips').innerHTML = BGS.map((c) => `<button class="chip" data-c="${c}" style="background:${c}"></button>`).join('');
$('#bgChips').addEventListener('click', (e) => { const c = e.target.dataset.c; if (c) { viewer.setBackground(c); LS.set('bg', c); } });
viewer.setBackground(LS.get('bg', BGS[0]));

// ---------- saving ----------
let saveTimer = null;
function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(saveNow, 1200); }
async function saveNow() {
  clearTimeout(saveTimer); if (!design) return;
  design.updated = Date.now(); design.body = { ...body };
  design.name = $('#designName').value.trim() || 'Untitled design';
  const layers = await board.layerBlobs();
  const thumb = await new Promise((r) => board.composite(360).toBlob(r, 'image/jpeg', 0.85));
  try { await store.saveDesign({ ...design, layers, thumb }); LS.set('last', design.id); }
  catch (e) { console.error(e); toast('Could not save on this device: ' + (e.message || e)); }
}
board.onChange = () => { scheduleSave(); updateWelcome(); };
$('#designName').addEventListener('change', scheduleSave);
$('#designName').addEventListener('keydown', (e) => { if (e.key === 'Enter') e.target.blur(); });
window.addEventListener('beforeunload', () => { if (saveTimer) saveNow(); });
document.addEventListener('visibilitychange', () => { if (document.hidden && saveTimer) saveNow(); });

async function newDesign() {
  if (saveTimer) await saveNow();
  design = { id: store.newId(), name: 'Untitled design', created: Date.now(), updated: Date.now(), body: { ...body }, portfolio: false };
  welcomeDismissed = false;
  $('#designName').value = design.name;
  await board.loadLayers({});
  updatePortfolioBtn(); setMode('sketch'); updateWelcome();
}
async function openDesign(rec) {
  if (saveTimer) await saveNow();
  design = { id: rec.id, name: rec.name, created: rec.created, updated: rec.updated, body: rec.body, portfolio: !!rec.portfolio, notes: rec.notes || '' };
  if (rec.body) { body = { ...defaultBodySettings(), ...rec.body }; applyBody(false); }
  $('#designName').value = rec.name;
  await board.loadLayers(rec.layers || {});
  updatePortfolioBtn(); updateWelcome();
  if (mode === '3d') refresh3D();
  LS.set('last', rec.id);
}
function updatePortfolioBtn() {
  const b = $('#btnPortfolio'), on = !!design?.portfolio;
  b.classList.toggle('starred', on); b.querySelector('.i').innerHTML = icon(on ? 'starFill' : 'star');
  b.title = on ? 'In your portfolio (click to remove)' : 'Add this design to your portfolio';
}
$('#btnPortfolio').addEventListener('click', () => {
  if (!design) return; design.portfolio = !design.portfolio; updatePortfolioBtn(); saveNow();
  toast(design.portfolio ? 'Added to your portfolio.' : 'Removed from your portfolio.');
});

// ---------- welcome card ----------
function updateWelcome() {
  const empty = mode === 'sketch' && !board.place && !board.hasLines() && !board.hasColor() && !welcomeDismissed;
  $('#welcome').hidden = !empty;
}
let welcomeDismissed = false;
$('#welcome').addEventListener('click', (e) => {
  const w = e.target.closest('[data-w]')?.dataset.w; if (!w) return;
  if (w === 'snap') startSnapshot(); else if (w === 'upload') $('#fileImage').click(); else if (w === 'starter') openModal('#starterModal');
  else { welcomeDismissed = true; updateWelcome(); setTool('brush'); }
});

// ---------- modals ----------
function openModal(sel) { $(sel).hidden = false; }
function closeModal(sel) { $(sel).hidden = true; if (sel === '#cameraModal') stopCamera(); }
$$('.modal').forEach((m) => m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-close]')) closeModal('#' + m.id); }));

// ---------- import a drawing ----------
let imp = null; // { src, result }
async function openImport(canvas) {
  imp = { src: canvas };
  const amt = colorAmount(canvas), colored = amt > 0.12;
  $(`input[name=impMode][value=${colored ? 'color' : 'lines'}]`).checked = true;
  $('#impColorNote').textContent = colored ? 'Looks like your drawing is colored in, so its colors will come in too.' : 'Looks like a pencil or ink drawing. It will come in as clean outlines.';
  const o = $('#impOrig'); o.width = canvas.width; o.height = canvas.height; o.getContext('2d').drawImage(canvas, 0, 0);
  openModal('#importModal');
  await runImport();
}
async function runImport() {
  if (!imp) return;
  const keepColor = $('input[name=impMode]:checked').value === 'color', strength = +$('#impStrength').value;
  imp.result = await busy('Cleaning up your drawing…', () => processSketch(imp.src, { strength, keepColor }));
  const out = $('#impOut'), r = imp.result; out.width = r.lines.width; out.height = r.lines.height;
  const x = out.getContext('2d'); x.clearRect(0, 0, out.width, out.height); if (r.color) x.drawImage(r.color, 0, 0); x.drawImage(r.lines, 0, 0);
}
let impTimer = null;
$$('input[name=impMode]').forEach((i) => i.addEventListener('change', runImport));
$('#impStrength').addEventListener('input', () => { clearTimeout(impTimer); impTimer = setTimeout(runImport, 350); });
function cropTo(c, b) { const o = document.createElement('canvas'); o.width = b.w; o.height = b.h; o.getContext('2d').drawImage(c, b.x, b.y, b.w, b.h, 0, 0, b.w, b.h); return o; }
function placeImported(thenTo3D) {
  const r = imp.result, box = contentBox(r.lines, r.color);
  const pad = 6, b = { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad) }; b.w = Math.min(r.lines.width - b.x, box.w + pad * 2); b.h = Math.min(r.lines.height - b.y, box.h + pad * 2);
  const lines = cropTo(r.lines, b), color = r.color ? cropTo(r.color, b) : null;
  // A tall drawing is probably a whole figure; a shorter one is probably just the garment.
  const full = b.h / b.w > 2.1;
  const [, yTop] = viewer.toBoard(0, full ? spec.H : spec.y.neckBase + 0.01), [, yBot] = viewer.toBoard(0, full ? 0 : spec.y.knee);
  const fit = { x: 40, y: yTop, w: BW - 80, h: yBot - yTop };
  closeModal('#importModal'); imp = null;
  if (mode === '3d') setMode('sketch');
  welcomeDismissed = true;
  board.startPlace(lines, color, fit);
  if (thenTo3D) { board.commitPlace(); setMode('3d'); toast('Showing your drawing in 3D. Switch back to Sketch to adjust it.'); return; }
  $('#placeBar').hidden = false; updateWelcome();
}
$('#impPlace').addEventListener('click', () => imp?.result && placeImported(false));
$('#impTo3D').addEventListener('click', () => imp?.result && placeImported(true));
$('#placeOk').addEventListener('click', () => { board.commitPlace(); $('#placeBar').hidden = true; setTool('fill'); toast('Placed. Pick a fabric and tap a shape to fill it.'); });
$('#placeCancel').addEventListener('click', () => { board.cancelPlace(); $('#placeBar').hidden = true; updateWelcome(); });

async function handleImageFile(file) {
  if (!file) return;
  try { const c = await busy('Opening picture…', () => fileToCanvas(file)); openImport(c); }
  catch (e) { toast(e.message || 'Could not open that picture.'); }
}
$('#btnUpload').addEventListener('click', () => $('#fileImage').click());
$('#fileImage').addEventListener('change', (e) => { handleImageFile(e.target.files[0]); e.target.value = ''; });
$('#fileCamera').addEventListener('change', (e) => { handleImageFile(e.target.files[0]); e.target.value = ''; });
// Drag and drop a picture or design file onto the window.
window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => {
  e.preventDefault(); const f = e.dataTransfer.files[0]; if (!f) return;
  if (/\.atelier$|json/i.test(f.name + f.type)) openProjectFile(f); else handleImageFile(f);
});
// Paste a picture.
window.addEventListener('paste', (e) => { const it = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith('image/')); if (it) handleImageFile(it.getAsFile()); });

// ---------- camera snapshot ----------
let camStream = null, camFacing = 'environment';
async function startSnapshot() {
  if (!navigator.mediaDevices?.getUserMedia) { $('#fileCamera').click(); return; }
  openModal('#cameraModal');
  try {
    camStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: camFacing, width: { ideal: 1920 }, height: { ideal: 1440 } }, audio: false });
    const v = $('#camVideo'); v.srcObject = camStream; await v.play();
  } catch (e) {
    closeModal('#cameraModal');
    toast('No camera available here, so pick a picture instead.');
    $('#fileCamera').click();
  }
}
function stopCamera() { camStream?.getTracks().forEach((t) => t.stop()); camStream = null; }
$('#btnSnap').addEventListener('click', startSnapshot);
$('#camSwitch').addEventListener('click', async () => { camFacing = camFacing === 'environment' ? 'user' : 'environment'; stopCamera(); closeModal('#cameraModal'); await startSnapshot(); });
$('#camShoot').addEventListener('click', () => {
  const v = $('#camVideo'); if (!v.videoWidth) return;
  const c = imageToCanvas(v, v.videoWidth, v.videoHeight);
  closeModal('#cameraModal'); openImport(c);
});

// ---------- my designs ----------
let designFilter = 'all';
async function renderDesigns() {
  const all = await store.listDesigns(), list = designFilter === 'portfolio' ? all.filter((d) => d.portfolio) : all;
  const host = $('#designCards');
  host.querySelectorAll('img[data-url]').forEach((i) => URL.revokeObjectURL(i.src));
  if (!list.length) { host.innerHTML = `<div class="empty">${designFilter === 'portfolio' ? 'Nothing in your portfolio yet. Open a design and press the star to add it.' : 'No saved designs yet.'}</div>`; return; }
  host.innerHTML = list.map((d) => `<div class="card ${d.id === design?.id ? 'current' : ''}" data-id="${d.id}">
    <button class="card-img" data-a="open" title="Open">${d.thumb ? `<img data-url alt="" src="${URL.createObjectURL(d.thumb)}">` : ''}${d.portfolio ? `<span class="card-star">${icon('starFill')}</span>` : ''}</button>
    <div class="card-meta"><div class="card-name">${escapeHTML(d.name)}</div><div class="card-date">${new Date(d.updated).toLocaleDateString()}</div></div>
    <div class="card-acts"><button data-a="star" title="${d.portfolio ? 'Remove from portfolio' : 'Add to portfolio'}">${icon(d.portfolio ? 'starFill' : 'star')}</button><button data-a="copy" title="Make a copy">${icon('copy')}</button><button data-a="file" title="Save design file">${icon('download')}</button><button data-a="del" title="Delete">${icon('trash')}</button></div></div>`).join('');
}
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
$('#btnDesigns').addEventListener('click', async () => { if (saveTimer) await saveNow(); openModal('#designsModal'); renderDesigns(); });
$('#designFilter').addEventListener('click', (e) => { const v = e.target.closest('button')?.dataset.v; if (!v) return; designFilter = v; $$('#designFilter button').forEach((b) => b.classList.toggle('on', b.dataset.v === v)); renderDesigns(); });
$('#designNew').addEventListener('click', async () => { closeModal('#designsModal'); await newDesign(); });
$('#designCards').addEventListener('click', async (e) => {
  const a = e.target.closest('[data-a]')?.dataset.a, id = e.target.closest('[data-id]')?.dataset.id; if (!a || !id) return;
  const rec = await store.getDesign(id); if (!rec) return;
  if (a === 'open') { closeModal('#designsModal'); await openDesign(rec); }
  else if (a === 'star') { rec.portfolio = !rec.portfolio; await store.saveDesign(rec); if (design?.id === id) { design.portfolio = rec.portfolio; updatePortfolioBtn(); } renderDesigns(); }
  else if (a === 'copy') { await store.saveDesign({ ...rec, id: store.newId(), name: rec.name + ' (copy)', created: Date.now(), updated: Date.now() }); renderDesigns(); }
  else if (a === 'file') download(await store.toProjectFile(rec), (rec.name || 'design').replace(/[^\w\- ]+/g, '') + '.atelier');
  else if (a === 'del') {
    if (!confirm(`Delete "${rec.name}"? This cannot be undone.`)) return;
    await store.deleteDesign(id);
    if (design?.id === id) { clearTimeout(saveTimer); saveTimer = null; await newDesign(); }
    renderDesigns();
  }
});

// ---------- design files ----------
async function openProjectFile(file) {
  try { const rec = await store.fromProjectFile(await file.text()); await store.saveDesign(rec); await openDesign(rec); toast(`Opened "${rec.name}".`); }
  catch (e) { toast(e.message || 'Could not open that file.'); }
}
$('#fileProject').addEventListener('change', (e) => { const f = e.target.files[0]; if (f) openProjectFile(f); e.target.value = ''; });
window.atelierDesktop?.onFlush?.(async () => { try { await saveNow(); } finally { window.atelierDesktop.flushed(); } });
window.atelierDesktop?.onOpenFile?.(async (name, text) => {
  try { const rec = await store.fromProjectFile(text); await store.saveDesign(rec); await openDesign(rec); toast(`Opened "${rec.name}".`); } catch (e) { toast(e.message || 'Could not open that file.'); }
});

// ---------- more menu ----------
$('#btnMore').addEventListener('click', (e) => { e.stopPropagation(); $('#moreMenu').hidden = !$('#moreMenu').hidden; });
document.addEventListener('click', (e) => { if (!e.target.closest('.menu-wrap')) $('#moreMenu').hidden = true; });
$('#moreMenu').addEventListener('click', async (e) => {
  const a = e.target.closest('[data-act]')?.dataset.act; if (!a) return; $('#moreMenu').hidden = true;
  if (a === 'new') await newDesign();
  else if (a === 'open') $('#fileProject').click();
  else if (a === 'save') { await saveNow(); download(await store.toProjectFile({ ...design, body, layers: await board.layerBlobs() }), safeName() + '.atelier'); }
  else if (a === 'png') { const c = board.composite(BH, '#ffffff'); c.toBlob((b) => download(b, safeName() + '-sketch.png'), 'image/png'); }
  else if (a === 'shot') { if (mode !== '3d') setMode('3d'); setTimeout(async () => download(await (await fetch(viewer.screenshot())).blob(), safeName() + '-3d.png'), 120); }
  else if (a === 'glb') { if (mode !== '3d') setMode('3d'); try { download(await busy('Building the 3D model…', () => viewer.exportGLB()), safeName() + '.glb'); } catch (err) { toast('Could not export the 3D model: ' + (err.message || err)); } }
  else if (a === 'clear') { if (confirm('Clear everything on the board? You can undo this.')) { board.clearAll(); if (mode === '3d') refresh3D(); } }
  else if (a === 'about') openModal('#aboutModal');
});

// ---------- phone panel ----------
$('#panelGrip').addEventListener('click', () => $('#panel').classList.toggle('collapsed'));
if (window.matchMedia('(max-width: 760px)').matches) $('#panel').classList.add('collapsed');

// ---------- keyboard ----------
window.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea')) return;
  const k = e.key.toLowerCase();
  if ((e.ctrlKey || e.metaKey) && k === 'z') { e.preventDefault(); if (e.shiftKey) board.redo(); else board.undo(); if (mode === '3d') refresh3D(); return; }
  if ((e.ctrlKey || e.metaKey) && k === 'y') { e.preventDefault(); board.redo(); if (mode === '3d') refresh3D(); return; }
  if ((e.ctrlKey || e.metaKey) && k === 's') { e.preventDefault(); saveNow().then(() => toast('Saved on this device.')); return; }
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (k === ' ') { board.spaceDown = true; $('#boardWrap').classList.add('space-pan'); e.preventDefault(); return; }
  if (k === 'escape') { $$('.modal').forEach((m) => { if (!m.hidden) closeModal('#' + m.id); }); if (board.place) $('#placeCancel').click(); return; }
  if (k === 'enter' && board.place) { $('#placeOk').click(); return; }
  if (k === '3') setMode(mode === '3d' ? 'sketch' : '3d');
  if (mode !== 'sketch') return;
  const map = { f: 'fill', b: 'brush', p: 'pen', e: 'eraser', i: 'picker', h: 'pan' };
  if (map[k]) setTool(map[k]);
  if (k === '+' || k === '=') board.zoomBy(1.25);
  if (k === '-') board.zoomBy(0.8);
  if (k === '0') board.fit();
});
window.addEventListener('keyup', (e) => { if (e.key === ' ') { board.spaceDown = false; $('#boardWrap').classList.remove('space-pan'); } });

// ---------- start ----------
(async function start() {
  const p = LS.get('paint', null); if (p) board.paint = { ...board.paint, ...p };
  $('#fabricScale').value = board.paint.scale;
  picker.set(board.paint.color); renderRecent(); renderFabricGrid(); renderPaintNow();
  setTool('fill');
  document.body.classList.add('modesketch');
  applyBody(false);
  let rec = null;
  try { const last = LS.get('last', null); rec = last ? await store.getDesign(last) : null; } catch { /* storage unavailable */ }
  if (rec) await openDesign(rec); else await newDesign();
  if (LS.get('mode', 'sketch') === '3d' && board.hasColor()) setMode('3d');
  window.atelierDesktop?.ready?.();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
})();

// For tests and debugging.
window.atelier = { board, viewer, get body() { return body; }, setMode, useStarter, hexToRgb };
