var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        statistics: [],
        total_user: 0,
        farmSetData: [],
        is_active: 0,
        icon: [],
        plugin_pt: 0
    },
    onLoad: function(t) {
        var r = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "manager",
                op: "getStatisticsData",
                uniacid: uniacid
            },
            success: function(t) {
                var i = t.data, a = i.statistics, n = i.total_user, e = i.is_active, o = i.icon, s = i.plugin_pt;
                r.setData({
                    statistics: a,
                    total_user: n,
                    is_active: e,
                    icon: o,
                    plugin_pt: s
                });
            }
        }), app.util.setNavColor(uniacid), r.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    intoAdminShopOrder: function(t) {
        wx.navigateTo({
            url: "../../shop/sale/orderList/index?type=1"
        });
    },
    intoAdminGroupOrder: function(t) {
        wx.navigateTo({
            url: "../../shop/sale/orderList/index?type=2"
        });
    },
    intoPtOrder: function(t) {
        wx.navigateTo({
            url: "../../shop/sale/orderList/index?type=4"
        });
    },
    intoAdminIntegralOrder: function(t) {
        wx.navigateTo({
            url: "../../shop/sale/orderList/index?type=3"
        });
    },
    intoAdminLandManager: function(t) {
        wx.navigateTo({
            url: "../land/myLandlist/index?plate=1"
        });
    },
    intoAdminAnimalManager: function(t) {
        wx.navigateTo({
            url: "../land/myLandlist/index?plate=2"
        });
    },
    testVideo: function(t) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/test/index"
        });
    },
    getSiteInfo: function(t) {
        var i = app.siteInfo;
        console.log(i);
        var a = "站点信息：uniacid=" + i.uniacid + ";acid=" + i.acid + ";multiid=" + i.multiid + ";version=" + i.version + ";siteroot=" + i.siteroot;
        wx.showModal({
            title: "提示",
            content: a,
            showCancel: !1
        });
    },
    intoDevice: function(t) {
        wx.navigateTo({
            url: "../device/index"
        });
    },
    intoRelays: function(t) {
        wx.navigateTo({
            url: "../relays/index"
        });
    },
    intoCheckActive: function(t) {
        wx.scanCode({
            success: function(t) {
                console.log(t.path);
                var i = "/" + t.path;
                wx.navigateTo({
                    url: i
                });
            }
        });
    }
});