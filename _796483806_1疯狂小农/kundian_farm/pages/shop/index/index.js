var app = new getApp(), util = require("../../../utils/util.js"), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: app.globalData.sysData,
        isIphoneX: app.globalData.isIphoneX,
        classify: 1,
        Adopt: [],
        typeData: [],
        recommendData: [],
        user_id: 0,
        newGoodsData: [],
        page: 1,
        farmSetData: [],
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1
    },
    onLoad: function(a) {
        var r = this, t = a.is_tarbar || !1, e = wx.getStorageSync("kundianFarmTarbar");
        r.setData({
            tarbar: e,
            is_tarbar: t,
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
        var n = wx.getStorageSync("kundian_farm_uid");
        wx.showLoading({
            title: "玩命加载中..."
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "index",
                uniacid: uniacid,
                uid: n
            },
            success: function(a) {
                var t = a.data, e = t.slideData, n = t.typeData, i = t.recommendData;
                r.setData({
                    Adopt: e,
                    typeData: n,
                    recommendData: i
                }), wx.hideLoading();
            }
        }), app.util.setNavColor(uniacid);
        var i = a.user_uid;
        null != i && 0 != i && (app.loginBindParent(i, n), r.setData({
            user_uid: i
        }));
    },
    onShow: function(a) {
        var t = this.data.user_uid, e = wx.getStorageSync("kundian_farm_uid");
        null != t && 0 != t && (app.loginBindParent(t, e), this.setData({
            user_uid: t
        }));
    },
    intoGoodsList: function(a) {
        var t = a.currentTarget.dataset, e = t.typeid;
        t.urltype;
        wx.navigateTo({
            url: "../proList/index?type_id=" + e
        });
    },
    selectGoods: function(a) {
        wx.navigateTo({
            url: "../search/index"
        });
    },
    intoGoodsDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../prodeteils/index?goodsid=" + t
        });
    },
    intoDetailSlide: function(a) {
        var t = a.currentTarget.dataset, e = t.linktype, n = t.linkparam;
        0 == n || "" == n ? wx.navigateTo({
            url: "/" + e
        }) : wx.navigateTo({
            url: "/" + n
        });
    },
    onShareAppMessage: function() {
        var a = wx.getStorageSync("kundian_farm_setData");
        return {
            path: "/kundian_farm/pages/shop/index/index?&user_uid=" + wx.getStorageSync("kundian_farm_uid"),
            success: function(a) {},
            title: a.share_shop_title
        };
    },
    onPullDownRefresh: function(a) {
        var r = this, i = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                uniacid: uniacid,
                op: "getCommonData"
            },
            success: function(a) {
                var t = a.data, e = t.tarbar, n = t.farmSetData;
                wx.setStorageSync("kundianFarmTarbar", e), wx.setStorageSync("kundian_farm_setData", n), 
                r.setData({
                    tarbar: e,
                    farmSetData: n
                }), app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "shop",
                        op: "index",
                        uniacid: uniacid,
                        uid: i
                    },
                    success: function(a) {
                        var t = a.data, e = t.slideData, n = t.typeData, i = t.recommendData;
                        r.setData({
                            Adopt: e,
                            typeData: n,
                            recommendData: i
                        }), util.computeHeight(r, i, 2), wx.stopPullDownRefresh();
                    }
                }), wx.stopPullDownRefresh(), wx.hideLoading();
            }
        });
    },
    changeType: function(a) {
        var t = a.currentTarget.dataset.index;
        this.getGoodsData(1, t), this.setData({
            classify: t
        });
    },
    getGoodsData: function(n, i, r) {
        var o = this, a = o.data, t = a.recommendData, e = a.newGoodsData;
        if (1 != r) if (1 == i) {
            if (0 < t.length) return !1;
        } else if (0 < e.length) return;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getNewGoods",
                uniacid: uniacid,
                page: n,
                classify: i
            },
            success: function(a) {
                if (1 == r) if (1 == i) {
                    var t = o.data.recommendData;
                    a.data.recommendData.map(function(a) {
                        t.push(a);
                    }), o.setData({
                        recommendData: t,
                        page: parseInt(n) + 1
                    });
                } else {
                    var e = o.data.newGoodsData;
                    a.data.newGoodsData.map(function(a) {
                        e.push(a);
                    }), o.setData({
                        newGoodsData: e,
                        page: parseInt(n) + 1
                    });
                } else 1 == i ? o.setData({
                    recommendData: a.data.recommendData,
                    page: 1
                }) : o.setData({
                    newGoodsData: a.data.newGoodsData,
                    page: 1
                });
            }
        });
    },
    onReachBottom: function(a) {
        var t = this.data.classify, e = parseInt(this.data.page) + 1;
        this.getGoodsData(e, t, 1);
    }
});