const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1366,height:768}});
  const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()==='error')errs.push('ERR '+m.text())});
  p.on('dialog',d=>d.accept());
  await p.goto('file://'+require('path').resolve(__dirname,'../../index.html')+'');
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
  await p.click('#bSettings');await p.fill('#codeIn','MORRISFIGHT6');await p.click('#bCode');await p.click('#bPractice');await p.click('#bSettingsClose');await p.click('#bArmory1');await p.click('[data-tab=k]');await p.click('[data-sel=handcannon]');await p.waitForTimeout(800);
  await p.screenshot({path:'e1-armory.png'});
  await p.click('[data-tab=gadgets]');await p.click('[data-sel=jetpack]');await p.waitForTimeout(700);await p.screenshot({path:'e2-armory-jet.png',clip:{x:150,y:150,width:420,height:300}});
  await p.click('#bArmClose');await p.click('#bStart');await p.waitForTimeout(800);
  await p.evaluate(()=>{const C=window.__checkfire,G=C.G;const mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
    G.st=C.applyMove(G.st,mv(6,21));G.st=C.applyMove(G.st,mv(52,36));setTimeout(()=>C.performMove(C.legalMoves(G.st).find(m=>m.from===21&&m.to===36)),0);});
  await p.waitForTimeout(2200);await p.click('[data-g=hat]');await p.waitForTimeout(900);await p.screenshot({path:'e3-loadout.png'});
  await p.evaluate(()=>{window.requestLock=()=>{fallbackLook=true;};PROF.room='bedroom';setupWorld();});
  await p.click('#bFight');await p.evaluate(()=>{fallbackLook=true;D.count=.01;D.player.hp=D.player.max=900;D.bot.hp=D.bot.max=900;});
  await p.waitForTimeout(700);
  // abilities on the enemy (visible), shots, view model
  const abil=async(t)=>{await p.evaluate(t=>{const B=D.bot;B.t=t;B.cls=CL[t];B.abCd=0;B.pos.set(0,0,10);B.yaw=Math.PI;useAbility(B);D.player.pos.set(0,0,17);D.player.yaw=0;D.player.pitch=-.08;},t);};
  await abil('r');await p.waitForTimeout(500);await p.screenshot({path:'e4-rampart.png'});
  await abil('k');await p.waitForTimeout(350);await p.screenshot({path:'e5-mend.png'});
  await abil('p');await p.waitForTimeout(300);await p.screenshot({path:'e6-barrier.png'});
  for(let i=0;i<4;i++){await p.evaluate(()=>{const P=D.player,B=D.bot;B.vel.set(0,0,0);B.barrier=0;const dx=B.pos.x-P.pos.x,dz=B.pos.z-P.pos.z,dy=(B.pos.y+1)-(P.pos.y+P.eye);P.yaw=Math.atan2(-dx,-dz);P.pitch=Math.atan2(dy,Math.hypot(dx,dz));P.fireCd=0;playerFire();});await p.waitForTimeout(40);}
  await p.screenshot({path:'e7-darts.png'});
  for(const r of ['citadel','toystore','gym','arcade','forge','greenhouse','diner']){
    const pos={citadel:[0,0,11],toystore:[0,0,-6],gym:[0,0,5],arcade:[0,0,4],forge:[0,0,12],greenhouse:[10,0,-6],diner:[4,0,-13]}[r];
    const yaw={citadel:0,toystore:Math.PI,gym:0,arcade:0,forge:0,greenhouse:-2.3,diner:-1.2}[r];
    await p.evaluate(([r,pos,yaw])=>{PROF.room=r;setupWorld();D.player.hp=D.player.max=900;D.bot.pos.set(-20,0,-20);D.player.pos.set(...pos);D.player.yaw=yaw;D.player.pitch=-.25;},[r,pos,yaw]);
    await p.waitForTimeout(900);await p.screenshot({path:`e8-${r}.png`});
  }
  console.log(errs.slice(0,10).join('\n')||'no errors');await b.close();
})();
