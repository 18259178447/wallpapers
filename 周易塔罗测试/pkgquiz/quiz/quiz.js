function t() {
  lt = 1, st = "", it = 0, w = "", y = "", v = "", O = [], N = "", k = 0, C = 0, J = [],
    P = [], A = [], j = 0, b = "", F = 1, L = 0, U = 0, D = "", B = "", H = 0, R = 0,
    G = "1", Z = "", $ = "", K = 0, V = "", X = 0, Y = [], tt = 1, nt = 0, ct = {},
    rt = 0;
}

function e(t, e, n, s) {
  wx.showLoading({
    title: "正在分析结果"
  });
  var c = 0,
    r = 5,
    l = setInterval(function () {
      c++;
    }, 1e3),
    d = setInterval(function () {

    }, 1e3),
    u = 0;
  try {
    u = Q ? 1 : 4;
  } catch (t) {
    u = 0;
  }
  var g = {
    id: e,
    option: n,
    quizfrom: "wxapp",
    phonetype: u,
    acid: R,
    src: ot,
    ver: I.globalData.ver,
    isreplay: nt,
    appid: I.globalData.appid,
    source: I.globalData.source
  };
  "object" === (void 0 === g ? "undefined" : q(g)) && (g = function (t) {
    var e = "";
    for (var a in t) e += a + "=" + t[a] + "&";
    return e;
  }(g)), wx.request({
    url: t,
    method: "post",
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: g,
    success: function (t) {
      if (wx.hideLoading(), console.log(t), 200 == t.statusCode) {
        var n = JSON.parse(t.data.content), s = JSON.parse(t.data.attention), u = JSON.parse(t.data.total);
        rt ? o(n, s, u) : u.length >= 4 && u.length <= 6 && it ? i(n, s, u) : (n.qrcode = s,
          H = s.account, G = n.threshold, clearInterval(l), c < r ? a(n, r -= c) : a(n, 0));

      } else clearInterval(d), clearInterval(l), f(xhr.status + " " + type);
    },
    fail: function (t, e) {
      clearInterval(d), clearInterval(l), f(t.status + " " + e);
    }
  });
}

function a(t, e) {
  console.log(t, e, 898989)
  setTimeout(function () {
    C++ , O = O.concat({
      type: 1,
      text: "正在为你分析结果...",
      domindex: C
    }), S.setData({
      content: O
    }), S.setData({
      scrollview: "index-" + C
    });



    d(t, "", e);
  }, 500);
}

function n(t) {
  wx.clearStorage("quizshare_showcallback_" + _), C++;
  var e = "https://ssl-uploads-admin.cdn.itwlw.com/" + t.img, a = "https://ssl-uploads-admin.cdn.itwlw.com/" + t.qrcode;
  B = e, console.log(B);
  var n = wx.getStorageSync("quiz_result_image_preload");
  n || ((n = {}).gid = _, n.data = JSON.stringify({}), n = JSON.stringify(n));
  var o = JSON.parse(n), i = JSON.parse(o.data);
  i[e] ? (console.log(i[e]), O = O.concat({
    type: 4,
    src: i[e],
    domindex: C
  }), S.setData({
    content: O
  }), S.setData({
    scrollview: "index-" + C
  }), C++ , g(i[e]), S.setData({
    content: O
  }), S.setData({
    scrollview: "index-" + C
  }), S.setData({
    btns: [{
      type: 2
    }],
    clickflag: "",
    btnstatus: !0,
    btnboxstyle: ""
  })) : wx.getImageInfo({
    src: e,
    success: function (t) {
      S.setData({
        canvas_height: t.height
      });
      var n = t.path, s = t.height, c = wx.createCanvasContext("firstCanvas");
      c.drawImage(n, 0, 0, 640, s), c.draw(!0), wx.getImageInfo({
        src: a,
        success: function (t) {
          c.drawImage(t.path, 0, s - 128, 640, 128), c.draw(!0), setTimeout(function () {
            wx.canvasToTempFilePath({
              canvasId: "firstCanvas",
              success: function (t) {
                console.log(t.tempFilePath), O = O.concat({
                  type: 4,
                  src: t.tempFilePath,
                  domindex: C
                }), i[e] = t.tempFilePath, o.data = JSON.stringify(i), wx.setStorageSync("quiz_result_image_preload", JSON.stringify(o)),
                  S.setData({
                    content: O
                  }), S.setData({
                    scrollview: "index-" + C
                  }), C++ , g(t.tempFilePath), S.setData({
                    content: O
                  }), S.setData({
                    scrollview: "index-" + C
                  }), S.setData({
                    btns: [{
                      type: 6
                    }],
                    clickflag: "",
                    btnstatus: !0,
                    btnboxstyle: ""
                  });
              },
              fail: function (t) {
                console.log(t);
                var a = n;
                O = O.concat({
                  type: 4,
                  src: a,
                  domindex: C
                }), i[e] = a, o.data = JSON.stringify(i), wx.setStorageSync("quiz_result_image_preload", JSON.stringify(o)),
                  S.setData({
                    content: O
                  }), S.setData({
                    scrollview: "index-" + C
                  }), C++ , g(t.tempFilePath), S.setData({
                    content: O
                  }), S.setData({
                    scrollview: "index-" + C
                  }), S.setData({
                    btns: [{
                      type: 6
                    }],
                    clickflag: "",
                    btnstatus: !0,
                    btnboxstyle: ""
                  });
              }
            });
          }, 700);
        }
      });
    }
  });
}

