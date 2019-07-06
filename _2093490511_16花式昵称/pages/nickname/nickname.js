var t = require("../../B051462325CA1DDFD6372E2421EB28B0.js"), a = getApp();

Page({
    data: {
        // unitid: a.globalData.unitid,
        searchs: [],
        current: null,
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        textareaValue: "生成后点我复制",
        newValue: [],
        nickdata: []
    },
    onLoad: function() {
        this.setData({
            nickdata: t
        });
    },
    onShow: function() {},
    bindKeyInput: function(t) {
        this.data.current = t.detail.value, this.setData({
            inputShowed: !0
        });
    },
    clearInput: function() {
        this.data.current = null, this.setData({
            scrollTop: 0,
            inputVal: "",
            textareaValue: "",
            inputShowed: !1
        });
    },
    changeText: function(t) {
        if (this.data.current) {
            if (t.target.id) {
                var a = t.target.id.replace(/昵称/, this.data.current);
                this.setData({
                    textareaValue: a
                });
            }
        } else wx.showToast({
            title: "昵称不能为空",
            icon: "none",
            duration: 800
        });
    },
    textCopy: function() {
        "生成后点我复制" != this.data.textareaValue ? wx.setClipboardData({
            data: this.data.textareaValue,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                        var a = t.data;
                        wx.showModal({
                            title: "提示",
                            content: "已复制到粘贴板，粘贴即可使用",
                            cancelText: "好的",
                            confirmText: "收藏",
                            success: function(t) {
                                if (t.confirm) {
                                    var e = wx.getStorageSync("cache_key"), n = e + "," + a;
                                    wx.setStorageSync("cache_key", n), console.log(wx.getStorageSync("cache_key")), 
                                    wx.showToast({
                                        title: "收藏成功",
                                        icon: "success",
                                        duration: 2e3
                                    }), console.log(e);
                                }
                            }
                        });
                    }
                });
            }
        }) : wx.showToast({
            title: "还没有生成昵称",
            icon: "none",
            duration: 800
        });
    },
    onShareAppMessage: function(t) {
        return {
          title: "给你推荐《QQ个性昵称生成器》",
            path: this.route,
        };
    }
});