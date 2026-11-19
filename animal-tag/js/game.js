// Wild Tag: the game engine — movement, tagging, abilities, bots, rounds, camera, networking glue.
'use strict';

// ---------- save data ----------
const SAVE_KEY = 'wildtag-save-v1';
const Save = (() => {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) { }
  const d = { gems: 150, owned: { animals: [], patterns: ['solid', 'stripe1'], perks: [], wear: [] },
    sel: { animal: 'gorilla', perks: [], looks: {}, wear: {} }, stats: { wins: 0, tags: 0, rounds: 0 },
    name: 'Player' + (100 + Math.random() * 900 | 0), settings: { bots: 7, diff: 'normal', mode: 'infection', sens: 1, sound: true, roomBots: 4 }, lastDaily: '' };
  s = Object.assign(d, s || {});
  s.owned = Object.assign(d.owned, s.owned); s.sel = Object.assign(d.sel, s.sel); s.stats = Object.assign(d.stats, s.stats); s.settings = Object.assign(d.settings, s.settings);
  ANIMALS.forEach(a => { if (a.price === 0 && !s.owned.animals.includes(a.id)) s.owned.animals.push(a.id); });
  return s;
})();
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(Save)); } catch (e) { } }
function myLook(animalId) {
  const a = CREATURE[animalId], l = Save.sel.looks[animalId] || {};
  return { pattern: l.pattern || a.defPattern || 'solid', c1: l.c1 || a.c1, c2: l.c2 || a.c2, wear: Object.assign({}, Save.sel.wear) };
}

// ---------- three.js setup ----------
let renderer, scene, camera, clock, sun;
const keys = {};
const G = {
  critters: new Map(), localId: 'me', objs: [], objId: 1,
  mode: 'infection', phase: 'lobby', timer: 0, paused: true, started: false,
  camYaw: 0, camPitch: 0.35, camDist: 7, feed: [], startIts: [], lastSnap: 0, lastSend: 0,
  timeslow: 0, blind: 0, results: null,
};

function initGame() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById('game').appendChild(renderer.domElement);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 600);
  scene.add(new THREE.HemisphereLight('#e8f6ff', '#5a7a4a', 0.85));
  sun = new THREE.DirectionalLight('#fff4dd', 1.0);
  sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -40, right: 40, top: 40, bottom: -40, near: 1, far: 160 });
  scene.add(sun); scene.add(sun.target);
  buildWorld(scene);
  clock = new THREE.Clock();
  addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; G._shift = null; camera.clearViewOffset(); camera.updateProjectionMatrix(); });
  setupInput();
  spawnLocal();
  requestAnimationFrame(loop);
}

// ---------- critters ----------
class Critter {
  constructor(id, kind, name, animalId, look, perks) {
    this.id = id; this.kind = kind; this.name = name; this.perks = perks || [];
    this.pos = new THREE.Vector3(); this.vel = new THREE.Vector3(); this.ry = 0;
    this.target = null; this.it = false; this.frozen = false; this.tags = 0; this.itTime = 0;
    this.fx = {}; this.cd = 0; this.grounded = false; this.wallN = null; this.wallT = 9; this.coyote = 0; this.airJumps = 0;
    this.move = 0; this.flags = 0; this.secondWind = false; this.spawnShield = 0; this.noTagFrom = null; this.noTagT = 0;
    this.ai = { t: 0, goal: null, stuckT: 0, lastPos: new THREE.Vector3(), wander: null, abilityT: 1 + Math.random() * 2 };
    this.setAnimal(animalId, look);
  }
  get def() { return CREATURE[this.animal]; }
  get radius() { return 0.45 * this.def.size * (this.fx.shrink > 0 ? 0.5 : 1); }
  get height() { return 1.6 * this.def.size * (this.fx.shrink > 0 ? 0.5 : 1); }
  has(perk) { return this.perks.includes(perk); }
  setAnimal(animalId, look) {
    this.animal = CREATURE[animalId] ? animalId : 'gorilla'; this.look = look || {};
    if (this.mesh) scene.remove(this.root);
    this.root = new THREE.Group(); scene.add(this.root);
    this.mesh = buildCreature(this.def, this.look); this.root.add(this.mesh);
    this.rig = this.mesh.userData.rig;
    this.origEmissive = this.rig.mats.map(m => ({ c: m.emissive.clone(), i: m.emissiveIntensity, map: m.emissiveMap }));
    this.label = makeLabel(this.name, this.kind === 'local'); this.label.position.y = this.def.size * 2.1 + 0.4; this.root.add(this.label);
    this.ice = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2, 1.4), new THREE.MeshStandardMaterial({ color: '#bfefff', transparent: true, opacity: .45, roughness: .1 }));
    this.ice.scale.setScalar(this.def.size); this.ice.position.y = this.def.size; this.ice.visible = false; this.root.add(this.ice);
    this.bubble = new THREE.Mesh(new THREE.SphereGeometry(1.3, 20, 14), new THREE.MeshStandardMaterial({ color: '#7ff0ff', transparent: true, opacity: .25, emissive: '#3ad6ff', emissiveIntensity: .4 }));
    this.bubble.scale.setScalar(this.def.size); this.bubble.position.y = this.def.size * 0.9; this.bubble.visible = false; this.root.add(this.bubble);
    this.mound = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#6b4a2b' }));
    this.mound.visible = false; this.root.add(this.mound);
    this.itRing = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.08, 8, 20), new THREE.MeshBasicMaterial({ color: '#ff3b2f' }));
    this.itRing.rotation.x = Math.PI / 2; this.itRing.position.y = this.def.size * 2.1 + 0.95; this.itRing.visible = false; this.root.add(this.itRing);
    this._lastVis = '';
  }
  remove() { scene.remove(this.root); }
}

function makeLabel(text, me) {
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 64;
  const g = cv.getContext('2d'); g.font = 'bold 30px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  const w = Math.min(250, g.measureText(text).width + 24);
  g.fillStyle = me ? 'rgba(255,210,63,.85)' : 'rgba(0,0,0,.5)'; roundRect(g, 128 - w / 2, 10, w, 44, 14); g.fill();
  g.fillStyle = me ? '#1d1208' : '#fff'; g.fillText(text, 128, 33);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), depthTest: false, transparent: true }));
  sp.scale.set(2, 0.5, 1); sp.renderOrder = 10; return sp;
}
function roundRect(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }

function local() { return G.critters.get(G.localId); }
function spawnLocal() {
  const old = local(); if (old) old.remove();
  const c = new Critter(G.localId, 'local', Save.name, Save.sel.animal, myLook(Save.sel.animal), Save.sel.perks.slice());
  G.critters.set(G.localId, c); placeAtSpawn(c, 0);
  if (old) { c.it = old.it; c.frozen = old.frozen; c.tags = old.tags; c.pos.copy(old.pos); c.ry = old.ry; }
  return c;
}
function refreshLocalLook() {
  const c = local(); if (!c) return;
  c.perks = Save.sel.perks.slice();
  if (c.animal !== Save.sel.animal || JSON.stringify(c.look) !== JSON.stringify(myLook(Save.sel.animal))) { c.name = Save.name; c.setAnimal(Save.sel.animal, myLook(Save.sel.animal)); }
  if (Net.online && !Net.isHost) Net.send(helloMsg());
  if (Net.online && Net.isHost) broadcastRoster();
}
function placeAtSpawn(c, i) {
  const s = World.spawns[i % World.spawns.length];
  c.pos.set(s.x + (Math.random() - .5) * 2, 0.5, s.z + (Math.random() - .5) * 2); c.vel.set(0, 0, 0);
  c.ry = Math.atan2(-s.x, -s.z);
  if (c.kind === 'local') G.camYaw = c.ry;
}

