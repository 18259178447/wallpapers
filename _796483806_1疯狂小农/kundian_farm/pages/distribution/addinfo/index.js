var app = new getApp(), uniacid = app.siteInfo.uniacid, uid = wx.getStorageSync("kundian_farm_uid");

Page({
    data: {
        click: !0,
        isShow: !1,
        farmSetData: [],
        distributionSet: []
    },
    onLoad: function(t) {
        var a = wx.getStorageSync("kundian_farm_uid");
        a || wx.navigateTo({
            url: "../../login/index"
        });
        var i = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "apply_become_distribution",
                uniacid: uniacid,
                uid: a
            },
            success: function(t) {
                -1 == t.data.code && wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function(t) {
                        wx.navigateTo({
                            url: "../../login/index"
                        });
                    }
                }), i.setData({
                    farmSetData: wx.getStorageSync("kundian_farm_setData"),
                    distributionSet: t.data.farmSetData
                }), t.data.is_distributor && wx.redirectTo({
                    url: "../index/index"
                });
            }
        }), app.util.setNavColor(uniacid);
    },
    click: function() {
        var t = this.data.click;
        this.setData({
            click: !t
        });
    },
    check: function() {
        this.setData({
            isShow: !0
        });
    },
    preventTouchMove: function() {},
    close: function() {
        this.setData({
            isShow: !1
        });
    },
    formSubmit: function(t) {
        var a = t.detail.value, i = a.name, e = a.phone, n = wx.getStorageSync("kundian_farm_uid");
        if ("" == i) return wx.showToast({
            title: "请填写姓名"
        }), !1;
        if ("" == e) return wx.showToast({
            title: "请填写手机号"
        }), !1;
        if (0 == this.data.click) return wx.showModal({
            title: "提示",
            content: "请先同意申请协议",
            showCancel: !1
        }), !1;
        var o = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "apply_distribution",
                uniacid: uniacid,
                name: i,
                phone: e,
                uid: n,
                form_id: o
            },
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function() {
                        5 == t.data.code ? wx.redirectTo({
                            url: "../index/index"
                        }) : wx.reLaunch({
                            url: "../../user/center/index?is_tarbar=true"
                        });
                    }
                });
            }
        });
    }
});