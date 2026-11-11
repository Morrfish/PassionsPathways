#!/usr/bin/env node
/*
 * Build the WBL apps for one school brand (or all of them).
 *
 *   node tools/build.mjs default          # the unbranded version
 *   node tools/build.mjs greene-ccc       # one school
 *   node tools/build.mjs --all            # every folder in brands/
 *   node tools/build.mjs greene-ccc --no-icons   # skip PNG icon rendering
 *
 * Output (dist/<brand>/):
 *   student/                      the phone app; host these files on any HTTPS web server
 *   supervisor/<AppName> Supervisor.html  one self-contained file; copy it to the supervisor's PC
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { onColor, readableOnWhite, contrast } from './colors.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const args = process.argv.slice(2);
const noIcons = args.includes('--no-icons');
let ids = args.filter(a => !a.startsWith('--'));
if (args.includes('--all')) ids = fs.readdirSync(path.join(ROOT, 'brands')).filter(d => fs.existsSync(path.join(ROOT, 'brands', d, 'brand.json')));
if (!ids.length) { console.error('Usage: node tools/build.mjs <brand-id>|--all [--no-icons]'); process.exit(1); }

const MIME = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' };

export function loadBrand(id) {
  const dir = path.join(ROOT, 'brands', id);
  const file = path.join(dir, 'brand.json');
  if (!fs.existsSync(file)) throw new Error('No brand named "' + id + '" (expected ' + path.relative(ROOT, file) + ')');
  const b = JSON.parse(fs.readFileSync(file, 'utf8'));
  b.id = id;
  b.dir = dir;
  if (!b.schoolName) throw new Error(id + ': brand.json needs "schoolName"');
  if (!b.colors || !b.colors.primary || !b.colors.accent) throw new Error(id + ': brand.json needs colors.primary and colors.accent');
  b.logoPath = path.join(dir, b.logo || 'logo.svg');
  if (!fs.existsSync(b.logoPath)) throw new Error(id + ': logo file not found: ' + b.logoPath);
  // Optional square mark for the phone home-screen icon (wide logos get tiny in a square).
  b.iconPath = b.icon ? path.join(dir, b.icon) : b.logoPath;
  if (!fs.existsSync(b.iconPath)) throw new Error(id + ': icon file not found: ' + b.iconPath);
  const c = b.colors;
  c.onPrimary = c.onPrimary || onColor(c.primary);
  c.onAccent = c.onAccent || onColor(c.accent);
  c.link = c.link || readableOnWhite(c.primary);
  c.logoBg = c.logoBg || '#ffffff';  // tile behind the logo in the header; set dark for white logos
  b.appName = b.appName || 'ClockedIn';
  b.schoolShort = b.schoolShort || b.schoolName;
  b.defaultGoalHours = b.defaultGoalHours || 250;
  return b;
}

function brandCss(b) {
  const c = b.colors;
  return `/* Generated from brands/${b.id}/brand.json. Edit that file, not this one. */
