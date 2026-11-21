// Portfolio "Runway": each look walks down a lit runway, poses, twirls (the fabric swings)
// and walks back, with a name card, camera flashes and a beat made right in the browser.
import * as THREE from 'three';
import { icon } from './icons.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// A simple runway beat: kick, hi-hat, bass line and soft chords (Web Audio, no files needed).
function startMusic() {
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
  const ctx = new AC(), master = ctx.createGain(); master.gain.value = 0.32; master.connect(ctx.destination);
  const noise = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate); const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  const env = (node, t, a, d, peak) => { node.gain.setValueAtTime(0.0001, t); node.gain.exponentialRampToValueAtTime(peak, t + a); node.gain.exponentialRampToValueAtTime(0.0001, t + a + d); };
  const kick = (t) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.14); env(g, t, 0.005, 0.28, 0.9); o.connect(g).connect(master); o.start(t); o.stop(t + 0.32); };
  const hat = (t, v) => { const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = noise; f.type = 'highpass'; f.frequency.value = 7500; env(g, t, 0.002, 0.05, v); s.connect(f).connect(g).connect(master); s.start(t); s.stop(t + 0.08); };
  const tone = (t, freq, dur, type, v, cutoff) => { const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain(); o.type = type; o.frequency.value = freq; f.type = 'lowpass'; f.frequency.value = cutoff; env(g, t, 0.01, dur, v); o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + dur + 0.05); };
  const hz = (n) => 440 * Math.pow(2, (n - 69) / 12);
  const bass = [45, 45, 57, 45, 48, 48, 43, 43], chords = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]];
  const beat = 60 / 118, sixteenth = beat / 4;
  let next = ctx.currentTime + 0.1, step = 0;
  const timer = setInterval(() => {
    while (next < ctx.currentTime + 0.12) {
      const s = step % 16, bar = Math.floor(step / 16) % 4;
      if (s % 4 === 0) kick(next);
      if (s % 2 === 1) hat(next, s % 4 === 3 ? 0.18 : 0.08);
      if (s % 2 === 0) tone(next, hz(bass[(s / 2) % 8] - 12), sixteenth * 1.6, 'sawtooth', 0.22, 520);
      if (s === 0) for (const n of chords[bar]) tone(next, hz(n), beat * 3.6, 'triangle', 0.05, 1800);
      next += sixteenth; step++;
    }
  }, 25);
  return { stop() { clearInterval(timer); ctx.close(); }, set muted(m) { master.gain.value = m ? 0 : 0.32; } };
}

