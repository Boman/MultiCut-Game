
export var Module = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(Module) {
  Module = Module || {};


var e;e||(e=typeof Module !== 'undefined' ? Module : {});var aa,ba;e.ready=new Promise(function(a,b){aa=a;ba=b});const k=[],ca=[];e.print=a=>k.push(a);e.printErr=a=>ca.push(a);var m={},r;for(r in e)e.hasOwnProperty(r)&&(m[r]=e[r]);var da="./this.program",ea="object"===typeof window,v="function"===typeof importScripts,fa="object"===typeof process&&"object"===typeof process.versions&&"string"===typeof process.versions.node,x="",ha,ia,ja,z,A;
if(fa)x=v?require("path").dirname(x)+"/":__dirname+"/",ha=function(a,b){z||(z=require("fs"));A||(A=require("path"));a=A.normalize(a);return z.readFileSync(a,b?null:"utf8")},ja=function(a){a=ha(a,!0);a.buffer||(a=new Uint8Array(a));a.buffer||B("Assertion failed: undefined");return a},ia=function(a,b,c){z||(z=require("fs"));A||(A=require("path"));a=A.normalize(a);z.readFile(a,function(d,f){d?c(d):b(f.buffer)})},1<process.argv.length&&(da=process.argv[1].replace(/\\/g,"/")),process.argv.slice(2),process.on("uncaughtException",
function(a){throw a;}),process.on("unhandledRejection",function(a){throw a;}),e.inspect=function(){return"[Emscripten Module object]"};else if(ea||v)v?x=self.location.href:"undefined"!==typeof document&&document.currentScript&&(x=document.currentScript.src),_scriptDir&&(x=_scriptDir),x=0!==x.indexOf("blob:")?x.substr(0,x.replace(/[?#].*/,"").lastIndexOf("/")+1):"",ha=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},v&&(ja=function(a){var b=new XMLHttpRequest;
b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),ia=function(a,b,c){var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType="arraybuffer";d.onload=function(){200==d.status||0==d.status&&d.response?b(d.response):c()};d.onerror=c;d.send(null)};var ka=e.print||console.log.bind(console),D=e.printErr||console.warn.bind(console);for(r in m)m.hasOwnProperty(r)&&(e[r]=m[r]);m=null;e.thisProgram&&(da=e.thisProgram);var E;e.wasmBinary&&(E=e.wasmBinary);
var noExitRuntime=e.noExitRuntime||!0;"object"!==typeof WebAssembly&&B("no native wasm support detected");var la,ma=!1;function na(a){var b=e["_"+a];b||B("Assertion failed: Cannot call unknown function "+(a+", make sure it is exported"));return b}
function oa(a,b,c,d){var f={string:function(p){var t=0;if(null!==p&&void 0!==p&&0!==p){var y=(p.length<<2)+1;t=pa(y);qa(p,F,t,y)}return t},array:function(p){var t=pa(p.length);G.set(p,t);return t}};a=na(a);var g=[],l=0;if(d)for(var n=0;n<d.length;n++){var w=f[c[n]];w?(0===l&&(l=ra()),g[n]=w(d[n])):g[n]=d[n]}c=a.apply(null,g);return c=function(p){0!==l&&sa(l);return"string"===b?ta(p):"boolean"===b?!!p:p}(c)}var ua="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;
function H(a,b,c){var d=b+c;for(c=b;a[c]&&!(c>=d);)++c;if(16<c-b&&a.subarray&&ua)return ua.decode(a.subarray(b,c));for(d="";b<c;){var f=a[b++];if(f&128){var g=a[b++]&63;if(192==(f&224))d+=String.fromCharCode((f&31)<<6|g);else{var l=a[b++]&63;f=224==(f&240)?(f&15)<<12|g<<6|l:(f&7)<<18|g<<12|l<<6|a[b++]&63;65536>f?d+=String.fromCharCode(f):(f-=65536,d+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else d+=String.fromCharCode(f)}return d}function ta(a){return a?H(F,a,void 0):""}
function qa(a,b,c,d){if(!(0<d))return 0;var f=c;d=c+d-1;for(var g=0;g<a.length;++g){var l=a.charCodeAt(g);if(55296<=l&&57343>=l){var n=a.charCodeAt(++g);l=65536+((l&1023)<<10)|n&1023}if(127>=l){if(c>=d)break;b[c++]=l}else{if(2047>=l){if(c+1>=d)break;b[c++]=192|l>>6}else{if(65535>=l){if(c+2>=d)break;b[c++]=224|l>>12}else{if(c+3>=d)break;b[c++]=240|l>>18;b[c++]=128|l>>12&63}b[c++]=128|l>>6&63}b[c++]=128|l&63}}b[c]=0;return c-f}
function va(a){for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);55296<=d&&57343>=d&&(d=65536+((d&1023)<<10)|a.charCodeAt(++c)&1023);127>=d?++b:b=2047>=d?b+2:65535>=d?b+3:b+4}return b}var wa,G,F,xa,I;function ya(){var a=la.buffer;wa=a;e.HEAP8=G=new Int8Array(a);e.HEAP16=xa=new Int16Array(a);e.HEAP32=I=new Int32Array(a);e.HEAPU8=F=new Uint8Array(a);e.HEAPU16=new Uint16Array(a);e.HEAPU32=new Uint32Array(a);e.HEAPF32=new Float32Array(a);e.HEAPF64=new Float64Array(a)}var za,Aa=[],Ba=[],Ca=[];
function Da(){var a=e.preRun.shift();Aa.unshift(a)}var J=0,Ea=null,K=null;e.preloadedImages={};e.preloadedAudios={};function B(a){if(e.onAbort)e.onAbort(a);a="Aborted("+a+")";D(a);ma=!0;a=new WebAssembly.RuntimeError(a+". Build with -s ASSERTIONS=1 for more info.");ba(a);throw a;}function Fa(){return L.startsWith("data:application/octet-stream;base64,")}var L;L="highs.wasm";if(!Fa()){var Ga=L;L=e.locateFile?e.locateFile(Ga,x):x+Ga}
function Ha(){var a=L;try{if(a==L&&E)return new Uint8Array(E);if(ja)return ja(a);throw"both async and sync fetching of the wasm failed";}catch(b){B(b)}}
function Ia(){if(!E&&(ea||v)){if("function"===typeof fetch&&!L.startsWith("file://"))return fetch(L,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+L+"'";return a.arrayBuffer()}).catch(function(){return Ha()});if(ia)return new Promise(function(a,b){ia(L,function(c){a(new Uint8Array(c))},b)})}return Promise.resolve().then(function(){return Ha()})}var M,Ja;
function Ka(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b(e);else{var c=b.Oa;"number"===typeof c?void 0===b.ga?za.get(c)():za.get(c)(b.ga):c(void 0===b.ga?null:b.ga)}}}function La(a){this.Y=a-16;this.Ha=function(b){I[this.Y+4>>2]=b};this.Ea=function(b){I[this.Y+8>>2]=b};this.Fa=function(){I[this.Y>>2]=0};this.Da=function(){G[this.Y+12>>0]=0};this.Ga=function(){G[this.Y+13>>0]=0};this.xa=function(b,c){this.Ha(b);this.Ea(c);this.Fa();this.Da();this.Ga()}}var Ma=0;
function Na(a,b){for(var c=0,d=a.length-1;0<=d;d--){var f=a[d];"."===f?a.splice(d,1):".."===f?(a.splice(d,1),c++):c&&(a.splice(d,1),c--)}if(b)for(;c;c--)a.unshift("..");return a}function Oa(a){var b="/"===a.charAt(0),c="/"===a.substr(-1);(a=Na(a.split("/").filter(function(d){return!!d}),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return(b?"/":"")+a}
function Pa(a){var b=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);a=b[0];b=b[1];if(!a&&!b)return".";b&&(b=b.substr(0,b.length-1));return a+b}function Qa(a){if("/"===a)return"/";a=Oa(a);a=a.replace(/\/$/,"");var b=a.lastIndexOf("/");return-1===b?a:a.substr(b+1)}
function Ra(){if("object"===typeof crypto&&"function"===typeof crypto.getRandomValues){var a=new Uint8Array(1);return function(){crypto.getRandomValues(a);return a[0]}}if(fa)try{var b=require("crypto");return function(){return b.randomBytes(1)[0]}}catch(c){}return function(){B("randomDevice")}}
function Sa(){for(var a="",b=!1,c=arguments.length-1;-1<=c&&!b;c--){b=0<=c?arguments[c]:"/";if("string"!==typeof b)throw new TypeError("Arguments to path.resolve must be strings");if(!b)return"";a=b+"/"+a;b="/"===b.charAt(0)}a=Na(a.split("/").filter(function(d){return!!d}),!b).join("/");return(b?"/":"")+a||"."}var Ta=[];function Ua(a,b){Ta[a]={input:[],output:[],X:b};Va(a,Wa)}
var Wa={open:function(a){var b=Ta[a.node.rdev];if(!b)throw new O(43);a.tty=b;a.seekable=!1},close:function(a){a.tty.X.flush(a.tty)},flush:function(a){a.tty.X.flush(a.tty)},read:function(a,b,c,d){if(!a.tty||!a.tty.X.pa)throw new O(60);for(var f=0,g=0;g<d;g++){try{var l=a.tty.X.pa(a.tty)}catch(n){throw new O(29);}if(void 0===l&&0===f)throw new O(6);if(null===l||void 0===l)break;f++;b[c+g]=l}f&&(a.node.timestamp=Date.now());return f},write:function(a,b,c,d){if(!a.tty||!a.tty.X.ia)throw new O(60);try{for(var f=
0;f<d;f++)a.tty.X.ia(a.tty,b[c+f])}catch(g){throw new O(29);}d&&(a.node.timestamp=Date.now());return f}},Ya={pa:function(a){if(!a.input.length){var b=null;if(fa){b=Buffer.alloc(256);var c=0;try{c=z.readSync(process.stdin.fd,b,0,256,null)}catch(d){if(d.toString().includes("EOF"))c=0;else throw d;}b=0<c?b.slice(0,c).toString("utf-8"):null}else"undefined"!=typeof window&&"function"==typeof window.prompt?(b=window.prompt("Input: "),null!==b&&(b+="\n")):"function"==typeof readline&&(b=readline(),null!==
b&&(b+="\n"));if(!b)return null;a.input=Xa(b,!0)}return a.input.shift()},ia:function(a,b){null===b||10===b?(ka(H(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},flush:function(a){a.output&&0<a.output.length&&(ka(H(a.output,0)),a.output=[])}},Za={ia:function(a,b){null===b||10===b?(D(H(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},flush:function(a){a.output&&0<a.output.length&&(D(H(a.output,0)),a.output=[])}},P={R:null,T:function(){return P.createNode(null,"/",16895,0)},createNode:function(a,
b,c,d){if(24576===(c&61440)||4096===(c&61440))throw new O(63);P.R||(P.R={dir:{node:{U:P.M.U,S:P.M.S,lookup:P.M.lookup,aa:P.M.aa,rename:P.M.rename,unlink:P.M.unlink,rmdir:P.M.rmdir,readdir:P.M.readdir,symlink:P.M.symlink},stream:{W:P.N.W}},file:{node:{U:P.M.U,S:P.M.S},stream:{W:P.N.W,read:P.N.read,write:P.N.write,ka:P.N.ka,qa:P.N.qa,sa:P.N.sa}},link:{node:{U:P.M.U,S:P.M.S,readlink:P.M.readlink},stream:{}},la:{node:{U:P.M.U,S:P.M.S},stream:$a}});c=ab(a,b,c,d);16384===(c.mode&61440)?(c.M=P.R.dir.node,
c.N=P.R.dir.stream,c.L={}):32768===(c.mode&61440)?(c.M=P.R.file.node,c.N=P.R.file.stream,c.O=0,c.L=null):40960===(c.mode&61440)?(c.M=P.R.link.node,c.N=P.R.link.stream):8192===(c.mode&61440)&&(c.M=P.R.la.node,c.N=P.R.la.stream);c.timestamp=Date.now();a&&(a.L[b]=c,a.timestamp=c.timestamp);return c},Pa:function(a){return a.L?a.L.subarray?a.L.subarray(0,a.O):new Uint8Array(a.L):new Uint8Array(0)},ma:function(a,b){var c=a.L?a.L.length:0;c>=b||(b=Math.max(b,c*(1048576>c?2:1.125)>>>0),0!=c&&(b=Math.max(b,
256)),c=a.L,a.L=new Uint8Array(b),0<a.O&&a.L.set(c.subarray(0,a.O),0))},Ba:function(a,b){if(a.O!=b)if(0==b)a.L=null,a.O=0;else{var c=a.L;a.L=new Uint8Array(b);c&&a.L.set(c.subarray(0,Math.min(b,a.O)));a.O=b}},M:{U:function(a){var b={};b.dev=8192===(a.mode&61440)?a.id:1;b.ino=a.id;b.mode=a.mode;b.nlink=1;b.uid=0;b.gid=0;b.rdev=a.rdev;b.size=16384===(a.mode&61440)?4096:32768===(a.mode&61440)?a.O:40960===(a.mode&61440)?a.link.length:0;b.atime=new Date(a.timestamp);b.mtime=new Date(a.timestamp);b.ctime=
new Date(a.timestamp);b.va=4096;b.blocks=Math.ceil(b.size/b.va);return b},S:function(a,b){void 0!==b.mode&&(a.mode=b.mode);void 0!==b.timestamp&&(a.timestamp=b.timestamp);void 0!==b.size&&P.Ba(a,b.size)},lookup:function(){throw bb[44];},aa:function(a,b,c,d){return P.createNode(a,b,c,d)},rename:function(a,b,c){if(16384===(a.mode&61440)){try{var d=cb(b,c)}catch(g){}if(d)for(var f in d.L)throw new O(55);}delete a.parent.L[a.name];a.parent.timestamp=Date.now();a.name=c;b.L[c]=a;b.timestamp=a.parent.timestamp;
a.parent=b},unlink:function(a,b){delete a.L[b];a.timestamp=Date.now()},rmdir:function(a,b){var c=cb(a,b),d;for(d in c.L)throw new O(55);delete a.L[b];a.timestamp=Date.now()},readdir:function(a){var b=[".",".."],c;for(c in a.L)a.L.hasOwnProperty(c)&&b.push(c);return b},symlink:function(a,b,c){a=P.createNode(a,b,41471,0);a.link=c;return a},readlink:function(a){if(40960!==(a.mode&61440))throw new O(28);return a.link}},N:{read:function(a,b,c,d,f){var g=a.node.L;if(f>=a.node.O)return 0;a=Math.min(a.node.O-
f,d);if(8<a&&g.subarray)b.set(g.subarray(f,f+a),c);else for(d=0;d<a;d++)b[c+d]=g[f+d];return a},write:function(a,b,c,d,f,g){b.buffer===G.buffer&&(g=!1);if(!d)return 0;a=a.node;a.timestamp=Date.now();if(b.subarray&&(!a.L||a.L.subarray)){if(g)return a.L=b.subarray(c,c+d),a.O=d;if(0===a.O&&0===f)return a.L=b.slice(c,c+d),a.O=d;if(f+d<=a.O)return a.L.set(b.subarray(c,c+d),f),d}P.ma(a,f+d);if(a.L.subarray&&b.subarray)a.L.set(b.subarray(c,c+d),f);else for(g=0;g<d;g++)a.L[f+g]=b[c+g];a.O=Math.max(a.O,f+
d);return d},W:function(a,b,c){1===c?b+=a.position:2===c&&32768===(a.node.mode&61440)&&(b+=a.node.O);if(0>b)throw new O(28);return b},ka:function(a,b,c){P.ma(a.node,b+c);a.node.O=Math.max(a.node.O,b+c)},qa:function(a,b,c,d,f,g){if(0!==b)throw new O(28);if(32768!==(a.node.mode&61440))throw new O(43);a=a.node.L;if(g&2||a.buffer!==wa){if(0<d||d+c<a.length)a=a.subarray?a.subarray(d,d+c):Array.prototype.slice.call(a,d,d+c);d=!0;B();c=void 0;if(!c)throw new O(48);G.set(a,c)}else d=!1,c=a.byteOffset;return{Y:c,
Na:d}},sa:function(a,b,c,d,f){if(32768!==(a.node.mode&61440))throw new O(43);if(f&2)return 0;P.N.write(a,b,0,d,c,!1);return 0}}},db=null,eb={},Q=[],fb=1,R=null,gb=!0,O=null,bb={};
function S(a,b){a=Sa("/",a);b=b||{};if(!a)return{path:"",node:null};var c={oa:!0,ja:0},d;for(d in c)void 0===b[d]&&(b[d]=c[d]);if(8<b.ja)throw new O(32);a=Na(a.split("/").filter(function(l){return!!l}),!1);var f=db;c="/";for(d=0;d<a.length;d++){var g=d===a.length-1;if(g&&b.parent)break;f=cb(f,a[d]);c=Oa(c+"/"+a[d]);f.ba&&(!g||g&&b.oa)&&(f=f.ba.root);if(!g||b.na)for(g=0;40960===(f.mode&61440);)if(f=hb(c),c=Sa(Pa(c),f),f=S(c,{ja:b.ja}).node,40<g++)throw new O(32);}return{path:c,node:f}}
function ib(a){for(var b;;){if(a===a.parent)return a=a.T.ra,b?"/"!==a[a.length-1]?a+"/"+b:a+b:a;b=b?a.name+"/"+b:a.name;a=a.parent}}function jb(a,b){for(var c=0,d=0;d<b.length;d++)c=(c<<5)-c+b.charCodeAt(d)|0;return(a+c>>>0)%R.length}function cb(a,b){var c;if(c=(c=kb(a,"x"))?c:a.M.lookup?0:2)throw new O(c,a);for(c=R[jb(a.id,b)];c;c=c.Aa){var d=c.name;if(c.parent.id===a.id&&d===b)return c}return a.M.lookup(a,b)}
function ab(a,b,c,d){a=new lb(a,b,c,d);b=jb(a.parent.id,a.name);a.Aa=R[b];return R[b]=a}var mb={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090};function nb(a){var b=["r","w","rw"][a&3];a&512&&(b+="w");return b}function kb(a,b){if(gb)return 0;if(!b.includes("r")||a.mode&292){if(b.includes("w")&&!(a.mode&146)||b.includes("x")&&!(a.mode&73))return 2}else return 2;return 0}function ob(a,b){try{return cb(a,b),20}catch(c){}return kb(a,"wx")}
function pb(a){var b=4096;for(a=a||0;a<=b;a++)if(!Q[a])return a;throw new O(33);}function qb(a,b){rb||(rb=function(){},rb.prototype={object:{get:function(){return this.node},set:function(f){this.node=f}}});var c=new rb,d;for(d in a)c[d]=a[d];a=c;b=pb(b);a.fd=b;return Q[b]=a}var $a={open:function(a){a.N=eb[a.node.rdev].N;a.N.open&&a.N.open(a)},W:function(){throw new O(70);}};function Va(a,b){eb[a]={N:b}}
function sb(a,b){var c="/"===b,d=!b;if(c&&db)throw new O(10);if(!c&&!d){var f=S(b,{oa:!1});b=f.path;f=f.node;if(f.ba)throw new O(10);if(16384!==(f.mode&61440))throw new O(54);}b={type:a,Qa:{},ra:b,za:[]};a=a.T(b);a.T=b;b.root=a;c?db=a:f&&(f.ba=b,f.T&&f.T.za.push(b))}function tb(a,b,c){var d=S(a,{parent:!0}).node;a=Qa(a);if(!a||"."===a||".."===a)throw new O(28);var f=ob(d,a);if(f)throw new O(f);if(!d.M.aa)throw new O(63);return d.M.aa(d,a,b,c)}function T(a){return tb(a,16895,0)}
function ub(a,b,c){"undefined"===typeof c&&(c=b,b=438);tb(a,b|8192,c)}function vb(a,b){if(!Sa(a))throw new O(44);var c=S(b,{parent:!0}).node;if(!c)throw new O(44);b=Qa(b);var d=ob(c,b);if(d)throw new O(d);if(!c.M.symlink)throw new O(63);c.M.symlink(c,b,a)}function hb(a){a=S(a).node;if(!a)throw new O(44);if(!a.M.readlink)throw new O(28);return Sa(ib(a.parent),a.M.readlink(a))}
function U(a,b,c,d){if(""===a)throw new O(44);if("string"===typeof b){var f=mb[b];if("undefined"===typeof f)throw Error("Unknown file open mode: "+b);b=f}c=b&64?("undefined"===typeof c?438:c)&4095|32768:0;if("object"===typeof a)var g=a;else{a=Oa(a);try{g=S(a,{na:!(b&131072)}).node}catch(l){}}f=!1;if(b&64)if(g){if(b&128)throw new O(20);}else g=tb(a,c,0),f=!0;if(!g)throw new O(44);8192===(g.mode&61440)&&(b&=-513);if(b&65536&&16384!==(g.mode&61440))throw new O(54);if(!f&&(c=g?40960===(g.mode&61440)?
32:16384===(g.mode&61440)&&("r"!==nb(b)||b&512)?31:kb(g,nb(b)):44))throw new O(c);if(b&512){c=g;c="string"===typeof c?S(c,{na:!0}).node:c;if(!c.M.S)throw new O(63);if(16384===(c.mode&61440))throw new O(31);if(32768!==(c.mode&61440))throw new O(28);if(f=kb(c,"w"))throw new O(f);c.M.S(c,{size:0,timestamp:Date.now()})}b&=-131713;d=qb({node:g,path:ib(g),flags:b,seekable:!0,position:0,N:g.N,Ma:[],error:!1},d);d.N.open&&d.N.open(d);!e.logReadFiles||b&1||(wb||(wb={}),a in wb||(wb[a]=1));return d}
function xb(a){if(null===a.fd)throw new O(8);a.ha&&(a.ha=null);try{a.N.close&&a.N.close(a)}catch(b){throw b;}finally{Q[a.fd]=null}a.fd=null}function yb(a,b,c){if(null===a.fd)throw new O(8);if(!a.seekable||!a.N.W)throw new O(70);if(0!=c&&1!=c&&2!=c)throw new O(28);a.position=a.N.W(a,b,c);a.Ma=[]}
function zb(a,b,c,d,f){var g=void 0;if(0>d||0>g)throw new O(28);if(null===a.fd)throw new O(8);if(0===(a.flags&2097155))throw new O(8);if(16384===(a.node.mode&61440))throw new O(31);if(!a.N.write)throw new O(28);a.seekable&&a.flags&1024&&yb(a,0,2);var l="undefined"!==typeof g;if(!l)g=a.position;else if(!a.seekable)throw new O(70);b=a.N.write(a,b,c,d,g,f);l||(a.position+=b);return b}
function Ab(a){var b=b||{};b.flags=b.flags||577;var c=U("m.lp",b.flags,b.mode);if("string"===typeof a){var d=new Uint8Array(va(a)+1);a=qa(a,d,0,d.length);zb(c,d,0,a,b.wa)}else if(ArrayBuffer.isView(a))zb(c,a,0,a.byteLength,b.wa);else throw Error("Unsupported data type");xb(c)}
function Cb(){O||(O=function(a,b){this.node=b;this.Ca=function(c){this.V=c};this.Ca(a);this.message="FS error"},O.prototype=Error(),O.prototype.constructor=O,[44].forEach(function(a){bb[a]=new O(a);bb[a].stack="<generic error, no stack>"}))}var Db;function Eb(a,b){var c=0;a&&(c|=365);b&&(c|=146);return c}
function V(a,b,c){a=Oa("/dev/"+a);var d=Eb(!!b,!!c);Fb||(Fb=64);var f=Fb++<<8|0;Va(f,{open:function(g){g.seekable=!1},close:function(){c&&c.buffer&&c.buffer.length&&c(10)},read:function(g,l,n,w){for(var p=0,t=0;t<w;t++){try{var y=b()}catch(N){throw new O(29);}if(void 0===y&&0===p)throw new O(6);if(null===y||void 0===y)break;p++;l[n+t]=y}p&&(g.node.timestamp=Date.now());return p},write:function(g,l,n,w){for(var p=0;p<w;p++)try{c(l[n+p])}catch(t){throw new O(29);}w&&(g.node.timestamp=Date.now());return p}});
ub(a,d,f)}var Fb,W={},rb,wb,X=void 0;function Y(){X+=4;return I[X-4>>2]}function Z(a){a=Q[a];if(!a)throw new O(8);return a}var Gb;Gb=fa?function(){var a=process.hrtime();return 1E3*a[0]+a[1]/1E6}:function(){return performance.now()};var Hb={};
function Ib(){if(!Jb){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"===typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:da||"./this.program"},b;for(b in Hb)void 0===Hb[b]?delete a[b]:a[b]=Hb[b];var c=[];for(b in a)c.push(b+"="+a[b]);Jb=c}return Jb}var Jb;function Kb(a){return 0===a%4&&(0!==a%100||0===a%400)}function Lb(a,b){for(var c=0,d=0;d<=b;c+=a[d++]);return c}
var Mb=[31,29,31,30,31,30,31,31,30,31,30,31],Nb=[31,28,31,30,31,30,31,31,30,31,30,31];function Ob(a,b){for(a=new Date(a.getTime());0<b;){var c=a.getMonth(),d=(Kb(a.getFullYear())?Mb:Nb)[c];if(b>d-a.getDate())b-=d-a.getDate()+1,a.setDate(1),11>c?a.setMonth(c+1):(a.setMonth(0),a.setFullYear(a.getFullYear()+1));else{a.setDate(a.getDate()+b);break}}return a}
function Pb(a,b,c,d){function f(h,q,u){for(h="number"===typeof h?h.toString():h||"";h.length<q;)h=u[0]+h;return h}function g(h,q){return f(h,q,"0")}function l(h,q){function u(Bb){return 0>Bb?-1:0<Bb?1:0}var C;0===(C=u(h.getFullYear()-q.getFullYear()))&&0===(C=u(h.getMonth()-q.getMonth()))&&(C=u(h.getDate()-q.getDate()));return C}function n(h){switch(h.getDay()){case 0:return new Date(h.getFullYear()-1,11,29);case 1:return h;case 2:return new Date(h.getFullYear(),0,3);case 3:return new Date(h.getFullYear(),
0,2);case 4:return new Date(h.getFullYear(),0,1);case 5:return new Date(h.getFullYear()-1,11,31);case 6:return new Date(h.getFullYear()-1,11,30)}}function w(h){h=Ob(new Date(h.P+1900,0,1),h.fa);var q=new Date(h.getFullYear()+1,0,4),u=n(new Date(h.getFullYear(),0,4));q=n(q);return 0>=l(u,h)?0>=l(q,h)?h.getFullYear()+1:h.getFullYear():h.getFullYear()-1}var p=I[d+40>>2];d={Ka:I[d>>2],Ja:I[d+4>>2],da:I[d+8>>2],$:I[d+12>>2],Z:I[d+16>>2],P:I[d+20>>2],ea:I[d+24>>2],fa:I[d+28>>2],Ra:I[d+32>>2],Ia:I[d+36>>
2],La:p?ta(p):""};c=ta(c);p={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var t in p)c=c.replace(new RegExp(t,"g"),p[t]);var y="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
N="January February March April May June July August September October November December".split(" ");p={"%a":function(h){return y[h.ea].substring(0,3)},"%A":function(h){return y[h.ea]},"%b":function(h){return N[h.Z].substring(0,3)},"%B":function(h){return N[h.Z]},"%C":function(h){return g((h.P+1900)/100|0,2)},"%d":function(h){return g(h.$,2)},"%e":function(h){return f(h.$,2," ")},"%g":function(h){return w(h).toString().substring(2)},"%G":function(h){return w(h)},"%H":function(h){return g(h.da,2)},
"%I":function(h){h=h.da;0==h?h=12:12<h&&(h-=12);return g(h,2)},"%j":function(h){return g(h.$+Lb(Kb(h.P+1900)?Mb:Nb,h.Z-1),3)},"%m":function(h){return g(h.Z+1,2)},"%M":function(h){return g(h.Ja,2)},"%n":function(){return"\n"},"%p":function(h){return 0<=h.da&&12>h.da?"AM":"PM"},"%S":function(h){return g(h.Ka,2)},"%t":function(){return"\t"},"%u":function(h){return h.ea||7},"%U":function(h){var q=new Date(h.P+1900,0,1),u=0===q.getDay()?q:Ob(q,7-q.getDay());h=new Date(h.P+1900,h.Z,h.$);return 0>l(u,h)?
g(Math.ceil((31-u.getDate()+(Lb(Kb(h.getFullYear())?Mb:Nb,h.getMonth()-1)-31)+h.getDate())/7),2):0===l(u,q)?"01":"00"},"%V":function(h){var q=new Date(h.P+1901,0,4),u=n(new Date(h.P+1900,0,4));q=n(q);var C=Ob(new Date(h.P+1900,0,1),h.fa);return 0>l(C,u)?"53":0>=l(q,C)?"01":g(Math.ceil((u.getFullYear()<h.P+1900?h.fa+32-u.getDate():h.fa+1-u.getDate())/7),2)},"%w":function(h){return h.ea},"%W":function(h){var q=new Date(h.P,0,1),u=1===q.getDay()?q:Ob(q,0===q.getDay()?1:7-q.getDay()+1);h=new Date(h.P+
1900,h.Z,h.$);return 0>l(u,h)?g(Math.ceil((31-u.getDate()+(Lb(Kb(h.getFullYear())?Mb:Nb,h.getMonth()-1)-31)+h.getDate())/7),2):0===l(u,q)?"01":"00"},"%y":function(h){return(h.P+1900).toString().substring(2)},"%Y":function(h){return h.P+1900},"%z":function(h){h=h.Ia;var q=0<=h;h=Math.abs(h)/60;return(q?"+":"-")+String("0000"+(h/60*100+h%60)).slice(-4)},"%Z":function(h){return h.La},"%%":function(){return"%"}};for(t in p)c.includes(t)&&(c=c.replace(new RegExp(t,"g"),p[t](d)));t=Xa(c,!1);if(t.length>
b)return 0;G.set(t,a);return t.length-1}function lb(a,b,c,d){a||(a=this);this.parent=a;this.T=a.T;this.ba=null;this.id=fb++;this.name=b;this.mode=c;this.M={};this.N={};this.rdev=d}Object.defineProperties(lb.prototype,{read:{get:function(){return 365===(this.mode&365)},set:function(a){a?this.mode|=365:this.mode&=-366}},write:{get:function(){return 146===(this.mode&146)},set:function(a){a?this.mode|=146:this.mode&=-147}}});Cb();R=Array(4096);sb(P,"/");T("/tmp");T("/home");T("/home/web_user");
(function(){T("/dev");Va(259,{read:function(){return 0},write:function(b,c,d,f){return f}});ub("/dev/null",259);Ua(1280,Ya);Ua(1536,Za);ub("/dev/tty",1280);ub("/dev/tty1",1536);var a=Ra();V("random",a);V("urandom",a);T("/dev/shm");T("/dev/shm/tmp")})();
(function(){T("/proc");var a=T("/proc/self");T("/proc/self/fd");sb({T:function(){var b=ab(a,"fd",16895,73);b.M={lookup:function(c,d){var f=Q[+d];if(!f)throw new O(8);c={parent:null,T:{ra:"fake"},M:{readlink:function(){return f.path}}};return c.parent=c}};return b}},"/proc/self/fd")})();function Xa(a,b){var c=Array(va(a)+1);a=qa(a,c,0,c.length);b&&(c.length=a);return c}
var Sb={a:function(a){return Qb(a+16)+16},q:function(){},b:function(a,b,c){(new La(a)).xa(b,c);Ma++;throw a;},e:function(a,b,c){X=c;try{var d=Z(a);switch(b){case 0:var f=Y();return 0>f?-28:U(d.path,d.flags,0,f).fd;case 1:case 2:return 0;case 3:return d.flags;case 4:return f=Y(),d.flags|=f,0;case 12:return f=Y(),xa[f+0>>1]=2,0;case 13:case 14:return 0;case 16:case 8:return-28;case 9:return I[Rb()>>2]=28,-1;default:return-28}}catch(g){return"undefined"!==typeof W&&g instanceof O||B(g),-g.V}},i:function(a,
b,c){X=c;try{var d=Z(a);switch(b){case 21509:case 21505:return d.tty?0:-59;case 21510:case 21511:case 21512:case 21506:case 21507:case 21508:return d.tty?0:-59;case 21519:if(!d.tty)return-59;var f=Y();return I[f>>2]=0;case 21520:return d.tty?-28:-59;case 21531:a=f=Y();if(!d.N.ya)throw new O(59);return d.N.ya(d,b,a);case 21523:return d.tty?0:-59;case 21524:return d.tty?0:-59;default:B("bad ioctl syscall "+b)}}catch(g){return"undefined"!==typeof W&&g instanceof O||B(g),-g.V}},j:function(a,b,c){X=c;
try{var d=ta(a),f=c?Y():0;return U(d,b,f).fd}catch(g){return"undefined"!==typeof W&&g instanceof O||B(g),-g.V}},d:function(){B("")},g:function(a,b){if(0===a)a=Date.now();else if(1===a||4===a)a=Gb();else return I[Rb()>>2]=28,-1;I[b>>2]=a/1E3|0;I[b+4>>2]=a%1E3*1E6|0;return 0},l:function(a,b,c){F.copyWithin(a,b,b+c)},c:function(a){var b=F.length;a>>>=0;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);d=Math.max(a,d);0<d%65536&&(d+=65536-d%65536);a:{try{la.grow(Math.min(2147483648,
d)-wa.byteLength+65535>>>16);ya();var f=1;break a}catch(g){}f=void 0}if(f)return!0}return!1},o:function(a,b){var c=0;Ib().forEach(function(d,f){var g=b+c;f=I[a+4*f>>2]=g;for(g=0;g<d.length;++g)G[f++>>0]=d.charCodeAt(g);G[f>>0]=0;c+=d.length+1});return 0},p:function(a,b){var c=Ib();I[a>>2]=c.length;var d=0;c.forEach(function(f){d+=f.length+1});I[b>>2]=d;return 0},f:function(a){try{var b=Z(a);xb(b);return 0}catch(c){return"undefined"!==typeof W&&c instanceof O||B(c),c.V}},h:function(a,b,c,d){try{a:{for(var f=
Z(a),g=a=0;g<c;g++){var l=I[b+(8*g+4)>>2],n=f,w=I[b+8*g>>2],p=l,t=void 0,y=G;if(0>p||0>t)throw new O(28);if(null===n.fd)throw new O(8);if(1===(n.flags&2097155))throw new O(8);if(16384===(n.node.mode&61440))throw new O(31);if(!n.N.read)throw new O(28);var N="undefined"!==typeof t;if(!N)t=n.position;else if(!n.seekable)throw new O(70);var h=n.N.read(n,y,w,p,t);N||(n.position+=h);var q=h;if(0>q){var u=-1;break a}a+=q;if(q<l)break}u=a}I[d>>2]=u;return 0}catch(C){return"undefined"!==typeof W&&C instanceof
O||B(C),C.V}},m:function(a,b,c,d,f){try{var g=Z(a);a=4294967296*c+(b>>>0);if(-9007199254740992>=a||9007199254740992<=a)return-61;yb(g,a,d);Ja=[g.position>>>0,(M=g.position,1<=+Math.abs(M)?0<M?(Math.min(+Math.floor(M/4294967296),4294967295)|0)>>>0:~~+Math.ceil((M-+(~~M>>>0))/4294967296)>>>0:0)];I[f>>2]=Ja[0];I[f+4>>2]=Ja[1];g.ha&&0===a&&0===d&&(g.ha=null);return 0}catch(l){return"undefined"!==typeof W&&l instanceof O||B(l),l.V}},k:function(a,b,c,d){try{a:{for(var f=Z(a),g=a=0;g<c;g++){var l=zb(f,G,
I[b+8*g>>2],I[b+(8*g+4)>>2]);if(0>l){var n=-1;break a}a+=l}n=a}I[d>>2]=n;return 0}catch(w){return"undefined"!==typeof W&&w instanceof O||B(w),w.V}},n:function(a,b,c,d){return Pb(a,b,c,d)}};
(function(){function a(f){e.asm=f.exports;la=e.asm.r;ya();za=e.asm.K;Ba.unshift(e.asm.s);J--;e.monitorRunDependencies&&e.monitorRunDependencies(J);0==J&&(null!==Ea&&(clearInterval(Ea),Ea=null),K&&(f=K,K=null,f()))}function b(f){a(f.instance)}function c(f){return Ia().then(function(g){return WebAssembly.instantiate(g,d)}).then(function(g){return g}).then(f,function(g){D("failed to asynchronously prepare wasm: "+g);B(g)})}var d={a:Sb};J++;e.monitorRunDependencies&&e.monitorRunDependencies(J);if(e.instantiateWasm)try{return e.instantiateWasm(d,
a)}catch(f){return D("Module.instantiateWasm callback failed with error: "+f),!1}(function(){return E||"function"!==typeof WebAssembly.instantiateStreaming||Fa()||L.startsWith("file://")||"function"!==typeof fetch?c(b):fetch(L,{credentials:"same-origin"}).then(function(f){return WebAssembly.instantiateStreaming(f,d).then(b,function(g){D("wasm streaming compile failed: "+g);D("falling back to ArrayBuffer instantiation");return c(b)})})})().catch(ba);return{}})();
e.___wasm_call_ctors=function(){return(e.___wasm_call_ctors=e.asm.s).apply(null,arguments)};var Tb=e._Highs_create=function(){return(Tb=e._Highs_create=e.asm.t).apply(null,arguments)},Ub=e._Highs_destroy=function(){return(Ub=e._Highs_destroy=e.asm.u).apply(null,arguments)},Vb=e._Highs_run=function(){return(Vb=e._Highs_run=e.asm.v).apply(null,arguments)};e._Highs_readModel=function(){return(e._Highs_readModel=e.asm.w).apply(null,arguments)};
e._Highs_writeSolution=function(){return(e._Highs_writeSolution=e.asm.x).apply(null,arguments)};e._Highs_writeSolutionPretty=function(){return(e._Highs_writeSolutionPretty=e.asm.y).apply(null,arguments)};e._Highs_setBoolOptionValue=function(){return(e._Highs_setBoolOptionValue=e.asm.z).apply(null,arguments)};e._Highs_setIntOptionValue=function(){return(e._Highs_setIntOptionValue=e.asm.A).apply(null,arguments)};
e._Highs_setDoubleOptionValue=function(){return(e._Highs_setDoubleOptionValue=e.asm.B).apply(null,arguments)};e._Highs_setStringOptionValue=function(){return(e._Highs_setStringOptionValue=e.asm.C).apply(null,arguments)};var Wb=e._Highs_getModelStatus=function(){return(Wb=e._Highs_getModelStatus=e.asm.D).apply(null,arguments)};e._Highs_call=function(){return(e._Highs_call=e.asm.E).apply(null,arguments)};
var Rb=e.___errno_location=function(){return(Rb=e.___errno_location=e.asm.F).apply(null,arguments)},ra=e.stackSave=function(){return(ra=e.stackSave=e.asm.G).apply(null,arguments)},sa=e.stackRestore=function(){return(sa=e.stackRestore=e.asm.H).apply(null,arguments)},pa=e.stackAlloc=function(){return(pa=e.stackAlloc=e.asm.I).apply(null,arguments)},Qb=e._malloc=function(){return(Qb=e._malloc=e.asm.J).apply(null,arguments)};
e.cwrap=function(a,b,c,d){c=c||[];var f=c.every(function(g){return"number"===g});return"string"!==b&&f&&!d?na(a):function(){return oa(a,b,c,arguments)}};var Xb;K=function Yb(){Xb||Zb();Xb||(K=Yb)};
function Zb(){function a(){if(!Xb&&(Xb=!0,e.calledRun=!0,!ma)){e.noFSInit||Db||(Db=!0,Cb(),e.stdin=e.stdin,e.stdout=e.stdout,e.stderr=e.stderr,e.stdin?V("stdin",e.stdin):vb("/dev/tty","/dev/stdin"),e.stdout?V("stdout",null,e.stdout):vb("/dev/tty","/dev/stdout"),e.stderr?V("stderr",null,e.stderr):vb("/dev/tty1","/dev/stderr"),U("/dev/stdin",0),U("/dev/stdout",1),U("/dev/stderr",1));gb=!1;Ka(Ba);aa(e);if(e.onRuntimeInitialized)e.onRuntimeInitialized();if(e.postRun)for("function"==typeof e.postRun&&
(e.postRun=[e.postRun]);e.postRun.length;){var b=e.postRun.shift();Ca.unshift(b)}Ka(Ca)}}if(!(0<J)){if(e.preRun)for("function"==typeof e.preRun&&(e.preRun=[e.preRun]);e.preRun.length;)Da();Ka(Aa);0<J||(e.setStatus?(e.setStatus("Running..."),setTimeout(function(){setTimeout(function(){e.setStatus("")},1);a()},1)):a())}}e.run=Zb;if(e.preInit)for("function"==typeof e.preInit&&(e.preInit=[e.preInit]);0<e.preInit.length;)e.preInit.pop()();Zb();e.ta=e.cwrap("Highs_readModel","number",["number","string"]);
const $b=e.cwrap("Highs_setIntOptionValue","number",["number","string","number"]),ac=e.cwrap("Highs_setDoubleOptionValue","number",["number","string","number"]),bc=e.cwrap("Highs_setStringOptionValue","number",["number","string","string"]),cc=e.cwrap("Highs_setBoolOptionValue","number",["number","string","number"]);e.ua=e.cwrap("Highs_writeSolutionPretty","number",["number","string"]);
const dc={0:"Not Set",1:"Load error",2:"Model error",3:"Presolve error",4:"Solve error",5:"Postsolve error",6:"Empty",7:"Optimal",8:"Infeasible",9:"Primal infeasible or unbounded",10:"Unbounded",11:"Bound on objective reached",12:"Target for objective reached",13:"Time limit reached",14:"Iteration limit reached",15:"Unknown"};
e.solve=function(a,b){Ab(a);const c=Tb();ec(()=>e.ta(c,"m.lp"),"read LP model (see http://web.mit.edu/lpsolve/doc/CPLEX-format.htm)");a=b||{};for(const d in a){const f=a[d];b=typeof f;let g;if("number"===b)g=fc;else if("boolean"===b)g=cc;else if("string"===b)g=bc;else throw Error(`Unsupported option value type ${f} for '${d}'`);ec(()=>g(c,d,f),`set option '${d}'`)}ec(()=>Vb(c),"solve the problem");a=dc[Wb(c,0)]||"Unknown";k.length=0;ec(()=>e.ua(c,""),"write and extract solution");Ub(c);a=gc(a);k.length=
0;ca.length=0;return a};function fc(a,b,c){let d=ac(a,b,c);-1===d&&c===(c|0)&&(d=$b(a,b,c));return d}function hc(a){return"inf"===a?1/0:"-inf"===a?-1/0:+a}const ic={Index:a=>parseInt(a),Lower:hc,Upper:hc,Primal:hc,Dual:hc};function jc(a,b){const c=b.match(/[^\s]+/g)||[],d={};for(let g=0;g<c.length;g++){if(g>=a.length)throw Error("Unable to parse solution line: "+b);var f=c[g];const l=a[g],n=ic[l];f=n?n(f):f;d[l]=f}return d}
function gc(a){if(3>k.length)throw Error("Unable to parse solution. Too few lines.");let b=kc(k[1],k[2]);var c=!b.includes("Status")&&b.includes("Dual"),d=!b.includes("Type")&&!c;a={Status:a,Columns:{},Rows:[],IsLinear:d,IsQuadratic:c,ObjectiveValue:NaN};for(c=2;"Rows"!=k[c];c++)d=jc(b,k[c]),a.Columns[d.Name]=d;b=kc(k[c+1],k[c+2]);for(c+=2;""!=k[c];c++)a.Rows.push(jc(b,k[c]));a.ObjectiveValue=hc(k[c+3].match(/Objective value: (.+)/)[1]);return a}
function kc(a,b){return[...a.matchAll(/[^\s]+/g)].filter(c=>" "!==b[c.index]||" "!==b[c.index+c[0].length-1]).map(c=>c[0])}function ec(a,b){let c;try{c=a()}catch(d){c=d}if(0!==c&&1!==c)throw Error("Unable to "+b+". HiGHS error "+c);};


  return Module.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = Module;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return Module; });
else if (typeof exports === 'object')
  exports["Module"] = Module;
