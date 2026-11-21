// Body sizes and the mannequin's shape. All lengths in meters unless noted.

// Size charts in centimeters: [bust/chest, waist, hip]. Kids sizes also carry height.
export const SIZE_CHARTS = {
  women: { height: 168, sizes: { XS: [81, 63, 89], S: [86, 68, 94], M: [91, 73, 99], L: [99, 81, 107], XL: [107, 89, 115], '2XL': [117, 99, 125], '3XL': [127, 109, 135], '4XL': [137, 119, 145] } },
  men: { height: 178, sizes: { XS: [86, 71, 86], S: [91, 76, 91], M: [99, 84, 99], L: [107, 91, 107], XL: [117, 102, 117], '2XL': [127, 112, 127], '3XL': [137, 122, 137], '4XL': [147, 132, 147] } },
  kids: { height: 0, sizes: { '4': [56, 53, 58, 104], '6': [61, 56, 64, 117], '8': [66, 58, 69, 130], '10': [71, 61, 74, 140], '12': [76, 64, 80, 150], '14': [81, 66, 86, 160] } },
};
export const HEIGHT_ADJUST = { petite: -10, regular: 0, tall: 8 };
export const SKIN_TONES = [
  { id: 'form', name: 'Dress form', color: '#efe8dc' },
  { id: 'porcelain', name: 'Porcelain', color: '#f3d9c6' },
  { id: 'light', name: 'Light', color: '#e8bf9f' },
  { id: 'medium', name: 'Medium', color: '#c98f68' },
  { id: 'tan', name: 'Tan', color: '#a8714c' },
  { id: 'deep', name: 'Deep', color: '#7a4a2e' },
  { id: 'rich', name: 'Rich', color: '#4d2c1b' },
];

export function defaultBodySettings() {
  return { type: 'women', size: 'M', height: 'regular', skin: 'form', custom: null };
}

// Turn the picked type/size/height (or custom numbers) into body measurements in cm.
export function measurementsFor(s) {
  const chart = SIZE_CHARTS[s.type] || SIZE_CHARTS.women;
  const row = chart.sizes[s.size] || Object.values(chart.sizes)[2];
  let height = s.type === 'kids' ? row[3] : chart.height + (HEIGHT_ADJUST[s.height] || 0);
  const m = { height, bust: row[0], waist: row[1], hip: row[2] };
  if (s.custom) for (const k of Object.keys(m)) if (s.custom[k] > 0) m[k] = s.custom[k];
  m.shoulder = Math.round((0.18 * m.height + 0.12 * m.bust) * 10) / 10;
  const P = PROPORTIONS[s.type] || PROPORTIONS.women;
  m.inseam = Math.round(P.crotch * m.height);
  m.arm = Math.round((P.upperArm + P.forearm) * m.height);
  return m;
}

// Where things sit, as a fraction of height (floor = 0, head top = 1).
const PROPORTIONS = {
  women: { crotch: 0.46, hip: 0.51, waist: 0.615, bust: 0.715, armpit: 0.745, shoulder: 0.815, neckBase: 0.83, neckTop: 0.87, head: 0.925, headR: 0.064, knee: 0.285, ankle: 0.045, thigh: 0.6, upperArm: 0.17, forearm: 0.15, armC: 0.30, bustBulge: 1 },
  men: { crotch: 0.47, hip: 0.515, waist: 0.60, bust: 0.72, armpit: 0.745, shoulder: 0.818, neckBase: 0.835, neckTop: 0.875, head: 0.93, headR: 0.062, knee: 0.285, ankle: 0.045, thigh: 0.57, upperArm: 0.175, forearm: 0.15, armC: 0.32, bustBulge: 0.3 },
  kids: { crotch: 0.43, hip: 0.48, waist: 0.56, bust: 0.66, armpit: 0.69, shoulder: 0.76, neckBase: 0.775, neckTop: 0.81, head: 0.885, headR: 0.085, knee: 0.27, ankle: 0.045, thigh: 0.58, upperArm: 0.16, forearm: 0.14, armC: 0.30, bustBulge: 0 },
};

// Ellipse half-axes (a = side to side, b = front to back) for a circumference and depth ratio.
export function ellipse(C, k) {
  const per = Math.PI * (3 * (1 + k) - Math.sqrt((3 + k) * (1 + 3 * k)));
  const a = C / per; return { a, b: a * k };
}
export function ellipsePerimeter(a, b) { return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b))); }

export const ARM_ANGLE = 22 * Math.PI / 180; // arms out from the body (A-pose)

