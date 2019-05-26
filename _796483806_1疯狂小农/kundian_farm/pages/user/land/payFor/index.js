var WxParse = require("../../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        userName: "",
        userTel: "",
        state: !1,
        rules: !0,
        totalPrice: 0,
        copyTotalPrice: 0,
        lands: [],
        landLimit: [],
        landLimitArr: [],
        couponCount: 0,
        userCoupon: [],
        selectLand: [],
        landDetail: [],
        day: [],
        alias_day: [],
        currentIndex: 0,
        icon: [],
        order_id: 0,
        farmSetData: wx.getStorageSync("kundian_farm_setData"),
        is_load: !1,
        is_renew: 1,
        land_id: "",
        bottom: 0
    },
    onLoad: function(a) {
        var d = this, e = 0;
        -1 < app.globalData.sysData.model.indexOf("iPhone X") && (e = 68);
        var t = wx.getStorageSync("kundian_farm_uid"), s = wx.getStorageSync("selectSpec"), n = wx.getStorageSync("kundian_farm_setData"), u = a.land_id, i = {};
        a.is_renew ? (i = {
            control: "land",
            op: "getPayLand",
            is_renew: a.is_renew,
            uniacid: uniacid,
            uid: t,
            land_id: u
        }, d.setData({
            is_renew: a.is_renew,
            farmSetData: n,
            bottom: e
        })) : (i = {
            op: "getPayLand",
            control: "land",
            uniacid: uniacid,
            lid: u,
            selectLand: JSON.stringify(s),
            uid: t
        }, d.setData({
            farmSetData: n,
            bottom: e
        })), app.util.request({
            url: "entry/wxapp/class",
            method: "POST",
            data: i,
            success: function(a) {
                if (-1 == a.data.code) return wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1,
                    success: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                }), !1;
                var e = a.data, t = e.landDetail, n = e.landLimit, i = e.day, o = e.alias_day, r = e.couponCount;
                e.icon;
                d.setData({
                    landDetail: t,
                    selectLand: s,
                    landLimit: n,
                    day: i,
                    alias_day: o,
                    totalPrice: a.data.total_price,
                    couponCount: r,
                    userName: a.data.user.truename || "",
                    userTel: a.data.user.phone || "",
                    icon: a.data.icon,
                    is_load: !0,
                    land_id: u
                }), "" != a.data.farmRule.value && WxParse.wxParse("article", "html", a.data.farmRule.farm_rule, d, 5), 
                d.totalPrice();
            }
        }), app.util.setNavColor(uniacid), wx.removeStorageSync("selectSpec");
    },
    bindPickerChange: function(a) {
        for (var e = this, t = a.currentTarget.dataset.id, n = e.data, i = n.lands, o = n.copyTotalPrice, r = wx.getStorageSync("kundian_farm_uid"), d = 0; d < i.length; d++) t == i[d].id && (i[d].select_index = a.detail.value), 
        e.setData({
            lands: i
        });
        this.totalPrice(), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "coupon",
                op: "getLandCoupon",
                uniacid: uniacid,
                uid: r,
                total_price: o
            },
            success: function(a) {
                e.setData({
                    couponCount: a.data.couponCount,
                    userCoupon: []
                });
            }
        });
    },
    totalPrice: function() {
        var e = 0, a = this.data, t = a.landLimit, n = a.selectLand, i = a.currentIndex;
        n.map(function(a) {
            e = parseFloat(e) + a.price * t[i].day;
        }), this.setData({
            totalPrice: parseFloat(e).toFixed(2),
            copyTotalPrice: parseFloat(e).toFixed(2)
        });
    },
    bindLimitChange: function(a) {
        this.setData({
            currentIndex: a.detail.value
        }), this.totalPrice();
    },
    newLandPay: function(a) {
        var t = this, e = t.data, n = e.userName, i = e.userTel, o = e.selectLand, r = e.landLimit, d = e.currentIndex, s = e.totalPrice, u = e.rules, c = e.userCoupon, l = e.order_id, p = e.is_renew, g = e.land_id;
        if ("" == n || null == n) return wx.showToast({
            title: "请填写姓名！"
        }), !1;
        if ("" == i || null == i) return wx.showToast({
            title: "请填写联系电话"
        }), !1;
        var w = wx.getStorageSync("kundian_farm_uid"), f = 0, m = 0;
        if ("" != c && (f = c.coupon.id, m = c.coupon.coupon_price), !u) return wx.showModal({
            title: "提示",
            content: "请先阅读并同意农场协议",
            showCancel: !1
        }), !1;
        if (0 == w || "" == w) return wx.navigateTo({
            url: "/kundian_farm/pages/login/index"
        }), !1;
        var x = "../../user/land/personLand/index";
        wx.getStorageSync("enter_is_play") && (x = "../../../../kundian_game/pages/farm/index"), 
        app.util.request({
            url: "entry/wxapp/class",
            method: "POST",
            dataType: "json",
            data: {
                op: "insertLandOrder",
                control: "land",
                uid: w,
                uniacid: uniacid,
                total_price: s,
                username: n,
                phone: i,
                coupon_id: f,
                coupon_price: m,
                selectLand: JSON.stringify(o),
                lid: t.data.landDetail.id,
                limit_id: r[d].id,
                order_id: l,
                is_renew: p,
                land_id: g
            },
            success: function(a) {
                if (-1 == a.data.code) return wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                }), !1;
                l = a.data.order_id, t.setData({
                    order_id: l
                });
                var e = {
                    op: "getLandPayOrder",
                    control: "land",
                    orderid: l,
                    uniacid: uniacid
                };
                app.util.request({
                    url: "entry/wxapp/pay",
                    data: e,
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
                                            op: "sendMsg",
                                            control: "land",
                                            order_id: l,
                                            prepay_id: e,
                                            uniacid: uniacid
                                        },
                                        success: function() {
                                            wx.showModal({
                                                title: "提示",
                                                content: "支付成功",
                                                showCancel: !1,
                                                success: function() {
                                                    wx.redirectTo({
                                                        url: "../" + x
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
                                        success: function(a) {}
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
        });
    },
    preventTouchMove: function() {},
    farmRule: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/common/agreement/index?type=1"
        });
    },
    inputUserName: function(a) {
        var e = a.detail.value;
        this.setData({
            userName: e
        });
    },
    inputUserTel: function(a) {
        var e = a.detail.value;
        this.setData({
            userTel: e
        });
    },
    changeRules: function() {
        var a = this.data.rules;
        this.setData({
            rules: !a
        });
    },
    selectCoupon: function(a) {
        var e = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../coupon/useCoupon/index?type=4&totalPrice=" + e
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
        var n = this, i = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getUserBindPhone",
                uid: i,
                uniacid: uniacid
            },
            success: function(a) {
                n.setData({
                    userName: a.data.userInfo.truename,
                    userTel: a.data.userInfo.phone
                });
            }
        });
    },
    changePhone: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/phone/index"
        });
    }
});