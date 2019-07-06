var a = getApp();

Page({
    data: {
        list: [],
        aid: "wxd4085def32037f5b",
        guang: !0
    },
    goTo: function(a) {
        var t = a.currentTarget.dataset.appid;
        wx.navigateToMiniProgram({
            appId: t
        });
    },
    onLoad: function(t) {
        var n = this;
        wx.request({
            url: a.yu + "/index.php/Index/getmore",
            method: "POST",
            header: {
                "Content-type": "appliaction/json"
            },
            data: {
                secert: a.secert
            },
            success: function(a) {
                console.log(a.data), a.data.data = JSON.parse(a.data.data), console.log(a.data.data), 
                n.setData({
                    list: a.data.data.data
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