// Everything is saved on this device (localStorage). Sync (sync.js) copies it between devices.
//
// For syncing, every save notes WHEN each item last changed (meta.stamps) and when items
// were deleted (meta.tombs). When two devices meet, the newest change to each item wins.
const KEY = 'anime-squad-v1';

// Kinds of synced items. Each is a list of objects with an `id`, except:
//   chats    -> chats[botId] = messages
//   settings -> the shared settings (model, web search, your name)
export const KINDS = ['bots', 'tasks', 'notes', 'customCharacters', 'chats', 'settings'];
const SHARED_SETTINGS = ['model', 'webSearch', 'userName'];

const DEFAULTS = {
  settings: { apiKey: '', model: 'claude-opus-5-5', webSearch: true, userName: '' },
  customCharacters: [],
  bots: [],
  chats: {}, // botId -> array of Claude API messages
  tasks: [], // { id, text, due, done, botId, created }
  notes: [], // { id, title, body, botId, created }
  meta: { stamps: {}, tombs: {} }, // kind -> { id: time }  (also kind "pics")
  sync: { token: '', gistId: '', lastSync: 0, lastError: '' }, // this device only
};

let state = load();
let lastStrings = itemStrings(state);
let saveCount = 0;
let onSaved = null;

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULTS);
    const saved = JSON.parse(raw);
    const d = structuredClone(DEFAULTS);
    return {
      ...d, ...saved,
      settings: { ...d.settings, ...saved.settings },
      meta: { stamps: { ...saved.meta?.stamps }, tombs: { ...saved.meta?.tombs } },
      sync: { ...d.sync, ...saved.sync },
    };
  } catch {
    return structuredClone(DEFAULTS);
  }
}

// kind -> Map(id -> item) for the synced items in a state or snapshot.
export function itemsOf(s, kind) {
  if (kind === 'chats') return new Map(Object.entries(s.chats ?? {}));
  if (kind === 'settings') {
    const shared = s.shared ?? Object.fromEntries(SHARED_SETTINGS.map((k) => [k, s.settings?.[k]]));
    return new Map([['shared', shared]]);
  }
  return new Map((s[kind] ?? []).map((x) => [x.id, x]));
}

function itemStrings(s) {
  const out = new Map();
  for (const kind of KINDS) for (const [id, item] of itemsOf(s, kind)) out.set(`${kind}\u0000${id}`, JSON.stringify(item));
  return out;
}

// Notes the time of every item that changed or disappeared since the last save.
function stamp() {
  const now = Date.now();
  const strings = itemStrings(state);
  const { stamps, tombs } = state.meta;
  for (const [key, str] of strings) {
    if (lastStrings.get(key) !== str) {
      const [kind, id] = key.split('\u0000');
      (stamps[kind] ??= {})[id] = now;
      if (tombs[kind]) delete tombs[kind][id];
    }
  }
  for (const key of lastStrings.keys()) {
    if (!strings.has(key)) {
      const [kind, id] = key.split('\u0000');
      (tombs[kind] ??= {})[id] = now;
      if (stamps[kind]) delete stamps[kind][id];
    }
  }
  lastStrings = strings;
}

function write() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Could not save', err);
    alert('Could not save. Your device storage may be full. Try clearing an old chat.');
  }
}

export function save() {
  stamp();
  write();
  saveCount++;
  onSaved?.();
}

// Saves this-device-only info (like sync status) without counting as a change to sync.
export function saveQuiet() {
  write();
}

export const getState = () => state;
export const getSaveCount = () => saveCount;
export function setOnSaved(fn) { onSaved = fn; }

// Pictures live in IndexedDB; their change times are kept here so they sync too.
export function markPic(id, deleted = false) {
  const { stamps, tombs } = state.meta;
  const now = Date.now();
  if (deleted) { (tombs.pics ??= {})[id] = now; if (stamps.pics) delete stamps.pics[id]; }
  else { (stamps.pics ??= {})[id] = now; if (tombs.pics) delete tombs.pics[id]; }
  write();
  saveCount++;
  onSaved?.();
}

// What gets synced: everything except this device's API key and sync login.
export function snapshot() {
  return {
    version: 1,
    bots: state.bots,
    tasks: state.tasks,
    notes: state.notes,
    customCharacters: state.customCharacters,
    chats: state.chats,
    shared: Object.fromEntries(SHARED_SETTINGS.map((k) => [k, state.settings[k]])),
    meta: state.meta,
  };
}

// Puts merged data from sync into this device.
export function applySnapshot(snap) {
  state.bots = snap.bots ?? [];
  state.tasks = snap.tasks ?? [];
  state.notes = snap.notes ?? [];
  state.customCharacters = snap.customCharacters ?? [];
  state.chats = snap.chats ?? {};
  for (const k of SHARED_SETTINGS) if (snap.shared && k in snap.shared) state.settings[k] = snap.shared[k];
  state.meta = structuredClone(snap.meta ?? { stamps: {}, tombs: {} });
  lastStrings = itemStrings(state);
  write();
}

export function uid(prefix) {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function exportData() {
  const copy = structuredClone(state);
  copy.settings.apiKey = '';
  copy.sync = structuredClone(DEFAULTS.sync);
  return JSON.stringify(copy, null, 2);
}

export function importData(json) {
  const data = JSON.parse(json);
  const keep = { apiKey: state.settings.apiKey, sync: state.sync };
  state = { ...structuredClone(DEFAULTS), ...data, settings: { ...DEFAULTS.settings, ...data.settings, apiKey: keep.apiKey }, sync: keep.sync, meta: { stamps: {}, tombs: {} } };
  lastStrings = new Map(); // everything restored counts as a new change, so it syncs out
  save();
}
