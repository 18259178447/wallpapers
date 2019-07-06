var n = getApp();

Page({
    data: {
        list: {}
    },
    join: function() {
        wx.navigateTo({
            url: "/pages/zhao/zhao"
        });
    },
    more: function() {
        wx.navigateTo({
            url: "/pages/more/more"
        });
    },
    onLoad: function(o) {
        var t = this;
        wx.request({
            url: n.yu + "/index.php/Index/about",
            data: {
                secert: n.secert
            },
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            success: function(o) {
                console.log(o), t.setData({
                    list: o.data.data.about,
                    yu: n.yu
                });
            }
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