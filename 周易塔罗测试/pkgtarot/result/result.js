var t = require("../../utils/tarot/config"), e = function (t) {
  if (t && t.__esModule) return t;
  var e = {};
  if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
  return e.default = t, e;
}(require("../../utils/tarot/tool"));

Page({
  data: {
    resultData: []
  },
  onShareAppMessage: function () {
    return {
      path: "/pages/tarot/tarot"
    };
  },
  onLoad: function (a) {
    var p = this, r = a.type || 1, i = a.cat || 1, n = a.pai || "1,2,3,11", o = a.pos || "1,1,0,1";
    e.getRequest(t.apiUrl.taluopai, {
      type: r,
      cat: i,
      pai: n,
      pos: o
    }).then(function (t) {
      wx.hideToast();
      for (var e = [], a = n.split(","), s = o.split(","), u = 0, l = a.length; u < l; u++) {
        var c = getApp().tlpData[a[u] - 1];
        c.pos = s[u], c.result = t.data[u], c.tip = getApp().tpiTip[i - 1][u], e.push(c);
      }
      p.setData({
        type: r,
        resultData: e
      });
    });
  },
  getResult: function () { }
});