#!/usr/bin/env node
/*
 * Look at a school's website and collect brand candidates: name, logo files, colors.
 * A person (or Claude, via the add-school skill) then picks the final values.
 *
 *   node tools/extract-brand.mjs https://www.school.org/ school-id
 *
 * Writes brands/<id>/_source/:
 *   site.png            screenshot of the top of the home page
 *   candidates.json     name, logo candidates, color candidates (with how often/where each was seen)
 *   logo-1.*, logo-2.*  downloaded logo candidates
 *   logos.png           contact sheet of the logo candidates on white and on dark
 * Nothing is written to brand.json; that's the next step.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { onColor, contrast } from './colors.mjs';

const { chromium } = createRequire(import.meta.url)('playwright');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [url, id] = process.argv.slice(2);
if (!url || !id || !/^[a-z0-9-]+$/.test(id)) {
  console.error('Usage: node tools/extract-brand.mjs <website-url> <brand-id (lowercase-with-dashes)>');
  process.exit(1);
}
const out = path.join(ROOT, 'brands', id, '_source');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
  // Close common cookie / alert popups so they don't skew colors.
  await page.evaluate(() => document.querySelectorAll('[class*=cookie],[id*=cookie],[class*=modal][style*=block]').forEach(e => e.remove())).catch(() => {});
  await page.screenshot({ path: path.join(out, 'site.png') });

  const found = await page.evaluate(() => {
    const abs = u => { try { return new URL(u, location.href).href; } catch (e) { return null; } };
    const meta = n => (document.querySelector(`meta[property="${n}"],meta[name="${n}"]`) || {}).content || '';
    const toHex = c => {
      const m = String(c).match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?/);
      if (!m) return null;
      if (m[4] !== undefined && parseFloat(m[4]) < 0.6) return null;
      return '#' + [m[1], m[2], m[3]].map(v => (+v).toString(16).padStart(2, '0')).join('');
    };
    const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.1; };

    // ---- logos ----
    const logos = [];
    const add = (src, why, score, el) => {
      const u = abs(src); if (!u || logos.some(l => l.url === u)) return;
      const r = el ? el.getBoundingClientRect() : null;
      logos.push({ url: u, why, score, w: r ? Math.round(r.width) : null, h: r ? Math.round(r.height) : null, top: r ? Math.round(r.top + scrollY) : null, alt: el && el.alt || '' });
    };
    document.querySelectorAll('img').forEach(img => {
      if (!vis(img)) return;
      const txt = (img.src + ' ' + img.alt + ' ' + img.className + ' ' + (img.closest('[class*=logo],[id*=logo]') ? 'logo' : '')).toLowerCase();
      const r = img.getBoundingClientRect();
      const inHeader = !!img.closest('header,[class*=header],[id*=header],nav,[class*=brand]');
      let s = 0;
      if (/logo|brand|seal|crest/.test(txt)) s += 5;
      if (inHeader) s += 3;
      if (r.top + scrollY < 220) s += 2;
      if (img.closest('a[href="/"],a[href="' + location.origin + '/"],a[href="' + location.origin + '"]')) s += 3;
      if (/sponsor|partner|social|facebook|twitter|instagram|youtube|banner|slide|hero/.test(txt)) s -= 4;
      if (s >= 4) add(img.currentSrc || img.src, inHeader ? 'header image' : 'image', s, img);
    });
    document.querySelectorAll('header svg, [class*=logo] svg, a[class*=logo] svg').forEach((svg, i) => {
      if (!vis(svg) || i > 3) return;
      const clone = svg.cloneNode(true);
      if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      add('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(clone.outerHTML))), 'inline svg in header', 6, svg);
    });
    const touch = document.querySelector('link[rel="apple-touch-icon"],link[rel="apple-touch-icon-precomposed"]');
    if (touch) add(touch.href, 'apple-touch-icon', 3, null);
    document.querySelectorAll('link[rel~="icon"]').forEach(l => add(l.href, 'favicon ' + (l.sizes && l.sizes.value || ''), 1, null));
    if (meta('og:image')) add(meta('og:image'), 'og:image', 2, null);
    logos.sort((a, b) => b.score - a.score);

    // ---- colors ----
    const tally = {};
    const bump = (hex, where, weight) => {
      if (!hex) return;
      const t = tally[hex] || (tally[hex] = { hex, weight: 0, where: {} });
      t.weight += weight; t.where[where] = (t.where[where] || 0) + 1;
    };
    const theme = meta('theme-color'); if (theme) bump(toHex(theme) || theme.toLowerCase(), 'theme-color', 5000);
    const roles = [
      ['header', 'header,[class*=header],[id*=header]'], ['nav', 'nav,[class*=nav],[class*=menu]'], ['footer', 'footer,[class*=footer]'],
      ['button', 'button,.btn,[class*=button],a[class*=btn]'], ['heading', 'h1,h2,h3']
    ];
    document.querySelectorAll('body *').forEach(el => {
      if (!vis(el)) return;
      const r = el.getBoundingClientRect();
      const area = Math.min(r.width * r.height, 400000);
      const s = getComputedStyle(el);
      const role = (roles.find(([, sel]) => el.matches(sel)) || ['other'])[0];
      const roleW = { header: 4, nav: 3, footer: 2, button: 3, heading: 2, other: 1 }[role];
      bump(toHex(s.backgroundColor), role + ' background', Math.sqrt(area) * roleW);
      if (el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) bump(toHex(s.color), role + ' text', 6 * roleW);
      if (parseFloat(s.borderTopWidth) >= 3) bump(toHex(s.borderTopColor), role + ' border', 20 * roleW);
      if (parseFloat(s.borderBottomWidth) >= 3) bump(toHex(s.borderBottomColor), role + ' border', 20 * roleW);
      if (el.tagName === 'A') bump(toHex(s.color), 'link', 4);
    });
    // CSS custom properties that look like brand colors
    const vars = [];
    for (const sh of document.styleSheets) {
      let rules; try { rules = sh.cssRules; } catch (e) { continue; }
      for (const r of rules || []) {
        if (!r.style || r.selectorText !== ':root') continue;
        for (const p of r.style) if (p.startsWith('--') && /color|primary|secondary|accent|brand/i.test(p)) vars.push([p, r.style.getPropertyValue(p).trim()]);
      }
    }
    const firstHeading = (document.querySelector('header h1, header .site-title, .site-name') || {}).textContent || '';
    return {
      title: document.title, siteName: meta('og:site_name'), description: meta('description') || meta('og:description'),
      headerText: firstHeading.trim().slice(0, 120), themeColor: theme, logos: logos.slice(0, 8), colors: Object.values(tally), cssVars: vars.slice(0, 40)
    };
  });

  // Keep colorful candidates; drop near-white/black/gray which are rarely the brand color.
  const sat = hex => { const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx === 0 ? 0 : (mx - mn) / mx; };
  const colors = found.colors.filter(c => /^#[0-9a-f]{6}$/.test(c.hex) && sat(c.hex) > 0.22)
    .sort((a, b) => b.weight - a.weight).slice(0, 12)
    .map(c => ({ hex: c.hex, weight: Math.round(c.weight), where: Object.entries(c.where).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, n]) => k + ' ×' + n).join(', '),
      textOn: onColor(c.hex), contrastWithText: +contrast(c.hex, onColor(c.hex)).toFixed(2) }));

  // Download logo candidates.
  const saved = [];
  for (const [i, l] of found.logos.entries()) {
    try {
      let buf, type;
      if (l.url.startsWith('data:')) { const [h, b64] = l.url.split(','); type = h.slice(5).split(';')[0]; buf = Buffer.from(b64, 'base64'); }
      else {
        // Load through the browser itself so it uses the same network path as the page.
        const p2 = await ctx.newPage();
        try {
          const r = await p2.goto(l.url, { timeout: 20000 });
          if (!r || !r.ok()) throw new Error('HTTP ' + (r ? r.status() : '?'));
          buf = await r.body(); type = (r.headers()['content-type'] || '').split(';')[0];
        } finally { await p2.close(); }
      }
      const ext = { 'image/svg+xml': '.svg', 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif', 'image/x-icon': '.ico', 'image/vnd.microsoft.icon': '.ico' }[type] || path.extname(new URL(l.url).pathname).toLowerCase() || '.img';
      const file = `logo-${i + 1}${ext}`;
      fs.writeFileSync(path.join(out, file), buf);
      saved.push(Object.assign({ file, bytes: buf.length, type }, l, { url: l.url.startsWith('data:') ? '(inline svg)' : l.url }));
    } catch (e) { saved.push(Object.assign({ file: null, error: e.message }, l)); }
  }

  // Contact sheet so the logos can be eyeballed on light and dark backgrounds.
  const sheet = await ctx.newPage();
  const tiles = saved.filter(s => s.file && s.file !== null && !s.file.endsWith('.ico')).map(s => {
    const mime = s.type && s.type.startsWith('image/') ? s.type : 'image/png';
    const src = 'data:' + mime + ';base64,' + fs.readFileSync(path.join(out, s.file)).toString('base64');
    return `<figure><div class="w"><img src="${src}"></div><div class="d"><img src="${src}"></div><figcaption>${s.file} · ${s.why} · score ${s.score}${s.w ? ` · shown ${s.w}×${s.h}` : ''}</figcaption></figure>`;
  });
  await sheet.setViewportSize({ width: 1000, height: 400 });
  await sheet.setContent(`<style>body{font:13px sans-serif;margin:12px}figure{margin:0 0 14px;display:grid;grid-template-columns:1fr 1fr;gap:8px}figcaption{grid-column:1/3}
    .w,.d{height:130px;display:flex;align-items:center;justify-content:center;border:1px solid #ccc}.d{background:#222}img{max-height:110px;max-width:90%}</style>${tiles.join('') || 'No logo candidates downloaded.'}`);
  await sheet.waitForTimeout(500);
  await sheet.screenshot({ path: path.join(out, 'logos.png'), fullPage: true });

  const result = { url, fetchedAt: new Date().toISOString(), title: found.title, siteName: found.siteName, headerText: found.headerText,
    description: found.description, themeColor: found.themeColor, logos: saved, colors, cssVars: found.cssVars };
  fs.writeFileSync(path.join(out, 'candidates.json'), JSON.stringify(result, null, 2));
  console.log('Saved to ' + path.relative(ROOT, out));
  console.log('Name: ' + (found.siteName || found.title));
  console.log('Logos: ' + saved.map(s => s.file ? s.file + ' (' + s.why + ', score ' + s.score + ')' : 'failed ' + s.url).join('; '));
  console.log('Colors: ' + colors.slice(0, 8).map(c => c.hex + ' [' + c.where + ']').join('\n        '));
} finally {
  await browser.close();
}
