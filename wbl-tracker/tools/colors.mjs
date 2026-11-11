// Color helpers for brand themes: WCAG contrast and readable text colors.
export function hexToRgb(hex) {
  let h = String(hex).trim().replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error('Bad color: ' + hex);
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}
export function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}
export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
/** White or near-black, whichever reads better on the background. */
export function onColor(bg) {
  return contrast(bg, '#ffffff') >= contrast(bg, '#1a1a1a') ? '#ffffff' : '#1a1a1a';
}
export function mix(hex, withHex, t) {
  const a = hexToRgb(hex), b = hexToRgb(withHex);
  return rgbToHex(a.map((v, i) => v + (b[i] - v) * t));
}
/** Darken a color until it reaches the target contrast against white (for links/text). */
export function readableOnWhite(hex, target = 4.5) {
  let c = hex, i = 0;
  while (contrast(c, '#ffffff') < target && i < 20) { c = mix(c, '#000000', 0.1); i++; }
  return c;
}
