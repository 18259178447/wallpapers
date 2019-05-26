var _calendarTemplate = require("../../../template/calendarTemplate/calendarTemplate"), _calendarTemplate2 = _interopRequireDefault(_calendarTemplate);

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: app.globalData.sysData,
        isIphoneX: app.globalData.isIphoneX,
        bg: "",
        date: 3,
        userInfo: [],
        userData: [],
        is_sign: 2,
        aboutData: [],
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1
    },
    onLoad: function(a) {
        (0, _calendarTemplate2.default)();
        var o = this, t = wx.getStorageSync("kundian_farm_uid"), u = wx.getStorageSync("userInfo"), c = this.data.calendar, e = this.data.calendar.curYear, n = this.data.calendar.curMonth, i = wx.getStorageSync("kundian_farm_setData"), r = !1;
        a.is_tarbar && (r = a.is_tarbar), o.setData({
            sign_title: i.sign_title,
            tarbar: wx.getStorageSync("kundianFarmTarbar"),
            is_tarbar: r
        }), 0 != t ? app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "getSignData",
                uid: t,
                uniacid: uniacid,
                year: e,
                month: n
            },
            success: function(a) {
                if (a.data.signData) {
                    for (var t = a.data.signData, e = 0; e < t.length; e++) for (var n = 0; n < c.days.length; n++) c.days[n].day == t[e].day && (c.days[n].choosed = !0, 
                    c.days[n].sign = !0);
                    o.setData({
                        calendar: c
                    });
                }
                var i = a.data, r = i.userData, s = i.is_sign, d = i.aboutData;
                o.setData({
                    userInfo: u.memberInfo,
                    userData: r,
                    is_sign: s,
                    aboutData: d,
                    bg: d.sign_banner
                });
            }
        }) : wx.redirectTo({
            url: "../../../login/index"
        }), app.util.setNavColor(uniacid);
    },
    intoIntegral: function(a) {
        wx.navigateTo({
            url: "../exchange/index"
        });
    },
    intoRecord: function(a) {
        wx.navigateTo({
            url: "../record/index"
        });
    },
    addSign: function(a) {
        var t = wx.getStorageSync("kundian_farm_uid"), e = this, n = e.data.calendar.days;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "addSign",
                uid: t,
                uniacid: uniacid
            },
            success: function(a) {
                if (1 == a.data.code) {
                    wx.showToast({
                        title: "签到成功"
                    });
                    for (var t = 0; t < n.length; t++) n[t].day == a.data.day && (n[t].choosed = !0);
                    e.setData({
                        userData: a.data.userData,
                        is_sign: 1,
                        "calendar.days": n
                    });
                } else 2 == a.data.code ? wx.showToast({
                    title: "签到失败"
                }) : 3 == a.data.code ? wx.showToast({
                    title: "今日已签到"
                }) : wx.showToast({
                    title: "签到失败1"
                });
            }
        });
    },
    intoSignRule: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/common/agreement/index?type=3"
        });
    },
    onShareAppMessage: function() {},
    signCard: function() {
        var a = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "signCard",
                uid: a,
                uniacid: uniacid
            },
            success: function(a) {
                console.log(a);
            }
        });
    }
});