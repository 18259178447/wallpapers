var t = getApp();

Page({
    data: {
        searchs: [],
        current: null,
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        textareaValue: "点击下方内容输入完成后点我复制",
        newValue: [],
        activeIndex: 0,
        colordata: [ " 🇦 ", " 🇧 ", " 🇨 ", "🇩 ", "🇪 ", " 🇫 ", " 🇬 ", " 🇭 ", " 🇮 ", " 🇯 ", " 🇰 ", " 🇱 ", " 🇲 ", " 🇳 ", " 🇴 ", " 🇵 ", " 🇶 ", " 🇷 ", " 🇸 ", " 🇹 ", " 🇺 ", " 🇻 ", " 🇼 ", " 🇽 ", " 🇾  ", " 🇿" ]
    },
    onLoad: function() {},
    onShow: function() {},
    changeTab: function(t) {
        var a = t.target.dataset.index;
        this.setData({
            activeIndex: a
        });
    },
    bindKeyInput: function(t) {
        this.data.current = t.detail.value, this.setData({
            inputShowed: !0
        }), console.log(this.data.current);
    },
    clearInput: function() {
        this.data.current = null, this.setData({
            scrollTop: 0,
            inputVal: "",
            textareaValue: "点击下方内容输入完成后点我复制",
            inputShowed: !1
        });
    },
    addText: function(t) {
        if ("点击下方内容输入完成后点我复制" != this.data.textareaValue) {
            if (t.target.id) {
                var a = this.data.textareaValue + t.target.id;
                this.setData({
                    textareaValue: a
                });
            }
        } else if (t.target.id) {
            var e = t.target.id;
            this.setData({
                textareaValue: e
            });
        }
    },
    textCopy: function() {
        "点击下方内容输入完成后点我复制" != this.data.textareaValue ? (this.data.current = this.data.textareaValue, 
        wx.setClipboardData({
            data: this.data.current,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data), wx.showModal({
                            title: "提示",
                            content: "已复制到粘贴板，粘贴即可使用",
                            cancelText: "关闭",
                            confirmText: "好的",
                            success: function(t) {}
                        });
                    }
                });
            }
        })) : wx.showToast({
            title: "还没有输入内容",
            icon: "none",
            duration: 800
        });
    },
    onShareAppMessage: function(a) {
        var e = wx.getStorageSync("sk");
        return {
            title: "给你推荐《emoji表情，颜文字，特殊字符大全》",
            imageUrl: t.func.rootDocment + "share-images.jpg",
            path: "/pages/emoticon/emoticon?fopenid=" + e.openid,
            success: function(t) {
                wx.showToast({
                    title: "分享成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "分享失败",
                    icon: "loading",
                    duration: 2e3
                });
            }
        };
    }
});