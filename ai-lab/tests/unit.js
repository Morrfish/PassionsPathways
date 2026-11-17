// Run: node tests/unit.js   (sanity checks that the lessons still emerge from the datasets and the scorer works)
const AI = require('./loadai.js')(['core.js', 'viz.js', 'items.js', 'data.js', 'gen.js', 'scoring.js']);
let fail = 0; const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fail++; };
[1, 2, 3].forEach((k) => ok(AI.pixNet(AI.PIX[k]).out === AI.PIX_TRUTH[k], 'pixel network reads image ' + k));
const nf = AI.fraudEval([1, 1, 1, 1, 1], 101); ok(Math.abs(nf.acc - 0.95) < 1e-9 && nf.tp === 0, 'never-flag fraud model is 95% accurate, catches 0');
let goalB = false; for (let t = 0; t <= 100; t++) { const e = AI.fraudEval([0, 0, 1, 0, 1], t); if (e.recall >= 0.9 && e.travFA <= 0.05) goalB = true; } ok(goalB, 'fraud Goal B is achievable by re-weighting');
const g = AI.biasGroups(); ok(g[0].n === 20 && g[0].h === 8 && g[1].h === 7 && g[2].h === 1 && g[3].h === 0, 'hiring-data group counts');
const base = AI.biasAudit(AI.biasTrain({})), w = AI.biasAudit(AI.biasTrain({ dropW: true })), sk = AI.biasAudit(AI.biasTrain({ label: 'skill' }));
ok(base.ratio < 0.6 && w.ratio > base.ratio && w.ratio < 0.8 && sk.ratio > 0.9, 'bias fixes: baseline bad, dropping one column barely helps, skills label fixes it');
let h = 0; for (let s = 101; s <= 106; s++) { const d = AI.gen.m1(s); h += d.test.filter((p) => ((p.x > 24.5 ? 1 : 0) === p.cls)).length / d.test.length; } ok(Math.abs(h / 6 - 0.5) < 0.01, 'height-only line scores about 50% on Mission 1 test sets');
const e = AI.score({ answers: {}, text: {}, log: {}, cfu: {}, student: { first: 'a', last: 'b' }, activeSeconds: 0 }); ok(e.total === 0 && e.max === 112, 'empty submission scores 0 of 112');
console.log(fail ? fail + ' FAILED' : 'ALL PASSED'); process.exit(fail ? 1 : 0);
