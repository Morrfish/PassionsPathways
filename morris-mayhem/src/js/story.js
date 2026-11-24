// Story mode: each hero fights through the family (free-for-alls), then Jeff "The Boss",
// then the secret real final boss, Patty. Routes follow ChatGPT's story-routes.json (built by the
// same rule as its storyRoute()). Fights against relatives who aren't in the game yet are shown as
// "coming soon" and unlock by themselves when those fighters are added. Nobody is swapped in for them.
window.MM = window.MM || {};
(function () {
  const HEROES = ['mandi', 'jadden', 'courtnee', 'codee', 'haylie', 'sara', 'jorie'];
  const ROSTER = ['patty', 'jeff', 'mandi', 'kevin', 'chelsea', 'austin', 'bella', 'emmie', 'colten', 'danielle', 'cloe', 'cole', 'jadden', 'jacqi', 'jaicelynn', 'jaxston', 'courtnee', 'megan', 'siren', 'codee', 'janelle', 'sophia', 'harper', 'evea', 'haylie', 'sabir', 'haislie', 'august', 'harley', 'sara', 'jorie'];
  const PLACES = ['dunkirk', 'hardin-northern', 'williamstown', 'graceland', 'agnew'];
  const NAMES = { patty: 'Patty Morris', jeff: 'Jeffery Morris', mandi: 'Mandi Crist', kevin: 'Kevin Crist', chelsea: 'Chelsea Bentz', austin: 'Austin', bella: 'Bella', emmie: 'Emmie Jo', colten: 'Colten Crist', danielle: 'Dani Madison', cloe: 'Cloe Crist', cole: 'Cole Harrington', jadden: 'Jadden Morris', jacqi: 'Jacqi Sue Morris', jaicelynn: 'Jaice Morris', jaxston: 'Jaxston Morris', courtnee: 'Courtnee Morris', megan: 'Megan Morris', siren: 'Siren Morris', codee: 'Codee Morris', janelle: 'Janelle Morris', sophia: 'Sophia Faber', harper: 'Harper Faber', evea: 'Evea Morris', haylie: 'Haylie Rollerson', sabir: 'Sabir Rollerson', haislie: 'Haislie Rollerson', august: 'August Rollerson', harley: 'Harley Rollerson', sara: 'Sara Morris', jorie: 'Jorie Morris' };
  // Game fiction (from ChatGPT's handoff) to revise when real biographies arrive.
  const SEEDS = {
    mandi: 'Mandi is pulling the whole family together for a reunion, and as the big sister in charge, everybody is getting there whether they like it or not.',
    jadden: 'Jadden got a mixed-up invitation and is following it from town to town to find out where the family is really meeting.',
    courtnee: 'Family game night is glitching! Courtnee sets out to fix it, one relative at a time.',
    codee: "The family's keepsakes got scattered. Codee is bringing every one of them home.",
    haylie: 'Haylie is organizing a family outing, and getting everyone to agree takes a few rounds.',
    sara: "Sara wants her turn in the spotlight, and she's ready to earn it.",
    jorie: 'The family trophy is missing, and Jorie is following the trail.',
  };
  const ID = (id) => (id === 'jeff' ? 'jeffery' : id); // story ids -> game fighter ids
  const has = (id) => MM.FIGHTERS.some((d) => d.id === ID(id));

  function route(hero) { // same rule as ChatGPT's storyRoute()
    const hi = HEROES.indexOf(hero);
    const others = ROSTER.filter((id) => ![hero, 'jeff', 'patty'].includes(id));
    const shift = (hi * 4) % others.length;
    const ordered = others.slice(shift).concat(others.slice(0, shift));
    const r = [];
    for (let i = 0; i < ordered.length; i += 3) {
      const opp = ordered.slice(i, i + 3);
      r.push({ id: `${hero}-${r.length + 1}`, opponents: opp, place: PLACES[(r.length + hi) % PLACES.length] });
    }
    r.push({ id: `${hero}-jeff`, opponents: ['jeff'], place: 'agnew', boss: 'apparent' });
    r.push({ id: `${hero}-patty`, opponents: ['patty'], place: 'dunkirk', boss: 'secret' });
    return r;
  }
  // a route place -> a stage that exists (the arena with that name if it's in, otherwise a fixed fallback)
  function stageFor(place, i) {
    const key = place.split('-')[0];
    const s = MM.STAGES.find((st) => st.id === place || st.id.startsWith(key) || (st.name || '').toLowerCase().includes(key));
    const fixed = MM.STAGES.filter((st) => !st.custom); // never a home-made arena
    return (s && !s.custom ? s : fixed[Math.abs(i | 0) % fixed.length]).id;
  }

  // ---------- saves (one per hero; never overwrite another hero's progress) ----------
  const KEY = (h) => 'mm_story_v1_' + h;
  function load(h) { try { return Object.assign({ v: 1, done: [], jeff: false, revealed: false, ended: false, level: 2 }, JSON.parse(localStorage.getItem(KEY(h)) || '{}')); } catch (e) { return { v: 1, done: [], jeff: false, revealed: false, ended: false, level: 2 }; } }
  function save(h, s) { try { localStorage.setItem(KEY(h), JSON.stringify(s)); } catch (e) {} }

  function nodeState(n, s) {
    if (s.done.includes(n.id)) return 'done';
    if (n.boss === 'secret' && !s.jeff) return 'hidden';
    if (!n.opponents.every(has)) return 'waiting';
    return 'open';
  }
  function nextNode(h) { // first open fight in order (fights still waiting on fighters are skipped for now)
    const s = load(h), r = route(h);
    return r.find((n) => nodeState(n, s) === 'open') || null;
  }

  MM.story = { HEROES, NAMES, SEEDS, route, load, save, nodeState, nextNode, has, ID, stageFor };
})();
