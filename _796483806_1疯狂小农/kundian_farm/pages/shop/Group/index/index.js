var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: app.globalData.sysData,
        isIphoneX: app.globalData.isIphoneX,
        goodsData: [],
        page: 1,
        farmSetData: [],
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1
    },
    onLoad: function(a) {
        var t = this, o = (wx.getStorageSync("kundian_farm_uid"), !1);
        a.is_tarbar && (o = a.is_tarbar), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            tarbar: wx.getStorageSync("kundianFarmTarbar"),
            is_tarbar: o
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupGoods",
                uniacid: uniacid
            },
            success: function(a) {
                t.setData({
                    goodsData: a.data.goodsData
                });
            }
        }), app.util.setNavColor(uniacid);
    },
    onReachBottom: function(a) {
        var r = this, t = r.data, e = (t.type_id, t.page), n = t.goodsData;
        wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "group",
                op: "getGroupGoods",
                uniacid: uniacid,
                page: e
            },
            success: function(a) {
                if (a.data.goodsData) {
                    for (var t = a.data.goodsData, o = 0; o < t.length; o++) n.push(t[o]);
                    r.setData({
                        goodsData: n,
                        page: parseInt(e) + 1
                    });
                }
            }
        });
    },
    intoGroupDetail: function(a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../proDetails/index?goods_id=" + t
        });
    }
});