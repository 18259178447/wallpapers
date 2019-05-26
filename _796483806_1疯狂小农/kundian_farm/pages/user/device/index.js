var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        deviceData: [],
        farmSetData: wx.getStorageSync("kundian_farm_setData")
    },
    onLoad: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getYunDevice",
                control: "control",
                uniacid: uniacid
            },
            success: function(a) {
                t.setData({
                    deviceData: a.data.deviceData
                });
            }
        });
    }
});