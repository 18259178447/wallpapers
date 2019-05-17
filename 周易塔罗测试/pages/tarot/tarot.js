!function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
  t.default = e;
}(require("../../utils/tarot/tool"));

Page({
  data: {},
  onShareAppMessage: function () {
    return {
      path: "/pages/index/index"
    };
  },
  onLoad: function () { },
  selectType: function (e) {
    getApp().selectType = e.currentTarget.dataset.type, wx.navigateTo({
      url: "/pkgtarot/mode/mode"
    });
  }
});