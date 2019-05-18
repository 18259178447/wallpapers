var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        this.setData({
            textarr: app.globalData.textarr
        }), console.log(this.data.textarr);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    choosezf: function(t) {
        var a = getCurrentPages(), n = a[a.length - 2], e = t.currentTarget.dataset.zf;
        n.setData({
            wenben: e
        }), wx.navigateBack({
            delta: 1
        });
    }
});