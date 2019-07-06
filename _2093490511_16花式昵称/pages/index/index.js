var t = getApp();

Page({
    data: {
        // unitid: t.globalData.unitid,
        swiperlist: [],
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        linklist: []
    },
    ToMini: function(t) {
        wx.navigateToMiniProgram({
            appId: t.currentTarget.id,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(t) {}
        });
    },
    onLoad: function(n) {
        var i = this;
        // t.func.getReq("slide/lists", function(t) {
        //     var n = t.data, a = i.data.swiperlist;
        //     i.setData({
        //         swiperlist: a.concat(n.list)
        //     });
        // });
    },
    onLaunch: function() {},
    onShow: function() {},
    onReachBottom: function() {},
    onPullDownRefresh: function() {},
    onShareAppMessage: function(n) {
        return {
            title: "送你一份《个性昵称大全》"
        };
    }
});