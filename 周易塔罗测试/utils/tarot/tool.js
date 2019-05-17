function e(e) {
    return e < 10 ? "0" + e : e;
}

function n(e) {
    function n(e, n) {
        return e << n | e >>> 32 - n;
    }
    function t(e, n) {
        var t, r, o, i, s;
        return o = 2147483648 & e, i = 2147483648 & n, t = 1073741824 & e, r = 1073741824 & n, 
        s = (1073741823 & e) + (1073741823 & n), t & r ? 2147483648 ^ s ^ o ^ i : t | r ? 1073741824 & s ? 3221225472 ^ s ^ o ^ i : 1073741824 ^ s ^ o ^ i : s ^ o ^ i;
    }
    function r(e, n, t) {
        return e & n | ~e & t;
    }
    function o(e, n, t) {
        return e & t | n & ~t;
    }
    function i(e, n, t) {
        return e ^ n ^ t;
    }
    function s(e, n, t) {
        return n ^ (e | ~t);
    }
    function a(e, o, i, s, a, c, u) {
        return e = t(e, t(t(r(o, i, s), a), u)), t(n(e, c), o);
    }
    function c(e, r, i, s, a, c, u) {
        return e = t(e, t(t(o(r, i, s), a), u)), t(n(e, c), r);
    }
    function u(e, r, o, s, a, c, u) {
        return e = t(e, t(t(i(r, o, s), a), u)), t(n(e, c), r);
    }
    function p(e, r, o, i, a, c, u) {
        return e = t(e, t(t(s(r, o, i), a), u)), t(n(e, c), r);
    }
    function f(e) {
        var n, t = "", r = "";
        for (n = 0; n <= 3; n++) t += (r = "0" + (e >>> 8 * n & 255).toString(16)).substr(r.length - 2, 2);
        return t;
    }
    var g, d, h, l, S, v, w, _, m, x = Array();
    for (x = function(e) {
        for (var n, t = e.length, r = t + 8, o = 16 * ((r - r % 64) / 64 + 1), i = Array(o - 1), s = 0, a = 0; a < t; ) s = a % 4 * 8, 
        i[n = (a - a % 4) / 4] = i[n] | e.charCodeAt(a) << s, a++;
        return n = (a - a % 4) / 4, s = a % 4 * 8, i[n] = i[n] | 128 << s, i[o - 2] = t << 3, 
        i[o - 1] = t >>> 29, i;
    }(e = function(e) {
        e = e.replace(/\r\n/g, "\n");
        for (var n = "", t = 0; t < e.length; t++) {
            var r = e.charCodeAt(t);
            r < 128 ? n += String.fromCharCode(r) : r > 127 && r < 2048 ? (n += String.fromCharCode(r >> 6 | 192), 
            n += String.fromCharCode(63 & r | 128)) : (n += String.fromCharCode(r >> 12 | 224), 
            n += String.fromCharCode(r >> 6 & 63 | 128), n += String.fromCharCode(63 & r | 128));
        }
        return n;
    }(e)), v = 1732584193, w = 4023233417, _ = 2562383102, m = 271733878, g = 0; g < x.length; g += 16) d = v, 
    h = w, l = _, S = m, w = p(w = p(w = p(w = p(w = u(w = u(w = u(w = u(w = c(w = c(w = c(w = c(w = a(w = a(w = a(w = a(w, _ = a(_, m = a(m, v = a(v, w, _, m, x[g + 0], 7, 3614090360), w, _, x[g + 1], 12, 3905402710), v, w, x[g + 2], 17, 606105819), m, v, x[g + 3], 22, 3250441966), _ = a(_, m = a(m, v = a(v, w, _, m, x[g + 4], 7, 4118548399), w, _, x[g + 5], 12, 1200080426), v, w, x[g + 6], 17, 2821735955), m, v, x[g + 7], 22, 4249261313), _ = a(_, m = a(m, v = a(v, w, _, m, x[g + 8], 7, 1770035416), w, _, x[g + 9], 12, 2336552879), v, w, x[g + 10], 17, 4294925233), m, v, x[g + 11], 22, 2304563134), _ = a(_, m = a(m, v = a(v, w, _, m, x[g + 12], 7, 1804603682), w, _, x[g + 13], 12, 4254626195), v, w, x[g + 14], 17, 2792965006), m, v, x[g + 15], 22, 1236535329), _ = c(_, m = c(m, v = c(v, w, _, m, x[g + 1], 5, 4129170786), w, _, x[g + 6], 9, 3225465664), v, w, x[g + 11], 14, 643717713), m, v, x[g + 0], 20, 3921069994), _ = c(_, m = c(m, v = c(v, w, _, m, x[g + 5], 5, 3593408605), w, _, x[g + 10], 9, 38016083), v, w, x[g + 15], 14, 3634488961), m, v, x[g + 4], 20, 3889429448), _ = c(_, m = c(m, v = c(v, w, _, m, x[g + 9], 5, 568446438), w, _, x[g + 14], 9, 3275163606), v, w, x[g + 3], 14, 4107603335), m, v, x[g + 8], 20, 1163531501), _ = c(_, m = c(m, v = c(v, w, _, m, x[g + 13], 5, 2850285829), w, _, x[g + 2], 9, 4243563512), v, w, x[g + 7], 14, 1735328473), m, v, x[g + 12], 20, 2368359562), _ = u(_, m = u(m, v = u(v, w, _, m, x[g + 5], 4, 4294588738), w, _, x[g + 8], 11, 2272392833), v, w, x[g + 11], 16, 1839030562), m, v, x[g + 14], 23, 4259657740), _ = u(_, m = u(m, v = u(v, w, _, m, x[g + 1], 4, 2763975236), w, _, x[g + 4], 11, 1272893353), v, w, x[g + 7], 16, 4139469664), m, v, x[g + 10], 23, 3200236656), _ = u(_, m = u(m, v = u(v, w, _, m, x[g + 13], 4, 681279174), w, _, x[g + 0], 11, 3936430074), v, w, x[g + 3], 16, 3572445317), m, v, x[g + 6], 23, 76029189), _ = u(_, m = u(m, v = u(v, w, _, m, x[g + 9], 4, 3654602809), w, _, x[g + 12], 11, 3873151461), v, w, x[g + 15], 16, 530742520), m, v, x[g + 2], 23, 3299628645), _ = p(_, m = p(m, v = p(v, w, _, m, x[g + 0], 6, 4096336452), w, _, x[g + 7], 10, 1126891415), v, w, x[g + 14], 15, 2878612391), m, v, x[g + 5], 21, 4237533241), _ = p(_, m = p(m, v = p(v, w, _, m, x[g + 12], 6, 1700485571), w, _, x[g + 3], 10, 2399980690), v, w, x[g + 10], 15, 4293915773), m, v, x[g + 1], 21, 2240044497), _ = p(_, m = p(m, v = p(v, w, _, m, x[g + 8], 6, 1873313359), w, _, x[g + 15], 10, 4264355552), v, w, x[g + 6], 15, 2734768916), m, v, x[g + 13], 21, 1309151649), _ = p(_, m = p(m, v = p(v, w, _, m, x[g + 4], 6, 4149444226), w, _, x[g + 11], 10, 3174756917), v, w, x[g + 2], 15, 718787259), m, v, x[g + 9], 21, 3951481745), 
    v = t(v, d), w = t(w, h), _ = t(_, l), m = t(m, S);
    return (f(v) + f(w) + f(_) + f(m)).toLowerCase();
}

