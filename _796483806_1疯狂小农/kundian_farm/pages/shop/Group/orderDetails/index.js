var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        borderImg: "../../../../images/icon/address-line.png",
        orderData: [],
        orderDetail: [],
        aboutData: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var o = this, t = a.order_id, e = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "order",
                op: "getOrderDetail",
                uid: e,
                uniacid: uniacid,
                order_id: t
            },
            success: function(a) {
                var t = a.data, e = t.orderData, r = t.orderDetail, i = t.aboutData;
                o.setData({
                    orderData: e,
                    orderDetail: r,
                    aboutData: i
                });
            }
        }), app.util.setNavColor(uniacid);
        var r = wx.getStorageSync("kundian_farm_setData");
        o.setData({
            farmSetData: r
        });
    },
    copyData: function(a) {
        var t = a.currentTarget.dataset.info;
        wx.setClipboardData({
            data: t,
            success: function(a) {
                wx.showToast({
                    title: "复制成功"
                });
            }
        });
    },
    gotoMerchant: function() {
        var a = this.data.farmSetData;
        wx.openLocation({
            latitude: parseFloat(a.self_lifting_place.lat),
            longitude: parseFloat(a.self_lifting_place.lng),
            name: a.self_lifting_address
        });
    }
});