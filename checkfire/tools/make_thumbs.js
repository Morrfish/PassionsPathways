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
  const views={};
  for(const r of ['bedroom','library','diner','gym','toystore','greenhouse','arcade','attic','beach','ruins','citadel','forge','maze'])views[r]=[[0,0,19],0,-.12];
  views.park=[[0,0,19],-.75,.06];
  // the Blender-modelled rooms read better from a little above, off to one side
  Object.assign(views,{library:[[9,5,21],.35,-.25],diner:[[7,5,21],.28,-.26],gym:[[6,6,22],.22,-.24],toystore:[[-7,6,22],-.26,-.26],
    greenhouse:[[-8,5,21],-.3,-.22],arcade:[[-8,6,22],-.3,-.3],attic:[[8,5,21],.3,-.22],beach:[[-9,5,22],-.35,-.22]});
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
