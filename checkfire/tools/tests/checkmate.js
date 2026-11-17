// Checks that checkmate is not the end: the checking piece attacks the King and he fights a duel for his life.
// Uses the quickest checkmate (1.f3 e5 2.g4 Qh4#) with auto-battle, once with the King winning and once losing.
// Prints a JSON summary. Usage: node tools/tests/checkmate.js
const {chromium}=require('playwright'),path=require('path');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const out={},errs=[];
  for(const [name,roll] of [['kingWins',0.999],['kingLoses',0.0]]){
    const p=await b.newPage({viewport:{width:1000,height:640}});
    p.on('pageerror',e=>errs.push(name+' PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('dialog',d=>d.accept());
    await p.goto('file://'+path.resolve(__dirname,'../../index.html'));
    await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
    await p.click('[data-opt=duel] [data-v=auto]');await p.click('#bStart');await p.waitForTimeout(700);
    const r={};
    r.setup=await p.evaluate(roll=>{const C=window.__checkfire;const mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
      for(const [f,t] of [[13,21],[52,36],[14,30],[59,31]])G.st=C.applyMove(G.st,mv(f,t));syncBoard();
      const mated=C.legalMoves(G.st).length===0&&inCheck(G.st,G.st.turn);
      const rnd=Math.random;window.__rnd=rnd;Math.random=()=>roll;   // decide the auto-battle: high = defender (the King) wins
      G.busy=false;nextTurn();return {checkmatePosition:mated,gameOverStraightAway:G.over};},roll);
    await p.waitForTimeout(600);await p.screenshot({path:`cm-${name}-start.png`});
    await p.waitForFunction(()=>G.over||(!G.busy&&G.mode==='board'&&G.st.turn==='w'),null,{timeout:90000}).catch(()=>{});
    await p.evaluate(()=>{Math.random=window.__rnd;});await p.waitForTimeout(1200);
    r.after=await p.evaluate(()=>({gameOver:G.over,whiteKingAlive:G.st.b.some(x=>x&&x.t==='k'&&x.c==='w'),blackQueenAlive:G.st.b.some(x=>x&&x.t==='q'&&x.c==='b'),turn:G.st.turn,
      whiteHasMoves:G.over?null:window.__checkfire.legalMoves(G.st).length>0,end:G.over?document.getElementById('endText').textContent.slice(0,60):null,
      log:G.log.slice(-3).map(l=>l.html.replace(/<[^>]+>/g,''))}));
    await p.screenshot({path:`cm-${name}-end.png`});
    out[name]=r;await p.close();
  }
  out.errors=errs;console.log(JSON.stringify(out,null,1));await b.close();
})();
