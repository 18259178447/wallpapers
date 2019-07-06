require("../../../common/manifest.js"), require("../../../common/vendor.js"), global.webpackJsonpMpvue([ 5 ], {
    "4Tx2": function(n, e) {},
    Hfmd: function(n, e, t) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = t("5nAL"), u = t.n(a), o = t("TYxt");
        new u.a(o.a).$mount();
    },
    TYxt: function(n, e, t) {
        var a = t("hjOE"), u = t("UPpH"), o = t("ybqe")(a.a, u.a, function(n) {
            t("4Tx2");
        }, null, null);
        e.a = o.exports;
    },
    UPpH: function(n, e, t) {
        var a = {
            render: function() {
                var n = this.$createElement;
                return (this._self._c || n)("div");
            },
            staticRenderFns: []
        };
        e.a = a;
    },
    hjOE: function(n, e, t) {
        (function(n) {
            e.a = {
                onLoad: function(e) {
                    n.mpvue.reLaunch({
                        url: "/pages/main/index/main"
                    });
                }
            };
        }).call(e, t("DuR2"));
    }
}, [ "Hfmd" ]);