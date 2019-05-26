var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_active";

Page({
    data: {
        orderData: [],
        active: []
    },
    onLoad: function(a) {
        var e = this, t = wx.getStorageSync("kundian_farm_uid"), i = app.util.url("entry/wxapp/class") + "m=" + mudule_name;
        wx.request({
            url: i,
            data: {
                action: "order",
                op: "getQrcode",
                uniacid: uniacid,
                order_id: a.order_id,
                uid: t
            },
            success: function(a) {
                e.setData({
                    orderData: a.data.orderData,
                    active: a.data.active
                });
            }
        }), app.util.setNavColor(uniacid);
    },
    intoMap: function(a) {
        var e = this.data, t = e.latitude, i = (e.longitude, e.address);
        wx.openLocation({
            latitude: parseFloat(t),
            longitude: parseFloat(longitudee),
            address: i,
            scale: 28
        });
    },
    doCall: function(a) {
        wx.makePhoneCall({
            phoneNumber: this.data.active.phone
        });
    }
});