var WxParse = require("../../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        goodsid: "",
        goodsData: [],
        specItem: [],
        is_show: 1,
        count: 1,
        price: "",
        spec_src: "",
        spec_id: "",
        farmSetData: []
    },
    onLoad: function(a) {
        var t = a.goods_id, e = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getIntegralGoodsDetail",
                uniacid: uniacid,
                goods_id: t,
                control: "integral"
            },
            success: function(a) {
                e.setData({
                    goodsData: a.data.goodsData,
                    specItem: a.data.specItem,
                    goodsid: t
                }), "" != a.data.goodsData.goods_desc && WxParse.wxParse("article", "html", a.data.goodsData.goods_desc, e, 5);
            }
        }), app.util.setNavColor(uniacid);
        var s = 0;
        -1 < app.globalData.sysData.model.indexOf("iPhone X") && (s = 68), e.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            bottom: s
        });
    },
    hideModal: function() {
        this.setData({
            is_show: 1
        });
    },
    reduceNum: function() {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        });
    },
    addNum: function() {
        this.setData({
            count: this.data.count + 1
        });
    },
    chooseNum: function(a) {
        this.setData({
            count: a.detail.value
        });
    },
    doExchange: function(a) {
        var t = wx.getStorageSync("kundian_farm_uid");
        if (null != t && 0 != t) {
            var e = this.data, s = e.goodsData, o = e.goodsid, i = e.count;
            1 == s.is_open_sku ? this.setData({
                is_show: 2
            }) : wx.navigateTo({
                url: "../orderConfrim/index?goodsid=" + o + "&count=" + i
            });
        } else wx.navigateTo({
            url: "../../../login/index"
        });
    },
    selectSpec: function(a) {
        for (var t = this, e = t.data, s = e.goodsid, o = e.specItem, i = a.currentTarget.dataset, d = i.specid, c = i.valid, n = new Array(), r = 0; r < o.length; r++) {
            o[r].id == d && (o[r].select_spec = 1);
            for (var u = 0; u < o[r].specVal.length; u++) o[r].id == d && (o[r].specVal[u].select_val = 0), 
            o[r].specVal[u].id == c && (o[r].specVal[u].select_val = 1), 1 == o[r].specVal[u].select_val && n.push(o[r].specVal[u].id);
        }
        var l = n.join(",");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSpec",
                uniacid: uniacid,
                spec_id: l,
                goodsid: s,
                control: "integral"
            },
            success: function(a) {
                a.data.specVal ? t.setData({
                    price: a.data.specVal.price,
                    spec_src: a.data.specVal.spec_src,
                    spec_id: a.data.specVal.id,
                    specItem: o
                }) : t.setData({
                    specItem: o
                });
            }
        });
    },
    sureGoods: function(a) {
        var t = this.data, e = t.goodsid, s = t.spec_id, o = t.count;
        if (1 == t.goodsData.is_open_sku) {
            if ("" == s && 0 == s.length) return wx.showToast({
                title: "请选择规格"
            }), !1;
            wx.navigateTo({
                url: "../orderConfrim/index?goodsid=" + e + "&spec_id=" + s + "&count=" + o
            });
        } else wx.navigateTo({
            url: "../orderConfrim/index?goodsid=" + e + "&count=" + o
        });
    }
});