export async function startRunway(list, { Viewer, Board, fmtFabrics }) {
  if (!list.length) return;
  const el = document.createElement('div');
  el.className = 'runway';
  el.innerHTML = `
    <div class="rw-stage"></div>
    <div class="rw-card" hidden><div class="rw-num"></div><div class="rw-name"></div><div class="rw-fab"></div></div>
    <div class="rw-curtain"><div class="rw-curtain-text">Atelier <em>Studio</em><span>Getting the next look ready…</span></div></div>
    <div class="rw-controls">
      <button data-act="pause" title="Pause">Pause</button>
      <button data-act="next" title="Next look">Next look</button>
      <button data-act="music" title="Music on or off">Music on</button>
      <button data-act="exit" title="Leave the show">${icon('close')}</button>
    </div>`;
  document.body.appendChild(el);
  const host = el.querySelector('.rw-stage'), curtain = el.querySelector('.rw-curtain'), card = el.querySelector('.rw-card');
  const viewer = new Viewer(host);
  // A hidden sketch board to load each design's drawings into.
  const hidden = document.createElement('div'); hidden.style.cssText = 'position:fixed;left:-9999px;top:0;width:8px;height:8px;overflow:hidden';
  const cv = document.createElement('canvas'); hidden.appendChild(cv); document.body.appendChild(hidden);
  const board = new Board(cv);

  // ---- the set ----
  const S = viewer.scene;
  viewer.stage.visible = false; viewer.setBackground('#0b0a0e'); S.fog = new THREE.Fog('#0b0a0e', 7, 24); S.environmentIntensity = 0.45;
  viewer.controls.enabled = false; viewer.key.intensity = 0.9;
  const runway = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 15), new THREE.MeshStandardMaterial({ color: '#f2eee9', roughness: 0.12, metalness: 0.05 }));
  runway.position.set(0, -0.05, -5); runway.receiveShadow = true; S.add(runway);
  for (const sx of [-0.92, 0.92]) { const strip = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, 15), new THREE.MeshBasicMaterial({ color: '#ffd9e6' })); strip.position.set(sx, 0.005, -5); S.add(strip); }
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: '#141118', roughness: 0.9 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -0.1; floor.receiveShadow = true; S.add(floor);
  // Back wall with the studio name in lights.
  const logoTex = new THREE.TextureLoader().load('assets/logo-full.jpg'); logoTex.colorSpace = THREE.SRGBColorSpace;
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), new THREE.MeshBasicMaterial({ map: logoTex }));
  wall.position.set(0, 2.05, -12.6); S.add(wall);
  // The audience on both sides.
  const people = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.17, 0.42, 4, 10), new THREE.MeshStandardMaterial({ color: '#2a2430', roughness: 0.8 }), 120);
  const heads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.12, 12, 10), new THREE.MeshStandardMaterial({ color: '#3a3240', roughness: 0.8 }), 120);
  const M = new THREE.Matrix4(); let n = 0;
  for (const side of [-1, 1]) for (let row = 0; row < 2; row++) for (let i = 0; i < 30 && n < 120; i++, n++) {
    const x = side * (1.9 + row * 0.75 + Math.random() * 0.1), z = -11.5 + i * 0.36, y = 0.45 + row * 0.25 + Math.random() * 0.06;
    M.makeTranslation(x, y, z); people.setMatrixAt(n, M); M.makeTranslation(x, y + 0.43, z); heads.setMatrixAt(n, M);
  }
  S.add(people, heads);
  // Lights: a spotlight follows the model, camera flashes from the crowd.
  const spot = new THREE.SpotLight('#fff3ea', 60, 14, 0.38, 0.5, 1.4); spot.position.set(0, 5, 0); spot.castShadow = true; S.add(spot, spot.target);
  const flashes = Array.from({ length: 5 }, () => { const l = new THREE.PointLight('#ffffff', 0, 6); S.add(l); return l; });
  const cam = viewer.camera; cam.fov = 30; cam.updateProjectionMatrix();

  let H = 1.7, idx = 0, paused = false, skip = false, done = false, phase = 'wait', t = 0, current = null;
  const music = startMusic(); let muted = false;
  const START = -10.5, END = 0.8, SPEED = 1.15;

  viewer.driver = (dt, m) => {
    if (paused || phase === 'wait') return;
    t += dt;
    const step = Math.sin(t * Math.PI * 2 / 1.05);
    if (phase === 'in') {
      m.z = Math.min(END, START + t * SPEED); m.x = 0.028 * step; m.angle = 0.035 * step;
      if (t > 1 && card.hidden) card.hidden = false;
      if (m.z >= END) { phase = 'pose'; t = 0; }
    } else if (phase === 'pose') {
      m.x *= 0.9; m.angle *= 0.9;
      if (t > 1.3) { phase = 'twirl'; t = 0; }
    } else if (phase === 'twirl') {
      const u = Math.min(1, t / 2.3), e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; m.angle = e * Math.PI * 2;
      if (u >= 1) { phase = 'hold'; t = 0; }
    } else if (phase === 'hold') {
      if (t > 0.8) { phase = 'turn'; t = 0; }
    } else if (phase === 'turn') {
      const u = Math.min(1, t / 0.9); m.angle = Math.PI * 2 + u * Math.PI;
      if (u >= 1) { phase = 'out'; t = 0; card.hidden = true; }
    } else if (phase === 'out') {
      m.z = END - t * SPEED; m.x = 0.028 * step; m.angle = Math.PI * 3 + 0.035 * step;
      if (m.z < START + 1.5) { phase = 'wait'; nextLook(); }
    }
    if (skip) { skip = false; phase = 'wait'; card.hidden = true; nextLook(); }
    // Camera and light follow the model.
    viewer.controls.target.set(0, H * 0.52, m.z - 0.3);
    cam.position.set(0, H * 0.62, Math.max(m.z + H * 2.6, 3.2));
    spot.position.set(0, 5, m.z + 1.6); spot.target.position.set(0, 0, m.z);
    for (const f of flashes) { f.intensity *= 0.82; if (Math.random() < dt * 0.7) { f.position.set((Math.random() < 0.5 ? -1 : 1) * (1.8 + Math.random()), 1.2, m.z + (Math.random() - 0.3) * 4); f.intensity = 25; } }
  };

  async function load(d) {
    curtain.classList.add('show'); card.hidden = true;
    await new Promise((r) => setTimeout(r, 450));
    await board.loadLayers({ ...(d.layers || {}), fills: d.fills });
    const spec = viewer.setBody(d.body || { type: 'women', size: 'M', height: 'regular', skin: 'form' }, 1024, 1536);
    H = spec.H;
    viewer.setFit(d.fit || {});
    viewer.move.z = START; viewer.move.x = 0; viewer.move.angle = 0;
    viewer.setDesign(board.textureAtlas(), board.alphaGrid());
    el.querySelector('.rw-num').textContent = `Look ${idx + 1} of ${list.length}`;
    el.querySelector('.rw-name').textContent = d.name;
    el.querySelector('.rw-fab').textContent = fmtFabrics(d);
    curtain.classList.remove('show');
    t = 0; phase = 'in';
  }
  async function nextLook() {
    if (done) return;
    current = list[idx % list.length];
    if (idx >= list.length) { finale(); return; }
    await load(current); idx++;
  }
  function finale() {
    phase = 'wait'; curtain.classList.add('show');
    el.querySelector('.rw-curtain-text span').textContent = 'Thank you for coming to the show!';
    const again = document.createElement('div'); again.className = 'rw-again';
    again.innerHTML = '<button class="btn primary" data-act="again">Watch again</button> <button class="btn" data-act="exit">Back to the studio</button>';
    curtain.firstElementChild.appendChild(again);
  }
  function exit() {
    done = true; viewer.driver = null; viewer.setVisible(false);
    music?.stop();
    viewer.renderer.dispose(); viewer.renderer.forceContextLoss?.();
    el.remove(); hidden.remove();
    window.removeEventListener('keydown', key);
  }
  const key = (e) => { if (e.key === 'Escape') exit(); if (e.key === ' ') { e.preventDefault(); el.querySelector('[data-act="pause"]').click(); } if (e.key === 'ArrowRight') skip = true; };
  window.addEventListener('keydown', key);
  el.addEventListener('click', (e) => {
    const a = e.target.closest('[data-act]')?.dataset.act; if (!a) return;
    if (a === 'exit') exit();
    if (a === 'pause') { paused = !paused; e.target.closest('button').textContent = paused ? 'Play' : 'Pause'; }
    if (a === 'next') { if (phase !== 'wait') skip = true; }
    if (a === 'music') { muted = !muted; if (music) music.muted = muted; e.target.closest('button').textContent = muted ? 'Music off' : 'Music on'; }
    if (a === 'again') { curtain.querySelector('.rw-again')?.remove(); el.querySelector('.rw-curtain-text span').textContent = 'Getting the next look ready…'; idx = 0; nextLook(); }
  });
  viewer.setVisible(true);
  curtain.classList.add('show');
  await nextLook();
  return { exit };
}