function addBots(n) {
  const names = BOT_NAMES.slice().sort(() => Math.random() - .5);
  const diff = Save.settings.diff;
  for (let i = 0; i < n; i++) {
    const pool = Math.random() < (diff === 'hard' ? 0.25 : 0.12) ? MYTHICS : ANIMALS;
    const a = pool[Math.random() * pool.length | 0];
    const pats = PATTERNS.filter(p => p.price <= 500);
    const slotPick = (slot) => Math.random() < 0.45 ? (() => { const l = WEARABLES.filter(w => w.slot === slot); return l[Math.random() * l.length | 0].id; })() : undefined;
    const look = Math.random() < 0.5 ? { pattern: a.defPattern || 'solid', c1: a.c1, c2: a.c2 } : { pattern: pats[Math.random() * pats.length | 0].id, c1: a.c1, c2: a.c2 };
    look.wear = { hat: slotPick('hat'), face: slotPick('face'), neck: Math.random() < .5 ? slotPick('neck') : undefined, back: Math.random() < .4 ? slotPick('back') : undefined };
    const perks = Math.random() < 0.5 ? [PERKS[Math.random() * 6 | 0].id] : [];
    const c = new Critter('bot' + (G.objId++), 'bot', names[i % names.length], a.id, look, perks);
    G.critters.set(c.id, c); placeAtSpawn(c, i + 1);
  }
}
function clearBots() { for (const [id, c] of G.critters) if (c.kind === 'bot') { c.remove(); G.critters.delete(id); } }

// ---------- input ----------
const touch = { mx: 0, mz: 0, jump: false, active: false };
function setupInput() {
  addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    keys[e.code] = true;
    if (e.code === 'KeyE' || e.code === 'KeyF') tryAbility();
    if (e.code === 'Tab') { e.preventDefault(); UI.score(true); }
    if (e.code === 'Space') e.preventDefault();
  });
  addEventListener('keyup', e => { keys[e.code] = false; if (e.code === 'Tab') UI.score(false); });
  const cv = renderer.domElement;
  cv.addEventListener('click', () => { if (!G.paused && !isTouch() && document.pointerLockElement !== cv) cv.requestPointerLock && cv.requestPointerLock(); });
  addEventListener('mousemove', e => {
    if (document.pointerLockElement !== cv) return;
    const s = 0.0025 * Save.settings.sens;
    G.camYaw -= e.movementX * s; G.camPitch = Math.max(-0.4, Math.min(1.25, G.camPitch + e.movementY * s));
  });
  addEventListener('mousedown', e => { if (document.pointerLockElement === cv && e.button === 2) tryAbility(); });
  addEventListener('contextmenu', e => { if (document.pointerLockElement === cv) e.preventDefault(); });
  addEventListener('wheel', e => { if (!G.paused) G.camDist = Math.max(3, Math.min(14, G.camDist + Math.sign(e.deltaY) * 0.8)); }, { passive: true });
  document.addEventListener('pointerlockchange', () => { if (document.pointerLockElement !== cv && !G.paused && !isTouch()) UI.openMenu(); });
  setupTouch();
}
function isTouch() { return matchMedia('(pointer: coarse)').matches; }
function setupTouch() {
  const stick = document.getElementById('stick'), knob = document.getElementById('knob');
  let stickId = null, lookId = null, sx = 0, sy = 0, lx = 0, ly = 0;
  addEventListener('touchstart', e => {
    if (G.paused) return;
    for (const t of e.changedTouches) {
      if (t.target.closest && t.target.closest('.tbtn, .menu, .hudbtn')) continue;
      if (t.clientX < innerWidth * 0.45 && stickId === null) { stickId = t.identifier; sx = t.clientX; sy = t.clientY; stick.style.left = (sx - 60) + 'px'; stick.style.top = (sy - 60) + 'px'; stick.classList.add('on'); }
      else if (lookId === null) { lookId = t.identifier; lx = t.clientX; ly = t.clientY; }
    }
  }, { passive: true });
  addEventListener('touchmove', e => {
    for (const t of e.changedTouches) {
      if (t.identifier === stickId) { let dx = t.clientX - sx, dy = t.clientY - sy; const d = Math.hypot(dx, dy), m = 50; if (d > m) { dx *= m / d; dy *= m / d; } knob.style.transform = `translate(${dx}px,${dy}px)`; touch.mx = dx / m; touch.mz = -dy / m; touch.active = true; }
      if (t.identifier === lookId) { G.camYaw -= (t.clientX - lx) * 0.006 * Save.settings.sens; G.camPitch = Math.max(-0.4, Math.min(1.25, G.camPitch + (t.clientY - ly) * 0.006 * Save.settings.sens)); lx = t.clientX; ly = t.clientY; }
    }
  }, { passive: true });
  const end = e => { for (const t of e.changedTouches) { if (t.identifier === stickId) { stickId = null; touch.mx = touch.mz = 0; touch.active = false; knob.style.transform = ''; stick.classList.remove('on'); } if (t.identifier === lookId) lookId = null; } };
  addEventListener('touchend', end); addEventListener('touchcancel', end);
  const jb = document.getElementById('tjump'), ab = document.getElementById('tab');
  jb.addEventListener('touchstart', e => { e.preventDefault(); touch.jump = true; touch.jumpPress = true; });
  jb.addEventListener('touchend', e => { e.preventDefault(); touch.jump = false; });
  ab.addEventListener('touchstart', e => { e.preventDefault(); tryAbility(); });
}
function localInput(c) {
  let f = 0, r = 0;
  if (keys.KeyW || keys.ArrowUp) f += 1; if (keys.KeyS || keys.ArrowDown) f -= 1;
  if (keys.KeyD || keys.ArrowRight) r += 1; if (keys.KeyA || keys.ArrowLeft) r -= 1;
  if (touch.active) { f = touch.mz; r = touch.mx; }
  const y = G.camYaw, fx = Math.sin(y), fz = Math.cos(y), rx = -Math.cos(y), rz = Math.sin(y);
  let mx = fx * f + rx * r, mz = fz * f + rz * r; const l = Math.hypot(mx, mz); if (l > 1) { mx /= l; mz /= l; }
  const jumpHeld = !!keys.Space || touch.jump;
  const jumpPress = jumpHeld && !G._jumpWas; G._jumpWas = jumpHeld;
  return { mx, mz, jump: jumpPress || !!touch.jumpPress, hold: jumpHeld, down: !!(keys.KeyC || keys.ControlLeft) };
}

