/*v0.5vv_20190312_syb_scopedata*/global.__wcc_version__='v0.5vv_20190312_syb_scopedata';global.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx1=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
$gwx('init', global);
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx1:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, c){
p.extraAttr = {"t_action": a, "t_cid": c};
}

function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx1 || [];
function gz$gwx1_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx1_1)return __WXML_GLOBAL__.ops_cached.$gwx1_1
__WXML_GLOBAL__.ops_cached.$gwx1_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'is_check_user']])
})(__WXML_GLOBAL__.ops_cached.$gwx1_1);return __WXML_GLOBAL__.ops_cached.$gwx1_1
}
function gz$gwx1_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx1_2)return __WXML_GLOBAL__.ops_cached.$gwx1_2
__WXML_GLOBAL__.ops_cached.$gwx1_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[2,'>'],[[6],[[7],[3,'sign']],[3,'length']],[1,0]])
Z([[7],[3,'sign']])
Z([3,'index'])
Z([[7],[3,'item']])
Z([3,'content'])
Z([[8],'wxParseData',[[6],[[7],[3,'article']],[3,'nodes']]])
Z([3,'wxParse'])
Z([3,'footer'])
Z([a,[3,'height:'],[[2,'?:'],[[7],[3,'isIphoneX']],[1,'168'],[1,'100']],[3,'rpx']])
Z([[2,'=='],[[6],[[7],[3,'active']],[3,'is_sign']],[1,1]])
Z([[2,'=='],[[6],[[7],[3,'active']],[3,'is_sign']],[1,2]])
Z([[2,'=='],[[6],[[7],[3,'active']],[3,'is_sign']],[1,3]])
Z([[7],[3,'isShow']])
Z([3,'preventDefault'])
Z([a,[3,'model_mask '],[[2,'?:'],[[7],[3,'isShow']],[1,'position1'],[1,'position0']]])
Z([[7],[3,'spec']])
Z(z[2])
Z([3,'selectItem'])
Z([3,'active_item'])
Z([[6],[[7],[3,'item']],[3,'id']])
Z([[6],[[7],[3,'item']],[3,'sale']])
Z([a,[3,'border: 1rpx '],[[2,'?:'],[[6],[[7],[3,'item']],[3,'sale']],[1,'solid'],[1,'dashed']],[3,' '],[[2,'?:'],[[6],[[7],[3,'item']],[3,'select']],[[6],[[7],[3,'farmSetData']],[3,'background_color']],[1,'gray']]])
Z([[6],[[7],[3,'item']],[3,'select']])
})(__WXML_GLOBAL__.ops_cached.$gwx1_2);return __WXML_GLOBAL__.ops_cached.$gwx1_2
}
function gz$gwx1_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx1_3)return __WXML_GLOBAL__.ops_cached.$gwx1_3
__WXML_GLOBAL__.ops_cached.$gwx1_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'isContent']])
Z([[7],[3,'activeList']])
Z([3,'index'])
Z([3,'intoActiveDetail'])
Z([3,'active_wrapper'])
Z([[6],[[7],[3,'item']],[3,'id']])
Z([[6],[[7],[3,'item']],[3,'finish']])
Z([[7],[3,'is_tarbar']])
Z([[7],[3,'SystemInfo']])
Z([[7],[3,'tarbar']])
Z([3,'kundian_active/pages/index/index'])
})(__WXML_GLOBAL__.ops_cached.$gwx1_3);return __WXML_GLOBAL__.ops_cached.$gwx1_3
}
function gz$gwx1_4(){
if( __WXML_GLOBAL__.ops_cached.$gwx1_4)return __WXML_GLOBAL__.ops_cached.$gwx1_4
__WXML_GLOBAL__.ops_cached.$gwx1_4=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[2,'>'],[[6],[[7],[3,'orderList']],[3,'length']],[1,0]])
Z([[7],[3,'orderList']])
Z([3,'id'])
Z([3,'btnArr'])
Z([[2,'&&'],[[2,'=='],[[6],[[7],[3,'item']],[3,'is_check']],[1,0]],[[2,'=='],[[6],[[7],[3,'item']],[3,'is_pay']],[1,1]]])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'apply_delete']],[1,2]])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'is_check']],[1,3]])
Z([[2,'&&'],[[2,'=='],[[6],[[7],[3,'item']],[3,'is_pay']],[1,0]],[[2,'=='],[[6],[[7],[3,'item']],[3,'apply_delete']],[1,0]]])
Z(z[7])
Z(z[4])
Z([[2,'&&'],[[2,'=='],[[6],[[7],[3,'item']],[3,'is_check']],[1,1]],[[2,'=='],[[6],[[7],[3,'item']],[3,'is_pay']],[1,1]]])
})(__WXML_GLOBAL__.ops_cached.$gwx1_4);return __WXML_GLOBAL__.ops_cached.$gwx1_4
}
function gz$gwx1_5(){
if( __WXML_GLOBAL__.ops_cached.$gwx1_5)return __WXML_GLOBAL__.ops_cached.$gwx1_5
__WXML_GLOBAL__.ops_cached.$gwx1_5=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx1_5);return __WXML_GLOBAL__.ops_cached.$gwx1_5
}
function gz$gwx1_6(){
if( __WXML_GLOBAL__.ops_cached.$gwx1_6)return __WXML_GLOBAL__.ops_cached.$gwx1_6
__WXML_GLOBAL__.ops_cached.$gwx1_6=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx1_6);return __WXML_GLOBAL__.ops_cached.$gwx1_6
}
function gz$gwx1_7(){
if( __WXML_GLOBAL__.ops_cached.$gwx1_7)return __WXML_GLOBAL__.ops_cached.$gwx1_7
__WXML_GLOBAL__.ops_cached.$gwx1_7=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'confirm'])
Z([3,'true'])
Z([[6],[[7],[3,'active']],[3,'add_info']])
Z([[7],[3,'signList']])
Z([3,'id'])
Z([3,'loop_content'])
Z([[2,'>='],[[7],[3,'index']],[1,1]])
Z([3,'info_index'])
Z([3,'info'])
Z(z[2])
Z([3,'info_id'])
Z([3,'info_item'])
Z([[2,'=='],[[7],[3,'info']],[1,'姓名']])
Z([[2,'=='],[[7],[3,'info']],[1,'联系电话']])
Z([[2,'=='],[[7],[3,'info']],[1,'身份证号']])
Z(z[3])
Z(z[4])
Z(z[6])
Z([[2,'>'],[[7],[3,'selectNum']],[[6],[[7],[3,'signList']],[3,'length']]])
})(__WXML_GLOBAL__.ops_cached.$gwx1_7);return __WXML_GLOBAL__.ops_cached.$gwx1_7
}
function gz$gwx1_8(){
if( __WXML_GLOBAL__.ops_cached.$gwx1_8)return __WXML_GLOBAL__.ops_cached.$gwx1_8
__WXML_GLOBAL__.ops_cached.$gwx1_8=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx1_8);return __WXML_GLOBAL__.ops_cached.$gwx1_8
}
__WXML_GLOBAL__.ops_set.$gwx1=z;
__WXML_GLOBAL__.ops_init.$gwx1=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./kundian_active/pages/check/index.wxml','./kundian_active/pages/details/index.wxml','../../../wxParse/wxParse.wxml','./kundian_active/pages/index/index.wxml','./kundian_active/pages/orderList/index.wxml','./kundian_active/pages/payforResult/index.wxml','./kundian_active/pages/signInfo/index.wxml','./kundian_active/pages/signform/index.wxml','./kundian_active/pages/ticket/index.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx1_1()
var oB=_v()
_(r,oB)
if(_oz(z,0,e,s,gg)){oB.wxVkey=1
}
oB.wxXCkey=1
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx1_2()
var fE=_n('view')
var cF=_v()
_(fE,cF)
if(_oz(z,0,e,s,gg)){cF.wxVkey=1
var hG=_v()
_(cF,hG)
var oH=function(oJ,cI,lK,gg){
var tM=_v()
_(lK,tM)
if(_oz(z,3,oJ,cI,gg)){tM.wxVkey=1
}
tM.wxXCkey=1
return lK
}
hG.wxXCkey=2
_2z(z,1,oH,e,s,gg,hG,'item','index','index')
}
var eN=_n('view')
_rz(z,eN,'class',4,e,s,gg)
var bO=e_[x[1]].i
_ai(bO,x[2],e_,x[1],53,18)
var oP=_v()
_(eN,oP)
var xQ=_oz(z,6,e,s,gg)
var oR=_gd(x[1],xQ,e_,d_)
if(oR){
var fS=_1z(z,5,e,s,gg) || {}
var cur_globalf=gg.f
oP.wxXCkey=3
oR(fS,fS,oP,gg)
gg.f=cur_globalf
}
else _w(xQ,x[1],55,34)
bO.pop()
_(fE,eN)
var cT=_mz(z,'view',['class',7,'style',1],[],e,s,gg)
var hU=_v()
_(cT,hU)
if(_oz(z,9,e,s,gg)){hU.wxVkey=1
}
var oV=_v()
_(cT,oV)
if(_oz(z,10,e,s,gg)){oV.wxVkey=1
}
var cW=_v()
_(cT,cW)
if(_oz(z,11,e,s,gg)){cW.wxVkey=1
}
hU.wxXCkey=1
oV.wxXCkey=1
cW.wxXCkey=1
_(fE,cT)
cF.wxXCkey=1
_(r,fE)
var oD=_v()
_(r,oD)
if(_oz(z,12,e,s,gg)){oD.wxVkey=1
}
var oX=_mz(z,'view',['catchtouchmove',13,'class',1],[],e,s,gg)
var lY=_v()
_(oX,lY)
var aZ=function(e2,t1,b3,gg){
var x5=_mz(z,'view',['bindtap',17,'class',1,'data-id',2,'data-sale',3,'style',4],[],e2,t1,gg)
var o6=_v()
_(x5,o6)
if(_oz(z,22,e2,t1,gg)){o6.wxVkey=1
}
o6.wxXCkey=1
_(b3,x5)
return b3
}
lY.wxXCkey=2
_2z(z,15,aZ,e,s,gg,lY,'item','index','index')
_(r,oX)
oD.wxXCkey=1
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[3]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx1_3()
var c8=_v()
_(r,c8)
if(_oz(z,0,e,s,gg)){c8.wxVkey=1
var o0=_v()
_(c8,o0)
var cAB=function(lCB,oBB,aDB,gg){
var eFB=_mz(z,'view',['bindtap',3,'class',1,'data-activeid',2],[],lCB,oBB,gg)
var bGB=_v()
_(eFB,bGB)
if(_oz(z,6,lCB,oBB,gg)){bGB.wxVkey=1
}
bGB.wxXCkey=1
_(aDB,eFB)
return aDB
}
o0.wxXCkey=2
_2z(z,1,cAB,e,s,gg,o0,'item','index','index')
}
else{c8.wxVkey=2
}
var h9=_v()
_(r,h9)
if(_oz(z,7,e,s,gg)){h9.wxVkey=1
var oHB=_mz(z,'tarbar',['SystemInfo',8,'list',1,'path',2],[],e,s,gg)
_(h9,oHB)
}
c8.wxXCkey=1
h9.wxXCkey=1
h9.wxXCkey=3
return r
}
e_[x[3]]={f:m2,j:[],i:[],ti:[],ic:[]}
d_[x[4]]={}
var m3=function(e,s,r,gg){
var z=gz$gwx1_4()
var oJB=_n('view')
var fKB=_v()
_(oJB,fKB)
if(_oz(z,0,e,s,gg)){fKB.wxVkey=1
var cLB=_v()
_(fKB,cLB)
var hMB=function(cOB,oNB,oPB,gg){
var aRB=_n('view')
_rz(z,aRB,'class',3,cOB,oNB,gg)
var tSB=_v()
_(aRB,tSB)
if(_oz(z,4,cOB,oNB,gg)){tSB.wxVkey=1
}
var eTB=_v()
_(aRB,eTB)
if(_oz(z,5,cOB,oNB,gg)){eTB.wxVkey=1
}
var bUB=_v()
_(aRB,bUB)
if(_oz(z,6,cOB,oNB,gg)){bUB.wxVkey=1
}
var oVB=_v()
_(aRB,oVB)
if(_oz(z,7,cOB,oNB,gg)){oVB.wxVkey=1
}
var xWB=_v()
_(aRB,xWB)
if(_oz(z,8,cOB,oNB,gg)){xWB.wxVkey=1
}
var oXB=_v()
_(aRB,oXB)
if(_oz(z,9,cOB,oNB,gg)){oXB.wxVkey=1
}
var fYB=_v()
_(aRB,fYB)
if(_oz(z,10,cOB,oNB,gg)){fYB.wxVkey=1
}
tSB.wxXCkey=1
eTB.wxXCkey=1
bUB.wxXCkey=1
oVB.wxXCkey=1
xWB.wxXCkey=1
oXB.wxXCkey=1
fYB.wxXCkey=1
_(oPB,aRB)
return oPB
}
cLB.wxXCkey=2
_2z(z,1,hMB,e,s,gg,cLB,'item','index','id')
}
else{fKB.wxVkey=2
}
fKB.wxXCkey=1
_(r,oJB)
return r
}
e_[x[4]]={f:m3,j:[],i:[],ti:[],ic:[]}
d_[x[5]]={}
var m4=function(e,s,r,gg){
var z=gz$gwx1_5()
return r
}
e_[x[5]]={f:m4,j:[],i:[],ti:[],ic:[]}
d_[x[6]]={}
var m5=function(e,s,r,gg){
var z=gz$gwx1_6()
return r
}
e_[x[6]]={f:m5,j:[],i:[],ti:[],ic:[]}
d_[x[7]]={}
var m6=function(e,s,r,gg){
var z=gz$gwx1_7()
var c3B=_mz(z,'form',['bindsubmit',0,'reportSubmit',1],[],e,s,gg)
var o4B=_v()
_(c3B,o4B)
if(_oz(z,2,e,s,gg)){o4B.wxVkey=1
var a6B=_v()
_(o4B,a6B)
var t7B=function(b9B,e8B,o0B,gg){
var oBC=_n('view')
_rz(z,oBC,'class',5,b9B,e8B,gg)
var fCC=_v()
_(oBC,fCC)
if(_oz(z,6,b9B,e8B,gg)){fCC.wxVkey=1
}
var cDC=_v()
_(oBC,cDC)
var hEC=function(cGC,oFC,oHC,gg){
var aJC=_n('view')
_rz(z,aJC,'class',11,cGC,oFC,gg)
var tKC=_v()
_(aJC,tKC)
if(_oz(z,12,cGC,oFC,gg)){tKC.wxVkey=1
}
var eLC=_v()
_(aJC,eLC)
if(_oz(z,13,cGC,oFC,gg)){eLC.wxVkey=1
}
var bMC=_v()
_(aJC,bMC)
if(_oz(z,14,cGC,oFC,gg)){bMC.wxVkey=1
}
tKC.wxXCkey=1
eLC.wxXCkey=1
bMC.wxXCkey=1
_(oHC,aJC)
return oHC
}
cDC.wxXCkey=2
_2z(z,9,hEC,b9B,e8B,gg,cDC,'info','info_index','info_id')
fCC.wxXCkey=1
_(o0B,oBC)
return o0B
}
a6B.wxXCkey=2
_2z(z,3,t7B,e,s,gg,a6B,'item','index','id')
}
else{o4B.wxVkey=2
var oNC=_v()
_(o4B,oNC)
var xOC=function(fQC,oPC,cRC,gg){
var oTC=_v()
_(cRC,oTC)
if(_oz(z,17,fQC,oPC,gg)){oTC.wxVkey=1
}
oTC.wxXCkey=1
return cRC
}
oNC.wxXCkey=2
_2z(z,15,xOC,e,s,gg,oNC,'item','index','id')
}
var l5B=_v()
_(c3B,l5B)
if(_oz(z,18,e,s,gg)){l5B.wxVkey=1
}
o4B.wxXCkey=1
l5B.wxXCkey=1
_(r,c3B)
return r
}
e_[x[7]]={f:m6,j:[],i:[],ti:[],ic:[]}
d_[x[8]]={}
var m7=function(e,s,r,gg){
var z=gz$gwx1_8()
return r
}
e_[x[8]]={f:m7,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
try{
main(env,{},root,global);
_tsd(root)
}catch(err){
console.log(err)
}
return root;
}
}
}
	__wxAppCode__['kundian_active/pages/index/index.json'] = {"navigationBarTitleText":"活动","navigationBarBackgroundColor":"#fff","navigationBarTextStyle":"black","enablePullDownRefresh":true,"usingComponents":{"tarbar":"/components/tarbar/tarbar"}};
		if (__vd_version_info__.delayedGwx) __wxAppCode__['kundian_active/pages/index/index.wxml'] = [$gwx1, './kundian_active/pages/index/index.wxml'];else __wxAppCode__['kundian_active/pages/index/index.wxml'] = $gwx1( './kundian_active/pages/index/index.wxml' );
	
	__wxRoute = 'kundian_active/pages/index/index';__wxRouteBegin = true; 	__wxAppCurrentFile__ = 'kundian_active/pages/index/index.js';	define("kundian_active/pages/index/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var app=new getApp,uniacid=app.siteInfo.uniacid,mudule_name="kundian_farm_plugin_active",url=app.util.url("entry/wxapp/class")+"m="+mudule_name;Page({data:{SystemInfo:app.globalData.sysData,isIphoneX:app.globalData.isIphoneX,activeList:[],page:1,activeSet:[],currentIndex:1,farmSetData:[],tarbar:wx.getStorageSync("kundianFarmTarbar"),is_tarbar:!1,isContent:!0},onLoad:function(a){app.util.getUserInfo();var t=!1;a.is_tarbar&&(t=a.is_tarbar);var e=wx.getStorageSync("kundian_farm_setData");this.setData({farmSetData:e,tarbar:wx.getStorageSync("kundianFarmTarbar"),is_tarbar:t}),this.getActiveData(1,1,0),app.util.setNavColor(uniacid),wx.checkSession({success:function(a){console.log(a)},fail:function(a){console.log(a),wx.login()}})},getActiveData:function(e,a,i){wx.showLoading({title:"玩命加载中...."});var n=this,r=n.data.activeList;wx.request({url:url,data:{action:"active",op:"getActiveList",uniacid:uniacid,page:e,current:a},success:function(a){if(a.data.activeList){var t=a.data.activeList;1==i?t.map(function(a){r.push(a)}):(r=t,e=1),n.setData({activeList:r,page:e,activeSet:a.data.activeSetData}),wx.stopPullDownRefresh()}else n.setData({activeSet:a.data.activeSetData,isContent:!1});wx.setStorageSync("kundian_farm_active_set",a.data.activeSetData),wx.hideLoading()}})},onReachBottom:function(a){var t=parseInt(this.data.page)+1,e=this.data.currentIndex;this.getActiveData(t,e,1)},onPullDownRefresh:function(a){var t=this.data.currentIndex;this.getActiveData(1,t,0)},intoActiveDetail:function(a){var t=a.currentTarget.dataset.activeid;wx.navigateTo({url:"../details/index?activeid="+t})},changeIndex:function(a){var t=a.currentTarget.dataset.index;this.getActiveData(1,t,0),this.setData({currentIndex:t})},onShareAppMessage:function(a){}}); 
 			}); 	require("kundian_active/pages/index/index.js");
 		__wxRoute = 'kundian_active/pages/details/index';__wxRouteBegin = true; 	define("kundian_active/pages/details/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var app=new getApp,uniacid=app.siteInfo.uniacid,mudule_name="kundian_farm_plugin_active",WxParse=require("../../../wxParse/wxParse.js"),url=app.util.url("entry/wxapp/class")+"m="+mudule_name;Page({data:{sign:[],activeList:[],isShow:!1,selectNum:1,total:0,active:[],farmSetData:[],sign_order:[],isIphoneX:app.globalData.isIphoneX},onLoad:function(t){var o=this,a=t.activeid,e=wx.getStorageSync("kundian_farm_uid"),r=wx.getStorageSync("kundian_farm_setData");wx.request({url:url,data:{action:"active",op:"getActiveDetail",uniacid:uniacid,active_id:a,uid:e},success:function(t){var a=t.data,e=a.active,i=a.spec,n=a.sign_user,s=a.sign_count,c=a.sign_order;o.setData({active:e,spec:i,sign:n,sign_count:s,farmSetData:r,sign_order:c}),""!=t.data.active.detail&&WxParse.wxParse("article","html",t.data.active.detail,o,5)}}),app.util.setNavColor(uniacid)},call:function(){wx.makePhoneCall({phoneNumber:this.data.active.phone.toString()})},gotomap:function(){var t=this.data.active;wx.openLocation({latitude:parseFloat(t.latitude),longitude:parseFloat(t.longitude),address:t.address,scale:28})},preventDefault:function(){},selectItem:function(t){var a=[t.currentTarget.dataset.id,this.data.spec],e=a[0],i=a[1];i.map(function(t){t.select=!1,t.id==e&&(t.select=!0)}),this.setData({spec:i}),this.sumPrice()},reduce:function(){var t=this.data.selectNum;t<=1||(t-=1,this.setData({selectNum:t}),this.sumPrice())},add:function(){var t=this.data.selectNum;t+=1,this.setData({selectNum:t}),this.sumPrice()},sumPrice:function(){var t=[this.data.selectNum,this.data.spec,0],a=t[0],e=t[2];t[1].map(function(t){t.select&&(e=t.price*a)}),this.setData({total:e.toFixed(2)})},close:function(){this.setData({isShow:!1})},signUp:function(){this.setData({isShow:!0})},toPay:function(t){var a=this;if(wx.getStorageSync("kundian_farm_uid")){var e=a.data.selectNum,i=a.data.active;if(0<i.count&&i.count-i.person_count<e)return wx.showModal({title:"提示",content:"当前余票不足！剩余"+(i.count-i.person_count)+"张"}),!1;var n=this.data.spec,s=new Array;if(n.map(function(t){t.select&&(s=t)}),0==s.length)wx.showToast({title:"请选择规格！"});else{var c=a.data.active,o=a.data.total;wx.navigateTo({url:"../signform/index?activeid="+c.id+"&total="+o+"&selectNum="+e+"&spec="+JSON.stringify(s)})}}else wx.navigateTo({url:"/kundian_farm/pages/login/index"})},goHome:function(){wx.reLaunch({url:"/kundian_farm/pages/HomePage/index/index?is_tarbar=true"})},intoSignInfo:function(t){var a=t.currentTarget.dataset.activeid;console.log(a),wx.navigateTo({url:"../signInfo/index?active_id="+a})},openQrcode:function(t){var a=this.data.sign_order;wx.navigateTo({url:"../ticket/index?order_id="+a.id})},onShareAppMessage:function(t){var a=this.data.active;return{path:"kundian_active/pages/details/index?activeid="+a.id,success:function(t){},title:a.title}}}); 
 			}); 	require("kundian_active/pages/details/index.js");
 		__wxRoute = 'kundian_active/pages/signform/index';__wxRouteBegin = true; 	define("kundian_active/pages/signform/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var app=new getApp,uniacid=app.siteInfo.uniacid,mudule_name="kundian_farm_plugin_active",url=app.util.url("entry/wxapp/class")+"m="+mudule_name;Page({data:{signList:[{name:"",id:"0",tel:"",IDCard:""}],activeid:"",active:[],total:0,selectNum:0,spec:[],activeSet:wx.getStorageSync("kundian_farm_active_set"),farmSetData:[]},onLoad:function(a){var t=this,e=a.activeid,i=a.total,n=a.selectNum,s=JSON.parse(a.spec),d=wx.getStorageSync("kundian_farm_setData");wx.request({url:url,data:{action:"active",op:"getActiveConfirm",uniacid:uniacid,active_id:e},success:function(a){t.setData({active:a.data.active,activeid:e})}}),t.setData({spec:s,total:i,selectNum:n,farmSetData:d}),app.util.setNavColor(uniacid)},addSign:function(){var a=this.data.signList,t={id:a[a.length-1].id+1,name:"",tel:"",IDCard:""};a.push(t),this.setData({signList:a})},delete:function(a){var t=[a.currentTarget.dataset.index,this.data.signList],e=t[0],i=t[1];console.log(e),i.splice(e,1),this.setData({signList:i})},modifyName:function(a){var t=[a.currentTarget.dataset.index,a.detail.value,this.data.signList],e=t[1],i=t[2];i[t[0]].name=e,this.setData({signList:i})},modifytel:function(a){var t=[a.currentTarget.dataset.index,a.detail.value,this.data.signList],e=t[1],i=t[2];i[t[0]].tel=e,this.setData({signList:i})},modifyidcard:function(a){var t=[a.currentTarget.dataset.index,a.detail.value,this.data.signList],e=t[1],i=t[2];i[t[0]].IDCard=e,this.setData({signList:i})},confirm:function(a){var n=wx.getStorageSync("kundian_farm_uid");if(n){for(var t=this.data,e=t.signList,i=t.activeid,s=t.spec,d=t.selectNum,c=t.total,r=t.active,o=0;o<e.length;o++)for(var u=0;u<r.add_info.length;u++){if("姓名"==r.add_info[u]&&""==e[o].name)return wx.showToast({title:"请填写"+r.add_info[u]}),!1;if("联系电话"==r.add_info[u]&&""==e[o].tel)return wx.showToast({title:"请填写"+r.add_info[u]}),!1;if("身份证号"==r.add_info[u]&&""==e[o].IDCard)return wx.showToast({title:"请填写"+r.add_info[u]}),!1}var l=app.util.url("entry/wxapp/class")+"m="+mudule_name+"&op=addOrder&action=active";wx.showLoading({title:"加载中"}),wx.request({url:l,method:"POST",data:{sign:JSON.stringify(e),activeid:i,spec:JSON.stringify(s),selectNum:d,total:c,uid:n,uniacid:uniacid,formid:a.detail.formId},success:function(a){if(1==a.data.code){var i=a.data.order_id;if(0<c)app.util.request({url:"entry/wxapp/activePay",data:{orderid:i,uniacid:uniacid},cachetime:"0",success:function(a){if(a.data&&a.data.data&&!a.data.errno){var e=a.data.data.package;wx.requestPayment({timeStamp:a.data.data.timeStamp,nonceStr:a.data.data.nonceStr,package:a.data.data.package,signType:"MD5",paySign:a.data.data.paySign,success:function(a){wx.showLoading({title:"加载中..."});var t=app.util.url("entry/wxapp/class")+"m="+mudule_name;wx.request({url:t,data:{action:"active",op:"notify",uniacid:uniacid,uid:n,orderid:i,prepay_id:e},success:function(a){wx.hideLoading(),wx.showToast({title:"支付成功",success:function(a){wx.redirectTo({url:"../payforResult/index?status=true&order_id="+i})}})}})},fail:function(a){wx.showModal({title:"提示",content:"您取消了支付",showCancel:!1,success:function(){wx.redirectTo({url:"../orderList/index"})}})}})}"JSAPI支付必须传openid"==a.data.message&&wx.navigateTo({url:"../../login/index"}),"当前余票不足"==a.data.message&&wx.showModal({title:"提示",content:a.data.message,showCancel:!1})},fail:function(a){wx.showModal({title:"系统提示",content:a.data.message?a.data.message:"错误",showCancel:!1,success:function(a){a.confirm}})}});else{var t=app.util.url("entry/wxapp/active")+"m="+mudule_name;wx.request({url:t,data:{op:"notify",uniacid:uniacid,uid:n,orderid:i},success:function(a){wx.showToast({title:"支付成功",success:function(a){wx.redirectTo({url:"../payforResult/index?status=true&order_id="+i}),wx.hideLoading()}})}})}}else wx.hideLoading(),wx.showModal({title:"提示",content:a.data.msg,showCancel:!1})}})}else wx.navigateTo({url:"../../login/index"})}}); 
 			}); 	require("kundian_active/pages/signform/index.js");
 		__wxRoute = 'kundian_active/pages/payforResult/index';__wxRouteBegin = true; 	define("kundian_active/pages/payforResult/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";Page({data:{status:!0,order_id:0},onLoad:function(t){var e=t.status,a=t.order_id;"true"==e?wx.setNavigationBarTitle({title:"支付成功"}):wx.setNavigationBarTitle({title:"支付失败"}),this.setData({status:e,order_id:a})},seeQrcode:function(t){wx.redirectTo({url:"../ticket/index?order_id="+this.data.order_id})},goBack:function(t){wx.navigateBack({delta:1})},goHome:function(t){wx.reLaunch({url:"../../HomePage/index?is_tarbar=true"})}}); 
 			}); 	require("kundian_active/pages/payforResult/index.js");
 		__wxRoute = 'kundian_active/pages/ticket/index';__wxRouteBegin = true; 	define("kundian_active/pages/ticket/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var app=new getApp,uniacid=app.siteInfo.uniacid,mudule_name="kundian_farm_plugin_active";Page({data:{orderData:[],active:[]},onLoad:function(a){var e=this,t=wx.getStorageSync("kundian_farm_uid"),i=app.util.url("entry/wxapp/class")+"m="+mudule_name;wx.request({url:i,data:{action:"order",op:"getQrcode",uniacid:uniacid,order_id:a.order_id,uid:t},success:function(a){e.setData({orderData:a.data.orderData,active:a.data.active})}}),app.util.setNavColor(uniacid)},intoMap:function(a){var e=this.data,t=e.latitude,i=(e.longitude,e.address);wx.openLocation({latitude:parseFloat(t),longitude:parseFloat(longitudee),address:i,scale:28})},doCall:function(a){wx.makePhoneCall({phoneNumber:this.data.active.phone})}}); 
 			}); 	require("kundian_active/pages/ticket/index.js");
 		__wxRoute = 'kundian_active/pages/orderList/index';__wxRouteBegin = true; 	define("kundian_active/pages/orderList/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var app=new getApp,uniacid=app.siteInfo.uniacid,mudule_name="kundian_farm_plugin_active";Page({data:{currentIndex:"1",orderList:[],page:1,farmSetData:wx.getStorageSync("kundian_farm_setData")},onLoad:function(a){this.getOrderData(1,1,0),app.util.setNavColor(uniacid)},getOrderData:function(a,n,i){var r=this,t=app.util.url("entry/wxapp/class")+"m="+mudule_name,e=wx.getStorageSync("kundian_farm_uid");wx.request({url:t,data:{action:"order",op:"getOrderList",uniacid:uniacid,uid:e,page:n,current:a},success:function(a){if(a.data.orderList){var t=r.data.orderList,e=a.data.orderList;1==i?e.map(function(a){t.push(a)}):(t=e,n=1),r.setData({orderList:t,page:n})}}})},changeIndex:function(a){var t=a.currentTarget.dataset.index;this.getOrderData(t,1,0),this.setData({currentIndex:a.currentTarget.dataset.index})},onReachBottom:function(a){var t=this.data.changeIndex,e=parseInt(this.data.page)+1;this.getOrderData(t,e,1)},onPullDownRefresh:function(a){var t=this.data.changeIndex;this.getOrderData(t,1,1)},cancelOrder:function(a){var t=this,e=this.data.changeIndex,n=wx.getStorageSync("kundian_farm_uid"),i=a.currentTarget.dataset.orderid,r=app.util.url("entry/wxapp/class")+"m="+mudule_name;wx.showModal({title:"提示",content:"确认取消订单吗？",success:function(a){a.confirm&&wx.request({url:r,data:{action:"order",op:"cancelOrder",uniacid:uniacid,order_id:i,uid:n},success:function(a){1==a.data.code?wx.showModal({title:"提示",content:a.data.msg,showCancel:!1,success:function(a){t.getOrderData(e,1,0)}}):wx.showModal({title:"提示",content:a.data.msg,showCancel:!1})}})}})},nowPay:function(a){var n=a.currentTarget.dataset.orderid;app.util.request({url:"entry/wxapp/activePay",data:{orderid:n,uniacid:uniacid},cachetime:"0",success:function(a){if(a.data&&a.data.data&&!a.data.errno){var e=a.data.data.package;wx.requestPayment({timeStamp:a.data.data.timeStamp,nonceStr:a.data.data.nonceStr,package:a.data.data.package,signType:"MD5",paySign:a.data.data.paySign,success:function(a){var t=app.util.url("entry/wxapp/active")+"m="+mudule_name;wx.request({url:t,data:{op:"notify",uniacid:uniacid,uid:uid,orderid:n,prepay_id:e},success:function(a){wx.hideLoading(),wx.showToast({title:"支付成功",success:function(a){wx.redirectTo({url:"../payforResult/index?status=true&order_id="+n})}})}})},fail:function(a){wx.showModal({title:"提示",content:"您取消了支付",showCancel:!1})}})}"JSAPI支付必须传openid"==a.data.message&&wx.navigateTo({url:"../../login/index"})},fail:function(a){wx.showModal({title:"系统提示",content:a.data.message?a.data.message:"错误",showCancel:!1,success:function(a){a.confirm}})}})},seeTicket:function(a){var t=a.currentTarget.dataset.orderid;wx.navigateTo({url:"../ticket/index?order_id="+t})}}); 
 			}); 	require("kundian_active/pages/orderList/index.js");
 		__wxRoute = 'kundian_active/pages/signInfo/index';__wxRouteBegin = true; 	define("kundian_active/pages/signInfo/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var app=new getApp,uniacid=app.siteInfo.uniacid,mudule_name="kundian_farm_plugin_active";Page({data:{sign:[]},onLoad:function(a){var i=this,n=a.active_id;console.log(n);var t=app.util.url("entry/wxapp/active")+"m="+mudule_name;wx.request({url:t,data:{op:"getSignInfo",uniacid:uniacid,active_id:n},success:function(a){i.setData({sign:a.data.signInfo})}}),app.util.setNavColor(uniacid)}}); 
 			}); 	require("kundian_active/pages/signInfo/index.js");
 		__wxRoute = 'kundian_active/pages/check/index';__wxRouteBegin = true; 	define("kundian_active/pages/check/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){ 			
"use strict";var app=new getApp,uniacid=app.siteInfo.uniacid,mudule_name="kundian_farm_plugin_active",url=app.util.url("entry/wxapp/class")+"m="+mudule_name;Page({data:{orderData:[],is_check_user:[],farmSetData:[]},onLoad:function(a){var t=this,e=a.order_id,r=wx.getStorageSync("kundian_farm_uid"),i=wx.getStorageSync("kundian_farm_setData");wx.request({url:url,data:{action:"order",op:"getTicketData",order_number:e,uniacid:uniacid,uid:r},success:function(a){t.setData({orderData:a.data.orderData,is_check_user:a.data.is_check_user,farmSetData:i})}}),app.util.setNavColor(uniacid)},checkActive:function(a){var t=this,e=wx.getStorageSync("kundian_farm_uid"),r=t.data.orderData;wx.showModal({title:"提示",content:"确认核销该订单吗？",success:function(a){a.confirm&&wx.request({url:url,data:{action:"order",op:"checkActive",uniacid:uniacid,order_id:t.data.orderData.id,uid:e},success:function(a){0==a.data.code&&(r.status=4,t.setData({orderData:r})),wx.showModal({title:"提示",content:a.data.msg,showCancel:!1})}})}})}}); 
 			}); 	require("kundian_active/pages/check/index.js");
 	