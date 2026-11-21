// Cloth simulation for skirts and dresses (position-based dynamics with Verlet integration).
// The fabric is a grid of points: rows run from the waist down to the hem, columns go around
// the body. The top row is sewn to the bodice; the rest hangs under gravity, falls into folds,
// swings when the mannequin moves, and rests against the hips and legs.
import * as THREE from 'three';

const GRAVITY = -9.8;

export class Cloth {
  // rings: rest shape top to bottom [{ y, a, b, cx }] in the mannequin's own coordinates.
  // phys: { hang, bend, folds, drag, weight } from the fabric. collide(arr, i) pushes point i out of the body.
  constructor({ rings, seg = 64, phys, collide, uvFn, pointFn, seed = 1 }) {
    const R = rings.length, C = seg, N = R * C;
    this.R = R; this.C = C; this.N = N; this.phys = phys; this.collide = collide;
    this.rest = new Float32Array(N * 3);     // fabric's true shape (sets the thread lengths)
    this.local = new Float32Array(N * 3);    // current positions, mannequin coordinates
    this.prev = new Float32Array(N * 3);
    this.pos = new Float32Array(N * 3);      // world positions for drawing
    const uv = new Float32Array(N * 2);
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      const t = (c / C) * Math.PI * 2, g = rings[r], i = r * C + c;
      const [x, y, z] = pointFn ? pointFn(g, Math.cos(t), Math.sin(t)) : [g.cx + g.a * Math.cos(t), g.y, g.b * Math.sin(t)];
      this.rest.set([x, y, z], i * 3);
      const q = uvFn([x, y, z], g); uv[i * 2] = q[0]; uv[i * 2 + 1] = q[1];
    }
    // Start already folded so the fabric settles into natural pleats instead of a smooth cone.
    let s = seed >>> 0; const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    const k = Math.max(4, Math.round(phys.folds)), phase = Array.from({ length: k }, () => rnd() * 0.6);
    for (let r = 0; r < R; r++) {
      const g = rings[r], t = R > 1 ? r / (R - 1) : 0;
      const shrink = 1 - (1 - phys.hang) * 0.6 * Math.pow(t, 1.2);
      const amp = Math.min(0.32, (2 / k) * Math.sqrt(Math.max(0, 1 / shrink - 1))) * Math.pow(t, 0.6);
      for (let c = 0; c < C; c++) {
        const th = (c / C) * Math.PI * 2, f = Math.floor((c / C) * k);
        const rad = shrink * (1 + amp * Math.sin(k * th + phase[f] * Math.PI * 0.5));
        const i = (r * C + c) * 3, rx = this.rest[i], rz = this.rest[i + 2];
        this.local[i] = g.cx * shrink + (rx - g.cx) * rad; this.local[i + 1] = this.rest[i + 1]; this.local[i + 2] = rz * rad;
      }
    }
    this.prev.set(this.local);
    // Shape memory: the draped, folded shape the fabric settles back toward (like the structure
    // and underlayers that hold a real skirt's silhouette). Stiffer fabrics hold it more firmly.
    this.target = this.local.slice();
    this.hold = 0.012 + phys.bend * 0.05 + (phys.hang - 0.7) * 0.08;
    // Threads between points: [a, b, rest length, stiffness when stretched, stiffness when squeezed]
    const cons = [];
    const add = (r1, c1, r2, c2, stretch, squeeze) => {
      if (r2 >= R) return; const a = r1 * C + ((c1 + C) % C), b = r2 * C + ((c2 + C) % C);
      const dx = this.rest[a * 3] - this.rest[b * 3], dy = this.rest[a * 3 + 1] - this.rest[b * 3 + 1], dz = this.rest[a * 3 + 2] - this.rest[b * 3 + 2];
      cons.push(a, b, Math.sqrt(dx * dx + dy * dy + dz * dz), stretch, squeeze);
    };
    const bend = phys.bend;
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      // Threads keep their length both ways, so extra fabric has to fold instead of shrinking.
      add(r, c, r, c + 1, 1, 0.9);                         // around
      add(r, c, r + 1, c, 1, 0.9);                         // down
      add(r, c, r + 1, c + 1, 0.5, 0.35);                  // diagonal
      add(r, c + 1, r + 1, c, 0.5, 0.35);
      add(r, c, r, c + 2, bend, bend);                     // stiffness against folding
      add(r, c, r + 2, c, bend * 0.8 + 0.1, bend * 0.8 + 0.1);
    }
    this.cons = new Float32Array(cons);
    // Mesh
    const idx = [];
    for (let r = 0; r < R - 1; r++) for (let c = 0; c < C; c++) {
      const a = r * C + c, b = r * C + (c + 1) % C, d = (r + 1) * C + c, e = (r + 1) * C + (c + 1) % C;
      idx.push(a, d, b, b, d, e);
    }
    const geo = this.geometry = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(idx);
    this.frame = { angle: 0, x: 0, z: 0 };
    this.wind = 0; this.time = 0;
    this.motion = 1;
  }

  // Where the mannequin is: rotation about the vertical axis plus a sideways offset.
  setFrame(angle, x, z) {
    const f = this.frame;
    // Fabric that is not sewn down stays where it was in the world, so turning the body makes it swing.
    const da = angle - f.angle, dx = x - f.x, dz = z - f.z;
    if (da || dx || dz) {
      const wc = Math.cos(f.angle), ws = Math.sin(f.angle), nc = Math.cos(angle), ns = Math.sin(angle);
      for (let i = this.C; i < this.N; i++) for (const arr of [this.local, this.prev]) {
        const o = i * 3, px = arr[o], pz = arr[o + 2];
        // old local -> world -> new local
        const lx = px * wc + pz * ws + f.x - x, lz = -px * ws + pz * wc + f.z - z;
        arr[o] = lx * nc - lz * ns; arr[o + 2] = lx * ns + lz * nc;
      }
      f.angle = angle; f.x = x; f.z = z;
      this.motion = 1;
    }
  }

  step(dt) {
    const { local: P, prev: Q, rest, C, N, cons } = this, ph = this.phys;
    const damp = 1 - ph.drag, g = GRAVITY * dt * dt * ph.weight;
    this.time += dt;
    const wind = this.wind;
    let moved = 0;
    for (let i = C; i < N; i++) {
      const o = i * 3;
      const vx = (P[o] - Q[o]) * damp, vy = (P[o + 1] - Q[o + 1]) * damp, vz = (P[o + 2] - Q[o + 2]) * damp;
      Q[o] = P[o]; Q[o + 1] = P[o + 1]; Q[o + 2] = P[o + 2];
      let ax = 0, az = 0;
      if (wind) {
        const gust = 0.6 + 0.4 * Math.sin(this.time * 1.7 + P[o + 1] * 6) * Math.sin(this.time * 0.9 + i * 0.013);
        const wx = Math.cos(this.frame.angle), wz = Math.sin(this.frame.angle); // breeze from the mannequin's left
        ax = wind * gust * wx * dt * dt * (1.6 - ph.weight * 0.6); az = wind * gust * wz * dt * dt * (1.6 - ph.weight * 0.6);
      }
      P[o] += vx + ax; P[o + 1] += vy + g; P[o + 2] += vz + az;
      const T = this.target, h = this.hold * (0.3 + 0.7 * ((i / this.C) / this.R));
      P[o] += (T[o] - P[o]) * h; P[o + 1] += (T[o + 1] - P[o + 1]) * h * 0.5; P[o + 2] += (T[o + 2] - P[o + 2]) * h;
      moved = Math.max(moved, Math.abs(vx) + Math.abs(vy) + Math.abs(vz));
    }
    // The waist seam is sewn to the bodice.
    P.set(rest.subarray(0, C * 3), 0);
    const iters = 8;
    for (let it = 0; it < iters; it++) {
      for (let k = 0; k < cons.length; k += 5) {
        const a = cons[k] * 3, b = cons[k + 1] * 3, L = cons[k + 2];
        const dx = P[b] - P[a], dy = P[b + 1] - P[a + 1], dz = P[b + 2] - P[a + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-9;
        const stiff = d > L ? cons[k + 3] : cons[k + 4];
        if (!stiff) continue;
        const pinA = a < C * 3, pinB = b < C * 3;
        const corr = (d - L) / d * stiff * (pinA || pinB ? 1 : 0.5);
        if (!pinA) { P[a] += dx * corr; P[a + 1] += dy * corr; P[a + 2] += dz * corr; }
        if (!pinB) { P[b] -= dx * corr; P[b + 1] -= dy * corr; P[b + 2] -= dz * corr; }
      }
      for (let i = C; i < N; i++) this.collide(P, i * 3);
    }
    this.motion = moved;
    return moved;
  }

  settle(steps) { for (let s = 0; s < steps; s++) this.step(1 / 90); }

  // Copy positions into the mesh (in world space) for drawing.
  sync() {
    const { local: P, pos: W, N } = this, f = this.frame, c = Math.cos(f.angle), s = Math.sin(f.angle);
    for (let i = 0; i < N; i++) {
      const o = i * 3, x = P[o], z = P[o + 2];
      W[o] = x * c + z * s + f.x; W[o + 1] = P[o + 1]; W[o + 2] = -x * s + z * c + f.z;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.computeVertexNormals();
    this.geometry.computeBoundingSphere();
  }
}
