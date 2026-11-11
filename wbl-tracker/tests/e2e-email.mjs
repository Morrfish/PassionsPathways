// Tests "Check email for new hours" against fake Google and Microsoft servers
// (Playwright intercepts the network, so no real accounts are needed).
//   node tests/e2e-email.mjs [brand-id]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brand = process.argv[2] || 'default';
const DIST = path.join(ROOT, 'dist', brand);
const SUP = fs.readdirSync(path.join(DIST, 'supervisor')).find(f => f.endsWith(' Supervisor.html'));
const SHOTS = process.env.SHOTS || '';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };
let failures = 0;
const check = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) failures++; };
const b64url = s => Buffer.from(s).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Authorization, Content-Type, Prefer', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' };
const json = (route, body, status = 200) => route.fulfill({ status, headers: Object.assign({ 'Content-Type': 'application/json' }, CORS), body: JSON.stringify(body) });

const srv = await new Promise(res => {
  const s = http.createServer((req, r) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const f = path.join(DIST, p);
    if (!f.startsWith(DIST) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
  }).listen(0, () => res(s));
});
const base = 'http://localhost:' + srv.address().port;
const browser = await chromium.launch();

async function setup(ctx, provider) {
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto(base + '/supervisor/' + encodeURIComponent(SUP));
  await page.evaluate(async () => {
    const opfs = await navigator.storage.getDirectory();
    await window.__wblOpenFolder(await opfs.getDirectoryHandle('mail-' + Date.now(), { create: true }));
  });
  // Settings through the real form
  await page.click('#tabs button[data-tab=settings]');
  await page.selectOption('#s-email-provider', provider);
  if (provider === 'google') await page.fill('#s-google-id', 'test-client.apps.googleusercontent.com');
  else await page.fill('#s-ms-id', '11111111-2222-3333-4444-555555555555');
  check((await page.textContent('#redirect-uri')).endsWith('/supervisor/oauth-callback.html'), provider + ': settings show the sign-in return address for IT');
  await page.click('#email-form button[type=submit]');
  // A student plus three signed submissions: attachment, text-only, and one already imported
  const docs = await page.evaluate(async () => {
    const d = window.__wblData();
    const s = { studentId: '30001', firstName: 'Jordan', lastName: 'Lee', program: 'Culinary', employer: 'Main St Diner', key: WBL.newKey(), active: true };
    d.students.push(s);
    const mk = (a, b, h) => WBL.createSubmission({ studentId: s.studentId, studentName: 'Jordan Lee', employer: 'Main St Diner', periodStart: a, periodEnd: b, regularHours: h, image: null, type: 'paystub' }, s.key);
    return [await mk('2026-10-05', '2026-10-18', 20), await mk('2026-10-19', '2026-11-01', 22)];
  });
  return { page, errs, docs };
}