// ---------- movement physics ----------
const GRAV = 28;
function speedOf(c) {
  const d = c.def, fx = c.fx;
  let s = d.spd * (c.it ? 1.04 : 1) * (c.has('speedpaws') ? 1.08 : 1);
  if (c.kind === 'bot') s *= { easy: 0.84, normal: 0.94, hard: 1.0 }[Save.settings.diff] || 0.94;
  if (fx.sprint > 0) s *= 1.7; if (fx.shrink > 0) s *= 1.25; if (fx.spikeball > 0) s *= 1.45;
  if (fx.burrow > 0) s *= 0.75; if (fx.slow > 0) s *= 0.45; if (fx.timeslow > 0) s *= 0.4; if (fx.glide > 0 && !c.grounded) s *= 1.3;
  if (c.fx.fly > 0) s *= 1.15;
  return s;
}
function stepCritter(c, inp, dt) {
  const fx = c.fx, d = c.def;
  for (const k in fx) if (fx[k] > 0) fx[k] -= dt;
  c.cd = Math.max(0, c.cd - dt); c.spawnShield -= dt; c.noTagT -= dt; c.wallT += dt; c.coyote -= dt;
  const stuck = fx.stun > 0 || c.frozen || (G.phase === 'countdown' && c.it && false);
  let mx = stuck ? 0 : inp.mx, mz = stuck ? 0 : inp.mz;
  if (fx.blind > 0 && c.kind === 'bot') { mx = Math.sin(G.t * 2 + c.pos.x); mz = Math.cos(G.t * 1.7 + c.pos.z); }
  const spd = speedOf(c);
  const want = new THREE.Vector3(mx * spd, 0, mz * spd);
  if (fx.slide > 0 || fx.charge > 0) { const f = fx.charge > 0 ? 24 : 19; want.set(Math.sin(c.ry) * f, 0, Math.cos(c.ry) * f); }
  const accel = c.grounded ? 55 : (fx.fly > 0 || fx.glide > 0 ? 30 : 16);
  const hv = new THREE.Vector3(c.vel.x, 0, c.vel.z);
  const diff = want.clone().sub(hv); const maxD = accel * dt;
  if (diff.length() > maxD) diff.setLength(maxD);
  // keep momentum from launches: only accelerate toward want if not much faster already
  if (hv.length() > spd * 1.3 && !c.grounded && want.lengthSq() < 0.01) diff.multiplyScalar(0.1);
  c.vel.x += diff.x; c.vel.z += diff.z;
  if (c.grounded && hv.length() > spd * 1.4 && !(fx.slide > 0 || fx.charge > 0)) { c.vel.x *= 1 - 6 * dt; c.vel.z *= 1 - 6 * dt; }

  // facing
  if (!stuck && (mx * mx + mz * mz) > 0.01 && !(fx.slide > 0 || fx.charge > 0)) {
    const tr = Math.atan2(mx, mz); let dr = tr - c.ry; dr = Math.atan2(Math.sin(dr), Math.cos(dr)); c.ry += dr * Math.min(1, dt * 12);
  }

  // jumping: ground, coyote, wall push (like swinging off a tree), double jump
  if (c.grounded) { c.coyote = 0.12; c.airJumps = c.has('doublejump') ? 1 : 0; }
  if (inp.jump && !stuck && fx.fly <= 0 && fx.burrow <= 0) {
    if (c.coyote > 0) { c.vel.y = d.jmp; c.coyote = 0; c.grounded = false; sfx(c, 'jump'); }
    else if (c.wallN && c.wallT < 0.25) {
      const p = (c.has('walljumper') ? 1.4 : 1) * d.climb;
      c.vel.y = d.jmp * (0.85 + 0.1 * p); c.vel.x += c.wallN.x * 7 * p; c.vel.z += c.wallN.z * 7 * p; c.wallT = 9; sfx(c, 'jump');
      c.ry = Math.atan2(c.vel.x, c.vel.z);
    } else if (c.airJumps > 0) { c.airJumps--; c.vel.y = d.jmp * 0.9; sfx(c, 'jump'); }
  }
  // gravity / flight / glide / climb
  if (fx.fly > 0) { c.vel.y += ((inp.hold ? 8 : inp.down ? -8 : 0) - c.vel.y) * Math.min(1, dt * 5); }
  else {
    let g = GRAV; if (c.has('featherfall') && c.vel.y < 0) g *= 0.6;
    if (fx.timeslow > 0) g *= 0.6;
    c.vel.y -= g * dt;
    if (fx.glide > 0 && c.vel.y < -2.2) c.vel.y = -2.2;
  }
  if (fx.climb > 0 && c.wallN && c.wallT < 0.15 && (mx * -c.wallN.x + mz * -c.wallN.z) > 0.3) c.vel.y = 8;
  if (c.vel.y < -40) c.vel.y = -40;

  // integrate with sub-steps
  const steps = Math.max(1, Math.ceil(c.vel.length() * dt / 0.3));
  const sdt = dt / steps; let res;
  c.grounded = false;
  for (let i = 0; i < steps; i++) {
    const prev = c.pos.clone();
    c.pos.addScaledVector(c.vel, sdt);
    res = collide(c.pos, prev, c.radius, c.height, c.vel, true);
    if (res.ground) { if (c.vel.y < 0) c.vel.y = 0; c.grounded = true; }
    if (res.head && c.vel.y > 0) c.vel.y = 0;
    if (res.wall) {
      c.wallN = res.wall; c.wallT = 0;
      const vn = c.vel.x * res.wall.x + c.vel.z * res.wall.z; if (vn < 0) { c.vel.x -= vn * res.wall.x; c.vel.z -= vn * res.wall.z; }
      if (fx.charge > 0) fx.charge = 0;
    }
  }
  // mushroom jump pads
  for (const p of World.pads) if (Math.hypot(c.pos.x - p.x, c.pos.z - p.z) < p.r + c.radius && c.pos.y < p.y + 0.6 && c.pos.y > 0.4 && c.vel.y <= 0) { c.vel.y = 22; c.grounded = false; sfx(c, 'boing'); }
  if (c.pos.y < 2.6 && c.pos.y > 0) for (const p of World.pads) if (Math.hypot(c.pos.x - p.x, c.pos.z - p.z) < p.r && c.vel.y <= 0 && c.pos.y < p.y) { c.pos.y = p.y; c.vel.y = 22; sfx(c, 'boing'); }
  if (c.pos.y < -20) placeAtSpawn(c, Math.random() * 16 | 0);
  c.move = Math.min(1, Math.hypot(c.vel.x, c.vel.z) / 9);
  if (c.it) c.itTime += dt;
}

// ---------- abilities ----------
function abilityOf(c) { return c.def.ab; }
function tryAbility() {
  const c = local(); if (!c || G.paused || c.frozen || c.fx.stun > 0) return;
  if (G.phase === 'end') return;
  useAbility(c);
}
function others(c) { const out = []; for (const o of G.critters.values()) if (o !== c && !(o.fx.burrow > 0)) out.push(o); return out; }
function nearest(c, r, filter) { let best = null, bd = r; for (const o of others(c)) { if (filter && !filter(o)) continue; const d = o.pos.distanceTo(c.pos); if (d < bd) { bd = d; best = o; } } return best; }
function fwd(c) { return new THREE.Vector3(Math.sin(c.ry), 0, Math.cos(c.ry)); }

function useAbility(c) {
  if (c.cd > 0) return false;
  const ab = abilityOf(c); c.cd = ab.cd * (c.has('quickcharge') ? 0.7 : 1);
  const fx = c.fx, f = fwd(c);
  switch (ab.id) {   // the part that only changes yourself
    case 'climb': fx.climb = ab.dur; break;
    case 'burrow': fx.burrow = ab.dur; break;
    case 'slide': fx.slide = ab.dur; c.vel.y = Math.min(c.vel.y, 0); break;
    case 'sprint': fx.sprint = ab.dur; break;
    case 'superjump': c.vel.y = c.def.jmp * 1.9; c.grounded = false; break;
    case 'invis': fx.invis = ab.dur; break;
    case 'charge': fx.charge = ab.dur; break;
    case 'glide': fx.glide = ab.dur; if (c.grounded) c.vel.y = c.def.jmp * 0.8; break;
    case 'shield': fx.shield = ab.dur; break;
    case 'blink': { const to = c.pos.clone().addScaledVector(f, ab.r); to.x = clampB(to.x); to.z = clampB(to.z); to.y += 0.5; c.pos.copy(to); c.vel.set(f.x * 6, 3, f.z * 6); break; }
    case 'shrink': fx.shrink = ab.dur; break;
    case 'fly': fx.fly = ab.dur; c.vel.y = 6; break;
    case 'spikeball': fx.spikeball = ab.dur; break;
    case 'firetrail': fx.charge = ab.dur; fx.firetrail = ab.dur; break;
    case 'divebomb': c.vel.y = 26; c.grounded = false; c.dive = 0.75; break;
    case 'foxfire': fx.invis = ab.dur; break;
    case 'pounce': { const t = nearest(c, ab.r, o => o.it !== c.it || G.mode === 'classic'); const dir = t ? t.pos.clone().sub(c.pos) : f.clone().multiplyScalar(10); const h = Math.hypot(dir.x, dir.z) || 1; c.vel.set(dir.x / h * 20, 8 + Math.max(0, dir.y) * 1.2, dir.z / h * 20); c.ry = Math.atan2(dir.x, dir.z); c.grounded = false; break; }
  }
  sfx(c, 'ability');
  if (Net.online && !Net.isHost && c.kind === 'local') Net.send({ t: 'ab', ry: c.ry, p: [c.pos.x, c.pos.y, c.pos.z] });
  else abilityOthers(c);
  return true;
}
function clampB(v) { return Math.max(-World.half + 1, Math.min(World.half - 1, v)); }

