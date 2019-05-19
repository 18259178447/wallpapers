var a, e = getApp(),
  t = require("../../utils/quiz/swiper.js"),
  o = require("../../utils/quiz/common.js"),
  n = 1, i = [], l = !0, r = 0;

Page({
  data: {
    imgUrls: [],
    imagewidth: 0,
    imageheight: 0,
    swiperheight: 0,
    indicatorDots: !0,
    autoplay: !0,
    interval: 5e3,
    duration: 1e3,
    recommond: {},
    list: {},
    alertbox_item0: "none",
    home_daily_status: "none",
    home_bottom_navbox: "none",
    shownormalpage: !1
  },
  todayquiz(e){
    var index = e.target.dataset.index;
    if(index === undefined) return;
    var { title, quiz_id} = this.data.days[index];
    wx.navigateTo({
      url: `/pkgquiz/quiz/quiz?id=${quiz_id}&title=${title}src=14`,
    })
  },
  playgame: function (t) {
    var n = t.currentTarget.dataset.clicktype, i = t.currentTarget.dataset.quiz_id;
     a.setData({
      attention_container: "none"
    }), 
    o.playgeme(e, a, t.currentTarget.dataset);
  },
  morecategory: function (a) {
    wx.navigateTo({
      url: "/pkgquiz/more/more"
    });
  },
  changeIndicatorDots: function (a) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    });
  },
  onLoad: function (t) {
    wx.showLoading({
      title: "加载中"
    }), r = t.ispush, n = 1, i = [], (a = this).setData({
      shownormalpage: !0
    }), a.initPageData(), o.initChannel(e, t), o.checkPush(e, a, t);
  },
  specialplaygeme: function (t) {
    var o = t.gid, n = t.title, i = t.original, l = "/pkgquiz/quiz/index?id=" + o + "&title=" + n + "&src=" + e.globalData.source, r = wx.getSystemInfoSync(), s = e.globalData.free_jump, c = (t.kefu,
      t.savelink, t.needjump), d = t.islink;
    if (c) return console.log("123"), wx.navigateToMiniProgram({
      appId: t.jumpappid,
      path: t.jumppath
    }), !0;
    if (1 == d) {
      var g = t.otherlink;
      return l = "../quiz/webview?link=" + g, wx.navigateTo({
        url: l
      }), !0;
    }
    if (4 == i) if (r.SDKVersion >= "1.6.4") {
      var u = t.quiz_id;
      e.globalData.pro_jump ? (l = "pages/quiz/webview?link=https://qc-ssl.itwlw.com/index.php/Wxapp/Divine/index/id/" + u + "/source/" + e.globalData.source + "/channel/" + e.globalData.channel + "&original=4&savestatus=1",
        console.log(l), wx.navigateToMiniProgram({
          appId: e.globalData.pro_jump,
          path: l,
          extraData: {
            from: "quce"
          },
          envVersion: "release",
          field: function () {
            a.setData({
              alertbox_item0: "block",
              alertbox_item1: "block",
              alertbox_item2: "none",
              save_link: o
            });
          }
        })) : (o = "https://qc-ssl.itwlw.com/index.php/Wxapp/Divine/index/id/" + u + "/source/" + e.globalData.source + "/channel/" + e.globalData.channel,
          wx.setStorageSync("lingji_game_id", o), wx.redirectTo({
            url: "../quiz/webview?link=" + o + "&original=4"
          }));
    } else a.setData({
      alertbox_item0: "block",
      alertbox_item1: "block",
      alertbox_item2: "none",
      save_link: o
    }); else 3 == i && (l = "/pages/quiz/brief?id=" + o + "&title=" + n + "&source=" + e.globalData.source + "&channel=" + e.globalData.channel,
      s = e.globalData.pro_jump), s ? wx.navigateToMiniProgram({
        appId: s,
        path: l,
        extraData: {
          from: "quce"
        },
        envVersion: "release",
        field: function () {
          wx.redirectTo({
            url: l
          });
        }
      }) : wx.redirectTo({
        url: l
      });
  },
  initPageData: function () {
    // wx.request({
    //   url: e.globalData.host + "/App/index/getWxAppBanners",
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   method: "POST",
    //   data: {
    //     env: e.globalData.env,
    //     ver: e.globalData.ver,
    //     appid: e.globalData.appid
    //   },
    //   success: function (e) {
    //     a.setData({
    //       banners: e.data
    //     });
    //   }
    // }),
     wx.request({
      url: e.globalData.host + "/App/index/getRecommend",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        env: e.globalData.env,
        ver: e.globalData.ver,
        appid: e.globalData.appid
      },
      success: function (e) {
        a.setData({
          recommond: e.data
        });
      }
    }), wx.request({
      url: e.globalData.host + "/App/index/getPageData",
      method: "POST",
      data: {
        pageIndex: n,
        env: e.globalData.env,
        ver: e.globalData.ver,
        appid: e.globalData.appid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (e) {
        i = e.data, a.setData({
          list: i
        }), n++;
      }
      }), wx.hideLoading(), wx.request({
        url: e.globalData.host + "/App/Index/getDailyQuiz",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          env: e.globalData.env,
          ver: e.globalData.ver
        },
        success: function (e) {
          if (e.data && e.data.list && e.data.list.length){
            a.setData({
              days: e.data.list
            })
          }
        }
      });
  },
  onReady: function () { },
  onShow: function () { },
  checkDailydata: function () {
    var t = new Date(), o = t.getFullYear(t) + "" + (t.getMonth(t) + 1) + t.getDate(t), n = this;
    if (wx.getStorageSync("today") && parseInt(wx.getStorageSync("today")) == parseInt(o) || 1 == r || (wx.setStorageSync("today", parseInt(o)),
      wx.request({
        url: e.globalData.host + "/App/Index/getDailyQuiz",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          env: e.globalData.env,
          ver: e.globalData.ver
        },
        success: function (a) {
          var t = a.data.list;
          t = t.slice(0, 6);
          for (var o = 0; o < t.length; o++) 4 == t[o].original ? t[o].labeltxt = "占卜" : t[o].labeltxt = "专业";
          n.setData({
            home_daily_box_list: t,
            home_daily_items: a.data.count,
            home_daily_status: "block"
          }), wx.request({
            url: e.globalData.host + "/App/Index/incDailyView"
          });
        }
      })), wx.getStorageSync("novel_date") && parseInt(wx.getStorageSync("novel_date")) == parseInt(o) || a.setData({
        reddot: "block"
      }), 1 == e.globalData.ajax_status) 1 == e.globalData.app_status && a.setData({
        home_bottom_navbox: "block"
      }); else var i = setInterval(function () {
        1 == e.globalData.ajax_status && (1 == e.globalData.app_status && a.setData({
          home_bottom_navbox: "block"
        }), clearInterval(i));
      }, 200);
  },
  closeDaily: function () {
    this.setData({
      home_daily_status: "none"
    });
  },
  showMoreDaily: function () {
    this.setData({
      home_daily_status: "none"
    });
  },
  onHide: function () { },
  onUnload: function () { },
  onReachBottom: function () {
    if (l) {
      l = !1;
      var a = this;
      wx.request({
        url: e.globalData.host + "/App/index/getPageData",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          pageIndex: n,
          env: e.globalData.env,
          ver: e.globalData.ver,
          appid: e.globalData.appid
        },
        success: function (e) {
          i = i.concat(e.data), console.log(i), a.setData({
            list: i
          }), n++ , l = !0;
        }
      });
    }
  },
  imageLoad: function (a) {
    var e = t.imageUtil(a);
    this.setData({
      imagewidth: e.imageWidth,
      imageheight: e.imageHeight,
      swiperheight: e.imageHeight
    });
  },
  doSearch: function (a) {
    var e = a.currentTarget.dataset.keyword;
    e ? wx.navigateTo({
      url: "/pkgquiz/search/search?keyword=" + e
    }) : wx.showModal({
      title: "提示",
      content: "请先输入你要搜索测试的名称！",
      success: function (a) {
        a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
      }
    });
  },
  bindKeyInput: function (a) {
    this.setData({
      keyword: a.detail.value
    });
  },
  onShareAppMessage: function () {
    return {
      title: "占卜师傅-好玩有趣的手机测试网站",
      path: "/pages/index/index",
      success: function (a) {
        wx.request({
          url: e.globalData.host + "/App/index/incwxappshare",
          data: {
            gid: 0,
            type: 3
          },
          success: function (a) { }
        });
      },
      fail: function (a) { }
    };
  },
  saveLink: function (e) {
    wx.setClipboardData({
      data: e.target.dataset.url,
      success: function (e) {
        wx.getClipboardData({
          success: function (e) {
            a.setData({
              alertbox_item0: "block",
              alertbox_item1: "none",
              alertbox_item2: "block"
            }), wx.reportAnalytics("save_link", {});
          }
        });
      }
    });
  },
  hideFixBox: function (e) {
    a.setData({
      alertbox_item0: "none",
      alertbox_item1: "none",
      alertbox_item2: "none"
    });
  },
  jumpToMine: function (a) {
    e.globalData.pro_jump ? wx.navigateToMiniProgram({
      appId: e.globalData.pro_jump,
      path: "pages/home/mine?tab=payrecords",
      envVersion: "release",
      field: function (a) {
        console.log(a), wx.redirectTo({
          url: "mine"
        });
      }
    }) : wx.redirectTo({
      url: "mine"
    });
  },
  hidereddot: function () {
    var e = new Date(), t = e.getFullYear(e) + "" + (e.getMonth(e) + 1) + e.getDate(e);
    t != wx.getStorageSync("novel_date") && wx.setStorageSync("novel_date", t), a.setData({
      reddot: "none"
    });
  },
  jumotoNovel: function () {
    a.hidereddot(), wx.navigateToMiniProgram({
      appId: "wxb9347529b3ce215d",
      path: "pages/index/index"
    });
  },
  attention_btn_close: function (e) {
    a.setData({
      attention_container: "none"
    });
  },
  getuserinfocallback: function (a) {
    var e = a.currentTarget.dataset.weblink_getuserinfo, t = a.detail.userInfo;
    t && (t.avatarUrl = a.detail.userInfo.avatarUrl.replace("/132", "/0"), wx.navigateTo({
      url: "../quiz/webview?link=" + e + "&adduserinfo=1&nickname=" + t.nickName + "&avatarUrl=" + encodeURIComponent(t.avatarUrl)
    }));
  }
});