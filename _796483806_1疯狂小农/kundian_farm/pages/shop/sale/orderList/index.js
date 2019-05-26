var _Page;

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page((_defineProperty(_Page = {
    data: {
        currentIndex: 0,
        page: 1,
        is_show_send: 1,
        orderid: "",
        express_company: "",
        send_number: "",
        type: 1,
        farmSetData: [],
        isContent: !0
    },
    onLoad: function(e) {
        app.util.setNavColor(uniacid);
        var t = this, a = e.type;
        t.setData({
            type: a,
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), t.getOrder(t, uniacid, a);
    },
    changeIndex: function(e) {
        this.setData({
            currentIndex: e.currentTarget.dataset.index
        });
        var t = this;
        t.getOrder(t, uniacid, t.data.type);
    },
    showSend: function(e) {
        var t = e.currentTarget.dataset.orderid;
        this.setData({
            orderid: t,
            is_show_send: 2
        });
    },
    hideSend: function(e) {
        this.setData({
            is_show_send: 1
        });
    },
    scan: function(e) {
        var t = this;
        wx.scanCode({
            success: function(e) {
                t.setData({
                    send_number: e.result
                });
            }
        });
    },
    sureSend: function(e) {
        var t = this, a = t.data, n = a.orderid, r = a.type, d = a.send_number, i = e.detail.value.express_company;
        "" == d && (d = e.detail.value.send_number), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "manager",
                op: "sendGoods",
                uniacid: uniacid,
                orderid: n,
                express_company: i,
                send_number: d
            },
            success: function(e) {
                1 == e.data.code && wx.showModal({
                    title: "提示",
                    content: "发货成功",
                    confirmText: "朕知道了",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && (t.setData({
                            is_show_send: 1,
                            send_number: ""
                        }), t.getOrder(t, uniacid, r));
                    }
                });
            }
        });
    }
}, "sureSend", function(e) {
    var t = this, a = t.data, n = a.orderid, r = a.send_number, d = a.type, i = e.detail.value.express_company;
    "" == r && (r = e.detail.value.send_number), app.util.request({
        url: "entry/wxapp/class",
        data: {
            control: "manager",
            op: "sureSend",
            uniacid: uniacid,
            orderid: n,
            express_company: i,
            send_number: r,
            type: d
        },
        success: function(e) {
            0 == e.data.code && wx.showModal({
                title: "提示",
                content: e.data.msg,
                confirmText: "朕知道了",
                showCancel: !1,
                success: function(e) {
                    e.confirm && (t.setData({
                        is_show_send: 1,
                        send_number: ""
                    }), t.getOrder(t, uniacid, t.data.type));
                }
            });
        }
    });
}), _defineProperty(_Page, "getOrder", function(a, e, t) {
    wx.showLoading({
        title: "玩命加载中...."
    });
    var n = this.data.isContent;
    app.util.request({
        url: "entry/wxapp/class",
        data: {
            control: "manager",
            op: "order_list",
            uniacid: e,
            current: a.data.currentIndex,
            type: t
        },
        success: function(e) {
            var t = e.data.orderData;
            n = 0 < t.length, a.setData({
                orderData: t,
                page: 1,
                isContent: n
            }), wx.hideLoading();
        }
    });
}), _defineProperty(_Page, "cancelOrder", function(e) {
    var t = this, a = e.currentTarget.dataset.orderid, n = this.data.type;
    app.util.request({
        url: "entry/wxapp/class",
        data: {
            control: "manager",
            op: "cancelOrder",
            uniacid: uniacid,
            orderid: a,
            type: n
        },
        success: function(e) {
            wx.showModal({
                title: "提示",
                confirmText: "朕知道了",
                showCancel: !1,
                content: e.data.msg,
                success: function() {
                    t.getOrder(t, uniacid, t.data.type);
                }
            });
        }
    });
}), _defineProperty(_Page, "onReachBottom", function(e) {
    var t = this, a = t.data, n = a.page, r = a.orderData, d = a.type;
    app.util.request({
        url: "entry/wxapp/class",
        data: {
            control: "manager",
            op: "order_list",
            uniacid: uniacid,
            current: t.data.currentIndex,
            page: n,
            type: d
        },
        success: function(e) {
            e.data.orderData && e.data.orderData.map(function(e) {
                r.push(e);
            });
            t.setData({
                orderData: r,
                page: parseInt(n) + 1
            });
        }
    });
}), _defineProperty(_Page, "intoOrderDetail", function(e) {
    var t = e.currentTarget.dataset, a = t.orderid, n = (t.status, this.data.type);
    wx.navigateTo({
        url: "../orderState/index?orderid=" + a + "&type=" + n
    });
}), _defineProperty(_Page, "deleteOrder", function(n) {
    var r = this;
    wx.showModal({
        title: "提示",
        content: "确认删除该订单吗？删除后将不可找回！",
        success: function(e) {
            if (e.confirm) {
                var t = r.data.type, a = n.currentTarget.dataset.orderid;
                app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "manager",
                        op: "deleteOrder",
                        orderid: a,
                        uniacid: uniacid,
                        type: t
                    },
                    success: function(e) {
                        0 != e.data.code ? wx.showToast({
                            title: e.data.msg
                        }) : wx.showModal({
                            title: "提示",
                            content: e.data.msg,
                            confirmText: "朕知道了",
                            showCancel: !1,
                            success: function() {
                                r.getOrder(r, uniacid, t);
                            }
                        });
                    }
                });
            }
        }
    });
}), _defineProperty(_Page, "refundOrder", function(e) {
    var t = this, a = e.currentTarget.dataset.orderid, n = this.data.type;
    wx.showModal({
        title: "提示",
        content: "确定对该订单进行退款操作吗？",
        success: function(e) {
            e.confirm && app.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "manager",
                    op: "refundOrder",
                    uniacid: uniacid,
                    orderid: a,
                    type: n
                },
                success: function(e) {
                    wx.showModal({
                        title: "提示",
                        confirmText: "朕知道了",
                        showCancel: !1,
                        content: e.data.msg,
                        success: function() {
                            t.getOrder(t, uniacid, t.data.type);
                        }
                    });
                }
            });
        }
    });
}), _defineProperty(_Page, "verifyOrder", function(e) {
    var t = this, a = e.currentTarget.dataset.orderid;
    wx.showModal({
        title: "提示",
        content: "确定核销该订单吗？",
        success: function(e) {
            e.confirm && app.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "manager",
                    op: "verifyOrder",
                    uniacid: uniacid,
                    orderid: a
                },
                success: function(e) {
                    wx.showModal({
                        title: "提示",
                        confirmText: "朕知道了",
                        showCancel: !1,
                        content: e.data.msg,
                        success: function() {
                            t.getOrder(t, uniacid, t.data.type);
                        }
                    });
                }
            });
        }
    });
}), _Page));