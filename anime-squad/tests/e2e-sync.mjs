// Sync test: two separate browsers (a "phone" and a "computer") share data through a fake
// GitHub Gist API. Usage: node build.mjs && node tests/e2e-sync.mjs  (SHOTS=dir for screenshots)
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');

const SHOTS = process.env.SHOTS;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const server = createServer((req, res) => {
  const file = join('www', req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  try { res.writeHead(200, { 'content-type': types[extname(file)] ?? 'text/plain' }); res.end(readFileSync(file)); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, r));
const url = `http://localhost:${server.address().port}/`;

let failures = 0;
const check = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'} ${msg}`); if (!ok) failures++; };
const waitFor = async (fn, ms = 15000) => { const end = Date.now() + ms; while (Date.now() < end) { if (await fn()) return true; await new Promise((r) => setTimeout(r, 200)); } return false; };

// ---- fake GitHub gists ----
const TOKEN = 'ghp_testtoken';
const gists = new Map();
let nextId = 1;
const gistJson = (g) => ({ id: g.id, description: g.description, files: Object.fromEntries([...g.files].map(([name, content]) => [name, { filename: name, content, truncated: false, raw_url: `https://gist.example/${g.id}/${name}` }])) });
async function fakeGitHub(route) {
  const req = route.request();
  const u = new URL(req.url());
  const json = (status, body) => route.fulfill({ status, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(body) });
  if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' } });
  if (req.headers().authorization !== `Bearer ${TOKEN}`) return json(401, { message: 'Bad credentials' });
  if (u.pathname === '/gists' && req.method() === 'GET') return json(200, [...gists.values()].map((g) => ({ id: g.id, description: g.description })));
  if (u.pathname === '/gists' && req.method() === 'POST') {
    const body = JSON.parse(req.postData());
    const g = { id: 'g' + nextId++, description: body.description, files: new Map(Object.entries(body.files).map(([k, v]) => [k, v.content])) };
    gists.set(g.id, g);
    return json(201, gistJson(g));
  }
  const m = u.pathname.match(/^\/gists\/(\w+)$/);
  const g = m && gists.get(m[1]);
  if (!g) return json(404, { message: 'Not Found' });
  if (req.method() === 'GET') return json(200, gistJson(g));
  if (req.method() === 'PATCH') {
    for (const [name, v] of Object.entries(JSON.parse(req.postData()).files)) v === null ? g.files.delete(name) : g.files.set(name, v.content);
    return json(200, gistJson(g));
  }
  return json(400, {});
}
const squadData = () => { const g = [...gists.values()][0]; return g ? JSON.parse(g.files.get('squad.json')) : null; };

const browser = await chromium.launch();
async function device(name, viewport) {
  const ctx = await browser.newContext({ viewport });
  await ctx.route('https://api.github.com/**', fakeGitHub);
  const page = await ctx.newPage();
  page.on('pageerror', (e) => { console.log(`${name} PAGE ERROR`, e.message); failures++; });
  page.on('dialog', (d) => d.accept());
  await page.goto(url);
  return page;
}
async function connectSync(page) {
  await page.click('[data-act="tab"][data-id="settings"]');
  await page.fill('#api-key', 'sk-ant-test');
  await page.fill('#sync-token', TOKEN);
  await page.click('[data-act="sync-connect"]');
  await page.waitForSelector('text=Turn off on this device');
}
const syncNow = async (page) => { await page.click('[data-act="tab"][data-id="squad"]'); await page.click('[data-act="sync-now"]'); };

// ---- phone: connect, add a task, a bot and a picture ----
const phone = await device('phone', { width: 412, height: 860 });
await connectSync(phone);
check(gists.size === 1, 'phone made the sync gist');
if (SHOTS) await phone.screenshot({ path: `${SHOTS}/sync-1-settings.png` });
await phone.click('[data-act="tab"][data-id="tasks"]');
await phone.fill('#new-task', 'Buy milk');
await phone.click('[data-act="add-task"]');
check((await phone.inputValue('#new-task')) === '', 'task box clears after adding');
await phone.click('[data-act="tab"][data-id="squad"]');
await phone.click('text=New bot');
await phone.fill('#char-search', 'goku');
await phone.click('.char-card');
await phone.click('[data-act="picture"]');
await phone.setInputFiles('#pic-file', { name: 'goku.png', mimeType: 'image/png', buffer: await phone.screenshot() });
await phone.waitForSelector('.sheet .avatar.pic');
await phone.click('text=Done');
await phone.click('text=Fitness coach');
await phone.fill('#nickname', 'Gym Goku');
await phone.click('text=Create bot');
await phone.click('[data-act="back"]');
check(await waitFor(() => { const d = squadData(); return d?.tasks?.some((t) => t.text === 'Buy milk') && d?.bots?.some((b) => b.nickname === 'Gym Goku') && [...gists.values()][0].files.has('pic-goku.txt'); }), 'phone pushed task, bot and picture by itself');

// ---- computer: connect with the same key and get everything ----
const pc = await device('computer', { width: 1200, height: 800 });
await connectSync(pc);
check(gists.size === 1, 'computer found the same gist');
await pc.click('[data-act="tab"][data-id="squad"]');
check(await pc.isVisible('text=Gym Goku'), 'computer has the bot');
check((await pc.locator('.bot-card .avatar.pic').count()) === 1, 'computer has the picture');
await pc.click('[data-act="tab"][data-id="tasks"]');
check(await pc.isVisible('text=Buy milk'), 'computer has the task');
if (SHOTS) await pc.screenshot({ path: `${SHOTS}/sync-2-computer.png` });

// ---- computer changes things; phone picks them up ----
await pc.click('[data-act="toggle-task"]');
await pc.fill('#new-task', 'Call mom');
await pc.click('[data-act="add-task"]');
await syncNow(pc);
await waitFor(() => squadData()?.tasks?.some((t) => t.text === 'Call mom'));
await syncNow(phone);
await phone.click('[data-act="tab"][data-id="tasks"]');
check(await waitFor(() => phone.isVisible('text=Call mom')), 'phone got the new task');
check(await phone.locator('.item.done', { hasText: 'Buy milk' }).count() === 1, 'phone sees milk checked off');

// ---- delete on phone, gone on computer ----
await phone.click('[data-act="tab"][data-id="squad"]');
await phone.click('text=Gym Goku');
await phone.click('[data-act="bot-menu"]');
await phone.click('[data-act="delete-bot"]');
await syncNow(phone);
await waitFor(() => !squadData()?.bots?.length);
await syncNow(pc);
check(await waitFor(async () => (await pc.locator('.bot-card:not(.new-card)').count()) === 0), 'deleted bot disappears on computer');

// ---- both offline-edit, then merge (newest change to each item wins, nothing lost) ----
await phone.click('[data-act="tab"][data-id="tasks"]');
await phone.fill('#new-task', 'Phone task');
await phone.click('[data-act="add-task"]');
await pc.click('[data-act="tab"][data-id="tasks"]');
await pc.fill('#new-task', 'Computer task');
await pc.click('[data-act="add-task"]');
await syncNow(phone); await waitFor(() => squadData()?.tasks?.some((t) => t.text === 'Phone task'));
await syncNow(pc); await waitFor(() => squadData()?.tasks?.some((t) => t.text === 'Computer task'));
await syncNow(phone);
await phone.click('[data-act="tab"][data-id="tasks"]');
check(await waitFor(() => phone.isVisible('text=Computer task')) && await phone.isVisible('text=Phone task'), 'edits from both devices kept');

// ---- wrong key shows a clear message ----
const other = await device('other', { width: 412, height: 860 });
await other.click('[data-act="tab"][data-id="settings"]');
await other.fill('#sync-token', 'ghp_wrong');
await other.click('[data-act="sync-connect"]');
check(await waitFor(() => other.isVisible('text=did not accept')), 'bad key explained');

await browser.close();
server.close();
console.log(failures ? `${failures} FAILED` : 'ALL PASSED');
process.exit(failures ? 1 : 0);
