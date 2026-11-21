// Starter outlines drawn to fit the current mannequin, so there is something
// to color or trace right away. Points are in world meters (front view).
import { ARM_ANGLE } from './body.js';

export const STARTERS = [
  { id: 'dress', name: 'A-line dress' },
  { id: 'gown', name: 'Ball gown' },
  { id: 'top', name: 'T-shirt' },
  { id: 'skirt', name: 'Skirt' },
  { id: 'pants', name: 'Trousers' },
  { id: 'mini', name: 'Mini dress', icon: 'dress' },
  { id: 'mermaid', name: 'Mermaid gown', icon: 'gown' },
  { id: 'jumpsuit', name: 'Jumpsuit', icon: 'pants' },
  { id: 'shorts', name: 'Shorts', icon: 'shorts' },
  { id: 'tank', name: 'Tank top', icon: 'top' },
  { id: 'crop', name: 'Crop top', icon: 'top' },
  { id: 'blouse', name: 'Bell-sleeve blouse', icon: 'blouse' },
  { id: 'peplum', name: 'Peplum top', icon: 'top' },
  { id: 'jacket', name: 'Blazer', icon: 'jacket' },
  { id: 'coat', name: 'Long coat', icon: 'jacket' },
  { id: 'wideleg', name: 'Wide-leg trousers', icon: 'pants' },
  { id: 'pleated', name: 'Pleated skirt', icon: 'skirt' },
];

// Draw a smooth line through points (quadratic curves through midpoints).
function smooth(ctx, pts, close) {
  if (close) pts = [...pts, pts[0], pts[1]];
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
    ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
  }
  if (!close) ctx.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]);
}

