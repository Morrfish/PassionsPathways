"""After new art replaced some poses, keep each move's in-game size (one factor per move, the median pose) as it was in a previous sprites.js:
writes/updates <out>/<id>-fscale.json with the multiplier for every listed pose.
usage: match_sizes.py <old sprites.js> <new sprites.js> <outdir> <id>:<prefix>[,<prefix>] ..."""
import sys, json, re, os, subprocess
old, new, out = sys.argv[1:4]
js = """const load=(f)=>{global.window=global;global.MM={};delete require.cache[require.resolve(f)];require(f);return MM.SPRITES;};
const A=load(process.argv[1]), B=load(process.argv[2]); const r={};
for (const spec of process.argv.slice(3)) { const [id, pres] = spec.split(':'); r[id] = {};
  for (const k in B[id].frames) if (pres.split(',').some(p => k.startsWith(p) && /^\\d+$/.test(k.slice(p.length))) && A[id].frames[k]) {
    const sz = (S, k) => S.frames[k][3] * ((S.fscale || {})[k] || 1) / S.standH; r[id][k] = sz(A[id], k) / sz(B[id], k); } }
console.log(JSON.stringify(r));"""
res = json.loads(subprocess.check_output(['node', '-e', js, os.path.abspath(old), os.path.abspath(new)] + sys.argv[4:]))
for sid, d in res.items():
    p = f'{out}/{sid}-fscale.json'; cur = json.load(open(p)) if os.path.exists(p) else {}
    if not d: continue
    med = sorted(d.values())[len(d) // 2]  # one factor for the whole move, so its poses keep their natural proportions
    for k in d: cur[k] = round(cur.get(k, 1) * med, 4)
    json.dump(cur, open(p, 'w')); print(sid, 'factor', round(med, 3), 'per-pose spread', round(min(d.values()), 2), '-', round(max(d.values()), 2))
