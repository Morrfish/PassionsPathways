// Two-player same-network test. Needs the launcher built for this machine:
//   cd launcher && cp ../index.html . && go build -o /tmp/cf-test . && rm index.html
//   node tools/tests/network.js /tmp/cf-test
// Starts the launcher, hosts, connects a second "computer" through the network port, plays moves both ways,
// fights a live duel (hits, health, a rocket, an ability, the result) and checks both boards agree. Prints JSON.
const {chromium}=require('playwright'),{spawn}=require('child_process');
(async()=>{
  const bin=process.argv[2];if(!bin){console.log('usage: node network.js <launcher binary>');process.exit(1);}
  const srv=spawn(bin,[],{stdio:'ignore'});await new Promise(r=>setTimeout(r,1200));
  // two separate browsers, like two computers (pages in one headless browser do not both animate)
  const launch=()=>chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const b1=await launch(),b2=await launch();
  const out={},errs=[];
  const mk=async(b,url,tag)=>{const ctx=await b.newContext({viewport:{width:720,height:450}});const p=await ctx.newPage();
    p.on('pageerror',e=>errs.push(tag+' PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()==='error')errs.push(tag+' ERR '+m.text())});p.on('dialog',d=>d.accept());
    await p.goto(url);await p.waitForFunction(()=>ASSET.ready,null,{timeout:120000});await p.click('[data-opt=gfx] [data-v=lo]');return p;};   // 'Fast' graphics: two software-rendered browsers share this machine
  try{
    const A=await mk(b1,'http://127.0.0.1:47616/','host');
    await A.click('#bNet');await A.waitForSelector('#bNetHost');
    out.clientPortClosedBeforeHosting=await fetch('http://127.0.0.1:47620/__net').then(()=>false,()=>true);
    await A.click('#bNetHost');await A.waitForSelector('#bNetCreate',{state:'visible'});
    out.addressesShown=await A.evaluate(()=>[...document.querySelectorAll('.netaddr')].map(e=>e.textContent));
    await A.screenshot({path:'net-host.png'});
    const B=await mk(b2,'http://127.0.0.1:47620/','guest');            // the second computer comes in through the network port
    await B.click('#bNet');await B.waitForSelector('#bNetCreate',{state:'visible'});
    await B.fill('#netCode','ZZZZ');await B.click('#bNetJoin');await B.waitForTimeout(500);
    out.wrongCodeMessage=await B.evaluate(()=>document.getElementById('netMsg').textContent);
    await A.click('#bNetCreate');await A.waitForSelector('#netCodeBig');
    const code=await A.evaluate(()=>document.getElementById('netCodeBig').textContent);out.codeLooksRight=/^[A-Z]{4}$/.test(code);
    await A.screenshot({path:'net-code.png'});
    await B.fill('#netCode',code.toLowerCase());await B.click('#bNetJoin');
    await A.waitForFunction(()=>G.net&&G.mode==='board',null,{timeout:120000});await B.waitForFunction(()=>G.net&&G.mode==='board',null,{timeout:120000});
    out.sides={host:await A.evaluate(()=>G.human),guest:await B.evaluate(()=>G.human)};
    const move=(p,f,t)=>p.evaluate(([f,t])=>{const C=window.__checkfire;const m=C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);if(!m)throw new Error('no move '+f+'-'+t);C.performMove(m);},[f,t]);
    const turn=(p,c)=>p.waitForFunction(c=>G.st.turn===c&&!G.busy&&G.mode==='board',c,{timeout:240000});
    const board=p=>p.evaluate(()=>G.st.turn+':'+G.st.b.map(x=>x?(x.c==='w'?x.t.toUpperCase():x.t)+Math.round(x.hp):'.').join(''));
    await turn(A,'w');await move(A,6,21);await turn(B,'b');await move(B,52,36);await turn(A,'w');     // 1. Nf3 e5
    out.boardsMatchAfterTwoMoves=(await board(A))===(await board(B));
    await B.screenshot({path:'net-board-guest.png'});
    // 2. Nxe5: a capture -> both players go to the loadout screen
    await move(A,21,36);
    await A.waitForFunction(()=>D.active&&G.mode==='duel',null,{timeout:120000});await B.waitForFunction(()=>D.active&&G.mode==='duel',null,{timeout:120000});
    for(const p of [A,B])await p.evaluate(()=>{window.requestLock=()=>{fallbackLook=true;};});
    await A.evaluate(()=>{PROF.room='gym';setupWorld();});                      // the attacker picks the room
    await B.click('#bFight');await B.waitForTimeout(400);
    out.guestWaitsForHost=await B.evaluate(()=>!D.fighting&&document.getElementById('bFight').textContent.indexOf('Waiting')===0);
    await A.click('#bFight');
    if(process.env.NETDEBUG){const st=p=>p.evaluate(()=>({count:D.count,fighting:D.fighting,over:D.over,active:D.active,paused:D.paused,rdyMe:!!NET.rdy.me,rdyThem:!!NET.rdy.them,net:G.net,on:NET.on,intro:!document.getElementById('intro').classList.contains('hidden'),btn:document.getElementById('bFight').textContent,mode:G.mode,ws:NET.ws&&NET.ws.readyState}));console.log('A',JSON.stringify(await st(A)));console.log('B',JSON.stringify(await st(B)));}
    await A.waitForFunction(()=>D.fighting,null,{timeout:240000});await B.waitForFunction(()=>D.fighting,null,{timeout:240000});
    out.sameRoom={host:await A.evaluate(()=>D.room),guest:await B.evaluate(()=>D.room)};
    await A.waitForTimeout(1500);
    // each sees the other where they really are
    const pos=p=>p.evaluate(()=>({me:D.player.pos.toArray().map(v=>+v.toFixed(1)),them:D.bot.pos.toArray().map(v=>+v.toFixed(1))}));
    await A.evaluate(()=>{D.player.pos.set(6,0,14);});await A.waitForTimeout(1200);
    const pa=await pos(A),pb=await pos(B);out.positions={hostSeesSelf:pa.me,guestSeesHost:pb.them,guestSeesSelf:pb.me,hostSeesGuest:pa.them};
    await A.waitForFunction(()=>!(D.safe>0),null,{timeout:240000});await B.waitForFunction(()=>!(D.safe>0),null,{timeout:240000});   // the 3-second start shield has to run out first
    // host shoots the guest: the guest's health drops on both machines
    await B.evaluate(()=>{D.player.pos.set(6,0,4);D.player.max=D.player.hp=100;});await A.waitForTimeout(900);
    const aimFire=p=>p.evaluate(()=>{const P=D.player,B=D.bot,dx=B.pos.x-P.pos.x,dz=B.pos.z-P.pos.z,dy=(B.pos.y+1)-(P.pos.y+P.eye);P.yaw=Math.atan2(-dx,-dz);P.pitch=Math.atan2(dy,Math.hypot(dx,dz));P.fireCd=0;P.ammo=P.w.mag;return playerFire();});
    const hp0=await B.evaluate(()=>D.player.hp);
    for(let i=0;i<3;i++){await aimFire(A);await A.waitForTimeout(250);}
    await A.waitForTimeout(700);
    out.hit={guestHpBefore:hp0,guestHpAfter:await B.evaluate(()=>+D.player.hp.toFixed(1)),hostSeesGuestHp:await A.evaluate(()=>+D.bot.hp.toFixed(1)),guestSawShots:await B.evaluate(()=>FX.darts.length+FX.stuck.length)};
    await A.screenshot({path:'net-duel-host.png'});await B.screenshot({path:'net-duel-guest.png'});
    // guest uses their ability (pawn: Barrier) and the host sees it
    await B.evaluate(()=>{const P=D.player,was=P.abCd=0;useAbility(P);netSend({t:'ab'});});await A.waitForTimeout(600);
    out.ability={guestBarrier:await B.evaluate(()=>D.player.barrier>0),hostSeesBarrier:await A.evaluate(()=>D.bot.barrier>0)};
    await A.waitForTimeout(2800);
    // host finishes the duel
    for(let i=0;i<40;i++){if(await A.evaluate(()=>D.over))break;await aimFire(A);await A.waitForTimeout(200);}
    await A.waitForFunction(()=>G.mode==='board'&&!D.active,null,{timeout:240000});await B.waitForFunction(()=>G.mode==='board'&&!D.active,null,{timeout:240000});
    await turn(B,'b');
    const ba=await board(A),bb=await board(B);
    out.afterDuel={boardsMatch:ba===bb,captured:await A.evaluate(()=>G.st.b.filter(Boolean).length)===31,hostResult:await A.evaluate(()=>D.result),guestResult:await B.evaluate(()=>D.result)};
    if(ba!==bb)out.afterDuel.boards=[ba,bb];
    // guest replies with a move, then leaves: the computer takes over for the host
    await move(B,57,42);await turn(A,'w');out.boardsMatchAfterReply=(await board(A))===(await board(B));
    await b2.close();await A.waitForTimeout(1500);
    out.afterGuestLeft={hostStillPlaying:await A.evaluate(()=>G.mode==='board'&&!G.over),netOff:await A.evaluate(()=>!G.net)};
    await move(A,36,53);await A.waitForTimeout(6000);
    out.afterGuestLeft.computerAnswers=await A.evaluate(()=>G.log.length>0&&(G.mode==='duel'||G.st.turn==='w'||G.busy));
  }catch(e){out.failed=String(e&&e.stack||e).slice(0,600);}
  out.errors=errs;console.log(JSON.stringify(out,null,1));
  await b1.close();await b2.close().catch(()=>{});srv.kill();
})();
