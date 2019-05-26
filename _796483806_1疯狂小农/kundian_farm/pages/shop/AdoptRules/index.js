var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        state: !1,
        count: 1,
        animalData: [],
        aid: "",
        sku_name: "",
        aboutData: [],
        farmSetData: [],
        isShow: !1,
        is_loading: !0,
        kefu: {
            cover: "",
            url: "/kundian_farm/pages/shop/AdoptRules/index",
            title: ""
        },
        src_xy: []
    },
    preventTouchMove: function() {},
    onLoad: function(a) {
        var s = this, u = a.aid, t = 0;
        -1 < app.globalData.sysData.model.indexOf("iPhone X") && (t = 68);
        var n = wx.getStorageSync("kundian_farm_setData"), i = this.data.kefu;
        if (n.kefu_card) {
            var e = n.kefu_card;
            i.title = e.title || "认养详情", i.cover = e.cover || this.data.avatarUrl;
        }
        i.url = "/kundian_farm/pages/shop/AdoptRules/index?aid=" + u, s.setData({
            farmSetData: n,
            kefu: i
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "animalDetail",
                aid: u,
                uniacid: uniacid
            },
            success: function(a) {
                var t = a.data, n = t.animalData, i = t.aboutData, e = n.src, o = [];
                o && (o = e.split(":")), s.setData({
                    animalData: n,
                    aid: u,
                    aboutData: i,
                    src_xy: o
                }), "" != n.detail_desc && WxParse.wxParse("article", "html", n.detail_desc, s, 5);
            }
        });
        var o = a.user_uid, r = wx.getStorageSync("kundian_farm_uid");
        app.loginBindParent(o, r), null != o && 0 != o && s.setData({
            user_uid: o
        }), s.setData({
            bottom: t
        }), app.util.setNavColor(uniacid);
    },
    onShow: function(a) {
        var t = this.data.user_uid, n = wx.getStorageSync("kundian_farm_uid");
        app.loginBindParent(t, n), null != t && 0 != t && this.setData({
            user_uid: t
        });
    },
    showMode: function() {
        var a = wx.getStorageSync("kundian_farm_uid");
        null == a || 0 == a ? wx.navigateTo({
            url: "../../login/index"
        }) : this.setData({
            state: !0
        });
    },
    hideModal: function() {
        this.setData({
            state: !1
        });
    },
    reduceNum: function() {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        });
    },
    addNum: function() {
        var a = this.data, t = a.count, n = a.animalData;
        parseInt(t) + 1 > n.count ? wx.showToast({
            title: "库存不足",
            icon: "none"
        }) : this.setData({
            count: parseInt(t) + 1
        });
    },
    chooseNum: function(a) {
        var t = this.data, n = (t.count, t.animalData);
        console.log(a.detail.value), a.detail.value > n.count ? wx.showToast({
            title: "库存不足",
            icon: "none"
        }) : this.setData({
            count: a.detail.value
        });
    },
    goHome: function(a) {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index?is_tarbar=true"
        });
    },
    doCall: function(a) {
        var t = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    sureAnimal: function(a) {
        var t = this.data, n = t.aid, i = t.animalData, e = t.count;
        wx.getStorageSync("kundian_farm_uid");
        parseInt(e) + 1 > i.count ? wx.showToast({
            title: "库存不足",
            icon: "none"
        }) : (wx.setStorageSync("kundian_farm_buy_animal", i), wx.navigateTo({
            url: "../confirmAdopt/index?count=" + e + "&aid=" + n
        }));
    },
    onShareAppMessage: function() {
        var a = this, t = wx.getStorageSync("kundian_farm_uid");
        return {
            path: "/kundian_farm/pages/shop/AdoptRules/index?aid=" + a.data.animalData.id + "&user_uid=" + t,
            success: function(a) {},
            title: a.data.animalData.animal_name,
            imageUrl: a.data.animalData.animal_src
        };
    },
    showVideo: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    hideVideo: function() {
        this.setData({
            isShow: !1
        });
    },
    play: function(a) {
        this.setData({
            is_loading: !1
        });
    }
});