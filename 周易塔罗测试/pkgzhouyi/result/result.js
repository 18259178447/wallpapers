function a(a, e, t) {
  return e in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}

var e = getApp(), t = e.winInfo;

Page({
  data: {
    topStyle: "",
    topTxt: e.guaData.rep_wenwangjiegua,
    resTime: "",
    resThing: "",
    gxBanner: "",
    rLiushen: []
  },
  onLoad: function (n) {
    var i, r = this;
    console.log(e.guaData.rep_change_xuanji, e.guaData.rep_change_ci), this.setData((i = {
      resThing: e.guaData.rep_category,
      resTime: e.guaData.time,
      topTxt: e.guaData.rep_wenwangjiegua,
      resGz: e.guaData.rep_year_branch + " " + e.guaData.rep_month_branch + " " + e.guaData.rep_day_branch
    }, a(i, "resThing", e.guaData.rep_category), a(i, "rLiushen", r.getLiuShen()), a(i, "mExplain", [{
      text: e.guaData.rep_name
    }, {
      text: e.guaData.rep_main_ci
    }, {
      text: e.guaData.rep_main_yi
    }, {
      text: e.guaData.rep_main_xuanji
    }, {
      text: e.guaData.rep_zhouyi
    }]), a(i, "cExplain", [{
      text: e.guaData.rep_change_name
    }, {
      text: e.guaData.rep_change_ci
    }, {
      text: e.guaData.rep_change_yi
    }, {
      text: e.guaData.rep_change_xuanji
    }]), a(i, "topStyle", "width:100%;height:" + .9 * wx.windowWidth + "px"), a(i, "gxBanner", "width:60%;height:" + .6 * wx.windowWidth * .16 + "px;"),
      a(i, "btnStyle", "height:" + .8 * wx.windowWidth * .13 + "px;"), i)), wx.stopAccelerometer({
        success: function (a) {
          console.log("取消真情1");
        }
      });
  },
  anew: function () {
    wx.reLaunch({
      url: "/pages/zhouyi/zhouyi"
    });
  },
  getLiuShen: function () {
    for (var a = [], t = ["one", "two", "three", "four", "five", "six"], n = e.guaData.gXiang.reverse(), i = 0; i < 6; i++) a.push({
      shen: e.guaData["rep_" + t[i] + "_god"],
      span: "xg" + n[i],
      text: e.guaData["rep_main_" + t[i] + "_dear"] + e.guaData["rep_main_" + t[i] + "_shiying"],
      span2: "xg" + Math.abs(n[i] - 1),
      text2: e.guaData["rep_change_" + t[i] + "_dear"] + e.guaData["rep_change_" + t[i] + "_shiying"]
    });
    return a;
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      title: "我为自己算了一卦，好准！",
      path: "/pages/zhouyi/zhouyi"
    };
  }
});