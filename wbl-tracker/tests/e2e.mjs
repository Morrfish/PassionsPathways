// End-to-end test of the whole loop in Chromium:
//   supervisor adds a student → student phone enrolls → submits a pay stub with a
//   redacted photo → supervisor imports it → totals update; a tampered file is flagged.
//
//   node tests/e2e.mjs [brand-id]      (build that brand first)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium, devices } = createRequire(import.meta.url)('playwright');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brand = process.argv[2] || 'default';
const DIST = path.join(ROOT, 'dist', brand);
const SHOTS = process.env.SHOTS || '';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.jpg': 'image/jpeg' };

function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, r) => {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (p.endsWith('/')) p += 'index.html';
      const f = path.join(DIST, p);
      if (!f.startsWith(DIST) || !fs.existsSync(f)) { r.writeHead(404); return r.end('not found'); }
      r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(r);
    }).listen(0, () => res(srv));
  });
}

let failures = 0;
function check(cond, msg) { console.log((cond ? '  ✓ ' : '  ✗ ') + msg); if (!cond) failures++; }
const shot = async (page, name) => { if (SHOTS) { fs.mkdirSync(SHOTS, { recursive: true }); await page.screenshot({ path: path.join(SHOTS, name + '.png'), fullPage: true }); } };

const srv = await serve();
const base = 'http://localhost:' + srv.address().port;
const browser = await chromium.launch();
try {
  // ---------- supervisor ----------
  console.log('Supervisor app');
  const sup = await (await browser.newContext({ viewport: { width: 1280, height: 860 }, acceptDownloads: true })).newPage();
  const errs = []; sup.on('pageerror', e => errs.push(e.message));
  await sup.goto(base + '/supervisor/' + encodeURIComponent('WBL Supervisor.html'));
  check(await sup.evaluate(() => typeof window.showDirectoryPicker === 'function'), 'folder picker available in Chromium');
  await shot(sup, '01-supervisor-setup');
  // Open a private browser folder (stands in for a real folder picked in the dialog).
  await sup.evaluate(async () => {
    const opfs = await navigator.storage.getDirectory();
    await window.__wblOpenFolder(await opfs.getDirectoryHandle('e2e-' + Date.now(), { create: true }));
  });
  await sup.click('#tabs button[data-tab=settings]');
  await sup.fill('#s-emails', 'wbl@school.example, second@school.example');
  await sup.fill('#s-appurl', base + '/student/');
  await sup.fill('#s-goal', '250');
  await sup.click('#settings-form button[type=submit]');
  await sup.click('#tabs button[data-tab=students]');
  await sup.click('#add-student');
  await sup.fill('#sd-first', 'Ava'); await sup.fill('#sd-last', 'Martinez'); await sup.fill('#sd-id', '20001');
  await sup.fill('#sd-program', 'Auto Technology'); await sup.fill('#sd-employer', 'Quick Lube Plus');
  await sup.click('#sd-save');
  await sup.waitForSelector('#sd-qr svg');
  check(true, 'student added and enrollment QR shown');
  await shot(sup, '02-student-qr');
  const enrollUrl = await sup.evaluate(() => {
    const d = window.__wblData(); const s = d.students[0];
    return WBL.enrollmentUrl(d.settings.appUrl, { studentId: s.studentId, name: s.firstName + ' ' + s.lastName, school: d.settings.schoolName, emails: d.settings.emails, key: s.key, employer: s.employer });
  });
  await sup.click('#student-dialog .dlg-foot .close-dlg');

  // ---------- student phone ----------
  console.log('Student app');
  const phoneCtx = await browser.newContext(Object.assign({}, devices['iPhone 13'], { acceptDownloads: true }));
  const ph = await phoneCtx.newPage();
  ph.on('pageerror', e => errs.push('student: ' + e.message));
  await ph.goto(enrollUrl);
  await ph.waitForSelector('#screen-home:not(.hidden)');
  check((await ph.textContent('#hello-name')).includes('Ava'), 'phone enrolled from QR link');
  check(!(await ph.evaluate(() => location.hash)), 'enrollment key removed from the address bar');
  await shot(ph, '03-student-home');

  await ph.click('#new-paystub');
  // Make a fake pay stub image with private info and hours.
  const stub = await ph.evaluate(() => {
    const c = document.createElement('canvas'); c.width = 800; c.height = 1000; const g = c.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, 800, 1000); g.fillStyle = '#000'; g.font = '28px sans-serif';
    g.fillText('SSN: XXX-XX-1234   Net pay $412.55', 40, 80);
    g.fillText('Pay period 10/19/2026 - 11/01/2026', 40, 400);
    g.fillText('Regular hours 32.50   OT 1.50', 40, 600);
    return c.toDataURL('image/png').split(',')[1];
  });
  await ph.setInputFiles('#photo-input', { name: 'stub.png', mimeType: 'image/png', buffer: Buffer.from(stub, 'base64') });
  await ph.waitForSelector('#screen-redact:not(.hidden)');
  const box = await ph.locator('#redact-canvas').boundingBox();
  const drag = async (y1, y2) => { await ph.mouse.move(box.x + box.width * 0.03, box.y + box.height * y1); await ph.mouse.down(); await ph.mouse.move(box.x + box.width * 0.9, box.y + box.height * y2, { steps: 5 }); await ph.mouse.up(); };
  await drag(0.36, 0.42); await drag(0.56, 0.62);
  await shot(ph, '04-student-redact');
  await ph.click('#redact-done');
  await ph.waitForSelector('#screen-entry:not(.hidden)');
  // The saved image must not contain the top (SSN) area: check it's black.
  const topIsBlack = await ph.evaluate(async () => {
    const im = document.querySelector('#photo-preview img'); await im.decode();
    const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; const g = c.getContext('2d'); g.drawImage(im, 0, 0);
    const mid = Math.round(c.height * 0.48); // between the two kept boxes
    const px = g.getImageData(0, mid, c.width, 2).data; let max = 0; for (let i = 0; i < px.length; i += 4) max = Math.max(max, px[i]);
    return { max, h: c.height };
  });
  check(topIsBlack.max < 40, 'area between kept boxes is blacked out (max brightness ' + topIsBlack.max + ')');
  await ph.fill('#f-start', '2026-10-19'); await ph.fill('#f-end', '2026-11-01');
  await ph.fill('#f-reg', '32.5'); await ph.fill('#f-ot', '1.5');
  await shot(ph, '05-student-entry');
  await ph.click('#entry-form button[type=submit]');
  await ph.waitForSelector('#screen-send:not(.hidden)');
  await shot(ph, '06-student-send');
  // Headless Chromium has no share sheet, so the app falls back to a download.
  const [dl] = await Promise.all([ph.waitForEvent('download'), ph.click('#share-btn')]);
  const fileName = dl.suggestedFilename();
  const filePath = await dl.path();
  check(/^WBL_20001_2026-10-19_to_2026-11-01_.*\.txt$/.test(fileName), 'submission file created: ' + fileName);
  const fileText = fs.readFileSync(filePath, 'utf8');
  check(!/1234|412/.test(fileText.replace(/"image":"[^"]*"/, '')), 'file has no SSN or pay amount text');
  await ph.click('#send-done');
  await ph.waitForSelector('#screen-home:not(.hidden)');
  check((await ph.textContent('#total-sent')) === '34', 'phone shows 34 hours sent');
  await shot(ph, '07-student-home-after');

  // Unpaid hours entry (text-only path)
  await ph.click('#new-manual');
  await ph.fill('#f-start', '2026-11-03'); await ph.fill('#f-end', '2026-11-03'); await ph.fill('#f-reg', '4'); await ph.fill('#f-notes', 'Job shadow at dealership');
  await ph.click('#entry-form button[type=submit]');
  await ph.waitForSelector('#screen-send:not(.hidden)');
  const mailto = await ph.evaluate(() => new Promise(res => { window.__wblOpenUrl = res; document.getElementById('mailto-btn').click(); }));
  check(mailto.startsWith('mailto:wbl%40school.example?subject='), 'text-only email addressed to the supervisor');
  const mailBody = decodeURIComponent(mailto.split('&body=')[1]);
  check(/WBLDATA:[A-Za-z0-9_-]+:END/.test(mailBody), 'text-only email carries the WBLDATA code');
  await ph.click('#send-done');

  // ---------- supervisor import ----------
  console.log('Supervisor import');
  await sup.click('#tabs button[data-tab=import]');
  await sup.setInputFiles('#import-files', { name: fileName, mimeType: 'text/plain', buffer: Buffer.from(fileText) });
  await sup.waitForSelector('#import-results .notice');
  const res1 = await sup.textContent('#import-results');
  check(/1 approved automatically/.test(res1), 'clean submission approved automatically');
  await shot(sup, '08-import-results');
  // Same file again → duplicate
  await sup.setInputFiles('#import-files', { name: fileName, mimeType: 'text/plain', buffer: Buffer.from(fileText) });
  await sup.waitForFunction(() => /1 already imported/.test(document.getElementById('import-results').textContent));
  check(true, 'second import detected as duplicate');
  // Tampered copy → flagged
  const tampered = JSON.parse(fileText); tampered.regularHours = 80; tampered.submissionId += 'x';
  await sup.setInputFiles('#import-files', { name: 'tampered.txt', mimeType: 'text/plain', buffer: Buffer.from(JSON.stringify(tampered)) });
  await sup.waitForFunction(() => /1 need review/.test(document.getElementById('import-results').textContent));
  check(/Security check failed/.test(await sup.textContent('#import-results')), 'tampered file flagged by the security check');

  // Paste the text-only email
  await sup.click('#view-import details summary');
  await sup.fill('#paste-box', 'From: Ava\n\n' + mailBody.replace(/(.{70})/g, '$1\n'));
  await sup.click('#paste-import');
  await sup.waitForFunction(() => /Unpaid hours: confirm/.test(document.getElementById('import-results').textContent));
  check(true, 'pasted text-only email imported (wrapped lines OK), flagged for unpaid-hours check');

  await sup.click('#tabs button[data-tab=students]');
  const row = await sup.textContent('#students-table tbody tr');
  check(/34 \/ 250/.test(row), 'student shows 34 / 250 approved hours');
  check(/85.5 in review/.test(row), 'tampered (81.5) + unpaid (4) hours held in review, not counted');
  await shot(sup, '09-students');
  await sup.click('#tabs button[data-tab=review]');
  await sup.waitForSelector('.review-card');
  await shot(sup, '10-review');
  await sup.click('.review-card button[data-act=reject]').catch(() => {});

  // Practice data mode renders
  const demo = await (await browser.newContext({ viewport: { width: 1280, height: 860 } })).newPage();
  await demo.goto(base + '/supervisor/' + encodeURIComponent('WBL Supervisor.html'));
  await demo.click('#demo-btn');
  await demo.waitForSelector('#students-table tbody tr');
  check((await demo.locator('#students-table tbody tr').count()) >= 6, 'practice data loads');
  await shot(demo, '11-practice-dashboard');

  check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''));
} finally {
  await browser.close(); srv.close();
}
console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
