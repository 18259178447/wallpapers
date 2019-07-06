var t = getApp(), a = wx.createInnerAudioContext(), s = {
    SJL: {
        count: 3,
        classt: "SJL",
        zhuclass: "th"
    },
    AQS: {
        count: 5,
        classt: "AQS",
        zhuclass: "dx"
    },
    JZT: {
        count: 4,
        classt: "JZT",
        zhuclass: "lx"
    },
    X: {
        count: 5,
        classt: "X",
        zhuclass: "yy"
    },
    SZJ: {
        count: 5,
        classt: "SZJ",
        zhuclass: "sn"
    },
    SIX: {
        count: 6,
        classt: "SIX",
        zhuclass: "mz"
    },
    SJX: {
        count: 5,
        classt: "SJX",
        zhuclass: "sy"
    },
    SSJ: {
        count: 3,
        classt: "SSJ",
        zhuclass: "cy"
    },
    SYS: {
        count: 4,
        classt: "SYS",
        zhuclass: "qt"
    }
};

Page({
    data: {
        status: [ !0, !1, !1, !1 ],
        cur: 0,
        cuss: 0,
        showme: !0,
        showme1: !0,
        result: {},
        hasSelect: [],
        hasResult: !1,
        selectResult: {},
        star_count: 1,
        star_hide: !1,
        paizhen: {},
        zhuan: [ !1, !1, !1, !1, !1, !1, !1, !1 ],
        show: [ !1, !1, !1, !1, !1, !1, !1, !1 ],
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
        cate_id: "",
        paixing: ""
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
    showMe1: function(t) {
        var a = parseInt(t.currentTarget.dataset.index), s = this.data.zhuan;
        console.log(a), s[a] = !0, this.setData({
            zhuan: s
        }), console.log(111), this.setData({
            showme: !this.data.showme
        }), 0 == this.data.showme && this.setData({
            selectResult: this.data.result[a]
        });
    },
    showMes: function(t) {
        console.log(111), this.setData({
            showme: !this.data.showme
        });
    },
    getResult: function() {
        console.log(this.data.types);
        var a = this;
        wx.showLoading({
            title: "请稍等"
        }), wx.request({
            url: t.yu + "/index.php/Index/getRandCard1.html",
            data: {
                auth: t.auth.auth,
                cate_id: t.cate_id,
                secert: t.secert,
                pai_num: this.data.paizhen.count
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
                var s = [], e = 0, i = t.data.card.length;
                console.log(i);
                for (var o = 0; o < 5; o++) console.log(e), s.push(t.data.card[e].card_pic), e + 1 == i ? e = 0 : e += 1;
                a.setData({
                    outpai: s
                });
            }
        });
    },
    onLoad: function(e) {
        this.ready(!0), t.xuan_xing = !0, this.xuanpai(), this.setData({
            yu: t.yu,
            cate_id: t.cate_id
        }), this.toggle_hide(), "6" == t.cate_id ? this.setData({
            paizhen: {
                count: 1,
                classt: "yun",
                zhuclass: "yunsp"
            },
            paixing: "yun"
        }) : this.setData({
            paizhen: s[t.globalData.paixing],
            paixing: t.globalData.paixing
        }), console.log(t.globalData.paixing), 6 == t.cate_id ? a.src = "https://weitaluo.xingpei360.com/Public/Api/mp3/yunshi.mp3" : 4 == t.cate_id ? a.src = "https://weitaluo.xingpei360.com/Public/Api/mp3/aiqing.mp3" : 5 == t.cate_id ? a.src = "https://weitaluo.xingpei360.com/Public/Api/mp3/caiyun.mp3" : a.src = "/music/star.mp3", 
        a.play();
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
            t.globalData.card = this.data.result, this.showAll(), this.setData({
                outAnimation: !1
            });
            var e = 0, i = (this.data.paizhen.count, setInterval(function() {
                a.setData({
                    selectResult: a.data.result[e],
                    showme: !1
                }), setTimeout(function() {
                    a.setData({
                        showme: !0
                    });
                }, 1600), (e += 1) == a.data.paizhen.count && (clearInterval(i), setTimeout(function() {
                    a.setData({
                        showResult: !1
                    });
                }, 1700));
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
    showAll: function() {
        var a = new Array(7);
        a[0] = "星期日", a[1] = "星期一", a[2] = "星期二", a[3] = "星期三", a[4] = "星期四", a[5] = "星期五", 
        a[6] = "星期六";
        var s = new Date(), e = "", i = s.getDay();
        console.log(i), e = e + s.getFullYear() + "年" + (s.getMonth() + 1) + "月" + s.getDate() + "日 " + a[i], 
        console.log(e), this.setData({
            info: t.wxInfo.userInfo,
            star: t.globalData.star,
            date: e,
            location: t.globalData.location,
            cate_id: t.cate_id,
            title: t.globalData.title
        }), console.log(t.globalData.star);
        for (var o = [], n = 0, h = this.data.result.length; n < h; n++) {
            var c = {};
            c.card_id = this.data.result[n].card_id, c.zhengni = this.data.result[n].zhengni, 
            o.push(c);
        }
        wx.request({
            url: t.yu + "/index.php/Index/getResult.html",
            data: {
                theme_id: t.theme_id,
                cards: o,
                secert: t.secert,
                auth: t.auth.auth
            },
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            success: function(t) {}
        });
    },
    scroll: function() {},
    saveResult: function() {
        for (var a = "东经:" + this.data.location.longitude + " 北纬:" + this.data.location.latitude, s = {
            date: this.data.date,
            cons: this.data.star,
            poit: a
        }, e = this.data.result, i = [], o = [], n = [], h = [], c = 0, l = this.data.result.length; c < l; c++) if (i.push(e[c].card_pic), 
        o.push(e[c].zhengni), "6" != this.data.cate_id) e[c].card_name = "牌" + (c + 1) + " " + e[c].card_name, 
        h.push(e[c].result_infos), n.push(e[c].card_name); else {
            for (var u = 0; u < e[c].cate_title.length; u++) e[c].cate_title[u], n.push(e[c].cate_title[u] + " " + e[c].card_name);
            h = e[c].result_infos;
        }
        wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: t.yu + "/index.php/Index/getResultImg1.html",
            data: {
                theme_id: t.theme_id,
                secert: t.secert,
                auth: t.auth.auth,
                infos: s,
                card_pic: i,
                card_zhengni: o,
                card_name: n,
                card_infos: h
            },
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            success: function(t) {
                console.log(t), wx.hideLoading(), wx.showLoading({
                    title: "保存中"
                }), wx.downloadFile({
                    url: t.data.url,
                    success: function(t) {
                        wx.saveImageToPhotosAlbum({
                            filePath: t.tempFilePath,
                            success: function(t) {
                                wx.hideLoading(), wx.showToast({
                                    title: "保存成功"
                                });
                            },
                            fail: function() {
                                wx.hideLoading(), wx.showToast({
                                    title: "保存失败",
                                    icon: "none"
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    save: function() {
        for (var a = this, s = [], e = 0, i = this.data.result.length; e < i; e++) {
            var o = {};
            o.card_pic = this.data.result[e].card_pic, o.card_zhengni = this.data.result[e].zhengni, 
            o.card_name = this.data.result[e].card_name, o.card_infos = this.data.result[e].result_infos_s, 
            s.push(o);
        }
        "6" == this.data.cate_id && (s[0].cate_title = this.data.result[0].cate_title), 
        console.log(s), wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: t.yu + "/index.php/Index/getSharePic1.html",
            data: {
                theme_id: t.theme_id,
                cards: s,
                secert: t.secert,
                auth: t.auth.auth
            },
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            success: function(t) {
                console.log(t), wx.downloadFile({
                    url: t.data.url,
                    success: function(t) {
                        setTimeout(function() {
                            wx.hideLoading(), a.setData({
                                imgs: t.tempFilePath,
                                shows: !1
                            });
                        }, 1e3);
                    }
                });
            }
        });
    },
    saves: function() {
        wx.showLoading({
            title: "保存中"
        }), wx.saveImageToPhotosAlbum({
            filePath: this.data.imgs,
            success: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "保存成功"
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "保存失败",
                    icon: "none"
                });
            }
        });
    },
    hide: function(t) {
        "0" == t.target.dataset.id && this.setData({
            shows: !0
        });
    },
    onReady: function() {},
    onShow: function() {
        t.globalData.ce && (t.globalData.ce = !1, wx.switchTab({
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
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            path: "/pages/index/index?fr_user_id=" + t.auth.user_id + "&theme_id=" + t.theme_id + "&tiao_type=1",
            title: t.globalData.title,
            imageUrl: "https://weitaluo.xingpei360.com/Public/Api/mp3/1227.jpg",
            success: function(t) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            },
            fail: function(t) {}
        };
    }
});