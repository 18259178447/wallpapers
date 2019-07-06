require("../../../common/manifest.js"), require("../../../common/vendor.js"), global.webpackJsonpMpvue([ 4 ], {
    F3y6: function(t, a, e) {
        var i = e("P1u1"), s = e("t0jV"), n = e("ybqe")(i.a, s.a, function(t) {
            e("nDwa");
        }, null, null);
        a.a = n.exports;
    },
    P1u1: function(t, a, e) {
        (function(t) {
            var i = e("lHA8"), s = e.n(i), n = e("Gu7T"), r = e.n(n), o = e("cF7b");
            a.a = {
                data: function() {
                    return {
                        optionNum: 0,
                        isSearch: !1,
                        placeholder: "搜索你想要的头像类别",
                        avatarArr: [],
                        historyArr: [],
                        inputVal: "",
                        key: "",
                        cateId: "",
                        cateName: "",
                        page: 0,
                        isMax: !1,
                        isConnected: !0,
                        isData: !1,
                        isEnter: !1,
                        isHome: !1,
                        formId: ""
                    };
                },
                onLoad: function(a) {
                    if (this.isHome = !1, t.mpvue.setNavigationBarTitle({
                        title: "搜索"
                    }), a.channel && (this.isHome = !0), this.setData(), this.getParams(), this.isEnter = !0, 
                    "search" === a.tag) return this.isSearch = !0, this.key = this.inputVal = a.key, 
                    this.getSearchList(), void this.getHistory();
                    this.cateId = a.id, this.cateName = a.name, t.mpvue.setNavigationBarTitle({
                        title: this.cateName
                    }), this.getList();
                },
                onShow: function() {
                    var a = this;
                    t.mpvue.setNavigationBarColor({
                        frontColor: "#000000",
                        backgroundColor: "#ffffff"
                    }), t.mpvue.onNetworkStatusChange(function(t) {
                        a.isConnected = t.isConnected;
                    });
                },
                onHide: function() {
                    this.uploadData();
                },
                onReachBottom: function() {
                    this.isSearch ? this.getSearchList() : this.getList();
                },
                onShareAppMessage: function() {
                    return this.isSearch ? {
                        path: "/pages/main/result/main?tag=search&key=" + this.key + "&channel=result",
                        imageUrl: "/static/images/main-share.png"
                    } : {
                        title: "这个分类里有你想要的，快去看看",
                        path: "/pages/main/result/main?id=" + this.cateId + "&name=" + this.cateName + "&channel=result"
                    };
                },
                methods: {
                    setData: function() {
                        this.avatarArr = [], this.page = 0, this.isSearch = this.isMax = this.isData = !1, 
                        this.cateId = "";
                    },
                    chooseOption: function(t) {
                        this.optionNum = t;
                    },
                    getParams: function(t) {
                        var a = this;
                        this.globalData.token && !t || Object(o.a)().then(function(t) {
                            a.globalData.token = t.token;
                        });
                    },
                    getFormId: function(t) {
                        this.formId = t.target.formId;
                    },
                    uploadData: function() {
                        var t = this;
                        this.globalData.requestNum > 9 || !this.globalData.token || void 0 === this.formId || Object(o.b)(this.globalData.token, this.formId).then(function(a) {
                            401 !== a.code ? t.globalData.requestNum += 1 : t.getParams("expired");
                        });
                    },
                    goMain: function() {
                        t.mpvue.reLaunch({
                            url: "/pages/main/index/main"
                        });
                    },
                    goDetails: function(a) {
                        var e = "/pages/main/details/main?tag=result&index=" + a + "&cateId=" + this.cateId + "&page=" + this.page;
                        t.mpvue.setStorage({
                            key: "avatarArr",
                            data: this.avatarArr,
                            success: function(a) {
                                t.mpvue.navigateTo({
                                    url: e
                                });
                            }
                        });
                    },
                    getHistory: function() {
                        var a = this;
                        t.mpvue.getStorage({
                            key: "historyWord",
                            success: function(t) {
                                null !== t.data && (a.historyArr = t.data);
                            }
                        });
                    },
                    addHistory: function() {
                        this.historyArr.length < 8 ? (this.historyArr = [].concat(this.inputVal).concat(this.historyArr), 
                        this.historyArr = [].concat(r()(new s.a(this.historyArr)))) : (this.historyArr.pop(), 
                        this.historyArr = [].concat(this.inputVal).concat(this.historyArr), this.historyArr = [].concat(r()(new s.a(this.historyArr)))), 
                        t.mpvue.setStorage({
                            key: "historyWord",
                            data: this.historyArr
                        });
                    },
                    search: function(a) {
                        this.inputVal && "" !== this.inputVal.replace(/(^\s*)|(\s*$)/g, "") ? (this.setData(), 
                        this.getSearchList()) : t.mpvue.showToast({
                            title: "你还没写东西呦~",
                            icon: "none"
                        });
                    },
                    getList: function() {
                        var a = this;
                        this.page++, this.isMax || t.mpvue.request({
                            url: "https://news.moxiu.com/applets/avatar/content",
                            method: "GET",
                            dataType: "json",
                            data: {
                                cateId: this.cateId,
                                page: this.page
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(t) {
                                a.avatarArr = a.avatarArr.concat(t.data.data.list), a.page >= t.data.data.meta.pages && (a.isMax = !0);
                            },
                            fail: function(a) {
                                t.mpvue.showToast({
                                    title: "网络异常，请稍后再试",
                                    icon: "none"
                                });
                            }
                        });
                    },
                    getSearchList: function() {
                        var a = this;
                        this.page++, this.isMax || (1 === this.page && this.addHistory(), t.mpvue.request({
                            url: "https://news.moxiu.com/applets/avatar/search?tag=" + this.inputVal + "&page=" + this.page,
                            method: "POST",
                            dataType: "json",
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(t) {
                                a.avatarArr = a.avatarArr.concat(t.data.data.list), a.isSearch = !0, a.isData = !0, 
                                a.page >= t.data.data.meta.pages && (a.isMax = !0);
                            },
                            fail: function(a) {
                                t.mpvue.showToast({
                                    title: "网络异常，请稍后再试",
                                    icon: "none"
                                });
                            }
                        }));
                    }
                }
            };
        }).call(a, e("DuR2"));
    },
    kUjJ: function(t, a, e) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var i = e("5nAL"), s = e.n(i), n = e("F3y6");
        new s.a(n.a).$mount();
    },
    nDwa: function(t, a) {},
    t0jV: function(t, a, e) {
        var i = {
            render: function() {
                var t = this, a = t.$createElement, e = t._self._c || a;
                return e("div", {
                    staticClass: "result-container"
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
                        eventid: "2"
                    },
                    on: {
                        submit: t.getFormId
                    }
                }, [ e("div", {
                    class: {
                        "result-bg": !t.isSearch
                    }
                }, [ t.isSearch ? e("div", {
                    staticClass: "input-box result-input"
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
                        placeholder: t.placeholder,
                        eventid: "0"
                    },
                    domProps: {
                        value: t.inputVal
                    },
                    on: {
                        confirm: t.search,
                        input: function(a) {
                            a.target.composing || (t.inputVal = a.target.value);
                        }
                    }
                }) ]) : t._e(), t._v(" "), e("div", {
                    staticClass: "avatar-box"
                }, t._l(t.avatarArr, function(a, i) {
                    return e("div", [ e("button", {
                        staticClass: "submit-btn avatar",
                        style: {
                            "background-image": "url(" + a.raw.url + ")"
                        },
                        attrs: {
                            "form-type": "submit",
                            eventid: "1_" + i
                        },
                        on: {
                            click: function(a) {
                                t.goDetails(i);
                            }
                        }
                    }) ], 1);
                })) ]) ]), t._v(" "), e("img", {
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
                }) ], 1), t._v(" "), !t.isConnected && t.isEnter ? e("div", {
                    staticClass: "network-remind"
                }, [ e("img", {
                    staticClass: "remind-icon",
                    attrs: {
                        src: "/static/images/network-remind.png"
                    }
                }), t._v(" "), e("p", [ t._v("网络开小差了~ ") ]) ], 1) : t._e(), t._v(" "), t.isConnected && t.isData && 0 === t.avatarArr.length ? e("div", {
                    staticClass: "network-remind"
                }, [ e("img", {
                    staticClass: "remind-icon",
                    attrs: {
                        src: "/static/images/content-remind.png"
                    }
                }), t._v(" "), e("p", [ t._v("暂无相关内容哦~") ]) ], 1) : t._e() ]);
            },
            staticRenderFns: []
        };
        a.a = i;
    }
}, [ "kUjJ" ]);