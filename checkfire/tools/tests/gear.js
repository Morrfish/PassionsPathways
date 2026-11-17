// Screenshots of the Propeller Hat and Jetpack on all six fighter types (both teams), and of the Repair Core at duel distance
// in a bright and a dark room. Usage: node tools/tests/gear.js [path/to/index.html] [outPrefix]
const {chromium}=require('playwright'),path=require('path');
(async()=>{
  const html=path.resolve(process.argv[2]||path.join(__dirname,'../../index.html')),pre=process.argv[3]||'g';
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1100,height:620}});
  const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()==='error')errs.push('ERR '+m.text())});
  await p.goto('file://'+html);
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
  await p.click('#bStart');await p.waitForTimeout(400);
  await p.evaluate(()=>{const me={t:'q',c:'w',id:900,hp:125},them={t:'n',c:'b',id:901,hp:100};startDuel(me,them,{from:12,to:28,cap:28});
    window.requestLock=()=>{fallbackLook=true;};document.getElementById('intro').classList.add('hidden');PROF.room='gym';setupWorld();D.count=0;D.fighting=false;});
  const has=await p.evaluate(()=>typeof wearGear==='function');
  for(const c of ['b','w'])for(const t of ['p','n','b','r','q','k'])for(const [gi,gear] of [[0,'hat'],[1,'jetpack']])for(const [vn,off] of [['front',[-1.3,1.9,-2.3]],['back',[1.5,1.9,2.3]]]){
    await p.evaluate(([t,c,gi,off])=>{const B=D.bot,P=D.player;D.paused=true;
      if(B.model)duelScene.remove(B.model);const piece={t,c,id:800+gi,hp:CL[t].hp};const nb=makeFighter(piece,false);Object.assign(B,nb);B.model=null;buildBotModel(B);
      B.pos.set(8,0,18);B.yaw=Math.PI;B.model.position.copy(B.pos);B.model.rotation.y=B.yaw;
      const cx=8-off[0],cz=18-off[2];P.pos.set(cx,off[1]-P.eye,cz);P.yaw=Math.atan2(cx-8,cz-18);P.pitch=-.22;D.vgun.visible=false;placeDuelCam();},[t,c,gi,off]);
    await p.waitForTimeout(240);await p.evaluate(()=>{D.vgun.visible=false;});await p.waitForTimeout(50);
    await p.screenshot({path:`${pre}-gear-${c}-${t}-${gear}-${vn}.png`,clip:{x:330,y:40,width:440,height:480}});
  }
  // Repair Core from 12 units away (a normal duel distance) in bright and dark rooms
  for(const room of ['gym','beach','attic','arcade','citadel']){
    await p.evaluate(room=>{PROF.room=room;setupWorld();const P=D.player;D.paused=true;D.bot.pos.set(-20,0,-20);D.bot.model.position.copy(D.bot.pos);
      P.pos.set(8,0,12);P.yaw=0;P.pitch=-.03;D.vgun.visible=false;placeDuelCam();},room);
    await p.waitForTimeout(700);await p.evaluate(()=>{D.vgun.visible=false;});await p.waitForTimeout(100);
    await p.screenshot({path:`${pre}-core-${room}.png`,clip:{x:350,y:160,width:400,height:300}});
    await p.evaluate(()=>{D.player.pos.set(8,0,4.5);placeDuelCam();});await p.waitForTimeout(300);
    await p.screenshot({path:`${pre}-core-${room}-near.png`,clip:{x:350,y:160,width:400,height:300}});
  }
  console.log((has?'':'(old build: no gear) ')+(errs.slice(0,10).join('\n')||'no errors'));await b.close();
})();
