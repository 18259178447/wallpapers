var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "用户中心"
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        app.globalData.config ? (e.setData({
            config: app.globalData.config
        }), e.data.config.review || app.login(function(a) {
            e.setData({
                user: a
            }), e.showfee();
        })) : app.getConfig(function(a) {
            e.setData({
                config: a
            }), a.review || app.login(function(a) {
                e.setData({
                    user: a
                }), e.showfee();
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {
        var a = this;
        return {
            title: a.data.config.spacename,
            imageUrl: a.data.config.skinurl + a.data.config.sharepic,
            path: "/tc_card/pages/index/index",
            success: function(a) {
                console.log("转发成功");
            }
        };
    },
    updateUserInfo: function(a) {
        var e = this;
        app.getUserInfo(function(a) {
            a && (e.setData({
                userInfo: a,
                login: 0
            }), wx.navigateTo({
                url: "/tc_card/pages/user/cash?fee=" + e.data.fee
            }));
        }, a.detail);
    },
    system: function() {
        wx.openSetting({});
    },
    sendList: function() {
        wx.navigateTo({
            url: "/tc_card/pages/user/sendlist"
        });
    },
    cash: function() {
        wx.navigateTo({
            url: "/tc_card/pages/user/cash?fee=" + this.data.fee
        });
    },
    showfee: function() {
        var t = this, a = t.data.user;
        app.util.request({
            url: "entry/wxapp/getfee",
            method: "post",
            dataType: "json",
            data: {
                openid: a
            },
            success: function(a) {
                var e = a.data.fee;
                t.setData({
                    fee: e
                });
            }
        });
    }
});