App({
    onLaunch: function() {
        var o = this, a = this;
        wx.getSystemInfo({
            success: function(a) {
                -1 < (o.globalData.sysData = a).model.indexOf("iPhone X") && (o.globalData.isIphoneX = !0);
                var n = [ a.windowHeight, a.screenWidth, a.model, !1 ], t = n[0], i = n[1], e = n[3];
                -1 < n[2].indexOf("iPhone X") && (e = !0), o.globalData.screenHeight = t, o.globalData.isFullScreen = e, 
                o.globalData.Proportion = i / 750;
            }
        });
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                var n = 68;
                -1 !== a.model.indexOf("iPhone X") ? n = 88 : -1 !== a.model.indexOf("iPhone") && (n = 64), 
                t.globalData.statusBarHeight = a.statusBarHeight, t.globalData.titleBarHeight = n - a.statusBarHeight;
            },
            failure: function() {
                t.globalData.statusBarHeight = 0, t.globalData.titleBarHeight = 0;
            }
        });
        var n = a.siteInfo.siteroot + "?i=" + a.siteInfo.uniacid + "&t=" + a.siteInfo.multiid + "&v=" + a.siteInfo.version + "&from=wxapp&m=kundian_farm&c=entry&a=wxapp&do=class";
        wx.request({
            url: n,
            data: {
                op: "getCommonData",
                uniacid: a.siteInfo.uniacid,
                control: "index"
            },
            success: function(a) {
                wx.setStorageSync("kundianFarmTarbar", a.data.tarbar), wx.setStorageSync("kundian_farm_setData", a.data.farmSetData), 
                "kundian_farm/pages/HomePage/index/index" != a.data.tarbar[0].path && wx.reLaunch({
                    url: "/" + a.data.tarbar[0].path + "?is_tarbar=true"
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onError: function(a) {},
    util: require("util/resource/js/util.js"),
    loginBindParent: function(a, n) {
        null != n && 0 != n && null != a && 0 != a && this.bindParent(a, n);
    },
    bindParent: function(a, n) {
        null == a && 0 == a || this.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "bindParent",
                user_uid: a,
                uniacid: this.siteInfo.uniacid,
                uid: n
            },
            success: function(a) {
                console.log(a);
            },
            error: function(a) {
                console.log(a);
            }
        });
    },
    getAuthUserInfo: function(n) {
        var r = this, s = r.siteInfo.uniacid;
        return new Promise(function(o, a) {
            r.util.getUserInfo(function(a) {
                wx.showLoading({
                    title: "登录中..."
                }), console.log(a), wx.setStorageSync("kundian_farm_uid", a.memberInfo.uid), wx.setStorageSync("kundian_farm_sessionid", a.sessionid), 
                wx.setStorageSync("kundian_farm_wxInfo", a.wxInfo);
                var n = a.wxInfo.avatarUrl, t = a.wxInfo.nickName, i = a.memberInfo, e = {
                    op: "login",
                    action: "index",
                    control: "home",
                    avatar: i.avatar,
                    uid: i.uid,
                    nickname: i.nickname,
                    uniacid: s,
                    wxNickName: t,
                    wxAvatar: n
                };
                r.util.request({
                    url: "entry/wxapp/class",
                    data: e,
                    success: function(a) {
                        if (wx.setStorageSync("kundian_farm_uid", a.data.uid), 0 == a.data.code) {
                            var n = wx.getStorageSync("farm_share_uid");
                            null != n && 0 != n && (r.loginBindParent(n, i.uid), wx.removeStorageSync("farm_share_uid")), 
                            wx.showToast({
                                title: "登陆成功",
                                icon: "none",
                                success: function(a) {}
                            });
                        } else wx.showToast({
                            title: "登录失败",
                            icon: "none"
                        });
                        o(a.data.uid), wx.hideLoading();
                    }
                });
            }, n.detail);
        });
    },
    globalData: {
        userInfo: null,
        uid: "",
        sessionid: "",
        sysData: {},
        isIphoneX: !1,
        screenHeight: 0,
        Proportion: 0,
        isFullScreen: !1,
        tarbar: []
    },
    siteInfo: require("siteinfo.js")
});