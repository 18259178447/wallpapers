var app = new getApp(), util = require("../../../utils/util.js");

Page({
    data: {
        currentType: "综合",
        sort: !0,
        goodsData: [],
        page: 1,
        type_id: "",
        arr: [],
        scrollTop: 0,
        tarrHight: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this;
        if (a.type_id) var o = a.type_id; else o = 0;
        if (a.goods_name) var e = a.goods_name; else e = "";
        var s = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getGoodsList",
                type_id: o,
                uniacid: s,
                goods_name: e
            },
            success: function(a) {
                a.data.goodsData ? t.setData({
                    type_id: o,
                    goodsData: a.data.goodsData
                }) : t.setData({
                    type_id: o
                }), util.computeHeight(t, a.data.goodsData, 4);
            }
        }), app.util.setNavColor(s), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    onPageScroll: function(a) {
        for (var t = this, o = a.scrollTop, e = t.data.arr, s = t.data.tarrHight, r = 0; r < t.data.goodsData.length; r++) s[r] < o + 300 && 0 == e[r] && (e[r] = !0);
        t.setData({
            arr: e,
            scrollTop: o
        });
    },
    sortPro: function(a) {
        var t = this, o = a.currentTarget.dataset.name, e = a.currentTarget.dataset.rank, s = void 0, r = "";
        o == this.data.currentType ? (s = !this.data.sort, r = "desc") : (s = !0, r = "asc");
        var i = app.siteInfo.uniacid, d = t.data.type_id;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getGoodsList",
                type_id: d,
                uniacid: i,
                rank: e,
                rank_type: r
            },
            success: function(a) {
                a.data.goodsData && t.setData({
                    goodsData: a.data.goodsData
                });
            }
        }), this.setData({
            currentType: o,
            sort: s
        }), util.computeHeight(t, t.data.goodsData, 4), util.returnTop();
    },
    onReachBottom: function(a) {
        var e = this, s = e.data.type_id, t = app.siteInfo.uniacid, r = e.data.page, i = e.data.goodsData;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getGoodsList",
                type_id: s,
                uniacid: t,
                page: r
            },
            success: function(a) {
                if (a.data.goodsData) {
                    for (var t = a.data.goodsData, o = 0; o < t.length; o++) i.push(t[o]);
                    e.setData({
                        type_id: s,
                        goodsData: i,
                        page: parseInt(r) + 1
                    });
                }
            }
        });
    },
    intoGoodsDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../prodeteils/index?goodsid=" + t
        });
    },
    onShareAppMessage: function() {}
});