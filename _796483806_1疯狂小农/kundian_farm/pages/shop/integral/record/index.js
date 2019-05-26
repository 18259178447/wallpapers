var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        recordData: [],
        page: 1,
        sign_title: "",
        isContent: !0
    },
    onLoad: function(a) {
        var t = this, e = wx.getStorageSync("kundian_farm_uid");
        wx.showLoading({
            title: "玩命加载中..."
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "getRecord",
                uniacid: uniacid,
                uid: e
            },
            success: function(a) {
                a.data.recordData ? t.setData({
                    recordData: a.data.recordData
                }) : t.setData({
                    isContent: !1
                }), wx.hideLoading();
            }
        }), app.util.setNavColor(uniacid);
    },
    onReachBottom: function() {
        var i = this, a = wx.getStorageSync("kundian_farm_uid"), t = i.data, n = t.page, r = t.recordData;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "getRecord",
                uniacid: uniacid,
                uid: a,
                page: n
            },
            success: function(a) {
                if (a.data.recordData) {
                    for (var t = a.data.recordData, e = 0; e < t.length; e++) r.push(t[e]);
                    i.setData({
                        recordData: r,
                        page: parseInt(n) + 1
                    });
                }
            }
        });
    }
});