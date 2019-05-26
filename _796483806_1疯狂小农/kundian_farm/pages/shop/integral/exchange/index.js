var app = new getApp(), util = require("../../../../utils/util.js"), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: app.globalData.sysData,
        isIphoneX: app.globalData.isIphoneX,
        types: [],
        exchanges: [],
        userData: [],
        slideData: [],
        arr: [],
        scrollTop: 0,
        tarrHight: [],
        farmSetData: [],
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1
    },
    onLoad: function(a) {
        var t = !1;
        a.is_tarbar && (t = a.is_tarbar), this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            tarbar: wx.getStorageSync("kundianFarmTarbar"),
            is_tarbar: t
        }), this.getIntegralData(), app.util.setNavColor(uniacid);
    },
    getIntegralData: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getIntrgralData",
                uid: e,
                uniacid: uniacid,
                control: "integral"
            },
            success: function(a) {
                t.setData({
                    types: a.data.typeData,
                    userData: a.data.userData,
                    exchanges: a.data.recommendData,
                    slideData: a.data.slideData
                }), util.computeHeight(t, a.data.recommendData, 2);
            }
        });
    },
    onShow: function(a) {
        this.getIntegralData();
    },
    onPageScroll: function(a) {
        for (var t = this, e = a.scrollTop, r = t.data.arr, n = t.data.tarrHight, i = 0; i < t.data.exchanges.length; i++) n[i] < e && 0 == r[i] && (r[i] = !0);
        t.setData({
            arr: r,
            scrollTop: e
        });
    },
    intoDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../exchangedetails/index?goods_id=" + t
        });
    },
    intoExchangeList: function(a) {
        var t = a.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: "../exchange_list/index?type_id=" + t
        });
    },
    intoIntegralRecord: function(a) {
        wx.navigateTo({
            url: "../orderList/index"
        });
    },
    intoDetailSlide: function(a) {
        var t = a.currentTarget.dataset.linktype, e = a.currentTarget.dataset.linkparam;
        0 == e || "" == e ? wx.navigateTo({
            url: "/" + t
        }) : wx.navigateTo({
            url: "/" + e
        });
    },
    intoIntegral: function(a) {
        wx.navigateTo({
            url: "../record/index"
        });
    }
});