// Keeps the phone and computer in step through a secret GitHub Gist in the user's own
// GitHub account. Each device merges its data with the gist: for every bot, chat, task,
// note, character and picture, the newest change wins (deletions count as changes).
import { KINDS, itemsOf, getState, saveQuiet, snapshot, applySnapshot, getSaveCount, setOnSaved } from './store.js';
import { getPic, picIds, setPicRaw, deletePicRaw } from './pics.js';

const API = 'https://api.github.com';
const DESC = 'Anime Squad sync data (made by the Anime Squad app, keep this secret)';
const MAIN_FILE = 'squad.json';
const picFile = (id) => `pic-${id}.txt`;
const TOMB_DAYS = 90;
const POLL_MS = 20000;

export const TOKEN_URL = 'https://github.com/settings/tokens/new?scopes=gist&description=Anime%20Squad%20sync';

class SyncError extends Error {}

async function gh(token, path, { method = 'GET', body } = {}) {
  let res;
  try {
    res = await fetch(API + path, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    });
  } catch {
    throw new SyncError('No internet connection. Will try again.');
  }
  if (res.status === 401) throw new SyncError('GitHub did not accept the sync key. Check it, or make a new one.');
  if (res.status === 403 || res.status === 404) throw new SyncError('The sync key needs the "gist" permission. Make a new one with the link below.');
  if (!res.ok) throw new SyncError(`GitHub had a problem (${res.status}). Will try again.`);
  return res.json();
}

async function fileText(file) {
  if (!file) return null;
  if (!file.truncated && typeof file.content === 'string') return file.content;
  const res = await fetch(file.raw_url, { cache: 'no-store' });
  if (!res.ok) throw new SyncError('Could not download synced data. Will try again.');
  return res.text();
}

// Finds this user's Anime Squad gist, or makes one. Returns its id.
async function findOrCreateGist(token) {
  for (let page = 1; page <= 10; page++) {
    const list = await gh(token, `/gists?per_page=100&page=${page}`);
    const found = list.find((g) => g.description === DESC);
    if (found) return found.id;
    if (list.length < 100) break;
  }
  const made = await gh(token, '/gists', {
    method: 'POST',
    body: { description: DESC, public: false, files: { [MAIN_FILE]: { content: JSON.stringify({ version: 1, meta: { stamps: {}, tombs: {} } }) } } },
  });
  return made.id;
}

// ---------- merging ----------
function pickWinner(id, hasL, hasR, ls, rs, lt, rt) {
  const lu = hasL ? (ls?.[id] ?? 0) : -Infinity;
  const ru = hasR ? (rs?.[id] ?? 0) : -Infinity;
  const tomb = Math.max(lt?.[id] ?? -Infinity, rt?.[id] ?? -Infinity);
  if (tomb >= Math.max(lu, ru)) return { deleted: tomb };
  return ru > lu ? { side: 'remote', time: ru } : { side: 'local', time: lu };
}

// Merges two snapshots. Returns the merged snapshot and which pictures must move.
export function merge(local, remote, localPicIds) {
  const cutoff = Date.now() - TOMB_DAYS * 864e5;
  const meta = { stamps: {}, tombs: {} };
  const out = { version: 1, meta };
  const lm = local.meta ?? {}, rm = remote.meta ?? {};
  const picsDown = [], picsUp = [], picsDeleteLocal = [];

  for (const kind of [...KINDS, 'pics']) {
    const L = kind === 'pics' ? new Map(localPicIds.map((id) => [id, true])) : itemsOf(local, kind);
    const R = kind === 'pics' ? new Map(Object.keys(rm.stamps?.pics ?? {}).map((id) => [id, true])) : itemsOf(remote, kind);
    const ls = lm.stamps?.[kind], rs = rm.stamps?.[kind], lt = lm.tombs?.[kind], rt = rm.tombs?.[kind];
    const ids = new Set([...L.keys(), ...R.keys(), ...Object.keys(lt ?? {}), ...Object.keys(rt ?? {})]);
    const items = new Map();
    for (const id of ids) {
      const w = pickWinner(id, L.has(id), R.has(id), ls, rs, lt, rt);
      if ('deleted' in w) {
        if (w.deleted > cutoff) (meta.tombs[kind] ??= {})[id] = w.deleted;
        if (kind === 'pics' && L.has(id)) picsDeleteLocal.push(id);
        continue;
      }
      (meta.stamps[kind] ??= {})[id] = w.time;
      items.set(id, (w.side === 'local' ? L : R).get(id));
      if (kind === 'pics') {
        if (w.side === 'remote' && (!L.has(id) || (ls?.[id] ?? 0) < w.time)) picsDown.push(id);
        if (w.side === 'local' && (!R.has(id) || (rs?.[id] ?? 0) < w.time)) picsUp.push(id);
      }
    }
    if (kind === 'chats') out.chats = Object.fromEntries(items);
    else if (kind === 'settings') out.shared = items.get('shared') ?? local.shared;
    else if (kind !== 'pics') out[kind] = [...items.values()];
  }
  out.tasks.sort((a, b) => (a.created ?? 0) - (b.created ?? 0));
  out.notes.sort((a, b) => (b.created ?? 0) - (a.created ?? 0));
  out.customCharacters.sort((a, b) => b.id.localeCompare(a.id));
  return { merged: out, picsDown, picsUp, picsDeleteLocal };
}

