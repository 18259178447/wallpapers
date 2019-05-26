var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: app.globalData.sysData,
        isIphoneX: app.globalData.isIphoneX,
        statusBarHeight: app.globalData.statusBarHeight,
        titleBarHeight: app.globalData.titleBarHeight,
        setData: wx.getStorageSync("kundian_farm_setData"),
        weather: [],
        loading: !0,
        mockView: 4,
        user_uid: 0,
        page: [],
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        scrollTop: 0,
        is_loading: !1,
        isBarHidden: !1,
        barDistance: 0,
        showView: !1
    },
    onLoad: function(a) {
        var r = this, i = wx.getStorageSync("kundian_farm_setData"), t = wx.getStorageSync("kundianFarmTarbar");
        t && i ? app.util.setNavColor(uniacid) : r.getMusic().then(function(a) {
            var t = a.data, e = t.tarbar, n = t.farmSetData;
            wx.setStorageSync("kundianFarmTarbar", e), wx.setStorageSync("kundian_farm_setData", n), 
            app.globalData.tarbar = e, r.setData({
                tarbar: e,
                setData: i
            }), app.util.setNavColor(uniacid);
        }).then(function() {});
        var e = parseInt(new Date().valueOf()), n = wx.getStorageSync("kundianFarmHomePage"), s = !1;
        !n || wx.getStorageSync("kundianFarmHomePage_time" + uniacid) < e ? r.getFirstData() : "search" == n.page[0].type && (s = !0), 
        s || (r.data.barDistance = 128, r.data.isIphoneX && (r.data.barDistance = 176));
        var o = a.user_uid || 0, u = wx.getStorageSync("kundian_farm_uid");
        null != o && 0 != o && (wx.setStorageSync("farm_share_uid", o), app.loginBindParent(o, u)), 
        wx.getStorageSync("enter_is_play") && wx.removeStorageSync("enter_is_play"), r.setData({
            tarbar: t || [],
            setData: i || [],
            user_uid: o,
            page: n.page || [],
            loading: !1,
            icon: n.icon || [],
            barDistance: r.data.barDistance
        }), r.getWeatherData();
    },
    onPageScroll: function(a) {
        var t = a.scrollTop;
        this.setData({
            scrollTop: t
        });
    },
    getMusic: function() {
        return new Promise(function(t, a) {
            app.util.request({
                url: "entry/wxapp/class",
                data: {
                    op: "getCommonData",
                    control: "index",
                    uniacid: uniacid
                },
                success: function(a) {
                    t(a);
                }
            });
        });
    },
    getWeatherData: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getNowWeatherData",
                uniacid: uniacid,
                control: "index"
            },
            success: function(a) {
                t.setData({
                    weather: a.data.weather,
                    weatherSet: a.data.weatherSet
                }), wx.setStorageSync("kundian_farm_weather", a.data.weather);
            }
        });
    },
    preventTouchMove: function() {},
    intoVetInfo: function(a) {
        var t = a.currentTarget.dataset.title;
        this.data.setData.vet_title && (t = this.data.setData.vet_title), wx.navigateTo({
            url: "/kundian_farm/pages/shop/VeterinaryIntroduce/index?title=" + t
        });
    },
    onShareAppMessage: function() {
        var a = wx.getStorageSync("kundian_farm_setData");
        return {
            path: "kundian_farm/pages/HomePage/index/index?&user_uid=" + wx.getStorageSync("kundian_farm_uid"),
            success: function(a) {},
            title: a.share_home_title
        };
    },
    onPullDownRefresh: function(a) {
        wx.showLoading({
            title: "玩命加载中..."
        });
        var t = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                uniacid: uniacid,
                op: "getCommonData",
                control: "index",
                refresh: !0
            },
            success: function(a) {
                wx.setStorageSync("kundianFarmTarbar", a.data.tarbar), wx.setStorageSync("kundian_farm_setData", a.data.farmSetData), 
                t.setData({
                    tarbar: a.data.tarbar,
                    setData: a.data.farmSetData
                }), t.getFirstData(), wx.stopPullDownRefresh(), wx.hideLoading();
            }
        });
    },
    getFirstData: function() {
        var a = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], o = this, t = wx.getStorageSync("kundian_farm_uid");
        wx.getStorageSync("kundian_farm_setData");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getHomeData",
                control: "index",
                uniacid: uniacid,
                uid: t,
                refresh: a
            },
            success: function(a) {
                var t = new Array();
                a.data.weather && (t = a.data.weather, wx.setStorageSync("kundian_farm_weather", t));
                var e = new Array();
                a.data.weatherSet && (e = a.data.weatherSet);
                var n = !1;
                "search" == a.data.page[0].type && (n = !0), n || (o.data.barDistance = 128, o.data.isIphoneX && (o.data.barDistance = 176));
                var r = a.data, i = r.page;
                r.icon;
                o.setData({
                    page: i,
                    weather: t,
                    loading: !1,
                    weatherSet: e,
                    icon: a.data.icon,
                    barDistance: o.data.barDistance
                }), wx.setStorageSync("kundianFarmHomePage", a.data);
                var s = parseInt(new Date().valueOf()) + 18e5;
                wx.setStorageSync("kundianFarmHomePage_time" + uniacid, s);
            }
        });
    },
    onShow: function() {
        var a = wx.getStorageSync("kundian_farm_uid"), t = this.data.user_uid;
        null != t && 0 != t && (app.loginBindParent(t, a), this.setData({
            user_uid: t
        }));
    }
});