// Full body description used by the 3D viewer and the sketch guide.
export function bodySpec(settings) {
  const m = measurementsFor(settings), P = PROPORTIONS[settings.type] || PROPORTIONS.women;
  const H = m.height / 100, cm = (v) => v / 100;
  const hip = ellipse(cm(m.hip), 0.74), waist = ellipse(cm(m.waist), 0.72), bust = ellipse(cm(m.bust) * (P.bustBulge ? 0.95 : 1), 0.66);
  const sh = cm(m.shoulder) / 2, neckR = cm(m.bust) * 0.058 + 0.012;
  const mid = (p, q, t) => ({ a: p.a + (q.a - p.a) * t, b: p.b + (q.b - p.b) * t });
  const under = mid(waist, bust, 0.5);
  const T = (f, e, extra = {}) => ({ y: f * H, a: e.a, b: e.b, ...extra });
  const torso = [
    T(P.crotch - 0.008, { a: hip.a * 0.62, b: hip.b * 0.55 }),
    T(P.crotch + 0.006, { a: hip.a * 0.86, b: hip.b * 0.82 }),
    T(P.crotch + 0.025, { a: hip.a * 0.97, b: hip.b * 0.96 }),
    T(P.hip, hip),
    T((P.hip + P.waist) / 2, mid(hip, waist, 0.55)),
    T(P.waist, waist),
    T((P.waist + P.bust) / 2, under),
    T(P.bust, bust),
    T(P.armpit, { a: bust.a * 0.97, b: bust.b * 0.92 }),
    T((P.armpit + P.shoulder) / 2 + 0.008, { a: Math.max(sh * 0.86, bust.a * 0.95), b: bust.b * 0.8 }),
    T(P.shoulder - 0.004, { a: sh * 0.9, b: bust.b * 0.66 }),
    T(P.neckBase - 0.002, { a: Math.max(neckR * 2.2, sh * 0.62), b: Math.max(neckR * 1.4, bust.b * 0.5) }),
    T(P.neckBase + 0.006, { a: neckR * 1.25, b: neckR * 1.15 }),
    T(P.neckTop, { a: neckR, b: neckR }),
  ];
  // Bust / chest and seat shaping, added to the depth of each ring.
  const bulgeAmp = P.bustBulge * Math.max(0.012, (cm(m.bust) - cm(m.waist)) * 0.09);
  const bustY = P.bust * H, hipY = P.hip * H;
  const bulge = (y, x, a, s) => {
    let dz = 0;
    if (s > 0) {
      const gy = Math.exp(-Math.pow((y - bustY) / (y < bustY ? 0.035 * H : 0.05 * H), 2));
      const xc = 0.42 * a, w = 0.3 * a;
      dz += bulgeAmp * gy * s * s * (Math.exp(-Math.pow((x - xc) / w, 2)) + Math.exp(-Math.pow((x + xc) / w, 2)));
    } else {
      const gy = Math.exp(-Math.pow((y - hipY + 0.01 * H) / (0.05 * H), 2));
      const xc = 0.45 * a, w = 0.35 * a;
      dz -= 0.35 * bulgeAmp * gy * s * s * (Math.exp(-Math.pow((x - xc) / w, 2)) + Math.exp(-Math.pow((x + xc) / w, 2))) + (settings.type === 'women' ? 0.012 : 0.006) * gy * s * s;
    }
    return dz;
  };

  // Legs: rings down from the crotch. legX = distance of each leg's center from the middle.
  const thighC = cm(m.hip) * P.thigh, legX = hip.a * 0.47;
  const L = (f, C, xs = 1) => ({ y: f * H, r: C / (2 * Math.PI), x: legX * xs });
  const leg = [
    L(P.crotch + 0.04, thighC * 1.05, 1.0),
    L(P.crotch - 0.01, thighC, 1.0),
    L(P.crotch - 0.06, thighC * 0.88, 0.97),
    L(P.knee + 0.05, thighC * 0.7, 0.9),
    L(P.knee, thighC * 0.62, 0.86),
    L(P.knee - 0.05, thighC * 0.64, 0.84),
    L((P.knee + P.ankle) / 2 + 0.03, thighC * 0.56, 0.8),
    L(P.ankle + 0.03, thighC * 0.37, 0.76),
    L(P.ankle - 0.012, thighC * 0.38, 0.75),
  ];
  // Arms in an A-pose: start at the shoulder joint and run out at ARM_ANGLE.
  const armC = cm(m.bust) * P.armC, upperR = armC / (2 * Math.PI);
  const shoulderJoint = { x: sh - upperR * 0.8, y: (P.shoulder - 0.018) * H };
  const A = (d, C) => ({ d: d * H, r: C / (2 * Math.PI) });
  const arm = [
    A(-0.01, armC * 1.15), A(0.02, armC * 1.12), A(0.06, armC), A(P.upperArm, armC * 0.78),
    A(P.upperArm + 0.06, armC * 0.82), A(P.upperArm + P.forearm, armC * 0.56),
  ];
  const armLen = (P.upperArm + P.forearm) * H;

  return {
    settings, m, H, P, torso, bulge, leg, legX, arm, armLen, shoulderJoint, upperR,
    head: { y: P.head * H, r: P.headR * H },
    footLen: 0.15 * H * (settings.type === 'kids' ? 0.95 : 1),
    y: { crotch: P.crotch * H, hip: hipY, waist: P.waist * H, bust: bustY, armpit: P.armpit * H, shoulder: P.shoulder * H, neckBase: P.neckBase * H, neckTop: P.neckTop * H, knee: P.knee * H, ankle: P.ankle * H },
    half: { hip: hip.a, waist: waist.a, bust: bust.a, shoulder: sh, neck: neckR },
  };
}

// The sketch board covers this box of the front view (world meters).
export function boardBox(spec, BW, BH) {
  const h = spec.H * 1.08, w = h * BW / BH;
  return { x0: -w / 2, y0: -spec.H * 0.025, w, h };
}