function o(t, e, a) {
  wx.setStorageSync("quizshare_gid", _), wx.setStorageSync("quizshare_title", D),
    wx.setStorageSync("quizshare_result", t), wx.setStorageSync("quizshare_total", a),
    wx.setStorageSync("quizshare_qrcode", e.qrcode), C++ , O = O.concat({
      type: 1,
      text: "正在为你分析结果...",
      domindex: C
    }), S.setData({
      content: O
    }), S.setData({
      scrollview: "index-" + C,
      fixbox_container: "none"
    }), setTimeout(function () {
      S.setData({
        btns: [{
          type: 5
        }],
        btnstatus: !0,
        clickflag: "",
        btnboxstyle: ""
      });
      wx.navigateTo({
        url: "../quizshare/text"
      });
      var a = "https://ssl-uploads-admin.cdn.itwlw.com/" + t.img, n = "https://ssl-uploads-admin.cdn.itwlw.com/" + e.qrcode;
      console.log(a), console.log(n), wx.getImageInfo({
        src: a,
        success: function (t) {
          wx.getImageInfo({
            src: n,
            success: function (t) { }
          });
        }
      }), S.setData({
        scrollview: "index-" + C,
        fixbox_container: "none"
      });
    }, 1500);
}

function i(t, e, a) {
  wx.setStorageSync("quizshare_gid", _), wx.setStorageSync("quizshare_title", D),
    wx.setStorageSync("quizshare_result", t), wx.setStorageSync("quizshare_total", a),
    wx.setStorageSync("quizshare_qrcode", e.qrcode), C++ , O = O.concat({
      type: 1,
      text: "正在为你分析结果...",
      domindex: C
    }), S.setData({
      content: O
    }), S.setData({
      scrollview: "index-" + C,
      fixbox_container: "none"
    }), setTimeout(function () {
      C++ , O = O.concat({
        type: 7,
        text: "结果分析完毕，点击查看>",
        domindex: C
      }), S.setData({
        content: O,
        btns: [{
          type: 4
        }],
        btnstatus: !0,
        clickflag: "",
        btnboxstyle: ""
      }), S.setData({
        scrollview: "index-" + C,
        fixbox_container: "none"
      });
    }, 1500);
}

