function e(e, a, t) {
  var i = t.gid, o = t.title, n = t.original, l = "/pkgquiz/quiz/quiz?id=" + i + "&title=" + o + "&src=" + e.globalData.source, r = wx.getSystemInfoSync(), c = e.globalData.free_jump, s = t.kefu, u = t.savelink, p = t.needjump;
    if (1 == t.islink) {
        var g = t.otherlink;
        return l = "../quiz/webview?link=" + g, wx.navigateTo({
            url: l
        }), !0;
    }
    if (p) return console.log("123"), wx.navigateToMiniProgram({
        appId: t.jumpappid,
        path: t.jumppath
    }), !0;
    if (1 == u) {
        var d = t.weblink;
        return a.setData({
            alertbox_item0: "block",
            alertbox_item1: "block",
            save_link: d
        }), !0;
    }
    if (1 == s) return !0;
    if (4 == n) if (r.SDKVersion >= "1.6.4") {
        var x = t.quiz_id;
        e.globalData.pro_jump ? (l = "pages/quiz/webview?link=https://qc-ssl.itwlw.com/index.php/Wxapp/Divine/index/id/" + x + "/source/" + e.globalData.source + "/channel/" + e.globalData.channel + "&original=4&savestatus=1", 
        console.log(l), wx.navigateToMiniProgram({
            appId: e.globalData.pro_jump,
            path: l,
            extraData: {
                from: "quce"
            },
            envVersion: "release",
            field: function() {
                a.setData({
                    alertbox_item0: "block",
                    alertbox_item1: "block",
                    alertbox_item2: "none",
                    save_link: i
                });
            }
        })) : (i = "https://qc-ssl.itwlw.com/index.php/Wxapp/Divine/index/id/" + x + "/source/" + e.globalData.source + "/channel/" + e.globalData.channel, 
        wx.setStorageSync("lingji_game_id", i), wx.navigateTo({
            url: "../quiz/webview?link=" + i + "&original=4"
        }));
    } else a.setData({
        alertbox_item0: "block",
        alertbox_item1: "block",
        alertbox_item2: "none",
        save_link: i
    }); else 3 == n && (l = "/pages/quiz/brief?id=" + i + "&title=" + o + "&source=" + e.globalData.source + "&channel=" + e.globalData.channel, 
    c = e.globalData.pro_jump), c ? wx.navigateToMiniProgram({
        appId: c,
        path: l,
        extraData: {
            from: "quce"
        },
        envVersion: "release",
        field: function() {
            wx.navigateTo({
                url: l
            });
        }
    }) : wx.navigateTo({
        url: l
    });
}

module.exports = {
    incImageSave: function(e, a, t, i) {
        wx.request({
            url: "https://qc-ssl.itwlw.com/index.php/App/Index/commonLongtap",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                gid: e,
                type: a,
                source: 3,
                src: t
            },
            success: function(e) {
                i();
            }
        });
    },
    playgeme: e,
    checkPush: function(a, t, i) {
        console.log(i);
        var o = i.ispush;
        1 == o ? 3 != i.original && 4 != i.original ? t.setData({
            attention_container: "block",
            qrcode_scan_title: i.title,
            qrcode_scan_id: i.gid
        }) : e(a, t, i) : 2 == o && e(a, t, i);
    },
    incAuthorize: function(e, a, t) {
        wx.getStorageSync("photo_authorize") || wx.request({
            url: e.globalData.host + "/App/Index/incAuthorize",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                type: a,
                status: t,
                uid: wx.getStorageSync("quce_uid"),
                openid: wx.getStorageSync("quce_user_openid"),
                appid: e.globalData.appid
            },
            success: function(e) {
                wx.setStorageSync("photo_authorize", !0);
            }
        });
    },
    showRecords: function(e, a, t) {
        wx.getSystemInfoSync();
        var i = t.kefu;
        if (1 == t.savelink) {
            var o = t.weblink;
            return a.setData({
                alertbox_item0: "block",
                alertbox_item1: "block",
                save_link: o
            }), !0;
        }
        if (1 == i) return console.log("打开客服" + l), !0;
        if (4 == t.original) {
            var n = t.id;
            e.globalData.pro_jump ? (s = "pages/quiz/webview?link=" + n, wx.navigateToMiniProgram({
                appId: e.globalData.pro_jump,
                path: s,
                extraData: {
                    from: "quce"
                },
                envVersion: "release",
                field: function() {}
            })) : wx.navigateTo({
                url: "../quiz/webview?link=" + n
            });
        } else {
            var l = t.gid, r = t.title, c = t.employeetestid;
            if (e.globalData.pro_jump) {
                var s = "pages/quiz/brief?id=" + l + "&title=" + r + "&employeeid=" + c;
                wx.navigateToMiniProgram({
                    appId: e.globalData.pro_jump,
                    path: s,
                    extraData: {
                        from: "quce"
                    },
                    envVersion: "release",
                    field: function(e) {
                        console.log(e), wx.navigateTo({
                            url: "../quiz/brief?id=" + l + "&title=" + r + "&employeeid=" + c
                        });
                    }
                });
            } else wx.navigateTo({
                url: "../quiz/brief?id=" + l + "&title=" + r + "&employeeid=" + c
            });
        }
    },
    initChannel: function(e, a) {
        if (a.channel) e.globalData.channel = a.channel, wx.setStorageSync("user_channel", a.channel); else {
            var t = wx.getStorageSync("user_channel");
            t && (e.globalData.channel = t);
        }
        if (a.source) e.globalData.source = a.source, wx.setStorageSync("user_source", a.source); else {
            var i = wx.getStorageSync("user_source");
            i && (e.globalData.source = i);
        }
    }
};