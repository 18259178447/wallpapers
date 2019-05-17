var t = getApp();

Page({
  data: {
    name: "",
    sexy: "男",
    qrCode: "../../assets/my2019/qrcode.jpg"
  },
  onLoad: function () { },
  // onShow: function () {
  //   var t = this;
  //   wx.downloadFile({
  //     url: "https://static.yjbys.com/img/miniapp/tuodanceshi/wjs/logos_1.png?date=" + new Date(),
  //     success: function (e) {
  //       t.setData({
  //         qrCode: e.tempFilePath
  //       });
  //     }
  //   });
  // },
  changeValue: function (t) {
    this.setData({
      name: t.detail.value
    });
  },
  changeV: function (t) {
    this.setData({
      sexy: t.detail.value
    });
  },
  draw: function (e) {
    if ("" != this.data.name) {
      var a = this;
      "getUserInfo:fail auth deny" != e.detail.errMsg ? (wx.showLoading({
        title: "结果生成中"
      }), wx.request({
        url: "https://app.unjs.com/app_phpv2/tuodanceshi/wjs/?",
        data: {
          appname: "wjs",
          name: a.data.name,
          gender: "男" == a.data.sexy ? "boy" : "girl"
        },
        success: function (i) {
        wx.downloadFile({
          url: e.detail.userInfo.avatarUrl.replace("/132", "/0"),
            success: function (e) {
              console.log(e.tempFilePath);
              var o = wx.createCanvasContext("myCanvas");
              o.drawImage("../../assets/my2019/five_mb.png", 0, 0, 340, 500), o.save(), o.beginPath(), o.arc(170, 48, 29, 0, 2 * Math.PI),
                o.clip(), o.drawImage(e.tempFilePath, 141, 19, 58, 58), o.restore(), o.setFontSize(15),
                o.setFillStyle("#302e2e"), o.setTextAlign("center"), o.fillText(a.data.name, 170, 98),
                o.setFontSize(19), o.setFillStyle("#000"), o.setTextAlign("left"), o.fillText(i.data.list.detail[0], 64, 174),
                o.fillText(i.data.list.detail[1], 64, 218), o.fillText(i.data.list.detail[2], 64, 264),
                o.fillText(i.data.list.detail[3], 64, 307), o.fillText(i.data.list.detail[4], 64, 351),
                !t.globalData.flag && (o.drawImage(a.data.qrCode, 34, 380, 70, 70), o.setFontSize(13),
                  o.setFillStyle("#1e1e1e"), o.fillText("长按识别二维码", 110, 408), o.setFontSize(12), o.setFillStyle("#222222"),
                  o.fillText("测试你2019年会发生的五件事", 110, 434)), o.draw(!1, function () {
                    var t = this;
                    setTimeout(function () {
                      wx.canvasToTempFilePath({
                        canvasId: "myCanvas",
                        success: function (t) {
                          console.log(t.tempFilePath), wx.navigateTo({
                            url: "/pkgtime/result/result?url=" + t.tempFilePath,
                            success: function () {
                              wx.hideLoading();
                            }
                          });
                        }
                      }, t);
                    }, 1e3);
                  });
            }
          });
        },
        fail: function () {
          wx.hideLoading(), wx.showModal({
            title: "提示",
            content: "服务器繁忙，请稍后再试"
          });
        }
      })) : wx.showModal({
        title: "提醒",
        content: "授权后才能继续使用小程序",
        showCancel: !1
      });
    } else wx.showToast({
      title: "请输入姓名",
      icon: "none"
    });
  },
  onShareAppMessage: function (t) {
    return {
      title: "快来测测，你2019年会发生的五件事是什么~",
      path: "/pages/my2019/my2019",
      imageUrl: "../../assets/my2019/share_pic.png"
    };
  }
});