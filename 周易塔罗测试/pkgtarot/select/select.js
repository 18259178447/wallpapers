require("../../utils/tarot/config"), function (t) {
  if (t && t.__esModule) return t;
  var a = {};
  if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (a[e] = t[e]);
  a.default = t;
}(require("../../utils/tarot/tool"));

var t = "", a = [4, 7, 5, 3, 4];

Page({
  data: {
    toResultData: {
      type: 1,
      cat: 1,
      pai: "",
      pos: ""
    },
    refreshAnim: !1,
    selectCardTotal: 5,
    allCard: [],
    removeIndex: "",
    selectCard: []
  },
  onShareAppMessage: function () {
    return {
      path: "/pages/tarot/tarot"
    };
  },
  onLoad: function (t) {
    var e = this, r = e.data.toResultData;
    r.type = getApp().selectType || r.type, r.cat = getApp().selectCat || r.cat, e.setData({
      allCard: e.getCardArr(),
      toResultData: r,
      selectCardTotal: a[r.cat - 1]
    }), setTimeout(function () {
      wx.showModal({
        title: "提示",
        content: "抽牌时请在心中默念需要解答的问题",
        showCancel: !1
      });
    }, 2e3);
  },
  onShow: function () {
    this.setData({
      showAnim: !0
    });
  },
  getCardArr: function () {
    for (var t = [], a = 0; a < 22; a++) t.push({
      num: a + 1,
      sel: !1
    });
    for (var e = t.length - 1; e >= 0; e--) {
      var r = Math.floor(Math.random() * (e + 1)), o = t[r];
      t[r] = t[e], t[e] = o;
    }
    return t;
  },
  cardSelect: function (a) {
    var e = this;
    if (!(new Date().getTime() <= t + 500)) if (t = new Date().getTime(), e.data.selectCard.length >= e.data.selectCardTotal) wx.showModal({
      title: "提示",
      content: "您已经选择了" + e.data.selectCardTotal + "张卡牌了，可以点击查看分析",
      showCancel: !1
    }); else {
      var r = a.currentTarget.dataset.cardnum, o = a.currentTarget.dataset.index, l = e.data.allCard, s = e.data.selectCard;
      e.setData({
        removeIndex: r
      }), setTimeout(function () {
        l[o].sel = !0, s.push(r), e.setData({
          selectCard: s,
          allCard: l
        });
      }, 300);
    }
  },
  refreshCard: function () {
    var t = this;
    t.setData({
      showAnim: !1
    }), setTimeout(function () {
      t.setData({
        showAnim: !0,
        allCard: t.getCardArr(),
        selectCard: [],
        removeIndex: ""
      });
    }, 100);
  },
  toResult: function () {
    var t = this;
    if (t.data.selectCard.length < t.data.selectCardTotal) wx.showModal({
      title: "提示",
      content: "您还需要选择" + (t.data.selectCardTotal - t.data.selectCard.length) + "张卡牌了，才可查看分析",
      showCancel: !1
    }); else {
      var a = t.data.toResultData;
      a.pai = t.data.selectCard.toString();
      for (var e = [], r = 0; r < t.data.selectCardTotal; r++) e[r] = Math.random() > .5 ? 1 : 0;
      a.pos = e.toString(), wx.reLaunch({
        url: "../result/result?type=" + a.type + "&cat=" + a.cat + "&pai=" + a.pai + "&pos=" + a.pos
      });
    }
  }
});