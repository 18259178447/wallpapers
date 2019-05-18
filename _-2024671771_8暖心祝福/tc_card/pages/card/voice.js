var mp3Recorder = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext(), mp3RecoderOptions = {
    duration: 6e4,
    sampleRate: 16e3,
    numberOfChannels: 1,
    encodeBitRate: 48e3,
    format: "mp3"
}, app = getApp();

Page({
    data: {
        voiceImg: "/tc_card/resource/images/voicebtn.png",
        dotext: "点击录音",
        finish: 0,
        second: 30,
        played: 0
    },
    onLoad: function(t) {
        var o = this;
        wx.setNavigationBarTitle({
            title: app.globalData.spacename
        }), mp3Recorder.onStart(function() {
            console.log("recorder start");
        }), mp3Recorder.onStop(function(t) {
            var e = t.tempFilePath;
            o.setData({
                voice: e
            });
        }), innerAudioContext.onEnded(function() {
            o.setData({
                played: 0
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        wx.getStorage({
            key: "zhufu",
            success: function(t) {
                e.setData({
                    zhufu: t.data
                }), e.changeWord();
            }
        });
    },
    onHide: function() {
        innerAudioContext.stop();
    },
    onUnload: function() {
        innerAudioContext.stop();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    goVoice: function() {
        1 == this.data.finish ? (this.setData({
            voiceImg: "/tc_card/resource/images/ok.png",
            dotext: "完成",
            finish: 2
        }), mp3Recorder.stop()) : 2 == this.data.finish ? (app.storage("voice", this.data.voice), 
        wx.navigateBack({
            delta: 1
        })) : (mp3Recorder.start(mp3RecoderOptions), this.setData({
            voiceImg: "/tc_card/resource/images/stop.png",
            dotext: "正在录音",
            finish: 1
        }), this.countDown());
    },
    changeWord: function() {
        var t = this.data.zhufu, e = this.getRandomNum(0, t.length);
        this.setData({
            pageWord: t[e]
        });
    },
    getRandomNum: function(t, e) {
        var o = e - t - 1, n = Math.random();
        return t + Math.round(n * o);
    },
    countDown: function() {
        var t = this, e = t.data.second;
        if (2 != this.data.finish) {
            if (0 == e) return mp3Recorder.stop(), void t.setData({
                finish: 2,
                voiceImg: "/tc_card/resource/images/ok.png",
                dotext: "完成"
            });
            setTimeout(function() {
                t.setData({
                    second: e - 1
                }), t.countDown();
            }, 1e3);
        }
    },
    resetVoice: function() {
        this.setData({
            voiceImg: "/tc_card/resource/images/voicebtn.png",
            dotext: "点击录音",
            finish: 0,
            second: 30,
            playvoice: "/tc_card/resource/images/play.png",
            vcolor: null,
            voice: null
        });
    },
    playVoice: function() {
        var t = this.data.voice;
        this.data.played ? (innerAudioContext.pause(), innerAudioContext.onPause(function() {
            console.log("暂停");
        }), this.setData({
            played: 0
        })) : (innerAudioContext.src = t, innerAudioContext.play(), innerAudioContext.onPlay(function() {
            console.log("播放");
        }), this.setData({
            played: 1
        }));
    }
});