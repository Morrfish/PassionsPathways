/* Shelf Swap — physical media collection tracker with swaps.
   All data stays on this device (IndexedDB, with localStorage fallback). */
(() => {
"use strict";

const BASE = window.SHELF_CONFIG || {};
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------------- storage ---------------- */
const DB_NAME = "shelf-swap", STORE = "kv";
let dbp = null;
function idb() {
  if (dbp) return dbp;
  dbp = new Promise((res, rej) => {
    try {
      const r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    } catch (e) { rej(e); }
  });
  return dbp;
}
async function load(key, fallback) {
  try {
    const db = await idb();
    const v = await new Promise((res, rej) => {
      const q = db.transaction(STORE).objectStore(STORE).get(key);
      q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error);
    });
    if (v !== undefined) return v;
  } catch {}
  try { const s = localStorage.getItem("ss_" + key); if (s) return JSON.parse(s); } catch {}
  return fallback;
}
async function save(key, value) {
  try {
    const db = await idb();
    await new Promise((res, rej) => {
      const t = db.transaction(STORE, "readwrite");
      t.objectStore(STORE).put(value, key);
      t.oncomplete = res; t.onerror = () => rej(t.error);
    });
    return;
  } catch {}
  try { localStorage.setItem("ss_" + key, JSON.stringify(value)); }
  catch { toast("Couldn't save — storage is full. Download a backup."); }
}

/* ---------------- state ---------------- */
let S = { items: [], wants: [], friends: [], trades: [], settings: {} };
let viewOnly = null; // shelf loaded from a view-only link
let cfg = {};
let ui = { view: "shelf", quick: new Set(), editing: null, photos: {} };

function buildCfg() {
  cfg = Object.assign({}, BASE, S.settings || {});
  cfg.formats = BASE.formats || [];
  cfg.fmt = Object.fromEntries(cfg.formats.map(f => [f.id, f]));
}
const fmtLabel = id => id === "any" ? "Any format" : (cfg.fmt[id]?.label || id || "—");
const money = n => (n || n === 0) && n !== "" ? cfg.currency + Number(n).toFixed(2).replace(/\.00$/, "") : "—";
const items = () => viewOnly ? viewOnly.items : S.items;
const persist = () => save("state", S);

/* ---------------- encoding for links ---------------- */
const unb64u = s => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
async function encode(obj) {
  const raw = new TextEncoder().encode(JSON.stringify(obj));
  if (window.CompressionStream) {
    const buf = await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer();
    return "1" + chunkedB64(new Uint8Array(buf));
  }
  return "0" + chunkedB64(raw);
}
function chunkedB64(bytes) {
  let s = ""; for (let i = 0; i < bytes.length; i += 8192) s += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function decode(code) {
  code = code.trim();
  const m = code.match(/#(?:swap|view)=([\w-]+)/); if (m) code = m[1];
  const kind = code[0], bytes = unb64u(code.slice(1));
  let text;
  if (kind === "1") text = await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).text();
  else text = new TextDecoder().decode(bytes);
  return JSON.parse(text);
}
const pageUrl = () => location.href.split("#")[0];

/* ---------------- helpers ---------------- */
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 2600);
}
async function copy(text, what) {
  try { await navigator.clipboard.writeText(text); toast(what + " copied"); }
  catch { prompt("Copy this:", text); }
}
function norm(t) {
  return String(t || "").toLowerCase().replace(/&/g, "and").replace(/^(the|a|an)\s+/, "").replace(/[^a-z0-9]+/g, " ").trim();
}
function titleMatch(a, b) {
  const x = norm(a), y = norm(b);
  if (!x || !y) return false;
  if (x === y) return true;
  const [s, l] = x.length < y.length ? [x, y] : [y, x];
  return s.length >= 4 && (" " + l + " ").includes(" " + s + " ");
}
const fmtMatch = (want, have) => !want || want === "any" || want === have;
function download(name, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function spineColor(it) { return it.spine || cfg.fmt[it.format]?.color || "#333"; }
function readable(hex) {
  const h = (hex || "#333").replace("#", ""); if (h.length < 6) return "#fff";
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#111" : "#fff";
}

/* Shrinks an image and re-draws it on a canvas, which drops EXIF/GPS data. */
function shrinkPhoto(file, max = 640) {
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("bad image")); };
    img.src = url;
  });
}

/* ---------------- header / theme ---------------- */
function applyBrand() {
  document.documentElement.style.setProperty("--accent", cfg.accent || "#e4572e");
  if (cfg.theme) document.documentElement.dataset.theme = cfg.theme; else delete document.documentElement.dataset.theme;
  $("#appName").textContent = cfg.appName || "Shelf Swap";
  $("#tagline").textContent = cfg.tagline || "";
  document.title = cfg.appName || "Shelf Swap";
}
function fillSelects() {
  const fmtOpts = cfg.formats.map(f => `<option value="${f.id}">${esc(f.label)}</option>`).join("");
  $("#fmtFilter").innerHTML = `<option value="">All formats</option>` + fmtOpts;
  $("#wantForm [name=format]").innerHTML = `<option value="any">Any format</option>` + fmtOpts;
  $("#itemForm [name=format]").innerHTML = fmtOpts;
  $("#itemForm [name=condition]").innerHTML = (cfg.conditions || []).map(c => `<option>${esc(c)}</option>`).join("");
  $("#itemForm [name=caseType]").innerHTML = `<option value=""></option>` + (cfg.caseTypes || []).map(c => `<option>${esc(c)}</option>`).join("");
}

