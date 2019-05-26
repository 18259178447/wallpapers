var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: app.globalData.sysData,
        isIphoneX: app.globalData.isIphoneX,
        landType: [],
        currentLand: [],
        currentIndex: 1,
        page: 1,
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !0,
        farmSetData: wx.getStorageSync("kundian_farm_setData")
    },
    onLoad: function(a) {
        var r = this, t = a.is_tarbar || !1, n = wx.getStorageSync("kundianFarmTarbar");
        if (r.setData({
            is_tarbar: t,
            tarbar: n
        }), wx.showLoading({
            title: "玩命加载中"
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getLandList",
                uniacid: uniacid,
                control: "land"
            },
            success: function(a) {
                var t = a.data, n = t.landType, e = t.landData;
                r.setData({
                    landType: n,
                    currentLand: e,
                    currentIndex: n[0].id || 1
                }), wx.hideLoading();
            }
        }), app.util.setNavColor(uniacid), a.is_play) {
            var e = a.is_play;
            wx.setStorageSync("enter_is_play", e);
        } else wx.removeStorageSync("entry_is_play");
    },
    changeArea: function(a) {
        var t = a.currentTarget.dataset.id;
        this.getLandData(t, 0, 1);
    },
    getLandData: function(n, e, r) {
        var i = this;
        r = parseInt(r) + 1, 1 != e && (r = 1), app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getLandByType",
                control: "land",
                uniacid: uniacid,
                type_id: n,
                page: r
            },
            success: function(a) {
                if (1 == e) {
                    var t = i.data.currentLand;
                    if (a.data.landData) a.data.landData.map(function(a) {
                        t.push(a);
                    }), i.setData({
                        currentLand: t,
                        page: r,
                        currentIndex: n
                    });
                } else i.setData({
                    currentLand: a.data.landData,
                    currentIndex: n,
                    page: 1
                });
            }
        });
    },
    onReachBottom: function(a) {
        var t = this.data.currentIndex, n = this.data.page;
        this.getLandData(t, 1, n);
    },
    intoLandDetail: function(a) {
        var t = a.currentTarget.dataset.lid;
        wx.navigateTo({
            url: "../landDetails/index?lid=" + t
        });
    },
    onShow: function(a) {
        var t = wx.getStorageSync("kundianFarmTarbar");
        this.setData({
            tarbar: t
        });
    }
});