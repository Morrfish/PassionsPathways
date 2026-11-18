import { App as CapApp } from '@capacitor/app';
import { CHARACTERS } from './data/characters.js';
import { JOBS, CUSTOM_JOB } from './data/jobs.js';
import { getState, save, uid, exportData, importData } from './store.js';
import { MODELS, CONTEXT_MARK, buildSystemPrompt, userMessage, runTurn, generateCharacter, explainError } from './claude.js';
import { toolLabel } from './tools.js';
import { esc, renderMarkdown } from './markdown.js';
import { loadPics, getPic, setPic, deletePic, fileToSquarePic } from './pics.js';
import { startSync, syncNow, syncOn, syncRunning, connect, disconnect, TOKEN_URL } from './sync.js';

const root = document.getElementById('app');
const S = getState;

// ---------- navigation ----------
let nav = [{ name: 'squad' }];
let sheet = null; // open bottom sheet: { kind, ... }
let wizard = null; // new-bot builder state
let busy = null; // { botId, controller, live, chips }
const notices = {}; // botId -> [{ text, err }]

const view = () => nav[nav.length - 1];
function go(name, params = {}) { nav.push({ name, ...params }); sheet = null; render(); window.scrollTo(0, 0); }
function tab(name) { nav = [{ name }]; sheet = null; render(); window.scrollTo(0, 0); }
function back() {
  if (sheet) { sheet = null; render(); return true; }
  if (nav.length > 1) { nav.pop(); render(); return true; }
  return false;
}

// ---------- lookups ----------
const allCharacters = () => [...S().customCharacters, ...CHARACTERS];
const charById = (id) => allCharacters().find((c) => c.id === id) ?? { id, name: 'Unknown', anime: '?', emoji: '❔', colors: ['#555', '#888'], vibe: '', voice: '', phrases: [] };
const jobById = (id) => JOBS.find((j) => j.id === id) ?? null;
const botById = (id) => S().bots.find((b) => b.id === id);
const botName = (b) => b.nickname || charById(b.characterId).name;
function botJobLabel(b) {
  const j = jobById(b.jobId);
  if (j) return `${j.emoji} ${j.name}`;
  const t = b.customJob || '';
  return `✏️ ${t.length > 40 ? t.slice(0, 40) + '…' : t}`;
}

const STARTERS = {
  fitness: ['Make me a 20-minute workout', 'I want to get stronger. Where do I start?'],
  habits: ['Help me build a morning routine', 'Check in on my goals'],
  todo: ["What's on my to-do list?", 'Make me a weekly cleaning schedule'],
  planner: ['Plan my day', 'Help me plan this week'],
  budget: ['Help me make a monthly budget', 'How can I save $500?'],
  tutor: ['Quiz me on something', 'Explain fractions simply'],
  coding: ['Help me fix a bug', 'Teach me some Python'],
  research: ['Compare the best budget phones', 'Look something up for me'],
  cooking: ['What can I make with eggs and rice?', 'Plan my meals this week'],
  travel: ['Plan a weekend road trip', 'Make me a packing list'],
  writing: ['Help me write an email', 'Fix up this paragraph'],
  shopping: ['Find me a good deal on headphones', 'Start a grocery list'],
  gaming: ['Give me tips for my game', "What games are worth playing right now?"],
  story: ['Start an adventure story!', 'Tell me a short story'],
  language: ['Teach me Japanese basics', 'Practice a conversation with me'],
  wellness: ['Do a mood check-in with me', 'Give me a journaling prompt'],
  friend: ["How's it going?", 'Tell me something fun'],
};

function avatar(c, size = '') {
  const [c1, c2] = c.colors ?? ['#7c4dff', '#ff4081'];
  const pic = getPic(c.id);
  if (pic) return `<div class="avatar ${size} pic" style="--c1:${esc(c1)};--c2:${esc(c2)};background-image:url(${esc(pic)})"></div>`;
  return `<div class="avatar ${size}" style="--c1:${esc(c1)};--c2:${esc(c2)}">${esc(c.emoji || '⭐')}</div>`;
}
const pictureBtn = (c) => `<button class="chip" data-act="picture" data-id="${esc(c.id)}">📷 ${getPic(c.id) ? 'Change' : 'Add'} picture</button>`;
const colorVars = (c) => `--c1:${esc(c.colors?.[0])};--c2:${esc(c.colors?.[1])}`;

// ---------- render ----------
function render() {
  const v = view();
  const screens = { squad, pickCharacter, pickJob, confirmBot, chat, tasks, notes, note, settings };
  const html = (screens[v.name] ?? squad)(v);
  const showTabs = ['squad', 'tasks', 'notes', 'settings'].includes(v.name);
  // Keep anything you were typing (a sync can redraw the screen while you type).
  const typed = [...root.querySelectorAll('input[id]:not([type=checkbox]):not([type=file]), textarea[id], select[id]')].map((el) => [el.id, el.value]);
  const focused = document.activeElement?.id;
  root.innerHTML = html + (showTabs ? tabsHtml(v.name) : '') + (sheet ? sheetHtml() : '');
  for (const [id, value] of typed) {
    const el = document.getElementById(id);
    if (el && el.value !== value) el.value = value;
  }
  if (focused) document.getElementById(focused)?.focus();
  afterRender(v);
}

