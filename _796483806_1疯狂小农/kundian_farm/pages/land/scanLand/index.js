var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        mineLand: [],
        sendMine: [],
        lid: "",
        farmSetData: []
    },
    onLoad: function(a) {
        var e = this, n = a.lid;
        this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), wx.showLoading({
            title: "玩命加载中..."
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getScanLand",
                control: "land",
                uniacid: uniacid,
                lid: n
            },
            success: function(a) {
                e.setData({
                    mineLand: a.data.mineLand,
                    sendMine: a.data.landSeed,
                    user: a.data.user,
                    orderData: a.data.orderData
                }), wx.hideLoading();
            }
        });
    },
    goHome: function(a) {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index"
        });
    }
});