function s(t) {
  0 == t && S.setData({
    qindex: t
  });
  var e = y[t], a = S.data.obj;
  J = T.getNewQuestion(t, e, C, k, lt, I.globalData.adbannerstatus);
  3 == lt && 1 == I.globalData.adbannerstatus ? (S.setData({
    adbannerid: I.globalData.adbannerid
  }), lt++ , C++ , P = "", O = O.concat(J), a["option_" + J.domindex] = !0, setTimeout(function () {
    S.setData({
      content: O,
      btns: P,
      obj: a,
      qlength: y.length
    }), setTimeout(function () {
      S.setData({
        scrollview: "index-" + J.domindex
      });
    }, 500);
  }, 500)) : (lt++ , C++ , P = "", O = O.concat(J), a["option_" + J.domindex] = !0,
    setTimeout(function () {
      S.setData({
        content: O,
        btns: P,
        obj: a,
        qlength: y.length
      }), setTimeout(function () {
        S.setData({
          scrollview: "index-" + J.domindex
        });
      }, 200);
    }, 500));
}

function c(t) {
  if (1 == k) A = A.concat(t), l(); else if (2 == k) t = parseInt(t), j += t, A = A.concat(t),
    b == F ? l() : (s(F), F += 1); else if (3 == k) {
      var e = y[U].answer;
      for (var a in e) if (e[a].next == t) {
        if (L = e[a].next, A = A.concat(t), r(L)) return l(), void (F = b);
        F = L;
        break;
      }
      U = L -= 1, s(L);
  } else 8 == k && (A = A.concat(t), b == F ? l() : (s(F), F += 1));
}

function r(t) {
  return !!/^[a-zA-Z]+$/.test(t);
}

function l() {
  var t = v.special_result;
  console.log(t), t ? (console.log(t), S.data.userInfo ? e(W, _, A, d) : S.setData({
    btns: [{
      type: 7
    }],
    clickflag: "",
    btnstatus: !0
  })) : e(W, _, A, d);
}

function d(t, e, a) {
  console.log(t, e, a, 898989, v.special_result)
  var n = t;
  if (C++ , n.img) {
    var o = [], i = "https://ssl-uploads-admin.cdn.itwlw.com/" + n.img, s = "https://ssl-uploads-admin.cdn.itwlw.com/" + n.qrcode.qrcode;
    s = '../assets/qr.png';
    if (v.special_result) {
      var c = v.special_config;
      if (c.result_image) {
        var r = JSON.parse(c.result_image);
        console.log(r[n.threshold]), i = "https://ssl-uploads-admin.cdn.itwlw.com/" + r[n.threshold];
      }
      o.push(i), o.push(s), c.draw_config && o.push(I.globalData.host + "/Wetest/Entry/getNameImage/name/" + S.data.userInfo.nickName + "/gid/" + c.gid),
        c.headimg_config && o.push(S.data.userInfo.avatarUrl);
    } else o.push(i), o.push(s);
    B = i, console.log(B);
    var l = wx.getStorageSync("quiz_result_image_preload");
    l || ((l = {}).gid = _, l.data = JSON.stringify({}), l = JSON.stringify(l));
    var d = JSON.parse(l), g = JSON.parse(d.data);
    g[i] ? (console.log(g[i]), O = O.concat({
      type: 4,
      src: g[i],
      domindex: C
    }), u(a, g[i])) : dt(o, function (t) {
      console.log(t, 55555555);
      var e = wx.createCanvasContext("firstCanvas");
      S.setData({
        canvas_height: t[0].height
      }, function () {
        if (v.special_result) {
          var n = v.special_config;
          if (n.headimg_config) {
            var o = JSON.parse(n.headimg_config);
            n.draw_config ? e.drawImage(t[3].path, 0, 0, t[3].width, t[3].height, o.x, o.y, o.width, o.height) : e.drawImage(t[2].path, 0, 0, t[2].width, t[2].height, o.x, o.y, o.width, o.height);
          }
          console.log(n);
        }
        if (e.drawImage(t[0].path, 0, 0, 640, t[0].height), e.drawImage(t[1].path, 0, t[0].height - 128, 640, 128),
          v.special_result && n.draw_config) {
          var s = JSON.parse(n.draw_config);
          console.log(s), "center" == s.align ? (console.log(t[2], s.y), e.drawImage(t[2].path, 0, 0, t[2].width, t[2].height, (t[0].width - t[2].width) / 2, s.y, t[2].width, t[2].height)) : "right" == s.align ? e.drawImage(t[2].path, 0, 0, t[2].width, t[2].height, t[0].width - t[2].width, s.y, t[2].width, t[2].height) : "left" == s.align && e.drawImage(t[2].path, 0, 0, t[2].width, t[2].height, s.x, s.y, t[2].width, t[2].height);
        }

        e.draw(!0, function () {


          setTimeout(function () {
            wx.canvasToTempFilePath({
              canvasId: "firstCanvas",
              success: function (t) {
                console.log(t.tempFilePath), O = O.concat({
                  type: 4,
                  src: t.tempFilePath,
                  domindex: C
                }), g[i] = t.tempFilePath, d.data = JSON.stringify(g), wx.setStorageSync("quiz_result_image_preload", JSON.stringify(d)),
                  u(a - 2, g[i]);
              },
              fail: function (t) {
                console.log(t);
                var e = bgimgpath;
                O = O.concat({
                  type: 4,
                  src: e,
                  domindex: C
                }), g[i] = e, d.data = JSON.stringify(g), wx.setStorageSync("quiz_result_image_preload", JSON.stringify(d)),
                  u(a - 2, g[i]);
              }
            });
          }, 700);
        });
      });
    });
  } else O = O.concat({
    type: 1,
    text: n.desc,
    domindex: C
  }), u(a, n.desc);
}

