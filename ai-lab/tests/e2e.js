// Run: npx playwright install chromium   (once)   then:   node tests/e2e.js
// Serves the repo on localhost, plays a student through every activity, downloads a submission, loads it in the teacher page.
const { chromium } = require('playwright'), http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png' };
const srv = http.createServer((q, r) => { const f = path.join(root, decodeURIComponent(q.url.split('?')[0]).replace(/^\/$/, '/index.html')); fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'Content-Type': mime[path.extname(f)] || 'application/octet-stream' }); r.end(d); } }); });
(async () => {
  await new Promise((r) => srv.listen(0, r)); const BASE = 'http://localhost:' + srv.address().port + '/'; const out = path.join(__dirname, 'out'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 1366, height: 900 }, acceptDownloads: true }), p = await ctx.newPage(), errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  const go = async (h) => { await p.evaluate((x) => { location.hash = x; }, h); await p.waitForTimeout(300); };
  const cfu = async () => { const n = await p.evaluate(() => Array.from(document.querySelectorAll('.cfu')).map((bx, i) => ({ i, a: AI.CFU.find((x) => x.q === bx.querySelector('h4').textContent).a }))); for (const q of n) { const bx = p.locator('.cfu').nth(q.i); await bx.locator('input[type=radio]').nth(q.a).check(); await bx.locator('button:has-text("Check answer")').click(); } };
  await p.goto(BASE + 'student.html'); await p.fill('#in_first', 'Test'); await p.fill('#in_last', 'Student'); await p.fill('#in_period', '1'); await p.click('text=Start Activity 3'); await p.waitForTimeout(400);
  await p.click('button:has-text("Test my line")'); await cfu();
  for (const h of ['a3/m2', 'a3/m3', 'a3/m4', 'a3/m5', 'a3/m6', 'a4/run', 'a4/build', 'a5/lazy', 'a5/tune', 'a5/cost', 'a6/data', 'a6/train', 'a6/fix', 'a7/read', 'a7/decide', 'a7/sort', 'fin']) { await go(h); await cfu(); }
  await p.evaluate(() => { AI.S.activeSeconds = 2400; AI.save(); }); await go('submit');
  const dl = p.waitForEvent('download'); await p.click('button:has-text("Download my submission file")'); const d = await dl; const file = path.join(out, d.suggestedFilename()); await d.saveAs(file);
  const t = await ctx.newPage(); t.on('pageerror', (e) => errs.push('teacher ' + e.message)); await t.goto(BASE + 'teacher.html'); await t.setInputFiles('input[type=file]', [file]); await t.waitForTimeout(500);
  const row = await t.$$eval('table.t tr', (trs) => trs.map((tr) => tr.textContent)); const verified = row.some((x) => x.includes('Student, Test') && x.includes('Verified'));
  console.log(verified ? 'PASS student file loads and verifies in teacher page' : 'FAIL teacher did not verify the file'); console.log(errs.length ? 'JS ERRORS: ' + errs.join(' | ') : 'PASS no JavaScript errors');
  await b.close(); srv.close(); process.exit(verified && !errs.length ? 0 : 1);
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
