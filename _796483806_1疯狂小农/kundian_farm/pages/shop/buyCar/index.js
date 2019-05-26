var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: app.globalData.sysData,
        buyList: [],
        checkAll: !1,
        sumPrice: 0,
        cart_id: [],
        page: 1,
        farmSetData: [],
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1,
        height: 0
    },
    onLoad: function(a) {
        var t = this, i = wx.getStorageSync("kundian_farm_uid"), e = !1;
        a.is_tarbar && (e = a.is_tarbar);
        var c = 0, n = app.globalData.sysData;
        c = e ? -1 < n.model.indexOf("iPhone X") ? 162 : 100 : -1 < n.model.indexOf("iPhone X") ? 62 : 0, 
        t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            tarbar: wx.getStorageSync("kundianFarmTarbar"),
            is_tarbar: e,
            height: c
        }), 0 != i ? app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "cartList",
                uid: i,
                uniacid: uniacid
            },
            success: function(a) {
                t.setData({
                    buyList: a.data.cartData
                });
            }
        }) : wx.redirectTo({
            url: "../../login/index"
        }), app.util.setNavColor(uniacid);
    },
    reduceNum: function(a) {
        var i = this, e = a.currentTarget.dataset.id, t = wx.getStorageSync("kundian_farm_uid"), c = i.data.buyList;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "reducuCount",
                uid: t,
                uniacid: uniacid,
                id: e
            },
            success: function(a) {
                if (1 == a.data.code) for (var t = 0; t < c.length; t++) c[t].id == e && (a.data.count ? c[t].count = a.data.count : c.splice(t, 1)); else wx.showToast({
                    title: "操作失败"
                });
                i.setData({
                    buyList: c
                });
            }
        });
    },
    addNum: function(a) {
        var i = this, e = a.currentTarget.dataset.id, t = wx.getStorageSync("kundian_farm_uid"), c = i.data.buyList;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "addCount",
                uid: t,
                uniacid: uniacid,
                id: e
            },
            success: function(a) {
                if (1 == a.data.code) for (var t = 0; t < c.length; t++) c[t].id == e && (c[t].count = a.data.count); else wx.showToast({
                    title: "操作失败"
                });
                i.setData({
                    buyList: c
                });
            }
        });
    },
    checked: function(a) {
        var t = this, i = a.currentTarget.dataset.id, e = 0, c = t.data.cart_id;
        t.data.buyList.map(function(a) {
            if (a.id == i) if (a.check = !a.check, a.check) c.push(i); else for (var t = 0; t < c.length; t++) c[t] == i && c.splice(t, 1);
            e += a.price * a.count;
        }), t.setData({
            buyList: t.data.buyList
        }), t.sumPrice(), e == t.data.sumPrice ? t.setData({
            checkAll: !0
        }) : t.setData({
            checkAll: !1
        });
    },
    sumPrice: function() {
        var t = 0;
        this.data.buyList.map(function(a) {
            a.goodsStock >= a.count && a.check && (t += a.count * a.price);
        }), this.setData({
            sumPrice: t.toFixed(2)
        });
    },
    checkAll: function() {
        for (var t = this, a = t.data.buyList, i = new Array(), e = 0; e < a.length; e++) 0 < a[e].goodsStock && i.push(a[e].id);
        t.data.buyList.map(function(a) {
            t.data.checkAll ? a.check = !1 : a.check = !0;
        }), t.setData({
            checkAll: !t.data.checkAll,
            buyList: t.data.buyList,
            cart_id: i
        }), t.sumPrice();
    },
    deleteItem: function(a) {
        var t = this, i = a.currentTarget.dataset.id, e = wx.getStorageSync("kundian_farm_uid"), c = t.data.buyList;
        c.map(function(a, t) {
            a.id == i && c.splice(t, 1);
        }), t.setData({
            buyList: c
        }), 0 == t.data.buyList.length && t.setData({
            checkAll: !1
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "deleteCart",
                uid: e,
                uniacid: uniacid,
                id: i
            },
            success: function(a) {
                1 == a.data.code ? wx.showToast({
                    title: "已删除"
                }) : wx.showToast({
                    title: "操作失败"
                });
            }
        }), t.sumPrice();
    },
    intoJieSuan: function(a) {
        var t = this.data.cart_id, i = t.join("_");
        "" == t || 0 == t.length ? wx.showToast({
            title: "请选择商品"
        }) : wx.navigateTo({
            url: "../confrimOrder/index?cart_id=" + i
        });
    },
    onReachBottom: function(a) {
        var e = this, t = wx.getStorageSync("kundian_farm_uid"), i = e.data, c = i.page, n = i.cartData;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "cart",
                op: "cartList",
                uid: t,
                uniacid: uniacid,
                page: c
            },
            success: function(a) {
                if ("" != a.data.cartData) {
                    for (var t = a.data.cartData, i = 0; i < t.length; i++) n.push(t[i]);
                    e.setData({
                        buyList: n,
                        page: parseInt(c) + 1
                    });
                }
            }
        });
    },
    goBuyGoods: function(a) {
        wx.navigateTo({
            url: "../index/index"
        });
    }
});