:root {
  --brand-primary: ${c.primary};
  --brand-on-primary: ${c.onPrimary};
  --brand-accent: ${c.accent};
  --brand-on-accent: ${c.onAccent};
  --brand-link: ${c.link};
  --brand-logo-bg: ${c.logoBg};
}
`;
}

function publicBrand(b) {
  return { id: b.id, schoolName: b.schoolName, schoolShort: b.schoolShort, appName: b.appName, website: b.website || '',
    studentAppUrl: b.studentAppUrl || '', defaultGoalHours: b.defaultGoalHours, colors: b.colors };
}

function fill(text, b, extra = {}) {
  const tokens = Object.assign({
    APP_NAME: b.appName, SCHOOL_NAME: b.schoolName, SCHOOL_SHORT: b.schoolShort, PRIMARY: b.colors.primary,
    BRAND_JSON: JSON.stringify(publicBrand(b)).replace(/</g, '\\u003c'),
    BUILD_ID: Date.now().toString(36)
  }, extra);
  return text.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => {
    if (!(k in tokens)) throw new Error('Unknown template token ' + m);
    const v = String(tokens[k]);
    // HTML-escape everything except the JSON blob and colors (used in script/attributes as-is)
    return k === 'BRAND_JSON' ? v : v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  });
}

function write(file, content) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); }

async function renderIcons(b, outDir) {
  let chromium;
  try { ({ chromium } = await import('playwright')); }
  catch (e) {
    try { const { createRequire } = await import('node:module'); ({ chromium } = createRequire(import.meta.url)('playwright')); }
    catch (e2) { return false; }
  }
  const logo = 'data:' + MIME[path.extname(b.iconPath).toLowerCase()] + ';base64,' + fs.readFileSync(b.iconPath).toString('base64');
  const browser = await chromium.launch();
  try {
    for (const size of [192, 512]) {
      const page = await browser.newPage({ viewport: { width: size, height: size } });
      // Logo on a white rounded tile centered on the school color; keeps inside the maskable safe zone.
      await page.setContent(`<html><body style="margin:0;width:${size}px;height:${size}px;background:${b.colors.primary};display:flex;align-items:center;justify-content:center">
        <div style="width:${size * 0.66}px;height:${size * 0.66}px;background:${b.colors.logoBg};border-radius:${size * 0.12}px;display:flex;align-items:center;justify-content:center">
        <img src="${logo}" style="max-width:82%;max-height:82%;object-fit:contain"></div></body></html>`);
      await page.waitForFunction(() => document.images[0].complete);
      await page.screenshot({ path: path.join(outDir, `icon-${size}.png`) });
      await page.close();
    }
  } finally { await browser.close(); }
  return true;
}

function inlineSingleFile(html, files) {
  html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (m, f) => {
    if (!(f in files)) throw new Error('Missing stylesheet ' + f);
    return '<style>\n' + files[f] + '\n</style>';
  });
  html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, f) => {
    if (!(f in files)) throw new Error('Missing script ' + f);
    return '<script>\n' + files[f].replace(/<\/script/gi, '<\\/script') + '\n</script>';
  });
  return html;
}

export async function build(id) {
  const b = loadBrand(id);
  const out = path.join(ROOT, 'dist', id);
  fs.rmSync(out, { recursive: true, force: true });
  const logoExt = path.extname(b.logoPath).toLowerCase();
  const logoName = 'logo' + logoExt;
  const read = p => fs.readFileSync(path.join(SRC, p), 'utf8');
  const shared = { 'base.css': read('shared/base.css'), 'brand.css': brandCss(b), 'wbl-format.js': read('shared/wbl-format.js') };

  // ---- student (static files for a web host) ----
  const sdir = path.join(out, 'student');
  const powered = b.showPoweredBy === false ? ' hidden' : '';
  const extra = { LOGO_FILE: logoName, CLOCKEDIN_LOGO: 'clockedin-logo.png', POWERED_CLASS: powered };
  write(path.join(sdir, 'index.html'), fill(read('student/index.html'), b, extra));
  write(path.join(sdir, 'sw.js'), fill(read('student/sw.js'), b, extra));
  write(path.join(sdir, 'manifest.webmanifest'), fill(read('student/manifest.webmanifest'), b, extra));
  write(path.join(sdir, 'student.css'), read('student/student.css'));
  write(path.join(sdir, 'student.js'), read('student/student.js'));
  for (const [n, t] of Object.entries(shared)) write(path.join(sdir, n), t);
  fs.copyFileSync(b.logoPath, path.join(sdir, logoName));
  fs.copyFileSync(path.join(SRC, 'shared', 'clockedin-logo.png'), path.join(sdir, 'clockedin-logo.png'));
  let icons = false;
  if (!noIcons) icons = await renderIcons(b, sdir);
  if (!icons) {
    console.warn('  ! icons not rendered (Playwright missing or --no-icons); copying any icon-*.png from the brand folder');
    for (const s of [192, 512]) { const f = path.join(b.dir, `icon-${s}.png`); if (fs.existsSync(f)) fs.copyFileSync(f, path.join(sdir, `icon-${s}.png`)); }
  }

  // ---- supervisor (one self-contained HTML file) ----
  const logoData = 'data:' + MIME[logoExt] + ';base64,' + fs.readFileSync(b.logoPath).toString('base64');
  const ciData = 'data:image/png;base64,' + fs.readFileSync(path.join(SRC, 'shared', 'clockedin-logo.png')).toString('base64');
  let shtml = fill(read('supervisor/index.html'), b, { LOGO_FILE: logoData, CLOCKEDIN_LOGO: ciData, POWERED_CLASS: powered });
  shtml = inlineSingleFile(shtml, Object.assign({}, shared, {
    'supervisor.css': read('supervisor/supervisor.css'), 'supervisor.js': read('supervisor/supervisor.js'), 'qrcode.js': read('vendor/qrcode.js')
  }));
  const supName = b.appName + ' Supervisor.html';
  write(path.join(out, 'supervisor', supName), shtml);
  write(path.join(out, 'supervisor', 'README.txt'),
`${b.appName} Supervisor: ${b.schoolName}

1. Copy "${supName}" to the supervisor's computer (for example, the Desktop).
2. Make a folder for the records, for example Documents\\WBL Data, or a folder on the school network drive.
3. Double-click "${supName}". It opens in Microsoft Edge or Google Chrome.
4. Click "Choose data folder..." and pick the folder from step 2.
5. Under Settings, enter your email address(es) and the student app web address.

All records stay in that folder. Back it up weekly (Settings > Back up now).
`);

  const warn = [];
  if (contrast(b.colors.primary, b.colors.onPrimary) < 4.5) warn.push('header text contrast is ' + contrast(b.colors.primary, b.colors.onPrimary).toFixed(2) + ':1 (below 4.5)');
  if (contrast(b.colors.accent, b.colors.onAccent) < 4.5) warn.push('accent button contrast is ' + contrast(b.colors.accent, b.colors.onAccent).toFixed(2) + ':1 (below 4.5)');
  console.log('✓ ' + id + ' → ' + path.relative(ROOT, out) + (warn.length ? '\n  ! ' + warn.join('\n  ! ') : ''));
  return { out, brand: b, warnings: warn };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  for (const id of ids) {
    try { await build(id); } catch (e) { console.error('✗ ' + id + ': ' + e.message); process.exitCode = 1; }
  }
}
