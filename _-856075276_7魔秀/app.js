require("./common/manifest.js"), require("./common/vendor.js"), global.webpackJsonpMpvue([ 7 ], {
    M93x: function(o, a, e) {
        var t = e("Mw+1"), n = e("ybqe")(t.a, null, function(o) {
            e("YJ6z");
        }, null, null);
        a.a = n.exports;
    },
    "Mw+1": function(o, a, e) {
        a.a = {
            created: function() {
                var o = void 0;
                "my" === global.mpvuePlatform ? ((o = global.mpvue.getStorageSync({
                    key: "logs"
                }).data || []).unshift(Date.now()), global.mpvue.setStorageSync({
                    key: "logs",
                    data: o
                })) : ((o = global.mpvue.getStorageSync("logs") || []).unshift(Date.now()), global.mpvue.setStorageSync("logs", o));
            },
            log: function() {
                console.log("log at:" + Date.now());
            }
        };
    },
    NHnr: function(o, a, e) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var t = e("5nAL"), n = e.n(t), l = e("M93x");
        n.a.config.productionTip = !1, l.a.mpType = "app", new n.a(l.a).$mount(), n.a.prototype.globalData = getApp().globalData, 
        n.a.prototype.globalData.token = "", n.a.prototype.globalData.requestNum = 0;
    },
    YJ6z: function(o, a) {}
}, [ "NHnr" ]);