/* ---------------- tabs ---------------- */
function showTab(name) {
  $$(".tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === name));
  $$(".tab").forEach(t => t.classList.toggle("active", t.id === "tab-" + name));
  render();
}
$$(".tabs button").forEach(b => b.onclick = () => showTab(b.dataset.tab));
const currentTab = () => $(".tabs button.active").dataset.tab;

/* ---------------- collection ---------------- */
function filtered() {
  const q = norm($("#search").value), f = $("#fmtFilter").value, sort = $("#sortBy").value;
  let list = items().filter(it => {
    if (f && it.format !== f) return false;
    if (ui.quick.has("trade") && !it.forTrade) return false;
    if (ui.quick.has("sealed") && it.condition !== "Sealed") return false;
    if (ui.quick.has("nophoto") && it.photos?.front) return false;
    if (ui.quick.has("novalue") && it.value) return false;
    if (!q) return true;
    return norm([it.title, it.distributor, it.barcode, (it.tags || []).join(" "), it.notes, it.year].join(" ")).includes(q);
  });
  const by = {
    title: (a, b) => norm(a.title).localeCompare(norm(b.title)),
    year: (a, b) => (a.year || 9999) - (b.year || 9999),
    added: (a, b) => (b.added || 0) - (a.added || 0),
    value: (a, b) => (b.value || 0) - (a.value || 0),
    format: (a, b) => cfg.formats.findIndex(x => x.id === a.format) - cfg.formats.findIndex(x => x.id === b.format) || norm(a.title).localeCompare(norm(b.title))
  }[sort];
  return list.sort(by);
}

function renderCollection() {
  const list = filtered(), all = items();
  $("#emptyShelf").classList.toggle("hidden", all.length > 0 || !!viewOnly);
  $("#countLine").textContent = all.length ? `${list.length} of ${all.length} items` : "";
  const box = $("#collectionView");
  if (!list.length) { box.innerHTML = all.length ? `<p class="muted empty">Nothing matches.</p>` : ""; return; }

  if (ui.view === "shelf") {
    const groups = {};
    list.forEach(it => (groups[it.format] ||= []).push(it));
    const order = $("#sortBy").value === "format" || !$("#fmtFilter").value ? cfg.formats.map(f => f.id) : Object.keys(groups);
    box.innerHTML = `<div class="shelf-wrap">` + order.filter(id => groups[id]).map(id => {
      const f = cfg.fmt[id] || { w: 20, h: 180 };
      const spines = groups[id].map(it => {
        const c = spineColor(it), w = Math.round((f.w || 20) * 1.2 + 6), h = Math.round((f.h || 180) * 0.6);
        const img = it.photos?.spine ? `<img src="${it.photos.spine}" alt="">` : "";
        return `<button class="spine" data-id="${it.id}" title="${esc(it.title)}" style="--c:${c};color:${readable(c)};width:${w}px;height:${h}px">
          ${it.forTrade ? `<i class="sp-flag" title="For swap"></i>` : ""}${img}
          ${img ? "" : `<span class="sp-text"><span>${esc(it.title)}</span><span class="sp-fmt">${esc(it.year || "")}</span></span>`}
        </button>`;
      }).join("");
      return `<p class="shelf-label">${esc(fmtLabel(id))} · ${groups[id].length}</p><div class="shelf-row">${spines}</div>`;
    }).join("") + `</div>`;
  } else if (ui.view === "grid") {
    box.innerHTML = `<div class="cover-grid">` + list.map(it => {
      const c = spineColor(it);
      return `<button class="cover" data-id="${it.id}">
        <div class="art" style="--c:${c};color:${readable(c)}">${it.photos?.front ? `<img src="${it.photos.front}" alt="">` : esc(it.title)}</div>
        <div class="meta"><b>${esc(it.title)}</b>
          <span class="badge">${esc(fmtLabel(it.format))}</span>${it.year ? `<span class="badge">${it.year}</span>` : ""}
          ${it.forTrade ? `<span class="badge trade">Swap</span>` : ""}
        </div></button>`;
    }).join("") + `</div>`;
  } else {
    box.innerHTML = `<div class="list-wrap"><table class="list"><thead><tr>
      <th>Title</th><th>Format</th><th class="hide-sm">Year</th><th class="hide-sm">Distributor</th><th class="hide-sm">Condition</th><th>Value</th><th></th></tr></thead><tbody>` +
      list.map(it => `<tr data-id="${it.id}"><td><b>${esc(it.title)}</b></td><td>${esc(fmtLabel(it.format))}</td>
        <td class="hide-sm">${esc(it.year || "")}</td><td class="hide-sm">${esc(it.distributor || "")}</td>
        <td class="hide-sm">${esc(it.condition || "")}</td><td>${money(it.value)}</td>
        <td>${it.forTrade ? `<span class="badge trade">Swap</span>` : ""}</td></tr>`).join("") + `</tbody></table></div>`;
  }
}
$("#collectionView").addEventListener("click", e => {
  const el = e.target.closest("[data-id]"); if (el) openViewer(el.dataset.id);
});
["search", "fmtFilter", "sortBy"].forEach(id => $("#" + id).addEventListener("input", renderCollection));
$$("#viewSeg button").forEach(b => b.onclick = () => {
  ui.view = b.dataset.view; $$("#viewSeg button").forEach(x => x.classList.toggle("active", x === b));
  try { localStorage.setItem("ss_view", ui.view); } catch {}
  renderCollection();
});
$$("#quickChips .chip").forEach(c => c.onclick = () => {
  const k = c.dataset.quick; ui.quick.has(k) ? ui.quick.delete(k) : ui.quick.add(k);
  c.classList.toggle("on"); renderCollection();
});

/* ---------------- add / edit ---------------- */
const dlg = $("#itemDlg"), form = $("#itemForm");
function openEditor(id) {
  if (viewOnly) return;
  const it = id ? S.items.find(x => x.id === id) : null;
  ui.editing = it ? it.id : null;
  ui.photos = Object.assign({}, it?.photos || {});
  form.reset();
  $("#itemDlgTitle").textContent = it ? "Edit item" : "Add to collection";
  $("#deleteItem").classList.toggle("hidden", !it);
  const v = it || { format: cfg.formats[0]?.id, condition: "Good" };
  for (const el of form.elements) {
    if (!el.name) continue;
    if (el.type === "checkbox") el.checked = !!v[el.name];
    else if (el.name === "tags") el.value = (v.tags || []).join(", ");
    else if (el.name === "spine") el.value = v.spine || cfg.fmt[v.format]?.color || "#333333";
    else el.value = v[el.name] ?? "";
  }
  ["front", "spine", "back"].forEach(s => $("#p" + s[0].toUpperCase() + s.slice(1)).src = ui.photos[s] || "");
  updatePriceLinks();
  dlg.showModal();
  setTimeout(() => form.elements.title.focus(), 50);
}
function updatePriceLinks() {
  const q = encodeURIComponent([form.elements.title.value, fmtLabel(form.format.value)].filter(Boolean).join(" "));
  $("#priceLinks").innerHTML = form.elements.title.value ? "Look up price: " + (cfg.priceLinks || []).map(p =>
    `<a href="${esc(p.url.replace("{q}", q))}" target="_blank" rel="noopener">${esc(p.label)}</a>`).join(" · ") : "";
}
form.elements.title.addEventListener("input", updatePriceLinks);
form.format.addEventListener("change", () => {
  updatePriceLinks();
  if (!ui.editing) form.spine.value = cfg.fmt[form.format.value]?.color || "#333333";
});
form.barcode.addEventListener("change", () => {
  const dup = S.items.find(x => x.barcode && x.barcode === form.barcode.value.trim() && x.id !== ui.editing);
  if (dup) toast(`You already have this barcode: ${dup.title}`);
});
$$(".photo-slot input").forEach(inp => inp.onchange = async () => {
  const f = inp.files[0]; if (!f) return;
  try {
    const data = await shrinkPhoto(f);
    ui.photos[inp.dataset.slot] = data;
    inp.previousElementSibling.src = data;
  } catch { toast("Couldn't read that image"); }
  inp.value = "";
});
$("#cancelItem").onclick = () => { stopScan(); dlg.close(); };
dlg.addEventListener("close", stopScan);
form.addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(form), it = ui.editing ? S.items.find(x => x.id === ui.editing) : { id: uid(), added: Date.now() };
  const num = k => fd.get(k) === "" ? "" : Number(fd.get(k));
  Object.assign(it, {
    title: fd.get("title").trim(), format: fd.get("format"), year: num("year"), distributor: fd.get("distributor").trim(),
    barcode: fd.get("barcode").trim(), condition: fd.get("condition"), caseType: fd.get("caseType"),
    paid: num("paid"), value: num("value"), notes: fd.get("notes").trim(),
    tags: fd.get("tags").split(",").map(s => s.trim()).filter(Boolean),
    spine: fd.get("spine"), forTrade: !!fd.get("forTrade"), photos: ui.photos
  });
  if (!ui.editing) {
    const dup = S.items.find(x => norm(x.title) === norm(it.title) && x.format === it.format);
    if (dup && !confirm(`You already have "${dup.title}" on ${fmtLabel(dup.format)}. Add another copy?`)) return;
    S.items.push(it);
    const w = S.wants.find(w => titleMatch(w.title, it.title) && fmtMatch(w.format, it.format));
    if (w && confirm(`"${w.title}" is on your wantlist. Mark it as found and remove it?`)) S.wants = S.wants.filter(x => x !== w);
  }
  persist(); dlg.close(); render(); toast(ui.editing ? "Saved" : "Added to your shelf");
});
$("#deleteItem").onclick = () => {
  const it = S.items.find(x => x.id === ui.editing);
  if (it && confirm(`Delete "${it.title}"?`)) { S.items = S.items.filter(x => x !== it); persist(); dlg.close(); render(); }
};
$("#addBtn").onclick = () => openEditor(null);

