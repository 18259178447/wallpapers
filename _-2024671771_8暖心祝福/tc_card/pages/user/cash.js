var app = getApp();

Page({
    data: {
        cashing: !0
    },
    onLoad: function(a) {
        var t = a.fee;
        this.setData({
            userInfo: app.globalData.userInfo,
            fee: t
        }), this.getsetData();
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: "提现"
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#DB5943",
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    getsetData: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/getsetdata",
            method: "post",
            dataType: "json",
            success: function(a) {
                t.setData({
                    leastmon: a.data.leastmon,
                    service: a.data.service
                });
            }
        });
    },
    allmon: function() {
        var a = this.data.fee, t = this.data.fee;
        parseFloat(a) > parseFloat(t) && (a = t);
        var e = (parseFloat(a) * (this.data.service / 100)).toFixed(2);
        this.setData({
            nowmoney: parseFloat(a),
            shouxu: e,
            tixian: (parseFloat(a) - parseFloat(e)).toFixed(2)
        });
    },
    inputmon: function(a) {
        var t = a.detail.value, e = this.data.fee;
        parseFloat(t) > parseFloat(e) && (t = e);
        var o = (parseFloat(t) * (this.data.service / 100)).toFixed(2);
        this.setData({
            nowmoney: parseFloat(t),
            shouxu: o,
            tixian: 1 == t ? 1 : (parseFloat(t) - parseFloat(o)).toFixed(2)
        });
    },
    docash: function() {
        var t = this, a = this.data.nowmoney, e = this.data.fee, o = this.data.leastmon, n = this.data.tixian;
        1 <= a ? parseFloat(a) <= parseFloat(e) && (parseFloat(a) >= parseFloat(o) ? (t.setData({
            cashing: !1
        }), app.util.request({
            url: "entry/wxapp/gotocost",
            method: "post",
            dataType: "json",
            data: {
                openid: app.globalData.uid,
                nickname: app.globalData.userInfo.nickname,
                avatar: app.globalData.userInfo.avatar,
                nowmoney: a,
                tixian: n
            },
            success: function(a) {
                a.data.result ? (wx.showToast({
                    title: a.data.msg,
                    icon: "success",
                    duration: 2e3
                }), t.setData({
                    fee: a.data.fee,
                    cashing: !0,
                    nowmoney: ""
                })) : wx.showToast({
                    title: a.data.msg,
                    icon: "none",
                    duration: 2e3
                });
            }
        })) : wx.showModal({
            content: "最少提现金额为" + o + "元",
            showCancel: !1,
            success: function(a) {
                a.confirm && t.setData({
                    cashing: !0,
                    nowmoney: ""
                });
            }
        })) : wx.showModal({
            content: "每次提现账户余额需大于1元",
            showCancel: !1,
            success: function(a) {
                a.confirm && t.setData({
                    cashing: !0,
                    nowmoney: ""
                });
            }
        });
    },
    yelist: function() {
        wx.navigateTo({
            url: "details"
        });
    },
    tslist: function() {
        wx.navigateTo({
            url: "tlist"
        });
    }
});