var app = new getApp();

Page({
    data: {
        adoptData: [],
        statusData: [],
        adopt_id: "",
        page: 1,
        state: 1,
        isslaugHter: !1,
        farmSetData: [],
        isShow: !1,
        is_loading: !0,
        src_xy: []
    },
    onLoad: function(a) {
        var r = this, t = app.siteInfo.uniacid, n = a.adopt_id;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "getAdoptDetail",
                uniacid: t,
                adopt_id: n
            },
            success: function(a) {
                var t = a.data, s = t.adoptData, e = t.statusData, i = s.live_src, o = [];
                i && (o = i.split(":")), r.setData({
                    adoptData: s,
                    statusData: e,
                    adopt_id: n,
                    src_xy: o
                });
            }
        }), r.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        }), app.util.setNavColor(t);
    },
    onReachBottom: function(a) {
        var e = this, t = app.siteInfo.uniacid, s = e.data, i = s.adopt_id, o = s.statusData, r = s.page;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "getStatusData",
                uniacid: t,
                adopt_id: i,
                page: r
            },
            success: function(a) {
                if (a.data.statusData) {
                    for (var t = a.data.statusData, s = 0; s < t.length; s++) o.push(t[s]);
                    e.setData({
                        statusData: o,
                        page: parseInt(r) + 1
                    });
                }
            }
        });
    },
    preImg: function(a) {
        for (var t = this.data.statusData, s = a.currentTarget.dataset, e = s.sid, i = s.index, o = [], r = 0; r < t.length; r++) t[r].id == e && (o = t[r].src);
        wx.previewImage({
            current: o[i],
            urls: o
        });
    },
    kellSend: function(a) {
        var t = this.data.adopt_id;
        wx.navigateTo({
            url: "../../user/confirmOrder/index?adopt_id=" + t
        });
    },
    slaugHter: function() {
        this.setData({
            isslaugHter: !0
        });
    },
    preventTouchMove: function() {},
    showVideo: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    play: function(a) {
        this.setData({
            is_loading: !1
        });
    },
    lookOrder: function(a) {
        var t = a.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/Group/orderDetails/index?order_id=" + t
        });
    }
});