var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        is_show_cart: !1,
        lid: 0,
        seedList: [],
        count: 0,
        can_count: 0,
        selectSeedList: [],
        totalPrice: 0,
        farmSetData: []
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("kundian_farm_setData"), s = t.lid, n = t.can_count;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSeedList",
                control: "land",
                uniacid: uniacid,
                lid: s
            },
            success: function(t) {
                e.setData({
                    seedList: t.data.seedList,
                    lid: s,
                    farmSetData: a,
                    can_count: n
                });
            }
        }), e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), app.util.setNavColor(uniacid);
    },
    closeCart: function(t) {
        this.setData({
            is_show_cart: !this.data.is_show_cart
        }), this.data.is_show_cart && this.data.count <= 0 && wx.showModal({
            title: "提示",
            content: "请先选择种子",
            showCancel: !1
        });
    },
    addSeedCount: function(t) {
        var e = this.data, a = e.seedList, s = e.totalPrice, n = e.count, o = e.can_count, i = t.currentTarget.dataset.seedid, c = [];
        if (o <= n) return wx.showModal({
            title: "提示",
            content: "当前选择的种子面积已大于剩余土地面积啦~",
            showCancel: !1
        }), !1;
        var r = !0;
        if (a.map(function(t) {
            if (t.id == i) if (0 < t.low_count) if (t.selectCount <= 0) {
                var e = parseInt(t.low_count);
                parseInt(n) + e > o ? r = !1 : (t.selectCount = parseInt(t.selectCount) + e, s = parseFloat(s) + parseFloat(t.price) * e, 
                n = parseInt(n) + e);
            } else t.selectCount = parseInt(t.selectCount) + 1, s = parseFloat(s) + parseFloat(t.price), 
            n = parseInt(n) + 1; else t.selectCount = parseInt(t.selectCount) + 1, s = parseFloat(s) + parseFloat(t.price), 
            n = parseInt(n) + 1;
            1 <= t.selectCount && c.push(t);
        }), !r) return wx.showModal({
            title: "提示",
            content: "当前选择的种子面积已大于剩余土地面积啦~",
            showCancel: !1
        }), !1;
        this.setData({
            seedList: a,
            selectSeedList: c,
            totalPrice: s.toFixed(2),
            count: n
        });
    },
    reduceSeedCount: function(t) {
        var e = t.currentTarget.dataset.seedid, a = this.data.seedList, s = new Array(), n = this.data.totalPrice, o = this.data.count;
        a.map(function(t) {
            t.id == e && (0 < t.low_count ? t.selectCount == t.low_count ? (t.selectCount = 0, 
            n = parseFloat(n) - t.price * t.low_count, o -= t.low_count) : (t.selectCount = parseInt(t.selectCount) - 1, 
            n = parseFloat(n) - t.price, o -= 1) : (t.selectCount <= 1 ? t.selectCount = 0 : t.selectCount = parseInt(t.selectCount) - 1, 
            o -= 1, n = parseFloat(n) - t.price)), 1 <= t.selectCount && s.push(t);
        }), this.setData({
            seedList: a,
            selectSeedList: s,
            totalPrice: n.toFixed(2),
            count: o
        });
    },
    submitOrder: function(t) {
        var e = this;
        if (this.data.count <= 0) return wx.showModal({
            title: "提示",
            content: "请选择种子",
            showCancel: !1
        }), !1;
        var a = e.data.selectSeedList, s = e.data.lid, n = e.data.totalPrice;
        wx.navigateTo({
            url: "../confirm_seed/index?lid=" + s + "&totalPrice=" + n + "&seedList=" + JSON.stringify(a)
        });
    },
    lookSeedDetail: function(t) {
        var e = t.currentTarget.dataset.seedid;
        wx.navigateTo({
            url: "/kundian_farm/pages/user/land/seedDetails/index?sid=" + e
        });
    }
});