function t(e, t) {
    switch (e) {
      case "GET":
        var r = [];
        for (var o in t) r.push(o + "=" + t[o]);
        var i = (r = r.sort()).join("");
        return i = i.toLowerCase() + c.config.phpToken, n(i);

      case "POST":
        if (t.request_time || t.app_id) {
            var s = n("app_id=" + t.app_id + "request_time=" + t.request_time + c.config.phpToken);
            return "?request_time=" + t.request_time + "&app_id=" + t.app_id + "&sign=" + s;
        }
        return "";

      default:
        return "";
    }
}

function r(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
    return !1 === c.config.debug ? !0 === r && (n.app_id = c.config.phpAppid, n.request_time = Math.round(new Date().getTime() / 1e3), 
    n.sign = t("GET", n)) : (n.app_id = c.config.phpAppid, n.dev = "develop"), new Promise(function(t, r) {
        wx.request({
            url: e,
            data: n,
            success: function(e) {
                t(e.data);
            },
            fail: function(e) {
                r(e), console.log("请求失败");
            }
        });
    });
}

function o(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
    return !1 === c.config.debug ? !0 === r && (n.app_id = c.config.phpAppid, n.request_time = Math.round(new Date().getTime() / 1e3), 
    e = e + "" + t("POST", n)) : (n.app_id = c.config.phpAppid, n.dev = "develop"), 
    new Promise(function(t, r) {
        wx.request({
            url: e,
            data: n,
            method: "POST",
            success: function(e) {
                t(e.data);
            },
            fail: function(e) {
                r(e), console.log("请求失败");
            }
        });
    });
}

