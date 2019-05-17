var t, a = getApp(), e = require("../../utils/quiz/common.js");
Page({
  data: {},
  onLoad: function (e) {
    var n = e.keyword;
    (t = this).setData({
      keyword: n
    }), wx.request({
      url: a.globalData.host + "/App/index/search/",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        q: n,
        env: a.globalData.env,
        ver: a.globalData.ver,
        appid: a.globalData.appid
      },
      success: function (a) {
        var e = a.data.content;
        t.setData({
          list: e
        });
      }
    });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  doSearch: function (t) {
    var e = t.currentTarget.dataset.keyword, n = this;
    wx.request({
      url: a.globalData.host + "/App/index/search/",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        q: e,
        env: a.globalData.env,
        ver: a.globalData.ver
      },
      success: function (t) {
        var a = t.data.content;
        n.setData({
          list: a
        });
      }
    });
  },
  bindKeyInput: function (t) {
    this.setData({
      keyword: t.detail.value
    });
  },
  playgame: function (n) {
    e.playgeme(a, t, n.currentTarget.dataset);
  },
  saveLink: function (a) {
    wx.setClipboardData({
      data: a.target.dataset.url,
      success: function (a) {
        wx.getClipboardData({
          success: function (a) {
            t.setData({
              alertbox_item0: "block",
              alertbox_item1: "none",
              alertbox_item2: "block"
            });
          }
        });
      }
    });
  },
  hideFixBox: function (a) {
    t.setData({
      alertbox_item0: "none",
      alertbox_item1: "none",
      alertbox_item2: "none"
    });
  },
  onShareAppMessage: function (t) {
    return {
      title: "快来测测，我给你找了很多有趣的测试~",
      path: this.route + '?keyword=' + this.data.keyword
    };
  }
});