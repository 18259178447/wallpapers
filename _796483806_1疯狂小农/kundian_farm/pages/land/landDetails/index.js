var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        selectLandSpec: [],
        isReturn: !1,
        isShow: !0,
        seedData: [],
        landSpec: [],
        landLimit: [],
        total_price: 0,
        farmSetData: wx.getStorageSync("kundian_farm_setData"),
        icon: [],
        is_loading: !0,
        uid: "",
        scrollShow: !1,
        src_xy: [],
        land_num: ""
    },
    onLoad: function(a) {
        var r = this, t = a.lid, u = wx.getStorageSync("kundian_farm_uid");
        wx.showLoading({
            title: "玩命加载中..."
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getLandDetail",
                uniacid: uniacid,
                lid: t,
                control: "land"
            },
            success: function(a) {
                var t = 0;
                -1 < app.globalData.sysData.model.indexOf("iPhone X") && (t = 68);
                var e = a.data, i = e.landDetail, n = e.seedData, s = e.landSpec, o = e.landLimit, l = e.icon, d = i.live_src, c = [];
                d && (c = d.split(":")), r.setData({
                    landDetail: i,
                    seedData: n,
                    landSpec: s,
                    landLimit: o,
                    bottom: t,
                    icon: l,
                    uid: u,
                    src_xy: c
                }), a.data.landDetail.land_desc && WxParse.wxParse("article", "html", a.data.landDetail.land_desc, r, 5), 
                wx.hideLoading();
            }
        }), app.util.setNavColor(uniacid);
    },
    selectArea: function(a) {
        var t = this, e = a.currentTarget.dataset.areaid;
        this.data.landSpec.map(function(a) {
            e == a.id && t.setData({
                selectLandSpec: a
            });
        });
    },
    onPageScroll: function(a) {
        var t = !1;
        200 < a.scrollTop && (t = !0), this.setData({
            isReturn: t
        });
        350 <= a.scrollTop ? this.data.scrollShow || this.setData({
            scrollShow: !0
        }) : this.data.scrollShow && this.setData({
            scrollShow: !1
        });
    },
    returnTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    showVideo: function() {
        this.setData({
            isShow: !0
        });
    },
    hideVideo: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    select: function(a) {
        var e = a.currentTarget.dataset.id, t = this.data, i = t.landSpec, n = t.land_num;
        i.map(function(a) {
            if (a.id === e) {
                var t = a.select;
                a.select = !t, n = a.land_num;
            } else a.select = !1;
        }), this.setData({
            landSpec: i,
            land_num: n
        }), this.getTotalPrice();
    },
    getTotalPrice: function(a) {
        var t = this.data.landSpec, e = this.data.landLimit, i = 0;
        t.map(function(a) {
            a.select && (i = parseFloat(i) + a.price * e.day);
        }), this.setData({
            total_price: i.toFixed(2)
        });
    },
    toPay: function(a) {
        var t = this.data.landDetail, e = this.data.landSpec, i = [];
        if (wx.getStorageSync("kundian_farm_uid")) {
            if (e.map(function(a) {
                a.select && i.push(a);
            }), !(0 < i.length)) return wx.showModal({
                title: "提示",
                content: "请选择土地面积",
                showCancel: !1
            }), !1;
            wx.setStorageSync("selectSpec", i), wx.navigateTo({
                url: "../../user/land/payFor/index?land_id=" + t.id + "&land_method=2"
            });
        } else wx.navigateTo({
            url: "../../login/index"
        });
    },
    intoSeedDetail: function(a) {
        var t = a.currentTarget.dataset.sid;
        wx.navigateTo({
            url: "../../user/land/seedDetails/index?sid=" + t
        });
    },
    waiting: function(a) {
        console.log("正在缓冲...");
    },
    play: function(a) {
        console.log("开始播放"), this.setData({
            is_loading: !1
        });
    },
    onShow: function(a) {
        console.log("加载中"), this.setData({
            is_loading: !0
        });
    },
    getAuthUserInfo: function(a) {
        var t = this;
        app.getAuthUserInfo(a).then(function(a) {
            t.setData({
                uid: a
            }), t.toPay();
        }).then(function() {});
    }
});