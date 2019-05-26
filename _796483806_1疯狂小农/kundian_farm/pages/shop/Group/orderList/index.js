var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        currentIndex: "1",
        proJect: [],
        orderData: [],
        page: 1,
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupList",
                uid: e,
                uniacid: uniacid
            },
            success: function(a) {
                t.setData({
                    orderData: a.data.orderData
                });
            }
        }), app.util.setNavColor(uniacid), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    getOrderData: function() {
        var t = this, a = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupList",
                uid: a,
                uniacid: uniacid
            },
            success: function(a) {
                t.setData({
                    orderData: a.data.orderData
                });
            }
        });
    },
    changeIndex: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            currentIndex: t
        });
        var e = this, r = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupList",
                uid: r,
                uniacid: uniacid,
                status: t
            },
            success: function(a) {
                e.setData({
                    orderData: a.data.orderData
                });
            }
        });
    },
    payGroupOrder: function(a) {
        wx.getStorageSync("kundian_farm_uid");
        var e = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/pay",
            data: {
                op: "getGroupPayOrder",
                orderid: e,
                uniacid: uniacid,
                file: "group"
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
                                title: "玩命加载中"
                            }), app.util.request({
                                url: "entry/wxapp/class",
                                data: {
                                    control: "group",
                                    order_id: e,
                                    op: "sendMsg",
                                    uniacid: uniacid,
                                    prepay_id: t
                                },
                                success: function() {
                                    wx.hideLoading(), wx.showModal({
                                        title: "提示",
                                        content: "支付成功",
                                        showCancel: !1,
                                        success: function() {
                                            wx.redirectTo({
                                                url: "../orderList/index"
                                            });
                                        }
                                    });
                                }
                            });
                        },
                        fail: function(a) {
                            wx.showModal({
                                title: "系统提示",
                                content: "您取消了支付!",
                                showCancel: !1,
                                success: function(a) {
                                    a.confirm && is_jump && wx.redirectTo({
                                        url: "../orderList/index"
                                    });
                                }
                            });
                        }
                    });
                } else console.log("fail1");
            },
            fail: function(a) {
                "JSAPI支付必须传openid" == a.data.message ? wx.navigateTo({
                    url: "/kundian_farm/pages/login/index"
                }) : wx.showModal({
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
    applyRefund: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid"), r = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "applyGroupRefund",
                uid: e,
                uniacid: uniacid,
                order_id: r
            },
            success: function(a) {
                1 == a.data.code ? (wx.showToast({
                    title: "申请已提交"
                }), t.getOrderData()) : wx.showToast({
                    title: "申请失败"
                });
            }
        });
    },
    sureGoods: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid"), r = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "sureGoods",
                uid: e,
                uniacid: uniacid,
                order_id: r
            },
            success: function(a) {
                1 == a.data.code ? (wx.showToast({
                    title: "收货成功"
                }), t.getOrderData()) : wx.showToast({
                    title: "收货失败"
                });
            }
        });
    },
    cancelOrder: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid"), r = a.currentTarget.dataset.orderid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "cancelOrder",
                uid: e,
                uniacid: uniacid,
                order_id: r
            },
            success: function(a) {
                1 == a.data.code ? (wx.showToast({
                    title: "取消成功"
                }), t.getOrderData()) : wx.showToast({
                    title: "取消失败"
                });
            }
        });
    },
    onReachBottom: function(a) {
        var r = this, t = wx.getStorageSync("kundian_farm_uid"), e = r.data, n = e.orderData, i = e.page, o = e.currentIndex;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupList",
                uid: t,
                uniacid: uniacid,
                status: o,
                page: i
            },
            success: function(a) {
                if (a.data.orderData) {
                    for (var t = a.data.orderData, e = 0; e < t.length; e++) n.push(t[e]);
                    r.setData({
                        orderData: n,
                        page: parseInt(i) + 1
                    });
                }
            }
        });
    },
    deleteOrder: function(n) {
        var i = this;
        wx.showModal({
            title: "提示",
            content: "确认删除订单吗？删除后将不可找回",
            success: function(a) {
                if (a.confirm) {
                    var t = n.currentTarget.dataset.orderid, e = wx.getStorageSync("kundian_farm_uid"), r = app.siteInfo.uniacid;
                    app.util.request({
                        url: "entry/wxapp/class",
                        data: {
                            control: "group",
                            op: "deleteOrder",
                            uniacid: r,
                            uid: e,
                            orderid: t
                        },
                        success: function(a) {
                            console.log(a), 1 == a.data.code ? (wx.showToast({
                                title: a.data.msg
                            }), i.getOrderData()) : wx.showToast({
                                title: a.data.msg
                            });
                        }
                    });
                }
            }
        });
    }
});