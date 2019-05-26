var app = new getApp();

Page({
    data: {
        state: !1,
        Bacon: !1,
        Sausage: !1,
        goodsData: [],
        specItem: [],
        aboutData: [],
        total_price: 0,
        copyTotalPrice: 0,
        count: 0,
        address: "",
        userName: "",
        phone: "",
        is_add: 0,
        add_total_price: 0,
        goods_id: "",
        spec_id: "",
        couponCount: 0,
        userCoupon: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var u = this, p = a.goods_id;
        if (a.spec_id) var l = a.spec_id; else l = 0;
        var t = app.siteInfo.uniacid, _ = a.count, e = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getSureGoodsData",
                goods_id: p,
                spec_id: l,
                uniacid: t,
                count: _,
                uid: e
            },
            success: function(a) {
                var t = a.data, e = t.address, o = t.goodsData, s = t.aboutData, i = t.specItem, d = t.total_price, n = t.specVal, r = t.couponCount, c = "";
                e && (c = e.region + " " + e.address), u.setData({
                    goodsData: o,
                    specItem: i,
                    aboutData: s,
                    total_price: d,
                    copyTotalPrice: d,
                    count: _,
                    specVal: n,
                    goods_id: p,
                    spec_id: l,
                    couponCount: r,
                    address: c,
                    userName: e.name || "",
                    phone: e.phone || ""
                });
            }
        }), app.util.setNavColor(t), u.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    chooseAddress: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    machining: function() {
        var a = this;
        if (a.data.state) this.setData({
            state: !this.data.state,
            add_total_price: 0,
            is_add: 0
        }); else {
            var t = a.data.copyTotalPrice, e = a.data.goodsData, o = a.data.aboutData, s = t - e.send_price, i = s * (o.add_price / 100);
            if ("" != this.data.userCoupon) var d = parseFloat(i) + parseFloat(e.send_price) + parseFloat(s) - this.data.userCoupon.coupon.coupon_price; else d = parseFloat(i) + parseFloat(e.send_price) + parseFloat(s);
            this.setData({
                state: !this.data.state,
                add_total_price: d
            });
        }
    },
    Bacon: function() {
        this.setData({
            is_add: 1
        });
    },
    Sausage: function() {
        this.setData({
            is_add: 2
        });
    },
    formSubmit: function(a) {
        var t = wx.getStorageSync("kundian_farm_uid"), o = app.siteInfo.uniacid, e = a.detail.value.remark, s = this.data, i = s.address, d = s.userName, n = s.phone, r = s.state, c = s.is_add, u = s.goods_id, p = s.spec_id, l = s.count, _ = s.userCoupon, g = 0, f = 0;
        if ("" != _ && (g = _.coupon.id, f = _.coupon.coupon_price), "" == i || "" == d || "" == n) wx.showToast({
            title: "请选择地址"
        }); else {
            var h = {
                control: "group",
                op: "addGroupOrder",
                uid: t,
                uniacid: o,
                address: i,
                phone: n,
                name: d,
                is_add: c,
                statu: r,
                goods_id: u,
                spec_id: p,
                count: l,
                remark: e,
                coupon_id: g,
                coupon_price: f
            };
            app.util.request({
                url: "entry/wxapp/class",
                data: h,
                success: function(a) {
                    var e = a.data.order_id;
                    app.util.request({
                        url: "entry/wxapp/pay",
                        data: {
                            op: "getGroupPayOrder",
                            orderid: e,
                            uniacid: o,
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
                                                uniacid: o,
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
                }
            });
        }
    },
    selectCoupon: function(a) {
        var t = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../../user/coupon/useCoupon/index?type=2&totalPrice=" + t
        });
    },
    onShow: function(a) {
        var t = this.data.copyTotalPrice, e = this.data.is_add;
        if (wx.getStorageSync("user_coupon")) {
            var o = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), 1 == e ? this.setData({
                userCoupon: o,
                add_total_price: parseFloat(this.data.add_total_price - o.coupon.coupon_price).toFixed(2)
            }) : this.setData({
                userCoupon: o,
                total_price: parseFloat(t - o.coupon.coupon_price).toFixed(2)
            });
        } else this.setData({
            userCoupon: [],
            total_price: t
        });
        var s = wx.getStorageSync("kundian_farm_uid"), i = wx.getStorageSync("selectAdd_" + s);
        i && (this.setData({
            address: i.region + " " + i.address,
            userName: i.name,
            phone: i.phone
        }), wx.removeStorageSync("selectAdd_" + s));
    }
});