export function drawStarter(id, spec, viewer, ctx) {
  const P = (x, y) => viewer.toBoard(x, y), y = spec.y, h = spec.half, H = spec.H;
  if (EXTRA[id]) { EXTRA[id]({ P, y, h, H, spec, viewer, ctx }); return; }
  const mirror = (left) => [...left, ...left.slice().reverse().map(([x, yy]) => [-x, yy])];
  const sh = h.shoulder, neck = h.neck * 2;
  const bodice = [[-sh * 0.8, y.shoulder - 0.004], [-h.bust - 0.004, y.armpit - 0.015], [-h.bust - 0.012, y.bust], [-h.waist - 0.012, y.waist]];
  ctx.beginPath();
  if (id === 'dress') {
    const hem = y.knee + 0.04, left = [[-neck, y.neckBase + 0.002], ...bodice, [-h.hip - 0.02, y.hip], [-h.hip - 0.1, (y.hip + hem) / 2], [-h.hip - 0.15, hem]];
    const side = mirror(left).map(([a, b]) => P(a, b));
    smooth(ctx, side.slice(0, side.length / 2), false);
    const [hl, hr] = [P(-h.hip - 0.15, hem), P(h.hip + 0.15, hem)], mid = P(0, hem - 0.025);
    ctx.quadraticCurveTo(mid[0], mid[1], hr[0], hr[1]);
    smooth(ctx, side.slice(side.length / 2), false);
    const nl = P(-neck, y.neckBase + 0.002), nm = P(0, y.neckBase - 0.075);
    ctx.quadraticCurveTo(nm[0], nm[1], nl[0], nl[1]);
    ctx.stroke();
    ctx.beginPath(); const wl = P(-h.waist - 0.012, y.waist), wr = P(h.waist + 0.012, y.waist); ctx.moveTo(wl[0], wl[1]); ctx.lineTo(wr[0], wr[1]); ctx.stroke();
  } else if (id === 'gown') {
    const top = y.bust + 0.045, hem = 0.012, wide = h.hip + 0.32;
    const left = [[-h.bust - 0.006, top], [-h.bust - 0.01, y.bust], [-h.waist - 0.01, y.waist], [-h.hip - 0.05, y.hip], [-h.hip - 0.2, (y.hip + hem) / 2], [-wide, hem + 0.03]];
    const pts = left.map(([a, b]) => P(a, b));
    // Sweetheart neckline
    const c = P(0, y.bust + 0.012), lt = P(-h.bust * 0.5, top + 0.018), rt = P(h.bust * 0.5, top + 0.018), l0 = P(-h.bust - 0.006, top), r0 = P(h.bust + 0.006, top);
    ctx.moveTo(c[0], c[1]); ctx.quadraticCurveTo(lt[0], lt[1] - 20, l0[0], l0[1]);
    smooth(ctx, pts, false);
    const hl = P(-wide, hem + 0.03), hm = P(0, hem - 0.015), hr = P(wide, hem + 0.03);
    ctx.quadraticCurveTo(hm[0], hm[1], hr[0], hr[1]);
    smooth(ctx, pts.slice().reverse().map(([a, b]) => [2 * P(0, 0)[0] - a, b]), false);
    ctx.quadraticCurveTo(rt[0], rt[1] - 20, c[0], c[1]);
    ctx.stroke();
    ctx.beginPath(); const wl = P(-h.waist - 0.01, y.waist), wr = P(h.waist + 0.01, y.waist); ctx.moveTo(wl[0], wl[1]); ctx.lineTo(wr[0], wr[1]); ctx.stroke();
    void hl;
  } else if (id === 'top') {
    const hem = y.hip + 0.03, r = spec.upperR * 1.35, len = H * 0.1;
    const sleeve = (side) => {
      const s = viewer.armPoint(side, 0.005), e = viewer.armPoint(side, len), ux = Math.cos(ARM_ANGLE) * side, uy = Math.sin(ARM_ANGLE);
      return { so: [s.x + ux * r, s.y + uy * r], eo: [e.x + ux * r, e.y + uy * r], ei: [e.x - ux * r, e.y - uy * r] };
    };
    const L = sleeve(-1), R = sleeve(1);
    const pts = [[-neck, y.neckBase + 0.003], [-sh * 0.8, y.shoulder], L.so, L.eo, L.ei, [-h.bust - 0.02, y.armpit - 0.03], [-h.waist - 0.03, y.waist], [-h.hip - 0.03, hem], [h.hip + 0.03, hem], [h.waist + 0.03, y.waist], [h.bust + 0.02, y.armpit - 0.03], R.ei, R.eo, R.so, [sh * 0.8, y.shoulder], [neck, y.neckBase + 0.003]];
    const b = pts.map(([a, c]) => P(a, c));
    ctx.moveTo(b[0][0], b[0][1]);
    for (let i = 1; i < b.length; i++) ctx.lineTo(b[i][0], b[i][1]);
    const nm = P(0, y.neckBase - 0.04); ctx.quadraticCurveTo(nm[0], nm[1], b[0][0], b[0][1]);
    ctx.stroke();
  } else if (id === 'skirt') {
    const hem = y.knee + 0.07;
    const left = [[-h.waist - 0.014, y.waist], [-h.hip - 0.02, y.hip], [-h.hip - 0.09, hem]];
    const b = left.map(([a, c]) => P(a, c)), cx = P(0, 0)[0];
    smooth(ctx, b, false);
    const hm = P(0, hem - 0.02), hr = P(h.hip + 0.09, hem); ctx.quadraticCurveTo(hm[0], hm[1], hr[0], hr[1]);
    smooth(ctx, b.slice().reverse().map(([a, c]) => [2 * cx - a, c]), false);
    ctx.closePath(); ctx.stroke();
    ctx.beginPath(); const wl = P(-h.waist - 0.014, y.waist - 0.035), wr = P(h.waist + 0.014, y.waist - 0.035); ctx.moveTo(wl[0], wl[1]); ctx.lineTo(wr[0], wr[1]); ctx.stroke();
  } else if (id === 'pants') {
    const ank = spec.leg[7], hemY = y.ankle + 0.025, out = ank.x + ank.r + 0.035, inn = Math.max(0.01, ank.x - ank.r - 0.03);
    const pts = [[-h.waist - 0.014, y.waist], [-h.hip - 0.02, y.hip], [-(spec.legX + spec.leg[1].r) - 0.02, y.crotch - 0.02], [-out, y.knee], [-out, hemY], [-inn, hemY], [-inn + 0.005, y.knee], [0, y.crotch - 0.015], [inn - 0.005, y.knee], [inn, hemY], [out, hemY], [out, y.knee], [spec.legX + spec.leg[1].r + 0.02, y.crotch - 0.02], [h.hip + 0.02, y.hip], [h.waist + 0.014, y.waist]];
    const b = pts.map(([a, c]) => P(a, c));
    ctx.moveTo(b[0][0], b[0][1]);
    for (let i = 1; i < b.length; i++) ctx.lineTo(b[i][0], b[i][1]);
    ctx.closePath(); ctx.stroke();
    ctx.beginPath(); const wl = P(-h.waist - 0.014, y.waist - 0.035), wr = P(h.waist + 0.014, y.waist - 0.035); ctx.moveTo(wl[0], wl[1]); ctx.lineTo(wr[0], wr[1]); ctx.stroke();
  }
}

