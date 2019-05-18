var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        this.getdata();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    getdata: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/paylog",
            method: "post",
            dataType: "json",
            data: {
                openid: app.globalData.uid
            },
            success: function(a) {
                a.data && t.setData({
                    list: a.data
                });
            }
        });
    }
});