function tabsHtml(on) {
  const t = (id, icon, label) => `<button data-act="tab" data-id="${id}" class="${on === id ? 'on' : ''}"><span>${icon}</span>${label}</button>`;
  return `<nav class="tabs"><div class="tabs-inner">${t('squad', '⚔️', 'Squad')}${t('tasks', '✅', 'Tasks')}${t('notes', '📓', 'Notes')}${t('settings', '⚙️', 'Settings')}</div></nav>`;
}

function topbar(title, { backBtn = false, right = '', sub = '' } = {}) {
  return `<header class="topbar">${backBtn ? '<button class="icon-btn" data-act="back" aria-label="Back">←</button>' : ''}
    <div style="flex:1;min-width:0"><h1>${title}</h1>${sub ? `<div class="sub">${sub}</div>` : ''}</div>${right}</header>`;
}

// ----- Squad (home) -----
function squad() {
  const s = S();
  const keyCard = !s.settings.apiKey ? `
    <div class="card welcome">
      <div class="faces">🥋🍥👒🕶️🌊</div>
      <div class="title logo">Anime Squad</div>
      <p>Build bots from your favorite anime characters, give them jobs, and talk to them.</p>
      <p class="hint">First, add your Claude API key so the bots can think.</p>
      <button class="btn primary" data-act="tab" data-id="settings">Add my API key</button>
    </div>` : '';
  const cards = s.bots.slice().sort((a, b) => (b.lastActive ?? b.created) - (a.lastActive ?? a.created)).map((b) => {
    const c = charById(b.characterId);
    return `<button class="bot-card" style="${colorVars(c)}" data-act="open-bot" data-id="${b.id}">
      ${avatar(c)}<div class="name">${esc(botName(b))}</div><div class="job">${esc(botJobLabel(b))}</div>
      <div class="last">${esc(lastLine(b.id))}</div></button>`;
  }).join('');
  const syncBtn = syncOn() ? `<button class="icon-btn" data-act="sync-now" aria-label="Sync now" title="Sync now"><span class="sync-icon ${syncRunning() ? 'spin' : ''}">🔄</span></button>` : '';
  return `${topbar('<span class="logo">Anime Squad</span>', { sub: `${s.bots.length} bot${s.bots.length === 1 ? '' : 's'} in your squad`, right: syncBtn })}
  <main>${keyCard}
    <div class="grid">
      <button class="bot-card new-card" data-act="new-bot"><div class="plus">＋</div>New bot</button>
      ${cards}
    </div>
    ${s.bots.length ? '' : '<p class="empty">Tap <b>New bot</b> to pick a character and give them a job.</p>'}
  </main>`;
}

