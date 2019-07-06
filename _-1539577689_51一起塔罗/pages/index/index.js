var t = getApp(), e = void 0, a = void 0;

Page({
    data: {
        list: [],
        list1: [],
        show: !0,
        loadct: !1,
        cur: 0,
        bar: {},
        feng_hide: !0,
        againSet: !1,
        checkNum: [],
        show_today: !0,
        tuijian: [],
        shoutip: !1,
        today: !1,
        show_2019: !0,
        page: 1
    },
    closetip: function() {
        this.setData({
            shoutip: !1
        }), clearInterval(a);
    },
    cells: function() {
        var t = this;
        a = setInterval(function() {
            t.setData({
                bianhuan: !t.data.bianhuan
            });
        }, 500);
    },
    close2019: function() {
        this.setData({
            show_2019: !0
        });
    },
    checkPeidui: function() {
        wx.request({
            url: t.yu + "/index.php/PeiDui/checkLingShu",
            data: {
                auth: t.auth.auth,
                secert: t.secert
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                t.data.checked ? wx.navigateTo({
                    url: "/pages/match/match"
                }) : wx.navigateTo({
                    url: "/pages/match/chou/chou"
                });
            }
        });
    },
    jinru: function() {
        wx.navigateTo({
            url: "/pages/match/chou/chou"
        });
    },
    hide: function(t) {
        t.setData({
            feng_hide: !0
        });
    },
    closeToday: function() {
        this.setData({
            show_today: !0
        });
    },
    goToday: function() {
        var e = this;
        wx.getLocation({
            success: function(a) {
                t.globalData.item = e.data.tuijian[0], a.longitude = Math.floor(100 * a.longitude) / 100, 
                a.latitude = Math.floor(100 * a.latitude) / 100, t.globalData.location = a, t.theme_id = e.data.tuijian[0].theme_id, 
                t.cate_id = e.data.tuijian[0].cate_id, t.globalData.img = e.data.tuijian[0].theme_logo, 
                t.globalData.title = e.data.tuijian[0].theme_title, console.log(e.data.tuijian[0]), 
                e.setData({
                    show_today: !0
                }), wx.navigateTo({
                    url: "/pages/taluo/taluo"
                });
            },
            fail: function(t) {
                e.setData({
                    againSet: !0
                });
            }
        });
    },
    check2019: function(e) {
        wx.request({
            url: t.yu + "/index.php/YunShi/checkYunshi.html",
            data: {
                auth: t.auth.auth,
                secert: t.secert
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: e
        });
    },
    go2019: function() {
        this.check2019(function(t) {
            t.data.checked ? wx.navigateTo({
                url: "/pages/yunshi/match"
            }) : wx.navigateTo({
                url: "/pages/yunshi/chou/chou"
            });
        });
    },
    select: function(t) {
        t.currentTarget.dataset.id;
        var e = parseInt(t.currentTarget.dataset.id), a = t.currentTarget.dataset.ids;
        e != this.data.cur && (this.setData({
            page: 1
        }), this.getItem(a), this.setData({
            cur: e
        }));
    },
    goTest: function(e) {
        var a = parseInt(e.currentTarget.dataset.id), i = this;
        if ("8" == i.data.item[a].cate_id) return "23" == i.data.item[a].theme_id && this.go2019(), 
        void ("22" == i.data.item[a].theme_id && this.checkPeidui());
        if ("6" == i.data.item[a].cate_id) for (var n = 0, o = this.data.checkNum.length; n < o; n++) if (i.data.item[a].theme_id == this.data.checkNum[n].theme_id && "1" != this.data.checkNum[n].num) return t.theme_id = "4", 
        void wx.navigateTo({
            url: "/pages/myCenter/jie/jie?type=today"
        });
        wx.showLoading({
            title: "请稍等"
        }), t.globalData.item = i.data.item[a], wx.getLocation({
            success: function(e) {
                e.longitude = Math.floor(100 * e.longitude) / 100, e.latitude = Math.floor(100 * e.latitude) / 100, 
                t.globalData.location = e, t.theme_id = i.data.item[a].theme_id, t.cate_id = i.data.item[a].cate_id, 
                t.globalData.img = i.data.item[a].theme_logo, t.globalData.title = i.data.item[a].theme_title, 
                t.globalData.paixing = i.data.item[a].paixing, wx.hideLoading(), "6" == i.data.item[a].cate_id ? wx.navigateTo({
                    url: "/pages/taluo/taluo"
                }) : wx.navigateTo({
                    url: "/pages/taluo/xi/xi"
                });
            },
            fail: function(t) {
                wx.hideLoading(), i.setData({
                    againSet: !0
                });
            }
        });
    },
    goTest1: function(e) {
        var a = parseInt(e.currentTarget.dataset.id), i = this;
        if ("jump" != i.data.bar[a].type) {
            if ("6" == i.data.bar[a].cate_id) for (var n = 0, o = this.data.checkNum.length; n < o; n++) if (i.data.bar[a].theme_id == this.data.checkNum[n].theme_id && "1" != this.data.checkNum[n].num) return void wx.navigateTo({
                url: "/pages/myCenter/jie/jie?type=today"
            });
            wx.showLoading({
                title: "请稍等"
            }), t.globalData.item = i.data.bar[a], wx.getLocation({
                success: function(e) {
                    e.longitude = Math.floor(100 * e.longitude) / 100, e.latitude = Math.floor(100 * e.latitude) / 100, 
                    t.globalData.location = e, t.theme_id = i.data.bar[a].theme_id, t.cate_id = i.data.bar[a].cate_id, 
                    t.globalData.img = i.data.bar[a].theme_logo, t.globalData.title = i.data.bar[a].theme_title, 
                    t.globalData.paixing = i.data.bar[a].paixing, wx.hideLoading(), "6" == i.data.bar[a].cate_id ? wx.navigateTo({
                        url: "/pages/taluo/taluo"
                    }) : wx.navigateTo({
                        url: "/pages/taluo/xi/xi"
                    });
                },
                fail: function(t) {
                    wx.hideLoading(), i.setData({
                        againSet: !0
                    });
                }
            });
        } else wx.navigateToMiniProgram({
            appId: i.data.bar[a].appid
        });
    },
    cancel: function() {
        this.setData({
            againSet: !1
        });
    },
    openSetting: function() {
        wx.getSetting({
            success: function(t) {
                wx.authorize({
                    scope: "scope.userLocation",
                    success: function() {},
                    fail: function() {}
                });
            }
        }), this.setData({
            againSet: !1
        });
    },
    checkTest: function() {
        var e = this;
        wx.request({
            url: t.yu + "/index.php/Index/checkTest.html",
            data: {
                secert: t.secert,
                auth: t.auth.auth
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                e.setData({
                    checkNum: a.data.num
                }), e.data.theme_item ? e.shareTest() : t.globalData.first_in && e.check2019(function(a) {
                    a.data.checked || setTimeout(function() {
                        e.setData({
                            show_2019: !1
                        }), t.globalData.first_in = !1;
                    }, 2e3);
                });
            }
        });
    },
    goCenter: function() {
        wx.redirectTo({
            url: "/pages/myCenter/myCenter"
        });
    },
    goAll: function() {
        wx.redirectTo({
            url: "/pages/all/all"
        });
    },
    onLoad: function(a) {
        var i = this;
        if (console.log(a), this.cells(), a.theme_id) {
            var n = {
                secert: t.secert,
                theme_id: a.theme_id
            };
            wx.request({
                url: t.yu + "/index.php/Index/getThemeDetail",
                data: n,
                method: "POST",
                header: {
                    "content-type": "application/json"
                },
                success: function(t) {
                    console.log(t), i.setData({
                        theme_item: t.data.data
                    });
                }
            });
        }
        this.setData({
            yu: t.yu
        }), t.auth.auth ? this.setData({
            feng_hide: !0
        }) : this.setData({
            feng_hide: !1
        }), e = a.fr_user_id ? a.fr_user_id : "", this.getbar(), t.auth.auth || wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] ? (wx.showLoading({
                    title: "登录中"
                }), wx.login({
                    success: function(n) {
                        var o = n.code, s = "";
                        a.theme_id && !a.tiao_type && (s = "pages/index/index?fr_user_id=" + a.fr_user_id + "&theme_id=" + a.theme_id), 
                        wx.getUserInfo({
                            success: function(a) {
                                var n = a.userInfo;
                                t.wxInfo.userInfo = n, wx.request({
                                    url: t.yu + "/index.php/Login/login.html",
                                    data: {
                                        code: o,
                                        user_infos: n,
                                        secert: t.secert,
                                        fr_user_id: e,
                                        scene: s
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/json"
                                    },
                                    success: function(e) {
                                        t.auth = e.data.data, t.login_state = !0, wx.hideLoading(), wx.showToast({
                                            title: "登录成功"
                                        }), setTimeout(function() {
                                            i.hide(i);
                                        }, 1e3), i.checkTest();
                                    }
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                })) : i.setData({
                    loadct: !0
                });
            }
        });
    },
    shareTest: function() {
        var e = this;
        if (t.login_state) {
            if ("6" == e.data.theme_item.cate_id) for (var a = 0, i = this.data.checkNum.length; a < i; a++) if (e.data.theme_item.theme_id == this.data.checkNum[a].theme_id && "1" != this.data.checkNum[a].num) return void wx.showToast({
                title: "今天的次数已用完了哦",
                icon: "none"
            });
            t.globalData.item = e.data.theme_item, wx.getLocation({
                success: function(a) {
                    a.longitude = Math.floor(100 * a.longitude) / 100, a.latitude = Math.floor(100 * a.latitude) / 100, 
                    t.globalData.location = a, t.theme_id = e.data.theme_item.theme_id, t.cate_id = e.data.theme_item.cate_id, 
                    t.globalData.img = e.data.theme_item.theme_logo, t.globalData.title = e.data.theme_item.theme_title, 
                    t.globalData.paixing = e.data.theme_item.paixing, wx.hideLoading(), e.setData({
                        theme_item: ""
                    }), "6" == e.data.theme_item.cate_id ? wx.navigateTo({
                        url: "/pages/taluo/taluo"
                    }) : wx.navigateTo({
                        url: "/pages/taluo/xi/xi"
                    });
                },
                fail: function(t) {
                    e.setData({
                        againSet: !0
                    });
                }
            });
        } else this.setData({
            loadct: !0
        });
    },
    getbar: function() {
        var e = this;
        wx.request({
            url: t.yu + "/index.php/Index/getInit.html",
            data: {
                secert: t.secert
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(a) {
                t.xingzuo = a.data.cons, e.setData({
                    bar: a.data.banner,
                    menu: a.data.cate
                }), e.getItem(a.data.cate[0].cate_id), e.tuijian(6);
            }
        });
    },
    tuijian: function(e) {
        var a = this;
        wx.request({
            url: t.yu + "/index.php/Index/getList.html",
            data: {
                cate_id: e,
                secert: t.secert
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                a.setData({
                    tuijian: t.data.theme
                });
            }
        });
    },
    getMenu: function() {
        var e = this;
        wx.request({
            url: t.yu + "/Home/Cover/getMenu",
            data: {},
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                e.setData({
                    menu: t.data.menu
                }), e.getItem(t.data.menu[0].id);
            }
        });
    },
    getItem: function(e) {
        var a = this;
        wx.request({
            url: t.yu + "/index.php/Index/getList.html",
            data: {
                cate_id: e,
                secert: t.secert,
                page: this.data.page
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                a.setData({
                    item: t.data.theme
                });
            }
        });
    },
    onShow: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                show: !1
            });
        }, 2e3), t.auth.auth && this.checkTest();
    },
    show: function() {},
    getUserInfo: function(a) {
        var i = a.detail.userInfo, n = this;
        this.setData({
            userInfo: a.detail.userInfo,
            loadct: !1
        }), wx.showLoading({
            title: "登录中"
        }), t.wxInfo.userInfo = i, wx.login({
            success: function(a) {
                var o = a.code;
                wx.request({
                    url: t.yu + "/index.php/Login/login.html",
                    data: {
                        code: o,
                        user_infos: i,
                        secert: t.secert,
                        fr_user_id: e
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        wx.hideLoading(), wx.showToast({
                            title: "登录成功"
                        }), t.auth = e.data.data, t.login_state = !0, n.checkTest(), setTimeout(function() {
                            n.hide(n), n.setData({
                                shoutip: !0
                            });
                        }, 1e3);
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            path: "/pages/index/index?fr_user_id=" + t.auth.user_id + "&&type=index",
            title: "专业的塔罗牌在线免费占卜",
            imageUrl: "https://weitaluo.xingpei360.com/Public/Api/mp3/1227.jpg",
            success: function(t) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            },
            fail: function(t) {}
        };
    }
});