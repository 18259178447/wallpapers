var t = getApp();

Page({
  data: {
    url: "",
    openType: "",
    popular: []
  },
  onLoad: function (a) {
    this.setData({
      url: a.url,
      // popular: t.globalData.popular
    });
  },
  onShow: function () {
    var t = this;
    wx.getSetting({
      success: function (a) {
        !1 === a.authSetting["scope.writePhotosAlbum"] ? t.setData({
          openType: "openSetting"
        }) : t.setData({
          openType: ""
        });
      }
    });
  },
  onShareAppMessage: function (t) {
    return "button" == t.from ? {
      title: "啊，我在2019年竟会经历这些事呀~",
      path: "/pages/my2019/my2019",
      imageUrl: this.data.url
    } : {
        title: "快来测测，你2019年会发生的五件事是什么~",
        path: "/pages/my2019/my2019",
        imageUrl: "../../assets/my2019/share_pic.png"
      };
  },
  save: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.url,
      success: function (a) {
        t.globalData.flag ? wx.showToast({
          title: "已保存到相册\r\n请进入朋友圈从相册分享",
          icon: "none"
        }) : wx.showToast({
          title: "已保存到相册",
          icon: "none"
        });
      }
    });
  },
  back: function () {
    wx.navigateBack({});
  }
});