try {
  // ---------------- Google ----------------
  console.log('Google (Gmail)');
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
    const { page, errs, docs } = await setup(ctx, 'google');
    const [a, b] = docs;
    const textBody = 'ClockedIn hours for Jordan Lee\n\nDo not edit below this line.\nWBLDATA:' + b64url(JSON.stringify(b)) + ':END';
    let authCalls = 0, query = '';
    await ctx.route('https://accounts.google.com/**', route => {
      authCalls++;
      const u = new URL(route.request().url());
      check(u.searchParams.get('scope') === 'https://www.googleapis.com/auth/gmail.readonly', 'asks Google for read-only access');
      route.fulfill({ status: 302, headers: { Location: u.searchParams.get('redirect_uri') + '#access_token=fake-google&expires_in=3600&token_type=Bearer&state=' + u.searchParams.get('state') } });
    });
    await ctx.route('https://gmail.googleapis.com/**', route => {
      const req = route.request();
      if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
      if (req.headers()['authorization'] !== 'Bearer fake-google') return json(route, { error: 'unauth' }, 401);
      const u = new URL(req.url()); const p = u.pathname;
      if (p.endsWith('/profile')) return json(route, { emailAddress: 'supervisor@school.example' });
      if (p.endsWith('/messages')) { query = u.searchParams.get('q'); return json(route, { messages: [{ id: 'm1' }, { id: 'm2' }, { id: 'm3' }] }); }
      if (p.endsWith('/messages/m1')) return json(route, { id: 'm1', payload: { mimeType: 'multipart/mixed', parts: [
        { mimeType: 'text/plain', filename: '', body: { data: b64url('see attached') } },
        { mimeType: 'text/plain', filename: 'ClockedIn_30001_2026-10-05_to_2026-10-18_abc123.txt', body: { attachmentId: 'att1' } }] } });
      if (p.endsWith('/messages/m1/attachments/att1')) return json(route, { data: b64url(JSON.stringify(a)) });
      if (p.endsWith('/messages/m2')) return json(route, { id: 'm2', payload: { mimeType: 'text/plain', filename: '', body: { data: b64url(textBody) } } });
      if (p.endsWith('/messages/m3')) return json(route, { id: 'm3', payload: { mimeType: 'multipart/mixed', parts: [
        { mimeType: 'application/pdf', filename: 'lunch-menu.pdf', body: { attachmentId: 'x' } }] } });
      return json(route, { error: 'not found ' + p }, 404);
    });
    await page.click('#tabs button[data-tab=import]');
    await page.click('#check-email');
    await page.waitForSelector('#email-results .notice', { timeout: 20000 });
    const out = await page.textContent('#email-results');
    check(/0 approved automatically · 2 need review/.test(out), 'pulled 2 submissions (attachment + text-only email); ignored the unrelated email; no-photo ones held for review');
    check(authCalls === 1, 'signed in once through the pop-up');
    check(/ClockedIn/.test(query) && /after:\d{4}\/\d+\/\d+/.test(query), 'searches only ClockedIn emails since a date');
    check(/supervisor@school\.example/.test(await page.textContent('#email-status')), 'shows which mailbox is connected');
    if (SHOTS) { fs.mkdirSync(SHOTS, { recursive: true }); await page.screenshot({ path: path.join(SHOTS, 'email-google.png'), fullPage: true }); }
    // Second click: same emails again → duplicates, no new sign-in
    await page.click('#check-email');
    await page.waitForFunction(() => /2 already imported/.test(document.getElementById('email-results').textContent), null, { timeout: 20000 });
    check(authCalls === 1, 'second check reuses the sign-in and skips already-imported hours');
    await page.click('#tabs button[data-tab=students]');
    check(/\+42 in review/.test(await page.textContent('#students-table tbody')), 'student shows the 42 hours waiting for review');
    check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''));
    await ctx.close();
  }

  // ---------------- Microsoft ----------------
  console.log('Microsoft 365 (Outlook)');
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
    const { page, errs, docs } = await setup(ctx, 'microsoft');
    const [a, b] = docs;
    const textBody = 'ClockedIn hours for Jordan Lee\n\nDo not edit below this line.\nWBLDATA:' + b64url(JSON.stringify(b)) + ':END';
    let verifierOk = false, challenge = '';
    await ctx.route('https://login.microsoftonline.com/**', async route => {
      const req = route.request(); const u = new URL(req.url());
      if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
      if (u.pathname.endsWith('/authorize')) {
        challenge = u.searchParams.get('code_challenge');
        check(u.searchParams.get('scope').includes('Mail.Read') && !u.searchParams.get('scope').includes('Mail.ReadWrite'), 'asks Microsoft for read-only mail access');
        return route.fulfill({ status: 302, headers: { Location: u.searchParams.get('redirect_uri') + '#code=fake-code&state=' + u.searchParams.get('state') } });
      }
      if (u.pathname.endsWith('/token')) {
        const f = new URLSearchParams(req.postData());
        const crypto = await import('node:crypto');
        verifierOk = crypto.createHash('sha256').update(f.get('code_verifier')).digest('base64url') === challenge && f.get('code') === 'fake-code';
        return json(route, { access_token: 'fake-ms', expires_in: 3600, token_type: 'Bearer' });
      }
      return json(route, {}, 404);
    });
    await ctx.route('https://graph.microsoft.com/**', route => {
      const req = route.request();
      if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
      if (req.headers()['authorization'] !== 'Bearer fake-ms') return json(route, { error: 'unauth' }, 401);
      const p = new URL(req.url()).pathname;
      if (p === '/v1.0/me') return json(route, { mail: 'supervisor@district.example' });
      if (p === '/v1.0/me/messages') return json(route, { value: [
        { id: 'a1', hasAttachments: true, subject: '', bodyPreview: 'ClockedIn hours for Jordan Lee' },
        { id: 'a2', hasAttachments: false, subject: 'ClockedIn hours 2026-10-19 to 2026-11-01', bodyPreview: 'ClockedIn hours for Jordan Lee' },
        { id: 'a3', hasAttachments: false, subject: 'Staff meeting', bodyPreview: 'Reminder' }] });
      if (p === '/v1.0/me/messages/a1/attachments') return json(route, { value: [{ '@odata.type': '#microsoft.graph.fileAttachment', name: 'ClockedIn_30001_2026-10-05_to_2026-10-18_abc123.txt', contentBytes: Buffer.from(JSON.stringify(a)).toString('base64') }] });
      if (p === '/v1.0/me/messages/a2') return json(route, { body: { contentType: 'text', content: textBody } });
      return json(route, { error: 'unexpected ' + p }, 404);
    });
    await page.click('#tabs button[data-tab=import]');
    await page.click('#check-email');
    await page.waitForSelector('#email-results .notice', { timeout: 20000 });
    const out = await page.textContent('#email-results');
    check(/2 need review/.test(out) && !/Staff meeting/.test(out), 'pulled 2 submissions from Outlook (attachment + text-only); skipped the unrelated email');
    check(verifierOk, 'secure sign-in (PKCE) completed');
    check(/supervisor@district\.example/.test(await page.textContent('#email-status')), 'shows which mailbox is connected');
    check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''));
    await ctx.close();
  }

  // ---------------- not set up ----------------
  console.log('Not set up');
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(base + '/supervisor/' + encodeURIComponent(SUP));
    await page.evaluate(async () => { const o = await navigator.storage.getDirectory(); await window.__wblOpenFolder(await o.getDirectoryHandle('none-' + Date.now(), { create: true })); });
    await page.click('#tabs button[data-tab=import]');
    check(/isn't set up yet/.test(await page.textContent('#email-status')), 'explains email is not set up');
    await page.click('#check-email');
    check(await page.isVisible('#view-settings'), 'button takes you to the email settings');
    await ctx.close();
  }
} finally { await browser.close(); srv.close(); }
console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
