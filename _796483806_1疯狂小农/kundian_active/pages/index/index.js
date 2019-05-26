var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_active", url = app.util.url("entry/wxapp/class") + "m=" + mudule_name;

Page({
    data: {
        SystemInfo: app.globalData.sysData,
        isIphoneX: app.globalData.isIphoneX,
        activeList: [],
        page: 1,
        activeSet: [],
        currentIndex: 1,
        farmSetData: [],
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1,
        isContent: !0
    },
    onLoad: function(a) {
        app.util.getUserInfo();
        var t = !1;
        a.is_tarbar && (t = a.is_tarbar);
        var e = wx.getStorageSync("kundian_farm_setData");
        this.setData({
            farmSetData: e,
            tarbar: wx.getStorageSync("kundianFarmTarbar"),
            is_tarbar: t
        }), this.getActiveData(1, 1, 0), app.util.setNavColor(uniacid), wx.checkSession({
            success: function(a) {
                console.log(a);
            },
            fail: function(a) {
                console.log(a), wx.login();
            }
        });
    },
    getActiveData: function(e, a, i) {
        wx.showLoading({
            title: "玩命加载中...."
        });
        var n = this, r = n.data.activeList;
        wx.request({
            url: url,
            data: {
                action: "active",
                op: "getActiveList",
                uniacid: uniacid,
                page: e,
                current: a
            },
            success: function(a) {
                if (a.data.activeList) {
                    var t = a.data.activeList;
                    1 == i ? t.map(function(a) {
                        r.push(a);
                    }) : (r = t, e = 1), n.setData({
                        activeList: r,
                        page: e,
                        activeSet: a.data.activeSetData
                    }), wx.stopPullDownRefresh();
                } else n.setData({
                    activeSet: a.data.activeSetData,
                    isContent: !1
                });
                wx.setStorageSync("kundian_farm_active_set", a.data.activeSetData), wx.hideLoading();
            }
        });
    },
    onReachBottom: function(a) {
        var t = parseInt(this.data.page) + 1, e = this.data.currentIndex;
        this.getActiveData(t, e, 1);
    },
    onPullDownRefresh: function(a) {
        var t = this.data.currentIndex;
        this.getActiveData(1, t, 0);
    },
    intoActiveDetail: function(a) {
        var t = a.currentTarget.dataset.activeid;
        wx.navigateTo({
            url: "../details/index?activeid=" + t
        });
    },
    changeIndex: function(a) {
        var t = a.currentTarget.dataset.index;
        this.getActiveData(1, t, 0), this.setData({
            currentIndex: t
        });
    },
    onShareAppMessage: function(a) {}
});