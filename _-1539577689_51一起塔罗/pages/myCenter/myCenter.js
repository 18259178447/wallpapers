var e = getApp();

Page({
    data: {
        userInfo: ""
    },
    selectGo: function(e) {
        switch (e.target.dataset.id) {
          case "1":
            wx.navigateTo({
                url: "/pages/myCenter/mytopic/mytopic"
            });
            break;

          case "2":
            wx.navigateTo({
                url: "/pages/myCenter/we/we"
            });
            break;

          case "3":
            wx.navigateTo({
                url: "/pages/myCenter/more/more"
            });
        }
    },
    goAll: function() {
        wx.redirectTo({
            url: "/pages/all/all"
        });
    },
    goIndex: function() {
        wx.redirectTo({
            url: "/pages/index/index"
        });
    },
    onLoad: function(n) {
        this.setData({
            userInfo: e.wxInfo
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