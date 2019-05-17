function e(e, a, n) {
    wx.request({
        url: e.globalData.host + "/Wxapp/ProQuiz/addNewUser",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: a,
        success: function(e) {
            wx.setStorageSync("quce_uid", e.data), n(e.data);
        }
    });
}

module.exports = {
    CommonLogin: function(a, n) {
        var t = wx.getStorageSync("quce_uid");
        t ? wx.request({
            url: a.globalData.host + "/App/User/autologin/id/" + wx.getStorageSync("quce_uid"),
            success: function() {
                n(t);
            }
        }) : wx.login({
            success: function(t) {
                var o = t.code;
                o && wx.request({
                    url: a.globalData.host + "/Wxapp/QuizPay/getOpenid/code/" + o + "/appid/" + a.globalData.appid,
                    success: function(t) {
                        var o = t.data.openid;
                        wx.setStorageSync("quce_user_openid", o);
                        var u = t.data.unionid, c = {
                            openid: o
                        };
                        u ? c.unionid = u : c.session_key = t.data.session_key, wx.getUserInfo({
                            lang: "zh_CN",
                            success: function(t) {
                                c.unionid ? (c.nickname = t.userInfo.nickName, c.headimg = t.userInfo.avatarUrl, 
                                c.gender = t.userInfo.gender, c.city = t.userInfo.city, c.language = t.userInfo.language, 
                                c.province = t.userInfo.province, c.country = t.userInfo.country, c.appid = a.globalData.appid) : (c.appid = a.globalData.appid, 
                                c.iv = t.iv, c.encryptedData = t.encryptedData), e(a, c, function(e) {
                                    wx.request({
                                        url: a.globalData.host + "/App/User/autologin/id/" + wx.getStorageSync("quce_uid"),
                                        success: function() {
                                            n(e, o);
                                        }
                                    });
                                });
                            },
                            fail: function(e) {
                                wx.setStorageSync("quce_uid", 0), n();
                            }
                        });
                    }
                });
            }
        });
    },
    getOpenid: function(e, a) {
        wx.getStorageSync("quce_user_openid") ? (wx.getStorageSync("quce_uid") || wx.setStorageSync("quce_uid", 0), 
        a()) : wx.login({
            success: function(n) {
                var t = n.code;
                t && wx.request({
                    url: e.globalData.host + "/Wxapp/QuizPay/getOpenid/code/" + t + "/appid/" + e.globalData.appid,
                    success: function(e) {
                        var n = e.data.openid;
                        wx.setStorageSync("quce_user_openid", n), wx.setStorageSync("quce_uid", 0), a();
                    }
                });
            }
        });
    }
};