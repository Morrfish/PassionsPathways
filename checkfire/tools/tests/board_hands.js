// Screenshots of the board with toy-fighter pieces and of the first-person hands on every blaster.
// Usage: node tools/tests/board_hands.js   -> bh-board.png, bh-<weapon>.png in the current folder
const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1100,height:620}});
  const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()==='error')errs.push('ERR '+m.text())});
  await p.goto('file://'+require('path').resolve(__dirname,'../../index.html'));
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
  await p.click('#bStart');await p.waitForTimeout(1500);await p.screenshot({path:'bh-board.png'});
  await p.evaluate(()=>{const me={t:'q',c:'w',id:900,hp:125},them={t:'p',c:'b',id:901,hp:100};startDuel(me,them,{from:12,to:28,cap:28});
    window.requestLock=()=>{fallbackLook=true;};document.getElementById('intro').classList.add('hidden');PROF.room='bedroom';setupWorld();D.count=0;D.fighting=false;});
  for(const w of Object.keys(await p.evaluate(()=>WEAPONS))){
    await p.evaluate(w=>{const P=D.player;P.w=wstats(w,{});refreshViewGun();P.pos.set(14,0,19);P.yaw=.5;P.pitch=0;D.paused=false;D.recoil=0;},w);
    await p.waitForTimeout(500);await p.screenshot({path:`bh-${w}.png`,clip:{x:350,y:220,width:750,height:400}});
  }
  console.log(errs.slice(0,10).join('\n')||'no errors');await b.close();
})();
