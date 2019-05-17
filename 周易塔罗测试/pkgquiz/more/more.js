var t, a = getApp(), e = require("../../utils/quiz/common.js"), o = 1, n = [], c = !0;

Page({
  data: {},
  onLoad: function (c) {
    o = 1, t = this, wx.request({
      url: a.globalData.host + "/App/index/getPageData/order/top desc,utime/rcmd/1/pageIndex/" + o,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        env: a.globalData.env,
        ver: a.globalData.ver,
        appid: a.globalData.appid
      },
      success: function (a) {
        console.log(a.data), n = a.data, t.setData({
          list: n
        }), o++;
      }
    }), e.checkPush(a, t, c);
  },
  playgame: function (o) {
    e.playgeme(a, t, o.currentTarget.dataset);
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onReachBottom: function () {
    if (c) {
      c = !1;
      var t = this;
      wx.request({
        url: a.globalData.host + "/App/index/getPageData/order/top desc,utime/rcmd/1/pageIndex/" + o,
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          env: a.globalData.env,
          ver: a.globalData.ver
        },
        success: function (a) {
          n = n.concat(a.data), console.log(n), t.setData({
            list: n
          }), o++ , c = !0;
        }
      });
    }
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
      title: "快来测测，我给你找了很多有趣的测试~"
    };
  }
});