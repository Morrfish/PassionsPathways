// Finds surfaces that sit at (almost) the same height as another one below a point: the cause of flickering floors.
// Usage: node tools/tests/floors.js   (prints, per room, every pair of overlapping level surfaces and how many sample points hit it)
const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
  const p=await b.newPage({viewport:{width:900,height:600}});
  await p.goto('file://'+(process.argv[2]||require('path').resolve(__dirname,'../../index.html')));
  await p.waitForFunction(()=>ASSET.ready,null,{timeout:90000});
  await p.click('#bStart');await p.waitForTimeout(400);
  await p.evaluate(()=>{const me={t:'n',c:'w',id:900,hp:125},them={t:'p',c:'b',id:901,hp:100};startDuel(me,them,{from:12,to:28,cap:28});
    window.requestLock=()=>{fallbackLook=true;};document.getElementById('intro').classList.add('hidden');D.count=0;D.fighting=false;D.paused=true;});
  for(const room of ['bedroom','park','library','diner','gym','toystore','greenhouse','arcade','attic','beach','ruins','citadel','forge','maze']){
    const r=await p.evaluate(room=>{PROF.room=room;setupWorld();D.arena.updateMatrixWorld(true);
      const R=new THREE.Raycaster(),found={},down=new THREE.Vector3(0,-1,0);
      const meshes=[];D.arena.traverse(o=>{if(o.isMesh&&o.visible&&o.material!==INV&&!(o.material&&o.material.colorWrite===false))meshes.push(o);});
      for(let x=-26;x<=26;x+=1.3)for(let z=-26;z<=26;z+=1.3){R.set(new THREE.Vector3(x+.11,40,z+.07),down);R.far=45;
        const hs=R.intersectObjects(meshes,false).filter(h=>h.face&&Math.abs(h.face.normal.clone().transformDirection(h.object.matrixWorld).y)>.9);
        for(let i=0;i<hs.length;i++)for(let j=i+1;j<hs.length;j++){if(hs[i].object===hs[j].object)continue;const dd=Math.abs(hs[i].distance-hs[j].distance);
          if(dd<.006){const nm=o=>(o.name||o.parent&&o.parent.name||o.geometry.type)+'@y'+(40-hs[i].distance).toFixed(3);const k=nm(hs[i].object)+' ~ '+nm(hs[j].object)+' gap '+dd.toFixed(4);found[k]=(found[k]||0)+1;}}}
      return found;},room);
    console.log(room,JSON.stringify(r));
  }
  await b.close();
})();