function u(t, e) {
  t -= 3, console.log(t), t > 0 ? setTimeout(function () {
    S.setData({
      content: O
    }), S.setData({
      scrollview: "index-" + C
    }), setTimeout(function () {
      C++ , g(e), S.setData({
        content: O
      }), S.setData({
        scrollview: "index-" + C
      }), S.setData({
        btns: [{
          type: 2
        }],
        clickflag: "",
        btnstatus: !0,
        btnboxstyle: ""
      });
    }, 2e3);
  }, 1e3 * t) : (S.setData({
    content: O
  }), S.setData({
    scrollview: "index-" + C
  }), setTimeout(function () {
    C++ , g(e), S.setData({
      content: O
    }), S.setData({
      scrollview: "index-" + C
    }), S.setData({
      btns: [{
        type: 2
      }],
      clickflag: "",
      btnstatus: !0,
      btnboxstyle: ""
    });
  }, 2e3));
}

function g(t) {
  O = Q ? t ? O.concat({
    type: 5,
    text: "点击放大图片，即可长按保存你的测试结果！",
    src: t,
    domindex: C
  }) : O.concat({
    type: 1,
    text: "点击放大图片，即可长按保存你的测试结果！",
    domindex: C
  }) : t ? O.concat({
    type: 5,
    text: "点击放大图片，即可长按保存你的测试结果！",
    src: t,
    domindex: C
  }) : O.concat({
    type: 1,
    text: "点击查看大图，截图保存你的测试结果！",
    domindex: C
  });
}

function p() {
  lt = 1, A = [], j = 0, F = 1, U = 0, L = 0, s(0), S.setData({
    btnboxstyle: ""
  });
}

function f(t) {
  wx.showModal({
    title: "提示",
    content: "获取结果失败，请退出重试！",
    success: function (t) {
      t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
    }
  });
}

function x() {
  setTimeout(function () {
    S.setData({
      savetipstyle: "none"
    });
  }, 1500);
}

function m(t) {
  t.length > 4 ? S.setData({
    btnboxstyle: "scrollx"
  }) : S.setData({
    btnboxstyle: ""
  }), setTimeout(function () {
    S.setData({
      btns: t,
      clickflag: "",
      btnstatus: !0
    });
  }, 500);
}

