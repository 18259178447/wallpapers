require("../../../common/manifest.js"), require("../../../common/vendor.js"), global.webpackJsonpMpvue([ 1 ], {
    "6TTo": function(t, a) {},
    A2dr: function(t, a, n) {
        (function(t) {
            a.a = {
                data: function() {
                    return {
                        recommendArr: []
                    };
                },
                onLoad: function() {
                    var a = this;
                    this.setName(), t.mpvue.onNetworkStatusChange(function(t) {
                        a.isConnected = t.isConnected;
                    }), this.getData();
                },
                onShow: function() {
                    this.setName();
                },
                onShareAppMessage: function() {
                    return {
                        path: "/pages/main/index/main?channel=main",
                        imageUrl: "/static/images/main-share.png"
                    };
                },
                methods: {
                    getData: function() {
                        var a = this;
                        t.mpvue.request({
                            url: "https://news.moxiu.com/applets/avatar/recommend",
                            method: "GET",
                            dataType: "json",
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(t) {
                                a.recommendArr = t.data.data.list;
                            },
                            fail: function(a) {
                                t.mpvue.showToast({
                                    title: "网络异常，请稍后再试",
                                    icon: "none"
                                });
                            }
                        });
                    },
                    setName: function() {
                        t.mpvue.setNavigationBarTitle({
                            title: "情侣头像"
                        }), t.mpvue.setNavigationBarColor({
                            frontColor: "#000000",
                            backgroundColor: "#FFE200"
                        });
                    },
                    goSearch: function() {
                        t.mpvue.navigateTo({
                            url: "/pages/main/search/main"
                        });
                    },
                    goMatch: function() {
                        t.mpvue.navigateTo({
                            url: "/pages/match/index/main"
                        });
                    },
                    goWallpaper: function() {
                        t.mpvue.navigateToMiniProgram({
                          appId: "1109376964"
                        });
                    },
                    goSort: function() {
                        t.mpvue.reLaunch({
                            url: "/pages/main/sort/main"
                        });
                    },
                    goDetails: function(a) {
                        t.mpvue.setStorage({
                            key: "avatarArr",
                            data: this.recommendArr,
                            success: function(n) {
                                t.mpvue.navigateTo({
                                    url: "/pages/main/details/main?tag=main&index=" + a
                                });
                            }
                        });
                    }
                }
            };
        }).call(a, n("DuR2"));
    },
    L9i1: function(t, a, n) {
        var e = n("nT+l"), i = n("tE4N"), s = n("ybqe")(e.a, i.a, function(t) {
            n("MBDQ");
        }, null, null);
        a.a = s.exports;
    },
    MBDQ: function(t, a) {},
    Qjhx: function(t, a, n) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var e = n("5nAL"), i = n.n(e), s = n("t0K4");
        i.a.config.errorHandler = function(t) {
            console && console.error && console.error(t);
        }, new i.a(s.a).$mount();
    },
    XEuo: function(t, a, n) {
        var e = {
            render: function() {
                var t = this, a = t.$createElement, n = t._self._c || a;
                return n("div", {
                    staticClass: "main-bg"
                }, [ n("div", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: t.isConnected,
                        expression: "isConnected"
                    } ]
                }, [ n("form", {
                    attrs: {
                        "report-submit": "",
                        eventid: "2"
                    },
                    on: {
                        submit: t.getFormId
                    }
                }, [ n("img", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: t.enterNum < 3 && t.isGuide && "main" === t.sortOption,
                        expression: "enterNum < 3 && isGuide && sortOption === 'main'"
                    } ],
                    staticClass: "guide-icon",
                    attrs: {
                        src: "/static/images/guide.png"
                    }
                }), t._v(" "), "main" === t.sortOption ? n("First", {
                    attrs: {
                        mpcomid: "1"
                    }
                }) : n("Sort", {
                    attrs: {
                        mpcomid: "0"
                    }
                }), t._v(" "), n("div", {
                    staticClass: "tab-container",
                    class: {
                        "tab-container-active": t.isFit
                    }
                }, [ n("button", {
                    staticClass: "submit-btn tab-box",
                    attrs: {
                        "form-type": "submit",
                        eventid: "0"
                    },
                    on: {
                        click: function(a) {
                            t.tabChange("main");
                        }
                    }
                }, [ "main" === t.sortOption ? n("img", {
                    staticClass: "icon",
                    attrs: {
                        src: "/static/images/main-on.png"
                    }
                }) : n("img", {
                    staticClass: "icon",
                    attrs: {
                        src: "/static/images/main.png"
                    }
                }), t._v(" "), n("p", {
                    class: {
                        word: "main" === t.sortOption
                    }
                }, [ t._v("首页") ]) ], 1), t._v(" "), n("button", {
                    staticClass: "submit-btn tab-box",
                    attrs: {
                        "form-type": "submit",
                        eventid: "1"
                    },
                    on: {
                        click: function(a) {
                            t.tabChange("sort");
                        }
                    }
                }, [ "sort" === t.sortOption ? n("img", {
                    staticClass: "icon",
                    attrs: {
                        src: "/static/images/sort-on.png"
                    }
                }) : n("img", {
                    staticClass: "icon",
                    attrs: {
                        src: "/static/images/sort.png"
                    }
                }), t._v(" "), n("p", {
                    class: {
                        word: "sort" === t.sortOption
                    }
                }, [ t._v("分类") ]) ], 1) ], 1), t._v(" "), n("button", {
                    staticClass: "submit-btn service-btn",
                    class: {
                        "service-btn-active": t.isFit
                    },
                    attrs: {
                        "open-type": "contact",
                        "form-type": "submit",
                        "send-message-title": t.sendMessage,
                        "show-message-card": "true",
                        "send-message-img": "/static/images/service-share.png"
                    }
                }, [ n("img", {
                    staticClass: "get-icon",
                    attrs: {
                        src: "/static/images/get-icon.png"
                    }
                }) ]) ], 1) ], 1), t._v(" "), !t.isConnected && t.isEnter ? n("div", {
                    staticClass: "network-remind"
                }, [ n("img", {
                    staticClass: "remind-icon",
                    attrs: {
                        src: "/static/images/network-remind.png"
                    }
                }), t._v(" "), n("p", [ t._v("网络开小差了~ ") ]) ], 1) : t._e() ]);
            },
            staticRenderFns: []
        };
        a.a = e;
    },
    gY1F: function(t, a, n) {
        var e = {
            render: function() {
                var t = this, a = t.$createElement, n = t._self._c || a;
                return n("div", {
                    staticClass: "first-bg"
                }, [ n("img", {
                    staticClass: "title-bg",
                    attrs: {
                        src: "/static/images/title-bg.png"
                    }
                }), t._v(" "), n("button", {
                    staticClass: "input-box submit-btn",
                    attrs: {
                        "form-type": "submit",
                        eventid: "0"
                    },
                    on: {
                        click: t.goSearch
                    }
                }, [ n("img", {
                    staticClass: "search-icon",
                    attrs: {
                        src: "/static/images/search.png"
                    }
                }), t._v(" "), n("p", {
                    staticClass: "main-input"
                }, [ t._v("请输入搜索内容") ]) ], 1), t._v(" "), n("div", {
                    staticClass: "enter-container"
                }, [ n("button", {
                    staticClass: "submit-btn btn",
                    attrs: {
                        "form-type": "submit",
                        eventid: "1"
                    },
                    on: {
                        click: t.goMatch
                    }
                }, [ n("img", {
                    staticClass: "enter-icon match-enter",
                    attrs: {
                        src: "/static/images/match-enter.png"
                    }
                }) ]), t._v(" "), n("button", {
                    staticClass: "submit-btn btn",
                    attrs: {
                        "form-type": "submit",
                        eventid: "2"
                    },
                    on: {
                        click: t.goWallpaper
                    }
                }, [ n("img", {
                    staticClass: "enter-icon wallpaper-enter",
                    attrs: {
                        src: "/static/images/wallpaper-enter.png"
                    }
                }) ]) ], 1), t._v(" "), n("div", {
                    staticClass: "recommend-content"
                }, [ n("img", {
                    staticClass: "title-icon",
                    attrs: {
                        src: "/static/images/title-icon.png"
                    }
                }), t._v(" "), n("div", {
                    staticClass: "recommend-box"
                }, [ t._l(t.recommendArr, function(a, e) {
                    return n("div", {
                        staticClass: "recommend-wrapper"
                    }, [ n("button", {
                        staticClass: "submit-btn recommend",
                        style: {
                            "background-image": "url(" + a.raw.url + ")"
                        },
                        attrs: {
                            "form-type": "submit",
                            eventid: "3_" + e
                        },
                        on: {
                            click: function(a) {
                                t.goDetails(e);
                            }
                        }
                    }) ], 1);
                }), t._v(" "), n("div", {
                    staticClass: "recommend recommend-last"
                }) ], 2) ]) ], 1);
            },
            staticRenderFns: []
        };
        a.a = e;
    },
    "nT+l": function(t, a, n) {
        (function(t) {
            a.a = {
                data: function() {
                    return {
                        avatarOption: []
                    };
                },
                onLoad: function() {
                    this.setData(), this.getData();
                },
                methods: {
                    setData: function() {
                        this.avatarOption = [], t.mpvue.setNavigationBarTitle({
                            title: "分类"
                        }), t.mpvue.setNavigationBarColor({
                            frontColor: "#000000",
                            backgroundColor: "#ffffff"
                        });
                    },
                    getData: function() {
                        var a = this;
                        t.mpvue.request({
                            url: "https://news.moxiu.com/applets/avatar/cate",
                            method: "GET",
                            dataType: "json",
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(t) {
                                a.avatarOption = t.data.data.list;
                            },
                            fail: function(a) {
                                t.mpvue.showToast({
                                    title: "网络异常，请稍后再试",
                                    icon: "none"
                                });
                            }
                        });
                    },
                    goContent: function(a, n) {
                        var e = "/pages/main/result/main?tag=avatar&id=" + a + "&name=" + n;
                        t.mpvue.navigateTo({
                            url: e
                        });
                    },
                    goMain: function() {
                        t.mpvue.reLaunch({
                            url: "/pages/main/index/main"
                        });
                    },
                    goSearch: function() {
                        t.mpvue.navigateTo({
                            url: "/pages/main/search/main"
                        });
                    }
                }
            };
        }).call(a, n("DuR2"));
    },
    rRi1: function(t, a) {},
    rgah: function(t, a, n) {
        (function(t) {
            var e = n("uzia"), i = n("L9i1"), s = n("cF7b");
            a.a = {
                data: function() {
                    return {
                        recommendArr: [],
                        isConnected: !0,
                        enterNum: 0,
                        isGuide: !0,
                        timer: "",
                        isEnter: !1,
                        isFit: !1,
                        sortOption: "main",
                        formId: ""
                    };
                },
                components: {
                    First: e.a,
                    Sort: i.a
                },
                onLoad: function(a) {
                    var n = this;
                    a.sortOption && (this.sortOption = a.sortOption), this.setModel(), this.getParams(), 
                    this.setGuide(), this.isEnter = !0, t.mpvue.onNetworkStatusChange(function(t) {
                        n.isConnected = t.isConnected;
                    });
                },
                onShow: function() {
                    this.setModel(), this.enterNum < 3 && (clearTimeout(this.timer), this.isGuide = !0), 
                    this.setGuide();
                },
                onHide: function() {
                    this.uploadData();
                },
                onShareAppMessage: function() {
                    return {
                        path: "/pages/main/index/main?sortOption=" + this.sortOption,
                        imageUrl: "/static/images/main-share.png"
                    };
                },
                methods: {
                    setModel: function() {
                        var a = this;
                        this.isFit || t.mpvue.getSystemInfo({
                            success: function(t) {
                                Boolean(t.model.match(/iphone X/gi)) && (a.isFit = !0);
                            }
                        });
                    },
                    setGuide: function() {
                        var a = this;
                        t.mpvue.getStorage({
                            key: "enterNum",
                            success: function(t) {
                                a.enterNum = t.data + 1, a.enterNum < 3 && (a.timer = setTimeout(function() {
                                    a.isGuide = !1;
                                }, 5e3));
                            }
                        }), t.mpvue.setStorage({
                            key: "enterNum",
                            data: this.enterNum
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
                    goSearch: function() {
                        t.mpvue.navigateTo({
                            url: "/pages/main/search/main"
                        });
                    },
                    goMatch: function() {
                        t.mpvue.navigateTo({
                            url: "/pages/match/index/main"
                        });
                    },
                    goWallpaper: function() {
                        t.mpvue.navigateToMiniProgram({
                          appId: "1109376964"
                        });
                    },
                    tabChange: function(t) {
                        this.sortOption = t, this.uploadData();
                    },
                    goDetails: function(a) {
                        t.mpvue.setStorage({
                            key: "avatarArr",
                            data: this.recommendArr,
                            success: function(n) {
                                t.mpvue.navigateTo({
                                    url: "/pages/main/details/main?tag=main&index=" + a
                                });
                            }
                        });
                    }
                }
            };
        }).call(a, n("DuR2"));
    },
    t0K4: function(t, a, n) {
        var e = n("rgah"), i = n("XEuo"), s = n("ybqe")(e.a, i.a, function(t) {
            n("6TTo");
        }, null, null);
        a.a = s.exports;
    },
    tE4N: function(t, a, n) {
        var e = {
            render: function() {
                var t = this, a = t.$createElement, n = t._self._c || a;
                return n("div", {
                    staticClass: "sort-container"
                }, [ n("div", [ n("div", {
                    staticClass: "input-box",
                    attrs: {
                        eventid: "0"
                    },
                    on: {
                        click: t.goSearch
                    }
                }, [ n("img", {
                    staticClass: "search-icon",
                    attrs: {
                        src: "/static/images/search.png"
                    }
                }), t._v(" "), n("p", {
                    staticClass: "main-input"
                }, [ t._v("请输入搜索内容") ]) ], 1) ]), t._v(" "), n("div", {
                    staticClass: "avatar-container"
                }, [ t._l(t.avatarOption, function(a, e) {
                    return n("div", {
                        staticClass: "avatar-wrapper"
                    }, [ n("button", {
                        staticClass: "avatar-option submit-btn",
                        style: {
                            "background-image": "url(" + a.cateIcon + ")"
                        },
                        attrs: {
                            "form-type": "submit",
                            eventid: "1_" + e
                        },
                        on: {
                            click: function(n) {
                                t.goContent(a.id, a.cateName);
                            }
                        }
                    }, [ n("div", {
                        staticClass: "avatar-shade"
                    }), t._v(" "), n("p", {
                        staticClass: "avatar-name"
                    }, [ t._v(t._s(a.cateName)) ]) ], 1) ], 1);
                }), t._v(" "), n("div", {
                    staticClass: "avatar-option-last"
                }), t._v(" "), n("div", {
                    staticClass: "avatar-option-last"
                }) ], 2) ]);
            },
            staticRenderFns: []
        };
        a.a = e;
    },
    uzia: function(t, a, n) {
        var e = n("A2dr"), i = n("gY1F"), s = n("ybqe")(e.a, i.a, function(t) {
            n("rRi1");
        }, null, null);
        a.a = s.exports;
    }
}, [ "Qjhx" ]);