/* ---------------- barcode scanning ---------------- */
let scanStream = null, scanLoop = null;
$("#scanBtn").onclick = async () => {
  if (scanStream) return stopScan();
  if (!("BarcodeDetector" in window)) { toast("This browser can't scan barcodes. Type the number instead."); form.barcode.focus(); return; }
  try {
    const det = new BarcodeDetector({ formats: ["ean_13", "upc_a", "upc_e", "ean_8", "code_128"] });
    scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    const v = $("#scanVideo"); v.srcObject = scanStream; v.classList.remove("hidden"); await v.play();
    $("#scanBtn").textContent = "Stop scanning";
    scanLoop = setInterval(async () => {
      try {
        const [hit] = await det.detect(v);
        if (hit) { form.barcode.value = hit.rawValue; form.barcode.dispatchEvent(new Event("change")); stopScan(); toast("Barcode: " + hit.rawValue); }
      } catch {}
    }, 300);
  } catch { toast("Camera not available"); stopScan(); }
};
function stopScan() {
  clearInterval(scanLoop); scanLoop = null;
  if (scanStream) scanStream.getTracks().forEach(t => t.stop());
  scanStream = null; $("#scanVideo").classList.add("hidden"); $("#scanBtn").textContent = "Scan barcode";
}

/* ---------------- 3D viewer ---------------- */
let rot = { x: -12, y: -28 }, spin = null;
function openViewer(id) {
  const it = items().find(x => x.id === id); if (!it) return;
  const f = cfg.fmt[it.format] || { w: 20, h: 180, d: 120 };
  const k = 260 / Math.max(f.h, f.d);
  const W = f.d * k, H = f.h * k, D = Math.max(f.w * k, 6);
  const c = spineColor(it), tc = readable(c), p = it.photos || {};
  const face = (cls, w, h, tf, img, label) =>
    `<div class="face ${cls}" style="width:${w}px;height:${h}px;margin:${-h / 2}px 0 0 ${-w / 2}px;transform:${tf};--c:${c};color:${tc};${img ? `background-image:url(${img})` : ""}">${img ? "" : label}</div>`;
  $("#case3d").innerHTML =
    face("front", W, H, `translateZ(${D / 2}px)`, p.front, esc(it.title)) +
    face("back", W, H, `rotateY(180deg) translateZ(${D / 2}px)`, p.back, esc(fmtLabel(it.format))) +
    face("spine", D, H, `rotateY(-90deg) translateZ(${W / 2}px)`, p.spine, "") +
    face("side", D, H, `rotateY(90deg) translateZ(${W / 2}px)`, "", "") +
    face("top", W, D, `rotateX(90deg) translateZ(${H / 2}px)`, "", "") +
    face("bottom", W, D, `rotateX(-90deg) translateZ(${H / 2}px)`, "", "");
  rot = { x: -12, y: -28 }; applyRot();
  clearInterval(spin); spin = setInterval(() => { rot.y += .4; applyRot(); }, 16);
  const row = (k, v) => v || v === 0 ? `<dt>${k}</dt><dd>${v}</dd>` : "";
  $("#viewInfo").innerHTML = `<h2>${esc(it.title)}</h2>
    <div>${it.forTrade ? `<span class="badge trade">Available for swap</span>` : ""}${(it.tags || []).map(t => `<span class="badge">${esc(t)}</span>`).join("")}</div>
    <dl>${row("Format", esc(fmtLabel(it.format)))}${row("Year", esc(it.year))}${row("Distributor", esc(it.distributor))}
      ${row("Condition", esc(it.condition))}${row("Case", esc(it.caseType))}${row("Barcode", esc(it.barcode))}
      ${row("Paid", it.paid !== "" && it.paid != null ? money(it.paid) : "")}${row("Value", it.value !== "" && it.value != null ? money(it.value) : "")}${row("Notes", esc(it.notes))}</dl>
    ${viewOnly ? "" : `<div class="btnrow"><button class="btn primary" id="editFromView">Edit</button>
      <button class="btn" id="toggleTrade">${it.forTrade ? "Remove from swap list" : "Mark for swap"}</button></div>`}`;
  if (!viewOnly) {
    $("#editFromView").onclick = () => { $("#viewDlg").close(); openEditor(it.id); };
    $("#toggleTrade").onclick = () => { it.forTrade = !it.forTrade; persist(); render(); openViewer(it.id); };
  }
  if (!$("#viewDlg").open) $("#viewDlg").showModal();
}
function applyRot() { $("#case3d").style.transform = `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`; }
(() => {
  const st = $("#stage3d"); let drag = null;
  st.addEventListener("pointerdown", e => { clearInterval(spin); drag = { x: e.clientX, y: e.clientY, r: { ...rot } }; st.setPointerCapture(e.pointerId); });
  st.addEventListener("pointermove", e => {
    if (!drag) return;
    rot.y = drag.r.y + (e.clientX - drag.x) * .5;
    rot.x = Math.max(-80, Math.min(80, drag.r.x - (e.clientY - drag.y) * .5)); applyRot();
  });
  st.addEventListener("pointerup", () => drag = null);
})();
$("#closeView").onclick = () => $("#viewDlg").close();
$("#viewDlg").addEventListener("close", () => clearInterval(spin));

