// Checks the balance and rules features: game rules (no flying / starter blasters only), the 3-second start shield,
// the scope dropping after a miss, range drop-off, slower credits, the nerfs, and buyable sights.
// Prints a JSON summary. Usage: node tools/tests/balance.js  -> bal-*.png in the current folder
const {chromium}=require('playwright'),path=require('path');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1100,height:700}});
  const errs=[],out={};p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()==='error')errs.push('ERR '+m.text())});p.on('dialog',d=>d.accept());
  await p.goto('file://'+path.resolve(__dirname,'../../index.html'));
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
  out.startingCredits=await p.evaluate(()=>PROF.credits);
  out.numbers=await p.evaluate(()=>({queenHp:CL.q.hp,rookHp:CL.r.hp,kingHp:CL.k.hp,storm:WEAPONS.storm.dmg,twin:WEAPONS.twin.dmg,rail:WEAPONS.rail.dmg,minigun:WEAPONS.minigun.dmg,coach:WEAPONS.coach.dmg}));
  out.dropOff=await p.evaluate(()=>{const f=(id,d)=>+falloff(wstats(id,{}),d).toFixed(2);return {carbine:[f('carbine',10),f('carbine',25),f('carbine',40)],twin:[f('twin',8),f('twin',16),f('twin',30)],scattergun:[f('scatter',5),f('scatter',15),f('scatter',30)],railgun:[f('rail',10),f('rail',40)],rayLance:[f('raylance',40)],blurb:gunBlurb(wstats('carbine',{}))};});
  // own everything, so the rules have something to forbid
  await p.click('#bSettings');await p.fill('#codeIn','MORRISFIGHT6');await p.click('#bCode');await p.click('#bPractice');await p.click('#bCredits');await p.click('#bSettingsClose');
  await p.click('[data-opt=fly] [data-v=off]');await p.click('[data-opt=guns] [data-v=starter]');
  await p.screenshot({path:'bal-menu-rules.png'});
  await p.click('#bStart');await p.waitForTimeout(800);
  out.rules={stored:await p.evaluate(()=>G.rules),logged:await p.evaluate(()=>G.log.map(l=>l.html).join(' ').includes('no flying, starter blasters only'))};
  const capture=()=>p.evaluate(()=>{const C=window.__checkfire;const mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
    G.st=C.applyMove(G.st,mv(6,21));G.st=C.applyMove(G.st,mv(52,36));syncBoard();setTimeout(()=>C.performMove(mv(21,36)),0);});
  await capture();await p.waitForFunction(()=>D.active&&G.mode==='duel',null,{timeout:30000});await p.waitForTimeout(1200);
  await p.screenshot({path:'bal-loadout-rules.png'});
  out.rules.inDuel=await p.evaluate(()=>({gadget:D.gad.type,ownsHat:!!PROF.gadgets.hat,blaster:D.player.w.id,starter:DEFAULT_W[D.player.t],attachments:Object.keys(D.player.w.mods||{}).length,enemyBlaster:D.bot.w.id,enemyStarter:DEFAULT_W[D.bot.t],enemyGear:D.bot.gear||null}));
  await p.click('[data-w=coach]').catch(()=>{});await p.click('[data-g=hat]').catch(()=>{});await p.waitForTimeout(300);
  out.rules.afterTryingToSwitch=await p.evaluate(()=>({gadget:D.gad.type,blaster:D.player.w.id}));
  // start shield
  await p.evaluate(()=>{window.requestLock=()=>{fallbackLook=true;};});
  await p.click('#bFight');await p.evaluate(()=>{fallbackLook=true;D.count=.01;});
  await p.waitForFunction(()=>D.fighting,null,{timeout:30000});
  const aimFire=(miss)=>p.evaluate(miss=>{const P=D.player,B=D.bot,dx=B.pos.x-P.pos.x,dz=B.pos.z-P.pos.z,dy=(B.pos.y+1)-(P.pos.y+P.eye);P.yaw=Math.atan2(-dx,-dz)+(miss?1.2:0);P.pitch=Math.atan2(dy,Math.hypot(dx,dz));P.fireCd=0;P.ammo=P.w.mag;return playerFire();},miss);
  await p.evaluate(()=>{const P=D.player,B=D.bot;D.paused=false;P.pos.set(0,0,19);B.pos.set(0,0,12);B.vel.set(0,0,0);B.hp=B.max;});
  const hpA=await p.evaluate(()=>D.bot.hp);await aimFire(false);await p.waitForTimeout(100);
  out.shield={secondsAtStart:await p.evaluate(()=>+D.safe.toFixed(1)),enemyHpBefore:hpA,enemyHpAfterShotDuringShield:await p.evaluate(()=>D.bot.hp),bubbleShown:await p.evaluate(()=>D.bot.bubble.visible)};
  await p.screenshot({path:'bal-shield.png'});
  await p.waitForFunction(()=>D.safe<=0,null,{timeout:60000});
  await p.evaluate(()=>{const B=D.bot;B.pos.set(0,0,12);B.vel.set(0,0,0);D.player.pos.set(0,0,19);D.player.hp=D.player.max=999;});
  const hpB=await p.evaluate(()=>D.bot.hp);await aimFire(false);await p.waitForTimeout(100);
  out.shield.enemyHpAfterShieldEnds=[hpB,await p.evaluate(()=>+D.bot.hp.toFixed(1))];
  // scope: a hit keeps it up, a miss drops it
  out.scope=await p.evaluate(()=>{const P=D.player,B=D.bot;P.w=wstats('raylance',{});P.ammo=5;B.hp=B.max=900;B.pos.set(0,0,10);B.vel.set(0,0,0);P.pos.set(0,0,19);
    const dx=B.pos.x-P.pos.x,dz=B.pos.z-P.pos.z,dy=(B.pos.y+1)-(P.pos.y+P.eye);
    adsDown=true;P.yaw=Math.atan2(-dx,-dz);P.pitch=Math.atan2(dy,Math.hypot(dx,dz));P.fireCd=0;playerFire();const afterHit=adsDown;
    adsDown=true;P.yaw+=1.3;P.fireCd=0;playerFire();const afterMiss=adsDown;
    return {scopeStaysAfterHit:afterHit,scopeStaysAfterMiss:afterMiss};});
  // credits from a duel win
  const c0=await p.evaluate(()=>PROF.credits);
  await p.evaluate(()=>{D.bot.hp=0;finishDuel();});await p.waitForTimeout(300);
  out.credits={duelWin:await p.evaluate(()=>PROF.credits)-c0};
  await p.waitForFunction(()=>G.mode==='board'&&!D.active,null,{timeout:60000});
  const c1=await p.evaluate(()=>PROF.credits);await p.evaluate(()=>endGame(G.human,'Checkmate.'));await p.waitForTimeout(1200);
  out.credits.gameWinVeteran=await p.evaluate(()=>PROF.credits)-c1;
  await p.click('#bAgain');
  // sights
  await p.click('#bArmory1');await p.click('[data-tab=sights]');await p.waitForTimeout(300);
  await p.evaluate(()=>{for(const k in PROF.sights)if(k!=='cross')delete PROF.sights[k];PROF.sight='cross';PROF.credits=700;renderArmory();});
  await p.click('[data-sbuy=heart]');await p.waitForTimeout(200);
  out.sights={list:await p.evaluate(()=>Object.keys(SIGHTS).map(k=>SIGHTS[k].name+' '+SIGHTS[k].cost)),heartBought:await p.evaluate(()=>!!PROF.sights.heart&&PROF.sight==='heart'),creditsLeft:await p.evaluate(()=>PROF.credits)};
  await p.screenshot({path:'bal-armory-sights.png'});
  await p.click('[data-sbuy=laser]');await p.click('[data-sbuy=star]').catch(()=>{});await p.waitForTimeout(200);
  out.sights.cannotBuyWithoutCredits=await p.evaluate(()=>!PROF.sights.star&&PROF.credits);
  await p.click('#bArmClose');
  await p.click('[data-opt=fly] [data-v=on]');await p.click('[data-opt=guns] [data-v=any]');await p.click('#bStart');await p.waitForTimeout(800);
  await capture();await p.waitForFunction(()=>D.active&&G.mode==='duel',null,{timeout:30000});await p.waitForTimeout(800);
  out.rulesOff=await p.evaluate(()=>({gadget:D.gad.type,rules:G.rules}));
  await p.evaluate(()=>{window.requestLock=()=>{fallbackLook=true;};});
  await p.click('#bFight');await p.evaluate(()=>{fallbackLook=true;D.count=.01;});await p.waitForFunction(()=>D.fighting,null,{timeout:30000});
  out.sights.laserInDuel=await p.evaluate(()=>({mark:document.getElementById('cross').innerHTML.includes('#ff3b3b'),beam:!!D.vgun.userData.muzzle.children.find(c=>c.isMesh&&c.geometry.type==='CylinderGeometry')}));
  await p.evaluate(()=>{D.player.pos.set(0,0,19);D.bot.pos.set(-3,0,8);D.player.yaw=0;D.player.pitch=0;});await p.waitForTimeout(400);
  await p.screenshot({path:'bal-laser.png'});
  await p.evaluate(()=>{PROF.sight='heart';refreshViewGun();});await p.waitForTimeout(300);await p.screenshot({path:'bal-heart.png'});
  out.errors=errs;console.log(JSON.stringify(out,null,1));await b.close();
})();
