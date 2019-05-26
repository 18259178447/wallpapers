var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_active", url = app.util.url("entry/wxapp/class") + "m=" + mudule_name;

Page({
    data: {
        orderData: [],
        is_check_user: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = a.order_id, r = wx.getStorageSync("kundian_farm_uid"), i = wx.getStorageSync("kundian_farm_setData");
        wx.request({
            url: url,
            data: {
                action: "order",
                op: "getTicketData",
                order_number: e,
                uniacid: uniacid,
                uid: r
            },
            success: function(a) {
                t.setData({
                    orderData: a.data.orderData,
                    is_check_user: a.data.is_check_user,
                    farmSetData: i
                });
            }
        }), app.util.setNavColor(uniacid);
    },
    checkActive: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid"), r = t.data.orderData;
        wx.showModal({
            title: "提示",
            content: "确认核销该订单吗？",
            success: function(a) {
                a.confirm && wx.request({
                    url: url,
                    data: {
                        action: "order",
                        op: "checkActive",
                        uniacid: uniacid,
                        order_id: t.data.orderData.id,
                        uid: e
                    },
                    success: function(a) {
                        0 == a.data.code && (r.status = 4, t.setData({
                            orderData: r
                        })), wx.showModal({
                            title: "提示",
                            content: a.data.msg,
                            showCancel: !1
                        });
                    }
                });
            }
        });
    }
});