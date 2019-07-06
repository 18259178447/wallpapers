var e = require("/C9A2A3E625CA1DDFAFC4CBE1EDFB28B0.js"), t = e.formatTime(new Date());

App({
    data: {
        fopenid: ""
    },
    onLaunch: function() {},
    onLoad: function() {},
    onShow: function(n) {
      return
        if (n.query.fopenid) var o = n.query.fopenid;
        var a = wx.getStorageSync("sk");
        if (a) {
          return
            var i = wx.getStorageSync("TodaySignin_key");
            if (i["Signin" + t] || (e.req("user/TodaySignin", {
                id: a.openid
            }, function(e) {
                var t = e.data;
                wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2e3
                });
            }), (i = {})["Signin" + t] = !0, wx.setStorageSync("TodaySignin_key", i)), 1089 === n.scene) {
                var r = wx.getStorageSync("addtome_key");
                r || e.req("user/setFirst", {
                    addtome: !0,
                    id: a.openid
                }, function(e) {
                    wx.showToast({
                        title: e.data.msg,
                        icon: "none",
                        duration: 2e3
                    }), r = e.data.status, wx.setStorageSync("addtome_key", r);
                });
            }
            if (1023 === n.scene) {
                var s = wx.getStorageSync("desktop_key");
                s || e.req("user/setFirst", {
                    desktop: !0,
                    id: a.openid
                }, function(e) {
                    wx.showToast({
                        title: e.data.msg,
                        icon: "none",
                        duration: 2e3
                    }), s = e.data.status, wx.setStorageSync("desktop_key", s);
                });
            }
        } else wx.login({
            success: function(t) {
              var t = {
                data: {
                  "user": {
                    "id": "214015",
                    "appId": "wx23578bb17f4d960f",
                    "openId": "oQqRY5BdRJX71j0ieZmKoiuHMsL8",
                    "level": "1",
                    "diamond": "0",
                    "coin": "0",
                    "exp": "2",
                    "status": "1",
                    "role_id": "0",
                    "expire_time": "0",
                    "create_time": "1561366244"
                  },
                  "sk": {
                    "session_key": "DZra+BypkRI4BI0XMhHdWg==",
                    "openid": "oQqRY5BdRJX71j0ieZmKoiuHMsL8"
                  }
                }
              }
              var t = e.data.sk;
              console.log(t), wx.setStorage({
                key: "sk",
                data: e.data.sk
              });
              return;
                e.req("user/login", {
                    code: t.code,
                    fopenid: o
                }, function(e) {
                    var t = e.data.sk;
                    console.log(t), wx.setStorage({
                        key: "sk",
                        data: e.data.sk
                    });
                });
            }
        });
        if (1037 === n.scene) {
            var d = n.referrerInfo, c = d.appId, u = d.extraData;
            e.req("user/jump", {
                id: u.openid,
                appid: c
            });
        }
    },
    globalData: {
        userInfo: null,
        sk: null,
        unitid: "adunit-c353c99445b0965f"
    },
    func: {
        Todaydata: t,
        req: e.req,
        getReq: e.getReq,
        rootDocment: e.rootDocment,
        AppConf: e.AppConf
    }
});