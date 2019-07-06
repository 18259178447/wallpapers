var t = getApp();

Page({
    data: {
        cdn: t.globalData.cdn,
        host: t.globalData.host,
        user: {},
        showPop: !1
    },
    onLoad: function() {
        this.setData({
            user: t.globalData.userInfo
        });
    },
    jumptolove: function() {
        wx.navigateTo({
            url: "/pages/loves/index"
        });
    },
    jumptoindex: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    jumptomine: function() {
        wx.navigateTo({
            url: "/pages/mine/index"
        });
    },
    bindFormSubmit: function(e) {
        var o = e.detail.value.textarea, a = this;
        o && wx.request({
            url: a.data.host + "/userSuggestion",
            method: "POST",
            data: {
                suggestion: o
            },
            header: {
                Authorization: t.globalData.token
            },
            success: function(t) {
                wx.showToast({
                    title: "您的问题提交成功",
                    icon: "success",
                    duration: 2e3,
                    success: function() {
                        return a.close();
                    }
                });
            }
        });
    },
    openPop: function() {
        this.setData({
            showPop: !0
        });
    },
    close: function() {
        this.setData({
            showPop: !1
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "最热门的情侣头像都在这",
            imgUrl: this.data.cdn + "/logo.png"
        };
    }
});