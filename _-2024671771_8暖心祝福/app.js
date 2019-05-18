var backgroundAudioManager = wx.getBackgroundAudioManager();

App({
    onLaunch: function() {},
    onShow: function() {},
    onHide: function() {},
    onError: function(a) {
        console.log(a);
    },
    globalData: {
        userInfo: null,
        config: null,
        textarr: null,
        ver: 16
    },
    util: require("we7/util.js"),
    getConfig: function(o) {
        var n = this;
        this.util.request({
            url: "entry/wxapp/config",
            method: "post",
            dataType: "json",
            showLoading: !1,
            data: {
                ver: n.globalData.ver
            },
            success: function(a) {
                n.globalData.config = a.data, "function" == typeof o && o(n.globalData.config);
            }
        });
    },
    upForm: function(a) {
        // this.util.request({
        //     url: "entry/wxapp/upform",
        //     method: "post",
        //     dataType: "json",
        //     showLoading: !1,
        //     data: {
        //         openid: this.globalData.uid,
        //         formid: a
        //     },
        //     success: function(a) {}
        // });
    },
    playmusic: function(a) {
        var o = a, n = o.data.cardInfo.music, t = o.data.usercard.voice;
        t && "undefined" != t ? (backgroundAudioManager.src = o.data.imgurl + t, console.log(o.data.imgurl + t)) : backgroundAudioManager.src = n, 
        backgroundAudioManager.play(), backgroundAudioManager.onEnded(function() {
            backgroundAudioManager.src = n, backgroundAudioManager.play();
        });
    },
    playpause: function() {
        backgroundAudioManager.pause();
    },
    playstop: function() {
        backgroundAudioManager.stop();
    },
    playstate: function(a) {
        var o = a;
        backgroundAudioManager.onPause(function() {
            var a = o.data.cardInfo.music;
            backgroundAudioManager.src = a, backgroundAudioManager.play();
        });
    },
    login: function(n) {
        var t = this, a = wx.getStorageSync("loginopenid");
        a ? (t.globalData.uid = a, "function" == typeof n && n(a)) : wx.login({
            success: function(a) {
              t.globalData.uid = 'o2H3D5BjFNs2brL_YZOcngAlqhwg', "function" == typeof n && n(t.globalData.uid),
                wx.setStorageSync("loginopenid", 'o2H3D5BjFNs2brL_YZOcngAlqhwg');

                // var o = a.code;
                //     url: "entry/wxapp/login",formid
                //     method: "post",
                //     dataType: "json",
                //     data: {
                //         code: o
                //     },
                //     showLoading: !1,
                //     success: function(a) {
                //         t.globalData.uid = a.data.openid, "function" == typeof n && n(t.globalData.uid), 
                //         wx.setStorageSync("loginopenid", a.data.openid);
                //     }
                // });
            }
        });
    },
    getUserInfo: function(o, n) {
        var t = this;
        t.util.request({
            url: "entry/wxapp/saveuser",
            method: "post",
            dataType: "json",
            data: {
                openid: t.globalData.uid,
                avatar: n.userInfo.avatarUrl,
                nickname: n.userInfo.nickName
            },
            showLoading: !1,
            success: function(a) {
                t.globalData.userInfo || (t.globalData.userInfo = {
                    avatar: n.userInfo.avatarUrl,
                    nickname: n.userInfo.nickName
                }), "function" == typeof o && o(t.globalData.userInfo);
            }
        });
    },
    siteInfo: require("siteinfo.js")
});