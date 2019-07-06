require("../../../common/manifest.js"), require("../../../common/vendor.js"), global.webpackJsonpMpvue([ 2 ], {
    "/UV+": function(t, a, s) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var e = s("5nAL"), i = s.n(e), n = s("wTy/");
        new i.a(n.a).$mount();
    },
    DzpL: function(t, a, s) {
        var e = {
            render: function() {
                var t = this, a = t.$createElement, s = t._self._c || a;
                return s("div", {
                    staticClass: "match-container"
                }, [ s("div", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: t.isConnected,
                        expression: "isConnected"
                    } ],
                    staticClass: "match-wrapper",
                    class: {
                        active: !t.matchMessage || t.matchMessage.pair
                    }
                }, [ s("form", {
                    attrs: {
                        "report-submit": "",
                        eventid: "8"
                    },
                    on: {
                        submit: t.getFormId
                    }
                }, [ s("img", {
                    staticClass: "ribbon",
                    attrs: {
                        src: "/static/images/ribbon.png"
                    }
                }), t._v(" "), s("img", {
                    staticClass: "cloud",
                    attrs: {
                        src: "/static/images/cloud.png"
                    }
                }), t._v(" "), s("img", {
                    staticClass: "title",
                    class: {
                        "title-active": t.isFit
                    },
                    attrs: {
                        src: "/static/images/match-title.png"
                    }
                }), t._v(" "), s("img", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: t.isLoad || !t.matchMessage || t.matchMessage.pair,
                        expression: "isLoad || !matchMessage || matchMessage.pair"
                    } ],
                    staticClass: "cloud-bottom cloud-position1",
                    attrs: {
                        src: "/static/images/cloud-bottom.png"
                    }
                }), t._v(" "), s("p", {
                    staticClass: "title-content1"
                }, [ t._v(t._s(t.content.message1)) ]), t._v(" "), s("p", {
                    staticClass: "title-content2"
                }, [ t._v(t._s(t.content.message2)) ]), t._v(" "), s("div", {
                    staticClass: "result-box"
                }, [ t.isLoad ? s("div", {
                    staticClass: "match-box"
                }, [ s("img", {
                    staticClass: "original-fail-pic",
                    attrs: {
                        src: t.originalImage,
                        mode: t.mode
                    }
                }), t._v(" "), s("div", {
                    staticClass: "reload-box"
                }, [ s("img", {
                    staticClass: "reload-icon",
                    attrs: {
                        src: "/static/images/reload-icon.png"
                    }
                }), t._v(" "), s("p", {
                    staticClass: "reload-message"
                }, [ t._v("正在匹配") ]) ], 1), t._v(" "), s("div", {
                    staticClass: "shade"
                }) ]) : s("div", [ t.matchMessage ? s("div", [ t.matchMessage.pair ? s("div", [ s("button", {
                    staticClass: "submit-btn success-board dashed-board",
                    attrs: {
                        "form-type": "submit",
                        eventid: "0"
                    },
                    on: {
                        click: t.getMatch
                    }
                }, [ s("img", {
                    staticClass: "original-pic",
                    attrs: {
                        src: t.originalImage,
                        mode: t.mode
                    }
                }) ]), t._v(" "), s("button", {
                    staticClass: "submit-btn success-board",
                    style: {
                        "background-image": "url(" + t.matchMessage.pair.img[0].data + ")"
                    },
                    attrs: {
                        "form-type": "submit",
                        eventid: "1"
                    },
                    on: {
                        click: function(a) {
                            t.goDetails(0, t.matchMessage.pair.img[0].data);
                        }
                    }
                }), t._v(" "), s("button", {
                    staticClass: "share-btn",
                    attrs: {
                        "open-type": "share",
                        "form-type": "submit",
                        eventid: "2"
                    },
                    on: {
                        click: t.share
                    }
                }, [ s("img", {
                    staticClass: "share-icon",
                    attrs: {
                        src: "/static/images/share-red.png"
                    }
                }), t._v(" "), s("p", [ t._v("点击分享") ]) ], 1) ], 1) : s("div", [ s("button", {
                    staticClass: "submit-btn match-box fail-box",
                    attrs: {
                        "form-type": "submit",
                        eventid: "3"
                    },
                    on: {
                        click: t.getMatch
                    }
                }, [ s("img", {
                    staticClass: "original-fail-pic",
                    attrs: {
                        src: t.originalImage,
                        mode: t.mode
                    }
                }), t._v(" "), s("div", {
                    staticClass: "reload-box"
                }, [ s("img", {
                    staticClass: "add-again-icon",
                    attrs: {
                        src: "/static/images/add-again-icon.png"
                    }
                }), t._v(" "), s("p", {
                    staticClass: "reload-message"
                }, [ t._v("重新上传") ]) ], 1), t._v(" "), s("div", {
                    staticClass: "shade"
                }) ]), t._v(" "), s("img", {
                    staticClass: "cloud-bottom",
                    attrs: {
                        src: "/static/images/cloud-bottom.png"
                    }
                }), t._v(" "), s("div", {
                    staticClass: "recommend-container"
                }, [ s("div", {
                    staticClass: "recommend-box"
                }, [ s("div", {
                    staticClass: "recommend-icon"
                }), t._v(" "), s("p", {
                    staticClass: "recommend"
                }, [ t._v("猜你喜欢") ]) ], 1), t._v(" "), t._l(t.matchMessage.recommend, function(a, e) {
                    return s("div", {
                        staticClass: "recommend-content"
                    }, [ s("button", {
                        staticClass: "submit-btn recommend-board",
                        style: {
                            "background-image": "url(" + a.pairs[0].data + ")"
                        },
                        attrs: {
                            "form-type": "submit",
                            eventid: "4_" + e
                        },
                        on: {
                            click: function(a) {
                                t.goDetails(2 * e);
                            }
                        }
                    }), t._v(" "), s("button", {
                        staticClass: "submit-btn recommend-board",
                        style: {
                            "background-image": "url(" + a.pairs[1].data + ")"
                        },
                        attrs: {
                            "form-type": "submit",
                            eventid: "5_" + e
                        },
                        on: {
                            click: function(a) {
                                t.goDetails(2 * e + 1);
                            }
                        }
                    }) ], 1);
                }) ], 2) ], 1) ]) : s("button", {
                    staticClass: "submit-btn match-box origin-box",
                    attrs: {
                        "form-type": "submit",
                        eventid: "6"
                    },
                    on: {
                        click: t.getMatch
                    }
                }, [ s("img", {
                    staticClass: "add-icon",
                    attrs: {
                        src: "/static/images/add-icon.png"
                    }
                }) ]) ], 1), t._v(" "), s("img", {
                    staticClass: "cat",
                    attrs: {
                        src: "/static/images/cat.png"
                    }
                }), t._v(" "), s("img", {
                    staticClass: "bear",
                    attrs: {
                        src: "/static/images/bear.png"
                    }
                }) ]), t._v(" "), s("img", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: t.isHome,
                        expression: "isHome"
                    } ],
                    staticClass: "home-btn",
                    attrs: {
                        src: "/static/images/home.png",
                        eventid: "7"
                    },
                    on: {
                        click: t.goMain
                    }
                }) ], 1) ], 1), t._v(" "), !t.isConnected && t.isEnter ? s("div", {
                    staticClass: "network-remind"
                }, [ s("img", {
                    staticClass: "remind-icon",
                    attrs: {
                        src: "/static/images/network-remind.png"
                    }
                }), t._v(" "), s("p", [ t._v("网络开小差了~ ") ]) ], 1) : t._e() ]);
            },
            staticRenderFns: []
        };
        a.a = e;
    },
    Jpmz: function(t, a, s) {
        (function(t) {
            var e = s("cF7b");
            a.a = {
                data: function() {
                    return {
                        mode: "widthFix",
                        totalNum: "",
                        isLoad: !1,
                        isConnected: !0,
                        isEnter: !1,
                        originalImage: "",
                        matchMessage: "",
                        isHome: !1,
                        isFit: !1
                    };
                },
                onLoad: function(a) {
                    var s = this;
                    this.isHome = !1, a.channel && (this.isHome = !0), this.isEnter = !0, this.matchMessage = this.originalImage = "", 
                    t.mpvue.onNetworkStatusChange(function(t) {
                        s.isConnected = t.isConnected;
                    }), this.getParams(), this.getNum(), this.setData();
                },
                onShareAppMessage: function() {
                    return {
                        title: "这个神器帮我的头像找到了失散多年的情头，快来看看吧",
                        path: "/pages/match/index/main?channel=match",
                        imageUrl: "/static/images/match-share.png"
                    };
                },
                onShow: function() {
                    var a = this;
                    t.mpvue.getSystemInfo({
                        success: function(t) {
                            "DUK-AL20" === t.model && (a.isFit = !0);
                        }
                    });
                },
                onUnload: function() {
                    this.uploadData();
                },
                computed: {
                    content: function() {
                        if (this.isLoad) return {
                            message1: "匹配中…",
                            message2: "有" + this.totalNum + "套情侣头像"
                        };
                        if (!this.matchMessage) return {
                            message1: "让你的头像不再寂寞",
                            message2: "有" + this.totalNum + "套情侣头像"
                        };
                        var t = void 0, a = void 0;
                        return this.matchMessage.pair ? (t = "匹配成功", a = "帮你匹配成功啦，快去分享给另一半吧") : (t = "匹配失败", 
                        a = "您上传的图片曾被修改，无法正常匹配"), {
                            message1: t,
                            message2: a
                        };
                    }
                },
                methods: {
                    setData: function() {
                        t.mpvue.setNavigationBarTitle({
                            title: "情头匹配"
                        }), t.mpvue.setNavigationBarColor({
                            frontColor: "#000000",
                            backgroundColor: "#F0F3F9"
                        });
                    },
                    getNum: function() {
                        var a = this;
                        t.mpvue.request({
                            url: "https://news.moxiu.com/v3/module/pair/number",
                            method: "POST",
                            dataType: "json",
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(t) {
                                a.totalNum = t.data.data.total;
                            },
                            fail: function(a) {
                                t.mpvue.showToast({
                                    title: "网络异常，请稍后再试",
                                    icon: "none"
                                });
                            }
                        });
                    },
                    getMatch: function() {
                        var a = this;
                        t.mpvue.chooseImage({
                            count: 1,
                            success: function(s) {
                                a.isLoad = !0, a.originalImage = s.tempFilePaths[0], t.mpvue.uploadFile({
                                    url: "https://news.moxiu.com/applets/avatar/pair/result",
                                    filePath: s.tempFilePaths[0],
                                    name: "file",
                                    success: function(t) {
                                        a.isLoad = !1, a.matchMessage = JSON.parse(t.data).data;
                                    },
                                    fail: function(s) {
                                        a.isLoad = !1, a.matchMessage = a.originalImage = "", t.mpvue.showToast({
                                            title: "网络异常，请稍后再试",
                                            icon: "none"
                                        });
                                    }
                                });
                            }
                        });
                    },
                    getParams: function(t) {
                        var a = this;
                        this.globalData.token && !t || Object(e.a)().then(function(t) {
                            a.globalData.token = t.token;
                        });
                    },
                    getFormId: function(t) {
                        this.formId = t.target.formId;
                    },
                    uploadData: function() {
                        var t = this;
                        this.globalData.requestNum > 9 || !this.globalData.token || void 0 === this.formId || Object(e.b)(this.globalData.token, this.formId).then(function(a) {
                            401 !== a.code ? t.globalData.requestNum += 1 : t.getParams("expired");
                        });
                    },
                    goMain: function() {
                        t.mpvue.reLaunch({
                            url: "/pages/main/index/main"
                        });
                    },
                    goDetails: function(a, s) {
                        var e = this.matchMessage.pair ? "success" : "fail", i = [];
                        "fail" === e ? this.matchMessage.recommend.forEach(function(t) {
                            var a = {
                                raw: {
                                    url: t.pairs[0].data
                                }
                            }, s = {
                                raw: {
                                    url: t.pairs[1].data
                                }
                            };
                            i.push(a), i.push(s);
                        }) : i.push(s);
                        var n = "/pages/main/details/main?tag=" + e + "&index=" + a;
                        t.mpvue.setStorage({
                            key: "avatarArr",
                            data: i,
                            success: function(a) {
                                t.mpvue.navigateTo({
                                    url: n
                                });
                            }
                        });
                    }
                }
            };
        }).call(a, s("DuR2"));
    },
    mUvZ: function(t, a) {},
    "wTy/": function(t, a, s) {
        var e = s("Jpmz"), i = s("DzpL"), n = s("ybqe")(e.a, i.a, function(t) {
            s("mUvZ");
        }, null, null);
        a.a = n.exports;
    }
}, [ "/UV+" ]);