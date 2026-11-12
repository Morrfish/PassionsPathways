/* Student app: enroll, enter hours, black out the pay stub photo, send to supervisor.
 * Everything is stored on this phone only (IndexedDB). Nothing is uploaded anywhere. */
(function () {
  'use strict';
  const BRAND = window.WBL_BRAND || {};
  const $ = id => document.getElementById(id);

  // ---------------- tiny IndexedDB key/value store ----------------
  const DB_NAME = 'wbl-student';
  let dbp = null;
  function db() {
    if (!dbp) dbp = new Promise((res, rej) => {
      const r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = () => {
        r.result.createObjectStore('kv');
        r.result.createObjectStore('subs', { keyPath: 'submissionId' });
      };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  async function tx(store, mode, fn) {
    const d = await db();
    return new Promise((res, rej) => {
      const t = d.transaction(store, mode);
      const s = t.objectStore(store);
      const out = fn(s);
      t.oncomplete = () => res(out && 'result' in out ? out.result : out);
      t.onerror = () => rej(t.error);
    });
  }
  const kvGet = k => tx('kv', 'readonly', s => s.get(k));
  const kvSet = (k, v) => tx('kv', 'readwrite', s => s.put(v, k));
  const subPut = v => tx('subs', 'readwrite', s => s.put(v));
  const subAll = () => tx('subs', 'readonly', s => s.getAll());
  const clearAll = () => Promise.all([tx('kv', 'readwrite', s => s.clear()), tx('subs', 'readwrite', s => s.clear())]);

  // ---------------- UI helpers ----------------
  let profile = null;      // enrollment info
  let draft = null;        // the entry being made
  let current = null;      // signed submission being sent (stored record)

  function show(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    $('screen-' + name).classList.remove('hidden');
    window.scrollTo(0, 0);
  }
  let toastTimer;
  function toast(msg) {
    const t = $('toast'); t.textContent = msg; t.classList.remove('hidden');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.add('hidden'), 3200);
  }
  function showError(id, msg) { const e = $(id); e.textContent = msg; e.classList.toggle('hidden', !msg); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function fmtDate(iso) {
    if (!iso) return '';
    const d = WBL.parseDate(iso);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  }
  function fmtHours(n) { return (Math.round(n * 100) / 100).toString(); }
  function today() { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }

  document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); if (go.dataset.go === 'home') renderHome(); show(go.dataset.go); }
  });

  // ---------------- enrollment ----------------
  async function enroll(codeOrUrl) {
    const p = WBL.parseEnrollment(codeOrUrl);
    if (profile && profile.studentId !== p.studentId) {
      if (!confirm('This phone is set up for ' + (profile.name || profile.studentId) + '. Replace it with ' + (p.name || p.studentId) + '?')) return false;
    }
    p.enrolledAt = new Date().toISOString();
    await kvSet('profile', p);
    profile = p;
    return true;
  }

  $('enroll-btn').addEventListener('click', async () => {
    showError('enroll-error', '');
    try {
      if (await enroll($('enroll-code').value)) { renderHome(); show('home'); toast('You\'re all set!'); }
    } catch (e) { showError('enroll-error', e.message); }
  });

  $('reset-btn').addEventListener('click', async () => {
    if (!confirm('Remove your enrollment and all saved submissions from this phone?')) return;
    await clearAll(); profile = null; show('enroll');
  });

  // ---------------- home ----------------
  async function renderHome() {
    if (!profile) return;
    const first = (profile.name || '').split(' ')[0];
    $('hello-name').textContent = first ? 'Hi, ' + first + '!' : 'Hi!';
    $('hello-employer').textContent = profile.employer ? 'Working at ' + profile.employer : '';
    $('set-id').textContent = profile.studentId;
    $('set-emails').textContent = profile.emails.join(', ') || '(none)';

    const subs = (await subAll()).sort((a, b) => (b.doc.periodEnd || '').localeCompare(a.doc.periodEnd || '') || b.doc.createdAt.localeCompare(a.doc.createdAt));
    const sent = subs.filter(s => s.sentAt);
    $('total-sent').textContent = fmtHours(sent.reduce((t, s) => t + WBL.totalHours(s.doc), 0));
    const unsent = subs.length - sent.length;
    $('unsent-notice').classList.toggle('hidden', !unsent);
    $('unsent-notice').textContent = unsent ? 'You have ' + unsent + ' submission' + (unsent > 1 ? 's' : '') + ' not sent yet. Tap Send below.' : '';

    const h = $('history');
    if (!subs.length) { h.innerHTML = '<p class="muted">Nothing yet. Add your first pay stub above.</p>'; return; }
    h.innerHTML = subs.map(s => {
      const d = s.doc;
      const kind = d.type === 'manual' ? 'Unpaid hours' : 'Pay stub';
      const status = s.sentAt ? '<span class="badge badge-ok">Sent</span>' : '<button class="btn-accent" data-send="' + esc(d.submissionId) + '">Send</button>';
      return '<div class="hist-item"><div><div class="when">' + esc(fmtDate(d.periodStart)) + ' – ' + esc(fmtDate(d.periodEnd)) + '</div>' +
        '<div class="small muted">' + kind + ' · ' + esc(d.employer) + '</div></div>' +
        '<div class="hist-right"><span class="hrs">' + fmtHours(WBL.totalHours(d)) + ' h</span>' + status +
        (s.sentAt ? '<button class="btn-secondary" data-send="' + esc(d.submissionId) + '">Resend</button>' : '') + '</div></div>';
    }).join('');
  }
  $('history').addEventListener('click', async e => {
    const b = e.target.closest('[data-send]');
    if (!b) return;
    const rec = (await subAll()).find(s => s.doc.submissionId === b.dataset.send);
    if (rec) openSend(rec);
  });

  // ---------------- entry ----------------
  function startEntry(type) {
    draft = { type, image: null };
    const manual = type === 'manual';
    $('entry-title').textContent = manual ? 'Log unpaid hours' : 'Pay stub';
    $('photo-block').classList.toggle('hidden', manual);
    $('ot-wrap').classList.toggle('hidden', manual);
    $('l-start').textContent = manual ? 'First day' : 'Pay period start';
    $('l-end').textContent = manual ? 'Last day' : 'Pay period end';
    $('l-reg').textContent = manual ? 'Total hours' : 'Regular hours';
    $('l-notes').innerHTML = manual ? 'What did you do? <span class="muted small">(required)</span>' : 'Notes <span class="muted small">(optional)</span>';
    $('entry-form').reset();
    $('f-employer').value = profile.lastEmployer || profile.employer || '';
    $('f-end').max = today(); $('f-start').max = today();
    $('photo-preview').classList.add('hidden');
    $('photo-btn').textContent = '📷 Take or choose photo';
    showError('entry-error', '');
    show('entry');
  }
  $('new-paystub').addEventListener('click', () => startEntry('paystub'));
  $('new-manual').addEventListener('click', () => startEntry('manual'));

  $('photo-btn').addEventListener('click', () => $('photo-input').click());
  $('photo-input').addEventListener('change', async e => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try { await openRedactor(file); } catch (err) { showError('entry-error', 'Could not open that photo. Try again. (' + err.message + ')'); }
  });

  $('entry-form').addEventListener('submit', async e => {
    e.preventDefault();
    const v = {
      employer: $('f-employer').value.trim(),
      periodStart: $('f-start').value,
      periodEnd: $('f-end').value,
      regularHours: parseFloat($('f-reg').value),
      overtimeHours: draft.type === 'manual' ? 0 : (parseFloat($('f-ot').value) || 0),
      notes: $('f-notes').value.trim()
    };
    const err = validate(v);
    if (err) return showError('entry-error', err);
    showError('entry-error', '');
    try {
      const doc = await WBL.createSubmission(Object.assign({
        studentId: profile.studentId, studentName: profile.name, type: draft.type, image: draft.image, entryMethod: 'typed'
      }, v), profile.key);
      const rec = { submissionId: doc.submissionId, doc, savedAt: new Date().toISOString(), sentAt: null };
      await subPut(rec);
      profile.lastEmployer = v.employer; await kvSet('profile', profile);
      openSend(rec);
    } catch (ex) { showError('entry-error', ex.message); }
  });

  function validate(v) {
    if (!v.employer) return 'Enter your employer.';
    if (!v.periodStart || !v.periodEnd) return 'Enter both dates.';
    if (v.periodEnd < v.periodStart) return 'The end date is before the start date.';
    if (v.periodEnd > today()) return 'The end date is in the future.';
    if (WBL.daysBetween(v.periodStart, v.periodEnd) > 31) return 'That period is longer than a month. Send each pay stub separately.';
    if (!(v.regularHours >= 0) || isNaN(v.regularHours)) return 'Enter your hours.';
    if (v.regularHours + v.overtimeHours <= 0) return 'Hours must be more than 0.';
    const days = WBL.daysBetween(v.periodStart, v.periodEnd) + 1;
    if (v.regularHours + v.overtimeHours > days * 16) return 'That is more hours than fit in those days. Check your numbers.';
    if (draft.type === 'paystub' && !draft.image) return 'Add a photo of your pay stub.';
    if (draft.type === 'manual' && !v.notes) return 'Describe what you did.';
    return '';
  }

  // ---------------- redaction ----------------
  // The student draws "keep" boxes. Everything outside them is painted black,
  // and the result is cropped to the boxes. The original photo is never stored.
  const R = { img: null, w: 0, h: 0, boxes: [], drawing: null, preview: false };
  const MAX_SIDE = 1600;

  async function loadImage(file) {
    if (window.createImageBitmap) {
      try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch (e) { /* fall back */ }
    }
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(file);
      const im = new Image();
      im.onload = () => { URL.revokeObjectURL(url); res(im); };
      im.onerror = () => { URL.revokeObjectURL(url); rej(new Error('unreadable image')); };
      im.src = url;
    });
  }

  async function openRedactor(file) {
    const img = await loadImage(file);
    const iw = img.width, ih = img.height;
    const scale = Math.min(1, MAX_SIDE / Math.max(iw, ih));
    R.img = img; R.w = Math.round(iw * scale); R.h = Math.round(ih * scale);
    R.boxes = []; R.drawing = null; R.preview = false;
    const c = $('redact-canvas'); c.width = R.w; c.height = R.h;
    $('redact-preview').textContent = 'Preview';
    showError('redact-error', '');
    show('redact');
    drawRedactor();
  }

  function drawRedactor() {
    const c = $('redact-canvas'), g = c.getContext('2d');
    g.drawImage(R.img, 0, 0, R.w, R.h);
    const boxes = R.drawing ? R.boxes.concat([R.drawing]) : R.boxes;
    // Dim (or, in preview, black out) everything outside the boxes.
    if (!R.mask || R.mask.width !== R.w || R.mask.height !== R.h) {
      R.mask = document.createElement('canvas'); R.mask.width = R.w; R.mask.height = R.h;
    }
    const m = R.mask.getContext('2d');
    m.globalCompositeOperation = 'copy';
    m.fillStyle = R.preview ? '#000' : 'rgba(0,0,0,.62)';
    m.fillRect(0, 0, R.w, R.h);
    m.globalCompositeOperation = 'source-over';
    boxes.forEach(b => { const n = norm(b); m.clearRect(n.x, n.y, n.w, n.h); });
    g.drawImage(R.mask, 0, 0);
    if (!R.preview) {
      g.lineWidth = Math.max(3, R.w / 250);
      g.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--brand-accent').trim() || '#e8a317';
      boxes.forEach(b => { const n = norm(b); g.strokeRect(n.x, n.y, n.w, n.h); });
    }
  }
  function norm(b) { return { x: Math.min(b.x1, b.x2), y: Math.min(b.y1, b.y2), w: Math.abs(b.x2 - b.x1), h: Math.abs(b.y2 - b.y1) }; }
  function canvasPoint(e) {
    const c = $('redact-canvas'), r = c.getBoundingClientRect();
    return { x: Math.max(0, Math.min(R.w, (e.clientX - r.left) * R.w / r.width)), y: Math.max(0, Math.min(R.h, (e.clientY - r.top) * R.h / r.height)) };
  }
  const canvas = $('redact-canvas');
  canvas.addEventListener('pointerdown', e => {
    if (R.preview) return;
    canvas.setPointerCapture(e.pointerId);
    const p = canvasPoint(e);
    R.drawing = { x1: p.x, y1: p.y, x2: p.x, y2: p.y };
    drawRedactor();
  });
  canvas.addEventListener('pointermove', e => {
    if (!R.drawing) return;
    const p = canvasPoint(e); R.drawing.x2 = p.x; R.drawing.y2 = p.y; drawRedactor();
  });
  function endDraw() {
    if (!R.drawing) return;
    const n = norm(R.drawing);
    if (n.w > R.w * 0.03 && n.h > R.h * 0.015) R.boxes.push(R.drawing);
    R.drawing = null; drawRedactor();
  }
  canvas.addEventListener('pointerup', endDraw);
  canvas.addEventListener('pointercancel', endDraw);

  $('redact-undo').addEventListener('click', () => { R.boxes.pop(); drawRedactor(); });
  $('redact-preview').addEventListener('click', () => {
    R.preview = !R.preview; $('redact-preview').textContent = R.preview ? 'Edit boxes' : 'Preview'; drawRedactor();
  });
  $('redact-cancel').addEventListener('click', () => { R.img = null; show('entry'); });
  $('redact-done').addEventListener('click', () => {
    if (!R.boxes.length) return showError('redact-error', 'Draw at least one box around the dates and hours first.');
    draft.image = renderRedacted();
    R.img = null; // drop the original photo
    const pv = $('photo-preview'); pv.querySelector('img').src = draft.image; pv.classList.remove('hidden');
    $('photo-btn').textContent = '📷 Retake photo';
    show('entry');
  });

  function renderRedacted() {
    const pad = Math.round(Math.max(R.w, R.h) * 0.01);
    const ns = R.boxes.map(norm);
    const x0 = Math.max(0, Math.min(...ns.map(n => n.x)) - pad), y0 = Math.max(0, Math.min(...ns.map(n => n.y)) - pad);
    const x1 = Math.min(R.w, Math.max(...ns.map(n => n.x + n.w)) + pad), y1 = Math.min(R.h, Math.max(...ns.map(n => n.y + n.h)) + pad);
    const out = document.createElement('canvas');
    out.width = Math.round(x1 - x0); out.height = Math.round(y1 - y0);
    const g = out.getContext('2d');
    g.fillStyle = '#000'; g.fillRect(0, 0, out.width, out.height);
    const sx = R.img.width / R.w, sy = R.img.height / R.h;
    ns.forEach(n => {
      g.drawImage(R.img, n.x * sx, n.y * sy, n.w * sx, n.h * sy, n.x - x0, n.y - y0, n.w, n.h);
    });
    return out.toDataURL('image/jpeg', 0.72);
  }

  // ---------------- send ----------------
  function selectedEmails() {
    return Array.from(document.querySelectorAll('#send-to input:checked')).map(i => i.value);
  }
  function openSend(rec) {
    current = rec;
    const d = rec.doc;
    $('send-summary').innerHTML = '<dl>' +
      '<dt>Type</dt><dd>' + (d.type === 'manual' ? 'Unpaid hours' : 'Pay stub') + '</dd>' +
      '<dt>Employer</dt><dd>' + esc(d.employer) + '</dd>' +
      '<dt>Dates</dt><dd>' + esc(fmtDate(d.periodStart)) + ' – ' + esc(fmtDate(d.periodEnd)) + '</dd>' +
      '<dt>Hours</dt><dd>' + fmtHours(d.regularHours) + (d.overtimeHours ? ' + ' + fmtHours(d.overtimeHours) + ' OT' : '') + ' = ' + fmtHours(WBL.totalHours(d)) + '</dd>' +
      (d.notes ? '<dt>Notes</dt><dd>' + esc(d.notes) + '</dd>' : '') +
      '</dl>' + (d.image ? '<img src="' + d.image + '" alt="Pay stub with private details blacked out">' : '');
    const fs = $('send-to');
    fs.querySelectorAll('label').forEach(l => l.remove());
    (profile.emails.length ? profile.emails : ['(no supervisor email on file)']).forEach((em, i) => {
      const l = document.createElement('label');
      l.innerHTML = '<input type="checkbox" value="' + esc(em) + '"' + (i === 0 ? ' checked' : '') + '> ' + esc(em);
      fs.appendChild(l);
    });
    $('share-btn').textContent = d.image ? '📤 Send with photo' : '📤 Send';
    show('send');
  }

  function submissionFile() {
    return new File([JSON.stringify(current.doc)], WBL.fileName(current.doc), { type: 'text/plain' });
  }

  $('copy-email').addEventListener('click', async () => {
    const em = selectedEmails().join(', ');
    if (!em) return toast('Pick at least one email above.');
    try { await navigator.clipboard.writeText(em); toast('Copied: ' + em); }
    catch (e) { prompt('Copy this email address:', em); }
  });

  $('share-btn').addEventListener('click', async () => {
    const em = selectedEmails();
    if (!em.length) return toast('Pick at least one email above.');
    const file = submissionFile();
    const d = current.doc;
    const text = 'ClockedIn hours for ' + (profile.name || profile.studentId) + ' (' + d.periodStart + ' to ' + d.periodEnd + ', ' + fmtHours(WBL.totalHours(d)) + ' h).\nSend to: ' + em.join(', ');
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'ClockedIn hours', text });
        await markSent();
      } catch (e) {
        if (e.name !== 'AbortError') toast('Could not open sharing. Try "Download file" below.');
      }
    } else {
      download(file);
      toast('File downloaded. Attach it to an email to ' + em.join(', '));
    }
  });

  function download(file) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file); a.download = file.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  }
  $('download-btn').addEventListener('click', () => { download(submissionFile()); toast('Downloaded. Attach it to an email to your supervisor.'); });

  $('mailto-btn').addEventListener('click', async () => {
    const em = selectedEmails();
    if (!em.length) return toast('Pick at least one email above.');
    // A text-only copy: the same submission without the photo, signed on its own.
    const base = Object.assign({}, current.doc);
    delete base.hmac;
    const textDoc = await WBL.createSubmission(Object.assign(base, { image: null, notes: (base.notes ? base.notes + ' ' : '') + '[sent as text, no photo]' }), profile.key);
    const code = WBL.bytesToB64url(new TextEncoder().encode(JSON.stringify(textDoc)));
    const d = current.doc;
    const body = 'ClockedIn hours for ' + (profile.name || profile.studentId) + '\n' +
      d.periodStart + ' to ' + d.periodEnd + ': ' + fmtHours(WBL.totalHours(d)) + ' hours at ' + d.employer + '\n\n' +
      'Do not edit below this line.\nWBLDATA:' + code + ':END';
    (window.__wblOpenUrl || (u => { location.href = u; }))('mailto:' + em.map(encodeURIComponent).join(',') + '?subject=' + encodeURIComponent('ClockedIn hours ' + d.periodStart + ' to ' + d.periodEnd) + '&body=' + encodeURIComponent(body));
  });

  async function markSent() {
    current.sentAt = new Date().toISOString();
    await subPut(current);
    toast('Marked as sent. Nice work!');
    await renderHome(); show('home');
  }
  $('send-done').addEventListener('click', markSent);

  // ---------------- start ----------------
  async function start() {
    profile = await kvGet('profile') || null;
    const m = location.hash.match(/#enroll=([A-Za-z0-9_-]+)/);
    if (m) {
      history.replaceState(null, '', location.pathname + location.search); // keep the key out of history/bookmarks
      try { if (await enroll(m[0])) toast('You\'re all set!'); }
      catch (e) { show('enroll'); return showError('enroll-error', e.message); }
    }
    if (!profile) return show('enroll');
    await renderHome(); show('home');
  }

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  start().catch(e => { document.body.insertAdjacentHTML('beforeend', '<p class="notice notice-bad">Something went wrong: ' + esc(e.message) + '</p>'); });
})();
