var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        farmSetData: wx.getStorageSync("kundian_farm_setData"),
        userInfo: []
    },
    onLoad: function(a) {
        var n = this, t = wx.getStorageSync("kundian_farm_uid");
        t ? app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                op: "getWallet",
                uniacid: uniacid,
                uid: t
            },
            success: function(a) {
                console.log(a), n.setData({
                    userInfo: a.data.userInfo,
                    farmSetData: wx.getStorageSync("kundian_farm_setData")
                });
            }
        }) : wx.navigateTo({
            url: "../../login/index"
        }), app.util.setNavColor(uniacid);
    },
    intoCash: function(a) {
        wx.navigateTo({
            url: "../cash/cash"
        });
    },
    intoRecord: function(a) {
        wx.navigateTo({
            url: "../recode/index"
        });
    },
    intoDetail: function(a) {
        wx.navigateTo({
            url: "../wallet_detail/index"
        });
    },
    onReady: function() {},
    onShow: function() {}
});