const metaKey = (m) => JSON.stringify(Object.fromEntries([...KINDS, 'pics'].map((k) => [k, [
  Object.entries(m?.stamps?.[k] ?? {}).sort(), Object.entries(m?.tombs?.[k] ?? {}).sort()]])));

// ---------- the sync loop ----------
let running = false;
let again = false;
let pushTimer = null;
let isBusy = () => false;
let onChange = () => {};
let onStatus = () => {};

export const syncOn = () => !!(getState().sync.token && getState().sync.gistId);

export function startSync({ busyCheck, changed, status }) {
  isBusy = busyCheck;
  onChange = changed;
  onStatus = status;
  setOnSaved(() => {
    if (!syncOn()) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => syncNow(), 2500);
  });
  setInterval(() => { if (document.visibilityState === 'visible') syncNow(); }, POLL_MS);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') syncNow(); });
  window.addEventListener('online', () => syncNow());
  syncNow();
}

export async function connect(token) {
  token = token.trim();
  if (!token) throw new SyncError('Paste your GitHub sync key first.');
  const gistId = await findOrCreateGist(token);
  const s = getState();
  s.sync = { token, gistId, lastSync: 0, lastError: '' };
  saveQuiet();
  await syncNow();
  if (s.sync.lastError) throw new SyncError(s.sync.lastError);
}

export function disconnect() {
  getState().sync = { token: '', gistId: '', lastSync: 0, lastError: '' };
  saveQuiet();
  onStatus();
}

export async function syncNow() {
  if (!syncOn()) return;
  if (running || isBusy()) { again = true; return; }
  running = true;
  onStatus();
  const s = getState();
  const { token, gistId } = s.sync;
  try {
    const gist = await gh(token, `/gists/${gistId}`);
    const text = await fileText(gist.files[MAIN_FILE]);
    const remote = text ? JSON.parse(text) : { version: 1, meta: { stamps: {}, tombs: {} } };
    const before = getSaveCount();
    const local = snapshot();
    const { merged, picsDown, picsUp, picsDeleteLocal } = merge(local, remote, picIds());

    // Bring in new pictures first, so they're there when the screens redraw.
    const downloaded = [];
    for (const id of picsDown) {
      const content = await fileText(gist.files[picFile(id)]);
      if (content?.startsWith('data:image/')) downloaded.push([id, content]);
    }
    // If you changed something while this was running, start over with the new data.
    if (getSaveCount() !== before || isBusy()) { again = true; return; }

    const localChanged = metaKey(merged.meta) !== metaKey(local.meta) || picsDown.length || picsDeleteLocal.length;
    const remoteChanged = metaKey(merged.meta) !== metaKey(remote.meta) || picsUp.length;
    for (const [id, content] of downloaded) await setPicRaw(id, content);
    for (const id of picsDeleteLocal) await deletePicRaw(id);
    if (localChanged) applySnapshot(merged);

    if (remoteChanged) {
      const files = { [MAIN_FILE]: { content: JSON.stringify(merged) } };
      for (const id of picsUp) { const pic = getPic(id); if (pic) files[picFile(id)] = { content: pic }; }
      const keep = new Set(Object.keys(merged.meta.stamps.pics ?? {}).map(picFile));
      for (const name of Object.keys(gist.files)) if (name.startsWith('pic-') && !keep.has(name)) files[name] = null;
      await gh(token, `/gists/${gistId}`, { method: 'PATCH', body: { files } });
    }
    s.sync.lastSync = Date.now();
    s.sync.lastError = '';
    saveQuiet();
    if (localChanged) onChange();
  } catch (err) {
    s.sync.lastError = err instanceof SyncError ? err.message : `Sync problem: ${err?.message || err}`;
    saveQuiet();
    console.warn('sync', err);
  } finally {
    running = false;
    onStatus();
    if (again) { again = false; setTimeout(() => syncNow(), 800); }
  }
}

export const syncRunning = () => running;