/* ---------------- wantlist ---------------- */
$("#wantForm").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const w = { id: uid(), title: fd.get("title").trim(), format: fd.get("format"), maxPrice: fd.get("maxPrice") === "" ? "" : Number(fd.get("maxPrice")), priority: Number(fd.get("priority")), added: Date.now() };
  const have = S.items.find(it => titleMatch(w.title, it.title) && fmtMatch(w.format, it.format));
  if (have && !confirm(`You already own "${have.title}" on ${fmtLabel(have.format)}. Add it to your wantlist anyway?`)) return;
  S.wants.push(w); persist(); e.target.reset(); renderWants();
});
function friendHits(w) {
  return S.friends.flatMap(fr => fr.trade.filter(t => titleMatch(w.title, t.title) && fmtMatch(w.format, t.format)).map(() => fr.name));
}
function renderWants() {
  const list = [...S.wants].sort((a, b) => b.priority - a.priority || norm(a.title).localeCompare(norm(b.title)));
  const pri = { 3: "Grail", 2: "Want", 1: "Maybe" };
  $("#wantList").innerHTML = list.length ? `<div class="card" style="padding:0">` + list.map(w => {
    const hits = [...new Set(friendHits(w))];
    const q = encodeURIComponent(w.title + (w.format !== "any" ? " " + fmtLabel(w.format) : ""));
    return `<div class="want-item"><span class="pri pri-${w.priority}">${pri[w.priority]}</span>
      <div class="grow"><b>${esc(w.title)}</b><div class="small muted">${esc(fmtLabel(w.format))}${w.maxPrice !== "" ? " · up to " + money(w.maxPrice) : ""}
      ${hits.length ? ` · <span style="color:var(--good);font-weight:700">${esc(hits.join(", "))} can swap this</span>` : ""}</div></div>
      ${(cfg.priceLinks || []).slice(0, 1).map(p => `<a class="btn sm" target="_blank" rel="noopener" href="${esc(p.url.replace("{q}", q))}">Prices</a>`).join("")}
      <button class="btn sm" data-got="${w.id}">Got it</button><button class="btn sm danger" data-del="${w.id}">✕</button></div>`;
  }).join("") + `</div>` : `<p class="muted empty">Your wantlist is empty. Add the titles you're hunting for — friends' swap cards are checked against it.</p>`;
}
$("#wantList").addEventListener("click", e => {
  const del = e.target.dataset.del, got = e.target.dataset.got;
  if (del) { S.wants = S.wants.filter(w => w.id !== del); persist(); renderWants(); }
  if (got) {
    const w = S.wants.find(x => x.id === got);
    S.wants = S.wants.filter(x => x.id !== got); persist();
    openEditor(null); form.elements.title.value = w.title; if (w.format !== "any") form.format.value = w.format; updatePriceLinks();
  }
});

