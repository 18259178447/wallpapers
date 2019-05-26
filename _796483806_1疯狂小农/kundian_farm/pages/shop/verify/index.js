var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        orderData: [],
        orderDetail: [],
        is_check: !1
    },
    onLoad: function(a) {
        var e = this, t = a.order_number || "2019021817263261965", r = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "order",
                op: "getOrderDetail",
                uniacid: uniacid,
                order_number: t,
                uid: r
            },
            success: function(a) {
                a.data.is_check ? e.setData({
                    orderData: a.data.orderData,
                    orderDetail: a.data.orderDetail,
                    is_check: a.data.is_check
                }) : wx.showModal({
                    title: "警告",
                    content: "不是核销员禁止核销订单",
                    showCancel: !1,
                    success: function() {
                        wx.reLaunch({
                            url: "/kundian_farm/pages/HomePage/index/index"
                        });
                    }
                });
            }
        });
    },
    verifyOrder: function(a) {
        var e = this.data.orderData;
        wx.showModal({
            title: "提示",
            content: "是否确认核销订单?",
            success: function(a) {
                app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "order",
                        op: "verifyOrder",
                        order_id: e.id,
                        uniacid: uniacid
                    },
                    success: function(a) {
                        wx.showModal({
                            title: "提示",
                            content: a.data.msg,
                            showCancel: "false",
                            success: function() {
                                0 == a.data.code && wx.reLaunch({
                                    url: "/kundian_farm/pages/HomePage/index/index"
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});