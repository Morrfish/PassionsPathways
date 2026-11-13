// Checks the King's melee weapons (three tiers, the hammer's lightning bolt) and his Last Stand, for the player and for
// the computer's King. Prints a JSON summary. Usage: node tools/tests/king.js  -> king-*.png in the current folder
const {chromium}=require('playwright'),path=require('path');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1100,height:700}});
  const errs=[],out={};p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()==='error')errs.push('ERR '+m.text())});p.on('dialog',d=>d.accept());
  await p.goto('file://'+path.resolve(__dirname,'../../index.html'));
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
  // armory: upgrades are bought in order
  await p.evaluate(()=>{PROF.credits=1200;PROF.melee=0;saveProfile();});
  await p.click('#bArmory1');await p.click('[data-tab=k]');await p.waitForTimeout(300);
  await p.screenshot({path:'king-armory.png'});
  await p.click('[data-melee="1"]');const t1=await p.evaluate(()=>[PROF.melee,PROF.credits]);
  await p.click('[data-melee="2"]');const t2=await p.evaluate(()=>[PROF.melee,PROF.credits]);
  out.armory={afterFirstUpgrade:t1,afterSecondUpgrade:t2,tiers:await p.evaluate(()=>MELEE.map(m=>m.name+' '+m.cost+' ('+m.dmg+' dmg)'))};
  await p.click('#bArmClose');await p.click('#bStart');await p.waitForTimeout(600);
  const duel=async(me,them)=>{await p.evaluate(([me,them])=>{if(D.active){D.over=true;D.endT=0;exitDuel();}
      const a={t:me,c:'w',id:900,hp:CL[me].hp},d={t:them,c:'b',id:901,hp:CL[them].hp};startDuel(a,d,{from:12,to:28,cap:28});
      window.requestLock=()=>{fallbackLook=true;};document.getElementById('intro').classList.add('hidden');PROF.room='gym';setupWorld();show('dhud',true);hudInit();D.count=.01;},[me,them]);
    await p.waitForFunction(()=>D.fighting,null,{timeout:30000});await p.evaluate(()=>{D.safe=0;fallbackLook=true;});};
  const face=()=>p.evaluate(()=>{const P=D.player,B=D.bot,dx=B.pos.x-P.pos.x,dz=B.pos.z-P.pos.z,dy=(B.pos.y+1)-(P.pos.y+P.eye);P.yaw=Math.atan2(-dx,-dz);P.pitch=Math.atan2(dy,Math.hypot(dx,dz));});
  // --- player King: melee
  await duel('k','r');
  out.melee={};
  for(const tier of [0,1,2]){
    out.melee[['broadsword','glowBlade','hammer'][tier]]=await p.evaluate(tier=>{const P=D.player,B=D.bot;PROF.melee=tier;D.paused=true;B.hp=B.max;P.meleeCd=0;P.pos.set(9,0,10);B.pos.set(9,0,7.6);B.vel.set(0,0,0);
      const dx=B.pos.x-P.pos.x,dz=B.pos.z-P.pos.z;P.yaw=Math.atan2(-dx,-dz);P.pitch=0;const h0=B.hp;const swung=meleeSwing(P);const close=h0-B.hp;
      // out of reach: only the hammer's lightning should connect
      B.hp=B.max;P.meleeCd=0;B.pos.set(9,0,-4);const h1=B.hp;meleeSwing(P);const far=h1-B.hp;
      // blocked while cooling down
      const again=meleeSwing(P);
      return {swung,damageUpClose:+close.toFixed(1),damageFromAcrossTheRoom:+far.toFixed(1),secondSwingStraightAway:again};},tier);
    if(tier===2){await p.evaluate(()=>{D.player.meleeCd=0;D.bot.pos.set(9,0,-2);meleeSwing(D.player);D.paused=false;});await p.waitForTimeout(90);await p.screenshot({path:'king-hammer.png'});}
  }
  out.melee.notAKing=await (async()=>{await duel('q','r');return p.evaluate(()=>meleeSwing(D.player));})();
  // --- player King: Last Stand, hit
  await duel('k','p');
  await p.evaluate(()=>{const P=D.player,B=D.bot;D.paused=true;B.hp=B.max;P.pos.set(0,0,12);B.pos.set(0,0,6);B.vel.set(0,0,0);hurt(P,999,B,false);});
  out.lastStand={afterKnockdown:await p.evaluate(()=>({down:D.player.lastStand>0,duelOver:D.over,hp:D.player.hp,shots:D.player.ammo,pistol:D.player.w.name}))};
  await p.evaluate(()=>{D.paused=false;});await p.waitForTimeout(500);await face();await p.waitForTimeout(200);await p.screenshot({path:'king-laststand.png'});
  out.lastStand.cannotBeHurtWhileDown=await p.evaluate(()=>{const h=D.player.hp;hurt(D.player,50,D.bot,false);return D.player.hp===h;});
  await p.evaluate(()=>{D.paused=true;});await face();
  out.lastStand.hit=await p.evaluate(()=>{const P=D.player,B=D.bot,h=B.hp;P.fireCd=0;playerFire();return {enemyDamage:+(h-B.hp).toFixed(1),standing:!(P.lastStand>0),hp:P.hp,duelOver:D.over,blasterBack:P.w.name};});
  // second knockdown in the same duel: no second chance
  out.lastStand.secondKnockdownEndsIt=await p.evaluate(()=>{hurt(D.player,999,D.bot,false);return D.over&&D.player.hp===0&&!(D.player.lastStand>0);});
  // --- Last Stand, miss
  await duel('k','p');
  out.lastStand.miss=await p.evaluate(()=>{const P=D.player,B=D.bot;D.paused=true;P.pos.set(0,0,12);B.pos.set(0,0,6);hurt(P,999,B,false);const dx=B.pos.x-P.pos.x,dz=B.pos.z-P.pos.z;P.yaw=Math.atan2(-dx,-dz)+1.4;P.pitch=0;P.fireCd=0;playerFire();return {duelOver:D.over,hp:P.hp,won:D.result&&D.result.attackerWon};});
  // --- Last Stand, time runs out
  await duel('k','p');
  await p.evaluate(()=>{const P=D.player,B=D.bot;P.pos.set(0,0,12);B.pos.set(-20,0,-20);hurt(P,999,B,false);});
  out.lastStand.timeout=await p.waitForFunction(()=>D.over,null,{timeout:120000}).then(()=>p.evaluate(()=>({duelOver:D.over,hp:D.player.hp})),()=>({duelOver:false}));
  // --- other pieces do not get a Last Stand
  await duel('q','p');
  out.lastStand.queenJustFalls=await p.evaluate(()=>{hurt(D.player,999,D.bot,false);return D.over&&!(D.player.lastStand>0);});
  // --- the computer's King: goes down once, takes his shot, and the duel resolves either way
  await duel('q','k');
  await p.evaluate(()=>{const P=D.player,B=D.bot;P.hp=P.max=999;P.pos.set(0,0,12);B.pos.set(0,0,6);hurt(B,9999,P,false);});
  out.computerKing={down:await p.evaluate(()=>D.bot.lastStand>0&&!D.over)};
  await p.waitForTimeout(400);await p.screenshot({path:'king-enemy-down.png'});
  await p.waitForFunction(()=>D.over||!(D.bot.lastStand>0),null,{timeout:120000}).catch(()=>{});
  out.computerKing.after=await p.evaluate(()=>({gotBackUp:!D.over&&D.bot.hp===LAST_STAND.hp,fell:D.over&&D.bot.hp===0,shotFired:D.bot.lsFired}));
  // --- rules: starter blasters only means the plain Broadsword
  out.starterRuleTier=await p.evaluate(()=>{PROF.melee=2;G.rules={fly:true,starter:true};const t=meleeTier(D.player);G.rules={fly:true,starter:false};return t;});
  out.errors=errs;console.log(JSON.stringify(out,null,1));await b.close();
})();
