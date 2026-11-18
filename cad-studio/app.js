var Ot={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},si={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},yh=0,Dl=1,_h=2;var Ll=1,xh=2,Pn=3,Hn=0,Xt=1,xt=2,Wn=0,xi=1,kl=2,Ul=3,Nl=4,vh=5,ei=100,bh=101,Mh=102,Sh=103,wh=104,Eh=200,Th=201,Ah=202,Ch=203,so=204,ro=205,Rh=206,Ph=207,Ih=208,Dh=209,Lh=210,kh=211,Uh=212,Nh=213,Fh=214,Uo=0,No=1,Fo=2,vi=3,Oo=4,Bo=5,zo=6,Ho=7,Fl=0,Oh=1,Bh=2,Xn=0,zh=1,Hh=2,Vh=3,Gh=4,Wh=5,Xh=6,$h=7;var Ol=300,Ci=301,Ri=302,Vo=303,Go=304,gr=306,oo=1e3,Qn=1001,ao=1002,pn=1003,qh=1004;var yr=1005;var bn=1006,Wo=1007;var ri=1008;var En=1009,Bl=1010,zl=1011,ms=1012,Xo=1013,oi=1014,In=1015,gs=1016,$o=1017,qo=1018,ys=1020,Hl=35902,Vl=35899,Gl=1021,Wl=1022,gn=1023,ns=1026,_s=1027,Xl=1028,Yo=1029,$l=1030,Zo=1031;var Jo=1033,_r=33776,xr=33777,vr=33778,br=33779,Ko=35840,jo=35841,Qo=35842,ea=35843,ta=36196,na=37492,ia=37496,sa=37808,ra=37809,oa=37810,aa=37811,la=37812,ca=37813,ha=37814,ua=37815,da=37816,fa=37817,pa=37818,ma=37819,ga=37820,ya=37821,_a=36492,xa=36494,va=36495,ba=36283,Ma=36284,Sa=36285,wa=36286;var zs=2300,lo=2301,io=2302,xl=2400,vl=2401,bl=2402;var Yh=3200,Zh=3201;var ql=0,Jh=1,$n="",nn="srgb",bi="srgb-linear",Hs="linear",Qe="srgb";var _i=7680;var Ml=519,Kh=512,jh=513,Qh=514,Yl=515,eu=516,tu=517,nu=518,iu=519,Sl=35044;var Zl="300 es",vn=2e3,Vs=2001;var An=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Oc=1234567,Qi=Math.PI/180,is=180/Math.PI;function Pi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[s&255]+kt[s>>8&255]+kt[s>>16&255]+kt[s>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function Ve(s,e,t){return Math.max(e,Math.min(t,s))}function Jl(s,e){return(s%e+e)%e}function yd(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function _d(s,e,t){return s!==e?(t-s)/(e-s):0}function Fs(s,e,t){return(1-t)*s+t*e}function xd(s,e,t,n){return Fs(s,e,1-Math.exp(-t*n))}function vd(s,e=1){return e-Math.abs(Jl(s,e*2)-e)}function bd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Md(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Sd(s,e){return s+Math.floor(Math.random()*(e-s+1))}function wd(s,e){return s+Math.random()*(e-s)}function Ed(s){return s*(.5-Math.random())}function Td(s){s!==void 0&&(Oc=s);let e=Oc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ad(s){return s*Qi}function Cd(s){return s*is}function Rd(s){return(s&s-1)===0&&s!==0}function Pd(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Id(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Dd(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),m=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*m,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*m,a*c);break;case"ZYZ":s.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ji(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Gt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Kl={DEG2RAD:Qi,RAD2DEG:is,generateUUID:Pi,clamp:Ve,euclideanModulo:Jl,mapLinear:yd,inverseLerp:_d,lerp:Fs,damp:xd,pingpong:vd,smoothstep:bd,smootherstep:Md,randInt:Sd,randFloat:wd,randFloatSpread:Ed,seededRandom:Td,degToRad:Ad,radToDeg:Cd,isPowerOfTwo:Rd,ceilPowerOfTwo:Pd,floorPowerOfTwo:Id,setQuaternionFromProperEuler:Dd,normalize:Gt,denormalize:ji},oe=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},_t=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],m=r[o+2],y=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=y;return}if(u!==y||l!==d||c!==f||h!==m){let g=1-a,p=l*d+c*f+h*m+u*y,w=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){let T=Math.sqrt(M),A=Math.atan2(T,p*w);g=Math.sin(g*A)/T,a=Math.sin(a*A)/T}let x=a*w;if(l=l*g+d*x,c=c*g+f*x,h=h*g+m*x,u=u*g+y*x,g===1-a){let T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+h*u+l*f-c*d,e[t+1]=l*m+h*d+c*u-a*f,e[t+2]=c*m+h*f+a*d-l*u,e[t+3]=h*m-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return $a.copy(this).projectOnVector(e),this.sub($a)}reflect(e){return this.sub($a.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},$a=new C,Bc=new _t,Be=class s{constructor(e,t,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],y=i[0],g=i[3],p=i[6],w=i[1],M=i[4],x=i[7],T=i[2],A=i[5],R=i[8];return r[0]=o*y+a*w+l*T,r[3]=o*g+a*M+l*A,r[6]=o*p+a*x+l*R,r[1]=c*y+h*w+u*T,r[4]=c*g+h*M+u*A,r[7]=c*p+h*x+u*R,r[2]=d*y+f*w+m*T,r[5]=d*g+f*M+m*A,r[8]=d*p+f*x+m*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=u*y,e[1]=(i*c-h*n)*y,e[2]=(a*n-i*o)*y,e[3]=d*y,e[4]=(h*t-i*l)*y,e[5]=(i*r-a*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(qa.makeScale(e,t)),this}rotate(e){return this.premultiply(qa.makeRotation(-e)),this}translate(e,t){return this.premultiply(qa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},qa=new Be;function jl(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Gs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function su(){let s=Gs("canvas");return s.style.display="block",s}var zc={};function ss(s){s in zc||(zc[s]=!0,console.warn(s))}function ru(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Hc=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vc=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ld(){let s={enabled:!0,workingColorSpace:bi,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Qe&&(i.r=zn(i.r),i.g=zn(i.g),i.b=zn(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Qe&&(i.r=es(i.r),i.g=es(i.g),i.b=es(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===$n?Hs:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ss("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ss("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[bi]:{primaries:e,whitePoint:n,transfer:Hs,toXYZ:Hc,fromXYZ:Vc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:e,whitePoint:n,transfer:Qe,toXYZ:Hc,fromXYZ:Vc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),s}var qe=Ld();function zn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function es(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var zi,co=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{zi===void 0&&(zi=Gs("canvas")),zi.width=e.width,zi.height=e.height;let i=zi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=zi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Gs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=zn(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(zn(t[n]/255)*255):t[n]=zn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},kd=0,rs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=Pi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Ya(i[o].image)):r.push(Ya(i[o]))}else r=Ya(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ya(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?co.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ud=0,Za=new C,sn=class s extends An{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Qn,i=Qn,r=bn,o=ri,a=gn,l=En,c=s.DEFAULT_ANISOTROPY,h=$n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=Pi(),this.name="",this.source=new rs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Za).x}get height(){return this.source.getSize(Za).y}get depth(){return this.source.getSize(Za).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ol)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case oo:e.x=e.x-Math.floor(e.x);break;case Qn:e.x=e.x<0?0:1;break;case ao:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case oo:e.y=e.y-Math.floor(e.y);break;case Qn:e.y=e.y<0?0:1;break;case ao:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=Ol;sn.DEFAULT_ANISOTROPY=1;var gt=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],y=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,x=(f+1)/2,T=(p+1)/2,A=(h+d)/4,R=(u+y)/4,k=(m+g)/4;return M>x&&M>T?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=A/n,r=R/n):x>T?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=k/i):T<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(T),n=R/r,i=k/r),this.set(n,i,r,t),this}let w=Math.sqrt((g-m)*(g-m)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(g-m)/w,this.y=(u-y)/w,this.z=(d-h)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ho=class extends An{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);let i={width:e,height:t,depth:n.depth},r=new sn(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:bn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new rs(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cn=class extends ho{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ws=class extends sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=pn,this.minFilter=pn,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var uo=class extends sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=pn,this.minFilter=pn,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var mn=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,yn):yn.fromBufferAttribute(r,o),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Rr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Rr.copy(n.boundingBox)),Rr.applyMatrix4(e.matrixWorld),this.union(Rr)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Is),Pr.subVectors(this.max,Is),Hi.subVectors(e.a,Is),Vi.subVectors(e.b,Is),Gi.subVectors(e.c,Is),qn.subVectors(Vi,Hi),Yn.subVectors(Gi,Vi),pi.subVectors(Hi,Gi);let t=[0,-qn.z,qn.y,0,-Yn.z,Yn.y,0,-pi.z,pi.y,qn.z,0,-qn.x,Yn.z,0,-Yn.x,pi.z,0,-pi.x,-qn.y,qn.x,0,-Yn.y,Yn.x,0,-pi.y,pi.x,0];return!Ja(t,Hi,Vi,Gi,Pr)||(t=[1,0,0,0,1,0,0,0,1],!Ja(t,Hi,Vi,Gi,Pr))?!1:(Ir.crossVectors(qn,Yn),t=[Ir.x,Ir.y,Ir.z],Ja(t,Hi,Vi,Gi,Pr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},kn=[new C,new C,new C,new C,new C,new C,new C,new C],yn=new C,Rr=new mn,Hi=new C,Vi=new C,Gi=new C,qn=new C,Yn=new C,pi=new C,Is=new C,Pr=new C,Ir=new C,mi=new C;function Ja(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){mi.fromArray(s,r);let a=i.x*Math.abs(mi.x)+i.y*Math.abs(mi.y)+i.z*Math.abs(mi.z),l=e.dot(mi),c=t.dot(mi),h=n.dot(mi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Nd=new mn,Ds=new C,Ka=new C,ti=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Nd.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ds.subVectors(e,this.center);let t=Ds.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ds,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ka.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ds.copy(e.center).add(Ka)),this.expandByPoint(Ds.copy(e.center).sub(Ka))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Un=new C,ja=new C,Dr=new C,Zn=new C,Qa=new C,Lr=new C,el=new C,Vn=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Un.copy(this.origin).addScaledVector(this.direction,t),Un.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ja.copy(e).add(t).multiplyScalar(.5),Dr.copy(t).sub(e).normalize(),Zn.copy(this.origin).sub(ja);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Dr),a=Zn.dot(this.direction),l=-Zn.dot(Dr),c=Zn.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){let y=1/h;u*=y,d*=y,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ja).addScaledVector(Dr,d),f}intersectSphere(e,t){Un.subVectors(e.center,this.origin);let n=Un.dot(this.direction),i=Un.dot(Un)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Un)!==null}intersectTriangle(e,t,n,i,r){Qa.subVectors(t,e),Lr.subVectors(n,e),el.crossVectors(Qa,Lr);let o=this.direction.dot(el),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zn.subVectors(this.origin,e);let l=a*this.direction.dot(Lr.crossVectors(Zn,Lr));if(l<0)return null;let c=a*this.direction.dot(Qa.cross(Zn));if(c<0||l+c>o)return null;let h=-a*Zn.dot(el);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},et=class s{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,m,y,g){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,m,y,g)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Wi.setFromMatrixColumn(e,0).length(),r=1/Wi.setFromMatrixColumn(e,1).length(),o=1/Wi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,m=a*h,y=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=d-y*c,t[9]=-a*l,t[2]=y-d*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,m=c*h,y=c*u;t[0]=d+y*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-m,t[6]=y+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,m=c*h,y=c*u;t[0]=d-y*a,t[4]=-o*u,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*h,t[9]=y-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,m=a*h,y=a*u;t[0]=l*h,t[4]=m*c-f,t[8]=d*c+y,t[1]=l*u,t[5]=y*c+d,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,m=a*l,y=a*c;t[0]=l*h,t[4]=y-d*u,t[8]=m*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+m,t[10]=d-y*u}else if(e.order==="XZY"){let d=o*l,f=o*c,m=a*l,y=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+y,t[5]=o*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=a*h,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Fd,e,Od)}lookAt(e,t,n){let i=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),Jn.crossVectors(n,en),Jn.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),Jn.crossVectors(n,en)),Jn.normalize(),kr.crossVectors(en,Jn),i[0]=Jn.x,i[4]=kr.x,i[8]=en.x,i[1]=Jn.y,i[5]=kr.y,i[9]=en.y,i[2]=Jn.z,i[6]=kr.z,i[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],w=n[3],M=n[7],x=n[11],T=n[15],A=i[0],R=i[4],k=i[8],S=i[12],b=i[1],I=i[5],N=i[9],F=i[13],z=i[2],X=i[6],G=i[10],q=i[14],V=i[3],Z=i[7],Q=i[11],de=i[15];return r[0]=o*A+a*b+l*z+c*V,r[4]=o*R+a*I+l*X+c*Z,r[8]=o*k+a*N+l*G+c*Q,r[12]=o*S+a*F+l*q+c*de,r[1]=h*A+u*b+d*z+f*V,r[5]=h*R+u*I+d*X+f*Z,r[9]=h*k+u*N+d*G+f*Q,r[13]=h*S+u*F+d*q+f*de,r[2]=m*A+y*b+g*z+p*V,r[6]=m*R+y*I+g*X+p*Z,r[10]=m*k+y*N+g*G+p*Q,r[14]=m*S+y*F+g*q+p*de,r[3]=w*A+M*b+x*z+T*V,r[7]=w*R+M*I+x*X+T*Z,r[11]=w*k+M*N+x*G+T*Q,r[15]=w*S+M*F+x*q+T*de,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],y=e[7],g=e[11],p=e[15];return m*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+y*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+g*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],y=e[13],g=e[14],p=e[15],w=u*g*c-y*d*c+y*l*f-a*g*f-u*l*p+a*d*p,M=m*d*c-h*g*c-m*l*f+o*g*f+h*l*p-o*d*p,x=h*y*c-m*u*c+m*a*f-o*y*f-h*a*p+o*u*p,T=m*u*l-h*y*l-m*a*d+o*y*d+h*a*g-o*u*g,A=t*w+n*M+i*x+r*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/A;return e[0]=w*R,e[1]=(y*d*r-u*g*r-y*i*f+n*g*f+u*i*p-n*d*p)*R,e[2]=(a*g*r-y*l*r+y*i*c-n*g*c-a*i*p+n*l*p)*R,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*R,e[4]=M*R,e[5]=(h*g*r-m*d*r+m*i*f-t*g*f-h*i*p+t*d*p)*R,e[6]=(m*l*r-o*g*r-m*i*c+t*g*c+o*i*p-t*l*p)*R,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*R,e[8]=x*R,e[9]=(m*u*r-h*y*r-m*n*f+t*y*f+h*n*p-t*u*p)*R,e[10]=(o*y*r-m*a*r+m*n*c-t*y*c-o*n*p+t*a*p)*R,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*R,e[12]=T*R,e[13]=(h*y*i-m*u*i+m*n*d-t*y*d-h*n*g+t*u*g)*R,e[14]=(m*a*i-o*y*i-m*n*l+t*y*l+o*n*g-t*a*g)*R,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*R,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,y=o*h,g=o*u,p=a*u,w=l*c,M=l*h,x=l*u,T=n.x,A=n.y,R=n.z;return i[0]=(1-(y+p))*T,i[1]=(f+x)*T,i[2]=(m-M)*T,i[3]=0,i[4]=(f-x)*A,i[5]=(1-(d+p))*A,i[6]=(g+w)*A,i[7]=0,i[8]=(m+M)*R,i[9]=(g-w)*R,i[10]=(1-(d+y))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Wi.set(i[0],i[1],i[2]).length(),o=Wi.set(i[4],i[5],i[6]).length(),a=Wi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],_n.copy(this);let c=1/r,h=1/o,u=1/a;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=vn,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),m,y;if(l)m=r/(o-r),y=o*r/(o-r);else if(a===vn)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Vs)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=vn,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),m,y;if(l)m=1/(o-r),y=o/(o-r);else if(a===vn)m=-2/(o-r),y=-(o+r)/(o-r);else if(a===Vs)m=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Wi=new C,_n=new et,Fd=new C(0,0,0),Od=new C(1,1,1),Jn=new C,kr=new C,en=new C,Gc=new et,Wc=new _t,Mn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Gc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wc.setFromEuler(this),this.setFromQuaternion(Wc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Mn.DEFAULT_ORDER="XYZ";var os=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Bd=0,Xc=new C,Xi=new _t,Nn=new et,Ur=new C,Ls=new C,zd=new C,Hd=new _t,$c=new C(1,0,0),qc=new C(0,1,0),Yc=new C(0,0,1),Zc={type:"added"},Vd={type:"removed"},$i={type:"childadded",child:null},tl={type:"childremoved",child:null},St=class s extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=Pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new C,t=new Mn,n=new _t,i=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new et},normalMatrix:{value:new Be}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new os,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.premultiply(Xi),this}rotateX(e){return this.rotateOnAxis($c,e)}rotateY(e){return this.rotateOnAxis(qc,e)}rotateZ(e){return this.rotateOnAxis(Yc,e)}translateOnAxis(e,t){return Xc.copy(e).applyQuaternion(this.quaternion),this.position.add(Xc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($c,e)}translateY(e){return this.translateOnAxis(qc,e)}translateZ(e){return this.translateOnAxis(Yc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ur.copy(e):Ur.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(Ls,Ur,this.up):Nn.lookAt(Ur,Ls,this.up),this.quaternion.setFromRotationMatrix(Nn),i&&(Nn.extractRotation(i.matrixWorld),Xi.setFromRotationMatrix(Nn),this.quaternion.premultiply(Xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zc),$i.child=e,this.dispatchEvent($i),$i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vd),tl.child=e,this.dispatchEvent(tl),tl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zc),$i.child=e,this.dispatchEvent($i),$i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,e,zd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,Hd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};St.DEFAULT_UP=new C(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xn=new C,Fn=new C,nl=new C,On=new C,qi=new C,Yi=new C,Jc=new C,il=new C,sl=new C,rl=new C,ol=new gt,al=new gt,ll=new gt,Bn=class s{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),xn.subVectors(e,t),i.cross(xn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){xn.subVectors(i,t),Fn.subVectors(n,t),nl.subVectors(e,t);let o=xn.dot(xn),a=xn.dot(Fn),l=xn.dot(nl),c=Fn.dot(Fn),h=Fn.dot(nl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,On)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,On.x),l.addScaledVector(o,On.y),l.addScaledVector(a,On.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return ol.setScalar(0),al.setScalar(0),ll.setScalar(0),ol.fromBufferAttribute(e,t),al.fromBufferAttribute(e,n),ll.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(ol,r.x),o.addScaledVector(al,r.y),o.addScaledVector(ll,r.z),o}static isFrontFacing(e,t,n,i){return xn.subVectors(n,t),Fn.subVectors(e,t),xn.cross(Fn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),xn.cross(Fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;qi.subVectors(i,n),Yi.subVectors(r,n),il.subVectors(e,n);let l=qi.dot(il),c=Yi.dot(il);if(l<=0&&c<=0)return t.copy(n);sl.subVectors(e,i);let h=qi.dot(sl),u=Yi.dot(sl);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(qi,o);rl.subVectors(e,r);let f=qi.dot(rl),m=Yi.dot(rl);if(m>=0&&f<=m)return t.copy(r);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(Yi,a);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Jc.subVectors(r,i),a=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(Jc,a);let p=1/(g+y+d);return o=y*p,a=d*p,t.copy(n).addScaledVector(qi,o).addScaledVector(Yi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ou={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},Nr={h:0,s:0,l:0};function cl(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Ue=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=qe.workingColorSpace){if(e=Jl(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=cl(o,r,e+1/3),this.g=cl(o,r,e),this.b=cl(o,r,e-1/3)}return qe.colorSpaceToWorking(this,i),this}setStyle(e,t=nn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){let n=ou[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zn(e.r),this.g=zn(e.g),this.b=zn(e.b),this}copyLinearToSRGB(e){return this.r=es(e.r),this.g=es(e.g),this.b=es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return qe.workingToColorSpace(Ut.copy(this),e),Math.round(Ve(Ut.r*255,0,255))*65536+Math.round(Ve(Ut.g*255,0,255))*256+Math.round(Ve(Ut.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Ut.copy(this),t);let n=Ut.r,i=Ut.g,r=Ut.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=nn){qe.workingToColorSpace(Ut.copy(this),e);let t=Ut.r,n=Ut.g,i=Ut.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Kn),this.setHSL(Kn.h+e,Kn.s+t,Kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kn),e.getHSL(Nr);let n=Fs(Kn.h,Nr.h,t),i=Fs(Kn.s,Nr.s,t),r=Fs(Kn.l,Nr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ut=new Ue;Ue.NAMES=ou;var Gd=0,Rn=class extends An{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=Pi(),this.name="",this.type="Material",this.blending=xi,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=so,this.blendDst=ro,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ml,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_i,this.stencilZFail=_i,this.stencilZPass=_i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xi&&(n.blending=this.blending),this.side!==Hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==so&&(n.blendSrc=this.blendSrc),this.blendDst!==ro&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ml&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_i&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_i&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_i&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ft=class extends Rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=Fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Mt=new C,Fr=new oe,Wd=0,lt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Wd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Sl,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Fr.fromBufferAttribute(this,t),Fr.applyMatrix3(e),this.setXY(t,Fr.x,Fr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ji(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ji(t,this.array)),t}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ji(t,this.array)),t}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ji(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ji(t,this.array)),t}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),i=Gt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),i=Gt(i,this.array),r=Gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Sl&&(e.usage=this.usage),e}};var Xs=class extends lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var $s=class extends lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var dt=class extends lt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Xd=0,fn=new et,hl=new St,Zi=new C,tn=new mn,ks=new mn,Rt=new C,Ze=class s extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=Pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jl(e)?$s:Xs)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Be().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,n){return fn.makeTranslation(e,t,n),this.applyMatrix4(fn),this}scale(e,t,n){return fn.makeScale(e,t,n),this.applyMatrix4(fn),this}lookAt(e){return hl.lookAt(e),hl.updateMatrix(),this.applyMatrix4(hl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zi).negate(),this.translate(Zi.x,Zi.y,Zi.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new dt(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];ks.setFromBufferAttribute(a),this.morphTargetsRelative?(Rt.addVectors(tn.min,ks.min),tn.expandByPoint(Rt),Rt.addVectors(tn.max,ks.max),tn.expandByPoint(Rt)):(tn.expandByPoint(ks.min),tn.expandByPoint(ks.max))}tn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Rt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Rt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Rt.fromBufferAttribute(a,c),l&&(Zi.fromBufferAttribute(e,c),Rt.add(Zi)),i=Math.max(i,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new lt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let k=0;k<n.count;k++)a[k]=new C,l[k]=new C;let c=new C,h=new C,u=new C,d=new oe,f=new oe,m=new oe,y=new C,g=new C;function p(k,S,b){c.fromBufferAttribute(n,k),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,k),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,b),h.sub(c),u.sub(c),f.sub(d),m.sub(d);let I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(I),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(I),a[k].add(y),a[S].add(y),a[b].add(y),l[k].add(g),l[S].add(g),l[b].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let k=0,S=w.length;k<S;++k){let b=w[k],I=b.start,N=b.count;for(let F=I,z=I+N;F<z;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let M=new C,x=new C,T=new C,A=new C;function R(k){T.fromBufferAttribute(i,k),A.copy(T);let S=a[k];M.copy(S),M.sub(T.multiplyScalar(T.dot(S))).normalize(),x.crossVectors(A,S);let I=x.dot(l[k])<0?-1:1;o.setXYZW(k,M.x,M.y,M.z,I)}for(let k=0,S=w.length;k<S;++k){let b=w[k],I=b.start,N=b.count;for(let F=I,z=I+N;F<z;F+=3)R(e.getX(F+0)),R(e.getX(F+1)),R(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new C,r=new C,o=new C,a=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),y=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,m=0;for(let y=0,g=l.length;y<g;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new lt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Kc=new et,gi=new Vn,Or=new ti,jc=new C,Br=new C,zr=new C,Hr=new C,ul=new C,Vr=new C,Qc=new C,Gr=new C,ct=class extends St{constructor(e=new Ze,t=new Ft){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Vr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(ul.fromBufferAttribute(u,e),o?Vr.addScaledVector(ul,h):Vr.addScaledVector(ul.sub(t),h))}t.add(Vr)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(r),gi.copy(e.ray).recast(e.near),!(Or.containsPoint(gi.origin)===!1&&(gi.intersectSphere(Or,jc)===null||gi.origin.distanceToSquared(jc)>(e.far-e.near)**2))&&(Kc.copy(r).invert(),gi.copy(e.ray).applyMatrix4(Kc),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gi)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=o[g.materialIndex],w=Math.max(g.start,f.start),M=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=w,T=M;x<T;x+=3){let A=a.getX(x),R=a.getX(x+1),k=a.getX(x+2);i=Wr(this,p,e,n,c,h,u,A,R,k),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let w=a.getX(g),M=a.getX(g+1),x=a.getX(g+2);i=Wr(this,o,e,n,c,h,u,w,M,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=o[g.materialIndex],w=Math.max(g.start,f.start),M=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=w,T=M;x<T;x+=3){let A=x,R=x+1,k=x+2;i=Wr(this,p,e,n,c,h,u,A,R,k),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let w=g,M=g+1,x=g+2;i=Wr(this,o,e,n,c,h,u,w,M,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function $d(s,e,t,n,i,r,o,a){let l;if(e.side===Xt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Hn,a),l===null)return null;Gr.copy(a),Gr.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Gr);return c<t.near||c>t.far?null:{distance:c,point:Gr.clone(),object:s}}function Wr(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Br),s.getVertexPosition(l,zr),s.getVertexPosition(c,Hr);let h=$d(s,e,t,n,Br,zr,Hr,Qc);if(h){let u=new C;Bn.getBarycoord(Qc,Br,zr,Hr,u),i&&(h.uv=Bn.getInterpolatedAttribute(i,a,l,c,u,new oe)),r&&(h.uv1=Bn.getInterpolatedAttribute(r,a,l,c,u,new oe)),o&&(h.normal=Bn.getInterpolatedAttribute(o,a,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new C,materialIndex:0};Bn.getNormal(Br,zr,Hr,d.normal),h.face=d,h.barycoord=u}return h}var as=class s extends Ze{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(u,2));function m(y,g,p,w,M,x,T,A,R,k,S){let b=x/R,I=T/k,N=x/2,F=T/2,z=A/2,X=R+1,G=k+1,q=0,V=0,Z=new C;for(let Q=0;Q<G;Q++){let de=Q*I-F;for(let Ne=0;Ne<X;Ne++){let Je=Ne*b-N;Z[y]=Je*w,Z[g]=de*M,Z[p]=z,c.push(Z.x,Z.y,Z.z),Z[y]=0,Z[g]=0,Z[p]=A>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(Ne/R),u.push(1-Q/k),q+=1}}for(let Q=0;Q<k;Q++)for(let de=0;de<R;de++){let Ne=d+de+X*Q,Je=d+de+X*(Q+1),Ke=d+(de+1)+X*(Q+1),$e=d+(de+1)+X*Q;l.push(Ne,Je,$e),l.push(Je,Ke,$e),V+=6}a.addGroup(f,V,S),f+=V,d+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ii(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Bt(s){let e={};for(let t=0;t<s.length;t++){let n=Ii(s[t]);for(let i in n)e[i]=n[i]}return e}function qd(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Ql(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}var au={clone:Ii,merge:Bt},Yd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Sn=class extends Rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yd,this.fragmentShader=Zd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ii(e.uniforms),this.uniformsGroups=qd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},qs=class extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},jn=new C,eh=new oe,th=new oe,Zt=class extends qs{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=is*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Qi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return is*2*Math.atan(Math.tan(Qi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(jn.x,jn.y).multiplyScalar(-e/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(jn.x,jn.y).multiplyScalar(-e/jn.z)}getViewSize(e,t){return this.getViewBounds(e,eh,th),t.subVectors(th,eh)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Qi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ji=-90,Ki=1,fo=class extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Zt(Ji,Ki,e,t);i.layers=this.layers,this.add(i);let r=new Zt(Ji,Ki,e,t);r.layers=this.layers,this.add(r);let o=new Zt(Ji,Ki,e,t);o.layers=this.layers,this.add(o);let a=new Zt(Ji,Ki,e,t);a.layers=this.layers,this.add(a);let l=new Zt(Ji,Ki,e,t);l.layers=this.layers,this.add(l);let c=new Zt(Ji,Ki,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===vn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Vs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Ys=class extends sn{constructor(e=[],t=Ci,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},po=class extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ys(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new as(5,5,5),r=new Sn({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:Wn});r.uniforms.tEquirect.value=t;let o=new ct(i,r),a=t.minFilter;return t.minFilter===ri&&(t.minFilter=bn),new fo(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Wt=class extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}},Jd={type:"move"},ls=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(c,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Jd)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Wt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Zs=class extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var dl=new C,Kd=new C,jd=new Be,Nt=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=dl.subVectors(n,t).cross(Kd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(dl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||jd.getNormalMatrix(e),i=this.coplanarPoint(dl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},yi=new ti,Qd=new oe(.5,.5),Xr=new C,cs=class{constructor(e=new Nt,t=new Nt,n=new Nt,i=new Nt,r=new Nt,o=new Nt){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=vn,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],y=r[9],g=r[10],p=r[11],w=r[12],M=r[13],x=r[14],T=r[15];if(i[0].setComponents(c-o,f-h,p-m,T-w).normalize(),i[1].setComponents(c+o,f+h,p+m,T+w).normalize(),i[2].setComponents(c+a,f+u,p+y,T+M).normalize(),i[3].setComponents(c-a,f-u,p-y,T-M).normalize(),n)i[4].setComponents(l,d,g,x).normalize(),i[5].setComponents(c-l,f-d,p-g,T-x).normalize();else if(i[4].setComponents(c-l,f-d,p-g,T-x).normalize(),t===vn)i[5].setComponents(c+l,f+d,p+g,T+x).normalize();else if(t===Vs)i[5].setComponents(l,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(e){yi.center.set(0,0,0);let t=Qd.distanceTo(e.center);return yi.radius=.7071067811865476+t,yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Xr.x=i.normal.x>0?e.max.x:e.min.x,Xr.y=i.normal.y>0?e.max.y:e.min.y,Xr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Pt=class extends Rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},mo=new C,go=new C,nh=new et,Us=new Vn,$r=new ti,fl=new C,ih=new C,rn=class extends St{constructor(e=new Ze,t=new Pt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)mo.fromBufferAttribute(t,i-1),go.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=mo.distanceTo(go);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(i),$r.radius+=r,e.ray.intersectsSphere($r)===!1)return;nh.copy(i).invert(),Us.copy(e.ray).applyMatrix4(nh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=c){let p=h.getX(y),w=h.getX(y+1),M=qr(this,e,Us,l,p,w,y);M&&t.push(M)}if(this.isLineLoop){let y=h.getX(m-1),g=h.getX(f),p=qr(this,e,Us,l,y,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=c){let p=qr(this,e,Us,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=qr(this,e,Us,l,m-1,f,m-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function qr(s,e,t,n,i,r,o){let a=s.geometry.attributes.position;if(mo.fromBufferAttribute(a,i),go.fromBufferAttribute(a,r),t.distanceSqToSegment(mo,go,fl,ih)>n)return;fl.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(fl);if(!(c<e.near||c>e.far))return{distance:c,point:ih.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var sh=new C,rh=new C,wn=class extends rn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)sh.fromBufferAttribute(t,i),rh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+sh.distanceTo(rh);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var hs=class extends Rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},oh=new et,wl=new Vn,Yr=new ti,Zr=new C,Js=class extends St{constructor(e=new Ze,t=new hs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(i),Yr.radius+=r,e.ray.intersectsSphere(Yr)===!1)return;oh.copy(i).invert(),wl.copy(e.ray).applyMatrix4(oh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,y=f;m<y;m++){let g=c.getX(m);Zr.fromBufferAttribute(u,g),ah(Zr,g,l,i,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,y=f;m<y;m++)Zr.fromBufferAttribute(u,m),ah(Zr,m,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ah(s,e,t,n,i,r,o){let a=wl.distanceSqToPoint(s);if(a<t){let l=new C;wl.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Ks=class extends sn{constructor(e,t,n=oi,i,r,o,a=pn,l=pn,c,h=ns,u=1){if(h!==ns&&h!==_s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},js=class extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Jr=new C,Kr=new C,pl=new C,jr=new Bn,Qs=class extends Ze{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(Qi*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:y,b:g,c:p}=jr;if(y.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),jr.getNormal(pl),u[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let w=0;w<3;w++){let M=(w+1)%3,x=u[w],T=u[M],A=jr[h[w]],R=jr[h[M]],k=`${x}_${T}`,S=`${T}_${x}`;S in d&&d[S]?(pl.dot(d[S].normal)<=r&&(f.push(A.x,A.y,A.z),f.push(R.x,R.y,R.z)),d[S]=null):k in d||(d[k]={index0:c[w],index1:c[M],normal:pl.clone()})}}for(let m in d)if(d[m]){let{index0:y,index1:g}=d[m];Jr.fromBufferAttribute(a,y),Kr.fromBufferAttribute(a,g),f.push(Jr.x,Jr.y,Jr.z),f.push(Kr.x,Kr.y,Kr.z)}this.setAttribute("position",new dt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},on=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new oe:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,i=[],r=[],o=[],a=new C,l=new et;for(let f=0;f<=e;f++){let m=f/e;i[f]=this.getTangentAt(m,new C)}r[0]=new C,o[0]=new C;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(Ve(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Ve(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},us=class extends on{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new oe){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},yo=class extends us{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function ec(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var Qr=new C,ml=new ec,gl=new ec,yl=new ec,_o=class extends on{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Qr.subVectors(i[0],i[1]).add(i[0]),c=Qr);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Qr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Qr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),ml.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,y,g),gl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,y,g),yl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(ml.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),gl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),yl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ml.calc(l),gl.calc(l),yl.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function lh(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function ef(s,e){let t=1-s;return t*t*e}function tf(s,e){return 2*(1-s)*s*e}function nf(s,e){return s*s*e}function Os(s,e,t,n){return ef(s,e)+tf(s,t)+nf(s,n)}function sf(s,e){let t=1-s;return t*t*t*e}function rf(s,e){let t=1-s;return 3*t*t*s*e}function of(s,e){return 3*(1-s)*s*s*e}function af(s,e){return s*s*s*e}function Bs(s,e,t,n,i){return sf(s,e)+rf(s,t)+of(s,n)+af(s,i)}var er=class extends on{constructor(e=new oe,t=new oe,n=new oe,i=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new oe){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Bs(e,i.x,r.x,o.x,a.x),Bs(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xo=class extends on{constructor(e=new C,t=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new C){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Bs(e,i.x,r.x,o.x,a.x),Bs(e,i.y,r.y,o.y,a.y),Bs(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},tr=class extends on{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vo=class extends on{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},nr=class extends on{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Os(e,i.x,r.x,o.x),Os(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},bo=class extends on{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Os(e,i.x,r.x,o.x),Os(e,i.y,r.y,o.y),Os(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ir=class extends on{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(lh(a,l.x,c.x,h.x,u.x),lh(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new oe().fromArray(i))}return this}},ch=Object.freeze({__proto__:null,ArcCurve:yo,CatmullRomCurve3:_o,CubicBezierCurve:er,CubicBezierCurve3:xo,EllipseCurve:us,LineCurve:tr,LineCurve3:vo,QuadraticBezierCurve:nr,QuadraticBezierCurve3:bo,SplineCurve:ir}),Mo=class extends on{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ch[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new ch[i.type]().fromJSON(i))}return this}},Mi=class extends Mo{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new tr(this.currentPoint.clone(),new oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new nr(this.currentPoint.clone(),new oe(e,t),new oe(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new er(this.currentPoint.clone(),new oe(e,t),new oe(n,i),new oe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ir(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new us(e,t,n,i,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ds=class extends Mi{constructor(e){super(e),this.uuid=Pi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Mi().fromJSON(i))}return this}};function lf(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=lu(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=ff(s,e,r,t)),s.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let f=s[d],m=s[d+1];f<a&&(a=f),m<l&&(l=m),f>h&&(h=f),m>u&&(u=m)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return sr(r,o,t,a,l,c,0),o}function lu(s,e,t,n,i){let r;if(i===wf(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=hh(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=hh(o/n|0,s[o],s[o+1],r);return r&&fs(r,r.next)&&(or(r),r=r.next),r}function Si(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(fs(t,t.next)||mt(t.prev,t,t.next)===0)){if(or(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function sr(s,e,t,n,i,r,o){if(!s)return;!o&&r&&_f(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?hf(s,n,i,r):cf(s)){e.push(l.i,s.i,c.i),or(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=uf(Si(s),e),sr(s,e,t,n,i,r,2)):o===2&&df(s,e,t,n,i,r):sr(Si(s),e,t,n,i,r,1);break}}}function cf(s){let e=s.prev,t=s,n=s.next;if(mt(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),u=Math.min(a,l,c),d=Math.max(i,r,o),f=Math.max(a,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Ns(i,a,r,l,o,c,m.x,m.y)&&mt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function hf(s,e,t,n){let i=s.prev,r=s,o=s.next;if(mt(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=Math.min(a,l,c),m=Math.min(h,u,d),y=Math.max(a,l,c),g=Math.max(h,u,d),p=El(f,m,e,t,n),w=El(y,g,e,t,n),M=s.prevZ,x=s.nextZ;for(;M&&M.z>=p&&x&&x.z<=w;){if(M.x>=f&&M.x<=y&&M.y>=m&&M.y<=g&&M!==i&&M!==o&&Ns(a,h,l,u,c,d,M.x,M.y)&&mt(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=f&&x.x<=y&&x.y>=m&&x.y<=g&&x!==i&&x!==o&&Ns(a,h,l,u,c,d,x.x,x.y)&&mt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=p;){if(M.x>=f&&M.x<=y&&M.y>=m&&M.y<=g&&M!==i&&M!==o&&Ns(a,h,l,u,c,d,M.x,M.y)&&mt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=w;){if(x.x>=f&&x.x<=y&&x.y>=m&&x.y<=g&&x!==i&&x!==o&&Ns(a,h,l,u,c,d,x.x,x.y)&&mt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function uf(s,e){let t=s;do{let n=t.prev,i=t.next.next;!fs(n,i)&&hu(n,t,t.next,i)&&rr(n,i)&&rr(i,n)&&(e.push(n.i,t.i,i.i),or(t),or(t.next),t=s=i),t=t.next}while(t!==s);return Si(t)}function df(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&bf(o,a)){let l=uu(o,a);o=Si(o,o.next),l=Si(l,l.next),sr(o,e,t,n,i,r,0),sr(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function ff(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=lu(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(vf(c))}i.sort(pf);for(let r=0;r<i.length;r++)t=mf(i[r],t);return t}function pf(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function mf(s,e){let t=gf(s,e);if(!t)return e;let n=uu(t,s);return Si(n,n.next),Si(t,t.next)}function gf(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(fs(s,t))return t;do{if(fs(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&cu(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);rr(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&yf(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function yf(s,e){return mt(s.prev,s,e.prev)<0&&mt(e.next,s,s.next)<0}function _f(s,e,t,n){let i=s;do i.z===0&&(i.z=El(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,xf(i)}function xf(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function El(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function vf(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function cu(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Ns(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&cu(s,e,t,n,i,r,o,a)}function bf(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Mf(s,e)&&(rr(s,e)&&rr(e,s)&&Sf(s,e)&&(mt(s.prev,s,e.prev)||mt(s,e.prev,e))||fs(s,e)&&mt(s.prev,s,s.next)>0&&mt(e.prev,e,e.next)>0)}function mt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function fs(s,e){return s.x===e.x&&s.y===e.y}function hu(s,e,t,n){let i=to(mt(s,e,t)),r=to(mt(s,e,n)),o=to(mt(t,n,s)),a=to(mt(t,n,e));return!!(i!==r&&o!==a||i===0&&eo(s,t,e)||r===0&&eo(s,n,e)||o===0&&eo(t,s,n)||a===0&&eo(t,e,n))}function eo(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function to(s){return s>0?1:s<0?-1:0}function Mf(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&hu(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function rr(s,e){return mt(s.prev,s,s.next)<0?mt(s,e,s.next)>=0&&mt(s,s.prev,e)>=0:mt(s,e,s.prev)<0||mt(s,s.next,e)<0}function Sf(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function uu(s,e){let t=Tl(s.i,s.x,s.y),n=Tl(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function hh(s,e,t,n){let i=Tl(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function or(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Tl(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function wf(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var Al=class{static triangulate(e,t,n=2){return lf(e,t,n)}},ts=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];uh(e),dh(n,e);let o=e.length;t.forEach(uh);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,dh(n,t[l]);let a=Al.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function uh(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function dh(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Gn=class s extends Ze{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let w=p*d-o;for(let M=0;M<c;M++){let x=M*u-r;m.push(x,-w,0),y.push(0,0,1),g.push(M/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<a;w++){let M=w+c*p,x=w+c*(p+1),T=w+1+c*(p+1),A=w+1+c*p;f.push(M,x,A),f.push(x,T,A)}this.setIndex(f),this.setAttribute("position",new dt(m,3)),this.setAttribute("normal",new dt(y,3)),this.setAttribute("uv",new dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}};var ar=class s extends Ze{constructor(e=new ds([new oe(0,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new dt(i,3)),this.setAttribute("normal",new dt(r,3)),this.setAttribute("uv",new dt(o,2));function c(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,m=d.holes;ts.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){let w=m[g];ts.isClockWise(w)===!0&&(m[g]=w.reverse())}let y=ts.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){let w=m[g];f=f.concat(w)}for(let g=0,p=f.length;g<p;g++){let w=f[g];i.push(w.x,w.y,0),r.push(0,0,1),o.push(w.x,w.y)}for(let g=0,p=y.length;g<p;g++){let w=y[g],M=w[0]+u,x=w[1]+u,T=w[2]+u;n.push(M,x,T),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Ef(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function Ef(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var lr=class s extends Ze{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new C,d=new C,f=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){let w=[],M=p/n,x=0;p===0&&o===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){let A=T/t;u.x=-e*Math.cos(i+A*r)*Math.sin(o+M*a),u.y=e*Math.cos(o+M*a),u.z=e*Math.sin(i+A*r)*Math.sin(o+M*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),g.push(A+x,1-M),w.push(c++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<t;w++){let M=h[p][w+1],x=h[p][w],T=h[p+1][w],A=h[p+1][w+1];(p!==0||o>0)&&f.push(M,x,A),(p!==n-1||l<Math.PI)&&f.push(x,T,A)}this.setIndex(f),this.setAttribute("position",new dt(m,3)),this.setAttribute("normal",new dt(y,3)),this.setAttribute("uv",new dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var wi=class extends Rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ql,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var So=class extends Rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},wo=class extends Rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Ei=class extends Pt{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function no(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Tf(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var Ti=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Eo=class extends Ti{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xl,endingEnd:xl}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case vl:r=e,a=2*t-n;break;case bl:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case vl:o=e,l=2*n-t;break;case bl:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),y=m*m,g=y*m,p=-d*g+2*d*y-d*m,w=(1+d)*g+(-1.5-2*d)*y+(-.5+d)*m+1,M=(-1-f)*g+(1.5+f)*y+.5*m,x=f*g-f*y;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+w*o[c+T]+M*o[l+T]+x*o[u+T];return r}},To=class extends Ti{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Ao=class extends Ti{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},an=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=no(t,this.TimeBufferType),this.values=no(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:no(e.times,Array),values:no(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ao(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new To(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Eo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case zs:t=this.InterpolantFactoryMethodDiscrete;break;case lo:t=this.InterpolantFactoryMethodLinear;break;case io:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return zs;case this.InterpolantFactoryMethodLinear:return lo;case this.InterpolantFactoryMethodSmooth:return io}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Tf(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===io,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let y=t[u+m];if(y!==t[d+m]||y!==t[f+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};an.prototype.ValueTypeName="";an.prototype.TimeBufferType=Float32Array;an.prototype.ValueBufferType=Float32Array;an.prototype.DefaultInterpolation=lo;var ni=class extends an{constructor(e,t,n){super(e,t,n)}};ni.prototype.ValueTypeName="bool";ni.prototype.ValueBufferType=Array;ni.prototype.DefaultInterpolation=zs;ni.prototype.InterpolantFactoryMethodLinear=void 0;ni.prototype.InterpolantFactoryMethodSmooth=void 0;var Co=class extends an{constructor(e,t,n,i){super(e,t,n,i)}};Co.prototype.ValueTypeName="color";var Ro=class extends an{constructor(e,t,n,i){super(e,t,n,i)}};Ro.prototype.ValueTypeName="number";var Po=class extends Ti{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)_t.slerpFlat(r,0,o,c-a,o,c,l);return r}},cr=class extends an{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Po(this.times,this.values,this.getValueSize(),e)}};cr.prototype.ValueTypeName="quaternion";cr.prototype.InterpolantFactoryMethodSmooth=void 0;var ii=class extends an{constructor(e,t,n){super(e,t,n)}};ii.prototype.ValueTypeName="string";ii.prototype.ValueBufferType=Array;ii.prototype.DefaultInterpolation=zs;ii.prototype.InterpolantFactoryMethodLinear=void 0;ii.prototype.InterpolantFactoryMethodSmooth=void 0;var Io=class extends an{constructor(e,t,n,i){super(e,t,n,i)}};Io.prototype.ValueTypeName="vector";var Do=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},du=new Do,Lo=class{constructor(e){this.manager=e!==void 0?e:du,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Lo.DEFAULT_MATERIAL_NAME="__DEFAULT";var hr=class extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},ur=class extends hr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},_l=new et,fh=new C,ph=new C,Cl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=En,this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cs,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;fh.setFromMatrixPosition(e.matrixWorld),t.position.copy(fh),ph.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ph),t.updateMatrixWorld(),_l.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_l,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_l)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Ai=class extends qs{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Rl=class extends Cl{constructor(){super(new Ai(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},dr=class extends hr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new Rl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ko=class extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var tc="\\[\\]\\.:\\/",Af=new RegExp("["+tc+"]","g"),nc="[^"+tc+"]",Cf="[^"+tc.replace("\\.","")+"]",Rf=/((?:WC+[\/:])*)/.source.replace("WC",nc),Pf=/(WCOD+)?/.source.replace("WCOD",Cf),If=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",nc),Df=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",nc),Lf=new RegExp("^"+Rf+Pf+If+Df+"$"),kf=["material","materials","bones","map"],Pl=class{constructor(e,t,n){let i=n||at.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},at=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Af,"")}static parseTrackName(e){let t=Lf.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);kf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};at.Composite=Pl;at.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};at.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};at.prototype.GetterByBindingType=[at.prototype._getValue_direct,at.prototype._getValue_array,at.prototype._getValue_arrayElement,at.prototype._getValue_toArray];at.prototype.SetterByBindingTypeAndVersioning=[[at.prototype._setValue_direct,at.prototype._setValue_direct_setNeedsUpdate,at.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[at.prototype._setValue_array,at.prototype._setValue_array_setNeedsUpdate,at.prototype._setValue_array_setMatrixWorldNeedsUpdate],[at.prototype._setValue_arrayElement,at.prototype._setValue_arrayElement_setNeedsUpdate,at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[at.prototype._setValue_fromArray,at.prototype._setValue_fromArray_setNeedsUpdate,at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Zy=new Float32Array(1);var mh=new et,fr=class{constructor(e,t,n=0,i=1/0){this.ray=new Vn(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new os,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return mh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(mh),this}intersectObject(e,t=!0,n=[]){return Il(e,this,n,t),n.sort(gh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Il(e[i],this,n,t);return n.sort(gh),n}};function gh(s,e){return s.distance-e.distance}function Il(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Il(r[o],e,t,!0)}}var ps=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ve(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ve(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var pr=class extends wn{constructor(e=10,t=10,n=4473924,i=8947848){n=new Ue(n),i=new Ue(i);let r=t/2,o=e/t,a=e/2,l=[],c=[];for(let d=0,f=0,m=-a;d<=t;d++,m+=o){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);let y=d===r?n:i;y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3}let h=new Ze;h.setAttribute("position",new dt(l,3)),h.setAttribute("color",new dt(c,3));let u=new Pt({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var mr=class extends An{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function ic(s,e,t,n){let i=Uf(n);switch(t){case Gl:return s*e;case Xl:return s*e/i.components*i.byteLength;case Yo:return s*e/i.components*i.byteLength;case $l:return s*e*2/i.components*i.byteLength;case Zo:return s*e*2/i.components*i.byteLength;case Wl:return s*e*3/i.components*i.byteLength;case gn:return s*e*4/i.components*i.byteLength;case Jo:return s*e*4/i.components*i.byteLength;case _r:case xr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case vr:case br:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case jo:case ea:return Math.max(s,16)*Math.max(e,8)/4;case Ko:case Qo:return Math.max(s,8)*Math.max(e,8)/2;case ta:case na:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ia:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case sa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ra:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case oa:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case aa:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case la:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case ca:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case ha:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ua:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case da:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case fa:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case pa:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case ma:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case ga:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case ya:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case _a:case xa:case va:return Math.ceil(s/4)*Math.ceil(e/4)*16;case ba:case Ma:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Sa:case wa:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Uf(s){switch(s){case En:case Bl:return{byteLength:1,components:1};case ms:case zl:case gs:return{byteLength:2,components:1};case $o:case qo:return{byteLength:2,components:4};case oi:case Xo:case In:return{byteLength:4,components:1};case Hl:case Vl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Nu(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Ff(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],y=u[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let y=u[f];s.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Of=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bf=`#ifdef USE_ALPHAHASH
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
#endif`,zf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wf=`#ifdef USE_AOMAP
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
#endif`,Xf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$f=`#ifdef USE_BATCHING
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
#endif`,qf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kf=`#ifdef USE_IRIDESCENCE
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
#endif`,jf=`#ifdef USE_BUMPMAP
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
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ip=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,rp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,op=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ap=`#define PI 3.141592653589793
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
} // validated`,lp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cp=`vec3 transformedNormal = objectNormal;
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
#endif`,hp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,up=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",mp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gp=`#ifdef USE_ENVMAP
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
#endif`,yp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_p=`#ifdef USE_ENVMAP
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
#endif`,xp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vp=`#ifdef USE_ENVMAP
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
#endif`,bp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ep=`#ifdef USE_GRADIENTMAP
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
}`,Tp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ap=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rp=`uniform bool receiveShadow;
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
#endif`,Pp=`#ifdef USE_ENVMAP
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
#endif`,Ip=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Up=`PhysicalMaterial material;
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
#endif`,Np=`struct PhysicalMaterial {
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
}`,Fp=`
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
#endif`,Op=`#if defined( RE_IndirectDiffuse )
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
#endif`,Bp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$p=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qp=`#if defined( USE_POINTS_UV )
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
#endif`,Yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qp=`#ifdef USE_MORPHTARGETS
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
#endif`,em=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,om=`#ifdef USE_NORMALMAP
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
#endif`,am=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,um=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ym=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_m=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mm=`float getShadowMask() {
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
}`,Sm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wm=`#ifdef USE_SKINNING
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
#endif`,Em=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tm=`#ifdef USE_SKINNING
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
#endif`,Am=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Im=`#ifdef USE_TRANSMISSION
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
#endif`,Dm=`#ifdef USE_TRANSMISSION
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
#endif`,Lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Fm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Om=`uniform sampler2D t2D;
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
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gm=`#include <common>
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
}`,Wm=`#if DEPTH_PACKING == 3200
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
}`,Xm=`#define DISTANCE
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
}`,$m=`#define DISTANCE
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
}`,qm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zm=`uniform float scale;
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
}`,Jm=`uniform vec3 diffuse;
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
}`,Km=`#include <common>
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
}`,jm=`uniform vec3 diffuse;
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
}`,Qm=`#define LAMBERT
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
}`,eg=`#define LAMBERT
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
}`,tg=`#define MATCAP
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
}`,ng=`#define MATCAP
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
}`,ig=`#define NORMAL
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
}`,sg=`#define NORMAL
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
}`,rg=`#define PHONG
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
}`,og=`#define PHONG
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
}`,ag=`#define STANDARD
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
}`,lg=`#define STANDARD
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
}`,cg=`#define TOON
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
}`,hg=`#define TOON
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
}`,ug=`uniform float size;
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
}`,dg=`uniform vec3 diffuse;
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
}`,fg=`#include <common>
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
}`,pg=`uniform vec3 color;
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
}`,mg=`uniform float rotation;
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
}`,gg=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Of,alphahash_pars_fragment:Bf,alphamap_fragment:zf,alphamap_pars_fragment:Hf,alphatest_fragment:Vf,alphatest_pars_fragment:Gf,aomap_fragment:Wf,aomap_pars_fragment:Xf,batching_pars_vertex:$f,batching_vertex:qf,begin_vertex:Yf,beginnormal_vertex:Zf,bsdfs:Jf,iridescence_fragment:Kf,bumpmap_pars_fragment:jf,clipping_planes_fragment:Qf,clipping_planes_pars_fragment:ep,clipping_planes_pars_vertex:tp,clipping_planes_vertex:np,color_fragment:ip,color_pars_fragment:sp,color_pars_vertex:rp,color_vertex:op,common:ap,cube_uv_reflection_fragment:lp,defaultnormal_vertex:cp,displacementmap_pars_vertex:hp,displacementmap_vertex:up,emissivemap_fragment:dp,emissivemap_pars_fragment:fp,colorspace_fragment:pp,colorspace_pars_fragment:mp,envmap_fragment:gp,envmap_common_pars_fragment:yp,envmap_pars_fragment:_p,envmap_pars_vertex:xp,envmap_physical_pars_fragment:Pp,envmap_vertex:vp,fog_vertex:bp,fog_pars_vertex:Mp,fog_fragment:Sp,fog_pars_fragment:wp,gradientmap_pars_fragment:Ep,lightmap_pars_fragment:Tp,lights_lambert_fragment:Ap,lights_lambert_pars_fragment:Cp,lights_pars_begin:Rp,lights_toon_fragment:Ip,lights_toon_pars_fragment:Dp,lights_phong_fragment:Lp,lights_phong_pars_fragment:kp,lights_physical_fragment:Up,lights_physical_pars_fragment:Np,lights_fragment_begin:Fp,lights_fragment_maps:Op,lights_fragment_end:Bp,logdepthbuf_fragment:zp,logdepthbuf_pars_fragment:Hp,logdepthbuf_pars_vertex:Vp,logdepthbuf_vertex:Gp,map_fragment:Wp,map_pars_fragment:Xp,map_particle_fragment:$p,map_particle_pars_fragment:qp,metalnessmap_fragment:Yp,metalnessmap_pars_fragment:Zp,morphinstance_vertex:Jp,morphcolor_vertex:Kp,morphnormal_vertex:jp,morphtarget_pars_vertex:Qp,morphtarget_vertex:em,normal_fragment_begin:tm,normal_fragment_maps:nm,normal_pars_fragment:im,normal_pars_vertex:sm,normal_vertex:rm,normalmap_pars_fragment:om,clearcoat_normal_fragment_begin:am,clearcoat_normal_fragment_maps:lm,clearcoat_pars_fragment:cm,iridescence_pars_fragment:hm,opaque_fragment:um,packing:dm,premultiplied_alpha_fragment:fm,project_vertex:pm,dithering_fragment:mm,dithering_pars_fragment:gm,roughnessmap_fragment:ym,roughnessmap_pars_fragment:_m,shadowmap_pars_fragment:xm,shadowmap_pars_vertex:vm,shadowmap_vertex:bm,shadowmask_pars_fragment:Mm,skinbase_vertex:Sm,skinning_pars_vertex:wm,skinning_vertex:Em,skinnormal_vertex:Tm,specularmap_fragment:Am,specularmap_pars_fragment:Cm,tonemapping_fragment:Rm,tonemapping_pars_fragment:Pm,transmission_fragment:Im,transmission_pars_fragment:Dm,uv_pars_fragment:Lm,uv_pars_vertex:km,uv_vertex:Um,worldpos_vertex:Nm,background_vert:Fm,background_frag:Om,backgroundCube_vert:Bm,backgroundCube_frag:zm,cube_vert:Hm,cube_frag:Vm,depth_vert:Gm,depth_frag:Wm,distanceRGBA_vert:Xm,distanceRGBA_frag:$m,equirect_vert:qm,equirect_frag:Ym,linedashed_vert:Zm,linedashed_frag:Jm,meshbasic_vert:Km,meshbasic_frag:jm,meshlambert_vert:Qm,meshlambert_frag:eg,meshmatcap_vert:tg,meshmatcap_frag:ng,meshnormal_vert:ig,meshnormal_frag:sg,meshphong_vert:rg,meshphong_frag:og,meshphysical_vert:ag,meshphysical_frag:lg,meshtoon_vert:cg,meshtoon_frag:hg,points_vert:ug,points_frag:dg,shadow_vert:fg,shadow_frag:pg,sprite_vert:mg,sprite_frag:gg},ae={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Dn={basic:{uniforms:Bt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Bt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Bt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Bt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Bt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Bt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Bt([ae.points,ae.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Bt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Bt([ae.common,ae.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Bt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Bt([ae.sprite,ae.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Bt([ae.common,ae.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Bt([ae.lights,ae.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Dn.physical={uniforms:Bt([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};var Ea={r:0,b:0,g:0},Di=new Mn,yg=new et;function _g(s,e,t,n,i,r,o){let a=new Ue(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?t:e).get(x)),x}function y(M){let x=!1,T=m(M);T===null?p(a,l):T&&T.isColor&&(p(T,1),x=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(M,x){let T=m(x);T&&(T.isCubeTexture||T.mapping===gr)?(h===void 0&&(h=new ct(new as(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:Ii(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,R,k){this.matrixWorld.copyPosition(k.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Di.copy(x.backgroundRotation),Di.x*=-1,Di.y*=-1,Di.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(yg.makeRotationFromEuler(Di)),h.material.toneMapped=qe.getTransfer(T.colorSpace)!==Qe,(u!==T||d!==T.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=s.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new ct(new Gn(2,2),new Sn({name:"BackgroundMaterial",uniforms:Ii(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=qe.getTransfer(T.colorSpace)!==Qe,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,f=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,x){M.getRGB(Ea,Ql(s)),n.buffers.color.setClear(Ea.r,Ea.g,Ea.b,x,o)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,x=1){a.set(M),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:y,addToRenderList:g,dispose:w}}function xg(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(b,I,N,F,z){let X=!1,G=u(F,N,I);r!==G&&(r=G,c(r.object)),X=f(b,F,N,z),X&&m(b,F,N,z),z!==null&&e.update(z,s.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,x(b,I,N,F),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return s.createVertexArray()}function c(b){return s.bindVertexArray(b)}function h(b){return s.deleteVertexArray(b)}function u(b,I,N){let F=N.wireframe===!0,z=n[b.id];z===void 0&&(z={},n[b.id]=z);let X=z[I.id];X===void 0&&(X={},z[I.id]=X);let G=X[F];return G===void 0&&(G=d(l()),X[F]=G),G}function d(b){let I=[],N=[],F=[];for(let z=0;z<t;z++)I[z]=0,N[z]=0,F[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:N,attributeDivisors:F,object:b,attributes:{},index:null}}function f(b,I,N,F){let z=r.attributes,X=I.attributes,G=0,q=N.getAttributes();for(let V in q)if(q[V].location>=0){let Q=z[V],de=X[V];if(de===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(de=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(de=b.instanceColor)),Q===void 0||Q.attribute!==de||de&&Q.data!==de.data)return!0;G++}return r.attributesNum!==G||r.index!==F}function m(b,I,N,F){let z={},X=I.attributes,G=0,q=N.getAttributes();for(let V in q)if(q[V].location>=0){let Q=X[V];Q===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor));let de={};de.attribute=Q,Q&&Q.data&&(de.data=Q.data),z[V]=de,G++}r.attributes=z,r.attributesNum=G,r.index=F}function y(){let b=r.newAttributes;for(let I=0,N=b.length;I<N;I++)b[I]=0}function g(b){p(b,0)}function p(b,I){let N=r.newAttributes,F=r.enabledAttributes,z=r.attributeDivisors;N[b]=1,F[b]===0&&(s.enableVertexAttribArray(b),F[b]=1),z[b]!==I&&(s.vertexAttribDivisor(b,I),z[b]=I)}function w(){let b=r.newAttributes,I=r.enabledAttributes;for(let N=0,F=I.length;N<F;N++)I[N]!==b[N]&&(s.disableVertexAttribArray(N),I[N]=0)}function M(b,I,N,F,z,X,G){G===!0?s.vertexAttribIPointer(b,I,N,z,X):s.vertexAttribPointer(b,I,N,F,z,X)}function x(b,I,N,F){y();let z=F.attributes,X=N.getAttributes(),G=I.defaultAttributeValues;for(let q in X){let V=X[q];if(V.location>=0){let Z=z[q];if(Z===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(Z=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(Z=b.instanceColor)),Z!==void 0){let Q=Z.normalized,de=Z.itemSize,Ne=e.get(Z);if(Ne===void 0)continue;let Je=Ne.buffer,Ke=Ne.type,$e=Ne.bytesPerElement,Y=Ke===s.INT||Ke===s.UNSIGNED_INT||Z.gpuType===Xo;if(Z.isInterleavedBufferAttribute){let j=Z.data,pe=j.stride,ke=Z.offset;if(j.isInstancedInterleavedBuffer){for(let we=0;we<V.locationSize;we++)p(V.location+we,j.meshPerAttribute);b.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let we=0;we<V.locationSize;we++)g(V.location+we);s.bindBuffer(s.ARRAY_BUFFER,Je);for(let we=0;we<V.locationSize;we++)M(V.location+we,de/V.locationSize,Ke,Q,pe*$e,(ke+de/V.locationSize*we)*$e,Y)}else{if(Z.isInstancedBufferAttribute){for(let j=0;j<V.locationSize;j++)p(V.location+j,Z.meshPerAttribute);b.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let j=0;j<V.locationSize;j++)g(V.location+j);s.bindBuffer(s.ARRAY_BUFFER,Je);for(let j=0;j<V.locationSize;j++)M(V.location+j,de/V.locationSize,Ke,Q,de*$e,de/V.locationSize*j*$e,Y)}}else if(G!==void 0){let Q=G[q];if(Q!==void 0)switch(Q.length){case 2:s.vertexAttrib2fv(V.location,Q);break;case 3:s.vertexAttrib3fv(V.location,Q);break;case 4:s.vertexAttrib4fv(V.location,Q);break;default:s.vertexAttrib1fv(V.location,Q)}}}}w()}function T(){k();for(let b in n){let I=n[b];for(let N in I){let F=I[N];for(let z in F)h(F[z].object),delete F[z];delete I[N]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;let I=n[b.id];for(let N in I){let F=I[N];for(let z in F)h(F[z].object),delete F[z];delete I[N]}delete n[b.id]}function R(b){for(let I in n){let N=n[I];if(N[b.id]===void 0)continue;let F=N[b.id];for(let z in F)h(F[z].object),delete F[z];delete N[b.id]}}function k(){S(),o=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:k,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:g,disableUnusedAttributes:w}}function vg(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let y=0;y<u;y++)m+=h[y]*d[y];t.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function bg(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==gn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let k=R===gs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==En&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==In&&!k)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:w,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:T,maxSamples:A}}function Mg(s){let e=this,t=null,n=0,i=!1,r=!1,o=new Nt,a=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):c();else{let w=r?0:n,M=w*4,x=p.clippingState||null;l.value=x,x=h(m,d,M,f);for(let T=0;T!==M;++T)x[T]=t[T];p.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){let y=u!==null?u.length:0,g=null;if(y!==0){if(g=l.value,m!==!0||g===null){let p=f+y*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(g===null||g.length<p)&&(g=new Float32Array(p));for(let M=0,x=f;M!==y;++M,x+=4)o.copy(u[M]).applyMatrix4(w,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function Sg(s){let e=new WeakMap;function t(o,a){return a===Vo?o.mapping=Ci:a===Go&&(o.mapping=Ri),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Vo||a===Go)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new po(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var vs=4,fu=[.125,.215,.35,.446,.526,.582],Ui=20,sc=new Ai,pu=new Ue,rc=null,oc=0,ac=0,lc=!1,ki=(1+Math.sqrt(5))/2,xs=1/ki,mu=[new C(-ki,xs,0),new C(ki,xs,0),new C(-xs,0,ki),new C(xs,0,ki),new C(0,ki,-xs),new C(0,ki,xs),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],wg=new C,Ca=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=wg}=r;rc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_u(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(rc,oc,ac),this._renderer.xr.enabled=lc,e.scissorTest=!1,Ta(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ci||e.mapping===Ri?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:gs,format:gn,colorSpace:bi,depthBuffer:!1},i=gu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Eg(r)),this._blurMaterial=Tg(r,e,t)}return i}_compileMaterial(e){let t=new ct(this._lodPlanes[0],e);this._renderer.compile(t,sc)}_sceneToCubeUV(e,t,n,i,r){let l=new Zt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(pu),u.toneMapping=Xn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));let y=new Ft({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),g=new ct(new as,y),p=!1,w=e.background;w?w.isColor&&(y.color.copy(w),e.background=null,p=!0):(y.color.copy(pu),p=!0);for(let M=0;M<6;M++){let x=M%3;x===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):x===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));let T=this._cubeSize;Ta(i,x*T,M>2?T:0,T,T),u.setRenderTarget(i),p&&u.render(g,l),u.render(e,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=w}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Ci||e.mapping===Ri;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=_u()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yu());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new ct(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Ta(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,sc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=mu[(i-r-1)%mu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ct(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ui-1),y=r/m,g=isFinite(r)?1+Math.floor(h*y):Ui;g>Ui&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ui}`);let p=[],w=0;for(let R=0;R<Ui;++R){let k=R/y,S=Math.exp(-k*k/2);p.push(S),R===0?w+=S:R<g&&(w+=2*S)}for(let R=0;R<p.length;R++)p[R]=p[R]/w;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:M}=this;d.dTheta.value=m,d.mipInt.value=M-n;let x=this._sizeLods[i],T=3*x*(i>M-vs?i-M+vs:0),A=4*(this._cubeSize-x);Ta(t,T,A,3*x,2*x),l.setRenderTarget(t),l.render(u,sc)}};function Eg(s){let e=[],t=[],n=[],i=s,r=s-vs+1+fu.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let l=1/a;o>s-vs?l=fu[o-s+vs-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,y=3,g=2,p=1,w=new Float32Array(y*m*f),M=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let A=0;A<f;A++){let R=A%3*2/3-1,k=A>2?0:-1,S=[R,k,0,R+2/3,k,0,R+2/3,k+1,0,R,k,0,R+2/3,k+1,0,R,k+1,0];w.set(S,y*m*A),M.set(d,g*m*A);let b=[A,A,A,A,A,A];x.set(b,p*m*A)}let T=new Ze;T.setAttribute("position",new lt(w,y)),T.setAttribute("uv",new lt(M,g)),T.setAttribute("faceIndex",new lt(x,p)),e.push(T),i>vs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function gu(s,e,t){let n=new Cn(s,e,t);return n.texture.mapping=gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ta(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Tg(s,e,t){let n=new Float32Array(Ui),i=new C(0,1,0);return new Sn({name:"SphericalGaussianBlur",defines:{n:Ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:_c(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function yu(){return new Sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function _u(){return new Sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function _c(){return`

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
	`}function Ag(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Vo||l===Go,h=l===Ci||l===Ri;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ca(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Ca(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Cg(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&ss("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Rg(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,m=u.attributes.position,y=0;if(f!==null){let w=f.array;y=f.version;for(let M=0,x=w.length;M<x;M+=3){let T=w[M+0],A=w[M+1],R=w[M+2];d.push(T,A,A,R,R,T)}}else if(m!==void 0){let w=m.array;y=m.version;for(let M=0,x=w.length/3-1;M<x;M+=3){let T=M+0,A=M+1,R=M+2;d.push(T,A,A,R,R,T)}}else return;let g=new(jl(d)?$s:Xs)(d,1);g.version=y;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Pg(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,m){m!==0&&(s.drawElementsInstanced(n,f,r,d*o,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,y){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],y[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,y,0,m);let p=0;for(let w=0;w<m;w++)p+=f[w]*y[w];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Ig(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Dg(s,e,t){let n=new WeakMap,i=new gt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let S=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],M=0;f===!0&&(M=1),m===!0&&(M=2),y===!0&&(M=3);let x=a.attributes.position.count*M,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let A=new Float32Array(x*T*4*u),R=new Ws(A,x,T,u);R.type=In,R.needsUpdate=!0;let k=M*4;for(let b=0;b<u;b++){let I=g[b],N=p[b],F=w[b],z=x*T*4*b;for(let X=0;X<I.count;X++){let G=X*k;f===!0&&(i.fromBufferAttribute(I,X),A[z+G+0]=i.x,A[z+G+1]=i.y,A[z+G+2]=i.z,A[z+G+3]=0),m===!0&&(i.fromBufferAttribute(N,X),A[z+G+4]=i.x,A[z+G+5]=i.y,A[z+G+6]=i.z,A[z+G+7]=0),y===!0&&(i.fromBufferAttribute(F,X),A[z+G+8]=i.x,A[z+G+9]=i.y,A[z+G+10]=i.z,A[z+G+11]=F.itemSize===4?i.w:1)}}d={count:u,texture:R,size:new oe(x,T)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Lg(s,e,t,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var Fu=new sn,xu=new Ks(1,1),Ou=new Ws,Bu=new uo,zu=new Ys,vu=[],bu=[],Mu=new Float32Array(16),Su=new Float32Array(9),wu=new Float32Array(4);function Ms(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=vu[i];if(r===void 0&&(r=new Float32Array(i),vu[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Et(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Tt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Pa(s,e){let t=bu[e];t===void 0&&(t=new Int32Array(e),bu[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function kg(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Ug(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;s.uniform2fv(this.addr,e),Tt(t,e)}}function Ng(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;s.uniform3fv(this.addr,e),Tt(t,e)}}function Fg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;s.uniform4fv(this.addr,e),Tt(t,e)}}function Og(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;wu.set(n),s.uniformMatrix2fv(this.addr,!1,wu),Tt(t,n)}}function Bg(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;Su.set(n),s.uniformMatrix3fv(this.addr,!1,Su),Tt(t,n)}}function zg(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Et(t,n))return;Mu.set(n),s.uniformMatrix4fv(this.addr,!1,Mu),Tt(t,n)}}function Hg(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Vg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;s.uniform2iv(this.addr,e),Tt(t,e)}}function Gg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;s.uniform3iv(this.addr,e),Tt(t,e)}}function Wg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;s.uniform4iv(this.addr,e),Tt(t,e)}}function Xg(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function $g(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;s.uniform2uiv(this.addr,e),Tt(t,e)}}function qg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;s.uniform3uiv(this.addr,e),Tt(t,e)}}function Yg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;s.uniform4uiv(this.addr,e),Tt(t,e)}}function Zg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(xu.compareFunction=Yl,r=xu):r=Fu,t.setTexture2D(e||r,i)}function Jg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Bu,i)}function Kg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||zu,i)}function jg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ou,i)}function Qg(s){switch(s){case 5126:return kg;case 35664:return Ug;case 35665:return Ng;case 35666:return Fg;case 35674:return Og;case 35675:return Bg;case 35676:return zg;case 5124:case 35670:return Hg;case 35667:case 35671:return Vg;case 35668:case 35672:return Gg;case 35669:case 35673:return Wg;case 5125:return Xg;case 36294:return $g;case 36295:return qg;case 36296:return Yg;case 35678:case 36198:case 36298:case 36306:case 35682:return Zg;case 35679:case 36299:case 36307:return Jg;case 35680:case 36300:case 36308:case 36293:return Kg;case 36289:case 36303:case 36311:case 36292:return jg}}function e0(s,e){s.uniform1fv(this.addr,e)}function t0(s,e){let t=Ms(e,this.size,2);s.uniform2fv(this.addr,t)}function n0(s,e){let t=Ms(e,this.size,3);s.uniform3fv(this.addr,t)}function i0(s,e){let t=Ms(e,this.size,4);s.uniform4fv(this.addr,t)}function s0(s,e){let t=Ms(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function r0(s,e){let t=Ms(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function o0(s,e){let t=Ms(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function a0(s,e){s.uniform1iv(this.addr,e)}function l0(s,e){s.uniform2iv(this.addr,e)}function c0(s,e){s.uniform3iv(this.addr,e)}function h0(s,e){s.uniform4iv(this.addr,e)}function u0(s,e){s.uniform1uiv(this.addr,e)}function d0(s,e){s.uniform2uiv(this.addr,e)}function f0(s,e){s.uniform3uiv(this.addr,e)}function p0(s,e){s.uniform4uiv(this.addr,e)}function m0(s,e,t){let n=this.cache,i=e.length,r=Pa(t,i);Et(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Fu,r[o])}function g0(s,e,t){let n=this.cache,i=e.length,r=Pa(t,i);Et(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Bu,r[o])}function y0(s,e,t){let n=this.cache,i=e.length,r=Pa(t,i);Et(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||zu,r[o])}function _0(s,e,t){let n=this.cache,i=e.length,r=Pa(t,i);Et(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Ou,r[o])}function x0(s){switch(s){case 5126:return e0;case 35664:return t0;case 35665:return n0;case 35666:return i0;case 35674:return s0;case 35675:return r0;case 35676:return o0;case 5124:case 35670:return a0;case 35667:case 35671:return l0;case 35668:case 35672:return c0;case 35669:case 35673:return h0;case 5125:return u0;case 36294:return d0;case 36295:return f0;case 36296:return p0;case 35678:case 36198:case 36298:case 36306:case 35682:return m0;case 35679:case 36299:case 36307:return g0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return _0}}var hc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Qg(t.type)}},uc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=x0(t.type)}},dc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},cc=/(\w+)(\])?(\[|\.)?/g;function Eu(s,e){s.seq.push(e),s.map[e.id]=e}function v0(s,e,t){let n=s.name,i=n.length;for(cc.lastIndex=0;;){let r=cc.exec(n),o=cc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Eu(t,c===void 0?new hc(a,s,e):new uc(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new dc(a),Eu(t,u)),t=u}}}var bs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);v0(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function Tu(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var b0=37297,M0=0;function S0(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Au=new Be;function w0(s){qe._getMatrix(Au,qe.workingColorSpace,s);let e=`mat3( ${Au.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(s)){case Hs:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Cu(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+S0(s.getShaderSource(e),a)}else return r}function E0(s,e){let t=w0(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function T0(s,e){let t;switch(e){case zh:t="Linear";break;case Hh:t="Reinhard";break;case Vh:t="Cineon";break;case Gh:t="ACESFilmic";break;case Xh:t="AgX";break;case $h:t="Neutral";break;case Wh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Aa=new C;function A0(){qe.getLuminanceCoefficients(Aa);let s=Aa.x.toFixed(4),e=Aa.y.toFixed(4),t=Aa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function C0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Mr).join(`
`)}function R0(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function P0(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Mr(s){return s!==""}function Ru(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Pu(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var I0=/^[ \t]*#include +<([\w\d./]+)>/gm;function fc(s){return s.replace(I0,L0)}var D0=new Map;function L0(s,e){let t=Ge[e];if(t===void 0){let n=D0.get(e);if(n!==void 0)t=Ge[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return fc(t)}var k0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Iu(s){return s.replace(k0,U0)}function U0(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Du(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function N0(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ll?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===xh?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Pn&&(e="SHADOWMAP_TYPE_VSM"),e}function F0(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ci:case Ri:e="ENVMAP_TYPE_CUBE";break;case gr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function O0(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ri:e="ENVMAP_MODE_REFRACTION";break}return e}function B0(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Fl:e="ENVMAP_BLENDING_MULTIPLY";break;case Oh:e="ENVMAP_BLENDING_MIX";break;case Bh:e="ENVMAP_BLENDING_ADD";break}return e}function z0(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function H0(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=N0(t),c=F0(t),h=O0(t),u=B0(t),d=z0(t),f=C0(t),m=R0(r),y=i.createProgram(),g,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Mr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Mr).join(`
`),p.length>0&&(p+=`
`)):(g=[Du(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mr).join(`
`),p=[Du(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Xn?T0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,E0("linearToOutputTexel",t.outputColorSpace),A0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Mr).join(`
`)),o=fc(o),o=Ru(o,t),o=Pu(o,t),a=fc(a),a=Ru(a,t),a=Pu(a,t),o=Iu(o),a=Iu(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let M=w+g+o,x=w+p+a,T=Tu(i,i.VERTEX_SHADER,M),A=Tu(i,i.FRAGMENT_SHADER,x);i.attachShader(y,T),i.attachShader(y,A),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function R(I){if(s.debug.checkShaderErrors){let N=i.getProgramInfoLog(y)||"",F=i.getShaderInfoLog(T)||"",z=i.getShaderInfoLog(A)||"",X=N.trim(),G=F.trim(),q=z.trim(),V=!0,Z=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,T,A);else{let Q=Cu(i,T,"vertex"),de=Cu(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+X+`
`+Q+`
`+de)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(G===""||q==="")&&(Z=!1);Z&&(I.diagnostics={runnable:V,programLog:X,vertexShader:{log:G,prefix:g},fragmentShader:{log:q,prefix:p}})}i.deleteShader(T),i.deleteShader(A),k=new bs(i,y),S=P0(i,y)}let k;this.getUniforms=function(){return k===void 0&&R(this),k};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(y,b0)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=M0++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=A,this}var V0=0,pc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new mc(e),t.set(e,n)),n}},mc=class{constructor(e){this.id=V0++,this.code=e,this.usedTimes=0}};function G0(s,e,t,n,i,r,o){let a=new os,l=new pc,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,b,I,N,F){let z=N.fog,X=F.geometry,G=S.isMeshStandardMaterial?N.environment:null,q=(S.isMeshStandardMaterial?t:e).get(S.envMap||G),V=q&&q.mapping===gr?q.image.height:null,Z=m[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let Q=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,de=Q!==void 0?Q.length:0,Ne=0;X.morphAttributes.position!==void 0&&(Ne=1),X.morphAttributes.normal!==void 0&&(Ne=2),X.morphAttributes.color!==void 0&&(Ne=3);let Je,Ke,$e,Y;if(Z){let je=Dn[Z];Je=je.vertexShader,Ke=je.fragmentShader}else Je=S.vertexShader,Ke=S.fragmentShader,l.update(S),$e=l.getVertexShaderID(S),Y=l.getFragmentShaderID(S);let j=s.getRenderTarget(),pe=s.state.buffers.depth.getReversed(),ke=F.isInstancedMesh===!0,we=F.isBatchedMesh===!0,Xe=!!S.map,Lt=!!S.matcap,P=!!q,ht=!!S.aoMap,Oe=!!S.lightMap,De=!!S.bumpMap,ye=!!S.normalMap,ut=!!S.displacementMap,_e=!!S.emissiveMap,He=!!S.metalnessMap,Ct=!!S.roughnessMap,vt=S.anisotropy>0,E=S.clearcoat>0,_=S.dispersion>0,O=S.iridescence>0,$=S.sheen>0,K=S.transmission>0,W=vt&&!!S.anisotropyMap,Me=E&&!!S.clearcoatMap,se=E&&!!S.clearcoatNormalMap,xe=E&&!!S.clearcoatRoughnessMap,ve=O&&!!S.iridescenceMap,ne=O&&!!S.iridescenceThicknessMap,he=$&&!!S.sheenColorMap,Ie=$&&!!S.sheenRoughnessMap,be=!!S.specularMap,le=!!S.specularColorMap,ze=!!S.specularIntensityMap,D=K&&!!S.transmissionMap,ie=K&&!!S.thicknessMap,re=!!S.gradientMap,fe=!!S.alphaMap,ee=S.alphaTest>0,J=!!S.alphaHash,ge=!!S.extensions,Fe=Xn;S.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Fe=s.toneMapping);let rt={shaderID:Z,shaderType:S.type,shaderName:S.name,vertexShader:Je,fragmentShader:Ke,defines:S.defines,customVertexShaderID:$e,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:we,batchingColor:we&&F._colorsTexture!==null,instancing:ke,instancingColor:ke&&F.instanceColor!==null,instancingMorph:ke&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:j===null?s.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:bi,alphaToCoverage:!!S.alphaToCoverage,map:Xe,matcap:Lt,envMap:P,envMapMode:P&&q.mapping,envMapCubeUVHeight:V,aoMap:ht,lightMap:Oe,bumpMap:De,normalMap:ye,displacementMap:d&&ut,emissiveMap:_e,normalMapObjectSpace:ye&&S.normalMapType===Jh,normalMapTangentSpace:ye&&S.normalMapType===ql,metalnessMap:He,roughnessMap:Ct,anisotropy:vt,anisotropyMap:W,clearcoat:E,clearcoatMap:Me,clearcoatNormalMap:se,clearcoatRoughnessMap:xe,dispersion:_,iridescence:O,iridescenceMap:ve,iridescenceThicknessMap:ne,sheen:$,sheenColorMap:he,sheenRoughnessMap:Ie,specularMap:be,specularColorMap:le,specularIntensityMap:ze,transmission:K,transmissionMap:D,thicknessMap:ie,gradientMap:re,opaque:S.transparent===!1&&S.blending===xi&&S.alphaToCoverage===!1,alphaMap:fe,alphaTest:ee,alphaHash:J,combine:S.combine,mapUv:Xe&&y(S.map.channel),aoMapUv:ht&&y(S.aoMap.channel),lightMapUv:Oe&&y(S.lightMap.channel),bumpMapUv:De&&y(S.bumpMap.channel),normalMapUv:ye&&y(S.normalMap.channel),displacementMapUv:ut&&y(S.displacementMap.channel),emissiveMapUv:_e&&y(S.emissiveMap.channel),metalnessMapUv:He&&y(S.metalnessMap.channel),roughnessMapUv:Ct&&y(S.roughnessMap.channel),anisotropyMapUv:W&&y(S.anisotropyMap.channel),clearcoatMapUv:Me&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:se&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:he&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&y(S.sheenRoughnessMap.channel),specularMapUv:be&&y(S.specularMap.channel),specularColorMapUv:le&&y(S.specularColorMap.channel),specularIntensityMapUv:ze&&y(S.specularIntensityMap.channel),transmissionMapUv:D&&y(S.transmissionMap.channel),thicknessMapUv:ie&&y(S.thicknessMap.channel),alphaMapUv:fe&&y(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(ye||vt),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!X.attributes.uv&&(Xe||fe),fog:!!z,useFog:S.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:pe,skinning:F.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Ne,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:Fe,decodeVideoTexture:Xe&&S.map.isVideoTexture===!0&&qe.getTransfer(S.map.colorSpace)===Qe,decodeVideoTextureEmissive:_e&&S.emissiveMap.isVideoTexture===!0&&qe.getTransfer(S.emissiveMap.colorSpace)===Qe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===xt,flipSided:S.side===Xt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:ge&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&S.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return rt.vertexUv1s=c.has(1),rt.vertexUv2s=c.has(2),rt.vertexUv3s=c.has(3),c.clear(),rt}function p(S){let b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(let I in S.defines)b.push(I),b.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(w(b,S),M(b,S),b.push(s.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function w(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function M(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function x(S){let b=m[S.type],I;if(b){let N=Dn[b];I=au.clone(N.uniforms)}else I=S.uniforms;return I}function T(S,b){let I;for(let N=0,F=h.length;N<F;N++){let z=h[N];if(z.cacheKey===b){I=z,++I.usedTimes;break}}return I===void 0&&(I=new H0(s,b,S,r),h.push(I)),I}function A(S){if(--S.usedTimes===0){let b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function R(S){l.remove(S)}function k(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:T,releaseProgram:A,releaseShaderCache:R,programs:h,dispose:k}}function W0(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function X0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Lu(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ku(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,m,y,g){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:y,group:g},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=y,p.group=g),e++,p}function a(u,d,f,m,y,g){let p=o(u,d,f,m,y,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,m,y,g){let p=o(u,d,f,m,y,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||X0),n.length>1&&n.sort(d||Lu),i.length>1&&i.sort(d||Lu)}function h(){for(let u=e,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function $0(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new ku,s.set(n,[o])):i>=r.length?(o=new ku,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function q0(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Ue};break;case"SpotLight":t={position:new C,direction:new C,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new C,halfWidth:new C,halfHeight:new C};break}return s[e.id]=t,t}}}function Y0(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Z0=0;function J0(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function K0(s){let e=new q0,t=Y0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let i=new C,r=new et,o=new et;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,w=0,M=0,x=0,T=0,A=0,R=0;c.sort(J0);for(let S=0,b=c.length;S<b;S++){let I=c[S],N=I.color,F=I.intensity,z=I.distance,X=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=N.r*F,u+=N.g*F,d+=N.b*F;else if(I.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(I.sh.coefficients[G],F);R++}else if(I.isDirectionalLight){let G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let q=I.shadow,V=t.get(I);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=I.shadow.matrix,w++}n.directional[f]=G,f++}else if(I.isSpotLight){let G=e.get(I);G.position.setFromMatrixPosition(I.matrixWorld),G.color.copy(N).multiplyScalar(F),G.distance=z,G.coneCos=Math.cos(I.angle),G.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),G.decay=I.decay,n.spot[y]=G;let q=I.shadow;if(I.map&&(n.spotLightMap[T]=I.map,T++,q.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[y]=q.matrix,I.castShadow){let V=t.get(I);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,n.spotShadow[y]=V,n.spotShadowMap[y]=X,x++}y++}else if(I.isRectAreaLight){let G=e.get(I);G.color.copy(N).multiplyScalar(F),G.halfWidth.set(I.width*.5,0,0),G.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=G,g++}else if(I.isPointLight){let G=e.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),G.distance=I.distance,G.decay=I.decay,I.castShadow){let q=I.shadow,V=t.get(I);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,V.shadowCameraNear=q.camera.near,V.shadowCameraFar=q.camera.far,n.pointShadow[m]=V,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=I.shadow.matrix,M++}n.point[m]=G,m++}else if(I.isHemisphereLight){let G=e.get(I);G.skyColor.copy(I.color).multiplyScalar(F),G.groundColor.copy(I.groundColor).multiplyScalar(F),n.hemi[p]=G,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let k=n.hash;(k.directionalLength!==f||k.pointLength!==m||k.spotLength!==y||k.rectAreaLength!==g||k.hemiLength!==p||k.numDirectionalShadows!==w||k.numPointShadows!==M||k.numSpotShadows!==x||k.numSpotMaps!==T||k.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+T-A,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,k.directionalLength=f,k.pointLength=m,k.spotLength=y,k.rectAreaLength=g,k.hemiLength=p,k.numDirectionalShadows=w,k.numPointShadows=M,k.numSpotShadows=x,k.numSpotMaps=T,k.numLightProbes=R,n.version=Z0++)}function l(c,h){let u=0,d=0,f=0,m=0,y=0,g=h.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){let M=c[p];if(M.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),u++}else if(M.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),f++}else if(M.isRectAreaLight){let x=n.rectArea[m];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(M.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),m++}else if(M.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){let x=n.hemi[y];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(g),y++}}}return{setup:a,setupView:l,state:n}}function Uu(s){let e=new K0(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function j0(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new Uu(s),e.set(i,[a])):r>=o.length?(a=new Uu(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Q0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ey=`uniform sampler2D shadow_pass;
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
}`;function ty(s,e,t){let n=new cs,i=new oe,r=new oe,o=new gt,a=new So({depthPacking:Zh}),l=new wo,c={},h=t.maxTextureSize,u={[Hn]:Xt,[Xt]:Hn,[xt]:xt},d=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:Q0,fragmentShader:ey}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new Ze;m.setAttribute("position",new lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ct(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ll;let p=this.type;this.render=function(A,R,k){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;let S=s.getRenderTarget(),b=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),N=s.state;N.setBlending(Wn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let F=p!==Pn&&this.type===Pn,z=p===Pn&&this.type!==Pn;for(let X=0,G=A.length;X<G;X++){let q=A[X],V=q.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);let Z=V.getFrameExtents();if(i.multiply(Z),r.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Z.x),i.x=r.x*Z.x,V.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Z.y),i.y=r.y*Z.y,V.mapSize.y=r.y)),V.map===null||F===!0||z===!0){let de=this.type!==Pn?{minFilter:pn,magFilter:pn}:{};V.map!==null&&V.map.dispose(),V.map=new Cn(i.x,i.y,de),V.map.texture.name=q.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();let Q=V.getViewportCount();for(let de=0;de<Q;de++){let Ne=V.getViewport(de);o.set(r.x*Ne.x,r.y*Ne.y,r.x*Ne.z,r.y*Ne.w),N.viewport(o),V.updateMatrices(q,de),n=V.getFrustum(),x(R,k,V.camera,q,this.type)}V.isPointLightShadow!==!0&&this.type===Pn&&w(V,k),V.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(S,b,I)};function w(A,R){let k=e.update(y);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Cn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,k,d,y,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,k,f,y,null)}function M(A,R,k,S){let b=null,I=k.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)b=I;else if(b=k.isPointLight===!0?l:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let N=b.uuid,F=R.uuid,z=c[N];z===void 0&&(z={},c[N]=z);let X=z[F];X===void 0&&(X=b.clone(),z[F]=X,R.addEventListener("dispose",T)),b=X}if(b.visible=R.visible,b.wireframe=R.wireframe,S===Pn?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:u[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,k.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let N=s.properties.get(b);N.light=k}return b}function x(A,R,k,S,b){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Pn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,A.matrixWorld);let F=e.update(A),z=A.material;if(Array.isArray(z)){let X=F.groups;for(let G=0,q=X.length;G<q;G++){let V=X[G],Z=z[V.materialIndex];if(Z&&Z.visible){let Q=M(A,Z,S,b);A.onBeforeShadow(s,A,R,k,F,Q,V),s.renderBufferDirect(k,null,F,Q,A,V),A.onAfterShadow(s,A,R,k,F,Q,V)}}}else if(z.visible){let X=M(A,z,S,b);A.onBeforeShadow(s,A,R,k,F,X,null),s.renderBufferDirect(k,null,F,X,A,null),A.onAfterShadow(s,A,R,k,F,X,null)}}let N=A.children;for(let F=0,z=N.length;F<z;F++)x(N[F],R,k,S,b)}function T(A){A.target.removeEventListener("dispose",T);for(let k in c){let S=c[k],b=A.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}var ny={[Uo]:No,[Fo]:zo,[Oo]:Ho,[vi]:Bo,[No]:Uo,[zo]:Fo,[Ho]:Oo,[Bo]:vi};function iy(s,e){function t(){let D=!1,ie=new gt,re=null,fe=new gt(0,0,0,0);return{setMask:function(ee){re!==ee&&!D&&(s.colorMask(ee,ee,ee,ee),re=ee)},setLocked:function(ee){D=ee},setClear:function(ee,J,ge,Fe,rt){rt===!0&&(ee*=Fe,J*=Fe,ge*=Fe),ie.set(ee,J,ge,Fe),fe.equals(ie)===!1&&(s.clearColor(ee,J,ge,Fe),fe.copy(ie))},reset:function(){D=!1,re=null,fe.set(-1,0,0,0)}}}function n(){let D=!1,ie=!1,re=null,fe=null,ee=null;return{setReversed:function(J){if(ie!==J){let ge=e.get("EXT_clip_control");J?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),ie=J;let Fe=ee;ee=null,this.setClear(Fe)}},getReversed:function(){return ie},setTest:function(J){J?j(s.DEPTH_TEST):pe(s.DEPTH_TEST)},setMask:function(J){re!==J&&!D&&(s.depthMask(J),re=J)},setFunc:function(J){if(ie&&(J=ny[J]),fe!==J){switch(J){case Uo:s.depthFunc(s.NEVER);break;case No:s.depthFunc(s.ALWAYS);break;case Fo:s.depthFunc(s.LESS);break;case vi:s.depthFunc(s.LEQUAL);break;case Oo:s.depthFunc(s.EQUAL);break;case Bo:s.depthFunc(s.GEQUAL);break;case zo:s.depthFunc(s.GREATER);break;case Ho:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}fe=J}},setLocked:function(J){D=J},setClear:function(J){ee!==J&&(ie&&(J=1-J),s.clearDepth(J),ee=J)},reset:function(){D=!1,re=null,fe=null,ee=null,ie=!1}}}function i(){let D=!1,ie=null,re=null,fe=null,ee=null,J=null,ge=null,Fe=null,rt=null;return{setTest:function(je){D||(je?j(s.STENCIL_TEST):pe(s.STENCIL_TEST))},setMask:function(je){ie!==je&&!D&&(s.stencilMask(je),ie=je)},setFunc:function(je,Ln,Tn){(re!==je||fe!==Ln||ee!==Tn)&&(s.stencilFunc(je,Ln,Tn),re=je,fe=Ln,ee=Tn)},setOp:function(je,Ln,Tn){(J!==je||ge!==Ln||Fe!==Tn)&&(s.stencilOp(je,Ln,Tn),J=je,ge=Ln,Fe=Tn)},setLocked:function(je){D=je},setClear:function(je){rt!==je&&(s.clearStencil(je),rt=je)},reset:function(){D=!1,ie=null,re=null,fe=null,ee=null,J=null,ge=null,Fe=null,rt=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],m=null,y=!1,g=null,p=null,w=null,M=null,x=null,T=null,A=null,R=new Ue(0,0,0),k=0,S=!1,b=null,I=null,N=null,F=null,z=null,X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,q=0,V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=q>=1):V.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=q>=2);let Z=null,Q={},de=s.getParameter(s.SCISSOR_BOX),Ne=s.getParameter(s.VIEWPORT),Je=new gt().fromArray(de),Ke=new gt().fromArray(Ne);function $e(D,ie,re,fe){let ee=new Uint8Array(4),J=s.createTexture();s.bindTexture(D,J),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ge=0;ge<re;ge++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(ie,0,s.RGBA,1,1,fe,0,s.RGBA,s.UNSIGNED_BYTE,ee):s.texImage2D(ie+ge,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ee);return J}let Y={};Y[s.TEXTURE_2D]=$e(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=$e(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=$e(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=$e(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(s.DEPTH_TEST),o.setFunc(vi),De(!1),ye(Dl),j(s.CULL_FACE),ht(Wn);function j(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function pe(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function ke(D,ie){return u[D]!==ie?(s.bindFramebuffer(D,ie),u[D]=ie,D===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ie),D===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ie),!0):!1}function we(D,ie){let re=f,fe=!1;if(D){re=d.get(ie),re===void 0&&(re=[],d.set(ie,re));let ee=D.textures;if(re.length!==ee.length||re[0]!==s.COLOR_ATTACHMENT0){for(let J=0,ge=ee.length;J<ge;J++)re[J]=s.COLOR_ATTACHMENT0+J;re.length=ee.length,fe=!0}}else re[0]!==s.BACK&&(re[0]=s.BACK,fe=!0);fe&&s.drawBuffers(re)}function Xe(D){return m!==D?(s.useProgram(D),m=D,!0):!1}let Lt={[ei]:s.FUNC_ADD,[bh]:s.FUNC_SUBTRACT,[Mh]:s.FUNC_REVERSE_SUBTRACT};Lt[Sh]=s.MIN,Lt[wh]=s.MAX;let P={[Eh]:s.ZERO,[Th]:s.ONE,[Ah]:s.SRC_COLOR,[so]:s.SRC_ALPHA,[Lh]:s.SRC_ALPHA_SATURATE,[Ih]:s.DST_COLOR,[Rh]:s.DST_ALPHA,[Ch]:s.ONE_MINUS_SRC_COLOR,[ro]:s.ONE_MINUS_SRC_ALPHA,[Dh]:s.ONE_MINUS_DST_COLOR,[Ph]:s.ONE_MINUS_DST_ALPHA,[kh]:s.CONSTANT_COLOR,[Uh]:s.ONE_MINUS_CONSTANT_COLOR,[Nh]:s.CONSTANT_ALPHA,[Fh]:s.ONE_MINUS_CONSTANT_ALPHA};function ht(D,ie,re,fe,ee,J,ge,Fe,rt,je){if(D===Wn){y===!0&&(pe(s.BLEND),y=!1);return}if(y===!1&&(j(s.BLEND),y=!0),D!==vh){if(D!==g||je!==S){if((p!==ei||x!==ei)&&(s.blendEquation(s.FUNC_ADD),p=ei,x=ei),je)switch(D){case xi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case kl:s.blendFunc(s.ONE,s.ONE);break;case Ul:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Nl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case xi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case kl:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Ul:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}w=null,M=null,T=null,A=null,R.set(0,0,0),k=0,g=D,S=je}return}ee=ee||ie,J=J||re,ge=ge||fe,(ie!==p||ee!==x)&&(s.blendEquationSeparate(Lt[ie],Lt[ee]),p=ie,x=ee),(re!==w||fe!==M||J!==T||ge!==A)&&(s.blendFuncSeparate(P[re],P[fe],P[J],P[ge]),w=re,M=fe,T=J,A=ge),(Fe.equals(R)===!1||rt!==k)&&(s.blendColor(Fe.r,Fe.g,Fe.b,rt),R.copy(Fe),k=rt),g=D,S=!1}function Oe(D,ie){D.side===xt?pe(s.CULL_FACE):j(s.CULL_FACE);let re=D.side===Xt;ie&&(re=!re),De(re),D.blending===xi&&D.transparent===!1?ht(Wn):ht(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let fe=D.stencilWrite;a.setTest(fe),fe&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_e(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?j(s.SAMPLE_ALPHA_TO_COVERAGE):pe(s.SAMPLE_ALPHA_TO_COVERAGE)}function De(D){b!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),b=D)}function ye(D){D!==yh?(j(s.CULL_FACE),D!==I&&(D===Dl?s.cullFace(s.BACK):D===_h?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):pe(s.CULL_FACE),I=D}function ut(D){D!==N&&(G&&s.lineWidth(D),N=D)}function _e(D,ie,re){D?(j(s.POLYGON_OFFSET_FILL),(F!==ie||z!==re)&&(s.polygonOffset(ie,re),F=ie,z=re)):pe(s.POLYGON_OFFSET_FILL)}function He(D){D?j(s.SCISSOR_TEST):pe(s.SCISSOR_TEST)}function Ct(D){D===void 0&&(D=s.TEXTURE0+X-1),Z!==D&&(s.activeTexture(D),Z=D)}function vt(D,ie,re){re===void 0&&(Z===null?re=s.TEXTURE0+X-1:re=Z);let fe=Q[re];fe===void 0&&(fe={type:void 0,texture:void 0},Q[re]=fe),(fe.type!==D||fe.texture!==ie)&&(Z!==re&&(s.activeTexture(re),Z=re),s.bindTexture(D,ie||Y[D]),fe.type=D,fe.texture=ie)}function E(){let D=Q[Z];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{s.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function O(){try{s.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{s.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{s.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function W(){try{s.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Me(){try{s.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function se(){try{s.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xe(){try{s.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{s.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{s.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function he(D){Je.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),Je.copy(D))}function Ie(D){Ke.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),Ke.copy(D))}function be(D,ie){let re=c.get(ie);re===void 0&&(re=new WeakMap,c.set(ie,re));let fe=re.get(D);fe===void 0&&(fe=s.getUniformBlockIndex(ie,D.name),re.set(D,fe))}function le(D,ie){let fe=c.get(ie).get(D);l.get(ie)!==fe&&(s.uniformBlockBinding(ie,fe,D.__bindingPointIndex),l.set(ie,fe))}function ze(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},Z=null,Q={},u={},d=new WeakMap,f=[],m=null,y=!1,g=null,p=null,w=null,M=null,x=null,T=null,A=null,R=new Ue(0,0,0),k=0,S=!1,b=null,I=null,N=null,F=null,z=null,Je.set(0,0,s.canvas.width,s.canvas.height),Ke.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:j,disable:pe,bindFramebuffer:ke,drawBuffers:we,useProgram:Xe,setBlending:ht,setMaterial:Oe,setFlipSided:De,setCullFace:ye,setLineWidth:ut,setPolygonOffset:_e,setScissorTest:He,activeTexture:Ct,bindTexture:vt,unbindTexture:E,compressedTexImage2D:_,compressedTexImage3D:O,texImage2D:ve,texImage3D:ne,updateUBOMapping:be,uniformBlockBinding:le,texStorage2D:se,texStorage3D:xe,texSubImage2D:$,texSubImage3D:K,compressedTexSubImage2D:W,compressedTexSubImage3D:Me,scissor:he,viewport:Ie,reset:ze}}function sy(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new oe,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,_){return f?new OffscreenCanvas(E,_):Gs("canvas")}function y(E,_,O){let $=1,K=vt(E);if((K.width>O||K.height>O)&&($=O/Math.max(K.width,K.height)),$<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let W=Math.floor($*K.width),Me=Math.floor($*K.height);u===void 0&&(u=m(W,Me));let se=_?m(W,Me):u;return se.width=W,se.height=Me,se.getContext("2d").drawImage(E,0,0,W,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+W+"x"+Me+")."),se}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function g(E){return E.generateMipmaps}function p(E){s.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(E,_,O,$,K=!1){if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let W=_;if(_===s.RED&&(O===s.FLOAT&&(W=s.R32F),O===s.HALF_FLOAT&&(W=s.R16F),O===s.UNSIGNED_BYTE&&(W=s.R8)),_===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(W=s.R8UI),O===s.UNSIGNED_SHORT&&(W=s.R16UI),O===s.UNSIGNED_INT&&(W=s.R32UI),O===s.BYTE&&(W=s.R8I),O===s.SHORT&&(W=s.R16I),O===s.INT&&(W=s.R32I)),_===s.RG&&(O===s.FLOAT&&(W=s.RG32F),O===s.HALF_FLOAT&&(W=s.RG16F),O===s.UNSIGNED_BYTE&&(W=s.RG8)),_===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(W=s.RG8UI),O===s.UNSIGNED_SHORT&&(W=s.RG16UI),O===s.UNSIGNED_INT&&(W=s.RG32UI),O===s.BYTE&&(W=s.RG8I),O===s.SHORT&&(W=s.RG16I),O===s.INT&&(W=s.RG32I)),_===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(W=s.RGB8UI),O===s.UNSIGNED_SHORT&&(W=s.RGB16UI),O===s.UNSIGNED_INT&&(W=s.RGB32UI),O===s.BYTE&&(W=s.RGB8I),O===s.SHORT&&(W=s.RGB16I),O===s.INT&&(W=s.RGB32I)),_===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(W=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(W=s.RGBA16UI),O===s.UNSIGNED_INT&&(W=s.RGBA32UI),O===s.BYTE&&(W=s.RGBA8I),O===s.SHORT&&(W=s.RGBA16I),O===s.INT&&(W=s.RGBA32I)),_===s.RGB&&(O===s.UNSIGNED_INT_5_9_9_9_REV&&(W=s.RGB9_E5),O===s.UNSIGNED_INT_10F_11F_11F_REV&&(W=s.R11F_G11F_B10F)),_===s.RGBA){let Me=K?Hs:qe.getTransfer($);O===s.FLOAT&&(W=s.RGBA32F),O===s.HALF_FLOAT&&(W=s.RGBA16F),O===s.UNSIGNED_BYTE&&(W=Me===Qe?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(W=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(W=s.RGB5_A1)}return(W===s.R16F||W===s.R32F||W===s.RG16F||W===s.RG32F||W===s.RGBA16F||W===s.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function x(E,_){let O;return E?_===null||_===oi||_===ys?O=s.DEPTH24_STENCIL8:_===In?O=s.DEPTH32F_STENCIL8:_===ms&&(O=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===oi||_===ys?O=s.DEPTH_COMPONENT24:_===In?O=s.DEPTH_COMPONENT32F:_===ms&&(O=s.DEPTH_COMPONENT16),O}function T(E,_){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==pn&&E.minFilter!==bn?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function A(E){let _=E.target;_.removeEventListener("dispose",A),k(_),_.isVideoTexture&&h.delete(_)}function R(E){let _=E.target;_.removeEventListener("dispose",R),b(_)}function k(E){let _=n.get(E);if(_.__webglInit===void 0)return;let O=E.source,$=d.get(O);if($){let K=$[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&S(E),Object.keys($).length===0&&d.delete(O)}n.remove(E)}function S(E){let _=n.get(E);s.deleteTexture(_.__webglTexture);let O=E.source,$=d.get(O);delete $[_.__cacheKey],o.memory.textures--}function b(E){let _=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let K=0;K<_.__webglFramebuffer[$].length;K++)s.deleteFramebuffer(_.__webglFramebuffer[$][K]);else s.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)s.deleteFramebuffer(_.__webglFramebuffer[$]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let O=E.textures;for(let $=0,K=O.length;$<K;$++){let W=n.get(O[$]);W.__webglTexture&&(s.deleteTexture(W.__webglTexture),o.memory.textures--),n.remove(O[$])}n.remove(E)}let I=0;function N(){I=0}function F(){let E=I;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),I+=1,E}function z(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function X(E,_){let O=n.get(E);if(E.isVideoTexture&&He(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&O.__version!==E.version){let $=E.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,E,_);return}}else E.isExternalTexture&&(O.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+_)}function G(E,_){let O=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){Y(O,E,_);return}t.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+_)}function q(E,_){let O=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){Y(O,E,_);return}t.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+_)}function V(E,_){let O=n.get(E);if(E.version>0&&O.__version!==E.version){j(O,E,_);return}t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+_)}let Z={[oo]:s.REPEAT,[Qn]:s.CLAMP_TO_EDGE,[ao]:s.MIRRORED_REPEAT},Q={[pn]:s.NEAREST,[qh]:s.NEAREST_MIPMAP_NEAREST,[yr]:s.NEAREST_MIPMAP_LINEAR,[bn]:s.LINEAR,[Wo]:s.LINEAR_MIPMAP_NEAREST,[ri]:s.LINEAR_MIPMAP_LINEAR},de={[Kh]:s.NEVER,[iu]:s.ALWAYS,[jh]:s.LESS,[Yl]:s.LEQUAL,[Qh]:s.EQUAL,[nu]:s.GEQUAL,[eu]:s.GREATER,[tu]:s.NOTEQUAL};function Ne(E,_){if(_.type===In&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===bn||_.magFilter===Wo||_.magFilter===yr||_.magFilter===ri||_.minFilter===bn||_.minFilter===Wo||_.minFilter===yr||_.minFilter===ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,Z[_.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,Z[_.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,Z[_.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,Q[_.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,Q[_.minFilter]),_.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,de[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===pn||_.minFilter!==yr&&_.minFilter!==ri||_.type===In&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");s.texParameterf(E,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Je(E,_){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",A));let $=_.source,K=d.get($);K===void 0&&(K={},d.set($,K));let W=z(_);if(W!==E.__cacheKey){K[W]===void 0&&(K[W]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,O=!0),K[W].usedTimes++;let Me=K[E.__cacheKey];Me!==void 0&&(K[E.__cacheKey].usedTimes--,Me.usedTimes===0&&S(_)),E.__cacheKey=W,E.__webglTexture=K[W].texture}return O}function Ke(E,_,O){return Math.floor(Math.floor(E/O)/_)}function $e(E,_,O,$){let W=E.updateRanges;if(W.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,O,$,_.data);else{W.sort((ne,he)=>ne.start-he.start);let Me=0;for(let ne=1;ne<W.length;ne++){let he=W[Me],Ie=W[ne],be=he.start+he.count,le=Ke(Ie.start,_.width,4),ze=Ke(he.start,_.width,4);Ie.start<=be+1&&le===ze&&Ke(Ie.start+Ie.count-1,_.width,4)===le?he.count=Math.max(he.count,Ie.start+Ie.count-he.start):(++Me,W[Me]=Ie)}W.length=Me+1;let se=s.getParameter(s.UNPACK_ROW_LENGTH),xe=s.getParameter(s.UNPACK_SKIP_PIXELS),ve=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let ne=0,he=W.length;ne<he;ne++){let Ie=W[ne],be=Math.floor(Ie.start/4),le=Math.ceil(Ie.count/4),ze=be%_.width,D=Math.floor(be/_.width),ie=le,re=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,ze),s.pixelStorei(s.UNPACK_SKIP_ROWS,D),t.texSubImage2D(s.TEXTURE_2D,0,ze,D,ie,re,O,$,_.data)}E.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,se),s.pixelStorei(s.UNPACK_SKIP_PIXELS,xe),s.pixelStorei(s.UNPACK_SKIP_ROWS,ve)}}function Y(E,_,O){let $=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=s.TEXTURE_3D);let K=Je(E,_),W=_.source;t.bindTexture($,E.__webglTexture,s.TEXTURE0+O);let Me=n.get(W);if(W.version!==Me.__version||K===!0){t.activeTexture(s.TEXTURE0+O);let se=qe.getPrimaries(qe.workingColorSpace),xe=_.colorSpace===$n?null:qe.getPrimaries(_.colorSpace),ve=_.colorSpace===$n||se===xe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let ne=y(_.image,!1,i.maxTextureSize);ne=Ct(_,ne);let he=r.convert(_.format,_.colorSpace),Ie=r.convert(_.type),be=M(_.internalFormat,he,Ie,_.colorSpace,_.isVideoTexture);Ne($,_);let le,ze=_.mipmaps,D=_.isVideoTexture!==!0,ie=Me.__version===void 0||K===!0,re=W.dataReady,fe=T(_,ne);if(_.isDepthTexture)be=x(_.format===_s,_.type),ie&&(D?t.texStorage2D(s.TEXTURE_2D,1,be,ne.width,ne.height):t.texImage2D(s.TEXTURE_2D,0,be,ne.width,ne.height,0,he,Ie,null));else if(_.isDataTexture)if(ze.length>0){D&&ie&&t.texStorage2D(s.TEXTURE_2D,fe,be,ze[0].width,ze[0].height);for(let ee=0,J=ze.length;ee<J;ee++)le=ze[ee],D?re&&t.texSubImage2D(s.TEXTURE_2D,ee,0,0,le.width,le.height,he,Ie,le.data):t.texImage2D(s.TEXTURE_2D,ee,be,le.width,le.height,0,he,Ie,le.data);_.generateMipmaps=!1}else D?(ie&&t.texStorage2D(s.TEXTURE_2D,fe,be,ne.width,ne.height),re&&$e(_,ne,he,Ie)):t.texImage2D(s.TEXTURE_2D,0,be,ne.width,ne.height,0,he,Ie,ne.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&ie&&t.texStorage3D(s.TEXTURE_2D_ARRAY,fe,be,ze[0].width,ze[0].height,ne.depth);for(let ee=0,J=ze.length;ee<J;ee++)if(le=ze[ee],_.format!==gn)if(he!==null)if(D){if(re)if(_.layerUpdates.size>0){let ge=ic(le.width,le.height,_.format,_.type);for(let Fe of _.layerUpdates){let rt=le.data.subarray(Fe*ge/le.data.BYTES_PER_ELEMENT,(Fe+1)*ge/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ee,0,0,Fe,le.width,le.height,1,he,rt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ee,0,0,0,le.width,le.height,ne.depth,he,le.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ee,be,le.width,le.height,ne.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?re&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ee,0,0,0,le.width,le.height,ne.depth,he,Ie,le.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ee,be,le.width,le.height,ne.depth,0,he,Ie,le.data)}else{D&&ie&&t.texStorage2D(s.TEXTURE_2D,fe,be,ze[0].width,ze[0].height);for(let ee=0,J=ze.length;ee<J;ee++)le=ze[ee],_.format!==gn?he!==null?D?re&&t.compressedTexSubImage2D(s.TEXTURE_2D,ee,0,0,le.width,le.height,he,le.data):t.compressedTexImage2D(s.TEXTURE_2D,ee,be,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?re&&t.texSubImage2D(s.TEXTURE_2D,ee,0,0,le.width,le.height,he,Ie,le.data):t.texImage2D(s.TEXTURE_2D,ee,be,le.width,le.height,0,he,Ie,le.data)}else if(_.isDataArrayTexture)if(D){if(ie&&t.texStorage3D(s.TEXTURE_2D_ARRAY,fe,be,ne.width,ne.height,ne.depth),re)if(_.layerUpdates.size>0){let ee=ic(ne.width,ne.height,_.format,_.type);for(let J of _.layerUpdates){let ge=ne.data.subarray(J*ee/ne.data.BYTES_PER_ELEMENT,(J+1)*ee/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,J,ne.width,ne.height,1,he,Ie,ge)}_.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,he,Ie,ne.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,be,ne.width,ne.height,ne.depth,0,he,Ie,ne.data);else if(_.isData3DTexture)D?(ie&&t.texStorage3D(s.TEXTURE_3D,fe,be,ne.width,ne.height,ne.depth),re&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,he,Ie,ne.data)):t.texImage3D(s.TEXTURE_3D,0,be,ne.width,ne.height,ne.depth,0,he,Ie,ne.data);else if(_.isFramebufferTexture){if(ie)if(D)t.texStorage2D(s.TEXTURE_2D,fe,be,ne.width,ne.height);else{let ee=ne.width,J=ne.height;for(let ge=0;ge<fe;ge++)t.texImage2D(s.TEXTURE_2D,ge,be,ee,J,0,he,Ie,null),ee>>=1,J>>=1}}else if(ze.length>0){if(D&&ie){let ee=vt(ze[0]);t.texStorage2D(s.TEXTURE_2D,fe,be,ee.width,ee.height)}for(let ee=0,J=ze.length;ee<J;ee++)le=ze[ee],D?re&&t.texSubImage2D(s.TEXTURE_2D,ee,0,0,he,Ie,le):t.texImage2D(s.TEXTURE_2D,ee,be,he,Ie,le);_.generateMipmaps=!1}else if(D){if(ie){let ee=vt(ne);t.texStorage2D(s.TEXTURE_2D,fe,be,ee.width,ee.height)}re&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,he,Ie,ne)}else t.texImage2D(s.TEXTURE_2D,0,be,he,Ie,ne);g(_)&&p($),Me.__version=W.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function j(E,_,O){if(_.image.length!==6)return;let $=Je(E,_),K=_.source;t.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+O);let W=n.get(K);if(K.version!==W.__version||$===!0){t.activeTexture(s.TEXTURE0+O);let Me=qe.getPrimaries(qe.workingColorSpace),se=_.colorSpace===$n?null:qe.getPrimaries(_.colorSpace),xe=_.colorSpace===$n||Me===se?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let ve=_.isCompressedTexture||_.image[0].isCompressedTexture,ne=_.image[0]&&_.image[0].isDataTexture,he=[];for(let J=0;J<6;J++)!ve&&!ne?he[J]=y(_.image[J],!0,i.maxCubemapSize):he[J]=ne?_.image[J].image:_.image[J],he[J]=Ct(_,he[J]);let Ie=he[0],be=r.convert(_.format,_.colorSpace),le=r.convert(_.type),ze=M(_.internalFormat,be,le,_.colorSpace),D=_.isVideoTexture!==!0,ie=W.__version===void 0||$===!0,re=K.dataReady,fe=T(_,Ie);Ne(s.TEXTURE_CUBE_MAP,_);let ee;if(ve){D&&ie&&t.texStorage2D(s.TEXTURE_CUBE_MAP,fe,ze,Ie.width,Ie.height);for(let J=0;J<6;J++){ee=he[J].mipmaps;for(let ge=0;ge<ee.length;ge++){let Fe=ee[ge];_.format!==gn?be!==null?D?re&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ge,0,0,Fe.width,Fe.height,be,Fe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ge,ze,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?re&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ge,0,0,Fe.width,Fe.height,be,le,Fe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ge,ze,Fe.width,Fe.height,0,be,le,Fe.data)}}}else{if(ee=_.mipmaps,D&&ie){ee.length>0&&fe++;let J=vt(he[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,fe,ze,J.width,J.height)}for(let J=0;J<6;J++)if(ne){D?re&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,he[J].width,he[J].height,be,le,he[J].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ze,he[J].width,he[J].height,0,be,le,he[J].data);for(let ge=0;ge<ee.length;ge++){let rt=ee[ge].image[J].image;D?re&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ge+1,0,0,rt.width,rt.height,be,le,rt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ge+1,ze,rt.width,rt.height,0,be,le,rt.data)}}else{D?re&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,be,le,he[J]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,ze,be,le,he[J]);for(let ge=0;ge<ee.length;ge++){let Fe=ee[ge];D?re&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ge+1,0,0,be,le,Fe.image[J]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,ge+1,ze,be,le,Fe.image[J])}}}g(_)&&p(s.TEXTURE_CUBE_MAP),W.__version=K.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function pe(E,_,O,$,K,W){let Me=r.convert(O.format,O.colorSpace),se=r.convert(O.type),xe=M(O.internalFormat,Me,se,O.colorSpace),ve=n.get(_),ne=n.get(O);if(ne.__renderTarget=_,!ve.__hasExternalTextures){let he=Math.max(1,_.width>>W),Ie=Math.max(1,_.height>>W);K===s.TEXTURE_3D||K===s.TEXTURE_2D_ARRAY?t.texImage3D(K,W,xe,he,Ie,_.depth,0,Me,se,null):t.texImage2D(K,W,xe,he,Ie,0,Me,se,null)}t.bindFramebuffer(s.FRAMEBUFFER,E),_e(_)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,$,K,ne.__webglTexture,0,ut(_)):(K===s.TEXTURE_2D||K>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,$,K,ne.__webglTexture,W),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ke(E,_,O){if(s.bindRenderbuffer(s.RENDERBUFFER,E),_.depthBuffer){let $=_.depthTexture,K=$&&$.isDepthTexture?$.type:null,W=x(_.stencilBuffer,K),Me=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,se=ut(_);_e(_)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,se,W,_.width,_.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,se,W,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,W,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Me,s.RENDERBUFFER,E)}else{let $=_.textures;for(let K=0;K<$.length;K++){let W=$[K],Me=r.convert(W.format,W.colorSpace),se=r.convert(W.type),xe=M(W.internalFormat,Me,se,W.colorSpace),ve=ut(_);O&&_e(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ve,xe,_.width,_.height):_e(_)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ve,xe,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,xe,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function we(E,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(_.depthTexture);$.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),X(_.depthTexture,0);let K=$.__webglTexture,W=ut(_);if(_.depthTexture.format===ns)_e(_)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,K,0,W):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,K,0);else if(_.depthTexture.format===_s)_e(_)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,K,0,W):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Xe(E){let _=n.get(E),O=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let $=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){let K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",K)};$.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=$}if(E.depthTexture&&!_.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");let $=E.texture.mipmaps;$&&$.length>0?we(_.__webglFramebuffer[0],E):we(_.__webglFramebuffer,E)}else if(O){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=s.createRenderbuffer(),ke(_.__webglDepthbuffer[$],E,!1);else{let K=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer[$];s.bindRenderbuffer(s.RENDERBUFFER,W),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,W)}}else{let $=E.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),ke(_.__webglDepthbuffer,E,!1);else{let K=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,W),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,W)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Lt(E,_,O){let $=n.get(E);_!==void 0&&pe($.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&Xe(E)}function P(E){let _=E.texture,O=n.get(E),$=n.get(_);E.addEventListener("dispose",R);let K=E.textures,W=E.isWebGLCubeRenderTarget===!0,Me=K.length>1;if(Me||($.__webglTexture===void 0&&($.__webglTexture=s.createTexture()),$.__version=_.version,o.memory.textures++),W){O.__webglFramebuffer=[];for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[se]=[];for(let xe=0;xe<_.mipmaps.length;xe++)O.__webglFramebuffer[se][xe]=s.createFramebuffer()}else O.__webglFramebuffer[se]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let se=0;se<_.mipmaps.length;se++)O.__webglFramebuffer[se]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(Me)for(let se=0,xe=K.length;se<xe;se++){let ve=n.get(K[se]);ve.__webglTexture===void 0&&(ve.__webglTexture=s.createTexture(),o.memory.textures++)}if(E.samples>0&&_e(E)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let se=0;se<K.length;se++){let xe=K[se];O.__webglColorRenderbuffer[se]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[se]);let ve=r.convert(xe.format,xe.colorSpace),ne=r.convert(xe.type),he=M(xe.internalFormat,ve,ne,xe.colorSpace,E.isXRRenderTarget===!0),Ie=ut(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ie,he,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+se,s.RENDERBUFFER,O.__webglColorRenderbuffer[se])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),ke(O.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(W){t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture),Ne(s.TEXTURE_CUBE_MAP,_);for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0)for(let xe=0;xe<_.mipmaps.length;xe++)pe(O.__webglFramebuffer[se][xe],E,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+se,xe);else pe(O.__webglFramebuffer[se],E,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);g(_)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let se=0,xe=K.length;se<xe;se++){let ve=K[se],ne=n.get(ve),he=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(he=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(he,ne.__webglTexture),Ne(he,ve),pe(O.__webglFramebuffer,E,ve,s.COLOR_ATTACHMENT0+se,he,0),g(ve)&&p(he)}t.unbindTexture()}else{let se=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(se=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(se,$.__webglTexture),Ne(se,_),_.mipmaps&&_.mipmaps.length>0)for(let xe=0;xe<_.mipmaps.length;xe++)pe(O.__webglFramebuffer[xe],E,_,s.COLOR_ATTACHMENT0,se,xe);else pe(O.__webglFramebuffer,E,_,s.COLOR_ATTACHMENT0,se,0);g(_)&&p(se),t.unbindTexture()}E.depthBuffer&&Xe(E)}function ht(E){let _=E.textures;for(let O=0,$=_.length;O<$;O++){let K=_[O];if(g(K)){let W=w(E),Me=n.get(K).__webglTexture;t.bindTexture(W,Me),p(W),t.unbindTexture()}}}let Oe=[],De=[];function ye(E){if(E.samples>0){if(_e(E)===!1){let _=E.textures,O=E.width,$=E.height,K=s.COLOR_BUFFER_BIT,W=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Me=n.get(E),se=_.length>1;if(se)for(let ve=0;ve<_.length;ve++)t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);let xe=E.texture.mipmaps;xe&&xe.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ve=0;ve<_.length;ve++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=s.STENCIL_BUFFER_BIT)),se){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Me.__webglColorRenderbuffer[ve]);let ne=n.get(_[ve]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ne,0)}s.blitFramebuffer(0,0,O,$,0,0,O,$,K,s.NEAREST),l===!0&&(Oe.length=0,De.length=0,Oe.push(s.COLOR_ATTACHMENT0+ve),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Oe.push(W),De.push(W),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,De)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Oe))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),se)for(let ve=0;ve<_.length;ve++){t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,Me.__webglColorRenderbuffer[ve]);let ne=n.get(_[ve]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Me.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,ne,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let _=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function ut(E){return Math.min(i.maxSamples,E.samples)}function _e(E){let _=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function He(E){let _=o.render.frame;h.get(E)!==_&&(h.set(E,_),E.update())}function Ct(E,_){let O=E.colorSpace,$=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||O!==bi&&O!==$n&&(qe.getTransfer(O)===Qe?($!==gn||K!==En)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),_}function vt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=N,this.setTexture2D=X,this.setTexture2DArray=G,this.setTexture3D=q,this.setTextureCube=V,this.rebindTextures=Lt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=ht,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=_e}function ry(s,e){function t(n,i=$n){let r,o=qe.getTransfer(i);if(n===En)return s.UNSIGNED_BYTE;if(n===$o)return s.UNSIGNED_SHORT_4_4_4_4;if(n===qo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Hl)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Vl)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Bl)return s.BYTE;if(n===zl)return s.SHORT;if(n===ms)return s.UNSIGNED_SHORT;if(n===Xo)return s.INT;if(n===oi)return s.UNSIGNED_INT;if(n===In)return s.FLOAT;if(n===gs)return s.HALF_FLOAT;if(n===Gl)return s.ALPHA;if(n===Wl)return s.RGB;if(n===gn)return s.RGBA;if(n===ns)return s.DEPTH_COMPONENT;if(n===_s)return s.DEPTH_STENCIL;if(n===Xl)return s.RED;if(n===Yo)return s.RED_INTEGER;if(n===$l)return s.RG;if(n===Zo)return s.RG_INTEGER;if(n===Jo)return s.RGBA_INTEGER;if(n===_r||n===xr||n===vr||n===br)if(o===Qe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===_r)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===_r)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ko||n===jo||n===Qo||n===ea)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ko)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ta||n===na||n===ia)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ta||n===na)return o===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ia)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===sa||n===ra||n===oa||n===aa||n===la||n===ca||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===ya)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sa)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ra)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oa)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===aa)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===la)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ca)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ha)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ua)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===da)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fa)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pa)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ma)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ga)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ya)return o===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_a||n===xa||n===va)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===_a)return o===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ba||n===Ma||n===Sa||n===wa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ba)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ma)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ys?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var oy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ay=`
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

}`,gc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new js(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Sn({vertexShader:oy,fragmentShader:ay,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new Gn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yc=class extends An{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null,y=typeof XRWebGLBinding<"u",g=new gc,p={},w=t.getContextAttributes(),M=null,x=null,T=[],A=[],R=new oe,k=null,S=new Zt;S.viewport=new gt;let b=new Zt;b.viewport=new gt;let I=[S,b],N=new ko,F=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let j=T[Y];return j===void 0&&(j=new ls,T[Y]=j),j.getTargetRaySpace()},this.getControllerGrip=function(Y){let j=T[Y];return j===void 0&&(j=new ls,T[Y]=j),j.getGripSpace()},this.getHand=function(Y){let j=T[Y];return j===void 0&&(j=new ls,T[Y]=j),j.getHandSpace()};function X(Y){let j=A.indexOf(Y.inputSource);if(j===-1)return;let pe=T[j];pe!==void 0&&(pe.update(Y.inputSource,Y.frame,c||o),pe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",q);for(let Y=0;Y<T.length;Y++){let j=A[Y];j!==null&&(A[Y]=null,T[Y].disconnect(j))}F=null,z=null,g.reset();for(let Y in p)delete p[Y];e.setRenderTarget(M),f=null,d=null,u=null,i=null,x=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",G),i.addEventListener("inputsourceschange",q),w.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,ke=null,we=null;w.depth&&(we=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=w.stencil?_s:ns,ke=w.stencil?ys:oi);let Xe={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Xe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Cn(d.textureWidth,d.textureHeight,{format:gn,type:En,depthTexture:new Ks(d.textureWidth,d.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let pe={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Cn(f.framebufferWidth,f.framebufferHeight,{format:gn,type:En,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),$e.setContext(i),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q(Y){for(let j=0;j<Y.removed.length;j++){let pe=Y.removed[j],ke=A.indexOf(pe);ke>=0&&(A[ke]=null,T[ke].disconnect(pe))}for(let j=0;j<Y.added.length;j++){let pe=Y.added[j],ke=A.indexOf(pe);if(ke===-1){for(let Xe=0;Xe<T.length;Xe++)if(Xe>=A.length){A.push(pe),ke=Xe;break}else if(A[Xe]===null){A[Xe]=pe,ke=Xe;break}if(ke===-1)break}let we=T[ke];we&&we.connect(pe)}}let V=new C,Z=new C;function Q(Y,j,pe){V.setFromMatrixPosition(j.matrixWorld),Z.setFromMatrixPosition(pe.matrixWorld);let ke=V.distanceTo(Z),we=j.projectionMatrix.elements,Xe=pe.projectionMatrix.elements,Lt=we[14]/(we[10]-1),P=we[14]/(we[10]+1),ht=(we[9]+1)/we[5],Oe=(we[9]-1)/we[5],De=(we[8]-1)/we[0],ye=(Xe[8]+1)/Xe[0],ut=Lt*De,_e=Lt*ye,He=ke/(-De+ye),Ct=He*-De;if(j.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ct),Y.translateZ(He),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),we[10]===-1)Y.projectionMatrix.copy(j.projectionMatrix),Y.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let vt=Lt+He,E=P+He,_=ut-Ct,O=_e+(ke-Ct),$=ht*P/E*vt,K=Oe*P/E*vt;Y.projectionMatrix.makePerspective(_,O,$,K,vt,E),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function de(Y,j){j===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(j.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let j=Y.near,pe=Y.far;g.texture!==null&&(g.depthNear>0&&(j=g.depthNear),g.depthFar>0&&(pe=g.depthFar)),N.near=b.near=S.near=j,N.far=b.far=S.far=pe,(F!==N.near||z!==N.far)&&(i.updateRenderState({depthNear:N.near,depthFar:N.far}),F=N.near,z=N.far),N.layers.mask=Y.layers.mask|6,S.layers.mask=N.layers.mask&3,b.layers.mask=N.layers.mask&5;let ke=Y.parent,we=N.cameras;de(N,ke);for(let Xe=0;Xe<we.length;Xe++)de(we[Xe],ke);we.length===2?Q(N,S,b):N.projectionMatrix.copy(S.projectionMatrix),Ne(Y,N,ke)};function Ne(Y,j,pe){pe===null?Y.matrix.copy(j.matrixWorld):(Y.matrix.copy(pe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(j.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(j.projectionMatrix),Y.projectionMatrixInverse.copy(j.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=is*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(Y){return p[Y]};let Je=null;function Ke(Y,j){if(h=j.getViewerPose(c||o),m=j,h!==null){let pe=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let ke=!1;pe.length!==N.cameras.length&&(N.cameras.length=0,ke=!0);for(let P=0;P<pe.length;P++){let ht=pe[P],Oe=null;if(f!==null)Oe=f.getViewport(ht);else{let ye=u.getViewSubImage(d,ht);Oe=ye.viewport,P===0&&(e.setRenderTargetTextures(x,ye.colorTexture,ye.depthStencilTexture),e.setRenderTarget(x))}let De=I[P];De===void 0&&(De=new Zt,De.layers.enable(P),De.viewport=new gt,I[P]=De),De.matrix.fromArray(ht.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(ht.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),P===0&&(N.matrix.copy(De.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),ke===!0&&N.cameras.push(De)}let we=i.enabledFeatures;if(we&&we.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let P=u.getDepthInformation(pe[0]);P&&P.isValid&&P.texture&&g.init(P,i.renderState)}if(we&&we.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let P=0;P<pe.length;P++){let ht=pe[P].camera;if(ht){let Oe=p[ht];Oe||(Oe=new js,p[ht]=Oe);let De=u.getCameraImage(ht);Oe.sourceTexture=De}}}}for(let pe=0;pe<T.length;pe++){let ke=A[pe],we=T[pe];ke!==null&&we!==void 0&&we.update(ke,j,c||o)}Je&&Je(Y,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),m=null}let $e=new Nu;$e.setAnimationLoop(Ke),this.setAnimationLoop=function(Y){Je=Y},this.dispose=function(){}}},Li=new Mn,ly=new et;function cy(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Ql(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,w,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,w,M):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Xt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Xt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let w=e.get(p),M=w.envMap,x=w.envMapRotation;M&&(g.envMap.value=M,Li.copy(x),Li.x*=-1,Li.y*=-1,Li.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),g.envMapRotation.value.setFromMatrix4(ly.makeRotationFromEuler(Li)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,w,M){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*w,g.scale.value=M*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,w){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let w=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function hy(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,M){let x=M.program;n.uniformBlockBinding(w,x)}function c(w,M){let x=i[w.id];x===void 0&&(m(w),x=h(w),i[w.id]=x,w.addEventListener("dispose",g));let T=M.program;n.updateUBOMapping(w,T);let A=e.render.frame;r[w.id]!==A&&(d(w),r[w.id]=A)}function h(w){let M=u();w.__bindingPointIndex=M;let x=s.createBuffer(),T=w.__size,A=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,T,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,x),x}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){let M=i[w.id],x=w.uniforms,T=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let A=0,R=x.length;A<R;A++){let k=Array.isArray(x[A])?x[A]:[x[A]];for(let S=0,b=k.length;S<b;S++){let I=k[S];if(f(I,A,S,T)===!0){let N=I.__offset,F=Array.isArray(I.value)?I.value:[I.value],z=0;for(let X=0;X<F.length;X++){let G=F[X],q=y(G);typeof G=="number"||typeof G=="boolean"?(I.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,N+z,I.__data)):G.isMatrix3?(I.__data[0]=G.elements[0],I.__data[1]=G.elements[1],I.__data[2]=G.elements[2],I.__data[3]=0,I.__data[4]=G.elements[3],I.__data[5]=G.elements[4],I.__data[6]=G.elements[5],I.__data[7]=0,I.__data[8]=G.elements[6],I.__data[9]=G.elements[7],I.__data[10]=G.elements[8],I.__data[11]=0):(G.toArray(I.__data,z),z+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,N,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(w,M,x,T){let A=w.value,R=M+"_"+x;if(T[R]===void 0)return typeof A=="number"||typeof A=="boolean"?T[R]=A:T[R]=A.clone(),!0;{let k=T[R];if(typeof A=="number"||typeof A=="boolean"){if(k!==A)return T[R]=A,!0}else if(k.equals(A)===!1)return k.copy(A),!0}return!1}function m(w){let M=w.uniforms,x=0,T=16;for(let R=0,k=M.length;R<k;R++){let S=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,I=S.length;b<I;b++){let N=S[b],F=Array.isArray(N.value)?N.value:[N.value];for(let z=0,X=F.length;z<X;z++){let G=F[z],q=y(G),V=x%T,Z=V%q.boundary,Q=V+Z;x+=Z,Q!==0&&T-Q<q.storage&&(x+=T-Q),N.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=x,x+=q.storage}}}let A=x%T;return A>0&&(x+=T-A),w.__size=x,w.__cache={},this}function y(w){let M={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(M.boundary=4,M.storage=4):w.isVector2?(M.boundary=8,M.storage=8):w.isVector3||w.isColor?(M.boundary=16,M.storage=12):w.isVector4?(M.boundary=16,M.storage=16):w.isMatrix3?(M.boundary=48,M.storage=48):w.isMatrix4?(M.boundary=64,M.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),M}function g(w){let M=w.target;M.removeEventListener("dispose",g);let x=o.indexOf(M.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(let w in i)s.deleteBuffer(i[w]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}var Ra=class{constructor(e={}){let{canvas:t=su(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),y=new Int32Array(4),g=null,p=null,w=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,T=!1;this._outputColorSpace=nn;let A=0,R=0,k=null,S=-1,b=null,I=new gt,N=new gt,F=null,z=new Ue(0),X=0,G=t.width,q=t.height,V=1,Z=null,Q=null,de=new gt(0,0,G,q),Ne=new gt(0,0,G,q),Je=!1,Ke=new cs,$e=!1,Y=!1,j=new et,pe=new C,ke=new gt,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xe=!1;function Lt(){return k===null?V:1}let P=n;function ht(v,L){return t.getContext(v,L)}try{let v={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",fe,!1),t.addEventListener("webglcontextcreationerror",ee,!1),P===null){let L="webgl2";if(P=ht(L,v),P===null)throw ht(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Oe,De,ye,ut,_e,He,Ct,vt,E,_,O,$,K,W,Me,se,xe,ve,ne,he,Ie,be,le,ze;function D(){Oe=new Cg(P),Oe.init(),be=new ry(P,Oe),De=new bg(P,Oe,e,be),ye=new iy(P,Oe),De.reversedDepthBuffer&&d&&ye.buffers.depth.setReversed(!0),ut=new Ig(P),_e=new W0,He=new sy(P,Oe,ye,_e,De,be,ut),Ct=new Sg(x),vt=new Ag(x),E=new Ff(P),le=new xg(P,E),_=new Rg(P,E,ut,le),O=new Lg(P,_,E,ut),ne=new Dg(P,De,He),se=new Mg(_e),$=new G0(x,Ct,vt,Oe,De,le,se),K=new cy(x,_e),W=new $0,Me=new j0(Oe),ve=new _g(x,Ct,vt,ye,O,f,l),xe=new ty(x,O,De),ze=new hy(P,ut,De,ye),he=new vg(P,Oe,ut),Ie=new Pg(P,Oe,ut),ut.programs=$.programs,x.capabilities=De,x.extensions=Oe,x.properties=_e,x.renderLists=W,x.shadowMap=xe,x.state=ye,x.info=ut}D();let ie=new yc(x,P);this.xr=ie,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let v=Oe.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Oe.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(v){v!==void 0&&(V=v,this.setSize(G,q,!1))},this.getSize=function(v){return v.set(G,q)},this.setSize=function(v,L,B=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=v,q=L,t.width=Math.floor(v*V),t.height=Math.floor(L*V),B===!0&&(t.style.width=v+"px",t.style.height=L+"px"),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(G*V,q*V).floor()},this.setDrawingBufferSize=function(v,L,B){G=v,q=L,V=B,t.width=Math.floor(v*B),t.height=Math.floor(L*B),this.setViewport(0,0,v,L)},this.getCurrentViewport=function(v){return v.copy(I)},this.getViewport=function(v){return v.copy(de)},this.setViewport=function(v,L,B,H){v.isVector4?de.set(v.x,v.y,v.z,v.w):de.set(v,L,B,H),ye.viewport(I.copy(de).multiplyScalar(V).round())},this.getScissor=function(v){return v.copy(Ne)},this.setScissor=function(v,L,B,H){v.isVector4?Ne.set(v.x,v.y,v.z,v.w):Ne.set(v,L,B,H),ye.scissor(N.copy(Ne).multiplyScalar(V).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(v){ye.setScissorTest(Je=v)},this.setOpaqueSort=function(v){Z=v},this.setTransparentSort=function(v){Q=v},this.getClearColor=function(v){return v.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor(...arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha(...arguments)},this.clear=function(v=!0,L=!0,B=!0){let H=0;if(v){let U=!1;if(k!==null){let te=k.texture.format;U=te===Jo||te===Zo||te===Yo}if(U){let te=k.texture.type,ce=te===En||te===oi||te===ms||te===ys||te===$o||te===qo,me=ve.getClearColor(),ue=ve.getClearAlpha(),Ce=me.r,Le=me.g,Ee=me.b;ce?(m[0]=Ce,m[1]=Le,m[2]=Ee,m[3]=ue,P.clearBufferuiv(P.COLOR,0,m)):(y[0]=Ce,y[1]=Le,y[2]=Ee,y[3]=ue,P.clearBufferiv(P.COLOR,0,y))}else H|=P.COLOR_BUFFER_BIT}L&&(H|=P.DEPTH_BUFFER_BIT),B&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",fe,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),ve.dispose(),W.dispose(),Me.dispose(),_e.dispose(),Ct.dispose(),vt.dispose(),O.dispose(),le.dispose(),ze.dispose(),$.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",Tn),ie.removeEventListener("sessionend",Dc),di.stop()};function re(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let v=ut.autoReset,L=xe.enabled,B=xe.autoUpdate,H=xe.needsUpdate,U=xe.type;D(),ut.autoReset=v,xe.enabled=L,xe.autoUpdate=B,xe.needsUpdate=H,xe.type=U}function ee(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function J(v){let L=v.target;L.removeEventListener("dispose",J),ge(L)}function ge(v){Fe(v),_e.remove(v)}function Fe(v){let L=_e.get(v).programs;L!==void 0&&(L.forEach(function(B){$.releaseProgram(B)}),v.isShaderMaterial&&$.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,B,H,U,te){L===null&&(L=we);let ce=U.isMesh&&U.matrixWorld.determinant()<0,me=ud(v,L,B,H,U);ye.setMaterial(H,ce);let ue=B.index,Ce=1;if(H.wireframe===!0){if(ue=_.getWireframeAttribute(B),ue===void 0)return;Ce=2}let Le=B.drawRange,Ee=B.attributes.position,We=Le.start*Ce,nt=(Le.start+Le.count)*Ce;te!==null&&(We=Math.max(We,te.start*Ce),nt=Math.min(nt,(te.start+te.count)*Ce)),ue!==null?(We=Math.max(We,0),nt=Math.min(nt,ue.count)):Ee!=null&&(We=Math.max(We,0),nt=Math.min(nt,Ee.count));let yt=nt-We;if(yt<0||yt===1/0)return;le.setup(U,H,me,B,ue);let ot,st=he;if(ue!==null&&(ot=E.get(ue),st=Ie,st.setIndex(ot)),U.isMesh)H.wireframe===!0?(ye.setLineWidth(H.wireframeLinewidth*Lt()),st.setMode(P.LINES)):st.setMode(P.TRIANGLES);else if(U.isLine){let Te=H.linewidth;Te===void 0&&(Te=1),ye.setLineWidth(Te*Lt()),U.isLineSegments?st.setMode(P.LINES):U.isLineLoop?st.setMode(P.LINE_LOOP):st.setMode(P.LINE_STRIP)}else U.isPoints?st.setMode(P.POINTS):U.isSprite&&st.setMode(P.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)ss("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Oe.get("WEBGL_multi_draw"))st.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{let Te=U._multiDrawStarts,ft=U._multiDrawCounts,Ye=U._multiDrawCount,jt=ue?E.get(ue).bytesPerElement:1,Bi=_e.get(H).currentProgram.getUniforms();for(let Qt=0;Qt<Ye;Qt++)Bi.setValue(P,"_gl_DrawID",Qt),st.render(Te[Qt]/jt,ft[Qt])}else if(U.isInstancedMesh)st.renderInstances(We,yt,U.count);else if(B.isInstancedBufferGeometry){let Te=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ft=Math.min(B.instanceCount,Te);st.renderInstances(We,yt,ft)}else st.render(We,yt)};function rt(v,L,B){v.transparent===!0&&v.side===xt&&v.forceSinglePass===!1?(v.side=Xt,v.needsUpdate=!0,Cr(v,L,B),v.side=Hn,v.needsUpdate=!0,Cr(v,L,B),v.side=xt):Cr(v,L,B)}this.compile=function(v,L,B=null){B===null&&(B=v),p=Me.get(B),p.init(L),M.push(p),B.traverseVisible(function(U){U.isLight&&U.layers.test(L.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),v!==B&&v.traverseVisible(function(U){U.isLight&&U.layers.test(L.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();let H=new Set;return v.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;let te=U.material;if(te)if(Array.isArray(te))for(let ce=0;ce<te.length;ce++){let me=te[ce];rt(me,B,U),H.add(me)}else rt(te,B,U),H.add(te)}),p=M.pop(),H},this.compileAsync=function(v,L,B=null){let H=this.compile(v,L,B);return new Promise(U=>{function te(){if(H.forEach(function(ce){_e.get(ce).currentProgram.isReady()&&H.delete(ce)}),H.size===0){U(v);return}setTimeout(te,10)}Oe.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let je=null;function Ln(v){je&&je(v)}function Tn(){di.stop()}function Dc(){di.start()}let di=new Nu;di.setAnimationLoop(Ln),typeof self<"u"&&di.setContext(self),this.setAnimationLoop=function(v){je=v,ie.setAnimationLoop(v),v===null?di.stop():di.start()},ie.addEventListener("sessionstart",Tn),ie.addEventListener("sessionend",Dc),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(L),L=ie.getCamera()),v.isScene===!0&&v.onBeforeRender(x,v,L,k),p=Me.get(v,M.length),p.init(L),M.push(p),j.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Ke.setFromProjectionMatrix(j,vn,L.reversedDepth),Y=this.localClippingEnabled,$e=se.init(this.clippingPlanes,Y),g=W.get(v,w.length),g.init(),w.push(g),ie.enabled===!0&&ie.isPresenting===!0){let te=x.xr.getDepthSensingMesh();te!==null&&Wa(te,L,-1/0,x.sortObjects)}Wa(v,L,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(Z,Q),Xe=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Xe&&ve.addToRenderList(g,v),this.info.render.frame++,$e===!0&&se.beginShadows();let B=p.state.shadowsArray;xe.render(B,v,L),$e===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=g.opaque,U=g.transmissive;if(p.setupLights(),L.isArrayCamera){let te=L.cameras;if(U.length>0)for(let ce=0,me=te.length;ce<me;ce++){let ue=te[ce];kc(H,U,v,ue)}Xe&&ve.render(v);for(let ce=0,me=te.length;ce<me;ce++){let ue=te[ce];Lc(g,v,ue,ue.viewport)}}else U.length>0&&kc(H,U,v,L),Xe&&ve.render(v),Lc(g,v,L);k!==null&&R===0&&(He.updateMultisampleRenderTarget(k),He.updateRenderTargetMipmap(k)),v.isScene===!0&&v.onAfterRender(x,v,L),le.resetDefaultState(),S=-1,b=null,M.pop(),M.length>0?(p=M[M.length-1],$e===!0&&se.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?g=w[w.length-1]:g=null};function Wa(v,L,B,H){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)B=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLight)p.pushLight(v),v.castShadow&&p.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Ke.intersectsSprite(v)){H&&ke.setFromMatrixPosition(v.matrixWorld).applyMatrix4(j);let ce=O.update(v),me=v.material;me.visible&&g.push(v,ce,me,B,ke.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Ke.intersectsObject(v))){let ce=O.update(v),me=v.material;if(H&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),ke.copy(v.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),ke.copy(ce.boundingSphere.center)),ke.applyMatrix4(v.matrixWorld).applyMatrix4(j)),Array.isArray(me)){let ue=ce.groups;for(let Ce=0,Le=ue.length;Ce<Le;Ce++){let Ee=ue[Ce],We=me[Ee.materialIndex];We&&We.visible&&g.push(v,ce,We,B,ke.z,Ee)}}else me.visible&&g.push(v,ce,me,B,ke.z,null)}}let te=v.children;for(let ce=0,me=te.length;ce<me;ce++)Wa(te[ce],L,B,H)}function Lc(v,L,B,H){let U=v.opaque,te=v.transmissive,ce=v.transparent;p.setupLightsView(B),$e===!0&&se.setGlobalState(x.clippingPlanes,B),H&&ye.viewport(I.copy(H)),U.length>0&&Ar(U,L,B),te.length>0&&Ar(te,L,B),ce.length>0&&Ar(ce,L,B),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function kc(v,L,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new Cn(1,1,{generateMipmaps:!0,type:Oe.has("EXT_color_buffer_half_float")||Oe.has("EXT_color_buffer_float")?gs:En,minFilter:ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));let te=p.state.transmissionRenderTarget[H.id],ce=H.viewport||I;te.setSize(ce.z*x.transmissionResolutionScale,ce.w*x.transmissionResolutionScale);let me=x.getRenderTarget(),ue=x.getActiveCubeFace(),Ce=x.getActiveMipmapLevel();x.setRenderTarget(te),x.getClearColor(z),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),Xe&&ve.render(B);let Le=x.toneMapping;x.toneMapping=Xn;let Ee=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),$e===!0&&se.setGlobalState(x.clippingPlanes,H),Ar(v,B,H),He.updateMultisampleRenderTarget(te),He.updateRenderTargetMipmap(te),Oe.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let nt=0,yt=L.length;nt<yt;nt++){let ot=L[nt],st=ot.object,Te=ot.geometry,ft=ot.material,Ye=ot.group;if(ft.side===xt&&st.layers.test(H.layers)){let jt=ft.side;ft.side=Xt,ft.needsUpdate=!0,Uc(st,B,H,Te,ft,Ye),ft.side=jt,ft.needsUpdate=!0,We=!0}}We===!0&&(He.updateMultisampleRenderTarget(te),He.updateRenderTargetMipmap(te))}x.setRenderTarget(me,ue,Ce),x.setClearColor(z,X),Ee!==void 0&&(H.viewport=Ee),x.toneMapping=Le}function Ar(v,L,B){let H=L.isScene===!0?L.overrideMaterial:null;for(let U=0,te=v.length;U<te;U++){let ce=v[U],me=ce.object,ue=ce.geometry,Ce=ce.group,Le=ce.material;Le.allowOverride===!0&&H!==null&&(Le=H),me.layers.test(B.layers)&&Uc(me,L,B,ue,Le,Ce)}}function Uc(v,L,B,H,U,te){v.onBeforeRender(x,L,B,H,U,te),v.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),U.onBeforeRender(x,L,B,H,v,te),U.transparent===!0&&U.side===xt&&U.forceSinglePass===!1?(U.side=Xt,U.needsUpdate=!0,x.renderBufferDirect(B,L,H,U,v,te),U.side=Hn,U.needsUpdate=!0,x.renderBufferDirect(B,L,H,U,v,te),U.side=xt):x.renderBufferDirect(B,L,H,U,v,te),v.onAfterRender(x,L,B,H,U,te)}function Cr(v,L,B){L.isScene!==!0&&(L=we);let H=_e.get(v),U=p.state.lights,te=p.state.shadowsArray,ce=U.state.version,me=$.getParameters(v,U.state,te,L,B),ue=$.getProgramCacheKey(me),Ce=H.programs;H.environment=v.isMeshStandardMaterial?L.environment:null,H.fog=L.fog,H.envMap=(v.isMeshStandardMaterial?vt:Ct).get(v.envMap||H.environment),H.envMapRotation=H.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,Ce===void 0&&(v.addEventListener("dispose",J),Ce=new Map,H.programs=Ce);let Le=Ce.get(ue);if(Le!==void 0){if(H.currentProgram===Le&&H.lightsStateVersion===ce)return Fc(v,me),Le}else me.uniforms=$.getUniforms(v),v.onBeforeCompile(me,x),Le=$.acquireProgram(me,ue),Ce.set(ue,Le),H.uniforms=me.uniforms;let Ee=H.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Ee.clippingPlanes=se.uniform),Fc(v,me),H.needsLights=fd(v),H.lightsStateVersion=ce,H.needsLights&&(Ee.ambientLightColor.value=U.state.ambient,Ee.lightProbe.value=U.state.probe,Ee.directionalLights.value=U.state.directional,Ee.directionalLightShadows.value=U.state.directionalShadow,Ee.spotLights.value=U.state.spot,Ee.spotLightShadows.value=U.state.spotShadow,Ee.rectAreaLights.value=U.state.rectArea,Ee.ltc_1.value=U.state.rectAreaLTC1,Ee.ltc_2.value=U.state.rectAreaLTC2,Ee.pointLights.value=U.state.point,Ee.pointLightShadows.value=U.state.pointShadow,Ee.hemisphereLights.value=U.state.hemi,Ee.directionalShadowMap.value=U.state.directionalShadowMap,Ee.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Ee.spotShadowMap.value=U.state.spotShadowMap,Ee.spotLightMatrix.value=U.state.spotLightMatrix,Ee.spotLightMap.value=U.state.spotLightMap,Ee.pointShadowMap.value=U.state.pointShadowMap,Ee.pointShadowMatrix.value=U.state.pointShadowMatrix),H.currentProgram=Le,H.uniformsList=null,Le}function Nc(v){if(v.uniformsList===null){let L=v.currentProgram.getUniforms();v.uniformsList=bs.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function Fc(v,L){let B=_e.get(v);B.outputColorSpace=L.outputColorSpace,B.batching=L.batching,B.batchingColor=L.batchingColor,B.instancing=L.instancing,B.instancingColor=L.instancingColor,B.instancingMorph=L.instancingMorph,B.skinning=L.skinning,B.morphTargets=L.morphTargets,B.morphNormals=L.morphNormals,B.morphColors=L.morphColors,B.morphTargetsCount=L.morphTargetsCount,B.numClippingPlanes=L.numClippingPlanes,B.numIntersection=L.numClipIntersection,B.vertexAlphas=L.vertexAlphas,B.vertexTangents=L.vertexTangents,B.toneMapping=L.toneMapping}function ud(v,L,B,H,U){L.isScene!==!0&&(L=we),He.resetTextureUnits();let te=L.fog,ce=H.isMeshStandardMaterial?L.environment:null,me=k===null?x.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:bi,ue=(H.isMeshStandardMaterial?vt:Ct).get(H.envMap||ce),Ce=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Le=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ee=!!B.morphAttributes.position,We=!!B.morphAttributes.normal,nt=!!B.morphAttributes.color,yt=Xn;H.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(yt=x.toneMapping);let ot=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,st=ot!==void 0?ot.length:0,Te=_e.get(H),ft=p.state.lights;if($e===!0&&(Y===!0||v!==b)){let Vt=v===b&&H.id===S;se.setState(H,v,Vt)}let Ye=!1;H.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==ft.state.version||Te.outputColorSpace!==me||U.isBatchedMesh&&Te.batching===!1||!U.isBatchedMesh&&Te.batching===!0||U.isBatchedMesh&&Te.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Te.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Te.instancing===!1||!U.isInstancedMesh&&Te.instancing===!0||U.isSkinnedMesh&&Te.skinning===!1||!U.isSkinnedMesh&&Te.skinning===!0||U.isInstancedMesh&&Te.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Te.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Te.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Te.instancingMorph===!1&&U.morphTexture!==null||Te.envMap!==ue||H.fog===!0&&Te.fog!==te||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==se.numPlanes||Te.numIntersection!==se.numIntersection)||Te.vertexAlphas!==Ce||Te.vertexTangents!==Le||Te.morphTargets!==Ee||Te.morphNormals!==We||Te.morphColors!==nt||Te.toneMapping!==yt||Te.morphTargetsCount!==st)&&(Ye=!0):(Ye=!0,Te.__version=H.version);let jt=Te.currentProgram;Ye===!0&&(jt=Cr(H,L,U));let Bi=!1,Qt=!1,Ps=!1,pt=jt.getUniforms(),un=Te.uniforms;if(ye.useProgram(jt.program)&&(Bi=!0,Qt=!0,Ps=!0),H.id!==S&&(S=H.id,Qt=!0),Bi||b!==v){ye.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),pt.setValue(P,"projectionMatrix",v.projectionMatrix),pt.setValue(P,"viewMatrix",v.matrixWorldInverse);let Yt=pt.map.cameraPosition;Yt!==void 0&&Yt.setValue(P,pe.setFromMatrixPosition(v.matrixWorld)),De.logarithmicDepthBuffer&&pt.setValue(P,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&pt.setValue(P,"isOrthographic",v.isOrthographicCamera===!0),b!==v&&(b=v,Qt=!0,Ps=!0)}if(U.isSkinnedMesh){pt.setOptional(P,U,"bindMatrix"),pt.setOptional(P,U,"bindMatrixInverse");let Vt=U.skeleton;Vt&&(Vt.boneTexture===null&&Vt.computeBoneTexture(),pt.setValue(P,"boneTexture",Vt.boneTexture,He))}U.isBatchedMesh&&(pt.setOptional(P,U,"batchingTexture"),pt.setValue(P,"batchingTexture",U._matricesTexture,He),pt.setOptional(P,U,"batchingIdTexture"),pt.setValue(P,"batchingIdTexture",U._indirectTexture,He),pt.setOptional(P,U,"batchingColorTexture"),U._colorsTexture!==null&&pt.setValue(P,"batchingColorTexture",U._colorsTexture,He));let dn=B.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&ne.update(U,B,jt),(Qt||Te.receiveShadow!==U.receiveShadow)&&(Te.receiveShadow=U.receiveShadow,pt.setValue(P,"receiveShadow",U.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(un.envMap.value=ue,un.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&L.environment!==null&&(un.envMapIntensity.value=L.environmentIntensity),Qt&&(pt.setValue(P,"toneMappingExposure",x.toneMappingExposure),Te.needsLights&&dd(un,Ps),te&&H.fog===!0&&K.refreshFogUniforms(un,te),K.refreshMaterialUniforms(un,H,V,q,p.state.transmissionRenderTarget[v.id]),bs.upload(P,Nc(Te),un,He)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(bs.upload(P,Nc(Te),un,He),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&pt.setValue(P,"center",U.center),pt.setValue(P,"modelViewMatrix",U.modelViewMatrix),pt.setValue(P,"normalMatrix",U.normalMatrix),pt.setValue(P,"modelMatrix",U.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let Vt=H.uniformsGroups;for(let Yt=0,Xa=Vt.length;Yt<Xa;Yt++){let fi=Vt[Yt];ze.update(fi,jt),ze.bind(fi,jt)}}return jt}function dd(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function fd(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(v,L,B){let H=_e.get(v);H.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),_e.get(v.texture).__webglTexture=L,_e.get(v.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:B,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,L){let B=_e.get(v);B.__webglFramebuffer=L,B.__useDefaultFramebuffer=L===void 0};let pd=P.createFramebuffer();this.setRenderTarget=function(v,L=0,B=0){k=v,A=L,R=B;let H=!0,U=null,te=!1,ce=!1;if(v){let ue=_e.get(v);if(ue.__useDefaultFramebuffer!==void 0)ye.bindFramebuffer(P.FRAMEBUFFER,null),H=!1;else if(ue.__webglFramebuffer===void 0)He.setupRenderTarget(v);else if(ue.__hasExternalTextures)He.rebindTextures(v,_e.get(v.texture).__webglTexture,_e.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Ee=v.depthTexture;if(ue.__boundDepthTexture!==Ee){if(Ee!==null&&_e.has(Ee)&&(v.width!==Ee.image.width||v.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");He.setupDepthRenderbuffer(v)}}let Ce=v.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ce=!0);let Le=_e.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Le[L])?U=Le[L][B]:U=Le[L],te=!0):v.samples>0&&He.useMultisampledRTT(v)===!1?U=_e.get(v).__webglMultisampledFramebuffer:Array.isArray(Le)?U=Le[B]:U=Le,I.copy(v.viewport),N.copy(v.scissor),F=v.scissorTest}else I.copy(de).multiplyScalar(V).floor(),N.copy(Ne).multiplyScalar(V).floor(),F=Je;if(B!==0&&(U=pd),ye.bindFramebuffer(P.FRAMEBUFFER,U)&&H&&ye.drawBuffers(v,U),ye.viewport(I),ye.scissor(N),ye.setScissorTest(F),te){let ue=_e.get(v.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+L,ue.__webglTexture,B)}else if(ce){let ue=L;for(let Ce=0;Ce<v.textures.length;Ce++){let Le=_e.get(v.textures[Ce]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ce,Le.__webglTexture,B,ue)}}else if(v!==null&&B!==0){let ue=_e.get(v.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ue.__webglTexture,B)}S=-1},this.readRenderTargetPixels=function(v,L,B,H,U,te,ce,me=0){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=_e.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ce!==void 0&&(ue=ue[ce]),ue){ye.bindFramebuffer(P.FRAMEBUFFER,ue);try{let Ce=v.textures[me],Le=Ce.format,Ee=Ce.type;if(!De.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!De.textureTypeReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-H&&B>=0&&B<=v.height-U&&(v.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+me),P.readPixels(L,B,H,U,be.convert(Le),be.convert(Ee),te))}finally{let Ce=k!==null?_e.get(k).__webglFramebuffer:null;ye.bindFramebuffer(P.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(v,L,B,H,U,te,ce,me=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=_e.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ce!==void 0&&(ue=ue[ce]),ue)if(L>=0&&L<=v.width-H&&B>=0&&B<=v.height-U){ye.bindFramebuffer(P.FRAMEBUFFER,ue);let Ce=v.textures[me],Le=Ce.format,Ee=Ce.type;if(!De.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!De.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,We),P.bufferData(P.PIXEL_PACK_BUFFER,te.byteLength,P.STREAM_READ),v.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+me),P.readPixels(L,B,H,U,be.convert(Le),be.convert(Ee),0);let nt=k!==null?_e.get(k).__webglFramebuffer:null;ye.bindFramebuffer(P.FRAMEBUFFER,nt);let yt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await ru(P,yt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,We),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,te),P.deleteBuffer(We),P.deleteSync(yt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,L=null,B=0){let H=Math.pow(2,-B),U=Math.floor(v.image.width*H),te=Math.floor(v.image.height*H),ce=L!==null?L.x:0,me=L!==null?L.y:0;He.setTexture2D(v,0),P.copyTexSubImage2D(P.TEXTURE_2D,B,0,0,ce,me,U,te),ye.unbindTexture()};let md=P.createFramebuffer(),gd=P.createFramebuffer();this.copyTextureToTexture=function(v,L,B=null,H=null,U=0,te=null){te===null&&(U!==0?(ss("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=U,U=0):te=0);let ce,me,ue,Ce,Le,Ee,We,nt,yt,ot=v.isCompressedTexture?v.mipmaps[te]:v.image;if(B!==null)ce=B.max.x-B.min.x,me=B.max.y-B.min.y,ue=B.isBox3?B.max.z-B.min.z:1,Ce=B.min.x,Le=B.min.y,Ee=B.isBox3?B.min.z:0;else{let dn=Math.pow(2,-U);ce=Math.floor(ot.width*dn),me=Math.floor(ot.height*dn),v.isDataArrayTexture?ue=ot.depth:v.isData3DTexture?ue=Math.floor(ot.depth*dn):ue=1,Ce=0,Le=0,Ee=0}H!==null?(We=H.x,nt=H.y,yt=H.z):(We=0,nt=0,yt=0);let st=be.convert(L.format),Te=be.convert(L.type),ft;L.isData3DTexture?(He.setTexture3D(L,0),ft=P.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(He.setTexture2DArray(L,0),ft=P.TEXTURE_2D_ARRAY):(He.setTexture2D(L,0),ft=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,L.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,L.unpackAlignment);let Ye=P.getParameter(P.UNPACK_ROW_LENGTH),jt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Bi=P.getParameter(P.UNPACK_SKIP_PIXELS),Qt=P.getParameter(P.UNPACK_SKIP_ROWS),Ps=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ot.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ot.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ce),P.pixelStorei(P.UNPACK_SKIP_ROWS,Le),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ee);let pt=v.isDataArrayTexture||v.isData3DTexture,un=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){let dn=_e.get(v),Vt=_e.get(L),Yt=_e.get(dn.__renderTarget),Xa=_e.get(Vt.__renderTarget);ye.bindFramebuffer(P.READ_FRAMEBUFFER,Yt.__webglFramebuffer),ye.bindFramebuffer(P.DRAW_FRAMEBUFFER,Xa.__webglFramebuffer);for(let fi=0;fi<ue;fi++)pt&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_e.get(v).__webglTexture,U,Ee+fi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_e.get(L).__webglTexture,te,yt+fi)),P.blitFramebuffer(Ce,Le,ce,me,We,nt,ce,me,P.DEPTH_BUFFER_BIT,P.NEAREST);ye.bindFramebuffer(P.READ_FRAMEBUFFER,null),ye.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(U!==0||v.isRenderTargetTexture||_e.has(v)){let dn=_e.get(v),Vt=_e.get(L);ye.bindFramebuffer(P.READ_FRAMEBUFFER,md),ye.bindFramebuffer(P.DRAW_FRAMEBUFFER,gd);for(let Yt=0;Yt<ue;Yt++)pt?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,dn.__webglTexture,U,Ee+Yt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,dn.__webglTexture,U),un?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Vt.__webglTexture,te,yt+Yt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Vt.__webglTexture,te),U!==0?P.blitFramebuffer(Ce,Le,ce,me,We,nt,ce,me,P.COLOR_BUFFER_BIT,P.NEAREST):un?P.copyTexSubImage3D(ft,te,We,nt,yt+Yt,Ce,Le,ce,me):P.copyTexSubImage2D(ft,te,We,nt,Ce,Le,ce,me);ye.bindFramebuffer(P.READ_FRAMEBUFFER,null),ye.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else un?v.isDataTexture||v.isData3DTexture?P.texSubImage3D(ft,te,We,nt,yt,ce,me,ue,st,Te,ot.data):L.isCompressedArrayTexture?P.compressedTexSubImage3D(ft,te,We,nt,yt,ce,me,ue,st,ot.data):P.texSubImage3D(ft,te,We,nt,yt,ce,me,ue,st,Te,ot):v.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,te,We,nt,ce,me,st,Te,ot.data):v.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,te,We,nt,ot.width,ot.height,st,ot.data):P.texSubImage2D(P.TEXTURE_2D,te,We,nt,ce,me,st,Te,ot);P.pixelStorei(P.UNPACK_ROW_LENGTH,Ye),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,jt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Bi),P.pixelStorei(P.UNPACK_SKIP_ROWS,Qt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ps),te===0&&L.generateMipmaps&&P.generateMipmap(ft),ye.unbindTexture()},this.initRenderTarget=function(v){_e.get(v).__webglFramebuffer===void 0&&He.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?He.setTextureCube(v,0):v.isData3DTexture?He.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?He.setTexture2DArray(v,0):He.setTexture2D(v,0),ye.unbindTexture()},this.resetState=function(){A=0,R=0,k=null,ye.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}};var Hu={type:"change"},bc={type:"start"},Gu={type:"end"},Ia=new Vn,Vu=new Nt,uy=Math.cos(70*Kl.DEG2RAD),At=new C,Jt=2*Math.PI,it={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},vc=1e-6,Da=class extends mr{constructor(e,t=null){super(e,t),this.state=it.NONE,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ot.ROTATE,MIDDLE:Ot.DOLLY,RIGHT:Ot.PAN},this.touches={ONE:si.ROTATE,TWO:si.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new _t,this._lastTargetPosition=new C,this._quat=new _t().setFromUnitVectors(e.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ps,this._sphericalDelta=new ps,this._scale=1,this._panOffset=new C,this._rotateStart=new oe,this._rotateEnd=new oe,this._rotateDelta=new oe,this._panStart=new oe,this._panEnd=new oe,this._panDelta=new oe,this._dollyStart=new oe,this._dollyEnd=new oe,this._dollyDelta=new oe,this._dollyDirection=new C,this._mouse=new oe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=fy.bind(this),this._onPointerDown=dy.bind(this),this._onPointerUp=py.bind(this),this._onContextMenu=by.bind(this),this._onMouseWheel=yy.bind(this),this._onKeyDown=_y.bind(this),this._onTouchStart=xy.bind(this),this._onTouchMove=vy.bind(this),this._onMouseDown=my.bind(this),this._onMouseMove=gy.bind(this),this._interceptControlDown=My.bind(this),this._interceptControlUp=Sy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Hu),this.update(),this.state=it.NONE}update(e=null){let t=this.object.position;At.copy(t).sub(this.target),At.applyQuaternion(this._quat),this._spherical.setFromVector3(At),this.autoRotate&&this.state===it.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Jt:n>Math.PI&&(n-=Jt),i<-Math.PI?i+=Jt:i>Math.PI&&(i-=Jt),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(At.setFromSpherical(this._spherical),At.applyQuaternion(this._quatInverse),t.copy(this.target).add(At),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=At.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new C(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new C(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=At.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ia.origin.copy(this.object.position),Ia.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ia.direction))<uy?this.object.lookAt(this.target):(Vu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ia.intersectPlane(Vu,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>vc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>vc||this._lastTargetPosition.distanceToSquared(this.target)>vc?(this.dispatchEvent(Hu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Jt/60*this.autoRotateSpeed*e:Jt/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){At.setFromMatrixColumn(t,0),At.multiplyScalar(-e),this._panOffset.add(At)}_panUp(e,t){this.screenSpacePanning===!0?At.setFromMatrixColumn(t,1):(At.setFromMatrixColumn(t,0),At.crossVectors(this.object.up,At)),At.multiplyScalar(e),this._panOffset.add(At)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;At.copy(i).sub(this.target);let r=At.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Jt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Jt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Jt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Jt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new oe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function dy(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function fy(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function py(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Gu),this.state=it.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function my(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=it.DOLLY;break;case Ot.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=it.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=it.ROTATE}break;case Ot.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=it.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=it.PAN}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(bc)}function gy(s){switch(this.state){case it.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case it.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case it.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function yy(s){this.enabled===!1||this.enableZoom===!1||this.state!==it.NONE||(s.preventDefault(),this.dispatchEvent(bc),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Gu))}function _y(s){this.enabled!==!1&&this._handleKeyDown(s)}function xy(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case si.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=it.TOUCH_ROTATE;break;case si.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=it.TOUCH_PAN;break;default:this.state=it.NONE}break;case 2:switch(this.touches.TWO){case si.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=it.TOUCH_DOLLY_PAN;break;case si.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=it.TOUCH_DOLLY_ROTATE;break;default:this.state=it.NONE}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(bc)}function vy(s){switch(this._trackPointer(s),this.state){case it.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case it.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case it.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case it.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=it.NONE}}function by(s){this.enabled!==!1&&s.preventDefault()}function My(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Sy(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}St.DEFAULT_UP.set(0,0,1);var ln={edge:2042419,hoverFace:1884390,hoverEdge:16091679,selFace:366269,selEdge:15231488,planeXY:5016565,planeXZ:3781227,planeYZ:15029067},La=class{constructor(e){this.el=e,this.renderer=new Ra({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.setClearColor(0,0),this.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),e.appendChild(this.renderer.domElement),this.scene=new Zs,this.camera=new Ai(-1,1,1,-1,-1e5,1e5),this.camera.up.set(0,0,1),this.camera.position.set(200,-260,180),this.controls=new Da(this.camera,this.renderer.domElement),this.controls.enableDamping=!1,this.controls.zoomToCursor=!0,this.controls.mouseButtons={LEFT:null,MIDDLE:Ot.PAN,RIGHT:Ot.ROTATE},this.controls.addEventListener("change",()=>this.render()),this.viewHeight=200,this.scene.add(new ur(16777215,9080729,1.6)),this.sun=new dr(16777215,1.6),this.camera.add(this.sun),this.sun.position.set(-1,2,3),this.scene.add(this.camera),this.partGroup=new Wt,this.scene.add(this.partGroup),this.overlay=new Wt,this.scene.add(this.overlay),this.sketchGroup=new Wt,this.scene.add(this.sketchGroup),this.material=new wi({color:9417673,metalness:.15,roughness:.55,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1,side:xt}),this.edgeMat=new Pt({color:ln.edge}),this.style="edges",this.desc=null,this.mesh=null,this.edgeLines=null,this.makeOrigin(),this.makeGrid(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize()}makeOrigin(){let e=new Wt,t=40,n=(r,o,a)=>{let l=new Gn(t,t),c=new ct(l,new Ft({color:r,transparent:!0,opacity:.12,side:xt,depthWrite:!1})),h=new wn(new Qs(l),new Pt({color:r,transparent:!0,opacity:.6}));return c.add(h),c.userData.planeName=o,a&&a(c),e.add(c),c};this.planes={XY:n(ln.planeXY,"XY"),XZ:n(ln.planeXZ,"XZ",r=>r.rotation.set(Math.PI/2,0,0)),YZ:n(ln.planeYZ,"YZ",r=>r.rotation.set(Math.PI/2,Math.PI/2,0))};let i=(r,o)=>{let a=new Ze().setFromPoints([new C,new C(...r).multiplyScalar(t*.75)]);e.add(new rn(a,new Pt({color:o})))};i([1,0,0],15029067),i([0,1,0],3781227),i([0,0,1],5016565),this.originGroup=e,this.planesVisible=!1;for(let r of Object.values(this.planes))r.visible=!1;this.scene.add(e)}showPlanes(e){this.planesVisible=e;for(let t of Object.values(this.planes))t.visible=e;this.render()}makeGrid(){let e=new pr(400,40,12174028,14541543);e.rotation.x=Math.PI/2,e.material.transparent=!0,e.material.opacity=.55,e.material.depthWrite=!1,this.grid=e,this.scene.add(e)}setColor(e){this.material.color.set(e),this.render()}resize(){let e=this.el.clientWidth||1,t=this.el.clientHeight||1;this.renderer.setSize(e,t,!1),this.renderer.domElement.style.width=e+"px",this.renderer.domElement.style.height=t+"px",this.aspect=e/t,this.updateFrustum()}updateFrustum(){let e=this.viewHeight/2,t=e*this.aspect;Object.assign(this.camera,{left:-t,right:t,top:e,bottom:-e}),this.camera.updateProjectionMatrix(),this.render()}pixelSize(){return this.viewHeight/this.camera.zoom/(this.el.clientHeight||1)}render(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this.onBeforeRender&&this.onBeforeRender(),this.renderer.render(this.scene,this.camera)}))}setPart(e){if(this.desc=e,this.mesh&&(this.partGroup.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh=null),this.edgeLines&&(this.partGroup.remove(this.edgeLines),this.edgeLines.geometry.dispose(),this.edgeLines=null),this.clearHighlights(),e){let t=new Ze;t.setAttribute("position",new lt(e.vertices,3)),t.setAttribute("normal",new lt(e.normals,3)),t.setIndex(new lt(e.triangles,1)),t.computeBoundingSphere(),this.mesh=new ct(t,this.material),this.partGroup.add(this.mesh);let n=new Ze;n.setAttribute("position",new lt(e.lines,3));let i=[];for(let[r,o]of e.edgeGroups)for(let a=r;a<r+o-1;a++)i.push(a,a+1);n.setIndex(i),this.edgeLines=new wn(n,this.edgeMat),this.partGroup.add(this.edgeLines)}this.applyStyle()}applyStyle(e=this.style){this.style=e,this.onStyle&&this.onStyle(),this.mesh&&(this.mesh.visible=e!=="wire"),this.edgeLines&&(this.edgeLines.visible=e!=="shaded"),this.render()}setGhost(e){this.material.transparent=e,this.material.opacity=e?.35:1,this.material.depthWrite=!e,this.material.needsUpdate=!0,this.render()}fit(e){if(!e&&this.fitOverride)return this.fitOverride();e||(e=this.desc?this.desc.bb:[[-50,-50,0],[50,50,50]]);let t=new C((e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2,(e[0][2]+e[1][2])/2),n=Math.max(10,Math.hypot(e[1][0]-e[0][0],e[1][1]-e[0][1],e[1][2]-e[0][2])),i=this.camera.position.clone().sub(this.controls.target).normalize();this.controls.target.copy(t),this.camera.position.copy(t).add(i.multiplyScalar(n*4)),this.viewHeight=n*1.3,this.camera.zoom=1,this.updateFrustum(),this.controls.update()}setView(e){let t={home:[1,-1.3,.9],front:[0,-1,0],back:[0,1,0],top:[0,0,1],bottom:[0,0,-1],right:[1,0,0],left:[-1,0,0]},n={top:[0,1,0],bottom:[0,-1,0]},i=new C(...t[e]).normalize();this.lookAlong(i,new C(...n[e]||[0,0,1])),this.fit()}setUp(e){this.camera.up.copy(e),this.controls._quat.setFromUnitVectors(this.camera.up,new C(0,1,0)),this.controls._quatInverse.copy(this.controls._quat).invert()}lookAlong(e,t,n){let i=(n||this.controls.target).clone(),r=Math.max(500,this.camera.position.distanceTo(this.controls.target));this.controls.target.copy(i),this.setUp(t),this.camera.position.copy(i).add(e.clone().multiplyScalar(r)),this.camera.lookAt(i),this.controls.update(),this.render()}ray(e){let t=this.renderer.domElement.getBoundingClientRect(),n=new oe((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),i=new fr;return i.setFromCamera(n,this.camera),i.params.Line.threshold=this.pixelSize()*6,i}faceAt(e){let t=e*3,n=this.desc.faceGroups;for(let i=0;i<n.length;i++)if(t>=n[i][0]&&t<n[i][0]+n[i][1])return i;return-1}edgeAt(e){let t=this.desc.edgeGroups;for(let n=0;n<t.length;n++)if(e>=t[n][0]&&e<t[n][0]+t[n][1])return n;return-1}pick(e,t){let n=this.ray(e);if(t.edges&&this.edgeLines&&this.desc){let i=this.edgeLines.visible;this.edgeLines.visible=!0;let r=n.intersectObject(this.edgeLines);this.edgeLines.visible=i;let o=1/0;if(this.mesh){let c=n.intersectObject(this.mesh);c.length&&(o=c[0].distance)}let a=this.pixelSize()*8,l=r.find(c=>c.distance<=o+a);if(l)return{kind:"edge",index:this.edgeAt(l.index),point:l.point.toArray()}}if(t.faces&&this.mesh&&this.desc){let i=n.intersectObject(this.mesh);if(i.length){let r=this.faceAt(i[0].faceIndex);if(r>=0)return{kind:"face",index:r,point:i[0].point.toArray(),info:this.desc.faces[r]}}}if(t.planes){let i=Object.values(this.planes),r=n.intersectObjects(i,!1);if(r.length)return{kind:"plane",name:r[0].object.userData.planeName,point:r[0].point.toArray()}}return null}clearHighlights(){for(let e of[...this.overlay.children])this.overlay.remove(e),e.geometry&&e.geometry.dispose();this.render()}faceGeometry(e){let[t,n]=this.desc.faceGroups[e],i=new Ze;return i.setAttribute("position",this.mesh.geometry.getAttribute("position")),i.setIndex(Array.from(this.desc.triangles.subarray(t,t+n))),i}edgeGeometry(e){let[t,n]=this.desc.edgeGroups[e],i=[];for(let r=t;r<t+n;r++)i.push(new C(this.desc.lines[r*3],this.desc.lines[r*3+1],this.desc.lines[r*3+2]));return new Ze().setFromPoints(i)}highlight(e){this.clearHighlights();for(let t of e)this.addHighlight(t);this.render()}addHighlight(e){if(e.kind==="face"&&this.desc&&e.index>=0&&e.index<this.desc.faceGroups.length){let t=new ct(this.faceGeometry(e.index),new Ft({color:e.color,transparent:!0,opacity:.55,side:xt,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));this.overlay.add(t)}else if(e.kind==="edge"&&this.desc&&e.index>=0&&e.index<this.desc.edgeGroups.length){let t=new rn(this.edgeGeometry(e.index),new Pt({color:e.color,depthTest:!1}));t.renderOrder=10,this.overlay.add(t)}else if(e.kind==="plane"){let t=this.planes[e.name],n=new ct(t.geometry.clone(),new Ft({color:e.color,transparent:!0,opacity:.35,side:xt,depthWrite:!1}));n.quaternion.copy(t.quaternion),this.overlay.add(n)}else if(e.kind==="point"){let t=this.pixelSize()*5,n=new ct(new lr(t,12,8),new Ft({color:e.color,depthTest:!1}));n.position.set(...e.point),n.renderOrder=11,this.overlay.add(n)}else if(e.kind==="segment"){let t=new rn(new Ze().setFromPoints(e.points.map(n=>new C(...n))),new Ei({color:e.color,depthTest:!1,dashSize:this.pixelSize()*6,gapSize:this.pixelSize()*4}));t.computeLineDistances(),t.renderOrder=10,this.overlay.add(t)}}screenOf(e){let t=new C(...e).project(this.camera);return[(t.x+1)/2*this.el.clientWidth,(1-t.y)/2*this.el.clientHeight]}snapshot(){return this.renderer.render(this.scene,this.camera),this.renderer.domElement.toDataURL("image/png")}};var Wu={sin:s=>Math.sin(s*Math.PI/180),cos:s=>Math.cos(s*Math.PI/180),tan:s=>Math.tan(s*Math.PI/180),sqrt:Math.sqrt,abs:Math.abs,round:Math.round,floor:Math.floor,ceil:Math.ceil,min:Math.min,max:Math.max},Xu={pi:Math.PI,PI:Math.PI};function wy(s){let e=[],t=/\s*(?:(\d+\.?\d*(?:[eE][-+]?\d+)?|\.\d+)|([A-Za-z_][A-Za-z_0-9]*)|(\S))/y,n;for(t.lastIndex=0;t.lastIndex<s.length;){let i=t.lastIndex;if(n=t.exec(s),!n)break;if(n[1]!==void 0)e.push({t:"num",v:parseFloat(n[1])});else if(n[2]!==void 0)e.push({t:"id",v:n[2]});else if(n[3]!==void 0)e.push({t:"op",v:n[3]});else if(t.lastIndex===i)break}return e}function Kt(s,e={},t=new Set){if(typeof s=="number")return s;if(s==null||String(s).trim()==="")throw new Error("Empty value");let n=wy(String(s)),i=0,r=()=>n[i],o=f=>{let m=n[i];if(!m||f&&m.v!==f)throw new Error(`Expected "${f}"`);return i++,m};function a(){let f=r();if(!f)throw new Error("Unfinished expression");if(f.t==="num")return i++,f.v;if(f.t==="op"&&f.v==="("){i++;let m=u();return o(")"),m}if(f.t==="op"&&(f.v==="-"||f.v==="+")){i++;let m=l();return f.v==="-"?-m:m}if(f.t==="id"){if(i++,Wu[f.v]&&r()&&r().v==="("){i++;let m=[u()];for(;r()&&r().v===",";)i++,m.push(u());return o(")"),Wu[f.v](...m)}if(f.v in Xu)return Xu[f.v];if(Object.prototype.hasOwnProperty.call(e,f.v)){if(t.has(f.v))throw new Error(`"${f.v}" refers to itself`);let m=new Set(t);return m.add(f.v),Kt(e[f.v],e,m)}throw new Error(`Unknown name "${f.v}"`)}throw new Error(`Unexpected "${f.v}"`)}function l(){let f=a();return r()&&r().v==="^"?(i++,Math.pow(f,c())):f}function c(){return l()}function h(){let f=c();for(;r()&&(r().v==="*"||r().v==="/");){let m=n[i++].v,y=c();f=m==="*"?f*y:f/y}return f}function u(){let f=h();for(;r()&&(r().v==="+"||r().v==="-");){let m=n[i++].v,y=h();f=m==="+"?f+y:f-y}return f}let d=u();if(i<n.length)throw new Error(`Unexpected "${n[i].v}"`);if(!Number.isFinite(d))throw new Error("Not a number");return d}function $u(s){let e={};for(let t of s.params||[])t.name&&(e[t.name]=t.expr);return e}function cn(s,e){try{return{ok:!0,v:Kt(s,e)}}catch(t){return{ok:!1,err:t.message}}}function Se(s){return Number.isFinite(s)?String(Math.round(s*1e4)/1e4):""}var zt={coincident:{label:"Coincident",glyph:"\u25CF",need:"points",help:"Click two points to join them."},horizontal:{label:"Horizontal",glyph:"H",need:"line",help:"Click a line to make it level (or two points to line them up side to side)."},vertical:{label:"Vertical",glyph:"V",need:"line",help:"Click a line to make it straight up and down (or two points to stack them)."},parallel:{label:"Parallel",glyph:"\u2225",need:"2lines",help:"Click two lines to make them point the same way."},perpendicular:{label:"Perpendicular",glyph:"\u22A5",need:"2lines",help:"Click two lines to make them meet at 90\xB0."},equal:{label:"Equal",glyph:"=",need:"2same",help:"Click two lines (same length) or two circles/arcs (same size)."},tangent:{label:"Tangent",glyph:"T",need:"tangent",help:"Click a line and a circle/arc (or two circles/arcs) to make them touch smoothly."},concentric:{label:"Concentric",glyph:"\u25CE",need:"2round",help:"Click two circles/arcs to give them the same center."},fix:{label:"Fix",glyph:"\u{1F512}",need:"point",help:"Click a point to pin it where it is."},midpoint:{label:"Midpoint",glyph:"\u22C8",need:"pointLine",help:"Click a point, then a line: the point moves to the middle of the line."},length:{label:"Length",dim:!0},radius:{label:"Radius",dim:!0},distance:{label:"Distance",dim:!0}},Ey={line:["x1","y1","x2","y2"],arc:["x1","y1","x2","y2","xm","ym"],circle:["cx","cy","r"],polygon:["cx","cy","r","rot"],slot:["x1","y1","x2","y2","w"],point:["x","y"]},Ty=s=>typeof s=="number";function Sr(s,e,t){if(t==="p1")return[e.x1,e.y1];if(t==="p2")return[e.x2,e.y2];if(t==="pm")return[e.xm,e.ym];if(t==="c"){if(s==="arc"){let n=ai([e.x1,e.y1],[e.x2,e.y2],[e.xm,e.ym]);return n?n.c:[e.xm,e.ym]}return s==="slot"?[(e.x1+e.x2)/2,(e.y1+e.y2)/2]:s==="point"?[e.x,e.y]:[e.cx,e.cy]}return null}function Ss(s,e){if(s==="circle")return e.r;if(s==="arc"){let t=ai([e.x1,e.y1],[e.x2,e.y2],[e.xm,e.ym]);return t?t.r:0}return 0}function qu(s){return{line:["p1","p2"],arc:["p1","p2","c"],circle:["c"],polygon:["c"],slot:["p1","p2"],point:["c"]}[s]||[]}function ws(s,e,t,n={}){let i=(e||[]).filter(T=>!T.off),r=n.pull||[];if(!i.length&&!r.length)return{entities:s,ok:!0,bad:[]};let o=new Map(s.map(T=>[T.id,T])),a=new Set;for(let T of i)for(let A of T.refs)a.add(A.e);for(let T of r)a.add(T.id);let l=[],c=new Map;for(let T of s){let A={};for(let R of Ey[T.type]||[]){try{A[R]=Kt(T[R],t)}catch{A[R]=0}a.has(T.id)&&Ty(T[R])&&!(T.type==="polygon"&&R==="rot")&&l.push({id:T.id,k:R})}c.set(T.id,A)}let h=l.map(T=>c.get(T.id)[T.k]),u=T=>{let A=new Map;for(let[R,k]of c)A.set(R,{...k});return l.forEach((R,k)=>{A.get(R.id)[R.k]=T[k]}),A},d=(T,A)=>{let R=u(T),k=[],S=[],b=N=>Sr(o.get(N.e).type,R.get(N.e),N.k),I=N=>{let F=R.get(N),z=F.x2-F.x1,X=F.y2-F.y1,G=Math.hypot(z,X)||1e-9;return[z/G,X/G,G]};for(let N of i){let[F,z]=N.refs,X=o.get(F.e),G=z&&o.get(z.e);if(!X||z&&!G)continue;let q=Z=>{k.push(Z),S.push(N.id)},V=0;try{N.value!=null&&(V=Kt(N.value,t))}catch{V=0}switch(N.type){case"coincident":{let Z=b(F),Q=b(z);q(Z[0]-Q[0]),q(Z[1]-Q[1]);break}case"horizontal":if(z)q(b(F)[1]-b(z)[1]);else{let Z=R.get(F.e);q(Z.y2-Z.y1)}break;case"vertical":if(z)q(b(F)[0]-b(z)[0]);else{let Z=R.get(F.e);q(Z.x2-Z.x1)}break;case"parallel":{let Z=I(F.e),Q=I(z.e);q((Z[0]*Q[1]-Z[1]*Q[0])*10);break}case"perpendicular":{let Z=I(F.e),Q=I(z.e);q((Z[0]*Q[0]+Z[1]*Q[1])*10);break}case"equal":X.type==="line"?q(I(F.e)[2]-I(z.e)[2]):q(Ss(X.type,R.get(F.e))-Ss(G.type,R.get(z.e)));break;case"concentric":{let Z=b({e:F.e,k:"c"}),Q=b({e:z.e,k:"c"});q(Z[0]-Q[0]),q(Z[1]-Q[1]);break}case"tangent":{let Z=X.type==="line"?F:G.type==="line"?z:null;if(Z){let Q=Z===F?z:F,de=R.get(Z.e),Ne=b({e:Q.e,k:"c"}),Je=Ss(o.get(Q.e).type,R.get(Q.e)),Ke=de.x2-de.x1,$e=de.y2-de.y1,Y=Math.hypot(Ke,$e)||1e-9;q(Math.abs(((Ne[0]-de.x1)*$e-(Ne[1]-de.y1)*Ke)/Y)-Je)}else{let Q=b({e:F.e,k:"c"}),de=b({e:z.e,k:"c"}),Ne=Ss(X.type,R.get(F.e)),Je=Ss(G.type,R.get(z.e)),Ke=Math.hypot(Q[0]-de[0],Q[1]-de[1]);q(N.inside?Ke-Math.abs(Ne-Je):Ke-(Ne+Je))}break}case"fix":{let Z=b(F);q((Z[0]-N.at[0])*2),q((Z[1]-N.at[1])*2);break}case"midpoint":{let Z=b(F),Q=R.get(z.e);q(Z[0]-(Q.x1+Q.x2)/2),q(Z[1]-(Q.y1+Q.y2)/2);break}case"length":{q(I(F.e)[2]-V);break}case"radius":{q(Ss(X.type,R.get(F.e))-V);break}case"distance":{let Z=b(F),Q=b(z);N.axis==="x"?q(Math.abs(Z[0]-Q[0])-V):N.axis==="y"?q(Math.abs(Z[1]-Q[1])-V):q(Math.hypot(Z[0]-Q[0],Z[1]-Q[1])-V);break}}}if(!A)for(let N of r){let F=Sr(o.get(N.id).type,u(T).get(N.id),N.k);k.push((F[0]-N.to[0])*.05,(F[1]-N.to[1])*.05),S.push(null,null)}return{r:k,tag:S}},f=h.slice(),m=f.length,{r:y}=d(f),g=y.reduce((T,A)=>T+A*A,0),p=.001;for(let T=0;T<200&&g>1e-20&&m;T++){let A=[];for(let b=0;b<m;b++){let I=1e-6*Math.max(1,Math.abs(f[b])),N=f.slice();N[b]+=I;let F=d(N).r;A.push(F.map((z,X)=>(z-y[X])/I))}let R=Array.from({length:m},()=>new Float64Array(m)),k=new Float64Array(m);for(let b=0;b<m;b++){for(let I=0;I<y.length;I++)k[b]+=A[b][I]*y[I];for(let I=b;I<m;I++){let N=0;for(let F=0;F<y.length;F++)N+=A[b][F]*A[I][F];R[b][I]=R[I][b]=N}}let S=!1;for(let b=0;b<12;b++){let I=R.map((G,q)=>{let V=Float64Array.from(G);return V[q]+=p*(G[q]+1e-6),V}),N=Ay(I,Array.from(k,G=>-G));if(!N){p*=10;continue}let F=f.map((G,q)=>G+N[q]),z=d(F).r,X=z.reduce((G,q)=>G+q*q,0);if(X<g){f=F,y=z,g=X,p=Math.max(p/3,1e-9),S=!0;break}p*=8}if(!S)break}let w=d(f,!0),M=new Set;return w.r.forEach((T,A)=>{Math.abs(T)>1e-4&&w.tag[A]&&M.add(w.tag[A])}),{entities:s.map(T=>{if(!a.has(T.id))return T;let A={...T};return l.forEach((R,k)=>{R.id===T.id&&(A[R.k]=Math.round(f[k]*1e6)/1e6)}),A}),ok:M.size===0,bad:[...M]}}function Ay(s,e){let t=e.length,n=s.map((r,o)=>[...r,e[o]]);for(let r=0;r<t;r++){let o=r;for(let a=r+1;a<t;a++)Math.abs(n[a][r])>Math.abs(n[o][r])&&(o=a);if(Math.abs(n[o][r])<1e-14)return null;[n[r],n[o]]=[n[o],n[r]];for(let a=r+1;a<t;a++){let l=n[a][r]/n[r][r];if(l)for(let c=r;c<=t;c++)n[a][c]-=l*n[r][c]}}let i=new Array(t).fill(0);for(let r=t-1;r>=0;r--){let o=n[r][t];for(let a=r+1;a<t;a++)o-=n[r][a]*i[a];i[r]=o/n[r][r]}return i}var ob=Math.PI*2,Yu=s=>s*Math.PI/180;function Ni(s,e,t){return[s[0]+e*Math.cos(Yu(t)),s[1]+e*Math.sin(Yu(t))]}function li(s,e){let t=(e-s)%360;return t<=1e-9&&(t+=360),t}function Es(s,e){return{type:"line",a:s,b:e}}function Ts(s,e,t,n){let i=li(t,n);return{type:"arc",c:s,r:e,a1:t,a2:n,a:Ni(s,e,t),b:Ni(s,e,t+i),m:Ni(s,e,t+i/2)}}function ai(s,e,t){let[n,i]=s,[r,o]=t,[a,l]=e,c=2*(n*(o-l)+r*(l-i)+a*(i-o));if(Math.abs(c)<1e-9)return null;let h=((n*n+i*i)*(o-l)+(r*r+o*o)*(l-i)+(a*a+l*l)*(i-o))/c,u=((n*n+i*i)*(a-r)+(r*r+o*o)*(n-a)+(a*a+l*l)*(r-n))/c,d=[h,u],f=Math.hypot(n-h,i-u),m=x=>Math.atan2(x[1]-u,x[0]-h)*180/Math.PI,y=m(s),g=m(e),p=m(t),w=li(y,p)<li(y,g),M=w?Ts(d,f,y,g):Ts(d,f,g,y);return w?M={...M,a:s,b:e}:M={...M,a:e,b:s},{c:d,r:f,seg:M,ccw:w}}function Cy(s,e){let t=n=>Kt(n,e);switch(s.type){case"line":{let n=[t(s.x1),t(s.y1)],i=[t(s.x2),t(s.y2)];return{segs:[Es(n,i)],closed:!1}}case"arc":{let n=[t(s.x1),t(s.y1)],i=[t(s.x2),t(s.y2)],r=[t(s.xm),t(s.ym)],o=ai(n,i,r);if(!o)throw new Error("The three arc points are in a straight line");return{segs:[o.seg],closed:!1,center:o.c,radius:o.r}}case"rect":{let n=t(s.x),i=t(s.y),r=t(s.w),o=t(s.h);if(Math.abs(r)<1e-9||Math.abs(o)<1e-9)throw new Error("Width and height must not be 0");r<0&&(n+=r,r=-r),o<0&&(i+=o,o=-o);let a=[[n,i],[n+r,i],[n+r,i+o],[n,i+o]];return{segs:a.map((l,c)=>Es(l,a[(c+1)%4])),closed:!0}}case"circle":{let n=[t(s.cx),t(s.cy)],i=t(s.r);if(i<=0)throw new Error("Radius must be more than 0");return{segs:[Ts(n,i,0,180),Ts(n,i,180,360)],closed:!0,circle:{c:n,r:i}}}case"polygon":{let n=[t(s.cx),t(s.cy)],i=t(s.r),r=Math.round(t(s.n)),o=t(s.rot||0);if(i<=0)throw new Error("Size must be more than 0");if(r<3||r>64)throw new Error("Sides must be 3 to 64");let a=[];for(let l=0;l<r;l++)a.push(Ni(n,i,o+360*l/r));return{segs:a.map((l,c)=>Es(l,a[(c+1)%r])),closed:!0}}case"slot":{let n=[t(s.x1),t(s.y1)],i=[t(s.x2),t(s.y2)],r=t(s.w);if(r<=0)throw new Error("Width must be more than 0");if(Math.hypot(i[0]-n[0],i[1]-n[1])<1e-9)throw new Error("Slot ends must be apart");let a=Math.atan2(i[1]-n[1],i[0]-n[0])*180/Math.PI,l=r/2,c=Ts(i,l,a-90,a+90),h=Ts(n,l,a+90,a+270);return{segs:[c,Es(c.b,h.a),h,Es(h.b,c.a)],closed:!0}}case"point":return{segs:[],closed:!1,point:[t(s.x),t(s.y)]}}throw new Error("Unknown sketch item "+s.type)}function wr(s,e,t){let n=[];if(t&&t.length){let r=ws(s,t,e);s=r.entities,n=r.bad}let i=s.map(r=>{try{return{e:r,g:Cy(r,e)}}catch(o){return{e:r,err:o.message}}});return i.bad=n,i}function Ry(s,e){if(s.type==="line"){e.push(s.a);return}let t=li(s.a1,s.a2),n=Math.max(4,Math.ceil(t/10));for(let i=0;i<n;i++)e.push(Ni(s.c,s.r,s.a1+t*i/n))}function Py(s){return s.type==="line"?Es(s.b,s.a):{...s,a:s.b,b:s.a,reversed:!s.reversed}}function Iy(s){let e=0;for(let t=0;t<s.length;t++){let n=s[t],i=s[(t+1)%s.length];e+=n[0]*i[1]-i[0]*n[1]}return e/2}function Dy(s,e){let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){let[r,o]=e[n],[a,l]=e[i];o>s[1]!=l>s[1]&&s[0]<(a-r)*(s[1]-o)/(l-o)+r&&(t=!t)}return t}function Ly(s,e){let t=1/0;for(let n=0;n<e.length;n++){let i=e[n],r=e[(n+1)%e.length],o=r[0]-i[0],a=r[1]-i[1],l=o*o+a*a||1,c=Math.max(0,Math.min(1,((s[0]-i[0])*o+(s[1]-i[1])*a)/l));t=Math.min(t,Math.hypot(s[0]-i[0]-c*o,s[1]-i[1]-c*a))}return t}function ky(s,e){let t=0;for(let n of e)if(!(Ly(n,s)<.001)){if(!Dy(n,s))return!1;t++}return t>0||e.length>0}var Zu=1e-4,ka=(s,e)=>Math.abs(s[0]-e[0])<Zu&&Math.abs(s[1]-e[1])<Zu;function Ua(s){let e=[],t=[];for(let i of s)if(!(!i.g||i.e.construction))if(i.g.closed)e.push({segs:i.g.segs,circle:i.g.circle,ids:[i.e.id]});else for(let r of i.g.segs)t.push({s:r,id:i.e.id,used:!1});let n=0;for(let i of t){if(i.used)continue;i.used=!0;let r=[i.s],o=[i.id],a=!1;for(let l=0;l<1e4;l++){let c=r[r.length-1].b;if(r.length>1&&ka(c,r[0].a)){a=!0;break}if(r.length===1&&r[0].type==="arc"&&ka(c,r[0].a)){a=!0;break}let h=null;for(let u of t)if(!u.used&&(ka(u.s.a,c)?h=u.s:ka(u.s.b,c)&&(h=Py(u.s)),h)){u.used=!0,o.push(u.id);break}if(!h)break;r.push(h)}a?e.push({segs:r,ids:o}):n++}for(let i of e){let r=[];for(let o of i.segs)Ry(o,r);i.poly=r,i.area=Math.abs(Iy(r))}for(let i of e)i.depth=e.filter(r=>r!==i&&r.area>i.area+1e-9&&ky(r.poly,i.poly)).length;return e.sort((i,r)=>i.depth-r.depth||r.area-i.area),{loops:e,openEnds:n}}var $t={line:1459578,cons:14254635,sel:15227148,hover:1221530,err:14036783,open:14036783,pt:1459578,fill:3065014,preview:1221530},wt=s=>Math.round(s*1e3)/1e3,Mc=s=>Math.round(s*1e5)/1e5;var Fa=s=>typeof s=="number"||typeof s=="string"&&/^\s*-?\d*\.?\d+(e-?\d+)?\s*$/i.test(s),Re=(s,e)=>{try{return Kt(s,e)}catch{return NaN}},Ju={select:"Click a shape to pick it. Drag a dot to move a point. Click a blue number to change it. Delete removes.",line:"Click to start, keep clicking for more lines. Click the first point to close. Esc or right-click stops.",rect:"Click one corner, then the opposite corner.",circle:"Click the center, then click to set the size.",arc:"Click the start, then the end, then a point the arc should pass through.",polygon:"Click the center, then a corner.",slot:"Click one end center, then the other end center, then set the width."};for(let[s,e]of Object.entries(zt))e.dim||(Ju["c:"+s]=e.label+": "+e.help);var Oa=class{constructor(e){this.app=e,this.vp=e.vp,this.group=this.vp.sketchGroup,this.labelsEl=document.getElementById("dimLayer"),this.active=!1,this.tool="select",this.temp=[],this.sel=new Set,this.hover=null,this.cursor=null,this.polySides=6,this.gridOn=!0,this.autoCons=!0,this.showCons=!0,this.selCons=new Set,this.picks=[],this.labels=[],this.vp.onBeforeRender=()=>this.active&&this.placeLabels();let t=this.vp.renderer.domElement;t.addEventListener("pointermove",n=>this.active&&this.onMove(n)),t.addEventListener("pointerdown",n=>this.active&&this.onDown(n)),t.addEventListener("pointerup",n=>this.active&&this.onUp(n)),t.addEventListener("contextmenu",n=>{this.active&&n.preventDefault()}),this.vp.controls.addEventListener("change",()=>this.active&&this.drawGrid())}get feature(){return this.app.sketchFeature()}get P(){return this.app.params()}enter(e){this.active=!0,this.plane=e;let t=new C(...e.xDir),n=new C(...e.normal),i=new C().crossVectors(n,t);this.m=new et().makeBasis(t,i,n).setPosition(...e.origin),this.mInv=this.m.clone().invert(),this.group.matrixAutoUpdate=!1,this.group.matrix.copy(this.m),this.group.matrixWorldNeedsUpdate=!0,this.three=new Nt().setFromNormalAndCoplanarPoint(n,new C(...e.origin)),this.vp.controls.enableRotate=!1,this.vp.controls.mouseButtons={LEFT:null,MIDDLE:Ot.PAN,RIGHT:Ot.PAN},this.vp.grid.visible=!1,this.lookAt(),this.setTool("line"),this.redraw()}lookAt(){let e=new C(...this.plane.normal),t=new C().crossVectors(e,new C(...this.plane.xDir)),n=[];for(let l of this.evals||[])if(l.g)for(let c of l.g.segs)n.push(c.a,c.b);let i=0,r=0,o=100;if(n.length){let l=n.map(h=>h[0]),c=n.map(h=>h[1]);i=(Math.min(...l)+Math.max(...l))/2,r=(Math.min(...c)+Math.max(...c))/2,o=Math.max(20,(Math.max(...l)-Math.min(...l))*1.4,(Math.max(...c)-Math.min(...c))*1.4)}let a=new C(i,r,0).applyMatrix4(this.m);this.vp.viewHeight=o,this.vp.camera.zoom=1,this.vp.updateFrustum(),this.vp.lookAlong(e,t,a)}exit(){this.active=!1,this.temp=[],this.sel.clear();for(let e of[...this.group.children])this.group.remove(e),e.geometry&&e.geometry.dispose();this.labelsEl.innerHTML="",this.labels=[],this.vp.controls.enableRotate=!0,this.vp.controls.mouseButtons={LEFT:null,MIDDLE:Ot.PAN,RIGHT:Ot.ROTATE},this.vp.grid.visible=!0,this.vp.render()}setTool(e){this.tool=e,this.temp=[],this.app.ui.sketchToolChanged(e),this.app.status(Ju[e]||""),this.redraw()}entities(){return this.feature.entities}local(e){let t=this.vp.ray(e),n=new C;return t.ray.intersectPlane(this.three,n)?(n.applyMatrix4(this.mInv),[n.x,n.y]):null}gridStep(){let e=this.vp.pixelSize(),t=this.app.units()==="in"?[.0625,.125,.25,.5,1,2,5,10,20]:[.1,.2,.5,1,2,5,10,20,50,100,200,500];for(let n of t)if(n/e>=14)return n;return t[t.length-1]*2}snapPoints(){let e=[{p:[0,0],kind:"origin"}];for(let t of this.evals||[]){if(!t.g)continue;let n=t.e;if(n.type==="line"){let i=t.g.segs[0];e.push({p:i.a,kind:"end",ref:{e:n.id,k:"p1"}},{p:i.b,kind:"end",ref:{e:n.id,k:"p2"}},{p:[(i.a[0]+i.b[0])/2,(i.a[1]+i.b[1])/2],kind:"mid",mid:n.id})}else if(n.type==="arc")e.push({p:[Re(n.x1,this.P),Re(n.y1,this.P)],kind:"end",ref:{e:n.id,k:"p1"}},{p:[Re(n.x2,this.P),Re(n.y2,this.P)],kind:"end",ref:{e:n.id,k:"p2"}},{p:t.g.center,kind:"center",ref:{e:n.id,k:"c"}});else if(n.type==="circle")e.push({p:t.g.circle.c,kind:"center",ref:{e:n.id,k:"c"}});else if(n.type==="rect"||n.type==="polygon"){for(let i of t.g.segs)e.push({p:i.a,kind:"end"},{p:[(i.a[0]+i.b[0])/2,(i.a[1]+i.b[1])/2],kind:"mid"});n.type==="polygon"&&e.push({p:[Re(n.cx,this.P),Re(n.cy,this.P)],kind:"center"})}else n.type==="slot"&&e.push({p:[Re(n.x1,this.P),Re(n.y1,this.P)],kind:"center"},{p:[Re(n.x2,this.P),Re(n.y2,this.P)],kind:"center"})}return e}snap(e,t,n){let i=this.vp.pixelSize(),r=null,o=10*i;for(let c of this.snapPoints()){let h=Math.hypot(c.p[0]-e[0],c.p[1]-e[1]);(h<o-1e-9||r&&Math.abs(h-o)<1e-9&&c.ref&&!r.ref)&&(o=h,r=c)}if(r)return{p:[...r.p],kind:r.kind,ref:r.ref,mid:r.mid};let a=[...e],l=null;if(this.gridOn&&!(n&&n.altKey)){let c=this.gridStep()/(this.app.units()==="in"?1:2);a=[Math.round(a[0]/c)*c,Math.round(a[1]/c)*c]}if(t){let c=a[0]-t[0],h=a[1]-t[1],u=Math.abs(Math.atan2(h,c)*180/Math.PI);Math.abs(h)<1e-9||u<4||u>176?(a[1]=t[1],l="horizontal"):Math.abs(u-90)<4&&(a[0]=t[0],l="vertical")}return{p:[Mc(a[0]),Mc(a[1])],kind:l}}distToSeg(e,t){if(t.type==="line"){let[r,o]=t.a,[a,l]=t.b,c=a-r,h=l-o,u=c*c+h*h||1,d=Math.max(0,Math.min(1,((e[0]-r)*c+(e[1]-o)*h)/u));return Math.hypot(e[0]-r-d*c,e[1]-o-d*h)}let n=Math.abs(Math.hypot(e[0]-t.c[0],e[1]-t.c[1])-t.r),i=Math.atan2(e[1]-t.c[1],e[0]-t.c[0])*180/Math.PI;return li(t.a1,i)<=li(t.a1,t.a2)+1e-6?n:Math.min(Math.hypot(e[0]-t.a[0],e[1]-t.a[1]),Math.hypot(e[0]-t.b[0],e[1]-t.b[1]))}entityAt(e){let t=8*this.vp.pixelSize(),n=null,i=t;for(let r of this.evals||[])if(r.g)for(let o of r.g.segs){let a=this.distToSeg(e,o);a<i&&(i=a,n=r.e)}return n}handles(e){let t=this.P,n=(i,r)=>({e,kx:i,ky:r,p:[Re(e[i],t),Re(e[r],t)]});switch(e.type){case"line":return[n("x1","y1"),n("x2","y2")];case"arc":return[n("x1","y1"),n("x2","y2"),n("xm","ym")];case"circle":case"polygon":return[n("cx","cy")];case"slot":return[n("x1","y1"),n("x2","y2")];case"rect":return[n("x","y")]}return[]}handleAt(e){let t=8*this.vp.pixelSize(),n=null,i=t;for(let r of this.entities())for(let o of this.handles(r)){let a=Math.hypot(o.p[0]-e[0],o.p[1]-e[1]);a<i&&(i=a,n=o)}return n}coincident(e,t){let n=[];for(let i of this.entities())for(let r of this.handles(i))t&&r.e===t.e&&r.kx===t.kx||i.type==="circle"||i.type==="polygon"||i.type==="rect"||r.kx==="xm"||Math.hypot(r.p[0]-e[0],r.p[1]-e[1])<1e-4&&n.push(r);return n}onMove(e){let t=this.local(e);if(!t)return;if(this.drag){let o=this.snap(t,null,e).p;for(let a of this.drag.handles)a.e[a.kx]=wt(o[0]+a.off[0]),a.e[a.ky]=wt(o[1]+a.off[1]);if(this.constraints.length){let a=this.drag.handles[0],l=a.kx==="x1"?"p1":a.kx==="x2"?"p2":a.kx==="xm"?"pm":"c";l!=="pm"&&a.e.type!=="rect"&&this.solveNow([{id:a.e.id,k:l,to:[o[0]+a.off[0],o[1]+a.off[1]]}]),this.solveNow()}this.drag.moved=!0,this.recompute(),this.redraw();return}let n=this.temp.length?this.temp[this.temp.length-1]:null,i=this.snap(t,this.tool==="line"||this.tool==="slot"?n:null,e);if(this.cursor=i,this.tool==="select"){let r=this.handleAt(t);this.hover=r?{handle:r}:null;let o=r?null:this.entityAt(t);o&&(this.hover={entity:o}),this.vp.renderer.domElement.style.cursor=r?"move":o?"pointer":"default"}else this.vp.renderer.domElement.style.cursor="crosshair";this.redraw()}onDown(e){if(e.button===2){this._rightDown=[e.clientX,e.clientY];return}if(e.button!==0)return;let t=this.local(e);if(!t)return;if(this.tool==="select"){let i=this.handleAt(t);if(i){let o=[i,...this.coincident(i.p,i)];if((i.e.type==="rect"||i.e.type==="circle"||i.e.type==="polygon")&&(o.length=1),this.drag={handles:o.map(a=>({...a,off:[0,0]})),moved:!1},i.e.type==="slot"){let a=this.handles(i.e).find(l=>l.kx!==i.kx);e.shiftKey&&this.drag.handles.push({...a,off:[a.p[0]-i.p[0],a.p[1]-i.p[1]]})}this.app.beginChange();return}let r=this.entityAt(t);e.shiftKey||(this.sel.clear(),this.selCons.clear()),r&&(this.sel.has(r.id)&&e.shiftKey?this.sel.delete(r.id):this.sel.add(r.id)),this.app.ui.sketchSelection(),this.redraw();return}if(this.tool.startsWith("c:")){this.consPick(t);return}let n=this.snap(t,this.temp.length?this.temp[this.temp.length-1]:null,e);this.lastSnap=n,this.click(n.p)}get constraints(){let e=this.feature;return e.constraints||(e.constraints=[])}pointRefAt(e){let t=10*this.vp.pixelSize(),n=null,i=t;for(let r of this.evals||[])if(!(!r.g||r.e.type==="rect"))for(let o of qu(r.e.type)){let a={};for(let h of Object.keys(r.e))a[h]=Re(r.e[h],this.P);let l=Sr(r.e.type,a,o);if(!l)continue;let c=Math.hypot(l[0]-e[0],l[1]-e[1]);c<i&&(i=c,n={e:r.e.id,k:o,p:l})}return n}consPick(e){let t=this.tool.slice(2),n=zt[t].need,i=this.entityAt(e),r=this.pointRefAt(e),o=g=>{let p=this.entities().find(w=>w.id===g);return p&&p.type},a=g=>g==="circle"||g==="arc",l=this.picks,c=null;if(n==="points"||n==="point"||n==="pointLine"&&!l.length||(t==="horizontal"||t==="vertical")&&r&&(!i||l.length)){if(!r)return this.app.toast("Click on a point (an end or a center).","error");c={e:r.e,k:r.k}}else{if(!i)return this.app.toast(zt[t].help,"error");if(i.type==="rect")return this.app.toast("Rectangles stay square already. Draw it with lines to give it rules.","error");c={e:i.id}}l.push(c);let u=o(l[0].e),d=l[1]&&o(l[1].e),f=!1,m=null;switch(n){case"point":f=!0;break;case"points":f=l.length===2;break;case"line":l[0].k?f=l.length===2:(f=!0,u!=="line"&&(m="Pick a line."));break;case"2lines":o(c.e)!=="line"&&(m="Pick lines."),f=l.length===2;break;case"2same":f=l.length===2,f&&!(u===d||a(u)&&a(d))&&(m="Pick two lines, or two circles/arcs."),f&&!(u==="line"||a(u))&&(m="Pick two lines, or two circles/arcs.");break;case"2round":a(o(c.e))||(m="Pick circles or arcs."),f=l.length===2;break;case"tangent":f=l.length===2,f&&!(u==="line"&&a(d)||a(u)&&d==="line"||a(u)&&a(d))&&(m="Pick a line and a circle/arc, or two circles/arcs.");break;case"pointLine":f=l.length===2,f&&d!=="line"&&(m="Then pick a line.");break}if(m)return this.picks=[],this.redraw(),this.app.toast(m,"error");if(f&&l.length===2&&l[0].e===l[1].e&&!l[0].k)return this.picks=[],this.app.toast("Pick two different items.","error");if(!f){this.redraw();return}let y={id:this.app.newId("k"),type:t,refs:l.map(g=>({...g}))};if(t==="fix"&&(y.at=r.p.map(Mc)),t==="tangent"&&a(u)&&a(d)){let g=k=>this.evals.find(S=>S.e.id===k).g,p=g(l[0].e),w=g(l[1].e),M=p.center||p.circle.c,x=w.center||w.circle.c,T=p.radius||p.circle.r,A=w.radius||w.circle.r,R=Math.hypot(M[0]-x[0],M[1]-x[1]);y.inside=Math.abs(R-Math.abs(T-A))<Math.abs(R-(T+A))}this.picks=[],this.addConstraint(y)}addConstraint(e,t){let n=this.app.snapshot();this.constraints.push(e);let i=ws(this.entities(),this.constraints,this.P);return!i.ok&&i.bad.includes(e.id)?(this.constraints.pop(),t||this.app.toast(`${zt[e.type].label} would fight the other rules (or a size typed as a formula), so it was not added.`,"error"),this.redraw(),!1):(this.writeBack(i.entities),t||(this.app.undoStack.push(n),this.app.redoStack=[]),this.app.changed(),this.redraw(),!0)}writeBack(e){let t=this.feature,n=new Map(e.map(i=>[i.id,i]));for(let i of t.entities){let r=n.get(i.id);if(r&&r!==i)for(let o of Object.keys(r))typeof i[o]=="number"&&(i[o]=r[o])}}solveNow(e){if(!this.constraints.length)return!0;let t=ws(this.entities(),this.constraints,this.P,{pull:e});return this.writeBack(t.entities),this.badCons=new Set(t.bad),t.ok}deleteConstraints(e){this.app.change(()=>{let t=this.feature;t.constraints=(t.constraints||[]).filter(n=>!e.has(n.id))}),this.selCons.clear(),this.recompute(),this.redraw(),this.app.ui.sketchSelection()}consFor(e){return this.constraints.filter(t=>t.refs.some(n=>n.e===e))}consLabel(e){let t=zt[e.type];return t.dim?`${t.label} = ${e.value}`:t.label}autoFor(e,t,n,i){if(!this.autoCons)return;let r=o=>this.addConstraint({id:this.app.newId("k"),...o},!0);if(i?r({type:"coincident",refs:[{e:i,k:"p2"},{e:e.id,k:"p1"}]}):t&&t.ref&&t.ref.e!==e.id&&r({type:"coincident",refs:[{...t.ref},{e:e.id,k:e.type==="circle"||e.type==="polygon"?"c":"p1"}]}),n&&n.ref&&n.ref.e!==e.id&&e.type!=="circle"&&r({type:"coincident",refs:[{...n.ref},{e:e.id,k:"p2"}]}),e.type==="line"){let o=Math.abs(Re(e.x2,this.P)-Re(e.x1,this.P)),a=Math.abs(Re(e.y2,this.P)-Re(e.y1,this.P));a<1e-9&&o>1e-9?r({type:"horizontal",refs:[{e:e.id}]}):o<1e-9&&a>1e-9&&r({type:"vertical",refs:[{e:e.id}]})}}onUp(e){if(e.button===2&&this._rightDown){let t=Math.hypot(e.clientX-this._rightDown[0],e.clientY-this._rightDown[1]);this._rightDown=null,t<4&&this.cancelTemp();return}if(this.drag){let t=this.drag.moved;this.drag=null,t?this.app.endChange():this.app.abortChange(),this.redraw()}}cancelTemp(){if(this.chainPrev=null,this.picks.length){this.picks=[],this.redraw();return}this.temp.length?(this.temp=[],this.redraw()):this.tool!=="select"&&this.setTool("select")}add(e){e.id=this.app.newId("e"),this.app.change(()=>this.entities().push(e)),this.recompute();let t=this.tempSnaps||[];return e.type==="line"?this.autoFor(e,t[t.length-2],t[t.length-1],this.chainPrev):e.type==="arc"?this.autoFor(e,t[0],t[1]):(e.type==="circle"||e.type==="polygon")&&this.autoFor(e,t[0],null),this.recompute(),e}click(e){let t=this.temp;switch(t.length||(this.tempSnaps=[]),this.tempSnaps=this.tempSnaps||[],this.tempSnaps.push(this.lastSnap||null),this.tool){case"line":if(t.length&&Math.hypot(e[0]-t[t.length-1][0],e[1]-t[t.length-1][1])<1e-6){this.tempSnaps.pop();return}if(t.length||(this.chainPrev=null),t.push(e),t.length>=2){let n=t[t.length-2],i=this.add({type:"line",x1:n[0],y1:n[1],x2:e[0],y2:e[1]});this.chainPrev=i.id,t.length>2&&Math.hypot(e[0]-t[0][0],e[1]-t[0][1])<1e-6?(this.temp=[],this.chainPrev=null):(this.temp=[e],this.tempSnaps=[this.tempSnaps[this.tempSnaps.length-1]])}break;case"rect":if(t.push(e),t.length===2){let[n,i]=t;Math.abs(n[0]-i[0])>1e-6&&Math.abs(n[1]-i[1])>1e-6&&this.add({type:"rect",x:wt(Math.min(n[0],i[0])),y:wt(Math.min(n[1],i[1])),w:wt(Math.abs(i[0]-n[0])),h:wt(Math.abs(i[1]-n[1]))}),this.temp=[]}break;case"circle":if(t.push(e),t.length===2){let n=wt(Math.hypot(t[1][0]-t[0][0],t[1][1]-t[0][1]));n>0&&this.add({type:"circle",cx:t[0][0],cy:t[0][1],r:n}),this.temp=[]}break;case"polygon":if(t.push(e),t.length===2){let n=wt(Math.hypot(t[1][0]-t[0][0],t[1][1]-t[0][1])),i=wt(Math.atan2(t[1][1]-t[0][1],t[1][0]-t[0][0])*180/Math.PI);n>0&&this.add({type:"polygon",cx:t[0][0],cy:t[0][1],r:n,n:this.polySides,rot:i}),this.temp=[]}break;case"arc":if(t.push(e),t.length===3){let[n,i,r]=t;ai(n,i,r)&&this.add({type:"arc",x1:n[0],y1:n[1],x2:i[0],y2:i[1],xm:wt(r[0]),ym:wt(r[1])}),this.temp=[]}break;case"slot":if(t.push(e),t.length===3){let[n,i,r]=t,o=wt(2*this.distToSeg(r,{type:"line",a:n,b:i}));o>0&&Math.hypot(i[0]-n[0],i[1]-n[1])>1e-6&&this.add({type:"slot",x1:n[0],y1:n[1],x2:i[0],y2:i[1],w:o}),this.temp=[]}break}this.redraw()}deleteSelected(){if(this.selCons.size)return this.deleteConstraints(new Set(this.selCons)),!0;if(!this.sel.size)return!1;let e=this.sel;return this.app.change(()=>{let t=this.feature;t.entities=t.entities.filter(n=>!e.has(n.id)),t.constraints=(t.constraints||[]).filter(n=>!n.refs.some(i=>e.has(i.e)))}),this.sel=new Set,this.recompute(),this.app.ui.sketchSelection(),this.redraw(),!0}toggleConstruction(){this.sel.size&&(this.app.change(()=>{for(let e of this.entities())this.sel.has(e.id)&&(e.construction=!e.construction)}),this.recompute(),this.redraw())}recompute(){this.solveNow(),this.evals=wr(this.entities(),this.P);let{loops:e,openEnds:t}=Ua(this.evals);this.loops=e,this.openEnds=t}clearGroup(){for(let e of[...this.group.children])this.group.remove(e),e.geometry&&e.geometry.dispose()}segPoints(e){if(e.type==="line")return[e.a,e.b];let t=li(e.a1,e.a2),n=Math.max(8,Math.ceil(t/4)),i=[];for(let r=0;r<=n;r++)i.push(Ni(e.c,e.r,e.a1+t*r/n));return i}line(e,t,n,i=3){let r=new Ze().setFromPoints(e.map(c=>new C(c[0],c[1],.02))),o=this.vp.pixelSize(),a=n?new Ei({color:t,dashSize:6*o,gapSize:4*o,depthTest:!1,transparent:!0}):new Pt({color:t,depthTest:!1,transparent:!0}),l=new rn(r,a);return n&&l.computeLineDistances(),l.renderOrder=i,this.group.add(l),l}dots(e,t,n=7){if(!e.length)return;let i=new Ze().setFromPoints(e.map(o=>new C(o[0],o[1],.03))),r=new Js(i,new hs({color:t,size:n,sizeAttenuation:!1,depthTest:!1,transparent:!0}));r.renderOrder=6,this.group.add(r)}drawGrid(){if(this.gridObj&&(this.group.remove(this.gridObj),this.gridObj.geometry.dispose(),this.gridObj=null),!this.gridOn){this.vp.render();return}let e=this.gridStep(),t=this.vp.camera,n=this.vp.controls.target.clone().applyMatrix4(this.mInv),i=(t.right-t.left)/2/t.zoom,r=(t.top-t.bottom)/2/t.zoom,o=Math.floor((n.x-i)/e)*e,a=Math.ceil((n.x+i)/e)*e,l=Math.floor((n.y-r)/e)*e,c=Math.ceil((n.y+r)/e)*e,h=[],u=[],d=new Ue(14936302),f=new Ue(12963801),m=new Ue(15029067),y=new Ue(3781227),g=(M,x,T)=>{h.push(M[0],M[1],-.01,x[0],x[1],-.01),u.push(T.r,T.g,T.b,T.r,T.g,T.b)},p=0;for(let M=o;M<=a&&p<600;M+=e,p++){let x=Math.round(M/e);g([M,l],[M,c],Math.abs(M)<e/2?y:x%5===0?f:d)}for(let M=l;M<=c&&p<1200;M+=e,p++){let x=Math.round(M/e);g([o,M],[a,M],Math.abs(M)<e/2?m:x%5===0?f:d)}let w=new Ze;w.setAttribute("position",new dt(h,3)),w.setAttribute("color",new dt(u,3)),this.gridObj=new wn(w,new Pt({vertexColors:!0,depthTest:!1,transparent:!0,opacity:.9})),this.gridObj.renderOrder=1,this.group.add(this.gridObj),this.app.ui.setGridStep(e),this.vp.render()}redraw(){if(!this.active)return;this.evals||this.recompute(),this.clearGroup(),this.gridObj=null,this.drawGrid();for(let o of this.loops||[]){if(o.depth%2)continue;let a=new ds(o.poly.map(c=>new oe(c[0],c[1])));for(let c of this.loops){if(c.depth!==o.depth+1)continue;let h=c.segs[0],u=h.type==="line"?[(h.a[0]+h.b[0])/2,(h.a[1]+h.b[1])/2]:h.m;Uy(u,o.poly)&&a.holes.push(new Mi(c.poly.map(d=>new oe(d[0],d[1]))))}let l=new ct(new ar(a),new Ft({color:$t.fill,transparent:!0,opacity:.18,side:xt,depthTest:!1,depthWrite:!1}));l.renderOrder=2,this.group.add(l)}let e=[];for(let o of this.evals){if(!o.g)continue;let a=o.e,l=this.hover&&(this.hover.entity===a||this.hover.handle&&this.hover.handle.e===a),c=this.sel.has(a.id)?$t.sel:l?$t.hover:a.construction?$t.cons:$t.line;for(let h of o.g.segs)this.line(this.segPoints(h),c,!!a.construction);(a.type==="line"||a.type==="arc")&&!a.construction&&e.push(o.g.segs[0].a,o.g.segs[0].b),(a.type==="circle"||a.type==="arc")&&this.dots([o.g.center||o.g.circle.c],c,5),a.type==="polygon"&&this.dots([[Re(a.cx,this.P),Re(a.cy,this.P)]],c,5)}let t=[],n=[];for(let o of e)(e.filter(l=>Math.abs(l[0]-o[0])<1e-4&&Math.abs(l[1]-o[1])<1e-4).length>=2?n:t).push(o);this.dots(n,$t.pt,6),this.dots(t,$t.open,9);let i=this.cursor&&this.cursor.p,r=this.temp;if(i&&r.length){let o=r[0];switch(this.tool){case"line":this.line([r[r.length-1],i],$t.preview,!1,4);break;case"rect":this.line([o,[i[0],o[1]],i,[o[0],i[1]],o],$t.preview,!1,4);break;case"circle":case"polygon":{let a=Math.hypot(i[0]-o[0],i[1]-o[1]),l=this.tool==="circle"?64:this.polySides,c=Math.atan2(i[1]-o[1],i[0]-o[0]),h=[];for(let u=0;u<=l;u++)h.push([o[0]+a*Math.cos(c+u*2*Math.PI/l),o[1]+a*Math.sin(c+u*2*Math.PI/l)]);this.line(h,$t.preview,!1,4);break}case"arc":if(r.length===1)this.line([o,i],$t.preview,!0,4);else{let a=ai(r[0],r[1],i);a&&this.line(this.segPoints(a.seg),$t.preview,!1,4)}break;case"slot":if(r.length===1)this.line([o,i],$t.preview,!0,4);else{let a=2*this.distToSeg(i,{type:"line",a:r[0],b:r[1]});try{let l=wr([{id:"tmp",type:"slot",x1:r[0][0],y1:r[0][1],x2:r[1][0],y2:r[1][1],w:a}],{})[0];if(l.g)for(let c of l.g.segs)this.line(this.segPoints(c),$t.preview,!1,4)}catch{}}break}}i&&this.tool!=="select"&&this.dots([i],this.cursor.kind&&this.cursor.kind!=="horizontal"&&this.cursor.kind!=="vertical"?16747546:$t.preview,this.cursor.kind?10:6),this.buildLabels(),this.app.ui.sketchInfo(this),this.vp.render()}buildLabels(){let e=this.P,t=[];for(let i of this.evals){if(!i.g)continue;let r=i.e,o=(a,l,c,h=[0,0])=>t.push({pos:a,text:l,edit:c,e:r,off:h});switch(r.type){case"line":{let a=i.g.segs[0],l=Math.hypot(a.b[0]-a.a[0],a.b[1]-a.a[1]),c=-(a.b[1]-a.a[1])/(l||1),h=(a.b[0]-a.a[0])/(l||1),u=this.constraints.find(d=>d.type==="length"&&d.refs[0].e===r.id);o([(a.a[0]+a.b[0])/2,(a.a[1]+a.b[1])/2],u?As(u.value,l):Se(l),"length",[c*14,h*14]),u&&(t[t.length-1].driving=u);break}case"rect":{let a=Re(r.x,e),l=Re(r.y,e),c=Re(r.w,e),h=Re(r.h,e),u=Math.min(a,a+c),d=Math.min(l,l+h);o([u+Math.abs(c)/2,d],As(r.w,c),"w",[0,-14]),o([u,d+Math.abs(h)/2],As(r.h,h),"h",[-18,0]);break}case"circle":{let{c:a,r:l}=i.g.circle;o([a[0]+l*.707,a[1]+l*.707],"\xD8"+Se(2*l),"diameter",[12,12]);break}case"arc":{let a=i.g.segs[0],l=this.constraints.find(c=>c.type==="radius"&&c.refs[0].e===r.id);o(a.m,"R"+(l?As(l.value,a.r):Se(a.r)),"radius",[12,10]),l&&(t[t.length-1].driving=l);break}case"polygon":{o([Re(r.cx,e),Re(r.cy,e)-Re(r.r,e)],"R"+As(r.r,Re(r.r,e)),"r",[0,-14]);break}case"slot":{let a=[Re(r.x1,e),Re(r.y1,e)],l=[Re(r.x2,e),Re(r.y2,e)];o([(a[0]+l[0])/2,(a[1]+l[1])/2],Se(Math.hypot(l[0]-a[0],l[1]-a[1])),"slotlen",[0,12]),o(l,"W"+As(r.w,Re(r.w,e)),"w",[0,-16]);break}}}if(this.showCons){let i=new Map;for(let r of this.constraints){if(zt[r.type].dim||r.type==="coincident")continue;let o=r.refs[0],a=this.evals.find(h=>h.e.id===o.e);if(!a||!a.g)continue;let l;if(o.k){let h={};for(let u of Object.keys(a.e))h[u]=Re(a.e[u],this.P);l=Sr(a.e.type,h,o.k)}else if(a.g.segs[0]){let h=a.g.segs[0];l=h.type==="line"?[h.a[0]*.65+h.b[0]*.35,h.a[1]*.65+h.b[1]*.35]:h.m}if(!l)continue;let c=i.get(o.e)||0;if(i.set(o.e,c+1),t.push({pos:l,text:zt[r.type].glyph,glyph:r,e:a.e,off:[-14-c*18,14]}),r.refs[1]){let h=this.evals.find(u=>u.e.id===r.refs[1].e);if(h&&h.g&&h.g.segs[0]&&!r.refs[1].k){let u=h.g.segs[0],d=i.get(h.e.id)||0;i.set(h.e.id,d+1),t.push({pos:u.type==="line"?[u.a[0]*.65+u.b[0]*.35,u.a[1]*.65+u.b[1]*.35]:u.m,text:zt[r.type].glyph,glyph:r,e:h.e,off:[-14-d*18,14]})}}}}this.labels=t;let n=this.labelsEl;n.innerHTML="";for(let i of t){if(i.glyph){let a=document.createElement("button"),l=i.glyph;a.className="cglyph"+(this.selCons.has(l.id)?" sel":"")+(this.badCons&&this.badCons.has(l.id)?" bad":""),a.textContent=i.text,a.title=zt[l.type].label+" rule. Click to pick it, then Delete removes it.",a.addEventListener("pointerdown",c=>c.stopPropagation()),a.addEventListener("click",c=>{c.stopPropagation(),c.shiftKey||(this.selCons.clear(),this.sel.clear()),this.selCons.add(l.id),this.app.ui.sketchSelection(),this.redraw()}),i.el=a,n.appendChild(a);continue}let r=document.createElement("button"),o=i.driving||["w","h","r","diameter","slotlen"].includes(i.edit);r.className="dim"+(this.sel.has(i.e.id)?" sel":"")+(i.e.construction?" cons":"")+(o?" driving":" loose"),r.textContent=i.text,r.title=o?"This size is set. Click to type a new size.":"Measured size (can change). Click to set it.",r.addEventListener("pointerdown",a=>a.stopPropagation()),r.addEventListener("click",a=>{a.stopPropagation(),this.editLabel(i,r)}),i.el=r,n.appendChild(r)}this.placeLabels()}placeLabels(){for(let e of this.labels){if(!e.el)continue;let t=new C(e.pos[0],e.pos[1],0).applyMatrix4(this.m),[n,i]=this.vp.screenOf(t.toArray());e.el.style.left=n+e.off[0]+"px",e.el.style.top=i-e.off[1]+"px"}}editLabel(e,t){let n=e.e,i=this.P,r=e.text.replace(/^[ØRW]/,"");if((e.edit==="w"||e.edit==="h"||e.edit==="r")&&(r=String(n[e.edit])),e.driving&&(r=String(e.driving.value)),e.edit==="diameter"&&!Fa(n.r)){let c=String(n.r).match(/^\((.*)\)\/2$/);c&&(r=c[1])}let o=document.createElement("input");o.className="dim-input",o.value=r,t.replaceWith(o),o.style.left=t.style.left,o.style.top=t.style.top,o.focus(),o.select();let a=!1,l=c=>{if(a)return;a=!0;let h=o.value.trim();if(c&&h&&h!==r){let u;try{u=Kt(h,i)}catch(f){this.app.toast(f.message,"error"),this.buildLabels();return}if(u<=0){this.app.toast("Size must be more than 0","error"),this.buildLabels();return}let d=Fa(h)?wt(u):h;this.app.change(()=>this.applyDim(n,e.edit,d,u)),this.recompute()}this.redraw()};o.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"&&l(!0),c.key==="Escape"&&l(!1)}),o.addEventListener("blur",()=>l(!0))}applyDim(e,t,n,i){let r=this.P;if(t==="w"||t==="h"||t==="r"){e[t]=n;return}if(t==="diameter"){e.r=typeof n=="number"?wt(n/2):`(${n})/2`;return}if(t==="length"||t==="radius"){let o=t==="length"?"length":"radius",a=this.feature;a.constraints=(a.constraints||[]).filter(u=>!(u.type===o&&u.refs[0].e===e.id));let l={id:this.app.newId("k"),type:o,refs:[{e:e.id}],value:n};a.constraints.push(l);let c=o==="length"?[{id:e.id,k:"p1",to:[Re(e.x1,r),Re(e.y1,r)]}]:[],h=ws(a.entities,a.constraints,r,{pull:c});if(!h.ok&&h.bad.includes(l.id)){a.constraints.pop(),this.app.toast("That size fights the other rules, so it was not set.","error");return}this.writeBack(h.entities);return}if(t==="oldlength"){let o=[Re(e.x1,r),Re(e.y1,r)],a=[Re(e.x2,r),Re(e.y2,r)],l=Math.hypot(a[0]-o[0],a[1]-o[1])||1,c=(a[0]-o[0])/l,h=(a[1]-o[1])/l,u=[wt(o[0]+c*i),wt(o[1]+h*i)],d=this.coincident(a,{e,kx:"x2"});typeof n=="string"&&Math.abs(h)<1e-9?e.x2=`${Na(e.x1)} ${c>0?"+":"-"} ${Na(n)}`:typeof n=="string"&&Math.abs(c)<1e-9?e.y2=`${Na(e.y1)} ${h>0?"+":"-"} ${Na(n)}`:(e.x2=u[0],e.y2=u[1]),(typeof n!="string"||Math.abs(h)>=1e-9&&Math.abs(c)>=1e-9)&&(e.x2=u[0],e.y2=u[1]);for(let f of d)f.e[f.kx]=u[0],f.e[f.ky]=u[1];return}if(t==="oldradius"){let o=[Re(e.x1,r),Re(e.y1,r)],a=[Re(e.x2,r),Re(e.y2,r)],l=[Re(e.xm,r),Re(e.ym,r)],c=Math.hypot(a[0]-o[0],a[1]-o[1])/2;if(i<c-1e-9){this.app.toast(`Radius must be at least ${Se(c)} for these end points`,"error");return}let h=[(o[0]+a[0])/2,(o[1]+a[1])/2],u=-(a[1]-o[1])/(2*c),d=(a[0]-o[0])/(2*c),f=(l[0]-h[0])*u+(l[1]-h[1])*d>=0?1:-1,m=ai(o,a,l),g=m&&m.r>0&&Math.hypot(l[0]-h[0],l[1]-h[1])>m.r?i+Math.sqrt(Math.max(0,i*i-c*c)):i-Math.sqrt(Math.max(0,i*i-c*c));e.xm=wt(h[0]+f*u*g),e.ym=wt(h[1]+f*d*g);return}if(t==="slotlen"){let o=[Re(e.x1,r),Re(e.y1,r)],a=[Re(e.x2,r),Re(e.y2,r)],l=Math.hypot(a[0]-o[0],a[1]-o[1])||1;e.x2=wt(o[0]+(a[0]-o[0])/l*i),e.y2=wt(o[1]+(a[1]-o[1])/l*i)}}};function Na(s){return Fa(s)?String(s):`(${s})`}function As(s,e){return Fa(s)?Se(e):`${s} = ${Se(e)}`}function Uy(s,e){let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){let[r,o]=e[n],[a,l]=e[i];o>s[1]!=l>s[1]&&s[0]<(a-r)*(s[1]-o)/(l-o)+r&&(t=!t)}return t}var Ku={sketch:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M7 16l4-8 3 5 3-3"/>',extrude:'<path d="M4 15l8 4 8-4M4 15V9l8-4 8 4v6M12 19v-6M4 9l8 4 8-4"/><path d="M12 5V2M10 3.5l2-2 2 2"/>',revolve:'<ellipse cx="12" cy="7" rx="7" ry="2.5"/><path d="M5 7v10M19 7v10"/><ellipse cx="12" cy="17" rx="7" ry="2.5"/>',hole:'<ellipse cx="12" cy="7" rx="8" ry="3"/><ellipse cx="12" cy="7" rx="3" ry="1.2"/><path d="M4 7v9c0 1.7 3.6 3 8 3s8-1.3 8-3V7M9 7.5v6M15 7.5v6"/>',box:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8"/>',cylinder:'<ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/>',sphere:'<circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="8" ry="3"/>',fillet:'<path d="M4 20V10a6 6 0 0 1 6-6h10"/><path d="M4 4h4M4 4v4" opacity=".5"/>',chamfer:'<path d="M4 20V10l6-6h10"/><path d="M4 4h4M4 4v4" opacity=".5"/>',shell:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M7 9.5l5-2.5 5 2.5v5l-5 2.5-5-2.5z"/>',rectPattern:'<rect x="3" y="3" width="6" height="6"/><rect x="15" y="3" width="6" height="6"/><rect x="3" y="15" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/>',circPattern:'<circle cx="12" cy="12" r="8" stroke-dasharray="2 2"/><circle cx="12" cy="4" r="2"/><circle cx="19" cy="15" r="2"/><circle cx="5" cy="15" r="2"/>',mirror:'<path d="M12 3v18" stroke-dasharray="2 2"/><path d="M9 6L3 12l6 6zM15 6l6 6-6 6z"/>',mirrorBody:'<path d="M12 3v18" stroke-dasharray="2 2"/><path d="M10 5H4v14h6M14 5h6v14h-6"/>',params:'<path d="M9 4c-2 0-2 2-2 4v8c0 2 0 4-2 4M4 10h6M14 9l6 8M20 9l-6 8"/>',line:'<path d="M4 20L20 4"/><circle cx="4" cy="20" r="1.5"/><circle cx="20" cy="4" r="1.5"/>',rect:'<rect x="4" y="6" width="16" height="12"/>',circle:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="1"/>',arc:'<path d="M4 18a8 8 0 0 1 16 0"/><circle cx="4" cy="18" r="1.5"/><circle cx="20" cy="18" r="1.5"/><circle cx="12" cy="10" r="1.5"/>',polygon:'<path d="M12 3l8 5v8l-8 5-8-5V8z"/>',slot:'<rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="7" cy="12" r=".8"/><circle cx="17" cy="12" r=".8"/>',select:'<path d="M5 3l14 8-6 2-2 6z"/>',construction:'<path d="M4 20L20 4" stroke-dasharray="3 3"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',finish:'<path d="M5 12l5 5L20 7"/>',measure:'<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',home:'<path d="M3 11l9-7 9 7M5 9.5V20h14V9.5"/>',front:'<rect x="5" y="5" width="14" height="14"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">F</text>',top:'<rect x="5" y="5" width="14" height="14"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">T</text>',right:'<rect x="5" y="5" width="14" height="14"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">R</text>',fit:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/><rect x="9" y="9" width="6" height="6"/>',shaded:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z" fill="currentColor" opacity=".35"/><path d="M4 8l8-4 8 4v8l-8 4-8-4z"/>',edges:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8"/>',wire:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8M4 16l8-4 8 4M12 4v8" stroke-dasharray="2 1.5"/>',planes:'<path d="M3 9l9-5 9 5-9 5z"/><path d="M12 14v7M3 9v7l9 5 9-5V9" opacity=".5"/>',camera:'<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l2-3h4l2 3"/>',new:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M12 11v6M9 14h6"/>',open:'<path d="M3 6h7l2 2h9v11H3z"/>',save:'<path d="M5 3h12l3 3v15H4V3z"/><path d="M8 3v5h8V3M8 21v-7h8v7"/>',stl:'<path d="M12 3v12M7 10l5 5 5-5M4 19h16"/>',examples:'<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',redo:'<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 1-1 1.7M12 17v.5"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',eyeOff:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" opacity=".4"/><path d="M4 4l16 16"/>',warn:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',err:'<circle cx="12" cy="12" r="9"/><path d="M8 8l8 8M16 8l-8 8"/>',end:'<path d="M4 12h16"/><path d="M4 8v8M20 8v8"/>',part:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/>',origin:'<path d="M12 12h9M12 12V3M12 12l-7 7"/>',primitive:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8"/>',pattern:'<rect x="3" y="3" width="6" height="6"/><rect x="15" y="3" width="6" height="6"/><rect x="3" y="15" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/>',look:'<circle cx="12" cy="12" r="3"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',assembly:'<path d="M3 9l5-3 5 3v5l-5 3-5-3z"/><path d="M11 12l5-3 5 3v5l-5 3-5-3z"/>',mate:'<rect x="3" y="4" width="18" height="6"/><rect x="3" y="14" width="18" height="6"/><path d="M12 10v4M10 12h4" opacity=".6"/>',flush:'<rect x="3" y="4" width="8" height="16"/><rect x="13" y="8" width="8" height="12"/><path d="M2 20h20"/>',insert:'<rect x="4" y="12" width="16" height="8"/><path d="M10 12V4h4v8M8 4h8"/>',axisMate:'<path d="M12 2v20" stroke-dasharray="3 2"/><ellipse cx="12" cy="8" rx="6" ry="2"/><ellipse cx="12" cy="16" rx="6" ry="2"/>',angleMate:'<path d="M4 20h16M4 20L16 6"/><path d="M10 20a6 6 0 0 0-2-4.5"/>',pin:'<path d="M9 3h6l-1 6 3 3H7l3-3zM12 12v9"/>',bom:'<path d="M5 3h14v18H5z"/><path d="M8 7h8M8 11h8M8 15h5"/>',clash:'<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/><path d="M12 7.5v9" stroke-width="3" opacity=".5"/>',place:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M12 9v6M9 12h6"/>',back:'<path d="M10 6l-6 6 6 6M4 12h16"/>',move:'<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',drawing:'<path d="M3 4h18v16H3z"/><path d="M14 16h7M14 16v4M6 8h5v5H6z"/>',units:'<path d="M3 15l12-12 6 6-12 12z"/><path d="M7 11l2 2M10 8l2 2M13 5l2 2"/>',constraint:'<path d="M4 20L20 4"/><path d="M4 14h6v6" opacity=".6"/>',grid:'<path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/>'};function tt(s,e=22){return s.startsWith("g:")?`<svg class="ic" width="${e}" height="${e}" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/><text x="12" y="16.5" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor" font-family="Segoe UI, Arial, sans-serif">${s.slice(2)}</text></svg>`:`<svg class="ic" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${Ku[s]||Ku.part}</svg>`}var Cs=(s,e)=>({app:"Pathway CAD",version:1,name:s,material:"pla",color:"#8fb3c9",rollback:null,nextId:500,...e}),ci=[{title:"Mounting bracket",about:"An L-shaped bracket: sketch on the front plane, extrude both ways, round the inside corner, add bolt holes and a pattern. Sizes come from parameters.",doc:Cs("Bracket",{material:"aluminum",color:"#b9c3cc",params:[{name:"len",expr:60,note:"base length"},{name:"height",expr:50,note:"upright height"},{name:"thick",expr:5,note:"metal thickness"},{name:"width",expr:40,note:"bracket width"},{name:"bolt",expr:6,note:"bolt hole size"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XZ",offset:0,entities:[{id:"e1",type:"line",x1:0,y1:0,x2:"len",y2:0},{id:"e2",type:"line",x1:"len",y1:0,x2:"len",y2:"thick"},{id:"e3",type:"line",x1:"len",y1:"thick",x2:"thick",y2:"thick"},{id:"e4",type:"line",x1:"thick",y1:"thick",x2:"thick",y2:"height"},{id:"e5",type:"line",x1:"thick",y1:"height",x2:0,y2:"height"},{id:"e6",type:"line",x1:0,y1:"height",x2:0,y2:0}]},{id:"f2",type:"extrude",name:"Extrusion1",sketch:"f1",distance:"width",extent:"distance",direction:"both",op:"new",taper:0},{id:"f3",type:"fillet",name:"Fillet1",radius:4,allEdges:!1,edges:[[5,0,5]]},{id:"f4",type:"hole",name:"Hole1",origin:[40,-10,5],normal:[0,0,1],diameter:"bolt",extent:"through",depth:10,style:"counterbore",cbDiameter:"bolt*1.8",cbDepth:2},{id:"f5",type:"pattern",kind:"rect",name:"RectangularPattern1",features:["f4"],d1:"Y",n1:2,s1:20,d2:"X",n2:1,s2:10},{id:"f6",type:"hole",name:"Hole2",origin:[5,0,33],normal:[1,0,0],diameter:"bolt",extent:"through",depth:10,style:"simple",cbDiameter:10,cbDepth:3}]})},{title:"Wheel hub",about:"A lathe-style part: a profile drawn beside a construction axis is revolved, then bolt holes are copied around in a circle.",doc:Cs("Wheel hub",{color:"#e0a458",params:[{name:"bore",expr:10,note:"axle hole diameter"},{name:"dia",expr:80,note:"wheel diameter"},{name:"bolts",expr:5,note:"number of bolt holes"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XZ",offset:0,entities:[{id:"ax",type:"line",x1:0,y1:-5,x2:0,y2:30,construction:!0},{id:"r1",type:"rect",x:"bore/2",y:0,w:"dia/2 - bore/2",h:8},{id:"r2",type:"rect",x:"bore/2",y:0,w:8,h:25}]},{id:"f2",type:"revolve",name:"Revolution1",sketch:"f1",axis:"ax",angle:360,op:"new"},{id:"f3",type:"hole",name:"Hole1",origin:[27,0,8],normal:[0,0,1],diameter:6,extent:"through",depth:10,style:"simple",cbDiameter:10,cbDepth:3},{id:"f4",type:"pattern",kind:"circ",name:"CircularPattern1",features:["f3"],axis:"Z",n:"bolts",angle:360},{id:"f5",type:"chamfer",name:"Chamfer1",radius:1,allEdges:!0,edges:[],suppressed:!0}]})},{title:"Key tag",about:"A 3D-printable tag: a rectangle extruded 3 mm, rounded corners, a key-ring hole and a shallow slot cut into the top on an offset sketch plane.",doc:Cs("Key tag",{color:"#6cc3a0",params:[{name:"W",expr:50,note:"length"},{name:"H",expr:25,note:"height"},{name:"T",expr:3,note:"thickness"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XY",offset:0,entities:[{id:"e1",type:"rect",x:"-W/2",y:"-H/2",w:"W",h:"H"}]},{id:"f2",type:"extrude",name:"Extrusion1",sketch:"f1",distance:"T",extent:"distance",direction:"normal",op:"new",taper:0},{id:"f3",type:"fillet",name:"Fillet1",radius:5,allEdges:!1,edges:[[25,12.5,1.5],[-25,12.5,1.5],[25,-12.5,1.5],[-25,-12.5,1.5]]},{id:"f4",type:"hole",name:"Hole1",origin:[-18,0,3],normal:[0,0,1],diameter:5,extent:"through",depth:10,style:"simple",cbDiameter:9,cbDepth:3},{id:"f5",type:"sketch",name:"Sketch2",plane:"XY",offset:"T",entities:[{id:"s1",type:"slot",x1:-6,y1:0,x2:17,y2:0,w:10}]},{id:"f6",type:"extrude",name:"Extrusion2",sketch:"f5",distance:1,extent:"distance",direction:"reverse",op:"cut",taper:0}]})},{title:"Pencil cup",about:"A hexagon extruded into a tall prism, then hollowed with Shell (the top face is left open) and given a chamfered rim.",doc:Cs("Pencil cup",{color:"#8b9cf0",params:[{name:"size",expr:40,note:"corner radius of the hexagon"},{name:"tall",expr:95,note:"height"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XY",offset:0,entities:[{id:"p1",type:"polygon",cx:0,cy:0,r:"size",n:6,rot:0}]},{id:"f2",type:"extrude",name:"Extrusion1",sketch:"f1",distance:"tall",extent:"distance",direction:"normal",op:"new",taper:3},{id:"f3",type:"shell",name:"Shell1",thickness:2.5,faces:[[0,0,95]]}]})}],Ny=Cs("Pin",{material:"steel",color:"#9aa4ad",params:[{name:"shank",expr:5.8,note:"a little under the 6 mm hole so it slides in"}],features:[{id:"f1",type:"primitive",shape:"cylinder",name:"Head",diameter:10,h:3,axis:"Z",x:0,y:0,z:0,op:"new"},{id:"f2",type:"primitive",shape:"cylinder",name:"Shank",diameter:"shank",h:15,axis:"Z",x:0,y:0,z:-15,op:"join"},{id:"f3",type:"chamfer",name:"Chamfer1",radius:.6,allEdges:!1,edges:[[0,-2.9,-15]]}]}),Fy=Cs("Axle",{material:"steel",color:"#9aa4ad",params:[{name:"length",expr:100,note:"axle length"}],features:[{id:"f1",type:"primitive",shape:"cylinder",name:"Rod",diameter:9.8,h:"length",axis:"Z",x:0,y:0,z:0,op:"new"}]}),Sc=[{title:"Bracket and pin",about:"A pin is Inserted into the bracket's side hole: the round edge under its head goes onto the hole's rim. Drag the pin: it can only spin.",doc:{app:"Pathway CAD",kind:"assembly",version:1,name:"Bracket and pin",units:"mm",nextId:50,parts:{p1:JSON.parse(JSON.stringify(ci[0].doc)),p2:Ny},components:[{id:"c1",name:"Bracket:1",part:"p1",pos:[0,0,0],quat:[0,0,0,1],grounded:!0},{id:"c2",name:"Pin:1",part:"p2",pos:[30,45,20],quat:[0,0,0,1],grounded:!1}],constraints:[{id:"k1",name:"Insert1",type:"insert",offset:0,sign:1,a:{comp:"c1",kind:"axis",p:[5,0,33],n:[1,0,0],r:3,rim:!0,label:"round edge \xD86"},b:{comp:"c2",kind:"axis",p:[0,0,0],n:[0,0,1],r:5,rim:!0,label:"round edge \xD810"}}]}},{title:"Wheels on an axle",about:"Two copies of the wheel hub ride on an axle. Axis constraints line up the centers, and Flush sets how far along the axle each wheel sits. Edit one hub and both change.",doc:{app:"Pathway CAD",kind:"assembly",version:1,name:"Wheels on an axle",units:"mm",nextId:50,parts:{p1:Fy,p2:JSON.parse(JSON.stringify(ci[1].doc))},components:[{id:"c1",name:"Axle:1",part:"p1",pos:[0,0,0],quat:[0,0,0,1],grounded:!0},{id:"c2",name:"Wheel hub:1",part:"p2",pos:[70,0,0],quat:[0,0,0,1],grounded:!1},{id:"c3",name:"Wheel hub:2",part:"p2",pos:[-70,0,60],quat:[0,0,0,1],grounded:!1}],constraints:[{id:"k1",name:"Axis1",type:"axis",offset:0,sign:1,a:{comp:"c1",kind:"axis",p:[0,0,0],n:[0,0,1],r:4.9,label:"round face \xD89.8"},b:{comp:"c2",kind:"axis",p:[0,0,0],n:[0,0,1],r:5,rim:!0,label:"round edge \xD810"}},{id:"k2",name:"Flush1",type:"flush",offset:-8,a:{comp:"c1",kind:"plane",p:[0,0,0],n:[0,0,-1],label:"flat face"},b:{comp:"c2",kind:"plane",p:[0,0,0],n:[0,0,-1],label:"flat face"}},{id:"k3",name:"Axis2",type:"axis",offset:0,sign:-1,a:{comp:"c1",kind:"axis",p:[0,0,0],n:[0,0,1],r:4.9,label:"round face \xD89.8"},b:{comp:"c3",kind:"axis",p:[0,0,0],n:[0,0,1],r:5,rim:!0,label:"round edge \xD810"}},{id:"k4",name:"Flush2",type:"flush",offset:-8,a:{comp:"c1",kind:"plane",p:[0,0,100],n:[0,0,1],label:"flat face"},b:{comp:"c3",kind:"plane",p:[0,0,0],n:[0,0,-1],label:"flat face"}}]}}];var hn={mm:1,in:25.4},wc={mm:"Millimetres (mm)",in:"Inches (in)"};function Ht(s,e){if(e!=="in")return s;let t=s/25.4;for(let n of[.0625,.125,.25,.5,1])if(t<=n*1.5)return n;return Math.round(t)}var ju={sketch:["offset"],extrude:["distance"],hole:["diameter","depth","cbDiameter","cbDepth"],primitive:["w","d","h","diameter","x","y","z"],fillet:["radius"],chamfer:["radius"],shell:["thickness"],pattern:["s1","s2"]},Qu={line:["x1","y1","x2","y2"],arc:["x1","y1","x2","y2","xm","ym"],rect:["x","y","w","h"],circle:["cx","cy","r"],polygon:["cx","cy","r"],slot:["x1","y1","x2","y2","w"],point:["x","y"]},Oy=/[A-Za-z_][A-Za-z_0-9]*/g;function By(s){let e=[];for(let t of s.features){for(let n of ju[t.type]||[])t[n]!=null&&e.push(t[n]);if(t.type==="sketch")for(let n of t.entities||[])for(let i of Qu[n.type]||[])e.push(n[i])}return e}function ed(s){let e=new Set(s.params.map(i=>i.name)),t=new Set,n=i=>{for(let r of String(i).match(Oy)||[])e.has(r)&&!t.has(r)&&(t.add(r),n(s.params.find(o=>o.name===r).expr))};for(let i of By(s))typeof i=="string"&&n(i);return t}function td(s,e,t){let n=a=>Math.round(a*e*1e6)/1e6,i=0,r=(a,l)=>{typeof a[l]=="number"?a[l]=n(a[l]):typeof a[l]=="string"&&/\d/.test(a[l])&&!/^[A-Za-z_][\w]*$/.test(a[l].trim())&&i++},o=a=>a&&a.forEach((l,c)=>{c<3&&(a[c]=n(l))});for(let a of s.features){for(let l of ju[a.type]||[])a[l]!=null&&r(a,l);if(a.type==="sketch"){for(let l of a.entities||[])for(let c of Qu[l.type]||[])r(l,c);a.plane&&typeof a.plane=="object"&&(a.plane.origin=a.plane.origin.map(n)),o(a.faceRef)}a.type==="hole"&&(a.origin=a.origin&&a.origin.map(n),o(a.faceRef)),a.edges&&a.edges.forEach(o),a.faces&&a.faces.forEach(o)}for(let a of s.params)t.has(a.name)&&(typeof a.expr=="number"?a.expr=n(a.expr):i++);return i}function nd(s,e){let t=n=>Math.round(n*e*1e6)/1e6;for(let n of s.components)n.pos=n.pos.map(t);for(let n of s.constraints)n.type!=="angle"&&typeof n.offset=="number"&&(n.offset=t(n.offset))}var Ba=(s,e=document)=>e.querySelector(s),Dt=s=>String(s).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),id=s=>JSON.parse(JSON.stringify(s)),It=s=>Math.round(s*1e4)/1e4,bt=s=>new C(s[0],s[1],s[2]),za=s=>{try{return Kt(s,{})}catch{return 0}};var hi={mate:{label:"Mate",icon:"mate",help:"Puts two flat faces against each other, facing opposite ways (like a part sitting on a table).",want:"plane"},flush:{label:"Flush",icon:"flush",help:"Lines two flat faces up so they face the same way and are level with each other.",want:"plane"},insert:{label:"Insert",icon:"insert",help:"Puts a round edge into another round edge: same center line, and the two edge rims level. Use it for pins, bolts and shafts in holes.",want:"circle"},axis:{label:"Axis",icon:"axisMate",help:"Lines up two center lines (round edges or round faces). The parts can still slide and spin along it, like a wheel on an axle.",want:"axis"},angle:{label:"Angle",icon:"angleMate",help:"Sets the angle between two flat faces (0\xB0 = facing the same way), like a hinge opened to 90\xB0.",want:"plane"}};function Ha(){return{app:"Pathway CAD",kind:"assembly",version:1,name:"Assembly1",units:"mm",parts:{},components:[],constraints:[],nextId:1}}var Er=class{constructor(e){this.app=e,this.vp=e.vp,this.group=new Wt,this.group.visible=!1,this.vp.scene.add(this.group),this.geo=new Map,this.objs=new Map,this.sel=null,this.hover=null,this.bad={},this.clashes=[]}get asm(){return this.app.asm}scaleOf(e){let t=this.asm.parts[e];return(hn[t&&t.units||"mm"]||1)/(hn[this.asm.units||"mm"]||1)}comp(e){return this.asm.components.find(t=>t.id===e)}partName(e){let t=this.asm.parts[e];return t&&t.name||"Part"}show(e){this.group.visible=e,e&&this.vp.setPart(null),this.vp.render()}partKey(e){return JSON.stringify([e.features,e.params,e.rollback??null,e.units||"mm"])}async rebuild(){if(!this.app.ready||!this.asm)return;let e=this.app.cmd&&this.app.cmd.noPreviewBuild,t={};for(let[n,i]of Object.entries(this.asm.parts)){let r=this.geo.get(n);(!r||r.key!==this.partKey(i))&&(t[n]=i)}for(let n of[...this.geo.keys()])this.asm.parts[n]||this.disposeGeo(n);if(Object.keys(t).length){let n=this._t=(this._t||0)+1;this.app.ui.busy(!0);let i=await this.app.send({type:"parts",parts:t});if(n!==this._t)return;if(this.app.ui.busy(!1),i.type==="error"){this.app.toast("Could not build the parts: "+i.msg,"error");return}for(let[r,o]of Object.entries(i.descs)){this.disposeGeo(r);let a={key:this.partKey(this.asm.parts[r]||t[r]),desc:o,errors:i.errors[r]||{}};if(o){a.geo=new Ze,a.geo.setAttribute("position",new lt(o.vertices,3)),a.geo.setAttribute("normal",new lt(o.normals,3)),a.geo.setIndex(new lt(o.triangles,1)),a.geo.computeBoundingSphere(),a.edgeGeo=new Ze,a.edgeGeo.setAttribute("position",new lt(o.lines,3));let l=[];for(let[c,h]of o.edgeGroups)for(let u=c;u<c+h-1;u++)l.push(u,u+1);a.edgeGeo.setIndex(l),a.edgeGeo.computeBoundingSphere()}this.geo.set(r,a),this.refreshRefs(r)}for(let r of this.objs.keys())this.dropObj(r)}e||this.solve(),this.render(),this.app.ui.renderTree(),this.app.ui.renderStatusInfo(),!this._fitted&&this.asm.components.length&&(this._fitted=!0,this.fit())}disposeGeo(e){let t=this.geo.get(e);t&&(t.geo&&t.geo.dispose(),t.edgeGeo&&t.edgeGeo.dispose(),this.geo.delete(e))}dropObj(e){let t=this.objs.get(e);t&&(this.group.remove(t.mesh),this.group.remove(t.edges),t.mat.dispose(),this.objs.delete(e))}matrixOf(e){let t=this.scaleOf(e.part);return new et().compose(bt(e.pos),new _t(...e.quat),new C(t,t,t))}render(){if(!this.asm)return;let e=new Set(this.asm.components.map(t=>t.id));for(let t of[...this.objs.keys()])e.has(t)||this.dropObj(t);for(let t of this.asm.components){let n=this.geo.get(t.part);if(!n||!n.geo){this.dropObj(t.id);continue}let i=this.objs.get(t.id);if(!i){let l=new wi({metalness:.15,roughness:.55,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1,side:xt}),c=new ct(n.geo,l),h=new wn(n.edgeGeo,this.vp.edgeMat);c.matrixAutoUpdate=!1,h.matrixAutoUpdate=!1,c.userData.comp=t.id,h.userData.comp=t.id,this.group.add(c),this.group.add(h),i={mesh:c,edges:h,mat:l},this.objs.set(t.id,i)}let r=this.asm.parts[t.part];i.mat.color.set(t.color||r&&r.color||"#8fb3c9"),i.mat.emissive.set(this.sel===t.id?1798010:this.hover&&this.hover.comp===t.id&&!this.app.cmd?932675:0);let o=this.app.cmd&&this.app.cmd.ghostOthers&&this.app.cmd.ghostOthers(t.id);i.mat.transparent=!!o,i.mat.opacity=o?.3:1,i.mat.depthWrite=!o;let a=this.matrixOf(t);i.mesh.matrix.copy(a),i.edges.matrix.copy(a),i.mesh.matrixWorldNeedsUpdate=!0,i.edges.matrixWorldNeedsUpdate=!0,i.mesh.visible=!t.hidden,i.edges.visible=!t.hidden&&this.vp.style!=="shaded",this.vp.style==="wire"&&(i.mesh.visible=!1)}this.drawClashes(),this.vp.render()}fit(){let e=new mn;for(let t of this.objs.values())t.mesh.visible&&e.expandByObject(t.mesh);if(e.isEmpty())return this.vp.fit([[-50,-50,0],[50,50,50]]);this.vp.fit([e.min.toArray(),e.max.toArray()])}refFromHit(e,t){let n=this.geo.get(this.comp(e.comp).part);if(!n||!n.desc)return null;if(e.kind==="face"){let i=n.desc.faces[e.index];return i.type==="PLANE"&&(t==="plane"||t==="any")?{comp:e.comp,kind:"plane",p:i.center.map(It),n:i.normal.map(It),label:"flat face"}:i.axis&&(t==="axis"||t==="any")?{comp:e.comp,kind:"axis",p:i.axis.p.map(It),n:i.axis.d.map(It),r:It(i.axis.r),label:`round face \xD8${Se(2*i.axis.r)}`}:null}if(e.kind==="edge"){let i=n.desc.edges[e.index];if(i.circle&&(t==="circle"||t==="axis"||t==="any"))return{comp:e.comp,kind:"axis",p:i.circle.c.map(It),n:i.circle.n.map(It),r:It(i.circle.r),rim:!0,label:`round edge \xD8${Se(2*i.circle.r)}`}}return null}worldRef(e){let t=this.comp(e.comp),n=this.matrixOf(t),i=new _t(...t.quat);return{p:bt(e.p).applyMatrix4(n),n:bt(e.n).applyQuaternion(i).normalize()}}refreshRefs(e){let t=this.geo.get(e);if(!(!t||!t.desc||!this.asm))for(let n of this.asm.constraints)for(let i of[n.a,n.b]){let r=this.comp(i.comp);if(!r||r.part!==e)continue;let o=null,a=1/0,l=bt(i.n);if(i.kind==="plane")for(let c of t.desc.faces){if(c.type!=="PLANE"||bt(c.normal).dot(l)<.999)continue;let h=Math.abs(bt(c.center).sub(bt(i.p)).dot(l))*4+bt(c.center).distanceTo(bt(i.p));h<a&&(a=h,o={p:c.center,n:c.normal})}else{let c=[];for(let h of t.desc.edges)h.circle&&(i.rim||!0)&&c.push({p:h.circle.c,n:h.circle.n,r:h.circle.r,rim:!0});for(let h of t.desc.faces)h.axis&&!i.rim&&c.push({p:h.axis.p,n:h.axis.d,r:h.axis.r});for(let h of c){if(Math.abs(bt(h.n).dot(l))<.999||!!h.rim!=!!i.rim)continue;let u=bt(h.p).distanceTo(bt(i.p))+Math.abs(h.r-(i.r||h.r))*2;u<a&&(a=u,o=h)}}o?(i.p=o.p.map(It),i.kind==="plane"||bt(o.n).dot(l)>0?i.n=o.n.map(It):i.n=o.n.map(c=>It(-c)),o.r&&(i.r=It(o.r)),i.lost=!1):i.lost=!0}}solve(e=80){let t=this.asm;if(!t)return;let n=t.constraints.filter(i=>!i.suppressed&&this.comp(i.a.comp)&&this.comp(i.b.comp));for(let i=0;i<e;i++){let r=0;for(let o of n)r+=this.applyOne(o);if(r<1e-9)break}this.bad={};for(let i of n){let r=this.residual(i);r>.001&&(this.bad[i.id]=r)}for(let i of t.components){i.pos=i.pos.map(It);let r=new _t(...i.quat).normalize();i.quat=[r.x,r.y,r.z,r.w].map(o=>Math.round(o*1e8)/1e8)}}pickMover(e){let t=this.comp(e.a.comp),n=this.comp(e.b.comp);if(t===n)return null;let i=t.grounded||this._dragging===t.id;return n.grounded||this._dragging===n.id?i?null:{mover:t,mref:e.a,fref:e.b,sideB:!1}:{mover:n,mref:e.b,fref:e.a,sideB:!0}}rotateAbout(e,t,n){let i=bt(e.pos).sub(n).applyQuaternion(t).add(n),r=t.clone().multiply(new _t(...e.quat)).normalize();e.pos=i.toArray(),e.quat=[r.x,r.y,r.z,r.w]}applyOne(e){let t=this.pickMover(e);if(!t)return 0;let{mover:n,mref:i,fref:r}=t,o=this.worldRef(r),a=this.worldRef(i),l=0,c=za(e.offset);if(e.type==="mate"||e.type==="flush"){let h=e.type==="mate"?o.n.clone().negate():o.n.clone(),u=new _t().setFromUnitVectors(a.n,h),d=2*Math.acos(Math.min(1,Math.abs(u.w)));d>1e-10&&(this.rotateAbout(n,u,a.p),l+=d*10,a=this.worldRef(i));let f=a.p.clone().sub(o.p).dot(o.n),y=(t.sideB||e.type==="mate"?c:-c)-f;Math.abs(y)>1e-10&&(n.pos=bt(n.pos).addScaledVector(o.n,y).toArray(),l+=Math.abs(y))}else if(e.type==="angle"){let h=c*Math.PI/180,u=this.comp(r.comp),d=new _t(...u.quat);if(!e.hinge||e.hinge.comp!==u.id){let p=new C().crossVectors(o.n,a.n);p.lengthSq()<1e-12&&p.copy(Math.abs(o.n.z)<.9?new C(0,0,1):new C(1,0,0)).cross(o.n),p.normalize().applyQuaternion(d.clone().invert()),e.hinge={comp:u.id,d:p.toArray().map(It)}}let f=bt(e.hinge.d).applyQuaternion(d);f=f.sub(o.n.clone().multiplyScalar(f.dot(o.n))).normalize();let m=o.n.clone().applyAxisAngle(f,t.sideB?h:-h),y=new _t().setFromUnitVectors(a.n,m),g=2*Math.acos(Math.min(1,Math.abs(y.w)));g>1e-10&&(this.rotateAbout(n,y,a.p),l+=g*10)}else{let h=e.sign||1,u=o.n.clone().multiplyScalar((t.sideB,h)),d=new _t().setFromUnitVectors(a.n,u),f=2*Math.acos(Math.min(1,Math.abs(d.w)));f>1e-10&&(this.rotateAbout(n,d,a.p),l+=f*10,a=this.worldRef(i));let m=a.p.clone().sub(o.p),y=m.dot(o.n),p=m.clone().addScaledVector(o.n,-y).clone().negate();if(e.type==="insert"){let w=t.sideB?c:-c;p.addScaledVector(o.n,w-y)}p.length()>1e-10&&(n.pos=bt(n.pos).add(p).toArray(),l+=p.length())}return l}residual(e){let t=this.worldRef(e.a),n=this.worldRef(e.b),i=za(e.offset);if(e.type==="mate"||e.type==="flush")return(e.type==="mate"?n.n.clone().add(t.n).length():n.n.clone().sub(t.n).length())+Math.abs(n.p.clone().sub(t.p).dot(t.n)-i);if(e.type==="angle"){let c=i*Math.PI/180;return Math.abs(Math.acos(Math.max(-1,Math.min(1,t.n.dot(n.n))))-c)}let r=n.n.clone().sub(t.n.clone().multiplyScalar(e.sign||1)).length(),o=n.p.clone().sub(t.p),a=o.dot(t.n),l=r+o.clone().addScaledVector(t.n,-a).length();return e.type==="insert"&&(l+=Math.abs(a-i)),l}ray(e){return this.vp.ray(e)}pick(e,t={faces:!0,edges:!1}){let n=this.ray(e),i=[...this.objs.values()].filter(a=>a.mesh.visible).map(a=>a.mesh),o=n.intersectObjects(i,!1)[0];if(t.edges){let a=[...this.objs.values()].filter(d=>d.mesh.visible).map(d=>d.edges),l=a.map(d=>d.visible);a.forEach(d=>d.visible=!0);let c=n.intersectObjects(a,!1);a.forEach((d,f)=>d.visible=l[f]);let h=this.vp.pixelSize()*8,u=c.find(d=>!o||d.distance<=o.distance+h);if(u){let d=u.object.userData.comp,f=this.geo.get(this.comp(d).part),m=Hy(f.desc,u.index);if(m>=0&&(!t.circleOnly||f.desc.edges[m].circle))return{kind:"edge",comp:d,index:m,point:u.point.toArray()}}}if(o&&t.faces){let a=o.object.userData.comp,l=this.geo.get(this.comp(a).part);return{kind:"face",comp:a,index:zy(l.desc,o.faceIndex),point:o.point.toArray()}}return o?{kind:"comp",comp:o.object.userData.comp,point:o.point.toArray()}:null}highlight(e){this.vp.clearHighlights();for(let t of e){if(t.kind==="point"||t.kind==="segment"){this.vp.addHighlight(t);continue}let n=this.comp(t.comp||t.ref&&t.ref.comp);if(!n)continue;let i=this.geo.get(n.part);if(!i||!i.desc)continue;let r=this.matrixOf(n);if(t.kind==="face"){let[o,a]=i.desc.faceGroups[t.index]||[0,0],l=new Ze;l.setAttribute("position",i.geo.getAttribute("position")),l.setIndex(Array.from(i.desc.triangles.subarray(o,o+a)));let c=new ct(l,new Ft({color:t.color,transparent:!0,opacity:.6,side:xt,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));c.matrixAutoUpdate=!1,c.matrix.copy(r),this.vp.overlay.add(c)}else if(t.kind==="edge"){let[o,a]=i.desc.edgeGroups[t.index]||[0,0],l=[];for(let h=o;h<o+a;h++)l.push(new C(i.desc.lines[h*3],i.desc.lines[h*3+1],i.desc.lines[h*3+2]));let c=new rn(new Ze().setFromPoints(l),new Pt({color:t.color,depthTest:!1}));c.matrixAutoUpdate=!1,c.matrix.copy(r),c.renderOrder=10,this.vp.overlay.add(c)}else if(t.kind==="ref"){let o=this.worldRef(t.ref),a=Math.max(6,(t.ref.r||0)*2.4,this.vp.pixelSize()*40);if(t.ref.kind==="plane"){let d=new Gn(a,a),f=new ct(d,new Ft({color:t.color,transparent:!0,opacity:.45,side:xt,depthTest:!1}));f.position.copy(o.p),f.quaternion.setFromUnitVectors(new C(0,0,1),o.n),f.renderOrder=9,this.vp.overlay.add(f)}let l=a*.8,c=o.p.clone().addScaledVector(o.n,t.ref.kind==="axis"?-l:0),h=o.p.clone().addScaledVector(o.n,l),u=new rn(new Ze().setFromPoints([c,h]),new Pt({color:t.color,depthTest:!1}));u.renderOrder=10,this.vp.overlay.add(u),this.vp.addHighlight({kind:"point",point:o.p.toArray(),color:t.color})}}this.drawClashes(),this.vp.render()}drawClashes(){if(this.clashObj&&(this.vp.scene.remove(this.clashObj),this.clashObj.traverse(t=>t.geometry&&t.geometry.dispose()),this.clashObj=null),!this.clashes.length||!this.group.visible)return;let e=new Wt;for(let t of this.clashes){let n=new Ze;n.setAttribute("position",new lt(t.vertices,3)),n.setIndex(new lt(t.triangles,1));let i=new ct(n,new Ft({color:14692657,transparent:!0,opacity:.85,depthTest:!1,side:xt}));i.renderOrder=12;let r=1/(hn[this.asm.units||"mm"]||1);i.scale.setScalar(r),e.add(i)}this.clashObj=e,this.vp.scene.add(e)}onDown(e){if(e.button!==0||(this._down={x:e.clientX,y:e.clientY},this.app.cmd))return;let t=this.pick(e,{faces:!0});if(t){let n=this.comp(t.comp);if(!n.grounded){let i=new C;this.vp.camera.getWorldDirection(i),this._drag={id:n.id,plane:new Nt().setFromNormalAndCoplanarPoint(i,bt(t.point)),last:bt(t.point),moved:!1},this.app.beginChange(),this.vp.controls.enabled=!1}}}onMove(e){if(this._drag){let o=this.ray(e),a=new C;if(!o.ray.intersectPlane(this._drag.plane,a))return;let l=a.clone().sub(this._drag.last);this._drag.last=a;let c=this.comp(this._drag.id);c.pos=bt(c.pos).add(l).toArray(),this._drag.moved=!0,this._dragging=c.id,this.solve(40),this._dragging=null,this.solve(40),this.render();return}let t=this.app.cmd,n=t&&t.want?t.want:{faces:!0},i=this.pick(e,n),r=i?i.comp+i.kind+(i.index??""):"";r!==(this.hover?this.hover.key:"")&&(this.hover=i?{...i,key:r}:null,this.vp.renderer.domElement.style.cursor=i?t?"pointer":"grab":"default",this.render(),this.refreshHighlights())}onUp(e){if(e.button!==0)return;let t=this._down;if(this._down=null,this._drag){let r=this._drag.moved;if(this._drag=null,this.vp.controls.enabled=!0,r){this.app.endChange();return}this.app.abortChange()}if(!t||Math.hypot(e.clientX-t.x,e.clientY-t.y)>5)return;let n=this.app.cmd;if(n&&n.onPick){n.onPick(this.pick(e,n.want||{faces:!0}),e);return}let i=this.pick(e,{faces:!0});this.sel=i?i.comp:null,this.render(),this.app.ui.renderTree(),i&&this.app.status(`${this.comp(i.comp).name}: drag to move it, double-click it in the tree to edit the part. ${this.comp(i.comp).grounded?"It is grounded (fixed in place).":""}`)}refreshHighlights(){let e=[],t=this.app.cmd;t&&t.highlights&&e.push(...t.highlights());let n=this.hover;n&&t&&t.want&&(n.kind==="face"?e.push({kind:"face",comp:n.comp,index:n.index,color:3065014}):n.kind==="edge"&&e.push({kind:"edge",comp:n.comp,index:n.index,color:16747546})),this.highlight(e)}newId(e){let t=e+this.asm.nextId;return this.asm.nextId++,t}uniqueName(e){let t=1,n=new Set([...this.asm.components.map(i=>i.name),...this.asm.constraints.map(i=>i.name)]);for(;n.has(`${e}:${t}`);)t++;return`${e}:${t}`}freeSpot(){let e=new mn;for(let t of this.objs.values())e.expandByObject(t.mesh);return e.isEmpty()?[0,0,0]:[It(e.max.x+20),It((e.min.y+e.max.y)/2),It(e.min.z)]}addPart(e,t={}){let n=t.pid||this.newId("p"),i=t.pid?this.asm.parts[n]:id(e);return t.pid||delete i.kind,this.app.change(()=>{t.pid||(this.asm.parts[n]=i);let r=!this.asm.components.length,o={id:this.newId("c"),name:this.uniqueName(i.name||"Part"),part:n,pos:r?[0,0,0]:this.freeSpot(),quat:[0,0,0,1],grounded:r,hidden:!1};this.asm.components.push(o),this.sel=o.id}),n}deleteComp(e){let t=this.comp(e),n=this.asm.constraints.filter(i=>i.a.comp===e||i.b.comp===e);n.length&&!confirm(`Removing ${t.name} also removes ${n.length} constraint(s) on it. Go ahead?`)||(this.app.change(()=>{this.asm.components=this.asm.components.filter(i=>i.id!==e),this.asm.constraints=this.asm.constraints.filter(i=>i.a.comp!==e&&i.b.comp!==e),this.asm.components.some(i=>i.part===t.part)||delete this.asm.parts[t.part]}),this.sel===e&&(this.sel=null))}rotateComp(e,t,n){let i=this.comp(e);if(!i)return;let r=this.objs.get(e),a=new mn().expandByObject(r.mesh).getCenter(new C),l=new _t().setFromAxisAngle(bt(t==="X"?[1,0,0]:t==="Y"?[0,1,0]:[0,0,1]),n*Math.PI/180);this.app.change(()=>{this.rotateAbout(i,l,a)})}renderTree(e){let t=this.asm,n=`<div class="trow root">${tt("assembly",16)}<b>${Dt(t.name)}</b></div>`;n+=`<div class="trow sub groupHead">${tt("part",16)}<span>Parts placed (${t.components.length})</span></div>`,t.components.length||(n+='<div class="tempty">Use <b>Place</b> on the Assemble tab to bring in a part.</div>');for(let i of t.components){let r=this.geo.get(i.part),o=r&&Object.keys(r.errors||{}).length,a=["trow","feat","comp",this.sel===i.id?"sel":"",i.hidden?"supp":"",o?"bad":""].join(" ");n+=`<div class="${a}" data-comp="${i.id}" title="Click to pick. Double-click to edit the part. Right-click for more.">${tt("part",16)}<span class="tname">${Dt(i.name)}</span>${i.grounded?`<span class="tpin" title="Grounded: fixed in place">${tt("pin",13)}</span>`:""}${o?`<span class="tbad">${tt("err",14)}</span>`:""}</div>`}n+=`<div class="trow sub groupHead">${tt("mate",16)}<span>Constraints (${t.constraints.length})</span></div>`;for(let i of t.constraints){let r=this.comp(i.a.comp),o=this.comp(i.b.comp),a=this.bad[i.id]!=null||i.a.lost||i.b.lost,l=["trow","feat","con",i.suppressed?"supp":"",a?"bad":"",this.selCon===i.id?"sel":""].join(" "),c=i.a.lost||i.b.lost?"A face or edge it used is gone after a part change. Delete it and add it again.":a?"This constraint cannot be met together with the others. Check the offsets, flip it, or remove one.":"Double-click to change. Right-click for more.";n+=`<div class="${l}" data-con="${i.id}" title="${Dt(c)}">${tt(hi[i.type].icon,16)}<span class="tname">${Dt(i.name)}</span><span class="tmeta">${Dt(r?r.name:"?")} \u2194 ${Dt(o?o.name:"?")}</span>${a?`<span class="tbad">${tt("err",14)}</span>`:""}</div>`}e.innerHTML=n;for(let i of e.querySelectorAll("[data-comp]")){let r=i.dataset.comp;i.onclick=o=>{o.stopPropagation(),this.sel=r,this.selCon=null,this.render(),this.renderTree(e)},i.ondblclick=o=>{o.stopPropagation(),this.app.editPart(this.comp(r).part)},i.oncontextmenu=o=>{o.preventDefault(),o.stopPropagation(),this.sel=r,this.render(),this.renderTree(e),this.compMenu(r,o.clientX,o.clientY)}}for(let i of e.querySelectorAll("[data-con]")){let r=i.dataset.con;i.onclick=o=>{o.stopPropagation(),this.selCon=r,this.renderTree(e);let a=t.constraints.find(l=>l.id===r);this.highlight([{kind:"ref",ref:a.a,color:1809066},{kind:"ref",ref:a.b,color:15227148}])},i.ondblclick=o=>{o.stopPropagation(),this.app.run("constrain",{edit:r})},i.oncontextmenu=o=>{o.preventDefault(),o.stopPropagation(),this.conMenu(r,o.clientX,o.clientY)}}}compMenu(e,t,n){let i=this.comp(e),r=this.app.ui;r.menu([["Edit part",()=>this.app.editPart(i.part)],["Move / turn",()=>this.app.run("moveComp",{id:e})],["Rename",()=>r.askText("Rename",i.name,o=>this.app.change(()=>{this.comp(e).name=o}))],[i.grounded?"Unground (let it move)":"Ground (fix in place)",()=>this.app.change(()=>{this.comp(e).grounded=!this.comp(e).grounded})],[i.hidden?"Show":"Hide",()=>this.app.change(()=>{this.comp(e).hidden=!this.comp(e).hidden})],["Place another copy",()=>{this.addPart(null,{pid:i.part})}],["Remove",()=>this.deleteComp(e),"danger"]],t,n)}conMenu(e,t,n){let i=this.asm.constraints.find(r=>r.id===e);this.app.ui.menu([["Edit",()=>this.app.run("constrain",{edit:e})],["Flip",()=>this.app.change(()=>{let r=this.asm.constraints.find(o=>o.id===e);r.type==="mate"||r.type==="flush"?r.type=r.type==="mate"?"flush":"mate":r.sign=-(r.sign||1)})],[i.suppressed?"Turn on":"Turn off (suppress)",()=>this.app.change(()=>{let r=this.asm.constraints.find(o=>o.id===e);r.suppressed=!r.suppressed})],["Delete",()=>this.app.change(()=>{this.asm.constraints=this.asm.constraints.filter(r=>r.id!==e)}),"danger"]],t,n)}openPartsList(){let e=this.asm,t=this.app.materials,n=new Map;for(let a of e.components){let l=n.get(a.part)||{pid:a.part,qty:0};l.qty++,n.set(a.part,l)}let i=0,r=0,o=[...n.values()].map(a=>{r++;let l=e.parts[a.pid],c=this.geo.get(a.pid),h=t[l.material]||t.pla,u=hn[l.units||"mm"],d=c&&c.desc?c.desc.volume*u*u*u/1e3*h.density:0;i+=d*a.qty;let f=c&&c.desc?c.desc.bb[1].map((m,y)=>Se(m-c.desc.bb[0][y])).join(" \xD7 ")+" "+(l.units||"mm"):"";return`<tr><td>${r}</td><td><b>${Dt(l.name)}</b></td><td>${a.qty}</td><td>${Dt(h.name)}</td><td>${Dt(f)}</td><td>${Ec(d)}</td><td>${Ec(d*a.qty)}</td></tr>`}).join("");this.app.ui.modal(`<h2>${tt("bom",22)} Parts list: ${Dt(e.name)}</h2>
      <table class="ptable bom"><thead><tr><th>#</th><th>Part</th><th>Qty</th><th>Material</th><th>Size</th><th>Mass each</th><th>Mass total</th></tr></thead><tbody>${o||'<tr><td colspan="7" class="muted">No parts yet.</td></tr>'}</tbody></table>
      <p><b>Total mass: ${Ec(i)}</b> \xB7 ${e.components.length} parts placed, ${n.size} different</p>
      <p><button id="bomCsv">Download as a spreadsheet (.csv)</button></p>`,"wide"),Ba("#bomCsv").onclick=()=>{let a=[["Item","Part","Qty","Material","Mass each (g)"]],l=0;for(let c of n.values()){l++;let h=e.parts[c.pid],u=this.geo.get(c.pid),d=t[h.material]||t.pla,f=hn[h.units||"mm"];a.push([l,h.name,c.qty,d.name,u&&u.desc?(u.desc.volume*f*f*f/1e3*d.density).toFixed(2):""])}this.app.download(this.app.safeName()+" parts list.csv",a.map(c=>c.map(h=>`"${String(h).replace(/"/g,'""')}"`).join(",")).join(`\r
`),"text/csv")}}async checkInterference(){let e=this.asm;if(e.components.length<2)return this.app.toast("Place at least two parts first.");this.app.toast("Checking where parts overlap\u2026");let t=e.components.filter(a=>!a.hidden).map(a=>({id:a.id,part:a.part,pos:a.pos.map(l=>l*hn[e.units||"mm"]),quat:a.quat})),n=await this.app.send({type:"interference",parts:e.parts,comps:t,scale:1});if(n.type==="error")return this.app.toast("Check failed: "+n.msg,"error");this.clashes=n.found,this.render();let i=e.units||"mm",r=hn[i],o=n.found.map(a=>`<li><b>${Dt(this.comp(a.a).name)}</b> and <b>${Dt(this.comp(a.b).name)}</b> overlap by ${Se(a.volume/(r*r*r))} ${i}\xB3</li>`).join("");this.app.ui.modal(`<h2>${tt("clash",22)} Interference check</h2>${n.found.length?`<p>These parts run into each other. The overlap is shown in <b style="color:#e03131">red</b>. Real parts could not be put together like this.</p><ul>${o}</ul>`:'<p class="good"><b>\u2714 No parts overlap.</b> Everything fits.</p>'}<p class="muted">Touching faces (a mate with no gap) do not count as overlap.</p><div class="welcomebtns"><button id="clashClear">Clear the red marks</button></div>`,"",null),Ba("#clashClear").onclick=()=>{this.clashes=[],this.render(),this.app.ui.closeModal()}}};function Ec(s){return s>=1e3?Se(s/1e3)+" kg":Se(s)+" g"}function zy(s,e){let t=e*3,n=s.faceGroups;for(let i=0;i<n.length;i++)if(t>=n[i][0]&&t<n[i][0]+n[i][1])return i;return-1}function Hy(s,e){let t=s.edgeGroups;for(let n=0;n<t.length;n++)if(e>=t[n][0]&&e<t[n][0]+t[n][1])return n;return-1}var sd={place(s){return s.asmr.placeDialog(),null},constrain(s,e){let t=s.asmr,n=s.asm;if(n.components.length<2)return s.toast("Place at least two parts first.","error"),null;let i,r=null;e&&e.edit?(r=n.constraints.findIndex(u=>u.id===e.edit),i=id(n.constraints[r])):i={id:t.newId("k"),type:e&&e.type||"mate",name:"",a:null,b:null,offset:0,sign:1};let o=JSON.stringify(n.components),a=()=>{let u=JSON.parse(o);for(let d of n.components){let f=u.find(m=>m.id===d.id);f&&(d.pos=f.pos,d.quat=f.quat)}},l=()=>{let u=hi[i.type].want;return u==="plane"?{faces:!0}:u==="circle"?{edges:!0,circleOnly:!0}:{faces:!0,edges:!0,circleOnly:!0}},c=()=>{if(a(),i.a&&i.b){let u=n.constraints;n.constraints=u.filter(d=>d.id!==i.id).concat([i]),t.solve(),n.constraints=u}t.render(),s.refreshHighlights()};return{title:r!=null?"Edit "+i.name:"Constrain",get help(){return hi[i.type].help},noPreviewBuild:!0,get want(){return l()},fields:()=>[{key:"type",label:"Type",type:"select",options:Object.entries(hi).map(([u,d])=>[u,d.label]),onChange:()=>{i.a=null,i.b=null,i.hinge=null,a(),t.render()}},{type:"html",html:`<div class="picks"><div class="${i.a?"done":"now"}"><b>1</b> ${i.a?Dt(t.comp(i.a.comp).name+": "+i.a.label):"Click a "+Tc(i.type)+" on the part that stays put"}</div><div class="${i.b?"done":i.a?"now":""}"><b>2</b> ${i.b?Dt(t.comp(i.b.comp).name+": "+i.b.label):"Click a "+Tc(i.type)+" on the part to move"}</div></div>`},{key:"offset",label:i.type==="angle"?"Angle (\xB0)":`Offset / gap (${n.units||"mm"})`,type:"expr"},i.type==="insert"||i.type==="axis"?{type:"buttons",items:[["Flip direction",()=>{i.sign=-(i.sign||1),c(),s.ui.refreshCmd()}]]}:i.type!=="angle"?{type:"buttons",items:[[i.type==="mate"?"Flip (make it Flush)":"Flip (make it Mate)",()=>{i.type=i.type==="mate"?"flush":"mate",c(),s.ui.refreshCmd()}]]}:null,i.a||i.b?{type:"buttons",items:[["Pick again",()=>{i.a=null,i.b=null,i.hinge=null,a(),t.render(),s.ui.refreshCmd(),s.refreshHighlights()}]]}:null].filter(Boolean),target:i,onField:()=>c(),onPick(u){if(!u)return;let d=t.refFromHit(u,hi[i.type].want);if(!d){s.toast(`Pick a ${Tc(i.type)}.`,"error");return}if(!i.a)i.a=d;else{if(i.b)return;if(d.comp===i.a.comp){s.toast("Pick the second one on a different part.","error");return}if(i.b=d,i.type==="insert"||i.type==="axis"){let f=t.worldRef(i.a),m=t.worldRef(i.b);i.sign=f.n.dot(m.n)>=0?1:-1,i.type==="insert"&&(i.sign=-1)}i.type==="angle"&&!za(i.offset)&&(i.offset=90)}s.ui.refreshCmd(),c()},highlights:()=>[i.a&&{kind:"ref",ref:i.a,color:1809066},i.b&&{kind:"ref",ref:i.b,color:15227148}].filter(Boolean),validate:()=>!i.a||!i.b?"Pick both parts first.":null,ok(){if(a(),!i.name){let u=1;for(;n.constraints.some(d=>d.name===hi[i.type].label+u);)u++;i.name=hi[i.type].label+u}s.change(()=>{r!=null?n.constraints[r]=i:n.constraints.push(i),t.solve()}),t.bad[i.id]!=null&&s.toast(`${i.name} cannot be met together with the other constraints. Try Flip, a different offset, or unground a part.`,"error")},cancel(){a(),t.render()}}},moveComp(s,e){let t=s.asmr,n=e&&e.id||t.sel,i=n&&t.comp(n);if(!i)return s.toast("Click a part first, then Move.","error"),null;let r=s.asm.units||"mm",o={x:i.pos[0],y:i.pos[1],z:i.pos[2]},a=(l,c)=>{t.rotateComp(i.id,l,c),Object.assign(o,{x:i.pos[0],y:i.pos[1],z:i.pos[2]}),s.ui.refreshCmd()};return{title:"Move "+i.name,help:"Turn the part in 90\xB0 steps or type where it goes. Constraints still apply, so a constrained part may snap back.",noOk:!0,closeLabel:"Done",target:o,fields:()=>[{type:"buttons",label:"Turn 90\xB0 around",items:[["X",()=>a("X",90)],["Y",()=>a("Y",90)],["Z",()=>a("Z",90)],["\u2212X",()=>a("X",-90)],["\u2212Y",()=>a("Y",-90)],["\u2212Z",()=>a("Z",-90)]]},{key:"x",label:`Position X (${r})`,type:"expr"},{key:"y",label:`Position Y (${r})`,type:"expr"},{key:"z",label:`Position Z (${r})`,type:"expr"},{type:"note",text:i.grounded?"This part is grounded (fixed). Moving it moves everything constrained to it.":"Tip: you can also drag a part with the left mouse button."}],onField:()=>{let l=[o.x,o.y,o.z].map(za);l.some(c=>!Number.isFinite(c))||s.change(()=>{i.pos=l,t.solve()})},highlights:()=>[]}},measure(s){let e=s.asmr,t=[],n="Click a spot on a part, then a second spot. Click a round edge to see its diameter.",i=s.asm.units||"mm";return{title:"Measure",help:"Straight-line distance between two clicked points.",want:{faces:!0,edges:!0},noOk:!0,closeLabel:"Done",fields:()=>[{type:"html",html:n}],onPick(r){if(!r)return;let o="";if(r.kind==="edge"){let c=e.refFromHit(r,"circle");c&&(o=`Round edge: <b>\xD8 ${Se(2*c.r*e.scaleOf(e.comp(r.comp).part))} ${i}</b>`)}t.length>=2&&(t.length=0),t.push(r.point);let a=t[0],l=t[1];n=t.length===1?`First point picked.<br>${o}<br>Now click a second point.`:`Distance: <b class="big">${Se(Math.hypot(l[0]-a[0],l[1]-a[1],l[2]-a[2]))} ${i}</b><br>X: ${Se(Math.abs(l[0]-a[0]))} &nbsp; Y: ${Se(Math.abs(l[1]-a[1]))} &nbsp; Z: ${Se(Math.abs(l[2]-a[2]))}<br>${o}`,s.ui.refreshCmd(),s.refreshHighlights()},highlights:()=>[...t.map(r=>({kind:"point",point:r,color:15227148})),...t.length===2?[{kind:"segment",points:t,color:15227148}]:[]]}}};function Tc(s){let e=hi[s].want;return e==="plane"?"flat face":e==="circle"?"round edge":"round edge or round face"}Er.prototype.placeDialog=function(){let s=this.app,e=this.asm,t=[...new Set(e.components.map(n=>n.part))];s.ui.modal(`<h2>${tt("place",22)} Place a part</h2>
    <div class="excards">
      <button class="excard" id="plFile"><b>From a part file\u2026</b><span>Pick a .pcad file you saved.</span></button>
      <button class="excard" id="plNew"><b>New part</b><span>Start an empty part inside this assembly and design it here.</span></button>
      ${t.map(n=>`<button class="excard" data-copy="${n}"><b>Another ${Dt(this.partName(n))}</b><span>A copy of a part already here (both change together).</span></button>`).join("")}
      ${ci.map((n,i)=>`<button class="excard" data-ex="${i}"><b>Example: ${Dt(n.title)}</b><span>${Dt(n.about.split(".")[0])}.</span></button>`).join("")}
    </div>`,"wide"),Ba("#plFile").onclick=()=>{let n=document.createElement("input");n.type="file",n.accept=".pcad,.json",n.multiple=!0,n.onchange=async()=>{for(let i of n.files)try{let r=JSON.parse(await i.text());if(!r||!Array.isArray(r.features))throw new Error(i.name+" is not a Pathway CAD part file");this.addPart(r)}catch(r){s.toast("Could not place: "+r.message,"error")}s.ui.closeModal()},n.click()},Ba("#plNew").onclick=()=>{s.ui.closeModal();let n=s.blankPart(),i=1;for(;Object.values(e.parts).some(o=>o.name==="Part"+i);)i++;n.name="Part"+i,n.units=e.units||"mm";let r=this.addPart(n);s.editPart(r)};for(let n of document.querySelectorAll("#modal [data-copy]"))n.onclick=()=>{s.ui.closeModal(),this.addPart(null,{pid:n.dataset.copy})};for(let n of document.querySelectorAll("#modal [data-ex]"))n.onclick=()=>{s.ui.closeModal(),this.addPart(ci[+n.dataset.ex].doc)}};var Pe=(s,e=document)=>e.querySelector(s),Ae=s=>String(s).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Cc=s=>JSON.parse(JSON.stringify(s)),qt=s=>Math.round(s*1e3)/1e3,rd="pathwaycad.autosave.v1",Ga={pla:{name:"PLA plastic (3D print)",density:1.24},petg:{name:"PETG plastic (3D print)",density:1.27},abs:{name:"ABS plastic",density:1.04},acrylic:{name:"Acrylic",density:1.18},oak:{name:"Oak wood",density:.75},pine:{name:"Pine wood",density:.5},aluminum:{name:"Aluminum 6061",density:2.7},steel:{name:"Mild steel",density:7.85},stainless:{name:"Stainless steel",density:8},brass:{name:"Brass",density:8.5},copper:{name:"Copper",density:8.96}},Rc={sketch:{icon:"sketch",label:"Sketch"},extrude:{icon:"extrude",label:"Extrusion"},revolve:{icon:"revolve",label:"Revolution"},hole:{icon:"hole",label:"Hole"},primitive:{icon:"primitive",label:"Shape"},fillet:{icon:"fillet",label:"Fillet"},chamfer:{icon:"chamfer",label:"Chamfer"},shell:{icon:"shell",label:"Shell"},pattern:{icon:"pattern",label:"Pattern"},mirrorBody:{icon:"mirrorBody",label:"Mirror Part"}},Ac=[["join","Add material (join)"],["cut","Remove material (cut)"],["intersect","Keep only the overlap"]],Va=[["X","X axis (red)"],["Y","Y axis (green)"],["Z","Z axis (blue)"]],od=[["YZ","YZ plane (flip left/right)"],["XZ","XZ plane (flip front/back)"],["XY","XY plane (flip up/down)"]];function Fi(){return{app:"Pathway CAD",version:1,name:"Part1",units:"mm",material:"pla",color:"#8fb3c9",params:[],features:[],rollback:null,nextId:1}}var Pc=class{constructor(){this.doc=Fi(),this.undoStack=[],this.redoStack=[],this.mode="model",this.cmd=null,this.result={errors:{},warnings:{}},this.buildId=0,this.pending=new Map,this.ui=new Ic(this),this.vp=new La(Pe("#view3d")),this.sk=new Oa(this),this.asm=null,this.editPid=null,this.materials=Ga,this.asmr=new Er(this),this.vp.onStyle=()=>this.mode==="assembly"&&this.asmr.render(),this.startKernel(),this.bindViewportPicking(),this.ui.renderRibbon(),this.restore(),this.vp.setView("home"),window.addEventListener("keydown",e=>this.onKey(e)),window.addEventListener("beforeunload",()=>this.autosave())}startKernel(){this.ready=!1,this.worker=new Worker("worker.js",{type:"module"}),this.worker.onmessage=e=>this.onKernel(e.data),this.worker.onerror=e=>{this.ui.loading(`The modeling engine failed to start: ${e.message||"unknown error"}`,!0)}}onKernel(e){if(e.type==="ready"){this.ready=!0,this.ui.loading(null),this.status("Ready. Pick a tool from the ribbon, or right-drag to turn the view."),this.rebuild();return}if(e.type==="fatal"){this.ui.loading("The modeling engine failed to start: "+e.msg,!0);return}let t=this.pending.get(e.id);t&&(this.pending.delete(e.id),t(e))}send(e){return new Promise(t=>{let n=++this.buildId;this.pending.set(n,t),this.worker.postMessage({...e,id:n})})}buildPlan(){let e=this.doc,t=e.rollback??e.features.length;if(this.mode==="sketch"){let n=e.features.findIndex(i=>i.id===this.sketchId);return{doc:e,stopAt:n+1}}if(this.cmd&&this.cmd.feature){let n=this.cmd,i={...e,features:[...e.features]},r;n.editIndex!=null?(r=n.editIndex,i.features[r]=n.feature):(r=t,i.features.splice(r,0,n.feature));let o=n.picksOnBase&&!n.preview;return{doc:i,stopAt:o?r:r+1,previewId:n.feature.id}}return{doc:e,stopAt:t}}rebuild(){if(this.ready){if(this.mode==="assembly"){this.asmr.rebuild();return}clearTimeout(this._rb),this._rb=setTimeout(async()=>{let e=this.buildPlan(),t=++this._ticket||(this._ticket=1);this.ui.busy(!0);let n=await this.send({type:"rebuild",doc:e.doc,stopAt:e.stopAt});if(t!==this._ticket)return;if(this.ui.busy(!1),n.type==="error"){this.toast("Rebuild failed: "+n.msg,"error");return}this.planes={...this.planes||{},...n.planes||{}},this.result={errors:n.errors,warnings:n.warnings,desc:n.desc,ms:n.ms,previewId:e.previewId};let i=!this.vp.desc&&n.desc;this.vp.setPart(n.desc),i&&this.mode!=="sketch"&&!this._fittedOnce&&(this._fittedOnce=!0,this.vp.fit()),this.refreshHighlights(),this.ui.renderTree(),this.ui.renderStatusInfo(),this.cmd&&this.cmd.onRebuilt&&this.cmd.onRebuilt(),e.previewId&&n.errors[e.previewId]?this.ui.cmdError(n.errors[e.previewId]):this.cmd&&this.ui.cmdError(null),this.ui.infoOpen&&this.ui.renderInfo()},40)}}params(){return $u(this.doc)}newId(e="f"){let t=e+this.doc.nextId;return this.doc.nextId++,t}get root(){return this.asm||this.doc}snapshot(){return JSON.stringify(this.root)}change(e){let t=this.snapshot();e(),this.snapshot()!==t&&(this.undoStack.push(t),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]),this.changed()}beginChange(){this._began=this.snapshot()}endChange(){this._began&&this._began!==this.snapshot()&&(this.undoStack.push(this._began),this.redoStack=[]),this._began=null,this.changed()}abortChange(){this._began=null}changed(){this.dirty=!0,clearTimeout(this._as),this._as=setTimeout(()=>this.autosave(),800),this.mode==="sketch"&&this.sk.recompute(),this.rebuild(),this.ui.renderTree(),this.ui.renderTitle()}undo(){if(this.cmd){this.cancelCmd();return}if(!this.undoStack.length)return this.toast("Nothing to undo");this.redoStack.push(this.snapshot()),this.loadState(this.undoStack.pop())}redo(){if(!this.redoStack.length)return this.toast("Nothing to redo");this.undoStack.push(this.snapshot()),this.loadState(this.redoStack.pop())}loadState(e){let t=JSON.parse(e);if(t.kind==="assembly"){if(this.asm=t,this.editPid&&!t.parts[this.editPid]&&this.returnToAssembly(),this.editPid&&(this.doc=t.parts[this.editPid]),this.mode==="assembly"){this.changed();return}}else this.doc=t;this.mode==="sketch"&&!this.sketchFeature()&&this.exitSketch(!0),this.mode==="sketch"&&(this.sk.sel=new Set([...this.sk.sel].filter(n=>this.sketchFeature().entities.some(i=>i.id===n))),this.sk.recompute(),this.sk.redraw(),this.ui.sketchSelection()),this.vp.setColor(this.doc.color),this.changed()}autosave(){try{localStorage.setItem(rd,this.snapshot())}catch{}}restore(){let e=null;try{e=localStorage.getItem(rd)}catch{}if(e)try{let t=JSON.parse(e);if(t&&t.kind==="assembly"){this.openAssembly(t),this.toast("Opened your last assembly. Use File > New for a fresh one.");return}if(t&&t.features&&t.features.length){this.setDoc(t,!0),this.toast("Opened your last part. Use File > New for a fresh one.");return}}catch{}this.setDoc(Fi(),!0),this.ui.showWelcome()}setDoc(e,t){this.mode==="sketch"&&this.exitSketch(!0),this.cmd&&this.cancelCmd(),this.leaveAssembly();let n=Fi();this.doc={...n,...e},(!this.doc.nextId||this.doc.nextId<2)&&(this.doc.nextId=1e3),this.undoStack=[],this.redoStack=[],this.vp.setColor(this.doc.color),this._fittedOnce=!1,this.vp.desc=null,this.ui.renderTitle(),this.ui.renderTree(),this.rebuild(),t||this.vp.setView("home")}units(){return(this.mode==="assembly"?this.asm.units:this.doc.units)||"mm"}blankPart(){return Fi()}leaveAssembly(){this.asm=null,this.editPid=null,this.mode==="assembly"&&(this.mode="model"),this.asmr.show(!1),this.asmr.clashes=[],this.vp.fitOverride=null,this.ui.renderRibbon()}openAssembly(e){this.mode==="sketch"&&this.exitSketch(!0),this.cmd&&this.cancelCmd(),this.asm={...Ha(),...e},this.editPid=null,this.doc=Fi(),this.mode="assembly",this.undoStack=[],this.redoStack=[],this.asmr.sel=null,this.asmr.clashes=[],this.asmr._fitted=!1,this.asmr.show(!0),this.vp.fitOverride=()=>this.asmr.fit(),this.ui.tab="assemble",this.ui.renderRibbon(),this.ui.renderTitle(),this.ui.renderTree(),this.rebuild(),this.vp.setView("home")}newAssemblyFile(){this.root&&(this.root.features&&this.root.features.length||this.root.components&&this.root.components.length)&&!confirm("Start a new assembly? Save first if you want to keep what is open (File > Save).")||(this.openAssembly(Ha()),this.asmr.placeDialog())}editPart(e){!this.asm||!this.asm.parts[e]||(this.cmd&&this.cancelCmd(),this.editPid=e,this.mode="model",this.doc=this.asm.parts[e],this.asmr.show(!1),this.vp.fitOverride=null,this.vp.setColor(this.doc.color),this.vp.desc=null,this._fittedOnce=!1,this.ui.tab="model",this.ui.renderRibbon(),this.ui.renderTitle(),this.ui.renderTree(),this.rebuild(),this.vp.setView("home"),this.toast(`Editing ${this.doc.name}. Press "Back to assembly" when done.`))}returnToAssembly(){this.asm&&(this.mode==="sketch"&&this.exitSketch(!0),this.cmd&&this.cancelCmd(),this.editPid=null,this.mode="assembly",this.doc=Fi(),this.vp.setPart(null),this.asmr.show(!0),this.vp.fitOverride=()=>this.asmr.fit(),this.ui.tab="assemble",this.ui.renderRibbon(),this.ui.renderTitle(),this.ui.renderTree(),this.rebuild())}findFeature(e){return this.doc.features.find(t=>t.id===e)}featureIndex(e){return this.doc.features.findIndex(t=>t.id===e)}sketchFeature(){return this.findFeature(this.sketchId)}nextName(e){let t=e==="primitive"?"Shape":Rc[e].label,n=1;for(;this.doc.features.some(i=>i.name===t+n);)n++;return t+n}insertFeature(e){let t=this.doc.rollback??this.doc.features.length;this.doc.features.splice(t,0,e),this.doc.rollback!=null&&this.doc.rollback++}dependents(e){let t=new Set([e]),n=!0;for(;n;){n=!1;for(let i of this.doc.features){if(t.has(i.id))continue;[i.sketch,...i.features||[]].some(o=>t.has(o))&&(t.add(i.id),n=!0)}}return t}deleteFeature(e){let t=this.dependents(e),n=this.findFeature(e);if(t.size>1){let i=this.doc.features.filter(r=>t.has(r.id)&&r.id!==e).map(r=>r.name).join(", ");if(!confirm(`Deleting ${n.name} also deletes what uses it: ${i}. Go ahead?`))return}this.change(()=>{let i=this.doc.features.length,r=this.doc.rollback;if(r!=null){let o=this.doc.features.slice(0,r).filter(a=>t.has(a.id)).length;this.doc.rollback=r-o}this.doc.features=this.doc.features.filter(o=>!t.has(o.id)),this.doc.rollback!=null&&this.doc.rollback>=this.doc.features.length&&(this.doc.rollback=null)})}status(e){this.ui.status(e)}toast(e,t){this.ui.toast(e,t)}onKey(e){let t=e.target&&e.target.tagName||"",n=t==="INPUT"||t==="TEXTAREA"||t==="SELECT",i=e.key.toLowerCase();if((e.ctrlKey||e.metaKey)&&i==="z"&&!n){e.preventDefault(),e.shiftKey?this.redo():this.undo();return}if((e.ctrlKey||e.metaKey)&&i==="y"&&!n){e.preventDefault(),this.redo();return}if((e.ctrlKey||e.metaKey)&&i==="s"){e.preventDefault(),this.saveFile();return}if((e.ctrlKey||e.metaKey)&&i==="o"){e.preventDefault(),this.openFile();return}if(n){e.key==="Enter"&&this.cmd&&t!=="TEXTAREA"&&t!=="SELECT"&&(e.target.blur(),setTimeout(()=>this.okCmd(),60));return}if(this.ui.modalOpen()){e.key==="Escape"&&this.ui.closeModal();return}if(this.mode==="assembly"){if(e.key==="Escape"){this.cmd?this.cancelCmd():(this.asmr.sel=null,this.asmr.render(),this.ui.renderTree());return}if(e.key==="Enter"&&this.cmd){this.okCmd();return}if((e.key==="Delete"||e.key==="Backspace")&&!this.cmd&&this.asmr.sel){e.preventDefault(),this.asmr.deleteComp(this.asmr.sel);return}if(e.ctrlKey||e.metaKey||e.altKey||this.cmd)return;let o={p:"place",c:"constrain",m:"measure",g:"moveComp"};o[i]&&this.run(o[i]),e.key==="F6"&&this.vp.setView("home");return}if(e.key==="Escape"){this.mode==="sketch"?this.sk.temp.length||this.sk.tool!=="select"?this.sk.cancelTemp():this.sk.sel.size&&(this.sk.sel.clear(),this.sk.redraw(),this.ui.sketchSelection()):this.cmd&&this.cancelCmd();return}if(e.key==="Enter"&&this.cmd){this.okCmd();return}if(e.key==="Delete"||e.key==="Backspace"){this.mode==="sketch"?(e.preventDefault(),this.sk.deleteSelected()):!this.cmd&&this.ui.treeSel&&(e.preventDefault(),this.deleteFeature(this.ui.treeSel));return}if(e.ctrlKey||e.metaKey||e.altKey)return;if(this.mode==="sketch"){let o={l:"line",r:"rect",c:"circle",a:"arc",p:"polygon",o:"slot",s:"select"};o[i]&&this.sk.setTool(o[i]),i==="g"&&this.toggleGrid(),i==="x"&&this.sk.toggleConstruction();return}if(this.cmd)return;let r={s:"sketch",e:"extrude",r:"revolve",h:"hole",f:"fillet",m:"measure"};r[i]&&this.run(r[i]),e.key==="F6"&&this.vp.setView("home")}bindViewportPicking(){let e=this.vp.renderer.domElement,t=null;e.addEventListener("pointerdown",n=>{if(this.mode==="assembly")return this.asmr.onDown(n);n.button===0&&(t=[n.clientX,n.clientY])}),e.addEventListener("pointermove",n=>{if(this.mode==="assembly")return this.asmr.onMove(n);if(this.mode==="sketch")return;let i=this.pickWant();if(!i){this.hoverPick&&(this.hoverPick=null,this.refreshHighlights());return}let r=this.vp.pick(n,i),o=r?r.kind+(r.index??r.name):"";o!==(this.hoverPick?this.hoverPick.key:"")&&(this.hoverPick=r?{...r,key:o}:null,this.refreshHighlights(),e.style.cursor=r?"pointer":"default")}),e.addEventListener("pointerup",n=>{if(this.mode==="assembly")return this.asmr.onUp(n);if(n.button!==0||!t||this.mode==="sketch")return;let i=Math.hypot(n.clientX-t[0],n.clientY-t[1]);if(t=null,i>5)return;let r=this.pickWant();if(!r)return;let o=this.vp.pick(n,r);this.cmd&&this.cmd.onPick&&this.cmd.onPick(o,n)})}pickWant(){return!this.cmd||!this.cmd.want||this.cmd.picksOnBase&&this.cmd.preview?null:this.cmd.want}refreshHighlights(){if(this.mode==="assembly"){this.asmr.refreshHighlights();return}let e=[];if(this.cmd&&this.cmd.highlights&&e.push(...this.cmd.highlights()),this.hoverPick){let t=this.hoverPick;t.kind==="face"?e.push({kind:"face",index:t.index,color:ln.hoverFace}):t.kind==="edge"?e.push({kind:"edge",index:t.index,color:ln.hoverEdge}):t.kind==="plane"&&e.push({kind:"plane",name:t.name,color:ln.hoverFace})}this.vp.highlight(e)}run(e,t){if(!this.ready)return this.toast("The modeling engine is still loading\u2026");if(this.mode==="sketch"&&!["params","info","measure"].includes(e)){this.toast("Finish the sketch first (green check).");return}this.cmd&&this.cancelCmd();let n=(this.mode==="assembly"?sd:Xy)[e];if(!n)return;let i=n(this,t);i&&(this.cmd=i,this.ui.openCmd(i),i.start&&i.start(),this.refreshHighlights(),this.rebuild())}cmdChanged(){this.cmd&&(this.ui.refreshCmd(),this.refreshHighlights(),this.rebuild())}okCmd(){let e=this.cmd;if(e){if(e.validate){let t=e.validate();if(t){this.toast(t,"error");return}}if(e.feature){let t=this.buildPlan();this.change(()=>{e.editIndex!=null?this.doc.features[e.editIndex]=e.feature:this.insertFeature(e.feature)})}e.ok&&e.ok(),this.closeCmd()}}cancelCmd(){this.cmd&&this.cmd.cancel&&this.cmd.cancel(),this.closeCmd(),this.rebuild()}closeCmd(){this.cmd=null,this.hoverPick=null,this.asmr.hover=null,this.mode==="assembly"&&this.asmr.render(),this.vp.showPlanes(!1),this.ui.closeCmd(),this.refreshHighlights(),this.vp.renderer.domElement.style.cursor="default",this.status("Ready. Pick a tool from the ribbon, or right-drag to turn the part."),this.rebuild()}editFeature(e){let t=this.findFeature(e);if(!t)return;if(t.type==="sketch")return this.enterSketch(e);let n={extrude:"extrude",revolve:"revolve",hole:"hole",fillet:"fillet",chamfer:"chamfer",shell:"shell",mirrorBody:"mirrorBody",primitive:"primitive",pattern:"pattern"};this.run(n[t.type],{edit:e})}enterSketch(e,t=!1){this.cmd&&this.closeCmd();let n=this.findFeature(e),i;try{let r=this.params(),o=typeof n.plane=="string"?Vy[n.plane]:{...n.plane},a=n.faceRef&&this.planes&&this.planes[e];a&&a.base&&(o.origin=a.base,o.normal=a.normal);let l=n.offset?Kt(n.offset,r):0;i={origin:o.origin.map((c,h)=>c+o.normal[h]*l),xDir:o.xDir,normal:o.normal}}catch(r){this.toast("Plane offset problem: "+r.message,"error");return}this.mode="sketch",this.sketchId=e,this.sketchIsNew=t,this.savedCam={pos:this.vp.camera.position.clone(),up:this.vp.camera.up.clone(),target:this.vp.controls.target.clone(),zoom:this.vp.camera.zoom,h:this.vp.viewHeight},this.vp.setGhost(!0),this.sk.evals=null,this.sk.recompute(),this.sk.enter(i),this.ui.enterSketch(),this.rebuild()}exitSketch(e){if(this.mode!=="sketch")return;let t=this.sketchId;if(this.sk.exit(),this.mode="model",this.vp.setGhost(!1),this.ui.exitSketch(),this.savedCam){let o=this.savedCam;this.vp.camera.position.copy(o.pos),this.vp.setUp(o.up),this.vp.controls.target.copy(o.target),this.vp.camera.zoom=o.zoom,this.vp.viewHeight=o.h,this.vp.updateFrustum(),this.vp.controls.update()}if(this.rebuild(),e)return;let n=this.findFeature(t);if(!n)return;let i=this.doc.features.some(o=>o.sketch===t),{loops:r}=Ua(wr(n.entities,this.params(),n.constraints));!i&&r.length?this.run("extrude",{sketch:t}):!i&&n.entities.length&&this.toast("No closed shape yet, so nothing to extrude. Red dots show line ends that do not meet.")}toggleGrid(){this.sk.gridOn=!this.sk.gridOn,this.sk.redraw(),this.ui.sketchToolChanged(this.sk.tool)}download(e,t,n){let i=t instanceof Blob?t:new Blob([t],{type:n}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.download=e,document.body.appendChild(r),r.click(),setTimeout(()=>{URL.revokeObjectURL(r.href),r.remove()},2e3)}safeName(){return(this.root.name||"Part").replace(/[^\w\- ]+/g,"").trim()||"Part"}saveFile(e){this.mode==="sketch"&&this.exitSketch(!0);let t=e?this.doc:this.root,n=t.kind==="assembly"?".pasm":".pcad",i=((t.name||"Part").replace(/[^\w\- ]+/g,"").trim()||"Part")+n;this.download(i,JSON.stringify(t,null,1),"application/json"),this.dirty=!1,this.toast("Saved "+i+" to your downloads.")}openFile(){let e=document.createElement("input");e.type="file",e.accept=".pcad,.pasm,.json",e.onchange=async()=>{let t=e.files[0];if(t)try{let n=JSON.parse(await t.text());if(n&&n.kind==="assembly"&&Array.isArray(n.components)){this.openAssembly(n),this.toast("Opened "+t.name);return}if(!n||!Array.isArray(n.features))throw new Error("This is not a Pathway CAD file");this.setDoc(n),this.toast("Opened "+t.name)}catch(n){this.toast("Could not open: "+n.message,"error")}},e.click()}newFile(){(this.root.features&&this.root.features.length||this.root.components&&this.root.components.length)&&!confirm("Start a new part? Save first if you want to keep this one (File > Save).")||this.setDoc(Fi())}async exportFile(e){if(this.mode==="sketch"&&this.exitSketch(!0),this.mode==="assembly"){if(!this.asm.components.length)return this.toast("Place some parts first.","error");this.toast(`Making the ${e.toUpperCase()} file for the whole assembly\u2026`);let n=hn[this.asm.units||"mm"],i=this.asm.components.filter(o=>!o.hidden).map(o=>({id:o.id,part:o.part,pos:o.pos.map(a=>a*n),quat:o.quat})),r=await this.send({type:"exportAsm",format:e,parts:this.asm.parts,comps:i});return r.type==="error"?this.toast("Export failed: "+r.msg,"error"):this.download(`${this.safeName()}.${e==="stl"?"stl":"step"}`,new Blob([r.buf]),"application/octet-stream")}if(!this.vp.desc)return this.toast("There is no part to export yet.","error");this.toast(`Making the ${e.toUpperCase()} file\u2026`);let t=await this.send({type:"export",format:e,doc:this.doc,stopAt:this.doc.rollback??this.doc.features.length});if(t.type==="error")return this.toast("Export failed: "+t.msg,"error");this.download(`${this.safeName()}.${e==="stl"?"stl":"step"}`,new Blob([t.buf]),"application/octet-stream")}screenshot(){let e=this.vp.snapshot(),t=document.createElement("a");t.href=e,t.download=this.safeName()+".png",t.click()}},Vy={XY:{origin:[0,0,0],xDir:[1,0,0],normal:[0,0,1]},XZ:{origin:[0,0,0],xDir:[1,0,0],normal:[0,-1,0]},YZ:{origin:[0,0,0],xDir:[0,1,0],normal:[1,0,0]}};function Gy(s){let e=s.normal,t=e[0]*s.center[0]+e[1]*s.center[1]+e[2]*s.center[2],n=e.map(r=>qt(r*t)),i;if(Math.abs(e[2])>.9)i=[1,0,0];else{i=[-e[1],e[0],0];let r=Math.hypot(i[0],i[1]);i=[i[0]/r,i[1]/r,0]}return{origin:n,xDir:i.map(r=>qt(r)),normal:e.map(r=>qt(r)),faceRef:[...s.center.map(qt),...e.map(qt)]}}function ui(s,e){if(e&&e.edit){let t=s.featureIndex(e.edit);return{editIndex:t,feature:Cc(s.doc.features[t])}}return{editIndex:null,feature:null}}function ad(s,e){let t=e??s.doc.rollback??s.doc.features.length;return s.doc.features.slice(0,t).filter(n=>n.type==="sketch")}function Wy(s,e){let t=e??s.doc.rollback??s.doc.features.length;return s.doc.features.slice(0,t).filter(n=>["extrude","revolve","hole","primitive"].includes(n.type)&&!n.suppressed)}function Oi(s,e){let t=e??s.doc.rollback??s.doc.features.length;return s.doc.features.slice(0,t).some(n=>["extrude","revolve","primitive"].includes(n.type)&&!n.suppressed)}var Xy={sketch(s){return s.vp.showPlanes(!0),{title:"New Sketch",help:"Click one of the colored origin planes, or a flat face of your part, to draw on it.",want:{faces:!0,planes:!0},fields:()=>[{type:"note",text:"Blue = XY (floor). Green = XZ (front). Red = YZ (side)."}],noOk:!0,onPick(e){if(!e)return;let t;if(e.kind==="plane")t=e.name;else if(e.kind==="face"){if(e.info.type!=="PLANE"){s.toast("That face is curved. Pick a flat face or an origin plane.","error");return}t=Gy(e.info)}else return;let n=t.faceRef;n&&delete t.faceRef;let i={id:s.newId(),type:"sketch",name:s.nextName("sketch"),plane:t,faceRef:n,offset:0,entities:[]};s.closeCmd(),s.change(()=>s.insertFeature(i)),s.enterSketch(i.id,!0)}}},extrude(s,e){let t=ui(s,e),n=ad(s,t.editIndex);if(!n.length)return s.toast("Make a sketch first (Model > Sketch).","error"),null;let i=n.filter(a=>!s.doc.features.some(l=>l.sketch===a.id)),r=Oi(s,t.editIndex),o=t.feature||{id:s.newId(),type:"extrude",name:s.nextName("extrude"),sketch:e&&e.sketch||(i[i.length-1]||n[n.length-1]).id,distance:Ht(10,s.units()),extent:"distance",direction:"normal",op:r?"join":"new",taper:0};return{title:t.editIndex!=null?"Edit "+o.name:"Extrude",help:'Pushes a closed sketch shape out into a solid. Use "Remove material" to cut pockets and holes.',feature:o,editIndex:t.editIndex,fields:()=>[{key:"sketch",label:"Sketch",type:"select",options:n.map(a=>[a.id,a.name])},{key:"extent",label:"How far",type:"select",options:[["distance","A distance"],["through","Through everything"]]},o.extent!=="through"&&{key:"distance",label:"Distance (mm)",type:"expr"},{key:"direction",label:"Direction",type:"select",options:[["normal","One way"],["reverse","Other way (flip)"],["both","Both ways (centered)"]]},r?{key:"op",label:"Operation",type:"select",options:Ac}:{type:"note",text:"This is the first solid, so it adds material."},{key:"taper",label:"Taper angle (\xB0)",type:"expr",hint:"0 = straight sides"}].filter(Boolean)}},revolve(s,e){let t=ui(s,e),n=ad(s,t.editIndex);if(!n.length)return s.toast("Make a sketch first (Model > Sketch).","error"),null;let i=n.filter(c=>!s.doc.features.some(h=>h.sketch===c.id)),r=Oi(s,t.editIndex),o=e&&e.sketch||(i[i.length-1]||n[n.length-1]).id,a=c=>{let h=s.findFeature(c),u=h&&h.entities.find(d=>d.type==="line"&&d.construction);return u?u.id:"Y"},l=t.feature||{id:s.newId(),type:"revolve",name:s.nextName("revolve"),sketch:o,axis:a(o),angle:360,op:r?"join":"new"};return{title:t.editIndex!=null?"Edit "+l.name:"Revolve",help:"Spins a sketch shape around an axis, like a lathe. Draw a dashed construction line in the sketch to use as the axis.",feature:l,editIndex:t.editIndex,fields:()=>{let c=s.findFeature(l.sketch),h=c?c.entities.filter(u=>u.type==="line"):[];return[{key:"sketch",label:"Sketch",type:"select",options:n.map(u=>[u.id,u.name]),onChange:()=>{l.axis=a(l.sketch)}},{key:"axis",label:"Axis",type:"select",options:[["X","Sketch's horizontal axis"],["Y","Sketch's vertical axis"],...h.map((u,d)=>[u.id,`${u.construction?"Construction line":"Line"} ${d+1} (${Se(+u.x1||0)},${Se(+u.y1||0)} \u2192 ${Se(+u.x2||0)},${Se(+u.y2||0)})`])]},{key:"angle",label:"Angle (\xB0)",type:"expr"},r?{key:"op",label:"Operation",type:"select",options:Ac}:{type:"note",text:"This is the first solid, so it adds material."}]}}},hole(s,e){let t=ui(s,e);if(!Oi(s,t.editIndex))return s.toast("Make a solid first, then put holes in it.","error"),null;let n=t.feature||{id:s.newId(),type:"hole",name:s.nextName("hole"),origin:null,normal:null,diameter:Ht(5,s.units()),extent:"through",depth:Ht(10,s.units()),style:"simple",cbDiameter:Ht(9,s.units()),cbDepth:Ht(3,s.units())},i={title:t.editIndex!=null?"Edit "+n.name:"Hole",help:"Click a flat face where the hole should go. Then type exact X, Y, Z numbers if you need to.",feature:t.feature?n:null,draft:n,editIndex:t.editIndex,want:{faces:!0},fields:()=>[n.origin?{type:"xyz",key:"origin",label:"Center (mm)"}:{type:"note",text:"\u{1F449} Click a flat face to place the hole."},{key:"diameter",label:"Diameter (mm)",type:"expr"},{key:"extent",label:"Depth",type:"select",options:[["through","All the way through"],["depth","A set depth"]]},n.extent==="depth"&&{key:"depth",label:"Depth (mm)",type:"expr"},{key:"style",label:"Type",type:"select",options:[["simple","Plain hole"],["counterbore","Counterbore (for bolt heads)"],["countersink","Countersink (for flat screws)"]]},n.style!=="simple"&&{key:"cbDiameter",label:n.style==="counterbore"?"Counterbore diameter":"Countersink diameter",type:"expr"},n.style==="counterbore"&&{key:"cbDepth",label:"Counterbore depth",type:"expr"}].filter(Boolean),onPick(r){if(!(!r||r.kind!=="face")){if(r.info.type!=="PLANE"){s.toast("Holes go on flat faces.","error");return}n.origin=r.point.map(qt),n.normal=r.info.normal.map(qt),n.faceRef=[...r.info.center.map(qt),...n.normal],i.feature=n,s.cmdChanged()}},validate:()=>n.origin?null:"Click a flat face to place the hole first.",highlights:()=>n.origin?[{kind:"point",point:n.origin,color:ln.selEdge}]:[]};return i},primitive(s,e){let t=ui(s,e),n=e&&e.shape||t.feature&&t.feature.shape||"box",i=Oi(s,t.editIndex),r=s.units(),o={box:{w:Ht(40,r),d:Ht(30,r),h:Ht(20,r)},cylinder:{diameter:Ht(30,r),h:Ht(40,r),axis:"Z"},sphere:{diameter:Ht(40,r)}},a={box:"Box",cylinder:"Cylinder",sphere:"Sphere"},l=t.feature||{id:s.newId(),type:"primitive",shape:n,name:a[n]+(s.doc.features.filter(c=>c.shape===n).length+1),...o[n],x:0,y:0,z:0,op:i?"join":"new"};return{title:t.editIndex!=null?"Edit "+l.name:a[n],help:n==="box"?"A box sitting on its position point (centered left/right and front/back).":n==="cylinder"?"A cylinder starting at the position point, going along the axis.":"A ball centered on the position point.",feature:l,editIndex:t.editIndex,fields:()=>[n==="box"&&{key:"w",label:"Width X (mm)",type:"expr"},n==="box"&&{key:"d",label:"Depth Y (mm)",type:"expr"},n==="box"&&{key:"h",label:"Height Z (mm)",type:"expr"},n!=="box"&&{key:"diameter",label:"Diameter (mm)",type:"expr"},n==="cylinder"&&{key:"h",label:"Length (mm)",type:"expr"},n==="cylinder"&&{key:"axis",label:"Points along",type:"select",options:Va},{key:"x",label:"Position X",type:"expr"},{key:"y",label:"Position Y",type:"expr"},{key:"z",label:"Position Z",type:"expr"},i?{key:"op",label:"Operation",type:"select",options:Ac}:null].filter(Boolean)}},fillet(s,e){return ld(s,e,"fillet")},chamfer(s,e){return ld(s,e,"chamfer")},shell(s,e){let t=ui(s,e);if(!Oi(s,t.editIndex))return s.toast("Make a solid first.","error"),null;let n=t.feature||{id:s.newId(),type:"shell",name:s.nextName("shell"),thickness:Ht(2,s.units()),faces:[]},i=()=>hd(s.vp.desc&&s.vp.desc.faces,n.faces,"center");return{title:t.editIndex!=null?"Edit "+n.name:"Shell",help:"Hollows out the part, leaving walls of the thickness you choose. Click faces to leave open (like the top of a cup).",feature:n,editIndex:t.editIndex,picksOnBase:!0,preview:!1,want:{faces:!0},fields:()=>[{key:"thickness",label:"Wall thickness (mm)",type:"expr"},{type:"note",text:n.faces.length?`${n.faces.length} open face(s). Click a face again to close it.`:"\u{1F449} Click the flat face(s) to leave open, like the top of a box."},{type:"preview"}],validate:()=>n.faces.length?null:"Click at least one flat face to leave open.",onPick(r){if(!r||r.kind!=="face")return;let o=r.info.center.map(qt),a=n.faces.findIndex(l=>Rs(l,o)<.5);if(a>=0)n.faces.splice(a,1);else if(r.info.type!=="PLANE"){s.toast("Pick a flat face to leave open.","error");return}else n.faces.push([...o,...r.info.normal.map(qt)]);s.cmdChanged()},highlights:()=>i().map(r=>({kind:"face",index:r,color:ln.selFace}))}},pattern(s,e){let t=ui(s,e),n=e&&e.kind||t.feature&&t.feature.kind||"rect",i=Wy(s,t.editIndex);if(!i.length)return s.toast("Make a feature to copy first (an extrusion, revolution, hole or shape).","error"),null;let r=[i[i.length-1].id],o={rect:"Rectangular Pattern",circ:"Circular Pattern",mirror:"Mirror"},a={rect:{d1:"X",n1:3,s1:Ht(20,s.units()),d2:"Y",n2:1,s2:Ht(20,s.units())},circ:{axis:"Z",n:6,angle:360},mirror:{plane:"YZ"}},l=o[n].replace(/ /g,""),c=1;for(;s.doc.features.some(d=>d.name===l+c);)c++;let h=t.feature||{id:s.newId(),type:"pattern",kind:n,name:l+c,features:r,...a[n]},u=i.map(d=>[d.id,d.name]);return{title:t.editIndex!=null?"Edit "+h.name:o[n],help:n==="rect"?"Copies features in rows and columns.":n==="circ"?"Copies features around an axis, like bolt holes on a wheel.":"Makes a mirror copy of features on the other side of a plane.",feature:h,editIndex:t.editIndex,fields:()=>[{key:"features",label:"Features to copy",type:"multi",options:u},...n==="rect"?[{key:"d1",label:"Direction 1",type:"select",options:Va},{key:"flip1",label:"Flip direction 1",type:"check"},{key:"n1",label:"Count",type:"expr"},{key:"s1",label:"Spacing (mm)",type:"expr"},{key:"d2",label:"Direction 2",type:"select",options:Va},{key:"flip2",label:"Flip direction 2",type:"check"},{key:"n2",label:"Count",type:"expr"},{key:"s2",label:"Spacing (mm)",type:"expr"}]:n==="circ"?[{key:"axis",label:"Around",type:"select",options:Va},{key:"n",label:"Count (with the original)",type:"expr"},{key:"angle",label:"Total angle (\xB0)",type:"expr",hint:"360 = all the way around"}]:[{key:"plane",label:"Mirror across",type:"select",options:od}]],validate:()=>h.features.length?null:"Pick at least one feature to copy."}},mirrorBody(s,e){let t=ui(s,e);if(!Oi(s,t.editIndex))return s.toast("Make a solid first.","error"),null;let n=t.feature||{id:s.newId(),type:"mirrorBody",name:s.nextName("mirrorBody"),plane:"YZ"};return{title:t.editIndex!=null?"Edit "+n.name:"Mirror Part",help:"Copies the whole part to the other side of a plane and joins the two halves. Great for symmetric parts: model one half, then mirror.",feature:n,editIndex:t.editIndex,fields:()=>[{key:"plane",label:"Mirror across",type:"select",options:od}]}},measure(s){let e=[],t="Click a spot on the part, then a second spot. Click a round edge to see its diameter.";return{title:"Measure",help:"Measures straight-line distance between two clicked points. Clicks near a corner snap to it.",want:{faces:!0,edges:!0},noOk:!0,closeLabel:"Done",fields:()=>[{type:"html",html:t}],onPick(i){if(!i)return;let r=s.vp.desc,o=i.point,a="";if(i.kind==="edge"){let l=$y(r,i.index),c=[l[0],l[l.length-1]],h=s.vp.pixelSize()*12,u=c.find(f=>Rs(f,o)<h);u&&(o=u);let d=l.reduce((f,m,y)=>y?f+Rs(m,l[y-1]):0,0);if(a=`Edge length: <b>${Se(d)} ${s.units()}</b>`,r.edges[i.index].type==="CIRCLE"&&l.length>3){let f=qy(l[0],l[Math.floor(l.length/3)],l[Math.floor(2*l.length/3)]);f&&(a+=`<br>Round edge: <b>\xD8 ${Se(2*f.r)} ${s.units()}</b> (radius ${Se(f.r)})`)}}if(e.length>=2&&(e.length=0),e.push(o.map(qt)),e.length===1)t=`First point: (${e[0].map(Se).join(", ")})<br>${a}<br>Now click a second point.`;else{let[l,c]=e;t=`Distance: <b class="big">${Se(Rs(l,c))} ${s.units()}</b><br>X: ${Se(Math.abs(c[0]-l[0]))} &nbsp; Y: ${Se(Math.abs(c[1]-l[1]))} &nbsp; Z: ${Se(Math.abs(c[2]-l[2]))}<br>${a}<br><span class="muted">Click again to start a new measurement.</span>`}s.ui.refreshCmd(),s.refreshHighlights()},highlights:()=>[...e.map(i=>({kind:"point",point:i,color:ln.selEdge})),...e.length===2?[{kind:"segment",points:e,color:ln.selEdge}]:[]]}},params(s){return s.ui.openParams(),null},info(s){return s.ui.openInfo(),null}};function ld(s,e,t){let n=ui(s,e);if(!Oi(s,n.editIndex))return s.toast("Make a solid first.","error"),null;let i=n.feature||{id:s.newId(),type:t,name:s.nextName(t),radius:Ht(t==="fillet"?2:1,s.units()),allEdges:!1,edges:[]},r=()=>hd(s.vp.desc&&s.vp.desc.edges,i.edges,"mid"),o=t==="fillet"?"round":"bevel";return{title:n.editIndex!=null?"Edit "+i.name:t==="fillet"?"Fillet":"Chamfer",help:`Click the edges to ${o}. Click an edge again to un-pick it. Tick "Preview" to see the result.`,feature:i,editIndex:n.editIndex,picksOnBase:!0,preview:!1,want:{edges:!0},fields:()=>[{key:"radius",label:t==="fillet"?"Radius (mm)":"Distance (mm)",type:"expr"},{key:"allEdges",label:"Every edge of the part",type:"check"},!i.allEdges&&{type:"note",text:i.edges.length?`${i.edges.length} edge(s) picked.`:"\u{1F449} Click edges on the part."},{type:"preview"}].filter(Boolean),onPick(a){if(!a||a.kind!=="edge"||i.allEdges)return;let l=s.vp.desc.edges[a.index].mid.map(qt),c=i.edges.findIndex(h=>Rs(h,l)<.5);c>=0?i.edges.splice(c,1):i.edges.push(l),s.cmdChanged()},validate:()=>!i.allEdges&&!i.edges.length?'Pick at least one edge (or tick "Every edge").':null,highlights:()=>i.allEdges?[]:r().map(a=>({kind:"edge",index:a,color:ln.selEdge}))}}function Rs(s,e){return Math.hypot(s[0]-e[0],s[1]-e[1],s[2]-e[2])}function hd(s,e,t){if(!s)return[];let n=[];for(let i of e){let r=-1,o=.5;s.forEach((a,l)=>{let c=Rs(a[t],i);c<o&&(o=c,r=l)}),r>=0&&n.push(r)}return n}function $y(s,e){let[t,n]=s.edgeGroups[e],i=[];for(let r=t;r<t+n;r++)i.push([s.lines[r*3],s.lines[r*3+1],s.lines[r*3+2]]);return i}function qy(s,e,t){let n=e.map((d,f)=>d-s[f]),i=t.map((d,f)=>d-s[f]),r=[n[1]*i[2]-n[2]*i[1],n[2]*i[0]-n[0]*i[2],n[0]*i[1]-n[1]*i[0]],o=r[0]**2+r[1]**2+r[2]**2;if(o<1e-12)return null;let a=n[0]**2+n[1]**2+n[2]**2,l=i[0]**2+i[1]**2+i[2]**2,c=[r[1]*n[2]-r[2]*n[1],r[2]*n[0]-r[0]*n[2],r[0]*n[1]-r[1]*n[0]],u=[i[1]*r[2]-i[2]*r[1],i[2]*r[0]-i[0]*r[2],i[0]*r[1]-i[1]*r[0]].map((d,f)=>(d*a+c[f]*l)/(2*o));return{r:Math.hypot(...u)}}var Ic=class{constructor(e){this.app=e,this.treeSel=null,this.tab="model",this.infoOpen=!1,Pe("#tree").addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("click",()=>this.closeMenu()),Pe("#docName").addEventListener("change",t=>{let n=t.target.value.trim()||"Part1";e.change(()=>{(e.mode==="assembly"?e.asm:e.doc).name=n})})}get vp(){return this.app.vp}ribbonDefs(){let e=this.app;return{file:[["File",[["new","New Part",()=>e.newFile()],["assembly","New Assembly",()=>e.newAssemblyFile()],["open","Open",()=>e.openFile(),"Ctrl+O"],["save","Save",()=>e.saveFile(),"Ctrl+S"],...e.asm&&e.editPid?[["save","Save part only",()=>e.saveFile(!0)]]:[]]],["Export",[["stl","STL (3D print)",()=>e.exportFile("stl")],["stl","STEP (other CAD)",()=>e.exportFile("step")],["camera","Picture",()=>e.screenshot()]]],["Setup",[["units","Units",()=>this.openUnits()]]],["Learn",[["examples","Examples",()=>this.openExamples()],["help","How to",()=>this.openHelp()]]]],model:[...e.asm&&e.editPid?[["Assembly",[["back","Back to assembly",()=>e.returnToAssembly()]]]]:[],["Sketch",[["sketch","Sketch",()=>e.run("sketch"),"S"]]],["Create",[["extrude","Extrude",()=>e.run("extrude"),"E"],["revolve","Revolve",()=>e.run("revolve"),"R"],["hole","Hole",()=>e.run("hole"),"H"]]],["Shapes",[["box","Box",()=>e.run("primitive",{shape:"box"})],["cylinder","Cylinder",()=>e.run("primitive",{shape:"cylinder"})],["sphere","Sphere",()=>e.run("primitive",{shape:"sphere"})]]],["Modify",[["fillet","Fillet",()=>e.run("fillet"),"F"],["chamfer","Chamfer",()=>e.run("chamfer")],["shell","Shell",()=>e.run("shell")]]],["Pattern",[["rectPattern","Rectangular",()=>e.run("pattern",{kind:"rect"})],["circPattern","Circular",()=>e.run("pattern",{kind:"circ"})],["mirror","Mirror",()=>e.run("pattern",{kind:"mirror"})],["mirrorBody","Mirror Part",()=>e.run("mirrorBody")]]],["Setup",[["params","Parameters",()=>this.openParams()]]]],sketch:[["Draw",[["line","Line",()=>e.sk.setTool("line"),"L"],["rect","Rectangle",()=>e.sk.setTool("rect"),"R"],["circle","Circle",()=>e.sk.setTool("circle"),"C"],["arc","Arc",()=>e.sk.setTool("arc"),"A"],["polygon","Polygon",()=>e.sk.setTool("polygon"),"P"],["slot","Slot",()=>e.sk.setTool("slot"),"O"]]],["Edit",[["select","Select",()=>e.sk.setTool("select"),"S"],["construction","Construction",()=>e.sk.toggleConstruction(),"X"],["trash","Delete",()=>e.sk.deleteSelected(),"Del"]]],["Rules",[...["coincident","horizontal","vertical","parallel","perpendicular","equal","tangent","concentric","midpoint","fix"].map(t=>["g:"+zt[t].glyph,zt[t].label,()=>e.sk.setTool("c:"+t)]),["g:A","Auto rules",()=>{e.sk.autoCons=!e.sk.autoCons,this.renderRibbon(),e.toast(e.sk.autoCons?"Auto rules on: joined ends, level and upright lines get rules while you draw.":"Auto rules off.")}],["eye","Show rules",()=>{e.sk.showCons=!e.sk.showCons,this.renderRibbon(),e.sk.redraw()}]]],["View",[["look","Look at",()=>e.sk.lookAt()],["grid","Snap to grid",()=>e.toggleGrid(),"G"]]],["Setup",[["params","Parameters",()=>this.openParams()]]],["Exit",[["finish","Finish Sketch",()=>e.exitSketch()]]]],inspect:e.mode==="assembly"?[["Measure",[["measure","Measure",()=>e.run("measure"),"M"]]],["Check",[["clash","Interference",()=>e.asmr.checkInterference()],["bom","Parts list",()=>e.asmr.openPartsList()]]]]:[["Measure",[["measure","Measure",()=>e.run("measure"),"M"],["info","Part Info",()=>this.openInfo()]]]],assemble:[["Parts",[["place","Place",()=>e.run("place"),"P"],["move","Move / Turn",()=>e.run("moveComp"),"G"]]],["Constrain",[["mate","Mate",()=>e.run("constrain",{type:"mate"}),"C"],["flush","Flush",()=>e.run("constrain",{type:"flush"})],["insert","Insert",()=>e.run("constrain",{type:"insert"})],["axisMate","Axis",()=>e.run("constrain",{type:"axis"})],["angleMate","Angle",()=>e.run("constrain",{type:"angle"})]]],["Check",[["clash","Interference",()=>e.asmr.checkInterference()],["bom","Parts list",()=>e.asmr.openPartsList()]]]],view:[["Orientation",[["home","Home",()=>this.vp.setView("home"),"F6"],["front","Front",()=>this.vp.setView("front")],["top","Top",()=>this.vp.setView("top")],["right","Right",()=>this.vp.setView("right")],["fit","Zoom all",()=>this.vp.fit()]]],["Style",[["shaded","Shaded",()=>this.setStyle("shaded")],["edges","With edges",()=>this.setStyle("edges")],["wire","Wireframe",()=>this.setStyle("wire")]]],["Show",[["planes","Origin planes",()=>this.vp.showPlanes(!this.vp.planesVisible)]]],["Picture",[["camera","Save picture",()=>this.app.screenshot()]]]]}}setStyle(e){this.vp.applyStyle(e),this.renderRibbon()}renderRibbon(){let e=this.app.mode,t=e==="sketch"?[["sketch","Sketch"],["inspect","Inspect"],["view","View"]]:e==="assembly"?[["file","File"],["assemble","Assemble"],["inspect","Inspect"],["view","View"]]:[["file","File"],["model","Model"],["inspect","Inspect"],["view","View"]];t.some(r=>r[0]===this.tab)||(this.tab=t[0][0]==="file"?t[1][0]:t[0][0]),Pe("#tabs").innerHTML=t.map(([r,o])=>`<button class="tab ${r===this.tab?"on":""} ${r==="sketch"?"sketchtab":""}" data-tab="${r}">${o}</button>`).join("")+`<span class="spacer"></span><button class="tb-btn" id="undoBtn" title="Undo (Ctrl+Z)">${tt("undo",18)}</button><button class="tb-btn" id="redoBtn" title="Redo (Ctrl+Y)">${tt("redo",18)}</button><button class="tb-btn" id="helpBtn" title="How to use Pathway CAD">${tt("help",18)}</button>`;for(let r of document.querySelectorAll("#tabs .tab"))r.onclick=()=>{this.tab=r.dataset.tab,this.renderRibbon()};Pe("#undoBtn").onclick=()=>this.app.undo(),Pe("#redoBtn").onclick=()=>this.app.redo(),Pe("#helpBtn").onclick=()=>this.openHelp();let n=this.ribbonDefs()[this.tab],i=Pe("#ribbon");i.innerHTML="";for(let[r,o]of n){let a=document.createElement("div"),l=r==="Rules";a.className="rgroup"+(r==="Exit"?" exit":"")+(r==="Assembly"?" back":"")+(l?" compact":"");let c=document.createElement("div");c.className="rbtns";for(let[u,d,f,m]of o){let y=document.createElement("button");y.className="rbtn",y.dataset.ic=u,y.innerHTML=tt(u,l?17:26)+`<span>${Ae(d)}</span>`,y.title=d+(m?` (${m})`:""),y.onclick=g=>{g.stopPropagation(),f()},this.tab==="view"&&["shaded","edges","wire"].includes(u)&&this.vp&&this.vp.style===u&&y.classList.add("on"),c.appendChild(y)}a.appendChild(c);let h=document.createElement("div");h.className="rcap",h.textContent=r,a.appendChild(h),i.appendChild(a)}this.app.mode==="sketch"&&this.sketchToolChanged(this.app.sk.tool)}sketchToolChanged(e){for(let t of document.querySelectorAll("#ribbon .rbtn")){let n=t.dataset.ic,i=this.app.sk,r=e&&e.startsWith("c:")&&n==="g:"+(zt[e.slice(2)]||{}).glyph;t.classList.toggle("on",n===e||r||n==="grid"&&i&&i.gridOn||n==="g:A"&&i&&i.autoCons||n==="eye"&&i&&i.showCons)}this.app.mode==="sketch"&&this.renderSketchPanel()}renderTitle(){let e=Pe("#docName"),t=this.app.mode==="assembly"?this.app.asm:this.app.doc;document.activeElement!==e&&(e.value=t.name||"Part1"),document.title=`${t.name||"Part"} - Pathway CAD`}renderTree(){let e=this.app,t=e.doc;if(e.mode==="assembly"){e.asmr.renderTree(Pe("#tree"));return}let n=e.result.errors||{},i=e.result.warnings||{},r=t.rollback??t.features.length,o=e.asm&&e.editPid?`<div class="trow backrow" data-act="back">${tt("back",16)}<span>Back to ${Ae(e.asm.name)}</span></div>`:"";o+=`<div class="trow root">${tt("part",16)}<b>${Ae(t.name||"Part1")}</b></div>`,o+=`<div class="trow sub" data-act="origin">${tt("origin",16)}<span>Origin</span><span class="tmeta">${e.vp&&e.vp.planesVisible?"shown":""}</span></div>`;let a=`<div class="trow endrow" data-act="end" title="Features below this line are switched off. Drag it with the menu on a feature: 'Roll back to here'.">${tt("end",16)}<span>End of Part</span>${t.rollback!=null?'<button class="mini" data-act="toend">move to end</button>':""}</div>`;t.features.forEach((d,f)=>{f===r&&(o+=a);let m=Rc[d.type]||Rc.primitive,y=d.type==="primitive"?d.shape==="sphere"?"sphere":d.shape==="cylinder"?"cylinder":"box":d.type==="pattern"?d.kind==="circ"?"circPattern":d.kind==="mirror"?"mirror":"rectPattern":m.icon,g=d.type==="sketch"&&t.features.some(x=>x.sketch===d.id),p=n[d.id],w=i[d.id],M=["trow","feat",f>=r?"after":"",d.suppressed?"supp":"",this.treeSel===d.id?"sel":"",p?"bad":"",e.mode==="sketch"&&e.sketchId===d.id?"editing":"",g?"consumed":""].join(" ");o+=`<div class="${M}" data-id="${d.id}" title="${Ae(p||w||"Double-click to edit. Right-click for more.")}">${tt(y,16)}<span class="tname">${Ae(d.name)}</span>${p?`<span class="tbad">${tt("err",14)}</span>`:w?`<span class="twarn">${tt("warn",14)}</span>`:""}</div>`}),r>=t.features.length&&(o+=a),t.features.length||(o+='<div class="tempty">Start with <b>Sketch</b> (or a Box) on the Model tab.</div>');let l=Pe("#tree");l.innerHTML=o;for(let d of l.querySelectorAll(".feat")){let f=d.dataset.id;d.onclick=m=>{m.stopPropagation(),this.treeSel=f,this.renderTree(),this.showFeatureError(f)},d.ondblclick=m=>{m.stopPropagation(),e.mode!=="sketch"&&e.editFeature(f)},d.oncontextmenu=m=>{m.preventDefault(),m.stopPropagation(),this.treeSel=f,this.renderTree(),this.featureMenu(f,m.clientX,m.clientY)}}let c=l.querySelector("[data-act=origin]");c&&(c.onclick=()=>{this.vp.showPlanes(!this.vp.planesVisible),this.renderTree()});let h=l.querySelector("[data-act=back]");h&&(h.onclick=()=>e.returnToAssembly());let u=l.querySelector("[data-act=toend]");u&&(u.onclick=d=>{d.stopPropagation(),e.change(()=>{e.doc.rollback=null})})}showFeatureError(e){let t=(this.app.result.errors||{})[e],n=(this.app.result.warnings||{})[e];t?this.toast(t,"error"):n&&this.toast(n,"warn")}featureMenu(e,t,n){let i=this.app,r=i.findFeature(e),o=i.featureIndex(e),a=[];i.mode!=="sketch"&&(a.push([r.type==="sketch"?"Edit sketch":"Edit",()=>i.editFeature(e)]),r.sketch&&a.push(["Edit its sketch",()=>i.enterSketch(r.sketch)])),a.push(["Rename",()=>this.askText("Rename",r.name,l=>i.change(()=>{i.findFeature(e).name=l}))]),i.mode!=="sketch"&&(a.push([r.suppressed?"Turn on (unsuppress)":"Turn off (suppress)",()=>i.change(()=>{let l=i.findFeature(e);l.suppressed=!l.suppressed})]),a.push(["Roll back to here",()=>i.change(()=>{i.doc.rollback=o})]),o>0&&a.push(["Move up",()=>i.change(()=>{let l=i.doc.features;if(cd(l[o],l[o-1])){i.toast(`${l[o].name} uses ${l[o-1].name}, so it must stay below it.`,"error");return}[l[o-1],l[o]]=[l[o],l[o-1]]})]),o<i.doc.features.length-1&&a.push(["Move down",()=>i.change(()=>{let l=i.doc.features;if(cd(l[o+1],l[o])){i.toast(`${l[o+1].name} uses ${l[o].name}, so it must stay below it.`,"error");return}[l[o+1],l[o]]=[l[o],l[o+1]]})]),a.push(["Delete",()=>i.deleteFeature(e),"danger"])),this.menu(a,t,n)}menu(e,t,n){this.closeMenu();let i=document.createElement("div");i.className="ctxmenu";for(let[o,a,l]of e){let c=document.createElement("button");c.textContent=o,l&&(c.className=l),c.onclick=h=>{h.stopPropagation(),this.closeMenu(),a()},i.appendChild(c)}document.body.appendChild(i);let r=i.getBoundingClientRect();i.style.left=Math.min(t,innerWidth-r.width-8)+"px",i.style.top=Math.min(n,innerHeight-r.height-8)+"px",this.menuEl=i}closeMenu(){this.menuEl&&(this.menuEl.remove(),this.menuEl=null)}openCmd(e){this.cmdEl=Pe("#cmdPanel"),this.cmdEl.hidden=!1,this.refreshCmd(),this.status(e.help)}closeCmd(){let e=Pe("#cmdPanel");e.hidden=!0,e.innerHTML=""}cmdError(e){let t=Pe("#cmdPanel .cmderr");t&&(t.hidden=!e,t.textContent=e?"\u26A0 "+e:"")}refreshCmd(){let e=this.app,t=e.cmd;if(!t)return;let n=Pe("#cmdPanel"),i=t.target||t.feature||t.draft||{},r=e.params(),o=`<div class="cmdhead"><span>${Ae(t.title)}</span><button class="x" data-act="cancel" title="Cancel (Esc)">\xD7</button></div><div class="cmdhelp">${Ae(t.help)}</div><div class="cmdbody">`,a=e.units(),l=(t.fields?t.fields():[]).map(d=>d&&d.label&&a!=="mm"?{...d,label:d.label.replace("(mm)",`(${a})`)}:d);l.forEach((d,f)=>{if(d.type==="note")o+=`<div class="note">${Ae(d.text)}</div>`;else if(d.type==="html")o+=`<div class="note">${d.html}</div>`;else if(d.type==="preview")o+=`<label class="chk"><input type="checkbox" data-preview ${t.preview?"checked":""}> Preview the result</label>`;else if(d.type==="expr"){let m=cn(i[d.key],r),y=m.ok?String(i[d.key]).trim()===Se(m.v)?"":"= "+Se(m.v):m.err;o+=`<label class="fld"><span>${Ae(d.label)}</span><input data-i="${f}" value="${Ae(i[d.key]??"")}" spellcheck="false" autocomplete="off"><em class="${m.ok?"":"bad"}">${Ae(y)}${d.hint&&m.ok?`<i>${Ae(d.hint)}</i>`:""}</em></label>`}else if(d.type==="select")o+=`<label class="fld"><span>${Ae(d.label)}</span><select data-i="${f}">${d.options.map(([m,y])=>`<option value="${Ae(m)}" ${String(i[d.key])===String(m)?"selected":""}>${Ae(y)}</option>`).join("")}</select></label>`;else if(d.type==="check")o+=`<label class="chk"><input type="checkbox" data-i="${f}" ${i[d.key]?"checked":""}> ${Ae(d.label)}</label>`;else if(d.type==="multi"){let m=new Set(i[d.key]||[]);o+=`<div class="fld"><span>${Ae(d.label)}</span><div class="multi">${d.options.map(([y,g])=>`<label class="chk"><input type="checkbox" data-i="${f}" data-v="${Ae(y)}" ${m.has(y)?"checked":""}> ${Ae(g)}</label>`).join("")}</div></div>`}else if(d.type==="buttons")o+=`<div class="fld">${d.label?`<span>${Ae(d.label)}</span>`:""}<div class="btnrow">${d.items.map(([m],y)=>`<button data-b="${f}:${y}">${Ae(m)}</button>`).join("")}</div></div>`;else if(d.type==="xyz"){let m=i[d.key]||[0,0,0];o+=`<div class="fld"><span>${Ae(d.label)}</span><div class="xyz">${["X","Y","Z"].map((y,g)=>`<label>${y}<input data-i="${f}" data-k="${g}" value="${Se(m[g])}"></label>`).join("")}</div></div>`}}),o+=`</div><div class="cmderr" hidden></div><div class="cmdfoot">${t.noOk?"":'<button class="ok" data-act="ok">OK</button>'}<button data-act="cancel">${Ae(t.closeLabel||"Cancel")}</button></div>`;let c=document.activeElement&&n.contains(document.activeElement)?document.activeElement.dataset.i:null;n.innerHTML=o,n.querySelectorAll("[data-act=cancel]").forEach(d=>d.onclick=()=>e.cancelCmd());let h=n.querySelector("[data-act=ok]");h&&(h.onclick=()=>e.okCmd());for(let d of n.querySelectorAll("[data-b]")){let[f,m]=d.dataset.b.split(":").map(Number);d.onclick=()=>l[f].items[m][1]()}let u=n.querySelector("[data-preview]");u&&(u.onchange=()=>{t.preview=u.checked,e.hoverPick=null,e.cmdChanged()});for(let d of n.querySelectorAll("[data-i]")){let f=l[+d.dataset.i],m=()=>{if(f.type==="expr")i[f.key]=Tr(d.value);else if(f.type==="select")i[f.key]=d.value;else if(f.type==="check")i[f.key]=d.checked;else if(f.type==="multi"){let y=new Set(i[f.key]||[]);d.checked?y.add(d.dataset.v):y.delete(d.dataset.v),i[f.key]=f.options.map(g=>g[0]).filter(g=>y.has(g))}else if(f.type==="xyz"){let y=cn(d.value,r);if(!y.ok)return;i[f.key]=[...i[f.key]||[0,0,0]],i[f.key][+d.dataset.k]=qt(y.v)}if(f.onChange&&f.onChange(),f.type==="expr"){let y=cn(i[f.key],r),g=d.nextElementSibling;if(g.className=y.ok?"":"bad",g.textContent=y.ok?String(i[f.key]).trim()===Se(y.v)?"":"= "+Se(y.v):y.err,t.onField){y.ok&&t.onField(f);return}e.refreshHighlights(),e.rebuild()}else t.onField&&t.onField(f),e.cmdChanged()};d.addEventListener(f.type==="expr"?"input":"change",m),f.type==="xyz"&&d.addEventListener("change",()=>e.cmdChanged())}if(c!=null){let d=n.querySelector(`[data-i="${c}"]`);d&&d.focus()}else{let d=n.querySelector("input[data-i]:not([type=checkbox])");d&&!e.cmd.want&&(d.focus(),d.select())}}enterSketch(){this.tab="sketch",this.renderRibbon(),document.body.classList.add("sketching"),Pe("#sketchPanel").hidden=!1,this.renderSketchPanel(),this.renderTree()}exitSketch(){document.body.classList.remove("sketching"),Pe("#sketchPanel").hidden=!0,this.tab="model",this.renderRibbon(),this.renderTree()}sketchSelection(){this.renderSketchPanel()}sketchInfo(e){let t=Pe("#sketchStats");if(!t)return;let n=(e.loops||[]).filter(l=>l.depth%2===0).length,i=(e.evals||[]).filter(l=>l.err),r=this.app.sketchFeature(),o=r&&r.constraints?r.constraints.length:0,a=e.badCons?e.badCons.size:0;t.innerHTML=`${n?`<span class="good">\u2714 ${n} closed shape${n>1?"s":""}</span>`:'<span class="muted">No closed shape yet</span>'}${e.openEnds?` \xB7 <span class="bad">${e.openEnds} open chain${e.openEnds>1?"s":""} (red dots)</span>`:""}${i.length?` \xB7 <span class="bad">${Ae(i[0].err)}</span>`:""}${o?` \xB7 ${o} rule${o>1?"s":""}`:""}${a?` \xB7 <span class="bad">${a} not met</span>`:""}`}setGridStep(e){let t=Pe("#gridStep");t&&(t.textContent=this.app.sk.gridOn?`grid ${Se(e)} ${this.app.units()}`:"grid off")}renderSketchPanel(){let e=this.app,t=e.sk,n=e.sketchFeature();if(!n)return;let i=e.params(),r=n.entities.filter(m=>t.sel.has(m.id)),o=`<div class="cmdhead"><span>${Ae(n.name)}</span></div>`;if(o+='<div class="note" id="sketchStats"></div>',o+='<div class="cmdbody">',t.tool==="polygon"&&(o+=`<label class="fld"><span>Polygon sides</span><input id="polySides" type="number" min="3" max="64" value="${t.polySides}"></label>`),r.length===1){let m=r[0],y={line:[["x1","Start X"],["y1","Start Y"],["x2","End X"],["y2","End Y"]],rect:[["x","Corner X"],["y","Corner Y"],["w","Width"],["h","Height"]],circle:[["cx","Center X"],["cy","Center Y"],["r","Radius"]],arc:[["x1","Start X"],["y1","Start Y"],["x2","End X"],["y2","End Y"],["xm","Through X"],["ym","Through Y"]],polygon:[["cx","Center X"],["cy","Center Y"],["r","Corner radius"],["n","Sides"],["rot","Turn (\xB0)"]],slot:[["x1","End 1 X"],["y1","End 1 Y"],["x2","End 2 X"],["y2","End 2 Y"],["w","Width"]]}[m.type]||[];o+=`<div class="subhead">${{line:"Line",rect:"Rectangle",circle:"Circle",arc:"Arc",polygon:"Polygon",slot:"Slot"}[m.type]}${m.construction?" (construction)":""}</div>`;for(let[w,M]of y){let x=cn(m[w],i);o+=`<label class="fld"><span>${M}</span><input data-k="${w}" value="${Ae(m[w])}" spellcheck="false"><em class="${x.ok?"":"bad"}">${x.ok?String(m[w]).trim()===Se(x.v)?"":"= "+Se(x.v):Ae(x.err)}</em></label>`}o+=`<label class="chk"><input type="checkbox" id="consChk" ${m.construction?"checked":""}> Construction (dashed helper line, not part of the shape)</label>`;let p=t.consFor(m.id);p.length&&(o+=`<div class="fld"><span>Rules on it</span><div class="rulelist">${p.map(w=>`<span class="rule ${t.badCons&&t.badCons.has(w.id)?"bad":""}">${Ae(t.consLabel(w))}<button data-delcons="${w.id}" title="Remove this rule">\xD7</button></span>`).join("")}</div></div>`)}else r.length>1?o+=`<div class="note">${r.length} items picked. Press Delete to remove them, or X for construction.</div>`:t.selCons.size?o+=`<div class="note">${[...t.selCons].map(m=>{let y=(n.constraints||[]).find(g=>g.id===m);return y?Ae(t.consLabel(y)):""}).join(", ")} rule picked. Press Delete to remove it.</div>`:o+=`<div class="note muted">${Ae(Yy[t.tool]||(t.tool.startsWith("c:")?zt[t.tool.slice(2)].label+": "+zt[t.tool.slice(2)].help+(t.picks.length?" (1 picked)":""):""))}</div>`;let a=n.offset??0,l=cn(a,i);o+=`<details class="planeopts"><summary>Sketch plane</summary><label class="fld"><span>Offset from plane (${e.units()})</span><input id="planeOff" value="${Ae(a)}"><em class="${l.ok?"":"bad"}">${l.ok?"":Ae(l.err)}</em></label></details>`,o+=`</div><div class="cmdfoot"><span id="gridStep" class="muted"></span><button class="ok" id="finishBtn">${tt("finish",16)} Finish Sketch</button></div>`;let c=Pe("#sketchPanel"),h=document.activeElement&&c.contains(document.activeElement)?document.activeElement.dataset.k:null;c.innerHTML=o;for(let m of c.querySelectorAll("[data-delcons]"))m.onclick=()=>t.deleteConstraints(new Set([m.dataset.delcons]));this.sketchInfo(t),this.setGridStep(t.gridStep()),Pe("#finishBtn").onclick=()=>e.exitSketch();let u=Pe("#polySides");u&&(u.onchange=()=>{t.polySides=Math.max(3,Math.min(64,Math.round(+u.value||6)))});let d=Pe("#consChk");d&&(d.onchange=()=>t.toggleConstruction());let f=Pe("#planeOff");f.onchange=()=>{let m=cn(f.value,i);if(!m.ok)return this.toast(m.err,"error");e.change(()=>{e.sketchFeature().offset=Tr(f.value)});let y=e.sketchId,g=e.sketchIsNew,p=e.savedCam;e.exitSketch(!0),e.enterSketch(y,g),e.savedCam=p};for(let m of c.querySelectorAll("input[data-k]"))m.addEventListener("change",()=>{let y=r[0],g=cn(m.value,i);if(!g.ok){this.toast(g.err,"error");return}let p=m.dataset.k,w=[cn(y[p==="y1"?"x1":p==="y2"?"x2":p],i).v,cn(y[p==="x1"?"y1":p==="x2"?"y2":p],i).v];e.change(()=>{let M=e.sketchFeature().entities.find(x=>x.id===y.id);if(["x1","y1","x2","y2"].includes(p)&&(y.type==="line"||y.type==="arc")){let x=p[1],T=t.coincident(w,{e:M,kx:"x"+x});M[p]=Tr(m.value);let A=cn(M["x"+x],i).v,R=cn(M["y"+x],i).v;for(let k of T)k.e[k.kx]=qt(A),k.e[k.ky]=qt(R)}else M[p]=Tr(m.value)}),t.recompute(),t.redraw(),this.renderSketchPanel()});if(h){let m=c.querySelector(`[data-k="${h}"]`);m&&m.focus()}}openParams(){let e=this.app,t=()=>{let n=e.params(),i=e.doc.params.map((r,o)=>{let a=cn(r.expr,n);return`<tr><td><input data-i="${o}" data-f="name" value="${Ae(r.name)}" spellcheck="false"></td><td><input data-i="${o}" data-f="expr" value="${Ae(r.expr)}" spellcheck="false"></td><td class="${a.ok?"":"bad"}">${a.ok?Se(a.v):Ae(a.err)}</td><td><input data-i="${o}" data-f="note" value="${Ae(r.note||"")}" placeholder="what it is for"></td><td><button class="mini danger" data-del="${o}">\u2715</button></td></tr>`}).join("");this.modal(`<h2>${tt("params",22)} Parameters</h2>
        <p>Name a size once and use the name anywhere you type a number, like <code>width</code> or <code>width/2 + 3</code>. Change it here and the whole part updates.</p>
        <table class="ptable"><thead><tr><th>Name</th><th>Value or formula</th><th>=</th><th>Note</th><th></th></tr></thead><tbody>${i||'<tr><td colspan="5" class="muted">No parameters yet.</td></tr>'}</tbody></table>
        <p><button id="addParam">+ Add parameter</button></p>
        <p class="muted">Formulas can use + \u2212 \xD7 \xF7 (written * and /), ^ for powers, brackets, other parameter names, pi, sqrt(), sin(), cos(), tan() (in degrees), min(), max(), round().</p>`,"wide"),Pe("#addParam").onclick=()=>{let r=1;for(;e.doc.params.some(o=>o.name==="size"+r);)r++;e.change(()=>e.doc.params.push({name:"size"+r,expr:"10",note:""})),t()};for(let r of document.querySelectorAll("#modal [data-del]"))r.onclick=()=>{let o=e.doc.params[+r.dataset.del];JSON.stringify(e.doc.features).match(new RegExp(`\\b${o.name}\\b`))&&!confirm(`"${o.name}" is used in the part. Delete it anyway? (Those features will show an error.)`)||(e.change(()=>e.doc.params.splice(+r.dataset.del,1)),t())};for(let r of document.querySelectorAll("#modal input[data-i]"))r.onchange=()=>{let o=+r.dataset.i,a=r.dataset.f,l=r.value.trim();if(a==="name"){if(!/^[A-Za-z_][A-Za-z_0-9]*$/.test(l)){this.toast("Names use letters, numbers and _ and start with a letter.","error"),t();return}if(["pi","PI","sin","cos","tan","sqrt","abs","min","max","round","floor","ceil"].includes(l)){this.toast(`"${l}" is a built-in name. Pick another.`,"error"),t();return}if(e.doc.params.some((u,d)=>d!==o&&u.name===l)){this.toast("That name is taken.","error"),t();return}let c=e.doc.params[o].name,h=c&&c!==l&&confirm(`Also change "${c}" to "${l}" everywhere it is used?`);e.change(()=>{if(e.doc.params[o].name=l,h){let u=new RegExp(`\\b${c}\\b`,"g"),d=f=>{for(let m in f)typeof f[m]=="string"&&m!=="id"&&m!=="name"&&m!=="type"?f[m]=f[m].replace(u,l):f[m]&&typeof f[m]=="object"&&d(f[m])};d(e.doc.features);for(let f of e.doc.params)f.expr=String(f.expr).replace(u,l)}})}else e.change(()=>{e.doc.params[o][a]=a==="expr"?Tr(l):l});t(),e.mode==="sketch"&&e.sk.redraw(),e.cmd&&this.refreshCmd()}};t()}openUnits(){let e=this.app,t=e.mode==="assembly",n=t?e.asm:e.doc,i=n.units||"mm",r=t?new Set:ed(n),o=t?[]:n.params;this.modal(`<h2>${tt("units",22)} Units for ${Ae(n.name)}</h2>
      <p>${t?"Positions and gaps in this assembly use these units. Each part keeps its own units and is sized correctly when placed.":"Every size you type in this part uses these units. Exported STL and STEP files are always in millimetres, which is what 3D printers and other CAD programs expect."}</p>
      ${Object.entries(wc).map(([a,l])=>`<label class="chk"><input type="radio" name="un" value="${a}" ${a===i?"checked":""}> ${l}</label>`).join("")}
      <label class="chk"><input type="checkbox" id="unConv" checked> Convert the sizes so the ${t?"assembly":"part"} stays the same real size</label>
      ${o.length?`<div class="fld" id="unParams"><span>Parameters to convert (tick the ones that are lengths)</span><div class="multi">${o.map(a=>`<label class="chk"><input type="checkbox" data-p="${Ae(a.name)}" ${r.has(a.name)?"checked":""}> ${Ae(a.name)} = ${Ae(a.expr)}</label>`).join("")}</div></div>`:""}
      <p class="muted">Untick "Convert" to keep the numbers as they are (a 10 mm block becomes a 10 in block).</p>
      <div class="welcomebtns"><button class="ok" id="unOk">Apply</button><button id="unNo">Cancel</button></div>`),Pe("#unNo").onclick=()=>this.closeModal(),Pe("#unOk").onclick=()=>{let a=document.querySelector("#modal input[name=un]:checked").value,l=Pe("#unConv").checked,c=new Set([...document.querySelectorAll("#modal [data-p]")].filter(u=>u.checked).map(u=>u.dataset.p));if(this.closeModal(),a===i)return;let h=0;e.change(()=>{if(n.units=a,!l)return;let u=hn[i]/hn[a];t?nd(n,u):h=td(n,u,c)}),e.mode==="sketch"&&(e.sk.recompute(),e.sk.redraw()),this.renderStatusInfo(),this.toast(`Now using ${wc[a]}.`+(h?` ${h} formula(s) with numbers in them were left as typed; check them.`:""),h?"warn":"")}}openInfo(){this.infoOpen=!0,this.renderInfo()}renderInfo(){let e=this.app,t=e.result.desc,n=e.doc,i=Ga[n.material]||Ga.pla,r='<p class="muted">There is no solid yet.</p>';if(t){let o=t.bb[1].map((d,f)=>d-t.bb[0][f]),a=n.units||"mm",l=hn[a],c=t.volume*l*l*l,h=t.area*l*l,u=c/1e3*i.density;r=`<table class="info">
        <tr><th>Size (X \xD7 Y \xD7 Z)</th><td>${o.map(Se).join(" \xD7 ")} ${a}</td></tr>
        <tr><th>Volume</th><td>${a==="in"?`${Se(t.volume)} in\xB3 <span class="muted">(${Se(c/1e3)} cm\xB3)</span>`:`${Se(c/1e3)} cm\xB3 <span class="muted">(${Se(c)} mm\xB3)</span>`}</td></tr>
        <tr><th>Surface area</th><td>${a==="in"?`${Se(t.area)} in\xB2 <span class="muted">(${Se(h/100)} cm\xB2)</span>`:`${Se(h/100)} cm\xB2 <span class="muted">(${Se(h)} mm\xB2)</span>`}</td></tr>
        <tr><th>Mass in ${Ae(i.name)}</th><td><b>${u>=1e3?Se(u/1e3)+" kg":Se(u)+" g"}</b> <span class="muted">(${Se(u/453.592)} lb \xB7 density ${i.density} g/cm\xB3)</span></td></tr>
        <tr><th>Faces / edges</th><td>${t.faces.length} / ${t.edges.length}</td></tr>
      </table>`}this.modal(`<h2>${tt("info",22)} Part Info: ${Ae(n.name)}</h2>${r}
      <label class="fld"><span>Material</span><select id="matSel">${Object.entries(Ga).map(([o,a])=>`<option value="${o}" ${o===n.material?"selected":""}>${Ae(a.name)}</option>`).join("")}</select></label>
      <label class="fld"><span>Color on screen</span><input type="color" id="colorSel" value="${Ae(n.color)}"></label>`,"",()=>{this.infoOpen=!1}),Pe("#matSel").onchange=o=>{e.change(()=>{e.doc.material=o.target.value}),this.renderInfo()},Pe("#colorSel").oninput=o=>{e.doc.color=o.target.value,this.vp.setColor(o.target.value)},Pe("#colorSel").onchange=o=>e.change(()=>{e.doc.color=o.target.value})}renderStatusInfo(){if(this.app.mode==="assembly"){let n=this.app.asm,i=Object.keys(this.app.asmr.bad).length;Pe("#statusRight").innerHTML=`${i?`<span class="bad">${i} constraint${i>1?"s":""} not met</span> \xB7 `:""}${n.components.length} parts \xB7 ${n.constraints.length} constraints \xB7 <button class="linkbtn" id="unitBtn" title="Change units">${Ae(n.units||"mm")}</button>`,Pe("#unitBtn").onclick=()=>this.openUnits();return}let e=this.app.result.desc,t=Object.keys(this.app.result.errors||{}).length;Pe("#statusRight").innerHTML=`${t?`<span class="bad">${t} feature${t>1?"s":""} with problems</span> \xB7 `:""}${e?this.app.units()==="in"?`Volume ${Se(e.volume)} in\xB3 \xB7 `:`Volume ${Se(e.volume/1e3)} cm\xB3 \xB7 `:""}<button class="linkbtn" id="unitBtn" title="Change units">${this.app.units()}</button> \xB7 ${this.app.result.ms?Math.round(this.app.result.ms)+" ms":""}`,Pe("#unitBtn").onclick=()=>this.openUnits()}modal(e,t="",n){let i=Pe("#modal");i.hidden=!1,i.innerHTML=`<div class="mbox ${t}"><button class="x mclose" title="Close">\xD7</button>${e}</div>`,this._onClose=n,i.querySelector(".mclose").onclick=()=>this.closeModal(),i.onclick=r=>{r.target===i&&this.closeModal()}}askText(e,t,n){this.modal(`<h2>${Ae(e)}</h2><label class="fld"><input id="askInp" value="${Ae(t)}" spellcheck="false"></label><div class="welcomebtns"><button class="ok" id="askOk">OK</button><button id="askNo">Cancel</button></div>`);let i=Pe("#askInp");i.focus(),i.select();let r=()=>{let o=i.value.trim();this.closeModal(),o&&o!==t&&n(o)};Pe("#askOk").onclick=r,Pe("#askNo").onclick=()=>this.closeModal(),i.onkeydown=o=>{o.stopPropagation(),o.key==="Enter"&&r(),o.key==="Escape"&&this.closeModal()}}modalOpen(){return!Pe("#modal").hidden}closeModal(){let e=Pe("#modal");if(e.hidden=!0,e.innerHTML="",this._onClose){let t=this._onClose;this._onClose=null,t()}}openExamples(){this.modal(`<h2>${tt("examples",22)} Examples</h2><p>Open one to see how it was built. Double-click any step in the tree to change it.</p><h3>Parts</h3><div class="excards">${ci.map((t,n)=>`<button class="excard" data-i="${n}"><b>${Ae(t.title)}</b><span>${Ae(t.about)}</span></button>`).join("")}</div><h3>Assemblies</h3><div class="excards">${Sc.map((t,n)=>`<button class="excard" data-a="${n}"><b>${Ae(t.title)}</b><span>${Ae(t.about)}</span></button>`).join("")}</div>`,"wide");let e=()=>{let t=this.app.root;return t.features&&t.features.length||t.components&&t.components.length};for(let t of document.querySelectorAll(".excard[data-i]"))t.onclick=()=>{e()&&!confirm("Open the example? What is open now is replaced (save it first if you want to keep it).")||(this.closeModal(),this.app.setDoc(Cc(ci[+t.dataset.i].doc)))};for(let t of document.querySelectorAll(".excard[data-a]"))t.onclick=()=>{e()&&!confirm("Open the example? What is open now is replaced (save it first if you want to keep it).")||(this.closeModal(),this.app.openAssembly(Cc(Sc[+t.dataset.a].doc)))}}showWelcome(){this.modal(`<img class="welcomelogo" src="assets/logo.png" alt="Pathway CAD">
      <p>Design real 3D parts, then export them for a 3D printer or another CAD program.</p>
      <ol class="steps"><li><b>Sketch</b> a flat shape on a plane.</li><li><b>Extrude</b> or <b>Revolve</b> it into a solid.</li><li>Add <b>holes, fillets and patterns</b>.</li><li><b>Export STL</b> to 3D print it.</li></ol>
      <p><b>Mouse:</b> right-drag turns the view, middle-drag (or Shift + right-drag) slides it, the wheel zooms.</p>
      <div class="welcomebtns"><button class="ok" id="wStart">Start a new part</button><button id="wAsm">New assembly</button><button id="wEx">Open an example</button><button id="wHelp">How to</button></div>`),Pe("#wAsm").onclick=()=>{this.closeModal(),this.app.openAssembly(Ha()),this.app.asmr.placeDialog()},Pe("#wStart").onclick=()=>{this.closeModal(),this.app.run("sketch")},Pe("#wEx").onclick=()=>this.openExamples(),Pe("#wHelp").onclick=()=>this.openHelp()}openHelp(){this.modal(`<h2><img class="helplogo" src="assets/icon-256.png" alt="">How to use Pathway CAD</h2>
      <div class="help">
      <h3>Moving around</h3>
      <ul><li><b>Turn:</b> right mouse drag. <b>Slide:</b> middle mouse drag or Shift + right drag. <b>Zoom:</b> mouse wheel (zooms toward the pointer).</li>
      <li>View tab: Home, Front, Top, Right, Zoom all. F6 = Home.</li></ul>
      <h3>1. Sketch</h3>
      <ul><li>Model \u25B8 Sketch, then click a colored plane (blue = floor, green = front, red = side) or a flat face of your part.</li>
      <li>Draw with Line, Rectangle, Circle, Arc, Polygon and Slot. Clicks snap to the grid and to the ends and centers of other shapes (orange dot).</li>
      <li>Click a <span class="dimchip">blue number</span> to type an exact size. You can type a parameter name or a formula like <code>width/2</code>.</li>
      <li>A shape must be <b>closed</b> to become a solid. Closed areas are shaded. <b style="color:#d62f2f">Red dots</b> are line ends that do not meet anything.</li>
      <li>Select tool: click to pick, drag a dot to move it. Delete removes. <b>Construction</b> (X) turns a line into a dashed helper, e.g. a spin axis for Revolve.</li>
      <li><b>Rules</b> keep a sketch neat when sizes change: Coincident (join points), Horizontal, Vertical, Parallel, Perpendicular, Equal, Tangent, Concentric, Midpoint and Fix. Pick a rule, then click the shapes. With <b>Auto rules</b> on, joined ends and level/upright lines get rules as you draw. Badges show each rule; click one and press Delete to remove it.</li>
      <li>A size you type on a line or arc becomes a rule too, so it stays that size when you drag other points.</li>
      <li>Press <b>Finish Sketch</b>. A new closed sketch goes straight to Extrude.</li></ul>
      <h3>2. Make it solid</h3>
      <ul><li><b>Extrude</b> pushes the sketch out. Choose "Remove material" to cut a pocket, or "Through everything" for a cut-out.</li>
      <li><b>Revolve</b> spins a sketch around an axis (draw the profile on one side of a construction line).</li>
      <li><b>Box, Cylinder, Sphere</b> are quick starting shapes.</li></ul>
      <h3>3. Details</h3>
      <ul><li><b>Hole</b>: click a flat face, then set diameter, depth and type (counterbore for bolt heads, countersink for flat screws).</li>
      <li><b>Fillet</b> rounds edges, <b>Chamfer</b> bevels them: click edges, set the size.</li>
      <li><b>Shell</b> hollows the part. Click faces to leave open.</li>
      <li><b>Patterns</b> copy features in rows, in a circle, or mirrored. <b>Mirror Part</b> mirrors everything.</li></ul>
      <h3>Changing your mind</h3>
      <ul><li>The <b>model tree</b> on the left is your recipe. Double-click a step to change it; the part rebuilds.</li>
      <li>Right-click a step to rename, turn it off, roll back, move or delete it. A step with a \u2715 has a problem: click it to read why.</li>
      <li><b>Parameters</b> are named sizes. Change one and every place it is used updates.</li>
      <li>Undo: Ctrl+Z. Redo: Ctrl+Y.</li></ul>
      <h3>Assemblies: putting parts together</h3>
      <ul><li>File \u25B8 <b>New Assembly</b>, then <b>Place</b> parts: from a saved .pcad file, an example, a copy of a part already there, or a brand-new part.</li>
      <li>The first part is <b>grounded</b> (fixed in place, pin icon). Other parts can be dragged with the left mouse button.</li>
      <li><b>Constraints</b> hold parts together. Click a face or edge on the part that stays put, then one on the part to move:
        <b>Mate</b> (faces touching), <b>Flush</b> (faces level), <b>Insert</b> (pin or bolt into a hole, using round edges), <b>Axis</b> (same center line, can still spin and slide), <b>Angle</b>.</li>
      <li>A constraint with a \u2715 cannot be met with the others. Right-click it to flip it or turn it off.</li>
      <li>Drag a part to see how it can still move: a pin with only an Axis constraint slides and spins in its hole.</li>
      <li>Double-click a part in the tree to <b>edit it</b> right there; press <b>Back to assembly</b> when done. Every copy of that part changes.</li>
      <li>Inspect \u25B8 <b>Interference</b> finds parts that run into each other (shown in red). <b>Parts list</b> counts parts and adds up the mass.</li></ul>
      <h3>Saving and sharing</h3>
      <ul><li>File \u25B8 Save downloads a <b>.pcad</b> part file or a <b>.pasm</b> assembly file (the assembly file holds its parts inside it). File \u25B8 Open loads it again. Your work is also kept on this computer automatically.</li>
      <li>Export <b>STL</b> for 3D printing (slicers like Cura or PrusaSlicer) and <b>STEP</b> for other CAD programs.</li>
      <li>All sizes are millimetres. For inches, type <code>2*25.4</code> (= 2 in).</li></ul>
      <h3>Keys</h3>
      <p class="muted">Pathway CAD uses the OpenCascade modeling engine (LGPL-2.1) through replicad (MIT), and three.js (MIT) for the 3D view.</p>
      <p class="keys">S sketch \xB7 E extrude \xB7 R revolve \xB7 H hole \xB7 F fillet \xB7 M measure \xB7 Esc cancel \xB7 Enter OK<br>In a sketch: L line \xB7 R rectangle \xB7 C circle \xB7 A arc \xB7 P polygon \xB7 O slot \xB7 S select \xB7 X construction \xB7 G grid</p>
      </div>`,"wide")}status(e){Pe("#statusMsg").textContent=e||""}toast(e,t=""){let n=document.createElement("div");n.className="toast "+t,n.textContent=e,Pe("#toasts").appendChild(n),setTimeout(()=>n.classList.add("out"),t==="error"?5200:3400),setTimeout(()=>n.remove(),t==="error"?5800:4e3)}busy(e){Pe("#busy").hidden=!e}loading(e,t){let n=Pe("#loading");if(!e){n.hidden=!0;return}n.hidden=!1,n.querySelector("p").textContent=e,n.classList.toggle("bad",!!t)}},Yy={select:"Pick a shape to see and edit its numbers.",line:"Line: click, click, click\u2026 Click the first point again to close the shape.",rect:"Rectangle: click two opposite corners.",circle:"Circle: click the center, then the edge.",arc:"Arc: start, end, then a point it passes through.",polygon:"Polygon: click the center, then a corner.",slot:"Slot: click both end centers, then the width."};function Tr(s){let e=String(s).trim();return/^-?\d*\.?\d+(e-?\d+)?$/i.test(e)?parseFloat(e):e}function cd(s,e){return s.sketch===e.id||(s.features||[]).includes(e.id)}window.addEventListener("DOMContentLoaded",()=>{window.pathwayCad=new Pc});export{Ga as MATERIALS,Fi as newDoc};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