// The part that changes other animals or makes world objects. Runs on the host only.
function abilityOthers(c) {
  const ab = abilityOf(c), f = fwd(c);
  switch (ab.id) {
    case 'roar': case 'freeze': case 'thunder':
      for (const o of others(c)) if (o.pos.distanceTo(c.pos) < ab.r) applyFx(o, 'stun', ab.dur, ab.id === 'freeze' ? 'ice' : null);
      vfx(ab.id === 'thunder' ? 'bolt' : ab.id === 'freeze' ? 'frost' : 'ring', c.pos, ab.r, c.def.glow || '#ffd23f'); break;
    case 'tongue': { const t = nearest(c, ab.r); if (t) { pullTo(t, c, 16); vfx('line', c.pos, 0, '#ff6fa0', t.pos); } break; }
    case 'megatongue': for (const o of others(c)) if (o.pos.distanceTo(c.pos) < ab.r) { pullTo(o, c, 18); vfx('line', c.pos, 0, '#7ff0ff', o.pos); } break;
    case 'slowzone': for (const o of others(c)) if (o.pos.distanceTo(c.pos) < ab.r) applyFx(o, 'slow', ab.dur); vfx('ring', c.pos, ab.r, '#c8a2ff'); break;
    case 'timewarp': for (const o of others(c)) applyFx(o, 'timeslow', ab.dur); vfx('warp', c.pos, 40, '#ffd27a'); break;
    case 'stink': for (const o of others(c)) { const d = o.pos.clone().sub(c.pos); if (d.length() < ab.r) { d.y = 0; d.setLength(16); applyImpulse(o, d.x, 6, d.z); applyFx(o, 'slow', 1.5); } } addObj('cloud', c.pos, ab.r, ab.dur, c, '#9adf5a'); break;
    case 'ink': addObj('ink', c.pos, ab.r, ab.dur, c, '#2a1a3a'); break;
    case 'web': addObj('web', c.pos, ab.r, ab.dur, c, '#ffffff'); break;
    case 'decoy': addDecoy(c, f, ab.dur); break;
    case 'foxfire': for (let i = -1; i <= 1; i++) { const a = c.ry + i * 0.9; addDecoy(c, new THREE.Vector3(Math.sin(a), 0, Math.cos(a)), ab.dur, true); } break;
  }
}
function pullTo(o, c, s) { const d = c.pos.clone().sub(o.pos); d.y = 0; const l = d.length(); if (l < 0.5) return; d.setLength(Math.min(s, l * 2.2)); applyImpulse(o, d.x, 7, d.z); applyFx(o, 'stun', 0.5); }

// apply an effect to any animal, even one on another computer
function applyFx(o, k, dur, extra) {
  if (o.fx.shield > 0 || o.fx.spikeball > 0) return;
  if (o.kind === 'remote') Net.sendTo(o.id, { t: 'fx', k, d: dur });
  else o.fx[k] = Math.max(o.fx[k] || 0, dur);
  if (extra === 'ice') o.iceT = dur;
}
function applyImpulse(o, x, y, z) {
  if (o.fx.shield > 0) return;
  if (o.kind === 'remote') Net.sendTo(o.id, { t: 'imp', v: [x, y, z] });
  else { o.vel.x = x; o.vel.y = y; o.vel.z = z; o.grounded = false; }
}

// ---------- world objects: ink, webs, fire, clouds, decoys ----------
function addObj(type, pos, r, dur, owner, color) {
  const o = { id: G.objId++, type, x: pos.x, y: pos.y, z: pos.z, r, life: dur, owner: owner && owner.id, color };
  G.objs.push(o); makeObjMesh(o); return o;
}
function addDecoy(c, dir, dur, ghost) {
  const o = addObj('decoy', c.pos, 1, dur, c, null);
  o.dx = dir.x; o.dz = dir.z; o.ry = Math.atan2(dir.x, dir.z); o.animal = c.animal; o.look = c.look; o.ghost = !!ghost; o.it = c.it;
  makeObjMesh(o, true);
}
function makeObjMesh(o, force) {
  if (o.mesh && !force) return;
  if (o.mesh) scene.remove(o.mesh);
  let m;
  if (o.type === 'decoy') {
    if (!o.animal) return;
    m = buildCreature(CREATURE[o.animal], o.look || {});
    if (o.ghost) m.traverse(n => { if (n.material) { n.material = n.material.clone(); n.material.transparent = true; n.material.opacity = 0.55; n.material.emissive = new THREE.Color('#9a6bff'); n.material.emissiveIntensity = 0.6; } });
    const wrap = new THREE.Group(); wrap.add(m); wrap.add(makeLabel(nameOf(o.owner), false)); wrap.children[1].position.y = CREATURE[o.animal].size * 2.1 + 0.4; m = wrap;
  } else if (o.type === 'web') {
    m = new THREE.Group();
    const mat = new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: .85 });
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; m.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * o.r, 0, Math.sin(a) * o.r)]), mat)); }
    for (let k = 1; k <= 4; k++) { const pts = []; for (let i = 0; i <= 8; i++) { const a = i / 8 * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * o.r * k / 4, 0, Math.sin(a) * o.r * k / 4)); } m.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat)); }
    m.position.y = 0.08;
  } else if (o.type === 'fire') {
    m = new THREE.Group();
    for (let i = 0; i < 3; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.4 - i * 0.1, 1.2 - i * 0.2, 7), new THREE.MeshBasicMaterial({ color: ['#ff3b1f', '#ff9a1f', '#ffe14a'][i], transparent: true, opacity: .85 })); f.position.y = 0.6 - i * 0.1; m.add(f); }
  } else {
    m = new THREE.Mesh(new THREE.SphereGeometry(o.r, 18, 12), new THREE.MeshBasicMaterial({ color: o.color || '#2a1a3a', transparent: true, opacity: o.type === 'ink' ? 0.75 : 0.4, depthWrite: false }));
    m.position.y = 1;
  }
  const holder = new THREE.Group(); holder.add(m); holder.position.set(o.x, o.y, o.z); scene.add(holder); o.mesh = holder;
}
function nameOf(id) { const c = G.critters.get(id); return c ? c.name : ''; }
function removeObj(o) { if (o.mesh) scene.remove(o.mesh); }

function updateObjs(dt, host) {
  for (const o of G.objs) {
    if (host) o.life -= dt;
    if (o.type === 'decoy' && host) {
      const p = { x: o.x + o.dx * 9 * dt, y: o.y, z: o.z + o.dz * 9 * dt }, prev = { x: o.x, y: o.y, z: o.z };
      const v = { y: -1 }; o.y = Math.max(0, o.y - 10 * dt); p.y = o.y;
      const r = collide(p, prev, 0.4, 1.5, v, true);
      if (r.wall) { const a = Math.atan2(o.dx, o.dz) + (Math.random() < .5 ? 1.6 : -1.6); o.dx = Math.sin(a); o.dz = Math.cos(a); }
      o.x = clampB(p.x); o.y = p.y; o.z = clampB(p.z); o.ry = Math.atan2(o.dx, o.dz);
    }
    if (o.mesh) {
      o.mesh.position.set(o.x, o.y, o.z);
      if (o.type === 'decoy') { o.mesh.rotation.y = o.ry || 0; const m = o.mesh.children[0]; if (m.userData.rig) animateCreature(m, G.t, 1, false, false, CREATURE[o.animal]); }
      if (o.type === 'fire') o.mesh.children[0].scale.y = 1 + Math.sin(G.t * 20 + o.id) * 0.2;
      if ((o.type === 'ink' || o.type === 'cloud') && o.life < 1) o.mesh.children[0].material.opacity = Math.max(0, o.life) * (o.type === 'ink' ? 0.75 : 0.4);
    }
    if (!host) continue;
    // effects of objects on animals
    for (const c of G.critters.values()) {
      if (c.id === o.owner) continue;
      const dx = c.pos.x - o.x, dz = c.pos.z - o.z, dist = Math.hypot(dx, dz), dy = Math.abs(c.pos.y - o.y);
      if (o.type === 'web' && dist < o.r && dy < 1.2) applyFx(c, 'slow', 0.4);
      if (o.type === 'ink' && dist < o.r && dy < o.r) { if (c.kind === 'remote') { if (!c._inkT || G.t - c._inkT > 0.3) { c._inkT = G.t; applyFx(c, 'blind', 0.5); } } else c.fx.blind = Math.max(c.fx.blind || 0, 0.5); }
      if (o.type === 'fire' && dist < 1 && dy < 1.5 && !(c._fireT > G.t)) { c._fireT = G.t + 2; applyFx(c, 'stun', 1.2); vfx('ring', c.pos, 2, '#ff5a1f'); }
      if (o.type === 'decoy' && c.it && !o.it && dist < 1.4 && dy < 2) { o.life = 0; vfx('puff', { x: o.x, y: o.y + 1, z: o.z }, 2, '#c8a2ff'); }
    }
  }
  if (host) {
    for (const o of G.objs) if (o.life <= 0) removeObj(o);
    G.objs = G.objs.filter(o => o.life > 0);
  }
}

