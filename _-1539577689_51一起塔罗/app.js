App({
    onLaunch: function(e) {
        var t = this;
        if (1037 == e.scene || 1038 == e.scene) {
            var n = e.referrerInfo.extraData.token;
            n && this.mlToken(n);
        }
        var a = wx.getStorageSync("logs") || [];
        a.unshift(Date.now()), wx.setStorageSync("logs", a);
        var o = wx.getUpdateManager();
        o.onCheckForUpdate(function(e) {
            console.log(e.hasUpdate);
        }), o.onUpdateReady(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function(e) {
                    e.confirm && o.applyUpdate();
                }
            });
        }), wx.removeStorageSync("da_cards"), wx.removeStorageSync("cards"), o.onUpdateFailed(function() {}), 
        wx.login({
            success: function(e) {}
        }), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        t.globalData.userInfo = e.userInfo, t.userInfoReadyCallback && t.userInfoReadyCallback(e);
                    }
                });
            }
        });
    },
    mlToken: function(e) {
        wx.request({
            url: this.yu + "/index.php/Index/mladdKey",
            data: {
                secert: this.secert,
                token: e
            },
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            success: function(e) {
                console.log(e);
            }
        });
    },
    globalData: {
        card: {},
        star: "",
        img: "",
        types: "",
        title: "",
        location: {},
        item: {},
        first_in: !0,
        ce: !1,
        fr_user_id: "",
        card_item: {},
        paixing: ""
    },
    auth: {},
    yu: "https://weitaluo.xingpei360.com",
    secert: "825bdee1ae59d7d74d40cca2261f00f28c44dfd32d7ebb76c263aee07467d94d",
    login_state: !1,
    wxInfo: {},
    cate_id: "",
    theme_id: "",
    xingzuo: [],
    chou: !1,
    xuan_xing: !1
});