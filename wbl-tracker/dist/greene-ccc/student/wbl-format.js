/*
 * WBL submission format: shared by the student app and the supervisor app.
 *
 * A submission is a small JSON document. The student's phone signs it with an
 * HMAC-SHA256 key that came from the enrollment QR code. Only the student's
 * phone and the supervisor's records know that key, so the supervisor app can
 * tell whether a file was made by that student's app and not changed afterward.
 *
 * Works in browsers (window.WBL) and in Node 20+ (module.exports) for tests.
 */
(function (root) {
  'use strict';

  const FORMAT = 'wbl-submission';
  const VERSION = 1;
  const ENROLL_VERSION = 1;

  const subtle = () => {
    const c = (typeof globalThis !== 'undefined' && globalThis.crypto) || null;
    if (!c || !c.subtle) throw new Error('This browser cannot sign submissions (Web Crypto is unavailable).');
    return c.subtle;
  };

  // ---------- base64url helpers ----------
  function bytesToB64url(bytes) {
    let bin = '';
    const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64urlToBytes(s) {
    s = String(s).replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    const bin = atob(s);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function utf8(s) { return new TextEncoder().encode(s); }
  function encodeJson(obj) { return bytesToB64url(utf8(JSON.stringify(obj))); }
  function decodeJson(s) { return JSON.parse(new TextDecoder().decode(b64urlToBytes(s))); }

  // ---------- canonical JSON (sorted keys) so signatures are stable ----------
  function canonical(value) {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
    const keys = Object.keys(value).filter(k => value[k] !== undefined).sort();
    return '{' + keys.map(k => JSON.stringify(k) + ':' + canonical(value[k])).join(',') + '}';
  }

  function randomBytes(n) {
    const b = new Uint8Array(n);
    globalThis.crypto.getRandomValues(b);
    return b;
  }
  function newKey() { return bytesToB64url(randomBytes(32)); }
  function newId(prefix) {
    const t = Date.now().toString(36);
    return (prefix || '') + t + '-' + bytesToB64url(randomBytes(6));
  }

  async function hmac(keyB64, text) {
    const key = await subtle().importKey('raw', b64urlToBytes(keyB64), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await subtle().sign('HMAC', key, utf8(text));
    return bytesToB64url(new Uint8Array(sig));
  }

  function round2(n) { return Math.round(Number(n) * 100) / 100; }

  // ---------- submissions ----------
  /**
   * Build and sign a submission.
   * fields: { studentId, type: 'paystub'|'manual', employer, periodStart, periodEnd,
   *           regularHours, overtimeHours, notes, image (data URL or null),
   *           entryMethod: 'typed'|'ocr', ocrConfidence }
   */
  async function createSubmission(fields, keyB64) {
    const doc = {
      format: FORMAT,
      version: VERSION,
      submissionId: fields.submissionId || newId('s-'),
      studentId: String(fields.studentId),
      studentName: fields.studentName || '',
      type: fields.type === 'manual' ? 'manual' : 'paystub',
      employer: (fields.employer || '').trim(),
      periodStart: fields.periodStart,
      periodEnd: fields.periodEnd,
      regularHours: round2(fields.regularHours || 0),
      overtimeHours: round2(fields.overtimeHours || 0),
      notes: (fields.notes || '').trim(),
      entryMethod: fields.entryMethod || 'typed',
      ocrConfidence: fields.ocrConfidence == null ? null : Number(fields.ocrConfidence),
      image: fields.image || null,
      createdAt: fields.createdAt || new Date().toISOString(),
      app: fields.app || 'wbl-student'
    };
    doc.hmac = await hmac(keyB64, canonical(doc));
    return doc;
  }

  /** Parse file text into a submission object (no signature check). Throws on bad input. */
  function parseSubmission(text) {
    let doc;
    try { doc = JSON.parse(String(text).trim()); }
    catch (e) { throw new Error('Not a WBL submission file (could not read it).'); }
    if (!doc || doc.format !== FORMAT) throw new Error('Not a WBL submission file.');
    if (doc.version > VERSION) throw new Error('This file was made by a newer version of the student app. Please update the supervisor app.');
    for (const f of ['submissionId', 'studentId', 'periodStart', 'periodEnd', 'hmac']) {
      if (!doc[f]) throw new Error('Submission is missing "' + f + '".');
    }
    return doc;
  }

  async function verifySubmission(doc, keyB64) {
    if (!keyB64) return false;
    const copy = Object.assign({}, doc);
    const given = copy.hmac;
    delete copy.hmac;
    const expected = await hmac(keyB64, canonical(copy));
    return expected === given;
  }

  function totalHours(doc) { return round2((doc.regularHours || 0) + (doc.overtimeHours || 0)); }

  /** File name for a submission, e.g. WBL_12345_2026-11-01_to_2026-11-07.txt
   *  (.txt so phones' share sheets and mail apps accept it as an attachment). */
  function fileName(doc) {
    const safe = s => String(s || '').replace(/[^A-Za-z0-9_-]+/g, '');
    return 'WBL_' + safe(doc.studentId) + '_' + safe(doc.periodStart) + '_to_' + safe(doc.periodEnd) + '_' + safe(doc.submissionId).slice(-6) + '.txt';
  }

  // ---------- enrollment ----------
  /** enrollment: { studentId, name, school, emails: [], key, employer, appUrl } -> URL with #enroll=... */
  function enrollmentCode(e) {
    return encodeJson({ v: ENROLL_VERSION, i: e.studentId, n: e.name, s: e.school, e: e.emails || [], k: e.key, w: e.employer || '' });
  }
  function enrollmentUrl(appUrl, e) {
    const base = String(appUrl || '').split('#')[0];
    return base + '#enroll=' + enrollmentCode(e);
  }
  function parseEnrollment(codeOrUrl) {
    let code = String(codeOrUrl || '').trim();
    const m = code.match(/#enroll=([A-Za-z0-9_-]+)/);
    if (m) code = m[1];
    let o;
    try { o = decodeJson(code); } catch (e) { throw new Error('That enrollment code is not valid. Ask your supervisor for a new one.'); }
    if (!o || !o.i || !o.k) throw new Error('That enrollment code is incomplete. Ask your supervisor for a new one.');
    return { studentId: String(o.i), name: o.n || '', school: o.s || '', emails: Array.isArray(o.e) ? o.e : [], key: o.k, employer: o.w || '' };
  }

  // ---------- dates ----------
  function parseDate(s) { const [y, m, d] = String(s).split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); }
  function daysBetween(a, b) { return Math.round((parseDate(b) - parseDate(a)) / 86400000); }

  const api = {
    FORMAT, VERSION, canonical, newKey, newId, hmac, createSubmission, parseSubmission, verifySubmission,
    totalHours, fileName, enrollmentCode, enrollmentUrl, parseEnrollment, parseDate, daysBetween, round2,
    bytesToB64url, b64urlToBytes
  };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.WBL = api;
})(typeof self !== 'undefined' ? self : this);