// ---------- visual effects ----------
const vfxList = [];
function vfx(kind, pos, r, color, to, fromNet) {
  if (Net.online && Net.isHost && !fromNet) Net.broadcast({ t: 'vfx', k: kind, p: [pos.x, pos.y, pos.z], r, c: color, to: to ? [to.x, to.y, to.z] : null });
  let m;
  if (kind === 'line' && to) {
    const a = new THREE.Vector3(pos.x, pos.y + 1, pos.z), b = new THREE.Vector3(to.x, to.y + 1, to.z);
    m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, a.distanceTo(b), 6), new THREE.MeshBasicMaterial({ color, transparent: true }));
    m.position.copy(a).lerp(b, 0.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  } else if (kind === 'bolt') {
    m = new THREE.Group();
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2, x = pos.x + Math.cos(a) * r * 0.5, z = pos.z + Math.sin(a) * r * 0.5; const b = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 30, 4), new THREE.MeshBasicMaterial({ color, transparent: true })); b.position.set(x, 15, z); m.add(b); }
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, 1, 40), new THREE.MeshBasicMaterial({ color, transparent: true, side: THREE.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.set(pos.x, pos.y + 0.2, pos.z); ring.userData.grow = r; m.add(ring);
  } else if (kind === 'warp') {
    m = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .3, side: THREE.BackSide })); m.position.set(pos.x, pos.y + 1, pos.z); m.userData.grow = r;
  } else {
    m = new THREE.Mesh(new THREE.RingGeometry(0.6, 1, 40), new THREE.MeshBasicMaterial({ color, transparent: true, side: THREE.DoubleSide }));
    m.rotation.x = -Math.PI / 2; m.position.set(pos.x, pos.y + 0.3, pos.z); m.userData.grow = r || 3;
  }
  scene.add(m); vfxList.push({ m, t: 0, life: kind === 'line' ? 0.35 : 0.7 });
  if (kind === 'frost') { for (const c of G.critters.values()) { } }
}
function updateVfx(dt) {
  for (let i = vfxList.length - 1; i >= 0; i--) {
    const v = vfxList[i]; v.t += dt; const k = v.t / v.life;
    v.m.traverse(n => { if (n.material) n.material.opacity = 1 - k; if (n.userData.grow) n.scale.setScalar(Math.max(0.01, n.userData.grow * k)); });
    if (v.m.userData.grow) v.m.scale.setScalar(Math.max(0.01, v.m.userData.grow * k));
    if (k >= 1) { scene.remove(v.m); vfxList.splice(i, 1); }
  }
}

// ---------- tagging & rounds (host only) ----------
function tagReach(a, b) { return a.radius + b.radius + 0.55 + (a.has('longarms') ? 0.8 : 0); }
function checkTags() {
  if (G.phase !== 'play') return;
  const list = [...G.critters.values()];
  for (const a of list) {
    if (!a.it || a.frozen || a.fx.stun > 0 || a.fx.burrow > 0) continue;
    for (const b of list) {
      if (b === a || b.it || b.frozen) continue;
      const dx = a.pos.x - b.pos.x, dz = a.pos.z - b.pos.z;
      if (Math.hypot(dx, dz) > tagReach(a, b) || Math.abs(a.pos.y - b.pos.y) > 1.8) continue;
      if (b.fx.burrow > 0 || b.fx.shield > 0 || b.spawnShield > 0) continue;
      if (G.mode === 'classic' && b.noTagFrom === a.id && b.noTagT > 0) continue;
      if (b.fx.spikeball > 0) { applyImpulse(a, dx * 6, 7, dz * 6); applyFx(a, 'stun', 1); vfx('ring', b.pos, 2, '#d8b28a'); continue; }
      if (b.has('secondwind') && !b.secondWind) { b.secondWind = true; if (b.kind === 'remote') Net.sendTo(b.id, { t: 'fx', k: 'shield', d: 1.5 }); else b.fx.shield = 1.5; vfx('ring', b.pos, 2, '#7ff0ff'); feed(`💨 ${b.name} dodged with Second Wind!`); continue; }
      doTag(a, b);
      if (G.mode === 'classic') return;
    }
  }
  // freeze tag: free frozen friends
  if (G.mode === 'freeze') for (const a of list) {
    if (a.it || a.frozen) continue;
    for (const b of list) if (b.frozen && a.pos.distanceTo(b.pos) < tagReach(a, b) + 0.3) { b.frozen = false; b.spawnShield = 1.5; feed(`🧊 ${a.name} unfroze ${b.name}`); sfxAt(b, 'unfreeze'); }
  }
}
function doTag(a, b) {
  a.tags++;
  sfxAt(b, 'tag'); vfx('ring', b.pos, 2.5, '#ff3b2f');
  if (G.mode === 'infection') { b.it = true; feed(`🔥 ${a.name} tagged ${b.name}!`); }
  else if (G.mode === 'classic') { b.it = true; a.it = false; b.noTagFrom = a.id; b.noTagT = 3; applyFx(b, 'stun', 1.0); feed(`👉 ${a.name} tagged ${b.name} — ${b.name} is IT!`); }
  else if (G.mode === 'freeze') { b.frozen = true; feed(`❄️ ${a.name} froze ${b.name}!`); }
  if (b.kind === 'local') UI.flash(G.mode === 'freeze' ? 'You are FROZEN! Wait for a friend.' : G.mode === 'classic' ? 'You are IT! Tag someone!' : 'You got tagged! Now YOU are IT!');
  if (a.kind === 'local') UI.flash(G.mode === 'freeze' ? 'Froze ' + b.name + '!' : 'Tagged ' + b.name + '!');
  broadcastSnap(true);
}
function feed(text) { G.feed.unshift({ text, t: 6 }); G.feed.length = Math.min(G.feed.length, 6); if (Net.online && Net.isHost) Net.broadcast({ t: 'feed', text }); }

function startRound() {
  G.mode = Save.settings.mode;
  G.phase = 'countdown'; G.timer = 4; G.results = null;
  for (const o of G.objs) removeObj(o); G.objs = [];
  let i = 0; for (const c of G.critters.values()) { c.it = false; c.frozen = false; c.tags = 0; c.itTime = 0; c.secondWind = false; c.fx = {}; c.cd = 0; if (c.kind !== 'remote') placeAtSpawn(c, i); else Net.sendTo(c.id, { t: 'spawn', i }); i++; }
  broadcastSnap(true);
}
function beginPlay() {
  G.phase = 'play'; G.timer = MODES[G.mode].time;
  const list = [...G.critters.values()]; const n = list.length;
  const its = G.mode === 'classic' ? 1 : n <= 6 ? 1 : n <= 12 ? 2 : 3;
  list.sort(() => Math.random() - .5).slice(0, its).forEach(c => { c.it = true; });
  G.startIts = list.filter(c => c.it).map(c => c.id);
  for (const c of list) { c.spawnShield = 0; if (c.it) applyFx(c, 'stun', 1.5); }
  feed('🔥 ' + list.filter(c => c.it).map(c => c.name).join(' & ') + (its > 1 ? ' are' : ' is') + ' IT!');
  sfx(local(), 'go');
}
function checkRoundOver() {
  if (G.phase !== 'play') return;
  const list = [...G.critters.values()];
  const runners = list.filter(c => !c.it && !c.frozen);
  if (G.mode === 'infection' && runners.length === 0) return endRound('taggers');
  if (G.mode === 'freeze' && runners.length === 0) return endRound('taggers');
  if (G.timer <= 0) endRound(G.mode === 'classic' ? 'notit' : 'runners');
}
function endRound(who) {
  G.phase = 'end'; G.timer = 8;
  const list = [...G.critters.values()];
  let winners;
  if (who === 'taggers') winners = list.filter(c => G.startIts.includes(c.id) || (G.mode !== 'classic' && c.tags > 0) || (G.mode === 'freeze' && c.it));
  else if (who === 'notit') winners = list.filter(c => !c.it);
  else winners = list.filter(c => !c.it);
  const title = who === 'taggers' ? (G.mode === 'freeze' ? 'Everyone got frozen! Taggers win!' : 'Everyone got caught! Taggers win!') : who === 'notit' ? (list.filter(c => c.it).map(c => c.name).join(', ') + ' was IT at the end!') : 'Time is up! Survivors win!';
  const res = { t: 'end', title, winners: winners.map(c => c.id), tags: Object.fromEntries(list.map(c => [c.id, c.tags])), mvp: (list.slice().sort((a, b) => b.tags - a.tags)[0] || {}).id, survived: list.filter(c => !c.it && !c.frozen).map(c => c.id), names: Object.fromEntries(list.map(c => [c.id, c.name])) };
  if (Net.online) Net.broadcast(res);
  onRoundEnd(res, G.localId);
}
// everyone (host and clients) gets their own reward here
function onRoundEnd(res, myId) {
  G.results = res;
  const won = res.winners.includes(myId), tags = res.tags[myId] || 0, survived = res.survived.includes(myId);
  let gems = REWARDS.play + (won ? REWARDS.win : 0) + tags * REWARDS.tag + (survived && G.mode !== 'classic' ? REWARDS.surviveBonus : 0);
  if (Save.sel.perks.includes('gemmagnet')) gems = Math.round(gems * 1.5);
  Save.gems += gems; Save.stats.rounds++; Save.stats.tags += tags; if (won) Save.stats.wins++;
  persist();
  UI.results(res, myId, won, gems, tags);
  sfx(local(), won ? 'win' : 'lose');
}

