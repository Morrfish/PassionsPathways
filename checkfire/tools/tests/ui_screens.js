const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1366,height:768}});
  const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()==='error')errs.push('ERR '+m.text())});
  p.on('dialog',d=>d.accept());
  await p.goto('file://'+require('path').resolve(__dirname,'../../index.html')+'');
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:60000});
  await p.waitForTimeout(800);await p.screenshot({path:'u1-menu.png'});
  await p.click('#bStart');await p.waitForTimeout(1500);await p.screenshot({path:'u2-board.png'});
  await p.evaluate(()=>{const C=window.__checkfire,G=C.G;const mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
    G.st=C.applyMove(G.st,mv(6,21));G.st=C.applyMove(G.st,mv(52,36));setTimeout(()=>C.performMove(C.legalMoves(G.st).find(m=>m.from===21&&m.to===36)),0);});
  await p.waitForTimeout(2000);await p.screenshot({path:'u3-loadout.png'});
  await p.click('[data-lt=appearance]');await p.waitForTimeout(400);await p.screenshot({path:'u4-appearance.png'});
  await p.click('[data-lt=loadout]');
  await p.click('[data-roompick]');await p.waitForTimeout(500);await p.screenshot({path:'u5-rooms.png'});
  await p.click('[data-room=bedroom]');await p.click('#rpConfirm');await p.waitForTimeout(800);
  await p.evaluate(()=>{window.requestLock=()=>{fallbackLook=true;};});
  await p.click('#bFight');await p.evaluate(()=>{fallbackLook=true;D.count=.01;D.player.hp=D.player.max=500;D.bot.pos.set(0,0,8);});
  await p.waitForTimeout(1500);
  for(let i=0;i<6;i++){await p.evaluate(()=>{const P=D.player,B=D.bot;B.vel.set(0,0,0);const dx=B.pos.x-P.pos.x,dz=B.pos.z-P.pos.z,dy=(B.pos.y+1)-(P.pos.y+P.eye);P.yaw=Math.atan2(-dx,-dz);P.pitch=Math.atan2(dy,Math.hypot(dx,dz));P.fireCd=0;playerFire();});await p.waitForTimeout(60);}
  await p.waitForTimeout(150);await p.screenshot({path:'u6-hud.png'});
  await p.evaluate(()=>{D.player.pos.set(0,0,19);D.player.yaw=0;D.player.pitch=-.05;D.bot.pos.set(-2,0,12);});await p.waitForTimeout(1200);await p.screenshot({path:'u7-bot.png'});
  console.log(await p.evaluate(()=>JSON.stringify({darts:FX.darts.length,stuck:FX.stuck.length,bursts:FX.bursts.length,fig:!!D.bot.fig,bhp:Math.round(D.bot.hp)})));
  console.log(errs.slice(0,10).join('\n')||'no errors');await b.close();
})();
