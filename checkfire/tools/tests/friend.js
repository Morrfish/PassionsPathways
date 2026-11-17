// Play a Friend end to end: two Checkfire launchers (two "computers"), player A makes a game, player B types
// only the code into their OWN launcher's page and joins. Then White moves and Black must see it.
// Usage: node friend.js <launcher binary>
const {chromium}=require('playwright');const {spawn}=require('child_process');
const bin=process.argv[2];const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const A=spawn(bin,[],{env:{...process.env,CHECKFIRE_PORT:'47616'}}),B=spawn(bin,[],{env:{...process.env,CHECKFIRE_PORT:'47617'}});
  await sleep(800);let fail=0;const errs=[];
  const brs=[];
  const open=async port=>{const br=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});brs.push(br);
    const p=await (await br.newContext({viewport:{width:720,height:450}})).newPage();p.on('pageerror',e=>errs.push(port+': '+e.message));
    await p.goto(`http://127.0.0.1:${port}/`);await p.waitForFunction(()=>ASSET.ready,null,{timeout:120000});await p.click('[data-opt=gfx] [data-v=lo]');return p;};
  try{
    const pa=await open(47616),pb=await open(47617);
    await pa.click('#bNet');await sleep(500);await pa.click('#bNetCreate');
    await pa.waitForSelector('#netCodeBig',{timeout:8000});const code=(await pa.textContent('#netCodeBig')).trim();
    console.log('code',code,'| A sees:',(await pa.textContent('#netRoom')).replace(/\s+/g,' ').slice(0,200));
    await pb.click('#bNet');await sleep(500);await pb.fill('#netCode',code.toLowerCase());await pb.click('#bNetJoin');
    await pb.waitForFunction(()=>G.net&&NET.on&&G.mode==='board',null,{timeout:60000}).catch(async e=>{throw new Error('B: '+await pb.textContent('#netMsg'))});await pa.waitForFunction(()=>G.net&&NET.on&&G.mode==='board',null,{timeout:60000});
    console.log('both in game: A is',await pa.evaluate(()=>G.human),'B is',await pb.evaluate(()=>G.human));
    await pa.waitForFunction(()=>G.st.turn==='w'&&!G.busy,null,{timeout:60000});
    await pa.evaluate(()=>{const C=window.__checkfire;C.performMove(C.legalMoves(G.st).find(m=>m.from===12&&m.to===28));});
    await pb.waitForFunction(()=>G.st.turn==='b'&&G.st.b[28],null,{timeout:8000});console.log('B saw White move; turn now',await pb.evaluate(()=>G.st.turn));
    // a wrong code gives a clear message
    const pc=await open(47617);await pc.click('#bNet');await sleep(400);await pc.fill('#netCode','ABCDEF');await pc.click('#bNetJoin');
    await pc.waitForFunction(()=>/code|reach/.test(document.getElementById('netMsg').textContent)&&!/Looking/.test(document.getElementById('netMsg').textContent),null,{timeout:20000});
    console.log('wrong code message:',await pc.textContent('#netMsg'));
  }catch(e){fail=1;console.log('FAIL',e.message);}
  console.log('errors',errs);for(const b of brs)await b.close();A.kill();B.kill();process.exit(fail||errs.length?1:0);
})();