function i() {
    return new Promise(function(e, n) {
        wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(n) {
                        e(n);
                    }
                }) : (console.warn("util:getAccessToken未获得用户授权"), e(!1));
            }
        });
    });
}

function s() {
    return new Promise(function(e, n) {
        wx.login({
            success: function(n) {
                var t = n.code;
                i().then(function(n) {
                    n && r(c.apiUrl.userLogin, {
                        code: t,
                        business: c.config.phpBusiness,
                        appid: c.config.wxAppid,
                        nickname: n.userInfo.nickName,
                        avatar: n.userInfo.avatarUrl,
                        spread: getApp().thisSpread
                    }).then(function(n) {
                        n.status >= 1 ? (wx.setStorageSync("access_token", n.data.token), wx.setStorageSync("access_token_expires", n.data.expires_in), 
                        e(n.data.token)) : console.error("util:passLogin注册登录错误：" + n.msg);
                    });
                });
            }
        });
    });
}

function a() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return new Promise(function(n, t) {
        String(e).length <= 0 ? console.warn("util:passRefresh需要传递token") : o(c.apiUrl.userRefresh, {
            business: c.config.phpBusiness,
            appid: c.config.wxAppid,
            access_token: e
        }).then(function(e) {
            e.status >= 1 ? (wx.setStorageSync("access_token", e.data.token), wx.setStorageSync("access_token_expires", e.data.expires_in), 
            n(e.data.token)) : (wx.removeStorageSync("access_token"), wx.removeStorageSync("access_token_expires"), 
            console.warn("util:passRefresh获取新token出错了"));
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatTimeSync = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Y-M-D H:I:S", t = arguments[1];
    n = ("" + n).length <= 0 ? "Y-M-D H:I:S" : n;
    var r = t ? new Date(1e3 * t) : new Date(), o = r.getFullYear(), i = r.getMonth() + 1, s = r.getDate(), a = r.getHours(), c = r.getMinutes(), u = r.getSeconds(), p = {
        Y: o,
        m: i,
        d: s,
        h: a,
        i: c,
        s: u,
        y: o.toString().substr(2, 2),
        M: e(i),
        D: e(s),
        H: e(a),
        I: e(c),
        S: e(u)
    }, f = n;
    for (var g in p) {
        var d = new RegExp(g, "g");
        f = f.replace(d, p[g]);
    }
    return f;
}, exports.getRequest = r, exports.postRequest = o, exports.getWeChatUserInfo = i, 
exports.passLogin = s, exports.passRefresh = a, exports.getAccessToken = function() {
    return new Promise(function(e, n) {
        var t = wx.getStorageSync("access_token"), r = wx.getStorageSync("access_token_expires");
        t ? r > Date.parse(new Date()) / 1e3 ? e(t) : a(t).then(function(n) {
            e(n);
        }) : s(t).then(function(n) {
            e(n);
        });
    });
};

var c = require("config");