// ---------- more outlines ----------
// A symmetric garment from its left half: points from the left neckline (or top edge) down
// to the center bottom or hem; the right half is mirrored and the neckline closes it.
function shape(g, left, { neckDepth = 0.05, round = false } = {}) {
  const { P, ctx } = g, right = left.slice().reverse().map(([x, yy]) => [-x, yy]);
  const pts = [...left, ...right].map(([a, b]) => P(a, b));
  ctx.beginPath();
  if (round) smooth(ctx, pts, false); else { ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); }
  const first = pts[0], mid = P(0, left[0][1] - neckDepth);
  ctx.quadraticCurveTo(mid[0], mid[1], first[0], first[1]);
  ctx.stroke();
}
function line(g, a, b) { const p = g.P(a[0], a[1]), q = g.P(b[0], b[1]); g.ctx.beginPath(); g.ctx.moveTo(p[0], p[1]); g.ctx.lineTo(q[0], q[1]); g.ctx.stroke(); }
// Sleeve on the left arm: [outer at shoulder, outer at end, inner at end].
function sleeve(g, len, rTop, rEnd) {
  const s = g.viewer.armPoint(-1, 0.005), e = g.viewer.armPoint(-1, len), ux = -Math.cos(ARM_ANGLE), uy = Math.sin(ARM_ANGLE);
  return [[s.x + ux * rTop, s.y + uy * rTop], [e.x + ux * rEnd, e.y + uy * rEnd], [e.x - ux * rEnd, e.y - uy * rEnd]];
}
const legs = (g) => { const L = g.spec.leg; return { thigh: g.spec.legX + L[1].r, ank: L[7] }; };
const top = (g, { neck = 2, shoulder = 0.8, armDrop = 0.03 } = {}) => [[-g.h.neck * neck, g.y.neckBase + 0.003], [-g.h.shoulder * shoulder, g.y.shoulder]];

