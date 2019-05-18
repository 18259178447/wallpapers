var mp3Recorder = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext(), mp3RecoderOptions = {
    duration: 6e4,
    sampleRate: 16e3,
    numberOfChannels: 1,
    encodeBitRate: 48e3,
    format: "mp3"
}, app = getApp();

Page({
    data: {
        voing: !1,
        second: 0,
        played: 0,
        avatar: "",
        nickname: ""
    },
    onLoad: function(a) {
        var e = this;
        mp3Recorder.onStart(function() {
            console.log("recorder start");
        }), mp3Recorder.onStop(function(a) {
            var t = a.tempFilePath;
            e.upVoice(t);
        }), innerAudioContext.onEnded(function() {
            e.setData({
                played: 0,
                voing: "stop"
            });
        }), app.globalData.config.llads && e.setData({
            llads: app.globalData.config.llads
        }), e.setData({
            user: app.globalData.userInfo,
            nickname: app.globalData.userInfo.nickname,
            avatar: app.globalData.userInfo.avatar,
            wenben: a.text,
            cardid: a.id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        innerAudioContext.stop();
    },
    onUnload: function() {
        innerAudioContext.stop();
    },
    voice: function() {
        var a = this.data.voing;
        a ? "voiceing" == a ? (this.setData({
            voing: "over"
        }), mp3Recorder.stop()) : "over" == a ? (this.setData({
            voing: "playing"
        }), this.playVoice()) : "playing" == a ? (this.playVoice(), this.setData({
            voing: "stop"
        })) : "stop" == a && (this.playVoice(), this.setData({
            voing: "playing"
        })) : (mp3Recorder.start(mp3RecoderOptions), this.countDown(), this.setData({
            voing: "voiceing"
        }));
    },
    delvoice: function() {
        innerAudioContext.stop(), this.setData({
            voing: !1,
            voice: null
        });
    },
    countDown: function() {
        var a = this, t = this.data.second;
        if ("over" != this.data.voing) {
            if (60 == t) return mp3Recorder.stop(), void a.setData({
                voing: "over"
            });
            setTimeout(function() {
                a.setData({
                    second: t + 1
                }), a.countDown();
            }, 1e3);
        }
    },
    playVoice: function() {
        var a = this.data.voice;
        this.data.played ? (innerAudioContext.pause(), innerAudioContext.onPause(function() {
            console.log("暂停");
        }), this.setData({
            played: 0,
            voing: "stop"
        })) : (innerAudioContext.src = a, innerAudioContext.play(), innerAudioContext.onPlay(function() {
            console.log("播放");
        }), this.setData({
            played: 1,
            voing: "playing"
        }));
    },
    choosezf: function() {
        wx.navigateTo({
            url: "/tc_card/pages/card/zflist"
        });
    },
    uploadimg: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = a.tempFilePaths;
                wx.uploadFile({
                    url: app.util.url("entry/wxapp/upimg", {
                        m: "tc_card"
                    }),
                    filePath: t[0],
                    name: "file",
                    success: function(a) {
                        var t = a.data;
                        console.log(t), e.setData({
                            avatar: t
                        });
                    }
                });
            }
        });
    },
    postData: function(a) {
        var t = this;
        app.upForm(a.detail.formId), app.util.request({
            url: "entry/wxapp/postData",
            method: "post",
            dataType: "json",
            data: {
                cardid: t.data.cardid,
                pageword: t.filterStr(t.data.wenben),
                openid: app.globalData.uid,
                nickname: t.data.nickname,
                avatar: t.data.avatar,
                voice: t.data.upvoice ? t.data.upvoice : ""
            },
            success: function(a) {
                var t = a.data.scene;
                wx.navigateTo({
                    url: "/tc_card/pages/card/card?scene=" + t + "&mods=1"
                });
            }
        });
    },
    upVoice: function(e) {
        var n = this;
        wx.showLoading({
            title: "正在保存语音"
        }), wx.uploadFile({
            url: app.util.url("entry/wxapp/upvoice", {
                m: "tc_card"
            }),
            filePath: e,
            name: "file",
            formData: null,
            success: function(a) {
                var t = a.data;
                n.setData({
                    voice: e,
                    upvoice: t
                }), wx.hideLoading(), console.log(n.data.voice);
            }
        });
    },
    bindKeyInput: function(a) {
        this.setData({
            nickname: a.detail.value
        });
    },
    bindKeyZf: function(a) {
        this.setData({
            wenben: a.detail.value
        });
    },
    filterStr: function(a) {
        for (var t = app.globalData.config.guanjianci.split("|"), e = "", n = [], o = 0, i = /[\u4E00-\u9FA5\uF900-\uFA2D]/, r = (new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~锛丂#锟モ€︹€�&*锛堬級鈥斺€攟{}銆愩€戔€橈紱锛氣€濃€�'銆傦紝銆侊紵]"), 
        0), s = 0; s < a.length; s++) {
            var c = a[s];
            if (i.test(c)) {
                for (var p = {
                    n: s,
                    p: [],
                    s: 0
                }, l = 0, u = 0; u < t.length; u++) t[u][0] == c && (p.p[l] = [ u, 0, -1, 0 ], 1 == t[u].length && (p.s = 1, 
                p.p[l][3] = 1), l++);
                for (var d = r; d < o; d++) for (var g = n[d], v = 0; v < g.p.length; v++) {
                    var f = g.p[v];
                    t[f[0]].length > f[1] + 1 ? t[f[0]][f[1] + 1] == c && (p.p[l] = [ f[0], f[1] + 1, g.n, 0 ], 
                    t[f[0]].length == f[1] + 2 && (p.s = 1, this.signFilterList(p.p[l], n)), l++) : (g.s = 1, 
                    this.signFilterList(f, n));
                }
                0 < p.p.length ? (n[o] = p, o++) : r = o;
            }
        }
        if (0 < n.length) for (var h = 0, m = -1, D = 0; D < n.length; D++) 1 == n[D].s && (h = m + 1) < (m = n[D].n) && (e += a.slice(h, m));
        return h = m + 1, e = (e += a.slice(h, a.length)).replace(new RegExp(this.data.guanjianci, "g"), function(a) {
            return "";
        });
    },
    signFilterList: function(a, t) {
        if (0 == a[3]) {
            a[3] = 1;
            var e = [];
            for (e[0] = a[0], e[1] = a[1], e[2] = a[2]; -1 != e[2]; ) for (var n = t.length - 1; 0 <= n; n--) if (t[n].n == e[2]) {
                t[n].s = 1;
                for (var o = t[n].p.length - 1; 0 <= o; o--) if (t[n].p[o][0] == e[0]) {
                    t[n].p[o][3] = 1, e[0] = t[n].p[o][0], e[1] = t[n].p[o][1], e[2] = t[n].p[o][2];
                    break;
                }
                break;
            }
        }
    }
});