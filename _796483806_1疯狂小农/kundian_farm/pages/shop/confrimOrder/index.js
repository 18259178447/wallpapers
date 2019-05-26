var app = new getApp();

Page({
    data: {
        address: "",
        phone: "",
        userName: "",
        goodsData: [],
        count: "",
        totalPrice: [],
        copyTotalPrice: 0,
        cartData: [],
        is_buy_type: 1,
        goods_id: "",
        cart_id: "",
        spec_id: "",
        send_price: 0,
        couponCount: 0,
        userCoupon: [],
        s: [],
        order_id: 0,
        isIphoneX: app.globalData.isIphoneX,
        recovery_method: []
    },
    onLoad: function(a) {
        var n = a.goodsid, c = a.spec_id, p = a.cart_id, u = a.count, e = wx.getStorageSync("kundian_farm_uid"), l = this, t = app.siteInfo.uniacid, o = wx.getStorageSync("kundian_farm_setData"), _ = 1;
        2 == o.recovery_method && (_ = 2), l.setData({
            s: o,
            recovery_method: _
        }), n && (app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSureGoods",
                control: "shop",
                uniacid: t,
                goods_id: n,
                spec_id: c,
                count: u,
                uid: e
            },
            success: function(a) {
                var e = a.data, t = e.goodsData, o = e.totalPrice, s = e.send_price, r = e.couponCount, i = e.address;
                2 == _ && (o = parseFloat(o - a.data.send_price).toFixed(2));
                var d = "";
                i && (d = i.region + " " + i.address), l.setData({
                    count: u,
                    totalPrice: o,
                    goods_id: n,
                    goodsData: t,
                    copyTotalPrice: a.data.totalPrice,
                    spec_id: c || "",
                    send_price: s,
                    couponCount: r,
                    address: d,
                    phone: i.phone || "",
                    userName: i.name || ""
                });
            }
        }), app.util.setNavColor(t)), p && app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "getBuyCartData",
                uniacid: t,
                uid: e,
                cart_id: p
            },
            success: function(a) {
                var e = a.data, t = e.address, o = e.cartData, s = e.totalPrice, r = e.send_price, i = e.couponCount, d = "";
                t && (d = t.region + " " + t.address), l.setData({
                    cartData: o,
                    is_buy_type: 2,
                    totalPrice: s,
                    copyTotalPrice: s,
                    cart_id: p,
                    send_price: r,
                    couponCount: i,
                    address: d,
                    phone: t.phone || "",
                    userName: t.name || ""
                });
            }
        });
    },
    chooseAddress: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    changeRecoveryMethod: function(a) {
        var e = a.currentTarget.dataset.state, t = this.data, o = t.totalPrice, s = t.send_price, r = t.copyTotalPrice;
        o = 2 == e ? parseFloat(o - s).toFixed(2) : r, this.setData({
            recovery_method: e,
            totalPrice: o
        });
    },
    addCount: function(a) {
        var e = this.data.goodsData, t = parseInt(this.data.count) + 1;
        if (1 == e.is_open_sku) var o = parseFloat(this.data.goodsData.specVal.price * t) + parseFloat(this.data.send_price); else o = parseFloat(e.price * t) + parseFloat(this.data.send_price);
        this.setData({
            count: t,
            totalPrice: o,
            copyTotalPrice: o
        });
    },
    reduceCount: function(a) {
        if (1 < this.data.count) {
            var e = this.data.goodsData, t = parseInt(this.data.count) - 1;
            if (1 == e.is_open_sku) var o = parseFloat(this.data.goodsData.specVal.price * t) + parseFloat(this.data.send_price); else o = parseFloat(e.price * t) + parseFloat(this.data.send_price);
            this.setData({
                count: t,
                totalPrice: o,
                copyTotalPrice: o
            });
        }
    },
    selectCoupon: function(a) {
        var e = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../user/coupon/useCoupon/index?type=1&totalPrice=" + e
        });
    },
    onShow: function(a) {
        var e = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var t = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), this.setData({
                userCoupon: t,
                totalPrice: parseFloat(e - t.coupon.coupon_price).toFixed(2)
            });
        } else this.setData({
            userCoupon: [],
            totalPrice: e
        });
        var o = wx.getStorageSync("kundian_farm_uid"), s = wx.getStorageSync("selectAdd_" + o);
        s && (this.setData({
            userName: s.name,
            phone: s.phone,
            address: s.region + " " + s.address
        }), wx.removeStorageSync("selectAdd_" + o));
    },
    subOrder: function(a) {
        var e = this, o = "orderList/index", s = app.siteInfo.uniacid, t = wx.getStorageSync("kundian_farm_uid"), r = e.data.is_buy_type, i = a.detail.value.remark, d = e.data, n = (d.order_id, 
        d.userName), c = d.address, p = d.phone, u = d.userCoupon, l = d.send_price, _ = d.totalPrice, h = d.recovery_method, g = 0, f = 0;
        if ("" != u && (g = u.coupon.id, f = u.coupon.coupon_price), 1 == h && ("" == n || "" == c || "" == p)) return wx.showToast({
            title: "请选择收获地址",
            icon: "none"
        }), !1;
        if (2 != h || (n = a.detail.value.userName, p = a.detail.value.phone, "" != n && "" != p)) {
            if (1 == r) var y = e.data.goods_id, m = e.data.count, w = e.data.spec_id, v = {
                control: "shop",
                op: "addOrder",
                address: c,
                name: n,
                phone: p,
                uniacid: s,
                goods_id: y,
                count: m,
                uid: t,
                remark: i,
                is_buy_type: 1,
                spec_id: w,
                coupon_id: g,
                coupon_price: f,
                send_price: l,
                totalPrice: _,
                recovery_method: h,
                formId: a.detail.formId
            }; else {
                var x = e.data.cart_id;
                v = {
                    control: "shop",
                    op: "addOrder",
                    address: c,
                    name: n,
                    phone: p,
                    uniacid: s,
                    cart_id: x,
                    uid: t,
                    remark: i,
                    is_buy_type: 2,
                    coupon_id: g,
                    coupon_price: f,
                    send_price: l,
                    totalPrice: _,
                    recovery_method: h,
                    formId: a.detail.formId
                };
            }
            app.util.request({
                url: "entry/wxapp/class",
                data: v,
                success: function(a) {
                    if (1 == a.data.code) {
                        var t = a.data.order_id;
                        e.setData({
                            order_id: t
                        }), app.util.request({
                            url: "entry/wxapp/pay",
                            data: {
                                op: "getShopPayOrder",
                                orderid: t,
                                uniacid: s,
                                file: "shop"
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
                                                    control: "shop",
                                                    order_id: t,
                                                    op: "sendMsg",
                                                    uniacid: s,
                                                    prepay_id: e
                                                },
                                                success: function() {
                                                    wx.showModal({
                                                        title: "提示",
                                                        content: "支付成功",
                                                        showCancel: !1,
                                                        success: function() {
                                                            wx.redirectTo({
                                                                url: "../" + o
                                                            });
                                                        }
                                                    }), wx.hideLoading();
                                                }
                                            });
                                        },
                                        fail: function(a) {
                                            wx.showModal({
                                                title: "系统提示",
                                                content: "您取消了支付!",
                                                showCancel: !1,
                                                success: function(a) {
                                                    a.confirm && wx.redirectTo({
                                                        url: "../" + o
                                                    });
                                                }
                                            }), wx.hideLoading();
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
                    } else wx.showModal({
                        title: "提示",
                        content: "订单生成失败！",
                        showCancel: !1
                    });
                }
            });
        } else wx.showToast({
            title: "请填写取货信息",
            icon: "none"
        });
    },
    gotoMerchant: function() {
        var a = this.data.s;
        wx.openLocation({
            latitude: parseFloat(a.self_lifting_place.lat),
            longitude: parseFloat(a.self_lifting_place.lng),
            name: a.self_lifting_address
        });
    }
});