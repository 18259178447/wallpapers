var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        borderImg: "../../../../images/icon/address-line.png",
        address: "",
        phone: "",
        userName: "",
        goodsData: [],
        specItem: [],
        specVal: [],
        default: !1,
        count: "",
        totalPrice: [],
        cartData: [],
        is_buy_type: 1,
        goods_id: "",
        cart_id: "",
        spec_id: "",
        send_price: 0,
        farmSetData: []
    },
    onLoad: function(a) {
        var c = a.goodsid;
        if (a.spec_id) var u = a.spec_id; else u = 0;
        a.cart_id;
        var p = a.count, e = wx.getStorageSync("kundian_farm_uid"), l = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "integral",
                op: "getSureGoods",
                uniacid: uniacid,
                goods_id: c,
                spec_id: u,
                count: p,
                uid: e
            },
            success: function(a) {
                var e = a.data, t = e.specVal, d = e.specItem, i = e.goodsData, s = e.totalPrice, n = e.send_price, o = e.address;
                t || (t = []);
                var r = "";
                o && (r = o.region + " " + o.address), l.setData({
                    specItem: d,
                    goodsData: i,
                    count: p,
                    specVal: t,
                    totalPrice: s,
                    goods_id: c,
                    spec_id: u,
                    send_price: n,
                    address: r,
                    userName: o.name || "",
                    phone: o.phone || ""
                });
            }
        }), app.util.setNavColor(uniacid), l.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    chooseAddress: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    onShow: function(a) {
        var e = wx.getStorageSync("kundian_farm_uid"), t = wx.getStorageSync("selectAdd_" + e);
        t && (this.setData({
            address: t.region + " " + t.address,
            userName: t.name,
            phone: t.phone
        }), wx.removeStorageSync("selectAdd_" + e));
    },
    formSubmit: function(a) {
        var e = this.data, t = e.userName, d = e.address, i = e.phone, s = (e.is_buy_type, 
        e.remark), n = e.goods_id, o = e.count, r = e.spec_id, c = e.send_price, u = wx.getStorageSync("kundian_farm_uid");
        if ("" != d && "" != i && "" != t) {
            var p = {
                control: "integral",
                op: "addOrder",
                address: d,
                name: t,
                phone: i,
                uniacid: uniacid,
                goods_id: n,
                count: o,
                uid: u,
                remark: s,
                is_buy_type: 1,
                spec_id: r
            };
            app.util.request({
                url: "entry/wxapp/class",
                data: p,
                success: function(a) {
                    if (1 == a.data.code) {
                        var t = a.data.order_id;
                        "" == c || 0 == c ? (wx.showLoading({
                            title: "加载中..."
                        }), app.util.request({
                            url: "entry/wxapp/class",
                            data: {
                                control: "integral",
                                op: "sendMsg",
                                order_id: t,
                                uniacid: uniacid,
                                uid: u
                            },
                            success: function(a) {
                                0 == a.data.code && wx.showModal({
                                    title: "提示",
                                    content: "兑换成功",
                                    showCancel: !1,
                                    success: function() {
                                        wx.redirectTo({
                                            url: "../orderList/index"
                                        });
                                    }
                                }), wx.hideLoading();
                            }
                        })) : app.util.request({
                            url: "entry/wxapp/pay",
                            data: {
                                op: "getIntegralPayOrder",
                                orderid: t,
                                uniacid: uniacid,
                                file: "integral"
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
                                            wx.showLoading({
                                                title: "加载中"
                                            }), app.util.request({
                                                url: "entry/wxapp/class",
                                                data: {
                                                    control: "integral",
                                                    op: "sendMsg",
                                                    order_id: t,
                                                    uniacid: uniacid,
                                                    prepay_id: e,
                                                    uid: u
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
                    } else 2 == a.data.code ? wx.showToast({
                        title: "兑换失败"
                    }) : 3 == a.data.code ? wx.showToast({
                        title: "积分不足"
                    }) : 4 == a.data.code && wx.showToast({
                        title: "积分支付失败"
                    });
                }
            });
        } else wx.showToast({
            title: "请选择收货地址!"
        });
    }
});