/* ---------------- swaps ---------------- */
const myTrade = () => S.items.filter(i => i.forTrade);
function myCard() {
  return { v: 1, k: "swap", n: cfg.collectorName || "Collector", at: Date.now(),
    t: myTrade().map(i => [i.id, i.title, i.format, i.year || "", i.condition || "", i.value || 0]),
    w: S.wants.map(w => [w.title, w.format, w.maxPrice || "", w.priority]) };
}
function parseCard(c) {
  if (c.k !== "swap") throw new Error("not a swap card");
  return { id: uid(), name: String(c.n || "Friend").slice(0, 40), at: c.at || Date.now(),
    trade: (c.t || []).map(([id, title, format, year, condition, value]) => ({ id, title, format, year, condition, value: Number(value) || 0 })),
    wants: (c.w || []).map(([title, format, maxPrice, priority]) => ({ title, format, maxPrice, priority })) };
}
function renderSwap() {
  const t = myTrade();
  $("#myCardSummary").innerHTML = `<b>${t.length}</b> item${t.length === 1 ? "" : "s"} for swap · <b>${S.wants.length}</b> on your wantlist` +
    (t.length ? "" : ` — <span class="muted">open an item and tap “Mark for swap”.</span>`);
  $("#friendList").innerHTML = S.friends.map(f => `<span class="friend-pill">${esc(f.name)} <button class="btn sm" data-open="${f.id}">Match</button><button class="btn sm danger" data-rm="${f.id}">✕</button></span>`).join("");
  $("#tradeLog").innerHTML = S.trades.length ? S.trades.slice().reverse().map(tr =>
    `<div class="pick"><div class="grow"><b>${esc(tr.with)}</b> · ${new Date(tr.at).toLocaleDateString()}<br>
     Gave: ${esc(tr.gave.map(g => g.title).join(", ") || "—")}<br>Got: ${esc(tr.got.map(g => g.title).join(", ") || "—")}</div></div>`).join("")
    : "No swaps yet.";
  if (ui.friend && !S.friends.find(f => f.id === ui.friend)) ui.friend = null;
  renderMatches();
}
$("#copyCardLink").onclick = async () => copy(pageUrl() + "#swap=" + await encode(myCard()), "Swap link");
$("#copyCardCode").onclick = async () => copy(await encode(myCard()), "Swap code");
$("#copyShelfLink").onclick = async () => {
  const data = { v: 1, k: "view", n: cfg.collectorName, items: S.items.map(({ photos, paid, ...rest }) => rest) };
  copy(pageUrl() + "#view=" + await encode(data), "View-only link");
};
async function importFriend(code) {
  try {
    const fr = parseCard(await decode(code));
    const old = S.friends.find(f => f.name === fr.name);
    if (old) { fr.id = old.id; S.friends[S.friends.indexOf(old)] = fr; } else S.friends.push(fr);
    persist(); ui.friend = fr.id; ui.pick = null; renderSwap(); toast(`Loaded ${fr.name}'s swap card`);
    return true;
  } catch { toast("That doesn't look like a swap code"); return false; }
}
$("#loadFriend").onclick = async () => { if (await importFriend($("#friendCode").value)) $("#friendCode").value = ""; };
$("#friendList").addEventListener("click", e => {
  if (e.target.dataset.open) { ui.friend = e.target.dataset.open; ui.pick = null; renderMatches(); }
  if (e.target.dataset.rm) { S.friends = S.friends.filter(f => f.id !== e.target.dataset.rm); persist(); renderSwap(); }
});

