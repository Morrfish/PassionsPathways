function Ki(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ka(i,t){let e=Ki(t),n=new Float32Array(i*i);for(let a=0;a<n.length;a++)n[a]=e();let s=new Float32Array(16384),r=128/i,o=a=>a*a*(3-2*a);for(let a=0;a<128;a++)for(let c=0;c<128;c++){let l=c/r,u=a/r,d=Math.floor(l),h=Math.floor(u),f=o(l-d),g=o(u-h),_=(d+1)%i,m=(h+1)%i,p=n[h*i+d],E=n[h*i+_],A=n[m*i+d],y=n[m*i+_];s[a*128+c]=(p*(1-f)+E*f)*(1-g)+(A*(1-f)+y*f)*g}return s}function ve(i,t=[4,8,16,32],e=[.5,.25,.15,.1]){let n=new Float32Array(16384);return t.forEach((s,r)=>{let o=Ka(s,i+r*101);for(let a=0;a<n.length;a++)n[a]+=o[a]*e[r]}),n}var Bn=Math.PI*2,ch=(i,t)=>{let e=Math.abs(i-t)%128;return Math.min(e,128-e)};function jt(i){let t=new Float32Array(16384).fill(1),e=new Float32Array(16384).fill(1),n=new Float32Array(16384).fill(.8),s=new Float32Array(16384).fill(0);return i({lum:t,alpha:e,rough:n,metal:s}),{lum:t,alpha:e,rough:n,metal:s}}var Qt=i=>{for(let t=0;t<128;t++)for(let e=0;e<128;e++)i(e,t,t*128+e)};function yi(i,t,e=.5,n=!0){let s=Ki(t),r=[],o=128/i;for(let a=0;a<i;a++)for(let c=0;c<i;c++){let l=n&&a%2?o/2:0;r.push({x:(c*o+l+(s()-.5)*o*e+128)%128,y:(a*o+(s()-.5)*o*e+128)%128,r:s()})}return r}function $i(i,t,e){let n=1e9,s=1e9,r=null;for(let o of i){let a=ch(t,o.x),c=ch(e,o.y),l=Math.sqrt(a*a+c*c);l<n?(s=n,n=l,r=o):l<s&&(s=l)}return{d:n,d2:s,p:r}}var lh={cotton:()=>jt(({lum:i,rough:t})=>{let e=ve(11);Qt((n,s,r)=>{i[r]=.94+e[r]*.08,t[r]=.9})}),satin:()=>jt(({lum:i,rough:t})=>{let e=ve(12,[2,4],[.7,.3]);Qt((n,s,r)=>{let o=Math.sin(Bn*(n+s)/128+e[r]*2.5);i[r]=.95+.07*o*o,t[r]=.2})}),silk:()=>jt(({lum:i,rough:t})=>{let e=ve(13,[2,4,8],[.6,.3,.1]);Qt((n,s,r)=>{i[r]=.95+.06*Math.sin(Bn*(n/128+e[r]*.8)),t[r]=.3})}),linen:()=>jt(({lum:i,rough:t})=>{let e=ve(14,[16,32,64],[.5,.3,.2]),n=Ka(8,5);Qt((s,r,o)=>{let a=Math.sin(Bn*s*24/128)*.5+Math.sin(Bn*r*24/128)*.5;i[o]=.86+.06*a+.1*e[o]-.05*n[o],t[o]=.95})}),denim:()=>jt(({lum:i,rough:t})=>{let e=ve(15,[16,32,64],[.4,.3,.3]),n=Ki(77);Qt((s,r,o)=>{let a=(s+r)%6<3?1:0;i[o]=.74+.14*a+.12*e[o]+(n()<.03?.18:0),t[o]=.95})}),corduroy:()=>jt(({lum:i,rough:t})=>{let e=ve(16,[8,16],[.6,.4]);Qt((n,s,r)=>{let o=Math.pow(Math.abs(Math.sin(Math.PI*n*10/128)),.6);i[r]=.55+.45*o+.06*e[r],t[r]=.85})}),velvet:()=>jt(({lum:i,rough:t})=>{let e=ve(17,[2,4,8],[.5,.3,.2]),n=ve(18,[32,64],[.5,.5]);Qt((s,r,o)=>{i[o]=.7+.3*e[o]+.05*n[o],t[o]=.55})}),taffeta:()=>jt(({lum:i,rough:t,metal:e})=>{let n=ve(19,[2,4],[.6,.4]);Qt((s,r,o)=>{let a=Math.sin(Bn*s*32/128)*Math.sin(Bn*r*32/128);i[o]=.9+.05*a+.18*(n[o]-.5),t[o]=.35,e[o]=.15})}),lame:()=>jt(({lum:i,rough:t,metal:e})=>{let n=ve(20,[4,8,16,32],[.3,.3,.25,.15]);Qt((s,r,o)=>{let a=Math.abs(n[o]-.5)*2;i[o]=.75+.55*(1-a),t[o]=.25+.2*a,e[o]=.9})}),leather:()=>jt(({lum:i,rough:t})=>{let e=yi(14,21,.9,!1),n=ve(22,[8,16],[.6,.4]);Qt((s,r,o)=>{let{d:a,d2:c}=$i(e,s,r),l=Math.min(1,(c-a)/2.5);i[o]=.78+.16*l+.08*n[o],t[o]=.5+.2*(1-l)})}),sequin:()=>jt(({lum:i,rough:t,metal:e})=>{let n=yi(10,23,.05);Qt((s,r,o)=>{let{d:a,p:c}=$i(n,s,r),l=128/10*.55;if(a<l){let u=a/l;i[o]=.85+.5*c.r*(1-u)-.15*u*u,t[o]=.08+.15*c.r,e[o]=.85}else i[o]=.55,t[o]=.6,e[o]=.3})}),glitter:()=>jt(({lum:i,rough:t,metal:e})=>{let n=Ki(24),s=ve(25,[16,32],[.5,.5]);Qt((r,o,a)=>{let c=n();i[a]=c>.93?1.45:c>.8?1.15:.82+.1*s[a],t[a]=c>.8?.05:.4,e[a]=.8})}),tissue:()=>jt(({lum:i,alpha:t,rough:e})=>{let n=ve(26,[8,16,32],[.4,.3,.3]);Qt((s,r,o)=>{i[o]=1.02+.06*n[o],t[o]=.5+.1*n[o],e[o]=.7})}),chiffon:()=>jt(({lum:i,alpha:t,rough:e})=>{let n=ve(27,[4,8],[.6,.4]);Qt((s,r,o)=>{i[o]=1+.06*n[o],t[o]=.42+.12*n[o],e[o]=.6})}),organza:()=>jt(({lum:i,alpha:t,rough:e,metal:n})=>{let s=ve(28,[2,4,8],[.5,.3,.2]);Qt((r,o,a)=>{let c=Math.sin(Bn*r*40/128)*Math.sin(Bn*o*40/128);i[a]=1.05+.1*s[a]+.03*c,t[a]=.45+.15*s[a],e[a]=.3,n[a]=.2})}),tulle:()=>jt(({lum:i,alpha:t,rough:e})=>{Qt((n,s,r)=>{let o=n%8-4,a=(s+Math.floor(n/8)%2*4)%8-4,c=Math.sqrt(o*o+a*a)<2.6;i[r]=1,t[r]=c?.12:.85,e[r]=.7})}),mesh:()=>jt(({lum:i,alpha:t,rough:e})=>{Qt((n,s,r)=>{let o=n%10>2&&s%10>2;i[r]=.95,t[r]=o?.08:1,e[r]=.6})}),laceFloral:()=>jt(({lum:i,alpha:t,rough:e})=>{let n=yi(3,29,.3),s=Ki(30);Qt((r,o,a)=>{let c=r%6-3,l=(o+Math.floor(r/6)%2*3)%6-3,d=Math.sqrt(c*c+l*l)<1.9?.1:.8,h=1;for(let f of n){let g=(r-f.x+192)%128-64,_=(o-f.y+128*1.5)%128-128/2,m=Math.sqrt(g*g+_*_),p=Math.atan2(_,g),E=12+6*Math.cos(p*6+f.r*6);m<E&&(d=m<4||m>E-2?1:.92,h=m<4?.85:1-.1*(m/E))}i[a]=h+(s()-.5)*.04,t[a]=d,e[a]=.75})}),laceChantilly:()=>jt(({lum:i,alpha:t,rough:e})=>{Qt((n,s,r)=>{let o=n%5-2.5,a=s%5-2.5,c=Math.sqrt(o*o+a*a)<1.6?.08:.7,l=n%32-16,u=s%32-16,d=Math.sqrt(l*l+u*u),h=Math.abs(d-11)<1.6||Math.abs(d-6)<1.2,f=Math.abs(Math.sin((n+s)*Bn/64)*10-((n-s+128)%32-16))<1.4;t[r]=h||f?1:c,i[r]=h?.88:1,e[r]=.75})}),laceEyelet:()=>jt(({lum:i,alpha:t,rough:e})=>{let n=yi(6,31,0);Qt((s,r,o)=>{let{d:a}=$i(n,s,r),c=5.5;t[o]=a<c?.05:1,i[o]=a<c+2&&a>=c?.85:.98,e[o]=.85})}),tweed:()=>jt(({lum:i,rough:t})=>{let e=Ki(32),n=ve(33,[16,32,64],[.4,.3,.3]);Qt((s,r,o)=>{let a=(Math.floor(s/3)+Math.floor(r/3))%2?.08:-.08,c=e();i[o]=.78+a+.15*n[o]+(c<.05?.5:c>.96?-.4:0),t[o]=1})}),knit:()=>jt(({lum:i,rough:t})=>{Qt((e,n,s)=>{let r=e%8,o=n%10,a=Math.abs((r<4?r:7-r)-o*.4);i[s]=.7+.3*Math.max(0,1-a/3)+(r===0||r===7?-.15:0),t[s]=.95})}),fur:()=>jt(({lum:i,rough:t})=>{let e=Ka(32,34),n=ve(35,[4,8],[.6,.4]);Qt((s,r,o)=>{let a=e[r%128*128+(s+Math.floor(r/4))%128];i[o]=.7+.45*a+.1*n[o],t[o]=1})}),suede:()=>jt(({lum:i,rough:t})=>{let e=ve(36,[16,32,64],[.3,.3,.4]);Qt((n,s,r)=>{i[r]=.85+.12*e[r],t[r]=1})}),vinyl:()=>jt(({lum:i,rough:t,metal:e})=>{let n=ve(37,[2,4],[.6,.4]);Qt((s,r,o)=>{i[o]=.95+.15*n[o],t[o]=.08,e[o]=.1})}),brocade:()=>jt(({lum:i,rough:t,metal:e})=>{Qt((n,s,r)=>{let o=(n%64-32)/32,a=(s%64-32)/32,c=Math.abs(o),l=Math.abs(Math.sin(c*5+a*3)*Math.cos(a*4-c*2))>.55&&c*c+a*a<.9;i[r]=l?1.25:.82,e[r]=l?.7:.1,t[r]=l?.3:.7})}),stripes:()=>jt(({lum:i,rough:t})=>{Qt((e,n,s)=>{i[s]=e%32<16?1:1.5,t[s]=.85})}),plaid:()=>jt(({lum:i,rough:t})=>{Qt((e,n,s)=>{let r=e%64<20?.6:e%64<24?1.5:1,o=n%64<20?.6:n%64<24?1.5:1;i[s]=Math.min(1.5,(r+o)/2+((e+n)%4<2?.04:-.04)),t[s]=.95})}),polka:()=>jt(({lum:i,rough:t})=>{let e=yi(4,38,0);Qt((n,s,r)=>{i[r]=$i(e,n,s).d<7?1.5:1,t[r]=.85})}),floral:()=>jt(({lum:i,rough:t})=>{let e=yi(4,39,.6);Qt((n,s,r)=>{let{d:o,p:a}=$i(e,n,s),c=1,l=e.find(g=>g===a),u=(n-l.x+128*1.5)%128-128/2,d=(s-l.y+128*1.5)%128-128/2,h=Math.atan2(d,u),f=9+4*Math.cos(h*5+a.r*5);o<3?c=.6:o<f?c=1.45:o<f+5&&Math.abs(Math.sin(h*2+a.r*9))>.92&&(c=.75),i[r]=c,t[r]=.85})}),leopard:()=>jt(({lum:i,rough:t})=>{let e=yi(6,40,.8),n=ve(41,[8,16],[.5,.5]);Qt((s,r,o)=>{let{d:a,p:c}=$i(e,s,r),l=5+3*c.r+2*n[o];i[o]=a<l*.6?.85:a<l?.25:1.15,t[o]=.9})}),houndstooth:()=>jt(({lum:i,rough:t})=>{Qt((e,n,s)=>{let r=e%16,o=n%16,a=r<8==o<8,c=(r-o+16)%16<4&&r>=8&&o<8;i[s]=a||c?.45:1.45,t[s]=.95})})},Or=[{id:"cotton",name:"Cotton (solid)",group:"Basics"},{id:"satin",name:"Satin",group:"Her picks"},{id:"laceFloral",name:"Lace: floral",group:"Her picks"},{id:"laceChantilly",name:"Lace: Chantilly",group:"Her picks"},{id:"laceEyelet",name:"Lace: eyelet",group:"Her picks"},{id:"sequin",name:"Sequin",group:"Her picks"},{id:"glitter",name:"Glitter",group:"Her picks"},{id:"corduroy",name:"Corduroy",group:"Her picks"},{id:"linen",name:"Linen",group:"Her picks"},{id:"silk",name:"Silk",group:"Her picks"},{id:"tissue",name:"Tissue",group:"Her picks"},{id:"velvet",name:"Velvet",group:"Her picks"},{id:"taffeta",name:"Taffeta",group:"Her picks"},{id:"lame",name:"Lam\xE9",group:"Her picks"},{id:"leather",name:"Leather",group:"Her picks"},{id:"denim",name:"Denim",group:"Her picks"},{id:"chiffon",name:"Chiffon",group:"Sheer"},{id:"organza",name:"Organza",group:"Sheer"},{id:"tulle",name:"Tulle",group:"Sheer"},{id:"mesh",name:"Mesh",group:"Sheer"},{id:"knit",name:"Knit",group:"Textured"},{id:"tweed",name:"Tweed",group:"Textured"},{id:"brocade",name:"Brocade",group:"Textured"},{id:"suede",name:"Suede",group:"Textured"},{id:"fur",name:"Faux fur",group:"Textured"},{id:"vinyl",name:"Vinyl",group:"Textured"},{id:"stripes",name:"Stripes",group:"Prints"},{id:"plaid",name:"Plaid",group:"Prints"},{id:"polka",name:"Polka dot",group:"Prints"},{id:"floral",name:"Floral print",group:"Prints"},{id:"leopard",name:"Leopard",group:"Prints"},{id:"houndstooth",name:"Houndstooth",group:"Prints"}],uh=Object.fromEntries(Or.map(i=>[i.id,i])),$a=new Map;function Wd(i){return $a.has(i)||$a.set(i,(lh[i]||lh.cotton)()),$a.get(i)}function Ji(i){let t=i.replace("#",""),e=parseInt(t.length===3?t.split("").map(n=>n+n).join(""):t,16);return[e>>16&255,e>>8&255,e&255]}function Br(i,t,e){return"#"+[i,t,e].map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}var Xs=new Map;function Ja(i,t){let e=i+t;if(Xs.has(e))return Xs.get(e);let n=Wd(i),[s,r,o]=Ji(t),a=new Uint8ClampedArray(16384*4),c=new Uint8ClampedArray(16384*4);for(let u=0;u<16384;u++){let d=n.lum[u],h=u*4;if(d<=1)a[h]=s*d,a[h+1]=r*d,a[h+2]=o*d;else{let f=Math.min(1,(d-1)/.5);a[h]=s+(255-s)*f,a[h+1]=r+(255-r)*f,a[h+2]=o+(255-o)*f}a[h+3]=n.alpha[u]*255,c[h]=0,c[h+1]=n.rough[u]*255,c[h+2]=n.metal[u]*255,c[h+3]=255}let l={color:a,mat:c};return Xs.size>200&&Xs.clear(),Xs.set(e,l),l}function ja(i,t,e="color"){let n=document.createElement("canvas");n.width=n.height=128;let s=Ja(i,t),r=new ImageData(new Uint8ClampedArray(e==="color"?s.color:s.mat),128,128);return n.getContext("2d").putImageData(r,0,0),n}function Qa(i,t){let e=document.createElement("canvas");e.width=e.height=64;let n=e.getContext("2d");for(let s=0;s<8;s++)for(let r=0;r<8;r++)n.fillStyle=(r+s)%2?"#d9d4ce":"#f4f1ed",n.fillRect(r*8,s*8,8,8);return n.drawImage(ja(i,t),0,0,128,128,0,0,96,96),e.toDataURL()}var dh=[{name:"Pastels",colors:["#f8c8d4","#fbd9b5","#fff1b0","#c9ebc4","#bfe0f2","#d6c8f0","#f3d1e8","#e8e3d9"]},{name:"Jewel tones",colors:["#7a1236","#0f5e4f","#1d3a8a","#5a1d7a","#b8860b","#a31621","#0b6e99","#2e1a47"]},{name:"Brights",colors:["#ff2e63","#ff8a00","#ffd400","#2ecc71","#00b4ff","#7b2ff7","#ff4fd8","#00e0c6"]},{name:"Neutrals",colors:["#ffffff","#f2ede4","#d8cbb8","#a89a87","#6e6259","#3b3533","#1a1a1a","#c0c0c0"]},{name:"Earth",colors:["#8a5a44","#c47f4f","#d9a86c","#6b705c","#a5a58d","#b5838d","#6d4c3d","#3f4238"]},{name:"Metallics",colors:["#d4af37","#c0c0c0","#b87333","#e5c1a8","#8c8c8c","#f1e5ac","#aa7c39","#2f2f35"]}],ue=(i,t,e,n,s)=>({hang:i,bend:t,folds:e,drag:n,weight:s}),hh={cotton:ue(.84,.3,10,.03,1),satin:ue(.78,.14,12,.025,1.05),silk:ue(.74,.07,14,.035,.9),chiffon:ue(.7,.03,16,.06,.7),tissue:ue(.72,.04,16,.06,.7),organza:ue(.92,.5,8,.05,.75),tulle:ue(.9,.42,9,.06,.7),mesh:ue(.82,.2,10,.04,.85),taffeta:ue(.92,.55,8,.03,.95),velvet:ue(.77,.2,10,.02,1.25),lame:ue(.8,.25,11,.025,1.05),laceFloral:ue(.8,.2,11,.04,.9),laceChantilly:ue(.79,.15,12,.045,.85),laceEyelet:ue(.84,.32,10,.03,1),sequin:ue(.8,.28,9,.02,1.35),glitter:ue(.83,.3,10,.025,1.1),corduroy:ue(.86,.5,7,.02,1.2),linen:ue(.85,.36,9,.03,1),denim:ue(.9,.7,6,.02,1.3),leather:ue(.9,.8,5,.02,1.4),vinyl:ue(.9,.7,6,.02,1.3),brocade:ue(.9,.62,7,.02,1.2),tweed:ue(.88,.6,7,.02,1.25),knit:ue(.76,.14,10,.025,1.15),fur:ue(.92,.75,6,.02,1.3),suede:ue(.86,.5,7,.02,1.25)};function fh(i){return hh[i]||hh.cotton}async function mh(i){let t=URL.createObjectURL(i);try{let e=await new Promise((n,s)=>{let r=new Image;r.onload=()=>n(r),r.onerror=()=>s(new Error("That file is not a picture this device can open.")),r.src=t});return ec(e,e.naturalWidth,e.naturalHeight)}finally{URL.revokeObjectURL(t)}}function ec(i,t,e){let n=Math.min(1,1400/Math.max(t,e)),s=document.createElement("canvas");s.width=Math.max(1,Math.round(t*n)),s.height=Math.max(1,Math.round(e*n));let r=s.getContext("2d");return r.imageSmoothingQuality="high",r.drawImage(i,0,0,s.width,s.height),s}function kn(i,t,e){let n=new Float64Array((i+1)*(t+1));for(let s=0;s<t;s++){let r=0;for(let o=0;o<i;o++)r+=e(s*i+o),n[(s+1)*(i+1)+o+1]=n[s*(i+1)+o+1]+r}return n}function zn(i,t,e,n,s,r){let o=Math.max(0,n-r),a=Math.max(0,s-r),c=Math.min(t,n+r+1),l=Math.min(e,s+r+1),u=t+1;return{s:i[l*u+c]-i[a*u+c]-i[l*u+o]+i[a*u+o],n:(c-o)*(l-a)}}var tc=(i,t,e)=>{let n=Math.max(i,t,e),s=Math.min(i,t,e);return n===0?0:(n-s)/n};function ph(i,t,e,n){let s=new Uint8Array(t*e),r=new Int32Array(t*e),o=[];for(let a=0;a<t*e;a++){if(!i[a]||s[a])continue;let c=0;for(r[c++]=a,s[a]=1,o.length=0;c;){let l=r[--c];o.push(l);let u=l%t,d=l/t|0;u>0&&i[l-1]&&!s[l-1]&&(s[l-1]=1,r[c++]=l-1),u<t-1&&i[l+1]&&!s[l+1]&&(s[l+1]=1,r[c++]=l+1),d>0&&i[l-t]&&!s[l-t]&&(s[l-t]=1,r[c++]=l-t),d<e-1&&i[l+t]&&!s[l+t]&&(s[l+t]=1,r[c++]=l+t)}if(o.length<n)for(let l of o)i[l]=0}return i}function gh(i){let t=i.width,e=i.height,n=i.getContext("2d").getImageData(0,0,t,e).data,s=0,r=0;for(let o=0;o<t*e;o+=3){let a=n[o*4],c=n[o*4+1],l=n[o*4+2],u=tc(a,c,l),d=Math.max(a,c,l);(d<215||u>.15)&&(r++,u>.22&&d>50&&s++)}return r?s/r:0}function _h(i,{strength:t=.5,keepColor:e=!1}={}){let n=i.width,s=i.height,r=i.getContext("2d").getImageData(0,0,n,s).data,o=n*s,a=new Float32Array(o),c=new Float32Array(o);for(let Z=0;Z<o;Z++){let It=r[Z*4],vt=r[Z*4+1],Bt=r[Z*4+2];a[Z]=.3*It+.59*vt+.11*Bt,c[Z]=tc(It,vt,Bt)}let l=Math.max(8,Math.round(Math.max(n,s)/40)),u=kn(n,s,Z=>a[Z]),d=.16-t*.12,h=new Uint8ClampedArray(o),f=new Uint8Array(o);for(let Z=0;Z<s;Z++)for(let It=0;It<n;It++){let vt=Z*n+It,{s:Bt,n:q}=zn(u,n,s,It,Z,l),J=Bt/q,mt=(J-a[vt])/Math.max(30,J),wt=e?c[vt]<.3||a[vt]<45:!0;if(mt>d&&a[vt]<225&&wt){let Mt=Math.min(1,(mt-d)/.14+.25);h[vt]=Mt*255,f[vt]=1}}ph(f,n,s,Math.max(6,Math.round(o/6e4)));let g=document.createElement("canvas");g.width=n,g.height=s;let _=g.getContext("2d").createImageData(n,s);for(let Z=0;Z<o;Z++)f[Z]&&(_.data[Z*4]=28,_.data[Z*4+1]=24,_.data[Z*4+2]=30,_.data[Z*4+3]=h[Z]);if(g.getContext("2d").putImageData(_,0,0),!e)return{lines:g,color:null};let m=Array.from(a.filter((Z,It)=>It%7===0)).sort((Z,It)=>Z-It),p=m[Math.floor(m.length*.6)],E=Z=>c[Z]<.12&&a[Z]>=p-8,A=Math.max(16,Math.round(Math.max(n,s)/10)),y=kn(n,s,Z=>E(Z)?r[Z*4]:0),T=kn(n,s,Z=>E(Z)?r[Z*4+1]:0),w=kn(n,s,Z=>E(Z)?r[Z*4+2]:0),b=kn(n,s,Z=>E(Z)?1:0),R=0,x=0,v=0,I=0;for(let Z=0;Z<o;Z+=5)E(Z)&&(R+=r[Z*4],x+=r[Z*4+1],v+=r[Z*4+2],I++);let L=I?[R/I,x/I,v/I]:[245,245,245],U=new Uint8ClampedArray(o*4),B=new Uint8Array(o);for(let Z=0;Z<s;Z++)for(let It=0;It<n;It++){let vt=Z*n+It,Bt=zn(b,n,s,It,Z,A).s,q=Bt>20?[zn(y,n,s,It,Z,A).s/Bt,zn(T,n,s,It,Z,A).s/Bt,zn(w,n,s,It,Z,A).s/Bt]:L,J=Math.min(255,r[vt*4]/Math.max(60,q[0])*248),mt=Math.min(255,r[vt*4+1]/Math.max(60,q[1])*248),wt=Math.min(255,r[vt*4+2]/Math.max(60,q[2])*248),Mt=tc(J,mt,wt),Zt=Math.max(J,mt,wt);U[vt*4]=J,U[vt*4+1]=mt,U[vt*4+2]=wt,(Mt>.1||Zt<200||f[vt])&&(B[vt]=1)}let H=Xd(vi(B,n,s,2),n,s,2);ph(H,n,s,Math.max(30,Math.round(o/8e3)));let W=kn(n,s,Z=>B[Z]?U[Z*4]:0),j=kn(n,s,Z=>B[Z]?U[Z*4+1]:0),z=kn(n,s,Z=>B[Z]?U[Z*4+2]:0),Q=kn(n,s,Z=>B[Z]),ct=document.createElement("canvas");ct.width=n,ct.height=s;let lt=ct.getContext("2d").createImageData(n,s);for(let Z=0;Z<s;Z++)for(let It=0;It<n;It++){let vt=Z*n+It;if(!H[vt])continue;let Bt=zn(Q,n,s,It,Z,3).s;if(Bt>0){let q=zn(W,n,s,It,Z,3).s/Bt,J=zn(j,n,s,It,Z,3).s/Bt,mt=zn(z,n,s,It,Z,3).s/Bt,wt=B[vt]?.5:1;lt.data[vt*4]=U[vt*4]*(1-wt)+q*wt,lt.data[vt*4+1]=U[vt*4+1]*(1-wt)+J*wt,lt.data[vt*4+2]=U[vt*4+2]*(1-wt)+mt*wt}else lt.data[vt*4]=U[vt*4],lt.data[vt*4+1]=U[vt*4+1],lt.data[vt*4+2]=U[vt*4+2];lt.data[vt*4+3]=255}return ct.getContext("2d").putImageData(lt,0,0),{lines:g,color:ct}}function vi(i,t,e,n){if(n<=0)return i.slice();let s=new Uint8Array(t*e),r=new Uint8Array(t*e);for(let o=0;o<e;o++){let a=0,c=o*t;for(let l=0;l<Math.min(n,t);l++)a+=i[c+l];for(let l=0;l<t;l++)l+n<t&&(a+=i[c+l+n]),l-n-1>=0&&(a-=i[c+l-n-1]),s[c+l]=a>0?1:0}for(let o=0;o<t;o++){let a=0;for(let c=0;c<Math.min(n,e);c++)a+=s[c*t+o];for(let c=0;c<e;c++)c+n<e&&(a+=s[(c+n)*t+o]),c-n-1>=0&&(a-=s[(c-n-1)*t+o]),r[c*t+o]=a>0?1:0}return r}function Xd(i,t,e,n){let s=new Uint8Array(t*e);for(let o=0;o<t*e;o++)s[o]=i[o]?0:1;let r=vi(s,t,e,n);for(let o=0;o<t*e;o++)r[o]=r[o]?0:1;return r}function xh(...i){let t=i.find(Boolean),e=t.width,n=t.height,s=e,r=n,o=-1,a=-1;for(let c of i){if(!c)continue;let l=c.getContext("2d").getImageData(0,0,e,n).data;for(let u=0;u<n;u++)for(let d=0;d<e;d++)l[(u*e+d)*4+3]>20&&(d<s&&(s=d),d>o&&(o=d),u<r&&(r=u),u>a&&(a=u))}return o<0?{x:0,y:0,w:e,h:n}:{x:s,y:r,w:o-s+1,h:a-r+1}}var ot=1024,Et=1536,ji=(i=ot,t=Et)=>{let e=document.createElement("canvas");return e.width=i,e.height=t,e},kr=class{constructor(t){this.el=t,this.ctx=t.getContext("2d"),this.color=ji(),this.mat=ji(),this.lines=ji(),this.cx={color:this.color.getContext("2d",{willReadFrequently:!0}),mat:this.mat.getContext("2d",{willReadFrequently:!0}),lines:this.lines.getContext("2d",{willReadFrequently:!0})},this.tex=ji(),this.guide=null,this.guideOpacity=.55,this.showGuide=!0,this.tool="fill",this.paint={color:"#e85d8a",fabric:"cotton",scale:.7},this.brushSize=14,this.gap=2,this.eraseTarget="color",this.view={s:.5,x:0,y:0},this.undoStack=[],this.redoStack=[],this.fillFabric={},this.pointers=new Map,this.place=null,this.hover=null,this.onChange=()=>{},this.onPick=()=>{},this.onHistory=()=>{},this.onToast=()=>{},this.dirty=!0,this.bind(),new ResizeObserver(()=>{this.resize()}).observe(t.parentElement);let e=()=>{requestAnimationFrame(e),this.dirty&&this.el.offsetParent&&(this.dirty=!1,this.render())};e()}resize(){let t=this.el.parentElement,e=Math.min(2,window.devicePixelRatio||1),n=t.clientWidth,s=t.clientHeight;if(!n||!s)return;let r=!this.sized;this.el.width=Math.round(n*e),this.el.height=Math.round(s*e),this.el.style.width=n+"px",this.el.style.height=s+"px",this.dpr=e,this.sized=!0,(r||!this.userView)&&this.fit(),this.dirty=!0}fit(){let t=this.el.parentElement,e=t.clientWidth,n=t.clientHeight,s=Math.min((e-32)/ot,(n-32)/Et);this.view={s,x:(e-ot*s)/2,y:(n-Et*s)/2},this.userView=!1,this.dirty=!0}zoomBy(t,e,n){let s=this.view,r=this.el.parentElement;e===void 0&&(e=r.clientWidth/2,n=r.clientHeight/2),this.userView=!0;let o=Math.max(.1,Math.min(8,s.s*t)),a=o/s.s;this.view={s:o,x:e-(e-s.x)*a,y:n-(n-s.y)*a},this.dirty=!0}toBoard(t,e){let n=this.el.getBoundingClientRect(),s=this.view;return[(t-n.left-s.x)/s.s,(e-n.top-s.y)/s.s]}render(){let t=this.ctx,e=this.view,n=this.dpr||1;if(t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,this.el.width,this.el.height),t.setTransform(n*e.s,0,0,n*e.s,n*e.x,n*e.y),t.shadowColor="rgba(60,40,30,0.18)",t.shadowBlur=24/e.s*.5,t.shadowOffsetY=4/e.s,t.fillStyle="#fffdfa",t.fillRect(0,0,ot,Et),t.shadowColor="transparent",t.imageSmoothingEnabled=e.s<2,this.guide&&this.showGuide&&(t.globalAlpha=this.guideOpacity,t.drawImage(this.guide,0,0,ot,Et),t.globalAlpha=1),t.drawImage(this.color,0,0),t.drawImage(this.lines,0,0),this.place){let s=this.place,r=s.w*s.s,o=s.h*s.s;t.globalAlpha=.9,s.color&&t.drawImage(s.color,s.x,s.y,r,o),t.drawImage(s.lines,s.x,s.y,r,o),t.globalAlpha=1,t.lineWidth=2/e.s,t.setLineDash([8/e.s,6/e.s]),t.strokeStyle="#b4466e",t.strokeRect(s.x,s.y,r,o),t.setLineDash([]);let a=14/e.s;t.fillStyle="#b4466e";for(let[c,l]of[[s.x,s.y],[s.x+r,s.y],[s.x,s.y+o],[s.x+r,s.y+o]])t.beginPath(),t.arc(c,l,a,0,Math.PI*2),t.fill()}this.hover&&["brush","pen","eraser"].includes(this.tool)&&!this.place&&(t.beginPath(),t.arc(this.hover[0],this.hover[1],this.toolWidth(.6)/2,0,Math.PI*2),t.lineWidth=1.5/e.s,t.strokeStyle="rgba(80,60,70,0.7)",t.stroke())}bind(){let t=this.el;t.addEventListener("pointerdown",e=>this.down(e)),t.addEventListener("pointermove",e=>this.move(e)),t.addEventListener("pointerup",e=>this.up(e)),t.addEventListener("pointercancel",e=>this.up(e,!0)),t.addEventListener("pointerleave",()=>{this.hover=null,this.dirty=!0}),t.addEventListener("wheel",e=>{e.preventDefault();let n=t.getBoundingClientRect();if(this.place&&!e.ctrlKey){this.scalePlace(Math.exp(-e.deltaY*.0015));return}e.shiftKey?(this.view.x-=e.deltaX||e.deltaY,this.view.y-=e.deltaX?e.deltaY:0,this.dirty=!0):this.zoomBy(Math.exp(-e.deltaY*(e.ctrlKey?.01:.0015)),e.clientX-n.left,e.clientY-n.top)},{passive:!1}),t.addEventListener("contextmenu",e=>e.preventDefault())}down(t){if(this.el.setPointerCapture(t.pointerId),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pointers.size===2){this.cancelStroke(),this.gesture=this.gestureStart();return}if(this.pointers.size>2)return;let[e,n]=this.toBoard(t.clientX,t.clientY);if(t.button===1||t.button===2||this.tool==="pan"||this.spaceDown){this.panning={x:t.clientX,y:t.clientY};return}if(this.place){this.placeDown(e,n);return}if(this.tool==="fill"||this.tool==="clear"){this.pendingTap={bx:e,by:n,x:t.clientX,y:t.clientY,t:performance.now()};return}if(this.tool==="picker"){this.pickAt(e,n);return}this.startStroke(e,n,t)}move(t){let e=this.pointers.get(t.pointerId),[n,s]=this.toBoard(t.clientX,t.clientY);if(t.pointerType!=="touch"&&(this.hover=[n,s],this.dirty=!0),!!e){if(e.x=t.clientX,e.y=t.clientY,this.gesture){this.gestureMove();return}if(this.panning){this.view.x+=t.clientX-this.panning.x,this.view.y+=t.clientY-this.panning.y,this.panning={x:t.clientX,y:t.clientY},this.dirty=!0;return}if(this.placeDrag){this.placeMove(n,s);return}if(this.pendingTap&&Math.hypot(t.clientX-this.pendingTap.x,t.clientY-this.pendingTap.y)>8){this.panning={x:t.clientX,y:t.clientY},this.pendingTap=null;return}if(this.stroke){let r=t.getCoalescedEvents?t.getCoalescedEvents():[t];for(let o of r){let[a,c]=this.toBoard(o.clientX,o.clientY);this.strokeTo(a,c,o.pressure)}}}}up(t,e){if(this.pointers.delete(t.pointerId),this.gesture){this.pointers.size<2&&(this.gesture=null);return}if(this.panning=null,this.placeDrag=null,this.pendingTap&&!e){let n=this.pendingTap;this.pendingTap=null,this.tool==="clear"?this.fillAt(n.bx,n.by,{erase:!0}):this.fillAt(n.bx,n.by)}this.pendingTap=null,this.stroke&&this.endStroke()}gestureStart(){let[t,e]=[...this.pointers.values()];return{d:Math.hypot(t.x-e.x,t.y-e.y),cx:(t.x+e.x)/2,cy:(t.y+e.y)/2,view:{...this.view},place:this.place?{...this.place}:null}}gestureMove(){let t=this.gesture,[e,n]=[...this.pointers.values()],s=this.el.getBoundingClientRect(),r=Math.hypot(e.x-n.x,e.y-n.y),o=(e.x+n.x)/2,a=(e.y+n.y)/2,c=r/t.d;if(t.place&&this.place){let l=t.place,u=l.x+l.w*l.s/2,d=l.y+l.h*l.s/2,h=l.s*c;this.place.s=h,this.place.x=u-l.w*h/2+(o-t.cx)/this.view.s,this.place.y=d-l.h*h/2+(a-t.cy)/this.view.s}else{let l=Math.max(.1,Math.min(8,t.view.s*c)),u=l/t.view.s,d=t.cx-s.left,h=t.cy-s.top;this.view={s:l,x:d-(d-t.view.x)*u+(o-t.cx),y:h-(h-t.view.y)*u+(a-t.cy)},this.userView=!0}this.dirty=!0}begin(t){this.snap={names:t,data:Object.fromEntries(t.map(e=>[e,this.cx[e].getImageData(0,0,ot,Et)]))}}commit(t){let e=this.snap;if(this.snap=null,!e||!t)return;let n=Math.max(0,Math.floor(t.x0)),s=Math.max(0,Math.floor(t.y0)),r=Math.min(ot,Math.ceil(t.x1)+1)-n,o=Math.min(Et,Math.ceil(t.y1)+1)-s;if(r<=0||o<=0)return;let a={x:n,y:s,w:r,h:o,layers:{}};for(let c of e.names){let l=new ImageData(r,o),u=e.data[c].data;for(let d=0;d<o;d++)l.data.set(u.subarray(((s+d)*ot+n)*4,((s+d)*ot+n+r)*4),d*r*4);a.layers[c]={before:l,after:this.cx[c].getImageData(n,s,r,o)}}this.undoStack.push(a),this.undoStack.length>40&&this.undoStack.shift(),this.redoStack=[],this.changed()}undo(){let t=this.undoStack.pop();if(t){for(let[e,n]of Object.entries(t.layers))this.cx[e].putImageData(n.before,t.x,t.y);this.redoStack.push(t),this.changed()}}redo(){let t=this.redoStack.pop();if(t){for(let[e,n]of Object.entries(t.layers))this.cx[e].putImageData(n.after,t.x,t.y);this.undoStack.push(t),this.changed()}}changed(){this.dirty=!0,this.onHistory(this.undoStack.length,this.redoStack.length),this.onChange()}resetHistory(){this.undoStack=[],this.redoStack=[],this.onHistory(0,0)}toolWidth(t){return(this.tool==="pen"?Math.max(1.5,this.brushSize*.3):this.brushSize)*(t>0&&t!==.5?.3+.9*t:1)}patternFor(t,e=0){let n=this.paint,s=ja(n.fabric,n.color,t);if(t==="mat"&&e){let o=s.getContext("2d"),a=o.getImageData(0,0,s.width,s.height);for(let c=0;c<a.data.length;c+=4)a.data[c]=e;o.putImageData(a,0,0)}let r=this.cx.color.createPattern(s,"repeat");return r.setTransform(new DOMMatrix([n.scale,0,0,n.scale,0,0])),r}startStroke(t,e,n){let s=this.tool==="pen"?["lines"]:this.tool==="eraser"?this.eraseTarget==="lines"?["lines"]:this.eraseTarget==="both"?["color","mat","lines"]:["color","mat"]:["color","mat"];if(this.begin(s),this.stroke={names:s,last:[t,e],rect:{x0:t,y0:e,x1:t,y1:e},pressure:n.pressure,pats:null},this.tool==="brush"){let r=this.newFillId();this.fillFabric[r]=this.paint.fabric,this.stroke.pats={color:this.patternFor("color"),mat:this.patternFor("mat",r)}}this.strokeTo(t,e,n.pressure,!0)}strokeTo(t,e,n,s){let r=this.stroke;if(!r)return;let o=this.toolWidth(n),[a,c]=r.last;for(let d of r.names){let h=this.cx[d];h.save(),h.lineCap="round",h.lineJoin="round",h.lineWidth=o,this.tool==="eraser"?(h.globalCompositeOperation="destination-out",h.strokeStyle="#000"):this.tool==="pen"?h.strokeStyle="#1c181e":h.strokeStyle=r.pats[d==="mat"?"mat":"color"],h.beginPath(),h.moveTo(a,c),h.lineTo(s?t+.01:t,e),h.stroke(),h.restore()}r.last=[t,e];let l=r.rect,u=o/2+2;l.x0=Math.min(l.x0,t-u),l.y0=Math.min(l.y0,e-u),l.x1=Math.max(l.x1,t+u),l.y1=Math.max(l.y1,e+u),this.dirty=!0}endStroke(){let t=this.stroke;this.stroke=null,t&&this.commit(t.rect)}cancelStroke(){if(!this.stroke)return;let t=this.snap;if(this.stroke=null,this.snap=null,t)for(let e of t.names)this.cx[e].putImageData(t.data[e],0,0);this.dirty=!0}barrier(t){let e=this.cx.lines.getImageData(0,0,ot,Et).data,n=new Uint8Array(ot*Et);for(let s=0;s<ot*Et;s++)n[s]=e[s*4+3]>60?1:0;return{raw:n,wall:t>0?vi(n,ot,Et,t):n}}flood(t,e){let n=new Uint8Array(ot*Et),s=[];for(let r of e)!t[r]&&!n[r]&&(n[r]=1,s.push(r));for(;s.length;){let r=s.pop(),o=r/ot|0,a=r;for(;a%ot>0&&!t[a-1]&&!n[a-1];)a--,n[a]=1;let c=r;for(;c%ot<ot-1&&!t[c+1]&&!n[c+1];)c++,n[c]=1;for(let l=a;l<=c;l++)o>0&&!t[l-ot]&&!n[l-ot]&&(n[l-ot]=1,s.push(l-ot)),o<Et-1&&!t[l+ot]&&!n[l+ot]&&(n[l+ot]=1,s.push(l+ot))}return n}newFillId(){return this.fillId=(this.fillId||0)%254+1,this.fillId}paintMask(t,e){let n=this.newFillId();e||(this.fillFabric[n]=this.paint.fabric);let s=this.cx.color.getImageData(0,0,ot,Et),r=this.cx.mat.getImageData(0,0,ot,Et),o=Ja(this.paint.fabric,this.paint.color),a=1/this.paint.scale,c=ot,l=Et,u=-1,d=-1;for(let h=0;h<Et;h++){let f=(h*a|0)%128*128;for(let g=0;g<ot;g++){let _=h*ot+g;if(!t[_])continue;g<c&&(c=g),g>u&&(u=g),h<l&&(l=h),h>d&&(d=h);let m=_*4;if(e){s.data[m+3]=0,r.data[m+3]=0;continue}let p=(f+(g*a|0)%128)*4;s.data[m]=o.color[p],s.data[m+1]=o.color[p+1],s.data[m+2]=o.color[p+2],s.data[m+3]=o.color[p+3],r.data[m]=n,r.data[m+1]=o.mat[p+1],r.data[m+2]=o.mat[p+2],r.data[m+3]=255}}return u<0?null:(this.cx.color.putImageData(s,0,0),this.cx.mat.putImageData(r,0,0),{x0:c,y0:l,x1:u,y1:d})}fillAt(t,e,{erase:n=!1}={}){let s=Math.round(t),r=Math.round(e);if(s<0||r<0||s>=ot||r>=Et)return!1;let{raw:o,wall:a}=this.barrier(this.gap);if(a[r*ot+s]){let w=null;for(let b=1;b<14&&!w;b++)for(let R=-b;R<=b&&!w;R++)for(let x=-b;x<=b;x++){let v=s+x,I=r+R;if(v>=0&&I>=0&&v<ot&&I<Et&&!a[I*ot+v]){w=[v,I];break}}if(!w)return!1;[s,r]=w}let c=this.cx.color.getImageData(0,0,ot,Et).data,l=this.cx.mat.getImageData(0,0,ot,Et).data,u=r*ot+s,d=c[u*4+3]>8,h=l[u*4],f=0,g=0,_=0,m=0;for(let w=-2;w<=2;w++)for(let b=-2;b<=2;b++){let R=s+b,x=r+w;if(R<0||x<0||R>=ot||x>=Et)continue;let v=(x*ot+R)*4;c[v+3]>8&&(f+=c[v],g+=c[v+1],_+=c[v+2],m++)}m&&(f/=m,g/=m,_/=m);let p=9025,E=new Uint8Array(ot*Et);for(let w=0;w<ot*Et;w++){let b=w*4,R=c[b+3]>8,x=a[w]||R!==d;if(!x&&d)if(h)x=l[b]!==h;else{let v=c[b]-f,I=c[b+1]-g,L=c[b+2]-_;x=l[b]!==0||v*v+I*I+L*L>p}E[w]=x?1:0}let A=this.flood(E,[r*ot+s]),y=vi(A,ot,Et,this.gap+2);for(let w=0;w<ot*Et;w++)y[w]&&!A[w]&&(a[w]||o[w])&&(A[w]=1);this.begin(["color","mat"]);let T=this.paintMask(A,n);return this.commit(T),!0}autoFillGarment(t="cotton",e="#ffffff"){let{raw:n,wall:s}=this.barrier(3),r=[];for(let h=0;h<ot;h++)r.push(h,(Et-1)*ot+h);for(let h=0;h<Et;h++)r.push(h*ot,h*ot+ot-1);let o=this.flood(s,r),a=this.cx.color.getImageData(0,0,ot,Et).data,c=new Uint8Array(ot*Et);for(let h=0;h<ot*Et;h++)!o[h]&&!s[h]&&(c[h]=1);let l=vi(c,ot,Et,5),u=0;for(let h=0;h<ot*Et;h++)l[h]&&(s[h]||n[h])&&!o[h]&&(c[h]=1),a[h*4+3]>10&&(c[h]=0),c[h]&&u++;if(u<500)return!1;let d=this.paint;return this.paint={color:e,fabric:t,scale:d.scale},this.begin(["color","mat"]),this.commit(this.paintMask(c,!1)),this.paint=d,!0}pickAt(t,e){let n=Math.round(t),s=Math.round(e);if(n<0||s<0||n>=ot||s>=Et)return;let r=this.cx.color.getImageData(n,s,1,1).data;r[3]>10&&this.onPick([r[0],r[1],r[2]])}startPlace(t,e,n){let s=t.width,r=t.height,o=n,a=Math.min(o.w/s,o.h/r);this.place={lines:t,color:e,w:s,h:r,s:a,x:o.x+(o.w-s*a)/2,y:o.y},this.dirty=!0}placeDown(t,e){let n=this.place,s=n.w*n.s,r=n.h*n.s,o=22/this.view.s,a=[[n.x,n.y,n.x+s,n.y+r],[n.x+s,n.y,n.x,n.y+r],[n.x,n.y+r,n.x+s,n.y],[n.x+s,n.y+r,n.x,n.y]];for(let[c,l,u,d]of a)if(Math.hypot(t-c,e-l)<o){this.placeDrag={mode:"scale",ax:u,ay:d,d0:Math.hypot(c-u,l-d),s0:n.s};return}this.placeDrag={mode:"move",dx:t-n.x,dy:e-n.y}}placeMove(t,e){let n=this.place,s=this.placeDrag;if(s.mode==="move")n.x=t-s.dx,n.y=e-s.dy;else{let r=Math.max(.05,s.s0*Math.hypot(t-s.ax,e-s.ay)/s.d0),o=n.w*r,a=n.h*r;n.x=t<s.ax?s.ax-o:s.ax,n.y=e<s.ay?s.ay-a:s.ay,n.s=r}this.dirty=!0}scalePlace(t){let e=this.place;if(!e)return;let n=e.x+e.w*e.s/2,s=e.y+e.h*e.s/2;e.s*=t,e.x=n-e.w*e.s/2,e.y=s-e.h*e.s/2,this.dirty=!0}commitPlace(){let t=this.place;if(!t)return;this.place=null;let e=t.w*t.s,n=t.h*t.s;if(this.begin(["color","mat","lines"]),this.cx.lines.drawImage(t.lines,t.x,t.y,e,n),t.color){this.cx.color.drawImage(t.color,t.x,t.y,e,n);let s=ji(),r=s.getContext("2d");r.drawImage(t.color,t.x,t.y,e,n),r.globalCompositeOperation="source-in",r.fillStyle="rgb(0,230,0)",r.fillRect(0,0,ot,Et),this.cx.mat.drawImage(s,0,0)}this.commit({x0:t.x-2,y0:t.y-2,x1:t.x+e+2,y1:t.y+n+2})}cancelPlace(){this.place=null,this.dirty=!0}clearAll(){this.begin(["color","mat","lines"]);for(let t of Object.values(this.cx))t.clearRect(0,0,ot,Et);this.commit({x0:0,y0:0,x1:ot-1,y1:Et-1})}drawLines(t){this.begin(["lines"]);let e=this.cx.lines;e.save(),e.strokeStyle="#1c181e",e.lineWidth=4,e.lineCap="round",e.lineJoin="round",t(e),e.restore(),this.commit({x0:0,y0:0,x1:ot-1,y1:Et-1})}hasColor(){let t=this.cx.color.getImageData(0,0,ot,Et).data;for(let e=3;e<t.length;e+=64)if(t[e]>10)return!0;return!1}hasLines(){let t=this.cx.lines.getImageData(0,0,ot,Et).data;for(let e=3;e<t.length;e+=32)if(t[e]>90)return!0;return!1}textureCanvas(){let t=this.cx.color.getImageData(0,0,ot,Et),e=this.cx.lines.getImageData(0,0,ot,Et),n=t.data,s=e.data,r=new Uint8Array(ot*Et);for(let a=0;a<ot*Et;a++)r[a]=n[a*4+3]<20?1:0;let o=vi(r,ot,Et,5);for(let a=0;a<ot*Et;a++){let c=a*4,l=s[c+3]/255;!l||n[c+3]<20||o[a]||(n[c]=n[c]*(1-l)+s[c]*l,n[c+1]=n[c+1]*(1-l)+s[c+1]*l,n[c+2]=n[c+2]*(1-l)+s[c+2]*l)}return this.tex.getContext("2d").putImageData(t,0,0),this.tex}alphaGrid(t=4){let e=this.cx.color.getImageData(0,0,ot,Et).data,n=this.cx.mat.getImageData(0,0,ot,Et).data,s=ot/t,r=Et/t,o=new Uint8Array(s*r),a=new Uint8Array(s*r),c=!1;for(let u=0;u<Et;u++)for(let d=0;d<ot;d++){let h=(u*ot+d)*4;if(e[h+3]<=20)continue;let f=(u/t|0)*s+(d/t|0);o[f]=1,c=!0,n[h+3]===255&&(a[f]=n[h])}let l=this.fillFabric;return{data:o,ids:a,w:s,h:r,step:t,any:c,fabricOf:u=>l[u]||"cotton"}}composite(t=600,e="#fffdfa"){let n=t/Et,s=ji(Math.round(ot*n),t),r=s.getContext("2d");return r.fillStyle=e,r.fillRect(0,0,s.width,s.height),r.drawImage(this.color,0,0,s.width,s.height),r.drawImage(this.lines,0,0,s.width,s.height),s}async layerBlobs(){let t=e=>new Promise(n=>e.toBlob(n,"image/png"));return{color:await t(this.color),mat:await t(this.mat),lines:await t(this.lines)}}async loadLayers(t){for(let s of["color","mat","lines"]){if(this.cx[s].clearRect(0,0,ot,Et),!t[s])continue;let r=await createImageBitmap(t[s]);this.cx[s].drawImage(r,0,0,ot,Et)}let e=0,n=this.cx.mat.getImageData(0,0,ot,Et).data;for(let s=0;s<n.length;s+=4)n[s+3]&&n[s]>e&&(e=n[s]);this.fillId=e,this.fillFabric={...t.fills||{}},this.resetHistory(),this.dirty=!0}};var fi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},pi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Wh=0,Nc=1,Xh=2;var Fc=1,Ao=2,Ln=3,rn=0,we=1,$e=2,Zn=0,Ei=1,Oc=2,Bc=3,kc=4,qh=5,ai=100,Yh=101,Zh=102,$h=103,Kh=104,Jh=200,jh=201,Qh=202,tu=203,oo=204,ao=205,eu=206,nu=207,iu=208,su=209,ru=210,ou=211,au=212,cu=213,lu=214,Ro=0,Co=1,Io=2,Ai=3,Po=4,Lo=5,Do=6,Uo=7,No=0,hu=1,uu=2,Mn=0,du=1,fu=2,pu=3,Fo=4,mu=5,gu=6,_u=7;var zc=300,Oi=301,Bi=302,Oo=303,Bo=304,br=306,ps=1e3,An=1001,ms=1002,ze=1003,ko=1004;var ki=1005;var on=1006,As=1007;var Dn=1008;var bn=1009,Hc=1010,Vc=1011,Rs=1012,zo=1013,mi=1014,Sn=1015,Cs=1016,Ho=1017,Vo=1018,Is=1020,Gc=35902,Wc=35899,Xc=1021,qc=1022,Ke=1023,gs=1026,Ps=1027,Go=1028,Wo=1029,Yc=1030,Xo=1031;var qo=1033,Sr=33776,wr=33777,Tr=33778,Er=33779,Yo=35840,Zo=35841,$o=35842,Ko=35843,Jo=36196,jo=37492,Qo=37496,ta=37808,ea=37809,na=37810,ia=37811,sa=37812,ra=37813,oa=37814,aa=37815,ca=37816,la=37817,ha=37818,ua=37819,da=37820,fa=37821,pa=36492,ma=36494,ga=36495,_a=36283,xa=36284,ya=36285,va=36286;var Ri=2300,_s=2301,ro=2302,Ec=2400,Ac=2401,Rc=2402;var xu=3200,yu=3201;var Ma=0,vu=1,wn="",Le="srgb",Ci="srgb-linear",er="linear",se="srgb";var Ti=7680;var Cc=519,Mu=512,bu=513,Su=514,Zc=515,wu=516,Tu=517,Eu=518,Au=519,Ic=35044,$c=35048;var Kc="300 es",yn=2e3,nr=2001;var Rn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yh=1234567,Qs=Math.PI/180,xs=180/Math.PI;function Ls(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[i&255]+Be[i>>8&255]+Be[i>>16&255]+Be[i>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase()}function qt(i,t,e){return Math.max(t,Math.min(e,i))}function Jc(i,t){return(i%t+t)%t}function qd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Yd(i,t,e){return i!==t?(e-i)/(t-i):0}function tr(i,t,e){return(1-e)*i+e*t}function Zd(i,t,e,n){return tr(i,t,1-Math.exp(-e*n))}function $d(i,t=1){return t-Math.abs(Jc(i,t*2)-t)}function Kd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Jd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function jd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Qd(i,t){return i+Math.random()*(t-i)}function tf(i){return i*(.5-Math.random())}function ef(i){i!==void 0&&(yh=i);let t=yh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function nf(i){return i*Qs}function sf(i){return i*xs}function rf(i){return(i&i-1)===0&&i!==0}function of(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function af(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function cf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),u=o((t+n)/2),d=r((t-n)/2),h=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*u,c*d,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ds(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function We(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var zi={DEG2RAD:Qs,RAD2DEG:xs,generateUUID:Ls,clamp:qt,euclideanModulo:Jc,mapLinear:qd,inverseLerp:Yd,lerp:tr,damp:Zd,pingpong:$d,smoothstep:Kd,smootherstep:Jd,randInt:jd,randFloat:Qd,randFloatSpread:tf,seededRandom:ef,degToRad:nf,radToDeg:sf,isPowerOfTwo:rf,ceilPowerOfTwo:of,floorPowerOfTwo:af,setQuaternionFromProperEuler:cf,normalize:We,denormalize:ds},Dt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ye=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],h=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=h,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||c!==h||l!==f||u!==g){let m=1-a,p=c*h+l*f+u*g+d*_,E=p>=0?1:-1,A=1-p*p;if(A>Number.EPSILON){let T=Math.sqrt(A),w=Math.atan2(T,p*E);m=Math.sin(m*w)/T,a=Math.sin(a*w)/T}let y=a*E;if(c=c*m+h*y,l=l*m+f*y,u=u*m+g*y,d=d*m+_*y,m===1-a){let T=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=T,l*=T,u*=T,d*=T}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[o],h=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+u*d+c*f-l*h,t[e+1]=c*g+u*h+l*d-a*f,t[e+2]=l*g+u*f+a*h-c*d,t[e+3]=u*g-a*d-c*h-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),d=a(r/2),h=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"YZX":this._x=h*u*d+l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d-h*f*g;break;case"XZY":this._x=h*u*d-l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],d=e[10],h=n+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-e)*u)/l,h=Math.sin(e*u)/l;return this._w=o*d+this._w*h,this._x=n*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(vh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(vh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),u=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*u,this.y=n+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ic.copy(this).projectOnVector(t),this.sub(ic)}reflect(t){return this.sub(ic.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ic=new N,vh=new Ye,Vt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],E=s[1],A=s[4],y=s[7],T=s[2],w=s[5],b=s[8];return r[0]=o*_+a*E+c*T,r[3]=o*m+a*A+c*w,r[6]=o*p+a*y+c*b,r[1]=l*_+u*E+d*T,r[4]=l*m+u*A+d*w,r[7]=l*p+u*y+d*b,r[2]=h*_+f*E+g*T,r[5]=h*m+f*A+g*w,r[8]=h*p+f*y+g*b,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],d=u*o-a*l,h=a*c-u*r,f=l*r-o*c,g=e*d+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*l-u*n)*_,t[2]=(a*n-s*o)*_,t[3]=h*_,t[4]=(u*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(sc.makeScale(t,e)),this}rotate(t){return this.premultiply(sc.makeRotation(-t)),this}translate(t,e){return this.premultiply(sc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},sc=new Vt;function jc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ir(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ru(){let i=ir("canvas");return i.style.display="block",i}var Mh={};function ys(i){i in Mh||(Mh[i]=!0,console.warn(i))}function Cu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var bh=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sh=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lf(){let i={enabled:!0,workingColorSpace:Ci,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===se&&(s.r=qn(s.r),s.g=qn(s.g),s.b=qn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===se&&(s.r=fs(s.r),s.g=fs(s.g),s.b=fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wn?er:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ys("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ys("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ci]:{primaries:t,whitePoint:n,transfer:er,toXYZ:bh,fromXYZ:Sh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:n,transfer:se,toXYZ:bh,fromXYZ:Sh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),i}var Kt=lf();function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Qi,vs=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Qi===void 0&&(Qi=ir("canvas")),Qi.width=t.width,Qi.height=t.height;let s=Qi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Qi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ir("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=qn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(qn(e[n]/255)*255):e[n]=qn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},hf=0,ci=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=Ls(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(rc(s[o].image)):r.push(rc(s[o]))}else r=rc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function rc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?vs.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var uf=0,oc=new N,He=class i extends Rn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=An,s=An,r=on,o=Dn,a=Ke,c=bn,l=i.DEFAULT_ANISOTROPY,u=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=Ls(),this.name="",this.source=new ci(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(oc).x}get height(){return this.source.getSize(oc).y}get depth(){return this.source.getSize(oc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==zc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ps:t.x=t.x-Math.floor(t.x);break;case An:t.x=t.x<0?0:1;break;case ms:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ps:t.y=t.y-Math.floor(t.y);break;case An:t.y=t.y<0?0:1;break;case ms:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=zc;He.DEFAULT_ANISOTROPY=1;var ie=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let A=(l+1)/2,y=(f+1)/2,T=(p+1)/2,w=(u+h)/4,b=(d+_)/4,R=(g+m)/4;return A>y&&A>T?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=w/n,r=b/n):y>T?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=w/s,r=R/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=b/r,s=R/r),this.set(n,s,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(d-_)/E,this.z=(h-u)/E,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},co=class extends Rn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new He(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:on,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ci(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},pn=class extends co{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},sr=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var lo=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Cn=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,gn):gn.fromBufferAttribute(r,o),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zr.copy(n.boundingBox)),zr.applyMatrix4(t.matrixWorld),this.union(zr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qs),Hr.subVectors(this.max,qs),ts.subVectors(t.a,qs),es.subVectors(t.b,qs),ns.subVectors(t.c,qs),ti.subVectors(es,ts),ei.subVectors(ns,es),Mi.subVectors(ts,ns);let e=[0,-ti.z,ti.y,0,-ei.z,ei.y,0,-Mi.z,Mi.y,ti.z,0,-ti.x,ei.z,0,-ei.x,Mi.z,0,-Mi.x,-ti.y,ti.x,0,-ei.y,ei.x,0,-Mi.y,Mi.x,0];return!ac(e,ts,es,ns,Hr)||(e=[1,0,0,0,1,0,0,0,1],!ac(e,ts,es,ns,Hr))?!1:(Vr.crossVectors(ti,ei),e=[Vr.x,Vr.y,Vr.z],ac(e,ts,es,ns,Hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Hn=[new N,new N,new N,new N,new N,new N,new N,new N],gn=new N,zr=new Cn,ts=new N,es=new N,ns=new N,ti=new N,ei=new N,Mi=new N,qs=new N,Hr=new N,Vr=new N,bi=new N;function ac(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){bi.fromArray(i,r);let a=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),c=t.dot(bi),l=e.dot(bi),u=n.dot(bi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var df=new Cn,Ys=new N,cc=new N,li=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):df.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ys.subVectors(t,this.center);let e=Ys.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ys,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(cc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ys.copy(t.center).add(cc)),this.expandByPoint(Ys.copy(t.center).sub(cc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Vn=new N,lc=new N,Gr=new N,ni=new N,hc=new N,Wr=new N,uc=new N,Ii=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Vn.copy(this.origin).addScaledVector(this.direction,e),Vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){lc.copy(t).add(e).multiplyScalar(.5),Gr.copy(e).sub(t).normalize(),ni.copy(this.origin).sub(lc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Gr),a=ni.dot(this.direction),c=-ni.dot(Gr),l=ni.lengthSq(),u=Math.abs(1-o*o),d,h,f,g;if(u>0)if(d=o*c-a,h=o*a-c,g=r*u,d>=0)if(h>=-g)if(h<=g){let _=1/u;d*=_,h*=_,f=d*(d+o*h+2*a)+h*(o*d+h+2*c)+l}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(lc).addScaledVector(Gr,h),f}intersectSphere(t,e){Vn.subVectors(t.center,this.origin);let n=Vn.dot(this.direction),s=Vn.dot(Vn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-h.z)*d,c=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,c=(t.min.z-h.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Vn)!==null}intersectTriangle(t,e,n,s,r){hc.subVectors(e,t),Wr.subVectors(n,t),uc.crossVectors(hc,Wr);let o=this.direction.dot(uc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ni.subVectors(this.origin,t);let c=a*this.direction.dot(Wr.crossVectors(ni,Wr));if(c<0)return null;let l=a*this.direction.dot(hc.cross(ni));if(l<0||c+l>o)return null;let u=-a*ni.dot(uc);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},re=class i{constructor(t,e,n,s,r,o,a,c,l,u,d,h,f,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,u,d,h,f,g,_,m)}set(t,e,n,s,r,o,a,c,l,u,d,h,f,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/is.setFromMatrixColumn(t,0).length(),r=1/is.setFromMatrixColumn(t,1).length(),o=1/is.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let h=o*u,f=o*d,g=a*u,_=a*d;e[0]=c*u,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=h-_*l,e[9]=-a*c,e[2]=_-h*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){let h=c*u,f=c*d,g=l*u,_=l*d;e[0]=h+_*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=f*a-g,e[6]=_+h*a,e[10]=o*c}else if(t.order==="ZXY"){let h=c*u,f=c*d,g=l*u,_=l*d;e[0]=h-_*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let h=o*u,f=o*d,g=a*u,_=a*d;e[0]=c*u,e[4]=g*l-f,e[8]=h*l+_,e[1]=c*d,e[5]=_*l+h,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let h=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=_-h*d,e[8]=g*d+f,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=f*d+g,e[10]=h-_*d}else if(t.order==="XZY"){let h=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=-d,e[8]=l*u,e[1]=h*d+_,e[5]=o*u,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*u,e[10]=_*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ff,t,pf)}lookAt(t,e,n){let s=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),ii.crossVectors(n,en),ii.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ii.crossVectors(n,en)),ii.normalize(),Xr.crossVectors(en,ii),s[0]=ii.x,s[4]=Xr.x,s[8]=en.x,s[1]=ii.y,s[5]=Xr.y,s[9]=en.y,s[2]=ii.z,s[6]=Xr.z,s[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],E=n[3],A=n[7],y=n[11],T=n[15],w=s[0],b=s[4],R=s[8],x=s[12],v=s[1],I=s[5],L=s[9],U=s[13],B=s[2],H=s[6],W=s[10],j=s[14],z=s[3],Q=s[7],ct=s[11],lt=s[15];return r[0]=o*w+a*v+c*B+l*z,r[4]=o*b+a*I+c*H+l*Q,r[8]=o*R+a*L+c*W+l*ct,r[12]=o*x+a*U+c*j+l*lt,r[1]=u*w+d*v+h*B+f*z,r[5]=u*b+d*I+h*H+f*Q,r[9]=u*R+d*L+h*W+f*ct,r[13]=u*x+d*U+h*j+f*lt,r[2]=g*w+_*v+m*B+p*z,r[6]=g*b+_*I+m*H+p*Q,r[10]=g*R+_*L+m*W+p*ct,r[14]=g*x+_*U+m*j+p*lt,r[3]=E*w+A*v+y*B+T*z,r[7]=E*b+A*I+y*H+T*Q,r[11]=E*R+A*L+y*W+T*ct,r[15]=E*x+A*U+y*j+T*lt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],d=t[6],h=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*d-s*l*d-r*a*h+n*l*h+s*a*f-n*c*f)+_*(+e*c*f-e*l*h+r*o*h-s*o*f+s*l*u-r*c*u)+m*(+e*l*d-e*a*f-r*o*d+n*o*f+r*a*u-n*l*u)+p*(-s*a*u-e*c*d+e*a*h+s*o*d-n*o*h+n*c*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],d=t[9],h=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],E=d*m*l-_*h*l+_*c*f-a*m*f-d*c*p+a*h*p,A=g*h*l-u*m*l-g*c*f+o*m*f+u*c*p-o*h*p,y=u*_*l-g*d*l+g*a*f-o*_*f-u*a*p+o*d*p,T=g*d*c-u*_*c-g*a*h+o*_*h+u*a*m-o*d*m,w=e*E+n*A+s*y+r*T;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/w;return t[0]=E*b,t[1]=(_*h*r-d*m*r-_*s*f+n*m*f+d*s*p-n*h*p)*b,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*b,t[3]=(d*c*r-a*h*r-d*s*l+n*h*l+a*s*f-n*c*f)*b,t[4]=A*b,t[5]=(u*m*r-g*h*r+g*s*f-e*m*f-u*s*p+e*h*p)*b,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*b,t[7]=(o*h*r-u*c*r+u*s*l-e*h*l-o*s*f+e*c*f)*b,t[8]=y*b,t[9]=(g*d*r-u*_*r-g*n*f+e*_*f+u*n*p-e*d*p)*b,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*b,t[11]=(u*a*r-o*d*r-u*n*l+e*d*l+o*n*f-e*a*f)*b,t[12]=T*b,t[13]=(u*_*s-g*d*s+g*n*h-e*_*h-u*n*m+e*d*m)*b,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*b,t[15]=(o*d*s-u*a*s+u*n*c-e*d*c-o*n*h+e*a*h)*b,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,d=a+a,h=r*l,f=r*u,g=r*d,_=o*u,m=o*d,p=a*d,E=c*l,A=c*u,y=c*d,T=n.x,w=n.y,b=n.z;return s[0]=(1-(_+p))*T,s[1]=(f+y)*T,s[2]=(g-A)*T,s[3]=0,s[4]=(f-y)*w,s[5]=(1-(h+p))*w,s[6]=(m+E)*w,s[7]=0,s[8]=(g+A)*b,s[9]=(m-E)*b,s[10]=(1-(h+_))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=is.set(s[0],s[1],s[2]).length(),o=is.set(s[4],s[5],s[6]).length(),a=is.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],_n.copy(this);let l=1/r,u=1/o,d=1/a;return _n.elements[0]*=l,_n.elements[1]*=l,_n.elements[2]*=l,_n.elements[4]*=u,_n.elements[5]*=u,_n.elements[6]*=u,_n.elements[8]*=d,_n.elements[9]*=d,_n.elements[10]*=d,e.setFromRotationMatrix(_n),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=yn,c=!1){let l=this.elements,u=2*r/(e-t),d=2*r/(n-s),h=(e+t)/(e-t),f=(n+s)/(n-s),g,_;if(c)g=r/(o-r),_=o*r/(o-r);else if(a===yn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===nr)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=yn,c=!1){let l=this.elements,u=2/(e-t),d=2/(n-s),h=-(e+t)/(e-t),f=-(n+s)/(n-s),g,_;if(c)g=1/(o-r),_=o/(o-r);else if(a===yn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===nr)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},is=new N,_n=new re,ff=new N(0,0,0),pf=new N(1,1,1),ii=new N,Xr=new N,en=new N,wh=new re,Th=new Ye,mn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return wh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(wh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Th.setFromEuler(this),this.setFromQuaternion(Th,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};mn.DEFAULT_ORDER="XYZ";var Ms=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},mf=0,Eh=new N,ss=new Ye,Gn=new re,qr=new N,Zs=new N,gf=new N,_f=new Ye,Ah=new N(1,0,0),Rh=new N(0,1,0),Ch=new N(0,0,1),Ih={type:"added"},xf={type:"removed"},rs={type:"childadded",child:null},dc={type:"childremoved",child:null},De=class i extends Rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=Ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new N,e=new mn,n=new Ye,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new re},normalMatrix:{value:new Vt}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.multiply(ss),this}rotateOnWorldAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.premultiply(ss),this}rotateX(t){return this.rotateOnAxis(Ah,t)}rotateY(t){return this.rotateOnAxis(Rh,t)}rotateZ(t){return this.rotateOnAxis(Ch,t)}translateOnAxis(t,e){return Eh.copy(t).applyQuaternion(this.quaternion),this.position.add(Eh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ah,t)}translateY(t){return this.translateOnAxis(Rh,t)}translateZ(t){return this.translateOnAxis(Ch,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?qr.copy(t):qr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(Zs,qr,this.up):Gn.lookAt(qr,Zs,this.up),this.quaternion.setFromRotationMatrix(Gn),s&&(Gn.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(Gn),this.quaternion.premultiply(ss.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ih),rs.child=t,this.dispatchEvent(rs),rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xf),dc.child=t,this.dispatchEvent(dc),dc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ih),rs.child=t,this.dispatchEvent(rs),rs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,t,gf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,_f,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),d=o(t.shapes),h=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};De.DEFAULT_UP=new N(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xn=new N,Wn=new N,fc=new N,Xn=new N,os=new N,as=new N,Ph=new N,pc=new N,mc=new N,gc=new N,_c=new ie,xc=new ie,yc=new ie,oi=class i{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),xn.subVectors(t,e),s.cross(xn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){xn.subVectors(s,e),Wn.subVectors(n,e),fc.subVectors(t,e);let o=xn.dot(xn),a=xn.dot(Wn),c=xn.dot(fc),l=Wn.dot(Wn),u=Wn.dot(fc),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(l*c-a*u)*h,g=(o*u-a*c)*h;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Xn.x),c.addScaledVector(o,Xn.y),c.addScaledVector(a,Xn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return _c.setScalar(0),xc.setScalar(0),yc.setScalar(0),_c.fromBufferAttribute(t,e),xc.fromBufferAttribute(t,n),yc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(_c,r.x),o.addScaledVector(xc,r.y),o.addScaledVector(yc,r.z),o}static isFrontFacing(t,e,n,s){return xn.subVectors(n,e),Wn.subVectors(t,e),xn.cross(Wn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return xn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),xn.cross(Wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;os.subVectors(s,n),as.subVectors(r,n),pc.subVectors(t,n);let c=os.dot(pc),l=as.dot(pc);if(c<=0&&l<=0)return e.copy(n);mc.subVectors(t,s);let u=os.dot(mc),d=as.dot(mc);if(u>=0&&d<=u)return e.copy(s);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(os,o);gc.subVectors(t,r);let f=os.dot(gc),g=as.dot(gc);if(g>=0&&f<=g)return e.copy(r);let _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(as,a);let m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return Ph.subVectors(r,s),a=(d-u)/(d-u+(f-g)),e.copy(s).addScaledVector(Ph,a);let p=1/(m+_+h);return o=_*p,a=h*p,e.copy(n).addScaledVector(os,o).addScaledVector(as,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Iu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},Yr={h:0,s:0,l:0};function vc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var kt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Kt.workingColorSpace){if(t=Jc(t,1),e=qt(e,0,1),n=qt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=vc(o,r,t+1/3),this.g=vc(o,r,t),this.b=vc(o,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,e=Le){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){let n=Iu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=qn(t.r),this.g=qn(t.g),this.b=qn(t.b),this}copyLinearToSRGB(t){return this.r=fs(t.r),this.g=fs(t.g),this.b=fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return Kt.workingToColorSpace(ke.copy(this),t),Math.round(qt(ke.r*255,0,255))*65536+Math.round(qt(ke.g*255,0,255))*256+Math.round(qt(ke.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(ke.copy(this),e);let n=ke.r,s=ke.g,r=ke.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(ke.copy(this),e),t.r=ke.r,t.g=ke.g,t.b=ke.b,t}getStyle(t=Le){Kt.workingToColorSpace(ke.copy(this),t);let e=ke.r,n=ke.g,s=ke.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(si),this.setHSL(si.h+t,si.s+e,si.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(si),t.getHSL(Yr);let n=tr(si.h,Yr.h,e),s=tr(si.s,Yr.s,e),r=tr(si.l,Yr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ke=new kt;kt.NAMES=Iu;var yf=0,Yn=class extends Rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=Ls(),this.name="",this.type="Material",this.blending=Ei,this.side=rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oo,this.blendDst=ao,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=Ai,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==rn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oo&&(n.blendSrc=this.blendSrc),this.blendDst!==ao&&(n.blendDst=this.blendDst),this.blendEquation!==ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ai&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},rr=class extends Yn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=No,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Me=new N,Zr=new Dt,vf=0,de=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ic,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Zr.fromBufferAttribute(this,e),Zr.applyMatrix3(t),this.setXY(e,Zr.x,Zr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ds(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=We(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ds(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ds(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ds(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ds(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),s=We(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),s=We(s,this.array),r=We(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ic&&(t.usage=this.usage),t}};var or=class extends de{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ar=class extends de{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Se=class extends de{constructor(t,e,n){super(new Float32Array(t),e,n)}},Mf=0,dn=new re,Mc=new De,cs=new N,nn=new Cn,$s=new Cn,Pe=new N,Ze=class i extends Rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(jc(t)?ar:or)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,n){return dn.makeTranslation(t,e,n),this.applyMatrix4(dn),this}scale(t,e,n){return dn.makeScale(t,e,n),this.applyMatrix4(dn),this}lookAt(t){return Mc.lookAt(t),Mc.updateMatrix(),this.applyMatrix4(Mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Se(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];$s.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors(nn.min,$s.min),nn.expandByPoint(Pe),Pe.addVectors(nn.max,$s.max),nn.expandByPoint(Pe)):(nn.expandByPoint($s.min),nn.expandByPoint($s.max))}nn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Pe.fromBufferAttribute(a,l),c&&(cs.fromBufferAttribute(t,l),Pe.add(cs)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new de(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<n.count;R++)a[R]=new N,c[R]=new N;let l=new N,u=new N,d=new N,h=new Dt,f=new Dt,g=new Dt,_=new N,m=new N;function p(R,x,v){l.fromBufferAttribute(n,R),u.fromBufferAttribute(n,x),d.fromBufferAttribute(n,v),h.fromBufferAttribute(r,R),f.fromBufferAttribute(r,x),g.fromBufferAttribute(r,v),u.sub(l),d.sub(l),f.sub(h),g.sub(h);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(I),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(I),a[R].add(_),a[x].add(_),a[v].add(_),c[R].add(m),c[x].add(m),c[v].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let R=0,x=E.length;R<x;++R){let v=E[R],I=v.start,L=v.count;for(let U=I,B=I+L;U<B;U+=3)p(t.getX(U+0),t.getX(U+1),t.getX(U+2))}let A=new N,y=new N,T=new N,w=new N;function b(R){T.fromBufferAttribute(s,R),w.copy(T);let x=a[R];A.copy(x),A.sub(T.multiplyScalar(T.dot(x))).normalize(),y.crossVectors(w,x);let I=y.dot(c[R])<0?-1:1;o.setXYZW(R,A.x,A.y,A.z,I)}for(let R=0,x=E.length;R<x;++R){let v=E[R],I=v.start,L=v.count;for(let U=I,B=I+L;U<B;U+=3)b(t.getX(U+0)),b(t.getX(U+1)),b(t.getX(U+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new de(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new N,r=new N,o=new N,a=new N,c=new N,l=new N,u=new N,d=new N;if(t)for(let h=0,f=t.count;h<f;h+=3){let g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(a,c){let l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u),f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*u;for(let p=0;p<u;p++)h[g++]=l[f++]}return new de(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){let h=l[u],f=t(h,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let f=l[d];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],d=r[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Lh=new re,Si=new Ii,$r=new li,Dh=new N,Kr=new N,Jr=new N,jr=new N,bc=new N,Qr=new N,Uh=new N,to=new N,ne=class extends De{constructor(t=new Ze,e=new rr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Qr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],d=r[c];u!==0&&(bc.fromBufferAttribute(d,t),o?Qr.addScaledVector(bc,u):Qr.addScaledVector(bc.sub(e),u))}e.add(Qr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(r),Si.copy(t.ray).recast(t.near),!($r.containsPoint(Si.origin)===!1&&(Si.intersectSphere($r,Dh)===null||Si.origin.distanceToSquared(Dh)>(t.far-t.near)**2))&&(Lh.copy(r).invert(),Si.copy(t.ray).applyMatrix4(Lh),!(n.boundingBox!==null&&Si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Si)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),A=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=E,T=A;y<T;y+=3){let w=a.getX(y),b=a.getX(y+1),R=a.getX(y+2);s=eo(this,p,t,n,l,u,d,w,b,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let E=a.getX(m),A=a.getX(m+1),y=a.getX(m+2);s=eo(this,o,t,n,l,u,d,E,A,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){let m=h[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),A=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=E,T=A;y<T;y+=3){let w=y,b=y+1,R=y+2;s=eo(this,p,t,n,l,u,d,w,b,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let E=m,A=m+1,y=m+2;s=eo(this,o,t,n,l,u,d,E,A,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function bf(i,t,e,n,s,r,o,a){let c;if(t.side===we?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===rn,a),c===null)return null;to.copy(a),to.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(to);return l<e.near||l>e.far?null:{distance:l,point:to.clone(),object:i}}function eo(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Kr),i.getVertexPosition(c,Jr),i.getVertexPosition(l,jr);let u=bf(i,t,e,n,Kr,Jr,jr,Uh);if(u){let d=new N;oi.getBarycoord(Uh,Kr,Jr,jr,d),s&&(u.uv=oi.getInterpolatedAttribute(s,a,c,l,d,new Dt)),r&&(u.uv1=oi.getInterpolatedAttribute(r,a,c,l,d,new Dt)),o&&(u.normal=oi.getInterpolatedAttribute(o,a,c,l,d,new N),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new N,materialIndex:0};oi.getNormal(Kr,Jr,jr,h.normal),u.face=h,u.barycoord=d}return u}var hi=class i extends Ze{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],d=[],h=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(u,3)),this.setAttribute("uv",new Se(d,2));function g(_,m,p,E,A,y,T,w,b,R,x){let v=y/b,I=T/R,L=y/2,U=T/2,B=w/2,H=b+1,W=R+1,j=0,z=0,Q=new N;for(let ct=0;ct<W;ct++){let lt=ct*I-U;for(let Z=0;Z<H;Z++){let It=Z*v-L;Q[_]=It*E,Q[m]=lt*A,Q[p]=B,l.push(Q.x,Q.y,Q.z),Q[_]=0,Q[m]=0,Q[p]=w>0?1:-1,u.push(Q.x,Q.y,Q.z),d.push(Z/b),d.push(1-ct/R),j+=1}}for(let ct=0;ct<R;ct++)for(let lt=0;lt<b;lt++){let Z=h+lt+H*ct,It=h+lt+H*(ct+1),vt=h+(lt+1)+H*(ct+1),Bt=h+(lt+1)+H*ct;c.push(Z,It,Bt),c.push(It,vt,Bt),z+=6}a.addGroup(f,z,x),f+=z,h+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Hi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ve(i){let t={};for(let e=0;e<i.length;e++){let n=Hi(i[e]);for(let s in n)t[s]=n[s]}return t}function Sf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Qc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}var Pu={clone:Hi,merge:Ve},wf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,vn=class extends Yn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wf,this.fragmentShader=Tf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hi(t.uniforms),this.uniformsGroups=Sf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},cr=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ri=new N,Nh=new Dt,Fh=new Dt,Ne=class extends cr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=xs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Qs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(Qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ri.x,ri.y).multiplyScalar(-t/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ri.x,ri.y).multiplyScalar(-t/ri.z)}getViewSize(t,e){return this.getViewBounds(t,Nh,Fh),e.subVectors(Fh,Nh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Qs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ls=-90,hs=1,ho=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ne(ls,hs,t,e);s.layers=this.layers,this.add(s);let r=new Ne(ls,hs,t,e);r.layers=this.layers,this.add(r);let o=new Ne(ls,hs,t,e);o.layers=this.layers,this.add(o);let a=new Ne(ls,hs,t,e);a.layers=this.layers,this.add(a);let c=new Ne(ls,hs,t,e);c.layers=this.layers,this.add(c);let l=new Ne(ls,hs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===yn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},lr=class extends He{constructor(t=[],e=Oi,n,s,r,o,a,c,l,u){super(t,e,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},uo=class extends pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new lr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new hi(5,5,5),r=new vn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:we,blending:Zn});r.uniforms.tEquirect.value=e;let o=new ne(s,r),a=e.minFilter;return e.minFilter===Dn&&(e.minFilter=on),new ho(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},sn=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ef={type:"move"},bs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new sn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new sn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new sn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ef)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new sn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var In=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var fo=class extends He{constructor(t=null,e=1,n=1,s,r,o,a,c,l=ze,u=ze,d,h){super(null,o,a,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var hr=class extends de{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},us=new re,Oh=new re,no=[],Bh=new Cn,Af=new re,Ks=new ne,Js=new li,ur=class extends ne{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new hr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Af)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Cn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,us),Bh.copy(t.boundingBox).applyMatrix4(us),this.boundingBox.union(Bh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,us),Js.copy(t.boundingSphere).applyMatrix4(us),this.boundingSphere.union(Js)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Ks.geometry=this.geometry,Ks.material=this.material,Ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Js.copy(this.boundingSphere),Js.applyMatrix4(n),t.ray.intersectsSphere(Js)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,us),Oh.multiplyMatrices(n,us),Ks.matrixWorld=Oh,Ks.raycast(t,no);for(let o=0,a=no.length;o<a;o++){let c=no[o];c.instanceId=r,c.object=this,e.push(c)}no.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new hr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new fo(new Float32Array(s*this.count),s,this.count,Go,Sn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Sc=new N,Rf=new N,Cf=new Vt,fn=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Sc.subVectors(n,e).cross(Rf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Sc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Cf.getNormalMatrix(t),s=this.coplanarPoint(Sc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},wi=new li,If=new Dt(.5,.5),io=new N,Ss=class{constructor(t=new fn,e=new fn,n=new fn,s=new fn,r=new fn,o=new fn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=yn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],d=r[5],h=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],E=r[12],A=r[13],y=r[14],T=r[15];if(s[0].setComponents(l-o,f-u,p-g,T-E).normalize(),s[1].setComponents(l+o,f+u,p+g,T+E).normalize(),s[2].setComponents(l+a,f+d,p+_,T+A).normalize(),s[3].setComponents(l-a,f-d,p-_,T-A).normalize(),n)s[4].setComponents(c,h,m,y).normalize(),s[5].setComponents(l-c,f-h,p-m,T-y).normalize();else if(s[4].setComponents(l-c,f-h,p-m,T-y).normalize(),e===yn)s[5].setComponents(l+c,f+h,p+m,T+y).normalize();else if(e===nr)s[5].setComponents(c,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(t){wi.center.set(0,0,0);let e=If.distanceTo(t.center);return wi.radius=.7071067811865476+e,wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(io.x=s.normal.x>0?t.max.x:t.min.x,io.y=s.normal.y>0?t.max.y:t.min.y,io.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(io)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Pi=class extends He{constructor(t,e,n,s,r,o,a,c,l,u,d,h){super(null,o,a,c,l,u,s,r,d,h),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}};var ws=class extends He{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},dr=class extends He{constructor(t,e,n=mi,s,r,o,a=ze,c=ze,l,u=gs,d=1){if(u!==gs&&u!==Ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:d};super(h,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ci(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},fr=class extends He{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var pr=class i extends Ze{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],g=0,_=[],m=n/2,p=0;E(),o===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(u),this.setAttribute("position",new Se(d,3)),this.setAttribute("normal",new Se(h,3)),this.setAttribute("uv",new Se(f,2));function E(){let y=new N,T=new N,w=0,b=(e-t)/n;for(let R=0;R<=r;R++){let x=[],v=R/r,I=v*(e-t)+t;for(let L=0;L<=s;L++){let U=L/s,B=U*c+a,H=Math.sin(B),W=Math.cos(B);T.x=I*H,T.y=-v*n+m,T.z=I*W,d.push(T.x,T.y,T.z),y.set(H,b,W).normalize(),h.push(y.x,y.y,y.z),f.push(U,1-v),x.push(g++)}_.push(x)}for(let R=0;R<s;R++)for(let x=0;x<r;x++){let v=_[x][R],I=_[x+1][R],L=_[x+1][R+1],U=_[x][R+1];(t>0||x!==0)&&(u.push(v,I,U),w+=3),(e>0||x!==r-1)&&(u.push(I,L,U),w+=3)}l.addGroup(p,w,0),p+=w}function A(y){let T=g,w=new Dt,b=new N,R=0,x=y===!0?t:e,v=y===!0?1:-1;for(let L=1;L<=s;L++)d.push(0,m*v,0),h.push(0,v,0),f.push(.5,.5),g++;let I=g;for(let L=0;L<=s;L++){let B=L/s*c+a,H=Math.cos(B),W=Math.sin(B);b.x=x*W,b.y=m*v,b.z=x*H,d.push(b.x,b.y,b.z),h.push(0,v,0),w.x=H*.5+.5,w.y=W*.5*v+.5,f.push(w.x,w.y),g++}for(let L=0;L<s;L++){let U=T+L,B=I+L;y===!0?u.push(B,B+1,U):u.push(B+1,B,U),R+=3}l.addGroup(p,R,y===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var mr=class i extends Ze{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,d=t/a,h=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let E=p*h-o;for(let A=0;A<l;A++){let y=A*d-r;g.push(y,-E,0),_.push(0,0,1),m.push(A/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<a;E++){let A=E+l*p,y=E+l*(p+1),T=E+1+l*(p+1),w=E+1+l*p;f.push(A,y,w),f.push(y,T,w)}this.setIndex(f),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Li=class i extends Ze{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new N,h=new N,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let E=[],A=p/n,y=0;p===0&&o===0?y=.5/e:p===n&&c===Math.PI&&(y=-.5/e);for(let T=0;T<=e;T++){let w=T/e;d.x=-t*Math.cos(s+w*r)*Math.sin(o+A*a),d.y=t*Math.cos(o+A*a),d.z=t*Math.sin(s+w*r)*Math.sin(o+A*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(w+y,1-A),E.push(l++)}u.push(E)}for(let p=0;p<n;p++)for(let E=0;E<e;E++){let A=u[p][E+1],y=u[p][E],T=u[p+1][E],w=u[p+1][E+1];(p!==0||o>0)&&f.push(A,y,w),(p!==n-1||c<Math.PI)&&f.push(y,T,w)}this.setIndex(f),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Pn=class extends Yn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ma,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},gr=class extends Pn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Dt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new kt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new kt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new kt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Di=class extends Yn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ma,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=No,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},po=class extends Yn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},mo=class extends Yn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function so(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Pf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ui=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},go=class extends Ui{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ec,endingEnd:Ec}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ac:r=t,a=2*e-n;break;case Rc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ac:o=t,c=2*n-e;break;case Rc:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-h*m+2*h*_-h*g,E=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,A=(-1-f)*m+(1.5+f)*_+.5*g,y=f*m-f*_;for(let T=0;T!==a;++T)r[T]=p*o[u+T]+E*o[l+T]+A*o[c+T]+y*o[d+T];return r}},_o=class extends Ui{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(n-e)/(s-e),d=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*d+o[c+h]*u;return r}},xo=class extends Ui{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},an=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=so(e,this.TimeBufferType),this.values=so(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:so(t.times,Array),values:so(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new xo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new _o(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new go(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ri:e=this.InterpolantFactoryMethodDiscrete;break;case _s:e=this.InterpolantFactoryMethodLinear;break;case ro:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ri;case this.InterpolantFactoryMethodLinear:return _s;case this.InterpolantFactoryMethodSmooth:return ro}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Pf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ro,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{let d=a*n,h=d-n,f=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[h+g]||_!==e[f+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,h=o*n;for(let f=0;f!==n;++f)e[h+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};an.prototype.ValueTypeName="";an.prototype.TimeBufferType=Float32Array;an.prototype.ValueBufferType=Float32Array;an.prototype.DefaultInterpolation=_s;var ui=class extends an{constructor(t,e,n){super(t,e,n)}};ui.prototype.ValueTypeName="bool";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=Ri;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var yo=class extends an{constructor(t,e,n,s){super(t,e,n,s)}};yo.prototype.ValueTypeName="color";var vo=class extends an{constructor(t,e,n,s){super(t,e,n,s)}};vo.prototype.ValueTypeName="number";var Mo=class extends Ui{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let u=l+a;l!==u;l+=4)Ye.slerpFlat(r,0,o,l-a,o,l,c);return r}},_r=class extends an{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Mo(this.times,this.values,this.getValueSize(),t)}};_r.prototype.ValueTypeName="quaternion";_r.prototype.InterpolantFactoryMethodSmooth=void 0;var di=class extends an{constructor(t,e,n){super(t,e,n)}};di.prototype.ValueTypeName="string";di.prototype.ValueBufferType=Array;di.prototype.DefaultInterpolation=Ri;di.prototype.InterpolantFactoryMethodLinear=void 0;di.prototype.InterpolantFactoryMethodSmooth=void 0;var bo=class extends an{constructor(t,e,n,s){super(t,e,n,s)}};bo.prototype.ValueTypeName="vector";var So=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Lu=new So,wo=class{constructor(t){this.manager=t!==void 0?t:Lu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};wo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ts=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},xr=class extends Ts{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},wc=new re,kh=new N,zh=new N,To=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.mapType=bn,this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ss,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;kh.setFromMatrixPosition(t.matrixWorld),e.position.copy(kh),zh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(zh),e.updateMatrixWorld(),wc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wc,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Hh=new re,js=new N,Tc=new N,Pc=class extends To{constructor(){super(new Ne(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Dt(4,2),this._viewportCount=6,this._viewports=[new ie(2,1,1,1),new ie(0,1,1,1),new ie(3,1,1,1),new ie(1,1,1,1),new ie(3,0,1,1),new ie(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),js.setFromMatrixPosition(t.matrixWorld),n.position.copy(js),Tc.copy(n.position),Tc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Tc),n.updateMatrixWorld(),s.makeTranslation(-js.x,-js.y,-js.z),Hh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hh,n.coordinateSystem,n.reversedDepth)}},yr=class extends Ts{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Pc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Ni=class extends cr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Lc=class extends To{constructor(){super(new Ni(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Fi=class extends Ts{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Lc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Eo=class extends Ne{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var tl="\\[\\]\\.:\\/",Lf=new RegExp("["+tl+"]","g"),el="[^"+tl+"]",Df="[^"+tl.replace("\\.","")+"]",Uf=/((?:WC+[\/:])*)/.source.replace("WC",el),Nf=/(WCOD+)?/.source.replace("WCOD",Df),Ff=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",el),Of=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",el),Bf=new RegExp("^"+Uf+Nf+Ff+Of+"$"),kf=["material","materials","bones","map"],Dc=class{constructor(t,e,n){let s=n||ee.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ee=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Lf,"")}static parseTrackName(t){let e=Bf.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);kf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ee.Composite=Dc;ee.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ee.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ee.prototype.GetterByBindingType=[ee.prototype._getValue_direct,ee.prototype._getValue_array,ee.prototype._getValue_arrayElement,ee.prototype._getValue_toArray];ee.prototype.SetterByBindingTypeAndVersioning=[[ee.prototype._setValue_direct,ee.prototype._setValue_direct_setNeedsUpdate,ee.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_array,ee.prototype._setValue_array_setNeedsUpdate,ee.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_arrayElement,ee.prototype._setValue_arrayElement_setNeedsUpdate,ee.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_fromArray,ee.prototype._setValue_fromArray_setNeedsUpdate,ee.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Q_=new Float32Array(1);var Vh=new re,vr=class{constructor(t,e,n=0,s=1/0){this.ray=new Ii(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ms,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Vh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vh),this}intersectObject(t,e=!0,n=[]){return Uc(t,this,n,e),n.sort(Gh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Uc(t[s],this,n,e);return n.sort(Gh),n}};function Gh(i,t){return i.distance-t.distance}function Uc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Uc(r[o],t,e,!0)}}var Es=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Mr=class extends Rn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function nl(i,t,e,n){let s=zf(n);switch(e){case Xc:return i*t;case Go:return i*t/s.components*s.byteLength;case Wo:return i*t/s.components*s.byteLength;case Yc:return i*t*2/s.components*s.byteLength;case Xo:return i*t*2/s.components*s.byteLength;case qc:return i*t*3/s.components*s.byteLength;case Ke:return i*t*4/s.components*s.byteLength;case qo:return i*t*4/s.components*s.byteLength;case Sr:case wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Tr:case Er:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Zo:case Ko:return Math.max(i,16)*Math.max(t,8)/4;case Yo:case $o:return Math.max(i,8)*Math.max(t,8)/2;case Jo:case jo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Qo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ta:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ea:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case na:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ia:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case sa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ra:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case oa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case aa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ca:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case la:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ha:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ua:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case da:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case fa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case pa:case ma:case ga:return Math.ceil(i/4)*Math.ceil(t/4)*16;case _a:case xa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ya:case va:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function zf(i){switch(i){case bn:case Hc:return{byteLength:1,components:1};case Rs:case Vc:case Cs:return{byteLength:2,components:1};case Ho:case Vo:return{byteLength:2,components:4};case mi:case zo:case Sn:return{byteLength:4,components:1};case Gc:case Wc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function nd(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Hf(i){let t=new WeakMap;function e(a,c){let l=a.array,u=a.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,u);else{d.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<d.length;f++){let g=d[h],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,g=d.length;f<g;f++){let _=d[f];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Vf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Wf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Jf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ep=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,np=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,op=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ap=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,up=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,dp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,fp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,pp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_p=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xp="gl_FragColor = linearToOutputTexel( gl_FragColor );",yp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Mp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Tp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ep=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ap=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ip=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Up=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Np=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Op=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Hp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Vp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$p=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,em=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,im=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,om=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,um=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_m=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ym=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,wm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Em=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Am=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Im=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Pm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Um=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Hm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$m=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Km=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,eg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ng=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ig=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,og=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ag=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,cg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,lg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ug=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_g=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,yg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xt={alphahash_fragment:Vf,alphahash_pars_fragment:Gf,alphamap_fragment:Wf,alphamap_pars_fragment:Xf,alphatest_fragment:qf,alphatest_pars_fragment:Yf,aomap_fragment:Zf,aomap_pars_fragment:$f,batching_pars_vertex:Kf,batching_vertex:Jf,begin_vertex:jf,beginnormal_vertex:Qf,bsdfs:tp,iridescence_fragment:ep,bumpmap_pars_fragment:np,clipping_planes_fragment:ip,clipping_planes_pars_fragment:sp,clipping_planes_pars_vertex:rp,clipping_planes_vertex:op,color_fragment:ap,color_pars_fragment:cp,color_pars_vertex:lp,color_vertex:hp,common:up,cube_uv_reflection_fragment:dp,defaultnormal_vertex:fp,displacementmap_pars_vertex:pp,displacementmap_vertex:mp,emissivemap_fragment:gp,emissivemap_pars_fragment:_p,colorspace_fragment:xp,colorspace_pars_fragment:yp,envmap_fragment:vp,envmap_common_pars_fragment:Mp,envmap_pars_fragment:bp,envmap_pars_vertex:Sp,envmap_physical_pars_fragment:Up,envmap_vertex:wp,fog_vertex:Tp,fog_pars_vertex:Ep,fog_fragment:Ap,fog_pars_fragment:Rp,gradientmap_pars_fragment:Cp,lightmap_pars_fragment:Ip,lights_lambert_fragment:Pp,lights_lambert_pars_fragment:Lp,lights_pars_begin:Dp,lights_toon_fragment:Np,lights_toon_pars_fragment:Fp,lights_phong_fragment:Op,lights_phong_pars_fragment:Bp,lights_physical_fragment:kp,lights_physical_pars_fragment:zp,lights_fragment_begin:Hp,lights_fragment_maps:Vp,lights_fragment_end:Gp,logdepthbuf_fragment:Wp,logdepthbuf_pars_fragment:Xp,logdepthbuf_pars_vertex:qp,logdepthbuf_vertex:Yp,map_fragment:Zp,map_pars_fragment:$p,map_particle_fragment:Kp,map_particle_pars_fragment:Jp,metalnessmap_fragment:jp,metalnessmap_pars_fragment:Qp,morphinstance_vertex:tm,morphcolor_vertex:em,morphnormal_vertex:nm,morphtarget_pars_vertex:im,morphtarget_vertex:sm,normal_fragment_begin:rm,normal_fragment_maps:om,normal_pars_fragment:am,normal_pars_vertex:cm,normal_vertex:lm,normalmap_pars_fragment:hm,clearcoat_normal_fragment_begin:um,clearcoat_normal_fragment_maps:dm,clearcoat_pars_fragment:fm,iridescence_pars_fragment:pm,opaque_fragment:mm,packing:gm,premultiplied_alpha_fragment:_m,project_vertex:xm,dithering_fragment:ym,dithering_pars_fragment:vm,roughnessmap_fragment:Mm,roughnessmap_pars_fragment:bm,shadowmap_pars_fragment:Sm,shadowmap_pars_vertex:wm,shadowmap_vertex:Tm,shadowmask_pars_fragment:Em,skinbase_vertex:Am,skinning_pars_vertex:Rm,skinning_vertex:Cm,skinnormal_vertex:Im,specularmap_fragment:Pm,specularmap_pars_fragment:Lm,tonemapping_fragment:Dm,tonemapping_pars_fragment:Um,transmission_fragment:Nm,transmission_pars_fragment:Fm,uv_pars_fragment:Om,uv_pars_vertex:Bm,uv_vertex:km,worldpos_vertex:zm,background_vert:Hm,background_frag:Vm,backgroundCube_vert:Gm,backgroundCube_frag:Wm,cube_vert:Xm,cube_frag:qm,depth_vert:Ym,depth_frag:Zm,distanceRGBA_vert:$m,distanceRGBA_frag:Km,equirect_vert:Jm,equirect_frag:jm,linedashed_vert:Qm,linedashed_frag:tg,meshbasic_vert:eg,meshbasic_frag:ng,meshlambert_vert:ig,meshlambert_frag:sg,meshmatcap_vert:rg,meshmatcap_frag:og,meshnormal_vert:ag,meshnormal_frag:cg,meshphong_vert:lg,meshphong_frag:hg,meshphysical_vert:ug,meshphysical_frag:dg,meshtoon_vert:fg,meshtoon_frag:pg,points_vert:mg,points_frag:gg,shadow_vert:_g,shadow_frag:xg,sprite_vert:yg,sprite_frag:vg},ut={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},Un={basic:{uniforms:Ve([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Ve([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new kt(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Ve([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Ve([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Ve([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new kt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Ve([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Ve([ut.points,ut.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Ve([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Ve([ut.common,ut.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Ve([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Ve([ut.sprite,ut.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:Ve([ut.common,ut.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:Ve([ut.lights,ut.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};Un.physical={uniforms:Ve([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};var ba={r:0,b:0,g:0},Vi=new mn,Mg=new re;function bg(i,t,e,n,s,r,o){let a=new kt(0),c=r===!0?0:1,l,u,d=null,h=0,f=null;function g(A){let y=A.isScene===!0?A.background:null;return y&&y.isTexture&&(y=(A.backgroundBlurriness>0?e:t).get(y)),y}function _(A){let y=!1,T=g(A);T===null?p(a,c):T&&T.isColor&&(p(T,1),y=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(A,y){let T=g(y);T&&(T.isCubeTexture||T.mapping===br)?(u===void 0&&(u=new ne(new hi(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:Hi(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:we,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Vi.copy(y.backgroundRotation),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(Vi)),u.material.toneMapped=Kt.getTransfer(T.colorSpace)!==se,(d!==T||h!==T.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=T,h=T.version,f=i.toneMapping),u.layers.enableAll(),A.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new ne(new mr(2,2),new vn({name:"BackgroundMaterial",uniforms:Hi(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(T.colorSpace)!==se,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||h!==T.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=T,h=T.version,f=i.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function p(A,y){A.getRGB(ba,Qc(i)),n.buffers.color.setClear(ba.r,ba.g,ba.b,y,o)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,y=1){a.set(A),c=y,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(A){c=A,p(a,c)},render:_,addToRenderList:m,dispose:E}}function Sg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(v,I,L,U,B){let H=!1,W=d(U,L,I);r!==W&&(r=W,l(r.object)),H=f(v,U,L,B),H&&g(v,U,L,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,y(v,I,L,U),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return i.createVertexArray()}function l(v){return i.bindVertexArray(v)}function u(v){return i.deleteVertexArray(v)}function d(v,I,L){let U=L.wireframe===!0,B=n[v.id];B===void 0&&(B={},n[v.id]=B);let H=B[I.id];H===void 0&&(H={},B[I.id]=H);let W=H[U];return W===void 0&&(W=h(c()),H[U]=W),W}function h(v){let I=[],L=[],U=[];for(let B=0;B<e;B++)I[B]=0,L[B]=0,U[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:L,attributeDivisors:U,object:v,attributes:{},index:null}}function f(v,I,L,U){let B=r.attributes,H=I.attributes,W=0,j=L.getAttributes();for(let z in j)if(j[z].location>=0){let ct=B[z],lt=H[z];if(lt===void 0&&(z==="instanceMatrix"&&v.instanceMatrix&&(lt=v.instanceMatrix),z==="instanceColor"&&v.instanceColor&&(lt=v.instanceColor)),ct===void 0||ct.attribute!==lt||lt&&ct.data!==lt.data)return!0;W++}return r.attributesNum!==W||r.index!==U}function g(v,I,L,U){let B={},H=I.attributes,W=0,j=L.getAttributes();for(let z in j)if(j[z].location>=0){let ct=H[z];ct===void 0&&(z==="instanceMatrix"&&v.instanceMatrix&&(ct=v.instanceMatrix),z==="instanceColor"&&v.instanceColor&&(ct=v.instanceColor));let lt={};lt.attribute=ct,ct&&ct.data&&(lt.data=ct.data),B[z]=lt,W++}r.attributes=B,r.attributesNum=W,r.index=U}function _(){let v=r.newAttributes;for(let I=0,L=v.length;I<L;I++)v[I]=0}function m(v){p(v,0)}function p(v,I){let L=r.newAttributes,U=r.enabledAttributes,B=r.attributeDivisors;L[v]=1,U[v]===0&&(i.enableVertexAttribArray(v),U[v]=1),B[v]!==I&&(i.vertexAttribDivisor(v,I),B[v]=I)}function E(){let v=r.newAttributes,I=r.enabledAttributes;for(let L=0,U=I.length;L<U;L++)I[L]!==v[L]&&(i.disableVertexAttribArray(L),I[L]=0)}function A(v,I,L,U,B,H,W){W===!0?i.vertexAttribIPointer(v,I,L,B,H):i.vertexAttribPointer(v,I,L,U,B,H)}function y(v,I,L,U){_();let B=U.attributes,H=L.getAttributes(),W=I.defaultAttributeValues;for(let j in H){let z=H[j];if(z.location>=0){let Q=B[j];if(Q===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(Q=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(Q=v.instanceColor)),Q!==void 0){let ct=Q.normalized,lt=Q.itemSize,Z=t.get(Q);if(Z===void 0)continue;let It=Z.buffer,vt=Z.type,Bt=Z.bytesPerElement,q=vt===i.INT||vt===i.UNSIGNED_INT||Q.gpuType===zo;if(Q.isInterleavedBufferAttribute){let J=Q.data,mt=J.stride,wt=Q.offset;if(J.isInstancedInterleavedBuffer){for(let Mt=0;Mt<z.locationSize;Mt++)p(z.location+Mt,J.meshPerAttribute);v.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Mt=0;Mt<z.locationSize;Mt++)m(z.location+Mt);i.bindBuffer(i.ARRAY_BUFFER,It);for(let Mt=0;Mt<z.locationSize;Mt++)A(z.location+Mt,lt/z.locationSize,vt,ct,mt*Bt,(wt+lt/z.locationSize*Mt)*Bt,q)}else{if(Q.isInstancedBufferAttribute){for(let J=0;J<z.locationSize;J++)p(z.location+J,Q.meshPerAttribute);v.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let J=0;J<z.locationSize;J++)m(z.location+J);i.bindBuffer(i.ARRAY_BUFFER,It);for(let J=0;J<z.locationSize;J++)A(z.location+J,lt/z.locationSize,vt,ct,lt*Bt,lt/z.locationSize*J*Bt,q)}}else if(W!==void 0){let ct=W[j];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(z.location,ct);break;case 3:i.vertexAttrib3fv(z.location,ct);break;case 4:i.vertexAttrib4fv(z.location,ct);break;default:i.vertexAttrib1fv(z.location,ct)}}}}E()}function T(){R();for(let v in n){let I=n[v];for(let L in I){let U=I[L];for(let B in U)u(U[B].object),delete U[B];delete I[L]}delete n[v]}}function w(v){if(n[v.id]===void 0)return;let I=n[v.id];for(let L in I){let U=I[L];for(let B in U)u(U[B].object),delete U[B];delete I[L]}delete n[v.id]}function b(v){for(let I in n){let L=n[I];if(L[v.id]===void 0)continue;let U=L[v.id];for(let B in U)u(U[B].object),delete U[B];delete L[v.id]}}function R(){x(),o=!0,r!==s&&(r=s,l(r.object))}function x(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:x,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function wg(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),e.update(u,n,d))}function a(l,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];e.update(f,n,1)}function c(l,u,d,h){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*h[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Tg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==Ke&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){let R=b===Cs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==bn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Sn&&!R)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:A,maxFragmentUniforms:y,vertexTextures:T,maxSamples:w}}function Eg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new fn,a=new Vt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{let E=r?0:n,A=E*4,y=p.clippingState||null;c.value=y,y=u(g,h,A,f);for(let T=0;T!==A;++T)y[T]=e[T];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,h,f,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=f+_*4,E=h.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,y=f;A!==_;++A,y+=4)o.copy(d[A]).applyMatrix4(E,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Ag(i){let t=new WeakMap;function e(o,a){return a===Oo?o.mapping=Oi:a===Bo&&(o.mapping=Bi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Oo||a===Bo)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new uo(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Us=4,Du=[.125,.215,.35,.446,.526,.582],Xi=20,il=new Ni,Uu=new kt,sl=null,rl=0,ol=0,al=!1,Wi=(1+Math.sqrt(5))/2,Ds=1/Wi,Nu=[new N(-Wi,Ds,0),new N(Wi,Ds,0),new N(-Ds,0,Wi),new N(Ds,0,Wi),new N(0,Wi,-Ds),new N(0,Wi,Ds),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],Rg=new N,Fs=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Rg}=r;sl=this._renderer.getRenderTarget(),rl=this._renderer.getActiveCubeFace(),ol=this._renderer.getActiveMipmapLevel(),al=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ou(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(sl,rl,ol),this._renderer.xr.enabled=al,t.scissorTest=!1,Sa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Oi||t.mapping===Bi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),sl=this._renderer.getRenderTarget(),rl=this._renderer.getActiveCubeFace(),ol=this._renderer.getActiveMipmapLevel(),al=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:on,minFilter:on,generateMipmaps:!1,type:Cs,format:Ke,colorSpace:Ci,depthBuffer:!1},s=Fu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fu(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cg(r)),this._blurMaterial=Ig(r,t,e)}return s}_compileMaterial(t){let e=new ne(this._lodPlanes[0],t);this._renderer.compile(e,il)}_sceneToCubeUV(t,e,n,s,r){let c=new Ne(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Uu),d.toneMapping=Mn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let _=new rr({name:"PMREM.Background",side:we,depthWrite:!1,depthTest:!1}),m=new ne(new hi,_),p=!1,E=t.background;E?E.isColor&&(_.color.copy(E),t.background=null,p=!0):(_.color.copy(Uu),p=!0);for(let A=0;A<6;A++){let y=A%3;y===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[A],r.y,r.z)):y===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[A]));let T=this._cubeSize;Sa(s,y*T,A>2?T:0,T,T),d.setRenderTarget(s),p&&d.render(m,c),d.render(t,c)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=h,t.background=E}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Oi||t.mapping===Bi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ou());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ne(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Sa(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,il)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Nu[(s-r-1)%Nu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new ne(this._lodPlanes[s],l),h=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Xi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Xi;m>Xi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Xi}`);let p=[],E=0;for(let b=0;b<Xi;++b){let R=b/_,x=Math.exp(-R*R/2);p.push(x),b===0?E+=x:b<m&&(E+=2*x)}for(let b=0;b<p.length;b++)p[b]=p[b]/E;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:A}=this;h.dTheta.value=g,h.mipInt.value=A-n;let y=this._sizeLods[s],T=3*y*(s>A-Us?s-A+Us:0),w=4*(this._cubeSize-y);Sa(e,T,w,3*y,2*y),c.setRenderTarget(e),c.render(d,il)}};function Cg(i){let t=[],e=[],n=[],s=i,r=i-Us+1+Du.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Us?c=Du[o-i+Us-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,_=3,m=2,p=1,E=new Float32Array(_*g*f),A=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let w=0;w<f;w++){let b=w%3*2/3-1,R=w>2?0:-1,x=[b,R,0,b+2/3,R,0,b+2/3,R+1,0,b,R,0,b+2/3,R+1,0,b,R+1,0];E.set(x,_*g*w),A.set(h,m*g*w);let v=[w,w,w,w,w,w];y.set(v,p*g*w)}let T=new Ze;T.setAttribute("position",new de(E,_)),T.setAttribute("uv",new de(A,m)),T.setAttribute("faceIndex",new de(y,p)),t.push(T),s>Us&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Fu(i,t,e){let n=new pn(i,t,e);return n.texture.mapping=br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Sa(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Ig(i,t,e){let n=new Float32Array(Xi),s=new N(0,1,0);return new vn({name:"SphericalGaussianBlur",defines:{n:Xi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Ou(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Bu(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function xl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Pg(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Oo||c===Bo,u=c===Oi||c===Bi;if(l||u){let d=t.get(a),h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Fs(i)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return l&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new Fs(i)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Lg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ys("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Dg(i,t,e,n){let s={},r=new WeakMap;function o(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete s[h.id];let f=r.get(h);f&&(t.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function c(d){let h=d.attributes;for(let f in h)t.update(h[f],i.ARRAY_BUFFER)}function l(d){let h=[],f=d.index,g=d.attributes.position,_=0;if(f!==null){let E=f.array;_=f.version;for(let A=0,y=E.length;A<y;A+=3){let T=E[A+0],w=E[A+1],b=E[A+2];h.push(T,w,w,b,b,T)}}else if(g!==void 0){let E=g.array;_=g.version;for(let A=0,y=E.length/3-1;A<y;A+=3){let T=A+0,w=A+1,b=A+2;h.push(T,w,w,b,b,T)}}else return;let m=new(jc(h)?ar:or)(h,1);m.version=_;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function Ug(i,t,e){let n;function s(h){n=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function c(h,f){i.drawElements(n,f,r,h*o),e.update(f,n,1)}function l(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,h*o,g),e.update(f,n,g))}function u(h,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(h,f,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)l(h[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,_,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E]*_[E];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Ng(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Fg(i,t,e){let n=new WeakMap,s=new ie;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==d){let x=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",x)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],A=0;f===!0&&(A=1),g===!0&&(A=2),_===!0&&(A=3);let y=a.attributes.position.count*A,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let w=new Float32Array(y*T*4*d),b=new sr(w,y,T,d);b.type=Sn,b.needsUpdate=!0;let R=A*4;for(let v=0;v<d;v++){let I=m[v],L=p[v],U=E[v],B=y*T*4*v;for(let H=0;H<I.count;H++){let W=H*R;f===!0&&(s.fromBufferAttribute(I,H),w[B+W+0]=s.x,w[B+W+1]=s.y,w[B+W+2]=s.z,w[B+W+3]=0),g===!0&&(s.fromBufferAttribute(L,H),w[B+W+4]=s.x,w[B+W+5]=s.y,w[B+W+6]=s.z,w[B+W+7]=0),_===!0&&(s.fromBufferAttribute(U,H),w[B+W+8]=s.x,w[B+W+9]=s.y,w[B+W+10]=s.z,w[B+W+11]=U.itemSize===4?s.w:1)}}h={count:d,texture:b,size:new Dt(y,T)},n.set(a,h),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Og(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,d=t.get(c,u);if(s.get(d)!==l&&(t.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let h=c.skeleton;s.get(h)!==l&&(h.update(),s.set(h,l))}return d}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var id=new He,ku=new dr(1,1),sd=new sr,rd=new lo,od=new lr,zu=[],Hu=[],Vu=new Float32Array(16),Gu=new Float32Array(9),Wu=new Float32Array(4);function Os(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=zu[s];if(r===void 0&&(r=new Float32Array(s),zu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Te(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ea(i,t){let e=Hu[t];e===void 0&&(e=new Int32Array(t),Hu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Bg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function zg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function Hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function Vg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,n))return;Wu.set(n),i.uniformMatrix2fv(this.addr,!1,Wu),Ee(e,n)}}function Gg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,n))return;Gu.set(n),i.uniformMatrix3fv(this.addr,!1,Gu),Ee(e,n)}}function Wg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,n))return;Vu.set(n),i.uniformMatrix4fv(this.addr,!1,Vu),Ee(e,n)}}function Xg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function Yg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function Zg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function $g(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function Jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function Qg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ku.compareFunction=Zc,r=ku):r=id,e.setTexture2D(t||r,s)}function t0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||rd,s)}function e0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||od,s)}function n0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||sd,s)}function i0(i){switch(i){case 5126:return Bg;case 35664:return kg;case 35665:return zg;case 35666:return Hg;case 35674:return Vg;case 35675:return Gg;case 35676:return Wg;case 5124:case 35670:return Xg;case 35667:case 35671:return qg;case 35668:case 35672:return Yg;case 35669:case 35673:return Zg;case 5125:return $g;case 36294:return Kg;case 36295:return Jg;case 36296:return jg;case 35678:case 36198:case 36298:case 36306:case 35682:return Qg;case 35679:case 36299:case 36307:return t0;case 35680:case 36300:case 36308:case 36293:return e0;case 36289:case 36303:case 36311:case 36292:return n0}}function s0(i,t){i.uniform1fv(this.addr,t)}function r0(i,t){let e=Os(t,this.size,2);i.uniform2fv(this.addr,e)}function o0(i,t){let e=Os(t,this.size,3);i.uniform3fv(this.addr,e)}function a0(i,t){let e=Os(t,this.size,4);i.uniform4fv(this.addr,e)}function c0(i,t){let e=Os(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function l0(i,t){let e=Os(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function h0(i,t){let e=Os(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function u0(i,t){i.uniform1iv(this.addr,t)}function d0(i,t){i.uniform2iv(this.addr,t)}function f0(i,t){i.uniform3iv(this.addr,t)}function p0(i,t){i.uniform4iv(this.addr,t)}function m0(i,t){i.uniform1uiv(this.addr,t)}function g0(i,t){i.uniform2uiv(this.addr,t)}function _0(i,t){i.uniform3uiv(this.addr,t)}function x0(i,t){i.uniform4uiv(this.addr,t)}function y0(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||id,r[o])}function v0(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||rd,r[o])}function M0(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||od,r[o])}function b0(i,t,e){let n=this.cache,s=t.length,r=Ea(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||sd,r[o])}function S0(i){switch(i){case 5126:return s0;case 35664:return r0;case 35665:return o0;case 35666:return a0;case 35674:return c0;case 35675:return l0;case 35676:return h0;case 5124:case 35670:return u0;case 35667:case 35671:return d0;case 35668:case 35672:return f0;case 35669:case 35673:return p0;case 5125:return m0;case 36294:return g0;case 36295:return _0;case 36296:return x0;case 35678:case 36198:case 36298:case 36306:case 35682:return y0;case 35679:case 36299:case 36307:return v0;case 35680:case 36300:case 36308:case 36293:return M0;case 36289:case 36303:case 36311:case 36292:return b0}}var ll=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=i0(e.type)}},hl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=S0(e.type)}},ul=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},cl=/(\w+)(\])?(\[|\.)?/g;function Xu(i,t){i.seq.push(t),i.map[t.id]=t}function w0(i,t,e){let n=i.name,s=n.length;for(cl.lastIndex=0;;){let r=cl.exec(n),o=cl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Xu(e,l===void 0?new ll(a,i,t):new hl(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new ul(a),Xu(e,d)),e=d}}}var Ns=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);w0(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function qu(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var T0=37297,E0=0;function A0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Yu=new Vt;function R0(i){Kt._getMatrix(Yu,Kt.workingColorSpace,i);let t=`mat3( ${Yu.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(i)){case er:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Zu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+A0(i.getShaderSource(t),a)}else return r}function C0(i,t){let e=R0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function I0(i,t){let e;switch(t){case du:e="Linear";break;case fu:e="Reinhard";break;case pu:e="Cineon";break;case Fo:e="ACESFilmic";break;case gu:e="AgX";break;case _u:e="Neutral";break;case mu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var wa=new N;function P0(){Kt.getLuminanceCoefficients(wa);let i=wa.x.toFixed(4),t=wa.y.toFixed(4),e=wa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function L0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ar).join(`
`)}function D0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function U0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ar(i){return i!==""}function $u(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ku(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var N0=/^[ \t]*#include +<([\w\d./]+)>/gm;function dl(i){return i.replace(N0,O0)}var F0=new Map;function O0(i,t){let e=Xt[t];if(e===void 0){let n=F0.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return dl(e)}var B0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ju(i){return i.replace(B0,k0)}function k0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ju(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function z0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Fc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ao?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ln&&(t="SHADOWMAP_TYPE_VSM"),t}function H0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Oi:case Bi:t="ENVMAP_TYPE_CUBE";break;case br:t="ENVMAP_TYPE_CUBE_UV";break}return t}function V0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Bi:t="ENVMAP_MODE_REFRACTION";break}return t}function G0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case No:t="ENVMAP_BLENDING_MULTIPLY";break;case hu:t="ENVMAP_BLENDING_MIX";break;case uu:t="ENVMAP_BLENDING_ADD";break}return t}function W0(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function X0(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=z0(e),l=H0(e),u=V0(e),d=G0(e),h=W0(e),f=L0(e),g=D0(r),_=s.createProgram(),m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ar).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ar).join(`
`),p.length>0&&(p+=`
`)):(m=[ju(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ar).join(`
`),p=[ju(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Mn?"#define TONE_MAPPING":"",e.toneMapping!==Mn?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Mn?I0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,C0("linearToOutputTexel",e.outputColorSpace),P0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ar).join(`
`)),o=dl(o),o=$u(o,e),o=Ku(o,e),a=dl(a),a=$u(a,e),a=Ku(a,e),o=Ju(o),a=Ju(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Kc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Kc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let A=E+m+o,y=E+p+a,T=qu(s,s.VERTEX_SHADER,A),w=qu(s,s.FRAGMENT_SHADER,y);s.attachShader(_,T),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function b(I){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(_)||"",U=s.getShaderInfoLog(T)||"",B=s.getShaderInfoLog(w)||"",H=L.trim(),W=U.trim(),j=B.trim(),z=!0,Q=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,w);else{let ct=Zu(s,T,"vertex"),lt=Zu(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+ct+`
`+lt)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(W===""||j==="")&&(Q=!1);Q&&(I.diagnostics={runnable:z,programLog:H,vertexShader:{log:W,prefix:m},fragmentShader:{log:j,prefix:p}})}s.deleteShader(T),s.deleteShader(w),R=new Ns(s,_),x=U0(s,_)}let R;this.getUniforms=function(){return R===void 0&&b(this),R};let x;this.getAttributes=function(){return x===void 0&&b(this),x};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,T0)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=E0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=w,this}var q0=0,fl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new pl(t),e.set(t,n)),n}},pl=class{constructor(t){this.id=q0++,this.code=t,this.usedTimes=0}};function Y0(i,t,e,n,s,r,o){let a=new Ms,c=new fl,l=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,v,I,L,U){let B=L.fog,H=U.geometry,W=x.isMeshStandardMaterial?L.environment:null,j=(x.isMeshStandardMaterial?e:t).get(x.envMap||W),z=j&&j.mapping===br?j.image.height:null,Q=g[x.type];x.precision!==null&&(f=s.getMaxPrecision(x.precision),f!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));let ct=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,lt=ct!==void 0?ct.length:0,Z=0;H.morphAttributes.position!==void 0&&(Z=1),H.morphAttributes.normal!==void 0&&(Z=2),H.morphAttributes.color!==void 0&&(Z=3);let It,vt,Bt,q;if(Q){let te=Un[Q];It=te.vertexShader,vt=te.fragmentShader}else It=x.vertexShader,vt=x.fragmentShader,c.update(x),Bt=c.getVertexShaderID(x),q=c.getFragmentShaderID(x);let J=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),wt=U.isInstancedMesh===!0,Mt=U.isBatchedMesh===!0,Zt=!!x.map,Oe=!!x.matcap,P=!!j,pe=!!x.aoMap,Ht=!!x.lightMap,Ft=!!x.bumpMap,bt=!!x.normalMap,me=!!x.displacementMap,St=!!x.emissiveMap,Wt=!!x.metalnessMap,Ie=!!x.roughnessMap,ye=x.anisotropy>0,C=x.clearcoat>0,M=x.dispersion>0,k=x.iridescence>0,Y=x.sheen>0,tt=x.transmission>0,X=ye&&!!x.anisotropyMap,Ct=C&&!!x.clearcoatMap,rt=C&&!!x.clearcoatNormalMap,Tt=C&&!!x.clearcoatRoughnessMap,At=k&&!!x.iridescenceMap,it=k&&!!x.iridescenceThicknessMap,pt=Y&&!!x.sheenColorMap,Nt=Y&&!!x.sheenRoughnessMap,Rt=!!x.specularMap,dt=!!x.specularColorMap,Gt=!!x.specularIntensityMap,D=tt&&!!x.transmissionMap,st=tt&&!!x.thicknessMap,ht=!!x.gradientMap,_t=!!x.alphaMap,et=x.alphaTest>0,K=!!x.alphaHash,yt=!!x.extensions,zt=Mn;x.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(zt=i.toneMapping);let he={shaderID:Q,shaderType:x.type,shaderName:x.name,vertexShader:It,fragmentShader:vt,defines:x.defines,customVertexShaderID:Bt,customFragmentShaderID:q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:Mt,batchingColor:Mt&&U._colorsTexture!==null,instancing:wt,instancingColor:wt&&U.instanceColor!==null,instancingMorph:wt&&U.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ci,alphaToCoverage:!!x.alphaToCoverage,map:Zt,matcap:Oe,envMap:P,envMapMode:P&&j.mapping,envMapCubeUVHeight:z,aoMap:pe,lightMap:Ht,bumpMap:Ft,normalMap:bt,displacementMap:h&&me,emissiveMap:St,normalMapObjectSpace:bt&&x.normalMapType===vu,normalMapTangentSpace:bt&&x.normalMapType===Ma,metalnessMap:Wt,roughnessMap:Ie,anisotropy:ye,anisotropyMap:X,clearcoat:C,clearcoatMap:Ct,clearcoatNormalMap:rt,clearcoatRoughnessMap:Tt,dispersion:M,iridescence:k,iridescenceMap:At,iridescenceThicknessMap:it,sheen:Y,sheenColorMap:pt,sheenRoughnessMap:Nt,specularMap:Rt,specularColorMap:dt,specularIntensityMap:Gt,transmission:tt,transmissionMap:D,thicknessMap:st,gradientMap:ht,opaque:x.transparent===!1&&x.blending===Ei&&x.alphaToCoverage===!1,alphaMap:_t,alphaTest:et,alphaHash:K,combine:x.combine,mapUv:Zt&&_(x.map.channel),aoMapUv:pe&&_(x.aoMap.channel),lightMapUv:Ht&&_(x.lightMap.channel),bumpMapUv:Ft&&_(x.bumpMap.channel),normalMapUv:bt&&_(x.normalMap.channel),displacementMapUv:me&&_(x.displacementMap.channel),emissiveMapUv:St&&_(x.emissiveMap.channel),metalnessMapUv:Wt&&_(x.metalnessMap.channel),roughnessMapUv:Ie&&_(x.roughnessMap.channel),anisotropyMapUv:X&&_(x.anisotropyMap.channel),clearcoatMapUv:Ct&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:rt&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:it&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&_(x.sheenRoughnessMap.channel),specularMapUv:Rt&&_(x.specularMap.channel),specularColorMapUv:dt&&_(x.specularColorMap.channel),specularIntensityMapUv:Gt&&_(x.specularIntensityMap.channel),transmissionMapUv:D&&_(x.transmissionMap.channel),thicknessMapUv:st&&_(x.thicknessMap.channel),alphaMapUv:_t&&_(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(bt||ye),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!H.attributes.uv&&(Zt||_t),fog:!!B,useFog:x.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:mt,skinning:U.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:Z,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:zt,decodeVideoTexture:Zt&&x.map.isVideoTexture===!0&&Kt.getTransfer(x.map.colorSpace)===se,decodeVideoTextureEmissive:St&&x.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(x.emissiveMap.colorSpace)===se,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===$e,flipSided:x.side===we,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:yt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(yt&&x.extensions.multiDraw===!0||Mt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return he.vertexUv1s=l.has(1),he.vertexUv2s=l.has(2),he.vertexUv3s=l.has(3),l.clear(),he}function p(x){let v=[];if(x.shaderID?v.push(x.shaderID):(v.push(x.customVertexShaderID),v.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)v.push(I),v.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(E(v,x),A(v,x),v.push(i.outputColorSpace)),v.push(x.customProgramCacheKey),v.join()}function E(x,v){x.push(v.precision),x.push(v.outputColorSpace),x.push(v.envMapMode),x.push(v.envMapCubeUVHeight),x.push(v.mapUv),x.push(v.alphaMapUv),x.push(v.lightMapUv),x.push(v.aoMapUv),x.push(v.bumpMapUv),x.push(v.normalMapUv),x.push(v.displacementMapUv),x.push(v.emissiveMapUv),x.push(v.metalnessMapUv),x.push(v.roughnessMapUv),x.push(v.anisotropyMapUv),x.push(v.clearcoatMapUv),x.push(v.clearcoatNormalMapUv),x.push(v.clearcoatRoughnessMapUv),x.push(v.iridescenceMapUv),x.push(v.iridescenceThicknessMapUv),x.push(v.sheenColorMapUv),x.push(v.sheenRoughnessMapUv),x.push(v.specularMapUv),x.push(v.specularColorMapUv),x.push(v.specularIntensityMapUv),x.push(v.transmissionMapUv),x.push(v.thicknessMapUv),x.push(v.combine),x.push(v.fogExp2),x.push(v.sizeAttenuation),x.push(v.morphTargetsCount),x.push(v.morphAttributeCount),x.push(v.numDirLights),x.push(v.numPointLights),x.push(v.numSpotLights),x.push(v.numSpotLightMaps),x.push(v.numHemiLights),x.push(v.numRectAreaLights),x.push(v.numDirLightShadows),x.push(v.numPointLightShadows),x.push(v.numSpotLightShadows),x.push(v.numSpotLightShadowsWithMaps),x.push(v.numLightProbes),x.push(v.shadowMapType),x.push(v.toneMapping),x.push(v.numClippingPlanes),x.push(v.numClipIntersection),x.push(v.depthPacking)}function A(x,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),v.gradientMap&&a.enable(22),x.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),x.push(a.mask)}function y(x){let v=g[x.type],I;if(v){let L=Un[v];I=Pu.clone(L.uniforms)}else I=x.uniforms;return I}function T(x,v){let I;for(let L=0,U=u.length;L<U;L++){let B=u[L];if(B.cacheKey===v){I=B,++I.usedTimes;break}}return I===void 0&&(I=new X0(i,v,x,r),u.push(I)),I}function w(x){if(--x.usedTimes===0){let v=u.indexOf(x);u[v]=u[u.length-1],u.pop(),x.destroy()}}function b(x){c.remove(x)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:T,releaseProgram:w,releaseShaderCache:b,programs:u,dispose:R}}function Z0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function $0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Qu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function td(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,h,f,g,_,m){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[t]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),t++,p}function a(d,h,f,g,_,m){let p=o(d,h,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(d,h,f,g,_,m){let p=o(d,h,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(d,h){e.length>1&&e.sort(d||$0),n.length>1&&n.sort(h||Qu),s.length>1&&s.sort(h||Qu)}function u(){for(let d=t,h=i.length;d<h;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function K0(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new td,i.set(n,[o])):s>=r.length?(o=new td,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function J0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new kt};break;case"SpotLight":e={position:new N,direction:new N,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function j0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Q0=0;function t_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function e_(i){let t=new J0,e=j0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let s=new N,r=new re,o=new re;function a(l){let u=0,d=0,h=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,E=0,A=0,y=0,T=0,w=0,b=0;l.sort(t_);for(let x=0,v=l.length;x<v;x++){let I=l[x],L=I.color,U=I.intensity,B=I.distance,H=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=L.r*U,d+=L.g*U,h+=L.b*U;else if(I.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(I.sh.coefficients[W],U);b++}else if(I.isDirectionalLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let j=I.shadow,z=e.get(I);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,n.directionalShadow[f]=z,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=I.shadow.matrix,E++}n.directional[f]=W,f++}else if(I.isSpotLight){let W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(L).multiplyScalar(U),W.distance=B,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,n.spot[_]=W;let j=I.shadow;if(I.map&&(n.spotLightMap[T]=I.map,T++,j.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[_]=j.matrix,I.castShadow){let z=e.get(I);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=H,y++}_++}else if(I.isRectAreaLight){let W=t.get(I);W.color.copy(L).multiplyScalar(U),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=W,m++}else if(I.isPointLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){let j=I.shadow,z=e.get(I);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,z.shadowCameraNear=j.camera.near,z.shadowCameraFar=j.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=H,n.pointShadowMatrix[g]=I.shadow.matrix,A++}n.point[g]=W,g++}else if(I.isHemisphereLight){let W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(U),W.groundColor.copy(I.groundColor).multiplyScalar(U),n.hemi[p]=W,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==E||R.numPointShadows!==A||R.numSpotShadows!==y||R.numSpotMaps!==T||R.numLightProbes!==b)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=y+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=b,R.directionalLength=f,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=E,R.numPointShadows=A,R.numSpotShadows=y,R.numSpotMaps=T,R.numLightProbes=b,n.version=Q0++)}function c(l,u){let d=0,h=0,f=0,g=0,_=0,m=u.matrixWorldInverse;for(let p=0,E=l.length;p<E;p++){let A=l[p];if(A.isDirectionalLight){let y=n.directional[d];y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(A.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(A.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(A.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(A.width*.5,0,0),y.halfHeight.set(0,A.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(A.isPointLight){let y=n.point[h];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),h++}else if(A.isHemisphereLight){let y=n.hemi[_];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function ed(i){let t=new e_(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function n_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new ed(i),t.set(s,[a])):r>=o.length?(a=new ed(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var i_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,s_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function r_(i,t,e){let n=new Ss,s=new Dt,r=new Dt,o=new ie,a=new po({depthPacking:yu}),c=new mo,l={},u=e.maxTextureSize,d={[rn]:we,[we]:rn,[$e]:$e},h=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:i_,fragmentShader:s_}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ze;g.setAttribute("position",new de(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ne(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fc;let p=this.type;this.render=function(w,b,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let x=i.getRenderTarget(),v=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Zn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let U=p!==Ln&&this.type===Ln,B=p===Ln&&this.type!==Ln;for(let H=0,W=w.length;H<W;H++){let j=w[H],z=j.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let Q=z.getFrameExtents();if(s.multiply(Q),r.copy(z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,z.mapSize.y=r.y)),z.map===null||U===!0||B===!0){let lt=this.type!==Ln?{minFilter:ze,magFilter:ze}:{};z.map!==null&&z.map.dispose(),z.map=new pn(s.x,s.y,lt),z.map.texture.name=j.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();let ct=z.getViewportCount();for(let lt=0;lt<ct;lt++){let Z=z.getViewport(lt);o.set(r.x*Z.x,r.y*Z.y,r.x*Z.z,r.y*Z.w),L.viewport(o),z.updateMatrices(j,lt),n=z.getFrustum(),y(b,R,z.camera,j,this.type)}z.isPointLightShadow!==!0&&this.type===Ln&&E(z,R),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(x,v,I)};function E(w,b){let R=t.update(_);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new pn(s.x,s.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(b,null,R,h,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(b,null,R,f,_,null)}function A(w,b,R,x){let v=null,I=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)v=I;else if(v=R.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){let L=v.uuid,U=b.uuid,B=l[L];B===void 0&&(B={},l[L]=B);let H=B[U];H===void 0&&(H=v.clone(),B[U]=H,b.addEventListener("dispose",T)),v=H}if(v.visible=b.visible,v.wireframe=b.wireframe,x===Ln?v.side=b.shadowSide!==null?b.shadowSide:b.side:v.side=b.shadowSide!==null?b.shadowSide:d[b.side],v.alphaMap=b.alphaMap,v.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,v.map=b.map,v.clipShadows=b.clipShadows,v.clippingPlanes=b.clippingPlanes,v.clipIntersection=b.clipIntersection,v.displacementMap=b.displacementMap,v.displacementScale=b.displacementScale,v.displacementBias=b.displacementBias,v.wireframeLinewidth=b.wireframeLinewidth,v.linewidth=b.linewidth,R.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let L=i.properties.get(v);L.light=R}return v}function y(w,b,R,x,v){if(w.visible===!1)return;if(w.layers.test(b.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&v===Ln)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);let U=t.update(w),B=w.material;if(Array.isArray(B)){let H=U.groups;for(let W=0,j=H.length;W<j;W++){let z=H[W],Q=B[z.materialIndex];if(Q&&Q.visible){let ct=A(w,Q,x,v);w.onBeforeShadow(i,w,b,R,U,ct,z),i.renderBufferDirect(R,null,U,ct,w,z),w.onAfterShadow(i,w,b,R,U,ct,z)}}}else if(B.visible){let H=A(w,B,x,v);w.onBeforeShadow(i,w,b,R,U,H,null),i.renderBufferDirect(R,null,U,H,w,null),w.onAfterShadow(i,w,b,R,U,H,null)}}let L=w.children;for(let U=0,B=L.length;U<B;U++)y(L[U],b,R,x,v)}function T(w){w.target.removeEventListener("dispose",T);for(let R in l){let x=l[R],v=w.target.uuid;v in x&&(x[v].dispose(),delete x[v])}}}var o_={[Ro]:Co,[Io]:Do,[Po]:Uo,[Ai]:Lo,[Co]:Ro,[Do]:Io,[Uo]:Po,[Lo]:Ai};function a_(i,t){function e(){let D=!1,st=new ie,ht=null,_t=new ie(0,0,0,0);return{setMask:function(et){ht!==et&&!D&&(i.colorMask(et,et,et,et),ht=et)},setLocked:function(et){D=et},setClear:function(et,K,yt,zt,he){he===!0&&(et*=zt,K*=zt,yt*=zt),st.set(et,K,yt,zt),_t.equals(st)===!1&&(i.clearColor(et,K,yt,zt),_t.copy(st))},reset:function(){D=!1,ht=null,_t.set(-1,0,0,0)}}}function n(){let D=!1,st=!1,ht=null,_t=null,et=null;return{setReversed:function(K){if(st!==K){let yt=t.get("EXT_clip_control");K?yt.clipControlEXT(yt.LOWER_LEFT_EXT,yt.ZERO_TO_ONE_EXT):yt.clipControlEXT(yt.LOWER_LEFT_EXT,yt.NEGATIVE_ONE_TO_ONE_EXT),st=K;let zt=et;et=null,this.setClear(zt)}},getReversed:function(){return st},setTest:function(K){K?J(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(K){ht!==K&&!D&&(i.depthMask(K),ht=K)},setFunc:function(K){if(st&&(K=o_[K]),_t!==K){switch(K){case Ro:i.depthFunc(i.NEVER);break;case Co:i.depthFunc(i.ALWAYS);break;case Io:i.depthFunc(i.LESS);break;case Ai:i.depthFunc(i.LEQUAL);break;case Po:i.depthFunc(i.EQUAL);break;case Lo:i.depthFunc(i.GEQUAL);break;case Do:i.depthFunc(i.GREATER);break;case Uo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_t=K}},setLocked:function(K){D=K},setClear:function(K){et!==K&&(st&&(K=1-K),i.clearDepth(K),et=K)},reset:function(){D=!1,ht=null,_t=null,et=null,st=!1}}}function s(){let D=!1,st=null,ht=null,_t=null,et=null,K=null,yt=null,zt=null,he=null;return{setTest:function(te){D||(te?J(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(te){st!==te&&!D&&(i.stencilMask(te),st=te)},setFunc:function(te,On,En){(ht!==te||_t!==On||et!==En)&&(i.stencilFunc(te,On,En),ht=te,_t=On,et=En)},setOp:function(te,On,En){(K!==te||yt!==On||zt!==En)&&(i.stencilOp(te,On,En),K=te,yt=On,zt=En)},setLocked:function(te){D=te},setClear:function(te){he!==te&&(i.clearStencil(te),he=te)},reset:function(){D=!1,st=null,ht=null,_t=null,et=null,K=null,yt=null,zt=null,he=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,u={},d={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,E=null,A=null,y=null,T=null,w=null,b=new kt(0,0,0),R=0,x=!1,v=null,I=null,L=null,U=null,B=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,j=0,z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(z)[1]),W=j>=1):z.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),W=j>=2);let Q=null,ct={},lt=i.getParameter(i.SCISSOR_BOX),Z=i.getParameter(i.VIEWPORT),It=new ie().fromArray(lt),vt=new ie().fromArray(Z);function Bt(D,st,ht,_t){let et=new Uint8Array(4),K=i.createTexture();i.bindTexture(D,K),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let yt=0;yt<ht;yt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(st,0,i.RGBA,1,1,_t,0,i.RGBA,i.UNSIGNED_BYTE,et):i.texImage2D(st+yt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,et);return K}let q={};q[i.TEXTURE_2D]=Bt(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=Bt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=Bt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=Bt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(i.DEPTH_TEST),o.setFunc(Ai),Ft(!1),bt(Nc),J(i.CULL_FACE),pe(Zn);function J(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function mt(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function wt(D,st){return d[D]!==st?(i.bindFramebuffer(D,st),d[D]=st,D===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=st),D===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=st),!0):!1}function Mt(D,st){let ht=f,_t=!1;if(D){ht=h.get(st),ht===void 0&&(ht=[],h.set(st,ht));let et=D.textures;if(ht.length!==et.length||ht[0]!==i.COLOR_ATTACHMENT0){for(let K=0,yt=et.length;K<yt;K++)ht[K]=i.COLOR_ATTACHMENT0+K;ht.length=et.length,_t=!0}}else ht[0]!==i.BACK&&(ht[0]=i.BACK,_t=!0);_t&&i.drawBuffers(ht)}function Zt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}let Oe={[ai]:i.FUNC_ADD,[Yh]:i.FUNC_SUBTRACT,[Zh]:i.FUNC_REVERSE_SUBTRACT};Oe[$h]=i.MIN,Oe[Kh]=i.MAX;let P={[Jh]:i.ZERO,[jh]:i.ONE,[Qh]:i.SRC_COLOR,[oo]:i.SRC_ALPHA,[ru]:i.SRC_ALPHA_SATURATE,[iu]:i.DST_COLOR,[eu]:i.DST_ALPHA,[tu]:i.ONE_MINUS_SRC_COLOR,[ao]:i.ONE_MINUS_SRC_ALPHA,[su]:i.ONE_MINUS_DST_COLOR,[nu]:i.ONE_MINUS_DST_ALPHA,[ou]:i.CONSTANT_COLOR,[au]:i.ONE_MINUS_CONSTANT_COLOR,[cu]:i.CONSTANT_ALPHA,[lu]:i.ONE_MINUS_CONSTANT_ALPHA};function pe(D,st,ht,_t,et,K,yt,zt,he,te){if(D===Zn){_===!0&&(mt(i.BLEND),_=!1);return}if(_===!1&&(J(i.BLEND),_=!0),D!==qh){if(D!==m||te!==x){if((p!==ai||y!==ai)&&(i.blendEquation(i.FUNC_ADD),p=ai,y=ai),te)switch(D){case Ei:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oc:i.blendFunc(i.ONE,i.ONE);break;case Bc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case kc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ei:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case kc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}E=null,A=null,T=null,w=null,b.set(0,0,0),R=0,m=D,x=te}return}et=et||st,K=K||ht,yt=yt||_t,(st!==p||et!==y)&&(i.blendEquationSeparate(Oe[st],Oe[et]),p=st,y=et),(ht!==E||_t!==A||K!==T||yt!==w)&&(i.blendFuncSeparate(P[ht],P[_t],P[K],P[yt]),E=ht,A=_t,T=K,w=yt),(zt.equals(b)===!1||he!==R)&&(i.blendColor(zt.r,zt.g,zt.b,he),b.copy(zt),R=he),m=D,x=!1}function Ht(D,st){D.side===$e?mt(i.CULL_FACE):J(i.CULL_FACE);let ht=D.side===we;st&&(ht=!ht),Ft(ht),D.blending===Ei&&D.transparent===!1?pe(Zn):pe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let _t=D.stencilWrite;a.setTest(_t),_t&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),St(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(D){v!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),v=D)}function bt(D){D!==Wh?(J(i.CULL_FACE),D!==I&&(D===Nc?i.cullFace(i.BACK):D===Xh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),I=D}function me(D){D!==L&&(W&&i.lineWidth(D),L=D)}function St(D,st,ht){D?(J(i.POLYGON_OFFSET_FILL),(U!==st||B!==ht)&&(i.polygonOffset(st,ht),U=st,B=ht)):mt(i.POLYGON_OFFSET_FILL)}function Wt(D){D?J(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function Ie(D){D===void 0&&(D=i.TEXTURE0+H-1),Q!==D&&(i.activeTexture(D),Q=D)}function ye(D,st,ht){ht===void 0&&(Q===null?ht=i.TEXTURE0+H-1:ht=Q);let _t=ct[ht];_t===void 0&&(_t={type:void 0,texture:void 0},ct[ht]=_t),(_t.type!==D||_t.texture!==st)&&(Q!==ht&&(i.activeTexture(ht),Q=ht),i.bindTexture(D,st||q[D]),_t.type=D,_t.texture=st)}function C(){let D=ct[Q];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Y(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ct(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function rt(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(D){It.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),It.copy(D))}function Nt(D){vt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),vt.copy(D))}function Rt(D,st){let ht=l.get(st);ht===void 0&&(ht=new WeakMap,l.set(st,ht));let _t=ht.get(D);_t===void 0&&(_t=i.getUniformBlockIndex(st,D.name),ht.set(D,_t))}function dt(D,st){let _t=l.get(st).get(D);c.get(st)!==_t&&(i.uniformBlockBinding(st,_t,D.__bindingPointIndex),c.set(st,_t))}function Gt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Q=null,ct={},d={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,E=null,A=null,y=null,T=null,w=null,b=new kt(0,0,0),R=0,x=!1,v=null,I=null,L=null,U=null,B=null,It.set(0,0,i.canvas.width,i.canvas.height),vt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:mt,bindFramebuffer:wt,drawBuffers:Mt,useProgram:Zt,setBlending:pe,setMaterial:Ht,setFlipSided:Ft,setCullFace:bt,setLineWidth:me,setPolygonOffset:St,setScissorTest:Wt,activeTexture:Ie,bindTexture:ye,unbindTexture:C,compressedTexImage2D:M,compressedTexImage3D:k,texImage2D:At,texImage3D:it,updateUBOMapping:Rt,uniformBlockBinding:dt,texStorage2D:rt,texStorage3D:Tt,texSubImage2D:Y,texSubImage3D:tt,compressedTexSubImage2D:X,compressedTexSubImage3D:Ct,scissor:pt,viewport:Nt,reset:Gt}}function c_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Dt,u=new WeakMap,d,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,M){return f?new OffscreenCanvas(C,M):ir("canvas")}function _(C,M,k){let Y=1,tt=ye(C);if((tt.width>k||tt.height>k)&&(Y=k/Math.max(tt.width,tt.height)),Y<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let X=Math.floor(Y*tt.width),Ct=Math.floor(Y*tt.height);d===void 0&&(d=g(X,Ct));let rt=M?g(X,Ct):d;return rt.width=X,rt.height=Ct,rt.getContext("2d").drawImage(C,0,0,X,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+X+"x"+Ct+")."),rt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(C,M,k,Y,tt=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let X=M;if(M===i.RED&&(k===i.FLOAT&&(X=i.R32F),k===i.HALF_FLOAT&&(X=i.R16F),k===i.UNSIGNED_BYTE&&(X=i.R8)),M===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.R8UI),k===i.UNSIGNED_SHORT&&(X=i.R16UI),k===i.UNSIGNED_INT&&(X=i.R32UI),k===i.BYTE&&(X=i.R8I),k===i.SHORT&&(X=i.R16I),k===i.INT&&(X=i.R32I)),M===i.RG&&(k===i.FLOAT&&(X=i.RG32F),k===i.HALF_FLOAT&&(X=i.RG16F),k===i.UNSIGNED_BYTE&&(X=i.RG8)),M===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RG8UI),k===i.UNSIGNED_SHORT&&(X=i.RG16UI),k===i.UNSIGNED_INT&&(X=i.RG32UI),k===i.BYTE&&(X=i.RG8I),k===i.SHORT&&(X=i.RG16I),k===i.INT&&(X=i.RG32I)),M===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RGB8UI),k===i.UNSIGNED_SHORT&&(X=i.RGB16UI),k===i.UNSIGNED_INT&&(X=i.RGB32UI),k===i.BYTE&&(X=i.RGB8I),k===i.SHORT&&(X=i.RGB16I),k===i.INT&&(X=i.RGB32I)),M===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),k===i.UNSIGNED_INT&&(X=i.RGBA32UI),k===i.BYTE&&(X=i.RGBA8I),k===i.SHORT&&(X=i.RGBA16I),k===i.INT&&(X=i.RGBA32I)),M===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),M===i.RGBA){let Ct=tt?er:Kt.getTransfer(Y);k===i.FLOAT&&(X=i.RGBA32F),k===i.HALF_FLOAT&&(X=i.RGBA16F),k===i.UNSIGNED_BYTE&&(X=Ct===se?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function y(C,M){let k;return C?M===null||M===mi||M===Is?k=i.DEPTH24_STENCIL8:M===Sn?k=i.DEPTH32F_STENCIL8:M===Rs&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===mi||M===Is?k=i.DEPTH_COMPONENT24:M===Sn?k=i.DEPTH_COMPONENT32F:M===Rs&&(k=i.DEPTH_COMPONENT16),k}function T(C,M){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==ze&&C.minFilter!==on?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function w(C){let M=C.target;M.removeEventListener("dispose",w),R(M),M.isVideoTexture&&u.delete(M)}function b(C){let M=C.target;M.removeEventListener("dispose",b),v(M)}function R(C){let M=n.get(C);if(M.__webglInit===void 0)return;let k=C.source,Y=h.get(k);if(Y){let tt=Y[M.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&x(C),Object.keys(Y).length===0&&h.delete(k)}n.remove(C)}function x(C){let M=n.get(C);i.deleteTexture(M.__webglTexture);let k=C.source,Y=h.get(k);delete Y[M.__cacheKey],o.memory.textures--}function v(C){let M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(M.__webglFramebuffer[Y]))for(let tt=0;tt<M.__webglFramebuffer[Y].length;tt++)i.deleteFramebuffer(M.__webglFramebuffer[Y][tt]);else i.deleteFramebuffer(M.__webglFramebuffer[Y]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[Y])}else{if(Array.isArray(M.__webglFramebuffer))for(let Y=0;Y<M.__webglFramebuffer.length;Y++)i.deleteFramebuffer(M.__webglFramebuffer[Y]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Y=0;Y<M.__webglColorRenderbuffer.length;Y++)M.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[Y]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let k=C.textures;for(let Y=0,tt=k.length;Y<tt;Y++){let X=n.get(k[Y]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(k[Y])}n.remove(C)}let I=0;function L(){I=0}function U(){let C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function B(C){let M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function H(C,M){let k=n.get(C);if(C.isVideoTexture&&Wt(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){let Y=C.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(k,C,M);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+M)}function W(C,M){let k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){q(k,C,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+M)}function j(C,M){let k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){q(k,C,M);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+M)}function z(C,M){let k=n.get(C);if(C.version>0&&k.__version!==C.version){J(k,C,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+M)}let Q={[ps]:i.REPEAT,[An]:i.CLAMP_TO_EDGE,[ms]:i.MIRRORED_REPEAT},ct={[ze]:i.NEAREST,[ko]:i.NEAREST_MIPMAP_NEAREST,[ki]:i.NEAREST_MIPMAP_LINEAR,[on]:i.LINEAR,[As]:i.LINEAR_MIPMAP_NEAREST,[Dn]:i.LINEAR_MIPMAP_LINEAR},lt={[Mu]:i.NEVER,[Au]:i.ALWAYS,[bu]:i.LESS,[Zc]:i.LEQUAL,[Su]:i.EQUAL,[Eu]:i.GEQUAL,[wu]:i.GREATER,[Tu]:i.NOTEQUAL};function Z(C,M){if(M.type===Sn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===on||M.magFilter===As||M.magFilter===ki||M.magFilter===Dn||M.minFilter===on||M.minFilter===As||M.minFilter===ki||M.minFilter===Dn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,Q[M.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,Q[M.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,Q[M.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ct[M.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ct[M.minFilter]),M.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,lt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===ze||M.minFilter!==ki&&M.minFilter!==Dn||M.type===Sn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function It(C,M){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",w));let Y=M.source,tt=h.get(Y);tt===void 0&&(tt={},h.set(Y,tt));let X=B(M);if(X!==C.__cacheKey){tt[X]===void 0&&(tt[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),tt[X].usedTimes++;let Ct=tt[C.__cacheKey];Ct!==void 0&&(tt[C.__cacheKey].usedTimes--,Ct.usedTimes===0&&x(M)),C.__cacheKey=X,C.__webglTexture=tt[X].texture}return k}function vt(C,M,k){return Math.floor(Math.floor(C/k)/M)}function Bt(C,M,k,Y){let X=C.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,k,Y,M.data);else{X.sort((it,pt)=>it.start-pt.start);let Ct=0;for(let it=1;it<X.length;it++){let pt=X[Ct],Nt=X[it],Rt=pt.start+pt.count,dt=vt(Nt.start,M.width,4),Gt=vt(pt.start,M.width,4);Nt.start<=Rt+1&&dt===Gt&&vt(Nt.start+Nt.count-1,M.width,4)===dt?pt.count=Math.max(pt.count,Nt.start+Nt.count-pt.start):(++Ct,X[Ct]=Nt)}X.length=Ct+1;let rt=i.getParameter(i.UNPACK_ROW_LENGTH),Tt=i.getParameter(i.UNPACK_SKIP_PIXELS),At=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let it=0,pt=X.length;it<pt;it++){let Nt=X[it],Rt=Math.floor(Nt.start/4),dt=Math.ceil(Nt.count/4),Gt=Rt%M.width,D=Math.floor(Rt/M.width),st=dt,ht=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Gt),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Gt,D,st,ht,k,Y,M.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,rt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Tt),i.pixelStorei(i.UNPACK_SKIP_ROWS,At)}}function q(C,M,k){let Y=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Y=i.TEXTURE_3D);let tt=It(C,M),X=M.source;e.bindTexture(Y,C.__webglTexture,i.TEXTURE0+k);let Ct=n.get(X);if(X.version!==Ct.__version||tt===!0){e.activeTexture(i.TEXTURE0+k);let rt=Kt.getPrimaries(Kt.workingColorSpace),Tt=M.colorSpace===wn?null:Kt.getPrimaries(M.colorSpace),At=M.colorSpace===wn||rt===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let it=_(M.image,!1,s.maxTextureSize);it=Ie(M,it);let pt=r.convert(M.format,M.colorSpace),Nt=r.convert(M.type),Rt=A(M.internalFormat,pt,Nt,M.colorSpace,M.isVideoTexture);Z(Y,M);let dt,Gt=M.mipmaps,D=M.isVideoTexture!==!0,st=Ct.__version===void 0||tt===!0,ht=X.dataReady,_t=T(M,it);if(M.isDepthTexture)Rt=y(M.format===Ps,M.type),st&&(D?e.texStorage2D(i.TEXTURE_2D,1,Rt,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Rt,it.width,it.height,0,pt,Nt,null));else if(M.isDataTexture)if(Gt.length>0){D&&st&&e.texStorage2D(i.TEXTURE_2D,_t,Rt,Gt[0].width,Gt[0].height);for(let et=0,K=Gt.length;et<K;et++)dt=Gt[et],D?ht&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,dt.width,dt.height,pt,Nt,dt.data):e.texImage2D(i.TEXTURE_2D,et,Rt,dt.width,dt.height,0,pt,Nt,dt.data);M.generateMipmaps=!1}else D?(st&&e.texStorage2D(i.TEXTURE_2D,_t,Rt,it.width,it.height),ht&&Bt(M,it,pt,Nt)):e.texImage2D(i.TEXTURE_2D,0,Rt,it.width,it.height,0,pt,Nt,it.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){D&&st&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,Rt,Gt[0].width,Gt[0].height,it.depth);for(let et=0,K=Gt.length;et<K;et++)if(dt=Gt[et],M.format!==Ke)if(pt!==null)if(D){if(ht)if(M.layerUpdates.size>0){let yt=nl(dt.width,dt.height,M.format,M.type);for(let zt of M.layerUpdates){let he=dt.data.subarray(zt*yt/dt.data.BYTES_PER_ELEMENT,(zt+1)*yt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,zt,dt.width,dt.height,1,pt,he)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,dt.width,dt.height,it.depth,pt,dt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,Rt,dt.width,dt.height,it.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ht&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,dt.width,dt.height,it.depth,pt,Nt,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,Rt,dt.width,dt.height,it.depth,0,pt,Nt,dt.data)}else{D&&st&&e.texStorage2D(i.TEXTURE_2D,_t,Rt,Gt[0].width,Gt[0].height);for(let et=0,K=Gt.length;et<K;et++)dt=Gt[et],M.format!==Ke?pt!==null?D?ht&&e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,dt.width,dt.height,pt,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,et,Rt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ht&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,dt.width,dt.height,pt,Nt,dt.data):e.texImage2D(i.TEXTURE_2D,et,Rt,dt.width,dt.height,0,pt,Nt,dt.data)}else if(M.isDataArrayTexture)if(D){if(st&&e.texStorage3D(i.TEXTURE_2D_ARRAY,_t,Rt,it.width,it.height,it.depth),ht)if(M.layerUpdates.size>0){let et=nl(it.width,it.height,M.format,M.type);for(let K of M.layerUpdates){let yt=it.data.subarray(K*et/it.data.BYTES_PER_ELEMENT,(K+1)*et/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,it.width,it.height,1,pt,Nt,yt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,pt,Nt,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Rt,it.width,it.height,it.depth,0,pt,Nt,it.data);else if(M.isData3DTexture)D?(st&&e.texStorage3D(i.TEXTURE_3D,_t,Rt,it.width,it.height,it.depth),ht&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,pt,Nt,it.data)):e.texImage3D(i.TEXTURE_3D,0,Rt,it.width,it.height,it.depth,0,pt,Nt,it.data);else if(M.isFramebufferTexture){if(st)if(D)e.texStorage2D(i.TEXTURE_2D,_t,Rt,it.width,it.height);else{let et=it.width,K=it.height;for(let yt=0;yt<_t;yt++)e.texImage2D(i.TEXTURE_2D,yt,Rt,et,K,0,pt,Nt,null),et>>=1,K>>=1}}else if(Gt.length>0){if(D&&st){let et=ye(Gt[0]);e.texStorage2D(i.TEXTURE_2D,_t,Rt,et.width,et.height)}for(let et=0,K=Gt.length;et<K;et++)dt=Gt[et],D?ht&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,pt,Nt,dt):e.texImage2D(i.TEXTURE_2D,et,Rt,pt,Nt,dt);M.generateMipmaps=!1}else if(D){if(st){let et=ye(it);e.texStorage2D(i.TEXTURE_2D,_t,Rt,et.width,et.height)}ht&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt,Nt,it)}else e.texImage2D(i.TEXTURE_2D,0,Rt,pt,Nt,it);m(M)&&p(Y),Ct.__version=X.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function J(C,M,k){if(M.image.length!==6)return;let Y=It(C,M),tt=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+k);let X=n.get(tt);if(tt.version!==X.__version||Y===!0){e.activeTexture(i.TEXTURE0+k);let Ct=Kt.getPrimaries(Kt.workingColorSpace),rt=M.colorSpace===wn?null:Kt.getPrimaries(M.colorSpace),Tt=M.colorSpace===wn||Ct===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let At=M.isCompressedTexture||M.image[0].isCompressedTexture,it=M.image[0]&&M.image[0].isDataTexture,pt=[];for(let K=0;K<6;K++)!At&&!it?pt[K]=_(M.image[K],!0,s.maxCubemapSize):pt[K]=it?M.image[K].image:M.image[K],pt[K]=Ie(M,pt[K]);let Nt=pt[0],Rt=r.convert(M.format,M.colorSpace),dt=r.convert(M.type),Gt=A(M.internalFormat,Rt,dt,M.colorSpace),D=M.isVideoTexture!==!0,st=X.__version===void 0||Y===!0,ht=tt.dataReady,_t=T(M,Nt);Z(i.TEXTURE_CUBE_MAP,M);let et;if(At){D&&st&&e.texStorage2D(i.TEXTURE_CUBE_MAP,_t,Gt,Nt.width,Nt.height);for(let K=0;K<6;K++){et=pt[K].mipmaps;for(let yt=0;yt<et.length;yt++){let zt=et[yt];M.format!==Ke?Rt!==null?D?ht&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,0,0,zt.width,zt.height,Rt,zt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,Gt,zt.width,zt.height,0,zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,0,0,zt.width,zt.height,Rt,dt,zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,Gt,zt.width,zt.height,0,Rt,dt,zt.data)}}}else{if(et=M.mipmaps,D&&st){et.length>0&&_t++;let K=ye(pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,_t,Gt,K.width,K.height)}for(let K=0;K<6;K++)if(it){D?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,pt[K].width,pt[K].height,Rt,dt,pt[K].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Gt,pt[K].width,pt[K].height,0,Rt,dt,pt[K].data);for(let yt=0;yt<et.length;yt++){let he=et[yt].image[K].image;D?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,0,0,he.width,he.height,Rt,dt,he.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,Gt,he.width,he.height,0,Rt,dt,he.data)}}else{D?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Rt,dt,pt[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Gt,Rt,dt,pt[K]);for(let yt=0;yt<et.length;yt++){let zt=et[yt];D?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,0,0,Rt,dt,zt.image[K]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,Gt,Rt,dt,zt.image[K])}}}m(M)&&p(i.TEXTURE_CUBE_MAP),X.__version=tt.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function mt(C,M,k,Y,tt,X){let Ct=r.convert(k.format,k.colorSpace),rt=r.convert(k.type),Tt=A(k.internalFormat,Ct,rt,k.colorSpace),At=n.get(M),it=n.get(k);if(it.__renderTarget=M,!At.__hasExternalTextures){let pt=Math.max(1,M.width>>X),Nt=Math.max(1,M.height>>X);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,X,Tt,pt,Nt,M.depth,0,Ct,rt,null):e.texImage2D(tt,X,Tt,pt,Nt,0,Ct,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),St(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,tt,it.__webglTexture,0,me(M)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,tt,it.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function wt(C,M,k){if(i.bindRenderbuffer(i.RENDERBUFFER,C),M.depthBuffer){let Y=M.depthTexture,tt=Y&&Y.isDepthTexture?Y.type:null,X=y(M.stencilBuffer,tt),Ct=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=me(M);St(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,X,M.width,M.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,X,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,X,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ct,i.RENDERBUFFER,C)}else{let Y=M.textures;for(let tt=0;tt<Y.length;tt++){let X=Y[tt],Ct=r.convert(X.format,X.colorSpace),rt=r.convert(X.type),Tt=A(X.internalFormat,Ct,rt,X.colorSpace),At=me(M);k&&St(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,At,Tt,M.width,M.height):St(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,At,Tt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Tt,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Mt(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=n.get(M.depthTexture);Y.__renderTarget=M,(!Y.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),H(M.depthTexture,0);let tt=Y.__webglTexture,X=me(M);if(M.depthTexture.format===gs)St(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0);else if(M.depthTexture.format===Ps)St(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Zt(C){let M=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){let Y=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Y){let tt=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Y.removeEventListener("dispose",tt)};Y.addEventListener("dispose",tt),M.__depthDisposeCallback=tt}M.__boundDepthTexture=Y}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");let Y=C.texture.mipmaps;Y&&Y.length>0?Mt(M.__webglFramebuffer[0],C):Mt(M.__webglFramebuffer,C)}else if(k){M.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[Y]),M.__webglDepthbuffer[Y]===void 0)M.__webglDepthbuffer[Y]=i.createRenderbuffer(),wt(M.__webglDepthbuffer[Y],C,!1);else{let tt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=M.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,X)}}else{let Y=C.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),wt(M.__webglDepthbuffer,C,!1);else{let tt=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(C,M,k){let Y=n.get(C);M!==void 0&&mt(Y.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Zt(C)}function P(C){let M=C.texture,k=n.get(C),Y=n.get(M);C.addEventListener("dispose",b);let tt=C.textures,X=C.isWebGLCubeRenderTarget===!0,Ct=tt.length>1;if(Ct||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=M.version,o.memory.textures++),X){k.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[rt]=[];for(let Tt=0;Tt<M.mipmaps.length;Tt++)k.__webglFramebuffer[rt][Tt]=i.createFramebuffer()}else k.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let rt=0;rt<M.mipmaps.length;rt++)k.__webglFramebuffer[rt]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Ct)for(let rt=0,Tt=tt.length;rt<Tt;rt++){let At=n.get(tt[rt]);At.__webglTexture===void 0&&(At.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&St(C)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let rt=0;rt<tt.length;rt++){let Tt=tt[rt];k.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[rt]);let At=r.convert(Tt.format,Tt.colorSpace),it=r.convert(Tt.type),pt=A(Tt.internalFormat,At,it,Tt.colorSpace,C.isXRRenderTarget===!0),Nt=me(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,pt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,k.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),wt(k.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Z(i.TEXTURE_CUBE_MAP,M);for(let rt=0;rt<6;rt++)if(M.mipmaps&&M.mipmaps.length>0)for(let Tt=0;Tt<M.mipmaps.length;Tt++)mt(k.__webglFramebuffer[rt][Tt],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Tt);else mt(k.__webglFramebuffer[rt],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);m(M)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let rt=0,Tt=tt.length;rt<Tt;rt++){let At=tt[rt],it=n.get(At),pt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(pt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,it.__webglTexture),Z(pt,At),mt(k.__webglFramebuffer,C,At,i.COLOR_ATTACHMENT0+rt,pt,0),m(At)&&p(pt)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(rt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,Y.__webglTexture),Z(rt,M),M.mipmaps&&M.mipmaps.length>0)for(let Tt=0;Tt<M.mipmaps.length;Tt++)mt(k.__webglFramebuffer[Tt],C,M,i.COLOR_ATTACHMENT0,rt,Tt);else mt(k.__webglFramebuffer,C,M,i.COLOR_ATTACHMENT0,rt,0);m(M)&&p(rt),e.unbindTexture()}C.depthBuffer&&Zt(C)}function pe(C){let M=C.textures;for(let k=0,Y=M.length;k<Y;k++){let tt=M[k];if(m(tt)){let X=E(C),Ct=n.get(tt).__webglTexture;e.bindTexture(X,Ct),p(X),e.unbindTexture()}}}let Ht=[],Ft=[];function bt(C){if(C.samples>0){if(St(C)===!1){let M=C.textures,k=C.width,Y=C.height,tt=i.COLOR_BUFFER_BIT,X=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ct=n.get(C),rt=M.length>1;if(rt)for(let At=0;At<M.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);let Tt=C.texture.mipmaps;Tt&&Tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let At=0;At<M.length;At++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);let it=n.get(M[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,it,0)}i.blitFramebuffer(0,0,k,Y,0,0,k,Y,tt,i.NEAREST),c===!0&&(Ht.length=0,Ft.length=0,Ht.push(i.COLOR_ATTACHMENT0+At),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ht.push(X),Ft.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ft)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ht))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let At=0;At<M.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);let it=n.get(M[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,it,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let M=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function me(C){return Math.min(s.maxSamples,C.samples)}function St(C){let M=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Wt(C){let M=o.render.frame;u.get(C)!==M&&(u.set(C,M),C.update())}function Ie(C,M){let k=C.colorSpace,Y=C.format,tt=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==Ci&&k!==wn&&(Kt.getTransfer(k)===se?(Y!==Ke||tt!==bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),M}function ye(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=L,this.setTexture2D=H,this.setTexture2DArray=W,this.setTexture3D=j,this.setTextureCube=z,this.rebindTextures=Oe,this.setupRenderTarget=P,this.updateRenderTargetMipmap=pe,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=St}function l_(i,t){function e(n,s=wn){let r,o=Kt.getTransfer(s);if(n===bn)return i.UNSIGNED_BYTE;if(n===Ho)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Vo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Wc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Hc)return i.BYTE;if(n===Vc)return i.SHORT;if(n===Rs)return i.UNSIGNED_SHORT;if(n===zo)return i.INT;if(n===mi)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===Cs)return i.HALF_FLOAT;if(n===Xc)return i.ALPHA;if(n===qc)return i.RGB;if(n===Ke)return i.RGBA;if(n===gs)return i.DEPTH_COMPONENT;if(n===Ps)return i.DEPTH_STENCIL;if(n===Go)return i.RED;if(n===Wo)return i.RED_INTEGER;if(n===Yc)return i.RG;if(n===Xo)return i.RG_INTEGER;if(n===qo)return i.RGBA_INTEGER;if(n===Sr||n===wr||n===Tr||n===Er)if(o===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Er)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Yo||n===Zo||n===$o||n===Ko)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Yo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Zo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$o)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ko)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Jo||n===jo||n===Qo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Jo||n===jo)return o===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Qo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===oa||n===aa||n===ca||n===la||n===ha||n===ua||n===da||n===fa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ta)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ea)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===na)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ia)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sa)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ra)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===oa)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===aa)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ca)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===la)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ha)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ua)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===da)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===fa)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===pa||n===ma||n===ga)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===pa)return o===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ma)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ga)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_a||n===xa||n===ya||n===va)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===_a)return r.COMPRESSED_RED_RGTC1_EXT;if(n===xa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ya)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===va)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Is?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var h_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,u_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ml=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new fr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new vn({vertexShader:h_,fragmentShader:u_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ne(new mr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},gl=class extends Rn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,g=null,_=typeof XRWebGLBinding<"u",m=new ml,p={},E=e.getContextAttributes(),A=null,y=null,T=[],w=[],b=new Dt,R=null,x=new Ne;x.viewport=new ie;let v=new Ne;v.viewport=new ie;let I=[x,v],L=new Eo,U=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let J=T[q];return J===void 0&&(J=new bs,T[q]=J),J.getTargetRaySpace()},this.getControllerGrip=function(q){let J=T[q];return J===void 0&&(J=new bs,T[q]=J),J.getGripSpace()},this.getHand=function(q){let J=T[q];return J===void 0&&(J=new bs,T[q]=J),J.getHandSpace()};function H(q){let J=w.indexOf(q.inputSource);if(J===-1)return;let mt=T[J];mt!==void 0&&(mt.update(q.inputSource,q.frame,l||o),mt.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",j);for(let q=0;q<T.length;q++){let J=w[q];J!==null&&(w[q]=null,T[q].disconnect(J))}U=null,B=null,m.reset();for(let q in p)delete p[q];t.setRenderTarget(A),f=null,h=null,d=null,s=null,y=null,Bt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",W),s.addEventListener("inputsourceschange",j),E.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(b),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,wt=null,Mt=null;E.depth&&(Mt=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=E.stencil?Ps:gs,wt=E.stencil?Is:mi);let Zt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Zt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new pn(h.textureWidth,h.textureHeight,{format:Ke,type:bn,depthTexture:new dr(h.textureWidth,h.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let mt={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new pn(f.framebufferWidth,f.framebufferHeight,{format:Ke,type:bn,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Bt.setContext(s),Bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(q){for(let J=0;J<q.removed.length;J++){let mt=q.removed[J],wt=w.indexOf(mt);wt>=0&&(w[wt]=null,T[wt].disconnect(mt))}for(let J=0;J<q.added.length;J++){let mt=q.added[J],wt=w.indexOf(mt);if(wt===-1){for(let Zt=0;Zt<T.length;Zt++)if(Zt>=w.length){w.push(mt),wt=Zt;break}else if(w[Zt]===null){w[Zt]=mt,wt=Zt;break}if(wt===-1)break}let Mt=T[wt];Mt&&Mt.connect(mt)}}let z=new N,Q=new N;function ct(q,J,mt){z.setFromMatrixPosition(J.matrixWorld),Q.setFromMatrixPosition(mt.matrixWorld);let wt=z.distanceTo(Q),Mt=J.projectionMatrix.elements,Zt=mt.projectionMatrix.elements,Oe=Mt[14]/(Mt[10]-1),P=Mt[14]/(Mt[10]+1),pe=(Mt[9]+1)/Mt[5],Ht=(Mt[9]-1)/Mt[5],Ft=(Mt[8]-1)/Mt[0],bt=(Zt[8]+1)/Zt[0],me=Oe*Ft,St=Oe*bt,Wt=wt/(-Ft+bt),Ie=Wt*-Ft;if(J.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ie),q.translateZ(Wt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Mt[10]===-1)q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let ye=Oe+Wt,C=P+Wt,M=me-Ie,k=St+(wt-Ie),Y=pe*P/C*ye,tt=Ht*P/C*ye;q.projectionMatrix.makePerspective(M,k,Y,tt,ye,C),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function lt(q,J){J===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(J.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let J=q.near,mt=q.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(mt=m.depthFar)),L.near=v.near=x.near=J,L.far=v.far=x.far=mt,(U!==L.near||B!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),U=L.near,B=L.far),L.layers.mask=q.layers.mask|6,x.layers.mask=L.layers.mask&3,v.layers.mask=L.layers.mask&5;let wt=q.parent,Mt=L.cameras;lt(L,wt);for(let Zt=0;Zt<Mt.length;Zt++)lt(Mt[Zt],wt);Mt.length===2?ct(L,x,v):L.projectionMatrix.copy(x.projectionMatrix),Z(q,L,wt)};function Z(q,J,mt){mt===null?q.matrix.copy(J.matrixWorld):(q.matrix.copy(mt.matrixWorld),q.matrix.invert(),q.matrix.multiply(J.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=xs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(q){return p[q]};let It=null;function vt(q,J){if(u=J.getViewerPose(l||o),g=J,u!==null){let mt=u.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let wt=!1;mt.length!==L.cameras.length&&(L.cameras.length=0,wt=!0);for(let P=0;P<mt.length;P++){let pe=mt[P],Ht=null;if(f!==null)Ht=f.getViewport(pe);else{let bt=d.getViewSubImage(h,pe);Ht=bt.viewport,P===0&&(t.setRenderTargetTextures(y,bt.colorTexture,bt.depthStencilTexture),t.setRenderTarget(y))}let Ft=I[P];Ft===void 0&&(Ft=new Ne,Ft.layers.enable(P),Ft.viewport=new ie,I[P]=Ft),Ft.matrix.fromArray(pe.transform.matrix),Ft.matrix.decompose(Ft.position,Ft.quaternion,Ft.scale),Ft.projectionMatrix.fromArray(pe.projectionMatrix),Ft.projectionMatrixInverse.copy(Ft.projectionMatrix).invert(),Ft.viewport.set(Ht.x,Ht.y,Ht.width,Ht.height),P===0&&(L.matrix.copy(Ft.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),wt===!0&&L.cameras.push(Ft)}let Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let P=d.getDepthInformation(mt[0]);P&&P.isValid&&P.texture&&m.init(P,s.renderState)}if(Mt&&Mt.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let P=0;P<mt.length;P++){let pe=mt[P].camera;if(pe){let Ht=p[pe];Ht||(Ht=new fr,p[pe]=Ht);let Ft=d.getCameraImage(pe);Ht.sourceTexture=Ft}}}}for(let mt=0;mt<T.length;mt++){let wt=w[mt],Mt=T[mt];wt!==null&&Mt!==void 0&&Mt.update(wt,J,l||o)}It&&It(q,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}let Bt=new nd;Bt.setAnimationLoop(vt),this.setAnimationLoop=function(q){It=q},this.dispose=function(){}}},Gi=new mn,d_=new re;function f_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Qc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,A,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,E,A):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===we&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===we&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let E=t.get(p),A=E.envMap,y=E.envMapRotation;A&&(m.envMap.value=A,Gi.copy(y),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),m.envMapRotation.value.setFromMatrix4(d_.makeRotationFromEuler(Gi)),m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,E,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=A*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===we&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function p_(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,A){let y=A.program;n.uniformBlockBinding(E,y)}function l(E,A){let y=s[E.id];y===void 0&&(g(E),y=u(E),s[E.id]=y,E.addEventListener("dispose",m));let T=A.program;n.updateUBOMapping(E,T);let w=t.render.frame;r[E.id]!==w&&(h(E),r[E.id]=w)}function u(E){let A=d();E.__bindingPointIndex=A;let y=i.createBuffer(),T=E.__size,w=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,T,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,y),y}function d(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){let A=s[E.id],y=E.uniforms,T=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let w=0,b=y.length;w<b;w++){let R=Array.isArray(y[w])?y[w]:[y[w]];for(let x=0,v=R.length;x<v;x++){let I=R[x];if(f(I,w,x,T)===!0){let L=I.__offset,U=Array.isArray(I.value)?I.value:[I.value],B=0;for(let H=0;H<U.length;H++){let W=U[H],j=_(W);typeof W=="number"||typeof W=="boolean"?(I.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,L+B,I.__data)):W.isMatrix3?(I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0):(W.toArray(I.__data,B),B+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,A,y,T){let w=E.value,b=A+"_"+y;if(T[b]===void 0)return typeof w=="number"||typeof w=="boolean"?T[b]=w:T[b]=w.clone(),!0;{let R=T[b];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return T[b]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function g(E){let A=E.uniforms,y=0,T=16;for(let b=0,R=A.length;b<R;b++){let x=Array.isArray(A[b])?A[b]:[A[b]];for(let v=0,I=x.length;v<I;v++){let L=x[v],U=Array.isArray(L.value)?L.value:[L.value];for(let B=0,H=U.length;B<H;B++){let W=U[B],j=_(W),z=y%T,Q=z%j.boundary,ct=z+Q;y+=Q,ct!==0&&T-ct<j.storage&&(y+=T-ct),L.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=y,y+=j.storage}}}let w=y%T;return w>0&&(y+=T-w),E.__size=y,E.__cache={},this}function _(E){let A={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(A.boundary=4,A.storage=4):E.isVector2?(A.boundary=8,A.storage=8):E.isVector3||E.isColor?(A.boundary=16,A.storage=12):E.isVector4?(A.boundary=16,A.storage=16):E.isMatrix3?(A.boundary=48,A.storage=48):E.isMatrix4?(A.boundary=64,A.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),A}function m(E){let A=E.target;A.removeEventListener("dispose",m);let y=o.indexOf(A.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function p(){for(let E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Ta=class{constructor(t={}){let{canvas:e=Ru(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,E=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Mn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,T=!1;this._outputColorSpace=Le;let w=0,b=0,R=null,x=-1,v=null,I=new ie,L=new ie,U=null,B=new kt(0),H=0,W=e.width,j=e.height,z=1,Q=null,ct=null,lt=new ie(0,0,W,j),Z=new ie(0,0,W,j),It=!1,vt=new Ss,Bt=!1,q=!1,J=new re,mt=new N,wt=new ie,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Zt=!1;function Oe(){return R===null?z:1}let P=n;function pe(S,F){return e.getContext(S,F)}try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",_t,!1),e.addEventListener("webglcontextcreationerror",et,!1),P===null){let F="webgl2";if(P=pe(F,S),P===null)throw pe(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Ht,Ft,bt,me,St,Wt,Ie,ye,C,M,k,Y,tt,X,Ct,rt,Tt,At,it,pt,Nt,Rt,dt,Gt;function D(){Ht=new Lg(P),Ht.init(),Rt=new l_(P,Ht),Ft=new Tg(P,Ht,t,Rt),bt=new a_(P,Ht),Ft.reversedDepthBuffer&&h&&bt.buffers.depth.setReversed(!0),me=new Ng(P),St=new Z0,Wt=new c_(P,Ht,bt,St,Ft,Rt,me),Ie=new Ag(y),ye=new Pg(y),C=new Hf(P),dt=new Sg(P,C),M=new Dg(P,C,me,dt),k=new Og(P,M,C,me),it=new Fg(P,Ft,Wt),rt=new Eg(St),Y=new Y0(y,Ie,ye,Ht,Ft,dt,rt),tt=new f_(y,St),X=new K0,Ct=new n_(Ht),At=new bg(y,Ie,ye,bt,k,f,c),Tt=new r_(y,k,Ft),Gt=new p_(P,me,Ft,bt),pt=new wg(P,Ht,me),Nt=new Ug(P,Ht,me),me.programs=Y.programs,y.capabilities=Ft,y.extensions=Ht,y.properties=St,y.renderLists=X,y.shadowMap=Tt,y.state=bt,y.info=me}D();let st=new gl(y,P);this.xr=st,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let S=Ht.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Ht.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(S){S!==void 0&&(z=S,this.setSize(W,j,!1))},this.getSize=function(S){return S.set(W,j)},this.setSize=function(S,F,V=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,j=F,e.width=Math.floor(S*z),e.height=Math.floor(F*z),V===!0&&(e.style.width=S+"px",e.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(W*z,j*z).floor()},this.setDrawingBufferSize=function(S,F,V){W=S,j=F,z=V,e.width=Math.floor(S*V),e.height=Math.floor(F*V),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(I)},this.getViewport=function(S){return S.copy(lt)},this.setViewport=function(S,F,V,G){S.isVector4?lt.set(S.x,S.y,S.z,S.w):lt.set(S,F,V,G),bt.viewport(I.copy(lt).multiplyScalar(z).round())},this.getScissor=function(S){return S.copy(Z)},this.setScissor=function(S,F,V,G){S.isVector4?Z.set(S.x,S.y,S.z,S.w):Z.set(S,F,V,G),bt.scissor(L.copy(Z).multiplyScalar(z).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(S){bt.setScissorTest(It=S)},this.setOpaqueSort=function(S){Q=S},this.setTransparentSort=function(S){ct=S},this.getClearColor=function(S){return S.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor(...arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,V=!0){let G=0;if(S){let O=!1;if(R!==null){let nt=R.texture.format;O=nt===qo||nt===Xo||nt===Wo}if(O){let nt=R.texture.type,ft=nt===bn||nt===mi||nt===Rs||nt===Is||nt===Ho||nt===Vo,xt=At.getClearColor(),gt=At.getClearAlpha(),Ut=xt.r,Ot=xt.g,Pt=xt.b;ft?(g[0]=Ut,g[1]=Ot,g[2]=Pt,g[3]=gt,P.clearBufferuiv(P.COLOR,0,g)):(_[0]=Ut,_[1]=Ot,_[2]=Pt,_[3]=gt,P.clearBufferiv(P.COLOR,0,_))}else G|=P.COLOR_BUFFER_BIT}F&&(G|=P.DEPTH_BUFFER_BIT),V&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",_t,!1),e.removeEventListener("webglcontextcreationerror",et,!1),At.dispose(),X.dispose(),Ct.dispose(),St.dispose(),Ie.dispose(),ye.dispose(),k.dispose(),dt.dispose(),Gt.dispose(),Y.dispose(),st.dispose(),st.removeEventListener("sessionstart",En),st.removeEventListener("sessionend",nh),_i.stop()};function ht(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function _t(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let S=me.autoReset,F=Tt.enabled,V=Tt.autoUpdate,G=Tt.needsUpdate,O=Tt.type;D(),me.autoReset=S,Tt.enabled=F,Tt.autoUpdate=V,Tt.needsUpdate=G,Tt.type=O}function et(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function K(S){let F=S.target;F.removeEventListener("dispose",K),yt(F)}function yt(S){zt(S),St.remove(S)}function zt(S){let F=St.get(S).programs;F!==void 0&&(F.forEach(function(V){Y.releaseProgram(V)}),S.isShaderMaterial&&Y.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,V,G,O,nt){F===null&&(F=Mt);let ft=O.isMesh&&O.matrixWorld.determinant()<0,xt=Bd(S,F,V,G,O);bt.setMaterial(G,ft);let gt=V.index,Ut=1;if(G.wireframe===!0){if(gt=M.getWireframeAttribute(V),gt===void 0)return;Ut=2}let Ot=V.drawRange,Pt=V.attributes.position,$t=Ot.start*Ut,oe=(Ot.start+Ot.count)*Ut;nt!==null&&($t=Math.max($t,nt.start*Ut),oe=Math.min(oe,(nt.start+nt.count)*Ut)),gt!==null?($t=Math.max($t,0),oe=Math.min(oe,gt.count)):Pt!=null&&($t=Math.max($t,0),oe=Math.min(oe,Pt.count));let xe=oe-$t;if(xe<0||xe===1/0)return;dt.setup(O,G,xt,V,gt);let fe,ce=pt;if(gt!==null&&(fe=C.get(gt),ce=Nt,ce.setIndex(fe)),O.isMesh)G.wireframe===!0?(bt.setLineWidth(G.wireframeLinewidth*Oe()),ce.setMode(P.LINES)):ce.setMode(P.TRIANGLES);else if(O.isLine){let Lt=G.linewidth;Lt===void 0&&(Lt=1),bt.setLineWidth(Lt*Oe()),O.isLineSegments?ce.setMode(P.LINES):O.isLineLoop?ce.setMode(P.LINE_LOOP):ce.setMode(P.LINE_STRIP)}else O.isPoints?ce.setMode(P.POINTS):O.isSprite&&ce.setMode(P.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ys("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ce.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Ht.get("WEBGL_multi_draw"))ce.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let Lt=O._multiDrawStarts,ge=O._multiDrawCounts,Jt=O._multiDrawCount,Qe=gt?C.get(gt).bytesPerElement:1,Zi=St.get(G).currentProgram.getUniforms();for(let tn=0;tn<Jt;tn++)Zi.setValue(P,"_gl_DrawID",tn),ce.render(Lt[tn]/Qe,ge[tn])}else if(O.isInstancedMesh)ce.renderInstances($t,xe,O.count);else if(V.isInstancedBufferGeometry){let Lt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,ge=Math.min(V.instanceCount,Lt);ce.renderInstances($t,xe,ge)}else ce.render($t,xe)};function he(S,F,V){S.transparent===!0&&S.side===$e&&S.forceSinglePass===!1?(S.side=we,S.needsUpdate=!0,Fr(S,F,V),S.side=rn,S.needsUpdate=!0,Fr(S,F,V),S.side=$e):Fr(S,F,V)}this.compile=function(S,F,V=null){V===null&&(V=S),p=Ct.get(V),p.init(F),A.push(p),V.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),S!==V&&S.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();let G=new Set;return S.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let nt=O.material;if(nt)if(Array.isArray(nt))for(let ft=0;ft<nt.length;ft++){let xt=nt[ft];he(xt,V,O),G.add(xt)}else he(nt,V,O),G.add(nt)}),p=A.pop(),G},this.compileAsync=function(S,F,V=null){let G=this.compile(S,F,V);return new Promise(O=>{function nt(){if(G.forEach(function(ft){St.get(ft).currentProgram.isReady()&&G.delete(ft)}),G.size===0){O(S);return}setTimeout(nt,10)}Ht.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let te=null;function On(S){te&&te(S)}function En(){_i.stop()}function nh(){_i.start()}let _i=new nd;_i.setAnimationLoop(On),typeof self<"u"&&_i.setContext(self),this.setAnimationLoop=function(S){te=S,st.setAnimationLoop(S),S===null?_i.stop():_i.start()},st.addEventListener("sessionstart",En),st.addEventListener("sessionend",nh),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(F),F=st.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,F,R),p=Ct.get(S,A.length),p.init(F),A.push(p),J.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),vt.setFromProjectionMatrix(J,yn,F.reversedDepth),q=this.localClippingEnabled,Bt=rt.init(this.clippingPlanes,q),m=X.get(S,E.length),m.init(),E.push(m),st.enabled===!0&&st.isPresenting===!0){let nt=y.xr.getDepthSensingMesh();nt!==null&&Ya(nt,F,-1/0,y.sortObjects)}Ya(S,F,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(Q,ct),Zt=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,Zt&&At.addToRenderList(m,S),this.info.render.frame++,Bt===!0&&rt.beginShadows();let V=p.state.shadowsArray;Tt.render(V,S,F),Bt===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=m.opaque,O=m.transmissive;if(p.setupLights(),F.isArrayCamera){let nt=F.cameras;if(O.length>0)for(let ft=0,xt=nt.length;ft<xt;ft++){let gt=nt[ft];sh(G,O,S,gt)}Zt&&At.render(S);for(let ft=0,xt=nt.length;ft<xt;ft++){let gt=nt[ft];ih(m,S,gt,gt.viewport)}}else O.length>0&&sh(G,O,S,F),Zt&&At.render(S),ih(m,S,F);R!==null&&b===0&&(Wt.updateMultisampleRenderTarget(R),Wt.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(y,S,F),dt.resetDefaultState(),x=-1,v=null,A.pop(),A.length>0?(p=A[A.length-1],Bt===!0&&rt.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Ya(S,F,V,G){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||vt.intersectsSprite(S)){G&&wt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(J);let ft=k.update(S),xt=S.material;xt.visible&&m.push(S,ft,xt,V,wt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||vt.intersectsObject(S))){let ft=k.update(S),xt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),wt.copy(S.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),wt.copy(ft.boundingSphere.center)),wt.applyMatrix4(S.matrixWorld).applyMatrix4(J)),Array.isArray(xt)){let gt=ft.groups;for(let Ut=0,Ot=gt.length;Ut<Ot;Ut++){let Pt=gt[Ut],$t=xt[Pt.materialIndex];$t&&$t.visible&&m.push(S,ft,$t,V,wt.z,Pt)}}else xt.visible&&m.push(S,ft,xt,V,wt.z,null)}}let nt=S.children;for(let ft=0,xt=nt.length;ft<xt;ft++)Ya(nt[ft],F,V,G)}function ih(S,F,V,G){let O=S.opaque,nt=S.transmissive,ft=S.transparent;p.setupLightsView(V),Bt===!0&&rt.setGlobalState(y.clippingPlanes,V),G&&bt.viewport(I.copy(G)),O.length>0&&Nr(O,F,V),nt.length>0&&Nr(nt,F,V),ft.length>0&&Nr(ft,F,V),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function sh(S,F,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new pn(1,1,{generateMipmaps:!0,type:Ht.has("EXT_color_buffer_half_float")||Ht.has("EXT_color_buffer_float")?Cs:bn,minFilter:Dn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));let nt=p.state.transmissionRenderTarget[G.id],ft=G.viewport||I;nt.setSize(ft.z*y.transmissionResolutionScale,ft.w*y.transmissionResolutionScale);let xt=y.getRenderTarget(),gt=y.getActiveCubeFace(),Ut=y.getActiveMipmapLevel();y.setRenderTarget(nt),y.getClearColor(B),H=y.getClearAlpha(),H<1&&y.setClearColor(16777215,.5),y.clear(),Zt&&At.render(V);let Ot=y.toneMapping;y.toneMapping=Mn;let Pt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),Bt===!0&&rt.setGlobalState(y.clippingPlanes,G),Nr(S,V,G),Wt.updateMultisampleRenderTarget(nt),Wt.updateRenderTargetMipmap(nt),Ht.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let oe=0,xe=F.length;oe<xe;oe++){let fe=F[oe],ce=fe.object,Lt=fe.geometry,ge=fe.material,Jt=fe.group;if(ge.side===$e&&ce.layers.test(G.layers)){let Qe=ge.side;ge.side=we,ge.needsUpdate=!0,rh(ce,V,G,Lt,ge,Jt),ge.side=Qe,ge.needsUpdate=!0,$t=!0}}$t===!0&&(Wt.updateMultisampleRenderTarget(nt),Wt.updateRenderTargetMipmap(nt))}y.setRenderTarget(xt,gt,Ut),y.setClearColor(B,H),Pt!==void 0&&(G.viewport=Pt),y.toneMapping=Ot}function Nr(S,F,V){let G=F.isScene===!0?F.overrideMaterial:null;for(let O=0,nt=S.length;O<nt;O++){let ft=S[O],xt=ft.object,gt=ft.geometry,Ut=ft.group,Ot=ft.material;Ot.allowOverride===!0&&G!==null&&(Ot=G),xt.layers.test(V.layers)&&rh(xt,F,V,gt,Ot,Ut)}}function rh(S,F,V,G,O,nt){S.onBeforeRender(y,F,V,G,O,nt),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(y,F,V,G,S,nt),O.transparent===!0&&O.side===$e&&O.forceSinglePass===!1?(O.side=we,O.needsUpdate=!0,y.renderBufferDirect(V,F,G,O,S,nt),O.side=rn,O.needsUpdate=!0,y.renderBufferDirect(V,F,G,O,S,nt),O.side=$e):y.renderBufferDirect(V,F,G,O,S,nt),S.onAfterRender(y,F,V,G,O,nt)}function Fr(S,F,V){F.isScene!==!0&&(F=Mt);let G=St.get(S),O=p.state.lights,nt=p.state.shadowsArray,ft=O.state.version,xt=Y.getParameters(S,O.state,nt,F,V),gt=Y.getProgramCacheKey(xt),Ut=G.programs;G.environment=S.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(S.isMeshStandardMaterial?ye:Ie).get(S.envMap||G.environment),G.envMapRotation=G.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Ut===void 0&&(S.addEventListener("dispose",K),Ut=new Map,G.programs=Ut);let Ot=Ut.get(gt);if(Ot!==void 0){if(G.currentProgram===Ot&&G.lightsStateVersion===ft)return ah(S,xt),Ot}else xt.uniforms=Y.getUniforms(S),S.onBeforeCompile(xt,y),Ot=Y.acquireProgram(xt,gt),Ut.set(gt,Ot),G.uniforms=xt.uniforms;let Pt=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Pt.clippingPlanes=rt.uniform),ah(S,xt),G.needsLights=zd(S),G.lightsStateVersion=ft,G.needsLights&&(Pt.ambientLightColor.value=O.state.ambient,Pt.lightProbe.value=O.state.probe,Pt.directionalLights.value=O.state.directional,Pt.directionalLightShadows.value=O.state.directionalShadow,Pt.spotLights.value=O.state.spot,Pt.spotLightShadows.value=O.state.spotShadow,Pt.rectAreaLights.value=O.state.rectArea,Pt.ltc_1.value=O.state.rectAreaLTC1,Pt.ltc_2.value=O.state.rectAreaLTC2,Pt.pointLights.value=O.state.point,Pt.pointLightShadows.value=O.state.pointShadow,Pt.hemisphereLights.value=O.state.hemi,Pt.directionalShadowMap.value=O.state.directionalShadowMap,Pt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Pt.spotShadowMap.value=O.state.spotShadowMap,Pt.spotLightMatrix.value=O.state.spotLightMatrix,Pt.spotLightMap.value=O.state.spotLightMap,Pt.pointShadowMap.value=O.state.pointShadowMap,Pt.pointShadowMatrix.value=O.state.pointShadowMatrix),G.currentProgram=Ot,G.uniformsList=null,Ot}function oh(S){if(S.uniformsList===null){let F=S.currentProgram.getUniforms();S.uniformsList=Ns.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function ah(S,F){let V=St.get(S);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function Bd(S,F,V,G,O){F.isScene!==!0&&(F=Mt),Wt.resetTextureUnits();let nt=F.fog,ft=G.isMeshStandardMaterial?F.environment:null,xt=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ci,gt=(G.isMeshStandardMaterial?ye:Ie).get(G.envMap||ft),Ut=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ot=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Pt=!!V.morphAttributes.position,$t=!!V.morphAttributes.normal,oe=!!V.morphAttributes.color,xe=Mn;G.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(xe=y.toneMapping);let fe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ce=fe!==void 0?fe.length:0,Lt=St.get(G),ge=p.state.lights;if(Bt===!0&&(q===!0||S!==v)){let Ge=S===v&&G.id===x;rt.setState(G,S,Ge)}let Jt=!1;G.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==ge.state.version||Lt.outputColorSpace!==xt||O.isBatchedMesh&&Lt.batching===!1||!O.isBatchedMesh&&Lt.batching===!0||O.isBatchedMesh&&Lt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Lt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Lt.instancing===!1||!O.isInstancedMesh&&Lt.instancing===!0||O.isSkinnedMesh&&Lt.skinning===!1||!O.isSkinnedMesh&&Lt.skinning===!0||O.isInstancedMesh&&Lt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Lt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Lt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Lt.instancingMorph===!1&&O.morphTexture!==null||Lt.envMap!==gt||G.fog===!0&&Lt.fog!==nt||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==rt.numPlanes||Lt.numIntersection!==rt.numIntersection)||Lt.vertexAlphas!==Ut||Lt.vertexTangents!==Ot||Lt.morphTargets!==Pt||Lt.morphNormals!==$t||Lt.morphColors!==oe||Lt.toneMapping!==xe||Lt.morphTargetsCount!==ce)&&(Jt=!0):(Jt=!0,Lt.__version=G.version);let Qe=Lt.currentProgram;Jt===!0&&(Qe=Fr(G,F,O));let Zi=!1,tn=!1,Ws=!1,_e=Qe.getUniforms(),hn=Lt.uniforms;if(bt.useProgram(Qe.program)&&(Zi=!0,tn=!0,Ws=!0),G.id!==x&&(x=G.id,tn=!0),Zi||v!==S){bt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),_e.setValue(P,"projectionMatrix",S.projectionMatrix),_e.setValue(P,"viewMatrix",S.matrixWorldInverse);let qe=_e.map.cameraPosition;qe!==void 0&&qe.setValue(P,mt.setFromMatrixPosition(S.matrixWorld)),Ft.logarithmicDepthBuffer&&_e.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&_e.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),v!==S&&(v=S,tn=!0,Ws=!0)}if(O.isSkinnedMesh){_e.setOptional(P,O,"bindMatrix"),_e.setOptional(P,O,"bindMatrixInverse");let Ge=O.skeleton;Ge&&(Ge.boneTexture===null&&Ge.computeBoneTexture(),_e.setValue(P,"boneTexture",Ge.boneTexture,Wt))}O.isBatchedMesh&&(_e.setOptional(P,O,"batchingTexture"),_e.setValue(P,"batchingTexture",O._matricesTexture,Wt),_e.setOptional(P,O,"batchingIdTexture"),_e.setValue(P,"batchingIdTexture",O._indirectTexture,Wt),_e.setOptional(P,O,"batchingColorTexture"),O._colorsTexture!==null&&_e.setValue(P,"batchingColorTexture",O._colorsTexture,Wt));let un=V.morphAttributes;if((un.position!==void 0||un.normal!==void 0||un.color!==void 0)&&it.update(O,V,Qe),(tn||Lt.receiveShadow!==O.receiveShadow)&&(Lt.receiveShadow=O.receiveShadow,_e.setValue(P,"receiveShadow",O.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(hn.envMap.value=gt,hn.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(hn.envMapIntensity.value=F.environmentIntensity),tn&&(_e.setValue(P,"toneMappingExposure",y.toneMappingExposure),Lt.needsLights&&kd(hn,Ws),nt&&G.fog===!0&&tt.refreshFogUniforms(hn,nt),tt.refreshMaterialUniforms(hn,G,z,j,p.state.transmissionRenderTarget[S.id]),Ns.upload(P,oh(Lt),hn,Wt)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ns.upload(P,oh(Lt),hn,Wt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&_e.setValue(P,"center",O.center),_e.setValue(P,"modelViewMatrix",O.modelViewMatrix),_e.setValue(P,"normalMatrix",O.normalMatrix),_e.setValue(P,"modelMatrix",O.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Ge=G.uniformsGroups;for(let qe=0,Za=Ge.length;qe<Za;qe++){let xi=Ge[qe];Gt.update(xi,Qe),Gt.bind(xi,Qe)}}return Qe}function kd(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function zd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,F,V){let G=St.get(S);G.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),St.get(S.texture).__webglTexture=F,St.get(S.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){let V=St.get(S);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0};let Hd=P.createFramebuffer();this.setRenderTarget=function(S,F=0,V=0){R=S,w=F,b=V;let G=!0,O=null,nt=!1,ft=!1;if(S){let gt=St.get(S);if(gt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(P.FRAMEBUFFER,null),G=!1;else if(gt.__webglFramebuffer===void 0)Wt.setupRenderTarget(S);else if(gt.__hasExternalTextures)Wt.rebindTextures(S,St.get(S.texture).__webglTexture,St.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Pt=S.depthTexture;if(gt.__boundDepthTexture!==Pt){if(Pt!==null&&St.has(Pt)&&(S.width!==Pt.image.width||S.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Wt.setupDepthRenderbuffer(S)}}let Ut=S.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(ft=!0);let Ot=St.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ot[F])?O=Ot[F][V]:O=Ot[F],nt=!0):S.samples>0&&Wt.useMultisampledRTT(S)===!1?O=St.get(S).__webglMultisampledFramebuffer:Array.isArray(Ot)?O=Ot[V]:O=Ot,I.copy(S.viewport),L.copy(S.scissor),U=S.scissorTest}else I.copy(lt).multiplyScalar(z).floor(),L.copy(Z).multiplyScalar(z).floor(),U=It;if(V!==0&&(O=Hd),bt.bindFramebuffer(P.FRAMEBUFFER,O)&&G&&bt.drawBuffers(S,O),bt.viewport(I),bt.scissor(L),bt.setScissorTest(U),nt){let gt=St.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,gt.__webglTexture,V)}else if(ft){let gt=F;for(let Ut=0;Ut<S.textures.length;Ut++){let Ot=St.get(S.textures[Ut]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ut,Ot.__webglTexture,V,gt)}}else if(S!==null&&V!==0){let gt=St.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,gt.__webglTexture,V)}x=-1},this.readRenderTargetPixels=function(S,F,V,G,O,nt,ft,xt=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=St.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ft!==void 0&&(gt=gt[ft]),gt){bt.bindFramebuffer(P.FRAMEBUFFER,gt);try{let Ut=S.textures[xt],Ot=Ut.format,Pt=Ut.type;if(!Ft.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ft.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-G&&V>=0&&V<=S.height-O&&(S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+xt),P.readPixels(F,V,G,O,Rt.convert(Ot),Rt.convert(Pt),nt))}finally{let Ut=R!==null?St.get(R).__webglFramebuffer:null;bt.bindFramebuffer(P.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(S,F,V,G,O,nt,ft,xt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=St.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ft!==void 0&&(gt=gt[ft]),gt)if(F>=0&&F<=S.width-G&&V>=0&&V<=S.height-O){bt.bindFramebuffer(P.FRAMEBUFFER,gt);let Ut=S.textures[xt],Ot=Ut.format,Pt=Ut.type;if(!Ft.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ft.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let $t=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,$t),P.bufferData(P.PIXEL_PACK_BUFFER,nt.byteLength,P.STREAM_READ),S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+xt),P.readPixels(F,V,G,O,Rt.convert(Ot),Rt.convert(Pt),0);let oe=R!==null?St.get(R).__webglFramebuffer:null;bt.bindFramebuffer(P.FRAMEBUFFER,oe);let xe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Cu(P,xe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,$t),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,nt),P.deleteBuffer($t),P.deleteSync(xe),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,V=0){let G=Math.pow(2,-V),O=Math.floor(S.image.width*G),nt=Math.floor(S.image.height*G),ft=F!==null?F.x:0,xt=F!==null?F.y:0;Wt.setTexture2D(S,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,ft,xt,O,nt),bt.unbindTexture()};let Vd=P.createFramebuffer(),Gd=P.createFramebuffer();this.copyTextureToTexture=function(S,F,V=null,G=null,O=0,nt=null){nt===null&&(O!==0?(ys("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),nt=O,O=0):nt=0);let ft,xt,gt,Ut,Ot,Pt,$t,oe,xe,fe=S.isCompressedTexture?S.mipmaps[nt]:S.image;if(V!==null)ft=V.max.x-V.min.x,xt=V.max.y-V.min.y,gt=V.isBox3?V.max.z-V.min.z:1,Ut=V.min.x,Ot=V.min.y,Pt=V.isBox3?V.min.z:0;else{let un=Math.pow(2,-O);ft=Math.floor(fe.width*un),xt=Math.floor(fe.height*un),S.isDataArrayTexture?gt=fe.depth:S.isData3DTexture?gt=Math.floor(fe.depth*un):gt=1,Ut=0,Ot=0,Pt=0}G!==null?($t=G.x,oe=G.y,xe=G.z):($t=0,oe=0,xe=0);let ce=Rt.convert(F.format),Lt=Rt.convert(F.type),ge;F.isData3DTexture?(Wt.setTexture3D(F,0),ge=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Wt.setTexture2DArray(F,0),ge=P.TEXTURE_2D_ARRAY):(Wt.setTexture2D(F,0),ge=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);let Jt=P.getParameter(P.UNPACK_ROW_LENGTH),Qe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Zi=P.getParameter(P.UNPACK_SKIP_PIXELS),tn=P.getParameter(P.UNPACK_SKIP_ROWS),Ws=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,fe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,fe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ut),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ot),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Pt);let _e=S.isDataArrayTexture||S.isData3DTexture,hn=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){let un=St.get(S),Ge=St.get(F),qe=St.get(un.__renderTarget),Za=St.get(Ge.__renderTarget);bt.bindFramebuffer(P.READ_FRAMEBUFFER,qe.__webglFramebuffer),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Za.__webglFramebuffer);for(let xi=0;xi<gt;xi++)_e&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,St.get(S).__webglTexture,O,Pt+xi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,St.get(F).__webglTexture,nt,xe+xi)),P.blitFramebuffer(Ut,Ot,ft,xt,$t,oe,ft,xt,P.DEPTH_BUFFER_BIT,P.NEAREST);bt.bindFramebuffer(P.READ_FRAMEBUFFER,null),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(O!==0||S.isRenderTargetTexture||St.has(S)){let un=St.get(S),Ge=St.get(F);bt.bindFramebuffer(P.READ_FRAMEBUFFER,Vd),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Gd);for(let qe=0;qe<gt;qe++)_e?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,un.__webglTexture,O,Pt+qe):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,un.__webglTexture,O),hn?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ge.__webglTexture,nt,xe+qe):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ge.__webglTexture,nt),O!==0?P.blitFramebuffer(Ut,Ot,ft,xt,$t,oe,ft,xt,P.COLOR_BUFFER_BIT,P.NEAREST):hn?P.copyTexSubImage3D(ge,nt,$t,oe,xe+qe,Ut,Ot,ft,xt):P.copyTexSubImage2D(ge,nt,$t,oe,Ut,Ot,ft,xt);bt.bindFramebuffer(P.READ_FRAMEBUFFER,null),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else hn?S.isDataTexture||S.isData3DTexture?P.texSubImage3D(ge,nt,$t,oe,xe,ft,xt,gt,ce,Lt,fe.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(ge,nt,$t,oe,xe,ft,xt,gt,ce,fe.data):P.texSubImage3D(ge,nt,$t,oe,xe,ft,xt,gt,ce,Lt,fe):S.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,nt,$t,oe,ft,xt,ce,Lt,fe.data):S.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,nt,$t,oe,fe.width,fe.height,ce,fe.data):P.texSubImage2D(P.TEXTURE_2D,nt,$t,oe,ft,xt,ce,Lt,fe);P.pixelStorei(P.UNPACK_ROW_LENGTH,Jt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Qe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Zi),P.pixelStorei(P.UNPACK_SKIP_ROWS,tn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ws),nt===0&&F.generateMipmaps&&P.generateMipmap(ge),bt.unbindTexture()},this.initRenderTarget=function(S){St.get(S).__webglFramebuffer===void 0&&Wt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Wt.setTextureCube(S,0):S.isData3DTexture?Wt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Wt.setTexture2DArray(S,0):Wt.setTexture2D(S,0),bt.unbindTexture()},this.resetState=function(){w=0,b=0,R=null,bt.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}};var cd={type:"change"},vl={type:"start"},hd={type:"end"},Aa=new Ii,ld=new fn,m_=Math.cos(70*zi.DEG2RAD),Ae=new N,Je=2*Math.PI,ae={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},yl=1e-6,Ra=class extends Mr{constructor(t,e=null){super(t,e),this.state=ae.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:fi.ROTATE,MIDDLE:fi.DOLLY,RIGHT:fi.PAN},this.touches={ONE:pi.ROTATE,TWO:pi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Ye,this._lastTargetPosition=new N,this._quat=new Ye().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Es,this._sphericalDelta=new Es,this._scale=1,this._panOffset=new N,this._rotateStart=new Dt,this._rotateEnd=new Dt,this._rotateDelta=new Dt,this._panStart=new Dt,this._panEnd=new Dt,this._panDelta=new Dt,this._dollyStart=new Dt,this._dollyEnd=new Dt,this._dollyDelta=new Dt,this._dollyDirection=new N,this._mouse=new Dt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=__.bind(this),this._onPointerDown=g_.bind(this),this._onPointerUp=x_.bind(this),this._onContextMenu=T_.bind(this),this._onMouseWheel=M_.bind(this),this._onKeyDown=b_.bind(this),this._onTouchStart=S_.bind(this),this._onTouchMove=w_.bind(this),this._onMouseDown=y_.bind(this),this._onMouseMove=v_.bind(this),this._interceptControlDown=E_.bind(this),this._interceptControlUp=A_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(cd),this.update(),this.state=ae.NONE}update(t=null){let e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===ae.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Je:n>Math.PI&&(n-=Je),s<-Math.PI?s+=Je:s>Math.PI&&(s-=Je),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ae.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Aa.origin.copy(this.object.position),Aa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Aa.direction))<m_?this.object.lookAt(this.target):(ld.setFromNormalAndCoplanarPoint(this.object.up,this.target),Aa.intersectPlane(ld,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>yl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>yl||this._lastTargetPosition.distanceToSquared(this.target)>yl?(this.dispatchEvent(cd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Je/60*this.autoRotateSpeed*t:Je/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Dt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function g_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function __(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function x_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(hd),this.state=ae.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function y_(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case fi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ae.DOLLY;break;case fi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ae.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ae.ROTATE}break;case fi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ae.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ae.PAN}break;default:this.state=ae.NONE}this.state!==ae.NONE&&this.dispatchEvent(vl)}function v_(i){switch(this.state){case ae.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ae.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ae.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function M_(i){this.enabled===!1||this.enableZoom===!1||this.state!==ae.NONE||(i.preventDefault(),this.dispatchEvent(vl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(hd))}function b_(i){this.enabled!==!1&&this._handleKeyDown(i)}function S_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case pi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ae.TOUCH_ROTATE;break;case pi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ae.TOUCH_PAN;break;default:this.state=ae.NONE}break;case 2:switch(this.touches.TWO){case pi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ae.TOUCH_DOLLY_PAN;break;case pi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ae.TOUCH_DOLLY_ROTATE;break;default:this.state=ae.NONE}break;default:this.state=ae.NONE}this.state!==ae.NONE&&this.dispatchEvent(vl)}function w_(i){switch(this._trackPointer(i),this.state){case ae.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ae.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ae.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ae.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ae.NONE}}function T_(i){this.enabled!==!1&&i.preventDefault()}function E_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function A_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Ca=class extends In{constructor(){super();let t=new hi;t.deleteAttribute("uv");let e=new Pn({side:we}),n=new Pn,s=new yr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ne(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new ur(t,n,6),a=new De;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new ne(t,Bs(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new ne(t,Bs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new ne(t,Bs(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new ne(t,Bs(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let h=new ne(t,Bs(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let f=new ne(t,Bs(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function Bs(i){return new Di({color:0,emissive:16777215,emissiveIntensity:i})}var ud={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},qi=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(t){return new wl(t)}),this.register(function(t){return new Tl(t)}),this.register(function(t){return new Cl(t)}),this.register(function(t){return new Il(t)}),this.register(function(t){return new Pl(t)}),this.register(function(t){return new Ll(t)}),this.register(function(t){return new El(t)}),this.register(function(t){return new Al(t)}),this.register(function(t){return new Rl(t)}),this.register(function(t){return new Dl(t)}),this.register(function(t){return new Ul(t)}),this.register(function(t){return new Nl(t)}),this.register(function(t){return new Fl(t)}),this.register(function(t){return new Ol(t)})}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}setTextureUtils(t){return this.textureUtils=t,this}parse(t,e,n,s){let r=new Sl,o=[];for(let a=0,c=this.pluginCallbacks.length;a<c;a++)o.push(this.pluginCallbacks[a](r));r.setPlugins(o),r.setTextureUtils(this.textureUtils),r.writeAsync(t,e,s).catch(n)}parseAsync(t,e){let n=this;return new Promise(function(s,r){n.parse(t,s,r,e)})}},Yt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Ml="KHR_mesh_quantization",cn={};cn[ze]=Yt.NEAREST;cn[ko]=Yt.NEAREST_MIPMAP_NEAREST;cn[ki]=Yt.NEAREST_MIPMAP_LINEAR;cn[on]=Yt.LINEAR;cn[As]=Yt.LINEAR_MIPMAP_NEAREST;cn[Dn]=Yt.LINEAR_MIPMAP_LINEAR;cn[An]=Yt.CLAMP_TO_EDGE;cn[ps]=Yt.REPEAT;cn[ms]=Yt.MIRRORED_REPEAT;var dd={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},R_=new kt,fd=12,C_=1179937895,I_=2,pd=8,P_=1313821514,L_=5130562;function Rr(i,t){return i.length===t.length&&i.every(function(e,n){return e===t[n]})}function D_(i){return new TextEncoder().encode(i).buffer}function U_(i){return Rr(i.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function N_(i,t,e){let n={min:new Array(i.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(i.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let s=t;s<t+e;s++)for(let r=0;r<i.itemSize;r++){let o;i.itemSize>4?o=i.array[s*i.itemSize+r]:(r===0?o=i.getX(s):r===1?o=i.getY(s):r===2?o=i.getZ(s):r===3&&(o=i.getW(s)),i.normalized===!0&&(o=zi.normalize(o,i.array))),n.min[r]=Math.min(n.min[r],o),n.max[r]=Math.max(n.max[r],o)}return n}function gd(i){return Math.ceil(i/4)*4}function bl(i,t=0){let e=gd(i.byteLength);if(e!==i.byteLength){let n=new Uint8Array(e);if(n.set(new Uint8Array(i)),t!==0)for(let s=i.byteLength;s<e;s++)n[s]=t;return n.buffer}return i}function md(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function F_(i,t){if(typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas){let e;return t==="image/jpeg"?e=.92:t==="image/webp"&&(e=.8),i.convertToBlob({type:t,quality:e})}else return new Promise(e=>i.toBlob(e,t))}var Sl=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r180"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(t){this.plugins=t}setTextureUtils(t){this.textureUtils=t}async writeAsync(t,e,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(t),await Promise.all(this.pending);let s=this,r=s.buffers,o=s.json;n=s.options;let a=s.extensionsUsed,c=s.extensionsRequired,l=new Blob(r,{type:"application/octet-stream"}),u=Object.keys(a),d=Object.keys(c);if(u.length>0&&(o.extensionsUsed=u),d.length>0&&(o.extensionsRequired=d),o.buffers&&o.buffers.length>0&&(o.buffers[0].byteLength=l.size),n.binary===!0){let h=new FileReader;h.readAsArrayBuffer(l),h.onloadend=function(){let f=bl(h.result),g=new DataView(new ArrayBuffer(pd));g.setUint32(0,f.byteLength,!0),g.setUint32(4,L_,!0);let _=bl(D_(JSON.stringify(o)),32),m=new DataView(new ArrayBuffer(pd));m.setUint32(0,_.byteLength,!0),m.setUint32(4,P_,!0);let p=new ArrayBuffer(fd),E=new DataView(p);E.setUint32(0,C_,!0),E.setUint32(4,I_,!0);let A=fd+m.byteLength+_.byteLength+g.byteLength+f.byteLength;E.setUint32(8,A,!0);let y=new Blob([p,m,_,g,f],{type:"application/octet-stream"}),T=new FileReader;T.readAsArrayBuffer(y),T.onloadend=function(){e(T.result)}}}else if(o.buffers&&o.buffers.length>0){let h=new FileReader;h.readAsDataURL(l),h.onloadend=function(){let f=h.result;o.buffers[0].uri=f,e(o)}}else e(o)}serializeUserData(t,e){if(Object.keys(t.userData).length===0)return;let n=this.options,s=this.extensionsUsed;try{let r=JSON.parse(JSON.stringify(t.userData));if(n.includeCustomExtensions&&r.gltfExtensions){e.extensions===void 0&&(e.extensions={});for(let o in r.gltfExtensions)e.extensions[o]=r.gltfExtensions[o],s[o]=!0;delete r.gltfExtensions}Object.keys(r).length>0&&(e.extras=r)}catch(r){console.warn("THREE.GLTFExporter: userData of '"+t.name+"' won't be serialized because of JSON.stringify error - "+r.message)}}getUID(t,e=!1){if(this.uids.has(t)===!1){let s=new Map;s.set(!0,this.uid++),s.set(!1,this.uid++),this.uids.set(t,s)}return this.uids.get(t).get(e)}isNormalizedNormalAttribute(t){if(this.cache.attributesNormalized.has(t))return!1;let n=new N;for(let s=0,r=t.count;s<r;s++)if(Math.abs(n.fromBufferAttribute(t,s).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(t){let e=this.cache;if(e.attributesNormalized.has(t))return e.attributesNormalized.get(t);let n=t.clone(),s=new N;for(let r=0,o=n.count;r<o;r++)s.fromBufferAttribute(n,r),s.x===0&&s.y===0&&s.z===0?s.setX(1):s.normalize(),n.setXYZ(r,s.x,s.y,s.z);return e.attributesNormalized.set(t,n),n}applyTextureTransform(t,e){let n=!1,s={};(e.offset.x!==0||e.offset.y!==0)&&(s.offset=e.offset.toArray(),n=!0),e.rotation!==0&&(s.rotation=e.rotation,n=!0),(e.repeat.x!==1||e.repeat.y!==1)&&(s.scale=e.repeat.toArray(),n=!0),n&&(t.extensions=t.extensions||{},t.extensions.KHR_texture_transform=s,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(t,e){if(t===e)return t;function n(f){return f.colorSpace===Le?function(_){return _<.04045?_*.0773993808:Math.pow(_*.9478672986+.0521327014,2.4)}:function(_){return _}}t instanceof Pi&&(t=await this.decompressTextureAsync(t)),e instanceof Pi&&(e=await this.decompressTextureAsync(e));let s=t?t.image:null,r=e?e.image:null,o=Math.max(s?s.width:0,r?r.width:0),a=Math.max(s?s.height:0,r?r.height:0),c=md();c.width=o,c.height=a;let l=c.getContext("2d",{willReadFrequently:!0});l.fillStyle="#00ffff",l.fillRect(0,0,o,a);let u=l.getImageData(0,0,o,a);if(s){l.drawImage(s,0,0,o,a);let f=n(t),g=l.getImageData(0,0,o,a).data;for(let _=2;_<g.length;_+=4)u.data[_]=f(g[_]/256)*256}if(r){l.drawImage(r,0,0,o,a);let f=n(e),g=l.getImageData(0,0,o,a).data;for(let _=1;_<g.length;_+=4)u.data[_]=f(g[_]/256)*256}l.putImageData(u,0,0);let h=(t||e).clone();return h.source=new ci(c),h.colorSpace=wn,h.channel=(t||e).channel,t&&e&&t.channel!==e.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),h}async decompressTextureAsync(t,e=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(t,e)}processBuffer(t){let e=this.json,n=this.buffers;return e.buffers||(e.buffers=[{byteLength:0}]),n.push(t),0}processBufferView(t,e,n,s,r){let o=this.json;o.bufferViews||(o.bufferViews=[]);let a;switch(e){case Yt.BYTE:case Yt.UNSIGNED_BYTE:a=1;break;case Yt.SHORT:case Yt.UNSIGNED_SHORT:a=2;break;default:a=4}let c=t.itemSize*a;r===Yt.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);let l=gd(s*c),u=new DataView(new ArrayBuffer(l)),d=0;for(let g=n;g<n+s;g++){for(let _=0;_<t.itemSize;_++){let m;t.itemSize>4?m=t.array[g*t.itemSize+_]:(_===0?m=t.getX(g):_===1?m=t.getY(g):_===2?m=t.getZ(g):_===3&&(m=t.getW(g)),t.normalized===!0&&(m=zi.normalize(m,t.array))),e===Yt.FLOAT?u.setFloat32(d,m,!0):e===Yt.INT?u.setInt32(d,m,!0):e===Yt.UNSIGNED_INT?u.setUint32(d,m,!0):e===Yt.SHORT?u.setInt16(d,m,!0):e===Yt.UNSIGNED_SHORT?u.setUint16(d,m,!0):e===Yt.BYTE?u.setInt8(d,m):e===Yt.UNSIGNED_BYTE&&u.setUint8(d,m),d+=a}d%c!==0&&(d+=c-d%c)}let h={buffer:this.processBuffer(u.buffer),byteOffset:this.byteOffset,byteLength:l};return r!==void 0&&(h.target=r),r===Yt.ARRAY_BUFFER&&(h.byteStride=c),this.byteOffset+=l,o.bufferViews.push(h),{id:o.bufferViews.length-1,byteLength:0}}processBufferViewImage(t){let e=this,n=e.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(s){let r=new FileReader;r.readAsArrayBuffer(t),r.onloadend=function(){let o=bl(r.result),a={buffer:e.processBuffer(o),byteOffset:e.byteOffset,byteLength:o.byteLength};e.byteOffset+=o.byteLength,s(n.bufferViews.push(a)-1)}})}processAccessor(t,e,n,s){let r=this.json,o={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},a;if(t.array.constructor===Float32Array)a=Yt.FLOAT;else if(t.array.constructor===Int32Array)a=Yt.INT;else if(t.array.constructor===Uint32Array)a=Yt.UNSIGNED_INT;else if(t.array.constructor===Int16Array)a=Yt.SHORT;else if(t.array.constructor===Uint16Array)a=Yt.UNSIGNED_SHORT;else if(t.array.constructor===Int8Array)a=Yt.BYTE;else if(t.array.constructor===Uint8Array)a=Yt.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+t.array.constructor.name);if(n===void 0&&(n=0),(s===void 0||s===1/0)&&(s=t.count),s===0)return null;let c=N_(t,n,s),l;e!==void 0&&(l=t===e.index?Yt.ELEMENT_ARRAY_BUFFER:Yt.ARRAY_BUFFER);let u=this.processBufferView(t,a,n,s,l),d={bufferView:u.id,byteOffset:u.byteOffset,componentType:a,count:s,max:c.max,min:c.min,type:o[t.itemSize]};return t.normalized===!0&&(d.normalized=!0),r.accessors||(r.accessors=[]),r.accessors.push(d)-1}processImage(t,e,n,s="image/png"){if(t!==null){let r=this,o=r.cache,a=r.json,c=r.options,l=r.pending;o.images.has(t)||o.images.set(t,{});let u=o.images.get(t),d=s+":flipY/"+n.toString();if(u[d]!==void 0)return u[d];a.images||(a.images=[]);let h={mimeType:s},f=md();f.width=Math.min(t.width,c.maxTextureSize),f.height=Math.min(t.height,c.maxTextureSize);let g=f.getContext("2d",{willReadFrequently:!0});if(n===!0&&(g.translate(0,f.height),g.scale(1,-1)),t.data!==void 0){e!==Ke&&console.error("GLTFExporter: Only RGBAFormat is supported.",e),(t.width>c.maxTextureSize||t.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",t);let m=new Uint8ClampedArray(t.height*t.width*4);for(let p=0;p<m.length;p+=4)m[p+0]=t.data[p+0],m[p+1]=t.data[p+1],m[p+2]=t.data[p+2],m[p+3]=t.data[p+3];g.putImageData(new ImageData(m,t.width,t.height),0,0)}else if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas)g.drawImage(t,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?l.push(F_(f,s).then(m=>r.processBufferViewImage(m)).then(m=>{h.bufferView=m})):h.uri=vs.getDataURL(f,s);let _=a.images.push(h)-1;return u[d]=_,_}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(t){let e=this.json;e.samplers||(e.samplers=[]);let n={magFilter:cn[t.magFilter],minFilter:cn[t.minFilter],wrapS:cn[t.wrapS],wrapT:cn[t.wrapT]};return e.samplers.push(n)-1}async processTextureAsync(t){let n=this.options,s=this.cache,r=this.json;if(s.textures.has(t))return s.textures.get(t);r.textures||(r.textures=[]),t instanceof Pi&&(t=await this.decompressTextureAsync(t,n.maxTextureSize));let o=t.userData.mimeType;o==="image/webp"&&(o="image/png");let a={sampler:this.processSampler(t),source:this.processImage(t.image,t.format,t.flipY,o)};t.name&&(a.name=t.name),await this._invokeAllAsync(async function(l){l.writeTexture&&await l.writeTexture(t,a)});let c=r.textures.push(a)-1;return s.textures.set(t,c),c}async processMaterialAsync(t){let e=this.cache,n=this.json;if(e.materials.has(t))return e.materials.get(t);if(t.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;n.materials||(n.materials=[]);let s={pbrMetallicRoughness:{}};t.isMeshStandardMaterial!==!0&&t.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let r=t.color.toArray().concat([t.opacity]);if(Rr(r,[1,1,1,1])||(s.pbrMetallicRoughness.baseColorFactor=r),t.isMeshStandardMaterial?(s.pbrMetallicRoughness.metallicFactor=t.metalness,s.pbrMetallicRoughness.roughnessFactor=t.roughness):(s.pbrMetallicRoughness.metallicFactor=0,s.pbrMetallicRoughness.roughnessFactor=1),t.metalnessMap||t.roughnessMap){let a=await this.buildMetalRoughTextureAsync(t.metalnessMap,t.roughnessMap),c={index:await this.processTextureAsync(a),texCoord:a.channel};this.applyTextureTransform(c,a),s.pbrMetallicRoughness.metallicRoughnessTexture=c}if(t.map){let a={index:await this.processTextureAsync(t.map),texCoord:t.map.channel};this.applyTextureTransform(a,t.map),s.pbrMetallicRoughness.baseColorTexture=a}if(t.emissive){let a=t.emissive;if(Math.max(a.r,a.g,a.b)>0&&(s.emissiveFactor=t.emissive.toArray()),t.emissiveMap){let l={index:await this.processTextureAsync(t.emissiveMap),texCoord:t.emissiveMap.channel};this.applyTextureTransform(l,t.emissiveMap),s.emissiveTexture=l}}if(t.normalMap){let a={index:await this.processTextureAsync(t.normalMap),texCoord:t.normalMap.channel};t.normalScale&&t.normalScale.x!==1&&(a.scale=t.normalScale.x),this.applyTextureTransform(a,t.normalMap),s.normalTexture=a}if(t.aoMap){let a={index:await this.processTextureAsync(t.aoMap),texCoord:t.aoMap.channel};t.aoMapIntensity!==1&&(a.strength=t.aoMapIntensity),this.applyTextureTransform(a,t.aoMap),s.occlusionTexture=a}t.transparent?s.alphaMode="BLEND":t.alphaTest>0&&(s.alphaMode="MASK",s.alphaCutoff=t.alphaTest),t.side===$e&&(s.doubleSided=!0),t.name!==""&&(s.name=t.name),this.serializeUserData(t,s),await this._invokeAllAsync(async function(a){a.writeMaterialAsync&&await a.writeMaterialAsync(t,s)});let o=n.materials.push(s)-1;return e.materials.set(t,o),o}async processMeshAsync(t){let e=this.cache,n=this.json,s=[t.geometry.uuid];if(Array.isArray(t.material))for(let y=0,T=t.material.length;y<T;y++)s.push(t.material[y].uuid);else s.push(t.material.uuid);let r=s.join(":");if(e.meshes.has(r))return e.meshes.get(r);let o=t.geometry,a;t.isLineSegments?a=Yt.LINES:t.isLineLoop?a=Yt.LINE_LOOP:t.isLine?a=Yt.LINE_STRIP:t.isPoints?a=Yt.POINTS:a=t.material.wireframe?Yt.LINES:Yt.TRIANGLES;let c={},l={},u=[],d=[],h={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=o.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),o.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let g=null;for(let y in o.attributes){if(y.slice(0,5)==="morph")continue;let T=o.attributes[y];if(y=h[y]||y.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(y)||(y="_"+y),e.attributes.has(this.getUID(T))){l[y]=e.attributes.get(this.getUID(T));continue}g=null;let b=T.array;y==="JOINTS_0"&&!(b instanceof Uint16Array)&&!(b instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),g=new de(new Uint16Array(b),T.itemSize,T.normalized)):(b instanceof Uint32Array||b instanceof Int32Array)&&!y.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${y}" converted to type FLOAT.`),g=qi.Utils.toFloat32BufferAttribute(T));let R=this.processAccessor(g||T,o);R!==null&&(y.startsWith("_")||this.detectMeshQuantization(y,T),l[y]=R,e.attributes.set(this.getUID(T),R))}if(f!==void 0&&o.setAttribute("normal",f),Object.keys(l).length===0)return null;if(t.morphTargetInfluences!==void 0&&t.morphTargetInfluences.length>0){let y=[],T=[],w={};if(t.morphTargetDictionary!==void 0)for(let b in t.morphTargetDictionary)w[t.morphTargetDictionary[b]]=b;for(let b=0;b<t.morphTargetInfluences.length;++b){let R={},x=!1;for(let v in o.morphAttributes){if(v!=="position"&&v!=="normal"){x||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),x=!0);continue}let I=o.morphAttributes[v][b],L=v.toUpperCase(),U=o.attributes[v];if(e.attributes.has(this.getUID(I,!0))){R[L]=e.attributes.get(this.getUID(I,!0));continue}let B=I.clone();if(!o.morphTargetsRelative)for(let H=0,W=I.count;H<W;H++)for(let j=0;j<I.itemSize;j++)j===0&&B.setX(H,I.getX(H)-U.getX(H)),j===1&&B.setY(H,I.getY(H)-U.getY(H)),j===2&&B.setZ(H,I.getZ(H)-U.getZ(H)),j===3&&B.setW(H,I.getW(H)-U.getW(H));R[L]=this.processAccessor(B,o),e.attributes.set(this.getUID(U,!0),R[L])}d.push(R),y.push(t.morphTargetInfluences[b]),t.morphTargetDictionary!==void 0&&T.push(w[b])}c.weights=y,T.length>0&&(c.extras={},c.extras.targetNames=T)}let _=Array.isArray(t.material);if(_&&o.groups.length===0)return null;let m=!1;if(_&&o.index===null){let y=[];for(let T=0,w=o.attributes.position.count;T<w;T++)y[T]=T;o.setIndex(y),m=!0}let p=_?t.material:[t.material],E=_?o.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let y=0,T=E.length;y<T;y++){let w={mode:a,attributes:l};if(this.serializeUserData(o,w),d.length>0&&(w.targets=d),o.index!==null){let R=this.getUID(o.index);(E[y].start!==void 0||E[y].count!==void 0)&&(R+=":"+E[y].start+":"+E[y].count),e.attributes.has(R)?w.indices=e.attributes.get(R):(w.indices=this.processAccessor(o.index,o,E[y].start,E[y].count),e.attributes.set(R,w.indices)),w.indices===null&&delete w.indices}let b=await this.processMaterialAsync(p[E[y].materialIndex]);b!==null&&(w.material=b),u.push(w)}m===!0&&o.setIndex(null),c.primitives=u,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(y){y.writeMesh&&y.writeMesh(t,c)});let A=n.meshes.push(c)-1;return e.meshes.set(r,A),A}detectMeshQuantization(t,e){if(this.extensionsUsed[Ml])return;let n;switch(e.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}e.normalized&&(n+=" normalized");let s=t.split("_",1)[0];ud[s]&&ud[s].includes(n)&&(this.extensionsUsed[Ml]=!0,this.extensionsRequired[Ml]=!0)}processCamera(t){let e=this.json;e.cameras||(e.cameras=[]);let n=t.isOrthographicCamera,s={type:n?"orthographic":"perspective"};return n?s.orthographic={xmag:t.right*2,ymag:t.top*2,zfar:t.far<=0?.001:t.far,znear:t.near<0?0:t.near}:s.perspective={aspectRatio:t.aspect,yfov:zi.degToRad(t.fov),zfar:t.far<=0?.001:t.far,znear:t.near<0?0:t.near},t.name!==""&&(s.name=t.type),e.cameras.push(s)-1}processAnimation(t,e){let n=this.json,s=this.nodeMap;n.animations||(n.animations=[]),t=qi.Utils.mergeMorphTargetTracks(t.clone(),e);let r=t.tracks,o=[],a=[];for(let l=0;l<r.length;++l){let u=r[l],d=ee.parseTrackName(u.name),h=ee.findNode(e,d.nodeName),f=dd[d.propertyName];if(d.objectName==="bones"&&(h.isSkinnedMesh===!0?h=h.skeleton.getBoneByName(d.objectIndex):h=void 0),!h||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',u.name);continue}let g=1,_=u.values.length/u.times.length;f===dd.morphTargetInfluences&&(_/=h.morphTargetInfluences.length);let m;u.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(m="CUBICSPLINE",_/=3):u.getInterpolation()===Ri?m="STEP":m="LINEAR",a.push({input:this.processAccessor(new de(u.times,g)),output:this.processAccessor(new de(u.values,_)),interpolation:m}),o.push({sampler:a.length-1,target:{node:s.get(h),path:f}})}let c={name:t.name||"clip_"+n.animations.length,samplers:a,channels:o};return this.serializeUserData(t,c),n.animations.push(c),n.animations.length-1}processSkin(t){let e=this.json,n=this.nodeMap,s=e.nodes[n.get(t)],r=t.skeleton;if(r===void 0)return null;let o=t.skeleton.bones[0];if(o===void 0)return null;let a=[],c=new Float32Array(r.bones.length*16),l=new re;for(let d=0;d<r.bones.length;++d)a.push(n.get(r.bones[d])),l.copy(r.boneInverses[d]),l.multiply(t.bindMatrix).toArray(c,d*16);return e.skins===void 0&&(e.skins=[]),e.skins.push({inverseBindMatrices:this.processAccessor(new de(c,16)),joints:a,skeleton:n.get(o)}),s.skin=e.skins.length-1}async processNodeAsync(t){let e=this.json,n=this.options,s=this.nodeMap;e.nodes||(e.nodes=[]);let r={};if(n.trs){let a=t.quaternion.toArray(),c=t.position.toArray(),l=t.scale.toArray();Rr(a,[0,0,0,1])||(r.rotation=a),Rr(c,[0,0,0])||(r.translation=c),Rr(l,[1,1,1])||(r.scale=l)}else t.matrixAutoUpdate&&t.updateMatrix(),U_(t.matrix)===!1&&(r.matrix=t.matrix.elements);if(t.name!==""&&(r.name=String(t.name)),this.serializeUserData(t,r),t.isMesh||t.isLine||t.isPoints){let a=await this.processMeshAsync(t);a!==null&&(r.mesh=a)}else t.isCamera&&(r.camera=this.processCamera(t));t.isSkinnedMesh&&this.skins.push(t);let o=e.nodes.push(r)-1;if(s.set(t,o),t.children.length>0){let a=[];for(let c=0,l=t.children.length;c<l;c++){let u=t.children[c];if(u.visible||n.onlyVisible===!1){let d=await this.processNodeAsync(u);d!==null&&a.push(d)}}a.length>0&&(r.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(t,r)}),o}async processSceneAsync(t){let e=this.json,n=this.options;e.scenes||(e.scenes=[],e.scene=0);let s={};t.name!==""&&(s.name=t.name),e.scenes.push(s);let r=[];for(let o=0,a=t.children.length;o<a;o++){let c=t.children[o];if(c.visible||n.onlyVisible===!1){let l=await this.processNodeAsync(c);l!==null&&r.push(l)}}r.length>0&&(s.nodes=r),this.serializeUserData(t,s)}async processObjectsAsync(t){let e=new In;e.name="AuxScene";for(let n=0;n<t.length;n++)e.children.push(t[n]);await this.processSceneAsync(e)}async processInputAsync(t){let e=this.options;t=t instanceof Array?t:[t],await this._invokeAllAsync(function(s){s.beforeParse&&s.beforeParse(t)});let n=[];for(let s=0;s<t.length;s++)t[s]instanceof In?await this.processSceneAsync(t[s]):n.push(t[s]);n.length>0&&await this.processObjectsAsync(n);for(let s=0;s<this.skins.length;++s)this.processSkin(this.skins[s]);for(let s=0;s<e.animations.length;++s)this.processAnimation(e.animations[s],t[0]);await this._invokeAllAsync(function(s){s.afterParse&&s.afterParse(t)})}async _invokeAllAsync(t){for(let e=0,n=this.plugins.length;e<n;e++)await t(this.plugins[e])}},wl=class{constructor(t){this.writer=t,this.name="KHR_lights_punctual"}writeNode(t,e){if(!t.isLight)return;if(!t.isDirectionalLight&&!t.isPointLight&&!t.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",t);return}let n=this.writer,s=n.json,r=n.extensionsUsed,o={};t.name&&(o.name=t.name),o.color=t.color.toArray(),o.intensity=t.intensity,t.isDirectionalLight?o.type="directional":t.isPointLight?(o.type="point",t.distance>0&&(o.range=t.distance)):t.isSpotLight&&(o.type="spot",t.distance>0&&(o.range=t.distance),o.spot={},o.spot.innerConeAngle=(1-t.penumbra)*t.angle,o.spot.outerConeAngle=t.angle),t.decay!==void 0&&t.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),t.target&&(t.target.parent!==t||t.target.position.x!==0||t.target.position.y!==0||t.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),r[this.name]||(s.extensions=s.extensions||{},s.extensions[this.name]={lights:[]},r[this.name]=!0);let a=s.extensions[this.name].lights;a.push(o),e.extensions=e.extensions||{},e.extensions[this.name]={light:a.length-1}}},Tl=class{constructor(t){this.writer=t,this.name="KHR_materials_unlit"}async writeMaterialAsync(t,e){if(!t.isMeshBasicMaterial)return;let s=this.writer.extensionsUsed;e.extensions=e.extensions||{},e.extensions[this.name]={},s[this.name]=!0,e.pbrMetallicRoughness.metallicFactor=0,e.pbrMetallicRoughness.roughnessFactor=.9}},El=class{constructor(t){this.writer=t,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.clearcoat===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.clearcoatFactor=t.clearcoat,t.clearcoatMap){let o={index:await n.processTextureAsync(t.clearcoatMap),texCoord:t.clearcoatMap.channel};n.applyTextureTransform(o,t.clearcoatMap),r.clearcoatTexture=o}if(r.clearcoatRoughnessFactor=t.clearcoatRoughness,t.clearcoatRoughnessMap){let o={index:await n.processTextureAsync(t.clearcoatRoughnessMap),texCoord:t.clearcoatRoughnessMap.channel};n.applyTextureTransform(o,t.clearcoatRoughnessMap),r.clearcoatRoughnessTexture=o}if(t.clearcoatNormalMap){let o={index:await n.processTextureAsync(t.clearcoatNormalMap),texCoord:t.clearcoatNormalMap.channel};t.clearcoatNormalScale.x!==1&&(o.scale=t.clearcoatNormalScale.x),n.applyTextureTransform(o,t.clearcoatNormalMap),r.clearcoatNormalTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Al=class{constructor(t){this.writer=t,this.name="KHR_materials_dispersion"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.dispersion===0)return;let s=this.writer.extensionsUsed,r={};r.dispersion=t.dispersion,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Rl=class{constructor(t){this.writer=t,this.name="KHR_materials_iridescence"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.iridescence===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.iridescenceFactor=t.iridescence,t.iridescenceMap){let o={index:await n.processTextureAsync(t.iridescenceMap),texCoord:t.iridescenceMap.channel};n.applyTextureTransform(o,t.iridescenceMap),r.iridescenceTexture=o}if(r.iridescenceIor=t.iridescenceIOR,r.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1],t.iridescenceThicknessMap){let o={index:await n.processTextureAsync(t.iridescenceThicknessMap),texCoord:t.iridescenceThicknessMap.channel};n.applyTextureTransform(o,t.iridescenceThicknessMap),r.iridescenceThicknessTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Cl=class{constructor(t){this.writer=t,this.name="KHR_materials_transmission"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.transmissionFactor=t.transmission,t.transmissionMap){let o={index:await n.processTextureAsync(t.transmissionMap),texCoord:t.transmissionMap.channel};n.applyTextureTransform(o,t.transmissionMap),r.transmissionTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Il=class{constructor(t){this.writer=t,this.name="KHR_materials_volume"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.thicknessFactor=t.thickness,t.thicknessMap){let o={index:await n.processTextureAsync(t.thicknessMap),texCoord:t.thicknessMap.channel};n.applyTextureTransform(o,t.thicknessMap),r.thicknessTexture=o}t.attenuationDistance!==1/0&&(r.attenuationDistance=t.attenuationDistance),r.attenuationColor=t.attenuationColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Pl=class{constructor(t){this.writer=t,this.name="KHR_materials_ior"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.ior===1.5)return;let s=this.writer.extensionsUsed,r={};r.ior=t.ior,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Ll=class{constructor(t){this.writer=t,this.name="KHR_materials_specular"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.specularIntensity===1&&t.specularColor.equals(R_)&&!t.specularIntensityMap&&!t.specularColorMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.specularIntensityMap){let o={index:await n.processTextureAsync(t.specularIntensityMap),texCoord:t.specularIntensityMap.channel};n.applyTextureTransform(o,t.specularIntensityMap),r.specularTexture=o}if(t.specularColorMap){let o={index:await n.processTextureAsync(t.specularColorMap),texCoord:t.specularColorMap.channel};n.applyTextureTransform(o,t.specularColorMap),r.specularColorTexture=o}r.specularFactor=t.specularIntensity,r.specularColorFactor=t.specularColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Dl=class{constructor(t){this.writer=t,this.name="KHR_materials_sheen"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.sheen==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.sheenRoughnessMap){let o={index:await n.processTextureAsync(t.sheenRoughnessMap),texCoord:t.sheenRoughnessMap.channel};n.applyTextureTransform(o,t.sheenRoughnessMap),r.sheenRoughnessTexture=o}if(t.sheenColorMap){let o={index:await n.processTextureAsync(t.sheenColorMap),texCoord:t.sheenColorMap.channel};n.applyTextureTransform(o,t.sheenColorMap),r.sheenColorTexture=o}r.sheenRoughnessFactor=t.sheenRoughness,r.sheenColorFactor=t.sheenColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Ul=class{constructor(t){this.writer=t,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.anisotropy==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.anisotropyMap){let o={index:await n.processTextureAsync(t.anisotropyMap)};n.applyTextureTransform(o,t.anisotropyMap),r.anisotropyTexture=o}r.anisotropyStrength=t.anisotropy,r.anisotropyRotation=t.anisotropyRotation,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Nl=class{constructor(t){this.writer=t,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(t,e){if(!t.isMeshStandardMaterial||t.emissiveIntensity===1)return;let s=this.writer.extensionsUsed,r={};r.emissiveStrength=t.emissiveIntensity,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Fl=class{constructor(t){this.writer=t,this.name="EXT_materials_bump"}async writeMaterialAsync(t,e){if(!t.isMeshStandardMaterial||t.bumpScale===1&&!t.bumpMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.bumpMap){let o={index:await n.processTextureAsync(t.bumpMap),texCoord:t.bumpMap.channel};n.applyTextureTransform(o,t.bumpMap),r.bumpTexture=o}r.bumpFactor=t.bumpScale,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Ol=class{constructor(t){this.writer=t,this.name="EXT_mesh_gpu_instancing"}writeNode(t,e){if(!t.isInstancedMesh)return;let n=this.writer,s=t,r=new Float32Array(s.count*3),o=new Float32Array(s.count*4),a=new Float32Array(s.count*3),c=new re,l=new N,u=new Ye,d=new N;for(let f=0;f<s.count;f++)s.getMatrixAt(f,c),c.decompose(l,u,d),l.toArray(r,f*3),u.toArray(o,f*4),d.toArray(a,f*3);let h={TRANSLATION:n.processAccessor(new de(r,3)),ROTATION:n.processAccessor(new de(o,4)),SCALE:n.processAccessor(new de(a,3))};s.instanceColor&&(h._COLOR_0=n.processAccessor(s.instanceColor)),e.extensions=e.extensions||{},e.extensions[this.name]={attributes:h},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};qi.Utils={insertKeyframe:function(i,t){let n=i.getValueSize(),s=new i.TimeBufferType(i.times.length+1),r=new i.ValueBufferType(i.values.length+n),o=i.createInterpolant(new i.ValueBufferType(n)),a;if(i.times.length===0){s[0]=t;for(let c=0;c<n;c++)r[c]=0;a=0}else if(t<i.times[0]){if(Math.abs(i.times[0]-t)<.001)return 0;s[0]=t,s.set(i.times,1),r.set(o.evaluate(t),0),r.set(i.values,n),a=0}else if(t>i.times[i.times.length-1]){if(Math.abs(i.times[i.times.length-1]-t)<.001)return i.times.length-1;s[s.length-1]=t,s.set(i.times,0),r.set(i.values,0),r.set(o.evaluate(t),i.values.length),a=s.length-1}else for(let c=0;c<i.times.length;c++){if(Math.abs(i.times[c]-t)<.001)return c;if(i.times[c]<t&&i.times[c+1]>t){s.set(i.times.slice(0,c+1),0),s[c+1]=t,s.set(i.times.slice(c+1),c+2),r.set(i.values.slice(0,(c+1)*n),0),r.set(o.evaluate(t),(c+1)*n),r.set(i.values.slice((c+1)*n),(c+2)*n),a=c+1;break}}return i.times=s,i.values=r,a},mergeMorphTargetTracks:function(i,t){let e=[],n={},s=i.tracks;for(let r=0;r<s.length;++r){let o=s[r],a=ee.parseTrackName(o.name),c=ee.findNode(t,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){e.push(o);continue}if(o.createInterpolant!==o.InterpolantFactoryMethodDiscrete&&o.createInterpolant!==o.InterpolantFactoryMethodLinear){if(o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),o=o.clone(),o.setInterpolation(_s)}let l=c.morphTargetInfluences.length,u=c.morphTargetDictionary[a.propertyIndex];if(u===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let d;if(n[c.uuid]===void 0){d=o.clone();let f=new d.ValueBufferType(l*d.times.length);for(let g=0;g<d.times.length;g++)f[g*l+u]=d.values[g];d.name=(a.nodeName||"")+".morphTargetInfluences",d.values=f,n[c.uuid]=d,e.push(d);continue}let h=o.createInterpolant(new o.ValueBufferType(1));d=n[c.uuid];for(let f=0;f<d.times.length;f++)d.values[f*l+u]=h.evaluate(d.times[f]);for(let f=0;f<o.times.length;f++){let g=this.insertKeyframe(d,o.times[f]);d.values[g*l+u]=o.values[f]}}return i.tracks=e,i},toFloat32BufferAttribute:function(i){let t=new de(new Float32Array(i.count*i.itemSize),i.itemSize,!1);if(!i.normalized&&!i.isInterleavedBufferAttribute)return t.array.set(i.array),t;for(let e=0,n=i.count;e<n;e++)for(let s=0;s<i.itemSize;s++)t.setComponent(e,s,i.getComponent(e,s));return t}};var Cr={women:{height:168,sizes:{XS:[81,63,89],S:[86,68,94],M:[91,73,99],L:[99,81,107],XL:[107,89,115],"2XL":[117,99,125],"3XL":[127,109,135],"4XL":[137,119,145]}},men:{height:178,sizes:{XS:[86,71,86],S:[91,76,91],M:[99,84,99],L:[107,91,107],XL:[117,102,117],"2XL":[127,112,127],"3XL":[137,122,137],"4XL":[147,132,147]}},kids:{height:0,sizes:{4:[56,53,58,104],6:[61,56,64,117],8:[66,58,69,130],10:[71,61,74,140],12:[76,64,80,150],14:[81,66,86,160]}}},O_={petite:-10,regular:0,tall:8},Ir=[{id:"form",name:"Dress form",color:"#efe8dc"},{id:"porcelain",name:"Porcelain",color:"#f3d9c6"},{id:"light",name:"Light",color:"#e8bf9f"},{id:"medium",name:"Medium",color:"#c98f68"},{id:"tan",name:"Tan",color:"#a8714c"},{id:"deep",name:"Deep",color:"#7a4a2e"},{id:"rich",name:"Rich",color:"#4d2c1b"}];function kl(){return{type:"women",size:"M",height:"regular",skin:"form",custom:null}}function Pa(i){let t=Cr[i.type]||Cr.women,e=t.sizes[i.size]||Object.values(t.sizes)[2],s={height:i.type==="kids"?e[3]:t.height+(O_[i.height]||0),bust:e[0],waist:e[1],hip:e[2]};if(i.custom)for(let o of Object.keys(s))i.custom[o]>0&&(s[o]=i.custom[o]);s.shoulder=Math.round((.18*s.height+.12*s.bust)*10)/10;let r=Ia[i.type]||Ia.women;return s.inseam=Math.round(r.crotch*s.height),s.arm=Math.round((r.upperArm+r.forearm)*s.height),s}var Ia={women:{crotch:.46,hip:.51,waist:.615,bust:.715,armpit:.745,shoulder:.815,neckBase:.83,neckTop:.87,head:.925,headR:.064,knee:.285,ankle:.045,thigh:.6,upperArm:.17,forearm:.15,armC:.3,bustBulge:1},men:{crotch:.47,hip:.515,waist:.6,bust:.72,armpit:.745,shoulder:.818,neckBase:.835,neckTop:.875,head:.93,headR:.062,knee:.285,ankle:.045,thigh:.57,upperArm:.175,forearm:.15,armC:.32,bustBulge:.3},kids:{crotch:.43,hip:.48,waist:.56,bust:.66,armpit:.69,shoulder:.76,neckBase:.775,neckTop:.81,head:.885,headR:.085,knee:.27,ankle:.045,thigh:.58,upperArm:.16,forearm:.14,armC:.3,bustBulge:0}};function Bl(i,t){let e=Math.PI*(3*(1+t)-Math.sqrt((3+t)*(1+3*t))),n=i/e;return{a:n,b:n*t}}function _d(i,t){return Math.PI*(3*(i+t)-Math.sqrt((3*i+t)*(i+3*t)))}var Tn=22*Math.PI/180;function xd(i){let t=Pa(i),e=Ia[i.type]||Ia.women,n=t.height/100,s=L=>L/100,r=Bl(s(t.hip),.74),o=Bl(s(t.waist),.72),a=Bl(s(t.bust)*(e.bustBulge?.95:1),.66),c=s(t.shoulder)/2,l=s(t.bust)*.058+.012,u=(L,U,B)=>({a:L.a+(U.a-L.a)*B,b:L.b+(U.b-L.b)*B}),d=u(o,a,.5),h=(L,U,B={})=>({y:L*n,a:U.a,b:U.b,...B}),f=[h(e.crotch-.008,{a:r.a*.62,b:r.b*.55}),h(e.crotch+.006,{a:r.a*.86,b:r.b*.82}),h(e.crotch+.025,{a:r.a*.97,b:r.b*.96}),h(e.hip,r),h((e.hip+e.waist)/2,u(r,o,.55)),h(e.waist,o),h((e.waist+e.bust)/2,d),h(e.bust,a),h(e.armpit,{a:a.a*.97,b:a.b*.92}),h((e.armpit+e.shoulder)/2+.008,{a:Math.max(c*.86,a.a*.95),b:a.b*.8}),h(e.shoulder-.004,{a:c*.9,b:a.b*.66}),h(e.neckBase-.002,{a:Math.max(l*2.2,c*.62),b:Math.max(l*1.4,a.b*.5)}),h(e.neckBase+.006,{a:l*1.25,b:l*1.15}),h(e.neckTop,{a:l,b:l})],g=e.bustBulge*Math.max(.012,(s(t.bust)-s(t.waist))*.09),_=e.bust*n,m=e.hip*n,p=(L,U,B,H)=>{let W=0;if(H>0){let j=Math.exp(-Math.pow((L-_)/(L<_?.035*n:.05*n),2)),z=.42*B,Q=.3*B;W+=g*j*H*H*(Math.exp(-Math.pow((U-z)/Q,2))+Math.exp(-Math.pow((U+z)/Q,2)))}else{let j=Math.exp(-Math.pow((L-m+.01*n)/(.05*n),2)),z=.45*B,Q=.35*B;W-=.35*g*j*H*H*(Math.exp(-Math.pow((U-z)/Q,2))+Math.exp(-Math.pow((U+z)/Q,2)))+(i.type==="women"?.012:.006)*j*H*H}return W},E=s(t.hip)*e.thigh,A=r.a*.47,y=(L,U,B=1)=>({y:L*n,r:U/(2*Math.PI),x:A*B}),T=[y(e.crotch+.04,E*1.05,1),y(e.crotch-.01,E,1),y(e.crotch-.06,E*.88,.97),y(e.knee+.05,E*.7,.9),y(e.knee,E*.62,.86),y(e.knee-.05,E*.64,.84),y((e.knee+e.ankle)/2+.03,E*.56,.8),y(e.ankle+.03,E*.37,.76),y(e.ankle-.012,E*.38,.75)],w=s(t.bust)*e.armC,b=w/(2*Math.PI),R={x:c-b*.8,y:(e.shoulder-.018)*n},x=(L,U)=>({d:L*n,r:U/(2*Math.PI)}),v=[x(-.01,w*1.15),x(.02,w*1.12),x(.06,w),x(e.upperArm,w*.78),x(e.upperArm+.06,w*.82),x(e.upperArm+e.forearm,w*.56)],I=(e.upperArm+e.forearm)*n;return{settings:i,m:t,H:n,P:e,torso:f,bulge:p,leg:T,legX:A,arm:v,armLen:I,shoulderJoint:R,upperR:b,head:{y:e.head*n,r:e.headR*n},footLen:.15*n*(i.type==="kids"?.95:1),y:{crotch:e.crotch*n,hip:m,waist:e.waist*n,bust:_,armpit:e.armpit*n,shoulder:e.shoulder*n,neckBase:e.neckBase*n,neckTop:e.neckTop*n,knee:e.knee*n,ankle:e.ankle*n},half:{hip:r.a,waist:o.a,bust:a.a,shoulder:c,neck:l}}}function yd(i,t,e){let n=i.H*1.08,s=n*t/e;return{x0:-s/2,y0:-i.H*.025,w:s,h:n}}var B_=-9.8,La=class{constructor({rings:t,seg:e=64,phys:n,collide:s,uvFn:r,pointFn:o,seed:a=1}){let c=t.length,l=e,u=c*l;this.R=c,this.C=l,this.N=u,this.phys=n,this.collide=s,this.rest=new Float32Array(u*3),this.local=new Float32Array(u*3),this.prev=new Float32Array(u*3),this.pos=new Float32Array(u*3);let d=new Float32Array(u*2);for(let T=0;T<c;T++)for(let w=0;w<l;w++){let b=w/l*Math.PI*2,R=t[T],x=T*l+w,[v,I,L]=o?o(R,Math.cos(b),Math.sin(b)):[R.cx+R.a*Math.cos(b),R.y,R.b*Math.sin(b)];this.rest.set([v,I,L],x*3);let U=r([v,I,L],R);d[x*2]=U[0],d[x*2+1]=U[1]}let h=a>>>0,f=()=>(h=h*1664525+1013904223>>>0,h/4294967296),g=Math.max(4,Math.round(n.folds)),_=Array.from({length:g},()=>f()*.6);for(let T=0;T<c;T++){let w=t[T],b=c>1?T/(c-1):0,R=1-(1-n.hang)*.6*Math.pow(b,1.2),x=Math.min(.32,2/g*Math.sqrt(Math.max(0,1/R-1)))*Math.pow(b,.6);for(let v=0;v<l;v++){let I=v/l*Math.PI*2,L=Math.floor(v/l*g),U=R*(1+x*Math.sin(g*I+_[L]*Math.PI*.5)),B=(T*l+v)*3,H=this.rest[B],W=this.rest[B+2];this.local[B]=w.cx*R+(H-w.cx)*U,this.local[B+1]=this.rest[B+1],this.local[B+2]=W*U}}this.prev.set(this.local),this.target=this.local.slice(),this.hold=.012+n.bend*.05+(n.hang-.7)*.08;let m=[],p=(T,w,b,R,x,v)=>{if(b>=c)return;let I=T*l+(w+l)%l,L=b*l+(R+l)%l,U=this.rest[I*3]-this.rest[L*3],B=this.rest[I*3+1]-this.rest[L*3+1],H=this.rest[I*3+2]-this.rest[L*3+2];m.push(I,L,Math.sqrt(U*U+B*B+H*H),x,v)},E=n.bend;for(let T=0;T<c;T++)for(let w=0;w<l;w++)p(T,w,T,w+1,1,.9),p(T,w,T+1,w,1,.9),p(T,w,T+1,w+1,.5,.35),p(T,w+1,T+1,w,.5,.35),p(T,w,T,w+2,E,E),p(T,w,T+2,w,E*.8+.1,E*.8+.1);this.cons=new Float32Array(m);let A=[];for(let T=0;T<c-1;T++)for(let w=0;w<l;w++){let b=T*l+w,R=T*l+(w+1)%l,x=(T+1)*l+w,v=(T+1)*l+(w+1)%l;A.push(b,x,R,R,x,v)}let y=this.geometry=new Ze;y.setAttribute("position",new de(this.pos,3).setUsage($c)),y.setAttribute("uv",new de(d,2)),y.setIndex(A),this.frame={angle:0,x:0,z:0},this.wind=0,this.time=0,this.motion=1}setFrame(t,e,n){let s=this.frame,r=t-s.angle,o=e-s.x,a=n-s.z;if(r||o||a){let c=Math.cos(s.angle),l=Math.sin(s.angle),u=Math.cos(t),d=Math.sin(t);for(let h=this.C;h<this.N;h++)for(let f of[this.local,this.prev]){let g=h*3,_=f[g],m=f[g+2],p=_*c+m*l+s.x-e,E=-_*l+m*c+s.z-n;f[g]=p*u-E*d,f[g+2]=p*d+E*u}s.angle=t,s.x=e,s.z=n,this.motion=1}}step(t){let{local:e,prev:n,rest:s,C:r,N:o,cons:a}=this,c=this.phys,l=1-c.drag,u=B_*t*t*c.weight;this.time+=t;let d=this.wind,h=0;for(let g=r;g<o;g++){let _=g*3,m=(e[_]-n[_])*l,p=(e[_+1]-n[_+1])*l,E=(e[_+2]-n[_+2])*l;n[_]=e[_],n[_+1]=e[_+1],n[_+2]=e[_+2];let A=0,y=0;if(d){let b=.6+.4*Math.sin(this.time*1.7+e[_+1]*6)*Math.sin(this.time*.9+g*.013),R=Math.cos(this.frame.angle),x=Math.sin(this.frame.angle);A=d*b*R*t*t*(1.6-c.weight*.6),y=d*b*x*t*t*(1.6-c.weight*.6)}e[_]+=m+A,e[_+1]+=p+u,e[_+2]+=E+y;let T=this.target,w=this.hold*(.3+.7*(g/this.C/this.R));e[_]+=(T[_]-e[_])*w,e[_+1]+=(T[_+1]-e[_+1])*w*.5,e[_+2]+=(T[_+2]-e[_+2])*w,h=Math.max(h,Math.abs(m)+Math.abs(p)+Math.abs(E))}e.set(s.subarray(0,r*3),0);let f=8;for(let g=0;g<f;g++){for(let _=0;_<a.length;_+=5){let m=a[_]*3,p=a[_+1]*3,E=a[_+2],A=e[p]-e[m],y=e[p+1]-e[m+1],T=e[p+2]-e[m+2],w=Math.sqrt(A*A+y*y+T*T)||1e-9,b=w>E?a[_+3]:a[_+4];if(!b)continue;let R=m<r*3,x=p<r*3,v=(w-E)/w*b*(R||x?1:.5);R||(e[m]+=A*v,e[m+1]+=y*v,e[m+2]+=T*v),x||(e[p]-=A*v,e[p+1]-=y*v,e[p+2]-=T*v)}for(let _=r;_<o;_++)this.collide(e,_*3)}return this.motion=h,h}settle(t){for(let e=0;e<t;e++)this.step(1/90)}sync(){let{local:t,pos:e,N:n}=this,s=this.frame,r=Math.cos(s.angle),o=Math.sin(s.angle);for(let a=0;a<n;a++){let c=a*3,l=t[c],u=t[c+2];e[c]=l*r+u*o+s.x,e[c+1]=t[c+1],e[c+2]=-l*o+u*r+s.z}this.geometry.attributes.position.needsUpdate=!0,this.geometry.computeVertexNormals(),this.geometry.computeBoundingSphere()}};var Re=64;function zl(i,t,e){let n=[];for(let s=0;s<i.length-1;s++){let r=i[Math.max(0,s-1)],o=i[s],a=i[s+1],c=i[Math.min(i.length-1,s+2)];for(let l=0;l<e;l++){let u=l/e,d=u*u,h=d*u,f={};for(let g of t)f[g]=.5*(2*o[g]+(-r[g]+a[g])*u+(2*r[g]-5*o[g]+4*a[g]-c[g])*d+(-r[g]+3*o[g]-3*a[g]+c[g])*h);n.push(f)}}return n.push({...i[i.length-1]}),n}function ks(i,t,{capStart:e=!1,capEnd:n=!1,uvFn:s=null}={}){let r=[],o=[],a=[];i.forEach(u=>{for(let d=0;d<Re;d++){let h=d/Re*Math.PI*2,f=t(u,Math.cos(h),Math.sin(h));if(r.push(f[0],f[1],f[2]),s){let g=s(f,u);o.push(g[0],g[1])}}});for(let u=0;u<i.length-1;u++)for(let d=0;d<Re;d++){let h=u*Re+d,f=u*Re+(d+1)%Re,g=(u+1)*Re+d,_=(u+1)*Re+(d+1)%Re;a.push(h,g,f,f,g,_)}let c=(u,d)=>{let h=u*Re,f=0,g=0,_=0;for(let p=0;p<Re;p++)f+=r[(h+p)*3],g+=r[(h+p)*3+1],_+=r[(h+p)*3+2];let m=r.length/3;if(r.push(f/Re,g/Re,_/Re),s){let p=s([f/Re,g/Re,_/Re]);o.push(p[0],p[1])}for(let p=0;p<Re;p++){let E=h+p,A=h+(p+1)%Re;d?a.push(m,A,E):a.push(m,E,A)}};e&&c(0,!1),n&&c(i.length-1,!0);let l=new Ze;return l.setAttribute("position",new Se(r,3)),s&&l.setAttribute("uv",new Se(o,2)),l.setIndex(a),l.computeVertexNormals(),l}var Da=class{constructor(t){this.host=t;let e=this.renderer=new Ta({antialias:!0,preserveDrawingBuffer:!0});e.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),e.outputColorSpace=Le,e.toneMapping=Fo,e.toneMappingExposure=1.05,e.shadowMap.enabled=!0,e.shadowMap.type=Ao,t.appendChild(e.domElement);let n=this.scene=new In;n.background=new kt("#efe9e2");let s=new Fs(e);n.environment=s.fromScene(new Ca,.04).texture,n.environmentIntensity=.7;let r=this.key=new Fi("#fff6ec",1.6);r.position.set(1.2,3,2.2),r.castShadow=!0,r.shadow.mapSize.set(2048,2048),Object.assign(r.shadow.camera,{left:-1.2,right:1.2,top:2.4,bottom:-.2,near:.5,far:8}),r.shadow.bias=-5e-4,r.shadow.normalBias=.02,n.add(r);let o=new Fi("#dfe8ff",.7);o.position.set(-2,2,-2.5),n.add(o),n.add(new xr("#ffffff","#b8a99a",.35));let a=this.stage=new ne(new pr(.55,.58,.04,96),new Pn({color:"#f7f3ee",roughness:.45}));a.position.y=-.02,a.receiveShadow=!0,n.add(a),this.camera=new Ne(28,1,.05,50),this.controls=new Ra(this.camera,e.domElement),Object.assign(this.controls,{enableDamping:!0,dampingFactor:.08,minDistance:.6,maxDistance:8,maxPolarAngle:Math.PI*.62,autoRotateSpeed:1.6}),this.figure=new sn,n.add(this.figure),this.bodyGroup=new sn,this.figure.add(this.bodyGroup),this.garmentGroup=new sn,this.figure.add(this.garmentGroup),this.clothGroup=new sn,n.add(this.clothGroup),this.cloth=null,this.move={angle:0,x:0,spin:!1,sway:!1,breeze:!1,twirl:null,home:null,t:0},this.last=performance.now(),this.skinMat=new Pn({color:"#efe8dc",roughness:.55}),this.colorTex=null,this.matTex=null,this.garmentMats=[],this.measure=null,this.visible=!1,this.anim=null,new ResizeObserver(()=>this.resize()).observe(t);let c=()=>{requestAnimationFrame(c),this.visible&&this.tick()};c()}tick(){let t=performance.now(),e=Math.min(.05,(t-this.last)/1e3);if(this.last=t,this.updateMotion(e),this.anim){let n=this.anim,s=Math.min(1,(performance.now()-n.start)/600),r=s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2;this.camera.position.lerpVectors(n.from,n.to,r),s>=1&&(this.anim=null)}this.controls.update(),this.renderer.render(this.scene,this.camera)}resize(){let t=this.host.clientWidth,e=this.host.clientHeight;!t||!e||(this.renderer.setSize(t,e,!1),this.renderer.domElement.style.width=t+"px",this.renderer.domElement.style.height=e+"px",this.camera.aspect=t/e,this.camera.updateProjectionMatrix())}setVisible(t){this.visible=t,t?(this.resize(),this.last=performance.now()):this.move.twirl&&(this.move.angle=this.move.twirl.from+Math.PI*4,this.move.twirl=null)}setBody(t,e,n){let s=this.spec=xd(t);this.box=yd(s,e,n),this.BW=e,this.BH=n;let r=Ir.find(h=>h.id===t.skin)||Ir[0];this.skinMat.color.set(r.color),this.skinMat.roughness=r.id==="form"?.7:.5,this.bodyGroup.clear();let o=h=>{let f=new ne(h,this.skinMat);return f.castShadow=!0,f.receiveShadow=!0,this.bodyGroup.add(f),f},a=zl(s.torso,["y","a","b"],6);this.denseTorso=a,o(ks(a,(h,f,g)=>{let _=h.a*f;return[_,h.y,h.b*g+s.bulge(h.y,_,h.a,g)]},{capStart:!0}));let c=zl(s.leg,["y","r","x"],5);this.denseLeg=c;for(let h of[-1,1])o(ks(c,(f,g,_)=>[h*f.x+f.r*g,f.y,f.r*.94*_],{capEnd:!0}));let l=zl(s.arm,["d","r"],5);this.denseArm=l;for(let h of[-1,1])o(ks(l,(f,g,_)=>{let m=this.armPoint(h,f.d),p=Math.cos(Tn),E=Math.sin(Tn)*h;return[m.x+f.r*g*p*h,m.y+f.r*g*E*h,f.r*.92*_]},{capStart:!0}));for(let h of[-1,1]){let f=this.armPoint(h,s.armLen+s.H*.045),g=o(new Li(1,24,16));g.scale.set(s.H*.024,s.H*.052,s.H*.013),g.position.set(f.x,f.y,.004),g.rotation.z=h*Tn;let _=c[c.length-1],m=o(new Li(1,24,16));m.scale.set(_.r*1.15,s.H*.03,s.footLen/2),m.position.set(h*_.x,s.H*.022,s.footLen*.28)}let u=o(new Li(1,40,28));u.scale.set(s.head.r*.8,s.head.r,s.head.r*.9),u.position.set(0,s.head.y,.004),this.stage.scale.set(s.H/1.7,1,s.H/1.7);let d=this.key.shadow.camera;return d.top=s.H*1.3,d.left=-s.H*.7,d.right=s.H*.7,d.updateProjectionMatrix(),this.controls.target.set(0,s.H*.55,0),this.cameraSet||(this.camera.position.set(0,s.H*.62,s.H*2.55),this.cameraSet=!0),this.controls.update(),s}armPoint(t,e){let n=this.spec.shoulderJoint;return{x:t*(n.x+Math.sin(Tn)*e),y:n.y-Math.cos(Tn)*e}}toBoard(t,e){let n=this.box;return[(t-n.x0)/n.w*this.BW,(1-(e-n.y0)/n.h)*this.BH]}toWorld(t,e){let n=this.box;return[n.x0+t/this.BW*n.w,n.y0+(1-e/this.BH)*n.h]}uvOf(t){let e=this.box;return[(t[0]-e.x0)/e.w,(t[1]-e.y0)/e.h]}renderGuide(t,e){let n=this.box,s=new Ni(n.x0,n.x0+n.w,n.y0+n.h,n.y0,-10,10);s.position.set(0,0,5),s.lookAt(0,0,0);let r=new pn(t,e,{samples:4}),o=this.scene.background,a=this.scene.environment;this.scene.background=null,this.scene.environment=null,this.garmentGroup.visible=!1,this.stage.visible=!1;let c=new Fi("#ffffff",2.2);c.position.set(.3,.6,3),this.scene.add(c),this.scene.overrideMaterial=new Di({color:"#c9c2bb"});let l=this.renderer,u=l.toneMapping;l.toneMapping=Mn,l.setRenderTarget(r),l.setClearColor(0,0),l.clear(),l.render(this.scene,s),l.setRenderTarget(null),l.toneMapping=u,this.scene.overrideMaterial=null,this.scene.remove(c),this.scene.background=o,this.scene.environment=a,this.garmentGroup.visible=!0,this.stage.visible=!0;let d=new Uint8Array(t*e*4);l.readRenderTargetPixels(r,0,0,t,e,d),r.dispose();let h=document.createElement("canvas");h.width=t,h.height=e;let f=h.getContext("2d").createImageData(t,e);for(let g=0;g<e;g++)f.data.set(d.subarray((e-1-g)*t*4,(e-g)*t*4),g*t*4);return h.getContext("2d").putImageData(f,0,0),h}setDesign(t,e,n){if(!this.colorTex||this.colorTex.image!==t){this.colorTex?.dispose(),this.matTex?.dispose(),this.colorTex=new ws(t),this.colorTex.colorSpace=Le,this.colorTex.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),this.matTex=new ws(e),this.garmentMats.forEach(r=>r.dispose());let s=r=>new gr({map:this.colorTex,roughnessMap:this.matTex,metalnessMap:this.matTex,roughness:1,metalness:1,transparent:!0,alphaTest:.04,side:r});this.garmentMats=[s(we),s(rn)]}this.colorTex.needsUpdate=!0,this.matTex.needsUpdate=!0,this.grid=n,this.buildGarment()}opaque(t,e){let n=this.grid;if(!n)return!1;let[s,r]=this.toBoard(t,e),o=Math.floor(s/n.step),a=Math.floor(r/n.step);return o<0||a<0||o>=n.w||a>=n.h?!1:n.data[a*n.w+o]>0}runAt(t,e,n){let s=this.box.w/this.grid.w*.999,r=(c,l)=>{let u=c,d=0,h=c;for(;Math.abs(u-e)<this.box.w/2;)if(u+=l*s,this.opaque(u,t))h=u,d=0;else if(++d>3)break;return h};if(this.opaque(e,t))return{l:r(e,-1),r:r(e,1)};let o=null,a=null;for(let c=s;c<n&&(o===null&&this.opaque(e-c,t)&&(o=e-c),a===null&&this.opaque(e+c,t)&&(a=e+c),!(o!==null&&a!==null));c+=s);return o===null||a===null?null:{l:r(o,-1),r:r(a,1)}}buildGarment(){for(let b of this.garmentGroup.children)b.geometry.dispose();if(this.garmentGroup.clear(),!this.grid||!this.grid.any){this.measure=null;return}let t=this.spec,e=.007,n=b=>this.uvOf(b),s=(b,R)=>b.map((x,v)=>{let I=b[Math.max(0,v-1)],L=b[Math.min(b.length-1,v+1)];return{...x,[R]:(I[R]+2*x[R]+L[R])/4}}),r=b=>{let R=this.denseLeg;if(b>R[0].y)return null;for(let x=0;x<R.length-1;x++)if(b<=R[x].y&&b>=R[x+1].y){let v=(R[x].y-b)/(R[x].y-R[x+1].y);return{x:R[x].x+(R[x+1].x-R[x].x)*v,r:R[x].r+(R[x+1].r-R[x].r)*v}}return R[R.length-1]},o=(b,R)=>{let x=r(b),v=x?x.x+x.r:0,I=x?x.r*1.15:0;return{a:Math.max(R?R.a:0,v)+e,b:Math.max(R?R.b:0,I)+e}},a=[],c=(b,R,x,v)=>{let I=this.runAt(b,0,x),L=R.a,U=R.b,B=0;if(I){let H=(I.r-I.l)/2;H>L&&(U+=(H-L)*.95,L=H,B=(I.l+I.r)/2)}return{y:b,a:L,b:U,cx:B,body:v,hit:!!I}};for(let b of[...this.denseTorso].reverse())if(!(b.y>t.y.neckTop)){if(b.y>=t.y.waist){a.push({y:b.y,a:b.a+e,b:b.b+e,cx:0,body:b.a});continue}a.push(c(b.y,o(b.y,b),b.a*1.1,b.a))}let l=t.H*.008,u=null,d=0;for(let b=a[a.length-1].y-l;b>t.H*.005;b-=l){let R=o(b,null),x=c(b,R,R.a*.9,R.a-e);if(!x.hit){if(++d>2)break;continue}d=0,a.push(x),u=b}let h=0,f=0;for(let b of a)if(!(b.y>t.y.hip)&&(b.a<h&&(b.cx=b.cx*(b.a/h),b.a=h),b.b<f&&(b.b=f),h=b.a,f=b.b,b.y<t.y.crotch&&!b.hit))break;let g=a;for(let b=0;b<3;b++)g=s(s(g,"a"),"b");for(let b=0;b<6;b++)g=s(g,"cx");let _=(b,R)=>this.uvOf([R&&R.cx!==void 0?R.cx+(b[0]-R.cx)*.975:b[0],b[1]]),m=(b,R,x)=>{let v=b.cx+b.a*R,I=b.a-e>b.body*1.2?0:t.bulge(b.y,v-b.cx,b.body,x);return[v,b.y,b.b*x+I]},p=g,E=!1,A=()=>{for(let b of this.clothGroup.children)b.geometry.dispose();this.clothGroup.clear(),this.cloth=null,this.clothKey=null};if(u===null)A();else{let b=g.findIndex(x=>x.y<=t.y.waist);b<0&&(b=0);let R=g.length-1;for(;R>b&&!g[R].hit;)R--;if(R-b>=3){p=g.slice(0,b+1);let x=g.slice(b,R+1),v=x[0].y,I=x[x.length-1].y,L=Math.max(8,Math.min(48,Math.round((v-I)/.022))),U=z=>{for(let Q=0;Q<x.length-1;Q++)if(z<=x[Q].y&&z>=x[Q+1].y){let ct=(x[Q].y-z)/(x[Q].y-x[Q+1].y||1),lt=x[Q],Z=x[Q+1];return{y:z,a:lt.a+(Z.a-lt.a)*ct,b:lt.b+(Z.b-lt.b)*ct,cx:lt.cx+(Z.cx-lt.cx)*ct,body:lt.body+(Z.body-lt.body)*ct}}return{...x[x.length-1],y:z}},B=Array.from({length:L+1},(z,Q)=>U(v+(I-v)*Q/L));B[0]={...x[0]};let H=this.dominantFabric(B),W=fh(H),j=H+"|"+B.map(z=>[z.y,z.a,z.b,z.cx].map(Q=>Q.toFixed(3)).join(",")).join(";");if(this.cloth&&j===this.clothKey)E=!0;else{A(),this.clothKey=j,this.clothFabric=H;let z=this.cloth=new La({rings:B,phys:W,uvFn:_,pointFn:m,collide:this.makeCollider()});z.frame={angle:this.move.angle,x:this.move.x,z:0},z.wind=this.move.breeze?2.2:0,z.settle(90),z.sync();for(let[Q,ct]of this.garmentMats.entries()){let lt=new ne(z.geometry,ct);lt.castShadow=Q===1,lt.receiveShadow=!0,lt.renderOrder=1+Q,lt.userData.garment=!0,lt.frustumCulled=!1,this.clothGroup.add(lt)}this.wake()}}else A()}let T=[ks(p,m,{uvFn:_})],w=b=>u!==null&&b>=u-l;for(let b of[-1,1]){let R=this.denseLeg.map(x=>{let v=x.r+e,I=b*x.x;if(!w(x.y)&&x.y<t.y.crotch){let L=this.runAt(x.y,I,x.r*1.3);if(L&&!this.opaque(0,x.y)){let U=(L.r-L.l)/2;U>v&&(v=U,I=(L.l+L.r)/2)}}return{y:x.y,r:v,x:I}});T.push(ks(s(R,"r"),(x,v,I)=>[x.x+x.r*v,x.y,x.r*.96*I],{uvFn:n}))}for(let b of[-1,1])T.push(ks(this.denseArm,(R,x,v)=>{let I=this.armPoint(b,R.d),L=R.r+e*.8+Math.max(0,1-R.d/(t.H*.06))*.012,U=Math.cos(Tn),B=Math.sin(Tn)*b;return[I.x+L*x*U*b,I.y+L*x*B*b,L*.94*v]},{uvFn:n}));for(let b of T)for(let[R,x]of this.garmentMats.entries()){let v=new ne(b,x);v.castShadow=R===1,v.renderOrder=1+R,v.userData.garment=!0,this.garmentGroup.add(v)}this.measure=this.measureGarment(g,u)}dominantFabric(t){let e=this.grid,n={};for(let o of t)for(let a=-10;a<=10;a++){let c=o.cx+o.a*a/10.5,[l,u]=this.toBoard(c,o.y),d=Math.floor(u/e.step)*e.w+Math.floor(l/e.step);if(d<0||d>=e.data.length||!e.data[d])continue;let h=e.fabricOf?e.fabricOf(e.ids[d]):"cotton";n[h]=(n[h]||0)+1}let s="cotton",r=0;for(let[o,a]of Object.entries(n))a>r&&(r=a,s=o);return s}makeCollider(){let t=this.spec,e=this.denseTorso,n=this.denseLeg,s=.009,r=l=>{for(let u=0;u<e.length-1;u++)if(l>=e[u].y&&l<=e[u+1].y){let d=(l-e[u].y)/(e[u+1].y-e[u].y);return{a:e[u].a+(e[u+1].a-e[u].a)*d,b:e[u].b+(e[u+1].b-e[u].b)*d}}return null},o=l=>{if(l>n[0].y)return null;for(let u=0;u<n.length-1;u++)if(l<=n[u].y&&l>=n[u+1].y){let d=(n[u].y-l)/(n[u].y-n[u+1].y);return{x:n[u].x+(n[u+1].x-n[u].x)*d,r:n[u].r+(n[u+1].r-n[u].r)*d}}return{x:n[n.length-1].x,r:n[n.length-1].r}},a=[-1,1].map(l=>{let u=this.armPoint(l,.02),d=this.armPoint(l,t.armLen+t.H*.07);return{ax:u.x,ay:u.y,bx:d.x,by:d.y,r:t.upperR*.9+s}}),c=t.y.waist+.03;return(l,u)=>{let d=l[u],h=l[u+1],f=l[u+2];if(h<.004&&(l[u+1]=h=.004),h<=c){let g=r(h);if(g){let m=Math.max(-1,Math.min(1,f/g.b)),p=t.bulge(h,d,g.a,m),E=g.a+s,A=g.b+s,y=f-p,T=d/E*(d/E)+y/A*(y/A);if(T<1){let w=1/Math.sqrt(Math.max(T,1e-6));d*=w,f=y*w+p,l[u]=d,l[u+2]=f}}let _=o(h);if(_)for(let m of[-1,1]){let p=m*_.x,E=d-p,A=_.r+s,y=E*E+f*f;if(y<A*A){let T=Math.sqrt(y)||1e-6;d=p+E/T*A,f=f/T*A,l[u]=d,l[u+2]=f}}}for(let g of a){let _=g.bx-g.ax,m=g.by-g.ay,p=Math.max(0,Math.min(1,((d-g.ax)*_+(h-g.ay)*m)/(_*_+m*m))),E=g.ax+_*p,A=g.ay+m*p,y=d-E,T=h-A,w=y*y+T*T+f*f;if(w<g.r*g.r){let b=Math.sqrt(w)||1e-6,R=g.r/b;l[u]=E+y*R,l[u+1]=A+T*R,l[u+2]=f*R}}}}measureGarment(t,e){let n=this.spec,s=h=>t.reduce((f,g)=>Math.abs(g.y-h)<Math.abs(f.y-h)?g:f,t[0]),r=h=>this.opaque(0,h)||!!this.runAt(h,0,n.half.hip),o=h=>{if(!r(h))return null;let f=s(h);return _d(f.a,f.b)*100},a=null,c=null;for(let h=n.y.neckTop;h>0;h-=n.H*.004)r(h)&&(a===null&&(a=h),c=h);let l=null;for(let h=n.y.crotch;h>0;h-=n.H*.004){let f=this.denseLeg[0].x;this.runAt(h,f,.08)&&!r(h)&&(l=h)}let u={bust:o(n.y.bust),waist:o(n.y.waist),hip:o(n.y.hip),length:a!==null?(a-c)*100:null,hem:e!==null?o(e):c!==null&&c>n.y.crotch?o(c):null,inseam:l!==null?(n.y.crotch-l)*100:null},d=null;for(let h=0;h<=this.spec.armLen;h+=.005){let f=this.armPoint(1,h);if(this.opaque(f.x,f.y))d=h;else if(d!==null&&h-d>.03)break}return u.sleeve=d!==null?d*100:null,u}pick(t,e){let n=this.renderer.domElement.getBoundingClientRect(),s=new Dt((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),r=new vr;r.setFromCamera(s,this.camera);let o=r.intersectObjects([...this.garmentGroup.children,...this.clothGroup.children,...this.bodyGroup.children],!1);for(let a of o){if(!a.object.userData.garment)return null;if(!a.uv)continue;let c=a.uv.x*this.BW,l=(1-a.uv.y)*this.BH,u=this.grid;if(u.data[Math.floor(l/u.step)*u.w+Math.floor(c/u.step)])return[Math.round(c),Math.round(l)]}return null}view(t){this.move.spin=!1,this.move.home=Math.round(this.move.angle/(Math.PI*2))*Math.PI*2,this.wake();let e=this.spec.H,n=e*2.55,s=e*.62,r=t==="back"?new N(0,s,-n):t==="side"?new N(n,s,0):t==="close"?new N(0,e*.7,e*1.4):new N(0,s,n);this.anim={from:this.camera.position.clone(),to:r,start:performance.now()}}setAutoRotate(t){this.move.spin=t,t&&(this.move.home=null),this.wake()}setSway(t){this.move.sway=t,this.move.t=0,this.wake()}setBreeze(t){this.move.breeze=t,this.cloth&&(this.cloth.wind=t?2.2:0),this.wake()}twirl(){this.move.twirl={t:0,from:this.move.angle},this.move.spin=!1,this.wake()}wake(){this.clothAwake=240}updateMotion(t){let e=this.move;e.t+=t;let n=e.angle,s=0;if(e.twirl){let c=Math.min(1,(e.twirl.t+=t)/2.6),l=c<.5?2*c*c:1-Math.pow(-2*c+2,2)/2;n=e.twirl.from+l*Math.PI*4,c>=1&&(e.twirl=null)}else if(e.spin)n+=t*.7;else if(e.home!==null){let a=e.home-n;n+=a*Math.min(1,t*5),Math.abs(a)<.002&&(n=e.home,e.home=null)}e.sway&&(s=.035*Math.sin(e.t*Math.PI*2/1.4),n+=.012*Math.cos(e.t*Math.PI*2/1.4)),e.angle=n,e.x=s,this.figure.rotation.y=n,this.figure.position.x=s;let r=this.cloth;if(!r)return;let o=e.spin||e.sway||e.breeze||e.twirl||e.home!==null;if(o&&(this.clothAwake=240),this.clothAwake>0){r.setFrame(n,s,0);let a=2,c=0;for(let l=0;l<a;l++)c=r.step(Math.max(1/240,t/a));r.sync(),!o&&c<2e-5&&this.clothAwake--}}setBackground(t){this.scene.background=new kt(t)}screenshot(){return this.tick(),this.renderer.domElement.toDataURL("image/png")}async exportGLB(){let t=new sn;this.bodyGroup.children.forEach(r=>t.add(new ne(r.geometry,r.material).copy(r,!1)));let e=this.garmentGroup.children.filter(r=>r.material.side===rn),n=this.garmentMats[1]?.clone();n&&(n.side=$e),e.forEach(r=>{let o=new ne(r.geometry,n);o.rotation.copy(this.figure.rotation),o.position.copy(this.figure.position),t.add(o)}),this.clothGroup.children.filter(r=>r.material.side===rn).forEach(r=>t.add(new ne(r.geometry.clone(),n)));let s=new qi;return new Promise((r,o)=>s.parse(t,a=>r(new Blob([a],{type:"model/gltf-binary"})),o,{binary:!0}))}};function k_(i,t,e){i/=255,t/=255,e/=255;let n=Math.max(i,t,e),s=Math.min(i,t,e),r=n-s,o=0;return r&&(o=n===i?(t-e)/r%6:n===t?(e-i)/r+2:(i-t)/r+4),[(o*60+360)%360,n?r/n:0,n]}function z_(i,t,e){let n=e*t,s=n*(1-Math.abs(i/60%2-1)),r=e-n,[o,a,c]=i<60?[n,s,0]:i<120?[s,n,0]:i<180?[0,n,s]:i<240?[0,s,n]:i<300?[s,0,n]:[n,0,s];return[(o+r)*255,(a+r)*255,(c+r)*255]}var Ua=class{constructor(t,e){this.onChange=e,t.innerHTML=`
      <div class="cp-sv"><canvas></canvas><div class="cp-knob"></div></div>
      <div class="cp-hue"><canvas></canvas><div class="cp-knob"></div></div>
      <div class="cp-row"><span class="cp-chip"></span><label class="cp-hex">#<input maxlength="6" spellcheck="false" aria-label="Hex color code"></label>
        <span class="cp-rgb"></span></div>`,this.sv=t.querySelector(".cp-sv canvas"),this.svKnob=t.querySelector(".cp-sv .cp-knob"),this.hue=t.querySelector(".cp-hue canvas"),this.hueKnob=t.querySelector(".cp-hue .cp-knob"),this.chip=t.querySelector(".cp-chip"),this.hexIn=t.querySelector(".cp-hex input"),this.rgbOut=t.querySelector(".cp-rgb"),this.h=340,this.s=.6,this.v=.9;let n=(s,r)=>{s.addEventListener("pointerdown",o=>{s.setPointerCapture(o.pointerId),r(o);let a=l=>r(l),c=()=>{s.removeEventListener("pointermove",a),s.removeEventListener("pointerup",c),this.emit(!0)};s.addEventListener("pointermove",a),s.addEventListener("pointerup",c)})};n(this.sv.parentElement,s=>{let r=this.sv.getBoundingClientRect();this.s=Math.min(1,Math.max(0,(s.clientX-r.left)/r.width)),this.v=1-Math.min(1,Math.max(0,(s.clientY-r.top)/r.height)),this.update(),this.emit(!1)}),n(this.hue.parentElement,s=>{let r=this.hue.getBoundingClientRect();this.h=Math.min(359.9,Math.max(0,(s.clientX-r.left)/r.width*360)),this.drawSV(),this.update(),this.emit(!1)}),this.hexIn.addEventListener("change",()=>{let s=this.hexIn.value.trim().replace("#","");/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s)?(this.set("#"+s),this.emit(!0)):this.update()}),new ResizeObserver(()=>this.drawAll()).observe(t)}get hex(){let[t,e,n]=z_(this.h,this.s,this.v);return Br(t,e,n)}set(t){let[e,n,s]=Ji(t),[r,o,a]=k_(e,n,s);o>.01&&a>.01&&(this.h=r),this.s=o,this.v=a,this.drawSV(),this.update()}emit(t){this.onChange(this.hex,t)}drawAll(){this.drawSV(),this.drawHue(),this.update()}drawSV(){let t=this.sv,e=t.clientWidth,n=t.clientHeight;if(!e)return;t.width=e,t.height=n;let s=t.getContext("2d");s.fillStyle=`hsl(${this.h},100%,50%)`,s.fillRect(0,0,e,n);let r=s.createLinearGradient(0,0,e,0);r.addColorStop(0,"#fff"),r.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=r,s.fillRect(0,0,e,n),r=s.createLinearGradient(0,0,0,n),r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(1,"#000"),s.fillStyle=r,s.fillRect(0,0,e,n)}drawHue(){let t=this.hue,e=t.clientWidth,n=t.clientHeight;if(!e)return;t.width=e,t.height=n;let s=t.getContext("2d"),r=s.createLinearGradient(0,0,e,0);for(let o=0;o<=6;o++)r.addColorStop(o/6,`hsl(${o*60},100%,50%)`);s.fillStyle=r,s.fillRect(0,0,e,n)}update(){let t=this.hex,[e,n,s]=Ji(t);this.svKnob.style.left=this.s*100+"%",this.svKnob.style.top=(1-this.v)*100+"%",this.svKnob.style.background=t,this.hueKnob.style.left=this.h/360*100+"%",this.chip.style.background=t,document.activeElement!==this.hexIn&&(this.hexIn.value=t.slice(1).toUpperCase()),this.rgbOut.textContent=`R ${e}  G ${n}  B ${s}`}};var vd=[{id:"dress",name:"A-line dress"},{id:"gown",name:"Ball gown"},{id:"top",name:"T-shirt"},{id:"skirt",name:"Skirt"},{id:"pants",name:"Trousers"}];function zs(i,t,e){e&&(t=[...t,t[0],t[1]]),i.moveTo(t[0][0],t[0][1]);for(let n=1;n<t.length-1;n++){let s=(t[n][0]+t[n+1][0])/2,r=(t[n][1]+t[n+1][1])/2;i.quadraticCurveTo(t[n][0],t[n][1],s,r)}e||i.lineTo(t[t.length-1][0],t[t.length-1][1])}function Md(i,t,e,n){let s=(h,f)=>e.toBoard(h,f),r=t.y,o=t.half,a=t.H,c=h=>[...h,...h.slice().reverse().map(([f,g])=>[-f,g])],l=o.shoulder,u=o.neck*2,d=[[-l*.8,r.shoulder-.004],[-o.bust-.004,r.armpit-.015],[-o.bust-.012,r.bust],[-o.waist-.012,r.waist]];if(n.beginPath(),i==="dress"){let h=r.knee+.04,f=[[-u,r.neckBase+.002],...d,[-o.hip-.02,r.hip],[-o.hip-.1,(r.hip+h)/2],[-o.hip-.15,h]],g=c(f).map(([w,b])=>s(w,b));zs(n,g.slice(0,g.length/2),!1);let[_,m]=[s(-o.hip-.15,h),s(o.hip+.15,h)],p=s(0,h-.025);n.quadraticCurveTo(p[0],p[1],m[0],m[1]),zs(n,g.slice(g.length/2),!1);let E=s(-u,r.neckBase+.002),A=s(0,r.neckBase-.075);n.quadraticCurveTo(A[0],A[1],E[0],E[1]),n.stroke(),n.beginPath();let y=s(-o.waist-.012,r.waist),T=s(o.waist+.012,r.waist);n.moveTo(y[0],y[1]),n.lineTo(T[0],T[1]),n.stroke()}else if(i==="gown"){let h=r.bust+.045,f=.012,g=o.hip+.32,m=[[-o.bust-.006,h],[-o.bust-.01,r.bust],[-o.waist-.01,r.waist],[-o.hip-.05,r.hip],[-o.hip-.2,(r.hip+f)/2],[-g,f+.03]].map(([I,L])=>s(I,L)),p=s(0,r.bust+.012),E=s(-o.bust*.5,h+.018),A=s(o.bust*.5,h+.018),y=s(-o.bust-.006,h),T=s(o.bust+.006,h);n.moveTo(p[0],p[1]),n.quadraticCurveTo(E[0],E[1]-20,y[0],y[1]),zs(n,m,!1);let w=s(-g,f+.03),b=s(0,f-.015),R=s(g,f+.03);n.quadraticCurveTo(b[0],b[1],R[0],R[1]),zs(n,m.slice().reverse().map(([I,L])=>[2*s(0,0)[0]-I,L]),!1),n.quadraticCurveTo(A[0],A[1]-20,p[0],p[1]),n.stroke(),n.beginPath();let x=s(-o.waist-.01,r.waist),v=s(o.waist+.01,r.waist);n.moveTo(x[0],x[1]),n.lineTo(v[0],v[1]),n.stroke()}else if(i==="top"){let h=r.hip+.03,f=t.upperR*1.35,g=a*.1,_=T=>{let w=e.armPoint(T,.005),b=e.armPoint(T,g),R=Math.cos(Tn)*T,x=Math.sin(Tn);return{so:[w.x+R*f,w.y+x*f],eo:[b.x+R*f,b.y+x*f],ei:[b.x-R*f,b.y-x*f]}},m=_(-1),p=_(1),A=[[-u,r.neckBase+.003],[-l*.8,r.shoulder],m.so,m.eo,m.ei,[-o.bust-.02,r.armpit-.03],[-o.waist-.03,r.waist],[-o.hip-.03,h],[o.hip+.03,h],[o.waist+.03,r.waist],[o.bust+.02,r.armpit-.03],p.ei,p.eo,p.so,[l*.8,r.shoulder],[u,r.neckBase+.003]].map(([T,w])=>s(T,w));n.moveTo(A[0][0],A[0][1]);for(let T=1;T<A.length;T++)n.lineTo(A[T][0],A[T][1]);let y=s(0,r.neckBase-.04);n.quadraticCurveTo(y[0],y[1],A[0][0],A[0][1]),n.stroke()}else if(i==="skirt"){let h=r.knee+.07,g=[[-o.waist-.014,r.waist],[-o.hip-.02,r.hip],[-o.hip-.09,h]].map(([y,T])=>s(y,T)),_=s(0,0)[0];zs(n,g,!1);let m=s(0,h-.02),p=s(o.hip+.09,h);n.quadraticCurveTo(m[0],m[1],p[0],p[1]),zs(n,g.slice().reverse().map(([y,T])=>[2*_-y,T]),!1),n.closePath(),n.stroke(),n.beginPath();let E=s(-o.waist-.014,r.waist-.035),A=s(o.waist+.014,r.waist-.035);n.moveTo(E[0],E[1]),n.lineTo(A[0],A[1]),n.stroke()}else if(i==="pants"){let h=t.leg[7],f=r.ankle+.025,g=h.x+h.r+.035,_=Math.max(.01,h.x-h.r-.03),p=[[-o.waist-.014,r.waist],[-o.hip-.02,r.hip],[-(t.legX+t.leg[1].r)-.02,r.crotch-.02],[-g,r.knee],[-g,f],[-_,f],[-_+.005,r.knee],[0,r.crotch-.015],[_-.005,r.knee],[_,f],[g,f],[g,r.knee],[t.legX+t.leg[1].r+.02,r.crotch-.02],[o.hip+.02,r.hip],[o.waist+.014,r.waist]].map(([y,T])=>s(y,T));n.moveTo(p[0][0],p[0][1]);for(let y=1;y<p.length;y++)n.lineTo(p[y][0],p[y][1]);n.closePath(),n.stroke(),n.beginPath();let E=s(-o.waist-.014,r.waist-.035),A=s(o.waist+.014,r.waist-.035);n.moveTo(E[0],E[1]),n.lineTo(A[0],A[1]),n.stroke()}}var H_="atelier-studio",Vl="designs",Hl=null;function V_(){return Hl||(Hl=new Promise((i,t)=>{let e=indexedDB.open(H_,1);e.onupgradeneeded=()=>e.result.createObjectStore(Vl,{keyPath:"id"}),e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error)})),Hl}async function Na(i,t){let e=await V_();return new Promise((n,s)=>{let r=e.transaction(Vl,i),o=r.objectStore(Vl),a=t(o);r.oncomplete=()=>n(a?.result),r.onerror=()=>s(r.error)})}var Hs=i=>Na("readwrite",t=>t.put(i)),Gl=i=>Na("readonly",t=>t.get(i)),bd=i=>Na("readwrite",t=>t.delete(i));async function Sd(){return(await Na("readonly",t=>t.getAll())||[]).sort((t,e)=>e.updated-t.updated)}var Fa=()=>"d"+Date.now().toString(36)+Math.random().toString(36).slice(2,7),G_=i=>new Promise(t=>{let e=new FileReader;e.onload=()=>t(e.result),e.readAsDataURL(i)}),W_=async i=>(await fetch(i)).blob();async function Wl(i){let t={app:"Atelier Studio",version:1,name:i.name,created:i.created,updated:i.updated,body:i.body,portfolio:!!i.portfolio,notes:i.notes||"",fills:i.fills||{},layers:{}};for(let e of["color","mat","lines"])i.layers?.[e]&&(t.layers[e]=await G_(i.layers[e]));return new Blob([JSON.stringify(t)],{type:"application/json"})}async function Xl(i){let t=JSON.parse(i);if(t.app!=="Atelier Studio")throw new Error("This is not an Atelier Studio design file.");let e={};for(let n of["color","mat","lines"])t.layers?.[n]&&(e[n]=await W_(t.layers[n]));return{id:Fa(),name:t.name||"Imported design",created:t.created||Date.now(),updated:Date.now(),body:t.body,portfolio:!!t.portfolio,notes:t.notes||"",fills:t.fills||{},layers:e}}var q_={pencil:'<path d="M4 20l4-1L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4z"/><path d="M14 7l3 3"/>',cube:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/>',grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',star:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8-4.3-4.1 5.9-.8z"/>',starFill:'<path fill="currentColor" d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8-4.3-4.1 5.9-.8z"/>',more:'<circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/>',plus:'<path d="M12 5v14M5 12h14"/>',folder:'<path d="M3 7h6l2 2h10v10H3z"/>',save:'<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',image:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>',trash:'<path d="M5 7h14M10 7V4h4v3M6 7l1 13h10l1-13"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',bucket:'<path d="M5 11l7-7 7 7-7 7z"/><path d="M5 11h14"/><path d="M20 15s2 2.3 2 3.5a2 2 0 0 1-4 0c0-1.2 2-3.5 2-3.5z"/>',brush:'<path d="M14 4l6 6-7.5 7.5-6-6z"/><path d="M6.5 11.5C4 12 3 14 3 16c0 2-1 3-1 3s4 1 6-1c1.5-1.5 1-3.5 1-3.5"/>',pen:'<path d="M3 21l3-1 12-12-2-2L4 18z"/><path d="M14 6l2-2 4 4-2 2"/>',eraser:'<path d="M8 20h12"/><path d="M4 15l9-9 6 6-7 7H8z"/><path d="M9 10l6 6"/>',magic:'<path d="M4 20L16 8"/><path d="M15 4v3M19 8h-3M18 5l-2 2M9 4l.5 1.5L11 6l-1.5.5L9 8l-.5-1.5L7 6l1.5-.5z"/>',dropper:'<path d="M14 4l6 6-2 2-6-6z"/><path d="M12 8l-7 7-1 5 5-1 7-7"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v6M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v8c0 4-2.5 7-6 7-2.5 0-4-1.2-5.5-3.5L3.8 15a1.5 1.5 0 0 1 2.4-1.8L8 15"/>',undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',redo:'<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/>',zoomin:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M11 8v6M8 11h6"/>',zoomout:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M8 11h6"/>',fit:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',figure:'<circle cx="12" cy="4.5" r="2"/><path d="M9 8h6l-1 6 2 7M10 8l1 6-2 7M9 8l-3 6M15 8l3 6"/>',spin:'<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v4h-4"/>',dress:'<path d="M9 3l-1 4 2 3-5 11h14L14 10l2-3-1-4"/><path d="M9 3c1 1.5 5 1.5 6 0M8 10h8"/>',gown:'<path d="M9 4c1 2 5 2 6 0l-.5 5H9.5z"/><path d="M9.5 9L3 21h18L14.5 9"/>',top:'<path d="M8 4L3 7l2 4 2-1v10h10V10l2 1 2-4-5-3c-1 2-7 2-8 0z"/>',skirt:'<path d="M8 5h8l4 15H4z"/><path d="M8 8h8"/>',pants:'<path d="M7 4h10l2 17h-5l-2-11-2 11H5z"/><path d="M7 7h10"/>',copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',download:'<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>'};function $n(i){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${q_[i]||""}</svg>`}function wd(i=document){i.querySelectorAll(".i[data-i]").forEach(t=>{t.firstChild||(t.innerHTML=$n(t.dataset.i))})}var $=(i,t=document)=>t.querySelector(i),je=(i,t=document)=>[...t.querySelectorAll(i)],Xe={get:(i,t)=>{try{let e=localStorage.getItem("atelier."+i);return e===null?t:JSON.parse(e)}catch{return t}},set:(i,t)=>{try{localStorage.setItem("atelier."+i,JSON.stringify(t))}catch{}}};wd();var at=new kr($("#board")),Ce=new Da($("#view3d")),Fe="sketch",be=null,le=kl(),Lr=null,Vs=Xe.get("units","in");function Ue(i,t=3200){let e=document.createElement("div");e.className="toast",e.textContent=i,$("#toasts").appendChild(e),setTimeout(()=>e.remove(),t)}at.onToast=Ue;async function Zl(i,t){let e=document.createElement("div");e.className="busy",e.textContent=i,document.body.appendChild(e),await new Promise(n=>requestAnimationFrame(()=>setTimeout(n,20)));try{return await t()}finally{e.remove()}}function Pr(i,t){let e=document.createElement("a");e.href=URL.createObjectURL(i),e.download=t,document.body.appendChild(e),e.click(),e.remove(),setTimeout(()=>URL.revokeObjectURL(e.href),4e3)}var Oa=()=>(be?.name||"design").replace(/[^\w\- ]+/g,"").trim().replace(/\s+/g,"-")||"design";function $l(i=!0){Lr=Ce.setBody(le,ot,Et),at.guide=Ce.renderGuide(ot/2,Et/2),at.dirty=!0,i&&Fe==="3d"&&jn(),Rd(),za()}function Rd(){je("#bodyType button").forEach(s=>s.classList.toggle("on",s.dataset.v===le.type));let i=Object.keys(Cr[le.type].sizes);$("#bodySize").innerHTML=i.map(s=>`<button data-v="${s}" class="${s===le.size?"on":""}">${le.type==="kids",s}</button>`).join(""),je(".height-row").forEach(s=>{s.hidden=le.type==="kids"}),je("#bodyHeight button").forEach(s=>s.classList.toggle("on",s.dataset.v===le.height)),$("#skinTones").innerHTML=Ir.map(s=>`<button class="chip ${s.id===le.skin?"on":""}" data-v="${s.id}" title="${s.name}" style="background:${s.color}"></button>`).join("");let t=Pa(le),e=[["height","Height"],["bust",le.type==="women"?"Bust":"Chest"],["waist","Waist"],["hip","Hip"]],n=$("#customBody");n.contains(document.activeElement)||(n.innerHTML=e.map(([s,r])=>`<label>${r} (${Vs})<input type="number" step="0.5" data-k="${s}" value="${Cd(t[s])}"></label>`).join(""))}$("#bodyType").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(le.type=t,le.size=Object.keys(Cr[t].sizes)[2],le.custom=null,Gs())});$("#bodySize").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(le.size=t,le.custom=null,Gs())});$("#bodyHeight").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(le.height=t,Gs())});$("#skinTones").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(le.skin=t,Gs())});$("#customBody").addEventListener("change",i=>{let t=i.target.dataset.k;if(!t)return;let e=parseFloat(i.target.value);if(!(e>0))return;let n=Vs==="in"?e*2.54:e,s={height:[80,230],bust:[40,180],waist:[35,170],hip:[40,180]}[t];le.custom={...le.custom||{},[t]:Math.min(s[1],Math.max(s[0],n))},Gs()});$("#customReset").addEventListener("click",()=>{le.custom=null,$("#customBody").innerHTML="",Gs()});function Gs(){$l(!0),Ql()}function Cd(i){return Vs==="in"?(Math.round(i/2.54*4)/4).toString():(Math.round(i*2)/2).toString()}var ln=i=>i==null?null:`${Cd(i)} ${Vs==="in"?"in":"cm"}`;function za(){let i=Pa(le),t=Ce.measure||{},e=(r,o)=>`<tr><td>${r}</td><td class="${o==null?"na":""}">${o??"\u2013"}</td></tr>`,n=le.type==="women"?"Bust":"Chest",s='<tr><th colspan="2">Mannequin</th></tr>'+e("Height",ln(i.height))+e(n,ln(i.bust))+e("Waist",ln(i.waist))+e("Hip",ln(i.hip))+e("Shoulder width",ln(i.shoulder))+e("Inseam",ln(i.inseam));s+=`<tr><th colspan="2">Garment${Fe==="3d"?"":" (open 3D to measure)"}</th></tr>`+e(n,ln(t.bust))+e("Waist",ln(t.waist))+e("Hip",ln(t.hip))+e("Length",ln(t.length))+e("Hem around",ln(t.hem))+e("Sleeve",ln(t.sleeve))+e("Inseam",ln(t.inseam)),$("#measTable").innerHTML=s}$("#units").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(Vs=t,Xe.set("units",t),je("#units button").forEach(e=>e.classList.toggle("on",e.dataset.v===t)),$("#customBody").innerHTML="",Rd(),za())});je("#units button").forEach(i=>i.classList.toggle("on",i.dataset.v===Vs));var Ba=Xe.get("recent",["#e85d8a","#1d3a8a","#ffffff","#1a1a1a","#d4af37"]),Id=new Ua($("#colorPicker"),(i,t)=>{Ha(i,t,!0)});function Ha(i,t=!0,e=!1){at.paint.color=i,e||Id.set(i),t&&(Ba=[i,...Ba.filter(n=>n!==i)].slice(0,12),Xe.set("recent",Ba),Pd()),Jl(),Kl(),Xe.set("paint",at.paint)}function Pd(){$("#recent").innerHTML=Ba.map(i=>`<button class="chip" data-c="${i}" style="background:${i}" title="${i}"></button>`).join("")}$("#recent").addEventListener("click",i=>{let t=i.target.dataset.c;t&&Ha(t)});$("#palettes").innerHTML=dh.map(i=>`<div class="palette"><div class="palette-name">${i.name}</div><div class="chips">${i.colors.map(t=>`<button class="chip" data-c="${t}" style="background:${t}" title="${t}"></button>`).join("")}</div></div>`).join("");$("#palettes").addEventListener("click",i=>{let t=i.target.dataset.c;t&&Ha(t)});at.onPick=([i,t,e])=>{Ha(Br(i,t,e)),Ue("Color picked")};var Td="";function Kl(){let i=at.paint.color+at.paint.fabric;if(i===Td)return;Td=i;let t=[...new Set(Or.map(e=>e.group))];$("#fabricGrid").innerHTML=t.map(e=>`<div class="fab-group">${e}</div><div class="fab-grid">${Or.filter(n=>n.group===e).map(n=>`<button class="fab ${n.id===at.paint.fabric?"on":""}" data-f="${n.id}" title="${n.name}"><img alt="" src="${Qa(n.id,at.paint.color)}">${n.name}</button>`).join("")}</div>`).join("")}$("#fabricGrid").addEventListener("click",i=>{let t=i.target.closest("[data-f]")?.dataset.f;t&&(at.paint.fabric=t,Xe.set("paint",at.paint),Kl(),Jl(),at.tool!=="fill"&&at.tool!=="brush"&&Fe==="sketch"&&Yi("fill"))});$("#fabricScale").addEventListener("input",i=>{at.paint.scale=+i.target.value,Xe.set("paint",at.paint)});function Jl(){$("#paintSwatch").style.backgroundImage=`url(${Qa(at.paint.fabric,at.paint.color)})`,$("#paintFabric").textContent=uh[at.paint.fabric]?.name||"Fabric",$("#paintHex").textContent=at.paint.color.toUpperCase()}function Yi(i){at.tool=i,je(".tools [data-tool]").forEach(t=>t.classList.toggle("on",t.dataset.tool===i)),$("#boardWrap").className="board-wrap tool-"+i}je(".tools [data-tool]").forEach(i=>i.addEventListener("click",()=>Yi(i.dataset.tool)));$("#btnUndo").addEventListener("click",()=>{at.undo(),Fe==="3d"&&jn()});$("#btnRedo").addEventListener("click",()=>{at.redo(),Fe==="3d"&&jn()});at.onHistory=(i,t)=>{$("#btnUndo").disabled=!i,$("#btnRedo").disabled=!t};$("#btnZoomIn").addEventListener("click",()=>at.zoomBy(1.25));$("#btnZoomOut").addEventListener("click",()=>at.zoomBy(.8));$("#btnFit").addEventListener("click",()=>at.fit());$("#btnGuide").addEventListener("click",i=>{at.showGuide=!at.showGuide,i.currentTarget.classList.toggle("on",at.showGuide),at.dirty=!0});$("#brushSize").addEventListener("input",i=>{at.brushSize=+i.target.value,at.dirty=!0});$("#gapClose").addEventListener("input",i=>{at.gap=+i.target.value});$("#guideOpacity").addEventListener("input",i=>{at.guideOpacity=+i.target.value,at.dirty=!0});$("#eraseTarget").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(at.eraseTarget=t,je("#eraseTarget button").forEach(e=>e.classList.toggle("on",e.dataset.v===t)))});var Ld=vd.map(i=>`<button class="starter" data-s="${i.id}"><span class="i">${$n(i.id==="top"?"top":i.id)}</span>${i.name}</button>`).join("");$("#starters").innerHTML=Ld;$("#starters2").innerHTML=Ld;function jl(i){at.drawLines(t=>Md(i,Lr,Ce,t)),Qn("#starterModal"),gi(),Yi("fill"),Ue("Outline added. Tap inside it with Fill to color it.")}$("#starters").addEventListener("click",i=>{let t=i.target.closest("[data-s]")?.dataset.s;t&&jl(t)});$("#starters2").addEventListener("click",i=>{let t=i.target.closest("[data-s]")?.dataset.s;t&&jl(t)});function Jn(i){if(i!==Fe){if(at.place){Ue("Place or cancel the drawing first.");return}Fe=i,document.body.classList.toggle("mode3d",i==="3d"),document.body.classList.toggle("modesketch",i==="sketch"),je(".mode button").forEach(t=>{t.classList.toggle("on",t.dataset.mode===i),t.setAttribute("aria-selected",t.dataset.mode===i)}),$("#boardWrap").hidden=i==="3d",$("#view3d").hidden=i!=="3d",$("#viewBtns").hidden=i!=="3d",$("#hint3d").hidden=i!=="3d",Ce.setVisible(i==="3d"),i==="3d"?(!at.hasColor()&&at.hasLines()?at.autoFillGarment()&&Ue("Your outline was filled in white so you can see it in 3D. Pick a fabric and tap the garment to change it.",5e3):at.hasColor()||Ue("Nothing to show yet. Color a design in Sketch first.",4e3),jn()):at.dirty=!0,gi(),za(),Xe.set("mode",i)}}je(".mode button").forEach(i=>i.addEventListener("click",()=>Jn(i.dataset.mode)));function jn(){Ce.setDesign(at.textureCanvas(),at.mat,at.alphaGrid()),za()}$("#viewBtns").addEventListener("click",i=>{let t=i.target.closest("button");if(t){if(t.id==="btnSpin"){let e=!t.classList.contains("on");t.classList.toggle("on",e),Ce.setAutoRotate(e);return}if(t.id==="btnTwirl"){$("#btnSpin").classList.remove("on"),Ce.twirl();return}if(t.id==="btnSway"){let e=!t.classList.contains("on");t.classList.toggle("on",e),Ce.setSway(e);return}if(t.id==="btnBreeze"){let e=!t.classList.contains("on");t.classList.toggle("on",e),Ce.setBreeze(e);return}$("#btnSpin").classList.remove("on"),Ce.view(t.dataset.view)}});{let i=$("#view3d"),t=null;i.addEventListener("pointerdown",e=>{t={x:e.clientX,y:e.clientY,t:performance.now()}}),i.addEventListener("pointerup",e=>{if(!t)return;let n=t;if(t=null,Math.hypot(e.clientX-n.x,e.clientY-n.y)>6||performance.now()-n.t>600)return;let s=Ce.pick(e.clientX,e.clientY);s&&at.fillAt(s[0],s[1])&&jn()})}var Dd=["#efe9e2","#ffffff","#e6eef5","#f3e1e7","#2b2228","#111114"];$("#bgChips").innerHTML=Dd.map(i=>`<button class="chip" data-c="${i}" style="background:${i}"></button>`).join("");$("#bgChips").addEventListener("click",i=>{let t=i.target.dataset.c;t&&(Ce.setBackground(t),Xe.set("bg",t))});Ce.setBackground(Xe.get("bg",Dd[0]));var Nn=null;function Ql(){clearTimeout(Nn),Nn=setTimeout(Fn,1200)}async function Fn(){if(clearTimeout(Nn),!be)return;be.updated=Date.now(),be.body={...le},be.name=$("#designName").value.trim()||"Untitled design";let i=await at.layerBlobs(),t=await new Promise(e=>at.composite(360).toBlob(e,"image/jpeg",.85));try{await Hs({...be,layers:i,thumb:t,fills:{...at.fillFabric}}),Xe.set("last",be.id)}catch(e){console.error(e),Ue("Could not save on this device: "+(e.message||e))}}at.onChange=()=>{Ql(),gi()};$("#designName").addEventListener("change",Ql);$("#designName").addEventListener("keydown",i=>{i.key==="Enter"&&i.target.blur()});window.addEventListener("beforeunload",()=>{Nn&&Fn()});document.addEventListener("visibilitychange",()=>{document.hidden&&Nn&&Fn()});async function Va(){Nn&&await Fn(),be={id:Fa(),name:"Untitled design",created:Date.now(),updated:Date.now(),body:{...le},portfolio:!1},Xa=!1,$("#designName").value=be.name,await at.loadLayers({}),Wa(),Jn("sketch"),gi()}async function Ga(i){Nn&&await Fn(),be={id:i.id,name:i.name,created:i.created,updated:i.updated,body:i.body,portfolio:!!i.portfolio,notes:i.notes||""},i.body&&(le={...kl(),...i.body},$l(!1)),$("#designName").value=i.name,await at.loadLayers({...i.layers||{},fills:i.fills}),Wa(),gi(),Fe==="3d"&&jn(),Xe.set("last",i.id)}function Wa(){let i=$("#btnPortfolio"),t=!!be?.portfolio;i.classList.toggle("starred",t),i.querySelector(".i").innerHTML=$n(t?"starFill":"star"),i.title=t?"In your portfolio (click to remove)":"Add this design to your portfolio"}$("#btnPortfolio").addEventListener("click",()=>{be&&(be.portfolio=!be.portfolio,Wa(),Fn(),Ue(be.portfolio?"Added to your portfolio.":"Removed from your portfolio."))});function gi(){let i=Fe==="sketch"&&!at.place&&!at.hasLines()&&!at.hasColor()&&!Xa;$("#welcome").hidden=!i}var Xa=!1;$("#welcome").addEventListener("click",i=>{let t=i.target.closest("[data-w]")?.dataset.w;t&&(t==="snap"?eh():t==="upload"?$("#fileImage").click():t==="starter"?Ur("#starterModal"):(Xa=!0,gi(),Yi("brush")))});function Ur(i){$(i).hidden=!1}function Qn(i){$(i).hidden=!0,i==="#cameraModal"&&Fd()}je(".modal").forEach(i=>i.addEventListener("click",t=>{(t.target===i||t.target.closest("[data-close]"))&&Qn("#"+i.id)}));var Kn=null;async function Ud(i){Kn={src:i};let t=gh(i),e=t>.12;$(`input[name=impMode][value=${e?"color":"lines"}]`).checked=!0,$("#impColorNote").textContent=e?"Looks like your drawing is colored in, so its colors will come in too.":"Looks like a pencil or ink drawing. It will come in as clean outlines.";let n=$("#impOrig");n.width=i.width,n.height=i.height,n.getContext("2d").drawImage(i,0,0),Ur("#importModal"),await th()}async function th(){if(!Kn)return;let i=$("input[name=impMode]:checked").value==="color",t=+$("#impStrength").value;Kn.result=await Zl("Cleaning up your drawing\u2026",()=>_h(Kn.src,{strength:t,keepColor:i}));let e=$("#impOut"),n=Kn.result;e.width=n.lines.width,e.height=n.lines.height;let s=e.getContext("2d");s.clearRect(0,0,e.width,e.height),n.color&&s.drawImage(n.color,0,0),s.drawImage(n.lines,0,0)}var Ed=null;je("input[name=impMode]").forEach(i=>i.addEventListener("change",th));$("#impStrength").addEventListener("input",()=>{clearTimeout(Ed),Ed=setTimeout(th,350)});function Ad(i,t){let e=document.createElement("canvas");return e.width=t.w,e.height=t.h,e.getContext("2d").drawImage(i,t.x,t.y,t.w,t.h,0,0,t.w,t.h),e}function Nd(i){let t=Kn.result,e=xh(t.lines,t.color),n=6,s={x:Math.max(0,e.x-n),y:Math.max(0,e.y-n)};s.w=Math.min(t.lines.width-s.x,e.w+n*2),s.h=Math.min(t.lines.height-s.y,e.h+n*2);let r=Ad(t.lines,s),o=t.color?Ad(t.color,s):null,a=s.h/s.w>2.1,[,c]=Ce.toBoard(0,a?Lr.H:Lr.y.neckBase+.01),[,l]=Ce.toBoard(0,a?0:Lr.y.knee),u={x:40,y:c,w:ot-80,h:l-c};if(Qn("#importModal"),Kn=null,Fe==="3d"&&Jn("sketch"),Xa=!0,at.startPlace(r,o,u),i){at.commitPlace(),Jn("3d"),Ue("Showing your drawing in 3D. Switch back to Sketch to adjust it.");return}$("#placeBar").hidden=!1,gi()}$("#impPlace").addEventListener("click",()=>Kn?.result&&Nd(!1));$("#impTo3D").addEventListener("click",()=>Kn?.result&&Nd(!0));$("#placeOk").addEventListener("click",()=>{at.commitPlace(),$("#placeBar").hidden=!0,Yi("fill"),Ue("Placed. Pick a fabric and tap a shape to fill it.")});$("#placeCancel").addEventListener("click",()=>{at.cancelPlace(),$("#placeBar").hidden=!0,gi()});async function qa(i){if(i)try{let t=await Zl("Opening picture\u2026",()=>mh(i));Ud(t)}catch(t){Ue(t.message||"Could not open that picture.")}}$("#btnUpload").addEventListener("click",()=>$("#fileImage").click());$("#fileImage").addEventListener("change",i=>{qa(i.target.files[0]),i.target.value=""});$("#fileCamera").addEventListener("change",i=>{qa(i.target.files[0]),i.target.value=""});window.addEventListener("dragover",i=>i.preventDefault());window.addEventListener("drop",i=>{i.preventDefault();let t=i.dataTransfer.files[0];t&&(/\.atelier$|json/i.test(t.name+t.type)?Od(t):qa(t))});window.addEventListener("paste",i=>{let t=[...i.clipboardData?.items||[]].find(e=>e.type.startsWith("image/"));t&&qa(t.getAsFile())});var ka=null,ql="environment";async function eh(){if(!navigator.mediaDevices?.getUserMedia){$("#fileCamera").click();return}Ur("#cameraModal");try{ka=await navigator.mediaDevices.getUserMedia({video:{facingMode:ql,width:{ideal:1920},height:{ideal:1440}},audio:!1});let i=$("#camVideo");i.srcObject=ka,await i.play()}catch{Qn("#cameraModal"),Ue("No camera available here, so pick a picture instead."),$("#fileCamera").click()}}function Fd(){ka?.getTracks().forEach(i=>i.stop()),ka=null}$("#btnSnap").addEventListener("click",eh);$("#camSwitch").addEventListener("click",async()=>{ql=ql==="environment"?"user":"environment",Fd(),Qn("#cameraModal"),await eh()});$("#camShoot").addEventListener("click",()=>{let i=$("#camVideo");if(!i.videoWidth)return;let t=ec(i,i.videoWidth,i.videoHeight);Qn("#cameraModal"),Ud(t)});var Yl="all";async function Dr(){let i=await Sd(),t=Yl==="portfolio"?i.filter(n=>n.portfolio):i,e=$("#designCards");if(e.querySelectorAll("img[data-url]").forEach(n=>URL.revokeObjectURL(n.src)),!t.length){e.innerHTML=`<div class="empty">${Yl==="portfolio"?"Nothing in your portfolio yet. Open a design and press the star to add it.":"No saved designs yet."}</div>`;return}e.innerHTML=t.map(n=>`<div class="card ${n.id===be?.id?"current":""}" data-id="${n.id}">
    <button class="card-img" data-a="open" title="Open">${n.thumb?`<img data-url alt="" src="${URL.createObjectURL(n.thumb)}">`:""}${n.portfolio?`<span class="card-star">${$n("starFill")}</span>`:""}</button>
    <div class="card-meta"><div class="card-name">${Y_(n.name)}</div><div class="card-date">${new Date(n.updated).toLocaleDateString()}</div></div>
    <div class="card-acts"><button data-a="star" title="${n.portfolio?"Remove from portfolio":"Add to portfolio"}">${$n(n.portfolio?"starFill":"star")}</button><button data-a="copy" title="Make a copy">${$n("copy")}</button><button data-a="file" title="Save design file">${$n("download")}</button><button data-a="del" title="Delete">${$n("trash")}</button></div></div>`).join("")}var Y_=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);$("#btnDesigns").addEventListener("click",async()=>{Nn&&await Fn(),Ur("#designsModal"),Dr()});$("#designFilter").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(Yl=t,je("#designFilter button").forEach(e=>e.classList.toggle("on",e.dataset.v===t)),Dr())});$("#designNew").addEventListener("click",async()=>{Qn("#designsModal"),await Va()});$("#designCards").addEventListener("click",async i=>{let t=i.target.closest("[data-a]")?.dataset.a,e=i.target.closest("[data-id]")?.dataset.id;if(!t||!e)return;let n=await Gl(e);if(n){if(t==="open")Qn("#designsModal"),await Ga(n);else if(t==="star")n.portfolio=!n.portfolio,await Hs(n),be?.id===e&&(be.portfolio=n.portfolio,Wa()),Dr();else if(t==="copy")await Hs({...n,id:Fa(),name:n.name+" (copy)",created:Date.now(),updated:Date.now()}),Dr();else if(t==="file")Pr(await Wl(n),(n.name||"design").replace(/[^\w\- ]+/g,"")+".atelier");else if(t==="del"){if(!confirm(`Delete "${n.name}"? This cannot be undone.`))return;await bd(e),be?.id===e&&(clearTimeout(Nn),Nn=null,await Va()),Dr()}}});async function Od(i){try{let t=await Xl(await i.text());await Hs(t),await Ga(t),Ue(`Opened "${t.name}".`)}catch(t){Ue(t.message||"Could not open that file.")}}$("#fileProject").addEventListener("change",i=>{let t=i.target.files[0];t&&Od(t),i.target.value=""});window.atelierDesktop?.onFlush?.(async()=>{try{await Fn()}finally{window.atelierDesktop.flushed()}});window.atelierDesktop?.onOpenFile?.(async(i,t)=>{try{let e=await Xl(t);await Hs(e),await Ga(e),Ue(`Opened "${e.name}".`)}catch(e){Ue(e.message||"Could not open that file.")}});$("#btnMore").addEventListener("click",i=>{i.stopPropagation(),$("#moreMenu").hidden=!$("#moreMenu").hidden});document.addEventListener("click",i=>{i.target.closest(".menu-wrap")||($("#moreMenu").hidden=!0)});$("#moreMenu").addEventListener("click",async i=>{let t=i.target.closest("[data-act]")?.dataset.act;if(t)if($("#moreMenu").hidden=!0,t==="new")await Va();else if(t==="open")$("#fileProject").click();else if(t==="save")await Fn(),Pr(await Wl({...be,body:le,layers:await at.layerBlobs(),fills:{...at.fillFabric}}),Oa()+".atelier");else if(t==="png")at.composite(Et,"#ffffff").toBlob(n=>Pr(n,Oa()+"-sketch.png"),"image/png");else if(t==="shot")Fe!=="3d"&&Jn("3d"),setTimeout(async()=>Pr(await(await fetch(Ce.screenshot())).blob(),Oa()+"-3d.png"),120);else if(t==="glb"){Fe!=="3d"&&Jn("3d");try{Pr(await Zl("Building the 3D model\u2026",()=>Ce.exportGLB()),Oa()+".glb")}catch(e){Ue("Could not export the 3D model: "+(e.message||e))}}else t==="clear"?confirm("Clear everything on the board? You can undo this.")&&(at.clearAll(),Fe==="3d"&&jn()):t==="about"&&Ur("#aboutModal")});$("#panelGrip").addEventListener("click",()=>$("#panel").classList.toggle("collapsed"));window.matchMedia("(max-width: 760px)").matches&&$("#panel").classList.add("collapsed");window.addEventListener("keydown",i=>{if(i.target.matches("input, textarea"))return;let t=i.key.toLowerCase();if((i.ctrlKey||i.metaKey)&&t==="z"){i.preventDefault(),i.shiftKey?at.redo():at.undo(),Fe==="3d"&&jn();return}if((i.ctrlKey||i.metaKey)&&t==="y"){i.preventDefault(),at.redo(),Fe==="3d"&&jn();return}if((i.ctrlKey||i.metaKey)&&t==="s"){i.preventDefault(),Fn().then(()=>Ue("Saved on this device."));return}if(i.ctrlKey||i.metaKey||i.altKey)return;if(t===" "){at.spaceDown=!0,$("#boardWrap").classList.add("space-pan"),i.preventDefault();return}if(t==="escape"){je(".modal").forEach(n=>{n.hidden||Qn("#"+n.id)}),at.place&&$("#placeCancel").click();return}if(t==="enter"&&at.place){$("#placeOk").click();return}if(t==="3"&&Jn(Fe==="3d"?"sketch":"3d"),Fe!=="sketch")return;let e={f:"fill",b:"brush",p:"pen",e:"eraser",i:"picker",h:"pan"};e[t]&&Yi(e[t]),(t==="+"||t==="=")&&at.zoomBy(1.25),t==="-"&&at.zoomBy(.8),t==="0"&&at.fit()});window.addEventListener("keyup",i=>{i.key===" "&&(at.spaceDown=!1,$("#boardWrap").classList.remove("space-pan"))});(async function(){let t=Xe.get("paint",null);t&&(at.paint={...at.paint,...t}),$("#fabricScale").value=at.paint.scale,Id.set(at.paint.color),Pd(),Kl(),Jl(),Yi("fill"),document.body.classList.add("modesketch"),$l(!1);let e=null;try{let n=Xe.get("last",null);e=n?await Gl(n):null}catch{}e?await Ga(e):await Va(),Xe.get("mode","sketch")==="3d"&&at.hasColor()&&Jn("3d"),window.atelierDesktop?.ready?.(),"serviceWorker"in navigator&&location.protocol.startsWith("http")&&navigator.serviceWorker.register("sw.js").catch(()=>{})})();window.atelier={board:at,viewer:Ce,get body(){return le},setMode:Jn,useStarter:jl,hexToRgb:Ji};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
