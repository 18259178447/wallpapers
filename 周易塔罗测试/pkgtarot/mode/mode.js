require("../../utils/tarot/config"), function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
  t.default = e;
}(require("../../utils/tarot/tool"));

Page({
  data: {},
  onShareAppMessage: function () {
    return {
      path: "/pages/tarot/tarot"
    };
  },
  onReady: function () {
    this.setData({
      showAnim: !0
    });
  },
  onHide: function () {
    this.setData({
      showAnim: !1
    });
  },
  selectCat: function (e) {
    getApp().selectCat = e.currentTarget.dataset.cat, wx.navigateTo({
      url: "../select/select"
    });
  }
});