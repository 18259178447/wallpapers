var app = new getApp();

Page({
    data: {
        borderImg: "../../../images/icon/address-line.png",
        buyList: [],
        adoptData: [],
        specItem: [],
        address: "",
        phone: "",
        userName: "",
        adopt_id: "",
        farmSetData: [],
        order_id: 0,
        recovery_method: 1,
        remark: ""
    },
    onLoad: function(a) {
        var d = this, o = a.adopt_id, e = app.siteInfo.uniacid, t = wx.getStorageSync("kundian_farm_setData"), n = wx.getStorageSync("kundian_farm_uid"), i = 1;
        2 == t.recovery_method && (i = 2), d.setData({
            farmSetData: t,
            recovery_method: i
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "getSureOrder",
                uniacid: e,
                adopt_id: o,
                uid: n
            },
            success: function(a) {
                var e = a.data, t = e.address, n = e.adoptData, i = "";
                t && (i = t.region + " " + t.address), d.setData({
                    adoptData: n,
                    adopt_id: o,
                    userName: t.name,
                    phone: t.phone,
                    address: i
                });
            }
        }), app.util.setNavColor(e);
    },
    selAddress: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index?is_select=true"
        });
    },
    changeRecoveryMethod: function(a) {
        var e = a.currentTarget.dataset.state, t = this.data, n = t.totalPrice, i = t.send_price, d = t.copyTotalPrice;
        n = 2 == e ? parseFloat(n - i).toFixed(2) : d, this.setData({
            recovery_method: e,
            totalPrice: n
        });
    },
    getRemark: function(a) {
        this.setData({
            remark: a.detail.value
        });
    },
    nowPay: function(a) {
        var e = this, t = wx.getStorageSync("kundian_farm_uid"), n = app.siteInfo.uniacid, i = e.data, d = i.userName, o = i.address, r = i.phone, s = i.adopt_id, c = i.recovery_method, l = i.remark, u = i.farmSetData;
        if (1 == c && ("" == o || "" == d || "" == r)) return wx.showToast({
            title: "请选择收货地址",
            icon: "none"
        }), !1;
        if (2 != c || (d = a.detail.value.name, r = a.detail.value.phone, "" != d && "" != r)) {
            var p = {
                control: "animal",
                op: "addOrder",
                address: o,
                name: d,
                phone: r,
                uniacid: n,
                adopt_id: s,
                uid: t,
                recovery_method: c,
                remark: l,
                total_price: e.data.farmSetData.animal_send_price,
                self_address: u.self_lifting_address
            }, m = e.data.order_id;
            m ? 2 == c ? wx.redirectTo({
                url: "../../shop/orderList/index"
            }) : app.util.request({
                url: "entry/wxapp/pay",
                data: {
                    file: "animal",
                    orderid: m,
                    uniacid: n,
                    op: "getAnimalSendOrder"
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
                                    title: "玩命加载中..."
                                }), app.util.request({
                                    url: "entry/wxapp/class",
                                    data: {
                                        control: "animal",
                                        op: "notify_send",
                                        order_id: m,
                                        uniacid: n,
                                        prepay_id: e
                                    },
                                    success: function(a) {
                                        wx.hideLoading(), wx.showModal({
                                            title: "提示",
                                            content: "支付成功",
                                            showCancel: !1,
                                            success: function() {
                                                wx.redirectTo({
                                                    url: "../../shop/orderList/index"
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
                                            url: "../../shop/orderList/index"
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
            }) : app.util.request({
                url: "entry/wxapp/class",
                data: p,
                success: function(a) {
                    var t = a.data.order_id;
                    e.setData({
                        order_id: t
                    }), 2 == c ? wx.redirectTo({
                        url: "../../shop/orderList/index"
                    }) : app.util.request({
                        url: "entry/wxapp/pay",
                        data: {
                            file: "animal",
                            orderid: t,
                            uniacid: n,
                            op: "getAnimalSendOrder"
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
                                            title: "玩命加载中..."
                                        }), app.util.request({
                                            url: "entry/wxapp/class",
                                            data: {
                                                control: "animal",
                                                op: "notify_send",
                                                order_id: t,
                                                uniacid: n,
                                                prepay_id: e
                                            },
                                            success: function(a) {
                                                wx.hideLoading(), wx.showModal({
                                                    title: "提示",
                                                    content: "支付成功",
                                                    showCancel: !1,
                                                    success: function() {
                                                        wx.redirectTo({
                                                            url: "../../shop/orderList/index"
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
                                                    url: "../../shop/orderList/index"
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
        } else wx.showToast({
            title: "请填写收获信息",
            icon: "none"
        });
    },
    gotoMerchant: function() {
        var a = this.data.farmSetData;
        wx.openLocation({
            latitude: parseFloat(a.self_lifting_place.lat),
            longitude: parseFloat(a.self_lifting_place.lng),
            name: a.self_lifting_address
        });
    },
    onShow: function(a) {
        var e = wx.getStorageSync("kundian_farm_uid"), t = wx.getStorageSync("selectAdd_" + e);
        t && (this.setData({
            userName: t.name,
            phone: t.phone,
            address: t.region + " " + t.address
        }), wx.removeStorageSync("selectAdd_" + e));
    }
});