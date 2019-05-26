var app = new getApp();

Page({
    data: {
        src: ""
    },
    onLoad: function(t) {
        var e = t.src;
        this.setData({
            src: e
        }), this.videoContext = wx.createVideoContext("myVideo", this), app.util.setNavColor(app.siteInfo.uniacid);
    },
    onHide: function() {
        this.videoContext.pause();
    }
});