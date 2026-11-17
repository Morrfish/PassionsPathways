// Safe math expressions for dimensions: numbers, parameter names, + - * / ^ ( ),
// and a few functions. Lengths are in millimetres, angles in degrees.
const FUNCS = {
  sin: (d) => Math.sin((d * Math.PI) / 180),
  cos: (d) => Math.cos((d * Math.PI) / 180),
  tan: (d) => Math.tan((d * Math.PI) / 180),
  sqrt: Math.sqrt, abs: Math.abs, round: Math.round, floor: Math.floor, ceil: Math.ceil,
  min: Math.min, max: Math.max,
};
const CONSTS = { pi: Math.PI, PI: Math.PI };

function tokenize(src) {
  const out = [];
  const re = /\s*(?:(\d+\.?\d*(?:[eE][-+]?\d+)?|\.\d+)|([A-Za-z_][A-Za-z_0-9]*)|(\S))/y;
  let m;
  re.lastIndex = 0;
  while (re.lastIndex < src.length) {
    const start = re.lastIndex;
    m = re.exec(src);
    if (!m) break;
    if (m[1] !== undefined) out.push({ t: 'num', v: parseFloat(m[1]) });
    else if (m[2] !== undefined) out.push({ t: 'id', v: m[2] });
    else if (m[3] !== undefined) out.push({ t: 'op', v: m[3] });
    else if (re.lastIndex === start) break;
  }
  return out;
}

export function evaluate(src, params = {}, seen = new Set()) {
  if (typeof src === 'number') return src;
  if (src === undefined || src === null || String(src).trim() === '') throw new Error('Empty value');
  const toks = tokenize(String(src));
  let i = 0;
  const peek = () => toks[i];
  const take = (v) => {
    const t = toks[i];
    if (!t || (v && t.v !== v)) throw new Error(`Expected "${v}"`);
    i++;
    return t;
  };
  function primary() {
    const t = peek();
    if (!t) throw new Error('Unfinished expression');
    if (t.t === 'num') { i++; return t.v; }
    if (t.t === 'op' && t.v === '(') { i++; const v = expr(); take(')'); return v; }
    if (t.t === 'op' && (t.v === '-' || t.v === '+')) { i++; const v = power(); return t.v === '-' ? -v : v; }
    if (t.t === 'id') {
      i++;
      if (FUNCS[t.v] && peek() && peek().v === '(') {
        i++;
        const args = [expr()];
        while (peek() && peek().v === ',') { i++; args.push(expr()); }
        take(')');
        return FUNCS[t.v](...args);
      }
      if (t.v in CONSTS) return CONSTS[t.v];
      if (Object.prototype.hasOwnProperty.call(params, t.v)) {
        if (seen.has(t.v)) throw new Error(`"${t.v}" refers to itself`);
        const s2 = new Set(seen); s2.add(t.v);
        return evaluate(params[t.v], params, s2);
      }
      throw new Error(`Unknown name "${t.v}"`);
    }
    throw new Error(`Unexpected "${t.v}"`);
  }
  function power() {
    const b = primary();
    if (peek() && peek().v === '^') { i++; return Math.pow(b, unary()); }
    return b;
  }
  function unary() { return power(); }
  function term() {
    let v = unary();
    while (peek() && (peek().v === '*' || peek().v === '/')) {
      const op = toks[i++].v; const r = unary();
      v = op === '*' ? v * r : v / r;
    }
    return v;
  }
  function expr() {
    let v = term();
    while (peek() && (peek().v === '+' || peek().v === '-')) {
      const op = toks[i++].v; const r = term();
      v = op === '+' ? v + r : v - r;
    }
    return v;
  }
  const v = expr();
  if (i < toks.length) throw new Error(`Unexpected "${toks[i].v}"`);
  if (!Number.isFinite(v)) throw new Error('Not a number');
  return v;
}

export function paramMap(doc) {
  const m = {};
  for (const p of doc.params || []) if (p.name) m[p.name] = p.expr;
  return m;
}

export function tryEval(src, params) {
  try { return { ok: true, v: evaluate(src, params) }; } catch (e) { return { ok: false, err: e.message }; }
}

// Format a number for a dimension field.
export function fmt(n) {
  if (!Number.isFinite(n)) return '';
  return String(Math.round(n * 1000) / 1000);
}
