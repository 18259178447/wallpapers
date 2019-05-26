var app = new getApp();

Page({
    data: {},
    onLoad: function(a) {
        app.util.setNavColor(app.siteInfo.uniacid);
    },
    updateUserInfo: function(a) {
        if ("getUserInfo:fail auth deny" == a.detail.errMsg) return wx.showModal({
            title: "提示",
            content: "您取消了授权",
            showCancel: !1
        }), !1;
        var o = new getApp(), d = o.siteInfo.uniacid;
        o.util.getUserInfo(function(a) {
            wx.showLoading({
                title: "登录中..."
            }), console.log(a), wx.setStorageSync("kundian_farm_uid", a.memberInfo.uid), wx.setStorageSync("kundian_farm_sessionid", a.sessionid), 
            wx.setStorageSync("kundian_farm_wxInfo", a.wxInfo);
            var n = a.wxInfo.avatarUrl, e = a.wxInfo.nickName, t = a.memberInfo, i = {
                op: "login",
                control: "index",
                avatar: t.avatar,
                uid: t.uid,
                nickname: t.nickname,
                uniacid: d,
                wxNickName: e,
                wxAvatar: n
            };
            o.util.request({
                url: "entry/wxapp/class",
                data: i,
                success: function(a) {
                    if (wx.setStorageSync("kundian_farm_uid", a.data.uid), 0 == a.data.code) {
                        var n = wx.getStorageSync("farm_share_uid");
                        null != n && 0 != n && o.loginBindParent(n, t.uid), wx.showToast({
                            title: "登陆成功",
                            icon: "none",
                            success: function(a) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    } else wx.showToast({
                        title: "登录失败",
                        icon: "none"
                    });
                    a.data.uid && wx.setStorageSync("kundian_farm_uid", a.data.uid), wx.hideLoading();
                }
            });
        }, a.detail);
    },
    onReachBottom: function() {}
});