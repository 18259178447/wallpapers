var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        currentIndex: "4",
        orderData: [],
        status: "",
        page: 1,
        farmSetData: [],
        isContent: !0,
        show_verify: !0,
        verify_qrcode: ""
    },
    onLoad: function(t) {
        if (t.status) var a = t.status; else a = 4;
        wx.getStorageSync("kundian_farm_uid");
        this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            currentIndex: a
        }), this.getOrderData(), app.util.setNavColor(uniacid);
    },
    onShow: function(t) {
        this.getOrderData();
    },
    getOrderData: function() {
        var e = this, t = e.data.currentIndex, a = wx.getStorageSync("kundian_farm_uid");
        wx.showLoading({
            title: "玩命加载中..."
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "order",
                op: "orderList",
                uniacid: uniacid,
                uid: a,
                status: t
            },
            success: function(t) {
                var a = t.data.orderData;
                0 < a.length ? e.setData({
                    orderData: a,
                    page: 1,
                    isContent: !0
                }) : e.setData({
                    isContent: !1
                }), wx.hideLoading();
            }
        });
    },
    changeIndex: function(t) {
        this.setData({
            currentIndex: t.currentTarget.dataset.index
        }), this.getOrderData();
    },
    cancelOrder: function(t) {
        var a = this, e = wx.getStorageSync("kundian_farm_uid"), r = t.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确认取消订单吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "order",
                        op: "cancelOrder",
                        uid: e,
                        uniacid: uniacid,
                        order_id: r
                    },
                    success: function(t) {
                        1 == t.data.code ? wx.showModal({
                            title: "提示",
                            content: "订单取消成功",
                            showCancel: !1,
                            success: function() {
                                a.getOrderData();
                            }
                        }) : wx.showToast({
                            title: "取消失败"
                        });
                    }
                });
            }
        });
    },
    payOrder: function(t) {
        wx.getStorageSync("kundian_farm_uid");
        var e = t.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/pay",
            data: {
                op: "getShopPayOrder",
                orderid: e,
                uniacid: uniacid,
                file: "shop"
            },
            cachetime: "0",
            success: function(t) {
                if (t.data && t.data.data && !t.data.errno) {
                    var a = t.data.data.package;
                    wx.requestPayment({
                        timeStamp: t.data.data.timeStamp,
                        nonceStr: t.data.data.nonceStr,
                        package: t.data.data.package,
                        signType: "MD5",
                        paySign: t.data.data.paySign,
                        success: function(t) {
                            wx.showLoading({
                                title: "加载中"
                            }), app.util.request({
                                url: "entry/wxapp/class",
                                data: {
                                    control: "shop",
                                    order_id: e,
                                    op: "sendMsg",
                                    uniacid: uniacid,
                                    prepay_id: a
                                },
                                success: function() {
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
                        fail: function(t) {
                            wx.showModal({
                                title: "系统提示",
                                content: "您取消了支付!",
                                showCancel: !1,
                                success: function(t) {}
                            }), wx.hideLoading();
                        }
                    });
                } else console.log("fail1");
            },
            fail: function(t) {
                "JSAPI支付必须传openid" == t.data.message ? wx.navigateTo({
                    url: "/kundian_farm/pages/login/index"
                }) : wx.showModal({
                    title: "系统提示",
                    content: t.data.message ? t.data.message : "错误",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                });
            }
        });
    },
    applyRefund: function(t) {
        var a = this, e = wx.getStorageSync("kundian_farm_uid"), r = t.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确认申请退款吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "order",
                        op: "applyRefund",
                        uid: e,
                        uniacid: uniacid,
                        order_id: r
                    },
                    success: function(t) {
                        1 == t.data.code ? wx.showModal({
                            title: "提示",
                            content: "申请已提交",
                            showCancel: !1,
                            success: function() {
                                a.getOrderData();
                            }
                        }) : wx.showToast({
                            title: "申请失败"
                        });
                    }
                });
            }
        });
    },
    sureGoods: function(t) {
        var a = this, e = wx.getStorageSync("kundian_farm_uid"), r = t.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "order",
                op: "sureGoods",
                uid: e,
                uniacid: uniacid,
                order_id: r
            },
            success: function(t) {
                1 == t.data.code ? wx.showModal({
                    title: "提示",
                    content: "收货成功",
                    showCancel: !1,
                    success: function() {
                        a.getOrderData();
                    }
                }) : wx.showToast({
                    title: "收货失败"
                });
            }
        });
    },
    intoOrderDetail: function(t) {
        var a = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../Group/orderDetails/index?order_id=" + a
        });
    },
    onReachBottom: function(t) {
        var r = this, a = app.siteInfo.uniacid, e = wx.getStorageSync("kundian_farm_uid"), n = r.data, i = n.currentIndex, o = n.page, d = n.orderData;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "order",
                op: "orderList",
                uniacid: a,
                uid: e,
                status: i,
                page: o
            },
            success: function(t) {
                if (t.data.orderData) {
                    for (var a = t.data.orderData, e = 0; e < a.length; e++) d.push(a[e]);
                    r.setData({
                        orderData: d,
                        page: parseInt(o) + 1
                    });
                }
            }
        });
    },
    deleteOrder: function(r) {
        var n = this;
        wx.showModal({
            title: "提示",
            content: "确认删除该订单吗？删除后不可找回！",
            success: function(t) {
                if (t.confirm) {
                    var a = wx.getStorageSync("kundian_farm_uid"), e = r.currentTarget.dataset.orderid;
                    app.util.request({
                        url: "entry/wxapp/class",
                        data: {
                            control: "order",
                            op: "deleteOrder",
                            uniacid: uniacid,
                            orderid: e,
                            uid: a
                        },
                        success: function(t) {
                            1 == t.data.code ? (wx.showToast({
                                title: t.data.msg
                            }), n.getOrderData()) : wx.showToast({
                                title: t.data.msg
                            });
                        }
                    });
                } else t.cancel;
            }
        });
    },
    commentOrder: function(t) {
        console.log(t.currentTarget.dataset.orderid), wx.navigateTo({
            url: "/kundian_farm/pages/shop/comment/index?order_id=" + t.currentTarget.dataset.orderid
        });
    },
    showVerifyQrocde: function(t) {
        var a = t.currentTarget.dataset.orderid, e = this.data.orderData, r = "";
        e.map(function(t) {
            t.id == a && (r = t.offline_qrocde);
        }), this.setData({
            verify_qrcode: r,
            show_verify: !1
        });
    },
    hideVerify: function(t) {
        this.setData({
            show_verify: !0
        });
    }
});