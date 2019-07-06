var t = getApp();

Page({
    data: {
        // unitid: t.globalData.unitid
    },
    onLoad: function() {},
    onShow: function() {},
    copyAndroid: function(t) {
        wx.setClipboardData({
            data: "ㅤ",
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data), wx.showToast({
                            title: "已复制到粘贴板，粘贴即可使用",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    },
    copyIos: function(t) {
        wx.setClipboardData({
            data: "",
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data), wx.showToast({
                            title: "已复制到粘贴板，粘贴即可使用",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        return {
          title: "空白昵称，空白签名",
          path: this.route
        };
    }
});