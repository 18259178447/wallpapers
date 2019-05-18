var app = getApp();

Page({
    data: {
        cusmter: 0,
        gopay: 0
    },
    onLoad: function(a) {
        var t = this;
        wx.setNavigationBarTitle({
            title: "给个打赏吧！"
        }), t.moneyNum(), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#D55A48"
        }), app.login(function(a) {
            t.setData({
                user: a
            });
        }), this.setData({
            pid: a.pid,
            tid: a.openid,
            nickname: a.nickname,
            avatar: a.avatar,
            dstext: app.globalData.config.dstext
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    bindKeyInput: function(a) {
        var t = parseFloat(a.detail.value), n = 0;
        0 != t && t <= 1e3 && (n = 1), this.setData({
            money: t,
            gopay: n
        });
    },
    dopay: function(a) {
        var t = a.currentTarget.dataset.num, n = this;
        this.data.money || this.setData({
            money: t
        }), app.util.request({
            url: "entry/wxapp/pay",
            data: {
                openid: app.globalData.uid,
                cost: n.data.money,
                tid: n.data.tid,
                pid: n.data.pid,
                nickname: n.data.nickname,
                avatar: n.data.avatar,
                tnickname: app.globalData.userInfo.nickname
            },
            success: function(t) {
                t.data && wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: "MD5",
                    paySign: t.data.paySign,
                    success: function(a) {
                        wx.showToast({
                            title: "支付成功",
                            icon: "none",
                            duration: 3e3,
                            success: function() {
                                n.tosave(t.data.out_trade_no);
                            }
                        });
                    },
                    fail: function(a) {
                        wx.showToast({
                            title: "支付失败",
                            icon: "none",
                            duration: 2e3,
                            success: function() {
                                n.setData({
                                    money: 0,
                                    gopay: 0,
                                    cusmter: 0
                                });
                            }
                        });
                    }
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "系统提示",
                    content: "支付出错",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                });
            }
        });
    },
    cusmter: function(a) {
        this.setData({
            cusmter: 1
        });
    },
    closealert: function() {
        this.setData({
            cusmter: 0,
            money: 0
        });
    },
    tosave: function(a) {
        var t = app.globalData.userInfo.openid;
        app.util.request({
            url: "entry/wxapp/payresult",
            method: "post",
            dataType: "json",
            data: {
                openid: t,
                trade_no: a
            },
            success: function(a) {
                wx.showToast({
                    title: "打赏成功",
                    icon: "none",
                    duration: 3e3,
                    success: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        });
    },
    moneyNum: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/moneynum",
            method: "post",
            dataType: "json",
            success: function(a) {
                t.setData({
                    moneys: a.data.numarr,
                    paycon: a.data.con
                });
            }
        });
    }
});