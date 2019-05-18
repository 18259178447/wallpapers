Page({
    data: {},
    onLoad: function(n) {
        var o = this, t = n.img, i = app.siteInfo.siteroot;
        i = i.replace(/app\/index.php/, ""), t || (t = i + "/addons/tc_card/style/images/bgimg.jpg"), 
        wx.getSystemInfo({
            success: function(n) {
                console.log(n.windowWidth), console.log(n.windowHeight), o.setData({
                    width: n.windowWidth,
                    height: n.windowHeight,
                    bgimg: t
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