var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        phone: ""
    },
    onLoad: function(n) {
        var a = wx.getStorageSync("kundian_farm_uid"), e = (wx.getStorageSync("kundian_farm_setData"), 
        this);
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getUserBindPhone",
                uid: a,
                uniacid: uniacid
            },
            success: function(n) {
                e.setData({
                    phone: n.data.userInfo.phone
                });
            }
        }), app.util.setNavColor(uniacid);
    },
    phone: function() {
        wx.navigateTo({
            url: "../phone/index"
        });
    },
    real_name: function() {
        wx.navigateTo({
            url: "../identity/index"
        });
    },
    safety: function() {
        wx.navigateTo({
            url: "../accountSecurity/index"
        });
    },
    intoDesc: function(n) {
        wx.navigateTo({
            url: "/kundian_farm/pages/HomePage/about/index"
        });
    }
});