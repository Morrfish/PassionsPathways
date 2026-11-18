var Ot={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ii={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},dh=0,Cl=1,fh=2;var Rl=1,ph=2,Rn=3,zn=0,Wt=1,xt=2,Gn=0,yi=1,Pl=2,Il=3,Dl=4,mh=5,Qn=100,gh=101,yh=102,_h=103,xh=104,vh=200,bh=201,Mh=202,Sh=203,Qr=204,eo=205,Eh=206,wh=207,Th=208,Ah=209,Ch=210,Rh=211,Ph=212,Ih=213,Dh=214,Po=0,Io=1,Do=2,_i=3,Lo=4,ko=5,Uo=6,No=7,Ll=0,Lh=1,kh=2,Wn=0,Uh=1,Nh=2,Fh=3,Oh=4,Bh=5,zh=6,Hh=7;var kl=300,Ti=301,Ai=302,Fo=303,Oo=304,ur=306,to=1e3,jn=1001,no=1002,dn=1003,Vh=1004;var dr=1005;var xn=1006,Bo=1007;var si=1008;var Sn=1009,Ul=1010,Nl=1011,fs=1012,zo=1013,ri=1014,Pn=1015,ps=1016,Ho=1017,Vo=1018,ms=1020,Fl=35902,Ol=35899,Bl=1021,zl=1022,pn=1023,es=1026,gs=1027,Hl=1028,Go=1029,Vl=1030,Wo=1031;var Xo=1033,fr=33776,pr=33777,mr=33778,gr=33779,$o=35840,qo=35841,Yo=35842,Zo=35843,Jo=36196,Ko=37492,jo=37496,Qo=37808,ea=37809,ta=37810,na=37811,ia=37812,sa=37813,ra=37814,oa=37815,aa=37816,la=37817,ca=37818,ha=37819,ua=37820,da=37821,fa=36492,pa=36494,ma=36495,ga=36283,ya=36284,_a=36285,xa=36286;var Us=2300,io=2301,jr=2302,ml=2400,gl=2401,yl=2402;var Gh=3200,Wh=3201;var Gl=0,Xh=1,Xn="",en="srgb",xi="srgb-linear",Ns="linear",Ke="srgb";var gi=7680;var _l=519,$h=512,qh=513,Yh=514,Wl=515,Zh=516,Jh=517,Kh=518,jh=519,xl=35044;var Xl="300 es",_n=2e3,Fs=2001;var Tn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lc=1234567,Ki=Math.PI/180,ts=180/Math.PI;function Ci(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[s&255]+kt[s>>8&255]+kt[s>>16&255]+kt[s>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function ze(s,e,t){return Math.max(e,Math.min(t,s))}function $l(s,e){return(s%e+e)%e}function ud(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function dd(s,e,t){return s!==e?(t-s)/(e-s):0}function Ds(s,e,t){return(1-t)*s+t*e}function fd(s,e,t,n){return Ds(s,e,1-Math.exp(-t*n))}function pd(s,e=1){return e-Math.abs($l(s,e*2)-e)}function md(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function gd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function yd(s,e){return s+Math.floor(Math.random()*(e-s+1))}function _d(s,e){return s+Math.random()*(e-s)}function xd(s){return s*(.5-Math.random())}function vd(s){s!==void 0&&(Lc=s);let e=Lc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function bd(s){return s*Ki}function Md(s){return s*ts}function Sd(s){return(s&s-1)===0&&s!==0}function Ed(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function wd(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Td(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),d=r((e-n)/2),u=o((e-n)/2),f=r((n-e)/2),m=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*m,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*m,a*c);break;case"ZYZ":s.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ji(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Vt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var ql={DEG2RAD:Ki,RAD2DEG:ts,generateUUID:Ci,clamp:ze,euclideanModulo:$l,mapLinear:ud,inverseLerp:dd,lerp:Ds,damp:fd,pingpong:pd,smoothstep:md,smootherstep:gd,randInt:yd,randFloat:_d,randFloatSpread:xd,seededRandom:vd,degToRad:bd,radToDeg:Md,isPowerOfTwo:Sd,ceilPowerOfTwo:Ed,floorPowerOfTwo:wd,setQuaternionFromProperEuler:Td,normalize:Vt,denormalize:Ji},se=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},_t=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[o+0],f=r[o+1],m=r[o+2],y=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=f,e[t+2]=m,e[t+3]=y;return}if(d!==y||l!==u||c!==f||h!==m){let g=1-a,p=l*u+c*f+h*m+d*y,w=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){let C=Math.sqrt(b),R=Math.atan2(C,p*w);g=Math.sin(g*R)/C,a=Math.sin(a*R)/C}let v=a*w;if(l=l*g+u*v,c=c*g+f*v,h=h*g+m*v,d=d*g+y*v,g===1-a){let C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+h*d+l*f-c*u,e[t+1]=l*m+h*u+c*d-a*f,e[t+2]=c*m+h*f+a*u-l*d,e[t+3]=h*m-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),m=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ze(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(kc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(kc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Va.copy(this).projectOnVector(e),this.sub(Va)}reflect(e){return this.sub(Va.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Va=new T,kc=new _t,Fe=class s{constructor(e,t,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],y=i[0],g=i[3],p=i[6],w=i[1],b=i[4],v=i[7],C=i[2],R=i[5],I=i[8];return r[0]=o*y+a*w+l*C,r[3]=o*g+a*b+l*R,r[6]=o*p+a*v+l*I,r[1]=c*y+h*w+d*C,r[4]=c*g+h*b+d*R,r[7]=c*p+h*v+d*I,r[2]=u*y+f*w+m*C,r[5]=u*g+f*b+m*R,r[8]=u*p+f*v+m*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,m=t*d+n*u+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=d*y,e[1]=(i*c-h*n)*y,e[2]=(a*n-i*o)*y,e[3]=u*y,e[4]=(h*t-i*l)*y,e[5]=(i*r-a*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ga.makeScale(e,t)),this}rotate(e){return this.premultiply(Ga.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ga.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ga=new Fe;function Yl(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Os(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Qh(){let s=Os("canvas");return s.style.display="block",s}var Uc={};function ns(s){s in Uc||(Uc[s]=!0,console.warn(s))}function eu(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Nc=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fc=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ad(){let s={enabled:!0,workingColorSpace:xi,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ke&&(i.r=Bn(i.r),i.g=Bn(i.g),i.b=Bn(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ke&&(i.r=ji(i.r),i.g=ji(i.g),i.b=ji(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Xn?Ns:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ns("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ns("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[xi]:{primaries:e,whitePoint:n,transfer:Ns,toXYZ:Nc,fromXYZ:Fc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:e,whitePoint:n,transfer:Ke,toXYZ:Nc,fromXYZ:Fc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:en}}}),s}var $e=Ad();function Bn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ji(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Oi,so=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Oi===void 0&&(Oi=Os("canvas")),Oi.width=e.width,Oi.height=e.height;let i=Oi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Oi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Os("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Bn(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Bn(t[n]/255)*255):t[n]=Bn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Cd=0,is=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=Ci(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Wa(i[o].image)):r.push(Wa(i[o]))}else r=Wa(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Wa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?so.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Rd=0,Xa=new T,tn=class s extends Tn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=jn,i=jn,r=xn,o=si,a=pn,l=Sn,c=s.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=Ci(),this.name="",this.source=new is(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Xa).x}get height(){return this.source.getSize(Xa).y}get depth(){return this.source.getSize(Xa).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case to:e.x=e.x-Math.floor(e.x);break;case jn:e.x=e.x<0?0:1;break;case no:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case to:e.y=e.y-Math.floor(e.y);break;case jn:e.y=e.y<0?0:1;break;case no:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=kl;tn.DEFAULT_ANISOTROPY=1;var gt=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],y=l[2],g=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,v=(f+1)/2,C=(p+1)/2,R=(h+u)/4,I=(d+y)/4,U=(m+g)/4;return b>v&&b>C?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=R/n,r=I/n):v>C?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=R/i,r=U/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=I/r,i=U/r),this.set(n,i,r,t),this}let w=Math.sqrt((g-m)*(g-m)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(g-m)/w,this.y=(d-y)/w,this.z=(u-h)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this.w=ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this.w=ze(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ro=class extends Tn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);let i={width:e,height:t,depth:n.depth},r=new tn(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new is(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},An=class extends ro{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Bs=class extends tn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=dn,this.minFilter=dn,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var oo=class extends tn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=dn,this.minFilter=dn,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var fn=class{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,mn):mn.fromBufferAttribute(r,o),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Er.copy(n.boundingBox)),Er.applyMatrix4(e.matrixWorld),this.union(Er)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ts),wr.subVectors(this.max,Ts),Bi.subVectors(e.a,Ts),zi.subVectors(e.b,Ts),Hi.subVectors(e.c,Ts),$n.subVectors(zi,Bi),qn.subVectors(Hi,zi),di.subVectors(Bi,Hi);let t=[0,-$n.z,$n.y,0,-qn.z,qn.y,0,-di.z,di.y,$n.z,0,-$n.x,qn.z,0,-qn.x,di.z,0,-di.x,-$n.y,$n.x,0,-qn.y,qn.x,0,-di.y,di.x,0];return!$a(t,Bi,zi,Hi,wr)||(t=[1,0,0,0,1,0,0,0,1],!$a(t,Bi,zi,Hi,wr))?!1:(Tr.crossVectors($n,qn),t=[Tr.x,Tr.y,Tr.z],$a(t,Bi,zi,Hi,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ln=[new T,new T,new T,new T,new T,new T,new T,new T],mn=new T,Er=new fn,Bi=new T,zi=new T,Hi=new T,$n=new T,qn=new T,di=new T,Ts=new T,wr=new T,Tr=new T,fi=new T;function $a(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){fi.fromArray(s,r);let a=i.x*Math.abs(fi.x)+i.y*Math.abs(fi.y)+i.z*Math.abs(fi.z),l=e.dot(fi),c=t.dot(fi),h=n.dot(fi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Pd=new fn,As=new T,qa=new T,ei=class{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Pd.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;As.subVectors(e,this.center);let t=As.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(As,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(As.copy(e.center).add(qa)),this.expandByPoint(As.copy(e.center).sub(qa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},kn=new T,Ya=new T,Ar=new T,Yn=new T,Za=new T,Cr=new T,Ja=new T,Hn=class{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kn.copy(this.origin).addScaledVector(this.direction,t),kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ya.copy(e).add(t).multiplyScalar(.5),Ar.copy(t).sub(e).normalize(),Yn.copy(this.origin).sub(Ya);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Ar),a=Yn.dot(this.direction),l=-Yn.dot(Ar),c=Yn.lengthSq(),h=Math.abs(1-o*o),d,u,f,m;if(h>0)if(d=o*l-a,u=o*a-l,m=r*h,d>=0)if(u>=-m)if(u<=m){let y=1/h;d*=y,u*=y,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ya).addScaledVector(Ar,u),f}intersectSphere(e,t){kn.subVectors(e.center,this.origin);let n=kn.dot(this.direction),i=kn.dot(kn)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,kn)!==null}intersectTriangle(e,t,n,i,r){Za.subVectors(t,e),Cr.subVectors(n,e),Ja.crossVectors(Za,Cr);let o=this.direction.dot(Ja),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yn.subVectors(this.origin,e);let l=a*this.direction.dot(Cr.crossVectors(Yn,Cr));if(l<0)return null;let c=a*this.direction.dot(Za.cross(Yn));if(c<0||l+c>o)return null;let h=-a*Yn.dot(Ja);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},je=class s{constructor(e,t,n,i,r,o,a,l,c,h,d,u,f,m,y,g){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,d,u,f,m,y,g)}set(e,t,n,i,r,o,a,l,c,h,d,u,f,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Vi.setFromMatrixColumn(e,0).length(),r=1/Vi.setFromMatrixColumn(e,1).length(),o=1/Vi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=o*h,f=o*d,m=a*h,y=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=u-y*c,t[9]=-a*l,t[2]=y-u*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,m=c*h,y=c*d;t[0]=u+y*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-m,t[6]=y+u*a,t[10]=o*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,m=c*h,y=c*d;t[0]=u-y*a,t[4]=-o*d,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*h,t[9]=y-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let u=o*h,f=o*d,m=a*h,y=a*d;t[0]=l*h,t[4]=m*c-f,t[8]=u*c+y,t[1]=l*d,t[5]=y*c+u,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let u=o*l,f=o*c,m=a*l,y=a*c;t[0]=l*h,t[4]=y-u*d,t[8]=m*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+m,t[10]=u-y*d}else if(e.order==="XZY"){let u=o*l,f=o*c,m=a*l,y=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+y,t[5]=o*h,t[9]=f*d-m,t[2]=m*d-f,t[6]=a*h,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Id,e,Dd)}lookAt(e,t,n){let i=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),Zn.crossVectors(n,jt),Zn.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),Zn.crossVectors(n,jt)),Zn.normalize(),Rr.crossVectors(jt,Zn),i[0]=Zn.x,i[4]=Rr.x,i[8]=jt.x,i[1]=Zn.y,i[5]=Rr.y,i[9]=jt.y,i[2]=Zn.z,i[6]=Rr.z,i[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],w=n[3],b=n[7],v=n[11],C=n[15],R=i[0],I=i[4],U=i[8],S=i[12],M=i[1],D=i[5],B=i[9],V=i[13],X=i[2],Y=i[6],W=i[10],te=i[14],z=i[3],oe=i[7],he=i[11],Ee=i[15];return r[0]=o*R+a*M+l*X+c*z,r[4]=o*I+a*D+l*Y+c*oe,r[8]=o*U+a*B+l*W+c*he,r[12]=o*S+a*V+l*te+c*Ee,r[1]=h*R+d*M+u*X+f*z,r[5]=h*I+d*D+u*Y+f*oe,r[9]=h*U+d*B+u*W+f*he,r[13]=h*S+d*V+u*te+f*Ee,r[2]=m*R+y*M+g*X+p*z,r[6]=m*I+y*D+g*Y+p*oe,r[10]=m*U+y*B+g*W+p*he,r[14]=m*S+y*V+g*te+p*Ee,r[3]=w*R+b*M+v*X+C*z,r[7]=w*I+b*D+v*Y+C*oe,r[11]=w*U+b*B+v*W+C*he,r[15]=w*S+b*V+v*te+C*Ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],m=e[3],y=e[7],g=e[11],p=e[15];return m*(+r*l*d-i*c*d-r*a*u+n*c*u+i*a*f-n*l*f)+y*(+t*l*f-t*c*u+r*o*u-i*o*f+i*c*h-r*l*h)+g*(+t*c*d-t*a*f-r*o*d+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-t*l*d+t*a*u+i*o*d-n*o*u+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],m=e[12],y=e[13],g=e[14],p=e[15],w=d*g*c-y*u*c+y*l*f-a*g*f-d*l*p+a*u*p,b=m*u*c-h*g*c-m*l*f+o*g*f+h*l*p-o*u*p,v=h*y*c-m*d*c+m*a*f-o*y*f-h*a*p+o*d*p,C=m*d*l-h*y*l-m*a*u+o*y*u+h*a*g-o*d*g,R=t*w+n*b+i*v+r*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/R;return e[0]=w*I,e[1]=(y*u*r-d*g*r-y*i*f+n*g*f+d*i*p-n*u*p)*I,e[2]=(a*g*r-y*l*r+y*i*c-n*g*c-a*i*p+n*l*p)*I,e[3]=(d*l*r-a*u*r-d*i*c+n*u*c+a*i*f-n*l*f)*I,e[4]=b*I,e[5]=(h*g*r-m*u*r+m*i*f-t*g*f-h*i*p+t*u*p)*I,e[6]=(m*l*r-o*g*r-m*i*c+t*g*c+o*i*p-t*l*p)*I,e[7]=(o*u*r-h*l*r+h*i*c-t*u*c-o*i*f+t*l*f)*I,e[8]=v*I,e[9]=(m*d*r-h*y*r-m*n*f+t*y*f+h*n*p-t*d*p)*I,e[10]=(o*y*r-m*a*r+m*n*c-t*y*c-o*n*p+t*a*p)*I,e[11]=(h*a*r-o*d*r-h*n*c+t*d*c+o*n*f-t*a*f)*I,e[12]=C*I,e[13]=(h*y*i-m*d*i+m*n*u-t*y*u-h*n*g+t*d*g)*I,e[14]=(m*a*i-o*y*i-m*n*l+t*y*l+o*n*g-t*a*g)*I,e[15]=(o*d*i-h*a*i+h*n*l-t*d*l-o*n*u+t*a*u)*I,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,m=r*d,y=o*h,g=o*d,p=a*d,w=l*c,b=l*h,v=l*d,C=n.x,R=n.y,I=n.z;return i[0]=(1-(y+p))*C,i[1]=(f+v)*C,i[2]=(m-b)*C,i[3]=0,i[4]=(f-v)*R,i[5]=(1-(u+p))*R,i[6]=(g+w)*R,i[7]=0,i[8]=(m+b)*I,i[9]=(g-w)*I,i[10]=(1-(u+y))*I,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Vi.set(i[0],i[1],i[2]).length(),o=Vi.set(i[4],i[5],i[6]).length(),a=Vi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],gn.copy(this);let c=1/r,h=1/o,d=1/a;return gn.elements[0]*=c,gn.elements[1]*=c,gn.elements[2]*=c,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=d,gn.elements[9]*=d,gn.elements[10]*=d,t.setFromRotationMatrix(gn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=_n,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),m,y;if(l)m=r/(o-r),y=o*r/(o-r);else if(a===_n)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Fs)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=_n,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-i),u=-(t+e)/(t-e),f=-(n+i)/(n-i),m,y;if(l)m=1/(o-r),y=o/(o-r);else if(a===_n)m=-2/(o-r),y=-(o+r)/(o-r);else if(a===Fs)m=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Vi=new T,gn=new je,Id=new T(0,0,0),Dd=new T(1,1,1),Zn=new T,Rr=new T,jt=new T,Oc=new je,Bc=new _t,vn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ze(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Oc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Oc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bc.setFromEuler(this),this.setFromQuaternion(Bc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};vn.DEFAULT_ORDER="XYZ";var ss=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ld=0,zc=new T,Gi=new _t,Un=new je,Pr=new T,Cs=new T,kd=new T,Ud=new _t,Hc=new T(1,0,0),Vc=new T(0,1,0),Gc=new T(0,0,1),Wc={type:"added"},Nd={type:"removed"},Wi={type:"childadded",child:null},Ka={type:"childremoved",child:null},St=class s extends Tn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ld++}),this.uuid=Ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new T,t=new vn,n=new _t,i=new T(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new je},normalMatrix:{value:new Fe}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ss,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gi.setFromAxisAngle(e,t),this.quaternion.multiply(Gi),this}rotateOnWorldAxis(e,t){return Gi.setFromAxisAngle(e,t),this.quaternion.premultiply(Gi),this}rotateX(e){return this.rotateOnAxis(Hc,e)}rotateY(e){return this.rotateOnAxis(Vc,e)}rotateZ(e){return this.rotateOnAxis(Gc,e)}translateOnAxis(e,t){return zc.copy(e).applyQuaternion(this.quaternion),this.position.add(zc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hc,e)}translateY(e){return this.translateOnAxis(Vc,e)}translateZ(e){return this.translateOnAxis(Gc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Pr.copy(e):Pr.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Cs,Pr,this.up):Un.lookAt(Pr,Cs,this.up),this.quaternion.setFromRotationMatrix(Un),i&&(Un.extractRotation(i.matrixWorld),Gi.setFromRotationMatrix(Un),this.quaternion.premultiply(Gi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wc),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nd),Ka.child=e,this.dispatchEvent(Ka),Ka.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Un.multiply(e.parent.matrixWorld)),e.applyMatrix4(Un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wc),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,e,kd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,Ud,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};St.DEFAULT_UP=new T(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var yn=new T,Nn=new T,ja=new T,Fn=new T,Xi=new T,$i=new T,Xc=new T,Qa=new T,el=new T,tl=new T,nl=new gt,il=new gt,sl=new gt,On=class s{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),yn.subVectors(e,t),i.cross(yn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){yn.subVectors(i,t),Nn.subVectors(n,t),ja.subVectors(e,t);let o=yn.dot(yn),a=yn.dot(Nn),l=yn.dot(ja),c=Nn.dot(Nn),h=Nn.dot(ja),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,m=(o*h-a*l)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Fn.x),l.addScaledVector(o,Fn.y),l.addScaledVector(a,Fn.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return nl.setScalar(0),il.setScalar(0),sl.setScalar(0),nl.fromBufferAttribute(e,t),il.fromBufferAttribute(e,n),sl.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(nl,r.x),o.addScaledVector(il,r.y),o.addScaledVector(sl,r.z),o}static isFrontFacing(e,t,n,i){return yn.subVectors(n,t),Nn.subVectors(e,t),yn.cross(Nn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),yn.cross(Nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Xi.subVectors(i,n),$i.subVectors(r,n),Qa.subVectors(e,n);let l=Xi.dot(Qa),c=$i.dot(Qa);if(l<=0&&c<=0)return t.copy(n);el.subVectors(e,i);let h=Xi.dot(el),d=$i.dot(el);if(h>=0&&d<=h)return t.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Xi,o);tl.subVectors(e,r);let f=Xi.dot(tl),m=$i.dot(tl);if(m>=0&&f<=m)return t.copy(r);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector($i,a);let g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return Xc.subVectors(r,i),a=(d-h)/(d-h+(f-m)),t.copy(i).addScaledVector(Xc,a);let p=1/(g+y+u);return o=y*p,a=u*p,t.copy(n).addScaledVector(Xi,o).addScaledVector($i,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},tu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Ir={h:0,s:0,l:0};function rl(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var ke=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=en){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=$e.workingColorSpace){if(e=$l(e,1),t=ze(t,0,1),n=ze(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=rl(o,r,e+1/3),this.g=rl(o,r,e),this.b=rl(o,r,e-1/3)}return $e.colorSpaceToWorking(this,i),this}setStyle(e,t=en){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=en){let n=tu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bn(e.r),this.g=Bn(e.g),this.b=Bn(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=en){return $e.workingToColorSpace(Ut.copy(this),e),Math.round(ze(Ut.r*255,0,255))*65536+Math.round(ze(Ut.g*255,0,255))*256+Math.round(ze(Ut.b*255,0,255))}getHexString(e=en){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Ut.copy(this),t);let n=Ut.r,i=Ut.g,r=Ut.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=en){$e.workingToColorSpace(Ut.copy(this),e);let t=Ut.r,n=Ut.g,i=Ut.b;return e!==en?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Jn),this.setHSL(Jn.h+e,Jn.s+t,Jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Jn),e.getHSL(Ir);let n=Ds(Jn.h,Ir.h,t),i=Ds(Jn.s,Ir.s,t),r=Ds(Jn.l,Ir.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ut=new ke;ke.NAMES=tu;var Fd=0,Cn=class extends Tn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Ci(),this.name="",this.type="Material",this.blending=yi,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qr,this.blendDst=eo,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=_i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_l,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==yi&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qr&&(n.blendSrc=this.blendSrc),this.blendDst!==eo&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_l&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ft=class extends Cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Ll,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Mt=new T,Dr=new se,Od=0,at=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Od++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xl,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXY(t,Dr.x,Dr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ji(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ji(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ji(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ji(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ji(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),i=Vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),i=Vt(i,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xl&&(e.usage=this.usage),e}};var zs=class extends at{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Hs=class extends at{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var dt=class extends at{constructor(e,t,n){super(new Float32Array(e),t,n)}},Bd=0,un=new je,ol=new St,qi=new T,Qt=new fn,Rs=new fn,Rt=new T,Ye=class s extends Tn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=Ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yl(e)?Hs:zs)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Fe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,n){return un.makeTranslation(e,t,n),this.applyMatrix4(un),this}scale(e,t,n){return un.makeScale(e,t,n),this.applyMatrix4(un),this}lookAt(e){return ol.lookAt(e),ol.updateMatrix(),this.applyMatrix4(ol.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new dt(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Qt.setFromBufferAttribute(r),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,Qt.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,Qt.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(Qt.min),this.boundingBox.expandByPoint(Qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(e){let n=this.boundingSphere.center;if(Qt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Rs.setFromBufferAttribute(a),this.morphTargetsRelative?(Rt.addVectors(Qt.min,Rs.min),Qt.expandByPoint(Rt),Rt.addVectors(Qt.max,Rs.max),Qt.expandByPoint(Rt)):(Qt.expandByPoint(Rs.min),Qt.expandByPoint(Rs.max))}Qt.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Rt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Rt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Rt.fromBufferAttribute(a,c),l&&(qi.fromBufferAttribute(e,c),Rt.add(qi)),i=Math.max(i,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new at(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<n.count;U++)a[U]=new T,l[U]=new T;let c=new T,h=new T,d=new T,u=new se,f=new se,m=new se,y=new T,g=new T;function p(U,S,M){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,M),u.fromBufferAttribute(r,U),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,M),h.sub(c),d.sub(c),f.sub(u),m.sub(u);let D=1/(f.x*m.y-m.x*f.y);isFinite(D)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(D),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(D),a[U].add(y),a[S].add(y),a[M].add(y),l[U].add(g),l[S].add(g),l[M].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let U=0,S=w.length;U<S;++U){let M=w[U],D=M.start,B=M.count;for(let V=D,X=D+B;V<X;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let b=new T,v=new T,C=new T,R=new T;function I(U){C.fromBufferAttribute(i,U),R.copy(C);let S=a[U];b.copy(S),b.sub(C.multiplyScalar(C.dot(S))).normalize(),v.crossVectors(R,S);let D=v.dot(l[U])<0?-1:1;o.setXYZW(U,b.x,b.y,b.z,D)}for(let U=0,S=w.length;U<S;++U){let M=w[U],D=M.start,B=M.count;for(let V=D,X=D+B;V<X;V+=3)I(e.getX(V+0)),I(e.getX(V+1)),I(e.getX(V+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new at(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new T,r=new T,o=new T,a=new T,l=new T,c=new T,h=new T,d=new T;if(e)for(let u=0,f=e.count;u<f;u+=3){let m=e.getX(u+0),y=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,g),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,m=0;for(let y=0,g=l.length;y<g;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*h;for(let p=0;p<h;p++)u[m++]=c[f++]}return new at(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},$c=new je,pi=new Hn,Lr=new ei,qc=new T,kr=new T,Ur=new T,Nr=new T,al=new T,Fr=new T,Yc=new T,Or=new T,lt=class extends St{constructor(e=new Ye,t=new Ft){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Fr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(al.fromBufferAttribute(d,e),o?Fr.addScaledVector(al,h):Fr.addScaledVector(al.sub(t),h))}t.add(Fr)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(r),pi.copy(e.ray).recast(e.near),!(Lr.containsPoint(pi.origin)===!1&&(pi.intersectSphere(Lr,qc)===null||pi.origin.distanceToSquared(qc)>(e.far-e.near)**2))&&($c.copy(r).invert(),pi.copy(e.ray).applyMatrix4($c),!(n.boundingBox!==null&&pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,pi)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=u.length;m<y;m++){let g=u[m],p=o[g.materialIndex],w=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let v=w,C=b;v<C;v+=3){let R=a.getX(v),I=a.getX(v+1),U=a.getX(v+2);i=Br(this,p,e,n,c,h,d,R,I,U),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let w=a.getX(g),b=a.getX(g+1),v=a.getX(g+2);i=Br(this,o,e,n,c,h,d,w,b,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,y=u.length;m<y;m++){let g=u[m],p=o[g.materialIndex],w=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=w,C=b;v<C;v+=3){let R=v,I=v+1,U=v+2;i=Br(this,p,e,n,c,h,d,R,I,U),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let w=g,b=g+1,v=g+2;i=Br(this,o,e,n,c,h,d,w,b,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function zd(s,e,t,n,i,r,o,a){let l;if(e.side===Wt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===zn,a),l===null)return null;Or.copy(a),Or.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Or);return c<t.near||c>t.far?null:{distance:c,point:Or.clone(),object:s}}function Br(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,kr),s.getVertexPosition(l,Ur),s.getVertexPosition(c,Nr);let h=zd(s,e,t,n,kr,Ur,Nr,Yc);if(h){let d=new T;On.getBarycoord(Yc,kr,Ur,Nr,d),i&&(h.uv=On.getInterpolatedAttribute(i,a,l,c,d,new se)),r&&(h.uv1=On.getInterpolatedAttribute(r,a,l,c,d,new se)),o&&(h.normal=On.getInterpolatedAttribute(o,a,l,c,d,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new T,materialIndex:0};On.getNormal(kr,Ur,Nr,u.normal),h.face=u,h.barycoord=d}return h}var rs=class s extends Ye{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(d,2));function m(y,g,p,w,b,v,C,R,I,U,S){let M=v/I,D=C/U,B=v/2,V=C/2,X=R/2,Y=I+1,W=U+1,te=0,z=0,oe=new T;for(let he=0;he<W;he++){let Ee=he*D-V;for(let Ve=0;Ve<Y;Ve++){let it=Ve*M-B;oe[y]=it*w,oe[g]=Ee*b,oe[p]=X,c.push(oe.x,oe.y,oe.z),oe[y]=0,oe[g]=0,oe[p]=R>0?1:-1,h.push(oe.x,oe.y,oe.z),d.push(Ve/I),d.push(1-he/U),te+=1}}for(let he=0;he<U;he++)for(let Ee=0;Ee<I;Ee++){let Ve=u+Ee+Y*he,it=u+Ee+Y*(he+1),ct=u+(Ee+1)+Y*(he+1),Ze=u+(Ee+1)+Y*he;l.push(Ve,it,Ze),l.push(it,ct,Ze),z+=6}a.addGroup(f,z,S),f+=z,u+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ri(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Bt(s){let e={};for(let t=0;t<s.length;t++){let n=Ri(s[t]);for(let i in n)e[i]=n[i]}return e}function Hd(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Zl(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}var nu={clone:Ri,merge:Bt},Vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bn=class extends Cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vd,this.fragmentShader=Gd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ri(e.uniforms),this.uniformsGroups=Hd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Vs=class extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Kn=new T,Zc=new se,Jc=new se,Yt=class extends Vs{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ts*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ki*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ts*2*Math.atan(Math.tan(Ki*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Kn.x,Kn.y).multiplyScalar(-e/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Kn.x,Kn.y).multiplyScalar(-e/Kn.z)}getViewSize(e,t){return this.getViewBounds(e,Zc,Jc),t.subVectors(Jc,Zc)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ki*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Yi=-90,Zi=1,ao=class extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Yt(Yi,Zi,e,t);i.layers=this.layers,this.add(i);let r=new Yt(Yi,Zi,e,t);r.layers=this.layers,this.add(r);let o=new Yt(Yi,Zi,e,t);o.layers=this.layers,this.add(o);let a=new Yt(Yi,Zi,e,t);a.layers=this.layers,this.add(a);let l=new Yt(Yi,Zi,e,t);l.layers=this.layers,this.add(l);let c=new Yt(Yi,Zi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===_n)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Fs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Gs=class extends tn{constructor(e=[],t=Ti,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},lo=class extends An{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Gs(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new rs(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Ri(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:Gn});r.uniforms.tEquirect.value=t;let o=new lt(i,r),a=t.minFilter;return t.minFilter===si&&(t.minFilter=xn),new ao(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Gt=class extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}},Wd={type:"move"},os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(c,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Wd)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Gt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Ws=class extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var ll=new T,Xd=new T,$d=new Fe,Nt=class{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=ll.subVectors(n,t).cross(Xd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ll),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||$d.getNormalMatrix(e),i=this.coplanarPoint(ll).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},mi=new ei,qd=new se(.5,.5),zr=new T,as=class{constructor(e=new Nt,t=new Nt,n=new Nt,i=new Nt,r=new Nt,o=new Nt){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_n,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],y=r[9],g=r[10],p=r[11],w=r[12],b=r[13],v=r[14],C=r[15];if(i[0].setComponents(c-o,f-h,p-m,C-w).normalize(),i[1].setComponents(c+o,f+h,p+m,C+w).normalize(),i[2].setComponents(c+a,f+d,p+y,C+b).normalize(),i[3].setComponents(c-a,f-d,p-y,C-b).normalize(),n)i[4].setComponents(l,u,g,v).normalize(),i[5].setComponents(c-l,f-u,p-g,C-v).normalize();else if(i[4].setComponents(c-l,f-u,p-g,C-v).normalize(),t===_n)i[5].setComponents(c+l,f+u,p+g,C+v).normalize();else if(t===Fs)i[5].setComponents(l,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(e){mi.center.set(0,0,0);let t=qd.distanceTo(e.center);return mi.radius=.7071067811865476+t,mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(zr.x=i.normal.x>0?e.max.x:e.min.x,zr.y=i.normal.y>0?e.max.y:e.min.y,zr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(zr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Pt=class extends Cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},co=new T,ho=new T,Kc=new je,Ps=new Hn,Hr=new ei,cl=new T,jc=new T,nn=class extends St{constructor(e=new Ye,t=new Pt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)co.fromBufferAttribute(t,i-1),ho.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=co.distanceTo(ho);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(i),Hr.radius+=r,e.ray.intersectsSphere(Hr)===!1)return;Kc.copy(i).invert(),Ps.copy(e.ray).applyMatrix4(Kc);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=c){let p=h.getX(y),w=h.getX(y+1),b=Vr(this,e,Ps,l,p,w,y);b&&t.push(b)}if(this.isLineLoop){let y=h.getX(m-1),g=h.getX(f),p=Vr(this,e,Ps,l,y,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=c){let p=Vr(this,e,Ps,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=Vr(this,e,Ps,l,m-1,f,m-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Vr(s,e,t,n,i,r,o){let a=s.geometry.attributes.position;if(co.fromBufferAttribute(a,i),ho.fromBufferAttribute(a,r),t.distanceSqToSegment(co,ho,cl,jc)>n)return;cl.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(cl);if(!(c<e.near||c>e.far))return{distance:c,point:jc.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var Qc=new T,eh=new T,Mn=class extends nn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Qc.fromBufferAttribute(t,i),eh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Qc.distanceTo(eh);e.setAttribute("lineDistance",new dt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var ls=class extends Cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},th=new je,vl=new Hn,Gr=new ei,Wr=new T,Xs=class extends St{constructor(e=new Ye,t=new ls){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(i),Gr.radius+=r,e.ray.intersectsSphere(Gr)===!1)return;th.copy(i).invert(),vl.copy(e.ray).applyMatrix4(th);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=u,y=f;m<y;m++){let g=c.getX(m);Wr.fromBufferAttribute(d,g),nh(Wr,g,l,i,e,t,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let m=u,y=f;m<y;m++)Wr.fromBufferAttribute(d,m),nh(Wr,m,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function nh(s,e,t,n,i,r,o){let a=vl.distanceSqToPoint(s);if(a<t){let l=new T;vl.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var $s=class extends tn{constructor(e,t,n=ri,i,r,o,a=dn,l=dn,c,h=es,d=1){if(h!==es&&h!==gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new is(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},qs=class extends tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Xr=new T,$r=new T,hl=new T,qr=new On,Ys=class extends Ye{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(Ki*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:y,b:g,c:p}=qr;if(y.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),qr.getNormal(hl),d[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let w=0;w<3;w++){let b=(w+1)%3,v=d[w],C=d[b],R=qr[h[w]],I=qr[h[b]],U=`${v}_${C}`,S=`${C}_${v}`;S in u&&u[S]?(hl.dot(u[S].normal)<=r&&(f.push(R.x,R.y,R.z),f.push(I.x,I.y,I.z)),u[S]=null):U in u||(u[U]={index0:c[w],index1:c[b],normal:hl.clone()})}}for(let m in u)if(u[m]){let{index0:y,index1:g}=u[m];Xr.fromBufferAttribute(a,y),$r.fromBufferAttribute(a,g),f.push(Xr.x,Xr.y,Xr.z),f.push($r.x,$r.y,$r.z)}this.setAttribute("position",new dt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new se:new T);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new T,i=[],r=[],o=[],a=new T,l=new je;for(let f=0;f<=e;f++){let m=f/e;i[f]=this.getTangentAt(m,new T)}r[0]=new T,o[0]=new T;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(ze(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ze(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},cs=class extends sn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new se){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},uo=class extends cs{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Jl(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var Yr=new T,ul=new Jl,dl=new Jl,fl=new Jl,fo=class extends sn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Yr.subVectors(i[0],i[1]).add(i[0]),c=Yr);let d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Yr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Yr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),ul.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,m,y,g),dl.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,m,y,g),fl.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(ul.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),dl.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),fl.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(ul.calc(l),dl.calc(l),fl.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ih(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function Yd(s,e){let t=1-s;return t*t*e}function Zd(s,e){return 2*(1-s)*s*e}function Jd(s,e){return s*s*e}function Ls(s,e,t,n){return Yd(s,e)+Zd(s,t)+Jd(s,n)}function Kd(s,e){let t=1-s;return t*t*t*e}function jd(s,e){let t=1-s;return 3*t*t*s*e}function Qd(s,e){return 3*(1-s)*s*s*e}function ef(s,e){return s*s*s*e}function ks(s,e,t,n,i){return Kd(s,e)+jd(s,t)+Qd(s,n)+ef(s,i)}var Zs=class extends sn{constructor(e=new se,t=new se,n=new se,i=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new se){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ks(e,i.x,r.x,o.x,a.x),ks(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},po=class extends sn{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ks(e,i.x,r.x,o.x,a.x),ks(e,i.y,r.y,o.y,a.y),ks(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Js=class extends sn{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},mo=class extends sn{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ks=class extends sn{constructor(e=new se,t=new se,n=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new se){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ls(e,i.x,r.x,o.x),Ls(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},go=class extends sn{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ls(e,i.x,r.x,o.x),Ls(e,i.y,r.y,o.y),Ls(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},js=class extends sn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(ih(a,l.x,c.x,h.x,d.x),ih(a,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new se().fromArray(i))}return this}},sh=Object.freeze({__proto__:null,ArcCurve:uo,CatmullRomCurve3:fo,CubicBezierCurve:Zs,CubicBezierCurve3:po,EllipseCurve:cs,LineCurve:Js,LineCurve3:mo,QuadraticBezierCurve:Ks,QuadraticBezierCurve3:go,SplineCurve:js}),yo=class extends sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new sh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new sh[i.type]().fromJSON(i))}return this}},vi=class extends yo{constructor(e){super(),this.type="Path",this.currentPoint=new se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Js(this.currentPoint.clone(),new se(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new Ks(this.currentPoint.clone(),new se(e,t),new se(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new Zs(this.currentPoint.clone(),new se(e,t),new se(n,i),new se(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new js(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new cs(e,t,n,i,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},hs=class extends vi{constructor(e){super(e),this.uuid=Ci(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new vi().fromJSON(i))}return this}};function tf(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=iu(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=af(s,e,r,t)),s.length>80*t){a=1/0,l=1/0;let h=-1/0,d=-1/0;for(let u=t;u<i;u+=t){let f=s[u],m=s[u+1];f<a&&(a=f),m<l&&(l=m),f>h&&(h=f),m>d&&(d=m)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return Qs(r,o,t,a,l,c,0),o}function iu(s,e,t,n,i){let r;if(i===_f(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=rh(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=rh(o/n|0,s[o],s[o+1],r);return r&&us(r,r.next)&&(tr(r),r=r.next),r}function bi(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(us(t,t.next)||mt(t.prev,t,t.next)===0)){if(tr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Qs(s,e,t,n,i,r,o){if(!s)return;!o&&r&&df(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?sf(s,n,i,r):nf(s)){e.push(l.i,s.i,c.i),tr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=rf(bi(s),e),Qs(s,e,t,n,i,r,2)):o===2&&of(s,e,t,n,i,r):Qs(bi(s),e,t,n,i,r,1);break}}}function nf(s){let e=s.prev,t=s,n=s.next;if(mt(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),d=Math.min(a,l,c),u=Math.max(i,r,o),f=Math.max(a,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&Is(i,a,r,l,o,c,m.x,m.y)&&mt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function sf(s,e,t,n){let i=s.prev,r=s,o=s.next;if(mt(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,d=r.y,u=o.y,f=Math.min(a,l,c),m=Math.min(h,d,u),y=Math.max(a,l,c),g=Math.max(h,d,u),p=bl(f,m,e,t,n),w=bl(y,g,e,t,n),b=s.prevZ,v=s.nextZ;for(;b&&b.z>=p&&v&&v.z<=w;){if(b.x>=f&&b.x<=y&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Is(a,h,l,d,c,u,b.x,b.y)&&mt(b.prev,b,b.next)>=0||(b=b.prevZ,v.x>=f&&v.x<=y&&v.y>=m&&v.y<=g&&v!==i&&v!==o&&Is(a,h,l,d,c,u,v.x,v.y)&&mt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;b&&b.z>=p;){if(b.x>=f&&b.x<=y&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Is(a,h,l,d,c,u,b.x,b.y)&&mt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;v&&v.z<=w;){if(v.x>=f&&v.x<=y&&v.y>=m&&v.y<=g&&v!==i&&v!==o&&Is(a,h,l,d,c,u,v.x,v.y)&&mt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function rf(s,e){let t=s;do{let n=t.prev,i=t.next.next;!us(n,i)&&ru(n,t,t.next,i)&&er(n,i)&&er(i,n)&&(e.push(n.i,t.i,i.i),tr(t),tr(t.next),t=s=i),t=t.next}while(t!==s);return bi(t)}function of(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&mf(o,a)){let l=ou(o,a);o=bi(o,o.next),l=bi(l,l.next),Qs(o,e,t,n,i,r,0),Qs(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function af(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=iu(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(pf(c))}i.sort(lf);for(let r=0;r<i.length;r++)t=cf(i[r],t);return t}function lf(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function cf(s,e){let t=hf(s,e);if(!t)return e;let n=ou(t,s);return bi(n,n.next),bi(t,t.next)}function hf(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(us(s,t))return t;do{if(us(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&su(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let d=Math.abs(i-t.y)/(n-t.x);er(t,s)&&(d<h||d===h&&(t.x>o.x||t.x===o.x&&uf(o,t)))&&(o=t,h=d)}t=t.next}while(t!==a);return o}function uf(s,e){return mt(s.prev,s,e.prev)<0&&mt(e.next,s,s.next)<0}function df(s,e,t,n){let i=s;do i.z===0&&(i.z=bl(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,ff(i)}function ff(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function bl(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function pf(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function su(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Is(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&su(s,e,t,n,i,r,o,a)}function mf(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!gf(s,e)&&(er(s,e)&&er(e,s)&&yf(s,e)&&(mt(s.prev,s,e.prev)||mt(s,e.prev,e))||us(s,e)&&mt(s.prev,s,s.next)>0&&mt(e.prev,e,e.next)>0)}function mt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function us(s,e){return s.x===e.x&&s.y===e.y}function ru(s,e,t,n){let i=Jr(mt(s,e,t)),r=Jr(mt(s,e,n)),o=Jr(mt(t,n,s)),a=Jr(mt(t,n,e));return!!(i!==r&&o!==a||i===0&&Zr(s,t,e)||r===0&&Zr(s,n,e)||o===0&&Zr(t,s,n)||a===0&&Zr(t,e,n))}function Zr(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Jr(s){return s>0?1:s<0?-1:0}function gf(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&ru(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function er(s,e){return mt(s.prev,s,s.next)<0?mt(s,e,s.next)>=0&&mt(s,s.prev,e)>=0:mt(s,e,s.prev)<0||mt(s,s.next,e)<0}function yf(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function ou(s,e){let t=Ml(s.i,s.x,s.y),n=Ml(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function rh(s,e,t,n){let i=Ml(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function tr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Ml(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function _f(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var Sl=class{static triangulate(e,t,n=2){return tf(e,t,n)}},Qi=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];oh(e),ah(n,e);let o=e.length;t.forEach(oh);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,ah(n,t[l]);let a=Sl.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function oh(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function ah(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Vn=class s extends Ye{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=e/a,u=t/l,f=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let w=p*u-o;for(let b=0;b<c;b++){let v=b*d-r;m.push(v,-w,0),y.push(0,0,1),g.push(b/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<a;w++){let b=w+c*p,v=w+c*(p+1),C=w+1+c*(p+1),R=w+1+c*p;f.push(b,v,R),f.push(v,C,R)}this.setIndex(f),this.setAttribute("position",new dt(m,3)),this.setAttribute("normal",new dt(y,3)),this.setAttribute("uv",new dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}};var nr=class s extends Ye{constructor(e=new hs([new se(0,.5),new se(-.5,-.5),new se(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new dt(i,3)),this.setAttribute("normal",new dt(r,3)),this.setAttribute("uv",new dt(o,2));function c(h){let d=i.length/3,u=h.extractPoints(t),f=u.shape,m=u.holes;Qi.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){let w=m[g];Qi.isClockWise(w)===!0&&(m[g]=w.reverse())}let y=Qi.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){let w=m[g];f=f.concat(w)}for(let g=0,p=f.length;g<p;g++){let w=f[g];i.push(w.x,w.y,0),r.push(0,0,1),o.push(w.x,w.y)}for(let g=0,p=y.length;g<p;g++){let w=y[g],b=w[0]+d,v=w[1]+d,C=w[2]+d;n.push(b,v,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return xf(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function xf(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var ir=class s extends Ye{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new T,u=new T,f=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){let w=[],b=p/n,v=0;p===0&&o===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let C=0;C<=t;C++){let R=C/t;d.x=-e*Math.cos(i+R*r)*Math.sin(o+b*a),d.y=e*Math.cos(o+b*a),d.z=e*Math.sin(i+R*r)*Math.sin(o+b*a),m.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),g.push(R+v,1-b),w.push(c++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<t;w++){let b=h[p][w+1],v=h[p][w],C=h[p+1][w],R=h[p+1][w+1];(p!==0||o>0)&&f.push(b,v,R),(p!==n-1||l<Math.PI)&&f.push(v,C,R)}this.setIndex(f),this.setAttribute("position",new dt(m,3)),this.setAttribute("normal",new dt(y,3)),this.setAttribute("uv",new dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Mi=class extends Cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gl,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var _o=class extends Cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},xo=class extends Cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Si=class extends Pt{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Kr(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function vf(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var Ei=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},vo=class extends Ei{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ml,endingEnd:ml}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case gl:r=e,a=2*t-n;break;case yl:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case gl:o=e,l=2*n-t;break;case yl:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),y=m*m,g=y*m,p=-u*g+2*u*y-u*m,w=(1+u)*g+(-1.5-2*u)*y+(-.5+u)*m+1,b=(-1-f)*g+(1.5+f)*y+.5*m,v=f*g-f*y;for(let C=0;C!==a;++C)r[C]=p*o[h+C]+w*o[c+C]+b*o[l+C]+v*o[d+C];return r}},bo=class extends Ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Mo=class extends Ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},rn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Kr(t,this.TimeBufferType),this.values=Kr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Kr(e.times,Array),values:Kr(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new bo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Us:t=this.InterpolantFactoryMethodDiscrete;break;case io:t=this.InterpolantFactoryMethodLinear;break;case jr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Us;case this.InterpolantFactoryMethodLinear:return io;case this.InterpolantFactoryMethodSmooth:return jr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&vf(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===jr,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let m=0;m!==n;++m){let y=t[d+m];if(y!==t[u+m]||y!==t[f+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};rn.prototype.ValueTypeName="";rn.prototype.TimeBufferType=Float32Array;rn.prototype.ValueBufferType=Float32Array;rn.prototype.DefaultInterpolation=io;var ti=class extends rn{constructor(e,t,n){super(e,t,n)}};ti.prototype.ValueTypeName="bool";ti.prototype.ValueBufferType=Array;ti.prototype.DefaultInterpolation=Us;ti.prototype.InterpolantFactoryMethodLinear=void 0;ti.prototype.InterpolantFactoryMethodSmooth=void 0;var So=class extends rn{constructor(e,t,n,i){super(e,t,n,i)}};So.prototype.ValueTypeName="color";var Eo=class extends rn{constructor(e,t,n,i){super(e,t,n,i)}};Eo.prototype.ValueTypeName="number";var wo=class extends Ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)_t.slerpFlat(r,0,o,c-a,o,c,l);return r}},sr=class extends rn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new wo(this.times,this.values,this.getValueSize(),e)}};sr.prototype.ValueTypeName="quaternion";sr.prototype.InterpolantFactoryMethodSmooth=void 0;var ni=class extends rn{constructor(e,t,n){super(e,t,n)}};ni.prototype.ValueTypeName="string";ni.prototype.ValueBufferType=Array;ni.prototype.DefaultInterpolation=Us;ni.prototype.InterpolantFactoryMethodLinear=void 0;ni.prototype.InterpolantFactoryMethodSmooth=void 0;var To=class extends rn{constructor(e,t,n,i){super(e,t,n,i)}};To.prototype.ValueTypeName="vector";var Ao=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},au=new Ao,Co=class{constructor(e){this.manager=e!==void 0?e:au,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Co.DEFAULT_MATERIAL_NAME="__DEFAULT";var rr=class extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},or=class extends rr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},pl=new je,lh=new T,ch=new T,El=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new as,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;lh.setFromMatrixPosition(e.matrixWorld),t.position.copy(lh),ch.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ch),t.updateMatrixWorld(),pl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(pl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var wi=class extends Vs{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},wl=class extends El{constructor(){super(new wi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ar=class extends rr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new wl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ro=class extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Kl="\\[\\]\\.:\\/",bf=new RegExp("["+Kl+"]","g"),jl="[^"+Kl+"]",Mf="[^"+Kl.replace("\\.","")+"]",Sf=/((?:WC+[\/:])*)/.source.replace("WC",jl),Ef=/(WCOD+)?/.source.replace("WCOD",Mf),wf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jl),Tf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jl),Af=new RegExp("^"+Sf+Ef+wf+Tf+"$"),Cf=["material","materials","bones","map"],Tl=class{constructor(e,t,n){let i=n||ot.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ot=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(bf,"")}static parseTrackName(e){let t=Af.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Cf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ot.Composite=Tl;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Hy=new Float32Array(1);var hh=new je,lr=class{constructor(e,t,n=0,i=1/0){this.ray=new Hn(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new ss,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return hh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hh),this}intersectObject(e,t=!0,n=[]){return Al(e,this,n,t),n.sort(uh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Al(e[i],this,n,t);return n.sort(uh),n}};function uh(s,e){return s.distance-e.distance}function Al(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Al(r[o],e,t,!0)}}var ds=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var cr=class extends Mn{constructor(e=10,t=10,n=4473924,i=8947848){n=new ke(n),i=new ke(i);let r=t/2,o=e/t,a=e/2,l=[],c=[];for(let u=0,f=0,m=-a;u<=t;u++,m+=o){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);let y=u===r?n:i;y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3}let h=new Ye;h.setAttribute("position",new dt(l,3)),h.setAttribute("color",new dt(c,3));let d=new Pt({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var hr=class extends Tn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Ql(s,e,t,n){let i=Rf(n);switch(t){case Bl:return s*e;case Hl:return s*e/i.components*i.byteLength;case Go:return s*e/i.components*i.byteLength;case Vl:return s*e*2/i.components*i.byteLength;case Wo:return s*e*2/i.components*i.byteLength;case zl:return s*e*3/i.components*i.byteLength;case pn:return s*e*4/i.components*i.byteLength;case Xo:return s*e*4/i.components*i.byteLength;case fr:case pr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case mr:case gr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case qo:case Zo:return Math.max(s,16)*Math.max(e,8)/4;case $o:case Yo:return Math.max(s,8)*Math.max(e,8)/2;case Jo:case Ko:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case jo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ea:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case ta:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case na:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case ia:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case sa:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case ra:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case oa:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case aa:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case la:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ca:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case ha:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case ua:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case da:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case fa:case pa:case ma:return Math.ceil(s/4)*Math.ceil(e/4)*16;case ga:case ya:return Math.ceil(s/4)*Math.ceil(e/4)*8;case _a:case xa:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rf(s){switch(s){case Sn:case Ul:return{byteLength:1,components:1};case fs:case Nl:case ps:return{byteLength:2,components:1};case Ho:case Vo:return{byteLength:2,components:4};case ri:case zo:case Pn:return{byteLength:4,components:1};case Fl:case Ol:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Iu(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function If(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],y=d[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let y=d[f];s.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Df=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lf=`#ifdef USE_ALPHAHASH
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
#endif`,kf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ff=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Of=`#ifdef USE_AOMAP
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
#endif`,Bf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zf=`#ifdef USE_BATCHING
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
#endif`,Hf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xf=`#ifdef USE_IRIDESCENCE
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
#endif`,$f=`#ifdef USE_BUMPMAP
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
#endif`,qf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ep=`#if defined( USE_COLOR_ALPHA )
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
#endif`,tp=`#define PI 3.141592653589793
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
} // validated`,np=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ip=`vec3 transformedNormal = objectNormal;
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
#endif`,sp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,op=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ap=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lp="gl_FragColor = linearToOutputTexel( gl_FragColor );",cp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hp=`#ifdef USE_ENVMAP
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
#endif`,up=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,dp=`#ifdef USE_ENVMAP
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
#endif`,fp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pp=`#ifdef USE_ENVMAP
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
#endif`,mp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_p=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xp=`#ifdef USE_GRADIENTMAP
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
}`,vp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sp=`uniform bool receiveShadow;
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
#endif`,Ep=`#ifdef USE_ENVMAP
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
#endif`,wp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ap=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rp=`PhysicalMaterial material;
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
#endif`,Pp=`struct PhysicalMaterial {
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
}`,Ip=`
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
#endif`,Dp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Up=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Np=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Op=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Hp=`#if defined( USE_POINTS_UV )
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
#endif`,Vp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$p=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qp=`#ifdef USE_MORPHTARGETS
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
#endif`,Yp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,em=`#ifdef USE_NORMALMAP
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
#endif`,tm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,im=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,om=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,am=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,um=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gm=`float getShadowMask() {
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
}`,ym=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_m=`#ifdef USE_SKINNING
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
#endif`,xm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vm=`#ifdef USE_SKINNING
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
#endif`,bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Em=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wm=`#ifdef USE_TRANSMISSION
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
#endif`,Tm=`#ifdef USE_TRANSMISSION
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
#endif`,Am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Im=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Dm=`uniform sampler2D t2D;
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
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,km=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fm=`#include <common>
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
}`,Om=`#if DEPTH_PACKING == 3200
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
}`,Bm=`#define DISTANCE
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
}`,zm=`#define DISTANCE
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
}`,Hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gm=`uniform float scale;
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
}`,Wm=`uniform vec3 diffuse;
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
}`,Xm=`#include <common>
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
}`,$m=`uniform vec3 diffuse;
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
}`,qm=`#define LAMBERT
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
}`,Ym=`#define LAMBERT
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
}`,Zm=`#define MATCAP
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
}`,Jm=`#define MATCAP
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
}`,Km=`#define NORMAL
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
}`,jm=`#define NORMAL
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
}`,Qm=`#define PHONG
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
}`,eg=`#define PHONG
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
}`,tg=`#define STANDARD
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
}`,ng=`#define STANDARD
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
}`,ig=`#define TOON
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
}`,sg=`#define TOON
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
}`,rg=`uniform float size;
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
}`,og=`uniform vec3 diffuse;
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
}`,ag=`#include <common>
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
}`,lg=`uniform vec3 color;
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
}`,cg=`uniform float rotation;
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
}`,hg=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:Df,alphahash_pars_fragment:Lf,alphamap_fragment:kf,alphamap_pars_fragment:Uf,alphatest_fragment:Nf,alphatest_pars_fragment:Ff,aomap_fragment:Of,aomap_pars_fragment:Bf,batching_pars_vertex:zf,batching_vertex:Hf,begin_vertex:Vf,beginnormal_vertex:Gf,bsdfs:Wf,iridescence_fragment:Xf,bumpmap_pars_fragment:$f,clipping_planes_fragment:qf,clipping_planes_pars_fragment:Yf,clipping_planes_pars_vertex:Zf,clipping_planes_vertex:Jf,color_fragment:Kf,color_pars_fragment:jf,color_pars_vertex:Qf,color_vertex:ep,common:tp,cube_uv_reflection_fragment:np,defaultnormal_vertex:ip,displacementmap_pars_vertex:sp,displacementmap_vertex:rp,emissivemap_fragment:op,emissivemap_pars_fragment:ap,colorspace_fragment:lp,colorspace_pars_fragment:cp,envmap_fragment:hp,envmap_common_pars_fragment:up,envmap_pars_fragment:dp,envmap_pars_vertex:fp,envmap_physical_pars_fragment:Ep,envmap_vertex:pp,fog_vertex:mp,fog_pars_vertex:gp,fog_fragment:yp,fog_pars_fragment:_p,gradientmap_pars_fragment:xp,lightmap_pars_fragment:vp,lights_lambert_fragment:bp,lights_lambert_pars_fragment:Mp,lights_pars_begin:Sp,lights_toon_fragment:wp,lights_toon_pars_fragment:Tp,lights_phong_fragment:Ap,lights_phong_pars_fragment:Cp,lights_physical_fragment:Rp,lights_physical_pars_fragment:Pp,lights_fragment_begin:Ip,lights_fragment_maps:Dp,lights_fragment_end:Lp,logdepthbuf_fragment:kp,logdepthbuf_pars_fragment:Up,logdepthbuf_pars_vertex:Np,logdepthbuf_vertex:Fp,map_fragment:Op,map_pars_fragment:Bp,map_particle_fragment:zp,map_particle_pars_fragment:Hp,metalnessmap_fragment:Vp,metalnessmap_pars_fragment:Gp,morphinstance_vertex:Wp,morphcolor_vertex:Xp,morphnormal_vertex:$p,morphtarget_pars_vertex:qp,morphtarget_vertex:Yp,normal_fragment_begin:Zp,normal_fragment_maps:Jp,normal_pars_fragment:Kp,normal_pars_vertex:jp,normal_vertex:Qp,normalmap_pars_fragment:em,clearcoat_normal_fragment_begin:tm,clearcoat_normal_fragment_maps:nm,clearcoat_pars_fragment:im,iridescence_pars_fragment:sm,opaque_fragment:rm,packing:om,premultiplied_alpha_fragment:am,project_vertex:lm,dithering_fragment:cm,dithering_pars_fragment:hm,roughnessmap_fragment:um,roughnessmap_pars_fragment:dm,shadowmap_pars_fragment:fm,shadowmap_pars_vertex:pm,shadowmap_vertex:mm,shadowmask_pars_fragment:gm,skinbase_vertex:ym,skinning_pars_vertex:_m,skinning_vertex:xm,skinnormal_vertex:vm,specularmap_fragment:bm,specularmap_pars_fragment:Mm,tonemapping_fragment:Sm,tonemapping_pars_fragment:Em,transmission_fragment:wm,transmission_pars_fragment:Tm,uv_pars_fragment:Am,uv_pars_vertex:Cm,uv_vertex:Rm,worldpos_vertex:Pm,background_vert:Im,background_frag:Dm,backgroundCube_vert:Lm,backgroundCube_frag:km,cube_vert:Um,cube_frag:Nm,depth_vert:Fm,depth_frag:Om,distanceRGBA_vert:Bm,distanceRGBA_frag:zm,equirect_vert:Hm,equirect_frag:Vm,linedashed_vert:Gm,linedashed_frag:Wm,meshbasic_vert:Xm,meshbasic_frag:$m,meshlambert_vert:qm,meshlambert_frag:Ym,meshmatcap_vert:Zm,meshmatcap_frag:Jm,meshnormal_vert:Km,meshnormal_frag:jm,meshphong_vert:Qm,meshphong_frag:eg,meshphysical_vert:tg,meshphysical_frag:ng,meshtoon_vert:ig,meshtoon_frag:sg,points_vert:rg,points_frag:og,shadow_vert:ag,shadow_frag:lg,sprite_vert:cg,sprite_frag:hg},re={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},In={basic:{uniforms:Bt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Bt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ke(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Bt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Bt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Bt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new ke(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Bt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Bt([re.points,re.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Bt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Bt([re.common,re.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Bt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Bt([re.sprite,re.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Bt([re.common,re.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Bt([re.lights,re.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};In.physical={uniforms:Bt([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};var va={r:0,b:0,g:0},Pi=new vn,ug=new je;function dg(s,e,t,n,i,r,o){let a=new ke(0),l=r===!0?0:1,c,h,d=null,u=0,f=null;function m(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?t:e).get(v)),v}function y(b){let v=!1,C=m(b);C===null?p(a,l):C&&C.isColor&&(p(C,1),v=!0);let R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(b,v){let C=m(v);C&&(C.isCubeTexture||C.mapping===ur)?(h===void 0&&(h=new lt(new rs(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Ri(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,I,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Pi.copy(v.backgroundRotation),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ug.makeRotationFromEuler(Pi)),h.material.toneMapped=$e.getTransfer(C.colorSpace)!==Ke,(d!==C||u!==C.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=C,u=C.version,f=s.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new lt(new Vn(2,2),new bn({name:"BackgroundMaterial",uniforms:Ri(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=$e.getTransfer(C.colorSpace)!==Ke,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||u!==C.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=C,u=C.version,f=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,v){b.getRGB(va,Zl(s)),n.buffers.color.setClear(va.r,va.g,va.b,v,o)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,v=1){a.set(b),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:y,addToRenderList:g,dispose:w}}function fg(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,o=!1;function a(M,D,B,V,X){let Y=!1,W=d(V,B,D);r!==W&&(r=W,c(r.object)),Y=f(M,V,B,X),Y&&m(M,V,B,X),X!==null&&e.update(X,s.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,v(M,D,B,V),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function d(M,D,B){let V=B.wireframe===!0,X=n[M.id];X===void 0&&(X={},n[M.id]=X);let Y=X[D.id];Y===void 0&&(Y={},X[D.id]=Y);let W=Y[V];return W===void 0&&(W=u(l()),Y[V]=W),W}function u(M){let D=[],B=[],V=[];for(let X=0;X<t;X++)D[X]=0,B[X]=0,V[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:V,object:M,attributes:{},index:null}}function f(M,D,B,V){let X=r.attributes,Y=D.attributes,W=0,te=B.getAttributes();for(let z in te)if(te[z].location>=0){let he=X[z],Ee=Y[z];if(Ee===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(Ee=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(Ee=M.instanceColor)),he===void 0||he.attribute!==Ee||Ee&&he.data!==Ee.data)return!0;W++}return r.attributesNum!==W||r.index!==V}function m(M,D,B,V){let X={},Y=D.attributes,W=0,te=B.getAttributes();for(let z in te)if(te[z].location>=0){let he=Y[z];he===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(he=M.instanceColor));let Ee={};Ee.attribute=he,he&&he.data&&(Ee.data=he.data),X[z]=Ee,W++}r.attributes=X,r.attributesNum=W,r.index=V}function y(){let M=r.newAttributes;for(let D=0,B=M.length;D<B;D++)M[D]=0}function g(M){p(M,0)}function p(M,D){let B=r.newAttributes,V=r.enabledAttributes,X=r.attributeDivisors;B[M]=1,V[M]===0&&(s.enableVertexAttribArray(M),V[M]=1),X[M]!==D&&(s.vertexAttribDivisor(M,D),X[M]=D)}function w(){let M=r.newAttributes,D=r.enabledAttributes;for(let B=0,V=D.length;B<V;B++)D[B]!==M[B]&&(s.disableVertexAttribArray(B),D[B]=0)}function b(M,D,B,V,X,Y,W){W===!0?s.vertexAttribIPointer(M,D,B,X,Y):s.vertexAttribPointer(M,D,B,V,X,Y)}function v(M,D,B,V){y();let X=V.attributes,Y=B.getAttributes(),W=D.defaultAttributeValues;for(let te in Y){let z=Y[te];if(z.location>=0){let oe=X[te];if(oe===void 0&&(te==="instanceMatrix"&&M.instanceMatrix&&(oe=M.instanceMatrix),te==="instanceColor"&&M.instanceColor&&(oe=M.instanceColor)),oe!==void 0){let he=oe.normalized,Ee=oe.itemSize,Ve=e.get(oe);if(Ve===void 0)continue;let it=Ve.buffer,ct=Ve.type,Ze=Ve.bytesPerElement,$=ct===s.INT||ct===s.UNSIGNED_INT||oe.gpuType===zo;if(oe.isInterleavedBufferAttribute){let J=oe.data,fe=J.stride,Le=oe.offset;if(J.isInstancedInterleavedBuffer){for(let Se=0;Se<z.locationSize;Se++)p(z.location+Se,J.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Se=0;Se<z.locationSize;Se++)g(z.location+Se);s.bindBuffer(s.ARRAY_BUFFER,it);for(let Se=0;Se<z.locationSize;Se++)b(z.location+Se,Ee/z.locationSize,ct,he,fe*Ze,(Le+Ee/z.locationSize*Se)*Ze,$)}else{if(oe.isInstancedBufferAttribute){for(let J=0;J<z.locationSize;J++)p(z.location+J,oe.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let J=0;J<z.locationSize;J++)g(z.location+J);s.bindBuffer(s.ARRAY_BUFFER,it);for(let J=0;J<z.locationSize;J++)b(z.location+J,Ee/z.locationSize,ct,he,Ee*Ze,Ee/z.locationSize*J*Ze,$)}}else if(W!==void 0){let he=W[te];if(he!==void 0)switch(he.length){case 2:s.vertexAttrib2fv(z.location,he);break;case 3:s.vertexAttrib3fv(z.location,he);break;case 4:s.vertexAttrib4fv(z.location,he);break;default:s.vertexAttrib1fv(z.location,he)}}}}w()}function C(){U();for(let M in n){let D=n[M];for(let B in D){let V=D[B];for(let X in V)h(V[X].object),delete V[X];delete D[B]}delete n[M]}}function R(M){if(n[M.id]===void 0)return;let D=n[M.id];for(let B in D){let V=D[B];for(let X in V)h(V[X].object),delete V[X];delete D[B]}delete n[M.id]}function I(M){for(let D in n){let B=n[D];if(B[M.id]===void 0)continue;let V=B[M.id];for(let X in V)h(V[X].object),delete V[X];delete B[M.id]}}function U(){S(),o=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:U,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:I,initAttributes:y,enableAttribute:g,disableUnusedAttributes:w}}function pg(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function a(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let m=0;m<d;m++)f+=h[m];t.update(f,n,1)}function l(c,h,d,u){if(d===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],u[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let m=0;for(let y=0;y<d;y++)m+=h[y]*u[y];t.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function mg(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(I){return!(I!==pn&&n.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let U=I===ps&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Sn&&n.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Pn&&!U)}function l(I){if(I==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:w,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:C,maxSamples:R}}function gg(s){let e=this,t=null,n=0,i=!1,r=!1,o=new Nt,a=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,p=s.get(d);if(!i||m===null||m.length===0||r&&!g)r?h(null):c();else{let w=r?0:n,b=w*4,v=p.clippingState||null;l.value=v,v=h(m,u,b,f);for(let C=0;C!==b;++C)v[C]=t[C];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,m){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=l.value,m!==!0||g===null){let p=f+y*4,w=u.matrixWorldInverse;a.getNormalMatrix(w),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,v=f;b!==y;++b,v+=4)o.copy(d[b]).applyMatrix4(w,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function yg(s){let e=new WeakMap;function t(o,a){return a===Fo?o.mapping=Ti:a===Oo&&(o.mapping=Ai),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Fo||a===Oo)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new lo(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var _s=4,lu=[.125,.215,.35,.446,.526,.582],Li=20,ec=new wi,cu=new ke,tc=null,nc=0,ic=0,sc=!1,Di=(1+Math.sqrt(5))/2,ys=1/Di,hu=[new T(-Di,ys,0),new T(Di,ys,0),new T(-ys,0,Di),new T(ys,0,Di),new T(0,Di,-ys),new T(0,Di,ys),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],_g=new T,Sa=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=_g}=r;tc=this._renderer.getRenderTarget(),nc=this._renderer.getActiveCubeFace(),ic=this._renderer.getActiveMipmapLevel(),sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=du(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(tc,nc,ic),this._renderer.xr.enabled=sc,e.scissorTest=!1,ba(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ti||e.mapping===Ai?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tc=this._renderer.getRenderTarget(),nc=this._renderer.getActiveCubeFace(),ic=this._renderer.getActiveMipmapLevel(),sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:ps,format:pn,colorSpace:xi,depthBuffer:!1},i=uu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uu(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=xg(r)),this._blurMaterial=vg(r,e,t)}return i}_compileMaterial(e){let t=new lt(this._lodPlanes[0],e);this._renderer.compile(t,ec)}_sceneToCubeUV(e,t,n,i,r){let l=new Yt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(cu),d.toneMapping=Wn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null));let y=new Ft({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1}),g=new lt(new rs,y),p=!1,w=e.background;w?w.isColor&&(y.color.copy(w),e.background=null,p=!0):(y.color.copy(cu),p=!0);for(let b=0;b<6;b++){let v=b%3;v===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):v===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));let C=this._cubeSize;ba(i,v*C,b>2?C:0,C,C),d.setRenderTarget(i),p&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,e.background=w}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Ti||e.mapping===Ai;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=fu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=du());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new lt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;ba(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ec)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=hu[(i-r-1)%hu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new lt(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Li-1),y=r/m,g=isFinite(r)?1+Math.floor(h*y):Li;g>Li&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Li}`);let p=[],w=0;for(let I=0;I<Li;++I){let U=I/y,S=Math.exp(-U*U/2);p.push(S),I===0?w+=S:I<g&&(w+=2*S)}for(let I=0;I<p.length;I++)p[I]=p[I]/w;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:b}=this;u.dTheta.value=m,u.mipInt.value=b-n;let v=this._sizeLods[i],C=3*v*(i>b-_s?i-b+_s:0),R=4*(this._cubeSize-v);ba(t,C,R,3*v,2*v),l.setRenderTarget(t),l.render(d,ec)}};function xg(s){let e=[],t=[],n=[],i=s,r=s-_s+1+lu.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let l=1/a;o>s-_s?l=lu[o-s+_s-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,y=3,g=2,p=1,w=new Float32Array(y*m*f),b=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let R=0;R<f;R++){let I=R%3*2/3-1,U=R>2?0:-1,S=[I,U,0,I+2/3,U,0,I+2/3,U+1,0,I,U,0,I+2/3,U+1,0,I,U+1,0];w.set(S,y*m*R),b.set(u,g*m*R);let M=[R,R,R,R,R,R];v.set(M,p*m*R)}let C=new Ye;C.setAttribute("position",new at(w,y)),C.setAttribute("uv",new at(b,g)),C.setAttribute("faceIndex",new at(v,p)),e.push(C),i>_s&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function uu(s,e,t){let n=new An(s,e,t);return n.texture.mapping=ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ba(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function vg(s,e,t){let n=new Float32Array(Li),i=new T(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:pc(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function du(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pc(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function fu(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function pc(){return`

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
	`}function bg(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Fo||l===Oo,h=l===Ti||l===Ai;if(c||h){let d=e.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Sa(s)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Sa(s)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Mg(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&ns("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Sg(s,e,t,n){let i={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",o),delete i[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,m=d.attributes.position,y=0;if(f!==null){let w=f.array;y=f.version;for(let b=0,v=w.length;b<v;b+=3){let C=w[b+0],R=w[b+1],I=w[b+2];u.push(C,R,R,I,I,C)}}else if(m!==void 0){let w=m.array;y=m.version;for(let b=0,v=w.length/3-1;b<v;b+=3){let C=b+0,R=b+1,I=b+2;u.push(C,R,R,I,I,C)}}else return;let g=new(Yl(u)?Hs:zs)(u,1);g.version=y;let p=r.get(d);p&&e.remove(p),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Eg(s,e,t){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){s.drawElements(n,f,r,u*o),t.update(f,n,1)}function c(u,f,m){m!==0&&(s.drawElementsInstanced(n,f,r,u*o,m),t.update(f,n,m))}function h(u,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function d(u,f,m,y){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],y[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,y,0,m);let p=0;for(let w=0;w<m;w++)p+=f[w]*y[w];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function wg(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Tg(s,e,t){let n=new WeakMap,i=new gt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let S=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],b=0;f===!0&&(b=1),m===!0&&(b=2),y===!0&&(b=3);let v=a.attributes.position.count*b,C=1;v>e.maxTextureSize&&(C=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let R=new Float32Array(v*C*4*d),I=new Bs(R,v,C,d);I.type=Pn,I.needsUpdate=!0;let U=b*4;for(let M=0;M<d;M++){let D=g[M],B=p[M],V=w[M],X=v*C*4*M;for(let Y=0;Y<D.count;Y++){let W=Y*U;f===!0&&(i.fromBufferAttribute(D,Y),R[X+W+0]=i.x,R[X+W+1]=i.y,R[X+W+2]=i.z,R[X+W+3]=0),m===!0&&(i.fromBufferAttribute(B,Y),R[X+W+4]=i.x,R[X+W+5]=i.y,R[X+W+6]=i.z,R[X+W+7]=0),y===!0&&(i.fromBufferAttribute(V,Y),R[X+W+8]=i.x,R[X+W+9]=i.y,R[X+W+10]=i.z,R[X+W+11]=V.itemSize===4?i.w:1)}}u={count:d,texture:I,size:new se(v,C)},n.set(a,u),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Ag(s,e,t,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=e.get(l,h);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var Du=new tn,pu=new $s(1,1),Lu=new Bs,ku=new oo,Uu=new Gs,mu=[],gu=[],yu=new Float32Array(16),_u=new Float32Array(9),xu=new Float32Array(4);function vs(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=mu[i];if(r===void 0&&(r=new Float32Array(i),mu[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function wt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Tt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function wa(s,e){let t=gu[e];t===void 0&&(t=new Int32Array(e),gu[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Cg(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Rg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;s.uniform2fv(this.addr,e),Tt(t,e)}}function Pg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;s.uniform3fv(this.addr,e),Tt(t,e)}}function Ig(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;s.uniform4fv(this.addr,e),Tt(t,e)}}function Dg(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,n))return;xu.set(n),s.uniformMatrix2fv(this.addr,!1,xu),Tt(t,n)}}function Lg(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,n))return;_u.set(n),s.uniformMatrix3fv(this.addr,!1,_u),Tt(t,n)}}function kg(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,n))return;yu.set(n),s.uniformMatrix4fv(this.addr,!1,yu),Tt(t,n)}}function Ug(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Ng(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;s.uniform2iv(this.addr,e),Tt(t,e)}}function Fg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;s.uniform3iv(this.addr,e),Tt(t,e)}}function Og(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;s.uniform4iv(this.addr,e),Tt(t,e)}}function Bg(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function zg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;s.uniform2uiv(this.addr,e),Tt(t,e)}}function Hg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;s.uniform3uiv(this.addr,e),Tt(t,e)}}function Vg(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;s.uniform4uiv(this.addr,e),Tt(t,e)}}function Gg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(pu.compareFunction=Wl,r=pu):r=Du,t.setTexture2D(e||r,i)}function Wg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ku,i)}function Xg(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Uu,i)}function $g(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Lu,i)}function qg(s){switch(s){case 5126:return Cg;case 35664:return Rg;case 35665:return Pg;case 35666:return Ig;case 35674:return Dg;case 35675:return Lg;case 35676:return kg;case 5124:case 35670:return Ug;case 35667:case 35671:return Ng;case 35668:case 35672:return Fg;case 35669:case 35673:return Og;case 5125:return Bg;case 36294:return zg;case 36295:return Hg;case 36296:return Vg;case 35678:case 36198:case 36298:case 36306:case 35682:return Gg;case 35679:case 36299:case 36307:return Wg;case 35680:case 36300:case 36308:case 36293:return Xg;case 36289:case 36303:case 36311:case 36292:return $g}}function Yg(s,e){s.uniform1fv(this.addr,e)}function Zg(s,e){let t=vs(e,this.size,2);s.uniform2fv(this.addr,t)}function Jg(s,e){let t=vs(e,this.size,3);s.uniform3fv(this.addr,t)}function Kg(s,e){let t=vs(e,this.size,4);s.uniform4fv(this.addr,t)}function jg(s,e){let t=vs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Qg(s,e){let t=vs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function e0(s,e){let t=vs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function t0(s,e){s.uniform1iv(this.addr,e)}function n0(s,e){s.uniform2iv(this.addr,e)}function i0(s,e){s.uniform3iv(this.addr,e)}function s0(s,e){s.uniform4iv(this.addr,e)}function r0(s,e){s.uniform1uiv(this.addr,e)}function o0(s,e){s.uniform2uiv(this.addr,e)}function a0(s,e){s.uniform3uiv(this.addr,e)}function l0(s,e){s.uniform4uiv(this.addr,e)}function c0(s,e,t){let n=this.cache,i=e.length,r=wa(t,i);wt(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Du,r[o])}function h0(s,e,t){let n=this.cache,i=e.length,r=wa(t,i);wt(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||ku,r[o])}function u0(s,e,t){let n=this.cache,i=e.length,r=wa(t,i);wt(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Uu,r[o])}function d0(s,e,t){let n=this.cache,i=e.length,r=wa(t,i);wt(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Lu,r[o])}function f0(s){switch(s){case 5126:return Yg;case 35664:return Zg;case 35665:return Jg;case 35666:return Kg;case 35674:return jg;case 35675:return Qg;case 35676:return e0;case 5124:case 35670:return t0;case 35667:case 35671:return n0;case 35668:case 35672:return i0;case 35669:case 35673:return s0;case 5125:return r0;case 36294:return o0;case 36295:return a0;case 36296:return l0;case 35678:case 36198:case 36298:case 36306:case 35682:return c0;case 35679:case 36299:case 36307:return h0;case 35680:case 36300:case 36308:case 36293:return u0;case 36289:case 36303:case 36311:case 36292:return d0}}var oc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=qg(t.type)}},ac=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=f0(t.type)}},lc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},rc=/(\w+)(\])?(\[|\.)?/g;function vu(s,e){s.seq.push(e),s.map[e.id]=e}function p0(s,e,t){let n=s.name,i=n.length;for(rc.lastIndex=0;;){let r=rc.exec(n),o=rc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){vu(t,c===void 0?new oc(a,s,e):new ac(a,s,e));break}else{let d=t.map[a];d===void 0&&(d=new lc(a),vu(t,d)),t=d}}}var xs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);p0(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function bu(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var m0=37297,g0=0;function y0(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Mu=new Fe;function _0(s){$e._getMatrix(Mu,$e.workingColorSpace,s);let e=`mat3( ${Mu.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(s)){case Ns:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Su(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+y0(s.getShaderSource(e),a)}else return r}function x0(s,e){let t=_0(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function v0(s,e){let t;switch(e){case Uh:t="Linear";break;case Nh:t="Reinhard";break;case Fh:t="Cineon";break;case Oh:t="ACESFilmic";break;case zh:t="AgX";break;case Hh:t="Neutral";break;case Bh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ma=new T;function b0(){$e.getLuminanceCoefficients(Ma);let s=Ma.x.toFixed(4),e=Ma.y.toFixed(4),t=Ma.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function M0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yr).join(`
`)}function S0(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function E0(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function yr(s){return s!==""}function Eu(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wu(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var w0=/^[ \t]*#include +<([\w\d./]+)>/gm;function cc(s){return s.replace(w0,A0)}var T0=new Map;function A0(s,e){let t=He[e];if(t===void 0){let n=T0.get(e);if(n!==void 0)t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return cc(t)}var C0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tu(s){return s.replace(C0,R0)}function R0(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Au(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function P0(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Rl?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===ph?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Rn&&(e="SHADOWMAP_TYPE_VSM"),e}function I0(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ti:case Ai:e="ENVMAP_TYPE_CUBE";break;case ur:e="ENVMAP_TYPE_CUBE_UV";break}return e}function D0(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ai:e="ENVMAP_MODE_REFRACTION";break}return e}function L0(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ll:e="ENVMAP_BLENDING_MULTIPLY";break;case Lh:e="ENVMAP_BLENDING_MIX";break;case kh:e="ENVMAP_BLENDING_ADD";break}return e}function k0(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function U0(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=P0(t),c=I0(t),h=D0(t),d=L0(t),u=k0(t),f=M0(t),m=S0(r),y=i.createProgram(),g,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(yr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(yr).join(`
`),p.length>0&&(p+=`
`)):(g=[Au(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yr).join(`
`),p=[Au(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wn?"#define TONE_MAPPING":"",t.toneMapping!==Wn?He.tonemapping_pars_fragment:"",t.toneMapping!==Wn?v0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,x0("linearToOutputTexel",t.outputColorSpace),b0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(yr).join(`
`)),o=cc(o),o=Eu(o,t),o=wu(o,t),a=cc(a),a=Eu(a,t),a=wu(a,t),o=Tu(o),a=Tu(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Xl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let b=w+g+o,v=w+p+a,C=bu(i,i.VERTEX_SHADER,b),R=bu(i,i.FRAGMENT_SHADER,v);i.attachShader(y,C),i.attachShader(y,R),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function I(D){if(s.debug.checkShaderErrors){let B=i.getProgramInfoLog(y)||"",V=i.getShaderInfoLog(C)||"",X=i.getShaderInfoLog(R)||"",Y=B.trim(),W=V.trim(),te=X.trim(),z=!0,oe=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,C,R);else{let he=Su(i,C,"vertex"),Ee=Su(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Y+`
`+he+`
`+Ee)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(W===""||te==="")&&(oe=!1);oe&&(D.diagnostics={runnable:z,programLog:Y,vertexShader:{log:W,prefix:g},fragmentShader:{log:te,prefix:p}})}i.deleteShader(C),i.deleteShader(R),U=new xs(i,y),S=E0(i,y)}let U;this.getUniforms=function(){return U===void 0&&I(this),U};let S;this.getAttributes=function(){return S===void 0&&I(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(y,m0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=g0++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=C,this.fragmentShader=R,this}var N0=0,hc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new uc(e),t.set(e,n)),n}},uc=class{constructor(e){this.id=N0++,this.code=e,this.usedTimes=0}};function F0(s,e,t,n,i,r,o){let a=new ss,l=new hc,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures,f=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,D,B,V){let X=B.fog,Y=V.geometry,W=S.isMeshStandardMaterial?B.environment:null,te=(S.isMeshStandardMaterial?t:e).get(S.envMap||W),z=te&&te.mapping===ur?te.image.height:null,oe=m[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let he=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ee=he!==void 0?he.length:0,Ve=0;Y.morphAttributes.position!==void 0&&(Ve=1),Y.morphAttributes.normal!==void 0&&(Ve=2),Y.morphAttributes.color!==void 0&&(Ve=3);let it,ct,Ze,$;if(oe){let Je=In[oe];it=Je.vertexShader,ct=Je.fragmentShader}else it=S.vertexShader,ct=S.fragmentShader,l.update(S),Ze=l.getVertexShaderID(S),$=l.getFragmentShaderID(S);let J=s.getRenderTarget(),fe=s.state.buffers.depth.getReversed(),Le=V.isInstancedMesh===!0,Se=V.isBatchedMesh===!0,Xe=!!S.map,Lt=!!S.matcap,A=!!te,ht=!!S.aoMap,Ne=!!S.lightMap,Ie=!!S.bumpMap,ge=!!S.normalMap,ut=!!S.displacementMap,ye=!!S.emissiveMap,Be=!!S.metalnessMap,Ct=!!S.roughnessMap,vt=S.anisotropy>0,E=S.clearcoat>0,_=S.dispersion>0,N=S.iridescence>0,G=S.sheen>0,Z=S.transmission>0,H=vt&&!!S.anisotropyMap,be=E&&!!S.clearcoatMap,ne=E&&!!S.clearcoatNormalMap,_e=E&&!!S.clearcoatRoughnessMap,xe=N&&!!S.iridescenceMap,Q=N&&!!S.iridescenceThicknessMap,ce=G&&!!S.sheenColorMap,Pe=G&&!!S.sheenRoughnessMap,ve=!!S.specularMap,ae=!!S.specularColorMap,Oe=!!S.specularIntensityMap,P=Z&&!!S.transmissionMap,ee=Z&&!!S.thicknessMap,ie=!!S.gradientMap,de=!!S.alphaMap,K=S.alphaTest>0,q=!!S.alphaHash,me=!!S.extensions,Ue=Wn;S.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ue=s.toneMapping);let st={shaderID:oe,shaderType:S.type,shaderName:S.name,vertexShader:it,fragmentShader:ct,defines:S.defines,customVertexShaderID:Ze,customFragmentShaderID:$,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Se,batchingColor:Se&&V._colorsTexture!==null,instancing:Le,instancingColor:Le&&V.instanceColor!==null,instancingMorph:Le&&V.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:J===null?s.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:xi,alphaToCoverage:!!S.alphaToCoverage,map:Xe,matcap:Lt,envMap:A,envMapMode:A&&te.mapping,envMapCubeUVHeight:z,aoMap:ht,lightMap:Ne,bumpMap:Ie,normalMap:ge,displacementMap:u&&ut,emissiveMap:ye,normalMapObjectSpace:ge&&S.normalMapType===Xh,normalMapTangentSpace:ge&&S.normalMapType===Gl,metalnessMap:Be,roughnessMap:Ct,anisotropy:vt,anisotropyMap:H,clearcoat:E,clearcoatMap:be,clearcoatNormalMap:ne,clearcoatRoughnessMap:_e,dispersion:_,iridescence:N,iridescenceMap:xe,iridescenceThicknessMap:Q,sheen:G,sheenColorMap:ce,sheenRoughnessMap:Pe,specularMap:ve,specularColorMap:ae,specularIntensityMap:Oe,transmission:Z,transmissionMap:P,thicknessMap:ee,gradientMap:ie,opaque:S.transparent===!1&&S.blending===yi&&S.alphaToCoverage===!1,alphaMap:de,alphaTest:K,alphaHash:q,combine:S.combine,mapUv:Xe&&y(S.map.channel),aoMapUv:ht&&y(S.aoMap.channel),lightMapUv:Ne&&y(S.lightMap.channel),bumpMapUv:Ie&&y(S.bumpMap.channel),normalMapUv:ge&&y(S.normalMap.channel),displacementMapUv:ut&&y(S.displacementMap.channel),emissiveMapUv:ye&&y(S.emissiveMap.channel),metalnessMapUv:Be&&y(S.metalnessMap.channel),roughnessMapUv:Ct&&y(S.roughnessMap.channel),anisotropyMapUv:H&&y(S.anisotropyMap.channel),clearcoatMapUv:be&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:ne&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&y(S.sheenRoughnessMap.channel),specularMapUv:ve&&y(S.specularMap.channel),specularColorMapUv:ae&&y(S.specularColorMap.channel),specularIntensityMapUv:Oe&&y(S.specularIntensityMap.channel),transmissionMapUv:P&&y(S.transmissionMap.channel),thicknessMapUv:ee&&y(S.thicknessMap.channel),alphaMapUv:de&&y(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(ge||vt),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Y.attributes.uv&&(Xe||de),fog:!!X,useFog:S.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:fe,skinning:V.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Ve,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ue,decodeVideoTexture:Xe&&S.map.isVideoTexture===!0&&$e.getTransfer(S.map.colorSpace)===Ke,decodeVideoTextureEmissive:ye&&S.emissiveMap.isVideoTexture===!0&&$e.getTransfer(S.emissiveMap.colorSpace)===Ke,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===xt,flipSided:S.side===Wt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:me&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&S.extensions.multiDraw===!0||Se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let D in S.defines)M.push(D),M.push(S.defines[D]);return S.isRawShaderMaterial===!1&&(w(M,S),b(M,S),M.push(s.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function w(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function b(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){let M=m[S.type],D;if(M){let B=In[M];D=nu.clone(B.uniforms)}else D=S.uniforms;return D}function C(S,M){let D;for(let B=0,V=h.length;B<V;B++){let X=h[B];if(X.cacheKey===M){D=X,++D.usedTimes;break}}return D===void 0&&(D=new U0(s,M,S,r),h.push(D)),D}function R(S){if(--S.usedTimes===0){let M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function I(S){l.remove(S)}function U(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:R,releaseShaderCache:I,programs:h,dispose:U}}function O0(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function B0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Cu(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Ru(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(d,u,f,m,y,g){let p=s[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:m,renderOrder:d.renderOrder,z:y,group:g},s[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=y,p.group=g),e++,p}function a(d,u,f,m,y,g){let p=o(d,u,f,m,y,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(d,u,f,m,y,g){let p=o(d,u,f,m,y,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,u){t.length>1&&t.sort(d||B0),n.length>1&&n.sort(u||Cu),i.length>1&&i.sort(u||Cu)}function h(){for(let d=e,u=s.length;d<u;d++){let f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function z0(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new Ru,s.set(n,[o])):i>=r.length?(o=new Ru,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function H0(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new ke};break;case"SpotLight":t={position:new T,direction:new T,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new T,halfWidth:new T,halfHeight:new T};break}return s[e.id]=t,t}}}function V0(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var G0=0;function W0(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function X0(s){let e=new H0,t=V0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new T);let i=new T,r=new je,o=new je;function a(c){let h=0,d=0,u=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,w=0,b=0,v=0,C=0,R=0,I=0;c.sort(W0);for(let S=0,M=c.length;S<M;S++){let D=c[S],B=D.color,V=D.intensity,X=D.distance,Y=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=B.r*V,d+=B.g*V,u+=B.b*V;else if(D.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(D.sh.coefficients[W],V);I++}else if(D.isDirectionalLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let te=D.shadow,z=t.get(D);z.shadowIntensity=te.intensity,z.shadowBias=te.bias,z.shadowNormalBias=te.normalBias,z.shadowRadius=te.radius,z.shadowMapSize=te.mapSize,n.directionalShadow[f]=z,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=D.shadow.matrix,w++}n.directional[f]=W,f++}else if(D.isSpotLight){let W=e.get(D);W.position.setFromMatrixPosition(D.matrixWorld),W.color.copy(B).multiplyScalar(V),W.distance=X,W.coneCos=Math.cos(D.angle),W.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),W.decay=D.decay,n.spot[y]=W;let te=D.shadow;if(D.map&&(n.spotLightMap[C]=D.map,C++,te.updateMatrices(D),D.castShadow&&R++),n.spotLightMatrix[y]=te.matrix,D.castShadow){let z=t.get(D);z.shadowIntensity=te.intensity,z.shadowBias=te.bias,z.shadowNormalBias=te.normalBias,z.shadowRadius=te.radius,z.shadowMapSize=te.mapSize,n.spotShadow[y]=z,n.spotShadowMap[y]=Y,v++}y++}else if(D.isRectAreaLight){let W=e.get(D);W.color.copy(B).multiplyScalar(V),W.halfWidth.set(D.width*.5,0,0),W.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=W,g++}else if(D.isPointLight){let W=e.get(D);if(W.color.copy(D.color).multiplyScalar(D.intensity),W.distance=D.distance,W.decay=D.decay,D.castShadow){let te=D.shadow,z=t.get(D);z.shadowIntensity=te.intensity,z.shadowBias=te.bias,z.shadowNormalBias=te.normalBias,z.shadowRadius=te.radius,z.shadowMapSize=te.mapSize,z.shadowCameraNear=te.camera.near,z.shadowCameraFar=te.camera.far,n.pointShadow[m]=z,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=D.shadow.matrix,b++}n.point[m]=W,m++}else if(D.isHemisphereLight){let W=e.get(D);W.skyColor.copy(D.color).multiplyScalar(V),W.groundColor.copy(D.groundColor).multiplyScalar(V),n.hemi[p]=W,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let U=n.hash;(U.directionalLength!==f||U.pointLength!==m||U.spotLength!==y||U.rectAreaLength!==g||U.hemiLength!==p||U.numDirectionalShadows!==w||U.numPointShadows!==b||U.numSpotShadows!==v||U.numSpotMaps!==C||U.numLightProbes!==I)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=v+C-R,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=I,U.directionalLength=f,U.pointLength=m,U.spotLength=y,U.rectAreaLength=g,U.hemiLength=p,U.numDirectionalShadows=w,U.numPointShadows=b,U.numSpotShadows=v,U.numSpotMaps=C,U.numLightProbes=I,n.version=G0++)}function l(c,h){let d=0,u=0,f=0,m=0,y=0,g=h.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){let b=c[p];if(b.isDirectionalLight){let v=n.directional[d];v.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),d++}else if(b.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),f++}else if(b.isRectAreaLight){let v=n.rectArea[m];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(b.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(b.isPointLight){let v=n.point[u];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),u++}else if(b.isHemisphereLight){let v=n.hemi[y];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(g),y++}}}return{setup:a,setupView:l,state:n}}function Pu(s){let e=new X0(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function $0(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new Pu(s),e.set(i,[a])):r>=o.length?(a=new Pu(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var q0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Y0=`uniform sampler2D shadow_pass;
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
}`;function Z0(s,e,t){let n=new as,i=new se,r=new se,o=new gt,a=new _o({depthPacking:Wh}),l=new xo,c={},h=t.maxTextureSize,d={[zn]:Wt,[Wt]:zn,[xt]:xt},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:q0,fragmentShader:Y0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new Ye;m.setAttribute("position",new at(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new lt(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rl;let p=this.type;this.render=function(R,I,U){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;let S=s.getRenderTarget(),M=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),B=s.state;B.setBlending(Gn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let V=p!==Rn&&this.type===Rn,X=p===Rn&&this.type!==Rn;for(let Y=0,W=R.length;Y<W;Y++){let te=R[Y],z=te.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);let oe=z.getFrameExtents();if(i.multiply(oe),r.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/oe.x),i.x=r.x*oe.x,z.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/oe.y),i.y=r.y*oe.y,z.mapSize.y=r.y)),z.map===null||V===!0||X===!0){let Ee=this.type!==Rn?{minFilter:dn,magFilter:dn}:{};z.map!==null&&z.map.dispose(),z.map=new An(i.x,i.y,Ee),z.map.texture.name=te.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();let he=z.getViewportCount();for(let Ee=0;Ee<he;Ee++){let Ve=z.getViewport(Ee);o.set(r.x*Ve.x,r.y*Ve.y,r.x*Ve.z,r.y*Ve.w),B.viewport(o),z.updateMatrices(te,Ee),n=z.getFrustum(),v(I,U,z.camera,te,this.type)}z.isPointLightShadow!==!0&&this.type===Rn&&w(z,U),z.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(S,M,D)};function w(R,I){let U=e.update(y);u.defines.VSM_SAMPLES!==R.blurSamples&&(u.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new An(i.x,i.y)),u.uniforms.shadow_pass.value=R.map.texture,u.uniforms.resolution.value=R.mapSize,u.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(I,null,U,u,y,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(I,null,U,f,y,null)}function b(R,I,U,S){let M=null,D=U.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)M=D;else if(M=U.isPointLight===!0?l:a,s.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let B=M.uuid,V=I.uuid,X=c[B];X===void 0&&(X={},c[B]=X);let Y=X[V];Y===void 0&&(Y=M.clone(),X[V]=Y,I.addEventListener("dispose",C)),M=Y}if(M.visible=I.visible,M.wireframe=I.wireframe,S===Rn?M.side=I.shadowSide!==null?I.shadowSide:I.side:M.side=I.shadowSide!==null?I.shadowSide:d[I.side],M.alphaMap=I.alphaMap,M.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,M.map=I.map,M.clipShadows=I.clipShadows,M.clippingPlanes=I.clippingPlanes,M.clipIntersection=I.clipIntersection,M.displacementMap=I.displacementMap,M.displacementScale=I.displacementScale,M.displacementBias=I.displacementBias,M.wireframeLinewidth=I.wireframeLinewidth,M.linewidth=I.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let B=s.properties.get(M);B.light=U}return M}function v(R,I,U,S,M){if(R.visible===!1)return;if(R.layers.test(I.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===Rn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,R.matrixWorld);let V=e.update(R),X=R.material;if(Array.isArray(X)){let Y=V.groups;for(let W=0,te=Y.length;W<te;W++){let z=Y[W],oe=X[z.materialIndex];if(oe&&oe.visible){let he=b(R,oe,S,M);R.onBeforeShadow(s,R,I,U,V,he,z),s.renderBufferDirect(U,null,V,he,R,z),R.onAfterShadow(s,R,I,U,V,he,z)}}}else if(X.visible){let Y=b(R,X,S,M);R.onBeforeShadow(s,R,I,U,V,Y,null),s.renderBufferDirect(U,null,V,Y,R,null),R.onAfterShadow(s,R,I,U,V,Y,null)}}let B=R.children;for(let V=0,X=B.length;V<X;V++)v(B[V],I,U,S,M)}function C(R){R.target.removeEventListener("dispose",C);for(let U in c){let S=c[U],M=R.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var J0={[Po]:Io,[Do]:Uo,[Lo]:No,[_i]:ko,[Io]:Po,[Uo]:Do,[No]:Lo,[ko]:_i};function K0(s,e){function t(){let P=!1,ee=new gt,ie=null,de=new gt(0,0,0,0);return{setMask:function(K){ie!==K&&!P&&(s.colorMask(K,K,K,K),ie=K)},setLocked:function(K){P=K},setClear:function(K,q,me,Ue,st){st===!0&&(K*=Ue,q*=Ue,me*=Ue),ee.set(K,q,me,Ue),de.equals(ee)===!1&&(s.clearColor(K,q,me,Ue),de.copy(ee))},reset:function(){P=!1,ie=null,de.set(-1,0,0,0)}}}function n(){let P=!1,ee=!1,ie=null,de=null,K=null;return{setReversed:function(q){if(ee!==q){let me=e.get("EXT_clip_control");q?me.clipControlEXT(me.LOWER_LEFT_EXT,me.ZERO_TO_ONE_EXT):me.clipControlEXT(me.LOWER_LEFT_EXT,me.NEGATIVE_ONE_TO_ONE_EXT),ee=q;let Ue=K;K=null,this.setClear(Ue)}},getReversed:function(){return ee},setTest:function(q){q?J(s.DEPTH_TEST):fe(s.DEPTH_TEST)},setMask:function(q){ie!==q&&!P&&(s.depthMask(q),ie=q)},setFunc:function(q){if(ee&&(q=J0[q]),de!==q){switch(q){case Po:s.depthFunc(s.NEVER);break;case Io:s.depthFunc(s.ALWAYS);break;case Do:s.depthFunc(s.LESS);break;case _i:s.depthFunc(s.LEQUAL);break;case Lo:s.depthFunc(s.EQUAL);break;case ko:s.depthFunc(s.GEQUAL);break;case Uo:s.depthFunc(s.GREATER);break;case No:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}de=q}},setLocked:function(q){P=q},setClear:function(q){K!==q&&(ee&&(q=1-q),s.clearDepth(q),K=q)},reset:function(){P=!1,ie=null,de=null,K=null,ee=!1}}}function i(){let P=!1,ee=null,ie=null,de=null,K=null,q=null,me=null,Ue=null,st=null;return{setTest:function(Je){P||(Je?J(s.STENCIL_TEST):fe(s.STENCIL_TEST))},setMask:function(Je){ee!==Je&&!P&&(s.stencilMask(Je),ee=Je)},setFunc:function(Je,Dn,wn){(ie!==Je||de!==Dn||K!==wn)&&(s.stencilFunc(Je,Dn,wn),ie=Je,de=Dn,K=wn)},setOp:function(Je,Dn,wn){(q!==Je||me!==Dn||Ue!==wn)&&(s.stencilOp(Je,Dn,wn),q=Je,me=Dn,Ue=wn)},setLocked:function(Je){P=Je},setClear:function(Je){st!==Je&&(s.clearStencil(Je),st=Je)},reset:function(){P=!1,ee=null,ie=null,de=null,K=null,q=null,me=null,Ue=null,st=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,f=[],m=null,y=!1,g=null,p=null,w=null,b=null,v=null,C=null,R=null,I=new ke(0,0,0),U=0,S=!1,M=null,D=null,B=null,V=null,X=null,Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,te=0,z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(z)[1]),W=te>=1):z.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),W=te>=2);let oe=null,he={},Ee=s.getParameter(s.SCISSOR_BOX),Ve=s.getParameter(s.VIEWPORT),it=new gt().fromArray(Ee),ct=new gt().fromArray(Ve);function Ze(P,ee,ie,de){let K=new Uint8Array(4),q=s.createTexture();s.bindTexture(P,q),s.texParameteri(P,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(P,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let me=0;me<ie;me++)P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY?s.texImage3D(ee,0,s.RGBA,1,1,de,0,s.RGBA,s.UNSIGNED_BYTE,K):s.texImage2D(ee+me,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,K);return q}let $={};$[s.TEXTURE_2D]=Ze(s.TEXTURE_2D,s.TEXTURE_2D,1),$[s.TEXTURE_CUBE_MAP]=Ze(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[s.TEXTURE_2D_ARRAY]=Ze(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),$[s.TEXTURE_3D]=Ze(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(s.DEPTH_TEST),o.setFunc(_i),Ie(!1),ge(Cl),J(s.CULL_FACE),ht(Gn);function J(P){h[P]!==!0&&(s.enable(P),h[P]=!0)}function fe(P){h[P]!==!1&&(s.disable(P),h[P]=!1)}function Le(P,ee){return d[P]!==ee?(s.bindFramebuffer(P,ee),d[P]=ee,P===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ee),P===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ee),!0):!1}function Se(P,ee){let ie=f,de=!1;if(P){ie=u.get(ee),ie===void 0&&(ie=[],u.set(ee,ie));let K=P.textures;if(ie.length!==K.length||ie[0]!==s.COLOR_ATTACHMENT0){for(let q=0,me=K.length;q<me;q++)ie[q]=s.COLOR_ATTACHMENT0+q;ie.length=K.length,de=!0}}else ie[0]!==s.BACK&&(ie[0]=s.BACK,de=!0);de&&s.drawBuffers(ie)}function Xe(P){return m!==P?(s.useProgram(P),m=P,!0):!1}let Lt={[Qn]:s.FUNC_ADD,[gh]:s.FUNC_SUBTRACT,[yh]:s.FUNC_REVERSE_SUBTRACT};Lt[_h]=s.MIN,Lt[xh]=s.MAX;let A={[vh]:s.ZERO,[bh]:s.ONE,[Mh]:s.SRC_COLOR,[Qr]:s.SRC_ALPHA,[Ch]:s.SRC_ALPHA_SATURATE,[Th]:s.DST_COLOR,[Eh]:s.DST_ALPHA,[Sh]:s.ONE_MINUS_SRC_COLOR,[eo]:s.ONE_MINUS_SRC_ALPHA,[Ah]:s.ONE_MINUS_DST_COLOR,[wh]:s.ONE_MINUS_DST_ALPHA,[Rh]:s.CONSTANT_COLOR,[Ph]:s.ONE_MINUS_CONSTANT_COLOR,[Ih]:s.CONSTANT_ALPHA,[Dh]:s.ONE_MINUS_CONSTANT_ALPHA};function ht(P,ee,ie,de,K,q,me,Ue,st,Je){if(P===Gn){y===!0&&(fe(s.BLEND),y=!1);return}if(y===!1&&(J(s.BLEND),y=!0),P!==mh){if(P!==g||Je!==S){if((p!==Qn||v!==Qn)&&(s.blendEquation(s.FUNC_ADD),p=Qn,v=Qn),Je)switch(P){case yi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Pl:s.blendFunc(s.ONE,s.ONE);break;case Il:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Dl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case yi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Pl:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Il:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}w=null,b=null,C=null,R=null,I.set(0,0,0),U=0,g=P,S=Je}return}K=K||ee,q=q||ie,me=me||de,(ee!==p||K!==v)&&(s.blendEquationSeparate(Lt[ee],Lt[K]),p=ee,v=K),(ie!==w||de!==b||q!==C||me!==R)&&(s.blendFuncSeparate(A[ie],A[de],A[q],A[me]),w=ie,b=de,C=q,R=me),(Ue.equals(I)===!1||st!==U)&&(s.blendColor(Ue.r,Ue.g,Ue.b,st),I.copy(Ue),U=st),g=P,S=!1}function Ne(P,ee){P.side===xt?fe(s.CULL_FACE):J(s.CULL_FACE);let ie=P.side===Wt;ee&&(ie=!ie),Ie(ie),P.blending===yi&&P.transparent===!1?ht(Gn):ht(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),o.setFunc(P.depthFunc),o.setTest(P.depthTest),o.setMask(P.depthWrite),r.setMask(P.colorWrite);let de=P.stencilWrite;a.setTest(de),de&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),ye(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?J(s.SAMPLE_ALPHA_TO_COVERAGE):fe(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(P){M!==P&&(P?s.frontFace(s.CW):s.frontFace(s.CCW),M=P)}function ge(P){P!==dh?(J(s.CULL_FACE),P!==D&&(P===Cl?s.cullFace(s.BACK):P===fh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):fe(s.CULL_FACE),D=P}function ut(P){P!==B&&(W&&s.lineWidth(P),B=P)}function ye(P,ee,ie){P?(J(s.POLYGON_OFFSET_FILL),(V!==ee||X!==ie)&&(s.polygonOffset(ee,ie),V=ee,X=ie)):fe(s.POLYGON_OFFSET_FILL)}function Be(P){P?J(s.SCISSOR_TEST):fe(s.SCISSOR_TEST)}function Ct(P){P===void 0&&(P=s.TEXTURE0+Y-1),oe!==P&&(s.activeTexture(P),oe=P)}function vt(P,ee,ie){ie===void 0&&(oe===null?ie=s.TEXTURE0+Y-1:ie=oe);let de=he[ie];de===void 0&&(de={type:void 0,texture:void 0},he[ie]=de),(de.type!==P||de.texture!==ee)&&(oe!==ie&&(s.activeTexture(ie),oe=ie),s.bindTexture(P,ee||$[P]),de.type=P,de.texture=ee)}function E(){let P=he[oe];P!==void 0&&P.type!==void 0&&(s.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function _(){try{s.compressedTexImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function N(){try{s.compressedTexImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function G(){try{s.texSubImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Z(){try{s.texSubImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function H(){try{s.compressedTexSubImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function be(){try{s.compressedTexSubImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ne(){try{s.texStorage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function _e(){try{s.texStorage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function xe(){try{s.texImage2D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Q(){try{s.texImage3D(...arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ce(P){it.equals(P)===!1&&(s.scissor(P.x,P.y,P.z,P.w),it.copy(P))}function Pe(P){ct.equals(P)===!1&&(s.viewport(P.x,P.y,P.z,P.w),ct.copy(P))}function ve(P,ee){let ie=c.get(ee);ie===void 0&&(ie=new WeakMap,c.set(ee,ie));let de=ie.get(P);de===void 0&&(de=s.getUniformBlockIndex(ee,P.name),ie.set(P,de))}function ae(P,ee){let de=c.get(ee).get(P);l.get(ee)!==de&&(s.uniformBlockBinding(ee,de,P.__bindingPointIndex),l.set(ee,de))}function Oe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},oe=null,he={},d={},u=new WeakMap,f=[],m=null,y=!1,g=null,p=null,w=null,b=null,v=null,C=null,R=null,I=new ke(0,0,0),U=0,S=!1,M=null,D=null,B=null,V=null,X=null,it.set(0,0,s.canvas.width,s.canvas.height),ct.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:fe,bindFramebuffer:Le,drawBuffers:Se,useProgram:Xe,setBlending:ht,setMaterial:Ne,setFlipSided:Ie,setCullFace:ge,setLineWidth:ut,setPolygonOffset:ye,setScissorTest:Be,activeTexture:Ct,bindTexture:vt,unbindTexture:E,compressedTexImage2D:_,compressedTexImage3D:N,texImage2D:xe,texImage3D:Q,updateUBOMapping:ve,uniformBlockBinding:ae,texStorage2D:ne,texStorage3D:_e,texSubImage2D:G,texSubImage3D:Z,compressedTexSubImage2D:H,compressedTexSubImage3D:be,scissor:ce,viewport:Pe,reset:Oe}}function j0(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new se,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,_){return f?new OffscreenCanvas(E,_):Os("canvas")}function y(E,_,N){let G=1,Z=vt(E);if((Z.width>N||Z.height>N)&&(G=N/Math.max(Z.width,Z.height)),G<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let H=Math.floor(G*Z.width),be=Math.floor(G*Z.height);d===void 0&&(d=m(H,be));let ne=_?m(H,be):d;return ne.width=H,ne.height=be,ne.getContext("2d").drawImage(E,0,0,H,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+H+"x"+be+")."),ne}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),E;return E}function g(E){return E.generateMipmaps}function p(E){s.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(E,_,N,G,Z=!1){if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let H=_;if(_===s.RED&&(N===s.FLOAT&&(H=s.R32F),N===s.HALF_FLOAT&&(H=s.R16F),N===s.UNSIGNED_BYTE&&(H=s.R8)),_===s.RED_INTEGER&&(N===s.UNSIGNED_BYTE&&(H=s.R8UI),N===s.UNSIGNED_SHORT&&(H=s.R16UI),N===s.UNSIGNED_INT&&(H=s.R32UI),N===s.BYTE&&(H=s.R8I),N===s.SHORT&&(H=s.R16I),N===s.INT&&(H=s.R32I)),_===s.RG&&(N===s.FLOAT&&(H=s.RG32F),N===s.HALF_FLOAT&&(H=s.RG16F),N===s.UNSIGNED_BYTE&&(H=s.RG8)),_===s.RG_INTEGER&&(N===s.UNSIGNED_BYTE&&(H=s.RG8UI),N===s.UNSIGNED_SHORT&&(H=s.RG16UI),N===s.UNSIGNED_INT&&(H=s.RG32UI),N===s.BYTE&&(H=s.RG8I),N===s.SHORT&&(H=s.RG16I),N===s.INT&&(H=s.RG32I)),_===s.RGB_INTEGER&&(N===s.UNSIGNED_BYTE&&(H=s.RGB8UI),N===s.UNSIGNED_SHORT&&(H=s.RGB16UI),N===s.UNSIGNED_INT&&(H=s.RGB32UI),N===s.BYTE&&(H=s.RGB8I),N===s.SHORT&&(H=s.RGB16I),N===s.INT&&(H=s.RGB32I)),_===s.RGBA_INTEGER&&(N===s.UNSIGNED_BYTE&&(H=s.RGBA8UI),N===s.UNSIGNED_SHORT&&(H=s.RGBA16UI),N===s.UNSIGNED_INT&&(H=s.RGBA32UI),N===s.BYTE&&(H=s.RGBA8I),N===s.SHORT&&(H=s.RGBA16I),N===s.INT&&(H=s.RGBA32I)),_===s.RGB&&(N===s.UNSIGNED_INT_5_9_9_9_REV&&(H=s.RGB9_E5),N===s.UNSIGNED_INT_10F_11F_11F_REV&&(H=s.R11F_G11F_B10F)),_===s.RGBA){let be=Z?Ns:$e.getTransfer(G);N===s.FLOAT&&(H=s.RGBA32F),N===s.HALF_FLOAT&&(H=s.RGBA16F),N===s.UNSIGNED_BYTE&&(H=be===Ke?s.SRGB8_ALPHA8:s.RGBA8),N===s.UNSIGNED_SHORT_4_4_4_4&&(H=s.RGBA4),N===s.UNSIGNED_SHORT_5_5_5_1&&(H=s.RGB5_A1)}return(H===s.R16F||H===s.R32F||H===s.RG16F||H===s.RG32F||H===s.RGBA16F||H===s.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function v(E,_){let N;return E?_===null||_===ri||_===ms?N=s.DEPTH24_STENCIL8:_===Pn?N=s.DEPTH32F_STENCIL8:_===fs&&(N=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ri||_===ms?N=s.DEPTH_COMPONENT24:_===Pn?N=s.DEPTH_COMPONENT32F:_===fs&&(N=s.DEPTH_COMPONENT16),N}function C(E,_){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==dn&&E.minFilter!==xn?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function R(E){let _=E.target;_.removeEventListener("dispose",R),U(_),_.isVideoTexture&&h.delete(_)}function I(E){let _=E.target;_.removeEventListener("dispose",I),M(_)}function U(E){let _=n.get(E);if(_.__webglInit===void 0)return;let N=E.source,G=u.get(N);if(G){let Z=G[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&S(E),Object.keys(G).length===0&&u.delete(N)}n.remove(E)}function S(E){let _=n.get(E);s.deleteTexture(_.__webglTexture);let N=E.source,G=u.get(N);delete G[_.__cacheKey],o.memory.textures--}function M(E){let _=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(_.__webglFramebuffer[G]))for(let Z=0;Z<_.__webglFramebuffer[G].length;Z++)s.deleteFramebuffer(_.__webglFramebuffer[G][Z]);else s.deleteFramebuffer(_.__webglFramebuffer[G]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[G])}else{if(Array.isArray(_.__webglFramebuffer))for(let G=0;G<_.__webglFramebuffer.length;G++)s.deleteFramebuffer(_.__webglFramebuffer[G]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let G=0;G<_.__webglColorRenderbuffer.length;G++)_.__webglColorRenderbuffer[G]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[G]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let N=E.textures;for(let G=0,Z=N.length;G<Z;G++){let H=n.get(N[G]);H.__webglTexture&&(s.deleteTexture(H.__webglTexture),o.memory.textures--),n.remove(N[G])}n.remove(E)}let D=0;function B(){D=0}function V(){let E=D;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),D+=1,E}function X(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function Y(E,_){let N=n.get(E);if(E.isVideoTexture&&Be(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&N.__version!==E.version){let G=E.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(N,E,_);return}}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,N.__webglTexture,s.TEXTURE0+_)}function W(E,_){let N=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){$(N,E,_);return}t.bindTexture(s.TEXTURE_2D_ARRAY,N.__webglTexture,s.TEXTURE0+_)}function te(E,_){let N=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){$(N,E,_);return}t.bindTexture(s.TEXTURE_3D,N.__webglTexture,s.TEXTURE0+_)}function z(E,_){let N=n.get(E);if(E.version>0&&N.__version!==E.version){J(N,E,_);return}t.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+_)}let oe={[to]:s.REPEAT,[jn]:s.CLAMP_TO_EDGE,[no]:s.MIRRORED_REPEAT},he={[dn]:s.NEAREST,[Vh]:s.NEAREST_MIPMAP_NEAREST,[dr]:s.NEAREST_MIPMAP_LINEAR,[xn]:s.LINEAR,[Bo]:s.LINEAR_MIPMAP_NEAREST,[si]:s.LINEAR_MIPMAP_LINEAR},Ee={[$h]:s.NEVER,[jh]:s.ALWAYS,[qh]:s.LESS,[Wl]:s.LEQUAL,[Yh]:s.EQUAL,[Kh]:s.GEQUAL,[Zh]:s.GREATER,[Jh]:s.NOTEQUAL};function Ve(E,_){if(_.type===Pn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===xn||_.magFilter===Bo||_.magFilter===dr||_.magFilter===si||_.minFilter===xn||_.minFilter===Bo||_.minFilter===dr||_.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,oe[_.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,oe[_.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,oe[_.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,he[_.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,he[_.minFilter]),_.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,Ee[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===dn||_.minFilter!==dr&&_.minFilter!==si||_.type===Pn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let N=e.get("EXT_texture_filter_anisotropic");s.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function it(E,_){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",R));let G=_.source,Z=u.get(G);Z===void 0&&(Z={},u.set(G,Z));let H=X(_);if(H!==E.__cacheKey){Z[H]===void 0&&(Z[H]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,N=!0),Z[H].usedTimes++;let be=Z[E.__cacheKey];be!==void 0&&(Z[E.__cacheKey].usedTimes--,be.usedTimes===0&&S(_)),E.__cacheKey=H,E.__webglTexture=Z[H].texture}return N}function ct(E,_,N){return Math.floor(Math.floor(E/N)/_)}function Ze(E,_,N,G){let H=E.updateRanges;if(H.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,N,G,_.data);else{H.sort((Q,ce)=>Q.start-ce.start);let be=0;for(let Q=1;Q<H.length;Q++){let ce=H[be],Pe=H[Q],ve=ce.start+ce.count,ae=ct(Pe.start,_.width,4),Oe=ct(ce.start,_.width,4);Pe.start<=ve+1&&ae===Oe&&ct(Pe.start+Pe.count-1,_.width,4)===ae?ce.count=Math.max(ce.count,Pe.start+Pe.count-ce.start):(++be,H[be]=Pe)}H.length=be+1;let ne=s.getParameter(s.UNPACK_ROW_LENGTH),_e=s.getParameter(s.UNPACK_SKIP_PIXELS),xe=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let Q=0,ce=H.length;Q<ce;Q++){let Pe=H[Q],ve=Math.floor(Pe.start/4),ae=Math.ceil(Pe.count/4),Oe=ve%_.width,P=Math.floor(ve/_.width),ee=ae,ie=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Oe),s.pixelStorei(s.UNPACK_SKIP_ROWS,P),t.texSubImage2D(s.TEXTURE_2D,0,Oe,P,ee,ie,N,G,_.data)}E.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,ne),s.pixelStorei(s.UNPACK_SKIP_PIXELS,_e),s.pixelStorei(s.UNPACK_SKIP_ROWS,xe)}}function $(E,_,N){let G=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(G=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(G=s.TEXTURE_3D);let Z=it(E,_),H=_.source;t.bindTexture(G,E.__webglTexture,s.TEXTURE0+N);let be=n.get(H);if(H.version!==be.__version||Z===!0){t.activeTexture(s.TEXTURE0+N);let ne=$e.getPrimaries($e.workingColorSpace),_e=_.colorSpace===Xn?null:$e.getPrimaries(_.colorSpace),xe=_.colorSpace===Xn||ne===_e?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let Q=y(_.image,!1,i.maxTextureSize);Q=Ct(_,Q);let ce=r.convert(_.format,_.colorSpace),Pe=r.convert(_.type),ve=b(_.internalFormat,ce,Pe,_.colorSpace,_.isVideoTexture);Ve(G,_);let ae,Oe=_.mipmaps,P=_.isVideoTexture!==!0,ee=be.__version===void 0||Z===!0,ie=H.dataReady,de=C(_,Q);if(_.isDepthTexture)ve=v(_.format===gs,_.type),ee&&(P?t.texStorage2D(s.TEXTURE_2D,1,ve,Q.width,Q.height):t.texImage2D(s.TEXTURE_2D,0,ve,Q.width,Q.height,0,ce,Pe,null));else if(_.isDataTexture)if(Oe.length>0){P&&ee&&t.texStorage2D(s.TEXTURE_2D,de,ve,Oe[0].width,Oe[0].height);for(let K=0,q=Oe.length;K<q;K++)ae=Oe[K],P?ie&&t.texSubImage2D(s.TEXTURE_2D,K,0,0,ae.width,ae.height,ce,Pe,ae.data):t.texImage2D(s.TEXTURE_2D,K,ve,ae.width,ae.height,0,ce,Pe,ae.data);_.generateMipmaps=!1}else P?(ee&&t.texStorage2D(s.TEXTURE_2D,de,ve,Q.width,Q.height),ie&&Ze(_,Q,ce,Pe)):t.texImage2D(s.TEXTURE_2D,0,ve,Q.width,Q.height,0,ce,Pe,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){P&&ee&&t.texStorage3D(s.TEXTURE_2D_ARRAY,de,ve,Oe[0].width,Oe[0].height,Q.depth);for(let K=0,q=Oe.length;K<q;K++)if(ae=Oe[K],_.format!==pn)if(ce!==null)if(P){if(ie)if(_.layerUpdates.size>0){let me=Ql(ae.width,ae.height,_.format,_.type);for(let Ue of _.layerUpdates){let st=ae.data.subarray(Ue*me/ae.data.BYTES_PER_ELEMENT,(Ue+1)*me/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,Ue,ae.width,ae.height,1,ce,st)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,ae.width,ae.height,Q.depth,ce,ae.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,K,ve,ae.width,ae.height,Q.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else P?ie&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,ae.width,ae.height,Q.depth,ce,Pe,ae.data):t.texImage3D(s.TEXTURE_2D_ARRAY,K,ve,ae.width,ae.height,Q.depth,0,ce,Pe,ae.data)}else{P&&ee&&t.texStorage2D(s.TEXTURE_2D,de,ve,Oe[0].width,Oe[0].height);for(let K=0,q=Oe.length;K<q;K++)ae=Oe[K],_.format!==pn?ce!==null?P?ie&&t.compressedTexSubImage2D(s.TEXTURE_2D,K,0,0,ae.width,ae.height,ce,ae.data):t.compressedTexImage2D(s.TEXTURE_2D,K,ve,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?ie&&t.texSubImage2D(s.TEXTURE_2D,K,0,0,ae.width,ae.height,ce,Pe,ae.data):t.texImage2D(s.TEXTURE_2D,K,ve,ae.width,ae.height,0,ce,Pe,ae.data)}else if(_.isDataArrayTexture)if(P){if(ee&&t.texStorage3D(s.TEXTURE_2D_ARRAY,de,ve,Q.width,Q.height,Q.depth),ie)if(_.layerUpdates.size>0){let K=Ql(Q.width,Q.height,_.format,_.type);for(let q of _.layerUpdates){let me=Q.data.subarray(q*K/Q.data.BYTES_PER_ELEMENT,(q+1)*K/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,q,Q.width,Q.height,1,ce,Pe,me)}_.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ce,Pe,Q.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ve,Q.width,Q.height,Q.depth,0,ce,Pe,Q.data);else if(_.isData3DTexture)P?(ee&&t.texStorage3D(s.TEXTURE_3D,de,ve,Q.width,Q.height,Q.depth),ie&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ce,Pe,Q.data)):t.texImage3D(s.TEXTURE_3D,0,ve,Q.width,Q.height,Q.depth,0,ce,Pe,Q.data);else if(_.isFramebufferTexture){if(ee)if(P)t.texStorage2D(s.TEXTURE_2D,de,ve,Q.width,Q.height);else{let K=Q.width,q=Q.height;for(let me=0;me<de;me++)t.texImage2D(s.TEXTURE_2D,me,ve,K,q,0,ce,Pe,null),K>>=1,q>>=1}}else if(Oe.length>0){if(P&&ee){let K=vt(Oe[0]);t.texStorage2D(s.TEXTURE_2D,de,ve,K.width,K.height)}for(let K=0,q=Oe.length;K<q;K++)ae=Oe[K],P?ie&&t.texSubImage2D(s.TEXTURE_2D,K,0,0,ce,Pe,ae):t.texImage2D(s.TEXTURE_2D,K,ve,ce,Pe,ae);_.generateMipmaps=!1}else if(P){if(ee){let K=vt(Q);t.texStorage2D(s.TEXTURE_2D,de,ve,K.width,K.height)}ie&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ce,Pe,Q)}else t.texImage2D(s.TEXTURE_2D,0,ve,ce,Pe,Q);g(_)&&p(G),be.__version=H.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function J(E,_,N){if(_.image.length!==6)return;let G=it(E,_),Z=_.source;t.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+N);let H=n.get(Z);if(Z.version!==H.__version||G===!0){t.activeTexture(s.TEXTURE0+N);let be=$e.getPrimaries($e.workingColorSpace),ne=_.colorSpace===Xn?null:$e.getPrimaries(_.colorSpace),_e=_.colorSpace===Xn||be===ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let xe=_.isCompressedTexture||_.image[0].isCompressedTexture,Q=_.image[0]&&_.image[0].isDataTexture,ce=[];for(let q=0;q<6;q++)!xe&&!Q?ce[q]=y(_.image[q],!0,i.maxCubemapSize):ce[q]=Q?_.image[q].image:_.image[q],ce[q]=Ct(_,ce[q]);let Pe=ce[0],ve=r.convert(_.format,_.colorSpace),ae=r.convert(_.type),Oe=b(_.internalFormat,ve,ae,_.colorSpace),P=_.isVideoTexture!==!0,ee=H.__version===void 0||G===!0,ie=Z.dataReady,de=C(_,Pe);Ve(s.TEXTURE_CUBE_MAP,_);let K;if(xe){P&&ee&&t.texStorage2D(s.TEXTURE_CUBE_MAP,de,Oe,Pe.width,Pe.height);for(let q=0;q<6;q++){K=ce[q].mipmaps;for(let me=0;me<K.length;me++){let Ue=K[me];_.format!==pn?ve!==null?P?ie&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,0,0,Ue.width,Ue.height,ve,Ue.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,Oe,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?ie&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,0,0,Ue.width,Ue.height,ve,ae,Ue.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me,Oe,Ue.width,Ue.height,0,ve,ae,Ue.data)}}}else{if(K=_.mipmaps,P&&ee){K.length>0&&de++;let q=vt(ce[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,de,Oe,q.width,q.height)}for(let q=0;q<6;q++)if(Q){P?ie&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ce[q].width,ce[q].height,ve,ae,ce[q].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Oe,ce[q].width,ce[q].height,0,ve,ae,ce[q].data);for(let me=0;me<K.length;me++){let st=K[me].image[q].image;P?ie&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,0,0,st.width,st.height,ve,ae,st.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,Oe,st.width,st.height,0,ve,ae,st.data)}}else{P?ie&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ve,ae,ce[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Oe,ve,ae,ce[q]);for(let me=0;me<K.length;me++){let Ue=K[me];P?ie&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,0,0,ve,ae,Ue.image[q]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,me+1,Oe,ve,ae,Ue.image[q])}}}g(_)&&p(s.TEXTURE_CUBE_MAP),H.__version=Z.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function fe(E,_,N,G,Z,H){let be=r.convert(N.format,N.colorSpace),ne=r.convert(N.type),_e=b(N.internalFormat,be,ne,N.colorSpace),xe=n.get(_),Q=n.get(N);if(Q.__renderTarget=_,!xe.__hasExternalTextures){let ce=Math.max(1,_.width>>H),Pe=Math.max(1,_.height>>H);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?t.texImage3D(Z,H,_e,ce,Pe,_.depth,0,be,ne,null):t.texImage2D(Z,H,_e,ce,Pe,0,be,ne,null)}t.bindFramebuffer(s.FRAMEBUFFER,E),ye(_)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,G,Z,Q.__webglTexture,0,ut(_)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,G,Z,Q.__webglTexture,H),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Le(E,_,N){if(s.bindRenderbuffer(s.RENDERBUFFER,E),_.depthBuffer){let G=_.depthTexture,Z=G&&G.isDepthTexture?G.type:null,H=v(_.stencilBuffer,Z),be=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ne=ut(_);ye(_)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ne,H,_.width,_.height):N?s.renderbufferStorageMultisample(s.RENDERBUFFER,ne,H,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,H,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,be,s.RENDERBUFFER,E)}else{let G=_.textures;for(let Z=0;Z<G.length;Z++){let H=G[Z],be=r.convert(H.format,H.colorSpace),ne=r.convert(H.type),_e=b(H.internalFormat,be,ne,H.colorSpace),xe=ut(_);N&&ye(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,xe,_e,_.width,_.height):ye(_)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,xe,_e,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,_e,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Se(E,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let G=n.get(_.depthTexture);G.__renderTarget=_,(!G.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y(_.depthTexture,0);let Z=G.__webglTexture,H=ut(_);if(_.depthTexture.format===es)ye(_)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Z,0,H):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Z,0);else if(_.depthTexture.format===gs)ye(_)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Z,0,H):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Xe(E){let _=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let G=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),G){let Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,G.removeEventListener("dispose",Z)};G.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=G}if(E.depthTexture&&!_.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");let G=E.texture.mipmaps;G&&G.length>0?Se(_.__webglFramebuffer[0],E):Se(_.__webglFramebuffer,E)}else if(N){_.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[G]),_.__webglDepthbuffer[G]===void 0)_.__webglDepthbuffer[G]=s.createRenderbuffer(),Le(_.__webglDepthbuffer[G],E,!1);else{let Z=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,H=_.__webglDepthbuffer[G];s.bindRenderbuffer(s.RENDERBUFFER,H),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,H)}}else{let G=E.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),Le(_.__webglDepthbuffer,E,!1);else{let Z=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,H=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,H),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,H)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Lt(E,_,N){let G=n.get(E);_!==void 0&&fe(G.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),N!==void 0&&Xe(E)}function A(E){let _=E.texture,N=n.get(E),G=n.get(_);E.addEventListener("dispose",I);let Z=E.textures,H=E.isWebGLCubeRenderTarget===!0,be=Z.length>1;if(be||(G.__webglTexture===void 0&&(G.__webglTexture=s.createTexture()),G.__version=_.version,o.memory.textures++),H){N.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[ne]=[];for(let _e=0;_e<_.mipmaps.length;_e++)N.__webglFramebuffer[ne][_e]=s.createFramebuffer()}else N.__webglFramebuffer[ne]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let ne=0;ne<_.mipmaps.length;ne++)N.__webglFramebuffer[ne]=s.createFramebuffer()}else N.__webglFramebuffer=s.createFramebuffer();if(be)for(let ne=0,_e=Z.length;ne<_e;ne++){let xe=n.get(Z[ne]);xe.__webglTexture===void 0&&(xe.__webglTexture=s.createTexture(),o.memory.textures++)}if(E.samples>0&&ye(E)===!1){N.__webglMultisampledFramebuffer=s.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ne=0;ne<Z.length;ne++){let _e=Z[ne];N.__webglColorRenderbuffer[ne]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,N.__webglColorRenderbuffer[ne]);let xe=r.convert(_e.format,_e.colorSpace),Q=r.convert(_e.type),ce=b(_e.internalFormat,xe,Q,_e.colorSpace,E.isXRRenderTarget===!0),Pe=ut(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,Pe,ce,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ne,s.RENDERBUFFER,N.__webglColorRenderbuffer[ne])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=s.createRenderbuffer(),Le(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(H){t.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture),Ve(s.TEXTURE_CUBE_MAP,_);for(let ne=0;ne<6;ne++)if(_.mipmaps&&_.mipmaps.length>0)for(let _e=0;_e<_.mipmaps.length;_e++)fe(N.__webglFramebuffer[ne][_e],E,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,_e);else fe(N.__webglFramebuffer[ne],E,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);g(_)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let ne=0,_e=Z.length;ne<_e;ne++){let xe=Z[ne],Q=n.get(xe),ce=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ce=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ce,Q.__webglTexture),Ve(ce,xe),fe(N.__webglFramebuffer,E,xe,s.COLOR_ATTACHMENT0+ne,ce,0),g(xe)&&p(ce)}t.unbindTexture()}else{let ne=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ne=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ne,G.__webglTexture),Ve(ne,_),_.mipmaps&&_.mipmaps.length>0)for(let _e=0;_e<_.mipmaps.length;_e++)fe(N.__webglFramebuffer[_e],E,_,s.COLOR_ATTACHMENT0,ne,_e);else fe(N.__webglFramebuffer,E,_,s.COLOR_ATTACHMENT0,ne,0);g(_)&&p(ne),t.unbindTexture()}E.depthBuffer&&Xe(E)}function ht(E){let _=E.textures;for(let N=0,G=_.length;N<G;N++){let Z=_[N];if(g(Z)){let H=w(E),be=n.get(Z).__webglTexture;t.bindTexture(H,be),p(H),t.unbindTexture()}}}let Ne=[],Ie=[];function ge(E){if(E.samples>0){if(ye(E)===!1){let _=E.textures,N=E.width,G=E.height,Z=s.COLOR_BUFFER_BIT,H=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=n.get(E),ne=_.length>1;if(ne)for(let xe=0;xe<_.length;xe++)t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);let _e=E.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let xe=0;xe<_.length;xe++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),ne){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,be.__webglColorRenderbuffer[xe]);let Q=n.get(_[xe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Q,0)}s.blitFramebuffer(0,0,N,G,0,0,N,G,Z,s.NEAREST),l===!0&&(Ne.length=0,Ie.length=0,Ne.push(s.COLOR_ATTACHMENT0+xe),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Ne.push(H),Ie.push(H),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ie)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ne))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ne)for(let xe=0;xe<_.length;xe++){t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.RENDERBUFFER,be.__webglColorRenderbuffer[xe]);let Q=n.get(_[xe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.TEXTURE_2D,Q,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let _=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function ut(E){return Math.min(i.maxSamples,E.samples)}function ye(E){let _=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Be(E){let _=o.render.frame;h.get(E)!==_&&(h.set(E,_),E.update())}function Ct(E,_){let N=E.colorSpace,G=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==xi&&N!==Xn&&($e.getTransfer(N)===Ke?(G!==pn||Z!==Sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),_}function vt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=B,this.setTexture2D=Y,this.setTexture2DArray=W,this.setTexture3D=te,this.setTextureCube=z,this.rebindTextures=Lt,this.setupRenderTarget=A,this.updateRenderTargetMipmap=ht,this.updateMultisampleRenderTarget=ge,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=ye}function Q0(s,e){function t(n,i=Xn){let r,o=$e.getTransfer(i);if(n===Sn)return s.UNSIGNED_BYTE;if(n===Ho)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Vo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Fl)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Ol)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ul)return s.BYTE;if(n===Nl)return s.SHORT;if(n===fs)return s.UNSIGNED_SHORT;if(n===zo)return s.INT;if(n===ri)return s.UNSIGNED_INT;if(n===Pn)return s.FLOAT;if(n===ps)return s.HALF_FLOAT;if(n===Bl)return s.ALPHA;if(n===zl)return s.RGB;if(n===pn)return s.RGBA;if(n===es)return s.DEPTH_COMPONENT;if(n===gs)return s.DEPTH_STENCIL;if(n===Hl)return s.RED;if(n===Go)return s.RED_INTEGER;if(n===Vl)return s.RG;if(n===Wo)return s.RG_INTEGER;if(n===Xo)return s.RGBA_INTEGER;if(n===fr||n===pr||n===mr||n===gr)if(o===Ke)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===gr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$o||n===qo||n===Yo||n===Zo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$o)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Zo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Jo||n===Ko||n===jo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Jo||n===Ko)return o===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===jo)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Qo||n===ea||n===ta||n===na||n===ia||n===sa||n===ra||n===oa||n===aa||n===la||n===ca||n===ha||n===ua||n===da)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Qo)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ea)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ta)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===na)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ia)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===sa)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ra)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===oa)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===aa)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===la)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ca)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ha)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ua)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===da)return o===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fa||n===pa||n===ma)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===fa)return o===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===pa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ma)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ga||n===ya||n===_a||n===xa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ga)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ya)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_a)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===xa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ms?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var ey=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ty=`
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

}`,dc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new qs(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new bn({vertexShader:ey,fragmentShader:ty,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new lt(new Vn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},fc=class extends Tn{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null,y=typeof XRWebGLBinding<"u",g=new dc,p={},w=t.getContextAttributes(),b=null,v=null,C=[],R=[],I=new se,U=null,S=new Yt;S.viewport=new gt;let M=new Yt;M.viewport=new gt;let D=[S,M],B=new Ro,V=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let J=C[$];return J===void 0&&(J=new os,C[$]=J),J.getTargetRaySpace()},this.getControllerGrip=function($){let J=C[$];return J===void 0&&(J=new os,C[$]=J),J.getGripSpace()},this.getHand=function($){let J=C[$];return J===void 0&&(J=new os,C[$]=J),J.getHandSpace()};function Y($){let J=R.indexOf($.inputSource);if(J===-1)return;let fe=C[J];fe!==void 0&&(fe.update($.inputSource,$.frame,c||o),fe.dispatchEvent({type:$.type,data:$.inputSource}))}function W(){i.removeEventListener("select",Y),i.removeEventListener("selectstart",Y),i.removeEventListener("selectend",Y),i.removeEventListener("squeeze",Y),i.removeEventListener("squeezestart",Y),i.removeEventListener("squeezeend",Y),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",te);for(let $=0;$<C.length;$++){let J=R[$];J!==null&&(R[$]=null,C[$].disconnect(J))}V=null,X=null,g.reset();for(let $ in p)delete p[$];e.setRenderTarget(b),f=null,u=null,d=null,i=null,v=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",Y),i.addEventListener("selectstart",Y),i.addEventListener("selectend",Y),i.addEventListener("squeeze",Y),i.addEventListener("squeezestart",Y),i.addEventListener("squeezeend",Y),i.addEventListener("end",W),i.addEventListener("inputsourceschange",te),w.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(I),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,Le=null,Se=null;w.depth&&(Se=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=w.stencil?gs:es,Le=w.stencil?ms:ri);let Xe={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Xe),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new An(u.textureWidth,u.textureHeight,{format:pn,type:Sn,depthTexture:new $s(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let fe={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,fe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new An(f.framebufferWidth,f.framebufferHeight,{format:pn,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ze.setContext(i),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function te($){for(let J=0;J<$.removed.length;J++){let fe=$.removed[J],Le=R.indexOf(fe);Le>=0&&(R[Le]=null,C[Le].disconnect(fe))}for(let J=0;J<$.added.length;J++){let fe=$.added[J],Le=R.indexOf(fe);if(Le===-1){for(let Xe=0;Xe<C.length;Xe++)if(Xe>=R.length){R.push(fe),Le=Xe;break}else if(R[Xe]===null){R[Xe]=fe,Le=Xe;break}if(Le===-1)break}let Se=C[Le];Se&&Se.connect(fe)}}let z=new T,oe=new T;function he($,J,fe){z.setFromMatrixPosition(J.matrixWorld),oe.setFromMatrixPosition(fe.matrixWorld);let Le=z.distanceTo(oe),Se=J.projectionMatrix.elements,Xe=fe.projectionMatrix.elements,Lt=Se[14]/(Se[10]-1),A=Se[14]/(Se[10]+1),ht=(Se[9]+1)/Se[5],Ne=(Se[9]-1)/Se[5],Ie=(Se[8]-1)/Se[0],ge=(Xe[8]+1)/Xe[0],ut=Lt*Ie,ye=Lt*ge,Be=Le/(-Ie+ge),Ct=Be*-Ie;if(J.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ct),$.translateZ(Be),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Se[10]===-1)$.projectionMatrix.copy(J.projectionMatrix),$.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let vt=Lt+Be,E=A+Be,_=ut-Ct,N=ye+(Le-Ct),G=ht*A/E*vt,Z=Ne*A/E*vt;$.projectionMatrix.makePerspective(_,N,G,Z,vt,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Ee($,J){J===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(J.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let J=$.near,fe=$.far;g.texture!==null&&(g.depthNear>0&&(J=g.depthNear),g.depthFar>0&&(fe=g.depthFar)),B.near=M.near=S.near=J,B.far=M.far=S.far=fe,(V!==B.near||X!==B.far)&&(i.updateRenderState({depthNear:B.near,depthFar:B.far}),V=B.near,X=B.far),B.layers.mask=$.layers.mask|6,S.layers.mask=B.layers.mask&3,M.layers.mask=B.layers.mask&5;let Le=$.parent,Se=B.cameras;Ee(B,Le);for(let Xe=0;Xe<Se.length;Xe++)Ee(Se[Xe],Le);Se.length===2?he(B,S,M):B.projectionMatrix.copy(S.projectionMatrix),Ve($,B,Le)};function Ve($,J,fe){fe===null?$.matrix.copy(J.matrixWorld):($.matrix.copy(fe.matrixWorld),$.matrix.invert(),$.matrix.multiply(J.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(J.projectionMatrix),$.projectionMatrixInverse.copy(J.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ts*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function($){l=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(B)},this.getCameraTexture=function($){return p[$]};let it=null;function ct($,J){if(h=J.getViewerPose(c||o),m=J,h!==null){let fe=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Le=!1;fe.length!==B.cameras.length&&(B.cameras.length=0,Le=!0);for(let A=0;A<fe.length;A++){let ht=fe[A],Ne=null;if(f!==null)Ne=f.getViewport(ht);else{let ge=d.getViewSubImage(u,ht);Ne=ge.viewport,A===0&&(e.setRenderTargetTextures(v,ge.colorTexture,ge.depthStencilTexture),e.setRenderTarget(v))}let Ie=D[A];Ie===void 0&&(Ie=new Yt,Ie.layers.enable(A),Ie.viewport=new gt,D[A]=Ie),Ie.matrix.fromArray(ht.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(ht.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),A===0&&(B.matrix.copy(Ie.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Le===!0&&B.cameras.push(Ie)}let Se=i.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let A=d.getDepthInformation(fe[0]);A&&A.isValid&&A.texture&&g.init(A,i.renderState)}if(Se&&Se.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let A=0;A<fe.length;A++){let ht=fe[A].camera;if(ht){let Ne=p[ht];Ne||(Ne=new qs,p[ht]=Ne);let Ie=d.getCameraImage(ht);Ne.sourceTexture=Ie}}}}for(let fe=0;fe<C.length;fe++){let Le=R[fe],Se=C[fe];Le!==null&&Se!==void 0&&Se.update(Le,J,c||o)}it&&it($,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),m=null}let Ze=new Iu;Ze.setAnimationLoop(ct),this.setAnimationLoop=function($){it=$},this.dispose=function(){}}},Ii=new vn,ny=new je;function iy(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Zl(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,w,b,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,w,b):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Wt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Wt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let w=e.get(p),b=w.envMap,v=w.envMapRotation;b&&(g.envMap.value=b,Ii.copy(v),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),g.envMapRotation.value.setFromMatrix4(ny.makeRotationFromEuler(Ii)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,w,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*w,g.scale.value=b*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,w){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Wt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let w=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function sy(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,b){let v=b.program;n.uniformBlockBinding(w,v)}function c(w,b){let v=i[w.id];v===void 0&&(m(w),v=h(w),i[w.id]=v,w.addEventListener("dispose",g));let C=b.program;n.updateUBOMapping(w,C);let R=e.render.frame;r[w.id]!==R&&(u(w),r[w.id]=R)}function h(w){let b=d();w.__bindingPointIndex=b;let v=s.createBuffer(),C=w.__size,R=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,C,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,v),v}function d(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){let b=i[w.id],v=w.uniforms,C=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let R=0,I=v.length;R<I;R++){let U=Array.isArray(v[R])?v[R]:[v[R]];for(let S=0,M=U.length;S<M;S++){let D=U[S];if(f(D,R,S,C)===!0){let B=D.__offset,V=Array.isArray(D.value)?D.value:[D.value],X=0;for(let Y=0;Y<V.length;Y++){let W=V[Y],te=y(W);typeof W=="number"||typeof W=="boolean"?(D.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,B+X,D.__data)):W.isMatrix3?(D.__data[0]=W.elements[0],D.__data[1]=W.elements[1],D.__data[2]=W.elements[2],D.__data[3]=0,D.__data[4]=W.elements[3],D.__data[5]=W.elements[4],D.__data[6]=W.elements[5],D.__data[7]=0,D.__data[8]=W.elements[6],D.__data[9]=W.elements[7],D.__data[10]=W.elements[8],D.__data[11]=0):(W.toArray(D.__data,X),X+=te.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,B,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(w,b,v,C){let R=w.value,I=b+"_"+v;if(C[I]===void 0)return typeof R=="number"||typeof R=="boolean"?C[I]=R:C[I]=R.clone(),!0;{let U=C[I];if(typeof R=="number"||typeof R=="boolean"){if(U!==R)return C[I]=R,!0}else if(U.equals(R)===!1)return U.copy(R),!0}return!1}function m(w){let b=w.uniforms,v=0,C=16;for(let I=0,U=b.length;I<U;I++){let S=Array.isArray(b[I])?b[I]:[b[I]];for(let M=0,D=S.length;M<D;M++){let B=S[M],V=Array.isArray(B.value)?B.value:[B.value];for(let X=0,Y=V.length;X<Y;X++){let W=V[X],te=y(W),z=v%C,oe=z%te.boundary,he=z+oe;v+=oe,he!==0&&C-he<te.storage&&(v+=C-he),B.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=te.storage}}}let R=v%C;return R>0&&(v+=C-R),w.__size=v,w.__cache={},this}function y(w){let b={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(b.boundary=4,b.storage=4):w.isVector2?(b.boundary=8,b.storage=8):w.isVector3||w.isColor?(b.boundary=16,b.storage=12):w.isVector4?(b.boundary=16,b.storage=16):w.isMatrix3?(b.boundary=48,b.storage=48):w.isMatrix4?(b.boundary=64,b.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),b}function g(w){let b=w.target;b.removeEventListener("dispose",g);let v=o.indexOf(b.__bindingPointIndex);o.splice(v,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function p(){for(let w in i)s.deleteBuffer(i[w]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}var Ea=class{constructor(e={}){let{canvas:t=Qh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),y=new Int32Array(4),g=null,p=null,w=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,C=!1;this._outputColorSpace=en;let R=0,I=0,U=null,S=-1,M=null,D=new gt,B=new gt,V=null,X=new ke(0),Y=0,W=t.width,te=t.height,z=1,oe=null,he=null,Ee=new gt(0,0,W,te),Ve=new gt(0,0,W,te),it=!1,ct=new as,Ze=!1,$=!1,J=new je,fe=new T,Le=new gt,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xe=!1;function Lt(){return U===null?z:1}let A=n;function ht(x,L){return t.getContext(x,L)}try{let x={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",K,!1),A===null){let L="webgl2";if(A=ht(L,x),A===null)throw ht(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Ne,Ie,ge,ut,ye,Be,Ct,vt,E,_,N,G,Z,H,be,ne,_e,xe,Q,ce,Pe,ve,ae,Oe;function P(){Ne=new Mg(A),Ne.init(),ve=new Q0(A,Ne),Ie=new mg(A,Ne,e,ve),ge=new K0(A,Ne),Ie.reversedDepthBuffer&&u&&ge.buffers.depth.setReversed(!0),ut=new wg(A),ye=new O0,Be=new j0(A,Ne,ge,ye,Ie,ve,ut),Ct=new yg(v),vt=new bg(v),E=new If(A),ae=new fg(A,E),_=new Sg(A,E,ut,ae),N=new Ag(A,_,E,ut),Q=new Tg(A,Ie,Be),ne=new gg(ye),G=new F0(v,Ct,vt,Ne,Ie,ae,ne),Z=new iy(v,ye),H=new z0,be=new $0(Ne),xe=new dg(v,Ct,vt,ge,N,f,l),_e=new Z0(v,N,Ie),Oe=new sy(A,ut,Ie,ge),ce=new pg(A,Ne,ut),Pe=new Eg(A,Ne,ut),ut.programs=G.programs,v.capabilities=Ie,v.extensions=Ne,v.properties=ye,v.renderLists=H,v.shadowMap=_e,v.state=ge,v.info=ut}P();let ee=new fc(v,A);this.xr=ee,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){let x=Ne.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=Ne.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(x){x!==void 0&&(z=x,this.setSize(W,te,!1))},this.getSize=function(x){return x.set(W,te)},this.setSize=function(x,L,F=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=x,te=L,t.width=Math.floor(x*z),t.height=Math.floor(L*z),F===!0&&(t.style.width=x+"px",t.style.height=L+"px"),this.setViewport(0,0,x,L)},this.getDrawingBufferSize=function(x){return x.set(W*z,te*z).floor()},this.setDrawingBufferSize=function(x,L,F){W=x,te=L,z=F,t.width=Math.floor(x*F),t.height=Math.floor(L*F),this.setViewport(0,0,x,L)},this.getCurrentViewport=function(x){return x.copy(D)},this.getViewport=function(x){return x.copy(Ee)},this.setViewport=function(x,L,F,O){x.isVector4?Ee.set(x.x,x.y,x.z,x.w):Ee.set(x,L,F,O),ge.viewport(D.copy(Ee).multiplyScalar(z).round())},this.getScissor=function(x){return x.copy(Ve)},this.setScissor=function(x,L,F,O){x.isVector4?Ve.set(x.x,x.y,x.z,x.w):Ve.set(x,L,F,O),ge.scissor(B.copy(Ve).multiplyScalar(z).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(x){ge.setScissorTest(it=x)},this.setOpaqueSort=function(x){oe=x},this.setTransparentSort=function(x){he=x},this.getClearColor=function(x){return x.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor(...arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha(...arguments)},this.clear=function(x=!0,L=!0,F=!0){let O=0;if(x){let k=!1;if(U!==null){let j=U.texture.format;k=j===Xo||j===Wo||j===Go}if(k){let j=U.texture.type,le=j===Sn||j===ri||j===fs||j===ms||j===Ho||j===Vo,pe=xe.getClearColor(),ue=xe.getClearAlpha(),Ae=pe.r,De=pe.g,we=pe.b;le?(m[0]=Ae,m[1]=De,m[2]=we,m[3]=ue,A.clearBufferuiv(A.COLOR,0,m)):(y[0]=Ae,y[1]=De,y[2]=we,y[3]=ue,A.clearBufferiv(A.COLOR,0,y))}else O|=A.COLOR_BUFFER_BIT}L&&(O|=A.DEPTH_BUFFER_BIT),F&&(O|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",K,!1),xe.dispose(),H.dispose(),be.dispose(),ye.dispose(),Ct.dispose(),vt.dispose(),N.dispose(),ae.dispose(),Oe.dispose(),G.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",wn),ee.removeEventListener("sessionend",Ac),hi.stop()};function ie(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let x=ut.autoReset,L=_e.enabled,F=_e.autoUpdate,O=_e.needsUpdate,k=_e.type;P(),ut.autoReset=x,_e.enabled=L,_e.autoUpdate=F,_e.needsUpdate=O,_e.type=k}function K(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function q(x){let L=x.target;L.removeEventListener("dispose",q),me(L)}function me(x){Ue(x),ye.remove(x)}function Ue(x){let L=ye.get(x).programs;L!==void 0&&(L.forEach(function(F){G.releaseProgram(F)}),x.isShaderMaterial&&G.releaseShaderCache(x))}this.renderBufferDirect=function(x,L,F,O,k,j){L===null&&(L=Se);let le=k.isMesh&&k.matrixWorld.determinant()<0,pe=rd(x,L,F,O,k);ge.setMaterial(O,le);let ue=F.index,Ae=1;if(O.wireframe===!0){if(ue=_.getWireframeAttribute(F),ue===void 0)return;Ae=2}let De=F.drawRange,we=F.attributes.position,We=De.start*Ae,et=(De.start+De.count)*Ae;j!==null&&(We=Math.max(We,j.start*Ae),et=Math.min(et,(j.start+j.count)*Ae)),ue!==null?(We=Math.max(We,0),et=Math.min(et,ue.count)):we!=null&&(We=Math.max(We,0),et=Math.min(et,we.count));let yt=et-We;if(yt<0||yt===1/0)return;ae.setup(k,O,pe,F,ue);let rt,nt=ce;if(ue!==null&&(rt=E.get(ue),nt=Pe,nt.setIndex(rt)),k.isMesh)O.wireframe===!0?(ge.setLineWidth(O.wireframeLinewidth*Lt()),nt.setMode(A.LINES)):nt.setMode(A.TRIANGLES);else if(k.isLine){let Te=O.linewidth;Te===void 0&&(Te=1),ge.setLineWidth(Te*Lt()),k.isLineSegments?nt.setMode(A.LINES):k.isLineLoop?nt.setMode(A.LINE_LOOP):nt.setMode(A.LINE_STRIP)}else k.isPoints?nt.setMode(A.POINTS):k.isSprite&&nt.setMode(A.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ns("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),nt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))nt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Te=k._multiDrawStarts,ft=k._multiDrawCounts,qe=k._multiDrawCount,Jt=ue?E.get(ue).bytesPerElement:1,Fi=ye.get(O).currentProgram.getUniforms();for(let Kt=0;Kt<qe;Kt++)Fi.setValue(A,"_gl_DrawID",Kt),nt.render(Te[Kt]/Jt,ft[Kt])}else if(k.isInstancedMesh)nt.renderInstances(We,yt,k.count);else if(F.isInstancedBufferGeometry){let Te=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,ft=Math.min(F.instanceCount,Te);nt.renderInstances(We,yt,ft)}else nt.render(We,yt)};function st(x,L,F){x.transparent===!0&&x.side===xt&&x.forceSinglePass===!1?(x.side=Wt,x.needsUpdate=!0,Sr(x,L,F),x.side=zn,x.needsUpdate=!0,Sr(x,L,F),x.side=xt):Sr(x,L,F)}this.compile=function(x,L,F=null){F===null&&(F=x),p=be.get(F),p.init(L),b.push(p),F.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),x!==F&&x.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let O=new Set;return x.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let j=k.material;if(j)if(Array.isArray(j))for(let le=0;le<j.length;le++){let pe=j[le];st(pe,F,k),O.add(pe)}else st(j,F,k),O.add(j)}),p=b.pop(),O},this.compileAsync=function(x,L,F=null){let O=this.compile(x,L,F);return new Promise(k=>{function j(){if(O.forEach(function(le){ye.get(le).currentProgram.isReady()&&O.delete(le)}),O.size===0){k(x);return}setTimeout(j,10)}Ne.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Je=null;function Dn(x){Je&&Je(x)}function wn(){hi.stop()}function Ac(){hi.start()}let hi=new Iu;hi.setAnimationLoop(Dn),typeof self<"u"&&hi.setContext(self),this.setAnimationLoop=function(x){Je=x,ee.setAnimationLoop(x),x===null?hi.stop():hi.start()},ee.addEventListener("sessionstart",wn),ee.addEventListener("sessionend",Ac),this.render=function(x,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(L),L=ee.getCamera()),x.isScene===!0&&x.onBeforeRender(v,x,L,U),p=be.get(x,b.length),p.init(L),b.push(p),J.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),ct.setFromProjectionMatrix(J,_n,L.reversedDepth),$=this.localClippingEnabled,Ze=ne.init(this.clippingPlanes,$),g=H.get(x,w.length),g.init(),w.push(g),ee.enabled===!0&&ee.isPresenting===!0){let j=v.xr.getDepthSensingMesh();j!==null&&za(j,L,-1/0,v.sortObjects)}za(x,L,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(oe,he),Xe=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Xe&&xe.addToRenderList(g,x),this.info.render.frame++,Ze===!0&&ne.beginShadows();let F=p.state.shadowsArray;_e.render(F,x,L),Ze===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();let O=g.opaque,k=g.transmissive;if(p.setupLights(),L.isArrayCamera){let j=L.cameras;if(k.length>0)for(let le=0,pe=j.length;le<pe;le++){let ue=j[le];Rc(O,k,x,ue)}Xe&&xe.render(x);for(let le=0,pe=j.length;le<pe;le++){let ue=j[le];Cc(g,x,ue,ue.viewport)}}else k.length>0&&Rc(O,k,x,L),Xe&&xe.render(x),Cc(g,x,L);U!==null&&I===0&&(Be.updateMultisampleRenderTarget(U),Be.updateRenderTargetMipmap(U)),x.isScene===!0&&x.onAfterRender(v,x,L),ae.resetDefaultState(),S=-1,M=null,b.pop(),b.length>0?(p=b[b.length-1],Ze===!0&&ne.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?g=w[w.length-1]:g=null};function za(x,L,F,O){if(x.visible===!1)return;if(x.layers.test(L.layers)){if(x.isGroup)F=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(L);else if(x.isLight)p.pushLight(x),x.castShadow&&p.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||ct.intersectsSprite(x)){O&&Le.setFromMatrixPosition(x.matrixWorld).applyMatrix4(J);let le=N.update(x),pe=x.material;pe.visible&&g.push(x,le,pe,F,Le.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||ct.intersectsObject(x))){let le=N.update(x),pe=x.material;if(O&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Le.copy(x.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Le.copy(le.boundingSphere.center)),Le.applyMatrix4(x.matrixWorld).applyMatrix4(J)),Array.isArray(pe)){let ue=le.groups;for(let Ae=0,De=ue.length;Ae<De;Ae++){let we=ue[Ae],We=pe[we.materialIndex];We&&We.visible&&g.push(x,le,We,F,Le.z,we)}}else pe.visible&&g.push(x,le,pe,F,Le.z,null)}}let j=x.children;for(let le=0,pe=j.length;le<pe;le++)za(j[le],L,F,O)}function Cc(x,L,F,O){let k=x.opaque,j=x.transmissive,le=x.transparent;p.setupLightsView(F),Ze===!0&&ne.setGlobalState(v.clippingPlanes,F),O&&ge.viewport(D.copy(O)),k.length>0&&Mr(k,L,F),j.length>0&&Mr(j,L,F),le.length>0&&Mr(le,L,F),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Rc(x,L,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[O.id]===void 0&&(p.state.transmissionRenderTarget[O.id]=new An(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?ps:Sn,minFilter:si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));let j=p.state.transmissionRenderTarget[O.id],le=O.viewport||D;j.setSize(le.z*v.transmissionResolutionScale,le.w*v.transmissionResolutionScale);let pe=v.getRenderTarget(),ue=v.getActiveCubeFace(),Ae=v.getActiveMipmapLevel();v.setRenderTarget(j),v.getClearColor(X),Y=v.getClearAlpha(),Y<1&&v.setClearColor(16777215,.5),v.clear(),Xe&&xe.render(F);let De=v.toneMapping;v.toneMapping=Wn;let we=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),p.setupLightsView(O),Ze===!0&&ne.setGlobalState(v.clippingPlanes,O),Mr(x,F,O),Be.updateMultisampleRenderTarget(j),Be.updateRenderTargetMipmap(j),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let et=0,yt=L.length;et<yt;et++){let rt=L[et],nt=rt.object,Te=rt.geometry,ft=rt.material,qe=rt.group;if(ft.side===xt&&nt.layers.test(O.layers)){let Jt=ft.side;ft.side=Wt,ft.needsUpdate=!0,Pc(nt,F,O,Te,ft,qe),ft.side=Jt,ft.needsUpdate=!0,We=!0}}We===!0&&(Be.updateMultisampleRenderTarget(j),Be.updateRenderTargetMipmap(j))}v.setRenderTarget(pe,ue,Ae),v.setClearColor(X,Y),we!==void 0&&(O.viewport=we),v.toneMapping=De}function Mr(x,L,F){let O=L.isScene===!0?L.overrideMaterial:null;for(let k=0,j=x.length;k<j;k++){let le=x[k],pe=le.object,ue=le.geometry,Ae=le.group,De=le.material;De.allowOverride===!0&&O!==null&&(De=O),pe.layers.test(F.layers)&&Pc(pe,L,F,ue,De,Ae)}}function Pc(x,L,F,O,k,j){x.onBeforeRender(v,L,F,O,k,j),x.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),k.onBeforeRender(v,L,F,O,x,j),k.transparent===!0&&k.side===xt&&k.forceSinglePass===!1?(k.side=Wt,k.needsUpdate=!0,v.renderBufferDirect(F,L,O,k,x,j),k.side=zn,k.needsUpdate=!0,v.renderBufferDirect(F,L,O,k,x,j),k.side=xt):v.renderBufferDirect(F,L,O,k,x,j),x.onAfterRender(v,L,F,O,k,j)}function Sr(x,L,F){L.isScene!==!0&&(L=Se);let O=ye.get(x),k=p.state.lights,j=p.state.shadowsArray,le=k.state.version,pe=G.getParameters(x,k.state,j,L,F),ue=G.getProgramCacheKey(pe),Ae=O.programs;O.environment=x.isMeshStandardMaterial?L.environment:null,O.fog=L.fog,O.envMap=(x.isMeshStandardMaterial?vt:Ct).get(x.envMap||O.environment),O.envMapRotation=O.environment!==null&&x.envMap===null?L.environmentRotation:x.envMapRotation,Ae===void 0&&(x.addEventListener("dispose",q),Ae=new Map,O.programs=Ae);let De=Ae.get(ue);if(De!==void 0){if(O.currentProgram===De&&O.lightsStateVersion===le)return Dc(x,pe),De}else pe.uniforms=G.getUniforms(x),x.onBeforeCompile(pe,v),De=G.acquireProgram(pe,ue),Ae.set(ue,De),O.uniforms=pe.uniforms;let we=O.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(we.clippingPlanes=ne.uniform),Dc(x,pe),O.needsLights=ad(x),O.lightsStateVersion=le,O.needsLights&&(we.ambientLightColor.value=k.state.ambient,we.lightProbe.value=k.state.probe,we.directionalLights.value=k.state.directional,we.directionalLightShadows.value=k.state.directionalShadow,we.spotLights.value=k.state.spot,we.spotLightShadows.value=k.state.spotShadow,we.rectAreaLights.value=k.state.rectArea,we.ltc_1.value=k.state.rectAreaLTC1,we.ltc_2.value=k.state.rectAreaLTC2,we.pointLights.value=k.state.point,we.pointLightShadows.value=k.state.pointShadow,we.hemisphereLights.value=k.state.hemi,we.directionalShadowMap.value=k.state.directionalShadowMap,we.directionalShadowMatrix.value=k.state.directionalShadowMatrix,we.spotShadowMap.value=k.state.spotShadowMap,we.spotLightMatrix.value=k.state.spotLightMatrix,we.spotLightMap.value=k.state.spotLightMap,we.pointShadowMap.value=k.state.pointShadowMap,we.pointShadowMatrix.value=k.state.pointShadowMatrix),O.currentProgram=De,O.uniformsList=null,De}function Ic(x){if(x.uniformsList===null){let L=x.currentProgram.getUniforms();x.uniformsList=xs.seqWithValue(L.seq,x.uniforms)}return x.uniformsList}function Dc(x,L){let F=ye.get(x);F.outputColorSpace=L.outputColorSpace,F.batching=L.batching,F.batchingColor=L.batchingColor,F.instancing=L.instancing,F.instancingColor=L.instancingColor,F.instancingMorph=L.instancingMorph,F.skinning=L.skinning,F.morphTargets=L.morphTargets,F.morphNormals=L.morphNormals,F.morphColors=L.morphColors,F.morphTargetsCount=L.morphTargetsCount,F.numClippingPlanes=L.numClippingPlanes,F.numIntersection=L.numClipIntersection,F.vertexAlphas=L.vertexAlphas,F.vertexTangents=L.vertexTangents,F.toneMapping=L.toneMapping}function rd(x,L,F,O,k){L.isScene!==!0&&(L=Se),Be.resetTextureUnits();let j=L.fog,le=O.isMeshStandardMaterial?L.environment:null,pe=U===null?v.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:xi,ue=(O.isMeshStandardMaterial?vt:Ct).get(O.envMap||le),Ae=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,De=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),we=!!F.morphAttributes.position,We=!!F.morphAttributes.normal,et=!!F.morphAttributes.color,yt=Wn;O.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(yt=v.toneMapping);let rt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,nt=rt!==void 0?rt.length:0,Te=ye.get(O),ft=p.state.lights;if(Ze===!0&&($===!0||x!==M)){let Ht=x===M&&O.id===S;ne.setState(O,x,Ht)}let qe=!1;O.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==ft.state.version||Te.outputColorSpace!==pe||k.isBatchedMesh&&Te.batching===!1||!k.isBatchedMesh&&Te.batching===!0||k.isBatchedMesh&&Te.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Te.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Te.instancing===!1||!k.isInstancedMesh&&Te.instancing===!0||k.isSkinnedMesh&&Te.skinning===!1||!k.isSkinnedMesh&&Te.skinning===!0||k.isInstancedMesh&&Te.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Te.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Te.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Te.instancingMorph===!1&&k.morphTexture!==null||Te.envMap!==ue||O.fog===!0&&Te.fog!==j||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ne.numPlanes||Te.numIntersection!==ne.numIntersection)||Te.vertexAlphas!==Ae||Te.vertexTangents!==De||Te.morphTargets!==we||Te.morphNormals!==We||Te.morphColors!==et||Te.toneMapping!==yt||Te.morphTargetsCount!==nt)&&(qe=!0):(qe=!0,Te.__version=O.version);let Jt=Te.currentProgram;qe===!0&&(Jt=Sr(O,L,k));let Fi=!1,Kt=!1,ws=!1,pt=Jt.getUniforms(),cn=Te.uniforms;if(ge.useProgram(Jt.program)&&(Fi=!0,Kt=!0,ws=!0),O.id!==S&&(S=O.id,Kt=!0),Fi||M!==x){ge.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),pt.setValue(A,"projectionMatrix",x.projectionMatrix),pt.setValue(A,"viewMatrix",x.matrixWorldInverse);let qt=pt.map.cameraPosition;qt!==void 0&&qt.setValue(A,fe.setFromMatrixPosition(x.matrixWorld)),Ie.logarithmicDepthBuffer&&pt.setValue(A,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&pt.setValue(A,"isOrthographic",x.isOrthographicCamera===!0),M!==x&&(M=x,Kt=!0,ws=!0)}if(k.isSkinnedMesh){pt.setOptional(A,k,"bindMatrix"),pt.setOptional(A,k,"bindMatrixInverse");let Ht=k.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),pt.setValue(A,"boneTexture",Ht.boneTexture,Be))}k.isBatchedMesh&&(pt.setOptional(A,k,"batchingTexture"),pt.setValue(A,"batchingTexture",k._matricesTexture,Be),pt.setOptional(A,k,"batchingIdTexture"),pt.setValue(A,"batchingIdTexture",k._indirectTexture,Be),pt.setOptional(A,k,"batchingColorTexture"),k._colorsTexture!==null&&pt.setValue(A,"batchingColorTexture",k._colorsTexture,Be));let hn=F.morphAttributes;if((hn.position!==void 0||hn.normal!==void 0||hn.color!==void 0)&&Q.update(k,F,Jt),(Kt||Te.receiveShadow!==k.receiveShadow)&&(Te.receiveShadow=k.receiveShadow,pt.setValue(A,"receiveShadow",k.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(cn.envMap.value=ue,cn.flipEnvMap.value=ue.isCubeTexture&&ue.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&L.environment!==null&&(cn.envMapIntensity.value=L.environmentIntensity),Kt&&(pt.setValue(A,"toneMappingExposure",v.toneMappingExposure),Te.needsLights&&od(cn,ws),j&&O.fog===!0&&Z.refreshFogUniforms(cn,j),Z.refreshMaterialUniforms(cn,O,z,te,p.state.transmissionRenderTarget[x.id]),xs.upload(A,Ic(Te),cn,Be)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(xs.upload(A,Ic(Te),cn,Be),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&pt.setValue(A,"center",k.center),pt.setValue(A,"modelViewMatrix",k.modelViewMatrix),pt.setValue(A,"normalMatrix",k.normalMatrix),pt.setValue(A,"modelMatrix",k.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){let Ht=O.uniformsGroups;for(let qt=0,Ha=Ht.length;qt<Ha;qt++){let ui=Ht[qt];Oe.update(ui,Jt),Oe.bind(ui,Jt)}}return Jt}function od(x,L){x.ambientLightColor.needsUpdate=L,x.lightProbe.needsUpdate=L,x.directionalLights.needsUpdate=L,x.directionalLightShadows.needsUpdate=L,x.pointLights.needsUpdate=L,x.pointLightShadows.needsUpdate=L,x.spotLights.needsUpdate=L,x.spotLightShadows.needsUpdate=L,x.rectAreaLights.needsUpdate=L,x.hemisphereLights.needsUpdate=L}function ad(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(x,L,F){let O=ye.get(x);O.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),ye.get(x.texture).__webglTexture=L,ye.get(x.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:F,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,L){let F=ye.get(x);F.__webglFramebuffer=L,F.__useDefaultFramebuffer=L===void 0};let ld=A.createFramebuffer();this.setRenderTarget=function(x,L=0,F=0){U=x,R=L,I=F;let O=!0,k=null,j=!1,le=!1;if(x){let ue=ye.get(x);if(ue.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(A.FRAMEBUFFER,null),O=!1;else if(ue.__webglFramebuffer===void 0)Be.setupRenderTarget(x);else if(ue.__hasExternalTextures)Be.rebindTextures(x,ye.get(x.texture).__webglTexture,ye.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let we=x.depthTexture;if(ue.__boundDepthTexture!==we){if(we!==null&&ye.has(we)&&(x.width!==we.image.width||x.height!==we.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Be.setupDepthRenderbuffer(x)}}let Ae=x.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(le=!0);let De=ye.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(De[L])?k=De[L][F]:k=De[L],j=!0):x.samples>0&&Be.useMultisampledRTT(x)===!1?k=ye.get(x).__webglMultisampledFramebuffer:Array.isArray(De)?k=De[F]:k=De,D.copy(x.viewport),B.copy(x.scissor),V=x.scissorTest}else D.copy(Ee).multiplyScalar(z).floor(),B.copy(Ve).multiplyScalar(z).floor(),V=it;if(F!==0&&(k=ld),ge.bindFramebuffer(A.FRAMEBUFFER,k)&&O&&ge.drawBuffers(x,k),ge.viewport(D),ge.scissor(B),ge.setScissorTest(V),j){let ue=ye.get(x.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+L,ue.__webglTexture,F)}else if(le){let ue=L;for(let Ae=0;Ae<x.textures.length;Ae++){let De=ye.get(x.textures[Ae]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Ae,De.__webglTexture,F,ue)}}else if(x!==null&&F!==0){let ue=ye.get(x.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,ue.__webglTexture,F)}S=-1},this.readRenderTargetPixels=function(x,L,F,O,k,j,le,pe=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=ye.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&le!==void 0&&(ue=ue[le]),ue){ge.bindFramebuffer(A.FRAMEBUFFER,ue);try{let Ae=x.textures[pe],De=Ae.format,we=Ae.type;if(!Ie.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ie.textureTypeReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=x.width-O&&F>=0&&F<=x.height-k&&(x.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+pe),A.readPixels(L,F,O,k,ve.convert(De),ve.convert(we),j))}finally{let Ae=U!==null?ye.get(U).__webglFramebuffer:null;ge.bindFramebuffer(A.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(x,L,F,O,k,j,le,pe=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=ye.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&le!==void 0&&(ue=ue[le]),ue)if(L>=0&&L<=x.width-O&&F>=0&&F<=x.height-k){ge.bindFramebuffer(A.FRAMEBUFFER,ue);let Ae=x.textures[pe],De=Ae.format,we=Ae.type;if(!Ie.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ie.textureTypeReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,We),A.bufferData(A.PIXEL_PACK_BUFFER,j.byteLength,A.STREAM_READ),x.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+pe),A.readPixels(L,F,O,k,ve.convert(De),ve.convert(we),0);let et=U!==null?ye.get(U).__webglFramebuffer:null;ge.bindFramebuffer(A.FRAMEBUFFER,et);let yt=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await eu(A,yt,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,We),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,j),A.deleteBuffer(We),A.deleteSync(yt),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,L=null,F=0){let O=Math.pow(2,-F),k=Math.floor(x.image.width*O),j=Math.floor(x.image.height*O),le=L!==null?L.x:0,pe=L!==null?L.y:0;Be.setTexture2D(x,0),A.copyTexSubImage2D(A.TEXTURE_2D,F,0,0,le,pe,k,j),ge.unbindTexture()};let cd=A.createFramebuffer(),hd=A.createFramebuffer();this.copyTextureToTexture=function(x,L,F=null,O=null,k=0,j=null){j===null&&(k!==0?(ns("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=k,k=0):j=0);let le,pe,ue,Ae,De,we,We,et,yt,rt=x.isCompressedTexture?x.mipmaps[j]:x.image;if(F!==null)le=F.max.x-F.min.x,pe=F.max.y-F.min.y,ue=F.isBox3?F.max.z-F.min.z:1,Ae=F.min.x,De=F.min.y,we=F.isBox3?F.min.z:0;else{let hn=Math.pow(2,-k);le=Math.floor(rt.width*hn),pe=Math.floor(rt.height*hn),x.isDataArrayTexture?ue=rt.depth:x.isData3DTexture?ue=Math.floor(rt.depth*hn):ue=1,Ae=0,De=0,we=0}O!==null?(We=O.x,et=O.y,yt=O.z):(We=0,et=0,yt=0);let nt=ve.convert(L.format),Te=ve.convert(L.type),ft;L.isData3DTexture?(Be.setTexture3D(L,0),ft=A.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Be.setTexture2DArray(L,0),ft=A.TEXTURE_2D_ARRAY):(Be.setTexture2D(L,0),ft=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,L.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,L.unpackAlignment);let qe=A.getParameter(A.UNPACK_ROW_LENGTH),Jt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Fi=A.getParameter(A.UNPACK_SKIP_PIXELS),Kt=A.getParameter(A.UNPACK_SKIP_ROWS),ws=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,rt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,rt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ae),A.pixelStorei(A.UNPACK_SKIP_ROWS,De),A.pixelStorei(A.UNPACK_SKIP_IMAGES,we);let pt=x.isDataArrayTexture||x.isData3DTexture,cn=L.isDataArrayTexture||L.isData3DTexture;if(x.isDepthTexture){let hn=ye.get(x),Ht=ye.get(L),qt=ye.get(hn.__renderTarget),Ha=ye.get(Ht.__renderTarget);ge.bindFramebuffer(A.READ_FRAMEBUFFER,qt.__webglFramebuffer),ge.bindFramebuffer(A.DRAW_FRAMEBUFFER,Ha.__webglFramebuffer);for(let ui=0;ui<ue;ui++)pt&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,ye.get(x).__webglTexture,k,we+ui),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,ye.get(L).__webglTexture,j,yt+ui)),A.blitFramebuffer(Ae,De,le,pe,We,et,le,pe,A.DEPTH_BUFFER_BIT,A.NEAREST);ge.bindFramebuffer(A.READ_FRAMEBUFFER,null),ge.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(k!==0||x.isRenderTargetTexture||ye.has(x)){let hn=ye.get(x),Ht=ye.get(L);ge.bindFramebuffer(A.READ_FRAMEBUFFER,cd),ge.bindFramebuffer(A.DRAW_FRAMEBUFFER,hd);for(let qt=0;qt<ue;qt++)pt?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,hn.__webglTexture,k,we+qt):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,hn.__webglTexture,k),cn?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Ht.__webglTexture,j,yt+qt):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Ht.__webglTexture,j),k!==0?A.blitFramebuffer(Ae,De,le,pe,We,et,le,pe,A.COLOR_BUFFER_BIT,A.NEAREST):cn?A.copyTexSubImage3D(ft,j,We,et,yt+qt,Ae,De,le,pe):A.copyTexSubImage2D(ft,j,We,et,Ae,De,le,pe);ge.bindFramebuffer(A.READ_FRAMEBUFFER,null),ge.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else cn?x.isDataTexture||x.isData3DTexture?A.texSubImage3D(ft,j,We,et,yt,le,pe,ue,nt,Te,rt.data):L.isCompressedArrayTexture?A.compressedTexSubImage3D(ft,j,We,et,yt,le,pe,ue,nt,rt.data):A.texSubImage3D(ft,j,We,et,yt,le,pe,ue,nt,Te,rt):x.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,j,We,et,le,pe,nt,Te,rt.data):x.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,j,We,et,rt.width,rt.height,nt,rt.data):A.texSubImage2D(A.TEXTURE_2D,j,We,et,le,pe,nt,Te,rt);A.pixelStorei(A.UNPACK_ROW_LENGTH,qe),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Jt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Fi),A.pixelStorei(A.UNPACK_SKIP_ROWS,Kt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,ws),j===0&&L.generateMipmaps&&A.generateMipmap(ft),ge.unbindTexture()},this.initRenderTarget=function(x){ye.get(x).__webglFramebuffer===void 0&&Be.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Be.setTextureCube(x,0):x.isData3DTexture?Be.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Be.setTexture2DArray(x,0):Be.setTexture2D(x,0),ge.unbindTexture()},this.resetState=function(){R=0,I=0,U=null,ge.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}};var Nu={type:"change"},yc={type:"start"},Ou={type:"end"},Ta=new Hn,Fu=new Nt,ry=Math.cos(70*ql.DEG2RAD),At=new T,Zt=2*Math.PI,tt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},gc=1e-6,Aa=class extends hr{constructor(e,t=null){super(e,t),this.state=tt.NONE,this.target=new T,this.cursor=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ot.ROTATE,MIDDLE:Ot.DOLLY,RIGHT:Ot.PAN},this.touches={ONE:ii.ROTATE,TWO:ii.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new T,this._lastQuaternion=new _t,this._lastTargetPosition=new T,this._quat=new _t().setFromUnitVectors(e.up,new T(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ds,this._sphericalDelta=new ds,this._scale=1,this._panOffset=new T,this._rotateStart=new se,this._rotateEnd=new se,this._rotateDelta=new se,this._panStart=new se,this._panEnd=new se,this._panDelta=new se,this._dollyStart=new se,this._dollyEnd=new se,this._dollyDelta=new se,this._dollyDirection=new T,this._mouse=new se,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ay.bind(this),this._onPointerDown=oy.bind(this),this._onPointerUp=ly.bind(this),this._onContextMenu=my.bind(this),this._onMouseWheel=uy.bind(this),this._onKeyDown=dy.bind(this),this._onTouchStart=fy.bind(this),this._onTouchMove=py.bind(this),this._onMouseDown=cy.bind(this),this._onMouseMove=hy.bind(this),this._interceptControlDown=gy.bind(this),this._interceptControlUp=yy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Nu),this.update(),this.state=tt.NONE}update(e=null){let t=this.object.position;At.copy(t).sub(this.target),At.applyQuaternion(this._quat),this._spherical.setFromVector3(At),this.autoRotate&&this.state===tt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Zt:n>Math.PI&&(n-=Zt),i<-Math.PI?i+=Zt:i>Math.PI&&(i-=Zt),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(At.setFromSpherical(this._spherical),At.applyQuaternion(this._quatInverse),t.copy(this.target).add(At),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=At.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new T(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new T(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=At.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ta.origin.copy(this.object.position),Ta.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ta.direction))<ry?this.object.lookAt(this.target):(Fu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ta.intersectPlane(Fu,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>gc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>gc||this._lastTargetPosition.distanceToSquared(this.target)>gc?(this.dispatchEvent(Nu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Zt/60*this.autoRotateSpeed*e:Zt/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){At.setFromMatrixColumn(t,0),At.multiplyScalar(-e),this._panOffset.add(At)}_panUp(e,t){this.screenSpacePanning===!0?At.setFromMatrixColumn(t,1):(At.setFromMatrixColumn(t,0),At.crossVectors(this.object.up,At)),At.multiplyScalar(e),this._panOffset.add(At)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;At.copy(i).sub(this.target);let r=At.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new se,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function oy(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function ay(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function ly(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ou),this.state=tt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function cy(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=tt.DOLLY;break;case Ot.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=tt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=tt.ROTATE}break;case Ot.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=tt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=tt.PAN}break;default:this.state=tt.NONE}this.state!==tt.NONE&&this.dispatchEvent(yc)}function hy(s){switch(this.state){case tt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case tt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case tt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function uy(s){this.enabled===!1||this.enableZoom===!1||this.state!==tt.NONE||(s.preventDefault(),this.dispatchEvent(yc),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Ou))}function dy(s){this.enabled!==!1&&this._handleKeyDown(s)}function fy(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case ii.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=tt.TOUCH_ROTATE;break;case ii.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=tt.TOUCH_PAN;break;default:this.state=tt.NONE}break;case 2:switch(this.touches.TWO){case ii.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=tt.TOUCH_DOLLY_PAN;break;case ii.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=tt.TOUCH_DOLLY_ROTATE;break;default:this.state=tt.NONE}break;default:this.state=tt.NONE}this.state!==tt.NONE&&this.dispatchEvent(yc)}function py(s){switch(this._trackPointer(s),this.state){case tt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case tt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case tt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case tt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=tt.NONE}}function my(s){this.enabled!==!1&&s.preventDefault()}function gy(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yy(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}St.DEFAULT_UP.set(0,0,1);var on={edge:2042419,hoverFace:1884390,hoverEdge:16091679,selFace:366269,selEdge:15231488,planeXY:5016565,planeXZ:3781227,planeYZ:15029067},Ca=class{constructor(e){this.el=e,this.renderer=new Ea({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.setClearColor(0,0),this.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),e.appendChild(this.renderer.domElement),this.scene=new Ws,this.camera=new wi(-1,1,1,-1,-1e5,1e5),this.camera.up.set(0,0,1),this.camera.position.set(200,-260,180),this.controls=new Aa(this.camera,this.renderer.domElement),this.controls.enableDamping=!1,this.controls.zoomToCursor=!0,this.controls.mouseButtons={LEFT:null,MIDDLE:Ot.PAN,RIGHT:Ot.ROTATE},this.controls.addEventListener("change",()=>this.render()),this.viewHeight=200,this.scene.add(new or(16777215,9080729,1.6)),this.sun=new ar(16777215,1.6),this.camera.add(this.sun),this.sun.position.set(-1,2,3),this.scene.add(this.camera),this.partGroup=new Gt,this.scene.add(this.partGroup),this.overlay=new Gt,this.scene.add(this.overlay),this.sketchGroup=new Gt,this.scene.add(this.sketchGroup),this.material=new Mi({color:9417673,metalness:.15,roughness:.55,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1,side:xt}),this.edgeMat=new Pt({color:on.edge}),this.style="edges",this.desc=null,this.mesh=null,this.edgeLines=null,this.makeOrigin(),this.makeGrid(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(e),this.resize()}makeOrigin(){let e=new Gt,t=40,n=(r,o,a)=>{let l=new Vn(t,t),c=new lt(l,new Ft({color:r,transparent:!0,opacity:.12,side:xt,depthWrite:!1})),h=new Mn(new Ys(l),new Pt({color:r,transparent:!0,opacity:.6}));return c.add(h),c.userData.planeName=o,a&&a(c),e.add(c),c};this.planes={XY:n(on.planeXY,"XY"),XZ:n(on.planeXZ,"XZ",r=>r.rotation.set(Math.PI/2,0,0)),YZ:n(on.planeYZ,"YZ",r=>r.rotation.set(Math.PI/2,Math.PI/2,0))};let i=(r,o)=>{let a=new Ye().setFromPoints([new T,new T(...r).multiplyScalar(t*.75)]);e.add(new nn(a,new Pt({color:o})))};i([1,0,0],15029067),i([0,1,0],3781227),i([0,0,1],5016565),this.originGroup=e,this.planesVisible=!1;for(let r of Object.values(this.planes))r.visible=!1;this.scene.add(e)}showPlanes(e){this.planesVisible=e;for(let t of Object.values(this.planes))t.visible=e;this.render()}makeGrid(){let e=new cr(400,40,12174028,14541543);e.rotation.x=Math.PI/2,e.material.transparent=!0,e.material.opacity=.55,e.material.depthWrite=!1,this.grid=e,this.scene.add(e)}setColor(e){this.material.color.set(e),this.render()}resize(){let e=this.el.clientWidth||1,t=this.el.clientHeight||1;this.renderer.setSize(e,t,!1),this.renderer.domElement.style.width=e+"px",this.renderer.domElement.style.height=t+"px",this.aspect=e/t,this.updateFrustum()}updateFrustum(){let e=this.viewHeight/2,t=e*this.aspect;Object.assign(this.camera,{left:-t,right:t,top:e,bottom:-e}),this.camera.updateProjectionMatrix(),this.render()}pixelSize(){return this.viewHeight/this.camera.zoom/(this.el.clientHeight||1)}render(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this.onBeforeRender&&this.onBeforeRender(),this.renderer.render(this.scene,this.camera)}))}setPart(e){if(this.desc=e,this.mesh&&(this.partGroup.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh=null),this.edgeLines&&(this.partGroup.remove(this.edgeLines),this.edgeLines.geometry.dispose(),this.edgeLines=null),this.clearHighlights(),e){let t=new Ye;t.setAttribute("position",new at(e.vertices,3)),t.setAttribute("normal",new at(e.normals,3)),t.setIndex(new at(e.triangles,1)),t.computeBoundingSphere(),this.mesh=new lt(t,this.material),this.partGroup.add(this.mesh);let n=new Ye;n.setAttribute("position",new at(e.lines,3));let i=[];for(let[r,o]of e.edgeGroups)for(let a=r;a<r+o-1;a++)i.push(a,a+1);n.setIndex(i),this.edgeLines=new Mn(n,this.edgeMat),this.partGroup.add(this.edgeLines)}this.applyStyle()}applyStyle(e=this.style){this.style=e,this.onStyle&&this.onStyle(),this.mesh&&(this.mesh.visible=e!=="wire"),this.edgeLines&&(this.edgeLines.visible=e!=="shaded"),this.render()}setGhost(e){this.material.transparent=e,this.material.opacity=e?.35:1,this.material.depthWrite=!e,this.material.needsUpdate=!0,this.render()}fit(e){if(!e&&this.fitOverride)return this.fitOverride();e||(e=this.desc?this.desc.bb:[[-50,-50,0],[50,50,50]]);let t=new T((e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2,(e[0][2]+e[1][2])/2),n=Math.max(10,Math.hypot(e[1][0]-e[0][0],e[1][1]-e[0][1],e[1][2]-e[0][2])),i=this.camera.position.clone().sub(this.controls.target).normalize();this.controls.target.copy(t),this.camera.position.copy(t).add(i.multiplyScalar(n*4)),this.viewHeight=n*1.3,this.camera.zoom=1,this.updateFrustum(),this.controls.update()}setView(e){let t={home:[1,-1.3,.9],front:[0,-1,0],back:[0,1,0],top:[0,0,1],bottom:[0,0,-1],right:[1,0,0],left:[-1,0,0]},n={top:[0,1,0],bottom:[0,-1,0]},i=new T(...t[e]).normalize();this.lookAlong(i,new T(...n[e]||[0,0,1])),this.fit()}setUp(e){this.camera.up.copy(e),this.controls._quat.setFromUnitVectors(this.camera.up,new T(0,1,0)),this.controls._quatInverse.copy(this.controls._quat).invert()}lookAlong(e,t,n){let i=(n||this.controls.target).clone(),r=Math.max(500,this.camera.position.distanceTo(this.controls.target));this.controls.target.copy(i),this.setUp(t),this.camera.position.copy(i).add(e.clone().multiplyScalar(r)),this.camera.lookAt(i),this.controls.update(),this.render()}ray(e){let t=this.renderer.domElement.getBoundingClientRect(),n=new se((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),i=new lr;return i.setFromCamera(n,this.camera),i.params.Line.threshold=this.pixelSize()*6,i}faceAt(e){let t=e*3,n=this.desc.faceGroups;for(let i=0;i<n.length;i++)if(t>=n[i][0]&&t<n[i][0]+n[i][1])return i;return-1}edgeAt(e){let t=this.desc.edgeGroups;for(let n=0;n<t.length;n++)if(e>=t[n][0]&&e<t[n][0]+t[n][1])return n;return-1}pick(e,t){let n=this.ray(e);if(t.edges&&this.edgeLines&&this.desc){let i=this.edgeLines.visible;this.edgeLines.visible=!0;let r=n.intersectObject(this.edgeLines);this.edgeLines.visible=i;let o=1/0;if(this.mesh){let c=n.intersectObject(this.mesh);c.length&&(o=c[0].distance)}let a=this.pixelSize()*8,l=r.find(c=>c.distance<=o+a);if(l)return{kind:"edge",index:this.edgeAt(l.index),point:l.point.toArray()}}if(t.faces&&this.mesh&&this.desc){let i=n.intersectObject(this.mesh);if(i.length){let r=this.faceAt(i[0].faceIndex);if(r>=0)return{kind:"face",index:r,point:i[0].point.toArray(),info:this.desc.faces[r]}}}if(t.planes){let i=Object.values(this.planes),r=n.intersectObjects(i,!1);if(r.length)return{kind:"plane",name:r[0].object.userData.planeName,point:r[0].point.toArray()}}return null}clearHighlights(){for(let e of[...this.overlay.children])this.overlay.remove(e),e.geometry&&e.geometry.dispose();this.render()}faceGeometry(e){let[t,n]=this.desc.faceGroups[e],i=new Ye;return i.setAttribute("position",this.mesh.geometry.getAttribute("position")),i.setIndex(Array.from(this.desc.triangles.subarray(t,t+n))),i}edgeGeometry(e){let[t,n]=this.desc.edgeGroups[e],i=[];for(let r=t;r<t+n;r++)i.push(new T(this.desc.lines[r*3],this.desc.lines[r*3+1],this.desc.lines[r*3+2]));return new Ye().setFromPoints(i)}highlight(e){this.clearHighlights();for(let t of e)this.addHighlight(t);this.render()}addHighlight(e){if(e.kind==="face"&&this.desc&&e.index>=0&&e.index<this.desc.faceGroups.length){let t=new lt(this.faceGeometry(e.index),new Ft({color:e.color,transparent:!0,opacity:.55,side:xt,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));this.overlay.add(t)}else if(e.kind==="edge"&&this.desc&&e.index>=0&&e.index<this.desc.edgeGroups.length){let t=new nn(this.edgeGeometry(e.index),new Pt({color:e.color,depthTest:!1}));t.renderOrder=10,this.overlay.add(t)}else if(e.kind==="plane"){let t=this.planes[e.name],n=new lt(t.geometry.clone(),new Ft({color:e.color,transparent:!0,opacity:.35,side:xt,depthWrite:!1}));n.quaternion.copy(t.quaternion),this.overlay.add(n)}else if(e.kind==="point"){let t=this.pixelSize()*5,n=new lt(new ir(t,12,8),new Ft({color:e.color,depthTest:!1}));n.position.set(...e.point),n.renderOrder=11,this.overlay.add(n)}else if(e.kind==="segment"){let t=new nn(new Ye().setFromPoints(e.points.map(n=>new T(...n))),new Si({color:e.color,depthTest:!1,dashSize:this.pixelSize()*6,gapSize:this.pixelSize()*4}));t.computeLineDistances(),t.renderOrder=10,this.overlay.add(t)}}screenOf(e){let t=new T(...e).project(this.camera);return[(t.x+1)/2*this.el.clientWidth,(1-t.y)/2*this.el.clientHeight]}snapshot(){return this.renderer.render(this.scene,this.camera),this.renderer.domElement.toDataURL("image/png")}};var Bu={sin:s=>Math.sin(s*Math.PI/180),cos:s=>Math.cos(s*Math.PI/180),tan:s=>Math.tan(s*Math.PI/180),sqrt:Math.sqrt,abs:Math.abs,round:Math.round,floor:Math.floor,ceil:Math.ceil,min:Math.min,max:Math.max},zu={pi:Math.PI,PI:Math.PI};function _y(s){let e=[],t=/\s*(?:(\d+\.?\d*(?:[eE][-+]?\d+)?|\.\d+)|([A-Za-z_][A-Za-z_0-9]*)|(\S))/y,n;for(t.lastIndex=0;t.lastIndex<s.length;){let i=t.lastIndex;if(n=t.exec(s),!n)break;if(n[1]!==void 0)e.push({t:"num",v:parseFloat(n[1])});else if(n[2]!==void 0)e.push({t:"id",v:n[2]});else if(n[3]!==void 0)e.push({t:"op",v:n[3]});else if(t.lastIndex===i)break}return e}function En(s,e={},t=new Set){if(typeof s=="number")return s;if(s==null||String(s).trim()==="")throw new Error("Empty value");let n=_y(String(s)),i=0,r=()=>n[i],o=f=>{let m=n[i];if(!m||f&&m.v!==f)throw new Error(`Expected "${f}"`);return i++,m};function a(){let f=r();if(!f)throw new Error("Unfinished expression");if(f.t==="num")return i++,f.v;if(f.t==="op"&&f.v==="("){i++;let m=d();return o(")"),m}if(f.t==="op"&&(f.v==="-"||f.v==="+")){i++;let m=l();return f.v==="-"?-m:m}if(f.t==="id"){if(i++,Bu[f.v]&&r()&&r().v==="("){i++;let m=[d()];for(;r()&&r().v===",";)i++,m.push(d());return o(")"),Bu[f.v](...m)}if(f.v in zu)return zu[f.v];if(Object.prototype.hasOwnProperty.call(e,f.v)){if(t.has(f.v))throw new Error(`"${f.v}" refers to itself`);let m=new Set(t);return m.add(f.v),En(e[f.v],e,m)}throw new Error(`Unknown name "${f.v}"`)}throw new Error(`Unexpected "${f.v}"`)}function l(){let f=a();return r()&&r().v==="^"?(i++,Math.pow(f,c())):f}function c(){return l()}function h(){let f=c();for(;r()&&(r().v==="*"||r().v==="/");){let m=n[i++].v,y=c();f=m==="*"?f*y:f/y}return f}function d(){let f=h();for(;r()&&(r().v==="+"||r().v==="-");){let m=n[i++].v,y=h();f=m==="+"?f+y:f-y}return f}let u=d();if(i<n.length)throw new Error(`Unexpected "${n[i].v}"`);if(!Number.isFinite(u))throw new Error("Not a number");return u}function Hu(s){let e={};for(let t of s.params||[])t.name&&(e[t.name]=t.expr);return e}function an(s,e){try{return{ok:!0,v:En(s,e)}}catch(t){return{ok:!1,err:t.message}}}function Me(s){return Number.isFinite(s)?String(Math.round(s*1e4)/1e4):""}var Yv=Math.PI*2,Vu=s=>s*Math.PI/180;function ki(s,e,t){return[s[0]+e*Math.cos(Vu(t)),s[1]+e*Math.sin(Vu(t))]}function oi(s,e){let t=(e-s)%360;return t<=1e-9&&(t+=360),t}function bs(s,e){return{type:"line",a:s,b:e}}function Ms(s,e,t,n){let i=oi(t,n);return{type:"arc",c:s,r:e,a1:t,a2:n,a:ki(s,e,t),b:ki(s,e,t+i),m:ki(s,e,t+i/2)}}function _r(s,e,t){let[n,i]=s,[r,o]=t,[a,l]=e,c=2*(n*(o-l)+r*(l-i)+a*(i-o));if(Math.abs(c)<1e-9)return null;let h=((n*n+i*i)*(o-l)+(r*r+o*o)*(l-i)+(a*a+l*l)*(i-o))/c,d=((n*n+i*i)*(a-r)+(r*r+o*o)*(n-a)+(a*a+l*l)*(r-n))/c,u=[h,d],f=Math.hypot(n-h,i-d),m=v=>Math.atan2(v[1]-d,v[0]-h)*180/Math.PI,y=m(s),g=m(e),p=m(t),w=oi(y,p)<oi(y,g),b=w?Ms(u,f,y,g):Ms(u,f,g,y);return w?b={...b,a:s,b:e}:b={...b,a:e,b:s},{c:u,r:f,seg:b,ccw:w}}function xy(s,e){let t=n=>En(n,e);switch(s.type){case"line":{let n=[t(s.x1),t(s.y1)],i=[t(s.x2),t(s.y2)];return{segs:[bs(n,i)],closed:!1}}case"arc":{let n=[t(s.x1),t(s.y1)],i=[t(s.x2),t(s.y2)],r=[t(s.xm),t(s.ym)],o=_r(n,i,r);if(!o)throw new Error("The three arc points are in a straight line");return{segs:[o.seg],closed:!1,center:o.c,radius:o.r}}case"rect":{let n=t(s.x),i=t(s.y),r=t(s.w),o=t(s.h);if(Math.abs(r)<1e-9||Math.abs(o)<1e-9)throw new Error("Width and height must not be 0");r<0&&(n+=r,r=-r),o<0&&(i+=o,o=-o);let a=[[n,i],[n+r,i],[n+r,i+o],[n,i+o]];return{segs:a.map((l,c)=>bs(l,a[(c+1)%4])),closed:!0}}case"circle":{let n=[t(s.cx),t(s.cy)],i=t(s.r);if(i<=0)throw new Error("Radius must be more than 0");return{segs:[Ms(n,i,0,180),Ms(n,i,180,360)],closed:!0,circle:{c:n,r:i}}}case"polygon":{let n=[t(s.cx),t(s.cy)],i=t(s.r),r=Math.round(t(s.n)),o=t(s.rot||0);if(i<=0)throw new Error("Size must be more than 0");if(r<3||r>64)throw new Error("Sides must be 3 to 64");let a=[];for(let l=0;l<r;l++)a.push(ki(n,i,o+360*l/r));return{segs:a.map((l,c)=>bs(l,a[(c+1)%r])),closed:!0}}case"slot":{let n=[t(s.x1),t(s.y1)],i=[t(s.x2),t(s.y2)],r=t(s.w);if(r<=0)throw new Error("Width must be more than 0");if(Math.hypot(i[0]-n[0],i[1]-n[1])<1e-9)throw new Error("Slot ends must be apart");let a=Math.atan2(i[1]-n[1],i[0]-n[0])*180/Math.PI,l=r/2,c=Ms(i,l,a-90,a+90),h=Ms(n,l,a+90,a+270);return{segs:[c,bs(c.b,h.a),h,bs(h.b,c.a)],closed:!0}}case"point":return{segs:[],closed:!1,point:[t(s.x),t(s.y)]}}throw new Error("Unknown sketch item "+s.type)}function xr(s,e){return s.map(t=>{try{return{e:t,g:xy(t,e)}}catch(n){return{e:t,err:n.message}}})}function vy(s,e){if(s.type==="line"){e.push(s.a);return}let t=oi(s.a1,s.a2),n=Math.max(4,Math.ceil(t/10));for(let i=0;i<n;i++)e.push(ki(s.c,s.r,s.a1+t*i/n))}function by(s){return s.type==="line"?bs(s.b,s.a):{...s,a:s.b,b:s.a,reversed:!s.reversed}}function My(s){let e=0;for(let t=0;t<s.length;t++){let n=s[t],i=s[(t+1)%s.length];e+=n[0]*i[1]-i[0]*n[1]}return e/2}function Sy(s,e){let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){let[r,o]=e[n],[a,l]=e[i];o>s[1]!=l>s[1]&&s[0]<(a-r)*(s[1]-o)/(l-o)+r&&(t=!t)}return t}function Ey(s,e){let t=1/0;for(let n=0;n<e.length;n++){let i=e[n],r=e[(n+1)%e.length],o=r[0]-i[0],a=r[1]-i[1],l=o*o+a*a||1,c=Math.max(0,Math.min(1,((s[0]-i[0])*o+(s[1]-i[1])*a)/l));t=Math.min(t,Math.hypot(s[0]-i[0]-c*o,s[1]-i[1]-c*a))}return t}function wy(s,e){let t=0;for(let n of e)if(!(Ey(n,s)<.001)){if(!Sy(n,s))return!1;t++}return t>0||e.length>0}var Gu=1e-4,Ra=(s,e)=>Math.abs(s[0]-e[0])<Gu&&Math.abs(s[1]-e[1])<Gu;function Pa(s){let e=[],t=[];for(let i of s)if(!(!i.g||i.e.construction))if(i.g.closed)e.push({segs:i.g.segs,circle:i.g.circle,ids:[i.e.id]});else for(let r of i.g.segs)t.push({s:r,id:i.e.id,used:!1});let n=0;for(let i of t){if(i.used)continue;i.used=!0;let r=[i.s],o=[i.id],a=!1;for(let l=0;l<1e4;l++){let c=r[r.length-1].b;if(r.length>1&&Ra(c,r[0].a)){a=!0;break}if(r.length===1&&r[0].type==="arc"&&Ra(c,r[0].a)){a=!0;break}let h=null;for(let d of t)if(!d.used&&(Ra(d.s.a,c)?h=d.s:Ra(d.s.b,c)&&(h=by(d.s)),h)){d.used=!0,o.push(d.id);break}if(!h)break;r.push(h)}a?e.push({segs:r,ids:o}):n++}for(let i of e){let r=[];for(let o of i.segs)vy(o,r);i.poly=r,i.area=Math.abs(My(r))}for(let i of e)i.depth=e.filter(r=>r!==i&&r.area>i.area+1e-9&&wy(r.poly,i.poly)).length;return e.sort((i,r)=>i.depth-r.depth||r.area-i.area),{loops:e,openEnds:n}}var Xt={line:1459578,cons:14254635,sel:15227148,hover:1221530,err:14036783,open:14036783,pt:1459578,fill:3065014,preview:1221530},Et=s=>Math.round(s*1e3)/1e3,Wu=s=>Math.round(s*1e5)/1e5;var La=s=>typeof s=="number"||typeof s=="string"&&/^\s*-?\d*\.?\d+(e-?\d+)?\s*$/i.test(s),Ge=(s,e)=>{try{return En(s,e)}catch{return NaN}},Ty={select:"Click a shape to pick it. Drag a dot to move a point. Click a blue number to change it. Delete removes.",line:"Click to start, keep clicking for more lines. Click the first point to close. Esc or right-click stops.",rect:"Click one corner, then the opposite corner.",circle:"Click the center, then click to set the size.",arc:"Click the start, then the end, then a point the arc should pass through.",polygon:"Click the center, then a corner.",slot:"Click one end center, then the other end center, then set the width."},ka=class{constructor(e){this.app=e,this.vp=e.vp,this.group=this.vp.sketchGroup,this.labelsEl=document.getElementById("dimLayer"),this.active=!1,this.tool="select",this.temp=[],this.sel=new Set,this.hover=null,this.cursor=null,this.polySides=6,this.gridOn=!0,this.labels=[],this.vp.onBeforeRender=()=>this.active&&this.placeLabels();let t=this.vp.renderer.domElement;t.addEventListener("pointermove",n=>this.active&&this.onMove(n)),t.addEventListener("pointerdown",n=>this.active&&this.onDown(n)),t.addEventListener("pointerup",n=>this.active&&this.onUp(n)),t.addEventListener("contextmenu",n=>{this.active&&n.preventDefault()}),this.vp.controls.addEventListener("change",()=>this.active&&this.drawGrid())}get feature(){return this.app.sketchFeature()}get P(){return this.app.params()}enter(e){this.active=!0,this.plane=e;let t=new T(...e.xDir),n=new T(...e.normal),i=new T().crossVectors(n,t);this.m=new je().makeBasis(t,i,n).setPosition(...e.origin),this.mInv=this.m.clone().invert(),this.group.matrixAutoUpdate=!1,this.group.matrix.copy(this.m),this.group.matrixWorldNeedsUpdate=!0,this.three=new Nt().setFromNormalAndCoplanarPoint(n,new T(...e.origin)),this.vp.controls.enableRotate=!1,this.vp.controls.mouseButtons={LEFT:null,MIDDLE:Ot.PAN,RIGHT:Ot.PAN},this.vp.grid.visible=!1,this.lookAt(),this.setTool("line"),this.redraw()}lookAt(){let e=new T(...this.plane.normal),t=new T().crossVectors(e,new T(...this.plane.xDir)),n=[];for(let l of this.evals||[])if(l.g)for(let c of l.g.segs)n.push(c.a,c.b);let i=0,r=0,o=100;if(n.length){let l=n.map(h=>h[0]),c=n.map(h=>h[1]);i=(Math.min(...l)+Math.max(...l))/2,r=(Math.min(...c)+Math.max(...c))/2,o=Math.max(20,(Math.max(...l)-Math.min(...l))*1.4,(Math.max(...c)-Math.min(...c))*1.4)}let a=new T(i,r,0).applyMatrix4(this.m);this.vp.viewHeight=o,this.vp.camera.zoom=1,this.vp.updateFrustum(),this.vp.lookAlong(e,t,a)}exit(){this.active=!1,this.temp=[],this.sel.clear();for(let e of[...this.group.children])this.group.remove(e),e.geometry&&e.geometry.dispose();this.labelsEl.innerHTML="",this.labels=[],this.vp.controls.enableRotate=!0,this.vp.controls.mouseButtons={LEFT:null,MIDDLE:Ot.PAN,RIGHT:Ot.ROTATE},this.vp.grid.visible=!0,this.vp.render()}setTool(e){this.tool=e,this.temp=[],this.app.ui.sketchToolChanged(e),this.app.status(Ty[e]||""),this.redraw()}entities(){return this.feature.entities}local(e){let t=this.vp.ray(e),n=new T;return t.ray.intersectPlane(this.three,n)?(n.applyMatrix4(this.mInv),[n.x,n.y]):null}gridStep(){let e=this.vp.pixelSize(),t=this.app.units()==="in"?[.0625,.125,.25,.5,1,2,5,10,20]:[.1,.2,.5,1,2,5,10,20,50,100,200,500];for(let n of t)if(n/e>=14)return n;return t[t.length-1]*2}snapPoints(){let e=[{p:[0,0],kind:"origin"}];for(let t of this.evals||[]){if(!t.g)continue;let n=t.e;if(n.type==="line"){let i=t.g.segs[0];e.push({p:i.a,kind:"end"},{p:i.b,kind:"end"},{p:[(i.a[0]+i.b[0])/2,(i.a[1]+i.b[1])/2],kind:"mid"})}else if(n.type==="arc"){let i=t.g.segs[0];e.push({p:i.a,kind:"end"},{p:i.b,kind:"end"},{p:t.g.center,kind:"center"})}else if(n.type==="circle")e.push({p:t.g.circle.c,kind:"center"});else if(n.type==="rect"||n.type==="polygon"){for(let i of t.g.segs)e.push({p:i.a,kind:"end"},{p:[(i.a[0]+i.b[0])/2,(i.a[1]+i.b[1])/2],kind:"mid"});n.type==="polygon"&&e.push({p:[Ge(n.cx,this.P),Ge(n.cy,this.P)],kind:"center"})}else n.type==="slot"&&e.push({p:[Ge(n.x1,this.P),Ge(n.y1,this.P)],kind:"center"},{p:[Ge(n.x2,this.P),Ge(n.y2,this.P)],kind:"center"})}return e}snap(e,t,n){let i=this.vp.pixelSize(),r=null,o=10*i;for(let c of this.snapPoints()){let h=Math.hypot(c.p[0]-e[0],c.p[1]-e[1]);h<o&&(o=h,r=c)}if(r)return{p:[...r.p],kind:r.kind};let a=[...e],l=null;if(this.gridOn&&!(n&&n.altKey)){let c=this.gridStep()/(this.app.units()==="in"?1:2);a=[Math.round(a[0]/c)*c,Math.round(a[1]/c)*c]}if(t){let c=a[0]-t[0],h=a[1]-t[1],d=Math.abs(Math.atan2(h,c)*180/Math.PI);Math.abs(h)<1e-9||d<4||d>176?(a[1]=t[1],l="horizontal"):Math.abs(d-90)<4&&(a[0]=t[0],l="vertical")}return{p:[Wu(a[0]),Wu(a[1])],kind:l}}distToSeg(e,t){if(t.type==="line"){let[r,o]=t.a,[a,l]=t.b,c=a-r,h=l-o,d=c*c+h*h||1,u=Math.max(0,Math.min(1,((e[0]-r)*c+(e[1]-o)*h)/d));return Math.hypot(e[0]-r-u*c,e[1]-o-u*h)}let n=Math.abs(Math.hypot(e[0]-t.c[0],e[1]-t.c[1])-t.r),i=Math.atan2(e[1]-t.c[1],e[0]-t.c[0])*180/Math.PI;return oi(t.a1,i)<=oi(t.a1,t.a2)+1e-6?n:Math.min(Math.hypot(e[0]-t.a[0],e[1]-t.a[1]),Math.hypot(e[0]-t.b[0],e[1]-t.b[1]))}entityAt(e){let t=8*this.vp.pixelSize(),n=null,i=t;for(let r of this.evals||[])if(r.g)for(let o of r.g.segs){let a=this.distToSeg(e,o);a<i&&(i=a,n=r.e)}return n}handles(e){let t=this.P,n=(i,r)=>({e,kx:i,ky:r,p:[Ge(e[i],t),Ge(e[r],t)]});switch(e.type){case"line":return[n("x1","y1"),n("x2","y2")];case"arc":return[n("x1","y1"),n("x2","y2"),n("xm","ym")];case"circle":case"polygon":return[n("cx","cy")];case"slot":return[n("x1","y1"),n("x2","y2")];case"rect":return[n("x","y")]}return[]}handleAt(e){let t=8*this.vp.pixelSize(),n=null,i=t;for(let r of this.entities())for(let o of this.handles(r)){let a=Math.hypot(o.p[0]-e[0],o.p[1]-e[1]);a<i&&(i=a,n=o)}return n}coincident(e,t){let n=[];for(let i of this.entities())for(let r of this.handles(i))t&&r.e===t.e&&r.kx===t.kx||i.type==="circle"||i.type==="polygon"||i.type==="rect"||r.kx==="xm"||Math.hypot(r.p[0]-e[0],r.p[1]-e[1])<1e-4&&n.push(r);return n}onMove(e){let t=this.local(e);if(!t)return;if(this.drag){let o=this.snap(t,null,e).p;for(let a of this.drag.handles)a.e[a.kx]=Et(o[0]+a.off[0]),a.e[a.ky]=Et(o[1]+a.off[1]);this.drag.moved=!0,this.recompute(),this.redraw();return}let n=this.temp.length?this.temp[this.temp.length-1]:null,i=this.snap(t,this.tool==="line"||this.tool==="slot"?n:null,e);if(this.cursor=i,this.tool==="select"){let r=this.handleAt(t);this.hover=r?{handle:r}:null;let o=r?null:this.entityAt(t);o&&(this.hover={entity:o}),this.vp.renderer.domElement.style.cursor=r?"move":o?"pointer":"default"}else this.vp.renderer.domElement.style.cursor="crosshair";this.redraw()}onDown(e){if(e.button===2){this._rightDown=[e.clientX,e.clientY];return}if(e.button!==0)return;let t=this.local(e);if(!t)return;if(this.tool==="select"){let i=this.handleAt(t);if(i){let o=[i,...this.coincident(i.p,i)];if((i.e.type==="rect"||i.e.type==="circle"||i.e.type==="polygon")&&(o.length=1),this.drag={handles:o.map(a=>({...a,off:[0,0]})),moved:!1},i.e.type==="slot"){let a=this.handles(i.e).find(l=>l.kx!==i.kx);e.shiftKey&&this.drag.handles.push({...a,off:[a.p[0]-i.p[0],a.p[1]-i.p[1]]})}this.app.beginChange();return}let r=this.entityAt(t);e.shiftKey||this.sel.clear(),r&&(this.sel.has(r.id)&&e.shiftKey?this.sel.delete(r.id):this.sel.add(r.id)),this.app.ui.sketchSelection(),this.redraw();return}let n=this.snap(t,this.temp.length?this.temp[this.temp.length-1]:null,e);this.click(n.p)}onUp(e){if(e.button===2&&this._rightDown){let t=Math.hypot(e.clientX-this._rightDown[0],e.clientY-this._rightDown[1]);this._rightDown=null,t<4&&this.cancelTemp();return}if(this.drag){let t=this.drag.moved;this.drag=null,t?this.app.endChange():this.app.abortChange(),this.redraw()}}cancelTemp(){this.temp.length?(this.temp=[],this.redraw()):this.tool!=="select"&&this.setTool("select")}add(e){return e.id=this.app.newId("e"),this.app.change(()=>this.entities().push(e)),this.recompute(),e}click(e){let t=this.temp;switch(this.tool){case"line":if(t.length&&Math.hypot(e[0]-t[t.length-1][0],e[1]-t[t.length-1][1])<1e-6)return;if(t.push(e),t.length>=2){let n=t[t.length-2];this.add({type:"line",x1:n[0],y1:n[1],x2:e[0],y2:e[1]}),t.length>2&&Math.hypot(e[0]-t[0][0],e[1]-t[0][1])<1e-6?this.temp=[]:this.temp=[e],this.temp.length||(this.temp=[]),this.chainStart=this.chainStart||t[0]}break;case"rect":if(t.push(e),t.length===2){let[n,i]=t;Math.abs(n[0]-i[0])>1e-6&&Math.abs(n[1]-i[1])>1e-6&&this.add({type:"rect",x:Et(Math.min(n[0],i[0])),y:Et(Math.min(n[1],i[1])),w:Et(Math.abs(i[0]-n[0])),h:Et(Math.abs(i[1]-n[1]))}),this.temp=[]}break;case"circle":if(t.push(e),t.length===2){let n=Et(Math.hypot(t[1][0]-t[0][0],t[1][1]-t[0][1]));n>0&&this.add({type:"circle",cx:t[0][0],cy:t[0][1],r:n}),this.temp=[]}break;case"polygon":if(t.push(e),t.length===2){let n=Et(Math.hypot(t[1][0]-t[0][0],t[1][1]-t[0][1])),i=Et(Math.atan2(t[1][1]-t[0][1],t[1][0]-t[0][0])*180/Math.PI);n>0&&this.add({type:"polygon",cx:t[0][0],cy:t[0][1],r:n,n:this.polySides,rot:i}),this.temp=[]}break;case"arc":if(t.push(e),t.length===3){let[n,i,r]=t;_r(n,i,r)&&this.add({type:"arc",x1:n[0],y1:n[1],x2:i[0],y2:i[1],xm:Et(r[0]),ym:Et(r[1])}),this.temp=[]}break;case"slot":if(t.push(e),t.length===3){let[n,i,r]=t,o=Et(2*this.distToSeg(r,{type:"line",a:n,b:i}));o>0&&Math.hypot(i[0]-n[0],i[1]-n[1])>1e-6&&this.add({type:"slot",x1:n[0],y1:n[1],x2:i[0],y2:i[1],w:o}),this.temp=[]}break}this.redraw()}deleteSelected(){if(!this.sel.size)return!1;let e=this.sel;return this.app.change(()=>{let t=this.feature;t.entities=t.entities.filter(n=>!e.has(n.id))}),this.sel=new Set,this.recompute(),this.app.ui.sketchSelection(),this.redraw(),!0}toggleConstruction(){this.sel.size&&(this.app.change(()=>{for(let e of this.entities())this.sel.has(e.id)&&(e.construction=!e.construction)}),this.recompute(),this.redraw())}recompute(){this.evals=xr(this.entities(),this.P);let{loops:e,openEnds:t}=Pa(this.evals);this.loops=e,this.openEnds=t}clearGroup(){for(let e of[...this.group.children])this.group.remove(e),e.geometry&&e.geometry.dispose()}segPoints(e){if(e.type==="line")return[e.a,e.b];let t=oi(e.a1,e.a2),n=Math.max(8,Math.ceil(t/4)),i=[];for(let r=0;r<=n;r++)i.push(ki(e.c,e.r,e.a1+t*r/n));return i}line(e,t,n,i=3){let r=new Ye().setFromPoints(e.map(c=>new T(c[0],c[1],.02))),o=this.vp.pixelSize(),a=n?new Si({color:t,dashSize:6*o,gapSize:4*o,depthTest:!1,transparent:!0}):new Pt({color:t,depthTest:!1,transparent:!0}),l=new nn(r,a);return n&&l.computeLineDistances(),l.renderOrder=i,this.group.add(l),l}dots(e,t,n=7){if(!e.length)return;let i=new Ye().setFromPoints(e.map(o=>new T(o[0],o[1],.03))),r=new Xs(i,new ls({color:t,size:n,sizeAttenuation:!1,depthTest:!1,transparent:!0}));r.renderOrder=6,this.group.add(r)}drawGrid(){if(this.gridObj&&(this.group.remove(this.gridObj),this.gridObj.geometry.dispose(),this.gridObj=null),!this.gridOn){this.vp.render();return}let e=this.gridStep(),t=this.vp.camera,n=this.vp.controls.target.clone().applyMatrix4(this.mInv),i=(t.right-t.left)/2/t.zoom,r=(t.top-t.bottom)/2/t.zoom,o=Math.floor((n.x-i)/e)*e,a=Math.ceil((n.x+i)/e)*e,l=Math.floor((n.y-r)/e)*e,c=Math.ceil((n.y+r)/e)*e,h=[],d=[],u=new ke(14936302),f=new ke(12963801),m=new ke(15029067),y=new ke(3781227),g=(b,v,C)=>{h.push(b[0],b[1],-.01,v[0],v[1],-.01),d.push(C.r,C.g,C.b,C.r,C.g,C.b)},p=0;for(let b=o;b<=a&&p<600;b+=e,p++){let v=Math.round(b/e);g([b,l],[b,c],Math.abs(b)<e/2?y:v%5===0?f:u)}for(let b=l;b<=c&&p<1200;b+=e,p++){let v=Math.round(b/e);g([o,b],[a,b],Math.abs(b)<e/2?m:v%5===0?f:u)}let w=new Ye;w.setAttribute("position",new dt(h,3)),w.setAttribute("color",new dt(d,3)),this.gridObj=new Mn(w,new Pt({vertexColors:!0,depthTest:!1,transparent:!0,opacity:.9})),this.gridObj.renderOrder=1,this.group.add(this.gridObj),this.app.ui.setGridStep(e),this.vp.render()}redraw(){if(!this.active)return;this.evals||this.recompute(),this.clearGroup(),this.gridObj=null,this.drawGrid();for(let o of this.loops||[]){if(o.depth%2)continue;let a=new hs(o.poly.map(c=>new se(c[0],c[1])));for(let c of this.loops){if(c.depth!==o.depth+1)continue;let h=c.segs[0],d=h.type==="line"?[(h.a[0]+h.b[0])/2,(h.a[1]+h.b[1])/2]:h.m;Ay(d,o.poly)&&a.holes.push(new vi(c.poly.map(u=>new se(u[0],u[1]))))}let l=new lt(new nr(a),new Ft({color:Xt.fill,transparent:!0,opacity:.18,side:xt,depthTest:!1,depthWrite:!1}));l.renderOrder=2,this.group.add(l)}let e=[];for(let o of this.evals){if(!o.g)continue;let a=o.e,l=this.hover&&(this.hover.entity===a||this.hover.handle&&this.hover.handle.e===a),c=this.sel.has(a.id)?Xt.sel:l?Xt.hover:a.construction?Xt.cons:Xt.line;for(let h of o.g.segs)this.line(this.segPoints(h),c,!!a.construction);(a.type==="line"||a.type==="arc")&&!a.construction&&e.push(o.g.segs[0].a,o.g.segs[0].b),(a.type==="circle"||a.type==="arc")&&this.dots([o.g.center||o.g.circle.c],c,5),a.type==="polygon"&&this.dots([[Ge(a.cx,this.P),Ge(a.cy,this.P)]],c,5)}let t=[],n=[];for(let o of e)(e.filter(l=>Math.abs(l[0]-o[0])<1e-4&&Math.abs(l[1]-o[1])<1e-4).length>=2?n:t).push(o);this.dots(n,Xt.pt,6),this.dots(t,Xt.open,9);let i=this.cursor&&this.cursor.p,r=this.temp;if(i&&r.length){let o=r[0];switch(this.tool){case"line":this.line([r[r.length-1],i],Xt.preview,!1,4);break;case"rect":this.line([o,[i[0],o[1]],i,[o[0],i[1]],o],Xt.preview,!1,4);break;case"circle":case"polygon":{let a=Math.hypot(i[0]-o[0],i[1]-o[1]),l=this.tool==="circle"?64:this.polySides,c=Math.atan2(i[1]-o[1],i[0]-o[0]),h=[];for(let d=0;d<=l;d++)h.push([o[0]+a*Math.cos(c+d*2*Math.PI/l),o[1]+a*Math.sin(c+d*2*Math.PI/l)]);this.line(h,Xt.preview,!1,4);break}case"arc":if(r.length===1)this.line([o,i],Xt.preview,!0,4);else{let a=_r(r[0],r[1],i);a&&this.line(this.segPoints(a.seg),Xt.preview,!1,4)}break;case"slot":if(r.length===1)this.line([o,i],Xt.preview,!0,4);else{let a=2*this.distToSeg(i,{type:"line",a:r[0],b:r[1]});try{let l=xr([{id:"tmp",type:"slot",x1:r[0][0],y1:r[0][1],x2:r[1][0],y2:r[1][1],w:a}],{})[0];if(l.g)for(let c of l.g.segs)this.line(this.segPoints(c),Xt.preview,!1,4)}catch{}}break}}i&&this.tool!=="select"&&this.dots([i],this.cursor.kind&&this.cursor.kind!=="horizontal"&&this.cursor.kind!=="vertical"?16747546:Xt.preview,this.cursor.kind?10:6),this.buildLabels(),this.app.ui.sketchInfo(this),this.vp.render()}buildLabels(){let e=this.P,t=[];for(let i of this.evals){if(!i.g)continue;let r=i.e,o=(a,l,c,h=[0,0])=>t.push({pos:a,text:l,edit:c,e:r,off:h});switch(r.type){case"line":{let a=i.g.segs[0],l=Math.hypot(a.b[0]-a.a[0],a.b[1]-a.a[1]),c=-(a.b[1]-a.a[1])/(l||1),h=(a.b[0]-a.a[0])/(l||1);o([(a.a[0]+a.b[0])/2,(a.a[1]+a.b[1])/2],Me(l),"length",[c*14,h*14]);break}case"rect":{let a=Ge(r.x,e),l=Ge(r.y,e),c=Ge(r.w,e),h=Ge(r.h,e),d=Math.min(a,a+c),u=Math.min(l,l+h);o([d+Math.abs(c)/2,u],Da(r.w,c),"w",[0,-14]),o([d,u+Math.abs(h)/2],Da(r.h,h),"h",[-18,0]);break}case"circle":{let{c:a,r:l}=i.g.circle;o([a[0]+l*.707,a[1]+l*.707],"\xD8"+Me(2*l),"diameter",[12,12]);break}case"arc":{let a=i.g.segs[0];o(a.m,"R"+Me(a.r),"radius",[12,10]);break}case"polygon":{o([Ge(r.cx,e),Ge(r.cy,e)-Ge(r.r,e)],"R"+Da(r.r,Ge(r.r,e)),"r",[0,-14]);break}case"slot":{let a=[Ge(r.x1,e),Ge(r.y1,e)],l=[Ge(r.x2,e),Ge(r.y2,e)];o([(a[0]+l[0])/2,(a[1]+l[1])/2],Me(Math.hypot(l[0]-a[0],l[1]-a[1])),"slotlen",[0,12]),o(l,"W"+Da(r.w,Ge(r.w,e)),"w",[0,-16]);break}}}this.labels=t;let n=this.labelsEl;n.innerHTML="";for(let i of t){let r=document.createElement("button");r.className="dim"+(this.sel.has(i.e.id)?" sel":"")+(i.e.construction?" cons":""),r.textContent=i.text,r.title="Click to type a new size",r.addEventListener("pointerdown",o=>o.stopPropagation()),r.addEventListener("click",o=>{o.stopPropagation(),this.editLabel(i,r)}),i.el=r,n.appendChild(r)}this.placeLabels()}placeLabels(){for(let e of this.labels){if(!e.el)continue;let t=new T(e.pos[0],e.pos[1],0).applyMatrix4(this.m),[n,i]=this.vp.screenOf(t.toArray());e.el.style.left=n+e.off[0]+"px",e.el.style.top=i-e.off[1]+"px"}}editLabel(e,t){let n=e.e,i=this.P,r=e.text.replace(/^[ØRW]/,"");if((e.edit==="w"||e.edit==="h"||e.edit==="r")&&(r=String(n[e.edit])),e.edit==="diameter"&&!La(n.r)){let c=String(n.r).match(/^\((.*)\)\/2$/);c&&(r=c[1])}let o=document.createElement("input");o.className="dim-input",o.value=r,t.replaceWith(o),o.style.left=t.style.left,o.style.top=t.style.top,o.focus(),o.select();let a=!1,l=c=>{if(a)return;a=!0;let h=o.value.trim();if(c&&h&&h!==r){let d;try{d=En(h,i)}catch(f){this.app.toast(f.message,"error"),this.buildLabels();return}if(d<=0){this.app.toast("Size must be more than 0","error"),this.buildLabels();return}let u=La(h)?Et(d):h;this.app.change(()=>this.applyDim(n,e.edit,u,d)),this.recompute()}this.redraw()};o.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"&&l(!0),c.key==="Escape"&&l(!1)}),o.addEventListener("blur",()=>l(!0))}applyDim(e,t,n,i){let r=this.P;if(t==="w"||t==="h"||t==="r"){e[t]=n;return}if(t==="diameter"){e.r=typeof n=="number"?Et(n/2):`(${n})/2`;return}if(t==="length"){let o=[Ge(e.x1,r),Ge(e.y1,r)],a=[Ge(e.x2,r),Ge(e.y2,r)],l=Math.hypot(a[0]-o[0],a[1]-o[1])||1,c=(a[0]-o[0])/l,h=(a[1]-o[1])/l,d=[Et(o[0]+c*i),Et(o[1]+h*i)],u=this.coincident(a,{e,kx:"x2"});typeof n=="string"&&Math.abs(h)<1e-9?e.x2=`${Ia(e.x1)} ${c>0?"+":"-"} ${Ia(n)}`:typeof n=="string"&&Math.abs(c)<1e-9?e.y2=`${Ia(e.y1)} ${h>0?"+":"-"} ${Ia(n)}`:(e.x2=d[0],e.y2=d[1]),(typeof n!="string"||Math.abs(h)>=1e-9&&Math.abs(c)>=1e-9)&&(e.x2=d[0],e.y2=d[1]);for(let f of u)f.e[f.kx]=d[0],f.e[f.ky]=d[1];return}if(t==="radius"){let o=[Ge(e.x1,r),Ge(e.y1,r)],a=[Ge(e.x2,r),Ge(e.y2,r)],l=[Ge(e.xm,r),Ge(e.ym,r)],c=Math.hypot(a[0]-o[0],a[1]-o[1])/2;if(i<c-1e-9){this.app.toast(`Radius must be at least ${Me(c)} for these end points`,"error");return}let h=[(o[0]+a[0])/2,(o[1]+a[1])/2],d=-(a[1]-o[1])/(2*c),u=(a[0]-o[0])/(2*c),f=(l[0]-h[0])*d+(l[1]-h[1])*u>=0?1:-1,m=_r(o,a,l),g=m&&m.r>0&&Math.hypot(l[0]-h[0],l[1]-h[1])>m.r?i+Math.sqrt(Math.max(0,i*i-c*c)):i-Math.sqrt(Math.max(0,i*i-c*c));e.xm=Et(h[0]+f*d*g),e.ym=Et(h[1]+f*u*g);return}if(t==="slotlen"){let o=[Ge(e.x1,r),Ge(e.y1,r)],a=[Ge(e.x2,r),Ge(e.y2,r)],l=Math.hypot(a[0]-o[0],a[1]-o[1])||1;e.x2=Et(o[0]+(a[0]-o[0])/l*i),e.y2=Et(o[1]+(a[1]-o[1])/l*i)}}};function Ia(s){return La(s)?String(s):`(${s})`}function Da(s,e){return La(s)?Me(e):`${s} = ${Me(e)}`}function Ay(s,e){let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){let[r,o]=e[n],[a,l]=e[i];o>s[1]!=l>s[1]&&s[0]<(a-r)*(s[1]-o)/(l-o)+r&&(t=!t)}return t}var Xu={sketch:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M7 16l4-8 3 5 3-3"/>',extrude:'<path d="M4 15l8 4 8-4M4 15V9l8-4 8 4v6M12 19v-6M4 9l8 4 8-4"/><path d="M12 5V2M10 3.5l2-2 2 2"/>',revolve:'<ellipse cx="12" cy="7" rx="7" ry="2.5"/><path d="M5 7v10M19 7v10"/><ellipse cx="12" cy="17" rx="7" ry="2.5"/>',hole:'<ellipse cx="12" cy="7" rx="8" ry="3"/><ellipse cx="12" cy="7" rx="3" ry="1.2"/><path d="M4 7v9c0 1.7 3.6 3 8 3s8-1.3 8-3V7M9 7.5v6M15 7.5v6"/>',box:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8"/>',cylinder:'<ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/>',sphere:'<circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="8" ry="3"/>',fillet:'<path d="M4 20V10a6 6 0 0 1 6-6h10"/><path d="M4 4h4M4 4v4" opacity=".5"/>',chamfer:'<path d="M4 20V10l6-6h10"/><path d="M4 4h4M4 4v4" opacity=".5"/>',shell:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M7 9.5l5-2.5 5 2.5v5l-5 2.5-5-2.5z"/>',rectPattern:'<rect x="3" y="3" width="6" height="6"/><rect x="15" y="3" width="6" height="6"/><rect x="3" y="15" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/>',circPattern:'<circle cx="12" cy="12" r="8" stroke-dasharray="2 2"/><circle cx="12" cy="4" r="2"/><circle cx="19" cy="15" r="2"/><circle cx="5" cy="15" r="2"/>',mirror:'<path d="M12 3v18" stroke-dasharray="2 2"/><path d="M9 6L3 12l6 6zM15 6l6 6-6 6z"/>',mirrorBody:'<path d="M12 3v18" stroke-dasharray="2 2"/><path d="M10 5H4v14h6M14 5h6v14h-6"/>',params:'<path d="M9 4c-2 0-2 2-2 4v8c0 2 0 4-2 4M4 10h6M14 9l6 8M20 9l-6 8"/>',line:'<path d="M4 20L20 4"/><circle cx="4" cy="20" r="1.5"/><circle cx="20" cy="4" r="1.5"/>',rect:'<rect x="4" y="6" width="16" height="12"/>',circle:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="1"/>',arc:'<path d="M4 18a8 8 0 0 1 16 0"/><circle cx="4" cy="18" r="1.5"/><circle cx="20" cy="18" r="1.5"/><circle cx="12" cy="10" r="1.5"/>',polygon:'<path d="M12 3l8 5v8l-8 5-8-5V8z"/>',slot:'<rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="7" cy="12" r=".8"/><circle cx="17" cy="12" r=".8"/>',select:'<path d="M5 3l14 8-6 2-2 6z"/>',construction:'<path d="M4 20L20 4" stroke-dasharray="3 3"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',finish:'<path d="M5 12l5 5L20 7"/>',measure:'<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',home:'<path d="M3 11l9-7 9 7M5 9.5V20h14V9.5"/>',front:'<rect x="5" y="5" width="14" height="14"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">F</text>',top:'<rect x="5" y="5" width="14" height="14"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">T</text>',right:'<rect x="5" y="5" width="14" height="14"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">R</text>',fit:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/><rect x="9" y="9" width="6" height="6"/>',shaded:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z" fill="currentColor" opacity=".35"/><path d="M4 8l8-4 8 4v8l-8 4-8-4z"/>',edges:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8"/>',wire:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8M4 16l8-4 8 4M12 4v8" stroke-dasharray="2 1.5"/>',planes:'<path d="M3 9l9-5 9 5-9 5z"/><path d="M12 14v7M3 9v7l9 5 9-5V9" opacity=".5"/>',camera:'<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l2-3h4l2 3"/>',new:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M12 11v6M9 14h6"/>',open:'<path d="M3 6h7l2 2h9v11H3z"/>',save:'<path d="M5 3h12l3 3v15H4V3z"/><path d="M8 3v5h8V3M8 21v-7h8v7"/>',stl:'<path d="M12 3v12M7 10l5 5 5-5M4 19h16"/>',examples:'<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',redo:'<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 1-1 1.7M12 17v.5"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',eyeOff:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" opacity=".4"/><path d="M4 4l16 16"/>',warn:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',err:'<circle cx="12" cy="12" r="9"/><path d="M8 8l8 8M16 8l-8 8"/>',end:'<path d="M4 12h16"/><path d="M4 8v8M20 8v8"/>',part:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/>',origin:'<path d="M12 12h9M12 12V3M12 12l-7 7"/>',primitive:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8"/>',pattern:'<rect x="3" y="3" width="6" height="6"/><rect x="15" y="3" width="6" height="6"/><rect x="3" y="15" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/>',look:'<circle cx="12" cy="12" r="3"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',assembly:'<path d="M3 9l5-3 5 3v5l-5 3-5-3z"/><path d="M11 12l5-3 5 3v5l-5 3-5-3z"/>',mate:'<rect x="3" y="4" width="18" height="6"/><rect x="3" y="14" width="18" height="6"/><path d="M12 10v4M10 12h4" opacity=".6"/>',flush:'<rect x="3" y="4" width="8" height="16"/><rect x="13" y="8" width="8" height="12"/><path d="M2 20h20"/>',insert:'<rect x="4" y="12" width="16" height="8"/><path d="M10 12V4h4v8M8 4h8"/>',axisMate:'<path d="M12 2v20" stroke-dasharray="3 2"/><ellipse cx="12" cy="8" rx="6" ry="2"/><ellipse cx="12" cy="16" rx="6" ry="2"/>',angleMate:'<path d="M4 20h16M4 20L16 6"/><path d="M10 20a6 6 0 0 0-2-4.5"/>',pin:'<path d="M9 3h6l-1 6 3 3H7l3-3zM12 12v9"/>',bom:'<path d="M5 3h14v18H5z"/><path d="M8 7h8M8 11h8M8 15h5"/>',clash:'<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/><path d="M12 7.5v9" stroke-width="3" opacity=".5"/>',place:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M12 9v6M9 12h6"/>',back:'<path d="M10 6l-6 6 6 6M4 12h16"/>',move:'<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',drawing:'<path d="M3 4h18v16H3z"/><path d="M14 16h7M14 16v4M6 8h5v5H6z"/>',units:'<path d="M3 15l12-12 6 6-12 12z"/><path d="M7 11l2 2M10 8l2 2M13 5l2 2"/>',constraint:'<path d="M4 20L20 4"/><path d="M4 14h6v6" opacity=".6"/>',grid:'<path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/>'};function Qe(s,e=22){return`<svg class="ic" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${Xu[s]||Xu.part}</svg>`}var Ss=(s,e)=>({app:"Pathway CAD",version:1,name:s,material:"pla",color:"#8fb3c9",rollback:null,nextId:500,...e}),ai=[{title:"Mounting bracket",about:"An L-shaped bracket: sketch on the front plane, extrude both ways, round the inside corner, add bolt holes and a pattern. Sizes come from parameters.",doc:Ss("Bracket",{material:"aluminum",color:"#b9c3cc",params:[{name:"len",expr:60,note:"base length"},{name:"height",expr:50,note:"upright height"},{name:"thick",expr:5,note:"metal thickness"},{name:"width",expr:40,note:"bracket width"},{name:"bolt",expr:6,note:"bolt hole size"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XZ",offset:0,entities:[{id:"e1",type:"line",x1:0,y1:0,x2:"len",y2:0},{id:"e2",type:"line",x1:"len",y1:0,x2:"len",y2:"thick"},{id:"e3",type:"line",x1:"len",y1:"thick",x2:"thick",y2:"thick"},{id:"e4",type:"line",x1:"thick",y1:"thick",x2:"thick",y2:"height"},{id:"e5",type:"line",x1:"thick",y1:"height",x2:0,y2:"height"},{id:"e6",type:"line",x1:0,y1:"height",x2:0,y2:0}]},{id:"f2",type:"extrude",name:"Extrusion1",sketch:"f1",distance:"width",extent:"distance",direction:"both",op:"new",taper:0},{id:"f3",type:"fillet",name:"Fillet1",radius:4,allEdges:!1,edges:[[5,0,5]]},{id:"f4",type:"hole",name:"Hole1",origin:[40,-10,5],normal:[0,0,1],diameter:"bolt",extent:"through",depth:10,style:"counterbore",cbDiameter:"bolt*1.8",cbDepth:2},{id:"f5",type:"pattern",kind:"rect",name:"RectangularPattern1",features:["f4"],d1:"Y",n1:2,s1:20,d2:"X",n2:1,s2:10},{id:"f6",type:"hole",name:"Hole2",origin:[5,0,33],normal:[1,0,0],diameter:"bolt",extent:"through",depth:10,style:"simple",cbDiameter:10,cbDepth:3}]})},{title:"Wheel hub",about:"A lathe-style part: a profile drawn beside a construction axis is revolved, then bolt holes are copied around in a circle.",doc:Ss("Wheel hub",{color:"#e0a458",params:[{name:"bore",expr:10,note:"axle hole diameter"},{name:"dia",expr:80,note:"wheel diameter"},{name:"bolts",expr:5,note:"number of bolt holes"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XZ",offset:0,entities:[{id:"ax",type:"line",x1:0,y1:-5,x2:0,y2:30,construction:!0},{id:"r1",type:"rect",x:"bore/2",y:0,w:"dia/2 - bore/2",h:8},{id:"r2",type:"rect",x:"bore/2",y:0,w:8,h:25}]},{id:"f2",type:"revolve",name:"Revolution1",sketch:"f1",axis:"ax",angle:360,op:"new"},{id:"f3",type:"hole",name:"Hole1",origin:[27,0,8],normal:[0,0,1],diameter:6,extent:"through",depth:10,style:"simple",cbDiameter:10,cbDepth:3},{id:"f4",type:"pattern",kind:"circ",name:"CircularPattern1",features:["f3"],axis:"Z",n:"bolts",angle:360},{id:"f5",type:"chamfer",name:"Chamfer1",radius:1,allEdges:!0,edges:[],suppressed:!0}]})},{title:"Key tag",about:"A 3D-printable tag: a rectangle extruded 3 mm, rounded corners, a key-ring hole and a shallow slot cut into the top on an offset sketch plane.",doc:Ss("Key tag",{color:"#6cc3a0",params:[{name:"W",expr:50,note:"length"},{name:"H",expr:25,note:"height"},{name:"T",expr:3,note:"thickness"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XY",offset:0,entities:[{id:"e1",type:"rect",x:"-W/2",y:"-H/2",w:"W",h:"H"}]},{id:"f2",type:"extrude",name:"Extrusion1",sketch:"f1",distance:"T",extent:"distance",direction:"normal",op:"new",taper:0},{id:"f3",type:"fillet",name:"Fillet1",radius:5,allEdges:!1,edges:[[25,12.5,1.5],[-25,12.5,1.5],[25,-12.5,1.5],[-25,-12.5,1.5]]},{id:"f4",type:"hole",name:"Hole1",origin:[-18,0,3],normal:[0,0,1],diameter:5,extent:"through",depth:10,style:"simple",cbDiameter:9,cbDepth:3},{id:"f5",type:"sketch",name:"Sketch2",plane:"XY",offset:"T",entities:[{id:"s1",type:"slot",x1:-6,y1:0,x2:17,y2:0,w:10}]},{id:"f6",type:"extrude",name:"Extrusion2",sketch:"f5",distance:1,extent:"distance",direction:"reverse",op:"cut",taper:0}]})},{title:"Pencil cup",about:"A hexagon extruded into a tall prism, then hollowed with Shell (the top face is left open) and given a chamfered rim.",doc:Ss("Pencil cup",{color:"#8b9cf0",params:[{name:"size",expr:40,note:"corner radius of the hexagon"},{name:"tall",expr:95,note:"height"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XY",offset:0,entities:[{id:"p1",type:"polygon",cx:0,cy:0,r:"size",n:6,rot:0}]},{id:"f2",type:"extrude",name:"Extrusion1",sketch:"f1",distance:"tall",extent:"distance",direction:"normal",op:"new",taper:3},{id:"f3",type:"shell",name:"Shell1",thickness:2.5,faces:[[0,0,95]]}]})}],Cy=Ss("Pin",{material:"steel",color:"#9aa4ad",params:[{name:"shank",expr:5.8,note:"a little under the 6 mm hole so it slides in"}],features:[{id:"f1",type:"primitive",shape:"cylinder",name:"Head",diameter:10,h:3,axis:"Z",x:0,y:0,z:0,op:"new"},{id:"f2",type:"primitive",shape:"cylinder",name:"Shank",diameter:"shank",h:15,axis:"Z",x:0,y:0,z:-15,op:"join"},{id:"f3",type:"chamfer",name:"Chamfer1",radius:.6,allEdges:!1,edges:[[0,-2.9,-15]]}]}),Ry=Ss("Axle",{material:"steel",color:"#9aa4ad",params:[{name:"length",expr:100,note:"axle length"}],features:[{id:"f1",type:"primitive",shape:"cylinder",name:"Rod",diameter:9.8,h:"length",axis:"Z",x:0,y:0,z:0,op:"new"}]}),_c=[{title:"Bracket and pin",about:"A pin is Inserted into the bracket's side hole: the round edge under its head goes onto the hole's rim. Drag the pin: it can only spin.",doc:{app:"Pathway CAD",kind:"assembly",version:1,name:"Bracket and pin",units:"mm",nextId:50,parts:{p1:JSON.parse(JSON.stringify(ai[0].doc)),p2:Cy},components:[{id:"c1",name:"Bracket:1",part:"p1",pos:[0,0,0],quat:[0,0,0,1],grounded:!0},{id:"c2",name:"Pin:1",part:"p2",pos:[30,45,20],quat:[0,0,0,1],grounded:!1}],constraints:[{id:"k1",name:"Insert1",type:"insert",offset:0,sign:1,a:{comp:"c1",kind:"axis",p:[5,0,33],n:[1,0,0],r:3,rim:!0,label:"round edge \xD86"},b:{comp:"c2",kind:"axis",p:[0,0,0],n:[0,0,1],r:5,rim:!0,label:"round edge \xD810"}}]}},{title:"Wheels on an axle",about:"Two copies of the wheel hub ride on an axle. Axis constraints line up the centers, and Flush sets how far along the axle each wheel sits. Edit one hub and both change.",doc:{app:"Pathway CAD",kind:"assembly",version:1,name:"Wheels on an axle",units:"mm",nextId:50,parts:{p1:Ry,p2:JSON.parse(JSON.stringify(ai[1].doc))},components:[{id:"c1",name:"Axle:1",part:"p1",pos:[0,0,0],quat:[0,0,0,1],grounded:!0},{id:"c2",name:"Wheel hub:1",part:"p2",pos:[70,0,0],quat:[0,0,0,1],grounded:!1},{id:"c3",name:"Wheel hub:2",part:"p2",pos:[-70,0,60],quat:[0,0,0,1],grounded:!1}],constraints:[{id:"k1",name:"Axis1",type:"axis",offset:0,sign:1,a:{comp:"c1",kind:"axis",p:[0,0,0],n:[0,0,1],r:4.9,label:"round face \xD89.8"},b:{comp:"c2",kind:"axis",p:[0,0,0],n:[0,0,1],r:5,rim:!0,label:"round edge \xD810"}},{id:"k2",name:"Flush1",type:"flush",offset:-8,a:{comp:"c1",kind:"plane",p:[0,0,0],n:[0,0,-1],label:"flat face"},b:{comp:"c2",kind:"plane",p:[0,0,0],n:[0,0,-1],label:"flat face"}},{id:"k3",name:"Axis2",type:"axis",offset:0,sign:-1,a:{comp:"c1",kind:"axis",p:[0,0,0],n:[0,0,1],r:4.9,label:"round face \xD89.8"},b:{comp:"c3",kind:"axis",p:[0,0,0],n:[0,0,1],r:5,rim:!0,label:"round edge \xD810"}},{id:"k4",name:"Flush2",type:"flush",offset:-8,a:{comp:"c1",kind:"plane",p:[0,0,100],n:[0,0,1],label:"flat face"},b:{comp:"c3",kind:"plane",p:[0,0,0],n:[0,0,-1],label:"flat face"}}]}}];var ln={mm:1,in:25.4},xc={mm:"Millimetres (mm)",in:"Inches (in)"};function zt(s,e){if(e!=="in")return s;let t=s/25.4;for(let n of[.0625,.125,.25,.5,1])if(t<=n*1.5)return n;return Math.round(t)}var $u={sketch:["offset"],extrude:["distance"],hole:["diameter","depth","cbDiameter","cbDepth"],primitive:["w","d","h","diameter","x","y","z"],fillet:["radius"],chamfer:["radius"],shell:["thickness"],pattern:["s1","s2"]},qu={line:["x1","y1","x2","y2"],arc:["x1","y1","x2","y2","xm","ym"],rect:["x","y","w","h"],circle:["cx","cy","r"],polygon:["cx","cy","r"],slot:["x1","y1","x2","y2","w"],point:["x","y"]},Py=/[A-Za-z_][A-Za-z_0-9]*/g;function Iy(s){let e=[];for(let t of s.features){for(let n of $u[t.type]||[])t[n]!=null&&e.push(t[n]);if(t.type==="sketch")for(let n of t.entities||[])for(let i of qu[n.type]||[])e.push(n[i])}return e}function Yu(s){let e=new Set(s.params.map(i=>i.name)),t=new Set,n=i=>{for(let r of String(i).match(Py)||[])e.has(r)&&!t.has(r)&&(t.add(r),n(s.params.find(o=>o.name===r).expr))};for(let i of Iy(s))typeof i=="string"&&n(i);return t}function Zu(s,e,t){let n=a=>Math.round(a*e*1e6)/1e6,i=0,r=(a,l)=>{typeof a[l]=="number"?a[l]=n(a[l]):typeof a[l]=="string"&&/\d/.test(a[l])&&!/^[A-Za-z_][\w]*$/.test(a[l].trim())&&i++},o=a=>a&&a.forEach((l,c)=>{c<3&&(a[c]=n(l))});for(let a of s.features){for(let l of $u[a.type]||[])a[l]!=null&&r(a,l);if(a.type==="sketch"){for(let l of a.entities||[])for(let c of qu[l.type]||[])r(l,c);a.plane&&typeof a.plane=="object"&&(a.plane.origin=a.plane.origin.map(n)),o(a.faceRef)}a.type==="hole"&&(a.origin=a.origin&&a.origin.map(n),o(a.faceRef)),a.edges&&a.edges.forEach(o),a.faces&&a.faces.forEach(o)}for(let a of s.params)t.has(a.name)&&(typeof a.expr=="number"?a.expr=n(a.expr):i++);return i}function Ju(s,e){let t=n=>Math.round(n*e*1e6)/1e6;for(let n of s.components)n.pos=n.pos.map(t);for(let n of s.constraints)n.type!=="angle"&&typeof n.offset=="number"&&(n.offset=t(n.offset))}var Ua=(s,e=document)=>e.querySelector(s),Dt=s=>String(s).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Ku=s=>JSON.parse(JSON.stringify(s)),It=s=>Math.round(s*1e4)/1e4,bt=s=>new T(s[0],s[1],s[2]),Na=s=>{try{return En(s,{})}catch{return 0}};var li={mate:{label:"Mate",icon:"mate",help:"Puts two flat faces against each other, facing opposite ways (like a part sitting on a table).",want:"plane"},flush:{label:"Flush",icon:"flush",help:"Lines two flat faces up so they face the same way and are level with each other.",want:"plane"},insert:{label:"Insert",icon:"insert",help:"Puts a round edge into another round edge: same center line, and the two edge rims level. Use it for pins, bolts and shafts in holes.",want:"circle"},axis:{label:"Axis",icon:"axisMate",help:"Lines up two center lines (round edges or round faces). The parts can still slide and spin along it, like a wheel on an axle.",want:"axis"},angle:{label:"Angle",icon:"angleMate",help:"Sets the angle between two flat faces (0\xB0 = facing the same way), like a hinge opened to 90\xB0.",want:"plane"}};function Fa(){return{app:"Pathway CAD",kind:"assembly",version:1,name:"Assembly1",units:"mm",parts:{},components:[],constraints:[],nextId:1}}var vr=class{constructor(e){this.app=e,this.vp=e.vp,this.group=new Gt,this.group.visible=!1,this.vp.scene.add(this.group),this.geo=new Map,this.objs=new Map,this.sel=null,this.hover=null,this.bad={},this.clashes=[]}get asm(){return this.app.asm}scaleOf(e){let t=this.asm.parts[e];return(ln[t&&t.units||"mm"]||1)/(ln[this.asm.units||"mm"]||1)}comp(e){return this.asm.components.find(t=>t.id===e)}partName(e){let t=this.asm.parts[e];return t&&t.name||"Part"}show(e){this.group.visible=e,e&&this.vp.setPart(null),this.vp.render()}partKey(e){return JSON.stringify([e.features,e.params,e.rollback??null,e.units||"mm"])}async rebuild(){if(!this.app.ready||!this.asm)return;let e=this.app.cmd&&this.app.cmd.noPreviewBuild,t={};for(let[n,i]of Object.entries(this.asm.parts)){let r=this.geo.get(n);(!r||r.key!==this.partKey(i))&&(t[n]=i)}for(let n of[...this.geo.keys()])this.asm.parts[n]||this.disposeGeo(n);if(Object.keys(t).length){let n=this._t=(this._t||0)+1;this.app.ui.busy(!0);let i=await this.app.send({type:"parts",parts:t});if(n!==this._t)return;if(this.app.ui.busy(!1),i.type==="error"){this.app.toast("Could not build the parts: "+i.msg,"error");return}for(let[r,o]of Object.entries(i.descs)){this.disposeGeo(r);let a={key:this.partKey(this.asm.parts[r]||t[r]),desc:o,errors:i.errors[r]||{}};if(o){a.geo=new Ye,a.geo.setAttribute("position",new at(o.vertices,3)),a.geo.setAttribute("normal",new at(o.normals,3)),a.geo.setIndex(new at(o.triangles,1)),a.geo.computeBoundingSphere(),a.edgeGeo=new Ye,a.edgeGeo.setAttribute("position",new at(o.lines,3));let l=[];for(let[c,h]of o.edgeGroups)for(let d=c;d<c+h-1;d++)l.push(d,d+1);a.edgeGeo.setIndex(l),a.edgeGeo.computeBoundingSphere()}this.geo.set(r,a),this.refreshRefs(r)}for(let r of this.objs.keys())this.dropObj(r)}e||this.solve(),this.render(),this.app.ui.renderTree(),this.app.ui.renderStatusInfo(),!this._fitted&&this.asm.components.length&&(this._fitted=!0,this.fit())}disposeGeo(e){let t=this.geo.get(e);t&&(t.geo&&t.geo.dispose(),t.edgeGeo&&t.edgeGeo.dispose(),this.geo.delete(e))}dropObj(e){let t=this.objs.get(e);t&&(this.group.remove(t.mesh),this.group.remove(t.edges),t.mat.dispose(),this.objs.delete(e))}matrixOf(e){let t=this.scaleOf(e.part);return new je().compose(bt(e.pos),new _t(...e.quat),new T(t,t,t))}render(){if(!this.asm)return;let e=new Set(this.asm.components.map(t=>t.id));for(let t of[...this.objs.keys()])e.has(t)||this.dropObj(t);for(let t of this.asm.components){let n=this.geo.get(t.part);if(!n||!n.geo){this.dropObj(t.id);continue}let i=this.objs.get(t.id);if(!i){let l=new Mi({metalness:.15,roughness:.55,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1,side:xt}),c=new lt(n.geo,l),h=new Mn(n.edgeGeo,this.vp.edgeMat);c.matrixAutoUpdate=!1,h.matrixAutoUpdate=!1,c.userData.comp=t.id,h.userData.comp=t.id,this.group.add(c),this.group.add(h),i={mesh:c,edges:h,mat:l},this.objs.set(t.id,i)}let r=this.asm.parts[t.part];i.mat.color.set(t.color||r&&r.color||"#8fb3c9"),i.mat.emissive.set(this.sel===t.id?1798010:this.hover&&this.hover.comp===t.id&&!this.app.cmd?932675:0);let o=this.app.cmd&&this.app.cmd.ghostOthers&&this.app.cmd.ghostOthers(t.id);i.mat.transparent=!!o,i.mat.opacity=o?.3:1,i.mat.depthWrite=!o;let a=this.matrixOf(t);i.mesh.matrix.copy(a),i.edges.matrix.copy(a),i.mesh.matrixWorldNeedsUpdate=!0,i.edges.matrixWorldNeedsUpdate=!0,i.mesh.visible=!t.hidden,i.edges.visible=!t.hidden&&this.vp.style!=="shaded",this.vp.style==="wire"&&(i.mesh.visible=!1)}this.drawClashes(),this.vp.render()}fit(){let e=new fn;for(let t of this.objs.values())t.mesh.visible&&e.expandByObject(t.mesh);if(e.isEmpty())return this.vp.fit([[-50,-50,0],[50,50,50]]);this.vp.fit([e.min.toArray(),e.max.toArray()])}refFromHit(e,t){let n=this.geo.get(this.comp(e.comp).part);if(!n||!n.desc)return null;if(e.kind==="face"){let i=n.desc.faces[e.index];return i.type==="PLANE"&&(t==="plane"||t==="any")?{comp:e.comp,kind:"plane",p:i.center.map(It),n:i.normal.map(It),label:"flat face"}:i.axis&&(t==="axis"||t==="any")?{comp:e.comp,kind:"axis",p:i.axis.p.map(It),n:i.axis.d.map(It),r:It(i.axis.r),label:`round face \xD8${Me(2*i.axis.r)}`}:null}if(e.kind==="edge"){let i=n.desc.edges[e.index];if(i.circle&&(t==="circle"||t==="axis"||t==="any"))return{comp:e.comp,kind:"axis",p:i.circle.c.map(It),n:i.circle.n.map(It),r:It(i.circle.r),rim:!0,label:`round edge \xD8${Me(2*i.circle.r)}`}}return null}worldRef(e){let t=this.comp(e.comp),n=this.matrixOf(t),i=new _t(...t.quat);return{p:bt(e.p).applyMatrix4(n),n:bt(e.n).applyQuaternion(i).normalize()}}refreshRefs(e){let t=this.geo.get(e);if(!(!t||!t.desc||!this.asm))for(let n of this.asm.constraints)for(let i of[n.a,n.b]){let r=this.comp(i.comp);if(!r||r.part!==e)continue;let o=null,a=1/0,l=bt(i.n);if(i.kind==="plane")for(let c of t.desc.faces){if(c.type!=="PLANE"||bt(c.normal).dot(l)<.999)continue;let h=Math.abs(bt(c.center).sub(bt(i.p)).dot(l))*4+bt(c.center).distanceTo(bt(i.p));h<a&&(a=h,o={p:c.center,n:c.normal})}else{let c=[];for(let h of t.desc.edges)h.circle&&(i.rim||!0)&&c.push({p:h.circle.c,n:h.circle.n,r:h.circle.r,rim:!0});for(let h of t.desc.faces)h.axis&&!i.rim&&c.push({p:h.axis.p,n:h.axis.d,r:h.axis.r});for(let h of c){if(Math.abs(bt(h.n).dot(l))<.999||!!h.rim!=!!i.rim)continue;let d=bt(h.p).distanceTo(bt(i.p))+Math.abs(h.r-(i.r||h.r))*2;d<a&&(a=d,o=h)}}o?(i.p=o.p.map(It),i.kind==="plane"||bt(o.n).dot(l)>0?i.n=o.n.map(It):i.n=o.n.map(c=>It(-c)),o.r&&(i.r=It(o.r)),i.lost=!1):i.lost=!0}}solve(e=80){let t=this.asm;if(!t)return;let n=t.constraints.filter(i=>!i.suppressed&&this.comp(i.a.comp)&&this.comp(i.b.comp));for(let i=0;i<e;i++){let r=0;for(let o of n)r+=this.applyOne(o);if(r<1e-9)break}this.bad={};for(let i of n){let r=this.residual(i);r>.001&&(this.bad[i.id]=r)}for(let i of t.components){i.pos=i.pos.map(It);let r=new _t(...i.quat).normalize();i.quat=[r.x,r.y,r.z,r.w].map(o=>Math.round(o*1e8)/1e8)}}pickMover(e){let t=this.comp(e.a.comp),n=this.comp(e.b.comp);if(t===n)return null;let i=t.grounded||this._dragging===t.id;return n.grounded||this._dragging===n.id?i?null:{mover:t,mref:e.a,fref:e.b,sideB:!1}:{mover:n,mref:e.b,fref:e.a,sideB:!0}}rotateAbout(e,t,n){let i=bt(e.pos).sub(n).applyQuaternion(t).add(n),r=t.clone().multiply(new _t(...e.quat)).normalize();e.pos=i.toArray(),e.quat=[r.x,r.y,r.z,r.w]}applyOne(e){let t=this.pickMover(e);if(!t)return 0;let{mover:n,mref:i,fref:r}=t,o=this.worldRef(r),a=this.worldRef(i),l=0,c=Na(e.offset);if(e.type==="mate"||e.type==="flush"){let h=e.type==="mate"?o.n.clone().negate():o.n.clone(),d=new _t().setFromUnitVectors(a.n,h),u=2*Math.acos(Math.min(1,Math.abs(d.w)));u>1e-10&&(this.rotateAbout(n,d,a.p),l+=u*10,a=this.worldRef(i));let f=a.p.clone().sub(o.p).dot(o.n),y=(t.sideB||e.type==="mate"?c:-c)-f;Math.abs(y)>1e-10&&(n.pos=bt(n.pos).addScaledVector(o.n,y).toArray(),l+=Math.abs(y))}else if(e.type==="angle"){let h=c*Math.PI/180,d=this.comp(r.comp),u=new _t(...d.quat);if(!e.hinge||e.hinge.comp!==d.id){let p=new T().crossVectors(o.n,a.n);p.lengthSq()<1e-12&&p.copy(Math.abs(o.n.z)<.9?new T(0,0,1):new T(1,0,0)).cross(o.n),p.normalize().applyQuaternion(u.clone().invert()),e.hinge={comp:d.id,d:p.toArray().map(It)}}let f=bt(e.hinge.d).applyQuaternion(u);f=f.sub(o.n.clone().multiplyScalar(f.dot(o.n))).normalize();let m=o.n.clone().applyAxisAngle(f,t.sideB?h:-h),y=new _t().setFromUnitVectors(a.n,m),g=2*Math.acos(Math.min(1,Math.abs(y.w)));g>1e-10&&(this.rotateAbout(n,y,a.p),l+=g*10)}else{let h=e.sign||1,d=o.n.clone().multiplyScalar((t.sideB,h)),u=new _t().setFromUnitVectors(a.n,d),f=2*Math.acos(Math.min(1,Math.abs(u.w)));f>1e-10&&(this.rotateAbout(n,u,a.p),l+=f*10,a=this.worldRef(i));let m=a.p.clone().sub(o.p),y=m.dot(o.n),p=m.clone().addScaledVector(o.n,-y).clone().negate();if(e.type==="insert"){let w=t.sideB?c:-c;p.addScaledVector(o.n,w-y)}p.length()>1e-10&&(n.pos=bt(n.pos).add(p).toArray(),l+=p.length())}return l}residual(e){let t=this.worldRef(e.a),n=this.worldRef(e.b),i=Na(e.offset);if(e.type==="mate"||e.type==="flush")return(e.type==="mate"?n.n.clone().add(t.n).length():n.n.clone().sub(t.n).length())+Math.abs(n.p.clone().sub(t.p).dot(t.n)-i);if(e.type==="angle"){let c=i*Math.PI/180;return Math.abs(Math.acos(Math.max(-1,Math.min(1,t.n.dot(n.n))))-c)}let r=n.n.clone().sub(t.n.clone().multiplyScalar(e.sign||1)).length(),o=n.p.clone().sub(t.p),a=o.dot(t.n),l=r+o.clone().addScaledVector(t.n,-a).length();return e.type==="insert"&&(l+=Math.abs(a-i)),l}ray(e){return this.vp.ray(e)}pick(e,t={faces:!0,edges:!1}){let n=this.ray(e),i=[...this.objs.values()].filter(a=>a.mesh.visible).map(a=>a.mesh),o=n.intersectObjects(i,!1)[0];if(t.edges){let a=[...this.objs.values()].filter(u=>u.mesh.visible).map(u=>u.edges),l=a.map(u=>u.visible);a.forEach(u=>u.visible=!0);let c=n.intersectObjects(a,!1);a.forEach((u,f)=>u.visible=l[f]);let h=this.vp.pixelSize()*8,d=c.find(u=>!o||u.distance<=o.distance+h);if(d){let u=d.object.userData.comp,f=this.geo.get(this.comp(u).part),m=Ly(f.desc,d.index);if(m>=0&&(!t.circleOnly||f.desc.edges[m].circle))return{kind:"edge",comp:u,index:m,point:d.point.toArray()}}}if(o&&t.faces){let a=o.object.userData.comp,l=this.geo.get(this.comp(a).part);return{kind:"face",comp:a,index:Dy(l.desc,o.faceIndex),point:o.point.toArray()}}return o?{kind:"comp",comp:o.object.userData.comp,point:o.point.toArray()}:null}highlight(e){this.vp.clearHighlights();for(let t of e){if(t.kind==="point"||t.kind==="segment"){this.vp.addHighlight(t);continue}let n=this.comp(t.comp||t.ref&&t.ref.comp);if(!n)continue;let i=this.geo.get(n.part);if(!i||!i.desc)continue;let r=this.matrixOf(n);if(t.kind==="face"){let[o,a]=i.desc.faceGroups[t.index]||[0,0],l=new Ye;l.setAttribute("position",i.geo.getAttribute("position")),l.setIndex(Array.from(i.desc.triangles.subarray(o,o+a)));let c=new lt(l,new Ft({color:t.color,transparent:!0,opacity:.6,side:xt,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));c.matrixAutoUpdate=!1,c.matrix.copy(r),this.vp.overlay.add(c)}else if(t.kind==="edge"){let[o,a]=i.desc.edgeGroups[t.index]||[0,0],l=[];for(let h=o;h<o+a;h++)l.push(new T(i.desc.lines[h*3],i.desc.lines[h*3+1],i.desc.lines[h*3+2]));let c=new nn(new Ye().setFromPoints(l),new Pt({color:t.color,depthTest:!1}));c.matrixAutoUpdate=!1,c.matrix.copy(r),c.renderOrder=10,this.vp.overlay.add(c)}else if(t.kind==="ref"){let o=this.worldRef(t.ref),a=Math.max(6,(t.ref.r||0)*2.4,this.vp.pixelSize()*40);if(t.ref.kind==="plane"){let u=new Vn(a,a),f=new lt(u,new Ft({color:t.color,transparent:!0,opacity:.45,side:xt,depthTest:!1}));f.position.copy(o.p),f.quaternion.setFromUnitVectors(new T(0,0,1),o.n),f.renderOrder=9,this.vp.overlay.add(f)}let l=a*.8,c=o.p.clone().addScaledVector(o.n,t.ref.kind==="axis"?-l:0),h=o.p.clone().addScaledVector(o.n,l),d=new nn(new Ye().setFromPoints([c,h]),new Pt({color:t.color,depthTest:!1}));d.renderOrder=10,this.vp.overlay.add(d),this.vp.addHighlight({kind:"point",point:o.p.toArray(),color:t.color})}}this.drawClashes(),this.vp.render()}drawClashes(){if(this.clashObj&&(this.vp.scene.remove(this.clashObj),this.clashObj.traverse(t=>t.geometry&&t.geometry.dispose()),this.clashObj=null),!this.clashes.length||!this.group.visible)return;let e=new Gt;for(let t of this.clashes){let n=new Ye;n.setAttribute("position",new at(t.vertices,3)),n.setIndex(new at(t.triangles,1));let i=new lt(n,new Ft({color:14692657,transparent:!0,opacity:.85,depthTest:!1,side:xt}));i.renderOrder=12;let r=1/(ln[this.asm.units||"mm"]||1);i.scale.setScalar(r),e.add(i)}this.clashObj=e,this.vp.scene.add(e)}onDown(e){if(e.button!==0||(this._down={x:e.clientX,y:e.clientY},this.app.cmd))return;let t=this.pick(e,{faces:!0});if(t){let n=this.comp(t.comp);if(!n.grounded){let i=new T;this.vp.camera.getWorldDirection(i),this._drag={id:n.id,plane:new Nt().setFromNormalAndCoplanarPoint(i,bt(t.point)),last:bt(t.point),moved:!1},this.app.beginChange(),this.vp.controls.enabled=!1}}}onMove(e){if(this._drag){let o=this.ray(e),a=new T;if(!o.ray.intersectPlane(this._drag.plane,a))return;let l=a.clone().sub(this._drag.last);this._drag.last=a;let c=this.comp(this._drag.id);c.pos=bt(c.pos).add(l).toArray(),this._drag.moved=!0,this._dragging=c.id,this.solve(40),this._dragging=null,this.solve(40),this.render();return}let t=this.app.cmd,n=t&&t.want?t.want:{faces:!0},i=this.pick(e,n),r=i?i.comp+i.kind+(i.index??""):"";r!==(this.hover?this.hover.key:"")&&(this.hover=i?{...i,key:r}:null,this.vp.renderer.domElement.style.cursor=i?t?"pointer":"grab":"default",this.render(),this.refreshHighlights())}onUp(e){if(e.button!==0)return;let t=this._down;if(this._down=null,this._drag){let r=this._drag.moved;if(this._drag=null,this.vp.controls.enabled=!0,r){this.app.endChange();return}this.app.abortChange()}if(!t||Math.hypot(e.clientX-t.x,e.clientY-t.y)>5)return;let n=this.app.cmd;if(n&&n.onPick){n.onPick(this.pick(e,n.want||{faces:!0}),e);return}let i=this.pick(e,{faces:!0});this.sel=i?i.comp:null,this.render(),this.app.ui.renderTree(),i&&this.app.status(`${this.comp(i.comp).name}: drag to move it, double-click it in the tree to edit the part. ${this.comp(i.comp).grounded?"It is grounded (fixed in place).":""}`)}refreshHighlights(){let e=[],t=this.app.cmd;t&&t.highlights&&e.push(...t.highlights());let n=this.hover;n&&t&&t.want&&(n.kind==="face"?e.push({kind:"face",comp:n.comp,index:n.index,color:3065014}):n.kind==="edge"&&e.push({kind:"edge",comp:n.comp,index:n.index,color:16747546})),this.highlight(e)}newId(e){let t=e+this.asm.nextId;return this.asm.nextId++,t}uniqueName(e){let t=1,n=new Set([...this.asm.components.map(i=>i.name),...this.asm.constraints.map(i=>i.name)]);for(;n.has(`${e}:${t}`);)t++;return`${e}:${t}`}freeSpot(){let e=new fn;for(let t of this.objs.values())e.expandByObject(t.mesh);return e.isEmpty()?[0,0,0]:[It(e.max.x+20),It((e.min.y+e.max.y)/2),It(e.min.z)]}addPart(e,t={}){let n=t.pid||this.newId("p"),i=t.pid?this.asm.parts[n]:Ku(e);return t.pid||delete i.kind,this.app.change(()=>{t.pid||(this.asm.parts[n]=i);let r=!this.asm.components.length,o={id:this.newId("c"),name:this.uniqueName(i.name||"Part"),part:n,pos:r?[0,0,0]:this.freeSpot(),quat:[0,0,0,1],grounded:r,hidden:!1};this.asm.components.push(o),this.sel=o.id}),n}deleteComp(e){let t=this.comp(e),n=this.asm.constraints.filter(i=>i.a.comp===e||i.b.comp===e);n.length&&!confirm(`Removing ${t.name} also removes ${n.length} constraint(s) on it. Go ahead?`)||(this.app.change(()=>{this.asm.components=this.asm.components.filter(i=>i.id!==e),this.asm.constraints=this.asm.constraints.filter(i=>i.a.comp!==e&&i.b.comp!==e),this.asm.components.some(i=>i.part===t.part)||delete this.asm.parts[t.part]}),this.sel===e&&(this.sel=null))}rotateComp(e,t,n){let i=this.comp(e);if(!i)return;let r=this.objs.get(e),a=new fn().expandByObject(r.mesh).getCenter(new T),l=new _t().setFromAxisAngle(bt(t==="X"?[1,0,0]:t==="Y"?[0,1,0]:[0,0,1]),n*Math.PI/180);this.app.change(()=>{this.rotateAbout(i,l,a)})}renderTree(e){let t=this.asm,n=`<div class="trow root">${Qe("assembly",16)}<b>${Dt(t.name)}</b></div>`;n+=`<div class="trow sub groupHead">${Qe("part",16)}<span>Parts placed (${t.components.length})</span></div>`,t.components.length||(n+='<div class="tempty">Use <b>Place</b> on the Assemble tab to bring in a part.</div>');for(let i of t.components){let r=this.geo.get(i.part),o=r&&Object.keys(r.errors||{}).length,a=["trow","feat","comp",this.sel===i.id?"sel":"",i.hidden?"supp":"",o?"bad":""].join(" ");n+=`<div class="${a}" data-comp="${i.id}" title="Click to pick. Double-click to edit the part. Right-click for more.">${Qe("part",16)}<span class="tname">${Dt(i.name)}</span>${i.grounded?`<span class="tpin" title="Grounded: fixed in place">${Qe("pin",13)}</span>`:""}${o?`<span class="tbad">${Qe("err",14)}</span>`:""}</div>`}n+=`<div class="trow sub groupHead">${Qe("mate",16)}<span>Constraints (${t.constraints.length})</span></div>`;for(let i of t.constraints){let r=this.comp(i.a.comp),o=this.comp(i.b.comp),a=this.bad[i.id]!=null||i.a.lost||i.b.lost,l=["trow","feat","con",i.suppressed?"supp":"",a?"bad":"",this.selCon===i.id?"sel":""].join(" "),c=i.a.lost||i.b.lost?"A face or edge it used is gone after a part change. Delete it and add it again.":a?"This constraint cannot be met together with the others. Check the offsets, flip it, or remove one.":"Double-click to change. Right-click for more.";n+=`<div class="${l}" data-con="${i.id}" title="${Dt(c)}">${Qe(li[i.type].icon,16)}<span class="tname">${Dt(i.name)}</span><span class="tmeta">${Dt(r?r.name:"?")} \u2194 ${Dt(o?o.name:"?")}</span>${a?`<span class="tbad">${Qe("err",14)}</span>`:""}</div>`}e.innerHTML=n;for(let i of e.querySelectorAll("[data-comp]")){let r=i.dataset.comp;i.onclick=o=>{o.stopPropagation(),this.sel=r,this.selCon=null,this.render(),this.renderTree(e)},i.ondblclick=o=>{o.stopPropagation(),this.app.editPart(this.comp(r).part)},i.oncontextmenu=o=>{o.preventDefault(),o.stopPropagation(),this.sel=r,this.render(),this.renderTree(e),this.compMenu(r,o.clientX,o.clientY)}}for(let i of e.querySelectorAll("[data-con]")){let r=i.dataset.con;i.onclick=o=>{o.stopPropagation(),this.selCon=r,this.renderTree(e);let a=t.constraints.find(l=>l.id===r);this.highlight([{kind:"ref",ref:a.a,color:1809066},{kind:"ref",ref:a.b,color:15227148}])},i.ondblclick=o=>{o.stopPropagation(),this.app.run("constrain",{edit:r})},i.oncontextmenu=o=>{o.preventDefault(),o.stopPropagation(),this.conMenu(r,o.clientX,o.clientY)}}}compMenu(e,t,n){let i=this.comp(e),r=this.app.ui;r.menu([["Edit part",()=>this.app.editPart(i.part)],["Move / turn",()=>this.app.run("moveComp",{id:e})],["Rename",()=>r.askText("Rename",i.name,o=>this.app.change(()=>{this.comp(e).name=o}))],[i.grounded?"Unground (let it move)":"Ground (fix in place)",()=>this.app.change(()=>{this.comp(e).grounded=!this.comp(e).grounded})],[i.hidden?"Show":"Hide",()=>this.app.change(()=>{this.comp(e).hidden=!this.comp(e).hidden})],["Place another copy",()=>{this.addPart(null,{pid:i.part})}],["Remove",()=>this.deleteComp(e),"danger"]],t,n)}conMenu(e,t,n){let i=this.asm.constraints.find(r=>r.id===e);this.app.ui.menu([["Edit",()=>this.app.run("constrain",{edit:e})],["Flip",()=>this.app.change(()=>{let r=this.asm.constraints.find(o=>o.id===e);r.type==="mate"||r.type==="flush"?r.type=r.type==="mate"?"flush":"mate":r.sign=-(r.sign||1)})],[i.suppressed?"Turn on":"Turn off (suppress)",()=>this.app.change(()=>{let r=this.asm.constraints.find(o=>o.id===e);r.suppressed=!r.suppressed})],["Delete",()=>this.app.change(()=>{this.asm.constraints=this.asm.constraints.filter(r=>r.id!==e)}),"danger"]],t,n)}openPartsList(){let e=this.asm,t=this.app.materials,n=new Map;for(let a of e.components){let l=n.get(a.part)||{pid:a.part,qty:0};l.qty++,n.set(a.part,l)}let i=0,r=0,o=[...n.values()].map(a=>{r++;let l=e.parts[a.pid],c=this.geo.get(a.pid),h=t[l.material]||t.pla,d=ln[l.units||"mm"],u=c&&c.desc?c.desc.volume*d*d*d/1e3*h.density:0;i+=u*a.qty;let f=c&&c.desc?c.desc.bb[1].map((m,y)=>Me(m-c.desc.bb[0][y])).join(" \xD7 ")+" "+(l.units||"mm"):"";return`<tr><td>${r}</td><td><b>${Dt(l.name)}</b></td><td>${a.qty}</td><td>${Dt(h.name)}</td><td>${Dt(f)}</td><td>${vc(u)}</td><td>${vc(u*a.qty)}</td></tr>`}).join("");this.app.ui.modal(`<h2>${Qe("bom",22)} Parts list: ${Dt(e.name)}</h2>
      <table class="ptable bom"><thead><tr><th>#</th><th>Part</th><th>Qty</th><th>Material</th><th>Size</th><th>Mass each</th><th>Mass total</th></tr></thead><tbody>${o||'<tr><td colspan="7" class="muted">No parts yet.</td></tr>'}</tbody></table>
      <p><b>Total mass: ${vc(i)}</b> \xB7 ${e.components.length} parts placed, ${n.size} different</p>
      <p><button id="bomCsv">Download as a spreadsheet (.csv)</button></p>`,"wide"),Ua("#bomCsv").onclick=()=>{let a=[["Item","Part","Qty","Material","Mass each (g)"]],l=0;for(let c of n.values()){l++;let h=e.parts[c.pid],d=this.geo.get(c.pid),u=t[h.material]||t.pla,f=ln[h.units||"mm"];a.push([l,h.name,c.qty,u.name,d&&d.desc?(d.desc.volume*f*f*f/1e3*u.density).toFixed(2):""])}this.app.download(this.app.safeName()+" parts list.csv",a.map(c=>c.map(h=>`"${String(h).replace(/"/g,'""')}"`).join(",")).join(`\r
`),"text/csv")}}async checkInterference(){let e=this.asm;if(e.components.length<2)return this.app.toast("Place at least two parts first.");this.app.toast("Checking where parts overlap\u2026");let t=e.components.filter(a=>!a.hidden).map(a=>({id:a.id,part:a.part,pos:a.pos.map(l=>l*ln[e.units||"mm"]),quat:a.quat})),n=await this.app.send({type:"interference",parts:e.parts,comps:t,scale:1});if(n.type==="error")return this.app.toast("Check failed: "+n.msg,"error");this.clashes=n.found,this.render();let i=e.units||"mm",r=ln[i],o=n.found.map(a=>`<li><b>${Dt(this.comp(a.a).name)}</b> and <b>${Dt(this.comp(a.b).name)}</b> overlap by ${Me(a.volume/(r*r*r))} ${i}\xB3</li>`).join("");this.app.ui.modal(`<h2>${Qe("clash",22)} Interference check</h2>${n.found.length?`<p>These parts run into each other. The overlap is shown in <b style="color:#e03131">red</b>. Real parts could not be put together like this.</p><ul>${o}</ul>`:'<p class="good"><b>\u2714 No parts overlap.</b> Everything fits.</p>'}<p class="muted">Touching faces (a mate with no gap) do not count as overlap.</p><div class="welcomebtns"><button id="clashClear">Clear the red marks</button></div>`,"",null),Ua("#clashClear").onclick=()=>{this.clashes=[],this.render(),this.app.ui.closeModal()}}};function vc(s){return s>=1e3?Me(s/1e3)+" kg":Me(s)+" g"}function Dy(s,e){let t=e*3,n=s.faceGroups;for(let i=0;i<n.length;i++)if(t>=n[i][0]&&t<n[i][0]+n[i][1])return i;return-1}function Ly(s,e){let t=s.edgeGroups;for(let n=0;n<t.length;n++)if(e>=t[n][0]&&e<t[n][0]+t[n][1])return n;return-1}var ju={place(s){return s.asmr.placeDialog(),null},constrain(s,e){let t=s.asmr,n=s.asm;if(n.components.length<2)return s.toast("Place at least two parts first.","error"),null;let i,r=null;e&&e.edit?(r=n.constraints.findIndex(d=>d.id===e.edit),i=Ku(n.constraints[r])):i={id:t.newId("k"),type:e&&e.type||"mate",name:"",a:null,b:null,offset:0,sign:1};let o=JSON.stringify(n.components),a=()=>{let d=JSON.parse(o);for(let u of n.components){let f=d.find(m=>m.id===u.id);f&&(u.pos=f.pos,u.quat=f.quat)}},l=()=>{let d=li[i.type].want;return d==="plane"?{faces:!0}:d==="circle"?{edges:!0,circleOnly:!0}:{faces:!0,edges:!0,circleOnly:!0}},c=()=>{if(a(),i.a&&i.b){let d=n.constraints;n.constraints=d.filter(u=>u.id!==i.id).concat([i]),t.solve(),n.constraints=d}t.render(),s.refreshHighlights()};return{title:r!=null?"Edit "+i.name:"Constrain",get help(){return li[i.type].help},noPreviewBuild:!0,get want(){return l()},fields:()=>[{key:"type",label:"Type",type:"select",options:Object.entries(li).map(([d,u])=>[d,u.label]),onChange:()=>{i.a=null,i.b=null,i.hinge=null,a(),t.render()}},{type:"html",html:`<div class="picks"><div class="${i.a?"done":"now"}"><b>1</b> ${i.a?Dt(t.comp(i.a.comp).name+": "+i.a.label):"Click a "+bc(i.type)+" on the part that stays put"}</div><div class="${i.b?"done":i.a?"now":""}"><b>2</b> ${i.b?Dt(t.comp(i.b.comp).name+": "+i.b.label):"Click a "+bc(i.type)+" on the part to move"}</div></div>`},{key:"offset",label:i.type==="angle"?"Angle (\xB0)":`Offset / gap (${n.units||"mm"})`,type:"expr"},i.type==="insert"||i.type==="axis"?{type:"buttons",items:[["Flip direction",()=>{i.sign=-(i.sign||1),c(),s.ui.refreshCmd()}]]}:i.type!=="angle"?{type:"buttons",items:[[i.type==="mate"?"Flip (make it Flush)":"Flip (make it Mate)",()=>{i.type=i.type==="mate"?"flush":"mate",c(),s.ui.refreshCmd()}]]}:null,i.a||i.b?{type:"buttons",items:[["Pick again",()=>{i.a=null,i.b=null,i.hinge=null,a(),t.render(),s.ui.refreshCmd(),s.refreshHighlights()}]]}:null].filter(Boolean),target:i,onField:()=>c(),onPick(d){if(!d)return;let u=t.refFromHit(d,li[i.type].want);if(!u){s.toast(`Pick a ${bc(i.type)}.`,"error");return}if(!i.a)i.a=u;else{if(i.b)return;if(u.comp===i.a.comp){s.toast("Pick the second one on a different part.","error");return}if(i.b=u,i.type==="insert"||i.type==="axis"){let f=t.worldRef(i.a),m=t.worldRef(i.b);i.sign=f.n.dot(m.n)>=0?1:-1,i.type==="insert"&&(i.sign=-1)}i.type==="angle"&&!Na(i.offset)&&(i.offset=90)}s.ui.refreshCmd(),c()},highlights:()=>[i.a&&{kind:"ref",ref:i.a,color:1809066},i.b&&{kind:"ref",ref:i.b,color:15227148}].filter(Boolean),validate:()=>!i.a||!i.b?"Pick both parts first.":null,ok(){if(a(),!i.name){let d=1;for(;n.constraints.some(u=>u.name===li[i.type].label+d);)d++;i.name=li[i.type].label+d}s.change(()=>{r!=null?n.constraints[r]=i:n.constraints.push(i),t.solve()}),t.bad[i.id]!=null&&s.toast(`${i.name} cannot be met together with the other constraints. Try Flip, a different offset, or unground a part.`,"error")},cancel(){a(),t.render()}}},moveComp(s,e){let t=s.asmr,n=e&&e.id||t.sel,i=n&&t.comp(n);if(!i)return s.toast("Click a part first, then Move.","error"),null;let r=s.asm.units||"mm",o={x:i.pos[0],y:i.pos[1],z:i.pos[2]},a=(l,c)=>{t.rotateComp(i.id,l,c),Object.assign(o,{x:i.pos[0],y:i.pos[1],z:i.pos[2]}),s.ui.refreshCmd()};return{title:"Move "+i.name,help:"Turn the part in 90\xB0 steps or type where it goes. Constraints still apply, so a constrained part may snap back.",noOk:!0,closeLabel:"Done",target:o,fields:()=>[{type:"buttons",label:"Turn 90\xB0 around",items:[["X",()=>a("X",90)],["Y",()=>a("Y",90)],["Z",()=>a("Z",90)],["\u2212X",()=>a("X",-90)],["\u2212Y",()=>a("Y",-90)],["\u2212Z",()=>a("Z",-90)]]},{key:"x",label:`Position X (${r})`,type:"expr"},{key:"y",label:`Position Y (${r})`,type:"expr"},{key:"z",label:`Position Z (${r})`,type:"expr"},{type:"note",text:i.grounded?"This part is grounded (fixed). Moving it moves everything constrained to it.":"Tip: you can also drag a part with the left mouse button."}],onField:()=>{let l=[o.x,o.y,o.z].map(Na);l.some(c=>!Number.isFinite(c))||s.change(()=>{i.pos=l,t.solve()})},highlights:()=>[]}},measure(s){let e=s.asmr,t=[],n="Click a spot on a part, then a second spot. Click a round edge to see its diameter.",i=s.asm.units||"mm";return{title:"Measure",help:"Straight-line distance between two clicked points.",want:{faces:!0,edges:!0},noOk:!0,closeLabel:"Done",fields:()=>[{type:"html",html:n}],onPick(r){if(!r)return;let o="";if(r.kind==="edge"){let c=e.refFromHit(r,"circle");c&&(o=`Round edge: <b>\xD8 ${Me(2*c.r*e.scaleOf(e.comp(r.comp).part))} ${i}</b>`)}t.length>=2&&(t.length=0),t.push(r.point);let a=t[0],l=t[1];n=t.length===1?`First point picked.<br>${o}<br>Now click a second point.`:`Distance: <b class="big">${Me(Math.hypot(l[0]-a[0],l[1]-a[1],l[2]-a[2]))} ${i}</b><br>X: ${Me(Math.abs(l[0]-a[0]))} &nbsp; Y: ${Me(Math.abs(l[1]-a[1]))} &nbsp; Z: ${Me(Math.abs(l[2]-a[2]))}<br>${o}`,s.ui.refreshCmd(),s.refreshHighlights()},highlights:()=>[...t.map(r=>({kind:"point",point:r,color:15227148})),...t.length===2?[{kind:"segment",points:t,color:15227148}]:[]]}}};function bc(s){let e=li[s].want;return e==="plane"?"flat face":e==="circle"?"round edge":"round edge or round face"}vr.prototype.placeDialog=function(){let s=this.app,e=this.asm,t=[...new Set(e.components.map(n=>n.part))];s.ui.modal(`<h2>${Qe("place",22)} Place a part</h2>
    <div class="excards">
      <button class="excard" id="plFile"><b>From a part file\u2026</b><span>Pick a .pcad file you saved.</span></button>
      <button class="excard" id="plNew"><b>New part</b><span>Start an empty part inside this assembly and design it here.</span></button>
      ${t.map(n=>`<button class="excard" data-copy="${n}"><b>Another ${Dt(this.partName(n))}</b><span>A copy of a part already here (both change together).</span></button>`).join("")}
      ${ai.map((n,i)=>`<button class="excard" data-ex="${i}"><b>Example: ${Dt(n.title)}</b><span>${Dt(n.about.split(".")[0])}.</span></button>`).join("")}
    </div>`,"wide"),Ua("#plFile").onclick=()=>{let n=document.createElement("input");n.type="file",n.accept=".pcad,.json",n.multiple=!0,n.onchange=async()=>{for(let i of n.files)try{let r=JSON.parse(await i.text());if(!r||!Array.isArray(r.features))throw new Error(i.name+" is not a Pathway CAD part file");this.addPart(r)}catch(r){s.toast("Could not place: "+r.message,"error")}s.ui.closeModal()},n.click()},Ua("#plNew").onclick=()=>{s.ui.closeModal();let n=s.blankPart(),i=1;for(;Object.values(e.parts).some(o=>o.name==="Part"+i);)i++;n.name="Part"+i,n.units=e.units||"mm";let r=this.addPart(n);s.editPart(r)};for(let n of document.querySelectorAll("#modal [data-copy]"))n.onclick=()=>{s.ui.closeModal(),this.addPart(null,{pid:n.dataset.copy})};for(let n of document.querySelectorAll("#modal [data-ex]"))n.onclick=()=>{s.ui.closeModal(),this.addPart(ai[+n.dataset.ex].doc)}};var Re=(s,e=document)=>e.querySelector(s),Ce=s=>String(s).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Sc=s=>JSON.parse(JSON.stringify(s)),$t=s=>Math.round(s*1e3)/1e3,Qu="pathwaycad.autosave.v1",Ba={pla:{name:"PLA plastic (3D print)",density:1.24},petg:{name:"PETG plastic (3D print)",density:1.27},abs:{name:"ABS plastic",density:1.04},acrylic:{name:"Acrylic",density:1.18},oak:{name:"Oak wood",density:.75},pine:{name:"Pine wood",density:.5},aluminum:{name:"Aluminum 6061",density:2.7},steel:{name:"Mild steel",density:7.85},stainless:{name:"Stainless steel",density:8},brass:{name:"Brass",density:8.5},copper:{name:"Copper",density:8.96}},Ec={sketch:{icon:"sketch",label:"Sketch"},extrude:{icon:"extrude",label:"Extrusion"},revolve:{icon:"revolve",label:"Revolution"},hole:{icon:"hole",label:"Hole"},primitive:{icon:"primitive",label:"Shape"},fillet:{icon:"fillet",label:"Fillet"},chamfer:{icon:"chamfer",label:"Chamfer"},shell:{icon:"shell",label:"Shell"},pattern:{icon:"pattern",label:"Pattern"},mirrorBody:{icon:"mirrorBody",label:"Mirror Part"}},Mc=[["join","Add material (join)"],["cut","Remove material (cut)"],["intersect","Keep only the overlap"]],Oa=[["X","X axis (red)"],["Y","Y axis (green)"],["Z","Z axis (blue)"]],ed=[["YZ","YZ plane (flip left/right)"],["XZ","XZ plane (flip front/back)"],["XY","XY plane (flip up/down)"]];function Ui(){return{app:"Pathway CAD",version:1,name:"Part1",units:"mm",material:"pla",color:"#8fb3c9",params:[],features:[],rollback:null,nextId:1}}var wc=class{constructor(){this.doc=Ui(),this.undoStack=[],this.redoStack=[],this.mode="model",this.cmd=null,this.result={errors:{},warnings:{}},this.buildId=0,this.pending=new Map,this.ui=new Tc(this),this.vp=new Ca(Re("#view3d")),this.sk=new ka(this),this.asm=null,this.editPid=null,this.materials=Ba,this.asmr=new vr(this),this.vp.onStyle=()=>this.mode==="assembly"&&this.asmr.render(),this.startKernel(),this.bindViewportPicking(),this.ui.renderRibbon(),this.restore(),this.vp.setView("home"),window.addEventListener("keydown",e=>this.onKey(e)),window.addEventListener("beforeunload",()=>this.autosave())}startKernel(){this.ready=!1,this.worker=new Worker("worker.js",{type:"module"}),this.worker.onmessage=e=>this.onKernel(e.data),this.worker.onerror=e=>{this.ui.loading(`The modeling engine failed to start: ${e.message||"unknown error"}`,!0)}}onKernel(e){if(e.type==="ready"){this.ready=!0,this.ui.loading(null),this.status("Ready. Pick a tool from the ribbon, or right-drag to turn the view."),this.rebuild();return}if(e.type==="fatal"){this.ui.loading("The modeling engine failed to start: "+e.msg,!0);return}let t=this.pending.get(e.id);t&&(this.pending.delete(e.id),t(e))}send(e){return new Promise(t=>{let n=++this.buildId;this.pending.set(n,t),this.worker.postMessage({...e,id:n})})}buildPlan(){let e=this.doc,t=e.rollback??e.features.length;if(this.mode==="sketch"){let n=e.features.findIndex(i=>i.id===this.sketchId);return{doc:e,stopAt:n+1}}if(this.cmd&&this.cmd.feature){let n=this.cmd,i={...e,features:[...e.features]},r;n.editIndex!=null?(r=n.editIndex,i.features[r]=n.feature):(r=t,i.features.splice(r,0,n.feature));let o=n.picksOnBase&&!n.preview;return{doc:i,stopAt:o?r:r+1,previewId:n.feature.id}}return{doc:e,stopAt:t}}rebuild(){if(this.ready){if(this.mode==="assembly"){this.asmr.rebuild();return}clearTimeout(this._rb),this._rb=setTimeout(async()=>{let e=this.buildPlan(),t=++this._ticket||(this._ticket=1);this.ui.busy(!0);let n=await this.send({type:"rebuild",doc:e.doc,stopAt:e.stopAt});if(t!==this._ticket)return;if(this.ui.busy(!1),n.type==="error"){this.toast("Rebuild failed: "+n.msg,"error");return}this.planes={...this.planes||{},...n.planes||{}},this.result={errors:n.errors,warnings:n.warnings,desc:n.desc,ms:n.ms,previewId:e.previewId};let i=!this.vp.desc&&n.desc;this.vp.setPart(n.desc),i&&this.mode!=="sketch"&&!this._fittedOnce&&(this._fittedOnce=!0,this.vp.fit()),this.refreshHighlights(),this.ui.renderTree(),this.ui.renderStatusInfo(),this.cmd&&this.cmd.onRebuilt&&this.cmd.onRebuilt(),e.previewId&&n.errors[e.previewId]?this.ui.cmdError(n.errors[e.previewId]):this.cmd&&this.ui.cmdError(null),this.ui.infoOpen&&this.ui.renderInfo()},40)}}params(){return Hu(this.doc)}newId(e="f"){let t=e+this.doc.nextId;return this.doc.nextId++,t}get root(){return this.asm||this.doc}snapshot(){return JSON.stringify(this.root)}change(e){let t=this.snapshot();e(),this.snapshot()!==t&&(this.undoStack.push(t),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]),this.changed()}beginChange(){this._began=this.snapshot()}endChange(){this._began&&this._began!==this.snapshot()&&(this.undoStack.push(this._began),this.redoStack=[]),this._began=null,this.changed()}abortChange(){this._began=null}changed(){this.dirty=!0,clearTimeout(this._as),this._as=setTimeout(()=>this.autosave(),800),this.mode==="sketch"&&this.sk.recompute(),this.rebuild(),this.ui.renderTree(),this.ui.renderTitle()}undo(){if(this.cmd){this.cancelCmd();return}if(!this.undoStack.length)return this.toast("Nothing to undo");this.redoStack.push(this.snapshot()),this.loadState(this.undoStack.pop())}redo(){if(!this.redoStack.length)return this.toast("Nothing to redo");this.undoStack.push(this.snapshot()),this.loadState(this.redoStack.pop())}loadState(e){let t=JSON.parse(e);if(t.kind==="assembly"){if(this.asm=t,this.editPid&&!t.parts[this.editPid]&&this.returnToAssembly(),this.editPid&&(this.doc=t.parts[this.editPid]),this.mode==="assembly"){this.changed();return}}else this.doc=t;this.mode==="sketch"&&!this.sketchFeature()&&this.exitSketch(!0),this.mode==="sketch"&&(this.sk.sel=new Set([...this.sk.sel].filter(n=>this.sketchFeature().entities.some(i=>i.id===n))),this.sk.recompute(),this.sk.redraw(),this.ui.sketchSelection()),this.vp.setColor(this.doc.color),this.changed()}autosave(){try{localStorage.setItem(Qu,this.snapshot())}catch{}}restore(){let e=null;try{e=localStorage.getItem(Qu)}catch{}if(e)try{let t=JSON.parse(e);if(t&&t.kind==="assembly"){this.openAssembly(t),this.toast("Opened your last assembly. Use File > New for a fresh one.");return}if(t&&t.features&&t.features.length){this.setDoc(t,!0),this.toast("Opened your last part. Use File > New for a fresh one.");return}}catch{}this.setDoc(Ui(),!0),this.ui.showWelcome()}setDoc(e,t){this.mode==="sketch"&&this.exitSketch(!0),this.cmd&&this.cancelCmd(),this.leaveAssembly();let n=Ui();this.doc={...n,...e},(!this.doc.nextId||this.doc.nextId<2)&&(this.doc.nextId=1e3),this.undoStack=[],this.redoStack=[],this.vp.setColor(this.doc.color),this._fittedOnce=!1,this.vp.desc=null,this.ui.renderTitle(),this.ui.renderTree(),this.rebuild(),t||this.vp.setView("home")}units(){return(this.mode==="assembly"?this.asm.units:this.doc.units)||"mm"}blankPart(){return Ui()}leaveAssembly(){this.asm=null,this.editPid=null,this.mode==="assembly"&&(this.mode="model"),this.asmr.show(!1),this.asmr.clashes=[],this.vp.fitOverride=null,this.ui.renderRibbon()}openAssembly(e){this.mode==="sketch"&&this.exitSketch(!0),this.cmd&&this.cancelCmd(),this.asm={...Fa(),...e},this.editPid=null,this.doc=Ui(),this.mode="assembly",this.undoStack=[],this.redoStack=[],this.asmr.sel=null,this.asmr.clashes=[],this.asmr._fitted=!1,this.asmr.show(!0),this.vp.fitOverride=()=>this.asmr.fit(),this.ui.tab="assemble",this.ui.renderRibbon(),this.ui.renderTitle(),this.ui.renderTree(),this.rebuild(),this.vp.setView("home")}newAssemblyFile(){this.root&&(this.root.features&&this.root.features.length||this.root.components&&this.root.components.length)&&!confirm("Start a new assembly? Save first if you want to keep what is open (File > Save).")||(this.openAssembly(Fa()),this.asmr.placeDialog())}editPart(e){!this.asm||!this.asm.parts[e]||(this.cmd&&this.cancelCmd(),this.editPid=e,this.mode="model",this.doc=this.asm.parts[e],this.asmr.show(!1),this.vp.fitOverride=null,this.vp.setColor(this.doc.color),this.vp.desc=null,this._fittedOnce=!1,this.ui.tab="model",this.ui.renderRibbon(),this.ui.renderTitle(),this.ui.renderTree(),this.rebuild(),this.vp.setView("home"),this.toast(`Editing ${this.doc.name}. Press "Back to assembly" when done.`))}returnToAssembly(){this.asm&&(this.mode==="sketch"&&this.exitSketch(!0),this.cmd&&this.cancelCmd(),this.editPid=null,this.mode="assembly",this.doc=Ui(),this.vp.setPart(null),this.asmr.show(!0),this.vp.fitOverride=()=>this.asmr.fit(),this.ui.tab="assemble",this.ui.renderRibbon(),this.ui.renderTitle(),this.ui.renderTree(),this.rebuild())}findFeature(e){return this.doc.features.find(t=>t.id===e)}featureIndex(e){return this.doc.features.findIndex(t=>t.id===e)}sketchFeature(){return this.findFeature(this.sketchId)}nextName(e){let t=e==="primitive"?"Shape":Ec[e].label,n=1;for(;this.doc.features.some(i=>i.name===t+n);)n++;return t+n}insertFeature(e){let t=this.doc.rollback??this.doc.features.length;this.doc.features.splice(t,0,e),this.doc.rollback!=null&&this.doc.rollback++}dependents(e){let t=new Set([e]),n=!0;for(;n;){n=!1;for(let i of this.doc.features){if(t.has(i.id))continue;[i.sketch,...i.features||[]].some(o=>t.has(o))&&(t.add(i.id),n=!0)}}return t}deleteFeature(e){let t=this.dependents(e),n=this.findFeature(e);if(t.size>1){let i=this.doc.features.filter(r=>t.has(r.id)&&r.id!==e).map(r=>r.name).join(", ");if(!confirm(`Deleting ${n.name} also deletes what uses it: ${i}. Go ahead?`))return}this.change(()=>{let i=this.doc.features.length,r=this.doc.rollback;if(r!=null){let o=this.doc.features.slice(0,r).filter(a=>t.has(a.id)).length;this.doc.rollback=r-o}this.doc.features=this.doc.features.filter(o=>!t.has(o.id)),this.doc.rollback!=null&&this.doc.rollback>=this.doc.features.length&&(this.doc.rollback=null)})}status(e){this.ui.status(e)}toast(e,t){this.ui.toast(e,t)}onKey(e){let t=e.target&&e.target.tagName||"",n=t==="INPUT"||t==="TEXTAREA"||t==="SELECT",i=e.key.toLowerCase();if((e.ctrlKey||e.metaKey)&&i==="z"&&!n){e.preventDefault(),e.shiftKey?this.redo():this.undo();return}if((e.ctrlKey||e.metaKey)&&i==="y"&&!n){e.preventDefault(),this.redo();return}if((e.ctrlKey||e.metaKey)&&i==="s"){e.preventDefault(),this.saveFile();return}if((e.ctrlKey||e.metaKey)&&i==="o"){e.preventDefault(),this.openFile();return}if(n){e.key==="Enter"&&this.cmd&&t!=="TEXTAREA"&&t!=="SELECT"&&(e.target.blur(),setTimeout(()=>this.okCmd(),60));return}if(this.ui.modalOpen()){e.key==="Escape"&&this.ui.closeModal();return}if(this.mode==="assembly"){if(e.key==="Escape"){this.cmd?this.cancelCmd():(this.asmr.sel=null,this.asmr.render(),this.ui.renderTree());return}if(e.key==="Enter"&&this.cmd){this.okCmd();return}if((e.key==="Delete"||e.key==="Backspace")&&!this.cmd&&this.asmr.sel){e.preventDefault(),this.asmr.deleteComp(this.asmr.sel);return}if(e.ctrlKey||e.metaKey||e.altKey||this.cmd)return;let o={p:"place",c:"constrain",m:"measure",g:"moveComp"};o[i]&&this.run(o[i]),e.key==="F6"&&this.vp.setView("home");return}if(e.key==="Escape"){this.mode==="sketch"?this.sk.temp.length||this.sk.tool!=="select"?this.sk.cancelTemp():this.sk.sel.size&&(this.sk.sel.clear(),this.sk.redraw(),this.ui.sketchSelection()):this.cmd&&this.cancelCmd();return}if(e.key==="Enter"&&this.cmd){this.okCmd();return}if(e.key==="Delete"||e.key==="Backspace"){this.mode==="sketch"?(e.preventDefault(),this.sk.deleteSelected()):!this.cmd&&this.ui.treeSel&&(e.preventDefault(),this.deleteFeature(this.ui.treeSel));return}if(e.ctrlKey||e.metaKey||e.altKey)return;if(this.mode==="sketch"){let o={l:"line",r:"rect",c:"circle",a:"arc",p:"polygon",o:"slot",s:"select"};o[i]&&this.sk.setTool(o[i]),i==="g"&&this.toggleGrid(),i==="x"&&this.sk.toggleConstruction();return}if(this.cmd)return;let r={s:"sketch",e:"extrude",r:"revolve",h:"hole",f:"fillet",m:"measure"};r[i]&&this.run(r[i]),e.key==="F6"&&this.vp.setView("home")}bindViewportPicking(){let e=this.vp.renderer.domElement,t=null;e.addEventListener("pointerdown",n=>{if(this.mode==="assembly")return this.asmr.onDown(n);n.button===0&&(t=[n.clientX,n.clientY])}),e.addEventListener("pointermove",n=>{if(this.mode==="assembly")return this.asmr.onMove(n);if(this.mode==="sketch")return;let i=this.pickWant();if(!i){this.hoverPick&&(this.hoverPick=null,this.refreshHighlights());return}let r=this.vp.pick(n,i),o=r?r.kind+(r.index??r.name):"";o!==(this.hoverPick?this.hoverPick.key:"")&&(this.hoverPick=r?{...r,key:o}:null,this.refreshHighlights(),e.style.cursor=r?"pointer":"default")}),e.addEventListener("pointerup",n=>{if(this.mode==="assembly")return this.asmr.onUp(n);if(n.button!==0||!t||this.mode==="sketch")return;let i=Math.hypot(n.clientX-t[0],n.clientY-t[1]);if(t=null,i>5)return;let r=this.pickWant();if(!r)return;let o=this.vp.pick(n,r);this.cmd&&this.cmd.onPick&&this.cmd.onPick(o,n)})}pickWant(){return!this.cmd||!this.cmd.want||this.cmd.picksOnBase&&this.cmd.preview?null:this.cmd.want}refreshHighlights(){if(this.mode==="assembly"){this.asmr.refreshHighlights();return}let e=[];if(this.cmd&&this.cmd.highlights&&e.push(...this.cmd.highlights()),this.hoverPick){let t=this.hoverPick;t.kind==="face"?e.push({kind:"face",index:t.index,color:on.hoverFace}):t.kind==="edge"?e.push({kind:"edge",index:t.index,color:on.hoverEdge}):t.kind==="plane"&&e.push({kind:"plane",name:t.name,color:on.hoverFace})}this.vp.highlight(e)}run(e,t){if(!this.ready)return this.toast("The modeling engine is still loading\u2026");if(this.mode==="sketch"&&!["params","info","measure"].includes(e)){this.toast("Finish the sketch first (green check).");return}this.cmd&&this.cancelCmd();let n=(this.mode==="assembly"?ju:Fy)[e];if(!n)return;let i=n(this,t);i&&(this.cmd=i,this.ui.openCmd(i),i.start&&i.start(),this.refreshHighlights(),this.rebuild())}cmdChanged(){this.cmd&&(this.ui.refreshCmd(),this.refreshHighlights(),this.rebuild())}okCmd(){let e=this.cmd;if(e){if(e.validate){let t=e.validate();if(t){this.toast(t,"error");return}}if(e.feature){let t=this.buildPlan();this.change(()=>{e.editIndex!=null?this.doc.features[e.editIndex]=e.feature:this.insertFeature(e.feature)})}e.ok&&e.ok(),this.closeCmd()}}cancelCmd(){this.cmd&&this.cmd.cancel&&this.cmd.cancel(),this.closeCmd(),this.rebuild()}closeCmd(){this.cmd=null,this.hoverPick=null,this.asmr.hover=null,this.mode==="assembly"&&this.asmr.render(),this.vp.showPlanes(!1),this.ui.closeCmd(),this.refreshHighlights(),this.vp.renderer.domElement.style.cursor="default",this.status("Ready. Pick a tool from the ribbon, or right-drag to turn the part."),this.rebuild()}editFeature(e){let t=this.findFeature(e);if(!t)return;if(t.type==="sketch")return this.enterSketch(e);let n={extrude:"extrude",revolve:"revolve",hole:"hole",fillet:"fillet",chamfer:"chamfer",shell:"shell",mirrorBody:"mirrorBody",primitive:"primitive",pattern:"pattern"};this.run(n[t.type],{edit:e})}enterSketch(e,t=!1){this.cmd&&this.closeCmd();let n=this.findFeature(e),i;try{let r=this.params(),o=typeof n.plane=="string"?ky[n.plane]:{...n.plane},a=n.faceRef&&this.planes&&this.planes[e];a&&a.base&&(o.origin=a.base,o.normal=a.normal);let l=n.offset?En(n.offset,r):0;i={origin:o.origin.map((c,h)=>c+o.normal[h]*l),xDir:o.xDir,normal:o.normal}}catch(r){this.toast("Plane offset problem: "+r.message,"error");return}this.mode="sketch",this.sketchId=e,this.sketchIsNew=t,this.savedCam={pos:this.vp.camera.position.clone(),up:this.vp.camera.up.clone(),target:this.vp.controls.target.clone(),zoom:this.vp.camera.zoom,h:this.vp.viewHeight},this.vp.setGhost(!0),this.sk.evals=null,this.sk.recompute(),this.sk.enter(i),this.ui.enterSketch(),this.rebuild()}exitSketch(e){if(this.mode!=="sketch")return;let t=this.sketchId;if(this.sk.exit(),this.mode="model",this.vp.setGhost(!1),this.ui.exitSketch(),this.savedCam){let o=this.savedCam;this.vp.camera.position.copy(o.pos),this.vp.setUp(o.up),this.vp.controls.target.copy(o.target),this.vp.camera.zoom=o.zoom,this.vp.viewHeight=o.h,this.vp.updateFrustum(),this.vp.controls.update()}if(this.rebuild(),e)return;let n=this.findFeature(t);if(!n)return;let i=this.doc.features.some(o=>o.sketch===t),{loops:r}=Pa(xr(n.entities,this.params()));!i&&r.length?this.run("extrude",{sketch:t}):!i&&n.entities.length&&this.toast("No closed shape yet, so nothing to extrude. Red dots show line ends that do not meet.")}toggleGrid(){this.sk.gridOn=!this.sk.gridOn,this.sk.redraw(),this.ui.sketchToolChanged(this.sk.tool)}download(e,t,n){let i=t instanceof Blob?t:new Blob([t],{type:n}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.download=e,document.body.appendChild(r),r.click(),setTimeout(()=>{URL.revokeObjectURL(r.href),r.remove()},2e3)}safeName(){return(this.root.name||"Part").replace(/[^\w\- ]+/g,"").trim()||"Part"}saveFile(e){this.mode==="sketch"&&this.exitSketch(!0);let t=e?this.doc:this.root,n=t.kind==="assembly"?".pasm":".pcad",i=((t.name||"Part").replace(/[^\w\- ]+/g,"").trim()||"Part")+n;this.download(i,JSON.stringify(t,null,1),"application/json"),this.dirty=!1,this.toast("Saved "+i+" to your downloads.")}openFile(){let e=document.createElement("input");e.type="file",e.accept=".pcad,.pasm,.json",e.onchange=async()=>{let t=e.files[0];if(t)try{let n=JSON.parse(await t.text());if(n&&n.kind==="assembly"&&Array.isArray(n.components)){this.openAssembly(n),this.toast("Opened "+t.name);return}if(!n||!Array.isArray(n.features))throw new Error("This is not a Pathway CAD file");this.setDoc(n),this.toast("Opened "+t.name)}catch(n){this.toast("Could not open: "+n.message,"error")}},e.click()}newFile(){(this.root.features&&this.root.features.length||this.root.components&&this.root.components.length)&&!confirm("Start a new part? Save first if you want to keep this one (File > Save).")||this.setDoc(Ui())}async exportFile(e){if(this.mode==="sketch"&&this.exitSketch(!0),this.mode==="assembly"){if(!this.asm.components.length)return this.toast("Place some parts first.","error");this.toast(`Making the ${e.toUpperCase()} file for the whole assembly\u2026`);let n=ln[this.asm.units||"mm"],i=this.asm.components.filter(o=>!o.hidden).map(o=>({id:o.id,part:o.part,pos:o.pos.map(a=>a*n),quat:o.quat})),r=await this.send({type:"exportAsm",format:e,parts:this.asm.parts,comps:i});return r.type==="error"?this.toast("Export failed: "+r.msg,"error"):this.download(`${this.safeName()}.${e==="stl"?"stl":"step"}`,new Blob([r.buf]),"application/octet-stream")}if(!this.vp.desc)return this.toast("There is no part to export yet.","error");this.toast(`Making the ${e.toUpperCase()} file\u2026`);let t=await this.send({type:"export",format:e,doc:this.doc,stopAt:this.doc.rollback??this.doc.features.length});if(t.type==="error")return this.toast("Export failed: "+t.msg,"error");this.download(`${this.safeName()}.${e==="stl"?"stl":"step"}`,new Blob([t.buf]),"application/octet-stream")}screenshot(){let e=this.vp.snapshot(),t=document.createElement("a");t.href=e,t.download=this.safeName()+".png",t.click()}},ky={XY:{origin:[0,0,0],xDir:[1,0,0],normal:[0,0,1]},XZ:{origin:[0,0,0],xDir:[1,0,0],normal:[0,-1,0]},YZ:{origin:[0,0,0],xDir:[0,1,0],normal:[1,0,0]}};function Uy(s){let e=s.normal,t=e[0]*s.center[0]+e[1]*s.center[1]+e[2]*s.center[2],n=e.map(r=>$t(r*t)),i;if(Math.abs(e[2])>.9)i=[1,0,0];else{i=[-e[1],e[0],0];let r=Math.hypot(i[0],i[1]);i=[i[0]/r,i[1]/r,0]}return{origin:n,xDir:i.map(r=>$t(r)),normal:e.map(r=>$t(r)),faceRef:[...s.center.map($t),...e.map($t)]}}function ci(s,e){if(e&&e.edit){let t=s.featureIndex(e.edit);return{editIndex:t,feature:Sc(s.doc.features[t])}}return{editIndex:null,feature:null}}function td(s,e){let t=e??s.doc.rollback??s.doc.features.length;return s.doc.features.slice(0,t).filter(n=>n.type==="sketch")}function Ny(s,e){let t=e??s.doc.rollback??s.doc.features.length;return s.doc.features.slice(0,t).filter(n=>["extrude","revolve","hole","primitive"].includes(n.type)&&!n.suppressed)}function Ni(s,e){let t=e??s.doc.rollback??s.doc.features.length;return s.doc.features.slice(0,t).some(n=>["extrude","revolve","primitive"].includes(n.type)&&!n.suppressed)}var Fy={sketch(s){return s.vp.showPlanes(!0),{title:"New Sketch",help:"Click one of the colored origin planes, or a flat face of your part, to draw on it.",want:{faces:!0,planes:!0},fields:()=>[{type:"note",text:"Blue = XY (floor). Green = XZ (front). Red = YZ (side)."}],noOk:!0,onPick(e){if(!e)return;let t;if(e.kind==="plane")t=e.name;else if(e.kind==="face"){if(e.info.type!=="PLANE"){s.toast("That face is curved. Pick a flat face or an origin plane.","error");return}t=Uy(e.info)}else return;let n=t.faceRef;n&&delete t.faceRef;let i={id:s.newId(),type:"sketch",name:s.nextName("sketch"),plane:t,faceRef:n,offset:0,entities:[]};s.closeCmd(),s.change(()=>s.insertFeature(i)),s.enterSketch(i.id,!0)}}},extrude(s,e){let t=ci(s,e),n=td(s,t.editIndex);if(!n.length)return s.toast("Make a sketch first (Model > Sketch).","error"),null;let i=n.filter(a=>!s.doc.features.some(l=>l.sketch===a.id)),r=Ni(s,t.editIndex),o=t.feature||{id:s.newId(),type:"extrude",name:s.nextName("extrude"),sketch:e&&e.sketch||(i[i.length-1]||n[n.length-1]).id,distance:zt(10,s.units()),extent:"distance",direction:"normal",op:r?"join":"new",taper:0};return{title:t.editIndex!=null?"Edit "+o.name:"Extrude",help:'Pushes a closed sketch shape out into a solid. Use "Remove material" to cut pockets and holes.',feature:o,editIndex:t.editIndex,fields:()=>[{key:"sketch",label:"Sketch",type:"select",options:n.map(a=>[a.id,a.name])},{key:"extent",label:"How far",type:"select",options:[["distance","A distance"],["through","Through everything"]]},o.extent!=="through"&&{key:"distance",label:"Distance (mm)",type:"expr"},{key:"direction",label:"Direction",type:"select",options:[["normal","One way"],["reverse","Other way (flip)"],["both","Both ways (centered)"]]},r?{key:"op",label:"Operation",type:"select",options:Mc}:{type:"note",text:"This is the first solid, so it adds material."},{key:"taper",label:"Taper angle (\xB0)",type:"expr",hint:"0 = straight sides"}].filter(Boolean)}},revolve(s,e){let t=ci(s,e),n=td(s,t.editIndex);if(!n.length)return s.toast("Make a sketch first (Model > Sketch).","error"),null;let i=n.filter(c=>!s.doc.features.some(h=>h.sketch===c.id)),r=Ni(s,t.editIndex),o=e&&e.sketch||(i[i.length-1]||n[n.length-1]).id,a=c=>{let h=s.findFeature(c),d=h&&h.entities.find(u=>u.type==="line"&&u.construction);return d?d.id:"Y"},l=t.feature||{id:s.newId(),type:"revolve",name:s.nextName("revolve"),sketch:o,axis:a(o),angle:360,op:r?"join":"new"};return{title:t.editIndex!=null?"Edit "+l.name:"Revolve",help:"Spins a sketch shape around an axis, like a lathe. Draw a dashed construction line in the sketch to use as the axis.",feature:l,editIndex:t.editIndex,fields:()=>{let c=s.findFeature(l.sketch),h=c?c.entities.filter(d=>d.type==="line"):[];return[{key:"sketch",label:"Sketch",type:"select",options:n.map(d=>[d.id,d.name]),onChange:()=>{l.axis=a(l.sketch)}},{key:"axis",label:"Axis",type:"select",options:[["X","Sketch's horizontal axis"],["Y","Sketch's vertical axis"],...h.map((d,u)=>[d.id,`${d.construction?"Construction line":"Line"} ${u+1} (${Me(+d.x1||0)},${Me(+d.y1||0)} \u2192 ${Me(+d.x2||0)},${Me(+d.y2||0)})`])]},{key:"angle",label:"Angle (\xB0)",type:"expr"},r?{key:"op",label:"Operation",type:"select",options:Mc}:{type:"note",text:"This is the first solid, so it adds material."}]}}},hole(s,e){let t=ci(s,e);if(!Ni(s,t.editIndex))return s.toast("Make a solid first, then put holes in it.","error"),null;let n=t.feature||{id:s.newId(),type:"hole",name:s.nextName("hole"),origin:null,normal:null,diameter:zt(5,s.units()),extent:"through",depth:zt(10,s.units()),style:"simple",cbDiameter:zt(9,s.units()),cbDepth:zt(3,s.units())},i={title:t.editIndex!=null?"Edit "+n.name:"Hole",help:"Click a flat face where the hole should go. Then type exact X, Y, Z numbers if you need to.",feature:t.feature?n:null,draft:n,editIndex:t.editIndex,want:{faces:!0},fields:()=>[n.origin?{type:"xyz",key:"origin",label:"Center (mm)"}:{type:"note",text:"\u{1F449} Click a flat face to place the hole."},{key:"diameter",label:"Diameter (mm)",type:"expr"},{key:"extent",label:"Depth",type:"select",options:[["through","All the way through"],["depth","A set depth"]]},n.extent==="depth"&&{key:"depth",label:"Depth (mm)",type:"expr"},{key:"style",label:"Type",type:"select",options:[["simple","Plain hole"],["counterbore","Counterbore (for bolt heads)"],["countersink","Countersink (for flat screws)"]]},n.style!=="simple"&&{key:"cbDiameter",label:n.style==="counterbore"?"Counterbore diameter":"Countersink diameter",type:"expr"},n.style==="counterbore"&&{key:"cbDepth",label:"Counterbore depth",type:"expr"}].filter(Boolean),onPick(r){if(!(!r||r.kind!=="face")){if(r.info.type!=="PLANE"){s.toast("Holes go on flat faces.","error");return}n.origin=r.point.map($t),n.normal=r.info.normal.map($t),n.faceRef=[...r.info.center.map($t),...n.normal],i.feature=n,s.cmdChanged()}},validate:()=>n.origin?null:"Click a flat face to place the hole first.",highlights:()=>n.origin?[{kind:"point",point:n.origin,color:on.selEdge}]:[]};return i},primitive(s,e){let t=ci(s,e),n=e&&e.shape||t.feature&&t.feature.shape||"box",i=Ni(s,t.editIndex),r=s.units(),o={box:{w:zt(40,r),d:zt(30,r),h:zt(20,r)},cylinder:{diameter:zt(30,r),h:zt(40,r),axis:"Z"},sphere:{diameter:zt(40,r)}},a={box:"Box",cylinder:"Cylinder",sphere:"Sphere"},l=t.feature||{id:s.newId(),type:"primitive",shape:n,name:a[n]+(s.doc.features.filter(c=>c.shape===n).length+1),...o[n],x:0,y:0,z:0,op:i?"join":"new"};return{title:t.editIndex!=null?"Edit "+l.name:a[n],help:n==="box"?"A box sitting on its position point (centered left/right and front/back).":n==="cylinder"?"A cylinder starting at the position point, going along the axis.":"A ball centered on the position point.",feature:l,editIndex:t.editIndex,fields:()=>[n==="box"&&{key:"w",label:"Width X (mm)",type:"expr"},n==="box"&&{key:"d",label:"Depth Y (mm)",type:"expr"},n==="box"&&{key:"h",label:"Height Z (mm)",type:"expr"},n!=="box"&&{key:"diameter",label:"Diameter (mm)",type:"expr"},n==="cylinder"&&{key:"h",label:"Length (mm)",type:"expr"},n==="cylinder"&&{key:"axis",label:"Points along",type:"select",options:Oa},{key:"x",label:"Position X",type:"expr"},{key:"y",label:"Position Y",type:"expr"},{key:"z",label:"Position Z",type:"expr"},i?{key:"op",label:"Operation",type:"select",options:Mc}:null].filter(Boolean)}},fillet(s,e){return nd(s,e,"fillet")},chamfer(s,e){return nd(s,e,"chamfer")},shell(s,e){let t=ci(s,e);if(!Ni(s,t.editIndex))return s.toast("Make a solid first.","error"),null;let n=t.feature||{id:s.newId(),type:"shell",name:s.nextName("shell"),thickness:zt(2,s.units()),faces:[]},i=()=>sd(s.vp.desc&&s.vp.desc.faces,n.faces,"center");return{title:t.editIndex!=null?"Edit "+n.name:"Shell",help:"Hollows out the part, leaving walls of the thickness you choose. Click faces to leave open (like the top of a cup).",feature:n,editIndex:t.editIndex,picksOnBase:!0,preview:!1,want:{faces:!0},fields:()=>[{key:"thickness",label:"Wall thickness (mm)",type:"expr"},{type:"note",text:n.faces.length?`${n.faces.length} open face(s). Click a face again to close it.`:"\u{1F449} Click the flat face(s) to leave open, like the top of a box."},{type:"preview"}],validate:()=>n.faces.length?null:"Click at least one flat face to leave open.",onPick(r){if(!r||r.kind!=="face")return;let o=r.info.center.map($t),a=n.faces.findIndex(l=>Es(l,o)<.5);if(a>=0)n.faces.splice(a,1);else if(r.info.type!=="PLANE"){s.toast("Pick a flat face to leave open.","error");return}else n.faces.push([...o,...r.info.normal.map($t)]);s.cmdChanged()},highlights:()=>i().map(r=>({kind:"face",index:r,color:on.selFace}))}},pattern(s,e){let t=ci(s,e),n=e&&e.kind||t.feature&&t.feature.kind||"rect",i=Ny(s,t.editIndex);if(!i.length)return s.toast("Make a feature to copy first (an extrusion, revolution, hole or shape).","error"),null;let r=[i[i.length-1].id],o={rect:"Rectangular Pattern",circ:"Circular Pattern",mirror:"Mirror"},a={rect:{d1:"X",n1:3,s1:zt(20,s.units()),d2:"Y",n2:1,s2:zt(20,s.units())},circ:{axis:"Z",n:6,angle:360},mirror:{plane:"YZ"}},l=o[n].replace(/ /g,""),c=1;for(;s.doc.features.some(u=>u.name===l+c);)c++;let h=t.feature||{id:s.newId(),type:"pattern",kind:n,name:l+c,features:r,...a[n]},d=i.map(u=>[u.id,u.name]);return{title:t.editIndex!=null?"Edit "+h.name:o[n],help:n==="rect"?"Copies features in rows and columns.":n==="circ"?"Copies features around an axis, like bolt holes on a wheel.":"Makes a mirror copy of features on the other side of a plane.",feature:h,editIndex:t.editIndex,fields:()=>[{key:"features",label:"Features to copy",type:"multi",options:d},...n==="rect"?[{key:"d1",label:"Direction 1",type:"select",options:Oa},{key:"flip1",label:"Flip direction 1",type:"check"},{key:"n1",label:"Count",type:"expr"},{key:"s1",label:"Spacing (mm)",type:"expr"},{key:"d2",label:"Direction 2",type:"select",options:Oa},{key:"flip2",label:"Flip direction 2",type:"check"},{key:"n2",label:"Count",type:"expr"},{key:"s2",label:"Spacing (mm)",type:"expr"}]:n==="circ"?[{key:"axis",label:"Around",type:"select",options:Oa},{key:"n",label:"Count (with the original)",type:"expr"},{key:"angle",label:"Total angle (\xB0)",type:"expr",hint:"360 = all the way around"}]:[{key:"plane",label:"Mirror across",type:"select",options:ed}]],validate:()=>h.features.length?null:"Pick at least one feature to copy."}},mirrorBody(s,e){let t=ci(s,e);if(!Ni(s,t.editIndex))return s.toast("Make a solid first.","error"),null;let n=t.feature||{id:s.newId(),type:"mirrorBody",name:s.nextName("mirrorBody"),plane:"YZ"};return{title:t.editIndex!=null?"Edit "+n.name:"Mirror Part",help:"Copies the whole part to the other side of a plane and joins the two halves. Great for symmetric parts: model one half, then mirror.",feature:n,editIndex:t.editIndex,fields:()=>[{key:"plane",label:"Mirror across",type:"select",options:ed}]}},measure(s){let e=[],t="Click a spot on the part, then a second spot. Click a round edge to see its diameter.";return{title:"Measure",help:"Measures straight-line distance between two clicked points. Clicks near a corner snap to it.",want:{faces:!0,edges:!0},noOk:!0,closeLabel:"Done",fields:()=>[{type:"html",html:t}],onPick(i){if(!i)return;let r=s.vp.desc,o=i.point,a="";if(i.kind==="edge"){let l=Oy(r,i.index),c=[l[0],l[l.length-1]],h=s.vp.pixelSize()*12,d=c.find(f=>Es(f,o)<h);d&&(o=d);let u=l.reduce((f,m,y)=>y?f+Es(m,l[y-1]):0,0);if(a=`Edge length: <b>${Me(u)} ${s.units()}</b>`,r.edges[i.index].type==="CIRCLE"&&l.length>3){let f=By(l[0],l[Math.floor(l.length/3)],l[Math.floor(2*l.length/3)]);f&&(a+=`<br>Round edge: <b>\xD8 ${Me(2*f.r)} ${s.units()}</b> (radius ${Me(f.r)})`)}}if(e.length>=2&&(e.length=0),e.push(o.map($t)),e.length===1)t=`First point: (${e[0].map(Me).join(", ")})<br>${a}<br>Now click a second point.`;else{let[l,c]=e;t=`Distance: <b class="big">${Me(Es(l,c))} ${s.units()}</b><br>X: ${Me(Math.abs(c[0]-l[0]))} &nbsp; Y: ${Me(Math.abs(c[1]-l[1]))} &nbsp; Z: ${Me(Math.abs(c[2]-l[2]))}<br>${a}<br><span class="muted">Click again to start a new measurement.</span>`}s.ui.refreshCmd(),s.refreshHighlights()},highlights:()=>[...e.map(i=>({kind:"point",point:i,color:on.selEdge})),...e.length===2?[{kind:"segment",points:e,color:on.selEdge}]:[]]}},params(s){return s.ui.openParams(),null},info(s){return s.ui.openInfo(),null}};function nd(s,e,t){let n=ci(s,e);if(!Ni(s,n.editIndex))return s.toast("Make a solid first.","error"),null;let i=n.feature||{id:s.newId(),type:t,name:s.nextName(t),radius:zt(t==="fillet"?2:1,s.units()),allEdges:!1,edges:[]},r=()=>sd(s.vp.desc&&s.vp.desc.edges,i.edges,"mid"),o=t==="fillet"?"round":"bevel";return{title:n.editIndex!=null?"Edit "+i.name:t==="fillet"?"Fillet":"Chamfer",help:`Click the edges to ${o}. Click an edge again to un-pick it. Tick "Preview" to see the result.`,feature:i,editIndex:n.editIndex,picksOnBase:!0,preview:!1,want:{edges:!0},fields:()=>[{key:"radius",label:t==="fillet"?"Radius (mm)":"Distance (mm)",type:"expr"},{key:"allEdges",label:"Every edge of the part",type:"check"},!i.allEdges&&{type:"note",text:i.edges.length?`${i.edges.length} edge(s) picked.`:"\u{1F449} Click edges on the part."},{type:"preview"}].filter(Boolean),onPick(a){if(!a||a.kind!=="edge"||i.allEdges)return;let l=s.vp.desc.edges[a.index].mid.map($t),c=i.edges.findIndex(h=>Es(h,l)<.5);c>=0?i.edges.splice(c,1):i.edges.push(l),s.cmdChanged()},validate:()=>!i.allEdges&&!i.edges.length?'Pick at least one edge (or tick "Every edge").':null,highlights:()=>i.allEdges?[]:r().map(a=>({kind:"edge",index:a,color:on.selEdge}))}}function Es(s,e){return Math.hypot(s[0]-e[0],s[1]-e[1],s[2]-e[2])}function sd(s,e,t){if(!s)return[];let n=[];for(let i of e){let r=-1,o=.5;s.forEach((a,l)=>{let c=Es(a[t],i);c<o&&(o=c,r=l)}),r>=0&&n.push(r)}return n}function Oy(s,e){let[t,n]=s.edgeGroups[e],i=[];for(let r=t;r<t+n;r++)i.push([s.lines[r*3],s.lines[r*3+1],s.lines[r*3+2]]);return i}function By(s,e,t){let n=e.map((u,f)=>u-s[f]),i=t.map((u,f)=>u-s[f]),r=[n[1]*i[2]-n[2]*i[1],n[2]*i[0]-n[0]*i[2],n[0]*i[1]-n[1]*i[0]],o=r[0]**2+r[1]**2+r[2]**2;if(o<1e-12)return null;let a=n[0]**2+n[1]**2+n[2]**2,l=i[0]**2+i[1]**2+i[2]**2,c=[r[1]*n[2]-r[2]*n[1],r[2]*n[0]-r[0]*n[2],r[0]*n[1]-r[1]*n[0]],d=[i[1]*r[2]-i[2]*r[1],i[2]*r[0]-i[0]*r[2],i[0]*r[1]-i[1]*r[0]].map((u,f)=>(u*a+c[f]*l)/(2*o));return{r:Math.hypot(...d)}}var Tc=class{constructor(e){this.app=e,this.treeSel=null,this.tab="model",this.infoOpen=!1,Re("#tree").addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("click",()=>this.closeMenu()),Re("#docName").addEventListener("change",t=>{let n=t.target.value.trim()||"Part1";e.change(()=>{(e.mode==="assembly"?e.asm:e.doc).name=n})})}get vp(){return this.app.vp}ribbonDefs(){let e=this.app;return{file:[["File",[["new","New Part",()=>e.newFile()],["assembly","New Assembly",()=>e.newAssemblyFile()],["open","Open",()=>e.openFile(),"Ctrl+O"],["save","Save",()=>e.saveFile(),"Ctrl+S"],...e.asm&&e.editPid?[["save","Save part only",()=>e.saveFile(!0)]]:[]]],["Export",[["stl","STL (3D print)",()=>e.exportFile("stl")],["stl","STEP (other CAD)",()=>e.exportFile("step")],["camera","Picture",()=>e.screenshot()]]],["Setup",[["units","Units",()=>this.openUnits()]]],["Learn",[["examples","Examples",()=>this.openExamples()],["help","How to",()=>this.openHelp()]]]],model:[...e.asm&&e.editPid?[["Assembly",[["back","Back to assembly",()=>e.returnToAssembly()]]]]:[],["Sketch",[["sketch","Sketch",()=>e.run("sketch"),"S"]]],["Create",[["extrude","Extrude",()=>e.run("extrude"),"E"],["revolve","Revolve",()=>e.run("revolve"),"R"],["hole","Hole",()=>e.run("hole"),"H"]]],["Shapes",[["box","Box",()=>e.run("primitive",{shape:"box"})],["cylinder","Cylinder",()=>e.run("primitive",{shape:"cylinder"})],["sphere","Sphere",()=>e.run("primitive",{shape:"sphere"})]]],["Modify",[["fillet","Fillet",()=>e.run("fillet"),"F"],["chamfer","Chamfer",()=>e.run("chamfer")],["shell","Shell",()=>e.run("shell")]]],["Pattern",[["rectPattern","Rectangular",()=>e.run("pattern",{kind:"rect"})],["circPattern","Circular",()=>e.run("pattern",{kind:"circ"})],["mirror","Mirror",()=>e.run("pattern",{kind:"mirror"})],["mirrorBody","Mirror Part",()=>e.run("mirrorBody")]]],["Setup",[["params","Parameters",()=>this.openParams()]]]],sketch:[["Draw",[["line","Line",()=>e.sk.setTool("line"),"L"],["rect","Rectangle",()=>e.sk.setTool("rect"),"R"],["circle","Circle",()=>e.sk.setTool("circle"),"C"],["arc","Arc",()=>e.sk.setTool("arc"),"A"],["polygon","Polygon",()=>e.sk.setTool("polygon"),"P"],["slot","Slot",()=>e.sk.setTool("slot"),"O"]]],["Edit",[["select","Select",()=>e.sk.setTool("select"),"S"],["construction","Construction",()=>e.sk.toggleConstruction(),"X"],["trash","Delete",()=>e.sk.deleteSelected(),"Del"]]],["View",[["look","Look at",()=>e.sk.lookAt()],["grid","Snap to grid",()=>e.toggleGrid(),"G"]]],["Setup",[["params","Parameters",()=>this.openParams()]]],["Exit",[["finish","Finish Sketch",()=>e.exitSketch()]]]],inspect:e.mode==="assembly"?[["Measure",[["measure","Measure",()=>e.run("measure"),"M"]]],["Check",[["clash","Interference",()=>e.asmr.checkInterference()],["bom","Parts list",()=>e.asmr.openPartsList()]]]]:[["Measure",[["measure","Measure",()=>e.run("measure"),"M"],["info","Part Info",()=>this.openInfo()]]]],assemble:[["Parts",[["place","Place",()=>e.run("place"),"P"],["move","Move / Turn",()=>e.run("moveComp"),"G"]]],["Constrain",[["mate","Mate",()=>e.run("constrain",{type:"mate"}),"C"],["flush","Flush",()=>e.run("constrain",{type:"flush"})],["insert","Insert",()=>e.run("constrain",{type:"insert"})],["axisMate","Axis",()=>e.run("constrain",{type:"axis"})],["angleMate","Angle",()=>e.run("constrain",{type:"angle"})]]],["Check",[["clash","Interference",()=>e.asmr.checkInterference()],["bom","Parts list",()=>e.asmr.openPartsList()]]]],view:[["Orientation",[["home","Home",()=>this.vp.setView("home"),"F6"],["front","Front",()=>this.vp.setView("front")],["top","Top",()=>this.vp.setView("top")],["right","Right",()=>this.vp.setView("right")],["fit","Zoom all",()=>this.vp.fit()]]],["Style",[["shaded","Shaded",()=>this.setStyle("shaded")],["edges","With edges",()=>this.setStyle("edges")],["wire","Wireframe",()=>this.setStyle("wire")]]],["Show",[["planes","Origin planes",()=>this.vp.showPlanes(!this.vp.planesVisible)]]],["Picture",[["camera","Save picture",()=>this.app.screenshot()]]]]}}setStyle(e){this.vp.applyStyle(e),this.renderRibbon()}renderRibbon(){let e=this.app.mode,t=e==="sketch"?[["sketch","Sketch"],["inspect","Inspect"],["view","View"]]:e==="assembly"?[["file","File"],["assemble","Assemble"],["inspect","Inspect"],["view","View"]]:[["file","File"],["model","Model"],["inspect","Inspect"],["view","View"]];t.some(r=>r[0]===this.tab)||(this.tab=t[0][0]==="file"?t[1][0]:t[0][0]),Re("#tabs").innerHTML=t.map(([r,o])=>`<button class="tab ${r===this.tab?"on":""} ${r==="sketch"?"sketchtab":""}" data-tab="${r}">${o}</button>`).join("")+`<span class="spacer"></span><button class="tb-btn" id="undoBtn" title="Undo (Ctrl+Z)">${Qe("undo",18)}</button><button class="tb-btn" id="redoBtn" title="Redo (Ctrl+Y)">${Qe("redo",18)}</button><button class="tb-btn" id="helpBtn" title="How to use Pathway CAD">${Qe("help",18)}</button>`;for(let r of document.querySelectorAll("#tabs .tab"))r.onclick=()=>{this.tab=r.dataset.tab,this.renderRibbon()};Re("#undoBtn").onclick=()=>this.app.undo(),Re("#redoBtn").onclick=()=>this.app.redo(),Re("#helpBtn").onclick=()=>this.openHelp();let n=this.ribbonDefs()[this.tab],i=Re("#ribbon");i.innerHTML="";for(let[r,o]of n){let a=document.createElement("div");a.className="rgroup"+(r==="Exit"?" exit":"")+(r==="Assembly"?" back":"");let l=document.createElement("div");l.className="rbtns";for(let[h,d,u,f]of o){let m=document.createElement("button");m.className="rbtn",m.dataset.ic=h,m.innerHTML=Qe(h,26)+`<span>${Ce(d)}</span>`,m.title=d+(f?` (${f})`:""),m.onclick=y=>{y.stopPropagation(),u()},this.tab==="view"&&["shaded","edges","wire"].includes(h)&&this.vp&&this.vp.style===h&&m.classList.add("on"),l.appendChild(m)}a.appendChild(l);let c=document.createElement("div");c.className="rcap",c.textContent=r,a.appendChild(c),i.appendChild(a)}this.app.mode==="sketch"&&this.sketchToolChanged(this.app.sk.tool)}sketchToolChanged(e){for(let t of document.querySelectorAll("#ribbon .rbtn")){let n=t.dataset.ic;t.classList.toggle("on",n===e||n==="grid"&&this.app.sk&&this.app.sk.gridOn)}this.app.mode==="sketch"&&this.renderSketchPanel()}renderTitle(){let e=Re("#docName"),t=this.app.mode==="assembly"?this.app.asm:this.app.doc;document.activeElement!==e&&(e.value=t.name||"Part1"),document.title=`${t.name||"Part"} - Pathway CAD`}renderTree(){let e=this.app,t=e.doc;if(e.mode==="assembly"){e.asmr.renderTree(Re("#tree"));return}let n=e.result.errors||{},i=e.result.warnings||{},r=t.rollback??t.features.length,o=e.asm&&e.editPid?`<div class="trow backrow" data-act="back">${Qe("back",16)}<span>Back to ${Ce(e.asm.name)}</span></div>`:"";o+=`<div class="trow root">${Qe("part",16)}<b>${Ce(t.name||"Part1")}</b></div>`,o+=`<div class="trow sub" data-act="origin">${Qe("origin",16)}<span>Origin</span><span class="tmeta">${e.vp&&e.vp.planesVisible?"shown":""}</span></div>`;let a=`<div class="trow endrow" data-act="end" title="Features below this line are switched off. Drag it with the menu on a feature: 'Roll back to here'.">${Qe("end",16)}<span>End of Part</span>${t.rollback!=null?'<button class="mini" data-act="toend">move to end</button>':""}</div>`;t.features.forEach((u,f)=>{f===r&&(o+=a);let m=Ec[u.type]||Ec.primitive,y=u.type==="primitive"?u.shape==="sphere"?"sphere":u.shape==="cylinder"?"cylinder":"box":u.type==="pattern"?u.kind==="circ"?"circPattern":u.kind==="mirror"?"mirror":"rectPattern":m.icon,g=u.type==="sketch"&&t.features.some(v=>v.sketch===u.id),p=n[u.id],w=i[u.id],b=["trow","feat",f>=r?"after":"",u.suppressed?"supp":"",this.treeSel===u.id?"sel":"",p?"bad":"",e.mode==="sketch"&&e.sketchId===u.id?"editing":"",g?"consumed":""].join(" ");o+=`<div class="${b}" data-id="${u.id}" title="${Ce(p||w||"Double-click to edit. Right-click for more.")}">${Qe(y,16)}<span class="tname">${Ce(u.name)}</span>${p?`<span class="tbad">${Qe("err",14)}</span>`:w?`<span class="twarn">${Qe("warn",14)}</span>`:""}</div>`}),r>=t.features.length&&(o+=a),t.features.length||(o+='<div class="tempty">Start with <b>Sketch</b> (or a Box) on the Model tab.</div>');let l=Re("#tree");l.innerHTML=o;for(let u of l.querySelectorAll(".feat")){let f=u.dataset.id;u.onclick=m=>{m.stopPropagation(),this.treeSel=f,this.renderTree(),this.showFeatureError(f)},u.ondblclick=m=>{m.stopPropagation(),e.mode!=="sketch"&&e.editFeature(f)},u.oncontextmenu=m=>{m.preventDefault(),m.stopPropagation(),this.treeSel=f,this.renderTree(),this.featureMenu(f,m.clientX,m.clientY)}}let c=l.querySelector("[data-act=origin]");c&&(c.onclick=()=>{this.vp.showPlanes(!this.vp.planesVisible),this.renderTree()});let h=l.querySelector("[data-act=back]");h&&(h.onclick=()=>e.returnToAssembly());let d=l.querySelector("[data-act=toend]");d&&(d.onclick=u=>{u.stopPropagation(),e.change(()=>{e.doc.rollback=null})})}showFeatureError(e){let t=(this.app.result.errors||{})[e],n=(this.app.result.warnings||{})[e];t?this.toast(t,"error"):n&&this.toast(n,"warn")}featureMenu(e,t,n){let i=this.app,r=i.findFeature(e),o=i.featureIndex(e),a=[];i.mode!=="sketch"&&(a.push([r.type==="sketch"?"Edit sketch":"Edit",()=>i.editFeature(e)]),r.sketch&&a.push(["Edit its sketch",()=>i.enterSketch(r.sketch)])),a.push(["Rename",()=>this.askText("Rename",r.name,l=>i.change(()=>{i.findFeature(e).name=l}))]),i.mode!=="sketch"&&(a.push([r.suppressed?"Turn on (unsuppress)":"Turn off (suppress)",()=>i.change(()=>{let l=i.findFeature(e);l.suppressed=!l.suppressed})]),a.push(["Roll back to here",()=>i.change(()=>{i.doc.rollback=o})]),o>0&&a.push(["Move up",()=>i.change(()=>{let l=i.doc.features;if(id(l[o],l[o-1])){i.toast(`${l[o].name} uses ${l[o-1].name}, so it must stay below it.`,"error");return}[l[o-1],l[o]]=[l[o],l[o-1]]})]),o<i.doc.features.length-1&&a.push(["Move down",()=>i.change(()=>{let l=i.doc.features;if(id(l[o+1],l[o])){i.toast(`${l[o+1].name} uses ${l[o].name}, so it must stay below it.`,"error");return}[l[o+1],l[o]]=[l[o],l[o+1]]})]),a.push(["Delete",()=>i.deleteFeature(e),"danger"])),this.menu(a,t,n)}menu(e,t,n){this.closeMenu();let i=document.createElement("div");i.className="ctxmenu";for(let[o,a,l]of e){let c=document.createElement("button");c.textContent=o,l&&(c.className=l),c.onclick=h=>{h.stopPropagation(),this.closeMenu(),a()},i.appendChild(c)}document.body.appendChild(i);let r=i.getBoundingClientRect();i.style.left=Math.min(t,innerWidth-r.width-8)+"px",i.style.top=Math.min(n,innerHeight-r.height-8)+"px",this.menuEl=i}closeMenu(){this.menuEl&&(this.menuEl.remove(),this.menuEl=null)}openCmd(e){this.cmdEl=Re("#cmdPanel"),this.cmdEl.hidden=!1,this.refreshCmd(),this.status(e.help)}closeCmd(){let e=Re("#cmdPanel");e.hidden=!0,e.innerHTML=""}cmdError(e){let t=Re("#cmdPanel .cmderr");t&&(t.hidden=!e,t.textContent=e?"\u26A0 "+e:"")}refreshCmd(){let e=this.app,t=e.cmd;if(!t)return;let n=Re("#cmdPanel"),i=t.target||t.feature||t.draft||{},r=e.params(),o=`<div class="cmdhead"><span>${Ce(t.title)}</span><button class="x" data-act="cancel" title="Cancel (Esc)">\xD7</button></div><div class="cmdhelp">${Ce(t.help)}</div><div class="cmdbody">`,a=e.units(),l=(t.fields?t.fields():[]).map(u=>u&&u.label&&a!=="mm"?{...u,label:u.label.replace("(mm)",`(${a})`)}:u);l.forEach((u,f)=>{if(u.type==="note")o+=`<div class="note">${Ce(u.text)}</div>`;else if(u.type==="html")o+=`<div class="note">${u.html}</div>`;else if(u.type==="preview")o+=`<label class="chk"><input type="checkbox" data-preview ${t.preview?"checked":""}> Preview the result</label>`;else if(u.type==="expr"){let m=an(i[u.key],r),y=m.ok?String(i[u.key]).trim()===Me(m.v)?"":"= "+Me(m.v):m.err;o+=`<label class="fld"><span>${Ce(u.label)}</span><input data-i="${f}" value="${Ce(i[u.key]??"")}" spellcheck="false" autocomplete="off"><em class="${m.ok?"":"bad"}">${Ce(y)}${u.hint&&m.ok?`<i>${Ce(u.hint)}</i>`:""}</em></label>`}else if(u.type==="select")o+=`<label class="fld"><span>${Ce(u.label)}</span><select data-i="${f}">${u.options.map(([m,y])=>`<option value="${Ce(m)}" ${String(i[u.key])===String(m)?"selected":""}>${Ce(y)}</option>`).join("")}</select></label>`;else if(u.type==="check")o+=`<label class="chk"><input type="checkbox" data-i="${f}" ${i[u.key]?"checked":""}> ${Ce(u.label)}</label>`;else if(u.type==="multi"){let m=new Set(i[u.key]||[]);o+=`<div class="fld"><span>${Ce(u.label)}</span><div class="multi">${u.options.map(([y,g])=>`<label class="chk"><input type="checkbox" data-i="${f}" data-v="${Ce(y)}" ${m.has(y)?"checked":""}> ${Ce(g)}</label>`).join("")}</div></div>`}else if(u.type==="buttons")o+=`<div class="fld">${u.label?`<span>${Ce(u.label)}</span>`:""}<div class="btnrow">${u.items.map(([m],y)=>`<button data-b="${f}:${y}">${Ce(m)}</button>`).join("")}</div></div>`;else if(u.type==="xyz"){let m=i[u.key]||[0,0,0];o+=`<div class="fld"><span>${Ce(u.label)}</span><div class="xyz">${["X","Y","Z"].map((y,g)=>`<label>${y}<input data-i="${f}" data-k="${g}" value="${Me(m[g])}"></label>`).join("")}</div></div>`}}),o+=`</div><div class="cmderr" hidden></div><div class="cmdfoot">${t.noOk?"":'<button class="ok" data-act="ok">OK</button>'}<button data-act="cancel">${Ce(t.closeLabel||"Cancel")}</button></div>`;let c=document.activeElement&&n.contains(document.activeElement)?document.activeElement.dataset.i:null;n.innerHTML=o,n.querySelectorAll("[data-act=cancel]").forEach(u=>u.onclick=()=>e.cancelCmd());let h=n.querySelector("[data-act=ok]");h&&(h.onclick=()=>e.okCmd());for(let u of n.querySelectorAll("[data-b]")){let[f,m]=u.dataset.b.split(":").map(Number);u.onclick=()=>l[f].items[m][1]()}let d=n.querySelector("[data-preview]");d&&(d.onchange=()=>{t.preview=d.checked,e.hoverPick=null,e.cmdChanged()});for(let u of n.querySelectorAll("[data-i]")){let f=l[+u.dataset.i],m=()=>{if(f.type==="expr")i[f.key]=br(u.value);else if(f.type==="select")i[f.key]=u.value;else if(f.type==="check")i[f.key]=u.checked;else if(f.type==="multi"){let y=new Set(i[f.key]||[]);u.checked?y.add(u.dataset.v):y.delete(u.dataset.v),i[f.key]=f.options.map(g=>g[0]).filter(g=>y.has(g))}else if(f.type==="xyz"){let y=an(u.value,r);if(!y.ok)return;i[f.key]=[...i[f.key]||[0,0,0]],i[f.key][+u.dataset.k]=$t(y.v)}if(f.onChange&&f.onChange(),f.type==="expr"){let y=an(i[f.key],r),g=u.nextElementSibling;if(g.className=y.ok?"":"bad",g.textContent=y.ok?String(i[f.key]).trim()===Me(y.v)?"":"= "+Me(y.v):y.err,t.onField){y.ok&&t.onField(f);return}e.refreshHighlights(),e.rebuild()}else t.onField&&t.onField(f),e.cmdChanged()};u.addEventListener(f.type==="expr"?"input":"change",m),f.type==="xyz"&&u.addEventListener("change",()=>e.cmdChanged())}if(c!=null){let u=n.querySelector(`[data-i="${c}"]`);u&&u.focus()}else{let u=n.querySelector("input[data-i]:not([type=checkbox])");u&&!e.cmd.want&&(u.focus(),u.select())}}enterSketch(){this.tab="sketch",this.renderRibbon(),document.body.classList.add("sketching"),Re("#sketchPanel").hidden=!1,this.renderSketchPanel(),this.renderTree()}exitSketch(){document.body.classList.remove("sketching"),Re("#sketchPanel").hidden=!0,this.tab="model",this.renderRibbon(),this.renderTree()}sketchSelection(){this.renderSketchPanel()}sketchInfo(e){let t=Re("#sketchStats");if(!t)return;let n=(e.loops||[]).filter(r=>r.depth%2===0).length,i=(e.evals||[]).filter(r=>r.err);t.innerHTML=`${n?`<span class="good">\u2714 ${n} closed shape${n>1?"s":""}</span>`:'<span class="muted">No closed shape yet</span>'}${e.openEnds?` \xB7 <span class="bad">${e.openEnds} open chain${e.openEnds>1?"s":""} (red dots)</span>`:""}${i.length?` \xB7 <span class="bad">${Ce(i[0].err)}</span>`:""}`}setGridStep(e){let t=Re("#gridStep");t&&(t.textContent=this.app.sk.gridOn?`grid ${Me(e)} ${this.app.units()}`:"grid off")}renderSketchPanel(){let e=this.app,t=e.sk,n=e.sketchFeature();if(!n)return;let i=e.params(),r=n.entities.filter(m=>t.sel.has(m.id)),o=`<div class="cmdhead"><span>${Ce(n.name)}</span></div>`;if(o+='<div class="note" id="sketchStats"></div>',o+='<div class="cmdbody">',t.tool==="polygon"&&(o+=`<label class="fld"><span>Polygon sides</span><input id="polySides" type="number" min="3" max="64" value="${t.polySides}"></label>`),r.length===1){let m=r[0],y={line:[["x1","Start X"],["y1","Start Y"],["x2","End X"],["y2","End Y"]],rect:[["x","Corner X"],["y","Corner Y"],["w","Width"],["h","Height"]],circle:[["cx","Center X"],["cy","Center Y"],["r","Radius"]],arc:[["x1","Start X"],["y1","Start Y"],["x2","End X"],["y2","End Y"],["xm","Through X"],["ym","Through Y"]],polygon:[["cx","Center X"],["cy","Center Y"],["r","Corner radius"],["n","Sides"],["rot","Turn (\xB0)"]],slot:[["x1","End 1 X"],["y1","End 1 Y"],["x2","End 2 X"],["y2","End 2 Y"],["w","Width"]]}[m.type]||[];o+=`<div class="subhead">${{line:"Line",rect:"Rectangle",circle:"Circle",arc:"Arc",polygon:"Polygon",slot:"Slot"}[m.type]}${m.construction?" (construction)":""}</div>`;for(let[p,w]of y){let b=an(m[p],i);o+=`<label class="fld"><span>${w}</span><input data-k="${p}" value="${Ce(m[p])}" spellcheck="false"><em class="${b.ok?"":"bad"}">${b.ok?String(m[p]).trim()===Me(b.v)?"":"= "+Me(b.v):Ce(b.err)}</em></label>`}o+=`<label class="chk"><input type="checkbox" id="consChk" ${m.construction?"checked":""}> Construction (dashed helper line, not part of the shape)</label>`}else r.length>1?o+=`<div class="note">${r.length} items picked. Press Delete to remove them, or X for construction.</div>`:o+=`<div class="note muted">${Ce(zy[t.tool]||"")}</div>`;let a=n.offset??0,l=an(a,i);o+=`<details class="planeopts"><summary>Sketch plane</summary><label class="fld"><span>Offset from plane (${e.units()})</span><input id="planeOff" value="${Ce(a)}"><em class="${l.ok?"":"bad"}">${l.ok?"":Ce(l.err)}</em></label></details>`,o+=`</div><div class="cmdfoot"><span id="gridStep" class="muted"></span><button class="ok" id="finishBtn">${Qe("finish",16)} Finish Sketch</button></div>`;let c=Re("#sketchPanel"),h=document.activeElement&&c.contains(document.activeElement)?document.activeElement.dataset.k:null;c.innerHTML=o,this.sketchInfo(t),this.setGridStep(t.gridStep()),Re("#finishBtn").onclick=()=>e.exitSketch();let d=Re("#polySides");d&&(d.onchange=()=>{t.polySides=Math.max(3,Math.min(64,Math.round(+d.value||6)))});let u=Re("#consChk");u&&(u.onchange=()=>t.toggleConstruction());let f=Re("#planeOff");f.onchange=()=>{let m=an(f.value,i);if(!m.ok)return this.toast(m.err,"error");e.change(()=>{e.sketchFeature().offset=br(f.value)});let y=e.sketchId,g=e.sketchIsNew,p=e.savedCam;e.exitSketch(!0),e.enterSketch(y,g),e.savedCam=p};for(let m of c.querySelectorAll("input[data-k]"))m.addEventListener("change",()=>{let y=r[0],g=an(m.value,i);if(!g.ok){this.toast(g.err,"error");return}let p=m.dataset.k,w=[an(y[p==="y1"?"x1":p==="y2"?"x2":p],i).v,an(y[p==="x1"?"y1":p==="x2"?"y2":p],i).v];e.change(()=>{let b=e.sketchFeature().entities.find(v=>v.id===y.id);if(["x1","y1","x2","y2"].includes(p)&&(y.type==="line"||y.type==="arc")){let v=p[1],C=t.coincident(w,{e:b,kx:"x"+v});b[p]=br(m.value);let R=an(b["x"+v],i).v,I=an(b["y"+v],i).v;for(let U of C)U.e[U.kx]=$t(R),U.e[U.ky]=$t(I)}else b[p]=br(m.value)}),t.recompute(),t.redraw(),this.renderSketchPanel()});if(h){let m=c.querySelector(`[data-k="${h}"]`);m&&m.focus()}}openParams(){let e=this.app,t=()=>{let n=e.params(),i=e.doc.params.map((r,o)=>{let a=an(r.expr,n);return`<tr><td><input data-i="${o}" data-f="name" value="${Ce(r.name)}" spellcheck="false"></td><td><input data-i="${o}" data-f="expr" value="${Ce(r.expr)}" spellcheck="false"></td><td class="${a.ok?"":"bad"}">${a.ok?Me(a.v):Ce(a.err)}</td><td><input data-i="${o}" data-f="note" value="${Ce(r.note||"")}" placeholder="what it is for"></td><td><button class="mini danger" data-del="${o}">\u2715</button></td></tr>`}).join("");this.modal(`<h2>${Qe("params",22)} Parameters</h2>
        <p>Name a size once and use the name anywhere you type a number, like <code>width</code> or <code>width/2 + 3</code>. Change it here and the whole part updates.</p>
        <table class="ptable"><thead><tr><th>Name</th><th>Value or formula</th><th>=</th><th>Note</th><th></th></tr></thead><tbody>${i||'<tr><td colspan="5" class="muted">No parameters yet.</td></tr>'}</tbody></table>
        <p><button id="addParam">+ Add parameter</button></p>
        <p class="muted">Formulas can use + \u2212 \xD7 \xF7 (written * and /), ^ for powers, brackets, other parameter names, pi, sqrt(), sin(), cos(), tan() (in degrees), min(), max(), round().</p>`,"wide"),Re("#addParam").onclick=()=>{let r=1;for(;e.doc.params.some(o=>o.name==="size"+r);)r++;e.change(()=>e.doc.params.push({name:"size"+r,expr:"10",note:""})),t()};for(let r of document.querySelectorAll("#modal [data-del]"))r.onclick=()=>{let o=e.doc.params[+r.dataset.del];JSON.stringify(e.doc.features).match(new RegExp(`\\b${o.name}\\b`))&&!confirm(`"${o.name}" is used in the part. Delete it anyway? (Those features will show an error.)`)||(e.change(()=>e.doc.params.splice(+r.dataset.del,1)),t())};for(let r of document.querySelectorAll("#modal input[data-i]"))r.onchange=()=>{let o=+r.dataset.i,a=r.dataset.f,l=r.value.trim();if(a==="name"){if(!/^[A-Za-z_][A-Za-z_0-9]*$/.test(l)){this.toast("Names use letters, numbers and _ and start with a letter.","error"),t();return}if(["pi","PI","sin","cos","tan","sqrt","abs","min","max","round","floor","ceil"].includes(l)){this.toast(`"${l}" is a built-in name. Pick another.`,"error"),t();return}if(e.doc.params.some((d,u)=>u!==o&&d.name===l)){this.toast("That name is taken.","error"),t();return}let c=e.doc.params[o].name,h=c&&c!==l&&confirm(`Also change "${c}" to "${l}" everywhere it is used?`);e.change(()=>{if(e.doc.params[o].name=l,h){let d=new RegExp(`\\b${c}\\b`,"g"),u=f=>{for(let m in f)typeof f[m]=="string"&&m!=="id"&&m!=="name"&&m!=="type"?f[m]=f[m].replace(d,l):f[m]&&typeof f[m]=="object"&&u(f[m])};u(e.doc.features);for(let f of e.doc.params)f.expr=String(f.expr).replace(d,l)}})}else e.change(()=>{e.doc.params[o][a]=a==="expr"?br(l):l});t(),e.mode==="sketch"&&e.sk.redraw(),e.cmd&&this.refreshCmd()}};t()}openUnits(){let e=this.app,t=e.mode==="assembly",n=t?e.asm:e.doc,i=n.units||"mm",r=t?new Set:Yu(n),o=t?[]:n.params;this.modal(`<h2>${Qe("units",22)} Units for ${Ce(n.name)}</h2>
      <p>${t?"Positions and gaps in this assembly use these units. Each part keeps its own units and is sized correctly when placed.":"Every size you type in this part uses these units. Exported STL and STEP files are always in millimetres, which is what 3D printers and other CAD programs expect."}</p>
      ${Object.entries(xc).map(([a,l])=>`<label class="chk"><input type="radio" name="un" value="${a}" ${a===i?"checked":""}> ${l}</label>`).join("")}
      <label class="chk"><input type="checkbox" id="unConv" checked> Convert the sizes so the ${t?"assembly":"part"} stays the same real size</label>
      ${o.length?`<div class="fld" id="unParams"><span>Parameters to convert (tick the ones that are lengths)</span><div class="multi">${o.map(a=>`<label class="chk"><input type="checkbox" data-p="${Ce(a.name)}" ${r.has(a.name)?"checked":""}> ${Ce(a.name)} = ${Ce(a.expr)}</label>`).join("")}</div></div>`:""}
      <p class="muted">Untick "Convert" to keep the numbers as they are (a 10 mm block becomes a 10 in block).</p>
      <div class="welcomebtns"><button class="ok" id="unOk">Apply</button><button id="unNo">Cancel</button></div>`),Re("#unNo").onclick=()=>this.closeModal(),Re("#unOk").onclick=()=>{let a=document.querySelector("#modal input[name=un]:checked").value,l=Re("#unConv").checked,c=new Set([...document.querySelectorAll("#modal [data-p]")].filter(d=>d.checked).map(d=>d.dataset.p));if(this.closeModal(),a===i)return;let h=0;e.change(()=>{if(n.units=a,!l)return;let d=ln[i]/ln[a];t?Ju(n,d):h=Zu(n,d,c)}),e.mode==="sketch"&&(e.sk.recompute(),e.sk.redraw()),this.renderStatusInfo(),this.toast(`Now using ${xc[a]}.`+(h?` ${h} formula(s) with numbers in them were left as typed; check them.`:""),h?"warn":"")}}openInfo(){this.infoOpen=!0,this.renderInfo()}renderInfo(){let e=this.app,t=e.result.desc,n=e.doc,i=Ba[n.material]||Ba.pla,r='<p class="muted">There is no solid yet.</p>';if(t){let o=t.bb[1].map((u,f)=>u-t.bb[0][f]),a=n.units||"mm",l=ln[a],c=t.volume*l*l*l,h=t.area*l*l,d=c/1e3*i.density;r=`<table class="info">
        <tr><th>Size (X \xD7 Y \xD7 Z)</th><td>${o.map(Me).join(" \xD7 ")} ${a}</td></tr>
        <tr><th>Volume</th><td>${a==="in"?`${Me(t.volume)} in\xB3 <span class="muted">(${Me(c/1e3)} cm\xB3)</span>`:`${Me(c/1e3)} cm\xB3 <span class="muted">(${Me(c)} mm\xB3)</span>`}</td></tr>
        <tr><th>Surface area</th><td>${a==="in"?`${Me(t.area)} in\xB2 <span class="muted">(${Me(h/100)} cm\xB2)</span>`:`${Me(h/100)} cm\xB2 <span class="muted">(${Me(h)} mm\xB2)</span>`}</td></tr>
        <tr><th>Mass in ${Ce(i.name)}</th><td><b>${d>=1e3?Me(d/1e3)+" kg":Me(d)+" g"}</b> <span class="muted">(${Me(d/453.592)} lb \xB7 density ${i.density} g/cm\xB3)</span></td></tr>
        <tr><th>Faces / edges</th><td>${t.faces.length} / ${t.edges.length}</td></tr>
      </table>`}this.modal(`<h2>${Qe("info",22)} Part Info: ${Ce(n.name)}</h2>${r}
      <label class="fld"><span>Material</span><select id="matSel">${Object.entries(Ba).map(([o,a])=>`<option value="${o}" ${o===n.material?"selected":""}>${Ce(a.name)}</option>`).join("")}</select></label>
      <label class="fld"><span>Color on screen</span><input type="color" id="colorSel" value="${Ce(n.color)}"></label>`,"",()=>{this.infoOpen=!1}),Re("#matSel").onchange=o=>{e.change(()=>{e.doc.material=o.target.value}),this.renderInfo()},Re("#colorSel").oninput=o=>{e.doc.color=o.target.value,this.vp.setColor(o.target.value)},Re("#colorSel").onchange=o=>e.change(()=>{e.doc.color=o.target.value})}renderStatusInfo(){if(this.app.mode==="assembly"){let n=this.app.asm,i=Object.keys(this.app.asmr.bad).length;Re("#statusRight").innerHTML=`${i?`<span class="bad">${i} constraint${i>1?"s":""} not met</span> \xB7 `:""}${n.components.length} parts \xB7 ${n.constraints.length} constraints \xB7 <button class="linkbtn" id="unitBtn" title="Change units">${Ce(n.units||"mm")}</button>`,Re("#unitBtn").onclick=()=>this.openUnits();return}let e=this.app.result.desc,t=Object.keys(this.app.result.errors||{}).length;Re("#statusRight").innerHTML=`${t?`<span class="bad">${t} feature${t>1?"s":""} with problems</span> \xB7 `:""}${e?this.app.units()==="in"?`Volume ${Me(e.volume)} in\xB3 \xB7 `:`Volume ${Me(e.volume/1e3)} cm\xB3 \xB7 `:""}<button class="linkbtn" id="unitBtn" title="Change units">${this.app.units()}</button> \xB7 ${this.app.result.ms?Math.round(this.app.result.ms)+" ms":""}`,Re("#unitBtn").onclick=()=>this.openUnits()}modal(e,t="",n){let i=Re("#modal");i.hidden=!1,i.innerHTML=`<div class="mbox ${t}"><button class="x mclose" title="Close">\xD7</button>${e}</div>`,this._onClose=n,i.querySelector(".mclose").onclick=()=>this.closeModal(),i.onclick=r=>{r.target===i&&this.closeModal()}}askText(e,t,n){this.modal(`<h2>${Ce(e)}</h2><label class="fld"><input id="askInp" value="${Ce(t)}" spellcheck="false"></label><div class="welcomebtns"><button class="ok" id="askOk">OK</button><button id="askNo">Cancel</button></div>`);let i=Re("#askInp");i.focus(),i.select();let r=()=>{let o=i.value.trim();this.closeModal(),o&&o!==t&&n(o)};Re("#askOk").onclick=r,Re("#askNo").onclick=()=>this.closeModal(),i.onkeydown=o=>{o.stopPropagation(),o.key==="Enter"&&r(),o.key==="Escape"&&this.closeModal()}}modalOpen(){return!Re("#modal").hidden}closeModal(){let e=Re("#modal");if(e.hidden=!0,e.innerHTML="",this._onClose){let t=this._onClose;this._onClose=null,t()}}openExamples(){this.modal(`<h2>${Qe("examples",22)} Examples</h2><p>Open one to see how it was built. Double-click any step in the tree to change it.</p><h3>Parts</h3><div class="excards">${ai.map((t,n)=>`<button class="excard" data-i="${n}"><b>${Ce(t.title)}</b><span>${Ce(t.about)}</span></button>`).join("")}</div><h3>Assemblies</h3><div class="excards">${_c.map((t,n)=>`<button class="excard" data-a="${n}"><b>${Ce(t.title)}</b><span>${Ce(t.about)}</span></button>`).join("")}</div>`,"wide");let e=()=>{let t=this.app.root;return t.features&&t.features.length||t.components&&t.components.length};for(let t of document.querySelectorAll(".excard[data-i]"))t.onclick=()=>{e()&&!confirm("Open the example? What is open now is replaced (save it first if you want to keep it).")||(this.closeModal(),this.app.setDoc(Sc(ai[+t.dataset.i].doc)))};for(let t of document.querySelectorAll(".excard[data-a]"))t.onclick=()=>{e()&&!confirm("Open the example? What is open now is replaced (save it first if you want to keep it).")||(this.closeModal(),this.app.openAssembly(Sc(_c[+t.dataset.a].doc)))}}showWelcome(){this.modal(`<img class="welcomelogo" src="assets/logo.png" alt="Pathway CAD">
      <p>Design real 3D parts, then export them for a 3D printer or another CAD program.</p>
      <ol class="steps"><li><b>Sketch</b> a flat shape on a plane.</li><li><b>Extrude</b> or <b>Revolve</b> it into a solid.</li><li>Add <b>holes, fillets and patterns</b>.</li><li><b>Export STL</b> to 3D print it.</li></ol>
      <p><b>Mouse:</b> right-drag turns the view, middle-drag (or Shift + right-drag) slides it, the wheel zooms.</p>
      <div class="welcomebtns"><button class="ok" id="wStart">Start a new part</button><button id="wAsm">New assembly</button><button id="wEx">Open an example</button><button id="wHelp">How to</button></div>`),Re("#wAsm").onclick=()=>{this.closeModal(),this.app.openAssembly(Fa()),this.app.asmr.placeDialog()},Re("#wStart").onclick=()=>{this.closeModal(),this.app.run("sketch")},Re("#wEx").onclick=()=>this.openExamples(),Re("#wHelp").onclick=()=>this.openHelp()}openHelp(){this.modal(`<h2><img class="helplogo" src="assets/icon-256.png" alt="">How to use Pathway CAD</h2>
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
      </div>`,"wide")}status(e){Re("#statusMsg").textContent=e||""}toast(e,t=""){let n=document.createElement("div");n.className="toast "+t,n.textContent=e,Re("#toasts").appendChild(n),setTimeout(()=>n.classList.add("out"),t==="error"?5200:3400),setTimeout(()=>n.remove(),t==="error"?5800:4e3)}busy(e){Re("#busy").hidden=!e}loading(e,t){let n=Re("#loading");if(!e){n.hidden=!0;return}n.hidden=!1,n.querySelector("p").textContent=e,n.classList.toggle("bad",!!t)}},zy={select:"Pick a shape to see and edit its numbers.",line:"Line: click, click, click\u2026 Click the first point again to close the shape.",rect:"Rectangle: click two opposite corners.",circle:"Circle: click the center, then the edge.",arc:"Arc: start, end, then a point it passes through.",polygon:"Polygon: click the center, then a corner.",slot:"Slot: click both end centers, then the width."};function br(s){let e=String(s).trim();return/^-?\d*\.?\d+(e-?\d+)?$/i.test(e)?parseFloat(e):e}function id(s,e){return s.sketch===e.id||(s.features||[]).includes(e.id)}window.addEventListener("DOMContentLoaded",()=>{window.pathwayCad=new wc});export{Ba as MATERIALS,Ui as newDoc};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