// ---------- bots ----------
function botThink(c, dt) {
  const ai = c.ai; ai.t -= dt; ai.abilityT -= dt;
  const inp = { mx: 0, mz: 0, jump: false, hold: false, down: false };
  if (G.phase === 'countdown' || c.frozen) return inp;
  const list = [...G.critters.values()];
  const hard = Save.settings.diff === 'hard', easy = Save.settings.diff === 'easy';
  const visible = (o) => !(o.fx.burrow > 0) && !(o.fx.invis > 0 && o.pos.distanceTo(c.pos) > 3) && !(o.fx.blind > 0);
  let dir = null, wantJump = false, threat = null;
  if (G.phase === 'play' && c.it) {
    if (ai.t <= 0 || !ai.goal || ai.goal.it || ai.goal.frozen || !G.critters.has(ai.goal.id) && !ai.goal.decoy) {
      ai.t = easy ? 1.2 : 0.5;
      let best = null, bd = 1e9;
      for (const o of list) { if (o === c || o.it || o.frozen || !visible(o)) continue; const d = o.pos.distanceTo(c.pos) + (o.kind !== 'bot' ? -4 : 0); if (d < bd) { bd = d; best = o; } }
      for (const o of G.objs) if (o.type === 'decoy' && !o.it) { const d = Math.hypot(o.x - c.pos.x, o.z - c.pos.z) - 3; if (d < bd) { bd = d; best = { pos: new THREE.Vector3(o.x, o.y, o.z), vel: new THREE.Vector3(o.dx * 9, 0, o.dz * 9), decoy: o, id: 'd' }; } }
      ai.goal = best;
    }
    const g = ai.goal;
    if (g && g.decoy && g.decoy.life <= 0) ai.goal = null;
    if (g) {
      const gp = g.decoy ? new THREE.Vector3(g.decoy.x, g.decoy.y, g.decoy.z) : g.pos;
      const lead = hard ? 0.35 : 0.15;
      dir = gp.clone().addScaledVector(g.vel || new THREE.Vector3(), lead).sub(c.pos);
      const hd = Math.hypot(dir.x, dir.z);
      if (dir.y > 1.2 && hd < 7) wantJump = true;
      if (ai.abilityT <= 0 && c.cd <= 0 && !g.decoy) {
        const ab = abilityOf(c);
        const off = { roar: ab.r * 0.8, freeze: ab.r * 0.8, thunder: ab.r * 0.6, tongue: ab.r, megatongue: ab.r * 0.7, pounce: ab.r, divebomb: ab.r, slowzone: ab.r * 0.8, timewarp: 20, charge: 8, firetrail: 9, sprint: 18, blink: 18, superjump: dir.y > 2 ? 8 : 0, climb: dir.y > 2 ? 6 : 0, fly: dir.y > 3 ? 12 : 0, web: 0, glide: 0, slide: 10, shrink: 0, spikeball: 8, ink: 0 }[ab.id];
        if (off && hd < off) { useAbility(c); ai.abilityT = easy ? 4 : 1.5; }
      }
    } else dir = null;
  } else {
    // runner: find closest visible tagger
    let bd = 1e9;
    for (const o of list) { if (o === c || !o.it || !visible(o)) continue; const d = o.pos.distanceTo(c.pos); if (d < bd) { bd = d; threat = o; } }
    const fear = hard ? 22 : easy ? 13 : 18;
    if (G.phase === 'play' && threat && bd < fear) {
      const away = c.pos.clone().sub(threat.pos); away.y = 0; away.normalize();
      const side = new THREE.Vector3(-away.z, 0, away.x).multiplyScalar(Math.sin(G.t * 0.7 + c.id.length) * 0.6);
      dir = away.add(side);
      const edge = World.half - 8;
      if (Math.abs(c.pos.x) > edge || Math.abs(c.pos.z) > edge) { const toC = new THREE.Vector3(-c.pos.x, 0, -c.pos.z).normalize(); dir.addScaledVector(toC, 1.4); }
      if (ai.abilityT <= 0 && c.cd <= 0 && bd < (hard ? 7 : 5)) { useAbility(c); ai.abilityT = easy ? 5 : 2; }
      if (bd < 4 && Math.random() < dt * 2) wantJump = true;
    } else if (G.phase === 'play' && G.mode === 'freeze' && !c.it) {
      let fz = null, fd = 1e9; for (const o of list) if (o.frozen) { const d = o.pos.distanceTo(c.pos); if (d < fd) { fd = d; fz = o; } }
      if (fz) dir = fz.pos.clone().sub(c.pos);
    }
    if (!dir) {
      if (!ai.wander || ai.t <= 0 || c.pos.distanceTo(ai.wander) < 3) { ai.t = 3 + Math.random() * 4; ai.wander = new THREE.Vector3((Math.random() * 2 - 1) * 50, 0, (Math.random() * 2 - 1) * 50); }
      dir = ai.wander.clone().sub(c.pos); dir.multiplyScalar(0.6 / Math.max(1, dir.length()) * 10);
      if (dir.length() > 0.55) dir.setLength(0.55);
    }
  }
  if (dir) {
    const l = Math.hypot(dir.x, dir.z);
    if (l > 0.01) { const s = Math.min(1, l); inp.mx = dir.x / l * s; inp.mz = dir.z / l * s; if (c.it || threat) { inp.mx = dir.x / l; inp.mz = dir.z / l; } }
  }
  // stuck? jump and sidestep
  ai.stuckT += dt;
  if (ai.stuckT > 0.6) { const moved = ai.lastPos.distanceTo(c.pos); ai.lastPos.copy(c.pos); ai.stuckT = 0; if (moved < 1.2 && (inp.mx || inp.mz)) { wantJump = true; ai.side = (Math.random() < .5 ? -1 : 1) * 0.8; ai.sideT = 0.6; } }
  if (ai.sideT > 0) { ai.sideT -= dt; const nx = inp.mx + -inp.mz * ai.side, nz = inp.mz + inp.mx * ai.side, l = Math.hypot(nx, nz) || 1; inp.mx = nx / l; inp.mz = nz / l; }
  if (c.wallN && c.wallT < 0.1 && (inp.mx || inp.mz)) wantJump = true;
  if (wantJump) { inp.jump = true; }
  if (c.fx.fly > 0) inp.hold = dir && dir.y > 0;
  return inp;
}

