var t = getApp(), a = wx.createInnerAudioContext();

Page({
    data: {
        status: [ !0, !1, !1, !1 ],
        cur: 0,
        cuss: 0,
        showme: !0,
        result: {},
        hasSelect: [],
        hasResult: !1,
        selectResult: {},
        star_count: 1,
        star_hide: !1,
        paizhen: {},
        zhuan: [ !1, !1, !1, !1, !1 ],
        show: [ !1, !1, !1, !1, !1 ],
        onshowNo: !1,
        shows: !0,
        showResult: !0,
        outAnimation: !0,
        outshow: !0,
        xipai1: "",
        fapai: "",
        zhangpai: !0,
        timeout: "",
        canselect: !1,
        outpai: [],
        que: !1
    },
    checkPeidui: function() {
        var a = this, s = {
            auth: t.auth.auth,
            secert: t.secert
        };
        a.data.p_user_id && !a.data.option.tiao_type && (s.scene = "pages/match/chou/chou?fr_user_id=" + a.data.p_user_id), 
        wx.request({
            url: t.yu + "/index.php/PeiDui/checkLingShu",
            data: s,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t), t.data.checked ? wx.navigateTo({
                    url: "/pages/match/match?p_user_id=" + a.data.p_user_id
                }) : a.setData({
                    que: !0
                });
            }
        });
    },
    preview: function() {
        var t = [ this.data.selectResult.card_pic ];
        wx.previewImage({
            urls: t
        });
    },
    xuanpai: function() {
        var t = Math.ceil(3 * Math.random()), a = Math.ceil(2 * Math.random());
        this.setData({
            xipai1: t,
            fapai: a
        }), 2 == t && this.xipai2(), 1 == a ? this.paipai1() : (this.setData({
            zhangpai: !1
        }), this.paipai2()), console.log(t, a);
    },
    xipai2: function() {
        for (var t = [], a = 35; a >= 0; a--) {
            var s = {};
            s.top = 250 * Math.sin(10 * a * Math.PI / 180) - 10, s.left = 240 + 250 * Math.cos(10 * a * Math.PI / 180), 
            s.timeout = Math.random(), s.dong = !1, t.push(s);
        }
        console.log(t), this.setData({
            xipai: t
        });
    },
    x1pai2texiao: function() {
        var t = this, a = this.data.xipai;
        setTimeout(function() {
            for (var s = 35; s >= 0; s--) a[s].dong = !0;
            t.setData({
                xipai: a
            }), console.log(1);
        }, 500), setTimeout(function() {
            for (var s = 35; s >= 0; s--) a[s].dong = !1;
            t.setData({
                xipai: a
            }), console.log(a), console.log(2);
        }, 2300);
    },
    x1pai3texiao: function() {
        var t = this, a = 0, s = 100, e = [];
        e.length = 36, this.setData({
            xipai: e
        }), setInterval(function() {
            var e = [];
            if (a % 2 != 0) a += 1, t.setData({
                dong: !1
            }), console.log(a); else if (a % 2 == 0 && a < 3) {
                for (var i = 36; i > 0; i--) {
                    var o = {};
                    o.top = s * Math.sin(10 * i * Math.PI / 180) - 10, o.left = 240 + s * Math.cos(10 * i * Math.PI / 180), 
                    o.timeout = .2 * Math.random(), e.push(o);
                }
                s += 100, a += 1, t.setData({
                    xipai: e,
                    dong: !0
                }), t.setData({
                    xipai: e
                }), console.log(a);
            }
            3 == a && clearInterval(o);
        }, 700);
    },
    paipai1: function() {
        for (var t = [], a = 0; a < 26; a++) {
            var s = {};
            s.left = 436 - 17 * a, t.push(s);
        }
        this.setData({
            a: t,
            timeout: 1600
        });
    },
    paipai2: function() {
        for (var t = [], a = 344, s = 0; s < 3; s++) {
            for (var e = 0; e < 26; e++) {
                var i = {};
                i.top = -100 + a + 330 * Math.sin((225 + 90 / 26 * e) * Math.PI / 180), i.left = 250 + 330 * Math.cos((225 + 90 / 26 * e) * Math.PI / 180), 
                i.deg = 90 / 26 * e + 315, t.push(i);
            }
            a += 50;
        }
        console.log(t), this.setData({
            b: t,
            timeout: 4e3
        });
    },
    dong: function() {
        this.setData({
            dong: !this.data.dong
        }), console.log(Math.sin(30 * Math.PI / 180));
    },
    showMe: function(t) {
        var a = "请选择" + this.data.paizhen.count + "张牌";
        if (this.data.cuss < this.data.paizhen.count) wx.showToast({
            title: a,
            icon: "none"
        }); else if (this.data.result.length) {
            var s = t.currentTarget.dataset.id, e = this.data.zhuan;
            e[s] = !0, this.setData({
                zhuan: e
            }), console.log(111), this.setData({
                showme: !this.data.showme
            }), 0 == this.data.showme && this.setData({
                selectResult: this.data.result[s]
            });
        } else wx.showToast({
            title: "抽牌中，请稍等",
            icon: "none"
        });
    },
    showMes: function(t) {
        console.log(111), this.setData({
            showme: !this.data.showme
        });
    },
    getResult: function() {
        var a = this;
        wx.showLoading({
            title: "请稍等"
        }), wx.request({
            url: t.yu + "/index.php/PeiDui/getRandCard",
            data: {
                auth: t.auth.auth,
                secert: t.secert
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), wx.hideLoading(), a.setData({
                    result: t.data.card,
                    hasResult: !0
                });
                for (var s = [], e = 0, i = t.data.card.length, o = 0; o < 5; o++) console.log(e), 
                s.push(t.data.card[e].card_pic), e + 1 == i ? e = 0 : e += 1;
                a.setData({
                    outpai: s
                });
            }
        });
    },
    onLoad: function(s) {
        console.log(s);
        var e = this;
        t.chou = !1, this.ready(!0), this.xuanpai(), this.setData({
            yu: t.yu
        }), s.fr_user_id && this.setData({
            p_user_id: s.fr_user_id,
            option: s
        }), this.toggle_hide();
        var i = [ {
            cate_id: "6",
            count: 1,
            classt: "moves"
        }, {
            cate_id: "5",
            count: 2,
            classt: "cai"
        } ];
        this.setData({
            paizhen: i[0]
        }), a.src = "/music/star.mp3", a.play(), s.fr_user_id ? wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? (wx.showLoading({
                    title: "登录中"
                }), console.log(11), wx.login({
                    success: function(a) {
                        var i = a.code;
                        console.log(a), wx.getUserInfo({
                            success: function(a) {
                                var o = a.userInfo;
                                t.wxInfo.userInfo = o, wx.request({
                                    url: t.yu + "/index.php/Login/login.html",
                                    data: {
                                        code: i,
                                        user_infos: o,
                                        secert: t.secert,
                                        fr_user_id: s.fr_user_id
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/json"
                                    },
                                    success: function(a) {
                                        t.auth = a.data.data, console.log(t.auth), console.log(t.wxInfo), t.login_state = !0, 
                                        wx.hideLoading(), wx.showToast({
                                            title: "登录成功"
                                        }), e.setData({
                                            p_user_id: s.fr_user_id
                                        }), e.checkPeidui();
                                    }
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                })) : e.setData({
                    loadct: !0
                });
            }
        }) : this.setData({
            que: !0
        });
    },
    getUserInfo: function(a) {
        var s = a.detail.userInfo, e = this;
        this.setData({
            userInfo: a.detail.userInfo,
            loadct: !1
        }), wx.showLoading({
            title: "登录中"
        }), t.wxInfo.userInfo = s, wx.login({
            success: function(a) {
                var i = a.code;
                wx.request({
                    url: t.yu + "/index.php/Login/login.html",
                    data: {
                        code: i,
                        user_infos: s,
                        secert: t.secert,
                        fr_user_id: e.data.p_user_id
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(a) {
                        wx.hideLoading(), wx.showToast({
                            title: "登录成功"
                        }), console.log(a), t.auth = a.data.data, console.log(t.wxInfo), t.login_state = !0, 
                        e.checkPeidui();
                    }
                });
            }
        });
    },
    toggle_hide: function() {
        var t = this;
        setInterval(function() {
            0 == t.data.star_hide ? t.setData({
                star_hide: !0
            }) : t.setData({
                star_hide: !1
            }), setTimeout(function() {
                t.change_star();
            }, 1e3), setTimeout(function() {
                0 == t.data.star_hide ? t.setData({
                    star_hide: !0
                }) : t.setData({
                    star_hide: !1
                });
            }, 1500);
        }, 5e3);
    },
    change_star: function() {
        var t = this;
        4 != t.data.star_count ? t.setData({
            star_count: t.data.star_count + 1
        }) : t.setData({
            star_count: 1
        });
    },
    kanjie: function() {
        console.log(this.data.cuss);
        var a = this, s = "请选择" + this.data.paizhen.count + "张牌";
        if (this.data.cuss == this.data.paizhen.count) if (this.data.result.length) {
            t.globalData.card = this.data.result, this.setData({
                outAnimation: !1
            });
            var e = 0, i = (this.data.paizhen.count, setTimeout(function() {
                a.setData({
                    selectResult: a.data.result[e],
                    showme: !1
                }), setTimeout(function() {
                    a.setData({
                        showme: !0
                    });
                }, 1900), (e += 1) == a.data.paizhen.count && (clearInterval(i), setTimeout(function() {
                    a.data.p_user_id ? wx.navigateTo({
                        url: "/pages/match/match?p_user_id=" + a.data.p_user_id
                    }) : wx.navigateTo({
                        url: "/pages/match/match"
                    });
                }, 2e3));
            }, 1700));
        } else wx.showToast({
            title: "抽牌中，请稍等",
            icon: "none"
        }); else wx.showToast({
            title: s,
            icon: "none"
        });
    },
    select: function(t) {
        if (this.data.canselect) {
            if (this.data.cuss != this.data.paizhen.count) {
                var s = parseInt(t.currentTarget.dataset.id), e = this.data.status1, i = this.data.show;
                this.data.hasSelect.indexOf(s) >= 0 ? console.log("yes") : (console.log(this.data.hasSelect), 
                a.src = "/music/chou.mp3", a.play(), console.log(this.data.hasSelect.indexOf(s)), 
                this.data.hasSelect.push(s), e[s - 1].state = !0, e[s - 1].move = this.data.paizhen.classt + (this.data.cuss + 1), 
                i[this.data.cuss] = !0, this.setData({
                    status1: e,
                    cuss: this.data.cuss + 1,
                    show: i
                }));
            }
        } else wx.showToast({
            title: "派牌中，请稍等",
            icon: "none"
        });
    },
    next: function() {
        var t = this;
        if (3 != this.data.cur) {
            var s = this.data.status;
            s[this.data.cur + 1] = !0, s[this.data.cur] = !1, this.setData({
                cur: this.data.cur + 1,
                status: s
            }), a.stop(), 2 == this.data.cur && (a.src = "/music/2.mp3", a.play(), console.log(123)), 
            this.data.cur + 1 != 4 || this.data.hasResult || this.getResult(), 1 == this.data.cur && (a.src = "/music/123.mp3", 
            a.play(), console.log(123), 2 == this.data.xipai1 && t.x1pai2texiao(), 3 == this.data.xipai1 && t.x1pai3texiao()), 
            3 == this.data.cur && (a.src = "/music/3.mp3", a.play(), console.log(123), setTimeout(function() {
                t.ready(!1);
            }, 0), setTimeout(function() {
                t.setData({
                    zhangpai: !0,
                    canselect: !0
                });
            }, t.data.timeout));
        }
    },
    ready: function(t) {
        for (var a = this, s = [], e = 0; e < 78; e++) s.push({
            state: t
        });
        a.setData({
            status1: s
        });
    },
    onReady: function() {},
    onShow: function() {
        t.chou && (t.chou = !1, wx.switchTab({
            url: "/pages/index/index"
        }));
    },
    onHide: function() {
        a.stop();
    },
    onUnload: function() {
        a.stop();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});