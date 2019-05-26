var util = require("../../../../utils/util.js"), app = new getApp();

Page({
    data: {
        currentType: "综合",
        sort: !0,
        goodsData: [],
        page: 1,
        type_id: "",
        arr: [],
        scrollTop: 0,
        tarrHight: []
    },
    onLoad: function(a) {
        var t = this, o = a.type_id, e = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "integral",
                op: "getGoodsList",
                type_id: o,
                uniacid: e
            },
            success: function(a) {
                a.data.goodsData ? t.setData({
                    type_id: o,
                    goodsData: a.data.goodsData
                }) : t.setData({
                    type_id: o
                }), util.computeHeight(t, a.data.goodsData, 2);
            }
        }), app.util.setNavColor(e);
    },
    onPageScroll: function(a) {
        for (var t = this, o = a.scrollTop, e = t.data.arr, s = t.data.tarrHight, i = 0; i < t.data.goodsData.length; i++) s[i] < o && 0 == e[i] && (e[i] = !0);
        t.setData({
            arr: e,
            scrollTop: o
        });
    },
    sortPro: function(a) {
        var t = this, o = a.currentTarget.dataset.name, e = a.currentTarget.dataset.rank, s = void 0, i = "";
        o == this.data.currentType ? (s = !this.data.sort, i = "desc") : (s = !0, i = "asc");
        var r = app.siteInfo.uniacid, d = t.data.type_id;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "integral",
                op: "getGoodsList",
                type_id: d,
                uniacid: r,
                rank: e,
                rank_type: i
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
        var e = this, s = e.data.type_id, t = app.siteInfo.uniacid, i = e.data.page, r = e.data.goodsData;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "integral",
                op: "getGoodsList",
                type_id: s,
                uniacid: t,
                page: i
            },
            success: function(a) {
                if (a.data.goodsData) {
                    for (var t = a.data.goodsData, o = 0; o < t.length; o++) r.push(t[o]);
                    e.setData({
                        type_id: s,
                        goodsData: r,
                        page: parseInt(i) + 1
                    });
                }
            }
        });
    },
    intoGoodsDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../exchangedetails/index?goods_id=" + t
        });
    },
    onShareAppMessage: function() {}
});