var n = getApp();

Page({
    data: {
        result: {}
    },
    onLoad: function(o) {
        this.setData({
            result: n.globalData.card,
            yu: n.yu
        }), console.log(this.data.result);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});