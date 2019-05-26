var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_active", WxParse = require("../../../wxParse/wxParse.js"), url = app.util.url("entry/wxapp/class") + "m=" + mudule_name;

Page({
    data: {
        sign: [],
        activeList: [],
        isShow: !1,
        selectNum: 1,
        total: 0,
        active: [],
        farmSetData: [],
        sign_order: [],
        isIphoneX: app.globalData.isIphoneX
    },
    onLoad: function(t) {
        var o = this, a = t.activeid, e = wx.getStorageSync("kundian_farm_uid"), r = wx.getStorageSync("kundian_farm_setData");
        wx.request({
            url: url,
            data: {
                action: "active",
                op: "getActiveDetail",
                uniacid: uniacid,
                active_id: a,
                uid: e
            },
            success: function(t) {
                var a = t.data, e = a.active, i = a.spec, n = a.sign_user, s = a.sign_count, c = a.sign_order;
                o.setData({
                    active: e,
                    spec: i,
                    sign: n,
                    sign_count: s,
                    farmSetData: r,
                    sign_order: c
                }), "" != t.data.active.detail && WxParse.wxParse("article", "html", t.data.active.detail, o, 5);
            }
        }), app.util.setNavColor(uniacid);
    },
    call: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.active.phone.toString()
        });
    },
    gotomap: function() {
        var t = this.data.active;
        wx.openLocation({
            latitude: parseFloat(t.latitude),
            longitude: parseFloat(t.longitude),
            address: t.address,
            scale: 28
        });
    },
    preventDefault: function() {},
    selectItem: function(t) {
        var a = [ t.currentTarget.dataset.id, this.data.spec ], e = a[0], i = a[1];
        i.map(function(t) {
            t.select = !1, t.id == e && (t.select = !0);
        }), this.setData({
            spec: i
        }), this.sumPrice();
    },
    reduce: function() {
        var t = this.data.selectNum;
        t <= 1 || (t -= 1, this.setData({
            selectNum: t
        }), this.sumPrice());
    },
    add: function() {
        var t = this.data.selectNum;
        t += 1, this.setData({
            selectNum: t
        }), this.sumPrice();
    },
    sumPrice: function() {
        var t = [ this.data.selectNum, this.data.spec, 0 ], a = t[0], e = t[2];
        t[1].map(function(t) {
            t.select && (e = t.price * a);
        }), this.setData({
            total: e.toFixed(2)
        });
    },
    close: function() {
        this.setData({
            isShow: !1
        });
    },
    signUp: function() {
        this.setData({
            isShow: !0
        });
    },
    toPay: function(t) {
        var a = this;
        if (wx.getStorageSync("kundian_farm_uid")) {
            var e = a.data.selectNum, i = a.data.active;
            if (0 < i.count && i.count - i.person_count < e) return wx.showModal({
                title: "提示",
                content: "当前余票不足！剩余" + (i.count - i.person_count) + "张"
            }), !1;
            var n = this.data.spec, s = new Array();
            if (n.map(function(t) {
                t.select && (s = t);
            }), 0 == s.length) wx.showToast({
                title: "请选择规格！"
            }); else {
                var c = a.data.active, o = a.data.total;
                wx.navigateTo({
                    url: "../signform/index?activeid=" + c.id + "&total=" + o + "&selectNum=" + e + "&spec=" + JSON.stringify(s)
                });
            }
        } else wx.navigateTo({
            url: "/kundian_farm/pages/login/index"
        });
    },
    goHome: function() {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index?is_tarbar=true"
        });
    },
    intoSignInfo: function(t) {
        var a = t.currentTarget.dataset.activeid;
        console.log(a), wx.navigateTo({
            url: "../signInfo/index?active_id=" + a
        });
    },
    openQrcode: function(t) {
        var a = this.data.sign_order;
        wx.navigateTo({
            url: "../ticket/index?order_id=" + a.id
        });
    },
    onShareAppMessage: function(t) {
        var a = this.data.active;
        return {
            path: "kundian_active/pages/details/index?activeid=" + a.id,
            success: function(t) {},
            title: a.title
        };
    }
});