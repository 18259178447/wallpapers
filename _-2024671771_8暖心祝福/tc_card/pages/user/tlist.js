var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        this.getdata();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    getdata: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/txlog",
            method: "post",
            dataType: "json",
            data: {
                openid: app.globalData.uid
            },
            success: function(t) {
                t.data && a.setData({
                    list: t.data
                });
            }
        });
    }
});