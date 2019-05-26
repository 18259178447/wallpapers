var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_active";

Page({
    data: {
        currentIndex: "1",
        orderList: [],
        page: 1,
        farmSetData: wx.getStorageSync("kundian_farm_setData")
    },
    onLoad: function(a) {
        this.getOrderData(1, 1, 0), app.util.setNavColor(uniacid);
    },
    getOrderData: function(a, n, i) {
        var r = this, t = app.util.url("entry/wxapp/class") + "m=" + mudule_name, e = wx.getStorageSync("kundian_farm_uid");
        wx.request({
            url: t,
            data: {
                action: "order",
                op: "getOrderList",
                uniacid: uniacid,
                uid: e,
                page: n,
                current: a
            },
            success: function(a) {
                if (a.data.orderList) {
                    var t = r.data.orderList, e = a.data.orderList;
                    1 == i ? e.map(function(a) {
                        t.push(a);
                    }) : (t = e, n = 1), r.setData({
                        orderList: t,
                        page: n
                    });
                }
            }
        });
    },
    changeIndex: function(a) {
        var t = a.currentTarget.dataset.index;
        this.getOrderData(t, 1, 0), this.setData({
            currentIndex: a.currentTarget.dataset.index
        });
    },
    onReachBottom: function(a) {
        var t = this.data.changeIndex, e = parseInt(this.data.page) + 1;
        this.getOrderData(t, e, 1);
    },
    onPullDownRefresh: function(a) {
        var t = this.data.changeIndex;
        this.getOrderData(t, 1, 1);
    },
    cancelOrder: function(a) {
        var t = this, e = this.data.changeIndex, n = wx.getStorageSync("kundian_farm_uid"), i = a.currentTarget.dataset.orderid, r = app.util.url("entry/wxapp/class") + "m=" + mudule_name;
        wx.showModal({
            title: "提示",
            content: "确认取消订单吗？",
            success: function(a) {
                a.confirm && wx.request({
                    url: r,
                    data: {
                        action: "order",
                        op: "cancelOrder",
                        uniacid: uniacid,
                        order_id: i,
                        uid: n
                    },
                    success: function(a) {
                        1 == a.data.code ? wx.showModal({
                            title: "提示",
                            content: a.data.msg,
                            showCancel: !1,
                            success: function(a) {
                                t.getOrderData(e, 1, 0);
                            }
                        }) : wx.showModal({
                            title: "提示",
                            content: a.data.msg,
                            showCancel: !1
                        });
                    }
                });
            }
        });
    },
    nowPay: function(a) {
        var n = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/activePay",
            data: {
                orderid: n,
                uniacid: uniacid
            },
            cachetime: "0",
            success: function(a) {
                if (a.data && a.data.data && !a.data.errno) {
                    var e = a.data.data.package;
                    wx.requestPayment({
                        timeStamp: a.data.data.timeStamp,
                        nonceStr: a.data.data.nonceStr,
                        package: a.data.data.package,
                        signType: "MD5",
                        paySign: a.data.data.paySign,
                        success: function(a) {
                            var t = app.util.url("entry/wxapp/active") + "m=" + mudule_name;
                            wx.request({
                                url: t,
                                data: {
                                    op: "notify",
                                    uniacid: uniacid,
                                    uid: uid,
                                    orderid: n,
                                    prepay_id: e
                                },
                                success: function(a) {
                                    wx.hideLoading(), wx.showToast({
                                        title: "支付成功",
                                        success: function(a) {
                                            wx.redirectTo({
                                                url: "../payforResult/index?status=true&order_id=" + n
                                            });
                                        }
                                    });
                                }
                            });
                        },
                        fail: function(a) {
                            wx.showModal({
                                title: "提示",
                                content: "您取消了支付",
                                showCancel: !1
                            });
                        }
                    });
                }
                "JSAPI支付必须传openid" == a.data.message && wx.navigateTo({
                    url: "../../login/index"
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                });
            }
        });
    },
    seeTicket: function(a) {
        var t = a.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../ticket/index?order_id=" + t
        });
    }
});