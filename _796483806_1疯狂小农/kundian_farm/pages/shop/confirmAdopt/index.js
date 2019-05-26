var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid, uid = wx.getStorageSync("kundian_farm_uid");

Page({
    data: {
        specVal: [],
        sku_name: "",
        count: 0,
        aid: "",
        animalData: [],
        totalPrice: 0,
        copyTotalPrice: 0,
        couponCount: 0,
        userCoupon: [],
        userName: "",
        userTel: "",
        state: !1,
        rules: !0,
        farmSetData: [],
        order_id: 0
    },
    onLoad: function(a) {
        var e, t = wx.getStorageSync("kundian_farm_buy_animal"), n = a.aid, o = a.count;
        e = o * t.price, this.setData({
            count: o,
            aid: n,
            animalData: t,
            totalPrice: e,
            copyTotalPrice: e
        });
        var i = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "coupon",
                op: "getUseCouponCount",
                uid: uid,
                uniacid: uniacid,
                type: 3,
                totalprice: e
            },
            success: function(a) {
                var e = a.data, t = e.couponCount, n = e.user;
                i.setData({
                    couponCount: t,
                    userName: n.truename,
                    userTel: n.phone
                });
                var o = wx.getStorageSync("kundian_farm_setData");
                o && WxParse.wxParse("article", "html", o.animal_rule, i, 5);
            }
        }), i.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), wx.removeStorageSync("kundian_farm_buy_animal");
    },
    useCoupon: function(a) {
        var e = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../user/coupon/useCoupon/index?type=3&totalPrice=" + e
        });
    },
    onShow: function() {
        var a = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var e = wx.getStorageSync("user_coupon");
            return wx.removeStorageSync("user_coupon"), void this.setData({
                userCoupon: e,
                totalPrice: parseFloat(a - e.coupon.coupon_price).toFixed(2)
            });
        }
        this.setData({
            userCoupon: [],
            totalPrice: a
        });
        var t = this, n = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getUserBindPhone",
                uid: n,
                uniacid: uniacid
            },
            success: function(a) {
                t.setData({
                    userName: a.data.userInfo.truename,
                    userTel: a.data.userInfo.phone
                });
            }
        });
    },
    surePay: function(a) {
        var e = this, t = e.data, n = t.userName, o = t.userTel, i = t.rules, u = t.count, r = t.aid, s = t.specVal, c = t.totalPrice, d = t.userCoupon, l = t.order_id;
        if ("" != n) if ("" != o) {
            var p = 0, m = 0, g = wx.getStorageSync("kundian_farm_uid");
            if ("" != d && (console.log(d), p = d.coupon.id, m = d.coupon.coupon_price), !i) return wx.showModal({
                title: "提示",
                content: "请先阅读并同意农场协议",
                showCancel: !1
            }), !1;
            app.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "animal",
                    op: "sureAdoptAnimal",
                    uid: g,
                    uniacid: uniacid,
                    count: u,
                    spec_id: s.id,
                    aid: r,
                    coupon_id: p,
                    coupon_price: m,
                    username: n,
                    phone: o,
                    totalPrice: c,
                    order_id: l
                },
                success: function(a) {
                    if (0 == a.data.code) {
                        var t = a.data.order_id;
                        e.setData({
                            order_id: t
                        }), app.util.request({
                            url: "entry/wxapp/pay",
                            data: {
                                op: "getAnimalPayOrder",
                                orderid: t,
                                uniacid: uniacid,
                                file: "animal"
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
                                                    control: "animal",
                                                    op: "sendMsg",
                                                    order_id: t,
                                                    uniacid: uniacid,
                                                    prepay_id: e
                                                },
                                                success: function() {
                                                    wx.showModal({
                                                        title: "提示",
                                                        content: "支付成功",
                                                        showCancel: !1,
                                                        success: function() {
                                                            wx.redirectTo({
                                                                url: "../../user/Animal/index?current=2"
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
                                                    a.confirm;
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
                    }
                }
            });
        } else wx.showToast({
            title: "请填写联系电话"
        }); else wx.showToast({
            title: "请填写姓名！"
        });
    },
    inputUserName: function(a) {
        var e = a.detail.value;
        this.setData({
            userName: e
        });
    },
    changeRules: function() {
        var a = this.data.rules;
        this.setData({
            rules: !a
        });
    },
    animalRule: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/common/agreement/index?type=2"
        });
    },
    preventTouchMove: function() {},
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    changePhone: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/phone/index"
        });
    }
});