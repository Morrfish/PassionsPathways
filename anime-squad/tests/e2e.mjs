// End-to-end test: runs the built app in Chromium against a fake Claude API.
// Usage: node build.mjs && node tests/e2e.mjs   (SHOTS=dir saves screenshots)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';

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

function sse(events) {
  return events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`).join('');
}
function streamOf(content, stop) {
  const ev = [{ type: 'message_start', message: { id: 'msg_' + Math.random(), type: 'message', role: 'assistant', model: 'claude-opus-5-5', content: [], stop_reason: null, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 1 } } }];
  content.forEach((block, index) => {
    if (block.type === 'text') {
      ev.push({ type: 'content_block_start', index, content_block: { type: 'text', text: '' } });
      for (const piece of block.text.match(/.{1,12}/gs)) ev.push({ type: 'content_block_delta', index, delta: { type: 'text_delta', text: piece } });
    } else {
      ev.push({ type: 'content_block_start', index, content_block: { type: 'tool_use', id: block.id, name: block.name, input: {} } });
      ev.push({ type: 'content_block_delta', index, delta: { type: 'input_json_delta', partial_json: JSON.stringify(block.input) } });
    }
    ev.push({ type: 'content_block_stop', index });
  });
  ev.push({ type: 'message_delta', delta: { stop_reason: stop, stop_sequence: null }, usage: { output_tokens: 20 } });
  ev.push({ type: 'message_stop' });
  return sse(ev);
}

const requests = [];
let failures = 0;
const check = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'} ${msg}`); if (!ok) failures++; };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 860 } });
page.on('pageerror', (e) => { console.log('PAGE ERROR', e.message); failures++; });
page.on('dialog', (d) => d.accept());
await page.route('https://api.anthropic.com/**', async (route) => {
  const body = JSON.parse(route.request().postData());
  requests.push({ url: route.request().url(), headers: route.request().headers(), body });
  if (body.output_config?.format) {
    const profile = { found: true, name: 'Nezuko Kamado', anime: 'Demon Slayer', emoji: '🎋', color1: '#f48fb1', color2: '#2e7d32', vibe: 'Gentle and protective.', voice: 'Mostly hums: "Mmm!"', phrases: ['Mmm!', 'Mmm mmm!'] };
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: 'msg_x', type: 'message', role: 'assistant', model: body.model, content: [{ type: 'text', text: JSON.stringify(profile) }], stop_reason: 'end_turn', stop_sequence: null, usage: { input_tokens: 5, output_tokens: 5 } }) });
  }
  const last = body.messages[body.messages.length - 1];
  const isToolResult = Array.isArray(last.content) && last.content[0]?.type === 'tool_result';
  const stream = isToolResult
    ? streamOf([{ type: 'text', text: 'Tch. Added **mop the floor** to your list. Move.' }], 'end_turn')
    : streamOf([{ type: 'text', text: 'Fine. ' }, { type: 'tool_use', id: 'toolu_1', name: 'add_task', input: { text: 'Mop the floor', due: 'Friday' } }], 'tool_use');
  return route.fulfill({ status: 200, headers: { 'content-type': 'text/event-stream' }, body: stream });
});

await page.goto(url);
check(await page.isVisible('text=Add my API key'), 'welcome asks for API key');
if (SHOTS) await page.screenshot({ path: `${SHOTS}/1-welcome.png` });

// settings
await page.click('text=Add my API key');
await page.fill('#api-key', 'sk-ant-test');
await page.fill('#user-name', 'Courtnee');
await page.click('text=Save settings');
check(await page.isVisible('text=New bot'), 'saved settings, back on squad');

// new bot: Levi as chores
await page.click('text=New bot');
check((await page.locator('.char-card').count()) >= 50, 'roster has 50+ characters');
if (SHOTS) await page.screenshot({ path: `${SHOTS}/2-characters.png` });
await page.fill('#char-search', 'levi');
check((await page.locator('.char-card').count()) === 1, 'search filters to Levi');
await page.click('.char-card');
if (SHOTS) await page.screenshot({ path: `${SHOTS}/3-jobs.png` });
await page.click('text=To-do & chores');
await page.fill('#nickname', 'Captain Clean');
await page.click('text=Create bot');
check(await page.isVisible('#composer'), 'chat opened');

// chat with tool use
await page.fill('#composer', 'Remind me to mop on Friday');
await page.click('.send');
await page.waitForSelector('text=Move.', { timeout: 10000 });
check(await page.isVisible('text=Added task: Mop the floor'), 'tool chip shows');
check(requests.length === 2, `two API calls for the tool loop (got ${requests.length})`);
const first = requests[0];
check(first.body.model === 'claude-opus-5-5', 'uses Opus 5.5');
check(first.body.system.includes('Levi Ackerman') && first.body.system.includes('To-do & chores') && first.body.system.includes('Courtnee'), 'system prompt has character, job and name');
check(first.body.tools.some((t) => t.type === 'web_search_20260209'), 'web search tool sent');
check(first.body.fallbacks === 'default' && first.headers['anthropic-beta']?.includes('server-side-fallback-2026-07-01'), 'refusal fallback on');
check(first.headers['x-api-key'] === 'sk-ant-test' || first.headers.authorization === 'Bearer sk-ant-test', 'API key sent');
const second = requests[1].body.messages;
check(second.length === 3 && second[2].content[0].type === 'tool_result', 'tool result sent back');
if (SHOTS) await page.screenshot({ path: `${SHOTS}/4-chat.png` });

// tasks tab shows the task
await page.click('[data-act="back"]');
await page.click('[data-act="tab"][data-id="tasks"]');
check(await page.isVisible('text=Mop the floor'), 'task in Tasks tab');
check(await page.isVisible('text=from Captain Clean'), 'task credited to the bot');
if (SHOTS) await page.screenshot({ path: `${SHOTS}/5-tasks.png` });

// add any character
await page.click('[data-act="tab"][data-id="squad"]');
await page.click('text=New bot');
await page.click('text=Add any character');
await page.fill('#gen-query', 'Nezuko');
await page.click('text=✨ Make');
await page.waitForSelector('[data-draft="name"]');
check((await page.inputValue('[data-draft="name"]')) === 'Nezuko Kamado', 'character generated');
if (SHOTS) await page.screenshot({ path: `${SHOTS}/6-add-character.png` });
await page.click('text=Save character');
check(await page.isVisible('text=Give them a job'), 'went on to jobs with new character');
await page.fill('#custom-job', 'Cheer me on while I study');
await page.click('text=Use this job');
// picture for the character
await page.click('[data-act="picture"]');
await page.setInputFiles('#pic-file', { name: 'nezuko.png', mimeType: 'image/png', buffer: await page.screenshot() });
await page.waitForSelector('.sheet .avatar.pic');
check(await page.isVisible('text=Remove picture'), 'picture added');
if (SHOTS) await page.screenshot({ path: `${SHOTS}/7-picture.png` });
await page.click('text=Done');
check((await page.locator('.preview .avatar.pic').count()) === 1, 'picture shows on the bot preview');
await page.click('text=Create bot');
check(await page.isVisible('text=Cheer me on while I study'), 'custom job bot created');

// reload keeps everything
await page.reload();
check((await page.locator('.bot-card:not(.new-card)').count()) === 2, 'bots saved after reload');
await page.waitForSelector('.bot-card .avatar.pic');
check((await page.locator('.bot-card .avatar.pic').count()) === 1, 'picture saved after reload');

await browser.close();
server.close();
console.log(failures ? `${failures} FAILED` : 'ALL PASSED');
process.exit(failures ? 1 : 0);