function h(t) {
  // var e = wx.getStorageSync("quce_user_openid"), a = I.globalData.appid;
  // e ? wx.request({
  //     url: at,
  //     header: {
  //         "content-type": "application/x-www-form-urlencoded"
  //     },
  //     method: "POST",
  //     data: {
  //         gid: _,
  //         appid: a,
  //         formid: t,
  //         openid: e
  //     },
  //     success: function(t) {
  //         console.log(t);
  //     }
  // }) : wx.login({
  //     success: function(n) {
  //         n.code && wx.request({
  //             url: et,
  //             header: {
  //                 "content-type": "application/x-www-form-urlencoded"
  //             },
  //             method: "POST",
  //             data: {
  //                 code: n.code,
  //                 appid: a
  //             },
  //             success: function(n) {
  //                 e = n.data.openid, wx.setStorageSync("quce_user_openid", e), wx.request({
  //                     url: at,
  //                     header: {
  //                         "content-type": "application/x-www-form-urlencoded"
  //                     },
  //                     method: "POST",
  //                     data: {
  //                         gid: _,
  //                         appid: a,
  //                         formid: t,
  //                         openid: e
  //                     },
  //                     success: function(t) {
  //                         console.log(t);
  //                     }
  //                 });
  //             }
  //         });
  //     }
  // });
}

var
  w,
  y,
  v,
  b,
  _,
  S,
  D,
  q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
  } :
    function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    },
  I = getApp(),
  T = require("../../utils/quiz/quizfunc.js"),
  z = require("../../utils/quiz/common.js"),
  O = [],
  N = "",
  k = 0,
  C = 0,
  J = [],
  P = [], A = [], j = 0, F = 1, L = 0, U = 0, W = I.globalData.host + "/Wetest/entry/getresult", B = "", E = !0, H = 0, M = wx.getSystemInfoSync(),
  Q = new RegExp("iphone", "i").test(M.model),
  R = 0, G = "1", Z = "", $ = "", K = 0, V = "", X = 0, Y = [], tt = 1, et = I.globalData.host + "/Wxapp/CommonApi/getOpenid", at = I.globalData.host + "/Wxapp/CommonApi/saveFormId", nt = 0, ot = 14, it = 0, st = "", ct = {}, rt = 0, lt = 1;

