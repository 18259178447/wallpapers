Page({
    data: {},
    onLoad: function(n) {
        var o = unescape(n.url);
        this.setData({
            url: o
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});