var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        currentState: "1",
        allLands: [],
        currentLand: [],
        page: 1,
        landData: [],
        farmSetData: [],
        currentIndex: "全部",
        is_load: !0,
        renew_low_time: []
    },
    onLoad: function(a) {
        this.setData({
            currentLand: this.data.allLands
        });
        var t = this, n = wx.getStorageSync("kundian_farm_uid");
        t.data.currentState;
        0 != n ? t.getLandData() : wx.redirectTo({
            url: "../../../login/index"
        }), app.util.setNavColor(uniacid), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    getLandData: function() {
        var t = this, a = wx.getStorageSync("kundian_farm_uid"), n = t.data.currentState;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getMineLand",
                control: "land",
                uid: a,
                uniacid: uniacid,
                current: n
            },
            success: function(a) {
                0 < a.data.landData.length ? t.setData({
                    landData: a.data.landData,
                    is_load: !0,
                    renew_low_time: a.data.renew_low_time
                }) : t.setData({
                    is_load: !1
                });
            }
        });
    },
    changeState: function(a) {
        var t = this, n = [], e = a.currentTarget.dataset.state;
        t.data.allLands.map(function(a) {
            "1" === e ? n.push(a) : "2" === e ? 0 < a.plant.length && n.push(a) : "3" === e && 0 == a.plant.length && n.push(a);
        }), t.setData({
            currentState: e,
            currentLand: n
        }), t.getLandData();
    },
    intoMineLandDetail: function(a) {
        var t = a.currentTarget.dataset.lid;
        if (2 == a.currentTarget.dataset.landstatus) return wx.showModal({
            title: "提示",
            content: "您的土地已过期",
            showCancel: !1
        }), !1;
        wx.navigateTo({
            url: "/kundian_farm/pages/land/mineLandDetail/index?lid=" + t
        });
    },
    gotoBuy: function(a) {
        wx.navigateTo({
            url: "../../../land/landList/index"
        });
    },
    onReachBottom: function(a) {
        var e = this, t = wx.getStorageSync("kundian_farm_uid"), n = e.data, d = n.currentState, i = n.page, r = n.landData;
        app.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getMineLand",
                uid: t,
                uniacid: uniacid,
                current: d,
                page: i
            },
            success: function(a) {
                if (a.data.landData) {
                    for (var t = a.data.landData, n = 0; n < t.length; n++) r.push(t[n]);
                    e.setData({
                        landData: r,
                        page: parseInt(i) + 1
                    });
                }
            }
        });
    },
    intoBag: function(a) {
        var t = a.detail.formId;
        wx.navigateTo({
            url: "/kundian_farm/pages/land/seedBag/index?formid=" + t
        });
    },
    landRenew: function(a) {
        var t = a.currentTarget.dataset.landid;
        wx.navigateTo({
            url: "/kundian_farm/pages/user/land/payFor/index?land_id=" + t + "&is_renew=2"
        });
    }
});