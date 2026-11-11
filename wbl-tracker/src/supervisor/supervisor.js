/* Supervisor app: all records live in a folder the supervisor chooses (this PC or
 * a school network drive). Uses the browser's File System Access API (Edge/Chrome).
 *
 * Folder layout:
 *   wbl-data.json         all students, submissions, settings
 *   images/<id>.jpg       redacted pay stub images
 *   Inbox/                save emailed attachments here
 *   Inbox/Imported/       files move here after import
 *   backups/              automatic daily snapshots of wbl-data.json
 */
(function () {
  'use strict';
  const BRAND = window.WBL_BRAND || {};
  const $ = id => document.getElementById(id);
  const DATA_FILE = 'wbl-data.json';

  // ---------------- state ----------------
  let root = null;          // FileSystemDirectoryHandle
  let isDemo = false;
  let data = null;
  let loadedStamp = 0;      // lastModified of wbl-data.json when we loaded it
  let sort = { key: 'name', asc: true };
  let editing = null;       // student being edited (copy) or null for new
  const imageCache = new Map();

  function emptyData() {
    return {
      format: 'wbl-supervisor-data', version: 1,
      settings: {
        schoolName: BRAND.schoolName || '', emails: [], appUrl: BRAND.studentAppUrl || '',
        defaultGoal: BRAND.defaultGoalHours || 250, weeklyMax: 60, staleDays: 21,
        termStart: '', termEnd: '', lastBackup: ''
      },
      students: [], submissions: [], log: []
    };
  }

  // ---------------- helpers ----------------
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  let toastTimer;
  function toast(msg, ms) {
    const t = $('toast'); t.textContent = msg; t.classList.remove('hidden');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.add('hidden'), ms || 3500);
  }
  function today() { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }
  function fmtDate(iso) { return iso ? WBL.parseDate(iso.slice(0, 10)).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : ''; }
  function fmtH(n) { return (Math.round((n || 0) * 10) / 10).toLocaleString(); }
  function fullName(s) { return (s.firstName + ' ' + s.lastName).trim(); }
  function goalOf(s) { return Number(s.goalHours) || Number(data.settings.defaultGoal) || 250; }
  function studentById(id) { return data.students.find(s => s.studentId === String(id)); }
  function log(msg) { data.log.push({ at: new Date().toISOString(), msg }); if (data.log.length > 2000) data.log.splice(0, data.log.length - 2000); }

  // ---------------- IndexedDB (remember the folder handle) ----------------
  function idb() {
    return new Promise((res, rej) => {
      const r = indexedDB.open('wbl-supervisor', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('kv');
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    });
  }
  async function idbGet(k) { const d = await idb(); return new Promise(res => { const q = d.transaction('kv').objectStore('kv').get(k); q.onsuccess = () => res(q.result); q.onerror = () => res(null); }); }
  async function idbSet(k, v) { const d = await idb(); return new Promise(res => { const t = d.transaction('kv', 'readwrite'); t.objectStore('kv').put(v, k); t.oncomplete = res; t.onerror = res; }); }

  // ---------------- file helpers ----------------
  async function getDir(parent, name, create) { return parent.getDirectoryHandle(name, { create: !!create }); }
  async function readText(dir, name) {
    try { const f = await (await dir.getFileHandle(name)).getFile(); return { text: await f.text(), stamp: f.lastModified }; }
    catch (e) { if (e.name === 'NotFoundError') return null; throw e; }
  }
  async function writeFile(dir, name, content) {
    const fh = await dir.getFileHandle(name, { create: true });
    const w = await fh.createWritable();
    await w.write(content); await w.close();
    return fh;
  }
  function dataUrlToBlob(u) {
    const [head, b64] = u.split(',');
    const mime = (head.match(/data:([^;]+)/) || [])[1] || 'image/jpeg';
    const bin = atob(b64); const a = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
    return new Blob([a], { type: mime });
  }

  // ---------------- open / save ----------------
  async function openFolder(handle, demo) {
    root = handle; isDemo = !!demo;
    await getDir(root, 'Inbox', true); await getDir(root, 'images', true); await getDir(root, 'backups', true);
    const r = await readText(root, DATA_FILE);
    if (r) {
      data = JSON.parse(r.text);
      if (data.format !== 'wbl-supervisor-data') throw new Error('That folder has a ' + DATA_FILE + ' that is not WBL data.');
      data.settings = Object.assign(emptyData().settings, data.settings);
      loadedStamp = r.stamp;
    } else {
      data = emptyData();
      if (isDemo) seedDemo();
      await save('Created data folder');
    }
    if (!isDemo) await idbSet('folder', root);
    $('view-setup').classList.add('hidden');
    $('tabs').classList.remove('hidden');
    $('folder-status').classList.remove('hidden');
    $('folder-status').innerHTML = (isDemo ? '<b>Practice data</b> (stored in this browser only)' : 'Data folder: <b>' + esc(root.name) + '</b>');
    renderAll();
    showTab('students');
  }

  let saving = Promise.resolve();
  function save(why) {
    saving = saving.then(() => doSave(why)).catch(e => { console.error(e); toast('Could not save: ' + e.message, 8000); });
    return saving;
  }
  async function doSave(why) {
    // If another supervisor changed the file since we loaded it, stop and reload rather than overwrite their work.
    const cur = await readText(root, DATA_FILE);
    if (cur && loadedStamp && cur.stamp > loadedStamp + 1) {
      const theirs = JSON.parse(cur.text);
      if (JSON.stringify(theirs) !== JSON.stringify(data)) {
        alert('Someone else changed the WBL records while you had them open. The latest records will be reloaded. Please redo your last change.');
        data = theirs; loadedStamp = cur.stamp; renderAll(); return;
      }
    }
    if (why) log(why);
    data.savedAt = new Date().toISOString();
    const text = JSON.stringify(data, null, 1);
    await writeFile(root, DATA_FILE, text);
    const after = await readText(root, DATA_FILE); loadedStamp = after ? after.stamp : Date.now();
    // Daily snapshot, keep the newest 30.
    const bdir = await getDir(root, 'backups', true);
    const snap = 'wbl-data-' + today() + '.json';
    await writeFile(bdir, snap, text);
    const names = []; for await (const [n] of bdir.entries()) if (/^wbl-data-\d{4}-\d{2}-\d{2}\.json$/.test(n)) names.push(n);
    names.sort().slice(0, Math.max(0, names.length - 30)).forEach(n => bdir.removeEntry(n).catch(() => {}));
  }

  // ---------------- setup screen ----------------
  async function initSetup() {
    if (!window.showDirectoryPicker) {
      $('unsupported').classList.remove('hidden');
      $('pick-folder').disabled = true;
    }
    const saved = await idbGet('folder').catch(() => null);
    if (saved && saved.kind === 'directory') {
      $('reconnect-box').classList.remove('hidden');
      $('reconnect-name').textContent = saved.name;
      $('reconnect-btn').onclick = async () => {
        try {
          const p = await saved.requestPermission({ mode: 'readwrite' });
          if (p !== 'granted') return toast('Permission is needed to open the folder.');
          await openFolder(saved);
        } catch (e) { toast('Could not open that folder: ' + e.message, 6000); }
      };
    }
  }
  async function pickFolder() {
    try {
      const h = await window.showDirectoryPicker({ id: 'wbl-data', mode: 'readwrite' });
      await openFolder(h);
    } catch (e) { if (e.name !== 'AbortError') toast('Could not open that folder: ' + e.message, 6000); }
  }
  $('pick-folder').addEventListener('click', pickFolder);
  $('switch-folder').addEventListener('click', pickFolder);
  $('demo-btn').addEventListener('click', async () => {
    if (!navigator.storage || !navigator.storage.getDirectory) return toast('Practice mode needs Edge or Chrome.');
    const opfs = await navigator.storage.getDirectory();
    await openFolder(await opfs.getDirectoryHandle('wbl-practice', { create: true }), true);
  });

  // ---------------- tabs ----------------
  function showTab(name) {
    document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    $('view-' + name).classList.remove('hidden');
    if (name === 'review') renderReview();
    if (name === 'settings') renderSettings();
    if (name === 'students') renderStudents();
  }
  $('tabs').addEventListener('click', e => { const b = e.target.closest('button[data-tab]'); if (b) showTab(b.dataset.tab); });

  // ---------------- calculations ----------------
  function summarize(s) {
    const subs = data.submissions.filter(x => x.studentId === s.studentId);
    const approved = subs.filter(x => x.status === 'approved');
    const pending = subs.filter(x => x.status === 'review');
    const hours = approved.reduce((t, x) => t + x.hours, 0);
    const pendingHours = pending.reduce((t, x) => t + x.hours, 0);
    const last = subs.filter(x => x.status !== 'rejected').map(x => x.periodEnd).sort().pop() || '';
    const goal = goalOf(s);
    const pct = Math.min(100, hours / goal * 100);
    let status = 'ok', label = 'On track';
    const st = data.settings;
    if (hours >= goal) { status = 'met'; label = 'Goal met'; }
    else if (!subs.length) { status = 'none'; label = 'No submissions'; }
    else {
      if (st.termStart && st.termEnd && st.termEnd > st.termStart) {
        const span = WBL.daysBetween(st.termStart, st.termEnd);
        const startFrom = s.startDate && s.startDate > st.termStart ? s.startDate : st.termStart;
        const elapsed = Math.max(0, Math.min(span, WBL.daysBetween(startFrom, today())));
        const totalSpan = Math.max(1, WBL.daysBetween(startFrom, st.termEnd));
        const expected = goal * Math.min(1, elapsed / totalSpan);
        if (hours + pendingHours < expected * 0.85) { status = 'behind'; label = 'Behind (' + fmtH(expected) + ' expected)'; }
      }
      if (last && WBL.daysBetween(last, today()) > (Number(st.staleDays) || 21)) {
        status = 'behind'; label = status === 'behind' && label.startsWith('Behind') ? label + ', no recent hours' : 'No recent hours';
      }
    }
    return { subs, hours, pendingHours, last, goal, pct, status, label };
  }

  // ---------------- students view ----------------
  function renderAll() { renderStudents(); renderReviewCount(); renderBackupWarning(); }

  function renderBackupWarning() {
    const lb = data.settings.lastBackup;
    const w = $('backup-warning');
    const due = !isDemo && data.students.length && (!lb || WBL.daysBetween(lb.slice(0, 10), today()) > 7);
    w.classList.toggle('hidden', !due);
    if (due) w.innerHTML = (lb ? 'Last backup was ' + esc(fmtDate(lb)) + '.' : 'These records have never been backed up.') + ' <a href="#" id="backup-link">Back up now</a>';
    const l = $('backup-link'); if (l) l.onclick = e => { e.preventDefault(); doBackup(); };
  }

  function renderStudents() {
    if (!data) return;
    const q = $('search').value.trim().toLowerCase();
    const prog = $('filter-program').value;
    const fst = $('filter-status').value;
    const programs = [...new Set(data.students.map(s => s.program).filter(Boolean))].sort();
    const sel = $('filter-program');
    sel.innerHTML = '<option value="">All programs</option>' + programs.map(p => '<option' + (p === prog ? ' selected' : '') + '>' + esc(p) + '</option>').join('');
    $('program-list').innerHTML = programs.map(p => '<option value="' + esc(p) + '">').join('');

    const rows = data.students.filter(s => s.active !== false).map(s => ({ s, m: summarize(s) }));
    // stats
    const total = rows.reduce((t, r) => t + r.m.hours, 0);
    const met = rows.filter(r => r.m.status === 'met').length;
    const behind = rows.filter(r => r.m.status === 'behind').length;
    const review = data.submissions.filter(x => x.status === 'review').length;
    $('stats').innerHTML =
      '<div class="stat"><b>' + rows.length + '</b><span>students</span></div>' +
      '<div class="stat"><b>' + fmtH(total) + '</b><span>approved hours (all students)</span></div>' +
      '<div class="stat"><b>' + met + '</b><span>met their goal</span></div>' +
      '<div class="stat"><b>' + behind + '</b><span>behind / no recent hours</span></div>' +
      '<div class="stat"><b>' + review + '</b><span>waiting for review</span></div>';

    let list = rows.filter(({ s, m }) => {
      if (prog && s.program !== prog) return false;
      if (fst && m.status !== fst) return false;
      if (q && ![fullName(s), s.studentId, s.employer, s.program].join(' ').toLowerCase().includes(q)) return false;
      return true;
    });
    const key = sort.key, dir = sort.asc ? 1 : -1;
    const val = ({ s, m }) => ({ name: (s.lastName + ' ' + s.firstName).toLowerCase(), program: s.program || '', employer: s.employer || '', approved: m.hours, pct: m.pct, last: m.last, status: m.status }[key]);
    list.sort((a, b) => { const x = val(a), y = val(b); return (x < y ? -1 : x > y ? 1 : 0) * dir; });
    document.querySelectorAll('#students-table th').forEach(th => { th.classList.toggle('sorted', th.dataset.sort === key); th.classList.toggle('asc', th.dataset.sort === key && sort.asc); });

    const badge = { ok: 'badge-ok', met: 'badge-ok', none: 'badge-neutral', behind: 'badge-warn' };
    $('students-table').querySelector('tbody').innerHTML = list.map(({ s, m }) =>
      '<tr data-id="' + esc(s.studentId) + '">' +
      '<td><div class="name">' + esc(s.lastName + ', ' + s.firstName) + '</div><div class="sub">ID ' + esc(s.studentId) + '</div></td>' +
      '<td>' + esc(s.program) + '</td>' +
      '<td>' + esc(s.employer) + '</td>' +
      '<td class="num"><b>' + fmtH(m.hours) + '</b> / ' + fmtH(m.goal) + (m.pendingHours ? '<div class="sub">+' + fmtH(m.pendingHours) + ' in review</div>' : '') + '</td>' +
      '<td><div class="progress' + (m.status === 'met' ? ' done' : '') + '"><span style="width:' + m.pct.toFixed(1) + '%"></span></div><span class="pct">' + Math.floor(m.pct) + '%</span></td>' +
      '<td>' + esc(fmtDate(m.last)) + '</td>' +
      '<td><span class="badge ' + badge[m.status] + '">' + esc(m.label) + '</span></td></tr>').join('');
    $('students-empty').classList.toggle('hidden', data.students.length > 0);
  }
  $('search').addEventListener('input', renderStudents);
  $('filter-program').addEventListener('change', renderStudents);
  $('filter-status').addEventListener('change', renderStudents);
  document.querySelectorAll('#students-table th[data-sort]').forEach(th => th.addEventListener('click', () => {
    sort = { key: th.dataset.sort, asc: sort.key === th.dataset.sort ? !sort.asc : true }; renderStudents();
  }));
  $('students-table').querySelector('tbody').addEventListener('click', e => {
    const tr = e.target.closest('tr[data-id]'); if (tr) openStudent(studentById(tr.dataset.id));
  });
  $('add-student').addEventListener('click', () => openStudent(null));

  // ---------------- student dialog ----------------
  const F = { first: 'firstName', last: 'lastName', id: 'studentId', program: 'program', employer: 'employer', job: 'jobTitle', ws: 'workSupervisor', wsc: 'workSupervisorContact', start: 'startDate', goal: 'goalHours', notes: 'notes' };
  function openStudent(s) {
    editing = s ? s : null;
    const v = s || { goalHours: '' };
    Object.entries(F).forEach(([k, f]) => { $('sd-' + k).value = v[f] == null ? '' : v[f]; });
    $('sd-goal').placeholder = data.settings.defaultGoal;
    $('sd-id').readOnly = !!s;
    $('sd-title').textContent = s ? fullName(s) : 'Add student';
    $('sd-delete').classList.toggle('hidden', !s);
    $('sd-enroll').classList.toggle('hidden', !s);
    if (s) renderEnrollQr(s);
    renderStudentHistory(s);
    $('student-dialog').showModal();
  }
  document.querySelectorAll('.close-dlg').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));

  $('student-form').addEventListener('submit', async e => {
    e.preventDefault();
    const v = {};
    Object.entries(F).forEach(([k, f]) => { v[f] = $('sd-' + k).value.trim(); });
    v.goalHours = v.goalHours ? Number(v.goalHours) : '';
    if (!v.firstName || !v.lastName || !v.studentId) return toast('First name, last name and student ID are required.');
    if (editing) {
      Object.assign(editing, v);
      await save('Edited student ' + v.studentId);
    } else {
      if (studentById(v.studentId)) return toast('A student with ID ' + v.studentId + ' already exists.');
      const s = Object.assign({ key: WBL.newKey(), active: true, createdAt: new Date().toISOString() }, v);
      data.students.push(s);
      await save('Added student ' + v.studentId);
      editing = s;
      $('sd-id').readOnly = true; $('sd-delete').classList.remove('hidden'); $('sd-enroll').classList.remove('hidden');
      $('sd-title').textContent = fullName(s);
      renderEnrollQr(s);
      toast('Student added. Print or show the QR code so they can set up their phone.');
      renderAll();
      return; // keep dialog open to show the QR
    }
    $('student-dialog').close();
    renderAll();
  });

  $('sd-delete').addEventListener('click', async () => {
    if (!editing) return;
    const n = data.submissions.filter(x => x.studentId === editing.studentId).length;
    if (!confirm('Delete ' + fullName(editing) + (n ? ' and their ' + n + ' submission(s)' : '') + '? This cannot be undone.')) return;
    data.students = data.students.filter(s => s !== editing);
    data.submissions = data.submissions.filter(x => x.studentId !== editing.studentId);
    await save('Deleted student ' + editing.studentId);
    $('student-dialog').close(); renderAll();
  });

  function enrollFor(s) {
    return { studentId: s.studentId, name: fullName(s), school: data.settings.schoolName, emails: data.settings.emails, key: s.key, employer: s.employer };
  }
  function qrSvg(text, cell) {
    const q = qrcode(0, 'M'); q.addData(text); q.make();
    return q.createSvgTag({ cellSize: cell || 4, margin: 2, scalable: true });
  }
  function renderEnrollQr(s) {
    const box = $('sd-qr');
    if (!data.settings.appUrl) { box.innerHTML = '<p class="notice notice-warn small">Set the <b>Student app web address</b> in Settings to make QR codes.</p>'; return; }
    if (!data.settings.emails.length) { box.innerHTML = '<p class="notice notice-warn small">Add your <b>supervisor email</b> in Settings first, so students know where to send.</p>'; return; }
    box.innerHTML = qrSvg(WBL.enrollmentUrl(data.settings.appUrl, enrollFor(s)));
  }
  $('sd-copy').addEventListener('click', async () => {
    if (!editing) return;
    try { await navigator.clipboard.writeText(WBL.enrollmentCode(enrollFor(editing))); toast('Enrollment code copied. Only share it with this student.'); }
    catch (e) { prompt('Enrollment code:', WBL.enrollmentCode(enrollFor(editing))); }
  });
  $('sd-rekey').addEventListener('click', async () => {
    if (!editing) return;
    if (!confirm('Make a new setup code for ' + fullName(editing) + '? Their current phone will no longer be able to send hours until they scan the new code.')) return;
    editing.key = WBL.newKey();
    await save('New enrollment key for ' + editing.studentId);
    renderEnrollQr(editing); toast('New code created. Have the student scan it.');
  });
  $('sd-print').addEventListener('click', () => { if (editing) printCards([editing]); });
  $('print-qr-all').addEventListener('click', () => {
    const prog = $('filter-program').value;
    const list = data.students.filter(s => s.active !== false && (!prog || s.program === prog)).sort((a, b) => (a.lastName + a.firstName).localeCompare(b.lastName + b.firstName));
    if (!list.length) return toast('No students to print.');
    printCards(list);
  });

  function printCards(list) {
    if (!data.settings.appUrl || !data.settings.emails.length) { showTab('settings'); return toast('Fill in the student app address and your email in Settings first.', 5000); }
    const logo = document.querySelector('.appbar .logo').src;
    $('print-area').innerHTML = '<div class="print-cards">' + list.map(s =>
      '<div class="print-card"><img class="logo" src="' + esc(logo) + '" alt=""><h3>' + esc(fullName(s)) + '</h3>' +
      '<p>' + esc(BRAND.appName || 'ClockedIn') + ' app: phone setup</p><div class="qr">' + qrSvg(WBL.enrollmentUrl(data.settings.appUrl, enrollFor(s)), 3) + '</div>' +
      '<p><b>1.</b> Open your phone camera and point it at this code.<br><b>2.</b> Tap the link, then choose <i>Add to Home Screen</i>.</p>' +
      '<p style="font-size:9pt">Keep this card private. Student ID ' + esc(s.studentId) + '</p></div>').join('') + '</div>';
    setTimeout(() => window.print(), 50);
  }

  function renderStudentHistory(s) {
    const h = $('sd-history');
    if (!s) { h.innerHTML = ''; return; }
    const m = summarize(s);
    const subs = m.subs.slice().sort((a, b) => b.periodEnd.localeCompare(a.periodEnd));
    h.innerHTML = '<h3 style="margin-top:18px">Hours: ' + fmtH(m.hours) + ' of ' + fmtH(m.goal) + ' approved' + (m.pendingHours ? ' · ' + fmtH(m.pendingHours) + ' in review' : '') + '</h3>' +
      (subs.length ? '<div class="table-wrap"><table class="grid"><thead><tr><th>Dates</th><th>Type</th><th>Employer</th><th class="num">Hours</th><th>Status</th><th>Photo</th></tr></thead><tbody>' +
        subs.map(x => '<tr><td>' + esc(fmtDate(x.periodStart)) + ' – ' + esc(fmtDate(x.periodEnd)) + '</td><td>' + (x.type === 'manual' ? 'Unpaid' : 'Pay stub') + '</td><td>' + esc(x.employer) + '</td>' +
          '<td class="num">' + fmtH(x.hours) + '</td><td>' + statusBadge(x) + '</td><td>' + (x.hasImage ? '<button type="button" class="btn-secondary" data-img="' + esc(x.submissionId) + '">View</button>' : '') + '</td></tr>').join('') +
        '</tbody></table></div>' : '<p class="muted">No submissions yet.</p>');
  }
  function statusBadge(x) {
    return { approved: '<span class="badge badge-ok">Approved</span>', review: '<span class="badge badge-warn">In review</span>', rejected: '<span class="badge badge-bad">Rejected</span>' }[x.status] || '';
  }
  $('sd-history').addEventListener('click', e => { const b = e.target.closest('[data-img]'); if (b) viewImage(b.dataset.img); });

  async function imageUrl(id) {
    if (imageCache.has(id)) return imageCache.get(id);
    try {
      const f = await (await (await getDir(root, 'images')).getFileHandle(id + '.jpg')).getFile();
      const u = URL.createObjectURL(f); imageCache.set(id, u); return u;
    } catch (e) { return null; }
  }
  async function viewImage(id) {
    const u = await imageUrl(id);
    if (!u) return toast('Image file not found.');
    const d = $('image-dialog'); d.querySelector('img').src = u; d.showModal();
  }

  // ---------------- importing submissions ----------------
  /** Pull every submission out of a piece of text (a .txt attachment, pasted email, or .eml file). */
  function extractDocs(text) {
    const docs = [], errors = [];
    const t = String(text).trim();
    const tryParse = s => { try { docs.push(WBL.parseSubmission(s)); return true; } catch (e) { errors.push(e.message); return false; } };
    if (t.startsWith('{')) { tryParse(t); return { docs, errors }; }
    // Text-only emails: WBLDATA:<base64url json>:END (email clients may wrap lines)
    const re = /WBLDATA:([A-Za-z0-9_\-\s=]+?):END/g; let m;
    while ((m = re.exec(t))) {
      try { tryParse(new TextDecoder().decode(WBL.b64urlToBytes(m[1].replace(/[\s=]/g, '')))); }
      catch (e) { errors.push('Pasted code is incomplete. Ask the student to resend.'); }
    }
    // Saved .eml files: look inside base64 MIME parts for an attached submission.
    if (/Content-Transfer-Encoding:\s*base64/i.test(t)) {
      const parts = t.split(/\r?\n--[^\r\n]+/);
      parts.forEach(p => {
        if (!/Content-Transfer-Encoding:\s*base64/i.test(p)) return;
        const body = p.split(/\r?\n\r?\n/).slice(1).join('').replace(/\s+/g, '');
        try {
          const dec = new TextDecoder().decode(Uint8Array.from(atob(body), c => c.charCodeAt(0))).trim();
          if (dec.startsWith('{') && dec.includes('wbl-submission')) tryParse(dec);
          else if (dec.includes('WBLDATA:')) { const r = extractDocs(dec); docs.push(...r.docs); }
        } catch (e) { /* not ours */ }
      });
    }
    if (!docs.length && !errors.length) errors.push('No WBL submission found in this file.');
    return { docs, errors };
  }

  async function checkDoc(doc) {
    const flags = [];
    const s = studentById(doc.studentId);
    const hours = WBL.totalHours(doc);
    if (!s) flags.push('Unknown student ID "' + doc.studentId + '" (add the student, then re-import).');
    else if (!(await WBL.verifySubmission(doc, s.key))) flags.push('Security check failed: the file may have been edited, or it came from an old phone setup.');
    if (doc.periodEnd > today()) flags.push('Pay period ends in the future.');
    if (doc.periodEnd < doc.periodStart) flags.push('End date is before start date.');
    const days = WBL.daysBetween(doc.periodStart, doc.periodEnd) + 1;
    const perWeek = days >= 7 ? hours / (days / 7) : hours;
    if (perWeek > (Number(data.settings.weeklyMax) || 60)) flags.push(fmtH(perWeek) + ' hours per week is above your ' + data.settings.weeklyMax + '-hour limit.');
    if (hours <= 0) flags.push('No hours entered.');
    if (doc.type === 'paystub' && !doc.image) flags.push('No pay stub photo was included.');
    if (doc.type === 'manual') flags.push('Unpaid hours: confirm with the workplace supervisor.');
    if (doc.entryMethod === 'ocr' && doc.ocrConfidence != null && doc.ocrConfidence < 0.75) flags.push('The app had trouble reading this stub.');
    if (s) {
      const overlap = data.submissions.find(x => x.studentId === s.studentId && x.status !== 'rejected' && x.type === doc.type &&
        x.periodStart <= doc.periodEnd && doc.periodStart <= x.periodEnd);
      if (overlap) flags.push('Overlaps another submission (' + fmtDate(overlap.periodStart) + ' – ' + fmtDate(overlap.periodEnd) + ', ' + fmtH(overlap.hours) + ' h).');
    }
    return flags;
  }

  async function importDocs(docs, source) {
    const out = [];
    for (const doc of docs) {
      if (data.submissions.some(x => x.submissionId === doc.submissionId)) { out.push({ doc, result: 'duplicate' }); continue; }
      const flags = await checkDoc(doc);
      let hasImage = false;
      if (doc.image && /^data:image\//.test(doc.image)) {
        try { await writeFile(await getDir(root, 'images', true), doc.submissionId + '.jpg', dataUrlToBlob(doc.image)); hasImage = true; }
        catch (e) { flags.push('Could not save the photo: ' + e.message); }
      }
      const rec = {
        submissionId: doc.submissionId, studentId: String(doc.studentId), studentName: doc.studentName || '', type: doc.type,
        employer: doc.employer, periodStart: doc.periodStart, periodEnd: doc.periodEnd,
        regularHours: doc.regularHours, overtimeHours: doc.overtimeHours, hours: WBL.totalHours(doc),
        notes: doc.notes, entryMethod: doc.entryMethod, ocrConfidence: doc.ocrConfidence, createdAt: doc.createdAt,
        hasImage, flags, status: flags.length ? 'review' : 'approved', importedAt: new Date().toISOString(), source: source || ''
      };
      data.submissions.push(rec);
      out.push({ doc, rec, result: rec.status });
    }
    return out;
  }

  async function importTexts(items) {
    // items: [{ name, text }]
    const report = [];
    const okNames = [];
    for (const it of items) {
      const { docs, errors } = extractDocs(it.text);
      const res = await importDocs(docs, it.name);
      res.forEach(r => report.push({ name: it.name, r }));
      errors.forEach(err => report.push({ name: it.name, error: err }));
      if (docs.length && !errors.length) okNames.push(it.name);
    }
    const added = report.filter(x => x.r && x.r.result !== 'duplicate').length;
    if (added) await save('Imported ' + added + ' submission(s)');
    showImportReport(report);
    renderAll();
    return okNames;
  }

  function showImportReport(report) {
    const el = $('import-results');
    if (!report.length) { el.innerHTML = '<p class="notice notice-ok">Nothing new to import.</p>'; return; }
    const c = { approved: 0, review: 0, duplicate: 0, error: 0 };
    report.forEach(x => { if (x.error) c.error++; else c[x.r.result]++; });
    el.innerHTML = '<div class="notice ' + (c.error || c.review ? 'notice-warn' : 'notice-ok') + '" style="margin-top:12px">' +
      '<b>' + c.approved + '</b> approved automatically · <b>' + c.review + '</b> need review · <b>' + c.duplicate + '</b> already imported' + (c.error ? ' · <b>' + c.error + '</b> could not be read' : '') + '</div>' +
      '<ul class="result-list">' + report.map(x => {
        if (x.error) return '<li><span class="badge badge-bad">Error</span> ' + esc(x.name) + ': ' + esc(x.error) + '</li>';
        const d = x.r.doc, s = studentById(d.studentId);
        const who = s ? fullName(s) : (d.studentName || 'ID ' + d.studentId);
        const b = { approved: '<span class="badge badge-ok">Approved</span>', review: '<span class="badge badge-warn">Review</span>', duplicate: '<span class="badge badge-neutral">Duplicate</span>' }[x.r.result];
        return '<li>' + b + ' ' + esc(who) + ': ' + esc(d.periodStart) + ' to ' + esc(d.periodEnd) + ', ' + fmtH(WBL.totalHours(d)) + ' h' +
          (x.r.rec && x.r.rec.flags.length ? '<div class="small muted">' + x.r.rec.flags.map(esc).join(' ') + '</div>' : '') + '</li>';
      }).join('') + '</ul>';
  }

  $('check-inbox').addEventListener('click', async () => {
    const inbox = await getDir(root, 'Inbox', true);
    const files = [];
    for await (const [name, h] of inbox.entries()) {
      if (h.kind === 'file' && /\.(txt|wbl|json|eml)$/i.test(name)) files.push({ name, h });
    }
    if (!files.length) { $('import-results').innerHTML = '<p class="notice notice-warn" style="margin-top:12px">The Inbox folder is empty. Save the students\' email attachments into <code>' + esc(root.name) + '\\Inbox</code> first.</p>'; return; }
    const items = [];
    for (const f of files) items.push({ name: f.name, text: await (await f.h.getFile()).text() });
    const ok = await importTexts(items);
    // Move fully imported files to Inbox/Imported
    const done = await getDir(inbox, 'Imported', true);
    for (const f of files) {
      if (!ok.includes(f.name)) continue;
      try {
        const blob = await f.h.getFile();
        let target = f.name;
        try { await done.getFileHandle(target); target = target.replace(/(\.[^.]+)$/, '_' + Date.now() + '$1'); } catch (e) { /* not there yet */ }
        await writeFile(done, target, blob);
        await inbox.removeEntry(f.name);
      } catch (e) { console.warn('Could not move', f.name, e); }
    }
  });

  async function importFileList(fileList) {
    const items = [];
    for (const f of fileList) items.push({ name: f.name, text: await f.text() });
    await importTexts(items);
  }
  $('import-files').addEventListener('change', async e => { await importFileList(e.target.files); e.target.value = ''; });
  const dz = $('drop-zone');
  dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('over'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('over'));
  dz.addEventListener('drop', async e => { e.preventDefault(); dz.classList.remove('over'); await importFileList(e.dataTransfer.files); });
  $('paste-import').addEventListener('click', async () => {
    const t = $('paste-box').value; if (!t.trim()) return;
    await importTexts([{ name: 'Pasted text', text: t }]); $('paste-box').value = '';
  });

  // ---------------- roster CSV ----------------
  function parseCsv(text) {
    const rows = []; let row = [], cell = '', q = false;
    text = text.replace(/^\uFEFF/, '');
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
      else if (ch === '"') q = true;
      else if (ch === ',') { row.push(cell); cell = ''; }
      else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
      else cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows.filter(r => r.some(c => c.trim()));
  }
  const ROSTER_COLS = { studentid: 'studentId', id: 'studentId', firstname: 'firstName', first: 'firstName', lastname: 'lastName', last: 'lastName', program: 'program', employer: 'employer', jobtitle: 'jobTitle', worksupervisor: 'workSupervisor', worksupervisorcontact: 'workSupervisorContact', startdate: 'startDate', goalhours: 'goalHours', goal: 'goalHours' };
  function normDate(v) {
    v = (v || '').trim(); if (!v) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
    const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
    if (m) { const y = m[3].length === 2 ? '20' + m[3] : m[3]; return y + '-' + m[1].padStart(2, '0') + '-' + m[2].padStart(2, '0'); }
    return '';
  }
  $('roster-file').addEventListener('change', async e => {
    const f = e.target.files[0]; e.target.value = '';
    if (!f) return;
    const rows = parseCsv(await f.text());
    if (rows.length < 2) return ($('roster-results').innerHTML = '<p class="notice notice-bad">That file has no student rows.</p>');
    const head = rows[0].map(h => ROSTER_COLS[h.toLowerCase().replace(/[^a-z]/g, '')] || null);
    if (!head.includes('studentId') || !head.includes('firstName') || !head.includes('lastName')) {
      return ($('roster-results').innerHTML = '<p class="notice notice-bad">The first row must have column names, including StudentID, FirstName and LastName.</p>');
    }
    let added = 0, updated = 0; const problems = [];
    rows.slice(1).forEach((r, i) => {
      const v = {}; head.forEach((k, j) => { if (k) v[k] = (r[j] || '').trim(); });
      if (!v.studentId || !v.firstName || !v.lastName) { problems.push('Row ' + (i + 2) + ': missing ID or name'); return; }
      if (v.startDate !== undefined) v.startDate = normDate(v.startDate);
      if (v.goalHours !== undefined) v.goalHours = v.goalHours ? Number(v.goalHours) || '' : '';
      Object.keys(v).forEach(k => { if (v[k] === '' && k !== 'goalHours') delete v[k]; });
      const ex = studentById(v.studentId);
      if (ex) { Object.assign(ex, v); updated++; }
      else { data.students.push(Object.assign({ key: WBL.newKey(), active: true, createdAt: new Date().toISOString(), program: '', employer: '', goalHours: '' }, v)); added++; }
    });
    await save('Roster import: ' + added + ' added, ' + updated + ' updated');
    $('roster-results').innerHTML = '<p class="notice notice-ok">' + added + ' students added, ' + updated + ' updated.</p>' +
      (problems.length ? '<p class="notice notice-warn">' + problems.map(esc).join('<br>') + '</p>' : '');
    renderAll();
  });
  $('roster-template').addEventListener('click', () => downloadCsv('WBL class list template.csv', [['StudentID', 'FirstName', 'LastName', 'Program', 'Employer', 'JobTitle', 'WorkSupervisor', 'WorkSupervisorContact', 'StartDate', 'GoalHours']]));

  // ---------------- review ----------------
  function renderReviewCount() {
    const n = data.submissions.filter(x => x.status === 'review').length;
    $('review-count').textContent = n; $('review-count').classList.toggle('hidden', !n);
  }
  async function renderReview() {
    const list = data.submissions.filter(x => x.status === 'review').sort((a, b) => a.importedAt.localeCompare(b.importedAt));
    const el = $('review-list');
    if (!list.length) { el.innerHTML = '<div class="card"><p class="muted" style="margin:0">Nothing to review. 🎉</p></div>'; return; }
    el.innerHTML = list.map(x => {
      const s = studentById(x.studentId);
      return '<div class="card review-card" data-id="' + esc(x.submissionId) + '">' +
        '<div class="img-box">' + (x.hasImage ? '<img data-img="' + esc(x.submissionId) + '" alt="Redacted pay stub">' : '<span class="none">No photo</span>') + '</div>' +
        '<div><h3>' + esc(s ? fullName(s) : (x.studentName || 'Unknown student')) + ' <span class="muted small">ID ' + esc(x.studentId) + '</span></h3>' +
        '<dl class="kv"><dt>Type</dt><dd>' + (x.type === 'manual' ? 'Unpaid hours' : 'Pay stub') + '</dd>' +
        '<dt>Employer</dt><dd>' + esc(x.employer) + '</dd>' +
        '<dt>Dates</dt><dd>' + esc(fmtDate(x.periodStart)) + ' – ' + esc(fmtDate(x.periodEnd)) + '</dd>' +
        '<dt>Hours</dt><dd>' + fmtH(x.regularHours) + (x.overtimeHours ? ' + ' + fmtH(x.overtimeHours) + ' OT' : '') + ' = ' + fmtH(x.hours) + '</dd>' +
        (x.notes ? '<dt>Notes</dt><dd>' + esc(x.notes) + '</dd>' : '') + '</dl>' +
        '<ul class="flags">' + x.flags.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' +
        '<div class="review-actions">' +
        (s ? '<button class="btn-primary" data-act="approve">Approve</button>' : '') +
        '<button class="btn-danger" data-act="reject">Reject</button>' +
        (s ? '<span class="adj"><div><label>Regular</label><input type="number" step="0.01" min="0" class="adj-reg" value="' + x.regularHours + '"></div>' +
          '<div><label>OT</label><input type="number" step="0.01" min="0" class="adj-ot" value="' + x.overtimeHours + '"></div>' +
          '<button class="btn-secondary" data-act="adjust">Approve with these hours</button></span>' : '') +
        '</div></div></div>';
    }).join('');
    el.querySelectorAll('img[data-img]').forEach(async img => { const u = await imageUrl(img.dataset.img); if (u) img.src = u; });
  }
  $('review-list').addEventListener('click', async e => {
    const img = e.target.closest('img[data-img]'); if (img) return viewImage(img.dataset.img);
    const b = e.target.closest('button[data-act]'); if (!b) return;
    const card = b.closest('[data-id]'); const x = data.submissions.find(s => s.submissionId === card.dataset.id);
    if (!x) return;
    const act = b.dataset.act;
    if (act === 'approve') { x.status = 'approved'; }
    else if (act === 'reject') {
      const why = prompt('Reason for rejecting (optional):'); if (why === null) return;
      x.status = 'rejected'; x.rejectReason = why;
    } else if (act === 'adjust') {
      const reg = parseFloat(card.querySelector('.adj-reg').value) || 0, ot = parseFloat(card.querySelector('.adj-ot').value) || 0;
      x.original = x.original || { regularHours: x.regularHours, overtimeHours: x.overtimeHours };
      x.regularHours = reg; x.overtimeHours = ot; x.hours = WBL.round2(reg + ot); x.status = 'approved'; x.adjusted = true;
    }
    x.reviewedAt = new Date().toISOString();
    await save((act === 'reject' ? 'Rejected ' : 'Approved ') + x.submissionId);
    renderReview(); renderAll();
  });

  // ---------------- settings ----------------
  function renderSettings() {
    const s = data.settings;
    $('s-school').value = s.schoolName; $('s-emails').value = s.emails.join(', '); $('s-appurl').value = s.appUrl;
    $('s-goal').value = s.defaultGoal; $('s-weekly').value = s.weeklyMax; $('s-stale').value = s.staleDays;
    $('s-term-start').value = s.termStart; $('s-term-end').value = s.termEnd;
    $('last-backup').textContent = s.lastBackup ? 'Last backup: ' + new Date(s.lastBackup).toLocaleString() : 'Not backed up yet.';
    $('folder-info').textContent = isDemo ? 'Practice data stored inside this browser. Choose a real folder before entering real students.' : 'Records are saved in the folder "' + root.name + '".';
  }
  $('settings-form').addEventListener('submit', async e => {
    e.preventDefault();
    const s = data.settings;
    s.schoolName = $('s-school').value.trim();
    s.emails = $('s-emails').value.split(/[,;\s]+/).map(x => x.trim()).filter(x => /.+@.+\..+/.test(x));
    s.appUrl = $('s-appurl').value.trim();
    s.defaultGoal = Number($('s-goal').value) || 250; s.weeklyMax = Number($('s-weekly').value) || 60; s.staleDays = Number($('s-stale').value) || 21;
    s.termStart = $('s-term-start').value; s.termEnd = $('s-term-end').value;
    await save('Settings changed'); renderSettings(); renderAll(); toast('Settings saved.');
  });

  // ---------------- backup ----------------
  async function doBackup() {
    let dest;
    try { dest = await window.showDirectoryPicker({ id: 'wbl-backup', mode: 'readwrite' }); }
    catch (e) { if (e.name !== 'AbortError') toast('Backup failed: ' + e.message); return; }
    try {
      const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
      const bdir = await dest.getDirectoryHandle('WBL backup ' + stamp, { create: true });
      data.settings.lastBackup = new Date().toISOString();
      await save('Backup made');
      await writeFile(bdir, DATA_FILE, JSON.stringify(data, null, 1));
      const imgs = await getDir(root, 'images'); const out = await bdir.getDirectoryHandle('images', { create: true });
      let n = 0;
      for await (const [name, h] of imgs.entries()) { if (h.kind === 'file') { await writeFile(out, name, await h.getFile()); n++; } }
      toast('Backup saved (' + data.students.length + ' students, ' + n + ' images).', 5000);
      renderSettings(); renderBackupWarning();
    } catch (e) { toast('Backup failed: ' + e.message, 8000); }
  }
  $('backup-btn').addEventListener('click', doBackup);

  // ---------------- export ----------------
  function csvCell(v) { v = v == null ? '' : String(v); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  function downloadCsv(name, rows) {
    const blob = new Blob(['\uFEFF' + rows.map(r => r.map(csvCell).join(',')).join('\r\n')], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
  }
  $('export-students').addEventListener('click', () => {
    const rows = [['Student ID', 'Last Name', 'First Name', 'Program', 'Employer', 'Job Title', 'Workplace Supervisor', 'Supervisor Contact', 'Start Date', 'Goal Hours', 'Approved Hours', 'Hours In Review', 'Percent of Goal', 'Last Hours Date', 'Status']];
    data.students.slice().sort((a, b) => (a.lastName + a.firstName).localeCompare(b.lastName + b.firstName)).forEach(s => {
      const m = summarize(s);
      rows.push([s.studentId, s.lastName, s.firstName, s.program, s.employer, s.jobTitle, s.workSupervisor, s.workSupervisorContact, s.startDate, m.goal, WBL.round2(m.hours), WBL.round2(m.pendingHours), Math.floor(m.pct), m.last, m.label]);
    });
    downloadCsv('WBL students ' + today() + '.csv', rows);
  });
  $('export-subs').addEventListener('click', () => {
    const rows = [['Student ID', 'Student Name', 'Type', 'Employer', 'Period Start', 'Period End', 'Regular Hours', 'Overtime Hours', 'Total Hours', 'Status', 'Adjusted', 'Flags', 'Notes', 'Imported']];
    data.submissions.slice().sort((a, b) => a.studentId.localeCompare(b.studentId) || a.periodStart.localeCompare(b.periodStart)).forEach(x => {
      const s = studentById(x.studentId);
      rows.push([x.studentId, s ? fullName(s) : x.studentName, x.type === 'manual' ? 'Unpaid' : 'Pay stub', x.employer, x.periodStart, x.periodEnd, x.regularHours, x.overtimeHours, x.hours, x.status, x.adjusted ? 'yes' : '', x.flags.join(' | '), x.notes, x.importedAt.slice(0, 10)]);
    });
    downloadCsv('WBL submissions ' + today() + '.csv', rows);
  });

  // ---------------- practice data ----------------
  function seedDemo() {
    const st = data.settings;
    st.schoolName = st.schoolName || 'Practice School';
    st.emails = ['wbl.supervisor@example.org'];
    st.appUrl = st.appUrl || 'https://example.org/wbl/student/';
    const y = new Date().getFullYear(), mo = new Date().getMonth();
    st.termStart = (mo >= 7 ? y : y - 1) + '-08-15'; st.termEnd = (mo >= 7 ? y + 1 : y) + '-05-20';
    const names = [['Ava', 'Martinez', 'Auto Technology', 'Quick Lube Plus'], ['Jordan', 'Lee', 'Culinary Arts', 'Main St Diner'], ['Mia', 'Johnson', 'Health Careers', 'Sunrise Care Center'],
      ['Noah', 'Brown', 'Welding', 'Midwest Fabrication'], ['Liam', 'Davis', 'Construction', 'Buckeye Builders'], ['Emma', 'Wilson', 'Cosmetology', 'Shear Style Salon']];
    names.forEach(([f, l, p, e], i) => {
      const s = { studentId: String(10001 + i), firstName: f, lastName: l, program: p, employer: e, jobTitle: 'Student worker', workSupervisor: '', workSupervisorContact: '', startDate: st.termStart, goalHours: '', notes: '', key: WBL.newKey(), active: true, createdAt: new Date().toISOString() };
      data.students.push(s);
      const weeks = [10, 7, 12, 2, 0, 9][i];
      for (let w = 0; w < weeks; w++) {
        const end = new Date(Date.now() - (w * 14 + (i === 3 ? 30 : 3)) * 86400000).toISOString().slice(0, 10);
        const start = new Date(WBL.parseDate(end) - 13 * 86400000).toISOString().slice(0, 10);
        const hrs = [24, 30, 18, 20, 0, 22][i] + (w % 3);
        data.submissions.push({ submissionId: WBL.newId('demo-'), studentId: s.studentId, studentName: f + ' ' + l, type: 'paystub', employer: e, periodStart: start, periodEnd: end, regularHours: hrs, overtimeHours: 0, hours: hrs, notes: '', entryMethod: 'typed', hasImage: false, flags: [], status: w === 0 && i === 1 ? 'review' : 'approved', importedAt: new Date().toISOString(), source: 'practice' });
        if (w === 0 && i === 1) data.submissions[data.submissions.length - 1].flags = ['No pay stub photo was included.'];
      }
    });
  }

  // ---------------- test hook ----------------
  // Lets automated tests open a folder without the picker dialog.
  window.__wblOpenFolder = (h, demo) => openFolder(h, demo);
  window.__wblData = () => data;

  initSetup();
})();
