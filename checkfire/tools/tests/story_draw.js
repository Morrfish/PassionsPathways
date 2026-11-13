// Checks the code-locked teacher settings, the draw rules, and story mode (opponent colours, unlocking, using unlocked colours).
// Prints a JSON summary. Usage: node tools/tests/story_draw.js  -> sd-*.png in the current folder
const {chromium}=require('playwright'),path=require('path');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:1100,height:680}});
  const errs=[],out={};p.on('pageerror',e=>errs.push('PAGEERR '+e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()==='error')errs.push('ERR '+m.text())});p.on('dialog',d=>d.accept());
  await p.goto('file://'+path.resolve(__dirname,'../../index.html'));
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
  const hidden=id=>p.evaluate(id=>document.getElementById(id).classList.contains('hidden'),id);
  // --- settings + code
  out.settings={practiceButtonInArmory:await p.evaluate(()=>!!document.getElementById('bArmUnlock'))};
  await p.click('#bSettings');out.settings.toolsHiddenAtFirst=await hidden('teacher');
  await p.fill('#codeIn','CHECKFIRE');await p.click('#bCode');out.settings.wrongCodeKeepsHidden=await hidden('teacher');
  await p.fill('#codeIn','morrisfight6');await p.click('#bCode');out.settings.rightCodeShowsTools=!(await hidden('teacher'));
  await p.screenshot({path:'sd-settings.png'});
  await p.click('#bPractice');out.settings.practiceUnlocksAll=await p.evaluate(()=>Object.keys(WEAPONS).every(id=>PROF.weapons[id])&&Object.keys(GADGETS).every(g=>PROF.gadgets[g]));
  out.settings.codeTextInPage=await p.evaluate(()=>document.documentElement.innerHTML.includes('MORRISFIGHT6'));
  await p.click('#bSettingsClose');
  // --- draw rules (auto-battle so nothing waits on a duel)
  await p.click('[data-opt=duel] [data-v=auto]');await p.click('#bStart');await p.waitForTimeout(800);
  out.draw={};
  out.draw.repetition=await p.evaluate(()=>{const C=window.__checkfire,mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
    const seq=[[6,21],[62,45],[21,6],[45,62]];let plies=0;   // knights out and back: the starting position returns after every 4 moves
    for(let r=0;r<3&&!G.over;r++)for(const [f,t] of seq){G.st=C.applyMove(G.st,mv(f,t));plies++;if(checkEnd())break;}
    return {plies,over:G.over,text:document.getElementById('endText').textContent.slice(0,70)};});
  await p.waitForTimeout(1200);await p.screenshot({path:'sd-draw-repetition.png'});
  await p.click('#bAgain');await p.click('#bStart');await p.waitForTimeout(800);
  out.draw.fiftyMove=await p.evaluate(()=>{const C=window.__checkfire,mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
    G.st=C.applyMove(G.st,mv(6,21));checkEnd();const before=G.half;G.half=99;G.hist=[];   // pretend 99 quiet half-moves have gone by
    G.st=C.applyMove(G.st,mv(62,45));const ended=checkEnd();
    return {halfAfterOneQuietMove:before,over:G.over&&ended,text:document.getElementById('endText').textContent.slice(0,70)};});
  await p.waitForTimeout(1000);await p.click('#bAgain');
  out.draw.pawnMoveResetsCount=await p.evaluate(()=>{const C=window.__checkfire;newGame({human:'w',diff:0,duelMode:'auto',story:null});const mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
    G.st=C.applyMove(G.st,mv(6,21));checkEnd();G.st=C.applyMove(G.st,mv(62,45));checkEnd();const a=G.half;G.st=C.applyMove(G.st,mv(12,28));checkEnd();return {beforePawnMove:a,afterPawnMove:G.half};});
  await p.evaluate(()=>{G.over=true;save();show('bhud',false);show('menu',true);G.mode='menu';});
  // --- story mode
  await p.evaluate(()=>{PROF.skins={};PROF.story=0;PROF.skin='default';saveProfile();});
  await p.click('#bStory');await p.waitForTimeout(300);
  out.story={cards:await p.evaluate(()=>document.querySelectorAll('.storycard').length),openAtStart:await p.evaluate(()=>document.querySelectorAll('.storycard [data-story]').length),
    names:await p.evaluate(()=>STORY.map(c=>c.name))};
  await p.screenshot({path:'sd-story-list.png'});
  await p.click('[data-story=morefun]');await p.waitForTimeout(1500);
  out.story.opponentColours=await p.evaluate(()=>({enemyArmour:FIG_COL.b.TeamMain.toString(16),expected:STORY[0].skin.main.toString(16),mine:FIG_COL.w.TeamMain.toString(16),story:G.story,human:G.human}));
  await p.screenshot({path:'sd-story-board.png'});
  await p.evaluate(()=>{endGame('w','Checkmate.');});await p.waitForTimeout(1300);
  out.story.afterWin=await p.evaluate(()=>({unlocked:!!PROF.skins.morefun,progress:PROF.story,endText:document.getElementById('endText').textContent}));
  await p.screenshot({path:'sd-story-win.png'});
  await p.click('#bAgain');await p.click('#bStory');await p.waitForTimeout(300);
  out.story.openAfterWin=await p.evaluate(()=>document.querySelectorAll('.storycard [data-story]').length);
  await p.click('[data-skin=morefun]');await p.screenshot({path:'sd-story-list-2.png'});
  await p.click('[data-story=capablanket]');await p.waitForTimeout(1500);
  out.story.usingUnlockedColours=await p.evaluate(()=>({mine:FIG_COL.w.TeamMain.toString(16),enemy:FIG_COL.b.TeamMain.toString(16)}));
  await p.screenshot({path:'sd-story-board-2.png'});
  // a capture in story mode: the duel is fought in the champion's home room against their colours
  await p.evaluate(()=>{const C=window.__checkfire;G.duelMode='fps';const mv=(f,t)=>C.legalMoves(G.st).find(m=>m.from===f&&m.to===t);
    G.st=C.applyMove(G.st,mv(6,21));G.st=C.applyMove(G.st,mv(52,36));syncBoard();PROF.room='auto';setTimeout(()=>C.performMove(mv(21,36)),0);});
  await p.waitForTimeout(2500);await p.screenshot({path:'sd-story-loadout.png'});
  out.story.duelRoom=await p.evaluate(()=>D.room);
  await p.evaluate(()=>{window.requestLock=()=>{fallbackLook=true;};});
  await p.click('#bFight');await p.evaluate(()=>{fallbackLook=true;D.count=.01;D.player.hp=D.player.max=900;});await p.waitForTimeout(900);
  await p.evaluate(()=>{const P=D.player,B=D.bot;D.paused=true;B.pos.set(P.pos.x-.6,0,P.pos.z-4.2);B.yaw=Math.PI;B.model.position.copy(B.pos);B.model.rotation.y=B.yaw;P.yaw=0;P.pitch=-.05;placeDuelCam();});
  await p.waitForTimeout(500);await p.screenshot({path:'sd-story-duel.png'});
  // free play still uses the classic colours for the opponent
  await p.evaluate(()=>{D.paused=false;D.player.hp=0;D.over=false;D.fighting=true;finishDuel();});await p.waitForTimeout(1500);
  out.errors=errs;console.log(JSON.stringify(out,null,1));await b.close();
})();
