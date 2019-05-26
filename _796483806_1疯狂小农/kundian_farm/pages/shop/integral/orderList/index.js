var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        integralData: [],
        page: 1,
        isContent: !0
    },
    onLoad: function(a) {
        wx.getStorageSync("kundian_farm_uid");
        this.getIntegralOrder(!1), app.util.setNavColor(uniacid);
    },
    getIntegralOrder: function(n) {
        var r = this, a = wx.getStorageSync("kundian_farm_uid"), t = r.data, i = t.page, d = t.integralData;
        n && (i = parseInt(i) + 1), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "integral",
                op: "getIntegralRecord",
                uid: a,
                uniacid: uniacid,
                page: i
            },
            success: function(a) {
                var t = a.data.orderData;
                if (n) {
                    for (var e = 0; e < t.length; e++) d.push(t[e]);
                    r.setData({
                        integralData: d,
                        page: i
                    });
                } else a.data.orderData ? r.setData({
                    integralData: a.data.orderData
                }) : r.setData({
                    isContent: !1
                });
            }
        });
    },
    onReachBottom: function(a) {
        this.getIntegralOrder(!0);
    },
    pay: function(a) {
        var e = a.currentTarget.dataset.orderid, n = app.siteInfo.uniacid, r = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/pay",
            data: {
                op: "getIntegralPayOrder",
                orderid: e,
                uniacid: n,
                file: "integral"
            },
            cachetime: "0",
            success: function(a) {
                if (a.data && a.data.data && !a.data.errno) {
                    var t = a.data.data.package;
                    wx.requestPayment({
                        timeStamp: a.data.data.timeStamp,
                        nonceStr: a.data.data.nonceStr,
                        package: a.data.data.package,
                        signType: "MD5",
                        paySign: a.data.data.paySign,
                        success: function(a) {
                            wx.showLoading({
                                title: "加载中"
                            }), app.util.request({
                                url: "entry/wxapp/class",
                                data: {
                                    control: "integral",
                                    op: "sendMsg",
                                    order_id: e,
                                    uniacid: n,
                                    prepay_id: t,
                                    uid: r
                                },
                                success: function(a) {
                                    wx.showModal({
                                        title: "提示",
                                        content: "支付成功",
                                        showCancel: !1,
                                        success: function() {
                                            wx.redirectTo({
                                                url: "../orderList/index"
                                            });
                                        }
                                    }), wx.hideLoading();
                                }
                            });
                        },
                        fail: function(a) {
                            wx.redirectTo({
                                url: "../orderList/index"
                            });
                        }
                    });
                } else wx.redirectTo({
                    url: "../orderList/index"
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && wx.redirectTo({
                            url: "../orderList/index"
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {}
});