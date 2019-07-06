require("../../../common/manifest.js"), require("../../../common/vendor.js"), global.webpackJsonpMpvue([ 6 ], {
    Djze: function(t, a, e) {
        var s = {
            render: function() {
                var t = this, a = t.$createElement, e = t._self._c || a;
                return e("div", {
                    staticClass: "details-container"
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
                        eventid: "3"
                    },
                    on: {
                        submit: t.getFormId
                    }
                }, [ "success" !== t.tag ? e("swiper", {
                    staticClass: "swiper",
                    attrs: {
                        current: t.currentIndex,
                        duration: t.duration,
                        eventid: "0"
                    },
                    on: {
                        change: t.handleChange
                    }
                }, t._l(t.avatarArr, function(t, a) {
                    return e("div", [ e("swiper-item", {
                        staticClass: "swiper-item",
                        attrs: {
                            mpcomid: "0_" + a
                        }
                    }, [ e("div", {
                        staticClass: "avatar-detail",
                        style: {
                            "background-image": "url(" + t.raw.url + ")"
                        }
                    }) ]) ], 1);
                })) : e("div", {
                    staticClass: "avatar-detail",
                    style: {
                        "background-image": "url(" + t.avatarUrl + ")"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "btn-box"
                }, [ e("button", {
                    staticClass: "btn share-btn",
                    attrs: {
                        "open-type": "share",
                        "form-type": "submit"
                    }
                }, [ e("img", {
                    staticClass: "icon",
                    attrs: {
                        src: "/static/images/share.png"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "down-content share-content"
                }, [ t._v("分享头像") ]) ]), t._v(" "), t.isDown ? e("button", {
                    staticClass: "btn down-btn submit-btn",
                    attrs: {
                        "form-type": "submit"
                    }
                }, [ e("img", {
                    staticClass: "icon",
                    attrs: {
                        src: "/static/images/finish.png"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "down-content"
                }, [ t._v("下载完成") ]), t._v(" "), e("div", {
                    staticClass: "btn-shade"
                }) ]) : e("button", {
                    staticClass: "btn down-btn submit-btn",
                    attrs: {
                        "form-type": "submit",
                        eventid: "1"
                    },
                    on: {
                        click: t.getPermiss
                    }
                }, [ e("img", {
                    staticClass: "icon",
                    attrs: {
                        src: "/static/images/down.png"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "down-content"
                }, [ t._v("下载头像") ]) ]) ], 1), t._v(" "), e("button", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: t.isService,
                        expression: "isService"
                    } ],
                    staticClass: "submit-btn service-btn detail-serviece-btn",
                    attrs: {
                        "open-type": "contact",
                        "form-type": "submit",
                        "send-message-title": t.sendMessage,
                        "show-message-card": "true",
                        "send-message-img": "/static/images/service-share.png"
                    }
                }, [ e("img", {
                    staticClass: "get-icon",
                    attrs: {
                        src: "/static/images/get-icon.png"
                    }
                }) ]), t._v(" "), e("img", {
                    directives: [ {
                        name: "show",
                        rawName: "v-show",
                        value: t.isHome,
                        expression: "isHome"
                    } ],
                    staticClass: "home-btn",
                    attrs: {
                        src: "/static/images/home.png",
                        eventid: "2"
                    },
                    on: {
                        click: t.goMain
                    }
                }) ], 1) ], 1), t._v(" "), !t.isConnected && t.isEnter ? e("div", {
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
    G8bK: function(t, a) {},
    UEcR: function(t, a, e) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var s = e("5nAL"), i = e.n(s), n = e("lmdi");
        new i.a(n.a).$mount();
    },
    Vagp: function(t, a, e) {
        (function(t) {
            var s = e("cF7b");
            a.a = {
                data: function() {
                    return {
                        currentIndex: "",
                        current: "",
                        duration: 0,
                        avatarArr: "",
                        isDown: !1,
                        avatarUrl: "",
                        isConnected: !0,
                        isEnter: !1,
                        cateId: "",
                        page: "",
                        isMax: !1,
                        tag: "",
                        isHome: !1,
                        isService: !0
                    };
                },
                onLoad: function(a) {
                    var e = this;
                    if (this.isEnter = this.isService = !0, this.isHome = !1, t.mpvue.setNavigationBarTitle({
                        title: "头像详情"
                    }), this.current = this.currentIndex = "", this.getParams(), a.channel) return this.isService = !1, 
                    this.isHome = !0, this.tag = "success", void (this.avatarUrl = a.file);
                    this.isDown = !1, this.tag = a.tag;
                    var s = parseInt(a.index);
                    "result" === this.tag && (this.cateId = a.cateId, this.page = a.page), t.mpvue.getStorage({
                        key: "avatarArr",
                        success: function(t) {
                            if ("success" === e.tag) e.avatarUrl = t.data[0]; else {
                                if (e.avatarArr = t.data, 0 !== s) {
                                    var a = [].concat(e.avatarArr[s]);
                                    e.avatarArr = a.concat(e.avatarArr), e.currentIndex = e.current = s + 1;
                                } else e.currentIndex = e.current = s;
                                e.duration = 500;
                            }
                        }
                    });
                },
                onShow: function() {
                    var a = this;
                    this.duration = 0, t.mpvue.setNavigationBarColor({
                        frontColor: "#000000",
                        backgroundColor: "#ffffff"
                    }), t.mpvue.onNetworkStatusChange(function(t) {
                        a.isConnected = t.isConnected;
                    });
                },
                onUnload: function() {
                    this.uploadData();
                },
                onShareAppMessage: function() {
                    var t = "success" === this.tag ? this.avatarUrl + "jpg" : this.avatarArr[this.current].raw.url + "jpg";
                    return this.currentIndex = this.current, {
                        title: "你觉得这个头像怎么样？",
                        path: "/pages/main/details/main?channel=details&file=" + t,
                        imageUrl: t
                    };
                },
                methods: {
                    handleChange: function(t) {
                        this.isDown = !1, this.current = t.mp.detail.current, "result" === this.tag && t.mp.detail.current === this.avatarArr.length - 1 && this.getList();
                    },
                    goMain: function() {
                        t.mpvue.reLaunch({
                            url: "/pages/main/index/main"
                        });
                    },
                    getPermiss: function() {
                        var a = this;
                        t.mpvue.getSetting({
                            success: function(e) {
                                !1 === e.authSetting["scope.writePhotosAlbum"] && t.mpvue.openSetting({
                                    success: function(t) {}
                                }), a.downAvatar();
                            }
                        });
                    },
                    downAvatar: function() {
                        var a = this, e = "success" === this.tag ? this.avatarUrl : this.avatarArr[this.current].raw.url, s = new Date().getTime();
                        t.mpvue.downloadFile({
                            url: "https://news.moxiu.com/applets/avatar/download?file=" + e + "&name=" + s + ".jpg",
                            success: function(e) {
                                200 === e.statusCode && t.mpvue.saveImageToPhotosAlbum({
                                    filePath: e.tempFilePath,
                                    success: function(e) {
                                        a.isDown = !0, t.mpvue.showToast({
                                            title: "保存成功啦~",
                                            icon: "success",
                                            duration: 1e3
                                        });
                                    }
                                });
                            }
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
                    }
                }
            };
        }).call(a, e("DuR2"));
    },
    lmdi: function(t, a, e) {
        var s = e("Vagp"), i = e("Djze"), n = e("ybqe")(s.a, i.a, function(t) {
            e("G8bK");
        }, null, null);
        a.a = n.exports;
    }
}, [ "UEcR" ]);