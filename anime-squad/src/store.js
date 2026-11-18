// Everything is saved on this device only (localStorage).
const KEY = 'anime-squad-v1';

const DEFAULTS = {
  settings: { apiKey: '', model: 'claude-opus-5-5', webSearch: true, userName: '' },
  customCharacters: [],
  bots: [],
  chats: {}, // botId -> array of Claude API messages
  tasks: [], // { id, text, due, done, botId, created }
  notes: [], // { id, title, body, botId, created }
};

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULTS);
    const saved = JSON.parse(raw);
    return { ...structuredClone(DEFAULTS), ...saved, settings: { ...DEFAULTS.settings, ...saved.settings } };
  } catch {
    return structuredClone(DEFAULTS);
  }
}

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Could not save', err);
    alert('Could not save. Your device storage may be full. Try clearing an old chat.');
  }
}

export function getState() {
  return state;
}

export function uid(prefix) {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function exportData() {
  const copy = structuredClone(state);
  copy.settings.apiKey = '';
  return JSON.stringify(copy, null, 2);
}

export function importData(json) {
  const data = JSON.parse(json);
  const key = state.settings.apiKey;
  state = { ...structuredClone(DEFAULTS), ...data, settings: { ...DEFAULTS.settings, ...data.settings, apiKey: key } };
  save();
}
