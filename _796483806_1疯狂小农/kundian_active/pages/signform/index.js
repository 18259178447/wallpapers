var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_active", url = app.util.url("entry/wxapp/class") + "m=" + mudule_name;

Page({
    data: {
        signList: [ {
            name: "",
            id: "0",
            tel: "",
            IDCard: ""
        } ],
        activeid: "",
        active: [],
        total: 0,
        selectNum: 0,
        spec: [],
        activeSet: wx.getStorageSync("kundian_farm_active_set"),
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = a.activeid, i = a.total, n = a.selectNum, s = JSON.parse(a.spec), d = wx.getStorageSync("kundian_farm_setData");
        wx.request({
            url: url,
            data: {
                action: "active",
                op: "getActiveConfirm",
                uniacid: uniacid,
                active_id: e
            },
            success: function(a) {
                t.setData({
                    active: a.data.active,
                    activeid: e
                });
            }
        }), t.setData({
            spec: s,
            total: i,
            selectNum: n,
            farmSetData: d
        }), app.util.setNavColor(uniacid);
    },
    addSign: function() {
        var a = this.data.signList, t = {
            id: a[a.length - 1].id + 1,
            name: "",
            tel: "",
            IDCard: ""
        };
        a.push(t), this.setData({
            signList: a
        });
    },
    delete: function(a) {
        var t = [ a.currentTarget.dataset.index, this.data.signList ], e = t[0], i = t[1];
        console.log(e), i.splice(e, 1), this.setData({
            signList: i
        });
    },
    modifyName: function(a) {
        var t = [ a.currentTarget.dataset.index, a.detail.value, this.data.signList ], e = t[1], i = t[2];
        i[t[0]].name = e, this.setData({
            signList: i
        });
    },
    modifytel: function(a) {
        var t = [ a.currentTarget.dataset.index, a.detail.value, this.data.signList ], e = t[1], i = t[2];
        i[t[0]].tel = e, this.setData({
            signList: i
        });
    },
    modifyidcard: function(a) {
        var t = [ a.currentTarget.dataset.index, a.detail.value, this.data.signList ], e = t[1], i = t[2];
        i[t[0]].IDCard = e, this.setData({
            signList: i
        });
    },
    confirm: function(a) {
        var n = wx.getStorageSync("kundian_farm_uid");
        if (n) {
            for (var t = this.data, e = t.signList, i = t.activeid, s = t.spec, d = t.selectNum, c = t.total, r = t.active, o = 0; o < e.length; o++) for (var u = 0; u < r.add_info.length; u++) {
                if ("姓名" == r.add_info[u] && "" == e[o].name) return wx.showToast({
                    title: "请填写" + r.add_info[u]
                }), !1;
                if ("联系电话" == r.add_info[u] && "" == e[o].tel) return wx.showToast({
                    title: "请填写" + r.add_info[u]
                }), !1;
                if ("身份证号" == r.add_info[u] && "" == e[o].IDCard) return wx.showToast({
                    title: "请填写" + r.add_info[u]
                }), !1;
            }
            var l = app.util.url("entry/wxapp/class") + "m=" + mudule_name + "&op=addOrder&action=active";
            wx.showLoading({
                title: "加载中"
            }), wx.request({
                url: l,
                method: "POST",
                data: {
                    sign: JSON.stringify(e),
                    activeid: i,
                    spec: JSON.stringify(s),
                    selectNum: d,
                    total: c,
                    uid: n,
                    uniacid: uniacid,
                    formid: a.detail.formId
                },
                success: function(a) {
                    if (1 == a.data.code) {
                        var i = a.data.order_id;
                        if (0 < c) app.util.request({
                            url: "entry/wxapp/activePay",
                            data: {
                                orderid: i,
                                uniacid: uniacid
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
                                                title: "加载中..."
                                            });
                                            var t = app.util.url("entry/wxapp/class") + "m=" + mudule_name;
                                            wx.request({
                                                url: t,
                                                data: {
                                                    action: "active",
                                                    op: "notify",
                                                    uniacid: uniacid,
                                                    uid: n,
                                                    orderid: i,
                                                    prepay_id: e
                                                },
                                                success: function(a) {
                                                    wx.hideLoading(), wx.showToast({
                                                        title: "支付成功",
                                                        success: function(a) {
                                                            wx.redirectTo({
                                                                url: "../payforResult/index?status=true&order_id=" + i
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        },
                                        fail: function(a) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "您取消了支付",
                                                showCancel: !1,
                                                success: function() {
                                                    wx.redirectTo({
                                                        url: "../orderList/index"
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                "JSAPI支付必须传openid" == a.data.message && wx.navigateTo({
                                    url: "../../login/index"
                                }), "当前余票不足" == a.data.message && wx.showModal({
                                    title: "提示",
                                    content: a.data.message,
                                    showCancel: !1
                                });
                            },
                            fail: function(a) {
                                wx.showModal({
                                    title: "系统提示",
                                    content: a.data.message ? a.data.message : "错误",
                                    showCancel: !1,
                                    success: function(a) {
                                        a.confirm;
                                    }
                                });
                            }
                        }); else {
                            var t = app.util.url("entry/wxapp/active") + "m=" + mudule_name;
                            wx.request({
                                url: t,
                                data: {
                                    op: "notify",
                                    uniacid: uniacid,
                                    uid: n,
                                    orderid: i
                                },
                                success: function(a) {
                                    wx.showToast({
                                        title: "支付成功",
                                        success: function(a) {
                                            wx.redirectTo({
                                                url: "../payforResult/index?status=true&order_id=" + i
                                            }), wx.hideLoading();
                                        }
                                    });
                                }
                            });
                        }
                    } else wx.hideLoading(), wx.showModal({
                        title: "提示",
                        content: a.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.navigateTo({
            url: "../../login/index"
        });
    }
});