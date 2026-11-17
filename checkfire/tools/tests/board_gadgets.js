// Checks both board styles (toy fighters / classic chess shapes), a move + capture on each, and the loadout preview with
// every gadget. Prints a JSON summary. Usage: node tools/tests/board_gadgets.js  -> bg-*.png in the current folder
const {chromium}=require('playwright'),path=require('path');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const out={};const errs=[];
  for(const style of ['toy','classic']){
    const p=await b.newPage({viewport:{width:1100,height:620}});
    p.on('pageerror',e=>errs.push(style+' PAGEERR '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(style+' ERR '+m.text())});p.on('dialog',d=>d.accept());
    await p.goto('file://'+path.resolve(__dirname,'../../index.html'));
    await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
    await p.click(`[data-opt=pieces] [data-v=${style}]`);await p.click('[data-opt=duel] [data-v=auto]');
    await p.click('#bStart');await p.waitForTimeout(1200);
    out[style]={pieces:await p.evaluate(()=>BOARD.meshes.size),looks:await p.evaluate(()=>[...new Set([...BOARD.meshes.values()].map(m=>m.userData.look))])};
    await p.screenshot({path:`bg-board-${style}.png`});
    // 1. Nf3 e5 2. Nxe5 : a move, a reply and a capture (auto-battle), then check the board still matches the game state
    await p.evaluate(()=>{const C=window.__checkfire,G=C.G;const mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
      G.st=C.applyMove(G.st,mv(6,21));G.st=C.applyMove(G.st,mv(52,36));syncBoard();setTimeout(()=>C.performMove(C.legalMoves(G.st).find(m=>m.from===21&&m.to===36)),0);});
    out[style].captureResolved=await p.waitForFunction(()=>G.st.b.filter(Boolean).length===31&&!G.busy,null,{timeout:60000}).then(()=>true,()=>false);
    await p.waitForTimeout(1200);
    out[style].afterCapture=await p.evaluate(()=>({onBoard:G.st.b.filter(Boolean).length,meshes:BOARD.meshes.size,looks:[...new Set([...BOARD.meshes.values()].map(m=>m.userData.look))]}));
    await p.screenshot({path:`bg-board-${style}-after.png`});
    await p.close();
  }
  // loadout preview with each gadget
  const p=await b.newPage({viewport:{width:1100,height:620}});
  p.on('pageerror',e=>errs.push('loadout PAGEERR '+e.message));p.on('dialog',d=>d.accept());
  await p.goto('file://'+path.resolve(__dirname,'../../index.html'));
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
  await p.click('#bSettings');await p.fill('#codeIn','MORRISFIGHT6');await p.click('#bCode');await p.click('#bPractice');await p.click('#bSettingsClose');await p.click('#bArmory1');await p.click('#bArmClose');await p.click('#bStart');await p.waitForTimeout(600);
  await p.evaluate(()=>{const C=window.__checkfire,G=C.G;const mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
    G.st=C.applyMove(G.st,mv(6,21));G.st=C.applyMove(G.st,mv(52,36));setTimeout(()=>C.performMove(C.legalMoves(G.st).find(m=>m.from===21&&m.to===36)),0);});
  await p.waitForTimeout(2200);
  out.loadout={};
  for(const g of ['none','grapple','jetpack','hat']){
    await p.click(`[data-g=${g}]`);await p.evaluate(()=>{LV.rot=2.4;});await p.waitForTimeout(700);
    out.loadout[g]=await p.evaluate(()=>({gadget:D.gad.type,twoHanded:!!(LV.fig.userData.ik&&LV.fig.userData.ik.length===2)}));
    await p.screenshot({path:`bg-loadout-${g}.png`});
  }
  await b.close();
  out.errors=errs;console.log(JSON.stringify(out,null,1));
})();
