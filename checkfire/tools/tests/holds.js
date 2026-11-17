// Screenshots of every blaster's two-handed hold: on a fighter (three angles + aiming up/down) and in first person
// (idle, aiming down sights, mid-reload). Usage: node tools/tests/holds.js [path/to/index.html] [outPrefix]
const {chromium}=require('playwright'),path=require('path');
(async()=>{
  const html=path.resolve(process.argv[2]||path.join(__dirname,'../../index.html')),pre=process.argv[3]||'h';
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1100,height:620}});
  const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()==='error')errs.push('ERR '+m.text())});
  await p.goto('file://'+html);
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
  await p.click('#bStart');await p.waitForTimeout(400);
  await p.evaluate(()=>{const me={t:'q',c:'w',id:900,hp:125},them={t:'n',c:'b',id:901,hp:100};startDuel(me,them,{from:12,to:28,cap:28});
    window.requestLock=()=>{fallbackLook=true;};document.getElementById('intro').classList.add('hidden');PROF.room='gym';setupWorld();D.count=0;D.fighting=false;
    document.getElementById('dhud')&&document.getElementById('dhud').classList.add('hidden');});
  const ids=await p.evaluate(()=>Object.keys(WEAPONS));
  // fighter views: [camera offset from the fighter, fighter aim pitch]
  const views={fl:[[-1.0,1.5,-1.75],0],fr:[[1.15,1.45,-1.65],0],side:[[2.0,1.3,-.25],0],up:[[-1.0,1.5,-1.75],.45],down:[[-1.0,1.5,-1.75],-.45]};
  for(const id of ids){
    for(const [vn,[off,pitch]] of Object.entries(views)){
      await p.evaluate(([id,off,pitch])=>{const B=D.bot,P=D.player;D.paused=true;
        if(B.w.id!==id||!B.model){if(B.model)duelScene.remove(B.model);setWeapon(B,id);buildBotModel(B);}
        B.pos.set(8,0,18);B.yaw=Math.PI;B.pitch=pitch;B.model.position.copy(B.pos);B.model.rotation.y=B.yaw;B.gun.rotation.x=pitch;
        if(B.fig&&B.fig.userData.ghost){B.fig.userData.ghost.rotation.x=pitch;poseArms(B.fig);}
        // the fighter faces +z here (yaw = PI), so "in front of it" is +z
        const cx=8-off[0],cz=18-off[2];P.pos.set(cx,off[1]-P.eye,cz);P.yaw=Math.atan2(cx-8,cz-18);P.pitch=-.2;D.vgun.visible=false;placeDuelCam();},[id,off,pitch]);
      await p.waitForTimeout(260);await p.evaluate(()=>{D.vgun.visible=false;});await p.waitForTimeout(60);
      await p.screenshot({path:`${pre}-fig-${id}-${vn}.png`,clip:{x:330,y:60,width:440,height:440}});
    }
  }
  // first person
  for(const id of ids){
    for(const st of ['idle','ads','reload']){
      await p.evaluate(([id,st])=>{const P=D.player,B=D.bot;B.pos.set(-20,0,-20);if(B.model)B.model.position.copy(B.pos);
        if(P.w.id!==id){P.w=wstats(id,{});P.ammo=P.w.mag;refreshViewGun();}
        P.pos.set(14,0,19);P.yaw=.5;P.pitch=0;D.paused=false;D.recoil=0;adsDown=st==='ads';P.reloading=st==='reload'?P.w.reload*.5:0;D.vgun.visible=true;},[id,st]);
      await p.waitForTimeout(st==='reload'?120:420);
      await p.screenshot({path:`${pre}-fp-${id}-${st}.png`,clip:{x:250,y:170,width:850,height:450}});
      await p.evaluate(()=>{adsDown=false;D.player.reloading=0;});
    }
  }
  console.log(errs.slice(0,10).join('\n')||'no errors');await b.close();
})();