function renderMatches() {
  const box = $("#matchArea"), fr = S.friends.find(f => f.id === ui.friend);
  if (!fr) { box.innerHTML = ""; return; }
  const mine = myTrade();
  const theyWant = it => fr.wants.some(w => titleMatch(w.title, it.title) && fmtMatch(w.format, it.format));
  const iWant = it => S.wants.some(w => titleMatch(w.title, it.title) && fmtMatch(w.format, it.format));
  if (!ui.pick) ui.pick = { give: new Set(mine.filter(theyWant).map(i => i.id)), get: new Set(fr.trade.filter(iWant).map(i => i.id)) };
  const give = mine.filter(i => ui.pick.give.has(i.id)), get = fr.trade.filter(i => ui.pick.get.has(i.id));
  const gv = give.reduce((s, i) => s + (Number(i.value) || 0), 0), tv = get.reduce((s, i) => s + (Number(i.value) || 0), 0);
  const total = gv + tv, diff = total ? Math.abs(gv - tv) / Math.max(gv, tv) * 100 : 0;
  const fair = diff <= (cfg.fairTradePercent ?? 15);
  const nHits = mine.filter(theyWant).length + fr.trade.filter(iWant).length;
  const col = (list, side, isHit) => list.length ? list.map(i => `<label class="pick ${isHit(i) ? "hit" : ""}">
      <input type="checkbox" data-side="${side}" value="${esc(i.id)}" ${ui.pick[side].has(i.id) ? "checked" : ""}>
      <span class="grow"><b>${esc(i.title)}</b> <span class="small muted">${esc(fmtLabel(i.format))}${i.year ? " · " + esc(i.year) : ""}${i.condition ? " · " + esc(i.condition) : ""}</span>
      ${isHit(i) ? `<br><span class="small" style="color:var(--good);font-weight:700">${side === "give" ? "On their wantlist" : "On your wantlist"}</span>` : ""}</span>
      <span class="small">${money(i.value)}</span></label>`).join("") : `<p class="muted small">Nothing listed.</p>`;
  box.innerHTML = `<div class="card">
    <h2>Swap with ${esc(fr.name)}</h2>
    <p class="small muted">Card from ${new Date(fr.at).toLocaleDateString()} · ${nHits ? `<b style="color:var(--good)">${nHits} wantlist match${nHits > 1 ? "es" : ""}</b>` : "no wantlist matches yet — you can still pick anything"}</p>
    <div class="match-cols">
      <div><h2>You give · ${money(gv)}</h2>${col(mine, "give", theyWant)}</div>
      <div><h2>You get · ${money(tv)}</h2>${col(fr.trade, "get", iWant)}</div>
    </div>
    <div class="scale"><span style="left:0;width:${total ? gv / total * 100 : 50}%;background:var(--accent)"></span><span style="right:0;width:${total ? tv / total * 100 : 50}%;background:var(--good)"></span></div>
    <p>${give.length || get.length ? `<span class="verdict ${fair ? "fair" : "off"}">${fair ? "Fair swap" : (gv > tv ? `You're giving ${money(gv - tv)} more` : `You're getting ${money(tv - gv)} more`)}</span>` : `<span class="muted">Pick items on both sides.</span>`}</p>
    <div class="btnrow"><button class="btn" id="copyOffer">Copy offer message</button><button class="btn primary" id="recordSwap">Record swap as done</button></div>
  </div>`;
  $$("#matchArea input[type=checkbox]").forEach(cb => cb.onchange = () => {
    ui.pick[cb.dataset.side][cb.checked ? "add" : "delete"](cb.value); renderMatches();
  });
  $("#copyOffer").onclick = () => copy(`Swap offer from ${cfg.collectorName}:\nI give: ${give.map(i => `${i.title} (${fmtLabel(i.format)})`).join(", ") || "—"}\nYou give: ${get.map(i => `${i.title} (${fmtLabel(i.format)})`).join(", ") || "—"}`, "Offer");
  $("#recordSwap").onclick = () => {
    if (!give.length && !get.length) return toast("Pick something first");
    if (!confirm(`Record this swap with ${fr.name}?\n\nItems you give will leave your shelf, and items you get will be added.`)) return;
    const gaveIds = new Set(give.map(i => i.id));
    S.items = S.items.filter(i => !gaveIds.has(i.id));
    get.forEach(i => S.items.push({ id: uid(), added: Date.now(), title: i.title, format: i.format, year: i.year, condition: i.condition, value: i.value, paid: "", tags: ["swapped"], notes: `Swapped with ${fr.name}`, forTrade: false, photos: {} }));
    S.wants = S.wants.filter(w => !get.some(i => titleMatch(w.title, i.title) && fmtMatch(w.format, i.format)));
    S.trades.push({ at: Date.now(), with: fr.name, gave: give.map(i => ({ title: i.title, format: i.format })), got: get.map(i => ({ title: i.title, format: i.format })) });
    fr.trade = fr.trade.filter(i => !ui.pick.get.has(i.id));
    ui.pick = null; persist(); render(); toast("Swap recorded");
  };
}

