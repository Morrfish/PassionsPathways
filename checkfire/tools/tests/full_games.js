// Full games in auto-battle mode: computer plays BOTH sides (human side driven by chooseMove), checking for errors.
const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const results=[];
  for(let g=0;g<4;g++){
    const p=await b.newPage({viewport:{width:900,height:600}});
    const errs=[];p.on('pageerror',e=>errs.push(e.message));
    await p.addInitScript(()=>{const st=window.setTimeout;window.setTimeout=(f,ms,...a)=>st(f,Math.min(ms||0,3),...a);const si=window.setInterval;window.setInterval=(f,ms,...a)=>si(f,Math.min(ms||0,3),...a);});
    await p.goto('file://'+require('path').resolve(__dirname,'../../index.html')+'');
    await p.click('[data-opt=gfx] [data-v=lo]');await p.click('[data-opt=duel] [data-v=auto]');
    await p.click(`[data-opt=diff] [data-v="${g%3}"]`);
    if(g%2)await p.click('[data-opt=side] [data-v=b]');
    await p.click('#bStart');
    const t0=Date.now();
    while(Date.now()-t0<150000){
      const s=await p.evaluate(()=>{const C=window.__checkfire,G=C.G;
        if(G.over)return {over:true,n:G.log.length,last:G.log[G.log.length-1].html.replace(/<[^>]+>/g,'')};
        if(!G.busy&&G.st.turn===G.human){const m=C.chooseMove(G.st,1);if(m)C.performMove(m);}
        return {over:false,n:G.log.length};});
      if(s.over){results.push(`game ${g}: ${s.n} log lines, ${s.last}`);break;}
      if(G_n_check(s))break;
      await p.waitForTimeout(30);
    }
    function G_n_check(s){return s.n>700;}
    const duels=await p.evaluate(()=>window.__checkfire.G.log.filter(l=>l.html.includes('⚔')).length);
    results.push(`  duels: ${duels}; errors: ${errs.length?errs.join(' / '):'none'}`);
    await p.close();
  }
  console.log(results.join('\n'));
  await b.close();
})();
