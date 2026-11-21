// Portfolio "Window Shopping": each design stands in its own boutique window along a street.
// Tap a window to see the look up close.
import { icon } from './icons.js';

const AWNINGS = ['#b4466e', '#1d3a8a', '#0f5e4f', '#7a1236', '#b8913a', '#5a1d7a', '#2b2228', '#c47f4f'];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function openWindowShopping(list, { onOpen, onRunway, onNotes, fmt }) {
  const urls = [];
  const url = (b) => { if (!b) return ''; const u = URL.createObjectURL(b); urls.push(u); return u; };
  const el = document.createElement('div');
  el.className = 'street';
  el.innerHTML = `
    <div class="street-top">
      <div class="street-title"><span>${icon('star')}</span>My portfolio <em>Window Shopping</em></div>
      <div class="street-actions">
        <button class="btn" data-act="runway">${icon('spin')}<span>Runway show</span></button>
        <button class="btn icon" data-act="close" title="Close">${icon('close')}</button>
      </div>
    </div>
    <div class="street-scroll" tabindex="0">
      <div class="street-row">
        ${list.length ? list.map((d, i) => `
          <div class="shop" style="--awning:${AWNINGS[i % AWNINGS.length]}" data-i="${i}">
            <div class="awning"></div>
            <div class="shop-sign">${esc(d.name)}</div>
            <button class="shop-window" data-i="${i}" aria-label="Look at ${esc(d.name)}">
              <div class="backdrop"></div>
              ${d.look ? `<img class="look" alt="" src="${url(d.look)}">` : d.thumb ? `<img class="look flat" alt="" src="${url(d.thumb)}">` : ''}
              <div class="plinth"></div>
              <div class="glass"></div>
              ${d.summary?.fabrics?.length ? `<div class="tag">${esc(d.summary.fabrics.join(' · '))}</div>` : ''}
            </button>
            <div class="shop-base"><span class="door"></span></div>
          </div>`).join('') : '<div class="street-empty">Your portfolio is empty. Open a design and press the star to put it in the window.</div>'}
      </div>
    </div>
    <div class="sidewalk"></div>
    <button class="street-nav prev" data-act="prev" aria-label="Previous">‹</button>
    <button class="street-nav next" data-act="next" aria-label="Next">›</button>`;
  document.body.appendChild(el);
  const scroller = el.querySelector('.street-scroll');
  const close = () => { el.remove(); urls.forEach((u) => URL.revokeObjectURL(u)); window.removeEventListener('keydown', key); };
  const key = (e) => { if (e.key === 'Escape') { if (el.querySelector('.look-detail')) el.querySelector('.look-detail').remove(); else close(); } if (e.key === 'ArrowRight') scroller.scrollBy({ left: 340, behavior: 'smooth' }); if (e.key === 'ArrowLeft') scroller.scrollBy({ left: -340, behavior: 'smooth' }); };
  window.addEventListener('keydown', key);
  el.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'close') close();
    else if (act === 'runway') { close(); onRunway(list); }
    else if (act === 'prev') scroller.scrollBy({ left: -340, behavior: 'smooth' });
    else if (act === 'next') scroller.scrollBy({ left: 340, behavior: 'smooth' });
    const w = e.target.closest('.shop-window');
    if (w) detail(list[+w.dataset.i]);
  });

  function detail(d) {
    const box = document.createElement('div');
    box.className = 'look-detail';
    const m = d.summary?.measure || {};
    const meas = [['Bust', m.bust], ['Waist', m.waist], ['Hip', m.hip], ['Length', m.length], ['Hem', m.hem], ['Sleeve', m.sleeve], ['Inseam', m.inseam]].filter(([, v]) => v != null);
    box.innerHTML = `
      <div class="look-card">
        <button class="btn icon look-x" data-x title="Close">${icon('close')}</button>
        <div class="look-views">
          <div class="look-main">${d.look ? `<img alt="Front" src="${url(d.look)}">` : d.thumb ? `<img alt="" src="${url(d.thumb)}">` : ''}</div>
          <div class="look-thumbs">
            ${d.look ? `<button data-src="${url(d.look)}">Front</button>` : ''}
            ${d.lookBack ? `<button data-src="${url(d.lookBack)}">Back</button>` : ''}
            ${d.thumb ? `<button data-src="${url(d.thumb)}">Sketch</button>` : ''}
          </div>
        </div>
        <div class="look-info">
          <h2>${esc(d.name)}</h2>
          ${d.summary?.fabrics?.length ? `<div class="sub">Fabrics</div><p>${esc(d.summary.fabrics.join(', '))}</p>` : ''}
          ${meas.length ? `<div class="sub">Measurements</div><table class="meas">${meas.map(([k, v]) => `<tr><td>${k}</td><td>${fmt(v)}</td></tr>`).join('')}</table>` : ''}
          <div class="sub">Designer's notes</div>
          <textarea class="look-notes" placeholder="Inspiration, where it would be worn, what you would change…">${esc(d.notes || '')}</textarea>
          <div class="dialog-btns">
            <button class="btn" data-run>Runway from here</button>
            <button class="btn primary" data-open>Open in the studio</button>
          </div>
        </div>
      </div>`;
    el.appendChild(box);
    const main = box.querySelector('.look-main');
    box.addEventListener('click', (e) => {
      if (e.target === box || e.target.closest('[data-x]')) box.remove();
      const t = e.target.closest('[data-src]'); if (t) main.innerHTML = `<img alt="" src="${t.dataset.src}">`;
      if (e.target.closest('[data-open]')) { close(); onOpen(d); }
      if (e.target.closest('[data-run]')) { const i = list.indexOf(d); close(); onRunway([...list.slice(i), ...list.slice(0, i)]); }
    });
    const notes = box.querySelector('.look-notes');
    notes.addEventListener('change', () => { d.notes = notes.value; onNotes(d); });
  }
  return { close };
}