// ---------- network glue ----------
function flagsOf(c) {
  const f = c.fx;
  return (c.it ? 1 : 0) | (c.frozen ? 2 : 0) | (f.invis > 0 ? 4 : 0) | (f.burrow > 0 ? 8 : 0) | (f.shield > 0 ? 16 : 0) | (f.shrink > 0 ? 32 : 0) | (f.fly > 0 ? 64 : 0) | (f.stun > 0 ? 128 : 0) | (f.spikeball > 0 ? 256 : 0) | (f.glide > 0 ? 512 : 0) | (!c.grounded ? 1024 : 0) | (c.iceT > 0 ? 2048 : 0);
}
function setFlagsVisual(c, f) {
  c.vf = { invis: !!(f & 4), burrow: !!(f & 8), shield: !!(f & 16), shrink: !!(f & 32), fly: !!(f & 64), stun: !!(f & 128), spike: !!(f & 256), glide: !!(f & 512), air: !!(f & 1024), ice: !!(f & 2048) };
}
function helloMsg() { return { t: 'hello', name: Save.name, animal: Save.sel.animal, look: myLook(Save.sel.animal), perks: Save.sel.perks }; }
function rosterList() { return [...G.critters.values()].map(c => ({ id: c.id === G.localId ? Net.myId : c.id, name: c.name, animal: c.animal, look: c.look, kind: c.kind === 'local' ? 'remote' : c.kind, perks: c.perks })); }
function broadcastRoster() { if (Net.online && Net.isHost) Net.broadcast({ t: 'roster', list: rosterList() }); }
function broadcastSnap(force) {
  if (!Net.online || !Net.isHost) return;
  if (!force && G.t - G.lastSnap < 1 / 15) return; G.lastSnap = G.t;
  const ents = [...G.critters.values()].map(c => [c.id === G.localId ? Net.myId : c.id, +c.pos.x.toFixed(2), +c.pos.y.toFixed(2), +c.pos.z.toFixed(2), +c.ry.toFixed(2), flagsOf(c), +c.move.toFixed(2), c.tags]);
  const objs = G.objs.map(o => [o.id, o.type, +o.x.toFixed(2), +o.y.toFixed(2), +o.z.toFixed(2), o.r, +(o.ry || 0).toFixed(2), o.owner === G.localId ? Net.myId : o.owner, o.color, o.animal || null, o.ghost ? 1 : 0, +o.life.toFixed(1)]);
  Net.broadcast({ t: 'snap', ph: G.phase, tm: +G.timer.toFixed(1), mode: G.mode, ents, objs });
}

function setupNet() {
  Net.onJoin = (id) => { Net.sendTo(id, { t: 'roster', list: rosterList() }); };
  Net.onLeave = (id) => { const c = G.critters.get(id); if (c) { feed('👋 ' + c.name + ' left'); c.remove(); G.critters.delete(id); broadcastRoster(); } };
  Net.onMessage = (from, m) => {
    if (!m || !m.t) return;
    if (Net.isHost) {
      let c = G.critters.get(from);
      if (m.t === 'hello') {
        if (!c) { c = new Critter(from, 'remote', String(m.name).slice(0, 16), m.animal, m.look, m.perks); G.critters.set(from, c); c.it = G.phase === 'play' && G.mode === 'infection'; feed('🎉 ' + c.name + ' joined'); placeAtSpawn(c, G.critters.size); }
        else { c.name = String(m.name).slice(0, 16); c.perks = m.perks || []; c.setAnimal(m.animal, m.look); }
        broadcastRoster(); return;
      }
      if (!c) return;
      if (m.t === 'st') { c.target = { x: m.p[0], y: m.p[1], z: m.p[2], ry: m.p[3] }; c.move = m.m; c.rflags = m.f; c.grounded = !(m.f & 1024); c.vel.set(m.v[0], m.v[1], m.v[2]); }
      if (m.t === 'ab') { c.ry = m.ry; if (m.p) { c.pos.set(m.p[0], m.p[1], m.p[2]); c.target = { x: m.p[0], y: m.p[1], z: m.p[2], ry: m.ry }; } abilityOthers(c); }
    } else {
      // client
      if (m.t === 'roster') syncRoster(m.list);
      if (m.t === 'snap') applySnap(m);
      if (m.t === 'fx') { const me = local(); if (me && !(me.fx.shield > 0 && m.k !== 'shield')) me.fx[m.k] = Math.max(me.fx[m.k] || 0, m.d); }
      if (m.t === 'imp') { const me = local(); if (me && !(me.fx.shield > 0)) { me.vel.set(m.v[0], m.v[1], m.v[2]); me.grounded = false; } }
      if (m.t === 'spawn') { placeAtSpawn(local(), m.i); local().fx = {}; local().cd = 0; local().secondWind = false; }
      if (m.t === 'vfx') vfx(m.k, { x: m.p[0], y: m.p[1], z: m.p[2] }, m.r, m.c, m.to ? { x: m.to[0], y: m.to[1], z: m.to[2] } : null, true);
      if (m.t === 'feed') { G.feed.unshift({ text: m.text, t: 6 }); G.feed.length = Math.min(G.feed.length, 6); }
      if (m.t === 'end') { G.mode = G.mode; onRoundEnd(m, Net.myId); }
      if (m.t === 'msg') UI.flash(m.text);
    }
  };
}
function syncRoster(list) {
  const ids = new Set();
  for (const e of list) {
    if (e.id === Net.myId) continue;
    ids.add(e.id);
    let c = G.critters.get(e.id);
    if (!c) { c = new Critter(e.id, 'puppet', e.name, e.animal, e.look, e.perks); G.critters.set(e.id, c); }
    else if (c.animal !== e.animal || JSON.stringify(c.look) !== JSON.stringify(e.look) || c.name !== e.name) { c.name = e.name; c.setAnimal(e.animal, e.look); }
    c.perks = e.perks || [];
  }
  for (const [id, c] of G.critters) if (id !== G.localId && !ids.has(id)) { c.remove(); G.critters.delete(id); }
}
function applySnap(m) {
  const prevPhase = G.phase;
  G.phase = m.ph; G.timer = m.tm; G.mode = m.mode;
  if (prevPhase !== 'play' && G.phase === 'play') sfx(local(), 'go');
  const me = local();
  for (const e of m.ents) {
    const [id, x, y, z, ry, f, mv, tags] = e;
    if (id === Net.myId) { if (me) { const wasIt = me.it, wasFrozen = me.frozen; me.it = !!(f & 1); me.frozen = !!(f & 2); me.tags = tags; if (me.it && !wasIt && G.phase === 'play') { } if (!me.frozen && wasFrozen) UI.flash('You are free!'); } continue; }
    const c = G.critters.get(id); if (!c) continue;
    c.target = { x, y, z, ry }; c.it = !!(f & 1); c.frozen = !!(f & 2); c.move = mv; c.rflags = f; c.tags = tags;
  }
  // objects
  const seen = new Set();
  for (const a of m.objs) {
    const [id, type, x, y, z, r, ry, owner, color, animal, ghost, life] = a; seen.add(id);
    let o = G.objs.find(q => q.id === id);
    if (!o) { o = { id, type, x, y, z, r, ry, owner: owner === Net.myId ? G.localId : owner, color, animal, ghost: !!ghost, life }; G.objs.push(o); makeObjMesh(o); }
    o.x = x; o.y = y; o.z = z; o.ry = ry; o.life = life;
  }
  for (const o of G.objs) if (!seen.has(o.id)) removeObj(o);
  G.objs = G.objs.filter(o => seen.has(o.id));
}

// online room controls (called by the UI)
function hostRoom(done) {
  Net.host(code => {
    setupNet(); clearBots(); addBots(Save.settings.roomBots);
    G.phase = 'lobby'; G.timer = 0; done && done(code);
  });
}
function joinRoom(code, done) {
  Net.join(code, () => {
    setupNet(); clearBots();
    for (const [id, c] of G.critters) if (id !== G.localId) { c.remove(); G.critters.delete(id); }
    G.phase = 'lobby'; Net.send(helloMsg()); done && done();
  });
}
function leaveRoom() {
  Net.leave();
  for (const [id, c] of G.critters) if (id !== G.localId) { c.remove(); G.critters.delete(id); }
  for (const o of G.objs) removeObj(o); G.objs = [];
  G.phase = 'lobby';
}
function startSolo() {
  if (Net.online) leaveRoom();
  clearBots(); addBots(Save.settings.bots);
  startRound();
}

