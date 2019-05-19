'use strict'
const md5 = require('md5.min.js');
const signKey = "053ef899Af294A36bB5ae1730c7995E8";
/** 头部参数签名
 * @param params 头部参数字典
 * @return 签名后的头部信息字符串（String） 
 */
function signRequestHeader(params) {
    
    //添加当前时间戳
    var queryParams = params;//Object.assign({"SignatureStamp" : (new Date).getTime().toString()}, params)
    queryParams["SignatureStamp"] = (new Date).getTime().toString();
    //获取排序key
    var sortkeys = allKeysSorted(queryParams);
    
    //生成query数组
    var codeParis = [];
    var queryParis = [];
    var i = sortkeys.length;
    while (i--) {
        codeParis.push(sortkeys[i] + "=" + queryParams[sortkeys[i]]);
        queryParis.push(sortkeys[i] + "=" + encodeURIComponent(queryParams[sortkeys[i]]));
    }
    //生成签名 md5("a=a&b=b&c=c"+"签名key")
    var signString = md5(codeParis.join('&').toLocaleLowerCase().concat(signKey));

    //生成querySting
    queryParis.push("SignatureMD5" + "=" + signString);
    var query =  queryParis.join('&');
    return query;
}

/** 请求参数签名
 * @param params 请求参数字典
 * @return 签名后的参数字符串（String） 
 */
function signRequestParams(params,key) {
    
    //添加当前时间戳
    var queryParams = params;//Object.assign({}, params)
    //获取排序key
    var sortkeys = allKeysSorted(queryParams);
    //生成query数组
    var queryParis = [];
    var outParams = {};
    var i = sortkeys.length;
    while (i--) {
        queryParis.push(sortkeys[i] + "=" + queryParams[sortkeys[i]]);
        outParams[sortkeys[i]] = queryParams[sortkeys[i]];
    }
    //生成签名 md5("a=a&b=b&c=c"+"签名key")
  var signString = md5(queryParis.join('&').toLocaleLowerCase().concat(key||signKey));
    //生成querySting
    // queryParis.push("SignatureMD5" + "=" + signString);
    outParams["SignatureMD5"] = signString;
    // var query =  queryParis.join('&');
    return outParams;
}

/** 请求参数签名
 * @param params 请求参数字典
 * @return 签名后的参数字符串（String） 
 */
function signPostRequestParams(params) {
    
    //添加当前时间戳
    var queryParams = params;//Object.assign({}, params)
    //获取排序key
    var sortkeys = allKeysSorted(queryParams);
    //生成query数组
    var queryParis = [];
    var codeParis = [];
    var i = sortkeys.length;
    while (i--) {
        codeParis.push(sortkeys[i] + "=" + queryParams[sortkeys[i]]);
        queryParis.push(sortkeys[i] + "=" + encodeURIComponent(queryParams[sortkeys[i]]));
    }
    //生成签名 md5("a=a&b=b&c=c"+"签名key")
    var signString = md5(codeParis.join('&').toLocaleLowerCase().concat(signKey));
    //生成querySting
    queryParis.push("SignatureMD5" + "=" + signString);
    var query =  queryParis.join('&');
    return query;
}

/** 获取字典所有key，并按首字母升序排序（从小到大）
 * @param dic 字典
 * @return 排序的keys
 */
function allKeysSorted(dic) {
    var sortkeys = [];
    for (var key in dic) {
        sortkeys.push(key);
    }
    sortkeys.sort().reverse();
    return sortkeys;
}
/**
 * 数组排序  
 */
function comparator(a, b){
    return a.localeCompare(b);
}





//base64加密
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
  　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  　　52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  　　-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  　　15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  　　-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  　　41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
};




module.exports = {
    header: signRequestHeader,
    params: signRequestParams,
    postParams: signPostRequestParams,
    base64encode
}