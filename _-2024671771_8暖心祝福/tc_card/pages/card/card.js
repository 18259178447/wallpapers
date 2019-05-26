var innerAudioContext = wx.createInnerAudioContext(), app = getApp();

Page({
    data: {
        action: 1,
        oksure: 1,
        mods: 0,
        login: 1,
        huoqiaction: "-webkit-animation:zoomIn 2s infinite;",
        word: "display:none;",
        shareshow: 0,
        okdoshare: 0,
        ishowad: 0,
        musicimg: "../../resource/images/music.png"
    },
    onLoad: function(t) {
      wx.hideShareMenu()
        var e = decodeURIComponent(t.scene), n = this;
        wx.getSystemInfo({
            success: function(a) {
                n.setData({
                    cardWidth: a.windowWidth,
                    cardHeight: a.windowHeight,
                    mods: t.mods ? 1 : 0
                });
            }
        });
        n = this;
        app.globalData.config ? (n.setData({
            config: app.globalData.config
        }), n.cardData(e), wx.setNavigationBarTitle({
            title: app.globalData.config.spacename
        }), app.login(function(a) {
            n.setData({
                user: a
            });
        })) : app.getConfig(function(a) {
            n.setData({
                config: a
            }), n.cardData(e), wx.setNavigationBarTitle({
                title: app.globalData.config.spacename
            }), a.review || app.login(function(a) {
                n.setData({
                    user: a
                });
            });
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
    onShareAppMessage: function() {
        var a, t = this;
        (a = t.data.cardInfo.sharetitle) ? a = a.replace(/#昵称#/, t.data.usercard.nickname) : a = (a = t.data.cardtitle).replace(/#昵称#/, t.data.usercard.nickname);
        return innerAudioContext.pause(), {
            title: a,
            path: "/tc_card/pages/card/card?scene=" + t.data.usercard.id,
            imageUrl: t.data.skinurl + t.data.cardInfo.smallthumb,
            success: function(a) {
                t.setData({
                    shared: 1,
                    shareshow: 0
                }), innerAudioContext.paused || innerAudioContext.play();
            }
        };
    },
    getUserInfo: function(a) {
        var t = this;
        wx.getStorageSync("userInfo");
        app.getUserInfo(function(a) {
            a && (t.setData({
                userInfo: a,
                login: 0
            }), a.openid == t.data.cardInfo.openid && t.setData({
                sharenickname: a.nickname
            }));
        }, a.detail);
    },
    showDate: function(a) {
        var t = new Date(1e3 * a), e = t.getDate(), n = t.getMonth(), i = new Array(12);
        return i[0] = "Jan", i[1] = "Feb", i[2] = "Mar", i[3] = "Apr", i[4] = "May", i[5] = "Jun", 
        i[6] = "Jul", i[7] = "Aug", i[8] = "Sep", i[9] = "Oct", i[10] = "Nov", i[11] = "Dec", 
        i[n] + "." + e;
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
        var o = this;
        app.util.request({
            url: "entry/wxapp/userdata",
            method: "post",
            dataType: "json",
            showLoading: !1,
            data: {
                id: a
            },
            success: function(a) {
                o.setData({
                    cardInfo: a.data.card,
                    pageWord: a.data.usercard.pageword,
                    edbtn: a.data.edbtn,
                    sharebtn: a.data.sharebtn,
                    shbitle: a.data.shbitle,
                    cardtitle: a.data.cardtitle,
                    usercard: a.data.usercard,
                    ispay: a.data.ispay,
                    piao: a.data.piao,
                    skinurl: a.data.skinurl,
                    imgurl: a.data.imgurl,
                    ishowad: o.data.config.ishowad,
                    times: o.showDate(a.data.usercard.addtime)
                });
                var t = a.data.card.bigthumb;
                0 < t.indexOf("http") && o.setData({
                    "cardInfo.bigthumb": t
                });
                for (var e = o.data.usercard.pageword, n = [], i = 0; i < e.length; i++) n.push(e[i].content);
                o.setPageWord(), o.play_music(), o.click(), setTimeout(o.huoqi, 3e3), setTimeout(function() {
                    o.setData({
                        ishowad: 0
                    });
                }, 1e4);
            }
        });
    },
    setPageWord: function() {
        var a = this.data.pageWord.replace(/[。，：、！；？.,?:;!]/g, function(a) {
            return a + "\n";
        });
        this.setData({
            pageWord: a
        });
    },
    huoqi: function() {
        var a = this;
        this.setData({
            huoqiaction: "-webkit-animation:huoqiaction 2s linear both;"
        }), setTimeout(function() {
            a.setData({
                shengaction: "-webkit-animation: shengziaction 2s linear both;"
            });
        }, 1500), setTimeout(function() {
            a.setData({
                fan1action: "-webkit-animation: fanye1 2s linear both;"
            });
        }, 3e3), setTimeout(function() {
            a.setData({
                fan2action: "-webkit-animation: fanye2 2s linear both;"
            });
        }, 4e3), setTimeout(function() {
            a.setData({
                bg1action: "-webkit-animation: yidong 1.5s linear both;"
            });
        }, 7e3), setTimeout(function() {
            a.setData({
                bg2: "z-index:2",
                bg1action: "-webkit-animation: fangda 1.5s linear both;"
            });
        }, 9e3), setTimeout(function() {
            a.setData({
                action: 0,
                bg1action: "-webkit-animation: fadeOut 2s ease-out;",
                word: "-webkit-animation-name: autoscroll;-webkit-animation-duration: 20.7s;-webkit-animation-delay: 0.3s;-webkit-animation-timing-function: linear;-webkit-animation-fill-mode: both;-webkit-animation-iteration-count: infinite;"
            });
        }, 11e3);
    },
    yulan: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    closeAlert: function() {
        this.setData({
            shared: 0
        });
    },
    click: function() {
        var a = this.data.cardInfo.id;
        app.util.request({
            url: "entry/wxapp/click",
            method: "post",
            dataType: "json",
            showLoading: !1,
            data: {
                id: a
            },
            success: function(a) {}
        });
    },
    lalal: function() {
        this.data.scene;
    },
    dobtn(){
      this.selectComponent('#lad').openAd('', ()=>{
        this._dobtn()
      });
    },
    _dobtn: function(a) {

        this.setData({
            shareshow: 1
        });
    },
    exitShare: function() {
        this.setData({
            shareshow: 0
        });
    },
    sharepic: function() {
        this.getqrcode(), wx.showLoading({
            title: "正在保存图片"
        });
    },
    saveimg: function() {
        var t = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 600,
            height: 900,
            destWidth: 600,
            destHeight: 900,
            canvasId: "myCanvas",
            success: function(a) {
                wx.hideLoading(), t.setData({
                    shareImgSrc: a.tempFilePath
                }), t.savelocal();
            },
            fail: function(a) {
                wx.hideLoading(), console.log(a);
            }
        });
    },
    savelocal: function() {
        var t = this;
        wx.saveImageToPhotosAlbum({
            filePath: t.data.shareImgSrc,
            success: function(a) {
                t.setData({
                    okdoshare: 1,
                    shareshow: 0
                });
            }
        });
    },
    getqrcode: function() {
        var t = this;
        wx.downloadFile({
            url: app.util.url("entry/wxapp/qrcode", {
                m: "tc_card",
                pid: t.data.usercard.id
            }),
            success: function(a) {
                200 === a.statusCode && (t.setData({
                    getqrcode: a.tempFilePath
                }), t.getcardbg());
            }
        });
    },
    getcardbg: function() {
        var t = this;
        wx.downloadFile({
            url: app.util.url("entry/wxapp/bgthumb", {
                m: "tc_card",
                cid: t.data.cardInfo.id
            }),
            success: function(a) {
                200 === a.statusCode && (t.setData({
                    getcardbg: a.tempFilePath
                }), t.getfootbg());
            }
        });
    },
    getfootbg: function() {
        var t = this, a = app.siteInfo.siteroot;
        a = a.replace(/app\/index.php/, ""), wx.downloadFile({
            url: a + "/addons/tc_card/style/images/bottom.png",
            success: function(a) {
                200 === a.statusCode && (t.setData({
                    getfootbg: a.tempFilePath
                }), console.log(a.tempFilePath), t.gotoshare());
            }
        });
    },
    gotoshare: function() {
        var t = this, a = this.data.getcardbg, e = this.data.getfootbg, n = this.data.getqrcode, i = this.data.usercard.nickname;
        console.log(a);
        var o = wx.createCanvasContext("myCanvas");
        o.drawImage(a, 0, 0, 600, 900), o.drawImage(e, 0, 550, 600, 350), o.setTextAlign("center"), 
        o.setFontSize(28), o.setFillStyle("#111111"), o.fillText(i + "送来一段祝福", 300, 800), 
        o.setTextAlign("center"), o.setFontSize(28), o.setFillStyle("#111111"), o.fillText("『长按识别』查看详情", 300, 860), 
        o.arc(300, 650, 100, 0, 2 * Math.PI), o.clip(), o.drawImage(n, 200, 550, 200, 200), 
        o.draw(!1, function(a) {
            t.saveimg();
        });
    },
    pybtndo: function() {
        this.setData({
            okdoshare: 0
        });
    },
    gohome: function(a) {
        innerAudioContext.pause(), wx.navigateTo({
          url: '/tc_card/pages/index/index',
        })
    },
    updateUserInfo: function(a) {
        var t = this;
        app.getUserInfo(function(a) {
            a && (t.setData({
                userInfo: a,
                login: 0
            }), innerAudioContext.pause(), wx.navigateTo({
                url: "/tc_card/pages/pay/pay?openid=" + t.data.usercard.openid + "&nickname=" + t.data.usercard.nickname + "&avatar=" + t.data.usercard.avatar + "&pid=" + t.data.usercard.id
            }));
        }, a.detail);
    },
    formSubmit: function(a) {
        console.log(a.detail.formId), app.globalData.userInfo && app.upForm(a.detail.formId);
    },
    gopay: function() {
        var a = this;
        if (app.globalData.userInfo) a.setData({
            userInfo: app.globalData.userInfo
        }), innerAudioContext.pause(), wx.navigateTo({
            url: "/tc_card/pages/pay/pay?openid=" + a.data.usercard.openid + "&nickname=" + a.data.usercard.nickname + "&avatar=" + a.data.usercard.avatar + "&pid=" + a.data.usercard.id
        }); else {
            var t = wx.getStorageSync("userInfo");
            t.openid ? (app.globalData.userInfo = t, a.setData({
                userInfo: app.globalData.userInfo
            }), innerAudioContext.pause(), wx.navigateTo({
                url: "/tc_card/pages/pay/pay?openid=" + a.data.usercard.openid + "&nickname=" + a.data.usercard.nickname + "&avatar=" + a.data.usercard.avatar + "&pid=" + a.data.usercard.id
            })) : a.setData({
                login: 1
            });
        }
    }
});