function lastLine(botId) {
  const msgs = S().chats[botId] ?? [];
  for (let i = msgs.length - 1; i >= 0; i--) {
    const m = msgs[i];
    if (m.role !== 'assistant' || !Array.isArray(m.content)) continue;
    const t = m.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
    if (t) return t.replace(/[#*`_>]/g, '').slice(0, 90);
  }
  return 'Say hi!';
}

// ----- New bot: step 1, character -----
function pickCharacter() {
  const w = wizard;
  const animes = [...new Set(allCharacters().map((c) => c.anime))].sort((a, b) => a.localeCompare(b));
  const chip = (id, label) => `<button class="chip ${w.filter === id ? 'on' : ''}" data-act="filter" data-id="${esc(id)}">${esc(label)}</button>`;
  return `${topbar(w.editBotId ? 'Change character' : 'Pick a character', { backBtn: true })}
  <main>
    <div class="steps"><i class="on"></i><i></i><i></i></div>
    <input class="input" id="char-search" placeholder="Search ${allCharacters().length} characters or anime…" value="${esc(w.search)}" autocomplete="off">
    <div class="chips">${chip('all', 'All')}${S().customCharacters.length ? chip('mine', '⭐ Mine') : ''}${animes.map((a) => chip(a, a)).join('')}</div>
    <button class="btn block" data-act="add-character" style="margin-bottom:12px">➕ Add any character (type a name)</button>
    <div class="grid" id="char-grid">${charGrid()}</div>
  </main>`;
}

function charGrid() {
  const w = wizard;
  const q = w.search.trim().toLowerCase();
  const custom = new Set(S().customCharacters.map((c) => c.id));
  const list = allCharacters().filter((c) =>
    (w.filter === 'all' || (w.filter === 'mine' ? custom.has(c.id) : c.anime === w.filter)) &&
    (!q || c.name.toLowerCase().includes(q) || c.anime.toLowerCase().includes(q)));
  if (!list.length) return `<div class="empty" style="grid-column:1/-1">No match. Try <b>Add any character</b>.</div>`;
  return list.map((c) => `<button class="char-card ${w.characterId === c.id ? 'on' : ''}" style="${colorVars(c)}" data-act="pick-char" data-id="${esc(c.id)}">
    ${avatar(c)}<div class="name">${esc(c.name)}</div><div class="anime">${esc(c.anime)}</div></button>`).join('');
}

// ----- New bot: step 2, job -----
function pickJob() {
  const w = wizard;
  const c = charById(w.characterId);
  const jobs = JOBS.map((j) => `<button class="job-card ${w.jobId === j.id ? 'on' : ''}" data-act="pick-job" data-id="${j.id}">
    <div class="emoji">${j.emoji}</div><div><div class="t">${esc(j.name)}</div><div class="b">${esc(j.blurb)}</div></div></button>`).join('');
  return `${topbar('Give them a job', { backBtn: true })}
  <main>
    <div class="steps"><i class="on"></i><i class="on"></i><i></i></div>
    <div class="preview">${avatar(c, 'lg')}<div style="flex:1"><div class="who">${esc(c.name)}</div><div class="what">${esc(c.anime)}</div><div class="quote">“${esc(c.phrases?.[0] ?? '')}”</div></div>${pictureBtn(c)}</div>
    <div class="section-title">✏️ Tell them what to do</div>
    <textarea class="input" id="custom-job" rows="3" placeholder="e.g. Help me plan my sister's birthday party, or remind me to study every night">${esc(w.customJob)}</textarea>
    <button class="btn primary block" data-act="use-custom-job" style="margin-top:10px">Use this job</button>
    <div class="section-title">Or pick a job</div>
    <div class="jobs">${jobs}</div>
  </main>`;
}

// ----- New bot: step 3, name & confirm -----
function confirmBot() {
  const w = wizard;
  const c = charById(w.characterId);
  const j = jobById(w.jobId) ?? { ...CUSTOM_JOB, blurb: w.customJob };
  return `${topbar(w.editBotId ? 'Save changes' : 'Meet your bot', { backBtn: true })}
  <main>
    <div class="steps"><i class="on"></i><i class="on"></i><i class="on"></i></div>
    <div class="preview">${avatar(c, 'lg')}<div style="flex:1"><div class="who">${esc(c.name)}</div><div class="what">${j.emoji} ${esc(j.name)}: ${esc(j.blurb)}</div><div class="quote">“${esc(c.phrases?.[0] ?? '')}”</div></div>${pictureBtn(c)}</div>
    <label class="field"><span>Bot name (optional)</span>
      <input class="input" id="nickname" placeholder="${esc(c.name)}" value="${esc(w.nickname)}" maxlength="40">
      <div class="hint">Handy if you have more than one bot with the same character, like “Gym Goku” and “Chef Goku”.</div></label>
    <button class="btn primary block" data-act="create-bot">${w.editBotId ? 'Save' : '⚡ Create bot'}</button>
  </main>`;
}

// ----- Chat -----
function chat(v) {
  const b = botById(v.botId);
  if (!b) { nav = [{ name: 'squad' }]; return squad(); }
  const c = charById(b.characterId);
  const working = busy?.botId === b.id;
  return `<div class="chat-screen" style="${colorVars(c)}">
    ${topbar(`<span class="row" style="gap:10px">${avatar(c, 'sm')}<span>${esc(botName(b))}</span></span>`, { backBtn: true, sub: esc(botJobLabel(b)), right: '<button class="icon-btn" data-act="bot-menu" aria-label="Menu">⋯</button>' })}
    <main id="msgs">${chatMessages(b)}</main>
    <div class="composer">
      <textarea class="input" id="composer" rows="1" placeholder="Message ${esc(botName(b))}…"></textarea>
      ${working ? '<button class="send stop" data-act="stop" aria-label="Stop">■</button>' : '<button class="send" data-act="send" aria-label="Send">➤</button>'}
    </div></div>`;
}

function chatMessages(b) {
  const c = charById(b.characterId);
  const msgs = S().chats[b.id] ?? [];
  const parts = [];
  const botBubble = (html, id = '') => `<div class="msg bot" ${id}>${avatar(c, 'sm')}<div class="bubble">${html}</div></div>`;

  if (!msgs.length) {
    const starters = STARTERS[b.jobId] ?? ['What can you do for me?'];
    parts.push(`<div class="chat-hero">${avatar(c, 'lg')}<div class="n">${esc(botName(b))}</div><div class="j">${esc(c.anime)} · ${esc(botJobLabel(b))}</div>
      <div class="quote">“${esc(c.phrases?.[0] ?? '')}”</div>
      <div class="starter">${['Introduce yourself!', ...starters].map((s) => `<button class="chip" data-act="starter" data-text="${esc(s)}">${esc(s)}</button>`).join('')}</div></div>`);
  }

  for (const m of msgs) {
    if (typeof m.content === 'string') {
      parts.push(m.role === 'user' ? `<div class="msg me"><div class="bubble">${esc(m.content)}</div></div>` : botBubble(renderMarkdown(m.content)));
      continue;
    }
    if (m.role === 'user') {
      const text = m.content.filter((x) => x.type === 'text' && !x.text.startsWith(CONTEXT_MARK)).map((x) => x.text).join('\n');
      if (text) parts.push(`<div class="msg me"><div class="bubble">${esc(text)}</div></div>`);
      continue;
    }
    let textRun = '';
    const flush = () => { if (textRun.trim()) parts.push(botBubble(renderMarkdown(textRun))); textRun = ''; };
    for (const block of m.content) {
      if (block.type === 'text') textRun += block.text;
      else if (block.type === 'tool_use' || block.type === 'server_tool_use') { flush(); parts.push(`<div class="tool-chip">${esc(toolLabel(block.name, block.input))}</div>`); }
    }
    flush();
  }

  if (busy?.botId === b.id) {
    for (const chip of busy.chips) parts.push(`<div class="tool-chip">${esc(chip)}</div>`);
    parts.push(botBubble(busy.live ? renderMarkdown(busy.live) : '<div class="typing"><span></span><span></span><span></span></div>', 'id="live"'));
  }
  for (const n of notices[b.id] ?? []) parts.push(`<div class="notice ${n.err ? 'err' : ''}">${esc(n.text)}</div>`);
  return parts.join('');
}

function updateChat() {
  const v = view();
  if (v.name !== 'chat') return;
  const box = document.getElementById('msgs');
  const b = botById(v.botId);
  if (!box || !b) return;
  const nearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 160;
  box.innerHTML = chatMessages(b);
  if (nearBottom) box.scrollTop = box.scrollHeight;
  // swap send/stop button
  const btn = root.querySelector('.composer .send');
  const working = busy?.botId === b.id;
  if (btn) {
    btn.classList.toggle('stop', working);
    btn.dataset.act = working ? 'stop' : 'send';
    btn.textContent = working ? '■' : '➤';
  }
}

function updateLive() {
  const live = document.querySelector('#live .bubble');
  if (!live || !busy) return updateChat();
  live.innerHTML = renderMarkdown(busy.live);
  const box = document.getElementById('msgs');
  if (box && box.scrollHeight - box.scrollTop - box.clientHeight < 200) box.scrollTop = box.scrollHeight;
}

async function send(text) {
  const v = view();
  const b = botById(v.botId);
  text = text.trim();
  if (!b || !text || busy) return;
  const s = S();
  if (!s.settings.apiKey) {
    notices[b.id] = [{ text: 'Add your Claude API key in Settings first.', err: true }];
    updateChat();
    return;
  }
  const c = charById(b.characterId);
  const msgs = (s.chats[b.id] ??= []);
  msgs.push(userMessage(text));
  b.lastActive = Date.now();
  save();
  notices[b.id] = [];
  busy = { botId: b.id, controller: new AbortController(), live: '', chips: [] };
  updateChat();
  const box = document.getElementById('msgs');
  if (box) box.scrollTop = box.scrollHeight;

  try {
    const result = await runTurn({
      settings: s.settings,
      systemPrompt: buildSystemPrompt({ character: c, job: jobById(b.jobId), customJob: b.customJob, nickname: b.nickname, userName: s.settings.userName }),
      messages: msgs,
      botId: b.id,
      signal: busy.controller.signal,
      onText: (t) => { if (busy) { busy.live = t; updateLive(); } },
      onTool: (label) => { if (busy) { busy.chips.push(label); updateChat(); } },
      onStep: () => { if (busy) { busy.live = ''; busy.chips = []; } save(); updateChat(); },
    });
    if (result.refused) notices[b.id] = [{ text: `${botName(b)} couldn't help with that one. Try asking a different way.`, err: true }];
    else if (result.truncated) notices[b.id] = [{ text: 'The reply got cut off because it was very long. Say “keep going” to continue.' }];
    else if (result.tooLong) notices[b.id] = [{ text: 'That took a lot of steps, so I paused it. Say “keep going” to continue.' }];
  } catch (err) {
    notices[b.id] = [{ text: explainError(err), err: !busy?.controller.signal.aborted }];
  } finally {
    busy = null;
    save();
    updateChat();
  }
}

// ----- Tasks -----
function tasks() {
  const s = S();
  const open = s.tasks.filter((t) => !t.done);
  const done = s.tasks.filter((t) => t.done);
  const item = (t) => {
    const b = botById(t.botId);
    const by = b ? `from ${esc(botName(b))}` : '';
    return `<div class="item ${t.done ? 'done' : ''}">
      <button class="check ${t.done ? 'on' : ''}" data-act="toggle-task" data-id="${t.id}" aria-label="Done">${t.done ? '✓' : ''}</button>
      <div class="main"><div class="t">${esc(t.text)}</div><div class="meta">${t.due ? `📅 ${esc(t.due)} · ` : ''}${by}</div></div>
      <button class="x" data-act="delete-task" data-id="${t.id}" aria-label="Delete">✕</button></div>`;
  };
  return `${topbar('✅ Tasks', { sub: 'Your bots add tasks here, and so can you' })}
  <main>
    <div class="row"><input class="input" id="new-task" placeholder="Add a task…"><button class="btn primary" data-act="add-task">Add</button></div>
    ${open.length ? `<div class="section-title">To do (${open.length})</div>${open.map(item).join('')}` : '<div class="empty"><div class="big">🎉</div>Nothing to do! Ask a bot to plan something.</div>'}
    ${done.length ? `<div class="row"><div class="section-title">Done (${done.length})</div><div class="spacer"></div><button class="chip" data-act="clear-done">Clear done</button></div>${done.map(item).join('')}` : ''}
  </main>`;
}

// ----- Notes -----
function notes() {
  const s = S();
  const list = s.notes.map((n) => {
    const b = botById(n.botId);
    return `<button class="item" style="width:100%;text-align:left" data-act="open-note" data-id="${n.id}">
      <div style="font-size:24px">📓</div><div class="main"><div class="t" style="font-weight:800">${esc(n.title)}</div>
      <div class="meta">${new Date(n.created).toLocaleDateString()}${b ? ` · by ${esc(botName(b))}` : ''}</div></div></button>`;
  }).join('');
  return `${topbar('📓 Notes', { sub: 'Plans, recipes, workouts and more saved by your bots' })}
  <main>${list || '<div class="empty"><div class="big">📓</div>No notes yet. Ask a bot to save a plan, recipe or list.</div>'}</main>`;
}

function note(v) {
  const n = S().notes.find((x) => x.id === v.id);
  if (!n) { nav.pop(); return notes(); }
  return `${topbar(esc(n.title), { backBtn: true, right: '<button class="icon-btn" data-act="copy-note" aria-label="Copy">📋</button><button class="icon-btn" data-act="delete-note" aria-label="Delete">🗑️</button>' })}
  <main><div class="note-body">${renderMarkdown(n.body)}</div></main>`;
}

// ----- Settings -----
function settings() {
  const st = S().settings;
  const custom = S().customCharacters;
  return `${topbar('⚙️ Settings')}
  <main>
    <div class="card">
      <label class="field" style="margin-top:0"><span>🔑 Claude API key</span>
        <div class="row"><input class="input" id="api-key" type="password" placeholder="sk-ant-…" value="${esc(st.apiKey)}" autocomplete="off">
        <button class="icon-btn" data-act="show-key" aria-label="Show">👁️</button></div>
        <div class="hint">Get one at <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">console.anthropic.com</a>. It's saved only on this device and sent only to Anthropic. You pay Anthropic for what your bots use.</div></label>
      <label class="field"><span>🧠 Brain</span>
        <select class="input" id="model">${MODELS.map((m) => `<option value="${m.id}" ${st.model === m.id ? 'selected' : ''}>${esc(m.name)}</option>`).join('')}</select>
        <div class="hint">Smarter brains cost more per message.</div></label>
      <label class="field toggle"><span>🌐 Let bots search the web<div class="hint">For prices, news, weather and other current info.</div></span>
        <input type="checkbox" id="web-search" ${st.webSearch ? 'checked' : ''}></label>
      <label class="field"><span>🙋 What should bots call you?</span>
        <input class="input" id="user-name" value="${esc(st.userName)}" placeholder="Your name or nickname" maxlength="40"></label>
      <button class="btn primary block" data-act="save-settings">Save settings</button>
    </div>

    <div class="section-title">📡 Sync phone & computer</div>
    <div class="card">${syncCard()}</div>

    <div class="section-title">⭐ Characters you added (${custom.length})</div>
    ${custom.length ? custom.map((c) => `<div class="item">${avatar(c, 'sm')}<div class="main"><div class="t">${esc(c.name)}</div><div class="meta">${esc(c.anime)}</div></div>
      <button class="x" data-act="edit-character" data-id="${c.id}" aria-label="Edit">✏️</button>
      <button class="x" data-act="delete-character" data-id="${c.id}" aria-label="Delete">✕</button></div>`).join('') : '<p class="hint">Add more in <b>New bot → Add any character</b>.</p>'}

    <div class="section-title">💾 Backup</div>
    <div class="row"><button class="btn" data-act="export">Copy backup</button><button class="btn" data-act="import">Restore backup</button></div>
    <p class="hint">Moves your bots, chats, tasks and notes between your phone and computer. Your API key is not included.</p>
  </main>`;
}

function syncStatusText() {
  const st = S().sync;
  if (!syncOn()) return '';
  if (syncRunning()) return '🔄 Syncing…';
  if (st.lastError) return `⚠️ ${st.lastError}`;
  if (!st.lastSync) return 'Waiting to sync…';
  const secs = Math.round((Date.now() - st.lastSync) / 1000);
  return `✅ Synced ${secs < 60 ? 'just now' : secs < 3600 ? `${Math.round(secs / 60)} min ago` : new Date(st.lastSync).toLocaleString()}`;
}

function syncCard() {
  if (syncOn()) {
    return `<div class="sync-status">${esc(syncStatusText())}</div>
      <p class="hint">Bots, chats, tasks, notes, characters and pictures update on every device that uses the same sync key. Your Claude API key stays on each device.</p>
      <div class="row"><button class="btn primary" data-act="sync-now">🔄 Sync now</button><button class="btn" data-act="sync-off">Turn off on this device</button></div>`;
  }
  return `<p style="margin-top:0">Use the same bots, chats, tasks and notes on your phone and computer. Changes show up on the other device in about 20 seconds.</p>
    <ol class="hint" style="padding-left:18px;line-height:1.6">
      <li>Open <a href="${TOKEN_URL}" target="_blank" rel="noopener">this GitHub page</a> (sign in if asked). It's already set up: just scroll down and tap <b>Generate token</b>.</li>
      <li>Copy the key it shows (starts with <code>ghp_</code>) and paste it below. Save it somewhere safe, like a note, because GitHub only shows it once.</li>
      <li>Do the same on your other device with the <b>same key</b>.</li></ol>
    <div class="row"><input class="input" id="sync-token" type="password" placeholder="ghp_…" autocomplete="off">
    <button class="btn primary" data-act="sync-connect">Connect</button></div>
    ${S().sync.lastError ? `<div class="notice err">${esc(S().sync.lastError)}</div>` : ''}
    <p class="hint">Your data is kept in a secret gist in your own GitHub account. Only someone with the link or your key can see it.</p>`;
}

function updateSyncStatus() {
  root.querySelectorAll('.sync-status').forEach((el) => { el.textContent = syncStatusText(); });
  root.querySelectorAll('.sync-icon').forEach((el) => el.classList.toggle('spin', syncRunning()));
}

// ---------- sheets ----------
function sheetHtml() {
  const s = sheet;
  let body = '';
  if (s.kind === 'bot-menu') {
    body = `<h3>${esc(botName(botById(s.botId)))}</h3>
      <button class="btn block" data-act="picture" data-id="${esc(botById(s.botId).characterId)}">📷 Change picture</button>
      <button class="btn block" data-act="change-job">🔁 Change job</button>
      <button class="btn block" data-act="rename-bot">🏷️ Rename</button>
      <button class="btn block" data-act="clear-chat">🧽 Start a new chat</button>
      <button class="btn danger block" data-act="delete-bot">🗑️ Delete bot</button>
      <button class="btn block" data-act="close-sheet">Cancel</button>`;
  } else if (s.kind === 'character') {
    const d = s.draft;
    body = `<h3>${s.editId ? 'Edit character' : 'Add any character'}</h3>
      ${s.editId ? '' : `<div class="row"><input class="input" id="gen-query" placeholder="e.g. Nezuko, or Gintoki from Gintama" value="${esc(s.query ?? '')}">
      <button class="btn primary" data-act="gen-character" ${s.loading ? 'disabled' : ''}>${s.loading ? '…' : '✨ Make'}</button></div>
      <div class="hint">Claude fills in their personality and how they talk. You can change anything before saving.</div>`}
      ${s.error ? `<div class="notice err">${esc(s.error)}</div>` : ''}
      ${d ? `<div class="preview" style="margin:6px 0 0">${avatar(d, 'lg')}<div><div class="who">${esc(d.name || 'New character')}</div><div class="what">${esc(d.anime)}</div></div></div>
      <label class="field"><span>Name</span><input class="input" data-draft="name" value="${esc(d.name)}"></label>
      <label class="field"><span>Anime</span><input class="input" data-draft="anime" value="${esc(d.anime)}"></label>
      <div class="row"><label class="field" style="flex:1"><span>Emoji</span><input class="input" data-draft="emoji" value="${esc(d.emoji)}" maxlength="8"></label>
      <label class="field"><span>Color 1</span><input type="color" data-draft="color0" value="${esc(d.colors[0])}"></label>
      <label class="field"><span>Color 2</span><input type="color" data-draft="color1" value="${esc(d.colors[1])}"></label></div>
      <label class="field"><span>Personality</span><textarea class="input" rows="2" data-draft="vibe">${esc(d.vibe)}</textarea></label>
      <label class="field"><span>How they talk</span><textarea class="input" rows="3" data-draft="voice">${esc(d.voice)}</textarea></label>
      <label class="field"><span>Things they say (one per line)</span><textarea class="input" rows="3" data-draft="phrases">${esc(d.phrases.join('\n'))}</textarea></label>
      <button class="btn primary block" data-act="save-character">Save character</button>`
        : `<button class="btn block" data-act="blank-character">Or write one yourself</button>`}
      <button class="btn block" data-act="close-sheet">Cancel</button>`;
  } else if (s.kind === 'picture') {
    const c = charById(s.charId);
    const has = !!getPic(c.id);
    body = `<h3>Picture for ${esc(c.name)}</h3>
      <div style="display:grid;place-items:center;padding:8px">${avatar(c, 'xl')}</div>
      ${s.error ? `<div class="notice err">${esc(s.error)}</div>` : ''}
      <label class="btn primary block" style="text-align:center">${s.loading ? 'Working…' : `🖼️ Choose ${has ? 'a new' : 'a'} picture`}
        <input type="file" id="pic-file" accept="image/*" hidden></label>
      ${has ? '<button class="btn danger block" data-act="remove-picture">Remove picture (use the emoji)</button>' : ''}
      <div class="hint">Any picture works: one you made, fan art or a screenshot. It's cropped to a square and saved only on this device. Every bot with this character uses it.</div>
      <button class="btn block" data-act="close-sheet">Done</button>`;
  } else if (s.kind === 'text') {
    body = `<h3>${esc(s.title)}</h3>
      <textarea class="input" id="sheet-text" rows="${s.rows ?? 2}">${esc(s.value ?? '')}</textarea>
      ${s.hint ? `<div class="hint">${esc(s.hint)}</div>` : ''}
      <button class="btn primary block" data-act="sheet-ok">${esc(s.ok ?? 'OK')}</button>
      <button class="btn block" data-act="close-sheet">Cancel</button>`;
  }
  return `<div class="sheet-bg" data-act="sheet-bg"><div class="sheet">${body}</div></div>`;
}

function textSheet(opts) { sheet = { kind: 'text', ...opts }; render(); setTimeout(() => document.getElementById('sheet-text')?.focus(), 50); }

function readDraft() {
  const d = sheet?.draft;
  if (!d) return;
  root.querySelectorAll('[data-draft]').forEach((el) => {
    const k = el.dataset.draft;
    if (k === 'color0') d.colors[0] = el.value;
    else if (k === 'color1') d.colors[1] = el.value;
    else if (k === 'phrases') d.phrases = el.value.split('\n').map((x) => x.trim()).filter(Boolean);
    else d[k] = el.value;
  });
}

// ---------- after render: inputs that need live handlers ----------
function afterRender(v) {
  if (sheet?.kind === 'picture') {
    document.getElementById('pic-file')?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const mySheet = sheet;
      Object.assign(mySheet, { loading: true, error: null });
      render();
      try {
        await setPic(mySheet.charId, await fileToSquarePic(file));
      } catch (err) {
        mySheet.error = err?.message || 'Could not use that picture.';
      }
      mySheet.loading = false;
      render();
    });
  }
  if (v.name === 'pickCharacter') {
    const input = document.getElementById('char-search');
    input?.addEventListener('input', () => {
      wizard.search = input.value;
      document.getElementById('char-grid').innerHTML = charGrid();
    });
  }
  if (v.name === 'pickJob') {
    document.getElementById('custom-job')?.addEventListener('input', (e) => { wizard.customJob = e.target.value; });
  }
  if (v.name === 'confirmBot') {
    document.getElementById('nickname')?.addEventListener('input', (e) => { wizard.nickname = e.target.value; });
  }
  if (v.name === 'chat') {
    const box = document.getElementById('msgs');
    if (box) box.scrollTop = box.scrollHeight;
    const ta = document.getElementById('composer');
    if (ta) {
      const grow = () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 140) + 'px'; };
      ta.addEventListener('input', grow);
      ta.addEventListener('keydown', (e) => {
        // Enter sends on a computer; Shift+Enter makes a new line.
        if (e.key === 'Enter' && !e.shiftKey && !('ontouchstart' in window)) {
          e.preventDefault();
          doSend();
        }
      });
    }
  }
  if (v.name === 'tasks') {
    document.getElementById('new-task')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') act('add-task', {}); });
  }
}

