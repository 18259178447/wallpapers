var app = getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        price: 0,
        selected: 0,
        saleSetting: [],
        user: [],
        farmSetData: []
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "getSaleSetting",
                uniacid: uniacid,
                uid: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    saleSetting: t.data.saleSetting,
                    user: t.data.user
                });
            }
        }), e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    formSubmit: function(t) {
        var e = this, a = wx.getStorageSync("kundian_farm_uid"), i = parseFloat(parseFloat(t.detail.value.price).toFixed(2)), s = e.data.user;
        if (i <= 0) return wx.showModal({
            title: "提示",
            content: "提现金额必须大于0",
            showCancel: !1
        }), !1;
        if (!i) return wx.showModal({
            title: "提示",
            content: "请输入提现金额",
            showCancel: !1
        }), !1;
        if (s.price < i) return wx.showModal({
            title: "提示",
            content: "提现金额不足",
            showCancel: !1
        }), !1;
        if (i < parseFloat(e.data.saleSetting.distribution_withdraw_low_price)) wx.showModal({
            title: "提示",
            content: "提现金额不能低于" + e.data.saleSetting.distribution_withdraw_low_price + "元",
            showCancel: !1
        }); else {
            var n = t.detail.value.name, o = t.detail.value.mobile;
            if (n && null != n) if (o && null != o) {
                var l = e.data.selected;
                0 == l || 1 == l ? (wx.showLoading({
                    title: "正在提交",
                    mask: !0
                }), app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "distribution",
                        op: "sale_withdraw",
                        uid: a,
                        name: n,
                        phone: o,
                        price: i
                    },
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            showCancel: !1,
                            success: function() {
                                0 == t.data.code && wx.redirectTo({
                                    url: "../recode/index"
                                });
                            }
                        });
                    }
                })) : wx.showToast({
                    title: "请选择提现方式"
                });
            } else wx.showToast({
                title: "账号不能为空"
            }); else wx.showToast({
                title: "姓名不能为空"
            });
        }
    },
    select: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            selected: e
        });
    }
});