// ---------- main loop ----------
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(0.05, clock.getDelta());
  G.t = (G.t || 0) + dt;
  const host = !Net.online || Net.isHost;
  const solo = !Net.online;
  const frozenTime = G.paused && solo && !G.demo;
  const me = local();

  if (!frozenTime) {
    // round clock
    if (host) {
      if (G.phase === 'countdown') { G.timer -= dt; if (G.timer <= 0) beginPlay(); }
      else if (G.phase === 'play') { G.timer -= dt; checkTags(); checkRoundOver(); }
      else if (G.phase === 'end') { G.timer -= dt; if (G.timer <= 0) { UI.hideResults(); startRound(); } }
    }
    // simulate
    for (const c of G.critters.values()) {
      if (c.kind === 'local') stepCritter(c, G.paused ? { mx: 0, mz: 0 } : localInput(c), dt);
      else if (c.kind === 'bot') stepCritter(c, botThink(c, dt), dt);
      else if (c.target) {   // remote/puppet: glide toward last known spot
        const k = Math.min(1, dt * 12);
        if (c.pos.distanceTo(c.target) > 8) c.pos.set(c.target.x, c.target.y, c.target.z);
        c.pos.x += (c.target.x - c.pos.x) * k; c.pos.y += (c.target.y - c.pos.y) * k; c.pos.z += (c.target.z - c.pos.z) * k;
        let dr = c.target.ry - c.ry; dr = Math.atan2(Math.sin(dr), Math.cos(dr)); c.ry += dr * k;
        if (c.kind === 'remote') { for (const key in c.fx) if (c.fx[key] > 0) c.fx[key] -= dt; const f = c.rflags || 0; c.fx.burrow = f & 8 ? 1 : 0; c.fx.shield = f & 16 ? 1 : 0; c.fx.spikeball = f & 256 ? 1 : 0; c.fx.invis = f & 4 ? 1 : 0; c.fx.shrink = f & 32 ? 1 : 0; c.fx.stun = f & 128 ? 1 : 0; }
      }
      if (c.dive > 0) { c.dive -= dt; if (c.dive <= 0) { const t = nearest(c, abilityOf(c).r); const d = t ? t.pos.clone().sub(c.pos) : new THREE.Vector3(Math.sin(c.ry) * 5, -8, Math.cos(c.ry) * 5); d.setLength(32); c.vel.copy(d); } }
      if (c.fx.firetrail > 0 && host && c.kind !== 'remote' && c.kind !== 'puppet') { c._ft = (c._ft || 0) - dt; if (c._ft <= 0) { c._ft = 0.08; addObj('fire', c.pos, 1, 5, c); } }
      if (c.iceT > 0) c.iceT -= dt;
    }
    if (host) updateObjs(dt, true); else updateObjs(dt, false);
    if (Net.online && !Net.isHost && me && G.t - G.lastSend > 1 / 15) { G.lastSend = G.t; Net.send({ t: 'st', p: [+me.pos.x.toFixed(2), +me.pos.y.toFixed(2), +me.pos.z.toFixed(2), +me.ry.toFixed(2)], v: [+me.vel.x.toFixed(1), +me.vel.y.toFixed(1), +me.vel.z.toFixed(1)], f: flagsOf(me), m: +me.move.toFixed(2) }); }
    if (Net.online && Net.isHost) broadcastSnap(false);
    if (touch.jumpPress) touch.jumpPress = false;
  }

  // draw animals
  for (const c of G.critters.values()) drawCritter(c);
  updateVfx(dt);
  for (const f of G.feed) f.t -= dt; G.feed = G.feed.filter(f => f.t > 0);

  // title screen: slowly circle the player's animal, and shift the view right of the side panel
  const title = G.paused && !G.started && typeof UI !== 'undefined' && UI.menuOpen();
  if (title) { G.titleT = (G.titleT || 0) + dt; G.camYaw = (G.titleYaw || 0) + Math.sin(G.titleT * 0.25) * 0.6; G.camPitch = 0.22; G.camDist = 6.5; if (me) me.ry = (G.titleYaw || 0) + Math.PI + Math.sin(G.titleT * 0.25) * 0.3; }
  const sideEl = document.querySelector('.side');
  const shift = title && innerWidth > 600 && sideEl ? -Math.round(sideEl.offsetWidth / 2) : 0;
  if (shift !== G._shift) { G._shift = shift; if (shift) camera.setViewOffset(innerWidth, innerHeight, shift, 0, innerWidth, innerHeight); else camera.clearViewOffset(); }

  // camera
  if (me) {
    const tgt = me.pos.clone(); tgt.y += 1.3 * me.def.size;
    const d = G.camDist * Math.max(0.8, me.def.size);
    const off = new THREE.Vector3(-Math.sin(G.camYaw) * Math.cos(G.camPitch), Math.sin(G.camPitch), -Math.cos(G.camYaw) * Math.cos(G.camPitch));
    let dist = d;
    for (let i = 1; i <= 12; i++) { const p = tgt.clone().addScaledVector(off, d * i / 12); if (pointSolid(p)) { dist = d * (i - 1) / 12; break; } }
    camera.position.copy(tgt).addScaledVector(off, Math.max(1.2, dist));
    if (camera.position.y < 0.4) camera.position.y = 0.4;
    camera.lookAt(tgt);
    sun.position.set(me.pos.x + 30, 60, me.pos.z + 20); sun.target.position.set(me.pos.x, 0, me.pos.z);
  }
  renderer.render(scene, camera);
  UI.hud(dt);
}
function pointSolid(p) {
  for (const b of World.boxes) if (p.x > b.min.x && p.x < b.max.x && p.y > b.min.y && p.y < b.max.y && p.z > b.min.z && p.z < b.max.z) return true;
  for (const c of World.cyls) if (p.y > c.y0 && p.y < c.y1 && Math.hypot(p.x - c.x, p.z - c.z) < c.r) return true;
  return false;
}

function drawCritter(c) {
  const isMe = c.kind === 'local';
  if (c.kind === 'local' || c.kind === 'bot' || c.kind === 'remote') setFlagsVisual(c, c.kind === 'remote' ? (c.rflags || 0) | (c.it ? 1 : 0) : flagsOf(c));
  else setFlagsVisual(c, c.rflags || 0);
  const v = c.vf;
  c.root.position.copy(c.pos); c.root.rotation.y = c.ry;
  const sc = v.shrink ? 0.5 : 1; c.mesh.scale.setScalar(c.def.size * sc);
  c.mesh.visible = !v.burrow; c.mound.visible = v.burrow; c.label.visible = !v.burrow && !(v.invis && !isMe);
  c.bubble.visible = v.shield; c.ice.visible = c.frozen || v.ice;
  c.itRing.visible = c.it; if (c.it) { c.itRing.rotation.z = G.t * 3; c.itRing.position.y = c.def.size * 2.1 + 0.95 + Math.sin(G.t * 4) * 0.1; }
  const visKey = (v.invis ? 'i' : '') + (c.it ? 'r' : '') + (isMe ? 'm' : '');
  if (visKey !== c._lastVis) {
    c._lastVis = visKey;
    c.mesh.traverse(n => { if (n.material && n.material !== c.ice.material) { n.material.transparent = v.invis; n.material.opacity = v.invis ? (isMe ? 0.35 : 0.08) : 1; } });
    c.rig.mats.forEach((m, i) => { const o = c.origEmissive[i]; if (c.it) { m.emissive.set('#ff2a10'); m.emissiveMap = null; m.emissiveIntensity = 0.45; } else { m.emissive.copy(o.c); m.emissiveMap = o.map; m.emissiveIntensity = o.i; } m.needsUpdate = true; });
  }
  if (v.spike) c.mesh.rotation.x += 0.4; else c.mesh.rotation.x = v.stun || c.frozen ? 0 : 0;
  if (!v.spike) { c.mesh.rotation.z = v.stun && !c.frozen ? Math.sin(G.t * 20) * 0.15 : 0; }
  if (c.rig.gliders) c.rig.gliders.forEach(g => g.visible = v.glide);
  if (!c.frozen && !v.ice) animateCreature(c.mesh, G.t + c.id.length, c.move, v.air, v.fly, c.def);
  if (c.rig.halo) c.rig.halo.position.y = c.rig.halo.position.y;
}

// ---------- sound ----------
let actx = null;
function sfx(c, kind) { if (!c || c.kind !== 'local') return; beep(kind); }
function sfxAt(c, kind) { if (c && (c.kind === 'local' || (local() && c.pos.distanceTo(local().pos) < 15))) beep(kind); }
function beep(kind) {
  if (!Save.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = { jump: [[520, .06]], boing: [[300, .05], [600, .1]], ability: [[440, .06], [660, .06], [880, .08]], tag: [[880, .07], [440, .12]], unfreeze: [[600, .05], [900, .08]], go: [[523, .1], [784, .2]], win: [[523, .1], [659, .1], [784, .1], [1046, .25]], lose: [[392, .15], [330, .15], [262, .3]], tick: [[700, .05]], buy: [[880, .06], [1320, .1]] }[kind] || [[440, .05]];
    let t = actx.currentTime;
    for (const [f, d] of notes) { const o = actx.createOscillator(), g = actx.createGain(); o.type = kind === 'tag' || kind === 'lose' ? 'square' : 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.001, t + d); o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d); t += d * 0.9; }
  } catch (e) { }
}
