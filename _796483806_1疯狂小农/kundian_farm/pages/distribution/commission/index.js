var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        canPresented: "0.00",
        hadPresented: 0,
        dakuan: 0,
        farmSetData: wx.getStorageSync("kundian_farm_setData")
    },
    onLoad: function(a) {
        var e = this, t = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "getUserSalePrice",
                uid: t,
                uniacid: uniacid
            },
            success: function(a) {
                e.setData({
                    user: a.data.user
                });
            }
        });
    },
    intoWithdrawRecord: function(a) {
        wx.navigateTo({
            url: "../recode/index"
        });
    }
});