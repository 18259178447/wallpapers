var _data;

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var WxParse = require("../../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: (_data = {
        imgs: [],
        info: {},
        state: !1,
        Position: []
    }, _defineProperty(_data, "state", !1), _defineProperty(_data, "count", 1), _defineProperty(_data, "goodsData", []), 
    _defineProperty(_data, "specItem", []), _defineProperty(_data, "goods_id", ""), 
    _defineProperty(_data, "specVal", ""), _defineProperty(_data, "sku_name_str", ""), 
    _defineProperty(_data, "aboutData", []), _defineProperty(_data, "user_uid", 0), 
    _defineProperty(_data, "farmSetData", []), _defineProperty(_data, "bottom", 0), 
    _data),
    onLoad: function(t) {
        var a = this, e = t.goods_id, o = wx.getStorageSync("kundian_farm_uid"), s = t.user_uid;
        null != s && 0 != s && (app.loginBindParent(s, o), a.setData({
            user_uid: s
        })), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupDetail",
                uniacid: uniacid,
                goods_id: e
            },
            success: function(t) {
                a.setData({
                    goodsData: t.data.goodsData,
                    specItem: t.data.specItem,
                    goods_id: e,
                    aboutData: t.data.aboutData
                }), "" != t.data.goodsData.goods_desc && WxParse.wxParse("article", "html", t.data.goodsData.goods_desc, a, 5);
            }
        });
        var i = 0;
        -1 < app.globalData.sysData.model.indexOf("iPhone X") && (i = 68), app.util.setNavColor(uniacid), 
        a.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            bottom: i
        });
    },
    onShow: function(t) {
        var a = this.data.user_uid, e = wx.getStorageSync("kundian_farm_uid");
        null != a && 0 != a && (app.loginBindParent(a, e), this.setData({
            user_uid: a
        }));
    },
    showMode: function() {
        this.setData({
            state: !0
        });
    },
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    chooseTime: function(t) {
        for (var s = this, a = t.currentTarget.dataset, i = a.spec_id, n = a.valid, e = s.data, d = e.specItem, o = e.goods_id, r = [], u = 0; u < d.length; u++) {
            d[u].id == i && (d[u].is_select = 1);
            for (var c = 0; c < d[u].specVal.length; c++) d[u].id == i && (d[u].specVal[c].is_select = 0), 
            d[u].specVal[c].id == n && (d[u].specVal[c].is_select = 1), 1 == d[u].specVal[c].is_select && r.push(d[u].specVal[c].id);
        }
        var l = r.join("_");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupSpec",
                spec_id: l,
                uniacid: uniacid,
                goods_id: o
            },
            success: function(t) {
                if (1 == t.data.code) s.setData({
                    specVal: t.data.specVal
                }); else if (2 == t.data.code) {
                    for (var a = 0; a < d.length; a++) {
                        d[a].id == i && (d[a].is_select = 1);
                        for (var e = 0; e < d[a].specVal.length; e++) {
                            d[a].specVal[e].id == n && (d[a].specVal[e].is_select = 0, d[a].specVal[e].is_count = 0);
                            for (var o = 0; o < r.length; o++) r[o] == n && r.splice(o, 1);
                        }
                    }
                    wx.showToast({
                        title: "库存不足"
                    }), s.setData({
                        specVal: []
                    });
                }
                s.setData({
                    specItem: d,
                    sku_name_str: t.data.sku_name_str,
                    count: 1
                });
            }
        });
    },
    buyNow: function(t) {
        var a = wx.getStorageSync("kundian_farm_uid");
        if (0 != a && null != a) {
            var e = this.data, o = e.goodsData, s = e.count;
            1 == o.is_open_sku ? this.setData({
                state: !0
            }) : 1 <= o.count && s > o.count ? wx.navigateTo({
                url: "../confrimOrder/index?goods_id=" + o.id + "&count=" + s
            }) : wx.showToast({
                title: "库存不足"
            });
        } else wx.navigateTo({
            url: "../../../login/index"
        });
    },
    reduceNum: function() {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        });
    },
    addNum: function() {
        var t = this.data, a = t.specVal, e = t.count, o = t.goodsData;
        if (1 == o.is_open_sku) {
            if ("" == a || 0 == a.length) return wx.showToast({
                title: "请选择规格"
            }), !1;
            parseInt(e) + 1 > a.count ? wx.showToast({
                title: "库存不足"
            }) : this.setData({
                count: this.data.count + 1
            });
        } else parseInt(e) + 1 > o.count ? wx.showToast({
            title: "库存不足"
        }) : this.setData({
            count: this.data.count + 1
        });
    },
    chooseNum: function(t) {
        var a = this.data, e = a.specVal, o = a.goodsData, s = t.detail.value;
        if (1 == o.is_open_sku) {
            if ("" == e || 0 == e.length) return wx.showToast({
                title: "请选择规格"
            }), !1;
            parseInt(s) > e.count ? (wx.showToast({
                title: "库存不足"
            }), this.setData({
                count: 1
            })) : this.setData({
                count: s
            });
        } else parseInt(s) > o.count ? (wx.showToast({
            title: "库存不足"
        }), this.setData({
            count: 1
        })) : this.setData({
            count: s
        });
    },
    goHome: function(t) {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index?is_tarbar=true"
        });
    },
    doCall: function(t) {
        var a = t.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    sureGoods: function(t) {
        var a = this.data, e = a.goods_id, o = a.goodsData, s = (a.specItem, a.count), i = a.specVal, n = wx.getStorageSync("kundian_farm_uid");
        if (0 == n || null == n) wx.navigateTo({
            url: "../../../login/index"
        }); else if (1 == o.is_open_sku) {
            if (0 == i.length || "" == i) return wx.showToast({
                title: "请选择规格"
            }), !1;
            if (1 <= i.count) return i.count >= s ? void wx.navigateTo({
                url: "../confrimOrder/index?goods_id=" + e + "&spec_id=" + i.id + "&count=" + s
            }) : void wx.showToast({
                title: "库存不足"
            });
            wx.showToast({
                title: "库存不足"
            });
        } else {
            if (1 <= i.count) return i.count >= s ? void wx.navigateTo({
                url: "../confrimOrder/index?goods_id=" + e + "&count=" + s
            }) : void wx.showToast({
                title: "库存不足"
            });
            wx.showToast({
                title: "库存不足"
            });
        }
    },
    onShareAppMessage: function() {
        var t = this.data.goodsData, a = wx.getStorageSync("kundian_farm_uid");
        return {
            path: "/kundian_farm/pages/shop/Group/proDetails/index?goods_id=" + t.id + "&user_uid=" + a,
            success: function(t) {},
            title: t.goods_name,
            imageUrl: t.cover
        };
    }
});