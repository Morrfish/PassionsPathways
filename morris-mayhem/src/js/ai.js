// Computer players. Returns the same input shape a controller would.
// level 1 = Easy, 2 = Normal, 3 = Hard.
window.MM = window.MM || {};
(function () {
  const rnd = Math.random;
  MM.aiThink = function (G, f) {
    const inp = { x: 0, y: 0, jump: false, attack: false, special: false, dodge: false, pause: false };
    if (f.dead || f.out) return inp;
    const ai = f.ai, lvl = f.cpu, m = G.stage.main;
    const react = [0, 0.05, 0.14, 0.32][lvl]; // chance per frame to act on an opening
    ai.t = (ai.t || 0) + 1;
    if (f.float > 0) { if (ai.t % 60 === 0) inp.x = f.x > 0 ? -1 : 1; return inp; }

    // pick a target: closest fighter still in, preferring the one we already chase
    const others = G.fighters.filter((o) => o !== f && !o.out && !o.dead);
    if (!others.length) return inp;
    if (!ai.target || ai.target.out || ai.target.dead || ai.t % 240 === 0) {
      others.sort((a, b) => Math.hypot(a.x - f.x, a.y - f.y) - Math.hypot(b.x - f.x, b.y - f.y));
      ai.target = others[0];
    }
    const t = ai.target;
    const dx = t.x - f.x, dy = (t.y - t.h / 2) - (f.y - f.h / 2), adx = Math.abs(dx);
    const offstage = f.x < m.left + 10 || f.x > m.right - 10 || f.y > 5;

    // 1) get back to the stage
    if (offstage && f.hitstun <= 0) {
      inp.x = f.x < 0 ? 1 : -1;
      const below = f.y > -60;
      if (below && f.vy > -2) {
        if (f.jumps > 0 && !ai.jumpHeld) { inp.jump = true; ai.jumpHeld = true; }
        else if (f.jumps === 0 && !f.upUsed && f.y > -20) { inp.y = -1; inp.special = !ai.spHeld; ai.spHeld = !ai.spHeld; }
        else if (!f.sideUsed && Math.abs(f.x) - m.right > 200 && f.y < 60) { inp.special = !ai.spHeld; ai.spHeld = !ai.spHeld; }
      } else ai.jumpHeld = false;
      if (f.y > 200 && !f.upUsed) { inp.y = -1; inp.special = true; }
      return inp;
    }
    ai.jumpHeld = false;
    if (f.act || f.hitstun > 0) { inp.x = f.hitstun > 0 ? (f.x < 0 ? 1 : -1) : 0; return inp; }

    // 2) dodge when the target is swinging at us
    if (t.act && t.act.box && adx < 160 && rnd() < react * 0.6 && f.dodgeCd <= 0) { inp.dodge = true; inp.x = rnd() < 0.5 ? -Math.sign(dx) : 0; return inp; }

    // 3) attack when close
    const reach = 80 * f.s + 30;
    const press = (k) => { if (!ai[k]) { inp[k] = true; ai[k] = true; } else ai[k] = false; };
    if (adx < reach && Math.abs(dy) < 90 && rnd() < react) {
      if (dy < -50) { inp.y = -1; press('attack'); }
      else if (!f.ground && dy > 40) { inp.y = 1; press('attack'); }
      else if (t.damage > 80 && rnd() < 0.5) { inp.x = Math.sign(dx); press(rnd() < 0.5 ? 'attack' : 'special'); }
      else if (rnd() < 0.2) { inp.y = 1; press('special'); }
      else { inp.x = rnd() < 0.6 ? Math.sign(dx) : 0; press('attack'); }
      return inp;
    }
    // 4) ranged special from far away
    if (adx > 300 && Math.abs(dy) < 120 && rnd() < react * 0.15) { f.face = Math.sign(dx); press('special'); return inp; }
    if (f.damage > 60 && f.def.specials.down && f.def.specials.down.kind === 'heal' && f.cd.down <= 0 && adx > 400 && rnd() < 0.02) { inp.y = 1; press('special'); return inp; }

    // 5) walk / jump toward the target, but don't walk off the edge
    inp.x = adx > reach * 0.7 ? Math.sign(dx) : 0;
    if (f.ground && ((inp.x < 0 && f.x < m.left + 60) || (inp.x > 0 && f.x > m.right - 60)) && (t.y > 10 || Math.abs(t.x) > m.right)) inp.x = 0;
    if (dy < -120 && f.ground && rnd() < 0.05 * lvl) inp.jump = true;
    if (!f.ground && dy < -60 && f.vy > 0 && f.jumps > 0 && rnd() < 0.05) inp.jump = true;
    if (dy > 120 && f.ground && f.ground !== 'main' && rnd() < 0.05) inp.y = 1;
    if (lvl === 1 && ai.t % 120 < 40) inp.x = 0; // easy bots wait around sometimes
    if (f.forms && f.swapCd <= 0 && rnd() < 0.004 * lvl) inp.swap = true; // switch forms now and then
    return inp;
  };
})();
