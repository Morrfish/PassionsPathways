// Character pictures, saved on this device in IndexedDB (separate from chats, so they
// don't fill up the main storage). Kept in memory once loaded so screens draw instantly.
import { markPic } from './store.js';

const DB = 'anime-squad-pics';
const STORE = 'pics';
const pics = new Map(); // characterId -> data URL

function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx(mode, fn) {
  const db = await open();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const result = fn(t.objectStore(STORE));
    t.oncomplete = () => { db.close(); resolve(result); };
    t.onerror = () => { db.close(); reject(t.error); };
  });
}

export async function loadPics() {
  try {
    await tx('readonly', (store) => {
      const req = store.openCursor();
      req.onsuccess = () => {
        const cur = req.result;
        if (!cur) return;
        pics.set(cur.key, cur.value);
        cur.continue();
      };
    });
  } catch (err) {
    console.warn('Pictures could not be loaded', err);
  }
}

export const getPic = (id) => pics.get(id);

export const picIds = () => [...pics.keys()];

// Raw versions are used by sync (they don't count as a new change).
export async function setPicRaw(id, dataUrl) {
  await tx('readwrite', (store) => store.put(dataUrl, id));
  pics.set(id, dataUrl);
}

export async function deletePicRaw(id) {
  await tx('readwrite', (store) => store.delete(id));
  pics.delete(id);
}

export async function setPic(id, dataUrl) {
  await setPicRaw(id, dataUrl);
  markPic(id);
}

export async function deletePic(id) {
  await deletePicRaw(id);
  markPic(id, true);
}

// Turns any picture file into a small square JPEG (keeps the top-center, where faces usually are).
export async function fileToSquarePic(file, size = 320) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error("That file isn't a picture this device can open."));
      i.src = url;
    });
    const w = img.naturalWidth, h = img.naturalHeight;
    const s = Math.min(w, h);
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#120b24';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, (w - s) / 2, (h - s) * 0.25, s, s, 0, 0, size, size);
    return canvas.toDataURL('image/jpeg', 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}
