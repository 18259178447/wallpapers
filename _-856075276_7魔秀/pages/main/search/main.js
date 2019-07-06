require("../../../common/manifest.js"), require("../../../common/vendor.js"), global.webpackJsonpMpvue([ 3 ], {
    O99m: function(t, a, e) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var s = e("5nAL"), i = e.n(s), n = e("b8g2");
        new i.a(n.a).$mount();
    },
    b8g2: function(t, a, e) {
        var s = e("xFaK"), i = e("lgy5"), n = e("ybqe")(s.a, i.a, function(t) {
            e("fVaF");
        }, null, null);
        a.a = n.exports;
    },
    fVaF: function(t, a) {},
    lgy5: function(t, a, e) {
        var s = {
            render: function() {
                var t = this, a = t.$createElement, e = t._self._c || a;
                return e("div", {
                    staticClass: "search-container"
                }, [ e("div", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: t.isConnected,
                        expression: "isConnected"
                    } ]
                }, [ e("form", {
                    attrs: {
                        "report-submit": "",
                        eventid: "4"
                    },
                    on: {
                        submit: t.getFormId
                    }
                }, [ e("div", {
                    staticClass: "input-box"
                }, [ e("img", {
                    staticClass: "search-icon",
                    attrs: {
                        src: "/static/images/search.png"
                    }
                }), t._v(" "), e("input", {
                    directives: [ {
                        name: "model",
                        rawName: "v-model",
                        value: t.inputVal,
                        expression: "inputVal"
                    } ],
                    staticClass: "main-input",
                    attrs: {
                        type: "text",
                        focus: t.isFocus,
                        placeholder: t.placeholder,
                        "confirm-type": t.search,
                        eventid: "0"
                    },
                    domProps: {
                        value: t.inputVal
                    },
                    on: {
                        confirm: t.searchGoResult,
                        input: function(a) {
                            a.target.composing || (t.inputVal = a.target.value);
                        }
                    }
                }) ]), t._v(" "), e("div", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: 0 !== t.searchTagOption.length,
                        expression: "searchTagOption.length !== 0"
                    } ],
                    staticClass: "search-tag-content"
                }, [ e("div", {
                    staticClass: "search-tag-cate"
                }, [ e("div", {
                    staticClass: "search-tag-color"
                }), t._v(" "), e("p", {
                    staticClass: "search-tag-title"
                }, [ t._v("热词") ]) ], 1), t._v(" "), e("div", {
                    staticClass: "search-tag-box"
                }, t._l(t.searchTagOption, function(a, s) {
                    return e("div", [ e("button", {
                        staticClass: "submit-btn search-tag-option",
                        attrs: {
                            "form-type": "submit",
                            eventid: "1_" + s
                        },
                        on: {
                            click: function(e) {
                                t.iconGoResult(a.tag);
                            }
                        }
                    }, [ t._v("\n            " + t._s(a.tag) + "\n            ") ]) ], 1);
                })) ]), t._v(" "), e("div", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: 0 !== t.searchHistoryOption2.length,
                        expression: "searchHistoryOption2.length !== 0"
                    } ],
                    staticClass: "search-history-content"
                }, [ e("div", {
                    staticClass: "search-tag-cate"
                }, [ e("div", {
                    staticClass: "search-tag-color"
                }), t._v(" "), e("p", {
                    staticClass: "search-history-title"
                }, [ t._v("搜索历史") ]) ], 1), t._v(" "), e("div", {
                    staticClass: "search-history-box"
                }, t._l(t.searchHistoryOption2, function(a, s) {
                    return e("div", [ e("button", {
                        staticClass: "submit-btn search-tag-option",
                        attrs: {
                            "form-type": "submit",
                            eventid: "2_" + s
                        },
                        on: {
                            click: function(a) {
                                t.historyGoResult(s);
                            }
                        }
                    }, [ t._v("\n            " + t._s(a) + "\n            ") ]) ], 1);
                })) ]), t._v(" "), e("img", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: t.isHome,
                        expression: "isHome"
                    } ],
                    staticClass: "home-btn",
                    attrs: {
                        src: "/static/images/home.png",
                        eventid: "3"
                    },
                    on: {
                        click: t.goMain
                    }
                }) ]) ], 1), t._v(" "), !t.isConnected && t.isEnter ? e("div", {
                    staticClass: "network-remind"
                }, [ e("img", {
                    staticClass: "remind-icon",
                    attrs: {
                        src: "/static/images/network-remind.png"
                    }
                }), t._v(" "), e("p", [ t._v("网络开小差了~ ") ]) ], 1) : t._e() ]);
            },
            staticRenderFns: []
        };
        a.a = s;
    },
    xFaK: function(t, a, e) {
        (function(t) {
            var s = e("cF7b");
            a.a = {
                data: function() {
                    return {
                        searchTagOption: [],
                        searchHistoryOption1: [],
                        searchHistoryOption2: [],
                        content: "",
                        placeholder: "搜索你想要的头像类别",
                        inputVal: "",
                        isConnected: !0,
                        isFocus: !1,
                        isEnter: !1,
                        isHome: !1,
                        formId: ""
                    };
                },
                onLoad: function(a) {
                    var e = this;
                    this.isHome = !1, a.channel && (this.isHome = !0), this.isConnected = this.isFocus = this.isEnter = !0, 
                    this.inputVal = "", this.getParams(), t.mpvue.onNetworkStatusChange(function(t) {
                        e.isConnected = t.isConnected;
                    });
                },
                onShow: function() {
                    var a = this;
                    t.mpvue.setNavigationBarColor({
                        frontColor: "#000000",
                        backgroundColor: "#ffffff"
                    }), t.mpvue.getStorage({
                        key: "historyWord",
                        success: function(t) {
                            for (var e in a.searchHistoryOption1 = [].concat(t.data), a.searchHistoryOption2 = t.data, 
                            a.searchHistoryOption2) a.searchHistoryOption2[e].length > 8 && (a.searchHistoryOption2[e] = a.searchHistoryOption2[e].substr(0, 8) + "...");
                        }
                    });
                },
                onHide: function() {
                    this.uploadData();
                },
                onShareAppMessage: function() {
                    return {
                        path: "/pages/main/search/main?channel=search",
                        imageUrl: "/static/images/main-share.png"
                    };
                },
                mounted: function() {
                    var a = this;
                    t.mpvue.setNavigationBarTitle({
                        title: "搜索"
                    }), t.mpvue.request({
                        url: "https://news.moxiu.com/applets/avatar/hotTag",
                        method: "GET",
                        dataType: "json",
                        data: {},
                        header: {
                            "content-type": "application/json"
                        },
                        success: function(t) {
                            a.searchTagOption = t.data.data.list;
                        },
                        fail: function(a) {
                            t.mpvue.showToast({
                                title: "网络异常，请稍后再试",
                                icon: "none"
                            });
                        }
                    });
                },
                methods: {
                    searchGoResult: function(a) {
                        this.inputVal && "" !== this.inputVal.replace(/(^\s*)|(\s*$)/g, "") ? t.mpvue.navigateTo({
                            url: "/pages/main/result/main?tag=search&key=" + this.inputVal
                        }) : t.mpvue.showToast({
                            title: "你还没写东西呦~",
                            icon: "none"
                        });
                    },
                    iconGoResult: function(a) {
                        this.inputVal = a, t.mpvue.navigateTo({
                            url: "/pages/main/result/main?tag=search&key=" + a
                        });
                    },
                    historyGoResult: function(a) {
                        this.inputVal = this.searchHistoryOption1[a];
                      if (!this.inputVal) return;
                        t.mpvue.navigateTo({
                            url: "/pages/main/result/main?tag=search&key=" + this.inputVal
                        });
                    },
                    getParams: function(t) {
                        var a = this;
                        this.globalData.token && !t || Object(s.a)().then(function(t) {
                            a.globalData.token = t.token;
                        });
                    },
                    getFormId: function(t) {
                        this.formId = t.target.formId;
                    },
                    uploadData: function() {
                        var t = this;
                        this.globalData.requestNum > 9 || !this.globalData.token || void 0 === this.formId || Object(s.b)(this.globalData.token, this.formId).then(function(a) {
                            401 !== a.code ? t.globalData.requestNum += 1 : t.getParams("expired");
                        });
                    },
                    goMain: function() {
                        t.mpvue.reLaunch({
                            url: "/pages/main/index/main"
                        });
                    }
                }
            };
        }).call(a, e("DuR2"));
    }
}, [ "O99m" ]);