var t = getApp(), e = null;

var centerX = 0,
    centerY = 0,
    sDeg = 0,
    eDeg = 0,
    oDeg = 0;

function pageXY(touch){
  return {
    x: touch.pageX - centerX,
    y: touch.pageY - centerY
  };
}
function transfromDeg(x, y) {
  return -Math.atan2(y, x) / Math.PI * 180;
}

Page({
  data: {
    wHeight: wx.windowHeight,
    rotate: "transform:rotate(0deg);",
    deg: 0,
    sDeg: 0,
    eDeg: 0,
    taTime: "0s",
    oDeg: 0,
    oX: 0,
    oY: 0,
    keyName: ""
  },
  onLoad: function (options) {
    wx.createSelectorQuery().select("#circleIn").boundingClientRect((res)=>{
      centerX = res.left + res.width / 2;
      centerY = res.top + res.height / 2;
    }).exec();
  },
  touchstart: function (e) {
    var touch = e.touches[0];
    sDeg = transfromDeg(pageXY(touch).y, pageXY(touch).x);
  },
  touchmove: function (e) {
    var touch = e.touches[0];
    eDeg = transfromDeg(pageXY(touch).y, pageXY(touch).x);
    var deg = oDeg + eDeg - sDeg;
    this.setData({
      deg: deg
    });
  },
  touchend: function () {
    oDeg = oDeg + eDeg - sDeg;
    var t = parseInt(oDeg / 20);
    Math.abs(oDeg % 20) >= 10 && (oDeg <= 0 ? t-- : t++);
    var deg = 20 * t;
    this.setData({
      deg: deg,
      oDeg: deg,
      taTime: "0.5s"
    }), 
    setTimeout(()=>{
      this.setData({
        taTime: "0s"
      });
    }), this.getKeys(deg);
  },
  getKeys: function (deg) {
    deg = deg % 360 / 20;
    var keyNames = ["求名", "求官", "儿女", "运势", "婚姻", "事业", "考试", "寻人", "开业", "家运", "疾病", "求职", "经商", "升学", "财运", "出行", "决策", "恋爱"];
    deg = deg < 0 ? keyNames.length - Math.abs(deg) : deg, 
    this.setData({
      keyName: keyNames[deg]
    });
  },
  beginTest: function () {
    var keyName = this.data.keyName;
    "" == keyName && (keyName = "求名");
    wx.navigateTo({
      url: "/pkgzhouyi/translate/translate?key=" + keyName
    });
  },
  onShareAppMessage: function () {
    return {
      title: "周易测卦",
      path: "/pages/zhouyi/zhouyi"
    };
  }
});