Page({
  data: {
    savetipstyle: "none",
    canvas_height: 0,
    fixbox_container: "none",
    obj: {},
    scroll_height: "auto"
  },
  onLoad: function (e) {
    S = this, wx.getSystemInfo({
      success: function (t) {
        S.setData({
          scroll_height: t.windowHeight + "px"
        });
      }
    }), z.initChannel(I, e), t(), B = "", e.from && (st = e.from), e.src && (ot = e.src),
      E = !0, Y = [], _ = e.id, D = e.title, e.acid && (R = e.acid), wx.setNavigationBarTitle({
        title: D,
        success: function (t) { }
      }), S.setData({
        usericon: N,
        loading: !0
      }), wx.request({
        url: I.globalData.host + "/App/index/getQuizInfo",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          id: e.id,
          appid: I.globalData.appid,
          ver: I.globalData.ver,
          env: I.globalData.env
        },
        success: function (t) {
          v = t.data, y = JSON.parse(v.question), k = parseInt(v.type), A = [], j = 0, b = y.length,
            O = [], C = 0, F = 1, it = v.jumptoshare ? 1 : 0, rt = v.jumptotext ? 1 : 0, (V = T.getPreloadimglist(y))[X] && S.setData({
              preloaditem: "https://ssl-uploads-admin.cdn.itwlw.com/" + V[X]
            }), v.desc && (C++ , O = O.concat({
              type: 1,
              text: v.desc,
              domindex: C
            })), v.logo && (C++ , O = O.concat({
              type: 6,
              src: v.logo,
              domindex: C
            })), S.setData({
              loading: !1,
              content: O,
              btns: [{
                type: 1
              }],
              btnstatus: !0,
              clickflag: ""
            });
        }
      });
    var a = {};
    a.gid = _, a.data = JSON.stringify({}), wx.setStorageSync("quiz_result_image_preload", JSON.stringify(a));
  },
  onReady: function (t) {
    S.audioCtx = wx.createAudioContext("myAudio");
  },
  onShow: function (t) {
    wx.getStorage({
      key: "quizshare_showcallback_" + _,
      success: function (t) {
        console.log(t.data), 1 == t.data && wx.getStorage({
          key: "quizshare_result",
          success: function (t) {
            var e = t.data;
            e.qrcode = wx.getStorageSync("quizshare_qrcode"), n(e);
          }
        });
      }
    });
  },
  startGame: function (t) {
    console.log("startgame..."), t.currentTarget.dataset.status && (C++ , O = O.concat({
      type: 2,
      text: "开始",
      domindex: C
    }), S.setData({
      btnstatus: !1,
      clickflag: "disabled",
      btns: [{
        type: 1
      }],
      content: O
    }), setTimeout(function () {
      S.setData({
        scrollview: "index-" + C
      }), s(0);
    }, 100));
  },
  selectBtn: function (t) {
    t.currentTarget.dataset.status && (S.audioCtx.pause(), C++ , O = O.concat({
      type: 2,
      text: t.currentTarget.dataset.key,
      domindex: C
    }), S.setData({
      btnstatus: !1,
      clickflag: "disabled",
      content: O,
      audio_status: []
    }), setTimeout(function () {
      S.setData({
        scrollview: "index-" + C
      }), c(t.currentTarget.dataset.value);
    }, 1e3));
  },
  playAgain: function (t) {
    var e = t.currentTarget.dataset.status;
    nt = 1, e && (C++ , O = O.concat({
      type: 2,
      text: "再测一次",
      domindex: C
    }), S.setData({
      btnstatus: !1,
      clickflag: "disabled",
      content: O
    }), wx.reportAnalytics("quiz_replay", {
      gid: _
    }), p());
  },
  onShareAppMessage: function (t) {
    console.log("/pkgquiz/quiz/quiz?id=" + _ + "&title=" + D)
    return {
      title: D,
      path: "/pkgquiz/quiz/quiz?id=" + _ + "&title=" + D,
      imageUrl: B,
      success: function (t) {
        wx.request({
          url: I.globalData.host + "/App/index/incwxappshare",
          data: {
            gid: _,
            type: 3
          },
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (t) { }
        });
      },
      fail: function (t) { }
    };
  },
  showImage: function (t) {
    var e = t.currentTarget.dataset.src;
    wx.navigateTo({
      url: "../result/result?id=" + _ + "&title=" + D + "&imgsrc=" + e + "&account=" + H + "&resultLeval=" + G + "&src=" + ot
    });
  },
  showBigImage: function (t) {
    var e = t.currentTarget.dataset.src;
    console.log(e), wx.previewImage({
      urls: [e]
    });
  },
  imageLoad: function (t) { },
  longtaptj: function (t) {
    var e = t.currentTarget.dataset.src;
    console.log(e), wx.saveImageToPhotosAlbum({
      filePath: e,
      success: function (t) {
        S.setData({
          savetipstyle: "block"
        }), z.incImageSave(_, 2, ot, function () {
          wx.reportAnalytics("save_img", {
            gid: _
          });
        }), x(), z.incAuthorize(I, 1, 1);
      },
      fail: function (t) {
        wx.navigateTo({
          url: "/pages/quiz/images?id=" + _ + "&title=" + D + "&imgsrc=" + e + "&account=" + H + "&resultLeval=" + G + "&src=" + e
        });
      }
    });
  },
  Imageload: function (t) {
    if ("" == Z) return !0;
    var e = t.currentTarget.dataset.index;
    if (Y[e]) return console.log(Y), !0;
    if (Y[e] = !0, S.setData({
      scrollview: "index-" + $[K].domindex
    }), C = $[K].domindex, K == $.length) return m(i), !0;
    var a = $.length, n = K + 1, o = $, i = Z, s = setInterval(function () {
      n < a ? (O = O.concat(o[n].content), S.setData({
        content: O
      }), "img" == o[n].type ? (Z = i, $ = o, K = n, clearInterval(s)) : (S.setData({
        scrollview: "index-" + o[n].domindex
      }), C = o[n].domindex, ++n == a && (m(i), clearInterval(s)))) : n == a && (m(i),
        clearInterval(s));
    }, 500);
  },
  preloadimg: function (t) {
    console.log("preload" + V[X]), V[++X] && S.setData({
      preloaditem: "https://ssl-uploads-admin.cdn.itwlw.com/" + V[X]
    });
  },
  formSubmit: function (t) {
    h(t.detail.formId);
  },
  openseting: function (t) {
    wx.openSetting({
      success: function (t) {
        console.log(t);
      }
    });
  },
  jumptoshare: function () {
    var t = "../quizshare/index?from=quizresult";
    "quizshare" == st && (t = "../quizshare/index?from=shareresult"), wx.navigateTo({
      url: t
    });
  },
  jumptotext: function () {
    wx.navigateTo({
      url: "../quizshare/text"
    });
  },
  audioPlay: function (t) {
    if (S.data.audio_status && "audio_image_play" == S.data.audio_status[t.currentTarget.dataset.audioindex]) return S.audioCtx.pause(),
      S.setData({
        audio_status: []
      }), !0;
    var e = {};
    e[t.currentTarget.dataset.audioindex] = "audio_image_play", ct[t.currentTarget.dataset.audioindex] = "none",
      S.setData({
        audio_src: t.currentTarget.dataset.src,
        audio_status: e,
        reddot_status: ct
      }), setTimeout(function () {
        S.audioCtx.seek(0), S.audioCtx.play();
      }, 200);
  },
  audioend: function (t) {
    S.setData({
      audio_status: []
    });
  },
  goHome: function (t) {
    wx.switchTab({
      url: "/pages/index/index",
    })
    // wx.redirectTo({
    //   url: "/pages/index/index"
    // });
  },
  checkOption: function (t) {
    var e = t.currentTarget.dataset;
    if (!e.status) return !1;
    S.audioCtx.pause();
    var a = S.data.obj;
    a["option_" + e.domindex] = !1, a["option_" + e.domindex + "_" + e.index] = "options_question_item_select",
      C++ , O = O.concat({
        type: 2,
        text: e.answerdesc,
        domindex: C
      }), S.setData({
        obj: a,
        content: O,
        audio_status: []
      }), setTimeout(function () {
        S.setData({
          scrollview: "index-" + C
        }), c(e.value);
      }, 100);
      
  },
  useUserInfo(e){
    if(e.detail.userInfo){
      this.selectComponent('#ad-fn').openAd(null, () => {
        this._useUserInfo(e)
      });
    }
  },
  _useUserInfo: function (t) {
    var a = t.detail.userInfo;
    a && "disabled" != S.data.clickflag && (a.avatarUrl = t.detail.userInfo.avatarUrl.replace("/132", "/0"),
      S.setData({
        userInfo: a,
        clickflag: "disabled"
      }, function () {
        e(W, _, A, d);
      }));
  }
});

wx._getImageInfo = function (obj) {
  if (obj.src === '../assets/qr.png') {
    return obj.success({
      width: 258,
      height: 258,
      path: obj.src
    })
  } else {
    this.getImageInfo(obj)
  }
}

var dt = function t(e, a) {
  var n = t;
  n.resourceCnt = e.length || 0, n.loadIndex = 0, n.imgObg = [], n.callback = a, n.finishCnt = 0,
    n.preLoad = function (t, e) {
      var a = n;
      var aaa = t;
      wx._getImageInfo({
        src: t,
        success: function (t) {
          a.imgObg[e] = t, a.finishCnt++ , a.finishCnt >= a.resourceCnt && a.callback && a.callback(a.imgObg);
        }
      });
    }, n.loadStart = function () {
      for (var t = n, a = 0; a < n.resourceCnt; a++) t.preLoad(e[t.loadIndex], t.loadIndex),
        t.loadIndex++;
    }, n.loadStart();
};