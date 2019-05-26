var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        isShow: !1,
        express: [ "圆通快递", "顺丰快递", "中通快递", "韵达快递", "百世汇通", "菜鸟裹裹", "申通快递", "EMS", "天天快递", "宅急送", "邮政包裹" ],
        expressName: "",
        send_number: "",
        borderImg: "../../../../images/icon/address-line.png",
        orderData: [],
        type: 1,
        farmSetData: []
    },
    onLoad: function(e) {
        app.util.setNavColor(uniacid);
        var a = e.orderid, t = e.type;
        this.getOrderDetail(a, t), this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    getOrderDetail: function(e, a) {
        var t = this;
        wx.showLoading({
            title: "玩命加载中..."
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "manager",
                op: "getOrderDetail",
                orderid: e,
                uniacid: uniacid,
                type: a
            },
            success: function(e) {
                t.setData({
                    orderData: e.data.orderData,
                    type: a
                }), wx.hideLoading();
            }
        });
    },
    preventTouchMove: function() {},
    fahuo: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    closeModel: function() {
        this.setData({
            isShow: !1
        });
    },
    bindPickerChange: function(e) {
        var a = e.detail.value;
        this.setData({
            expressName: this.data.express[a]
        });
    },
    scanCode: function() {
        var a = this;
        wx.scanCode({
            success: function(e) {
                a.setData({
                    send_number: e.result
                });
            }
        });
    },
    sendOrder: function(e) {
        var a = this, t = a.data, n = t.orderData, s = t.expressName, r = t.send_number, i = t.type;
        "" == r && (r = e.detail.value.send_number), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "manager",
                op: "sureSend",
                uniacid: uniacid,
                orderid: n.id,
                express_company: s,
                send_number: r,
                type: i
            },
            success: function(e) {
                wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1,
                    success: function() {
                        a.setData({
                            isShow: !1
                        }), 0 == e.data.code && a.getOrderDetail(n.id, i);
                    }
                });
            }
        });
    },
    cancelOrder: function(e) {
        var a = this, t = e.currentTarget.dataset.orderid, n = a.data, s = n.type;
        n.orderData;
        wx.showModal({
            title: "提示",
            content: "确认取消订单吗？",
            success: function(e) {
                e.confirm && (1 == s ? app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "manager",
                        op: "cancelOrder",
                        uniacid: uniacid,
                        orderid: t,
                        type: s
                    },
                    success: function(e) {
                        wx.showModal({
                            title: "提示",
                            content: e.data.msg,
                            success: function() {
                                a.getOrderDetail(t, s);
                            }
                        });
                    }
                }) : 2 == s ? app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "manager",
                        op: "cancelGroupOrder",
                        uniacid: uniacid,
                        orderid: t,
                        type: s
                    },
                    success: function(e) {
                        wx.showModal({
                            title: "提示",
                            content: e.data.msg,
                            success: function() {
                                a.getOrderDetail(t, s);
                            }
                        });
                    }
                }) : 3 == s && app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "manager",
                        op: "cancelIntrgralOrder",
                        uniacid: uniacid,
                        orderid: t,
                        type: s
                    },
                    success: function(e) {
                        wx.showModal({
                            title: "提示",
                            content: e.data.msg,
                            success: function() {
                                a.getOrderDetail(t, s);
                            }
                        });
                    }
                }));
            }
        });
    }
});