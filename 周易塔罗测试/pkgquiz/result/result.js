function t(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}

function e(t, e) {
  var n = wx.getSystemInfoSync();
  t / e >= n.windowWidth / n.windowHeight ? c.setData({
    resultimgstyle: "maxwidth",
    resultbtnstyle: "white",
    hidepng: "block"
  }) : c.setData({
    resultimgstyle: "maxheigth",
    resultbtnstyle: "gray",
    hidepng: "block"
  });
}

function n() {
  setTimeout(function () {
    c.setData({
      savetipstyle: "none"
    });
  }, 1500);
}

function o() {
  (f = !1) && (wx.request({
    url: l.globalData.host + "/wetest/entry/inclongtap/gid/" + s + "/result/" + d + "/uid/0/account/" + w,
    data: {
      gid: s,
      type: 2
    },
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (t) {
      f = !1;
    }
  }), wx.reportAnalytics("save_img", {
    gid: s
  }));
}

var i, a, s, c, u, l = getApp(), r = require("../../utils/quiz/swiper.js"), g = require("../../utils/quiz/common.js"), m = !1, f = !0, d = "", w = "", h = 1;

Page((i = {
  data: {
    savetipstyle: "none",
    saveMenuStyle: "block",
    menubg: "none",
    animationData: {},
    menustatus: "hidemenu"
  },
  onLoad: function (t) {
    t.src && (h = t.src), console.log(t), c = this, a = t.title, s = t.id, u = t.imgsrc,
      d = t.resultLeval, w = t.account, wx.setNavigationBarTitle({
        title: a,
        success: function (t) { }
      }), c.setData({
        imgsrc: u,
        gid: s,
        title: a
      });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
}, t(i, "onShareAppMessage", function (t) {
  return {
    title: a,
    path: "/pages/quiz/index?id=" + s + "&title=" + a,
    imageUrl: u
  };
}), t(i, "saveImage", function (t) {
  console.log(t.target.dataset.src);
  var e = function (e) {
    console.error(e), wx.getSetting({
      success: function (e) {
        e.authSetting["scope.writePhotosAlbum"] ? wx.showToast({
          icon: "none",
          title: "保存失败，请稍后再试"
        }) : wx.openSetting({
          success: function (e) {
            e.authSetting["scope.writePhotosAlbum"] ? u(t.target.dataset.src) : wx.showToast({
              icon: "none",
              title: "未获得授权，无法保存"
            });
          }
        });
      }
    });
  }, i = function (t) {
    wx.saveImageToPhotosAlbum({
      fail: e,
      filePath: t,
      success: function (t) {
        o(), c.setData({
          savetipstyle: "block"
        }), n(), g.incImageSave(s, 1, h, function () { });
      }
    });
  }, a = function (t) {
    /^wxfile:\/\/tmp/.test(t) ? i(t) : wx.downloadFile({
      url: t,
      success: function (t) {
        return i(t.tempFilePath);
      }
    });
  }, u = function (t) {
    a(t);
  };
  u(t.target.dataset.src);
}), t(i, "closewindow", function () {
  console.log("close"), m || (console.log("close 2"), wx.navigateBack());
}), t(i, "mytouchstart", function () {
  m = !1;
}), t(i, "showSaveMenu", function () {
  m = !0;
  var t = wx.createAnimation({
    duration: 300,
    timingFunction: "ease"
  });
  c.animation = t, t.bottom(0).step(), c.setData({
    menubg: "block",
    animationData: t.export()
  });
}), t(i, "closeSaveMenu", function () {
  m = !1;
  var t = wx.createAnimation({
    duration: 300,
    timingFunction: "ease"
  });
  c.animation = t, t.bottom("-125px").step(), c.setData({
    animationData: t.export()
  }), setTimeout(function () {
    c.setData({
      menubg: "none"
    });
  }, 300);
}), t(i, "imageLoad", function (t) {
  var n = r.imageUtil(t);
  console.log(n), e(n.imageWidth, n.imageHeight);
}), i));