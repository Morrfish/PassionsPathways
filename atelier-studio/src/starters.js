// Starter outlines drawn to fit the current mannequin, so there is something
// to color or trace right away. Points are in world meters (front view).
import { ARM_ANGLE } from './body.js';

export const STARTERS = [
  { id: 'dress', name: 'A-line dress' },
  { id: 'gown', name: 'Ball gown' },
  { id: 'top', name: 'T-shirt' },
  { id: 'skirt', name: 'Skirt' },
  { id: 'pants', name: 'Trousers' },
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
