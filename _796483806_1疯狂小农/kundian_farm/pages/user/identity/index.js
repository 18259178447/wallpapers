var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        name: "",
        id_card: ""
    },
    onLoad: function(a) {
        var t = wx.getStorageSync("kundian_farm_uid"), n = (wx.getStorageSync("kundian_farm_setData"), 
        this);
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getUserBindPhone",
                uid: t,
                uniacid: uniacid
            },
            success: function(a) {
                var t = a.data.userInfo;
                n.setData({
                    name: t.truename,
                    id_card: t.id_card
                });
            }
        }), app.util.setNavColor(uniacid);
    },
    getstatusValue: function(a) {
        this.setData({
            id_card: a.detail.value
        });
    },
    getNameValue: function(a) {
        this.setData({
            name: a.detail.value
        });
    },
    submit: function() {
        var a = this.data, t = a.name, n = a.id_card;
        if ("" == t || void 0 === t) return wx.showToast({
            title: "姓名不能为空",
            icon: "none",
            duration: 2e3
        }), !1;
        if ("" == n && wx.showToast({
            title: "身份证号码不能为空",
            icon: "none",
            duration: 2e3
        }), !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(n)) return wx.showToast({
            title: "请输入正确的身份证号码",
            icon: "none",
            duration: 2e3
        }), !1;
        var e = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "realNameAuth",
                name: t,
                id_card: n,
                uniacid: uniacid,
                uid: e
            },
            success: function(a) {
                wx.showToast({
                    title: a.data.msg,
                    icon: "none"
                });
            }
        });
    }
});