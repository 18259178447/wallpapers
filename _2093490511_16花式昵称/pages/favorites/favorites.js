Page({
    data: {
        favlist: []
    },
    textCopy: function(t) {
        wx.setClipboardData({
            data: t.target.id,
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
    onShow: function() {
        var t = wx.getStorageSync("cache_key").substr(1).split(",");
        console.log(t), this.setData({
            favlist: t
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});