function doSend() {
  const ta = document.getElementById('composer');
  if (!ta || busy) return;
  const text = ta.value;
  if (!text.trim()) return;
  ta.value = '';
  ta.style.height = 'auto';
  send(text);
}

// ---------- actions ----------
root.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  if (el.dataset.act === 'sheet-bg' && e.target !== el) return; // clicks inside the sheet
  act(el.dataset.act, el.dataset);
});

async function act(a, d) {
  const s = S();
  const v = view();
  switch (a) {
    case 'tab': return tab(d.id);
    case 'back': return back();
    case 'sheet-bg':
    case 'close-sheet': sheet = null; return render();

    // squad / wizard
    case 'new-bot':
      wizard = { characterId: null, jobId: null, customJob: '', nickname: '', filter: 'all', search: '' };
      return go('pickCharacter');
    case 'filter': wizard.filter = d.id; return render();
    case 'pick-char':
      wizard.characterId = d.id;
      if (wizard.editBotId && wizard.charOnly) return act('create-bot', {});
      return go('pickJob');
    case 'pick-job': wizard.jobId = d.id; wizard.customJob = ''; return go('confirmBot');
    case 'use-custom-job': {
      const text = (document.getElementById('custom-job')?.value ?? '').trim();
      if (!text) { document.getElementById('custom-job')?.focus(); return; }
      wizard.jobId = null; wizard.customJob = text;
      return go('confirmBot');
    }
    case 'create-bot': {
      const w = wizard;
      if (w.editBotId) {
        const b = botById(w.editBotId);
        Object.assign(b, { characterId: w.characterId, jobId: w.jobId, customJob: w.customJob, nickname: w.nickname.trim() });
        save();
        nav = [{ name: 'squad' }, { name: 'chat', botId: b.id }];
        wizard = null;
        return render();
      }
      const b = { id: uid('b'), characterId: w.characterId, jobId: w.jobId, customJob: w.customJob, nickname: w.nickname.trim(), created: Date.now() };
      s.bots.push(b);
      save();
      wizard = null;
      nav = [{ name: 'squad' }, { name: 'chat', botId: b.id }];
      return render();
    }
    case 'open-bot': return go('chat', { botId: d.id });

    // chat
    case 'send': return doSend();
    case 'starter': return send(d.text);
    case 'stop': busy?.controller.abort(); return;
    case 'bot-menu': sheet = { kind: 'bot-menu', botId: v.botId }; return render();
    case 'change-job': {
      const b = botById(sheet.botId);
      wizard = { editBotId: b.id, characterId: b.characterId, jobId: b.jobId, customJob: b.customJob ?? '', nickname: b.nickname ?? '', filter: 'all', search: '' };
      return go('pickJob');
    }
    case 'rename-bot': {
      const b = botById(sheet.botId);
      return textSheet({ title: 'Rename bot', value: botName(b), ok: 'Save', rows: 1, onOk: (t) => { b.nickname = t.trim(); save(); } });
    }
    case 'clear-chat': {
      const id = sheet.botId;
      if (busy?.botId === id) return;
      if (!confirm('Start a new chat? This erases the messages with this bot. Tasks and notes stay.')) return;
      s.chats[id] = []; notices[id] = []; save(); sheet = null; return render();
    }
    case 'delete-bot': {
      const id = sheet.botId;
      if (busy?.botId === id) return;
      if (!confirm(`Delete ${botName(botById(id))} and their chat?`)) return;
      s.bots = s.bots.filter((b) => b.id !== id);
      delete s.chats[id];
      save(); sheet = null; nav = [{ name: 'squad' }]; return render();
    }
    case 'sheet-ok': {
      const val = document.getElementById('sheet-text')?.value ?? '';
      const fn = sheet.onOk;
      sheet = null;
      try { fn?.(val); } catch (err) { alert(err.message || err); }
      return render();
    }

    // sync
    case 'sync-now': syncNow(); return;
    case 'sync-connect': {
      const input = document.getElementById('sync-token');
      const btn = root.querySelector('[data-act="sync-connect"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Connecting…'; }
      try {
        await connect(input?.value ?? '');
        alert('Sync is on! Now connect your other device with the same key.');
      } catch (err) {
        s.sync.lastError = err.message || String(err);
      }
      return render();
    }
    case 'sync-off':
      if (!confirm('Turn off sync on this device? Your data stays here; it just stops updating.')) return;
      disconnect();
      return render();

    // pictures
    case 'picture': sheet = { kind: 'picture', charId: d.id }; return render();
    case 'remove-picture':
      await deletePic(sheet.charId);
      return render();

    // characters
    case 'add-character': sheet = { kind: 'character', draft: null }; render(); setTimeout(() => document.getElementById('gen-query')?.focus(), 50); return;
    case 'blank-character':
      sheet.draft = { name: '', anime: '', emoji: '⭐', colors: ['#7c4dff', '#ff4081'], vibe: '', voice: '', phrases: [] };
      return render();
    case 'gen-character': {
      const q = (document.getElementById('gen-query')?.value ?? '').trim();
      if (!q) return;
      if (!s.settings.apiKey) { sheet.error = 'Add your Claude API key in Settings first, or write one yourself.'; return render(); }
      Object.assign(sheet, { query: q, loading: true, error: null });
      render();
      const mySheet = sheet;
      try {
        mySheet.draft = await generateCharacter(s.settings, q);
      } catch (err) {
        mySheet.error = err?.status ? explainError(err) : String(err.message || err);
      }
      mySheet.loading = false;
      if (sheet === mySheet) render();
      return;
    }
    case 'save-character': {
      readDraft();
      const dft = sheet.draft;
      if (!dft.name.trim()) return alert('Give them a name.');
      if (!dft.phrases.length) dft.phrases = ['Hey!'];
      if (sheet.editId) {
        const i = s.customCharacters.findIndex((c) => c.id === sheet.editId);
        s.customCharacters[i] = { ...dft, id: sheet.editId };
      } else {
        const c = { ...dft, id: uid('c') };
        s.customCharacters.unshift(c);
        if (wizard) { wizard.characterId = c.id; wizard.filter = 'all'; wizard.search = ''; }
      }
      save();
      sheet = null;
      if (wizard && v.name === 'pickCharacter') return go('pickJob');
      return render();
    }
    case 'edit-character': {
      const c = s.customCharacters.find((x) => x.id === d.id);
      sheet = { kind: 'character', editId: c.id, draft: structuredClone(c) };
      return render();
    }
    case 'delete-character': {
      const used = s.bots.some((b) => b.characterId === d.id);
      if (used) return alert('A bot is using this character. Delete that bot first.');
      if (!confirm('Delete this character?')) return;
      s.customCharacters = s.customCharacters.filter((c) => c.id !== d.id);
      save();
      await deletePic(d.id).catch(() => {});
      return render();
    }

    // tasks
    case 'add-task': {
      const input = document.getElementById('new-task');
      const text = input?.value.trim();
      if (!text) return;
      s.tasks.push({ id: uid('t'), text, due: '', done: false, botId: null, created: Date.now() });
      input.value = '';
      save(); render(); document.getElementById('new-task')?.focus(); return;
    }
    case 'toggle-task': { const t = s.tasks.find((x) => x.id === d.id); if (t) t.done = !t.done; save(); return render(); }
    case 'delete-task': s.tasks = s.tasks.filter((x) => x.id !== d.id); save(); return render();
    case 'clear-done': s.tasks = s.tasks.filter((x) => !x.done); save(); return render();

    // notes
    case 'open-note': return go('note', { id: d.id });
    case 'copy-note': {
      const n = s.notes.find((x) => x.id === v.id);
      try { await navigator.clipboard.writeText(`${n.title}\n\n${n.body}`); alert('Copied!'); } catch { alert('Could not copy on this device.'); }
      return;
    }
    case 'delete-note':
      if (!confirm('Delete this note?')) return;
      s.notes = s.notes.filter((x) => x.id !== v.id); save(); return back();

    // settings
    case 'show-key': { const k = document.getElementById('api-key'); k.type = k.type === 'password' ? 'text' : 'password'; return; }
    case 'save-settings':
      s.settings.apiKey = document.getElementById('api-key').value.trim();
      s.settings.model = document.getElementById('model').value;
      s.settings.webSearch = document.getElementById('web-search').checked;
      s.settings.userName = document.getElementById('user-name').value.trim();
      save();
      alert('Saved!');
      return tab('squad');
    case 'export': {
      const data = exportData();
      try { await navigator.clipboard.writeText(data); alert('Backup copied. Paste it somewhere safe, like an email to yourself or a note.'); }
      catch { textSheet({ title: 'Your backup (copy all of this)', value: data, rows: 10, ok: 'Done' }); }
      return;
    }
    case 'import':
      return textSheet({ title: 'Paste your backup', rows: 10, ok: 'Restore', hint: 'This replaces the bots, chats, tasks and notes on this device.',
        onOk: (t) => { importData(t); alert('Restored!'); nav = [{ name: 'squad' }]; } });
  }
}

// ---------- start ----------
CapApp.addListener('backButton', () => {
  if (!back()) CapApp.exitApp();
}).catch(() => { /* not running as a phone app */ });

CapApp.addListener('resume', () => syncNow()).catch(() => {});

loadPics().finally(() => {
  render();
  startSync({
    busyCheck: () => !!busy,
    changed: () => { if (!sheet) render(); },
    status: updateSyncStatus,
  });
  setInterval(updateSyncStatus, 15000);
});
