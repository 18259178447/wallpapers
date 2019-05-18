var app = getApp(), innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        pageWord: "",
        mods: 1,
        editText: 0,
        textareaCon: null,
        usercard: {
            voice: 0
        },
        login: 0,
        musicimg: "../../resource/images/music.png"
    },
    onLoad: function(a) {
        var t = this, e = a.id;
        wx.setNavigationBarTitle({
            title: app.globalData.config.spacename
        }), wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    cardWidth: a.windowWidth,
                    cardHeight: a.windowHeight,
                    review: app.globalData.config.review,
                    login: app.globalData.userInfo ? 0 : 1
                }), t.cardData(e);
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        innerAudioContext.paused || innerAudioContext.play();
    },
    onHide: function() {
        innerAudioContext.stop();
    },
    onUnload: function() {
        innerAudioContext.stop();
    },
    updateUserInfo: function(a) {
        var t = this;
        app.globalData.userInfo ? (t.setData({
            userInfo: app.globalData.userInfo,
            login: 0
        }), wx.navigateTo({
            url: "/tc_card/pages/card/edit?id=" + t.data.cardInfo.id + "&text=" + t.data.cardInfo.wenben
        })) : app.getUserInfo(function(a) {
            t.setData({
                userInfo: a,
                login: 0
            }), wx.navigateTo({
                url: "/tc_card/pages/card/edit?id=" + t.data.cardInfo.id + "&text=" + t.data.cardInfo.wenben
            });
        }, a.detail);
    },
    setPageWord: function() {
        var a = this.data.pageWord.replace(/[。，：、！；？.,?:;!]/g, function(a) {
            return a + "\n";
        });
        this.setData({
            pageWord: a
        });
    },
    closeAlert: function() {
        this.setData({
            shared: 0
        });
    },
    goBack: function(a) {
        console.log(a.detail.formId), app.upForm(a.detail.formId), wx.navigateBack({
            delta: 1
        });
    },
    goVoice: function() {
        wx.navigateTo({
            url: "/tc_card/pages/card/voice"
        });
    },
    changeWord: function(a) {
        console.log(a.detail.formId), app.upForm(a.detail.formId), this.setData({
            pickShow: 1
        });
    },
    closePick: function() {
        this.setData({
            pickShow: 0
        });
    },
    doSure: function() {
        var a = this, t = a.data.zhufunum;
        0 < t ? this.setData({
            pickShow: 0,
            pageWord: a.data.textarr[t]
        }) : this.setData({
            pickShow: 0,
            pageWord: a.data.textarr[0]
        }), this.setPageWord();
    },
    bindChange: function(a) {
        var t = a.detail.value;
        console.log(t[0]), this.setData({
            zhufunum: t[0]
        });
    },
    play_music: function() {
        var a = this.data.cardInfo.music, t = this.data.usercard.voice;
        console.log(t), innerAudioContext.src = t && "undefined" != t ? this.data.imgurl + t : a, 
        innerAudioContext.play(), innerAudioContext.onPlay(function() {
            console.log("开始播放");
        }), innerAudioContext.onEnded(function() {
            innerAudioContext.src = a, innerAudioContext.play();
        });
    },
    playmusiced: function() {
        innerAudioContext.paused ? (innerAudioContext.play(), this.setData({
            musicimg: "../../resource/images/music.png"
        })) : (innerAudioContext.pause(), this.setData({
            musicimg: "../../resource/images/musicoff.png"
        }));
    },
    cardData: function(a) {
        var i = this;
        app.util.request({
            url: "entry/wxapp/cardinfo",
            method: "post",
            dataType: "json",
            showLoading: !1,
            data: {
                id: a
            },
            success: function(a) {
                for (var t = a.data.textlist, e = [], n = 0; n < t.length; n++) e.push(t[n].content);
                i.setData({
                    editads: "-webkit-animation:flash 3s;",
                    skinurl: app.globalData.config.skinurl,
                    cardInfo: a.data.card,
                    textarr: e,
                    pageWord: a.data.card.wenben,
                    guanjianci: a.data.guanjianci
                }), app.globalData.textarr = e;
                var o = a.data.card.bigthumb;
                0 < o.indexOf("http") && i.setData({
                    "cardInfo.bigthumb": o
                }), i.play_music(), i.setPageWord(), wx.setStorageSync("zhufu", e);
            }
        });
    },
    tocolose: function() {
        this.setData({
            editText: 0
        });
    },
    postData: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/postData",
            method: "post",
            dataType: "json",
            showLoading: !1,
            data: {
                cardid: a.data.cardInfo.id,
                pageword: a.data.pageWord,
                openid: app.globalData.userInfo.openid,
                nickname: app.globalData.userInfo.nickName,
                avatar: app.globalData.userInfo.avatarUrl,
                voice: a.data.voice
            },
            success: function(a) {
                var t = a.data.scene;
                wx.navigateTo({
                    url: "/tc_card/pages/card/card?scene=" + t + "&mods=1"
                });
            }
        });
    },
    toSave: function(a) {
        console.log("制作"), console.log(a.detail.formId), app.upForm(a.detail.formId);
        Date.parse(new Date());
        wx.navigateTo({
            url: "/tc_card/pages/card/edit?id=" + this.data.cardInfo.id + "&text=" + this.data.cardInfo.wenben
        });
    }
});