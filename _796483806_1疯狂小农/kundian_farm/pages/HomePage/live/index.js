var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: app.globalData.sysData,
        isIphoneX: app.globalData.isIphoneX,
        playState: !0,
        LiveIndex: 0,
        farmlands: [],
        liveData: [],
        liveType: [],
        recommendData: [],
        scrollLeft: 0,
        farmSetData: [],
        height: 0,
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1,
        is_loading: !0,
        src_xy: []
    },
    onLoad: function(a) {
        var n = this, t = !1;
        a.is_tarbar && (t = a.is_tarbar), n.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            tarbar: wx.getStorageSync("kundianFarmTarbar"),
            is_tarbar: t
        }), n.videoContext = wx.createVideoContext("myVideo", this);
        var e = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "live",
                op: "getLiveData",
                uniacid: e
            },
            success: function(a) {
                var t = new Array();
                if (a.data.liveData) {
                    var e = (t = a.data.liveData[0]).src, i = [];
                    e && (i = e.split(":"));
                }
                console.log(i), n.setData({
                    farmland: a.data.liveData,
                    liveType: a.data.liveType,
                    LiveIndex: 0,
                    recommendData: t,
                    src_xy: i
                });
            }
        }), app.util.setNavColor(e), wx.getSystemInfo({
            success: function(a) {
                var t, e = a.windowWidth;
                t = a.windowHeight - e / 750 * 215 - 225, n.setData({
                    height: t
                });
            }
        });
    },
    changTab: function(a) {
        var n = this, t = a.currentTarget.dataset, s = t.index, r = t.typename;
        n.data.liveType;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "live",
                op: "getLiveTypeData",
                uniacid: uniacid,
                type_id: s
            },
            success: function(a) {
                n.data.liveType.map(function(a, t) {
                    a.name === r && (t <= 1 ? n.setData({
                        scrollLeft: 0
                    }) : 1 < t && t <= n.data.liveType.length - 2 && n.setData({
                        scrollLeft: 100 * (t - 1)
                    }));
                });
                var t = new Array();
                if (a.data.liveData) {
                    var e = (t = a.data.liveData[0]).src, i = [];
                    e && (i = e.split(":"));
                }
                console.log(i), n.setData({
                    farmland: a.data.liveData,
                    LiveIndex: s,
                    recommendData: t,
                    src_xy: i
                });
            }
        });
    },
    chooseLive: function(a) {
        var t = this, e = a.currentTarget.dataset.id, i = t.data.recommendData, n = !0, s = void 0;
        if (t.setData({
            playState: !t.data.playState
        }), i.id == e) t.data.playState ? (t.videoContext.pause(), t.setData({
            playState: !1
        })) : (t.videoContext.play(), t.setData({
            playState: !0
        })); else {
            for (var r = t.data.farmland, o = 0; o < r.length; o++) e == r[o].id && (i.src == r[o].src && (n = !1), 
            s = r[o]);
            var l = s.src, d = [];
            l && (d = l.split(":")), t.setData({
                recommendData: s,
                is_loading: n,
                src_xy: d
            });
        }
    },
    statechange: function(a) {
        console.log("live-player code:", a.detail.code);
    },
    play: function(a) {
        this.setData({
            playState: !0,
            is_loading: !1
        });
    },
    pause: function(a) {
        this.setData({
            playState: !1
        });
    },
    bindwaiting: function(a) {
        wx.showToast({
            title: "连接成功",
            icon: "loading"
        }), this.setData({
            is_loading: !1
        });
    },
    onShareAppMessage: function(a) {}
});