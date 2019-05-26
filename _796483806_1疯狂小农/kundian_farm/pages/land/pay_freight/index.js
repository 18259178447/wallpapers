var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        address: "",
        name: "",
        phone: "",
        seedData: [],
        farmSetData: [],
        selectBag: [],
        types: 0,
        recovery_method: 1
    },
    onLoad: function(e) {
        var n = this;
        app.util.setNavColor(uniacid);
        var a = 0;
        e.types && (a = e.types);
        var t = wx.getStorageSync("kundian_farm_setData"), s = wx.getStorageSync("kundian_farm_uid"), d = 1;
        2 == t.recovery_method && (d = 2), n.setData({
            farmSetData: t,
            selectBag: JSON.parse(e.selectBag),
            types: a,
            recovery_method: d
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                op: "getAddress",
                uniacid: uniacid,
                uid: s
            },
            success: function(e) {
                var a = e.data.address, t = "";
                a && (t = a.region + " " + a.address), n.setData({
                    address: t,
                    userName: a.name,
                    phone: a.phone
                });
            }
        });
    },
    selAddress: function(e) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    radioChange: function(e) {
        this.setData({
            recovery_method: e.detail.value
        });
    },
    changeRecoveryMethod: function(e) {
        var a = e.currentTarget.dataset.state, t = this.data, n = t.totalPrice, s = t.send_price, d = t.copyTotalPrice;
        n = 2 == a ? parseFloat(n - s).toFixed(2) : d, this.setData({
            recovery_method: a,
            totalPrice: n
        });
    },
    nowPay: function(e) {
        var n = this, a = wx.getStorageSync("kundian_farm_uid"), s = app.siteInfo.uniacid, t = n.data, d = t.userName, r = t.address, o = t.phone, i = t.selectBag, c = t.recovery_method, u = e.detail.formId;
        if (1 == c && ("" == r || "" == d || "" == o)) return wx.showToast({
            title: "请选择收货地址",
            icon: "none"
        }), !1;
        if (2 != c || (d = e.detail.value.name, o = e.detail.value.phone, "" != d && "" != o)) {
            var l = {
                op: "addSeedSendOrder",
                address: r,
                name: d,
                phone: o,
                uniacid: s,
                uid: a,
                control: "land",
                selectBag: JSON.stringify(i),
                formid: u,
                recovery_method: c
            };
            app.util.request({
                url: "entry/wxapp/class",
                data: l,
                method: "POST",
                success: function(e) {
                    var t = e.data.order_id;
                    if (2 == c) return wx.redirectTo({
                        url: "/kundian_farm/pages/shop/orderList/index"
                    }), !1;
                    app.util.request({
                        url: "entry/wxapp/pay",
                        data: {
                            orderid: t,
                            uniacid: s,
                            control: "land",
                            op: "seedSendPay"
                        },
                        cachetime: "0",
                        success: function(e) {
                            if (e.data && e.data.data && !e.data.errno) {
                                var a = e.data.data.package;
                                wx.requestPayment({
                                    timeStamp: e.data.data.timeStamp,
                                    nonceStr: e.data.data.nonceStr,
                                    package: e.data.data.package,
                                    signType: "MD5",
                                    paySign: e.data.data.paySign,
                                    success: function(e) {
                                        wx.showLoading({
                                            title: "玩命加载中..."
                                        }), app.util.request({
                                            url: "entry/wxapp/class",
                                            data: {
                                                op: "notifySeedSend",
                                                control: "land",
                                                order_id: t,
                                                uniacid: s,
                                                prepay_id: a,
                                                selectBag: JSON.stringify(i)
                                            },
                                            method: "POST",
                                            success: function(e) {
                                                wx.hideLoading(), wx.showModal({
                                                    title: "提示",
                                                    content: "支付成功",
                                                    showCancel: !1,
                                                    success: function() {
                                                        1 == n.data.types ? wx.redirectTo({
                                                            url: "/kundian_game/pages/farm/index"
                                                        }) : wx.redirectTo({
                                                            url: "/kundian_farm/pages/shop/orderList/index"
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    },
                                    fail: function(e) {
                                        console.log("支付失败1");
                                    }
                                });
                            } else console.log("支付失败2");
                        },
                        fail: function(e) {
                            wx.showModal({
                                title: "系统提示",
                                content: e.data.message ? e.data.message : "错误",
                                showCancel: !1,
                                success: function(e) {
                                    e.confirm;
                                }
                            });
                        }
                    });
                }
            });
        } else wx.showToast({
            title: "请填写收获信息",
            icon: "none"
        });
    },
    gotoMerchant: function() {
        var e = this.data.farmSetData;
        wx.openLocation({
            latitude: parseFloat(e.self_lifting_place.lat),
            longitude: parseFloat(e.self_lifting_place.lng),
            name: e.self_lifting_address
        });
    },
    onShow: function(e) {
        var a = wx.getStorageSync("kundian_farm_uid"), t = wx.getStorageSync("selectAdd_" + a);
        t && (this.setData({
            address: t.region + " " + t.address,
            userName: t.name,
            phone: t.phone
        }), wx.removeStorageSync("selectAdd_" + a));
    }
});