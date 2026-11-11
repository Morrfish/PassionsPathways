// Unit tests for the submission format: node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const WBL = createRequire(import.meta.url)('../src/shared/wbl-format.js');

const base = { studentId: '123', studentName: 'Ava M', employer: 'Diner', periodStart: '2026-10-01', periodEnd: '2026-10-14', regularHours: 30.5, overtimeHours: 2 };

test('signed submission verifies with the right key only', async () => {
  const k = WBL.newKey();
  const d = await WBL.createSubmission(base, k);
  assert.equal(await WBL.verifySubmission(d, k), true);
  assert.equal(await WBL.verifySubmission(d, WBL.newKey()), false);
  assert.equal(WBL.totalHours(d), 32.5);
});

test('editing hours after signing is detected', async () => {
  const k = WBL.newKey();
  const d = await WBL.createSubmission(base, k);
  const parsed = WBL.parseSubmission(JSON.stringify(Object.assign({}, d, { regularHours: 80 })));
  assert.equal(await WBL.verifySubmission(parsed, k), false);
});

test('enrollment round trip through a URL', () => {
  const e = { studentId: '55', name: 'Jordan Lee', school: 'Test CC', emails: ['a@x.org', 'b@x.org'], key: WBL.newKey(), employer: 'Shop' };
  const u = WBL.enrollmentUrl('https://example.org/student/', e);
  assert.match(u, /^https:\/\/example\.org\/student\/#enroll=/);
  const p = WBL.parseEnrollment(u);
  assert.deepEqual(p, e);
});

test('rejects non-WBL files', () => {
  assert.throws(() => WBL.parseSubmission('hello'));
  assert.throws(() => WBL.parseSubmission('{"format":"other"}'));
});

test('file names are safe', async () => {
  const d = await WBL.createSubmission(Object.assign({}, base, { studentId: '1/2\\3' }), WBL.newKey());
  assert.match(WBL.fileName(d), /^WBL_123_2026-10-01_to_2026-10-14_[A-Za-z0-9_-]{6}\.txt$/);
});
