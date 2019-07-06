App({
    onLaunch: function() {
        var a = this;
        a.checkFormDate(), wx.login({
            success: function(t) {
                wx.request({
                    url: a.globalData.host + "/wxlogin",
                    data: {
                        appid: "wx97b145853222caa2",
                        code: t.code
                    },
                    success: function(t) {
                        a.globalData.token = t.data.data.token, wx.setStorage({
                            key: "token",
                            data: t.data.data.token
                        });
                    }
                });
            }
        }), a.getUserInfo();
    },
    getUserInfo: function() {
        var a = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(t) {
                        a.globalData.userInfo = t.userInfo, a.userInfoReadyCallback && a.userInfoReadyCallback(t);
                    }
                });
            }
        });
    },
    checkFormDate: function() {
        var a = this;
        wx.getStorage({
            key: "formDate",
            success: function(t) {
                if ("" != t.data) {
                    var e = new Date(t.data), o = new Date();
                    a.globalData.formDate = !(o - e >= 864e5);
                } else a.globalData.formDate = !1;
            },
            fail: function(t) {
                a.globalData.formDate = !1;
            }
        });
    },
    globalData: {
        userInfo: null,
        appid: "wx97b145853222caa2",
        cdn: "http://static.whiter.com.cn/uploads/wx_qltx_image",
        host: "https://xcxapi.whiter.com.cn/api",
        token: "",
        formDate: !1
    }
});