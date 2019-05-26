var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        is_show_sale_dailog: !1,
        bagList: [],
        operationtype: "",
        selectBag: [],
        disabled: !1,
        isContent: !0
    },
    onLoad: function(a) {
        var t = this, i = "";
        a.formid && (i = a.formid);
        var e = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSeeBagList",
                control: "land",
                uid: e,
                uniacid: uniacid,
                formid: i
            },
            success: function(a) {
                0 < a.data.bagList.length ? t.setData({
                    bagList: a.data.bagList
                }) : t.setData({
                    isContent: !1
                });
            }
        }), app.util.setNavColor(uniacid);
    },
    getBagList: function() {
        var t = this, a = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSeeBagList",
                control: "land",
                uid: a,
                uniacid: uniacid
            },
            success: function(a) {
                0 < a.data.bagList.length ? t.setData({
                    bagList: a.data.bagList
                }) : t.setData({
                    isContent: !1
                });
            }
        });
    },
    onShow: function(a) {
        this.getBagList();
    },
    operationBag: function(a) {
        var t = this;
        if (this.data.is_show_sale_dailog) this.setData({
            is_show_sale_dailog: !this.data.is_show_sale_dailog
        }); else {
            var i = a.currentTarget.dataset, e = (i.seedid, i.bagid), s = i.operationtype;
            if (this.data.bagList.map(function(a) {
                a.id == e && t.setData({
                    selectBag: a
                });
            }), 2 == s) return wx.navigateTo({
                url: "../pay_freight/index?selectBag=" + JSON.stringify(this.data.selectBag)
            }), !1;
            this.setData({
                is_show_sale_dailog: !this.data.is_show_sale_dailog,
                operationtype: s,
                bagid: e
            });
        }
    },
    saleSeed: function(a) {
        var t = this, i = this.data.selectBag, e = a.detail.value.weight, s = a.detail.formId, n = wx.getStorageSync("kundian_farm_uid");
        return e <= 0 ? (wx.showModal({
            title: "提示",
            content: "重量必须大于0",
            showCancel: !1
        }), !1) : parseFloat(e) > parseFloat(i.weight) ? (wx.showModal({
            title: "提示",
            content: "重量不能大于" + i.weight + " kg",
            showCancel: !1
        }), !1) : (t.setData({
            disabled: !0
        }), void app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "saleSeed",
                control: "land",
                uniacid: uniacid,
                selectBag: JSON.stringify(i),
                uid: n,
                weight: e,
                formid: s
            },
            method: "POST",
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1,
                    success: function() {
                        t.setData({
                            is_show_sale_dailog: !t.data.is_show_sale_dailog,
                            disabled: !1
                        }), t.getBagList(s);
                    }
                });
            }
        }));
    }
});