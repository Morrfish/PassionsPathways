// Plays Checkfire with a simulated game controller (fake Gamepad API) and checks menus, board and a duel.
const {chromium}=require('playwright');
const path=require('path');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1366,height:768}});
  const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' | '+(e.stack||'').split('\n')[1]));
  await p.addInitScript(()=>{
    const pad={id:'Test pad',index:0,connected:true,mapping:'standard',timestamp:0,axes:[0,0,0,0],
      buttons:Array.from({length:17},()=>({pressed:false,touched:false,value:0})),
      vibrationActuator:{playEffect(){window.__rumble=(window.__rumble||0)+1;return Promise.resolve('complete');}}};
    window.__pad=pad;navigator.getGamepads=()=>[pad,null,null,null];
    window.padBtn=(i,on)=>{pad.buttons[i].pressed=on;pad.buttons[i].value=on?1:0;};
  });
  await p.goto('file://'+path.resolve(__dirname,'../../index.html'));
  await p.waitForFunction(()=>typeof ASSET!=='undefined'&&ASSET.ready,null,{timeout:120000});
  const tap=async(i,hold=180)=>{await p.evaluate(i=>padBtn(i,true),i);await p.waitForTimeout(hold);await p.evaluate(i=>padBtn(i,false),i);await p.waitForTimeout(220);};
  const st=()=>p.evaluate(()=>({mode:G.mode,active:PAD.active,focus:PAD.focus&&(PAD.focus.id||PAD.focus.textContent.trim().slice(0,30)),sq:PAD.sq,sel:G.sel}));
  await tap(13);                                   // any input wakes the controller mode
  console.log('menu',JSON.stringify(await st()));
  await p.screenshot({path:'pad1-menu.png'});
  // press A on the focused default button (Start battle)
  const f=await p.evaluate(()=>PAD.focus&&PAD.focus.id);
  if(f!=='bStart'){await p.evaluate(()=>padFocus(document.getElementById('bStart')));}
  await tap(0);await p.waitForTimeout(1200);
  console.log('board',JSON.stringify(await st()));
  // select e2 (cursor starts there), move it up twice to e4, press A
  await tap(0);await tap(12);await tap(12);await tap(0);
  await p.waitForTimeout(3500);
  console.log('log',await p.evaluate(()=>G.log.map(l=>l.html.replace(/<[^>]+>/g,'')).slice(-3).join(' | ')));
  await p.screenshot({path:'pad2-board.png'});
  // duel: set up a capture and drive the loadout with the controller
  await p.evaluate(()=>{const C=window.__checkfire,G=C.G;const mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
    G.st=C.initialState();G.st=C.applyMove(G.st,mv(12,28));G.st=C.applyMove(G.st,mv(51,35));setTimeout(()=>C.performMove(C.legalMoves(G.st).find(m=>m.from===28&&m.to===35)),0);});
  await p.waitForTimeout(2500);
  console.log('intro',JSON.stringify(await st()));
  await tap(5);await p.waitForTimeout(300);           // RB: next tab
  console.log('tab after RB',await p.evaluate(()=>document.querySelector('#loTabs .lo-tab.on')&&document.querySelector('#loTabs .lo-tab.on').textContent.trim()));
  await tap(4);
  await p.screenshot({path:'pad3-loadout.png'});
  await p.evaluate(()=>padFocus(document.getElementById('bFight')));await tap(0);
  await p.evaluate(()=>{D.count=.01;D.safe=0;D.player.hp=D.player.max=900;D.bot.pos.set(0,0,9);});
  await p.waitForTimeout(800);
  const before=await p.evaluate(()=>({z:D.player.pos.z,yaw:D.player.yaw,ammo:D.player.ammo}));
  await p.evaluate(()=>{__pad.axes[1]=-1;__pad.axes[2]=.6;});await p.waitForTimeout(900);
  await p.evaluate(()=>{__pad.axes[1]=0;__pad.axes[2]=0;});
  await p.evaluate(()=>padBtn(7,true));await p.waitForTimeout(700);await p.evaluate(()=>padBtn(7,false));
  await p.waitForTimeout(200);
  const after=await p.evaluate(()=>({z:D.player.pos.z,yaw:D.player.yaw,ammo:D.player.ammo,rumble:window.__rumble||0,fighting:D.fighting}));
  console.log('duel before',JSON.stringify(before),'after',JSON.stringify(after));
  await p.screenshot({path:'pad4-duel.png'});
  await tap(9);await p.waitForTimeout(300);
  console.log('paused',await p.evaluate(()=>!document.getElementById('pause').classList.contains('hidden')));
  await tap(9);await p.waitForTimeout(300);
  console.log('resumed',await p.evaluate(()=>document.getElementById('pause').classList.contains('hidden')&&!D.paused));
  console.log(errs.slice(0,8).join('\n')||'no errors');await b.close();
})();
