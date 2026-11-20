// Designs are kept on this device in IndexedDB (works offline, no account).
const DB = 'atelier-studio', STORE = 'designs';
let dbp = null;
function db() {
  if (!dbp) dbp = new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE, { keyPath: 'id' });
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
  return dbp;
}
async function tx(mode, fn) {
  const d = await db();
  return new Promise((res, rej) => { const t = d.transaction(STORE, mode), s = t.objectStore(STORE), r = fn(s); t.oncomplete = () => res(r?.result); t.onerror = () => rej(t.error); });
}
export const saveDesign = (rec) => tx('readwrite', (s) => s.put(rec));
export const getDesign = (id) => tx('readonly', (s) => s.get(id));
export const deleteDesign = (id) => tx('readwrite', (s) => s.delete(id));
export async function listDesigns() {
  const all = (await tx('readonly', (s) => s.getAll())) || [];
  return all.sort((a, b) => b.updated - a.updated);
}
export const newId = () => 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// Project file (.atelier): JSON with the layers as PNG data URLs, so it can move between computers.
const toDataURL = (blob) => new Promise((r) => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(blob); });
const fromDataURL = async (u) => (await fetch(u)).blob();
export async function toProjectFile(rec) {
  const out = { app: 'Atelier Studio', version: 1, name: rec.name, created: rec.created, updated: rec.updated, body: rec.body, portfolio: !!rec.portfolio, notes: rec.notes || '', layers: {} };
  for (const k of ['color', 'mat', 'lines']) if (rec.layers?.[k]) out.layers[k] = await toDataURL(rec.layers[k]);
  return new Blob([JSON.stringify(out)], { type: 'application/json' });
}
export async function fromProjectFile(text) {
  const j = JSON.parse(text);
  if (j.app !== 'Atelier Studio') throw new Error('This is not an Atelier Studio design file.');
  const layers = {};
  for (const k of ['color', 'mat', 'lines']) if (j.layers?.[k]) layers[k] = await fromDataURL(j.layers[k]);
  return { id: newId(), name: j.name || 'Imported design', created: j.created || Date.now(), updated: Date.now(), body: j.body, portfolio: !!j.portfolio, notes: j.notes || '', layers };
}
