// Renders a picture card for every room in the room picker (assets/thumbs/<room>.jpg).
// Usage: node tools/make_thumbs.js   (needs Playwright + Chromium; run after build.py, then build again)
const {chromium}=require('playwright');
const path=require('path');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:960,height:600}});
  await p.goto('file://'+path.resolve(__dirname,'../index.html'));
  await p.waitForFunction(()=>window.ASSET&&ASSET.ready,null,{timeout:60000}).catch(()=>{});
  await p.click('#bStart');await p.waitForTimeout(400);
  // camera spots that show off each room
  const views={bedroom:[[-14,0,17],2.55,-.18],park:[[-6,0,16],2.6,-.02],library:[[-14,0,17],2.4,-.12],diner:[[-10,0,18],2.7,-.1],
    gym:[[-12,0,18],2.5,-.12],toystore:[[-10,0,19.5],2.65,-.1],greenhouse:[[-12,0,18],2.55,-.1],arcade:[[-10,0,18],2.6,-.12],
    attic:[[-12,0,18],2.55,-.1],beach:[[-10,0,19],2.6,-.06],ruins:[[0,0,19],0,-.1],citadel:[[0,0,19],0,-.08],forge:[[0,0,19],0,-.12],maze:[[0,0,19],0,-.1]};
  await p.evaluate(()=>{const me={t:'n',c:'w',id:900,hp:125},them={t:'p',c:'b',id:901,hp:100};startDuel(me,them,{from:12,to:28,cap:28});
    window.requestLock=()=>{fallbackLook=true;};document.getElementById('intro').classList.add('hidden');D.count=0;D.fighting=false;});
  const fs=require('fs');fs.mkdirSync(path.resolve(__dirname,'../assets/thumbs'),{recursive:true});
  for(const [room,[pos,yaw,pitch]] of Object.entries(views)){
    await p.evaluate(([room,pos,yaw,pitch])=>{PROF.room=room;setupWorld();const P=D.player;P.pos.set(...pos);P.yaw=yaw;P.pitch=pitch;
      D.bot.pos.set(pos[0]*.2,0,pos[2]*.1);D.vgun.visible=false;D.paused=true;placeDuelCam();},[room,pos,yaw,pitch]);
    await p.waitForTimeout(700);
    await p.evaluate(()=>{D.vgun.visible=false;});
    await p.waitForTimeout(300);
    await p.screenshot({path:path.resolve(__dirname,`../assets/thumbs/${room}.jpg`),type:'jpeg',quality:72,clip:{x:0,y:30,width:960,height:540}});
    console.log('thumb',room);
  }
  await b.close();
})();
