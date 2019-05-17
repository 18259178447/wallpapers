var t = getApp(), 
e = !0, 
n = 0, //点击次数
i = !0, //isLoading
s = {}, 
g = null, //this
o = !1,
isTip = false;

Page({
  isShow: !1,
  data: {
    list: [],
    waggleFn: "waggle",
    waggleClass: "",
    pointerStyle: "",
    pointerIndex: 0,
    tqMove: "",
    tqImg1: "",
    tqImg2: "",
    tqImg3: "",
    shareStyle: "",
    gXiangStle: "",
    gXiang: "",
    hide: !0,
    hideShare: "display:none;"
  },
  changeData: function (t, a, e, n, i) {
    var s = {};
    s[t + "[" + a + "]." + e] = n, this.setData(s);
  },
  onLoad: function (options) {
    o = !1, 
    g = this;
    var s = options.key || "求名";
    n = 0, i = !0;
    wx.request({
      url: "https://xcx.tiexue.net/api/zhouyi?category=" + s,
      success: function (a) {
        t.guaData = a.data.body, t.guaData.gXiang = a.data.body.rep_main_code.split("");
        var e = new Date(), n = e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes();
        t.guaData.time = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate() + " " + e.getHours() + ":" + n + ":" + e.getSeconds();
      }
    });
    var obj = {
      shareStyle: "width:" + .85 * wx.windowWidth + "px;height:" + .85 * wx.windowWidth * .42 + "px;",
      rBtnStyle: "height:" + .6 * wx.windowWidth * .18 + "px;line-height:" + .6 * wx.windowWidth * .18 + "px;"
    }
    if (!isTip){
      obj.hideShare = '';
      isTip = true
    }
    this.setData(obj);
  },
  hideShade: function () {
    this.setData({
      hideShare: "opacity:0;"
    });
    var t = this;
    setTimeout(function () {
      t.setData({
        hideShare: "display:none;"
      }), o = !0;
    }, 500);
  },
  waggle: function (a) {
    var s = this;
    if(i){
      if (n >= 6){
        wx.redirectTo({
          url: "../result/result"
        });
        // this.setData({
        //   resultStyle: "display:-webkit-box",
        //   hide:true
        // });
      }else{
        i = false;
        var o = t.guaData.gXiang[n];
        s.setTq(o), 
        s.setData({
          waggleClass: "waggles",
          tqMove: ""
        }), 
        setTimeout(function () {
          s.setData({
            waggleClass: "",
            tqMove: "tqBoxFlash"
          }), 
          s.changeData("list", n, "txt", s.data.gXiang), 
          s.changeData("list", n, "span", s.data.gXiangStle),
          s.changeData("list", n, "p", "opacity:1");
          var t = 52 * ++n + 16;
          s.setData({
            pointerStyle: "bottom:" + t + "rpx"
          });
          if(n === 6){
            s.setData({
              pointerStyle: "display:none;"
            });
            wx.showLoading({
              title: '请稍后...',
            })
            setTimeout(function () {
              wx.hideLoading()
              // s.setData({
              //   resultStyle: "display:-webkit-box"
              // });
              wx.redirectTo({
                url: "../result/result"
              });
            }, 1300)
          }
          i = !0, e = !0;
        }, 1e3);
      }
    }
  },
  setTq: function (t) {
    if (1 == t) {
      a = ["../assets/qian1.png", "../assets/qian1.png", "../assets/qian1.png"];
      this.setData({
        gXiang: "老阳",
        gXiangStle: "gx"
      }), g.changeData("list", n, "num", "x"), Math.round(Math.random()) && (a[t = parseInt(3 * Math.random())] = "../assets/qian2.png",
        this.setData({
          gXiang: "少阳",
          gXiangStle: "gx1"
        }), g.changeData("list", n, "num", ""));
    } else {
      var a = ["../assets/qian2.png", "../assets/qian2.png", "../assets/qian2.png"];
      this.setData({
        gXiang: "老阴",
        gXiangStle: "gx"
      }), g.changeData("list", n, "num", "x"), Math.round(Math.random()) && (a[t = parseInt(3 * Math.random())] = "../assets/qian1.png",
        this.setData({
          gXiang: "少阴",
          gXiangStle: "gx1"
        }), g.changeData("list", n, "num", ""));
    }
    this.setData({
      tqImg1: a[0],
      tqImg2: a[1],
      tqImg3: a[2]
    });
  },
  close: function () {
    this.setData({
      hide: !1
    });
  },
  onReady: function () { },
  onShow: function () {
    this.isShow = !0, e = !0, wx.onAccelerometerChange(function (t) {
      if (!o) return !1;
      if (g.isShow) {
        var a = t.x, i = t.y, l = t.z;
        if (e && (Math.abs(a - s.lastX) >= 1 || Math.abs(i - s.lastY) >= 1 || Math.abs(l - s.lastZ) >= 1)) {
          if (e = !1, n >= 6) return void wx.stopAccelerometer({});
          g.waggle();
        }
        s.lastX = a, s.lastY = i, s.lastZ = l;
      }
    });
  },
  onHide: function () {
    e = !1, wx.stopAccelerometer({
      success: function () { }
    });
  },
  onShareAppMessage: function () {
    return {
      title: "周易算卦",
      path: "/pages/zhouyi/zhouyi"
    };
  }
});