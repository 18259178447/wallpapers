var app = new getApp();

Page({
    data: {
        plant: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = app.siteInfo.uniacid, n = a.sid;
        wx.showLoading({
            title: "玩命加载中..."
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSendDetail",
                control: "land",
                uniacid: e,
                sid: n
            },
            success: function(a) {
                t.setData({
                    plant: a.data.sendDetail
                }), wx.hideLoading();
            }
        }), app.util.setNavColor(e), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    }
});