/* ---------------- stats ---------------- */
function renderStats() {
  const all = items(), sum = k => all.reduce((s, i) => s + (Number(i[k]) || 0), 0);
  const value = sum("value"), paid = sum("paid");
  const tiles = [
    [all.length, "Items"], [money(value), "Estimated value"], [money(paid), "Total paid"],
    [(value - paid >= 0 ? "+" : "−") + money(Math.abs(value - paid)), "Value vs. paid"],
    [all.filter(i => i.forTrade).length, "For swap"], [S.wants.length, "On wantlist"], [S.trades.length, "Swaps done"]
  ];
  $("#statTiles").innerHTML = tiles.map(([n, l]) => `<div class="tile"><div class="n">${n}</div><div class="l">${l}</div></div>`).join("");
  const bars = (rows, el) => {
    const max = Math.max(1, ...rows.map(r => r[1]));
    $(el).innerHTML = rows.length ? rows.map(([l, n]) => `<div class="bar"><span>${esc(l)}</span><div class="track"><div class="fill" style="width:${n / max * 100}%"></div></div><span class="v">${n}</span></div>`).join("") : `<p class="muted small">No data yet.</p>`;
  };
  bars(cfg.formats.map(f => [f.label, all.filter(i => i.format === f.id).length]).filter(r => r[1]), "#fmtBars");
  const dec = {}; all.forEach(i => { if (i.year) { const d = Math.floor(i.year / 10) * 10 + "s"; dec[d] = (dec[d] || 0) + 1; } });
  bars(Object.entries(dec).sort(), "#decadeBars");
  const top = [...all].filter(i => i.value).sort((a, b) => b.value - a.value).slice(0, 10);
  $("#topValue").innerHTML = top.length ? top.map(i => `<div class="pick" data-id="${i.id}" style="cursor:pointer"><span class="grow"><b>${esc(i.title)}</b> <span class="small muted">${esc(fmtLabel(i.format))}</span></span><b>${money(i.value)}</b></div>`).join("") : `<p class="muted small">Add values to your items to see this.</p>`;
}
$("#topValue").addEventListener("click", e => { const el = e.target.closest("[data-id]"); if (el) openViewer(el.dataset.id); });

/* ---------------- settings ---------------- */
function renderSettings() {
  const f = $("#settingsForm");
  ["appName", "tagline", "collectorName", "accent", "currency", "fairTradePercent", "theme"].forEach(k => f[k].value = cfg[k] ?? "");
}
$("#settingsForm").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  S.settings = Object.fromEntries([...fd].map(([k, v]) => [k, k === "fairTradePercent" ? Number(v) : v]));
  persist(); buildCfg(); applyBrand(); render(); toast("Settings saved");
});
$("#resetSettings").onclick = () => { S.settings = {}; persist(); buildCfg(); applyBrand(); render(); toast("Back to config.js settings"); };

