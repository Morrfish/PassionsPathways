// Computer players. Returns the same input shape a controller would.
// level 1 = Easy, 2 = Normal, 3 = Hard.
window.MM = window.MM || {};
(function () {
  const rnd = Math.random;
  // Everything a fighter can stand on: the solid floor and every platform (the floor may not span the
  // stage, e.g. the Agnew dock ends at the water and the boat floats past it).
  function press0(inp, k) { inp[k] = true; }
  function surfaces(G) { const m = G.stage.main; return [{ x: m.left, w: m.right - m.left, y: 0, main: true }].concat(G.stage.plats); }
  // Where to recover to: the nearest surface (a little bonus for the way we're already moving).
  function recoverPoint(G, f) {
    let best = null, bc = Infinity;
    for (const s of surfaces(G)) {
      const tx = Math.max(s.x + Math.min(30, s.w / 2), Math.min(s.x + s.w - Math.min(30, s.w / 2), f.x));
      let c = Math.abs(tx - f.x) + Math.max(0, f.y - s.y) * 0.6 + Math.max(0, s.y - f.y - 250) * 0.3;
      if (f.vx && Math.sign(tx - f.x) === Math.sign(f.vx)) c -= 40;
      if (c < bc) { bc = c; best = { x: tx, y: s.y, s }; }
    }
    const m = G.stage.main; // under the solid floor: go around its nearest end first
    if (best.s.main && f.y > 2 && f.x > m.left - 60 && f.x < m.right + 60) best.x = f.x - m.left < m.right - f.x ? m.left - 75 : m.right + 75;
    return best;
  }
  MM.aiRecoverPoint = recoverPoint;
  MM.aiThink = function (G, f) {
    const inp = { x: 0, y: 0, jump: false, attack: false, special: false, dodge: false, pause: false };
    if (f.dead || f.out) return inp;
    const ai = f.ai, lvl = f.cpu, m = G.stage.main;
    let react = [0, 0.05, 0.14, 0.32][lvl]; // chance per frame to act on an opening
    if (f.boss) react *= f.stocks < f.stocks0 * 0.4 ? 1.45 : f.stocks < f.stocks0 * 0.7 ? 1.2 : 1; // bosses press harder as the fight goes on
    ai.t = (ai.t || 0) + 1;
    if (f.float > 0) { if (ai.t % 60 === 0) inp.x = f.x > MM.spawnX(G.stage) ? -1 : 1; return inp; }

    // pick a target: closest fighter still in, preferring the one we already chase
    const others = G.fighters.filter((o) => o !== f && !o.out && !o.dead && !MM.sameTeam(G, f, o));
    if (!others.length) return inp;
    if (!ai.target || ai.target.out || ai.target.dead || ai.t % 240 === 0) {
      others.sort((a, b) => Math.hypot(a.x - f.x, a.y - f.y) - Math.hypot(b.x - f.x, b.y - f.y));
      ai.target = others[0];
    }
    const t = ai.target;
    const dx = t.x - f.x, dy = (t.y - t.h / 2) - (f.y - f.h / 2), adx = Math.abs(dx);
    // off the stage = in the air with nothing underneath to land on
    const offstage = !f.ground && MM.surfaceBelow(G, f.x, f.y) === null;

    // 1) get back to the stage (to the nearest thing to stand on)
    if (offstage && f.hitstun <= 0) {
      const r = recoverPoint(G, f), hd = Math.abs(r.x - f.x);
      inp.x = hd > 8 ? Math.sign(r.x - f.x) : 0;
      const below = f.y > r.y - 60;
      if (below && f.vy > -2) {
        if (f.jumps > 0) { inp.jump = !ai.jumpHeld; ai.jumpHeld = !ai.jumpHeld; } // tap (a held button only jumps once)
        else if (f.jumps === 0 && !f.upUsed && f.y > r.y - 20) { inp.y = -1; inp.special = !ai.spHeld; ai.spHeld = !ai.spHeld; }
        else if (!f.sideUsed && hd > 200 && f.y < r.y + 60) { inp.special = !ai.spHeld; ai.spHeld = !ai.spHeld; }
      } else ai.jumpHeld = false;
      if (f.y > r.y + 200 && f.jumps === 0 && !f.upUsed) { inp.y = -1; inp.special = true; }
      return inp;
    }
    ai.jumpHeld = false;
    // keep drinking (Jorie's Chocolate Charge) while nobody is close
    if (f.act && f.act.type === 'special' && f.act.sp && f.act.sp.kind === 'drink' && adx > 260) { inp.special = true; return inp; }
    if (f.act || f.hitstun > 0) { inp.x = f.hitstun > 0 ? Math.sign(MM.spawnX(G.stage) - f.x) || 1 : 0; return inp; }
    // a full meter (Codee's mess, Jorie's milk, Evea's spirit): switch into the other form
    if (f.def.mess && f.forms && f.formIdx === 0 && f.mess >= 100 && rnd() < react) { inp.swap = true; return inp; }
    // Sabir: call his costume pieces back so he can wear them
    if (f.def.mess && f.def.mess.pieces && f.formIdx === 0 && f.cd.down <= 0 && G.traps.some((t) => t.owner === f && t.piece != null && t.age > 40) && rnd() < 0.04) { inp.y = 1; press0(inp, 'special'); return inp; }
    // Jorie: fill the milk meter when there's room to drink
    if (f.def.specials.neutral && f.def.specials.neutral.kind === 'drink' && f.formIdx === 0 && f.ground && f.mess < 100 && adx > 420 && rnd() < 0.03) { press0(inp, 'special'); return inp; }

    // 2) dodge when the target is swinging at us
    if (t.act && t.act.box && adx < 160 && rnd() < react * 0.6 && f.dodgeCd <= 0) { inp.dodge = true; inp.x = rnd() < 0.5 ? -Math.sign(dx) : 0; return inp; }

    // ultimate when it would catch someone (or anyone ahead, for a stampede)
    if (f.meter >= 100 && f.def.ultimate && rnd() < react) {
      const u = f.def.ultimate;
      const near = u.type === 'catch' ? (u.ahead ? adx < u.ahead * f.h * 0.8 && Math.abs(dy) < f.h : Math.hypot(dx, dy) < (u.radius || 2) * f.h * 0.8)
        : u.type === 'decoy' ? adx < (u.radius || 2) * f.h && Math.abs(dy) < f.h
        : Math.abs(dy) < 120 && adx < 900; // stampede, beam, barrage: anyone ahead on the same level
      if (near) { f.face = Math.sign(dx) || f.face; inp.ult = true; return inp; }
    }
    // 3) attack when close
    const reach = 80 * f.s + 30;
    const press = (k) => { if (!ai[k]) { inp[k] = true; ai[k] = true; } else ai[k] = false; };
    // specials that rush forward would carry us off the edge here (e.g. the end of the dock)
    const edgeAhead = MM.surfaceBelow(G, f.x + (Math.sign(dx) || f.face) * 300, f.y - 4) === null;
    if (adx < reach && Math.abs(dy) < 90 && rnd() < react) {
      if (dy < -50) { inp.y = -1; press('attack'); }
      else if (!f.ground && dy > 40) { inp.y = 1; press('attack'); }
      else if (t.damage > 80 && rnd() < 0.5) { inp.x = Math.sign(dx); press(rnd() < 0.5 || edgeAhead ? 'attack' : 'special'); }
      else if (rnd() < 0.2 && (f.ground || MM.surfaceBelow(G, f.x, f.y) !== null)) { inp.y = 1; press('special'); }
      else { inp.x = rnd() < 0.6 ? Math.sign(dx) : 0; press('attack'); }
      return inp;
    }
    // 4) ranged special from far away
    if (adx > 300 && Math.abs(dy) < 120 && !edgeAhead && rnd() < react * 0.15) { f.face = Math.sign(dx); press('special'); return inp; }
    if (f.damage > 60 && f.def.specials.down && f.def.specials.down.kind === 'heal' && f.cd.down <= 0 && adx > 400 && rnd() < 0.02) { inp.y = 1; press('special'); return inp; }

    // 5) walk / jump toward the target, but don't walk off the edge
    inp.x = adx > reach * 0.7 ? Math.sign(dx) : 0;
    if (f.ground && inp.x && MM.surfaceBelow(G, f.x + inp.x * 60, f.y - 4) === null) {
      // a gap ahead: hop across when the target stands on something over there, otherwise wait at the edge
      const tSafe = t.ground || MM.surfaceBelow(G, t.x, t.y) !== null;
      let across = false;
      for (let d = 120; d <= 340 && !across; d += 55) { const s = MM.surfaceBelow(G, f.x + inp.x * d, f.y - 140); across = s !== null && s < f.y + 220; }
      if (tSafe && across && Math.sign(dx) === inp.x) inp.jump = true; else inp.x = 0;
    }
    if ((dy < -120 || (dy < -60 && adx < 260)) && f.ground && rnd() < 0.05 * lvl) inp.jump = true;
    if (!f.ground && dy < -60 && f.vy > 0 && f.jumps > 0 && rnd() < 0.05) inp.jump = true;
    if ((dy > 120 || (dy > 50 && adx < 260)) && f.ground && f.ground !== 'main' && MM.surfaceBelow(G, f.x, f.ground.y + 4) !== null && rnd() < 0.05) inp.y = 1;
    // falling toward nothing (e.g. chasing someone over the water): steer back to something to land on
    if (!f.ground && f.vy > 0 && MM.surfaceBelow(G, f.x + f.vx * 8 + inp.x * 30, f.y) === null) { const r = recoverPoint(G, f); inp.x = Math.abs(r.x - f.x) > 8 ? Math.sign(r.x - f.x) : 0; }
    if (lvl === 1 && ai.t % 120 < 40) inp.x = 0; // easy bots wait around sometimes
    if (f.ground && adx > 500 && rnd() < 0.002) inp.taunt = true; // show off when nobody is close
    if (f.forms && f.swapCd <= 0 && rnd() < 0.004 * lvl) inp.swap = true; // switch forms now and then
    return inp;
  };
})();