const EXTRA = {
  mini(g) {
    const { y, h, H } = g, hem = y.crotch - 0.07 * H;
    shape(g, [...top(g), [-h.bust - 0.004, y.armpit - 0.015], [-h.bust - 0.012, y.bust], [-h.waist - 0.012, y.waist], [-h.hip - 0.02, y.hip], [-h.hip - 0.06, hem]], { neckDepth: 0.06, round: true });
  },
  mermaid(g) {
    const { y, h } = g, { thigh } = legs(g), knee = y.knee + 0.03;
    shape(g, [[-h.bust - 0.004, y.bust + 0.05], [-h.bust - 0.01, y.bust], [-h.waist - 0.01, y.waist], [-h.hip - 0.012, y.hip], [-thigh - 0.01, y.crotch - 0.04], [-thigh - 0.005, knee], [-h.hip - 0.12, (knee + 0.02) / 2], [-h.hip - 0.24, 0.02]], { neckDepth: 0.035, round: true });
    line(g, [-h.waist - 0.01, y.waist], [h.waist + 0.01, y.waist]);
  },
  jumpsuit(g) {
    const { y, h } = g, { ank } = legs(g), hemY = y.ankle + 0.025, out = ank.x + ank.r + 0.05, inn = Math.max(0.012, ank.x - ank.r - 0.04);
    shape(g, [...top(g, { shoulder: 0.7 }), [-h.bust - 0.01, y.armpit - 0.02], [-h.bust - 0.014, y.bust], [-h.waist - 0.016, y.waist], [-h.hip - 0.025, y.hip], [-out, y.knee], [-out, hemY], [-inn, hemY], [-inn + 0.004, y.knee], [0, y.crotch - 0.015]], { neckDepth: 0.09 });
    line(g, [-h.waist - 0.016, y.waist], [h.waist + 0.016, y.waist]);
  },
  shorts(g) {
    const { y, h, H } = g, { thigh } = legs(g), hemY = y.crotch - 0.1 * H, x = g.spec.legX;
    shape(g, [[-h.waist - 0.014, y.waist], [-h.hip - 0.02, y.hip], [-thigh - 0.035, hemY], [-Math.max(0.01, x - g.spec.leg[2].r - 0.025), hemY], [0, y.crotch - 0.012]], { neckDepth: 0 });
    line(g, [-h.waist - 0.014, y.waist - 0.035], [h.waist + 0.014, y.waist - 0.035]);
  },
  tank(g) {
    const { y, h } = g;
    shape(g, [[-h.neck * 2.3, y.neckBase], [-h.shoulder * 0.55, y.shoulder + 0.004], [-h.bust - 0.006, y.armpit - 0.035], [-h.bust - 0.016, y.bust], [-h.waist - 0.02, y.waist], [-h.hip - 0.03, y.hip + 0.02]], { neckDepth: 0.11 });
  },
  crop(g) {
    const { y, h, H } = g, [so, eo, ei] = sleeve(g, H * 0.075, g.spec.upperR * 1.3, g.spec.upperR * 1.3);
    shape(g, [...top(g), so, eo, ei, [-h.bust - 0.02, y.armpit - 0.03], [-h.bust - 0.02, y.bust - 0.02], [-h.waist - 0.03, y.waist + 0.035]], { neckDepth: 0.035 });
  },
  blouse(g) {
    const { y, h } = g, [so, eo, ei] = sleeve(g, g.spec.armLen * 0.97, g.spec.upperR * 1.2, 0.11);
    shape(g, [...top(g), so, eo, ei, [-h.bust - 0.03, y.armpit - 0.04], [-h.bust - 0.035, y.bust - 0.02], [-h.waist - 0.04, y.waist], [-h.hip - 0.05, y.hip + 0.015]], { neckDepth: 0.06 });
  },
  peplum(g) {
    const { y, h } = g;
    shape(g, [...top(g, { shoulder: 0.65 }), [-h.bust - 0.004, y.armpit - 0.02], [-h.bust - 0.01, y.bust], [-h.waist - 0.01, y.waist], [-h.hip - 0.08, y.hip + 0.005]], { neckDepth: 0.05, round: true });
    line(g, [-h.waist - 0.01, y.waist], [h.waist + 0.01, y.waist]);
  },
  jacket(g) {
    const { y, h } = g, [so, eo, ei] = sleeve(g, g.spec.armLen * 0.97, g.spec.upperR * 1.3, g.spec.upperR * 0.95);
    const hem = y.hip - 0.01;
    shape(g, [[-h.neck * 1.6, y.neckBase + 0.01], [-h.shoulder * 0.95, y.shoulder + 0.004], so, eo, ei, [-h.bust - 0.025, y.armpit - 0.03], [-h.bust - 0.028, y.bust], [-h.waist - 0.022, y.waist], [-h.hip - 0.03, hem]], { neckDepth: 0.02 });
    // Lapels and front opening
    line(g, [-h.neck * 1.6, y.neckBase + 0.01], [-0.012, y.bust - 0.07]); line(g, [h.neck * 1.6, y.neckBase + 0.01], [0.012, y.bust - 0.07]);
    line(g, [-0.012, y.bust - 0.07], [-0.012, hem]); line(g, [-h.bust * 0.55, y.bust + 0.04], [-0.012, y.bust - 0.02]); line(g, [h.bust * 0.55, y.bust + 0.04], [0.012, y.bust - 0.02]);
  },
  coat(g) {
    const { y, h } = g, [so, eo, ei] = sleeve(g, g.spec.armLen * 0.99, g.spec.upperR * 1.4, g.spec.upperR * 1.1);
    const hem = y.knee - 0.02;
    shape(g, [[-h.neck * 1.7, y.neckBase + 0.01], [-h.shoulder * 1.0, y.shoulder + 0.004], so, eo, ei, [-h.bust - 0.035, y.armpit - 0.03], [-h.bust - 0.038, y.bust], [-h.waist - 0.04, y.waist], [-h.hip - 0.05, y.hip], [-h.hip - 0.1, hem]], { neckDepth: 0.02 });
    line(g, [-h.neck * 1.7, y.neckBase + 0.01], [-0.012, y.bust - 0.06]); line(g, [h.neck * 1.7, y.neckBase + 0.01], [0.012, y.bust - 0.06]);
    line(g, [-0.012, y.bust - 0.06], [-0.012, hem]); line(g, [-h.waist - 0.04, y.waist], [h.waist + 0.04, y.waist]);
  },
  wideleg(g) {
    const { y, h } = g, { ank } = legs(g), hemY = y.ankle + 0.015, out = ank.x + ank.r + 0.1, inn = 0.012;
    shape(g, [[-h.waist - 0.014, y.waist], [-h.hip - 0.025, y.hip], [-out + 0.04, y.knee], [-out, hemY], [-inn, hemY], [-inn, y.knee], [0, y.crotch - 0.015]], { neckDepth: 0 });
    line(g, [-h.waist - 0.014, y.waist - 0.04], [h.waist + 0.014, y.waist - 0.04]);
  },
  pleated(g) {
    const { y, h } = g, hem = y.knee + 0.03, w = h.hip + 0.13;
    shape(g, [[-h.waist - 0.014, y.waist], [-h.hip - 0.03, y.hip], [-w, hem]], { neckDepth: 0 });
    line(g, [-h.waist - 0.014, y.waist - 0.035], [h.waist + 0.014, y.waist - 0.035]);
    for (let i = -3; i <= 3; i++) { if (!i) continue; const t = i / 4; line(g, [t * h.waist, y.waist - 0.035], [t * w, hem + 0.004]); }
  },
};