const CSV_COLS = ["title", "format", "year", "distributor", "barcode", "condition", "caseType", "paid", "value", "tags", "notes", "forTrade"];
$("#exportJson").onclick = () => download(`shelf-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify({ app: "shelf-swap", ...S }, null, 1), "application/json");
$("#exportCsv").onclick = () => {
  const cell = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = S.items.map(i => CSV_COLS.map(c => cell(c === "tags" ? (i.tags || []).join(", ") : c === "format" ? fmtLabel(i.format) : c === "forTrade" ? (i.forTrade ? "yes" : "") : i[c])).join(","));
  download("shelf.csv", [CSV_COLS.join(","), ...rows].join("\n"), "text/csv");
};
function parseCsv(text) {
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"' && text[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch; }
    else if (ch === '"') q = true; else if (ch === ",") { row.push(cur); cur = ""; }
    else if (ch === "\n" || ch === "\r") { if (ch === "\r" && text[i + 1] === "\n") i++; row.push(cur); rows.push(row); row = []; cur = ""; }
    else cur += ch;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  return rows.filter(r => r.some(c => c.trim()));
}
$("#importFile").onchange = async e => {
  const file = e.target.files[0]; e.target.value = ""; if (!file) return;
  const text = await file.text();
  try {
    if (file.name.endsWith(".json")) {
      const d = JSON.parse(text);
      if (!Array.isArray(d.items)) throw 0;
      if (!confirm(`Replace your data with this backup (${d.items.length} items)?`)) return;
      S = { items: d.items, wants: d.wants || [], friends: d.friends || [], trades: d.trades || [], settings: d.settings || {} };
    } else {
      const [head, ...rows] = parseCsv(text);
      const idx = Object.fromEntries(head.map((h, i) => [h.trim().toLowerCase().replace(/[^a-z]/g, ""), i]));
      const get = (r, k) => (r[idx[k.toLowerCase()]] ?? "").trim();
      const fmtId = l => (cfg.formats.find(f => f.label.toLowerCase() === l.toLowerCase() || f.id === l.toLowerCase()) || cfg.formats[0]).id;
      const added = rows.map(r => ({
        id: uid(), added: Date.now(), title: get(r, "title"), format: fmtId(get(r, "format")), year: Number(get(r, "year")) || "",
        distributor: get(r, "distributor"), barcode: get(r, "barcode"), condition: get(r, "condition"), caseType: get(r, "casetype"),
        paid: Number(get(r, "paid")) || "", value: Number(get(r, "value")) || "", tags: get(r, "tags").split(",").map(s => s.trim()).filter(Boolean),
        notes: get(r, "notes"), forTrade: /^(y|yes|true|1)$/i.test(get(r, "fortrade")), photos: {}
      })).filter(i => i.title);
      if (!confirm(`Add ${added.length} items from this spreadsheet?`)) return;
      S.items.push(...added);
    }
    persist(); buildCfg(); applyBrand(); render(); toast("Imported");
  } catch { toast("Couldn't read that file"); }
};
$("#wipeAll").onclick = () => {
  if (confirm("Erase your whole collection, wantlist, friends and swap history from this device?") && confirm("Really erase everything? This can't be undone.")) {
    S = { items: [], wants: [], friends: [], trades: [], settings: S.settings }; persist(); render();
  }
};

/* ---------------- sample data ---------------- */
$("#sampleBtn").onclick = () => {
  const s = (title, format, year, distributor, condition, value, extra = {}) => ({ id: uid(), added: Date.now() - Math.random() * 1e9, title, format, year, distributor, condition, value, paid: Math.round(value * .6), tags: [], notes: "", photos: {}, ...extra });
  S.items.push(
    s("Night of the Living Dead", "vhs", 1968, "Media Home Entertainment", "Good", 18, { tags: ["horror"], caseType: "Big Box" }),
    s("The General", "vhs", 1926, "Republic Pictures", "Very Good", 9, { forTrade: true }),
    s("His Girl Friday", "vhs", 1940, "Goodtimes", "Good", 6, { forTrade: true }),
    s("Nosferatu", "vhs", 1922, "Kino Video", "Near Mint", 14, { tags: ["horror", "silent"] }),
    s("Metropolis", "laser", 1927, "Image Entertainment", "Very Good", 35),
    s("Plan 9 from Outer Space", "vhs", 1957, "Nostalgia Merchant", "Fair", 22, { tags: ["cult"], caseType: "Clamshell" }),
    s("Charade", "dvd", 1963, "Criterion", "Mint", 12, { forTrade: true }),
    s("The Little Shop of Horrors", "dvd", 1960, "Alpha Video", "Good", 4),
    s("Carnival of Souls", "bluray", 1962, "Criterion", "Sealed", 28, { tags: ["horror"] }),
    s("Detour", "bluray", 1945, "Criterion", "Mint", 25),
    s("The Cabinet of Dr. Caligari", "uhd", 1920, "Kino Lorber", "Sealed", 40, { forTrade: true }),
    s("Reefer Madness", "beta", 1936, "Video Yesteryear", "Good", 15, { tags: ["cult"] })
  );
  S.wants.push(
    { id: uid(), title: "Dementia 13", format: "vhs", maxPrice: 15, priority: 3, added: Date.now() },
    { id: uid(), title: "House on Haunted Hill", format: "any", maxPrice: "", priority: 2, added: Date.now() }
  );
  persist(); render(); toast("Sample shelf loaded");
};

/* ---------------- render ---------------- */
function render() {
  const t = currentTab();
  if (t === "shelf") renderCollection();
  if (t === "want") renderWants();
  if (t === "swap") renderSwap();
  if (t === "stats") renderStats();
  if (t === "settings") renderSettings();
}

/* ---------------- links in the URL ---------------- */
async function handleHash() {
  const h = location.hash;
  if (h.startsWith("#swap=")) {
    history.replaceState(null, "", pageUrl());
    showTab("swap"); await importFriend(h);
  } else if (h.startsWith("#view=")) {
    try {
      const d = await decode(h);
      if (d.k !== "view") throw 0;
      viewOnly = { name: d.n || "A collector", items: (d.items || []).map(i => ({ ...i, photos: {} })) };
      document.body.classList.add("view-only");
      $("#addBtn").classList.add("hidden");
      $$('.tabs button').forEach(b => b.classList.toggle("hidden", !["shelf", "stats"].includes(b.dataset.tab)));
      const ban = $("#viewBanner");
      ban.innerHTML = `<span>Viewing ${esc(viewOnly.name)}'s shelf (read-only)</span><button class="btn sm" id="exitView">Back to my shelf</button>`;
      ban.classList.remove("hidden");
      $("#exitView").onclick = () => { location.href = pageUrl(); };
      showTab("shelf");
    } catch { toast("That shelf link is broken"); }
  }
}

/* ---------------- boot ---------------- */
(async () => {
  const saved = await load("state", null);
  if (saved) S = Object.assign(S, saved);
  try { ui.view = localStorage.getItem("ss_view") || "shelf"; } catch {}
  $$("#viewSeg button").forEach(x => x.classList.toggle("active", x.dataset.view === ui.view));
  buildCfg(); applyBrand(); fillSelects(); render();
  await handleHash();
  window.addEventListener("hashchange", handleHash);
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
})();
