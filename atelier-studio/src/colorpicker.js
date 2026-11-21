// Color picker: saturation/brightness square, hue strip and a hex box.
import { hexToRgb, rgbToHex } from './fabrics.js';

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, mx ? d / mx : 0, mx];
}
function hsvToRgb(h, s, v) {
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

export class ColorPicker {
  constructor(root, onChange) {
    this.onChange = onChange;
    root.innerHTML = `
      <div class="cp-sv"><canvas></canvas><div class="cp-knob"></div></div>
      <div class="cp-hue"><canvas></canvas><div class="cp-knob"></div></div>
      <div class="cp-row"><span class="cp-chip"></span><label class="cp-hex">#<input maxlength="6" spellcheck="false" aria-label="Hex color code"></label>
        <span class="cp-rgb"></span></div>`;
    this.sv = root.querySelector('.cp-sv canvas'); this.svKnob = root.querySelector('.cp-sv .cp-knob');
    this.hue = root.querySelector('.cp-hue canvas'); this.hueKnob = root.querySelector('.cp-hue .cp-knob');
    this.chip = root.querySelector('.cp-chip'); this.hexIn = root.querySelector('.cp-hex input'); this.rgbOut = root.querySelector('.cp-rgb');
    this.h = 340; this.s = 0.6; this.v = 0.9;
    const drag = (el, fn) => {
      el.addEventListener('pointerdown', (e) => { el.setPointerCapture(e.pointerId); fn(e); const mv = (ev) => fn(ev); const up = () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); this.emit(true); }; el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); });
    };
    drag(this.sv.parentElement, (e) => { const r = this.sv.getBoundingClientRect(); this.s = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); this.v = 1 - Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)); this.update(); this.emit(false); });
    drag(this.hue.parentElement, (e) => { const r = this.hue.getBoundingClientRect(); this.h = Math.min(359.9, Math.max(0, (e.clientX - r.left) / r.width * 360)); this.drawSV(); this.update(); this.emit(false); });
    this.hexIn.addEventListener('change', () => { const v = this.hexIn.value.trim().replace('#', ''); if (/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) { this.set('#' + v); this.emit(true); } else this.update(); });
    new ResizeObserver(() => this.drawAll()).observe(root);
  }
  get hex() { const [r, g, b] = hsvToRgb(this.h, this.s, this.v); return rgbToHex(r, g, b); }
  set(hex) { const [r, g, b] = hexToRgb(hex), [h, s, v] = rgbToHsv(r, g, b); if (s > 0.01 && v > 0.01) this.h = h; this.s = s; this.v = v; this.drawSV(); this.update(); }
  emit(final) { this.onChange(this.hex, final); }
  drawAll() { this.drawSV(); this.drawHue(); this.update(); }
  drawSV() {
    const c = this.sv, w = c.clientWidth, h = c.clientHeight; if (!w) return;
    c.width = w; c.height = h; const x = c.getContext('2d');
    x.fillStyle = `hsl(${this.h},100%,50%)`; x.fillRect(0, 0, w, h);
    let g = x.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#fff'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h);
    g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, '#000'); x.fillStyle = g; x.fillRect(0, 0, w, h);
  }
  drawHue() {
    const c = this.hue, w = c.clientWidth, h = c.clientHeight; if (!w) return;
    c.width = w; c.height = h; const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, w, 0);
    for (let i = 0; i <= 6; i++) g.addColorStop(i / 6, `hsl(${i * 60},100%,50%)`);
    x.fillStyle = g; x.fillRect(0, 0, w, h);
  }
  update() {
    const hex = this.hex, [r, g, b] = hexToRgb(hex);
    this.svKnob.style.left = this.s * 100 + '%'; this.svKnob.style.top = (1 - this.v) * 100 + '%'; this.svKnob.style.background = hex;
    this.hueKnob.style.left = this.h / 360 * 100 + '%';
    this.chip.style.background = hex;
    if (document.activeElement !== this.hexIn) this.hexIn.value = hex.slice(1).toUpperCase();
    this.rgbOut.textContent = `R ${r}  G ${g}  B ${b}`;
  }
}
