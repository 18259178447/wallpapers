var app = new getApp(), uniacid = app.siteInfo.uniacid, uid = wx.getStorageSync("kundian_farm_uid");

Page({
    data: {
        seed: [],
        totalPrice: 0,
        copyTotalPrice: 0,
        couponCount: 0,
        userCoupon: [],
        lid: "",
        farmSetData: [],
        order_id: 0
    },
    onLoad: function(a) {
        var t = a.lid, e = JSON.parse(a.seedList), o = a.totalPrice;
        this.setData({
            seed: e,
            lid: t,
            totalPrice: o,
            copyTotalPrice: o
        }), this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    selectCoupon: function(a) {
        var t = this.data.copyTotalPrice;
        wx.navigateTo({
            url: "../../coupon/useCoupon/index?type=5&totalPrice=" + t
        });
    },
    onShow: function() {
        var a = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var t = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), this.setData({
                userCoupon: t,
                totalPrice: parseFloat(a - t.coupon.coupon_price).toFixed(2)
            });
        } else this.setData({
            userCoupon: [],
            totalPrice: a
        });
    },
    surePay: function(a) {
        var t = this, e = a.detail.formId, o = t.data.seed, i = t.data.totalPrice, n = t.data.lid, d = t.data.userCoupon, c = 0, r = 0;
        "" != d && (console.log(d), c = d.coupon.id, r = d.coupon.coupon_price);
        var s = wx.getStorageSync("kundian_farm_uid");
        if (0 != s) {
            var u = t.data.order_id;
            app.util.request({
                url: "entry/wxapp/class",
                data: {
                    op: "addSeedOrder",
                    control: "land",
                    uniacid: uniacid,
                    uid: s,
                    total_price: i,
                    coupon_id: c,
                    coupon_price: r,
                    lid: n,
                    seedList: JSON.stringify(o),
                    formid: e,
                    order_id: u
                },
                method: "POST",
                success: function(a) {
                    u = a.data.order_id, app.util.request({
                        url: "entry/wxapp/pay",
                        data: {
                            op: "getSeedPayOrder",
                            control: "land",
                            orderid: u,
                            uniacid: uniacid
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
                                            title: "玩命加载中..."
                                        }), app.util.request({
                                            url: "entry/wxapp/class",
                                            data: {
                                                op: "notifySeed",
                                                control: "land",
                                                order_id: u,
                                                uniacid: uniacid,
                                                prepay_id: t,
                                                lid: n
                                            },
                                            success: function(a) {
                                                wx.hideLoading(), wx.showModal({
                                                    title: "提示",
                                                    content: "支付成功！请耐心等待管理员进行播种",
                                                    showCancel: !1,
                                                    success: function() {
                                                        wx.redirectTo({
                                                            url: "../mineLandDetail/index?lid=" + n
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    },
                                    fail: function(a) {
                                        wx.showModal({
                                            title: "系统提示",
                                            content: "您取消了支付",
                                            showCancel: !1,
                                            success: function(a) {}
                                        });
                                    }
                                });
                            }
                        },
                        fail: function(a) {
                            wx.showModal({
                                title: "系统提示",
                                content: a.data.message ? a.data.message : "错误",
                                showCancel: !1,
                                success: function(a) {}
                            });
                        }
                    });
                }
            });
        } else wx.navigateTo({
            url: "../../../login/index"
        });
    }
});