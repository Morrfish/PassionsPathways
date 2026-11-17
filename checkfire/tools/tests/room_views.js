// Screenshots of every room from the player's start and from a raised corner, to check props and layout.
// Usage: node tools/tests/room_views.js [room ...]   -> rv-<room>-1.png / rv-<room>-2.png in the current folder
const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1100,height:620}});
  const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()==='error')errs.push('ERR '+m.text())});
  await p.goto('file://'+require('path').resolve(__dirname,'../../index.html'));
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
  await p.click('#bStart');await p.waitForTimeout(400);
  await p.evaluate(()=>{const me={t:'n',c:'w',id:900,hp:125},them={t:'p',c:'b',id:901,hp:100};startDuel(me,them,{from:12,to:28,cap:28});
    window.requestLock=()=>{fallbackLook=true;};document.getElementById('intro').classList.add('hidden');D.count=0;D.fighting=false;});
  const all=['library','diner','gym','toystore','greenhouse','arcade','attic','beach','bedroom','park','ruins','citadel','forge','maze'];
  const rooms=process.argv.slice(2).length?process.argv.slice(2):all;
  const views=[[[0,0,21],0,-.1],[[19,11,19],Math.PI/4,-.52]];
  for(const room of rooms)for(let v=0;v<views.length;v++){
    const [pos,yaw,pitch]=views[v];
    await p.evaluate(([room,pos,yaw,pitch])=>{PROF.room=room;setupWorld();const P=D.player;P.pos.set(...pos);P.yaw=yaw;P.pitch=pitch;
      D.bot.pos.set(-3,0,6);D.vgun.visible=false;D.paused=true;placeDuelCam();},[room,pos,yaw,pitch]);
    await p.waitForTimeout(900);await p.evaluate(()=>{D.vgun.visible=false;});await p.waitForTimeout(200);
    await p.screenshot({path:`rv-${room}-${v+1}.png`});
  }
  console.log(errs.slice(0,10).join('\n')||'no errors');await b.close();
})();
