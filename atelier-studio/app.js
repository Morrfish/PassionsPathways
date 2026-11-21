function ts(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function sc(i,t){let e=ts(t),n=new Float32Array(i*i);for(let a=0;a<n.length;a++)n[a]=e();let s=new Float32Array(16384),r=128/i,o=a=>a*a*(3-2*a);for(let a=0;a<128;a++)for(let c=0;c<128;c++){let l=c/r,d=a/r,h=Math.floor(l),u=Math.floor(d),f=o(l-h),g=o(d-u),_=(h+1)%i,m=(u+1)%i,p=n[u*i+h],w=n[u*i+_],T=n[m*i+h],x=n[m*i+_];s[a*128+c]=(p*(1-f)+w*f)*(1-g)+(T*(1-f)+x*f)*g}return s}function Te(i,t=[4,8,16,32],e=[.5,.25,.15,.1]){let n=new Float32Array(16384);return t.forEach((s,r)=>{let o=sc(s,i+r*101);for(let a=0;a<n.length;a++)n[a]+=o[a]*e[r]}),n}var zn=Math.PI*2,_h=(i,t)=>{let e=Math.abs(i-t)%128;return Math.min(e,128-e)};function ie(i){let t=new Float32Array(16384).fill(1),e=new Float32Array(16384).fill(1),n=new Float32Array(16384).fill(.8),s=new Float32Array(16384).fill(0);return i({lum:t,alpha:e,rough:n,metal:s}),{lum:t,alpha:e,rough:n,metal:s}}var se=i=>{for(let t=0;t<128;t++)for(let e=0;e<128;e++)i(e,t,t*128+e)};function bi(i,t,e=.5,n=!0){let s=ts(t),r=[],o=128/i;for(let a=0;a<i;a++)for(let c=0;c<i;c++){let l=n&&a%2?o/2:0;r.push({x:(c*o+l+(s()-.5)*o*e+128)%128,y:(a*o+(s()-.5)*o*e+128)%128,r:s()})}return r}function Qi(i,t,e){let n=1e9,s=1e9,r=null;for(let o of i){let a=_h(t,o.x),c=_h(e,o.y),l=Math.sqrt(a*a+c*c);l<n?(s=n,n=l,r=o):l<s&&(s=l)}return{d:n,d2:s,p:r}}var xh={cotton:()=>ie(({lum:i,rough:t})=>{let e=Te(11);se((n,s,r)=>{i[r]=.94+e[r]*.08,t[r]=.9})}),satin:()=>ie(({lum:i,rough:t})=>{let e=Te(12,[2,4],[.7,.3]);se((n,s,r)=>{let o=Math.sin(zn*(n+s)/128+e[r]*2.5);i[r]=.95+.07*o*o,t[r]=.2})}),silk:()=>ie(({lum:i,rough:t})=>{let e=Te(13,[2,4,8],[.6,.3,.1]);se((n,s,r)=>{i[r]=.95+.06*Math.sin(zn*(n/128+e[r]*.8)),t[r]=.3})}),linen:()=>ie(({lum:i,rough:t})=>{let e=Te(14,[16,32,64],[.5,.3,.2]),n=sc(8,5);se((s,r,o)=>{let a=Math.sin(zn*s*24/128)*.5+Math.sin(zn*r*24/128)*.5;i[o]=.86+.06*a+.1*e[o]-.05*n[o],t[o]=.95})}),denim:()=>ie(({lum:i,rough:t})=>{let e=Te(15,[16,32,64],[.4,.3,.3]),n=ts(77);se((s,r,o)=>{let a=(s+r)%6<3?1:0;i[o]=.74+.14*a+.12*e[o]+(n()<.03?.18:0),t[o]=.95})}),corduroy:()=>ie(({lum:i,rough:t})=>{let e=Te(16,[8,16],[.6,.4]);se((n,s,r)=>{let o=Math.pow(Math.abs(Math.sin(Math.PI*n*10/128)),.6);i[r]=.55+.45*o+.06*e[r],t[r]=.85})}),velvet:()=>ie(({lum:i,rough:t})=>{let e=Te(17,[2,4,8],[.5,.3,.2]),n=Te(18,[32,64],[.5,.5]);se((s,r,o)=>{i[o]=.7+.3*e[o]+.05*n[o],t[o]=.55})}),taffeta:()=>ie(({lum:i,rough:t,metal:e})=>{let n=Te(19,[2,4],[.6,.4]);se((s,r,o)=>{let a=Math.sin(zn*s*32/128)*Math.sin(zn*r*32/128);i[o]=.9+.05*a+.18*(n[o]-.5),t[o]=.35,e[o]=.15})}),lame:()=>ie(({lum:i,rough:t,metal:e})=>{let n=Te(20,[4,8,16,32],[.3,.3,.25,.15]);se((s,r,o)=>{let a=Math.abs(n[o]-.5)*2;i[o]=.75+.55*(1-a),t[o]=.25+.2*a,e[o]=.9})}),leather:()=>ie(({lum:i,rough:t})=>{let e=bi(14,21,.9,!1),n=Te(22,[8,16],[.6,.4]);se((s,r,o)=>{let{d:a,d2:c}=Qi(e,s,r),l=Math.min(1,(c-a)/2.5);i[o]=.78+.16*l+.08*n[o],t[o]=.5+.2*(1-l)})}),sequin:()=>ie(({lum:i,rough:t,metal:e})=>{let n=bi(10,23,.05);se((s,r,o)=>{let{d:a,p:c}=Qi(n,s,r),l=128/10*.55;if(a<l){let d=a/l;i[o]=.85+.5*c.r*(1-d)-.15*d*d,t[o]=.08+.15*c.r,e[o]=.85}else i[o]=.55,t[o]=.6,e[o]=.3})}),glitter:()=>ie(({lum:i,rough:t,metal:e})=>{let n=ts(24),s=Te(25,[16,32],[.5,.5]);se((r,o,a)=>{let c=n();i[a]=c>.93?1.45:c>.8?1.15:.82+.1*s[a],t[a]=c>.8?.05:.4,e[a]=.8})}),tissue:()=>ie(({lum:i,alpha:t,rough:e})=>{let n=Te(26,[8,16,32],[.4,.3,.3]);se((s,r,o)=>{i[o]=1.02+.06*n[o],t[o]=.5+.1*n[o],e[o]=.7})}),chiffon:()=>ie(({lum:i,alpha:t,rough:e})=>{let n=Te(27,[4,8],[.6,.4]);se((s,r,o)=>{i[o]=1+.06*n[o],t[o]=.42+.12*n[o],e[o]=.6})}),organza:()=>ie(({lum:i,alpha:t,rough:e,metal:n})=>{let s=Te(28,[2,4,8],[.5,.3,.2]);se((r,o,a)=>{let c=Math.sin(zn*r*40/128)*Math.sin(zn*o*40/128);i[a]=1.05+.1*s[a]+.03*c,t[a]=.45+.15*s[a],e[a]=.3,n[a]=.2})}),tulle:()=>ie(({lum:i,alpha:t,rough:e})=>{se((n,s,r)=>{let o=n%8-4,a=(s+Math.floor(n/8)%2*4)%8-4,c=Math.sqrt(o*o+a*a)<2.6;i[r]=1,t[r]=c?.12:.85,e[r]=.7})}),mesh:()=>ie(({lum:i,alpha:t,rough:e})=>{se((n,s,r)=>{let o=n%10>2&&s%10>2;i[r]=.95,t[r]=o?.08:1,e[r]=.6})}),laceFloral:()=>ie(({lum:i,alpha:t,rough:e})=>{let n=bi(3,29,.3),s=ts(30);se((r,o,a)=>{let c=r%6-3,l=(o+Math.floor(r/6)%2*3)%6-3,h=Math.sqrt(c*c+l*l)<1.9?.1:.8,u=1;for(let f of n){let g=(r-f.x+192)%128-64,_=(o-f.y+128*1.5)%128-128/2,m=Math.sqrt(g*g+_*_),p=Math.atan2(_,g),w=12+6*Math.cos(p*6+f.r*6);m<w&&(h=m<4||m>w-2?1:.92,u=m<4?.85:1-.1*(m/w))}i[a]=u+(s()-.5)*.04,t[a]=h,e[a]=.75})}),laceChantilly:()=>ie(({lum:i,alpha:t,rough:e})=>{se((n,s,r)=>{let o=n%5-2.5,a=s%5-2.5,c=Math.sqrt(o*o+a*a)<1.6?.08:.7,l=n%32-16,d=s%32-16,h=Math.sqrt(l*l+d*d),u=Math.abs(h-11)<1.6||Math.abs(h-6)<1.2,f=Math.abs(Math.sin((n+s)*zn/64)*10-((n-s+128)%32-16))<1.4;t[r]=u||f?1:c,i[r]=u?.88:1,e[r]=.75})}),laceEyelet:()=>ie(({lum:i,alpha:t,rough:e})=>{let n=bi(6,31,0);se((s,r,o)=>{let{d:a}=Qi(n,s,r),c=5.5;t[o]=a<c?.05:1,i[o]=a<c+2&&a>=c?.85:.98,e[o]=.85})}),tweed:()=>ie(({lum:i,rough:t})=>{let e=ts(32),n=Te(33,[16,32,64],[.4,.3,.3]);se((s,r,o)=>{let a=(Math.floor(s/3)+Math.floor(r/3))%2?.08:-.08,c=e();i[o]=.78+a+.15*n[o]+(c<.05?.5:c>.96?-.4:0),t[o]=1})}),knit:()=>ie(({lum:i,rough:t})=>{se((e,n,s)=>{let r=e%8,o=n%10,a=Math.abs((r<4?r:7-r)-o*.4);i[s]=.7+.3*Math.max(0,1-a/3)+(r===0||r===7?-.15:0),t[s]=.95})}),fur:()=>ie(({lum:i,rough:t})=>{let e=sc(32,34),n=Te(35,[4,8],[.6,.4]);se((s,r,o)=>{let a=e[r%128*128+(s+Math.floor(r/4))%128];i[o]=.7+.45*a+.1*n[o],t[o]=1})}),suede:()=>ie(({lum:i,rough:t})=>{let e=Te(36,[16,32,64],[.3,.3,.4]);se((n,s,r)=>{i[r]=.85+.12*e[r],t[r]=1})}),vinyl:()=>ie(({lum:i,rough:t,metal:e})=>{let n=Te(37,[2,4],[.6,.4]);se((s,r,o)=>{i[o]=.95+.15*n[o],t[o]=.08,e[o]=.1})}),brocade:()=>ie(({lum:i,rough:t,metal:e})=>{se((n,s,r)=>{let o=(n%64-32)/32,a=(s%64-32)/32,c=Math.abs(o),l=Math.abs(Math.sin(c*5+a*3)*Math.cos(a*4-c*2))>.55&&c*c+a*a<.9;i[r]=l?1.25:.82,e[r]=l?.7:.1,t[r]=l?.3:.7})}),stripes:()=>ie(({lum:i,rough:t})=>{se((e,n,s)=>{i[s]=e%32<16?1:1.5,t[s]=.85})}),plaid:()=>ie(({lum:i,rough:t})=>{se((e,n,s)=>{let r=e%64<20?.6:e%64<24?1.5:1,o=n%64<20?.6:n%64<24?1.5:1;i[s]=Math.min(1.5,(r+o)/2+((e+n)%4<2?.04:-.04)),t[s]=.95})}),polka:()=>ie(({lum:i,rough:t})=>{let e=bi(4,38,0);se((n,s,r)=>{i[r]=Qi(e,n,s).d<7?1.5:1,t[r]=.85})}),floral:()=>ie(({lum:i,rough:t})=>{let e=bi(4,39,.6);se((n,s,r)=>{let{d:o,p:a}=Qi(e,n,s),c=1,l=e.find(g=>g===a),d=(n-l.x+128*1.5)%128-128/2,h=(s-l.y+128*1.5)%128-128/2,u=Math.atan2(h,d),f=9+4*Math.cos(u*5+a.r*5);o<3?c=.6:o<f?c=1.45:o<f+5&&Math.abs(Math.sin(u*2+a.r*9))>.92&&(c=.75),i[r]=c,t[r]=.85})}),leopard:()=>ie(({lum:i,rough:t})=>{let e=bi(6,40,.8),n=Te(41,[8,16],[.5,.5]);se((s,r,o)=>{let{d:a,p:c}=Qi(e,s,r),l=5+3*c.r+2*n[o];i[o]=a<l*.6?.85:a<l?.25:1.15,t[o]=.9})}),houndstooth:()=>ie(({lum:i,rough:t})=>{se((e,n,s)=>{let r=e%16,o=n%16,a=r<8==o<8,c=(r-o+16)%16<4&&r>=8&&o<8;i[s]=a||c?.45:1.45,t[s]=.95})})},Wr=[{id:"cotton",name:"Cotton (solid)",group:"Basics"},{id:"satin",name:"Satin",group:"Her picks"},{id:"laceFloral",name:"Lace: floral",group:"Her picks"},{id:"laceChantilly",name:"Lace: Chantilly",group:"Her picks"},{id:"laceEyelet",name:"Lace: eyelet",group:"Her picks"},{id:"sequin",name:"Sequin",group:"Her picks"},{id:"glitter",name:"Glitter",group:"Her picks"},{id:"corduroy",name:"Corduroy",group:"Her picks"},{id:"linen",name:"Linen",group:"Her picks"},{id:"silk",name:"Silk",group:"Her picks"},{id:"tissue",name:"Tissue",group:"Her picks"},{id:"velvet",name:"Velvet",group:"Her picks"},{id:"taffeta",name:"Taffeta",group:"Her picks"},{id:"lame",name:"Lam\xE9",group:"Her picks"},{id:"leather",name:"Leather",group:"Her picks"},{id:"denim",name:"Denim",group:"Her picks"},{id:"chiffon",name:"Chiffon",group:"Sheer"},{id:"organza",name:"Organza",group:"Sheer"},{id:"tulle",name:"Tulle",group:"Sheer"},{id:"mesh",name:"Mesh",group:"Sheer"},{id:"knit",name:"Knit",group:"Textured"},{id:"tweed",name:"Tweed",group:"Textured"},{id:"brocade",name:"Brocade",group:"Textured"},{id:"suede",name:"Suede",group:"Textured"},{id:"fur",name:"Faux fur",group:"Textured"},{id:"vinyl",name:"Vinyl",group:"Textured"},{id:"stripes",name:"Stripes",group:"Prints"},{id:"plaid",name:"Plaid",group:"Prints"},{id:"polka",name:"Polka dot",group:"Prints"},{id:"floral",name:"Floral print",group:"Prints"},{id:"leopard",name:"Leopard",group:"Prints"},{id:"houndstooth",name:"Houndstooth",group:"Prints"}],vh=Object.fromEntries(Wr.map(i=>[i.id,i])),ic=new Map;function tf(i){return ic.has(i)||ic.set(i,(xh[i]||xh.cotton)()),ic.get(i)}function es(i){let t=i.replace("#",""),e=parseInt(t.length===3?t.split("").map(n=>n+n).join(""):t,16);return[e>>16&255,e>>8&255,e&255]}function Xr(i,t,e){return"#"+[i,t,e].map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}var $s=new Map;function rc(i,t){let e=i+t;if($s.has(e))return $s.get(e);let n=tf(i),[s,r,o]=es(t),a=new Uint8ClampedArray(16384*4),c=new Uint8ClampedArray(16384*4);for(let d=0;d<16384;d++){let h=n.lum[d],u=d*4;if(h<=1)a[u]=s*h,a[u+1]=r*h,a[u+2]=o*h;else{let f=Math.min(1,(h-1)/.5);a[u]=s+(255-s)*f,a[u+1]=r+(255-r)*f,a[u+2]=o+(255-o)*f}a[u+3]=n.alpha[d]*255,c[u]=0,c[u+1]=n.rough[d]*255,c[u+2]=n.metal[d]*255,c[u+3]=255}let l={color:a,mat:c};return $s.size>200&&$s.clear(),$s.set(e,l),l}function oc(i,t,e="color"){let n=document.createElement("canvas");n.width=n.height=128;let s=rc(i,t),r=new ImageData(new Uint8ClampedArray(e==="color"?s.color:s.mat),128,128);return n.getContext("2d").putImageData(r,0,0),n}function ac(i,t){let e=document.createElement("canvas");e.width=e.height=64;let n=e.getContext("2d");for(let s=0;s<8;s++)for(let r=0;r<8;r++)n.fillStyle=(r+s)%2?"#d9d4ce":"#f4f1ed",n.fillRect(r*8,s*8,8,8);return n.drawImage(oc(i,t),0,0,128,128,0,0,96,96),e.toDataURL()}var Mh=[{name:"Pastels",colors:["#f8c8d4","#fbd9b5","#fff1b0","#c9ebc4","#bfe0f2","#d6c8f0","#f3d1e8","#e8e3d9"]},{name:"Jewel tones",colors:["#7a1236","#0f5e4f","#1d3a8a","#5a1d7a","#b8860b","#a31621","#0b6e99","#2e1a47"]},{name:"Brights",colors:["#ff2e63","#ff8a00","#ffd400","#2ecc71","#00b4ff","#7b2ff7","#ff4fd8","#00e0c6"]},{name:"Neutrals",colors:["#ffffff","#f2ede4","#d8cbb8","#a89a87","#6e6259","#3b3533","#1a1a1a","#c0c0c0"]},{name:"Earth",colors:["#8a5a44","#c47f4f","#d9a86c","#6b705c","#a5a58d","#b5838d","#6d4c3d","#3f4238"]},{name:"Metallics",colors:["#d4af37","#c0c0c0","#b87333","#e5c1a8","#8c8c8c","#f1e5ac","#aa7c39","#2f2f35"]}],ge=(i,t,e,n,s)=>({hang:i,bend:t,folds:e,drag:n,weight:s}),yh={cotton:ge(.84,.3,10,.03,1),satin:ge(.78,.14,12,.025,1.05),silk:ge(.74,.07,14,.035,.9),chiffon:ge(.7,.03,16,.06,.7),tissue:ge(.72,.04,16,.06,.7),organza:ge(.92,.5,8,.05,.75),tulle:ge(.9,.42,9,.06,.7),mesh:ge(.82,.2,10,.04,.85),taffeta:ge(.92,.55,8,.03,.95),velvet:ge(.77,.2,10,.02,1.25),lame:ge(.8,.25,11,.025,1.05),laceFloral:ge(.8,.2,11,.04,.9),laceChantilly:ge(.79,.15,12,.045,.85),laceEyelet:ge(.84,.32,10,.03,1),sequin:ge(.8,.28,9,.02,1.35),glitter:ge(.83,.3,10,.025,1.1),corduroy:ge(.86,.5,7,.02,1.2),linen:ge(.85,.36,9,.03,1),denim:ge(.9,.7,6,.02,1.3),leather:ge(.9,.8,5,.02,1.4),vinyl:ge(.9,.7,6,.02,1.3),brocade:ge(.9,.62,7,.02,1.2),tweed:ge(.88,.6,7,.02,1.25),knit:ge(.76,.14,10,.025,1.15),fur:ge(.92,.75,6,.02,1.3),suede:ge(.86,.5,7,.02,1.25)};function bh(i){return yh[i]||yh.cotton}async function wh(i){let t=URL.createObjectURL(i);try{let e=await new Promise((n,s)=>{let r=new Image;r.onload=()=>n(r),r.onerror=()=>s(new Error("That file is not a picture this device can open.")),r.src=t});return lc(e,e.naturalWidth,e.naturalHeight)}finally{URL.revokeObjectURL(t)}}function lc(i,t,e){let n=Math.min(1,1400/Math.max(t,e)),s=document.createElement("canvas");s.width=Math.max(1,Math.round(t*n)),s.height=Math.max(1,Math.round(e*n));let r=s.getContext("2d");return r.imageSmoothingQuality="high",r.drawImage(i,0,0,s.width,s.height),s}function Hn(i,t,e){let n=new Float64Array((i+1)*(t+1));for(let s=0;s<t;s++){let r=0;for(let o=0;o<i;o++)r+=e(s*i+o),n[(s+1)*(i+1)+o+1]=n[s*(i+1)+o+1]+r}return n}function Vn(i,t,e,n,s,r){let o=Math.max(0,n-r),a=Math.max(0,s-r),c=Math.min(t,n+r+1),l=Math.min(e,s+r+1),d=t+1;return{s:i[l*d+c]-i[a*d+c]-i[l*d+o]+i[a*d+o],n:(c-o)*(l-a)}}var cc=(i,t,e)=>{let n=Math.max(i,t,e),s=Math.min(i,t,e);return n===0?0:(n-s)/n};function Sh(i,t,e,n){let s=new Uint8Array(t*e),r=new Int32Array(t*e),o=[];for(let a=0;a<t*e;a++){if(!i[a]||s[a])continue;let c=0;for(r[c++]=a,s[a]=1,o.length=0;c;){let l=r[--c];o.push(l);let d=l%t,h=l/t|0;d>0&&i[l-1]&&!s[l-1]&&(s[l-1]=1,r[c++]=l-1),d<t-1&&i[l+1]&&!s[l+1]&&(s[l+1]=1,r[c++]=l+1),h>0&&i[l-t]&&!s[l-t]&&(s[l-t]=1,r[c++]=l-t),h<e-1&&i[l+t]&&!s[l+t]&&(s[l+t]=1,r[c++]=l+t)}if(o.length<n)for(let l of o)i[l]=0}return i}function Th(i){let t=i.width,e=i.height,n=i.getContext("2d").getImageData(0,0,t,e).data,s=0,r=0;for(let o=0;o<t*e;o+=3){let a=n[o*4],c=n[o*4+1],l=n[o*4+2],d=cc(a,c,l),h=Math.max(a,c,l);(h<215||d>.15)&&(r++,d>.22&&h>50&&s++)}return r?s/r:0}function Eh(i,{strength:t=.5,keepColor:e=!1}={}){let n=i.width,s=i.height,r=i.getContext("2d").getImageData(0,0,n,s).data,o=n*s,a=new Float32Array(o),c=new Float32Array(o);for(let q=0;q<o;q++){let Dt=r[q*4],Et=r[q*4+1],zt=r[q*4+2];a[q]=.3*Dt+.59*Et+.11*zt,c[q]=cc(Dt,Et,zt)}let l=Math.max(8,Math.round(Math.max(n,s)/40)),d=Hn(n,s,q=>a[q]),h=.16-t*.12,u=new Uint8ClampedArray(o),f=new Uint8Array(o);for(let q=0;q<s;q++)for(let Dt=0;Dt<n;Dt++){let Et=q*n+Dt,{s:zt,n:Y}=Vn(d,n,s,Dt,q,l),tt=zt/Y,yt=(tt-a[Et])/Math.max(30,tt),Ct=e?c[Et]<.3||a[Et]<45:!0;if(yt>h&&a[Et]<225&&Ct){let Rt=Math.min(1,(yt-h)/.14+.25);u[Et]=Rt*255,f[Et]=1}}Sh(f,n,s,Math.max(6,Math.round(o/6e4)));let g=document.createElement("canvas");g.width=n,g.height=s;let _=g.getContext("2d").createImageData(n,s);for(let q=0;q<o;q++)f[q]&&(_.data[q*4]=28,_.data[q*4+1]=24,_.data[q*4+2]=30,_.data[q*4+3]=u[q]);if(g.getContext("2d").putImageData(_,0,0),!e)return{lines:g,color:null};let m=Array.from(a.filter((q,Dt)=>Dt%7===0)).sort((q,Dt)=>q-Dt),p=m[Math.floor(m.length*.6)],w=q=>c[q]<.12&&a[q]>=p-8,T=Math.max(16,Math.round(Math.max(n,s)/10)),x=Hn(n,s,q=>w(q)?r[q*4]:0),A=Hn(n,s,q=>w(q)?r[q*4+1]:0),E=Hn(n,s,q=>w(q)?r[q*4+2]:0),R=Hn(n,s,q=>w(q)?1:0),P=0,M=0,v=0,I=0;for(let q=0;q<o;q+=5)w(q)&&(P+=r[q*4],M+=r[q*4+1],v+=r[q*4+2],I++);let L=I?[P/I,M/I,v/I]:[245,245,245],N=new Uint8ClampedArray(o*4),k=new Uint8Array(o);for(let q=0;q<s;q++)for(let Dt=0;Dt<n;Dt++){let Et=q*n+Dt,zt=Vn(R,n,s,Dt,q,T).s,Y=zt>20?[Vn(x,n,s,Dt,q,T).s/zt,Vn(A,n,s,Dt,q,T).s/zt,Vn(E,n,s,Dt,q,T).s/zt]:L,tt=Math.min(255,r[Et*4]/Math.max(60,Y[0])*248),yt=Math.min(255,r[Et*4+1]/Math.max(60,Y[1])*248),Ct=Math.min(255,r[Et*4+2]/Math.max(60,Y[2])*248),Rt=cc(tt,yt,Ct),D=Math.max(tt,yt,Ct);N[Et*4]=tt,N[Et*4+1]=yt,N[Et*4+2]=Ct,(Rt>.1||D<200||f[Et])&&(k[Et]=1)}let H=ef(Si(k,n,s,2),n,s,2);Sh(H,n,s,Math.max(30,Math.round(o/8e3)));let V=Hn(n,s,q=>k[q]?N[q*4]:0),j=Hn(n,s,q=>k[q]?N[q*4+1]:0),G=Hn(n,s,q=>k[q]?N[q*4+2]:0),at=Hn(n,s,q=>k[q]),mt=document.createElement("canvas");mt.width=n,mt.height=s;let _t=mt.getContext("2d").createImageData(n,s);for(let q=0;q<s;q++)for(let Dt=0;Dt<n;Dt++){let Et=q*n+Dt;if(!H[Et])continue;let zt=Vn(at,n,s,Dt,q,3).s;if(zt>0){let Y=Vn(V,n,s,Dt,q,3).s/zt,tt=Vn(j,n,s,Dt,q,3).s/zt,yt=Vn(G,n,s,Dt,q,3).s/zt,Ct=k[Et]?.5:1;_t.data[Et*4]=N[Et*4]*(1-Ct)+Y*Ct,_t.data[Et*4+1]=N[Et*4+1]*(1-Ct)+tt*Ct,_t.data[Et*4+2]=N[Et*4+2]*(1-Ct)+yt*Ct}else _t.data[Et*4]=N[Et*4],_t.data[Et*4+1]=N[Et*4+1],_t.data[Et*4+2]=N[Et*4+2];_t.data[Et*4+3]=255}return mt.getContext("2d").putImageData(_t,0,0),{lines:g,color:mt}}function Si(i,t,e,n){if(n<=0)return i.slice();let s=new Uint8Array(t*e),r=new Uint8Array(t*e);for(let o=0;o<e;o++){let a=0,c=o*t;for(let l=0;l<Math.min(n,t);l++)a+=i[c+l];for(let l=0;l<t;l++)l+n<t&&(a+=i[c+l+n]),l-n-1>=0&&(a-=i[c+l-n-1]),s[c+l]=a>0?1:0}for(let o=0;o<t;o++){let a=0;for(let c=0;c<Math.min(n,e);c++)a+=s[c*t+o];for(let c=0;c<e;c++)c+n<e&&(a+=s[(c+n)*t+o]),c-n-1>=0&&(a-=s[(c-n-1)*t+o]),r[c*t+o]=a>0?1:0}return r}function ef(i,t,e,n){let s=new Uint8Array(t*e);for(let o=0;o<t*e;o++)s[o]=i[o]?0:1;let r=Si(s,t,e,n);for(let o=0;o<t*e;o++)r[o]=r[o]?0:1;return r}function Ah(...i){let t=i.find(Boolean),e=t.width,n=t.height,s=e,r=n,o=-1,a=-1;for(let c of i){if(!c)continue;let l=c.getContext("2d").getImageData(0,0,e,n).data;for(let d=0;d<n;d++)for(let h=0;h<e;h++)l[(d*e+h)*4+3]>20&&(h<s&&(s=h),h>o&&(o=h),d<r&&(r=d),d>a&&(a=d))}return o<0?{x:0,y:0,w:e,h:n}:{x:s,y:r,w:o-s+1,h:a-r+1}}var rt=1024,Tt=1536,Gn=(i=rt,t=Tt)=>{let e=document.createElement("canvas");return e.width=i,e.height=t,e},qr=class{constructor(t){this.el=t,this.ctx=t.getContext("2d");let e=()=>{let s={color:Gn(),mat:Gn(),lines:Gn()};return s.cx=Object.fromEntries(["color","mat","lines"].map(r=>[r,s[r].getContext("2d",{willReadFrequently:!0})])),s};this.sides={front:e(),back:e()},this.backLinked=!0,this.useSide("front"),this.texF=Gn(),this.texB=Gn(),this.atlas=Gn(rt*2,Tt),this.atlasMat=Gn(rt*2,Tt),this.guides={front:null,back:null},this.guideOpacity=.55,this.showGuide=!0,this.tool="fill",this.paint={color:"#e85d8a",fabric:"cotton",scale:.7},this.brushSize=14,this.gap=2,this.eraseTarget="color",this.view={s:.5,x:0,y:0},this.undoStack=[],this.redoStack=[],this.fillFabric={},this.pointers=new Map,this.place=null,this.hover=null,this.onChange=()=>{},this.onPick=()=>{},this.onHistory=()=>{},this.onToast=()=>{},this.dirty=!0,this.bind(),new ResizeObserver(()=>{this.resize()}).observe(t.parentElement);let n=()=>{requestAnimationFrame(n),this.dirty&&this.el.offsetParent&&(this.dirty=!1,this.render())};n()}get guide(){return this.guides[this.side]}useSide(t){let e=this.sides[t];this.side=t,this.color=e.color,this.mat=e.mat,this.lines=e.lines,this.cx=e.cx,this.dirty=!0}mirrorFrontToBack(){let t=this.sides.front,e=this.sides.back;for(let n of["color","mat","lines"]){let s=e.cx[n];s.save(),s.setTransform(-1,0,0,1,rt,0),s.globalCompositeOperation="copy",s.drawImage(t[n],0,0),s.restore()}}setSide(t){t!==this.side&&(this.place&&this.cancelPlace(),t==="back"&&this.backLinked&&this.mirrorFrontToBack(),this.useSide(t))}linkBack(){this.backLinked=!0,this.mirrorFrontToBack(),this.undoStack=this.undoStack.filter(t=>t.side!=="back"),this.redoStack=[],this.changed()}resize(){let t=this.el.parentElement,e=Math.min(2,window.devicePixelRatio||1),n=t.clientWidth,s=t.clientHeight;if(!n||!s)return;let r=!this.sized;this.el.width=Math.round(n*e),this.el.height=Math.round(s*e),this.el.style.width=n+"px",this.el.style.height=s+"px",this.dpr=e,this.sized=!0,(r||!this.userView)&&this.fit(),this.dirty=!0}fit(){let t=this.el.parentElement,e=t.clientWidth,n=t.clientHeight,s=Math.min((e-32)/rt,(n-32)/Tt);this.view={s,x:(e-rt*s)/2,y:(n-Tt*s)/2},this.userView=!1,this.dirty=!0}zoomBy(t,e,n){let s=this.view,r=this.el.parentElement;e===void 0&&(e=r.clientWidth/2,n=r.clientHeight/2),this.userView=!0;let o=Math.max(.1,Math.min(8,s.s*t)),a=o/s.s;this.view={s:o,x:e-(e-s.x)*a,y:n-(n-s.y)*a},this.dirty=!0}toBoard(t,e){let n=this.el.getBoundingClientRect(),s=this.view;return[(t-n.left-s.x)/s.s,(e-n.top-s.y)/s.s]}render(){let t=this.ctx,e=this.view,n=this.dpr||1;if(t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,this.el.width,this.el.height),t.setTransform(n*e.s,0,0,n*e.s,n*e.x,n*e.y),t.shadowColor="rgba(60,40,30,0.18)",t.shadowBlur=24/e.s*.5,t.shadowOffsetY=4/e.s,t.fillStyle="#fffdfa",t.fillRect(0,0,rt,Tt),t.shadowColor="transparent",t.imageSmoothingEnabled=e.s<2,this.guide&&this.showGuide&&(t.globalAlpha=this.guideOpacity,t.drawImage(this.guide,0,0,rt,Tt),t.globalAlpha=1),t.drawImage(this.color,0,0),t.drawImage(this.lines,0,0),this.place){let s=this.place,r=s.w*s.s,o=s.h*s.s;t.globalAlpha=.9,s.color&&t.drawImage(s.color,s.x,s.y,r,o),t.drawImage(s.lines,s.x,s.y,r,o),t.globalAlpha=1,t.lineWidth=2/e.s,t.setLineDash([8/e.s,6/e.s]),t.strokeStyle="#b4466e",t.strokeRect(s.x,s.y,r,o),t.setLineDash([]);let a=14/e.s;t.fillStyle="#b4466e";for(let[c,l]of[[s.x,s.y],[s.x+r,s.y],[s.x,s.y+o],[s.x+r,s.y+o]])t.beginPath(),t.arc(c,l,a,0,Math.PI*2),t.fill()}this.hover&&["brush","pen","eraser"].includes(this.tool)&&!this.place&&(t.beginPath(),t.arc(this.hover[0],this.hover[1],this.toolWidth(.6)/2,0,Math.PI*2),t.lineWidth=1.5/e.s,t.strokeStyle="rgba(80,60,70,0.7)",t.stroke())}bind(){let t=this.el;t.addEventListener("pointerdown",e=>this.down(e)),t.addEventListener("pointermove",e=>this.move(e)),t.addEventListener("pointerup",e=>this.up(e)),t.addEventListener("pointercancel",e=>this.up(e,!0)),t.addEventListener("pointerleave",()=>{this.hover=null,this.dirty=!0}),t.addEventListener("wheel",e=>{e.preventDefault();let n=t.getBoundingClientRect();if(this.place&&!e.ctrlKey){this.scalePlace(Math.exp(-e.deltaY*.0015));return}e.shiftKey?(this.view.x-=e.deltaX||e.deltaY,this.view.y-=e.deltaX?e.deltaY:0,this.dirty=!0):this.zoomBy(Math.exp(-e.deltaY*(e.ctrlKey?.01:.0015)),e.clientX-n.left,e.clientY-n.top)},{passive:!1}),t.addEventListener("contextmenu",e=>e.preventDefault())}down(t){if(this.el.setPointerCapture(t.pointerId),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pointers.size===2){this.cancelStroke(),this.gesture=this.gestureStart();return}if(this.pointers.size>2)return;let[e,n]=this.toBoard(t.clientX,t.clientY);if(t.button===1||t.button===2||this.tool==="pan"||this.spaceDown){this.panning={x:t.clientX,y:t.clientY};return}if(this.place){this.placeDown(e,n);return}if(this.tool==="fill"||this.tool==="clear"){this.pendingTap={bx:e,by:n,x:t.clientX,y:t.clientY,t:performance.now()};return}if(this.tool==="picker"){this.pickAt(e,n);return}this.startStroke(e,n,t)}move(t){let e=this.pointers.get(t.pointerId),[n,s]=this.toBoard(t.clientX,t.clientY);if(t.pointerType!=="touch"&&(this.hover=[n,s],this.dirty=!0),!!e){if(e.x=t.clientX,e.y=t.clientY,this.gesture){this.gestureMove();return}if(this.panning){this.view.x+=t.clientX-this.panning.x,this.view.y+=t.clientY-this.panning.y,this.panning={x:t.clientX,y:t.clientY},this.dirty=!0;return}if(this.placeDrag){this.placeMove(n,s);return}if(this.pendingTap&&Math.hypot(t.clientX-this.pendingTap.x,t.clientY-this.pendingTap.y)>8){this.panning={x:t.clientX,y:t.clientY},this.pendingTap=null;return}if(this.stroke){let r=t.getCoalescedEvents?t.getCoalescedEvents():[t];for(let o of r){let[a,c]=this.toBoard(o.clientX,o.clientY);this.strokeTo(a,c,o.pressure)}}}}up(t,e){if(this.pointers.delete(t.pointerId),this.gesture){this.pointers.size<2&&(this.gesture=null);return}if(this.panning=null,this.placeDrag=null,this.pendingTap&&!e){let n=this.pendingTap;this.pendingTap=null,this.tool==="clear"?this.fillAt(n.bx,n.by,{erase:!0}):this.fillAt(n.bx,n.by)}this.pendingTap=null,this.stroke&&this.endStroke()}gestureStart(){let[t,e]=[...this.pointers.values()];return{d:Math.hypot(t.x-e.x,t.y-e.y),cx:(t.x+e.x)/2,cy:(t.y+e.y)/2,view:{...this.view},place:this.place?{...this.place}:null}}gestureMove(){let t=this.gesture,[e,n]=[...this.pointers.values()],s=this.el.getBoundingClientRect(),r=Math.hypot(e.x-n.x,e.y-n.y),o=(e.x+n.x)/2,a=(e.y+n.y)/2,c=r/t.d;if(t.place&&this.place){let l=t.place,d=l.x+l.w*l.s/2,h=l.y+l.h*l.s/2,u=l.s*c;this.place.s=u,this.place.x=d-l.w*u/2+(o-t.cx)/this.view.s,this.place.y=h-l.h*u/2+(a-t.cy)/this.view.s}else{let l=Math.max(.1,Math.min(8,t.view.s*c)),d=l/t.view.s,h=t.cx-s.left,u=t.cy-s.top;this.view={s:l,x:h-(h-t.view.x)*d+(o-t.cx),y:u-(u-t.view.y)*d+(a-t.cy)},this.userView=!0}this.dirty=!0}begin(t){this.side==="back"&&this.backLinked&&(this.mirrorFrontToBack(),this.backLinked=!1),this.snap={names:t,data:Object.fromEntries(t.map(e=>[e,this.cx[e].getImageData(0,0,rt,Tt)]))}}commit(t){let e=this.snap;if(this.snap=null,!e||!t)return;let n=Math.max(0,Math.floor(t.x0)),s=Math.max(0,Math.floor(t.y0)),r=Math.min(rt,Math.ceil(t.x1)+1)-n,o=Math.min(Tt,Math.ceil(t.y1)+1)-s;if(r<=0||o<=0)return;let a={x:n,y:s,w:r,h:o,side:this.side,layers:{}};for(let c of e.names){let l=new ImageData(r,o),d=e.data[c].data;for(let h=0;h<o;h++)l.data.set(d.subarray(((s+h)*rt+n)*4,((s+h)*rt+n+r)*4),h*r*4);a.layers[c]={before:l,after:this.cx[c].getImageData(n,s,r,o)}}this.undoStack.push(a),this.undoStack.length>40&&this.undoStack.shift(),this.redoStack=[],this.changed()}undo(){let t=this.undoStack.pop();if(t){t.side!==this.side&&this.setSide(t.side);for(let[e,n]of Object.entries(t.layers))this.cx[e].putImageData(n.before,t.x,t.y);this.redoStack.push(t),this.changed()}}redo(){let t=this.redoStack.pop();if(t){t.side!==this.side&&this.setSide(t.side);for(let[e,n]of Object.entries(t.layers))this.cx[e].putImageData(n.after,t.x,t.y);this.undoStack.push(t),this.changed()}}changed(){this.dirty=!0,this.onHistory(this.undoStack.length,this.redoStack.length),this.onChange()}resetHistory(){this.undoStack=[],this.redoStack=[],this.onHistory(0,0)}toolWidth(t){return(this.tool==="pen"?Math.max(1.5,this.brushSize*.3):this.brushSize)*(t>0&&t!==.5?.3+.9*t:1)}patternFor(t,e=0){let n=this.paint,s=oc(n.fabric,n.color,t);if(t==="mat"&&e){let o=s.getContext("2d"),a=o.getImageData(0,0,s.width,s.height);for(let c=0;c<a.data.length;c+=4)a.data[c]=e;o.putImageData(a,0,0)}let r=this.cx.color.createPattern(s,"repeat");return r.setTransform(new DOMMatrix([n.scale,0,0,n.scale,0,0])),r}startStroke(t,e,n){let s=this.tool==="pen"?["lines"]:this.tool==="eraser"?this.eraseTarget==="lines"?["lines"]:this.eraseTarget==="both"?["color","mat","lines"]:["color","mat"]:["color","mat"];if(this.begin(s),this.stroke={names:s,last:[t,e],rect:{x0:t,y0:e,x1:t,y1:e},pressure:n.pressure,pats:null},this.tool==="brush"){let r=this.newFillId();this.fillFabric[r]=this.paint.fabric,this.stroke.pats={color:this.patternFor("color"),mat:this.patternFor("mat",r)}}this.strokeTo(t,e,n.pressure,!0)}strokeTo(t,e,n,s){let r=this.stroke;if(!r)return;let o=this.toolWidth(n),[a,c]=r.last;for(let h of r.names){let u=this.cx[h];u.save(),u.lineCap="round",u.lineJoin="round",u.lineWidth=o,this.tool==="eraser"?(u.globalCompositeOperation="destination-out",u.strokeStyle="#000"):this.tool==="pen"?u.strokeStyle="#1c181e":u.strokeStyle=r.pats[h==="mat"?"mat":"color"],u.beginPath(),u.moveTo(a,c),u.lineTo(s?t+.01:t,e),u.stroke(),u.restore()}r.last=[t,e];let l=r.rect,d=o/2+2;l.x0=Math.min(l.x0,t-d),l.y0=Math.min(l.y0,e-d),l.x1=Math.max(l.x1,t+d),l.y1=Math.max(l.y1,e+d),this.dirty=!0}endStroke(){let t=this.stroke;this.stroke=null,t&&this.commit(t.rect)}cancelStroke(){if(!this.stroke)return;let t=this.snap;if(this.stroke=null,this.snap=null,t)for(let e of t.names)this.cx[e].putImageData(t.data[e],0,0);this.dirty=!0}barrier(t){let e=this.cx.lines.getImageData(0,0,rt,Tt).data,n=new Uint8Array(rt*Tt);for(let s=0;s<rt*Tt;s++)n[s]=e[s*4+3]>60?1:0;return{raw:n,wall:t>0?Si(n,rt,Tt,t):n}}flood(t,e){let n=new Uint8Array(rt*Tt),s=[];for(let r of e)!t[r]&&!n[r]&&(n[r]=1,s.push(r));for(;s.length;){let r=s.pop(),o=r/rt|0,a=r;for(;a%rt>0&&!t[a-1]&&!n[a-1];)a--,n[a]=1;let c=r;for(;c%rt<rt-1&&!t[c+1]&&!n[c+1];)c++,n[c]=1;for(let l=a;l<=c;l++)o>0&&!t[l-rt]&&!n[l-rt]&&(n[l-rt]=1,s.push(l-rt)),o<Tt-1&&!t[l+rt]&&!n[l+rt]&&(n[l+rt]=1,s.push(l+rt))}return n}newFillId(){return this.fillId=(this.fillId||0)%254+1,this.fillId}paintMask(t,e){let n=this.newFillId();e||(this.fillFabric[n]=this.paint.fabric);let s=this.cx.color.getImageData(0,0,rt,Tt),r=this.cx.mat.getImageData(0,0,rt,Tt),o=rc(this.paint.fabric,this.paint.color),a=1/this.paint.scale,c=rt,l=Tt,d=-1,h=-1;for(let u=0;u<Tt;u++){let f=(u*a|0)%128*128;for(let g=0;g<rt;g++){let _=u*rt+g;if(!t[_])continue;g<c&&(c=g),g>d&&(d=g),u<l&&(l=u),u>h&&(h=u);let m=_*4;if(e){s.data[m+3]=0,r.data[m+3]=0;continue}let p=(f+(g*a|0)%128)*4;s.data[m]=o.color[p],s.data[m+1]=o.color[p+1],s.data[m+2]=o.color[p+2],s.data[m+3]=o.color[p+3],r.data[m]=n,r.data[m+1]=o.mat[p+1],r.data[m+2]=o.mat[p+2],r.data[m+3]=255}}return d<0?null:(this.cx.color.putImageData(s,0,0),this.cx.mat.putImageData(r,0,0),{x0:c,y0:l,x1:d,y1:h})}fillAt(t,e,{erase:n=!1}={}){let s=Math.round(t),r=Math.round(e);if(s<0||r<0||s>=rt||r>=Tt)return!1;let{raw:o,wall:a}=this.barrier(this.gap);if(a[r*rt+s]){let E=null;for(let R=1;R<14&&!E;R++)for(let P=-R;P<=R&&!E;P++)for(let M=-R;M<=R;M++){let v=s+M,I=r+P;if(v>=0&&I>=0&&v<rt&&I<Tt&&!a[I*rt+v]){E=[v,I];break}}if(!E)return!1;[s,r]=E}let c=this.cx.color.getImageData(0,0,rt,Tt).data,l=this.cx.mat.getImageData(0,0,rt,Tt).data,d=r*rt+s,h=c[d*4+3]>8,u=l[d*4],f=0,g=0,_=0,m=0;for(let E=-2;E<=2;E++)for(let R=-2;R<=2;R++){let P=s+R,M=r+E;if(P<0||M<0||P>=rt||M>=Tt)continue;let v=(M*rt+P)*4;c[v+3]>8&&(f+=c[v],g+=c[v+1],_+=c[v+2],m++)}m&&(f/=m,g/=m,_/=m);let p=9025,w=new Uint8Array(rt*Tt);for(let E=0;E<rt*Tt;E++){let R=E*4,P=c[R+3]>8,M=a[E]||P!==h;if(!M&&h)if(u)M=l[R]!==u;else{let v=c[R]-f,I=c[R+1]-g,L=c[R+2]-_;M=l[R]!==0||v*v+I*I+L*L>p}w[E]=M?1:0}let T=this.flood(w,[r*rt+s]),x=Si(T,rt,Tt,this.gap+2);for(let E=0;E<rt*Tt;E++)x[E]&&!T[E]&&(a[E]||o[E])&&(T[E]=1);this.begin(["color","mat"]);let A=this.paintMask(T,n);return this.commit(A),!0}autoFillGarment(t="cotton",e="#ffffff"){let{raw:n,wall:s}=this.barrier(3),r=[];for(let u=0;u<rt;u++)r.push(u,(Tt-1)*rt+u);for(let u=0;u<Tt;u++)r.push(u*rt,u*rt+rt-1);let o=this.flood(s,r),a=this.cx.color.getImageData(0,0,rt,Tt).data,c=new Uint8Array(rt*Tt);for(let u=0;u<rt*Tt;u++)!o[u]&&!s[u]&&(c[u]=1);let l=Si(c,rt,Tt,5),d=0;for(let u=0;u<rt*Tt;u++)l[u]&&(s[u]||n[u])&&!o[u]&&(c[u]=1),a[u*4+3]>10&&(c[u]=0),c[u]&&d++;if(d<500)return!1;let h=this.paint;return this.paint={color:e,fabric:t,scale:h.scale},this.begin(["color","mat"]),this.commit(this.paintMask(c,!1)),this.paint=h,!0}pickAt(t,e){let n=Math.round(t),s=Math.round(e);if(n<0||s<0||n>=rt||s>=Tt)return;let r=this.cx.color.getImageData(n,s,1,1).data;r[3]>10&&this.onPick([r[0],r[1],r[2]])}startPlace(t,e,n){let s=t.width,r=t.height,o=n,a=Math.min(o.w/s,o.h/r);this.place={lines:t,color:e,w:s,h:r,s:a,x:o.x+(o.w-s*a)/2,y:o.y},this.dirty=!0}placeDown(t,e){let n=this.place,s=n.w*n.s,r=n.h*n.s,o=22/this.view.s,a=[[n.x,n.y,n.x+s,n.y+r],[n.x+s,n.y,n.x,n.y+r],[n.x,n.y+r,n.x+s,n.y],[n.x+s,n.y+r,n.x,n.y]];for(let[c,l,d,h]of a)if(Math.hypot(t-c,e-l)<o){this.placeDrag={mode:"scale",ax:d,ay:h,d0:Math.hypot(c-d,l-h),s0:n.s};return}this.placeDrag={mode:"move",dx:t-n.x,dy:e-n.y}}placeMove(t,e){let n=this.place,s=this.placeDrag;if(s.mode==="move")n.x=t-s.dx,n.y=e-s.dy;else{let r=Math.max(.05,s.s0*Math.hypot(t-s.ax,e-s.ay)/s.d0),o=n.w*r,a=n.h*r;n.x=t<s.ax?s.ax-o:s.ax,n.y=e<s.ay?s.ay-a:s.ay,n.s=r}this.dirty=!0}scalePlace(t){let e=this.place;if(!e)return;let n=e.x+e.w*e.s/2,s=e.y+e.h*e.s/2;e.s*=t,e.x=n-e.w*e.s/2,e.y=s-e.h*e.s/2,this.dirty=!0}commitPlace(){let t=this.place;if(!t)return;this.place=null;let e=t.w*t.s,n=t.h*t.s;if(this.begin(["color","mat","lines"]),this.cx.lines.drawImage(t.lines,t.x,t.y,e,n),t.color){this.cx.color.drawImage(t.color,t.x,t.y,e,n);let s=Gn(),r=s.getContext("2d");r.drawImage(t.color,t.x,t.y,e,n),r.globalCompositeOperation="source-in",r.fillStyle="rgb(0,230,0)",r.fillRect(0,0,rt,Tt),this.cx.mat.drawImage(s,0,0)}this.commit({x0:t.x-2,y0:t.y-2,x1:t.x+e+2,y1:t.y+n+2})}cancelPlace(){this.place=null,this.dirty=!0}clearAll(){this.begin(["color","mat","lines"]);for(let t of Object.values(this.cx))t.clearRect(0,0,rt,Tt);this.commit({x0:0,y0:0,x1:rt-1,y1:Tt-1})}drawLines(t){this.begin(["lines"]);let e=this.cx.lines;e.save(),e.strokeStyle="#1c181e",e.lineWidth=4,e.lineCap="round",e.lineJoin="round",t(e),e.restore(),this.commit({x0:0,y0:0,x1:rt-1,y1:Tt-1})}hasColor(t="front"){let e=this.sides[t].cx.color.getImageData(0,0,rt,Tt).data;for(let n=3;n<e.length;n+=64)if(e[n]>10)return!0;return!1}hasLines(t="front"){let e=this.sides[t].cx.lines.getImageData(0,0,rt,Tt).data;for(let n=3;n<e.length;n+=32)if(e[n]>90)return!0;return!1}sideTexture(t){let e=this.sides[t],n=t==="front"?this.texF:this.texB,s=e.cx.color.getImageData(0,0,rt,Tt),r=e.cx.lines.getImageData(0,0,rt,Tt),o=s.data,a=r.data,c=new Uint8Array(rt*Tt);for(let d=0;d<rt*Tt;d++)c[d]=o[d*4+3]<20?1:0;let l=Si(c,rt,Tt,5);for(let d=0;d<rt*Tt;d++){let h=d*4,u=a[h+3]/255;!u||o[h+3]<20||l[d]||(o[h]=o[h]*(1-u)+a[h]*u,o[h+1]=o[h+1]*(1-u)+a[h+1]*u,o[h+2]=o[h+2]*(1-u)+a[h+2]*u)}return n.getContext("2d").putImageData(s,0,0),n}textureAtlas(){let t=this.atlas.getContext("2d"),e=this.atlasMat.getContext("2d"),n=this.sides.front,s=this.sides.back,r=this.sideTexture("front");return t.clearRect(0,0,rt*2,Tt),e.clearRect(0,0,rt*2,Tt),t.drawImage(r,0,0),e.drawImage(n.mat,0,0),this.backLinked?(t.save(),t.setTransform(-1,0,0,1,rt*2,0),t.drawImage(r,0,0),t.restore(),e.save(),e.setTransform(-1,0,0,1,rt*2,0),e.drawImage(n.mat,0,0),e.restore()):(t.drawImage(this.sideTexture("back"),rt,0),e.drawImage(s.mat,rt,0)),{color:this.atlas,mat:this.atlasMat}}alphaGrid(t=4){let e=this.sides.front.cx,n=e.color.getImageData(0,0,rt,Tt).data,s=e.mat.getImageData(0,0,rt,Tt).data,r=e.lines.getImageData(0,0,rt,Tt).data,o=rt/t,a=Tt/t,c=new Uint8Array(o*a),l=new Uint8Array(o*a),d=new Uint8Array(o*a);for(let f=3;f<r.length;f+=4)if(r[f]>90){let g=(f-3)/4,_=g%rt,m=g/rt|0;d[(m/t|0)*o+(_/t|0)]=1}let h=!1;for(let f=0;f<Tt;f++)for(let g=0;g<rt;g++){let _=(f*rt+g)*4;if(n[_+3]<=20)continue;let m=(f/t|0)*o+(g/t|0);c[m]=1,h=!0,s[_+3]===255&&(l[m]=s[_])}let u=this.fillFabric;return{data:c,ids:l,lines:d,w:o,h:a,step:t,any:h,fabricOf:f=>u[f]||"cotton"}}composite(t=600,e="#fffdfa",n="front"){let s=t/Tt,r=Gn(Math.round(rt*s),t),o=r.getContext("2d");o.fillStyle=e,o.fillRect(0,0,r.width,r.height);let a=this.sides[n];return o.drawImage(a.color,0,0,r.width,r.height),o.drawImage(a.lines,0,0,r.width,r.height),r}async layerBlobs(){let t=r=>new Promise(o=>r.toBlob(o,"image/png")),e=this.sides.front,n=this.sides.back,s={color:await t(e.color),mat:await t(e.mat),lines:await t(e.lines)};return this.backLinked||(s.bcolor=await t(n.color),s.bmat=await t(n.mat),s.blines=await t(n.lines)),s}async loadLayers(t){for(let[n,s]of[["front",""],["back","b"]])for(let r of["color","mat","lines"]){let o=this.sides[n].cx[r];if(o.clearRect(0,0,rt,Tt),!t[s+r])continue;let a=await createImageBitmap(t[s+r]);o.drawImage(a,0,0,rt,Tt)}this.backLinked=!(t.bcolor||t.blines),this.useSide("front");let e=0;for(let n of["front","back"]){let s=this.sides[n].cx.mat.getImageData(0,0,rt,Tt).data;for(let r=0;r<s.length;r+=4)s[r+3]&&s[r]>e&&(e=s[r])}this.fillId=e,this.fillFabric={...t.fills||{}},this.resetHistory(),this.dirty=!0}};var gi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},_i={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qh=0,Gc=1,tu=2;var Wc=1,Uo=2,Un=3,on=0,Ae=1,Je=2,Jn=0,Ci=1,Xc=2,qc=3,Yc=4,eu=5,hi=100,nu=101,iu=102,su=103,ru=104,ou=200,au=201,cu=202,lu=203,po=204,mo=205,hu=206,uu=207,du=208,fu=209,pu=210,mu=211,gu=212,_u=213,xu=214,No=0,Fo=1,Oo=2,Ii=3,Bo=4,ko=5,zo=6,Ho=7,Vo=0,yu=1,vu=2,Sn=0,Mu=1,bu=2,Su=3,Go=4,wu=5,Tu=6,Eu=7;var Zc=300,zi=301,Hi=302,Wo=303,Xo=304,Er=306,_s=1e3,Cn=1001,xs=1002,ze=1003,qo=1004;var Vi=1005;var an=1006,Is=1007;var Nn=1008;var wn=1009,$c=1010,Kc=1011,Ps=1012,Yo=1013,xi=1014,Tn=1015,Ls=1016,Zo=1017,$o=1018,Ds=1020,Jc=35902,jc=35899,Qc=1021,tl=1022,je=1023,ys=1026,Us=1027,Ko=1028,Jo=1029,el=1030,jo=1031;var Qo=1033,Ar=33776,Rr=33777,Cr=33778,Ir=33779,ta=35840,ea=35841,na=35842,ia=35843,sa=36196,ra=37492,oa=37496,aa=37808,ca=37809,la=37810,ha=37811,ua=37812,da=37813,fa=37814,pa=37815,ma=37816,ga=37817,_a=37818,xa=37819,ya=37820,va=37821,Ma=36492,ba=36494,Sa=36495,wa=36283,Ta=36284,Ea=36285,Aa=36286;var Pi=2300,vs=2301,fo=2302,Uc=2400,Nc=2401,Fc=2402;var Au=3200,Ru=3201;var Ra=0,Cu=1,En="",Ue="srgb",Li="srgb-linear",rr="linear",le="srgb";var Ri=7680;var Oc=519,Iu=512,Pu=513,Lu=514,nl=515,Du=516,Uu=517,Nu=518,Fu=519,Bc=35044,il=35048;var sl="300 es",Mn=2e3,or=2001;var In=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rh=1234567,ir=Math.PI/180,Ms=180/Math.PI;function Ns(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[i&255]+Be[i>>8&255]+Be[i>>16&255]+Be[i>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase()}function jt(i,t,e){return Math.max(t,Math.min(e,i))}function rl(i,t){return(i%t+t)%t}function nf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function sf(i,t,e){return i!==t?(e-i)/(t-i):0}function sr(i,t,e){return(1-e)*i+e*t}function rf(i,t,e,n){return sr(i,t,1-Math.exp(-e*n))}function of(i,t=1){return t-Math.abs(rl(i,t*2)-t)}function af(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function cf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function lf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function hf(i,t){return i+Math.random()*(t-i)}function uf(i){return i*(.5-Math.random())}function df(i){i!==void 0&&(Rh=i);let t=Rh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ff(i){return i*ir}function pf(i){return i*Ms}function mf(i){return(i&i-1)===0&&i!==0}function gf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _f(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function xf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),d=o((t+n)/2),h=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*d,c*h,c*u,a*l);break;case"YZY":i.set(c*u,a*d,c*h,a*l);break;case"ZXZ":i.set(c*h,c*u,a*d,a*l);break;case"XZX":i.set(a*d,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*d,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*d,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ms(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Xe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Gi={DEG2RAD:ir,RAD2DEG:Ms,generateUUID:Ns,clamp:jt,euclideanModulo:rl,mapLinear:nf,inverseLerp:sf,lerp:sr,damp:rf,pingpong:of,smoothstep:af,smootherstep:cf,randInt:lf,randFloat:hf,randFloatSpread:uf,seededRandom:df,degToRad:ff,radToDeg:pf,isPowerOfTwo:mf,ceilPowerOfTwo:gf,floorPowerOfTwo:_f,setQuaternionFromProperEuler:xf,normalize:Xe,denormalize:ms},Vt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$e=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],d=n[s+2],h=n[s+3],u=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=d,t[e+3]=h;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==u||l!==f||d!==g){let m=1-a,p=c*u+l*f+d*g+h*_,w=p>=0?1:-1,T=1-p*p;if(T>Number.EPSILON){let A=Math.sqrt(T),E=Math.atan2(A,p*w);m=Math.sin(m*E)/A,a=Math.sin(a*E)/A}let x=a*w;if(c=c*m+u*x,l=l*m+f*x,d=d*m+g*x,h=h*m+_*x,m===1-a){let A=1/Math.sqrt(c*c+l*l+d*d+h*h);c*=A,l*=A,d*=A,h*=A}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],d=n[s+3],h=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+d*h+c*f-l*u,t[e+1]=c*g+d*u+l*h-a*f,t[e+2]=l*g+d*f+a*u-c*h,t[e+3]=d*g-a*h-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),d=a(s/2),h=a(r/2),u=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=u*d*h+l*f*g,this._y=l*f*h-u*d*g,this._z=l*d*g+u*f*h,this._w=l*d*h-u*f*g;break;case"YXZ":this._x=u*d*h+l*f*g,this._y=l*f*h-u*d*g,this._z=l*d*g-u*f*h,this._w=l*d*h+u*f*g;break;case"ZXY":this._x=u*d*h-l*f*g,this._y=l*f*h+u*d*g,this._z=l*d*g+u*f*h,this._w=l*d*h-u*f*g;break;case"ZYX":this._x=u*d*h-l*f*g,this._y=l*f*h+u*d*g,this._z=l*d*g-u*f*h,this._w=l*d*h+u*f*g;break;case"YZX":this._x=u*d*h+l*f*g,this._y=l*f*h+u*d*g,this._z=l*d*g-u*f*h,this._w=l*d*h-u*f*g;break;case"XZY":this._x=u*d*h-l*f*g,this._y=l*f*h-u*d*g,this._z=l*d*g+u*f*h,this._w=l*d*h+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],d=e[6],h=e[10],u=n+a+h;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(d-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+d)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(jt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,d=e._w;return this._x=n*d+o*a+s*l-r*c,this._y=s*d+o*c+r*a-n*l,this._z=r*d+o*l+n*c-s*a,this._w=o*d-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),d=Math.atan2(l,a),h=Math.sin((1-e)*d)/l,u=Math.sin(e*d)/l;return this._w=o*h+this._w*u,this._x=n*h+this._x*u,this._y=s*h+this._y*u,this._z=r*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ch.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ch.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),d=2*(a*e-r*s),h=2*(r*n-o*e);return this.x=e+c*l+o*h-a*d,this.y=n+c*d+a*l-r*h,this.z=s+c*h+r*d-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return uc.copy(this).projectOnVector(t),this.sub(uc)}reflect(t){return this.sub(uc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},uc=new F,Ch=new $e,$t=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=r,d[5]=c,d[6]=n,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],d=n[4],h=n[7],u=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],w=s[1],T=s[4],x=s[7],A=s[2],E=s[5],R=s[8];return r[0]=o*_+a*w+c*A,r[3]=o*m+a*T+c*E,r[6]=o*p+a*x+c*R,r[1]=l*_+d*w+h*A,r[4]=l*m+d*T+h*E,r[7]=l*p+d*x+h*R,r[2]=u*_+f*w+g*A,r[5]=u*m+f*T+g*E,r[8]=u*p+f*x+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8];return e*o*d-e*a*l-n*r*d+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],h=d*o-a*l,u=a*c-d*r,f=l*r-o*c,g=e*h+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=h*_,t[1]=(s*l-d*n)*_,t[2]=(a*n-s*o)*_,t[3]=u*_,t[4]=(d*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(dc.makeScale(t,e)),this}rotate(t){return this.premultiply(dc.makeRotation(-t)),this}translate(t,e){return this.premultiply(dc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},dc=new $t;function ol(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ou(){let i=ar("canvas");return i.style.display="block",i}var Ih={};function bs(i){i in Ih||(Ih[i]=!0,console.warn(i))}function Bu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Ph=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lh=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yf(){let i={enabled:!0,workingColorSpace:Li,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===le&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===le&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===En?rr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return bs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return bs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Li]:{primaries:t,whitePoint:n,transfer:rr,toXYZ:Ph,fromXYZ:Lh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:t,whitePoint:n,transfer:le,toXYZ:Ph,fromXYZ:Lh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}}),i}var ee=yf();function $n(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ns,Ss=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ns===void 0&&(ns=ar("canvas")),ns.width=t.width,ns.height=t.height;let s=ns.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ns}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ar("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=$n(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($n(e[n]/255)*255):e[n]=$n(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},vf=0,ui=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=Ns(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(fc(s[o].image)):r.push(fc(s[o]))}else r=fc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function fc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ss.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Mf=0,pc=new F,He=class i extends In{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Cn,s=Cn,r=an,o=Nn,a=je,c=wn,l=i.DEFAULT_ANISOTROPY,d=En){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Ns(),this.name="",this.source=new ui(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(pc).x}get height(){return this.source.getSize(pc).y}get depth(){return this.source.getSize(pc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _s:t.x=t.x-Math.floor(t.x);break;case Cn:t.x=t.x<0?0:1;break;case xs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _s:t.y=t.y-Math.floor(t.y);break;case Cn:t.y=t.y<0?0:1;break;case xs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=Zc;He.DEFAULT_ANISOTROPY=1;var ce=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],d=c[4],h=c[8],u=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(d-u)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(l+1)/2,x=(f+1)/2,A=(p+1)/2,E=(d+u)/4,R=(h+_)/4,P=(g+m)/4;return T>x&&T>A?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=E/n,r=R/n):x>A?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=E/s,r=P/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=R/r,s=P/r),this.set(n,s,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(u-d)*(u-d));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(h-_)/w,this.z=(u-d)/w,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this.w=jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this.w=jt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},go=class extends In{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new He(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:an,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ui(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},mn=class extends go{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},cr=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var _o=class extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pn=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,xn):xn.fromBufferAttribute(r,o),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Yr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yr.copy(n.boundingBox)),Yr.applyMatrix4(t.matrixWorld),this.union(Yr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ks),Zr.subVectors(this.max,Ks),is.subVectors(t.a,Ks),ss.subVectors(t.b,Ks),rs.subVectors(t.c,Ks),ii.subVectors(ss,is),si.subVectors(rs,ss),wi.subVectors(is,rs);let e=[0,-ii.z,ii.y,0,-si.z,si.y,0,-wi.z,wi.y,ii.z,0,-ii.x,si.z,0,-si.x,wi.z,0,-wi.x,-ii.y,ii.x,0,-si.y,si.x,0,-wi.y,wi.x,0];return!mc(e,is,ss,rs,Zr)||(e=[1,0,0,0,1,0,0,0,1],!mc(e,is,ss,rs,Zr))?!1:($r.crossVectors(ii,si),e=[$r.x,$r.y,$r.z],mc(e,is,ss,rs,Zr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Wn=[new F,new F,new F,new F,new F,new F,new F,new F],xn=new F,Yr=new Pn,is=new F,ss=new F,rs=new F,ii=new F,si=new F,wi=new F,Ks=new F,Zr=new F,$r=new F,Ti=new F;function mc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ti.fromArray(i,r);let a=s.x*Math.abs(Ti.x)+s.y*Math.abs(Ti.y)+s.z*Math.abs(Ti.z),c=t.dot(Ti),l=e.dot(Ti),d=n.dot(Ti);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}var bf=new Pn,Js=new F,gc=new F,di=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):bf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Js.subVectors(t,this.center);let e=Js.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Js,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(gc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Js.copy(t.center).add(gc)),this.expandByPoint(Js.copy(t.center).sub(gc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Xn=new F,_c=new F,Kr=new F,ri=new F,xc=new F,Jr=new F,yc=new F,Di=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Xn.copy(this.origin).addScaledVector(this.direction,e),Xn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){_c.copy(t).add(e).multiplyScalar(.5),Kr.copy(e).sub(t).normalize(),ri.copy(this.origin).sub(_c);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Kr),a=ri.dot(this.direction),c=-ri.dot(Kr),l=ri.lengthSq(),d=Math.abs(1-o*o),h,u,f,g;if(d>0)if(h=o*c-a,u=o*a-c,g=r*d,h>=0)if(u>=-g)if(u<=g){let _=1/d;h*=_,u*=_,f=h*(h+o*u+2*a)+u*(o*h+u+2*c)+l}else u=r,h=Math.max(0,-(o*u+a)),f=-h*h+u*(u+2*c)+l;else u=-r,h=Math.max(0,-(o*u+a)),f=-h*h+u*(u+2*c)+l;else u<=-g?(h=Math.max(0,-(-o*r+a)),u=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+u*(u+2*c)+l):u<=g?(h=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(h=Math.max(0,-(o*r+a)),u=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+u*(u+2*c)+l);else u=o>0?-r:r,h=Math.max(0,-(o*u+a)),f=-h*h+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(_c).addScaledVector(Kr,u),f}intersectSphere(t,e){Xn.subVectors(t.center,this.origin);let n=Xn.dot(this.direction),s=Xn.dot(Xn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),d>=0?(r=(t.min.y-u.y)*d,o=(t.max.y-u.y)*d):(r=(t.max.y-u.y)*d,o=(t.min.y-u.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-u.z)*h,c=(t.max.z-u.z)*h):(a=(t.max.z-u.z)*h,c=(t.min.z-u.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Xn)!==null}intersectTriangle(t,e,n,s,r){xc.subVectors(e,t),Jr.subVectors(n,t),yc.crossVectors(xc,Jr);let o=this.direction.dot(yc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ri.subVectors(this.origin,t);let c=a*this.direction.dot(Jr.crossVectors(ri,Jr));if(c<0)return null;let l=a*this.direction.dot(xc.cross(ri));if(l<0||c+l>o)return null;let d=-a*ri.dot(yc);return d<0?null:this.at(d/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},he=class i{constructor(t,e,n,s,r,o,a,c,l,d,h,u,f,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,d,h,u,f,g,_,m)}set(t,e,n,s,r,o,a,c,l,d,h,u,f,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=d,p[10]=h,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/os.setFromMatrixColumn(t,0).length(),r=1/os.setFromMatrixColumn(t,1).length(),o=1/os.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){let u=o*d,f=o*h,g=a*d,_=a*h;e[0]=c*d,e[4]=-c*h,e[8]=l,e[1]=f+g*l,e[5]=u-_*l,e[9]=-a*c,e[2]=_-u*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){let u=c*d,f=c*h,g=l*d,_=l*h;e[0]=u+_*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*h,e[5]=o*d,e[9]=-a,e[2]=f*a-g,e[6]=_+u*a,e[10]=o*c}else if(t.order==="ZXY"){let u=c*d,f=c*h,g=l*d,_=l*h;e[0]=u-_*a,e[4]=-o*h,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*d,e[9]=_-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let u=o*d,f=o*h,g=a*d,_=a*h;e[0]=c*d,e[4]=g*l-f,e[8]=u*l+_,e[1]=c*h,e[5]=_*l+u,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let u=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*d,e[4]=_-u*h,e[8]=g*h+f,e[1]=h,e[5]=o*d,e[9]=-a*d,e[2]=-l*d,e[6]=f*h+g,e[10]=u-_*h}else if(t.order==="XZY"){let u=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*d,e[4]=-h,e[8]=l*d,e[1]=u*h+_,e[5]=o*d,e[9]=f*h-g,e[2]=g*h-f,e[6]=a*d,e[10]=_*h+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sf,t,wf)}lookAt(t,e,n){let s=this.elements;return nn.subVectors(t,e),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),oi.crossVectors(n,nn),oi.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),oi.crossVectors(n,nn)),oi.normalize(),jr.crossVectors(nn,oi),s[0]=oi.x,s[4]=jr.x,s[8]=nn.x,s[1]=oi.y,s[5]=jr.y,s[9]=nn.y,s[2]=oi.z,s[6]=jr.z,s[10]=nn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],d=n[1],h=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],w=n[3],T=n[7],x=n[11],A=n[15],E=s[0],R=s[4],P=s[8],M=s[12],v=s[1],I=s[5],L=s[9],N=s[13],k=s[2],H=s[6],V=s[10],j=s[14],G=s[3],at=s[7],mt=s[11],_t=s[15];return r[0]=o*E+a*v+c*k+l*G,r[4]=o*R+a*I+c*H+l*at,r[8]=o*P+a*L+c*V+l*mt,r[12]=o*M+a*N+c*j+l*_t,r[1]=d*E+h*v+u*k+f*G,r[5]=d*R+h*I+u*H+f*at,r[9]=d*P+h*L+u*V+f*mt,r[13]=d*M+h*N+u*j+f*_t,r[2]=g*E+_*v+m*k+p*G,r[6]=g*R+_*I+m*H+p*at,r[10]=g*P+_*L+m*V+p*mt,r[14]=g*M+_*N+m*j+p*_t,r[3]=w*E+T*v+x*k+A*G,r[7]=w*R+T*I+x*H+A*at,r[11]=w*P+T*L+x*V+A*mt,r[15]=w*M+T*N+x*j+A*_t,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],d=t[2],h=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*h-s*l*h-r*a*u+n*l*u+s*a*f-n*c*f)+_*(+e*c*f-e*l*u+r*o*u-s*o*f+s*l*d-r*c*d)+m*(+e*l*h-e*a*f-r*o*h+n*o*f+r*a*d-n*l*d)+p*(-s*a*d-e*c*h+e*a*u+s*o*h-n*o*u+n*c*d)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],h=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],w=h*m*l-_*u*l+_*c*f-a*m*f-h*c*p+a*u*p,T=g*u*l-d*m*l-g*c*f+o*m*f+d*c*p-o*u*p,x=d*_*l-g*h*l+g*a*f-o*_*f-d*a*p+o*h*p,A=g*h*c-d*_*c-g*a*u+o*_*u+d*a*m-o*h*m,E=e*w+n*T+s*x+r*A;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/E;return t[0]=w*R,t[1]=(_*u*r-h*m*r-_*s*f+n*m*f+h*s*p-n*u*p)*R,t[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*R,t[3]=(h*c*r-a*u*r-h*s*l+n*u*l+a*s*f-n*c*f)*R,t[4]=T*R,t[5]=(d*m*r-g*u*r+g*s*f-e*m*f-d*s*p+e*u*p)*R,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*R,t[7]=(o*u*r-d*c*r+d*s*l-e*u*l-o*s*f+e*c*f)*R,t[8]=x*R,t[9]=(g*h*r-d*_*r-g*n*f+e*_*f+d*n*p-e*h*p)*R,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*R,t[11]=(d*a*r-o*h*r-d*n*l+e*h*l+o*n*f-e*a*f)*R,t[12]=A*R,t[13]=(d*_*s-g*h*s+g*n*u-e*_*u-d*n*m+e*h*m)*R,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*R,t[15]=(o*h*s-d*a*s+d*n*c-e*h*c-o*n*u+e*a*u)*R,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,d=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,d*a+n,d*c-s*o,0,l*c-s*a,d*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,d=o+o,h=a+a,u=r*l,f=r*d,g=r*h,_=o*d,m=o*h,p=a*h,w=c*l,T=c*d,x=c*h,A=n.x,E=n.y,R=n.z;return s[0]=(1-(_+p))*A,s[1]=(f+x)*A,s[2]=(g-T)*A,s[3]=0,s[4]=(f-x)*E,s[5]=(1-(u+p))*E,s[6]=(m+w)*E,s[7]=0,s[8]=(g+T)*R,s[9]=(m-w)*R,s[10]=(1-(u+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=os.set(s[0],s[1],s[2]).length(),o=os.set(s[4],s[5],s[6]).length(),a=os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],yn.copy(this);let l=1/r,d=1/o,h=1/a;return yn.elements[0]*=l,yn.elements[1]*=l,yn.elements[2]*=l,yn.elements[4]*=d,yn.elements[5]*=d,yn.elements[6]*=d,yn.elements[8]*=h,yn.elements[9]*=h,yn.elements[10]*=h,e.setFromRotationMatrix(yn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Mn,c=!1){let l=this.elements,d=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),g,_;if(c)g=r/(o-r),_=o*r/(o-r);else if(a===Mn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===or)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Mn,c=!1){let l=this.elements,d=2/(e-t),h=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s),g,_;if(c)g=1/(o-r),_=o/(o-r);else if(a===Mn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===or)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=h,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},os=new F,yn=new he,Sf=new F(0,0,0),wf=new F(1,1,1),oi=new F,jr=new F,nn=new F,Dh=new he,Uh=new $e,gn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],d=s[9],h=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-jt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Dh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Dh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Uh.setFromEuler(this),this.setFromQuaternion(Uh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gn.DEFAULT_ORDER="XYZ";var ws=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Tf=0,Nh=new F,as=new $e,qn=new he,Qr=new F,js=new F,Ef=new F,Af=new $e,Fh=new F(1,0,0),Oh=new F(0,1,0),Bh=new F(0,0,1),kh={type:"added"},Rf={type:"removed"},cs={type:"childadded",child:null},vc={type:"childremoved",child:null},Ne=class i extends In{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Ns(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new F,e=new gn,n=new $e,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new $t}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return as.setFromAxisAngle(t,e),this.quaternion.multiply(as),this}rotateOnWorldAxis(t,e){return as.setFromAxisAngle(t,e),this.quaternion.premultiply(as),this}rotateX(t){return this.rotateOnAxis(Fh,t)}rotateY(t){return this.rotateOnAxis(Oh,t)}rotateZ(t){return this.rotateOnAxis(Bh,t)}translateOnAxis(t,e){return Nh.copy(t).applyQuaternion(this.quaternion),this.position.add(Nh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Fh,t)}translateY(t){return this.translateOnAxis(Oh,t)}translateZ(t){return this.translateOnAxis(Bh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Qr.copy(t):Qr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(js,Qr,this.up):qn.lookAt(Qr,js,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),as.setFromRotationMatrix(qn),this.quaternion.premultiply(as.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(kh),cs.child=t,this.dispatchEvent(cs),cs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rf),vc.child=t,this.dispatchEvent(vc),vc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(kh),cs.child=t,this.dispatchEvent(cs),cs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,t,Ef),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,Af,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){let h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),d=o(t.images),h=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let d=a[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ne.DEFAULT_UP=new F(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var vn=new F,Yn=new F,Mc=new F,Zn=new F,ls=new F,hs=new F,zh=new F,bc=new F,Sc=new F,wc=new F,Tc=new ce,Ec=new ce,Ac=new ce,li=class i{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),vn.subVectors(t,e),s.cross(vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){vn.subVectors(s,e),Yn.subVectors(n,e),Mc.subVectors(t,e);let o=vn.dot(vn),a=vn.dot(Yn),c=vn.dot(Mc),l=Yn.dot(Yn),d=Yn.dot(Mc),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;let u=1/h,f=(l*c-a*d)*u,g=(o*d-a*c)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zn.x),c.addScaledVector(o,Zn.y),c.addScaledVector(a,Zn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Tc.setScalar(0),Ec.setScalar(0),Ac.setScalar(0),Tc.fromBufferAttribute(t,e),Ec.fromBufferAttribute(t,n),Ac.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Tc,r.x),o.addScaledVector(Ec,r.y),o.addScaledVector(Ac,r.z),o}static isFrontFacing(t,e,n,s){return vn.subVectors(n,e),Yn.subVectors(t,e),vn.cross(Yn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),vn.cross(Yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;ls.subVectors(s,n),hs.subVectors(r,n),bc.subVectors(t,n);let c=ls.dot(bc),l=hs.dot(bc);if(c<=0&&l<=0)return e.copy(n);Sc.subVectors(t,s);let d=ls.dot(Sc),h=hs.dot(Sc);if(d>=0&&h<=d)return e.copy(s);let u=c*h-d*l;if(u<=0&&c>=0&&d<=0)return o=c/(c-d),e.copy(n).addScaledVector(ls,o);wc.subVectors(t,r);let f=ls.dot(wc),g=hs.dot(wc);if(g>=0&&f<=g)return e.copy(r);let _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(hs,a);let m=d*g-f*h;if(m<=0&&h-d>=0&&f-g>=0)return zh.subVectors(r,s),a=(h-d)/(h-d+(f-g)),e.copy(s).addScaledVector(zh,a);let p=1/(m+_+u);return o=_*p,a=u*p,e.copy(n).addScaledVector(ls,o).addScaledVector(hs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ku={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},to={h:0,s:0,l:0};function Rc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var qt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=rl(t,1),e=jt(e,0,1),n=jt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Rc(o,r,t+1/3),this.g=Rc(o,r,t),this.b=Rc(o,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=Ue){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){let n=ku[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$n(t.r),this.g=$n(t.g),this.b=$n(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return ee.workingToColorSpace(ke.copy(this),t),Math.round(jt(ke.r*255,0,255))*65536+Math.round(jt(ke.g*255,0,255))*256+Math.round(jt(ke.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(ke.copy(this),e);let n=ke.r,s=ke.g,r=ke.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,d=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=d<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(ke.copy(this),e),t.r=ke.r,t.g=ke.g,t.b=ke.b,t}getStyle(t=Ue){ee.workingToColorSpace(ke.copy(this),t);let e=ke.r,n=ke.g,s=ke.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ai),this.setHSL(ai.h+t,ai.s+e,ai.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ai),t.getHSL(to);let n=sr(ai.h,to.h,e),s=sr(ai.s,to.s,e),r=sr(ai.l,to.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ke=new qt;qt.NAMES=ku;var Cf=0,Kn=class extends In{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=Ns(),this.name="",this.type="Material",this.blending=Ci,this.side=on,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=po,this.blendDst=mo,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Ii,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ci&&(n.blending=this.blending),this.side!==on&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==po&&(n.blendSrc=this.blendSrc),this.blendDst!==mo&&(n.blendDst=this.blendDst),this.blendEquation!==hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ii&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},lr=class extends Kn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ee=new F,eo=new Vt,If=0,xe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:If++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Bc,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)eo.fromBufferAttribute(this,e),eo.applyMatrix3(t),this.setXY(e,eo.x,eo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ms(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),n=Xe(n,this.array),s=Xe(s,this.array),r=Xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Bc&&(t.usage=this.usage),t}};var hr=class extends xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ur=class extends xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var we=class extends xe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Pf=0,fn=new he,Cc=new Ne,us=new F,sn=new Pn,Qs=new Pn,De=new F,Ke=class i extends In{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=Ns(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ol(t)?ur:hr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,n){return fn.makeTranslation(t,e,n),this.applyMatrix4(fn),this}scale(t,e,n){return fn.makeScale(t,e,n),this.applyMatrix4(fn),this}lookAt(t){return Cc.lookAt(t),Cc.updateMatrix(),this.applyMatrix4(Cc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new we(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(sn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Qs.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(sn.min,Qs.min),sn.expandByPoint(De),De.addVectors(sn.max,Qs.max),sn.expandByPoint(De)):(sn.expandByPoint(Qs.min),sn.expandByPoint(Qs.max))}sn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)De.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(De));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)De.fromBufferAttribute(a,l),c&&(us.fromBufferAttribute(t,l),De.add(us)),s=Math.max(s,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new F,c[P]=new F;let l=new F,d=new F,h=new F,u=new Vt,f=new Vt,g=new Vt,_=new F,m=new F;function p(P,M,v){l.fromBufferAttribute(n,P),d.fromBufferAttribute(n,M),h.fromBufferAttribute(n,v),u.fromBufferAttribute(r,P),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,v),d.sub(l),h.sub(l),f.sub(u),g.sub(u);let I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(I),m.copy(h).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(I),a[P].add(_),a[M].add(_),a[v].add(_),c[P].add(m),c[M].add(m),c[v].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let P=0,M=w.length;P<M;++P){let v=w[P],I=v.start,L=v.count;for(let N=I,k=I+L;N<k;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}let T=new F,x=new F,A=new F,E=new F;function R(P){A.fromBufferAttribute(s,P),E.copy(A);let M=a[P];T.copy(M),T.sub(A.multiplyScalar(A.dot(M))).normalize(),x.crossVectors(E,M);let I=x.dot(c[P])<0?-1:1;o.setXYZW(P,T.x,T.y,T.z,I)}for(let P=0,M=w.length;P<M;++P){let v=w[P],I=v.start,L=v.count;for(let N=I,k=I+L;N<k;N+=3)R(t.getX(N+0)),R(t.getX(N+1)),R(t.getX(N+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,d=new F,h=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(d),c.add(d),l.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,c){let l=a.array,d=a.itemSize,h=a.normalized,u=new l.constructor(c.length*d),f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*d;for(let p=0;p<d;p++)u[g++]=l[f++]}return new xe(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let d=0,h=l.length;d<h;d++){let u=l[d],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],d=[];for(let h=0,u=l.length;h<u;h++){let f=l[h];d.push(f.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let d=s[l];this.setAttribute(l,d.clone(e))}let r=t.morphAttributes;for(let l in r){let d=[],h=r[l];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,d=o.length;l<d;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Hh=new he,Ei=new Di,no=new di,Vh=new F,io=new F,so=new F,ro=new F,Ic=new F,oo=new F,Gh=new F,ao=new F,ae=class extends Ne{constructor(t=new Ke,e=new lr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){oo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let d=a[c],h=r[c];d!==0&&(Ic.fromBufferAttribute(h,t),o?oo.addScaledVector(Ic,d):oo.addScaledVector(Ic.sub(e),d))}e.add(oo)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(r),Ei.copy(t.ray).recast(t.near),!(no.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(no,Vh)===null||Ei.origin.distanceToSquared(Vh)>(t.far-t.near)**2))&&(Hh.copy(r).invert(),Ei.copy(t.ray).applyMatrix4(Hh),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ei)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],w=Math.max(m.start,f.start),T=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=w,A=T;x<A;x+=3){let E=a.getX(x),R=a.getX(x+1),P=a.getX(x+2);s=co(this,p,t,n,l,d,h,E,R,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let w=a.getX(m),T=a.getX(m+1),x=a.getX(m+2);s=co(this,o,t,n,l,d,h,w,T,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=o[m.materialIndex],w=Math.max(m.start,f.start),T=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let x=w,A=T;x<A;x+=3){let E=x,R=x+1,P=x+2;s=co(this,p,t,n,l,d,h,E,R,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let w=m,T=m+1,x=m+2;s=co(this,o,t,n,l,d,h,w,T,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Lf(i,t,e,n,s,r,o,a){let c;if(t.side===Ae?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===on,a),c===null)return null;ao.copy(a),ao.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ao);return l<e.near||l>e.far?null:{distance:l,point:ao.clone(),object:i}}function co(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,io),i.getVertexPosition(c,so),i.getVertexPosition(l,ro);let d=Lf(i,t,e,n,io,so,ro,Gh);if(d){let h=new F;li.getBarycoord(Gh,io,so,ro,h),s&&(d.uv=li.getInterpolatedAttribute(s,a,c,l,h,new Vt)),r&&(d.uv1=li.getInterpolatedAttribute(r,a,c,l,h,new Vt)),o&&(d.normal=li.getInterpolatedAttribute(o,a,c,l,h,new F),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new F,materialIndex:0};li.getNormal(io,so,ro,u.normal),d.face=u,d.barycoord=h}return d}var fi=class i extends Ke{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],d=[],h=[],u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new we(l,3)),this.setAttribute("normal",new we(d,3)),this.setAttribute("uv",new we(h,2));function g(_,m,p,w,T,x,A,E,R,P,M){let v=x/R,I=A/P,L=x/2,N=A/2,k=E/2,H=R+1,V=P+1,j=0,G=0,at=new F;for(let mt=0;mt<V;mt++){let _t=mt*I-N;for(let q=0;q<H;q++){let Dt=q*v-L;at[_]=Dt*w,at[m]=_t*T,at[p]=k,l.push(at.x,at.y,at.z),at[_]=0,at[m]=0,at[p]=E>0?1:-1,d.push(at.x,at.y,at.z),h.push(q/R),h.push(1-mt/P),j+=1}}for(let mt=0;mt<P;mt++)for(let _t=0;_t<R;_t++){let q=u+_t+H*mt,Dt=u+_t+H*(mt+1),Et=u+(_t+1)+H*(mt+1),zt=u+(_t+1)+H*mt;c.push(q,Dt,zt),c.push(Dt,Et,zt),G+=6}a.addGroup(f,G,M),f+=G,u+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Wi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ve(i){let t={};for(let e=0;e<i.length;e++){let n=Wi(i[e]);for(let s in n)t[s]=n[s]}return t}function Df(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function al(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var zu={clone:Wi,merge:Ve},Uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bn=class extends Kn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uf,this.fragmentShader=Nf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Wi(t.uniforms),this.uniformsGroups=Df(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},dr=class extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ci=new F,Wh=new Vt,Xh=new Vt,Oe=class extends dr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ms*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ir*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ms*2*Math.atan(Math.tan(ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ci.x,ci.y).multiplyScalar(-t/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-t/ci.z)}getViewSize(t,e){return this.getViewBounds(t,Wh,Xh),e.subVectors(Xh,Wh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ir*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ds=-90,fs=1,xo=class extends Ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Oe(ds,fs,t,e);s.layers=this.layers,this.add(s);let r=new Oe(ds,fs,t,e);r.layers=this.layers,this.add(r);let o=new Oe(ds,fs,t,e);o.layers=this.layers,this.add(o);let a=new Oe(ds,fs,t,e);a.layers=this.layers,this.add(a);let c=new Oe(ds,fs,t,e);c.layers=this.layers,this.add(c);let l=new Oe(ds,fs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===or)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,d]=this.children,h=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,d),t.setRenderTarget(h,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},fr=class extends He{constructor(t=[],e=zi,n,s,r,o,a,c,l,d){super(t,e,n,s,r,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},yo=class extends mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new fr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fi(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ae,blending:Jn});r.uniforms.tEquirect.value=e;let o=new ae(s,r),a=e.minFilter;return e.minFilter===Nn&&(e.minFilter=an),new xo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},rn=class extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ff={type:"move"},Ts=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let d=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ff)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new rn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var Ln=class extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var vo=class extends He{constructor(t=null,e=1,n=1,s,r,o,a,c,l=ze,d=ze,h,u){super(null,o,a,c,l,d,s,r,h,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var pr=class extends xe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ps=new he,qh=new he,lo=[],Yh=new Pn,Of=new he,tr=new ae,er=new di,mr=class extends ae{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new pr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Of)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Pn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ps),Yh.copy(t.boundingBox).applyMatrix4(ps),this.boundingBox.union(Yh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new di),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ps),er.copy(t.boundingSphere).applyMatrix4(ps),this.boundingSphere.union(er)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(tr.geometry=this.geometry,tr.material=this.material,tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),er.copy(this.boundingSphere),er.applyMatrix4(n),t.ray.intersectsSphere(er)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ps),qh.multiplyMatrices(n,ps),tr.matrixWorld=qh,tr.raycast(t,lo);for(let o=0,a=lo.length;o<a;o++){let c=lo[o];c.instanceId=r,c.object=this,e.push(c)}lo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new pr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new vo(new Float32Array(s*this.count),s,this.count,Ko,Tn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Pc=new F,Bf=new F,kf=new $t,pn=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Pc.subVectors(n,e).cross(Bf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Pc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||kf.getNormalMatrix(t),s=this.coplanarPoint(Pc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ai=new di,zf=new Vt(.5,.5),ho=new F,Es=class{constructor(t=new pn,e=new pn,n=new pn,s=new pn,r=new pn,o=new pn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Mn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],d=r[4],h=r[5],u=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],w=r[12],T=r[13],x=r[14],A=r[15];if(s[0].setComponents(l-o,f-d,p-g,A-w).normalize(),s[1].setComponents(l+o,f+d,p+g,A+w).normalize(),s[2].setComponents(l+a,f+h,p+_,A+T).normalize(),s[3].setComponents(l-a,f-h,p-_,A-T).normalize(),n)s[4].setComponents(c,u,m,x).normalize(),s[5].setComponents(l-c,f-u,p-m,A-x).normalize();else if(s[4].setComponents(l-c,f-u,p-m,A-x).normalize(),e===Mn)s[5].setComponents(l+c,f+u,p+m,A+x).normalize();else if(e===or)s[5].setComponents(c,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(t){Ai.center.set(0,0,0);let e=zf.distanceTo(t.center);return Ai.radius=.7071067811865476+e,Ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ho.x=s.normal.x>0?t.max.x:t.min.x,ho.y=s.normal.y>0?t.max.y:t.min.y,ho.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ho)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ui=class extends He{constructor(t,e,n,s,r,o,a,c,l,d,h,u){super(null,o,a,c,l,d,s,r,h,u),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}};var As=class extends He{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},gr=class extends He{constructor(t,e,n=xi,s,r,o,a=ze,c=ze,l,d=ys,h=1){if(d!==ys&&d!==Us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:h};super(u,s,r,o,a,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ui(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},_r=class extends He{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var xr=class i extends Ke{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let d=[],h=[],u=[],f=[],g=0,_=[],m=n/2,p=0;w(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(d),this.setAttribute("position",new we(h,3)),this.setAttribute("normal",new we(u,3)),this.setAttribute("uv",new we(f,2));function w(){let x=new F,A=new F,E=0,R=(e-t)/n;for(let P=0;P<=r;P++){let M=[],v=P/r,I=v*(e-t)+t;for(let L=0;L<=s;L++){let N=L/s,k=N*c+a,H=Math.sin(k),V=Math.cos(k);A.x=I*H,A.y=-v*n+m,A.z=I*V,h.push(A.x,A.y,A.z),x.set(H,R,V).normalize(),u.push(x.x,x.y,x.z),f.push(N,1-v),M.push(g++)}_.push(M)}for(let P=0;P<s;P++)for(let M=0;M<r;M++){let v=_[M][P],I=_[M+1][P],L=_[M+1][P+1],N=_[M][P+1];(t>0||M!==0)&&(d.push(v,I,N),E+=3),(e>0||M!==r-1)&&(d.push(I,L,N),E+=3)}l.addGroup(p,E,0),p+=E}function T(x){let A=g,E=new Vt,R=new F,P=0,M=x===!0?t:e,v=x===!0?1:-1;for(let L=1;L<=s;L++)h.push(0,m*v,0),u.push(0,v,0),f.push(.5,.5),g++;let I=g;for(let L=0;L<=s;L++){let k=L/s*c+a,H=Math.cos(k),V=Math.sin(k);R.x=M*V,R.y=m*v,R.z=M*H,h.push(R.x,R.y,R.z),u.push(0,v,0),E.x=H*.5+.5,E.y=V*.5*v+.5,f.push(E.x,E.y),g++}for(let L=0;L<s;L++){let N=A+L,k=I+L;x===!0?d.push(k,k+1,N):d.push(k+1,k,N),P+=3}l.addGroup(p,P,x===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var yr=class i extends Ke{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,d=c+1,h=t/a,u=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<d;p++){let w=p*u-o;for(let T=0;T<l;T++){let x=T*h-r;g.push(x,-w,0),_.push(0,0,1),m.push(T/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let w=0;w<a;w++){let T=w+l*p,x=w+l*(p+1),A=w+1+l*(p+1),E=w+1+l*p;f.push(T,x,E),f.push(x,A,E)}this.setIndex(f),this.setAttribute("position",new we(g,3)),this.setAttribute("normal",new we(_,3)),this.setAttribute("uv",new we(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Ni=class i extends Ke{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,d=[],h=new F,u=new F,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let w=[],T=p/n,x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let A=0;A<=e;A++){let E=A/e;h.x=-t*Math.cos(s+E*r)*Math.sin(o+T*a),h.y=t*Math.cos(o+T*a),h.z=t*Math.sin(s+E*r)*Math.sin(o+T*a),g.push(h.x,h.y,h.z),u.copy(h).normalize(),_.push(u.x,u.y,u.z),m.push(E+x,1-T),w.push(l++)}d.push(w)}for(let p=0;p<n;p++)for(let w=0;w<e;w++){let T=d[p][w+1],x=d[p][w],A=d[p+1][w],E=d[p+1][w+1];(p!==0||o>0)&&f.push(T,x,E),(p!==n-1||c<Math.PI)&&f.push(x,A,E)}this.setIndex(f),this.setAttribute("position",new we(g,3)),this.setAttribute("normal",new we(_,3)),this.setAttribute("uv",new we(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Dn=class extends Kn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ra,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},vr=class extends Dn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Vt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Fi=class extends Kn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ra,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Mo=class extends Kn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Au,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},bo=class extends Kn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function uo(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Hf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Oi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},So=class extends Oi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Uc,endingEnd:Uc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Nc:r=t,a=2*e-n;break;case Fc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Nc:o=t,c=2*n-e;break;case Fc:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,d=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*d,this._offsetNext=o*d}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,d=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-u*m+2*u*_-u*g,w=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,T=(-1-f)*m+(1.5+f)*_+.5*g,x=f*m-f*_;for(let A=0;A!==a;++A)r[A]=p*o[d+A]+w*o[l+A]+T*o[c+A]+x*o[h+A];return r}},wo=class extends Oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,d=(n-e)/(s-e),h=1-d;for(let u=0;u!==a;++u)r[u]=o[l+u]*h+o[c+u]*d;return r}},To=class extends Oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},cn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=uo(e,this.TimeBufferType),this.values=uo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:uo(t.times,Array),values:uo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new To(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new wo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new So(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Pi:e=this.InterpolantFactoryMethodDiscrete;break;case vs:e=this.InterpolantFactoryMethodLinear;break;case fo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Pi;case this.InterpolantFactoryMethodLinear:return vs;case this.InterpolantFactoryMethodSmooth:return fo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Hf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===fo,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],d=t[a+1];if(l!==d&&(a!==1||l!==t[0]))if(s)c=!0;else{let h=a*n,u=h-n,f=h+n;for(let g=0;g!==n;++g){let _=e[h+g];if(_!==e[u+g]||_!==e[f+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let h=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[h+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};cn.prototype.ValueTypeName="";cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=vs;var pi=class extends cn{constructor(t,e,n){super(t,e,n)}};pi.prototype.ValueTypeName="bool";pi.prototype.ValueBufferType=Array;pi.prototype.DefaultInterpolation=Pi;pi.prototype.InterpolantFactoryMethodLinear=void 0;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var Eo=class extends cn{constructor(t,e,n,s){super(t,e,n,s)}};Eo.prototype.ValueTypeName="color";var Ao=class extends cn{constructor(t,e,n,s){super(t,e,n,s)}};Ao.prototype.ValueTypeName="number";var Ro=class extends Oi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let d=l+a;l!==d;l+=4)$e.slerpFlat(r,0,o,l-a,o,l,c);return r}},Mr=class extends cn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Ro(this.times,this.values,this.getValueSize(),t)}};Mr.prototype.ValueTypeName="quaternion";Mr.prototype.InterpolantFactoryMethodSmooth=void 0;var mi=class extends cn{constructor(t,e,n){super(t,e,n)}};mi.prototype.ValueTypeName="string";mi.prototype.ValueBufferType=Array;mi.prototype.DefaultInterpolation=Pi;mi.prototype.InterpolantFactoryMethodLinear=void 0;mi.prototype.InterpolantFactoryMethodSmooth=void 0;var Co=class extends cn{constructor(t,e,n,s){super(t,e,n,s)}};Co.prototype.ValueTypeName="vector";var Io=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,h){return l.push(d,h),this},this.removeHandler=function(d){let h=l.indexOf(d);return h!==-1&&l.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=l.length;h<u;h+=2){let f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Hu=new Io,Po=class{constructor(t){this.manager=t!==void 0?t:Hu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Po.DEFAULT_MATERIAL_NAME="__DEFAULT";var Rs=class extends Ne{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},br=class extends Rs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Lc=new he,Zh=new F,$h=new F,Lo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vt(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Es,this._frameExtents=new Vt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Zh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Zh),$h.setFromMatrixPosition(t.target.matrixWorld),e.lookAt($h),e.updateMatrixWorld(),Lc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lc,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Lc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Kh=new he,nr=new F,Dc=new F,kc=class extends Lo{constructor(){super(new Oe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Vt(4,2),this._viewportCount=6,this._viewports=[new ce(2,1,1,1),new ce(0,1,1,1),new ce(3,1,1,1),new ce(1,1,1,1),new ce(3,0,1,1),new ce(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),nr.setFromMatrixPosition(t.matrixWorld),n.position.copy(nr),Dc.copy(n.position),Dc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Dc),n.updateMatrixWorld(),s.makeTranslation(-nr.x,-nr.y,-nr.z),Kh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kh,n.coordinateSystem,n.reversedDepth)}},Sr=class extends Rs{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new kc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Bi=class extends dr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},zc=class extends Lo{constructor(){super(new Bi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ki=class extends Rs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new zc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Do=class extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var cl="\\[\\]\\.:\\/",Vf=new RegExp("["+cl+"]","g"),ll="[^"+cl+"]",Gf="[^"+cl.replace("\\.","")+"]",Wf=/((?:WC+[\/:])*)/.source.replace("WC",ll),Xf=/(WCOD+)?/.source.replace("WCOD",Gf),qf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ll),Yf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ll),Zf=new RegExp("^"+Wf+Xf+qf+Yf+"$"),$f=["material","materials","bones","map"],Hc=class{constructor(t,e,n){let s=n||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},oe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Vf,"")}static parseTrackName(t){let e=Zf.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);$f.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===l){l=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=Hc;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var lx=new Float32Array(1);var Jh=new he,wr=class{constructor(t,e,n=0,s=1/0){this.ray=new Di(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ws,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Jh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jh),this}intersectObject(t,e=!0,n=[]){return Vc(t,this,n,e),n.sort(jh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Vc(t[s],this,n,e);return n.sort(jh),n}};function jh(i,t){return i.distance-t.distance}function Vc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Vc(r[o],t,e,!0)}}var Cs=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=jt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(jt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Tr=class extends In{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function hl(i,t,e,n){let s=Kf(n);switch(e){case Qc:return i*t;case Ko:return i*t/s.components*s.byteLength;case Jo:return i*t/s.components*s.byteLength;case el:return i*t*2/s.components*s.byteLength;case jo:return i*t*2/s.components*s.byteLength;case tl:return i*t*3/s.components*s.byteLength;case je:return i*t*4/s.components*s.byteLength;case Qo:return i*t*4/s.components*s.byteLength;case Ar:case Rr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Cr:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ea:case ia:return Math.max(i,16)*Math.max(t,8)/4;case ta:case na:return Math.max(i,8)*Math.max(t,8)/2;case sa:case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ca:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case la:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ha:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ua:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case da:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case fa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case pa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ma:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ga:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case _a:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case xa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ya:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case va:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ma:case ba:case Sa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case wa:case Ta:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ea:case Aa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Kf(i){switch(i){case wn:case $c:return{byteLength:1,components:1};case Ps:case Kc:case Ls:return{byteLength:2,components:1};case Zo:case $o:return{byteLength:2,components:4};case xi:case Yo:case Tn:return{byteLength:4,components:1};case Jc:case jc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function ud(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Jf(i){let t=new WeakMap;function e(a,c){let l=a.array,d=a.usage,h=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,d),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){let d=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,d);else{h.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<h.length;f++){let g=h[u],_=h[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,h[u]=_)}h.length=u+1;for(let f=0,g=h.length;f<g;f++){let _=h[f];i.bufferSubData(l,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var jf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qf=`#ifdef USE_ALPHAHASH
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
#endif`,tp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ep=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,np=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ip=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sp=`#ifdef USE_AOMAP
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
#endif`,rp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,op=`#ifdef USE_BATCHING
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
#endif`,ap=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,up=`#ifdef USE_IRIDESCENCE
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
#endif`,dp=`#ifdef USE_BUMPMAP
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
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_p=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Mp=`#define PI 3.141592653589793
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
} // validated`,bp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Sp=`vec3 transformedNormal = objectNormal;
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
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ap=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ip=`#ifdef USE_ENVMAP
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
#endif`,Pp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lp=`#ifdef USE_ENVMAP
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
#endif`,Dp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
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
#endif`,Np=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Op=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kp=`#ifdef USE_GRADIENTMAP
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
}`,zp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gp=`uniform bool receiveShadow;
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
#endif`,Wp=`#ifdef USE_ENVMAP
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
#endif`,Xp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$p=`PhysicalMaterial material;
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
#endif`,Kp=`struct PhysicalMaterial {
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
}`,Jp=`
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
#endif`,jp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,em=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,im=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,om=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,am=`#if defined( USE_POINTS_UV )
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
#endif`,cm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,um=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fm=`#ifdef USE_MORPHTARGETS
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
#endif`,pm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_m=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ym=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vm=`#ifdef USE_NORMALMAP
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
#endif`,Mm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Em=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Am=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Im=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Um=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Fm=`float getShadowMask() {
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
}`,Om=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bm=`#ifdef USE_SKINNING
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
#endif`,km=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zm=`#ifdef USE_SKINNING
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
#endif`,Hm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xm=`#ifdef USE_TRANSMISSION
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
#endif`,qm=`#ifdef USE_TRANSMISSION
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
#endif`,Ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Km=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Jm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jm=`uniform sampler2D t2D;
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
}`,Qm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ng=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ig=`#include <common>
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
}`,sg=`#if DEPTH_PACKING == 3200
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
}`,rg=`#define DISTANCE
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
}`,og=`#define DISTANCE
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
}`,ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lg=`uniform float scale;
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
}`,hg=`uniform vec3 diffuse;
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
}`,ug=`#include <common>
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
}`,dg=`uniform vec3 diffuse;
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
}`,fg=`#define LAMBERT
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
}`,pg=`#define LAMBERT
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
}`,mg=`#define MATCAP
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
}`,gg=`#define MATCAP
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
}`,_g=`#define NORMAL
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
}`,xg=`#define NORMAL
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
}`,yg=`#define PHONG
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
}`,vg=`#define PHONG
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
}`,Mg=`#define STANDARD
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
}`,bg=`#define STANDARD
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
}`,Sg=`#define TOON
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
}`,wg=`#define TOON
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
}`,Tg=`uniform float size;
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
}`,Eg=`uniform vec3 diffuse;
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
}`,Ag=`#include <common>
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
}`,Rg=`uniform vec3 color;
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
}`,Cg=`uniform float rotation;
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
}`,Ig=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:jf,alphahash_pars_fragment:Qf,alphamap_fragment:tp,alphamap_pars_fragment:ep,alphatest_fragment:np,alphatest_pars_fragment:ip,aomap_fragment:sp,aomap_pars_fragment:rp,batching_pars_vertex:op,batching_vertex:ap,begin_vertex:cp,beginnormal_vertex:lp,bsdfs:hp,iridescence_fragment:up,bumpmap_pars_fragment:dp,clipping_planes_fragment:fp,clipping_planes_pars_fragment:pp,clipping_planes_pars_vertex:mp,clipping_planes_vertex:gp,color_fragment:_p,color_pars_fragment:xp,color_pars_vertex:yp,color_vertex:vp,common:Mp,cube_uv_reflection_fragment:bp,defaultnormal_vertex:Sp,displacementmap_pars_vertex:wp,displacementmap_vertex:Tp,emissivemap_fragment:Ep,emissivemap_pars_fragment:Ap,colorspace_fragment:Rp,colorspace_pars_fragment:Cp,envmap_fragment:Ip,envmap_common_pars_fragment:Pp,envmap_pars_fragment:Lp,envmap_pars_vertex:Dp,envmap_physical_pars_fragment:Wp,envmap_vertex:Up,fog_vertex:Np,fog_pars_vertex:Fp,fog_fragment:Op,fog_pars_fragment:Bp,gradientmap_pars_fragment:kp,lightmap_pars_fragment:zp,lights_lambert_fragment:Hp,lights_lambert_pars_fragment:Vp,lights_pars_begin:Gp,lights_toon_fragment:Xp,lights_toon_pars_fragment:qp,lights_phong_fragment:Yp,lights_phong_pars_fragment:Zp,lights_physical_fragment:$p,lights_physical_pars_fragment:Kp,lights_fragment_begin:Jp,lights_fragment_maps:jp,lights_fragment_end:Qp,logdepthbuf_fragment:tm,logdepthbuf_pars_fragment:em,logdepthbuf_pars_vertex:nm,logdepthbuf_vertex:im,map_fragment:sm,map_pars_fragment:rm,map_particle_fragment:om,map_particle_pars_fragment:am,metalnessmap_fragment:cm,metalnessmap_pars_fragment:lm,morphinstance_vertex:hm,morphcolor_vertex:um,morphnormal_vertex:dm,morphtarget_pars_vertex:fm,morphtarget_vertex:pm,normal_fragment_begin:mm,normal_fragment_maps:gm,normal_pars_fragment:_m,normal_pars_vertex:xm,normal_vertex:ym,normalmap_pars_fragment:vm,clearcoat_normal_fragment_begin:Mm,clearcoat_normal_fragment_maps:bm,clearcoat_pars_fragment:Sm,iridescence_pars_fragment:wm,opaque_fragment:Tm,packing:Em,premultiplied_alpha_fragment:Am,project_vertex:Rm,dithering_fragment:Cm,dithering_pars_fragment:Im,roughnessmap_fragment:Pm,roughnessmap_pars_fragment:Lm,shadowmap_pars_fragment:Dm,shadowmap_pars_vertex:Um,shadowmap_vertex:Nm,shadowmask_pars_fragment:Fm,skinbase_vertex:Om,skinning_pars_vertex:Bm,skinning_vertex:km,skinnormal_vertex:zm,specularmap_fragment:Hm,specularmap_pars_fragment:Vm,tonemapping_fragment:Gm,tonemapping_pars_fragment:Wm,transmission_fragment:Xm,transmission_pars_fragment:qm,uv_pars_fragment:Ym,uv_pars_vertex:Zm,uv_vertex:$m,worldpos_vertex:Km,background_vert:Jm,background_frag:jm,backgroundCube_vert:Qm,backgroundCube_frag:tg,cube_vert:eg,cube_frag:ng,depth_vert:ig,depth_frag:sg,distanceRGBA_vert:rg,distanceRGBA_frag:og,equirect_vert:ag,equirect_frag:cg,linedashed_vert:lg,linedashed_frag:hg,meshbasic_vert:ug,meshbasic_frag:dg,meshlambert_vert:fg,meshlambert_frag:pg,meshmatcap_vert:mg,meshmatcap_frag:gg,meshnormal_vert:_g,meshnormal_frag:xg,meshphong_vert:yg,meshphong_frag:vg,meshphysical_vert:Mg,meshphysical_frag:bg,meshtoon_vert:Sg,meshtoon_frag:wg,points_vert:Tg,points_frag:Eg,shadow_vert:Ag,shadow_frag:Rg,sprite_vert:Cg,sprite_frag:Ig},xt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},Fn={basic:{uniforms:Ve([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Ve([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Ve([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Ve([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Ve([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Ve([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Ve([xt.points,xt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Ve([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Ve([xt.common,xt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Ve([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Ve([xt.sprite,xt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Ve([xt.common,xt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Ve([xt.lights,xt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Fn.physical={uniforms:Ve([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var Ca={r:0,b:0,g:0},Xi=new gn,Pg=new he;function Lg(i,t,e,n,s,r,o){let a=new qt(0),c=r===!0?0:1,l,d,h=null,u=0,f=null;function g(T){let x=T.isScene===!0?T.background:null;return x&&x.isTexture&&(x=(T.backgroundBlurriness>0?e:t).get(x)),x}function _(T){let x=!1,A=g(T);A===null?p(a,c):A&&A.isColor&&(p(A,1),x=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(T,x){let A=g(x);A&&(A.isCubeTexture||A.mapping===Er)?(d===void 0&&(d=new ae(new fi(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Wi(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:Ae,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(E,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Xi.copy(x.backgroundRotation),Xi.x*=-1,Xi.y*=-1,Xi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Xi.y*=-1,Xi.z*=-1),d.material.uniforms.envMap.value=A,d.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Pg.makeRotationFromEuler(Xi)),d.material.toneMapped=ee.getTransfer(A.colorSpace)!==le,(h!==A||u!==A.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,h=A,u=A.version,f=i.toneMapping),d.layers.enableAll(),T.unshift(d,d.geometry,d.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new ae(new yr(2,2),new bn({name:"BackgroundMaterial",uniforms:Wi(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=ee.getTransfer(A.colorSpace)!==le,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||u!==A.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=A,u=A.version,f=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function p(T,x){T.getRGB(Ca,al(i)),n.buffers.color.setClear(Ca.r,Ca.g,Ca.b,x,o)}function w(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,x=1){a.set(T),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,p(a,c)},render:_,addToRenderList:m,dispose:w}}function Dg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(v,I,L,N,k){let H=!1,V=h(N,L,I);r!==V&&(r=V,l(r.object)),H=f(v,N,L,k),H&&g(v,N,L,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,x(v,I,L,N),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(v){return i.bindVertexArray(v)}function d(v){return i.deleteVertexArray(v)}function h(v,I,L){let N=L.wireframe===!0,k=n[v.id];k===void 0&&(k={},n[v.id]=k);let H=k[I.id];H===void 0&&(H={},k[I.id]=H);let V=H[N];return V===void 0&&(V=u(c()),H[N]=V),V}function u(v){let I=[],L=[],N=[];for(let k=0;k<e;k++)I[k]=0,L[k]=0,N[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:L,attributeDivisors:N,object:v,attributes:{},index:null}}function f(v,I,L,N){let k=r.attributes,H=I.attributes,V=0,j=L.getAttributes();for(let G in j)if(j[G].location>=0){let mt=k[G],_t=H[G];if(_t===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(_t=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(_t=v.instanceColor)),mt===void 0||mt.attribute!==_t||_t&&mt.data!==_t.data)return!0;V++}return r.attributesNum!==V||r.index!==N}function g(v,I,L,N){let k={},H=I.attributes,V=0,j=L.getAttributes();for(let G in j)if(j[G].location>=0){let mt=H[G];mt===void 0&&(G==="instanceMatrix"&&v.instanceMatrix&&(mt=v.instanceMatrix),G==="instanceColor"&&v.instanceColor&&(mt=v.instanceColor));let _t={};_t.attribute=mt,mt&&mt.data&&(_t.data=mt.data),k[G]=_t,V++}r.attributes=k,r.attributesNum=V,r.index=N}function _(){let v=r.newAttributes;for(let I=0,L=v.length;I<L;I++)v[I]=0}function m(v){p(v,0)}function p(v,I){let L=r.newAttributes,N=r.enabledAttributes,k=r.attributeDivisors;L[v]=1,N[v]===0&&(i.enableVertexAttribArray(v),N[v]=1),k[v]!==I&&(i.vertexAttribDivisor(v,I),k[v]=I)}function w(){let v=r.newAttributes,I=r.enabledAttributes;for(let L=0,N=I.length;L<N;L++)I[L]!==v[L]&&(i.disableVertexAttribArray(L),I[L]=0)}function T(v,I,L,N,k,H,V){V===!0?i.vertexAttribIPointer(v,I,L,k,H):i.vertexAttribPointer(v,I,L,N,k,H)}function x(v,I,L,N){_();let k=N.attributes,H=L.getAttributes(),V=I.defaultAttributeValues;for(let j in H){let G=H[j];if(G.location>=0){let at=k[j];if(at===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(at=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(at=v.instanceColor)),at!==void 0){let mt=at.normalized,_t=at.itemSize,q=t.get(at);if(q===void 0)continue;let Dt=q.buffer,Et=q.type,zt=q.bytesPerElement,Y=Et===i.INT||Et===i.UNSIGNED_INT||at.gpuType===Yo;if(at.isInterleavedBufferAttribute){let tt=at.data,yt=tt.stride,Ct=at.offset;if(tt.isInstancedInterleavedBuffer){for(let Rt=0;Rt<G.locationSize;Rt++)p(G.location+Rt,tt.meshPerAttribute);v.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Rt=0;Rt<G.locationSize;Rt++)m(G.location+Rt);i.bindBuffer(i.ARRAY_BUFFER,Dt);for(let Rt=0;Rt<G.locationSize;Rt++)T(G.location+Rt,_t/G.locationSize,Et,mt,yt*zt,(Ct+_t/G.locationSize*Rt)*zt,Y)}else{if(at.isInstancedBufferAttribute){for(let tt=0;tt<G.locationSize;tt++)p(G.location+tt,at.meshPerAttribute);v.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let tt=0;tt<G.locationSize;tt++)m(G.location+tt);i.bindBuffer(i.ARRAY_BUFFER,Dt);for(let tt=0;tt<G.locationSize;tt++)T(G.location+tt,_t/G.locationSize,Et,mt,_t*zt,_t/G.locationSize*tt*zt,Y)}}else if(V!==void 0){let mt=V[j];if(mt!==void 0)switch(mt.length){case 2:i.vertexAttrib2fv(G.location,mt);break;case 3:i.vertexAttrib3fv(G.location,mt);break;case 4:i.vertexAttrib4fv(G.location,mt);break;default:i.vertexAttrib1fv(G.location,mt)}}}}w()}function A(){P();for(let v in n){let I=n[v];for(let L in I){let N=I[L];for(let k in N)d(N[k].object),delete N[k];delete I[L]}delete n[v]}}function E(v){if(n[v.id]===void 0)return;let I=n[v.id];for(let L in I){let N=I[L];for(let k in N)d(N[k].object),delete N[k];delete I[L]}delete n[v.id]}function R(v){for(let I in n){let L=n[I];if(L[v.id]===void 0)continue;let N=L[v.id];for(let k in N)d(N[k].object),delete N[k];delete L[v.id]}}function P(){M(),o=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:M,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function Ug(i,t,e){let n;function s(l){n=l}function r(l,d){i.drawArrays(n,l,d),e.update(d,n,1)}function o(l,d,h){h!==0&&(i.drawArraysInstanced(n,l,d,h),e.update(d,n,h))}function a(l,d,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,d,0,h);let f=0;for(let g=0;g<h;g++)f+=d[g];e.update(f,n,1)}function c(l,d,h,u){if(h===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],d[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,d,0,u,0,h);let g=0;for(let _=0;_<h;_++)g+=d[_]*u[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Ng(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==je&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let P=R===Ls&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==wn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Tn&&!P)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);let h=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:x,vertexTextures:A,maxSamples:E}}function Fg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new pn,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let f=h.length!==0||u||n!==0||s;return s=u,n=h.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){e=d(h,u,0)},this.setState=function(h,u,f){let g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?d(null):l();else{let w=r?0:n,T=w*4,x=p.clippingState||null;c.value=x,x=d(g,u,T,f);for(let A=0;A!==T;++A)x[A]=e[A];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(h,u,f,g){let _=h!==null?h.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=f+_*4,w=u.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,x=f;T!==_;++T,x+=4)o.copy(h[T]).applyMatrix4(w,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Og(i){let t=new WeakMap;function e(o,a){return a===Wo?o.mapping=zi:a===Xo&&(o.mapping=Hi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Wo||a===Xo)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new yo(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Os=4,Vu=[.125,.215,.35,.446,.526,.582],Zi=20,ul=new Bi,Gu=new qt,dl=null,fl=0,pl=0,ml=!1,Yi=(1+Math.sqrt(5))/2,Fs=1/Yi,Wu=[new F(-Yi,Fs,0),new F(Yi,Fs,0),new F(-Fs,0,Yi),new F(Fs,0,Yi),new F(0,Yi,-Fs),new F(0,Yi,Fs),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],Bg=new F,ks=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Bg}=r;dl=this._renderer.getRenderTarget(),fl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(dl,fl,pl),this._renderer.xr.enabled=ml,t.scissorTest=!1,Ia(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===zi||t.mapping===Hi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),dl=this._renderer.getRenderTarget(),fl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:Ls,format:je,colorSpace:Li,depthBuffer:!1},s=Xu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xu(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kg(r)),this._blurMaterial=zg(r,t,e)}return s}_compileMaterial(t){let e=new ae(this._lodPlanes[0],t);this._renderer.compile(e,ul)}_sceneToCubeUV(t,e,n,s,r){let c=new Oe(90,1,e,n),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Gu),h.toneMapping=Sn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));let _=new lr({name:"PMREM.Background",side:Ae,depthWrite:!1,depthTest:!1}),m=new ae(new fi,_),p=!1,w=t.background;w?w.isColor&&(_.color.copy(w),t.background=null,p=!0):(_.color.copy(Gu),p=!0);for(let T=0;T<6;T++){let x=T%3;x===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[T],r.y,r.z)):x===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[T]));let A=this._cubeSize;Ia(s,x*A,T>2?A:0,A,A),h.setRenderTarget(s),p&&h.render(m,c),h.render(t,c)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=w}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===zi||t.mapping===Hi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qu());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new ae(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Ia(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,ul)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Wu[(s-r-1)%Wu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let d=3,h=new ae(this._lodPlanes[s],l),u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Zi-1),_=r/g,m=isFinite(r)?1+Math.floor(d*_):Zi;m>Zi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zi}`);let p=[],w=0;for(let R=0;R<Zi;++R){let P=R/_,M=Math.exp(-P*P/2);p.push(M),R===0?w+=M:R<m&&(w+=2*M)}for(let R=0;R<p.length;R++)p[R]=p[R]/w;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:T}=this;u.dTheta.value=g,u.mipInt.value=T-n;let x=this._sizeLods[s],A=3*x*(s>T-Os?s-T+Os:0),E=4*(this._cubeSize-x);Ia(e,A,E,3*x,2*x),c.setRenderTarget(e),c.render(h,ul)}};function kg(i){let t=[],e=[],n=[],s=i,r=i-Os+1+Vu.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Os?c=Vu[o-i+Os-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),d=-l,h=1+l,u=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,g=6,_=3,m=2,p=1,w=new Float32Array(_*g*f),T=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let E=0;E<f;E++){let R=E%3*2/3-1,P=E>2?0:-1,M=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];w.set(M,_*g*E),T.set(u,m*g*E);let v=[E,E,E,E,E,E];x.set(v,p*g*E)}let A=new Ke;A.setAttribute("position",new xe(w,_)),A.setAttribute("uv",new xe(T,m)),A.setAttribute("faceIndex",new xe(x,p)),t.push(A),s>Os&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Xu(i,t,e){let n=new mn(i,t,e);return n.texture.mapping=Er,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ia(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function zg(i,t,e){let n=new Float32Array(Zi),s=new F(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Zi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:El(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function qu(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:El(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Yu(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:El(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function El(){return`

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
	`}function Hg(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Wo||c===Xo,d=c===zi||c===Hi;if(l||d){let h=t.get(a),u=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new ks(i)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return l&&f&&f.height>0||d&&f&&s(f)?(e===null&&(e=new ks(i)),h=l?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let c=0,l=6;for(let d=0;d<l;d++)a[d]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Vg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&bs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Gg(i,t,e,n){let s={},r=new WeakMap;function o(h){let u=h.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(h,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(h){let u=h.attributes;for(let f in u)t.update(u[f],i.ARRAY_BUFFER)}function l(h){let u=[],f=h.index,g=h.attributes.position,_=0;if(f!==null){let w=f.array;_=f.version;for(let T=0,x=w.length;T<x;T+=3){let A=w[T+0],E=w[T+1],R=w[T+2];u.push(A,E,E,R,R,A)}}else if(g!==void 0){let w=g.array;_=g.version;for(let T=0,x=w.length/3-1;T<x;T+=3){let A=T+0,E=T+1,R=T+2;u.push(A,E,E,R,R,A)}}else return;let m=new(ol(u)?ur:hr)(u,1);m.version=_;let p=r.get(h);p&&t.remove(p),r.set(h,m)}function d(h){let u=r.get(h);if(u){let f=h.index;f!==null&&u.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:d}}function Wg(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function l(u,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,u*o,g),e.update(f,n,g))}function d(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function h(u,f,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,g);let p=0;for(let w=0;w<g;w++)p+=f[w]*_[w];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function Xg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function qg(i,t,e){let n=new WeakMap,s=new ce;function r(o,a,c){let l=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=d!==void 0?d.length:0,u=n.get(a);if(u===void 0||u.count!==h){let M=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],T=0;f===!0&&(T=1),g===!0&&(T=2),_===!0&&(T=3);let x=a.attributes.position.count*T,A=1;x>t.maxTextureSize&&(A=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let E=new Float32Array(x*A*4*h),R=new cr(E,x,A,h);R.type=Tn,R.needsUpdate=!0;let P=T*4;for(let v=0;v<h;v++){let I=m[v],L=p[v],N=w[v],k=x*A*4*v;for(let H=0;H<I.count;H++){let V=H*P;f===!0&&(s.fromBufferAttribute(I,H),E[k+V+0]=s.x,E[k+V+1]=s.y,E[k+V+2]=s.z,E[k+V+3]=0),g===!0&&(s.fromBufferAttribute(L,H),E[k+V+4]=s.x,E[k+V+5]=s.y,E[k+V+6]=s.z,E[k+V+7]=0),_===!0&&(s.fromBufferAttribute(N,H),E[k+V+8]=s.x,E[k+V+9]=s.y,E[k+V+10]=s.z,E[k+V+11]=N.itemSize===4?s.w:1)}}u={count:h,texture:R,size:new Vt(x,A)},n.set(a,u),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Yg(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,d=c.geometry,h=t.get(c,d);if(s.get(h)!==l&&(t.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return h}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var dd=new He,Zu=new gr(1,1),fd=new cr,pd=new _o,md=new fr,$u=[],Ku=[],Ju=new Float32Array(16),ju=new Float32Array(9),Qu=new Float32Array(4);function zs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=$u[s];if(r===void 0&&(r=new Float32Array(s),$u[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Re(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Da(i,t){let e=Ku[t];e===void 0&&(e=new Int32Array(t),Ku[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Zg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function $g(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function Kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function Jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function jg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Qu.set(n),i.uniformMatrix2fv(this.addr,!1,Qu),Ce(e,n)}}function Qg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;ju.set(n),i.uniformMatrix3fv(this.addr,!1,ju),Ce(e,n)}}function t0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Ju.set(n),i.uniformMatrix4fv(this.addr,!1,Ju),Ce(e,n)}}function e0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function n0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function i0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function s0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function r0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function o0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function a0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function c0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function l0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Zu.compareFunction=nl,r=Zu):r=dd,e.setTexture2D(t||r,s)}function h0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||pd,s)}function u0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||md,s)}function d0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||fd,s)}function f0(i){switch(i){case 5126:return Zg;case 35664:return $g;case 35665:return Kg;case 35666:return Jg;case 35674:return jg;case 35675:return Qg;case 35676:return t0;case 5124:case 35670:return e0;case 35667:case 35671:return n0;case 35668:case 35672:return i0;case 35669:case 35673:return s0;case 5125:return r0;case 36294:return o0;case 36295:return a0;case 36296:return c0;case 35678:case 36198:case 36298:case 36306:case 35682:return l0;case 35679:case 36299:case 36307:return h0;case 35680:case 36300:case 36308:case 36293:return u0;case 36289:case 36303:case 36311:case 36292:return d0}}function p0(i,t){i.uniform1fv(this.addr,t)}function m0(i,t){let e=zs(t,this.size,2);i.uniform2fv(this.addr,e)}function g0(i,t){let e=zs(t,this.size,3);i.uniform3fv(this.addr,e)}function _0(i,t){let e=zs(t,this.size,4);i.uniform4fv(this.addr,e)}function x0(i,t){let e=zs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function y0(i,t){let e=zs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function v0(i,t){let e=zs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function M0(i,t){i.uniform1iv(this.addr,t)}function b0(i,t){i.uniform2iv(this.addr,t)}function S0(i,t){i.uniform3iv(this.addr,t)}function w0(i,t){i.uniform4iv(this.addr,t)}function T0(i,t){i.uniform1uiv(this.addr,t)}function E0(i,t){i.uniform2uiv(this.addr,t)}function A0(i,t){i.uniform3uiv(this.addr,t)}function R0(i,t){i.uniform4uiv(this.addr,t)}function C0(i,t,e){let n=this.cache,s=t.length,r=Da(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||dd,r[o])}function I0(i,t,e){let n=this.cache,s=t.length,r=Da(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||pd,r[o])}function P0(i,t,e){let n=this.cache,s=t.length,r=Da(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||md,r[o])}function L0(i,t,e){let n=this.cache,s=t.length,r=Da(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||fd,r[o])}function D0(i){switch(i){case 5126:return p0;case 35664:return m0;case 35665:return g0;case 35666:return _0;case 35674:return x0;case 35675:return y0;case 35676:return v0;case 5124:case 35670:return M0;case 35667:case 35671:return b0;case 35668:case 35672:return S0;case 35669:case 35673:return w0;case 5125:return T0;case 36294:return E0;case 36295:return A0;case 36296:return R0;case 35678:case 36198:case 36298:case 36306:case 35682:return C0;case 35679:case 36299:case 36307:return I0;case 35680:case 36300:case 36308:case 36293:return P0;case 36289:case 36303:case 36311:case 36292:return L0}}var _l=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=f0(e.type)}},xl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=D0(e.type)}},yl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},gl=/(\w+)(\])?(\[|\.)?/g;function td(i,t){i.seq.push(t),i.map[t.id]=t}function U0(i,t,e){let n=i.name,s=n.length;for(gl.lastIndex=0;;){let r=gl.exec(n),o=gl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){td(e,l===void 0?new _l(a,i,t):new xl(a,i,t));break}else{let h=e.map[a];h===void 0&&(h=new yl(a),td(e,h)),e=h}}}var Bs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);U0(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function ed(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var N0=37297,F0=0;function O0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var nd=new $t;function B0(i){ee._getMatrix(nd,ee.workingColorSpace,i);let t=`mat3( ${nd.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case rr:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function id(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+O0(i.getShaderSource(t),a)}else return r}function k0(i,t){let e=B0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function z0(i,t){let e;switch(t){case Mu:e="Linear";break;case bu:e="Reinhard";break;case Su:e="Cineon";break;case Go:e="ACESFilmic";break;case Tu:e="AgX";break;case Eu:e="Neutral";break;case wu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Pa=new F;function H0(){ee.getLuminanceCoefficients(Pa);let i=Pa.x.toFixed(4),t=Pa.y.toFixed(4),e=Pa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function V0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Pr).join(`
`)}function G0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function W0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Pr(i){return i!==""}function sd(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function rd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var X0=/^[ \t]*#include +<([\w\d./]+)>/gm;function vl(i){return i.replace(X0,Y0)}var q0=new Map;function Y0(i,t){let e=Jt[t];if(e===void 0){let n=q0.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return vl(e)}var Z0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function od(i){return i.replace(Z0,$0)}function $0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ad(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function K0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Wc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Uo?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function J0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case zi:case Hi:t="ENVMAP_TYPE_CUBE";break;case Er:t="ENVMAP_TYPE_CUBE_UV";break}return t}function j0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Hi:t="ENVMAP_MODE_REFRACTION";break}return t}function Q0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Vo:t="ENVMAP_BLENDING_MULTIPLY";break;case yu:t="ENVMAP_BLENDING_MIX";break;case vu:t="ENVMAP_BLENDING_ADD";break}return t}function t_(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function e_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=K0(e),l=J0(e),d=j0(e),h=Q0(e),u=t_(e),f=V0(e),g=G0(r),_=s.createProgram(),m,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Pr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Pr).join(`
`),p.length>0&&(p+=`
`)):(m=[ad(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pr).join(`
`),p=[ad(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Sn?"#define TONE_MAPPING":"",e.toneMapping!==Sn?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Sn?z0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,k0("linearToOutputTexel",e.outputColorSpace),H0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Pr).join(`
`)),o=vl(o),o=sd(o,e),o=rd(o,e),a=vl(a),a=sd(a,e),a=rd(a,e),o=od(o),a=od(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let T=w+m+o,x=w+p+a,A=ed(s,s.VERTEX_SHADER,T),E=ed(s,s.FRAGMENT_SHADER,x);s.attachShader(_,A),s.attachShader(_,E),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(I){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(_)||"",N=s.getShaderInfoLog(A)||"",k=s.getShaderInfoLog(E)||"",H=L.trim(),V=N.trim(),j=k.trim(),G=!0,at=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,E);else{let mt=id(s,A,"vertex"),_t=id(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+mt+`
`+_t)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(V===""||j==="")&&(at=!1);at&&(I.diagnostics={runnable:G,programLog:H,vertexShader:{log:V,prefix:m},fragmentShader:{log:j,prefix:p}})}s.deleteShader(A),s.deleteShader(E),P=new Bs(s,_),M=W0(s,_)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,N0)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=F0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=E,this}var n_=0,Ml=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new bl(t),e.set(t,n)),n}},bl=class{constructor(t){this.id=n_++,this.code=t,this.usedTimes=0}};function i_(i,t,e,n,s,r,o){let a=new ws,c=new Ml,l=new Set,d=[],h=s.logarithmicDepthBuffer,u=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,v,I,L,N){let k=L.fog,H=N.geometry,V=M.isMeshStandardMaterial?L.environment:null,j=(M.isMeshStandardMaterial?e:t).get(M.envMap||V),G=j&&j.mapping===Er?j.image.height:null,at=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let mt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,_t=mt!==void 0?mt.length:0,q=0;H.morphAttributes.position!==void 0&&(q=1),H.morphAttributes.normal!==void 0&&(q=2),H.morphAttributes.color!==void 0&&(q=3);let Dt,Et,zt,Y;if(at){let re=Fn[at];Dt=re.vertexShader,Et=re.fragmentShader}else Dt=M.vertexShader,Et=M.fragmentShader,c.update(M),zt=c.getVertexShaderID(M),Y=c.getFragmentShaderID(M);let tt=i.getRenderTarget(),yt=i.state.buffers.depth.getReversed(),Ct=N.isInstancedMesh===!0,Rt=N.isBatchedMesh===!0,D=!!M.map,Z=!!M.matcap,S=!!j,lt=!!M.aoMap,ot=!!M.lightMap,wt=!!M.bumpMap,Q=!!M.normalMap,Pt=!!M.displacementMap,nt=!!M.emissiveMap,ft=!!M.metalnessMap,Ot=!!M.roughnessMap,Yt=M.anisotropy>0,C=M.clearcoat>0,y=M.dispersion>0,z=M.iridescence>0,J=M.sheen>0,it=M.transmission>0,$=Yt&&!!M.anisotropyMap,Bt=C&&!!M.clearcoatMap,pt=C&&!!M.clearcoatNormalMap,Ut=C&&!!M.clearcoatRoughnessMap,Nt=z&&!!M.iridescenceMap,ut=z&&!!M.iridescenceThicknessMap,bt=J&&!!M.sheenColorMap,Wt=J&&!!M.sheenRoughnessMap,Ft=!!M.specularMap,vt=!!M.specularColorMap,Kt=!!M.specularIntensityMap,U=it&&!!M.transmissionMap,dt=it&&!!M.thicknessMap,gt=!!M.gradientMap,At=!!M.alphaMap,ct=M.alphaTest>0,et=!!M.alphaHash,Lt=!!M.extensions,Zt=Sn;M.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Zt=i.toneMapping);let me={shaderID:at,shaderType:M.type,shaderName:M.name,vertexShader:Dt,fragmentShader:Et,defines:M.defines,customVertexShaderID:zt,customFragmentShaderID:Y,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Rt,batchingColor:Rt&&N._colorsTexture!==null,instancing:Ct,instancingColor:Ct&&N.instanceColor!==null,instancingMorph:Ct&&N.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:tt===null?i.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Li,alphaToCoverage:!!M.alphaToCoverage,map:D,matcap:Z,envMap:S,envMapMode:S&&j.mapping,envMapCubeUVHeight:G,aoMap:lt,lightMap:ot,bumpMap:wt,normalMap:Q,displacementMap:u&&Pt,emissiveMap:nt,normalMapObjectSpace:Q&&M.normalMapType===Cu,normalMapTangentSpace:Q&&M.normalMapType===Ra,metalnessMap:ft,roughnessMap:Ot,anisotropy:Yt,anisotropyMap:$,clearcoat:C,clearcoatMap:Bt,clearcoatNormalMap:pt,clearcoatRoughnessMap:Ut,dispersion:y,iridescence:z,iridescenceMap:Nt,iridescenceThicknessMap:ut,sheen:J,sheenColorMap:bt,sheenRoughnessMap:Wt,specularMap:Ft,specularColorMap:vt,specularIntensityMap:Kt,transmission:it,transmissionMap:U,thicknessMap:dt,gradientMap:gt,opaque:M.transparent===!1&&M.blending===Ci&&M.alphaToCoverage===!1,alphaMap:At,alphaTest:ct,alphaHash:et,combine:M.combine,mapUv:D&&_(M.map.channel),aoMapUv:lt&&_(M.aoMap.channel),lightMapUv:ot&&_(M.lightMap.channel),bumpMapUv:wt&&_(M.bumpMap.channel),normalMapUv:Q&&_(M.normalMap.channel),displacementMapUv:Pt&&_(M.displacementMap.channel),emissiveMapUv:nt&&_(M.emissiveMap.channel),metalnessMapUv:ft&&_(M.metalnessMap.channel),roughnessMapUv:Ot&&_(M.roughnessMap.channel),anisotropyMapUv:$&&_(M.anisotropyMap.channel),clearcoatMapUv:Bt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:pt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ut&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Nt&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Wt&&_(M.sheenRoughnessMap.channel),specularMapUv:Ft&&_(M.specularMap.channel),specularColorMapUv:vt&&_(M.specularColorMap.channel),specularIntensityMapUv:Kt&&_(M.specularIntensityMap.channel),transmissionMapUv:U&&_(M.transmissionMap.channel),thicknessMapUv:dt&&_(M.thicknessMap.channel),alphaMapUv:At&&_(M.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Q||Yt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!H.attributes.uv&&(D||At),fog:!!k,useFog:M.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:yt,skinning:N.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:q,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Zt,decodeVideoTexture:D&&M.map.isVideoTexture===!0&&ee.getTransfer(M.map.colorSpace)===le,decodeVideoTextureEmissive:nt&&M.emissiveMap.isVideoTexture===!0&&ee.getTransfer(M.emissiveMap.colorSpace)===le,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Je,flipSided:M.side===Ae,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Lt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&M.extensions.multiDraw===!0||Rt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return me.vertexUv1s=l.has(1),me.vertexUv2s=l.has(2),me.vertexUv3s=l.has(3),l.clear(),me}function p(M){let v=[];if(M.shaderID?v.push(M.shaderID):(v.push(M.customVertexShaderID),v.push(M.customFragmentShaderID)),M.defines!==void 0)for(let I in M.defines)v.push(I),v.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(w(v,M),T(v,M),v.push(i.outputColorSpace)),v.push(M.customProgramCacheKey),v.join()}function w(M,v){M.push(v.precision),M.push(v.outputColorSpace),M.push(v.envMapMode),M.push(v.envMapCubeUVHeight),M.push(v.mapUv),M.push(v.alphaMapUv),M.push(v.lightMapUv),M.push(v.aoMapUv),M.push(v.bumpMapUv),M.push(v.normalMapUv),M.push(v.displacementMapUv),M.push(v.emissiveMapUv),M.push(v.metalnessMapUv),M.push(v.roughnessMapUv),M.push(v.anisotropyMapUv),M.push(v.clearcoatMapUv),M.push(v.clearcoatNormalMapUv),M.push(v.clearcoatRoughnessMapUv),M.push(v.iridescenceMapUv),M.push(v.iridescenceThicknessMapUv),M.push(v.sheenColorMapUv),M.push(v.sheenRoughnessMapUv),M.push(v.specularMapUv),M.push(v.specularColorMapUv),M.push(v.specularIntensityMapUv),M.push(v.transmissionMapUv),M.push(v.thicknessMapUv),M.push(v.combine),M.push(v.fogExp2),M.push(v.sizeAttenuation),M.push(v.morphTargetsCount),M.push(v.morphAttributeCount),M.push(v.numDirLights),M.push(v.numPointLights),M.push(v.numSpotLights),M.push(v.numSpotLightMaps),M.push(v.numHemiLights),M.push(v.numRectAreaLights),M.push(v.numDirLightShadows),M.push(v.numPointLightShadows),M.push(v.numSpotLightShadows),M.push(v.numSpotLightShadowsWithMaps),M.push(v.numLightProbes),M.push(v.shadowMapType),M.push(v.toneMapping),M.push(v.numClippingPlanes),M.push(v.numClipIntersection),M.push(v.depthPacking)}function T(M,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),v.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),M.push(a.mask)}function x(M){let v=g[M.type],I;if(v){let L=Fn[v];I=zu.clone(L.uniforms)}else I=M.uniforms;return I}function A(M,v){let I;for(let L=0,N=d.length;L<N;L++){let k=d[L];if(k.cacheKey===v){I=k,++I.usedTimes;break}}return I===void 0&&(I=new e_(i,v,M,r),d.push(I)),I}function E(M){if(--M.usedTimes===0){let v=d.indexOf(M);d[v]=d[d.length-1],d.pop(),M.destroy()}}function R(M){c.remove(M)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:A,releaseProgram:E,releaseShaderCache:R,programs:d,dispose:P}}function s_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function r_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function cd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ld(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(h,u,f,g,_,m){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:u,material:f,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[t]=p):(p.id=h.id,p.object=h,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),t++,p}function a(h,u,f,g,_,m){let p=o(h,u,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(h,u,f,g,_,m){let p=o(h,u,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(h,u){e.length>1&&e.sort(h||r_),n.length>1&&n.sort(u||cd),s.length>1&&s.sort(u||cd)}function d(){for(let h=t,u=i.length;h<u;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:d,sort:l}}function o_(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new ld,i.set(n,[o])):s>=r.length?(o=new ld,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function a_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new qt};break;case"SpotLight":e={position:new F,direction:new F,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function c_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var l_=0;function h_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function u_(i){let t=new a_,e=c_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);let s=new F,r=new he,o=new he;function a(l){let d=0,h=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,w=0,T=0,x=0,A=0,E=0,R=0;l.sort(h_);for(let M=0,v=l.length;M<v;M++){let I=l[M],L=I.color,N=I.intensity,k=I.distance,H=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=L.r*N,h+=L.g*N,u+=L.b*N;else if(I.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(I.sh.coefficients[V],N);R++}else if(I.isDirectionalLight){let V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let j=I.shadow,G=e.get(I);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=I.shadow.matrix,w++}n.directional[f]=V,f++}else if(I.isSpotLight){let V=t.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(L).multiplyScalar(N),V.distance=k,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,n.spot[_]=V;let j=I.shadow;if(I.map&&(n.spotLightMap[A]=I.map,A++,j.updateMatrices(I),I.castShadow&&E++),n.spotLightMatrix[_]=j.matrix,I.castShadow){let G=e.get(I);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=H,x++}_++}else if(I.isRectAreaLight){let V=t.get(I);V.color.copy(L).multiplyScalar(N),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=V,m++}else if(I.isPointLight){let V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){let j=I.shadow,G=e.get(I);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,G.shadowCameraNear=j.camera.near,G.shadowCameraFar=j.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=H,n.pointShadowMatrix[g]=I.shadow.matrix,T++}n.point[g]=V,g++}else if(I.isHemisphereLight){let V=t.get(I);V.skyColor.copy(I.color).multiplyScalar(N),V.groundColor.copy(I.groundColor).multiplyScalar(N),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;let P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==w||P.numPointShadows!==T||P.numSpotShadows!==x||P.numSpotMaps!==A||P.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=x+A-E,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,P.directionalLength=f,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=w,P.numPointShadows=T,P.numSpotShadows=x,P.numSpotMaps=A,P.numLightProbes=R,n.version=l_++)}function c(l,d){let h=0,u=0,f=0,g=0,_=0,m=d.matrixWorldInverse;for(let p=0,w=l.length;p<w;p++){let T=l[p];if(T.isDirectionalLight){let x=n.directional[h];x.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),h++}else if(T.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(T.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(T.width*.5,0,0),x.halfHeight.set(0,T.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){let x=n.point[u];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),u++}else if(T.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(T.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function hd(i){let t=new u_(i),e=[],n=[];function s(d){l.camera=d,e.length=0,n.length=0}function r(d){e.push(d)}function o(d){n.push(d)}function a(){t.setup(e)}function c(d){t.setupView(e,d)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function d_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new hd(i),t.set(s,[a])):r>=o.length?(a=new hd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var f_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,p_=`uniform sampler2D shadow_pass;
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
}`;function m_(i,t,e){let n=new Es,s=new Vt,r=new Vt,o=new ce,a=new Mo({depthPacking:Ru}),c=new bo,l={},d=e.maxTextureSize,h={[on]:Ae,[Ae]:on,[Je]:Je},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:f_,fragmentShader:p_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ke;g.setAttribute("position",new xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ae(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wc;let p=this.type;this.render=function(E,R,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let M=i.getRenderTarget(),v=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Jn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let N=p!==Un&&this.type===Un,k=p===Un&&this.type!==Un;for(let H=0,V=E.length;H<V;H++){let j=E[H],G=j.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let at=G.getFrameExtents();if(s.multiply(at),r.copy(G.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/at.x),s.x=r.x*at.x,G.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/at.y),s.y=r.y*at.y,G.mapSize.y=r.y)),G.map===null||N===!0||k===!0){let _t=this.type!==Un?{minFilter:ze,magFilter:ze}:{};G.map!==null&&G.map.dispose(),G.map=new mn(s.x,s.y,_t),G.map.texture.name=j.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();let mt=G.getViewportCount();for(let _t=0;_t<mt;_t++){let q=G.getViewport(_t);o.set(r.x*q.x,r.y*q.y,r.x*q.z,r.y*q.w),L.viewport(o),G.updateMatrices(j,_t),n=G.getFrustum(),x(R,P,G.camera,j,this.type)}G.isPointLightShadow!==!0&&this.type===Un&&w(G,P),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,v,I)};function w(E,R){let P=t.update(_);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new mn(s.x,s.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(R,null,P,u,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(R,null,P,f,_,null)}function T(E,R,P,M){let v=null,I=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)v=I;else if(v=P.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let L=v.uuid,N=R.uuid,k=l[L];k===void 0&&(k={},l[L]=k);let H=k[N];H===void 0&&(H=v.clone(),k[N]=H,R.addEventListener("dispose",A)),v=H}if(v.visible=R.visible,v.wireframe=R.wireframe,M===Un?v.side=R.shadowSide!==null?R.shadowSide:R.side:v.side=R.shadowSide!==null?R.shadowSide:h[R.side],v.alphaMap=R.alphaMap,v.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,v.map=R.map,v.clipShadows=R.clipShadows,v.clippingPlanes=R.clippingPlanes,v.clipIntersection=R.clipIntersection,v.displacementMap=R.displacementMap,v.displacementScale=R.displacementScale,v.displacementBias=R.displacementBias,v.wireframeLinewidth=R.wireframeLinewidth,v.linewidth=R.linewidth,P.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let L=i.properties.get(v);L.light=P}return v}function x(E,R,P,M,v){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&v===Un)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);let N=t.update(E),k=E.material;if(Array.isArray(k)){let H=N.groups;for(let V=0,j=H.length;V<j;V++){let G=H[V],at=k[G.materialIndex];if(at&&at.visible){let mt=T(E,at,M,v);E.onBeforeShadow(i,E,R,P,N,mt,G),i.renderBufferDirect(P,null,N,mt,E,G),E.onAfterShadow(i,E,R,P,N,mt,G)}}}else if(k.visible){let H=T(E,k,M,v);E.onBeforeShadow(i,E,R,P,N,H,null),i.renderBufferDirect(P,null,N,H,E,null),E.onAfterShadow(i,E,R,P,N,H,null)}}let L=E.children;for(let N=0,k=L.length;N<k;N++)x(L[N],R,P,M,v)}function A(E){E.target.removeEventListener("dispose",A);for(let P in l){let M=l[P],v=E.target.uuid;v in M&&(M[v].dispose(),delete M[v])}}}var g_={[No]:Fo,[Oo]:zo,[Bo]:Ho,[Ii]:ko,[Fo]:No,[zo]:Oo,[Ho]:Bo,[ko]:Ii};function __(i,t){function e(){let U=!1,dt=new ce,gt=null,At=new ce(0,0,0,0);return{setMask:function(ct){gt!==ct&&!U&&(i.colorMask(ct,ct,ct,ct),gt=ct)},setLocked:function(ct){U=ct},setClear:function(ct,et,Lt,Zt,me){me===!0&&(ct*=Zt,et*=Zt,Lt*=Zt),dt.set(ct,et,Lt,Zt),At.equals(dt)===!1&&(i.clearColor(ct,et,Lt,Zt),At.copy(dt))},reset:function(){U=!1,gt=null,At.set(-1,0,0,0)}}}function n(){let U=!1,dt=!1,gt=null,At=null,ct=null;return{setReversed:function(et){if(dt!==et){let Lt=t.get("EXT_clip_control");et?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),dt=et;let Zt=ct;ct=null,this.setClear(Zt)}},getReversed:function(){return dt},setTest:function(et){et?tt(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(et){gt!==et&&!U&&(i.depthMask(et),gt=et)},setFunc:function(et){if(dt&&(et=g_[et]),At!==et){switch(et){case No:i.depthFunc(i.NEVER);break;case Fo:i.depthFunc(i.ALWAYS);break;case Oo:i.depthFunc(i.LESS);break;case Ii:i.depthFunc(i.LEQUAL);break;case Bo:i.depthFunc(i.EQUAL);break;case ko:i.depthFunc(i.GEQUAL);break;case zo:i.depthFunc(i.GREATER);break;case Ho:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}At=et}},setLocked:function(et){U=et},setClear:function(et){ct!==et&&(dt&&(et=1-et),i.clearDepth(et),ct=et)},reset:function(){U=!1,gt=null,At=null,ct=null,dt=!1}}}function s(){let U=!1,dt=null,gt=null,At=null,ct=null,et=null,Lt=null,Zt=null,me=null;return{setTest:function(re){U||(re?tt(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(re){dt!==re&&!U&&(i.stencilMask(re),dt=re)},setFunc:function(re,kn,Rn){(gt!==re||At!==kn||ct!==Rn)&&(i.stencilFunc(re,kn,Rn),gt=re,At=kn,ct=Rn)},setOp:function(re,kn,Rn){(et!==re||Lt!==kn||Zt!==Rn)&&(i.stencilOp(re,kn,Rn),et=re,Lt=kn,Zt=Rn)},setLocked:function(re){U=re},setClear:function(re){me!==re&&(i.clearStencil(re),me=re)},reset:function(){U=!1,dt=null,gt=null,At=null,ct=null,et=null,Lt=null,Zt=null,me=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,d={},h={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,w=null,T=null,x=null,A=null,E=null,R=new qt(0,0,0),P=0,M=!1,v=null,I=null,L=null,N=null,k=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,j=0,G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=j>=1):G.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=j>=2);let at=null,mt={},_t=i.getParameter(i.SCISSOR_BOX),q=i.getParameter(i.VIEWPORT),Dt=new ce().fromArray(_t),Et=new ce().fromArray(q);function zt(U,dt,gt,At){let ct=new Uint8Array(4),et=i.createTexture();i.bindTexture(U,et),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Lt=0;Lt<gt;Lt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,At,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(dt+Lt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return et}let Y={};Y[i.TEXTURE_2D]=zt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=zt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=zt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=zt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),tt(i.DEPTH_TEST),o.setFunc(Ii),wt(!1),Q(Gc),tt(i.CULL_FACE),lt(Jn);function tt(U){d[U]!==!0&&(i.enable(U),d[U]=!0)}function yt(U){d[U]!==!1&&(i.disable(U),d[U]=!1)}function Ct(U,dt){return h[U]!==dt?(i.bindFramebuffer(U,dt),h[U]=dt,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=dt),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function Rt(U,dt){let gt=f,At=!1;if(U){gt=u.get(dt),gt===void 0&&(gt=[],u.set(dt,gt));let ct=U.textures;if(gt.length!==ct.length||gt[0]!==i.COLOR_ATTACHMENT0){for(let et=0,Lt=ct.length;et<Lt;et++)gt[et]=i.COLOR_ATTACHMENT0+et;gt.length=ct.length,At=!0}}else gt[0]!==i.BACK&&(gt[0]=i.BACK,At=!0);At&&i.drawBuffers(gt)}function D(U){return g!==U?(i.useProgram(U),g=U,!0):!1}let Z={[hi]:i.FUNC_ADD,[nu]:i.FUNC_SUBTRACT,[iu]:i.FUNC_REVERSE_SUBTRACT};Z[su]=i.MIN,Z[ru]=i.MAX;let S={[ou]:i.ZERO,[au]:i.ONE,[cu]:i.SRC_COLOR,[po]:i.SRC_ALPHA,[pu]:i.SRC_ALPHA_SATURATE,[du]:i.DST_COLOR,[hu]:i.DST_ALPHA,[lu]:i.ONE_MINUS_SRC_COLOR,[mo]:i.ONE_MINUS_SRC_ALPHA,[fu]:i.ONE_MINUS_DST_COLOR,[uu]:i.ONE_MINUS_DST_ALPHA,[mu]:i.CONSTANT_COLOR,[gu]:i.ONE_MINUS_CONSTANT_COLOR,[_u]:i.CONSTANT_ALPHA,[xu]:i.ONE_MINUS_CONSTANT_ALPHA};function lt(U,dt,gt,At,ct,et,Lt,Zt,me,re){if(U===Jn){_===!0&&(yt(i.BLEND),_=!1);return}if(_===!1&&(tt(i.BLEND),_=!0),U!==eu){if(U!==m||re!==M){if((p!==hi||x!==hi)&&(i.blendEquation(i.FUNC_ADD),p=hi,x=hi),re)switch(U){case Ci:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xc:i.blendFunc(i.ONE,i.ONE);break;case qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ci:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case qc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}w=null,T=null,A=null,E=null,R.set(0,0,0),P=0,m=U,M=re}return}ct=ct||dt,et=et||gt,Lt=Lt||At,(dt!==p||ct!==x)&&(i.blendEquationSeparate(Z[dt],Z[ct]),p=dt,x=ct),(gt!==w||At!==T||et!==A||Lt!==E)&&(i.blendFuncSeparate(S[gt],S[At],S[et],S[Lt]),w=gt,T=At,A=et,E=Lt),(Zt.equals(R)===!1||me!==P)&&(i.blendColor(Zt.r,Zt.g,Zt.b,me),R.copy(Zt),P=me),m=U,M=!1}function ot(U,dt){U.side===Je?yt(i.CULL_FACE):tt(i.CULL_FACE);let gt=U.side===Ae;dt&&(gt=!gt),wt(gt),U.blending===Ci&&U.transparent===!1?lt(Jn):lt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let At=U.stencilWrite;a.setTest(At),At&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),nt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?tt(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function wt(U){v!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),v=U)}function Q(U){U!==Qh?(tt(i.CULL_FACE),U!==I&&(U===Gc?i.cullFace(i.BACK):U===tu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),I=U}function Pt(U){U!==L&&(V&&i.lineWidth(U),L=U)}function nt(U,dt,gt){U?(tt(i.POLYGON_OFFSET_FILL),(N!==dt||k!==gt)&&(i.polygonOffset(dt,gt),N=dt,k=gt)):yt(i.POLYGON_OFFSET_FILL)}function ft(U){U?tt(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function Ot(U){U===void 0&&(U=i.TEXTURE0+H-1),at!==U&&(i.activeTexture(U),at=U)}function Yt(U,dt,gt){gt===void 0&&(at===null?gt=i.TEXTURE0+H-1:gt=at);let At=mt[gt];At===void 0&&(At={type:void 0,texture:void 0},mt[gt]=At),(At.type!==U||At.texture!==dt)&&(at!==gt&&(i.activeTexture(gt),at=gt),i.bindTexture(U,dt||Y[U]),At.type=U,At.texture=dt)}function C(){let U=mt[at];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function z(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Bt(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pt(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ut(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Nt(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ut(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(U){Dt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Dt.copy(U))}function Wt(U){Et.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Et.copy(U))}function Ft(U,dt){let gt=l.get(dt);gt===void 0&&(gt=new WeakMap,l.set(dt,gt));let At=gt.get(U);At===void 0&&(At=i.getUniformBlockIndex(dt,U.name),gt.set(U,At))}function vt(U,dt){let At=l.get(dt).get(U);c.get(dt)!==At&&(i.uniformBlockBinding(dt,At,U.__bindingPointIndex),c.set(dt,At))}function Kt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},at=null,mt={},h={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,w=null,T=null,x=null,A=null,E=null,R=new qt(0,0,0),P=0,M=!1,v=null,I=null,L=null,N=null,k=null,Dt.set(0,0,i.canvas.width,i.canvas.height),Et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:tt,disable:yt,bindFramebuffer:Ct,drawBuffers:Rt,useProgram:D,setBlending:lt,setMaterial:ot,setFlipSided:wt,setCullFace:Q,setLineWidth:Pt,setPolygonOffset:nt,setScissorTest:ft,activeTexture:Ot,bindTexture:Yt,unbindTexture:C,compressedTexImage2D:y,compressedTexImage3D:z,texImage2D:Nt,texImage3D:ut,updateUBOMapping:Ft,uniformBlockBinding:vt,texStorage2D:pt,texStorage3D:Ut,texSubImage2D:J,texSubImage3D:it,compressedTexSubImage2D:$,compressedTexSubImage3D:Bt,scissor:bt,viewport:Wt,reset:Kt}}function x_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Vt,d=new WeakMap,h,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,y){return f?new OffscreenCanvas(C,y):ar("canvas")}function _(C,y,z){let J=1,it=Yt(C);if((it.width>z||it.height>z)&&(J=z/Math.max(it.width,it.height)),J<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let $=Math.floor(J*it.width),Bt=Math.floor(J*it.height);h===void 0&&(h=g($,Bt));let pt=y?g($,Bt):h;return pt.width=$,pt.height=Bt,pt.getContext("2d").drawImage(C,0,0,$,Bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+$+"x"+Bt+")."),pt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(C,y,z,J,it=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let $=y;if(y===i.RED&&(z===i.FLOAT&&($=i.R32F),z===i.HALF_FLOAT&&($=i.R16F),z===i.UNSIGNED_BYTE&&($=i.R8)),y===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.R8UI),z===i.UNSIGNED_SHORT&&($=i.R16UI),z===i.UNSIGNED_INT&&($=i.R32UI),z===i.BYTE&&($=i.R8I),z===i.SHORT&&($=i.R16I),z===i.INT&&($=i.R32I)),y===i.RG&&(z===i.FLOAT&&($=i.RG32F),z===i.HALF_FLOAT&&($=i.RG16F),z===i.UNSIGNED_BYTE&&($=i.RG8)),y===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.RG8UI),z===i.UNSIGNED_SHORT&&($=i.RG16UI),z===i.UNSIGNED_INT&&($=i.RG32UI),z===i.BYTE&&($=i.RG8I),z===i.SHORT&&($=i.RG16I),z===i.INT&&($=i.RG32I)),y===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.RGB8UI),z===i.UNSIGNED_SHORT&&($=i.RGB16UI),z===i.UNSIGNED_INT&&($=i.RGB32UI),z===i.BYTE&&($=i.RGB8I),z===i.SHORT&&($=i.RGB16I),z===i.INT&&($=i.RGB32I)),y===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&($=i.RGBA8UI),z===i.UNSIGNED_SHORT&&($=i.RGBA16UI),z===i.UNSIGNED_INT&&($=i.RGBA32UI),z===i.BYTE&&($=i.RGBA8I),z===i.SHORT&&($=i.RGBA16I),z===i.INT&&($=i.RGBA32I)),y===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),y===i.RGBA){let Bt=it?rr:ee.getTransfer(J);z===i.FLOAT&&($=i.RGBA32F),z===i.HALF_FLOAT&&($=i.RGBA16F),z===i.UNSIGNED_BYTE&&($=Bt===le?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(C,y){let z;return C?y===null||y===xi||y===Ds?z=i.DEPTH24_STENCIL8:y===Tn?z=i.DEPTH32F_STENCIL8:y===Ps&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===xi||y===Ds?z=i.DEPTH_COMPONENT24:y===Tn?z=i.DEPTH_COMPONENT32F:y===Ps&&(z=i.DEPTH_COMPONENT16),z}function A(C,y){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==ze&&C.minFilter!==an?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function E(C){let y=C.target;y.removeEventListener("dispose",E),P(y),y.isVideoTexture&&d.delete(y)}function R(C){let y=C.target;y.removeEventListener("dispose",R),v(y)}function P(C){let y=n.get(C);if(y.__webglInit===void 0)return;let z=C.source,J=u.get(z);if(J){let it=J[y.__cacheKey];it.usedTimes--,it.usedTimes===0&&M(C),Object.keys(J).length===0&&u.delete(z)}n.remove(C)}function M(C){let y=n.get(C);i.deleteTexture(y.__webglTexture);let z=C.source,J=u.get(z);delete J[y.__cacheKey],o.memory.textures--}function v(C){let y=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(y.__webglFramebuffer[J]))for(let it=0;it<y.__webglFramebuffer[J].length;it++)i.deleteFramebuffer(y.__webglFramebuffer[J][it]);else i.deleteFramebuffer(y.__webglFramebuffer[J]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[J])}else{if(Array.isArray(y.__webglFramebuffer))for(let J=0;J<y.__webglFramebuffer.length;J++)i.deleteFramebuffer(y.__webglFramebuffer[J]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let J=0;J<y.__webglColorRenderbuffer.length;J++)y.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[J]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let z=C.textures;for(let J=0,it=z.length;J<it;J++){let $=n.get(z[J]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(z[J])}n.remove(C)}let I=0;function L(){I=0}function N(){let C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function k(C){let y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function H(C,y){let z=n.get(C);if(C.isVideoTexture&&ft(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){let J=C.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,C,y);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+y)}function V(C,y){let z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){Y(z,C,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+y)}function j(C,y){let z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){Y(z,C,y);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+y)}function G(C,y){let z=n.get(C);if(C.version>0&&z.__version!==C.version){tt(z,C,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+y)}let at={[_s]:i.REPEAT,[Cn]:i.CLAMP_TO_EDGE,[xs]:i.MIRRORED_REPEAT},mt={[ze]:i.NEAREST,[qo]:i.NEAREST_MIPMAP_NEAREST,[Vi]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[Is]:i.LINEAR_MIPMAP_NEAREST,[Nn]:i.LINEAR_MIPMAP_LINEAR},_t={[Iu]:i.NEVER,[Fu]:i.ALWAYS,[Pu]:i.LESS,[nl]:i.LEQUAL,[Lu]:i.EQUAL,[Nu]:i.GEQUAL,[Du]:i.GREATER,[Uu]:i.NOTEQUAL};function q(C,y){if(y.type===Tn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===an||y.magFilter===Is||y.magFilter===Vi||y.magFilter===Nn||y.minFilter===an||y.minFilter===Is||y.minFilter===Vi||y.minFilter===Nn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,at[y.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,at[y.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,at[y.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,mt[y.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,mt[y.minFilter]),y.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,_t[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===ze||y.minFilter!==Vi&&y.minFilter!==Nn||y.type===Tn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Dt(C,y){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",E));let J=y.source,it=u.get(J);it===void 0&&(it={},u.set(J,it));let $=k(y);if($!==C.__cacheKey){it[$]===void 0&&(it[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),it[$].usedTimes++;let Bt=it[C.__cacheKey];Bt!==void 0&&(it[C.__cacheKey].usedTimes--,Bt.usedTimes===0&&M(y)),C.__cacheKey=$,C.__webglTexture=it[$].texture}return z}function Et(C,y,z){return Math.floor(Math.floor(C/z)/y)}function zt(C,y,z,J){let $=C.updateRanges;if($.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,z,J,y.data);else{$.sort((ut,bt)=>ut.start-bt.start);let Bt=0;for(let ut=1;ut<$.length;ut++){let bt=$[Bt],Wt=$[ut],Ft=bt.start+bt.count,vt=Et(Wt.start,y.width,4),Kt=Et(bt.start,y.width,4);Wt.start<=Ft+1&&vt===Kt&&Et(Wt.start+Wt.count-1,y.width,4)===vt?bt.count=Math.max(bt.count,Wt.start+Wt.count-bt.start):(++Bt,$[Bt]=Wt)}$.length=Bt+1;let pt=i.getParameter(i.UNPACK_ROW_LENGTH),Ut=i.getParameter(i.UNPACK_SKIP_PIXELS),Nt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let ut=0,bt=$.length;ut<bt;ut++){let Wt=$[ut],Ft=Math.floor(Wt.start/4),vt=Math.ceil(Wt.count/4),Kt=Ft%y.width,U=Math.floor(Ft/y.width),dt=vt,gt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Kt),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,Kt,U,dt,gt,z,J,y.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,pt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ut),i.pixelStorei(i.UNPACK_SKIP_ROWS,Nt)}}function Y(C,y,z){let J=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(J=i.TEXTURE_3D);let it=Dt(C,y),$=y.source;e.bindTexture(J,C.__webglTexture,i.TEXTURE0+z);let Bt=n.get($);if($.version!==Bt.__version||it===!0){e.activeTexture(i.TEXTURE0+z);let pt=ee.getPrimaries(ee.workingColorSpace),Ut=y.colorSpace===En?null:ee.getPrimaries(y.colorSpace),Nt=y.colorSpace===En||pt===Ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let ut=_(y.image,!1,s.maxTextureSize);ut=Ot(y,ut);let bt=r.convert(y.format,y.colorSpace),Wt=r.convert(y.type),Ft=T(y.internalFormat,bt,Wt,y.colorSpace,y.isVideoTexture);q(J,y);let vt,Kt=y.mipmaps,U=y.isVideoTexture!==!0,dt=Bt.__version===void 0||it===!0,gt=$.dataReady,At=A(y,ut);if(y.isDepthTexture)Ft=x(y.format===Us,y.type),dt&&(U?e.texStorage2D(i.TEXTURE_2D,1,Ft,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,Ft,ut.width,ut.height,0,bt,Wt,null));else if(y.isDataTexture)if(Kt.length>0){U&&dt&&e.texStorage2D(i.TEXTURE_2D,At,Ft,Kt[0].width,Kt[0].height);for(let ct=0,et=Kt.length;ct<et;ct++)vt=Kt[ct],U?gt&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,vt.width,vt.height,bt,Wt,vt.data):e.texImage2D(i.TEXTURE_2D,ct,Ft,vt.width,vt.height,0,bt,Wt,vt.data);y.generateMipmaps=!1}else U?(dt&&e.texStorage2D(i.TEXTURE_2D,At,Ft,ut.width,ut.height),gt&&zt(y,ut,bt,Wt)):e.texImage2D(i.TEXTURE_2D,0,Ft,ut.width,ut.height,0,bt,Wt,ut.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){U&&dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Ft,Kt[0].width,Kt[0].height,ut.depth);for(let ct=0,et=Kt.length;ct<et;ct++)if(vt=Kt[ct],y.format!==je)if(bt!==null)if(U){if(gt)if(y.layerUpdates.size>0){let Lt=hl(vt.width,vt.height,y.format,y.type);for(let Zt of y.layerUpdates){let me=vt.data.subarray(Zt*Lt/vt.data.BYTES_PER_ELEMENT,(Zt+1)*Lt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,Zt,vt.width,vt.height,1,bt,me)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,vt.width,vt.height,ut.depth,bt,vt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ct,Ft,vt.width,vt.height,ut.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?gt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,vt.width,vt.height,ut.depth,bt,Wt,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ct,Ft,vt.width,vt.height,ut.depth,0,bt,Wt,vt.data)}else{U&&dt&&e.texStorage2D(i.TEXTURE_2D,At,Ft,Kt[0].width,Kt[0].height);for(let ct=0,et=Kt.length;ct<et;ct++)vt=Kt[ct],y.format!==je?bt!==null?U?gt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ct,0,0,vt.width,vt.height,bt,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,ct,Ft,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?gt&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,vt.width,vt.height,bt,Wt,vt.data):e.texImage2D(i.TEXTURE_2D,ct,Ft,vt.width,vt.height,0,bt,Wt,vt.data)}else if(y.isDataArrayTexture)if(U){if(dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Ft,ut.width,ut.height,ut.depth),gt)if(y.layerUpdates.size>0){let ct=hl(ut.width,ut.height,y.format,y.type);for(let et of y.layerUpdates){let Lt=ut.data.subarray(et*ct/ut.data.BYTES_PER_ELEMENT,(et+1)*ct/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,et,ut.width,ut.height,1,bt,Wt,Lt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,bt,Wt,ut.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ft,ut.width,ut.height,ut.depth,0,bt,Wt,ut.data);else if(y.isData3DTexture)U?(dt&&e.texStorage3D(i.TEXTURE_3D,At,Ft,ut.width,ut.height,ut.depth),gt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,bt,Wt,ut.data)):e.texImage3D(i.TEXTURE_3D,0,Ft,ut.width,ut.height,ut.depth,0,bt,Wt,ut.data);else if(y.isFramebufferTexture){if(dt)if(U)e.texStorage2D(i.TEXTURE_2D,At,Ft,ut.width,ut.height);else{let ct=ut.width,et=ut.height;for(let Lt=0;Lt<At;Lt++)e.texImage2D(i.TEXTURE_2D,Lt,Ft,ct,et,0,bt,Wt,null),ct>>=1,et>>=1}}else if(Kt.length>0){if(U&&dt){let ct=Yt(Kt[0]);e.texStorage2D(i.TEXTURE_2D,At,Ft,ct.width,ct.height)}for(let ct=0,et=Kt.length;ct<et;ct++)vt=Kt[ct],U?gt&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,bt,Wt,vt):e.texImage2D(i.TEXTURE_2D,ct,Ft,bt,Wt,vt);y.generateMipmaps=!1}else if(U){if(dt){let ct=Yt(ut);e.texStorage2D(i.TEXTURE_2D,At,Ft,ct.width,ct.height)}gt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,bt,Wt,ut)}else e.texImage2D(i.TEXTURE_2D,0,Ft,bt,Wt,ut);m(y)&&p(J),Bt.__version=$.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function tt(C,y,z){if(y.image.length!==6)return;let J=Dt(C,y),it=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+z);let $=n.get(it);if(it.version!==$.__version||J===!0){e.activeTexture(i.TEXTURE0+z);let Bt=ee.getPrimaries(ee.workingColorSpace),pt=y.colorSpace===En?null:ee.getPrimaries(y.colorSpace),Ut=y.colorSpace===En||Bt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ut);let Nt=y.isCompressedTexture||y.image[0].isCompressedTexture,ut=y.image[0]&&y.image[0].isDataTexture,bt=[];for(let et=0;et<6;et++)!Nt&&!ut?bt[et]=_(y.image[et],!0,s.maxCubemapSize):bt[et]=ut?y.image[et].image:y.image[et],bt[et]=Ot(y,bt[et]);let Wt=bt[0],Ft=r.convert(y.format,y.colorSpace),vt=r.convert(y.type),Kt=T(y.internalFormat,Ft,vt,y.colorSpace),U=y.isVideoTexture!==!0,dt=$.__version===void 0||J===!0,gt=it.dataReady,At=A(y,Wt);q(i.TEXTURE_CUBE_MAP,y);let ct;if(Nt){U&&dt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,At,Kt,Wt.width,Wt.height);for(let et=0;et<6;et++){ct=bt[et].mipmaps;for(let Lt=0;Lt<ct.length;Lt++){let Zt=ct[Lt];y.format!==je?Ft!==null?U?gt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt,0,0,Zt.width,Zt.height,Ft,Zt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt,Kt,Zt.width,Zt.height,0,Zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt,0,0,Zt.width,Zt.height,Ft,vt,Zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt,Kt,Zt.width,Zt.height,0,Ft,vt,Zt.data)}}}else{if(ct=y.mipmaps,U&&dt){ct.length>0&&At++;let et=Yt(bt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,At,Kt,et.width,et.height)}for(let et=0;et<6;et++)if(ut){U?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,bt[et].width,bt[et].height,Ft,vt,bt[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Kt,bt[et].width,bt[et].height,0,Ft,vt,bt[et].data);for(let Lt=0;Lt<ct.length;Lt++){let me=ct[Lt].image[et].image;U?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt+1,0,0,me.width,me.height,Ft,vt,me.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt+1,Kt,me.width,me.height,0,Ft,vt,me.data)}}else{U?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Ft,vt,bt[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Kt,Ft,vt,bt[et]);for(let Lt=0;Lt<ct.length;Lt++){let Zt=ct[Lt];U?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt+1,0,0,Ft,vt,Zt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Lt+1,Kt,Ft,vt,Zt.image[et])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),$.__version=it.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function yt(C,y,z,J,it,$){let Bt=r.convert(z.format,z.colorSpace),pt=r.convert(z.type),Ut=T(z.internalFormat,Bt,pt,z.colorSpace),Nt=n.get(y),ut=n.get(z);if(ut.__renderTarget=y,!Nt.__hasExternalTextures){let bt=Math.max(1,y.width>>$),Wt=Math.max(1,y.height>>$);it===i.TEXTURE_3D||it===i.TEXTURE_2D_ARRAY?e.texImage3D(it,$,Ut,bt,Wt,y.depth,0,Bt,pt,null):e.texImage2D(it,$,Ut,bt,Wt,0,Bt,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),nt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,it,ut.__webglTexture,0,Pt(y)):(it===i.TEXTURE_2D||it>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,it,ut.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ct(C,y,z){if(i.bindRenderbuffer(i.RENDERBUFFER,C),y.depthBuffer){let J=y.depthTexture,it=J&&J.isDepthTexture?J.type:null,$=x(y.stencilBuffer,it),Bt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=Pt(y);nt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,$,y.width,y.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,$,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,$,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Bt,i.RENDERBUFFER,C)}else{let J=y.textures;for(let it=0;it<J.length;it++){let $=J[it],Bt=r.convert($.format,$.colorSpace),pt=r.convert($.type),Ut=T($.internalFormat,Bt,pt,$.colorSpace),Nt=Pt(y);z&&nt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Nt,Ut,y.width,y.height):nt(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Nt,Ut,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Ut,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(C,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=n.get(y.depthTexture);J.__renderTarget=y,(!J.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),H(y.depthTexture,0);let it=J.__webglTexture,$=Pt(y);if(y.depthTexture.format===ys)nt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,it,0);else if(y.depthTexture.format===Us)nt(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function D(C){let y=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){let J=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),J){let it=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,J.removeEventListener("dispose",it)};J.addEventListener("dispose",it),y.__depthDisposeCallback=it}y.__boundDepthTexture=J}if(C.depthTexture&&!y.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");let J=C.texture.mipmaps;J&&J.length>0?Rt(y.__webglFramebuffer[0],C):Rt(y.__webglFramebuffer,C)}else if(z){y.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[J]),y.__webglDepthbuffer[J]===void 0)y.__webglDepthbuffer[J]=i.createRenderbuffer(),Ct(y.__webglDepthbuffer[J],C,!1);else{let it=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=y.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,$)}}else{let J=C.texture.mipmaps;if(J&&J.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Ct(y.__webglDepthbuffer,C,!1);else{let it=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,$)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(C,y,z){let J=n.get(C);y!==void 0&&yt(J.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&D(C)}function S(C){let y=C.texture,z=n.get(C),J=n.get(y);C.addEventListener("dispose",R);let it=C.textures,$=C.isWebGLCubeRenderTarget===!0,Bt=it.length>1;if(Bt||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=y.version,o.memory.textures++),$){z.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[pt]=[];for(let Ut=0;Ut<y.mipmaps.length;Ut++)z.__webglFramebuffer[pt][Ut]=i.createFramebuffer()}else z.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let pt=0;pt<y.mipmaps.length;pt++)z.__webglFramebuffer[pt]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Bt)for(let pt=0,Ut=it.length;pt<Ut;pt++){let Nt=n.get(it[pt]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&nt(C)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let pt=0;pt<it.length;pt++){let Ut=it[pt];z.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[pt]);let Nt=r.convert(Ut.format,Ut.colorSpace),ut=r.convert(Ut.type),bt=T(Ut.internalFormat,Nt,ut,Ut.colorSpace,C.isXRRenderTarget===!0),Wt=Pt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt,bt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,z.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Ct(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),q(i.TEXTURE_CUBE_MAP,y);for(let pt=0;pt<6;pt++)if(y.mipmaps&&y.mipmaps.length>0)for(let Ut=0;Ut<y.mipmaps.length;Ut++)yt(z.__webglFramebuffer[pt][Ut],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ut);else yt(z.__webglFramebuffer[pt],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Bt){for(let pt=0,Ut=it.length;pt<Ut;pt++){let Nt=it[pt],ut=n.get(Nt),bt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(bt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(bt,ut.__webglTexture),q(bt,Nt),yt(z.__webglFramebuffer,C,Nt,i.COLOR_ATTACHMENT0+pt,bt,0),m(Nt)&&p(bt)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(pt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,J.__webglTexture),q(pt,y),y.mipmaps&&y.mipmaps.length>0)for(let Ut=0;Ut<y.mipmaps.length;Ut++)yt(z.__webglFramebuffer[Ut],C,y,i.COLOR_ATTACHMENT0,pt,Ut);else yt(z.__webglFramebuffer,C,y,i.COLOR_ATTACHMENT0,pt,0);m(y)&&p(pt),e.unbindTexture()}C.depthBuffer&&D(C)}function lt(C){let y=C.textures;for(let z=0,J=y.length;z<J;z++){let it=y[z];if(m(it)){let $=w(C),Bt=n.get(it).__webglTexture;e.bindTexture($,Bt),p($),e.unbindTexture()}}}let ot=[],wt=[];function Q(C){if(C.samples>0){if(nt(C)===!1){let y=C.textures,z=C.width,J=C.height,it=i.COLOR_BUFFER_BIT,$=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Bt=n.get(C),pt=y.length>1;if(pt)for(let Nt=0;Nt<y.length;Nt++)e.bindFramebuffer(i.FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Bt.__webglMultisampledFramebuffer);let Ut=C.texture.mipmaps;Ut&&Ut.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Bt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Bt.__webglFramebuffer);for(let Nt=0;Nt<y.length;Nt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(it|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(it|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Bt.__webglColorRenderbuffer[Nt]);let ut=n.get(y[Nt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ut,0)}i.blitFramebuffer(0,0,z,J,0,0,z,J,it,i.NEAREST),c===!0&&(ot.length=0,wt.length=0,ot.push(i.COLOR_ATTACHMENT0+Nt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ot.push($),wt.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,wt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ot))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let Nt=0;Nt<y.length;Nt++){e.bindFramebuffer(i.FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.RENDERBUFFER,Bt.__webglColorRenderbuffer[Nt]);let ut=n.get(y[Nt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Nt,i.TEXTURE_2D,ut,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Bt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Pt(C){return Math.min(s.maxSamples,C.samples)}function nt(C){let y=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ft(C){let y=o.render.frame;d.get(C)!==y&&(d.set(C,y),C.update())}function Ot(C,y){let z=C.colorSpace,J=C.format,it=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Li&&z!==En&&(ee.getTransfer(z)===le?(J!==je||it!==wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),y}function Yt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=L,this.setTexture2D=H,this.setTexture2DArray=V,this.setTexture3D=j,this.setTextureCube=G,this.rebindTextures=Z,this.setupRenderTarget=S,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=D,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=nt}function y_(i,t){function e(n,s=En){let r,o=ee.getTransfer(s);if(n===wn)return i.UNSIGNED_BYTE;if(n===Zo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===$o)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Jc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===jc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===$c)return i.BYTE;if(n===Kc)return i.SHORT;if(n===Ps)return i.UNSIGNED_SHORT;if(n===Yo)return i.INT;if(n===xi)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===Ls)return i.HALF_FLOAT;if(n===Qc)return i.ALPHA;if(n===tl)return i.RGB;if(n===je)return i.RGBA;if(n===ys)return i.DEPTH_COMPONENT;if(n===Us)return i.DEPTH_STENCIL;if(n===Ko)return i.RED;if(n===Jo)return i.RED_INTEGER;if(n===el)return i.RG;if(n===jo)return i.RG_INTEGER;if(n===Qo)return i.RGBA_INTEGER;if(n===Ar||n===Rr||n===Cr||n===Ir)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ar)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ar)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ta||n===ea||n===na||n===ia)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ta)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===na)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ia)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===sa||n===ra||n===oa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===sa||n===ra)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===oa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===aa||n===ca||n===la||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===xa||n===ya||n===va)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===aa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ca)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===la)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ha)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ua)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===da)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===pa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ma)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ga)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_a)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ya)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===va)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ma||n===ba||n===Sa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ma)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ba)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wa||n===Ta||n===Ea||n===Aa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===wa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ta)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ea)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Aa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var v_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,M_=`
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

}`,Sl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new _r(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new bn({vertexShader:v_,fragmentShader:M_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ae(new yr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wl=class extends In{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,d=null,h=null,u=null,f=null,g=null,_=typeof XRWebGLBinding<"u",m=new Sl,p={},w=e.getContextAttributes(),T=null,x=null,A=[],E=[],R=new Vt,P=null,M=new Oe;M.viewport=new ce;let v=new Oe;v.viewport=new ce;let I=[M,v],L=new Do,N=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let tt=A[Y];return tt===void 0&&(tt=new Ts,A[Y]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(Y){let tt=A[Y];return tt===void 0&&(tt=new Ts,A[Y]=tt),tt.getGripSpace()},this.getHand=function(Y){let tt=A[Y];return tt===void 0&&(tt=new Ts,A[Y]=tt),tt.getHandSpace()};function H(Y){let tt=E.indexOf(Y.inputSource);if(tt===-1)return;let yt=A[tt];yt!==void 0&&(yt.update(Y.inputSource,Y.frame,l||o),yt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",j);for(let Y=0;Y<A.length;Y++){let tt=E[Y];tt!==null&&(E[Y]=null,A[Y].disconnect(tt))}N=null,k=null,m.reset();for(let Y in p)delete p[Y];t.setRenderTarget(T),f=null,u=null,h=null,s=null,x=null,zt.stop(),n.isPresenting=!1,t.setPixelRatio(P),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(s,e)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",V),s.addEventListener("inputsourceschange",j),w.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Ct=null,Rt=null;w.depth&&(Rt=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=w.stencil?Us:ys,Ct=w.stencil?Ds:xi);let D={colorFormat:e.RGBA8,depthFormat:Rt,scaleFactor:r};h=this.getBinding(),u=h.createProjectionLayer(D),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new mn(u.textureWidth,u.textureHeight,{format:je,type:wn,depthTexture:new gr(u.textureWidth,u.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let yt={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new mn(f.framebufferWidth,f.framebufferHeight,{format:je,type:wn,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),zt.setContext(s),zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(Y){for(let tt=0;tt<Y.removed.length;tt++){let yt=Y.removed[tt],Ct=E.indexOf(yt);Ct>=0&&(E[Ct]=null,A[Ct].disconnect(yt))}for(let tt=0;tt<Y.added.length;tt++){let yt=Y.added[tt],Ct=E.indexOf(yt);if(Ct===-1){for(let D=0;D<A.length;D++)if(D>=E.length){E.push(yt),Ct=D;break}else if(E[D]===null){E[D]=yt,Ct=D;break}if(Ct===-1)break}let Rt=A[Ct];Rt&&Rt.connect(yt)}}let G=new F,at=new F;function mt(Y,tt,yt){G.setFromMatrixPosition(tt.matrixWorld),at.setFromMatrixPosition(yt.matrixWorld);let Ct=G.distanceTo(at),Rt=tt.projectionMatrix.elements,D=yt.projectionMatrix.elements,Z=Rt[14]/(Rt[10]-1),S=Rt[14]/(Rt[10]+1),lt=(Rt[9]+1)/Rt[5],ot=(Rt[9]-1)/Rt[5],wt=(Rt[8]-1)/Rt[0],Q=(D[8]+1)/D[0],Pt=Z*wt,nt=Z*Q,ft=Ct/(-wt+Q),Ot=ft*-wt;if(tt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ot),Y.translateZ(ft),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Rt[10]===-1)Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let Yt=Z+ft,C=S+ft,y=Pt-Ot,z=nt+(Ct-Ot),J=lt*S/C*Yt,it=ot*S/C*Yt;Y.projectionMatrix.makePerspective(y,z,J,it,Yt,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function _t(Y,tt){tt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(tt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let tt=Y.near,yt=Y.far;m.texture!==null&&(m.depthNear>0&&(tt=m.depthNear),m.depthFar>0&&(yt=m.depthFar)),L.near=v.near=M.near=tt,L.far=v.far=M.far=yt,(N!==L.near||k!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),N=L.near,k=L.far),L.layers.mask=Y.layers.mask|6,M.layers.mask=L.layers.mask&3,v.layers.mask=L.layers.mask&5;let Ct=Y.parent,Rt=L.cameras;_t(L,Ct);for(let D=0;D<Rt.length;D++)_t(Rt[D],Ct);Rt.length===2?mt(L,M,v):L.projectionMatrix.copy(M.projectionMatrix),q(Y,L,Ct)};function q(Y,tt,yt){yt===null?Y.matrix.copy(tt.matrixWorld):(Y.matrix.copy(yt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(tt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ms*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(Y){c=Y,u!==null&&(u.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(Y){return p[Y]};let Dt=null;function Et(Y,tt){if(d=tt.getViewerPose(l||o),g=tt,d!==null){let yt=d.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let Ct=!1;yt.length!==L.cameras.length&&(L.cameras.length=0,Ct=!0);for(let S=0;S<yt.length;S++){let lt=yt[S],ot=null;if(f!==null)ot=f.getViewport(lt);else{let Q=h.getViewSubImage(u,lt);ot=Q.viewport,S===0&&(t.setRenderTargetTextures(x,Q.colorTexture,Q.depthStencilTexture),t.setRenderTarget(x))}let wt=I[S];wt===void 0&&(wt=new Oe,wt.layers.enable(S),wt.viewport=new ce,I[S]=wt),wt.matrix.fromArray(lt.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(lt.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(ot.x,ot.y,ot.width,ot.height),S===0&&(L.matrix.copy(wt.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ct===!0&&L.cameras.push(wt)}let Rt=s.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){h=n.getBinding();let S=h.getDepthInformation(yt[0]);S&&S.isValid&&S.texture&&m.init(S,s.renderState)}if(Rt&&Rt.includes("camera-access")&&_){t.state.unbindTexture(),h=n.getBinding();for(let S=0;S<yt.length;S++){let lt=yt[S].camera;if(lt){let ot=p[lt];ot||(ot=new _r,p[lt]=ot);let wt=h.getCameraImage(lt);ot.sourceTexture=wt}}}}for(let yt=0;yt<A.length;yt++){let Ct=E[yt],Rt=A[yt];Ct!==null&&Rt!==void 0&&Rt.update(Ct,tt,l||o)}Dt&&Dt(Y,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}let zt=new ud;zt.setAnimationLoop(Et),this.setAnimationLoop=function(Y){Dt=Y},this.dispose=function(){}}},qi=new gn,b_=new he;function S_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,al(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,T,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,w,T):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ae&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ae&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let w=t.get(p),T=w.envMap,x=w.envMapRotation;T&&(m.envMap.value=T,qi.copy(x),qi.x*=-1,qi.y*=-1,qi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(qi.y*=-1,qi.z*=-1),m.envMapRotation.value.setFromMatrix4(b_.makeRotationFromEuler(qi)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,w,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=T*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ae&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let w=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function w_(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,T){let x=T.program;n.uniformBlockBinding(w,x)}function l(w,T){let x=s[w.id];x===void 0&&(g(w),x=d(w),s[w.id]=x,w.addEventListener("dispose",m));let A=T.program;n.updateUBOMapping(w,A);let E=t.render.frame;r[w.id]!==E&&(u(w),r[w.id]=E)}function d(w){let T=h();w.__bindingPointIndex=T;let x=i.createBuffer(),A=w.__size,E=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,A,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,x),x}function h(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){let T=s[w.id],x=w.uniforms,A=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let E=0,R=x.length;E<R;E++){let P=Array.isArray(x[E])?x[E]:[x[E]];for(let M=0,v=P.length;M<v;M++){let I=P[M];if(f(I,E,M,A)===!0){let L=I.__offset,N=Array.isArray(I.value)?I.value:[I.value],k=0;for(let H=0;H<N.length;H++){let V=N[H],j=_(V);typeof V=="number"||typeof V=="boolean"?(I.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,L+k,I.__data)):V.isMatrix3?(I.__data[0]=V.elements[0],I.__data[1]=V.elements[1],I.__data[2]=V.elements[2],I.__data[3]=0,I.__data[4]=V.elements[3],I.__data[5]=V.elements[4],I.__data[6]=V.elements[5],I.__data[7]=0,I.__data[8]=V.elements[6],I.__data[9]=V.elements[7],I.__data[10]=V.elements[8],I.__data[11]=0):(V.toArray(I.__data,k),k+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(w,T,x,A){let E=w.value,R=T+"_"+x;if(A[R]===void 0)return typeof E=="number"||typeof E=="boolean"?A[R]=E:A[R]=E.clone(),!0;{let P=A[R];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return A[R]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function g(w){let T=w.uniforms,x=0,A=16;for(let R=0,P=T.length;R<P;R++){let M=Array.isArray(T[R])?T[R]:[T[R]];for(let v=0,I=M.length;v<I;v++){let L=M[v],N=Array.isArray(L.value)?L.value:[L.value];for(let k=0,H=N.length;k<H;k++){let V=N[k],j=_(V),G=x%A,at=G%j.boundary,mt=G+at;x+=at,mt!==0&&A-mt<j.storage&&(x+=A-mt),L.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=x,x+=j.storage}}}let E=x%A;return E>0&&(x+=A-E),w.__size=x,w.__cache={},this}function _(w){let T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function m(w){let T=w.target;T.removeEventListener("dispose",m);let x=o.indexOf(T.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function p(){for(let w in s)i.deleteBuffer(s[w]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}var La=class{constructor(t={}){let{canvas:e=Ou(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,p=null,w=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Sn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,A=!1;this._outputColorSpace=Ue;let E=0,R=0,P=null,M=-1,v=null,I=new ce,L=new ce,N=null,k=new qt(0),H=0,V=e.width,j=e.height,G=1,at=null,mt=null,_t=new ce(0,0,V,j),q=new ce(0,0,V,j),Dt=!1,Et=new Es,zt=!1,Y=!1,tt=new he,yt=new F,Ct=new ce,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},D=!1;function Z(){return P===null?G:1}let S=n;function lt(b,O){return e.getContext(b,O)}try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",ct,!1),S===null){let O="webgl2";if(S=lt(O,b),S===null)throw lt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ot,wt,Q,Pt,nt,ft,Ot,Yt,C,y,z,J,it,$,Bt,pt,Ut,Nt,ut,bt,Wt,Ft,vt,Kt;function U(){ot=new Vg(S),ot.init(),Ft=new y_(S,ot),wt=new Ng(S,ot,t,Ft),Q=new __(S,ot),wt.reversedDepthBuffer&&u&&Q.buffers.depth.setReversed(!0),Pt=new Xg(S),nt=new s_,ft=new x_(S,ot,Q,nt,wt,Ft,Pt),Ot=new Og(x),Yt=new Hg(x),C=new Jf(S),vt=new Dg(S,C),y=new Gg(S,C,Pt,vt),z=new Yg(S,y,C,Pt),ut=new qg(S,wt,ft),pt=new Fg(nt),J=new i_(x,Ot,Yt,ot,wt,vt,pt),it=new S_(x,nt),$=new o_,Bt=new d_(ot),Nt=new Lg(x,Ot,Yt,Q,z,f,c),Ut=new m_(x,z,wt),Kt=new w_(S,Pt,wt,Q),bt=new Ug(S,ot,Pt),Wt=new Wg(S,ot,Pt),Pt.programs=J.programs,x.capabilities=wt,x.extensions=ot,x.properties=nt,x.renderLists=$,x.shadowMap=Ut,x.state=Q,x.info=Pt}U();let dt=new wl(x,S);this.xr=dt,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let b=ot.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=ot.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(b){b!==void 0&&(G=b,this.setSize(V,j,!1))},this.getSize=function(b){return b.set(V,j)},this.setSize=function(b,O,W=!0){if(dt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=b,j=O,e.width=Math.floor(b*G),e.height=Math.floor(O*G),W===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(V*G,j*G).floor()},this.setDrawingBufferSize=function(b,O,W){V=b,j=O,G=W,e.width=Math.floor(b*W),e.height=Math.floor(O*W),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy(_t)},this.setViewport=function(b,O,W,X){b.isVector4?_t.set(b.x,b.y,b.z,b.w):_t.set(b,O,W,X),Q.viewport(I.copy(_t).multiplyScalar(G).round())},this.getScissor=function(b){return b.copy(q)},this.setScissor=function(b,O,W,X){b.isVector4?q.set(b.x,b.y,b.z,b.w):q.set(b,O,W,X),Q.scissor(L.copy(q).multiplyScalar(G).round())},this.getScissorTest=function(){return Dt},this.setScissorTest=function(b){Q.setScissorTest(Dt=b)},this.setOpaqueSort=function(b){at=b},this.setTransparentSort=function(b){mt=b},this.getClearColor=function(b){return b.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor(...arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,W=!0){let X=0;if(b){let B=!1;if(P!==null){let ht=P.texture.format;B=ht===Qo||ht===jo||ht===Jo}if(B){let ht=P.texture.type,Mt=ht===wn||ht===xi||ht===Ps||ht===Ds||ht===Zo||ht===$o,It=Nt.getClearColor(),St=Nt.getClearAlpha(),Gt=It.r,Xt=It.g,kt=It.b;Mt?(g[0]=Gt,g[1]=Xt,g[2]=kt,g[3]=St,S.clearBufferuiv(S.COLOR,0,g)):(_[0]=Gt,_[1]=Xt,_[2]=kt,_[3]=St,S.clearBufferiv(S.COLOR,0,_))}else X|=S.COLOR_BUFFER_BIT}O&&(X|=S.DEPTH_BUFFER_BIT),W&&(X|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),S.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),Nt.dispose(),$.dispose(),Bt.dispose(),nt.dispose(),Ot.dispose(),Yt.dispose(),z.dispose(),vt.dispose(),Kt.dispose(),J.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",Rn),dt.removeEventListener("sessionend",uh),vi.stop()};function gt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let b=Pt.autoReset,O=Ut.enabled,W=Ut.autoUpdate,X=Ut.needsUpdate,B=Ut.type;U(),Pt.autoReset=b,Ut.enabled=O,Ut.autoUpdate=W,Ut.needsUpdate=X,Ut.type=B}function ct(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function et(b){let O=b.target;O.removeEventListener("dispose",et),Lt(O)}function Lt(b){Zt(b),nt.remove(b)}function Zt(b){let O=nt.get(b).programs;O!==void 0&&(O.forEach(function(W){J.releaseProgram(W)}),b.isShaderMaterial&&J.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,W,X,B,ht){O===null&&(O=Rt);let Mt=B.isMesh&&B.matrixWorld.determinant()<0,It=Zd(b,O,W,X,B);Q.setMaterial(X,Mt);let St=W.index,Gt=1;if(X.wireframe===!0){if(St=y.getWireframeAttribute(W),St===void 0)return;Gt=2}let Xt=W.drawRange,kt=W.attributes.position,te=Xt.start*Gt,ue=(Xt.start+Xt.count)*Gt;ht!==null&&(te=Math.max(te,ht.start*Gt),ue=Math.min(ue,(ht.start+ht.count)*Gt)),St!==null?(te=Math.max(te,0),ue=Math.min(ue,St.count)):kt!=null&&(te=Math.max(te,0),ue=Math.min(ue,kt.count));let Se=ue-te;if(Se<0||Se===1/0)return;vt.setup(B,X,It,W,St);let _e,fe=bt;if(St!==null&&(_e=C.get(St),fe=Wt,fe.setIndex(_e)),B.isMesh)X.wireframe===!0?(Q.setLineWidth(X.wireframeLinewidth*Z()),fe.setMode(S.LINES)):fe.setMode(S.TRIANGLES);else if(B.isLine){let Ht=X.linewidth;Ht===void 0&&(Ht=1),Q.setLineWidth(Ht*Z()),B.isLineSegments?fe.setMode(S.LINES):B.isLineLoop?fe.setMode(S.LINE_LOOP):fe.setMode(S.LINE_STRIP)}else B.isPoints?fe.setMode(S.POINTS):B.isSprite&&fe.setMode(S.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)bs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),fe.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ot.get("WEBGL_multi_draw"))fe.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Ht=B._multiDrawStarts,Me=B._multiDrawCounts,ne=B._multiDrawCount,tn=St?C.get(St).bytesPerElement:1,ji=nt.get(X).currentProgram.getUniforms();for(let en=0;en<ne;en++)ji.setValue(S,"_gl_DrawID",en),fe.render(Ht[en]/tn,Me[en])}else if(B.isInstancedMesh)fe.renderInstances(te,Se,B.count);else if(W.isInstancedBufferGeometry){let Ht=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Me=Math.min(W.instanceCount,Ht);fe.renderInstances(te,Se,Me)}else fe.render(te,Se)};function me(b,O,W){b.transparent===!0&&b.side===Je&&b.forceSinglePass===!1?(b.side=Ae,b.needsUpdate=!0,Gr(b,O,W),b.side=on,b.needsUpdate=!0,Gr(b,O,W),b.side=Je):Gr(b,O,W)}this.compile=function(b,O,W=null){W===null&&(W=b),p=Bt.get(W),p.init(O),T.push(p),W.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),b!==W&&b.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let X=new Set;return b.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let ht=B.material;if(ht)if(Array.isArray(ht))for(let Mt=0;Mt<ht.length;Mt++){let It=ht[Mt];me(It,W,B),X.add(It)}else me(ht,W,B),X.add(ht)}),p=T.pop(),X},this.compileAsync=function(b,O,W=null){let X=this.compile(b,O,W);return new Promise(B=>{function ht(){if(X.forEach(function(Mt){nt.get(Mt).currentProgram.isReady()&&X.delete(Mt)}),X.size===0){B(b);return}setTimeout(ht,10)}ot.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let re=null;function kn(b){re&&re(b)}function Rn(){vi.stop()}function uh(){vi.start()}let vi=new ud;vi.setAnimationLoop(kn),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(b){re=b,dt.setAnimationLoop(b),b===null?vi.stop():vi.start()},dt.addEventListener("sessionstart",Rn),dt.addEventListener("sessionend",uh),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(O),O=dt.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,O,P),p=Bt.get(b,T.length),p.init(O),T.push(p),tt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Et.setFromProjectionMatrix(tt,Mn,O.reversedDepth),Y=this.localClippingEnabled,zt=pt.init(this.clippingPlanes,Y),m=$.get(b,w.length),m.init(),w.push(m),dt.enabled===!0&&dt.isPresenting===!0){let ht=x.xr.getDepthSensingMesh();ht!==null&&ec(ht,O,-1/0,x.sortObjects)}ec(b,O,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(at,mt),D=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,D&&Nt.addToRenderList(m,b),this.info.render.frame++,zt===!0&&pt.beginShadows();let W=p.state.shadowsArray;Ut.render(W,b,O),zt===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset();let X=m.opaque,B=m.transmissive;if(p.setupLights(),O.isArrayCamera){let ht=O.cameras;if(B.length>0)for(let Mt=0,It=ht.length;Mt<It;Mt++){let St=ht[Mt];fh(X,B,b,St)}D&&Nt.render(b);for(let Mt=0,It=ht.length;Mt<It;Mt++){let St=ht[Mt];dh(m,b,St,St.viewport)}}else B.length>0&&fh(X,B,b,O),D&&Nt.render(b),dh(m,b,O);P!==null&&R===0&&(ft.updateMultisampleRenderTarget(P),ft.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(x,b,O),vt.resetDefaultState(),M=-1,v=null,T.pop(),T.length>0?(p=T[T.length-1],zt===!0&&pt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function ec(b,O,W,X){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Et.intersectsSprite(b)){X&&Ct.setFromMatrixPosition(b.matrixWorld).applyMatrix4(tt);let Mt=z.update(b),It=b.material;It.visible&&m.push(b,Mt,It,W,Ct.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Et.intersectsObject(b))){let Mt=z.update(b),It=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ct.copy(b.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),Ct.copy(Mt.boundingSphere.center)),Ct.applyMatrix4(b.matrixWorld).applyMatrix4(tt)),Array.isArray(It)){let St=Mt.groups;for(let Gt=0,Xt=St.length;Gt<Xt;Gt++){let kt=St[Gt],te=It[kt.materialIndex];te&&te.visible&&m.push(b,Mt,te,W,Ct.z,kt)}}else It.visible&&m.push(b,Mt,It,W,Ct.z,null)}}let ht=b.children;for(let Mt=0,It=ht.length;Mt<It;Mt++)ec(ht[Mt],O,W,X)}function dh(b,O,W,X){let B=b.opaque,ht=b.transmissive,Mt=b.transparent;p.setupLightsView(W),zt===!0&&pt.setGlobalState(x.clippingPlanes,W),X&&Q.viewport(I.copy(X)),B.length>0&&Vr(B,O,W),ht.length>0&&Vr(ht,O,W),Mt.length>0&&Vr(Mt,O,W),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function fh(b,O,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new mn(1,1,{generateMipmaps:!0,type:ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float")?Ls:wn,minFilter:Nn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));let ht=p.state.transmissionRenderTarget[X.id],Mt=X.viewport||I;ht.setSize(Mt.z*x.transmissionResolutionScale,Mt.w*x.transmissionResolutionScale);let It=x.getRenderTarget(),St=x.getActiveCubeFace(),Gt=x.getActiveMipmapLevel();x.setRenderTarget(ht),x.getClearColor(k),H=x.getClearAlpha(),H<1&&x.setClearColor(16777215,.5),x.clear(),D&&Nt.render(W);let Xt=x.toneMapping;x.toneMapping=Sn;let kt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),zt===!0&&pt.setGlobalState(x.clippingPlanes,X),Vr(b,W,X),ft.updateMultisampleRenderTarget(ht),ft.updateRenderTargetMipmap(ht),ot.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let ue=0,Se=O.length;ue<Se;ue++){let _e=O[ue],fe=_e.object,Ht=_e.geometry,Me=_e.material,ne=_e.group;if(Me.side===Je&&fe.layers.test(X.layers)){let tn=Me.side;Me.side=Ae,Me.needsUpdate=!0,ph(fe,W,X,Ht,Me,ne),Me.side=tn,Me.needsUpdate=!0,te=!0}}te===!0&&(ft.updateMultisampleRenderTarget(ht),ft.updateRenderTargetMipmap(ht))}x.setRenderTarget(It,St,Gt),x.setClearColor(k,H),kt!==void 0&&(X.viewport=kt),x.toneMapping=Xt}function Vr(b,O,W){let X=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ht=b.length;B<ht;B++){let Mt=b[B],It=Mt.object,St=Mt.geometry,Gt=Mt.group,Xt=Mt.material;Xt.allowOverride===!0&&X!==null&&(Xt=X),It.layers.test(W.layers)&&ph(It,O,W,St,Xt,Gt)}}function ph(b,O,W,X,B,ht){b.onBeforeRender(x,O,W,X,B,ht),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(x,O,W,X,b,ht),B.transparent===!0&&B.side===Je&&B.forceSinglePass===!1?(B.side=Ae,B.needsUpdate=!0,x.renderBufferDirect(W,O,X,B,b,ht),B.side=on,B.needsUpdate=!0,x.renderBufferDirect(W,O,X,B,b,ht),B.side=Je):x.renderBufferDirect(W,O,X,B,b,ht),b.onAfterRender(x,O,W,X,B,ht)}function Gr(b,O,W){O.isScene!==!0&&(O=Rt);let X=nt.get(b),B=p.state.lights,ht=p.state.shadowsArray,Mt=B.state.version,It=J.getParameters(b,B.state,ht,O,W),St=J.getProgramCacheKey(It),Gt=X.programs;X.environment=b.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(b.isMeshStandardMaterial?Yt:Ot).get(b.envMap||X.environment),X.envMapRotation=X.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Gt===void 0&&(b.addEventListener("dispose",et),Gt=new Map,X.programs=Gt);let Xt=Gt.get(St);if(Xt!==void 0){if(X.currentProgram===Xt&&X.lightsStateVersion===Mt)return gh(b,It),Xt}else It.uniforms=J.getUniforms(b),b.onBeforeCompile(It,x),Xt=J.acquireProgram(It,St),Gt.set(St,Xt),X.uniforms=It.uniforms;let kt=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(kt.clippingPlanes=pt.uniform),gh(b,It),X.needsLights=Kd(b),X.lightsStateVersion=Mt,X.needsLights&&(kt.ambientLightColor.value=B.state.ambient,kt.lightProbe.value=B.state.probe,kt.directionalLights.value=B.state.directional,kt.directionalLightShadows.value=B.state.directionalShadow,kt.spotLights.value=B.state.spot,kt.spotLightShadows.value=B.state.spotShadow,kt.rectAreaLights.value=B.state.rectArea,kt.ltc_1.value=B.state.rectAreaLTC1,kt.ltc_2.value=B.state.rectAreaLTC2,kt.pointLights.value=B.state.point,kt.pointLightShadows.value=B.state.pointShadow,kt.hemisphereLights.value=B.state.hemi,kt.directionalShadowMap.value=B.state.directionalShadowMap,kt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,kt.spotShadowMap.value=B.state.spotShadowMap,kt.spotLightMatrix.value=B.state.spotLightMatrix,kt.spotLightMap.value=B.state.spotLightMap,kt.pointShadowMap.value=B.state.pointShadowMap,kt.pointShadowMatrix.value=B.state.pointShadowMatrix),X.currentProgram=Xt,X.uniformsList=null,Xt}function mh(b){if(b.uniformsList===null){let O=b.currentProgram.getUniforms();b.uniformsList=Bs.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function gh(b,O){let W=nt.get(b);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function Zd(b,O,W,X,B){O.isScene!==!0&&(O=Rt),ft.resetTextureUnits();let ht=O.fog,Mt=X.isMeshStandardMaterial?O.environment:null,It=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Li,St=(X.isMeshStandardMaterial?Yt:Ot).get(X.envMap||Mt),Gt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Xt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),kt=!!W.morphAttributes.position,te=!!W.morphAttributes.normal,ue=!!W.morphAttributes.color,Se=Sn;X.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Se=x.toneMapping);let _e=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,fe=_e!==void 0?_e.length:0,Ht=nt.get(X),Me=p.state.lights;if(zt===!0&&(Y===!0||b!==v)){let We=b===v&&X.id===M;pt.setState(X,b,We)}let ne=!1;X.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==Me.state.version||Ht.outputColorSpace!==It||B.isBatchedMesh&&Ht.batching===!1||!B.isBatchedMesh&&Ht.batching===!0||B.isBatchedMesh&&Ht.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ht.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ht.instancing===!1||!B.isInstancedMesh&&Ht.instancing===!0||B.isSkinnedMesh&&Ht.skinning===!1||!B.isSkinnedMesh&&Ht.skinning===!0||B.isInstancedMesh&&Ht.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ht.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ht.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ht.instancingMorph===!1&&B.morphTexture!==null||Ht.envMap!==St||X.fog===!0&&Ht.fog!==ht||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==pt.numPlanes||Ht.numIntersection!==pt.numIntersection)||Ht.vertexAlphas!==Gt||Ht.vertexTangents!==Xt||Ht.morphTargets!==kt||Ht.morphNormals!==te||Ht.morphColors!==ue||Ht.toneMapping!==Se||Ht.morphTargetsCount!==fe)&&(ne=!0):(ne=!0,Ht.__version=X.version);let tn=Ht.currentProgram;ne===!0&&(tn=Gr(X,O,B));let ji=!1,en=!1,Zs=!1,be=tn.getUniforms(),un=Ht.uniforms;if(Q.useProgram(tn.program)&&(ji=!0,en=!0,Zs=!0),X.id!==M&&(M=X.id,en=!0),ji||v!==b){Q.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),be.setValue(S,"projectionMatrix",b.projectionMatrix),be.setValue(S,"viewMatrix",b.matrixWorldInverse);let Ze=be.map.cameraPosition;Ze!==void 0&&Ze.setValue(S,yt.setFromMatrixPosition(b.matrixWorld)),wt.logarithmicDepthBuffer&&be.setValue(S,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&be.setValue(S,"isOrthographic",b.isOrthographicCamera===!0),v!==b&&(v=b,en=!0,Zs=!0)}if(B.isSkinnedMesh){be.setOptional(S,B,"bindMatrix"),be.setOptional(S,B,"bindMatrixInverse");let We=B.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),be.setValue(S,"boneTexture",We.boneTexture,ft))}B.isBatchedMesh&&(be.setOptional(S,B,"batchingTexture"),be.setValue(S,"batchingTexture",B._matricesTexture,ft),be.setOptional(S,B,"batchingIdTexture"),be.setValue(S,"batchingIdTexture",B._indirectTexture,ft),be.setOptional(S,B,"batchingColorTexture"),B._colorsTexture!==null&&be.setValue(S,"batchingColorTexture",B._colorsTexture,ft));let dn=W.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&ut.update(B,W,tn),(en||Ht.receiveShadow!==B.receiveShadow)&&(Ht.receiveShadow=B.receiveShadow,be.setValue(S,"receiveShadow",B.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(un.envMap.value=St,un.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(un.envMapIntensity.value=O.environmentIntensity),en&&(be.setValue(S,"toneMappingExposure",x.toneMappingExposure),Ht.needsLights&&$d(un,Zs),ht&&X.fog===!0&&it.refreshFogUniforms(un,ht),it.refreshMaterialUniforms(un,X,G,j,p.state.transmissionRenderTarget[b.id]),Bs.upload(S,mh(Ht),un,ft)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Bs.upload(S,mh(Ht),un,ft),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&be.setValue(S,"center",B.center),be.setValue(S,"modelViewMatrix",B.modelViewMatrix),be.setValue(S,"normalMatrix",B.normalMatrix),be.setValue(S,"modelMatrix",B.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){let We=X.uniformsGroups;for(let Ze=0,nc=We.length;Ze<nc;Ze++){let Mi=We[Ze];Kt.update(Mi,tn),Kt.bind(Mi,tn)}}return tn}function $d(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function Kd(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,O,W){let X=nt.get(b);X.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),nt.get(b.texture).__webglTexture=O,nt.get(b.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:W,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){let W=nt.get(b);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0};let Jd=S.createFramebuffer();this.setRenderTarget=function(b,O=0,W=0){P=b,E=O,R=W;let X=!0,B=null,ht=!1,Mt=!1;if(b){let St=nt.get(b);if(St.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(S.FRAMEBUFFER,null),X=!1;else if(St.__webglFramebuffer===void 0)ft.setupRenderTarget(b);else if(St.__hasExternalTextures)ft.rebindTextures(b,nt.get(b.texture).__webglTexture,nt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let kt=b.depthTexture;if(St.__boundDepthTexture!==kt){if(kt!==null&&nt.has(kt)&&(b.width!==kt.image.width||b.height!==kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ft.setupDepthRenderbuffer(b)}}let Gt=b.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(Mt=!0);let Xt=nt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Xt[O])?B=Xt[O][W]:B=Xt[O],ht=!0):b.samples>0&&ft.useMultisampledRTT(b)===!1?B=nt.get(b).__webglMultisampledFramebuffer:Array.isArray(Xt)?B=Xt[W]:B=Xt,I.copy(b.viewport),L.copy(b.scissor),N=b.scissorTest}else I.copy(_t).multiplyScalar(G).floor(),L.copy(q).multiplyScalar(G).floor(),N=Dt;if(W!==0&&(B=Jd),Q.bindFramebuffer(S.FRAMEBUFFER,B)&&X&&Q.drawBuffers(b,B),Q.viewport(I),Q.scissor(L),Q.setScissorTest(N),ht){let St=nt.get(b.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+O,St.__webglTexture,W)}else if(Mt){let St=O;for(let Gt=0;Gt<b.textures.length;Gt++){let Xt=nt.get(b.textures[Gt]);S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0+Gt,Xt.__webglTexture,W,St)}}else if(b!==null&&W!==0){let St=nt.get(b.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,St.__webglTexture,W)}M=-1},this.readRenderTargetPixels=function(b,O,W,X,B,ht,Mt,It=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=nt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Mt!==void 0&&(St=St[Mt]),St){Q.bindFramebuffer(S.FRAMEBUFFER,St);try{let Gt=b.textures[It],Xt=Gt.format,kt=Gt.type;if(!wt.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!wt.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-X&&W>=0&&W<=b.height-B&&(b.textures.length>1&&S.readBuffer(S.COLOR_ATTACHMENT0+It),S.readPixels(O,W,X,B,Ft.convert(Xt),Ft.convert(kt),ht))}finally{let Gt=P!==null?nt.get(P).__webglFramebuffer:null;Q.bindFramebuffer(S.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(b,O,W,X,B,ht,Mt,It=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=nt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Mt!==void 0&&(St=St[Mt]),St)if(O>=0&&O<=b.width-X&&W>=0&&W<=b.height-B){Q.bindFramebuffer(S.FRAMEBUFFER,St);let Gt=b.textures[It],Xt=Gt.format,kt=Gt.type;if(!wt.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!wt.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let te=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,te),S.bufferData(S.PIXEL_PACK_BUFFER,ht.byteLength,S.STREAM_READ),b.textures.length>1&&S.readBuffer(S.COLOR_ATTACHMENT0+It),S.readPixels(O,W,X,B,Ft.convert(Xt),Ft.convert(kt),0);let ue=P!==null?nt.get(P).__webglFramebuffer:null;Q.bindFramebuffer(S.FRAMEBUFFER,ue);let Se=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await Bu(S,Se,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,te),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,ht),S.deleteBuffer(te),S.deleteSync(Se),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,W=0){let X=Math.pow(2,-W),B=Math.floor(b.image.width*X),ht=Math.floor(b.image.height*X),Mt=O!==null?O.x:0,It=O!==null?O.y:0;ft.setTexture2D(b,0),S.copyTexSubImage2D(S.TEXTURE_2D,W,0,0,Mt,It,B,ht),Q.unbindTexture()};let jd=S.createFramebuffer(),Qd=S.createFramebuffer();this.copyTextureToTexture=function(b,O,W=null,X=null,B=0,ht=null){ht===null&&(B!==0?(bs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ht=B,B=0):ht=0);let Mt,It,St,Gt,Xt,kt,te,ue,Se,_e=b.isCompressedTexture?b.mipmaps[ht]:b.image;if(W!==null)Mt=W.max.x-W.min.x,It=W.max.y-W.min.y,St=W.isBox3?W.max.z-W.min.z:1,Gt=W.min.x,Xt=W.min.y,kt=W.isBox3?W.min.z:0;else{let dn=Math.pow(2,-B);Mt=Math.floor(_e.width*dn),It=Math.floor(_e.height*dn),b.isDataArrayTexture?St=_e.depth:b.isData3DTexture?St=Math.floor(_e.depth*dn):St=1,Gt=0,Xt=0,kt=0}X!==null?(te=X.x,ue=X.y,Se=X.z):(te=0,ue=0,Se=0);let fe=Ft.convert(O.format),Ht=Ft.convert(O.type),Me;O.isData3DTexture?(ft.setTexture3D(O,0),Me=S.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(ft.setTexture2DArray(O,0),Me=S.TEXTURE_2D_ARRAY):(ft.setTexture2D(O,0),Me=S.TEXTURE_2D),S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,O.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,O.unpackAlignment);let ne=S.getParameter(S.UNPACK_ROW_LENGTH),tn=S.getParameter(S.UNPACK_IMAGE_HEIGHT),ji=S.getParameter(S.UNPACK_SKIP_PIXELS),en=S.getParameter(S.UNPACK_SKIP_ROWS),Zs=S.getParameter(S.UNPACK_SKIP_IMAGES);S.pixelStorei(S.UNPACK_ROW_LENGTH,_e.width),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,_e.height),S.pixelStorei(S.UNPACK_SKIP_PIXELS,Gt),S.pixelStorei(S.UNPACK_SKIP_ROWS,Xt),S.pixelStorei(S.UNPACK_SKIP_IMAGES,kt);let be=b.isDataArrayTexture||b.isData3DTexture,un=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){let dn=nt.get(b),We=nt.get(O),Ze=nt.get(dn.__renderTarget),nc=nt.get(We.__renderTarget);Q.bindFramebuffer(S.READ_FRAMEBUFFER,Ze.__webglFramebuffer),Q.bindFramebuffer(S.DRAW_FRAMEBUFFER,nc.__webglFramebuffer);for(let Mi=0;Mi<St;Mi++)be&&(S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,nt.get(b).__webglTexture,B,kt+Mi),S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,nt.get(O).__webglTexture,ht,Se+Mi)),S.blitFramebuffer(Gt,Xt,Mt,It,te,ue,Mt,It,S.DEPTH_BUFFER_BIT,S.NEAREST);Q.bindFramebuffer(S.READ_FRAMEBUFFER,null),Q.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(B!==0||b.isRenderTargetTexture||nt.has(b)){let dn=nt.get(b),We=nt.get(O);Q.bindFramebuffer(S.READ_FRAMEBUFFER,jd),Q.bindFramebuffer(S.DRAW_FRAMEBUFFER,Qd);for(let Ze=0;Ze<St;Ze++)be?S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,dn.__webglTexture,B,kt+Ze):S.framebufferTexture2D(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,dn.__webglTexture,B),un?S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,We.__webglTexture,ht,Se+Ze):S.framebufferTexture2D(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,We.__webglTexture,ht),B!==0?S.blitFramebuffer(Gt,Xt,Mt,It,te,ue,Mt,It,S.COLOR_BUFFER_BIT,S.NEAREST):un?S.copyTexSubImage3D(Me,ht,te,ue,Se+Ze,Gt,Xt,Mt,It):S.copyTexSubImage2D(Me,ht,te,ue,Gt,Xt,Mt,It);Q.bindFramebuffer(S.READ_FRAMEBUFFER,null),Q.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else un?b.isDataTexture||b.isData3DTexture?S.texSubImage3D(Me,ht,te,ue,Se,Mt,It,St,fe,Ht,_e.data):O.isCompressedArrayTexture?S.compressedTexSubImage3D(Me,ht,te,ue,Se,Mt,It,St,fe,_e.data):S.texSubImage3D(Me,ht,te,ue,Se,Mt,It,St,fe,Ht,_e):b.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,ht,te,ue,Mt,It,fe,Ht,_e.data):b.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,ht,te,ue,_e.width,_e.height,fe,_e.data):S.texSubImage2D(S.TEXTURE_2D,ht,te,ue,Mt,It,fe,Ht,_e);S.pixelStorei(S.UNPACK_ROW_LENGTH,ne),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,tn),S.pixelStorei(S.UNPACK_SKIP_PIXELS,ji),S.pixelStorei(S.UNPACK_SKIP_ROWS,en),S.pixelStorei(S.UNPACK_SKIP_IMAGES,Zs),ht===0&&O.generateMipmaps&&S.generateMipmap(Me),Q.unbindTexture()},this.initRenderTarget=function(b){nt.get(b).__webglFramebuffer===void 0&&ft.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?ft.setTextureCube(b,0):b.isData3DTexture?ft.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?ft.setTexture2DArray(b,0):ft.setTexture2D(b,0),Q.unbindTexture()},this.resetState=function(){E=0,R=0,P=null,Q.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}};var _d={type:"change"},Rl={type:"start"},yd={type:"end"},Ua=new Di,xd=new pn,T_=Math.cos(70*Gi.DEG2RAD),Ie=new F,Qe=2*Math.PI,de={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Al=1e-6,Na=class extends Tr{constructor(t,e=null){super(t,e),this.state=de.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:gi.ROTATE,MIDDLE:gi.DOLLY,RIGHT:gi.PAN},this.touches={ONE:_i.ROTATE,TWO:_i.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new $e,this._lastTargetPosition=new F,this._quat=new $e().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Cs,this._sphericalDelta=new Cs,this._scale=1,this._panOffset=new F,this._rotateStart=new Vt,this._rotateEnd=new Vt,this._rotateDelta=new Vt,this._panStart=new Vt,this._panEnd=new Vt,this._panDelta=new Vt,this._dollyStart=new Vt,this._dollyEnd=new Vt,this._dollyDelta=new Vt,this._dollyDirection=new F,this._mouse=new Vt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=A_.bind(this),this._onPointerDown=E_.bind(this),this._onPointerUp=R_.bind(this),this._onContextMenu=N_.bind(this),this._onMouseWheel=P_.bind(this),this._onKeyDown=L_.bind(this),this._onTouchStart=D_.bind(this),this._onTouchMove=U_.bind(this),this._onMouseDown=C_.bind(this),this._onMouseMove=I_.bind(this),this._interceptControlDown=F_.bind(this),this._interceptControlUp=O_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(_d),this.update(),this.state=de.NONE}update(t=null){let e=this.object.position;Ie.copy(e).sub(this.target),Ie.applyQuaternion(this._quat),this._spherical.setFromVector3(Ie),this.autoRotate&&this.state===de.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Qe:n>Math.PI&&(n-=Qe),s<-Math.PI?s+=Qe:s>Math.PI&&(s-=Qe),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ie.setFromSpherical(this._spherical),Ie.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ie),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ie.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new F(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ie.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ua.origin.copy(this.object.position),Ua.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ua.direction))<T_?this.object.lookAt(this.target):(xd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ua.intersectPlane(xd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Al||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Al||this._lastTargetPosition.distanceToSquared(this.target)>Al?(this.dispatchEvent(_d),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Qe/60*this.autoRotateSpeed*t:Qe/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ie.setFromMatrixColumn(e,0),Ie.multiplyScalar(-t),this._panOffset.add(Ie)}_panUp(t,e){this.screenSpacePanning===!0?Ie.setFromMatrixColumn(e,1):(Ie.setFromMatrixColumn(e,0),Ie.crossVectors(this.object.up,Ie)),Ie.multiplyScalar(t),this._panOffset.add(Ie)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ie.copy(s).sub(this.target);let r=Ie.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Vt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function E_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function A_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function R_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(yd),this.state=de.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function C_(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case gi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=de.DOLLY;break;case gi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=de.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=de.ROTATE}break;case gi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=de.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=de.PAN}break;default:this.state=de.NONE}this.state!==de.NONE&&this.dispatchEvent(Rl)}function I_(i){switch(this.state){case de.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case de.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case de.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function P_(i){this.enabled===!1||this.enableZoom===!1||this.state!==de.NONE||(i.preventDefault(),this.dispatchEvent(Rl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(yd))}function L_(i){this.enabled!==!1&&this._handleKeyDown(i)}function D_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case _i.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=de.TOUCH_ROTATE;break;case _i.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=de.TOUCH_PAN;break;default:this.state=de.NONE}break;case 2:switch(this.touches.TWO){case _i.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=de.TOUCH_DOLLY_PAN;break;case _i.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=de.TOUCH_DOLLY_ROTATE;break;default:this.state=de.NONE}break;default:this.state=de.NONE}this.state!==de.NONE&&this.dispatchEvent(Rl)}function U_(i){switch(this._trackPointer(i),this.state){case de.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case de.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case de.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case de.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=de.NONE}}function N_(i){this.enabled!==!1&&i.preventDefault()}function F_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function O_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Fa=class extends Ln{constructor(){super();let t=new fi;t.deleteAttribute("uv");let e=new Dn({side:Ae}),n=new Dn,s=new Sr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ae(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new mr(t,n,6),a=new Ne;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new ae(t,Hs(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new ae(t,Hs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let d=new ae(t,Hs(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);let h=new ae(t,Hs(43));h.position.set(-.462,8.89,14.52),h.scale.set(4.38,5.441,.088),this.add(h);let u=new ae(t,Hs(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new ae(t,Hs(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function Hs(i){return new Fi({color:0,emissive:16777215,emissiveIntensity:i})}var vd={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},$i=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(t){return new Ll(t)}),this.register(function(t){return new Dl(t)}),this.register(function(t){return new Ol(t)}),this.register(function(t){return new Bl(t)}),this.register(function(t){return new kl(t)}),this.register(function(t){return new zl(t)}),this.register(function(t){return new Ul(t)}),this.register(function(t){return new Nl(t)}),this.register(function(t){return new Fl(t)}),this.register(function(t){return new Hl(t)}),this.register(function(t){return new Vl(t)}),this.register(function(t){return new Gl(t)}),this.register(function(t){return new Wl(t)}),this.register(function(t){return new Xl(t)})}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}setTextureUtils(t){return this.textureUtils=t,this}parse(t,e,n,s){let r=new Pl,o=[];for(let a=0,c=this.pluginCallbacks.length;a<c;a++)o.push(this.pluginCallbacks[a](r));r.setPlugins(o),r.setTextureUtils(this.textureUtils),r.writeAsync(t,e,s).catch(n)}parseAsync(t,e){let n=this;return new Promise(function(s,r){n.parse(t,s,r,e)})}},Qt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Cl="KHR_mesh_quantization",ln={};ln[ze]=Qt.NEAREST;ln[qo]=Qt.NEAREST_MIPMAP_NEAREST;ln[Vi]=Qt.NEAREST_MIPMAP_LINEAR;ln[an]=Qt.LINEAR;ln[Is]=Qt.LINEAR_MIPMAP_NEAREST;ln[Nn]=Qt.LINEAR_MIPMAP_LINEAR;ln[Cn]=Qt.CLAMP_TO_EDGE;ln[_s]=Qt.REPEAT;ln[xs]=Qt.MIRRORED_REPEAT;var Md={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},B_=new qt,bd=12,k_=1179937895,z_=2,Sd=8,H_=1313821514,V_=5130562;function Lr(i,t){return i.length===t.length&&i.every(function(e,n){return e===t[n]})}function G_(i){return new TextEncoder().encode(i).buffer}function W_(i){return Lr(i.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function X_(i,t,e){let n={min:new Array(i.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(i.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let s=t;s<t+e;s++)for(let r=0;r<i.itemSize;r++){let o;i.itemSize>4?o=i.array[s*i.itemSize+r]:(r===0?o=i.getX(s):r===1?o=i.getY(s):r===2?o=i.getZ(s):r===3&&(o=i.getW(s)),i.normalized===!0&&(o=Gi.normalize(o,i.array))),n.min[r]=Math.min(n.min[r],o),n.max[r]=Math.max(n.max[r],o)}return n}function Td(i){return Math.ceil(i/4)*4}function Il(i,t=0){let e=Td(i.byteLength);if(e!==i.byteLength){let n=new Uint8Array(e);if(n.set(new Uint8Array(i)),t!==0)for(let s=i.byteLength;s<e;s++)n[s]=t;return n.buffer}return i}function wd(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function q_(i,t){if(typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas){let e;return t==="image/jpeg"?e=.92:t==="image/webp"&&(e=.8),i.convertToBlob({type:t,quality:e})}else return new Promise(e=>i.toBlob(e,t))}var Pl=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r180"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(t){this.plugins=t}setTextureUtils(t){this.textureUtils=t}async writeAsync(t,e,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(t),await Promise.all(this.pending);let s=this,r=s.buffers,o=s.json;n=s.options;let a=s.extensionsUsed,c=s.extensionsRequired,l=new Blob(r,{type:"application/octet-stream"}),d=Object.keys(a),h=Object.keys(c);if(d.length>0&&(o.extensionsUsed=d),h.length>0&&(o.extensionsRequired=h),o.buffers&&o.buffers.length>0&&(o.buffers[0].byteLength=l.size),n.binary===!0){let u=new FileReader;u.readAsArrayBuffer(l),u.onloadend=function(){let f=Il(u.result),g=new DataView(new ArrayBuffer(Sd));g.setUint32(0,f.byteLength,!0),g.setUint32(4,V_,!0);let _=Il(G_(JSON.stringify(o)),32),m=new DataView(new ArrayBuffer(Sd));m.setUint32(0,_.byteLength,!0),m.setUint32(4,H_,!0);let p=new ArrayBuffer(bd),w=new DataView(p);w.setUint32(0,k_,!0),w.setUint32(4,z_,!0);let T=bd+m.byteLength+_.byteLength+g.byteLength+f.byteLength;w.setUint32(8,T,!0);let x=new Blob([p,m,_,g,f],{type:"application/octet-stream"}),A=new FileReader;A.readAsArrayBuffer(x),A.onloadend=function(){e(A.result)}}}else if(o.buffers&&o.buffers.length>0){let u=new FileReader;u.readAsDataURL(l),u.onloadend=function(){let f=u.result;o.buffers[0].uri=f,e(o)}}else e(o)}serializeUserData(t,e){if(Object.keys(t.userData).length===0)return;let n=this.options,s=this.extensionsUsed;try{let r=JSON.parse(JSON.stringify(t.userData));if(n.includeCustomExtensions&&r.gltfExtensions){e.extensions===void 0&&(e.extensions={});for(let o in r.gltfExtensions)e.extensions[o]=r.gltfExtensions[o],s[o]=!0;delete r.gltfExtensions}Object.keys(r).length>0&&(e.extras=r)}catch(r){console.warn("THREE.GLTFExporter: userData of '"+t.name+"' won't be serialized because of JSON.stringify error - "+r.message)}}getUID(t,e=!1){if(this.uids.has(t)===!1){let s=new Map;s.set(!0,this.uid++),s.set(!1,this.uid++),this.uids.set(t,s)}return this.uids.get(t).get(e)}isNormalizedNormalAttribute(t){if(this.cache.attributesNormalized.has(t))return!1;let n=new F;for(let s=0,r=t.count;s<r;s++)if(Math.abs(n.fromBufferAttribute(t,s).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(t){let e=this.cache;if(e.attributesNormalized.has(t))return e.attributesNormalized.get(t);let n=t.clone(),s=new F;for(let r=0,o=n.count;r<o;r++)s.fromBufferAttribute(n,r),s.x===0&&s.y===0&&s.z===0?s.setX(1):s.normalize(),n.setXYZ(r,s.x,s.y,s.z);return e.attributesNormalized.set(t,n),n}applyTextureTransform(t,e){let n=!1,s={};(e.offset.x!==0||e.offset.y!==0)&&(s.offset=e.offset.toArray(),n=!0),e.rotation!==0&&(s.rotation=e.rotation,n=!0),(e.repeat.x!==1||e.repeat.y!==1)&&(s.scale=e.repeat.toArray(),n=!0),n&&(t.extensions=t.extensions||{},t.extensions.KHR_texture_transform=s,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(t,e){if(t===e)return t;function n(f){return f.colorSpace===Ue?function(_){return _<.04045?_*.0773993808:Math.pow(_*.9478672986+.0521327014,2.4)}:function(_){return _}}t instanceof Ui&&(t=await this.decompressTextureAsync(t)),e instanceof Ui&&(e=await this.decompressTextureAsync(e));let s=t?t.image:null,r=e?e.image:null,o=Math.max(s?s.width:0,r?r.width:0),a=Math.max(s?s.height:0,r?r.height:0),c=wd();c.width=o,c.height=a;let l=c.getContext("2d",{willReadFrequently:!0});l.fillStyle="#00ffff",l.fillRect(0,0,o,a);let d=l.getImageData(0,0,o,a);if(s){l.drawImage(s,0,0,o,a);let f=n(t),g=l.getImageData(0,0,o,a).data;for(let _=2;_<g.length;_+=4)d.data[_]=f(g[_]/256)*256}if(r){l.drawImage(r,0,0,o,a);let f=n(e),g=l.getImageData(0,0,o,a).data;for(let _=1;_<g.length;_+=4)d.data[_]=f(g[_]/256)*256}l.putImageData(d,0,0);let u=(t||e).clone();return u.source=new ui(c),u.colorSpace=En,u.channel=(t||e).channel,t&&e&&t.channel!==e.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),u}async decompressTextureAsync(t,e=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(t,e)}processBuffer(t){let e=this.json,n=this.buffers;return e.buffers||(e.buffers=[{byteLength:0}]),n.push(t),0}processBufferView(t,e,n,s,r){let o=this.json;o.bufferViews||(o.bufferViews=[]);let a;switch(e){case Qt.BYTE:case Qt.UNSIGNED_BYTE:a=1;break;case Qt.SHORT:case Qt.UNSIGNED_SHORT:a=2;break;default:a=4}let c=t.itemSize*a;r===Qt.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);let l=Td(s*c),d=new DataView(new ArrayBuffer(l)),h=0;for(let g=n;g<n+s;g++){for(let _=0;_<t.itemSize;_++){let m;t.itemSize>4?m=t.array[g*t.itemSize+_]:(_===0?m=t.getX(g):_===1?m=t.getY(g):_===2?m=t.getZ(g):_===3&&(m=t.getW(g)),t.normalized===!0&&(m=Gi.normalize(m,t.array))),e===Qt.FLOAT?d.setFloat32(h,m,!0):e===Qt.INT?d.setInt32(h,m,!0):e===Qt.UNSIGNED_INT?d.setUint32(h,m,!0):e===Qt.SHORT?d.setInt16(h,m,!0):e===Qt.UNSIGNED_SHORT?d.setUint16(h,m,!0):e===Qt.BYTE?d.setInt8(h,m):e===Qt.UNSIGNED_BYTE&&d.setUint8(h,m),h+=a}h%c!==0&&(h+=c-h%c)}let u={buffer:this.processBuffer(d.buffer),byteOffset:this.byteOffset,byteLength:l};return r!==void 0&&(u.target=r),r===Qt.ARRAY_BUFFER&&(u.byteStride=c),this.byteOffset+=l,o.bufferViews.push(u),{id:o.bufferViews.length-1,byteLength:0}}processBufferViewImage(t){let e=this,n=e.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(s){let r=new FileReader;r.readAsArrayBuffer(t),r.onloadend=function(){let o=Il(r.result),a={buffer:e.processBuffer(o),byteOffset:e.byteOffset,byteLength:o.byteLength};e.byteOffset+=o.byteLength,s(n.bufferViews.push(a)-1)}})}processAccessor(t,e,n,s){let r=this.json,o={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},a;if(t.array.constructor===Float32Array)a=Qt.FLOAT;else if(t.array.constructor===Int32Array)a=Qt.INT;else if(t.array.constructor===Uint32Array)a=Qt.UNSIGNED_INT;else if(t.array.constructor===Int16Array)a=Qt.SHORT;else if(t.array.constructor===Uint16Array)a=Qt.UNSIGNED_SHORT;else if(t.array.constructor===Int8Array)a=Qt.BYTE;else if(t.array.constructor===Uint8Array)a=Qt.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+t.array.constructor.name);if(n===void 0&&(n=0),(s===void 0||s===1/0)&&(s=t.count),s===0)return null;let c=X_(t,n,s),l;e!==void 0&&(l=t===e.index?Qt.ELEMENT_ARRAY_BUFFER:Qt.ARRAY_BUFFER);let d=this.processBufferView(t,a,n,s,l),h={bufferView:d.id,byteOffset:d.byteOffset,componentType:a,count:s,max:c.max,min:c.min,type:o[t.itemSize]};return t.normalized===!0&&(h.normalized=!0),r.accessors||(r.accessors=[]),r.accessors.push(h)-1}processImage(t,e,n,s="image/png"){if(t!==null){let r=this,o=r.cache,a=r.json,c=r.options,l=r.pending;o.images.has(t)||o.images.set(t,{});let d=o.images.get(t),h=s+":flipY/"+n.toString();if(d[h]!==void 0)return d[h];a.images||(a.images=[]);let u={mimeType:s},f=wd();f.width=Math.min(t.width,c.maxTextureSize),f.height=Math.min(t.height,c.maxTextureSize);let g=f.getContext("2d",{willReadFrequently:!0});if(n===!0&&(g.translate(0,f.height),g.scale(1,-1)),t.data!==void 0){e!==je&&console.error("GLTFExporter: Only RGBAFormat is supported.",e),(t.width>c.maxTextureSize||t.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",t);let m=new Uint8ClampedArray(t.height*t.width*4);for(let p=0;p<m.length;p+=4)m[p+0]=t.data[p+0],m[p+1]=t.data[p+1],m[p+2]=t.data[p+2],m[p+3]=t.data[p+3];g.putImageData(new ImageData(m,t.width,t.height),0,0)}else if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas)g.drawImage(t,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?l.push(q_(f,s).then(m=>r.processBufferViewImage(m)).then(m=>{u.bufferView=m})):u.uri=Ss.getDataURL(f,s);let _=a.images.push(u)-1;return d[h]=_,_}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(t){let e=this.json;e.samplers||(e.samplers=[]);let n={magFilter:ln[t.magFilter],minFilter:ln[t.minFilter],wrapS:ln[t.wrapS],wrapT:ln[t.wrapT]};return e.samplers.push(n)-1}async processTextureAsync(t){let n=this.options,s=this.cache,r=this.json;if(s.textures.has(t))return s.textures.get(t);r.textures||(r.textures=[]),t instanceof Ui&&(t=await this.decompressTextureAsync(t,n.maxTextureSize));let o=t.userData.mimeType;o==="image/webp"&&(o="image/png");let a={sampler:this.processSampler(t),source:this.processImage(t.image,t.format,t.flipY,o)};t.name&&(a.name=t.name),await this._invokeAllAsync(async function(l){l.writeTexture&&await l.writeTexture(t,a)});let c=r.textures.push(a)-1;return s.textures.set(t,c),c}async processMaterialAsync(t){let e=this.cache,n=this.json;if(e.materials.has(t))return e.materials.get(t);if(t.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;n.materials||(n.materials=[]);let s={pbrMetallicRoughness:{}};t.isMeshStandardMaterial!==!0&&t.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let r=t.color.toArray().concat([t.opacity]);if(Lr(r,[1,1,1,1])||(s.pbrMetallicRoughness.baseColorFactor=r),t.isMeshStandardMaterial?(s.pbrMetallicRoughness.metallicFactor=t.metalness,s.pbrMetallicRoughness.roughnessFactor=t.roughness):(s.pbrMetallicRoughness.metallicFactor=0,s.pbrMetallicRoughness.roughnessFactor=1),t.metalnessMap||t.roughnessMap){let a=await this.buildMetalRoughTextureAsync(t.metalnessMap,t.roughnessMap),c={index:await this.processTextureAsync(a),texCoord:a.channel};this.applyTextureTransform(c,a),s.pbrMetallicRoughness.metallicRoughnessTexture=c}if(t.map){let a={index:await this.processTextureAsync(t.map),texCoord:t.map.channel};this.applyTextureTransform(a,t.map),s.pbrMetallicRoughness.baseColorTexture=a}if(t.emissive){let a=t.emissive;if(Math.max(a.r,a.g,a.b)>0&&(s.emissiveFactor=t.emissive.toArray()),t.emissiveMap){let l={index:await this.processTextureAsync(t.emissiveMap),texCoord:t.emissiveMap.channel};this.applyTextureTransform(l,t.emissiveMap),s.emissiveTexture=l}}if(t.normalMap){let a={index:await this.processTextureAsync(t.normalMap),texCoord:t.normalMap.channel};t.normalScale&&t.normalScale.x!==1&&(a.scale=t.normalScale.x),this.applyTextureTransform(a,t.normalMap),s.normalTexture=a}if(t.aoMap){let a={index:await this.processTextureAsync(t.aoMap),texCoord:t.aoMap.channel};t.aoMapIntensity!==1&&(a.strength=t.aoMapIntensity),this.applyTextureTransform(a,t.aoMap),s.occlusionTexture=a}t.transparent?s.alphaMode="BLEND":t.alphaTest>0&&(s.alphaMode="MASK",s.alphaCutoff=t.alphaTest),t.side===Je&&(s.doubleSided=!0),t.name!==""&&(s.name=t.name),this.serializeUserData(t,s),await this._invokeAllAsync(async function(a){a.writeMaterialAsync&&await a.writeMaterialAsync(t,s)});let o=n.materials.push(s)-1;return e.materials.set(t,o),o}async processMeshAsync(t){let e=this.cache,n=this.json,s=[t.geometry.uuid];if(Array.isArray(t.material))for(let x=0,A=t.material.length;x<A;x++)s.push(t.material[x].uuid);else s.push(t.material.uuid);let r=s.join(":");if(e.meshes.has(r))return e.meshes.get(r);let o=t.geometry,a;t.isLineSegments?a=Qt.LINES:t.isLineLoop?a=Qt.LINE_LOOP:t.isLine?a=Qt.LINE_STRIP:t.isPoints?a=Qt.POINTS:a=t.material.wireframe?Qt.LINES:Qt.TRIANGLES;let c={},l={},d=[],h=[],u={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=o.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),o.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let g=null;for(let x in o.attributes){if(x.slice(0,5)==="morph")continue;let A=o.attributes[x];if(x=u[x]||x.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(x)||(x="_"+x),e.attributes.has(this.getUID(A))){l[x]=e.attributes.get(this.getUID(A));continue}g=null;let R=A.array;x==="JOINTS_0"&&!(R instanceof Uint16Array)&&!(R instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),g=new xe(new Uint16Array(R),A.itemSize,A.normalized)):(R instanceof Uint32Array||R instanceof Int32Array)&&!x.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${x}" converted to type FLOAT.`),g=$i.Utils.toFloat32BufferAttribute(A));let P=this.processAccessor(g||A,o);P!==null&&(x.startsWith("_")||this.detectMeshQuantization(x,A),l[x]=P,e.attributes.set(this.getUID(A),P))}if(f!==void 0&&o.setAttribute("normal",f),Object.keys(l).length===0)return null;if(t.morphTargetInfluences!==void 0&&t.morphTargetInfluences.length>0){let x=[],A=[],E={};if(t.morphTargetDictionary!==void 0)for(let R in t.morphTargetDictionary)E[t.morphTargetDictionary[R]]=R;for(let R=0;R<t.morphTargetInfluences.length;++R){let P={},M=!1;for(let v in o.morphAttributes){if(v!=="position"&&v!=="normal"){M||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),M=!0);continue}let I=o.morphAttributes[v][R],L=v.toUpperCase(),N=o.attributes[v];if(e.attributes.has(this.getUID(I,!0))){P[L]=e.attributes.get(this.getUID(I,!0));continue}let k=I.clone();if(!o.morphTargetsRelative)for(let H=0,V=I.count;H<V;H++)for(let j=0;j<I.itemSize;j++)j===0&&k.setX(H,I.getX(H)-N.getX(H)),j===1&&k.setY(H,I.getY(H)-N.getY(H)),j===2&&k.setZ(H,I.getZ(H)-N.getZ(H)),j===3&&k.setW(H,I.getW(H)-N.getW(H));P[L]=this.processAccessor(k,o),e.attributes.set(this.getUID(N,!0),P[L])}h.push(P),x.push(t.morphTargetInfluences[R]),t.morphTargetDictionary!==void 0&&A.push(E[R])}c.weights=x,A.length>0&&(c.extras={},c.extras.targetNames=A)}let _=Array.isArray(t.material);if(_&&o.groups.length===0)return null;let m=!1;if(_&&o.index===null){let x=[];for(let A=0,E=o.attributes.position.count;A<E;A++)x[A]=A;o.setIndex(x),m=!0}let p=_?t.material:[t.material],w=_?o.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let x=0,A=w.length;x<A;x++){let E={mode:a,attributes:l};if(this.serializeUserData(o,E),h.length>0&&(E.targets=h),o.index!==null){let P=this.getUID(o.index);(w[x].start!==void 0||w[x].count!==void 0)&&(P+=":"+w[x].start+":"+w[x].count),e.attributes.has(P)?E.indices=e.attributes.get(P):(E.indices=this.processAccessor(o.index,o,w[x].start,w[x].count),e.attributes.set(P,E.indices)),E.indices===null&&delete E.indices}let R=await this.processMaterialAsync(p[w[x].materialIndex]);R!==null&&(E.material=R),d.push(E)}m===!0&&o.setIndex(null),c.primitives=d,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(x){x.writeMesh&&x.writeMesh(t,c)});let T=n.meshes.push(c)-1;return e.meshes.set(r,T),T}detectMeshQuantization(t,e){if(this.extensionsUsed[Cl])return;let n;switch(e.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}e.normalized&&(n+=" normalized");let s=t.split("_",1)[0];vd[s]&&vd[s].includes(n)&&(this.extensionsUsed[Cl]=!0,this.extensionsRequired[Cl]=!0)}processCamera(t){let e=this.json;e.cameras||(e.cameras=[]);let n=t.isOrthographicCamera,s={type:n?"orthographic":"perspective"};return n?s.orthographic={xmag:t.right*2,ymag:t.top*2,zfar:t.far<=0?.001:t.far,znear:t.near<0?0:t.near}:s.perspective={aspectRatio:t.aspect,yfov:Gi.degToRad(t.fov),zfar:t.far<=0?.001:t.far,znear:t.near<0?0:t.near},t.name!==""&&(s.name=t.type),e.cameras.push(s)-1}processAnimation(t,e){let n=this.json,s=this.nodeMap;n.animations||(n.animations=[]),t=$i.Utils.mergeMorphTargetTracks(t.clone(),e);let r=t.tracks,o=[],a=[];for(let l=0;l<r.length;++l){let d=r[l],h=oe.parseTrackName(d.name),u=oe.findNode(e,h.nodeName),f=Md[h.propertyName];if(h.objectName==="bones"&&(u.isSkinnedMesh===!0?u=u.skeleton.getBoneByName(h.objectIndex):u=void 0),!u||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',d.name);continue}let g=1,_=d.values.length/d.times.length;f===Md.morphTargetInfluences&&(_/=u.morphTargetInfluences.length);let m;d.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(m="CUBICSPLINE",_/=3):d.getInterpolation()===Pi?m="STEP":m="LINEAR",a.push({input:this.processAccessor(new xe(d.times,g)),output:this.processAccessor(new xe(d.values,_)),interpolation:m}),o.push({sampler:a.length-1,target:{node:s.get(u),path:f}})}let c={name:t.name||"clip_"+n.animations.length,samplers:a,channels:o};return this.serializeUserData(t,c),n.animations.push(c),n.animations.length-1}processSkin(t){let e=this.json,n=this.nodeMap,s=e.nodes[n.get(t)],r=t.skeleton;if(r===void 0)return null;let o=t.skeleton.bones[0];if(o===void 0)return null;let a=[],c=new Float32Array(r.bones.length*16),l=new he;for(let h=0;h<r.bones.length;++h)a.push(n.get(r.bones[h])),l.copy(r.boneInverses[h]),l.multiply(t.bindMatrix).toArray(c,h*16);return e.skins===void 0&&(e.skins=[]),e.skins.push({inverseBindMatrices:this.processAccessor(new xe(c,16)),joints:a,skeleton:n.get(o)}),s.skin=e.skins.length-1}async processNodeAsync(t){let e=this.json,n=this.options,s=this.nodeMap;e.nodes||(e.nodes=[]);let r={};if(n.trs){let a=t.quaternion.toArray(),c=t.position.toArray(),l=t.scale.toArray();Lr(a,[0,0,0,1])||(r.rotation=a),Lr(c,[0,0,0])||(r.translation=c),Lr(l,[1,1,1])||(r.scale=l)}else t.matrixAutoUpdate&&t.updateMatrix(),W_(t.matrix)===!1&&(r.matrix=t.matrix.elements);if(t.name!==""&&(r.name=String(t.name)),this.serializeUserData(t,r),t.isMesh||t.isLine||t.isPoints){let a=await this.processMeshAsync(t);a!==null&&(r.mesh=a)}else t.isCamera&&(r.camera=this.processCamera(t));t.isSkinnedMesh&&this.skins.push(t);let o=e.nodes.push(r)-1;if(s.set(t,o),t.children.length>0){let a=[];for(let c=0,l=t.children.length;c<l;c++){let d=t.children[c];if(d.visible||n.onlyVisible===!1){let h=await this.processNodeAsync(d);h!==null&&a.push(h)}}a.length>0&&(r.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(t,r)}),o}async processSceneAsync(t){let e=this.json,n=this.options;e.scenes||(e.scenes=[],e.scene=0);let s={};t.name!==""&&(s.name=t.name),e.scenes.push(s);let r=[];for(let o=0,a=t.children.length;o<a;o++){let c=t.children[o];if(c.visible||n.onlyVisible===!1){let l=await this.processNodeAsync(c);l!==null&&r.push(l)}}r.length>0&&(s.nodes=r),this.serializeUserData(t,s)}async processObjectsAsync(t){let e=new Ln;e.name="AuxScene";for(let n=0;n<t.length;n++)e.children.push(t[n]);await this.processSceneAsync(e)}async processInputAsync(t){let e=this.options;t=t instanceof Array?t:[t],await this._invokeAllAsync(function(s){s.beforeParse&&s.beforeParse(t)});let n=[];for(let s=0;s<t.length;s++)t[s]instanceof Ln?await this.processSceneAsync(t[s]):n.push(t[s]);n.length>0&&await this.processObjectsAsync(n);for(let s=0;s<this.skins.length;++s)this.processSkin(this.skins[s]);for(let s=0;s<e.animations.length;++s)this.processAnimation(e.animations[s],t[0]);await this._invokeAllAsync(function(s){s.afterParse&&s.afterParse(t)})}async _invokeAllAsync(t){for(let e=0,n=this.plugins.length;e<n;e++)await t(this.plugins[e])}},Ll=class{constructor(t){this.writer=t,this.name="KHR_lights_punctual"}writeNode(t,e){if(!t.isLight)return;if(!t.isDirectionalLight&&!t.isPointLight&&!t.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",t);return}let n=this.writer,s=n.json,r=n.extensionsUsed,o={};t.name&&(o.name=t.name),o.color=t.color.toArray(),o.intensity=t.intensity,t.isDirectionalLight?o.type="directional":t.isPointLight?(o.type="point",t.distance>0&&(o.range=t.distance)):t.isSpotLight&&(o.type="spot",t.distance>0&&(o.range=t.distance),o.spot={},o.spot.innerConeAngle=(1-t.penumbra)*t.angle,o.spot.outerConeAngle=t.angle),t.decay!==void 0&&t.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),t.target&&(t.target.parent!==t||t.target.position.x!==0||t.target.position.y!==0||t.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),r[this.name]||(s.extensions=s.extensions||{},s.extensions[this.name]={lights:[]},r[this.name]=!0);let a=s.extensions[this.name].lights;a.push(o),e.extensions=e.extensions||{},e.extensions[this.name]={light:a.length-1}}},Dl=class{constructor(t){this.writer=t,this.name="KHR_materials_unlit"}async writeMaterialAsync(t,e){if(!t.isMeshBasicMaterial)return;let s=this.writer.extensionsUsed;e.extensions=e.extensions||{},e.extensions[this.name]={},s[this.name]=!0,e.pbrMetallicRoughness.metallicFactor=0,e.pbrMetallicRoughness.roughnessFactor=.9}},Ul=class{constructor(t){this.writer=t,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.clearcoat===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.clearcoatFactor=t.clearcoat,t.clearcoatMap){let o={index:await n.processTextureAsync(t.clearcoatMap),texCoord:t.clearcoatMap.channel};n.applyTextureTransform(o,t.clearcoatMap),r.clearcoatTexture=o}if(r.clearcoatRoughnessFactor=t.clearcoatRoughness,t.clearcoatRoughnessMap){let o={index:await n.processTextureAsync(t.clearcoatRoughnessMap),texCoord:t.clearcoatRoughnessMap.channel};n.applyTextureTransform(o,t.clearcoatRoughnessMap),r.clearcoatRoughnessTexture=o}if(t.clearcoatNormalMap){let o={index:await n.processTextureAsync(t.clearcoatNormalMap),texCoord:t.clearcoatNormalMap.channel};t.clearcoatNormalScale.x!==1&&(o.scale=t.clearcoatNormalScale.x),n.applyTextureTransform(o,t.clearcoatNormalMap),r.clearcoatNormalTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Nl=class{constructor(t){this.writer=t,this.name="KHR_materials_dispersion"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.dispersion===0)return;let s=this.writer.extensionsUsed,r={};r.dispersion=t.dispersion,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Fl=class{constructor(t){this.writer=t,this.name="KHR_materials_iridescence"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.iridescence===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.iridescenceFactor=t.iridescence,t.iridescenceMap){let o={index:await n.processTextureAsync(t.iridescenceMap),texCoord:t.iridescenceMap.channel};n.applyTextureTransform(o,t.iridescenceMap),r.iridescenceTexture=o}if(r.iridescenceIor=t.iridescenceIOR,r.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1],t.iridescenceThicknessMap){let o={index:await n.processTextureAsync(t.iridescenceThicknessMap),texCoord:t.iridescenceThicknessMap.channel};n.applyTextureTransform(o,t.iridescenceThicknessMap),r.iridescenceThicknessTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Ol=class{constructor(t){this.writer=t,this.name="KHR_materials_transmission"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.transmissionFactor=t.transmission,t.transmissionMap){let o={index:await n.processTextureAsync(t.transmissionMap),texCoord:t.transmissionMap.channel};n.applyTextureTransform(o,t.transmissionMap),r.transmissionTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Bl=class{constructor(t){this.writer=t,this.name="KHR_materials_volume"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.thicknessFactor=t.thickness,t.thicknessMap){let o={index:await n.processTextureAsync(t.thicknessMap),texCoord:t.thicknessMap.channel};n.applyTextureTransform(o,t.thicknessMap),r.thicknessTexture=o}t.attenuationDistance!==1/0&&(r.attenuationDistance=t.attenuationDistance),r.attenuationColor=t.attenuationColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},kl=class{constructor(t){this.writer=t,this.name="KHR_materials_ior"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.ior===1.5)return;let s=this.writer.extensionsUsed,r={};r.ior=t.ior,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},zl=class{constructor(t){this.writer=t,this.name="KHR_materials_specular"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.specularIntensity===1&&t.specularColor.equals(B_)&&!t.specularIntensityMap&&!t.specularColorMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.specularIntensityMap){let o={index:await n.processTextureAsync(t.specularIntensityMap),texCoord:t.specularIntensityMap.channel};n.applyTextureTransform(o,t.specularIntensityMap),r.specularTexture=o}if(t.specularColorMap){let o={index:await n.processTextureAsync(t.specularColorMap),texCoord:t.specularColorMap.channel};n.applyTextureTransform(o,t.specularColorMap),r.specularColorTexture=o}r.specularFactor=t.specularIntensity,r.specularColorFactor=t.specularColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Hl=class{constructor(t){this.writer=t,this.name="KHR_materials_sheen"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.sheen==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.sheenRoughnessMap){let o={index:await n.processTextureAsync(t.sheenRoughnessMap),texCoord:t.sheenRoughnessMap.channel};n.applyTextureTransform(o,t.sheenRoughnessMap),r.sheenRoughnessTexture=o}if(t.sheenColorMap){let o={index:await n.processTextureAsync(t.sheenColorMap),texCoord:t.sheenColorMap.channel};n.applyTextureTransform(o,t.sheenColorMap),r.sheenColorTexture=o}r.sheenRoughnessFactor=t.sheenRoughness,r.sheenColorFactor=t.sheenColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Vl=class{constructor(t){this.writer=t,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.anisotropy==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.anisotropyMap){let o={index:await n.processTextureAsync(t.anisotropyMap)};n.applyTextureTransform(o,t.anisotropyMap),r.anisotropyTexture=o}r.anisotropyStrength=t.anisotropy,r.anisotropyRotation=t.anisotropyRotation,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Gl=class{constructor(t){this.writer=t,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(t,e){if(!t.isMeshStandardMaterial||t.emissiveIntensity===1)return;let s=this.writer.extensionsUsed,r={};r.emissiveStrength=t.emissiveIntensity,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Wl=class{constructor(t){this.writer=t,this.name="EXT_materials_bump"}async writeMaterialAsync(t,e){if(!t.isMeshStandardMaterial||t.bumpScale===1&&!t.bumpMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.bumpMap){let o={index:await n.processTextureAsync(t.bumpMap),texCoord:t.bumpMap.channel};n.applyTextureTransform(o,t.bumpMap),r.bumpTexture=o}r.bumpFactor=t.bumpScale,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Xl=class{constructor(t){this.writer=t,this.name="EXT_mesh_gpu_instancing"}writeNode(t,e){if(!t.isInstancedMesh)return;let n=this.writer,s=t,r=new Float32Array(s.count*3),o=new Float32Array(s.count*4),a=new Float32Array(s.count*3),c=new he,l=new F,d=new $e,h=new F;for(let f=0;f<s.count;f++)s.getMatrixAt(f,c),c.decompose(l,d,h),l.toArray(r,f*3),d.toArray(o,f*4),h.toArray(a,f*3);let u={TRANSLATION:n.processAccessor(new xe(r,3)),ROTATION:n.processAccessor(new xe(o,4)),SCALE:n.processAccessor(new xe(a,3))};s.instanceColor&&(u._COLOR_0=n.processAccessor(s.instanceColor)),e.extensions=e.extensions||{},e.extensions[this.name]={attributes:u},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};$i.Utils={insertKeyframe:function(i,t){let n=i.getValueSize(),s=new i.TimeBufferType(i.times.length+1),r=new i.ValueBufferType(i.values.length+n),o=i.createInterpolant(new i.ValueBufferType(n)),a;if(i.times.length===0){s[0]=t;for(let c=0;c<n;c++)r[c]=0;a=0}else if(t<i.times[0]){if(Math.abs(i.times[0]-t)<.001)return 0;s[0]=t,s.set(i.times,1),r.set(o.evaluate(t),0),r.set(i.values,n),a=0}else if(t>i.times[i.times.length-1]){if(Math.abs(i.times[i.times.length-1]-t)<.001)return i.times.length-1;s[s.length-1]=t,s.set(i.times,0),r.set(i.values,0),r.set(o.evaluate(t),i.values.length),a=s.length-1}else for(let c=0;c<i.times.length;c++){if(Math.abs(i.times[c]-t)<.001)return c;if(i.times[c]<t&&i.times[c+1]>t){s.set(i.times.slice(0,c+1),0),s[c+1]=t,s.set(i.times.slice(c+1),c+2),r.set(i.values.slice(0,(c+1)*n),0),r.set(o.evaluate(t),(c+1)*n),r.set(i.values.slice((c+1)*n),(c+2)*n),a=c+1;break}}return i.times=s,i.values=r,a},mergeMorphTargetTracks:function(i,t){let e=[],n={},s=i.tracks;for(let r=0;r<s.length;++r){let o=s[r],a=oe.parseTrackName(o.name),c=oe.findNode(t,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){e.push(o);continue}if(o.createInterpolant!==o.InterpolantFactoryMethodDiscrete&&o.createInterpolant!==o.InterpolantFactoryMethodLinear){if(o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),o=o.clone(),o.setInterpolation(vs)}let l=c.morphTargetInfluences.length,d=c.morphTargetDictionary[a.propertyIndex];if(d===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let h;if(n[c.uuid]===void 0){h=o.clone();let f=new h.ValueBufferType(l*h.times.length);for(let g=0;g<h.times.length;g++)f[g*l+d]=h.values[g];h.name=(a.nodeName||"")+".morphTargetInfluences",h.values=f,n[c.uuid]=h,e.push(h);continue}let u=o.createInterpolant(new o.ValueBufferType(1));h=n[c.uuid];for(let f=0;f<h.times.length;f++)h.values[f*l+d]=u.evaluate(h.times[f]);for(let f=0;f<o.times.length;f++){let g=this.insertKeyframe(h,o.times[f]);h.values[g*l+d]=o.values[f]}}return i.tracks=e,i},toFloat32BufferAttribute:function(i){let t=new xe(new Float32Array(i.count*i.itemSize),i.itemSize,!1);if(!i.normalized&&!i.isInterleavedBufferAttribute)return t.array.set(i.array),t;for(let e=0,n=i.count;e<n;e++)for(let s=0;s<i.itemSize;s++)t.setComponent(e,s,i.getComponent(e,s));return t}};var Dr={women:{height:168,sizes:{XS:[81,63,89],S:[86,68,94],M:[91,73,99],L:[99,81,107],XL:[107,89,115],"2XL":[117,99,125],"3XL":[127,109,135],"4XL":[137,119,145]}},men:{height:178,sizes:{XS:[86,71,86],S:[91,76,91],M:[99,84,99],L:[107,91,107],XL:[117,102,117],"2XL":[127,112,127],"3XL":[137,122,137],"4XL":[147,132,147]}},kids:{height:0,sizes:{4:[56,53,58,104],6:[61,56,64,117],8:[66,58,69,130],10:[71,61,74,140],12:[76,64,80,150],14:[81,66,86,160]}}},Y_={petite:-10,regular:0,tall:8},Ur=[{id:"form",name:"Dress form",color:"#efe8dc"},{id:"porcelain",name:"Porcelain",color:"#f3d9c6"},{id:"light",name:"Light",color:"#e8bf9f"},{id:"medium",name:"Medium",color:"#c98f68"},{id:"tan",name:"Tan",color:"#a8714c"},{id:"deep",name:"Deep",color:"#7a4a2e"},{id:"rich",name:"Rich",color:"#4d2c1b"}];function Yl(){return{type:"women",size:"M",height:"regular",skin:"form",custom:null}}function Ba(i){let t=Dr[i.type]||Dr.women,e=t.sizes[i.size]||Object.values(t.sizes)[2],s={height:i.type==="kids"?e[3]:t.height+(Y_[i.height]||0),bust:e[0],waist:e[1],hip:e[2]};if(i.custom)for(let o of Object.keys(s))i.custom[o]>0&&(s[o]=i.custom[o]);s.shoulder=Math.round((.18*s.height+.12*s.bust)*10)/10;let r=Oa[i.type]||Oa.women;return s.inseam=Math.round(r.crotch*s.height),s.arm=Math.round((r.upperArm+r.forearm)*s.height),s}var Oa={women:{crotch:.46,hip:.51,waist:.615,bust:.715,armpit:.745,shoulder:.815,neckBase:.83,neckTop:.87,head:.925,headR:.064,knee:.285,ankle:.045,thigh:.6,upperArm:.17,forearm:.15,armC:.3,bustBulge:1},men:{crotch:.47,hip:.515,waist:.6,bust:.72,armpit:.745,shoulder:.818,neckBase:.835,neckTop:.875,head:.93,headR:.062,knee:.285,ankle:.045,thigh:.57,upperArm:.175,forearm:.15,armC:.32,bustBulge:.3},kids:{crotch:.43,hip:.48,waist:.56,bust:.66,armpit:.69,shoulder:.76,neckBase:.775,neckTop:.81,head:.885,headR:.085,knee:.27,ankle:.045,thigh:.58,upperArm:.16,forearm:.14,armC:.3,bustBulge:0}};function ql(i,t){let e=Math.PI*(3*(1+t)-Math.sqrt((3+t)*(1+3*t))),n=i/e;return{a:n,b:n*t}}function Zl(i,t){return Math.PI*(3*(i+t)-Math.sqrt((3*i+t)*(i+3*t)))}var hn=22*Math.PI/180;function Ed(i){let t=Ba(i),e=Oa[i.type]||Oa.women,n=t.height/100,s=L=>L/100,r=ql(s(t.hip),.74),o=ql(s(t.waist),.72),a=ql(s(t.bust)*(e.bustBulge?.95:1),.66),c=s(t.shoulder)/2,l=s(t.bust)*.058+.012,d=(L,N,k)=>({a:L.a+(N.a-L.a)*k,b:L.b+(N.b-L.b)*k}),h=d(o,a,.5),u=(L,N,k={})=>({y:L*n,a:N.a,b:N.b,...k}),f=[u(e.crotch-.008,{a:r.a*.62,b:r.b*.55}),u(e.crotch+.006,{a:r.a*.86,b:r.b*.82}),u(e.crotch+.025,{a:r.a*.97,b:r.b*.96}),u(e.hip,r),u((e.hip+e.waist)/2,d(r,o,.55)),u(e.waist,o),u((e.waist+e.bust)/2,h),u(e.bust,a),u(e.armpit,{a:a.a*.97,b:a.b*.92}),u((e.armpit+e.shoulder)/2+.008,{a:Math.max(c*.86,a.a*.95),b:a.b*.8}),u(e.shoulder-.004,{a:c*.9,b:a.b*.66}),u(e.neckBase-.002,{a:Math.max(l*2.2,c*.62),b:Math.max(l*1.4,a.b*.5)}),u(e.neckBase+.006,{a:l*1.25,b:l*1.15}),u(e.neckTop,{a:l,b:l})],g=e.bustBulge*Math.max(.012,(s(t.bust)-s(t.waist))*.09),_=e.bust*n,m=e.hip*n,p=(L,N,k,H)=>{let V=0;if(H>0){let j=Math.exp(-Math.pow((L-_)/(L<_?.035*n:.05*n),2)),G=.42*k,at=.3*k;V+=g*j*H*H*(Math.exp(-Math.pow((N-G)/at,2))+Math.exp(-Math.pow((N+G)/at,2)))}else{let j=Math.exp(-Math.pow((L-m+.01*n)/(.05*n),2)),G=.45*k,at=.35*k;V-=.35*g*j*H*H*(Math.exp(-Math.pow((N-G)/at,2))+Math.exp(-Math.pow((N+G)/at,2)))+(i.type==="women"?.012:.006)*j*H*H}return V},w=s(t.hip)*e.thigh,T=r.a*.47,x=(L,N,k=1)=>({y:L*n,r:N/(2*Math.PI),x:T*k}),A=[x(e.crotch+.04,w*1.05,1),x(e.crotch-.01,w,1),x(e.crotch-.06,w*.88,.97),x(e.knee+.05,w*.7,.9),x(e.knee,w*.62,.86),x(e.knee-.05,w*.64,.84),x((e.knee+e.ankle)/2+.03,w*.56,.8),x(e.ankle+.03,w*.37,.76),x(e.ankle-.012,w*.38,.75)],E=s(t.bust)*e.armC,R=E/(2*Math.PI),P={x:c-R*.8,y:(e.shoulder-.018)*n},M=(L,N)=>({d:L*n,r:N/(2*Math.PI)}),v=[M(-.01,E*1.15),M(.02,E*1.12),M(.06,E),M(e.upperArm,E*.78),M(e.upperArm+.06,E*.82),M(e.upperArm+e.forearm,E*.56)],I=(e.upperArm+e.forearm)*n;return{settings:i,m:t,H:n,P:e,torso:f,bulge:p,leg:A,legX:T,arm:v,armLen:I,shoulderJoint:P,upperR:R,head:{y:e.head*n,r:e.headR*n},footLen:.15*n*(i.type==="kids"?.95:1),y:{crotch:e.crotch*n,hip:m,waist:e.waist*n,bust:_,armpit:e.armpit*n,shoulder:e.shoulder*n,neckBase:e.neckBase*n,neckTop:e.neckTop*n,knee:e.knee*n,ankle:e.ankle*n},half:{hip:r.a,waist:o.a,bust:a.a,shoulder:c,neck:l}}}function Ad(i,t,e){let n=i.H*1.08,s=n*t/e;return{x0:-s/2,y0:-i.H*.025,w:s,h:n}}var Z_=-9.8,ka=class{constructor({rings:t,seg:e=64,phys:n,collide:s,pointFn:r,centerFn:o,texFn:a,uvMap:c,seed:l=1}){let d=t.length,h=e,u=d*h;this.R=d,this.C=h,this.N=u,this.phys=n,this.collide=s,this.rest=new Float32Array(u*3),this.local=new Float32Array(u*3),this.prev=new Float32Array(u*3);for(let I=0;I<d;I++)for(let L=0;L<h;L++){let N=L/h*Math.PI*2,k=t[I],H=I*h+L;this.rest.set(r(k,Math.cos(N),Math.sin(N)),H*3)}let f=t.map(I=>o?o(I):[I.cx,I.y,0]),g=l>>>0,_=()=>(g=g*1664525+1013904223>>>0,g/4294967296),m=Math.max(4,Math.round(n.folds)),p=Array.from({length:m},()=>_()*.6);for(let I=0;I<d;I++){let L=t[I],N=d>1?I/(d-1):0,k=1-(1-n.hang)*.6*Math.pow(N,1.2),H=Math.min(.32,2/m*Math.sqrt(Math.max(0,1/k-1)))*Math.pow(N,.6);for(let V=0;V<h;V++){let j=V/h*Math.PI*2,G=Math.floor(V/h*m),at=k*(1+H*Math.sin(m*j+p[G]*Math.PI*.5)),mt=(I*h+V)*3,_t=f[I];for(let q=0;q<3;q++)this.local[mt+q]=_t[q]+(this.rest[mt+q]-_t[q])*at}}this.prev.set(this.local),this.target=this.local.slice(),this.hold=.012+n.bend*.05+(n.hang-.7)*.08;let w=[],T=(I,L,N,k,H,V)=>{if(N>=d)return;let j=I*h+(L+h)%h,G=N*h+(k+h)%h,at=this.rest[j*3]-this.rest[G*3],mt=this.rest[j*3+1]-this.rest[G*3+1],_t=this.rest[j*3+2]-this.rest[G*3+2];w.push(j,G,Math.sqrt(at*at+mt*mt+_t*_t),H,V)},x=n.bend;for(let I=0;I<d;I++)for(let L=0;L<h;L++)T(I,L,I,L+1,1,.9),T(I,L,I+1,L,1,.9),T(I,L,I+1,L+1,.5,.35),T(I,L+1,I+1,L,.5,.35),T(I,L,I,L+2,x,x),T(I,L,I+2,L,x*.8+.1,x*.8+.1);this.cons=new Float32Array(w);let A=h/2,E=A+1,R=[],P=[],M=[];for(let I of[0,1]){let L=R.length;for(let N=0;N<d;N++)for(let k=0;k<=A;k++){let H=(I*A+k)%h,V=(I*A+k)/h*Math.PI*2;R.push(N*h+H);let j=c(a(t[N],Math.cos(V),Math.sin(V)),I);P.push(j[0],j[1])}for(let N=0;N<d-1;N++)for(let k=0;k<A;k++){let H=L+N*E+k,V=H+1,j=H+E,G=j+1;M.push(H,j,V,V,j,G)}}this.map=new Int32Array(R),this.pos=new Float32Array(R.length*3);let v=this.geometry=new Ke;v.setAttribute("position",new xe(this.pos,3).setUsage(il)),v.setAttribute("uv",new we(P,2)),v.setIndex(M),this.frame={angle:0,x:0,z:0},this.wind=0,this.time=0,this.motion=1}setFrame(t,e,n){let s=this.frame,r=t-s.angle,o=e-s.x,a=n-s.z;if(r||o||a){let c=Math.cos(s.angle),l=Math.sin(s.angle),d=Math.cos(t),h=Math.sin(t);for(let u=this.C;u<this.N;u++)for(let f of[this.local,this.prev]){let g=u*3,_=f[g],m=f[g+2],p=_*c+m*l+s.x-e,w=-_*l+m*c+s.z-n;f[g]=p*d-w*h,f[g+2]=p*h+w*d}s.angle=t,s.x=e,s.z=n,this.motion=1}}step(t){let{local:e,prev:n,rest:s,C:r,N:o,cons:a}=this,c=this.phys,l=1-c.drag,d=Z_*t*t*c.weight;this.time+=t;let h=this.wind,u=0;for(let g=r;g<o;g++){let _=g*3,m=(e[_]-n[_])*l,p=(e[_+1]-n[_+1])*l,w=(e[_+2]-n[_+2])*l;n[_]=e[_],n[_+1]=e[_+1],n[_+2]=e[_+2];let T=0,x=0;if(h){let R=.6+.4*Math.sin(this.time*1.7+e[_+1]*6)*Math.sin(this.time*.9+g*.013),P=Math.cos(this.frame.angle),M=Math.sin(this.frame.angle);T=h*R*P*t*t*(1.6-c.weight*.6),x=h*R*M*t*t*(1.6-c.weight*.6)}e[_]+=m+T,e[_+1]+=p+d,e[_+2]+=w+x;let A=this.target,E=this.hold*(.3+.7*(g/this.C/this.R));e[_]+=(A[_]-e[_])*E,e[_+1]+=(A[_+1]-e[_+1])*E*.5,e[_+2]+=(A[_+2]-e[_+2])*E,u=Math.max(u,Math.abs(m)+Math.abs(p)+Math.abs(w))}e.set(s.subarray(0,r*3),0);let f=8;for(let g=0;g<f;g++){for(let _=0;_<a.length;_+=5){let m=a[_]*3,p=a[_+1]*3,w=a[_+2],T=e[p]-e[m],x=e[p+1]-e[m+1],A=e[p+2]-e[m+2],E=Math.sqrt(T*T+x*x+A*A)||1e-9,R=E>w?a[_+3]:a[_+4];if(!R)continue;let P=m<r*3,M=p<r*3,v=(E-w)/E*R*(P||M?1:.5);P||(e[m]+=T*v,e[m+1]+=x*v,e[m+2]+=A*v),M||(e[p]-=T*v,e[p+1]-=x*v,e[p+2]-=A*v)}for(let _=r;_<o;_++)this.collide(e,_*3)}return this.motion=u,u}settle(t){for(let e=0;e<t;e++)this.step(1/90)}sync(){let{local:t,pos:e,map:n}=this,s=this.frame,r=Math.cos(s.angle),o=Math.sin(s.angle);for(let a=0;a<n.length;a++){let c=n[a]*3,l=a*3,d=t[c],h=t[c+2];e[l]=d*r+h*o+s.x,e[l+1]=t[c+1],e[l+2]=-d*o+h*r+s.z}this.geometry.attributes.position.needsUpdate=!0,this.geometry.computeVertexNormals(),this.geometry.computeBoundingSphere()}};var Fe=64;function $l(i,t,e){let n=[];for(let s=0;s<i.length-1;s++){let r=i[Math.max(0,s-1)],o=i[s],a=i[s+1],c=i[Math.min(i.length-1,s+2)];for(let l=0;l<e;l++){let d=l/e,h=d*d,u=h*d,f={};for(let g of t)f[g]=.5*(2*o[g]+(-r[g]+a[g])*d+(2*r[g]-5*o[g]+4*a[g]-c[g])*h+(-r[g]+3*o[g]-3*a[g]+c[g])*u);n.push(f)}}return n.push({...i[i.length-1]}),n}function Vs(i,t,{capStart:e=!1,capEnd:n=!1,texFn:s=null,uvMap:r=null}={}){let o=[],a=[],c=[];if(s){let d=Fe/2,h=d+1;for(let u of[0,1]){let f=o.length/3;i.forEach(g=>{for(let _=0;_<=d;_++){let m=(u*d+_)/Fe*Math.PI*2,p=Math.cos(m),w=Math.sin(m),T=t(g,p,w);o.push(T[0],T[1],T[2]);let x=r(s(g,p,w),u);a.push(x[0],x[1])}});for(let g=0;g<i.length-1;g++)for(let _=0;_<d;_++){let m=f+g*h+_,p=m+1,w=m+h,T=w+1;c.push(m,w,p,p,w,T)}}}else{i.forEach(h=>{for(let u=0;u<Fe;u++){let f=u/Fe*Math.PI*2,g=t(h,Math.cos(f),Math.sin(f));o.push(g[0],g[1],g[2])}});for(let h=0;h<i.length-1;h++)for(let u=0;u<Fe;u++){let f=h*Fe+u,g=h*Fe+(u+1)%Fe,_=(h+1)*Fe+u,m=(h+1)*Fe+(u+1)%Fe;c.push(f,_,g,g,_,m)}let d=(h,u)=>{let f=h*Fe,g=0,_=0,m=0;for(let w=0;w<Fe;w++)g+=o[(f+w)*3],_+=o[(f+w)*3+1],m+=o[(f+w)*3+2];let p=o.length/3;o.push(g/Fe,_/Fe,m/Fe);for(let w=0;w<Fe;w++){let T=f+w,x=f+(w+1)%Fe;u?c.push(p,x,T):c.push(p,T,x)}};e&&d(0,!1),n&&d(i.length-1,!0)}let l=new Ke;return l.setAttribute("position",new we(o,3)),s&&l.setAttribute("uv",new we(a,2)),l.setIndex(c),l.computeVertexNormals(),l}var za=class{constructor(t){this.host=t;let e=this.renderer=new La({antialias:!0,preserveDrawingBuffer:!0});e.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),e.outputColorSpace=Ue,e.toneMapping=Go,e.toneMappingExposure=1.05,e.shadowMap.enabled=!0,e.shadowMap.type=Uo,t.appendChild(e.domElement);let n=this.scene=new Ln;n.background=new qt("#efe9e2");let s=new ks(e);n.environment=s.fromScene(new Fa,.04).texture,n.environmentIntensity=.7;let r=this.key=new ki("#fff6ec",1.6);r.position.set(1.2,3,2.2),r.castShadow=!0,r.shadow.mapSize.set(2048,2048),Object.assign(r.shadow.camera,{left:-1.2,right:1.2,top:2.4,bottom:-.2,near:.5,far:8}),r.shadow.bias=-5e-4,r.shadow.normalBias=.02,n.add(r);let o=new ki("#dfe8ff",.7);o.position.set(-2,2,-2.5),n.add(o),n.add(new br("#ffffff","#b8a99a",.35));let a=this.stage=new ae(new xr(.55,.58,.04,96),new Dn({color:"#f7f3ee",roughness:.45}));a.position.y=-.02,a.receiveShadow=!0,n.add(a),this.camera=new Oe(28,1,.05,50),this.controls=new Na(this.camera,e.domElement),Object.assign(this.controls,{enableDamping:!0,dampingFactor:.08,minDistance:.6,maxDistance:8,maxPolarAngle:Math.PI*.62,autoRotateSpeed:1.6}),this.figure=new rn,n.add(this.figure),this.bodyGroup=new rn,this.figure.add(this.bodyGroup),this.garmentGroup=new rn,this.figure.add(this.garmentGroup),this.clothGroup=new rn,n.add(this.clothGroup),this.cloths=[],this.move={angle:0,x:0,spin:!1,sway:!1,breeze:!1,twirl:null,home:null,t:0},this.last=performance.now(),this.skinMat=new Dn({color:"#efe8dc",roughness:.55}),this.colorTex=null,this.matTex=null,this.garmentMats=[],this.measure=null,this.visible=!1,this.anim=null,new ResizeObserver(()=>this.resize()).observe(t);let c=()=>{requestAnimationFrame(c),this.visible&&this.tick()};c()}tick(){let t=performance.now(),e=Math.min(.05,(t-this.last)/1e3);if(this.last=t,this.updateMotion(e),this.anim){let n=this.anim,s=Math.min(1,(performance.now()-n.start)/600),r=s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2;this.camera.position.lerpVectors(n.from,n.to,r),s>=1&&(this.anim=null)}this.controls.update(),this.renderer.render(this.scene,this.camera)}resize(){let t=this.host.clientWidth,e=this.host.clientHeight;!t||!e||(this.renderer.setSize(t,e,!1),this.renderer.domElement.style.width=t+"px",this.renderer.domElement.style.height=e+"px",this.camera.aspect=t/e,this.camera.updateProjectionMatrix())}setVisible(t){this.visible=t,t?(this.resize(),this.last=performance.now()):this.move.twirl&&(this.move.angle=this.move.twirl.from+Math.PI*4,this.move.twirl=null)}setBody(t,e,n){let s=this.spec=Ed(t);this.box=Ad(s,e,n),this.BW=e,this.BH=n;let r=Ur.find(u=>u.id===t.skin)||Ur[0];this.skinMat.color.set(r.color),this.skinMat.roughness=r.id==="form"?.7:.5,this.bodyGroup.clear();let o=u=>{let f=new ae(u,this.skinMat);return f.castShadow=!0,f.receiveShadow=!0,this.bodyGroup.add(f),f},a=$l(s.torso,["y","a","b"],6);this.denseTorso=a,o(Vs(a,(u,f,g)=>{let _=u.a*f;return[_,u.y,u.b*g+s.bulge(u.y,_,u.a,g)]},{capStart:!0}));let c=$l(s.leg,["y","r","x"],5);this.denseLeg=c;for(let u of[-1,1])o(Vs(c,(f,g,_)=>[u*f.x+f.r*g,f.y,f.r*.94*_],{capEnd:!0}));let l=$l(s.arm,["d","r"],5);this.denseArm=l;for(let u of[-1,1])o(Vs(l,(f,g,_)=>{let m=this.armPoint(u,f.d),p=Math.cos(hn),w=Math.sin(hn)*u;return[m.x+f.r*g*p*u,m.y+f.r*g*w*u,f.r*.92*_]},{capStart:!0}));for(let u of[-1,1]){let f=this.armPoint(u,s.armLen+s.H*.045),g=o(new Ni(1,24,16));g.scale.set(s.H*.024,s.H*.052,s.H*.013),g.position.set(f.x,f.y,.004),g.rotation.z=u*hn;let _=c[c.length-1],m=o(new Ni(1,24,16));m.scale.set(_.r*1.15,s.H*.03,s.footLen/2),m.position.set(u*_.x,s.H*.022,s.footLen*.28)}let d=o(new Ni(1,40,28));d.scale.set(s.head.r*.8,s.head.r,s.head.r*.9),d.position.set(0,s.head.y,.004),this.stage.scale.set(s.H/1.7,1,s.H/1.7);let h=this.key.shadow.camera;return h.top=s.H*1.3,h.left=-s.H*.7,h.right=s.H*.7,h.updateProjectionMatrix(),this.controls.target.set(0,s.H*.55,0),this.cameraSet||(this.camera.position.set(0,s.H*.62,s.H*2.55),this.cameraSet=!0),this.controls.update(),s}armPoint(t,e){let n=this.spec.shoulderJoint;return{x:t*(n.x+Math.sin(hn)*e),y:n.y-Math.cos(hn)*e}}toBoard(t,e){let n=this.box;return[(t-n.x0)/n.w*this.BW,(1-(e-n.y0)/n.h)*this.BH]}toWorld(t,e){let n=this.box;return[n.x0+t/this.BW*n.w,n.y0+(1-e/this.BH)*n.h]}uvOf(t){let e=this.box;return[(t[0]-e.x0)/e.w,(t[1]-e.y0)/e.h]}renderGuide(t,e,n="front"){let s=this.box,r=new Bi(s.x0,s.x0+s.w,s.y0+s.h,s.y0,-10,10);r.position.set(0,0,n==="back"?-5:5),r.lookAt(0,0,0);let o=this.figure.rotation.y,a=this.figure.position.x;this.figure.rotation.y=0,this.figure.position.x=0,this.clothGroup.visible=!1;let c=new mn(t,e,{samples:4}),l=this.scene.background,d=this.scene.environment;this.scene.background=null,this.scene.environment=null,this.garmentGroup.visible=!1,this.stage.visible=!1;let h=new ki("#ffffff",2.2);h.position.set(.3,.6,n==="back"?-3:3),this.scene.add(h),this.scene.overrideMaterial=new Fi({color:"#c9c2bb"});let u=this.renderer,f=u.toneMapping;u.toneMapping=Sn,u.setRenderTarget(c),u.setClearColor(0,0),u.clear(),u.render(this.scene,r),u.setRenderTarget(null),u.toneMapping=f,this.scene.overrideMaterial=null,this.scene.remove(h),this.scene.background=l,this.scene.environment=d,this.garmentGroup.visible=!0,this.stage.visible=!0,this.clothGroup.visible=!0,this.figure.rotation.y=o,this.figure.position.x=a;let g=new Uint8Array(t*e*4);u.readRenderTargetPixels(c,0,0,t,e,g),c.dispose();let _=document.createElement("canvas");_.width=t,_.height=e;let m=_.getContext("2d").createImageData(t,e);for(let p=0;p<e;p++)m.data.set(g.subarray((e-1-p)*t*4,(e-p)*t*4),p*t*4);return _.getContext("2d").putImageData(m,0,0),_}setDesign(t,e){if(!this.colorTex||this.colorTex.image!==t.color){this.colorTex?.dispose(),this.matTex?.dispose(),this.colorTex=new As(t.color),this.colorTex.colorSpace=Ue,this.colorTex.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),this.matTex=new As(t.mat),this.garmentMats.forEach(s=>s.dispose());let n=s=>new vr({map:this.colorTex,roughnessMap:this.matTex,metalnessMap:this.matTex,roughness:1,metalness:1,transparent:!0,alphaTest:.04,side:s});this.garmentMats=[n(Ae),n(on)]}this.colorTex.needsUpdate=!0,this.matTex.needsUpdate=!0,this.grid=e,this.buildGarment()}setFit(t){this.fit={...t||{}}}opaque(t,e){let n=this.grid;if(!n)return!1;let[s,r]=this.toBoard(t,e),o=Math.floor(s/n.step),a=Math.floor(r/n.step);return o<0||a<0||o>=n.w||a>=n.h?!1:n.data[a*n.w+o]>0}runAt(t,e,n){let s=this.box.w/this.grid.w*.999,r=(c,l)=>{let d=c,h=0,u=c;for(;Math.abs(d-e)<this.box.w/2;)if(d+=l*s,this.opaque(d,t))u=d,h=0;else if(++h>3)break;return u};if(this.opaque(e,t))return{l:r(e,-1),r:r(e,1)};let o=null,a=null;for(let c=s;c<n&&(o===null&&this.opaque(e-c,t)&&(o=e-c),a===null&&this.opaque(e+c,t)&&(a=e+c),!(o!==null&&a!==null));c+=s);return o===null||a===null?null:{l:r(o,-1),r:r(a,1)}}runAlong(t,e,n,s,r){let o=this.box.w/this.grid.w*.999,a=l=>this.opaque(t+n*l,e+s*l);if(!a(0))return null;let c=l=>{let d=0,h=0,u=0;for(;Math.abs(d)<r;)if(d+=l*o,a(d))u=d,h=0;else if(++h>3)break;return u};return{l:c(-1),r:c(1)}}splitAt(t){let e=this.grid;if(!e.lines)return!1;for(let n=-.02;n<=.02;n+=.004){let[s,r]=this.toBoard(n,t),o=Math.floor(r/e.step)*e.w+Math.floor(s/e.step);if(e.lines[o])return!0}return!1}texUV(t,e){let[n,s]=this.uvOf(t);return e?[.5+(1-n)*.5,s]:[n*.5,s]}buildGarment(){for(let D of this.garmentGroup.children)D.geometry.dispose();this.garmentGroup.clear();let t=this.cloths||[];this.cloths=[];let e=()=>{for(let D of t)this.cloths.includes(D)||(D.meshes.forEach(Z=>this.clothGroup.remove(Z)),D.cloth.geometry.dispose());this.clothFabric=this.cloths[0]?.fabric||null};if(!this.grid||!this.grid.any){this.measure=null,e();return}let n=this.spec,s=.007,r=this.fit||{},o=n.H,a=D=>(+D||0)/100,c=(D,Z)=>D.map((S,lt)=>{let ot=D[Math.max(0,lt-1)],wt=D[Math.min(D.length-1,lt+1)];return{...S,[Z]:(ot[Z]+2*S[Z]+wt[Z])/4}}),l=D=>{let Z=this.denseLeg;if(D>Z[0].y)return null;for(let S=0;S<Z.length-1;S++)if(D<=Z[S].y&&D>=Z[S+1].y){let lt=(Z[S].y-D)/(Z[S].y-Z[S+1].y);return{x:Z[S].x+(Z[S+1].x-Z[S].x)*lt,r:Z[S].r+(Z[S+1].r-Z[S].r)*lt}}return Z[Z.length-1]},d=D=>{let Z=this.denseTorso;for(let S=0;S<Z.length-1;S++)if(D>=Z[S].y&&D<=Z[S+1].y){let lt=(D-Z[S].y)/(Z[S+1].y-Z[S].y);return{a:Z[S].a+(Z[S+1].a-Z[S].a)*lt,b:Z[S].b+(Z[S+1].b-Z[S].b)*lt}}return null},h=(D,Z)=>{let S=l(D),lt=S?S.x+S.r:0,ot=S?S.r*1.15:0;return{a:Math.max(Z?Z.a:0,lt)+s,b:Math.max(Z?Z.b:0,ot)+s}},u=(D,Z,S,lt)=>{let ot=this.runAt(D,0,S),wt=Z.a,Q=Z.b,Pt=0;if(ot){let nt=(ot.r-ot.l)/2;nt>wt&&(Q+=(nt-wt)*.95,wt=nt,Pt=(ot.l+ot.r)/2)}return{y:D,a:wt,b:Q,cx:Pt,body:lt,base:Z.a,hit:!!ot}},f=(D,Z,S)=>{let lt={hit:!0};for(let ot of Object.keys(D))typeof D[ot]=="number"&&(lt[ot]=D[ot]+(Z[ot]-D[ot])*S);if(D.o){lt.o={};for(let ot of Object.keys(D.o))lt.o[ot]=D.o[ot]+(Z.o[ot]-D.o[ot])*S}return lt},g=D=>{let Z=Math.hypot(D[0].y-D[D.length-1].y,(D[0].d||0)-(D[D.length-1].d||0)*0),S=Math.max(6,Math.min(48,Math.round(Z/.022))),lt=[{...D[0]}];for(let ot=1;ot<=S;ot++){let wt=ot/S*(D.length-1),Q=Math.min(D.length-2,Math.floor(wt));lt.push(f(D[Q],D[Q+1],wt-Q))}return lt},_=D=>D.forEach(Z=>{Z.o={};for(let S of Object.keys(Z))typeof Z[S]=="number"&&(Z.o[S]=Z[S])}),m=(n.y.bust+n.y.waist)/2,p=[];for(let D of[...this.denseTorso].reverse())if(!(D.y>n.y.neckTop)){if(D.y>=m){p.push({y:D.y,a:D.a+s,b:D.b+s,cx:0,body:D.a,base:D.a+s,hit:this.opaque(0,D.y)});continue}p.push(u(D.y,h(D.y,D),D.a*1.1,D.a))}let w=o*.008,T=null,x=0;for(let D=p[p.length-1].y-w;D>o*.005;D-=w){let Z=h(D,null),S=u(D,Z,.035,Z.a-s);if(!S.hit||this.splitAt(D)){if(++x>2)break;continue}x=0,p.push(S),T=D}let A=0,E=0;if(T!==null){for(let D of p)if(!(D.y>n.y.hip)&&(D.a<A&&(D.cx=D.cx*(D.a/A),D.a=A),D.b<E&&(D.b=E),A=D.a,E=D.b,D.y<n.y.crotch&&!D.hit))break}let R=p;for(let D=0;D<3;D++)R=c(c(R,"a"),"b");for(let D=0;D<6;D++)R=c(R,"cx");_(R);let P=D=>D.hit||this.opaque(0,D.o.y),M=R.findIndex(P),v=-1;for(let D=R.length-1;D>=0;D--)if(P(R[D])){v=D;break}let I=D=>Math.min(D.o.a,D.body+s*.6),L=(D,Z)=>{if(Z)for(let S of R){let lt=Math.exp(-Math.pow((S.o.y-D)/(.045*o),2)),ot=Z/(2*Math.PI)*lt;S.a=Math.max(I(S),S.a+ot),S.b=Math.max(S.o.b*.6,S.b+ot)}};L(n.y.bust,a(r.bust)),L(n.y.waist,a(r.waist)),L(n.y.hip,a(r.hip));let N=v>=0?R[v].o.y:n.y.waist;if(r.hem&&N<n.y.hip-.02)for(let D of R){if(D.o.y>n.y.hip)continue;let Z=Math.min(1,(n.y.hip-D.o.y)/(n.y.hip-N)),S=a(r.hem)/(2*Math.PI)*Z;D.a=Math.max(I(D),D.a+S),D.b=Math.max(D.o.b*.6,D.b+S)}if(r.length&&v>M){let D=N<n.y.waist-.05*o?n.y.waist:m,Z=D-N;if(Z>.02){let S=Math.max(.25,(Z+a(r.length))/Z);for(let lt of R)if(lt.o.y<D){lt.y=Math.max(.012,D-(D-lt.o.y)*S);let ot=h(lt.y,d(lt.y));lt.a<ot.a&&(lt.a=ot.a),lt.b<ot.b&&(lt.b=ot.b)}}}let k=(D,Z,S)=>{let lt=D.cx+D.a*Z,ot=D.a-s>D.body*1.2?0:n.bulge(D.y,lt-D.cx,D.body,S);return[lt,D.y,D.b*S+ot]},H=(D,Z)=>[D.o.cx+D.o.a*Z*.975,D.o.y],V=(D,Z)=>this.texUV(D,Z),j=(D,Z,S)=>{let lt=this.dominantFabric(Z,S.texFn),ot={...bh(lt),...S.phys||{}},wt=D+"|"+lt+"|"+Z.map(ft=>[ft.y,ft.a,ft.b,ft.cx||0,ft.d||0,ft.off||0].map(Ot=>Ot.toFixed(3)).join(",")).join(";"),Q=t.find(ft=>ft.key===wt);if(Q){Q.meshes.forEach((ft,Ot)=>{ft.material=this.garmentMats[Ot]}),this.cloths.push(Q);return}let Pt=new ka({rings:Z,uvMap:V,...S,phys:ot});Pt.frame={angle:this.move.angle,x:this.move.x,z:0},Pt.wind=this.move.breeze?2.2:0,Pt.settle(S.settle||90),Pt.sync();let nt=this.garmentMats.map((ft,Ot)=>{let Yt=new ae(Pt.geometry,ft);return Yt.castShadow=Ot===1,Yt.receiveShadow=!0,Yt.renderOrder=1+Ot,Yt.userData.garment=!0,Yt.frustumCulled=!1,this.clothGroup.add(Yt),Yt});this.cloths.push({key:wt,cloth:Pt,meshes:nt,fabric:lt}),this.wake()},G=D=>{let Z=R.findIndex(S=>S.o.y<=D);return Z<0?0:Z},at=G(n.y.bust),mt=G(n.y.waist),_t=R.findIndex((D,Z)=>Z>=at&&D.hit&&D.a-D.base>(T!==null?.012:.025)),q=-1;T!==null?q=_t>=0?Math.max(at,Math.min(_t-2,mt)):mt:_t>=0&&v-_t>=3&&N>n.y.crotch+.02*o&&(q=Math.max(at,_t-2));let Dt=n.y.crotch-.05*o,Et=T===null&&(this.splitAt(Dt)||!this.opaque(0,Dt)&&(this.opaque(-n.legX,Dt)||this.opaque(n.legX,Dt))),zt=Et?R.filter(D=>D.o.y>=n.y.crotch+.012*o):R;q>=0&&v-q>=3&&!Et&&(zt=R.slice(0,q+1),j("center",g(R.slice(q,v+1)),{pointFn:k,texFn:H,collide:this.makeCollider(!0)}));let Y=[];zt.length>1&&Y.push(Vs(zt,k,{texFn:H,uvMap:V}));let tt=D=>T!==null&&D>=T-w,yt=(D,Z,S)=>[D.cx+D.a*Z,D.y,D.b*S],Ct=[];for(let D of[-1,1]){let Z=this.denseLeg.map(Q=>{let Pt=Q.r+s,nt=D*Q.x,ft=!1;if(!tt(Q.y)&&Q.y<n.y.crotch){let Ot=this.runAt(Q.y,nt,Q.r*1.3);if(Ot&&(!this.opaque(0,Q.y)||this.splitAt(Q.y))){ft=!0,D<0?Ot.r=Math.min(Ot.r,-.004):Ot.l=Math.max(Ot.l,.004);let Yt=(Ot.r-Ot.l)/2;Yt>Pt&&(Pt=Yt,nt=(Ot.l+Ot.r)/2)}}return{y:Q.y,a:Pt,b:Pt*.96,cx:nt,body:Q.r,base:Q.r+s,hit:ft}}),S=Z.find(Q=>Q.hit);if(S&&Et){let Q=zt[zt.length-1];for(let Pt of Z){if(Pt.y<n.y.crotch-.03*o)break;S.a>Pt.a&&(Pt.a=S.a,Pt.b=S.b,Pt.cx=S.cx),Q&&(Pt.a=Math.max(Pt.a,Q.a/2+.012),Pt.cx=D*Math.max(Math.abs(Pt.cx),Q.a+.002-Pt.a),Pt.b=Math.max(Pt.b,Q.b*.92))}}Z=c(c(Z,"a"),"b"),Z.forEach(Q=>{Q.b=Math.max(Q.b,Q.a*.9)}),_(Z);let lt=-1;if(Z.forEach((Q,Pt)=>{Q.hit&&(lt=Pt)}),lt>=0&&r.inseam){let Q=n.y.crotch,Pt=Q-Z[lt].o.y,nt=Math.max(.2,(Pt+a(r.inseam))/Pt);for(let ft of Z)if(ft.o.y<Q){ft.y=Math.max(.01,Q-(Q-ft.o.y)*nt);let Ot=l(ft.y);Ot&&ft.a<Ot.r+s&&(ft.a=Ot.r+s,ft.b=Math.max(ft.b,ft.a*.96))}}lt>=0&&Ct.push(Z[lt].y);let ot=(Q,Pt)=>[Q.o.cx+Q.o.a*Pt*.975,Q.o.y];Z.some(Q=>Q.hit&&Q.a-Q.base>.015)&&lt>=3?j("leg"+D,g(Z.slice(0,lt+1)),{pointFn:yt,texFn:ot,centerFn:Q=>[Q.cx,Q.y,0],collide:this.makeCollider(!0),settle:70,phys:{hang:.97}}):Y.push(Vs(Z,yt,{texFn:ot,uvMap:V}))}let Rt=null;for(let D of[-1,1]){let Z=D*Math.cos(hn),S=Math.sin(hn),lt=this.denseArm.map(nt=>{let ft=this.armPoint(D,nt.d),Ot=nt.r+s*.8+Math.max(0,1-nt.d/(o*.06))*.012,Yt=Ot,C=0,y=this.opaque(ft.x,ft.y);if(nt.d>o*.07){let z=this.runAlong(ft.x,ft.y,Z,S,.16);if(z){let J=(z.r-z.l)/2;J>Yt&&(Yt=J,C=(z.l+z.r)/2)}}return{d:nt.d,y:ft.y,a:Yt,b:Ot*.94+(Yt-Ot),off:C,body:Ot,base:Ot,hit:y}});lt=c(c(c(lt,"a"),"b"),"off"),_(lt);let ot=-1;if(lt.forEach((nt,ft)=>{nt.hit&&(ot=ft)}),ot>=0&&r.sleeve){let nt=Math.max(.03,lt[ot].o.d),ft=Math.max(.1,(nt+a(r.sleeve))/nt);for(let Ot of lt)Ot.d=Ot.o.d*ft,Ot.y=this.armPoint(D,Ot.d).y}D===1&&ot>=0&&lt[ot].d>.03&&(Rt=lt[ot].d);let wt=(nt,ft,Ot)=>{let Yt=this.armPoint(D,nt.d),C=Yt.x+Z*nt.off,y=Yt.y+S*nt.off;return[C+Z*nt.a*ft,y+S*nt.a*ft,nt.b*Ot]},Q=(nt,ft)=>{let Ot=nt.o,Yt=this.armPoint(D,Ot.d),C=Ot.off+Ot.a*ft*.975;return[Yt.x+Z*C,Yt.y+S*C]};lt.some(nt=>nt.hit&&nt.a-nt.base>.022)&&lt[ot]?.o.d>o*.16&&ot>=4?j("sleeve"+D,g(lt.slice(0,ot+1)),{pointFn:wt,texFn:Q,centerFn:nt=>{let ft=this.armPoint(D,nt.d);return[ft.x+Z*nt.off,ft.y+S*nt.off,0]},collide:this.makeCollider(!1),seg:48,settle:70}):Y.push(Vs(lt,wt,{texFn:Q,uvMap:V}))}for(let D of Y)for(let[Z,S]of this.garmentMats.entries()){let lt=new ae(D,S);lt.castShadow=Z===1,lt.renderOrder=1+Z,lt.userData.garment=!0,this.garmentGroup.add(lt)}e(),this.lastRows=R,this.measure=this.measureGarment(R,P,Ct,Rt)}dominantFabric(t,e){let n=this.grid,s={};for(let a of t)for(let c=-10;c<=10;c++){let[l,d]=e(a,c/10.5,0),[h,u]=this.toBoard(l,d),f=Math.floor(u/n.step)*n.w+Math.floor(h/n.step);if(f<0||f>=n.data.length||!n.data[f])continue;let g=n.fabricOf?n.fabricOf(n.ids[f]):"cotton";s[g]=(s[g]||0)+1}let r="cotton",o=0;for(let[a,c]of Object.entries(s))c>o&&(o=c,r=a);return r}makeCollider(t){let e=this.spec,n=this.denseTorso,s=this.denseLeg,r=.009,o=d=>{for(let h=0;h<n.length-1;h++)if(d>=n[h].y&&d<=n[h+1].y){let u=(d-n[h].y)/(n[h+1].y-n[h].y);return{a:n[h].a+(n[h+1].a-n[h].a)*u,b:n[h].b+(n[h+1].b-n[h].b)*u}}return null},a=d=>{if(d>s[0].y)return null;for(let h=0;h<s.length-1;h++)if(d<=s[h].y&&d>=s[h+1].y){let u=(s[h].y-d)/(s[h].y-s[h+1].y);return{x:s[h].x+(s[h+1].x-s[h].x)*u,r:s[h].r+(s[h+1].r-s[h].r)*u}}return{x:s[s.length-1].x,r:s[s.length-1].r}},c=[-1,1].map(d=>{let h=this.armPoint(d,.02),u=this.armPoint(d,e.armLen+e.H*.07);return{ax:h.x,ay:h.y,bx:u.x,by:u.y,r:e.upperR*.9+r}}),l=t?e.y.bust+.02:e.y.waist;return(d,h)=>{let u=d[h],f=d[h+1],g=d[h+2];if(f<.004&&(d[h+1]=f=.004),f<=l){let _=t?o(f):null;if(_){let p=Math.max(-1,Math.min(1,g/_.b)),w=e.bulge(f,u,_.a,p),T=_.a+r,x=_.b+r,A=g-w,E=u/T*(u/T)+A/x*(A/x);if(E<1){let R=1/Math.sqrt(Math.max(E,1e-6));u*=R,g=A*R+w,d[h]=u,d[h+2]=g}}let m=a(f);if(m)for(let p of[-1,1]){let w=p*m.x,T=u-w,x=m.r+r,A=T*T+g*g;if(A<x*x){let E=Math.sqrt(A)||1e-6;u=w+T/E*x,g=g/E*x,d[h]=u,d[h+2]=g}}}for(let _ of c){let m=_.bx-_.ax,p=_.by-_.ay,w=Math.max(0,Math.min(1,((u-_.ax)*m+(f-_.ay)*p)/(m*m+p*p))),T=_.ax+m*w,x=_.ay+p*w,A=u-T,E=f-x,R=A*A+E*E+g*g;if(R<_.r*_.r){let P=Math.sqrt(R)||1e-6,M=_.r/P;d[h]=T+A*M,d[h+1]=x+E*M,d[h+2]=g*M}}}}measureGarment(t,e,n,s){let r=this.spec,o=t.filter(e);if(!o.length)return null;let a=h=>{let u=null;for(let f of o)(!u||Math.abs(f.y-h)<Math.abs(u.y-h))&&(u=f);return u&&Math.abs(u.y-h)<r.H*.03?u:null},c=h=>{let u=a(h);return u?Zl(u.a,u.b)*100:null},l=o[0],d=o[o.length-1];return{bust:c(r.y.bust),waist:c(r.y.waist),hip:c(r.y.hip),length:(l.y-Math.min(d.y,...n.length?n:[d.y]))*100,lengthIsLegs:n.length>0&&Math.min(...n)<d.y-.02,hem:d.o.y<r.y.waist?Zl(d.a,d.b)*100:null,sleeve:s!==null?s*100:null,inseam:n.length?(r.y.crotch-Math.min(...n))*100:null}}pick(t,e){let n=this.renderer.domElement.getBoundingClientRect(),s=new Vt((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1),r=new wr;r.setFromCamera(s,this.camera);let o=r.intersectObjects([...this.garmentGroup.children,...this.clothGroup.children,...this.bodyGroup.children],!1);for(let a of o){if(!a.object.userData.garment)return null;if(!a.uv)continue;let c=a.uv.x>=.5,l=c?(a.uv.x-.5)*2*this.BW:a.uv.x*2*this.BW,d=(1-a.uv.y)*this.BH,h=this.grid,u=c?this.BW-l:l;if(h.data[Math.floor(d/h.step)*h.w+Math.floor(u/h.step)])return{side:c?"back":"front",x:Math.round(l),y:Math.round(d)}}return null}view(t){this.move.spin=!1,this.move.home=Math.round(this.move.angle/(Math.PI*2))*Math.PI*2,this.wake();let e=this.spec.H,n=e*2.55,s=e*.62,r=t==="back"?new F(0,s,-n):t==="side"?new F(n,s,0):t==="close"?new F(0,e*.7,e*1.4):new F(0,s,n);this.anim={from:this.camera.position.clone(),to:r,start:performance.now()}}setAutoRotate(t){this.move.spin=t,t&&(this.move.home=null),this.wake()}setSway(t){this.move.sway=t,this.move.t=0,this.wake()}setBreeze(t){this.move.breeze=t;for(let e of this.cloths)e.cloth.wind=t?2.2:0;this.wake()}twirl(){this.move.twirl={t:0,from:this.move.angle},this.move.spin=!1,this.wake()}wake(){this.clothAwake=240}updateMotion(t){let e=this.move;e.t+=t;let n=e.angle,s=0;if(e.twirl){let a=Math.min(1,(e.twirl.t+=t)/2.6),c=a<.5?2*a*a:1-Math.pow(-2*a+2,2)/2;n=e.twirl.from+c*Math.PI*4,a>=1&&(e.twirl=null)}else if(e.spin)n+=t*.7;else if(e.home!==null){let o=e.home-n;n+=o*Math.min(1,t*5),Math.abs(o)<.002&&(n=e.home,e.home=null)}if(e.sway&&(s=.035*Math.sin(e.t*Math.PI*2/1.4),n+=.012*Math.cos(e.t*Math.PI*2/1.4)),e.angle=n,e.x=s,this.figure.rotation.y=n,this.figure.position.x=s,!this.cloths.length)return;let r=e.spin||e.sway||e.breeze||e.twirl||e.home!==null;if(r&&(this.clothAwake=240),this.clothAwake>0){let o=0;for(let{cloth:a}of this.cloths){a.setFrame(n,s,0);for(let c=0;c<2;c++)o=Math.max(o,a.step(Math.max(1/240,t/2)));a.sync()}!r&&o<2e-5&&this.clothAwake--}}setBackground(t){this.scene.background=new qt(t)}screenshot(){return this.tick(),this.renderer.domElement.toDataURL("image/png")}async exportGLB(){let t=new rn;this.bodyGroup.children.forEach(r=>t.add(new ae(r.geometry,r.material).copy(r,!1)));let e=this.garmentGroup.children.filter(r=>r.material.side===on),n=this.garmentMats[1]?.clone();n&&(n.side=Je),e.forEach(r=>{let o=new ae(r.geometry,n);o.rotation.copy(this.figure.rotation),o.position.copy(this.figure.position),t.add(o)}),this.clothGroup.children.filter(r=>r.material.side===on).forEach(r=>t.add(new ae(r.geometry.clone(),n)));let s=new $i;return new Promise((r,o)=>s.parse(t,a=>r(new Blob([a],{type:"model/gltf-binary"})),o,{binary:!0}))}};function $_(i,t,e){i/=255,t/=255,e/=255;let n=Math.max(i,t,e),s=Math.min(i,t,e),r=n-s,o=0;return r&&(o=n===i?(t-e)/r%6:n===t?(e-i)/r+2:(i-t)/r+4),[(o*60+360)%360,n?r/n:0,n]}function K_(i,t,e){let n=e*t,s=n*(1-Math.abs(i/60%2-1)),r=e-n,[o,a,c]=i<60?[n,s,0]:i<120?[s,n,0]:i<180?[0,n,s]:i<240?[0,s,n]:i<300?[s,0,n]:[n,0,s];return[(o+r)*255,(a+r)*255,(c+r)*255]}var Ha=class{constructor(t,e){this.onChange=e,t.innerHTML=`
      <div class="cp-sv"><canvas></canvas><div class="cp-knob"></div></div>
      <div class="cp-hue"><canvas></canvas><div class="cp-knob"></div></div>
      <div class="cp-row"><span class="cp-chip"></span><label class="cp-hex">#<input maxlength="6" spellcheck="false" aria-label="Hex color code"></label>
        <span class="cp-rgb"></span></div>`,this.sv=t.querySelector(".cp-sv canvas"),this.svKnob=t.querySelector(".cp-sv .cp-knob"),this.hue=t.querySelector(".cp-hue canvas"),this.hueKnob=t.querySelector(".cp-hue .cp-knob"),this.chip=t.querySelector(".cp-chip"),this.hexIn=t.querySelector(".cp-hex input"),this.rgbOut=t.querySelector(".cp-rgb"),this.h=340,this.s=.6,this.v=.9;let n=(s,r)=>{s.addEventListener("pointerdown",o=>{s.setPointerCapture(o.pointerId),r(o);let a=l=>r(l),c=()=>{s.removeEventListener("pointermove",a),s.removeEventListener("pointerup",c),this.emit(!0)};s.addEventListener("pointermove",a),s.addEventListener("pointerup",c)})};n(this.sv.parentElement,s=>{let r=this.sv.getBoundingClientRect();this.s=Math.min(1,Math.max(0,(s.clientX-r.left)/r.width)),this.v=1-Math.min(1,Math.max(0,(s.clientY-r.top)/r.height)),this.update(),this.emit(!1)}),n(this.hue.parentElement,s=>{let r=this.hue.getBoundingClientRect();this.h=Math.min(359.9,Math.max(0,(s.clientX-r.left)/r.width*360)),this.drawSV(),this.update(),this.emit(!1)}),this.hexIn.addEventListener("change",()=>{let s=this.hexIn.value.trim().replace("#","");/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s)?(this.set("#"+s),this.emit(!0)):this.update()}),new ResizeObserver(()=>this.drawAll()).observe(t)}get hex(){let[t,e,n]=K_(this.h,this.s,this.v);return Xr(t,e,n)}set(t){let[e,n,s]=es(t),[r,o,a]=$_(e,n,s);o>.01&&a>.01&&(this.h=r),this.s=o,this.v=a,this.drawSV(),this.update()}emit(t){this.onChange(this.hex,t)}drawAll(){this.drawSV(),this.drawHue(),this.update()}drawSV(){let t=this.sv,e=t.clientWidth,n=t.clientHeight;if(!e)return;t.width=e,t.height=n;let s=t.getContext("2d");s.fillStyle=`hsl(${this.h},100%,50%)`,s.fillRect(0,0,e,n);let r=s.createLinearGradient(0,0,e,0);r.addColorStop(0,"#fff"),r.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=r,s.fillRect(0,0,e,n),r=s.createLinearGradient(0,0,0,n),r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(1,"#000"),s.fillStyle=r,s.fillRect(0,0,e,n)}drawHue(){let t=this.hue,e=t.clientWidth,n=t.clientHeight;if(!e)return;t.width=e,t.height=n;let s=t.getContext("2d"),r=s.createLinearGradient(0,0,e,0);for(let o=0;o<=6;o++)r.addColorStop(o/6,`hsl(${o*60},100%,50%)`);s.fillStyle=r,s.fillRect(0,0,e,n)}update(){let t=this.hex,[e,n,s]=es(t);this.svKnob.style.left=this.s*100+"%",this.svKnob.style.top=(1-this.v)*100+"%",this.svKnob.style.background=t,this.hueKnob.style.left=this.h/360*100+"%",this.chip.style.background=t,document.activeElement!==this.hexIn&&(this.hexIn.value=t.slice(1).toUpperCase()),this.rgbOut.textContent=`R ${e}  G ${n}  B ${s}`}};var Cd=[{id:"dress",name:"A-line dress"},{id:"gown",name:"Ball gown"},{id:"top",name:"T-shirt"},{id:"skirt",name:"Skirt"},{id:"pants",name:"Trousers"},{id:"mini",name:"Mini dress",icon:"dress"},{id:"mermaid",name:"Mermaid gown",icon:"gown"},{id:"jumpsuit",name:"Jumpsuit",icon:"pants"},{id:"shorts",name:"Shorts",icon:"shorts"},{id:"tank",name:"Tank top",icon:"top"},{id:"crop",name:"Crop top",icon:"top"},{id:"blouse",name:"Bell-sleeve blouse",icon:"blouse"},{id:"peplum",name:"Peplum top",icon:"top"},{id:"jacket",name:"Blazer",icon:"jacket"},{id:"coat",name:"Long coat",icon:"jacket"},{id:"wideleg",name:"Wide-leg trousers",icon:"pants"},{id:"pleated",name:"Pleated skirt",icon:"skirt"}];function Ki(i,t,e){e&&(t=[...t,t[0],t[1]]),i.moveTo(t[0][0],t[0][1]);for(let n=1;n<t.length-1;n++){let s=(t[n][0]+t[n+1][0])/2,r=(t[n][1]+t[n+1][1])/2;i.quadraticCurveTo(t[n][0],t[n][1],s,r)}e||i.lineTo(t[t.length-1][0],t[t.length-1][1])}function Id(i,t,e,n){let s=(u,f)=>e.toBoard(u,f),r=t.y,o=t.half,a=t.H;if(Rd[i]){Rd[i]({P:s,y:r,h:o,H:a,spec:t,viewer:e,ctx:n});return}let c=u=>[...u,...u.slice().reverse().map(([f,g])=>[-f,g])],l=o.shoulder,d=o.neck*2,h=[[-l*.8,r.shoulder-.004],[-o.bust-.004,r.armpit-.015],[-o.bust-.012,r.bust],[-o.waist-.012,r.waist]];if(n.beginPath(),i==="dress"){let u=r.knee+.04,f=[[-d,r.neckBase+.002],...h,[-o.hip-.02,r.hip],[-o.hip-.1,(r.hip+u)/2],[-o.hip-.15,u]],g=c(f).map(([E,R])=>s(E,R));Ki(n,g.slice(0,g.length/2),!1);let[_,m]=[s(-o.hip-.15,u),s(o.hip+.15,u)],p=s(0,u-.025);n.quadraticCurveTo(p[0],p[1],m[0],m[1]),Ki(n,g.slice(g.length/2),!1);let w=s(-d,r.neckBase+.002),T=s(0,r.neckBase-.075);n.quadraticCurveTo(T[0],T[1],w[0],w[1]),n.stroke(),n.beginPath();let x=s(-o.waist-.012,r.waist),A=s(o.waist+.012,r.waist);n.moveTo(x[0],x[1]),n.lineTo(A[0],A[1]),n.stroke()}else if(i==="gown"){let u=r.bust+.045,f=.012,g=o.hip+.32,m=[[-o.bust-.006,u],[-o.bust-.01,r.bust],[-o.waist-.01,r.waist],[-o.hip-.05,r.hip],[-o.hip-.2,(r.hip+f)/2],[-g,f+.03]].map(([I,L])=>s(I,L)),p=s(0,r.bust+.012),w=s(-o.bust*.5,u+.018),T=s(o.bust*.5,u+.018),x=s(-o.bust-.006,u),A=s(o.bust+.006,u);n.moveTo(p[0],p[1]),n.quadraticCurveTo(w[0],w[1]-20,x[0],x[1]),Ki(n,m,!1);let E=s(-g,f+.03),R=s(0,f-.015),P=s(g,f+.03);n.quadraticCurveTo(R[0],R[1],P[0],P[1]),Ki(n,m.slice().reverse().map(([I,L])=>[2*s(0,0)[0]-I,L]),!1),n.quadraticCurveTo(T[0],T[1]-20,p[0],p[1]),n.stroke(),n.beginPath();let M=s(-o.waist-.01,r.waist),v=s(o.waist+.01,r.waist);n.moveTo(M[0],M[1]),n.lineTo(v[0],v[1]),n.stroke()}else if(i==="top"){let u=r.hip+.03,f=t.upperR*1.35,g=a*.1,_=A=>{let E=e.armPoint(A,.005),R=e.armPoint(A,g),P=Math.cos(hn)*A,M=Math.sin(hn);return{so:[E.x+P*f,E.y+M*f],eo:[R.x+P*f,R.y+M*f],ei:[R.x-P*f,R.y-M*f]}},m=_(-1),p=_(1),T=[[-d,r.neckBase+.003],[-l*.8,r.shoulder],m.so,m.eo,m.ei,[-o.bust-.02,r.armpit-.03],[-o.waist-.03,r.waist],[-o.hip-.03,u],[o.hip+.03,u],[o.waist+.03,r.waist],[o.bust+.02,r.armpit-.03],p.ei,p.eo,p.so,[l*.8,r.shoulder],[d,r.neckBase+.003]].map(([A,E])=>s(A,E));n.moveTo(T[0][0],T[0][1]);for(let A=1;A<T.length;A++)n.lineTo(T[A][0],T[A][1]);let x=s(0,r.neckBase-.04);n.quadraticCurveTo(x[0],x[1],T[0][0],T[0][1]),n.stroke()}else if(i==="skirt"){let u=r.knee+.07,g=[[-o.waist-.014,r.waist],[-o.hip-.02,r.hip],[-o.hip-.09,u]].map(([x,A])=>s(x,A)),_=s(0,0)[0];Ki(n,g,!1);let m=s(0,u-.02),p=s(o.hip+.09,u);n.quadraticCurveTo(m[0],m[1],p[0],p[1]),Ki(n,g.slice().reverse().map(([x,A])=>[2*_-x,A]),!1),n.closePath(),n.stroke(),n.beginPath();let w=s(-o.waist-.014,r.waist-.035),T=s(o.waist+.014,r.waist-.035);n.moveTo(w[0],w[1]),n.lineTo(T[0],T[1]),n.stroke()}else if(i==="pants"){let u=t.leg[7],f=r.ankle+.025,g=u.x+u.r+.035,_=Math.max(.01,u.x-u.r-.03),p=[[-o.waist-.014,r.waist],[-o.hip-.02,r.hip],[-(t.legX+t.leg[1].r)-.02,r.crotch-.02],[-g,r.knee],[-g,f],[-_,f],[-_+.005,r.knee],[0,r.crotch-.015],[_-.005,r.knee],[_,f],[g,f],[g,r.knee],[t.legX+t.leg[1].r+.02,r.crotch-.02],[o.hip+.02,r.hip],[o.waist+.014,r.waist]].map(([x,A])=>s(x,A));n.moveTo(p[0][0],p[0][1]);for(let x=1;x<p.length;x++)n.lineTo(p[x][0],p[x][1]);n.closePath(),n.stroke(),n.beginPath();let w=s(-o.waist-.014,r.waist-.035),T=s(o.waist+.014,r.waist-.035);n.moveTo(w[0],w[1]),n.lineTo(T[0],T[1]),n.stroke()}}function _n(i,t,{neckDepth:e=.05,round:n=!1}={}){let{P:s,ctx:r}=i,o=t.slice().reverse().map(([d,h])=>[-d,h]),a=[...t,...o].map(([d,h])=>s(d,h));if(r.beginPath(),n)Ki(r,a,!1);else{r.moveTo(a[0][0],a[0][1]);for(let d=1;d<a.length;d++)r.lineTo(a[d][0],a[d][1])}let c=a[0],l=s(0,t[0][1]-e);r.quadraticCurveTo(l[0],l[1],c[0],c[1]),r.stroke()}function Ge(i,t,e){let n=i.P(t[0],t[1]),s=i.P(e[0],e[1]);i.ctx.beginPath(),i.ctx.moveTo(n[0],n[1]),i.ctx.lineTo(s[0],s[1]),i.ctx.stroke()}function Va(i,t,e,n){let s=i.viewer.armPoint(-1,.005),r=i.viewer.armPoint(-1,t),o=-Math.cos(hn),a=Math.sin(hn);return[[s.x+o*e,s.y+a*e],[r.x+o*n,r.y+a*n],[r.x-o*n,r.y-a*n]]}var Ga=i=>{let t=i.spec.leg;return{thigh:i.spec.legX+t[1].r,ank:t[7]}},Nr=(i,{neck:t=2,shoulder:e=.8,armDrop:n=.03}={})=>[[-i.h.neck*t,i.y.neckBase+.003],[-i.h.shoulder*e,i.y.shoulder]],Rd={mini(i){let{y:t,h:e,H:n}=i,s=t.crotch-.07*n;_n(i,[...Nr(i),[-e.bust-.004,t.armpit-.015],[-e.bust-.012,t.bust],[-e.waist-.012,t.waist],[-e.hip-.02,t.hip],[-e.hip-.06,s]],{neckDepth:.06,round:!0})},mermaid(i){let{y:t,h:e}=i,{thigh:n}=Ga(i),s=t.knee+.03;_n(i,[[-e.bust-.004,t.bust+.05],[-e.bust-.01,t.bust],[-e.waist-.01,t.waist],[-e.hip-.012,t.hip],[-n-.01,t.crotch-.04],[-n-.005,s],[-e.hip-.12,(s+.02)/2],[-e.hip-.24,.02]],{neckDepth:.035,round:!0}),Ge(i,[-e.waist-.01,t.waist],[e.waist+.01,t.waist])},jumpsuit(i){let{y:t,h:e}=i,{ank:n}=Ga(i),s=t.ankle+.025,r=n.x+n.r+.05,o=Math.max(.012,n.x-n.r-.04);_n(i,[...Nr(i,{shoulder:.7}),[-e.bust-.01,t.armpit-.02],[-e.bust-.014,t.bust],[-e.waist-.016,t.waist],[-e.hip-.025,t.hip],[-r,t.knee],[-r,s],[-o,s],[-o+.004,t.knee],[0,t.crotch-.015]],{neckDepth:.09}),Ge(i,[-e.waist-.016,t.waist],[e.waist+.016,t.waist])},shorts(i){let{y:t,h:e,H:n}=i,{thigh:s}=Ga(i),r=t.crotch-.1*n,o=i.spec.legX;_n(i,[[-e.waist-.014,t.waist],[-e.hip-.02,t.hip],[-s-.035,r],[-Math.max(.01,o-i.spec.leg[2].r-.025),r],[0,t.crotch-.012]],{neckDepth:0}),Ge(i,[-e.waist-.014,t.waist-.035],[e.waist+.014,t.waist-.035])},tank(i){let{y:t,h:e}=i;_n(i,[[-e.neck*2.3,t.neckBase],[-e.shoulder*.55,t.shoulder+.004],[-e.bust-.006,t.armpit-.035],[-e.bust-.016,t.bust],[-e.waist-.02,t.waist],[-e.hip-.03,t.hip+.02]],{neckDepth:.11})},crop(i){let{y:t,h:e,H:n}=i,[s,r,o]=Va(i,n*.075,i.spec.upperR*1.3,i.spec.upperR*1.3);_n(i,[...Nr(i),s,r,o,[-e.bust-.02,t.armpit-.03],[-e.bust-.02,t.bust-.02],[-e.waist-.03,t.waist+.035]],{neckDepth:.035})},blouse(i){let{y:t,h:e}=i,[n,s,r]=Va(i,i.spec.armLen*.97,i.spec.upperR*1.2,.11);_n(i,[...Nr(i),n,s,r,[-e.bust-.03,t.armpit-.04],[-e.bust-.035,t.bust-.02],[-e.waist-.04,t.waist],[-e.hip-.05,t.hip+.015]],{neckDepth:.06})},peplum(i){let{y:t,h:e}=i;_n(i,[...Nr(i,{shoulder:.65}),[-e.bust-.004,t.armpit-.02],[-e.bust-.01,t.bust],[-e.waist-.01,t.waist],[-e.hip-.08,t.hip+.005]],{neckDepth:.05,round:!0}),Ge(i,[-e.waist-.01,t.waist],[e.waist+.01,t.waist])},jacket(i){let{y:t,h:e}=i,[n,s,r]=Va(i,i.spec.armLen*.97,i.spec.upperR*1.3,i.spec.upperR*.95),o=t.hip-.01;_n(i,[[-e.neck*1.6,t.neckBase+.01],[-e.shoulder*.95,t.shoulder+.004],n,s,r,[-e.bust-.025,t.armpit-.03],[-e.bust-.028,t.bust],[-e.waist-.022,t.waist],[-e.hip-.03,o]],{neckDepth:.02}),Ge(i,[-e.neck*1.6,t.neckBase+.01],[-.012,t.bust-.07]),Ge(i,[e.neck*1.6,t.neckBase+.01],[.012,t.bust-.07]),Ge(i,[-.012,t.bust-.07],[-.012,o]),Ge(i,[-e.bust*.55,t.bust+.04],[-.012,t.bust-.02]),Ge(i,[e.bust*.55,t.bust+.04],[.012,t.bust-.02])},coat(i){let{y:t,h:e}=i,[n,s,r]=Va(i,i.spec.armLen*.99,i.spec.upperR*1.4,i.spec.upperR*1.1),o=t.knee-.02;_n(i,[[-e.neck*1.7,t.neckBase+.01],[-e.shoulder*1,t.shoulder+.004],n,s,r,[-e.bust-.035,t.armpit-.03],[-e.bust-.038,t.bust],[-e.waist-.04,t.waist],[-e.hip-.05,t.hip],[-e.hip-.1,o]],{neckDepth:.02}),Ge(i,[-e.neck*1.7,t.neckBase+.01],[-.012,t.bust-.06]),Ge(i,[e.neck*1.7,t.neckBase+.01],[.012,t.bust-.06]),Ge(i,[-.012,t.bust-.06],[-.012,o]),Ge(i,[-e.waist-.04,t.waist],[e.waist+.04,t.waist])},wideleg(i){let{y:t,h:e}=i,{ank:n}=Ga(i),s=t.ankle+.015,r=n.x+n.r+.1,o=.012;_n(i,[[-e.waist-.014,t.waist],[-e.hip-.025,t.hip],[-r+.04,t.knee],[-r,s],[-o,s],[-o,t.knee],[0,t.crotch-.015]],{neckDepth:0}),Ge(i,[-e.waist-.014,t.waist-.04],[e.waist+.014,t.waist-.04])},pleated(i){let{y:t,h:e}=i,n=t.knee+.03,s=e.hip+.13;_n(i,[[-e.waist-.014,t.waist],[-e.hip-.03,t.hip],[-s,n]],{neckDepth:0}),Ge(i,[-e.waist-.014,t.waist-.035],[e.waist+.014,t.waist-.035]);for(let r=-3;r<=3;r++){if(!r)continue;let o=r/4;Ge(i,[o*e.waist,t.waist-.035],[o*s,n+.004])}}};var J_="atelier-studio",Jl="designs",Kl=null;function j_(){return Kl||(Kl=new Promise((i,t)=>{let e=indexedDB.open(J_,1);e.onupgradeneeded=()=>e.result.createObjectStore(Jl,{keyPath:"id"}),e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error)})),Kl}async function Wa(i,t){let e=await j_();return new Promise((n,s)=>{let r=e.transaction(Jl,i),o=r.objectStore(Jl),a=t(o);r.oncomplete=()=>n(a?.result),r.onerror=()=>s(r.error)})}var Gs=i=>Wa("readwrite",t=>t.put(i)),jl=i=>Wa("readonly",t=>t.get(i)),Pd=i=>Wa("readwrite",t=>t.delete(i));async function Ld(){return(await Wa("readonly",t=>t.getAll())||[]).sort((t,e)=>e.updated-t.updated)}var Xa=()=>"d"+Date.now().toString(36)+Math.random().toString(36).slice(2,7),Dd=["color","mat","lines","bcolor","bmat","blines"],Q_=i=>new Promise(t=>{let e=new FileReader;e.onload=()=>t(e.result),e.readAsDataURL(i)}),tx=async i=>(await fetch(i)).blob();async function Ql(i){let t={app:"Atelier Studio",version:1,name:i.name,created:i.created,updated:i.updated,body:i.body,portfolio:!!i.portfolio,notes:i.notes||"",fills:i.fills||{},fit:i.fit||null,layers:{}};for(let e of Dd)i.layers?.[e]&&(t.layers[e]=await Q_(i.layers[e]));return new Blob([JSON.stringify(t)],{type:"application/json"})}async function th(i){let t=JSON.parse(i);if(t.app!=="Atelier Studio")throw new Error("This is not an Atelier Studio design file.");let e={};for(let n of Dd)t.layers?.[n]&&(e[n]=await tx(t.layers[n]));return{id:Xa(),name:t.name||"Imported design",created:t.created||Date.now(),updated:Date.now(),body:t.body,portfolio:!!t.portfolio,notes:t.notes||"",fills:t.fills||{},fit:t.fit||null,layers:e}}var nx={pencil:'<path d="M4 20l4-1L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4z"/><path d="M14 7l3 3"/>',cube:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9"/>',camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/>',grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',star:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8-4.3-4.1 5.9-.8z"/>',starFill:'<path fill="currentColor" d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8-4.3-4.1 5.9-.8z"/>',more:'<circle cx="5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="19" cy="12" r="1.4" fill="currentColor"/>',plus:'<path d="M12 5v14M5 12h14"/>',folder:'<path d="M3 7h6l2 2h10v10H3z"/>',save:'<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',image:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>',trash:'<path d="M5 7h14M10 7V4h4v3M6 7l1 13h10l1-13"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',bucket:'<path d="M5 11l7-7 7 7-7 7z"/><path d="M5 11h14"/><path d="M20 15s2 2.3 2 3.5a2 2 0 0 1-4 0c0-1.2 2-3.5 2-3.5z"/>',brush:'<path d="M14 4l6 6-7.5 7.5-6-6z"/><path d="M6.5 11.5C4 12 3 14 3 16c0 2-1 3-1 3s4 1 6-1c1.5-1.5 1-3.5 1-3.5"/>',pen:'<path d="M3 21l3-1 12-12-2-2L4 18z"/><path d="M14 6l2-2 4 4-2 2"/>',eraser:'<path d="M8 20h12"/><path d="M4 15l9-9 6 6-7 7H8z"/><path d="M9 10l6 6"/>',magic:'<path d="M4 20L16 8"/><path d="M15 4v3M19 8h-3M18 5l-2 2M9 4l.5 1.5L11 6l-1.5.5L9 8l-.5-1.5L7 6l1.5-.5z"/>',dropper:'<path d="M14 4l6 6-2 2-6-6z"/><path d="M12 8l-7 7-1 5 5-1 7-7"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v6M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v8c0 4-2.5 7-6 7-2.5 0-4-1.2-5.5-3.5L3.8 15a1.5 1.5 0 0 1 2.4-1.8L8 15"/>',undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',redo:'<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/>',zoomin:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M11 8v6M8 11h6"/>',zoomout:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M8 11h6"/>',fit:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',figure:'<circle cx="12" cy="4.5" r="2"/><path d="M9 8h6l-1 6 2 7M10 8l1 6-2 7M9 8l-3 6M15 8l3 6"/>',spin:'<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v4h-4"/>',dress:'<path d="M9 3l-1 4 2 3-5 11h14L14 10l2-3-1-4"/><path d="M9 3c1 1.5 5 1.5 6 0M8 10h8"/>',gown:'<path d="M9 4c1 2 5 2 6 0l-.5 5H9.5z"/><path d="M9.5 9L3 21h18L14.5 9"/>',top:'<path d="M8 4L3 7l2 4 2-1v10h10V10l2 1 2-4-5-3c-1 2-7 2-8 0z"/>',skirt:'<path d="M8 5h8l4 15H4z"/><path d="M8 8h8"/>',pants:'<path d="M7 4h10l2 17h-5l-2-11-2 11H5z"/><path d="M7 7h10"/>',shorts:'<path d="M6 5h12l2 11h-6l-2-5-2 5H4z"/><path d="M6 8h12"/>',blouse:'<path d="M9 4l-4 3-3 12 4 1 3-9v10h6V11l3 9 4-1-3-12-4-3c-1 2-5 2-6 0z"/>',jacket:'<path d="M9 4L5 6 3 20h3l2-9v10h8V11l2 9h3L19 6l-4-2-3 5z"/><path d="M12 9v12"/>',copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',download:'<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>'};function jn(i){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${nx[i]||""}</svg>`}function Ud(i=document){i.querySelectorAll(".i[data-i]").forEach(t=>{t.firstChild||(t.innerHTML=jn(t.dataset.i))})}var K=(i,t=document)=>t.querySelector(i),qe=(i,t=document)=>[...t.querySelectorAll(i)],Ye={get:(i,t)=>{try{let e=localStorage.getItem("atelier."+i);return e===null?t:JSON.parse(e)}catch{return t}},set:(i,t)=>{try{localStorage.setItem("atelier."+i,JSON.stringify(t))}catch{}}};Ud();var st=new qr(K("#board")),ve=new za(K("#view3d")),Pe="sketch",ye=null,pe=Yl(),Or=null,ti=Ye.get("units","in");function Le(i,t=3200){let e=document.createElement("div");e.className="toast",e.textContent=i,K("#toasts").appendChild(e),setTimeout(()=>e.remove(),t)}st.onToast=Le;async function ih(i,t){let e=document.createElement("div");e.className="busy",e.textContent=i,document.body.appendChild(e),await new Promise(n=>requestAnimationFrame(()=>setTimeout(n,20)));try{return await t()}finally{e.remove()}}function Fr(i,t){let e=document.createElement("a");e.href=URL.createObjectURL(i),e.download=t,document.body.appendChild(e),e.click(),e.remove(),setTimeout(()=>URL.revokeObjectURL(e.href),4e3)}var qa=()=>(ye?.name||"design").replace(/[^\w\- ]+/g,"").trim().replace(/\s+/g,"-")||"design";function sh(i=!0){Or=ve.setBody(pe,rt,Tt),st.guides.front=ve.renderGuide(rt/2,Tt/2,"front"),st.guides.back=ve.renderGuide(rt/2,Tt/2,"back"),st.dirty=!0,i&&Pe==="3d"&&An(),Bd(),qs()}function Bd(){qe("#bodyType button").forEach(s=>s.classList.toggle("on",s.dataset.v===pe.type));let i=Object.keys(Dr[pe.type].sizes);K("#bodySize").innerHTML=i.map(s=>`<button data-v="${s}" class="${s===pe.size?"on":""}">${pe.type==="kids",s}</button>`).join(""),qe(".height-row").forEach(s=>{s.hidden=pe.type==="kids"}),qe("#bodyHeight button").forEach(s=>s.classList.toggle("on",s.dataset.v===pe.height)),K("#skinTones").innerHTML=Ur.map(s=>`<button class="chip ${s.id===pe.skin?"on":""}" data-v="${s.id}" title="${s.name}" style="background:${s.color}"></button>`).join("");let t=Ba(pe),e=[["height","Height"],["bust",pe.type==="women"?"Bust":"Chest"],["waist","Waist"],["hip","Hip"]],n=K("#customBody");n.contains(document.activeElement)||(n.innerHTML=e.map(([s,r])=>`<label>${r} (${ti})<input type="number" step="0.5" data-k="${s}" value="${rh(t[s])}"></label>`).join(""))}K("#bodyType").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(pe.type=t,pe.size=Object.keys(Dr[t].sizes)[2],pe.custom=null,Xs())});K("#bodySize").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(pe.size=t,pe.custom=null,Xs())});K("#bodyHeight").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(pe.height=t,Xs())});K("#skinTones").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(pe.skin=t,Xs())});K("#customBody").addEventListener("change",i=>{let t=i.target.dataset.k;if(!t)return;let e=parseFloat(i.target.value);if(!(e>0))return;let n=ti==="in"?e*2.54:e,s={height:[80,230],bust:[40,180],waist:[35,170],hip:[40,180]}[t];pe.custom={...pe.custom||{},[t]:Math.min(s[1],Math.max(s[0],n))},Xs()});K("#customReset").addEventListener("click",()=>{pe.custom=null,K("#customBody").innerHTML="",Xs()});function Xs(){sh(!0),zr()}function rh(i){return ti==="in"?(Math.round(i/2.54*4)/4).toString():(Math.round(i*2)/2).toString()}var Ws=i=>i==null?null:`${rh(i)} ${ti==="in"?"in":"cm"}`;function qs(){if(K("#measTable").contains(document.activeElement))return;let i=Ba(pe),t=Pe==="3d"&&ve.measure||{},e=ti==="in"?"in":"cm",n=(a,c)=>`<tr><td>${a}</td><td class="${c==null?"na":""}">${c??"\u2013"}</td></tr>`,s=(a,c)=>t[c]==null?n(a,null):`<tr><td>${a}${kr()[c]?' <span class="changed" title="Changed from the drawing">\u2022</span>':""}</td><td><input class="meas-in" type="number" step="${ti==="in"?.25:.5}" data-k="${c}" value="${rh(t[c])}"> ${e}</td></tr>`,r=pe.type==="women"?"Bust":"Chest",o='<tr><th colspan="2">Mannequin</th></tr>'+n("Height",Ws(i.height))+n(r,Ws(i.bust))+n("Waist",Ws(i.waist))+n("Hip",Ws(i.hip))+n("Shoulder width",Ws(i.shoulder))+n("Inseam",Ws(i.inseam));o+=`<tr><th colspan="2">Garment${Pe==="3d"?"":" (open 3D to measure)"}</th></tr>`+s(r,"bust")+s("Waist","waist")+s("Hip","hip")+s("Length","length")+s("Hem around","hem")+s("Sleeve","sleeve")+s("Inseam","inseam"),K("#measTable").innerHTML=o,K("#fitReset").hidden=!Object.values(kr()).some(Boolean)}var kr=()=>ye?ye.fit=ye.fit||{}:{};K("#measTable").addEventListener("change",i=>{let t=i.target.dataset.k,e=ve.measure?.[t];if(!t||e==null)return;let n=parseFloat(i.target.value);if(!(n>0)){qs();return}let s=ti==="in"?n*2.54:n,r=kr();if(Math.abs(s-e)<.3)return;let o=t==="length"&&ve.measure.lengthIsLegs?"inseam":t;r[o]=Math.round(((r[o]||0)+s-e)*10)/10,ve.setFit(r),An(),zr(),Le("Garment updated to the new measurement.")});K("#measTable").addEventListener("keydown",i=>{i.key==="Enter"&&i.target.blur()});K("#fitReset").addEventListener("click",()=>{ye&&(ye.fit={},ve.setFit({}),Pe==="3d"?An():qs(),zr())});K("#units").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(ti=t,Ye.set("units",t),qe("#units button").forEach(e=>e.classList.toggle("on",e.dataset.v===t)),K("#customBody").innerHTML="",Bd(),qs())});qe("#units button").forEach(i=>i.classList.toggle("on",i.dataset.v===ti));var Ya=Ye.get("recent",["#e85d8a","#1d3a8a","#ffffff","#1a1a1a","#d4af37"]),kd=new Ha(K("#colorPicker"),(i,t)=>{$a(i,t,!0)});function $a(i,t=!0,e=!1){st.paint.color=i,e||kd.set(i),t&&(Ya=[i,...Ya.filter(n=>n!==i)].slice(0,12),Ye.set("recent",Ya),zd()),ah(),oh(),Ye.set("paint",st.paint)}function zd(){K("#recent").innerHTML=Ya.map(i=>`<button class="chip" data-c="${i}" style="background:${i}" title="${i}"></button>`).join("")}K("#recent").addEventListener("click",i=>{let t=i.target.dataset.c;t&&$a(t)});K("#palettes").innerHTML=Mh.map(i=>`<div class="palette"><div class="palette-name">${i.name}</div><div class="chips">${i.colors.map(t=>`<button class="chip" data-c="${t}" style="background:${t}" title="${t}"></button>`).join("")}</div></div>`).join("");K("#palettes").addEventListener("click",i=>{let t=i.target.dataset.c;t&&$a(t)});st.onPick=([i,t,e])=>{$a(Xr(i,t,e)),Le("Color picked")};var Nd="";function oh(){let i=st.paint.color+st.paint.fabric;if(i===Nd)return;Nd=i;let t=[...new Set(Wr.map(e=>e.group))];K("#fabricGrid").innerHTML=t.map(e=>`<div class="fab-group">${e}</div><div class="fab-grid">${Wr.filter(n=>n.group===e).map(n=>`<button class="fab ${n.id===st.paint.fabric?"on":""}" data-f="${n.id}" title="${n.name}"><img alt="" src="${ac(n.id,st.paint.color)}">${n.name}</button>`).join("")}</div>`).join("")}K("#fabricGrid").addEventListener("click",i=>{let t=i.target.closest("[data-f]")?.dataset.f;t&&(st.paint.fabric=t,Ye.set("paint",st.paint),oh(),ah(),st.tool!=="fill"&&st.tool!=="brush"&&Pe==="sketch"&&Ji("fill"))});K("#fabricScale").addEventListener("input",i=>{st.paint.scale=+i.target.value,Ye.set("paint",st.paint)});function ah(){K("#paintSwatch").style.backgroundImage=`url(${ac(st.paint.fabric,st.paint.color)})`,K("#paintFabric").textContent=vh[st.paint.fabric]?.name||"Fabric",K("#paintHex").textContent=st.paint.color.toUpperCase()}function Ji(i){st.tool=i,qe(".tools [data-tool]").forEach(t=>t.classList.toggle("on",t.dataset.tool===i)),K("#boardWrap").className="board-wrap tool-"+i}qe(".tools [data-tool]").forEach(i=>i.addEventListener("click",()=>Ji(i.dataset.tool)));K("#btnUndo").addEventListener("click",()=>{st.undo(),Pe==="3d"&&An()});K("#btnRedo").addEventListener("click",()=>{st.redo(),Pe==="3d"&&An()});st.onHistory=(i,t)=>{K("#btnUndo").disabled=!i,K("#btnRedo").disabled=!t};K("#btnZoomIn").addEventListener("click",()=>st.zoomBy(1.25));K("#btnZoomOut").addEventListener("click",()=>st.zoomBy(.8));K("#btnFit").addEventListener("click",()=>st.fit());K("#btnGuide").addEventListener("click",i=>{st.showGuide=!st.showGuide,i.currentTarget.classList.toggle("on",st.showGuide),st.dirty=!0});K("#brushSize").addEventListener("input",i=>{st.brushSize=+i.target.value,st.dirty=!0});K("#gapClose").addEventListener("input",i=>{st.gap=+i.target.value});K("#guideOpacity").addEventListener("input",i=>{st.guideOpacity=+i.target.value,st.dirty=!0});K("#eraseTarget").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(st.eraseTarget=t,qe("#eraseTarget button").forEach(e=>e.classList.toggle("on",e.dataset.v===t)))});var Hd=Cd.map(i=>`<button class="starter" data-s="${i.id}"><span class="i">${jn(i.icon||i.id)}</span>${i.name}</button>`).join("");K("#starters").innerHTML=Hd;K("#starters2").innerHTML=Hd;function ch(i){Vd("front"),st.drawLines(t=>Id(i,Or,ve,t)),ni("#starterModal"),yi(),Ji("fill"),Le("Outline added. Tap inside it with Fill to color it.")}K("#starters").addEventListener("click",i=>{let t=i.target.closest("[data-s]")?.dataset.s;t&&ch(t)});K("#starters2").addEventListener("click",i=>{let t=i.target.closest("[data-s]")?.dataset.s;t&&ch(t)});function Vd(i){st.side!==i&&(st.place&&(K("#placeBar").hidden=!0),st.setSide(i),Ys())}function Ys(){qe("#sideSeg button").forEach(t=>t.classList.toggle("on",t.dataset.v===st.side));let i=st.side==="back";K("#sideNote").hidden=!i,K("#sideNote").textContent=st.backLinked?"The back matches the front. Draw or color here to change it.":"The back has its own design.",K("#btnMatchFront").hidden=!i||st.backLinked}K("#sideSeg").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&Vd(t)});K("#btnMatchFront").addEventListener("click",()=>{confirm("Make the back match the front again? The back design will be replaced.")&&(st.linkBack(),Ys())});function ei(i){if(i!==Pe){if(st.place){Le("Place or cancel the drawing first.");return}if(Pe=i,document.body.classList.toggle("mode3d",i==="3d"),document.body.classList.toggle("modesketch",i==="sketch"),qe(".mode button").forEach(t=>{t.classList.toggle("on",t.dataset.mode===i),t.setAttribute("aria-selected",t.dataset.mode===i)}),K("#boardWrap").hidden=i==="3d",K("#view3d").hidden=i!=="3d",K("#viewBtns").hidden=i!=="3d",K("#hint3d").hidden=i!=="3d",ve.setVisible(i==="3d"),i==="3d"){if(!st.hasColor()&&st.hasLines()){let t=st.side;st.useSide("front");let e=st.autoFillGarment();st.useSide(t),e&&Le("Your outline was filled in white so you can see it in 3D. Pick a fabric and tap the garment to change it.",5e3)}else st.hasColor()||Le("Nothing to show yet. Color a design in Sketch first.",4e3);An()}else st.dirty=!0;yi(),qs(),Ye.set("mode",i)}}qe(".mode button").forEach(i=>i.addEventListener("click",()=>ei(i.dataset.mode)));function An(){ve.setFit(kr()),ve.setDesign(st.textureAtlas(),st.alphaGrid()),qs()}K("#viewBtns").addEventListener("click",i=>{let t=i.target.closest("button");if(t){if(t.id==="btnSpin"){let e=!t.classList.contains("on");t.classList.toggle("on",e),ve.setAutoRotate(e);return}if(t.id==="btnTwirl"){K("#btnSpin").classList.remove("on"),ve.twirl();return}if(t.id==="btnSway"){let e=!t.classList.contains("on");t.classList.toggle("on",e),ve.setSway(e);return}if(t.id==="btnBreeze"){let e=!t.classList.contains("on");t.classList.toggle("on",e),ve.setBreeze(e);return}K("#btnSpin").classList.remove("on"),ve.view(t.dataset.view)}});{let i=K("#view3d"),t=null;i.addEventListener("pointerdown",e=>{t={x:e.clientX,y:e.clientY,t:performance.now()}}),i.addEventListener("pointerup",e=>{if(!t)return;let n=t;if(t=null,Math.hypot(e.clientX-n.x,e.clientY-n.y)>6||performance.now()-n.t>600)return;let s=ve.pick(e.clientX,e.clientY);if(!s)return;let r=s.side,o=s.x;r==="back"&&st.backLinked&&(r="front",o=rt-1-o);let a=st.side;st.useSide(r);let c=st.fillAt(o,s.y);st.useSide(a),c&&(An(),Ys())})}var Gd=["#efe9e2","#ffffff","#e6eef5","#f3e1e7","#2b2228","#111114"];K("#bgChips").innerHTML=Gd.map(i=>`<button class="chip" data-c="${i}" style="background:${i}"></button>`).join("");K("#bgChips").addEventListener("click",i=>{let t=i.target.dataset.c;t&&(ve.setBackground(t),Ye.set("bg",t))});ve.setBackground(Ye.get("bg",Gd[0]));var On=null;function zr(){clearTimeout(On),On=setTimeout(Bn,1200)}async function Bn(){if(clearTimeout(On),!ye)return;ye.updated=Date.now(),ye.body={...pe},ye.name=K("#designName").value.trim()||"Untitled design";let i=await st.layerBlobs(),t=await new Promise(e=>st.composite(360).toBlob(e,"image/jpeg",.85));try{await Gs({...ye,layers:i,thumb:t,fills:{...st.fillFabric},fit:{...kr()}}),Ye.set("last",ye.id)}catch(e){console.error(e),Le("Could not save on this device: "+(e.message||e))}}st.onChange=()=>{zr(),yi(),Ys()};K("#designName").addEventListener("change",zr);K("#designName").addEventListener("keydown",i=>{i.key==="Enter"&&i.target.blur()});window.addEventListener("beforeunload",()=>{On&&Bn()});document.addEventListener("visibilitychange",()=>{document.hidden&&On&&Bn()});async function Ka(){On&&await Bn(),ye={id:Xa(),name:"Untitled design",created:Date.now(),updated:Date.now(),body:{...pe},portfolio:!1,fit:{}},Qa=!1,K("#designName").value=ye.name,await st.loadLayers({}),Ys(),ja(),ei("sketch"),yi()}async function Ja(i){On&&await Bn(),ye={id:i.id,name:i.name,created:i.created,updated:i.updated,body:i.body,portfolio:!!i.portfolio,notes:i.notes||"",fit:{...i.fit||{}}},i.body&&(pe={...Yl(),...i.body},sh(!1)),K("#designName").value=i.name,await st.loadLayers({...i.layers||{},fills:i.fills}),Ys(),ja(),yi(),Pe==="3d"&&An(),Ye.set("last",i.id)}function ja(){let i=K("#btnPortfolio"),t=!!ye?.portfolio;i.classList.toggle("starred",t),i.querySelector(".i").innerHTML=jn(t?"starFill":"star"),i.title=t?"In your portfolio (click to remove)":"Add this design to your portfolio"}K("#btnPortfolio").addEventListener("click",()=>{ye&&(ye.portfolio=!ye.portfolio,ja(),Bn(),Le(ye.portfolio?"Added to your portfolio.":"Removed from your portfolio."))});function yi(){let i=Pe==="sketch"&&!st.place&&!st.hasLines()&&!st.hasColor()&&!Qa;K("#welcome").hidden=!i}var Qa=!1;K("#welcome").addEventListener("click",i=>{let t=i.target.closest("[data-w]")?.dataset.w;t&&(t==="snap"?hh():t==="upload"?K("#fileImage").click():t==="starter"?Hr("#starterModal"):(Qa=!0,yi(),Ji("brush")))});function Hr(i){K(i).hidden=!1}function ni(i){K(i).hidden=!0,i==="#cameraModal"&&qd()}qe(".modal").forEach(i=>i.addEventListener("click",t=>{(t.target===i||t.target.closest("[data-close]"))&&ni("#"+i.id)}));var Qn=null;async function Wd(i){Qn={src:i};let t=Th(i),e=t>.12;K(`input[name=impMode][value=${e?"color":"lines"}]`).checked=!0,K("#impColorNote").textContent=e?"Looks like your drawing is colored in, so its colors will come in too.":"Looks like a pencil or ink drawing. It will come in as clean outlines.";let n=K("#impOrig");n.width=i.width,n.height=i.height,n.getContext("2d").drawImage(i,0,0),Hr("#importModal"),await lh()}async function lh(){if(!Qn)return;let i=K("input[name=impMode]:checked").value==="color",t=+K("#impStrength").value;Qn.result=await ih("Cleaning up your drawing\u2026",()=>Eh(Qn.src,{strength:t,keepColor:i}));let e=K("#impOut"),n=Qn.result;e.width=n.lines.width,e.height=n.lines.height;let s=e.getContext("2d");s.clearRect(0,0,e.width,e.height),n.color&&s.drawImage(n.color,0,0),s.drawImage(n.lines,0,0)}var Fd=null;qe("input[name=impMode]").forEach(i=>i.addEventListener("change",lh));K("#impStrength").addEventListener("input",()=>{clearTimeout(Fd),Fd=setTimeout(lh,350)});function Od(i,t){let e=document.createElement("canvas");return e.width=t.w,e.height=t.h,e.getContext("2d").drawImage(i,t.x,t.y,t.w,t.h,0,0,t.w,t.h),e}function Xd(i){let t=Qn.result,e=Ah(t.lines,t.color),n=6,s={x:Math.max(0,e.x-n),y:Math.max(0,e.y-n)};s.w=Math.min(t.lines.width-s.x,e.w+n*2),s.h=Math.min(t.lines.height-s.y,e.h+n*2);let r=Od(t.lines,s),o=t.color?Od(t.color,s):null,a=s.h/s.w>2.1,[,c]=ve.toBoard(0,a?Or.H:Or.y.neckBase+.01),[,l]=ve.toBoard(0,a?0:Or.y.knee),d={x:40,y:c,w:rt-80,h:l-c};if(ni("#importModal"),Qn=null,Pe==="3d"&&ei("sketch"),Qa=!0,st.startPlace(r,o,d),i){st.commitPlace(),ei("3d"),Le("Showing your drawing in 3D. Switch back to Sketch to adjust it.");return}K("#placeBar").hidden=!1,yi()}K("#impPlace").addEventListener("click",()=>Qn?.result&&Xd(!1));K("#impTo3D").addEventListener("click",()=>Qn?.result&&Xd(!0));K("#placeOk").addEventListener("click",()=>{st.commitPlace(),K("#placeBar").hidden=!0,Ji("fill"),Le("Placed. Pick a fabric and tap a shape to fill it.")});K("#placeCancel").addEventListener("click",()=>{st.cancelPlace(),K("#placeBar").hidden=!0,yi()});async function tc(i){if(i)try{let t=await ih("Opening picture\u2026",()=>wh(i));Wd(t)}catch(t){Le(t.message||"Could not open that picture.")}}K("#btnUpload").addEventListener("click",()=>K("#fileImage").click());K("#fileImage").addEventListener("change",i=>{tc(i.target.files[0]),i.target.value=""});K("#fileCamera").addEventListener("change",i=>{tc(i.target.files[0]),i.target.value=""});window.addEventListener("dragover",i=>i.preventDefault());window.addEventListener("drop",i=>{i.preventDefault();let t=i.dataTransfer.files[0];t&&(/\.atelier$|json/i.test(t.name+t.type)?Yd(t):tc(t))});window.addEventListener("paste",i=>{let t=[...i.clipboardData?.items||[]].find(e=>e.type.startsWith("image/"));t&&tc(t.getAsFile())});var Za=null,eh="environment";async function hh(){if(!navigator.mediaDevices?.getUserMedia){K("#fileCamera").click();return}Hr("#cameraModal");try{Za=await navigator.mediaDevices.getUserMedia({video:{facingMode:eh,width:{ideal:1920},height:{ideal:1440}},audio:!1});let i=K("#camVideo");i.srcObject=Za,await i.play()}catch{ni("#cameraModal"),Le("No camera available here, so pick a picture instead."),K("#fileCamera").click()}}function qd(){Za?.getTracks().forEach(i=>i.stop()),Za=null}K("#btnSnap").addEventListener("click",hh);K("#camSwitch").addEventListener("click",async()=>{eh=eh==="environment"?"user":"environment",qd(),ni("#cameraModal"),await hh()});K("#camShoot").addEventListener("click",()=>{let i=K("#camVideo");if(!i.videoWidth)return;let t=lc(i,i.videoWidth,i.videoHeight);ni("#cameraModal"),Wd(t)});var nh="all";async function Br(){let i=await Ld(),t=nh==="portfolio"?i.filter(n=>n.portfolio):i,e=K("#designCards");if(e.querySelectorAll("img[data-url]").forEach(n=>URL.revokeObjectURL(n.src)),!t.length){e.innerHTML=`<div class="empty">${nh==="portfolio"?"Nothing in your portfolio yet. Open a design and press the star to add it.":"No saved designs yet."}</div>`;return}e.innerHTML=t.map(n=>`<div class="card ${n.id===ye?.id?"current":""}" data-id="${n.id}">
    <button class="card-img" data-a="open" title="Open">${n.thumb?`<img data-url alt="" src="${URL.createObjectURL(n.thumb)}">`:""}${n.portfolio?`<span class="card-star">${jn("starFill")}</span>`:""}</button>
    <div class="card-meta"><div class="card-name">${ix(n.name)}</div><div class="card-date">${new Date(n.updated).toLocaleDateString()}</div></div>
    <div class="card-acts"><button data-a="star" title="${n.portfolio?"Remove from portfolio":"Add to portfolio"}">${jn(n.portfolio?"starFill":"star")}</button><button data-a="copy" title="Make a copy">${jn("copy")}</button><button data-a="file" title="Save design file">${jn("download")}</button><button data-a="del" title="Delete">${jn("trash")}</button></div></div>`).join("")}var ix=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);K("#btnDesigns").addEventListener("click",async()=>{On&&await Bn(),Hr("#designsModal"),Br()});K("#designFilter").addEventListener("click",i=>{let t=i.target.closest("button")?.dataset.v;t&&(nh=t,qe("#designFilter button").forEach(e=>e.classList.toggle("on",e.dataset.v===t)),Br())});K("#designNew").addEventListener("click",async()=>{ni("#designsModal"),await Ka()});K("#designCards").addEventListener("click",async i=>{let t=i.target.closest("[data-a]")?.dataset.a,e=i.target.closest("[data-id]")?.dataset.id;if(!t||!e)return;let n=await jl(e);if(n){if(t==="open")ni("#designsModal"),await Ja(n);else if(t==="star")n.portfolio=!n.portfolio,await Gs(n),ye?.id===e&&(ye.portfolio=n.portfolio,ja()),Br();else if(t==="copy")await Gs({...n,id:Xa(),name:n.name+" (copy)",created:Date.now(),updated:Date.now()}),Br();else if(t==="file")Fr(await Ql(n),(n.name||"design").replace(/[^\w\- ]+/g,"")+".atelier");else if(t==="del"){if(!confirm(`Delete "${n.name}"? This cannot be undone.`))return;await Pd(e),ye?.id===e&&(clearTimeout(On),On=null,await Ka()),Br()}}});async function Yd(i){try{let t=await th(await i.text());await Gs(t),await Ja(t),Le(`Opened "${t.name}".`)}catch(t){Le(t.message||"Could not open that file.")}}K("#fileProject").addEventListener("change",i=>{let t=i.target.files[0];t&&Yd(t),i.target.value=""});window.atelierDesktop?.onFlush?.(async()=>{try{await Bn()}finally{window.atelierDesktop.flushed()}});window.atelierDesktop?.onOpenFile?.(async(i,t)=>{try{let e=await th(t);await Gs(e),await Ja(e),Le(`Opened "${e.name}".`)}catch(e){Le(e.message||"Could not open that file.")}});K("#btnMore").addEventListener("click",i=>{i.stopPropagation(),K("#moreMenu").hidden=!K("#moreMenu").hidden});document.addEventListener("click",i=>{i.target.closest(".menu-wrap")||(K("#moreMenu").hidden=!0)});K("#moreMenu").addEventListener("click",async i=>{let t=i.target.closest("[data-act]")?.dataset.act;if(t)if(K("#moreMenu").hidden=!0,t==="new")await Ka();else if(t==="open")K("#fileProject").click();else if(t==="save")await Bn(),Fr(await Ql({...ye,body:pe,layers:await st.layerBlobs(),fills:{...st.fillFabric}}),qa()+".atelier");else if(t==="png")st.composite(Tt,"#ffffff",st.side).toBlob(n=>Fr(n,qa()+(st.side==="back"?"-back":"")+"-sketch.png"),"image/png");else if(t==="shot")Pe!=="3d"&&ei("3d"),setTimeout(async()=>Fr(await(await fetch(ve.screenshot())).blob(),qa()+"-3d.png"),120);else if(t==="glb"){Pe!=="3d"&&ei("3d");try{Fr(await ih("Building the 3D model\u2026",()=>ve.exportGLB()),qa()+".glb")}catch(e){Le("Could not export the 3D model: "+(e.message||e))}}else t==="clear"?confirm("Clear everything on the board? You can undo this.")&&(st.clearAll(),Pe==="3d"&&An()):t==="about"&&Hr("#aboutModal")});K("#panelGrip").addEventListener("click",()=>K("#panel").classList.toggle("collapsed"));window.matchMedia("(max-width: 760px)").matches&&K("#panel").classList.add("collapsed");window.addEventListener("keydown",i=>{if(i.target.matches("input, textarea"))return;let t=i.key.toLowerCase();if((i.ctrlKey||i.metaKey)&&t==="z"){i.preventDefault(),i.shiftKey?st.redo():st.undo(),Pe==="3d"&&An();return}if((i.ctrlKey||i.metaKey)&&t==="y"){i.preventDefault(),st.redo(),Pe==="3d"&&An();return}if((i.ctrlKey||i.metaKey)&&t==="s"){i.preventDefault(),Bn().then(()=>Le("Saved on this device."));return}if(i.ctrlKey||i.metaKey||i.altKey)return;if(t===" "){st.spaceDown=!0,K("#boardWrap").classList.add("space-pan"),i.preventDefault();return}if(t==="escape"){qe(".modal").forEach(n=>{n.hidden||ni("#"+n.id)}),st.place&&K("#placeCancel").click();return}if(t==="enter"&&st.place){K("#placeOk").click();return}if(t==="3"&&ei(Pe==="3d"?"sketch":"3d"),Pe!=="sketch")return;let e={f:"fill",b:"brush",p:"pen",e:"eraser",i:"picker",h:"pan"};e[t]&&Ji(e[t]),(t==="+"||t==="=")&&st.zoomBy(1.25),t==="-"&&st.zoomBy(.8),t==="0"&&st.fit()});window.addEventListener("keyup",i=>{i.key===" "&&(st.spaceDown=!1,K("#boardWrap").classList.remove("space-pan"))});(async function(){let t=Ye.get("paint",null);t&&(st.paint={...st.paint,...t}),K("#fabricScale").value=st.paint.scale,kd.set(st.paint.color),zd(),oh(),ah(),Ji("fill"),document.body.classList.add("modesketch"),sh(!1);let e=null;try{let n=Ye.get("last",null);e=n?await jl(n):null}catch{}e?await Ja(e):await Ka(),Ye.get("mode","sketch")==="3d"&&st.hasColor()&&ei("3d"),window.atelierDesktop?.ready?.(),"serviceWorker"in navigator&&location.protocol.startsWith("http")&&navigator.serviceWorker.register("sw.js").catch(()=>{})})();window.atelier={board:st,viewer:ve,get body(){return pe},setMode:ei,useStarter:ch,hexToRgb:es};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
