var Oe={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wh=0,Ul=1,Eh=2;var Fl=1,Th=2,Pn=3,Hn=0,Xe=1,_e=2,Wn=0,bi=1,Ol=2,Bl=3,zl=4,Ah=5,ei=100,Ch=101,Rh=102,Ph=103,Ih=104,Dh=200,kh=201,Lh=202,Nh=203,oo=204,ao=205,Uh=206,Fh=207,Oh=208,Bh=209,zh=210,Hh=211,Vh=212,Gh=213,Wh=214,Fo=0,Oo=1,Bo=2,Mi=3,zo=4,Ho=5,Vo=6,Go=7,Hl=0,$h=1,Xh=2,$n=0,qh=1,Yh=2,Zh=3,Kh=4,Jh=5,jh=6,Qh=7;var Vl=300,Pi=301,Ii=302,Wo=303,$o=304,xr=306,lo=1e3,ti=1001,co=1002,pn=1003,td=1004;var _r=1005;var bn=1006,Xo=1007;var oi=1008;var En=1009,Gl=1010,Wl=1011,ys=1012,qo=1013,ai=1014,In=1015,xs=1016,Yo=1017,Zo=1018,_s=1020,$l=35902,Xl=35899,ql=1021,Yl=1022,gn=1023,ss=1026,vs=1027,Zl=1028,Ko=1029,Kl=1030,Jo=1031;var jo=1033,vr=33776,br=33777,Mr=33778,Sr=33779,Qo=35840,ta=35841,ea=35842,na=35843,ia=36196,sa=37492,ra=37496,oa=37808,aa=37809,la=37810,ca=37811,ha=37812,da=37813,ua=37814,fa=37815,pa=37816,ma=37817,ga=37818,ya=37819,xa=37820,_a=37821,va=36492,ba=36494,Ma=36495,Sa=36283,wa=36284,Ea=36285,Ta=36286;var Vs=2300,ho=2301,ro=2302,Sl=2400,wl=2401,El=2402;var ed=3200,nd=3201;var Jl=0,id=1,Xn="",sn="srgb",Si="srgb-linear",Gs="linear",te="srgb";var vi=7680;var Tl=519,sd=512,rd=513,od=514,jl=515,ad=516,ld=517,cd=518,hd=519,Al=35044;var Ql="300 es",vn=2e3,Ws=2001;var An=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$c=1234567,es=Math.PI/180,rs=180/Math.PI;function Di(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[s&255]+Le[s>>8&255]+Le[s>>16&255]+Le[s>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function Vt(s,t,e){return Math.max(t,Math.min(e,s))}function tc(s,t){return(s%t+t)%t}function wu(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Eu(s,t,e){return s!==t?(e-s)/(t-s):0}function Bs(s,t,e){return(1-e)*s+e*t}function Tu(s,t,e,n){return Bs(s,t,1-Math.exp(-e*n))}function Au(s,t=1){return t-Math.abs(tc(s,t*2)-t)}function Cu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Ru(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Pu(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Iu(s,t){return s+Math.random()*(t-s)}function Du(s){return s*(.5-Math.random())}function ku(s){s!==void 0&&($c=s);let t=$c+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Lu(s){return s*es}function Nu(s){return s*rs}function Uu(s){return(s&s-1)===0&&s!==0}function Fu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ou(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Bu(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),p=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ts(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function We(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var ec={DEG2RAD:es,RAD2DEG:rs,generateUUID:Di,clamp:Vt,euclideanModulo:tc,mapLinear:wu,inverseLerp:Eu,lerp:Bs,damp:Tu,pingpong:Au,smoothstep:Cu,smootherstep:Ru,randInt:Pu,randFloat:Iu,randFloatSpread:Du,seededRandom:ku,degToRad:Lu,radToDeg:Nu,isPowerOfTwo:Uu,ceilPowerOfTwo:Fu,floorPowerOfTwo:Ou,setQuaternionFromProperEuler:Bu,normalize:We,denormalize:ts},ot=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xe=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[o+0],f=r[o+1],p=r[o+2],y=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=p,t[e+3]=y;return}if(d!==y||l!==u||c!==f||h!==p){let g=1-a,m=l*u+c*f+h*p+d*y,w=m>=0?1:-1,b=1-m*m;if(b>Number.EPSILON){let T=Math.sqrt(b),E=Math.atan2(T,m*w);g=Math.sin(g*E)/T,a=Math.sin(a*E)/T}let _=a*w;if(l=l*g+u*_,c=c*g+f*_,h=h*g+p*_,d=d*g+y*_,g===1-a){let T=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=T,c*=T,h*=T,d*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],p=r[o+3];return t[e]=a*p+h*d+l*f-c*u,t[e+1]=l*p+h*u+c*d-a*f,t[e+2]=c*p+h*f+a*u-l*d,t[e+3]=h*p-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ka.copy(this).projectOnVector(t),this.sub(Ka)}reflect(t){return this.sub(Ka.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ka=new P,Xc=new xe,Bt=class s{constructor(t,e,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],y=i[0],g=i[3],m=i[6],w=i[1],b=i[4],_=i[7],T=i[2],E=i[5],C=i[8];return r[0]=o*y+a*w+l*T,r[3]=o*g+a*b+l*E,r[6]=o*m+a*_+l*C,r[1]=c*y+h*w+d*T,r[4]=c*g+h*b+d*E,r[7]=c*m+h*_+d*C,r[2]=u*y+f*w+p*T,r[5]=u*g+f*b+p*E,r[8]=u*m+f*_+p*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,p=e*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return t[0]=d*y,t[1]=(i*c-h*n)*y,t[2]=(a*n-i*o)*y,t[3]=u*y,t[4]=(h*e-i*l)*y,t[5]=(i*r-a*e)*y,t[6]=f*y,t[7]=(n*l-c*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ja.makeScale(t,e)),this}rotate(t){return this.premultiply(Ja.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ja.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Ja=new Bt;function nc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function $s(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function dd(){let s=$s("canvas");return s.style.display="block",s}var qc={};function os(s){s in qc||(qc[s]=!0,console.warn(s))}function ud(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Yc=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zc=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zu(){let s={enabled:!0,workingColorSpace:Si,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===te&&(i.r=zn(i.r),i.g=zn(i.g),i.b=zn(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===te&&(i.r=ns(i.r),i.g=ns(i.g),i.b=ns(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Xn?Gs:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return os("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return os("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Si]:{primaries:t,whitePoint:n,transfer:Gs,toXYZ:Yc,fromXYZ:Zc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:t,whitePoint:n,transfer:te,toXYZ:Yc,fromXYZ:Zc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}}),s}var Yt=zu();function zn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ns(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Vi,uo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Vi===void 0&&(Vi=$s("canvas")),Vi.width=t.width,Vi.height=t.height;let i=Vi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Vi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=$s("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=zn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(zn(e[n]/255)*255):e[n]=zn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Hu=0,as=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=Di(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(ja(i[o].image)):r.push(ja(i[o]))}else r=ja(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function ja(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?uo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Vu=0,Qa=new P,rn=class s extends An{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=ti,i=ti,r=bn,o=oi,a=gn,l=En,c=s.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=Di(),this.name="",this.source=new as(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qa).x}get height(){return this.source.getSize(Qa).y}get depth(){return this.source.getSize(Qa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case lo:t.x=t.x-Math.floor(t.x);break;case ti:t.x=t.x<0?0:1;break;case co:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case lo:t.y=t.y-Math.floor(t.y);break;case ti:t.y=t.y<0?0:1;break;case co:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=Vl;rn.DEFAULT_ANISOTROPY=1;var ge=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],y=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(c+1)/2,_=(f+1)/2,T=(m+1)/2,E=(h+u)/4,C=(d+y)/4,D=(p+g)/4;return b>_&&b>T?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=E/n,r=C/n):_>T?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=E/i,r=D/i):T<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(T),n=C/r,i=D/r),this.set(n,i,r,e),this}let w=Math.sqrt((g-p)*(g-p)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(g-p)/w,this.y=(d-y)/w,this.z=(u-h)/w,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},fo=class extends An{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);let i={width:t,height:e,depth:n.depth},r=new rn(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:bn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new as(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cn=class extends fo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Xs=class extends rn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=pn,this.minFilter=pn,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var po=class extends rn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=pn,this.minFilter=pn,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var mn=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(yn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(yn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=yn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,yn):yn.fromBufferAttribute(r,o),yn.applyMatrix4(t.matrixWorld),this.expandByPoint(yn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ir.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ir.copy(n.boundingBox)),Ir.applyMatrix4(t.matrixWorld),this.union(Ir)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,yn),yn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ks),Dr.subVectors(this.max,ks),Gi.subVectors(t.a,ks),Wi.subVectors(t.b,ks),$i.subVectors(t.c,ks),Yn.subVectors(Wi,Gi),Zn.subVectors($i,Wi),gi.subVectors(Gi,$i);let e=[0,-Yn.z,Yn.y,0,-Zn.z,Zn.y,0,-gi.z,gi.y,Yn.z,0,-Yn.x,Zn.z,0,-Zn.x,gi.z,0,-gi.x,-Yn.y,Yn.x,0,-Zn.y,Zn.x,0,-gi.y,gi.x,0];return!tl(e,Gi,Wi,$i,Dr)||(e=[1,0,0,0,1,0,0,0,1],!tl(e,Gi,Wi,$i,Dr))?!1:(kr.crossVectors(Yn,Zn),e=[kr.x,kr.y,kr.z],tl(e,Gi,Wi,$i,Dr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,yn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(yn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ln=[new P,new P,new P,new P,new P,new P,new P,new P],yn=new P,Ir=new mn,Gi=new P,Wi=new P,$i=new P,Yn=new P,Zn=new P,gi=new P,ks=new P,Dr=new P,kr=new P,yi=new P;function tl(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){yi.fromArray(s,r);let a=i.x*Math.abs(yi.x)+i.y*Math.abs(yi.y)+i.z*Math.abs(yi.z),l=t.dot(yi),c=e.dot(yi),h=n.dot(yi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Gu=new mn,Ls=new P,el=new P,ni=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Gu.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ls.subVectors(t,this.center);let e=Ls.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ls,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(el.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ls.copy(t.center).add(el)),this.expandByPoint(Ls.copy(t.center).sub(el))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Nn=new P,nl=new P,Lr=new P,Kn=new P,il=new P,Nr=new P,sl=new P,Vn=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){nl.copy(t).add(e).multiplyScalar(.5),Lr.copy(e).sub(t).normalize(),Kn.copy(this.origin).sub(nl);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Lr),a=Kn.dot(this.direction),l=-Kn.dot(Lr),c=Kn.lengthSq(),h=Math.abs(1-o*o),d,u,f,p;if(h>0)if(d=o*l-a,u=o*a-l,p=r*h,d>=0)if(u>=-p)if(u<=p){let y=1/h;d*=y,u*=y,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(nl).addScaledVector(Lr,u),f}intersectSphere(t,e){Nn.subVectors(t.center,this.origin);let n=Nn.dot(this.direction),i=Nn.dot(Nn)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,n,i,r){il.subVectors(e,t),Nr.subVectors(n,t),sl.crossVectors(il,Nr);let o=this.direction.dot(sl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Kn.subVectors(this.origin,t);let l=a*this.direction.dot(Nr.crossVectors(Kn,Nr));if(l<0)return null;let c=a*this.direction.dot(il.cross(Kn));if(c<0||l+c>o)return null;let h=-a*Kn.dot(sl);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ee=class s{constructor(t,e,n,i,r,o,a,l,c,h,d,u,f,p,y,g){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,d,u,f,p,y,g)}set(t,e,n,i,r,o,a,l,c,h,d,u,f,p,y,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=y,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),o=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,p=a*h,y=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+p*c,e[5]=u-y*c,e[9]=-a*l,e[2]=y-u*c,e[6]=p+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,p=c*h,y=c*d;e[0]=u+y*a,e[4]=p*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=y+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,p=c*h,y=c*d;e[0]=u-y*a,e[4]=-o*d,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=y-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,p=a*h,y=a*d;e[0]=l*h,e[4]=p*c-f,e[8]=u*c+y,e[1]=l*d,e[5]=y*c+u,e[9]=f*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,p=a*l,y=a*c;e[0]=l*h,e[4]=y-u*d,e[8]=p*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+p,e[10]=u-y*d}else if(t.order==="XZY"){let u=o*l,f=o*c,p=a*l,y=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+y,e[5]=o*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=a*h,e[10]=y*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Wu,t,$u)}lookAt(t,e,n){let i=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),Jn.crossVectors(n,en),Jn.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),Jn.crossVectors(n,en)),Jn.normalize(),Ur.crossVectors(en,Jn),i[0]=Jn.x,i[4]=Ur.x,i[8]=en.x,i[1]=Jn.y,i[5]=Ur.y,i[9]=en.y,i[2]=Jn.z,i[6]=Ur.z,i[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],y=n[6],g=n[10],m=n[14],w=n[3],b=n[7],_=n[11],T=n[15],E=i[0],C=i[4],D=i[8],S=i[12],v=i[1],R=i[5],L=i[9],U=i[13],B=i[2],$=i[6],G=i[10],q=i[14],V=i[3],Z=i[7],Q=i[11],ut=i[15];return r[0]=o*E+a*v+l*B+c*V,r[4]=o*C+a*R+l*$+c*Z,r[8]=o*D+a*L+l*G+c*Q,r[12]=o*S+a*U+l*q+c*ut,r[1]=h*E+d*v+u*B+f*V,r[5]=h*C+d*R+u*$+f*Z,r[9]=h*D+d*L+u*G+f*Q,r[13]=h*S+d*U+u*q+f*ut,r[2]=p*E+y*v+g*B+m*V,r[6]=p*C+y*R+g*$+m*Z,r[10]=p*D+y*L+g*G+m*Q,r[14]=p*S+y*U+g*q+m*ut,r[3]=w*E+b*v+_*B+T*V,r[7]=w*C+b*R+_*$+T*Z,r[11]=w*D+b*L+_*G+T*Q,r[15]=w*S+b*U+_*q+T*ut,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],y=t[7],g=t[11],m=t[15];return p*(+r*l*d-i*c*d-r*a*u+n*c*u+i*a*f-n*l*f)+y*(+e*l*f-e*c*u+r*o*u-i*o*f+i*c*h-r*l*h)+g*(+e*c*d-e*a*f-r*o*d+n*o*f+r*a*h-n*c*h)+m*(-i*a*h-e*l*d+e*a*u+i*o*d-n*o*u+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],y=t[13],g=t[14],m=t[15],w=d*g*c-y*u*c+y*l*f-a*g*f-d*l*m+a*u*m,b=p*u*c-h*g*c-p*l*f+o*g*f+h*l*m-o*u*m,_=h*y*c-p*d*c+p*a*f-o*y*f-h*a*m+o*d*m,T=p*d*l-h*y*l-p*a*u+o*y*u+h*a*g-o*d*g,E=e*w+n*b+i*_+r*T;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/E;return t[0]=w*C,t[1]=(y*u*r-d*g*r-y*i*f+n*g*f+d*i*m-n*u*m)*C,t[2]=(a*g*r-y*l*r+y*i*c-n*g*c-a*i*m+n*l*m)*C,t[3]=(d*l*r-a*u*r-d*i*c+n*u*c+a*i*f-n*l*f)*C,t[4]=b*C,t[5]=(h*g*r-p*u*r+p*i*f-e*g*f-h*i*m+e*u*m)*C,t[6]=(p*l*r-o*g*r-p*i*c+e*g*c+o*i*m-e*l*m)*C,t[7]=(o*u*r-h*l*r+h*i*c-e*u*c-o*i*f+e*l*f)*C,t[8]=_*C,t[9]=(p*d*r-h*y*r-p*n*f+e*y*f+h*n*m-e*d*m)*C,t[10]=(o*y*r-p*a*r+p*n*c-e*y*c-o*n*m+e*a*m)*C,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*f-e*a*f)*C,t[12]=T*C,t[13]=(h*y*i-p*d*i+p*n*u-e*y*u-h*n*g+e*d*g)*C,t[14]=(p*a*i-o*y*i-p*n*l+e*y*l+o*n*g-e*a*g)*C,t[15]=(o*d*i-h*a*i+h*n*l-e*d*l-o*n*u+e*a*u)*C,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,p=r*d,y=o*h,g=o*d,m=a*d,w=l*c,b=l*h,_=l*d,T=n.x,E=n.y,C=n.z;return i[0]=(1-(y+m))*T,i[1]=(f+_)*T,i[2]=(p-b)*T,i[3]=0,i[4]=(f-_)*E,i[5]=(1-(u+m))*E,i[6]=(g+w)*E,i[7]=0,i[8]=(p+b)*C,i[9]=(g-w)*C,i[10]=(1-(u+y))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=Xi.set(i[0],i[1],i[2]).length(),o=Xi.set(i[4],i[5],i[6]).length(),a=Xi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],xn.copy(this);let c=1/r,h=1/o,d=1/a;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=d,xn.elements[9]*=d,xn.elements[10]*=d,e.setFromRotationMatrix(xn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=vn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),p,y;if(l)p=r/(o-r),y=o*r/(o-r);else if(a===vn)p=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Ws)p=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=vn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i),p,y;if(l)p=1/(o-r),y=o/(o-r);else if(a===vn)p=-2/(o-r),y=-(o+r)/(o-r);else if(a===Ws)p=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Xi=new P,xn=new ee,Wu=new P(0,0,0),$u=new P(1,1,1),Jn=new P,Ur=new P,en=new P,Kc=new ee,Jc=new xe,Mn=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Kc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Kc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Jc.setFromEuler(this),this.setFromQuaternion(Jc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Mn.DEFAULT_ORDER="XYZ";var ls=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Xu=0,jc=new P,qi=new xe,Un=new ee,Fr=new P,Ns=new P,qu=new P,Yu=new xe,Qc=new P(1,0,0),th=new P(0,1,0),eh=new P(0,0,1),nh={type:"added"},Zu={type:"removed"},Yi={type:"childadded",child:null},rl={type:"childremoved",child:null},Se=class s extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=Di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new P,e=new Mn,n=new xe,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ee},normalMatrix:{value:new Bt}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ls,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.multiply(qi),this}rotateOnWorldAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.premultiply(qi),this}rotateX(t){return this.rotateOnAxis(Qc,t)}rotateY(t){return this.rotateOnAxis(th,t)}rotateZ(t){return this.rotateOnAxis(eh,t)}translateOnAxis(t,e){return jc.copy(t).applyQuaternion(this.quaternion),this.position.add(jc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Qc,t)}translateY(t){return this.translateOnAxis(th,t)}translateZ(t){return this.translateOnAxis(eh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fr.copy(t):Fr.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Ns,Fr,this.up):Un.lookAt(Fr,Ns,this.up),this.quaternion.setFromRotationMatrix(Un),i&&(Un.extractRotation(i.matrixWorld),qi.setFromRotationMatrix(Un),this.quaternion.premultiply(qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(nh),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Zu),rl.child=t,this.dispatchEvent(rl),rl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(nh),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,t,qu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,Yu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};Se.DEFAULT_UP=new P(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _n=new P,Fn=new P,ol=new P,On=new P,Zi=new P,Ki=new P,ih=new P,al=new P,ll=new P,cl=new P,hl=new ge,dl=new ge,ul=new ge,Bn=class s{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),_n.subVectors(t,e),i.cross(_n);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){_n.subVectors(i,e),Fn.subVectors(n,e),ol.subVectors(t,e);let o=_n.dot(_n),a=_n.dot(Fn),l=_n.dot(ol),c=Fn.dot(Fn),h=Fn.dot(ol),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,p=(o*h-a*l)*u;return r.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,On)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,On.x),l.addScaledVector(o,On.y),l.addScaledVector(a,On.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return hl.setScalar(0),dl.setScalar(0),ul.setScalar(0),hl.fromBufferAttribute(t,e),dl.fromBufferAttribute(t,n),ul.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(hl,r.x),o.addScaledVector(dl,r.y),o.addScaledVector(ul,r.z),o}static isFrontFacing(t,e,n,i){return _n.subVectors(n,e),Fn.subVectors(t,e),_n.cross(Fn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _n.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),_n.cross(Fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;Zi.subVectors(i,n),Ki.subVectors(r,n),al.subVectors(t,n);let l=Zi.dot(al),c=Ki.dot(al);if(l<=0&&c<=0)return e.copy(n);ll.subVectors(t,i);let h=Zi.dot(ll),d=Ki.dot(ll);if(h>=0&&d<=h)return e.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Zi,o);cl.subVectors(t,r);let f=Zi.dot(cl),p=Ki.dot(cl);if(p>=0&&f<=p)return e.copy(r);let y=f*c-l*p;if(y<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(Ki,a);let g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return ih.subVectors(r,i),a=(d-h)/(d-h+(f-p)),e.copy(i).addScaledVector(ih,a);let m=1/(g+y+u);return o=y*m,a=u*m,e.copy(n).addScaledVector(Zi,o).addScaledVector(Ki,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Or={h:0,s:0,l:0};function fl(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Nt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Yt.workingColorSpace){if(t=tc(t,1),e=Vt(e,0,1),n=Vt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=fl(o,r,t+1/3),this.g=fl(o,r,t),this.b=fl(o,r,t-1/3)}return Yt.colorSpaceToWorking(this,i),this}setStyle(t,e=sn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=sn){let n=fd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=zn(t.r),this.g=zn(t.g),this.b=zn(t.b),this}copyLinearToSRGB(t){return this.r=ns(t.r),this.g=ns(t.g),this.b=ns(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=sn){return Yt.workingToColorSpace(Ne.copy(this),t),Math.round(Vt(Ne.r*255,0,255))*65536+Math.round(Vt(Ne.g*255,0,255))*256+Math.round(Vt(Ne.b*255,0,255))}getHexString(t=sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.workingToColorSpace(Ne.copy(this),e);let n=Ne.r,i=Ne.g,r=Ne.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Yt.workingColorSpace){return Yt.workingToColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=sn){Yt.workingToColorSpace(Ne.copy(this),t);let e=Ne.r,n=Ne.g,i=Ne.b;return t!==sn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(jn),this.setHSL(jn.h+t,jn.s+e,jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(jn),t.getHSL(Or);let n=Bs(jn.h,Or.h,e),i=Bs(jn.s,Or.s,e),r=Bs(jn.l,Or.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ne=new Nt;Nt.NAMES=fd;var Ku=0,Rn=class extends An{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=Di(),this.name="",this.type="Material",this.blending=bi,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oo,this.blendDst=ao,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=Mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bi&&(n.blending=this.blending),this.side!==Hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oo&&(n.blendSrc=this.blendSrc),this.blendDst!==ao&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Fe=class extends Rn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=Hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Me=new P,Br=new ot,Ju=0,le=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ju++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Al,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Br.fromBufferAttribute(this,e),Br.applyMatrix3(t),this.setXY(e,Br.x,Br.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ts(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=We(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ts(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ts(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ts(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ts(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),i=We(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),i=We(i,this.array),r=We(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Al&&(t.usage=this.usage),t}};var qs=class extends le{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ys=class extends le{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ue=class extends le{constructor(t,e,n){super(new Float32Array(t),e,n)}},ju=0,fn=new ee,pl=new Se,Ji=new P,nn=new mn,Us=new mn,Re=new P,Kt=class s extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nc(t)?Ys:qs)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,n){return fn.makeTranslation(t,e,n),this.applyMatrix4(fn),this}scale(t,e,n){return fn.makeScale(t,e,n),this.applyMatrix4(fn),this}lookAt(t){return pl.lookAt(t),pl.updateMatrix(),this.applyMatrix4(pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ue(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ni);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Us.setFromBufferAttribute(a),this.morphTargetsRelative?(Re.addVectors(nn.min,Us.min),nn.expandByPoint(Re),Re.addVectors(nn.max,Us.max),nn.expandByPoint(Re)):(nn.expandByPoint(Us.min),nn.expandByPoint(Us.max))}nn.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Re.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Re));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Re.fromBufferAttribute(a,c),l&&(Ji.fromBufferAttribute(t,c),Re.add(Ji)),i=Math.max(i,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new le(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<n.count;D++)a[D]=new P,l[D]=new P;let c=new P,h=new P,d=new P,u=new ot,f=new ot,p=new ot,y=new P,g=new P;function m(D,S,v){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,v),u.fromBufferAttribute(r,D),f.fromBufferAttribute(r,S),p.fromBufferAttribute(r,v),h.sub(c),d.sub(c),f.sub(u),p.sub(u);let R=1/(f.x*p.y-p.x*f.y);isFinite(R)&&(y.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(R),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(R),a[D].add(y),a[S].add(y),a[v].add(y),l[D].add(g),l[S].add(g),l[v].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let D=0,S=w.length;D<S;++D){let v=w[D],R=v.start,L=v.count;for(let U=R,B=R+L;U<B;U+=3)m(t.getX(U+0),t.getX(U+1),t.getX(U+2))}let b=new P,_=new P,T=new P,E=new P;function C(D){T.fromBufferAttribute(i,D),E.copy(T);let S=a[D];b.copy(S),b.sub(T.multiplyScalar(T.dot(S))).normalize(),_.crossVectors(E,S);let R=_.dot(l[D])<0?-1:1;o.setXYZW(D,b.x,b.y,b.z,R)}for(let D=0,S=w.length;D<S;++D){let v=w[D],R=v.start,L=v.count;for(let U=R,B=R+L;U<B;U+=3)C(t.getX(U+0)),C(t.getX(U+1)),C(t.getX(U+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new le(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new P,r=new P,o=new P,a=new P,l=new P,c=new P,h=new P,d=new P;if(t)for(let u=0,f=t.count;u<f;u+=3){let p=t.getX(u+0),y=t.getX(u+1),g=t.getX(u+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,g),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let y=0,g=l.length;y<g;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new le(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},sh=new ee,xi=new Vn,zr=new ni,rh=new P,Hr=new P,Vr=new P,Gr=new P,ml=new P,Wr=new P,oh=new P,$r=new P,ce=class extends Se{constructor(t=new Kt,e=new Fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){Wr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(ml.fromBufferAttribute(d,t),o?Wr.addScaledVector(ml,h):Wr.addScaledVector(ml.sub(e),h))}e.add(Wr)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(r),xi.copy(t.ray).recast(t.near),!(zr.containsPoint(xi.origin)===!1&&(xi.intersectSphere(zr,rh)===null||xi.origin.distanceToSquared(rh)>(t.far-t.near)**2))&&(sh.copy(r).invert(),xi.copy(t.ray).applyMatrix4(sh),!(n.boundingBox!==null&&xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xi)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,y=u.length;p<y;p++){let g=u[p],m=o[g.materialIndex],w=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let _=w,T=b;_<T;_+=3){let E=a.getX(_),C=a.getX(_+1),D=a.getX(_+2);i=Xr(this,m,t,n,c,h,d,E,C,D),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let g=p,m=y;g<m;g+=3){let w=a.getX(g),b=a.getX(g+1),_=a.getX(g+2);i=Xr(this,o,t,n,c,h,d,w,b,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,y=u.length;p<y;p++){let g=u[p],m=o[g.materialIndex],w=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=w,T=b;_<T;_+=3){let E=_,C=_+1,D=_+2;i=Xr(this,m,t,n,c,h,d,E,C,D),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=p,m=y;g<m;g+=3){let w=g,b=g+1,_=g+2;i=Xr(this,o,t,n,c,h,d,w,b,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}};function Qu(s,t,e,n,i,r,o,a){let l;if(t.side===Xe?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===Hn,a),l===null)return null;$r.copy(a),$r.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo($r);return c<e.near||c>e.far?null:{distance:c,point:$r.clone(),object:s}}function Xr(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Hr),s.getVertexPosition(l,Vr),s.getVertexPosition(c,Gr);let h=Qu(s,t,e,n,Hr,Vr,Gr,oh);if(h){let d=new P;Bn.getBarycoord(oh,Hr,Vr,Gr,d),i&&(h.uv=Bn.getInterpolatedAttribute(i,a,l,c,d,new ot)),r&&(h.uv1=Bn.getInterpolatedAttribute(r,a,l,c,d,new ot)),o&&(h.normal=Bn.getInterpolatedAttribute(o,a,l,c,d,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new P,materialIndex:0};Bn.getNormal(Hr,Vr,Gr,u.normal),h.face=u,h.barycoord=d}return h}var cs=class s extends Kt{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,r,4),p("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(d,2));function p(y,g,m,w,b,_,T,E,C,D,S){let v=_/C,R=T/D,L=_/2,U=T/2,B=E/2,$=C+1,G=D+1,q=0,V=0,Z=new P;for(let Q=0;Q<G;Q++){let ut=Q*R-U;for(let Ut=0;Ut<$;Ut++){let Jt=Ut*v-L;Z[y]=Jt*w,Z[g]=ut*b,Z[m]=B,c.push(Z.x,Z.y,Z.z),Z[y]=0,Z[g]=0,Z[m]=E>0?1:-1,h.push(Z.x,Z.y,Z.z),d.push(Ut/C),d.push(1-Q/D),q+=1}}for(let Q=0;Q<D;Q++)for(let ut=0;ut<C;ut++){let Ut=u+ut+$*Q,Jt=u+ut+$*(Q+1),jt=u+(ut+1)+$*(Q+1),qt=u+(ut+1)+$*Q;l.push(Ut,Jt,qt),l.push(Jt,jt,qt),V+=6}a.addGroup(f,V,S),f+=V,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ki(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Be(s){let t={};for(let e=0;e<s.length;e++){let n=ki(s[e]);for(let i in n)t[i]=n[i]}return t}function tf(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function ic(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}var pd={clone:ki,merge:Be},ef=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Sn=class extends Rn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ef,this.fragmentShader=nf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ki(t.uniforms),this.uniformsGroups=tf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Zs=class extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Qn=new P,ah=new ot,lh=new ot,Ke=class extends Zs{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=rs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(es*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rs*2*Math.atan(Math.tan(es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z)}getViewSize(t,e){return this.getViewBounds(t,ah,lh),e.subVectors(lh,ah)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(es*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ji=-90,Qi=1,mo=class extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ke(ji,Qi,t,e);i.layers=this.layers,this.add(i);let r=new Ke(ji,Qi,t,e);r.layers=this.layers,this.add(r);let o=new Ke(ji,Qi,t,e);o.layers=this.layers,this.add(o);let a=new Ke(ji,Qi,t,e);a.layers=this.layers,this.add(a);let l=new Ke(ji,Qi,t,e);l.layers=this.layers,this.add(l);let c=new Ke(ji,Qi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===vn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ws)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ks=class extends rn{constructor(t=[],e=Pi,n,i,r,o,a,l,c,h){super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},go=class extends Cn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ks(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new cs(5,5,5),r=new Sn({name:"CubemapFromEquirect",uniforms:ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xe,blending:Wn});r.uniforms.tEquirect.value=e;let o=new ce(i,r),a=e.minFilter;return e.minFilter===oi&&(e.minFilter=bn),new mo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},$e=class extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}},sf={type:"move"},hs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let y of t.hand.values()){let g=e.getJointPose(y,n),m=this._getHandJoint(c,y);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(sf)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new $e;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var Js=class extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var gl=new P,rf=new P,of=new Bt,Ue=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=gl.subVectors(n,e).cross(rf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(gl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||of.getNormalMatrix(t),i=this.coplanarPoint(gl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},_i=new ni,af=new ot(.5,.5),qr=new P,ds=class{constructor(t=new Ue,e=new Ue,n=new Ue,i=new Ue,r=new Ue,o=new Ue){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=vn,n=!1){let i=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],y=r[9],g=r[10],m=r[11],w=r[12],b=r[13],_=r[14],T=r[15];if(i[0].setComponents(c-o,f-h,m-p,T-w).normalize(),i[1].setComponents(c+o,f+h,m+p,T+w).normalize(),i[2].setComponents(c+a,f+d,m+y,T+b).normalize(),i[3].setComponents(c-a,f-d,m-y,T-b).normalize(),n)i[4].setComponents(l,u,g,_).normalize(),i[5].setComponents(c-l,f-u,m-g,T-_).normalize();else if(i[4].setComponents(c-l,f-u,m-g,T-_).normalize(),e===vn)i[5].setComponents(c+l,f+u,m+g,T+_).normalize();else if(e===Ws)i[5].setComponents(l,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(t){_i.center.set(0,0,0);let e=af.distanceTo(t.center);return _i.radius=.7071067811865476+e,_i.applyMatrix4(t.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(qr.x=i.normal.x>0?t.max.x:t.min.x,qr.y=i.normal.y>0?t.max.y:t.min.y,qr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(qr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Pe=class extends Rn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},yo=new P,xo=new P,ch=new ee,Fs=new Vn,Yr=new ni,yl=new P,hh=new P,on=class extends Se{constructor(t=new Kt,e=new Pe){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)yo.fromBufferAttribute(e,i-1),xo.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=yo.distanceTo(xo);t.setAttribute("lineDistance",new ue(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(i),Yr.radius+=r,t.ray.intersectsSphere(Yr)===!1)return;ch.copy(i).invert(),Fs.copy(t.ray).applyMatrix4(ch);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let y=f,g=p-1;y<g;y+=c){let m=h.getX(y),w=h.getX(y+1),b=Zr(this,t,Fs,l,m,w,y);b&&e.push(b)}if(this.isLineLoop){let y=h.getX(p-1),g=h.getX(f),m=Zr(this,t,Fs,l,y,g,p-1);m&&e.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let y=f,g=p-1;y<g;y+=c){let m=Zr(this,t,Fs,l,y,y+1,y);m&&e.push(m)}if(this.isLineLoop){let y=Zr(this,t,Fs,l,p-1,f,p-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Zr(s,t,e,n,i,r,o){let a=s.geometry.attributes.position;if(yo.fromBufferAttribute(a,i),xo.fromBufferAttribute(a,r),e.distanceSqToSegment(yo,xo,yl,hh)>n)return;yl.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(yl);if(!(c<t.near||c>t.far))return{distance:c,point:hh.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var dh=new P,uh=new P,wn=class extends on{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)dh.fromBufferAttribute(e,i),uh.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+dh.distanceTo(uh);t.setAttribute("lineDistance",new ue(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var us=class extends Rn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},fh=new ee,Cl=new Vn,Kr=new ni,Jr=new P,js=class extends Se{constructor(t=new Kt,e=new us){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Kr.copy(n.boundingSphere),Kr.applyMatrix4(i),Kr.radius+=r,t.ray.intersectsSphere(Kr)===!1)return;fh.copy(i).invert(),Cl.copy(t.ray).applyMatrix4(fh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=u,y=f;p<y;p++){let g=c.getX(p);Jr.fromBufferAttribute(d,g),ph(Jr,g,l,i,t,e,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=u,y=f;p<y;p++)Jr.fromBufferAttribute(d,p),ph(Jr,p,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ph(s,t,e,n,i,r,o){let a=Cl.distanceSqToPoint(s);if(a<e){let l=new P;Cl.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Qs=class extends rn{constructor(t,e,n=ai,i,r,o,a=pn,l=pn,c,h=ss,d=1){if(h!==ss&&h!==vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new as(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},tr=class extends rn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var jr=new P,Qr=new P,xl=new P,to=new Bn,er=class extends Kt{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),r=Math.cos(es*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:y,b:g,c:m}=to;if(y.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),to.getNormal(xl),d[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let w=0;w<3;w++){let b=(w+1)%3,_=d[w],T=d[b],E=to[h[w]],C=to[h[b]],D=`${_}_${T}`,S=`${T}_${_}`;S in u&&u[S]?(xl.dot(u[S].normal)<=r&&(f.push(E.x,E.y,E.z),f.push(C.x,C.y,C.z)),u[S]=null):D in u||(u[D]={index0:c[w],index1:c[b],normal:xl.clone()})}}for(let p in u)if(u[p]){let{index0:y,index1:g}=u[p];jr.fromBufferAttribute(a,y),Qr.fromBufferAttribute(a,g),f.push(jr.x,jr.y,jr.z),f.push(Qr.x,Qr.y,Qr.z)}this.setAttribute("position",new ue(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},an=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new ot:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new P,i=[],r=[],o=[],a=new P,l=new ee;for(let f=0;f<=t;f++){let p=f/t;i[f]=this.getTangentAt(p,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(Vt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Vt(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},fs=class extends an{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ot){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},_o=class extends fs{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function sc(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return s+t*r+e*o+n*a}}}var eo=new P,_l=new sc,vl=new sc,bl=new sc,vo=class extends an{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){let n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(eo.subVectors(i[0],i[1]).add(i[0]),c=eo);let d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(eo.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=eo),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),p<1e-4&&(p=y),g<1e-4&&(g=y),_l.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,y,g),vl.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,y,g),bl.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,y,g)}else this.curveType==="catmullrom"&&(_l.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),vl.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),bl.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(_l.calc(l),vl.calc(l),bl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function mh(s,t,e,n,i){let r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function lf(s,t){let e=1-s;return e*e*t}function cf(s,t){return 2*(1-s)*s*t}function hf(s,t){return s*s*t}function zs(s,t,e,n){return lf(s,t)+cf(s,e)+hf(s,n)}function df(s,t){let e=1-s;return e*e*e*t}function uf(s,t){let e=1-s;return 3*e*e*s*t}function ff(s,t){return 3*(1-s)*s*s*t}function pf(s,t){return s*s*s*t}function Hs(s,t,e,n,i){return df(s,t)+uf(s,e)+ff(s,n)+pf(s,i)}var nr=class extends an{constructor(t=new ot,e=new ot,n=new ot,i=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ot){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hs(t,i.x,r.x,o.x,a.x),Hs(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},bo=class extends an{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hs(t,i.x,r.x,o.x,a.x),Hs(t,i.y,r.y,o.y,a.y),Hs(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ir=class extends an{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Mo=class extends an{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},sr=class extends an{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(zs(t,i.x,r.x,o.x),zs(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},So=class extends an{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(zs(t,i.x,r.x,o.x),zs(t,i.y,r.y,o.y),zs(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},rr=class extends an{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){let n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(mh(a,l.x,c.x,h.x,d.x),mh(a,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new ot().fromArray(i))}return this}},gh=Object.freeze({__proto__:null,ArcCurve:_o,CatmullRomCurve3:vo,CubicBezierCurve:nr,CubicBezierCurve3:bo,EllipseCurve:fs,LineCurve:ir,LineCurve3:Mo,QuadraticBezierCurve:sr,QuadraticBezierCurve3:So,SplineCurve:rr}),wo=class extends an{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new gh[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new gh[i.type]().fromJSON(i))}return this}},wi=class extends wo{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new ir(this.currentPoint.clone(),new ot(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new sr(this.currentPoint.clone(),new ot(t,e),new ot(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){let a=new nr(this.currentPoint.clone(),new ot(t,e),new ot(n,i),new ot(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new rr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){let c=new fs(t,e,n,i,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ps=class extends wi{constructor(t){super(t),this.uuid=Di(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new wi().fromJSON(i))}return this}};function mf(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=md(s,0,i,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=vf(s,t,r,e)),s.length>80*e){a=1/0,l=1/0;let h=-1/0,d=-1/0;for(let u=e;u<i;u+=e){let f=s[u],p=s[u+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>d&&(d=p)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return or(r,o,e,a,l,c,0),o}function md(s,t,e,n,i){let r;if(i===If(s,t,e,n)>0)for(let o=t;o<e;o+=n)r=yh(o/n|0,s[o],s[o+1],r);else for(let o=e-n;o>=t;o-=n)r=yh(o/n|0,s[o],s[o+1],r);return r&&ms(r,r.next)&&(lr(r),r=r.next),r}function Ei(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(ms(e,e.next)||me(e.prev,e,e.next)===0)){if(lr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function or(s,t,e,n,i,r,o){if(!s)return;!o&&r&&Ef(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?yf(s,n,i,r):gf(s)){t.push(l.i,s.i,c.i),lr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=xf(Ei(s),t),or(s,t,e,n,i,r,2)):o===2&&_f(s,t,e,n,i,r):or(Ei(s),t,e,n,i,r,1);break}}}function gf(s){let t=s.prev,e=s,n=s.next;if(me(t,e,n)>=0)return!1;let i=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(i,r,o),d=Math.min(a,l,c),u=Math.max(i,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&Os(i,a,r,l,o,c,p.x,p.y)&&me(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function yf(s,t,e,n){let i=s.prev,r=s,o=s.next;if(me(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,d=r.y,u=o.y,f=Math.min(a,l,c),p=Math.min(h,d,u),y=Math.max(a,l,c),g=Math.max(h,d,u),m=Rl(f,p,t,e,n),w=Rl(y,g,t,e,n),b=s.prevZ,_=s.nextZ;for(;b&&b.z>=m&&_&&_.z<=w;){if(b.x>=f&&b.x<=y&&b.y>=p&&b.y<=g&&b!==i&&b!==o&&Os(a,h,l,d,c,u,b.x,b.y)&&me(b.prev,b,b.next)>=0||(b=b.prevZ,_.x>=f&&_.x<=y&&_.y>=p&&_.y<=g&&_!==i&&_!==o&&Os(a,h,l,d,c,u,_.x,_.y)&&me(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;b&&b.z>=m;){if(b.x>=f&&b.x<=y&&b.y>=p&&b.y<=g&&b!==i&&b!==o&&Os(a,h,l,d,c,u,b.x,b.y)&&me(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;_&&_.z<=w;){if(_.x>=f&&_.x<=y&&_.y>=p&&_.y<=g&&_!==i&&_!==o&&Os(a,h,l,d,c,u,_.x,_.y)&&me(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function xf(s,t){let e=s;do{let n=e.prev,i=e.next.next;!ms(n,i)&&yd(n,e,e.next,i)&&ar(n,i)&&ar(i,n)&&(t.push(n.i,e.i,i.i),lr(e),lr(e.next),e=s=i),e=e.next}while(e!==s);return Ei(e)}function _f(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Cf(o,a)){let l=xd(o,a);o=Ei(o,o.next),l=Ei(l,l.next),or(o,t,e,n,i,r,0),or(l,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function vf(s,t,e,n){let i=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:s.length,c=md(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Af(c))}i.sort(bf);for(let r=0;r<i.length;r++)e=Mf(i[r],e);return e}function bf(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Mf(s,t){let e=Sf(s,t);if(!e)return t;let n=xd(e,s);return Ei(n,n.next),Ei(e,e.next)}function Sf(s,t){let e=t,n=s.x,i=s.y,r=-1/0,o;if(ms(s,e))return e;do{if(ms(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,o=e.x<e.next.x?e:e.next,d===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&gd(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){let d=Math.abs(i-e.y)/(n-e.x);ar(e,s)&&(d<h||d===h&&(e.x>o.x||e.x===o.x&&wf(o,e)))&&(o=e,h=d)}e=e.next}while(e!==a);return o}function wf(s,t){return me(s.prev,s,t.prev)<0&&me(t.next,s,s.next)<0}function Ef(s,t,e,n){let i=s;do i.z===0&&(i.z=Rl(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Tf(i)}function Tf(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,e*=2}while(t>1);return s}function Rl(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Af(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function gd(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function Os(s,t,e,n,i,r,o,a){return!(s===o&&t===a)&&gd(s,t,e,n,i,r,o,a)}function Cf(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Rf(s,t)&&(ar(s,t)&&ar(t,s)&&Pf(s,t)&&(me(s.prev,s,t.prev)||me(s,t.prev,t))||ms(s,t)&&me(s.prev,s,s.next)>0&&me(t.prev,t,t.next)>0)}function me(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function ms(s,t){return s.x===t.x&&s.y===t.y}function yd(s,t,e,n){let i=io(me(s,t,e)),r=io(me(s,t,n)),o=io(me(e,n,s)),a=io(me(e,n,t));return!!(i!==r&&o!==a||i===0&&no(s,e,t)||r===0&&no(s,n,t)||o===0&&no(e,s,n)||a===0&&no(e,t,n))}function no(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function io(s){return s>0?1:s<0?-1:0}function Rf(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&yd(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function ar(s,t){return me(s.prev,s,s.next)<0?me(s,t,s.next)>=0&&me(s,s.prev,t)>=0:me(s,t,s.prev)<0||me(s,s.next,t)<0}function Pf(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function xd(s,t){let e=Pl(s.i,s.x,s.y),n=Pl(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function yh(s,t,e,n){let i=Pl(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function lr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Pl(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function If(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var Il=class{static triangulate(t,e,n=2){return mf(t,e,n)}},is=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];xh(t),_h(n,t);let o=t.length;e.forEach(xh);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,_h(n,e[l]);let a=Il.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function xh(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function _h(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var Gn=class s extends Kt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,f=[],p=[],y=[],g=[];for(let m=0;m<h;m++){let w=m*u-o;for(let b=0;b<c;b++){let _=b*d-r;p.push(_,-w,0),y.push(0,0,1),g.push(b/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let w=0;w<a;w++){let b=w+c*m,_=w+c*(m+1),T=w+1+c*(m+1),E=w+1+c*m;f.push(b,_,E),f.push(_,T,E)}this.setIndex(f),this.setAttribute("position",new ue(p,3)),this.setAttribute("normal",new ue(y,3)),this.setAttribute("uv",new ue(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var cr=class s extends Kt{constructor(t=new ps([new ot(0,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new ue(i,3)),this.setAttribute("normal",new ue(r,3)),this.setAttribute("uv",new ue(o,2));function c(h){let d=i.length/3,u=h.extractPoints(e),f=u.shape,p=u.holes;is.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){let w=p[g];is.isClockWise(w)===!0&&(p[g]=w.reverse())}let y=is.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){let w=p[g];f=f.concat(w)}for(let g=0,m=f.length;g<m;g++){let w=f[g];i.push(w.x,w.y,0),r.push(0,0,1),o.push(w.x,w.y)}for(let g=0,m=y.length;g<m;g++){let w=y[g],b=w[0]+d,_=w[1]+d,T=w[2]+d;n.push(b,_,T),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Df(e,t)}static fromJSON(t,e){let n=[];for(let i=0,r=t.shapes.length;i<r;i++){let o=e[t.shapes[i]];n.push(o)}return new s(n,t.curveSegments)}};function Df(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){let i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}var hr=class s extends Kt{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new P,u=new P,f=[],p=[],y=[],g=[];for(let m=0;m<=n;m++){let w=[],b=m/n,_=0;m===0&&o===0?_=.5/e:m===n&&l===Math.PI&&(_=-.5/e);for(let T=0;T<=e;T++){let E=T/e;d.x=-t*Math.cos(i+E*r)*Math.sin(o+b*a),d.y=t*Math.cos(o+b*a),d.z=t*Math.sin(i+E*r)*Math.sin(o+b*a),p.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),g.push(E+_,1-b),w.push(c++)}h.push(w)}for(let m=0;m<n;m++)for(let w=0;w<e;w++){let b=h[m][w+1],_=h[m][w],T=h[m+1][w],E=h[m+1][w+1];(m!==0||o>0)&&f.push(b,_,E),(m!==n-1||l<Math.PI)&&f.push(_,T,E)}this.setIndex(f),this.setAttribute("position",new ue(p,3)),this.setAttribute("normal",new ue(y,3)),this.setAttribute("uv",new ue(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ti=class extends Rn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jl,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Eo=class extends Rn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ed,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},To=class extends Rn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};var Ai=class extends Pe{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};function so(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function kf(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var Ci=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ao=class extends Ci{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Sl,endingEnd:Sl}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case wl:r=t,a=2*e-n;break;case El:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case wl:o=t,l=2*n-e;break;case El:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-e)/(i-e),y=p*p,g=y*p,m=-u*g+2*u*y-u*p,w=(1+u)*g+(-1.5-2*u)*y+(-.5+u)*p+1,b=(-1-f)*g+(1.5+f)*y+.5*p,_=f*g-f*y;for(let T=0;T!==a;++T)r[T]=m*o[h+T]+w*o[c+T]+b*o[l+T]+_*o[d+T];return r}},Co=class extends Ci{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Ro=class extends Ci{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},ln=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=so(e,this.TimeBufferType),this.values=so(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:so(t.times,Array),values:so(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ro(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Co(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ao(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Vs:e=this.InterpolantFactoryMethodDiscrete;break;case ho:e=this.InterpolantFactoryMethodLinear;break;case ro:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vs;case this.InterpolantFactoryMethodLinear:return ho;case this.InterpolantFactoryMethodSmooth:return ro}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&kf(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ro,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let y=e[d+p];if(y!==e[u+p]||y!==e[f+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};ln.prototype.ValueTypeName="";ln.prototype.TimeBufferType=Float32Array;ln.prototype.ValueBufferType=Float32Array;ln.prototype.DefaultInterpolation=ho;var ii=class extends ln{constructor(t,e,n){super(t,e,n)}};ii.prototype.ValueTypeName="bool";ii.prototype.ValueBufferType=Array;ii.prototype.DefaultInterpolation=Vs;ii.prototype.InterpolantFactoryMethodLinear=void 0;ii.prototype.InterpolantFactoryMethodSmooth=void 0;var Po=class extends ln{constructor(t,e,n,i){super(t,e,n,i)}};Po.prototype.ValueTypeName="color";var Io=class extends ln{constructor(t,e,n,i){super(t,e,n,i)}};Io.prototype.ValueTypeName="number";var Do=class extends Ci{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)xe.slerpFlat(r,0,o,c-a,o,c,l);return r}},dr=class extends ln{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Do(this.times,this.values,this.getValueSize(),t)}};dr.prototype.ValueTypeName="quaternion";dr.prototype.InterpolantFactoryMethodSmooth=void 0;var si=class extends ln{constructor(t,e,n){super(t,e,n)}};si.prototype.ValueTypeName="string";si.prototype.ValueBufferType=Array;si.prototype.DefaultInterpolation=Vs;si.prototype.InterpolantFactoryMethodLinear=void 0;si.prototype.InterpolantFactoryMethodSmooth=void 0;var ko=class extends ln{constructor(t,e,n,i){super(t,e,n,i)}};ko.prototype.ValueTypeName="vector";var Lo=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},_d=new Lo,No=class{constructor(t){this.manager=t!==void 0?t:_d,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};No.DEFAULT_MATERIAL_NAME="__DEFAULT";var ur=class extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},fr=class extends ur{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Ml=new ee,vh=new P,bh=new P,Dl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=En,this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ds,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;vh.setFromMatrixPosition(t.matrixWorld),e.position.copy(vh),bh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(bh),e.updateMatrixWorld(),Ml.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ml,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ml)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Ri=class extends Zs{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},kl=class extends Dl{constructor(){super(new Ri(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},pr=class extends ur{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new kl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Uo=class extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var rc="\\[\\]\\.:\\/",Lf=new RegExp("["+rc+"]","g"),oc="[^"+rc+"]",Nf="[^"+rc.replace("\\.","")+"]",Uf=/((?:WC+[\/:])*)/.source.replace("WC",oc),Ff=/(WCOD+)?/.source.replace("WCOD",Nf),Of=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",oc),Bf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",oc),zf=new RegExp("^"+Uf+Ff+Of+Bf+"$"),Hf=["material","materials","bones","map"],Ll=class{constructor(t,e,n){let i=n||ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ae=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Lf,"")}static parseTrackName(t){let e=zf.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Hf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ae.Composite=Ll;ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ae.prototype.GetterByBindingType=[ae.prototype._getValue_direct,ae.prototype._getValue_array,ae.prototype._getValue_arrayElement,ae.prototype._getValue_toArray];ae.prototype.SetterByBindingTypeAndVersioning=[[ae.prototype._setValue_direct,ae.prototype._setValue_direct_setNeedsUpdate,ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_array,ae.prototype._setValue_array_setNeedsUpdate,ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_arrayElement,ae.prototype._setValue_arrayElement_setNeedsUpdate,ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_fromArray,ae.prototype._setValue_fromArray_setNeedsUpdate,ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rx=new Float32Array(1);var Mh=new ee,mr=class{constructor(t,e,n=0,i=1/0){this.ray=new Vn(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new ls,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Mh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Mh),this}intersectObject(t,e=!0,n=[]){return Nl(t,this,n,e),n.sort(Sh),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Nl(t[i],this,n,e);return n.sort(Sh),n}};function Sh(s,t){return s.distance-t.distance}function Nl(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Nl(r[o],t,e,!0)}}var gs=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Vt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Vt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var gr=class extends wn{constructor(t=10,e=10,n=4473924,i=8947848){n=new Nt(n),i=new Nt(i);let r=e/2,o=t/e,a=t/2,l=[],c=[];for(let u=0,f=0,p=-a;u<=e;u++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);let y=u===r?n:i;y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3}let h=new Kt;h.setAttribute("position",new ue(l,3)),h.setAttribute("color",new ue(c,3));let d=new Pe({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var yr=class extends An{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function ac(s,t,e,n){let i=Vf(n);switch(e){case ql:return s*t;case Zl:return s*t/i.components*i.byteLength;case Ko:return s*t/i.components*i.byteLength;case Kl:return s*t*2/i.components*i.byteLength;case Jo:return s*t*2/i.components*i.byteLength;case Yl:return s*t*3/i.components*i.byteLength;case gn:return s*t*4/i.components*i.byteLength;case jo:return s*t*4/i.components*i.byteLength;case vr:case br:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Mr:case Sr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ta:case na:return Math.max(s,16)*Math.max(t,8)/4;case Qo:case ea:return Math.max(s,8)*Math.max(t,8)/2;case ia:case sa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ra:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case oa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case aa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case la:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case ca:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case ha:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case da:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case ua:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case fa:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case pa:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case ma:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case ga:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case ya:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case xa:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case _a:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case va:case ba:case Ma:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Sa:case wa:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Ea:case Ta:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Vf(s){switch(s){case En:case Gl:return{byteLength:1,components:1};case ys:case Wl:case xs:return{byteLength:2,components:1};case Yo:case Zo:return{byteLength:2,components:4};case ai:case qo:case In:return{byteLength:4,components:1};case $l:case Xl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Gd(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Wf(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],y=d[f];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let y=d[f];s.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var $f=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xf=`#ifdef USE_ALPHAHASH
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
#endif`,qf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jf=`#ifdef USE_AOMAP
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
#endif`,jf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qf=`#ifdef USE_BATCHING
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
#endif`,tp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ep=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,np=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ip=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sp=`#ifdef USE_IRIDESCENCE
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
#endif`,rp=`#ifdef USE_BUMPMAP
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
#endif`,op=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ap=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,up=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,pp=`#define PI 3.141592653589793
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
} // validated`,mp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gp=`vec3 transformedNormal = objectNormal;
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
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_p=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sp=`#ifdef USE_ENVMAP
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
#endif`,wp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ep=`#ifdef USE_ENVMAP
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
#endif`,Tp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ap=`#ifdef USE_ENVMAP
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
#endif`,Cp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ip=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Dp=`#ifdef USE_GRADIENTMAP
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
}`,kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Np=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Up=`uniform bool receiveShadow;
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
#endif`,Fp=`#ifdef USE_ENVMAP
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
#endif`,Op=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vp=`PhysicalMaterial material;
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
#endif`,Gp=`struct PhysicalMaterial {
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
}`,Wp=`
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
#endif`,$p=`#if defined( RE_IndirectDiffuse )
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
#endif`,Xp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tm=`#if defined( USE_POINTS_UV )
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
#endif`,em=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,nm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,im=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,om=`#ifdef USE_MORPHTARGETS
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
#endif`,am=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,um=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fm=`#ifdef USE_NORMALMAP
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
#endif`,pm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ym=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_m=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Em=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Am=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Rm=`float getShadowMask() {
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
}`,Pm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Im=`#ifdef USE_SKINNING
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
#endif`,Dm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,km=`#ifdef USE_SKINNING
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
#endif`,Lm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Um=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Om=`#ifdef USE_TRANSMISSION
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
#endif`,Bm=`#ifdef USE_TRANSMISSION
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
#endif`,zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Wm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$m=`uniform sampler2D t2D;
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
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Km=`#include <common>
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
}`,Jm=`#if DEPTH_PACKING == 3200
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
}`,jm=`#define DISTANCE
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
}`,Qm=`#define DISTANCE
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
}`,tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,eg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ng=`uniform float scale;
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
}`,ig=`uniform vec3 diffuse;
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
}`,sg=`#include <common>
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
}`,rg=`uniform vec3 diffuse;
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
}`,og=`#define LAMBERT
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
}`,ag=`#define LAMBERT
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
}`,lg=`#define MATCAP
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
}`,cg=`#define MATCAP
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
}`,hg=`#define NORMAL
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
}`,dg=`#define NORMAL
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
}`,ug=`#define PHONG
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
}`,fg=`#define PHONG
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
}`,pg=`#define STANDARD
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
}`,mg=`#define STANDARD
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
}`,gg=`#define TOON
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
}`,yg=`#define TOON
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
}`,xg=`uniform float size;
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
}`,_g=`uniform vec3 diffuse;
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
}`,vg=`#include <common>
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
}`,bg=`uniform vec3 color;
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
}`,Mg=`uniform float rotation;
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
}`,Sg=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:$f,alphahash_pars_fragment:Xf,alphamap_fragment:qf,alphamap_pars_fragment:Yf,alphatest_fragment:Zf,alphatest_pars_fragment:Kf,aomap_fragment:Jf,aomap_pars_fragment:jf,batching_pars_vertex:Qf,batching_vertex:tp,begin_vertex:ep,beginnormal_vertex:np,bsdfs:ip,iridescence_fragment:sp,bumpmap_pars_fragment:rp,clipping_planes_fragment:op,clipping_planes_pars_fragment:ap,clipping_planes_pars_vertex:lp,clipping_planes_vertex:cp,color_fragment:hp,color_pars_fragment:dp,color_pars_vertex:up,color_vertex:fp,common:pp,cube_uv_reflection_fragment:mp,defaultnormal_vertex:gp,displacementmap_pars_vertex:yp,displacementmap_vertex:xp,emissivemap_fragment:_p,emissivemap_pars_fragment:vp,colorspace_fragment:bp,colorspace_pars_fragment:Mp,envmap_fragment:Sp,envmap_common_pars_fragment:wp,envmap_pars_fragment:Ep,envmap_pars_vertex:Tp,envmap_physical_pars_fragment:Fp,envmap_vertex:Ap,fog_vertex:Cp,fog_pars_vertex:Rp,fog_fragment:Pp,fog_pars_fragment:Ip,gradientmap_pars_fragment:Dp,lightmap_pars_fragment:kp,lights_lambert_fragment:Lp,lights_lambert_pars_fragment:Np,lights_pars_begin:Up,lights_toon_fragment:Op,lights_toon_pars_fragment:Bp,lights_phong_fragment:zp,lights_phong_pars_fragment:Hp,lights_physical_fragment:Vp,lights_physical_pars_fragment:Gp,lights_fragment_begin:Wp,lights_fragment_maps:$p,lights_fragment_end:Xp,logdepthbuf_fragment:qp,logdepthbuf_pars_fragment:Yp,logdepthbuf_pars_vertex:Zp,logdepthbuf_vertex:Kp,map_fragment:Jp,map_pars_fragment:jp,map_particle_fragment:Qp,map_particle_pars_fragment:tm,metalnessmap_fragment:em,metalnessmap_pars_fragment:nm,morphinstance_vertex:im,morphcolor_vertex:sm,morphnormal_vertex:rm,morphtarget_pars_vertex:om,morphtarget_vertex:am,normal_fragment_begin:lm,normal_fragment_maps:cm,normal_pars_fragment:hm,normal_pars_vertex:dm,normal_vertex:um,normalmap_pars_fragment:fm,clearcoat_normal_fragment_begin:pm,clearcoat_normal_fragment_maps:mm,clearcoat_pars_fragment:gm,iridescence_pars_fragment:ym,opaque_fragment:xm,packing:_m,premultiplied_alpha_fragment:vm,project_vertex:bm,dithering_fragment:Mm,dithering_pars_fragment:Sm,roughnessmap_fragment:wm,roughnessmap_pars_fragment:Em,shadowmap_pars_fragment:Tm,shadowmap_pars_vertex:Am,shadowmap_vertex:Cm,shadowmask_pars_fragment:Rm,skinbase_vertex:Pm,skinning_pars_vertex:Im,skinning_vertex:Dm,skinnormal_vertex:km,specularmap_fragment:Lm,specularmap_pars_fragment:Nm,tonemapping_fragment:Um,tonemapping_pars_fragment:Fm,transmission_fragment:Om,transmission_pars_fragment:Bm,uv_pars_fragment:zm,uv_pars_vertex:Hm,uv_vertex:Vm,worldpos_vertex:Gm,background_vert:Wm,background_frag:$m,backgroundCube_vert:Xm,backgroundCube_frag:qm,cube_vert:Ym,cube_frag:Zm,depth_vert:Km,depth_frag:Jm,distanceRGBA_vert:jm,distanceRGBA_frag:Qm,equirect_vert:tg,equirect_frag:eg,linedashed_vert:ng,linedashed_frag:ig,meshbasic_vert:sg,meshbasic_frag:rg,meshlambert_vert:og,meshlambert_frag:ag,meshmatcap_vert:lg,meshmatcap_frag:cg,meshnormal_vert:hg,meshnormal_frag:dg,meshphong_vert:ug,meshphong_frag:fg,meshphysical_vert:pg,meshphysical_frag:mg,meshtoon_vert:gg,meshtoon_frag:yg,points_vert:xg,points_frag:_g,shadow_vert:vg,shadow_frag:bg,sprite_vert:Mg,sprite_frag:Sg},at={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},Dn={basic:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:Be([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:Be([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:Be([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:Be([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:Be([at.points,at.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:Be([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:Be([at.common,at.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:Be([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:Be([at.sprite,at.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:Be([at.common,at.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:Be([at.lights,at.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};Dn.physical={uniforms:Be([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};var Aa={r:0,b:0,g:0},Li=new Mn,wg=new ee;function Eg(s,t,e,n,i,r,o){let a=new Nt(0),l=r===!0?0:1,c,h,d=null,u=0,f=null;function p(b){let _=b.isScene===!0?b.background:null;return _&&_.isTexture&&(_=(b.backgroundBlurriness>0?e:t).get(_)),_}function y(b){let _=!1,T=p(b);T===null?m(a,l):T&&T.isColor&&(m(T,1),_=!0);let E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(b,_){let T=p(_);T&&(T.isCubeTexture||T.mapping===xr)?(h===void 0&&(h=new ce(new cs(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:ki(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,C,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Li.copy(_.backgroundRotation),Li.x*=-1,Li.y*=-1,Li.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(wg.makeRotationFromEuler(Li)),h.material.toneMapped=Yt.getTransfer(T.colorSpace)!==te,(d!==T||u!==T.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=T,u=T.version,f=s.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new ce(new Gn(2,2),new Sn({name:"BackgroundMaterial",uniforms:ki(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Yt.getTransfer(T.colorSpace)!==te,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||u!==T.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=T,u=T.version,f=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,_){b.getRGB(Aa,ic(s)),n.buffers.color.setClear(Aa.r,Aa.g,Aa.b,_,o)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,_=1){a.set(b),l=_,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,m(a,l)},render:y,addToRenderList:g,dispose:w}}function Tg(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,o=!1;function a(v,R,L,U,B){let $=!1,G=d(U,L,R);r!==G&&(r=G,c(r.object)),$=f(v,U,L,B),$&&p(v,U,L,B),B!==null&&t.update(B,s.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,_(v,R,L,U),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return s.createVertexArray()}function c(v){return s.bindVertexArray(v)}function h(v){return s.deleteVertexArray(v)}function d(v,R,L){let U=L.wireframe===!0,B=n[v.id];B===void 0&&(B={},n[v.id]=B);let $=B[R.id];$===void 0&&($={},B[R.id]=$);let G=$[U];return G===void 0&&(G=u(l()),$[U]=G),G}function u(v){let R=[],L=[],U=[];for(let B=0;B<e;B++)R[B]=0,L[B]=0,U[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:L,attributeDivisors:U,object:v,attributes:{},index:null}}function f(v,R,L,U){let B=r.attributes,$=R.attributes,G=0,q=L.getAttributes();for(let V in q)if(q[V].location>=0){let Q=B[V],ut=$[V];if(ut===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(ut=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(ut=v.instanceColor)),Q===void 0||Q.attribute!==ut||ut&&Q.data!==ut.data)return!0;G++}return r.attributesNum!==G||r.index!==U}function p(v,R,L,U){let B={},$=R.attributes,G=0,q=L.getAttributes();for(let V in q)if(q[V].location>=0){let Q=$[V];Q===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(Q=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(Q=v.instanceColor));let ut={};ut.attribute=Q,Q&&Q.data&&(ut.data=Q.data),B[V]=ut,G++}r.attributes=B,r.attributesNum=G,r.index=U}function y(){let v=r.newAttributes;for(let R=0,L=v.length;R<L;R++)v[R]=0}function g(v){m(v,0)}function m(v,R){let L=r.newAttributes,U=r.enabledAttributes,B=r.attributeDivisors;L[v]=1,U[v]===0&&(s.enableVertexAttribArray(v),U[v]=1),B[v]!==R&&(s.vertexAttribDivisor(v,R),B[v]=R)}function w(){let v=r.newAttributes,R=r.enabledAttributes;for(let L=0,U=R.length;L<U;L++)R[L]!==v[L]&&(s.disableVertexAttribArray(L),R[L]=0)}function b(v,R,L,U,B,$,G){G===!0?s.vertexAttribIPointer(v,R,L,B,$):s.vertexAttribPointer(v,R,L,U,B,$)}function _(v,R,L,U){y();let B=U.attributes,$=L.getAttributes(),G=R.defaultAttributeValues;for(let q in $){let V=$[q];if(V.location>=0){let Z=B[q];if(Z===void 0&&(q==="instanceMatrix"&&v.instanceMatrix&&(Z=v.instanceMatrix),q==="instanceColor"&&v.instanceColor&&(Z=v.instanceColor)),Z!==void 0){let Q=Z.normalized,ut=Z.itemSize,Ut=t.get(Z);if(Ut===void 0)continue;let Jt=Ut.buffer,jt=Ut.type,qt=Ut.bytesPerElement,Y=jt===s.INT||jt===s.UNSIGNED_INT||Z.gpuType===qo;if(Z.isInterleavedBufferAttribute){let j=Z.data,pt=j.stride,Lt=Z.offset;if(j.isInstancedInterleavedBuffer){for(let Et=0;Et<V.locationSize;Et++)m(V.location+Et,j.meshPerAttribute);v.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Et=0;Et<V.locationSize;Et++)g(V.location+Et);s.bindBuffer(s.ARRAY_BUFFER,Jt);for(let Et=0;Et<V.locationSize;Et++)b(V.location+Et,ut/V.locationSize,jt,Q,pt*qt,(Lt+ut/V.locationSize*Et)*qt,Y)}else{if(Z.isInstancedBufferAttribute){for(let j=0;j<V.locationSize;j++)m(V.location+j,Z.meshPerAttribute);v.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let j=0;j<V.locationSize;j++)g(V.location+j);s.bindBuffer(s.ARRAY_BUFFER,Jt);for(let j=0;j<V.locationSize;j++)b(V.location+j,ut/V.locationSize,jt,Q,ut*qt,ut/V.locationSize*j*qt,Y)}}else if(G!==void 0){let Q=G[q];if(Q!==void 0)switch(Q.length){case 2:s.vertexAttrib2fv(V.location,Q);break;case 3:s.vertexAttrib3fv(V.location,Q);break;case 4:s.vertexAttrib4fv(V.location,Q);break;default:s.vertexAttrib1fv(V.location,Q)}}}}w()}function T(){D();for(let v in n){let R=n[v];for(let L in R){let U=R[L];for(let B in U)h(U[B].object),delete U[B];delete R[L]}delete n[v]}}function E(v){if(n[v.id]===void 0)return;let R=n[v.id];for(let L in R){let U=R[L];for(let B in U)h(U[B].object),delete U[B];delete R[L]}delete n[v.id]}function C(v){for(let R in n){let L=n[R];if(L[v.id]===void 0)continue;let U=L[v.id];for(let B in U)h(U[B].object),delete U[B];delete L[v.id]}}function D(){S(),o=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:D,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:g,disableUnusedAttributes:w}}function Ag(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let p=0;p<d;p++)f+=h[p];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)o(c[p],h[p],u[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let p=0;for(let y=0;y<d;y++)p+=h[y]*u[y];e.update(p,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Cg(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==gn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let D=C===xs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==En&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==In&&!D)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=p>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:w,maxVaryings:b,maxFragmentUniforms:_,vertexTextures:T,maxSamples:E}}function Rg(s){let t=this,e=null,n=0,i=!1,r=!1,o=new Ue,a=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{let w=r?0:n,b=w*4,_=m.clippingState||null;l.value=_,_=h(p,u,b,f);for(let T=0;T!==b;++T)_[T]=e[T];m.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=l.value,p!==!0||g===null){let m=f+y*4,w=u.matrixWorldInverse;a.getNormalMatrix(w),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,_=f;b!==y;++b,_+=4)o.copy(d[b]).applyMatrix4(w,a),o.normal.toArray(g,_),g[_+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}function Pg(s){let t=new WeakMap;function e(o,a){return a===Wo?o.mapping=Pi:a===$o&&(o.mapping=Ii),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Wo||a===$o)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new go(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ms=4,vd=[.125,.215,.35,.446,.526,.582],Fi=20,lc=new Ri,bd=new Nt,cc=null,hc=0,dc=0,uc=!1,Ui=(1+Math.sqrt(5))/2,bs=1/Ui,Md=[new P(-Ui,bs,0),new P(Ui,bs,0),new P(-bs,0,Ui),new P(bs,0,Ui),new P(0,Ui,-bs),new P(0,Ui,bs),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Ig=new P,Pa=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){let{size:o=256,position:a=Ig}=r;cc=this._renderer.getRenderTarget(),hc=this._renderer.getActiveCubeFace(),dc=this._renderer.getActiveMipmapLevel(),uc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ed(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(cc,hc,dc),this._renderer.xr.enabled=uc,t.scissorTest=!1,Ca(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pi||t.mapping===Ii?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),cc=this._renderer.getRenderTarget(),hc=this._renderer.getActiveCubeFace(),dc=this._renderer.getActiveMipmapLevel(),uc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:xs,format:gn,colorSpace:Si,depthBuffer:!1},i=Sd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sd(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dg(r)),this._blurMaterial=kg(r,t,e)}return i}_compileMaterial(t){let e=new ce(this._lodPlanes[0],t);this._renderer.compile(e,lc)}_sceneToCubeUV(t,e,n,i,r){let l=new Ke(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(bd),d.toneMapping=$n,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null));let y=new Fe({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),g=new ce(new cs,y),m=!1,w=t.background;w?w.isColor&&(y.color.copy(w),t.background=null,m=!0):(y.color.copy(bd),m=!0);for(let b=0;b<6;b++){let _=b%3;_===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):_===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));let T=this._cubeSize;Ca(i,_*T,b>2?T:0,T,T),d.setRenderTarget(i),m&&d.render(g,l),d.render(t,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,t.background=w}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Pi||t.mapping===Ii;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ed()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wd());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new ce(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ca(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,lc)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Md[(i-r-1)%Md.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new ce(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Fi-1),y=r/p,g=isFinite(r)?1+Math.floor(h*y):Fi;g>Fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Fi}`);let m=[],w=0;for(let C=0;C<Fi;++C){let D=C/y,S=Math.exp(-D*D/2);m.push(S),C===0?w+=S:C<g&&(w+=2*S)}for(let C=0;C<m.length;C++)m[C]=m[C]/w;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:b}=this;u.dTheta.value=p,u.mipInt.value=b-n;let _=this._sizeLods[i],T=3*_*(i>b-Ms?i-b+Ms:0),E=4*(this._cubeSize-_);Ca(e,T,E,3*_,2*_),l.setRenderTarget(e),l.render(d,lc)}};function Dg(s){let t=[],e=[],n=[],i=s,r=s-Ms+1+vd.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let l=1/a;o>s-Ms?l=vd[o-s+Ms-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,y=3,g=2,m=1,w=new Float32Array(y*p*f),b=new Float32Array(g*p*f),_=new Float32Array(m*p*f);for(let E=0;E<f;E++){let C=E%3*2/3-1,D=E>2?0:-1,S=[C,D,0,C+2/3,D,0,C+2/3,D+1,0,C,D,0,C+2/3,D+1,0,C,D+1,0];w.set(S,y*p*E),b.set(u,g*p*E);let v=[E,E,E,E,E,E];_.set(v,m*p*E)}let T=new Kt;T.setAttribute("position",new le(w,y)),T.setAttribute("uv",new le(b,g)),T.setAttribute("faceIndex",new le(_,m)),t.push(T),i>Ms&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Sd(s,t,e){let n=new Cn(s,t,e);return n.texture.mapping=xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ca(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function kg(s,t,e){let n=new Float32Array(Fi),i=new P(0,1,0);return new Sn({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Mc(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function wd(){return new Sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mc(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Ed(){return new Sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Mc(){return`

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
	`}function Lg(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Wo||l===$o,h=l===Pi||l===Ii;if(c||h){let d=t.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Pa(s)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Pa(s)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Ng(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&os("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ug(s,t,e,n){let i={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete i[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,p=d.attributes.position,y=0;if(f!==null){let w=f.array;y=f.version;for(let b=0,_=w.length;b<_;b+=3){let T=w[b+0],E=w[b+1],C=w[b+2];u.push(T,E,E,C,C,T)}}else if(p!==void 0){let w=p.array;y=p.version;for(let b=0,_=w.length/3-1;b<_;b+=3){let T=b+0,E=b+1,C=b+2;u.push(T,E,E,C,C,T)}}else return;let g=new(nc(u)?Ys:qs)(u,1);g.version=y;let m=r.get(d);m&&t.remove(m),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Fg(s,t,e){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){s.drawElements(n,f,r,u*o),e.update(f,n,1)}function c(u,f,p){p!==0&&(s.drawElementsInstanced(n,f,r,u*o,p),e.update(f,n,p))}function h(u,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];e.update(g,n,1)}function d(u,f,p,y){if(p===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<u.length;m++)c(u[m]/o,f[m],y[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,y,0,p);let m=0;for(let w=0;w<p;w++)m+=f[w]*y[w];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Og(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Bg(s,t,e){let n=new WeakMap,i=new ge;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let S=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],b=0;f===!0&&(b=1),p===!0&&(b=2),y===!0&&(b=3);let _=a.attributes.position.count*b,T=1;_>t.maxTextureSize&&(T=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let E=new Float32Array(_*T*4*d),C=new Xs(E,_,T,d);C.type=In,C.needsUpdate=!0;let D=b*4;for(let v=0;v<d;v++){let R=g[v],L=m[v],U=w[v],B=_*T*4*v;for(let $=0;$<R.count;$++){let G=$*D;f===!0&&(i.fromBufferAttribute(R,$),E[B+G+0]=i.x,E[B+G+1]=i.y,E[B+G+2]=i.z,E[B+G+3]=0),p===!0&&(i.fromBufferAttribute(L,$),E[B+G+4]=i.x,E[B+G+5]=i.y,E[B+G+6]=i.z,E[B+G+7]=0),y===!0&&(i.fromBufferAttribute(U,$),E[B+G+8]=i.x,E[B+G+9]=i.y,E[B+G+10]=i.z,E[B+G+11]=U.itemSize===4?i.w:1)}}u={count:d,texture:C,size:new ot(_,T)},n.set(a,u),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function zg(s,t,e,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Wd=new rn,Td=new Qs(1,1),$d=new Xs,Xd=new po,qd=new Ks,Ad=[],Cd=[],Rd=new Float32Array(16),Pd=new Float32Array(9),Id=new Float32Array(4);function ws(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Ad[i];if(r===void 0&&(r=new Float32Array(i),Ad[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Ee(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Te(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Da(s,t){let e=Cd[t];e===void 0&&(e=new Int32Array(t),Cd[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Hg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Vg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2fv(this.addr,t),Te(e,t)}}function Gg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;s.uniform3fv(this.addr,t),Te(e,t)}}function Wg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4fv(this.addr,t),Te(e,t)}}function $g(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Id.set(n),s.uniformMatrix2fv(this.addr,!1,Id),Te(e,n)}}function Xg(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Pd.set(n),s.uniformMatrix3fv(this.addr,!1,Pd),Te(e,n)}}function qg(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Rd.set(n),s.uniformMatrix4fv(this.addr,!1,Rd),Te(e,n)}}function Yg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Zg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2iv(this.addr,t),Te(e,t)}}function Kg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;s.uniform3iv(this.addr,t),Te(e,t)}}function Jg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4iv(this.addr,t),Te(e,t)}}function jg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Qg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2uiv(this.addr,t),Te(e,t)}}function t0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;s.uniform3uiv(this.addr,t),Te(e,t)}}function e0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4uiv(this.addr,t),Te(e,t)}}function n0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Td.compareFunction=jl,r=Td):r=Wd,e.setTexture2D(t||r,i)}function i0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Xd,i)}function s0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||qd,i)}function r0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||$d,i)}function o0(s){switch(s){case 5126:return Hg;case 35664:return Vg;case 35665:return Gg;case 35666:return Wg;case 35674:return $g;case 35675:return Xg;case 35676:return qg;case 5124:case 35670:return Yg;case 35667:case 35671:return Zg;case 35668:case 35672:return Kg;case 35669:case 35673:return Jg;case 5125:return jg;case 36294:return Qg;case 36295:return t0;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return n0;case 35679:case 36299:case 36307:return i0;case 35680:case 36300:case 36308:case 36293:return s0;case 36289:case 36303:case 36311:case 36292:return r0}}function a0(s,t){s.uniform1fv(this.addr,t)}function l0(s,t){let e=ws(t,this.size,2);s.uniform2fv(this.addr,e)}function c0(s,t){let e=ws(t,this.size,3);s.uniform3fv(this.addr,e)}function h0(s,t){let e=ws(t,this.size,4);s.uniform4fv(this.addr,e)}function d0(s,t){let e=ws(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function u0(s,t){let e=ws(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function f0(s,t){let e=ws(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function p0(s,t){s.uniform1iv(this.addr,t)}function m0(s,t){s.uniform2iv(this.addr,t)}function g0(s,t){s.uniform3iv(this.addr,t)}function y0(s,t){s.uniform4iv(this.addr,t)}function x0(s,t){s.uniform1uiv(this.addr,t)}function _0(s,t){s.uniform2uiv(this.addr,t)}function v0(s,t){s.uniform3uiv(this.addr,t)}function b0(s,t){s.uniform4uiv(this.addr,t)}function M0(s,t,e){let n=this.cache,i=t.length,r=Da(e,i);Ee(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Wd,r[o])}function S0(s,t,e){let n=this.cache,i=t.length,r=Da(e,i);Ee(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Xd,r[o])}function w0(s,t,e){let n=this.cache,i=t.length,r=Da(e,i);Ee(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||qd,r[o])}function E0(s,t,e){let n=this.cache,i=t.length,r=Da(e,i);Ee(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||$d,r[o])}function T0(s){switch(s){case 5126:return a0;case 35664:return l0;case 35665:return c0;case 35666:return h0;case 35674:return d0;case 35675:return u0;case 35676:return f0;case 5124:case 35670:return p0;case 35667:case 35671:return m0;case 35668:case 35672:return g0;case 35669:case 35673:return y0;case 5125:return x0;case 36294:return _0;case 36295:return v0;case 36296:return b0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return S0;case 35680:case 36300:case 36308:case 36293:return w0;case 36289:case 36303:case 36311:case 36292:return E0}}var pc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=o0(e.type)}},mc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=T0(e.type)}},gc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},fc=/(\w+)(\])?(\[|\.)?/g;function Dd(s,t){s.seq.push(t),s.map[t.id]=t}function A0(s,t,e){let n=s.name,i=n.length;for(fc.lastIndex=0;;){let r=fc.exec(n),o=fc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Dd(e,c===void 0?new pc(a,s,t):new mc(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new gc(a),Dd(e,d)),e=d}}}var Ss=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);A0(r,o,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function kd(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var C0=37297,R0=0;function P0(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Ld=new Bt;function I0(s){Yt._getMatrix(Ld,Yt.workingColorSpace,s);let t=`mat3( ${Ld.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(s)){case Gs:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Nd(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+P0(s.getShaderSource(t),a)}else return r}function D0(s,t){let e=I0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function k0(s,t){let e;switch(t){case qh:e="Linear";break;case Yh:e="Reinhard";break;case Zh:e="Cineon";break;case Kh:e="ACESFilmic";break;case jh:e="AgX";break;case Qh:e="Neutral";break;case Jh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ra=new P;function L0(){Yt.getLuminanceCoefficients(Ra);let s=Ra.x.toFixed(4),t=Ra.y.toFixed(4),e=Ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function N0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wr).join(`
`)}function U0(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function F0(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function wr(s){return s!==""}function Ud(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fd(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var O0=/^[ \t]*#include +<([\w\d./]+)>/gm;function yc(s){return s.replace(O0,z0)}var B0=new Map;function z0(s,t){let e=Gt[t];if(e===void 0){let n=B0.get(t);if(n!==void 0)e=Gt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return yc(e)}var H0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Od(s){return s.replace(H0,V0)}function V0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Bd(s){let t=`precision ${s.precision} float;
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
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function G0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Fl?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Th?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Pn&&(t="SHADOWMAP_TYPE_VSM"),t}function W0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Pi:case Ii:t="ENVMAP_TYPE_CUBE";break;case xr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function $0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ii:t="ENVMAP_MODE_REFRACTION";break}return t}function X0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Hl:t="ENVMAP_BLENDING_MULTIPLY";break;case $h:t="ENVMAP_BLENDING_MIX";break;case Xh:t="ENVMAP_BLENDING_ADD";break}return t}function q0(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Y0(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=G0(e),c=W0(e),h=$0(e),d=X0(e),u=q0(e),f=N0(e),p=U0(r),y=i.createProgram(),g,m,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(wr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(wr).join(`
`),m.length>0&&(m+=`
`)):(g=[Bd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wr).join(`
`),m=[Bd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?Gt.tonemapping_pars_fragment:"",e.toneMapping!==$n?k0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,D0("linearToOutputTexel",e.outputColorSpace),L0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(wr).join(`
`)),o=yc(o),o=Ud(o,e),o=Fd(o,e),a=yc(a),a=Ud(a,e),a=Fd(a,e),o=Od(o),a=Od(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=w+g+o,_=w+m+a,T=kd(i,i.VERTEX_SHADER,b),E=kd(i,i.FRAGMENT_SHADER,_);i.attachShader(y,T),i.attachShader(y,E),e.index0AttributeName!==void 0?i.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function C(R){if(s.debug.checkShaderErrors){let L=i.getProgramInfoLog(y)||"",U=i.getShaderInfoLog(T)||"",B=i.getShaderInfoLog(E)||"",$=L.trim(),G=U.trim(),q=B.trim(),V=!0,Z=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,T,E);else{let Q=Nd(i,T,"vertex"),ut=Nd(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+$+`
`+Q+`
`+ut)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(G===""||q==="")&&(Z=!1);Z&&(R.diagnostics={runnable:V,programLog:$,vertexShader:{log:G,prefix:g},fragmentShader:{log:q,prefix:m}})}i.deleteShader(T),i.deleteShader(E),D=new Ss(i,y),S=F0(i,y)}let D;this.getUniforms=function(){return D===void 0&&C(this),D};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(y,C0)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=R0++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=E,this}var Z0=0,xc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new _c(t),e.set(t,n)),n}},_c=class{constructor(t){this.id=Z0++,this.code=t,this.usedTimes=0}};function K0(s,t,e,n,i,r,o){let a=new ls,l=new xc,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures,f=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,v,R,L,U){let B=L.fog,$=U.geometry,G=S.isMeshStandardMaterial?L.environment:null,q=(S.isMeshStandardMaterial?e:t).get(S.envMap||G),V=q&&q.mapping===xr?q.image.height:null,Z=p[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let Q=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ut=Q!==void 0?Q.length:0,Ut=0;$.morphAttributes.position!==void 0&&(Ut=1),$.morphAttributes.normal!==void 0&&(Ut=2),$.morphAttributes.color!==void 0&&(Ut=3);let Jt,jt,qt,Y;if(Z){let Qt=Dn[Z];Jt=Qt.vertexShader,jt=Qt.fragmentShader}else Jt=S.vertexShader,jt=S.fragmentShader,l.update(S),qt=l.getVertexShaderID(S),Y=l.getFragmentShaderID(S);let j=s.getRenderTarget(),pt=s.state.buffers.depth.getReversed(),Lt=U.isInstancedMesh===!0,Et=U.isBatchedMesh===!0,Xt=!!S.map,ke=!!S.matcap,I=!!q,he=!!S.aoMap,Ot=!!S.lightMap,Dt=!!S.bumpMap,xt=!!S.normalMap,de=!!S.displacementMap,_t=!!S.emissiveMap,Ht=!!S.metalnessMap,Ce=!!S.roughnessMap,ve=S.anisotropy>0,A=S.clearcoat>0,x=S.dispersion>0,O=S.iridescence>0,X=S.sheen>0,J=S.transmission>0,W=ve&&!!S.anisotropyMap,wt=A&&!!S.clearcoatMap,st=A&&!!S.clearcoatNormalMap,vt=A&&!!S.clearcoatRoughnessMap,bt=O&&!!S.iridescenceMap,nt=O&&!!S.iridescenceThicknessMap,ht=X&&!!S.sheenColorMap,It=X&&!!S.sheenRoughnessMap,Mt=!!S.specularMap,lt=!!S.specularColorMap,zt=!!S.specularIntensityMap,k=J&&!!S.transmissionMap,it=J&&!!S.thicknessMap,rt=!!S.gradientMap,ft=!!S.alphaMap,tt=S.alphaTest>0,K=!!S.alphaHash,yt=!!S.extensions,Ft=$n;S.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ft=s.toneMapping);let re={shaderID:Z,shaderType:S.type,shaderName:S.name,vertexShader:Jt,fragmentShader:jt,defines:S.defines,customVertexShaderID:qt,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Et,batchingColor:Et&&U._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&U.instanceColor!==null,instancingMorph:Lt&&U.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:j===null?s.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Si,alphaToCoverage:!!S.alphaToCoverage,map:Xt,matcap:ke,envMap:I,envMapMode:I&&q.mapping,envMapCubeUVHeight:V,aoMap:he,lightMap:Ot,bumpMap:Dt,normalMap:xt,displacementMap:u&&de,emissiveMap:_t,normalMapObjectSpace:xt&&S.normalMapType===id,normalMapTangentSpace:xt&&S.normalMapType===Jl,metalnessMap:Ht,roughnessMap:Ce,anisotropy:ve,anisotropyMap:W,clearcoat:A,clearcoatMap:wt,clearcoatNormalMap:st,clearcoatRoughnessMap:vt,dispersion:x,iridescence:O,iridescenceMap:bt,iridescenceThicknessMap:nt,sheen:X,sheenColorMap:ht,sheenRoughnessMap:It,specularMap:Mt,specularColorMap:lt,specularIntensityMap:zt,transmission:J,transmissionMap:k,thicknessMap:it,gradientMap:rt,opaque:S.transparent===!1&&S.blending===bi&&S.alphaToCoverage===!1,alphaMap:ft,alphaTest:tt,alphaHash:K,combine:S.combine,mapUv:Xt&&y(S.map.channel),aoMapUv:he&&y(S.aoMap.channel),lightMapUv:Ot&&y(S.lightMap.channel),bumpMapUv:Dt&&y(S.bumpMap.channel),normalMapUv:xt&&y(S.normalMap.channel),displacementMapUv:de&&y(S.displacementMap.channel),emissiveMapUv:_t&&y(S.emissiveMap.channel),metalnessMapUv:Ht&&y(S.metalnessMap.channel),roughnessMapUv:Ce&&y(S.roughnessMap.channel),anisotropyMapUv:W&&y(S.anisotropyMap.channel),clearcoatMapUv:wt&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:st&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:It&&y(S.sheenRoughnessMap.channel),specularMapUv:Mt&&y(S.specularMap.channel),specularColorMapUv:lt&&y(S.specularColorMap.channel),specularIntensityMapUv:zt&&y(S.specularIntensityMap.channel),transmissionMapUv:k&&y(S.transmissionMap.channel),thicknessMapUv:it&&y(S.thicknessMap.channel),alphaMapUv:ft&&y(S.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(xt||ve),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!$.attributes.uv&&(Xt||ft),fog:!!B,useFog:S.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pt,skinning:U.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:Ut,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ft,decodeVideoTexture:Xt&&S.map.isVideoTexture===!0&&Yt.getTransfer(S.map.colorSpace)===te,decodeVideoTextureEmissive:_t&&S.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(S.emissiveMap.colorSpace)===te,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===_e,flipSided:S.side===Xe,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:yt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(yt&&S.extensions.multiDraw===!0||Et)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return re.vertexUv1s=c.has(1),re.vertexUv2s=c.has(2),re.vertexUv3s=c.has(3),c.clear(),re}function m(S){let v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(let R in S.defines)v.push(R),v.push(S.defines[R]);return S.isRawShaderMaterial===!1&&(w(v,S),b(v,S),v.push(s.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function w(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function b(S,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),v.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){let v=p[S.type],R;if(v){let L=Dn[v];R=pd.clone(L.uniforms)}else R=S.uniforms;return R}function T(S,v){let R;for(let L=0,U=h.length;L<U;L++){let B=h[L];if(B.cacheKey===v){R=B,++R.usedTimes;break}}return R===void 0&&(R=new Y0(s,v,S,r),h.push(R)),R}function E(S){if(--S.usedTimes===0){let v=h.indexOf(S);h[v]=h[h.length-1],h.pop(),S.destroy()}}function C(S){l.remove(S)}function D(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:_,acquireProgram:T,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:D}}function J0(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function j0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function zd(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Hd(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,f,p,y,g){let m=s[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:p,renderOrder:d.renderOrder,z:y,group:g},s[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=y,m.group=g),t++,m}function a(d,u,f,p,y,g){let m=o(d,u,f,p,y,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function l(d,u,f,p,y,g){let m=o(d,u,f,p,y,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function c(d,u){e.length>1&&e.sort(d||j0),n.length>1&&n.sort(u||zd),i.length>1&&i.sort(u||zd)}function h(){for(let d=t,u=s.length;d<u;d++){let f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Q0(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new Hd,s.set(n,[o])):i>=r.length?(o=new Hd,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function ty(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Nt};break;case"SpotLight":e={position:new P,direction:new P,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function ey(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var ny=0;function iy(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function sy(s){let t=new ty,e=ey(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let i=new P,r=new ee,o=new ee;function a(c){let h=0,d=0,u=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,p=0,y=0,g=0,m=0,w=0,b=0,_=0,T=0,E=0,C=0;c.sort(iy);for(let S=0,v=c.length;S<v;S++){let R=c[S],L=R.color,U=R.intensity,B=R.distance,$=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=L.r*U,d+=L.g*U,u+=L.b*U;else if(R.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(R.sh.coefficients[G],U);C++}else if(R.isDirectionalLight){let G=t.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let q=R.shadow,V=e.get(R);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=R.shadow.matrix,w++}n.directional[f]=G,f++}else if(R.isSpotLight){let G=t.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(L).multiplyScalar(U),G.distance=B,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,n.spot[y]=G;let q=R.shadow;if(R.map&&(n.spotLightMap[T]=R.map,T++,q.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[y]=q.matrix,R.castShadow){let V=e.get(R);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,n.spotShadow[y]=V,n.spotShadowMap[y]=$,_++}y++}else if(R.isRectAreaLight){let G=t.get(R);G.color.copy(L).multiplyScalar(U),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=G,g++}else if(R.isPointLight){let G=t.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){let q=R.shadow,V=e.get(R);V.shadowIntensity=q.intensity,V.shadowBias=q.bias,V.shadowNormalBias=q.normalBias,V.shadowRadius=q.radius,V.shadowMapSize=q.mapSize,V.shadowCameraNear=q.camera.near,V.shadowCameraFar=q.camera.far,n.pointShadow[p]=V,n.pointShadowMap[p]=$,n.pointShadowMatrix[p]=R.shadow.matrix,b++}n.point[p]=G,p++}else if(R.isHemisphereLight){let G=t.get(R);G.skyColor.copy(R.color).multiplyScalar(U),G.groundColor.copy(R.groundColor).multiplyScalar(U),n.hemi[m]=G,m++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let D=n.hash;(D.directionalLength!==f||D.pointLength!==p||D.spotLength!==y||D.rectAreaLength!==g||D.hemiLength!==m||D.numDirectionalShadows!==w||D.numPointShadows!==b||D.numSpotShadows!==_||D.numSpotMaps!==T||D.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=_+T-E,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,D.directionalLength=f,D.pointLength=p,D.spotLength=y,D.rectAreaLength=g,D.hemiLength=m,D.numDirectionalShadows=w,D.numPointShadows=b,D.numSpotShadows=_,D.numSpotMaps=T,D.numLightProbes=C,n.version=ny++)}function l(c,h){let d=0,u=0,f=0,p=0,y=0,g=h.matrixWorldInverse;for(let m=0,w=c.length;m<w;m++){let b=c[m];if(b.isDirectionalLight){let _=n.directional[d];_.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),d++}else if(b.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),f++}else if(b.isRectAreaLight){let _=n.rectArea[p];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(b.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),p++}else if(b.isPointLight){let _=n.point[u];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(g),u++}else if(b.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(g),y++}}}return{setup:a,setupView:l,state:n}}function Vd(s){let t=new sy(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function ry(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new Vd(s),t.set(i,[a])):r>=o.length?(a=new Vd(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var oy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ay=`uniform sampler2D shadow_pass;
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
}`;function ly(s,t,e){let n=new ds,i=new ot,r=new ot,o=new ge,a=new Eo({depthPacking:nd}),l=new To,c={},h=e.maxTextureSize,d={[Hn]:Xe,[Xe]:Hn,[_e]:_e},u=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:oy,fragmentShader:ay}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new Kt;p.setAttribute("position",new le(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ce(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fl;let m=this.type;this.render=function(E,C,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;let S=s.getRenderTarget(),v=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),L=s.state;L.setBlending(Wn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let U=m!==Pn&&this.type===Pn,B=m===Pn&&this.type!==Pn;for(let $=0,G=E.length;$<G;$++){let q=E[$],V=q.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);let Z=V.getFrameExtents();if(i.multiply(Z),r.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Z.x),i.x=r.x*Z.x,V.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Z.y),i.y=r.y*Z.y,V.mapSize.y=r.y)),V.map===null||U===!0||B===!0){let ut=this.type!==Pn?{minFilter:pn,magFilter:pn}:{};V.map!==null&&V.map.dispose(),V.map=new Cn(i.x,i.y,ut),V.map.texture.name=q.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();let Q=V.getViewportCount();for(let ut=0;ut<Q;ut++){let Ut=V.getViewport(ut);o.set(r.x*Ut.x,r.y*Ut.y,r.x*Ut.z,r.y*Ut.w),L.viewport(o),V.updateMatrices(q,ut),n=V.getFrustum(),_(C,D,V.camera,q,this.type)}V.isPointLightShadow!==!0&&this.type===Pn&&w(V,D),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(S,v,R)};function w(E,C){let D=t.update(y);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Cn(i.x,i.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(C,null,D,u,y,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(C,null,D,f,y,null)}function b(E,C,D,S){let v=null,R=D.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)v=R;else if(v=D.isPointLight===!0?l:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let L=v.uuid,U=C.uuid,B=c[L];B===void 0&&(B={},c[L]=B);let $=B[U];$===void 0&&($=v.clone(),B[U]=$,C.addEventListener("dispose",T)),v=$}if(v.visible=C.visible,v.wireframe=C.wireframe,S===Pn?v.side=C.shadowSide!==null?C.shadowSide:C.side:v.side=C.shadowSide!==null?C.shadowSide:d[C.side],v.alphaMap=C.alphaMap,v.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,v.map=C.map,v.clipShadows=C.clipShadows,v.clippingPlanes=C.clippingPlanes,v.clipIntersection=C.clipIntersection,v.displacementMap=C.displacementMap,v.displacementScale=C.displacementScale,v.displacementBias=C.displacementBias,v.wireframeLinewidth=C.wireframeLinewidth,v.linewidth=C.linewidth,D.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let L=s.properties.get(v);L.light=D}return v}function _(E,C,D,S,v){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&v===Pn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,E.matrixWorld);let U=t.update(E),B=E.material;if(Array.isArray(B)){let $=U.groups;for(let G=0,q=$.length;G<q;G++){let V=$[G],Z=B[V.materialIndex];if(Z&&Z.visible){let Q=b(E,Z,S,v);E.onBeforeShadow(s,E,C,D,U,Q,V),s.renderBufferDirect(D,null,U,Q,E,V),E.onAfterShadow(s,E,C,D,U,Q,V)}}}else if(B.visible){let $=b(E,B,S,v);E.onBeforeShadow(s,E,C,D,U,$,null),s.renderBufferDirect(D,null,U,$,E,null),E.onAfterShadow(s,E,C,D,U,$,null)}}let L=E.children;for(let U=0,B=L.length;U<B;U++)_(L[U],C,D,S,v)}function T(E){E.target.removeEventListener("dispose",T);for(let D in c){let S=c[D],v=E.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}var cy={[Fo]:Oo,[Bo]:Vo,[zo]:Go,[Mi]:Ho,[Oo]:Fo,[Vo]:Bo,[Go]:zo,[Ho]:Mi};function hy(s,t){function e(){let k=!1,it=new ge,rt=null,ft=new ge(0,0,0,0);return{setMask:function(tt){rt!==tt&&!k&&(s.colorMask(tt,tt,tt,tt),rt=tt)},setLocked:function(tt){k=tt},setClear:function(tt,K,yt,Ft,re){re===!0&&(tt*=Ft,K*=Ft,yt*=Ft),it.set(tt,K,yt,Ft),ft.equals(it)===!1&&(s.clearColor(tt,K,yt,Ft),ft.copy(it))},reset:function(){k=!1,rt=null,ft.set(-1,0,0,0)}}}function n(){let k=!1,it=!1,rt=null,ft=null,tt=null;return{setReversed:function(K){if(it!==K){let yt=t.get("EXT_clip_control");K?yt.clipControlEXT(yt.LOWER_LEFT_EXT,yt.ZERO_TO_ONE_EXT):yt.clipControlEXT(yt.LOWER_LEFT_EXT,yt.NEGATIVE_ONE_TO_ONE_EXT),it=K;let Ft=tt;tt=null,this.setClear(Ft)}},getReversed:function(){return it},setTest:function(K){K?j(s.DEPTH_TEST):pt(s.DEPTH_TEST)},setMask:function(K){rt!==K&&!k&&(s.depthMask(K),rt=K)},setFunc:function(K){if(it&&(K=cy[K]),ft!==K){switch(K){case Fo:s.depthFunc(s.NEVER);break;case Oo:s.depthFunc(s.ALWAYS);break;case Bo:s.depthFunc(s.LESS);break;case Mi:s.depthFunc(s.LEQUAL);break;case zo:s.depthFunc(s.EQUAL);break;case Ho:s.depthFunc(s.GEQUAL);break;case Vo:s.depthFunc(s.GREATER);break;case Go:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ft=K}},setLocked:function(K){k=K},setClear:function(K){tt!==K&&(it&&(K=1-K),s.clearDepth(K),tt=K)},reset:function(){k=!1,rt=null,ft=null,tt=null,it=!1}}}function i(){let k=!1,it=null,rt=null,ft=null,tt=null,K=null,yt=null,Ft=null,re=null;return{setTest:function(Qt){k||(Qt?j(s.STENCIL_TEST):pt(s.STENCIL_TEST))},setMask:function(Qt){it!==Qt&&!k&&(s.stencilMask(Qt),it=Qt)},setFunc:function(Qt,kn,Tn){(rt!==Qt||ft!==kn||tt!==Tn)&&(s.stencilFunc(Qt,kn,Tn),rt=Qt,ft=kn,tt=Tn)},setOp:function(Qt,kn,Tn){(K!==Qt||yt!==kn||Ft!==Tn)&&(s.stencilOp(Qt,kn,Tn),K=Qt,yt=kn,Ft=Tn)},setLocked:function(Qt){k=Qt},setClear:function(Qt){re!==Qt&&(s.clearStencil(Qt),re=Qt)},reset:function(){k=!1,it=null,rt=null,ft=null,tt=null,K=null,yt=null,Ft=null,re=null}}}let r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,f=[],p=null,y=!1,g=null,m=null,w=null,b=null,_=null,T=null,E=null,C=new Nt(0,0,0),D=0,S=!1,v=null,R=null,L=null,U=null,B=null,$=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,q=0,V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=q>=1):V.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=q>=2);let Z=null,Q={},ut=s.getParameter(s.SCISSOR_BOX),Ut=s.getParameter(s.VIEWPORT),Jt=new ge().fromArray(ut),jt=new ge().fromArray(Ut);function qt(k,it,rt,ft){let tt=new Uint8Array(4),K=s.createTexture();s.bindTexture(k,K),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let yt=0;yt<rt;yt++)k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY?s.texImage3D(it,0,s.RGBA,1,1,ft,0,s.RGBA,s.UNSIGNED_BYTE,tt):s.texImage2D(it+yt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,tt);return K}let Y={};Y[s.TEXTURE_2D]=qt(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=qt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=qt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=qt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(s.DEPTH_TEST),o.setFunc(Mi),Dt(!1),xt(Ul),j(s.CULL_FACE),he(Wn);function j(k){h[k]!==!0&&(s.enable(k),h[k]=!0)}function pt(k){h[k]!==!1&&(s.disable(k),h[k]=!1)}function Lt(k,it){return d[k]!==it?(s.bindFramebuffer(k,it),d[k]=it,k===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=it),k===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=it),!0):!1}function Et(k,it){let rt=f,ft=!1;if(k){rt=u.get(it),rt===void 0&&(rt=[],u.set(it,rt));let tt=k.textures;if(rt.length!==tt.length||rt[0]!==s.COLOR_ATTACHMENT0){for(let K=0,yt=tt.length;K<yt;K++)rt[K]=s.COLOR_ATTACHMENT0+K;rt.length=tt.length,ft=!0}}else rt[0]!==s.BACK&&(rt[0]=s.BACK,ft=!0);ft&&s.drawBuffers(rt)}function Xt(k){return p!==k?(s.useProgram(k),p=k,!0):!1}let ke={[ei]:s.FUNC_ADD,[Ch]:s.FUNC_SUBTRACT,[Rh]:s.FUNC_REVERSE_SUBTRACT};ke[Ph]=s.MIN,ke[Ih]=s.MAX;let I={[Dh]:s.ZERO,[kh]:s.ONE,[Lh]:s.SRC_COLOR,[oo]:s.SRC_ALPHA,[zh]:s.SRC_ALPHA_SATURATE,[Oh]:s.DST_COLOR,[Uh]:s.DST_ALPHA,[Nh]:s.ONE_MINUS_SRC_COLOR,[ao]:s.ONE_MINUS_SRC_ALPHA,[Bh]:s.ONE_MINUS_DST_COLOR,[Fh]:s.ONE_MINUS_DST_ALPHA,[Hh]:s.CONSTANT_COLOR,[Vh]:s.ONE_MINUS_CONSTANT_COLOR,[Gh]:s.CONSTANT_ALPHA,[Wh]:s.ONE_MINUS_CONSTANT_ALPHA};function he(k,it,rt,ft,tt,K,yt,Ft,re,Qt){if(k===Wn){y===!0&&(pt(s.BLEND),y=!1);return}if(y===!1&&(j(s.BLEND),y=!0),k!==Ah){if(k!==g||Qt!==S){if((m!==ei||_!==ei)&&(s.blendEquation(s.FUNC_ADD),m=ei,_=ei),Qt)switch(k){case bi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ol:s.blendFunc(s.ONE,s.ONE);break;case Bl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case zl:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case bi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ol:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Bl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}w=null,b=null,T=null,E=null,C.set(0,0,0),D=0,g=k,S=Qt}return}tt=tt||it,K=K||rt,yt=yt||ft,(it!==m||tt!==_)&&(s.blendEquationSeparate(ke[it],ke[tt]),m=it,_=tt),(rt!==w||ft!==b||K!==T||yt!==E)&&(s.blendFuncSeparate(I[rt],I[ft],I[K],I[yt]),w=rt,b=ft,T=K,E=yt),(Ft.equals(C)===!1||re!==D)&&(s.blendColor(Ft.r,Ft.g,Ft.b,re),C.copy(Ft),D=re),g=k,S=!1}function Ot(k,it){k.side===_e?pt(s.CULL_FACE):j(s.CULL_FACE);let rt=k.side===Xe;it&&(rt=!rt),Dt(rt),k.blending===bi&&k.transparent===!1?he(Wn):he(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);let ft=k.stencilWrite;a.setTest(ft),ft&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),_t(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?j(s.SAMPLE_ALPHA_TO_COVERAGE):pt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(k){v!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),v=k)}function xt(k){k!==wh?(j(s.CULL_FACE),k!==R&&(k===Ul?s.cullFace(s.BACK):k===Eh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):pt(s.CULL_FACE),R=k}function de(k){k!==L&&(G&&s.lineWidth(k),L=k)}function _t(k,it,rt){k?(j(s.POLYGON_OFFSET_FILL),(U!==it||B!==rt)&&(s.polygonOffset(it,rt),U=it,B=rt)):pt(s.POLYGON_OFFSET_FILL)}function Ht(k){k?j(s.SCISSOR_TEST):pt(s.SCISSOR_TEST)}function Ce(k){k===void 0&&(k=s.TEXTURE0+$-1),Z!==k&&(s.activeTexture(k),Z=k)}function ve(k,it,rt){rt===void 0&&(Z===null?rt=s.TEXTURE0+$-1:rt=Z);let ft=Q[rt];ft===void 0&&(ft={type:void 0,texture:void 0},Q[rt]=ft),(ft.type!==k||ft.texture!==it)&&(Z!==rt&&(s.activeTexture(rt),Z=rt),s.bindTexture(k,it||Y[k]),ft.type=k,ft.texture=it)}function A(){let k=Q[Z];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function x(){try{s.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function O(){try{s.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function X(){try{s.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function J(){try{s.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function W(){try{s.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function wt(){try{s.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function st(){try{s.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function vt(){try{s.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function bt(){try{s.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function nt(){try{s.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ht(k){Jt.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),Jt.copy(k))}function It(k){jt.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),jt.copy(k))}function Mt(k,it){let rt=c.get(it);rt===void 0&&(rt=new WeakMap,c.set(it,rt));let ft=rt.get(k);ft===void 0&&(ft=s.getUniformBlockIndex(it,k.name),rt.set(k,ft))}function lt(k,it){let ft=c.get(it).get(k);l.get(it)!==ft&&(s.uniformBlockBinding(it,ft,k.__bindingPointIndex),l.set(it,ft))}function zt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},Z=null,Q={},d={},u=new WeakMap,f=[],p=null,y=!1,g=null,m=null,w=null,b=null,_=null,T=null,E=null,C=new Nt(0,0,0),D=0,S=!1,v=null,R=null,L=null,U=null,B=null,Jt.set(0,0,s.canvas.width,s.canvas.height),jt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:j,disable:pt,bindFramebuffer:Lt,drawBuffers:Et,useProgram:Xt,setBlending:he,setMaterial:Ot,setFlipSided:Dt,setCullFace:xt,setLineWidth:de,setPolygonOffset:_t,setScissorTest:Ht,activeTexture:Ce,bindTexture:ve,unbindTexture:A,compressedTexImage2D:x,compressedTexImage3D:O,texImage2D:bt,texImage3D:nt,updateUBOMapping:Mt,uniformBlockBinding:lt,texStorage2D:st,texStorage3D:vt,texSubImage2D:X,texSubImage3D:J,compressedTexSubImage2D:W,compressedTexSubImage3D:wt,scissor:ht,viewport:It,reset:zt}}function dy(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,x){return f?new OffscreenCanvas(A,x):$s("canvas")}function y(A,x,O){let X=1,J=ve(A);if((J.width>O||J.height>O)&&(X=O/Math.max(J.width,J.height)),X<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let W=Math.floor(X*J.width),wt=Math.floor(X*J.height);d===void 0&&(d=p(W,wt));let st=x?p(W,wt):d;return st.width=W,st.height=wt,st.getContext("2d").drawImage(A,0,0,W,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+W+"x"+wt+")."),st}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),A;return A}function g(A){return A.generateMipmaps}function m(A){s.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(A,x,O,X,J=!1){if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let W=x;if(x===s.RED&&(O===s.FLOAT&&(W=s.R32F),O===s.HALF_FLOAT&&(W=s.R16F),O===s.UNSIGNED_BYTE&&(W=s.R8)),x===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(W=s.R8UI),O===s.UNSIGNED_SHORT&&(W=s.R16UI),O===s.UNSIGNED_INT&&(W=s.R32UI),O===s.BYTE&&(W=s.R8I),O===s.SHORT&&(W=s.R16I),O===s.INT&&(W=s.R32I)),x===s.RG&&(O===s.FLOAT&&(W=s.RG32F),O===s.HALF_FLOAT&&(W=s.RG16F),O===s.UNSIGNED_BYTE&&(W=s.RG8)),x===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(W=s.RG8UI),O===s.UNSIGNED_SHORT&&(W=s.RG16UI),O===s.UNSIGNED_INT&&(W=s.RG32UI),O===s.BYTE&&(W=s.RG8I),O===s.SHORT&&(W=s.RG16I),O===s.INT&&(W=s.RG32I)),x===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(W=s.RGB8UI),O===s.UNSIGNED_SHORT&&(W=s.RGB16UI),O===s.UNSIGNED_INT&&(W=s.RGB32UI),O===s.BYTE&&(W=s.RGB8I),O===s.SHORT&&(W=s.RGB16I),O===s.INT&&(W=s.RGB32I)),x===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(W=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(W=s.RGBA16UI),O===s.UNSIGNED_INT&&(W=s.RGBA32UI),O===s.BYTE&&(W=s.RGBA8I),O===s.SHORT&&(W=s.RGBA16I),O===s.INT&&(W=s.RGBA32I)),x===s.RGB&&(O===s.UNSIGNED_INT_5_9_9_9_REV&&(W=s.RGB9_E5),O===s.UNSIGNED_INT_10F_11F_11F_REV&&(W=s.R11F_G11F_B10F)),x===s.RGBA){let wt=J?Gs:Yt.getTransfer(X);O===s.FLOAT&&(W=s.RGBA32F),O===s.HALF_FLOAT&&(W=s.RGBA16F),O===s.UNSIGNED_BYTE&&(W=wt===te?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(W=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(W=s.RGB5_A1)}return(W===s.R16F||W===s.R32F||W===s.RG16F||W===s.RG32F||W===s.RGBA16F||W===s.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function _(A,x){let O;return A?x===null||x===ai||x===_s?O=s.DEPTH24_STENCIL8:x===In?O=s.DEPTH32F_STENCIL8:x===ys&&(O=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ai||x===_s?O=s.DEPTH_COMPONENT24:x===In?O=s.DEPTH_COMPONENT32F:x===ys&&(O=s.DEPTH_COMPONENT16),O}function T(A,x){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==pn&&A.minFilter!==bn?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function E(A){let x=A.target;x.removeEventListener("dispose",E),D(x),x.isVideoTexture&&h.delete(x)}function C(A){let x=A.target;x.removeEventListener("dispose",C),v(x)}function D(A){let x=n.get(A);if(x.__webglInit===void 0)return;let O=A.source,X=u.get(O);if(X){let J=X[x.__cacheKey];J.usedTimes--,J.usedTimes===0&&S(A),Object.keys(X).length===0&&u.delete(O)}n.remove(A)}function S(A){let x=n.get(A);s.deleteTexture(x.__webglTexture);let O=A.source,X=u.get(O);delete X[x.__cacheKey],o.memory.textures--}function v(A){let x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let J=0;J<x.__webglFramebuffer[X].length;J++)s.deleteFramebuffer(x.__webglFramebuffer[X][J]);else s.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)s.deleteFramebuffer(x.__webglFramebuffer[X]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let O=A.textures;for(let X=0,J=O.length;X<J;X++){let W=n.get(O[X]);W.__webglTexture&&(s.deleteTexture(W.__webglTexture),o.memory.textures--),n.remove(O[X])}n.remove(A)}let R=0;function L(){R=0}function U(){let A=R;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),R+=1,A}function B(A){let x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function $(A,x){let O=n.get(A);if(A.isVideoTexture&&Ht(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){let X=A.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,A,x);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+x)}function G(A,x){let O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Y(O,A,x);return}e.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+x)}function q(A,x){let O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Y(O,A,x);return}e.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+x)}function V(A,x){let O=n.get(A);if(A.version>0&&O.__version!==A.version){j(O,A,x);return}e.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+x)}let Z={[lo]:s.REPEAT,[ti]:s.CLAMP_TO_EDGE,[co]:s.MIRRORED_REPEAT},Q={[pn]:s.NEAREST,[td]:s.NEAREST_MIPMAP_NEAREST,[_r]:s.NEAREST_MIPMAP_LINEAR,[bn]:s.LINEAR,[Xo]:s.LINEAR_MIPMAP_NEAREST,[oi]:s.LINEAR_MIPMAP_LINEAR},ut={[sd]:s.NEVER,[hd]:s.ALWAYS,[rd]:s.LESS,[jl]:s.LEQUAL,[od]:s.EQUAL,[cd]:s.GEQUAL,[ad]:s.GREATER,[ld]:s.NOTEQUAL};function Ut(A,x){if(x.type===In&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===bn||x.magFilter===Xo||x.magFilter===_r||x.magFilter===oi||x.minFilter===bn||x.minFilter===Xo||x.minFilter===_r||x.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,Z[x.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,Z[x.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,Z[x.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,Q[x.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,Q[x.minFilter]),x.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,ut[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===pn||x.minFilter!==_r&&x.minFilter!==oi||x.type===In&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");s.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Jt(A,x){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",E));let X=x.source,J=u.get(X);J===void 0&&(J={},u.set(X,J));let W=B(x);if(W!==A.__cacheKey){J[W]===void 0&&(J[W]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,O=!0),J[W].usedTimes++;let wt=J[A.__cacheKey];wt!==void 0&&(J[A.__cacheKey].usedTimes--,wt.usedTimes===0&&S(x)),A.__cacheKey=W,A.__webglTexture=J[W].texture}return O}function jt(A,x,O){return Math.floor(Math.floor(A/O)/x)}function qt(A,x,O,X){let W=A.updateRanges;if(W.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,x.width,x.height,O,X,x.data);else{W.sort((nt,ht)=>nt.start-ht.start);let wt=0;for(let nt=1;nt<W.length;nt++){let ht=W[wt],It=W[nt],Mt=ht.start+ht.count,lt=jt(It.start,x.width,4),zt=jt(ht.start,x.width,4);It.start<=Mt+1&&lt===zt&&jt(It.start+It.count-1,x.width,4)===lt?ht.count=Math.max(ht.count,It.start+It.count-ht.start):(++wt,W[wt]=It)}W.length=wt+1;let st=s.getParameter(s.UNPACK_ROW_LENGTH),vt=s.getParameter(s.UNPACK_SKIP_PIXELS),bt=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,x.width);for(let nt=0,ht=W.length;nt<ht;nt++){let It=W[nt],Mt=Math.floor(It.start/4),lt=Math.ceil(It.count/4),zt=Mt%x.width,k=Math.floor(Mt/x.width),it=lt,rt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,zt),s.pixelStorei(s.UNPACK_SKIP_ROWS,k),e.texSubImage2D(s.TEXTURE_2D,0,zt,k,it,rt,O,X,x.data)}A.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,st),s.pixelStorei(s.UNPACK_SKIP_PIXELS,vt),s.pixelStorei(s.UNPACK_SKIP_ROWS,bt)}}function Y(A,x,O){let X=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=s.TEXTURE_3D);let J=Jt(A,x),W=x.source;e.bindTexture(X,A.__webglTexture,s.TEXTURE0+O);let wt=n.get(W);if(W.version!==wt.__version||J===!0){e.activeTexture(s.TEXTURE0+O);let st=Yt.getPrimaries(Yt.workingColorSpace),vt=x.colorSpace===Xn?null:Yt.getPrimaries(x.colorSpace),bt=x.colorSpace===Xn||st===vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);let nt=y(x.image,!1,i.maxTextureSize);nt=Ce(x,nt);let ht=r.convert(x.format,x.colorSpace),It=r.convert(x.type),Mt=b(x.internalFormat,ht,It,x.colorSpace,x.isVideoTexture);Ut(X,x);let lt,zt=x.mipmaps,k=x.isVideoTexture!==!0,it=wt.__version===void 0||J===!0,rt=W.dataReady,ft=T(x,nt);if(x.isDepthTexture)Mt=_(x.format===vs,x.type),it&&(k?e.texStorage2D(s.TEXTURE_2D,1,Mt,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,Mt,nt.width,nt.height,0,ht,It,null));else if(x.isDataTexture)if(zt.length>0){k&&it&&e.texStorage2D(s.TEXTURE_2D,ft,Mt,zt[0].width,zt[0].height);for(let tt=0,K=zt.length;tt<K;tt++)lt=zt[tt],k?rt&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,lt.width,lt.height,ht,It,lt.data):e.texImage2D(s.TEXTURE_2D,tt,Mt,lt.width,lt.height,0,ht,It,lt.data);x.generateMipmaps=!1}else k?(it&&e.texStorage2D(s.TEXTURE_2D,ft,Mt,nt.width,nt.height),rt&&qt(x,nt,ht,It)):e.texImage2D(s.TEXTURE_2D,0,Mt,nt.width,nt.height,0,ht,It,nt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){k&&it&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,Mt,zt[0].width,zt[0].height,nt.depth);for(let tt=0,K=zt.length;tt<K;tt++)if(lt=zt[tt],x.format!==gn)if(ht!==null)if(k){if(rt)if(x.layerUpdates.size>0){let yt=ac(lt.width,lt.height,x.format,x.type);for(let Ft of x.layerUpdates){let re=lt.data.subarray(Ft*yt/lt.data.BYTES_PER_ELEMENT,(Ft+1)*yt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,Ft,lt.width,lt.height,1,ht,re)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,ht,lt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,tt,Mt,lt.width,lt.height,nt.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?rt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,ht,It,lt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,tt,Mt,lt.width,lt.height,nt.depth,0,ht,It,lt.data)}else{k&&it&&e.texStorage2D(s.TEXTURE_2D,ft,Mt,zt[0].width,zt[0].height);for(let tt=0,K=zt.length;tt<K;tt++)lt=zt[tt],x.format!==gn?ht!==null?k?rt&&e.compressedTexSubImage2D(s.TEXTURE_2D,tt,0,0,lt.width,lt.height,ht,lt.data):e.compressedTexImage2D(s.TEXTURE_2D,tt,Mt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?rt&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,lt.width,lt.height,ht,It,lt.data):e.texImage2D(s.TEXTURE_2D,tt,Mt,lt.width,lt.height,0,ht,It,lt.data)}else if(x.isDataArrayTexture)if(k){if(it&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,Mt,nt.width,nt.height,nt.depth),rt)if(x.layerUpdates.size>0){let tt=ac(nt.width,nt.height,x.format,x.type);for(let K of x.layerUpdates){let yt=nt.data.subarray(K*tt/nt.data.BYTES_PER_ELEMENT,(K+1)*tt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,K,nt.width,nt.height,1,ht,It,yt)}x.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ht,It,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Mt,nt.width,nt.height,nt.depth,0,ht,It,nt.data);else if(x.isData3DTexture)k?(it&&e.texStorage3D(s.TEXTURE_3D,ft,Mt,nt.width,nt.height,nt.depth),rt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ht,It,nt.data)):e.texImage3D(s.TEXTURE_3D,0,Mt,nt.width,nt.height,nt.depth,0,ht,It,nt.data);else if(x.isFramebufferTexture){if(it)if(k)e.texStorage2D(s.TEXTURE_2D,ft,Mt,nt.width,nt.height);else{let tt=nt.width,K=nt.height;for(let yt=0;yt<ft;yt++)e.texImage2D(s.TEXTURE_2D,yt,Mt,tt,K,0,ht,It,null),tt>>=1,K>>=1}}else if(zt.length>0){if(k&&it){let tt=ve(zt[0]);e.texStorage2D(s.TEXTURE_2D,ft,Mt,tt.width,tt.height)}for(let tt=0,K=zt.length;tt<K;tt++)lt=zt[tt],k?rt&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,ht,It,lt):e.texImage2D(s.TEXTURE_2D,tt,Mt,ht,It,lt);x.generateMipmaps=!1}else if(k){if(it){let tt=ve(nt);e.texStorage2D(s.TEXTURE_2D,ft,Mt,tt.width,tt.height)}rt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ht,It,nt)}else e.texImage2D(s.TEXTURE_2D,0,Mt,ht,It,nt);g(x)&&m(X),wt.__version=W.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function j(A,x,O){if(x.image.length!==6)return;let X=Jt(A,x),J=x.source;e.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+O);let W=n.get(J);if(J.version!==W.__version||X===!0){e.activeTexture(s.TEXTURE0+O);let wt=Yt.getPrimaries(Yt.workingColorSpace),st=x.colorSpace===Xn?null:Yt.getPrimaries(x.colorSpace),vt=x.colorSpace===Xn||wt===st?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let bt=x.isCompressedTexture||x.image[0].isCompressedTexture,nt=x.image[0]&&x.image[0].isDataTexture,ht=[];for(let K=0;K<6;K++)!bt&&!nt?ht[K]=y(x.image[K],!0,i.maxCubemapSize):ht[K]=nt?x.image[K].image:x.image[K],ht[K]=Ce(x,ht[K]);let It=ht[0],Mt=r.convert(x.format,x.colorSpace),lt=r.convert(x.type),zt=b(x.internalFormat,Mt,lt,x.colorSpace),k=x.isVideoTexture!==!0,it=W.__version===void 0||X===!0,rt=J.dataReady,ft=T(x,It);Ut(s.TEXTURE_CUBE_MAP,x);let tt;if(bt){k&&it&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,zt,It.width,It.height);for(let K=0;K<6;K++){tt=ht[K].mipmaps;for(let yt=0;yt<tt.length;yt++){let Ft=tt[yt];x.format!==gn?Mt!==null?k?rt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,0,0,Ft.width,Ft.height,Mt,Ft.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,zt,Ft.width,Ft.height,0,Ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,0,0,Ft.width,Ft.height,Mt,lt,Ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,zt,Ft.width,Ft.height,0,Mt,lt,Ft.data)}}}else{if(tt=x.mipmaps,k&&it){tt.length>0&&ft++;let K=ve(ht[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,zt,K.width,K.height)}for(let K=0;K<6;K++)if(nt){k?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ht[K].width,ht[K].height,Mt,lt,ht[K].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,zt,ht[K].width,ht[K].height,0,Mt,lt,ht[K].data);for(let yt=0;yt<tt.length;yt++){let re=tt[yt].image[K].image;k?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,0,0,re.width,re.height,Mt,lt,re.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,zt,re.width,re.height,0,Mt,lt,re.data)}}else{k?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Mt,lt,ht[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,zt,Mt,lt,ht[K]);for(let yt=0;yt<tt.length;yt++){let Ft=tt[yt];k?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,0,0,Mt,lt,Ft.image[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,zt,Mt,lt,Ft.image[K])}}}g(x)&&m(s.TEXTURE_CUBE_MAP),W.__version=J.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function pt(A,x,O,X,J,W){let wt=r.convert(O.format,O.colorSpace),st=r.convert(O.type),vt=b(O.internalFormat,wt,st,O.colorSpace),bt=n.get(x),nt=n.get(O);if(nt.__renderTarget=x,!bt.__hasExternalTextures){let ht=Math.max(1,x.width>>W),It=Math.max(1,x.height>>W);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,W,vt,ht,It,x.depth,0,wt,st,null):e.texImage2D(J,W,vt,ht,It,0,wt,st,null)}e.bindFramebuffer(s.FRAMEBUFFER,A),_t(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,J,nt.__webglTexture,0,de(x)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,J,nt.__webglTexture,W),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Lt(A,x,O){if(s.bindRenderbuffer(s.RENDERBUFFER,A),x.depthBuffer){let X=x.depthTexture,J=X&&X.isDepthTexture?X.type:null,W=_(x.stencilBuffer,J),wt=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,st=de(x);_t(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,st,W,x.width,x.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,st,W,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,W,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,wt,s.RENDERBUFFER,A)}else{let X=x.textures;for(let J=0;J<X.length;J++){let W=X[J],wt=r.convert(W.format,W.colorSpace),st=r.convert(W.type),vt=b(W.internalFormat,wt,st,W.colorSpace),bt=de(x);O&&_t(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,bt,vt,x.width,x.height):_t(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,bt,vt,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,vt,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Et(A,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(x.depthTexture);X.__renderTarget=x,(!X.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),$(x.depthTexture,0);let J=X.__webglTexture,W=de(x);if(x.depthTexture.format===ss)_t(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,W):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(x.depthTexture.format===vs)_t(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,W):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Xt(A){let x=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){let X=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){let J=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",J)};X.addEventListener("dispose",J),x.__depthDisposeCallback=J}x.__boundDepthTexture=X}if(A.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");let X=A.texture.mipmaps;X&&X.length>0?Et(x.__webglFramebuffer[0],A):Et(x.__webglFramebuffer,A)}else if(O){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=s.createRenderbuffer(),Lt(x.__webglDepthbuffer[X],A,!1);else{let J=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer[X];s.bindRenderbuffer(s.RENDERBUFFER,W),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,W)}}else{let X=A.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),Lt(x.__webglDepthbuffer,A,!1);else{let J=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,W=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,W),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,W)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function ke(A,x,O){let X=n.get(A);x!==void 0&&pt(X.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&Xt(A)}function I(A){let x=A.texture,O=n.get(A),X=n.get(x);A.addEventListener("dispose",C);let J=A.textures,W=A.isWebGLCubeRenderTarget===!0,wt=J.length>1;if(wt||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=x.version,o.memory.textures++),W){O.__webglFramebuffer=[];for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[st]=[];for(let vt=0;vt<x.mipmaps.length;vt++)O.__webglFramebuffer[st][vt]=s.createFramebuffer()}else O.__webglFramebuffer[st]=s.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let st=0;st<x.mipmaps.length;st++)O.__webglFramebuffer[st]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(wt)for(let st=0,vt=J.length;st<vt;st++){let bt=n.get(J[st]);bt.__webglTexture===void 0&&(bt.__webglTexture=s.createTexture(),o.memory.textures++)}if(A.samples>0&&_t(A)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let st=0;st<J.length;st++){let vt=J[st];O.__webglColorRenderbuffer[st]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[st]);let bt=r.convert(vt.format,vt.colorSpace),nt=r.convert(vt.type),ht=b(vt.internalFormat,bt,nt,vt.colorSpace,A.isXRRenderTarget===!0),It=de(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,It,ht,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+st,s.RENDERBUFFER,O.__webglColorRenderbuffer[st])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),Lt(O.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(W){e.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),Ut(s.TEXTURE_CUBE_MAP,x);for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0)for(let vt=0;vt<x.mipmaps.length;vt++)pt(O.__webglFramebuffer[st][vt],A,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+st,vt);else pt(O.__webglFramebuffer[st],A,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);g(x)&&m(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let st=0,vt=J.length;st<vt;st++){let bt=J[st],nt=n.get(bt),ht=s.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ht=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,nt.__webglTexture),Ut(ht,bt),pt(O.__webglFramebuffer,A,bt,s.COLOR_ATTACHMENT0+st,ht,0),g(bt)&&m(ht)}e.unbindTexture()}else{let st=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(st=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(st,X.__webglTexture),Ut(st,x),x.mipmaps&&x.mipmaps.length>0)for(let vt=0;vt<x.mipmaps.length;vt++)pt(O.__webglFramebuffer[vt],A,x,s.COLOR_ATTACHMENT0,st,vt);else pt(O.__webglFramebuffer,A,x,s.COLOR_ATTACHMENT0,st,0);g(x)&&m(st),e.unbindTexture()}A.depthBuffer&&Xt(A)}function he(A){let x=A.textures;for(let O=0,X=x.length;O<X;O++){let J=x[O];if(g(J)){let W=w(A),wt=n.get(J).__webglTexture;e.bindTexture(W,wt),m(W),e.unbindTexture()}}}let Ot=[],Dt=[];function xt(A){if(A.samples>0){if(_t(A)===!1){let x=A.textures,O=A.width,X=A.height,J=s.COLOR_BUFFER_BIT,W=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,wt=n.get(A),st=x.length>1;if(st)for(let bt=0;bt<x.length;bt++)e.bindFramebuffer(s.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,wt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer);let vt=A.texture.mipmaps;vt&&vt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,wt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let bt=0;bt<x.length;bt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),st){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,wt.__webglColorRenderbuffer[bt]);let nt=n.get(x[bt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,nt,0)}s.blitFramebuffer(0,0,O,X,0,0,O,X,J,s.NEAREST),l===!0&&(Ot.length=0,Dt.length=0,Ot.push(s.COLOR_ATTACHMENT0+bt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ot.push(W),Dt.push(W),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Dt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ot))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),st)for(let bt=0;bt<x.length;bt++){e.bindFramebuffer(s.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.RENDERBUFFER,wt.__webglColorRenderbuffer[bt]);let nt=n.get(x[bt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,wt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.TEXTURE_2D,nt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let x=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function de(A){return Math.min(i.maxSamples,A.samples)}function _t(A){let x=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ht(A){let x=o.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function Ce(A,x){let O=A.colorSpace,X=A.format,J=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==Si&&O!==Xn&&(Yt.getTransfer(O)===te?(X!==gn||J!==En)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function ve(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=L,this.setTexture2D=$,this.setTexture2DArray=G,this.setTexture3D=q,this.setTextureCube=V,this.rebindTextures=ke,this.setupRenderTarget=I,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=_t}function uy(s,t){function e(n,i=Xn){let r,o=Yt.getTransfer(i);if(n===En)return s.UNSIGNED_BYTE;if(n===Yo)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Zo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===$l)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Xl)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Gl)return s.BYTE;if(n===Wl)return s.SHORT;if(n===ys)return s.UNSIGNED_SHORT;if(n===qo)return s.INT;if(n===ai)return s.UNSIGNED_INT;if(n===In)return s.FLOAT;if(n===xs)return s.HALF_FLOAT;if(n===ql)return s.ALPHA;if(n===Yl)return s.RGB;if(n===gn)return s.RGBA;if(n===ss)return s.DEPTH_COMPONENT;if(n===vs)return s.DEPTH_STENCIL;if(n===Zl)return s.RED;if(n===Ko)return s.RED_INTEGER;if(n===Kl)return s.RG;if(n===Jo)return s.RG_INTEGER;if(n===jo)return s.RGBA_INTEGER;if(n===vr||n===br||n===Mr||n===Sr)if(o===te)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qo||n===ta||n===ea||n===na)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===na)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ia||n===sa||n===ra)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ia||n===sa)return o===te?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ra)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===oa||n===aa||n===la||n===ca||n===ha||n===da||n===ua||n===fa||n===pa||n===ma||n===ga||n===ya||n===xa||n===_a)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===oa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===aa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===la)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ca)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ha)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===da)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ua)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ma)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ga)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ya)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xa)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_a)return o===te?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===va||n===ba||n===Ma)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===va)return o===te?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ba)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ma)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sa||n===wa||n===Ea||n===Ta)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ea)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ta)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_s?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var fy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,py=`
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

}`,vc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new tr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Sn({vertexShader:fy,fragmentShader:py,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ce(new Gn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},bc=class extends An{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,y=typeof XRWebGLBinding<"u",g=new vc,m={},w=e.getContextAttributes(),b=null,_=null,T=[],E=[],C=new ot,D=null,S=new Ke;S.viewport=new ge;let v=new Ke;v.viewport=new ge;let R=[S,v],L=new Uo,U=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let j=T[Y];return j===void 0&&(j=new hs,T[Y]=j),j.getTargetRaySpace()},this.getControllerGrip=function(Y){let j=T[Y];return j===void 0&&(j=new hs,T[Y]=j),j.getGripSpace()},this.getHand=function(Y){let j=T[Y];return j===void 0&&(j=new hs,T[Y]=j),j.getHandSpace()};function $(Y){let j=E.indexOf(Y.inputSource);if(j===-1)return;let pt=T[j];pt!==void 0&&(pt.update(Y.inputSource,Y.frame,c||o),pt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){i.removeEventListener("select",$),i.removeEventListener("selectstart",$),i.removeEventListener("selectend",$),i.removeEventListener("squeeze",$),i.removeEventListener("squeezestart",$),i.removeEventListener("squeezeend",$),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",q);for(let Y=0;Y<T.length;Y++){let j=E[Y];j!==null&&(E[Y]=null,T[Y].disconnect(j))}U=null,B=null,g.reset();for(let Y in m)delete m[Y];t.setRenderTarget(b),f=null,u=null,d=null,i=null,_=null,qt.stop(),n.isPresenting=!1,t.setPixelRatio(D),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(b=t.getRenderTarget(),i.addEventListener("select",$),i.addEventListener("selectstart",$),i.addEventListener("selectend",$),i.addEventListener("squeeze",$),i.addEventListener("squeezestart",$),i.addEventListener("squeezeend",$),i.addEventListener("end",G),i.addEventListener("inputsourceschange",q),w.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(C),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Lt=null,Et=null;w.depth&&(Et=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=w.stencil?vs:ss,Lt=w.stencil?_s:ai);let Xt={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Xt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new Cn(u.textureWidth,u.textureHeight,{format:gn,type:En,depthTexture:new Qs(u.textureWidth,u.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let pt={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,pt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Cn(f.framebufferWidth,f.framebufferHeight,{format:gn,type:En,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),qt.setContext(i),qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q(Y){for(let j=0;j<Y.removed.length;j++){let pt=Y.removed[j],Lt=E.indexOf(pt);Lt>=0&&(E[Lt]=null,T[Lt].disconnect(pt))}for(let j=0;j<Y.added.length;j++){let pt=Y.added[j],Lt=E.indexOf(pt);if(Lt===-1){for(let Xt=0;Xt<T.length;Xt++)if(Xt>=E.length){E.push(pt),Lt=Xt;break}else if(E[Xt]===null){E[Xt]=pt,Lt=Xt;break}if(Lt===-1)break}let Et=T[Lt];Et&&Et.connect(pt)}}let V=new P,Z=new P;function Q(Y,j,pt){V.setFromMatrixPosition(j.matrixWorld),Z.setFromMatrixPosition(pt.matrixWorld);let Lt=V.distanceTo(Z),Et=j.projectionMatrix.elements,Xt=pt.projectionMatrix.elements,ke=Et[14]/(Et[10]-1),I=Et[14]/(Et[10]+1),he=(Et[9]+1)/Et[5],Ot=(Et[9]-1)/Et[5],Dt=(Et[8]-1)/Et[0],xt=(Xt[8]+1)/Xt[0],de=ke*Dt,_t=ke*xt,Ht=Lt/(-Dt+xt),Ce=Ht*-Dt;if(j.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ce),Y.translateZ(Ht),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Et[10]===-1)Y.projectionMatrix.copy(j.projectionMatrix),Y.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let ve=ke+Ht,A=I+Ht,x=de-Ce,O=_t+(Lt-Ce),X=he*I/A*ve,J=Ot*I/A*ve;Y.projectionMatrix.makePerspective(x,O,X,J,ve,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ut(Y,j){j===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(j.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let j=Y.near,pt=Y.far;g.texture!==null&&(g.depthNear>0&&(j=g.depthNear),g.depthFar>0&&(pt=g.depthFar)),L.near=v.near=S.near=j,L.far=v.far=S.far=pt,(U!==L.near||B!==L.far)&&(i.updateRenderState({depthNear:L.near,depthFar:L.far}),U=L.near,B=L.far),L.layers.mask=Y.layers.mask|6,S.layers.mask=L.layers.mask&3,v.layers.mask=L.layers.mask&5;let Lt=Y.parent,Et=L.cameras;ut(L,Lt);for(let Xt=0;Xt<Et.length;Xt++)ut(Et[Xt],Lt);Et.length===2?Q(L,S,v):L.projectionMatrix.copy(S.projectionMatrix),Ut(Y,L,Lt)};function Ut(Y,j,pt){pt===null?Y.matrix.copy(j.matrixWorld):(Y.matrix.copy(pt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(j.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(j.projectionMatrix),Y.projectionMatrixInverse.copy(j.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=rs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Y){l=Y,u!==null&&(u.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(L)},this.getCameraTexture=function(Y){return m[Y]};let Jt=null;function jt(Y,j){if(h=j.getViewerPose(c||o),p=j,h!==null){let pt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Lt=!1;pt.length!==L.cameras.length&&(L.cameras.length=0,Lt=!0);for(let I=0;I<pt.length;I++){let he=pt[I],Ot=null;if(f!==null)Ot=f.getViewport(he);else{let xt=d.getViewSubImage(u,he);Ot=xt.viewport,I===0&&(t.setRenderTargetTextures(_,xt.colorTexture,xt.depthStencilTexture),t.setRenderTarget(_))}let Dt=R[I];Dt===void 0&&(Dt=new Ke,Dt.layers.enable(I),Dt.viewport=new ge,R[I]=Dt),Dt.matrix.fromArray(he.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(he.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),I===0&&(L.matrix.copy(Dt.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Lt===!0&&L.cameras.push(Dt)}let Et=i.enabledFeatures;if(Et&&Et.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let I=d.getDepthInformation(pt[0]);I&&I.isValid&&I.texture&&g.init(I,i.renderState)}if(Et&&Et.includes("camera-access")&&y){t.state.unbindTexture(),d=n.getBinding();for(let I=0;I<pt.length;I++){let he=pt[I].camera;if(he){let Ot=m[he];Ot||(Ot=new tr,m[he]=Ot);let Dt=d.getCameraImage(he);Ot.sourceTexture=Dt}}}}for(let pt=0;pt<T.length;pt++){let Lt=E[pt],Et=T[pt];Lt!==null&&Et!==void 0&&Et.update(Lt,j,c||o)}Jt&&Jt(Y,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),p=null}let qt=new Gd;qt.setAnimationLoop(jt),this.setAnimationLoop=function(Y){Jt=Y},this.dispose=function(){}}},Ni=new Mn,my=new ee;function gy(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,ic(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,w,b,_){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),y(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,w,b):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Xe&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Xe&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let w=t.get(m),b=w.envMap,_=w.envMapRotation;b&&(g.envMap.value=b,Ni.copy(_),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),g.envMapRotation.value.setFromMatrix4(my.makeRotationFromEuler(Ni)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,w,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*w,g.scale.value=b*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,w){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Xe&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function y(g,m){let w=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function yy(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,b){let _=b.program;n.uniformBlockBinding(w,_)}function c(w,b){let _=i[w.id];_===void 0&&(p(w),_=h(w),i[w.id]=_,w.addEventListener("dispose",g));let T=b.program;n.updateUBOMapping(w,T);let E=t.render.frame;r[w.id]!==E&&(u(w),r[w.id]=E)}function h(w){let b=d();w.__bindingPointIndex=b;let _=s.createBuffer(),T=w.__size,E=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,T,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,_),_}function d(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){let b=i[w.id],_=w.uniforms,T=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let E=0,C=_.length;E<C;E++){let D=Array.isArray(_[E])?_[E]:[_[E]];for(let S=0,v=D.length;S<v;S++){let R=D[S];if(f(R,E,S,T)===!0){let L=R.__offset,U=Array.isArray(R.value)?R.value:[R.value],B=0;for(let $=0;$<U.length;$++){let G=U[$],q=y(G);typeof G=="number"||typeof G=="boolean"?(R.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,L+B,R.__data)):G.isMatrix3?(R.__data[0]=G.elements[0],R.__data[1]=G.elements[1],R.__data[2]=G.elements[2],R.__data[3]=0,R.__data[4]=G.elements[3],R.__data[5]=G.elements[4],R.__data[6]=G.elements[5],R.__data[7]=0,R.__data[8]=G.elements[6],R.__data[9]=G.elements[7],R.__data[10]=G.elements[8],R.__data[11]=0):(G.toArray(R.__data,B),B+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,L,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(w,b,_,T){let E=w.value,C=b+"_"+_;if(T[C]===void 0)return typeof E=="number"||typeof E=="boolean"?T[C]=E:T[C]=E.clone(),!0;{let D=T[C];if(typeof E=="number"||typeof E=="boolean"){if(D!==E)return T[C]=E,!0}else if(D.equals(E)===!1)return D.copy(E),!0}return!1}function p(w){let b=w.uniforms,_=0,T=16;for(let C=0,D=b.length;C<D;C++){let S=Array.isArray(b[C])?b[C]:[b[C]];for(let v=0,R=S.length;v<R;v++){let L=S[v],U=Array.isArray(L.value)?L.value:[L.value];for(let B=0,$=U.length;B<$;B++){let G=U[B],q=y(G),V=_%T,Z=V%q.boundary,Q=V+Z;_+=Z,Q!==0&&T-Q<q.storage&&(_+=T-Q),L.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=_,_+=q.storage}}}let E=_%T;return E>0&&(_+=T-E),w.__size=_,w.__cache={},this}function y(w){let b={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(b.boundary=4,b.storage=4):w.isVector2?(b.boundary=8,b.storage=8):w.isVector3||w.isColor?(b.boundary=16,b.storage=12):w.isVector4?(b.boundary=16,b.storage=16):w.isMatrix3?(b.boundary=48,b.storage=48):w.isMatrix4?(b.boundary=64,b.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),b}function g(w){let b=w.target;b.removeEventListener("dispose",g);let _=o.indexOf(b.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function m(){for(let w in i)s.deleteBuffer(i[w]);o=[],i={},r={}}return{bind:l,update:c,dispose:m}}var Ia=class{constructor(t={}){let{canvas:e=dd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let p=new Uint32Array(4),y=new Int32Array(4),g=null,m=null,w=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,T=!1;this._outputColorSpace=sn;let E=0,C=0,D=null,S=-1,v=null,R=new ge,L=new ge,U=null,B=new Nt(0),$=0,G=e.width,q=e.height,V=1,Z=null,Q=null,ut=new ge(0,0,G,q),Ut=new ge(0,0,G,q),Jt=!1,jt=new ds,qt=!1,Y=!1,j=new ee,pt=new P,Lt=new ge,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xt=!1;function ke(){return D===null?V:1}let I=n;function he(M,N){return e.getContext(M,N)}try{let M={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",rt,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",tt,!1),I===null){let N="webgl2";if(I=he(N,M),I===null)throw he(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Ot,Dt,xt,de,_t,Ht,Ce,ve,A,x,O,X,J,W,wt,st,vt,bt,nt,ht,It,Mt,lt,zt;function k(){Ot=new Ng(I),Ot.init(),Mt=new uy(I,Ot),Dt=new Cg(I,Ot,t,Mt),xt=new hy(I,Ot),Dt.reversedDepthBuffer&&u&&xt.buffers.depth.setReversed(!0),de=new Og(I),_t=new J0,Ht=new dy(I,Ot,xt,_t,Dt,Mt,de),Ce=new Pg(_),ve=new Lg(_),A=new Wf(I),lt=new Tg(I,A),x=new Ug(I,A,de,lt),O=new zg(I,x,A,de),nt=new Bg(I,Dt,Ht),st=new Rg(_t),X=new K0(_,Ce,ve,Ot,Dt,lt,st),J=new gy(_,_t),W=new Q0,wt=new ry(Ot),bt=new Eg(_,Ce,ve,xt,O,f,l),vt=new ly(_,O,Dt),zt=new yy(I,de,Dt,xt),ht=new Ag(I,Ot,de),It=new Fg(I,Ot,de),de.programs=X.programs,_.capabilities=Dt,_.extensions=Ot,_.properties=_t,_.renderLists=W,_.shadowMap=vt,_.state=xt,_.info=de}k();let it=new bc(_,I);this.xr=it,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let M=Ot.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=Ot.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(M){M!==void 0&&(V=M,this.setSize(G,q,!1))},this.getSize=function(M){return M.set(G,q)},this.setSize=function(M,N,z=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=M,q=N,e.width=Math.floor(M*V),e.height=Math.floor(N*V),z===!0&&(e.style.width=M+"px",e.style.height=N+"px"),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(G*V,q*V).floor()},this.setDrawingBufferSize=function(M,N,z){G=M,q=N,V=z,e.width=Math.floor(M*z),e.height=Math.floor(N*z),this.setViewport(0,0,M,N)},this.getCurrentViewport=function(M){return M.copy(R)},this.getViewport=function(M){return M.copy(ut)},this.setViewport=function(M,N,z,H){M.isVector4?ut.set(M.x,M.y,M.z,M.w):ut.set(M,N,z,H),xt.viewport(R.copy(ut).multiplyScalar(V).round())},this.getScissor=function(M){return M.copy(Ut)},this.setScissor=function(M,N,z,H){M.isVector4?Ut.set(M.x,M.y,M.z,M.w):Ut.set(M,N,z,H),xt.scissor(L.copy(Ut).multiplyScalar(V).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(M){xt.setScissorTest(Jt=M)},this.setOpaqueSort=function(M){Z=M},this.setTransparentSort=function(M){Q=M},this.getClearColor=function(M){return M.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor(...arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,z=!0){let H=0;if(M){let F=!1;if(D!==null){let et=D.texture.format;F=et===jo||et===Jo||et===Ko}if(F){let et=D.texture.type,ct=et===En||et===ai||et===ys||et===_s||et===Yo||et===Zo,mt=bt.getClearColor(),dt=bt.getClearAlpha(),Rt=mt.r,kt=mt.g,Tt=mt.b;ct?(p[0]=Rt,p[1]=kt,p[2]=Tt,p[3]=dt,I.clearBufferuiv(I.COLOR,0,p)):(y[0]=Rt,y[1]=kt,y[2]=Tt,y[3]=dt,I.clearBufferiv(I.COLOR,0,y))}else H|=I.COLOR_BUFFER_BIT}N&&(H|=I.DEPTH_BUFFER_BIT),z&&(H|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",rt,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",tt,!1),bt.dispose(),W.dispose(),wt.dispose(),_t.dispose(),Ce.dispose(),ve.dispose(),O.dispose(),lt.dispose(),zt.dispose(),X.dispose(),it.dispose(),it.removeEventListener("sessionstart",Tn),it.removeEventListener("sessionend",Bc),pi.stop()};function rt(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let M=de.autoReset,N=vt.enabled,z=vt.autoUpdate,H=vt.needsUpdate,F=vt.type;k(),de.autoReset=M,vt.enabled=N,vt.autoUpdate=z,vt.needsUpdate=H,vt.type=F}function tt(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function K(M){let N=M.target;N.removeEventListener("dispose",K),yt(N)}function yt(M){Ft(M),_t.remove(M)}function Ft(M){let N=_t.get(M).programs;N!==void 0&&(N.forEach(function(z){X.releaseProgram(z)}),M.isShaderMaterial&&X.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,z,H,F,et){N===null&&(N=Et);let ct=F.isMesh&&F.matrixWorld.determinant()<0,mt=xu(M,N,z,H,F);xt.setMaterial(H,ct);let dt=z.index,Rt=1;if(H.wireframe===!0){if(dt=x.getWireframeAttribute(z),dt===void 0)return;Rt=2}let kt=z.drawRange,Tt=z.attributes.position,Wt=kt.start*Rt,ne=(kt.start+kt.count)*Rt;et!==null&&(Wt=Math.max(Wt,et.start*Rt),ne=Math.min(ne,(et.start+et.count)*Rt)),dt!==null?(Wt=Math.max(Wt,0),ne=Math.min(ne,dt.count)):Tt!=null&&(Wt=Math.max(Wt,0),ne=Math.min(ne,Tt.count));let ye=ne-Wt;if(ye<0||ye===1/0)return;lt.setup(F,H,mt,z,dt);let oe,se=ht;if(dt!==null&&(oe=A.get(dt),se=It,se.setIndex(oe)),F.isMesh)H.wireframe===!0?(xt.setLineWidth(H.wireframeLinewidth*ke()),se.setMode(I.LINES)):se.setMode(I.TRIANGLES);else if(F.isLine){let Ct=H.linewidth;Ct===void 0&&(Ct=1),xt.setLineWidth(Ct*ke()),F.isLineSegments?se.setMode(I.LINES):F.isLineLoop?se.setMode(I.LINE_LOOP):se.setMode(I.LINE_STRIP)}else F.isPoints?se.setMode(I.POINTS):F.isSprite&&se.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)os("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),se.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ot.get("WEBGL_multi_draw"))se.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Ct=F._multiDrawStarts,fe=F._multiDrawCounts,Zt=F._multiDrawCount,Qe=dt?A.get(dt).bytesPerElement:1,Hi=_t.get(H).currentProgram.getUniforms();for(let tn=0;tn<Zt;tn++)Hi.setValue(I,"_gl_DrawID",tn),se.render(Ct[tn]/Qe,fe[tn])}else if(F.isInstancedMesh)se.renderInstances(Wt,ye,F.count);else if(z.isInstancedBufferGeometry){let Ct=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,fe=Math.min(z.instanceCount,Ct);se.renderInstances(Wt,ye,fe)}else se.render(Wt,ye)};function re(M,N,z){M.transparent===!0&&M.side===_e&&M.forceSinglePass===!1?(M.side=Xe,M.needsUpdate=!0,Pr(M,N,z),M.side=Hn,M.needsUpdate=!0,Pr(M,N,z),M.side=_e):Pr(M,N,z)}this.compile=function(M,N,z=null){z===null&&(z=M),m=wt.get(z),m.init(N),b.push(m),z.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),M!==z&&M.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();let H=new Set;return M.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let et=F.material;if(et)if(Array.isArray(et))for(let ct=0;ct<et.length;ct++){let mt=et[ct];re(mt,z,F),H.add(mt)}else re(et,z,F),H.add(et)}),m=b.pop(),H},this.compileAsync=function(M,N,z=null){let H=this.compile(M,N,z);return new Promise(F=>{function et(){if(H.forEach(function(ct){_t.get(ct).currentProgram.isReady()&&H.delete(ct)}),H.size===0){F(M);return}setTimeout(et,10)}Ot.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let Qt=null;function kn(M){Qt&&Qt(M)}function Tn(){pi.stop()}function Bc(){pi.start()}let pi=new Gd;pi.setAnimationLoop(kn),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(M){Qt=M,it.setAnimationLoop(M),M===null?pi.stop():pi.start()},it.addEventListener("sessionstart",Tn),it.addEventListener("sessionend",Bc),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(N),N=it.getCamera()),M.isScene===!0&&M.onBeforeRender(_,M,N,D),m=wt.get(M,b.length),m.init(N),b.push(m),j.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),jt.setFromProjectionMatrix(j,vn,N.reversedDepth),Y=this.localClippingEnabled,qt=st.init(this.clippingPlanes,Y),g=W.get(M,w.length),g.init(),w.push(g),it.enabled===!0&&it.isPresenting===!0){let et=_.xr.getDepthSensingMesh();et!==null&&Ya(et,N,-1/0,_.sortObjects)}Ya(M,N,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(Z,Q),Xt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Xt&&bt.addToRenderList(g,M),this.info.render.frame++,qt===!0&&st.beginShadows();let z=m.state.shadowsArray;vt.render(z,M,N),qt===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=g.opaque,F=g.transmissive;if(m.setupLights(),N.isArrayCamera){let et=N.cameras;if(F.length>0)for(let ct=0,mt=et.length;ct<mt;ct++){let dt=et[ct];Hc(H,F,M,dt)}Xt&&bt.render(M);for(let ct=0,mt=et.length;ct<mt;ct++){let dt=et[ct];zc(g,M,dt,dt.viewport)}}else F.length>0&&Hc(H,F,M,N),Xt&&bt.render(M),zc(g,M,N);D!==null&&C===0&&(Ht.updateMultisampleRenderTarget(D),Ht.updateRenderTargetMipmap(D)),M.isScene===!0&&M.onAfterRender(_,M,N),lt.resetDefaultState(),S=-1,v=null,b.pop(),b.length>0?(m=b[b.length-1],qt===!0&&st.setGlobalState(_.clippingPlanes,m.state.camera)):m=null,w.pop(),w.length>0?g=w[w.length-1]:g=null};function Ya(M,N,z,H){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLight)m.pushLight(M),M.castShadow&&m.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||jt.intersectsSprite(M)){H&&Lt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(j);let ct=O.update(M),mt=M.material;mt.visible&&g.push(M,ct,mt,z,Lt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||jt.intersectsObject(M))){let ct=O.update(M),mt=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Lt.copy(M.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Lt.copy(ct.boundingSphere.center)),Lt.applyMatrix4(M.matrixWorld).applyMatrix4(j)),Array.isArray(mt)){let dt=ct.groups;for(let Rt=0,kt=dt.length;Rt<kt;Rt++){let Tt=dt[Rt],Wt=mt[Tt.materialIndex];Wt&&Wt.visible&&g.push(M,ct,Wt,z,Lt.z,Tt)}}else mt.visible&&g.push(M,ct,mt,z,Lt.z,null)}}let et=M.children;for(let ct=0,mt=et.length;ct<mt;ct++)Ya(et[ct],N,z,H)}function zc(M,N,z,H){let F=M.opaque,et=M.transmissive,ct=M.transparent;m.setupLightsView(z),qt===!0&&st.setGlobalState(_.clippingPlanes,z),H&&xt.viewport(R.copy(H)),F.length>0&&Rr(F,N,z),et.length>0&&Rr(et,N,z),ct.length>0&&Rr(ct,N,z),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function Hc(M,N,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[H.id]===void 0&&(m.state.transmissionRenderTarget[H.id]=new Cn(1,1,{generateMipmaps:!0,type:Ot.has("EXT_color_buffer_half_float")||Ot.has("EXT_color_buffer_float")?xs:En,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));let et=m.state.transmissionRenderTarget[H.id],ct=H.viewport||R;et.setSize(ct.z*_.transmissionResolutionScale,ct.w*_.transmissionResolutionScale);let mt=_.getRenderTarget(),dt=_.getActiveCubeFace(),Rt=_.getActiveMipmapLevel();_.setRenderTarget(et),_.getClearColor(B),$=_.getClearAlpha(),$<1&&_.setClearColor(16777215,.5),_.clear(),Xt&&bt.render(z);let kt=_.toneMapping;_.toneMapping=$n;let Tt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),m.setupLightsView(H),qt===!0&&st.setGlobalState(_.clippingPlanes,H),Rr(M,z,H),Ht.updateMultisampleRenderTarget(et),Ht.updateRenderTargetMipmap(et),Ot.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let ne=0,ye=N.length;ne<ye;ne++){let oe=N[ne],se=oe.object,Ct=oe.geometry,fe=oe.material,Zt=oe.group;if(fe.side===_e&&se.layers.test(H.layers)){let Qe=fe.side;fe.side=Xe,fe.needsUpdate=!0,Vc(se,z,H,Ct,fe,Zt),fe.side=Qe,fe.needsUpdate=!0,Wt=!0}}Wt===!0&&(Ht.updateMultisampleRenderTarget(et),Ht.updateRenderTargetMipmap(et))}_.setRenderTarget(mt,dt,Rt),_.setClearColor(B,$),Tt!==void 0&&(H.viewport=Tt),_.toneMapping=kt}function Rr(M,N,z){let H=N.isScene===!0?N.overrideMaterial:null;for(let F=0,et=M.length;F<et;F++){let ct=M[F],mt=ct.object,dt=ct.geometry,Rt=ct.group,kt=ct.material;kt.allowOverride===!0&&H!==null&&(kt=H),mt.layers.test(z.layers)&&Vc(mt,N,z,dt,kt,Rt)}}function Vc(M,N,z,H,F,et){M.onBeforeRender(_,N,z,H,F,et),M.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),F.onBeforeRender(_,N,z,H,M,et),F.transparent===!0&&F.side===_e&&F.forceSinglePass===!1?(F.side=Xe,F.needsUpdate=!0,_.renderBufferDirect(z,N,H,F,M,et),F.side=Hn,F.needsUpdate=!0,_.renderBufferDirect(z,N,H,F,M,et),F.side=_e):_.renderBufferDirect(z,N,H,F,M,et),M.onAfterRender(_,N,z,H,F,et)}function Pr(M,N,z){N.isScene!==!0&&(N=Et);let H=_t.get(M),F=m.state.lights,et=m.state.shadowsArray,ct=F.state.version,mt=X.getParameters(M,F.state,et,N,z),dt=X.getProgramCacheKey(mt),Rt=H.programs;H.environment=M.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(M.isMeshStandardMaterial?ve:Ce).get(M.envMap||H.environment),H.envMapRotation=H.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Rt===void 0&&(M.addEventListener("dispose",K),Rt=new Map,H.programs=Rt);let kt=Rt.get(dt);if(kt!==void 0){if(H.currentProgram===kt&&H.lightsStateVersion===ct)return Wc(M,mt),kt}else mt.uniforms=X.getUniforms(M),M.onBeforeCompile(mt,_),kt=X.acquireProgram(mt,dt),Rt.set(dt,kt),H.uniforms=mt.uniforms;let Tt=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Tt.clippingPlanes=st.uniform),Wc(M,mt),H.needsLights=vu(M),H.lightsStateVersion=ct,H.needsLights&&(Tt.ambientLightColor.value=F.state.ambient,Tt.lightProbe.value=F.state.probe,Tt.directionalLights.value=F.state.directional,Tt.directionalLightShadows.value=F.state.directionalShadow,Tt.spotLights.value=F.state.spot,Tt.spotLightShadows.value=F.state.spotShadow,Tt.rectAreaLights.value=F.state.rectArea,Tt.ltc_1.value=F.state.rectAreaLTC1,Tt.ltc_2.value=F.state.rectAreaLTC2,Tt.pointLights.value=F.state.point,Tt.pointLightShadows.value=F.state.pointShadow,Tt.hemisphereLights.value=F.state.hemi,Tt.directionalShadowMap.value=F.state.directionalShadowMap,Tt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Tt.spotShadowMap.value=F.state.spotShadowMap,Tt.spotLightMatrix.value=F.state.spotLightMatrix,Tt.spotLightMap.value=F.state.spotLightMap,Tt.pointShadowMap.value=F.state.pointShadowMap,Tt.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=kt,H.uniformsList=null,kt}function Gc(M){if(M.uniformsList===null){let N=M.currentProgram.getUniforms();M.uniformsList=Ss.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function Wc(M,N){let z=_t.get(M);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function xu(M,N,z,H,F){N.isScene!==!0&&(N=Et),Ht.resetTextureUnits();let et=N.fog,ct=H.isMeshStandardMaterial?N.environment:null,mt=D===null?_.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Si,dt=(H.isMeshStandardMaterial?ve:Ce).get(H.envMap||ct),Rt=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,kt=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Tt=!!z.morphAttributes.position,Wt=!!z.morphAttributes.normal,ne=!!z.morphAttributes.color,ye=$n;H.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ye=_.toneMapping);let oe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,se=oe!==void 0?oe.length:0,Ct=_t.get(H),fe=m.state.lights;if(qt===!0&&(Y===!0||M!==v)){let Ge=M===v&&H.id===S;st.setState(H,M,Ge)}let Zt=!1;H.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==fe.state.version||Ct.outputColorSpace!==mt||F.isBatchedMesh&&Ct.batching===!1||!F.isBatchedMesh&&Ct.batching===!0||F.isBatchedMesh&&Ct.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ct.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ct.instancing===!1||!F.isInstancedMesh&&Ct.instancing===!0||F.isSkinnedMesh&&Ct.skinning===!1||!F.isSkinnedMesh&&Ct.skinning===!0||F.isInstancedMesh&&Ct.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ct.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ct.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ct.instancingMorph===!1&&F.morphTexture!==null||Ct.envMap!==dt||H.fog===!0&&Ct.fog!==et||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==st.numPlanes||Ct.numIntersection!==st.numIntersection)||Ct.vertexAlphas!==Rt||Ct.vertexTangents!==kt||Ct.morphTargets!==Tt||Ct.morphNormals!==Wt||Ct.morphColors!==ne||Ct.toneMapping!==ye||Ct.morphTargetsCount!==se)&&(Zt=!0):(Zt=!0,Ct.__version=H.version);let Qe=Ct.currentProgram;Zt===!0&&(Qe=Pr(H,N,F));let Hi=!1,tn=!1,Ds=!1,pe=Qe.getUniforms(),dn=Ct.uniforms;if(xt.useProgram(Qe.program)&&(Hi=!0,tn=!0,Ds=!0),H.id!==S&&(S=H.id,tn=!0),Hi||v!==M){xt.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),pe.setValue(I,"projectionMatrix",M.projectionMatrix),pe.setValue(I,"viewMatrix",M.matrixWorldInverse);let Ze=pe.map.cameraPosition;Ze!==void 0&&Ze.setValue(I,pt.setFromMatrixPosition(M.matrixWorld)),Dt.logarithmicDepthBuffer&&pe.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&pe.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),v!==M&&(v=M,tn=!0,Ds=!0)}if(F.isSkinnedMesh){pe.setOptional(I,F,"bindMatrix"),pe.setOptional(I,F,"bindMatrixInverse");let Ge=F.skeleton;Ge&&(Ge.boneTexture===null&&Ge.computeBoneTexture(),pe.setValue(I,"boneTexture",Ge.boneTexture,Ht))}F.isBatchedMesh&&(pe.setOptional(I,F,"batchingTexture"),pe.setValue(I,"batchingTexture",F._matricesTexture,Ht),pe.setOptional(I,F,"batchingIdTexture"),pe.setValue(I,"batchingIdTexture",F._indirectTexture,Ht),pe.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&pe.setValue(I,"batchingColorTexture",F._colorsTexture,Ht));let un=z.morphAttributes;if((un.position!==void 0||un.normal!==void 0||un.color!==void 0)&&nt.update(F,z,Qe),(tn||Ct.receiveShadow!==F.receiveShadow)&&(Ct.receiveShadow=F.receiveShadow,pe.setValue(I,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(dn.envMap.value=dt,dn.flipEnvMap.value=dt.isCubeTexture&&dt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(dn.envMapIntensity.value=N.environmentIntensity),tn&&(pe.setValue(I,"toneMappingExposure",_.toneMappingExposure),Ct.needsLights&&_u(dn,Ds),et&&H.fog===!0&&J.refreshFogUniforms(dn,et),J.refreshMaterialUniforms(dn,H,V,q,m.state.transmissionRenderTarget[M.id]),Ss.upload(I,Gc(Ct),dn,Ht)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ss.upload(I,Gc(Ct),dn,Ht),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&pe.setValue(I,"center",F.center),pe.setValue(I,"modelViewMatrix",F.modelViewMatrix),pe.setValue(I,"normalMatrix",F.normalMatrix),pe.setValue(I,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let Ge=H.uniformsGroups;for(let Ze=0,Za=Ge.length;Ze<Za;Ze++){let mi=Ge[Ze];zt.update(mi,Qe),zt.bind(mi,Qe)}}return Qe}function _u(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function vu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(M,N,z){let H=_t.get(M);H.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),_t.get(M.texture).__webglTexture=N,_t.get(M.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:z,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){let z=_t.get(M);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0};let bu=I.createFramebuffer();this.setRenderTarget=function(M,N=0,z=0){D=M,E=N,C=z;let H=!0,F=null,et=!1,ct=!1;if(M){let dt=_t.get(M);if(dt.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(I.FRAMEBUFFER,null),H=!1;else if(dt.__webglFramebuffer===void 0)Ht.setupRenderTarget(M);else if(dt.__hasExternalTextures)Ht.rebindTextures(M,_t.get(M.texture).__webglTexture,_t.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let Tt=M.depthTexture;if(dt.__boundDepthTexture!==Tt){if(Tt!==null&&_t.has(Tt)&&(M.width!==Tt.image.width||M.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ht.setupDepthRenderbuffer(M)}}let Rt=M.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(ct=!0);let kt=_t.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(kt[N])?F=kt[N][z]:F=kt[N],et=!0):M.samples>0&&Ht.useMultisampledRTT(M)===!1?F=_t.get(M).__webglMultisampledFramebuffer:Array.isArray(kt)?F=kt[z]:F=kt,R.copy(M.viewport),L.copy(M.scissor),U=M.scissorTest}else R.copy(ut).multiplyScalar(V).floor(),L.copy(Ut).multiplyScalar(V).floor(),U=Jt;if(z!==0&&(F=bu),xt.bindFramebuffer(I.FRAMEBUFFER,F)&&H&&xt.drawBuffers(M,F),xt.viewport(R),xt.scissor(L),xt.setScissorTest(U),et){let dt=_t.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,dt.__webglTexture,z)}else if(ct){let dt=N;for(let Rt=0;Rt<M.textures.length;Rt++){let kt=_t.get(M.textures[Rt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Rt,kt.__webglTexture,z,dt)}}else if(M!==null&&z!==0){let dt=_t.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,dt.__webglTexture,z)}S=-1},this.readRenderTargetPixels=function(M,N,z,H,F,et,ct,mt=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let dt=_t.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ct!==void 0&&(dt=dt[ct]),dt){xt.bindFramebuffer(I.FRAMEBUFFER,dt);try{let Rt=M.textures[mt],kt=Rt.format,Tt=Rt.type;if(!Dt.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Dt.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-H&&z>=0&&z<=M.height-F&&(M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+mt),I.readPixels(N,z,H,F,Mt.convert(kt),Mt.convert(Tt),et))}finally{let Rt=D!==null?_t.get(D).__webglFramebuffer:null;xt.bindFramebuffer(I.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(M,N,z,H,F,et,ct,mt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let dt=_t.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ct!==void 0&&(dt=dt[ct]),dt)if(N>=0&&N<=M.width-H&&z>=0&&z<=M.height-F){xt.bindFramebuffer(I.FRAMEBUFFER,dt);let Rt=M.textures[mt],kt=Rt.format,Tt=Rt.type;if(!Dt.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Dt.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Wt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Wt),I.bufferData(I.PIXEL_PACK_BUFFER,et.byteLength,I.STREAM_READ),M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+mt),I.readPixels(N,z,H,F,Mt.convert(kt),Mt.convert(Tt),0);let ne=D!==null?_t.get(D).__webglFramebuffer:null;xt.bindFramebuffer(I.FRAMEBUFFER,ne);let ye=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await ud(I,ye,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Wt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,et),I.deleteBuffer(Wt),I.deleteSync(ye),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,z=0){let H=Math.pow(2,-z),F=Math.floor(M.image.width*H),et=Math.floor(M.image.height*H),ct=N!==null?N.x:0,mt=N!==null?N.y:0;Ht.setTexture2D(M,0),I.copyTexSubImage2D(I.TEXTURE_2D,z,0,0,ct,mt,F,et),xt.unbindTexture()};let Mu=I.createFramebuffer(),Su=I.createFramebuffer();this.copyTextureToTexture=function(M,N,z=null,H=null,F=0,et=null){et===null&&(F!==0?(os("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=F,F=0):et=0);let ct,mt,dt,Rt,kt,Tt,Wt,ne,ye,oe=M.isCompressedTexture?M.mipmaps[et]:M.image;if(z!==null)ct=z.max.x-z.min.x,mt=z.max.y-z.min.y,dt=z.isBox3?z.max.z-z.min.z:1,Rt=z.min.x,kt=z.min.y,Tt=z.isBox3?z.min.z:0;else{let un=Math.pow(2,-F);ct=Math.floor(oe.width*un),mt=Math.floor(oe.height*un),M.isDataArrayTexture?dt=oe.depth:M.isData3DTexture?dt=Math.floor(oe.depth*un):dt=1,Rt=0,kt=0,Tt=0}H!==null?(Wt=H.x,ne=H.y,ye=H.z):(Wt=0,ne=0,ye=0);let se=Mt.convert(N.format),Ct=Mt.convert(N.type),fe;N.isData3DTexture?(Ht.setTexture3D(N,0),fe=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Ht.setTexture2DArray(N,0),fe=I.TEXTURE_2D_ARRAY):(Ht.setTexture2D(N,0),fe=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);let Zt=I.getParameter(I.UNPACK_ROW_LENGTH),Qe=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Hi=I.getParameter(I.UNPACK_SKIP_PIXELS),tn=I.getParameter(I.UNPACK_SKIP_ROWS),Ds=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,oe.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,oe.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Rt),I.pixelStorei(I.UNPACK_SKIP_ROWS,kt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Tt);let pe=M.isDataArrayTexture||M.isData3DTexture,dn=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){let un=_t.get(M),Ge=_t.get(N),Ze=_t.get(un.__renderTarget),Za=_t.get(Ge.__renderTarget);xt.bindFramebuffer(I.READ_FRAMEBUFFER,Ze.__webglFramebuffer),xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Za.__webglFramebuffer);for(let mi=0;mi<dt;mi++)pe&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,_t.get(M).__webglTexture,F,Tt+mi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,_t.get(N).__webglTexture,et,ye+mi)),I.blitFramebuffer(Rt,kt,ct,mt,Wt,ne,ct,mt,I.DEPTH_BUFFER_BIT,I.NEAREST);xt.bindFramebuffer(I.READ_FRAMEBUFFER,null),xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(F!==0||M.isRenderTargetTexture||_t.has(M)){let un=_t.get(M),Ge=_t.get(N);xt.bindFramebuffer(I.READ_FRAMEBUFFER,Mu),xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Su);for(let Ze=0;Ze<dt;Ze++)pe?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,un.__webglTexture,F,Tt+Ze):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,un.__webglTexture,F),dn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ge.__webglTexture,et,ye+Ze):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ge.__webglTexture,et),F!==0?I.blitFramebuffer(Rt,kt,ct,mt,Wt,ne,ct,mt,I.COLOR_BUFFER_BIT,I.NEAREST):dn?I.copyTexSubImage3D(fe,et,Wt,ne,ye+Ze,Rt,kt,ct,mt):I.copyTexSubImage2D(fe,et,Wt,ne,Rt,kt,ct,mt);xt.bindFramebuffer(I.READ_FRAMEBUFFER,null),xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else dn?M.isDataTexture||M.isData3DTexture?I.texSubImage3D(fe,et,Wt,ne,ye,ct,mt,dt,se,Ct,oe.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(fe,et,Wt,ne,ye,ct,mt,dt,se,oe.data):I.texSubImage3D(fe,et,Wt,ne,ye,ct,mt,dt,se,Ct,oe):M.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,et,Wt,ne,ct,mt,se,Ct,oe.data):M.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,et,Wt,ne,oe.width,oe.height,se,oe.data):I.texSubImage2D(I.TEXTURE_2D,et,Wt,ne,ct,mt,se,Ct,oe);I.pixelStorei(I.UNPACK_ROW_LENGTH,Zt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Qe),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Hi),I.pixelStorei(I.UNPACK_SKIP_ROWS,tn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ds),et===0&&N.generateMipmaps&&I.generateMipmap(fe),xt.unbindTexture()},this.initRenderTarget=function(M){_t.get(M).__webglFramebuffer===void 0&&Ht.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Ht.setTextureCube(M,0):M.isData3DTexture?Ht.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Ht.setTexture2DArray(M,0):Ht.setTexture2D(M,0),xt.unbindTexture()},this.resetState=function(){E=0,C=0,D=null,xt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}};var Yd={type:"change"},Ec={type:"start"},Kd={type:"end"},ka=new Vn,Zd=new Ue,xy=Math.cos(70*ec.DEG2RAD),Ae=new P,Je=2*Math.PI,ie={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},wc=1e-6,La=class extends yr{constructor(t,e=null){super(t,e),this.state=ie.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Oe.ROTATE,MIDDLE:Oe.DOLLY,RIGHT:Oe.PAN},this.touches={ONE:ri.ROTATE,TWO:ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new xe,this._lastTargetPosition=new P,this._quat=new xe().setFromUnitVectors(t.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new gs,this._sphericalDelta=new gs,this._scale=1,this._panOffset=new P,this._rotateStart=new ot,this._rotateEnd=new ot,this._rotateDelta=new ot,this._panStart=new ot,this._panEnd=new ot,this._panDelta=new ot,this._dollyStart=new ot,this._dollyEnd=new ot,this._dollyDelta=new ot,this._dollyDirection=new P,this._mouse=new ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=vy.bind(this),this._onPointerDown=_y.bind(this),this._onPointerUp=by.bind(this),this._onContextMenu=Cy.bind(this),this._onMouseWheel=wy.bind(this),this._onKeyDown=Ey.bind(this),this._onTouchStart=Ty.bind(this),this._onTouchMove=Ay.bind(this),this._onMouseDown=My.bind(this),this._onMouseMove=Sy.bind(this),this._interceptControlDown=Ry.bind(this),this._interceptControlUp=Py.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Yd),this.update(),this.state=ie.NONE}update(t=null){let e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===ie.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Je:n>Math.PI&&(n-=Je),i<-Math.PI?i+=Je:i>Math.PI&&(i-=Je),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ae.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ka.origin.copy(this.object.position),ka.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ka.direction))<xy?this.object.lookAt(this.target):(Zd.setFromNormalAndCoplanarPoint(this.object.up,this.target),ka.intersectPlane(Zd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>wc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>wc||this._lastTargetPosition.distanceToSquared(this.target)>wc?(this.dispatchEvent(Yd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Je/60*this.autoRotateSpeed*t:Je/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Ae.copy(i).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Je*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panStart.set(n,i)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function _y(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function vy(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function by(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Kd),this.state=ie.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function My(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Oe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=ie.DOLLY;break;case Oe.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ie.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ie.ROTATE}break;case Oe.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ie.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ie.PAN}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(Ec)}function Sy(s){switch(this.state){case ie.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case ie.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case ie.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function wy(s){this.enabled===!1||this.enableZoom===!1||this.state!==ie.NONE||(s.preventDefault(),this.dispatchEvent(Ec),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Kd))}function Ey(s){this.enabled!==!1&&this._handleKeyDown(s)}function Ty(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case ri.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=ie.TOUCH_ROTATE;break;case ri.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=ie.TOUCH_PAN;break;default:this.state=ie.NONE}break;case 2:switch(this.touches.TWO){case ri.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=ie.TOUCH_DOLLY_PAN;break;case ri.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=ie.TOUCH_DOLLY_ROTATE;break;default:this.state=ie.NONE}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(Ec)}function Ay(s){switch(this._trackPointer(s),this.state){case ie.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case ie.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case ie.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case ie.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=ie.NONE}}function Cy(s){this.enabled!==!1&&s.preventDefault()}function Ry(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Py(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}Se.DEFAULT_UP.set(0,0,1);var cn={edge:2042419,hoverFace:1884390,hoverEdge:16091679,selFace:366269,selEdge:15231488,planeXY:5016565,planeXZ:3781227,planeYZ:15029067},Na=class{constructor(t){this.el=t,this.renderer=new Ia({antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.setClearColor(0,0),this.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),t.appendChild(this.renderer.domElement),this.scene=new Js,this.camera=new Ri(-1,1,1,-1,-1e5,1e5),this.camera.up.set(0,0,1),this.camera.position.set(200,-260,180),this.controls=new La(this.camera,this.renderer.domElement),this.controls.enableDamping=!1,this.controls.zoomToCursor=!0,this.controls.mouseButtons={LEFT:null,MIDDLE:Oe.PAN,RIGHT:Oe.ROTATE},this.controls.addEventListener("change",()=>this.render()),this.viewHeight=200,this.scene.add(new fr(16777215,9080729,1.6)),this.sun=new pr(16777215,1.6),this.camera.add(this.sun),this.sun.position.set(-1,2,3),this.scene.add(this.camera),this.partGroup=new $e,this.scene.add(this.partGroup),this.overlay=new $e,this.scene.add(this.overlay),this.sketchGroup=new $e,this.scene.add(this.sketchGroup),this.material=new Ti({color:9417673,metalness:.15,roughness:.55,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1,side:_e}),this.edgeMat=new Pe({color:cn.edge}),this.style="edges",this.desc=null,this.mesh=null,this.edgeLines=null,this.makeOrigin(),this.makeGrid(),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t),this.resize()}makeOrigin(){let t=new $e,e=40,n=(r,o,a)=>{let l=new Gn(e,e),c=new ce(l,new Fe({color:r,transparent:!0,opacity:.12,side:_e,depthWrite:!1})),h=new wn(new er(l),new Pe({color:r,transparent:!0,opacity:.6}));return c.add(h),c.userData.planeName=o,a&&a(c),t.add(c),c};this.planes={XY:n(cn.planeXY,"XY"),XZ:n(cn.planeXZ,"XZ",r=>r.rotation.set(Math.PI/2,0,0)),YZ:n(cn.planeYZ,"YZ",r=>r.rotation.set(Math.PI/2,Math.PI/2,0))};let i=(r,o)=>{let a=new Kt().setFromPoints([new P,new P(...r).multiplyScalar(e*.75)]);t.add(new on(a,new Pe({color:o})))};i([1,0,0],15029067),i([0,1,0],3781227),i([0,0,1],5016565),this.originGroup=t,this.planesVisible=!1;for(let r of Object.values(this.planes))r.visible=!1;this.scene.add(t)}showPlanes(t){this.planesVisible=t;for(let e of Object.values(this.planes))e.visible=t;this.render()}makeGrid(){let t=new gr(400,40,12174028,14541543);t.rotation.x=Math.PI/2,t.material.transparent=!0,t.material.opacity=.55,t.material.depthWrite=!1,this.grid=t,this.scene.add(t)}setColor(t){this.material.color.set(t),this.render()}resize(){let t=this.el.clientWidth||1,e=this.el.clientHeight||1;this.renderer.setSize(t,e,!1),this.renderer.domElement.style.width=t+"px",this.renderer.domElement.style.height=e+"px",this.aspect=t/e,this.updateFrustum()}updateFrustum(){let t=this.viewHeight/2,e=t*this.aspect;Object.assign(this.camera,{left:-e,right:e,top:t,bottom:-t}),this.camera.updateProjectionMatrix(),this.render()}pixelSize(){return this.viewHeight/this.camera.zoom/(this.el.clientHeight||1)}render(){this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=0,this.onBeforeRender&&this.onBeforeRender(),this.renderer.render(this.scene,this.camera)}))}setPart(t){if(this.desc=t,this.mesh&&(this.partGroup.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh=null),this.edgeLines&&(this.partGroup.remove(this.edgeLines),this.edgeLines.geometry.dispose(),this.edgeLines=null),this.clearHighlights(),t){let e=new Kt;e.setAttribute("position",new le(t.vertices,3)),e.setAttribute("normal",new le(t.normals,3)),e.setIndex(new le(t.triangles,1)),e.computeBoundingSphere(),this.mesh=new ce(e,this.material),this.partGroup.add(this.mesh);let n=new Kt;n.setAttribute("position",new le(t.lines,3));let i=[];for(let[r,o]of t.edgeGroups)for(let a=r;a<r+o-1;a++)i.push(a,a+1);n.setIndex(i),this.edgeLines=new wn(n,this.edgeMat),this.partGroup.add(this.edgeLines)}this.applyStyle()}applyStyle(t=this.style){this.style=t,this.onStyle&&this.onStyle(),this.mesh&&(this.mesh.visible=t!=="wire"),this.edgeLines&&(this.edgeLines.visible=t!=="shaded"),this.render()}setGhost(t){this.material.transparent=t,this.material.opacity=t?.35:1,this.material.depthWrite=!t,this.material.needsUpdate=!0,this.render()}fit(t){if(!t&&this.fitOverride)return this.fitOverride();t||(t=this.desc?this.desc.bb:[[-50,-50,0],[50,50,50]]);let e=new P((t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2,(t[0][2]+t[1][2])/2),n=Math.max(10,Math.hypot(t[1][0]-t[0][0],t[1][1]-t[0][1],t[1][2]-t[0][2])),i=this.camera.position.clone().sub(this.controls.target).normalize();this.controls.target.copy(e),this.camera.position.copy(e).add(i.multiplyScalar(n*4)),this.viewHeight=n*1.3,this.camera.zoom=1,this.updateFrustum(),this.controls.update()}setView(t){let e={home:[1,-1.3,.9],front:[0,-1,0],back:[0,1,0],top:[0,0,1],bottom:[0,0,-1],right:[1,0,0],left:[-1,0,0]},n={top:[0,1,0],bottom:[0,-1,0]},i=new P(...e[t]).normalize();this.lookAlong(i,new P(...n[t]||[0,0,1])),this.fit()}setUp(t){this.camera.up.copy(t),this.controls._quat.setFromUnitVectors(this.camera.up,new P(0,1,0)),this.controls._quatInverse.copy(this.controls._quat).invert()}lookAlong(t,e,n){let i=(n||this.controls.target).clone(),r=Math.max(500,this.camera.position.distanceTo(this.controls.target));this.controls.target.copy(i),this.setUp(e),this.camera.position.copy(i).add(t.clone().multiplyScalar(r)),this.camera.lookAt(i),this.controls.update(),this.render()}ray(t){let e=this.renderer.domElement.getBoundingClientRect(),n=new ot((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),i=new mr;return i.setFromCamera(n,this.camera),i.params.Line.threshold=this.pixelSize()*6,i}faceAt(t){let e=t*3,n=this.desc.faceGroups;for(let i=0;i<n.length;i++)if(e>=n[i][0]&&e<n[i][0]+n[i][1])return i;return-1}edgeAt(t){let e=this.desc.edgeGroups;for(let n=0;n<e.length;n++)if(t>=e[n][0]&&t<e[n][0]+e[n][1])return n;return-1}pick(t,e){let n=this.ray(t);if(e.edges&&this.edgeLines&&this.desc){let i=this.edgeLines.visible;this.edgeLines.visible=!0;let r=n.intersectObject(this.edgeLines);this.edgeLines.visible=i;let o=1/0;if(this.mesh){let c=n.intersectObject(this.mesh);c.length&&(o=c[0].distance)}let a=this.pixelSize()*8,l=r.find(c=>c.distance<=o+a);if(l)return{kind:"edge",index:this.edgeAt(l.index),point:l.point.toArray()}}if(e.faces&&this.mesh&&this.desc){let i=n.intersectObject(this.mesh);if(i.length){let r=this.faceAt(i[0].faceIndex);if(r>=0)return{kind:"face",index:r,point:i[0].point.toArray(),info:this.desc.faces[r]}}}if(e.planes){let i=Object.values(this.planes),r=n.intersectObjects(i,!1);if(r.length)return{kind:"plane",name:r[0].object.userData.planeName,point:r[0].point.toArray()}}return null}clearHighlights(){for(let t of[...this.overlay.children])this.overlay.remove(t),t.geometry&&t.geometry.dispose();this.render()}faceGeometry(t){let[e,n]=this.desc.faceGroups[t],i=new Kt;return i.setAttribute("position",this.mesh.geometry.getAttribute("position")),i.setIndex(Array.from(this.desc.triangles.subarray(e,e+n))),i}edgeGeometry(t){let[e,n]=this.desc.edgeGroups[t],i=[];for(let r=e;r<e+n;r++)i.push(new P(this.desc.lines[r*3],this.desc.lines[r*3+1],this.desc.lines[r*3+2]));return new Kt().setFromPoints(i)}highlight(t){this.clearHighlights();for(let e of t)this.addHighlight(e);this.render()}addHighlight(t){if(t.kind==="face"&&this.desc&&t.index>=0&&t.index<this.desc.faceGroups.length){let e=new ce(this.faceGeometry(t.index),new Fe({color:t.color,transparent:!0,opacity:.55,side:_e,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));this.overlay.add(e)}else if(t.kind==="edge"&&this.desc&&t.index>=0&&t.index<this.desc.edgeGroups.length){let e=new on(this.edgeGeometry(t.index),new Pe({color:t.color,depthTest:!1}));e.renderOrder=10,this.overlay.add(e)}else if(t.kind==="plane"){let e=this.planes[t.name],n=new ce(e.geometry.clone(),new Fe({color:t.color,transparent:!0,opacity:.35,side:_e,depthWrite:!1}));n.quaternion.copy(e.quaternion),this.overlay.add(n)}else if(t.kind==="point"){let e=this.pixelSize()*5,n=new ce(new hr(e,12,8),new Fe({color:t.color,depthTest:!1}));n.position.set(...t.point),n.renderOrder=11,this.overlay.add(n)}else if(t.kind==="segment"){let e=new on(new Kt().setFromPoints(t.points.map(n=>new P(...n))),new Ai({color:t.color,depthTest:!1,dashSize:this.pixelSize()*6,gapSize:this.pixelSize()*4}));e.computeLineDistances(),e.renderOrder=10,this.overlay.add(e)}}screenOf(t){let e=new P(...t).project(this.camera);return[(e.x+1)/2*this.el.clientWidth,(1-e.y)/2*this.el.clientHeight]}snapshot(){return this.renderer.render(this.scene,this.camera),this.renderer.domElement.toDataURL("image/png")}};var Jd={sin:s=>Math.sin(s*Math.PI/180),cos:s=>Math.cos(s*Math.PI/180),tan:s=>Math.tan(s*Math.PI/180),sqrt:Math.sqrt,abs:Math.abs,round:Math.round,floor:Math.floor,ceil:Math.ceil,min:Math.min,max:Math.max},jd={pi:Math.PI,PI:Math.PI};function Iy(s){let t=[],e=/\s*(?:(\d+\.?\d*(?:[eE][-+]?\d+)?|\.\d+)|([A-Za-z_][A-Za-z_0-9]*)|(\S))/y,n;for(e.lastIndex=0;e.lastIndex<s.length;){let i=e.lastIndex;if(n=e.exec(s),!n)break;if(n[1]!==void 0)t.push({t:"num",v:parseFloat(n[1])});else if(n[2]!==void 0)t.push({t:"id",v:n[2]});else if(n[3]!==void 0)t.push({t:"op",v:n[3]});else if(e.lastIndex===i)break}return t}function je(s,t={},e=new Set){if(typeof s=="number")return s;if(s==null||String(s).trim()==="")throw new Error("Empty value");let n=Iy(String(s)),i=0,r=()=>n[i],o=f=>{let p=n[i];if(!p||f&&p.v!==f)throw new Error(`Expected "${f}"`);return i++,p};function a(){let f=r();if(!f)throw new Error("Unfinished expression");if(f.t==="num")return i++,f.v;if(f.t==="op"&&f.v==="("){i++;let p=d();return o(")"),p}if(f.t==="op"&&(f.v==="-"||f.v==="+")){i++;let p=l();return f.v==="-"?-p:p}if(f.t==="id"){if(i++,Jd[f.v]&&r()&&r().v==="("){i++;let p=[d()];for(;r()&&r().v===",";)i++,p.push(d());return o(")"),Jd[f.v](...p)}if(f.v in jd)return jd[f.v];if(Object.prototype.hasOwnProperty.call(t,f.v)){if(e.has(f.v))throw new Error(`"${f.v}" refers to itself`);let p=new Set(e);return p.add(f.v),je(t[f.v],t,p)}throw new Error(`Unknown name "${f.v}"`)}throw new Error(`Unexpected "${f.v}"`)}function l(){let f=a();return r()&&r().v==="^"?(i++,Math.pow(f,c())):f}function c(){return l()}function h(){let f=c();for(;r()&&(r().v==="*"||r().v==="/");){let p=n[i++].v,y=c();f=p==="*"?f*y:f/y}return f}function d(){let f=h();for(;r()&&(r().v==="+"||r().v==="-");){let p=n[i++].v,y=h();f=p==="+"?f+y:f-y}return f}let u=d();if(i<n.length)throw new Error(`Unexpected "${n[i].v}"`);if(!Number.isFinite(u))throw new Error("Not a number");return u}function Qd(s){let t={};for(let e of s.params||[])e.name&&(t[e.name]=e.expr);return t}function hn(s,t){try{return{ok:!0,v:je(s,t)}}catch(e){return{ok:!1,err:e.message}}}function gt(s){return Number.isFinite(s)?String(Math.round(s*1e4)/1e4):""}var ze={coincident:{label:"Coincident",glyph:"\u25CF",need:"points",help:"Click two points to join them."},horizontal:{label:"Horizontal",glyph:"H",need:"line",help:"Click a line to make it level (or two points to line them up side to side)."},vertical:{label:"Vertical",glyph:"V",need:"line",help:"Click a line to make it straight up and down (or two points to stack them)."},parallel:{label:"Parallel",glyph:"\u2225",need:"2lines",help:"Click two lines to make them point the same way."},perpendicular:{label:"Perpendicular",glyph:"\u22A5",need:"2lines",help:"Click two lines to make them meet at 90\xB0."},equal:{label:"Equal",glyph:"=",need:"2same",help:"Click two lines (same length) or two circles/arcs (same size)."},tangent:{label:"Tangent",glyph:"T",need:"tangent",help:"Click a line and a circle/arc (or two circles/arcs) to make them touch smoothly."},concentric:{label:"Concentric",glyph:"\u25CE",need:"2round",help:"Click two circles/arcs to give them the same center."},fix:{label:"Fix",glyph:"\u{1F512}",need:"point",help:"Click a point to pin it where it is."},midpoint:{label:"Midpoint",glyph:"\u22C8",need:"pointLine",help:"Click a point, then a line: the point moves to the middle of the line."},length:{label:"Length",dim:!0},radius:{label:"Radius",dim:!0},distance:{label:"Distance",dim:!0}},Dy={line:["x1","y1","x2","y2"],arc:["x1","y1","x2","y2","xm","ym"],circle:["cx","cy","r"],polygon:["cx","cy","r","rot"],slot:["x1","y1","x2","y2","w"],point:["x","y"]},ky=s=>typeof s=="number";function Er(s,t,e){if(e==="p1")return[t.x1,t.y1];if(e==="p2")return[t.x2,t.y2];if(e==="pm")return[t.xm,t.ym];if(e==="c"){if(s==="arc"){let n=li([t.x1,t.y1],[t.x2,t.y2],[t.xm,t.ym]);return n?n.c:[t.xm,t.ym]}return s==="slot"?[(t.x1+t.x2)/2,(t.y1+t.y2)/2]:s==="point"?[t.x,t.y]:[t.cx,t.cy]}return null}function Es(s,t){if(s==="circle")return t.r;if(s==="arc"){let e=li([t.x1,t.y1],[t.x2,t.y2],[t.xm,t.ym]);return e?e.r:0}return 0}function tu(s){return{line:["p1","p2"],arc:["p1","p2","c"],circle:["c"],polygon:["c"],slot:["p1","p2"],point:["c"]}[s]||[]}function Ts(s,t,e,n={}){let i=(t||[]).filter(T=>!T.off),r=n.pull||[];if(!i.length&&!r.length)return{entities:s,ok:!0,bad:[]};let o=new Map(s.map(T=>[T.id,T])),a=new Set;for(let T of i)for(let E of T.refs)a.add(E.e);for(let T of r)a.add(T.id);let l=[],c=new Map;for(let T of s){let E={};for(let C of Dy[T.type]||[]){try{E[C]=je(T[C],e)}catch{E[C]=0}a.has(T.id)&&ky(T[C])&&!(T.type==="polygon"&&C==="rot")&&l.push({id:T.id,k:C})}c.set(T.id,E)}let h=l.map(T=>c.get(T.id)[T.k]),d=T=>{let E=new Map;for(let[C,D]of c)E.set(C,{...D});return l.forEach((C,D)=>{E.get(C.id)[C.k]=T[D]}),E},u=(T,E)=>{let C=d(T),D=[],S=[],v=L=>Er(o.get(L.e).type,C.get(L.e),L.k),R=L=>{let U=C.get(L),B=U.x2-U.x1,$=U.y2-U.y1,G=Math.hypot(B,$)||1e-9;return[B/G,$/G,G]};for(let L of i){let[U,B]=L.refs,$=o.get(U.e),G=B&&o.get(B.e);if(!$||B&&!G)continue;let q=Z=>{D.push(Z),S.push(L.id)},V=0;try{L.value!=null&&(V=je(L.value,e))}catch{V=0}switch(L.type){case"coincident":{let Z=v(U),Q=v(B);q(Z[0]-Q[0]),q(Z[1]-Q[1]);break}case"horizontal":if(B)q(v(U)[1]-v(B)[1]);else{let Z=C.get(U.e);q(Z.y2-Z.y1)}break;case"vertical":if(B)q(v(U)[0]-v(B)[0]);else{let Z=C.get(U.e);q(Z.x2-Z.x1)}break;case"parallel":{let Z=R(U.e),Q=R(B.e);q((Z[0]*Q[1]-Z[1]*Q[0])*10);break}case"perpendicular":{let Z=R(U.e),Q=R(B.e);q((Z[0]*Q[0]+Z[1]*Q[1])*10);break}case"equal":$.type==="line"?q(R(U.e)[2]-R(B.e)[2]):q(Es($.type,C.get(U.e))-Es(G.type,C.get(B.e)));break;case"concentric":{let Z=v({e:U.e,k:"c"}),Q=v({e:B.e,k:"c"});q(Z[0]-Q[0]),q(Z[1]-Q[1]);break}case"tangent":{let Z=$.type==="line"?U:G.type==="line"?B:null;if(Z){let Q=Z===U?B:U,ut=C.get(Z.e),Ut=v({e:Q.e,k:"c"}),Jt=Es(o.get(Q.e).type,C.get(Q.e)),jt=ut.x2-ut.x1,qt=ut.y2-ut.y1,Y=Math.hypot(jt,qt)||1e-9;q(Math.abs(((Ut[0]-ut.x1)*qt-(Ut[1]-ut.y1)*jt)/Y)-Jt)}else{let Q=v({e:U.e,k:"c"}),ut=v({e:B.e,k:"c"}),Ut=Es($.type,C.get(U.e)),Jt=Es(G.type,C.get(B.e)),jt=Math.hypot(Q[0]-ut[0],Q[1]-ut[1]);q(L.inside?jt-Math.abs(Ut-Jt):jt-(Ut+Jt))}break}case"fix":{let Z=v(U);q((Z[0]-L.at[0])*2),q((Z[1]-L.at[1])*2);break}case"midpoint":{let Z=v(U),Q=C.get(B.e);q(Z[0]-(Q.x1+Q.x2)/2),q(Z[1]-(Q.y1+Q.y2)/2);break}case"length":{q(R(U.e)[2]-V);break}case"radius":{q(Es($.type,C.get(U.e))-V);break}case"distance":{let Z=v(U),Q=v(B);L.axis==="x"?q(Math.abs(Z[0]-Q[0])-V):L.axis==="y"?q(Math.abs(Z[1]-Q[1])-V):q(Math.hypot(Z[0]-Q[0],Z[1]-Q[1])-V);break}}}if(!E)for(let L of r){let U=Er(o.get(L.id).type,d(T).get(L.id),L.k);D.push((U[0]-L.to[0])*.05,(U[1]-L.to[1])*.05),S.push(null,null)}return{r:D,tag:S}},f=h.slice(),p=f.length,{r:y}=u(f),g=y.reduce((T,E)=>T+E*E,0),m=.001;for(let T=0;T<200&&g>1e-20&&p;T++){let E=[];for(let v=0;v<p;v++){let R=1e-6*Math.max(1,Math.abs(f[v])),L=f.slice();L[v]+=R;let U=u(L).r;E.push(U.map((B,$)=>(B-y[$])/R))}let C=Array.from({length:p},()=>new Float64Array(p)),D=new Float64Array(p);for(let v=0;v<p;v++){for(let R=0;R<y.length;R++)D[v]+=E[v][R]*y[R];for(let R=v;R<p;R++){let L=0;for(let U=0;U<y.length;U++)L+=E[v][U]*E[R][U];C[v][R]=C[R][v]=L}}let S=!1;for(let v=0;v<12;v++){let R=C.map((G,q)=>{let V=Float64Array.from(G);return V[q]+=m*(G[q]+1e-6),V}),L=Ly(R,Array.from(D,G=>-G));if(!L){m*=10;continue}let U=f.map((G,q)=>G+L[q]),B=u(U).r,$=B.reduce((G,q)=>G+q*q,0);if($<g){f=U,y=B,g=$,m=Math.max(m/3,1e-9),S=!0;break}m*=8}if(!S)break}let w=u(f,!0),b=new Set;return w.r.forEach((T,E)=>{Math.abs(T)>1e-4&&w.tag[E]&&b.add(w.tag[E])}),{entities:s.map(T=>{if(!a.has(T.id))return T;let E={...T};return l.forEach((C,D)=>{C.id===T.id&&(E[C.k]=Math.round(f[D]*1e6)/1e6)}),E}),ok:b.size===0,bad:[...b]}}function Ly(s,t){let e=t.length,n=s.map((r,o)=>[...r,t[o]]);for(let r=0;r<e;r++){let o=r;for(let a=r+1;a<e;a++)Math.abs(n[a][r])>Math.abs(n[o][r])&&(o=a);if(Math.abs(n[o][r])<1e-14)return null;[n[r],n[o]]=[n[o],n[r]];for(let a=r+1;a<e;a++){let l=n[a][r]/n[r][r];if(l)for(let c=r;c<=e;c++)n[a][c]-=l*n[r][c]}}let i=new Array(e).fill(0);for(let r=e-1;r>=0;r--){let o=n[r][e];for(let a=r+1;a<e;a++)o-=n[r][a]*i[a];i[r]=o/n[r][r]}return i}var gb=Math.PI*2,eu=s=>s*Math.PI/180;function Oi(s,t,e){return[s[0]+t*Math.cos(eu(e)),s[1]+t*Math.sin(eu(e))]}function ci(s,t){let e=(t-s)%360;return e<=1e-9&&(e+=360),e}function As(s,t){return{type:"line",a:s,b:t}}function Cs(s,t,e,n){let i=ci(e,n);return{type:"arc",c:s,r:t,a1:e,a2:n,a:Oi(s,t,e),b:Oi(s,t,e+i),m:Oi(s,t,e+i/2)}}function li(s,t,e){let[n,i]=s,[r,o]=e,[a,l]=t,c=2*(n*(o-l)+r*(l-i)+a*(i-o));if(Math.abs(c)<1e-9)return null;let h=((n*n+i*i)*(o-l)+(r*r+o*o)*(l-i)+(a*a+l*l)*(i-o))/c,d=((n*n+i*i)*(a-r)+(r*r+o*o)*(n-a)+(a*a+l*l)*(r-n))/c,u=[h,d],f=Math.hypot(n-h,i-d),p=_=>Math.atan2(_[1]-d,_[0]-h)*180/Math.PI,y=p(s),g=p(t),m=p(e),w=ci(y,m)<ci(y,g),b=w?Cs(u,f,y,g):Cs(u,f,g,y);return w?b={...b,a:s,b:t}:b={...b,a:t,b:s},{c:u,r:f,seg:b,ccw:w}}function Ny(s,t){let e=n=>je(n,t);switch(s.type){case"line":{let n=[e(s.x1),e(s.y1)],i=[e(s.x2),e(s.y2)];return{segs:[As(n,i)],closed:!1}}case"arc":{let n=[e(s.x1),e(s.y1)],i=[e(s.x2),e(s.y2)],r=[e(s.xm),e(s.ym)],o=li(n,i,r);if(!o)throw new Error("The three arc points are in a straight line");return{segs:[o.seg],closed:!1,center:o.c,radius:o.r}}case"rect":{let n=e(s.x),i=e(s.y),r=e(s.w),o=e(s.h);if(Math.abs(r)<1e-9||Math.abs(o)<1e-9)throw new Error("Width and height must not be 0");r<0&&(n+=r,r=-r),o<0&&(i+=o,o=-o);let a=[[n,i],[n+r,i],[n+r,i+o],[n,i+o]];return{segs:a.map((l,c)=>As(l,a[(c+1)%4])),closed:!0}}case"circle":{let n=[e(s.cx),e(s.cy)],i=e(s.r);if(i<=0)throw new Error("Radius must be more than 0");return{segs:[Cs(n,i,0,180),Cs(n,i,180,360)],closed:!0,circle:{c:n,r:i}}}case"polygon":{let n=[e(s.cx),e(s.cy)],i=e(s.r),r=Math.round(e(s.n)),o=e(s.rot||0);if(i<=0)throw new Error("Size must be more than 0");if(r<3||r>64)throw new Error("Sides must be 3 to 64");let a=[];for(let l=0;l<r;l++)a.push(Oi(n,i,o+360*l/r));return{segs:a.map((l,c)=>As(l,a[(c+1)%r])),closed:!0}}case"slot":{let n=[e(s.x1),e(s.y1)],i=[e(s.x2),e(s.y2)],r=e(s.w);if(r<=0)throw new Error("Width must be more than 0");if(Math.hypot(i[0]-n[0],i[1]-n[1])<1e-9)throw new Error("Slot ends must be apart");let a=Math.atan2(i[1]-n[1],i[0]-n[0])*180/Math.PI,l=r/2,c=Cs(i,l,a-90,a+90),h=Cs(n,l,a+90,a+270);return{segs:[c,As(c.b,h.a),h,As(h.b,c.a)],closed:!0}}case"point":return{segs:[],closed:!1,point:[e(s.x),e(s.y)]}}throw new Error("Unknown sketch item "+s.type)}function Tr(s,t,e){let n=[];if(e&&e.length){let r=Ts(s,e,t);s=r.entities,n=r.bad}let i=s.map(r=>{try{return{e:r,g:Ny(r,t)}}catch(o){return{e:r,err:o.message}}});return i.bad=n,i}function Uy(s,t){if(s.type==="line"){t.push(s.a);return}let e=ci(s.a1,s.a2),n=Math.max(4,Math.ceil(e/10));for(let i=0;i<n;i++)t.push(Oi(s.c,s.r,s.a1+e*i/n))}function Fy(s){return s.type==="line"?As(s.b,s.a):{...s,a:s.b,b:s.a,reversed:!s.reversed}}function Oy(s){let t=0;for(let e=0;e<s.length;e++){let n=s[e],i=s[(e+1)%s.length];t+=n[0]*i[1]-i[0]*n[1]}return t/2}function By(s,t){let e=!1;for(let n=0,i=t.length-1;n<t.length;i=n++){let[r,o]=t[n],[a,l]=t[i];o>s[1]!=l>s[1]&&s[0]<(a-r)*(s[1]-o)/(l-o)+r&&(e=!e)}return e}function zy(s,t){let e=1/0;for(let n=0;n<t.length;n++){let i=t[n],r=t[(n+1)%t.length],o=r[0]-i[0],a=r[1]-i[1],l=o*o+a*a||1,c=Math.max(0,Math.min(1,((s[0]-i[0])*o+(s[1]-i[1])*a)/l));e=Math.min(e,Math.hypot(s[0]-i[0]-c*o,s[1]-i[1]-c*a))}return e}function Hy(s,t){let e=0;for(let n of t)if(!(zy(n,s)<.001)){if(!By(n,s))return!1;e++}return e>0||t.length>0}var nu=1e-4,Ua=(s,t)=>Math.abs(s[0]-t[0])<nu&&Math.abs(s[1]-t[1])<nu;function Fa(s){let t=[],e=[];for(let i of s)if(!(!i.g||i.e.construction))if(i.g.closed)t.push({segs:i.g.segs,circle:i.g.circle,ids:[i.e.id]});else for(let r of i.g.segs)e.push({s:r,id:i.e.id,used:!1});let n=0;for(let i of e){if(i.used)continue;i.used=!0;let r=[i.s],o=[i.id],a=!1;for(let l=0;l<1e4;l++){let c=r[r.length-1].b;if(r.length>1&&Ua(c,r[0].a)){a=!0;break}if(r.length===1&&r[0].type==="arc"&&Ua(c,r[0].a)){a=!0;break}let h=null;for(let d of e)if(!d.used&&(Ua(d.s.a,c)?h=d.s:Ua(d.s.b,c)&&(h=Fy(d.s)),h)){d.used=!0,o.push(d.id);break}if(!h)break;r.push(h)}a?t.push({segs:r,ids:o}):n++}for(let i of t){let r=[];for(let o of i.segs)Uy(o,r);i.poly=r,i.area=Math.abs(Oy(r))}for(let i of t)i.depth=t.filter(r=>r!==i&&r.area>i.area+1e-9&&Hy(r.poly,i.poly)).length;return t.sort((i,r)=>i.depth-r.depth||r.area-i.area),{loops:t,openEnds:n}}var qe={line:1459578,cons:14254635,sel:15227148,hover:1221530,err:14036783,open:14036783,pt:1459578,fill:3065014,preview:1221530},we=s=>Math.round(s*1e3)/1e3,Tc=s=>Math.round(s*1e5)/1e5;var Ba=s=>typeof s=="number"||typeof s=="string"&&/^\s*-?\d*\.?\d+(e-?\d+)?\s*$/i.test(s),Pt=(s,t)=>{try{return je(s,t)}catch{return NaN}},iu={select:"Click a shape to pick it. Drag a dot to move a point. Click a blue number to change it. Delete removes.",line:"Click to start, keep clicking for more lines. Click the first point to close. Esc or right-click stops.",rect:"Click one corner, then the opposite corner.",circle:"Click the center, then click to set the size.",arc:"Click the start, then the end, then a point the arc should pass through.",polygon:"Click the center, then a corner.",slot:"Click one end center, then the other end center, then set the width."};for(let[s,t]of Object.entries(ze))t.dim||(iu["c:"+s]=t.label+": "+t.help);var za=class{constructor(t){this.app=t,this.vp=t.vp,this.group=this.vp.sketchGroup,this.labelsEl=document.getElementById("dimLayer"),this.active=!1,this.tool="select",this.temp=[],this.sel=new Set,this.hover=null,this.cursor=null,this.polySides=6,this.gridOn=!0,this.autoCons=!0,this.showCons=!0,this.selCons=new Set,this.picks=[],this.labels=[],this.vp.onBeforeRender=()=>this.active&&this.placeLabels();let e=this.vp.renderer.domElement;e.addEventListener("pointermove",n=>this.active&&this.onMove(n)),e.addEventListener("pointerdown",n=>this.active&&this.onDown(n)),e.addEventListener("pointerup",n=>this.active&&this.onUp(n)),e.addEventListener("contextmenu",n=>{this.active&&n.preventDefault()}),this.vp.controls.addEventListener("change",()=>this.active&&this.drawGrid())}get feature(){return this.app.sketchFeature()}get P(){return this.app.params()}enter(t){this.active=!0,this.plane=t;let e=new P(...t.xDir),n=new P(...t.normal),i=new P().crossVectors(n,e);this.m=new ee().makeBasis(e,i,n).setPosition(...t.origin),this.mInv=this.m.clone().invert(),this.group.matrixAutoUpdate=!1,this.group.matrix.copy(this.m),this.group.matrixWorldNeedsUpdate=!0,this.three=new Ue().setFromNormalAndCoplanarPoint(n,new P(...t.origin)),this.vp.controls.enableRotate=!1,this.vp.controls.mouseButtons={LEFT:null,MIDDLE:Oe.PAN,RIGHT:Oe.PAN},this.vp.grid.visible=!1,this.lookAt(),this.setTool("line"),this.redraw()}lookAt(){let t=new P(...this.plane.normal),e=new P().crossVectors(t,new P(...this.plane.xDir)),n=[];for(let l of this.evals||[])if(l.g)for(let c of l.g.segs)n.push(c.a,c.b);let i=0,r=0,o=100;if(n.length){let l=n.map(h=>h[0]),c=n.map(h=>h[1]);i=(Math.min(...l)+Math.max(...l))/2,r=(Math.min(...c)+Math.max(...c))/2,o=Math.max(20,(Math.max(...l)-Math.min(...l))*1.4,(Math.max(...c)-Math.min(...c))*1.4)}let a=new P(i,r,0).applyMatrix4(this.m);this.vp.viewHeight=o,this.vp.camera.zoom=1,this.vp.updateFrustum(),this.vp.lookAlong(t,e,a)}exit(){this.active=!1,this.temp=[],this.sel.clear();for(let t of[...this.group.children])this.group.remove(t),t.geometry&&t.geometry.dispose();this.labelsEl.innerHTML="",this.labels=[],this.vp.controls.enableRotate=!0,this.vp.controls.mouseButtons={LEFT:null,MIDDLE:Oe.PAN,RIGHT:Oe.ROTATE},this.vp.grid.visible=!0,this.vp.render()}setTool(t){this.tool=t,this.temp=[],this.app.ui.sketchToolChanged(t),this.app.status(iu[t]||""),this.redraw()}entities(){return this.feature.entities}local(t){let e=this.vp.ray(t),n=new P;return e.ray.intersectPlane(this.three,n)?(n.applyMatrix4(this.mInv),[n.x,n.y]):null}gridStep(){let t=this.vp.pixelSize(),e=this.app.units()==="in"?[.0625,.125,.25,.5,1,2,5,10,20]:[.1,.2,.5,1,2,5,10,20,50,100,200,500];for(let n of e)if(n/t>=14)return n;return e[e.length-1]*2}snapPoints(){let t=[{p:[0,0],kind:"origin"}];for(let e of this.evals||[]){if(!e.g)continue;let n=e.e;if(n.type==="line"){let i=e.g.segs[0];t.push({p:i.a,kind:"end",ref:{e:n.id,k:"p1"}},{p:i.b,kind:"end",ref:{e:n.id,k:"p2"}},{p:[(i.a[0]+i.b[0])/2,(i.a[1]+i.b[1])/2],kind:"mid",mid:n.id})}else if(n.type==="arc")t.push({p:[Pt(n.x1,this.P),Pt(n.y1,this.P)],kind:"end",ref:{e:n.id,k:"p1"}},{p:[Pt(n.x2,this.P),Pt(n.y2,this.P)],kind:"end",ref:{e:n.id,k:"p2"}},{p:e.g.center,kind:"center",ref:{e:n.id,k:"c"}});else if(n.type==="circle")t.push({p:e.g.circle.c,kind:"center",ref:{e:n.id,k:"c"}});else if(n.type==="rect"||n.type==="polygon"){for(let i of e.g.segs)t.push({p:i.a,kind:"end"},{p:[(i.a[0]+i.b[0])/2,(i.a[1]+i.b[1])/2],kind:"mid"});n.type==="polygon"&&t.push({p:[Pt(n.cx,this.P),Pt(n.cy,this.P)],kind:"center"})}else n.type==="slot"&&t.push({p:[Pt(n.x1,this.P),Pt(n.y1,this.P)],kind:"center"},{p:[Pt(n.x2,this.P),Pt(n.y2,this.P)],kind:"center"})}return t}snap(t,e,n){let i=this.vp.pixelSize(),r=null,o=10*i;for(let c of this.snapPoints()){let h=Math.hypot(c.p[0]-t[0],c.p[1]-t[1]);(h<o-1e-9||r&&Math.abs(h-o)<1e-9&&c.ref&&!r.ref)&&(o=h,r=c)}if(r)return{p:[...r.p],kind:r.kind,ref:r.ref,mid:r.mid};let a=[...t],l=null;if(this.gridOn&&!(n&&n.altKey)){let c=this.gridStep()/(this.app.units()==="in"?1:2);a=[Math.round(a[0]/c)*c,Math.round(a[1]/c)*c]}if(e){let c=a[0]-e[0],h=a[1]-e[1],d=Math.abs(Math.atan2(h,c)*180/Math.PI);Math.abs(h)<1e-9||d<4||d>176?(a[1]=e[1],l="horizontal"):Math.abs(d-90)<4&&(a[0]=e[0],l="vertical")}return{p:[Tc(a[0]),Tc(a[1])],kind:l}}distToSeg(t,e){if(e.type==="line"){let[r,o]=e.a,[a,l]=e.b,c=a-r,h=l-o,d=c*c+h*h||1,u=Math.max(0,Math.min(1,((t[0]-r)*c+(t[1]-o)*h)/d));return Math.hypot(t[0]-r-u*c,t[1]-o-u*h)}let n=Math.abs(Math.hypot(t[0]-e.c[0],t[1]-e.c[1])-e.r),i=Math.atan2(t[1]-e.c[1],t[0]-e.c[0])*180/Math.PI;return ci(e.a1,i)<=ci(e.a1,e.a2)+1e-6?n:Math.min(Math.hypot(t[0]-e.a[0],t[1]-e.a[1]),Math.hypot(t[0]-e.b[0],t[1]-e.b[1]))}entityAt(t){let e=8*this.vp.pixelSize(),n=null,i=e;for(let r of this.evals||[])if(r.g)for(let o of r.g.segs){let a=this.distToSeg(t,o);a<i&&(i=a,n=r.e)}return n}handles(t){let e=this.P,n=(i,r)=>({e:t,kx:i,ky:r,p:[Pt(t[i],e),Pt(t[r],e)]});switch(t.type){case"line":return[n("x1","y1"),n("x2","y2")];case"arc":return[n("x1","y1"),n("x2","y2"),n("xm","ym")];case"circle":case"polygon":return[n("cx","cy")];case"slot":return[n("x1","y1"),n("x2","y2")];case"rect":return[n("x","y")]}return[]}handleAt(t){let e=8*this.vp.pixelSize(),n=null,i=e;for(let r of this.entities())for(let o of this.handles(r)){let a=Math.hypot(o.p[0]-t[0],o.p[1]-t[1]);a<i&&(i=a,n=o)}return n}coincident(t,e){let n=[];for(let i of this.entities())for(let r of this.handles(i))e&&r.e===e.e&&r.kx===e.kx||i.type==="circle"||i.type==="polygon"||i.type==="rect"||r.kx==="xm"||Math.hypot(r.p[0]-t[0],r.p[1]-t[1])<1e-4&&n.push(r);return n}onMove(t){let e=this.local(t);if(!e)return;if(this.drag){let o=this.snap(e,null,t).p;for(let a of this.drag.handles)a.e[a.kx]=we(o[0]+a.off[0]),a.e[a.ky]=we(o[1]+a.off[1]);if(this.constraints.length){let a=this.drag.handles[0],l=a.kx==="x1"?"p1":a.kx==="x2"?"p2":a.kx==="xm"?"pm":"c";l!=="pm"&&a.e.type!=="rect"&&this.solveNow([{id:a.e.id,k:l,to:[o[0]+a.off[0],o[1]+a.off[1]]}]),this.solveNow()}this.drag.moved=!0,this.recompute(),this.redraw();return}let n=this.temp.length?this.temp[this.temp.length-1]:null,i=this.snap(e,this.tool==="line"||this.tool==="slot"?n:null,t);if(this.cursor=i,this.tool==="select"){let r=this.handleAt(e);this.hover=r?{handle:r}:null;let o=r?null:this.entityAt(e);o&&(this.hover={entity:o}),this.vp.renderer.domElement.style.cursor=r?"move":o?"pointer":"default"}else this.vp.renderer.domElement.style.cursor="crosshair";this.redraw()}onDown(t){if(t.button===2){this._rightDown=[t.clientX,t.clientY];return}if(t.button!==0)return;let e=this.local(t);if(!e)return;if(this.tool==="select"){let i=this.handleAt(e);if(i){let o=[i,...this.coincident(i.p,i)];if((i.e.type==="rect"||i.e.type==="circle"||i.e.type==="polygon")&&(o.length=1),this.drag={handles:o.map(a=>({...a,off:[0,0]})),moved:!1},i.e.type==="slot"){let a=this.handles(i.e).find(l=>l.kx!==i.kx);t.shiftKey&&this.drag.handles.push({...a,off:[a.p[0]-i.p[0],a.p[1]-i.p[1]]})}this.app.beginChange();return}let r=this.entityAt(e);t.shiftKey||(this.sel.clear(),this.selCons.clear()),r&&(this.sel.has(r.id)&&t.shiftKey?this.sel.delete(r.id):this.sel.add(r.id)),this.app.ui.sketchSelection(),this.redraw();return}if(this.tool.startsWith("c:")){this.consPick(e);return}let n=this.snap(e,this.temp.length?this.temp[this.temp.length-1]:null,t);this.lastSnap=n,this.click(n.p)}get constraints(){let t=this.feature;return t.constraints||(t.constraints=[])}pointRefAt(t){let e=10*this.vp.pixelSize(),n=null,i=e;for(let r of this.evals||[])if(!(!r.g||r.e.type==="rect"))for(let o of tu(r.e.type)){let a={};for(let h of Object.keys(r.e))a[h]=Pt(r.e[h],this.P);let l=Er(r.e.type,a,o);if(!l)continue;let c=Math.hypot(l[0]-t[0],l[1]-t[1]);c<i&&(i=c,n={e:r.e.id,k:o,p:l})}return n}consPick(t){let e=this.tool.slice(2),n=ze[e].need,i=this.entityAt(t),r=this.pointRefAt(t),o=g=>{let m=this.entities().find(w=>w.id===g);return m&&m.type},a=g=>g==="circle"||g==="arc",l=this.picks,c=null;if(n==="points"||n==="point"||n==="pointLine"&&!l.length||(e==="horizontal"||e==="vertical")&&r&&(!i||l.length)){if(!r)return this.app.toast("Click on a point (an end or a center).","error");c={e:r.e,k:r.k}}else{if(!i)return this.app.toast(ze[e].help,"error");if(i.type==="rect")return this.app.toast("Rectangles stay square already. Draw it with lines to give it rules.","error");c={e:i.id}}l.push(c);let d=o(l[0].e),u=l[1]&&o(l[1].e),f=!1,p=null;switch(n){case"point":f=!0;break;case"points":f=l.length===2;break;case"line":l[0].k?f=l.length===2:(f=!0,d!=="line"&&(p="Pick a line."));break;case"2lines":o(c.e)!=="line"&&(p="Pick lines."),f=l.length===2;break;case"2same":f=l.length===2,f&&!(d===u||a(d)&&a(u))&&(p="Pick two lines, or two circles/arcs."),f&&!(d==="line"||a(d))&&(p="Pick two lines, or two circles/arcs.");break;case"2round":a(o(c.e))||(p="Pick circles or arcs."),f=l.length===2;break;case"tangent":f=l.length===2,f&&!(d==="line"&&a(u)||a(d)&&u==="line"||a(d)&&a(u))&&(p="Pick a line and a circle/arc, or two circles/arcs.");break;case"pointLine":f=l.length===2,f&&u!=="line"&&(p="Then pick a line.");break}if(p)return this.picks=[],this.redraw(),this.app.toast(p,"error");if(f&&l.length===2&&l[0].e===l[1].e&&!l[0].k)return this.picks=[],this.app.toast("Pick two different items.","error");if(!f){this.redraw();return}let y={id:this.app.newId("k"),type:e,refs:l.map(g=>({...g}))};if(e==="fix"&&(y.at=r.p.map(Tc)),e==="tangent"&&a(d)&&a(u)){let g=D=>this.evals.find(S=>S.e.id===D).g,m=g(l[0].e),w=g(l[1].e),b=m.center||m.circle.c,_=w.center||w.circle.c,T=m.radius||m.circle.r,E=w.radius||w.circle.r,C=Math.hypot(b[0]-_[0],b[1]-_[1]);y.inside=Math.abs(C-Math.abs(T-E))<Math.abs(C-(T+E))}this.picks=[],this.addConstraint(y)}addConstraint(t,e){let n=this.app.snapshot();this.constraints.push(t);let i=Ts(this.entities(),this.constraints,this.P);return!i.ok&&i.bad.includes(t.id)?(this.constraints.pop(),e||this.app.toast(`${ze[t.type].label} would fight the other rules (or a size typed as a formula), so it was not added.`,"error"),this.redraw(),!1):(this.writeBack(i.entities),e||(this.app.undoStack.push(n),this.app.redoStack=[]),this.app.changed(),this.redraw(),!0)}writeBack(t){let e=this.feature,n=new Map(t.map(i=>[i.id,i]));for(let i of e.entities){let r=n.get(i.id);if(r&&r!==i)for(let o of Object.keys(r))typeof i[o]=="number"&&(i[o]=r[o])}}solveNow(t){if(!this.constraints.length)return!0;let e=Ts(this.entities(),this.constraints,this.P,{pull:t});return this.writeBack(e.entities),this.badCons=new Set(e.bad),e.ok}deleteConstraints(t){this.app.change(()=>{let e=this.feature;e.constraints=(e.constraints||[]).filter(n=>!t.has(n.id))}),this.selCons.clear(),this.recompute(),this.redraw(),this.app.ui.sketchSelection()}consFor(t){return this.constraints.filter(e=>e.refs.some(n=>n.e===t))}consLabel(t){let e=ze[t.type];return e.dim?`${e.label} = ${t.value}`:e.label}autoFor(t,e,n,i){if(!this.autoCons)return;let r=o=>this.addConstraint({id:this.app.newId("k"),...o},!0);if(i?r({type:"coincident",refs:[{e:i,k:"p2"},{e:t.id,k:"p1"}]}):e&&e.ref&&e.ref.e!==t.id&&r({type:"coincident",refs:[{...e.ref},{e:t.id,k:t.type==="circle"||t.type==="polygon"?"c":"p1"}]}),n&&n.ref&&n.ref.e!==t.id&&t.type!=="circle"&&r({type:"coincident",refs:[{...n.ref},{e:t.id,k:"p2"}]}),t.type==="line"){let o=Math.abs(Pt(t.x2,this.P)-Pt(t.x1,this.P)),a=Math.abs(Pt(t.y2,this.P)-Pt(t.y1,this.P));a<1e-9&&o>1e-9?r({type:"horizontal",refs:[{e:t.id}]}):o<1e-9&&a>1e-9&&r({type:"vertical",refs:[{e:t.id}]})}}onUp(t){if(t.button===2&&this._rightDown){let e=Math.hypot(t.clientX-this._rightDown[0],t.clientY-this._rightDown[1]);this._rightDown=null,e<4&&this.cancelTemp();return}if(this.drag){let e=this.drag.moved;this.drag=null,e?this.app.endChange():this.app.abortChange(),this.redraw()}}cancelTemp(){if(this.chainPrev=null,this.picks.length){this.picks=[],this.redraw();return}this.temp.length?(this.temp=[],this.redraw()):this.tool!=="select"&&this.setTool("select")}add(t){t.id=this.app.newId("e"),this.app.change(()=>this.entities().push(t)),this.recompute();let e=this.tempSnaps||[];return t.type==="line"?this.autoFor(t,e[e.length-2],e[e.length-1],this.chainPrev):t.type==="arc"?this.autoFor(t,e[0],e[1]):(t.type==="circle"||t.type==="polygon")&&this.autoFor(t,e[0],null),this.recompute(),t}click(t){let e=this.temp;switch(e.length||(this.tempSnaps=[]),this.tempSnaps=this.tempSnaps||[],this.tempSnaps.push(this.lastSnap||null),this.tool){case"line":if(e.length&&Math.hypot(t[0]-e[e.length-1][0],t[1]-e[e.length-1][1])<1e-6){this.tempSnaps.pop();return}if(e.length||(this.chainPrev=null),e.push(t),e.length>=2){let n=e[e.length-2],i=this.add({type:"line",x1:n[0],y1:n[1],x2:t[0],y2:t[1]});this.chainPrev=i.id,e.length>2&&Math.hypot(t[0]-e[0][0],t[1]-e[0][1])<1e-6?(this.temp=[],this.chainPrev=null):(this.temp=[t],this.tempSnaps=[this.tempSnaps[this.tempSnaps.length-1]])}break;case"rect":if(e.push(t),e.length===2){let[n,i]=e;Math.abs(n[0]-i[0])>1e-6&&Math.abs(n[1]-i[1])>1e-6&&this.add({type:"rect",x:we(Math.min(n[0],i[0])),y:we(Math.min(n[1],i[1])),w:we(Math.abs(i[0]-n[0])),h:we(Math.abs(i[1]-n[1]))}),this.temp=[]}break;case"circle":if(e.push(t),e.length===2){let n=we(Math.hypot(e[1][0]-e[0][0],e[1][1]-e[0][1]));n>0&&this.add({type:"circle",cx:e[0][0],cy:e[0][1],r:n}),this.temp=[]}break;case"polygon":if(e.push(t),e.length===2){let n=we(Math.hypot(e[1][0]-e[0][0],e[1][1]-e[0][1])),i=we(Math.atan2(e[1][1]-e[0][1],e[1][0]-e[0][0])*180/Math.PI);n>0&&this.add({type:"polygon",cx:e[0][0],cy:e[0][1],r:n,n:this.polySides,rot:i}),this.temp=[]}break;case"arc":if(e.push(t),e.length===3){let[n,i,r]=e;li(n,i,r)&&this.add({type:"arc",x1:n[0],y1:n[1],x2:i[0],y2:i[1],xm:we(r[0]),ym:we(r[1])}),this.temp=[]}break;case"slot":if(e.push(t),e.length===3){let[n,i,r]=e,o=we(2*this.distToSeg(r,{type:"line",a:n,b:i}));o>0&&Math.hypot(i[0]-n[0],i[1]-n[1])>1e-6&&this.add({type:"slot",x1:n[0],y1:n[1],x2:i[0],y2:i[1],w:o}),this.temp=[]}break}this.redraw()}deleteSelected(){if(this.selCons.size)return this.deleteConstraints(new Set(this.selCons)),!0;if(!this.sel.size)return!1;let t=this.sel;return this.app.change(()=>{let e=this.feature;e.entities=e.entities.filter(n=>!t.has(n.id)),e.constraints=(e.constraints||[]).filter(n=>!n.refs.some(i=>t.has(i.e)))}),this.sel=new Set,this.recompute(),this.app.ui.sketchSelection(),this.redraw(),!0}toggleConstruction(){this.sel.size&&(this.app.change(()=>{for(let t of this.entities())this.sel.has(t.id)&&(t.construction=!t.construction)}),this.recompute(),this.redraw())}recompute(){this.solveNow(),this.evals=Tr(this.entities(),this.P);let{loops:t,openEnds:e}=Fa(this.evals);this.loops=t,this.openEnds=e}clearGroup(){for(let t of[...this.group.children])this.group.remove(t),t.geometry&&t.geometry.dispose()}segPoints(t){if(t.type==="line")return[t.a,t.b];let e=ci(t.a1,t.a2),n=Math.max(8,Math.ceil(e/4)),i=[];for(let r=0;r<=n;r++)i.push(Oi(t.c,t.r,t.a1+e*r/n));return i}line(t,e,n,i=3){let r=new Kt().setFromPoints(t.map(c=>new P(c[0],c[1],.02))),o=this.vp.pixelSize(),a=n?new Ai({color:e,dashSize:6*o,gapSize:4*o,depthTest:!1,transparent:!0}):new Pe({color:e,depthTest:!1,transparent:!0}),l=new on(r,a);return n&&l.computeLineDistances(),l.renderOrder=i,this.group.add(l),l}dots(t,e,n=7){if(!t.length)return;let i=new Kt().setFromPoints(t.map(o=>new P(o[0],o[1],.03))),r=new js(i,new us({color:e,size:n,sizeAttenuation:!1,depthTest:!1,transparent:!0}));r.renderOrder=6,this.group.add(r)}drawGrid(){if(this.gridObj&&(this.group.remove(this.gridObj),this.gridObj.geometry.dispose(),this.gridObj=null),!this.gridOn){this.vp.render();return}let t=this.gridStep(),e=this.vp.camera,n=this.vp.controls.target.clone().applyMatrix4(this.mInv),i=(e.right-e.left)/2/e.zoom,r=(e.top-e.bottom)/2/e.zoom,o=Math.floor((n.x-i)/t)*t,a=Math.ceil((n.x+i)/t)*t,l=Math.floor((n.y-r)/t)*t,c=Math.ceil((n.y+r)/t)*t,h=[],d=[],u=new Nt(14936302),f=new Nt(12963801),p=new Nt(15029067),y=new Nt(3781227),g=(b,_,T)=>{h.push(b[0],b[1],-.01,_[0],_[1],-.01),d.push(T.r,T.g,T.b,T.r,T.g,T.b)},m=0;for(let b=o;b<=a&&m<600;b+=t,m++){let _=Math.round(b/t);g([b,l],[b,c],Math.abs(b)<t/2?y:_%5===0?f:u)}for(let b=l;b<=c&&m<1200;b+=t,m++){let _=Math.round(b/t);g([o,b],[a,b],Math.abs(b)<t/2?p:_%5===0?f:u)}let w=new Kt;w.setAttribute("position",new ue(h,3)),w.setAttribute("color",new ue(d,3)),this.gridObj=new wn(w,new Pe({vertexColors:!0,depthTest:!1,transparent:!0,opacity:.9})),this.gridObj.renderOrder=1,this.group.add(this.gridObj),this.app.ui.setGridStep(t),this.vp.render()}redraw(){if(!this.active)return;this.evals||this.recompute(),this.clearGroup(),this.gridObj=null,this.drawGrid();for(let o of this.loops||[]){if(o.depth%2)continue;let a=new ps(o.poly.map(c=>new ot(c[0],c[1])));for(let c of this.loops){if(c.depth!==o.depth+1)continue;let h=c.segs[0],d=h.type==="line"?[(h.a[0]+h.b[0])/2,(h.a[1]+h.b[1])/2]:h.m;Vy(d,o.poly)&&a.holes.push(new wi(c.poly.map(u=>new ot(u[0],u[1]))))}let l=new ce(new cr(a),new Fe({color:qe.fill,transparent:!0,opacity:.18,side:_e,depthTest:!1,depthWrite:!1}));l.renderOrder=2,this.group.add(l)}let t=[];for(let o of this.evals){if(!o.g)continue;let a=o.e,l=this.hover&&(this.hover.entity===a||this.hover.handle&&this.hover.handle.e===a),c=this.sel.has(a.id)?qe.sel:l?qe.hover:a.construction?qe.cons:qe.line;for(let h of o.g.segs)this.line(this.segPoints(h),c,!!a.construction);(a.type==="line"||a.type==="arc")&&!a.construction&&t.push(o.g.segs[0].a,o.g.segs[0].b),(a.type==="circle"||a.type==="arc")&&this.dots([o.g.center||o.g.circle.c],c,5),a.type==="polygon"&&this.dots([[Pt(a.cx,this.P),Pt(a.cy,this.P)]],c,5)}let e=[],n=[];for(let o of t)(t.filter(l=>Math.abs(l[0]-o[0])<1e-4&&Math.abs(l[1]-o[1])<1e-4).length>=2?n:e).push(o);this.dots(n,qe.pt,6),this.dots(e,qe.open,9);let i=this.cursor&&this.cursor.p,r=this.temp;if(i&&r.length){let o=r[0];switch(this.tool){case"line":this.line([r[r.length-1],i],qe.preview,!1,4);break;case"rect":this.line([o,[i[0],o[1]],i,[o[0],i[1]],o],qe.preview,!1,4);break;case"circle":case"polygon":{let a=Math.hypot(i[0]-o[0],i[1]-o[1]),l=this.tool==="circle"?64:this.polySides,c=Math.atan2(i[1]-o[1],i[0]-o[0]),h=[];for(let d=0;d<=l;d++)h.push([o[0]+a*Math.cos(c+d*2*Math.PI/l),o[1]+a*Math.sin(c+d*2*Math.PI/l)]);this.line(h,qe.preview,!1,4);break}case"arc":if(r.length===1)this.line([o,i],qe.preview,!0,4);else{let a=li(r[0],r[1],i);a&&this.line(this.segPoints(a.seg),qe.preview,!1,4)}break;case"slot":if(r.length===1)this.line([o,i],qe.preview,!0,4);else{let a=2*this.distToSeg(i,{type:"line",a:r[0],b:r[1]});try{let l=Tr([{id:"tmp",type:"slot",x1:r[0][0],y1:r[0][1],x2:r[1][0],y2:r[1][1],w:a}],{})[0];if(l.g)for(let c of l.g.segs)this.line(this.segPoints(c),qe.preview,!1,4)}catch{}}break}}i&&this.tool!=="select"&&this.dots([i],this.cursor.kind&&this.cursor.kind!=="horizontal"&&this.cursor.kind!=="vertical"?16747546:qe.preview,this.cursor.kind?10:6),this.buildLabels(),this.app.ui.sketchInfo(this),this.vp.render()}buildLabels(){let t=this.P,e=[];for(let i of this.evals){if(!i.g)continue;let r=i.e,o=(a,l,c,h=[0,0])=>e.push({pos:a,text:l,edit:c,e:r,off:h});switch(r.type){case"line":{let a=i.g.segs[0],l=Math.hypot(a.b[0]-a.a[0],a.b[1]-a.a[1]),c=-(a.b[1]-a.a[1])/(l||1),h=(a.b[0]-a.a[0])/(l||1),d=this.constraints.find(u=>u.type==="length"&&u.refs[0].e===r.id);o([(a.a[0]+a.b[0])/2,(a.a[1]+a.b[1])/2],d?Rs(d.value,l):gt(l),"length",[c*14,h*14]),d&&(e[e.length-1].driving=d);break}case"rect":{let a=Pt(r.x,t),l=Pt(r.y,t),c=Pt(r.w,t),h=Pt(r.h,t),d=Math.min(a,a+c),u=Math.min(l,l+h);o([d+Math.abs(c)/2,u],Rs(r.w,c),"w",[0,-14]),o([d,u+Math.abs(h)/2],Rs(r.h,h),"h",[-18,0]);break}case"circle":{let{c:a,r:l}=i.g.circle;o([a[0]+l*.707,a[1]+l*.707],"\xD8"+gt(2*l),"diameter",[12,12]);break}case"arc":{let a=i.g.segs[0],l=this.constraints.find(c=>c.type==="radius"&&c.refs[0].e===r.id);o(a.m,"R"+(l?Rs(l.value,a.r):gt(a.r)),"radius",[12,10]),l&&(e[e.length-1].driving=l);break}case"polygon":{o([Pt(r.cx,t),Pt(r.cy,t)-Pt(r.r,t)],"R"+Rs(r.r,Pt(r.r,t)),"r",[0,-14]);break}case"slot":{let a=[Pt(r.x1,t),Pt(r.y1,t)],l=[Pt(r.x2,t),Pt(r.y2,t)];o([(a[0]+l[0])/2,(a[1]+l[1])/2],gt(Math.hypot(l[0]-a[0],l[1]-a[1])),"slotlen",[0,12]),o(l,"W"+Rs(r.w,Pt(r.w,t)),"w",[0,-16]);break}}}if(this.showCons){let i=new Map;for(let r of this.constraints){if(ze[r.type].dim||r.type==="coincident")continue;let o=r.refs[0],a=this.evals.find(h=>h.e.id===o.e);if(!a||!a.g)continue;let l;if(o.k){let h={};for(let d of Object.keys(a.e))h[d]=Pt(a.e[d],this.P);l=Er(a.e.type,h,o.k)}else if(a.g.segs[0]){let h=a.g.segs[0];l=h.type==="line"?[h.a[0]*.65+h.b[0]*.35,h.a[1]*.65+h.b[1]*.35]:h.m}if(!l)continue;let c=i.get(o.e)||0;if(i.set(o.e,c+1),e.push({pos:l,text:ze[r.type].glyph,glyph:r,e:a.e,off:[-14-c*18,14]}),r.refs[1]){let h=this.evals.find(d=>d.e.id===r.refs[1].e);if(h&&h.g&&h.g.segs[0]&&!r.refs[1].k){let d=h.g.segs[0],u=i.get(h.e.id)||0;i.set(h.e.id,u+1),e.push({pos:d.type==="line"?[d.a[0]*.65+d.b[0]*.35,d.a[1]*.65+d.b[1]*.35]:d.m,text:ze[r.type].glyph,glyph:r,e:h.e,off:[-14-u*18,14]})}}}}this.labels=e;let n=this.labelsEl;n.innerHTML="";for(let i of e){if(i.glyph){let a=document.createElement("button"),l=i.glyph;a.className="cglyph"+(this.selCons.has(l.id)?" sel":"")+(this.badCons&&this.badCons.has(l.id)?" bad":""),a.textContent=i.text,a.title=ze[l.type].label+" rule. Click to pick it, then Delete removes it.",a.addEventListener("pointerdown",c=>c.stopPropagation()),a.addEventListener("click",c=>{c.stopPropagation(),c.shiftKey||(this.selCons.clear(),this.sel.clear()),this.selCons.add(l.id),this.app.ui.sketchSelection(),this.redraw()}),i.el=a,n.appendChild(a);continue}let r=document.createElement("button"),o=i.driving||["w","h","r","diameter","slotlen"].includes(i.edit);r.className="dim"+(this.sel.has(i.e.id)?" sel":"")+(i.e.construction?" cons":"")+(o?" driving":" loose"),r.textContent=i.text,r.title=o?"This size is set. Click to type a new size.":"Measured size (can change). Click to set it.",r.addEventListener("pointerdown",a=>a.stopPropagation()),r.addEventListener("click",a=>{a.stopPropagation(),this.editLabel(i,r)}),i.el=r,n.appendChild(r)}this.placeLabels()}placeLabels(){for(let t of this.labels){if(!t.el)continue;let e=new P(t.pos[0],t.pos[1],0).applyMatrix4(this.m),[n,i]=this.vp.screenOf(e.toArray());t.el.style.left=n+t.off[0]+"px",t.el.style.top=i-t.off[1]+"px"}}editLabel(t,e){let n=t.e,i=this.P,r=t.text.replace(/^[ØRW]/,"");if((t.edit==="w"||t.edit==="h"||t.edit==="r")&&(r=String(n[t.edit])),t.driving&&(r=String(t.driving.value)),t.edit==="diameter"&&!Ba(n.r)){let c=String(n.r).match(/^\((.*)\)\/2$/);c&&(r=c[1])}let o=document.createElement("input");o.className="dim-input",o.value=r,e.replaceWith(o),o.style.left=e.style.left,o.style.top=e.style.top,o.focus(),o.select();let a=!1,l=c=>{if(a)return;a=!0;let h=o.value.trim();if(c&&h&&h!==r){let d;try{d=je(h,i)}catch(f){this.app.toast(f.message,"error"),this.buildLabels();return}if(d<=0){this.app.toast("Size must be more than 0","error"),this.buildLabels();return}let u=Ba(h)?we(d):h;this.app.change(()=>this.applyDim(n,t.edit,u,d)),this.recompute()}this.redraw()};o.addEventListener("keydown",c=>{c.stopPropagation(),c.key==="Enter"&&l(!0),c.key==="Escape"&&l(!1)}),o.addEventListener("blur",()=>l(!0))}applyDim(t,e,n,i){let r=this.P;if(e==="w"||e==="h"||e==="r"){t[e]=n;return}if(e==="diameter"){t.r=typeof n=="number"?we(n/2):`(${n})/2`;return}if(e==="length"||e==="radius"){let o=e==="length"?"length":"radius",a=this.feature;a.constraints=(a.constraints||[]).filter(d=>!(d.type===o&&d.refs[0].e===t.id));let l={id:this.app.newId("k"),type:o,refs:[{e:t.id}],value:n};a.constraints.push(l);let c=o==="length"?[{id:t.id,k:"p1",to:[Pt(t.x1,r),Pt(t.y1,r)]}]:[],h=Ts(a.entities,a.constraints,r,{pull:c});if(!h.ok&&h.bad.includes(l.id)){a.constraints.pop(),this.app.toast("That size fights the other rules, so it was not set.","error");return}this.writeBack(h.entities);return}if(e==="oldlength"){let o=[Pt(t.x1,r),Pt(t.y1,r)],a=[Pt(t.x2,r),Pt(t.y2,r)],l=Math.hypot(a[0]-o[0],a[1]-o[1])||1,c=(a[0]-o[0])/l,h=(a[1]-o[1])/l,d=[we(o[0]+c*i),we(o[1]+h*i)],u=this.coincident(a,{e:t,kx:"x2"});typeof n=="string"&&Math.abs(h)<1e-9?t.x2=`${Oa(t.x1)} ${c>0?"+":"-"} ${Oa(n)}`:typeof n=="string"&&Math.abs(c)<1e-9?t.y2=`${Oa(t.y1)} ${h>0?"+":"-"} ${Oa(n)}`:(t.x2=d[0],t.y2=d[1]),(typeof n!="string"||Math.abs(h)>=1e-9&&Math.abs(c)>=1e-9)&&(t.x2=d[0],t.y2=d[1]);for(let f of u)f.e[f.kx]=d[0],f.e[f.ky]=d[1];return}if(e==="oldradius"){let o=[Pt(t.x1,r),Pt(t.y1,r)],a=[Pt(t.x2,r),Pt(t.y2,r)],l=[Pt(t.xm,r),Pt(t.ym,r)],c=Math.hypot(a[0]-o[0],a[1]-o[1])/2;if(i<c-1e-9){this.app.toast(`Radius must be at least ${gt(c)} for these end points`,"error");return}let h=[(o[0]+a[0])/2,(o[1]+a[1])/2],d=-(a[1]-o[1])/(2*c),u=(a[0]-o[0])/(2*c),f=(l[0]-h[0])*d+(l[1]-h[1])*u>=0?1:-1,p=li(o,a,l),g=p&&p.r>0&&Math.hypot(l[0]-h[0],l[1]-h[1])>p.r?i+Math.sqrt(Math.max(0,i*i-c*c)):i-Math.sqrt(Math.max(0,i*i-c*c));t.xm=we(h[0]+f*d*g),t.ym=we(h[1]+f*u*g);return}if(e==="slotlen"){let o=[Pt(t.x1,r),Pt(t.y1,r)],a=[Pt(t.x2,r),Pt(t.y2,r)],l=Math.hypot(a[0]-o[0],a[1]-o[1])||1;t.x2=we(o[0]+(a[0]-o[0])/l*i),t.y2=we(o[1]+(a[1]-o[1])/l*i)}}};function Oa(s){return Ba(s)?String(s):`(${s})`}function Rs(s,t){return Ba(s)?gt(t):`${s} = ${gt(t)}`}function Vy(s,t){let e=!1;for(let n=0,i=t.length-1;n<t.length;i=n++){let[r,o]=t[n],[a,l]=t[i];o>s[1]!=l>s[1]&&s[0]<(a-r)*(s[1]-o)/(l-o)+r&&(e=!e)}return e}var su={sketch:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M7 16l4-8 3 5 3-3"/>',extrude:'<path d="M4 15l8 4 8-4M4 15V9l8-4 8 4v6M12 19v-6M4 9l8 4 8-4"/><path d="M12 5V2M10 3.5l2-2 2 2"/>',revolve:'<ellipse cx="12" cy="7" rx="7" ry="2.5"/><path d="M5 7v10M19 7v10"/><ellipse cx="12" cy="17" rx="7" ry="2.5"/>',hole:'<ellipse cx="12" cy="7" rx="8" ry="3"/><ellipse cx="12" cy="7" rx="3" ry="1.2"/><path d="M4 7v9c0 1.7 3.6 3 8 3s8-1.3 8-3V7M9 7.5v6M15 7.5v6"/>',box:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8"/>',cylinder:'<ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6"/>',sphere:'<circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="8" ry="3"/>',fillet:'<path d="M4 20V10a6 6 0 0 1 6-6h10"/><path d="M4 4h4M4 4v4" opacity=".5"/>',chamfer:'<path d="M4 20V10l6-6h10"/><path d="M4 4h4M4 4v4" opacity=".5"/>',shell:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M7 9.5l5-2.5 5 2.5v5l-5 2.5-5-2.5z"/>',rectPattern:'<rect x="3" y="3" width="6" height="6"/><rect x="15" y="3" width="6" height="6"/><rect x="3" y="15" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/>',circPattern:'<circle cx="12" cy="12" r="8" stroke-dasharray="2 2"/><circle cx="12" cy="4" r="2"/><circle cx="19" cy="15" r="2"/><circle cx="5" cy="15" r="2"/>',mirror:'<path d="M12 3v18" stroke-dasharray="2 2"/><path d="M9 6L3 12l6 6zM15 6l6 6-6 6z"/>',mirrorBody:'<path d="M12 3v18" stroke-dasharray="2 2"/><path d="M10 5H4v14h6M14 5h6v14h-6"/>',params:'<path d="M9 4c-2 0-2 2-2 4v8c0 2 0 4-2 4M4 10h6M14 9l6 8M20 9l-6 8"/>',line:'<path d="M4 20L20 4"/><circle cx="4" cy="20" r="1.5"/><circle cx="20" cy="4" r="1.5"/>',rect:'<rect x="4" y="6" width="16" height="12"/>',circle:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="1"/>',arc:'<path d="M4 18a8 8 0 0 1 16 0"/><circle cx="4" cy="18" r="1.5"/><circle cx="20" cy="18" r="1.5"/><circle cx="12" cy="10" r="1.5"/>',polygon:'<path d="M12 3l8 5v8l-8 5-8-5V8z"/>',slot:'<rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="7" cy="12" r=".8"/><circle cx="17" cy="12" r=".8"/>',select:'<path d="M5 3l14 8-6 2-2 6z"/>',construction:'<path d="M4 20L20 4" stroke-dasharray="3 3"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',finish:'<path d="M5 12l5 5L20 7"/>',measure:'<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',home:'<path d="M3 11l9-7 9 7M5 9.5V20h14V9.5"/>',front:'<rect x="5" y="5" width="14" height="14"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">F</text>',top:'<rect x="5" y="5" width="14" height="14"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">T</text>',right:'<rect x="5" y="5" width="14" height="14"/><text x="12" y="16" font-size="9" text-anchor="middle" fill="currentColor" stroke="none">R</text>',fit:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/><rect x="9" y="9" width="6" height="6"/>',shaded:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z" fill="currentColor" opacity=".35"/><path d="M4 8l8-4 8 4v8l-8 4-8-4z"/>',edges:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8"/>',wire:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8M4 16l8-4 8 4M12 4v8" stroke-dasharray="2 1.5"/>',planes:'<path d="M3 9l9-5 9 5-9 5z"/><path d="M12 14v7M3 9v7l9 5 9-5V9" opacity=".5"/>',camera:'<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l2-3h4l2 3"/>',new:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M12 11v6M9 14h6"/>',open:'<path d="M3 6h7l2 2h9v11H3z"/>',save:'<path d="M5 3h12l3 3v15H4V3z"/><path d="M8 3v5h8V3M8 21v-7h8v7"/>',stl:'<path d="M12 3v12M7 10l5 5 5-5M4 19h16"/>',examples:'<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',redo:'<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 1-1 1.7M12 17v.5"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',eyeOff:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" opacity=".4"/><path d="M4 4l16 16"/>',warn:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',err:'<circle cx="12" cy="12" r="9"/><path d="M8 8l8 8M16 8l-8 8"/>',end:'<path d="M4 12h16"/><path d="M4 8v8M20 8v8"/>',part:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/>',origin:'<path d="M12 12h9M12 12V3M12 12l-7 7"/>',primitive:'<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8"/>',pattern:'<rect x="3" y="3" width="6" height="6"/><rect x="15" y="3" width="6" height="6"/><rect x="3" y="15" width="6" height="6"/><rect x="15" y="15" width="6" height="6"/>',look:'<circle cx="12" cy="12" r="3"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',assembly:'<path d="M3 9l5-3 5 3v5l-5 3-5-3z"/><path d="M11 12l5-3 5 3v5l-5 3-5-3z"/>',mate:'<rect x="3" y="4" width="18" height="6"/><rect x="3" y="14" width="18" height="6"/><path d="M12 10v4M10 12h4" opacity=".6"/>',flush:'<rect x="3" y="4" width="8" height="16"/><rect x="13" y="8" width="8" height="12"/><path d="M2 20h20"/>',insert:'<rect x="4" y="12" width="16" height="8"/><path d="M10 12V4h4v8M8 4h8"/>',axisMate:'<path d="M12 2v20" stroke-dasharray="3 2"/><ellipse cx="12" cy="8" rx="6" ry="2"/><ellipse cx="12" cy="16" rx="6" ry="2"/>',angleMate:'<path d="M4 20h16M4 20L16 6"/><path d="M10 20a6 6 0 0 0-2-4.5"/>',pin:'<path d="M9 3h6l-1 6 3 3H7l3-3zM12 12v9"/>',bom:'<path d="M5 3h14v18H5z"/><path d="M8 7h8M8 11h8M8 15h5"/>',clash:'<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/><path d="M12 7.5v9" stroke-width="3" opacity=".5"/>',place:'<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M12 9v6M9 12h6"/>',back:'<path d="M10 6l-6 6 6 6M4 12h16"/>',move:'<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',drawing:'<path d="M3 4h18v16H3z"/><path d="M14 16h7M14 16v4M6 8h5v5H6z"/>',units:'<path d="M3 15l12-12 6 6-12 12z"/><path d="M7 11l2 2M10 8l2 2M13 5l2 2"/>',constraint:'<path d="M4 20L20 4"/><path d="M4 14h6v6" opacity=".6"/>',grid:'<path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/>'};function $t(s,t=22){return s.startsWith("g:")?`<svg class="ic" width="${t}" height="${t}" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/><text x="12" y="16.5" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor" font-family="Segoe UI, Arial, sans-serif">${s.slice(2)}</text></svg>`:`<svg class="ic" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${su[s]||su.part}</svg>`}var He={mm:1,in:25.4},Ac={mm:"Millimetres (mm)",in:"Inches (in)"};function Ve(s,t){if(t!=="in")return s;let e=s/25.4;for(let n of[.0625,.125,.25,.5,1])if(e<=n*1.5)return n;return Math.round(e)}var ru={sketch:["offset"],extrude:["distance"],hole:["diameter","depth","cbDiameter","cbDepth"],primitive:["w","d","h","diameter","x","y","z"],fillet:["radius"],chamfer:["radius"],shell:["thickness"],pattern:["s1","s2"]},ou={line:["x1","y1","x2","y2"],arc:["x1","y1","x2","y2","xm","ym"],rect:["x","y","w","h"],circle:["cx","cy","r"],polygon:["cx","cy","r"],slot:["x1","y1","x2","y2","w"],point:["x","y"]},Gy=/[A-Za-z_][A-Za-z_0-9]*/g;function Wy(s){let t=[];for(let e of s.features){for(let n of ru[e.type]||[])e[n]!=null&&t.push(e[n]);if(e.type==="sketch")for(let n of e.entities||[])for(let i of ou[n.type]||[])t.push(n[i])}return t}function au(s){let t=new Set(s.params.map(i=>i.name)),e=new Set,n=i=>{for(let r of String(i).match(Gy)||[])t.has(r)&&!e.has(r)&&(e.add(r),n(s.params.find(o=>o.name===r).expr))};for(let i of Wy(s))typeof i=="string"&&n(i);return e}function lu(s,t,e){let n=a=>Math.round(a*t*1e6)/1e6,i=0,r=(a,l)=>{typeof a[l]=="number"?a[l]=n(a[l]):typeof a[l]=="string"&&/\d/.test(a[l])&&!/^[A-Za-z_][\w]*$/.test(a[l].trim())&&i++},o=a=>a&&a.forEach((l,c)=>{c<3&&(a[c]=n(l))});for(let a of s.features){for(let l of ru[a.type]||[])a[l]!=null&&r(a,l);if(a.type==="sketch"){for(let l of a.entities||[])for(let c of ou[l.type]||[])r(l,c);a.plane&&typeof a.plane=="object"&&(a.plane.origin=a.plane.origin.map(n)),o(a.faceRef)}a.type==="hole"&&(a.origin=a.origin&&a.origin.map(n),o(a.faceRef)),a.edges&&a.edges.forEach(o),a.faces&&a.faces.forEach(o)}for(let a of s.params)e.has(a.name)&&(typeof a.expr=="number"?a.expr=n(a.expr):i++);return i}function cu(s,t){let e=n=>Math.round(n*t*1e6)/1e6;for(let n of s.components)n.pos=n.pos.map(e);for(let n of s.constraints)n.type!=="angle"&&typeof n.offset=="number"&&(n.offset=e(n.offset))}var hi=(s,t=document)=>t.querySelector(s),qn=s=>String(s??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),$y="http://www.w3.org/2000/svg",Ha={A4:{name:"A4 (297 \xD7 210 mm)",w:297,h:210},A3:{name:"A3 (420 \xD7 297 mm)",w:420,h:297},Letter:{name:"Letter (11 \xD7 8.5 in)",w:279.4,h:215.9},Tabloid:{name:"Tabloid (17 \xD7 11 in)",w:431.8,h:279.4}},Cc=[10,5,4,2,1,1/2,1/2.5,1/4,1/5,1/10,1/20,1/50,1/100],Xy=s=>s>=1?`${gt(s)}:1`:`1:${gt(1/s)}`,Rc={front:"FRONT",top:"TOP",right:"RIGHT",iso:"ISOMETRIC"};function Pc(){return{sheet:"Letter",projection:"third",scale:"auto",views:{front:!0,top:!0,right:!0,iso:!0},hidden:!0,autoDims:!0,holeNotes:!0,decimals:2,title:{drawnBy:"",school:"",course:"",date:new Date().toISOString().slice(0,10),partNo:"",notes:""},dims:[],notes:[]}}var Va=class{constructor(t){this.app=t,this.el=hi("#drawWrap"),this.tool="select",this.sel=null,this.zoom=1,this.cache=null,this.picks=[]}get root(){return this.app.drawTarget()}get d(){let t=this.root;return t.drawing||(t.drawing=Pc()),t.drawing}units(){return this.root.units||"mm"}open(){this.el.hidden=!1,this.tool="select",this.sel=null,this.fitZoom=!0,this.update()}close(){this.el.hidden=!0,this.el.innerHTML=""}geomKey(){let t=this.root;return t.kind==="assembly"?JSON.stringify([t.parts,t.components.filter(e=>!e.hidden).map(e=>[e.part,e.pos,e.quat]),t.units]):JSON.stringify([t.features,t.params,t.rollback??null,t.units])}wantedViews(){return Object.keys(Rc).filter(t=>this.d.views[t])}async update(){let t=this.geomKey()+this.wantedViews().join();if(!this.cache||this.cache.key!==t){this.app.ui.busy(!0);let e=this.root,n=e.kind==="assembly"?{type:"drawing",parts:e.parts,comps:e.components.filter(r=>!r.hidden).map(r=>({id:r.id,part:r.part,pos:r.pos,quat:r.quat})),scale:He[e.units||"mm"],views:this.wantedViews()}:{type:"drawing",doc:e,views:this.wantedViews()},i=await this.app.send(n);if(this.app.ui.busy(!1),i.type==="error"){this.el.innerHTML=`<div class="drawempty">${$t("drawing",40)}<p>${qn(i.msg)}</p></div>`,this.app.ui.renderDrawPanel();return}this.cache={key:t,views:i.views}}this.render(),this.app.ui.renderDrawPanel()}layout(){let t=this.d,e=Ha[t.sheet]||Ha.Letter,n=this.cache.views,i=He[this.units()],r=R=>{let L=n[R];if(!L||L.error)return[0,0];let U=L.bounds;return[(U[1][0]-U[0][0])*i,(U[1][1]-U[0][1])*i]},[o,a]=r("front"),[l,c]=r("top"),[h,d]=r("right"),[u,f]=r("iso"),p=10,y=32,g=e.w-2*p,m=e.h-2*p-y,w=22,b=t.scale;if(b==="auto"){b=Cc[Cc.length-1];for(let R of Cc){let L=(o+(t.views.right?h:0))*R+w*3+(t.views.iso?Math.max(u*R*.8,0):0),U=(a+(t.views.top?c:0))*R+w*3;if(L<=g&&U<=m){b=R;break}}}let _={},T=p+w,E=e.h-p-y-w,C=t.projection==="first",D=C&&t.views.right?T+h*b+w:T,S=C?p+w+a*b:t.views.top?p+w+c*b+w+a*b:E,v=Math.min(S,E-(C&&t.views.top?c*b+w:0));if(_.front={x:D,yb:v},t.views.top&&(_.top={x:D,yb:C?v+w+c*b:v-a*b-w}),t.views.right&&(_.right={x:C?T:D+o*b+w,yb:v}),t.views.iso){let R=b*.8,L=e.w-p-w;_.iso={x:L-u*R,yb:p+w+f*R,s:R}}return{sheet:e,scale:b,pos:_,toMm:i,margin:p,tbH:y}}mapper(t,e){let n=this.cache.views[e],i=t.pos[e];if(!n||!i||n.error)return null;let r=(i.s||t.scale)*t.toMm,o=n.bounds;return{s:r,x:a=>i.x+(a-o[0][0])*r,y:a=>i.yb-(o[1][1]-a)*r}}render(){if(!this.cache)return;let t=this.d,e=this.layout(),{sheet:n}=e;this.L=e;let i=this.units(),r=t.decimals??2,o=E=>{let C=Math.pow(10,r);return String(Math.round(E*C)/C)},a="";a+=`<rect x="${e.margin}" y="${e.margin}" width="${n.w-2*e.margin}" height="${n.h-2*e.margin}" class="frame"/>`;let l=Math.min(170,n.w-2*e.margin),c=n.w-e.margin-l,h=n.h-e.margin-e.tbH,d=this.root,u=t.title,f=d.kind==="assembly"?"See parts list":(this.app.materials[d.material]||{}).name||"";a+=`<g class="tb"><rect x="${c}" y="${h}" width="${l}" height="${e.tbH}"/>`;let p=[c,c+l*.5,c+l*.75,c+l],y=[h,h+12,h+22,h+e.tbH];a+=`<line x1="${c}" y1="${y[1]}" x2="${c+l}" y2="${y[1]}"/><line x1="${c}" y1="${y[2]}" x2="${c+l}" y2="${y[2]}"/>`,a+=`<line x1="${p[1]}" y1="${y[1]}" x2="${p[1]}" y2="${y[3]}"/><line x1="${p[2]}" y1="${y[1]}" x2="${p[2]}" y2="${y[3]}"/>`;let g=(E,C,D,S,v)=>`<text x="${E+1.5}" y="${C+3}" class="tbl">${qn(D)}</text><text x="${E+1.5}" y="${C+(v?9.5:8.3)}" class="${v?"tbbig":"tbv"}">${qn(S)}</text>`;a+=`<image href="assets/icon-256.png" x="${c+l-11}" y="${h+1}" width="10" height="10"/>`,a+=g(c,y[0],"TITLE",d.name||"",!0),a+=`<text x="${c+l-12.5}" y="${h+8.5}" class="tbv" text-anchor="end">${qn(u.school||"Pathway CAD")}</text>`,a+=g(p[0],y[1],"DRAWN BY",u.drawnBy)+g(p[1],y[1],"DATE",u.date)+g(p[2],y[1],"SCALE",Xy(e.scale)),a+=g(p[0],y[2],"MATERIAL",f)+g(p[1],y[2],"UNITS",i==="in"?"INCHES":"MILLIMETRES")+g(p[2],y[2],"PART / SHEET",(u.partNo||"\u2014")+" \xB7 "+t.sheet),u.course&&(a+=`<text x="${c+1.5}" y="${h-2}" class="tbl">${qn(u.course)}</text>`),a+="</g>",a+=this.projSymbol(c-22,h+6,t.projection);for(let E of Object.keys(Rc)){if(!t.views[E])continue;let C=this.cache.views[E],D=this.mapper(e,E);if(!C||!D)continue;let S=C.bounds,v=`translate(${D.x(0)} ${D.y(0)}) scale(${D.s})`;if(a+=`<g class="view" data-view="${E}">`,t.hidden&&E!=="iso"&&(a+=`<g transform="${v}" class="hid" style="stroke-width:${.25/D.s};stroke-dasharray:${2/D.s} ${1.2/D.s}">${C.hidden.map(R=>`<path d="${R}"/>`).join("")}</g>`),a+=`<g transform="${v}" class="vis" style="stroke-width:${.5/D.s}">${C.visible.map(R=>`<path d="${R}"/>`).join("")}</g>`,a+=`<text x="${D.x((S[0][0]+S[1][0])/2)}" y="${D.y(S[1][1])+(E==="iso"?6:15)}" class="vlabel">${Rc[E]}</text>`,E==="front"||E==="top"||E==="right")for(let R of C.circles){let L=D.x(R.c[0]),U=D.y(R.c[1]),B=R.r*D.s+1.2;a+=`<path class="ctr" d="M${L-B} ${U}H${L+B}M${L} ${U-B}V${U+B}"/>`}a+="</g>"}t.autoDims&&(a+=this.autoDims(e,o,i)),t.holeNotes&&(a+=this.holeNotes(e,o));for(let E of t.dims)a+=this.dimSvg(e,E,o,this.sel===E.id);for(let E of t.notes)a+=`<text x="${E.x}" y="${E.y}" class="note${this.sel===E.id?" sel":""}" data-id="${E.id}">${E.text.split(`
`).map((C,D)=>`<tspan x="${E.x}" dy="${D?4.2:0}">${qn(C)}</tspan>`).join("")}</text>`;d.kind==="assembly"&&(a+=this.partsTable(e,c,h));for(let E of this.picks)E.sheet&&(a+=`<circle cx="${E.sheet[0]}" cy="${E.sheet[1]}" r="1" class="pick"/>`);this.snapPt&&(a+=`<circle cx="${this.snapPt[0]}" cy="${this.snapPt[1]}" r="1.3" class="snap"/>`);let m=`<svg id="sheetSvg" xmlns="${$y}" viewBox="0 0 ${n.w} ${n.h}" width="${n.w}mm" height="${n.h}mm"><defs><marker id="arr" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="3" markerHeight="3" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 1.5L10 5L0 8.5z" fill="#111"/></marker></defs><style>${qy}</style><rect width="100%" height="100%" fill="#fff"/>${a}</svg>`,w=this.el.querySelector(".sheetScroll"),b=w?[w.scrollLeft,w.scrollTop]:null;this.el.innerHTML=`<div class="sheetScroll"><div class="sheetPad">${m}</div></div><div class="drawZoom"><button data-z="-">\u2212</button><span>${Math.round(this.zoom*100)}%</span><button data-z="+">+</button><button data-z="fit">Fit</button></div>`,this.fitZoom?(this.fitZoom=!1,this.fit()):this.applyZoom();let _=this.el.querySelector(".sheetScroll");b&&(_.scrollLeft=b[0],_.scrollTop=b[1]);for(let E of this.el.querySelectorAll("[data-z]"))E.onclick=()=>{let C=E.dataset.z;C==="fit"?this.fit():(this.zoom=Math.max(.3,Math.min(6,this.zoom*(C==="+"?1.25:.8))),this.applyZoom())};_.onwheel=E=>{!E.ctrlKey&&!E.metaKey&&!E.altKey||(E.preventDefault(),this.zoom=Math.max(.3,Math.min(6,this.zoom*(E.deltaY<0?1.1:.9))),this.applyZoom())};let T=hi("#sheetSvg");T.addEventListener("pointermove",E=>this.onMove(E)),T.addEventListener("click",E=>this.onClick(E))}fit(){let t=this.el.querySelector(".sheetScroll");if(!t)return;let e=this.L.sheet,n=96/25.4;this.zoom=Math.min((t.clientWidth-360)/(e.w*n),(t.clientHeight-48)/(e.h*n)),this.applyZoom()}applyZoom(){let t=hi("#sheetSvg");if(!t)return;let e=this.L.sheet,n=96/25.4*this.zoom;t.style.width=e.w*n+"px",t.style.height=e.h*n+"px";let i=this.el.querySelector(".drawZoom span");i&&(i.textContent=Math.round(this.zoom*100)+"%")}projSymbol(t,e,n){let i=o=>`<path d="M${o-5} ${e-3}L${o+5} ${e-5}V${e+5}L${o-5} ${e+3}Z" class="sym"/><path d="M${o-7} ${e}H${o+7}" class="ctr"/>`,r=o=>`<circle cx="${o}" cy="${e}" r="5" class="sym"/><circle cx="${o}" cy="${e}" r="3" class="sym"/><path d="M${o-7} ${e}H${o+7}M${o} ${e-7}V${e+7}" class="ctr"/>`;return n==="first"?r(t-8)+i(t+8):i(t-8)+r(t+8)}autoDims(t,e,n){let i="",r=this.cache.views,o=this.d,a=(l,c)=>{let h=r[l],d=this.mapper(t,l);if(!h||!d||!o.views[l])return;let u=h.bounds;c==="w"&&(i+=this.dimSvg(t,{view:l,a:[u[0][0],u[1][1]],b:[u[1][0],u[1][1]],kind:"h",off:9/d.s,auto:!0},e)),c==="h"&&(i+=this.dimSvg(t,{view:l,a:[u[0][0],u[0][1]],b:[u[0][0],u[1][1]],kind:"v",off:-9/d.s,auto:!0},e))};return a("front","w"),a("front","h"),o.views.right?a("right","w"):o.views.top&&a("top","h"),i}holeNotes(t,e){let n="",i=this.cache.views;for(let r of["front","top","right"]){let o=i[r],a=this.mapper(t,r);if(!o||!a||!this.d.views[r])continue;let l=[];for(let h of o.circles){let d=l.find(u=>Math.hypot(u.c[0]-h.c[0],u.c[1]-h.c[1])<1e-4);d?d.r.push(h.r):l.push({c:h.c,r:[h.r]})}let c=new Map;for(let h of l){let d=[...new Set(h.r.map(p=>+e(2*p)))].sort((p,y)=>p-y),u=d.find(p=>p>d[0]&&p<=d[0]*2);h.r=u?[d[0]/2,u/2]:[d[0]/2];let f="\xD8"+d[0]+(u?", CBORE \xD8"+u:"");c.has(f)||c.set(f,[]),c.get(f).push(h)}for(let[h,d]of c){let u=d[0],f=Math.max(...u.r),p=a.x(u.c[0]),y=a.y(u.c[1]),g=Math.min(...u.r)*a.s,m=p+g*.7071,w=y-g*.7071,b=p+f*a.s*.7071+6,_=y-f*a.s*.7071-6;n+=`<path class="dimln" d="M${b+2} ${_}H${b}L${m} ${w}" marker-end="url(#arr)"/><text x="${b+2.5}" y="${_+1.1}" class="dimtx" text-anchor="start">${d.length>1?d.length+"\xD7 ":""}${h}</text>`}}return n}dimSvg(t,e,n,i){let r=this.mapper(t,e.view);if(!r)return"";let o=[r.x(e.a[0]),r.y(e.a[1])],a=[r.x(e.b[0]),r.y(e.b[1])],l,c,h,d,u,f=e.off*r.s;if(e.kind==="h"){l=Math.abs(e.b[0]-e.a[0]);let T=Math.max(o[1],a[1])+f*(f>=0,1),E=e.off>=0?Math.max(o[1],a[1])+f:Math.min(o[1],a[1])+f;c=[o[0],E],h=[a[0],E],d=o,u=a}else if(e.kind==="v"){l=Math.abs(e.b[1]-e.a[1]);let T=e.off>=0?Math.max(o[0],a[0])+f:Math.min(o[0],a[0])+f;c=[T,o[1]],h=[T,a[1]],d=o,u=a}else{l=Math.hypot(e.b[0]-e.a[0],e.b[1]-e.a[1]);let T=a[0]-o[0],E=a[1]-o[1],C=Math.hypot(T,E)||1,D=-E/C,S=T/C;c=[o[0]+D*f,o[1]+S*f],h=[a[0]+D*f,a[1]+S*f],d=o,u=a}if(l<1e-9)return"";let p=(T,E)=>{let C=E[0]-T[0],D=E[1]-T[1],S=Math.hypot(C,D);if(S<.5)return"";let v=(S+1.5)/S,R=1/S;return`<path class="ext" d="M${T[0]+C*R} ${T[1]+D*R}L${T[0]+C*v} ${T[1]+D*v}"/>`},y=(c[0]+h[0])/2,g=(c[1]+h[1])/2,m=Math.atan2(h[1]-c[1],h[0]-c[0])*180/Math.PI,w=m>90||m<-90?m+180:m,b=(e.prefix||"")+n(l);return`<g class="${"sdim"+(i?" sel":"")+(e.auto?" auto":"")}" ${e.id?`data-id="${e.id}"`:""}>${p(d,c)}${p(u,h)}<path class="dimln" d="M${c[0]} ${c[1]}L${h[0]} ${h[1]}" marker-start="url(#arr)" marker-end="url(#arr)"/><text class="dimtx" transform="translate(${y} ${g}) rotate(${w})" y="-1">${qn(b)}</text>${e.id?`<path class="hit" d="M${c[0]} ${c[1]}L${h[0]} ${h[1]}"/>`:""}</g>`}partsTable(t,e,n){let i=this.root,r=new Map;for(let f of i.components){let p=r.get(f.part)||{pid:f.part,qty:0};p.qty++,r.set(f.part,p)}let o=[...r.values()],a=Math.min(120,t.sheet.w-2*t.margin),l=t.sheet.w-t.margin-a,c=5,h=c*(o.length+1),d=n-h-(this.d.title.course?5:1),u=`<g class="tb"><rect x="${l}" y="${d}" width="${a}" height="${h}"/>`;return u+=`<text x="${l+1.5}" y="${d+3.6}" class="tbl">ITEM</text><text x="${l+12}" y="${d+3.6}" class="tbl">PART</text><text x="${l+a-30}" y="${d+3.6}" class="tbl">MATERIAL</text><text x="${l+a-2}" y="${d+3.6}" class="tbl" text-anchor="end">QTY</text>`,o.forEach((f,p)=>{let y=d+c*(p+1),g=i.parts[f.pid];u+=`<line x1="${l}" y1="${y}" x2="${l+a}" y2="${y}"/><text x="${l+1.5}" y="${y+3.6}" class="tbv">${p+1}</text><text x="${l+12}" y="${y+3.6}" class="tbv">${qn(g.name)}</text><text x="${l+a-30}" y="${y+3.6}" class="tbv">${qn(((this.app.materials[g.material]||{}).name||"").split(" (")[0])}</text><text x="${l+a-2}" y="${y+3.6}" class="tbv" text-anchor="end">${f.qty}</text>`}),u+`<line x1="${l+10}" y1="${d}" x2="${l+10}" y2="${d+h}"/><line x1="${l+a-31.5}" y1="${d}" x2="${l+a-31.5}" y2="${d+h}"/><line x1="${l+a-10}" y1="${d}" x2="${l+a-10}" y2="${d+h}"/></g>`}sheetPoint(t){let e=hi("#sheetSvg"),n=e.createSVGPoint();n.x=t.clientX,n.y=t.clientY;let i=n.matrixTransform(e.getScreenCTM().inverse());return[i.x,i.y]}snapAt(t){let e=null,n=3;for(let i of["front","top","right"]){let r=this.cache.views[i],o=this.mapper(this.L,i);if(!r||!o||!this.d.views[i])continue;let a=[];for(let l of r.visible.concat(this.d.hidden?r.hidden:[])){let c=l.match(/-?\d*\.?\d+(e-?\d+)?/gi),h=l.match(/[MLAZHVC]/gi)||[],d=0;for(let u of h){let f=u.toUpperCase();f==="M"||f==="L"?(a.push([+c[d],+c[d+1]]),d+=2):f==="A"?(a.push([+c[d+5],+c[d+6]]),d+=7):f==="C"?(a.push([+c[d+4],+c[d+5]]),d+=6):(f==="H"||f==="V")&&(d+=1)}}for(let l of r.circles)a.push(l.c);for(let l of a){let c=o.x(l[0]),h=o.y(l[1]),d=Math.hypot(c-t[0],h-t[1]);d<n&&(n=d,e={view:i,model:l,sheet:[c,h]})}}return e}onMove(t){if(this.tool!=="dim"){this.snapPt&&(this.snapPt=null,this.render());return}let e=this.sheetPoint(t),n=this.picks.length<2?this.snapAt(e):null;(n?n.sheet.join():"")!==(this.snapPt?this.snapPt.join():"")&&(this.snapPt=n?n.sheet:null,this.render())}onClick(t){let e=this.sheetPoint(t);if(this.tool==="select"){let n=t.target.closest("[data-id]");this.sel=n?n.dataset.id:null,this.render(),this.app.ui.renderDrawPanel();return}if(this.tool==="note"){this.app.ui.askText("Note text","",n=>{this.app.change(()=>this.d.notes.push({id:"n"+Date.now(),x:Math.round(e[0]*10)/10,y:Math.round(e[1]*10)/10,text:n}))}),this.setTool("select");return}if(this.tool==="dim"){if(this.picks.length<2){let u=this.snapAt(e);if(!u)return this.app.toast("Click on a corner, line end or hole center.","error");if(this.picks.length===1&&u.view!==this.picks[0].view)return this.app.toast("Pick both points in the same view.","error");this.picks.push(u),this.render(),this.app.ui.renderDrawPanel();return}let[n,i]=this.picks,r=this.mapper(this.L,n.view),o=(n.sheet[0]+i.sheet[0])/2,a=(n.sheet[1]+i.sheet[1])/2,l=e[0]-o,c=e[1]-a,h=Math.abs(c)>=Math.abs(l)?"h":"v";t.shiftKey&&(h="a");let d;if(h==="h")d=(e[1]-(c>=0?Math.max(n.sheet[1],i.sheet[1]):Math.min(n.sheet[1],i.sheet[1])))/r.s;else if(h==="v")d=(e[0]-(l>=0?Math.max(n.sheet[0],i.sheet[0]):Math.min(n.sheet[0],i.sheet[0])))/r.s;else{let u=i.sheet[0]-n.sheet[0],f=i.sheet[1]-n.sheet[1],p=Math.hypot(u,f)||1;d=((e[0]-n.sheet[0])*(-f/p)+(e[1]-n.sheet[1])*(u/p))/r.s}h==="h"&&Math.abs(n.model[0]-i.model[0])<1e-9&&(h="v"),h==="v"&&Math.abs(n.model[1]-i.model[1])<1e-9&&(h="h"),this.picks=[],this.app.change(()=>this.d.dims.push({id:"d"+Date.now(),view:n.view,a:n.model,b:i.model,kind:h,off:d}));return}}setTool(t){this.tool=t,this.picks=[],this.snapPt=null,this.app.status({select:"Click a size or note to pick it. Delete removes it.",dim:"Size: click two points in a view, then click where the size line goes (hold Shift for a slanted size).",note:"Note: click where the text goes."}[t]),this.app.ui.renderRibbon(),this.render(),this.app.ui.renderDrawPanel()}deleteSel(){if(!this.sel)return;let t=this.sel;this.app.change(()=>{this.d.dims=this.d.dims.filter(e=>e.id!==t),this.d.notes=this.d.notes.filter(e=>e.id!==t)}),this.sel=null}svgText(){let t=hi("#sheetSvg");if(!t)return"";let e=t.cloneNode(!0);e.removeAttribute("style");let n=e.querySelector("image");return n&&this._logoData&&n.setAttribute("href",this._logoData),`<?xml version="1.0" encoding="UTF-8"?>
`+e.outerHTML}async loadLogo(){if(!this._logoData)try{let t=await(await fetch("assets/icon-256.png")).blob();this._logoData=await new Promise(e=>{let n=new FileReader;n.onload=()=>e(n.result),n.readAsDataURL(t)})}catch{}}async saveSvg(){await this.loadLogo(),this.app.download(this.app.safeName()+" drawing.svg",this.svgText(),"image/svg+xml")}print(){let t=this.L.sheet,e=hi("#pageStyle");e||(e=document.createElement("style"),e.id="pageStyle",document.head.appendChild(e)),e.textContent=`@page { size: ${t.w}mm ${t.h}mm; margin: 0; }`;let n=hi("#printSheet");n.innerHTML=hi("#sheetSvg").outerHTML;let i=n.querySelector("svg");i.removeAttribute("id"),i.style.width=t.w+"mm",i.style.height=t.h-.5+"mm",n.style.width=t.w+"mm",n.style.height=t.h-.5+"mm",document.body.classList.add("printing"),setTimeout(()=>{window.print(),document.body.classList.remove("printing")},50)}},qy=`
.frame{fill:none;stroke:#111;stroke-width:.6}
.tb rect,.tb line{fill:none;stroke:#111;stroke-width:.35}
.tbl{font:1.9px Arial,sans-serif;fill:#555}
.tbv{font:3.1px Arial,sans-serif;fill:#111}
.tbbig{font:bold 4.6px Arial,sans-serif;fill:#111}
.vis path{fill:none;stroke:#111;stroke-linecap:round;stroke-linejoin:round}
.hid path{fill:none;stroke:#666}
.ctr{fill:none;stroke:#888;stroke-width:.2;stroke-dasharray:3 .8 .6 .8}
.sym{fill:none;stroke:#111;stroke-width:.3}
.vlabel{font:bold 2.8px Arial,sans-serif;fill:#333;text-anchor:middle;letter-spacing:.3px}
.dimln{fill:none;stroke:#111;stroke-width:.22}
.ext{fill:none;stroke:#111;stroke-width:.18}
.dimtx{font:3px Arial,sans-serif;fill:#111;text-anchor:middle}
.sdim .hit{stroke:transparent;stroke-width:3;fill:none;cursor:pointer}
.sdim.sel .dimln,.sdim.sel .ext{stroke:#e86a00}
.sdim.sel .dimtx{fill:#e86a00}
.note{font:3.1px Arial,sans-serif;fill:#111;cursor:pointer}
.note.sel{fill:#e86a00}
.pick{fill:#e86a00}
.snap{fill:none;stroke:#0596bd;stroke-width:.5}
`;var Ps=(s,t)=>({app:"Pathway CAD",version:1,name:s,material:"pla",color:"#8fb3c9",rollback:null,nextId:500,...t}),di=[{title:"Mounting bracket",about:"An L-shaped bracket: sketch on the front plane, extrude both ways, round the inside corner, add bolt holes and a pattern. Sizes come from parameters.",doc:Ps("Bracket",{material:"aluminum",color:"#b9c3cc",params:[{name:"len",expr:60,note:"base length"},{name:"height",expr:50,note:"upright height"},{name:"thick",expr:5,note:"metal thickness"},{name:"width",expr:40,note:"bracket width"},{name:"bolt",expr:6,note:"bolt hole size"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XZ",offset:0,entities:[{id:"e1",type:"line",x1:0,y1:0,x2:"len",y2:0},{id:"e2",type:"line",x1:"len",y1:0,x2:"len",y2:"thick"},{id:"e3",type:"line",x1:"len",y1:"thick",x2:"thick",y2:"thick"},{id:"e4",type:"line",x1:"thick",y1:"thick",x2:"thick",y2:"height"},{id:"e5",type:"line",x1:"thick",y1:"height",x2:0,y2:"height"},{id:"e6",type:"line",x1:0,y1:"height",x2:0,y2:0}]},{id:"f2",type:"extrude",name:"Extrusion1",sketch:"f1",distance:"width",extent:"distance",direction:"both",op:"new",taper:0},{id:"f3",type:"fillet",name:"Fillet1",radius:4,allEdges:!1,edges:[[5,0,5]]},{id:"f4",type:"hole",name:"Hole1",origin:[40,-10,5],normal:[0,0,1],diameter:"bolt",extent:"through",depth:10,style:"counterbore",cbDiameter:"bolt*1.8",cbDepth:2},{id:"f5",type:"pattern",kind:"rect",name:"RectangularPattern1",features:["f4"],d1:"Y",n1:2,s1:20,d2:"X",n2:1,s2:10},{id:"f6",type:"hole",name:"Hole2",origin:[5,0,33],normal:[1,0,0],diameter:"bolt",extent:"through",depth:10,style:"simple",cbDiameter:10,cbDepth:3}]})},{title:"Wheel hub",about:"A lathe-style part: a profile drawn beside a construction axis is revolved, then bolt holes are copied around in a circle.",doc:Ps("Wheel hub",{color:"#e0a458",params:[{name:"bore",expr:10,note:"axle hole diameter"},{name:"dia",expr:80,note:"wheel diameter"},{name:"bolts",expr:5,note:"number of bolt holes"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XZ",offset:0,entities:[{id:"ax",type:"line",x1:0,y1:-5,x2:0,y2:30,construction:!0},{id:"r1",type:"rect",x:"bore/2",y:0,w:"dia/2 - bore/2",h:8},{id:"r2",type:"rect",x:"bore/2",y:0,w:8,h:25}]},{id:"f2",type:"revolve",name:"Revolution1",sketch:"f1",axis:"ax",angle:360,op:"new"},{id:"f3",type:"hole",name:"Hole1",origin:[27,0,8],normal:[0,0,1],diameter:6,extent:"through",depth:10,style:"simple",cbDiameter:10,cbDepth:3},{id:"f4",type:"pattern",kind:"circ",name:"CircularPattern1",features:["f3"],axis:"Z",n:"bolts",angle:360},{id:"f5",type:"chamfer",name:"Chamfer1",radius:1,allEdges:!0,edges:[],suppressed:!0}]})},{title:"Key tag",about:"A 3D-printable tag: a rectangle extruded 3 mm, rounded corners, a key-ring hole and a shallow slot cut into the top on an offset sketch plane.",doc:Ps("Key tag",{color:"#6cc3a0",params:[{name:"W",expr:50,note:"length"},{name:"H",expr:25,note:"height"},{name:"T",expr:3,note:"thickness"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XY",offset:0,entities:[{id:"e1",type:"rect",x:"-W/2",y:"-H/2",w:"W",h:"H"}]},{id:"f2",type:"extrude",name:"Extrusion1",sketch:"f1",distance:"T",extent:"distance",direction:"normal",op:"new",taper:0},{id:"f3",type:"fillet",name:"Fillet1",radius:5,allEdges:!1,edges:[[25,12.5,1.5],[-25,12.5,1.5],[25,-12.5,1.5],[-25,-12.5,1.5]]},{id:"f4",type:"hole",name:"Hole1",origin:[-18,0,3],normal:[0,0,1],diameter:5,extent:"through",depth:10,style:"simple",cbDiameter:9,cbDepth:3},{id:"f5",type:"sketch",name:"Sketch2",plane:"XY",offset:"T",entities:[{id:"s1",type:"slot",x1:-6,y1:0,x2:17,y2:0,w:10}]},{id:"f6",type:"extrude",name:"Extrusion2",sketch:"f5",distance:1,extent:"distance",direction:"reverse",op:"cut",taper:0}]})},{title:"Pencil cup",about:"A hexagon extruded into a tall prism, then hollowed with Shell (the top face is left open) and given a chamfered rim.",doc:Ps("Pencil cup",{color:"#8b9cf0",params:[{name:"size",expr:40,note:"corner radius of the hexagon"},{name:"tall",expr:95,note:"height"}],features:[{id:"f1",type:"sketch",name:"Sketch1",plane:"XY",offset:0,entities:[{id:"p1",type:"polygon",cx:0,cy:0,r:"size",n:6,rot:0}]},{id:"f2",type:"extrude",name:"Extrusion1",sketch:"f1",distance:"tall",extent:"distance",direction:"normal",op:"new",taper:3},{id:"f3",type:"shell",name:"Shell1",thickness:2.5,faces:[[0,0,95]]}]})}],Yy=Ps("Pin",{material:"steel",color:"#9aa4ad",params:[{name:"shank",expr:5.8,note:"a little under the 6 mm hole so it slides in"}],features:[{id:"f1",type:"primitive",shape:"cylinder",name:"Head",diameter:10,h:3,axis:"Z",x:0,y:0,z:0,op:"new"},{id:"f2",type:"primitive",shape:"cylinder",name:"Shank",diameter:"shank",h:15,axis:"Z",x:0,y:0,z:-15,op:"join"},{id:"f3",type:"chamfer",name:"Chamfer1",radius:.6,allEdges:!1,edges:[[0,-2.9,-15]]}]}),Zy=Ps("Axle",{material:"steel",color:"#9aa4ad",params:[{name:"length",expr:100,note:"axle length"}],features:[{id:"f1",type:"primitive",shape:"cylinder",name:"Rod",diameter:9.8,h:"length",axis:"Z",x:0,y:0,z:0,op:"new"}]}),Ic=[{title:"Bracket and pin",about:"A pin is Inserted into the bracket's side hole: the round edge under its head goes onto the hole's rim. Drag the pin: it can only spin.",doc:{app:"Pathway CAD",kind:"assembly",version:1,name:"Bracket and pin",units:"mm",nextId:50,parts:{p1:JSON.parse(JSON.stringify(di[0].doc)),p2:Yy},components:[{id:"c1",name:"Bracket:1",part:"p1",pos:[0,0,0],quat:[0,0,0,1],grounded:!0},{id:"c2",name:"Pin:1",part:"p2",pos:[30,45,20],quat:[0,0,0,1],grounded:!1}],constraints:[{id:"k1",name:"Insert1",type:"insert",offset:0,sign:1,a:{comp:"c1",kind:"axis",p:[5,0,33],n:[1,0,0],r:3,rim:!0,label:"round edge \xD86"},b:{comp:"c2",kind:"axis",p:[0,0,0],n:[0,0,1],r:5,rim:!0,label:"round edge \xD810"}}]}},{title:"Wheels on an axle",about:"Two copies of the wheel hub ride on an axle. Axis constraints line up the centers, and Flush sets how far along the axle each wheel sits. Edit one hub and both change.",doc:{app:"Pathway CAD",kind:"assembly",version:1,name:"Wheels on an axle",units:"mm",nextId:50,parts:{p1:Zy,p2:JSON.parse(JSON.stringify(di[1].doc))},components:[{id:"c1",name:"Axle:1",part:"p1",pos:[0,0,0],quat:[0,0,0,1],grounded:!0},{id:"c2",name:"Wheel hub:1",part:"p2",pos:[70,0,0],quat:[0,0,0,1],grounded:!1},{id:"c3",name:"Wheel hub:2",part:"p2",pos:[-70,0,60],quat:[0,0,0,1],grounded:!1}],constraints:[{id:"k1",name:"Axis1",type:"axis",offset:0,sign:1,a:{comp:"c1",kind:"axis",p:[0,0,0],n:[0,0,1],r:4.9,label:"round face \xD89.8"},b:{comp:"c2",kind:"axis",p:[0,0,0],n:[0,0,1],r:5,rim:!0,label:"round edge \xD810"}},{id:"k2",name:"Flush1",type:"flush",offset:-8,a:{comp:"c1",kind:"plane",p:[0,0,0],n:[0,0,-1],label:"flat face"},b:{comp:"c2",kind:"plane",p:[0,0,0],n:[0,0,-1],label:"flat face"}},{id:"k3",name:"Axis2",type:"axis",offset:0,sign:-1,a:{comp:"c1",kind:"axis",p:[0,0,0],n:[0,0,1],r:4.9,label:"round face \xD89.8"},b:{comp:"c3",kind:"axis",p:[0,0,0],n:[0,0,1],r:5,rim:!0,label:"round edge \xD810"}},{id:"k4",name:"Flush2",type:"flush",offset:-8,a:{comp:"c1",kind:"plane",p:[0,0,100],n:[0,0,1],label:"flat face"},b:{comp:"c3",kind:"plane",p:[0,0,0],n:[0,0,-1],label:"flat face"}}]}}];var Ga=(s,t=document)=>t.querySelector(s),De=s=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),hu=s=>JSON.parse(JSON.stringify(s)),Ie=s=>Math.round(s*1e4)/1e4,be=s=>new P(s[0],s[1],s[2]),Wa=s=>{try{return je(s,{})}catch{return 0}};var ui={mate:{label:"Mate",icon:"mate",help:"Puts two flat faces against each other, facing opposite ways (like a part sitting on a table).",want:"plane"},flush:{label:"Flush",icon:"flush",help:"Lines two flat faces up so they face the same way and are level with each other.",want:"plane"},insert:{label:"Insert",icon:"insert",help:"Puts a round edge into another round edge: same center line, and the two edge rims level. Use it for pins, bolts and shafts in holes.",want:"circle"},axis:{label:"Axis",icon:"axisMate",help:"Lines up two center lines (round edges or round faces). The parts can still slide and spin along it, like a wheel on an axle.",want:"axis"},angle:{label:"Angle",icon:"angleMate",help:"Sets the angle between two flat faces (0\xB0 = facing the same way), like a hinge opened to 90\xB0.",want:"plane"}};function $a(){return{app:"Pathway CAD",kind:"assembly",version:1,name:"Assembly1",units:"mm",parts:{},components:[],constraints:[],nextId:1}}var Ar=class{constructor(t){this.app=t,this.vp=t.vp,this.group=new $e,this.group.visible=!1,this.vp.scene.add(this.group),this.geo=new Map,this.objs=new Map,this.sel=null,this.hover=null,this.bad={},this.clashes=[]}get asm(){return this.app.asm}scaleOf(t){let e=this.asm.parts[t];return(He[e&&e.units||"mm"]||1)/(He[this.asm.units||"mm"]||1)}comp(t){return this.asm.components.find(e=>e.id===t)}partName(t){let e=this.asm.parts[t];return e&&e.name||"Part"}show(t){this.group.visible=t,t&&this.vp.setPart(null),this.vp.render()}partKey(t){return JSON.stringify([t.features,t.params,t.rollback??null,t.units||"mm"])}async rebuild(){if(!this.app.ready||!this.asm)return;let t=this.app.cmd&&this.app.cmd.noPreviewBuild,e={};for(let[n,i]of Object.entries(this.asm.parts)){let r=this.geo.get(n);(!r||r.key!==this.partKey(i))&&(e[n]=i)}for(let n of[...this.geo.keys()])this.asm.parts[n]||this.disposeGeo(n);if(Object.keys(e).length){let n=this._t=(this._t||0)+1;this.app.ui.busy(!0);let i=await this.app.send({type:"parts",parts:e});if(n!==this._t)return;if(this.app.ui.busy(!1),i.type==="error"){this.app.toast("Could not build the parts: "+i.msg,"error");return}for(let[r,o]of Object.entries(i.descs)){this.disposeGeo(r);let a={key:this.partKey(this.asm.parts[r]||e[r]),desc:o,errors:i.errors[r]||{}};if(o){a.geo=new Kt,a.geo.setAttribute("position",new le(o.vertices,3)),a.geo.setAttribute("normal",new le(o.normals,3)),a.geo.setIndex(new le(o.triangles,1)),a.geo.computeBoundingSphere(),a.edgeGeo=new Kt,a.edgeGeo.setAttribute("position",new le(o.lines,3));let l=[];for(let[c,h]of o.edgeGroups)for(let d=c;d<c+h-1;d++)l.push(d,d+1);a.edgeGeo.setIndex(l),a.edgeGeo.computeBoundingSphere()}this.geo.set(r,a),this.refreshRefs(r)}for(let r of this.objs.keys())this.dropObj(r)}t||this.solve(),this.render(),this.app.ui.renderTree(),this.app.ui.renderStatusInfo(),!this._fitted&&this.asm.components.length&&(this._fitted=!0,this.fit())}disposeGeo(t){let e=this.geo.get(t);e&&(e.geo&&e.geo.dispose(),e.edgeGeo&&e.edgeGeo.dispose(),this.geo.delete(t))}dropObj(t){let e=this.objs.get(t);e&&(this.group.remove(e.mesh),this.group.remove(e.edges),e.mat.dispose(),this.objs.delete(t))}matrixOf(t){let e=this.scaleOf(t.part);return new ee().compose(be(t.pos),new xe(...t.quat),new P(e,e,e))}render(){if(!this.asm)return;let t=new Set(this.asm.components.map(e=>e.id));for(let e of[...this.objs.keys()])t.has(e)||this.dropObj(e);for(let e of this.asm.components){let n=this.geo.get(e.part);if(!n||!n.geo){this.dropObj(e.id);continue}let i=this.objs.get(e.id);if(!i){let l=new Ti({metalness:.15,roughness:.55,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1,side:_e}),c=new ce(n.geo,l),h=new wn(n.edgeGeo,this.vp.edgeMat);c.matrixAutoUpdate=!1,h.matrixAutoUpdate=!1,c.userData.comp=e.id,h.userData.comp=e.id,this.group.add(c),this.group.add(h),i={mesh:c,edges:h,mat:l},this.objs.set(e.id,i)}let r=this.asm.parts[e.part];i.mat.color.set(e.color||r&&r.color||"#8fb3c9"),i.mat.emissive.set(this.sel===e.id?1798010:this.hover&&this.hover.comp===e.id&&!this.app.cmd?932675:0);let o=this.app.cmd&&this.app.cmd.ghostOthers&&this.app.cmd.ghostOthers(e.id);i.mat.transparent=!!o,i.mat.opacity=o?.3:1,i.mat.depthWrite=!o;let a=this.matrixOf(e);i.mesh.matrix.copy(a),i.edges.matrix.copy(a),i.mesh.matrixWorldNeedsUpdate=!0,i.edges.matrixWorldNeedsUpdate=!0,i.mesh.visible=!e.hidden,i.edges.visible=!e.hidden&&this.vp.style!=="shaded",this.vp.style==="wire"&&(i.mesh.visible=!1)}this.drawClashes(),this.vp.render()}fit(){let t=new mn;for(let e of this.objs.values())e.mesh.visible&&t.expandByObject(e.mesh);if(t.isEmpty())return this.vp.fit([[-50,-50,0],[50,50,50]]);this.vp.fit([t.min.toArray(),t.max.toArray()])}refFromHit(t,e){let n=this.geo.get(this.comp(t.comp).part);if(!n||!n.desc)return null;if(t.kind==="face"){let i=n.desc.faces[t.index];return i.type==="PLANE"&&(e==="plane"||e==="any")?{comp:t.comp,kind:"plane",p:i.center.map(Ie),n:i.normal.map(Ie),label:"flat face"}:i.axis&&(e==="axis"||e==="any")?{comp:t.comp,kind:"axis",p:i.axis.p.map(Ie),n:i.axis.d.map(Ie),r:Ie(i.axis.r),label:`round face \xD8${gt(2*i.axis.r)}`}:null}if(t.kind==="edge"){let i=n.desc.edges[t.index];if(i.circle&&(e==="circle"||e==="axis"||e==="any"))return{comp:t.comp,kind:"axis",p:i.circle.c.map(Ie),n:i.circle.n.map(Ie),r:Ie(i.circle.r),rim:!0,label:`round edge \xD8${gt(2*i.circle.r)}`}}return null}worldRef(t){let e=this.comp(t.comp),n=this.matrixOf(e),i=new xe(...e.quat);return{p:be(t.p).applyMatrix4(n),n:be(t.n).applyQuaternion(i).normalize()}}refreshRefs(t){let e=this.geo.get(t);if(!(!e||!e.desc||!this.asm))for(let n of this.asm.constraints)for(let i of[n.a,n.b]){let r=this.comp(i.comp);if(!r||r.part!==t)continue;let o=null,a=1/0,l=be(i.n);if(i.kind==="plane")for(let c of e.desc.faces){if(c.type!=="PLANE"||be(c.normal).dot(l)<.999)continue;let h=Math.abs(be(c.center).sub(be(i.p)).dot(l))*4+be(c.center).distanceTo(be(i.p));h<a&&(a=h,o={p:c.center,n:c.normal})}else{let c=[];for(let h of e.desc.edges)h.circle&&(i.rim||!0)&&c.push({p:h.circle.c,n:h.circle.n,r:h.circle.r,rim:!0});for(let h of e.desc.faces)h.axis&&!i.rim&&c.push({p:h.axis.p,n:h.axis.d,r:h.axis.r});for(let h of c){if(Math.abs(be(h.n).dot(l))<.999||!!h.rim!=!!i.rim)continue;let d=be(h.p).distanceTo(be(i.p))+Math.abs(h.r-(i.r||h.r))*2;d<a&&(a=d,o=h)}}o?(i.p=o.p.map(Ie),i.kind==="plane"||be(o.n).dot(l)>0?i.n=o.n.map(Ie):i.n=o.n.map(c=>Ie(-c)),o.r&&(i.r=Ie(o.r)),i.lost=!1):i.lost=!0}}solve(t=80){let e=this.asm;if(!e)return;let n=e.constraints.filter(i=>!i.suppressed&&this.comp(i.a.comp)&&this.comp(i.b.comp));for(let i=0;i<t;i++){let r=0;for(let o of n)r+=this.applyOne(o);if(r<1e-9)break}this.bad={};for(let i of n){let r=this.residual(i);r>.001&&(this.bad[i.id]=r)}for(let i of e.components){i.pos=i.pos.map(Ie);let r=new xe(...i.quat).normalize();i.quat=[r.x,r.y,r.z,r.w].map(o=>Math.round(o*1e8)/1e8)}}pickMover(t){let e=this.comp(t.a.comp),n=this.comp(t.b.comp);if(e===n)return null;let i=e.grounded||this._dragging===e.id;return n.grounded||this._dragging===n.id?i?null:{mover:e,mref:t.a,fref:t.b,sideB:!1}:{mover:n,mref:t.b,fref:t.a,sideB:!0}}rotateAbout(t,e,n){let i=be(t.pos).sub(n).applyQuaternion(e).add(n),r=e.clone().multiply(new xe(...t.quat)).normalize();t.pos=i.toArray(),t.quat=[r.x,r.y,r.z,r.w]}applyOne(t){let e=this.pickMover(t);if(!e)return 0;let{mover:n,mref:i,fref:r}=e,o=this.worldRef(r),a=this.worldRef(i),l=0,c=Wa(t.offset);if(t.type==="mate"||t.type==="flush"){let h=t.type==="mate"?o.n.clone().negate():o.n.clone(),d=new xe().setFromUnitVectors(a.n,h),u=2*Math.acos(Math.min(1,Math.abs(d.w)));u>1e-10&&(this.rotateAbout(n,d,a.p),l+=u*10,a=this.worldRef(i));let f=a.p.clone().sub(o.p).dot(o.n),y=(e.sideB||t.type==="mate"?c:-c)-f;Math.abs(y)>1e-10&&(n.pos=be(n.pos).addScaledVector(o.n,y).toArray(),l+=Math.abs(y))}else if(t.type==="angle"){let h=c*Math.PI/180,d=this.comp(r.comp),u=new xe(...d.quat);if(!t.hinge||t.hinge.comp!==d.id){let m=new P().crossVectors(o.n,a.n);m.lengthSq()<1e-12&&m.copy(Math.abs(o.n.z)<.9?new P(0,0,1):new P(1,0,0)).cross(o.n),m.normalize().applyQuaternion(u.clone().invert()),t.hinge={comp:d.id,d:m.toArray().map(Ie)}}let f=be(t.hinge.d).applyQuaternion(u);f=f.sub(o.n.clone().multiplyScalar(f.dot(o.n))).normalize();let p=o.n.clone().applyAxisAngle(f,e.sideB?h:-h),y=new xe().setFromUnitVectors(a.n,p),g=2*Math.acos(Math.min(1,Math.abs(y.w)));g>1e-10&&(this.rotateAbout(n,y,a.p),l+=g*10)}else{let h=t.sign||1,d=o.n.clone().multiplyScalar((e.sideB,h)),u=new xe().setFromUnitVectors(a.n,d),f=2*Math.acos(Math.min(1,Math.abs(u.w)));f>1e-10&&(this.rotateAbout(n,u,a.p),l+=f*10,a=this.worldRef(i));let p=a.p.clone().sub(o.p),y=p.dot(o.n),m=p.clone().addScaledVector(o.n,-y).clone().negate();if(t.type==="insert"){let w=e.sideB?c:-c;m.addScaledVector(o.n,w-y)}m.length()>1e-10&&(n.pos=be(n.pos).add(m).toArray(),l+=m.length())}return l}residual(t){let e=this.worldRef(t.a),n=this.worldRef(t.b),i=Wa(t.offset);if(t.type==="mate"||t.type==="flush")return(t.type==="mate"?n.n.clone().add(e.n).length():n.n.clone().sub(e.n).length())+Math.abs(n.p.clone().sub(e.p).dot(e.n)-i);if(t.type==="angle"){let c=i*Math.PI/180;return Math.abs(Math.acos(Math.max(-1,Math.min(1,e.n.dot(n.n))))-c)}let r=n.n.clone().sub(e.n.clone().multiplyScalar(t.sign||1)).length(),o=n.p.clone().sub(e.p),a=o.dot(e.n),l=r+o.clone().addScaledVector(e.n,-a).length();return t.type==="insert"&&(l+=Math.abs(a-i)),l}ray(t){return this.vp.ray(t)}pick(t,e={faces:!0,edges:!1}){let n=this.ray(t),i=[...this.objs.values()].filter(a=>a.mesh.visible).map(a=>a.mesh),o=n.intersectObjects(i,!1)[0];if(e.edges){let a=[...this.objs.values()].filter(u=>u.mesh.visible).map(u=>u.edges),l=a.map(u=>u.visible);a.forEach(u=>u.visible=!0);let c=n.intersectObjects(a,!1);a.forEach((u,f)=>u.visible=l[f]);let h=this.vp.pixelSize()*8,d=c.find(u=>!o||u.distance<=o.distance+h);if(d){let u=d.object.userData.comp,f=this.geo.get(this.comp(u).part),p=Jy(f.desc,d.index);if(p>=0&&(!e.circleOnly||f.desc.edges[p].circle))return{kind:"edge",comp:u,index:p,point:d.point.toArray()}}}if(o&&e.faces){let a=o.object.userData.comp,l=this.geo.get(this.comp(a).part);return{kind:"face",comp:a,index:Ky(l.desc,o.faceIndex),point:o.point.toArray()}}return o?{kind:"comp",comp:o.object.userData.comp,point:o.point.toArray()}:null}highlight(t){this.vp.clearHighlights();for(let e of t){if(e.kind==="point"||e.kind==="segment"){this.vp.addHighlight(e);continue}let n=this.comp(e.comp||e.ref&&e.ref.comp);if(!n)continue;let i=this.geo.get(n.part);if(!i||!i.desc)continue;let r=this.matrixOf(n);if(e.kind==="face"){let[o,a]=i.desc.faceGroups[e.index]||[0,0],l=new Kt;l.setAttribute("position",i.geo.getAttribute("position")),l.setIndex(Array.from(i.desc.triangles.subarray(o,o+a)));let c=new ce(l,new Fe({color:e.color,transparent:!0,opacity:.6,side:_e,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));c.matrixAutoUpdate=!1,c.matrix.copy(r),this.vp.overlay.add(c)}else if(e.kind==="edge"){let[o,a]=i.desc.edgeGroups[e.index]||[0,0],l=[];for(let h=o;h<o+a;h++)l.push(new P(i.desc.lines[h*3],i.desc.lines[h*3+1],i.desc.lines[h*3+2]));let c=new on(new Kt().setFromPoints(l),new Pe({color:e.color,depthTest:!1}));c.matrixAutoUpdate=!1,c.matrix.copy(r),c.renderOrder=10,this.vp.overlay.add(c)}else if(e.kind==="ref"){let o=this.worldRef(e.ref),a=Math.max(6,(e.ref.r||0)*2.4,this.vp.pixelSize()*40);if(e.ref.kind==="plane"){let u=new Gn(a,a),f=new ce(u,new Fe({color:e.color,transparent:!0,opacity:.45,side:_e,depthTest:!1}));f.position.copy(o.p),f.quaternion.setFromUnitVectors(new P(0,0,1),o.n),f.renderOrder=9,this.vp.overlay.add(f)}let l=a*.8,c=o.p.clone().addScaledVector(o.n,e.ref.kind==="axis"?-l:0),h=o.p.clone().addScaledVector(o.n,l),d=new on(new Kt().setFromPoints([c,h]),new Pe({color:e.color,depthTest:!1}));d.renderOrder=10,this.vp.overlay.add(d),this.vp.addHighlight({kind:"point",point:o.p.toArray(),color:e.color})}}this.drawClashes(),this.vp.render()}drawClashes(){if(this.clashObj&&(this.vp.scene.remove(this.clashObj),this.clashObj.traverse(e=>e.geometry&&e.geometry.dispose()),this.clashObj=null),!this.clashes.length||!this.group.visible)return;let t=new $e;for(let e of this.clashes){let n=new Kt;n.setAttribute("position",new le(e.vertices,3)),n.setIndex(new le(e.triangles,1));let i=new ce(n,new Fe({color:14692657,transparent:!0,opacity:.85,depthTest:!1,side:_e}));i.renderOrder=12;let r=1/(He[this.asm.units||"mm"]||1);i.scale.setScalar(r),t.add(i)}this.clashObj=t,this.vp.scene.add(t)}onDown(t){if(t.button!==0||(this._down={x:t.clientX,y:t.clientY},this.app.cmd))return;let e=this.pick(t,{faces:!0});if(e){let n=this.comp(e.comp);if(!n.grounded){let i=new P;this.vp.camera.getWorldDirection(i),this._drag={id:n.id,plane:new Ue().setFromNormalAndCoplanarPoint(i,be(e.point)),last:be(e.point),moved:!1},this.app.beginChange(),this.vp.controls.enabled=!1}}}onMove(t){if(this._drag){let o=this.ray(t),a=new P;if(!o.ray.intersectPlane(this._drag.plane,a))return;let l=a.clone().sub(this._drag.last);this._drag.last=a;let c=this.comp(this._drag.id);c.pos=be(c.pos).add(l).toArray(),this._drag.moved=!0,this._dragging=c.id,this.solve(40),this._dragging=null,this.solve(40),this.render();return}let e=this.app.cmd,n=e&&e.want?e.want:{faces:!0},i=this.pick(t,n),r=i?i.comp+i.kind+(i.index??""):"";r!==(this.hover?this.hover.key:"")&&(this.hover=i?{...i,key:r}:null,this.vp.renderer.domElement.style.cursor=i?e?"pointer":"grab":"default",this.render(),this.refreshHighlights())}onUp(t){if(t.button!==0)return;let e=this._down;if(this._down=null,this._drag){let r=this._drag.moved;if(this._drag=null,this.vp.controls.enabled=!0,r){this.app.endChange();return}this.app.abortChange()}if(!e||Math.hypot(t.clientX-e.x,t.clientY-e.y)>5)return;let n=this.app.cmd;if(n&&n.onPick){n.onPick(this.pick(t,n.want||{faces:!0}),t);return}let i=this.pick(t,{faces:!0});this.sel=i?i.comp:null,this.render(),this.app.ui.renderTree(),i&&this.app.status(`${this.comp(i.comp).name}: drag to move it, double-click it in the tree to edit the part. ${this.comp(i.comp).grounded?"It is grounded (fixed in place).":""}`)}refreshHighlights(){let t=[],e=this.app.cmd;e&&e.highlights&&t.push(...e.highlights());let n=this.hover;n&&e&&e.want&&(n.kind==="face"?t.push({kind:"face",comp:n.comp,index:n.index,color:3065014}):n.kind==="edge"&&t.push({kind:"edge",comp:n.comp,index:n.index,color:16747546})),this.highlight(t)}newId(t){let e=t+this.asm.nextId;return this.asm.nextId++,e}uniqueName(t){let e=1,n=new Set([...this.asm.components.map(i=>i.name),...this.asm.constraints.map(i=>i.name)]);for(;n.has(`${t}:${e}`);)e++;return`${t}:${e}`}freeSpot(){let t=new mn;for(let e of this.objs.values())t.expandByObject(e.mesh);return t.isEmpty()?[0,0,0]:[Ie(t.max.x+20),Ie((t.min.y+t.max.y)/2),Ie(t.min.z)]}addPart(t,e={}){let n=e.pid||this.newId("p"),i=e.pid?this.asm.parts[n]:hu(t);return e.pid||delete i.kind,this.app.change(()=>{e.pid||(this.asm.parts[n]=i);let r=!this.asm.components.length,o={id:this.newId("c"),name:this.uniqueName(i.name||"Part"),part:n,pos:r?[0,0,0]:this.freeSpot(),quat:[0,0,0,1],grounded:r,hidden:!1};this.asm.components.push(o),this.sel=o.id}),n}deleteComp(t){let e=this.comp(t),n=this.asm.constraints.filter(i=>i.a.comp===t||i.b.comp===t);n.length&&!confirm(`Removing ${e.name} also removes ${n.length} constraint(s) on it. Go ahead?`)||(this.app.change(()=>{this.asm.components=this.asm.components.filter(i=>i.id!==t),this.asm.constraints=this.asm.constraints.filter(i=>i.a.comp!==t&&i.b.comp!==t),this.asm.components.some(i=>i.part===e.part)||delete this.asm.parts[e.part]}),this.sel===t&&(this.sel=null))}rotateComp(t,e,n){let i=this.comp(t);if(!i)return;let r=this.objs.get(t),a=new mn().expandByObject(r.mesh).getCenter(new P),l=new xe().setFromAxisAngle(be(e==="X"?[1,0,0]:e==="Y"?[0,1,0]:[0,0,1]),n*Math.PI/180);this.app.change(()=>{this.rotateAbout(i,l,a)})}renderTree(t){let e=this.asm,n=`<div class="trow root">${$t("assembly",16)}<b>${De(e.name)}</b></div>`;n+=`<div class="trow sub groupHead">${$t("part",16)}<span>Parts placed (${e.components.length})</span></div>`,e.components.length||(n+='<div class="tempty">Use <b>Place</b> on the Assemble tab to bring in a part.</div>');for(let i of e.components){let r=this.geo.get(i.part),o=r&&Object.keys(r.errors||{}).length,a=["trow","feat","comp",this.sel===i.id?"sel":"",i.hidden?"supp":"",o?"bad":""].join(" ");n+=`<div class="${a}" data-comp="${i.id}" title="Click to pick. Double-click to edit the part. Right-click for more.">${$t("part",16)}<span class="tname">${De(i.name)}</span>${i.grounded?`<span class="tpin" title="Grounded: fixed in place">${$t("pin",13)}</span>`:""}${o?`<span class="tbad">${$t("err",14)}</span>`:""}</div>`}n+=`<div class="trow sub groupHead">${$t("mate",16)}<span>Constraints (${e.constraints.length})</span></div>`;for(let i of e.constraints){let r=this.comp(i.a.comp),o=this.comp(i.b.comp),a=this.bad[i.id]!=null||i.a.lost||i.b.lost,l=["trow","feat","con",i.suppressed?"supp":"",a?"bad":"",this.selCon===i.id?"sel":""].join(" "),c=i.a.lost||i.b.lost?"A face or edge it used is gone after a part change. Delete it and add it again.":a?"This constraint cannot be met together with the others. Check the offsets, flip it, or remove one.":"Double-click to change. Right-click for more.";n+=`<div class="${l}" data-con="${i.id}" title="${De(c)}">${$t(ui[i.type].icon,16)}<span class="tname">${De(i.name)}</span><span class="tmeta">${De(r?r.name:"?")} \u2194 ${De(o?o.name:"?")}</span>${a?`<span class="tbad">${$t("err",14)}</span>`:""}</div>`}t.innerHTML=n;for(let i of t.querySelectorAll("[data-comp]")){let r=i.dataset.comp;i.onclick=o=>{o.stopPropagation(),this.sel=r,this.selCon=null,this.render(),this.renderTree(t)},i.ondblclick=o=>{o.stopPropagation(),this.app.editPart(this.comp(r).part)},i.oncontextmenu=o=>{o.preventDefault(),o.stopPropagation(),this.sel=r,this.render(),this.renderTree(t),this.compMenu(r,o.clientX,o.clientY)}}for(let i of t.querySelectorAll("[data-con]")){let r=i.dataset.con;i.onclick=o=>{o.stopPropagation(),this.selCon=r,this.renderTree(t);let a=e.constraints.find(l=>l.id===r);this.highlight([{kind:"ref",ref:a.a,color:1809066},{kind:"ref",ref:a.b,color:15227148}])},i.ondblclick=o=>{o.stopPropagation(),this.app.run("constrain",{edit:r})},i.oncontextmenu=o=>{o.preventDefault(),o.stopPropagation(),this.conMenu(r,o.clientX,o.clientY)}}}compMenu(t,e,n){let i=this.comp(t),r=this.app.ui;r.menu([["Edit part",()=>this.app.editPart(i.part)],["Move / turn",()=>this.app.run("moveComp",{id:t})],["Rename",()=>r.askText("Rename",i.name,o=>this.app.change(()=>{this.comp(t).name=o}))],[i.grounded?"Unground (let it move)":"Ground (fix in place)",()=>this.app.change(()=>{this.comp(t).grounded=!this.comp(t).grounded})],[i.hidden?"Show":"Hide",()=>this.app.change(()=>{this.comp(t).hidden=!this.comp(t).hidden})],["Place another copy",()=>{this.addPart(null,{pid:i.part})}],["Remove",()=>this.deleteComp(t),"danger"]],e,n)}conMenu(t,e,n){let i=this.asm.constraints.find(r=>r.id===t);this.app.ui.menu([["Edit",()=>this.app.run("constrain",{edit:t})],["Flip",()=>this.app.change(()=>{let r=this.asm.constraints.find(o=>o.id===t);r.type==="mate"||r.type==="flush"?r.type=r.type==="mate"?"flush":"mate":r.sign=-(r.sign||1)})],[i.suppressed?"Turn on":"Turn off (suppress)",()=>this.app.change(()=>{let r=this.asm.constraints.find(o=>o.id===t);r.suppressed=!r.suppressed})],["Delete",()=>this.app.change(()=>{this.asm.constraints=this.asm.constraints.filter(r=>r.id!==t)}),"danger"]],e,n)}openPartsList(){let t=this.asm,e=this.app.materials,n=new Map;for(let a of t.components){let l=n.get(a.part)||{pid:a.part,qty:0};l.qty++,n.set(a.part,l)}let i=0,r=0,o=[...n.values()].map(a=>{r++;let l=t.parts[a.pid],c=this.geo.get(a.pid),h=e[l.material]||e.pla,d=He[l.units||"mm"],u=c&&c.desc?c.desc.volume*d*d*d/1e3*h.density:0;i+=u*a.qty;let f=c&&c.desc?c.desc.bb[1].map((p,y)=>gt(p-c.desc.bb[0][y])).join(" \xD7 ")+" "+(l.units||"mm"):"";return`<tr><td>${r}</td><td><b>${De(l.name)}</b></td><td>${a.qty}</td><td>${De(h.name)}</td><td>${De(f)}</td><td>${Dc(u)}</td><td>${Dc(u*a.qty)}</td></tr>`}).join("");this.app.ui.modal(`<h2>${$t("bom",22)} Parts list: ${De(t.name)}</h2>
      <table class="ptable bom"><thead><tr><th>#</th><th>Part</th><th>Qty</th><th>Material</th><th>Size</th><th>Mass each</th><th>Mass total</th></tr></thead><tbody>${o||'<tr><td colspan="7" class="muted">No parts yet.</td></tr>'}</tbody></table>
      <p><b>Total mass: ${Dc(i)}</b> \xB7 ${t.components.length} parts placed, ${n.size} different</p>
      <p><button id="bomCsv">Download as a spreadsheet (.csv)</button></p>`,"wide"),Ga("#bomCsv").onclick=()=>{let a=[["Item","Part","Qty","Material","Mass each (g)"]],l=0;for(let c of n.values()){l++;let h=t.parts[c.pid],d=this.geo.get(c.pid),u=e[h.material]||e.pla,f=He[h.units||"mm"];a.push([l,h.name,c.qty,u.name,d&&d.desc?(d.desc.volume*f*f*f/1e3*u.density).toFixed(2):""])}this.app.download(this.app.safeName()+" parts list.csv",a.map(c=>c.map(h=>`"${String(h).replace(/"/g,'""')}"`).join(",")).join(`\r
`),"text/csv")}}async checkInterference(){let t=this.asm;if(t.components.length<2)return this.app.toast("Place at least two parts first.");this.app.toast("Checking where parts overlap\u2026");let e=t.components.filter(a=>!a.hidden).map(a=>({id:a.id,part:a.part,pos:a.pos.map(l=>l*He[t.units||"mm"]),quat:a.quat})),n=await this.app.send({type:"interference",parts:t.parts,comps:e,scale:1});if(n.type==="error")return this.app.toast("Check failed: "+n.msg,"error");this.clashes=n.found,this.render();let i=t.units||"mm",r=He[i],o=n.found.map(a=>`<li><b>${De(this.comp(a.a).name)}</b> and <b>${De(this.comp(a.b).name)}</b> overlap by ${gt(a.volume/(r*r*r))} ${i}\xB3</li>`).join("");this.app.ui.modal(`<h2>${$t("clash",22)} Interference check</h2>${n.found.length?`<p>These parts run into each other. The overlap is shown in <b style="color:#e03131">red</b>. Real parts could not be put together like this.</p><ul>${o}</ul>`:'<p class="good"><b>\u2714 No parts overlap.</b> Everything fits.</p>'}<p class="muted">Touching faces (a mate with no gap) do not count as overlap.</p><div class="welcomebtns"><button id="clashClear">Clear the red marks</button></div>`,"",null),Ga("#clashClear").onclick=()=>{this.clashes=[],this.render(),this.app.ui.closeModal()}}};function Dc(s){return s>=1e3?gt(s/1e3)+" kg":gt(s)+" g"}function Ky(s,t){let e=t*3,n=s.faceGroups;for(let i=0;i<n.length;i++)if(e>=n[i][0]&&e<n[i][0]+n[i][1])return i;return-1}function Jy(s,t){let e=s.edgeGroups;for(let n=0;n<e.length;n++)if(t>=e[n][0]&&t<e[n][0]+e[n][1])return n;return-1}var du={place(s){return s.asmr.placeDialog(),null},constrain(s,t){let e=s.asmr,n=s.asm;if(n.components.length<2)return s.toast("Place at least two parts first.","error"),null;let i,r=null;t&&t.edit?(r=n.constraints.findIndex(d=>d.id===t.edit),i=hu(n.constraints[r])):i={id:e.newId("k"),type:t&&t.type||"mate",name:"",a:null,b:null,offset:0,sign:1};let o=JSON.stringify(n.components),a=()=>{let d=JSON.parse(o);for(let u of n.components){let f=d.find(p=>p.id===u.id);f&&(u.pos=f.pos,u.quat=f.quat)}},l=()=>{let d=ui[i.type].want;return d==="plane"?{faces:!0}:d==="circle"?{edges:!0,circleOnly:!0}:{faces:!0,edges:!0,circleOnly:!0}},c=()=>{if(a(),i.a&&i.b){let d=n.constraints;n.constraints=d.filter(u=>u.id!==i.id).concat([i]),e.solve(),n.constraints=d}e.render(),s.refreshHighlights()};return{title:r!=null?"Edit "+i.name:"Constrain",get help(){return ui[i.type].help},noPreviewBuild:!0,get want(){return l()},fields:()=>[{key:"type",label:"Type",type:"select",options:Object.entries(ui).map(([d,u])=>[d,u.label]),onChange:()=>{i.a=null,i.b=null,i.hinge=null,a(),e.render()}},{type:"html",html:`<div class="picks"><div class="${i.a?"done":"now"}"><b>1</b> ${i.a?De(e.comp(i.a.comp).name+": "+i.a.label):"Click a "+kc(i.type)+" on the part that stays put"}</div><div class="${i.b?"done":i.a?"now":""}"><b>2</b> ${i.b?De(e.comp(i.b.comp).name+": "+i.b.label):"Click a "+kc(i.type)+" on the part to move"}</div></div>`},{key:"offset",label:i.type==="angle"?"Angle (\xB0)":`Offset / gap (${n.units||"mm"})`,type:"expr"},i.type==="insert"||i.type==="axis"?{type:"buttons",items:[["Flip direction",()=>{i.sign=-(i.sign||1),c(),s.ui.refreshCmd()}]]}:i.type!=="angle"?{type:"buttons",items:[[i.type==="mate"?"Flip (make it Flush)":"Flip (make it Mate)",()=>{i.type=i.type==="mate"?"flush":"mate",c(),s.ui.refreshCmd()}]]}:null,i.a||i.b?{type:"buttons",items:[["Pick again",()=>{i.a=null,i.b=null,i.hinge=null,a(),e.render(),s.ui.refreshCmd(),s.refreshHighlights()}]]}:null].filter(Boolean),target:i,onField:()=>c(),onPick(d){if(!d)return;let u=e.refFromHit(d,ui[i.type].want);if(!u){s.toast(`Pick a ${kc(i.type)}.`,"error");return}if(!i.a)i.a=u;else{if(i.b)return;if(u.comp===i.a.comp){s.toast("Pick the second one on a different part.","error");return}if(i.b=u,i.type==="insert"||i.type==="axis"){let f=e.worldRef(i.a),p=e.worldRef(i.b);i.sign=f.n.dot(p.n)>=0?1:-1,i.type==="insert"&&(i.sign=-1)}i.type==="angle"&&!Wa(i.offset)&&(i.offset=90)}s.ui.refreshCmd(),c()},highlights:()=>[i.a&&{kind:"ref",ref:i.a,color:1809066},i.b&&{kind:"ref",ref:i.b,color:15227148}].filter(Boolean),validate:()=>!i.a||!i.b?"Pick both parts first.":null,ok(){if(a(),!i.name){let d=1;for(;n.constraints.some(u=>u.name===ui[i.type].label+d);)d++;i.name=ui[i.type].label+d}s.change(()=>{r!=null?n.constraints[r]=i:n.constraints.push(i),e.solve()}),e.bad[i.id]!=null&&s.toast(`${i.name} cannot be met together with the other constraints. Try Flip, a different offset, or unground a part.`,"error")},cancel(){a(),e.render()}}},moveComp(s,t){let e=s.asmr,n=t&&t.id||e.sel,i=n&&e.comp(n);if(!i)return s.toast("Click a part first, then Move.","error"),null;let r=s.asm.units||"mm",o={x:i.pos[0],y:i.pos[1],z:i.pos[2]},a=(l,c)=>{e.rotateComp(i.id,l,c),Object.assign(o,{x:i.pos[0],y:i.pos[1],z:i.pos[2]}),s.ui.refreshCmd()};return{title:"Move "+i.name,help:"Turn the part in 90\xB0 steps or type where it goes. Constraints still apply, so a constrained part may snap back.",noOk:!0,closeLabel:"Done",target:o,fields:()=>[{type:"buttons",label:"Turn 90\xB0 around",items:[["X",()=>a("X",90)],["Y",()=>a("Y",90)],["Z",()=>a("Z",90)],["\u2212X",()=>a("X",-90)],["\u2212Y",()=>a("Y",-90)],["\u2212Z",()=>a("Z",-90)]]},{key:"x",label:`Position X (${r})`,type:"expr"},{key:"y",label:`Position Y (${r})`,type:"expr"},{key:"z",label:`Position Z (${r})`,type:"expr"},{type:"note",text:i.grounded?"This part is grounded (fixed). Moving it moves everything constrained to it.":"Tip: you can also drag a part with the left mouse button."}],onField:()=>{let l=[o.x,o.y,o.z].map(Wa);l.some(c=>!Number.isFinite(c))||s.change(()=>{i.pos=l,e.solve()})},highlights:()=>[]}},measure(s){let t=s.asmr,e=[],n="Click a spot on a part, then a second spot. Click a round edge to see its diameter.",i=s.asm.units||"mm";return{title:"Measure",help:"Straight-line distance between two clicked points.",want:{faces:!0,edges:!0},noOk:!0,closeLabel:"Done",fields:()=>[{type:"html",html:n}],onPick(r){if(!r)return;let o="";if(r.kind==="edge"){let c=t.refFromHit(r,"circle");c&&(o=`Round edge: <b>\xD8 ${gt(2*c.r*t.scaleOf(t.comp(r.comp).part))} ${i}</b>`)}e.length>=2&&(e.length=0),e.push(r.point);let a=e[0],l=e[1];n=e.length===1?`First point picked.<br>${o}<br>Now click a second point.`:`Distance: <b class="big">${gt(Math.hypot(l[0]-a[0],l[1]-a[1],l[2]-a[2]))} ${i}</b><br>X: ${gt(Math.abs(l[0]-a[0]))} &nbsp; Y: ${gt(Math.abs(l[1]-a[1]))} &nbsp; Z: ${gt(Math.abs(l[2]-a[2]))}<br>${o}`,s.ui.refreshCmd(),s.refreshHighlights()},highlights:()=>[...e.map(r=>({kind:"point",point:r,color:15227148})),...e.length===2?[{kind:"segment",points:e,color:15227148}]:[]]}}};function kc(s){let t=ui[s].want;return t==="plane"?"flat face":t==="circle"?"round edge":"round edge or round face"}Ar.prototype.placeDialog=function(){let s=this.app,t=this.asm,e=[...new Set(t.components.map(n=>n.part))];s.ui.modal(`<h2>${$t("place",22)} Place a part</h2>
    <div class="excards">
      <button class="excard" id="plFile"><b>From a part file\u2026</b><span>Pick a .pcad file you saved.</span></button>
      <button class="excard" id="plNew"><b>New part</b><span>Start an empty part inside this assembly and design it here.</span></button>
      ${e.map(n=>`<button class="excard" data-copy="${n}"><b>Another ${De(this.partName(n))}</b><span>A copy of a part already here (both change together).</span></button>`).join("")}
      ${di.map((n,i)=>`<button class="excard" data-ex="${i}"><b>Example: ${De(n.title)}</b><span>${De(n.about.split(".")[0])}.</span></button>`).join("")}
    </div>`,"wide"),Ga("#plFile").onclick=()=>{let n=document.createElement("input");n.type="file",n.accept=".pcad,.json",n.multiple=!0,n.onchange=async()=>{for(let i of n.files)try{let r=JSON.parse(await i.text());if(!r||!Array.isArray(r.features))throw new Error(i.name+" is not a Pathway CAD part file");this.addPart(r)}catch(r){s.toast("Could not place: "+r.message,"error")}s.ui.closeModal()},n.click()},Ga("#plNew").onclick=()=>{s.ui.closeModal();let n=s.blankPart(),i=1;for(;Object.values(t.parts).some(o=>o.name==="Part"+i);)i++;n.name="Part"+i,n.units=t.units||"mm";let r=this.addPart(n);s.editPart(r)};for(let n of document.querySelectorAll("#modal [data-copy]"))n.onclick=()=>{s.ui.closeModal(),this.addPart(null,{pid:n.dataset.copy})};for(let n of document.querySelectorAll("#modal [data-ex]"))n.onclick=()=>{s.ui.closeModal(),this.addPart(di[+n.dataset.ex].doc)}};var At=(s,t=document)=>t.querySelector(s),St=s=>String(s).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Nc=s=>JSON.parse(JSON.stringify(s)),Ye=s=>Math.round(s*1e3)/1e3,uu="pathwaycad.autosave.v1",qa={pla:{name:"PLA plastic (3D print)",density:1.24},petg:{name:"PETG plastic (3D print)",density:1.27},abs:{name:"ABS plastic",density:1.04},acrylic:{name:"Acrylic",density:1.18},oak:{name:"Oak wood",density:.75},pine:{name:"Pine wood",density:.5},aluminum:{name:"Aluminum 6061",density:2.7},steel:{name:"Mild steel",density:7.85},stainless:{name:"Stainless steel",density:8},brass:{name:"Brass",density:8.5},copper:{name:"Copper",density:8.96}},Uc={sketch:{icon:"sketch",label:"Sketch"},extrude:{icon:"extrude",label:"Extrusion"},revolve:{icon:"revolve",label:"Revolution"},hole:{icon:"hole",label:"Hole"},primitive:{icon:"primitive",label:"Shape"},fillet:{icon:"fillet",label:"Fillet"},chamfer:{icon:"chamfer",label:"Chamfer"},shell:{icon:"shell",label:"Shell"},pattern:{icon:"pattern",label:"Pattern"},mirrorBody:{icon:"mirrorBody",label:"Mirror Part"}},Lc=[["join","Add material (join)"],["cut","Remove material (cut)"],["intersect","Keep only the overlap"]],Xa=[["X","X axis (red)"],["Y","Y axis (green)"],["Z","Z axis (blue)"]],fu=[["YZ","YZ plane (flip left/right)"],["XZ","XZ plane (flip front/back)"],["XY","XY plane (flip up/down)"]];function Bi(){return{app:"Pathway CAD",version:1,name:"Part1",units:"mm",material:"pla",color:"#8fb3c9",params:[],features:[],rollback:null,nextId:1}}var Fc=class{constructor(){this.doc=Bi(),this.undoStack=[],this.redoStack=[],this.mode="model",this.cmd=null,this.result={errors:{},warnings:{}},this.buildId=0,this.pending=new Map,this.ui=new Oc(this),this.vp=new Na(At("#view3d")),this.sk=new za(this),this.asm=null,this.editPid=null,this.materials=qa,this.asmr=new Ar(this),this.drw=new Va(this),this.vp.onStyle=()=>this.mode==="assembly"&&this.asmr.render(),this.startKernel(),this.bindViewportPicking(),this.ui.renderRibbon(),this.restore(),this.vp.setView("home"),window.addEventListener("keydown",t=>this.onKey(t)),window.pathwayDesktop&&(window.pathwayDesktop.onOpenFile((t,e)=>this.openText(t,e)),window.pathwayDesktop.ready()),window.addEventListener("beforeunload",()=>this.autosave())}startKernel(){this.ready=!1,this.worker=new Worker("worker.js",{type:"module"}),this.worker.onmessage=t=>this.onKernel(t.data),this.worker.onerror=t=>{this.ui.loading(`The modeling engine failed to start: ${t.message||"unknown error"}`,!0)}}onKernel(t){if(t.type==="ready"){this.ready=!0,this.ui.loading(null),this.status("Ready. Pick a tool from the ribbon, or right-drag to turn the view."),this.rebuild();return}if(t.type==="fatal"){this.ui.loading("The modeling engine failed to start: "+t.msg,!0);return}let e=this.pending.get(t.id);e&&(this.pending.delete(t.id),e(t))}send(t){return new Promise(e=>{let n=++this.buildId;this.pending.set(n,e),this.worker.postMessage({...t,id:n})})}buildPlan(){let t=this.doc,e=t.rollback??t.features.length;if(this.mode==="sketch"){let n=t.features.findIndex(i=>i.id===this.sketchId);return{doc:t,stopAt:n+1}}if(this.cmd&&this.cmd.feature){let n=this.cmd,i={...t,features:[...t.features]},r;n.editIndex!=null?(r=n.editIndex,i.features[r]=n.feature):(r=e,i.features.splice(r,0,n.feature));let o=n.picksOnBase&&!n.preview;return{doc:i,stopAt:o?r:r+1,previewId:n.feature.id}}return{doc:t,stopAt:e}}rebuild(){if(this.ready){if(this.mode==="assembly"){this.asmr.rebuild();return}if(this.mode==="drawing"){this.drw.update(),this.ui.renderTree();return}clearTimeout(this._rb),this._rb=setTimeout(async()=>{let t=this.buildPlan(),e=++this._ticket||(this._ticket=1);this.ui.busy(!0);let n=await this.send({type:"rebuild",doc:t.doc,stopAt:t.stopAt});if(e!==this._ticket)return;if(this.ui.busy(!1),n.type==="error"){this.toast("Rebuild failed: "+n.msg,"error");return}this.planes={...this.planes||{},...n.planes||{}},this.result={errors:n.errors,warnings:n.warnings,desc:n.desc,ms:n.ms,previewId:t.previewId};let i=!this.vp.desc&&n.desc;this.vp.setPart(n.desc),i&&this.mode!=="sketch"&&!this._fittedOnce&&(this._fittedOnce=!0,this.vp.fit()),this.refreshHighlights(),this.ui.renderTree(),this.ui.renderStatusInfo(),this.cmd&&this.cmd.onRebuilt&&this.cmd.onRebuilt(),t.previewId&&n.errors[t.previewId]?this.ui.cmdError(n.errors[t.previewId]):this.cmd&&this.ui.cmdError(null),this.ui.infoOpen&&this.ui.renderInfo()},40)}}params(){return Qd(this.doc)}newId(t="f"){let e=t+this.doc.nextId;return this.doc.nextId++,e}get root(){return this.asm||this.doc}snapshot(){return JSON.stringify(this.root)}change(t){let e=this.snapshot();t(),this.snapshot()!==e&&(this.undoStack.push(e),this.undoStack.length>200&&this.undoStack.shift(),this.redoStack=[]),this.changed()}beginChange(){this._began=this.snapshot()}endChange(){this._began&&this._began!==this.snapshot()&&(this.undoStack.push(this._began),this.redoStack=[]),this._began=null,this.changed()}abortChange(){this._began=null}changed(){this.dirty=!0,clearTimeout(this._as),this._as=setTimeout(()=>this.autosave(),800),this.mode==="sketch"&&this.sk.recompute(),this.rebuild(),this.ui.renderTree(),this.ui.renderTitle()}undo(){if(this.cmd){this.cancelCmd();return}if(!this.undoStack.length)return this.toast("Nothing to undo");this.redoStack.push(this.snapshot()),this.loadState(this.undoStack.pop())}redo(){if(!this.redoStack.length)return this.toast("Nothing to redo");this.undoStack.push(this.snapshot()),this.loadState(this.redoStack.pop())}loadState(t){let e=JSON.parse(t);if(e.kind==="assembly"){if(this.asm=e,this.editPid&&!e.parts[this.editPid]&&this.returnToAssembly(),this.editPid&&(this.doc=e.parts[this.editPid]),this.mode==="assembly"){this.changed();return}}else this.doc=e;this.mode==="sketch"&&!this.sketchFeature()&&this.exitSketch(!0),this.mode==="sketch"&&(this.sk.sel=new Set([...this.sk.sel].filter(n=>this.sketchFeature().entities.some(i=>i.id===n))),this.sk.recompute(),this.sk.redraw(),this.ui.sketchSelection()),this.vp.setColor(this.doc.color),this.changed()}autosave(){try{localStorage.setItem(uu,this.snapshot())}catch{}}restore(){let t=null;try{t=localStorage.getItem(uu)}catch{}if(t)try{let e=JSON.parse(t);if(e&&e.kind==="assembly"){this.openAssembly(e),this.toast("Opened your last assembly. Use File > New for a fresh one.");return}if(e&&e.features&&e.features.length){this.setDoc(e,!0),this.toast("Opened your last part. Use File > New for a fresh one.");return}}catch{}this.setDoc(Bi(),!0),this.ui.showWelcome()}setDoc(t,e){this.mode==="sketch"&&this.exitSketch(!0),this.cmd&&this.cancelCmd(),this.leaveAssembly();let n=Bi();this.doc={...n,...t},(!this.doc.nextId||this.doc.nextId<2)&&(this.doc.nextId=1e3),this.undoStack=[],this.redoStack=[],this.vp.setColor(this.doc.color),this._fittedOnce=!1,this.vp.desc=null,this.ui.renderTitle(),this.ui.renderTree(),this.rebuild(),e||this.vp.setView("home")}drawTarget(){return this.drawPrev==="assembly"?this.asm:this.doc}openDrawing(){this.mode==="sketch"&&this.exitSketch(!0),this.cmd&&this.cancelCmd();let t=this.mode==="assembly"?this.asm:this.doc;if(t.kind==="assembly"?!t.components.length:!this.result.desc)return this.toast("Make a solid (or place parts) first, then make its drawing.","error");this.drawPrev=this.mode,this.mode="drawing",t.drawing||(t.drawing=Pc(),(t.units||"mm")==="mm"&&(t.drawing.sheet="A4"),t.kind==="assembly"&&(t.drawing.holeNotes=!1)),this.ui.tab="drawing",this.ui.renderRibbon(),this.ui.renderTree(),this.drw.open(),this.drw.setTool("select")}closeDrawing(){this.mode==="drawing"&&(this.drw.close(),this.mode=this.drawPrev||"model",this.drawPrev=null,this.ui.closeCmd(),this.ui.tab=this.mode==="assembly"?"assemble":"model",this.ui.renderRibbon(),this.ui.renderTree(),this.rebuild())}units(){return(this.mode==="assembly"?this.asm.units:this.doc.units)||"mm"}blankPart(){return Bi()}leaveAssembly(){this.asm=null,this.editPid=null,this.mode==="assembly"&&(this.mode="model"),this.asmr.show(!1),this.asmr.clashes=[],this.vp.fitOverride=null,this.ui.renderRibbon()}openAssembly(t){this.mode==="sketch"&&this.exitSketch(!0),this.cmd&&this.cancelCmd(),this.asm={...$a(),...t},this.editPid=null,this.doc=Bi(),this.mode="assembly",this.undoStack=[],this.redoStack=[],this.asmr.sel=null,this.asmr.clashes=[],this.asmr._fitted=!1,this.asmr.show(!0),this.vp.fitOverride=()=>this.asmr.fit(),this.ui.tab="assemble",this.ui.renderRibbon(),this.ui.renderTitle(),this.ui.renderTree(),this.rebuild(),this.vp.setView("home")}newAssemblyFile(){this.root&&(this.root.features&&this.root.features.length||this.root.components&&this.root.components.length)&&!confirm("Start a new assembly? Save first if you want to keep what is open (File > Save).")||(this.openAssembly($a()),this.asmr.placeDialog())}editPart(t){!this.asm||!this.asm.parts[t]||(this.cmd&&this.cancelCmd(),this.editPid=t,this.mode="model",this.doc=this.asm.parts[t],this.asmr.show(!1),this.vp.fitOverride=null,this.vp.setColor(this.doc.color),this.vp.desc=null,this._fittedOnce=!1,this.ui.tab="model",this.ui.renderRibbon(),this.ui.renderTitle(),this.ui.renderTree(),this.rebuild(),this.vp.setView("home"),this.toast(`Editing ${this.doc.name}. Press "Back to assembly" when done.`))}returnToAssembly(){this.asm&&(this.mode==="sketch"&&this.exitSketch(!0),this.cmd&&this.cancelCmd(),this.editPid=null,this.mode="assembly",this.doc=Bi(),this.vp.setPart(null),this.asmr.show(!0),this.vp.fitOverride=()=>this.asmr.fit(),this.ui.tab="assemble",this.ui.renderRibbon(),this.ui.renderTitle(),this.ui.renderTree(),this.rebuild())}findFeature(t){return this.doc.features.find(e=>e.id===t)}featureIndex(t){return this.doc.features.findIndex(e=>e.id===t)}sketchFeature(){return this.findFeature(this.sketchId)}nextName(t){let e=t==="primitive"?"Shape":Uc[t].label,n=1;for(;this.doc.features.some(i=>i.name===e+n);)n++;return e+n}insertFeature(t){let e=this.doc.rollback??this.doc.features.length;this.doc.features.splice(e,0,t),this.doc.rollback!=null&&this.doc.rollback++}dependents(t){let e=new Set([t]),n=!0;for(;n;){n=!1;for(let i of this.doc.features){if(e.has(i.id))continue;[i.sketch,...i.features||[]].some(o=>e.has(o))&&(e.add(i.id),n=!0)}}return e}deleteFeature(t){let e=this.dependents(t),n=this.findFeature(t);if(e.size>1){let i=this.doc.features.filter(r=>e.has(r.id)&&r.id!==t).map(r=>r.name).join(", ");if(!confirm(`Deleting ${n.name} also deletes what uses it: ${i}. Go ahead?`))return}this.change(()=>{let i=this.doc.features.length,r=this.doc.rollback;if(r!=null){let o=this.doc.features.slice(0,r).filter(a=>e.has(a.id)).length;this.doc.rollback=r-o}this.doc.features=this.doc.features.filter(o=>!e.has(o.id)),this.doc.rollback!=null&&this.doc.rollback>=this.doc.features.length&&(this.doc.rollback=null)})}status(t){this.ui.status(t)}toast(t,e){this.ui.toast(t,e)}onKey(t){let e=t.target&&t.target.tagName||"",n=e==="INPUT"||e==="TEXTAREA"||e==="SELECT",i=t.key.toLowerCase();if((t.ctrlKey||t.metaKey)&&i==="z"&&!n){t.preventDefault(),t.shiftKey?this.redo():this.undo();return}if((t.ctrlKey||t.metaKey)&&i==="y"&&!n){t.preventDefault(),this.redo();return}if((t.ctrlKey||t.metaKey)&&i==="s"){t.preventDefault(),this.saveFile();return}if((t.ctrlKey||t.metaKey)&&i==="o"){t.preventDefault(),this.openFile();return}if(n){t.key==="Enter"&&this.cmd&&e!=="TEXTAREA"&&e!=="SELECT"&&(t.target.blur(),setTimeout(()=>this.okCmd(),60));return}if(this.ui.modalOpen()){t.key==="Escape"&&this.ui.closeModal();return}if(this.mode==="drawing"){if(t.key==="Escape"){this.drw.tool!=="select"||this.drw.picks.length?this.drw.setTool("select"):this.closeDrawing();return}if(t.key==="Delete"||t.key==="Backspace"){t.preventDefault(),this.drw.deleteSel();return}if(t.ctrlKey||t.metaKey||t.altKey)return;i==="d"&&this.drw.setTool("dim"),i==="n"&&this.drw.setTool("note"),i==="s"&&this.drw.setTool("select");return}if(this.mode==="assembly"){if(t.key==="Escape"){this.cmd?this.cancelCmd():(this.asmr.sel=null,this.asmr.render(),this.ui.renderTree());return}if(t.key==="Enter"&&this.cmd){this.okCmd();return}if((t.key==="Delete"||t.key==="Backspace")&&!this.cmd&&this.asmr.sel){t.preventDefault(),this.asmr.deleteComp(this.asmr.sel);return}if(t.ctrlKey||t.metaKey||t.altKey||this.cmd)return;let o={p:"place",c:"constrain",m:"measure",g:"moveComp"};o[i]&&this.run(o[i]),t.key==="F6"&&this.vp.setView("home");return}if(t.key==="Escape"){this.mode==="sketch"?this.sk.temp.length||this.sk.tool!=="select"?this.sk.cancelTemp():this.sk.sel.size&&(this.sk.sel.clear(),this.sk.redraw(),this.ui.sketchSelection()):this.cmd&&this.cancelCmd();return}if(t.key==="Enter"&&this.cmd){this.okCmd();return}if(t.key==="Delete"||t.key==="Backspace"){this.mode==="sketch"?(t.preventDefault(),this.sk.deleteSelected()):!this.cmd&&this.ui.treeSel&&(t.preventDefault(),this.deleteFeature(this.ui.treeSel));return}if(t.ctrlKey||t.metaKey||t.altKey)return;if(this.mode==="sketch"){let o={l:"line",r:"rect",c:"circle",a:"arc",p:"polygon",o:"slot",s:"select"};o[i]&&this.sk.setTool(o[i]),i==="g"&&this.toggleGrid(),i==="x"&&this.sk.toggleConstruction();return}if(this.cmd)return;let r={s:"sketch",e:"extrude",r:"revolve",h:"hole",f:"fillet",m:"measure"};r[i]&&this.run(r[i]),t.key==="F6"&&this.vp.setView("home")}bindViewportPicking(){let t=this.vp.renderer.domElement,e=null;t.addEventListener("pointerdown",n=>{if(this.mode==="assembly")return this.asmr.onDown(n);n.button===0&&(e=[n.clientX,n.clientY])}),t.addEventListener("pointermove",n=>{if(this.mode==="assembly")return this.asmr.onMove(n);if(this.mode==="sketch")return;let i=this.pickWant();if(!i){this.hoverPick&&(this.hoverPick=null,this.refreshHighlights());return}let r=this.vp.pick(n,i),o=r?r.kind+(r.index??r.name):"";o!==(this.hoverPick?this.hoverPick.key:"")&&(this.hoverPick=r?{...r,key:o}:null,this.refreshHighlights(),t.style.cursor=r?"pointer":"default")}),t.addEventListener("pointerup",n=>{if(this.mode==="assembly")return this.asmr.onUp(n);if(n.button!==0||!e||this.mode==="sketch")return;let i=Math.hypot(n.clientX-e[0],n.clientY-e[1]);if(e=null,i>5)return;let r=this.pickWant();if(!r)return;let o=this.vp.pick(n,r);this.cmd&&this.cmd.onPick&&this.cmd.onPick(o,n)})}pickWant(){return!this.cmd||!this.cmd.want||this.cmd.picksOnBase&&this.cmd.preview?null:this.cmd.want}refreshHighlights(){if(this.mode==="assembly"){this.asmr.refreshHighlights();return}let t=[];if(this.cmd&&this.cmd.highlights&&t.push(...this.cmd.highlights()),this.hoverPick){let e=this.hoverPick;e.kind==="face"?t.push({kind:"face",index:e.index,color:cn.hoverFace}):e.kind==="edge"?t.push({kind:"edge",index:e.index,color:cn.hoverEdge}):e.kind==="plane"&&t.push({kind:"plane",name:e.name,color:cn.hoverFace})}this.vp.highlight(t)}run(t,e){if(!this.ready)return this.toast("The modeling engine is still loading\u2026");if(this.mode==="sketch"&&!["params","info","measure"].includes(t)){this.toast("Finish the sketch first (green check).");return}this.cmd&&this.cancelCmd();let n=(this.mode==="assembly"?du:ex)[t];if(!n)return;let i=n(this,e);i&&(this.cmd=i,this.ui.openCmd(i),i.start&&i.start(),this.refreshHighlights(),this.rebuild())}cmdChanged(){this.cmd&&(this.ui.refreshCmd(),this.refreshHighlights(),this.rebuild())}okCmd(){let t=this.cmd;if(t){if(t.validate){let e=t.validate();if(e){this.toast(e,"error");return}}if(t.feature){let e=this.buildPlan();this.change(()=>{t.editIndex!=null?this.doc.features[t.editIndex]=t.feature:this.insertFeature(t.feature)})}t.ok&&t.ok(),this.closeCmd()}}cancelCmd(){this.cmd&&this.cmd.cancel&&this.cmd.cancel(),this.closeCmd(),this.rebuild()}closeCmd(){this.cmd=null,this.hoverPick=null,this.asmr.hover=null,this.mode==="assembly"&&this.asmr.render(),this.vp.showPlanes(!1),this.ui.closeCmd(),this.refreshHighlights(),this.vp.renderer.domElement.style.cursor="default",this.status("Ready. Pick a tool from the ribbon, or right-drag to turn the part."),this.rebuild()}editFeature(t){let e=this.findFeature(t);if(!e)return;if(e.type==="sketch")return this.enterSketch(t);let n={extrude:"extrude",revolve:"revolve",hole:"hole",fillet:"fillet",chamfer:"chamfer",shell:"shell",mirrorBody:"mirrorBody",primitive:"primitive",pattern:"pattern"};this.run(n[e.type],{edit:t})}enterSketch(t,e=!1){this.cmd&&this.closeCmd();let n=this.findFeature(t),i;try{let r=this.params(),o=typeof n.plane=="string"?jy[n.plane]:{...n.plane},a=n.faceRef&&this.planes&&this.planes[t];a&&a.base&&(o.origin=a.base,o.normal=a.normal);let l=n.offset?je(n.offset,r):0;i={origin:o.origin.map((c,h)=>c+o.normal[h]*l),xDir:o.xDir,normal:o.normal}}catch(r){this.toast("Plane offset problem: "+r.message,"error");return}this.mode="sketch",this.sketchId=t,this.sketchIsNew=e,this.savedCam={pos:this.vp.camera.position.clone(),up:this.vp.camera.up.clone(),target:this.vp.controls.target.clone(),zoom:this.vp.camera.zoom,h:this.vp.viewHeight},this.vp.setGhost(!0),this.sk.evals=null,this.sk.recompute(),this.sk.enter(i),this.ui.enterSketch(),this.rebuild()}exitSketch(t){if(this.mode!=="sketch")return;let e=this.sketchId;if(this.sk.exit(),this.mode="model",this.vp.setGhost(!1),this.ui.exitSketch(),this.savedCam){let o=this.savedCam;this.vp.camera.position.copy(o.pos),this.vp.setUp(o.up),this.vp.controls.target.copy(o.target),this.vp.camera.zoom=o.zoom,this.vp.viewHeight=o.h,this.vp.updateFrustum(),this.vp.controls.update()}if(this.rebuild(),t)return;let n=this.findFeature(e);if(!n)return;let i=this.doc.features.some(o=>o.sketch===e),{loops:r}=Fa(Tr(n.entities,this.params(),n.constraints));!i&&r.length?this.run("extrude",{sketch:e}):!i&&n.entities.length&&this.toast("No closed shape yet, so nothing to extrude. Red dots show line ends that do not meet.")}toggleGrid(){this.sk.gridOn=!this.sk.gridOn,this.sk.redraw(),this.ui.sketchToolChanged(this.sk.tool)}download(t,e,n){let i=e instanceof Blob?e:new Blob([e],{type:n}),r=document.createElement("a");r.href=URL.createObjectURL(i),r.download=t,document.body.appendChild(r),r.click(),setTimeout(()=>{URL.revokeObjectURL(r.href),r.remove()},2e3)}safeName(){return(this.root.name||"Part").replace(/[^\w\- ]+/g,"").trim()||"Part"}saveFile(t){this.mode==="sketch"&&this.exitSketch(!0);let e=t?this.doc:this.root,n=e.kind==="assembly"?".pasm":".pcad",i=((e.name||"Part").replace(/[^\w\- ]+/g,"").trim()||"Part")+n;this.download(i,JSON.stringify(e,null,1),"application/json"),this.dirty=!1,this.toast("Saved "+i+" to your downloads.")}openFile(){let t=document.createElement("input");t.type="file",t.accept=".pcad,.pasm,.json",t.onchange=async()=>{let e=t.files[0];e&&this.openText(e.name,await e.text())},t.click()}openText(t,e){try{let n=JSON.parse(e);if(n&&n.kind==="assembly"&&Array.isArray(n.components)){this.ui.closeModal(),this.openAssembly(n),this.toast("Opened "+t);return}if(!n||!Array.isArray(n.features))throw new Error("This is not a Pathway CAD file");this.mode==="drawing"&&this.closeDrawing(),this.ui.closeModal(),this.setDoc(n),this.toast("Opened "+t)}catch(n){this.toast("Could not open "+t+": "+n.message,"error")}}newFile(){(this.root.features&&this.root.features.length||this.root.components&&this.root.components.length)&&!confirm("Start a new part? Save first if you want to keep this one (File > Save).")||this.setDoc(Bi())}async exportFile(t){if(this.mode==="sketch"&&this.exitSketch(!0),this.mode==="assembly"){if(!this.asm.components.length)return this.toast("Place some parts first.","error");this.toast(`Making the ${t.toUpperCase()} file for the whole assembly\u2026`);let n=He[this.asm.units||"mm"],i=this.asm.components.filter(o=>!o.hidden).map(o=>({id:o.id,part:o.part,pos:o.pos.map(a=>a*n),quat:o.quat})),r=await this.send({type:"exportAsm",format:t,parts:this.asm.parts,comps:i});return r.type==="error"?this.toast("Export failed: "+r.msg,"error"):this.download(`${this.safeName()}.${t==="stl"?"stl":"step"}`,new Blob([r.buf]),"application/octet-stream")}if(!this.vp.desc)return this.toast("There is no part to export yet.","error");this.toast(`Making the ${t.toUpperCase()} file\u2026`);let e=await this.send({type:"export",format:t,doc:this.doc,stopAt:this.doc.rollback??this.doc.features.length});if(e.type==="error")return this.toast("Export failed: "+e.msg,"error");this.download(`${this.safeName()}.${t==="stl"?"stl":"step"}`,new Blob([e.buf]),"application/octet-stream")}screenshot(){let t=this.vp.snapshot(),e=document.createElement("a");e.href=t,e.download=this.safeName()+".png",e.click()}},jy={XY:{origin:[0,0,0],xDir:[1,0,0],normal:[0,0,1]},XZ:{origin:[0,0,0],xDir:[1,0,0],normal:[0,-1,0]},YZ:{origin:[0,0,0],xDir:[0,1,0],normal:[1,0,0]}};function Qy(s){let t=s.normal,e=t[0]*s.center[0]+t[1]*s.center[1]+t[2]*s.center[2],n=t.map(r=>Ye(r*e)),i;if(Math.abs(t[2])>.9)i=[1,0,0];else{i=[-t[1],t[0],0];let r=Math.hypot(i[0],i[1]);i=[i[0]/r,i[1]/r,0]}return{origin:n,xDir:i.map(r=>Ye(r)),normal:t.map(r=>Ye(r)),faceRef:[...s.center.map(Ye),...t.map(Ye)]}}function fi(s,t){if(t&&t.edit){let e=s.featureIndex(t.edit);return{editIndex:e,feature:Nc(s.doc.features[e])}}return{editIndex:null,feature:null}}function pu(s,t){let e=t??s.doc.rollback??s.doc.features.length;return s.doc.features.slice(0,e).filter(n=>n.type==="sketch")}function tx(s,t){let e=t??s.doc.rollback??s.doc.features.length;return s.doc.features.slice(0,e).filter(n=>["extrude","revolve","hole","primitive"].includes(n.type)&&!n.suppressed)}function zi(s,t){let e=t??s.doc.rollback??s.doc.features.length;return s.doc.features.slice(0,e).some(n=>["extrude","revolve","primitive"].includes(n.type)&&!n.suppressed)}var ex={sketch(s){return s.vp.showPlanes(!0),{title:"New Sketch",help:"Click one of the colored origin planes, or a flat face of your part, to draw on it.",want:{faces:!0,planes:!0},fields:()=>[{type:"note",text:"Blue = XY (floor). Green = XZ (front). Red = YZ (side)."}],noOk:!0,onPick(t){if(!t)return;let e;if(t.kind==="plane")e=t.name;else if(t.kind==="face"){if(t.info.type!=="PLANE"){s.toast("That face is curved. Pick a flat face or an origin plane.","error");return}e=Qy(t.info)}else return;let n=e.faceRef;n&&delete e.faceRef;let i={id:s.newId(),type:"sketch",name:s.nextName("sketch"),plane:e,faceRef:n,offset:0,entities:[]};s.closeCmd(),s.change(()=>s.insertFeature(i)),s.enterSketch(i.id,!0)}}},extrude(s,t){let e=fi(s,t),n=pu(s,e.editIndex);if(!n.length)return s.toast("Make a sketch first (Model > Sketch).","error"),null;let i=n.filter(a=>!s.doc.features.some(l=>l.sketch===a.id)),r=zi(s,e.editIndex),o=e.feature||{id:s.newId(),type:"extrude",name:s.nextName("extrude"),sketch:t&&t.sketch||(i[i.length-1]||n[n.length-1]).id,distance:Ve(10,s.units()),extent:"distance",direction:"normal",op:r?"join":"new",taper:0};return{title:e.editIndex!=null?"Edit "+o.name:"Extrude",help:'Pushes a closed sketch shape out into a solid. Use "Remove material" to cut pockets and holes.',feature:o,editIndex:e.editIndex,fields:()=>[{key:"sketch",label:"Sketch",type:"select",options:n.map(a=>[a.id,a.name])},{key:"extent",label:"How far",type:"select",options:[["distance","A distance"],["through","Through everything"]]},o.extent!=="through"&&{key:"distance",label:"Distance (mm)",type:"expr"},{key:"direction",label:"Direction",type:"select",options:[["normal","One way"],["reverse","Other way (flip)"],["both","Both ways (centered)"]]},r?{key:"op",label:"Operation",type:"select",options:Lc}:{type:"note",text:"This is the first solid, so it adds material."},{key:"taper",label:"Taper angle (\xB0)",type:"expr",hint:"0 = straight sides"}].filter(Boolean)}},revolve(s,t){let e=fi(s,t),n=pu(s,e.editIndex);if(!n.length)return s.toast("Make a sketch first (Model > Sketch).","error"),null;let i=n.filter(c=>!s.doc.features.some(h=>h.sketch===c.id)),r=zi(s,e.editIndex),o=t&&t.sketch||(i[i.length-1]||n[n.length-1]).id,a=c=>{let h=s.findFeature(c),d=h&&h.entities.find(u=>u.type==="line"&&u.construction);return d?d.id:"Y"},l=e.feature||{id:s.newId(),type:"revolve",name:s.nextName("revolve"),sketch:o,axis:a(o),angle:360,op:r?"join":"new"};return{title:e.editIndex!=null?"Edit "+l.name:"Revolve",help:"Spins a sketch shape around an axis, like a lathe. Draw a dashed construction line in the sketch to use as the axis.",feature:l,editIndex:e.editIndex,fields:()=>{let c=s.findFeature(l.sketch),h=c?c.entities.filter(d=>d.type==="line"):[];return[{key:"sketch",label:"Sketch",type:"select",options:n.map(d=>[d.id,d.name]),onChange:()=>{l.axis=a(l.sketch)}},{key:"axis",label:"Axis",type:"select",options:[["X","Sketch's horizontal axis"],["Y","Sketch's vertical axis"],...h.map((d,u)=>[d.id,`${d.construction?"Construction line":"Line"} ${u+1} (${gt(+d.x1||0)},${gt(+d.y1||0)} \u2192 ${gt(+d.x2||0)},${gt(+d.y2||0)})`])]},{key:"angle",label:"Angle (\xB0)",type:"expr"},r?{key:"op",label:"Operation",type:"select",options:Lc}:{type:"note",text:"This is the first solid, so it adds material."}]}}},hole(s,t){let e=fi(s,t);if(!zi(s,e.editIndex))return s.toast("Make a solid first, then put holes in it.","error"),null;let n=e.feature||{id:s.newId(),type:"hole",name:s.nextName("hole"),origin:null,normal:null,diameter:Ve(5,s.units()),extent:"through",depth:Ve(10,s.units()),style:"simple",cbDiameter:Ve(9,s.units()),cbDepth:Ve(3,s.units())},i={title:e.editIndex!=null?"Edit "+n.name:"Hole",help:"Click a flat face where the hole should go. Then type exact X, Y, Z numbers if you need to.",feature:e.feature?n:null,draft:n,editIndex:e.editIndex,want:{faces:!0},fields:()=>[n.origin?{type:"xyz",key:"origin",label:"Center (mm)"}:{type:"note",text:"\u{1F449} Click a flat face to place the hole."},{key:"diameter",label:"Diameter (mm)",type:"expr"},{key:"extent",label:"Depth",type:"select",options:[["through","All the way through"],["depth","A set depth"]]},n.extent==="depth"&&{key:"depth",label:"Depth (mm)",type:"expr"},{key:"style",label:"Type",type:"select",options:[["simple","Plain hole"],["counterbore","Counterbore (for bolt heads)"],["countersink","Countersink (for flat screws)"]]},n.style!=="simple"&&{key:"cbDiameter",label:n.style==="counterbore"?"Counterbore diameter":"Countersink diameter",type:"expr"},n.style==="counterbore"&&{key:"cbDepth",label:"Counterbore depth",type:"expr"}].filter(Boolean),onPick(r){if(!(!r||r.kind!=="face")){if(r.info.type!=="PLANE"){s.toast("Holes go on flat faces.","error");return}n.origin=r.point.map(Ye),n.normal=r.info.normal.map(Ye),n.faceRef=[...r.info.center.map(Ye),...n.normal],i.feature=n,s.cmdChanged()}},validate:()=>n.origin?null:"Click a flat face to place the hole first.",highlights:()=>n.origin?[{kind:"point",point:n.origin,color:cn.selEdge}]:[]};return i},primitive(s,t){let e=fi(s,t),n=t&&t.shape||e.feature&&e.feature.shape||"box",i=zi(s,e.editIndex),r=s.units(),o={box:{w:Ve(40,r),d:Ve(30,r),h:Ve(20,r)},cylinder:{diameter:Ve(30,r),h:Ve(40,r),axis:"Z"},sphere:{diameter:Ve(40,r)}},a={box:"Box",cylinder:"Cylinder",sphere:"Sphere"},l=e.feature||{id:s.newId(),type:"primitive",shape:n,name:a[n]+(s.doc.features.filter(c=>c.shape===n).length+1),...o[n],x:0,y:0,z:0,op:i?"join":"new"};return{title:e.editIndex!=null?"Edit "+l.name:a[n],help:n==="box"?"A box sitting on its position point (centered left/right and front/back).":n==="cylinder"?"A cylinder starting at the position point, going along the axis.":"A ball centered on the position point.",feature:l,editIndex:e.editIndex,fields:()=>[n==="box"&&{key:"w",label:"Width X (mm)",type:"expr"},n==="box"&&{key:"d",label:"Depth Y (mm)",type:"expr"},n==="box"&&{key:"h",label:"Height Z (mm)",type:"expr"},n!=="box"&&{key:"diameter",label:"Diameter (mm)",type:"expr"},n==="cylinder"&&{key:"h",label:"Length (mm)",type:"expr"},n==="cylinder"&&{key:"axis",label:"Points along",type:"select",options:Xa},{key:"x",label:"Position X",type:"expr"},{key:"y",label:"Position Y",type:"expr"},{key:"z",label:"Position Z",type:"expr"},i?{key:"op",label:"Operation",type:"select",options:Lc}:null].filter(Boolean)}},fillet(s,t){return mu(s,t,"fillet")},chamfer(s,t){return mu(s,t,"chamfer")},shell(s,t){let e=fi(s,t);if(!zi(s,e.editIndex))return s.toast("Make a solid first.","error"),null;let n=e.feature||{id:s.newId(),type:"shell",name:s.nextName("shell"),thickness:Ve(2,s.units()),faces:[]},i=()=>yu(s.vp.desc&&s.vp.desc.faces,n.faces,"center");return{title:e.editIndex!=null?"Edit "+n.name:"Shell",help:"Hollows out the part, leaving walls of the thickness you choose. Click faces to leave open (like the top of a cup).",feature:n,editIndex:e.editIndex,picksOnBase:!0,preview:!1,want:{faces:!0},fields:()=>[{key:"thickness",label:"Wall thickness (mm)",type:"expr"},{type:"note",text:n.faces.length?`${n.faces.length} open face(s). Click a face again to close it.`:"\u{1F449} Click the flat face(s) to leave open, like the top of a box."},{type:"preview"}],validate:()=>n.faces.length?null:"Click at least one flat face to leave open.",onPick(r){if(!r||r.kind!=="face")return;let o=r.info.center.map(Ye),a=n.faces.findIndex(l=>Is(l,o)<.5);if(a>=0)n.faces.splice(a,1);else if(r.info.type!=="PLANE"){s.toast("Pick a flat face to leave open.","error");return}else n.faces.push([...o,...r.info.normal.map(Ye)]);s.cmdChanged()},highlights:()=>i().map(r=>({kind:"face",index:r,color:cn.selFace}))}},pattern(s,t){let e=fi(s,t),n=t&&t.kind||e.feature&&e.feature.kind||"rect",i=tx(s,e.editIndex);if(!i.length)return s.toast("Make a feature to copy first (an extrusion, revolution, hole or shape).","error"),null;let r=[i[i.length-1].id],o={rect:"Rectangular Pattern",circ:"Circular Pattern",mirror:"Mirror"},a={rect:{d1:"X",n1:3,s1:Ve(20,s.units()),d2:"Y",n2:1,s2:Ve(20,s.units())},circ:{axis:"Z",n:6,angle:360},mirror:{plane:"YZ"}},l=o[n].replace(/ /g,""),c=1;for(;s.doc.features.some(u=>u.name===l+c);)c++;let h=e.feature||{id:s.newId(),type:"pattern",kind:n,name:l+c,features:r,...a[n]},d=i.map(u=>[u.id,u.name]);return{title:e.editIndex!=null?"Edit "+h.name:o[n],help:n==="rect"?"Copies features in rows and columns.":n==="circ"?"Copies features around an axis, like bolt holes on a wheel.":"Makes a mirror copy of features on the other side of a plane.",feature:h,editIndex:e.editIndex,fields:()=>[{key:"features",label:"Features to copy",type:"multi",options:d},...n==="rect"?[{key:"d1",label:"Direction 1",type:"select",options:Xa},{key:"flip1",label:"Flip direction 1",type:"check"},{key:"n1",label:"Count",type:"expr"},{key:"s1",label:"Spacing (mm)",type:"expr"},{key:"d2",label:"Direction 2",type:"select",options:Xa},{key:"flip2",label:"Flip direction 2",type:"check"},{key:"n2",label:"Count",type:"expr"},{key:"s2",label:"Spacing (mm)",type:"expr"}]:n==="circ"?[{key:"axis",label:"Around",type:"select",options:Xa},{key:"n",label:"Count (with the original)",type:"expr"},{key:"angle",label:"Total angle (\xB0)",type:"expr",hint:"360 = all the way around"}]:[{key:"plane",label:"Mirror across",type:"select",options:fu}]],validate:()=>h.features.length?null:"Pick at least one feature to copy."}},mirrorBody(s,t){let e=fi(s,t);if(!zi(s,e.editIndex))return s.toast("Make a solid first.","error"),null;let n=e.feature||{id:s.newId(),type:"mirrorBody",name:s.nextName("mirrorBody"),plane:"YZ"};return{title:e.editIndex!=null?"Edit "+n.name:"Mirror Part",help:"Copies the whole part to the other side of a plane and joins the two halves. Great for symmetric parts: model one half, then mirror.",feature:n,editIndex:e.editIndex,fields:()=>[{key:"plane",label:"Mirror across",type:"select",options:fu}]}},measure(s){let t=[],e="Click a spot on the part, then a second spot. Click a round edge to see its diameter.";return{title:"Measure",help:"Measures straight-line distance between two clicked points. Clicks near a corner snap to it.",want:{faces:!0,edges:!0},noOk:!0,closeLabel:"Done",fields:()=>[{type:"html",html:e}],onPick(i){if(!i)return;let r=s.vp.desc,o=i.point,a="";if(i.kind==="edge"){let l=nx(r,i.index),c=[l[0],l[l.length-1]],h=s.vp.pixelSize()*12,d=c.find(f=>Is(f,o)<h);d&&(o=d);let u=l.reduce((f,p,y)=>y?f+Is(p,l[y-1]):0,0);if(a=`Edge length: <b>${gt(u)} ${s.units()}</b>`,r.edges[i.index].type==="CIRCLE"&&l.length>3){let f=ix(l[0],l[Math.floor(l.length/3)],l[Math.floor(2*l.length/3)]);f&&(a+=`<br>Round edge: <b>\xD8 ${gt(2*f.r)} ${s.units()}</b> (radius ${gt(f.r)})`)}}if(t.length>=2&&(t.length=0),t.push(o.map(Ye)),t.length===1)e=`First point: (${t[0].map(gt).join(", ")})<br>${a}<br>Now click a second point.`;else{let[l,c]=t;e=`Distance: <b class="big">${gt(Is(l,c))} ${s.units()}</b><br>X: ${gt(Math.abs(c[0]-l[0]))} &nbsp; Y: ${gt(Math.abs(c[1]-l[1]))} &nbsp; Z: ${gt(Math.abs(c[2]-l[2]))}<br>${a}<br><span class="muted">Click again to start a new measurement.</span>`}s.ui.refreshCmd(),s.refreshHighlights()},highlights:()=>[...t.map(i=>({kind:"point",point:i,color:cn.selEdge})),...t.length===2?[{kind:"segment",points:t,color:cn.selEdge}]:[]]}},params(s){return s.ui.openParams(),null},info(s){return s.ui.openInfo(),null}};function mu(s,t,e){let n=fi(s,t);if(!zi(s,n.editIndex))return s.toast("Make a solid first.","error"),null;let i=n.feature||{id:s.newId(),type:e,name:s.nextName(e),radius:Ve(e==="fillet"?2:1,s.units()),allEdges:!1,edges:[]},r=()=>yu(s.vp.desc&&s.vp.desc.edges,i.edges,"mid"),o=e==="fillet"?"round":"bevel";return{title:n.editIndex!=null?"Edit "+i.name:e==="fillet"?"Fillet":"Chamfer",help:`Click the edges to ${o}. Click an edge again to un-pick it. Tick "Preview" to see the result.`,feature:i,editIndex:n.editIndex,picksOnBase:!0,preview:!1,want:{edges:!0},fields:()=>[{key:"radius",label:e==="fillet"?"Radius (mm)":"Distance (mm)",type:"expr"},{key:"allEdges",label:"Every edge of the part",type:"check"},!i.allEdges&&{type:"note",text:i.edges.length?`${i.edges.length} edge(s) picked.`:"\u{1F449} Click edges on the part."},{type:"preview"}].filter(Boolean),onPick(a){if(!a||a.kind!=="edge"||i.allEdges)return;let l=s.vp.desc.edges[a.index].mid.map(Ye),c=i.edges.findIndex(h=>Is(h,l)<.5);c>=0?i.edges.splice(c,1):i.edges.push(l),s.cmdChanged()},validate:()=>!i.allEdges&&!i.edges.length?'Pick at least one edge (or tick "Every edge").':null,highlights:()=>i.allEdges?[]:r().map(a=>({kind:"edge",index:a,color:cn.selEdge}))}}function Is(s,t){return Math.hypot(s[0]-t[0],s[1]-t[1],s[2]-t[2])}function yu(s,t,e){if(!s)return[];let n=[];for(let i of t){let r=-1,o=.5;s.forEach((a,l)=>{let c=Is(a[e],i);c<o&&(o=c,r=l)}),r>=0&&n.push(r)}return n}function nx(s,t){let[e,n]=s.edgeGroups[t],i=[];for(let r=e;r<e+n;r++)i.push([s.lines[r*3],s.lines[r*3+1],s.lines[r*3+2]]);return i}function ix(s,t,e){let n=t.map((u,f)=>u-s[f]),i=e.map((u,f)=>u-s[f]),r=[n[1]*i[2]-n[2]*i[1],n[2]*i[0]-n[0]*i[2],n[0]*i[1]-n[1]*i[0]],o=r[0]**2+r[1]**2+r[2]**2;if(o<1e-12)return null;let a=n[0]**2+n[1]**2+n[2]**2,l=i[0]**2+i[1]**2+i[2]**2,c=[r[1]*n[2]-r[2]*n[1],r[2]*n[0]-r[0]*n[2],r[0]*n[1]-r[1]*n[0]],d=[i[1]*r[2]-i[2]*r[1],i[2]*r[0]-i[0]*r[2],i[0]*r[1]-i[1]*r[0]].map((u,f)=>(u*a+c[f]*l)/(2*o));return{r:Math.hypot(...d)}}var Oc=class{constructor(t){this.app=t,this.treeSel=null,this.tab="model",this.infoOpen=!1,At("#tree").addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("click",()=>this.closeMenu()),At("#docName").addEventListener("change",e=>{let n=e.target.value.trim()||"Part1";t.change(()=>{(t.mode==="assembly"?t.asm:t.doc).name=n})})}get vp(){return this.app.vp}ribbonDefs(){let t=this.app;return{file:[["File",[["new","New Part",()=>t.newFile()],["assembly","New Assembly",()=>t.newAssemblyFile()],["open","Open",()=>t.openFile(),"Ctrl+O"],["save","Save",()=>t.saveFile(),"Ctrl+S"],...t.asm&&t.editPid?[["save","Save part only",()=>t.saveFile(!0)]]:[]]],["Export",[["stl","STL (3D print)",()=>t.exportFile("stl")],["stl","STEP (other CAD)",()=>t.exportFile("step")],["camera","Picture",()=>t.screenshot()]]],["Setup",[["units","Units",()=>this.openUnits()]]],["Learn",[["examples","Examples",()=>this.openExamples()],["help","How to",()=>this.openHelp()]]]],model:[...t.asm&&t.editPid?[["Assembly",[["back","Back to assembly",()=>t.returnToAssembly()]]]]:[],["Sketch",[["sketch","Sketch",()=>t.run("sketch"),"S"]]],["Create",[["extrude","Extrude",()=>t.run("extrude"),"E"],["revolve","Revolve",()=>t.run("revolve"),"R"],["hole","Hole",()=>t.run("hole"),"H"]]],["Shapes",[["box","Box",()=>t.run("primitive",{shape:"box"})],["cylinder","Cylinder",()=>t.run("primitive",{shape:"cylinder"})],["sphere","Sphere",()=>t.run("primitive",{shape:"sphere"})]]],["Modify",[["fillet","Fillet",()=>t.run("fillet"),"F"],["chamfer","Chamfer",()=>t.run("chamfer")],["shell","Shell",()=>t.run("shell")]]],["Pattern",[["rectPattern","Rectangular",()=>t.run("pattern",{kind:"rect"})],["circPattern","Circular",()=>t.run("pattern",{kind:"circ"})],["mirror","Mirror",()=>t.run("pattern",{kind:"mirror"})],["mirrorBody","Mirror Part",()=>t.run("mirrorBody")]]],["Setup",[["params","Parameters",()=>this.openParams()]]],["Document",[["drawing","Drawing",()=>t.openDrawing()]]]],drawing:[["Annotate",[["select","Select",()=>t.drw.setTool("select"),"S"],["g:\u2194","Size",()=>t.drw.setTool("dim"),"D"],["g:A","Note",()=>t.drw.setTool("note"),"N"],["trash","Delete",()=>t.drw.deleteSel(),"Del"]]],["Output",[["open","Print / PDF",()=>t.drw.print()],["stl","Save SVG",()=>t.drw.saveSvg()]]],["Exit",[["back","Close drawing",()=>t.closeDrawing()]]]],sketch:[["Draw",[["line","Line",()=>t.sk.setTool("line"),"L"],["rect","Rectangle",()=>t.sk.setTool("rect"),"R"],["circle","Circle",()=>t.sk.setTool("circle"),"C"],["arc","Arc",()=>t.sk.setTool("arc"),"A"],["polygon","Polygon",()=>t.sk.setTool("polygon"),"P"],["slot","Slot",()=>t.sk.setTool("slot"),"O"]]],["Edit",[["select","Select",()=>t.sk.setTool("select"),"S"],["construction","Construction",()=>t.sk.toggleConstruction(),"X"],["trash","Delete",()=>t.sk.deleteSelected(),"Del"]]],["Rules",[...["coincident","horizontal","vertical","parallel","perpendicular","equal","tangent","concentric","midpoint","fix"].map(e=>["g:"+ze[e].glyph,ze[e].label,()=>t.sk.setTool("c:"+e)]),["g:A","Auto rules",()=>{t.sk.autoCons=!t.sk.autoCons,this.renderRibbon(),t.toast(t.sk.autoCons?"Auto rules on: joined ends, level and upright lines get rules while you draw.":"Auto rules off.")}],["eye","Show rules",()=>{t.sk.showCons=!t.sk.showCons,this.renderRibbon(),t.sk.redraw()}]]],["View",[["look","Look at",()=>t.sk.lookAt()],["grid","Snap to grid",()=>t.toggleGrid(),"G"]]],["Setup",[["params","Parameters",()=>this.openParams()]]],["Exit",[["finish","Finish Sketch",()=>t.exitSketch()]]]],inspect:t.mode==="assembly"?[["Measure",[["measure","Measure",()=>t.run("measure"),"M"]]],["Check",[["clash","Interference",()=>t.asmr.checkInterference()],["bom","Parts list",()=>t.asmr.openPartsList()]]]]:[["Measure",[["measure","Measure",()=>t.run("measure"),"M"],["info","Part Info",()=>this.openInfo()]]]],assemble:[["Parts",[["place","Place",()=>t.run("place"),"P"],["move","Move / Turn",()=>t.run("moveComp"),"G"]]],["Constrain",[["mate","Mate",()=>t.run("constrain",{type:"mate"}),"C"],["flush","Flush",()=>t.run("constrain",{type:"flush"})],["insert","Insert",()=>t.run("constrain",{type:"insert"})],["axisMate","Axis",()=>t.run("constrain",{type:"axis"})],["angleMate","Angle",()=>t.run("constrain",{type:"angle"})]]],["Check",[["clash","Interference",()=>t.asmr.checkInterference()],["bom","Parts list",()=>t.asmr.openPartsList()]]],["Document",[["drawing","Drawing",()=>t.openDrawing()]]]],view:[["Orientation",[["home","Home",()=>this.vp.setView("home"),"F6"],["front","Front",()=>this.vp.setView("front")],["top","Top",()=>this.vp.setView("top")],["right","Right",()=>this.vp.setView("right")],["fit","Zoom all",()=>this.vp.fit()]]],["Style",[["shaded","Shaded",()=>this.setStyle("shaded")],["edges","With edges",()=>this.setStyle("edges")],["wire","Wireframe",()=>this.setStyle("wire")]]],["Show",[["planes","Origin planes",()=>this.vp.showPlanes(!this.vp.planesVisible)]]],["Picture",[["camera","Save picture",()=>this.app.screenshot()]]]]}}setStyle(t){this.vp.applyStyle(t),this.renderRibbon()}renderRibbon(){let t=this.app.mode,e=t==="drawing"?[["drawing","Drawing"]]:t==="sketch"?[["sketch","Sketch"],["inspect","Inspect"],["view","View"]]:t==="assembly"?[["file","File"],["assemble","Assemble"],["inspect","Inspect"],["view","View"]]:[["file","File"],["model","Model"],["inspect","Inspect"],["view","View"]];e.some(r=>r[0]===this.tab)||(this.tab=e[0][0]==="file"?e[1][0]:e[0][0]),At("#tabs").innerHTML=e.map(([r,o])=>`<button class="tab ${r===this.tab?"on":""} ${r==="sketch"?"sketchtab":""}" data-tab="${r}">${o}</button>`).join("")+`<span class="spacer"></span><button class="tb-btn" id="undoBtn" title="Undo (Ctrl+Z)">${$t("undo",18)}</button><button class="tb-btn" id="redoBtn" title="Redo (Ctrl+Y)">${$t("redo",18)}</button><button class="tb-btn" id="helpBtn" title="How to use Pathway CAD">${$t("help",18)}</button>`;for(let r of document.querySelectorAll("#tabs .tab"))r.onclick=()=>{this.tab=r.dataset.tab,this.renderRibbon()};At("#undoBtn").onclick=()=>this.app.undo(),At("#redoBtn").onclick=()=>this.app.redo(),At("#helpBtn").onclick=()=>this.openHelp();let n=this.ribbonDefs()[this.tab],i=At("#ribbon");i.innerHTML="";for(let[r,o]of n){let a=document.createElement("div"),l=r==="Rules";a.className="rgroup"+(r==="Exit"?" exit":"")+(r==="Assembly"?" back":"")+(l?" compact":"");let c=document.createElement("div");c.className="rbtns";for(let[d,u,f,p]of o){let y=document.createElement("button");y.className="rbtn",y.dataset.ic=d,y.innerHTML=$t(d,l?17:26)+`<span>${St(u)}</span>`,y.title=u+(p?` (${p})`:""),y.onclick=g=>{g.stopPropagation(),f()},this.tab==="view"&&["shaded","edges","wire"].includes(d)&&this.vp&&this.vp.style===d&&y.classList.add("on"),c.appendChild(y)}a.appendChild(c);let h=document.createElement("div");h.className="rcap",h.textContent=r,a.appendChild(h),i.appendChild(a)}if(this.app.mode==="sketch"&&this.sketchToolChanged(this.app.sk.tool),this.app.mode==="drawing"){let r=this.app.drw.tool;for(let o of document.querySelectorAll("#ribbon .rbtn"))o.classList.toggle("on",r==="select"&&o.dataset.ic==="select"||r==="dim"&&o.dataset.ic==="g:\u2194"||r==="note"&&o.dataset.ic==="g:A")}}sketchToolChanged(t){for(let e of document.querySelectorAll("#ribbon .rbtn")){let n=e.dataset.ic,i=this.app.sk,r=t&&t.startsWith("c:")&&n==="g:"+(ze[t.slice(2)]||{}).glyph;e.classList.toggle("on",n===t||r||n==="grid"&&i&&i.gridOn||n==="g:A"&&i&&i.autoCons||n==="eye"&&i&&i.showCons)}this.app.mode==="sketch"&&this.renderSketchPanel()}renderTitle(){let t=At("#docName"),e=this.app.mode==="assembly"?this.app.asm:this.app.doc;document.activeElement!==t&&(t.value=e.name||"Part1"),document.title=`${e.name||"Part"} - Pathway CAD`}renderTree(){let t=this.app,e=t.doc;if(t.mode==="assembly"){t.asmr.renderTree(At("#tree"));return}if(t.mode==="drawing"){let u=t.drawTarget(),f=u.drawing||{},p=Object.entries(f.views||{}).filter(([,y])=>y).map(([y])=>y);At("#tree").innerHTML=`<div class="trow backrow" data-act="closedraw">${$t("back",16)}<span>Back to ${St(u.name)}</span></div><div class="trow root">${$t("drawing",16)}<b>${St(u.name)} drawing</b></div>${p.map(y=>`<div class="trow sub">${$t("front",16)}<span>${y[0].toUpperCase()+y.slice(1)} view</span></div>`).join("")}<div class="trow sub">${$t("g:\u2194",16)}<span>${(f.dims||[]).length} sizes you added</span></div><div class="trow sub">${$t("g:A",16)}<span>${(f.notes||[]).length} notes</span></div>`,At("#tree [data-act=closedraw]").onclick=()=>t.closeDrawing();return}let n=t.result.errors||{},i=t.result.warnings||{},r=e.rollback??e.features.length,o=t.asm&&t.editPid?`<div class="trow backrow" data-act="back">${$t("back",16)}<span>Back to ${St(t.asm.name)}</span></div>`:"";o+=`<div class="trow root">${$t("part",16)}<b>${St(e.name||"Part1")}</b></div>`,o+=`<div class="trow sub" data-act="origin">${$t("origin",16)}<span>Origin</span><span class="tmeta">${t.vp&&t.vp.planesVisible?"shown":""}</span></div>`;let a=`<div class="trow endrow" data-act="end" title="Features below this line are switched off. Drag it with the menu on a feature: 'Roll back to here'.">${$t("end",16)}<span>End of Part</span>${e.rollback!=null?'<button class="mini" data-act="toend">move to end</button>':""}</div>`;e.features.forEach((u,f)=>{f===r&&(o+=a);let p=Uc[u.type]||Uc.primitive,y=u.type==="primitive"?u.shape==="sphere"?"sphere":u.shape==="cylinder"?"cylinder":"box":u.type==="pattern"?u.kind==="circ"?"circPattern":u.kind==="mirror"?"mirror":"rectPattern":p.icon,g=u.type==="sketch"&&e.features.some(_=>_.sketch===u.id),m=n[u.id],w=i[u.id],b=["trow","feat",f>=r?"after":"",u.suppressed?"supp":"",this.treeSel===u.id?"sel":"",m?"bad":"",t.mode==="sketch"&&t.sketchId===u.id?"editing":"",g?"consumed":""].join(" ");o+=`<div class="${b}" data-id="${u.id}" title="${St(m||w||"Double-click to edit. Right-click for more.")}">${$t(y,16)}<span class="tname">${St(u.name)}</span>${m?`<span class="tbad">${$t("err",14)}</span>`:w?`<span class="twarn">${$t("warn",14)}</span>`:""}</div>`}),r>=e.features.length&&(o+=a),e.features.length||(o+='<div class="tempty">Start with <b>Sketch</b> (or a Box) on the Model tab.</div>');let l=At("#tree");l.innerHTML=o;for(let u of l.querySelectorAll(".feat")){let f=u.dataset.id;u.onclick=p=>{p.stopPropagation(),this.treeSel=f,this.renderTree(),this.showFeatureError(f)},u.ondblclick=p=>{p.stopPropagation(),t.mode!=="sketch"&&t.editFeature(f)},u.oncontextmenu=p=>{p.preventDefault(),p.stopPropagation(),this.treeSel=f,this.renderTree(),this.featureMenu(f,p.clientX,p.clientY)}}let c=l.querySelector("[data-act=origin]");c&&(c.onclick=()=>{this.vp.showPlanes(!this.vp.planesVisible),this.renderTree()});let h=l.querySelector("[data-act=back]");h&&(h.onclick=()=>t.returnToAssembly());let d=l.querySelector("[data-act=toend]");d&&(d.onclick=u=>{u.stopPropagation(),t.change(()=>{t.doc.rollback=null})})}showFeatureError(t){let e=(this.app.result.errors||{})[t],n=(this.app.result.warnings||{})[t];e?this.toast(e,"error"):n&&this.toast(n,"warn")}featureMenu(t,e,n){let i=this.app,r=i.findFeature(t),o=i.featureIndex(t),a=[];i.mode!=="sketch"&&(a.push([r.type==="sketch"?"Edit sketch":"Edit",()=>i.editFeature(t)]),r.sketch&&a.push(["Edit its sketch",()=>i.enterSketch(r.sketch)])),a.push(["Rename",()=>this.askText("Rename",r.name,l=>i.change(()=>{i.findFeature(t).name=l}))]),i.mode!=="sketch"&&(a.push([r.suppressed?"Turn on (unsuppress)":"Turn off (suppress)",()=>i.change(()=>{let l=i.findFeature(t);l.suppressed=!l.suppressed})]),a.push(["Roll back to here",()=>i.change(()=>{i.doc.rollback=o})]),o>0&&a.push(["Move up",()=>i.change(()=>{let l=i.doc.features;if(gu(l[o],l[o-1])){i.toast(`${l[o].name} uses ${l[o-1].name}, so it must stay below it.`,"error");return}[l[o-1],l[o]]=[l[o],l[o-1]]})]),o<i.doc.features.length-1&&a.push(["Move down",()=>i.change(()=>{let l=i.doc.features;if(gu(l[o+1],l[o])){i.toast(`${l[o+1].name} uses ${l[o].name}, so it must stay below it.`,"error");return}[l[o+1],l[o]]=[l[o],l[o+1]]})]),a.push(["Delete",()=>i.deleteFeature(t),"danger"])),this.menu(a,e,n)}menu(t,e,n){this.closeMenu();let i=document.createElement("div");i.className="ctxmenu";for(let[o,a,l]of t){let c=document.createElement("button");c.textContent=o,l&&(c.className=l),c.onclick=h=>{h.stopPropagation(),this.closeMenu(),a()},i.appendChild(c)}document.body.appendChild(i);let r=i.getBoundingClientRect();i.style.left=Math.min(e,innerWidth-r.width-8)+"px",i.style.top=Math.min(n,innerHeight-r.height-8)+"px",this.menuEl=i}closeMenu(){this.menuEl&&(this.menuEl.remove(),this.menuEl=null)}openCmd(t){this.cmdEl=At("#cmdPanel"),this.cmdEl.hidden=!1,this.refreshCmd(),this.status(t.help)}closeCmd(){let t=At("#cmdPanel");t.hidden=!0,t.innerHTML=""}cmdError(t){let e=At("#cmdPanel .cmderr");e&&(e.hidden=!t,e.textContent=t?"\u26A0 "+t:"")}refreshCmd(){let t=this.app,e=t.cmd;if(!e)return;let n=At("#cmdPanel"),i=e.target||e.feature||e.draft||{},r=t.params(),o=`<div class="cmdhead"><span>${St(e.title)}</span><button class="x" data-act="cancel" title="Cancel (Esc)">\xD7</button></div><div class="cmdhelp">${St(e.help)}</div><div class="cmdbody">`,a=t.units(),l=(e.fields?e.fields():[]).map(u=>u&&u.label&&a!=="mm"?{...u,label:u.label.replace("(mm)",`(${a})`)}:u);l.forEach((u,f)=>{if(u.type==="note")o+=`<div class="note">${St(u.text)}</div>`;else if(u.type==="html")o+=`<div class="note">${u.html}</div>`;else if(u.type==="preview")o+=`<label class="chk"><input type="checkbox" data-preview ${e.preview?"checked":""}> Preview the result</label>`;else if(u.type==="expr"){let p=hn(i[u.key],r),y=p.ok?String(i[u.key]).trim()===gt(p.v)?"":"= "+gt(p.v):p.err;o+=`<label class="fld"><span>${St(u.label)}</span><input data-i="${f}" value="${St(i[u.key]??"")}" spellcheck="false" autocomplete="off"><em class="${p.ok?"":"bad"}">${St(y)}${u.hint&&p.ok?`<i>${St(u.hint)}</i>`:""}</em></label>`}else if(u.type==="select")o+=`<label class="fld"><span>${St(u.label)}</span><select data-i="${f}">${u.options.map(([p,y])=>`<option value="${St(p)}" ${String(i[u.key])===String(p)?"selected":""}>${St(y)}</option>`).join("")}</select></label>`;else if(u.type==="check")o+=`<label class="chk"><input type="checkbox" data-i="${f}" ${i[u.key]?"checked":""}> ${St(u.label)}</label>`;else if(u.type==="multi"){let p=new Set(i[u.key]||[]);o+=`<div class="fld"><span>${St(u.label)}</span><div class="multi">${u.options.map(([y,g])=>`<label class="chk"><input type="checkbox" data-i="${f}" data-v="${St(y)}" ${p.has(y)?"checked":""}> ${St(g)}</label>`).join("")}</div></div>`}else if(u.type==="buttons")o+=`<div class="fld">${u.label?`<span>${St(u.label)}</span>`:""}<div class="btnrow">${u.items.map(([p],y)=>`<button data-b="${f}:${y}">${St(p)}</button>`).join("")}</div></div>`;else if(u.type==="xyz"){let p=i[u.key]||[0,0,0];o+=`<div class="fld"><span>${St(u.label)}</span><div class="xyz">${["X","Y","Z"].map((y,g)=>`<label>${y}<input data-i="${f}" data-k="${g}" value="${gt(p[g])}"></label>`).join("")}</div></div>`}}),o+=`</div><div class="cmderr" hidden></div><div class="cmdfoot">${e.noOk?"":'<button class="ok" data-act="ok">OK</button>'}<button data-act="cancel">${St(e.closeLabel||"Cancel")}</button></div>`;let c=document.activeElement&&n.contains(document.activeElement)?document.activeElement.dataset.i:null;n.innerHTML=o,n.querySelectorAll("[data-act=cancel]").forEach(u=>u.onclick=()=>t.cancelCmd());let h=n.querySelector("[data-act=ok]");h&&(h.onclick=()=>t.okCmd());for(let u of n.querySelectorAll("[data-b]")){let[f,p]=u.dataset.b.split(":").map(Number);u.onclick=()=>l[f].items[p][1]()}let d=n.querySelector("[data-preview]");d&&(d.onchange=()=>{e.preview=d.checked,t.hoverPick=null,t.cmdChanged()});for(let u of n.querySelectorAll("[data-i]")){let f=l[+u.dataset.i],p=()=>{if(f.type==="expr")i[f.key]=Cr(u.value);else if(f.type==="select")i[f.key]=u.value;else if(f.type==="check")i[f.key]=u.checked;else if(f.type==="multi"){let y=new Set(i[f.key]||[]);u.checked?y.add(u.dataset.v):y.delete(u.dataset.v),i[f.key]=f.options.map(g=>g[0]).filter(g=>y.has(g))}else if(f.type==="xyz"){let y=hn(u.value,r);if(!y.ok)return;i[f.key]=[...i[f.key]||[0,0,0]],i[f.key][+u.dataset.k]=Ye(y.v)}if(f.onChange&&f.onChange(),f.type==="expr"){let y=hn(i[f.key],r),g=u.nextElementSibling;if(g.className=y.ok?"":"bad",g.textContent=y.ok?String(i[f.key]).trim()===gt(y.v)?"":"= "+gt(y.v):y.err,e.onField){y.ok&&e.onField(f);return}t.refreshHighlights(),t.rebuild()}else e.onField&&e.onField(f),t.cmdChanged()};u.addEventListener(f.type==="expr"?"input":"change",p),f.type==="xyz"&&u.addEventListener("change",()=>t.cmdChanged())}if(c!=null){let u=n.querySelector(`[data-i="${c}"]`);u&&u.focus()}else{let u=n.querySelector("input[data-i]:not([type=checkbox])");u&&!t.cmd.want&&(u.focus(),u.select())}}enterSketch(){this.tab="sketch",this.renderRibbon(),document.body.classList.add("sketching"),At("#sketchPanel").hidden=!1,this.renderSketchPanel(),this.renderTree()}exitSketch(){document.body.classList.remove("sketching"),At("#sketchPanel").hidden=!0,this.tab="model",this.renderRibbon(),this.renderTree()}sketchSelection(){this.renderSketchPanel()}sketchInfo(t){let e=At("#sketchStats");if(!e)return;let n=(t.loops||[]).filter(l=>l.depth%2===0).length,i=(t.evals||[]).filter(l=>l.err),r=this.app.sketchFeature(),o=r&&r.constraints?r.constraints.length:0,a=t.badCons?t.badCons.size:0;e.innerHTML=`${n?`<span class="good">\u2714 ${n} closed shape${n>1?"s":""}</span>`:'<span class="muted">No closed shape yet</span>'}${t.openEnds?` \xB7 <span class="bad">${t.openEnds} open chain${t.openEnds>1?"s":""} (red dots)</span>`:""}${i.length?` \xB7 <span class="bad">${St(i[0].err)}</span>`:""}${o?` \xB7 ${o} rule${o>1?"s":""}`:""}${a?` \xB7 <span class="bad">${a} not met</span>`:""}`}setGridStep(t){let e=At("#gridStep");e&&(e.textContent=this.app.sk.gridOn?`grid ${gt(t)} ${this.app.units()}`:"grid off")}renderSketchPanel(){let t=this.app,e=t.sk,n=t.sketchFeature();if(!n)return;let i=t.params(),r=n.entities.filter(p=>e.sel.has(p.id)),o=`<div class="cmdhead"><span>${St(n.name)}</span></div>`;if(o+='<div class="note" id="sketchStats"></div>',o+='<div class="cmdbody">',e.tool==="polygon"&&(o+=`<label class="fld"><span>Polygon sides</span><input id="polySides" type="number" min="3" max="64" value="${e.polySides}"></label>`),r.length===1){let p=r[0],y={line:[["x1","Start X"],["y1","Start Y"],["x2","End X"],["y2","End Y"]],rect:[["x","Corner X"],["y","Corner Y"],["w","Width"],["h","Height"]],circle:[["cx","Center X"],["cy","Center Y"],["r","Radius"]],arc:[["x1","Start X"],["y1","Start Y"],["x2","End X"],["y2","End Y"],["xm","Through X"],["ym","Through Y"]],polygon:[["cx","Center X"],["cy","Center Y"],["r","Corner radius"],["n","Sides"],["rot","Turn (\xB0)"]],slot:[["x1","End 1 X"],["y1","End 1 Y"],["x2","End 2 X"],["y2","End 2 Y"],["w","Width"]]}[p.type]||[];o+=`<div class="subhead">${{line:"Line",rect:"Rectangle",circle:"Circle",arc:"Arc",polygon:"Polygon",slot:"Slot"}[p.type]}${p.construction?" (construction)":""}</div>`;for(let[w,b]of y){let _=hn(p[w],i);o+=`<label class="fld"><span>${b}</span><input data-k="${w}" value="${St(p[w])}" spellcheck="false"><em class="${_.ok?"":"bad"}">${_.ok?String(p[w]).trim()===gt(_.v)?"":"= "+gt(_.v):St(_.err)}</em></label>`}o+=`<label class="chk"><input type="checkbox" id="consChk" ${p.construction?"checked":""}> Construction (dashed helper line, not part of the shape)</label>`;let m=e.consFor(p.id);m.length&&(o+=`<div class="fld"><span>Rules on it</span><div class="rulelist">${m.map(w=>`<span class="rule ${e.badCons&&e.badCons.has(w.id)?"bad":""}">${St(e.consLabel(w))}<button data-delcons="${w.id}" title="Remove this rule">\xD7</button></span>`).join("")}</div></div>`)}else r.length>1?o+=`<div class="note">${r.length} items picked. Press Delete to remove them, or X for construction.</div>`:e.selCons.size?o+=`<div class="note">${[...e.selCons].map(p=>{let y=(n.constraints||[]).find(g=>g.id===p);return y?St(e.consLabel(y)):""}).join(", ")} rule picked. Press Delete to remove it.</div>`:o+=`<div class="note muted">${St(sx[e.tool]||(e.tool.startsWith("c:")?ze[e.tool.slice(2)].label+": "+ze[e.tool.slice(2)].help+(e.picks.length?" (1 picked)":""):""))}</div>`;let a=n.offset??0,l=hn(a,i);o+=`<details class="planeopts"><summary>Sketch plane</summary><label class="fld"><span>Offset from plane (${t.units()})</span><input id="planeOff" value="${St(a)}"><em class="${l.ok?"":"bad"}">${l.ok?"":St(l.err)}</em></label></details>`,o+=`</div><div class="cmdfoot"><span id="gridStep" class="muted"></span><button class="ok" id="finishBtn">${$t("finish",16)} Finish Sketch</button></div>`;let c=At("#sketchPanel"),h=document.activeElement&&c.contains(document.activeElement)?document.activeElement.dataset.k:null;c.innerHTML=o;for(let p of c.querySelectorAll("[data-delcons]"))p.onclick=()=>e.deleteConstraints(new Set([p.dataset.delcons]));this.sketchInfo(e),this.setGridStep(e.gridStep()),At("#finishBtn").onclick=()=>t.exitSketch();let d=At("#polySides");d&&(d.onchange=()=>{e.polySides=Math.max(3,Math.min(64,Math.round(+d.value||6)))});let u=At("#consChk");u&&(u.onchange=()=>e.toggleConstruction());let f=At("#planeOff");f.onchange=()=>{let p=hn(f.value,i);if(!p.ok)return this.toast(p.err,"error");t.change(()=>{t.sketchFeature().offset=Cr(f.value)});let y=t.sketchId,g=t.sketchIsNew,m=t.savedCam;t.exitSketch(!0),t.enterSketch(y,g),t.savedCam=m};for(let p of c.querySelectorAll("input[data-k]"))p.addEventListener("change",()=>{let y=r[0],g=hn(p.value,i);if(!g.ok){this.toast(g.err,"error");return}let m=p.dataset.k,w=[hn(y[m==="y1"?"x1":m==="y2"?"x2":m],i).v,hn(y[m==="x1"?"y1":m==="x2"?"y2":m],i).v];t.change(()=>{let b=t.sketchFeature().entities.find(_=>_.id===y.id);if(["x1","y1","x2","y2"].includes(m)&&(y.type==="line"||y.type==="arc")){let _=m[1],T=e.coincident(w,{e:b,kx:"x"+_});b[m]=Cr(p.value);let E=hn(b["x"+_],i).v,C=hn(b["y"+_],i).v;for(let D of T)D.e[D.kx]=Ye(E),D.e[D.ky]=Ye(C)}else b[m]=Cr(p.value)}),e.recompute(),e.redraw(),this.renderSketchPanel()});if(h){let p=c.querySelector(`[data-k="${h}"]`);p&&p.focus()}}openParams(){let t=this.app,e=()=>{let n=t.params(),i=t.doc.params.map((r,o)=>{let a=hn(r.expr,n);return`<tr><td><input data-i="${o}" data-f="name" value="${St(r.name)}" spellcheck="false"></td><td><input data-i="${o}" data-f="expr" value="${St(r.expr)}" spellcheck="false"></td><td class="${a.ok?"":"bad"}">${a.ok?gt(a.v):St(a.err)}</td><td><input data-i="${o}" data-f="note" value="${St(r.note||"")}" placeholder="what it is for"></td><td><button class="mini danger" data-del="${o}">\u2715</button></td></tr>`}).join("");this.modal(`<h2>${$t("params",22)} Parameters</h2>
        <p>Name a size once and use the name anywhere you type a number, like <code>width</code> or <code>width/2 + 3</code>. Change it here and the whole part updates.</p>
        <table class="ptable"><thead><tr><th>Name</th><th>Value or formula</th><th>=</th><th>Note</th><th></th></tr></thead><tbody>${i||'<tr><td colspan="5" class="muted">No parameters yet.</td></tr>'}</tbody></table>
        <p><button id="addParam">+ Add parameter</button></p>
        <p class="muted">Formulas can use + \u2212 \xD7 \xF7 (written * and /), ^ for powers, brackets, other parameter names, pi, sqrt(), sin(), cos(), tan() (in degrees), min(), max(), round().</p>`,"wide"),At("#addParam").onclick=()=>{let r=1;for(;t.doc.params.some(o=>o.name==="size"+r);)r++;t.change(()=>t.doc.params.push({name:"size"+r,expr:"10",note:""})),e()};for(let r of document.querySelectorAll("#modal [data-del]"))r.onclick=()=>{let o=t.doc.params[+r.dataset.del];JSON.stringify(t.doc.features).match(new RegExp(`\\b${o.name}\\b`))&&!confirm(`"${o.name}" is used in the part. Delete it anyway? (Those features will show an error.)`)||(t.change(()=>t.doc.params.splice(+r.dataset.del,1)),e())};for(let r of document.querySelectorAll("#modal input[data-i]"))r.onchange=()=>{let o=+r.dataset.i,a=r.dataset.f,l=r.value.trim();if(a==="name"){if(!/^[A-Za-z_][A-Za-z_0-9]*$/.test(l)){this.toast("Names use letters, numbers and _ and start with a letter.","error"),e();return}if(["pi","PI","sin","cos","tan","sqrt","abs","min","max","round","floor","ceil"].includes(l)){this.toast(`"${l}" is a built-in name. Pick another.`,"error"),e();return}if(t.doc.params.some((d,u)=>u!==o&&d.name===l)){this.toast("That name is taken.","error"),e();return}let c=t.doc.params[o].name,h=c&&c!==l&&confirm(`Also change "${c}" to "${l}" everywhere it is used?`);t.change(()=>{if(t.doc.params[o].name=l,h){let d=new RegExp(`\\b${c}\\b`,"g"),u=f=>{for(let p in f)typeof f[p]=="string"&&p!=="id"&&p!=="name"&&p!=="type"?f[p]=f[p].replace(d,l):f[p]&&typeof f[p]=="object"&&u(f[p])};u(t.doc.features);for(let f of t.doc.params)f.expr=String(f.expr).replace(d,l)}})}else t.change(()=>{t.doc.params[o][a]=a==="expr"?Cr(l):l});e(),t.mode==="sketch"&&t.sk.redraw(),t.cmd&&this.refreshCmd()}};e()}openUnits(){let t=this.app,e=t.mode==="assembly",n=e?t.asm:t.doc,i=n.units||"mm",r=e?new Set:au(n),o=e?[]:n.params;this.modal(`<h2>${$t("units",22)} Units for ${St(n.name)}</h2>
      <p>${e?"Positions and gaps in this assembly use these units. Each part keeps its own units and is sized correctly when placed.":"Every size you type in this part uses these units. Exported STL and STEP files are always in millimetres, which is what 3D printers and other CAD programs expect."}</p>
      ${Object.entries(Ac).map(([a,l])=>`<label class="chk"><input type="radio" name="un" value="${a}" ${a===i?"checked":""}> ${l}</label>`).join("")}
      <label class="chk"><input type="checkbox" id="unConv" checked> Convert the sizes so the ${e?"assembly":"part"} stays the same real size</label>
      ${o.length?`<div class="fld" id="unParams"><span>Parameters to convert (tick the ones that are lengths)</span><div class="multi">${o.map(a=>`<label class="chk"><input type="checkbox" data-p="${St(a.name)}" ${r.has(a.name)?"checked":""}> ${St(a.name)} = ${St(a.expr)}</label>`).join("")}</div></div>`:""}
      <p class="muted">Untick "Convert" to keep the numbers as they are (a 10 mm block becomes a 10 in block).</p>
      <div class="welcomebtns"><button class="ok" id="unOk">Apply</button><button id="unNo">Cancel</button></div>`),At("#unNo").onclick=()=>this.closeModal(),At("#unOk").onclick=()=>{let a=document.querySelector("#modal input[name=un]:checked").value,l=At("#unConv").checked,c=new Set([...document.querySelectorAll("#modal [data-p]")].filter(d=>d.checked).map(d=>d.dataset.p));if(this.closeModal(),a===i)return;let h=0;t.change(()=>{if(n.units=a,!l)return;let d=He[i]/He[a];e?cu(n,d):h=lu(n,d,c)}),t.mode==="sketch"&&(t.sk.recompute(),t.sk.redraw()),this.renderStatusInfo(),this.toast(`Now using ${Ac[a]}.`+(h?` ${h} formula(s) with numbers in them were left as typed; check them.`:""),h?"warn":"")}}openInfo(){this.infoOpen=!0,this.renderInfo()}renderInfo(){let t=this.app,e=t.result.desc,n=t.doc,i=qa[n.material]||qa.pla,r='<p class="muted">There is no solid yet.</p>';if(e){let o=e.bb[1].map((u,f)=>u-e.bb[0][f]),a=n.units||"mm",l=He[a],c=e.volume*l*l*l,h=e.area*l*l,d=c/1e3*i.density;r=`<table class="info">
        <tr><th>Size (X \xD7 Y \xD7 Z)</th><td>${o.map(gt).join(" \xD7 ")} ${a}</td></tr>
        <tr><th>Volume</th><td>${a==="in"?`${gt(e.volume)} in\xB3 <span class="muted">(${gt(c/1e3)} cm\xB3)</span>`:`${gt(c/1e3)} cm\xB3 <span class="muted">(${gt(c)} mm\xB3)</span>`}</td></tr>
        <tr><th>Surface area</th><td>${a==="in"?`${gt(e.area)} in\xB2 <span class="muted">(${gt(h/100)} cm\xB2)</span>`:`${gt(h/100)} cm\xB2 <span class="muted">(${gt(h)} mm\xB2)</span>`}</td></tr>
        <tr><th>Mass in ${St(i.name)}</th><td><b>${d>=1e3?gt(d/1e3)+" kg":gt(d)+" g"}</b> <span class="muted">(${gt(d/453.592)} lb \xB7 density ${i.density} g/cm\xB3)</span></td></tr>
        <tr><th>Faces / edges</th><td>${e.faces.length} / ${e.edges.length}</td></tr>
      </table>`}this.modal(`<h2>${$t("info",22)} Part Info: ${St(n.name)}</h2>${r}
      <label class="fld"><span>Material</span><select id="matSel">${Object.entries(qa).map(([o,a])=>`<option value="${o}" ${o===n.material?"selected":""}>${St(a.name)}</option>`).join("")}</select></label>
      <label class="fld"><span>Color on screen</span><input type="color" id="colorSel" value="${St(n.color)}"></label>`,"",()=>{this.infoOpen=!1}),At("#matSel").onchange=o=>{t.change(()=>{t.doc.material=o.target.value}),this.renderInfo()},At("#colorSel").oninput=o=>{t.doc.color=o.target.value,this.vp.setColor(o.target.value)},At("#colorSel").onchange=o=>t.change(()=>{t.doc.color=o.target.value})}renderDrawPanel(){let t=this.app,e=t.drw;if(t.mode!=="drawing")return;let n=t.drawTarget(),i=n.drawing,r=At("#cmdPanel");r.hidden=!1;let o=(c,h,d)=>`<select data-dk="${c}">${h.map(([u,f])=>`<option value="${St(u)}" ${String(d)===String(u)?"selected":""}>${St(f)}</option>`).join("")}</select>`,a=[["auto","Fit the sheet"+(e.L?` (now ${e.L.scale>=1?gt(e.L.scale)+":1":"1:"+gt(1/e.L.scale)})`:"")],[5,"5:1"],[2,"2:1"],[1,"1:1"],[.5,"1:2"],[.25,"1:4"],[.2,"1:5"],[.1,"1:10"],[.05,"1:20"]],l=(c,h)=>`<label class="fld"><span>${h}</span><input data-tk="${c}" value="${St(i.title[c]||"")}"></label>`;r.innerHTML=`<div class="cmdhead"><span>Drawing sheet</span><button class="x" data-act="closedraw" title="Close drawing (Esc)">\xD7</button></div>
      <div class="cmdhelp">${St(e.tool==="dim"?e.picks.length?`Point ${e.picks.length} picked. ${e.picks.length===1?"Click a second point in the same view.":"Click where the size line goes."}`:"Click two corners, line ends or hole centers in one view, then click where the size goes (Shift = slanted).":e.tool==="note"?"Click on the sheet where the note goes.":"Views, sizes and the title block update when the part changes.")}</div>
      <div class="cmdbody">
      <label class="fld"><span>Paper</span>${o("sheet",Object.entries(Ha).map(([c,h])=>[c,h.name]),i.sheet)}</label>
      <label class="fld"><span>Scale</span>${o("scale",a,i.scale)}</label>
      <label class="fld"><span>View layout</span>${o("projection",[["third","Third angle (USA)"],["first","First angle (Europe)"]],i.projection)}</label>
      <div class="fld"><span>Views</span><div class="btnrow">${["front","top","right","iso"].map(c=>`<label class="chk"><input type="checkbox" data-vk="${c}" ${i.views[c]?"checked":""}> ${c==="iso"?"Iso":c[0].toUpperCase()+c.slice(1)}</label>`).join(" ")}</div></div>
      <label class="chk"><input type="checkbox" data-bk="hidden" ${i.hidden?"checked":""}> Hidden lines (dashed)</label>
      <label class="chk"><input type="checkbox" data-bk="autoDims" ${i.autoDims?"checked":""}> Overall sizes</label>
      <label class="chk"><input type="checkbox" data-bk="holeNotes" ${i.holeNotes?"checked":""}> Hole sizes (\xD8)</label>
      <label class="fld"><span>Decimal places</span>${o("decimals",[[0,"0"],[1,"1"],[2,"2"],[3,"3"]],i.decimals)}</label>
      <details open class="planeopts"><summary>Title block</summary>
      ${l("drawnBy","Drawn by")}${l("school","School")}${l("course","Class / period")}${l("date","Date")}${l("partNo","Part number")}
      </details>
      ${e.sel?`<div class="note">A ${e.sel[0]==="d"?"size":"note"} is picked. Press Delete to remove it.</div>`:""}
      </div>
      <div class="cmdfoot"><button data-act="print">Print / PDF</button><button class="ok" data-act="closedraw2">Done</button></div>`,r.querySelectorAll("[data-act=closedraw],[data-act=closedraw2]").forEach(c=>c.onclick=()=>t.closeDrawing()),r.querySelector("[data-act=print]").onclick=()=>e.print();for(let c of r.querySelectorAll("[data-dk]"))c.onchange=()=>{let h=c.dataset.dk;t.change(()=>{i[h]=h==="scale"?c.value==="auto"?"auto":+c.value:h==="decimals"?+c.value:c.value}),(h==="sheet"||h==="scale")&&(e.fitZoom=!0)};for(let c of r.querySelectorAll("[data-vk]"))c.onchange=()=>t.change(()=>{i.views[c.dataset.vk]=c.checked});for(let c of r.querySelectorAll("[data-bk]"))c.onchange=()=>t.change(()=>{i[c.dataset.bk]=c.checked});for(let c of r.querySelectorAll("[data-tk]"))c.onchange=()=>t.change(()=>{i.title[c.dataset.tk]=c.value})}renderStatusInfo(){if(this.app.mode==="drawing")return;if(this.app.mode==="assembly"){let n=this.app.asm,i=Object.keys(this.app.asmr.bad).length;At("#statusRight").innerHTML=`${i?`<span class="bad">${i} constraint${i>1?"s":""} not met</span> \xB7 `:""}${n.components.length} parts \xB7 ${n.constraints.length} constraints \xB7 <button class="linkbtn" id="unitBtn" title="Change units">${St(n.units||"mm")}</button>`,At("#unitBtn").onclick=()=>this.openUnits();return}let t=this.app.result.desc,e=Object.keys(this.app.result.errors||{}).length;At("#statusRight").innerHTML=`${e?`<span class="bad">${e} feature${e>1?"s":""} with problems</span> \xB7 `:""}${t?this.app.units()==="in"?`Volume ${gt(t.volume)} in\xB3 \xB7 `:`Volume ${gt(t.volume/1e3)} cm\xB3 \xB7 `:""}<button class="linkbtn" id="unitBtn" title="Change units">${this.app.units()}</button> \xB7 ${this.app.result.ms?Math.round(this.app.result.ms)+" ms":""}`,At("#unitBtn").onclick=()=>this.openUnits()}modal(t,e="",n){let i=At("#modal");i.hidden=!1,i.innerHTML=`<div class="mbox ${e}"><button class="x mclose" title="Close">\xD7</button>${t}</div>`,this._onClose=n,i.querySelector(".mclose").onclick=()=>this.closeModal(),i.onclick=r=>{r.target===i&&this.closeModal()}}askText(t,e,n){this.modal(`<h2>${St(t)}</h2><label class="fld"><input id="askInp" value="${St(e)}" spellcheck="false"></label><div class="welcomebtns"><button class="ok" id="askOk">OK</button><button id="askNo">Cancel</button></div>`);let i=At("#askInp");i.focus(),i.select();let r=()=>{let o=i.value.trim();this.closeModal(),o&&o!==e&&n(o)};At("#askOk").onclick=r,At("#askNo").onclick=()=>this.closeModal(),i.onkeydown=o=>{o.stopPropagation(),o.key==="Enter"&&r(),o.key==="Escape"&&this.closeModal()}}modalOpen(){return!At("#modal").hidden}closeModal(){let t=At("#modal");if(t.hidden=!0,t.innerHTML="",this._onClose){let e=this._onClose;this._onClose=null,e()}}openExamples(){this.modal(`<h2>${$t("examples",22)} Examples</h2><p>Open one to see how it was built. Double-click any step in the tree to change it.</p><h3>Parts</h3><div class="excards">${di.map((e,n)=>`<button class="excard" data-i="${n}"><b>${St(e.title)}</b><span>${St(e.about)}</span></button>`).join("")}</div><h3>Assemblies</h3><div class="excards">${Ic.map((e,n)=>`<button class="excard" data-a="${n}"><b>${St(e.title)}</b><span>${St(e.about)}</span></button>`).join("")}</div>`,"wide");let t=()=>{let e=this.app.root;return e.features&&e.features.length||e.components&&e.components.length};for(let e of document.querySelectorAll(".excard[data-i]"))e.onclick=()=>{t()&&!confirm("Open the example? What is open now is replaced (save it first if you want to keep it).")||(this.closeModal(),this.app.setDoc(Nc(di[+e.dataset.i].doc)))};for(let e of document.querySelectorAll(".excard[data-a]"))e.onclick=()=>{t()&&!confirm("Open the example? What is open now is replaced (save it first if you want to keep it).")||(this.closeModal(),this.app.openAssembly(Nc(Ic[+e.dataset.a].doc)))}}showWelcome(){this.modal(`<img class="welcomelogo" src="assets/logo.png" alt="Pathway CAD">
      <p>Design real 3D parts, then export them for a 3D printer or another CAD program.</p>
      <ol class="steps"><li><b>Sketch</b> a flat shape on a plane.</li><li><b>Extrude</b> or <b>Revolve</b> it into a solid.</li><li>Add <b>holes, fillets and patterns</b>.</li><li><b>Export STL</b> to 3D print it.</li></ol>
      <p><b>Mouse:</b> right-drag turns the view, middle-drag (or Shift + right-drag) slides it, the wheel zooms.</p>
      <div class="welcomebtns"><button class="ok" id="wStart">Start a new part</button><button id="wAsm">New assembly</button><button id="wEx">Open an example</button><button id="wHelp">How to</button></div>`),At("#wAsm").onclick=()=>{this.closeModal(),this.app.openAssembly($a()),this.app.asmr.placeDialog()},At("#wStart").onclick=()=>{this.closeModal(),this.app.run("sketch")},At("#wEx").onclick=()=>this.openExamples(),At("#wHelp").onclick=()=>this.openHelp()}openHelp(){this.modal(`<h2><img class="helplogo" src="assets/icon-256.png" alt="">How to use Pathway CAD</h2>
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
      <h3>Drawings (2D plans)</h3>
      <ul><li>Press <b>Drawing</b> (Model or Assemble tab) to make a printable sheet with front, top, right and isometric views. Hidden edges are dashed.</li>
      <li>Overall sizes and hole sizes are added for you. <b>Size</b> (D): click two corners or hole centers in one view, then click where the size line goes. <b>Note</b> (N) adds text.</li>
      <li>Pick the paper, scale, view layout (USA third angle or European first angle) and fill in the title block on the left.</li>
      <li><b>Print / PDF</b> prints at real scale (choose "Save as PDF" as the printer to make a PDF). <b>Save SVG</b> saves a file for a laser cutter or Inkscape. Assembly drawings include a parts list.</li></ul>
      <h3>Units</h3>
      <ul><li>Click the unit at the bottom right (or File \u25B8 Units) to switch between millimetres and inches. You can convert the sizes so the part stays the same real size.</li></ul>
      <h3>Saving and sharing</h3>
      <ul><li>File \u25B8 Save downloads a <b>.pcad</b> part file or a <b>.pasm</b> assembly file (the assembly file holds its parts inside it). File \u25B8 Open loads it again. Your work is also kept on this computer automatically.</li>
      <li>Export <b>STL</b> for 3D printing (slicers like Cura or PrusaSlicer) and <b>STEP</b> for other CAD programs.</li>
      </ul>
      <h3>Keys</h3>
      <p class="muted">Pathway CAD uses the OpenCascade modeling engine (LGPL-2.1) through replicad (MIT), and three.js (MIT) for the 3D view.</p>
      <p class="keys">S sketch \xB7 E extrude \xB7 R revolve \xB7 H hole \xB7 F fillet \xB7 M measure \xB7 Esc cancel \xB7 Enter OK<br>In a sketch: L line \xB7 R rectangle \xB7 C circle \xB7 A arc \xB7 P polygon \xB7 O slot \xB7 S select \xB7 X construction \xB7 G grid</p>
      </div>`,"wide")}status(t){At("#statusMsg").textContent=t||""}toast(t,e=""){let n=document.createElement("div");n.className="toast "+e,n.textContent=t,At("#toasts").appendChild(n),setTimeout(()=>n.classList.add("out"),e==="error"?5200:3400),setTimeout(()=>n.remove(),e==="error"?5800:4e3)}busy(t){At("#busy").hidden=!t}loading(t,e){let n=At("#loading");if(!t){n.hidden=!0;return}n.hidden=!1,n.querySelector("p").textContent=t,n.classList.toggle("bad",!!e)}},sx={select:"Pick a shape to see and edit its numbers.",line:"Line: click, click, click\u2026 Click the first point again to close the shape.",rect:"Rectangle: click two opposite corners.",circle:"Circle: click the center, then the edge.",arc:"Arc: start, end, then a point it passes through.",polygon:"Polygon: click the center, then a corner.",slot:"Slot: click both end centers, then the width."};function Cr(s){let t=String(s).trim();return/^-?\d*\.?\d+(e-?\d+)?$/i.test(t)?parseFloat(t):t}function gu(s,t){return s.sketch===t.id||(s.features||[]).includes(t.id)}window.addEventListener("DOMContentLoaded",()=>{window.pathwayCad=new Fc});export{qa as MATERIALS,Bi as newDoc};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
